---
title: VR & AR (WebXR)
---

## 支持的设备

Needle Engine 支持完整的 [WebXR 规范](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)，包括 AR 和 VR。WebXR 是一个官方网络标准，它将沉浸式体验带到网络上，并具备网络的全部优势：无需安装、无需应用商店、无需 SDK。

所有带有浏览器的设备都可以运行使用 Needle 构建的应用。如果浏览器支持 WebXR，您的应用也将自动使用我们内置的组件在 XR 中工作。这包括桌面浏览器、移动浏览器、许多 AR/VR 头显上的浏览器，以及其他新兴技术，如 Looking Glass 显示器、智能眼镜等。

:::tip 通过 USDZ/QuickLook 在 iOS 上提供无需 App 的 AR 支持
虽然 iOS 设备目前尚未官方支持 WebXR，但 Needle 支持使用 [Everywhere Actions](everywhere-actions.md) 在 iOS 上创建 AR 体验。请参阅 [iOS 部分](#augmented-reality-and-webxr-on-ios)了解更多详情。您可以创建丰富、交互式的体验，即使在 Apple 设定的限制下，这些体验也能在 iOS 设备上无缝地在 AR 中工作。

当您在 iOS 上进入 AR 模式时，Needle 会自动将您的场景转换为 USDZ 文件，然后使用 Apple 的 QuickLook 在 AR 中显示。对象、材质、音频、动画和 Everywhere Actions 将被保留。
:::

下表列出了一些我们验证过与 Needle Engine 兼容的设备。
当支持 WebXR 的新设备问世时，它们将开箱即用地与您的应用兼容。这是使用浏览器作为平台进行构建的一大优势——兼容性不受特定设备集或 SDK 的限制。

| 头显设备        | 浏览器       | 备注                                                                                             |
| :-------------- | :----------- | :----------------------------------------------------------------------------------------------- |
| Apple Vision Pro | ✔️ Safari    | 手部追踪，支持瞬时指针                                                                               |
| Meta Quest 3    | ✔️ Meta Browser | 手部追踪，支持 sessiongranted<sup>1</sup>，透视，深度感知，网格追踪                                        |
| Meta Quest 3S   | ✔️ Meta Browser | 手部追踪，支持 sessiongranted<sup>1</sup>，透视，深度感知，网格追踪                                        |
| Meta Quest 2    | ✔️ Meta Browser | 手部追踪，支持 sessiongranted<sup>1</sup>，透视（黑白）                                                |
| Meta Quest 1    | ✔️ Meta Browser | 手部追踪，支持 sessiongranted<sup>1</sup>                                                          |
| Meta Quest Pro  | ✔️ Meta Browser | 手部追踪，支持 sessiongranted<sup>1</sup>，透视                                                    |
| Pico Neo 4      | ✔️ Pico Browser | 透视，手部追踪<sup>2</sup>                                                                         |
| Pico Neo 3      | ✔️ Pico Browser | 无手部追踪，控制器摇杆方向反转                                                                       |
| Oculus Rift 1/2 | ✔️ Chrome    |                                                                                                  |
| Valve Index     | ✔️ Chrome    |                                                                                                  |
| HTC Vive        | ✔️ Chrome    |                                                                                                  |
| Hololens 2      | ✔️ Edge      | 手部追踪，支持 AR 和 VR（在 VR 模式下，背景也会被渲染）                                                     |

| 移动设备    | 浏览器                      | 备注                                                                                             |
| :---------- | :-------------------------- | :----------------------------------------------------------------------------------------------- |
| Android 10+ | ✔️ Chrome                   |                                                                                                  |
| Android 10+ | ✔️ Firefox                  |                                                                                                  |
| iOS 15+     | (✔️)<sup>3</sup> Safari<br/>(✔️)<sup>3</sup> Chrome | 不完全支持代码，但 Needle [Everywhere Actions](everywhere-actions.md) 支持创建动态、交互式的 USDZ 文件。 |
| iOS 15+     | ✔️ WebXR Viewer             | 浏览器目前有点过时                                                                               |
| Hololens 2  | ✔️ Edge                     |                                                                                                  |
| Hololens 1  | ❌                          | 不支持 WebXR                                                                                     |
| Magic Leap 2 | ✔️                         |                                                                                                  |
| Magic Leap 1 | ✔️                         | 已弃用的设备                                                                                     |

| 其他设备                         | 浏览器    | 备注                                                                                     |
| :------------------------------- | :-------- | :--------------------------------------------------------------------------------------- |
| Looking Glass 全息显示器          | ✔️ Chrome | 需要 Looking Glass 桥接器和一些自定义代码，[请参阅我们的示例](https://engine.needle.tools/samples/looking-glass/) |
| Logitech MX Ink                  | ✔️ Meta Browser | 官方支持，请参阅[文档](https://logitech.github.io/mxink/WebXR/WebXrIntegration.html#using-needle-tools)  |

<sup>1</sup>: 需要启用浏览器标志：`chrome://flags/#webxr-navigation-permission`
<sup>2</sup>: 需要在开发者设置中启用一个开关
<sup>3</sup>: 使用 [Everywhere Actions](everywhere-actions.md) 或[其他方法](#augmented-reality-and-webxr-on-ios)

## VR、AR 和 QuickLook 示例

访问我们的 [Needle Engine Samples](https://engine.needle.tools/samples/?overlay=samples&tag=xr) 立即尝试许多交互式示例。或者，点击下方的 <kbd>QR Code</kbd>（用于手机）或 <kbd>Open on Quest</kbd>（用于 Meta Quest 头显）按钮，在您的设备上实时尝试。

<sample src="https://engine.needle.tools/samples/collaborative-sandbox/"/>

## 为场景添加 VR 和 AR 功能

Needle Engine 中的 AR、VR 和网络功能被设计为模块化的。您可以选择不支持其中任何一个，或者只添加特定功能。

### 基本功能

1.  **启用 AR 和 VR**
    添加一个 `WebXR` 组件。
    *可选：* 您可以通过引用一个 [Avatar Prefab](#avatars) 来设置自定义头像。
    默认情况下，分配了一个基础的 `DefaultAvatar`。

2.  **启用瞬移**
    为可瞬移到的对象层级添加一个 `TeleportTarget` 组件。
    要排除特定对象，将其图层设置为 `IgnoreRaycasting`。

### 多人模式

1.  **启用网络**
    添加一个 `SyncedRoom` 组件。

2.  **启用桌面视图同步**
    添加一个 `SyncedCamera` 组件。

3.  **启用语音聊天**
    添加一个 `VoIP` 组件。

:::tip 场景结构
这些组件可以位于层级中的任何位置。它们也可以全部位于同一个 GameObject 上，这是一个常见模式。
:::

> **[Castle Builder](https://castle.needle.tools/)** 使用上述所有功能提供跨平台多人沙盒体验。
> — #madebyneedle 💚

### 特殊 AR 组件

1.  **定义 AR Session 根对象和缩放比例**
    为您的根对象添加一个 `WebARSessionRoot` 组件。对于 AR 体验，通常您希望缩放场景以适应现实世界。
2.  定义**用户比例**，以便在进入 AR 时，相对于场景缩小 (< 1) 或放大 (> 1) 用户。

### 控制 XR 中对象的显示

1.  **定义对象在浏览器、AR、VR、第一人称、第三人称视图中是否可见**
    为您要控制的对象添加一个 `XR Flag` 组件。

2.  **根据需要更改下拉菜单中的选项**。
    常见用例包括
    - 进入 AR 时隐藏地面
    - 在第一人称或第三人称视图中隐藏 Avatar 部件。例如，在第一人称视图中，用户不应该能够看到自己的头部模型。

### 在 VR 世界之间穿梭

Needle Engine 支持 [`sessiongranted`](https://github.com/immersive-web/navigation) 状态。这允许用户在不离开沉浸式会话的情况下，在 WebXR 应用之间无缝穿梭——他们保持在 VR 或 AR 中。

目前，这仅在 Oculus Quest 1、2 和 3 的 Oculus Browser 中支持。在其他平台上，用户将被踢出当前的沉浸式会话，并在新页面上需要再次进入 VR。
需要启用浏览器标志：`chrome://flags/#webxr-navigation-permission`

-   **点击对象打开链接**
    添加 `OpenURL` 组件，这使得构建连接世界变得非常容易。

## 脚本编写
阅读更多关于 XR 脚本编写的信息，请参阅 [XR 脚本编写文档](./scripting.md#xr-event-methods)。

## 头像

虽然我们目前不提供外部头像系统的开箱即用集成，但您可以创建特定于应用程序的头像或自定义系统。

-   **创建自定义头像**
    -   创建一个空的 GameObject 作为头像根对象。
    -   添加一个名为 `Head` 的对象，并添加一个设置为 Third Person 的 `XRFlag`。
    -   添加名为 `HandLeft` 和 `HandRight` 的对象。
    -   在这些对象下方添加您的图形。

### 实验性头像组件

有一些实验性组件可以构建更具表现力的头像。目前，我们建议复制它们以创建自己的变体，因为它们可能会在后续版本中更改或移除。

![20220817-230858-87dG-Unity_PLjQ](https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif)
*带有基本颈部模型和肢体约束的示例头像 Rig*

-   **随机玩家颜色**
    作为一个头像自定义的示例，您可以为渲染器添加一个 `PlayerColor` 组件。
    这种随机颜色在玩家之间同步。

-   **眼睛旋转**
    `AvatarEyeLook_Rotation` 旋转 GameObjects（眼睛）以跟随其他头像和随机目标。此组件在玩家之间同步。

-   **眼睛眨眼**
    `AvatarBlink_Simple` 每隔几秒随机隐藏 GameObjects（眼睛），模拟眨眼动作。

![image](https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png)
*示例 Avatar Prefab 层级结构*

-   **偏移约束**
    `OffsetConstraint` 允许对象在 Avatar 空间中相对于另一个对象进行偏移。例如，这允许 Body 跟随 Head 但保持旋转水平。它也允许构建简单的颈部模型。

-   **肢体约束**
    `BasicIKConstraint` 是一个非常极简的约束，它接收两个 transform 和一个提示。这对于构建简单的手臂或腿部链很有用。由于旋转目前未正确实现，手臂和腿部可能需要旋转对称才能“看起来正常”。它之所以被称为“Basic”是有原因的！

## AR 中的 HTML 内容叠加

如果您想根据客户端使用的是普通浏览器还是 AR 或 VR 来显示不同的 HTML 内容，您只需使用一组 HTML 类。
这是通过 HTML 元素类控制的。例如，要使内容在桌面和 AR 中显示，请在 `<needle-engine>` 标签内添加一个 ``<div class="desktop ar"> ... </div>``：

```html
<needle-engine>
    <div class="desktop ar" style="pointer-events:none;">
        <div class="positioning-container">
          <p>your content for AR and desktop goes here</p>
          <p class="only-in-ar">This will only be visible in AR</p>
        <div>
    </div>
</needle-engine>
```

内容叠加是使用可选的 `dom-overlay` 功能实现的，该功能通常在基于屏幕的 AR 设备（手机、平板电脑）上支持。

使用 `.ar-session-active` 类在 AR 中时显示/隐藏特定内容。[`:xr-overlay` 伪类](https://www.w3.org/TR/webxr-dom-overlays-1/#css-pseudo-class)目前不应使用，因为使用它会破坏 Mozilla 的 WebXR Viewer。

```css
.only-in-ar {
  display: none;
}

.ar-session-active .only-in-ar {
  display:initial;
}
```

值得注意的是，叠加元素在 XR 中时[将始终全屏显示](https://www.w3.org/TR/webxr-dom-overlays-1/#ua-style-sheet-defaults)，与应用的样式无关。如果您想以不同的方式对齐项目，您应该在 `class="ar"` 元素**内部**创建一个容器。

<sample src="https://engine.needle.tools/samples-uploads/ar-overlay/"/>

## iOS 上的增强现实和 WebXR

由于 Apple 目前不支持在 iOS 设备上使用 WebXR，因此 iOS 上的增强现实体验受到一定限制。

Needle Engine 的 [Everywhere Actions](everywhere-actions.md) 旨在弥补这一空白，为由特定组件组成的场景带来自动交互能力到 iOS 设备。它们支持 WebXR 中的一部分功能，例如空间音频、图像追踪、动画等。请参阅[文档](everywhere-actions.md)了解更多信息。

:::tip QuickLook 中对自定义代码的支持有限
Apple 对可以在 QuickLook 中使用的内容类型设置了严格的限制。因此，自定义脚本组件无法自动转换为在 iOS AR 中使用。您可以使用我们的 Everywhere Actions API 添加对某些类型自定义代码的支持。
:::

### 乐器 – WebXR 和 QuickLook 支持

这是一个乐器的例子，它使用 Everywhere Actions，因此可以在浏览器和 iOS 设备上的 AR 中工作。
它使用空间音频、动画和点按交互。
<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Everywhere Actions 和 iOS AR 的其他选项

还有其他选项可以指导 iOS 用户获得更强大的交互式 AR 体验：

3.  **动态导出内容为 USDZ 文件。**
    这些文件可以在 iOS 设备上以 AR 形式显示。当从包含 Everywhere Actions 的场景导出时，交互性是相同的，对于产品配置器、叙事体验等场景来说绰绰有余。
    一个例子是 [Castle Builder](https://castle.needle.tools)，其中的作品（非实时会话）可以在 AR 中查看。

> **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** 使用了这种方法。玩家可以在他们的屏幕上协作将文本放置到场景中，然后在 iOS 上以 AR 形式查看结果。在 Android 上，他们也可以直接在 WebXR 中进行交互。
> — 由 Katja Rempel #madewithneedle 💚

1.  **指导 iOS 用户使用 WebXR 兼容的浏览器。**
    根据您的目标受众，您可以指导 iOS 用户例如使用 Mozilla 的 [WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056) 在 iOS 上体验 AR。

2.  **在 iOS 设备上使用摄像头访问和自定义算法。**
    可以请求摄像头图像访问并运行自定义算法来确定设备姿态。
    虽然我们目前不提供内置组件，但这里有一些我们将来想尝试的库和框架参考：
    -   [AR.js](https://github.com/AR-js-org/AR.js) (开源)
        -   由 FireDragonGameStudio 开发的 [Experimental AR.js integration](https://github.com/FireDragonGameStudio/NeedleAndARjs)
    -   [Mind AR](https://github.com/hiukim/mind-ar-js) (开源)
    -   [8th Wall](https://www.8thwall.com/) (商业)

## 图像追踪

Needle Engine 在 Android 上支持 **WebXR 图像追踪** ([在线演示](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr))，在 iOS 上支持 **QuickLook 图像追踪**。

您可以在 [Everywhere Actions](everywhere-actions.md#image-tracking) 部分找到额外文档。

:::warning WebXR 图像追踪仍处于“草案”阶段，尚未普遍可用
到目前为止，浏览器供应商尚未就 WebXR 的最终图像追踪 API 达成一致。只要规范处于“草案”阶段 ([Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md))，
您和您应用的用户需要遵循以下步骤才能在 Android 设备上启用 WebXR 图像追踪：
1.  在您的 Android Chrome 浏览器中访问 ``chrome://flags``
2.  找到并启用 `WebXR Incubations` 选项
:::

如果没有该规范，仍然可以请求摄像头图像访问并运行自定义算法来确定设备姿态。不足之处在于用户必须接受额外的权限，例如摄像头访问，并且追踪精度不如设备原生能力。

以下是一些基于摄像头访问和本地计算机视觉算法添加图像追踪的库：
-   由 FireDragonGameStudio 开发的 [AR.js 与 Needle Engine 的实验性集成](https://github.com/FireDragonGameStudio/NeedleAndARjs)
-   [AR.js](https://github.com/AR-js-org/AR.js) (开源)
-   [Mind AR](https://github.com/hiukim/mind-ar-js) (开源)

## 参考资料

[WebXR Device API](https://www.w3.org/TR/webxr/)
[caniuse: WebXR](https://caniuse.com/webxr)
[Apple 的初步 USD 行为规范](https://developer.apple.com/augmented-reality/quick-look/)

---
页面由 AI 自动翻译