---
title: VR 和 AR (WebXR)
---

## 支持的设备

Needle Engine 支持完整的 [WebXR specification](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)，包括 AR 和 VR。WebXR 是一个官方网络标准，它将沉浸式体验带到网络上，并具备网络的全部优势：无需安装、无需应用商店、无需 SDKs。

所有带有浏览器的设备都可以运行使用 Needle 构建的应用。如果浏览器支持 WebXR，您的应用也将自动使用我们内置的 components 在 XR 中工作。这包括桌面浏览器、移动浏览器、许多 AR/VR headsets 上的浏览器，以及其他新兴技术，如 Looking Glass 显示器、智能眼镜等。

:::tip 通过 USDZ/QuickLook 在 iOS 上提供无需 App 的 AR 支持
虽然 iOS 设备目前尚未官方支持 WebXR，但 Needle 支持使用 [Everywhere Actions](everywhere-actions.md) 在 iOS 上创建 AR 体验。请参阅 [iOS 部分](#augmented-reality-and-webxr-on-ios)了解更多详情。您可以创建丰富、interactive 的体验，即使在 Apple 设定的限制下，这些体验也能在 iOS 设备上 seamless地在 AR 中工作。

当您在 iOS 上进入 AR mode 时，Needle 会自动将您的 scene 转换为一个 USDZ file，然后使用 Apple 的 QuickLook 在 AR 中显示。Objects, materials, audio, animation 和 Everywhere Actions 将被 preserved。
:::

下表列出了一些我们验证过与 Needle Engine 兼容的设备。
当支持 WebXR 的新设备问世时，它将 out of the box与您的应用兼容。这是 building with the browser as a platform 的一大优势——compatibility 不受特定设备集或 SDKs 的限制。

| Headset Device | Browser | Notes |
| -- | -- | -- |
| Apple Vision Pro | ✔️ Safari | hand tracking, support for transient pointer |
| Meta Quest 3 | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup>, passthrough, depth sensing, mesh tracking |
| Meta Quest 3S | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup>, passthrough, depth sensing, mesh tracking |
| Meta Quest 2 | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup>, passthrough (black and white) |
| Meta Quest 1 | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup> |
| Meta Quest Pro | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup>, passthrough |
| Pico Neo 4 | ✔️ Pico Browser | passthrough, hand tracking<sup>2</sup> |
| Pico Neo 3 | ✔️ Pico Browser | no hand tracking, inverted controller thumbsticks |
| Oculus Rift 1/2 | ✔️ Chrome |  |
| Valve Index | ✔️ Chrome |  |
| HTC Vive | ✔️ Chrome |  |
| Hololens 2 | ✔️ Edge | hand tracking, support for AR and VR (in VR mode, background is rendered as well) |

| Mobile Device | Browser | Notes |
| -- | -- | -- |
| Android 10+ | ✔️ Chrome | |
| Android 10+ | ✔️ Firefox | |
| iOS 15+ | (✔️)<sup>3</sup> Safari<br/>(✔️)<sup>3</sup> Chrome | No full code support, but Needle [Everywhere Actions](everywhere-actions.md) are supported for creating dynamic, interactive USDZ files. |
| iOS 15+ | ✔️ WebXR Viewer | browser is somewhat dated by now |
| Hololens 2 | ✔️ Edge | |
| Hololens 1 | ❌ | no WebXR support |
| Magic Leap 2 | ✔️ | |
| Magic Leap 1 | ✔️ | deprecated device |

| Other Devices | Browser | Notes |
| -- | -- | -- |
| Looking Glass Holographic Display | ✔️ Chrome | requires Looking Glass bridge and some custom code, [see our sample](https://engine.needle.tools/samples/looking-glass/) |
| Logitech MX Ink | ✔️ Meta Browser | officially supported, see [docs](https://logitech.github.io/mxink/WebXR/WebXrIntegration.html#using-needle-tools) |

<sup>1</sup>: Requires enabling a browser flag: `chrome://flags/#webxr-navigation-permission`   
<sup>2</sup>: Requires enabling a toggle in the Developer settings    
<sup>3</sup>: Uses [Everywhere Actions](everywhere-actions.md) or [other approaches](#augmented-reality-and-webxr-on-ios)

## VR, AR 和 QuickLook 示例

访问我们的 [Needle Engine Samples](https://engine.needle.tools/samples/?overlay=samples&tag=xr) 立即尝试许多 interactive examples。或者，点击下方的 <kbd>QR Code</kbd>（用于手机）或 <kbd>Open on Quest</kbd>（用于 Meta Quest headsets）按钮，在您的设备上实时尝试。

<sample src="https://engine.needle.tools/samples/collaborative-sandbox/"/>

## 为场景添加 VR 和 AR 功能

Needle Engine 中的 AR, VR 和 networking capabilites 被设计为模块化的。您可以选择不支持其中任何一个，或者只添加 specific features。

### 基本功能

1.  **启用 AR 和 VR**
    添加一个 `WebXR` component。
    *Optional:* 您可以通过 referencing 一个 [Avatar Prefab](#avatars) 来设置 custom avatar。
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

:::tip Scene structure
These components can be anywhere inside your hierarchy。它们也可以 all be on the same GameObject，which is a common pattern。
:::

> **[Castle Builder](https://castle.needle.tools/)** 使用上述 all of the above for a cross-platform multiplayer sandbox experience。
> — #madebyneedle 💚

### 特殊 AR 组件

1.  **Define the AR Session root and scale**
    为您的 root object 添加一个 `WebARSessionRoot` component。For AR experiences, often you want to scale the scene to fit the real world。
2.  Define the **user scale** to shrink (< 1) or enlarge (> 1) the user in relation to the scene when entering AR。

### 控制 XR 中对象的显示

1.  **Define whether an object is visible in Browser, AR, VR, First Person, Third Person**
    为您要控制的对象添加一个 `XR Flag` component。

2.  **Change options on the dropdown** as needed。
    Common usecases are
    - hiding floors when entering AR
    - hiding Avatar parts in First or Third Person views。例如，in first-person view a person shouldn't be able to see their own head model。

### 在 VR 世界之间穿梭

Needle Engine supports the [`sessiongranted`](https://github.com/immersive-web/navigation) state。这允许 users to seamlessly traverse between WebXR applications without leaving an immersive session – they stay in VR or AR。

Currently, this is only supported on Oculus Quest 1, 2 and 3 in the Oculus Browser。On other platforms, users will be kicked out of their current immersive session and have to enter VR again on the new page。
Requires enabling a browser flag: `chrome://flags/#webxr-navigation-permission`

-   **点击对象打开链接**
    添加 `OpenURL` component，使得构建 connected worlds 变得非常容易。

## Scripting
Read more about scripting for XR at the [scripting XR documentation](./scripting.md#xr-event-methods)

## Avatars

While we don't currently provide an out-of-the-box integration external avatar systems,您可以创建 application-specific avatars or custom systems。

-   **Create a custom Avatar**
    -   创建一个 empty GameObject as avatar root
    -   Add an object named `Head` and add a `XRFlag` that's set to Third Person
    -   Add objects named `HandLeft` and `HandRight`
    -   在这些 objects 下方添加您的 graphics。

### Experimental Avatar Components

有一些 experimental components to build more expressive Avatars。At this point we recommended duplicating them to make your own variants, since they might be changed or removed at a later point。

![20220817-230858-87dG-Unity_PLjQ](https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif)
*Example Avatar Rig with basic neck model and limb constraints*

-   **Random Player Colors**
    As an example for avatar customization,您可以为您的 renderers 添加一个 `PlayerColor` component。
    This randomized color is synchronized between players。

-   **Eye Rotation**
    `AvatarEyeLook_Rotation` rotates GameObjects (eyes) to follow other avatars and a random target。This component is synchronized between players。

-   **Eye Blinking**
    `AvatarBlink_Simple` randomly hides GameObjects (eyes) every few seconds, emulating a blink。

![image](https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png)
*Example Avatar Prefab hierarchy*

-   **Offset Constraint**
    `OffsetConstraint` allows to shift an object in relation to another one in Avatar space。这允许，例如，to have a Body follow the Head but keep rotation levelled。它也 allows to construct simple neck models。

-   **Limb Constraint**
    `BasicIKConstraint` is a very minimalistic constraint that takes two transforms and a hint。This is useful to construct simple arm or leg chains。As rotation is currently not properly implemented, arms and legs may need to be rotationally symmetric to "look right"。它之所以被称为“Basic”是有原因的！

## AR 中的 HTML 内容叠加

如果您想根据客户端使用的是 regular browser 还是 using AR or VR 来显示不同的 html content，您只需 use a set of html classes。
这是通过 HTML element classes 控制的。例如，to make content appear on desktop and in AR add a ``<div class="desktop ar"> ... </div>`` inside the `<needle-engine>` tag:

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

Content Overlays are implemented using the optional `dom-overlay` feature which is usually supported on screen-based AR devices (phones, tablets)。

Use the `.ar-session-active` class to show/hide specific content while in AR。[`:xr-overlay` pseudo class](https://www.w3.org/TR/webxr-dom-overlays-1/#css-pseudo-class) shouldn't be used at this point because using it breaks Mozilla's WebXR Viewer。

```css
.only-in-ar {
  display: none;
}

.ar-session-active .only-in-ar {
  display:initial;
}
```

It's worth noting that the overlay element [will be always displayed fullscreen while in XR](https://www.w3.org/TR/webxr-dom-overlays-1/#ua-style-sheet-defaults), independent of styling that has been applied。If you want to align items differently, you should make a container _inside_ the `class="ar"` element。

<sample src="https://engine.needle.tools/samples-uploads/ar-overlay/"/>

## iOS 上的增强现实和 WebXR

Augmented Reality experiences on iOS are somewhat limited, 由于 Apple 目前不支持在 iOS devices 上使用 WebXR。

Needle Engine 的 [Everywhere Actions](everywhere-actions.md) are designed to fill that gap, bringing automatic interactive capabilities to iOS devices for scenes composed of specific components。它们支持 WebXR 中 available 的一部分功能，例如 spatial audio, image tracking, animations, and more。See [the docs](everywhere-actions.md) for more information。

:::tip QuickLook 中对自定义代码的支持有限
Apple has strong limitations in place what kind of content can be used in QuickLook。Thus, custom script components can not automatically be converted for use in AR on iOS。You can add support for some sorts of custom code using our Everywhere Actions API。
:::

### 乐器 – WebXR 和 QuickLook 支持

Here's an example for a musical instrument that uses Everywhere Actions and thus works in browsers and in AR on iOS devices。
它使用 spatial audio, animation, and tap interactions。
<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Everywhere Actions 和 iOS AR 的其他选项

还有其他 options for guiding iOS users to even more capable interactive AR experiences:

3.  **Exporting content on-the-fly as USDZ files。**
    These files can be displayed on iOS devices in AR。When exported from scenes with Everywhere Actions the interactivity is the same, more than sufficient for product configurators, narrative experiences and similar。
    An example is [Castle Builder](https://castle.needle.tools) where creations (not the live session) can be viewed in AR。

> **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** uses this approach。Players can collaboratively place text into the scene on their screens and then view the results in AR on iOS。On Android, they can also interact right in WebXR。
> — #madewithneedle by Katja Rempel 💚

1.  **Guiding users towards WebXR-compatible browsers on iOS。**
    Depending on your target audience, 您可以引导 iOS 上的用户例如使用 Mozilla 的 [WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056) 在 iOS 上体验 AR。

2.  **Using camera access and custom algorithms on iOS devices。**
    可以请求 camera image access and run custom algorithms to determine device pose。
    While we currently don't provide built-in components for this, 这里有一些我们将来想尝试的 libraries and frameworks reference:
    -   [AR.js](https://github.com/AR-js-org/AR.js) (open source)
        -   [Experimental AR.js integration](https://github.com/FireDragonGameStudio/NeedleAndARjs) by FireDragonGameStudio
    -   [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)
    -   [8th Wall](https://www.8thwall.com/) (commercial)

## 图像追踪

Needle Engine supports **WebXR Image Tracking** ([Live Demo](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) on Android and **QuickLook Image Tracking** on iOS。

您可以在 [Everywhere Actions](everywhere-actions.md#image-tracking) 部分找到 additional documentation。

:::warning WebXR Image Tracking is still in a "draft" phase and not generally available
So far, browser vendors haven't been able to agree on the final image tracking API for WebXR。As long as the specification is in "draft" phase ([Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md))，
您和您的应用的 users 需要遵循 these steps to enable WebXR ImageTracking on Android devices:
1.  在您的 Android Chrome browser 中访问 ``chrome://flags``
2.  找到并启用 `WebXR Incubations` 选项
:::

Without that spec, one can still request camera image access and run custom algorithms to determine device pose。The downside is that users will have to accept additional permissions like camera access, and the tracking will not be as accurate as with the native capabilities of the device。

Here are some libraries to add image tracking based on camera access and local computer vision algorithms:
-   [AR.js with Needle Engine 的实验性集成](https://github.com/FireDragonGameStudio/NeedleAndARjs) by FireDragonGameStudio
-   [AR.js](https://github.com/AR-js-org/AR.js) (open source)
-   [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)

## 参考资料

[WebXR Device API](https://www.w3.org/TR/webxr/)
[caniuse: WebXR](https://caniuse.com/webxr)
[Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)


页面由 AI 自动翻译