---
title: OpenUSD & MaterialX on Needle Cloud
description: 'Host, share, and view OpenUSD and MaterialX right in the browser. Upload USD, USDA, USDC, USDZ and MaterialX files to Needle Cloud, render the real composed stage through Hydra, and get an optimized, web-ready GLB automatically — powered by OpenUSD 26.05 and MaterialX 1.39.5.'
image: /imgs/openusd-materialx.webp
---

<br/>
<discountbanner/>

# OpenUSD & MaterialX on Needle Cloud

![OpenUSD and MaterialX in the browser](/imgs/openusd-materialx.webp)

Needle Cloud lets you **host, share, and view OpenUSD and MaterialX directly in the browser** — no plugin, no download, no desktop DCC required. Upload a `.usd`, `.usdz` or MaterialX file and get a shareable link that renders the real composed stage through Hydra, on desktop and mobile.

Under the hood, Needle Cloud and the [Needle USD Viewer](https://usd-viewer.needle.tools) run a modern **OpenUSD 26.05** WebAssembly runtime with a Needle-maintained three.js Hydra render delegate, plus **MaterialX 1.39.5** for rich, physically-based materials. The same technology powers USD support in [Needle Engine](/docs/) and the [`@needle-tools/usd`](https://www.npmjs.com/package/@needle-tools/usd) package (now generally available as 1.0).

:::tip Quick links
**Try it:** [Open the USD Viewer](https://usd-viewer.needle.tools) • **Host your files:** [Upload to Needle Cloud](https://cloud.needle.tools) • **Build with it:** [`@needle-tools/usd` on npm](https://www.npmjs.com/package/@needle-tools/usd)
:::

## What you can do

- **Host any USD flavor.** Upload `USD`, `USDA`, `USDC`, `USDZ`, and MaterialX (`.mtlx`) files — they're stored, versioned, and served from a global CDN.
- **Share a link.** Every upload gets a unique, shareable viewer URL. Label versions (`main`, `dev`, `review`) and share links that auto-update.
- **View in the browser.** The stage is composed and rendered with Hydra — variants, payloads, references, and instancing resolve exactly as they would in `usdview`.
- **Optimize automatically.** USD is converted to glTF with Draco, KTX2 and [Progressive Loading](/docs/gltf-progressive/) for fast, lightweight delivery — while the original file is kept for download.
- **Embed anywhere.** Drop the asset into your own site via the Needle Cloud viewer, Needle Engine, three.js, React-Three-Fiber, or model-viewer.

## Supported USD & MaterialX features

Needle Cloud renders OpenUSD through Hydra, so composition and scene features work the way the format intends:

| Capability | Support |
| --- | --- |
| **File formats** | `USD`, `USDA`, `USDC`, `USDZ`, `glTF`/`GLB`, and MaterialX (`.mtlx`) |
| **Composition** | References, payloads, variants, and nested packages resolve together |
| **Instancing** | Native instances and `PointInstancer` prims |
| **Visibility** | Prim visibility and purpose-based filtering (`render`, `proxy`, `guide`) |
| **Cameras & lights** | USD cameras and UsdLux lights |
| **Materials** | UsdPreviewSurface and **MaterialX** via Hydra material documents |
| **Geometry** | OpenSubdiv smooth surfaces and creases |
| **Compression** | `usdDraco` and `usdGltfDraco` compressed meshes |

### Enabled OpenUSD plugins

The web runtime is built on OpenUSD 26.05 with these plugins enabled for browser use:

- **OpenSubdiv** — smooth subdivision surfaces and creases, matching offline results.
- **Adobe glTF file format** (`usdGltf`) — load glTF/GLB directly inside a USD stage (glTF-in-USD).
- **usdDraco & usdGltfDraco** — compressed meshes for smaller files and faster loads.
- **MaterialX in USD** — rich, portable materials authored as MaterialX graphs, resolved through Hydra.

### MaterialX in the browser

MaterialX materials render with full environment lighting, real-time shadows, and **vertex displacement** — procedural or texture-based — so you get rich, interactive materials rather than a flat preview. MaterialX support is shared across Needle Cloud, the USD Viewer, and Needle Engine, so a material that looks right in one looks right everywhere.

You can author MaterialX directly, or **export it to the web from Unity's Shader Graph** — Needle's Shader Graph export benefits automatically from these capabilities. See the [MaterialX guide](/docs/how-to-guides/export/materialx) for details.

## How it works

Needle Cloud pairs two things:

1. **A modern OpenUSD 26.05 WebAssembly runtime**, maintained by Needle, with Hydra imaging enabled.
2. **A three.js Hydra render delegate** that turns Hydra scene updates into WebGL/WebGPU objects.

When you upload a USD file, Needle Cloud composes the stage and renders it live. For distribution and use in other tools, it also **converts USD to glTF** and applies Draco, KTX2 and Progressive Loading — while keeping your original USD available for download. This gives you both an accurate USD view and an optimized, web-ready asset from a single upload.

:::tip Note on export
USD files can be uploaded, viewed, shared and downloaded as glTF. Exporting an edited scene *back* to USD is not yet supported on Needle Cloud (the OpenUSD wasm API can package authored stages as USDZ in the viewer/package workflows).
:::

## Use USD assets in your projects

- **MaterialX from Unity Shader Graph** — in the Needle Engine Unity integration, Shader Graphs are exported to MaterialX and load **natively** in the browser. No extra component or manual setup required.
- **USD on the web** — drop your USD file into Needle Cloud and it's **automatically converted to an optimized GLB**. Just reference that GLB URL from Needle Engine, three.js, or any framework — Draco, KTX2 and [Progressive Loading](/docs/gltf-progressive/) are already applied.
- **three.js** — use the [`@needle-tools/usd`](https://www.npmjs.com/package/@needle-tools/usd) package (1.0) to load and render USD directly via Hydra, or embed the converted glTF with Progressive Loading.

## Integrate live USD in your own Needle Engine project

Want to render **real, composed USD** (not the converted GLB) directly in your own Needle Engine app? Use the [`@needle-tools/usd`](https://www.npmjs.com/package/@needle-tools/usd) package — the same OpenUSD 26.05 wasm runtime and three.js Hydra bridge that power the USD Viewer. It plugs into Needle Engine so you can point a `<needle-engine>` at a `.usd` / `.usdz` file.

**1. Install the package**

```sh
npm install @needle-tools/usd @needle-tools/engine three
```

**2. Enable cross-origin isolation**

The USD runtime is threaded (it uses `SharedArrayBuffer`), so the page must be served with cross-origin isolation headers:

```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

For local Vite development, add the package plugin — it sets these headers for you:

```js
// vite.config.js
import { needleUSD } from "@needle-tools/usd/vite";

export default {
  plugins: [needleUSD()],
};
```

**3. Register the USD plugin and load a stage**

The only rule is ordering: **register the USD plugin before Needle Engine loads a USD file**. Put the `<needle-engine>` element in your HTML without a `src`, then set the source once `addPluginForNeedleEngine()` has resolved:

```html
<!doctype html>
<html>
  <body style="margin:0">
    <needle-engine camera-controls contactshadows="0.7"></needle-engine>

    <script type="module">
      import "@needle-tools/engine";
      import { addPluginForNeedleEngine } from "@needle-tools/usd/plugins";

      // Register the USD plugin, then point Needle Engine at your USD/USDZ file.
      // getFiles returns the set of files to load — empty for a single self-contained file.
      await addPluginForNeedleEngine({ getFiles: () => [] });
      document.querySelector("needle-engine").setAttribute("src", "./model.usdz");
    </script>
  </body>
</html>
```

That's it — the stage is composed through Hydra and rendered inside Needle Engine, with full environment lighting, shadows, and MaterialX.

:::tip Folder & drag-and-drop workflows
For USD files that **reference other files**, return the active file set from `getFiles` instead of an empty array: `getFiles: () => [...]`. The first entry must be the root USD file, and each file should carry a stable `path` property so references resolve. Pass `autoPlay: true` to `addPluginForNeedleEngine` to start USD timeline playback automatically after loading.
:::

:::tip Which path should I use?
For most product/marketing scenes, **[dropping the USD into Needle Cloud](#use-usd-assets-in-your-projects)** and referencing the auto-generated GLB is the fastest, lightest option (Draco, KTX2, Progressive Loading included). Reach for the `@needle-tools/usd` package when you need the **live, fully-composed USD stage** — variants, payloads, point instancers, purpose visibility, and MaterialX resolved at runtime.
:::

For the full package reference (three.js usage, import maps, low-level Hydra API), see the [`@needle-tools/usd` package on npm](https://www.npmjs.com/package/@needle-tools/usd).

## Related

- [Needle Cloud overview](/docs/cloud/) — hosting, optimization, versioning, and sharing
- [Supported 3D formats](/docs/cloud/#supported-3d-formats)
- [MaterialX with Needle Engine & export to the web with Unity's Shader Graph](/docs/how-to-guides/export/materialx)
- [Progressive Loading](/docs/gltf-progressive/)
- [Open the Needle USD Viewer](https://usd-viewer.needle.tools)
