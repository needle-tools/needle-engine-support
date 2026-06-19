import { JSX, ParameterType } from "typedoc";

const optionSiteId = "rybbitSiteId";
const optionScriptSrc = "rybbitScriptSrc";

/**
 * @param {import("typedoc").Application} app
 */
export function load(app) {

    // Rybbit Analytics support.
    // Replaces the previous Plausible plugin. Rybbit auto-tracks pageviews
    // (so "which page was viewed" is captured out of the box). Sites are
    // identified by data-site-id, not by domain.

    app.options.addDeclaration({
        name: optionSiteId,
        type: ParameterType.String,
        help: `Rybbit Analytics site id (data-site-id). Leave empty to disable.`,
    });
    app.options.addDeclaration({
        name: optionScriptSrc,
        type: ParameterType.String,
        help: `URL of the Rybbit Analytics tracking script.`,
        defaultValue: "https://analytics-2.needle.tools/api/script.js",
    });

    app.renderer.hooks.on("head.end", (ctx) => {

        const siteId = ctx.options.getValue(optionSiteId);
        if (typeof siteId !== "string") {
            throw TypeError(
                `Unexpected ${optionSiteId} type: ${JSON.stringify(siteId)}`,
            );
        }
        if (siteId === "") {
            // No site specified -> disable analytics.
            return JSX.createElement(JSX.Fragment, {});
        }
        const scriptSrc = ctx.options.getValue(optionScriptSrc);

        return [
            JSX.createElement("script", {
                defer: true,
                src: scriptSrc,
                "data-site-id": siteId,
            }),
            // Rybbit auto-tracks the pageview for the current path, which already
            // tells us which API page was viewed. In addition we fire a custom
            // event carrying the page (normalized, without the version segment)
            // and the engine version, so we keep a per-version breakdown.
            JSX.createElement("script", null, JSX.createElement(JSX.Raw, {
                html: `
    // The API docs URL has this form:
    // /docs/api/@needle-tools/engine/3.48.3/<actually interesting part>
    // so we extract the interesting part and the version.
    window.addEventListener("load", function () {
        try {
            if (!window.rybbit || typeof window.rybbit.event !== "function") return;
            const parts = window.location.pathname.split("/");
            // find index of the part that looks like a version (contains two dots and the first two parts are numbers)
            const versionIndex = parts.findIndex((part) => {
                const subParts = part.split(".");
                return subParts.length === 3 && !isNaN(subParts[0]) && !isNaN(subParts[1]);
            });
            if (versionIndex === -1) return;
            let page = parts.slice(versionIndex + 1).join("/");
            if (page.startsWith("/")) page = page.slice(1);
            const version = parts[versionIndex];
            console.debug("Rybbit api-pageview", { page, version });
            window.rybbit.event("api-pageview", { page: page || "index", version });
        } catch (e) {
            console.debug("Rybbit api-pageview error", e);
        }
    });
`
            })),
        ];
    });
}
