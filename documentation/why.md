---
title: Why Needle Engine exists
description: The problems Needle Engine solves — the stack you rebuild every project, the editor-to-web gap, and how it relates to three.js, React Three Fiber and Unity WebGL.
editLink: true
---

<ask-ai />

# Why Needle Engine exists

three.js is a rendering library. It draws your scene, and it draws it well.

You build everything *around* the rendering yourself, and you build it again in the next project. That work is where most 3D web projects lose their time.

## The stack you end up rebuilding

Getting a real 3D project onto the web means assembling roughly the same pieces every time:

- **An asset pipeline.** Your model comes out of Blender or Unity at 200 MB. To load it in two seconds on a phone you need texture compression, mesh compression, LODs and progressive loading. Each one is a separate tool with its own settings.
- **A model for logic.** As soon as more than one thing moves, per-frame code needs somewhere to live. Most projects grow a single `animate()` that imports every moving part, or a hand-rolled event bus. Both work for one cube. Neither scales.
- **A bridge from your authoring tool.** Artists work in Unity or Blender. The web build needs their materials, animations, lightmaps and hierarchy. So someone writes an exporter, or the artist redoes the work in code.
- **An AR and VR path.** WebXR on Android, USDZ and Quick Look on iOS, controllers and hand tracking on headsets. Each one is a separate integration, and each one goes out of date quickly.
- **Hosting and deployment.** You need a build step, somewhere to put the files, correct MIME types and compression headers, and a URL you can send to a client.

None of this is your product. All of it is between you and your product.

## Two halves of the tooling world

Current systems fall into two camps.

Some have **great asset handling and artist-friendly workflows** — Unity, Unreal, and traditional game engines — but their web output is a binary blob. It is slow to iterate on, hard to integrate into a real website, and hard to control from the surrounding page.

Others are **code-focused and web-native** — three.js, React Three Fiber, Babylon. They fit modern web workflows well, but leave the asset pipeline and the artist's workflow to you.

Needle Engine bridges those two halves. You author in the tools people already use, and the output is genuinely part of the web — real files and real URLs, inspectable in devtools, embeddable in any page.

## What that looks like in practice

- You author in **[Unity](/docs/unity/)**, **[Blender](/docs/blender/)**, or **[pure code](/docs/three/)** — materials, animations, lightmaps and all.
- Export goes to **glTF**, an open standard. A single `.glb` carries your whole application's data, and that data stays yours. You can open a scene authored in Unity in Blender, with its components intact, and keep editing there. Your project is not trapped in the tool that made it.
- Compression and progressive loading are **part of the build**, not a separate step you run afterwards. Output is content-hashed, so browsers and CDNs cache it and a repeat visit downloads almost nothing.
- Logic lives in a **[component model](/docs/how-to-guides/scripting/create-components)** — the same shape on every object, so a scene stays readable.
- **AR, VR and multiplayer are core**, not add-ons. The same URL opens on a desktop, a phone in AR, and a headset.
- **Engine modules load on demand.** Postprocessing, or the physics engine and its WebAssembly payload, load only when a scene uses them. A simple scene does not download the whole engine.
- The output is **a website**. Embed it, style around it, script it from page JavaScript.

The last piece is getting it online, which is where [Needle Cloud](/docs/cloud/) comes in. It is optional — you can deploy anywhere — but it covers the parts that are otherwise yours to build:

- **Deploy in one step** from Unity, Blender, the CLI, or a GitHub Action on every commit.
- **Versioned URLs.** Every upload gets its own URL, and you can label one `main` or `dev`. Share the labelled link once and it follows the label as you move it — useful for client review.
- **Optimisation on upload.** Send glTF, USD, FBX or VRM and get Draco, KTX2 and progressive loading applied for you, served from a CDN.
- **Password protection** on a page or an asset, set from the dashboard, for work that isn't public yet.
- **[FastHDR](/docs/explanation/fasthdr)** for environment lighting — KTX2-supercompressed HDR that streams straight to GPU memory instead of decompressing an EXR on the main thread.

## Who it's for

Needle Engine is likely a good fit if you:

- have artists and developers working on the same project and want them in their own tools
- work entirely in code and would rather not rebuild the render loop, component lifecycle, physics, networking and asset loading again. All of it works without an editor.
- ship 3D as part of a real website — a product page, a configurator, a campaign — not as a standalone game build
- need it to work on phones, in AR and in VR without a separate build per platform
- care about load time on a mid-range phone over a mobile connection
- want to hand the client a URL, not an app store listing

## Who it's not for

Some projects are genuinely better served elsewhere:

- **You want the React paradigm in 3D.** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) is very good at this, and if your team already thinks in React it will feel more natural. These are not competing tools — Needle is for a different workflow, not a better React.
- **You have a three.js codebase and architecture you're happy with.** If the loop, asset handling and structure already work the way you want, adopting Needle's component model is a migration rather than a shortcut. It is worth doing when you start something new, or when you hit the limits of what you have. It is worth less when neither applies.
- **You need a completely no-code environment.** A lot of it is genuinely no-code. Animations, timelines and [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) cover tap interactions, material changes, audio and camera moves. That is enough to build a working configurator or an interactive AR scene without writing anything. But it is [not a goal](/docs/explanation/core-concepts/vision#non-goals) to remove code entirely: behaviour specific to your project eventually means TypeScript.
- **You need to match a native engine's feature set or raw performance.** Needle targets the web, with the constraints and the reach that implies.

## How it relates to what you already use

**three.js** — Needle builds on it rather than replacing it. All rendering goes through three.js, glTF loads through its extension interfaces, and the component model attaches to `Object3D` and the three.js scene graph. You can reach the underlying scene, camera and renderer at any point, and drop into plain three.js whenever you want. We [upstream](https://github.com/mrdoob/three.js) improvements where they make sense.

**React Three Fiber** — solves the same organisation problem by bringing React's paradigm into 3D. Needle solves it with a component model attached to the scene graph, for teams where not everyone writes React. Different trade-off, same underlying renderer.

**Blender** — Needle is an add-on, not an export target you hand your file to. You add components in the Blender UI, and materials, animations and lightmaps come across as part of the scene. You keep working in Blender and re-export; there is no second copy of the project to maintain.

**Unity WebGL** — the engine and editor move fast, but the WebGL output lags behind. Embedding a Unity player in a web page is hard, talking to the surrounding site needs workarounds, and IL2CPP builds are slow to iterate on. Needle uses Unity as an *authoring tool* and exports to web-native formats, instead of packing everything into a WebAssembly blob.

## Next steps

- **Just want to try it?** [Getting Started](/docs/getting-started/) — pick Unity, Blender, or code.
- **Want the full feature list?** [Feature Overview](/docs/explanation/core-concepts/features-overview).
- **Want the longer-term thinking?** [Our Vision](/docs/explanation/core-concepts/vision) — where we think the 3D web is going and what we're deliberately not building.
- **Want to see it running?** [Samples](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=why) — 150+ live scenes.
