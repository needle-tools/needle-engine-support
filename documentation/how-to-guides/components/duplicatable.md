---
title: Duplicate Objects by Dragging (Duplicatable)
description: Let users create copies of objects by dragging them with the Duplicatable component. Works in Unity and Blender with multiplayer support.
---

# Duplicate Objects by Dragging

Create interactive experiences where users can spawn copies of objects by clicking and dragging.

<video-embed src="/docs/videos/duplicatable.mp4" autoplay muted />

:::tip Works with Unity and Blender
The Duplicatable component is available for both Unity and Blender integrations.
:::

## What You Can Do

- **Drag to Duplicate** - Users click and drag to create a copy that follows their cursor
- **Automatic Networking** - Duplicated objects sync across all connected users
- **Rate Limiting** - Prevent spam by limiting how many objects can be created
- **Custom Templates** - Define what object gets duplicated
- **Works with DragControls** - Automatically integrates with object dragging

Perfect for:
- Object placement tools
- Building and construction games
- Collaborative design spaces
- Inventory systems where items spawn
- Furniture configurators

## Quick Start

### Basic Setup

**In Unity or Blender:**
1. Create an object you want to duplicate (e.g., a cube)
2. Add a `Duplicatable` component to it
3. The component automatically sets up the object as a template
4. Export and open in browser
5. Click and drag the object - a copy spawns and follows your cursor!

### With Multiplayer

Share duplicated objects with other users:

1. Add `SyncedRoom` component to your scene
2. The Duplicatable component automatically adds networking
3. When users click and create objects, everyone sees them

## Settings

| Setting | What it does |
| --- | --- |
| **Object** | The object to duplicate (leave empty to duplicate this object) |
| **Parent** | Where duplicates are parented (leave empty to use this object's parent) |
| **Limit Count** | Max objects that can be created per 60 seconds (prevents spam) |

## How It Works

When you add Duplicatable to an object:

1. The component creates a hidden template copy
2. When you click and drag, a new instance spawns from the template
3. The new object follows your cursor as you drag
4. If networking is enabled, the object syncs to other users
5. The template stays hidden and ready for the next duplication

## Examples

### Furniture Spawner

Create a palette of furniture users can place:

1. Create furniture objects (chair, table, lamp)
2. Add `Duplicatable` to each one
3. Arrange them in a palette/toolbar area
4. Set **Limit Count** to `10` to prevent spam
5. Users click and drag to create and place furniture

### Building Blocks

Let users build with blocks:

1. Create a block object
2. Add `Duplicatable` component
3. Add `DragControls` (automatically configured)
4. Set drag mode to snap to grid
5. Users click and drag to create blocks and build structures

### Inventory System

Spawn items from an inventory:

1. Create item templates (tools, equipment, etc.)
2. Add `Duplicatable` to each
3. Set **Parent** to a "world items" container
4. Display items in UI or palette
5. Click items to spawn them into the scene

### Collaborative Object Spawning

Multiple users adding objects together:

1. Add `SyncedRoom` component
2. Create object templates with `Duplicatable`
3. Each template automatically gets `SyncedTransform`
4. Users spawn and place objects collaboratively
5. Everyone sees the same scene in real-time

## Scripting

### Duplicate Programmatically

Trigger duplication from code without user click:

```ts
import { Behaviour, Duplicatable, GameObject } from "@needle-tools/engine";

export class ObjectSpawner extends Behaviour {

    start() {
        const duplicatable = this.gameObject.getComponent(Duplicatable);

        if (duplicatable && duplicatable["handleDuplication"]) {
            // Spawn a copy
            const newObject = duplicatable["handleDuplication"]();

            if (newObject) {
                console.log("Spawned:", newObject.name);

                // Customize the spawned object
                newObject.position.set(0, 1, 0);
            }
        }
    }
}
```

:::warning Private Method
The `handleDuplication` method is private. The recommended way is to let users click the object naturally. Use this approach only for advanced cases.
:::

### Custom Duplication Logic

Create your own duplication system:

```ts
import { Behaviour, GameObject, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

export class CustomDuplicator extends Behaviour {

    @serializable(Object3D)
    template?: Object3D;

    onPointerClick() {
        if (!this.template) return;

        // Clone the template
        const clone = GameObject.instantiateSynced(this.template, {
            parent: this.gameObject,
            position: this.worldPosition,
        });

        if (clone) {
            console.log("Created custom duplicate:", clone.name);
        }
    }
}
```

### Check Duplicate Count

Monitor how many objects have been created:

```ts
import { Behaviour, Duplicatable } from "@needle-tools/engine";

export class DuplicateMonitor extends Behaviour {

    update() {
        const duplicatable = this.gameObject.getComponent(Duplicatable);

        if (duplicatable) {
            // Access internal counter (private, for debugging)
            const count = duplicatable["_currentCount"];
            const limit = duplicatable.limitCount;

            console.log(`Created: ${count}/${limit}`);
        }
    }
}
```

### Customize Spawned Objects

Modify objects right after they're created:

```ts
import { Behaviour, Duplicatable } from "@needle-tools/engine";

export class CustomizeSpawned extends Behaviour {

    private duplicatable?: Duplicatable;

    awake() {
        this.duplicatable = this.gameObject.getComponent(Duplicatable);
    }

    update() {
        // Watch for DragControls being created on new objects
        // This happens right after duplication
        // You can then customize the newly spawned object
    }
}
```

## Advanced Features

### Automatic DragControls

When Duplicatable creates an object:
- Automatically adds `DragControls` if not present
- Sets drag mode to `SnapToSurfaces` by default
- User can immediately drag the new object
- No additional setup needed

### Automatic Networking

When `SyncedRoom` is present:
- Uses `GameObject.instantiateSynced()` automatically
- Adds `SyncedTransform` to spawned objects
- All users see duplicated objects
- Position and rotation sync in real-time

### Rate Limiting

Prevents users from creating too many objects:
- **Limit Count** controls max objects per minute
- Counter decrements by 1 every second
- When limit is reached, clicks are ignored
- Warning logged to console
- Automatically resets over time

### Template System

The object to duplicate becomes a hidden template:
- Original object is hidden (`visible = false`)
- Template preserves initial position and rotation
- Each click spawns from the template
- Template never appears in the scene

## Common Questions

**What happens to the original object?**
The original becomes a hidden template. The first duplicate you see is actually a copy, not the original.

**Can I duplicate objects without DragControls?**
The component expects DragControls and adds it automatically. If you don't want dragging, disable DragControls on the spawned object via script.

**How do I change what object gets duplicated?**
Set the **Object** field to a different object. If left empty, the object with the Duplicatable component is used.

**Can I duplicate objects with animations or scripts?**
Yes! The entire hierarchy and all components are copied. Scripts, animations, materials - everything is duplicated.

**What's the difference between Duplicatable and instantiate?**
Duplicatable is for user interaction (clicking to spawn). `GameObject.instantiate()` is for programmatic spawning in code.

**How do I increase the spawn limit?**
Change **Limit Count** to a higher number. Default is 60 objects per minute. Set to 0 for unlimited (not recommended).

**Does it work with physics?**
Yes! Duplicated objects keep their Rigidbody components and physics properties.

## Common Issues

**Objects spawn at wrong position:**
Make sure the template object starts at the correct position. The Duplicatable stores the initial position when the scene loads.

**Can't create any objects:**
Check if you've hit the **Limit Count**. Wait a few seconds and try again, or increase the limit.

**Objects don't appear for other users:**
Ensure you have `SyncedRoom` in your scene for networking to work.

**Duplicated object is missing components:**
Check if components are being destroyed in `start()` or `awake()`. Some components remove themselves on instantiation.

## More Information

**Live Example:**
- [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox/) - Multi-user building with duplication and dragging

**API Documentation:**
- [Duplicatable API](https://engine.needle.tools/docs/api/Duplicatable) - Complete technical reference

**Related Components:**
- [DragControls](/docs/how-to-guides/components/drag-controls) - Drag and move objects
- [Deletable](/docs/reference/components#deletable) - Delete spawned objects
- [SyncedTransform](/docs/reference/components#syncedtransform) - Network synchronization
