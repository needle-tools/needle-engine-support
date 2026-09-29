---
title: Needle Mesh Baker – Generate, Optimize and Bake 3D Models
description: Generate 3D models, reduce triangles and draw calls, bake PBR textures, optimize animated and skinned 3D assets, or rebuild geometry with voxel remeshing and conservative wrap mode — locally in your browser.
image: https://cloud.needle.tools/-/media/cFXofjsyv3nAGCJOZvFGsw.gif
---

# Mesh Baker

**Needle Mesh Baker** optimizes 3D models and their textures. It reduces triangles and draw calls, preserves appearance and lighting, rebuilds difficult geometry, and optimizes skinned meshes while preserving their animations.

Mesh Baker also comes with a bunch of technical artist tools: it can generate 3D meshes from images, produce hull meshes for realtime VFX (visual effects), pixelate/voxelate models for games, bake occlusion, thickness and cavity maps, and even has  features for posing and automatic rigging of arbitrary meshes.

Mesh Baker is intended do be used as part of typical production pipelines that require fast, accurate, optimized 3D assets. It can work with handcrafted assets or heavy AI-generated inputs, and fully leverages GPU acceleration for realtime feedback and fast optimization of meshes and textures.



:::tip Efficient optimization for your workflow
Mesh Baker can optimize geometry and meshes, and has lots of configuration options to tweak it for your particular pipeline and project. Especially for generative AI assets, you can easily achieve a 99% reduction in mesh complexity while retaining the visual appearance.
:::

## Features

- **Very fast.** Reduces triangles and draw calls at high speeds (seconds) with realtime mesh previews.
- **Simplification and voxel remeshing.** Simplify collapses edges on the existing meshes. Voxel remeshing combines multiple meshes into one. Hull meshes can be used for VFX like auras or ice. Or just bake textures without changing geometry (highpoly to lowpoly, lowpoly to lowpoly, ao).
- **Support for triangles and quads.** Choose depending on your workflow; for realtime, tris are usually the right choice!
- **Animation-aware optimization.** Optimize a skinned mesh based on the supplied animations.
- **Physically-based rendering support.** Preserves surface appearance for color, normals, roughness, metallic, occlusion, emission and more.
- **100% local, GPU-accelerated processing.** Process complex models privately and securely, on your machine.
- **Built-in Image-to-3D Generation.** Drop in an image, and the baker builds a 3D model from it using your GPU, then make it production ready right away.
- **[WebMCP ready](#mcp-integration-for-ai).** Use the ChatGPT app to control Mesh Baker directly from your agents.
- **Integrated with Needle Cloud.** You can pick models right from your Needle Cloud uploads, or upload optimized assets for sharing and management.
- **Industry-standard glTF import and export.** Optimized assets can be downloaded as plain `.glb` files, ready for any engine or workflow (three.js, Unity, Blender, Unreal, Godot, and more).

**[Open Needle Mesh Baker →](https://mesh-baker.needle.tools)**

<img src="https://cloud.needle.tools/-/media/cFXofjsyv3nAGCJOZvFGsw.gif" alt="Needle Mesh Baker workbench, comparing an 800,000 triangle source model with the 6,000 triangle result side by side" />

_Load a model, press Optimize. The demo model goes from 800,000 triangles to 6,000._

## Quick Start

1. Open [mesh-baker.needle.tools](https://mesh-baker.needle.tools) in your browser
2. Drop a `.glb`, `.gltf`, `.obj`, `.fbx` or `.zip` onto the page, or load a model from your Needle Cloud library
3. Set your triangle budget under **Geometry**, or switch to targeting a maximum surface error
4. Press **Optimize**, then compare the result against the source
5. **Download** the result as a `.glb`
:::tip Processing happens on your machine, 100% local
Importing local files, baking, previewing and comparing all happen on your machine. Even image-to-3D generation runs right in your browser. There is no server / backend. That also means: the more powerful your machine is, the faster Mesh Baker will be.
:::

## Overview

A dense model can store small details in its geometry. Examples include scratches, feathers, seams, and bolts. Geometry reduction removes some of this detail, and texture baking transfers the details to texture maps on the reduced mesh.

Mesh Baker creates the reduced mesh, UVs, and tangents. It then projects the source appearance onto the result. A normal map preserves small surface details in shading, the mesh controls large shapes and the silhouette.

You can also keep the source geometry and bake new materials only, reducing draw calls. Use this when material count and draw calls are the main problem, for example, when you have a model made out of many low-poly parts that share the same material.

![Dragging the key light around in the Needle Mesh Baker: the 3.1 million triangle source and the 5,914 triangle result catch the light the same way](https://cloud.needle.tools/-/media/XEutsc3aScR4WdGjPOPlQQ.gif)

_Normal maps preserve surface detail under changing lighting conditions, even for low-poly models._

### Input formats

Mesh Baker can load these formats:

| Input Format               | Notes                                                 |
| -------------------------- | ----------------------------------------------------- |
| `.glb` / `.gltf`           | Supports animations                                   |
| `.fbx`                     | Supports animations                                   |
| `.obj` + `.mtl` + textures | Select all files together                             |
| `.zip`                     | An archive containing any of the above                |
| Needle Cloud               | Pick a model from your own Needle Cloud asset library |

### Output formats

Mesh Baker exports a `.glb` file. The result depends on the selected geometry and material settings. It can contain:

- a reduced triangle mesh
- a quad-remeshed surface, triangulated for glTF export
- a voxel-remeshed surface
- a watertight outer wrap
- the source geometry with newly baked materials
- a skinned mesh with its rig and animation clips
- a pixel or voxel representation
- an octahedral impostor representation

Use these outputs for LODs, animated characters, background objects, scans, generated models, and CAD imports.

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

- Set a triangle or quad count, or set a maximum surface error.
- Merge compatible materials into one atlas to reduce draw calls.
- Keep transparent surfaces separate when they require separate rendering.
- Bake base color, normal, roughness, metallic, emissive, opacity, and ambient occlusion maps at resolutions up to 4096 px.
- Preserve a rig and animation clips when you optimize a skinned mesh.
- Preview geometry changes before you run the texture bake.

<img src="https://cloud.needle.tools/-/media/hTfJmobS6DTDa6WWbe-GRg.gif" alt="Dragging the triangle budget in the Needle Mesh Baker while the wireframe result updates live, 1,328,920 triangles down to 6,830" loading="lazy" />

_The geometry preview updates live when you adjust the triangle target count. You can use this to adjust the silhouette until you like it, then bake textures._

The workbench shows the source on the left and the result on the right. The cameras are synchronized, so you can rotate, pan, and zoom both views together. Use the following controls:

- Show the final material, the mesh, or one baked map.
- Enable the wireframe to inspect the topology.
- Change the light, environment, tone mapping, floor, and shadows for both views.
- Review the measured quality score.
- Inspect and download each baked texture.

<img src="https://cloud.needle.tools/-/media/YK_W-UvRZGYtoMsMx_NSBw.gif" alt="A 3,200,000 triangle bust of Nefertiti beside its 3,000 triangle baked result in the Needle Mesh Baker's two linked viewers" loading="lazy" />

_Looking at the "surface" (normals + lighting) and the "wireframe" (outlines of individual triangles)._

## Geometry Optimization

::: tip Voxel Remeshing is a good place to start.
If in doubt, use **Voxel remeshing**. It works well for most 3D assets. Mesh Baker is smart enough to retain animation and rigging, and it can handle disconnected or damaged source geometry.
:::

### Voxel remeshing

Voxel remeshing is a very powerful and robust method for rebuilding geometry. It is the default method used in Mesh Baker, because it works well for general 3D assets, no matter how disconnected or damaged the source geometry is. It rebuilds the model on a high-resolution voxel grid and then reduces the new surface to the target count.

Voxel remeshing merges disconnected source parts into one surface. If you have thin sheets, interior walls, or open surfaces, you can thicken them or create a watertight outer wrap, with the following options:

- **Voxel resolution** sets the number of cells along the longest model axis. A higher value preserves smaller features.
- **Thicken thin sheets** helps close thin, opaque surfaces into solids.
- **Keep surface as a shell** follows the source surfaces instead of filling the interior.

### Simplify a triangle mesh

Use **Simplify** for source meshes that are already split up into meshes in the way you expect, for example, clean separate parts. Set a triangle count or a maximum surface error. Mesh Baker then reduces the vertex count without remeshing the surface.

### Quad remeshing

Select **Quads** under **Mesh Type** to run the selected source topology through [AutoRemesher](https://github.com/huxingyi/autoremesher).

Use quad remeshing when you need a more regular surface before baking, and want to continue working with quads in a 3D tool, for example for sculpting, subdivision, retopology, or rigging workflows. For production assets, use the triangle output for better performance, smaller file size, and bigger surface simplification potential. 

:::tip
The glTF format stores triangles, so Mesh Baker turns each quad into two triangles during export. You can restore the quads in Blender or another 3D tool; in Blender, select the mesh and run **Mesh → Faces → Tris to Quads**.
:::

### Create a hull mesh for VFX uses

Use **Hull Mesh (VFX)** to create a mesh that wraps the source and acts as "hull" around it. The hull mesh will attempt to fully contain the source mesh, so no parts of the source peek outside of the hull. The most important parameter here is the expected surface offset, usually 1-5%, which defines how "tight" the hull wrapts around the mesh. This method is suitable for visual effects, collision meshes and physics proxies.

Mesh Baker includes various preset visual effects based on wrap meshes, such as ice, snow, vines, aura, and energy shields.

### Keep the source geometry

Use **Bake textures only, keep geometry** to retain the source mesh and bake new materials. Use this mode to reduce material count or rebuild textures without changing the existing topology.

### Interactive optimization

Mesh Baker allows you to see the result of geometry optimization live, so you can iteratively and in realtime adjust the silhouette, before doing the actual texture bake. 

Enable **Interactive geometry preview** to test the optimized geometry before doing a texture bake, and drag on the slider to see the silhouette at the chosen triangle count or surface error. Compare the linked source and result views to check the silhouette, small parts and open borders. After you're happy with the silhouette and surface, click on **Optimize** to continue with the bake.

## Material Optimization

### PBR texture atlas

The PBR atlas can contain base color and alpha, normal, occlusion, roughness, metallic, and emissive data. The occlusion, roughness, and metallic values use the standard glTF ORM channel layout.

Compatible source materials can share one atlas and one output material. Transparent surfaces remain separate by default. You can place them in the main atlas when a single draw call is more important than separate blend rendering.

Choose a texture resolution from 256 to 4096 px. For a texture-only bake, you can generate new UVs or use valid, non-overlapping source UVs in the 0–1 range.

### Vertex color baking

Select **Vertex colors** as the material mode to store color on the mesh instead of in a base-color texture. This can reduce file and GPU texture cost for small or stylized assets.

The color modes provide different trade-offs:

- **Flat** gives each triangle a constant color. This is great for stylized assets.
- **Bake** samples color at the existing vertices.
- **Fit colors per triangle** adds per-corner gradients to better match the source.
- **Limit gradients** restricts those gradients for a flatter result.
- **Auto** selects an experimental fit.

Modes other than **Bake** split triangle corners and can increase the vertex count. Ambient occlusion can be multiplied into the vertex RGB values. Other PBR properties are not stored in the vertex colors yet.

### Gradient Trim Sheet

Select **Gradient trim sheet** to optimize for a tiny texture. This mode is for stylized assets that use a single small texture to color a large surface. The result is a single material with extremely low texture cost (a few kilobytes).

Optionally, enable **Pixelized sampling** to create a small stylized texture with pixelated filtering. The optional gravity alignment rotates UV charts so they align better to the world up direction.

:::tip
This mode is great for a gradient-texturing material style, and can be used with animated meshes as well. If you're looking for more pixelization options, check out "Voxelization and Pixelization" below.

:::

### Ambient occlusion map

Enable **Ambient Occlusion** in the advanced rendering settings to bake occlusion textures. Ambient occlusion captures lighting in fine creases and under overhangs, and improves the realism of models under realtime lighting dramatically.

Ambient occlusion is stored in the red channel of the ORM texture of the glTF PBR material model. If you want, you can instead have it multiplied it into the base color, or output into vertex colors, depending on your workflow and engine requirements.

### Thickness, curvature, and height maps

Mesh Baker can also bake thickness, curvature, and height maps. 

- **Thickness** estimates how much source material is behind each texel. Use it for subsurface-scattering or translucency shaders.
- **Curvature** stores signed surface curvature. Use it for edge wear, cavity masks, or highlight effects. 
- **Height** stores the distance from the baked surface to the source along the surface normal. Use it for parallax or displacement mapping.

After a bake, you can inspect each map on the result and download it as a PNG to use in your own shaders.

## Animation Optimization

### Optimize animated and skinned meshes

Mesh Baker supports animated and skinned 3D assets, including glTF/GLB and FBX. You can preview clips and poses before baking, then choose how motion affects the result:

- **Optimize for clips** results in a mesh that has more triangles in areas that deform during animation. It samples the animations, keeps the rig and clips, and keeps more geometry in areas that deform more. This is the best choice for skinned characters and animated objects.
- **Ignore clips** results in an optimized and rigged asset, but does not look at the animation clips (for example, if you don't have animation yet). This method guesses how various bones might move, and optimizes for that.
- **Freeze pose** converts the selected animation frame to a static asset and removes the animation and bones.

:::tip Use Triangle mode for animated assets
Quad remeshing does currently not support animation-aware optimization. Use triangles for skinned meshes.
:::

## Voxelization and pixelization

Select the pixel-impostor output to convert the model to a solid voxel volume. This output is intended for small objects with a deliberate pixel or voxel appearance.

The preview provides four display modes:

- **Voxel geometry** displays the portable glTF fallback.
- **Screen-aligned voxel splats** render the voxel cells in one draw call.
- **Volume raycast** renders a bounding box and traces the voxel volume in the shader.
- **Stable screen pixels** uses the volume raycast and aligns the result to a fixed screen-pixel grid.

The output stores base color, normals, and material data for its surface voxels. The downloaded glTF contains a geometry fallback and a versioned Needle extension for the specialized runtime modes.

Use a regular optimized mesh or an octahedral impostor when you need a smooth silhouette.

## Octahedral Impostors

**Octahedral impostors** replace a model with view-dependent baked images. Use them for distant or repeated objects.

See the [Mesh Baker roadmap](https://mesh-baker.needle.tools/roadmap/) for feature status and planned work.

## Gaussian Splat to Mesh

**Gaussian splat to mesh** converts a `.ply` splat capture to a textured glTF mesh.

## Ecosystem Integration

### Optimize objects from Needle Inspector

With **[Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension) 2.5** or newer, you can directly send scene objects to Mesh Baker for optimization, and integrate the optimized result back into your scene.

In Needle Inspector, open the **Mesh Baker** panel. Select one or more objects in the scene, then click **Send to Mesh Baker**. The workbench opens in a new browser tab with the selected objects. You can also create bake groups in the Inspector and add one or more objects. Mesh Baker then processes each group as one unit. It combines compatible materials into one atlas.

The result is automatically integrated into your current scene. Use the Inspector toggle to compare the original and optimized versions. Change the settings and bake again when needed.

::: tip Still 100% local processing!
Inspector and Mesh Baker communicate directly between the two browser windows. This process does not upload the model to a server.
:::

### MCP Integration for AI 

Mesh Baker provides [WebMCP](https://webmachinelearning.github.io/webmcp/) tools. A compatible browser agent can load a model, change settings, start a bake, inspect the result, and download or upload the result.

> *"Load this model, get it under 10k triangles, show me the wireframe, and download it when it looks right."*

<!-- crop: the recording captured the app window's own rounded corners and 1px
     border, which are baked into the frames — trim them so only the page's
     corner radius shows. -->
<video-embed src="https://cloud.needle.tools/-/media/Iv9obHDJ2EXU2jcs84PcGg.mp4" :crop="8" shadow outline />

*ChatGPT loads a model, sets the triangle budget, starts the bake, and checks the result through WebMCP.*

An agent can use screenshots of the two previews to check the visual result. A triangle count alone does not show missing parts, changed silhouettes, or texture errors.

The agent can also generate a model from text or an image, then optimize the generated result.

#### Browser support

| Browser | Status |
|---|---|
| ChatGPT App | ✅ |
| Microsoft Edge 147+ | ✅ |
| Chrome 149+ | ✅ |
| Firefox, Safari | No WebMCP support yet |

The <img class="inline-logo" src="/imgs/openai-logo.webp" title="ChatGPT" alt="ChatGPT" /> ChatGPT app can use all Mesh Baker tools without a separate MCP server, directly from opening the web app in the ChatGPT app.

## Access and license

You can load models, change settings, bake, and compare results **without a purchase**.

 A **one-time purchase** enables local downloads (and also Needle Cloud uploads). To purchase a license, log in with your Needle account. There is **no usage limit** and future features are included as well.

|                                        | Free evaluation | With a license |
| -------------------------------------- | --------------- | -------------- |
| Load models, bake, preview, compare    | ✅               | ✅              |
| Quality metrics and channel inspection | ✅               | ✅              |
| Drive it with an AI agent              | ✅               | ✅              |
| **Download the baked `.glb`**          | —               | ✅              |
| Upload results to Needle Cloud         | —               | ✅              |
| Needle account required                | —               | free account   |

:::tip Included with Needle Engine PRO
Mesh Baker is  **included** with a **[Needle Engine Pro](https://needle.tools/pricing) **license. Sign in with your Needle account and you automatically have access.
:::



### Command-line license

A separately licensed command-line version can process entire folders automatically and run in build or CI pipelines. Contact [hi@needle.tools](mailto:hi@needle.tools?subject=Needle%20Mesh%20Baker%20CLI) for access.

## FAQ

### System requirements

- Use Chrome, Edge, or another Chromium-based desktop browser for best results. You need a browser with WebGPU support.
- Baking uses the GPU. Bake time and maximum model size depend on the GPU and available memory.
- A desktop GPU is recommended. You can use most functionality on phones, but the UI and workflow aren't optimized for it.
- Image-to-3D needs ~2GB of cache space (one-time download) and a strong enough GPU (6+ GB VRAM)

### Do I need an account to try it?

No. You can load local files, bake, and compare results while signed out. You need an account to download a result or use Needle Cloud.

### Is it a subscription?

No. The browser license is a one-time purchase and includes updates. It is also included with [Needle Engine Pro](https://needle.tools/pricing).

### Is there a limit on how many models I can bake?

No. The browser version has no monthly or total model limit. Processing runs on your machine.

This license covers interactive browser use, including operation through an AI agent. Batch processing, CI, and services that process models for other users require the [command-line license](#command-line-license).

### Is my model uploaded to Needle?

No. Local import, geometry processing, texture baking, and preview run in your browser.

Loading an asset from Needle Cloud downloads it to your browser. Choosing to upload a result sends the model and its file name to your Needle Cloud library. This is optional and is not required to bake or download locally.

### Do you collect mesh names, material names or file names?

Usage events do not include object, mesh, material, texture or file names, or geometry and texture data. If you choose to upload a result to Needle Cloud, the upload includes the model and its file name.

Mesh Baker sends coarse usage statistics about model sizes, features, and settings. When you are signed in, these events are linked to your Needle account.

- Size, triangle, and vertex counts as ranges, such as *5–10 MB* or *200k–1M*. Exact values are not sent.
- Mesh and material counts as ranges.
- The presence of normals, UVs, vertex colors, or skinning.
- The file type and selected settings.
- Events such as model load, bake start, bake completion, and result download.

Failures include a shortened error message. A loader or browser can include a name or path in this message.

### Does it work offline?

The page must load first. The baking pipeline then runs without a server connection.

### Where can I use the results?

Use the `.glb` output in Needle Engine, three.js, React Three Fiber, Blender, Unity, or other software that supports glTF.

The exported textures are uncompressed. Compress them when you add the asset to a project. A Needle Engine production build converts them to GPU-compressed KTX2 automatically. See [Optimization & Compression](/docs/how-to-guides/optimization/).

### Do I own the results? Can I use them commercially?

Yes. You keep the rights to your source model and result. Needle does not require royalties, revenue share, or attribution.

Baking does not change the license of the source. You must have the required rights to the source model, input image, prompt content, and result. See the [EULA](https://needle.tools/eula).

### Can I bake animated or skinned characters?

Yes. For a skinned or animated glTF/GLB or FBX asset, choose **Optimize for clips** to retain the rig and animation clips while the baker samples motion during optimization. Choose **Ignore clips** to retain the animated document while optimizing its authored pose, or **Freeze pose** when you want a static result from one selected animation frame.

### My model looks wrong after baking. What should I change?

Check the geometry method first. Use voxel remeshing for scans, CAD, and damaged topology. Use simplification for clean authored meshes. If small parts disappear, enable their protection. If hard edges become soft, increase the surface-normal priority. Use the wireframe and map views to determine whether the error is in the geometry or a texture.

### How does this relate to progressive loading?

Mesh Baker reduces the total geometry and material cost. [Progressive loading](/docs/how-to-guides/optimization/progressive-loading-and-lods) controls when each level of detail is loaded. Optimize the source asset before you create its progressive levels.

### Can I run it in my own pipeline or CI?

Yes. The command-line version can run as a build step or process a folder. It requires a separate license. Contact [hi@needle.tools](mailto:hi@needle.tools?subject=Needle%20Mesh%20Baker%20CLI).

### Other tools from Needle

Needle builds Mesh Baker, [Needle Engine](/docs/), [Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension), and the Unity and Blender integrations for Needle Engine.

## More Tools by Needle

- [Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension): inspect, debug, and edit three.js scenes in the browser.
- [Optimization & Compression](/docs/how-to-guides/optimization/): configure texture compression, mesh compression, progressive loading, and LODs.
- [Needle Engine + three.js](/docs/three/): use Needle Engine in a three.js project.

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
