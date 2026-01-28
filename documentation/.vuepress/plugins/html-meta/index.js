import { exec, execSync } from "child_process";
import { existsSync } from "fs";

/**
 * Extracts a clean description from markdown content, skipping VuePress components and special syntax
 * @param {string} content - The raw markdown content
 * @returns {string} - Clean description text
 */
function extractDescriptionFromContent(content) {
    // Skip frontmatter - find the end of it
    const frontmatterEnd = content.indexOf('---', 5);
    if (frontmatterEnd === -1) return '';

    let contentSlice = content.slice(frontmatterEnd + 3);

    // Remove VuePress component tags (both self-closing and paired)
    // Common components: <discountbanner />, <tool-tiles>, <ClientOnly>, <needle-button>, etc.
    contentSlice = contentSlice.replace(/<[\w-]+[^>]*\/>/g, ''); // self-closing tags like <foo />
    contentSlice = contentSlice.replace(/<[\w-]+[^>]*>[\s\S]*?<\/[\w-]+>/g, ''); // paired tags like <foo>...</foo>

    // Remove HTML comments
    contentSlice = contentSlice.replace(/<!--[\s\S]*?-->/g, '');

    // Remove VuePress directives like ::: tip, ::: warning, etc.
    contentSlice = contentSlice.replace(/:::[\s\S]*?:::/g, '');

    // Remove markdown images
    contentSlice = contentSlice.replace(/!\[.*?\]\(.*?\)/g, '');

    // Remove markdown links but keep their text
    contentSlice = contentSlice.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // Remove code blocks (fenced with ``` or ~~~)
    contentSlice = contentSlice.replace(/```[\s\S]*?```/g, '');
    contentSlice = contentSlice.replace(/~~~[\s\S]*?~~~/g, '');

    // Remove inline code
    contentSlice = contentSlice.replace(/`[^`]+`/g, '');

    // Remove HTML tags
    contentSlice = contentSlice.replace(/<[^>]+>/g, '');

    // Split into lines and process
    const lines = contentSlice.split('\n');
    const contentLines = [];
    let foundFirstContent = false;

    for (let line of lines) {
        line = line.trim();

        // Skip empty lines until we find content
        if (!foundFirstContent && !line.length) continue;

        // Skip headers (# ## ### etc)
        if (line.match(/^#{1,6}\s/)) continue;

        // Skip horizontal rules
        if (line.match(/^[-*_]{3,}$/)) continue;

        // Skip table of contents
        if (line.toLowerCase().includes('[[toc]]')) continue;

        // Skip lines that start with list markers (until we have some content)
        if (!foundFirstContent && line.match(/^[-*+]\s/)) continue;

        // Skip table rows
        if (line.match(/^\|.*\|$/)) continue;

        // Skip blockquotes
        if (line.startsWith('>')) continue;

        // If we get here and have text, it's likely real content
        if (line.length > 0) {
            foundFirstContent = true;
            contentLines.push(line);

            // Stop after we have a good amount of text (around 2-3 sentences)
            const combined = contentLines.join(' ');
            // Count sentence-ending punctuation
            const sentences = combined.match(/[.!?]+/g);
            if (sentences && sentences.length >= 2 && combined.length > 100) {
                break;
            }
            // Or stop if we hit a reasonable length
            if (combined.length > 300) {
                break;
            }
        }
    }

    let description = contentLines.join(' ');

    // Clean up markdown formatting
    description = description.replace(/\*\*([^*]+)\*\*/g, '$1'); // bold
    description = description.replace(/\*([^*]+)\*/g, '$1'); // italic
    description = description.replace(/__([^_]+)__/g, '$1'); // bold
    description = description.replace(/_([^_]+)_/g, '$1'); // italic

    // Clean up extra whitespace
    description = description.replace(/\s+/g, ' ').trim();

    // Replace double quotes with single quotes for HTML attribute safety
    description = description.replace(/"/g, "'");

    // Limit length and try to end on a sentence
    const maxLength = 300;
    if (description.length > maxLength) {
        description = description.substring(0, maxLength);
        // Try to find the last sentence ending
        const lastSentenceEnd = Math.max(
            description.lastIndexOf('. '),
            description.lastIndexOf('! '),
            description.lastIndexOf('? ')
        );
        if (lastSentenceEnd > 100) {
            description = description.substring(0, lastSentenceEnd + 1);
        } else {
            // Find last word boundary
            const lastSpace = description.lastIndexOf(' ');
            if (lastSpace > 0) {
                description = description.substring(0, lastSpace) + '...';
            }
        }
    }

    return description.trim();
}

/**
 * @returns {import("vuepress").Plugin}
 */
export const modifyHtmlMeta = (args, ctx) => {
    return {
        name: 'modify-html-meta',
        async onInitialized(app) {

            // modify the og:image, move it from the siteData to fontMatter
            const ogImage = app.siteData.head.find((item) => item[0] === 'meta' && item[1].property === 'og:image');
            const defaultOgImageUrl = ogImage?.[1].content;
            if (ogImage) {
                // remove from siteData
                const index = app.siteData.head.indexOf(ogImage);
                app.siteData.head.splice(index, 1);
            }

            // console.log(app);
            for (const page of app.pages) {
                const frontmatter = page.frontmatter;

                if (!frontmatter.head) {
                    frontmatter.head = [];
                }
                // add og:image to frontmatter
                const ogImageValue = { name: 'og:image', content: defaultOgImageUrl };
                if (ogImage) {
                    frontmatter.head.push(
                        ['meta', ogImageValue]
                    );
                }

                let description = frontmatter.description;
                if (!description) {
                    description = extractDescriptionFromContent(page.content);
                    if (!description || !description.length) {
                        description = app.siteData.description;
                    }
                    frontmatter.description = description;
                }
                if (!description.length) {
                    console.warn("No description for page", page.path);
                    continue;
                }
                if (!frontmatter.head) {
                    frontmatter.head = [];
                }
                const meta = frontmatter.head.find((item) => item[0] === 'meta' && item[1].name === 'og:description');
                if (!meta) {
                    // console.log("INSERT META", description);
                    frontmatter.head.push(['meta', { name: 'og:description', content: description }]);
                }

                if (process.env.CI) {
                    ogImageValue.content = "https://cdn.needle.tools/static/branding/logo_needle.png";
                    // await generateOgImageUrl(ogImageValue, frontmatter.title ?? page.data.path, description, page.path);
                }
            }

            // await page.contentRendered
            // console.log(page);
            // const data = page.data;
            // const headers = data.headers;
            // console.log(headers);
        },
    }
};

/**
 * @param {{content: string}} ogImage
 * @param {String} title
 * @param {string} description
 */

async function generateOgImageUrl(ogImage, title, description, pageFilePath) {


    const toolPath = process.cwd() + "/node_modules/@needle-tools/helper";
    if (!existsSync(toolPath)) {
        console.error("Could not find @needle-tools/helper");
        return;
    }

    const originalTitle = title;

    if (title.includes("/")) {
        const elements = title.split("/");
        title = "";
        // get last element with length > 0 (because it may just end with a /);
        for (let i = elements.length - 1; i >= 0; i--) {
            if (elements[i].length > 0) {
                // this happens if we have a path like "community-contributions/marwie"
                // we then want a title like: Community Contributions: marwie
                if (title.length > 0) {
                    title = elements[i] + ": " + title;
                    break;
                }
                else
                    title = elements[i];
            }
        }
    }
    // remove file ending
    if (title.includes(".")) {
        const elements = title.split(".");
        title = elements[0];
    }

    // make all lowecase because the code below will make it nice
    title = title.toLowerCase();

    // make nice display title
    const sections = title.split(/[ -]/);
    const dontUppercase = ["a", "of", "by", "or", "in", "on", "the", "and", "to", "for", "at"];
    const alwaysUppercase = ["html", "vr", "css", "ar", "faq", "vr", "i"];
    const customCasing = {
        "gltf": "glTF",
    }
    title = sections.map(section => {

        section = section.trim();
        const sectionLC = section.toLocaleLowerCase();
        if (dontUppercase.includes(sectionLC)) return section;
        if (alwaysUppercase.includes(sectionLC)) return section.toUpperCase();
        if (customCasing[sectionLC]) return customCasing[sectionLC];
        if (section.length <= 2) {
            return section.toUpperCase();
        }
        if (section.startsWith("(") && section.endsWith(")"))
            return "";
        return section.charAt(0).toUpperCase() + section.slice(1)
    }).join(" ");


    // remove non ascii characters (e.g. emojis)
    title = title.replace(/[^\x00-\x7F]/g, "");

    title = title.trim();

    if (title.length <= 0) {
        title = "Needle Engine";
        console.warn("?? No title for og image", originalTitle, "at", pageFilePath, "using", title);
    }


    description = description.replace(/"/g, '\'');
    description = description.replace(/\n/g, ' ');
    description = description.replace("---", '');
    const maxLength = 300;
    if (description.length > maxLength) {
        description = description.substring(0, maxLength);
        const lastEndOfSentence = description.lastIndexOf(".");
        if (lastEndOfSentence > 0) {
            description = description.substring(0, lastEndOfSentence);
        }
        else description += "...";
    }
    description = description.trim();
    if (description.length <= 0) {
        console.warn("?? No description for og image", originalTitle, "at", pageFilePath);
        return;
    }
    if (description.length <= 10) {
        console.warn("?? Description for og image is too short", originalTitle, "at", pageFilePath, description);
        description = " ";
    }

    let cmd = "";
    try {
        const urlBase = "https://engine.needle.tools/docs";


        let lang = "";
        const separator = "lang/";
        const languageCodeIndex = pageFilePath.indexOf(separator);
        if (languageCodeIndex > 0) {
            const languageCodeEndIndex = pageFilePath.indexOf("/", languageCodeIndex + separator.length);
            const languageCode = pageFilePath.substring(languageCodeIndex + separator.length, languageCodeEndIndex);
            lang = "_" + languageCode;
        }

        const targetPathRel = `.preview/${title.toLowerCase()}${lang}.png`;
        // console.log(targetPathRel);
        const targetPath = process.cwd() + "/documentation/.vuepress/public/" + targetPathRel;
        const fullUrl = urlBase + "/" + targetPathRel;
        const gradientFilePath = process.cwd() + "/assets/gradient.png";
        cmd = "npm run tool:generate-unfurl-image -- --title \"" + title + "\" --description \"" + description + "\" --backgroundImage \"" + gradientFilePath + "\" --targetPath \"" + targetPath + "\"";
        console.log("RUN", cmd, "\nat", toolPath);
        execSync(cmd, { cwd: toolPath, stdio: 'inherit' });
        ogImage.content = fullUrl;
        console.log("Generated og image: " + fullUrl);
        return fullUrl;
    }
    catch (e) {
        console.error("Could not generate og image with command " + cmd, e.message);
    }
}