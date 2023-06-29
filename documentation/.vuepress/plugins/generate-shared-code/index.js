import fetch from "node-fetch";
import { createPage } from "vuepress";
import { cleanLink } from "../generate-samples-meta";

const baseUrl = "/docs";

/** 
 * @typedef {Object} Contribution
 * @property {string} title
 * @property {string} url
 * @property {string} body
 * @property {string} authorLogin
 * @property {string} authorAvatarUrl
 * @property {boolean} approved
 */

/** 
 * @returns {import("vuepress").Plugin}
 */
export const generateSharedCode = (config) => {
    // console.log(ctx);
    return {
        name: 'generate-shared-code',
        extendsMarkdownOptions: (_config) => {
            return getSharedCode();
        },
        async onInitialized(app) {
            await generateContributionPages(app, config);
        },
    }
};

/** @type {Contribution[]} */
const sharedCode = [];
async function getSharedCode() {
    sharedCode.length = 0;
    const contributions = await collectContributionData();
    sharedCode.push(...contributions);
    console.log("Shared code contributions:", sharedCode.length);
};

const generateContributionPages = async (app, config) => {
    const baseContributionUrl = "/community/contributions";
    /** @type {Map<string, { profileUrl:string, profileImage:string, contributions: Contribution[]}>} */
    const contributionsByAuthor = new Map();
    for (const cont of sharedCode) {
        if (cont.approved === false) continue;
        const entry = contributionsByAuthor.get(cont.authorLogin) || {
            profileUrl: `https://github.com/${cont.authorLogin}`,
            profileImage: cont.authorAvatarUrl,
            contributions: [],
        };
        entry.contributions.push(cont);
        contributionsByAuthor.set(cont.authorLogin, entry);
    }

    let indexContent = "# Community Scripts\n\n";
    indexContent += "To contribute a script, please create a new discussion in the [Share category](https://github.com/needle-tools/needle-engine-support/discussions/categories/share)"
    indexContent += "\n\n";

    indexContent += "<contributions-overview>\n"

    for (const [author, entry] of contributionsByAuthor) {
        const authorPage = baseContributionUrl + "/" + author;
        app.pages.push(await createPage(app, {
            path: authorPage,
            content: `${author}`,
        }))

        indexContent += `<contribution
        url="${entry.profileUrl}"
        author="${author.toString()}"
        page="${baseUrl}${baseContributionUrl}/${author}"
        profileImage="${entry.profileImage}"
        >\n`;

        for (const cont of entry.contributions) {
            let contributionPage = `<a hreF="../">Overview</a>\n\n`;
            contributionPage += `<contribution
            url="${entry.profileUrl}"
            author="${author.toString()}"
            page="${baseUrl}${baseContributionUrl}/${author}"
            profileImage="${entry.profileImage}"
            githubUrl="${cont.url}"
            title="${cont.title}"
            gradient="true"
            ></contribution>\n\n`;
            contributionPage += cont.body;
            contributionPage += "\n\n";

            const pageName = cleanLink(cont.title);
            app.pages.push(await createPage(app, {
                path: authorPage + "/" + pageName,
                content: contributionPage,
            }))

            // Add to preview
            indexContent += `<contribution-listentry
                title="${cont.title}"
                url="${baseUrl}${authorPage}/${pageName}"
            ></contribution-listentry>\n\n`;
        }


        indexContent += `</contribution>\n`
    }


    indexContent += "</contributions-overview>\n"

    app.pages.push(await createPage(app, {
        path: baseContributionUrl,
        content: indexContent,
    }))
};


/** 
 * @returns {Promise<Contribution[]>}
 */
async function collectContributionData() {
    let GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
    if (!GITHUB_ACCESS_TOKEN) GITHUB_ACCESS_TOKEN = process.env.GITHUB_TOKEN;
    if (!GITHUB_ACCESS_TOKEN) {
        throw new Error("GITHUB_ACCESS_TOKEN or GITHUB_TOKEN environment variable must be set");
    }

    const repository = "needle-engine-support";
    /** @type {Contribution[]} */
    const contributions = [];

    // only get share category

    const discussions = await fetch(`https://api.github.com/graphql`, {
        headers: {
            "Authorization": `bearer ${GITHUB_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            query: `
            query {
                repository(owner: "needle-tools", name: "${repository}") {
                    discussions(first: 100) {
                        nodes {
                            title,
                            author { 
                                login,
                                avatarUrl(size: 100)
                            }
                            url,
                            body,
                            comments(first: 1) {
                                nodes {
                                    body
                                }
                            }
                            category {
                                name
                            },
                            reactions(first: 100) {
                                nodes {
                                    content,
                                    user {
                                        login
                                    }
                                }
                            }

                        }
                    }
                }
            }
            `
        })
    });
    const discussionsJSON = await discussions.json();

    if (discussionsJSON.errors) {
        throw new Error(JSON.stringify(discussionsJSON.errors));
    }
    else {
        console.log("Discussions fetched", discussionsJSON?.data?.repository?.discussions?.nodes?.length);

        const validCategories = ["Share"];
        const needsThumpsUpFromUser = ["marwie", "hybridherbst"];

        if (!discussionsJSON?.data?.repository?.discussions?.nodes) {
            console.log("No discussions found");
            return;
        }
        discussionsJSON.data.repository.discussions.nodes.forEach((discussion) => {
            if (validCategories.includes(discussion.category.name)) {
                // console.log(discussion);

                // const fileName = discussion.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
                // const path = `./documentation/community/${fileName}.md`;

                // if (!discussion?.reactions?.nodes) return;// dismiss(path);

                let approved = true;

                // Check if the discussion has a thumbs up from an authorized user (see array above)
                if (discussion.reactions.nodes.filter((reaction) => reaction.content === "THUMBS_UP" && needsThumpsUpFromUser.includes(reaction.user.login)).length === 0) {
                    console.log("No thumbs up from authorized user: \"" + discussion.title + "\" - " + discussion.url);
                }

                // check if an authorized user has given their thumbs down
                if (discussion.reactions.nodes.filter((reaction) => reaction.content === "THUMBS_DOWN" && needsThumpsUpFromUser.includes(reaction.user.login)).length > 0) {
                    console.log("Thumbs down from authorized user: \"" + discussion.title + "\" - " + discussion.url);
                    approved = false;
                    // return;
                }

                contributions.push({
                    title: discussion.title,
                    url: discussion.url,
                    body: discussion.body,
                    authorLogin: discussion.author.login,
                    authorAvatarUrl: discussion.author.avatarUrl,
                    approved: approved,
                });
            }
        });
    }

    return contributions;
}