---
title: Drag Objects in Your Scene (DragControls)
description: Let users drag and move 3D objects with mouse, touch, or VR controllers using the DragControls component. Works in Unity and Blender.
---

# Drag Objects in Your Scene

Make objects draggable in 2D screen space or 3D world space with mouse, touch, and VR support.

<video-embed src="/docs/videos/dragcontrols.mp4" autoplay muted />

:::tip Works with Unity and Blender
The DragControls component is available for both Unity and Blender integrations.
:::

## What You Can Do

- **Drag with Mouse/Touch** - Click and drag objects on desktop and mobile
- **VR/AR Support** - Grab and move objects with controllers or hands
- **Multiple Drag Modes** - Floor plane, screen space, surface snapping, and more
- **Grid Snapping** - Snap objects to a grid while dragging
- **Multiplayer** - Works with networking for collaborative experiences
- **Physics Integration** - Automatically handles rigidbodies during drag

Perfect for:
- Interactive product configurators
- Furniture placement tools
- Collaborative design spaces
- VR/AR object manipulation
- Puzzle and building games

## Quick Start

### Basic Setup

**In Unity or Blender:**
1. Add the `DragControls` component to any object with a mesh
2. Export and open in browser
3. Click and drag the object - it moves!

That's it! The object is now draggable.

### With Networking

Share dragged objects with other users:

1. Add `SyncedRoom` component to your scene
2. Add `SyncedTransform` to draggable objects
3. Users automatically see each other moving objects

## Settings

| Setting | What it does |
| --- | --- |
| **Drag Mode** | How the object moves: Floor plane, attached to cursor, or surface snapping |
| **Snap Grid Resolution** | Grid size for snapping (0 = no snapping) |
| **Keep Rotation** | Maintain object's original rotation while dragging |
| **XR Drag Mode** | Separate drag mode for VR/AR controllers |
| **XR Keep Rotation** | Maintain rotation while dragging in VR/AR |
| **XR Distance Drag Factor** | How quickly objects move closer/farther in VR |
| **Show Gizmo** | Display visual line from object to surface below |

## Drag Modes

### XZ Plane (Floor)
Objects stay on the same horizontal plane as they started. Perfect for objects on floors or tables.

### Attached
Objects follow the pointer/controller directly. In 2D, they move along the screen plane. In VR, they follow your hand.

### Hit Normal
Objects drag along the surface normal where you grabbed them. Good for objects on walls or slopes.

### Dynamic View Angle
Automatically switches between floor plane (looking down) and screen plane (looking straight) based on camera angle.

### Snap To Surfaces
Objects stick to surfaces as you drag them. Great for placing objects on walls, ceilings, or furniture.

### None
Disables dragging completely.

## Examples

### Furniture Placement

Let users arrange furniture in a room:

1. Add `DragControls` to furniture objects
2. Set **Drag Mode** to `XZ Plane` (keeps furniture on floor)
3. Set **Snap Grid Resolution** to `0.1` for clean placement
4. Users can drag furniture around the room

### Collaborative Workspace

Multiple users placing and moving objects together:

1. Add `SyncedRoom` component
2. Add `DragControls` and `SyncedTransform` to all draggable objects
3. Set **Drag Mode** to `Dynamic View Angle` for natural movement
4. Users see each other moving objects in real-time

### VR Object Manipulation

Natural VR grabbing and placement:

1. Add `DragControls` to objects
2. Set **XR Drag Mode** to `Attached` for natural hand movement
3. Disable **XR Keep Rotation** to allow rotating objects while dragging
4. Use **Snap To Surfaces** for placing objects on walls/tables

### Product Configurator

Let users position and rotate products:

1. Add `DragControls` to the product
2. Set **Drag Mode** to `Attached` for screen-following movement
3. Enable **Keep Rotation** to prevent accidental rotation
4. Add UI controls to call rotation methods from code

## Scripting

### Check if Objects Are Being Dragged

Detect when any object is being dragged:

```ts
import { Behaviour, DragControls } from "@needle-tools/engine";

export class DragDetector extends Behaviour {

    update() {
        if (DragControls.HasAnySelected) {
            console.log("Something is being dragged!");
        }
    }
}
```

### Get Currently Dragged Objects

Access all objects currently being dragged:

```ts
import { Behaviour, DragControls } from "@needle-tools/engine";

export class DragMonitor extends Behaviour {

    update() {
        const dragging = DragControls.CurrentlySelected;

        for (const dragControl of dragging) {
            const obj = dragControl.draggedObject;
            console.log("Dragging:", obj?.name);
        }
    }
}
```

### Change Drag Target Dynamically

Useful for duplicating or switching objects mid-drag:

```ts
import { Behaviour, DragControls } from "@needle-tools/engine";

export class DragSwitcher extends Behaviour {

    switchTarget(newObject: Object3D) {
        const dragControl = this.gameObject.getComponent(DragControls);

        if (dragControl) {
            // Change what object is being dragged
            dragControl.setTargetObject(newObject);
        }
    }
}
```

### Respond to Drag Events

Detect when an object with DragControls starts or stops being dragged:

```ts
import { Behaviour, DragControls, serializable } from "@needle-tools/engine";

export class DragListener extends Behaviour {

    @serializable(DragControls)
    dragControls?: DragControls;

    private wasDragging = false;

    update() {
        if (!this.dragControls) return;

        const isDragging = this.dragControls.draggedObject !== null;

        // Just started dragging
        if (isDragging && !this.wasDragging) {
            console.log("Started dragging!");
            this.onDragStart();
        }

        // Just stopped dragging
        if (!isDragging && this.wasDragging) {
            console.log("Stopped dragging!");
            this.onDragEnd();
        }

        this.wasDragging = isDragging;
    }

    onDragStart() {
        // Play sound, change material, etc.
    }

    onDragEnd() {
        // Snap to final position, save state, etc.
    }
}
```

## Advanced Features

### Grid Snapping

Snap dragged objects to a 3D grid:
- Set **Snap Grid Resolution** to desired grid size (e.g., `0.25` for quarter-meter grid)
- Objects snap to grid points while dragging
- Perfect for building tools and placement systems

### Multiplayer Ownership

DragControls automatically integrates with `SyncedTransform`:
- Requests ownership when dragging starts
- Enables "fast mode" for responsive dragging
- Releases ownership when dragging ends
- Other users see smooth synchronized movement

### Physics Integration

When dragging objects with Rigidbody components:
- Automatically becomes kinematic during drag (no physics simulation)
- Wakes up rigidbodies and resets velocities
- Returns to physics simulation when released
- Applies velocity on release for throwing mechanics

### VR Distance Control

In VR/AR, pulling controllers toward/away from your body changes object distance:
- **XR Distance Drag Factor** controls sensitivity
- Higher values = more responsive distance changes
- Set to `0` to disable distance adjustment
- Works naturally with hand/controller movement

## Common Questions

**How do I make only specific objects draggable?**
Add DragControls only to objects you want to be draggable. Objects without the component can't be dragged.

**Can I drag objects in VR without seeing controllers?**
Yes! DragControls works with XR hand tracking and controller-free input. Just enable XR support.

**Why does my object jump when I start dragging?**
This can happen if the drag plane is incorrectly positioned. Try changing the **Drag Mode** or ensure the object has proper colliders.

**How do I prevent objects from dragging through walls?**
Use **Snap To Surfaces** drag mode and ensure your walls have colliders. The object will stick to surfaces.

**Can I drag multiple objects at once?**
Each DragControls handles one object, but you can have multiple dragging simultaneously (useful for multi-touch or VR with both hands).

**How do I disable dragging temporarily?**
Set **Drag Mode** to `None` or disable the DragControls component.

**Does it work with networking in production?**
Yes! DragControls is designed for multiplayer. Combine with `SyncedRoom` and `SyncedTransform` for collaborative experiences.

## Debugging

Enable debug mode by adding `?debugdrag` to your URL:

```
http://localhost:3000?debugdrag
```

This shows:
- Visual helpers for drag planes and normals
- Attachment points and hit positions
- Movement distances and device info
- Bounding box snap points

## More Information

**Live Example:**
- [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox/) - Multi-user dragging and placement

**API Documentation:**
- [DragControls API](https://engine.needle.tools/docs/api/DragControls) - Complete technical reference

**Related Components:**
- [SyncedTransform](/docs/reference/components#syncedtransform) - Network synchronization for dragged objects
- [Duplicatable](/docs/reference/components#duplicatable) - Duplicate objects while dragging
- [Deletable](/docs/reference/components#deletable) - Delete dragged objects
