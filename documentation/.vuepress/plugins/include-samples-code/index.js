
import fetch from 'node-fetch';

// https://v2.vuepress.vuejs.org/reference/plugin-api.html#development-hooks


/*

Insert comments into your ts sample code to mark the start and end of a code sample.
Example:
    // START MARKER subscribe_to_events
        <code here>
    // END MARKER subscribe_to_events


Insert a html comment in your markdown to replace it with a code sample from the needle-engine-samples repository.
Example:
    <!-- SAMPLE subscribe_to_events --> 

You can also insert additional markdown inside of the HTML comment. It will then only be rendered if the sample code can be found.
For example:
    <!-- SAMPLE disable environment light 
    ## Disable environment light
    -->
This is looking for a sample marker with "disable environment light" and if it finds it, it will render the markdown in the subsequent rows and then the code
*/



const samplesRepositoryBranch = "docs/code-marker";


/** 
 * @typedef GithubFileInfoResponse
 * @property {string} path
 * @property {string} url
 * @property {number} size
 */

/**
 * @typedef GithubFileContentResponse
 * @property {string} path
 * @property {string} url
 * @property {number} size
 * @property {string} content
 */

/**
 * @typedef CodeSampleInfo
 * @property {string} code
 * @property {string} rawurl
 * @property {string} url
 */

/** 
 * @returns {import("vuepress").Plugin}
 */
export const includeSampleCode = (args, ctx) => {
    return {
        name: 'include-samples-code',
        extendsMarkdownOptions: (_config) => {
            return getCode();
        },
        extendsMarkdown: (md) => {
            md.use(injectCodeSamples)
        },
    }
};

/**
 * @type {Map<string, CodeSampleInfo>}
 */
const parsedCode = new Map();

let __didGetCode = false;

/**
 * @returns {Promise<Map<string, CodeSampleInfo>>}
 */
async function getCode() {
    if (__didGetCode) return parsedCode;
    __didGetCode = true;
    const branchName = samplesRepositoryBranch;
    const filesUrl = `https://api.github.com/repos/needle-tools/needle-engine-samples/git/trees/${branchName}?recursive=1`
    console.log("Load code files from branch", branchName, "...", filesUrl);
    const files = await fetch(filesUrl).then(r => r.json());
    const codefiles = files.tree.filter(f => {
        if (f.path.endsWith(".ts")) return true;
        if (f.path.endsWith(".js") && !f.path.endsWith("register_types.js")) return true;
        return false;
    }
    );
    console.log("Found", codefiles.length, "code files");
    const allCode = await loadCodeFiles(`https://raw.githubusercontent.com/needle-tools/needle-engine-samples/${branchName}/`, codefiles);
    console.log("\n");
    parseCode(branchName, allCode, parsedCode);
    console.log("\n");
    return parsedCode;
}

/** 
 * @param {string} baseUrl
 * @param {GithubFileInfoResponse[]} codeFiles 
 * @returns {Promise<GithubFileContentResponse[]>}
 * */
async function loadCodeFiles(baseUrl, codeFiles) {
    const promises = [];
    for (const file of codeFiles) {
        if (file.path.endsWith("register_types.js")) continue;
        const fullUrl = baseUrl + file.path;
        const promise = fetch(fullUrl).then(r => r.text()).then(t => {
            file.content = t;
            return file;
        });
        promises.push(promise);
    }
    const results = await Promise.all(promises);
    return results;
}

function getGithubUrl(branchName, filepath, line) {
    return `https://github.com/needle-tools/needle-engine-samples/blob/${branchName}/${filepath}#L${line}`;
}

/**
 * @param {string} branchName
 * @param {GithubFileContentResponse[]} codeFiles
 * @param {Map<string,CodeSampleInfo[]>} samples
 */
function parseCode(branchName, codeFiles, samples) {
    const startRegex = new RegExp(/(?<spaces>\s*)\/\/\s*START MARKER\s+(?<id>.+)/);
    const endRegex = new RegExp(/\s*\/\/\s*END MARKER\s+(?<id>.+)/);
    let totalCount = 0;
    /**
     * @type {Record<string, {startIndex:number, key:string, indentationToRemove:number}>}
     */
    const stack = {};
    for (const file of codeFiles) {
        const code = file.content;
        const lines = code.split("\n");
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // https://regex101.com/r/TtTqcl/1
            const startMatch = startRegex.exec(line);
            if (startMatch) {
                const startIndex = i + 1;
                const key = startMatch.groups.id.trim();
                const indentationToRemove = startMatch.groups.spaces.length;
                stack[key] = { startIndex, key, indentationToRemove };
                console.log("<<< FOUND SAMPLE MARKER \"" + key + "\"", "in", file.path);
                continue;
            }
            const endMatch = endRegex.exec(line);
            if (endMatch) {
                const entry = stack[endMatch.groups.id.trim()];
                if (!entry) {
                    continue;
                }
                const startIndex = entry.startIndex;
                const key = entry.key;
                const indentationToRemove = entry.indentationToRemove;
                if (startIndex >= 0 && startIndex < i) {
                    const relevantLines = lines.slice(startIndex, i);
                    for (let j = relevantLines.length - 1; j >= 0; j--) {
                        let line = relevantLines[j];
                        // Remove indentation based on the indendation of the start marker
                        // But we only remove so much until we reach the first character because we don't want to cut off any code or word
                        for (let k = 0; k < indentationToRemove; k++) {
                            if (line[0] !== " ") break;
                            line = line.substring(1);
                        }
                        relevantLines[j] = line;
                    }
                    const sampleCode = relevantLines.join("\n");
                    const githubUrl = getGithubUrl(branchName, file.path, startIndex + 1);
                    const sample = {
                        code: sampleCode,
                        githubUrl: githubUrl,
                        url: file.url
                    };
                    if (!samples.has(key)) {
                        samples.set(key, []);
                    }
                    samples.get(key).push(sample);
                    totalCount++;
                }
            }
        }
    }
    console.log("Found", samples.size, "code sample keys. Total samples:", totalCount);
}






// https://github.com/markdown-it/markdown-it/issues/337
const injectCodeSamples = async (md, options) => {
    console.log("~~~ BEGIN INJECT CODE SAMPLES");

    const sampleMarkerRegex = /\<\!--\s*SAMPLE\s+(?<id>.+?)(\n(?<markdown>.+?))?\s*--\>/gms;

    const originalRender = md.render;
    md.render = async (...args) => {
        let code = args[0];
        sampleMarkerRegex.lastIndex = 0;
        let match;
        while (match = sampleMarkerRegex.exec(code)) {
            if (match && parsedCode) {
                const id = match.groups.id?.trim();
                if (parsedCode.has(id)) {
                    console.log(">>> INJECT SAMPLE CODE: \"" + id + "\"")
                    const startIndex = match.index;
                    const endIndex = match.index + match[0].length;
                    const before = code.substring(0, startIndex);
                    const after = code.substring(endIndex);
                    let insert = "";
                    const samples = parsedCode.get(id);
                    for (const sample of samples) {
                        const markdown = match.groups.markdown;
                        if (markdown) {
                            insert += markdown;
                        }
                        let codeSample = "\n```ts\n";
                        codeSample += sample.code;
                        codeSample += "\n```";
                        insert += codeSample;
                        insert += `\n<div class="sample-code-links">`;
                        insert += `<a href="${sample.githubUrl}" target="_blank">`;
                        insert += `<img src="https://img.shields.io/badge/View%20on-GitHub-green?style=flat-square" alt="View on GitHub" />`;
                        insert += `</a>`;
                        insert += "</div>\n\n";
                    }

                    code = before + insert + after;
                }
                else {
                    console.log("??? SAMPLE CODE NOT FOUND:\"" + id + "\"")
                }
            }
        }
        args[0] = code;
        const result = originalRender.apply(md, args);
        return result;
    };

    // getCode();

    // const inject = (file) => {
    //     const tokens = file.tokens;
    //     for (const token of tokens) {
    //         if (token.type == "html_block") {
    //             const content = token.content;
    //             const match = sampleMarkerRegex.exec(content);
    //             if (match) {
    //                 const id = match.groups.id;
    //                 token.content = `
    //                 <div class="language-typescript line-numbers-mode" data-ext="ts">
    //                 <pre class="language-typescript">
    //                     <code>
    //                     test
    //                     </code>
    //                 </pre>
    //                 </div>`;
    //             }
    //         }
    //     }
    // }


    // md.core.ruler.push('inject-code-samples', inject);
    // md.renderer.rules['inject-code-samples'] = (tokens, idx) => {
    //     var token = tokens[idx];
    //     return '<span' + self.renderAttrs(token) + '>' + this.escapeHtml(tokens[idx].content) + '</span>';
    // };
};