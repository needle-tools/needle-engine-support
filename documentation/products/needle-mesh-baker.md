---
title: Needle Mesh Baker — Generate, Optimize and Bake 3D Models
description: Generate 3D models, simplify meshes while keeping UVs and textures, bake PBR maps, create impostors and optimize animated assets locally in your browser.
image: https://cloud.needle.tools/-/media/cFXofjsyv3nAGCJOZvFGsw.gif
---

# Needle Mesh Baker

The **Needle Mesh Baker** generates and optimizes 3D models in your browser. It reduces triangles and draw calls, bakes appearance into textures or vertex colors, rebuilds difficult geometry, and optimizes skinned meshes while preserving their rigs and animation clips.

- **Built to render fast** — fewer triangles and draw calls, with potentially smaller files
- **Animation-aware** — preserve a skinned mesh and its clips, optimize an authored pose, or freeze a selected animation frame
- **Multiple geometry methods** — simplify authored topology, voxel-remesh difficult assets, create a conservative outer wrap, or bake textures without changing geometry
- **Keeps visible detail** — use geometry for the silhouette and bake fine color and shading detail onto the reduced result
- **Bake on your GPU** — process complex models without an upload or processing queue. Bake times depend on your hardware and settings
- **No model? Generate one** — describe what you want, or drop in a single image, and the baker builds a 3D model from it, then optimizes it in the same place. That runs on your own GPU too
- **[WebMCP ready](#let-an-ai-agent-drive-it)** — use the ChatGPT app to directly control and use the Mesh Baker. Generate an image in ChatGPT, turn it into a 3D model in the baker, then optimize and compare the result — all in one conversation
- **Local processing** — models are processed in your browser. Uploading a result to Needle Cloud is optional ([privacy details](#is-my-model-uploaded-to-needle))
- **Yours to download** — results are `.glb` files; standard meshes work in glTF viewers, while advanced impostor and rig effects need matching Needle support

Drop in a model — or generate one — set a triangle budget, and compare the result against the source before you download it.

**[Open the Needle Mesh Baker →](https://mesh-baker.needle.tools)**

<img src="https://cloud.needle.tools/-/media/cFXofjsyv3nAGCJOZvFGsw.gif" alt="The Needle Mesh Baker workbench, comparing an 800,000 triangle source model with the 6,000 triangle result side by side" />

*The model on the left has 800,000 triangles. The model on the right has 6,000.*

## Quick Start

1. Open [mesh-baker.needle.tools](https://mesh-baker.needle.tools) in your browser
2. Drop a `.glb`, `.gltf`, `.obj`, `.fbx`, `.ply` or `.zip` onto the page — or load a model from your Needle Cloud library
3. Set your triangle budget under **Geometry**, or switch to targeting a maximum surface error
4. Press **Optimize asset**, then compare the result against the source in the two linked viewers
5. **Download** the result as a `.glb`

:::tip Local processing
Importing local files, baking, previewing and comparing all happen on your machine. Results are only uploaded to Needle Cloud when you choose to upload them. See [Is my model uploaded to Needle?](#is-my-model-uploaded-to-needle)
:::

## What it produces

The result is a `.glb` whose content depends on the workflow: a reduced mesh with baked appearance, an animated asset with its rig and clips, an impostor, or a remeshed surface. It is useful for LODs, animated characters, background props, scans, CAD imports and models with more triangles, materials or draw calls than they need.

<image-slides
  ratio="1920/1020"
  :images="[
    { src: '/docs/mesh-baker/bear.webp', alt: 'A 1,900,000 triangle sculpted bear beside its 6,000 triangle baked result in the Needle Mesh Baker, wireframe shown on the result', caption: 'A sculpt: 1,900,000 triangles down to 6,000, a 99.7% reduction.' },
    { src: '/docs/mesh-baker/vase.webp', alt: 'A 540,000 triangle ornamented vase beside its 640 triangle baked result in the Needle Mesh Baker, wireframe shown on the result', caption: 'Relief detail on a vase: 540,000 triangles down to 640, a 99.9% reduction.' },
    { src: '/docs/mesh-baker/warrior.webp', alt: 'A 1,900,000 triangle character with two swords beside its 10,000 triangle baked result in the Needle Mesh Baker, wireframe shown on the result', caption: 'A character: 1,900,000 triangles down to 10,000, a 99.5% reduction.' },
    { src: '/docs/mesh-baker/goblin.webp', alt: 'An 850,000 triangle goblin figurine beside its 2,500 triangle baked result in the Needle Mesh Baker, wireframe shown on the result', caption: 'A figurine: 850,000 triangles down to 2,500, a 99.7% reduction.' },
    { src: '/docs/mesh-baker/backpack.webp', alt: 'A 700,000 triangle leather backpack beside its 4,400 triangle baked result in the Needle Mesh Baker', caption: 'A scanned prop: 700,000 triangles down to 4,400, a 99.4% reduction.' },
    { src: '/docs/mesh-baker/nefertiti.webp', alt: 'A 3,200,000 triangle photogrammetry bust of Nefertiti beside its 2,400 triangle baked result in the Needle Mesh Baker', caption: 'A photogrammetry scan: 3,200,000 triangles down to 2,400, a 99.9% reduction.' },
    { src: '/docs/mesh-baker/knight.webp', alt: 'A 1,000,000 triangle golden knight statue beside its 5,800 triangle baked result in the Needle Mesh Baker', caption: 'A polished metal statue: 1,000,000 triangles down to 5,800, a 99.4% reduction.' }
  ]"
/>

- **Far fewer draw calls** — however many meshes and materials went in, usually one mesh with one material comes out. Surfaces that have to be drawn differently, such as transparent ones, stay separate. On scenes built from many small parts this is often the bigger win, not the triangle count
- **Set a triangle budget**, or ask instead for a maximum deviation from the original surface and let the baker find the triangle count
- **Four geometry methods** — simplify authored topology, rebuild it on a voxel grid, create a watertight outer wrap, or keep the geometry and bake textures only
- **Optional quad remeshing** — target a quad count during remeshing; the exported glTF triangulates the faces because glTF stores triangles
- **Three material representations** — a detailed PBR atlas, a small stylized gradient atlas, or vertex colors without texture files
- **Other representations** — octahedral impostors for distant objects and pixel impostors for intentionally blocky, pixel-scale objects
- **Skinned mesh and animation optimization** — retain rigs and clips while measuring simplification across sampled poses
- **Baked PBR textures** — base color, normal, roughness, metallic, emissive, opacity, and optional ambient occlusion, up to 4K
- **Live preview** — drag the budget and watch the mesh change, so you can find the right number before running a full bake
- **Tuning where it matters** — how hard edges are treated, whether small parts are protected from the budget, and how much of the original silhouette to preserve

<img src="https://cloud.needle.tools/-/media/hTfJmobS6DTDa6WWbe-GRg.gif" alt="Dragging the triangle budget in the Needle Mesh Baker while the wireframe result updates live, 1,328,920 triangles down to 6,830" loading="lazy" />

*You drag the triangle budget, and the result rebuilds while you drag. This model goes from 1,328,920 triangles to 6,830.*

## Why this is not just decimation

A sculpt can carry fine detail as geometry, from scratches to feathers and bolts. At large reductions, simplification alone can lose that surface detail. Baking preserves much of it in textures on the reduced mesh.

The workflow is to create a web-ready mesh, give it new UVs and tangents, then transfer the original's surface appearance into textures. A normal map recreates fine detail through shading. Larger shapes and the silhouette still depend on the mesh.

The baker combines simplification, UV creation and texture baking in one step, including tangent-space and normal-map setup.

<img src="https://cloud.needle.tools/-/media/XEutsc3aScR4WdGjPOPlQQ.gif" alt="Dragging the key light around in the Needle Mesh Baker: the 3.1 million triangle source and the 5,914 triangle result catch the light the same way" loading="lazy" />

*The key light moves across both models. The result has 5,914 triangles, so its detail comes from the baked normal map and not from geometry.*

## Getting models in

| Source | Notes |
|---|---|
| `.glb` / `.gltf` | Loaded directly |
| `.obj` + `.mtl` + textures | Select all files together |
| `.fbx` | Loaded directly |
| `.ply` | Triangle mesh or Gaussian splat cloud; a splat cloud is reconstructed into a mesh before baking |
| `.zip` | An archive containing any of the above, with relative paths preserved |
| Needle Cloud | Sign in to pick a model from your own asset library |

Skinned `.glb`, `.gltf` and `.fbx` assets can retain their skin, hierarchy and animation clips. Animation mode controls whether optimization measures all clips, uses only the authored pose, or freezes the selected preview frame into static geometry.

## Geometry methods

Choose the method that matches the source asset and the result you need:

- **Simplify** reduces the source topology to a triangle target or measured surface-error target. It is the best fit for clean, deliberately authored meshes.
- **Voxel remesh** rebuilds topology on a voxel grid before reduction. It can combine disconnected parts and clean up scans, generated assets, CAD imports and broken geometry.
- **Wrap** creates a watertight conservative outer shell. Controls for minimum hole size and offset help produce robust collision meshes, proxy geometry and aggressive low-detail representations.
- **Bake textures only** keeps the source geometry while rebaking its appearance, which is useful when material and draw-call cost—not topology—is the main problem.

For quad remeshing, choose **Quads** under geometry topology and set a quad budget. The GLB stores triangulated faces for compatibility, while the baker reports the quad count. The GLB does not preserve editable quad faces, and a triangle target and quad target are different budgets.

### Keep existing UVs and textures while reducing the mesh

Yes. Choose **Mesh** as the representation, **Geometry → Method → Simplify**, **Mesh Type → Triangles**, and **Bake → Materials → Keep source materials**. Then set a triangle target or surface-error limit and run **Optimize asset**. This reduces the existing mesh without creating a new texture atlas. The result keeps its source materials, textures and UV layout.

The control targets **triangles**, not an exact vertex count. Vertex count usually falls too, but UV seams and material boundaries can require extra vertices. At very low triangle budgets, some UV seams may need to move to reach the target, so inspect the textured result before downloading. Keeping source materials also keeps their separate draw calls; choose **Merge and bake** if reducing material count matters more than reusing the original UVs.

## Choose the output representation

For a model seen up close, start with a mesh and PBR textures. Use an impostor when the object will usually occupy a small area of the screen. Choose a pixel impostor when the blocky look itself is the goal.

| Representation | Use it when | Output and runtime |
|---|---|---|
| **Mesh with PBR atlas** | You need the closest general-purpose replacement for the source. | Standard glTF mesh and PBR textures; no custom loader. |
| **Mesh with gradient trims** | A tiny LOD matters more than preserving every surface detail. | Small, stylized color/material atlas and geometric normals; no custom loader. |
| **Mesh with vertex colors** | Texture payload dominates a very small asset. | Appearance on vertices, without baked texture files; the color boundaries may need additional vertices. |
| **Octahedral impostor** | A distant prop or repeated object needs a convincing view-dependent substitute. | A GLB with a visible fallback; its full camera-dependent effect needs the Needle impostor loader. |
| **Pixel impostor** | You want a deliberately voxel or pixel-art silhouette, including oblique views. | A GLB with a solid voxel fallback; additional display modes need the Needle pixel-impostor loader. |

Impostors are separate output modes for objects usually seen at a distance or repeated many times. An ordinary glTF viewer displays their fallback, while a supporting viewer displays the full effect. For octahedral impostors, more captured views improve transitions but use more texture space. Pixel impostors have an intentionally blocky silhouette.

The **PBR atlas** can transfer base color, normal, roughness, metallic, emissive and opacity, with optional ambient occlusion. **Gradient trims** keep a small stylized atlas and omit the fine normal texture. **Vertex colors** remove texture payloads and bake the selected appearance onto the reduced vertices. Pick the representation before assuming a texture-resolution change will make the file smaller.

## Reduce materials and draw calls

A model can have a reasonable triangle count and still render slowly because every material or primitive adds another draw call. Mesh Baker can atlas compatible source materials and bake their base color, normal, roughness, metallic, emissive, opacity and ambient occlusion into a consolidated result.

For compatible static workflows this can turn many input draw calls into one. Document-preserving workflows can instead retain materials and hierarchy when those are more important than maximum consolidation. The workbench reports input and output draw calls so the result is measurable rather than assumed.

## Animation baking and skinned mesh optimization

Mesh Baker supports animation-aware optimization for skinned 3D assets, including glTF/GLB and FBX. You can preview clips and poses before baking, then choose how motion affects the result:

- **Optimize for clips** samples the animations, retains the rig and clips, and protects geometry needed across the poses.
- **Ignore clips** retains the animated document but optimizes against its authored pose.
- **Freeze pose** converts the selected animation frame into a static optimized asset.

Animation-aware surface-error targeting can decide how many triangles are necessary instead of forcing one fixed budget. This makes the workflow useful for animated characters and moving props as well as static assets.

**Parts to skin** handles a different input: a model animated as separate rigid objects. It creates a skinned GLB and retains the animation clips, which can reduce the draw calls of articulated props and mechanical assets. The parts keep their rigid motion; the conversion does not invent soft bending between them.

## Generate or reconstruct a source

The **Generate** panel can make a model from a text prompt or an image on a compatible desktop GPU. Image generation is the better choice when you have a clean picture of one object; text generation is useful for drafts or when no reference image exists. The first run downloads model weights and can take much longer than later runs. Check the in-app capability and download estimate before starting. This is local GPU processing, not a cloud generation queue.

For image generation, remove the background so the object has real transparency. A photographed background can become part of the reconstructed shape; a painted checkerboard is not transparency. The workbench can cut out a chosen image, and its experimental phone-camera flow can send a photo to the desktop for cutout and review before generation. Up to three additional, consistent views of the **same** object can guide an agent-triggered image generation. Different AI interpretations of an object are poor extra views.

Generated models and imported Gaussian-splat `.ply` files can be remeshed and baked like other sources. A Gaussian capture can become a regular textured GLB that does not need a splat renderer in the destination app. This route is for opaque captures; translucent Gaussian volumes are not yet supported.

## Segment, rig and pose a model

**Smart mesh segmentation** finds likely parts from the model's shape and appearance. Use **Parts → Auto** or request a part count, preview the colored regions, then select and merge parts where needed. This is currently an inspection and editing workflow; exporting the proposed parts as separate GLB objects is not yet available.

Under **Experiments → Show Deformation settings**, you can suggest or place pins, adjust a rig with IK handles, mirror edits and author pose slots. **Wiggle** previews secondary motion. Download exports a skinned GLB with standard joints, weights and pose clips. Other glTF readers can play those clips; live IK and secondary motion need Needle's rig runtime. This editor is experimental and needs a compatible WebGPU device.

## Comparing before and after

Optimization is only worth it if you can see what it cost you. The workbench is built around two viewers with synchronized cameras — source on the left, result on the right:

- **Isolate any channel** — the finished result, the bare mesh, or a single map such as base color, normal or roughness
- **Wireframe overlay**, so you can see where the triangles actually went
- **Preview lighting** — light type, environment, tone mapping, floor and shadows, applied identically to both sides
- **A quality score** — measure the difference between source and result alongside your visual comparison
- **Every baked texture**, shown as it came out

If surface detail disappears, raise the geometry budget or use a full PBR atlas. If the file is still too large, try a smaller texture or a compact material mode. If the silhouette is wrong, texture resolution will not fix it.

<img src="https://cloud.needle.tools/-/media/YK_W-UvRZGYtoMsMx_NSBw.gif" alt="A 3,200,000 triangle bust of Nefertiti beside its 3,000 triangle baked result in the Needle Mesh Baker's two linked viewers" loading="lazy" />

*The model on the left has 3,200,000 triangles. The model on the right has 3,000. That is a reduction of 99.9%.*

## Bake from the Needle Inspector

From **[Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension) 2.5** you can bake without leaving the scene the mesh belongs to.

Drag whatever you want from the hierarchy into a group — one object or a hundred — and bake each group on its own. A group comes back as one mesh, with transparent surfaces kept apart from opaque ones because they cannot share a material. A scene built from many small parts loses most of its draw calls along with its triangles.

The result goes straight back into the running scene. There is no Apply step and no re-import, and a toggle switches between the original and the baked version so you can compare the two in place, at the size and lighting they will actually ship with. Adjust the budget, bake again, toggle again.

The two windows talk to each other directly. The mesh does not travel through a server, and it is not uploaded any more than a dropped file is.

## Let an AI agent drive it

The baker registers itself as a set of [WebMCP](https://webmachinelearning.github.io/webmcp/) tools, so an AI agent in your browser can bake a model by calling them instead of clicking through the interface. Ask for what you want in plain language and watch it happen in the workbench in front of you.

> *"Load this model, get it under 10k triangles, show me the wireframe, and download it when it looks right."*

<!-- crop: the recording captured the app window's own rounded corners and 1px
     border, which are baked into the frames — trim them so only the page's
     corner radius shows. -->
<video-embed src="https://cloud.needle.tools/-/media/Iv9obHDJ2EXU2jcs84PcGg.mp4" :crop="8" shadow outline />

*ChatGPT calling the baker's WebMCP tools: it loads the model, sets the budget, runs the bake and checks the result — in the same workbench you would have clicked through yourself.*

An agent can load a model from a URL, a file supplied in the conversation or your Needle Cloud library. It can inspect the workbench state, choose supported settings, bake, read the report and compare screenshots before saving. A triangle count shows that the model got smaller; the screenshot helps check whether it still looks right. Downloads and uploads follow the same account and license rules as the workbench controls.

**Generation is a tool too.** An agent can ask the baker to build a model from a description or an image and then optimize it, all in one conversation — or hand over a reference image it made itself, like the <img class="inline-logo" src="/imgs/openai-logo.webp" title="ChatGPT" alt="ChatGPT" /> ChatGPT app does. On a compatible machine, it can check the model-weight download before starting, refine a generation and try a new surface on the same shape. The generated model uses the same remeshing and baking controls as an imported model.

**Where it works**

| Browser | Status |
|---|---|
| ChatGPT Atlas | Works out of the box |
| Microsoft Edge 147+ | Works out of the box |
| Chrome 149+ | Works out of the box |
| Firefox, Safari | Not yet |

WebMCP is still being standardized, so Chrome only exposes it to sites carrying an origin-trial token. The baker ships one, which is why it works there without you turning on a flag.

Since it is the <img class="inline-logo" src="/imgs/openai-logo.webp" title="ChatGPT" alt="ChatGPT" /> ChatGPT app's own browser doing the calling, this works directly — no server to run, no configuration, no separate MCP setup. On browsers without WebMCP nothing is registered and nothing is downloaded, so there is no cost to it being there.

Baking still happens entirely on your machine. An agent drives the same in-browser pipeline you do. Uploading a result to Needle Cloud requires your request. Information returned to your agent, such as preview screenshots or model data you ask it to retrieve, is handled by that agent and its provider.

## Use it in a build pipeline

The separately licensed CLI can run mesh bakes, parts-to-skin conversion, impostor bakes and impostor texture compression over files. It is useful for repeatable LOD generation and asset processing in CI; contact [hi@needle.tools](mailto:hi@needle.tools?subject=Needle%20Mesh%20Baker%20CLI) about batch or service licensing.

For a model headed to another 3D app, check whether it supports the chosen output. Standard optimized meshes work as ordinary glTF. Full impostor effects need the matching Needle loader in the destination app.

See the live [Mesh Baker roadmap](https://mesh-baker.needle.tools/roadmap/) for work still in development.

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

**A one-time purchase with lifetime access.** No subscription, no seats to renew, no limit on how many models you bake — it stays yours. The current price, and any running discount, is shown in the purchase dialog.

Already have **[Needle Engine Pro](https://needle.tools/pricing)**? The Mesh Baker is included. Sign in and it unlocks.

### What you get after that

**Updates are included.** The baker is developed continuously; see the [live roadmap](https://mesh-baker.needle.tools/roadmap/) for features in development.

### Batch and CI use

A **command-line version** is available on request, so baking can run as a build step or over a whole folder of models instead of one at a time. It is licensed separately — write to [hi@needle.tools](mailto:hi@needle.tools?subject=Needle%20Mesh%20Baker%20CLI).

## Requirements

- The workbench works best on a desktop Chromium browser such as Chrome or Edge. A phone can open the workbench, but some features are unavailable there
- Baking uses your computer's graphics hardware when available. Image and text generation require a compatible desktop WebGPU device
- Local processing has no model-upload queue; bake time and the model size you can handle depend on your machine and settings

## FAQ

### Do I need an account to try it?

No. Loading local files, baking and comparing results work signed out. You need an account to **download** a result, browse your Needle Cloud assets or upload a result to Needle Cloud.

### Is it a subscription?

No. One-time purchase, lifetime access, and updates are included as the baker keeps being developed. It also comes with [Needle Engine Pro](https://needle.tools/pricing) if you already have that.

### Is there a limit on how many models I can bake?

**No.** The browser version has no limit — not per month, and not in total. Load as many models as you want and bake them as often as you want. Processing runs on your machine, with no per-model usage quota.

This covers interactive use in the browser, including asking an AI agent to operate the workbench for you. Batch processing, CI build steps and services that bake models for other people require the separately licensed [command-line version](#batch-and-ci-use).

### Is my model uploaded to Needle?

**Not for baking.** Importing local files, geometry reduction, texture baking and preview all run inside your browser. You can save the result as a local download.

Loading an asset from Needle Cloud downloads it to your browser. Choosing to upload a result sends the model and its file name to your Needle Cloud library. This is optional and is not required to bake or download locally.

### Do you collect mesh names, material names or file names?

Usage events do not include object, mesh, material, texture or file names, or geometry and texture data. If you choose to upload a result to Needle Cloud, the upload includes the model and its file name.

The baker sends coarse usage statistics to understand which model sizes, features and settings people use. While you are signed in they are linked to your Needle account, the same way the rest of your account activity is.

- Size, triangle and vertex counts as ranges (*5–10MB*, *200k–1M*), never exact numbers
- Mesh and material counts, grouped into ranges
- Whether things like normals, UVs, vertex colors or skinning are present
- The file type, and the settings you picked
- Milestones — model loaded, bake started, bake finished, result downloaded

Failures also report a shortened error message so we can fix what broke. Error messages can contain names or paths supplied by a loader or browser; shortening a message does not remove that information.

### Does it work offline?

Once the page and a model are loaded, an active bake does not need a processing server. Opening the site, loading a Cloud asset, uploading a result, or downloading generation weights needs a connection.

### Where can I use the results?

Standard mesh bakes use glTF meshes and PBR materials, so they open in Needle Engine, three.js, React Three Fiber, Blender, Unity and other glTF readers. Skinned exports also use standard glTF skins and animation clips.

Octahedral and pixel impostors include visible fallback geometry. Their full camera-dependent appearance requires the matching Needle loader in the destination app. An experimental rig's skin and pose clips work without its runtime, but live IK and secondary motion need Needle's rig support. Check the [output representation table](#choose-the-output-representation) before promising identical appearance in every viewer.

PBR mesh atlases normally come out uncompressed so they remain suitable for later processing. Run them through your usual texture compression on the way into a project — a Needle Engine production build can convert them to GPU-compressed KTX2. Impostor textures also have a separate compression workflow. See [Optimization & Compression](/docs/how-to-guides/optimization/).

### Do I own the results? Can I use them commercially?

**Yes.** Your source model stays yours, and the result is yours too — both baked models and generated ones. Use them commercially, ship them in a product, sell them, or redistribute them. There are no royalties, no revenue share, and no attribution requirement. Needle takes no rights to your models or your results.

Baking does not change who owns the source. A model that you bought from a marketplace, or that another artist made, keeps the license it came with. Generation does not create rights either. If you have no right to the image you used, or to the character you asked for, you have no right to the model that comes out. You are responsible for what you put into the baker and for what you do with the result. See the [EULA](https://needle.tools/eula).

### Can I bake animated or skinned characters?

Yes. For a skinned or animated glTF/GLB or FBX asset, choose **Optimize for clips** to retain the rig and animation clips while the baker samples motion during optimization. Choose **Ignore clips** to retain the animated document while optimizing its authored pose, or **Freeze pose** when you want a static result from one selected animation frame.

### Can I reduce triangles without rebaking my textures?

Yes. Choose **Simplify** under Geometry and **Keep source materials** under Bake. The result reuses your textures and UV layout instead of making a new atlas. See [Keep existing UVs and textures while reducing the mesh](#keep-existing-uvs-and-textures-while-reducing-the-mesh) for the full settings and low-budget caveat.

### My model looks wrong after baking. What should I change?

Start with how the model is simplified. Rebuilding the surface is the better default for scans, CAD and models with broken geometry, but it can round off sharp edges — for something clean and deliberately modelled, reduce its own triangles instead. If small parts vanish, protect them from the budget. If hard edges soften, adjust the settings to preserve them. And look at the result with the wireframe and the channel views before changing the triangle budget: a texture problem can look a lot like a geometry problem.

### How does this relate to progressive loading?

They solve different halves of the problem, and they compose. The baker decides **how detailed the asset is at all** — bring the source down to the highest quality you would ever want on screen. [Progressive loading](/docs/how-to-guides/optimization/progressive-loading-and-lods) then decides **how much of that arrives when**, streaming the detail in as it is needed.

Bake first: progressive loading of an unoptimized model still delivers every triangle eventually.

### Can I run it in my own pipeline or CI?

Yes — a command-line version exists for exactly that, so baking can run as a build step or over a whole folder of models. It is licensed separately: write to [hi@needle.tools](mailto:hi@needle.tools?subject=Needle%20Mesh%20Baker%20CLI).

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
