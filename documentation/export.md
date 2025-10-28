---
title: Exporting Assets to glTF
---



# Exporting Assets, Animations, Prefabs, Materials, Lightmaps...
Add an ``ExportInfo`` component to your Unity scene to generate a new web project from a template, link to an existing web project that you want to export to, set up dependencies to other libraries and packages and to deploy your project. 

By default, your scene is exported on save. This setting can be changed by disabling ``Auto Export`` in the ``ExportInfo`` component.  

## 📦 Exporting glTF files 
To export meshes, materials, animations, textures (...) create a new GameObject in your hierarchy and add a ``GltfObject`` component to it. This is the root of a new glTF file. It will be exported whenever you make a change to the scene and save.  

Only scripts and data on and inside those root objects is exported. Scripts and data outside of them are not exported. 


Add a cube as a child of your root object and save your scene. Note that the output ``assets/`` folder (see [project structure](#vite-project-structure)) now contains a new ``.glb`` file with the same name as your root GameObject.  

You can enable the ``Smart Export`` setting (via `Edit/Project Settings/Needle` ) to only export when a change in this object's hierarchy is detected. 

:::details How to prevent specific objects from being exported
Objects with the `EditorOnly` tag will be ignored on export including their child hierarchy.   
Be aware that this is preferred over disabling objects as disabled will still get exported in case they're turned on later.
:::

### Lazy loading and multiple levels / scenes

If you want to split up your application into multiple levels or scenes then you can simply use the [`SceneSwitcher`](https://engine.needle.tools/docs/api/SceneSwitcher) component. You can then structure your application into multiple scenes or prefabs and add them to the SceneSwitcher array to be loaded and unloaded at runtime. This is a great way to avoid having to load all your content upfront and to keep loading times small (for example it is what we did on [needle.tools](https://needle.tools?utm_source=needle_docs&utm_content=export_scenes) by separating each section of your website into its own scene and only loading them when necessary)

### Recommended Complexity per glTF

- Max. 50 MB export size uncompressed (usually ends up ~10-20 MB compressed)  
- Max. 500k vertices (less if you target mobile VR as well)  
- Max. 4x 2k lightmaps  

You can split up scenes and prefabs into multiple glTF files, and then load those on demand (only when needed). This keeps loading performance fast and file size small. See [Loading Scenes in the scripting docs](scripting.md#loading-scenes).

 The scene complexity here is recommended to ensure good performance across a range of web-capable devices and bandwidths. There's no technical limitation to this beyond the capabilities of your device.

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


To export lightmaps simply [generate lightmaps](https://docs.unity3d.com/Manual/Lightmapping.html) in Unity. Lightmaps will be automatically exported.

When working on multiple scenes, disable "Auto Generate" and bake lightmaps explicitly. Otherwise, Unity will discard temporary lightmaps on scene change.

### Recommended Lightmap Settings
- Lightmap Encoding: Normal Quality (adjust in Project Settings > Player)
- Progressive GPU (faster and usually accurate enough for small scenes)
- Non-Directional Lightmaps
- Max Lightmap Size 2k (you can go higher, but expect large files)
- Max 4x 2k lightmaps per scene (you can go higher, but expect large files)
- Compress Lightmaps OFF (increases quality; otherwise will be compressed again at export time)

![2022-08-22-171356_Needle_Website_-_Lightmaps_-_Windows,_Mac,_Linux_-](https://user-images.githubusercontent.com/5083203/185956392-f4031f45-ad13-4e6d-a14c-c8ec5c1fcfd4.png)

### Mixing Baked and Non-Baked Objects

There's no 100% mapping between how Unity handles lights and environment and how three.js handle that. For example, Unity has entirely separate code paths for lightmapped and non-lightmapped objects (lightmapped objects don't receive ambient light since that is already baked into their maps), and three.js doesn't distinguish in that way.  

This means that to get best results, we currently recommend specific settings if you're mixing baked and non-baked objects in a scene:  
```
Environment Lighting: Skybox
Ambient Intensity: 1
Ambient Color: black
```

**2021.3+**  
![20220826-175324-SqBL-Unity_pMXa-needle](https://user-images.githubusercontent.com/2693840/186947184-2446672f-420c-47e8-8f7d-970a7d52bf35.png)

**2020.3+**  
![20220826-175514-tnGc-Unity_mycs-needle](https://user-images.githubusercontent.com/2693840/186947203-2d7d96c3-f566-44b4-889c-4103fac505d4.png)

If you have no baked objects in your scene, then the following settings should also yield correct results:  
```
Environment Lighting: Color
Ambient Color: any
```
