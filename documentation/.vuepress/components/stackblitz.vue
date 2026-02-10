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
    insertFile(promises, "package-lock.json", "https://raw.githubusercontent.com/needle-engine/vite-template/main/package-lock.json", stackblitzFiles);
    // insertFile(promises, "src/main.ts", "https://raw.githubusercontent.com/needle-engine/vite-template/main/src/main.ts", stackblitzFiles);
    insertFile(promises, "src/styles/style.css", "https://raw.githubusercontent.com/needle-engine/vite-template/main/src/styles/style.css", stackblitzFiles);
    insertFile(promises, "vite.config.js", "https://raw.githubusercontent.com/needle-engine/vite-template/main/vite.config.js", stackblitzFiles, content => {
        return content.replace("needlePlugins(command, needleConfig)", "needlePlugins(command, needleConfig, { noPoster: true })")
    });
    insertFile(promises, "tsconfig.json", "https://raw.githubusercontent.com/needle-engine/vite-template/main/tsconfig.json", stackblitzFiles);
    insertFile(promises, "index.html", "https://raw.githubusercontent.com/needle-engine/vite-template/main/index.html", stackblitzFiles, content => {
        return content.replace(/\<needle-engine ?\>/, `\<needle-engine camera-controls src="${baseGlb}"\>`);
    });
    await Promise.all(promises);
}

async function insertScript(stackblitzFiles, file) {
    let src = `// Generated via ${window.location.href} at ${new Date().toISOString()}
import { NeedleEngine, RemoteSkybox, GameObject, ObjectRaycaster } from '@needle-tools/engine';
import * as THREE from 'three';
`;

    const mainFile = resolvePath(file);
    const currentPath = window.location;
    const dir = currentPath.pathname.split('/').slice(0, -1).join('/');
    const url = `${currentPath.origin}${dir}/${mainFile}`;
    const res = await fetch(url);
    const scriptContent = await res.text();
    // const fileName = mainFile.split('/').pop();
    const scriptPath = "src/main.ts";// "src/" + fileName;

    const componentNameMatch = scriptContent.match(/export class\s+?(?<component_name>.+?)\s+extends Behaviour/);
    const componentName = componentNameMatch?.groups?.component_name?.trim();
    console.log(componentName)
    src += "\n// SAMPLE SCRIPT START\n" + scriptContent + "\n// SAMPLE SCRIPT END\n";
    src += `

NeedleEngine.addContextCreatedCallback((args) => {
  const context = args.context;
  const scene = context.scene;

  const grid = new THREE.GridHelper();
  scene.add(grid);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xdddddd });
  const cube = new THREE.Mesh(geometry, material);
  cube.name = "Cube";
  cube.position.y += 0.5;
  scene.add(cube);
  GameObject.addComponent(cube, new ${componentName}());
  const remoteSkybox = new RemoteSkybox();
  remoteSkybox.background = false;
  remoteSkybox.url =
    'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/cyclorama_hard_light_1k.hdr';
  GameObject.addComponent(grid, remoteSkybox);
});
`

    stackblitzFiles[scriptPath] = src;
    return scriptPath;
}

export default {
    props: {
        file: String
    },
    methods: {
        async openProject() {
            const stackblitzFiles = {};


            // const mainFile = resolvePath(this.file);
            // const currentPath = window.location;
            // const dir = currentPath.pathname.split('/').slice(0, -1).join('/');
            // const url = `${currentPath.origin}${dir}/${mainFile}`;
            // const res = await fetch(url);
            // const scriptContent = await res.text();
            // const fileName = mainFile.split('/').pop();
            // const scriptPath = "src/scripts/" + fileName;
            // stackblitzFiles[scriptPath] = scriptContent;

            await getTemplateFiles(stackblitzFiles, "https://github.com/needle-engine/vite-template/raw/main/assets/basic.glb");
            const scriptPath = await insertScript(stackblitzFiles, this.file);
            const fileName = scriptPath.split('/').pop();

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
                    description: `This is a generated project via https://docs.needle.engine. Please note that this feature is experimental(!) and the project might not work as expected.`,
                },
                {
                    newWindow: true,
                    openFile: scriptPath
                }
            );
        }
    }
}


</script>

<template>
    <div>
        <button @click="openProject" class="plausible-event-name=Click+Create+Stackblitz+Project">
            Open in StackBlitz
        </button>
        <div class="code">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
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

/** Extra code can be inserted via slot */
.code {
    display: none;
}
</style>
