import { Application, JSX, ParameterType, ReflectionKind } from "typedoc";
import path from "path";
import fs from "fs";

/** 
 * @param {import("typedoc").Application} app
 */
export function load(app) {

    const map = new Map();

    app.renderer.on("beginRender", (ctx) => {
        map.clear();
    });

    app.renderer.on("endPage", (page) => {
        // get currently generated page
        const model = page.model;
        const url = page.url;

        map.set(model, url);
    });

    app.renderer.on("endRender", (ctx) => {
        const file = path.join(ctx.outputDirectory, "component-lookup.json");
        const data = {};
        for (const [model, url] of map) {
            // check if there's a duplicate
            if (data[model.name]) {
                console.warn(`Duplicate component name for ${model.name} – component lookup may not work as expected`);
            }
            data[model.name] = url;
        }
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    });
}