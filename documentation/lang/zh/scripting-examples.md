---
title: 脚本示例
description: 有用的脚本片段和示例集合。
---

# 脚本示例

如果您刚接触脚本，我们**强烈建议**先阅读以下指南：

- [新手指南：Typescript Essentials](./getting-started/typescript-essentials.md)
- [新手指南：面向 Unity 开发者的 Needle Engine](./getting-started/for-unity-developers.md)
- [视频教程：如何编写自定义组件](https://youtu.be/uf5UK0bLHlY?si=82U_2L4n2V7XL7RJ)

下面是一些基本脚本作为快速参考。

我们还提供了许多示例场景和完整项目，您可以下载并作为起点：
- [访问示例网站](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=scripting_examples)
- [下载示例包](https://engine.needle.tools/downloads/unity/samples)
- [Needle Engine Stackblitz 集合](https://stackblitz.com/@marwie/collections/needle-engine)
- [Needle Engine API](https://engine.needle.tools/api)

## 基本组件
<stackblitz file="@code/basic-component.ts"></stackblitz>
@[code ts twoslash](@code/basic-component.ts)

参见 [脚本](scripting#lifecycle-methods) 以了解所有组件事件

## 引用 Unity 中的对象
@[code ts twoslash](@code/component-object-reference.ts)

## 从 Unity 引用和加载资源 (Prefab 或 SceneAsset)
@[code ts twoslash](@code/component-prefab.ts)

## 从 Unity 引用和加载场景
::: tip
在我们的[示例](https://engine.needle.tools/samples/multi-scenes-(dynamic-loading))中找到一个[工作示例](https://engine.needle.tools/samples/multi-scenes-(dynamic-loading))以下载和尝试
:::

@[code ts twoslash](@code/component-scene.ts)

## 接收对象的点击
将此脚本添加到场景中任何您希望可点击的对象上。确保该对象的父级层次结构中也有一个 `ObjectRaycaster` 组件。

<stackblitz file="@code/component-click.ts">
测试
</stackblitz>

@[code ts twoslash](@code/component-click.ts)


## 对象的网络化点击

将此脚本添加到场景中任何您希望可点击的对象上。确保该对象的父级层次结构中也有一个 `ObjectRaycaster` 组件。
该组件会将接收到的点击发送给所有连接的客户端，并触发一个事件，您可以在应用程序中对该事件作出反应。如果您使用 Unity 或 Blender，您可以简单地将函数分配给 `onClick` 事件，例如播放动画或隐藏对象。

@[code ts twoslash](@code/component-click-networking.ts)

### 点击时播放动画
@[code ts twoslash](@code/component-animation-onclick.ts)

## 引用一个 Animation Clip
如果您想运行自定义动画逻辑，这会很有用。
您也可以导出一个 clips 数组。
@[code ts twoslash](@code/component-animationclip.ts)


## 创建并调用 UnityEvent

@[code ts twoslash](@code/component-unityevent.ts)
::: tip
EventList 事件也会在组件级别触发。这意味着您也可以使用 ``myComponent.addEventListener("my-event", evt => {...})`` 订阅上面声明的事件。
这是一项实验性功能。请在我们的[论坛](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)中提供反馈
:::


### 声明一个自定义事件类型
这在您希望向 Unity 或 Blender 公开带有自定义参数（如字符串）的事件时很有用。
@[code ts twoslash](@code/component-customevent.ts)

_示例用法：_
![20221128-210735_Unity-needle](https://user-images.githubusercontent.com/2693840/204370950-4c89b877-90d7-4e6f-8266-3352e6da16f4.png)

## 使用嵌套对象和序列化

您可以嵌套对象及其数据。使用正确匹配的 `@serializable(SomeType)` 装饰器，数据将自动序列化和反序列化为正确的类型。

在您的 typescript 组件中：
@[code ts twoslash](@code/component-nested-serialization.ts)

在任何 C# 脚本中：
@[code](@code/component-nested-serialization-cs.cs)

::: tip
如果没有正确的类型装饰器，您仍然会获得数据，但只是一个普通对象。这在移植组件时非常有用，因为您可以访问所有数据并根据需要添加类型。
:::

## 使用 Web API
::: tip
请记住，您仍然可以访问所有 web apis 和 [npm](https://npmjs.org) 包！
如果允许我们在这里这样说，这就是 Needle Engine 的魅力所在 😊
:::

### 显示当前位置
@[code ts twoslash](@code/component-location.ts)

### 使用 Coroutine 显示当前时间
@[code ts twoslash](@code/component-time.ts)

<video-embed src="./videos/component-time.mp4" limit_height />


## 改变自定义着色器属性

假设您有一个自定义着色器，其属性名称为 `_Speed`，是一个浮点值，您可以通过脚本来改变它。
您可以在我们的[示例](https://engine.needle.tools/samples/shaders/)中找到一个可下载的实时[示例](https://engine.needle.tools/samples/shaders/)。

<!-- SAMPLE modify custom shader material property -->


## 切换 src 属性

请参阅 StackBlitz 上的[实时示例](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)。


## 添加新的后处理效果

请确保在您的 web 项目中安装 [`npm i postprocessing`](https://github.com/pmndrs/postprocessing)。然后，您可以派生自 `PostProcessingEffect` 来添加新的效果。

要使用该效果，将其添加到与您的 `Volume` 组件相同的对象上。

这里有一个封装了 [Outline 后处理效果](https://pmndrs.github.io/postprocessing/public/demo/#outline)的示例。您可以像往常一样公开变量和设置，因为任何效果在您的 three.js 场景中也只是一个组件。

@[code](@code/custom-post-effect.ts)


## 自定义 ParticleSystem 行为


@[code ts twoslash](@code/custom-particle-system-behaviour.ts)


## 自定义 2D Audio 组件

这是一个如何创建自己的音频组件的示例。
然而，对于大多数用例，您可以使用核心 AudioSource 组件，无需编写代码。

@[code ts twoslash](@code/component-2d-audio.ts)


## 任意外部文件

使用 FileReference 类型加载外部文件（例如 json 文件）
@[code ts twoslash](@code/component-filereference.ts)

<!-- SAMPLE receive click from HTML button
## 在组件中接收 HTML 元素的点击
-->



<!-- SAMPLE disable environment light
## 禁用环境光
-->


<!-- SAMPLE using mediapipe with hands
## 使用 mediapipe 包用手控制 3D 场景
确保安装 mediapipe 包。访问下面的 github 链接以查看完整的项目设置。
在这里[实时尝试](https://engine.needle.tools/samples/mediapipe-hands/) - 需要摄像头/相机
-->


<!-- SAMPLE Change Color On Collision
## 碰撞时改变颜色
-->

<!-- SAMPLE Physics Trigger Relay
## 物理触发器中继
使用对象的物理触发器方法触发事件
-->

<!-- SAMPLE Auto Reset
## 自动重置
当对象离开物理触发器时自动重置其位置
-->

<!-- SAMPLE Play Audio On Collision
## 碰撞时播放音频
-->

<!-- SAMPLE Set Random Color
## 设置随机颜色
在开始时随机化对象的颜色。注意，材质在 `start` 方法中会被克隆
-->

<!-- SAMPLE Timed Spawn
## 按时间间隔生成对象
-->

---
页面由 AI 自动翻译