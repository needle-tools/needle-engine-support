
/** 
 * @returns {import("vuepress").Plugin}
 */
export const modifyHtmlMeta = (args, ctx) => {
    return {
        name: 'modify-html-meta',
        async onInitialized(app) {
            // console.log(app);
            for (const page of app.pages) {
                const frontmatter = page.frontmatter;
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
                    contentSlice = contentSlice.replaceAll("#", '');
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
            }

            // await page.contentRendered
            // console.log(page);
            // const data = page.data;
            // const headers = data.headers;
            // console.log(headers);
        },
    }
};