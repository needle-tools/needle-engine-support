import fs from 'fs';
import path from 'path'
import spawn from 'cross-spawn'

module.exports = (args, ctx) => {
    // console.log(args.pluginApi);
    return {
        name: 'generate-samples-meta',
        extendsPage : ($page) => {
            const data = $page.data;
            if(data.path.includes("api/")) return;
            if(!data.path.includes("_meta-test")) return;
            
            // console.log("EXTEND", $page);
            // $page.content = "";
        },
        // chainMarkdown: (config) => {
        //     config.use(myPlugin);
        // },
        extendsMarkdown: (md) => {
            // md.set({ breaks: true })
            md.use(sampleMetaParser)
            // console.log("\nEXTEND MARKDOWN");
            // console.dir(md);
            // const render = md.render;
            // console.log("RULES", md.renderer.rules);
            
            // const defaultLinkOpen = md.renderer.rules.link_open;
            // md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
                
            //     const aIndex = tokens[idx].attrIndex('target');
            //     return "";

            // };
            // let ran = false;
            // md.render = (...args) => {
            //     if(!ran){
            //         ran = true;
            //         console.log("RENDER", args)

            //     }
            //   // original content
            //   args[0] = 'original content';
            //   const html = render.call(md, ...args);
            //   return 'new content';
            // };
        }
    }
}
    


// import md from 'markdown-it';

const sampleMetaParser = (md, options) => {
    // console.log("\n-------- Use my plugin;")
    // console.log(md.renderer);
    // const defaultLinkOpen = md.renderer.rules.link_open;
    // md.renderer.rules.fence = function (tokens, idx, options, env, self) 
    // {
    //     return "tes32131t";
    // }

    const link_open = md.renderer.rules.link_open;
    let logged = false;
    md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
        for(const tok of tokens){
            if(tok.content?.includes("$sample")){

                const aIndex = tokens[idx];
                if(!logged){
                    logged = true;
                    console.log("LINK OPEN", tokens[idx], tokens);
                }
                tok.content = "my_test_header";
            }
        }
        // tokens[idx].attrs[aIndex][1] = '_blank';
        return link_open(tokens, idx, options, env, self);
    }
}


    
    // const options = args.options;
    // const outputDirectory = options.source + '/meta';
    // if (!fs.existsSync(outputDirectory))
    //     fs.mkdirSync(outputDirectory);
    // fs.writeFileSync(outputDirectory + '/samples-meta.json', JSON.stringify({}));

    // // console.log(args.pluginApi);
    // return {
    // })


// function defaultTransformer (timestamp, lang, dateOptions) {
//     return new Date(timestamp).toLocaleString(lang, dateOptions)
//   }
  
//   function getGitLastUpdatedTimeStamp (filePath) {
//     let lastUpdated
//     try {
//       lastUpdated = parseInt(spawn.sync(
//         'git',
//         ['log', '-1', '--format=%at', path.basename(filePath)],
//         { cwd: path.dirname(filePath) }
//       ).stdout.toString('utf-8')) * 1000
//     } catch (e) { /* do not handle for now */ }
//     return lastUpdated
//   }