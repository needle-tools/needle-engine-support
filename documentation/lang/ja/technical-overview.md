# 技術概要

## 仕組み

Needle Engine は、おおよそ 3 つの要素で構成されています。
- たとえば Unity Editor から Needle Engine 用のシーンを設定できる、多くの**コンポーネントとツール**。
- シーンおよびコンポーネントのデータを glTF に変換する**エクスポーター**。
- 生成された glTF ファイルとその拡張機能を読み込み、実行する**ウェブ ランタイム**。

ウェブ ランタイムはレンダリングに three.js を使用し、three シーン グラフの上にコンポーネント システムを追加し、カスタム glTF 拡張機能の拡張ローダーを接続します。

これにより、実質的に Unity や Blender のようなツールが空間ウェブ開発の強力なツールに変わります。glTF アセットが一般的な HTML、CSS、JavaScript、およびバンドル ワークフローに追加されます。

## glTF アセット

モデル、テクスチャ、アニメーション、ライト、カメラなどは、Needle Engine では [glTF 2.0 ファイル](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)として保存されます。
カスタム データは [ベンダー固有の glTF 拡張機能](#vendor-specific-gltf-extensions-needle_)に保存されます。これらは、インタラクティブなコンポーネントから物理、シーケンス、ライトマップまで、すべてをカバーします。

### サポートされる glTF 拡張機能

Needle Engine によって作成される一般的なプロダクション glTF は、以下の拡張機能を使用します。
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

その他のサポートされる拡張機能：
```
EXT_meshopt_compression
EXT_mesh_gpu_instancing (import and export)
```

サポートされるマテリアル拡張機能：

```
KHR_materials_clearcoat
KHR_materials_ior
KHR_materials_specular
KHR_materials_transmission
KHR_materials_iridescence
KHR_materials_unlit
KHR_materials_volume
```

UnityGLTF のエクスポート コールバック (未文書化) および three.js の [glTF インポート拡張機能](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)を使用して、さらに多くの拡張機能やカスタム拡張機能を追加できます。

> **注**: これらの拡張機能を使用するマテリアルは、UnityGLTF の `PBRGraph` マテリアルを介して Unity からエクスポートできます。

> **注**: オーディオとバリアントは、`NEEDLE_components` および `NEEDLE_persistent_assets` を介して Needle Engine で既にサポートされていますが、`KHR_audio` および `KHR_materials_variants` のような既存の提案とのより多くの整合性に対するいくつかのオプションがあります。

[three.js での glTF の読み込みについてさらに学ぶ](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)

### 圧縮

プロダクション向けには、`glTF-transform` を使用して glTF アセットを圧縮します。テクスチャは、テクスチャ タイプに応じて、`etc1s`、`uastc`、`webp` または圧縮なしを使用します。メッシュはデフォルトで `draco` を使用しますが、`meshtopt` を使用するように設定できます (glTF ファイルごと)。カスタム拡張機能は不透明な方法でパススルーされます。

詳細については、[デプロイメントと圧縮](./deployment.md#optimization-and-compression-options)のページを参照してください。

## ベンダー固有の glTF 拡張機能 (NEEDLE_*)

Needle Engine は、ベンダー拡張機能を使用して glTF ファイルにカスタム データを保存します。これらの拡張機能は柔軟に設計されており、比較的任意のデータをそれらに格納できます。特に、これらのファイルにはコードは保存されません。インタラクティブなコンポーネントは実行時にデータから復元されます。これは、Unity の AssetBundles が機能する方法といくつかの類似点があります。アセットの受信側は、ファイルに保存されているコンポーネントに対応するコードを持っている必要があります。

> これらの拡張機能はまだ開発中であるため、現在スキーマを提供していません。以下の JSON スニペットは、使用例を通じて拡張機能の使用法を示しており、アーキテクチャ上の選択肢や今後のリリースで変更する可能性のあるものに関する注記が含まれています。

> データの間の参照は、glTF ファイルの他の部分へのインデックスと JSON ポインターの組み合わせを通じて現在構築されています。今後のリリースでこれらのアプローチを統合する可能性があります。また、順序解決が困難な場合 (たとえば、相互に参照する 2 つのコンポーネント) には、文字列ベースの GUID を格納していますが、これも将来削除する可能性があります。

### NEEDLE_components

この拡張機能にはノードごとのコンポーネント データが含まれています。コンポーネント名は、JavaScript 側と C# 側の両方でタイプ名にマッピングされます。
同じ名前の複数のコンポーネントを同じノードに追加できます。

`NEEDLE_components` のデータは、現在まだ批准されていない `KHR_animation_pointer` 拡張機能を通じてアニメーション化できます。

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

> **注**: コンポーネントのタイプ名のみを保存するということは、現在タイプ名はプロジェクトごとに一意である必要があることを意味します。将来のリリースでは、この制約をグローバルではなくパッケージごとの一意のコンポーネント タイプ名に緩和するために、パッケージ名を含めることを計画しています。

> **注**: 現在、拡張機能にはバージョン情報がありません (どの npm パッケージにコンポーネントが属しているか、どのバージョンのそのパッケージに対してエクスポートされたか)。将来のリリースでは、バージョン情報を含めることを計画しています。

> **注**: 現在、すべてのコンポーネントは `builtin_components` 配列に含まれています。将来のリリースでこれを単に `components` に名前変更する可能性があります。

### NEEDLE_gameobject_data

この拡張機能には、状態、レイヤー、タグに関連するノードごとの追加データが含まれています。レイヤーは、[three.js](https://threejs.org/docs/#api/en/core/Layers) および [Unity](https://docs.unity3d.com/Manual/Layers.html) が扱う方法と同様に、レンダリングと物理の両方で使用されます。

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

> **注**: これがなぜ [`NEEDLE_components`](#needle_components) の別のエントリではないのかについて、より詳しく説明する必要があるかもしれません。

### NEEDLE_lighting_settings

これは、glTF ファイルごとの環境光プロパティを定義するルート拡張機能です。

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

> **注**: この拡張機能は、ファイルごとではなくシーンごとに定義する必要があるかもしれません。

### NEEDLE_lightmaps

これは、glTF ファイルのライトマップのセットを定義するルート拡張機能です。

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

> **注**: 現時点では、この拡張機能には環境テクスチャ参照も含まれています。将来のリリースでこれを変更することを計画しています。

| Texture Type | Value |
| -- | -- |
| Lightmap | 0 |
| Environment Map  | 1 |
| Reflection Map | 2 |

ライトマップがどのように適用されるかは、[`NEEDLE_components`](#needle_components) 拡張機能内の MeshRenderer コンポーネントでノードごとに定義されます。

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

> **注**: 将来のリリースでこれを変更し、ライトマップ関連のデータをノードごとの `NEEDLE_lightmap` 拡張エントリに移動する可能性があります。

### NEEDLE_persistent_assets

`NEEDLE_components` 内のコンポーネントは、JSON Pointers を介してデータを参照できます。`NEEDLE_persistent_assets` のデータは、異なるコンポーネントによって複数回参照されることが多いため、ルート拡張機能として個別に保存されます。設計上、それらは常に何か他のものによって参照されるか (または相互に参照を持つか)、したがってタイプ情報をまったく保存しません。それらは単に JSON データの断片であり、それらを参照するコンポーネントは現在、何を期待するかを知っている必要があります。

ここに保存されるアセット/データの例としては、以下のようなものがあります。
- AnimatorControllers、そのレイヤーと状態
- PlayableAssets (タイムライン)、そのトラックと埋め込みクリップ
- SignalAssets
- ...

`persistent_assets` のデータは、JSON Pointer を介して他の `persistent_assets` を参照できますが、設計上、`NEEDLE_components` を参照することはできません。これは、Unity の「シーンデータ」と「アセットデータベースの内容」の間の分離に似ています。

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

> **注**: 今後、より多くのタイプ情報とバージョン情報を含める可能性があります。

### NEEDLE_techniques_webgl

この拡張機能は、アーカイブされた `KHR_techniques_webgl` 拡張機能に基づき、いくつかの重要な箇所を拡張しています。元の拡張機能は WebGL 1.0 に対して指定されていましたが、ここでは WebGL 2.0 で使用し、多数の uniform 型を追加しています。

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

> **注**: 現在、頂点シェーダーとフラグメント シェーダーは常に URI として埋め込まれています。将来、そのデータを、より合理的な bufferViews に移動することを計画しています。

> **注**: ここにはいくつかの冗長なプロパティがあり、それらをクリーンアップすることを計画しています。

## TypeScript とデータのマッピング

> 🏗️ 開発中

## three.js を使用したレンダリング

> 🏗️ 開発中

## なぜ WebAssembly にコンパイルしないのですか？

C# から IL、C++ (IL2CPP 経由)、WASM (emscripten 経由) への Unity のコンパイル プロセスは独創的ですが、比較的遅いです。単純なプロジェクトでも WASM にビルドするには何分もかかり、コードを変更するたびにそのプロセスがほぼ繰り返されます。賢いキャッシングや開発ビルドでのコード ストリッピングを最小限に抑えることで回避できる部分もありますが、それでも遅いままです。
> WASM 翻訳のプロトタイプはありますが、完成にはほど遠く、イテレーション速度が遅いため、現在は積極的にこのパスを調査していません。

現代のウェブ ワークフローを見ると、開発中のコード リロード時間は無視できるほどで、通常は 1 秒未満の範囲です。これはもちろん、(ビルド時のコンパイラ最適化の代わりに、その場での JavaScript の解釈という) 多少のパフォーマンスを柔軟性と引き換えにしていますが、ブラウザは JavaScript を最大限に活用することに非常に優れています。

イテレーションと厳密なテスト ワークフローにとって、可能な限り迅速かつ頻繁にデバイス上およびターゲット プラットフォーム (この場合はブラウザ) でテストできることが有益であると私たちは信じています。そのため、私たちは Unity のプレイモード全体をスキップし、実質的に常にブラウザで実行しています。

> **注**: 非常に良い副次効果は、通常プレイモードに入るたびに 15～60 秒かかる遅い「ドメイン リロード」ステップ全体を回避できることです。プレイを押した瞬間にブラウザで「ライブ」になります。


---
このページはAIによって自動的に翻訳されました。