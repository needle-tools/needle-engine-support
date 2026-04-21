---
title: Optimization & Compression
description: Make your Needle Engine projects load faster and run smoother with texture compression, mesh compression, progressive loading, and automatic LODs.
---

# Optimization & Compression

**Make your Needle Engine projects load faster and run smoother.** Production builds automatically compress textures and meshes, generate progressive LODs, and minimize file sizes — all with no code changes needed.

:::tip Also See
- **[FastHDR Environment Lighting](/docs/explanation/fasthdr)** - 10x faster HDR loading, 95% less VRAM, zero CPU processing
- **[gltf-progressive](/docs/gltf-progressive/)** - Standalone progressive loading for any three.js project
- **[Deployment Platforms](/docs/how-to-guides/deployment/)** - Deploy to Netlify, Vercel, GitHub Pages, and more
- **[Export Guide](/docs/how-to-guides/export/)** - Best practices for assets
:::

---

## Guides

### [Texture Compression: KTX2, ETC1S, UASTC & WebP](/docs/how-to-guides/optimization/compress-textures)
Compare compression formats, configure global settings, and override compression per texture in Unity and Blender.

### [Mesh Compression: Draco & Meshopt](/docs/how-to-guides/optimization/compress-meshes)
Choose between Draco and Meshopt, configure mesh simplification, and reduce vertex count.

### [Progressive Loading & Automatic LODs](/docs/how-to-guides/optimization/progressive-loading-and-lods)
Load low-resolution textures first and upgrade on demand. Automatically generate mesh LODs for better performance. Configure per-texture LOD overrides.

### [Production Build Settings](/docs/how-to-guides/optimization/production-build-settings)
Understand development vs production builds, use the Unity Build Window, preview compression during development, and configure the Compression & LOD Settings component.

---

## Production Build Setup

### Required: Install toktx

To make production builds, you need [toktx](https://github.com/KhronosGroup/KTX-Software/releases) installed for texture compression using the KTX2 supercompression format.

**Installation:**
1. Go to the [toktx Releases Page](https://github.com/KhronosGroup/KTX-Software/releases)
2. Download and install the latest version (v4.1.0 or newer)
3. Restart Unity after installation

:::tip Troubleshooting
If you've installed toktx and it's in your PATH but can't be found, restart your machine and try building again.
:::

:::details Troubleshooting: Toktx cannot be found (Windows)
Make sure you have added toktx to your system environment variables. You may need to restart your computer after adding it to refresh the environment variables.

**Default install location:** `C:\Program Files\KTX-Software\bin`
![Environment Variables](/imgs/ktx-env-variable.webp)
:::

:::details Advanced: Custom glTF extensions
If you plan on adding custom glTF extensions, building for production requires handling those in `gltf-transform`. See [@needle-tools/gltf-build-pipeline](https://www.npmjs.com/package/@needle-tools/gltf-build-pipeline) for reference.
:::

---

## Optimization Best Practices

### Texture Optimization

**File size matters:**
- Use the smallest texture resolution that looks good
- [Enable progressive loading](/docs/how-to-guides/optimization/progressive-loading-and-lods) for large textures — loads low-res first, streams full quality on demand. Can be [configured per texture](/docs/how-to-guides/optimization/compress-textures#setting-compression-per-texture).
- Use appropriate [compression format](/docs/how-to-guides/optimization/compress-textures) (ETC1S vs UASTC vs WebP)
- Avoid unnecessarily large texture atlases

**GPU memory matters:**
- Use [KTX2 formats](/docs/how-to-guides/optimization/compress-textures#choosing-between-etc1s-uastc-and-webp) (ETC1S or UASTC) instead of WebP when possible
- WebP textures are uncompressed in GPU memory

### Mesh Optimization

Needle Engine production builds automatically apply [Draco or Meshopt compression](/docs/how-to-guides/optimization/compress-meshes) and generate [automatic mesh LODs](/docs/how-to-guides/optimization/progressive-loading-and-lods#automatic-mesh-lods-level-of-detail) — so your meshes are compressed and level-of-detail optimized out of the box.

**Reduce vertex count further:**
- Use [mesh simplification](/docs/how-to-guides/optimization/compress-meshes#mesh-simplification) to reduce vertex counts in production builds
- Remove unnecessary geometry before export

**Reduce draw calls:**
- Combine meshes when possible
- Use instancing for repeated objects
- Minimize unique materials

### Remove Unused Features

Several heavy modules are only downloaded when they're actually used. Removing unused features from your scene avoids unnecessary downloads:

- **Remove unused colliders** — The Rapier physics engine (~2 MB Wasm) loads when any collider or rigidbody is present. If you don't need physics, remove all colliders (including trigger colliders) to save ~2 MB.
- **Remove unused postprocessing volumes** — Postprocessing effects are only loaded when a volume is active.
- **Remove unused MaterialX materials** — The MaterialX loader is only loaded when MaterialX materials are present.

:::tip
Removing unused physics colliders is one of the easiest wins. Double-check that you haven't left colliders on objects that don't need them.
:::

### Scene Optimization

**Reduce initial load time:**
- [Enable progressive texture loading](/docs/how-to-guides/optimization/progressive-loading-and-lods) and [automatic mesh LODs](/docs/how-to-guides/optimization/progressive-loading-and-lods#automatic-mesh-lods-level-of-detail)
- Use `SceneSwitcher` to split your project into a lightweight main scene that only contains the scene switcher and loads content scenes on demand — this keeps the initial download small
- Use `AssetReference` for on-demand loading of individual assets

**Improve runtime performance:**
- Avoid physics colliders if you don't need physics (saves ~2 MB Rapier Wasm download)
- Use simpler collider shapes when physics is required
- Disable unnecessary components
- Use object pooling for frequently spawned objects
- Profile with browser DevTools and Needle Inspector

---

## Troubleshooting

### Build errors during compression

**Problem:** Production build fails during compression

**Solution:**
1. Toggle **Development Build** on in Build Settings to get unstuck immediately
2. Report the bug to [Needle support](/docs/help/)
3. Check that [toktx is installed and in your PATH](#required-install-toktx)

---

## Related Documentation

- **[VR Performance Optimization](/docs/how-to-guides/xr/vr-performance)** - VR-specific profiling, bottlenecks, and Quest tips
- **[gltf-progressive](/docs/gltf-progressive/)** - Progressive loading for any three.js project with advanced configuration and API reference
- **[Deployment Platforms](/docs/how-to-guides/deployment/)** - Deploy to Netlify, Vercel, GitHub Pages, and more
- **[Export Guide](/docs/how-to-guides/export/)** - Best practices for exporting 3D assets
- **[Debugging Parameters](/docs/how-to-guides/debugging/)** - Performance profiling and debugging
- **[Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension)** - Chrome DevTools for three.js
- **[Help & Community](/docs/help/)** - Get support and ask questions
