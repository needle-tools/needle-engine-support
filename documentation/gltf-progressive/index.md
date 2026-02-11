---
title: gltf-progressive
description: 'Blazingly fast progressive loading for glTF, GLB, and VRM files with smart density-based LOD selection for meshes and textures. Works with any three.js project — vanilla three.js, React Three Fiber, model-viewer, and Needle Engine.'
---

# gltf-progressive

**Blazingly fast loading for glTF, GLB, and VRM files** with smart density-based LOD selection for meshes and textures.

`@needle-tools/gltf-progressive` ships as part of [Needle Engine](/docs/getting-started/) and powers its progressive loading pipeline out of the box. In a Needle Engine project, progressive meshes and textures are generated automatically during production builds — no extra setup required.

The package is also available as a **standalone npm module** for any three.js-based project. Whether you're using vanilla three.js, React Three Fiber, or `<model-viewer>`, you can add progressive loading with a single line of code.

:::tip Quick Links
**Needle Engine:** Progressive loading is built in — see [Optimization & Compression](/docs/how-to-guides/optimization/)

**Standalone:** `npm i @needle-tools/gltf-progressive`

**Generate Assets:** [Needle Cloud](https://cloud.needle.tools) or [Needle Engine integrations](/docs/getting-started/)

**Live Demos:** [three.js](https://engine.needle.tools/demos/gltf-progressive/threejs/) | [React Three Fiber](https://engine.needle.tools/demos/gltf-progressive/r3f/) | [model-viewer](https://engine.needle.tools/demos/gltf-progressive/modelviewer) | [Comparison](https://stackblitz.com/edit/gltf-progressive-comparison?file=package.json,index.html)
:::

---

## Why Progressive Loading?

Traditional 3D optimization with tools like gltf-transform produces a single optimized file. It's compressed and smaller — but users still have to download the *entire* file before seeing anything. Every mesh and every texture at full resolution, whether visible or not.

**gltf-progressive takes a fundamentally different approach.** Instead of one big file, it creates a tiny initial file with embedded low-quality proxies plus a set of higher-quality LOD files that stream in on demand. The result:

| | Standard gltf-transform | gltf-progressive |
| --- | --- | --- |
| **Initial display** | Wait for full download | Instant — proxy geometry renders immediately |
| **What gets loaded** | Everything, always | Only the detail needed for the current view |
| **Quality over time** | All-or-nothing | Progressive refinement as LODs stream in |
| **Bandwidth usage** | Full file regardless of viewport | Adapts to what's on screen |
| **Mobile / slow networks** | Same payload as desktop | Automatic quality reduction |
| **Caching** | File-level only | Per-LOD caching with content hashing |
| **Typical initial savings** | — | ~90% smaller initial download |

A 56 MB asset can be reduced to a **300 KB initial download** with up to 8 MB of progressive streaming — and most users will never need the full 8 MB because they only see a portion of the model at full detail.

### What This Unlocks

Progressive loading isn't just an optimization — it changes what's possible on the web:

- **Massive scenes become viable.** Environments with hundreds of high-poly objects load in seconds instead of minutes. Only nearby objects get full detail; distant ones stay lightweight.
- **E-commerce at any scale.** Product configurators with dozens of variants don't need to preload everything. Each option streams in at the quality the viewer needs.
- **Mobile-first 3D.** Instead of choosing between "looks good" and "loads on mobile," you get both. The same asset adapts automatically to the device and network.
- **Instant previews everywhere.** Embed 3D content on landing pages, in emails, or in social cards without worrying about load time. The proxy loads as fast as an image.
- **Real-time collaboration on heavy assets.** Multiple users viewing the same scene each load only the LODs relevant to their camera — no server-side rendering needed.

---

## Features

- **Single-line integration** for any three.js project
- **Mesh LODs** — loaded lazily based on screen density, not just distance
- **Texture LODs** — progressive texture streaming from low-res to full quality
- **Smart density selection** — consistent, predictable quality across screen sizes
- **Mobile optimization** — automatic quality reduction and [data-saving](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData) support
- **Compression support** — automatically handles KTX2, WebP, Draco, and Meshopt
- **Fast raycasting** — uses low-poly LOD meshes for smooth interactions with high-poly models
- **Plugin system** — extensible LOD event hooks for custom behavior
- **Asset generation** via [Needle Cloud](/docs/cloud/) with global CDN, versioning, and optimization

---

## How It Works

### Mesh LODs

The system generates up to **6 mesh LOD levels** using progressive simplification. Each level is roughly half the triangle count of the previous one, with the lowest quality embedded directly in the main file for instant display. Higher-quality levels are stored as separate files and streamed in as needed.

At runtime, the LOD manager selects which level to show based on **screen-space density** — how many triangles per pixel the mesh would have at its current screen size. A mesh filling the screen gets full detail; the same mesh as a small element in the background gets a much simpler version. This density-based approach ensures consistent visual quality regardless of camera distance or screen resolution.

**Default target:** 200,000 triangles on screen when a mesh fills the view.

### Texture LODs

Textures are handled similarly. The main file embeds a small preview (128px by default), while full-resolution versions stream in progressively. Each texture LOD is half the resolution of the previous one, and the runtime selects the appropriate level based on how many pixels the texture actually covers on screen.

On mobile devices, 8K textures are automatically skipped. When the browser's [data-saving mode](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData) is active, textures above 2K are skipped as well.

### Streaming

1. The main glTF loads with embedded low-quality proxies — your scene appears immediately
2. The runtime evaluates what's visible and at what screen size
3. Higher-quality LOD files are fetched on demand as the camera moves
4. Geometry and textures are swapped in seamlessly — no visual disruption
5. Previously loaded LODs are cached and reused

---

## Compression Methods

gltf-progressive applies state-of-the-art compression to every LOD level automatically. Understanding which formats are used helps you make informed decisions about quality vs. file size.

### Texture Compression

| Format | Best For | GPU Memory | File Size | Quality |
| --- | --- | --- | --- | --- |
| **ETC1S** (KTX2) | Color textures, UI, albedo maps | Low | Low | Medium |
| **UASTC** (KTX2) | Normal maps, metallic/roughness, detail textures | Low | Higher | Very high |
| **WebP** | Photographic content where ETC1S quality isn't sufficient | High (uncompressed in GPU) | Very low | Configurable |

**How formats are chosen automatically:**
- **Color textures** (base color, emissive, occlusion) → **ETC1S** for the best balance of size and quality
- **Data textures** (normal maps, metallic/roughness) → **UASTC** to preserve the precision these textures need
- **Product visualization** → **WebP** or **UASTC** for maximum visual fidelity

:::tip ETC1S vs UASTC
Both are GPU-compressed formats (low GPU memory), but they serve different purposes. **ETC1S** is much smaller on disk and great for color textures where minor quality loss is acceptable. **UASTC** preserves more detail and is essential for normal maps and PBR data textures where compression artifacts would be visible.
:::

### Mesh Compression

| Format | Best For | File Size | Animation Support |
| --- | --- | --- | --- |
| **Draco** | Static meshes | Smallest | No |
| **Meshopt** | Animated meshes, blend shapes | Small | Yes |

**How mesh compression is chosen:**
- **Static meshes** → **Draco** for maximum compression (~20x reduction)
- **Meshes with blend shapes or animations** → **Meshopt** which preserves morph targets and animation data
- Each LOD level gets the same compression as the original, ensuring consistency

### Optimization Profiles

When generating assets through [Needle Cloud](/docs/cloud/) or Needle Engine builds, two optimization profiles are available:

| | World | Product |
| --- | --- | --- |
| **Use case** | Environments, scenes, games | Product visualization, e-commerce |
| **Mesh LOD levels** | 6 | 3 |
| **Min texture size** | 128px | 512px |
| **Texture compression** | ETC1S for colors, UASTC for data | UASTC / WebP for max fidelity |
| **Priority** | Fast load, low bandwidth | Visual quality |

---

## Generating Progressive Assets

Progressive loading requires assets that have been processed to include LOD data.

### Needle Engine (Automatic)

**If you're using Needle Engine, progressive assets are generated automatically.** When you make a production build from Unity or Blender, the build pipeline generates all mesh and texture LODs, applies compression, and outputs progressive glTF files — ready to deploy.

No manual steps are needed. You can configure the compression settings and LOD generation per project or per asset (see below).

### Needle Cloud

For standalone three.js projects or external assets, upload any glTF, GLB, VRM, FBX, USD, or OBJ file to [Needle Cloud](https://cloud.needle.tools). It automatically generates progressive mesh and texture LODs, applies compression, and serves assets via a global CDN.

Use the **Progressive-World** or **Progressive-Product** download link to get a URL ready for progressive loading.

See [Needle Cloud documentation](/docs/cloud/) for uploading, versioning, and sharing.

### Configuration: Unity

Progressive LODs are generated automatically during production builds. Use the **Compression and LOD Settings** component to configure the behavior.

**Add the component:** `Add Component > Needle Engine > Optimization > Compression and LOD Settings`

**Texture settings:**
- **Texture Format** — Choose between Automatic, ETC1S, UASTC, WebP, or per-use-case modes (World, Product)
- **Max Texture Size** — Maximum resolution (default: 8192)
- **Generate Texture LODs** — Enable/disable progressive texture loading (default: on)
- **LODs Max Size** — Max resolution for the initially loaded texture (default: 128px)
- **Per-texture overrides** — Override compression format, max size, or LOD generation for individual textures

**Mesh settings:**
- **Mesh Compression** — Choose between Draco, Meshopt, Automatic, or None
- **Generate Mesh LODs** — Enable/disable progressive mesh loading (default: on)
- **Per-mesh overrides** — Override LOD generation for individual meshes

:::details Build and compression actions
You can also trigger compression manually from the Unity menu:
- **Needle Engine > Compression > Run Full Compression** — Compression + LOD generation
- **Needle Engine > Compression > Run LODs Generator** — LOD generation only
- **Needle Engine > Compression > Run Compression** — Compression only
:::

### Configuration: Blender

In Blender, progressive loading settings are part of the main Needle Engine scene settings panel:

- **Use Progressive** — Enable progressive texture loading (default: on)
- **Progressive Texture Size** — Preview size for initial texture load (default: 128px, options: 32–2048)
- **Use Progressive Meshes** — Enable progressive mesh loading (default: on)
- **Compress On Save** — Generate compressed and progressive assets after export to preview production quality locally

---

## Standalone Usage

While `gltf-progressive` is built into Needle Engine, it can also be used as a standalone package in any three.js project.

### Installation

```bash
npm i @needle-tools/gltf-progressive
```

**Peer dependency:** three.js >= 0.160.0

### three.js

Add progressive loading to any three.js project with a single function call.

```ts
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useNeedleProgressive } from "@needle-tools/gltf-progressive";

const gltfLoader = new GLTFLoader();
const renderer = new WebGLRenderer();

// Register the progressive loader plugin — call once before loading
useNeedleProgressive(gltfLoader, renderer);

// Load models as usual — progressive loading happens automatically
const url = "https://cloud.needle.tools/-/assets/Z23hmXBZN45qJ-ZN45qJ-world/file";
gltfLoader.load(url, (gltf) => {
    scene.add(gltf.scene);
});
```

When using import maps in HTML:

```html
<script type="importmap">
{
    "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/",
        "@needle-tools/gltf-progressive": "https://cdn.jsdelivr.net/npm/@needle-tools/gltf-progressive/gltf-progressive.min.js"
    }
}
</script>
```

### React Three Fiber

```tsx
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useNeedleProgressive } from "@needle-tools/gltf-progressive";

function MyModel() {
    const { gl } = useThree();
    const url = "https://cloud.needle.tools/-/assets/Z23hmXBZN45qJ-ZN45qJ-world/file";
    const { scene } = useGLTF(url, false, false, (loader) => {
        useNeedleProgressive(loader, gl);
    });
    return <primitive object={scene} />;
}
```

### model-viewer

For Google's `<model-viewer>` web component, just include the script — no code changes needed. The plugin automatically patches model-viewer to support progressive loading.

```html
<head>
    <script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three/build/three.module.js",
            "three/": "https://cdn.jsdelivr.net/npm/three/"
        }
    }
    </script>

    <!-- Include gltf-progressive before model-viewer -->
    <script type="module"
        src="https://cdn.jsdelivr.net/npm/@needle-tools/gltf-progressive@latest/gltf-progressive.min.js">
    </script>

    <!-- Standard model-viewer -->
    <script type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js">
    </script>
</head>
<body>
    <model-viewer
        src="https://cloud.needle.tools/-/assets/Z23hmXBZN45qJ-ZN45qJ-world/file"
        camera-controls
        auto-rotate>
    </model-viewer>
</body>
```

### Needle Engine (Built In)

`gltf-progressive` ships with [Needle Engine](/docs/getting-started/) — progressive loading works out of the box with zero configuration. When you make a production build, progressive meshes and textures are generated automatically. The runtime LOD manager is already integrated into the rendering pipeline, so your scenes benefit from density-based LOD selection, progressive texture streaming, and optimized raycasting without any additional setup.

See [Optimization & Compression](/docs/how-to-guides/optimization/) to configure compression formats and LOD generation settings in Unity and Blender.

---

## Runtime Configuration

### LOD Manager Settings

Access the LOD manager to fine-tune progressive loading at runtime:

```ts
import { LODsManager } from "@needle-tools/gltf-progressive";

const lodsManager = LODsManager.get(renderer);
```

| Setting | Default | Description |
| --- | --- | --- |
| `targetTriangleDensity` | `200000` | Target max triangles on screen when a mesh fills the view. Increase for higher quality, decrease for better performance. |
| `updateInterval` | `"auto"` | How often LODs are recalculated (in frames). `0` = every frame, `2` = every other frame. `"auto"` adapts to framerate. |
| `skinnedMeshAutoUpdateBoundsInterval` | `30` | How often skinned mesh bounds are recalculated (in frames). Higher values improve performance for animated models. |
| `pause` | `false` | Temporarily stop LOD updates. |
| `manual` | `false` | Disable automatic updates. Use `lodsManager.update(scene, camera)` to trigger manually. |
| `overrideLodLevel` | `undefined` | Force a specific LOD level (0–6) for all meshes. Set to `undefined` to disable. |

```ts
// Example: Higher quality, less frequent updates
const lodsManager = LODsManager.get(renderer);
lodsManager.targetTriangleDensity = 300000;
lodsManager.updateInterval = 2;
```

### Raycasting Optimization

Enable low-poly meshes for raycasting to get faster, smoother interactions with high-poly models:

```ts
import { useRaycastMeshes, getRaycastMesh } from "@needle-tools/gltf-progressive";

// Enable globally — call once
useRaycastMeshes(true);

// Raycasting now automatically uses low-poly meshes
const raycaster = new Raycaster();
raycaster.setFromCamera(mouse, camera);
const hits = raycaster.intersectObjects(scene.children, true);

// Get a low-poly mesh for physics or custom use
const lowPolyGeometry = getRaycastMesh(myMesh);
```

### Wait for LODs

Wait for all in-flight LODs to finish loading — useful for screenshots or transitions:

```ts
const result = await lodsManager.awaitLoading({
    frames: 3,                // Wait for LODs triggered over 3 frames
    waitForFirstCapture: true // Wait for initial LOD registration
});
```

### Debug Mode

Add `?debugprogressive` to your URL to enable debug logging and keyboard shortcuts:

| Key | Action |
| --- | --- |
| `P` | Cycle through LOD levels |
| `W` | Toggle wireframe view |
| `0`–`6` | Force specific LOD level |

To disable progressive loading entirely, add `?noprogressive` to your URL.

---

## Plugin System

Extend the LOD manager with custom plugins to react to LOD changes:

```ts
import { LODsManager, NEEDLE_progressive_plugin } from "@needle-tools/gltf-progressive";

class MyPlugin implements NEEDLE_progressive_plugin {
    onBeforeUpdateLOD(renderer, scene, camera) {
        // Called before LOD calculation each frame
    }
    onAfterUpdatedLOD(renderer, scene, camera, mesh, levels) {
        // Called after LOD levels are determined
        console.log(`${mesh.name}: mesh LOD ${levels.mesh_lod}, texture LOD ${levels.texture_lod}`);
    }
    onRegisteredNewMesh(mesh) {
        // Called when LOD info is registered for a new mesh
    }
    onBeforeGetLODMesh(mesh) {
        // Called before a mesh LOD is fetched
    }
}

LODsManager.addPlugin(new MyPlugin());
```

---

## Live Examples

- [Loading Comparison](https://stackblitz.com/edit/gltf-progressive-comparison?file=package.json,index.html) — Side-by-side with standard three.js loading
- [Vanilla three.js](https://engine.needle.tools/demos/gltf-progressive/threejs/) — Multiple models and animations
- [React Three Fiber](https://engine.needle.tools/demos/gltf-progressive/r3f/) — R3F integration
- [model-viewer (single)](https://engine.needle.tools/demos/gltf-progressive/modelviewer) — Single element
- [model-viewer (multiple)](https://engine.needle.tools/demos/gltf-progressive/modelviewer-multiple) — Multiple elements on one page
- [Needle Engine](https://stackblitz.com/edit/needle-engine-gltf-progressive?file=src%2Fmain.ts) — Needle Engine integration
- [Needle Cloud Viewer](https://cloud.needle.tools/view?file=Z23hmXBZN45qJ-ZN45qJ-world) — View progressive assets on Needle Cloud

---

## Related Documentation

- **[Optimization & Compression](/docs/how-to-guides/optimization/)** — Texture/mesh compression, build types, and optimization best practices
- **[Needle Cloud](/docs/cloud/)** — Upload, optimize, and host progressive assets
- **[Export Guide](/docs/how-to-guides/export/)** — Best practices for exporting 3D assets
- **[npm package](https://www.npmjs.com/package/@needle-tools/gltf-progressive)** — Full API reference and changelog
- **[GitHub](https://github.com/needle-tools/gltf-progressive)** — Source code and issue tracker
