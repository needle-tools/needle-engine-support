import { Application } from "typedoc";

/**
 * This plugin adds canonical URLs pointing to the version-less latest URL
 * This is critical for SEO to avoid duplicate content issues across different versions
 * @param {import("typedoc").Application} app
 */
export function load(app) {

    app.renderer.on("endPage", (page) => {
        if (!page.contents || !page.url) return;

        // Extract the relative path
        // e.g., "classes/Built-in_Components.Animation.html" or "index.html"
        const url = page.url;

        // Build the canonical URL pointing to the version-less path
        // The canonical URL should be: https://engine.needle.tools/docs/api/{path}
        const canonicalUrl = `https://engine.needle.tools/docs/api/${url}`;
        const canonicalTag = `<link rel="canonical" href="${canonicalUrl}"/>`;

        // First, remove any existing canonical URLs that TypeDoc might have added
        // TypeDoc uses hostedBaseUrl to generate canonical URLs, but those include version numbers
        page.contents = page.contents.replace(
            /<link rel="canonical" href="[^"]*"\/>/g,
            ''
        );

        // Now insert our correct canonical link in the <head> section
        // This ensures Google and other search engines know this is a duplicate of the main URL

        // Try to insert after the meta description tag if it exists
        if (page.contents.includes('<meta name="description"')) {
            page.contents = page.contents.replace(
                /(<meta name="description" content="[^"]*"\/>)/,
                `$1${canonicalTag}`
            );
        }
        // Otherwise, insert after the title tag
        else if (page.contents.includes('</title>')) {
            page.contents = page.contents.replace(
                /(<\/title>)/,
                `$1${canonicalTag}`
            );
        }
        // Fallback: insert before viewport meta tag
        else {
            page.contents = page.contents.replace(
                /(<meta name="viewport")/,
                `${canonicalTag}$1`
            );
        }
    });
}
