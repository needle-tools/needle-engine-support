# Export ⚙️
To mark any Unity scene as "exportable", add an ``ExportInfo`` component to a root object. This component helps you to generate your new web project from a template, set up dependencies to other component libraries (we call them `NpmDef`), and to deploy your project. 

> By default, your scene is exported on save. This setting can be changed by disabling ``Auto Export`` in the ``ExportInfo`` component.  

## Exporting glTF files
To export meshes, materials, animations, textures (...) create a new GameObject in your hierarchy and add a ``GltfObject`` component to it. This is the root of a new glTF file. It will be exported whenever you make a change to the scene and save.


Add a cube as a child of your root object and save your scene. Note that the output ``assets/`` folder (see [project structure](#vite-project-structure)) now contains a new ``.glb`` file with the same name as your root GameObject.  

> You can use the experimental ``Smart Export`` setting to only export when a change in this object's hierarchy is detected. 

> You can ignore specific objects on export by tagging them as `EditorOnly`. This is often preferred over simply disabling them, as disabled objects still get exported in case they're turned on later.

> **Note**: Only scripts and data on and inside those root objects is exported. Scripts and data outside of them are not exported.  Read about [scripting here](./scripting.md)  

### Prefabs
[Prefabs ⇡](https://docs.unity3d.com/Manual/Prefabs.html) can be exported as invidual glTF files and instantiated at runtime. To export a prefab as glTF just reference a prefab asset (from the project browser and not in the scene) [from one of your scripts](https://fwd.needle.tools/needle-engine/docs/addressables).  

Exporting Prefabs works with nesting too: a component in a Prefab can reference another Prefab which will then also be exported.  
This mechanism allows for composing scenes to be as lightweight as possible and loading the most important content first and defer loading of additional content.  

Please refer to the [``AssetReference`` section on loading](https://fwd.needle.tools/needle-engine/docs/addressables) in the scripting documentation for further info.

### Scene Assets
Similar to Prefab assets, you can reference other Scene assets.  
To get started, create a component in Unity with a ``UnityEditor.SceneAsset`` field and add it to one of your GameObjects inside a GltfObject. The referenced scene will now be exported as a separate glTF file and can be loaded/deserialized as a ``AssetReference`` from TypeScript.  

Please refer to the [``AssetReference`` section on loading](https://fwd.needle.tools/needle-engine/docs/addressables) in the scripting documentation for further info.

> **Note**: You can keep working inside a referenced scene and still update your main exporter scene/website. On scene save or play mode change we will detect if the current scene is being used by your currently running server and then trigger a re-export for only that glb.  
(The check is done by name - if a glb inside your ``<web_project>/assets/`` folder exists, it is exported again and the main scene reloads it.)

As an example on [our website](https://needle.tools) each section is setup as a separate scene and on export packed into multiple glb files that we load on demand:

![2022-08-22-172605_Needle_Website_-_Website_-_Windows,_Mac,_Linux_-_U](https://user-images.githubusercontent.com/5083203/185958983-71913c97-5eec-4cfd-99f5-76798582373e.png)

## Exporting Animations
Needle Engine supports a considerable and powerful subset of Unity's animation features:

- **Timeline** incl. activation tracks, animation tracks, track offsets
- **Animator** incl. top-level state transitions
  - Blend trees are currently not supported.
  - Sub state machines are currently not supported.
- **AnimationClips** incl. Loop modes
- **Procedural Animations** can be created via scripting

Needle Engine is one of the first to support the new [glTF extension KHR_ANIMATION_POINTER ⇡](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer).  
This means that almost all properties, including script variables, are animatable.  

One current limitation is that materials won't be duplicated on export — if you want to animate the same material with different colors, for example, you currently need to split the material in two. 

## Exporting the Skybox
The Unity skybox and custom reflection (if any) are baked into a texture on export and automatically exported inside the ``NEEDLE_lightmaps`` extension.

## Exporting Materials

### Physically Based Materials (PBR)
By default, materials are converted into glTF materials on export. glTF supports a physically based material model and has a number of extensions that help to represent complex materials.  

For full control over what gets exported, it's highly recommended to use the glTF materials provided by UnityGltf:
- PBRGraph
- UnlitGraph
> These materials are exported as-is, with no conversion necessary. They allow for using advanced material properties such as refractive transmission and iridescence, which can be exported as well. 

Materials that can be converted out-of-the-box:
- BiRP/Standard
- BiRP/Autodesk Interactive
- BiRP/Unlit
- URP/Lit
- URP/Unlit

Other materials are converted using a propery name heuristic. That means that depending on what property names your materials and shaders use, you might want to either refactor your custom shader's properties to use the property names of either URP/Lit or PBRGraph, or export the material as [Custom Shader](#custom-shaders).

### Custom Shaders
To export custom shaders (e.g. ShaderGraph shaders), add an ``ExportShader`` Asset Label (see bottom of the inspector) to the shader you want to export.  

![2022-08-22-172029_Needle_Website_-_CustomShaders_-_Windows,_Mac,_Lin](https://user-images.githubusercontent.com/5083203/185957781-9fae18c5-09ff-490f-8958-57e138aa0003.png)

> Custom Shaders aren't part of the ratified glTF material model. The resulting GLB files will not display correctly in other viewers (the materials will most likely display white).

#### Current limitations
- Custom Lit Shaders are currently experimental. Not all rendering modes are supported. 
- Shadow receiving is not supported.
- As there's multiple coordinate system changes when going from Unity to three.js and glTF, there might be some changes necessary to get advanced effects to work. 
These coordinate changes are
  - UV coordinates in Unity start at the bottom left; in glTF they start at the top left.
  - X axis values are flipped in glTF compared to Unity (a variant of a left-handed to right-handed coordinate system change).  

## Exporting Lightmaps
![2022-08-22-171650_Needle_-_Google_Chrome](https://user-images.githubusercontent.com/5083203/185957005-d04c9530-07eb-40f5-b305-9822d13b79ab.png)


To export lightmaps simply [generate lightmaps ⇡](https://docs.unity3d.com/Manual/Lightmapping.html) in Unity. Lightmaps will be automatically exported.

> When working on multiple scenes, disable "Auto Generate" and bake lightmaps explicitly. Otherwise, Unity will discard temporary lightmaps on scene change.

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
