---
lang: zh-CN
title: Mercedes-Benz 展柜
editLink: false
---

## 关于

你好，我的名字是 Kryštof，我做了一个关于 Needle 的研究项目。在 [我们公司](https://www.ishowroom.cz/home/)，我们想确定 Needle 如何能帮助我们的工作流程。我们有一个本地客户，专注于转售豪华汽车。我们已经使用 Unity 交付了一个移动应用和 VR 体验。我们在引擎中有大约 30 辆独特的汽车。我们计划扩展客户的网站，增加具有更多配置选项的视觉上令人愉悦的数字克隆。Needle 可以实现 Unity 和 Web 视觉效果之间的完美 1:1 转换。这将对我们的工作流程带来巨大的益处。这就是激发我们研究的原因。


<sample src="https://engine.needle.tools/demos/mercedes-benz-demo/" />


## 背景

我不太熟悉 javascript、typescript 或 three.js，所以我的观点是一个半有经验的 Unity 开发者，尝试以最简单的方式创建 Web 体验。对于那些可能建议使用 Unity WebGL 的人，遗憾的是它不起作用，并且在移动浏览器上不够灵活。Needle 是 💚


## 光照

我们的光照模型基于 Unity 中的反射探针。我们不需要任何平行光或点光源，只需要环境光。


我们使用这个天空盒：

 ![天空盒](/showcase-mercedes/1_skybox.png)

在车漆上看起来像这样：

![车漆](/showcase-mercedes/2_paintjob_simple.jpg)

然后为了增加一些细节，我添加了 2 个平行光，强度微不足道 (0.04)，以创建镜面高光。所以之前看起来像这样：

![镜面关闭](/showcase-mercedes/3_SpecularHighlights_off.jpg)

但添加平行光后，增加了更好的动态效果。通过更高的强度可以深化效果：

![镜面开启](/showcase-mercedes/4_SpecularHighlights_on.jpg)



## 背景

场景现在看起来像这样：

![无背景](/showcase-mercedes/5_NoBackground.jpg)

黑色背景不太美观。因此，为了区分视觉天空盒和光照天空盒，我添加了一个反向球体，它包裹了整个地图。

![带背景](/showcase-mercedes/6_MapBackground.png)

关于渐变，它从微弱的灰色变为白色。

只需适当的 UV 映射和一个单像素高的纹理即可轻松创建此效果，该纹理将定义渐变。

我在 Shader Graph 中创建了一个无光照着色器：

![环境着色器](/showcase-mercedes/7_EnvShaderGraph.jpg)

我注意到颜色条带问题，所以我尝试实现抖动。坦率地说，它没有帮助消除伪影，但我敢肯定这个问题有一个简单的解决方案。所以着色器的上半部分基于物体空间中的 Y 轴采样渐变。下半部分试图消除颜色条带。

通过使用着色器，使用和迭代渐变更加简单。通过使用 Needle 的 Shadergraph markdown 资产，这甚至更简单！ 🌵

![渐变](/showcase-mercedes/8_Gradiant.png)


## 汽车模拟运动

场景现在是静态的，因为没有任何东西移动。我们可以通过添加模拟运动感来抵消这一点。让我们从给轮子添加运动开始。

通过一个名为 Rotator 的简单组件，我们定义了一个轴及其上的速度。

![旋转器](/showcase-mercedes/9_Rotator.png)
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export enum RotationAxis {
    X, Y, Z
}

export class Rotator extends Behaviour {
    //@type RotationAxis
    @serializable()
    axis : RotationAxis = RotationAxis.X;

    @serializable()
    speed : number = 1;

    update() {
        const angle = this.speed * this.context.time.deltaTime;
        switch(this.axis) {
            case RotationAxis.X:
                this.gameObject.rotateX(angle);
                break;
            case RotationAxis.Y:
                this.gameObject.rotateY(angle);
                break;
            case RotationAxis.Z:
                this.gameObject.rotateZ(angle);
                break;
        }
    }
}
```


用户现在看到一辆车行驶在空虚之中，颜色不像任何东西，体验很乏味。我们想让模型有基础感，这通过添加一个网格并移动它来实现，这样看起来就像汽车正在移动。这是我们想要达到的效果：

![运动](/showcase-mercedes/10_WheelsAndGrid.png)

网格的着色器由两部分组成。一个简单的网格平铺纹理，通过一个圆形渐变相乘使其边缘淡出。

![网格](/showcase-mercedes/11_GridShader.jpg)


## 额外元素

这个技术演示旨在展示汽车的功能。

让我们从高亮显示轮子开始。

![轮子高亮](/showcase-mercedes/12_WheelWithText.png)

将此着色器添加到平面会产生一个虚线圆，它以定义的速度旋转。结合世界空间 UI 和普通 Text 组件，这可以突出显示给定产品的一些有趣功能或参数。

![轮子着色器](/showcase-mercedes/13_WheelShader.jpg)

展示完轮子后，我们想用关于产品的广泛信息来结束。在这种情况下，那就是汽车的全名以及一些可用的配置。

![后部 UI](/showcase-mercedes/14_RearUI.jpg)



## 总结

通过使用 Unity 的时间线，我们可以控制轮子虚线和文本何时显示。这与摄像机动画相辅相成。


## 结论

Needle Engine 对我们来说似乎是一个非常好的选择！

我们缺少一些功能。

例如，对 Lit Shader Graphs 的良好支持。但这不妨碍我们以 three.js 的方式创建着色器，并在 Unity 中为我们的内容团队创建类似的着色器来调整材质。

使用 Needle 非常棒！ 🌵


---
页面由 AI 自动翻译