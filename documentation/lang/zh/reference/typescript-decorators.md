---
title: "@serializable" 和其他装饰器
---

下表包含 Needle Engine 提供的可用 Typescript 装饰器。

（如果您熟悉 C#）您可以将它们视为 Attributes 的增强版——它们可以添加到 Typescript 的类、字段或方法中，以提供附加功能。

|                               |                                                                                                                                                                                                   |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **字段与属性装饰器**          |                                                                                                                                                                                                   |
| `@serializable()`             | 添加到暴露的 / 序列化的字段。用于加载从 Unity 或 Blender 导出并包含组件的 glTF 文件时。                                                                                                           |
| `@syncField()`                | 添加到字段，以便在值更改时进行网络同步。您可以传入一个方法，在字段更改时被调用。                                                                                                                          |
| `@validate()`                 | 添加以在组件事件方法 `onValidate` 中接收回调，每当值更改时都会触发。这类似于 Unity 的 onValidate 的行为。                                                                                              |
| **方法装饰器**                |                                                                                                                                                                                                   |
| `@prefix(<type>)` (实验性)    | 可用于轻松将自定义代码注入其他组件。可选地返回 `false` 以阻止原方法执行。参见[下面的示例](#prefix)。                                                                                             |
| **类装饰器**                  |                                                                                             --------------------------------------------------------------------------------------------------------- |
| `@registerType`               | 无参数。可添加到自定义组件类，以注册到 Needle Engine 类型并启用热重载支持。                                                                                                                      |

## 示例

### Serializable

```ts twoslash
import { Behaviour, serializable, EventList } from "@needle-tools/engine";
import { Object3D } from "three";

export class SomeComponentType extends Behaviour {}

export class ButtonObject extends Behaviour {
    // 如果是基本类型，可以省略类型
    // 例如 Number, String 或 Bool
    @serializable()
    myNumber: number = 42;

    // 否则添加您想要序列化到的具体类型
    @serializable(EventList)
    onClick?: EventList;

    @serializable(SomeComponentType)
    myComponent?: SomeComponentType;

    // 注意对于数组，您仍然添加具体类型（而不是数组类型）
    @serializable(Object3D)
    myObjects?: Object3D[];
}
```

### SyncField

`@syncField` 装饰器可用于自动同步组件的属性，使其对连接到同一网络房间的所有用户（网站访问者）可见。它可以选择接受一个回调函数，该函数将在值发生更改时被调用。

*   要通知系统引用值（如对象或数组）已更改，您需要重新赋值该字段。例如：`myField = myField`
*   回调函数*不能*是箭头函数（例如，`MyScript.prototype.onNumberChanged` 对 `onNumberChanged() { ... }` 有效，但对 `myNumberChanged = () => { ... }` 无效）

```ts twoslash
import { Behaviour, serializable, syncField } from "@needle-tools/engine";

export class MyScript extends Behaviour {

    @syncField(MyScript.prototype.onNumberChanged)
    @serializable()
    myNumber: number = 42;

    private onNumberChanged(newValue: number, oldValue: number){
        console.log("Number changed from ", oldValue, "to", newValue)
    }
}
```

### Validate

```ts twoslash
import { Behaviour, serializable, validate } from "@needle-tools/engine";

export class MyScript extends Behaviour {

    @validate()
    @serializable()
    myNumber?: number;

    start() { setInterval(() => this.myNumber = Math.random(), 1000) }

    onValidate(fieldName: string) {
        console.log("Validate", fieldName, this.myNumber);
    }
}
```

### Prefix

[在线示例](https://stackblitz.com/edit/needle-engine-prefix-example?file=src%2Fmain.ts)

```ts twoslash
import { Camera, prefix } from "@needle-tools/engine";
class YourClass {
    @prefix(Camera) // < 这是包含您想要更改的方法的类型
    awake() { // < 这是您想要更改的方法名称

        // 这现在将在 Camera.awake 方法运行之前被调用
        // 注意：此时 `this` 指代的是 Camera 实例，而不是 `YourClass`。这允许您访问组件的内部状态
        console.log("Hello camera:", this)
        // 如果您想阻止默认行为，可选地返回 false
    }
}
```


---
Page automatically translated using AI
页面由 AI 自动翻译