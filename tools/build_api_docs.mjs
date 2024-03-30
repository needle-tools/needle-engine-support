import { execSync } from 'child_process';
import TypeDoc from 'typedoc';
import fs, { WriteStream, mkdir, mkdirSync, rmSync } from 'fs';
import fetch from 'node-fetch';
import FtpDeploy from 'ftp-deploy';
import dotenv from 'dotenv';

dotenv.config();


// console.log("Generating API documentation is disabled")
// process.exit(0);

// run npm command
// const cmd = "typedoc --plugin typedoc-plugin-markdown --out documentation/api node_modules/@needle-tools/engine/src/needle-engine.ts";
// execSync(cmd);

async function main() {
    console.log("Cleaning up previous API documentation");
    const baseDownloadDirectory = process.cwd() + "/.temp";
    if (fs.existsSync(baseDownloadDirectory))
        fs.rmSync(baseDownloadDirectory, { recursive: true });

    // download and unzip latest needle-engine package
    const npmEndpoint = "https://registry.npmjs.org/@needle-tools/engine";
    const content = await fetch(npmEndpoint).then(res => res.json());

    const needleEngineApiBaseUrl = "https://engine.needle.tools/docs/api";

    // this version file can be used to re-upload existing documentation
    // to re-upload previously uploaded documentations just change the string:
    /** @type {string} */
    const versionFile = "v1";

    for (const version of Object.keys(content.versions)) {

        if (!version.startsWith("3.3")) continue;

        const versionInfo = content.versions[version];

        const url = needleEngineApiBaseUrl + "/" + versionInfo.name + "/" + versionInfo.version + "/" + versionFile;
        console.log("Checking if API documentation already exists for " + versionInfo.name + " " + versionInfo.version + " at " + url);
        const response = await fetch(url, { method: "HEAD" });
        if (response.status === 200) {
            console.log("API documentation already exists for " + versionInfo.name + " " + versionInfo.version);
            continue;
        }

        const targetDirectory = baseDownloadDirectory + "/" + versionInfo.name + "/" + versionInfo.version;
        const tarballDir = await downloadPackage(versionInfo, targetDirectory);
        console.log("Generating API documentation")
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

        const output = await produceDocs(packageDir, outputDirectoryFull);
        console.log("API documentation generated at " + output);

        // create version file
        fs.writeFileSync(outputDirectoryFull + "/" + versionFile, new Date().toISOString());

        await upload(output, packageName + "/" + packageVersion);
        console.log("API documentation uploaded to " + packageName + "/" + packageVersion);
        await delay(2000);
    }

}

async function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

/** Download the package tarball and extract it to the target directory 
 * @param {{dist:{tarball:string}}} version The version object from the npm registry
 * @param {string} targetDirectory The target directory to extract the package to
 * @returns {Promise<string>} The directory of the extracted package
 **/
async function downloadPackage(version, targetDirectory) {
    console.log("Downloading needle-engine package: " + version.version + " to " + targetDirectory);
    const tarball = version.dist.tarball;
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
    console.log("Downloading tarball to " + tarballPath);
    await new Promise((resolve, reject) => {
        tarballStream.on('finish', resolve);
        tarballStream.on('error', reject);
    });
    tarballStream.close();
    const tarballDir = targetDirectory;
    console.log("Extracting tarball to " + tarballDir);
    execSync("tar -xzf " + tarballPath + " -C " + tarballDir);
    rmSync(tarballPath);
    return tarballDir;
}

/**
 * Generate the API documentation for the given package directory
 * @param {string} packageDir The directory of the package
 * @param {string} outputDirectory The output directory for the documentation
 * @returns {Promise<string | null>} The output directory
 */
async function produceDocs(packageDir, outputDirectory) {

    const readmePath = packageDir + "/README.md";

    const app = await TypeDoc.Application.bootstrapWithPlugins({
        entryPoints: [
            packageDir + "/src/engine/api.ts",
            packageDir + "/src/engine-components/api.ts",
            packageDir + "/src/engine-components-experimental/api.ts",
            packageDir + "/src/engine-schemes/api.ts",
            packageDir + "/src/needle-engine.ts",
        ],
        // don't include references multiple times
        excludeReferences: true,
        // entryPointStrategy: "Packages",
        // tsConfigPath: tsConfigPath,
        // commentStyle: "all",

        readme: "none",
        excludeExternals: true,
        skipErrorChecking: true,
        excludeInternal: true,
        excludeProtected: false,
        excludePrivate: true,

        excludeNotDocumented: true,
        excludeNotDocumentedKinds: ["Property", "Interface", "TypeAlias", "Enum", "Variable", "Function",],
        // exclude: "**/dist/**|**/_Ignore*.ts",
        // externalPattern: "**/node_modules/**",
        githubPages: false,
        includeVersion: false,
        // don't print the local path (defined in .temp/...)
        disableSources: true,

        name: "Needle Engine",

        readme: readmePath,
        categorizeByGroup: true,

        "visibilityFilters": {
            "protected": false,
            "inherited": false,
            "@deprecated": false,
        },

        // plugin: "typedoc-neo-theme",
        // theme: "./node_modules/typedoc-neo-theme/bin/default",

        plugin: ["typedoc-plugin-inline-sources", "typedoc-plugin-mdn-links", "typedoc-plugin-keywords", "typedoc-plugin-extras"],
        keywords: ["typescript", "library", "threejs", "webgl", "engine", "browser", "webxr", "api"],
        footerDate: true,
    });

    // inline sources plugin

    // If you want TypeDoc to load tsconfig.json / typedoc.json files
    app.options.addReader(new TypeDoc.TSConfigReader());

    console.log("Converting project");
    const project = await app.convert();
    if (project) {
        // Project may not have converted correctly
        console.log("Generating documentation");
        await app.generateDocs(project, outputDirectory);
        await app.generateJson(project, outputDirectory + "/api.json");
        return outputDirectory;
    }

    return null;
}

async function upload(directory, remotepath) {
    console.log("Uploading to " + remotepath);

    const user = process.env.API_FTP_USER;
    const password = process.env.API_FTP_PASSWORD;
    const host = process.env.API_FTP_HOST;

    const ftpDeploy = new FtpDeploy();
    const config = {
        user,
        // Password optional, prompted if none given
        password,
        host,
        port: 21,
        localRoot: directory,
        remoteRoot: remotepath,
        // upload everything except dot files
        include: ["*", "**/*"],
        // delete ALL existing files at destination before uploading, if true
        deleteRemote: true,
        // Passive mode is forced (EPSV command is not sent)
        forcePasv: true,
        // use sftp or ftp
        sftp: false,
    };
    ftpDeploy.on("uploading", function (data) {
        console.log("Uploading " + data.transferredFileCount + "/" + data.totalFilesCount + " to " + remotepath + ": " + data.filename);
    });
    return new Promise(res => {
        ftpDeploy
            .deploy(config)
            .then((result) => {
                console.log("Finished uploading:", result);
                res(result);
            })
            .catch((err) => {
                console.log(err);
                res(null);
            });
    });
}


main().catch(console.error);