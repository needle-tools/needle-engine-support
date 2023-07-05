
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
                    const startIndex1 = content.indexOf('---', 5);
                    let contentSlice = content.slice(startIndex1 + 3, 600);
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
                    // try to find the end of a sentence to cut the description off there
                    const sentenceEnd = contentSlice.lastIndexOf(". ");
                    if (sentenceEnd > 0)
                        contentSlice = contentSlice.slice(0, sentenceEnd + 1);
                    const componentStart = contentSlice.indexOf(/<.+>/);
                    if (componentStart > 0)
                        contentSlice = contentSlice.slice(0, componentStart);                        
                    // cleanup markdown
                    contentSlice = contentSlice.replaceAll("#", '');
                    contentSlice = contentSlice.replaceAll("[[toc]]", '');
                    contentSlice = contentSlice.trim();
                    description = contentSlice;
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