---
title: Exporting Assets to glTF
---

# Exporting Assets to glTF

<logo-header logo="/imgs/unity-logo.webp" alt="Unity"><a href="./unity/">Unity</a></logo-header> • <logo-header logo="/blender/logo.png" alt="Blender"><a href="./blender/">Blender</a></logo-header>

Learn how to export your Unity and Blender scenes, assets, animations, materials, and lightmaps to the web using glTF format. Needle Engine provides powerful tools to convert your 3D content into optimized web-ready assets.

**What You Can Export:**
- 🎨 Materials (PBR, custom shaders, MaterialX)
- 🎬 Animations (Timeline, Animator, clips)
- 📦 Prefabs and scenes (for lazy loading)
- 💡 Lightmaps and skyboxes
- 🎭 Meshes, textures, and more

:::tip Quick Start
Add a `Needle Engine` component to your Unity scene to get started. By default, your scene exports automatically on save—you can disable this in the `Needle Engine` component settings.
:::  

## <logo-header logo="/imgs/gltf-logo.webp" alt="glTF">Exporting glTF Files</logo-header>

Create a new GameObject and add a `GltfObject` component—this becomes the root of a glTF file that exports meshes, materials, animations, textures, and more.

**How it works:**
1. Add `GltfObject` component to a GameObject
2. Add child objects (meshes, lights, etc.) under it
3. Save your scene—the glTF exports automatically
4. Find the `.glb` file in your `assets/` folder

:::tip Only Exports What's Inside
Only scripts and data on and inside `GltfObject` roots are exported. Content outside these roots is ignored.
:::

**Performance Tip:** Enable `Smart Export` in `Edit > Project Settings > Needle` to only export when changes are detected in the object hierarchy.

:::details Excluding Objects from Export
Objects tagged as `EditorOnly` are ignored during export (including their children). This is better than disabling objects, which still export in case they're enabled at runtime.
:::

### Lazy Loading & Multiple Scenes

Split your app into multiple scenes for faster loading. Use the [`SceneSwitcher`](https://engine.needle.tools/docs/api/SceneSwitcher) component to load and unload scenes at runtime.

**Benefits:**
- Smaller initial load times
- Load content only when needed
- Better performance across devices

**Example:** On [needle.tools](https://needle.tools?utm_source=needle_docs&utm_content=export_scenes), each section is a separate scene that loads on demand.

[Learn more about loading scenes →](scripting.html#loading-scenes)

### Recommended Complexity per glTF

Keep your glTF files within these limits for optimal performance across devices:

| Metric | Recommended Max | Notes |
| --- | --- | --- |
| **File Size** | 50 MB uncompressed | Usually compresses to 10-20 MB |
| **Vertices** | 500k | Lower for mobile VR |
| **Lightmaps** | 4× 2k textures | Larger files = slower loading |

:::tip Split Large Scenes
If you exceed these limits, split your content into multiple glTF files and load them on demand. This keeps performance fast across all devices.
:::

*These recommendations ensure good performance across a range of web-capable devices and bandwidths. There's no hard technical limitation beyond device capabilities.*

### Prefabs
Prefabs can be exported as invidual glTF files and instantiated at runtime. To export a prefab as glTF just reference a prefab asset (from the project browser and not in the scene) [from one of your scripts](https://fwd.needle.tools/needle-engine/docs/addressables).  

Exporting Prefabs works with nesting too: a component in a Prefab can reference another Prefab which will then also be exported.  
This mechanism allows for composing scenes to be as lightweight as possible and loading the most important content first and defer loading of additional content.  

### Scene Assets
Similar to Prefab assets, you can reference other Scene assets.  
To get started, create a component in Unity with a ``UnityEditor.SceneAsset`` field and add it to one of your GameObjects inside a GltfObject. The referenced scene will now be exported as a separate glTF file and can be loaded/deserialized as a ``AssetReference`` from TypeScript.  

You can keep working inside a referenced scene and still update your main exporter scene/website. On scene save or play mode change we will detect if the current scene is being used by your currently running server and then trigger a re-export for only that glb. (This check is done by name - if a glb inside your ``<web_project>/assets/`` folder exists, it is exported again and the main scene reloads it.)

As an example on [our website](https://needle.tools?utm_source=needle_docs&utm_content=export_sceneassets) each section is setup as a separate scene and on export packed into multiple glb files that we load on demand:

![2022-08-22-172605_Needle_Website_-_Website_-_Windows,_Mac,_Linux_-_U](https://user-images.githubusercontent.com/5083203/185958983-71913c97-5eec-4cfd-99f5-76798582373e.png)

#### Loading a Prefab or Scene from a custom script
If you want to reference and load a prefab from one of your scripts you can declare a `AssetReference` type.  
Here is a minimal example: 

@[code ts twoslash](@code/component-prefab.ts)

## 🏇 Exporting Animations 
Needle Engine supports a considerable and powerful subset of Unity's animation features:

- **Timeline** incl. activation tracks, animation tracks, track offsets
- **Animator** incl. top-level state transitions
  - Blend trees are currently not supported.
  - Sub state machines are currently not supported.
- **AnimationClips** incl. Loop modes
- **Procedural Animations** can be created via scripting

Needle Engine is one of the first to support the new [glTF extension KHR_ANIMATION_POINTER](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer).  
This means that almost all properties, including script variables, are animatable.  

One current limitation is that materials won't be duplicated on export — if you want to animate the same material with different colors, for example, you currently need to split the material in two. 

## 🌍 Exporting the Skybox 
The Unity skybox and custom reflection (if any) are baked into a texture on export and automatically exported inside the ``NEEDLE_lightmaps`` extension.  

To change the skybox resolution you can add a ``SkyboxExportSettings`` component to your scene.  

![image](https://user-images.githubusercontent.com/5083203/196030839-170a9496-9ed9-4ebc-bc1d-2df6c746f8c8.png)


If you don't want to skybox to be exported at all in a glb file you can untick the ``Embed Skybox`` option on your ``GltfObject`` component  

![image](https://user-images.githubusercontent.com/5083203/196030825-8a05037f-5acc-4795-9128-2bdacedd0d49.png)


## ✨ Exporting Materials

### Physically Based Materials (PBR)
By default, materials are converted into glTF materials on export. glTF supports a physically based material model and has a number of extensions that help to represent complex materials.  

For full control over what gets exported, it's **highly recommended** to use the glTF materials provided by UnityGltf:
- UnityGLTF/PBRGraph
- UnityGLTF/UnlitGraph

::: tip When in doubt, use the PBRGraph shader.
The PBRGraph material has a lot of features, way more than the "Standard" or "Lit" shaders provided by Unity. These features include surface effects like clearcoat, sheen, iridescence, and volumetric effects like transmission, refraction and dispersion.
:::

Other shaders that can be exported directly (with conversion):
- Universal Render Pipeline/Lit
- Universal Render Pipeline/Unlit
- Standard (Built-in Render Pipeline)
- Autodesk Interactive (Built-in Render Pipeline)
- Unlit (Built-in Render Pipeline)

Other materials are converted using a propery name heuristic. That means that depending on what property names your materials and shaders use, you might want to either refactor your custom shader's properties to use the property names of either Universal Render Pipeline/Lit or PBRGraph, or export the material as [Custom Shader](#custom-shaders).

### Custom Shaders
To export custom unlit shaders (for example made with ShaderGraph) use the dropdown in the Material header to select the shader export type. Needle Engine offers support for Unity Shader export in WebGL2 format (Unlit Shaders only) or as MaterialX graphs.

![image](/imgs/custom-shaders.jpg)


#### MaterialX Format

MaterialX is a powerful standard for describing materials and shaders in a graph based way, independent of the rendering engine. It allows you to define complex materials, with multiple surface layers and realistic lighting.


- [MaterialX in Needle Engine](./materialx.md) documentation


#### WebGL2 Format (Unlit Shaders)
 
**Limitations**
- We currently only support custom **Unlit** shaders — Lit shader conversion is not officially supported.
- Custom Lit Shaders are currently experimental. Not all rendering modes are supported. 
- Shadow receiving on custom shaders is not supported
- Skinned meshes with custom shaders are not supported
- As there's multiple coordinate system changes when going from Unity to three.js and glTF, there might be some changes necessary to get advanced effects to work. We try to convert data on export but may not catch all cases where conversions are necessary.  
  - UV coordinates in Unity start at the bottom left; in glTF they start at the top left.
  - X axis values are flipped in glTF compared to Unity. This is a variant of a left-handed to right-handed coordinate system change. Data used in shaders may need to be flipped on X to display correctly.  

<!-- ::: note Not part of the glTF specification
Note that **Custom Shaders** aren't officially part of the glTF specification. Our implementation of custom shaders uses an extension called KHR_techniques_webgl, that stores the WebGL shader code directly in the glTF file. The resulting assets will work in viewers based on Needle Engine.
::: -->

## 💡 Exporting Lightmaps
![2022-08-22-171650_Needle_-_Google_Chrome](https://user-images.githubusercontent.com/5083203/185957005-d04c9530-07eb-40f5-b305-9822d13b79ab.png)

Lightmaps baked in your 3D editor are automatically exported to the web with Needle Engine. The lighting you see in your editor is what you get on the web!

**Lightmap export works with:**
- Unity's built-in lightmapper and third-party solutions
- Blender's Cycles renderer with baked lighting

### Integration-Specific Guides

**<logo-header logo="/imgs/unity-logo.webp" alt="Unity"><a href="/docs/tutorials/fundamentals/unity-integration#lightmaps">Unity Lightmapping Guide</a></logo-header>**
Learn about Unity-specific lightmap settings, recommendations, and best practices for mixing baked and non-baked objects.

**<logo-header logo="/blender/logo.png" alt="Blender"><a href="/docs/blender/lightmapping">Blender Lightmapping Guide</a></logo-header>**
Learn how to bake lighting in Blender and export it with Needle Engine.
