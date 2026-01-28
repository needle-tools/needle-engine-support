---
title: Make Objects Follow the Cursor
description: Create interactive effects where 3D objects follow the user's mouse or touch position with the CursorFollow component. Works in Unity and Blender.
---

# Make Objects Follow the Cursor

Create interactive effects where 3D objects smoothly follow the user's cursor or touch position.

<video-embed src="/docs/videos/lookatcursor.mp4" autoplay muted />

:::tip Works with Unity and Blender
The CursorFollow component is available for both Unity and Blender integrations.
:::

## What You Can Do

- **Follow Mouse/Touch** - Objects track cursor position across the screen
- **Smooth Movement** - Add damping for natural, smooth motion
- **Maintain Distance** - Keep objects at a fixed distance from camera
- **Full Page Tracking** - Track cursor even outside the 3D canvas
- **Surface Snapping** - Stick objects to surfaces in your scene

Perfect for:
- Interactive headers and hero sections
- Eye-following characters
- Floating UI elements
- Product spotlight effects
- Cursor-based interactions

## Quick Start

### Basic Setup

**In Unity or Blender:**
1. Add a `CursorFollow` component to any object
2. Export and open in browser
3. Move your cursor - the object follows!

### Smooth Motion

Add natural, smooth movement:

1. On the CursorFollow component, set **Damping** to `0.1` (or higher for slower motion)
2. The object now smoothly eases toward the cursor position

Try different values:
- `0` = Instant movement (no smoothing)
- `0.05` = Very responsive
- `0.2` = Smooth and natural
- `0.5` = Slow, floaty movement

## Settings

| Setting | What it does |
| --- | --- |
| **Damping** | Smoothness of movement (0 = instant, higher = smoother) |
| **Use Full Page** | Track cursor across entire page, not just the 3D canvas |
| **Keep Distance** | Maintain the object's initial distance from camera |
| **Snap To Surface** | Stick the object to surfaces in the scene via raycasting |

## Examples

### Interactive 3D Header

Create an engaging header where a 3D object follows the cursor:

1. Add your 3D object (logo, character, product)
2. Add `CursorFollow` component
3. Set **Damping** to `0.2` for smooth movement
4. Enable **Use Full Page** so it tracks across your entire website

Combine with a `LookAt` component to make objects look at the cursor!

### Eye-Following Character

Make a character's eyes follow the cursor:

1. Add `CursorFollow` to empty objects positioned where the eyes should look
2. Use `LookAt` components on the eye objects, targeting the CursorFollow objects
3. Adjust **Damping** for natural eye movement
4. The eyes now follow the cursor!

### Floating Cursor Indicator

Create a custom 3D cursor that floats in your scene:

1. Add a small 3D object (sphere, custom model)
2. Add `CursorFollow` component
3. Enable **Snap To Surface** to stick it to objects in your scene
4. Set **Keep Distance** to `false` if you want it to move freely in 3D space

### Product Spotlight

Highlight products as users move their cursor:

1. Add a spotlight or highlight object
2. Add `CursorFollow` with smooth **Damping**
3. The light follows the cursor, creating an interactive spotlight effect

## Scripting

### Control Distance Programmatically

Change how far the object floats from the camera:

```ts
import { Behaviour, CursorFollow } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    start() {
        const cursorFollow = this.gameObject.getComponent(CursorFollow);

        if (cursorFollow) {
            // Force update the distance (useful if you move the object)
            cursorFollow.updateDistance(true);
        }
    }
}
```

### Combine with Other Components

CursorFollow works great with other components:

```ts
import { Behaviour, CursorFollow, LookAt } from "@needle-tools/engine";

export class InteractiveSetup extends Behaviour {

    start() {
        // Add CursorFollow to a target object
        const target = this.gameObject;
        const cursorFollow = target.addNewComponent(CursorFollow);
        cursorFollow.damping = 0.15;
        cursorFollow.useFullPage = true;

        // Make another object look at this target
        const lookAt = this.gameObject.addNewComponent(LookAt);
        lookAt.target = target;
    }
}
```

## How It Works

The CursorFollow component:

1. Tracks cursor position in normalized device coordinates (NDC)
2. Creates a ray from the camera through the cursor position
3. Places the object along that ray at a specified distance
4. Optionally smooths the movement with damping
5. Can raycast to snap to surfaces if enabled

## Settings Explained

### Use Full Page

When **enabled** (default):
- Tracks cursor across your entire webpage
- Perfect for hero sections and headers
- Object keeps responding even when cursor leaves the canvas

When **disabled**:
- Only tracks cursor inside the 3D canvas
- Useful for contained experiences
- Object stops moving when cursor leaves canvas

### Keep Distance

When **enabled** (default):
- Object stays at its initial distance from camera
- Creates a "floating in space" effect
- Distance calculated when component starts

When **disabled**:
- Object moves freely in 3D space
- Useful with **Snap To Surface** for surface-following effects

### Snap To Surface

When **enabled**:
- Object sticks to surfaces in your scene
- Uses raycasting to detect surfaces
- Great for "painting" effects or surface indicators

When **disabled** (default):
- Object floats freely at the cursor position
- No collision detection needed

## Common Questions

**Can I use this for mobile/touch devices?**
Yes! The component automatically works with touch events on mobile devices.

**Does it work outside the canvas?**
Yes, when **Use Full Page** is enabled. This is great for hero sections where the 3D element is small but should react to the full page.

**How do I make multiple objects follow the cursor differently?**
Add CursorFollow to multiple objects with different **Damping** values. Lower damping = faster response, higher damping = slower, more delayed movement.

**Can I make an object look at the cursor instead?**
Yes! Use the `LookAt` component and combine it with CursorFollow on a target object. The LookAt object will rotate to face the cursor-following target.

**What's the performance impact?**
Very minimal! The component runs once per frame and uses simple math. You can have many CursorFollow objects without performance issues.

## Debugging

Enable debug mode by adding `?debugcursor` to your URL:

```
http://localhost:3000?debugcursor
```

This shows visual gizmos when **Snap To Surface** is enabled, displaying the raycast hit points and normals.

## More Information

**Live Example:**
- [Look At Cursor Sample](https://engine.needle.tools/samples/look-at-cursor-interactive-3d-header/) - Interactive 3D header demo

**API Documentation:**
- [CursorFollow API](https://engine.needle.tools/docs/api/CursorFollow) - Complete technical reference

**Related Components:**
- [LookAt](/docs/reference/components#lookat) - Make objects look at targets
- [Orbit Controls](/docs/reference/components#orbitcontrols) - Camera orbit controls
