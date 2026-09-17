---
title: Needle Mesh Baker – Generate, Optimize and Bake 3D Models
description: Generate 3D models, reduce triangles and draw calls, bake PBR textures, optimize animated and skinned 3D assets, or rebuild geometry with voxel remeshing and conservative wrap mode — locally in your browser.
image: https://cloud.needle.tools/-/media/cFXofjsyv3nAGCJOZvFGsw.gif
---

# Needle Mesh Baker

**Needle Mesh Baker** generates and optimizes 3D models in your browser. It reduces triangles and draw calls, bakes appearance into textures, rebuilds difficult geometry, and optimizes skinned meshes while preserving their rigs and animation clips.

- **Built to be fast.** Reduces triangles and draw calls at insane speeds with realtime previews.
- **Multiple simplification methods.** Simplify authored topology, voxel-remesh difficult assets, create a VFX wrap mesh, or just bake textures without changing geometry (highpoly to lowpoly, lowpoly to lowpoly)
- **Animation-aware.** Optimize a skinned mesh and its clips, or freeze a selected animation frame
- **Full physically-based rendering support.** Reduce the triangle count while preserving the silhouette and baking color, normals, roughness and metallic into textures
- **GPU-accelerated.** Process complex models privately and securely, on your machine. No cloud upload is required.
- **Built-in Image-to-3D Generation.** Drop in an image, and the baker builds a 3D model from it using your GPU, then make it production ready right away.
- **[WebMCP ready](#control-mesh-baker-with-an-ai-agent).** Use the ChatGPT app to control Mesh Baker directly.
- **100% local processing.** Models are processed in your browser.
- **Integrated with Needle Cloud.** You can pick models right from your Needle Cloud uploads, or upload optimized assets for sharing and management. ([Learn More](#is-my-model-uploaded-to-needle))
- **Yours to download.** The optimized asset can be downloaded as plain `.glb` file, ready for any engine or workflow.

**[Open Needle Mesh Baker →](https://mesh-baker.needle.tools)**

<img src="https://cloud.needle.tools/-/media/cFXofjsyv3nAGCJOZvFGsw.gif" alt="Needle Mesh Baker workbench, comparing an 800,000 triangle source model with the 6,000 triangle result side by side" />

*The model on the left has 800,000 triangles. The model on the right has 6,000.*

## Quick Start

1. Open [mesh-baker.needle.tools](https://mesh-baker.needle.tools) in your browser
2. Drop a `.glb`, `.gltf`, `.obj`, `.fbx` or `.zip` onto the page, or load a model from your Needle Cloud library
3. Set your triangle budget under **Geometry**, or switch to targeting a maximum surface error
4. Press **Optimize asset**, then compare the result against the source in the two linked viewers
5. **Download** the result as a `.glb`

:::tip 100% local processing
Importing local files, baking, previewing and comparing all happen on your machine. Even image-to-3D generation runs right in your browser.
:::

## Supported source formats

Mesh Baker can load these source formats:

| Source | Notes |
|---|---|
| `.glb` / `.gltf` | Supports animations |
| `.fbx` | Supports animations |
| `.obj` + `.mtl` + textures | Select all files together |
| `.zip` | An archive containing any of the above |
| Needle Cloud | Pick a model from your own Needle Cloud asset library |

## Output

Mesh Baker exports a `.glb` file. The result depends on the selected geometry and material settings. It can contain:

- a reduced triangle mesh
- a quad-remeshed surface, triangulated for glTF export
- a voxel-remeshed surface
- a watertight outer wrap
- the source geometry with newly baked materials
- a skinned mesh with its rig and animation clips
- a pixel or voxel representation

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

*The geometry preview updates when the triangle budget changes. This model is reduced from 1,328,920 triangles to 6,830.*

## Compare the source and result

The workbench shows the source on the left and the result on the right. The cameras are synchronized, so you can rotate, pan, and zoom both views together. Use the following controls:

- Show the final material, the mesh, or one baked map.
- Enable the wireframe to inspect the topology.
- Change the light, environment, tone mapping, floor, and shadows for both views.
- Review the measured quality score.
- Inspect and download each baked texture.

<img src="https://cloud.needle.tools/-/media/YK_W-UvRZGYtoMsMx_NSBw.gif" alt="A 3,200,000 triangle bust of Nefertiti beside its 3,000 triangle baked result in the Needle Mesh Baker's two linked viewers" loading="lazy" />

*The source has 3,200,000 triangles. The result has 3,000 triangles.*

## Geometry and texture baking

A dense model can store small details in its geometry. Examples include scratches, feathers, seams, and bolts. Geometry reduction removes some of this detail. Texture baking transfers the detail to maps on the reduced mesh.

Mesh Baker creates the reduced mesh, UVs, and tangents. It then projects the source appearance onto the result. A normal map preserves small surface details in shading. The mesh still controls large shapes and the silhouette.

You can also keep the source geometry and bake new materials only, reducing draw calls. Use this when material count and draw calls are the main problem, for example, when you have a model made out of many low-poly parts that share the same material.

<img src="https://cloud.needle.tools/-/media/XEutsc3aScR4WdGjPOPlQQ.gif" alt="Dragging the key light around in the Needle Mesh Baker: the 3.1 million triangle source and the 5,914 triangle result catch the light the same way" loading="lazy" />

*The result has 5,914 triangles. The normal map preserves detail as the light moves.*

## Choose a geometry method

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

Use **Simplify** for clean source meshes. Set a triangle count or a maximum surface error. Mesh Baker reduces the source topology without first rebuilding the surface.

Use **Surface priority** to choose whether the reduction preserves the overall shape or shading creases. Use **Small parts** to protect disconnected pieces from the global triangle budget.

### Quad remeshing

Select **Quads** under **Mesh Type** to run the selected source topology through AutoRemesher. Set the target as a quad count.

Quad remeshing currently has these limits:

- It does not preserve animation or the source material structure.
- glTF stores triangle primitives, so Mesh Baker triangulates the quad surface during baking and export. You can restore the quads in Blender or another 3D tool; in Blender, select the mesh and run **Mesh → Faces → Tris to Quads**.

Use quad remeshing when you need a more regular surface before baking, and want to continue working with quads in a 3D tool, for example for sculpting, subdivision, retopology, or rigging workflows. For production assets, use the triangle output for better performance, smaller file size, and bigger surface simplification potential.

### Create an outer wrap

Use **Wrap** to create a watertight outer shell. Set the minimum hole size and surface offset. This method is suitable for collision meshes, proxy meshes, and visual effects. Mesh Baker includes various preset visual effects based on wrap meshes, such as ice, snow, vines, aura, and energy shields.

### Keep the source geometry

Use **Bake textures only, keep geometry** to retain the source mesh and bake new materials. Use this mode to reduce material count or rebuild textures without changing the existing topology.

## Interactive optimization

Enable **Interactive geometry preview** to test the optimized geometry before doing a texture bake.
Compare the linked source and result views to check the silhouette, small parts and open borders. After you're happy with the silhouette and surface, click on **Optimize** to bake the selected materials and maps.

## Optimize animated and skinned meshes

Mesh Baker supports animation-aware optimization for skinned 3D assets, including glTF/GLB and FBX. You can preview clips and poses before baking, then choose how motion affects the result:

- **Optimize for clips** samples the animations, keeps the rig and clips, and keeps more geometry in areas that deform more. This is the best choice for skinned characters and animated objects.
- **Ignore clips** results in an optimized and rigged asset, but does not look at the animation clips (for example, if you don't know the clips yet).
- **Freeze pose** converts the selected preview frame to a static asset.

::: tip Use triangles for skinned meshes
Quad remeshing does currently not support animation-aware optimization. Use triangles for skinned meshes.
:::

## Bake materials

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

This mode is great for a pixel-art material style. It is separate from the voxel and pixel-impostor output described below.

## Ambient occlusion

Enable **Ambient Occlusion** in the advanced rendering settings. Set the sample count and the maximum ray distance.

For PBR output, ambient occlusion is stored in the red channel of the ORM texture. You can instead multiply it into the base color. Unlit output always applies it to the base color. Vertex-color output multiplies it into the vertex RGB values.

Use a short distance for small contact shadows. Use a longer distance for broad occlusion across larger parts. More samples reduce noise and increase bake time.

## Thickness, curvature, and height maps

These maps are experimental and are available in the advanced rendering settings:

- **Thickness** estimates how much source material is behind each texel. Use it for subsurface-scattering or translucency shaders. Set the ray count and maximum trace distance.
- **Curvature** stores signed surface curvature. Use it for edge wear, cavity masks, or highlight effects. Set the sample count and neighborhood radius.
- **Height** stores the distance from the baked surface to the source along the surface normal. Use it for parallax or displacement mapping.

After a bake, you can inspect each map on the result and download it as a PNG to use in your own shaders.

## Voxelization and pixelization

Select the pixel-impostor output to convert the model to a solid voxel volume. This output is intended for small objects with a deliberate pixel or voxel appearance.

The preview provides four display modes:

- **Voxel geometry** displays the portable glTF fallback.
- **Screen-aligned voxel splats** render the voxel cells in one draw call.
- **Volume raycast** renders a bounding box and traces the voxel volume in the shader.
- **Stable screen pixels** uses the volume raycast and aligns the result to a fixed screen-pixel grid.

The output stores base color, normals, and material data for its surface voxels. The downloaded glTF contains a geometry fallback and a versioned Needle extension for the specialized runtime modes.

Use a regular optimized mesh or an octahedral impostor when you need a smooth silhouette.

## Other output types

- **Octahedral impostors** replace a model with view-dependent baked images. Use them for distant or repeated objects.
- **Gaussian splat to mesh** converts a `.ply` splat capture to a textured glTF mesh. The result does not require a splat renderer.

See the [Mesh Baker roadmap](https://mesh-baker.needle.tools/roadmap/) for feature status and planned work.

## Optimize objects from Needle Inspector

With **[Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension) 2.5** or newer, you can directly send scene objects to Mesh Baker for optimization, and integrate the optimized result back into your scene.

In Needle Inspector, open the **Mesh Baker** panel. Select one or more objects in the scene, then click **Send to Mesh Baker**. The workbench opens in a new browser tab with the selected objects. You can also create bake groups in the Inspector and add one or more objects. Mesh Baker then processes each group as one unit. It combines compatible materials into one atlas.

The result is automatically integrated into your current scene. Use the Inspector toggle to compare the original and optimized versions. Change the settings and bake again when needed.

::: tip Still 100% local processing!
Inspector and Mesh Baker communicate directly between the two browser windows. This process does not upload the model to a server.
:::

## Control Mesh Baker with an AI agent

Mesh Baker provides [WebMCP](https://webmachinelearning.github.io/webmcp/) tools. A compatible browser agent can load a model, change settings, start a bake, inspect the result, and download or upload the result.

> *"Load this model, get it under 10k triangles, show me the wireframe, and download it when it looks right."*

<!-- crop: the recording captured the app window's own rounded corners and 1px
     border, which are baked into the frames — trim them so only the page's
     corner radius shows. -->
<video-embed src="https://cloud.needle.tools/-/media/Iv9obHDJ2EXU2jcs84PcGg.mp4" :crop="8" shadow outline />

*ChatGPT loads a model, sets the triangle budget, starts the bake, and checks the result through WebMCP.*

An agent can use screenshots of the two previews to check the visual result. A triangle count alone does not show missing parts, changed silhouettes, or texture errors.

The agent can also generate a model from text or an image, then optimize the generated result.

### Browser support

| Browser | Status |
|---|---|
| ChatGPT App | ✅ |
| Microsoft Edge 147+ | ✅ |
| Chrome 149+ | ✅ |
| Firefox, Safari | No WebMCP support yet |

The <img class="inline-logo" src="/imgs/openai-logo.webp" title="ChatGPT" alt="ChatGPT" /> ChatGPT app can use all Mesh Baker tools without a separate MCP server, directly from opening the web app in the ChatGPT app.

## Access and license

You can load models, change settings, bake, and compare results without a purchase. A Mesh Baker license enables local download and Needle Cloud upload.

| | Free | Mesh Baker |
|---|---|---|
| Load models, bake, preview, compare | ✅ | ✅ |
| Quality metrics and channel inspection | ✅ | ✅ |
| Drive it with an AI agent | ✅ | ✅ |
| **Download the baked `.glb`** | — | ✅ |
| Upload results to Needle Cloud | — | ✅ |
| Needle account required | — | free account |

### Browser license

The browser license is a one-time purchase. It has no subscription and no per-model limit. The purchase dialog shows the current price.

Mesh Baker is included with **[Needle Engine Pro](https://needle.tools/pricing)**. Sign in with the account that owns the license.

Updates are included with the license.

### Command-line license

A separately licensed command-line version can process folders and run in build or CI pipelines. Contact [hi@needle.tools](mailto:hi@needle.tools?subject=Needle%20Mesh%20Baker%20CLI) for access.

## System requirements

- Use Chrome, Edge, or another Chromium-based desktop browser.
- Baking uses the GPU. Bake time and maximum model size depend on the GPU and available memory.
- A phone can open the workbench, but a desktop GPU is recommended.

## FAQ

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

### Who builds it?

Needle builds Mesh Baker, [Needle Engine](/docs/), [Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension), and the Unity and Blender integrations for Needle Engine.

## Related documentation

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
