import fs from 'fs';
import path from 'path'
import spawn from 'cross-spawn'

let samplesJson = {};
let samplesJsonPath = "";
let baseUrl = null;

module.exports = (args, ctx) => {

    const options = args.options;
    const outputDirectory = options.source + '/.vuepress/public/meta';
    if (!fs.existsSync(outputDirectory))
        fs.mkdirSync(outputDirectory);
    samplesJsonPath = outputDirectory + '/samples.json';
    samplesJson = {};
    writeSamplesJson();

    options.head || (options.head = []);
    for(const head of options.head) {
        if(head[0] === "meta"){
            const val = head[1];
            if(val.property?.includes("url")){
                baseUrl = val.content;
                // the base url must not end with a slash
                while(baseUrl.endsWith("/")) baseUrl = baseUrl.substring(0, baseUrl.length - 1);
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
    const link_open = md.renderer.rules.link_open;
    let logged = false;
    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const currentToken = tokens[idx];
        for (const tok of tokens) {
            const sampleInfos = parseSampleInfos(tok.content);
            if (sampleInfos !== null) {
                const anchor = removeSampleInfoFromHref(tokens);
                tok.content = sampleInfos.display + " 🌵";
                // const aIndex = tokens[idx];
                if (!logged) {
                    logged = true;
                    console.log(sampleInfos);
                }
                // console.log(env);
                const page = env.filePathRelative.replace(/.md$/, "");
                const sampleName = sampleInfos.id;
                if (sampleInfos[sampleName] === undefined) sampleInfos[sampleName] = [];
                const arr = sampleInfos[sampleName];
                arr.push({
                    "page": page,
                    "anchor": anchor,
                    "absolute-url": baseUrl + "/" + page + anchor,
                    "description": sampleInfos.description
                });
                samplesJson[sampleName] = arr;
                writeSamplesJson();
                console.log(samplesJson);

            }
        }
        // tokens[idx].attrs[aIndex][1] = '_blank';
        return link_open(tokens, idx, options, env, self);
    }
}


function removeSampleInfoFromHref(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        const tok = tokens[i];
        if (tok.attrs && tok.type === "link_open") {
            for (const attr of tok.attrs) {
                if (attr[0] === "href") {
                    const href = attr[1];
                    const sampleIndex = href.indexOf("-sample-");
                    if (sampleIndex > -1) {
                        attr[1] = href.substring(0, sampleIndex);
                        return attr[1];
                    }
                }
            }
        }
    }
}


function writeSamplesJson() {
    fs.writeFileSync(samplesJsonPath, JSON.stringify(samplesJson));
}

function parseSampleInfos(str) {
    if (str.includes(" $sample ") === false) return null;
    const sections = str.split(" $sample ");
    const display = sections[0];
    const sampleInfosString = sections[1];

    // https://regex101.com/r/IQZBm6/1
    const sampleMeta = /(?<id>[ \w]+) ?(\((?<description>.+)\))?/g.exec(sampleInfosString);
    const id = sampleMeta.groups.id?.trim();
    const description = sampleMeta.groups.description?.trim();

    return {
        display: display,
        id: cleanSampleName(id),
        description: description
    }
}


function cleanSampleName(name) {
    let sampleName = name.trim().replace(/\"/g, "");
    while (sampleName.endsWith("-")) sampleName = sampleName.substring(0, sampleName.length - 1);
    while (sampleName.startsWith("-")) sampleName = sampleName.substring(1);
    return sampleName.toLowerCase();
}