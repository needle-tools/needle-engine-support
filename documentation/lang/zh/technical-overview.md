# 技术概述

## 工作原理

Needle Engine 大约包含三个部分：
- 允许您从例如 Unity Editor 设置 Needle Engine 场景的许多**组件和工具**。
- 将场景和组件数据转换为 glTF 的**导出器**。
- 加载并运行生成的 glTF 文件及其扩展的**Web 运行时**。

Web 运行时使用 three.js 进行渲染，在 three 场景图之上添加了一个组件系统，并为我们的自定义 glTF 扩展连接了扩展加载器。

实际上，这使得 Unity 或 Blender 等工具成为空间 Web 开发的强大工具——将 glTF 资源添加到典型的 HTML、CSS、JavaScript 和打包工作流程中。

## glTF 资源

模型、纹理、动画、灯光、相机等在 Needle Engine 中存储为 [glTF 2.0 文件](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)。
自定义数据存储在[供应商扩展](#vendor-specific-gltf-extensions-needle_)中。这些涵盖了从交互式组件到物理、序列和光照贴图的一切。

### 支持的 glTF 扩展

Needle Engine 创建的典型生产环境 glTF 使用以下扩展：
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

其他支持的扩展：
```
EXT_meshopt_compression
EXT_mesh_gpu_instancing (import and export)
```

支持的材质扩展：

```
KHR_materials_clearcoat
KHR_materials_ior
KHR_materials_specular
KHR_materials_transmission
KHR_materials_iridescence
KHR_materials_unlit
KHR_materials_volume
```

可以使用 UnityGLTF 的导出回调（尚未文档化）和 three.js 的 [glTF 导入扩展](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) 添加更多扩展和自定义扩展。

> **注意**：使用这些扩展的材质可以通过 UnityGLTF 的 `PBRGraph` 材质从 Unity 中导出。

> **注意**：Needle Engine 已通过 `NEEDLE_components` 和 `NEEDLE_persistent_assets` 支持音频和变体，但仍有一些选项可以更贴合现有提案，例如 `KHR_audio` 和 `KHR_materials_variants`。

[了解更多关于 three.js 中 GLTF 加载的信息](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)

### 压缩

在生产环境中，我们使用 [`glTF-transform`](https://gltf-transform.donmccurdy.com/) 压缩 glTF 资源。根据纹理类型，纹理使用 `etc1s`、`uastc`、`webp` 或不压缩。网格默认使用 `draco`，但可以配置使用 `meshtopt`（每个 glTF 文件）。自定义扩展以不透明的方式传递。

请参阅[部署与压缩](./deployment.md#optimization-and-compression-options)页面了解更多信息

## 供应商特定的 glTF 扩展 (NEEDLE_*)

Needle Engine 通过我们的供应商扩展将自定义数据存储在 glTF 文件中。这些扩展设计得灵活，允许放入相对任意的数据。值得注意的是，这些文件中不存储任何代码。交互式组件在运行时从数据中恢复。这与 Unity 中 AssetBundles 的工作方式有些相似——资产的接收方需要拥有与文件中存储的组件相匹配的代码。

> 我们目前不提供这些扩展的模式（schemas），因为它们仍在开发中。下面的 JSON 片段通过示例展示了扩展的使用，并包含对架构选择以及未来版本中可能更改的内容的说明。

> 数据之间的引用目前通过索引指向 glTF 文件的其他部分和 JSON 指针的混合方式构建。我们可能会在未来版本中整合这些方法。对于难以解决排序问题的情况（例如两个组件相互引用），我们还存储基于字符串的 GUID，这些 GUID 可能会在未来移除。

### NEEDLE_components

此扩展包含每个节点的组件数据。组件名称映射到 JavaScript 和 C# 端的类型名称。
可以在同一个节点上添加多个同名组件。

`NEEDLE_components` 中的数据可以通过当前尚未批准的 [`KHR_animation_pointer`](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer) 扩展进行动画处理。

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

> **注意**：仅存储组件类型名称意味着当前类型名称在每个项目中必须是唯一的。我们计划在未来版本中包含包名，以将此限制放宽到每个包中的唯一组件类型名称，而不是全局唯一。

> **注意**：目前扩展中没有版本信息（组件属于哪个 npm 包，它是针对该包的哪个版本导出的）。我们计划在未来版本中包含版本信息。

> **注意**：目前所有组件都在 `builtin_components` 数组中。我们可能会在未来版本中将其重命名为 `components`。

### NEEDLE_gameobject_data

此扩展包含与状态、层（layers）和标签（tags）相关的每个节点的附加数据。层用于渲染和物理，类似于 [three.js](https://threejs.org/docs/#api/en/core/Layers) 和 [Unity](https://docs.unity3d.com/Manual/Layers.html) 处理它们的方式。

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

> **注意**：我们可能需要更好地解释为什么这不像 [`NEEDLE_components`](#needle_components) 中的另一个条目。

### NEEDLE_lighting_settings

这是一个定义每个 glTF 文件环境光照属性的根扩展。

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

> **注意**：这个扩展可能需要按场景定义而不是按文件定义。

### NEEDLE_lightmaps

这是一个为 glTF 文件定义一组光照贴图（lightmaps）的根扩展。

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

> **注意**：目前此扩展也包含环境纹理引用。我们计划在未来版本中更改此内容。

| 纹理类型 | 值 |
| -- | -- |
| 光照贴图 | 0 |
| 环境贴图 | 1 |
| 反射贴图 | 2 |

光照贴图的应用方式在 [`NEEDLE_components`](#needle_components) 扩展中每个节点的 `MeshRenderer` 组件中定义：

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

> **注意**：我们可能会在未来版本中更改此内容，并将光照贴图相关数据移至每个节点的 `NEEDLE_lightmap` 扩展条目中。

### NEEDLE_persistent_assets

`NEEDLE_components` 中的组件可以通过 JSON 指针引用数据。`NEEDLE_persistent_assets` 中的数据通常被不同的组件多次引用，因此单独存储在根扩展中。根据设计，它们总是被其他事物引用（或彼此之间存在引用），因此根本不存储类型信息：它们只是 JSON 数据片段，引用它们的组件目前需要知道它们期望什么。

存储在这里的资产/数据示例包括：
- AnimatorControllers，它们的层和状态
- PlayableAssets（时间轴），它们的轨道和嵌入的剪辑
- SignalAssets
- ...

`persistent_assets` 中的数据可以通过 JSON 指针引用其他 `persistent_assets`，但根据设计不能引用 `NEEDLE_components`。这类似于 Unity 中“场景数据”和“AssetDatabase 内容”之间的分离。

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

> **注意**：我们将来可能会包含更多类型和版本信息。

### NEEDLE_techniques_webgl

此扩展基于已归档的 [`KHR_techniques_webgl`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Archived/KHR_techniques_webgl) 扩展，并在几个关键地方进行了扩展。虽然原始扩展是针对 WebGL 1.0 规范的，但我们在此处将其与 WebGL 2.0 一起使用，并添加了许多 uniform 类型。

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

> **注意**：目前，顶点和片段着色器总是以 URI 的形式嵌入；我们计划在未来将这些数据移入更合理的 bufferViews。

> **注意**：这里有一些冗余属性，我们计划进行清理。

## TypeScript 和数据映射

> 🏗️ 正在建设中

## 使用 three.js 进行渲染

> 🏗️ 正在建设中

## 为什么不编译到 WebAssembly？

虽然 Unity 从 C# 到 IL 到 C++（通过 IL2CPP）再到 WASM（通过 emscripten）的编译过程很巧妙，但它也相对较慢。即使编译一个简单的项目到 WASM 也需要很多分钟，而且这个过程几乎在每次代码更改时都会重复。其中一些可以通过巧妙的缓存和确保开发版本不会剥离过多代码来避免，但它仍然很慢。
> 我们确实有一些 WASM 翻译的原型，但它远未完成，并且迭代速度仍然很慢，因此我们目前没有积极研究这条路径。

在研究现代 Web 工作流程时，我们发现开发过程中的代码重载时间可以忽略不计，通常在亚秒范围内。这当然牺牲了一些性能（即时解释 JavaScript 而不是在构建时进行编译器优化）来换取灵活性，但浏览器在充分利用 JavaScript 方面做得非常出色。

我们认为，对于迭代和紧密的测试工作流程，能够尽快、尽可能频繁地在设备和目标平台（在这种情况下是浏览器）上进行测试是有益的——这就是为什么我们跳过 Unity 的整个播放模式，实际上始终在浏览器中运行。

> **注意**：一个非常好的副作用是避免了通常在每次进入播放模式时需要花费 15-60 秒的整个缓慢的“域重载”步骤。按下播放按钮的那一刻，您就在浏览器中“实时”运行了。


页面由AI自动翻译