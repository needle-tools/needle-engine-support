---
title: Needle 核心组件
---

# Needle 核心组件

以下是我们提供的一些组件概述。其中许多组件映射到 Unity、Blender 或其他集成中的组件和功能。

如需完整列表，请参阅我们的 [API 文档](https://engine.needle.tools/docs/api/latest)。

您随时可以添加自己的组件，或者为我们尚未提供的 Unity 组件添加包装器。

在我们的文档的 [Scripting](./scripting.md) 部分了解更多信息。

## Audio
| Name  | Description |
| ------------- | ------------- |
| `AudioListener` |  |
| `AudioSource` | 用于播放音频 |

## Animation
| Name  | Description |
| ------------- | ------------- |
| `Animator` with `AnimatorController` | 导出动画状态机、条件、过渡 |
| `Animation` | 最基本的动画组件。仅导出第一个剪辑 |
| `PlayableDirector` with `TimelineAsset` | 导出强大的序列以控制动画、音频、状态等 |

## Rendering
| Name  | Description |
| ------------- | ------------- |
| `Camera` |  |
| `Light` | DirectionalLight, PointLight, Spotlight。请注意，您也可以使用它来烘焙光照（例如 Rectangular Light 形状） |
| `XRFlag` | 控制对象何时可见。例如，仅在 AR 中启用对象 |
| `DeviceFlag` | 控制对象在哪种设备上可见 |
| `LODGroup` |  |
| `ParticleSystem` | 实验性功能，目前未完全支持 |
| `VideoPlayer` | 播放来自 URL 或引用的视频文件（导出时将复制到输出）的视频。VideoPlayer 还支持从 MediaStream 对象或 `M3U8` 直播 URL 进行流式传输 |
| `MeshRenderer` | 用于处理对象的渲染，包括光照贴图和实例化 |
| `SkinnedMeshRenderer` | *参见 MeshRenderer* |
| `SpriteRenderer` | 用于渲染 Sprites 和 Spriteanimations |
| `Volume` with `PostProcessing` asset | 参见[下表](#postprocessing) |

### Postprocessing

后处理效果在底层使用了 [pmndrs postprocessing library](https://www.npmjs.com/package/postprocessing)。这意味着您也可以轻松添加自己的自定义效果，并获得自动优化的后处理通道。

- **仅 Unity**: *请注意，在 Unity 中使用 Volume 的后处理效果仅支持 URP*

| Effect Name | |
| --- | --- |
| Antialiasing | *额外 Unity 组件* |
| Bloom | *通过 Volume asset* |
| Chromatic Aberration | *通过 Volume asset* |
| Color Adjustments / Color Correction | *通过 Volume asset* |
| Depth Of Field | *通过 Volume asset* |
| Vignette | *通过 Volume asset* |
| ToneMappingEffect | *通过 Volume asset 或单独组件* |
| Pixelation | |
| Screenspace Ambient Occlusion N8 | |
| Screenspace Ambient Occlusion | |
| Tilt Shift Effect | |
| SharpeningEffect | |
| *Your custom effect* | [参见 stackblitz 示例](https://stackblitz.com/edit/needle-engine-custom-postprocessing-effect) |

## Networking
| Name  | Description |
| ------------- | ------------- |
| `SyncedRoom` | 主要网络组件。添加到场景中即可启用网络功能 |
| `Networking` | 用于设置网络的后端服务器 |
| `SyncedTransform` | 自动同步对象的变换 |
| `SyncedCamera` | 自动向房间中的其他用户同步摄像头位置和视图。您可以通过引用一个对象来定义摄像头的渲染方式 |
| `WebXRSync` | 同步 WebXR Avatar（AR 和 VR） |
| `Voip` | 启用语音聊天 |
| `Screensharing` | 启用屏幕共享功能 |

## Interaction
| Name  | Description |
| ------------- | ------------- |
| `EventSystem` | 处理在场景对象上触发指针事件和 UI 事件 |
| `ObjectRaycater` | DragControls 和 Duplicatable 所需 |
| `GraphicsRaycaster` | 与 ObjectRaycaster 相同，但用于 UI 元素 |
| `DragControls` | 允许在场景中拖动对象。需要在父级层级中存在 raycaster，例如 ObjectRaycaster |
| `Duplicatable` | 可以通过拖动复制指定的对象。需要 DragControls |
| `Interactable` | 将对象标记为可交互的基本组件 |
| `OrbitControls` | 添加到摄像头以添加摄像头轨道控制功能 |
| `SmoothFollow` | 允许平滑地插值到另一个对象的变换 |
| `DeleteBox` | 进入此框的对象（带有 `Deletable` 组件）将被销毁 |
| `Deletable` | 附加此组件的 GameObject 在进入或与 `DeleteBox` 相交时将被删除 |
| `DropListener` | 添加以接收文件拖放事件进行上传 |
| `SpatialTrigger` | 用于在对象进入特定空间或区域时触发事件。您也可以使用 Physics 事件 |
| `SpatialTriggerReceiver` | 用于接收 SpatialTrigger 发送的事件 |

## Physics

物理引擎使用 [Rapier](https://rapier.rs/) 实现。

| Name  | Description |
| ------------- | ------------- |
| `Rigidbody` | 添加以使对象响应重力（或设置为 kinematic 和 static） |
| `BoxCollider` | 一个 Box 碰撞体形状，对象可以与之碰撞，或者在设置为 `trigger` 时触发事件 |
| `SphereCollider` | *参见 BoxCollider* |
| `CapsuleCollider` | *参见 BoxCollider* |
| `MeshCollider` | *参见 BoxCollider* |
| Physics Materials | Physics materials 可用于定义碰撞体的弹性等属性 |

## XR / WebXR

[阅读 XR 文档](xr.md)

| Name  | Description |
| ------------- | ------------- |
| `WebXR` | 添加到场景中以支持 VR、AR 和 Passthrough，以及渲染 Avatar 模型 |
| [`USDZExporter`](./everywhere-actions.md) | 添加以启用 USD 和 Quicklook 支持 |
| `XRFlag` | 控制对象何时可见，例如，仅在 VR 或 AR 中，或仅在第三人称视图中 |
| `WebARSessionRoot` | 处理场景在 AR 模式下的放置和缩放 |
| `WebARCameraBackground` | 添加以访问 AR 摄像头图像并应用效果或用于渲染 |
| `WebXRImageTracking` | 分配要跟踪的图像，并可选择在图像位置实例化对象 |
| `WebXRPlaneTracking` | 为跟踪到的平面创建平面网格或碰撞体 |
| `XRControllerModel` | 可以添加到渲染设备控制器或手部模型（在 WebXR 组件中启用时会默认创建） |
| `XRControllerMovement` | 可以添加以提供默认的移动和传送控制 |
| `XRControllerFollow` | 可以添加到场景中的任何对象，并配置为跟随左手或右手或控制器 |


## Debugging
| Name  | Description |
| ------------- | ------------- |
| `GridHelper` | 绘制网格 |
| `BoxGizmo` | 绘制盒子 |
| `AxesHelper` | 绘制 XYZ 轴 |
| | 注意：当您编写自定义代码时，可以使用静态 `Gizmos` 方法绘制调试线条和形状 | |

## Runtime File Input/Output
| Name  | Description |
| ------------- | ------------- |
| `GltfExport` | 实验性功能！用于从 Web 运行时导出 gltf。 |
| `DropListener` | 接收文件拖放事件用于上传和网络 |

## UI

空间 UI 组件从 Unity UI（Canvas，非 UI Toolkit）映射到 [three-mesh-ui](https://github.com/felixmariotto/three-mesh-ui)。
UI 可以动画化。

| Name  | Description |
| ------------- | ------------- |
| `Canvas` | Unity 的 UI 系统。目前需要处于 World Space 模式。 |
| `Text (Legacy)` | 使用 Unity 的 UI Text 组件渲染文本。支持自定义字体，导出时会自动生成字体图集。使用字体设置或 `FontAdditionalCharacters` 组件控制图集中包含哪些字符。<br/>**注意**：在 Unity 中请确保使用 `Legacy/Text` 组件（目前不支持 *TextMeshPro*） |
| `Button` | 接收点击事件 - 使用 onClick 事件进行响应。也可以添加到 3D 场景对象。<br/>**注意**：请确保在 Button 中使用 `Legacy/Text` 组件（或通过 `UI/Legacy/Button` Unity 上下文菜单创建 Button，因为目前不支持 *TextMeshPro*） |
| `Image` | 渲染精灵图像 |
| `RawImage` | 渲染纹理 |
| `InputField` | 允许文本输入 |

**注意**：根据您的项目，对于支持 VR、AR 和屏幕的跨平台项目，通常空间 UI 和 2D UI 的混合使用是有意义的。通常，您会使用 HTML 构建 2D 部分以获得最佳可访问性，并使用支持深度偏移（例如按钮悬停状态等）的几何 UI 构建 3D 部分。

## Other

| Name  | Description |
| ------------- | ------------- |
| `SceneSwitcher` | 处理其他场景或预制件/glTF 文件的加载和卸载。具有预加载、通过滑动、键盘事件或 URL 导航切换场景的功能 |


## Editor Only
| Name  | Description |
| --- | --- |
| `ExportInfo` | 用于管理 Web 项目（例如安装或启动 Web 应用）的主要组件 |
| `EditorSync` | 添加此组件可直接从 Unity Editor 同步材质或组件值更改到正在运行的 three.js 应用，无需重新加载 |


---
页面由 AI 自动翻译