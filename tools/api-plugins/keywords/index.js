import { Application, JSX, ParameterType, ReflectionKind } from "typedoc";

/** 
 * @param {import("typedoc").Application} app
 */
export function load(app) {

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

}