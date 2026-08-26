---
title: Needle Mesh Baker — Optimize 3D Models in the Browser
description: Reduce a model's triangle count and bake its appearance into textures — 800,000 triangles down to 6,000, and it still looks the same. Runs in your browser; nothing is uploaded.
image: https://cloud.needle.tools/-/media/cFXofjsyv3nAGCJOZvFGsw.gif
---

# Needle Mesh Baker

The **Needle Mesh Baker** reduces a model's triangle count and bakes its appearance into textures. The result is a single mesh with a single material that still looks like the original.

- **Built to render fast** — far fewer triangles, one draw call instead of many, a smaller download
- **Keeps the look** — the silhouette is held onto while triangles come off, and color, normals, roughness and metallic are baked into the textures
- **Quick to bake** — it runs on your own GPU, so there is no upload to sit through and no queue to wait in
- **100% local** — your model never leaves your machine ([really](#is-my-model-uploaded-to-needle))
- **Yours to download** — the finished mesh comes back as a plain `.glb`

Drop in a model, set a triangle budget, and compare the result against the source before you download it.

**[Open the Needle Mesh Baker →](https://mesh-baker.needle.tools)**

<img src="https://cloud.needle.tools/-/media/cFXofjsyv3nAGCJOZvFGsw.gif" alt="The Needle Mesh Baker workbench, comparing an 800,000 triangle source model with the 6,000 triangle result side by side" />

*800,000 triangles on the left, 6,000 on the right.*

## Quick Start

1. Open [mesh-baker.needle.tools](https://mesh-baker.needle.tools) in your browser
2. Drop a `.glb`, `.gltf`, `.obj`, `.fbx` or `.zip` onto the page — or load a model from your Needle Cloud library
3. Set your triangle budget under **Geometry**, or switch to targeting a maximum surface error
4. Press **Bake**, then compare the result against the source in the two linked viewers
5. **Download** the result as a `.glb`

:::tip Nothing is uploaded
Loading, baking, previewing and comparing all happen locally, on your machine. No geometry, no textures and no file names are sent anywhere. See [Is my model uploaded to Needle?](#is-my-model-uploaded-to-needle)
:::

## What it produces

A single reduced mesh with the appearance of the original baked onto it. Useful for LODs, background props, kitbashed scans, CAD imports and anything with more triangles or materials than it deserves.

- **Set a triangle budget**, or ask instead for a maximum deviation from the original surface and let the baker find the triangle count
- **Two ways to simplify** — rebuild the surface from scratch, which cleans up messy or broken source models, or reduce the model's own triangles and keep the structure it was authored with
- **Baked PBR textures** — base color, normal, roughness, metallic, emissive, opacity, and optional ambient occlusion, up to 4K
- **Live preview** — drag the budget and watch the mesh change, so you can find the right number before running a full bake
- **Tuning where it matters** — how hard edges are treated, whether small parts are protected from the budget, and how much of the original silhouette to defend

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

## Coming soon

These are in development and not yet available. If one of them is what your project needs, tell us at [hi@needle.tools](mailto:hi@needle.tools?subject=Needle%20Mesh%20Baker) — it helps us prioritize.

**Baking straight from the [Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension).** Pick a mesh in a live three.js or Needle Engine scene, send it to the baker, and have the finished result go straight back into the running scene — no download, no re-import, and the optimized mesh judged in the context it actually ships in.

**Impostors.** For models that are far away or repeated many times — vegetation, crowds, distant architecture, dense scans — an alternative to reducing geometry that still lights and shadows like the real thing, at a fraction of the cost.

**Animated and skinned assets.** Today a skinned mesh is baked in the pose it arrives in and the result is static. Keeping rigs and animations through the bake is something we are working on.

**Gaussian splat baking.** Bring a `.ply` splat capture and turn it into a regular textured mesh — one that loads and renders like any other glTF asset, with no special runtime needed.

**3D model generation.** Create a model from scratch inside the baker, and take it through the same optimization and comparison workflow as anything you bring yourself.

## Downloads and licensing

**Loading, baking, previewing and comparing are free** — bring as many models as you like and take the tool as far as you want before deciding anything.

**Downloading a baked result** needs a free Needle account plus the Mesh Baker itself — **a one-time purchase with lifetime access. No subscription, and it stays yours.** It is also **included with [Needle Engine Pro](https://needle.tools/pricing)**, so if your team already has a Pro license, just sign in. The current price and any running discount are shown in the purchase dialog.

The baker is **developed continuously** — it gets better over time, and updates come with the purchase you already made. What is [coming next](#coming-soon) is not a separate product to buy again.

A **command-line version** is available on request, so you can integrate baking into your own asset pipeline or CI and process models in batches instead of one at a time. Get in touch at [hi@needle.tools](mailto:hi@needle.tools?subject=Needle%20Mesh%20Baker%20CLI).

## Requirements

- A desktop browser — Chrome, Edge or another Chromium-based browser is recommended
- Baking uses your graphics card, so a machine that can run 3D content comfortably will bake comfortably
- Everything runs locally, which means no upload wait and no queue — bake times and the size of model you can handle depend on your machine

## FAQ

### Is my model uploaded to Needle?

**No.** Import, geometry reduction, texture baking and preview all run inside your browser, on your machine. The model file is read locally and the result is written to a local download. It is never sent to Needle or to any other server.

The only network traffic involving model data goes the *other* way: if you sign in and pick an asset from your own Needle Cloud library, that file is downloaded to your browser. Nothing you bake is sent back.

### Do you collect mesh names, material names or file names?

**No.** Object, mesh, material, texture and file names are never collected — nor is any geometry, any texture, or any part of your file's contents.

The baker does send anonymous usage statistics, kept deliberately coarse: enough to see what kind of models people bring and which settings get used, not enough to identify a model.

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

Baked meshes are ordinary glTF files: use them in Needle Engine, three.js, React Three Fiber, or any other engine that reads glTF.

The baked textures come out uncompressed, so they stay sharp for whatever you do next. Run them through your usual texture compression on the way into your project — a Needle Engine production build does this for you and converts them to GPU-compressed KTX2 automatically. See [Optimization & Compression](/docs/how-to-guides/optimization/).

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
