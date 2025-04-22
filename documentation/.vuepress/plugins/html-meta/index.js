import { exec, execSync } from "child_process";
import { existsSync } from "fs";

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
                    // take a slice from the content
                    const content = page.content;
                    const startIndex = content.indexOf('---', 5);
                    let contentSlice = content.slice(startIndex, 2000);
                    // remove markdown images
                    contentSlice = contentSlice.replaceAll(/!\[.*\]\(.*\)/g, '');
                    // try to find an empoty line to cut off the description there
                    const startOfList = contentSlice.indexOf("- ");
                    if (startOfList > 0)
                        contentSlice = contentSlice.slice(0, startOfList);
                    // try to find a table start to cut the description off there
                    const tableStart = contentSlice.indexOf("|");
                    if (tableStart > 0)
                        contentSlice = contentSlice.slice(0, tableStart);
                    const sentenceEnd = contentSlice.lastIndexOf(/\.[\n\r ]/);
                    if (sentenceEnd > 0)
                        contentSlice = contentSlice.slice(0, sentenceEnd + 1);
                    // until first div
                    const divStart = contentSlice.indexOf("<div");
                    if (divStart > 0)
                        contentSlice = contentSlice.slice(0, divStart);

                    // replace markdown links
                    const markdownLinksRegex = /\[(?<content>.+?)\]\(.+?\)/g;
                    contentSlice = contentSlice.replaceAll(markdownLinksRegex, '$<content>');

                    // const markdownComponentsRegex = /(<[\w\-\n\r\=\' \(\)\/]+>.*<\/.+>)/gsm;
                    const startOfComponent = /<[\w\-\n\r\=\' \(\)\/]{5,}?>/g;
                    const startOfComponentIndex = contentSlice.search(startOfComponent);
                    if (startOfComponentIndex > 0)
                        contentSlice = contentSlice.slice(0, startOfComponentIndex);

                    // remove html divs and tags
                    const htmlTagsRegex = /<.+?>/g;
                    contentSlice = contentSlice.replaceAll(htmlTagsRegex, '');


                    // if (contentSlice.includes("Community Scripts")) console.log(content);

                    // if (contentSlice.includes("With this Addon you'll be")) 
                    {
                        const lines = contentSlice.split("\n");
                        const newLines = [];
                        for (let i = 0; i < lines.length; i++) {
                            let line = lines[i];
                            line = line.trim();
                            if (line.startsWith("#"))
                                continue;
                            if (!line.length)
                                continue;
                            newLines.push(line);
                        }
                        contentSlice = newLines.join("\n");
                    }
                    // cleanup markdown
                    contentSlice = contentSlice.replaceAll("# ", '');
                    contentSlice = contentSlice.replaceAll("## ", '');
                    contentSlice = contentSlice.replaceAll("### ", '');
                    contentSlice = contentSlice.replaceAll("#### ", '');
                    contentSlice = contentSlice.replaceAll("[[toc]]", '');
                    contentSlice = contentSlice.replaceAll("\"", '\'');
                    contentSlice = contentSlice.replaceAll("*", '');
                    contentSlice = contentSlice.replaceAll("`", '');
                    contentSlice = contentSlice.trim();
                    description = contentSlice;
                    if (!description.length) {
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