---
title: Needle Mesh Baker — Optimize 3D Models in the Browser
description: Reduce a model's triangle count and bake its appearance into textures — 800,000 triangles down to 6,000, and it still looks the same. Runs in your browser; nothing is uploaded.
image: https://cloud.needle.tools/-/media/cFXofjsyv3nAGCJOZvFGsw.gif
---

# Needle Mesh Baker

The **Needle Mesh Baker** reduces a model's triangle count and bakes its appearance into textures. The result is a single mesh with a single material that still looks like the original.

- **Built to render fast** — far fewer triangles, one draw call instead of many, a smaller download
- **Keeps the look** — the silhouette is held onto while triangles come off, and color, normals, roughness and metallic are baked into the textures
- **Quick to bake** — it runs on your own GPU, so even a model with millions of triangles takes seconds. No upload to sit through, no queue to wait in
- **100% local** — your model never leaves your machine ([really](#is-my-model-uploaded-to-needle))
- **Yours to download** — the finished mesh comes back as a plain `.glb`

Drop in a model, set a triangle budget, and compare the result against the source before you download it.

**[Open the Needle Mesh Baker →](https://mesh-baker.needle.tools)**

<img src="https://cloud.needle.tools/-/media/cFXofjsyv3nAGCJOZvFGsw.gif" alt="The Needle Mesh Baker workbench, comparing an 800,000 triangle source model with the 6,000 triangle result side by side" />

*The model on the left has 800,000 triangles. The model on the right has 6,000.*

## Quick Start

1. Open [mesh-baker.needle.tools](https://mesh-baker.needle.tools) in your browser
2. Drop a `.glb`, `.gltf`, `.obj`, `.fbx` or `.zip` onto the page — or load a model from your Needle Cloud library
3. Set your triangle budget under **Geometry**, or switch to targeting a maximum surface error
4. Press **Optimize asset**, then compare the result against the source in the two linked viewers
5. **Download** the result as a `.glb`

:::tip Nothing is uploaded
Loading, baking, previewing and comparing all happen locally, on your machine. No geometry, no textures and no file names are sent anywhere. See [Is my model uploaded to Needle?](#is-my-model-uploaded-to-needle)
:::

## What it produces

A single reduced mesh with the appearance of the original baked onto it. Use it on sculpts, photogrammetry scans, CAD exports, AI-generated models, LODs and background props — anything carrying more triangles or materials than it needs.

- **One draw call** — however many meshes and materials went in, one mesh with one material comes out. On scenes built from many small parts that is often the bigger win, not the triangle count
- **Set a triangle budget**, or ask instead for a maximum deviation from the original surface and let the baker find the triangle count
- **Two ways to simplify** — rebuild the surface from scratch, which cleans up messy or broken source models, or reduce the model's own triangles and keep the structure it was authored with
- **Baked PBR textures** — base color, normal, roughness, metallic, emissive, opacity, and optional ambient occlusion, up to 4K
- **Live preview** — drag the budget and watch the mesh change, so you can find the right number before running a full bake
- **Tuning where it matters** — how hard edges are treated, whether small parts are protected from the budget, and how much of the original silhouette to defend

<img src="https://cloud.needle.tools/-/media/hTfJmobS6DTDa6WWbe-GRg.gif" alt="Dragging the triangle budget in the Needle Mesh Baker while the wireframe result updates live, 1,328,920 triangles down to 6,830" loading="lazy" />

*You drag the triangle budget, and the result rebuilds while you drag. This model goes from 1,328,920 triangles to 6,830.*

## Why this is not just decimation

A sculpt carries its detail *as geometry* — every scratch, feather and bolt is real triangles. Simply decimating that throws the detail away: the mesh gets lighter and visibly worse, and because the UVs are only shifted around rather than rebuilt, the textures distort with it. That is fine for a 20% reduction. It is not fine for 99%.

The workflow that does survive it is baking: build a new low-poly mesh, give it new UVs and tangents, then transfer the original's surface into textures on it — the normal map is what puts the scratches and bolts back, as shading rather than geometry. Blender, Houdini, xNormal and Substance can all do this, and getting a correct normal map out of any of them takes care.

The baker does that whole chain in one step, and gets the parts that are easy to get wrong — tangent space, normal orientation — right by default.

<img src="https://cloud.needle.tools/-/media/XEutsc3aScR4WdGjPOPlQQ.gif" alt="Dragging the key light around in the Needle Mesh Baker: the 3.1 million triangle source and the 5,914 triangle result catch the light the same way" loading="lazy" />

*The key light moves across both models. The result has 5,914 triangles, so its detail comes from the baked normal map and not from geometry.*

## Getting models in

| Source | Notes |
|---|---|
| `.glb` / `.gltf` | Loaded directly |
| `.obj` + `.mtl` + textures | Select all files together |
| `.fbx` | Loaded directly |
| `.zip` | An archive containing any of the above, with relative paths preserved |
| Needle Cloud | Sign in to pick a model from your own asset library |

Skinned meshes are baked in their current pose. The result is static geometry — rigs, animations and the original object hierarchy are not carried over.

## Comparing before and after

Optimization is only worth it if you can see what it cost you. The workbench is built around two viewers with synchronized cameras — source on the left, result on the right:

- **Isolate any channel** — the finished result, the bare mesh, or a single map such as base color, normal or roughness
- **Wireframe overlay**, so you can see where the triangles actually went
- **Preview lighting** — light type, environment, tone mapping, floor and shadows, applied identically to both sides
- **A quality score** — instead of eyeballing it, get the difference between source and result back as a number
- **Every baked texture**, shown as it came out

<img src="https://cloud.needle.tools/-/media/YK_W-UvRZGYtoMsMx_NSBw.gif" alt="A 3,200,000 triangle bust of Nefertiti beside its 3,000 triangle baked result in the Needle Mesh Baker's two linked viewers" loading="lazy" />

*The model on the left has 3,200,000 triangles. The model on the right has 3,000. That is a reduction of 99.9%.*

## Bake from the Needle Inspector

From **[Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension) 2.5** you can bake a mesh without leaving the scene it belongs to. Pick a mesh in any live three.js or Needle Engine scene, send it to the baker, and it opens here as if you had dropped the file yourself — every setting and comparison view works the same.

When the bake finishes, the result goes straight back into the running scene. There is no Apply step and no re-import: the scene updates, and you judge the optimized mesh in the place it will actually ship. Keep adjusting the budget and re-baking until it holds up.

The two windows talk to each other directly. The mesh does not travel through a server, and it is not uploaded any more than a dropped file is.

## Let an AI agent drive it

The baker registers itself as a set of [WebMCP](https://webmachinelearning.github.io/webmcp/) tools, so an AI agent in your browser can bake a model by calling them instead of clicking through the interface. Ask for what you want in plain language and watch it happen in the workbench in front of you.

> *"Load this model, get it under 10k triangles, show me the wireframe, and download it when it looks right."*

Agents can load a model from a URL or from your Needle Cloud library, change any build setting, run the bake, take screenshots of the before/after previews to check their own work, and download or upload the result. Screenshots matter here: a triangle count tells an agent that the model got smaller, not whether it still looks right.

**Where it works**

| Browser | Status |
|---|---|
| ChatGPT Atlas | Works out of the box |
| Microsoft Edge 147+ | Works out of the box |
| Chrome 149+ | Behind `chrome://flags/#enable-webmcp-testing` |
| Firefox, Safari | Not yet |

Since it is the <img class="inline-logo" src="/imgs/openai-logo.webp" title="ChatGPT" alt="ChatGPT" /> ChatGPT app's own browser doing the calling, this works directly — no server to run, no configuration, no separate MCP setup. On browsers without WebMCP nothing is registered and nothing is downloaded, so there is no cost to it being there.

Baking still happens entirely on your machine. An agent drives the same in-browser pipeline you do, and your model is no more uploaded than when you click the buttons yourself — with one exception: uploading a result to your Needle Cloud library sends it, and that only ever happens if you ask for it.

## Coming soon

These are in development and not yet available. If one of them is what your project needs, tell us at [hi@needle.tools](mailto:hi@needle.tools?subject=Needle%20Mesh%20Baker) — it helps us prioritize.

**Impostors.** For models that are far away or repeated many times — vegetation, crowds, distant architecture, dense scans — an alternative to reducing geometry that still lights and shadows like the real thing, at a fraction of the cost.

**Animated and skinned assets.** Today a skinned mesh is baked in the pose it arrives in and the result is static. Keeping rigs and animations through the bake is something we are working on.

**Gaussian splat baking.** Bring a `.ply` splat capture and turn it into a regular textured mesh — one that loads and renders like any other glTF asset, with no special runtime needed.

**3D model generation.** Create a model from scratch inside the baker — free, and running on your own machine like everything else here — then take it through the same optimization and comparison workflow as anything you bring yourself.

**Quad remeshing.** A clean quad topology for the workflows that need one, rather than the triangles a real-time renderer is happy with.

**Vertex color bakes with PBR.** Appearance carried in the vertices instead of a texture, for models small enough that a texture is the larger half of the file.

## Downloads and licensing

Everything up to the download is free. You can bring as many models as you like, bake them, and compare the results before deciding whether it is worth anything to you.

| | Free | Mesh Baker |
|---|---|---|
| Load models, bake, preview, compare | ✅ | ✅ |
| Quality metrics and channel inspection | ✅ | ✅ |
| Drive it with an AI agent | ✅ | ✅ |
| **Download the baked `.glb`** | — | ✅ |
| Upload results to Needle Cloud | — | ✅ |
| Needle account required | — | free account |

### What it costs

**A one-time purchase with lifetime access.** No subscription, no seats to renew — it stays yours. The current price, and any running discount, is shown in the purchase dialog.

Already have **[Needle Engine Pro](https://needle.tools/pricing)**? The Mesh Baker is included. Sign in and it unlocks.

### What you get after that

**Every update, at no extra cost.** The baker is developed continuously, and what is [coming next](#coming-soon) arrives as part of the purchase you already made — not as a new product to buy again.

### Batch and CI use

A **command-line version** is available on request, so baking can run as a build step or over a whole folder of models instead of one at a time. It is licensed separately — write to [hi@needle.tools](mailto:hi@needle.tools?subject=Needle%20Mesh%20Baker%20CLI).

## Requirements

- Works best on a desktop browser — Chrome, Edge or another Chromium-based browser. On a phone the workbench says so and lets you continue anyway
- Baking uses your graphics card, so a machine that can run 3D content comfortably will bake comfortably
- Everything runs locally, which means no upload wait and no queue — bake times and the size of model you can handle depend on your machine

## FAQ

### Is my model uploaded to Needle?

**No.** Import, geometry reduction, texture baking and preview all run inside your browser, on your machine. The model file is read locally and the result is written to a local download. It is never sent to Needle or to any other server.

The only network traffic involving model data goes the *other* way: if you sign in and pick an asset from your own Needle Cloud library, that file is downloaded to your browser. Nothing you bake is sent back.

### Do you collect mesh names, material names or file names?

**No.** Object, mesh, material, texture and file names are never collected — nor is any geometry, any texture, or any part of your file's contents.

The baker does send usage statistics, kept deliberately coarse: enough to see what kind of models people bring and which settings get used, not enough to identify a model. While you are signed in they are linked to your Needle account, the same way the rest of your account activity is.

- Size, triangle and vertex counts as ranges (*5–10MB*, *200k–1M*), never exact numbers
- How many meshes and materials a model has
- Whether things like normals, UVs, vertex colors or skinning are present
- The file type, and the settings you picked
- Milestones — model loaded, bake started, bake finished, result downloaded

Failures also report a shortened error message so we can fix what broke.

### Do I need an account to try it?

No. You only need an account when you want to **download** a result, or to browse your Needle Cloud assets. Everything else works signed out.

### Does it work offline?

The page itself has to load once, but the baking pipeline does not talk to a server, so the actual work does not depend on your connection.

### Where can I use the results?

Anywhere. The output is industry-standard glTF with PBR materials, so it opens in Needle Engine, three.js, React Three Fiber, Blender, Unity, or any other software that reads glTF. Nothing about it is Needle-specific.

The baked textures come out uncompressed, so they stay sharp for whatever you do next. Run them through your usual texture compression on the way into your project — a Needle Engine production build does this for you and converts them to GPU-compressed KTX2 automatically. See [Optimization & Compression](/docs/how-to-guides/optimization/).

### How does this relate to progressive loading?

They solve different halves of the problem, and they compose. The baker decides **how detailed the asset is at all** — bring the source down to the highest quality you would ever want on screen. [Progressive loading](/docs/how-to-guides/optimization/progressive-loading-and-lods) then decides **how much of that arrives when**, streaming the detail in as it is needed.

Bake first: progressive loading of an unoptimized model still delivers every triangle eventually.

### Can I bake animated or skinned characters?

Not yet. A skinned mesh is baked in the pose it arrives in, and the output is static — so for characters, bake a distant LOD and keep the animated original for close range. Carrying rigs and animations through the bake is [in development](#coming-soon).

### My model looks wrong after baking. What should I change?

Start with how the model is simplified. Rebuilding the surface is the better default for scans, CAD and models with broken geometry, but it can round off sharp edges — for something clean and deliberately modelled, reduce its own triangles instead. If small parts vanish, protect them from the budget. If hard edges soften, tell the baker to defend them. And look at the result with the wireframe and the channel views before blaming the triangle budget: a texture problem can look a lot like a geometry problem.

### Can I run it in my own pipeline or CI?

Yes — a command-line version exists for exactly that, so baking can run as a build step or over a whole folder of models. It is licensed separately: write to [hi@needle.tools](mailto:hi@needle.tools?subject=Needle%20Mesh%20Baker%20CLI).

### Is it a subscription?

No. One-time purchase, lifetime access, and updates are included as the baker keeps being developed. It also comes with [Needle Engine Pro](https://needle.tools/pricing) if you already have that.

### Who builds it?

Needle — the team behind [Needle Engine](/docs/), the [Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension), and the Unity and Blender integrations. The people building it are industry professionals with 15+ years in real-time 3D, and the baker exists because we kept hitting the same problem in our own production work.

## Next Steps

- [Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension) — inspect, debug and live-edit three.js scenes in your browser
- [Optimization & Compression](/docs/how-to-guides/optimization/) — texture compression, mesh compression, progressive loading and LODs
- [Needle Engine + three.js](/docs/three/) — using Needle Engine in three.js projects

<style>
/* The OpenAI mark is black on transparent, so it disappears against the dark
   theme unless it is flipped. */
.inline-logo {
  display: inline;
  height: 1.05em;
  vertical-align: -0.14em;
}
html.dark .inline-logo { filter: invert(1); }
</style>
