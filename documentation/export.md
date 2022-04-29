# Export ⚙️
By default your Unity scene is always exported on save (if it contains a valid ``ExportInfo`` component). This setting can be changed by disabling ``Auto Export`` in the ``ExportInfo`` component.

## Exporting GLTF files
To export meshes, materials, animations, textures (...) create a new GameObject and add a ``GltfObject`` component to it. This is the root of a new ``.gltf`` file. It will be exported whenever you make a change to the scene and save (Use the ``Smart Export`` setting to only export when the a object in this GLTF file changes). Add a cube to the file and save your scene. Note that the output ``assets/`` folder (see [project structure](#vite-project-structure)) now contains a new ``.gltf`` file with the same name as your new GameObject.  
- **Note**: Scripts can be added inside or outside of GLTF files but meshes are only exported as part of a GLTF.   
  Read about [scripting here](./scripting.md)

## Exporting the Skybox
The Unity skybox and environment map are automatically exported as part of the ``<scene_name>_resources.glb``. You can access them at runtime using for example ``this.context.assets.findTexture("Skybox")``

## Exporting Shaders
TODO

---
# Advanced

## Modifying the Export process

### Interfaces
- ``IEmitter`` - Core interface that is implemented for example for GLTF files and Unity components. It is very low level in the export process and called for every Component on every GameObject in your scene (Note: GameObjects marked as ``EditorOnly`` or start with ``__`` are being ignored completely).
- ``IBuildStageCallbacks`` - implement a method to be invoked at different points in the export process.
- ``IAdditionalDataEmitter`` - Allows to emit additional or generated fields for components/scripts.
- ``IReferenceResolver`` - Allows to handle specific reference types (e.g. AudioSource referencing AudioClips). Example: Used to replace the clip reference with a path to the clip file and copy the clip file to the output directory.
- ``ITypeMemberRegisterHandler`` - Invoked on registering type fields. Default is implemented in ``DefaultTypeRegisterHandler``.
- ``ITypeMemberHandler`` - To modify or ignore fields using ``ShouldIgnore``, ``ShouldRename`` or ``ChangeValue``. Is invoked by ``DefaultTypeRegisterHandler``.
