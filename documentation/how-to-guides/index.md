---
title: How-To Guides
description: Task-oriented guides for solving specific problems with Needle Engine
---

# How-To Guides

Task-oriented guides for solving specific problems. Each guide focuses on one topic and assumes you already have a project set up. If you're new, start with [Tutorials](/docs/tutorials/) instead.

:::tip Don't have a project yet?
Head to [Getting Started](/docs/getting-started/) to install Needle Engine for [Unity](/docs/unity/), [Blender](/docs/blender/), or [three.js / Web](/docs/three/).
:::

---

## Built-in Components

- [Camera Controls (OrbitControls)](./components/orbit-controls) - Navigate 3D scenes
- [Drag Objects (DragControls)](./components/drag-controls) - Drag with mouse, touch, or VR
- [Scene Switcher](./components/scene-switcher) - Load and switch glTF content
- [UI Text](./components/ui-text) - Spatial text with custom fonts
- [Video Player](./components/video-player) - Play videos in 3D
- [Scroll Follow](./components/scroll-follow) - Scroll-based animations
- [Duplicatable](./components/duplicatable) - Spawn object copies
- [Contact Shadows](./components/contact-shadows) - Realistic ground shadows
- [Cursor Follow](./components/cursor-follow) - Track mouse/touch position
- [Drop Listener](./components/droplistener) - Drag and drop files

---

## <logo-header logo="/imgs/webxr-logo.webp" alt="WebXR">XR (AR & VR)</logo-header>

- [WebXR Overview](/docs/how-to-guides/xr/) - AR and VR development guide
- [VR Performance Optimization](/docs/how-to-guides/xr/vr-performance) - Profiling, bottlenecks, Quest tips
- [iOS WebXR Support](/docs/how-to-guides/xr/ios-webxr-app-clip) - Native iOS WebXR via App Clips
- [Image Tracking](/docs/how-to-guides/xr/image-tracking) - AR image tracking
- [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) - Cross-platform interactions (iOS QuickLook)

---

## Scripting & Interaction

- [Create Components](/docs/how-to-guides/scripting/create-components) - Write custom TypeScript components
- [Use Lifecycle Hooks](/docs/how-to-guides/scripting/use-lifecycle-hooks) - awake, start, update, and more
- [Use Coroutines](/docs/how-to-guides/scripting/use-coroutines) - Time-based sequences and delays
- [Handle User Input](/docs/how-to-guides/scripting/handle-input) - Mouse, touch, keyboard, VR controllers
- [Perform Raycasting](/docs/how-to-guides/scripting/perform-raycasting) - Detect objects and hit points
- [Use Physics](/docs/how-to-guides/scripting/use-physics) - Rigidbodies, forces, collisions, triggers — powered by [Rapier](https://rapier.rs/)
- [Load 3D Web Assets at Runtime](/docs/how-to-guides/scripting/load-3d-web-assets-at-runtime) - Load GLBs from Needle Cloud, S3, or any HTTPS URL using `loadAsset`, `AssetReference`, `SceneSwitcher`, or `<needle-engine src>`
- [Accessibility](/docs/how-to-guides/accessibility) - Make 3D scenes accessible to screen readers and assistive technology
- [Detect Mobile Devices](/docs/how-to-guides/scripting/detect-mobile-devices) - Platform detection
- [Image Tracking Scripting](/docs/how-to-guides/scripting/image-tracking) - Access tracked images and objects from code

---

## Networking & Multiplayer

- [Networking Overview](/docs/how-to-guides/networking/) - Multiplayer guide
- [Set Up Networking](/docs/how-to-guides/networking/setup) - Quick start (5 minutes)
- [Sync Component State](/docs/how-to-guides/networking/sync-state) - Automatic networking with @syncField
- [Voice Chat (VoIP)](/docs/how-to-guides/networking/#voice-chat-voip) - Built-in WebRTC voice chat with spatial audio
- [Manual Networking](/docs/how-to-guides/networking/manual-networking) - Custom messages
- [Custom Servers](/docs/how-to-guides/networking/custom-servers) - Self-hosted infrastructure

---

## Export & Assets

- [Export Overview](./export/) - Export workflow and best practices
- [MaterialX Support](./export/materialx) - Complex material networks

---

## Deployment

- [Deployment Platforms](/docs/how-to-guides/deployment/) - Netlify, Vercel, GitHub Pages, etc.
- [Needle Cloud](/docs/cloud/) - Official Needle hosting

---

## Optimization

- [Optimization Overview](/docs/how-to-guides/optimization/) - Best practices, toktx setup, troubleshooting
- [Texture Compression](/docs/how-to-guides/optimization/compress-textures) - KTX2, ETC1S, UASTC, WebP, per-texture overrides
- [Mesh Compression](/docs/how-to-guides/optimization/compress-meshes) - Draco & Meshopt, mesh simplification
- [Progressive Loading & LODs](/docs/how-to-guides/optimization/progressive-loading-and-lods) - Texture LODs, mesh LODs, per-texture LOD overrides
- [Production Build Settings](/docs/how-to-guides/optimization/production-build-settings) - Build types, Unity build window, preview compression

---

## Web Integration

- [Web Integration Overview](/docs/how-to-guides/web-integration/) - Frameworks and bundlers
- [Progressive Web Apps (PWA)](/docs/how-to-guides/web-integration/pwa) - Offline support, installability, auto-updates
- [Responsive Design](/docs/how-to-guides/web-integration/responsive-design) - Adaptive 3D layouts
- [Embed in Websites](/docs/how-to-guides/deployment/embedding) - iframe, CDN, direct integration

### Platform-Specific Integrations

- <logo-header logo="/imgs/framer-logo.webp" alt="Framer"><a href="/docs/how-to-guides/integrations/framer">Framer Plugin</a></logo-header> - Embed 3D content in Framer websites
- <logo-header logo="/imgs/wordpress-logo.webp" alt="WordPress"><a href="/docs/how-to-guides/integrations/wordpress">WordPress Plugin</a></logo-header> - Embed 3D content in WordPress sites
- <logo-header logo="/imgs/webflow-logo.webp" alt="Webflow"><a href="/docs/how-to-guides/integrations/webflow">Webflow</a></logo-header> - Embed 3D content in Webflow sites
- <logo-header logo="/imgs/adobe-experience-manager-logo.webp" alt="Adobe Experience Manager"><a href="/docs/how-to-guides/integrations/adobe-experience-manager">Adobe Experience Manager</a></logo-header> - Integrate with AEM
- <logo-header logo="/imgs/8thwall-logo.png" alt="8th Wall"><a href="/docs/tutorials/for-8thwall-users">8th Wall Migration</a></logo-header> - Transition from 8th Wall to Needle Engine

---

## Debugging & Testing

- [Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension) - 5-star Chrome extension to inspect three.js scenes, with deep Needle Engine integration
- [Needle MCP Server](/docs/ai/needle-mcp-server) - AI assistant for Needle Engine (docs search, project analysis)
- [Debugging & Profiling](/docs/how-to-guides/debugging/) - URL parameters, VSCode debugging, performance profiling
- [Local Development & Device Testing](/docs/how-to-guides/testing) - Test on phones, VR headsets, local network setup
- [Detect Mobile Devices](/docs/how-to-guides/scripting/detect-mobile-devices) - Platform detection

---

::: tip Looking for something else?
- [**Tutorials**](/docs/tutorials/) — Step-by-step lessons to learn Needle Engine by building projects
- [**Explanation**](/docs/explanation/) — Architecture, glTF pipeline, and design decisions
- [**Reference**](/docs/reference/) — API docs, component catalog, configuration, changelogs
:::
