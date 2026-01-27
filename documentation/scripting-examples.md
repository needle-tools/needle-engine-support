---
title: Scripting Examples
description: A collection of useful script snippets and examples.
---

# Scripting Examples

**Code snippets and examples** for common tasks in Needle Engine.

:::tip New to Scripting?
Start with these guides first:
- [TypeScript Essentials](./getting-started/typescript-essentials.html) - Language basics
- [For Unity Developers](./getting-started/for-unity-developers.html) - Unity → Web guide
- [Scripting Reference](./scripting.html) - Complete API reference
- [Video: How to write custom components](https://youtu.be/uf5UK0bLHlY?si=82U_2L4n2V7XL7RJ)
:::

**More Examples:**
- [100+ Sample Scenes](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=scripting_examples) - Live interactive examples
- [Stackblitz Collection](https://stackblitz.com/@marwie/collections/needle-engine) - Edit in browser
- [API Documentation](https://engine.needle.tools/docs/api) - Complete reference

---

## 🎯 Getting Started

### Basic Component

Every component extends `Behaviour` and uses lifecycle methods like `start()` and `update()`.

<stackblitz file="@code/basic-component.ts"></stackblitz>
@[code ts twoslash](@code/basic-component.ts)

[See all lifecycle methods](./scripting.html#lifecycle-methods) • [Component Architecture](./scripting.html#component-architecture)

---

## 📦 References & Assets

### Reference an Object from Unity

Reference scene objects and access them at runtime.

@[code ts twoslash](@code/component-object-reference.ts)

**How it works:**
1. In Unity/Blender, you assign an object to the field in the Inspector
2. During export, the reference is saved in the glTF file with a unique identifier
3. At runtime, Needle Engine resolves the reference and assigns the actual three.js `Object3D` to your field
4. The reference is available in `awake()` or `start()` lifecycle methods

:::tip Type Safety
Use `@serializable(Object3D)` so TypeScript knows the type. Without it, you still get the reference, but as a plain object.
:::

[Understanding references](./getting-started/for-unity-developers.html#components) • [Serialization guide](./scripting.html#script-fields)

### Reference and Load a Prefab

Load prefabs or scene assets dynamically at runtime.

@[code ts twoslash](@code/component-prefab.ts)

**How it works:**
1. Assign a prefab or scene asset in Unity/Blender Inspector
2. The asset path is exported to the glTF
3. Use `AssetReference` to load the asset on demand
4. Call `instantiate()` to create instances in your scene
5. Assets are cached after first load for better performance

:::tip Lazy Loading
Prefabs are only loaded when you call `instantiate()`, not on scene load. This keeps initial load times fast!
:::

[AssetReference API](https://engine.needle.tools/docs/api/AssetReference) • [GameObject.instantiate](./scripting.html#finding-adding-and-removing-components)

### Reference and Load Scenes

Load and unload scenes dynamically for multi-scene projects.

@[code ts twoslash](@code/component-scene.ts)

**How it works:**
1. Reference Unity Scene assets or glTF files
2. Scenes are exported as separate glTF files
3. Use `SceneSwitcher` or load manually with `AssetReference`
4. Previous scene is unloaded automatically (or kept loaded if desired)
5. Perfect for level-based games or multi-room experiences

:::tip Live Example
Try the [multi-scene loading sample](https://engine.needle.tools/samples/multi-scenes-(dynamic-loading))
:::

[SceneSwitcher component](https://engine.needle.tools/docs/api/SceneSwitcher) • [Scene management guide](./component-reference.html#scene-management)

---

## 🖱️ Input & Interaction

### Receive Clicks on Objects

Make objects clickable by adding this script. Requires `ObjectRaycaster` component in parent hierarchy.

<stackblitz file="@code/component-click.ts"></stackblitz>
@[code ts twoslash](@code/component-click.ts)

[Input events reference](./scripting.html#input-event-methods) • [Interaction components](./component-reference.html#interaction)

### Networking Clicks (Multiplayer)

Sync clicks across all connected clients. The click event is sent to all users and can trigger animations, hide objects, etc.

@[code ts twoslash](@code/component-click-networking.ts)

:::tip Unity/Blender Integration
Assign functions to the `onClick` event in Unity/Blender to trigger animations or other actions!
:::

[Networking guide](./networking.html) • [SyncedRoom component](https://engine.needle.tools/docs/api/SyncedRoom)

---

## 🎬 Animation

### Play Animation on Click

Trigger animations when objects are clicked.

@[code ts twoslash](@code/component-animation-onclick.ts)

### Reference Animation Clips

Access animation clips for custom animation logic. You can also export arrays of clips.

@[code ts twoslash](@code/component-animationclip.ts)

[Animation components](./component-reference.html#animation) • [Animator API](https://engine.needle.tools/docs/api/Animator)

---

## 📢 Events & Serialization

### Create and Invoke Unity Events

Use `EventList` to create events that can be configured in Unity/Blender Editor.

@[code ts twoslash](@code/component-unityevent.ts)

:::tip Component-Level Events
`EventList` events can also be subscribed to at the component level:
```ts
myComponent.addEventListener("my-event", evt => {...});
```
This is an experimental feature. [Share feedback on our forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)
:::

### Custom Event Types

Expose custom events with specific arguments (e.g., strings, numbers) to Unity/Blender.

@[code ts twoslash](@code/component-customevent.ts)

**Unity Editor integration:**

![Custom event in Unity](https://user-images.githubusercontent.com/2693840/204370950-4c89b877-90d7-4e6f-8266-3352e6da16f4.png)

### Nested Objects & Serialization

Nest custom objects with automatic serialization using `@serializable` decorators.

**TypeScript:**
@[code ts twoslash](@code/component-nested-serialization.ts)

**C# (Unity/Blender):**
@[code](@code/component-nested-serialization-cs.cs)

:::tip Automatic Deserialization
Data without type decorators still works - you'll get plain objects. Add types as needed for strongly-typed access.
:::

[Type system guide](./getting-started/typescript-essentials.html#primitive-types) • [Serialization reference](./scripting.html#script-fields)

---

## 🌐 Web APIs & Browser Features

:::tip Full Web Platform Access
Needle Engine gives you access to **all web APIs** and **any npm package**. Use geolocation, notifications, media devices, and more!

[Browse npm packages](https://npmjs.org) • [Web APIs reference](https://developer.mozilla.org/en-US/docs/Web/API)
:::

### Geolocation - Display Current Location

Access the browser's Geolocation API to get the user's position.

@[code ts twoslash](@code/component-location.ts)

[Geolocation API docs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

### Display Current Time (with Coroutine)

Use coroutines for time-based updates without blocking the main thread.

@[code ts twoslash](@code/component-time.ts)

<video-embed src="./videos/component-time.mp4" limit_height />

[Coroutines guide](./scripting.html#coroutines)

---

## 🎨 Rendering & Visual Effects

### Change Custom Shader Properties

Modify shader properties at runtime (e.g., `_Speed` float value).

<!-- SAMPLE modify custom shader material property -->

[Shader samples](https://engine.needle.tools/samples/shaders/) • [Materials guide](https://threejs.org/docs/#api/en/materials/Material)

### Switching src Attribute

Dynamically change the scene being loaded.

[Live example on StackBlitz](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)

### Adding Custom Post-Processing Effects

Create custom post-processing effects using the [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing) library.

**Installation:**
```bash
npm i postprocessing
```

Add the effect to the same object as your `Volume` component. Example wrapping the [Outline effect](https://pmndrs.github.io/postprocessing/public/demo/#outline):

@[code](@code/custom-post-effect.ts)

[Post-processing components](./component-reference.html#postprocessing) • [Volume API](https://engine.needle.tools/docs/api/Volume)

### Custom ParticleSystem Behaviour

Extend the ParticleSystem with custom behavior.

@[code ts twoslash](@code/custom-particle-system-behaviour.ts)

[ParticleSystem API](https://engine.needle.tools/docs/api/ParticleSystem) • [Particles sample](https://engine.needle.tools/samples/particles)

---

## 🔊 Audio & Media

### Custom 2D Audio Component

Create a custom audio component (though `AudioSource` covers most use cases).

@[code ts twoslash](@code/component-2d-audio.ts)

[AudioSource component](https://engine.needle.tools/docs/api/AudioSource) • [Audio guide](./component-reference.html#audio)

---

## 📁 File Handling

### Load External Files

Use `FileReference` to load external files like JSON, images, or other assets.

@[code ts twoslash](@code/component-filereference.ts)

[DropListener component](https://engine.needle.tools/docs/api/DropListener) • [File API](https://developer.mozilla.org/en-US/docs/Web/API/File)

---

## <logo-header logo="/imgs/html-logo.webp" alt="HTML">HTML Integration</logo-header>

### Receiving HTML Button Clicks in Components

Bridge HTML UI and 3D components by listening to DOM events.

**How it works:**
1. Add a button or element in your HTML (`index.html`)
2. Query the element with `document.querySelector()`
3. Add event listener in your component's `onEnable()`
4. Remove listener in `onDisable()` to prevent memory leaks

**Example:**
```ts
import { Behaviour } from "@needle-tools/engine";

export class HtmlButtonHandler extends Behaviour {
    private button?: HTMLButtonElement;

    onEnable() {
        this.button = document.querySelector("#my-button") as HTMLButtonElement;
        this.button?.addEventListener("click", this.onButtonClick);
    }

    onDisable() {
        this.button?.removeEventListener("click", this.onButtonClick);
    }

    private onButtonClick = () => {
        console.log("HTML button clicked!");
        // Trigger 3D scene changes here
    };
}
```

[HTML DOM access](./scripting.html#threejs-and-the-html-dom) • [DOM Events](https://developer.mozilla.org/en-US/docs/Web/Events)

---

## 🔆 Environment & Lighting

### Disable Environment Light

Control scene lighting by disabling environment maps at runtime.

```ts
import { Behaviour } from "@needle-tools/engine";

export class DisableEnvironment extends Behaviour {
    start() {
        // Disable environment map
        this.context.scene.environment = null;

        // Or reduce intensity
        if (this.context.scene.environment) {
            this.context.scene.environmentIntensity = 0.5;
        }
    }
}
```

[three.js Scene.environment](https://threejs.org/docs/#api/en/scenes/Scene.environment) • [Lighting guide](https://threejs.org/manual/#en/lights)

---

## 🤖 Advanced Integrations

### MediaPipe Hand Tracking

Control your 3D scene with hand gestures using Google's MediaPipe library.

**Installation:**
```bash
npm i @mediapipe/hands @mediapipe/camera_utils
```

**Try it live:** [MediaPipe Hands Sample](https://engine.needle.tools/samples/mediapipe-hands/) (requires webcam)

**How it works:**
1. MediaPipe tracks hand landmarks from webcam feed
2. Hand positions are mapped to 3D world coordinates
3. Use landmarks to control objects, UI, or interactions
4. Runs in real-time with excellent performance

[MediaPipe Hands docs](https://google.github.io/mediapipe/solutions/hands.html) • [GitHub sample](https://github.com/needle-tools/needle-engine-samples)

---

## ⚛️ Physics Examples

### Change Color on Collision

Detect physics collisions and change material colors.

```ts
import { Behaviour, Collision } from "@needle-tools/engine";

export class ColorOnCollision extends Behaviour {
    onCollisionEnter(col: Collision) {
        const renderer = this.gameObject.getComponent(Renderer);
        if (renderer?.sharedMaterial) {
            renderer.sharedMaterial.color.setHex(0xff0000); // Red
        }
    }
}
```

[Physics events](./scripting.html#physics-event-methods) • [Collision API](https://engine.needle.tools/docs/api/Collision)

### Physics Trigger Relay

Invoke events when objects enter/exit trigger zones.

```ts
import { Behaviour, Collision, EventList, serializable } from "@needle-tools/engine";

export class PhysicsTriggerRelay extends Behaviour {
    @serializable(EventList)
    onEnter?: EventList;

    @serializable(EventList)
    onExit?: EventList;

    onTriggerEnter(col: Collision) {
        this.onEnter?.invoke();
    }

    onTriggerExit(col: Collision) {
        this.onExit?.invoke();
    }
}
```

[Trigger events](./scripting.html#physics-event-methods) • [EventList guide](#create-and-invoke-unity-events)

### Auto Reset Position

Reset object position when it leaves a trigger zone (e.g., respawn objects).

```ts
import { Behaviour, Collision, serializable } from "@needle-tools/engine";
import { Vector3 } from "three";

export class AutoReset extends Behaviour {
    private startPosition?: Vector3;

    awake() {
        this.startPosition = this.gameObject.position.clone();
    }

    onTriggerExit(col: Collision) {
        if (this.startPosition) {
            this.gameObject.position.copy(this.startPosition);
        }
    }
}
```

### Play Audio on Collision

Trigger sound effects on physics collisions.

```ts
import { Behaviour, Collision, AudioSource } from "@needle-tools/engine";

export class PlayAudioOnCollision extends Behaviour {
    private audio?: AudioSource;

    awake() {
        this.audio = this.gameObject.getComponent(AudioSource);
    }

    onCollisionEnter(col: Collision) {
        this.audio?.play();
    }
}
```

[AudioSource component](https://engine.needle.tools/docs/api/AudioSource) • [Audio guide](./component-reference.html#audio)

[Physics documentation](./component-reference.html#physics) • [Rapier physics engine](https://rapier.rs/)

---

## 🎲 Utility Scripts

### Set Random Color

Randomize object colors on start (useful for spawned objects, testing).

```ts
import { Behaviour, Renderer } from "@needle-tools/engine";
import { Color } from "three";

export class SetRandomColor extends Behaviour {
    start() {
        const renderer = this.gameObject.getComponent(Renderer);
        if (renderer?.sharedMaterial) {
            // Clone material to avoid affecting other objects
            renderer.sharedMaterial = renderer.sharedMaterial.clone();
            renderer.sharedMaterial.color = new Color(
                Math.random(),
                Math.random(),
                Math.random()
            );
        }
    }
}
```

:::tip Material Cloning
Always clone materials when modifying them to avoid affecting other objects using the same material!
:::

### Spawn Objects Over Time

Instantiate objects at intervals (e.g., enemy spawning, particle effects).

```ts
import { Behaviour, AssetReference, serializable } from "@needle-tools/engine";

export class TimedSpawn extends Behaviour {
    @serializable(AssetReference)
    prefab?: AssetReference;

    @serializable()
    interval: number = 1; // seconds

    @serializable()
    maxCount: number = 10;

    private spawnCount = 0;

    async start() {
        while (this.spawnCount < this.maxCount) {
            await new Promise(resolve => setTimeout(resolve, this.interval * 1000));

            if (this.prefab) {
                const instance = await this.prefab.instantiate();
                if (instance) {
                    instance.position.copy(this.gameObject.position);
                    this.spawnCount++;
                }
            }
        }
    }
}
```

[Prefab loading](#reference-and-load-a-prefab) • [Coroutines alternative](./scripting.html#coroutines)
