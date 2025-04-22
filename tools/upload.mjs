import { Client } from "basic-ftp";
import { existsSync, readdirSync, statSync } from "fs";
import dotenv from 'dotenv';
import path from "path";
dotenv.config();

/**
 * @typedef {Array<{source:string, target:string, size:number}>} DeployInfo
 */


runUpload();

async function runUpload() {

    const server = process.env.FTP_SERVER_NAME;
    const user = process.env.FTP_SERVER_USERNAME;
    const password = process.env.FTP_SERVER_PASSWORD;
    if (!server || !user || !password) {
        console.error(`Missing FTP server credentials. Please set FTP_SERVER_NAME, FTP_SERVER_USERNAME, and FTP_SERVER_PASSWORD in .env file. Variables: SERVER? ${!!server}, USER? ${!!user}, PASSWORD? ${!!password}`);
        return;
    }

    // Maximum number of connections is 10 - so we use 8 to be safe
    const parallelUploads = parseInt(process.env.FTP_PARALLEL_UPLOADS || "8");

    const directory = path.resolve("dist");
    if (!existsSync(directory)) {
        console.error("Directory does not exist: " + directory);
        return;
    }

    const files = recursiveCollectFilesToUpload(directory, [], null);
    if (files.length === 0) {
        console.error("No files to upload");
        return;
    }

    console.log(`Uploading ${files.length} files to ${server}...`);
    console.log(`Using ${parallelUploads} parallel uploads`);

    /** @type {Array<Promise<void>>} */
    const workerTasks = new Array();
    for (let i = 0; i < parallelUploads; i++) {
        const client = new Client();
        const t = client.access({
            host: server,
            user: user,
            password: password,
            secure: true
        }).then(res => {
            if (res.code.toString().startsWith("2")) {
                console.log("Connected to FTP server");
                return startUploadWorker(client, files, "").finally(() => {
                    console.log("Disconnecting from FTP server");
                    client.close();
                });
            }
            else {
                console.error("Error connecting to FTP server", res);
                throw new Error("Error connecting to FTP server");
            }
        });
        workerTasks.push(t);
    }
    console.log("Waiting for uploads to finish...");
    const startTime = Date.now();
    await Promise.all(workerTasks);
    console.log(`All uploads finished in ${((Date.now() - startTime) / 1000).toFixed(2)} seconds`);
}

/** 
 * Recursively collect files to upload
 * @param {string} dir - The directory to start searching from
 * @param {DeployInfo} files - The array to store the file paths
 * @param {string | null} currentRel - The path to the directory
 * @returns {DeployInfo} - The array of file paths
 */
function recursiveCollectFilesToUpload(dir, files, currentRel) {

    if (!currentRel) currentRel = "";

    const items = readdirSync(dir);
    for (const item of items) {
        const relpath = `${currentRel}/${item}`;
        const fullpath = path.resolve(dir, item);
        const stat = statSync(fullpath);
        if (stat.isDirectory()) {
            recursiveCollectFilesToUpload(fullpath, files, relpath);
        } else {
            files.push({ source: fullpath, target: relpath, size: stat.size });
        }
    };

    return files;
}


/**
 * Start the upload worker
 * @param {Client} client - The FTP client
 * @param {DeployInfo} files - The array of file paths to upload
 */
async function startUploadWorker(client, files, remoteBaseDir) {

    // Take file from array
    while (files.length > 0) {
        const file = files.pop();
        if (!file) continue;
        const { source, target, size } = file;
        const maxRetries = 5;
        let didUpload = false;
        const sizeInMB = size / 1024 / 1024;
        for (let i = 0; i < maxRetries; i++) {
            console.log(`Upload start: ${target} (${sizeInMB.toFixed(2)} MB). Attempt #${i + 1} of ${maxRetries}`);
            const targetDir = path.dirname(target);
            await client.ensureDir(targetDir);
            const promise = await client.uploadFrom(source, target)
                .then(() => {
                    console.log("Uploaded: ", source, " to ", target);
                    return true;
                })
                .catch((err) => {
                    console.error("Error uploading: ", source, " to ", target, err);
                    return false;
                });
            if (promise === true) {
                didUpload = true;
                break;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        }
        if (!didUpload) {
            throw new Error(`Failed to upload ${source} after ${maxRetries} attempts`);
        }

        console.log(`Upload done: ${target} - ${files.length} files left`);
    }

}