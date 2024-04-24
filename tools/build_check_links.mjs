// import { readdirSync, statSync } from 'fs';
import * as link from 'linkinator';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();


async function scan() {

    const checker = new link.LinkChecker();

    // Respond to the beginning of a new page being scanned
    checker.on('pagestart', url => {
        console.log(`Scanning ${url}...`);
    });

    checker.on('link', result => {
        if (result.state === 'BROKEN') {
            console.log(`BROKEN ${result.status} ${result.url} linked from ${result.parent}`);
        }
    });

    // console.log(`Scanning ${markdownFiles.length} markdown files...`);
    const result = await checker.check({
        // path: markdownFiles,
        path: "https://engine.needle.tools/docs/",
        // serverRoot: "https://engine.needle.tools/docs",
        markdown: true,
        // recurse: true,
        error: true,
        retryErrors: true,
        retryErrorsCount: 2,
        directoryListing: true,
        linksToSkip: ['.*favicon.ico|.*webmanifest'],

    });

    console.log(`Scanned total of ${result.links.length} links!`);
    const brokeLinks = result.links.filter(x => x.state === 'BROKEN');
    console.log(`Detected ${brokeLinks.length} broken links.`);

    console.log(process.env.DEPLOY_DISCORD_WEBHOOK)
    if (process.env.DEPLOY_DISCORD_WEBHOOK) {

        const brokenLinksStrings = [];
        for (const broken of brokeLinks) {
            if (!broken.parent) {
                brokenLinksStrings.push(`**${broken.url}**`);
                continue;
            }
            let parentLink = broken.parent;
            let pageName = parentLink.split('/').pop();
            pageName = pageName.split('?')[0];
            brokenLinksStrings.push(`**${broken.url}** on [${pageName}](${broken.parent})`);
        }

        const embeds = [];
        if (brokenLinksStrings.length > 0) {
            embeds.push({
                title: "Broken Links",
                description: brokenLinksStrings.join('\n').substring(0, 2000),
                color: 0xff0000
            });
        }

        const msg = {
            content: `Detected ${brokeLinks.length} broken links in the documentation.`,
            embeds
        }
        fetch(process.env.DEPLOY_DISCORD_WEBHOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(msg),
        });

    }
}
scan();

// const markdownFiles = [];
// const directory = "./documentation/"
// collectMarkdownFiles(directory);
// function collectMarkdownFiles(dir) {
//     const files = readdirSync(dir);
//     for (const file of files) {
//         const fullpath = `${dir}/${file}`;
//         if (file.endsWith('.md')) {
//             markdownFiles.push(fullpath);
//         }
//         // if's a directory, recurse
//         else {
//             const stat = statSync(fullpath);
//             if (stat.isDirectory()) {
//                 collectMarkdownFiles(fullpath);
//             }
//         }
//     }
// }