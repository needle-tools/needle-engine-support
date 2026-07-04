---
title: Load 3D Web Assets at Runtime
description: Load GLB, glTF, and VRM files at runtime from any HTTPS URL — Needle Cloud, AWS S3, your own CDN, or any web host. Covers loadAsset, AssetReference, SceneSwitcher, and the needle-engine src attribute. Works with React, Vue, Svelte, vanilla JS, and plain HTML.
---

# Load 3D Web Assets at Runtime

Needle Engine has four ways to load GLB / glTF / VRM files at runtime, and **all of them accept any HTTPS URL** — bundled paths, [Needle Cloud](/docs/cloud/) links, AWS S3, Cloudflare R2, your own CDN, or any web server.

This guide covers when to use each loading API, plus what you need in place to host assets externally (CORS, content types) so you can keep your build small and load assets on demand.

:::tip When to use this
- Build is too large because you're shipping many GLB files
- You want to update assets without rebuilding the website
- Users only need a subset of available models per session
- Assets are user-generated or change frequently
- You're embedding Needle Engine into React/Vue/Svelte and want to load scenes dynamically
:::

## Four Ways to Load Assets from a URL

Every loading API in Needle Engine accepts a full URL — there is no separate "remote" path. The four options below cover every common use case.

### 1. Set the root scene with `<needle-engine src="…">`

The simplest case — point the web component directly at a hosted GLB.

```html
<needle-engine src="https://cloud.needle.tools/-/assets/Z23hmXBZ21QnG-latest-world/file"></needle-engine>
```

This works with **any URL** — Needle Cloud, S3, your CDN, GitHub raw, anywhere. Use this when you have one root scene to display.

See [needle-engine attributes](/docs/reference/needle-engine-attributes) for the full list of HTML options (camera-controls, environment-image, etc.).

### 2. `SceneSwitcher.addScene(url)` — many scenes, on demand

Best for **galleries, configurators, and multi-scene experiences**. Keep a minimal root scene with just a `SceneSwitcher`, then add URLs at runtime.

```ts
import { addComponent, SceneSwitcher } from "@needle-tools/engine";

const sceneSwitcher = addComponent(scene, SceneSwitcher, {
    autoLoadFirstScene: false,
    createMenuButtons: true,
    clamp: false,
    preloadNext: 1,
    preloadPrevious: 1,
});

sceneSwitcher.addScene("https://cloud.needle.tools/-/assets/Z23hmXBZ21QnG-latest-world/file");
sceneSwitcher.addScene("https://cloud.needle.tools/-/assets/Z23hmXBzvPW9-latest-product/file");
sceneSwitcher.addScene("https://cloud.needle.tools/-/assets/Z23hmXBZvGGVp-latest-product/file");
sceneSwitcher.addScene("https://your-bucket.s3.amazonaws.com/products/chair-red.glb");
sceneSwitcher.addScene("https://your-bucket.s3.amazonaws.com/products/chair-blue.glb");

sceneSwitcher.select(0);
```

Each loaded GLB is **fully interactive** — components, scripts, animations, and physics inside the loaded scene all activate. You can mix URLs from different hosts in the same list.

SceneSwitcher brings two extras that are especially valuable when loading from a CDN:

- **Preloading** — set `preloadNext` and `preloadPrevious` to download neighbouring scenes in the background while the user views the current one. Transitions then feel instant even over a slow connection. `preloadConcurrent` caps how many downloads run in parallel. You can also preload manually with `sceneSwitcher.preload(index)`.
- **Browser history & deep links** — scene changes sync to a URL parameter (`?scene=chair-red`), so users can **bookmark a specific scene, share a direct link, and use the browser back/forward buttons** to navigate between scenes. Configure with `queryParameterName`, `useSceneName`, and `useHistory`.

See [SceneSwitcher guide](/docs/how-to-guides/components/scene-switcher) for full navigation, preloading, and lifecycle event details.

### 3. `AssetReference` — caching, instancing, prefabs

`AssetReference` is the right choice when you want to **load once and spawn many copies**, or when you want a stable handle to an asset across your code.

```ts
import { AssetReference, Behaviour } from "@needle-tools/engine";

export class SpawnFromCDN extends Behaviour {
    async start() {
        // Create (or reuse) a reference to a URL.
        // getOrCreate caches by URL — multiple calls return the same reference.
        const ref = AssetReference.getOrCreate(
            this.context.domElement.baseURI,
            "https://your-cdn.com/models/tree.glb"
        );

        // Spawn three independent copies
        await ref.instantiate({ parent: this.gameObject });
        await ref.instantiate({ parent: this.gameObject });
        await ref.instantiate({ parent: this.gameObject });

        // Or load once and add the original (no copy):
        // const obj = await ref.loadAssetAsync();
        // this.gameObject.add(obj);
    }
}
```

`AssetReference` is also what gets serialized when you assign a Prefab or Scene asset in Unity/Blender — so the same API works whether the asset comes from your editor export or a runtime URL.

See [Reference and Load a Prefab](/docs/reference/scripting-examples#reference-and-load-a-prefab) and the [AssetReference API](https://engine.needle.tools/docs/api/AssetReference).

### 4. `loadAsset(url)` — one-line direct loading

The simplest option — load a file and add it to the scene in two lines:

```ts
import { loadAsset } from "@needle-tools/engine";

const model = await loadAsset("https://your-cdn.com/models/room.glb");
this.context.scene.add(model.scene);
```

`loadAsset` returns a wrapper with `.scene`, `.animations`, etc. — works the same for GLB, FBX, OBJ, and USDZ inputs.

:::tip Which one should I use?
- **One root scene** → `<needle-engine src="…">`
- **Switch between many scenes** → `SceneSwitcher.addScene(url)`
- **Reusable asset spawned multiple times, or editor-assigned prefab** → `AssetReference`
- **Quick one-off load** → `loadAsset(url)`
:::

## React, Vue, Svelte Integration

The same APIs work inside any framework. The dedicated guides cover setup, bundling and framework-specific patterns:

- [<logo-header logo="/imgs/react-logo.svg" alt="React" max-height="1.2em">Needle Engine + React</logo-header>](/docs/how-to-guides/web-integration/react)
- [<logo-header logo="/imgs/vue-logo.svg" alt="Vue" max-height="1.2em">Needle Engine + Vue & Nuxt</logo-header>](/docs/how-to-guides/web-integration/vue)
- [<logo-header logo="/imgs/svelte-logo.svg" alt="Svelte" max-height="1.2em">Needle Engine + Svelte & SvelteKit</logo-header>](/docs/how-to-guides/web-integration/sveltekit)

A typical pattern with React:

```tsx
import { useEffect, useRef } from "react";
import "@needle-tools/engine";

export function ProductViewer({ productUrl }: { productUrl: string }) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (ref.current) ref.current.setAttribute("src", productUrl);
    }, [productUrl]);

    return <needle-engine ref={ref} camera-controls />;
}
```

For a SceneSwitcher-based dynamic loader, mount once and call `addScene()` / `select()` when the user picks a model — no remount needed.

## Hosting Options

### Needle Cloud — the perfect fit for runtime asset loading

[Needle Cloud](/docs/cloud/) is built for exactly this use case. Upload a GLB, get a URL, and you immediately get everything a production CDN setup would need:

- **Progressive loading** — small preview textures and low-poly meshes stream first, full quality streams on demand. Typically **~90% less bandwidth** than loading raw GLB from S3.
- **Automatic compression** — KTX2 textures and Draco/meshopt meshes generated on upload, no toktx setup, no build pipeline.
- **Global CDN** — assets served from edge locations close to your users.
- **Correct CORS and `Content-Type` headers** out of the box — no S3 policy tuning.
- **Versioning + labels** (see below) — update assets without redeploying your app.

Upload your GLB and copy the **Progressive-World** or **Progressive-Product** download link from the asset's Edit page — then drop that URL into `addScene()`, `loadAsset()`, `AssetReference.getOrCreate()`, or `<needle-engine src>`.

#### Update assets without redeploying your app — labels

This is the killer feature for the "load 20-30 models from the cloud" pattern: each cloud asset has **moveable labels** (`latest`, `main`) that act as stable URLs pointing at whichever version you choose.

| Label | URL pattern | What it does |
| --- | --- | --- |
| Pinned version | `cloud.needle.tools/-/assets/<id>-<version>/file` | Always serves that exact upload. Never changes. |
| `latest` | `cloud.needle.tools/-/assets/<id>-latest-<name>/file` | Auto-updates to the most recent upload. |
| `main` | `cloud.needle.tools/-/assets/<id>-main-<name>/file` | You manually promote a version to `main` — your production users see it. |

Workflow:

1. Hard-code the `main`-labeled URL in your app: `sceneSwitcher.addScene("https://cloud.needle.tools/-/assets/Z23h…-main-chair/file")`.
2. Iterate on the GLB in Unity / Blender and upload a new version. It immediately becomes `latest` (preview / staging).
3. When you're happy, click **⋮ → Set main label** on the new version in the Needle Cloud dashboard.
4. All users now load the new asset — **no code change, no rebuild, no redeploy**. Roll back the same way by moving the `main` label back.

This is impossible with a plain S3 bucket without writing your own version-resolution layer. See [Needle Cloud: Version Control & Sharing](/docs/cloud/#version-control-sharing) for details.

:::tip
Use pinned URLs in your tests and demos so they don't break when you ship a new version. Use the `main` label in your production app so you *can* ship updates without touching code.
:::

### Amazon S3, Cloudflare R2, Google Cloud Storage

Any object store works as long as it serves the file over HTTPS with the right headers (see [CORS](#cors-content-type) below). You'll be responsible for compression, progressive LOD generation, and versioning yourself.

### Your own server, GitHub, or any static host

If the URL returns the GLB bytes with a permissive CORS policy, Needle Engine will load it.

## CORS & Content-Type

Because the browser fetches the GLB cross-origin, the host must allow your site's origin. For an S3 bucket the CORS rule looks like this:

```json
[
  {
    "AllowedOrigins": ["https://your-site.com"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["Content-Length"]
  }
]
```

Recommended response headers:
- **`Content-Type: model/gltf-binary`** for `.glb` (or `application/octet-stream` as a fallback)
- **`Content-Type: model/gltf+json`** for `.gltf`
- **`Access-Control-Allow-Origin`** matching your site origin (or `*` for public assets)
- **`Cache-Control: public, max-age=…`** for CDN caching

If a load fails, open the browser DevTools Network tab — most external-URL issues come down to a missing CORS header or a redirect that strips it.

## Live Example

Try it in your browser — the example below uses `SceneSwitcher.addScene()` with several Needle Cloud URLs. Swap them for your own to test:

[Open on Stackblitz](https://stackblitz.com/edit/needle-engine-vite-template) — uses `SceneSwitcher.addScene()` with several Needle Cloud URLs.

## Related

- [SceneSwitcher Component](/docs/how-to-guides/components/scene-switcher) — full guide to multi-scene loading
- [Needle Cloud](/docs/cloud/) — managed asset hosting with progressive loading
- [Progressive Loading & LODs](/docs/how-to-guides/optimization/progressive-loading-and-lods) — how big assets stream
- [Reference Assets in Scripts](/docs/reference/scripting-examples#reference-and-load-a-prefab) — `AssetReference` patterns
- [needle-engine HTML attributes](/docs/reference/needle-engine-attributes) — `src`, `camera-controls`, and more
