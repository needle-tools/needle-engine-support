# Technical Overview

## glTF Assets


### Supported extensions

A typical production glTF created by Needle Engine uses the following extensions:  
```json
"extensionsUsed": [
  "KHR_lights_punctual",
  "KHR_materials_unlit",
  "KHR_texture_transform",
  "KHR_animation_pointer",
  "KHR_techniques_webgl",
  "NEEDLE_gameobject_data",
  "NEEDLE_components",
  "NEEDLE_persistent_assets",
  "NEEDLE_lightmaps",
  "NEEDLE_lighting_settings",
  "KHR_texture_basisu",
  "KHR_draco_mesh_compression"
]
```

## Vendor-specific glTF Extensions (NEEDLE_*)

Needle Engine stores custom data in glTF files through vendor extensions. This covers everything from components to animator controllers to lightmaps.  

> We're currently not prodiving schemas for these extensions as they are still in development. The information below demonstrates extension usage by example and includes notes on architectural choices and what we may change in future releases.  

> References between pieces of data are currently constructed through a mix of indices into other parts of the glTF file and JSON pointers. We may consolidate these approaches in a future release. We're also storing string-based GUIDs for cases where ordering is otherwise hard to resolve (e.g. two components referencing each other) that we may remove in the future.  

### NEEDLE_components

This extension contains per-node component data. The component names map to type names on both the JavaScript and C# side.  
Multiple components with the same name can be added to the same node.  

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

> **Note**: Storing only the component type name means that type names currently need to be unique per project. We're planning to include package names in a future release to loosen this constraint to unique component type names per package instead of globally.  

> **Note**: Currently there's no versioning information in the extension (which npm packaage does a component belong to, which version of that package was it exported against). We're planning to include versioning information in a future release.  

> **Note**: Currently all components are in the `builtin_components` array. We might rename this to just `components` in a future release.  

### NEEDLE_gameobject_data

This extension contains additional per-node data related to state, layers, and tags. Layers are used for both rendering and physics, similar to how [three.js](https://threejs.org/docs/#api/en/core/Layers) and [Unity](https://docs.unity3d.com/Manual/Layers.html) treat them.  

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

> **Note**: We may need to better explain why this is not another entry in [`NEEDLE_components`](#needle_components). 

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

> **Note**: This extension might have to be defined per-scene instead of per-file.

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

> **Note**: At the moment this extension also contains environment texture references. We're planning to change that in a future release. 

| Texture Type | Value |
| -- | -- |
| Lightmap | 0 |
| Skybox  | 1 |
| Reflection | 2 |

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

> **Note**: We may change that in a future release and move lightmap-related data to a `NEEDLE_lightmap` extension entry per node. 

### NEEDLE_persistent_assets

Components in `NEEDLE_components` can reference data via JSON Pointers. These pieces of data are often referenced multiple times by different components, and are thus stored separately in a root extension `NEEDLE_persistent_assets`. By design, they are always referenced by something else, and thus do not store type information at all: they're simply pieces of JSON data and components referencing them currently need to know what they expect. 

Examples for assets/data stored in here are:  
- AnimatorControllers, their layers and states
- PlayableAssets (timelines), their tracks and embedded clips
- SignalAssets
- ...

Data in `persistent_assets` can reference other `persistent_assets` via JSON Pointer, but by design can't reference `NEEDLE_components`. This is similar to the separation beween "Scene data" and "AssetDatabase content" in Unity. 

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
}
```

> **Note**: We might include more type and versioning information in the future. 

### NEEDLE_techniques_webgl

This extension builds upon the archived [`KHR_techniques_webgl`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Archived/KHR_techniques_webgl) extension and extends it in a few crucial places. While the original extension was specified against WebGL 1.0, we're using it with WebGL 2.0 here and have added a number of  uniform types.  

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
      "uri": "<embedded WebGL fragment shader code>",
      "id": 1
    },
    {
      "name": "Pass-VERTEX",
      "type": 35633,
      "uri": "<embedded WebGL vertex shader code>",
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

> **Note**: Currently, vertex and fragment shaders are always embedded as URI; we plan on moving that data into more reasonable bufferViews in the future.  

> **Note**: There's some redundant properties in here that we plan on cleaning up.  

## TypeScript

## Rendering with three.js