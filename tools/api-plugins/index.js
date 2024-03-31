

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
    "Geometry: https://threejs.org/docs/index.html#api/en/core/Geometry",
    "BufferGeometry: https://threejs.org/docs/index.html#api/en/core/BufferGeometry",
    "Light: https://threejs.org/docs/index.html#api/en/lights/Light",
    "LightShadow: https://threejs.org/docs/index.html#api/en/lights/shadows/LightShadow",
    "SpotLight: https://threejs.org/docs/index.html#api/en/lights/SpotLight",
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