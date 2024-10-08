import { Application, JSX, ParameterType, ReflectionKind } from "typedoc";

const optionSiteName = "plausibleSiteDomain";
const optionSiteOrigin = "plausibleSiteOrigin";

/** 
 * @param {import("typedoc").Application} app
 */
export function load(app) {

    // Plausible support
    // from https://gitlab.com/8hobbies/typedoc-plugin-plausible/-/blob/master/index.ts?ref_type=heads

    app.options.addDeclaration({
        name: optionSiteName,
        type: ParameterType.String,
        help: `Domain name used by Plausible Analytics.`,
    });
    app.options.addDeclaration({
        name: optionSiteOrigin,
        type: ParameterType.String,
        help: `Base URL to get Plausible Analytics script from and report to. Should be everything but 'script.js'`,
        defaultValue: "plausible.io/js/",
    });
    app.renderer.hooks.on("head.end", (ctx) => {

        const plausibleSiteDomain = ctx.options.getValue(optionSiteName);
        if (typeof plausibleSiteDomain !== "string") {
            throw TypeError(
            `Unexpected ${optionSiteName} type: ${JSON.stringify(plausibleSiteDomain)}`,
            );
        }
        const plausibleSiteOrigin = ctx.options.getValue(optionSiteOrigin);
        if (typeof plausibleSiteOrigin !== "string") {
            throw TypeError(
            `Unexpected ${optionSiteOrigin} type: ${JSON.stringify(plausibleSiteOrigin)}`,
            );
        }
        const plausibleSrc = !plausibleSiteOrigin.endsWith("/")
            ? `${plausibleSiteOrigin}/`
            : plausibleSiteOrigin;
        if (plausibleSiteDomain === "") {
            // No site specified.
            return JSX.createElement(JSX.Fragment, {});
        }

        return [
            JSX.createElement("script", {
                defer: true,
                "data-domain": plausibleSiteDomain,
                src: `https://${plausibleSrc}script.manual.outbound-links.pageview-props.js`,
            }),
            JSX.createElement("script", null, JSX.createElement(JSX.Raw, {
                html: "window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }"
            })),
            JSX.createElement("script", null, JSX.createElement(JSX.Raw, {
                html: `
    // the start of the URL has this form:
    // /docs/api/@needle-tools/engine/3.48.3/<actually interesting part>
    // so we need to extract the interesting part.
    const url = window.location.pathname;
    const parts = url.split("/");
    // find index of the part that looks like a version (contains two dots and the first two parts are numbers)
    const versionIndex = parts.findIndex((part, index) => {
        const subParts = part.split(".");
        return subParts.length === 3 && !isNaN(subParts[0]) && !isNaN(subParts[1]);
    });
    let interestingPart = parts.slice(versionIndex + 1).join("/");
    if (interestingPart.startsWith("/")) 
        interestingPart = interestingPart.slice(1);
    const engineVersion = parts[versionIndex];
    console.log("Plausible PageView", interestingPart, engineVersion);
    plausible('pageview', {
        u: "https://api.needle.tools/" + interestingPart + window.location.search,
        props: { version: engineVersion },
    });
`
                }),
            ),
        ];
    });   
}