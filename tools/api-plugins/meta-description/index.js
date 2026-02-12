import { Application, RendererEvent } from "typedoc";

/**
 * This plugin generates proper meta descriptions from JSDoc comments
 * @param {import("typedoc").Application} app
 */
export function load(app) {

    app.renderer.on("endPage", (page) => {
        // Get the model for the current page
        const model = page.model;

        // Only process pages that have a comment (JSDoc)
        if (!model || !model.comment) return;

        // Extract the summary or first paragraph of the description
        let description = "";

        // Try to get the summary first
        if (model.comment.summary && model.comment.summary.length > 0) {
            description = extractTextFromCommentParts(model.comment.summary);
        }

        // If no summary, try the first block tag
        if (!description && model.comment.blockTags && model.comment.blockTags.length > 0) {
            const firstBlock = model.comment.blockTags[0];
            if (firstBlock.content && firstBlock.content.length > 0) {
                description = extractTextFromCommentParts(firstBlock.content);
            }
        }

        // Clean up the description
        if (description) {
            // Remove markdown formatting
            description = description
                .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links
                .replace(/[*_~`]/g, '') // Remove markdown formatting
                .replace(/\n+/g, ' ') // Replace newlines with spaces
                .replace(/\s+/g, ' ') // Collapse multiple spaces
                .trim();

            // Truncate to a reasonable length for meta descriptions (155-160 chars)
            if (description.length > 155) {
                description = description.substring(0, 152) + '...';
            }

            // Update the page contents to include the custom meta description
            if (page.contents) {
                // Replace the generic meta description with our custom one
                page.contents = page.contents.replace(
                    /<meta name="description" content="[^"]*"\/>/,
                    `<meta name="description" content="${escapeHtml(description)}"/>`
                );
            }
        }
    });
}

/**
 * Extract plain text from TypeDoc comment parts
 * @param {import("typedoc").CommentDisplayPart[]} parts
 * @returns {string}
 */
function extractTextFromCommentParts(parts) {
    if (!parts || parts.length === 0) return "";

    return parts.map(part => {
        if (typeof part === "string") return part;
        if (part.text) return part.text;
        if (part.kind === "text" && part.text) return part.text;
        if (part.kind === "code" && part.text) return part.text;
        return "";
    }).join("").trim();
}

/**
 * Escape HTML entities
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
