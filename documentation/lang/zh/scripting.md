---
title: Creating and using Components
tags:
    - scripting
    - serialization
    - csharp
    - typescript
    - javascript
    - components
---

# 创建和使用组件

如果您刚开始接触脚本，我们**强烈建议**您先阅读以下指南：

- [TypeScript 基础](./getting-started/typescript-essentials.md)
- [Unity 开发人员使用 Needle Engine](./getting-started/for-unity-developers.md)

如果您知道自己在做什么，请随时直接查阅 [Needle Engine API 文档](https://engine.needle.tools/docs/api/latest)。

---

Needle Engine 的运行时代码是用 [TypeScript](https://typescriptlang.org)（推荐）或 [JavaScript](https://javascript.info/) 编写的。我们自动生成 C# 存根组件，您可以将这些组件添加到编辑器中的 GameObjects。C# 组件及其数据由运行时重新创建为具有相同数据的 JavaScript 组件，并附加到 three.js 对象上。

自定义组件以及内置 Unity 组件都可以通过这种方式映射到 JavaScript 组件。例如，许多与动画、渲染或物理相关的内置组件的映射已经[包含在 Needle Engine 中](./component-reference.md#unity-components)。

如果您想跟着下面的示例进行编码而无需安装任何东西，只需点击以下链接：

- [创建虚拟工作空间进行编码](https://stackblitz.com/fork/github/needle-engine/vite-template?file=src%2Fmain.ts)。

----

我们的 Web 运行时引擎采用类似于 Unity 的组件模型，因此提供了许多您会感到熟悉的功能。
附加到 three 的 Object3D 对象上的组件具有您可以实现的生命周期方法，如 ``awake``、``start``、``onEnable``、``onDisable``、``update`` 和 ``lateUpdate``。您也可以使用 [Coroutines](#coroutines)。

----

## 当您无需编写代码时

通常，可以使用 Unity 中的事件并调用内置组件上的方法来实现交互式场景。一个典型的例子是在按钮点击时播放动画——您创建一个按钮，在检查器中添加一个 Click 事件，然后让它调用 Animator.SetTrigger 或类似方法来播放特定的动画。

Needle Engine 将 Unity 事件转换为 JavaScript 方法调用，这使得这成为一个非常快速且灵活的工作流程——像往常一样设置您的事件，当它们被调用时，它们将像在 Unity 中一样工作。

![image](https://user-images.githubusercontent.com/2693840/187314594-7e34905d-e704-4fa3-835c-6b40f11e1c62.png)
_Needle Engine 中一个 Button Click 事件开箱即用的示例——无需代码。_

## 创建新组件

脚本使用 TypeScript（推荐）或 JavaScript 编写。
有两种方法可以将自定义脚本添加到您的项目：

- 只需在您生成的项目目录的 `src/scripts/` 内部添加一个扩展名为 `.ts` 或 `.js` 的文件，例如 `src/scripts/MyFirstScript.ts`

- Unity 特有：
  将您的代码组织到 NPM 定义文件 (npm packages) 中。这有助于您在项目之间进行模块化和代码复用，如果您熟悉 Web 开发，它们实际上是本地安装的常规 npm 包。
  在 Unity 中，您可以通过 `Create > NPM Definition` 创建 NpmDef 文件，然后右键单击 NpmDef 文件并选择 `Create > TypeScript` 来添加 TypeScript 文件。有关更多信息，请参阅[本章](./project-structure.md#npm-definition-files)。

在这两种方法中，源代码目录会被监视以进行更改，并且每当检测到更改时，C# 存根组件或 Blender 面板会重新生成。
源文件的更改也会导致正在运行的网站热重载——您无需等待 Unity 重新编译 C# 组件。这使得代码迭代几乎是即时的。

您甚至可以在一个文件中包含多个组件类型（例如，您可以在同一个 Typescript 文件中声明 `export class MyComponent1` 和 `export class MyOtherComponent`）。

如果您是 Javascript 或 Typescript 的新手，我们建议您在继续本指南之前先阅读[TypeScript 基础指南](./getting-started/typescript-essentials.md)。

:::details 示例：创建一个旋转对象的组件

- **创建一个旋转对象的组件**
  创建 ``src/scripts/Rotate.ts`` 并添加以下代码：
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class Rotate extends Behaviour
{
    @serializable()
    speed : number = 1;

    start(){
        // logging this is useful for debugging in the browser.
        // You can open the developer console (F12) to see what data your component contains
        console.log(this);
    }

    // update will be called every frame
    update(){
        this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
    }
}
```

现在在 Unity 内部会自动生成一个名为 ``Rotate.cs`` 的新脚本。将新的 Unity 组件添加到 Cube 并保存场景。
Cube 现在在浏览器中旋转。
通过 `F12` 打开 chrome 开发者控制台，检查 ``Rotate.start`` 方法的日志。这是学习和调试哪些字段已导出并当前已分配的有用的实践。一般来说，所有公共和可序列化字段以及所有公共属性都会被导出。

现在在您的 Unity 组件中添加一个新字段 ``public float speed = 5`` 并保存它。Rotate 组件检查器现在显示一个您可以编辑的 ``speed`` 字段。保存场景（或点击 ``Build`` 按钮），注意 javascript 组件现在已分配导出后的 ``speed`` 值。
:::

:::details 创建带自定义函数的组件
请参阅[TypeScript 基础指南](./getting-started/typescript-essentials.md)了解更多关于语法和语言的信息。
```ts twoslash
import { Behaviour } from "@needle-tools/engine";

export class PrintNumberComponent extends Behaviour
{
    start(){
      this.printNumber(42);
    }

    private printNumber(myNumber : number){
        console.log("My Number is: " + myNumber);
    }
}
```
:::

:::details 版本控制与 Unity
虽然生成的 C# 组件使用类型名称来生成稳定的 GUID，但建议将生成的组件签入版本控制作为良好实践。
:::

## 组件架构

组件被添加到 three.js `Object3Ds`。这类似于 Unity 中将组件添加到 `GameObjects` 的方式。因此，当我们想要访问一个 three.js Object3D 时，我们可以通过 ``this.gameObject`` 来访问它，它返回组件附加到的 `Object3D`。

***注意**：将 ``visible`` 设置为 false 在 Object3D 上将类似于 Unity 中的 ``SetActive(false)``——这意味着它也会禁用此对象及其子对象上的所有当前组件。非活动组件的 Update 事件不会被调用，直到 ``visible`` 再次被设置为 true。*如果您想隐藏对象而不影响组件，只需禁用 Needle Engine 的 `Renderer` 组件即可。

### 生命周期方法

请注意，生命周期方法只有在声明时才会被调用。因此，只在实际需要时声明 `update` 生命周期方法，否则如果您有许多不做任何事情的 update 循环组件，可能会影响性能。

| 方法名 | 描述 |
| -- | --
| `awake()` | 创建新组件时第一个被调用的方法
| `onEnable()` | 组件启用时调用（例如，当 ``enabled`` 从 false 变为 true 时）
| `onDisable()` | 组件禁用时调用（例如，当 ``enabled`` 从 true 变为 false 时）
| `onDestroy()` | 当 Object3D 或组件被销毁时调用
| `start()` | 在组件创建后的第一帧开始时调用
| `earlyUpdate()` | 第一个 update 事件
| `update()` | 默认 update 事件
| `lateUpdate()` | 在 update 之后调用
| `onBeforeRender()` | render 调用前的最后一个 update 事件
| `onAfterRender()` | 在 render 事件后调用

### 物理事件方法

| 方法名 | 描述 |
| -- | --
| `onCollisionEnter(col : Collision)` |
| `onCollisionStay(col : Collision)` |
| `onCollisionExit(col : Collision)` |
| `onTriggerEnter(col : Collision)` |
| `onTriggerStay(col : Collision)` |
| `onTriggerExit(col : Collision)` |

### 输入事件方法

| 方法名 | 描述 |
| -- | --
| `onPointerEnter(args : PointerEventData)` | 当光标开始悬停在对象（或其任何子对象）上时调用
| `onPointerMove(args : PointerEventData)` | 当光标在对象（或其任何子对象）上移动时调用
| `onPointerExit(args : PointerEventData)` | 当光标离开（停止悬停）对象时调用
| `onPointerDown(args : PointerEventData)` | 当光标在对象上按下时调用
| `onPointerUp(args : PointerEventData)` | 当光标在对象上释放时调用
| `onPointerClick(args : PointerEventData)` | 当光标在对象上点击时调用

### XR 事件方法

*需要 Needle Engine >= 3.32.0*
| 方法名 | 描述 |
| -- | --
| `supportsXR(mode: XRSessionMode)` | 可选择实现，如果您只想接收特定 XR 模式（如 `immersive-vr` 或 `immersive-ar`）的回调。返回 `true` 通知系统您想要接收传入模式的回调
| `onBeforeXR(mode: XRSessionMode, init: XRSessionInit)` | 在请求 XRSession 之前调用，可用于修改 XRSessionInit 对象
| `onEnterXR(args: NeedleXREventArgs)` | 当此组件加入 XR 会话时回调（或在正在运行的 XR 会话中变为活动时）
| `onUpdateXR(args: NeedleXREventArgs)` | 当 XR 会话更新时回调（在其在 XR 会话中仍处于活动状态时）
| `onLeaveXR(args: NeedleXREventArgs)` | 当此组件退出 XR 会话时回调（或当其在正在运行的 XR 会话中变为非活动时）
| `onControllerAdded(args: NeedleXRControllerEventArgs)` | 在 XR 会话期间连接/添加控制器时回调 或 当组件加入已连接控制器的正在运行的 XR 会话时 或 当组件在已连接控制器的正在运行的 XR 会话期间变为活动时
| `onControllerRemoved(args: NeedleXRControllerEventArgs)` | 在 XR 会话期间移除控制器时回调 或 当组件在正在运行的 XR 会话期间变为非活动时

#### 额外 XR 事件

| 方法名 | 描述 |
| -- | --
| `window.addEventListener("needle-xrsession-start")` | XRSession 开始时调用的 CustomEvent。`details` 包含 `NeedleXRSession`
| `window.addEventListener("needle-xrsession-end")` | XRSession 结束时调用的 CustomEvent。`details` 包含 `NeedleXRSession`
| `onXRSessionStart(args: { session:NeedleXRSession } )` | 全局事件钩子。要取消订阅，请使用 `offXRSessionStart`

### Coroutines

可以使用 [JavaScript Generator 语法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)声明 Coroutines。
要启动一个 coroutine，调用 ``this.startCoroutine(this.myRoutineName());``

**示例**
```ts twoslash
import { Behaviour, FrameEvent } from "@needle-tools/engine";

export class Rotate extends Behaviour {

    start() {
        // the second argument is optional and allows you to specifiy
        // when it should be called in the current frame loop
        // coroutine events are called after regular component events of the same name
        // for example: Update coroutine events are called after component.update() functions
        this.startCoroutine(this.rotate(), FrameEvent.Update);
    }

    // this method is called every frame until the component is disabled
    *rotate() {
        // keep looping forever
        while (true) {
            yield;
        }
    }
}
```

要停止一个 coroutine，可以通过从中返回退出，或者缓存 ``startCoroutine`` 的返回值并调用 ``this.stopCoroutine(<...>)``。所有 Coroutines 在 ``onDisable`` 时停止 / 当禁用组件时停止。

## 特殊生命周期钩子

Needle Engine 还暴露了一些生命周期钩子，您可以使用它们来挂接到 update 循环，而无需编写一个完整的组件。
这些钩子可以插入到您的 Web 应用程序的任何位置（例如在顶层作用域或在 svelte 组件中）
| 方法名 | 描述 |
| -- | --
| `onInitialized(cb, options)` | 新上下文初始化时调用（在第一帧之前）
| `onClear(cb, options)` | 在引擎上下文被清除之前注册回调
| `onDestroy(cb, options)` | 在引擎中上下文被销毁之前注册回调
| `onStart(cb, options)` | 在组件 `start` 之后、一帧开始时立即调用
| `onUpdate(cb, options)` | 在组件 `update` 之后立即调用
| `onBeforeRender(cb, options)` | 在调用 render 之前调用
| `onAfterRender(cb, options)` | 在调用 render 之后调用

例如（[查看 stackblitz 上的示例](https://stackblitz.com/edit/needle-engine-lifecycle-hooks?file=src%2Fmain.ts)）
```ts twoslash
// this can be put into e.g. main.ts or a svelte component (similar to onMount)
import { onStart, onUpdate, onBeforeRender, onAfterRender } from "@needle-tools/engine"

onStart(ctx => console.log("Hello Scene", ctx.scene));

onUpdate(ctx => {
    // do something... e.g. access the frame # or deltatime via ctx.time
    console.log("UPDATE", ctx.time.frame);
});

onBeforeRender(ctx => {
    // this event is only called once because of the { once: true } argument
    console.log("ON BEFORE RENDER", ctx.time.frame);
}, { once: true } );

// Every event hook returns a method to unsubscribe from the event
const unsubscribe = onAfterRender(ctx => {
    console.log("ON AFTER RENDER", ctx.time.frame);
});
// Unsubscribe from the event at any time
setTimeout(()=> unsubscribe(), 1000);
```

## 查找、添加和移除组件

要访问其他组件，请使用 ``GameObject`` 或 ``this.gameObject`` 方法上的静态方法。例如，要在父对象中访问一个 `Renderer` 组件，可以使用 ``GameObject.getComponentInParent(this.gameObject, Renderer)`` 或 ``this.gameObject.getComponentInParent(Renderer)``。

**示例：**
```ts twoslash
import { Behaviour, GameObject, Renderer } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    start() {
        const renderer = GameObject.getComponentInParent(this.gameObject, Renderer);
        console.log(renderer);
    }
}
```

### 一些可用方法：

| 方法 |  |
| -- | --
| `GameObject.instantiate(Object3D, InstantiateOptions)` | 创建此对象的新实例，包括其所有组件的新实例
| `GameObject.destroy(Object3D \| Component)` | 销毁一个组件或 Object3D（及其组件）
| `GameObject.addNewComponent(Object3D, Type)` | 为提供的对象添加（并创建）给定类型的新组件。请注意，组件返回时 ``awake`` 和 ``onEnable`` 已被调用
| `GameObject.addComponent(Object3D, Component)` | 将组件实例移动到提供的对象。如果您已有一个实例（例如通过 ``new MyComponent()`` 创建组件），然后将其附加到对象，这很有用
| `GameObject.removeComponent(Component)` | 从 gameObject 中移除组件
| `GameObject.getComponent(Object3D, Type)` | 返回提供的对象上匹配给定类型的第一个组件。
| `GameObject.getComponents(Object3D, Type)` | 返回提供的对象上匹配给定类型的所有组件。
| `GameObject.getComponentInChildren` | 与 ``getComponent`` 相同，但也在子对象中搜索。
| `GameObject.getComponentsInChildren` | 与 ``getComponents`` 相同，但也在子对象中搜索。
| `GameObject.getComponentInParent` | 与 ``getComponent`` 相同，但也在父对象中搜索。
| `GameObject.getComponentsInParent` | 与 ``getComponents`` 相同，但也在父对象中搜索。
| `GameObject.findObjectOfType` | 在整个场景中搜索给定类型。
| `GameObject.findObjectsOfType` | 在整个场景中搜索所有匹配类型。

## Three.js 和 HTML DOM

context 指的是 [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 内部的运行时。
three.js 场景位于一个名为 ``<needle-engine>`` 的自定义 HTML 组件内部（请参阅项目中的 *index.html*）。您可以使用 ``this.context.domElement`` 访问 ``<needle-engine>`` web component。

此架构允许在同一网页上潜在地拥有多个 Needle WebGL 场景，这些场景可以独立运行，也可以作为您网页的一部分进行相互通信。

### 访问场景

要从组件访问当前场景，您可以使用 `this.scene`，它等同于 `this.context.scene`，这为您提供了根 three.js 场景对象。

要从组件遍历层级结构，您可以通过 for 循环迭代对象的子对象：
```ts twoslash
for(let i = 0; i < this.gameObject.children; i++)
    console.log(this.gameObject.children[i]);
```
或者您可以使用 `foreach` 等效方法进行迭代：
```ts twoslash
for(const child of this.gameObject.children) {
    console.log(child);
}
```
您也可以使用 three.js 特定方法快速递归迭代所有对象，使用 [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse) 方法：
```ts twoslash
import { Object3D } from "three";
this.gameObject.traverse((obj: Object3D) => console.log(obj));
```
或者只遍历可见对象，改用 [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible)。

另一种在您只想迭代可渲染对象时非常有用且快速的选项是查询所有 renderer 组件并像这样迭代它们：
```ts twoslash
import { Renderer } from "@needle-tools/engine";
for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
有关获取组件的更多信息，请参阅下一节。

### 时间

使用 `this.context.time` 访问时间数据：
- `this.context.time.time` 是应用程序开始运行以来的时间
- `this.context.time.deltaTime` 是自上一帧以来经过的时间
- `this.context.time.frameCount` 是应用程序开始以来的帧数
- `this.context.time.realtimeSinceStartup` 是应用程序开始运行以来的未缩放时间

也可以使用 `this.context.time.timeScale` 特意减慢时间，例如实现慢动作效果。

### 输入

接收组件所在对象的输入数据：
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onPointerDown() {
        console.log("POINTER DOWN on " + this.gameObject.name);
    }
}
```

您也可以像这样订阅 ``InputEvents`` 枚举中的全局事件：
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable() {
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    onDisable() {
        // it is recommended to also unsubscribe from events when your component becomes inactive
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    // @nonSerialized
    inputPointerDown = (evt: NEPointerEvent) => { console.log("POINTER DOWN anywhere on the <needle-engine> element"); }
}
```

或者，如果您想每帧轮询输入状态，可以使用 ``this.context.input``：

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update() {
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN anywhere")
        }
    }
}
```

如果您想自己处理输入，也可以订阅[浏览器提供的所有事件](https://developer.mozilla.org/en-US/docs/Web/Events)（有很多）。例如，要订阅浏览器的 click 事件，您可以这样写：
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onEnable() {
        window.addEventListener("click", this.windowClick);
    }

    onDisable() {
        // unsubscribe again when the component is disabled
        window.removeEventListener("click", this.windowClick);
    }

    windowClick = () => { console.log("CLICK anywhere on the page, not just on <needle-engine>"); }
}
```
请注意，在这种情况下，您必须自己处理所有情况。例如，如果您的用户是在桌面、移动设备还是 VR 设备上访问您的网站，您可能需要使用不同的事件。这些情况由 Needle Engine 输入事件自动处理（例如，`PointerDown` 在鼠标按下、触摸按下以及在 VR 中控制器按钮按下时都会触发）。

### Raycasting

使用 ``this.context.physics.raycast()`` 执行 raycast 并获取交点列表。如果您不传入任何选项，raycast 将从鼠标位置（或第一个触摸位置）使用当前活动的 `mainCamera` 在屏幕空间执行。您也可以传入一个 `RaycastOptions` 对象，其中包含各种设置，如 `maxDistance`、要使用的相机或要测试的层。

使用 ``this.context.physics.raycastFromRay(your_ray)`` 使用 [three.js ray](https://threejs.org/docs/#api/en/math/Ray) 执行 raycast。

> **注意**：这种类型的 raycast 对场景中所有可见对象投射射线。不需要物理引擎，这与 Unity 中的行为不同，Unity 中总是需要 colliders 才能击中对象。如果您只想对物理 colliders 投射，请使用下面描述的 `physics.engine.raycast` 方法。

#### 性能考虑

使用默认的 Needle 压缩设置时，会自动创建网格的简化版本并用于 raycasting。尽管如此，某些类型的网格速度较慢——例如，蒙皮网格或带有 blendshape 的网格需要昂贵的计算来确定精确的碰撞。考虑将这些对象设置为 Unity 中的 `Ignore Raycast` 层，以避免对其进行 raycasting。

#### 基于物理的 Raycasting

另一种选择是使用物理 raycast 方法，它只返回与场景中 colliders 的碰撞。

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

这里是一个可编辑的[物理 raycast 示例](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)

### 网络

网络方法可以通过 ``this.context.connection`` 访问。有关更多信息，请参阅[网络文档](./networking.md)。

## 从任意位置访问 Needle Engine 和组件

可以使用不在组件内部、位于其他地方的常规 JavaScript 代码访问上面描述的所有功能。needle 运行时的所有组件和功能都可以通过全局 ``Needle`` 命名空间访问（您可以编写 ``console.log(Needle)`` 来获得概览）

例如，您可以使用 ``Needle.findObjectOfType(Needle.AudioSource)`` 查找组件。建议缓存这些引用，因为重复搜索整个场景开销很大。请参阅上面的[查找、添加和移除组件](#finding-adding-and-removing-components)列表。

获取初始场景加载的回调，请参见以下示例：
```js
<needle-engine loadstart="loadingStarted" progress="loadingProgress" loadfinished="loadingFinished"></needle-engine>

<script type="text/javascript">
function loadingStarted() { console.log("START") }
function loadingProgress() { console.log("LOADING...") }
function loadingFinished() { console.log("FINISHED!") }
</script>
```

您也可以订阅全局的 `NeedleEngine`（有时也称为 *ContextRegistry*），以便在 Needle Engine 上下文创建时接收回调，或访问所有可用上下文：
```ts twoslash
class YourComponentType extends Behaviour {}
//---cut---
import { NeedleEngine, GameObject, Behaviour } from "@needle-tools/engine";

NeedleEngine.addContextCreatedCallback((args) => {
  const context = args.context;
  const scene = context.scene;
  const myInstance = GameObject.getComponentInChildren(scene, YourComponentType);
});
```

另一种选择是使用 `onInitialized(ctx => {})` [生命周期钩子](#special-lifecycle-hooks)

您还可以通过 `NeedleEngine.Registered` 访问所有可用上下文，它返回内部数组。（注意：不应修改此数组，但可用于迭代所有活动上下文以修改设置，例如将所有上下文设置为 `context.isPaused = true`）

下面是静态 `NeedleEngine` 类型上的可用事件列表。
您可以通过 `NeedleEngine.registerCallback(ContextEvent.ContextCreated, (args) => {})` 订阅这些事件。

| ContextEvent 选项 | |
|---|---|
| `ContextEvent.ContextRegistered` | 上下文注册到注册表时调用。 |
| `ContextEvent.ContextCreationStart` | 在加载第一个 glb 之前调用，可用于初始化物理引擎。可以返回一个 promise |
| `ContextEvent.ContextCreated` | 在第一帧之前创建上下文时调用 |
| `ContextEvent.ContextDestroyed` | 上下文被销毁时调用 |
| `ContextEvent.MissingCamera` | 上下文找不到相机时调用，目前仅在创建期间调用 |
| `ContextEvent.ContextClearing` | 上下文正在被清除时调用：场景中所有对象正在被销毁，内部状态被重置 |
| `ContextEvent.ContextCleared` | 上下文被清除后调用 |

## Gizmos

静态 `Gizmos` 类可用于绘制线条、形状和文本，主要用于调试。
所有 gizmos 函数都有多种选项，例如颜色或它们应在场景中显示多久。在内部，它们会被缓存和重用。

| Gizmos | |
| -- | -- |
| `Gizmos.DrawLabel` | 绘制带可选背景的标签。可以附加到对象上。返回一个 Label 句柄，可用于更新文本。 |
| `Gizmos.DrawRay` | 在世界空间中取一个原点和方向，绘制一条无限射线 |
| `Gizmos.DrawDirection` | 取一个原点和方向，在世界空间中绘制一个方向 |
| `Gizmos.DrawLine` | 在世界空间中取两个 vec3 点，绘制一条线 |
| `Gizmos.DrawWireSphere` | 在世界空间中绘制线框球体 |
| `Gizmos.DrawSphere` | 在世界空间中绘制实心球体 |
| `Gizmos.DrawWireBox` | 在世界空间中绘制线框盒子 |
| `Gizmos.DrawWireBox3` | 绘制线框 box3 |
| `Gizmos.DrawArrow` | 取世界空间中的两个点，绘制一个箭头 |

## 序列化 / glTF 文件中的组件

为了在 glTF 中嵌入组件并用正确的类型重新创建组件，我们还需要保存非原始类型（所有非 ``Number``、``Boolean`` 或 ``String`` 的类型）。您可以通过在字段或属性上方添加 ``@serializable(<type>)`` 装饰器来实现。

**示例：**
@[code ts twoslash](@code/component-object-reference.ts)

要从自定义格式序列化到自定义格式，可以继承 ``TypeSerializer`` 类并创建一个实例。在构造函数中使用 ``super()`` 注册支持的类型。

> **注意**：除了匹配的字段外，匹配的属性如果与 typescript 文件中的字段匹配，也会被导出。

## 加载场景

在 Unity 中引用的 Prefabs、SceneAssets 和 AssetReferences (Unity 的 Addressable System) 将自动导出为 glTF 文件（请参阅[导出 Prefabs](export.md) 文档）。

这些导出的 gltf 文件将序列化为纯字符串 URI。为了简化从 TypeScript 组件加载这些内容，我们添加了 ``AssetReference`` 类型的概念。它们可以在运行时加载，因此可以延迟加载应用程序的某些部分或加载外部内容。

**示例：**
@[code ts twoslash](@code/component-prefab.ts)

AssetReferences 按 URI 缓存，因此如果您在多个组件/脚本中引用同一个导出的 glTF/Prefab，它只会加载一次然后重用。

# 下一步

Page automatically translated using AI
页面由 AI 自动翻译