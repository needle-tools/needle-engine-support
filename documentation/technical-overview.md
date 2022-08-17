# Technical Overview

## glTF Assets

## glTF Extensions

### Supported extensions

A typical production glTF produced by Needle Engine uses the following extensions:
```json
"extensionsUsed": [
  "KHR_lights_punctual",
  "KHR_materials_unlit",
  "KHR_texture_transform",
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
      "roomName": "M3-HQ",
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
      "name": "MeshRenderer",
      "guid": "101602552827019996_963857268",
      "shadowCastingMode": 1,
      "receiveShadows": true,
      "lightmapIndex": 2,
      "lightmapScaleOffset": {
        "x": 0.0289265569,
        "y": 0.0289265569,
        "z": 0.607308865,
        "w": 0.26061812
      },
      "enableInstancing": [
        false
      ],
      "renderOrder": [
        0
      ]
    }
  ]
}
```

> **Note**: Storing only the component type name means that type names currently need to be unique per project. We're planning to include package names in a future release to loosen this constraint to unique component type names per package instead of globally.  

> **Note**: Currently there's no versioning information in the extension (which npm packaage does a component belong to, which version of that package was it exported against). We're planning to include versioning information in a future release.  

> **Note**: Currently all components are in the `builtin_components` array. This may be renamed to just `components` in a future release.  

### NEEDLE_gameobject_data

This extension contains additional per-node data related to state, layers, and tags. 

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

> **Note**: We may need to better explain why this is not simply another entry in NEEDLE_component. 

### NEEDLE_lighting_settings

This is a root extension defining ambient lighting and intensity per glTF file.   

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

How lightmaps are applied is defined in the `MeshRenderer` component inside the `NEEDLE_components` extension per node:  

```json
"NEEDLE_components": {
  "builtin_components": [
    {
      "name": "MeshRenderer",
      "guid": "11047666986256490050_963857268",
      "shadowCastingMode": 1,
      "receiveShadows": true,
      "lightmapIndex": 0,
      "lightmapScaleOffset": {
        "x": 1.00579774,
        "y": 1.00579774,
        "z": -0.00392889744,
        "w": -0.00392889744
      },
      "enableInstancing": [
        false
      ],
      "renderOrder": [
        0
      ]
    }
  ]
}
```

> **Note**: We're planning to change that in a future release and move lightmap-related data to a `NEEDLE_lightmap` extension entry per node.

### NEEDLE_persistent_assets

### KHR_techniques_webgl



## TypeScript



## Rendering with three.js

