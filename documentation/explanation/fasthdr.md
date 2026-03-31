---
title: FastHDR Environment Lighting
description: Ultra-fast, high-quality HDR environment lighting for 3D web scenes. 10x faster than EXR, 95% less GPU memory, works great on mobile and low-end devices. Available in Unity and Blender.
---

# FastHDR Environment Lighting

Beautiful environment lighting that loads in milliseconds, uses almost no VRAM, and requires zero CPU processing — perfect for every device, including low-end phones and tablets.

:::tip At a glance
Your environment lights up in **134 ms** instead of 1,200 ms.<br>
Your GPU uses **12 MB** instead of 256 MB.<br>
Your users download **2 MB** instead of 6 MB.<br>
Your main thread does **nothing** — zero processing, zero frame drops.<br>
And it looks **identical** to what you see in your editor.
:::

<video-embed src="https://www.youtube.com/watch?v=z_w3Hrzq-7o" limit_height />

<sample src="https://needle-engine-environment-compression-demo-z23hmxbzenysl.needle.run/" lazy description="Experience FastHDR in action — click on the Next Environment button to change the FastHDR environment texture" />

## Why FastHDR?

FastHDR is a GPU-native environment map format built on **KTX2 supercompression** (UASTC HDR 4x4). Unlike EXR, FastHDR files stream directly to GPU memory — no decompression on the main thread, no frame drops, no stalling. No other web 3D framework offers this — it's a Needle Engine exclusive.

<video-embed src="https://www.youtube.com/watch?v=9v0C7Xa6TUE" limit_height />

Here's what that means in practice:

- **Budget phones stay smooth.**<br>A $150 Android that chokes on a 256 MB EXR texture runs FastHDR without breaking a sweat — because it only needs 12 MB of VRAM vs 256 MB with EXR
- **Pages load instantly.**<br>Your 4K environment is ready in 134 ms. That's faster than most images on the web
- **No stutter, ever.**<br>Traditional HDRIs block the main thread for decompression and mip generation. FastHDR skips all of that — the GPU handles everything directly
- **Smaller downloads.**<br>75% smaller than EXR. Your users on mobile data will thank you
- **Every device, every browser.**<br>No special libraries, no polyfills, no fallbacks. It just works
- **Full quality.**<br>Pre-computed PMREM gives you physically accurate reflections and lighting — no shortcuts

### Size & Performance Comparison

| | EXR | UltraHDR | **FastHDR** 🌵 | |
|---|---|---|---|---|
| **2K File Size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | 5.6 MB | 2.1 MB | **1.9 MB** ⭐ | *3x smaller* |
| **2K GPU Memory&nbsp;&nbsp;&nbsp;&nbsp;** | 64 MB | 69 MB | **3 MB** ⭐ | *21x less* |
| **4K Load Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | ~1,261 ms | ~268 ms | **~134 ms** ⭐ | *10x faster* |
| **4K File Size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | 21.2 MB | 8.2 MB | **7.3 MB** ⭐ | *3x smaller* |
| **4K GPU Memory&nbsp;&nbsp;&nbsp;&nbsp;** | 256 MB | 277 MB | **12 MB** ⭐ | *21x less* |
| **CPU Processing&nbsp;&nbsp;&nbsp;&nbsp;** | Heavy | Heavy | **None** ⭐ | *zero work* |
| **Frame Drops&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | Likely | Likely | **None** ⭐ | *zero frame drops* |

Perfect for:
- Mobile-first 3D experiences
- Product configurators with realistic reflections
- Architectural visualization
- Any scene where loading speed and quality both matter
- Every device — from budget phones to high-end desktops, everyone benefits from faster loading and lower memory usage

## Quick Start

:::tip Works with Unity and Blender
FastHDR is available in both Unity and Blender integrations starting with Needle Engine 5.0.0.
:::

### In Unity or Blender

Use **any** `.exr` file — Needle Engine handles the rest:

1. Open your Needle Engine project
2. Set your scene's **Environment Lighting** to any `.exr` HDRI
3. When you build for production, Needle Engine's optimization pipeline automatically converts it to FastHDR
4. That's it! Your deployed scene loads with ultra-fast, high-quality lighting

No extra setup required — FastHDR conversion happens automatically during the Needle Engine build optimization step.

### Via HTML Attribute

For code-only or three.js projects, use pre-processed FastHDR files from the [Needle HDR Library](https://cloud.needle.tools/hdris):

```html
<needle-engine
  environment-image="https://cloud.needle.tools/hdris/lilienstein-4k.ktx2"
  background-image="https://cloud.needle.tools/hdris/lilienstein-4k.ktx2"
  background-blurriness="0.3"
>
</needle-engine>
```

You can also use built-in presets without any URL:
```html
<needle-engine environment-image="studio" background-image="studio"></needle-engine>
```

## Free HDR Library

Browse **27+ free FastHDR environments** at [cloud.needle.tools/hdris](https://cloud.needle.tools/hdris) — indoor studios, outdoor landscapes, cityscapes, and more. All ready to use, all in FastHDR format.

## How It Works

Traditional HDR workflows load a large `.exr` file, decompress it on the CPU, generate PMREM mip levels, and then upload to the GPU. This is slow, blocks the main thread, and consumes huge amounts of VRAM.

FastHDR eliminates all of this. During Needle Engine's production build optimization:

1. **PMREM is pre-computed** — no runtime mip generation
2. **KTX2 UASTC HDR 4x4** — GPU-native compressed texture format
3. **Hardware transcoding** — the GPU decompresses the data directly, no CPU work
4. **Web worker loading** — file fetching and parsing happen off the main thread

The result: your lighting appears almost instantly with zero impact on frame rate.

## Common Questions

**Do I need to change my workflow?**<br>
No. If you're using Unity or Blender, your existing HDRI environment maps are automatically converted to FastHDR during the production build optimization step.

**Can I use my own custom HDRIs?**<br>
Yes. When using Unity or Blender, any `.exr` file you assign as environment lighting will be converted to FastHDR automatically when building for production.

**Does FastHDR work on all devices?**<br>
Yes. The KTX2 UASTC HDR format is supported across all modern browsers and GPUs. This is what makes it especially great for low-end devices.

**What about three.js / React-Three-Fiber projects?**<br>
FastHDR files (`.ktx2`) can be loaded directly with three.js `KTX2Loader`. See the [three.js integration docs](/docs/three/) for details.

**Can I use FastHDR for just the background, or just lighting?**<br>
Yes. The `background-image` and `environment-image` attributes are independent — you can use FastHDR for one or both.

## See Also

- [FastHDR In-Depth Article](https://cloud.needle.tools/articles/fasthdr-environment-maps) — Technical deep dive on how FastHDR works
- [Needle HDR Library](https://cloud.needle.tools/hdris) — Free FastHDR environments
- [`<needle-engine>` Attributes](/docs/reference/needle-engine-attributes) — Web component configuration
- [Scripting Examples: Environment & Lighting](/docs/reference/scripting-examples#🔆-environment--lighting) — Code snippets
- [Optimization Guide](/docs/how-to-guides/optimization/) — Performance best practices
