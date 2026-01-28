---
lang: en-US
title: Getting Started & Installation
description: Install Needle Engine and create your first interactive 3D web experience with Unity, Blender, or JavaScript in minutes.
next: ../project-structure.md
---

<br/>

<discountbanner />

# Getting Started with Needle Engine

**Build fully interactive 3D websites using your favorite tools.** Needle Engine works with professional 3D editors and modern web frameworks, giving you the power to create rich web experiences that deploy anywhere.

## What You'll Get

With Needle Engine, you get:
- 🎨 **Visual authoring** in Unity or Blender
- 🚀 **Automatic optimization** with state-of-the-art compression (up to 100x smaller files)
- 📱 **Cross-platform** support (desktop, mobile, VR, AR)
- ⚡ **Hot reload** for instant feedback during development
- 🌐 **Deploy anywhere** on the web with a single command

---

## Choose Your Workflow

Pick the tool that matches your skills and project needs:

<tool-tiles></tool-tiles>

### Which Tool Is Right for You?

**<logo-header logo="/imgs/unity-logo.webp" alt="Unity">Unity Integration</logo-header>**
- 💼 Professional game development workflows
- 🎮 Extensive asset ecosystem
- 📜 C# scripting support
- 🔧 Advanced editor features
- [Learn more about Unity Integration](../unity/)

**<logo-header logo="/blender/logo.png" alt="Blender">Blender Add-on</logo-header>**
- 🆓 Free and open-source
- 🎨 Powerful modeling and animation tools
- 🐍 Python scripting
- 💪 Industry-standard workflows
- [Learn more about Blender Integration](../blender/)

**<logo-header logo="/imgs/threejs-logo.webp" alt="three.js">Vanilla JavaScript</logo-header>**
- 💻 No 3D editor needed
- 🌐 Pure web development
- 📦 Use with any framework (React, Vue, Svelte, etc.)
- ✨ Full three.js compatibility
- [Learn more about three.js Integration](../three/)

---

## Install a Code Editor

**Visual Studio Code is recommended** for creating and editing JavaScript, TypeScript, HTML, and CSS files. It's a free, open-source editor that works on all platforms and integrates seamlessly with Needle Engine.

<ClientOnly>

<os-link windows_url="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" osx_url="https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal">Download Visual Studio Code</os-link>

</ClientOnly>

**Why VS Code?**
- Built-in TypeScript support
- Excellent debugging tools
- Rich extension ecosystem
- Live Server support for local development
- Git integration

---

## Required Tools

:::tip Automatic Installation with Unity or Blender
When using the Unity or Blender integration, we'll guide you through installing these tools automatically. You don't need to install them manually.
:::

The following tools are used by Needle Engine to create, preview, and build your web app:

<ClientOnly>

### Node.js (Required)

<os-link windows_url="https://fwd.needle.tools/needle-engine/nodejs/win" osx_url="https://fwd.needle.tools/needle-engine/nodejs/osx">Download Node.js 20 LTS or 22 LTS</os-link>

**What it does:**
- Manages your web project dependencies
- Runs a local development server with hot reload
- Builds and optimizes your project for production
- Handles deployment to hosting platforms

### KTX Software (Recommended)

<os-link windows_url="https://fwd.needle.tools/needle-engine/toktx/win" osx_url="https://fwd.needle.tools/needle-engine/toktx/osx" osx_silicon_url="https://fwd.needle.tools/needle-engine/toktx/osx-silicon">Download toktx texture tools</os-link>

**What it does:**
- Compresses textures for optimal web performance
- Reduces file sizes dramatically without quality loss
- Creates GPU-compressed formats (KTX2)
- Required for production builds

[Learn more about production builds](../deployment#production-builds)

</ClientOnly>

---

## Quick Start Paths

Choose your path based on your preferred tool and workflow:

### Path 1: Start with Unity

**Best for:** Game developers, Unity users, teams with existing Unity projects

<logo-header logo="/imgs/unity-logo.webp" alt="Unity"><a href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started">Download Needle Engine for Unity</a></logo-header>

**What you'll learn:**
- Install Needle Engine in Unity
- Create your first interactive 3D scene
- Export and preview in the browser
- Add interactivity with components

**👉 [Start Unity Tutorial →](/docs/unity/)**

**Supported Unity versions:** 2020.3.16+, 2021.3.9+, 2022.3.0+

---

### Path 2: Start with Blender

**Best for:** 3D artists, Blender users, open-source enthusiasts

<logo-header logo="/blender/logo.png" alt="Blender"><a href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started">Download Needle Engine for Blender</a></logo-header>

**What you'll learn:**
- Install the Blender add-on
- Set up your first web project
- Export scenes to the web
- Add Needle components

**👉 [Start Blender Tutorial →](/docs/blender/)**

**Supported Blender versions:** 4.1+

---

### Path 3: Start with Web Code

**Best for:** Web developers, three.js users, integration into existing sites

**Quick options:**

**CDN (Fastest):**
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="your-scene.glb"></needle-engine>
```

**NPM (Production):**
```bash
npm install @needle-tools/engine
```

**👉 [Start three.js Tutorial →](/docs/three/)**

---

## Your First Project

Ready to build something? Follow one of our step-by-step tutorials:

### 🎓 For Unity Users
**[Your First Unity Project →](/docs/unity/)** - Create an interactive 3D scene in Unity and export it to the web in minutes.

### 🎓 For Blender Users
**[Your First Blender Project →](/docs/blender/)** - Build a web-ready 3D experience using the Blender add-on.

### 🎓 For Web Developers
**[Your First Web Project →](/docs/three/)** - Integrate Needle Engine into your existing web project with JavaScript.

### 🚀 Beyond the Basics

After completing your first project, explore these tutorials:

- **[TypeScript Essentials](/docs/tutorials/fundamentals/typescript-essentials)** - Learn TypeScript for custom components
- **[Create Custom Components](/docs/how-to-guides/scripting/create-components)** - Add interactivity with code
- **[Deploy Your Project](/docs/how-to-guides/deployment/)** - Publish your 3D experience to the web

---

## Next Steps

### 📚 Learn by Doing (Tutorials)

New to Needle Engine? Start with these learning-oriented guides:

- **[TypeScript Essentials](/docs/tutorials/fundamentals/typescript-essentials)** - Learn TypeScript basics for web development
- **[Needle Engine for Unity Developers](/docs/tutorials/fundamentals/for-unity-developers)** - Key differences from traditional Unity
- **[Your First Interactive Scene](/docs/unity/)** - Build something real (Unity)
- **[Your First Interactive Scene](/docs/blender/)** - Build something real (Blender)

### 🛠️ Solve Specific Problems (How-To Guides)

Know what you want to build? Jump straight to task-oriented guides:

- **[Export 3D Content](/docs/how-to-guides/export/)** - Get your models and assets web-ready
- **[Create Custom Components](/docs/how-to-guides/scripting/create-components)** - Add interactivity with code
- **[Deploy Your Project](/docs/how-to-guides/deployment/)** - Publish to hosting platforms
- **[Enable WebXR](/docs/how-to-guides/xr/)** - Build VR and AR experiences
- **[Add Multiplayer](/docs/how-to-guides/networking/)** - Create networked experiences

### 💡 Understand the Concepts (Explanation)

Want to understand how Needle Engine works under the hood?

- **[Project Structure](/docs/explanation/core-concepts/project-structure)** - Editor vs web project architecture
- **[Technical Architecture](/docs/explanation/architecture/technical-overview)** - How glTF extensions work
- **[Component System](/docs/explanation/core-concepts/component-system)** - Component lifecycle and design

### 📖 Look Things Up (Reference)

Need to find specific information quickly?

- **[Component Catalog](/docs/reference/components)** - All 100+ built-in components
- **[API Documentation](https://engine.needle.tools/docs/api/)** - Complete TypeScript API
- **[Features Overview](/docs/explanation/core-concepts/features-overview)** - Platform compatibility matrix
- **[FAQ](/docs/reference/faq)** - Common questions and troubleshooting

### 🎨 Get Inspired

- **[Samples & Showcase](https://samples.needle.tools)** - Explore interactive samples and see what others have built

### 💬 Get Help

- **[Discord](https://discord.needle.tools)** - Join our community for live support
- **[Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)** - Ask questions and share projects
- **[FAQ](/docs/reference/faq)** - Common issues and solutions

---

:::tip Need Help?
If you run into issues during setup, check out our [FAQ](../reference/faq) or join our [Discord community](https://discord.needle.tools) where we're happy to help!
:::
