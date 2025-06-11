# Tổng quan kỹ thuật

## Cách hoạt động

Needle Engine về cơ bản bao gồm ba phần:
- Một số **component và công cụ** cho phép bạn thiết lập scene cho Needle Engine từ ví dụ như Unity Editor.
- Một **exporter** chuyển đổi dữ liệu scene và component thành glTF.
- Một **web runtime** tải và chạy các tệp glTF được tạo cùng với các extension của chúng.

Web runtime sử dụng three.js để rendering, bổ sung hệ thống component lên trên scene graph của three và kết nối các extension loader cho các glTF extension tùy chỉnh của chúng tôi.

Thực tế, điều này biến các công cụ như Unity hoặc Blender thành những công cụ phát triển web không gian mạnh mẽ – bổ sung các asset glTF vào quy trình làm việc điển hình của HTML, CSS, JavaScript và bundling.

## glTF Assets

Các model, texture, animation, đèn, camera và nhiều thứ khác được lưu trữ dưới dạng [tệp glTF 2.0](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) trong Needle Engine.
Dữ liệu tùy chỉnh được lưu trữ trong [vendor extensions](#vendor-specific-gltf-extensions-needle_). Chúng bao gồm mọi thứ từ interactive component đến vật lý, sequencing và lightmap.

### Các glTF extension được hỗ trợ

Một glTF sản xuất điển hình được tạo bởi Needle Engine sử dụng các extension sau:
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

Các extension được hỗ trợ khác:
```
EXT_meshopt_compression
EXT_mesh_gpu_instancing (import and export)
```

Các material extension được hỗ trợ:

```
KHR_materials_clearcoat
KHR_materials_ior
KHR_materials_specular
KHR_materials_transmission
KHR_materials_iridescence
KHR_materials_unlit
KHR_materials_volume
```

Có thể thêm nhiều extension khác và custom extension bằng cách sử dụng export callback của UnityGLTF (chưa được tài liệu hóa) và [glTF import extension](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) của three.js.

> **Lưu ý**: Các material sử dụng các extension này có thể được export từ Unity thông qua material `PBRGraph` của UnityGLTF.

> **Lưu ý**: Audio và variant đã được hỗ trợ trong Needle Engine thông qua `NEEDLE_components` và `NEEDLE_persistent_assets`, nhưng có một số tùy chọn để điều chỉnh cho phù hợp hơn với các đề xuất hiện có như `KHR_audio` và `KHR_materials_variants`.

[Tìm hiểu thêm về tải GLTF trong three.js](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)

### Compression

Đối với sản xuất, chúng tôi nén các asset glTF bằng [`glTF-transform`](https://gltf-transform.donmccurdy.com/). Các texture sử dụng `etc1s`, `uastc`, `webp` hoặc không nén, tùy thuộc vào loại texture. Các mesh sử dụng `draco` theo mặc định nhưng có thể được cấu hình để sử dụng `meshtopt` (mỗi tệp glTF). Custom extension được chuyển qua một cách opaque.

Xem trang [deployment & compression](./deployment.md#optimization-and-compression-options) để biết thêm thông tin.

## Vendor-specific glTF Extensions (NEEDLE_*)

Needle Engine lưu trữ dữ liệu tùy chỉnh trong các tệp glTF thông qua các vendor extension của chúng tôi. Các extension này được thiết kế linh hoạt và cho phép đưa dữ liệu tương đối tùy ý vào chúng. Đặc biệt, không có code nào được lưu trữ trong các tệp này. Interactive component được khôi phục từ dữ liệu tại runtime. Điều này có một số điểm tương đồng với cách AssetBundles hoạt động trong Unity – phía nhận một asset cần phải có code tương ứng cho các component được lưu trữ trong tệp.

> Hiện tại chúng tôi chưa cung cấp schema cho các extension này vì chúng vẫn đang trong giai đoạn phát triển. Các đoạn mã JSON dưới đây minh họa việc sử dụng extension theo ví dụ và bao gồm các ghi chú về các lựa chọn kiến trúc và những gì chúng tôi có thể thay đổi trong các bản phát hành tương lai.

> Các tham chiếu giữa các phần dữ liệu hiện được xây dựng thông qua sự kết hợp giữa các chỉ mục tới các phần khác của tệp glTF và JSON pointer. Chúng tôi có thể hợp nhất các phương pháp này trong một bản phát hành tương lai. Chúng tôi cũng đang lưu trữ các GUID dựa trên chuỗi cho các trường hợp thứ tự khó giải quyết (ví dụ: hai component tham chiếu lẫn nhau) mà chúng tôi có thể loại bỏ trong tương lai.

### NEEDLE_components

Extension này chứa dữ liệu component trên mỗi node. Tên component ánh xạ tới tên kiểu dữ liệu ở cả phía JavaScript và C#.
Có thể thêm nhiều component có cùng tên vào cùng một node.

Dữ liệu trong `NEEDLE_components` có thể được animation thông qua extension [`KHR_animation_pointer`](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer) hiện chưa được phê chuẩn.

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

> **Lưu ý**: Việc chỉ lưu trữ tên kiểu component có nghĩa là tên kiểu hiện tại cần phải là duy nhất cho mỗi dự án. Chúng tôi đang lên kế hoạch bao gồm tên package trong một bản phát hành tương lai để nới lỏng ràng buộc này thành tên kiểu component duy nhất cho mỗi package thay vì trên toàn cầu.

> **Lưu ý**: Hiện tại không có thông tin versioning trong extension (component thuộc về package npm nào, phiên bản nào của package đó được export). Chúng tôi đang lên kế hoạch bao gồm thông tin versioning trong một bản phát hành tương lai.

> **Lưu ý**: Hiện tại tất cả các component đều nằm trong mảng `builtin_components`. Chúng tôi có thể đổi tên mảng này thành `components` trong một bản phát hành tương lai.

### NEEDLE_gameobject_data

Extension này chứa dữ liệu bổ sung trên mỗi node liên quan đến state, layer và tag. Layer được sử dụng cho cả rendering và physics, tương tự như cách [three.js](https://threejs.org/docs/#api/en/core/Layers) và [Unity](https://docs.unity3d.com/Manual/Layers.html) xử lý chúng.

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

> **Lưu ý**: Chúng tôi có thể cần giải thích rõ hơn lý do tại sao đây không phải là một mục khác trong [`NEEDLE_components`](#needle_components).

### NEEDLE_lighting_settings

Đây là một root extension định nghĩa các thuộc tính ambient lighting cho mỗi tệp glTF.

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

> **Lưu ý**: Extension này có thể phải được định nghĩa cho mỗi scene thay vì mỗi tệp.

### NEEDLE_lightmaps

Đây là một root extension định nghĩa một tập hợp các lightmap cho tệp glTF.

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

> **Lưu ý**: Hiện tại extension này cũng chứa các tham chiếu environment texture. Chúng tôi đang lên kế hoạch thay đổi điều đó trong một bản phát hành tương lai.

| Loại Texture | Giá trị |
| -- | -- |
| Lightmap | 0 |
| Environment Map  | 1 |
| Reflection Map | 2 |

Cách lightmap được áp dụng được định nghĩa trong component `MeshRenderer` bên trong extension [`NEEDLE_components`](#needle_components) cho mỗi node:

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

> **Lưu ý**: Chúng tôi có thể thay đổi điều đó trong một bản phát hành tương lai và chuyển dữ liệu liên quan đến lightmap sang một mục nhập extension `NEEDLE_lightmap` cho mỗi node.

### NEEDLE_persistent_assets

Các component trong `NEEDLE_components` có thể tham chiếu dữ liệu thông qua JSON Pointer. Dữ liệu trong `NEEDLE_persistent_assets` thường được tham chiếu nhiều lần bởi các component khác nhau và do đó được lưu trữ riêng trong một root extension. Theo thiết kế, chúng luôn được thứ gì đó khác tham chiếu (hoặc có tham chiếu bên trong chúng), và do đó không lưu trữ thông tin kiểu dữ liệu nào cả: chúng chỉ đơn giản là các phần dữ liệu JSON và các component tham chiếu chúng hiện tại cần phải biết chúng mong đợi điều gì.

Ví dụ về asset/dữ liệu được lưu trữ ở đây là:
- AnimatorControllers, layer và state của chúng
- PlayableAssets (timeline), track và clip nhúng của chúng
- SignalAssets
- ...

Dữ liệu trong `persistent_assets` có thể tham chiếu các `persistent_assets` khác thông qua JSON Pointer, nhưng theo thiết kế không thể tham chiếu `NEEDLE_components`. Điều này tương tự như sự tách biệt giữa "Scene data" và "AssetDatabase content" trong Unity.

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

> **Lưu ý**: Chúng tôi có thể bao gồm thêm thông tin kiểu và versioning trong tương lai.

### NEEDLE_techniques_webgl

Extension này xây dựng dựa trên extension [`KHR_techniques_webgl`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Archived/KHR_techniques_webgl) đã được lưu trữ và mở rộng nó ở một số điểm quan trọng. Mặc dù extension gốc được chỉ định dựa trên WebGL 1.0, chúng tôi đang sử dụng nó với WebGL 2.0 ở đây và đã thêm một số kiểu uniform.

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

> **Lưu ý**: Hiện tại, vertex và fragment shader luôn được nhúng dưới dạng URI; chúng tôi có kế hoạch chuyển dữ liệu đó vào các bufferView hợp lý hơn trong tương lai.

> **Lưu ý**: Có một số thuộc tính dư thừa ở đây mà chúng tôi có kế hoạch làm sạch.

## TypeScript và Data Mapping

> 🏗️ Đang xây dựng

## Rendering với three.js

> 🏗️ Đang xây dựng

## Tại sao bạn không biên dịch sang WebAssembly?

Mặc dù quy trình biên dịch của Unity từ C# sang IL sang C++ (thông qua IL2CPP) sang WASM (thông qua emscripten) rất khéo léo, nhưng nó cũng tương đối chậm. Xây dựng ngay cả một dự án đơn giản thành WASM mất nhiều phút và quy trình đó gần như lặp lại với mỗi lần thay đổi code. Một phần của nó có thể tránh được thông qua caching thông minh và đảm bảo rằng các bản build dev không cố gắng loại bỏ nhiều code, nhưng nó vẫn chậm.
> Chúng tôi có một nguyên mẫu cho một số bản dịch WASM, nhưng nó còn lâu mới hoàn thành và tốc độ lặp lại vẫn chậm, vì vậy chúng tôi hiện tại không tích cực nghiên cứu con đường này.

Khi xem xét các quy trình làm việc web hiện đại, chúng tôi nhận thấy thời gian tải lại code trong quá trình phát triển là không đáng kể, thường ở mức dưới giây. Điều này tất nhiên đánh đổi một số hiệu suất (thông dịch JavaScript ngay lập tức thay vì tối ưu hóa trình biên dịch tại thời điểm build) lấy sự linh hoạt, nhưng các trình duyệt đã làm rất tốt việc tận dụng tối đa JavaScript.

Chúng tôi tin rằng đối với quy trình lặp lại và kiểm thử chặt chẽ, việc có thể kiểm thử trên thiết bị và trên nền tảng đích (trong trường hợp này là trình duyệt) nhanh chóng và thường xuyên nhất có thể là có lợi – đó là lý do tại sao chúng tôi bỏ qua toàn bộ chế độ play của Unity, thực tế luôn chạy trong trình duyệt.

> **Lưu ý**: Một tác dụng phụ thực sự tốt là tránh được toàn bộ bước "domain reload" chậm chạp thường tốn 15-60 giây mỗi khi bạn vào Play Mode. Bạn chỉ cần "live" trong trình duyệt ngay khi nhấn Play.

Trang được dịch tự động bằng AI