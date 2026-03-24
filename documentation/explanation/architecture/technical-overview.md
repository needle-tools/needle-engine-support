---
description: Deep dive into Needle Engine architecture - glTF extensions, component system, three.js rendering, and the web runtime powering interactive 3D experiences.
---

# Technical Overview

## How it works

Needle Engine is a **full, production-ready web engine** for interactive 3D experiences. It runs entirely in the browser — no plugins, no app installs, no server-side rendering required.

At its core, Needle Engine is a **web runtime** built on [three.js](https://threejs.org/) that adds a powerful component system on top of the three.js scene graph, with extension loaders for custom glTF extensions. It loads standard glTF 2.0 files, restores interactive components from custom extensions at runtime, and renders them with three.js.

Needle Engine fits naturally into a standard web development workflow — HTML, CSS, JavaScript/TypeScript, and modern bundlers like Vite. You can use it purely from code, or combine it with **editor integrations** for visual scene authoring:

- **Unity integration** — set up scenes, author components, and export to glTF directly from the Unity Editor
- **Blender integration** — author and export scenes from Blender with the Needle Engine add-on

These integrations are optional. Needle Engine works standalone as a web-first engine — the editor integrations simply provide a familiar visual authoring environment for artists and designers.


## glTF Assets

Models, textures, animations, lights, cameras and more are stored as [glTF 2.0 files](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) in Needle Engine.  
Custom data is stored in [vendor extensions](#vendor-specific-gltf-extensions-needle_). These cover everything from interactive components to physics, sequencing and lightmaps.  

### Supported glTF extensions

A typical production glTF created by Needle Engine uses the following extensions:  
```
KHR_lights_punctual
KHR_materials_unlit
KHR_texture_transform
KHR_animation_pointer
NEEDLE_techniques_webgl
NEEDLE_gameobject_data
NEEDLE_components
NEEDLE_persistent_assets
NEEDLE_lightmaps
NEEDLE_lighting_settings
KHR_texture_basisu
KHR_draco_mesh_compression
```

Other supported extensions:
```
EXT_meshopt_compression
EXT_mesh_gpu_instancing (import and export)
```

Supported material extensions:  

```
KHR_materials_clearcoat
KHR_materials_ior
KHR_materials_specular
KHR_materials_transmission
KHR_materials_iridescence
KHR_materials_unlit
KHR_materials_volume
```

Custom glTF extensions can be added on the import side using the [glTF import extensions](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) of three.js, and on the export side through the export callbacks provided by the Unity and Blender integrations.

::: tip Built-in export support for glTF PBR materials
All material extensions listed above are fully supported. In Unity, use UnityGLTF's `PBRGraph` material. In Blender, standard Principled BSDF materials export with these extensions automatically.
:::

::: tip Built-in support for Audio, Variants and more
Audio and variants are already supported in Needle Engine through `NEEDLE_components` and `NEEDLE_persistent_assets`, but there are some options for more alignment to existing proposals such as `KHR_audio` and `KHR_materials_variants`.
:::

[Learn more about GLTF loading in three.js](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)


## Vendor-specific glTF Extensions (NEEDLE_*)

Needle Engine stores custom data in glTF files through vendor extensions. These extensions are designed to be flexible and carry arbitrary structured data. Notably, **no code is stored in the glTF files** — only data. Interactive components are restored from this data at runtime, which means the receiving side needs to have matching component code registered (similar to how a web app needs JavaScript modules to handle its data).

::: tip Extension Design
The JSON snippets below demonstrate extension usage by example and include notes on architectural choices.
:::

### NEEDLE_components

This extension contains per-node component data. The component names map to JavaScript/TypeScript type names at runtime (and to C# type names when using the Unity integration).
Multiple components with the same name can be added to the same node.  

Data in `NEEDLE_components` can be animated via the currently not ratified [`KHR_animation_pointer`](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer) extension.  

```json
"NEEDLE_components": {
  "builtin_components": [
    {
      "name": "WebARSessionRoot",
      "guid": "1516450550",
      "arScale": 50,
      "invertForward": true,
      "enabled": true,
      "gameObject": {
        "node": 0
      }
    },
    {
      "name": "SyncedRoom",
      "guid": "1516450552",
      "roomName": "network-room",
      "urlParameterName": "room",
      "joinRandomRoom": true,
      "requireRoomParameter": false,
      "autoRejoin": true,
      "enabled": true,
      "gameObject": {
        "node": 0
      }
    },
    {
      "name": "PlayableDirector",
      "guid": "2243275882009986562_1668529989451832962",
      "state": 0,
      "extrapolationMode": 1,
      "playableAsset": "extensions/NEEDLE_persistent_assets/4",
      "playableGraph": {},
      "playOnAwake": true,
      "timeUpdateMode": 0,
      "time": 0,
      "initialTime": 0,
      "duration": 135.383333333332,
      "enabled": true,
      "gameObject": {
        "node": 0
      }
    }
  ]
}
```

::: tip Component Type Names
Component type names need to be unique per project. All components are stored in the `builtin_components` array.
:::

### NEEDLE_gameobject_data

This extension contains additional per-node data related to state, layers, and tags. Layers are used for both rendering and physics, similar to how [three.js layers](https://threejs.org/docs/#api/en/core/Layers) work.

```json
"NEEDLE_gameobject_data": {
  "layers": 0,
  "tag": "Untagged",
  "hideFlags": 0,
  "static": false,
  "activeSelf": true,
  "guid": "1516450549"
}
```

::: tip Separate from `NEEDLE_components`
Object information is semantically different from component data.
:::

### NEEDLE_lighting_settings

This is a root extension defining ambient lighting properties per glTF file.   

```json
"NEEDLE_lighting_settings": {
  "ambientMode": 0,
  "ambientLight": [
    0.212,
    0.227,
    0.259,
    1
  ],
  "ambientIntensity": 1,
  "defaultReflectionMode": 0
}
```

::: tip
This extension is defined per glTF file. Ambient settings apply to all scenes within that file.
:::

### NEEDLE_lightmaps

This is a root extension defining a set of lightmaps for the glTF file.

```json
"NEEDLE_lightmaps": {
  "textures": [
    {
      "pointer": "textures/20",
      "type": 1,
      "index": 0
    }
  ]
}
```

::: tip Lightmap Types
This extension also contains environment texture references.
:::

| Texture Type | Value |
| -- | -- |
| Lightmap | 0 |
| Environment Map  | 1 |
| Reflection Map | 2 |

How lightmaps are applied is defined in the `MeshRenderer` component inside the [`NEEDLE_components`](#needle_components) extension per node:  

```json
"NEEDLE_components": {
  "builtin_components": [
    {
      "name": "MeshRenderer",
      ...
      "lightmapIndex": 0,
      "lightmapScaleOffset": {
        "x": 1.00579774,
        "y": 1.00579774,
        "z": -0.00392889744,
        "w": -0.00392889744
      },
      ...
    }
  ]
}
```

::: tip
Lightmap assignment data is stored within the `MeshRenderer` component rather than in a separate per-node extension.
:::

### NEEDLE_persistent_assets

Components in `NEEDLE_components` can reference data via JSON Pointers. The data in `NEEDLE_persistent_assets` is often referenced multiple times by different components and is thus stored separately in a root extension. By design, they are always referenced by something else (or have references within each other), and thus do not store type information at all: they're simply pieces of JSON data and components referencing them currently need to know what they expect. 

Examples for assets/data stored in here are:  
- AnimatorControllers, their layers and states
- PlayableAssets (timelines), their tracks and embedded clips
- SignalAssets
- ...

Data in `persistent_assets` can reference other `persistent_assets` via JSON Pointer, but by design can't reference `NEEDLE_components`. This enforces a clean separation between reusable asset data and per-instance scene data.

```json
{
  "name": "LampionController",
  "guid": "9100000_ecab75bc7ab51a747a4c5c14236a43cd",
  "parameters": [],
  "layers": [
    {
      "name": "Base Layer",
      "stateMachine": {
        "name": "Base Layer",
        "defaultState": 0,
        "states": [
          {
            "name": "LampionFlying",
            "hash": 677739540,
            "motion": {
              "name": "LampionFlying",
              "isLooping": false,
              "guid": "7400000_c296c4d76e956b34f8b5833ba90653c1",
              "clips": [
                {
                  "node": "nodes/4",
                  "clip": "animations/0"
                },
                {
                  "node": "nodes/9",
                  "clip": "animations/6"
                },
                {
                  "node": "nodes/14",
                  "clip": "animations/12"
                }
              ]
            },
            "transitions": [
              {
                "isExit": false,
                "exitTime": 1,
                "hasFixedDuration": true,
                "offset": 0,
                "duration": 0,
                "hasExitTime": true,
                "destinationState": 0,
                "conditions": []
              }
            ]
          }
        ],
        "entryTransitions": []
      }
    }
  ]
},
{
  "name": "TrongCom Website",
  "guid": "11400000_93a8f856fe26af8498d94efe4835af36",
  "tracks": [
    {
      "name": "Markers",
      "type": "MarkerTrack",
      "muted": false,
      "outputs": [
        null
      ],
      "clips": [],
      "markers": [],
      "trackOffset": null
    },
    {
      "name": "Animation Track",
      "type": "AnimationTrack",
      "muted": false,
      "outputs": [
        "5017454109690854928_1668529989451832962"
      ],
      "clips": [
        {
          "start": 0,
          "end": 0.9833333333333333,
          "duration": 0.9833333333333333,
          "timeScale": 1,
          "asset": {
            "clip": "animations/78",
            "loop": false,
            "duration": 8,
            "position": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "rotation": {
              "x": 0,
              "y": 0,
              "z": 0,
              "w": 1
            },
            "removeStartOffset": true
          },
          "clipIn": 0,
          "easeInDuration": 0,
          "easeOutDuration": 0.41666666666666663,
          "preExtrapolationMode": 1,
          "postExtrapolationMode": 1
        },
        ... 
      ]
    }
  ]
}
```
::: tip Persistent Assets
These assets are always referenced by components or other persistent assets, and thus do not store type information — they are simply JSON data, and the referencing component knows what to expect.
:::

### NEEDLE_techniques_webgl

This extension builds upon the archived [`KHR_techniques_webgl`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Archived/KHR_techniques_webgl) extension and extends it for WebGL 2.0 with additional uniform types.

```json
"KHR_techniques_webgl": {
  "programs": [
    {
      "vertexShader": 1,
      "fragmentShader": 0,
      "id": 0
    }
  ],
  "shaders": [
    {
      "name": "Pass-FRAGMENT",
      "type": 35632,
      "uri": "<embedded WebGL fragment shader code ...>",
      "id": 1
    },
    {
      "name": "Pass-VERTEX",
      "type": 35633,
      "uri": "<embedded WebGL vertex shader code ...>",
      "id": 0
    }
  ],
  "techniques": [
    {
      "program": 0,
      "attributes": {},
      "uniforms": {
        "_TimeParameters": {
          "name": "_TimeParameters",
          "type": 35666,
          "semantic": null,
          "count": 1,
          "node": 0
        },
        "hlslcc_mtx4x4unity_MatrixVP": {
          "name": "hlslcc_mtx4x4unity_MatrixVP",
          "type": 35666,
          "semantic": "_VIEWPROJECTION",
          "count": 4,
          "node": 0
        }
      },
      "defines": []
    }
  ]
}     
```

::: tip Embedding vs. bufferViews
Vertex and fragment shaders are embedded as URI. Some properties are redundant for embedded shaders but kept for ease of export.
:::

## Why JavaScript instead of WebAssembly?

Needle Engine is built on JavaScript/TypeScript — the native language of the web. This is a deliberate architectural choice:

- **Instant iteration** — Code changes are reflected in the browser in sub-second time thanks to hot module replacement (HMR). There's no compilation step, no build wait, no domain reload. You're always live.
- **Web-native** — JavaScript integrates seamlessly with the DOM, web APIs, and the entire npm ecosystem. Your 3D experience is a first-class web application.
- **Modern browsers are fast** — V8 and other JavaScript engines have become remarkably performant. For the vast majority of interactive 3D experiences, JavaScript performance is more than sufficient.
- **Tiny footprint** — No large WASM runtime to download. Needle Engine loads fast and starts fast.

Other approaches (like compiling C# or C++ to WebAssembly via emscripten) produce larger bundles, have slower build times, and lose the tight integration with the web platform. Needle Engine takes the opposite approach: embrace the web, write in its native language, and iterate at web speed.

::: tip Zero build step when using editor integrations
When using Needle Engine with Unity or Blender, there's no slow "build" or "domain reload" step. Press Play and you're immediately live in the browser — typically in under a second.
