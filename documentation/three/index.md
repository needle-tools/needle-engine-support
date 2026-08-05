---
title: Using Needle Engine with three.js
---

# <logo-header logo="/imgs/threejs-logo.webp" alt="three.js">Needle Engine + three.js</logo-header>

**Welcome!** If you're here because you know three.js, you're in the right place. Needle Engine is a **web-based 3D engine built on top of three.js** that makes it easier and faster to create interactive 3D experiences for the web.

<discountbanner />

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

[Why Needle Engine exists](/docs/why) goes into this properly — the problem it solves, who it suits, and where plain three.js or React Three Fiber is the better answer.

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

## Scripting with three.js and Needle Engine

Think of the `<needle-engine>` web component as a three.js canvas with superpowers. You can reach the scene through lifecycle hooks and add your own three.js objects, or attach components to them.

The [Scripting Walkthrough](/docs/tutorials/scripting-walkthrough) covers all of it in short steps, each one running live next to the code that produces it:

- writing a component and attaching it to an object
- the lifecycle: `awake`, `onEnable`, `start`, `update`, `onDestroy`
- pointer input, physics, networking, AR and VR, audio, and gizmos

Every example there is a single HTML file that loads the engine from a CDN, so you can copy one into a file and open it — no project, no build step.

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
- When your GLB was already built and exported (e.g. from Unity or Blender, or hosted on Needle Cloud) and you just want to display it

### Install from NPM

For projects using modern JavaScript tooling and bundlers, use the [Vite template](https://github.com/needle-engine/vite-template) as a starting point:

```bash
npm create needle
```

This sets up a ready-to-go project with Vite, TypeScript, and Needle Engine preconfigured. With a bundler, bare specifiers like `'three'` and `'@needle-tools/engine'` are resolved automatically — no import map or CDN script tag needed (and you should avoid them to prevent duplicate module instances). Then add your code:

```typescript
import { onStart } from '@needle-tools/engine';
import * as THREE from 'three';

onStart(context => {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x00ff00 })
  );
  context.scene.add(cube);
});
```

```html
<needle-engine src="scene.glb"></needle-engine>
```

**When to use:**
- Production applications
- TypeScript projects
- When you need tree-shaking and optimal bundle size
- Teams and larger projects

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
- [Core Components](../reference/components.md) - 100+ built-in components for physics, XR, audio, UI, and more
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
