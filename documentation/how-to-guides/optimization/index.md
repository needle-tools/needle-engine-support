---
title: Optimization & Compression
---

# Optimization & Compression

**Make your Needle Engine projects load faster and run smoother.** Learn about compression formats, build types, and optimization techniques to deliver the best experience to your users.

:::tip Also See
- **[gltf-progressive](/docs/gltf-progressive/)** - Standalone progressive loading for any three.js project
- **[Deployment Platforms](/docs/how-to-guides/deployment/)** - Deploy to Netlify, Vercel, GitHub Pages, and more
- **[Export Guide](/docs/how-to-guides/export/)** - Best practices for assets
:::

---

## Understanding Build Types

### Development Builds

Development builds are optimized for fast iteration during development:
- **No texture compression** (KTX2) – faster build times
- **No mesh compression** (Draco) – faster build times
- **No progressive loading** – simpler debugging
- **Larger file sizes** – not suitable for production

**When to use:** During active development and testing.

:::tip Preview Compression during Development (Unity)
You can enable the **Preview Compression** toggle on the `Needle Engine` component to run the full production compression pipeline (texture compression, mesh compression, LOD generation) during local development. This lets you preview exactly how your scene will look and perform in a production build — without having to do a full build. See [Unity Build Options](#unity-build-window) for more details.
:::

### Production Builds

Production builds are optimized for performance and file size:
- **Texture compression** using KTX2 (ETC1S or UASTC)
- **Mesh compression** using Draco or Meshopt
- **Progressive texture loading** for faster initial load
- **Automatic mesh LODs** for better performance
- **Minimal file sizes** for fast loading

**When to use:** For deployment to production websites.

See guides in your Editor (Unity or Blender) for accessing build options.

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

## Texture Compression

Production builds compress textures using **KTX2** (ETC1S or UASTC) or **WebP** depending on your settings and quality requirements.

### Choosing Between ETC1S, UASTC and WebP

| Format | ETC1S | UASTC | WebP |
| --- | --- | --- | --- |
| **GPU Memory Usage** | Low | Low | High (uncompressed) |
| **File Size** | Low | High | Very low |
| **Quality** | Medium | Very high | Depends on quality setting |
| **Typical usage** | Works for everything, best for color textures | High-detail data textures: normal maps, roughness, metallic | Files where ETC1S quality is insufficient but UASTC is too large |

**Quick Guide:**
- **Color textures, UI**: Use ETC1S for small file size
- **Normal maps, detail textures**: Use UASTC for maximum quality
- **Photography, detailed textures**: Use WebP if ETC1S quality isn't sufficient

### Setting Compression Per Texture

You can override compression settings for individual textures using the Needle Texture Importer (Unity) or Material tab (Blender).

:::details Unity: Global compression settings
Configure default compression for all textures:

![Unity Compression Settings](/imgs/unity-compression-settings.png)
:::

:::details Unity: Per-texture compression overrides
Use the Compression & LOD Settings component to override settings for specific textures. Assign all textures you want to override in the component.

![Unity Individual Texture Settings](/imgs/unity-compression-settings-individual.png)
:::

:::details Blender: Per-texture compression settings
Select the Material tab to see compression options for all textures used by that material.

![Texture Compression in Blender](/blender/texture-compression.webp)
:::

---

## Mesh Compression

Production builds compress meshes to reduce file size and improve loading times.

### Choosing Between Draco and Meshopt

| Format | Draco | Meshopt |
| --- | --- | --- |
| **GPU Memory Usage** | Medium | Low |
| **File Size** | Lowest | Low |
| **Animation compression** | No | Yes |

**Quick Guide:**
- **Static meshes**: Use Draco for smallest file size
- **Animated meshes**: Use Meshopt (supports animation compression)

By default, production builds use Draco compression. Use the `MeshCompression` component to choose between Draco and Meshopt per exported glTF.

:::details Unity: Mesh compression settings
Use the Compression & LOD Settings component to select compression type:

![Unity Mesh Compression Options](/imgs/unity-mesh-compression-options.jpg)

- **Current scene**: Add component anywhere in your root scene
- **Prefab or NestedGltf**: Add to a `GltfObject` or the prefab referenced by your components
- **Referenced scene**: Add to the referenced scene that is exported
:::

:::details Unity: Mesh simplification to reduce vertex count
Use the Compression & LOD Settings component to configure mesh simplification for production builds. Append `?wireframe` to your URL to preview meshes in the browser.

![Unity Mesh Compression Options](/imgs/unity-mesh-compression-options.jpg)
:::

---

## Progressive Texture Loading (Texture LODs)

**Significantly reduce initial loading time** by loading low-resolution textures first, then upgrading to full quality when visible.

Add the `Progressive Texture Settings` component anywhere in your scene to enable progressive loading for all textures. Progressive loading is not applied to lightmaps or skybox textures.

See **[gltf-progressive](/docs/gltf-progressive/)** for detailed information on how progressive loading works and advanced configuration options.

**Benefits:**
- Much faster initial load times
- Full quality loaded on-demand
- Seamless quality transitions

:::details Unity: Enable progressive texture loading
Use the Compression & LOD Settings component to enable progressive loading globally. Can be disabled or enabled for individual textures as needed.

![Unity Compression Settings](/imgs/unity-compression-settings.png)
:::

:::tip Learn More
Progressive loading is powered by [`@needle-tools/gltf-progressive`](/docs/gltf-progressive/), which ships with Needle Engine. It's also available as a standalone package for any three.js project.
:::

---

## Automatic Mesh LODs (Level of Detail)

**Since Needle Engine 3.36**, mesh LODs are automatically generated during builds and chosen at runtime based on mesh density and screen size.

**Key Benefits:**
- Faster initial loading time
- Better rendering performance (fewer vertices on screen)
- Faster raycasting with LOD meshes
- Automatic on-demand loading

See **[gltf-progressive](/docs/gltf-progressive/)** for in-depth technical details on how mesh LODs are generated and selected at runtime.

:::details Unity: Control LOD generation
Use the Compression & LOD Settings component to control LOD generation for all meshes or individual meshes.

![Unity Mesh Compression Options](/imgs/unity-mesh-compression-options.jpg)
:::

---

## Build Options

### <logo-header logo="/imgs/unity-logo.webp" alt="Unity">Unity Build Window</logo-header>

Open **File → Needle Engine → Build Window**:

![Unity Build Window](/imgs/unity-build-window-2.jpg)

**Available Options:**

- **Build to Disk** – Create production build in the `dist` folder
- **Preview Build** – Build and start a local server to preview the final result
- **Development Build** – Disable compression for debugging (not recommended for production)

### Preview Compression Toggle

The `Needle Engine` component has a **Preview Compression** toggle at the bottom of its Inspector panel. When enabled, the full production compression pipeline runs automatically every time you export your scene during local development (e.g. when clicking Play or saving the scene with auto-export enabled).

This applies the same compression and LOD generation as a production build — including texture compression (KTX2), mesh compression (Draco/Meshopt), and progressive loading LODs — directly to your local development server. This way you can verify how your final production output will look and perform without having to do a full build.

You can also manually trigger compression steps from the context menu on the `Needle Engine` component under **Needle Engine → Compression** (e.g. Run Full Compression, Run Compression only, Run LODs Generator, or Clear Caches).

:::tip Node.js is only required during development
The distributed website (using our default Vite template) is a static page that doesn't rely on Node.js and can be hosted on any regular web server.

Node.js is only required if you want to run our minimalistic networking server for multiplayer experiences.
:::

---

## Optimization Best Practices

### Texture Optimization

**File size matters:**
- Use the smallest texture resolution that looks good
- Enable progressive loading for large textures
- Use appropriate compression format (ETC1S vs UASTC vs WebP)
- Avoid unnecessarily large texture atlases

**GPU memory matters:**
- Use KTX2 formats (ETC1S or UASTC) instead of WebP when possible
- WebP textures are uncompressed in GPU memory

### Mesh Optimization

**Reduce vertex count:**
- Use mesh simplification in production builds
- Enable automatic LOD generation
- Remove unnecessary geometry before export

**Reduce draw calls:**
- Combine meshes when possible
- Use instancing for repeated objects
- Minimize unique materials

### Scene Optimization

**Reduce initial load time:**
- Enable progressive texture loading
- Use automatic mesh LODs
- Load large scenes progressively with `SceneSwitcher`
- Use `AssetReference` for on-demand loading

**Improve runtime performance:**
- Optimize physics colliders (simpler shapes when possible)
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
3. Check that toktx is installed and in your PATH

### Website doesn't work after upload

**Problem:** Deployed website shows errors or doesn't load

**Solution:**
- **Option 1:** Enable gzip compression on your server (see [.htaccess example](/docs/how-to-guides/deployment/#enabling-gzip-using-a-htaccess-file))
- **Option 2:** Turn off gzip compression in **File → Needle Engine → Build Window**

![Build Options Gzip](/deployment/buildoptions_gzip.jpg)

---

## Related Documentation

- **[VR Performance Optimization](/docs/how-to-guides/xr/vr-performance)** - VR-specific profiling, bottlenecks, and Quest tips
- **[gltf-progressive](/docs/gltf-progressive/)** - Progressive loading for any three.js project with advanced configuration and API reference
- **[Deployment Platforms](/docs/how-to-guides/deployment/)** - Deploy to Netlify, Vercel, GitHub Pages, and more
- **[Export Guide](/docs/how-to-guides/export/)** - Best practices for exporting 3D assets
- **[Debugging Parameters](/docs/how-to-guides/debugging/)** - Performance profiling and debugging
- **[Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension)** - Chrome DevTools for three.js
- **[Help & Community](/docs/help/)** - Get support and ask questions
