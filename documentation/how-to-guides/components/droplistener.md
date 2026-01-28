---
title: Drag and Drop Files into Your Scene
description: Allow users to drag and drop 3D models (glTF, GLB, FBX, OBJ, USDZ, VRM) directly into your web experience with the DropListener component. Works in Unity and Blender.
---

# Drag and Drop Files into Your Scene

Let users drag and drop 3D models directly into your web experience.

<video-embed src="/docs/videos/droplistener.mp4" autoplay muted />

:::tip Works with Unity and Blender
The DropListener component is available for both Unity and Blender integrations.
:::

## What You Can Do

- **Drag Files** - Users drag glTF, GLB, FBX, OBJ, USDZ, or VRM files into the browser
- **Paste URLs** - Users paste links to 3D models
- **Auto-Place** - Dropped objects appear where users drop them
- **Auto-Scale** - Make all dropped objects fit a consistent size
- **Multiplayer** - Share dropped files with other connected users
- **Drop Zones** - Only allow drops in specific areas

## Quick Start

### Basic Setup

**In Unity or Blender:**
1. Add a `DropListener` component to an object in your scene
2. Export and open in browser
3. Drag a 3D model file into the browser window

The model appears in your scene!

### With Multiplayer

To share dropped files with other users:

1. Add a `SyncedRoom` component to your scene
2. Enable **Use Networking** on the DropListener
3. When someone drops a file, everyone sees it

## Settings

| Setting | What it does |
| --- | --- |
| **Drop Area** | Only accept drops on this specific mesh (leave empty for anywhere) |
| **Fit Into Volume** | Automatically resize dropped objects to fit a size |
| **Fit Volume Size** | The size to fit objects into (like `2×2×2`) |
| **Place At Hit Position** | Drop objects where the cursor hits, or at a fixed spot |
| **Use Networking** | Share dropped files with other users |

## Examples

### Product Viewer

Replace the current product when users drop a new model:

1. Add your initial product as a child of the DropListener object
2. When users drop a file, it replaces the current product
3. Enable **Fit Into Volume** so all products appear at the same size

Perfect for furniture configurators, product showcases, or avatar try-ons.

### Designated Drop Zone

Only allow drops on a specific surface (like a table or platform):

1. Create a mesh object (cube, plane, etc.)
2. Add the DropListener to a different object
3. Assign the mesh to **Drop Area**
4. Files only work when dropped on that mesh

:::tip Needs a Mesh
The Drop Area must have visible geometry for drag and drop detection to work.
:::

### Collaborative Scene Builder

Let multiple users add objects to a shared scene:

1. Add `SyncedRoom` to your scene
2. Enable **Use Networking** on DropListener
3. Disable **Fit Into Volume** if you want original sizes
4. Users can drag files and everyone sees them appear

## Scripting

### React to Drops

Run code when someone drops a file:

```ts
import { Behaviour, DropListener, DropListenerEvents } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    awake() {
        const dropListener = this.gameObject.getComponent(DropListener);

        // When a file is dropped
        dropListener.addEventListener(DropListenerEvents.FileDropped, (evt) => {
            const file = evt.detail as File;
            console.log("User dropped:", file.name);
        });

        // When an object is added to the scene
        dropListener.addEventListener(DropListenerEvents.ObjectAdded, (evt) => {
            const object = evt.detail.object;
            console.log("New object in scene:", object.name);

            // You can modify the object here
            // For example, add a glow effect or play a sound
        });
    }
}
```

### Load from Code

Load a model without user interaction:

```ts
import { Behaviour, DropListener } from "@needle-tools/engine";

export class ModelLoader extends Behaviour {

    async start() {
        const dropListener = this.gameObject.getComponent(DropListener);

        // Load from URL
        const url = "https://example.com/model.glb";
        const object = await dropListener.loadFromURL(url);

        if (object) {
            console.log("Loaded:", object.name);
        }
    }
}
```

## Special Features

### Smart URL Handling

DropListener automatically handles special URLs:

- **GitHub files** - Paste GitHub URLs and they're converted to raw content
- **Polyhaven models** - Paste Polyhaven asset pages and get the 3D model

### Placeholder Behavior

Child objects under the DropListener are treated as placeholders:
- They stay visible until the first drop
- They're automatically removed when a file is dropped
- Perfect for "Drop model here" preview objects

## Common Questions

**Can users drop multiple files?**
Currently one file at a time. If multiple files are dropped, only the first 3D model is loaded.

**What about images?**
Images are automatically ignored. The DropListener only accepts 3D model formats.

**How does multiplayer work?**
When enabled, dropped files are uploaded to Needle's server and the URL is shared with other users. They download and see the same object.

**Does it work offline?**
Yes for local file drops. URL pasting and multiplayer require internet connection.

## More Information

**Live Example:**
- [DropListener Sample](https://engine.needle.tools/samples/droplistener) - Try it yourself with multiplayer

**API Documentation:**
- [DropListener API](https://engine.needle.tools/docs/api/DropListener) - Complete technical reference

**Related Guides:**
- [Networking & Multiplayer](/docs/how-to-guides/networking/) - Set up multiplayer features
- [Loading Scenes](/docs/how-to-guides/scripting/index#loading-scenes) - Load content dynamically
