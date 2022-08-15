# Export ⚙️
By default your Unity scene is always exported on save (if it contains a valid ``ExportInfo`` component). This setting can be changed by disabling ``Auto Export`` in the ``ExportInfo`` component.

## Exporting glTF files
To export meshes, materials, animations, textures (...) create a new GameObject in your hierarchy and add a ``GltfObject`` component to it. This is the root of a new glTF file. It will be exported whenever you make a change to the scene and save.

> You can use the experimental ``Smart Export`` setting to only export when a change in this object's hierarchy is detected. 

Add a cube as a child of your root object and save your scene. Note that the output ``assets/`` folder (see [project structure](#vite-project-structure)) now contains a new ``.glb`` file with the same name as your root GameObject.  

> **Note:** Only scripts and data on and inside those root objects is exported. Scripts and data outside of them are not exported.  Read about [scripting here](./scripting.md)  

> You can ignore specific objects on export by tagging them as `EditorOnly`. This is often preferred over simply disabling them, as disabled objects still get exported in case they're turned on later.

### Prefabs
It is also possible to create [Prefabs ⇡](https://docs.unity3d.com/Manual/Prefabs.html) in Unity and add a ``GltfObject`` component to its root. If you reference this prefab from any of your components in your scene it will automatically be exported. These exports can also be nested (so a component in a Prefab can reference another Prefab which will then also be exported. This mechanism allows for composing scenes to be as lightweight as possible and loading the most important content first and defer loading of additional content).  
For how to easily load those exported prefabs please refer to the [``AssetReference`` section](scripting.md#assetreference--addressables) in the scripting documentation.

### Scene Assets
Similar to prefabs you can reference a whole other scene. Just create component in Unity with a ``UnityEditor.SceneAsset`` field (it can be an array or list too) and add it to one of your GameObjects inside a GltfObject. This other scene will now be exported as a separate gltf file and you can load/deserialize it as a ``AssetReference`` from typescript. Please refer to the [``AssetReference`` section](scripting.md#assetreference--addressables) in the scripting documentation for further info.

> *Note*: you can directly work inside a referenced scene and still update your main exporter scene/website. On save or play we will detect that/if the scene is being used by your currently running server (by checking if a glb inside your ``<web_project>/assets/`` folder exists) and then trigger a re-export for only that glb.*

## Exporting Animations
Supported features:
- Timeline incl. activation tracks, animation tracks, track offsets
- Animator incl. top-level state transitions. Blend trees / sub state machines are currently not supported.
- AnimationClips

Needle Engine is one of the first to support the new [KHR_ANIMATION_POINTER glTF extension](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer).  
This means that almost all properties, including script variables, are animatable.  

One current limitation is that materials won't be duplicated on export — if you want to animate the same material with different colors, for example, you currently need to split the material in two. 

## Exporting the Skybox
The Unity skybox is baked into a texture on export and automatically exported as part of the ``<scene_name>_resources.glb``. It's set as scene background and reflection environment.  
You can access resources at runtime using (for example) ``this.context.assets.findTexture("Skybox")``.  

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

Other materials are converted using a propery name heuristic. That means that depending on what property names your materials and shaders use, you might want to either refactor your custom shader's properties to use the property names of either URP/Lit or PBRGraph, or export the material as Custom Shader.

### Custom Shaders
To export custom shaders (e.g. ShaderGraph shaders), add an ``ExportShader`` Asset Label (see bottom of the inspector) to the shader you want to export.  
> Custom Shaders aren't part of the ratified glTF material model. The resulting GLB files will not display correctly in other viewers (the materials will most likely display white).

#### Current limitations
- Custom Lit Shaders are currently experimental. Not all rendering modes are supported. 
- Shadow receiving is not supported.
- As there's multiple coordinate system changes when going from Unity to three.js and glTF, there might be some changes necessary to get advanced effects to work. 
These coordinate changes are
  - UV coordinates in Unity start at the bottom left; in glTF they start at the top left.
  - X axis values are flipped in glTF compared to Unity (a variant of a left-handed to right-handed coordinate system change).

## Exporting Lightmaps
To export lightmaps you simply [generate lightmaps ⇡](https://docs.unity3d.com/Manual/Lightmapping.html) in Unity. Lightmaps will be automatically exported.
