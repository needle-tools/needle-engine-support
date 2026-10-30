---
lang: en-US
title: Getting Started & Installation
description: Install Needle Engine and create your first interactive 3D web experience with Unity, Blender, or JavaScript in minutes.
next: ../project-structure.md
---

# Getting Started with Needle Engine

Choose a workflow below to install Needle Engine and create your first web project.

## Choose Your Workflow

<tool-tiles></tool-tiles>

Still deciding? Read the [Needle Engine overview](/docs/needle-engine) or [why it exists](/docs/why).

**Already have a website?** [Embed a Needle scene into it →](/docs/how-to-guides/deployment/embedding) — your own HTML, Webflow, WordPress, and more.

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

<os-link windows_url="https://fwd.needle.tools/needle-engine/nodejs/win" osx_url="https://fwd.needle.tools/needle-engine/nodejs/osx">Download Node.js 22 LTS or 24 LTS</os-link>

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

:::tip Need Help?
If you run into issues during setup, check out our [FAQ](../reference/faq) or join our [Discord community](https://discord.needle.tools) where we're happy to help!
:::
