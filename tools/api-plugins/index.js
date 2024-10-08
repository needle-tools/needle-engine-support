import { Application, JSX, ParameterType, ReflectionKind } from "typedoc";

const optionSiteName = "plausibleSiteDomain";
const optionSiteOrigin = "plausibleSiteOrigin";

/** 
 * This plugin is used to load a plugin that throws an error
 * @param {import("typedoc").Application} app
 */
export function load(app) {

    app.converter.addUnknownSymbolResolver((declaration) => {
        const names = declaration.symbolReference?.path;
        if (!names) return;
        const dottedName = stringifyPath(names);
        let url = tryGetThreejsDocsLink(dottedName);
        if (url) {
            return {
                target: url,
                caption: dottedName,
            }
        }
    });

    // Keywords support
    // from https://github.com/matteobruni/typedoc-plugins/blob/main/plugins/keywords/src/index.tsx
    app.options.addDeclaration({
        name: "keywords",
        type: ParameterType.Array,
        help: "Website keywords",
    });
    
    app.renderer.hooks.on("head.begin", (ctx) => {
        /** @type string[] */
        const keywords = ctx.options.getValue("keywords");

        // convert to JSX.createElement:
        return JSX.createElement("meta", {
            name: "keywords",
            content: keywords.join(", "),
        });
    });

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

        return JSX.createElement("script", {
            defer: true,
            "data-domain": plausibleSiteDomain,
            src: `https://${plausibleSrc}script.js`,
        });
    });   
}

const threejsDocsLinkCache = new Map();
const urls = [
    "Color: https://threejs.org/docs/index.html#api/en/math/Color",
    "ColorRepresentation: https://threejs.org/docs/index.html#api/en/math/Color",
    "Vector4: https://threejs.org/docs/index.html#api/en/math/Vector4",
    "Vector3: https://threejs.org/docs/index.html#api/en/math/Vector3",
    "Vector2: https://threejs.org/docs/index.html#api/en/math/Vector2",
    "Matrix4: https://threejs.org/docs/index.html#api/en/math/Matrix4",
    "Euler: https://threejs.org/docs/index.html#api/en/math/Euler",
    "Quaternion: https://threejs.org/docs/index.html#api/en/math/Quaternion",
    "Matrix3: https://threejs.org/docs/index.html#api/en/math/Matrix3",
    "Camera: https://threejs.org/docs/index.html#api/en/cameras/Camera",
    "Material: https://threejs.org/docs/index.html#api/en/materials/Material",
    "Texture: https://threejs.org/docs/index.html#api/en/textures/Texture",
    "Mesh: https://threejs.org/docs/index.html#api/en/objects/Mesh",
    "Object3D: https://threejs.org/docs/index.html#api/en/core/Object3D",
    "Group: https://threejs.org/docs/index.html#api/en/objects/Group",
    "AnimationClip: https://threejs.org/docs/index.html#api/en/animation/AnimationClip",
    "PropertyMixer: https://threejs.org/docs/index.html#api/en/animation/PropertyMixer",
    "AnimationMixer: https://threejs.org/docs/index.html#api/en/animation/AnimationMixer",
    "Geometry: https://threejs.org/docs/index.html#api/en/core/Geometry",
    "BufferGeometry: https://threejs.org/docs/index.html#api/en/core/BufferGeometry",
    "Light: https://threejs.org/docs/index.html#api/en/lights/Light",
    "LightShadow: https://threejs.org/docs/index.html#api/en/lights/shadows/LightShadow",
    "SpotLight: https://threejs.org/docs/index.html#api/en/lights/SpotLight",
    "OrbitControls: https://threejs.org/docs/index.html#examples/en/controls/OrbitControls",
    "PerspectiveCamera: https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera",
    "WebGLRenderer: https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer",
    "Raycaster: https://threejs.org/docs/index.html#api/en/core/Raycaster",
];

function tryGetThreejsDocsLink(dottedName) {
    if (threejsDocsLinkCache.has(dottedName)) {
        return threejsDocsLinkCache.get(dottedName);
    }
    threejsDocsLinkCache.set(dottedName, null);
    const name = dottedName.split(".").pop();
    for (const test of urls) {
        const [testName, url] = test.split(": ");
        if (testName === name) {
            console.log("Found", name, url);
            threejsDocsLinkCache.set(dottedName, url);
            return url;
        }
    }
    return null;
}


/** Stringify a path 
 * @param {import("typedoc").NavigationItem[]} path
*/
function stringifyPath(path) {
    let result = path[0].path;

    for (const part of path.slice(1)) {
        result += part.navigation + part.path;
    }

    return result;
}