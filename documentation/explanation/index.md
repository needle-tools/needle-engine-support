---
title: Explanation
description: Understand how Needle Engine works and why it's designed this way
---

<ask-ai />

# Explanation

Background knowledge and deeper understanding of how Needle Engine works. These articles explain the architecture, design decisions, and technical concepts behind the engine — useful when you want to understand *why* things work the way they do.

---

## Core Concepts

- [Why Needle Engine exists](/docs/why) - The problems it solves, who it's for, and how it relates to three.js, R3F and Unity WebGL
- [Vision & Philosophy](./core-concepts/vision) - Where we think the 3D web is going and our design principles
- [Project Structure](./core-concepts/project-structure) - Editor projects vs web projects
- [Component Compiler](./core-concepts/component-compiler) - TypeScript to C# generation
- [Exporting to glTF](./exporting-to-gltf) - How the export system works and what gets exported

---

## Features

- [Features Overview](./core-concepts/features-overview) - Complete feature set and capabilities
- [FastHDR Environment Lighting](./fasthdr) - Ultra-fast HDR lighting with zero CPU processing and minimal VRAM
- [Progressive Loading (gltf-progressive)](/docs/gltf-progressive/) - How progressive texture and mesh loading works under the hood
- [Texture Compression](/docs/how-to-guides/optimization/compress-textures) - KTX2, ETC1S, UASTC & WebP formats compared
- [Mesh Compression](/docs/how-to-guides/optimization/compress-meshes) - Draco & Meshopt compression formats

---

## Architecture

- [Technical Overview](./architecture/technical-overview) - System architecture, glTF pipeline, and three.js integration
- [Networking Architecture](./networking/architecture) - How multiplayer and networking works

---

## Distribution

How a build reaches an audience, and the outside systems it has to satisfy.

- [How Playable Ads Work](/docs/explanation/playable-ads) - Ad networks, mediation, MRAID, platform SDKs, measurement, A/B testing, and packaging policies

---

::: tip Looking for something else?
- [**Tutorials**](/docs/tutorials/) — Step-by-step lessons to learn Needle Engine by building projects
- [**How-To Guides**](/docs/how-to-guides/) — Practical solutions for specific tasks like networking, XR, and deployment
- [**Reference**](/docs/reference/) — API docs, component catalog, configuration, changelogs
:::
