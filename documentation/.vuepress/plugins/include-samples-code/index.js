
import fetch from 'node-fetch';


/*

Insert comments into your ts sample code to mark the start and end of a code sample.
Example:
    // [START subscribe_to_events]
        <code here>
    // [END subscribe_to_events]


Insert a html comment in your markdown to replace it with a code sample from the needle-engine-samples repository.
Example:
    <!-- [SAMPLE_CODE subscribe_to_events] --> 


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

    getCode();

    return {
        name: 'include-samples-code',
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
    parseCode(branchName, allCode, parsedCode);
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
    const startRegex = new RegExp(/(?<spaces>\s*)\/\/\s*\[START\s+(?<id>.+)\]/);
    const endRegex = new RegExp(/\s*\/\/\s*\[END\s+(?<id>.+)\]/);
    for (const file of codeFiles) {
        const code = file.content;
        const lines = code.split("\n");
        let startIndex = -1;
        let key = "";
        let indentationToRemove = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // https://regex101.com/r/TtTqcl/1
            const startMatch = startRegex.exec(line);
            if (startMatch) {
                startIndex = i + 1;
                key = startMatch.groups.id;
                indentationToRemove = startMatch.groups.spaces.length;
                console.log("FOUND START", key, "in", file.path);
                continue;
            }
            const endMatch = endRegex.exec(line);
            if (endMatch) {
                if (startIndex >= 0 && startIndex < i) {
                    const relevantLines = lines.slice(startIndex, i);
                    for (let j = relevantLines.length - 1; j >= 0; j--) {
                        let line = relevantLines[j];
                        line = line.substring(indentationToRemove);
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
                }
                startIndex = -1;
            }
        }
    }
}






// https://github.com/markdown-it/markdown-it/issues/337
const injectCodeSamples = async (md, options) => {

    const sampleMarkerRegex = new RegExp(/\<\!--\s*\[SAMPLE_CODE\s+(?<id>.+)\].*--\>/, "g");

    const originalRender = md.render;
    md.render = (...args) => {
        const code = args[0];
        const match = sampleMarkerRegex.exec(code);
        if (match && parsedCode) {
            const id = match.groups.id;
            if (parsedCode.has(id)) {
                console.log("FOUND SAMPLE CODE", id)
                const startIndex = match.index;
                const endIndex = match.index + match[0].length;
                const before = code.substring(0, startIndex);
                const after = code.substring(endIndex);
                let insert = "";
                const samples = parsedCode.get(id);
                for (const sample of samples) {
                    insert += `<div>`;
                    insert += `<a href="${sample.githubUrl}" target="_blank">`;
                    insert += `<img src="https://img.shields.io/badge/View%20on-GitHub-blue?style=flat-square" alt="View on GitHub" />`;
                    insert += `</a>`;
                    insert += "</div>\n\n";

                    let codeSample = "```ts\n";
                    codeSample += sample.code;
                    codeSample += "\n```";
                    insert += codeSample;
                }

                args[0] = before + insert + after;
            }
            else {
                console.log(">>> SAMPLE CODE NOT FOUND", id, parsedCode)
            }
        }
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