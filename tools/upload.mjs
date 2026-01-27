import { Client } from "basic-ftp";
import { existsSync, readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import dotenv from 'dotenv';
import path from "path";
import crypto from "crypto";
dotenv.config();

/**
 * @typedef {Array<{source:string, target:string, size:number, hash:string}>} DeployInfo
 */


runUpload();

async function runUpload() {

    const server = process.env.FTP_SERVER_NAME;
    const user = process.env.FTP_SERVER_USERNAME;
    const password = process.env.FTP_SERVER_PASSWORD;
    if (!server || !user || !password) {
        throw new Error(`Missing FTP server credentials. Please set FTP_SERVER_NAME, FTP_SERVER_USERNAME, and FTP_SERVER_PASSWORD in .env file. Variables: SERVER? ${!!server}, USER? ${!!user}, PASSWORD? ${!!password}`);
        return;
    }

    // Maximum number of connections is 10 - so we use 8 to be safe
    const parallelUploads = parseInt(process.env.FTP_PARALLEL_UPLOADS || "8");

    const directory = path.resolve("dist");
    if (!existsSync(directory)) {
        console.error("Directory does not exist: " + directory);
        return;
    }

    // Collect all files and compute their hashes
    console.log("Collecting files and computing hashes...");
    const allFiles = recursiveCollectFilesToUpload(directory, [], null);
    if (allFiles.length === 0) {
        console.error("No files to upload");
        return;
    }
    console.log(`Collected ${allFiles.length} files for deployment`);

    // We'll build the updated manifest after successful uploads
    // For now, just keep track of all files for comparison
    const allFilesMap = {};
    for (const file of allFiles) {
        allFilesMap[file.target] = {
            hash: file.hash,
            size: file.size
        };
    }

    // Download and compare with remote manifest
    console.log("Checking for changed files...");
    const remoteManifest = await downloadRemoteManifest(server, user, password);

    // KNOWN ISSUE: VuePress/Vite uses content-hashed filenames for assets (e.g., app-8d942d5f.js).
    // When any content changes, even a single markdown file, VuePress regenerates ALL HTML files
    // because they reference the newly-hashed assets. This causes the upload script to detect
    // most files as "changed" even though only source content changed.
    //
    // Potential solutions:
    // 1. Use git-based change detection (git diff HEAD~1 HEAD -- dist/) to identify truly changed files
    // 2. Implement smart upload logic that maps source .md changes to their corresponding outputs
    // 3. Accept current behavior as technically correct (files did change, just due to asset references)
    //
    // For now, this will upload more files than strictly necessary when markdown files are edited.

    // Determine which files need to be uploaded
    const filesToUpload = allFiles.filter(file => {
        const remote = remoteManifest[file.target];
        if (!remote) {
            return true; // New file
        }
        if (remote.hash !== file.hash) {
            return true; // Changed file
        }
        if (remote.size !== file.size) {
            return true; // Size mismatch
        }
        return false; // File unchanged
    });

    console.log(`Total files: ${allFiles.length}`);
    console.log(`Files to upload: ${filesToUpload.length}`);
    console.log(`Files skipped (unchanged): ${allFiles.length - filesToUpload.length}`);

    if (filesToUpload.length === 0) {
        console.log("No changes detected, skipping upload");
        return;
    }

    console.log(`Uploading ${filesToUpload.length} files to ${server}...`);
    console.log(`Using ${parallelUploads} parallel uploads`);

    // Track successfully uploaded files
    const uploadedFiles = [];

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
                return startUploadWorker(client, filesToUpload, uploadedFiles).finally(() => {
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

    // Build updated manifest: start with old manifest, update only successfully uploaded files
    console.log("Building updated manifest...");
    const updatedManifest = { ...remoteManifest };
    for (const uploadedFile of uploadedFiles) {
        updatedManifest[uploadedFile.target] = {
            hash: uploadedFile.hash,
            size: uploadedFile.size
        };
    }
    console.log(`Updated manifest with ${uploadedFiles.length} newly uploaded files`);

    // Upload updated manifest
    console.log("Uploading manifest...");
    const manifestClient = new Client();
    await manifestClient.access({
        host: server,
        user: user,
        password: password,
        secure: true
    });

    const manifestPath = path.resolve("dist", ".deploy-manifest.json");
    writeFileSync(manifestPath, JSON.stringify(updatedManifest, null, 2));

    try {
        await manifestClient.uploadFrom(manifestPath, ".deploy-manifest.json");
        console.log("Manifest uploaded successfully");
    } catch (err) {
        console.error("Error uploading manifest:", err);
    }

    manifestClient.close();

    console.log("Deploy complete!");
}

/**
 * Download the remote manifest file from FTP server with retry logic
 * @param {string} server - FTP server hostname
 * @param {string} user - FTP username
 * @param {string} password - FTP password
 * @returns {Promise<Object>} - The remote manifest object, or empty object if download fails
 */
async function downloadRemoteManifest(server, user, password) {
    const client = new Client();
    let remoteManifest = {};

    try {
        client.ftp.verbose = false; // Reduce noise in logs
        await client.access({
            host: server,
            user: user,
            password: password,
            secure: true,
            secureOptions: {
                rejectUnauthorized: false // Allow self-signed certificates
            }
        });

        // Try to download the manifest file with retry logic
        const manifestPath = ".deploy-manifest.json";
        const tempManifestPath = path.resolve("temp-manifest.json");
        const maxRetries = 3;
        let manifestDownloaded = false;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`Attempting to download manifest (attempt ${attempt}/${maxRetries})...`);
                await client.downloadTo(tempManifestPath, manifestPath);
                const manifestContent = readFileSync(tempManifestPath, 'utf8');
                remoteManifest = JSON.parse(manifestContent);
                console.log("Loaded remote manifest with", Object.keys(remoteManifest).length, "entries");
                manifestDownloaded = true;
                break;
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : String(err);
                console.warn(`Manifest download attempt ${attempt}/${maxRetries} failed: ${errorMsg}`);

                if (attempt < maxRetries) {
                    console.log(`Retrying in ${attempt} second(s)...`);
                    await new Promise(resolve => setTimeout(resolve, attempt * 1000));

                    // Reconnect for next attempt
                    try {
                        client.close();
                        await client.access({
                            host: server,
                            user: user,
                            password: password,
                            secure: true,
                            secureOptions: {
                                rejectUnauthorized: false
                            }
                        });
                    } catch (reconnectErr) {
                        console.warn("Reconnection failed:", reconnectErr instanceof Error ? reconnectErr.message : String(reconnectErr));
                    }
                }
            }
        }

        if (!manifestDownloaded) {
            console.log("Could not download remote manifest after", maxRetries, "attempts. Assuming all files need upload.");
        }

        client.close();
    } catch (err) {
        if (err instanceof Error) console.error("Error connecting to FTP server for manifest:", err.message);
        else if (typeof err === 'string') console.error("Error connecting to FTP server for manifest:", err);
        else console.error("Error connecting to FTP server for manifest:", String(err));
    }

    return remoteManifest;
}

/**
 * Calculate MD5 hash of a file
 * @param {string} filePath - Path to the file
 * @returns {string} - MD5 hash of the file
 */
function calculateFileHash(filePath) {
    const fileBuffer = readFileSync(filePath);
    const hashSum = crypto.createHash('md5');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
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
        // Properly construct relative path without leading/double slashes
        const relpath = currentRel ? `${currentRel}/${item}` : item;
        const fullpath = path.resolve(dir, item);
        const stat = statSync(fullpath);
        if (stat.isDirectory()) {
            console.log(`Entering directory: ${relpath}/`);
            recursiveCollectFilesToUpload(fullpath, files, relpath);
        } else {
            console.log(`Found file: ${relpath} (${(stat.size / 1024).toFixed(2)} KB)`);
            const hash = calculateFileHash(fullpath);
            files.push({
                source: fullpath,
                target: relpath,
                size: stat.size,
                hash: hash
            });
        }
    }

    return files;
}


/**
 * Start the upload worker
 * @param {Client} client - The FTP client
 * @param {DeployInfo} files - The array of file paths to upload
 * @param {DeployInfo} uploadedFiles - Array to track successfully uploaded files
 */
async function startUploadWorker(client, files, uploadedFiles) {

    // Take file from array
    while (files.length > 0) {
        const file = files.pop();
        if (!file) continue;
        const { source, target, size, hash } = file;
        const maxRetries = 5;
        let didUpload = false;
        const sizeInMB = size / 1024 / 1024;
        for (let i = 0; i < maxRetries; i++) {
            console.log(`Upload start: ${target} (${sizeInMB.toFixed(2)} MB). Attempt #${i + 1} of ${maxRetries}`);

            // Ensure directory exists before upload
            // Use posix path for FTP paths (forward slashes)
            const targetDir = target.includes('/') ? target.substring(0, target.lastIndexOf('/')) : '';

            try {
                // Always start from root directory
                await client.cd('/');

                // Ensure the directory exists first (this changes current dir)
                if (targetDir) {
                    await client.ensureDir(targetDir);
                    console.log(`Ensured directory: ${targetDir}`);
                    // Go back to root after ensureDir changes the directory
                    await client.cd('/');
                }

                // Upload the file from root directory
                await client.uploadFrom(source, target);
                console.log("Uploaded: ", source, " to ", target);
                didUpload = true;
                break;
            } catch (err) {
                console.error(`Error uploading: ${source} to ${target}`, err);
                if (i < maxRetries - 1) {
                    await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
                }
            }
        }
        if (!didUpload) {
            throw new Error(`Failed to upload ${source} after ${maxRetries} attempts`);
        }

        // Track successfully uploaded file
        uploadedFiles.push({ target, hash, size });

        console.log(`Upload done: ${target} - ${files.length} files left`);
    }

}
