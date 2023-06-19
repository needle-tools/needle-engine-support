
import fetch from 'node-fetch';


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

export const includeSampleCode = async (args, ctx) => {

    const code = await getCode();
    console.log(code);

    return {
        name: 'include-samples-code',
        extendsMarkdown: (md) => {
            md.use(sampleMetaParser)
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
    const branchName = "docs/code-marker";
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
        if (file.path.includes("HTMLButtonEvent")) console.log(code);
        let startIndex = -1;
        let key = "";
        let indentationToRemove = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // https://regex101.com/r/TtTqcl/1
            const startMatch = startRegex.exec(line);
            if (startMatch) {
                startIndex = i;
                key = startMatch.groups.id;
                indentationToRemove = startMatch.groups.spaces.length;
                console.log("FOUND START", key, "in", file.path);
                continue;
            }
            const endMatch = endRegex.exec(line);
            if (endMatch) {
                if (startIndex >= 0) {
                    const relevantLines = lines.slice(startIndex, i);
                    if (indentationToRemove > 0) {
                        for (let j = 0; j < relevantLines.length; j++) {
                            const line = relevantLines[j];
                            relevantLines[j] = line.substring(indentationToRemove);
                        }
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






const sampleMetaParser = (md, options) => {
};