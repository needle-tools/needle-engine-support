---
title: 在 Needle Engine 中编写脚本
description: Typescript、Javascript 和 C# 的区别、相似点和关键概念。
sidebarDepth: 2
---

以下指南旨在强调 C#、Javascript 和 Typescript 之间的一些主要区别。这对于刚接触 Web 生态系统的开发者最有用。

以下是一些学习如何编写 Typescript 的有用资源：

- [Typescript Tutorial](https://www.typescripttutorial.net/)
- [Learn Typescript](https://www.tutorialsteacher.com/typescript)
- [Typescript Documentation](https://www.typescriptlang.org/docs/)

### C#、Javascript 或 Typescript 之间的主要区别

**CSharp** 或 **C#** 是一种静态类型和编译型语言。这意味着在你的代码可以运行（或执行）**之前**，它必须被编译——转换——成 IL 或 CIL，这是一种更接近*机器码*的中间语言。这里需要理解的重要一点是，你的代码会被分析，并且必须通过编译器**强制执行**的某些检查和规则。如果你编写违反 C# 语言任何规则的代码，你将会在 **Unity 中**收到编译错误，并且你的应用程序甚至不会开始运行。存在编译错误时，你将无法进入 Play-Mode。

另一方面，**Javascript** 在运行时被解释。这意味着你可以编写无效代码并导致错误——但你不会*直到你的程序运行*或尝试**执行**包含错误的那一行时才会看到这些错误。例如，你可以编写 `var points = 100; points += "hello world";`，并且在浏览器中运行代码**之前**没有人会抱怨。

**Typescript** 是由 Microsoft 设计的一种语言，它**编译成 javascript**。
它增加了许多特性，例如**类型安全**。这意味着当你用 Typescript 编写代码时，你*可以*声明类型，因此当你尝试进行例如无效的赋值或使用非预期类型调用方法时，会在*编译时*收到错误。请在下面阅读更多关于 Javascript 和 Typescript 中的类型信息。

### 类型——或缺乏类型

（截至目前）**原生 Javascript** **没有**任何*类型*的概念：你声明为 `let points = 100` 的变量不能保证在应用程序后面仍然是*数字*。这意味着在 Javascript 中，后面代码中将 `points = new Vector3(100, 0, 0);` 或甚至 `points = null` 或 `points = myRandomObject`——你懂的——赋值给 `points` 是完全有效的代码。在你编写代码时这一切都是正常的，**但是**当你的代码执行时，它可能会崩溃，因为你后面写了 `points -= 1`，而**现在**当你的应用程序已经在运行时，你会在浏览器中收到错误。

如上所述，创建 **Typescript** 是为了通过添加定义类型的语法来帮助解决这个问题。

理解这一点很重要：当你编写 Typescript 时，你*基本上*仍然在编写 Javascript。虽然通过例如在错误行上方添加 ``//@ts-ignore`` 或将所有类型定义为 ``any`` *可以*绕过所有类型检查和安全检查，但这**绝对不推荐**。类型的存在是为了帮助你在错误实际发生之前找到它们。你真的不希望将网站部署到服务器后，才收到来自用户或访问者的报告，告诉你应用程序在运行时崩溃了。

虽然*原生 Javascript*不提供类型，你仍然可以通过使用 **[JSDoc](https://jsdoc.app/)** 来为你的 javascript 变量、类和方法添加类型注释。

### 变量

在 C# 中，你使用类型或 `var` 关键字来编写变量。
例如，你可以编写 `int points = 100;`
或者，你可以使用 `var` 让编译器为你确定正确的类型：`var points = 100`

在 Javascript 或 Typescript 中，你有两种现代选项来声明变量。
对于你计划重新赋值的变量，使用 `let`，例如 `let points = 100;`
对于你不希望能够重新赋值的变量，使用 `const`，例如 `const points = 100;`
> *注意 var*
  你可能也会在 javascript 中遇到 `var` 关键字，但不推荐使用它，并且它的现代替代方案是 `let`。了解更多关于 [var vs let](https://stackoverflow.com/a/11444416)。

请注意，如果变量（例如）是自定义类型，你仍然可以为用 const 声明的变量赋值。考虑以下示例：

```ts twoslash
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition.x = 100; // Assigning x is perfectly fine
```
上面的代码是完全正常的 Typescript 代码，因为你没有重新赋值 `myPosition`，只是赋值了 `myPosition` 的 `x` 成员。另一方面，以下示例将**不**被允许并导致运行时或 typescript 错误：
```ts twoslash
// @errors: 2588
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition = new Vector3(100, 0, 0); // ⚠ ASSIGNING TO CONST IS NOT ALLOWED
```

### 使用或导入类型

在 Unity 中，你通常在代码顶部添加 `using` 语句来导入项目中引用的程序集中的特定命名空间，或者在某些情况下，你可能会导入命名空间中具有特定名称的特定类型。
请看以下示例：
```csharp
using UnityEngine;
// importing just a specific type and giving it a name
using MonoBehaviour = UnityEngine.MonoBehaviour;
```

在 Typescript 中以同样的方式从包中导入特定类型：
```ts twoslash
import { Vector3 } from 'three';
import { Behaviour } from '@needle-tools/engine';
```

你*可以*通过给特定包指定名称来导入该包中的所有类型，你可能会在某些地方看到这种用法：
```ts twoslash
import * as THREE from 'three';
const myVector : THREE.Vector3 = new THREE.Vector3(1, 2, 3);
```

### 基本类型
*Vector2, Vector3, Vector4...*
如果你有 C# 背景，你可能熟悉类和结构体之间的区别。类是引用类型，而结构体是自定义值类型。这意味着，根据上下文，它会被分配到栈上，并且当作为参数传递给方法时，默认会创建一个副本。
考虑以下 C# 示例：

```csharp
void MyCallerMethod(){
    var position = new Vector3(0,0,0);
    MyExampleVectorMethod(position);
    UnityEngine.Debug.Log("Position.x is " + position.x); // Here x will be 0
}
void MyExampleVectorMethod(Vector3 position){
    position.x = 42;
}
```

调用了一个方法，传入了一个名为 position 的 Vector3。在该方法内部，传入的 vector `position` 被修改：x 被设置为 42。但在 C# 中，传入该方法的原始 vector（参见第 2 行）**没有**改变，x 将**仍然**是 0（第 4 行）。

这对于 Javascript/Typescript 来说不是真的。这里我们没有自定义值类型，这意味着如果你在 Needle Engine 或 three.js 中遇到 Vector，你将始终拥有一个引用类型。
考虑以下 Typescript 示例：
```ts twoslash
import { Vector3 } from 'three'

function myCallerMethod() : void {
    const position = new Vector3(0,0,0);
    myExampleVectorMethod(position);
    console.log("Position.x is " + position.x); // Here x will be 42
}
function myExampleVectorMethod(position: Vector3) : void {
    position.x = 42;
}
```
你看到区别了吗？因为 vectors 和所有自定义对象实际上*是*引用类型，所以我们将修改原始的 `position` 变量（第 3 行），并且 x 现在是 42。

这不仅在理解方法时很重要，在处理变量时也很重要。
在 C# 中，以下代码将产生两个 Vector3 实例，改变其中一个不会影响另一个：
```csharp
var myVector = new Vector3(1,1,1);
var myOtherVector = myVector;
myOtherVector.x = 42;
// will log: 1, 42
UnityEngine.Debug.Log(myVector.x + ", " + myOtherVector.x);
```
如果你在 Typescript 中做同样的事情，你将**不**会创建一个副本，而是获得对同一个 `myVector` 实例的引用：
```ts twoslash
import { Vector3 } from 'three'

const myVector = new Vector3(1,1,1);
const myOtherVector = myVector;
myOtherVector.x = 42;
// will log: 42, 42
console.log(myVector.x, myOtherVector.x);
```

### Vector 运算和运算符

虽然在 C# 中可以使用运算符重载，但很遗憾 Javascript 中没有此功能。这意味着虽然你可以在 C# 中像这样乘一个 Vector3：

```csharp
var myFirstVector = new Vector3(1,1,1);
var myFactor = 100f;
myFirstVector *= myFactor;
// → myFirstVector is now 100, 100, 100
```

你必须使用 Vector3 类型上的一个方法来达到同样的结果（只是需要多写一点样板代码）

```ts twoslash
import { Vector3 } from "three"

const myFirstVector : Vector3 = new Vector3(1, 1, 1)
const myFactor = 100;
myFirstVector.multiplyScalar(myFactor);
// → myFirstVector is now 100, 100, 100
```

### 相等检查

#### 宽松比较 vs 严格比较
在 C# 中，当你想检查两个变量是否相同时，可以写成这样：
```csharp
var playerIsNull = myPlayer == null;
```
在 Javascript/Typescript 中，`==` 和 `===` 之间有区别，其中 `===` 会更严格地检查类型：
```ts twoslash
const myPlayer: any = null;
// ---cut-before---
const playerIsNull = myPlayer === null;
const playerIsNullOrUndefined = myPlayer == null;
```
你注意到第二个变量 `playerIsNullOrUndefined` 使用了 `==`，它进行宽松相等检查，在这种情况下，`null` 和 `undefined` 都将在此处导致 `true`。你可以[在这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)阅读更多相关信息。

### 事件、绑定和 `this`

在 C# 中订阅事件时，你可以这样做：
```csharp
// this is how an event is declared
event Action MyEvent;
// you subscribe by adding to (or removing from)
void OnEnable() {
    MyEvent += OnMyEvent;
}
void OnDisable() {
    MyEvent -= OnMyEvent;
}
void OnMyEvent() {}
```
在 Typescript 和 Javascript 中，当你向列表中添加方法时，必须“绑定 this”。这基本上意味着你创建一个方法，其中明确地将 `this` 设置为（通常是）你当前的类实例。有两种方法可以实现这一点。

请注意，这里我们使用了 `EventList` 类型，它是 Needle Engine 中用于声明事件的类型（当你将它们与我们的编辑器集成一起使用时，EventList 也会自动转换为 UnityEvent 和/或 Blender 中的事件列表）。

实现此目的的简短且**推荐**的语法是使用[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)。

```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent!: EventList;

    onEnable() {
        this.myEvent.addEventListener(this.onMyEvent);
    }

    onDisable() {
        this.myEvent.removeEventListener(this.onMyEvent);
    }

    // Declaring the function as an arrow function to automatically bind `this`
    private onMyEvent = () => {
        console.log(this !== undefined, this)
    }
}
```
还有一种更详细的“经典”方法来实现同样的目的，即手动绑定 this（并将方法保存在变量中，以便稍后从事件列表中移除）：
```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent?: EventList;

    private _onMyEventFn?: Function;

    onEnable() {
        // bind this
        this._onMyEventFn = this.myEvent.bind(this);
        // add the bound method to the event
        this.myEvent?.addEventListener(this._onMyEventFn);
    }

    onDisable() {
        this.myEvent?.removeEventListener(this._onMyEventFn);
    }

    // Declaring the function as an arrow function to automatically bind `this`
    private onMyEvent = () => { }
}
```

## 接下来做什么？

- [Needle Engine Scripting](/scripting.md)


___
页面由人工智能自动翻译