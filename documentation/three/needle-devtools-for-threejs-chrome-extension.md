---
title: Needle Inspector — three.js Debugger & Chrome DevTools Extension
description: Chrome DevTools for three.js — inspect and debug WebGL, WebGPU, React Three Fiber, and Needle Engine scenes with the free Needle Inspector Chrome extension. Pro adds live property editing on development servers, memory and leak tools, AI editing via MCP (Claude, Cursor, and more), and exporting your changes.
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

# Needle Inspector — DevTools and MCP for three.js

The **Needle Inspector** brings Chrome DevTools for three.js to your browser. Use this free Chrome extension to inspect and debug three.js, React Three Fiber (react-three-fiber), and Needle Engine scenes with WebGL and WebGPU renderers. Think of it as the browser's built-in inspector for 3D scenes: explore the scene hierarchy, inspect properties, and track performance. Needle Inspector Pro adds live property editing on development servers, memory and leak tools, AI editing via MCP, and export.


<testimonial
  name="Francesco Michelini"
  role="Chrome Web Store Review, Dec 2025"
  img="/docs/inspector/testimonial-FrancescoMichelini.jpg"
>
This extension in 5 minutes helped me solving a visual issue I was struggling to fix for two weeks. A must have for all ThreeJS devs
</testimonial>



<video-embed src="https://www.youtube.com/watch?v=zSFqZSqzGGw" />

### Quick Start

1. Install the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/needle-inspector-%E2%80%94-devtoo/jonplpbnhmanoekkgcepnedhghflblmo)
2. Open a webpage with a three.js scene.
3. Click the Needle icon in the browser toolbar to enable the Inspector for that site. The page reloads.
4. When the Inspector detects a scene, browse the hierarchy and select an object to inspect its properties.

Click the toolbar icon again to disable the Inspector for that site. This also reloads the page.



:::tip Inspect three.js websites
You can inspect three.js, React Three Fiber, and Needle Engine scenes on public websites as well as your own projects. Use it to understand how a scene is built or investigate a production issue.
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

Browse your 3D scene hierarchy, similar to how the browser's Elements panel shows your HTML structure. Scene hierarchy inspection is free.

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

Property editing is free on ordinary public websites. Editing on localhost, LAN development servers, and supported development, preview, and staging hosts requires [Pro](#free-vs-pro).

### Free-Fly Camera

Explore the scene from another angle. Click the camera icon in the top right to enable the fly camera, then use WASD to move through the scene. The camera remembers its last position and restores it when you return.

<img src="https://cloud.needle.tools/-/media/BpvuEmacbFta1Bd5kiovuQ.gif" alt="Free-fly camera in the Needle Inspector — moving through a running three.js scene" loading="lazy" style="max-width: min(500px, 100%);" />

#### Inspect Above HTML and Change the Background

The fly camera can display the scene above the website's HTML, so page content no longer blocks your view. Keep the website background or switch to a neutral light or dark checkerboard to inspect transparency, edges, and post-processing effects more clearly.

<img src="https://cloud.needle.tools/-/media/3dlbe4M7nU3ctMQJvvztIQ.gif" alt="Fly camera displaying a three.js scene above website content and switching between the website background and light and dark checkerboards" loading="lazy" style="max-width: min(500px, 100%);" />

### Pop-Out Window

Move the Inspector into a separate window to give your scene more space. Arrange the window beside your browser or on another monitor while you inspect the running scene. The pop-out window remembers its position and restores it when you reopen it.

<img src="https://cloud.needle.tools/-/media/mQUplopt_8cwxITmKOxLiw.gif" alt="Needle Inspector panels in a separate pop-out window beside the running scene" loading="lazy" style="max-width: min(500px, 100%);" />

### Built-in Assets Browser

Drop new content straight into a running scene — no downloads, no code changes:

<img src="https://cloud.needle.tools/-/media/OIAq3e4FBuBjQDZ8pnpZ1g.gif" alt="Assets browser in the Needle Inspector — browsing the asset library and dropping materials and HDRIs into a live three.js scene" loading="lazy" style="max-width: min(500px, 100%);" />

- **HDRIs & Materials**: Browse a curated asset library with instant previews
- **Drag & Drop**: Pull a material onto any mesh in the scene
- **One-click Lighting**: Set an HDRI as the scene environment and background instantly

Browsing the library is free; **applying assets** is part of [Pro](#free-vs-pro).

### Node Graphs & Rendering Insight

See how your frame and shaders are actually built:

<img src="https://cloud.needle.tools/-/media/DXpp8Bsku7cPBguuBD_2Hw.gif" alt="Material node graph in the Needle Inspector — traversing and editing a three.js node material" loading="lazy" style="max-width: min(500px, 100%);" />

- **Material Node Graphs**: Explore materials as node graphs (including three.js TSL / node materials)
- **Render Graph**: Capture a frame and see every render call, pass, target and their dependencies

Viewing the full graph is free — **stepping into subgraphs and functions** and re-capturing frames is part of [Pro](#free-vs-pro).

### Code View — Shaders & Source

The code behind any selection, one click away:

<img src="https://cloud.needle.tools/-/media/XBuyTvCZ72dXacDzus2qUQ.gif" alt="Code panel in the Needle Inspector — the source behind the selected object or material" loading="lazy" style="max-width: min(500px, 100%);" />

- **TSL, compiled shaders & three.js source**: Switch between the TSL code, the compiled vertex/fragment shaders and the three.js source of the selected material or object
- **Follows your selection**: Lock the view to pin a source while you keep browsing — and copy out whatever you need

Your own three.js/object source and authored shaders are free. The inspector-**generated** sources — compiled shaders and reconstructed TSL — show a trimmed preview on the free tier; the full output is part of [Pro](#free-vs-pro).

<img src="https://cloud.needle.tools/-/media/Yv1pEJ9weTPRoRsq-Sfmiw.gif" alt="Node graph with the code panel side by side — TSL and three.js source for the selected material" loading="lazy" style="max-width: min(500px, 100%);" />

*Works side by side with the node graph — the source for exactly what you're looking at*

### Performance Panel

Track frame rate, memory use, and rendering work over time. Pause the graphs to investigate a spike.

<!-- portrait capture (376x600 native) — the shared 500px width upscaled it and it read as blurry -->
<img src="https://cloud.needle.tools/-/media/Zl1RM8T4tCkgrLo-W2QZzA.gif" alt="Performance panel in the Needle Inspector — live FPS, CPU and GPU memory, render passes, draw calls and triangles for a running three.js scene" loading="lazy" style="max-width: min(376px, 100%); max-height: 600px;" />

- **FPS, CPU memory and GPU memory (VRAM)** as running graphs, with the current value next to each
- **Render passes, draw calls and triangles per frame** — the GPU's real work, counted across every pass (shadows, prepass, post-processing), not just the scene's raw triangle count
- **Potential VRAM saving**: how much texture memory compression would reclaim
- **In scene vs. loaded**: meshes, geometries, materials and textures that are actually in the current scene, next to everything the page has loaded
- **Events**: jank and big loads marked on the timeline — a long frame names the function and file behind it, and in local development you can **jump straight to the line of code** that caused the stall
- **Pause** at any moment to read the numbers behind a spike

### Resources & Memory

Inspect loaded textures, geometries, and materials with estimated memory use. Track what loads and unloads to investigate memory growth and potential memory leaks in your three.js scene.

<img src="https://cloud.needle.tools/-/media/9HBWd1PMn-bQoOHk4Mt0NQ.gif" alt="Resources panel in the Needle Inspector — textures, geometries and materials with memory estimates" loading="lazy" style="max-width: min(500px, 100%);" />

- **Every texture, geometry and material** with memory estimates
- **Load/unload tracking**: Spot resources that never get freed — memory leaks show up as rows that never disappear
- **Draw calls, triangles, FPS and download size** at a glance

The free tier shows a preview of each group; the **full resource list** is part of [Pro](#free-vs-pro).

### AI-Powered Assistance <div style="display:inline-flex;gap:.5em;vertical-align:middle;padding-left:.5em;"> <img style="max-height:1.2em;" src="/imgs/vscode-logo.webp" title="VS Code Logo" alt="VS Code Logo"/> <img style="max-height:1.2em;" src="/imgs/claude-logo.webp" title="Claude Logo" alt="Claude Logo"/> <img style="max-height:1.2em;" src="/imgs/cursor-logo.webp" title="Cursor Logo" alt="Cursor Logo"/> <img style="max-height:1.2em;" src="/imgs/antigravity-logo.webp" title="Antigravity Logo" alt="Antigravity Logo"/> </div>

Let your AI assistant **inspect and edit the running three.js scene**. Use the built-in AI chat or connect an MCP client such as Claude Code, Cursor, VS Code, or Antigravity.

<img src="https://cloud.needle.tools/-/media/eycVjikaWUeHS86A3HfP4g.gif" alt="AI chat in the Needle Inspector — asking questions about the running three.js scene and editing it with AI" loading="lazy" style="max-width: min(500px, 100%);" />

- **MCP Integration**: Your agent reads the hierarchy, inspects objects, changes properties, and pulls your pending edits (`get_edits`) to apply them to your source code
- **Built-in AI Chat**: Ask questions about the open scene without leaving the browser
- **Available tools**: View the MCP tool list in the Inspector settings. Some tools are specific to the built-in chat or available only in certain contexts.

#### Ask AI about anything

Right-click any object in the **hierarchy** or the **3D scene** — or any **property in the inspector** — and *Ask AI about this*. The chat opens as a small bubble pinned to the thing you asked about, so the AI already has the context, and you can keep several conversations going at once while you work.

<img src="https://cloud.needle.tools/-/media/QH2pLpoBMHb9MxSs6VCX6Q.gif" alt="Contextual AI chat bubbles in the Needle Inspector — asking about an object straight from the three.js scene, hierarchy or inspector" loading="lazy" style="max-width: min(500px, 100%);" />

Setup is simple:
```bash
npx needle-cloud start
```

Keep the terminal open, then connect your AI client to `http://localhost:8424/mcp`.
**Learn how to connect your local AI tools**: [Needle MCP documentation](../ai/needle-mcp-server).

MCP &amp; AI editing is part of [Pro](#free-vs-pro).

### Save and Export Changes

Use these tools to save changes made to the running scene:

- **Save and Load Edits**: Use **File → Save Edits** to export your edits as JSON, and **File → Load Edits** to load them back into the Inspector. Hand the JSON to an AI agent to apply the changes to your local project's source code, or share it with a team member. You can also save a readable text version.
- **Edits via MCP**: A connected AI agent can read your edits directly with `get_edits` and apply them to your project's source code.
- **GLB Export**: Export objects or whole scenes as glTF/GLB — **textures and animations included**
- **Texture Export**: Right-click any texture slot to download that texture as a PNG
- **Undo History**: Undo and redo edits made through the Inspector command system

<img src="https://cloud.needle.tools/-/media/csWFKkAIFwPggN1L2-v9sA.gif" alt="Exporting Inspector edits to JSON and loading edits from JSON to share changes with an AI agent or team member" loading="lazy" style="max-width: min(500px, 100%);" />

<img src="https://cloud.needle.tools/-/media/7f7aI5PTXntuxFr107YJQA.gif" alt="Right-clicking a texture slot to export the texture as a PNG in the Needle Inspector" loading="lazy" style="max-width: min(500px, 100%);" />

Saving edits, GLB export, and texture export require [Pro](#free-vs-pro).

### Optimize a Mesh Without Leaving the Scene

**New in 2.5:** send meshes straight to the **[Needle Mesh Baker](/docs/products/needle-mesh-baker)** without leaving the scene.

Drag objects from the hierarchy into a group — as many as you like — and bake each group on its own. A group comes back as one mesh, with transparent surfaces kept apart from opaque ones because they cannot share a material. A scene built from many small parts loses most of its draw calls along with its triangles.

The baked result lands in the running scene, and a toggle switches between the original and the baked version so you can compare the two in place. Adjust the triangle budget and bake again until it holds up.

Baking runs in your browser, and the mesh is not uploaded. Keeping a baked result needs the Mesh Baker; sending meshes over and looking at what comes back does not.

## Free vs Pro

The free version includes scene inspection, performance stats, and property editing on ordinary public websites. Pro adds editing on development servers, full resource lists and generated shader code, node-graph drill-down, AI tools, and export.

| | Free | Pro |
|---|---|---|
| Scene hierarchy, search, live inspection | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> on supported sites | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> |
| Property viewing, node graphs, render graph, code view | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> on supported sites | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> |
| Node-graph drill-down (subgraphs & functions), frame re-capture | <img src="/inspector/dash.svg" alt="no" width="16" height="16" style="display:inline;vertical-align:-3px;"> | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> |
| TSL & compiled shader code | trimmed preview | full source |
| Performance stats | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> |
| Live property editing | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> on public sites | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> including development servers |
| Assets browser | browse & preview | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> apply |
| Resources & memory list | preview | full list |
| Inspector MCP tools & AI editing | <img src="/inspector/dash.svg" alt="no" width="16" height="16" style="display:inline;vertical-align:-3px;"> | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> |
| Save Edits (JSON/text) | <img src="/inspector/dash.svg" alt="no" width="16" height="16" style="display:inline;vertical-align:-3px;"> | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> |
| GLB export | <img src="/inspector/dash.svg" alt="no" width="16" height="16" style="display:inline;vertical-align:-3px;"> | <img src="/inspector/check.svg" alt="yes" width="16" height="16" style="display:inline;vertical-align:-3px;"> |

**Needle Inspector Pro is a one-time purchase — no subscription, yours forever.** It's also **included with every [Needle Engine Pro](https://needle.tools/pricing) license**, so if your team already uses Needle Engine Pro, just sign in.

To buy: open the inspector on any page and click **Get Pro** in the toolbar — the current price (and any running launch discount) is shown right there.

## Supported Platforms

- Modern three.js versions — **WebGL and WebGPU** renderers, including TSL / node materials
- React Three Fiber
- Needle Engine
- A-Frame (via three.js)
- Threlte
- Any three.js-based framework

## Installation

1. Visit the [Needle Inspector page on the Chrome Web Store](https://chromewebstore.google.com/detail/needle-inspector-%E2%80%94-devtoo/jonplpbnhmanoekkgcepnedhghflblmo)
2. Ensure you are using Google Chrome or a Chromium-based browser
3. Click "Add to Chrome" and you're ready to go!


## FAQ

### Does the inspector slow my site down?

The Inspector hooks into scenes on sites where you enable it. Inspection, frame capture, and other tools add work, so the impact depends on the scene and the tools you use. Disable it from the toolbar when you finish; the page reloads without the Inspector.

### Does my scene data leave the browser?

Inspecting runs entirely in your browser — your scene is not uploaded anywhere. Only when you actively use the built-in AI chat is the relevant scene context sent to Needle Cloud to answer your request. When you connect your own AI tools via MCP instead, your scene context goes directly to them — not through Needle Cloud.

### What usage data does the inspector collect?

The Inspector records feature usage, such as which panels and tools you open, resource counts, and object types. These events use types such as `MeshStandardMaterial`, rather than object names. Analytics also include the inspected page's hostname and path, plus the page title and referrer in pageview events, browser information, language, and screen size. Once you sign in, analytics include account details. If you use the built-in AI chat, we also record prompt text to help improve the assistant.

We deliberately don't collect the names of your objects, materials, textures or assets, what you type into search fields or text inputs, or the query string of pages you inspect. Crash reports are limited to errors thrown by the inspector's own code.

Analytics are sent directly to Needle. If you have questions about data collection or requirements for your workplace, [contact us](mailto:hi+inspector@needle.tools).

### Does it work for my local development?

Yes. You can inspect scenes on localhost and LAN development servers, including projects served with Vite or webpack. Live editing on development servers requires [Pro](#free-vs-pro). Changes affect the running scene; a reload or hot update can replace edited objects. Use **File → Save Edits** to save them, or ask your AI agent to read them via MCP and apply them to your source code.

### Which three.js versions and frameworks are supported?

The Inspector supports modern three.js versions with WebGL and WebGPU renderers, including scenes built with React Three Fiber, Threlte, and A-Frame. Detection and available tools can vary with the three.js version and how the site creates its scene.

### Do I need Needle Engine?

No. The inspector works on any three.js scene. Needle Engine projects get extra features on top (component editing, networking inspection, XR debugging).

### What does Pro cost?

Needle Inspector Pro is a **one-time purchase** — no subscription. The current price is always shown in the extension (**Get Pro** in the toolbar). It's included with [Needle Engine Pro](https://needle.tools/pricing) licenses.

### Can I inspect websites I didn't build?

Yes. Scene inspection is free on supported public websites, and you can edit properties on ordinary public sites. Pro adds editing on development hosts, node-graph drill-down, full resource lists, Inspector MCP tools, AI editing, and export. See [Free vs Pro](#free-vs-pro).

### How do I install the Needle Inspector?

Install it free from the **[Chrome Web Store](https://chromewebstore.google.com/detail/needle-inspector-%E2%80%94-devtoo/jonplpbnhmanoekkgcepnedhghflblmo)** — click *Add to Chrome* in Chrome or any Chromium-based browser (Edge, Brave, Arc, Opera). No account needed to start inspecting.

Open a page with a three.js scene, then click the Needle toolbar icon to enable the Inspector for that site. The page reloads — see [Quick Start](#quick-start).

## What Developers Are Saying

<!-- newest first — keep it that way when adding a review -->

<testimonial
  name="Quentin Brohan"
  role="Chrome Web Store Review, Apr 2026"
>
Great app for debugging, trying new ideas or quick edits from the browser!
<br><br>
Things I love:
<ul>
<li>Fly camera for exploration.</li>
<li>Changing assets/textures in a click.</li>
<li>Seeing the structure of the scene and show/hide elements.</li>
<li>Quick edits of elements for debugging and exploring ideas/concept at a glance by directly changing three.js props from the UI.</li>
</ul>
</testimonial>

<testimonial
  name="Finnbarr O'Callahan"
  role="Chrome Web Store Review, Apr 2026"
  img="/docs/inspector/testimonial-FinnbarrOCallahan.png"
>
Polished and helpful, allows for easy runtime debugging like with Unity/Unreal. :)
</testimonial>

<testimonial
  name="Stéphane Cabaret"
  role="Chrome Web Store Review, Mar 2026"
>
Great tool for helping and setting many 3D parameters (lights, objects positions) inside Chrome.
</testimonial>

<testimonial
  name="Denis Shapkin"
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
  name="KidsFab production"
  role="Chrome Web Store Review, Jan 2026"
>
A must have tool for pros, beginners, and everything in between!
</testimonial>

<testimonial
  name="Francesco Michelini"
  role="Chrome Web Store Review, Dec 2025"
  img="/docs/inspector/testimonial-FrancescoMichelini.jpg"
>
This extension in 5 minutes helped me solving a visual issue I was struggling to fix for two weeks. A must have for all ThreeJS devs
</testimonial>

<testimonial
  name="Sebastien Lempens"
  role="Chrome Web Store Review, Dec 2025"
  img="/docs/inspector/testimonial-SebastienLempens.png"
>
Simply the best Three.js extension I've ever tested. Bravo!
</testimonial>

<testimonial
  name="Patrick Byrn"
  role="Chrome Web Store Review, Dec 2025"
>
Game changer when working with three.js. Feels like magic the first time you use it.
</testimonial>

<testimonial
  name="Valentin"
  role="Chrome Web Store Review, Dec 2025"
  img="/docs/inspector/testimonial-Valentin.jpg"
>
This is a really good tool for inspecting any three.js scene. It's extremely useful for quickly debugging your own projects, but it's also great for analyzing and learning how other websites are structured without painfully digging through the default browser dev tools. It does everything the official three.js editor does—just better! If you're a WebGL developer, it's a must-have in your toolbox.
</testimonial>

## Get the Inspector

**[Install free from the Chrome Web Store](https://chromewebstore.google.com/detail/needle-inspector-%E2%80%94-devtoo/jonplpbnhmanoekkgcepnedhghflblmo)**, then enable the Inspector on a page with a three.js scene.

**Get Pro** in the toolbar unlocks editing on development servers, node-graph drill-down, full resource lists, Inspector MCP tools, AI editing, and export. Needle Inspector Pro is a one-time purchase and is included with [Needle Engine Pro](https://needle.tools/pricing).

## Next Steps

- [Learn about Needle Engine](/docs/)
- [Explore three.js integration](/docs/three/)
- [Get started with Needle in Unity](/docs/unity/)
- [Get started with Needle in Blender](/docs/blender/)
- [AI-Powered Development](/docs/ai/) - Connect AI assistants to the inspector

:::tip Using Needle Engine?
The inspector has special features when used with Needle Engine projects, including component editing, networking inspection, and XR debugging tools.
:::
