
import * as dotenv from 'dotenv';
import { writeFileSync } from 'fs'

dotenv.config();

export async function generateCommunityContributions() {
    const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN || process.env.GH_TOKEN;
    if (!GITHUB_ACCESS_TOKEN) {
        throw new Error("GITHUB_KEY or GH_TOKEN environment variable must be set");
    }

    const repository = "needle-engine-support";

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
                            }
                        }
                    }
                }
            }
            `
        })
    });
    const discussionsJSON = await discussions.json();

    if(discussionsJSON.errors) {
        throw new Error(JSON.stringify(discussionsJSON.errors));
    }
    else{
        console.log("Discussions fetched");
        
        const validCategories = ["Share"];
        const validDiscussions = [];
        discussionsJSON.data.repository.discussions.nodes.forEach((discussion) => {
            if(validCategories.includes(discussion.category.name)) {
                validDiscussions.push({
                    title: discussion.title,
                    url: discussion.url,
                    body: discussion.body,
                });


                const fileName = discussion.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
                writeFileSync(`./documentation/community/${fileName}.md`, discussion.body);

            }
        });

        writeFileSync(`./documentation/community/contributions.json`, JSON.stringify(validDiscussions, null, 2));
    }

}

generateCommunityContributions();
