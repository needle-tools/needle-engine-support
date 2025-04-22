---
title: 自动生成组件
tags:
  - codegen
  - components
  - unity
  - blender
  - editor
  - typescript
  - csharp
---

### 自动生成 Editor 组件

在使用 Unity 或 Blender 时，你会注意到当你用 Typescript 或 Javascript 创建一个新的 Needle Engine 组件时，它会自动为你生成一个 Unity C# stub 组件或者一个 Blender 面板。

这要归功于 [Needle component compiler](https://www.npmjs.com/package/@needle-tools/needle-component-compiler) 的魔力，它在 editor 环境中在后台运行，并监视你的脚本文件的变化。当它检测到你创建了一个新的 Needle Engine 组件时，它就会生成正确的 Unity 组件或 Blender 面板，包括你可以从 Editor 中设置或链接的公共变量或属性。



### 控制组件生成
你可以在你的 typescript 代码中使用以下注释来控制 C# 代码生成行为：
| Attribute | Result |
| -- | -- |
| `// @generate-component` | 强制生成下一个类 |
| `// @dont-generate-component` | 禁用生成下一个类，当你项目中已经存在一个 C# 脚本时这很有用 |
| `// @serializeField` | 用 `[SerializeField]` 装饰生成的字段 |
| `// @type UnityEngine.Camera` | 指定生成的 C# 字段类型 |
| `// @nonSerialized` | 跳过生成下一个字段或方法 |

#### 示例

强制 component compiler 生成一个名为 `myAudioClip` 的 C# AudioClip 字段
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
	//@type UnityEngine.AudioClip
	@serializable()
	myAudioClip?: string;
}

```

强制 component compiler 从特定的子类派生
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyCustomBaseClass extends Behaviour { /* ... */ }
// ---cut-before---
//@type MyNamespace.MyCustomBaseClass
export class MyComponent extends MyCustomBaseClass {
}
```


### Unity 中的 Component Compiler
如果你想在项目的 ``src/scripts`` 文件夹中添加脚本，你需要在带有 ``ExportInfo`` 组件的 GameObject 上添加一个 ``Component Generator``。
现在，当你在 ``your/threejs/project/src/scripts`` 中添加新组件时，它会自动在 `Assets/Needle/Components.codegen` 中生成 Unity 脚本。
如果你想将脚本添加到任何 NpmDef 文件中，你可以直接创建它们 - 每个 NpmDef 都会自动监视脚本变化并处理组件生成，所以你不需要在场景中添加任何额外的组件。

对于 C# 字段的正确生成，目前重要的是你要明确声明 Typescript 类型。例如 ``myField : number = 5``

你可以使用下面的选项卡在 **Typescript** 输入和生成的 **C#** stub 组件之间切换
:::: code-group
::: code-group-item Typescript
```ts twoslash
import { AssetReference, Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

export class MyCustomComponent extends Behaviour {
    @serializable()
    myFloatValue: number = 42;

    @serializable(Object3D)
    myOtherObject?: Object3D;

    @serializable(AssetReference)
    prefabs: AssetReference[] = [];

    start() {
        this.sayHello();
    }

    private sayHello() {
        console.log("Hello World", this);
    }
}
```
:::
::: code-group-item Generated C#
```csharp
// NEEDLE_CODEGEN_START
// auto generated code - do not edit directly

#pragma warning disable

namespace Needle.Typescript.GeneratedComponents
{
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{
		public float @myFloatValue = 42f;
		public UnityEngine.Transform @myOtherObject;
		public UnityEngine.Transform[] @prefabs = new UnityEngine.Transform[]{ };
		public void start(){}
		public void update(){}
	}
}

// NEEDLE_CODEGEN_END
```
:::
::: code-group-item Extending Generated C#
```csharp
using UnityEditor;

// you can add code above or below the NEEDLE_CODEGEN_ blocks

// NEEDLE_CODEGEN_START
// auto generated code - do not edit directly

#pragma warning disable

namespace Needle.Typescript.GeneratedComponents
{
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{
		public float @myFloatValue = 42f;
		public UnityEngine.Transform @myOtherObject;
		public UnityEngine.Transform[] @prefabs = new UnityEngine.Transform[]{ };
		public void start(){}
		public void update(){}
	}
}

// NEEDLE_CODEGEN_END

namespace Needle.Typescript.GeneratedComponents
{
    // This is how you extend the generated component (namespace and class name must match!)
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{
		
		public void MyAdditionalMethod()
		{
		}

		private void OnValidate()
		{
			myFloatValue = 42;
		}
	}

    // of course you can also add custom editors
	[CustomEditor(typeof(MyCustomComponent))]
	public class MyCustomComponentEditor : Editor
	{
		public override void OnInspectorGUI()
		{
			EditorGUILayout.HelpBox("This is my sample component", MessageType.None);
			base.OnInspectorGUI();
		}
	}
}

```
:::
::::


### 扩展生成的组件
组件的 C# 类是使用 [`partial`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods) 标志生成的，这样可以方便地扩展其功能。这对于绘制 gizmos、添加上下文菜单或添加不属于内置组件的其他字段或方法很有帮助。


:::tip 成员命名
导出的成员将以小写字母开头。例如，如果你的 C# 成员命名为 ``MyString``，它将被赋值给 ``myString``。
:::


Page automatically translated using AI
页面由 AI 自动翻译