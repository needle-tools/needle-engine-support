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

        // 1. Get the registry metadata
        const meta = await fetch(registryUrl).then(r => r.json());
        const allVersions = Object.keys(meta.versions ?? {});
        if (!allVersions.length) {
            console.warn(`[fetch-engine-data] No versions listed for ${registryUrl}`);
            return;
        }

        // The target file may not exist in `dist-tags.latest` (e.g. a feature that
        // only shipped in a newer release line that isn't tagged `latest` yet).
        // Try `latest` first, then fall back to the newest version that contains it.
        const candidates = orderVersionCandidates(allVersions, meta['dist-tags']?.latest);

        for (const version of candidates) {
            const tarballUrl = meta.versions?.[version]?.dist?.tarball;
            if (!tarballUrl) continue;

            if (debugLog) console.log(`[fetch-engine-data] ${label}: trying v${version} → ${tarballUrl}`);

            const res = await fetch(tarballUrl);
            if (!res.ok) {
                console.warn(`[fetch-engine-data] Failed to fetch tarball v${version}: ${res.status} ${res.statusText}`);
                continue;
            }

            const fileContent = await extractFileFromTarGz(res.body, filePath);
            if (fileContent === null) {
                if (debugLog) console.log(`[fetch-engine-data] "${filePath}" not in v${version}, trying older`);
                continue;
            }

            // Validate it's valid JSON and write
            JSON.parse(fileContent); // throws if invalid
            fs.writeFileSync(outputFile, fileContent, 'utf-8');
            console.log(`[fetch-engine-data] ✓ ${label} (v${version}, ${(fileContent.length / 1024).toFixed(1)}KB)`);
            return;
        }

        console.warn(`[fetch-engine-data] File "${filePath}" not found in any version of ${label}`);
    }
    catch (err) {
        console.warn(`[fetch-engine-data] Error fetching ${label}:`, err.message);
    }
}

/**
 * Builds the order in which package versions should be tried when locating a file:
 * the `latest` dist-tag first, then all remaining versions newest-first, with
 * stable releases preferred over pre-releases. Capped to avoid pulling many tarballs.
 * @param {string[]} versions
 * @param {string|undefined} latest
 * @returns {string[]}
 */
function orderVersionCandidates(versions, latest) {
    const sorted = [...versions].sort(compareVersionsDesc);
    const ordered = latest && versions.includes(latest)
        ? [latest, ...sorted.filter(v => v !== latest)]
        : sorted;
    return ordered.slice(0, 10);
}

/** Parses a semver-ish string into comparable parts. */
function parseVersion(v) {
    const [core, prerelease = null] = String(v).split('-');
    const [major = 0, minor = 0, patch = 0] = core.split('.').map(n => parseInt(n, 10) || 0);
    return { major, minor, patch, prerelease };
}

/** Descending semver comparator; stable releases rank before pre-releases of the same core. */
function compareVersionsDesc(a, b) {
    const pa = parseVersion(a), pb = parseVersion(b);
    if (!!pa.prerelease !== !!pb.prerelease) return pa.prerelease ? 1 : -1;
    if (pa.major !== pb.major) return pb.major - pa.major;
    if (pa.minor !== pb.minor) return pb.minor - pa.minor;
    if (pa.patch !== pb.patch) return pb.patch - pa.patch;
    if (pa.prerelease && pb.prerelease) {
        return pb.prerelease.localeCompare(pa.prerelease, undefined, { numeric: true });
    }
    return 0;
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
