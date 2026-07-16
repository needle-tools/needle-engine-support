---
title: Needle Inspector — three.js Debugger & Chrome DevTools Extension
description: Chrome DevTools for three.js — inspect and debug any three.js scene (WebGL & WebGPU), React Three Fiber, or Needle Engine project on any website, free. Pro adds live-editing your own projects, memory & leak tools, AI editing via MCP (Claude, Cursor & more), and exporting your changes.
image: /inspector/overview-needle-inspector.webp
---

<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="three.js Logo" alt="three.js Logo"/> +
    <img src="/imgs/chrome-logo.webp" style="max-height:70px;" title="Chrome Logo" alt="Chrome Logo"/>
</div>

# Needle Inspector — DevTools & MCP for three.js

The **Needle Inspector** is a powerful Chrome DevTools extension for inspecting and debugging three.js, react-three-fiber, and Needle Engine projects — WebGL and WebGPU — directly in your browser. Think of it as the browser's built-in inspector, but specifically designed for 3D scenes.


<testimonial
  name="Sebastien Lempens"
  role="Chrome Web Store Review, Dec 2025"
  img="/docs/inspector/testimonial-SebastienLempens.png"
>
Simply the best Three.js extension I've ever tested. Bravo!
</testimonial>



<video-embed src="https://www.youtube.com/watch?v=zSFqZSqzGGw" />

### Quick Start

1. Install the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/needle-inspector-%E2%80%94-devtoo/jonplpbnhmanoekkgcepnedhghflblmo)
2. Enable the inspector by clicking the Needle icon in the browser toolbar (click it again anytime to hide the inspector)
3. Navigate to any webpage with a three.js scene
4. The inspector will automatically detect the scene and appear
5. Start exploring your 3D content!



:::tip Works on any three.js website
The Needle Inspector works on **any** website using three.js, react-three-fiber, or Needle Engine – not just your own projects. Use it to learn from other developers' work or debug production sites.
:::



<testimonial
  name="KidsFab production"
  role="Chrome Web Store Review, Jan 2026"
>
A must have tool for pros, beginners, and everything in between!
</testimonial>

<img src="/inspector/overview-needle-inspector.webp" alt="Needle Inspector on the three.js examples page — scene hierarchy, AI chat, node graph, resources and code panel around a running scene" />



## Features

### Real-time Scene Inspection

The inspector gives you a complete view of your 3D scene hierarchy, similar to how the browser's Elements panel shows your HTML structure. Free, on every website.

<img src="https://cloud.needle.tools/-/media/7dkT_1C-SETizR1mieW05A.gif" alt="Scene hierarchy in the Needle Inspector — browsing objects, meshes, lights and cameras of a live three.js scene" loading="lazy" style="max-width: min(500px, 100%);" />

- **Scene Hierarchy**: Browse all objects, meshes, lights and cameras in an expandable tree view
- **Search & Filter**: Quickly find objects by name or type
- **Live Updates**: The tree follows your scene in real time as objects spawn, move and unload
- **Isolated Inspect View**: Right-click any object to view it alone in a dedicated 3D view

### Live Property Editing

Tweak transforms, materials, lights and textures on the running scene and watch it react — every change goes through a real command system, so **Ctrl+Z / Cmd+Z undo works** like in a desktop editor.

<img src="https://cloud.needle.tools/-/media/_qT6InzdSGJJWnDR4OZgZg.gif" alt="Live property editing in the Needle Inspector — tweaking materials on a running three.js scene" loading="lazy" style="max-width: min(500px, 100%);" />

- **Transforms**: Position, rotation and scale with draggable number inputs
- **Materials**: Colors, maps, opacity, emission, roughness/metalness and rendering flags — including values baked into your GLBs that no code sets
- **Textures**: Preview, inspect and swap texture slots
- **Visibility & Flags**: Show/hide objects, toggle features live

Try it on any public three.js site for free. Editing **your own projects** (localhost) is part of [Pro](#free-vs-pro).

### Built-in Assets Browser

Drop new content straight into a running scene — no downloads, no code changes:

<img src="https://cloud.needle.tools/-/media/OIAq3e4FBuBjQDZ8pnpZ1g.gif" alt="Assets browser in the Needle Inspector — browsing the asset library and dropping materials and HDRIs into a live three.js scene" loading="lazy" style="max-width: min(500px, 100%);" />

- **HDRIs & Materials**: Browse a curated asset library with instant previews
- **Drag & Drop**: Pull a material onto any mesh in the scene
- **One-click Lighting**: Set an HDRI as the scene environment and background instantly

Browsing the library is free; applying assets to **your own projects** is part of [Pro](#free-vs-pro).

### Node Graphs & Rendering Insight

See how your frame and shaders are actually built:

<img src="https://cloud.needle.tools/-/media/DXpp8Bsku7cPBguuBD_2Hw.gif" alt="Material node graph in the Needle Inspector — traversing and editing a three.js node material" loading="lazy" style="max-width: min(500px, 100%);" />

- **Material Node Graphs**: Explore materials as node graphs (including three.js TSL / node materials), drill from the scene into materials and subgraphs
- **Render Graph**: Capture a frame and see every render call, pass, target and their dependencies
- **Code Panel**: The generated shader / TSL source for the selection, one click away

<img src="https://cloud.needle.tools/-/media/Yv1pEJ9weTPRoRsq-Sfmiw.gif" alt="Node graph with the code panel side by side — TSL and three.js source for the selected material" loading="lazy" style="max-width: min(500px, 100%);" />

*Node graph and code panel side by side — TSL, compiled shader code and three.js source code for the selected material*

### Resources & Memory

Find out what's actually loaded, what it costs, and what never unloads — the "why is my app at 2 GB" panel.

<img src="https://cloud.needle.tools/-/media/9HBWd1PMn-bQoOHk4Mt0NQ.gif" alt="Resources panel in the Needle Inspector — textures, geometries and materials with memory estimates" loading="lazy" style="max-width: min(500px, 100%);" />

- **Every texture, geometry and material** with memory estimates
- **Load/unload tracking**: Spot resources that never get freed — memory leaks show up as rows that never disappear
- **Draw calls, triangles, FPS and download size** at a glance

The free tier shows a preview of each group; the **full resource list** is part of [Pro](#free-vs-pro).

### AI-Powered Assistance <div style="display:inline-flex;gap:.5em;vertical-align:middle;padding-left:.5em;"> <img style="max-height:1.2em;" src="/imgs/vscode-logo.webp" title="VS Code Logo" alt="VS Code Logo"/> <img style="max-height:1.2em;" src="/imgs/claude-logo.webp" title="Claude Logo" alt="Claude Logo"/> <img style="max-height:1.2em;" src="/imgs/cursor-logo.webp" title="Cursor Logo" alt="Cursor Logo"/> <img style="max-height:1.2em;" src="/imgs/antigravity-logo.webp" title="Antigravity Logo" alt="Antigravity Logo"/> </div>

The only three.js tool where your AI assistant can **see and edit the running scene**. Built-in AI chat, plus MCP for Claude Code, Cursor, VS Code, Antigravity & co.

<img src="https://cloud.needle.tools/-/media/eycVjikaWUeHS86A3HfP4g.gif" alt="AI chat in the Needle Inspector — asking questions about the running three.js scene and editing it with AI" loading="lazy" style="max-width: min(500px, 100%);" />

- **MCP Integration**: Your agent reads the hierarchy, inspects objects, changes properties, and pulls your pending edits (`get_edits`) to apply them to your source code
- **Built-in AI Chat**: Ask questions about the open scene without leaving the browser
- **Same tool set everywhere**: Everything the built-in chat can do, external MCP clients can do too (the full tool list is shown in the inspector's settings)

Setup is simple:
```bash
npx needle-cloud start
```

Then connect your AI tool and talk to your scene.   
**Learn how to connect your local AI tools**: [Needle MCP documentation](../ai/needle-mcp-server).

AI editing on your own projects is part of [Pro](#free-vs-pro).

### Keep What You Make

Your edits shouldn't die with the browser tab:

- **Changeset Download**: Every property change you made, as JSON (structured) or readable text — hand it to a teammate, commit it, or let your AI agent apply it to the source
- **GLB Export**: Export objects or whole scenes as glTF/GLB
- **Undo History**: Nothing is destructive while you iterate

Taking your work home is part of [Pro](#free-vs-pro).

## Free vs Pro

The rule is simple: **looking is free, working on your project is Pro.**

Inspecting, debugging, learning from any website — free forever, that's the point of the tool. Pro is for when the inspector becomes part of your own workflow:

| | Free | Pro |
|---|---|---|
| Scene hierarchy, search, live inspection | ✓ on any website | ✓ |
| Property viewing, node graphs, render graph, code panel | ✓ on any website | ✓ |
| Performance stats | ✓ | ✓ |
| Live property editing | ✓ on public sites | ✓ everywhere, incl. your local projects |
| Assets browser | browse & preview | ✓ apply to your projects |
| Resources & memory list | preview | full list |
| AI chat & MCP editing on your projects | – | ✓ |
| Changeset download (JSON/text) | – | ✓ |
| GLB export | – | ✓ |

**Needle Inspector Pro is a one-time purchase — no subscription, yours forever.** It's also **included with every [Needle Engine Pro](https://needle.tools/pricing) license**, so if your team already uses Needle Engine Pro, just sign in.

To buy: open the inspector on any page and click **Get Pro** in the toolbar — the current price (and any running launch discount) is shown right there.

## Supported Platforms

- three.js (all versions) — **WebGL and WebGPU** renderers, including TSL / node materials
- react-three-fiber
- Needle Engine
- A-frame (via three.js)
- Threlte
- Any three.js-based framework

## Installation

1. Visit the [Needle Inspector page on the Chrome Web Store](https://chromewebstore.google.com/detail/needle-inspector-%E2%80%94-devtoo/jonplpbnhmanoekkgcepnedhghflblmo)
2. Ensure you are using Google Chrome or a Chromium-based browser
3. Click "Add to Chrome" and you're ready to go!


## FAQ

### Does the inspector slow my site down?

Only pages where you enable it are affected, and the overhead while inspecting is small. When the extension is toggled off it does nothing at all.

### Does my scene data leave the browser?

Inspecting runs entirely in your browser — your scene is not uploaded anywhere. Only when you actively use the built-in AI chat is the relevant scene context sent to Needle Cloud to answer your request. When you connect your own AI tools via MCP instead, your scene context goes directly to them — not through Needle Cloud.

### Does it work for my local development?

Yes — that's where the inspector shines. It works on localhost and LAN dev servers out of the box (Vite, webpack, plain file servers, anything), plays fine with hot reload, and your edits survive alongside it. Editing your own projects is the core of [Pro](#free-vs-pro).

### Which three.js versions and frameworks are supported?

All modern three.js versions with both the WebGL and WebGPU renderers, and everything built on three.js: React Three Fiber, Threlte, A-Frame and more.

### Do I need Needle Engine?

No. The inspector works on any three.js scene. Needle Engine projects get extra features on top (component editing, networking inspection, XR debugging).

### What does Pro cost?

Pro is a **one-time purchase** — no subscription. The current price is always shown in the extension (**Get Pro** in the toolbar). It's included with [Needle Engine Pro](https://needle.tools/pricing) licenses.

### Can I inspect websites I didn't build?

Yes — inspecting, debugging and learning from any three.js website is free and always will be. Paid features only concern working on your own projects.

## What Users Say

<testimonial
  name="KidsFab production"
  role="Chrome Web Store Review, Jan 2026"
>
A must have tool for pros, beginners, and everything in between!
</testimonial>

<testimonial
  name="Francesco Michelini"
  role="Chrome Web Store Review, Dec 2025"
>
This extension in 5 minutes helped me solving a visual issue I was struggling to fix for two weeks. A must have for all ThreeJS devs 🍻
</testimonial>

<testimonial
  name="Sebastien Lempens"
  role="Chrome Web Store Review, Dec 2025"
  img="/docs/inspector/testimonial-SebastienLempens.png"
>
Simply the best Three.js extension I've ever tested. Bravo!
</testimonial>

<testimonial
  name="Den"
  role="Chrome Web Store Review, Jan 2026"
  img="/docs/inspector/testimonial-Den.jpg"
>
The best tool for inspecting and debugging Three.js apps. Special thanks for the MCP server — it's a game changer for vibe coding (in a good way)!
</testimonial>

<testimonial
  name="Katja Rempel"
  role="Chrome Web Store Review, Jan 2026"
  img="/docs/inspector/testimonial-KatjaRempel.png"
>
A very useful tool for debugging your own projects or understanding how others work!
</testimonial>

<testimonial
  name="Patrick Byrn"
  role="Chrome Web Store Review, Dec 2025"
>
Game changer when working with three.js. Feels like magic the first time you use it.
</testimonial>

<testimonial
  name="Finnbarr O'Callahan"
  role="Chrome Web Store Review, Apr 2026"
  img="/docs/inspector/testimonial-FinnbarrOCallahan.png"
>
Polished and helpful, allows for easy runtime debugging like with Unity/Unreal. :)
</testimonial>

<testimonial
  name="Valentin"
  role="Chrome Web Store Review, Dec 2025"
  img="/docs/inspector/testimonial-Valentin.jpg"
>
This is a really good tool for inspecting any three.js scene. It's extremely useful for quickly debugging your own projects, but it's also great for analyzing and learning how other websites are structured without painfully digging through the default browser dev tools. It does everything the official three.js editor does—just better! If you're a WebGL developer, it's a must-have in your toolbox.
</testimonial>

## Get the Inspector

**[Install free from the Chrome Web Store](https://chromewebstore.google.com/detail/needle-inspector-%E2%80%94-devtoo/jonplpbnhmanoekkgcepnedhghflblmo)** — you'll be inspecting your first scene a minute from now.

And when the inspector becomes part of your daily workflow: **Get Pro** in the toolbar unlocks editing your own projects, the full resource list, AI editing and export. One-time purchase, yours forever — included with [Needle Engine Pro](https://needle.tools/pricing).

## Next Steps

- [Learn about Needle Engine](/docs/)
- [Explore three.js integration](/docs/three/)
- [Get started with Needle in Unity](/docs/unity/)
- [Get started with Needle in Blender](/docs/blender/)
- [AI-Powered Development](/docs/ai/) - Connect AI assistants to the inspector

:::tip Using Needle Engine?
The inspector has special features when used with Needle Engine projects, including component editing, networking inspection, and XR debugging tools.
:::
