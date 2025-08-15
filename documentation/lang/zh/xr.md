---
title: VR 和 AR (WebXR)
---

## 支持的设备

Needle Engine 支持完整的 [WebXR specification](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)，包括 AR 和 VR。WebXR 是一个官方 Web 标准，它将沉浸式体验带到 Web 上，并具备 Web 的所有优势：无需安装，无需应用商店，无需 SDK。

所有带有浏览器的设备都可以运行使用 Needle 构建的应用。如果浏览器支持 WebXR，您的应用也将自动使用我们内置的 components 在 XR 中工作。这包括桌面浏览器、移动浏览器、许多 AR/VR 头戴设备上的浏览器，以及其他新兴技术，如 Looking Glass 显示器、智能眼镜等。

:::tip 通过 USDZ/QuickLook 在 iOS 上提供无需 App 的 AR 支持
虽然 iOS 设备目前尚未官方支持 WebXR，但 Needle 支持使用 [Everywhere Actions](everywhere-actions.md) 在 iOS 上创建 AR 体验。请参阅 [iOS 部分](#augmented-reality-and-webxr-on-ios)了解更多详情。您可以创建丰富、interactive 的体验，即使在 Apple 设定的限制下，这些体验也能在 iOS 设备上 seamless 地在 AR 中工作。

当您在 iOS 上进入 AR mode 时，Needle 会自动将您的 scene 转换为一个 USDZ file，然后使用 Apple 的 QuickLook 在 AR 中显示。Objects, materials, audio, animation 和 Everywhere Actions 将被 preserved。
:::

下表列出了一些我们验证过与 Needle Engine 兼容的设备。
当支持 WebXR 的新设备问世时，它将 out of the box 与您的应用兼容。这是 building with the browser as a platform 的一大优势——compatibility 不受特定设备集或 SDKs 的限制。

| Headset Device | Browser | Notes |
| -- | -- | -- |
| Apple Vision Pro | ✔️ Safari | 手部追踪，支持瞬态指针 |
| Meta Quest 3 | ✔️ Meta Browser | 手部追踪，支持 sessiongranted<sup>1</sup>，直通，深度感知，网格追踪 |
| Meta Quest 3S | ✔️ Meta Browser | 手部追踪，支持 sessiongranted<sup>1</sup>，直通，深度感知，网格追踪 |
| Meta Quest 2 | ✔️ Meta Browser | 手部追踪，支持 sessiongranted<sup>1</sup>，直通（黑白） |
| Meta Quest 1 | ✔️ Meta Browser | 手部追踪，支持 sessiongranted<sup>1</sup> |
| Meta Quest Pro | ✔️ Meta Browser | 手部追踪，支持 sessiongranted<sup>1</sup>，直通 |
| Pico Neo 4 | ✔️ Pico Browser | 直通，手部追踪<sup>2</sup> |
| Pico Neo 3 | ✔️ Pico Browser | 无手部追踪，反向控制器摇杆 |
| Oculus Rift 1/2 | ✔️ Chrome |  |
| Valve Index | ✔️ Chrome |  |
| HTC Vive | ✔️ Chrome |  |
| Hololens 2 | ✔️ Edge | 手部追踪，支持 AR 和 VR（在 VR 模式下，也会渲染背景） |

| Mobile Device | Browser | Notes |
| -- | -- | -- |
| Android 10+ | ✔️ Chrome | |
| Android 10+ | ✔️ Firefox | |
| iOS 15+ | (✔️)<sup>3</sup> Safari<br/>(✔️)<sup>3</sup> Chrome | 无完整代码支持，但 Needle [Everywhere Actions](everywhere-actions.md) 支持创建动态、interactive 的 USDZ 文件。 |
| iOS 15+ | ✔️ WebXR Viewer | 浏览器目前有些过时 |
| Hololens 2 | ✔️ Edge | |
| Hololens 1 | ❌ | 不支持 WebXR |
| Magic Leap 2 | ✔️ | |
| Magic Leap 1 | ✔️ | 已弃用设备 |

| Other Devices | Browser | Notes |
| -- | -- | -- |
| Looking Glass Holographic Display | ✔️ Chrome | 需要 Looking Glass bridge 和一些自定义代码，[请参阅我们的示例](https://engine.needle.tools/samples/looking-glass/) |
| Logitech MX Ink | ✔️ Meta Browser | 官方支持，请参阅 [文档](https://logitech.github.io/mxink/WebXR/WebXrIntegration.html#using-needle-tools) |

<sup>1</sup>: 需要启用一个浏览器标志：`chrome://flags/#webxr-navigation-permission`   
<sup>2</sup>: 需要在开发者设置中启用一个开关    
<sup>3</sup>: 使用 [Everywhere Actions](everywhere-actions.md) 或 [其他方法](#augmented-reality-and-webxr-on-ios)

## VR、AR 和 QuickLook 示例

访问我们的 [Needle Engine Samples](https://engine.needle.tools/samples/?overlay=samples&tag=xr) 立即尝试许多 interactive 示例。或者，点击下方的 <kbd>QR Code</kbd>（用于手机）或 <kbd>Open on Quest</kbd>（用于 Meta Quest 头戴设备）按钮，在您的设备上实时尝试。

<sample src="https://engine.needle.tools/samples/collaborative-sandbox/"/>

## 为场景添加 VR 和 AR 功能

Needle Engine 中的 AR、VR 和 networking capabilities 被设计为模块化的。您可以选择不支持其中任何一个，或者只添加 specific features。

### 基本功能

1.  **启用 AR 和 VR**  
    添加一个 `WebXR` component。  
    *可选:* 您可以通过 referencing 一个 [Avatar Prefab](#avatars) 来设置 custom avatar。   
    By default, 分配了一个 basic `DefaultAvatar`。
    
2.  **启用 Teleportation**  
    为 object hierarchies 中可以 teleport 的对象添加一个 `TeleportTarget` component。  
    To exclude specific objects, 设置它们的 layer 为 `IgnoreRaycasting`。  

### 多人模式

1.  **启用 Networking**  
    添加一个 `SyncedRoom` component。

2.  **启用 Desktop Viewer Sync**  
    添加一个 `SyncedCamera` component。
    
3.  **启用 Voice Chat**  
    添加一个 `VoIP` component。

:::tip 场景结构
These components can be anywhere inside your hierarchy。它们也可以 all be on the same GameObject，which is a common pattern。
:::

 > **[Castle Builder](https://castle.needle.tools/)** 使用上述 all of the above for a cross-platform multiplayer sandbox experience。   
 > — #madebyneedle 💚  
   
### 特殊 AR 组件

1.  **定义 AR 会话根和比例**  
    为您的 root object 添加一个 `WebARSessionRoot` component。For AR experiences, often you want to scale the scene to fit the real world。  
2.  定义 **用户比例** 以在进入 AR 时相对于场景缩小（< 1）或放大（> 1）用户。

### 控制 XR 中对象的显示

1.  **定义对象在浏览器、AR、VR、第一人称、第三人称中是否可见**  
    为您要控制的对象添加一个 `XR Flag` component。

2.  **根据需要更改下拉菜单中的选项**。   
    常见的用例包括
    - 在进入 AR 时隐藏地面
    - 在第一人称或第三人称视图中隐藏 Avatar 部件。例如，在第一人称视图中，用户不应该看到自己的头部模型。

### 在 VR 世界之间穿梭

Needle Engine 支持 [`sessiongranted`](https://github.com/immersive-web/navigation) 状态。这允许 users to seamlessly traverse between WebXR applications without leaving an immersive session – they stay in VR 或 AR。  

目前，这仅在 Oculus Browser 中对 Oculus Quest 1、2 和 3 提供支持。在其他平台上，用户将被踢出其当前的沉浸式会话，并且必须在新页面上重新进入 VR。  
需要启用一个浏览器标志：`chrome://flags/#webxr-navigation-permission`  

-   **点击对象打开链接**  
    添加 `OpenURL` component，使得构建 connected worlds 变得非常容易。  

## 脚本  
在 [脚本 XR 文档](./scripting.md#xr-event-methods) 中阅读更多关于 XR 脚本的内容

## 虚拟形象

虽然我们目前不提供 out-of-the-box 的外部虚拟形象系统集成，但您可以创建特定于应用的虚拟形象或自定义系统。  

-   **创建自定义虚拟形象**  
    -   创建一个空的 GameObject 作为虚拟形象根
    -   添加一个名为 `Head` 的对象，并添加一个设置为 Third Person 的 `XRFlag`
    -   添加名为 `HandLeft` 和 `HandRight` 的对象
    -   在这些对象下方添加您的图形。

### 实验性虚拟形象组件

有一些 experimental components 用于构建更具表现力的虚拟形象。目前，我们建议复制它们以制作您自己的变体，因为它们可能会在以后更改或删除。  

![20220817-230858-87dG-Unity_PLjQ](https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif)  
*带有基本颈部模型和肢体约束的虚拟形象 Rig 示例*

-   **随机玩家颜色**  
    作为虚拟形象自定义的一个示例，您可以为您的 renderers 添加一个 `PlayerColor` component。  
    这种随机颜色在玩家之间是同步的。  

-   **眼睛旋转**  
    `AvatarEyeLook_Rotation` 旋转 GameObject（眼睛）以跟随其他虚拟形象和随机目标。此组件在玩家之间是同步的。  
    
-   **眼睛眨动**  
    `AvatarBlink_Simple` 每隔几秒随机隐藏 GameObject（眼睛），模拟眨眼。  
    
    ![image](https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png)  
    *虚拟形象 Prefab 层级示例*
    
-   **偏移约束**  
    `OffsetConstraint` 允许在虚拟形象空间中将一个对象相对于另一个对象进行偏移。这使得例如，身体可以跟随头部但保持旋转水平。它还允许构建简单的颈部模型。  
    
-   **肢体约束**  
    `BasicIKConstraint` 是一个非常精简的约束，它接受两个 transform 和一个提示。这对于构建简单的手臂或腿部链很有用。由于旋转目前尚未正确实现，手臂和腿部可能需要旋转对称才能“看起来正确”。它被称为“Basic”是有原因的！  

## AR 中的 HTML 内容叠加  
    
如果您想根据客户端使用的是普通浏览器还是正在使用 AR 或 VR 来显示不同的 HTML 内容，您只需使用一组 HTML 类。  
这是通过 HTML 元素类控制的。例如，要在桌面和 AR 中显示内容，请在 `<needle-engine>` 标签内添加一个 ``<div class="desktop ar"> ... </div>``：  

```html
<needle-engine>
    <div class="desktop ar" style="pointer-events:none;">
        <div class="positioning-container">
          <p>您的 AR 和桌面内容在此处</p>
          <p class="only-in-ar">这仅在 AR 中可见</p>
        <div>
    </div>
</needle-engine>
```

内容叠加是使用可选的 `dom-overlay` 功能实现的，该功能通常在基于屏幕的 AR 设备（手机、平板电脑）上受支持。  

使用 `.ar-session-active` 类可在 AR 中显示/隐藏特定内容。[`:xr-overlay` 伪类](https://www.w3.org/TR/webxr-dom-overlays-1/#css-pseudo-class) 目前不应使用，因为它会破坏 Mozilla 的 WebXR Viewer。 

```css
.only-in-ar {
  display: none;
}

.ar-session-active .only-in-ar {
  display:initial;
}
```

值得注意的是，叠加元素[在 XR 中始终会全屏显示](https://www.w3.org/TR/webxr-dom-overlays-1/#ua-style-sheet-defaults)，与已应用的样式无关。如果您想以不同方式对齐项目，您应该在 `class="ar"` 元素 _内部_ 创建一个容器。  

<sample src="https://engine.needle.tools/samples-uploads/ar-overlay/"/>


## iOS 上的增强现实和 WebXR

由于 Apple 目前不支持在 iOS 设备上使用 WebXR，iOS 上的增强现实体验受到一定限制。  

Needle Engine 的 [Everywhere Actions](everywhere-actions.md) 旨在弥补这一空白，为由特定组件组成的场景带来自动交互功能到 iOS 设备。它们支持 WebXR 中可用功能的一个子集，例如空间音频、图像追踪、动画等。请参阅 [文档](everywhere-actions.md) 了解更多信息。 

:::tip QuickLook 中对自定义代码的支持有限
Apple 对 QuickLook 中可使用的内容施加了严格限制。因此，自定义脚本组件无法自动转换为在 iOS 上的 AR 中使用。您可以使用我们的 Everywhere Actions API 添加对某些类型自定义代码的支持。
:::

### 乐器 – WebXR 和 QuickLook 支持

这是一个乐器示例，它使用 Everywhere Actions，因此可以在浏览器和 iOS 设备上的 AR 中运行。 
它使用空间音频、动画和点击交互。  
<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Everywhere Actions 和 iOS AR 的其他选项

还有其他选项可以引导 iOS 用户获得更强大的交互式 AR 体验：

3.  **将内容即时导出为 USDZ 文件。**  
    这些文件可以在 iOS 设备上以 AR 形式显示。当从带有 Everywhere Actions 的场景中导出时，其交互性相同，足以满足产品配置器、叙事体验等需求。
    一个示例是 [Castle Builder](https://castle.needle.tools)，其中作品（非实时会话）可以在 AR 中查看。  

 > **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** 使用这种方法。玩家可以在其屏幕上协作将文本放置到场景中，然后在 iOS 上以 AR 形式查看结果。在 Android 上，他们也可以直接在 WebXR 中进行交互。   
 > — #madewithneedle by Katja Rempel 💚  

1.  **引导用户使用 iOS 上兼容 WebXR 的浏览器。**  
    根据您的目标受众，您可以引导 iOS 用户使用例如 Mozilla 的 [WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056) 来体验 iOS 上的 AR。  
    
2.  **在 iOS 设备上使用摄像头访问和自定义算法。**  
    可以请求摄像头图像访问并运行自定义算法以确定设备姿态。  
    虽然我们目前不提供内置组件，但这里有一些我们将来想尝试的库和框架参考：  
    -   [AR.js](https://github.com/AR-js-org/AR.js) (开源)
        -   FireDragonGameStudio 的 [实验性 AR.js 集成](https://github.com/FireDragonGameStudio/NeedleAndARjs)
    -   [Mind AR](https://github.com/hiukim/mind-ar-js) (开源)
    -   [8th Wall](https://www.8thwall.com/) (商业)


## 图像追踪

Needle Engine 支持 Android 上的 **WebXR 图像追踪** ([实时演示](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) 和 iOS 上的 **QuickLook 图像追踪**。

您可以在 [WebXR 图像追踪](./webxr-image-tracking.md) 页面上找到更多文档。


页面由 AI 自动翻译