---
title: Lightmapping in Blender
description: Bake beautiful lighting for optimal web performance
---

# Lightmapping

Bake realistic lighting and shadows directly in Blender and export them to the web for stunning visuals with excellent performance.

<video-embed limit_height max_height="800px" src="/docs/blender/lightmapping.mp4" />

---

## What is Lightmapping?

Lightmapping is the process of pre-calculating lighting and baking it into textures. This gives you:

**Benefits:**
- ✨ **Photorealistic lighting** - Bake complex lighting calculations once
- ⚡ **Great performance** - No real-time lighting calculations needed
- 🎨 **Artistic control** - Fine-tune lighting in Blender
- 📦 **Small file sizes** - Compressed lightmap textures
- 🔄 **Multiple instances** - Each instance can have unique lightmaps

**Use Cases:**
- Architectural visualization
- Product showcases with dramatic lighting
- Art galleries and museum experiences
- Any scene with static lighting

---

## Requirements

**Before you start:**
- At least one light in your scene
- Objects marked as `Lightmapped` in the Needle Object panel
- Blender's lighting set up the way you want it

:::tip Download Example
Get the complete lightmapping example to learn from: [lightmaps.blend](https://engine.needle.tools/downloads/blender/lightmaps.blend)
:::

---

## Quick Start

### Step 1: Mark Objects for Lightmapping

**For Mesh Objects:**

1. Select your mesh object
2. Open the **Needle Object** panel (Object Properties tab)
3. Enable the `Lightmapped` checkbox

**For Lights:**

1. Select your light
2. Open the **Needle Object** panel
3. Enable `Lightmapped` to include it in baking

![Enable lightmapping on objects](/blender/lightmapping-object.webp)

:::tip What to Lightmap
- Mark static geometry (buildings, furniture, environments)
- Mark lights that should affect lightmaps
- **Don't** mark dynamic objects that move
:::

---

### Step 2: Configure Settings

You can configure lightmapping from two places:

**Option A: Scene Panel (Quick Access)**

Open the **Needle** tab in the 3D viewport's sidebar (press `N` to toggle).

![Lightmap settings - Scene panel](/blender/lightmapping-scene-panel.webp)

**Option B: Render Properties (Full Settings)**

Go to **Render Properties** tab and find the **Lightmapping** panel.

![Lightmap settings - Render properties](/blender/lightmapping-panel.webp)

---

### Step 3: Bake Lightmaps

1. Click the **Bake** button (in either panel)
2. Wait for baking to complete (progress shows in Blender)
3. Lightmaps are automatically exported with your scene

**What Happens:**
- Needle Engine generates lightmap UVs automatically (no manual UV unwrapping needed!)
- Blender bakes lighting into textures
- Textures are saved in your project
- Export includes lightmap data

---

## Lightmap Settings Explained

### Resolution

**`Lightmap Resolution`** - Texels per unit
- Higher = better quality, larger files
- Lower = faster baking, smaller files
- **Recommended:** 10-50 for most scenes

### Quality

**`Samples`** - Render samples for baking
- More samples = cleaner results, slower baking
- Fewer samples = faster but noisier
- **Recommended:** 128-512 for production

**`Denoise`** - Remove noise from baked lightmaps
- Enable for cleaner results
- Requires Blender's denoiser

### Advanced

**`Max Lightmap Size`** - Maximum texture size
- Limits memory usage
- **Recommended:** 2048 or 4096

**`Pack Margin`** - Padding between UV islands
- Prevents light bleeding between objects
- **Recommended:** 4-16 pixels

---

## Automatic UV Generation

Needle Engine's lightmapping plugin automatically generates lightmap UVs - no manual unwrapping required!

**How it works:**
- Analyzes your geometry
- Creates optimal UV layouts
- Packs efficiently into texture space
- Handles multiple instances intelligently

**This means:**
- ✅ No second UV channel needed
- ✅ Works with complex models
- ✅ Supports instanced objects with unique lighting

---

## Best Practices

### Scene Setup

**Lighting:**
- Use area lights for soft, natural lighting
- Combine sun light with fill lights for outdoor scenes
- Add rim lights to highlight edges
- Consider color temperature (warm/cool)

**Geometry:**
- Ensure clean topology (no overlapping faces)
- Lightmap static architecture, not characters
- Use separate objects for elements that need different lightmap resolution

**Performance:**
- Only lightmap objects that benefit from it
- Use lower resolution for background elements
- Compress textures in production builds

---

### Troubleshooting

**Black or dark lightmaps:**
- Check that lights are marked as `Lightmapped`
- Increase render samples
- Verify normals are correct (consistent face orientation)

**Seams or artifacts:**
- Increase `Pack Margin` setting
- Check for overlapping UV islands
- Ensure geometry is watertight (no gaps)

**Too slow:**
- Reduce lightmap resolution
- Reduce render samples
- Bake in sections (bake one object at a time)

**File too large:**
- Lower lightmap resolution
- Reduce `Max Lightmap Size`
- Enable texture compression in production builds

---

## Workflow Tips

### Iterative Baking

While developing:
1. Use lower resolution and fewer samples for fast iteration
2. Mark only key objects as lightmapped initially
3. Test in browser frequently
4. Increase quality for final bake

### Combining with Real-Time Lighting

You can mix lightmaps with dynamic lights:
- Use lightmaps for static ambient lighting
- Add dynamic point lights for moving elements
- Result: Beautiful base lighting + interactive highlights

### Multiple Lightmap Scenarios

Bake different lighting conditions:
- Day/night versions
- Different seasons
- Dramatic vs. natural lighting
- Switch between them at runtime

---

## Exporting Lightmaps

Lightmaps are exported automatically when you:
1. Save your `.blend` file (if auto-export is enabled)
2. Click `Export` in the Needle Project panel
3. Run `Build: Production`

**Output:**
- Lightmap textures saved in your project's `assets` folder
- GLB file includes lightmap data
- Ready to use on the web - no additional setup needed

---

## Advanced: Runtime Control

You can control lightmaps from TypeScript:

```ts
import { Behaviour, Renderer } from "@needle-tools/engine";

export class LightmapSwitcher extends Behaviour {

    switchToNightLightmaps() {
        const renderers = this.gameObject.getComponentsInChildren(Renderer);
        for (const renderer of renderers) {
            // Access and modify lightmap data
            // (specific API depends on your setup)
        }
    }
}
```

---

## Experimental Feature Notice

:::warning Lightmapping is Experimental
The lightmapping plugin is currently experimental. We recommend:
- **Creating backups** of your `.blend` files before baking
- **Testing thoroughly** before production use
- **[Reporting issues](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)** you encounter

Your feedback helps us improve the feature!
:::

---

## Next Steps

- **[Texture Compression](/docs/how-to-guides/deployment/#texture-compression)** - Optimize lightmap file sizes
- **[Deployment Guide](/docs/how-to-guides/deployment/)** - Publish your lightmapped scenes
- **[Components Overview](/docs/blender/components)** - Add interactivity to lit scenes

---

**Need Help?**
- [Discord Community](https://discord.needle.tools) - Ask about lightmapping workflows
- [Forum](https://forum.needle.tools) - Share your lightmapped scenes
- [Download Example](https://engine.needle.tools/downloads/blender/lightmaps.blend) - Working lightmap sample
