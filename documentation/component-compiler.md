---
title: Automatic Component Generation
---

### Automatically generating Editor components :tags codegen

When working in Unity or Blender then you will notice that when you create a new Needle Engine component in Typescript or Javascript it will automatically generate a Unity C# stub component OR a Blender panel for you.

This is thanks to the magic of the [Needle component compiler](https://www.npmjs.com/package/@needle-tools/needle-component-compiler) that runs behind the scenes in an editor environment and watches changes to your script files. When it notices that you created a new Needle Engine component it will then generate the correct Unity component or Blender panel including public variables or properties that you can then set or link from within the Editor.



### Controlling component generation :tags codegen
You can use the following comments in your typescript code to control C# code generation behavior:  
| Attribute | Result |
| -- | -- |
| `// @generate-component` | Force generation of next class|
| `// @dont-generate-component` | Disable generation of next class, this is useful in cases where you already have an existing C# script in your project |
| `// @serializeField` | Decorate generated field with `[SerializeField]` |
| `// @type UnityEngine.Camera` | Specify generated C# field type |
| `// @nonSerialized` | Skip generating the next field or method |

#### Examples

Force the component compiler to generate a C# AudioClip field named `myAudioClip`
```ts
export class MyComponent extends Behaviour {
	//@type UnityEngine.AudioClip
	@serializable()
	myAudioClip?:string;
}
```

Force the component compiler to derive from a specific subclass
```ts
//@type MyNamespace.MyCustomBaseClass
export class MyComponent extends MyCustomBaseClass {
}
```


### Component Compiler in Unity
If you want to add scripts inside the ``src/scripts`` folder in your project then you need to have a ``Component Generator`` on the GameObject with your ``ExportInfo`` component.  
Now when adding new components in ``your/threejs/project/src/scripts``it will automatically generate Unity scripts in `Assets/Needle/Components.codegen`.  
If you want to add scripts to any NpmDef file you can just create them - each NpmDef automatically watches script changes and handles component generation, so you don't need any additional component in your scene.

For C# fields to be correctly generated it is currently important that you explictly declare a Typescript type. For example ``myField : number = 5``

You can switch between **Typescript** input and generated **C#** stub components using the tabs below
:::: code-group
::: code-group-item Typescript
```ts
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


### Extending generated components
Component C# classes are generated with the [`partial`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods) flag so that it is easy to extend them with functionality. This is helpful to draw gizmos, add context menus or add additional fields or methods that are not part of a built-in component.  


:::tip Member Casing
Exported members will start with a lowercase letter. For example if your C# member is named ``MyString`` it will be assigned to ``myString``.
:::
