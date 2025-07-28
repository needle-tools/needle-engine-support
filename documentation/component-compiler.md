---
title: Automatic Component Generation
tags:
  - codegen
  - components
  - unity
  - blender
  - editor
  - typescript
  - csharp
---

## Automatically generating Editor components

When working in Unity or Blender then you will notice that when you create a new Needle Engine component in Typescript or Javascript it will automatically generate a Unity C# stub component OR a Blender panel for you.  

This is thanks to the magic of the [Needle component compiler](https://www.npmjs.com/package/@needle-tools/needle-component-compiler) that runs behind the scenes in an editor environment and watches changes to your script files. When it notices that you created a new Needle Engine component, it will then generate a stub Unity component or Blender panel. This component includes public variables, properties and methods, that you can then set from within the Editor. You can also wire up events to methods in your components.


**Note**: The component compiler currently **only generates components**. You can reference custom classes and types (like ScriptableObjects or enums), but you need to make sure that the class exists in both C# and TypeScript with a matching name.


## Component Compiler in Unity
If you want to add scripts inside the ``src/scripts`` folder in your project then you need to have a ``Component Generator`` on the GameObject with your ``ExportInfo`` component.  
Now when adding new components in ``your/threejs/project/src/scripts``it will automatically generate Unity scripts in `Assets/Needle/Components.codegen`.  
If you want to add scripts to any NpmDef file you can just create them - each NpmDef automatically watches script changes and handles component generation, so you don't need any additional component in your scene.

For C# fields to be correctly generated, it is important that you declare a Typescript type. The types can either be basic types like `number`, `string`, `boolean`, or custom classes. Custom classes need to be available in the Unity project as well.

Here is an example. The TypeScript file is what has been placed in `src/scripts/MyCustomComponent.ts`. The component compiler automatically generates the C# stub component.

::: code-tabs
@tab Typescript
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
@tab Generated CSharp
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
@tab Extending the generated component
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
    // Extend the generated component (namespace and class name must match!)
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{
		public void MyAdditionalMethod() { /* ... */ }
		private void OnValidate() { myFloatValue = 42; }
	}

    // Of course you can also add custom editors
	[CustomEditor(typeof(MyCustomComponent))]
	public class MyCustomComponentEditor : Editor
	{
		public override void OnInspectorGUI()
		{
			EditorGUILayout.HelpBox("This is my sample component", MessageType.None);
			DrawDefaultInspector();
		}
	}
}
```
:::

## Extending generated components
The generated C# classes for components are generated with the [`partial`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods) flag so that it is easy to extend them with functionality. This is helpful to draw gizmos, add context menus or add additional fields or methods that are not part of a built-in component.

See the code tabs above for an example of how to extend the generated component. You can add custom methods, properties, or even custom editors for your component. Just make sure to add code outside the `// NEEDLE_CODEGEN_` blocks so that it does not get overwritten by the component compiler.

:::tip Member Casing
Exported members will start with a lowercase letter. For example if your C# member is named ``MyString`` it will be assigned to ``myString``.
:::

## Controlling component generation
You can use the following comments in your typescript code to control C# code generation behavior:  
| Attribute | Result |
| -- | -- |
| `// @generate-component` | Force generation of next class|
| `// @dont-generate-component` | Disable generation of next class, this is useful in cases where you already have an existing C# script in your project |
| `// @serializeField` | Decorate generated field with `[SerializeField]` |
| `// @type UnityEngine.Camera` | Specify generated C# field type |
| `// @nonSerialized` | Skip generating the next field or method |

### Examples

Force the component compiler to generate a C# AudioClip field named `myAudioClip`
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
	//@type UnityEngine.AudioClip
	@serializable()
	myAudioClip?: string;
}

```

Force the component compiler to derive from a specific subclass
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyCustomBaseClass extends Behaviour { /* ... */ }
// ---cut-before---
//@type MyNamespace.MyCustomBaseClass
export class MyComponent extends MyCustomBaseClass {
}
```
