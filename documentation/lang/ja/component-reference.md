---
title: Needleコアコンポーネント
---

# Needleコアコンポーネント

ここでは、私たちが提供するいくつかのコンポーネントの概要を説明します。その多くは、Unity、Blender、または他の統合機能のコンポーネントや機能に対応しています。

完全なリストについては、[APIドキュメント](https://engine.needle.tools/docs/api/latest)をご覧ください。

いつでも独自のコンポーネントを追加したり、まだ提供していないUnityコンポーネントのラッパーを追加したりできます。

詳細については、ドキュメントの[スクリプティング](./scripting.md)セクションをご覧ください。

## オーディオ
| 名前  | 説明 |
| ------------- | ------------- |
| `AudioListener` |  |
| `AudioSource` | オーディオ再生に使用 |

## アニメーション
| 名前  | 説明 |
| ------------- | ------------- |
| `Animator` と `AnimatorController` | アニメーションステートマシン、条件、トランジションと共にエクスポート  |
| `Animation` | 最も基本的なアニメーションコンポーネント。最初のクリップのみエクスポートされます |
| `PlayableDirector` と `TimelineAsset` | アニメーション、オーディオ、状態などを制御するための強力なシーケンスをエクスポート |

## レンダリング
| 名前  | 説明 |
| ------------- | ------------- |
| `Camera` |  |
| `Light` | DirectionalLight、PointLight、Spotlight。ライトベイク（例: Rectangular Light形状）にも使用できることに注意してください |
| `XRFlag` | オブジェクトが表示されるタイミングを制御します。例: ARモードでのみオブジェクトを有効にする  |
| `DeviceFlag` | どのデバイスでオブジェクトが表示されるかを制御します  |
| `LODGroup` |  |
| `ParticleSystem` | 実験的であり、現在完全にはサポートされていません |
| `VideoPlayer` | URLまたは参照されたビデオファイルからビデオを再生します（エクスポート時に出力にコピーされます）。VideoPlayerは、MediaStreamオブジェクトまたは`M3U8`ライブストリームURLからのストリーミングもサポートしています |
| `MeshRenderer` | ライトマッピングやインスタンシングを含むオブジェクトのレンダリングを処理するために使用されます |
| `SkinnedMeshRenderer` | *MeshRendererを参照* |
| `SpriteRenderer` | SpriteとSpriteアニメーションをレンダリングするために使用されます |
| `Volume` と `PostProcessing` アセット | [下の表](#postprocessing)を参照 |

### ポストプロセス

ポストプロセス効果は、内部的に[pmndrs postprocessing library](https://www.npmjs.com/package/postprocessing)を使用しています。これは、独自のカスタム効果を簡単に追加し、自動的に最適化されたポストプロセスパスを取得できることを意味します。

- **Unityのみ**: *UnityでVolumeを使用したポストプロセス効果はURPでのみサポートされていることに注意してください*

| エフェクト名 | |
| --- | --- | 
| Antialiasing | *追加のUnityコンポーネント* |
| Bloom | *Volumeアセット経由* |
| Chromatic Aberration | *Volumeアセット経由* |
| Color Adjustments / Color Correction | *Volumeアセット経由* | 
| Depth Of Field | *Volumeアセット経由* |
| Vignette | *Volumeアセット経由* |
| ToneMappingEffect | *Volumeアセットまたは個別のコンポーネント経由* |
| Pixelation | |
| Screenspace Ambient Occlusion N8 | |
| Screenspace Ambient Occlusion | |
| Tilt Shift Effect | |
| SharpeningEffect | |
| *あなたのカスタムエフェクト* | [stackblitzの例を参照](https://stackblitz.com/edit/needle-engine-custom-postprocessing-effect) |

## ネットワーキング
| 名前  | 説明 |
| ------------- | ------------- |
| `SyncedRoom` | 主要なネットワーキングコンポーネント。シーンに配置するとネットワーキングが有効になります |
| `Networking` | ネットワーキング用のバックエンドサーバーを設定するために使用されます。 |
| `SyncedTransform` | オブジェクトの変換を自動的にネットワーク化します |
| `SyncedCamera` | カメラの位置とビューをルーム内の他のユーザーに自動的にネットワーク化します。オブジェクトを参照することでカメラがどのようにレンダリングされるかを定義できます |
| `WebXRSync` | WebXRアバター（ARおよびVR）をネットワーク化します |
| `Voip` | ボイスチャットを有効にします |
| `Screensharing` | 画面共有機能を有効にします |

## インタラクション
| 名前  | 説明 |
| ------------- | ------------- |
| `EventSystem` | シーン内のオブジェクトに対するポインターイベントとUIイベントの発生を処理します |
| `ObjectRaycater` | DragControlsとDuplicatableに必要 |
| `GraphicsRaycaster` | ObjectRaycasterと同じですが、UI要素用です |
| `DragControls` | シーン内でオブジェクトをドラッグできるようにします。親階層にレイキャスター（例: ObjectRaycaster）が必要です |
| `Duplicatable` | ドラッグで割り当てられたオブジェクトを複製できます。DragControlsが必要 |
| `Interactable` | オブジェクトをインタラクタブルとしてマークするための基本的なコンポーネント。 |
| `OrbitControls` | カメラに追加してカメラのオービット制御機能を追加します |
| `SmoothFollow` | 別のオブジェクトのTransformに滑らかに補間できます |
| `DeleteBox` | ボックスに入ったときに`Deletable`コンポーネントを持つオブジェクトを破棄します |
| `Deletable` | このコンポーネントがアタッチされたGameObjectは、`DeleteBox`に入るか交差したときに削除されます |
| `DropListener` | アップロードのためのファイルドロップイベントを受け取るために追加 |
| `SpatialTrigger` | 特定の空間や領域にオブジェクトが入った場合にイベントを発生させるために使用します。Physicsイベントも使用できます |
| `SpatialTriggerReceiver` | SpatialTriggerからのイベントを受け取るために使用します |

## 物理演算

物理演算は[Rapier](https://rapier.rs/)を使用して実装されています。

| 名前  | 説明 |
| ------------- | ------------- |
| `Rigidbody` | 重力に反応するようにオブジェクトに追加します（またはキネマティックおよびスタティックにする） |
| `BoxCollider` | オブジェクトが衝突したり、`trigger`に設定されている場合にトリガーイベントを発生させたりできるBoxコライダーの形状 |
| `SphereCollider` | *BoxColliderを参照* |
| `CapsuleCollider` | *BoxColliderを参照* |
| `MeshCollider` | *BoxColliderを参照* |
| Physics Materials | 物理マテリアルは、コライダーの弾みなどを定義するために使用できます |

## XR / WebXR

[XRドキュメントを読む](xr.md)

| 名前  | 説明 |
| ------------- | ------------- |
| `WebXR` | VR、AR、パススルーのサポート、およびアバターモデルのレンダリングのためにシーンに追加します |
| [`USDZExporter`](./everywhere-actions.md) | USDとQuicklookのサポートを有効にするために追加
| `XRFlag` | オブジェクトが表示されるタイミングを制御します。例: VRまたはARでのみ、またはThirdPersonでのみ |
| `WebARSessionRoot` | ARモードでのシーンの配置とスケールを処理します |
| `WebARCameraBackground` | ARカメラ画像にアクセスし、エフェクトを適用したり、レンダリングに使用したりするために追加します |
| `WebXRImageTracking` | 追跡する画像を割り当て、オプションで画像の位置にオブジェクトをインスタンス化します |
| `WebXRPlaneTracking` | 追跡された平面の平面メッシュまたはコライダーを作成します |
| `XRControllerModel` | デバイスコントローラーや手モデルをレンダリングするために追加できます（WebXRコンポーネントで有効にするとデフォルトで作成されます） |
| `XRControllerMovement` | デフォルトの移動およびテレポートコントロールを提供するために追加できます |
| `XRControllerFollow` | シーン内の任意のオブジェクトに追加でき、左または右の手またはコントローラーを追跡するように構成できます |

## デバッグ
| 名前  | 説明 |
| ------------- | ------------- |
| `GridHelper` | グリッドを描画します |
| `BoxGizmo` | ボックスを描画します |
| `AxesHelper` | XYZ軸を描画します |
| | 注意: カスタムコードを書く際には、Gizmosの静的メソッドを使用してデバッグラインや形状を描画できます | |

## ランタイムファイル入出力
| 名前  | 説明 |
| ------------- | ------------- |
| `GltfExport` | 実験的！Webランタイムからgltfをエクスポートするために使用します。 |
| `DropListener` | アップロードとネットワーキングのためのファイルドロップイベントを受け取ります |

## UI

空間UIコンポーネントは、Unity UI（Canvas、UI Toolkitではない）から[three-mesh-ui](https://github.com/felixmariotto/three-mesh-ui)にマッピングされます。
UIはアニメーション化できます。

| 名前  | 説明 |
| ------------- | ------------- |
| `Canvas` | UnityのUIシステム。現在はワールドスペースモードである必要があります。 |
| `Text (Legacy)` | UnityのUI Textコンポーネントを使用してTextをレンダリングします。カスタムフォントがサポートされており、エクスポート時にフォントアトラスが自動的に生成されます。フォント設定または`FontAdditionalCharacters`コンポーネントを使用して、アトラスに含まれる文字を制御します。<br/>**注意**: Unityでは`Legacy/Text`コンポーネントを使用していることを確認してください（*TextMeshPro*は現在サポートされていません） |
| `Button` | クリックイベントを受け取ります - onClickイベントを使用して反応します。3Dシーンオブジェクトにも追加できます。<br/>**注意**: Button内で`Legacy/Text`コンポーネントを使用していることを確認してください（または*TextMeshPro*は現在サポートされていないため、`UI/Legacy/Button` Unityコンテキストメニュー経由でButtonを作成してください） |
| `Image` | スプライト画像をレンダリングします |
| `RawImage` | テクスチャをレンダリングします |
| `InputField` | テキスト入力を許可します |

**注意**: プロジェクトによっては、VR、AR、画面がサポートされているクロスプラットフォームプロジェクトでは、空間UIと2D UIの混合が理にかなっていることがよくあります。通常、2D部分は最高のアクセシビリティのためにHTMLで構築し、3D部分は深度オフセットもサポートする幾何学的UI（ボタンのホバー状態など）で構築します。

## その他

| 名前  | 説明 |
| ------------- | ------------- |
| `SceneSwitcher` | 他のシーンまたはプレハブ/glTFファイルのロードとアンロードを処理します。プリロード、スワイプ、キーボードイベント、またはURLナビゲーションによるシーン変更の機能があります |

## エディターのみ
| 名前  | 説明 |
| --- | --- |
| `ExportInfo` | Webプロジェクトを管理するための主要なコンポーネント。例: Webアプリをインストールまたは開始する
| `EditorSync` | Unity Editorから直接、実行中のthree.jsアプリへのマテリアルまたはコンポーネントの値変更をネットワーク化するために追加します。リロードする必要はありません。 |

このページはAIによって自動的に翻訳されました。