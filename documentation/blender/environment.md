---
title: Environment Lighting in Blender
description: Set up environment lighting and skyboxes in Blender for the web — with automatic compression for fast loading
---

# Environment Lighting

Set up environment lighting and skyboxes in Blender and export them to the web. Use any HDRI you want — Needle Engine automatically compresses it for fast loading and low memory usage.

<video-embed limit_height max_height="300px" src="/docs/blender/environment.mp4" />

---

## Quick Start

### Step 1: Assign an Environment Map

1. Open **Viewport Shading** options (top right of the 3D viewport)
2. Assign an HDRI / EXR cubemap
3. Set `World Opacity` to **1** to make the skybox visible in the browser

![Environment settings](/blender/environment.webp "2x")

### Step 2: Use a Custom HDRI

You can use any `.exr` or `.hdr` file — including large, high-resolution environment maps. Needle Engine takes care of compressing them for you during the build.

<video-embed limit_height max_height="300px" src="/docs/blender/custom_hdri.mp4" />

**Where to find free HDRIs:**
- [Needle HDR Library](https://cloud.needle.tools/hdris) — Free, ready-to-use environments
- [Poly Haven](https://polyhaven.com/hdris) — Hundreds of free CC0 HDRIs
- [ambientCG](https://ambientcg.com/) — Free PBR materials and HDRIs

---

## Automatic Compression (FastHDR)

You don't need to worry about environment map file sizes. When you **build your project** or **deploy to Needle Cloud**, Needle Engine automatically converts your environment maps into the [FastHDR](/docs/fasthdr) format. This means:

- **Use any size** — 2K, 4K, or larger HDRIs all work great
- **Automatic compression** — files get dramatically smaller (e.g. a 21 MB EXR becomes ~7 MB)
- **Fast loading** — environments load in milliseconds instead of seconds
- **Low memory usage** — uses up to 21x less GPU memory than raw EXR
- **Same visual quality** — your lighting and reflections look identical

This all happens behind the scenes during the build step — no manual work required.

:::tip Preview compressed results locally
Want to see how your scene looks with compression applied? Enable **Auto Compress** in the Needle Engine dropdown above the viewport. This gives you a local preview of the optimized result.
:::

---

## Environment Camera

By default, the environment map is used for both **lighting** (reflections and ambient light) and the **background** (the visible skybox).

You can control the background appearance separately using the environment camera settings.

![Environment camera settings](/blender/environment-camera.webp "2x")

---

## Ground Projection

Reshape the lower part of the HDR sphere into a flat plane that aligns with your scene's floor — objects appear to stand inside the environment rather than floating inside a sphere. Common in car configurators and product hero shots.

<sample src="https://groundprojection_blender-zubcks1agyg3.needle.run/" lazy description="Ground Projection — HDR environment with a projected ground plane so objects feel grounded in the scene. Built in Blender." />

---

## Reflection Probes

For scenes with multiple rooms or distinct lighting zones, use **reflection probes** to capture local reflections. Objects automatically use the closest probe.

<sample src="https://reflectionprobes-blender-zubcks2ksox9.needle.run/" lazy description="Bathroom with Reflection Probes — multiple reflection probes give grounded, believable reflections across different areas of the scene." />

---

## Tips

**Quality:**
- Higher-resolution HDRIs (4K+) give sharper reflections, especially on glossy surfaces
- FastHDR compression preserves quality — don't downscale your source files

**Performance:**
- FastHDR environments load fast even on mobile devices and low-end hardware
- If you don't need a visible skybox, you can still use an HDRI for lighting only by setting `World Opacity` to **0**

**Troubleshooting:**
- If colors look off, check your [Color Management settings](/docs/blender/#fix-color-management) — set `View` to **Standard**
- If your scene has a greenish tint after building, see the [FAQ](/docs/reference/faq#why-does-my-blender-scene-have-a-green-tint-or-different-color-after-building-deploying-to-needle-cloud)

---

## Next Steps

- **[FastHDR Deep Dive](/docs/fasthdr)** — Learn more about how environment compression works
- **[Lightmapping](/docs/blender/lightmapping)** — Combine environment lighting with baked lightmaps
- **[Optimization Guide](/docs/how-to-guides/optimization/)** — More ways to optimize your scenes for the web

---

**Need Help?**
- [Discord Community](https://discord.needle.tools) - Ask questions about environment setup
- [Forum](https://forum.needle.tools) - Share your projects and get feedback
