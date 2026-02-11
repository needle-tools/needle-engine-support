---
title: gltf-progressive
description: 'Blazingly fast progressive loading for glTF, GLB, and VRM files with smart density-based LOD selection for meshes and textures. Works with any three.js project — vanilla three.js, React Three Fiber, model-viewer, and Needle Engine.'
---

# gltf-progressive

**Blazingly fast loading for glTF, GLB, and VRM files** with smart density-based LOD selection for meshes and textures. Works with any three.js project.

`@needle-tools/gltf-progressive` is a standalone npm package that adds progressive Level of Detail (LOD) loading to three.js. It loads low-resolution meshes and textures first for a fast initial display, then upgrades to full quality on demand based on what's actually visible on screen.

:::tip Quick Links
**Install:** `npm i @needle-tools/gltf-progressive`

**Generate Assets:** [Needle Cloud](https://cloud.needle.tools) or [Needle Engine integrations](/docs/getting-started/)

**Live Demos:** [three.js](https://engine.needle.tools/demos/gltf-progressive/threejs/) | [React Three Fiber](https://engine.needle.tools/demos/gltf-progressive/r3f/) | [model-viewer](https://engine.needle.tools/demos/gltf-progressive/modelviewer) | [Comparison](https://stackblitz.com/edit/gltf-progressive-comparison?file=package.json,index.html)
:::

---

## Why Use Progressive Loading?

Traditional 3D web experiences force users to wait for the entire model to download before seeing anything. With progressive loading, your scene appears almost instantly at a lower quality and seamlessly upgrades as higher-quality data streams in.

| | Without Progressive Loading | With Progressive Loading |
| --- | --- | --- |
| **Initial load** | Wait for full model | Instant display at lower quality |
| **Bandwidth** | Full resolution always | Only loads what's needed |
| **Memory** | All LODs in memory | On-demand LOD management |
| **Mobile** | Same data as desktop | Automatic quality reduction |
| **Typical savings** | — | ~90% smaller initial download |

A 56 MB asset can be reduced to a 300 KB initial download with up to 8 MB of progressive streaming — only loading the detail actually needed for the current view.

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

## Installation

```bash
npm i @needle-tools/gltf-progressive
```

**Peer dependency:** three.js >= 0.160.0

---

## Usage

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
import { useGLTF, Canvas } from "@react-three/drei";
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
    <!-- Use model-viewer as usual with a Needle Cloud progressive URL -->
    <model-viewer
        src="https://cloud.needle.tools/-/assets/Z23hmXBZN45qJ-ZN45qJ-world/file"
        camera-controls
        auto-rotate>
    </model-viewer>
</body>
```

### Needle Engine

[Needle Engine](/docs/getting-started/) natively supports progressive loading. When you make a production build, progressive meshes and textures are generated automatically. See [Optimization & Compression](/docs/how-to-guides/optimization/) for details.

---

## Generating Progressive Assets

Progressive loading requires assets with embedded LOD data. There are two ways to generate them:

### Needle Cloud

Upload any glTF, GLB, VRM, FBX, USD, or OBJ file to [Needle Cloud](https://cloud.needle.tools). It automatically generates progressive mesh and texture LODs, applies Draco/KTX2 compression, and serves assets via a global CDN.

Use the **Progressive-World** or **Progressive-Product** download link from Needle Cloud to get a URL ready for progressive loading.

See [Needle Cloud documentation](/docs/cloud/) for more details on uploading, versioning, and sharing assets.

### Needle Engine (Unity / Blender)

When building a Needle Engine project for production, progressive LODs are generated automatically during the build process. Add the `Progressive Texture Settings` and `Compression & LOD Settings` components in your scene to control the behavior.

See [Optimization & Compression](/docs/how-to-guides/optimization/) for configuration details.

---

## How It Works

### Mesh LODs

The LOD manager calculates **screen-space coverage** for each mesh by projecting its bounding box into screen coordinates. It then selects the appropriate LOD level based on triangle density:

1. Calculate how much of the screen the mesh covers (0–1 range)
2. For each available LOD, compute: `resultingDensity = lodDensity / screenCoverage`
3. Select the lowest LOD where `resultingDensity < targetTriangleDensity`

This density-based approach means a mesh far away gets a low-poly LOD, while the same mesh up close gets full detail — maintaining a consistent visual quality regardless of distance or screen size.

**Default target:** 200,000 triangles on screen when a mesh fills the view.

### Texture LODs

Textures are loaded progressively based on their pixel size on screen:

1. On first load, the lowest available resolution is used for instant display
2. The system calculates how many pixels the texture occupies on screen
3. Higher-resolution LODs are loaded when the texture is visible at a size that benefits from more detail
4. On mobile devices, 8K textures are skipped; with data-saving mode, textures above 2K are skipped

### Loading Pipeline

1. **Registration** — When a glTF is loaded, LOD metadata is extracted from the `NEEDLE_progressive` extension
2. **Lazy loading** — LOD files are fetched on demand as the camera moves
3. **Concurrent management** — A request queue limits concurrent downloads (up to 50)
4. **Caching** — Previously loaded LODs are cached and reused
5. **Seamless swap** — Geometry and textures are swapped in place without visual disruption

---

## Configuration

### LOD Manager Settings

Access the LOD manager to configure progressive loading behavior:

```ts
import { LODsManager } from "@needle-tools/gltf-progressive";

const lodsManager = LODsManager.get(renderer);
```

| Setting | Default | Description |
| --- | --- | --- |
| `targetTriangleDensity` | `200000` | Target max triangles on screen when a mesh fills the view. Increase for higher quality, decrease for better performance. |
| `updateInterval` | `"auto"` | How often LODs are recalculated (in frames). `0` = every frame, `2` = every other frame. `"auto"` adapts to framerate. |
| `skinnedMeshAutoUpdateBoundsInterval` | `30` | How often skinned mesh bounds are recalculated (in frames). Higher = better performance for animated models. |
| `pause` | `false` | Temporarily stop LOD updates. |
| `manual` | `false` | Disable automatic updates. Use `lodsManager.update(scene, camera)` to update manually. |
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

// Access a specific low-poly mesh (e.g. for physics)
const lowPolyGeometry = getRaycastMesh(myMesh);
```

### Wait for LODs

Wait for all LODs currently being loaded to finish:

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

## glTF Extension

Progressive loading data is stored in glTF files using the `NEEDLE_progressive` vendor extension. This extension defines LOD metadata for both meshes and textures.

### Mesh Extension (`NEEDLE_ext_progressive_mesh`)

```json
{
    "guid": "mesh-asset-456",
    "lods": [
        {
            "path": "./meshes/mesh_high.glb",
            "densities": [100000, 50000],
            "indexCount": 15000,
            "vertexCount": 8000
        },
        {
            "path": "./meshes/mesh_low.glb",
            "densities": [100000, 50000],
            "indexCount": 3000,
            "vertexCount": 1500
        }
    ]
}
```

### Texture Extension (`NEEDLE_ext_progressive_texture`)

```json
{
    "guid": "texture-asset-123",
    "lods": [
        { "path": "./textures/diffuse_1024.glb", "width": 1024, "height": 1024 },
        { "path": "./textures/diffuse_512.glb", "width": 512, "height": 512 },
        { "path": "./textures/diffuse_128.glb", "width": 128, "height": 128 }
    ]
}
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
