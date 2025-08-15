---
title: Needle Engine 的 WebXR 图像跟踪
---

## 什么是 WebXR 图像跟踪
**WebXR 图像跟踪使浏览器能够通过设备的摄像头检测和跟踪现实世界中的特定图像**，提供实时位置和方向数据，以便将虚拟内容精确锚定到海报、包装或艺术品等物理标记上。

通过将摄像头对准识别出的图像，图像跟踪 API 会持续更新虚拟和物理元素之间的空间关系，即使设备或图像移动，也能确保正确对齐。

图像跟踪将静态图像转换为交互式 AR 触发器——允许博物馆画作显示叠加信息、产品包装展示 3D 动画，或名片显示浮动联系方式——所有这些都通过网络标准实现，无需用户下载专用应用程序，使得 AR 体验可以通过任何兼容的网络浏览器即时访问。

## 演示

Needle Engine 在 Android 上支持 **WebXR 图像跟踪** ([在线演示](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr))，在 iOS 上支持 **QuickLook 图像跟踪**。

在 AR 中启动下面的场景，并将手机摄像头对准屏幕上的图像标记，或者将其打印出来。

:::info Android 上的 WebXR 图像跟踪
**在 Android 上**，请在 Chrome Flags 中打开“WebXR Incubations”。您可以通过将 [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) 粘贴到 Android 手机的 Chrome 浏览器地址栏中找到它们。
:::


<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="图像标记" width=300 />    

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />


## 说明


:::warning WebXR 图像跟踪仍处于“草案”阶段，尚未普遍可用
到目前为止，浏览器供应商尚未就 WebXR 的最终图像跟踪 API 达成一致。只要规范仍处于“草案”阶段 ([Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md))，
您和您的应用程序用户需要遵循以下步骤才能在 Android 设备上启用 WebXR ImageTracking：
1. 在您的 Android Chrome 浏览器上访问 ``chrome://flags``
2. 找到并启用 `WebXR Incubations` 选项
:::

如果没有该规范，仍然可以请求摄像头图像访问并运行自定义算法来确定设备姿态。缺点是用户将不得不接受额外的权限，例如摄像头访问，并且跟踪将不如设备的本机功能准确。

以下是一些基于摄像头访问和本地计算机视觉算法添加图像跟踪的库：  
   - [AR.js 与 Needle Engine 的实验性集成](https://github.com/FireDragonGameStudio/NeedleAndARjs) 由 FireDragonGameStudio 提供
   - [AR.js](https://github.com/AR-js-org/AR.js) (开源)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (开源)


### 集成
通过向对象添加 WebXRImageTracking 组件，可以在 Unity 和 Blender 中设置图像跟踪。然后将您的图像添加到 `Tracked Images` 数组中。

![unity screenshot](/imgs/webxr-image-tracking-unity-component.jpg)  
*Unity 中的图像跟踪组件*

![blender screenshot](/imgs/webxr-image-tracking-blender-component.jpg)  
*Blender 中的图像跟踪组件*

## 参考

- [WebXR 标记跟踪说明](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)
- [WebXR 设备 API](https://www.w3.org/TR/webxr/)  
- [caniuse: WebXR](https://caniuse.com/webxr)  
- [Apple 的初步 USD 行为](https://developer.apple.com/augmented-reality/quick-look/)


## 延伸阅读
- [Needle Everywhere Actions](./everywhere-actions.md) *随处可运行的体验*
- [XR 文档](./xr.md)

---
页面由 AI 自动翻译