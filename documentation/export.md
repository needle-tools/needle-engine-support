# Export ⚙️
By default your Unity scene is always exported on save (if it contains a valid ``ExportInfo`` component). This setting can be changed by disabling ``Auto Export`` in the ``ExportInfo`` component.

## Exporting GLTF files
To export meshes, materials, animations, textures (...) create a new GameObject and add a ``GltfObject`` component to it. This is the root of a new ``.gltf`` file. It will be exported whenever you make a change to the scene and save (Use the ``Smart Export`` setting to only export when the a object in this GLTF file changes). Add a cube to the file and save your scene. Note that the output ``assets/`` folder (see [project structure](#vite-project-structure)) now contains a new ``.gltf`` file with the same name as your new GameObject.  
- **Note**: Scripts can be added inside or outside of GLTF files but meshes are only exported as part of a GLTF.   
  Read about [scripting here](./scripting.md)

### GLTF Prefabs
It is also possible to create [Prefabs ⇡](https://docs.unity3d.com/Manual/Prefabs.html) in Unity and add a ``GltfObject`` component to its root. If you reference this prefab from any of your components in your scene it will automatically be exported. These exports can also be nested (so a component in a Prefab can reference another Prefab which will then also be exported).  
For how to easily load those exported prefabs please refer to the [``AssetReference`` section](scripting.md#assetreference--addressables) in the scripting documentation.

## Exporting the Skybox
The Unity skybox and environment map are automatically exported as part of the ``<scene_name>_resources.glb``. You can access them at runtime using for example ``this.context.assets.findTexture("Skybox")``

## Exporting Shaders
To export custom shaders (e.g. ShaderGraph shaders) from Unity to threejs you can simply add a ``ExportShader`` Asset Label (see bottom of the inspector) to either your shader or material.

## Exporting Lightmaps
To export lightmaps you simply [generate lightmaps ⇡](https://docs.unity3d.com/Manual/Lightmapping.html) in Unity. Lightmaps will be automatically exported.
