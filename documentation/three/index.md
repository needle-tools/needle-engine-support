---
title: Using Needle Engine with three.js
---

<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="three.js Logo" alt="three.js Logo"/>
</div>

# Needle Engine is three.js

**Welcome!** If you're here because you know three.js, you're in the right place. Needle Engine is a **web-based 3D engine built on top of three.js** that makes it easier and faster to create interactive 3D experiences for the web.

## What is Needle Engine?

Think of Needle Engine as **three.js with superpowers**:
- All the power of three.js (since it's built on it)
- Plus a component system for better code organization
- Plus built-in features like physics, XR, networking, and particles
- Plus visual editing tools (Unity and Blender integrations)
- Plus automatic optimization and compression

**All three.js APIs remain fully accessible** – you can write vanilla three.js code, use any three.js-compatible library, or mix and match as needed.

:::tip Try It in 30 Seconds
Want to see what Needle Engine can do? Create a new project instantly:

🚀 **[engine.needle.tools/new](https://engine.needle.tools/new)** - Opens a ready-to-go project in StackBlitz

No installation, no setup. Just click and start experimenting with three.js + Needle Engine in your browser!
:::

## Why Choose Needle Engine Over Vanilla three.js?

**Enhanced Developer Experience:**
- 🧩 **Component system** for organizing and reusing 3D logic
- ⚡ **Built-in features** like physics, XR, networking, particles, and UI
- 🎨 **Editor integrations** with Unity and Blender for visual scene creation
- 🚀 **Optimized build pipeline** with automatic 3D asset compression and optimization
- 💨 **Faster development** with less boilerplate and better tooling

**Full Flexibility:**
Whether you're building a simple scene with pure three.js or a complex application with Needle's components, you have complete freedom. The component system is an enhancement, not a replacement – use what makes sense for your project.

:::tip Want Visual Editing?
Check out our editor integrations for powerful visual creation workflows:
- <logo-header logo="/imgs/unity-logo.webp" alt="Unity"><a href="../unity/">Unity Integration</a></logo-header> – Full-featured 3D editor with C# scripting support
- <logo-header logo="/blender/logo.png" alt="Blender"><a href="../blender/">Blender Integration</a></logo-header> – Open-source 3D creation suite with Python scripting
:::

:::tip Inspect and Debug
Use the [Needle Inspector](./needle-devtools-for-threejs-chrome-extension.md) Chrome extension to inspect, debug, and edit any three.js scene directly in your browser – perfect for development and learning.
:::

[[toc]]

---

## Quick Start: Web Component

The easiest way to get started is using the `<needle-engine>` web component. Display rich, interactive 3D scenes directly in HTML with just a few lines of code.

### Basic Example

<codewrap>

```html
<!-- Import the component -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>

<!-- Use it like any other HTML element -->
<needle-engine
    src="https://cloud.needle.tools/-/assets/Z23hmXBZ21QnG-Z21QnG-world/file"
    background-color="transparent">
</needle-engine>
```

</codewrap>

<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%;
    aspect-ratio: 16/9;
    outline: none;
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>

[Open this example on StackBlitz](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html) • [View all web component attributes](../reference/needle-engine-attributes.md)

---

## Extending with Vanilla three.js

The web component works seamlessly with vanilla three.js code. Use Needle Engine's lifecycle hooks to access the scene and add your own three.js objects, modify materials, or write custom logic.

### Adding Objects with onStart

```html
<!-- Import Needle Engine -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>

<!-- Add the web component -->
<needle-engine src="your-scene.glb"></needle-engine>

<!-- Extend with vanilla three.js -->
<script type="module">
  import { onStart } from 'https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js';
  import * as THREE from 'three';

  onStart(context => {
    // Access the three.js scene
    console.log("Scene loaded:", context.scene);

    // Add objects using vanilla three.js
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0.5, 0);

    context.scene.add(cube);
  });
</script>
```

### Animating Objects with onUpdate

```typescript
import { onStart, onUpdate } from '@needle-tools/engine';
import * as THREE from 'three';

let rotatingCube;

onStart(context => {
  // Create a rotating cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  rotatingCube = new THREE.Mesh(geometry, material);
  context.scene.add(rotatingCube);
});

onUpdate(context => {
  // Rotate every frame using deltaTime
  if (rotatingCube) {
    rotatingCube.rotation.y += context.time.deltaTime;
  }
});
```

### Modifying Loaded Scene Objects

```typescript
import { onStart } from '@needle-tools/engine';

onStart(context => {
  // Find and modify objects from your loaded glb
  const myObject = context.scene.getObjectByName("MyObjectName");
  if (myObject) {
    myObject.position.y = 2;
    myObject.scale.setScalar(1.5);
  }

  // Or traverse the entire scene
  context.scene.traverse(obj => {
    if (obj.isMesh && obj.material) {
      // Modify all materials in the scene
      obj.material.metalness = 0.5;
      obj.material.roughness = 0.3;
    }
  });
});
```

### Available Lifecycle Hooks

| Hook | When it's called |
| --- | --- |
| `onInitialized(callback)` | When the context is initialized (before first frame) |
| `onStart(callback)` | At the beginning of the first frame after scene loads |
| `onUpdate(callback)` | Every frame (perfect for animations) |
| `onBeforeRender(callback)` | Before the scene renders |
| `onAfterRender(callback)` | After the scene renders |

**Context Object Properties:**

All hooks provide the `context` object with access to:
- `context.scene` - The three.js Scene
- `context.camera` - The active Camera
- `context.renderer` - The WebGLRenderer
- `context.time` - Time data (deltaTime, frame count, etc.)
- And much more...

:::tip Learn More About Scripting
- [Scripting Documentation](../scripting.md#hooks) - Detailed information about lifecycle hooks
- [Scripting Examples](../scripting-examples.md) - More code samples and patterns
- [Custom Components](../scripting.md#component-architecture) - Build reusable components
:::

---

## Installation Options

### Install from CDN

Use Needle Engine directly with vanilla JavaScript – no bundler required. The prebundled version includes core components, physics, particles, networking, XR, and more.

<codewrap>

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js">
</script>
```

</codewrap>

**When to use:**
- Quick prototypes and experiments
- Simple integrations into existing websites
- Learning and exploring Needle Engine
- Projects without a build pipeline

### Install from NPM

For projects using modern JavaScript tooling and bundlers:

```bash
npm install @needle-tools/engine
```

**When to use:**
- Production applications
- Projects using bundlers (Vite, Webpack, etc.)
- TypeScript projects
- When you need tree-shaking and optimal bundle size

**Example usage:**

```typescript
import { NeedleEngine } from '@needle-tools/engine';
import * as THREE from 'three';

// Your code here
```

---

## Development Setup

### Rapid Prototyping on StackBlitz

For quick experiments, create a new project instantly:

🚀 **[engine.needle.tools/new](https://engine.needle.tools/new)** - Start a new project in seconds

📚 **[StackBlitz Collection](https://stackblitz.com/@marwie/collections/needle-engine)** - Browse example projects

**Perfect for:**
- Learning and experimentation
- Sharing code snippets
- Quick proof-of-concepts
- Testing ideas without local setup

### Local Development with VS Code

For more control and offline development:

**Setup:**

1. Open your project folder in Visual Studio Code
2. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
3. Click **Go Live** in the VSCode footer
4. Open `http://localhost:5500` in your browser (usually opens automatically)

**Benefits:**
- Full control over your development environment
- Works offline
- Better performance for large projects
- Easier integration with version control

:::tip Sample glTF Files
Need a test scene? [Download this sample glb](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb) to get started quickly.
:::

---

## Complete HTML Example

Here's a minimal but complete example showing how to use Needle Engine with vanilla HTML:

@[code](@code/basic-html.html)

[View on GitHub](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla) • [View on StackBlitz](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)

---

## three.js Compatibility

Needle Engine uses a fork of [three.js](https://threejs.org/) that includes additional features and improvements, especially for:
- **WebXR** - Enhanced XR session management and features
- **Animation** - Improved animation playback and blending
- **USDZ Export** - Better support for iOS AR

**Full Compatibility:**
All standard three.js functionality is available in Needle Engine. You can:
- Use any three.js-compatible library
- Follow three.js tutorials and examples
- Import existing three.js code
- Mix vanilla three.js with Needle components

---

## Next Steps

**Learn More:**
- [Web Component Attributes](../reference/needle-engine-attributes.md) - Configure the `<needle-engine>` component
- [Scripting Guide](../scripting.md) - Create custom scripts and components
- [Scripting Examples](../scripting-examples.md) - Code samples and patterns
- [Needle DevTools](./needle-devtools-for-threejs-chrome-extension.md) - Debug and inspect scenes

**Build Bigger:**
- <logo-header logo="/imgs/unity-logo.webp" alt="Unity"><a href="../unity/">Unity Integration</a></logo-header> - Visual editing with full-featured 3D editor
- <logo-header logo="/blender/logo.png" alt="Blender"><a href="../blender/">Blender Integration</a></logo-header> - Open-source 3D creation workflow
- [Features Overview](../features-overview.md) - See what's possible with Needle Engine

**Get Help:**
- [Forum](https://forum.needle.tools) - Ask questions and share projects
- [Discord](https://discord.needle.tools) - Join the community
- [Examples](https://engine.needle.tools/samples) - Browse sample projects

---

:::tip Using Editor Integrations
Did you know that Needle Engine seamlessly integrates with Blender and Unity? Create complex 3D scenes visually and export them directly to the web. Perfect for large projects and team collaboration.

<logo-header logo="/imgs/unity-logo.webp" alt="Unity"><a href="../unity/">Learn about Unity Integration</a></logo-header> • <logo-header logo="/blender/logo.png" alt="Blender"><a href="../blender/">Learn about Blender Integration</a></logo-header>
:::
