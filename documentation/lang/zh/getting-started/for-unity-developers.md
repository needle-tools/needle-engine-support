---
title: 面向 Unity 开发者的脚本编写简介
---

Needle Engine 提供了与 Unity Editor 的紧密集成。这使得开发者和设计师都能在熟悉的环境中协同工作，交付快速、高性能且轻量级的 Web 体验。

以下指南主要面向具有 Unity3D 背景的开发者，但也可能对具有 Web 或 three.js 背景的开发者有所帮助。它涵盖了 Unity 与 three.js 或 Needle Engine 中如何完成任务的话题。

如果您完全不熟悉 Typescript 和 Javascript，并且想深入了解如何为 Needle Engine 编写脚本，那么我们还建议阅读 [Typescript Essentials 指南](./typescript-essentials) 以基本了解 C# 和 Javascript/Typescript 之间的区别。

如果您想跟着编写代码，可以[打开 engine.needle.tools/new](https://engine.needle.tools/new) 来创建一个可以在浏览器中编辑的小项目 ⚡

## 基础知识
Needle Engine 是一个运行在 [three.js](https://threejs.org/) 之上的 3D Web 引擎。Three.js 是 Web 上最流行的基于 WebGL 的 3D 渲染库之一。无论何时我们在 Needle Engine 中提到 `gameObject`，我们*实际上*也在谈论一个 three.js 的 `Object3D`，它是 three.js 中任何对象的基类型。这两个术语可以互换使用。任何 `gameObject` *就是*一个 `Object3D`。

这也意味着——如果您已经熟悉 three.js——使用 Needle Engine 将完全没有问题。所有您可以用 three.js 做的事情，都可以在 Needle Engine 中完成。如果您已经在使用某些库，那么您也可以在基于 Needle Engine 的环境中使用它们。

注意：**Needle Engine 的 Exporter *不会*将您现有的 C# 代码编译到 Web Assembly**。
虽然使用 Web Assembly *可能*会在运行时带来更好的性能，但这会大大牺牲迭代速度和构建 Web 体验的灵活性。请阅读更多关于我们的[愿景](./../vision.md)和[技术概览](./../technical-overview.md)。

:::details 如何使用 Needle Engine 创建新的 Unity 项目？(视频)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />
:::

## 创建组件
在 Unity 中，您通过派生自 `MonoBehaviour` 来创建新组件：
```csharp
using UnityEngine;
public class MyComponent : MonoBehaviour {
}
```

另一方面，Needle Engine 中的自定义组件编写如下：
```ts twoslash
import { Behaviour } from "@needle-tools/engine"
export class MyComponent extends Behaviour {
}
```
## 脚本字段

### serializable
如果您见过一些 Needle Engine 脚本，您可能注意到有些变量的声明上方带有 `@serializable` 注解。这是 Typescript 中的一个 Decorator，可用于修改或注解代码。在 Needle Engine 中，它例如用于让核心序列化了解在从存储在 glTF 中的原始组件信息转换为 Component 实例时，我们期望在脚本中出现哪些类型。
考虑以下示例：
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

class SomeClass extends Behaviour{
    @serializable(Behaviour)
    myOtherComponent?: Behaviour;
    @serializable(Object3D)
    someOtherObject?: Object3D;
}
```
这告诉 Needle Engine，`myOtherComponent` 应该具有 `Behaviour` 类型。然后，当您的场景加载时，它将自动为该字段分配正确的引用。对于 `someOtherObject` 也是如此，我们想将其反序列化为 `Object3D` 引用。

请注意，在某些情况下可以省略类型。对于 Javascript 中的所有[原始类型](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)都可以这样做。这些类型包括 `boolean`、`number`、`bigint`、`string`、`null` 和 `undefined`。
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    @serializable() // < no type is needed here because the field type is a primitive
    myString?: string;
}
```

### public vs private
没有 `private`、`public` 或 `protected` 等访问修饰符的字段，在 javascript 中默认是 `public`
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    /// no accessor means it is public:
    myNumber?: number;
    // explicitly making it private:
    private myPrivateNumber?: number;
    protected myProtectedNumber?: number;
}
```
方法也是如此。

## GameObjects 与场景
要从组件访问当前场景，可以使用 `this.scene`，它等同于 `this.context.scene`，这为您提供了根 three.js 场景对象。

要从组件遍历层级结构，您可以迭代对象的子对象
使用 for 循环：
```ts twoslash
for (let i = 0; i < this.gameObject.children; i++) {
    console.log(this.gameObject.children[i]);
}
```
或者您可以使用 `foreach` 等效写法进行迭代：
```ts twoslash
for (const child of this.gameObject.children) {
    console.log(child);
}
```
您还可以使用 three.js 特定的方法通过 [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse) 方法快速递归遍历所有对象：
```ts twoslash
import { GameObject } from "@needle-tools/engine";
//---cut-before---
this.gameObject.traverse((obj: GameObject) => console.log(obj))
```
或者，要仅遍历可见对象，请改用 [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible)。

另一个相当有用的选项是，当您只想迭代可渲染对象时，您可以查询所有 Renderer 组件并像这样迭代它们：
```ts twoslash
import { Renderer } from "@needle-tools/engine";

for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
有关获取组件的更多信息，请参阅下一节。

## 组件
Needle Engine 大量使用了类似于 Unity 的组件系统。这意味着您可以向场景中的任何 `Object3D` / `GameObject` 添加或移除组件。使用 `addNewComponent(<Object3D>, <ComponentType>)` 时，组件将被注册到引擎。
附加组件的事件方法将由引擎自动调用（例如 `update` 或 `onBeforeRender`）。完整的事件方法列表可在[脚本文档](../scripting.md#lifecycle-methods)中找到。

#### 在场景中查找组件
要获取组件，您可以使用与 Unity 类似的方法。请注意，以下示例使用 `Animator` 类型作为示例，但您也可以使用任何内置或由您创建的组件类型。
| 方法名 | 描述 |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | 获取 GameObject/Object3D 上的 `Animator` 组件。如果对象具有 Animator 组件，它将返回 `Animator` 实例，否则返回 `null`。 |
| `this.gameObject.getComponentInChildren(Animator)` | 获取 GameObject/Object3D 或其任何子对象上的第一个 `Animator` 组件。 |
| `this.gameObject.getComponentsInParents(Animator)` | 获取父级层级结构中（包括当前 GameObject/Object3D）的所有 animator 组件。 |

这些方法也在静态 GameObject 类型上可用。例如，`GameObject.getComponent(this.gameObject, Animator)` 可用于获取传入的 GameObject/Object3D 上的 `Animator` 组件。

要在整个场景中搜索一个或多个组件，可以使用 `GameObject.findObjectOfType(Animator)` 或 `GameObject.findObjectsOfType(Animator)`。

## 重命名的 Unity 类型
我们引擎中的一些 Unity 特定类型被映射到不同的类型名称。请参见以下列表：

| Unity 中的类型 | Needle Engine 中的类型 |  |
| -- | -- | -- |
| `UnityEvent` | `EventList` | UnityEvent 将导出为 `EventList` 类型（使用 `serializable(EventList)` 来反序列化 UnityEvents）。 |
| `GameObject` | `Object3D` |  |
| `Transform` | `Object3D` | 在 three.js 和 Needle Engine 中，GameObject 和 Transform 是相同的（没有 `Transform` 组件）。唯一的例外是当引用 `RectTransform` 时，它在 Needle Engine 中也是一个组件。 |
| `Color` | `RGBAColor` | three.js 的 Color 类型没有 alpha 属性。因此，所有从 Unity 导出的 Color 类型都将导出为 `RGBAColor`，这是一个自定义的 Needle Engine 类型。 |

## Transform
Transform 数据可以直接在 `GameObject` / `Object3D` 上访问。与 Unity 不同，没有额外的 transform 组件来保存这些数据。
- ``this.gameObject.position`` 是局部空间中的 vector3 [位置](https://threejs.org/docs/?q=obj#api/en/core/Object3D.position)。
- ``this.gameObject.worldPosition`` 是世界空间中的 vector3 位置。
- ``this.gameObject.rotation`` 是局部空间中的 [欧拉旋转](https://threejs.org/docs/?q=obj#api/en/core/Object3D.rotation)。
- ``this.gameObject.worldRotation`` 是世界空间中欧拉角形式的欧拉旋转。
- ``this.gameObject.quaternion`` 是局部空间中的 [四元数旋转](https://threejs.org/docs/?q=obj#api/en/core/Object3D.quaternion)。
- ``this.gameObject.worldQuaternion`` 是世界空间中的四元数旋转。
- ``this.gameObject.scale`` 是局部空间中的 vector3 [缩放](https://threejs.org/docs/?q=obj#api/en/core/Object3D.scale)。
- ``this.gameObject.worldScale`` 是世界空间中的 vector3 缩放。

这里需要记住的主要区别是 three.js 中的 `position` 默认是局部空间位置，而在 Unity 中 `position` 是世界空间，并且使用 `localPosition` 来特意使用局部空间位置。下一节将解释如何在 three.js 中获取世界空间位置。

### 世界坐标 - 位置、旋转、缩放...

在 three.js（以及 Needle Engine）中，`object.position`、`object.rotation`、`object.scale` 都是局部空间坐标。这与 Unity 不同，在 Unity 中我们习惯于 `position` 是世界空间，并使用 `localPosition` 来特意使用局部空间位置。

如果您想在 Needle Engine 中访问世界坐标，我们提供了实用方法，您可以用于您的对象。调用 `getWorldPosition(yourObject)` 来计算世界位置。旋转/四元数和缩放也存在类似的方法。要访问这些方法，只需像这样从 Needle Engine 导入它们 `import { getWorldPosition } from "@needle.tools/engine"`

请注意，像 `getWorldPosition`、`getWorldRotation`、`getWorldScale` 这些实用方法内部有一个 Vector3 实例缓冲区，并且仅供本地使用。这意味着您不应该在组件中缓存它们，否则您的缓存值最终会被覆盖。但在您的函数中多次调用 `getWorldPosition` 来进行计算是安全的，无需担心重复使用同一实例。如果您不确定这意味着什么，应该查看 [Typescript Essentials 指南](./typescript-essentials.md#primitive-types) 中的**原始类型**部分。

## 时间
使用 `this.context.time` 来获取时间数据：
- `this.context.time.time` 是应用启动以来经过的时间。
- `this.context.time.deltaTime` 是自上一帧以来经过的时间。
- `this.context.time.frameCount` 是应用启动以来经过的帧数。
- `this.context.time.realtimeSinceStartup` 是应用启动以来未缩放的时间。

也可以使用 `this.context.time.timeScale` 来特意减慢时间，例如用于慢动作效果。

## 光线投射 (Raycasting)
使用 ``this.context.physics.raycast()`` 执行光线投射并获取交集列表。如果您不传入任何选项，光线投射将使用当前激活的 `mainCamera` 从屏幕空间中的鼠标位置（或第一个触摸位置）执行。您也可以传入一个 `RaycastOptions` 对象，该对象包含各种设置，例如 `maxDistance`、要使用的相机或要测试的层。

使用 ``this.context.physics.raycastFromRay(your_ray)`` 使用 [three.js ray](https://threejs.org/docs/#api/en/math/Ray) 执行光线投射。

请注意，默认情况下，上述调用是对可见场景对象进行光线投射。这与 Unity 不同，在 Unity 中您总是需要 colliders 才能击中对象。three.js 的默认解决方案既有优点也有缺点，其中一个主要缺点是根据您的场景几何体，它的性能可能相当慢。对 SkinnedMeshRenderers 进行光线投射时尤其慢。因此，通常建议将 Unity 中带有 SkinnedMeshRenderers 的对象设置为 `Ignore Raycast` 层，Needle Engine 默认也会忽略它们。

另一个选项是使用物理光线投射方法，该方法将只返回与场景中的 colliders 的碰撞。

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

这是一个可编辑的[物理光线投射示例](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)。

## 输入 (Input)
使用 ``this.context.input`` 轮询输入状态：

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update(){
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN")
        }
    }
}
```

您还可以像这样订阅 `InputEvents` 枚举中的事件：
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable(){
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }
    onDisable() {
        // it is recommended to also unsubscribe from events when your component becomes inactive
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    inputPointerDown = (evt: NEPointerEvent) => { console.log(evt); }
}
```

如果您想自己处理输入，您也可以订阅[浏览器提供的所有事件](https://developer.mozilla.org/en-US/docs/Web/Events)（有很多）。例如，要订阅浏览器的 click 事件，您可以这样写：
```ts twoslash
window.addEventListener("click", () => { console.log("MOUSE CLICK"); });
```
请注意，在这种情况下，您必须自己处理所有情况。例如，如果您的用户在桌面、移动设备或 VR 设备上访问您的网站，您可能需要使用不同的事件。Needle Engine 输入事件会自动处理这些情况（例如，`PointerDown` 会针对鼠标按下、触摸按下以及 VR 控制器按钮按下而触发）。

## InputSystem 回调
类似于 Unity（参见 [Unity 中的 IPointerClickHandler](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html)），您也可以注册以在组件自身上接收输入事件。

```ts twoslash
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class ReceiveClickEvent extends Behaviour {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```

所有组件可用的 pointer 事件：
- `onPointerDown`
- `onPointerUp`
- `onPointerEnter`
- `onPointerMove`
- `onPointerExit`
- `onPointerClick`

所有事件都有一个 `PointerEventData` 参数来描述事件。

## Debug.Log
javascript 中的 `Debug.Log()` 等效写法是 `console.log()`。您也可以使用 `console.warn()` 或 `console.error()`。
```ts twoslash
import { GameObject, Renderer } from "@needle-tools/engine";
const someVariable = 42;
// ---cut-before---

console.log("Hello web");
// 您可以传入任意数量的参数，如下所示：
console.log("Hello", someVariable, GameObject.findObjectOfType(Renderer), this.context);
```

## Gizmos
在 Unity 中，您通常需要使用特殊方法来绘制 Gizmos，例如 `OnDrawGizmos` 或 `OnDrawGizmosSelected`。而在 Needle Engine 中，不存在这样的方法，您可以在脚本中的任何地方自由绘制 gizmos。请注意，此时也有责任 *不* 在例如您部署的 Web 应用中绘制它们（您只需通过 `if(isDevEnvironment))"` 进行过滤）。

这是一个示例，用于绘制一个红色线框球体，持续一秒钟，例如用于可视化世界空间中的一个点。
```ts twoslash
import { Vector3 } from "three";
const hit = { point: new Vector3(0, 0, 0) };
// ---cut-before---
import { Gizmos } from "@needle-tools/engine";
Gizmos.DrawWireSphere(hit.point, 0.05, 0xff0000, 1);
```
以下是一些可用的 gizmo 方法：
| 方法名 |  |
| --- | --- |
| `Gizmos.DrawArrow` |  |
| `Gizmos.DrawBox` |  |
| `Gizmos.DrawBox3` |  |
| `Gizmos.DrawDirection` |  |
| `Gizmos.DrawLine` |  |
| `Gizmos.DrawRay` |  |
| `Gizmos.DrawRay` |  |
| `Gizmos.DrawSphere` |  |
| `Gizmos.DrawWireSphere` |  |

## 有用的实用方法

从 `@needle-tools/engine` 导入，例如 `import { getParam } from "@needle-tools/engine"`

| 方法名 | 描述 |
| --- | --- |
| `getParam()` | 检查 URL 参数是否存在。如果存在但没有值（例如 `?help`），返回 true；如果 URL 中未找到或设置为 0（例如 `?help=0`），返回 false；否则返回其值（例如 `?message=test`）。 |
| `isMobileDevice()` | 如果应用从移动设备访问，返回 true。 |
| `isDevEnvironment()` | 如果当前应用在本地服务器上运行，返回 true。 |
| `isMozillaXR()` |  |
| `isiOS` |  |
| `isSafari` |  |

```ts twoslash
import { isMobileDevice } from "@needle-tools/engine"
if( isMobileDevice() )
```

```ts twoslash
import { getParam } from "@needle-tools/engine"
// returns true
const myFlag = getParam("some_flag")
console.log(myFlag)
```

## Web 项目
在 C# 中，您通常使用包含一个或多个项目的解决方案。在 Unity 中，这个解决方案由 Unity 管理，当您打开 C# 脚本时，它会打开项目并显示文件。
您通常使用 Unity 的内置包管理器安装包，以添加由 Unity 或其他开发者（来自您的团队，或例如通过 Unity 的 AssetStore）提供的功能。Unity 在使添加和管理包变得容易方面做得很好，您可能从未需要手动编辑像 `manifest.json` 这样的文件（这是 Unity 用来跟踪安装了哪些包的文件），或者从命令行运行命令来安装包。

在 Web 环境中，您使用 `npm` - Node 包管理器 - 来为您管理依赖项/包。它的基本作用与 Unity 的 PackageManager 相同 - 它从*某个*服务器（在这种上下文中通常称为 *registry*）安装（下载）包，并将它们放在一个名为 `node_modules` 的文件夹中。

在使用 Web 项目时，您的大部分依赖项都是从 [npmjs.com](https://npmjs.com/) 安装的。它是 Web 项目中最流行的包 registry。

这是一个 package.json 可能看起来像的示例：
```json
{
  "name": "@optional_org/package_name",
  "version": "1.0.0",
  "scripts": {
    "start": "vite --host"
  },
  "dependencies": {
	  "@needle-tools/engine": "^3.5.9-beta",
	  "three": "npm:@needle-tools/three@0.146.8"
	},
  "devDependencies": {
	  "@types/three": "0.146.0",
	  "@vitejs/plugin-basic-ssl": "^1.0.1",
	  "typescript": "^5.0.4",
	  "vite": "^4.3.4",
	  "vite-plugin-compression": "^0.5.1"
	}
}
```

我们的默认模板使用 Vite 作为其打包器，并且没有预装任何前端框架。Needle Engine 对使用哪个前端框架没有偏好，因此您可以自由选择任何喜欢的框架。我们为 Vue.js、Svelte、Next.js、React 或 React Three Fiber 等流行框架提供了示例。

## 安装包和依赖项
要从 npm 安装依赖项，您可以在命令行（或终端）中打开您的 Web 项目，然后运行 `npm i <the/package_name>`（`npm install` 的缩写）。
例如，运行 `npm i @needle-tools/engine` 来安装 [Needle Engine](https://www.npmjs.com/package/@needle-tools/engine)。这将把该包添加到您的 `package.json` 的 `dependencies` 数组中。
要仅将包作为 devDependency 安装，可以运行 `npm i --save-dev <package_name>`。下面将详细介绍 dependencies 和 devDependencies 的区别。

### 'dependencies' 和 'devDependencies' 有什么区别？
您可能注意到有两个包含 *dependency* 的条目 - `dependencies` 和 `devDependencies`。

`dependencies` **总是被安装**（或打包），无论何时您的 Web 项目被安装，或者当您开发库并且您的包作为另一个项目的依赖项安装时。

`devDependencies` **仅**在开发项目时安装（意味着当您直接在特定目录中运行 `install` 时），否则它们**不会**包含在您的项目中。

### 如何安装其他包或依赖项以及如何使用它？
[安装](#installing-packages--dependencies)部分告诉我们，您可以通过在项目目录中运行 `npm i <package_name>` 来安装依赖项，其中 `package_name` 可以是您在 [npm.js](https://npmjs.org) 上找到的任何包。

假设您想向项目中添加一个 tweening 库。我们将使用 [`@tweenjs/tween.js`](https://www.npmjs.com/package/@tweenjs/tween.js) 作为示例。[这里](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts) 是最终项目，如果您想跳到前面只看结果的话。

首先在终端中运行 `npm install @tweenjs/tween.js` 并等待安装完成。这将在我们的 package.json 中添加一个新条目：
```json
"dependencies": {
    "@needle-tools/engine": "^3.5.11-beta",
    "@tweenjs/tween.js": "^20.0.3",
    "three": "npm:@needle-tools/three@0.146.8"
}
```

然后打开您想使用 tweening 的脚本文件之一，并在文件顶部导入：
```ts twoslash
import * as TWEEN from '@tweenjs/tween.js';
```
请注意，我们在这里通过写入 `* as TWEEN` 来导入库中的所有类型。我们也可以只导入特定类型，例如 `import { Tween } from @tweenjs/tween.js`。

现在我们可以在脚本中使用它了。始终建议参考您想使用的库的文档。在 tween.js 的情况下，他们提供了可以遵循的[用户指南](https://github.com/tweenjs/tween.js/blob/HEAD/docs/user_guide.md)。通常，包在 npm 上的 Readme 页面包含有关如何安装和使用包的信息。

要旋转一个立方体，我们创建一个名为 `TweenRotation` 的新组件类型，然后我们继续为对象旋转、重复次数、要使用的缓动函数以及我们想要执行的 tween 创建 tween 实例，然后启动它。然后我们只需每帧调用 `update` 来更新 tween 动画。最终脚本如下所示：
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
import * as TWEEN from '@tweenjs/tween.js';

export class TweenRotation extends Behaviour {

    // save the instance of our tweener
    private _tween?: TWEEN.Tween<any>;

    start() {
        const rotation = this.gameObject.rotation;
        // create the tween instance
        this._tween = new TWEEN.Tween(rotation);
        // set it to repeat forever
        this._tween.repeat(Infinity);
        // set the easing to use
        this._tween.easing(TWEEN.Easing.Quintic.InOut);
        // set the values to tween
        this._tween.to({ y: Math.PI * 0.5 }, 1000);
        // start it
        this._tween.start();
    }

    update() {
        // update the tweening every frame
        // the '?' is a shorthand for checking if _tween has been created
        this._tween?.update();
    }
}
```
现在我们只需将其添加到场景中的任何对象上，即可使它们永远旋转。
您可以在[这里](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts)查看最终脚本的实际效果。


# 学习更多

- [Needle Engine 中的脚本编写](../scripting)
- [Typescript Essentials](./typescript-essentials.md)
- [组件参考](../component-reference.md)

页面自动翻译使用 AI