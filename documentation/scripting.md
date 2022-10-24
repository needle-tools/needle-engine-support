---
title: Writing Custom Components
---


## Introduction

Runtime code for Needle Engine is written in [TypeScript](https://typescriptlang.org) (recommended) or [JavaScript](https://javascript.info/). We automatically generate C# stub components out of that, which you can add to GameObjects in the editor. The C# components and their data are recreated by the runtime as JavaScript components with the same data and attached to three.js objects.  



Both custom components as well as built-in Unity components can be mapped to JavaScript components in this way. For example, mappings for many built-in components related to animation, rendering or physics are already [included in Needle Engine](./component-reference.md#unity-components).  

----

Our JavaScript runtime API adopts a component model similar to the Unity Editor and provides a lot of similar functionality.  
JavaScript components attached to [three.js objects](https://threejs.org/docs/#api/en/core/Object3D) have lifecycle methods similar to Unity, like ``awake``, ``start``, ``onEnable``, ``onDisable``, ``update`` and ``lateUpdate``, that you can implement. Additionally there are also [Coroutines](#coroutines)   

> Learn more about the Unity event loop [here](https://docs.unity3d.com/Manual/ExecutionOrder.html) and which parts of that we currently support in the [section about Lifecycle Methods](#lifecycle-methods) below.  

To get an in-depth overview of built-in components, you can inspect the folder ``Packages/Needle Engine Exporter/Core/Runtime/Components`` in the [Project Window](https://docs.unity3d.com/Manual/ProjectView.html).  

**Needle Engine's Exporter does _not_ compile your existing C# code to Web Assembly**. While using Web Assembly may result in better performance at runtime, it comes at a high cost for iteration speed and flexibility in building web experiences. Read more about our [vision](./vision.md) and [technical overview](./technical-overview). 


---

## When you don't need to write code

Often, interactive scenes can be realized using Events in Unity and calling methods on built-in components. A typical example is playing an animation on button click - you create a button, add a Click event in the inspector, and have that call Animator.SetTrigger or similar to play a specific animation.  

Needle Engine translates Unity Events into JavaScript method calls, which makes this a very fast and flexible workflow - set up your events as usual and when they're called they'll work the same as in Unity.  

![image](https://user-images.githubusercontent.com/2693840/187314594-7e34905d-e704-4fa3-835c-6b40f11e1c62.png)   
_An example of a Button Click Event that is working out-of-the-box in Needle Engine — no code needed._  

The same works for custom components that implement UnityEvent<>. This means that you can create custom components for artists and designers to wire up complex behaviours without writing any code.  

If you intend to expose/generate a UnityEvent in a custom component that you work on you can do it like this:

@[code](@code/component-unityevent.ts)

## Creating a new component 📑
Scripts are written in [TypeScript](https://www.typescriptlang.org/docs/) (recommended) or JavaScript. There's two ways to add custom scripts to your project:

- Simply add a `.ts` or `.js` file inside `src/scripts/` in your generated project directory.  
  Generated C# components are placed under `Assets/Needle/Components.codegen`.  

- Organize your code into NPM Definition Files. These help you to modularize and re-use code between projects.  
  Generated C# components are placed in a `.codegen` folder next to the NpmDef.  
  You can create NpmDef files via `Create > NPM Definition` and then add TypeScript files by right-clicking an NpmDef file and selecting `Create > TypeScript`. Please see [this chapter](./project_structure.md#npm-definition-files) for more information.  

In both approaches, source directories are watched for changes and C# components are regenerated whenever a change is detected. Changes to the source files also result in a hot reload of the running website – you don't have to wait for Unity to recompile the C# components. This makes iterating on code pretty much instant.  

> **Tip**: You can have multiple components inside one file.

### Example Workflow

- **Create a component that rotates an object**  
  Create ``src/scripts/Rotate.ts`` and add the following code:  
```ts
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

Now inside Unity a new script called ``Rotate.cs`` will be automatically generated. Add the script to a Cube that is exported as part of a glTF file (it needs a ``GltfObject`` component in its parent) and save the scene. The cube is now rotating inside the browser.   
Open the chrome developer console to inspect the log from the ``Rotate.start`` method. This is a helpful practice to learn and debug what fields are exported and currently assigned. In general all public and serializable fields and all public properties are exported.  

Now add a new field ``public float speed = 5`` to your Unity component and save it. The Rotate component inspector now shows a ``speed`` field that you can edit. Save the scene (or click the ``Build`` button) and note that the javascript component now has the exported ``speed`` value assigned.  

> **Note**: It is also possible to ignore, convert or add fields on export in Unity by extending our export process. This is currently undocumented and subject to change.

### Function with argument
Please refer to the [TypeScript](https://www.typescriptlang.org/docs/) documentation to learn more about the syntax and language.
```ts
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

---

## Component architecture
Components are added to threejs [Object3Ds](https://threejs.org/docs/#api/en/core/Object3D) similar to how [components in Unity](https://docs.unity3d.com/ScriptReference/Component.html) are added to [GameObjects](https://docs.unity3d.com/ScriptReference/GameObject.html). Therefore when we want to access a three.js Object3D, we can access it as ``this.gameObject`` which returns our `Object3D`.  

***Note**: Setting ``visible`` to false on a Object3D will act like ``SetActive(false)`` in Unity - meaning it will also disable all the current components on this object and its children. Update events for inactive components are not being called until ``visible`` is set to true again.*

### Lifecycle methods

- ``awake()`` - First method being called when a new component is created
- ``onEnable()`` - Called when a component is enabled (e.g. when ``enabled`` changes from false to true)
- ``onDisable()`` - Called when a component is disabled (e.g. when ``enabled`` changes from true to false)
- ``onDestroy()`` - called when the Object3D or component is being destroyed
- ``start()`` - Called on the start of the first frame after the component was created
- ``earlyUpdate()`` - First mainloop update event
- ``update()`` - Regular mainloop update event
- ``lateUpdate()``
- ``onBeforeRender()`` - Last update event before render call
- ``onAfterRender()`` - Called after render event

> **Note**: It is important to understand that similar to Unity lifecycle methods are only being called when they are declared. So only declare `update` lifecycle methods when they are actually necessary, otherwise it may hurt performance if you have many components with update loops that do nothing.

### Physic event methods
- ``onCollisionEnter(col : Collision)``
- ``onCollisionStay(col : Collision)``
- ``onCollisionExit(col : Collision)``
- ``onTriggerEnter(col : Collision)``
- ``onTriggerStay(col : Collision)``
- ``onTriggerExit(col : Collision)``

### Coroutines

Coroutines can be declared using the [JavaScript Generator Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).  
To start a coroutine, call ``this.startCoroutine(this.myRoutineName());``  

**Example**
```ts
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

To stop a coroutine, either exit the routine by returning from it, or cache the return value of ``startCoroutine`` and call ``this.stopCoroutine(<...>)``. All Coroutines are stopped at ``onDisable`` / when disabling a component.

## Finding, adding and removing components

To access other components, use the static methods on ``GameObject`` or ``this.gameObject`` methods. For example, to access a `Renderer` component in the parent use ``GameObject.getComponentInParent(this.gameObject, Renderer)`` or ``this.gameObject.getComponentInParent(Renderer)``.  

**Example:**
```ts
import { Behaviour, GameObject, Renderer } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    start() {
        const renderer = GameObject.getComponentInParent(this.gameObject, Renderer);
        console.log(renderer);
    }
}
```

### Some of the available methods:
- ``GameObject.instantiate(Object3D, InstantiateOptions)`` - creates a new instance of this object including new instances of all its components.
- ``GameObject.destroy(Object3D|Component)`` - destroy a component or Object3D (and its components)
- ``GameObject.addNewComponent(Object3D, Type)`` - adds (and creates) a new component for a type to the provided object. Note that ``awake`` and ``onEnable`` is already called when the component is returned.
- ``GameObject.addComponent(Object3D, Component)`` - moves a component instance to the provided object.
- ``GameObject.removeComponent(Component)`` - removes a component from a gameObject
- ``GameObject.getComponent(Object3D, Type)`` - returns the first component matching a type on the provided object.
- ``GameObject.getComponents(Object3D, Type)`` - returns all components matching a type on the provided object.
- ``GameObject.getComponentInChildren`` - same as ``getComponent`` but also searches in child objects.
- ``GameObject.getComponentsInChildren`` - same as ``getComponents`` but also searches in child objects.
- ``GameObject.getComponentInParent`` - same as ``getComponent`` but also searches in parent objects.
- ``GameObject.getComponentsInParent`` - same as ``getComponents`` but also searches in parent objects.
- ``GameObject.findObjectOfType`` - searches the whole scene for a type.
- ``GameObject.findObjectsOfType`` - searches the whole scene for all matching types.


## The Context and the HTML DOM

The context refers to the runtime inside a [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).  
The three.js scene lives inside a custom HTML component called ``<needle-engine>`` (see the *index.html* in your project). You can access that element using ``this.context.domElement``.   

This architecture allows for potentially having multiple needle WebGL scenes on the same webpage, that can either run on their own or communicate between each other as parts of your webpage.  

> **Note**: The exporter currently only supports exporting one scene for one html element, but you can create HTML files with multiple contexts. We might make this easier in the future. 

### Three.js Scene
Access the three.js [scene](https://threejs.org/docs/#api/en/scenes/Scene) using ``this.context.scene``.

### Time
Use ``this.context.time`` to access ``time``, ``frameCount`` or ``deltaTime`` (time since last frame in milliseconds).  

### Input
Use ``this.context.input`` to access convenient methods for getting mouse and touch data. WebXR controller access is currently separate.  

### Physics
Use ``this.context.physics`` to access the physics API, for example to perform raycasts against scene geometry.  

> **Note**: [Layers](https://docs.unity3d.com/Manual/Layers.html) are mapped from Unity to three.js [Layers](https://threejs.org/docs/#api/en/core/Layers). By default, physics will ignore objects on layer 2 (this is the ``Ignore Raycast`` layer in Unity) but hit all other layers. We recommended setting up your layers as needed in Unity, but if you need, you can override this behaviour using the `options` parameter that you can pass to the ``physics.raycast`` method. 

### Networking
Networking methods can be accessed via ``this.context.connection``. Please refer to the [networking docs](./networking.md) for further information.

### Assets
Use ``this.context.assets`` to get access to assets and resources that are imported inside glTF files.

## Accessing URL Parameters
Use `utils.getParam(<..>)` to quickly access URL parameters and define behaviour with them.

**Example:**
```ts
import { Behaviour } from "@needle-tools/engine";
import { getParam } from "@needle-tools/engine/engine/engine_utils"

export class MyScript extends Behaviour
{ 
    awake(): void {
        // access the url parameter
        const urlParam = getParam("target");
        if (urlParam && typeof urlParam === "string" && urlParam.length > 0) {
            // const do something based on ?target=some_string
        }
    }
}
```

## Accessing components from external JavaScript
It is possible to access all the functionality described above using regular JavaScript code that is not inside components and lives somewhere else. All the components and functionality of the needle runtime is accessible via the global ``Needle`` namespace (you can write ``console.log(Needle)`` to get an overview)

For that just find the ``<needle-engine>`` web-component in your DOM and retrieve the ``Context`` from it e.g. by calling ``await document.queryElement("needle-engine")?.getContext()``.   

You can find components using ``Needle.findObjectOfType(Needle.AudioSource)`` for example. It is recommended to cache those references, as searching the whole scene repeatedly is expensive. See the list for [finding adding and removing components](#finding-adding-and-removing-components) above.  

For getting callbacks for the initial scene load see the following example:  
```js
<needle-engine loadstart="loadingStarted" progress="loadingProgress" loadfinished="loadingFinished"></needle-engine>

<script type="text/javascript">
function loadingStarted() { console.log("START") }
function loadingProgress() { console.log("LOADING...") }
function loadingFinished() { console.log("FINISHED!") }
</script>
```


## Automatically generating Unity components from typescript files
*Automatically generate Unity components for typescript component in your project using [Needle component compiler](https://www.npmjs.com/package/@needle-tools/needle-component-compiler)*  
- If you want to add scripts inside the ``src/scripts`` folder in your project then you need to have a ``Component Generator`` on the GameObject with your ``ExportInfo`` component.
- Now when adding new components in ``your/threejs/project/src/scripts``it will automatically generate Unity scripts in ``Assets/Needle/Components.codegen`.
- If you want to add scripts to any NpmDef file you can just create them - each NpmDef automatically watches script changes and handles component generation, so you don't need any additional component in your scene.
> **Note**: for C# fields to be correctly generated it is currently important that you explictly declare a Typescript type. For example ``myField : number = 5``

:::::details See codegen example and how to extend it 🤘
You can switch between **Typescript** input and generated **C#** stub components using the tabs below
:::: code-group
::: code-group-item Typescript
```ts
import { AssetReference, Behaviour, serializeable } from "@needle-tools/engine";
import { Object3D } from "three";

export class MyCustomComponent extends Behaviour {
    @serializeable()
    myFloatValue: number = 42;

    @serializeable(Object3D)
    myOtherObject?: Object3D;

    @serializeable(AssetReference)
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
:::::


### Controlling component generation
You can use the following typescript attributes to control C# code generation behavior:  
| Attribute | Result |
| -- | -- |
| `// @generate-component` | Force generation of next class|
| `// @dont-generate-component` | Disable generation of next class |
| `// @serializeField` | Decorate generated field with `[SerializeField]` |
| `// @type UnityEngine.Camera` | Specify generated C# field type |
| `// @nonSerialized` | Skip generating the next field or method |

The attribute `@dont-generate-component` is especially useful if you have an existing Unity script you want to match. You'll have to ensure yourself that the serialized fields match in this case – only matching fields/properties will be exported. 

> **Note**: exported members will start with a lowercase letter. For example if your C# member is named ``MyString`` it will be assigned to ``myString``.

### Extending generated components
Component C# classes are generated with the [`partial`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods) flag so that it is easy to extend them with functionality. This is helpful to draw gizmos, add context menus or add additional fields or methods that are not part of a built-in component.  

### Version Control
While generated C# components use the type name to produce stable GUIDs, we recommend checking in generated components in version control as a good practice.  

## Serialization / Components in glTF files
To embed components and recreate components with their correct types in glTF, we also need to save non-primitive types (everything that is not a ``Number``, ``Boolean`` or ``String``). You can do so is adding a ``@serializeable(<type>)`` decorator above your field or property. 

**Example:**
@[code](@code/component-object-reference.ts)

To serialize from and to custom formats, it is possible to extend from the ``TypeSerializer`` class and create an instance. Use ``super()`` in the constructor to register supported types.  

> **Note**: In addition to matching fields, matching properties will also be exported when they match to fields in the typescript file. 

## AssetReference and Addressables
Referenced Prefabs, SceneAssets and [``AssetReferences``](https://docs.unity3d.com/Packages/com.unity.addressables@latest/manual/AddressableAssetsGettingStarted.html) in Unity will automatically be exported as glTF files (please refer to the [Export Prefabs](export.md#gltf-prefabs) documentation).  

These exported gltf files will be serialized as plain string URIs. To simplify loading these from TypeScript components, we added the concept of ``AssetReference`` types. They can be loaded at runtime and thus allow to defer loading parts of your app or loading external content.

**Example:**
@[code](@code/component-prefab.ts)

AssetReferences are cached by URI, so if you reference the same exported glTF/Prefab in multiple components/scripts it will only be loaded once and then re-used.  

## Renamed Unity Types in TypeScript
For future compatibility, some Unity-specific types are mapped to different type names in our engine.  

| Unity Type | Type in Needle Engine | Description |
| -- | -- | -- |
| ``UnityEvent`` | ``EventList`` | |
| ``Transform`` | ``Object3D`` | |
| ``Transform`` | ``AssetReference`` | when assigning a prefab or scene asset in Unity |
| ``float`` | ``number`` | |
| ``Color`` | ``RGBAColor`` | |


## For Unity Devs
If you are a Unity dev and want to learn more about typescript and Needle Engine you can also learn more in [Needle Engine for Unity developers](for-unity-developers) 😊