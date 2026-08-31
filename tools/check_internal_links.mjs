import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const docsDirectory = resolve("documentation");
const outputDirectory = resolve("dist");
const markdownFiles = [];

function collectMarkdownFiles(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        if (entry.name.startsWith(".") || entry.name === "node_modules") continue;

        const path = join(directory, entry.name);
        if (entry.isDirectory()) collectMarkdownFiles(path);
        else if (entry.name.endsWith(".md")) markdownFiles.push(path);
    }
}

function routeCandidates(url) {
    const route = decodeURIComponent(url.split(/[?#]/, 1)[0]).slice("/docs/".length);
    if (!route) return [join(outputDirectory, "index.html")];
    if (
        route.startsWith("api/") ||
        route.startsWith("downloads/") ||
        route.startsWith("reference/changelogs/")
    ) return [];

    if (route.endsWith("/")) {
        return [join(outputDirectory, route, "index.html")];
    }

    if (extname(route)) {
        return [join(outputDirectory, route)];
    }

    return [
        join(outputDirectory, `${route}.html`),
        join(outputDirectory, route, "index.html"),
    ];
}

collectMarkdownFiles(docsDirectory);

const failures = [];
const linkPattern = /(?:\[[^\]]*\]\(|href=["'])(\/docs\/[^\s)"']+)/g;

for (const file of markdownFiles) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(linkPattern)) {
        const url = match[1];
        const candidates = routeCandidates(url);
        if (candidates.length === 0) continue;

        const line = source.slice(0, match.index).split("\n").length;
        const generatedPage = candidates.find(existsSync);
        if (!generatedPage) {
            failures.push(`${relative(process.cwd(), file)}:${line} -> ${url}`);
        }
    }
}

if (failures.length > 0) {
    console.error(`Found ${failures.length} internal link(s) without a generated route:`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
}
else {
    console.log(`Checked internal routes in ${markdownFiles.length} Markdown files.`);
}
