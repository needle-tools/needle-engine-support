---
lang: en-US
title: Getting Started & Installation
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

[Learn more about production builds](../deployment.md#production-builds)

</ClientOnly>

---

## Quick Start Paths

### Path 1: Start with Unity

**Best for:** Game developers, Unity users, teams with existing Unity projects

1. <logo-header logo="/imgs/unity-logo.webp" alt="Unity"><a href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started">Download Needle Engine for Unity</a></logo-header>
2. Drop the `.unitypackage` into your Unity project
3. Wait for installation to complete
4. Explore samples: **Needle Engine → Explore Samples**
5. Start building!

[Full Unity Getting Started Guide →](../unity/)

**Supported Unity versions:** 2020.3.16+, 2021.3.9+, 2022.3.0+

### Path 2: Start with Blender

**Best for:** 3D artists, Blender users, open-source enthusiasts

1. <logo-header logo="/blender/logo.png" alt="Blender"><a href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started">Download Needle Engine for Blender</a></logo-header>
2. Open Blender and go to **File → Settings → Add-ons**
3. Click **Install** and select the downloaded zip
4. Enable the "Needle Engine" add-on
5. Start creating!

[Full Blender Getting Started Guide →](../blender/)

**Supported Blender versions:** 4.1+

### Path 3: Start with Web Code

**Best for:** Web developers, three.js users, integration into existing sites

**CDN (Fastest):**
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="your-scene.glb"></needle-engine>
```

**NPM (Production):**
```bash
npm install @needle-tools/engine
```

[Full three.js/Web Integration Guide →](../three/)

---

## Your First Project

Once you've installed Needle Engine, here's what to do next:

### With Unity or Blender:

1. **Create a new scene** with some 3D objects
2. **Add the ExportInfo component** to configure your web project
3. **Press Play** (Unity) or **Export** (Blender)
4. **Watch the magic happen** – your scene opens in the browser!
5. **Make changes** and see them update live in the browser

### With Vanilla JavaScript:

1. **Create an HTML file** with the `<needle-engine>` web component
2. **Load a glTF/GLB file** or create objects with three.js
3. **Open with a local server** (like VS Code's Live Server)
4. **Add interactivity** with JavaScript

---

## Next Steps

**Learn the Basics:**
- [Getting Started: Unity](../unity/) – Unity-specific workflows
- [Getting Started: Blender](../blender/) – Blender-specific workflows
- [Getting Started: three.js](../three/) – Web-first development
- [Project Structure](../project-structure.md) – Understanding your web project
- [TypeScript Essentials](./typescript-essentials.md) – Learn TypeScript basics

**Core Concepts:**
- [Exporting 3D Content](../export.md) – How assets become web-ready
- [Component System](../scripting.md) – Build reusable functionality
- [Deployment](../deployment.md) – Publish your project to the web

**Go Further:**
- [Features Overview](../features-overview.md) – See what's possible
- [XR Documentation](../xr.md) – Build VR and AR experiences
- [Networking](../networking.md) – Create multiplayer experiences
- [Live Examples](https://engine.needle.tools/samples) – Explore sample projects

**For Unity Developers:**
- [Needle Engine for Unity Developers](./for-unity-developers.md) – Key differences from traditional Unity

**Get Help:**
- [FAQ](../faq.md) – Common questions and troubleshooting
- [Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) – Ask questions and share projects
- [Discord](https://discord.needle.tools) – Join our community

---

:::tip Need Help?
If you run into issues during setup, check out our [FAQ](../faq.md) or join our [Discord community](https://discord.needle.tools) where we're happy to help!
:::
