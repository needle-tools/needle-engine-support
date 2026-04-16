---
title: Compression & Optimization in Blender
description: Compress textures and meshes for fast-loading web experiences
---

# Compression & Optimization

Optimize your 3D scenes for the web with texture compression, mesh compression, and progressive loading — all configured directly in Blender.

<!-- TODO: Add hero image showing before/after file size comparison -->
<!-- ![Compression overview](/blender/compression-overview.webp) -->

---

## Why Compression Matters

Web delivery requires small file sizes and efficient GPU usage. Needle Engine's build pipeline automatically compresses your assets for production, dramatically reducing download size and memory usage.

**Benefits:**
- ⚡ **Faster loading** — Compressed textures and meshes load much faster
- 📦 **Smaller file sizes** — Typical 10-50x reduction in file size
- 🖥️ **Lower GPU memory** — KTX2 textures stay compressed on the GPU
- 📱 **Mobile-friendly** — Progressive loading adapts to device capabilities
- 🔄 **Automatic** — Production builds handle compression for you

**Typical results:**
A 50 MB scene can be reduced to a **0.2–2 MB initial download**, with additional detail streaming in progressively as needed.

---

## Requirements

**Before you start:**
- [toktx](https://github.com/KhronosGroup/KTX-Software/releases) installed (v4.1.0 or newer) for KTX2 texture compression
- A Needle Engine web project set up in Blender

:::tip Installing toktx
1. Download the latest release from the [KTX-Software Releases Page](https://github.com/KhronosGroup/KTX-Software/releases)
2. Install and make sure it's added to your system PATH
3. Restart Blender after installation

**Default Windows install location:** `C:\Program Files\KTX-Software\bin`
:::

:::details Troubleshooting: toktx cannot be found
Make sure you have added toktx to your system environment variables. You may need to restart your computer after installation to refresh the environment variables.
:::

---

## Quick Start

### Step 1: Configure Project Settings

Open the **Needle Engine** panel (right Viewport Sidebar) and find the **Project Settings** section.

<!-- TODO: Add screenshot of project settings with compression options -->
<!-- ![Project settings](/blender/compression-project-settings.webp) -->

Here you can configure the global compression and progressive loading settings:

| Setting | Description | Default |
| --- | --- | --- |
| **Auto Compress** | Run compression after every export (for previewing production output) | Off |
| **Use Gzip Compression** | Compress build output with gzip for smaller transfers | Off |
| **Use Progressive Textures** | Enable progressive texture loading with a low-res preview size | On (128px) |
| **Use Progressive Meshes** | Enable progressive mesh LODs | On |

:::tip Preview Compression during Development
Enable **Auto Compress** to run the full production compression pipeline every time you export. This lets you preview exactly how your scene will look and perform in a production build — without doing a full build.
:::

---

### Step 2: Override Per-Texture Compression

You can override compression settings for individual textures. This is useful when the default `AUTO` mode doesn't produce the result you want for a specific texture.

**From the Material Properties panel:**
1. Select an object with a material
2. Open **Needle Material Settings** in the Properties panel
3. Find the **Texture Compression Settings** section
4. Toggle **Override** on the texture you want to customize
5. Choose the compression format and max size

<!-- TODO: Add screenshot of per-texture compression settings -->
<!-- ![Per-texture compression](/blender/compression-per-texture.webp) -->

**From the Needle Object sidebar (3D Viewport):**
1. Select your object
2. Open the **Needle Object** panel (right Viewport Sidebar)
3. Scroll down to see texture compression overrides for all textures used by the object's materials

---

### Step 3: Build for Production

Production builds automatically apply the full compression pipeline:

1. Open the **Needle Engine** panel
2. Click **Build: Production**
3. The build pipeline compresses textures, meshes, and generates progressive LODs

**What happens during a production build:**
- Textures are compressed to KTX2 (ETC1S or UASTC) or WebP
- Meshes are compressed with Draco
- Progressive texture and mesh LODs are generated
- Assets are optimized for streaming

---

## Texture Compression Formats

When overriding texture compression, you can choose between these formats:

| Format | GPU Memory | File Size | Quality | Best For |
| --- | --- | --- | --- | --- |
| **AUTO** | — | — | — | Let the build pipeline decide (recommended default) |
| **NONE** | High | High | Original | Textures that must not be modified |
| **ETC1S** | Low | Low | Medium | Color textures, UI, albedo maps |
| **UASTC** | Low | High | Very High | Normal maps, roughness, metallic, detail textures |
| **WebP** | High (uncompressed) | Very Low | Configurable | When ETC1S quality isn't enough but UASTC is too large |

### When to Use What

- **Most textures:** Leave on `AUTO` — the pipeline picks the best format based on texture slot
- **Color / albedo textures:** `ETC1S` for small file size with good quality
- **Normal maps and data textures:** `UASTC` for maximum quality at low GPU memory
- **Photographic / detailed textures:** `WebP` when ETC1S quality isn't sufficient

:::tip GPU Memory vs File Size
**ETC1S** and **UASTC** use KTX2 format, which stays compressed on the GPU — great for memory.
**WebP** has very small file sizes but is uncompressed in GPU memory — use sparingly on mobile.
:::

### Per-Texture Settings

When you enable the override for a texture, you can configure:

| Setting | Description |
| --- | --- |
| **Max Size** | Maximum texture resolution (e.g. 2048, 1024). The texture is downscaled if it exceeds this |
| **Compression** | Compression format: AUTO, NONE, ETC1S, UASTC, or WebP |
| **Quality** | Quality slider (0.0–1.0), only available for WebP |

---

## Mesh Compression

Production builds automatically compress meshes using **Draco** compression, which dramatically reduces file size for static geometry.

| Format | Draco | Meshopt |
| --- | --- | --- |
| **GPU Memory Usage** | Medium | Low |
| **File Size** | Lowest | Low |
| **Animation compression** | No | Yes |

- **Static meshes:** Draco provides the smallest file size (~20x reduction)
- **Animated meshes:** Meshopt supports animation and morph target compression

:::tip
Mesh compression is applied automatically during production builds. No manual configuration is needed in Blender.
:::

---

## Progressive Loading

Progressive loading splits your assets into a tiny initial file with low-quality previews, plus higher-quality LODs that stream in on demand. This dramatically improves perceived loading speed.

### Progressive Textures

When enabled (default), textures are generated with multiple LOD levels:
- The main file embeds a small preview (default: **128px**)
- Full-resolution versions stream in based on screen coverage
- Mobile devices automatically skip unnecessarily large textures

**Configure the preview size** in the Project Settings using the dropdown next to **Use Progressive Textures**.

### Progressive Meshes

When enabled (default), meshes get up to **6 LOD levels**:
- Lowest quality is embedded for instant display
- Higher quality streams in based on screen-space density
- A mesh filling the screen gets full detail; distant meshes stay simplified

:::tip Learn More
Progressive loading is powered by [`@needle-tools/gltf-progressive`](/docs/gltf-progressive/). See the full documentation for technical details on how LODs are generated and selected at runtime.
:::

---

## Gzip Compression

Enable **Use Gzip Compression** in Project Settings to additionally compress your build output with gzip (`.gz` files). This reduces transfer size over the network.

:::warning Server Compatibility
Your web server must support serving `.gz` compressed files. Most modern hosting platforms (Netlify, Vercel, Glitch) handle this automatically. If you deploy to your own server, make sure gzip serving is configured.
:::

---

## Best Practices

### General

- **Leave textures on AUTO** unless you have a specific reason to override
- **Use progressive loading** — it's enabled by default for good reason
- **Test on mobile** — compression has the biggest impact on mobile devices
- **Use the smallest texture resolution** that looks good for each texture

### Texture Optimization

- Large textures with simple content (solid colors, gradients) compress very well with ETC1S
- Normal maps and detail textures benefit from UASTC's higher quality
- Use **Max Size** overrides to downscale textures that don't need their full resolution
- Avoid unnecessarily large texture atlases

### Performance

- **KTX2 formats** (ETC1S, UASTC) stay compressed on the GPU — prefer these over WebP
- **WebP** textures are uncompressed in GPU memory — use only when needed for quality
- Enable **progressive loading** to avoid loading full-resolution textures that are barely visible

---

## Troubleshooting

**Build fails with "toktx not found":**
- Install [toktx](https://github.com/KhronosGroup/KTX-Software/releases) (v4.1.0+)
- Make sure it's in your system PATH
- Restart Blender (and possibly your computer)

**Textures look blurry or low quality:**
- Check if the texture is being downscaled by a **Max Size** override
- Try switching from ETC1S to UASTC or WebP for that texture
- Verify the source texture resolution is adequate

**File size is larger than expected:**
- Check for textures using UASTC (high quality but larger files) — switch to ETC1S where possible
- Reduce texture resolutions with **Max Size** overrides
- Make sure **progressive loading** is enabled to split large assets

**Gzip files not loading on my server:**
- Verify your server supports serving pre-compressed `.gz` files
- Check server configuration for `Content-Encoding: gzip` headers
- Try disabling gzip and using only KTX2/Draco compression

---

## Next Steps

- **[Optimization & Compression (Full Guide)](/docs/how-to-guides/optimization/)** — Detailed format comparisons, build options, and advanced settings
- **[Progressive Loading](/docs/gltf-progressive/)** — How progressive meshes and textures work under the hood
- **[Deployment Guide](/docs/how-to-guides/deployment/)** — Publish your optimized scenes to the web
- **[Lightmapping](/docs/blender/lightmapping)** — Bake lighting for even better performance

---

**Need Help?**
- [Discord Community](https://discord.needle.tools) — Ask about compression workflows
- [Forum](https://forum.needle.tools) — Share optimization results and get feedback
