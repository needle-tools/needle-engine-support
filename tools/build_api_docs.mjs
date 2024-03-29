import { execSync } from 'child_process';
import TypeDoc from 'typedoc';
import fs from 'fs';

// console.log("Generating API documentation is disabled")
// process.exit(0);

// run npm command
// const cmd = "typedoc --plugin typedoc-plugin-markdown --out documentation/api node_modules/@needle-tools/engine/src/needle-engine.ts";
// execSync(cmd);

const currentDirectory = process.cwd();
const needleEngineDir = "/Users/marcelwiessler/git/needle-engine-dev/modules/needle-engine/js/package~"
// const tsConfigPath = needleEngineDir + "/tsconfig.json";
const outputDirectory = "documentation/api";
const outputDirectoryFull = currentDirectory + "/" + outputDirectory;
const packageJsonPath = needleEngineDir + "/package.json";
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const packageName = packageJson.name;
const packageVersion = packageJson.version;

// delete output directory if it exists
if (fs.existsSync(outputDirectoryFull))
    fs.rmSync(outputDirectoryFull, { recursive: true });

console.log(currentDirectory);
// console.log(tsConfigPath);

async function main() {
    const app = await TypeDoc.Application.bootstrapWithPlugins({
        entryPoints: [needleEngineDir + "/src/needle-engine.ts"],
        // entryPointStrategy: "Packages",
        // tsConfigPath: tsConfigPath,

        readme: "none",
        disableSources: true,
        excludeExternals: true,
        skipErrorChecking: true,
        includeVersion: true,
        excludeInternal: true,
        excludeProtected: true,
        excludePrivate: true,
        // exclude: "**/dist/**|**/_Ignore*.ts",
        // externalPattern: "**/node_modules/**",
        githubPages: false,
    });
    // If you want TypeDoc to load tsconfig.json / typedoc.json files
    app.options.addReader(new TypeDoc.TSConfigReader());
    const project = await app.convert();
    if (project) {
        // Project may not have converted correctly
        const outputDir = "documentation/api/" + packageName + "/" + packageVersion;
        await app.generateDocs(project, outputDir);
        // await app.generateJson(project, outputDir + "/documentation.json");
    }
}

main().catch(console.error);