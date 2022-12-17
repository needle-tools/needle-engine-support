import { execSync } from 'child_process';
import TypeDoc from 'typedoc';
import fs from 'fs';

console.log("Generating API documentation is disabled")
process.exit(0);

// run npm command
// const cmd = "typedoc --plugin typedoc-plugin-markdown --out documentation/api node_modules/@needle-tools/engine/src/needle-engine.ts";
// execSync(cmd);

const currentDirectory = process.cwd();
const needleEngineDir = "C:/git/needle-tiny-playground/modules/needle-tiny/js/package~"
const entryPoints = [
    needleEngineDir,
];
const tsConfigPath = needleEngineDir + "/tsconfig.json";
const outputDirectory = "documentation/api";
const outputDirectoryFull = currentDirectory + "/" + outputDirectory;

// delete output directory if it exists
if (fs.existsSync(outputDirectoryFull))
    fs.rmSync(outputDirectoryFull, { recursive: true });

console.log(currentDirectory);
// console.log(tsConfigPath);
console.log(entryPoints);

async function main() {
    const app = new TypeDoc.Application();

    // If you want TypeDoc to load tsconfig.json / typedoc.json files
    app.options.addReader(new TypeDoc.TSConfigReader());
    // app.options.addReader(new TypeDoc.TypeDocReader());
    app.bootstrap({
        entryPoints: entryPoints,
        entryPointStrategy: "Packages",
        readme: "none",
        tsconfig: tsConfigPath,
        disableSources: true,
        // excludeExternals: true,
        skipErrorChecking: true,
        includeVersion: true,
        excludeInternal: true,
        excludeProtected: true,
        excludePrivate: true,
        // exclude: "**/dist/**|**/_Ignore*.ts",
        // externalPattern: "**/node_modules/**",
        excludeExternals: true,
        githubPages: false,
    });

    const project = app.convert();

    if (project) {
        // Project may not have converted correctly
        const outputDir = "documentation/api";
        await app.generateDocs(project, outputDir);
    }
}

main().catch(console.error);