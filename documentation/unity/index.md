---
title: Needle Engine for Unity
description: Create interactive 3D web experiences with Unity. Export scenes to optimized glTF, write TypeScript components with C# stubs, and deploy anywhere on the web.
editLink: true
---

# <logo-header logo="/imgs/unity-logo.webp" alt="Unity">Needle Engine for Unity</logo-header>

Create **highly interactive, flexible, and lightweight web applications** right inside Unity.

**What you can do:**
- Use Unity's powerful editor tools for 3D scenes, animation, and design
- Export scenes to optimized glTF format automatically
- Write TypeScript code that appears as C# components in Unity
- Integrate seamlessly with any web frontend framework
- Deploy anywhere on the web with hot reload support

---

## Install the Unity Package

<NoDownloadYet>
  <br/>
  <needle-button
    event_goal="download_unity"
    event_position="getting_started"
    large
    href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"
    same_tab
    next_url="/docs/unity/"
    >
    <strong>Download Needle Engine for Unity</strong>
  </needle-button>
</NoDownloadYet>

<!-- [Mirror](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)    -->

**Installation steps:**

1. **Drop the downloaded .unitypackage file** into a Unity project and confirm that you want to import it

2. **Wait a moment** for the installation and import to finish. A window may open stating that "A new scoped registry is now available in the Package Manager." This is our Needle Package registry. You can safely close that window

3. **Explore Samples**
   Select the menu option `Needle Engine > Explore Samples` to view, open and modify all available [sample scenes](https://engine.needle.tools/samples)

---

## Quick Start Video

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />

---

## Getting Started

Choose how you want to start your first project:

### 🎨 [Start from a Sample](./getting-started#start-from-a-sample-recommended) (Recommended)

Browse **100+ samples** online or install them in Unity via `Needle Engine > Explore Samples`.

**Perfect for:** Learning features, exploring capabilities, getting inspired

[Browse Samples →](https://engine.needle.tools/samples/)

---

### 🚀 [Start from a Scene Template](./getting-started#start-from-a-scene-template-fast)

Create a new scene from a Needle Engine template via `File > New Scene`.

**Perfect for:** Quick prototypes, starting fresh projects

---

### ⚙️ [Manual Setup](./getting-started#start-from-scratch-manual-setup)

Add a `Needle Engine` component to your scene and configure your web project manually.

**Perfect for:** Understanding the workflow, full control

---

**Ready to build?**

**[→ Complete Getting Started Tutorial](./getting-started)** - Step-by-step guide for your first project

---

## Key Features

### TypeScript Components with C# Stubs

Write TypeScript code in your web project that automatically appears as components in Unity:

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
  @serializable()
  speed: number = 5;

  update() {
    this.gameObject.position.x += this.speed * this.context.time.deltaTime;
  }
}
```

The component appears in Unity's Add Component menu with editable fields in the Inspector.

[Learn more: For Unity Developers →](../tutorials/fundamentals/for-unity-developers)

---

### Hot Reload & Editor Sync

Make changes in Unity or your code editor and see them instantly in the browser:

- **Scene changes** update automatically on save
- **TypeScript changes** hot-reload without page refresh
- **Material properties** sync live with EditorSync component

[Learn more: Editor Sync →](./editor-sync)

---

### NPM Integration

Share code across projects with **NPM Definitions (NpmDef)**:
- Create reusable component packages
- Version control your code
- Share across multiple Unity and web projects

[Learn more: Getting Started Tutorial →](./getting-started#option-2-npmdef-advanced)

---

## Learning Resources

### Tutorials (Learning-Oriented)
- **[Getting Started with Unity](./getting-started)** - Your first project step-by-step (~20 min)
- **[For Unity Developers](../tutorials/fundamentals/for-unity-developers)** - Complete learning path for Unity devs
- **[TypeScript Essentials](../tutorials/fundamentals/typescript-essentials)** - JavaScript/TypeScript basics (~20 min)

### How-To Guides (Problem-Oriented)
- **[Export Assets](../how-to-guides/export/)** - Control what gets exported
- **[Create Components](../how-to-guides/scripting/create-components)** - Write interactive components
- **[Deploy Your Project](../how-to-guides/deployment/)** - Publish to the web

### Explanation (Understanding-Oriented)
- **[Unity Integration Concepts](../tutorials/fundamentals/unity-integration)** - How Unity and Needle Engine work together
- **[Features Overview](../explanation/core-concepts/features-overview)** - Platform compatibility and features
- **[Technical Overview](../explanation/architecture/technical-overview)** - Architecture and design

### Reference (Information-Oriented)
- **[Component Reference](../reference/components)** - All built-in components
- **[API Documentation](https://engine.needle.tools/docs/api/)** - Complete TypeScript API
- **[FAQ](../reference/faq)** - Common questions and troubleshooting

---

## Troubleshooting

**Common issues:**

| Issue | Solution |
| --- | --- |
| Server won't start | [Install Node.js](../getting-started/#prerequisites) (18.x or newer) |
| Can't edit code | [Install VSCode](../getting-started/#code-editor-and-tools) |
| Components not showing | Restart Unity or click "Generate C# Components" |
| Hot reload not working | Check console, restart dev server |

[See full troubleshooting guide →](../reference/faq)

---

## Community & Support

- **[Discord](https://discord.needle.tools)** - Live community chat and support
- **[Forum](https://forum.needle.tools)** - In-depth discussions and examples
- **[Samples](https://engine.needle.tools/samples/)** - 100+ interactive examples
- **[Showcase](https://samples.needle.tools/#showcase)** - See what others have built
- **[GitHub](https://github.com/needle-tools/needle-engine-support)** - Report issues and contribute

---

## What's Next?

1. **Start building:** Follow the [Getting Started Tutorial](./getting-started)
2. **Learn the workflow:** Read [Unity Integration Concepts](../tutorials/fundamentals/unity-integration)
3. **Master scripting:** Complete [For Unity Developers](../tutorials/fundamentals/for-unity-developers) learning path
4. **Get inspired:** Browse [Samples](https://engine.needle.tools/samples/) and [Showcase](https://samples.needle.tools/#showcase)
