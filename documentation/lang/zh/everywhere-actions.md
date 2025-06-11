---
title: Everywhere Actions
---

## 什么是 Everywhere Actions？

Needle 的 Everywhere Actions 是一组精心挑选的组件，可让您在 Unity 中创建交互式体验，而无需编写一行代码。它们旨在作为跨 Web、移动和 XR（**包括 iOS 上的增强现实**）体验的构建块。

从低级别的触发器和操作，可以构建更高级复杂的交互行为。

### 支持的平台
- 桌面
- 移动 (Android / iOS)
- VR 眼镜
- AR 设备
- iOS AR – QuickLook（是的，真的！）

## 如何使用 Everywhere Actions？

对于 iOS 支持，请将 `USDZExporter` 组件添加到您的场景中。最好将其添加到与 `WebXR` 组件相同的对象上（但不是强制性的）

要向场景中的任何对象添加操作
选中它，然后点击 `Add Component > Needle > Everywhere Actions > [Action]`。

![](/imgs/everywhere-actions-component-menu.gif)

## Everywhere Actions 列表

| Action | Description | Example Use Cases |
| --- | --- | --- |
| Play Animation on Click | 播放 Animator 中选定的动画状态。播放后，可以选择转换到另一个动画。 | 产品演示、互动教程、角色移动 |
| Change Material on Click | 将一种材质替换为其他材质。所有使用该材质的对象将一起切换。 | 产品配置器、角色 |
| Look At | 使对象看向摄像机。 | UI 元素、精灵、信息图、billboard 特效、可点击热点 |
| Play Audio on Click | 播放选定的音频片段。 | 音效、旁白、博物馆展览 |
| Hide on Start | 在场景启动时隐藏对象，以便稍后显示。 |
| Set Active on Click | 显示或隐藏对象。 |  |
| Change Transform on Click | 移动、旋转或缩放对象。允许绝对或相对移动。 | 角色、产品、UI 动画（对于更复杂的移动使用动画） |
| Audio Source | 在启动时播放音频并持续循环。空间或非空间 | 背景音乐、环境音 |
| WebXR Image Tracking | 跟踪图像目标并显示或隐藏对象。 | AR 体验、产品演示 |

## 示例

### 乐器

演示空间音频、动画和交互。

<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### 简单角色控制器

演示组合动画、看向和移动。

<sample src="https://engine.needle.tools/samples-uploads/usdz-characters" />

### 图像跟踪

演示如何将 3D 内容附加到自定义图像标记上。在 AR 中启动下面的场景，并将手机摄像头对准屏幕上的图像标记，或将其打印出来。

<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Image Marker" width=300 />

<a href="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" target="_blank">下载示例图像标记</a>

**在 Android 上：**请在 Chrome Flags 中打开“WebXR Incubations”。您可以通过在 Android 手机的 Chrome 浏览器地址栏中粘贴 [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) 来找到它们。

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />

### 交互式构建块概述

<sample src="https://engine.needle.tools/samples-uploads/usdz-interactivity" />

## 创建您自己的 Everywhere Actions

创建新的 Everywhere Actions 涉及到用 TypeScript 编写您的动作代码，这些代码将在浏览器和 WebXR 中使用，并使用我们的 TriggerBuilder 和 ActionBuilder API 为通过 QuickLook 在 iOS 上实现的增强现实创建匹配的设置。创建自定义动作时，请记住 QuickLook 可用的功能集是有限的。您仍然可以在浏览器和 WebXR 中使用您想要的任何代码，但 QuickLook 的行为可能需要从可用触发器和操作中构建一个近似值。

:::tip
通常，构建特定行为需要跳出思维定势，创造性地应用可用的低级动作。一个例子是“点击放置”动作——QuickLook 中没有光线投射或碰撞检测可用，但您可以用许多不可见的对象覆盖预期的放置区域，并使用“点击”触发器将要放置的对象移动到被点击的不可见对象的位置。
:::

QuickLook 的触发器和操作基于 [Apple 的 Preliminary Interactive USD Schemas](https://developer.apple.com/documentation/arkit/usdz_schemas_for_ar/actions_and_triggers)

### 代码示例

以下是 `HideOnStart` 的实现示例，展示了如何创建同时支持浏览器和 QuickLook 的 Everywhere Action：
@[code ts twoslash](@code/component-everywhere-action-hideonstart.ts)

::: tip
通常，获得正确的行为将涉及从可用的_低级动作_组合_更高级别的动作_。例如，我们的“点击更改材质”动作由多个 `fadeActions` 组成，并在内部复制具有不同材质集的对象。通过精心构建这些动作，可以实现复杂行为。
:::

### 构建您自己动作的低级方法

| Triggers | |
| --- | --- |
| `TriggerBuilder.sceneStartTrigger` | |
| `TriggerBuilder.tapTrigger` | |

| Actions | |
| --- | --- |
| `ActionBuilder.fadeAction` | |
| `ActionBuilder.startAnimationAction` | |
| `ActionBuilder.waitAction` | |
| `ActionBuilder.lookAtCameraAction` | |
| `ActionBuilder.emphasize` | |
| `ActionBuilder.transformAction` | |
| `ActionBuilder.playAudioAction` | |

|  Group Actions | |
| --- | --- |
| `ActionBuilder.sequence` | |
| `ActionBuilder.parallel` | |
| `GroupAction.addAction` | |
| `GroupAction.makeParallel` | |
| `GroupAction.makeSequence` | |
| `GroupAction.makeLooping` | |
| `GroupAction.makeRepeat` | |

要查看我们内置的 Everywhere Actions 的实现，请查看 `src/engine-components/export/usdz/extensions/behavior/BehaviourComponents.ts`。

## 延伸阅读

以下页面提供更多您可以立即测试和探索的示例：

- 访问我们的 [AR Showcase Website](https://engine.needle.tools/projects/ar-showcase/)，其中有许多交互式 AR 示例，重点关注 iOS AR 和 Quicklook
- [Needle Engine Everywhere Action Samples](https://engine.needle.tools/samples/?overlay=samples&tag=everywhere+actions)


页面由 AI 自动翻译