import fs from 'fs';
import path from 'path'
import spawn from 'cross-spawn'


const k_sampleInfoSeparator = " :sample ";
const k_tagSeparator = " :tags ";
const k_separators = [k_sampleInfoSeparator, k_tagSeparator];

let baseUrl = null;

let samplesJson = {};
let samplesJsonPath = "";

let tagsJson = {};
let tagsPath = "";

export const generateMetaPlugin = (args, ctx) => {

    const options = args.options;
    // console.log(options.plugins);
    const outputDirectory = options.source + '/.vuepress/public/meta';
    if (!fs.existsSync(outputDirectory))
        fs.mkdirSync(outputDirectory);
    samplesJsonPath = outputDirectory + '/samples.json';
    samplesJson = {};
    write(samplesJsonPath, samplesJson);

    tagsPath = outputDirectory + '/tags.json';
    tagsJson = {};
    write(tagsPath, tagsJson);

    options.head || (options.head = []);
    for (const head of options.head) {
        if (head[0] === "meta") {
            const val = head[1];
            if (val.property?.includes("url")) {
                baseUrl = val.content;
                // the base url must not end with a slash
                while (baseUrl.endsWith("/")) baseUrl = baseUrl.substring(0, baseUrl.length - 1);
                break;
            }
        }
    }

    return {
        name: 'generate-samples-meta',
        // extendsPage : ($page) => {
        //     const data = $page.data;
        //     if(data.path.includes("api/")) return;
        //     if(!data.path.includes("_meta-test")) return;
        // },
        chainMarkdown(config) {
        },
        extendsMarkdown: (md) => {
            md.use(sampleMetaParser)
        },
        generated() {
            console.log("GENERATED");
        },
        chainWebpack(config, isServer) {
            console.log("CHAIN WEBPACK");
        }
    }
}



// import md from 'markdown-it';

const sampleMetaParser = (md, options) => {
    let logged = false;
    // console.log(md.renderer.rules);
    const link_open = md.renderer.rules.link_open;
    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const currentToken = tokens[idx];
        for (const tok of tokens) {
            const metaInfo = parseMeta(tok.content);
            if (metaInfo !== null) {
                const anchor = cleanAnchors(tokens);
                tok.content = metaInfo.display;
                const page = env.filePathRelative.replace(/.md$/, "");

                const hasSample = metaInfo.samples.length > 0;
                for (const sample of metaInfo.samples) {
                    const sampleName = sample.id;
                    if (sample[sampleName] === undefined) sample[sampleName] = [];
                    const arr = sample[sampleName];
                    arr.push({
                        "name": sampleName,
                        "page": page,
                        "anchor": anchor,
                        "absolute-url": baseUrl + "/" + page + anchor,
                        "description": sample.description,
                        tags: metaInfo.tags
                    });
                    samplesJson[sampleName] = arr;
                }
                if (hasSample)
                    write(samplesJsonPath, samplesJson);

                for (const tag of metaInfo.tags) {
                    if (tagsJson[tag] === undefined) tagsJson[tag] = [];
                    const arr = tagsJson[tag];
                    arr.push({
                        "page": page,
                        "anchor": anchor,
                        "absolute-url": baseUrl + "/" + page + anchor,
                    });
                }
                write(tagsPath, tagsJson);

                if (!logged) {
                    logged = true;
                    // console.log("\n> Anchor", anchor, tokens);
                    // console.log(metaInfo);
                }
            }
        }
        // tokens[idx].attrs[aIndex][1] = '_blank';
        return link_open(tokens, idx, options, env, self);
    }
}


function cleanAnchors(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        const tok = tokens[i];
        if (tok.attrs && tok.type === "link_open") {
            for (const attr of tok.attrs) {
                if (attr[0] === "href") {
                    const href = attr[1];
                    attr[1] = cleanLink(href);
                    return attr[1];
                }
            }
        }
    }
}

export function cleanLink(slug) {
    const index = getStartIndex(slug);
    if (index > -1 && index !== null) {
        // const original = slug;
        slug = slug.substring(0, index);
        slug = slug.replace(/ /g, "-");
        slug = slug.toLowerCase();
        // console.log(original, slug, index);
        return slug;
    }
    return slug;
}


export function cleanHeader(str) {
    const index = getStartIndex(str);
    if (index > -1) {
        return str.substring(0, index);
    }
    return str;
}

function getStartIndex(str) {
    const shortestIndexAboveZero = k_separators.map(s => str.indexOf(s)).filter(i => i > -1).sort((a, b) => a - b)[0];
    if (shortestIndexAboveZero > -1) {
        return shortestIndexAboveZero;
    }
    return -1;
}

function write(path, obj) {
    fs.writeFileSync(path, JSON.stringify(obj));
}

function parseMeta(str) {
    const index = getStartIndex(str);
    if (index < 0 || index == null) {
        return null;
    }
    const obj = {
        display: str.substring(0, index),
        samples: [],
        tags: []
    }

    tryParseSampleMeta(str, obj.samples);
    tryParseTags(str, obj.tags);
    return obj;
}

// https://regex101.com/r/ueCSSZ/1
function tryParseSampleMeta(str, array) {
    const sampleRegex = /\:sample (?<sample_title>[\w\s\.]+)(\((?<description>.+)\))?/g;
    const match = sampleRegex.exec(str);
    if (match === null) return;
    const title = match.groups.sample_title;
    const description = match.groups.description?.trim();
    array.push({
        id: cleanSampleName(title),
        description: description
    });
}
// https://regex101.com/r/AHWD0H/1
function tryParseTags(str, array) {
    const tagsRegex = /\:tags (?<tags>[\,\w\s]+)+/g;
    const match = tagsRegex.exec(str);
    if(match === null) return;
    const tags = match.groups.tags;
    if (tags) {
        const tagList = tags.split(",");
        for (const tag of tagList) {
            array.push(tag.trim());
        }
    }
}

function cleanSampleName(name) {
    let sampleName = name.trim().replace(/\"/g, "");
    while (sampleName.endsWith("-")) sampleName = sampleName.substring(0, sampleName.length - 1);
    while (sampleName.startsWith("-")) sampleName = sampleName.substring(1);
    return sampleName.toLowerCase();
}