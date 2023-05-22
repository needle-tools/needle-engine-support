<script>

// https://developer.stackblitz.com/platform/api/javascript-sdk

function resolvePath(str) {
    if (str.startsWith('@code')) {
        const relPath = str.replace(/^@code/, './code-samples/')
        return relPath;
    }
    return str;
}

async function insertFileAsync(name, url, stackblitzFiles, onModify) {
    const request = await fetch(url);
    let text = await request.text();
    if (onModify) {
        text = onModify(text);
    }
    stackblitzFiles[name] = text;
}

async function insertFile(promises, name, url, stackblitzFiles, onModify) {
    promises.push(insertFileAsync(name, url, stackblitzFiles, onModify));
}

async function getTemplateFiles(stackblitzFiles, baseGlb) {
    const promises = [];
    insertFile(promises, "package.json", "https://raw.githubusercontent.com/needle-engine/vite-template/main/package.json", stackblitzFiles);
    insertFile(promises, "src/main.ts", "https://raw.githubusercontent.com/needle-engine/vite-template/main/src/main.ts", stackblitzFiles);
    insertFile(promises, "src/styles/style.css", "https://raw.githubusercontent.com/needle-engine/vite-template/main/src/styles/style.css", stackblitzFiles);
    insertFile(promises, "vite.config.js", "https://raw.githubusercontent.com/needle-engine/vite-template/main/vite.config.js", stackblitzFiles);
    insertFile(promises, "tsconfig.json", "https://raw.githubusercontent.com/needle-engine/vite-template/main/tsconfig.json", stackblitzFiles);
    insertFile(promises, "index.html", "https://raw.githubusercontent.com/needle-engine/vite-template/main/index.html", stackblitzFiles, content => {
        return content.replace(/\<needle-engine ?\>/, `\<needle-engine camera-controls src="${baseGlb}"\>`);
    });
    await Promise.all(promises);
}

export default {
    props: {
        file: String
    },
    methods: {
        async openProject() {
            const stackblitzFiles = {};


            const mainFile = resolvePath(this.file);
            const currentPath = window.location;
            const dir = currentPath.pathname.split('/').slice(0, -1).join('/');
            const url = `${currentPath.origin}${dir}/${mainFile}`;
            const res = await fetch(url);
            const scriptContent = await res.text();
            const fileName = mainFile.split('/').pop();
            const scriptPath = "src/scripts/" + fileName;
            stackblitzFiles[scriptPath] = scriptContent;
            // return;

            await getTemplateFiles(stackblitzFiles, "https://github.com/needle-engine/vite-template/raw/main/assets/basic.glb");

            // StackBlitzSDK.openGithubProject("fork/needle-engine/vite-template", {
            //     files: {
            //         "test.html" : "hello world"
            //     }
            // })

            StackBlitzSDK.openProject(
                {
                    files: {
                        ...stackblitzFiles,
                        'index.ts': `import './src/main';\nimport '${scriptPath}';`
                    },
                    template: 'node',
                    title: `${fileName}`,
                    description: `This is a generated project for ${fileName} from https://docs.needle.engine`,
                },
                {
                    newWindow: true,
                    openFile: scriptPath.replace(/^\.\//, '')
                }
            );
        }
    }
}


</script>

<template>
    <div>
        <button @click="openProject">
            Open in StackBlitz (Experimental)
        </button>
    </div>
</template>

<style>
    button {
        background-color: #1374ef;
        border: none;
        color: white;
        padding: .3em;
        border-radius: .5em;
        margin-top: .5em;
    }
    button:hover {
        background-color: #277ee9;
        cursor: pointer;
    }
</style>
