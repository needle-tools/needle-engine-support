import fetch from "node-fetch";

/** 
 * @typedef {Object} Contribution
 * @property {string} title
 * @property {string} url
 * @property {string} body
 * @property {boolean} approved
 */

/** 
 * @returns {import("vuepress").Plugin}
 */
export const generateSharedCode = (args, ctx) => {
    return {
        name: 'generate-shared-code',
        extendsMarkdownOptions: (_config) => {
            return getSharedCode();
        },
        extendsMarkdown: (md) => {
            md.use(injectCodeSamples)
        },
    }
};

async function getSharedCode() {
    const contributions = await collectContributionData();
    for (const contribution of contributions) {
        console.log("CONTRIBUTION:\n\t", contribution.title,"\n\t", contribution.url);
    }
};

const injectCodeSamples = async (md, options) => {
};


/** 
 * @returns {Promise<Contribution[]>}
 */
async function collectContributionData() {
    const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN || process.env.GH_TOKEN;
    if (!GITHUB_ACCESS_TOKEN) {
        throw new Error("GITHUB_ACCESS_TOKEN or GH_TOKEN environment variable must be set");
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
                            title
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

                // const fileName = discussion.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
                // const path = `./documentation/community/${fileName}.md`;

                // if (!discussion?.reactions?.nodes) return;// dismiss(path);

                let approved = true;

                // Check if the discussion has a thumbs up from an authorized user (see array above)
                if (discussion.reactions.nodes.filter((reaction) => reaction.content === "THUMBS_UP" && needsThumpsUpFromUser.includes(reaction.user.login)).length === 0) {
                    console.log("No thumbs up from authorized user: \"" + discussion.title + "\" - " + discussion.url);
                    approved = false;
                }

                // check if an authorized user has given their thumbs down
                if (discussion.reactions.nodes.filter((reaction) => reaction.content === "THUMBS_DOWN" && needsThumpsUpFromUser.includes(reaction.user.login)).length > 0) {
                    console.log("Thumbs down from authorized user: \"" + discussion.title + "\" - " + discussion.url);
                    return;
                }

                contributions.push({
                    title: discussion.title,
                    url: discussion.url,
                    body: discussion.body,
                    approved: approved,
                });
            }
        });
    }

    return contributions;
}