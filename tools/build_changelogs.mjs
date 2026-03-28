import https from 'https';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync } from 'child_process';

const packages = [
    {
        npm: '@needle-tools/engine',
        title: 'Needle Engine',
        slug: 'needle-engine',
    },
    {
        npm: '@needle-tools/gltf-progressive',
        title: 'gltf-progressive',
        slug: 'gltf-progressive',
    },
    {
        npm: '@needle-tools/three-animation-pointer',
        title: 'three-animation-pointer',
        slug: 'three-animation-pointer',
    },
    {
        npm: '@needle-tools/materialx',
        title: 'Needle MaterialX',
        slug: 'materialx',
    },
];

const outputDir = path.resolve(process.cwd(), 'documentation/reference/changelogs');

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                fetchJson(res.headers.location).then(resolve, reject);
                return;
            }
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch (e) { reject(e); }
            });
            res.on('error', reject);
        }).on('error', reject);
    });
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const follow = (url) => {
            https.get(url, (res) => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    follow(res.headers.location);
                    return;
                }
                res.pipe(file);
                file.on('finish', () => { file.close(); resolve(); });
            }).on('error', (e) => { fs.unlinkSync(dest); reject(e); });
        };
        follow(url);
    });
}

async function extractChangelog(pkg) {
    const registryUrl = `https://registry.npmjs.org/${encodeURIComponent(pkg.npm).replace('%40', '@')}`;
    console.log(`Fetching ${pkg.npm} from registry...`);

    const meta = await fetchJson(registryUrl);
    const latest = meta['dist-tags']?.latest;
    if (!latest) {
        console.warn(`  No latest version found for ${pkg.npm}, skipping.`);
        return null;
    }

    const tarballUrl = meta.versions[latest]?.dist?.tarball;
    if (!tarballUrl) {
        console.warn(`  No tarball URL for ${pkg.npm}@${latest}, skipping.`);
        return null;
    }

    console.log(`  Latest: ${latest}, downloading tarball...`);

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'changelog-'));
    const tarPath = path.join(tmpDir, 'pkg.tgz');

    try {
        await downloadFile(tarballUrl, tarPath);
        execSync(`tar xzf "${tarPath}" -C "${tmpDir}"`, { stdio: 'pipe' });

        // Look for CHANGELOG.md (case-insensitive)
        const packageDir = path.join(tmpDir, 'package');
        const files = fs.readdirSync(packageDir);
        const changelogFile = files.find(f => f.toLowerCase() === 'changelog.md' || f.toLowerCase() === 'changelog');

        if (!changelogFile) {
            console.warn(`  No CHANGELOG.md found in ${pkg.npm}@${latest}`);
            return null;
        }

        const changelog = fs.readFileSync(path.join(packageDir, changelogFile), 'utf8');
        console.log(`  Extracted changelog (${changelog.length} chars)`);
        return { version: latest, content: changelog };
    } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    }
}

/**
 * Escape HTML-like tags in markdown content so VuePress doesn't
 * interpret them as Vue components. Preserves content inside
 * fenced code blocks (``` ... ```) and inline code (`...`).
 */
function escapeHtmlTags(content) {
    const lines = content.split('\n');
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Track fenced code blocks
        if (line.trimStart().startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }
        if (inCodeBlock) continue;

        // Process segments outside of inline code spans
        // Split by backtick-delimited code spans, escape only non-code parts
        const parts = line.split(/(`[^`]*`)/g);
        for (let j = 0; j < parts.length; j++) {
            // Odd indices are inside backticks — skip them
            if (j % 2 === 1) continue;
            // Escape angle brackets around tag-like content (e.g. <needle-engine>, <SomeComponent>)
            // but not standard HTML like <br>, <img>, <a>, <p>, <li>, <ul>, <ol>, <h1>-<h6>, <strong>, <em>, <code>, <pre>, <div>, <span>, <table>, <tr>, <td>, <th>, <thead>, <tbody>
            parts[j] = parts[j].replace(/<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([\s>\/])/g, (match, slash, tag, after) => {
                const standardHtml = [
                    'a', 'abbr', 'b', 'blockquote', 'br', 'code', 'dd', 'del', 'details', 'div', 'dl', 'dt',
                    'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'input',
                    'kbd', 'li', 'ol', 'p', 'pre', 'ruby', 's', 'span', 'strong', 'sub', 'summary', 'sup',
                    'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'u', 'ul', 'var',
                ];
                if (standardHtml.includes(tag.toLowerCase())) return match;
                return `&lt;${slash}${tag}${after}`;
            });
        }
        lines[i] = parts.join('');
    }

    return lines.join('\n');
}

function generatePage(pkg, version, changelogContent) {
    // Remove the first H1 heading if it just says "Changelog" since we provide our own title
    let content = changelogContent;
    const h1Match = content.match(/^#\s+changelog\s*$/im);
    if (h1Match) {
        content = content.substring(0, h1Match.index) + content.substring(h1Match.index + h1Match[0].length);
    }
    // Also remove the "All notable changes..." line that typically follows
    content = content.replace(/^\s*All notable changes to this package will be documented in this file\.\s*\n*/im, '');
    content = content.replace(/^\s*The format is based on \[Keep a Changelog\].*\n*/im, '');
    content = content.replace(/^\s*and this project adheres to \[Semantic Versioning\].*\n*/im, '');

    // Clean up version headings: ## [3.3.4] - 2025-09-10 → ## 3.3.4 - 2025-09-10
    content = content.replace(/^(#{1,3})\s*\[([^\]]+)\]/gm, '$1 $2');

    // Escape HTML-like tags that VuePress would try to parse as Vue components.
    // We need to handle this carefully to not break actual markdown/HTML.
    // Replace <tag-name> and <tag-name ...> outside of backtick code spans/blocks
    // with escaped versions using HTML entities.
    content = escapeHtmlTags(content);

    // Trim leading newlines
    content = content.replace(/^\n+/, '');

    return `---
title: "${pkg.title} Changelog"
---

# ${pkg.title} Changelog

[\`${pkg.npm}\`](https://www.npmjs.com/package/${pkg.npm}) — Latest: **${version}**

${content}`;
}

async function main() {
    console.log('Building changelogs...\n');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const pkg of packages) {
        try {
            const result = await extractChangelog(pkg);
            if (!result) continue;

            const page = generatePage(pkg, result.version, result.content);
            const outPath = path.join(outputDir, `${pkg.slug}.md`);
            fs.writeFileSync(outPath, page, 'utf8');
            console.log(`  Written: ${outPath}\n`);
        } catch (e) {
            console.error(`  Error processing ${pkg.npm}:`, e.message);
        }
    }

    console.log('Done building changelogs.');
}

main().catch(e => {
    console.error('Fatal error:', e);
    process.exit(1);
});
