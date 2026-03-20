import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { createGunzip } from 'zlib';
import { extract } from 'tar-stream';

const debugLog = process.env.NODE_ENV === "production";

/**
 * Fetches `components.needle.json` from the latest `@needle-tools/engine` npm package
 * and `materialx_node_coverage.json` from the latest `com.needle.engine-exporter` package.
 * Writes them to `.vuepress/public/meta/` so they're available at build time and as static assets.
 *
 * @returns {import("vuepress").Plugin}
 */
export const fetchEngineData = (args, ctx) => {
    const options = args.options;
    const outputDirectory = options.source + '/.vuepress/public/meta';

    return {
        name: 'fetch-engine-data',
        async onInitialized(app) {
            if (!fs.existsSync(outputDirectory)) {
                fs.mkdirSync(outputDirectory, { recursive: true });
            }

            await Promise.all([
                fetchNpmPackageFile({
                    registryUrl: 'https://registry.npmjs.org/@needle-tools/engine',
                    filePath: 'package/components.needle.json',
                    outputFile: path.join(outputDirectory, 'components.needle.json'),
                    label: '@needle-tools/engine → components.needle.json',
                }),
                fetchNpmPackageFile({
                    registryUrl: 'https://packages.needle.tools/com.needle.engine-exporter',
                    filePath: 'package/Shaders/Editor/MaterialX/Internals/materialx_node_coverage.json',
                    outputFile: path.join(outputDirectory, 'materialx_node_coverage.json'),
                    label: 'com.needle.engine-exporter → materialx_node_coverage.json',
                }),
            ]);
        },
    };
};

/**
 * Fetches the latest tarball from an npm-compatible registry and extracts a single file.
 * @param {{ registryUrl: string, filePath: string, outputFile: string, label: string }} opts
 */
async function fetchNpmPackageFile({ registryUrl, filePath, outputFile, label }) {
    try {
        console.log(`[fetch-engine-data] Fetching ${label}...`);

        // 1. Get the tarball URL from the registry
        const meta = await fetch(registryUrl).then(r => r.json());
        const latest = meta['dist-tags']?.latest;
        if (!latest) {
            console.warn(`[fetch-engine-data] Could not determine latest version for ${registryUrl}`);
            return;
        }
        const tarballUrl = meta.versions?.[latest]?.dist?.tarball;
        if (!tarballUrl) {
            console.warn(`[fetch-engine-data] No tarball URL for ${registryUrl}@${latest}`);
            return;
        }

        if (debugLog) console.log(`[fetch-engine-data] ${label}: v${latest} → ${tarballUrl}`);

        // 2. Stream the tarball and extract the target file
        const res = await fetch(tarballUrl);
        if (!res.ok) {
            console.warn(`[fetch-engine-data] Failed to fetch tarball: ${res.status} ${res.statusText}`);
            return;
        }

        const fileContent = await extractFileFromTarGz(res.body, filePath);
        if (fileContent === null) {
            console.warn(`[fetch-engine-data] File "${filePath}" not found in tarball`);
            return;
        }

        // 3. Validate it's valid JSON and write
        JSON.parse(fileContent); // throws if invalid
        fs.writeFileSync(outputFile, fileContent, 'utf-8');
        console.log(`[fetch-engine-data] ✓ ${label} (v${latest}, ${(fileContent.length / 1024).toFixed(1)}KB)`);
    }
    catch (err) {
        console.warn(`[fetch-engine-data] Error fetching ${label}:`, err.message);
    }
}

/**
 * Extracts a single file from a .tar.gz stream.
 * @param {ReadableStream} body - fetch response body
 * @param {string} targetPath - path inside the tar to extract
 * @returns {Promise<string|null>}
 */
function extractFileFromTarGz(body, targetPath) {
    return new Promise((resolve, reject) => {
        const ex = extract();
        let found = null;

        ex.on('entry', (header, stream, next) => {
            if (header.name === targetPath) {
                const chunks = [];
                stream.on('data', chunk => chunks.push(chunk));
                stream.on('end', () => {
                    found = Buffer.concat(chunks).toString('utf-8');
                    next();
                });
            } else {
                stream.on('end', next);
                stream.resume();
            }
        });

        ex.on('finish', () => resolve(found));
        ex.on('error', reject);

        const gunzip = createGunzip();
        gunzip.on('error', reject);

        // Node ReadableStream from fetch → pipe through gunzip → pipe to tar extractor
        const nodeStream = readableStreamToNodeStream(body);
        nodeStream.pipe(gunzip).pipe(ex);
    });
}

/**
 * Converts a web ReadableStream to a Node.js Readable stream.
 * @param {ReadableStream} webStream
 * @returns {import('stream').Readable}
 */
function readableStreamToNodeStream(webStream) {
    return Readable.fromWeb(webStream);
}
