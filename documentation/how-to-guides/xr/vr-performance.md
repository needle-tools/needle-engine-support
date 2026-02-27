---
title: VR Performance Optimization
description: Diagnose and fix performance issues in VR experiences. Covers profiling, common bottlenecks, and Quest-specific tips.
---

# <logo-header logo="/imgs/webxr-logo.webp" alt="WebXR">VR Performance Optimization</logo-header>

VR has stricter performance requirements than desktop or mobile web. This guide helps you identify and fix common performance bottlenecks in VR projects.

:::tip New to WebXR with Needle Engine?
Start with the [WebXR Overview](/docs/how-to-guides/xr/) to learn about supported platforms, setup, and features before diving into optimization.
:::

## Why VR Performance is Different

VR headsets render your scene **twice per frame** (once per eye). Combined with high refresh rates, the performance budget is tight:

| Headset | Refresh Rate | Frame Budget |
|---------|-------------|-------------|
| <logo-header logo="/imgs/meta-logo.webp" alt="Meta">Meta Quest 2</logo-header> | 72–90 Hz | 11–14 ms |
| <logo-header logo="/imgs/meta-logo.webp" alt="Meta">Meta Quest 3</logo-header> | 72–120 Hz | 8–14 ms |
| <logo-header logo="/imgs/apple-logo.webp" alt="Apple">Apple Vision Pro</logo-header> | 90 Hz | 11 ms |
| PC VR (Index, Vive) | 90–144 Hz | 7–11 ms |

If your frame takes longer than the budget, the headset will drop frames, causing judder — which is uncomfortable and can cause motion sickness.

**Quest headsets use mobile GPUs**, comparable to a mid-range phone. They can't handle the same scene complexity as a desktop GPU.

## How to Profile VR Performance

### 1. Use the stats overlay

Append `?stats` to your URL to show an FPS counter and renderer statistics (draw calls, triangles, textures in memory). This works while in VR.

### 2. Connect Chrome DevTools to Quest

Quest runs a Chromium-based browser. You can profile it from your PC:

1. Connect Quest to your PC via USB
2. Open `chrome://inspect/#devices` in Chrome
3. Find your page and click **Inspect**
4. Use the **Performance** tab to record a trace while in VR

See [Quest Debugging](/docs/how-to-guides/debugging/#quest-debugging) for more details.

### 3. Identify CPU vs GPU bottleneck

- **CPU bound:** long JavaScript execution in the Performance flame chart (physics, scripts, draw call submission). The GPU finishes early but the CPU can't keep up.
- **GPU bound:** short JavaScript frames but the headset still drops frames. The scene is too complex for the GPU to render in time.

Most VR performance issues on Quest are **GPU bound** due to the mobile hardware.

## Common Bottlenecks & Fixes

### Draw calls

Each unique mesh + material combination is a separate draw call. The browser must communicate each one to the GPU, which adds overhead.

**Target:** Keep draw calls under ~100–150 for Quest. Desktop VR can handle more.

**How to reduce them:**
- Merge static meshes in your 3D editor before export
- Reduce the number of unique materials — objects sharing the same material are cheaper
- Enable GPU instancing on materials in Unity or Blender — Needle Engine handles the rest automatically
- Check your draw call count with the `?stats` URL parameter

### Shadows

Realtime shadows are one of the most expensive rendering features. Each shadow-casting light requires rendering shadow maps, which in VR means additional render passes.

**Fixes:**
- **Remove realtime shadows** as a first test — if performance improves dramatically, shadows are the bottleneck
- Use [baked lightmaps](/docs/blender/lightmapping) instead of realtime shadows for static scenes
- Use [ContactShadows](/docs/how-to-guides/components/contact-shadows) for lightweight ground shadows on individual objects
- If you need realtime shadows, limit them to a single directional light and reduce the shadow map resolution
- Reduce the shadow distance to avoid rendering shadows for far-away objects

### Transparent materials and overdraw

Transparent objects (glass, particles, UI panels) can't use the GPU's depth buffer to skip hidden pixels. Each transparent layer is drawn fully, and they must be sorted back-to-front.

**Fixes:**
- Minimize the number of transparent objects in the scene
- Reduce the screen coverage of transparent objects (smaller particle effects, etc.)
- Use alpha cutout (`alphaTest`) or alpha hash instead of alpha blending when possible — both work with the depth buffer

### Texture memory

Large textures consume GPU memory and bandwidth. On Quest, GPU memory is shared with system RAM.

**Fixes:**
- Use [texture compression](/docs/how-to-guides/optimization/#texture-compression) (KTX2) — compressed textures use 4–8x less GPU memory than uncompressed
- Reduce texture resolution where it won't be noticed (e.g., floor textures viewed at an angle)
- Enable [progressive texture loading](/docs/how-to-guides/optimization/#progressive-texture-loading-texture-lods) — low-res versions load first, full quality loads on demand, and unused high-res textures are released from GPU memory
- Avoid WebP textures for VR if possible — they're uncompressed in GPU memory

### Physics

Physics simulation (Rapier) runs on the CPU and can become expensive with many active rigidbodies or complex collider shapes.

**Fixes:**
- Use simple collider shapes (box, sphere, capsule) instead of mesh colliders
- Reduce the number of active rigidbodies
- Set objects to kinematic or static when they don't need to move
- Disable colliders on objects that don't need physics interaction

### Expensive scripts

Scripts that run every frame (`update()`) add to the CPU cost. In VR, even small per-frame costs add up because the frame budget is tight.

**Fixes:**
- Profile your code in Chrome DevTools to find expensive functions
- Avoid allocations (creating new objects/arrays) in `update()` — this triggers garbage collection which causes frame spikes
- Use events or coroutines instead of polling in `update()` where possible
- Cache component lookups and calculations

## Quest-Specific Tips

Meta Quest headsets have the tightest constraints because they use mobile GPUs. Here are Quest-specific recommendations:

**Disable shadows on Quest:**
```ts
import { Behaviour, DeviceUtilities } from "@needle-tools/engine";

export class VRQualitySettings extends Behaviour {
    start() {
        if (DeviceUtilities.isQuest()) {
            this.context.renderer.shadowMap.enabled = false;
        }
    }
}
```

See [Detect Mobile Devices](/docs/how-to-guides/scripting/detect-mobile-devices) for more device detection utilities.

**General Quest guidelines:**
- Target under 100 draw calls
- Keep triangle count under 200–300k visible at any time
- Use compressed textures (KTX2) — they save both memory and bandwidth
- Avoid realtime shadows — use baked lighting or [ContactShadows](/docs/how-to-guides/components/contact-shadows)

## Quick Reference

| Area | What to check |
|------|--------------|
| 📦 **Build** | Use a production build (compression, LODs enabled) |
| 🎨 **Draw calls** | Under ~100 on Quest, check with `?stats` |
| 🌑 **Shadows** | Baked lightmaps or [ContactShadows](/docs/how-to-guides/components/contact-shadows) instead of realtime |
| 🖼️ **Textures** | Compressed with KTX2, reasonable resolutions |
| 💎 **Transparency** | Minimal, prefer alpha cutout or alpha hash |
| ⚙️ **Physics** | Simple collider shapes, few active rigidbodies |
| 📝 **Scripts** | No heavy work or allocations in update() |
| 🥽 **Testing** | Always test on the actual headset |

## Related Documentation

- [Optimization & Compression](/docs/how-to-guides/optimization/) — texture and mesh compression, LODs, progressive loading
- [Debugging Parameters](/docs/how-to-guides/debugging/) — URL parameters, Quest debugging setup
- [Detect Mobile Devices](/docs/how-to-guides/scripting/detect-mobile-devices) — device detection for adaptive quality
- [ContactShadows](/docs/how-to-guides/components/contact-shadows) — lightweight ground shadow alternative
- [WebXR Overview](/docs/how-to-guides/xr/) — XR features and platform support
