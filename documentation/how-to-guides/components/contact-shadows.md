---
title: Add Contact Shadows (ContactShadows)
description: Add realistic ground shadows to your 3D scenes with the ContactShadows component. Soft, performant shadows that enhance visual quality. Works in Unity and Blender.
---

# Add Contact Shadows

Add realistic, soft shadows where objects meet the ground for enhanced depth and realism.

<video-embed src="/docs/videos/contactshadows.mp4" autoplay muted />

:::tip Works with Unity and Blender
The ContactShadows component is available for both Unity and Blender integrations.
:::

## What You Can Do

- **Realistic Ground Shadows** - Soft shadows where objects touch surfaces
- **Auto-Fit to Scene** - Automatically size shadows to cover your entire scene
- **Customizable Appearance** - Control darkness, opacity, and blur
- **Performant** - Efficient rendering without heavy shadow mapping
- **Easy Setup** - Add via component or HTML attribute

Perfect for:
- Product showcases and configurators
- Architectural visualizations
- Character and vehicle displays
- Any scene needing enhanced depth perception
- Lightweight shadow alternative

## Quick Start

### Via HTML Attribute (Easiest)

Add contact shadows to your entire scene with one line:

```html
<needle-engine contactshadows="0.7"></needle-engine>
```

The value (`0.7`) controls both opacity and darkness. Higher values = stronger shadows.

### Via Component in Unity/Blender

**In Unity or Blender:**
1. Create an empty object in your scene
2. Add the `ContactShadows` component
3. Enable **Auto Fit** to cover the whole scene
4. Export and view - shadows appear automatically!

### Programmatically

Create contact shadows from code:

```ts
import { ContactShadows } from "@needle-tools/engine";

// Automatically create and fit shadows to the scene
const shadows = ContactShadows.auto();

// Customize the shadows
shadows.opacity = 0.7;
shadows.darkness = 0.6;
shadows.blur = 3.0;
```

## Settings

| Setting | What it does | Default |
| --- | --- | --- |
| **Auto Fit** | Automatically size shadows to fit the entire scene | `false` |
| **Darkness** | How dark the shadows appear (0 = invisible, 1 = black) | `0.5` |
| **Opacity** | Transparency of the shadow plane (0 = transparent, 1 = opaque) | `0.5` |
| **Blur** | Softness of shadow edges (higher = softer) | `4.0` |
| **Occlude Below Ground** | Hide objects below the shadow plane | `false` |
| **Backface Shadows** | Cast shadows from backfaces of objects | `true` |
| **Manual Update** | Only update shadows when manually triggered | `false` |

## How It Works

ContactShadows renders your scene from below using an orthographic camera:

1. Objects are rendered as black silhouettes
2. The silhouettes are blurred for soft edges
3. The result is projected onto a ground plane
4. Only the area near objects shows shadows (contact area)

This creates realistic "contact shadows" without expensive real-time shadow mapping.

## Examples

### Product Display

Enhance product visualization with ground shadows:

**Via HTML:**
```html
<needle-engine src="product.glb" contactshadows="0.6"></needle-engine>
```

**Via Component:**
1. Add `ContactShadows` component to your scene
2. Enable **Auto Fit**
3. Set **Darkness** to `0.6` and **Opacity** to `0.5`
4. Set **Blur** to `5.0` for very soft shadows

### Architectural Visualization

Add depth to building models:

```ts
import { ContactShadows } from "@needle-tools/engine";

const shadows = ContactShadows.auto();
shadows.darkness = 0.7;
shadows.opacity = 0.8;
shadows.blur = 2.0; // Sharper shadows for architecture
```

### Custom Shadow Area

Control exactly where shadows appear:

**In Unity/Blender:**
1. Create a plane where you want shadows
2. Scale the plane to define the shadow area
3. Add `ContactShadows` component
4. Disable **Auto Fit**
5. The shadow area matches the object's scale

### Dynamic Scenes

Update shadows when objects move:

```ts
import { Behaviour, ContactShadows } from "@needle-tools/engine";

export class DynamicShadows extends Behaviour {

    private shadows?: ContactShadows;

    start() {
        this.shadows = ContactShadows.auto();
        // Enable manual updates for better performance
        this.shadows.manualUpdate = true;
    }

    // Call this when objects move or change
    updateShadows() {
        if (this.shadows) {
            this.shadows.needsUpdate = true;
        }
    }
}
```

## Advanced Features

### Auto-Fit with Custom Parameters

Control how shadows fit to your scene:

```ts
import { ContactShadows } from "@needle-tools/engine";

const shadows = ContactShadows.auto(context, {
    object: mySpecificObject, // Fit to specific object instead of whole scene
    positionOffset: { y: 0.01 }, // Raise shadows slightly off ground
    scaleFactor: { x: 1.2, z: 1.2 } // Expand shadow area by 20%
});
```

### Manual Shadow Updates

For static scenes, update shadows only when needed:

```ts
const shadows = ContactShadows.auto();
shadows.manualUpdate = true; // Don't update every frame

// Later, when something changes:
shadows.needsUpdate = true; // Update on next frame
```

This improves performance in scenes where objects don't move frequently.

### Fitting Shadows

Manually fit shadows to specific objects or the whole scene:

```ts
const shadows = ContactShadows.auto();

// Fit to the entire scene
shadows.fitShadows();

// Fit to specific objects
shadows.fitShadows({
    object: [object1, object2, object3],
    positionOffset: { y: 0.02 },
    scaleFactor: { x: 1.5, z: 1.5 }
});
```

### Occlude Below Ground

Hide parts of objects below the shadow plane:

```ts
const shadows = ContactShadows.auto();
shadows.occludeBelowGround = true;
```

Useful for:
- Cutting off reflected objects below mirrors
- Hiding underground parts in architectural models
- Creating water surface effects

### Backface Shadows

Control whether object backsides cast shadows:

```ts
const shadows = ContactShadows.auto();
shadows.backfaceShadows = false; // Only front faces cast shadows
```

Disabling this can reduce shadow artifacts but may make shadows look less complete.

## Common Questions

**How do contact shadows differ from regular shadows?** 
Contact shadows are soft, ground-plane-only shadows that enhance depth perception. They don't cast onto other objects like traditional shadow mapping does.

**Do contact shadows work in VR/AR?** 
Yes! Contact shadows render correctly in WebXR environments.

**Can I have multiple ContactShadows in one scene?** 
Generally you should only have one ContactShadows instance per scene. Use `ContactShadows.auto()` which creates only one instance.

**Why are my shadows not appearing?** 
Check that objects have visible geometry and aren't marked as transparent or wireframe. Use `?debugcontactshadows` URL parameter for diagnostics.

**How do I adjust shadow size?**  
If using **Auto Fit**, shadows automatically cover the scene. Otherwise, scale the GameObject to define the shadow area.

**Are contact shadows expensive?**  
They're more efficient than full shadow mapping but do require rendering the scene from below each frame. Use **Manual Update** for static scenes to improve performance.

**Can contact shadows follow moving objects?**  
Yes, shadows update automatically by default. For moving objects in otherwise static scenes, use manual updates and trigger `needsUpdate` when objects move.

## Performance Tips

**Static Scenes:**  
Enable manual updates and only update when needed:
```ts
shadows.manualUpdate = true;
shadows.needsUpdate = true; // Only when scene changes
```

**Reduce Texture Size:**  
Shadows use a 512×512 render target by default. This is hardcoded but provides good quality/performance balance.

**Adjust Blur:**  
Lower blur values render faster. Start with `blur: 2.0` and increase only if needed.

**Selective Rendering:**  
Objects marked with certain properties (wireframe, colorWrite:false) are automatically excluded from shadow rendering.

## Debugging

Enable debug mode by adding `?debugcontactshadows` to your URL:

```
http://localhost:3000?debugcontactshadows
```

This logs:
- Shadow creation and initialization
- Fitting operations and bounding boxes
- Render pipeline details

## More Information

**Live Example:**  
- [Contact Shadows Sample](https://samples.needle.tools/contact-shadows) - Interactive demo with controls

**API Documentation:**  
- [ContactShadows API](https://engine.needle.tools/docs/api/ContactShadows) - Complete technical reference

**Related Components:**  
- [Light](/docs/reference/components#light) - Traditional lighting and shadows
- [GroundProjectedEnv](/docs/reference/components#groundprojectedenv) - Ground-projected environment reflections
