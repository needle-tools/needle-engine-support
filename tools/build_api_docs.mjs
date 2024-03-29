import { execSync } from 'child_process';
import TypeDoc from 'typedoc';
import fs, { WriteStream, mkdir, mkdirSync, rmSync } from 'fs';
import fetch from 'node-fetch';

// console.log("Generating API documentation is disabled")
// process.exit(0);

// run npm command
// const cmd = "typedoc --plugin typedoc-plugin-markdown --out documentation/api node_modules/@needle-tools/engine/src/needle-engine.ts";
// execSync(cmd);

async function main() {

    // download and unzip latest needle-engine package
    const npmEndpoint = "https://registry.npmjs.org/@needle-tools/engine";
    const content = await fetch(npmEndpoint).then(res => res.json());
    const latestVersion = content["dist-tags"].latest;
    const version = content.versions[latestVersion];
    const tarball = version.dist.tarball;
    const targetDirectory = process.cwd() + "/.temp/" + version.name + "-" + version.version;
    if (!fs.existsSync(targetDirectory)) {
        fs.mkdirSync(targetDirectory, { recursive: true });
    }
    else {
        fs.rmSync(targetDirectory, { recursive: true });
        fs.mkdirSync(targetDirectory, { recursive: true });
    }
    const tarballPath = targetDirectory + "/package.tgz";
    const tarballStream = new WriteStream(tarballPath);
    const response = await fetch(tarball);
    response.body.pipe(tarballStream);
    await new Promise((resolve, reject) => {
        tarballStream.on('finish', resolve);
        tarballStream.on('error', reject);
    });
    tarballStream.close();
    const tarballDir = targetDirectory;
    execSync("tar -xzf " + tarballPath + " -C " + tarballDir);
    rmSync(tarballPath);

    const packageDir = tarballDir + "/package";
    const packageJsonPath = packageDir + "/package.json";
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const packageName = packageJson.name;
    const packageVersion = packageJson.version;

    const outputDirectory = "api/" + packageName + "/" + packageVersion;
    const outputDirectoryFull = process.cwd() + "/" + outputDirectory;

    // delete output directory if it exists
    if (fs.existsSync(outputDirectoryFull))
        fs.rmSync(outputDirectoryFull, { recursive: true });

    const app = await TypeDoc.Application.bootstrapWithPlugins({
        entryPoints: [packageDir + "/src/needle-engine.ts"],
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

        // plugin: "typedoc-neo-theme",
        // theme: "./node_modules/typedoc-neo-theme/bin/default",
    });

    // If you want TypeDoc to load tsconfig.json / typedoc.json files
    app.options.addReader(new TypeDoc.TSConfigReader());
    const project = await app.convert();
    if (project) {
        // Project may not have converted correctly
        await app.generateDocs(project, outputDirectory);
        // await app.generateJson(project, outputDir + "/documentation.json");
    }
}

main().catch(console.error);