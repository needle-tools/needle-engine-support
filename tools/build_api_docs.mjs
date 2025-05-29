import { execSync } from 'child_process';
import * as td from 'typedoc';
import fs, { WriteStream, existsSync, rmSync, writeFileSync } from 'fs';
import fetch from 'node-fetch';
import FtpDeploy from 'ftp-deploy';
import dotenv from 'dotenv';
import { html } from 'diff2html';

dotenv.config();


// console.log("Generating API documentation is disabled")
// process.exit(0);

// run npm command
// const cmd = "typedoc --plugin typedoc-plugin-markdown --out documentation/api node_modules/@needle-tools/engine/src/needle-engine.ts";
// execSync(cmd);

const isDev = process.argv.includes("--dev");
console.log("Dev mode: " + isDev);

async function main() {
    console.log("Cleaning up previous API documentation");
    const baseDownloadDirectory = process.cwd() + "/.temp";
    if (fs.existsSync(baseDownloadDirectory))
        fs.rmSync(baseDownloadDirectory, { recursive: true });


    // download and unzip latest needle-engine package
    const npmEndpoint = "https://registry.npmjs.org/@needle-tools/engine";

    console.log("FETCH neelde engine versions from " + npmEndpoint);

    /**
     * @type {object}
     */
    const content = await fetch(npmEndpoint).then(res => res.json());

    const needleEngineApiBaseUrl = "https://engine.needle.tools/docs/api";

    // this version file can be used to re-upload existing documentation
    // to re-upload previously uploaded documentations just change the string:
    /** @type {string} */
    const versionFile = "v1";

    /** @type {string[]} */
    const uploaded = new Array();

    const startTime = new Date().getTime();

    const versions = Object.keys(content.versions).reverse();

    for (let i = 0; i < versions.length; i++) {
        const version = versions[i];
        const prevVersion = versions[i + 1];

        if (!version.startsWith("3") && !version.startsWith("4")) continue;

        /**
         * @type {{name:string, version:string, dist:{tarball:string}}}
         */
        const versionInfo = content.versions[version];
        const remotePath = versionInfo.name + "/" + versionInfo.version;
        const outputDirectory = "api/" + versionInfo.name + "/" + versionInfo.version;
        const outputDirectoryFull = process.cwd() + "/" + outputDirectory;
        const baseUrl = `${needleEngineApiBaseUrl}/${versionInfo.name}/${versionInfo.version}/`;

        // in dev mode we don't want to check if the documentation already exists because we only build one version
        if (!isDev) {
            const versionFileUrl = baseUrl + versionFile;
            const htmlFileUrl = baseUrl + "index.html";
            console.log(`Checking if API documentation already exists for ${versionInfo.name} ${versionInfo.version} at ${versionFileUrl} & ${htmlFileUrl}`);
            const responses = await Promise.all([
                fetch(versionFileUrl, { method: "HEAD" }),
                fetch(htmlFileUrl, { method: "HEAD" }),
            ]);
            const versionExists = responses.every(response => response.status === 200 && !response.redirected);
            if (versionExists) {
                console.log("API documentation already exists for " + versionInfo.name + " " + versionInfo.version);

                // check if diff exists
                if (prevVersion)
                    await createApiDiff(outputDirectoryFull, remotePath, baseUrl, version, prevVersion);

                continue;
            }
        }

        const targetDirectory = baseDownloadDirectory + "/" + versionInfo.name + "/" + versionInfo.version;
        let tarballDir = "";
        let packageDir = "";

        // in dev mode, we just run on the local version
        const localPath = "/Users/herbst/git/needle-engine-dev/modules/needle-engine/js/package~";
        if (isDev && fs.existsSync(localPath)) {
            // copy localPath to targetDirectory, using node fs
            console.log("Copying local package to " + targetDirectory);
            fs.cpSync(localPath, targetDirectory, { recursive: true });
            tarballDir = targetDirectory;
            packageDir = tarballDir;
        }
        else {
            tarballDir = await downloadPackage(versionInfo, targetDirectory);
            packageDir = tarballDir + "/package";
        }
        console.log("Generating API documentation")
        const packageJsonPath = packageDir + "/package.json";
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const packageVersion = packageJson.version;
        const packageName = packageJson.name;

        // delete output directory if it exists
        if (fs.existsSync(outputDirectoryFull))
            fs.rmSync(outputDirectoryFull, { recursive: true });
        fs.mkdirSync(outputDirectoryFull, { recursive: true });

        await produceDocs(packageDir, outputDirectoryFull, baseUrl);
        console.log("API documentation generated at " + outputDirectoryFull);

        if (prevVersion)
            await createApiDiff(outputDirectoryFull, remotePath, baseUrl, version, prevVersion);

        // create version file
        fs.writeFileSync(outputDirectoryFull + "/" + versionFile, new Date().toISOString());

        // in dev mode we don't upload the documentation and just build one version
        if (isDev) {
            break;
        }

        await upload(outputDirectoryFull, remotePath);
        console.log("API documentation uploaded to " + packageName + "/" + packageVersion);
        uploaded.push(packageName + "/" + packageVersion);
        await delay(1000);
    }

    console.log("Uploaded API documentations: " + uploaded.length + ":\n" + uploaded.map(u => "https://engine.needle.tools/docs/api/" + u).join("\n"));
    // log duration in minutes
    console.log("Finished in " + ((new Date().getTime() - startTime) / 1000 / 60).toFixed(2) + " minutes");

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
    console.log("Downloading tarball to " + tarballPath + " from " + tarball);
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
 * @param {string} hostedBaseUrl
 * @returns {Promise<string | null>} The output directory
 */
async function produceDocs(packageDir, outputDirectory, hostedBaseUrl) {

    const readmePath = packageDir + "/README.md";
    const changelogPath = packageDir + "/CHANGELOG.md";
    if (existsSync(changelogPath) && existsSync(readmePath)) {
        // append changelog to readme
        let readmeContent = fs.readFileSync(readmePath, 'utf8');
        // remove first "# Needle Engine" line
        const firstHeaderIndex = readmeContent.indexOf("# Needle Engine");
        if (firstHeaderIndex !== -1) {
            readmeContent = readmeContent.substring(readmeContent.indexOf("\n", firstHeaderIndex) + 1);
        }

        let changelogContent = fs.readFileSync(changelogPath, 'utf8');
        // find index of ## [...
        const changelogHeaderChars = "## [";
        const changelogHeaderIndex = changelogContent.indexOf(changelogHeaderChars);
        if (changelogHeaderIndex !== -1) {
            // remove everything before the first changelog header
            changelogContent = changelogContent.substring(changelogHeaderIndex);
        }
        // we only collect the first 3 changelog entries (because algolia record indexing is limited)
        const changelogEntries = changelogContent.split("## [").slice(0, 5).join("\n## [");
        changelogContent = changelogEntries + "\n\n## For all changes visit [Github Releases](https://github.com/needle-tools/needle-engine-support/releases)";

        const readmeContentWithChangelog = readmeContent + "\n<br/>\n\n----\n\n# Recent Changes\n" + changelogContent;
        writeFileSync(readmePath, readmeContentWithChangelog.trim());
    }

    const app = await td.Application.bootstrapWithPlugins({
        hostedBaseUrl: hostedBaseUrl,
        lang: "en",
        entryPoints: [
            packageDir + "/src/engine/api.ts",
            packageDir + "/src/engine-components/api.ts",
            packageDir + "/src/engine-components-experimental/api.ts",
            packageDir + "/src/engine-schemes/api.ts",
        ],
        tsconfig: "./tools/api-plugins/tsconfig.json",
        // don't include references multiple times
        excludeReferences: true,
        // entryPointStrategy: "Packages",
        // tsConfigPath: tsConfigPath,
        // commentStyle: "all",

        // readme: "none",
        excludeExternals: true,
        navigation: {
            includeFolders: false,
            includeCategories: true,
            includeGroups: false,
        },
        categorizeByGroup: false,
        categoryOrder: ["*", "Other"],
        navigationLinks: {
            "API": "https://engine.needle.tools/docs/api/",
            "Docs": "https://engine.needle.tools/docs/",
            "Samples": "https://engine.needle.tools/samples/",
            "Pricing": "https://needle.tools/pricing/",
        },

        skipErrorChecking: true,
        excludeInternal: true,
        excludeProtected: false,
        excludePrivate: true,

        excludeNotDocumented: true,
        excludeNotDocumentedKinds: ["Property", "TypeAlias", "Enum", "Variable", "Function",],
        // exclude: "**/dist/**|**/_Ignore*.ts",
        // externalPattern: "**/node_modules/**",
        githubPages: false,
        includeVersion: false,
        // don't print the local path (defined in .temp/...)
        disableSources: true,
        useTsLinkResolution: true,

        name: "Needle Engine",

        readme: readmePath,

        "visibilityFilters": {
            "protected": false,
            "inherited": false,
            "@deprecated": false,
        },

        plugin: [
            "typedoc-plugin-inline-sources",
            "typedoc-plugin-mdn-links",
            "typedoc-plugin-coverage",
            "typedoc-plugin-extras",
            "./tools/api-plugins/index.js",
            "./tools/api-plugins/keywords/index.js",
            "./tools/api-plugins/plausible/index.js",
            "./tools/api-plugins/component-lookup/index.js",
        ],
        keywords: ["typescript", "library", "threejs", "webgl", "engine", "browser", "webxr", "api"],
        footerDate: true,

        customCss: "./tools/api-plugins/api-docs.css",
        customFooterHtml: "Made with 💚 by <a href='https://needle.tools'>Needle</a>",
        inlineTags: [...td.OptionDefaults.inlineTags, "@type"],
        blockTags: [...td.OptionDefaults.blockTags, "@link", "@obsolete", "@validate"],
        validation: {
            invalidLink: true,
        },
        useFirstParagraphOfCommentAsSummary: true,

        // analytics
        plausibleSiteDomain: "api.needle.tools",
        plausibleSiteOrigin: "analytics.needle.tools/js/",
    });

    // inline sources plugin

    // If you want TypeDoc to load tsconfig.json / typedoc.json files
    app.options.addReader(new td.TSConfigReader());

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

/**
 * Create a diff between the current and previous API documentation
 * @param {string} outputDirectory The output directory of the current API documentation
 * @param {string} remotePath The remote path to upload the diff to
 * @param {string} baseUrl The base URL of the API documentation    
 * @param {string} currentVersion The current version of the API documentation
 * @param {string} previousVersion The previous version of the API documentation
 */
async function createApiDiff(outputDirectory, remotePath, baseUrl, currentVersion, previousVersion) {
    try {
        const url = baseUrl + "diff.html";
        const res = await fetch(url, { method: "HEAD" }).catch(console.error);
        if (res && res.status === 200 && !res.redirected) {
            console.log("API diff already exists at " + url);
            return;
        }
        fs.mkdirSync(outputDirectory, { recursive: true });

        const cmd = `npm diff diff-ignore-all-space --diff=@needle-tools/engine@${previousVersion} --diff=@needle-tools/engine@${currentVersion} ./src ./plugins`;
        console.log(`Generate API diff for ${currentVersion} and ${previousVersion} with command: '${cmd}'`);

        const result = execSync(cmd);
        const str = result.toString();
        const outputFile = outputDirectory + "/diff.txt";
        console.log(`Writing API diff to ${outputFile}`);
        writeFileSync(outputFile, str);

        console.log("Converting diff to HTML");
        const htmlResult = await html(str, {
            inputFormat: 'diff',
            outputFormat: 'line-by-line',
            colorScheme: 'light',
        });

        const final = `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="Needle Engine API diff">
            <meta name="author" content="Needle Tools">
            <link rel="icon" type="image/png" href="https://engine.needle.tools/branding/needle-favicon.ico">            <title>Needle Engine ${currentVersion}</title>
            <style>
                body {
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    margin: 0;
                    padding: 1rem;
                    font-size: 16px;
                }
                h1 {
                    font-size: 2rem;
                    margin: 0;
                }
                .header {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 1rem;
                    gap: .3rem;
                }
                .d2h-file-list-title {
                    font-size: 1.5rem;
                }
            </style>
            <link rel="stylesheet" type="text/css"
                href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css" />
            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/diff2html/bundles/js/diff2html.min.js"></script>
        </head>
        
        <body>
            <div class="header">
                <h1>
                    Needle Engine
                </h1>
                <div>
                    Changes between version ${previousVersion} and ${currentVersion}
                </div>
            </div>
            <div>
                ${htmlResult}
            </div>
        </body>
        
        </html>   
`

        writeFileSync(outputDirectory + "/diff.html", final);
        console.log("API diff generated at " + outputFile);

        if (isDev) return;

        // console.log("Uploading API diff to " + remotePath);
        // await upload(outputDirectory, remotePath);
        // await delay(2000);

    }
    catch (err) {
        console.error(err);
    }
}


async function upload(directory, remotepath) {
    console.log("Uploading to " + remotepath);

    const user = process.env.API_FTP_USER;
    const password = process.env.API_FTP_PASSWORD;
    const host = process.env.API_FTP_HOST;

    if (!user) {
        throw new Error("API_FTP_USER not set");
    }

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
        deleteRemote: false,
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