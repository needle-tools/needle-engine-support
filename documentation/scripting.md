
# Scripting 📑

We refer to scripts mostly as components. This is because Unity's editor is component based. Our runtime javascript package mimicks the Unity editor and provides a lot of similar functionality. Javascript components are attached to threejs objects just like in Unity and have similar event functions like ``awake``, ``start``, ``onEnable``, ``onDisable``, ``update``, ``lateUpdate``. You can learn more about the Unity event loop [here ⇡](https://docs.unity3d.com/Manual/ExecutionOrder.html) and how/what we support under in the [Events chapter](#events-methods) below.

To see a list of needle-builtin-components see ``Packages/Needle Unity Threejs/Runtime/Components`` in the [Unity Project window ⇡](https://docs.unity3d.com/Manual/ProjectView.html).


## Contents 📋
- [Creating a new component](#creating-a-new-component)
- [Component architecture](#component-architecture)
- [Finding, adding and removing components](#finding-added-or-removing-components)
- [The Context and the DOM](#context-and-the-html-dom)
- [Accessing URL Parameters](#accessing-url-parameters)
- [Interop with external javascript](#accessing-components-from-external-javascript)
- [Automatically generating Unity components](#automatically-generating-unity-components-from-typescript-files)
- [Serialization in glTF files](#serialization--components-in-gltf-files)
- [Unity Types in Typescript](#renamed-unity-types-in-typescript)

---
## Creating a new component
Scripts are written in typescript. The simplest way to create a new component for your threejs project is to add a ``.ts`` file inside ``src/scripts/``. You can have one or many components inside one file. Files inside ``src/scripts/`` and subdirectories are automatically scanned for component classes and registered (see ``src/generated/``) when the threejs project is build in Unity.

• ***Note**: While adding scripts directly inside your project works **we recommend creating a npmdef file** inside Unity for a better development experience and code-reusablility. Please see the chapter [here](./project_structure.md#npm-definition-files) for more information.*

#### Example
To create a simple rotation component create ``src/scripts/Rotate.ts`` and add the following code:
```ts
import { Behaviour } from "needle.tiny.engine/engine-components/Component";

export class Rotate extends Behaviour
{
    start(){
        console.log(this);
    }

    update(){
        this.gameObject.rotateY(this.context.time.deltaTime);
    }
}
```
Now inside Unity create a new script inside your project named ``Rotate.cs``. Add the script to a Cube that is exported as part of a GLTF file (it needs a ``GltfObject`` component in its parent) and save the scene. The cube is now rotating inside the browser.   
Open the chrome developer console to inspect the log from the ``Rotate.start`` method. This is a helpful practice to learn and debug what fields are exported and currently assigned. In general all public and non-public fields and all public properties are exported.

Now add a new field ``public float speed = 5`` to your Unity component and save it. The Rotate component inspector now shows a ``speed`` field that you can edit. Save the scene (or click the ``Build`` button) and note that the javascript component now has the exported ``speed`` value assigned.

• ***Note**: It is also possible to ignore, convert or add fields on export in Unity by extending our export process. Documentation on that can be found in the [Export document](./export.md).*

---
## Component architecture
Components are added to threejs [Object3Ds ⇡](https://threejs.org/docs/#api/en/core/Object3D) similar to how [components in Unity ⇡](https://docs.unity3d.com/ScriptReference/Component.html) are added to [GameObjects ⇡](https://docs.unity3d.com/ScriptReference/GameObject.html). Therefor when we want to access a threejs Object3D we do so like ``this.gameObject`` where the ``gameObject`` is our Object3D.  

***Note**: Setting ``visible`` to false on a Object3D will act like ``SetActive(false)`` in Unity - meaning it will also disable all the current components on this object and its children. Update events for inactive components are not being called until ``visible`` is set to true again.*

### Events methods
- ``awake`` - First method being called when a new component is created
- ``onEnable`` - Called when a component is enabled (e.g. when ``enabled`` changes from false to true)
- ``onDisable`` - Called when a component is disabled (e.g. when ``enabled`` changes from true to false)
- ``onDestroy`` - called when the Object3D or component is being destroyed
- ``start`` - Called on the start of the first frame after the component was created
- ``earlyUpdate`` - First mainloop update event
- ``update`` - Regular mainloop update event
- ``lateUpdate``
- ``onBeforeRender`` - Last update event before render call
- ``onAfterRender`` - Called after render event

• ***Note**: It is important to understand that similar to Unity event methods are only being called when they are declared. So only declare update event methods when they are actually necessary, otherwise it may hurt performance if you have many components with update loops that do nothing.*


### Coroutines
Coroutines can be declared using the [javascript Generator ⇡](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) syntax.  
To start a coroutine call ``this.startCoroutine(this.myRoutineName());``  
Example:
```ts
export class Rotate extends Behaviour {

    start() {
        // the second argument is optional and allows you to specifiy 
        // when it should be called in the current frame loop
        // coroutine events are called after regular component events of the same name
        // e.g. Update coroutine events are called after component.update() functions
        this.startCoroutine(this.rotate(), FrameEvent.Update);
    }

    // this method is called every frame until it exits
    *rotate() {
        // keep looping forever
        while (true) {
            yield;
        }
    }
}
```
To stop a coroutine either exit the routine or call ``this.stopCoroutine(<...>)`` using the return value of the ``startCoroutine`` call.


## Finding, added or removing components
To access other components use the static methods on ``GameObject``. For example to get a renderer component in the parent use ``GameObject.getComponentInParent(this.gameObject, Renderer)``.  
Example:
```ts
import { Behaviour, GameObject } from "needle.tiny.engine/engine-components/Component";
import { Renderer } from "needle.tiny.engine/engine-components/Renderer";

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

## Context (and the HTML DOM)
The context refers to the runtime inside a [web component ⇡](https://developer.mozilla.org/en-US/docs/Web/Web_Components).  
The threejs scene lives inside a custom HTML component called ``<needle-tiny>`` (see the *index.html* in your project). You can access that element using ``this.context.domElement``.   
This architecture allows for potentially having multiple needle webgl scenes on one webpage that can either run on their own or act together as split-up views or adding different functionality to parts of your webpage.  
• ***Note**: Currently the exporter only supportes exporting one scene for one html element but this might change in the future.*

### Scene
Access the threejs scene using ``this.context.scene``

### Time
Use ``this.context.time`` to access ``time``, ``frameCount`` or ``deltaTime`` (time since last frame in ms).

### Input
Use ``this.context.input`` to access convenient methods for getting mouse and touch data.

### Physics
Use ``this.context.physics`` to conveniently perform raycasts against scene geometry.  
• ***Note**: [Layers ⇡](https://docs.unity3d.com/Manual/Layers.html) are also exported from Unity to threejs [Layers ⇡](https://threejs.org/docs/#api/en/core/Layers). By default physics will ignore objects on layer 2 (this is the ``Ignore Raycast`` layer in Unity) but hit all other layers. If you need you can override this behaviour using the options parameter that you can pass to the ``physics.raycast`` method but it is generally recommended that you setup your layers as needed in Unity.*

### Networking
Networking methods can be accessed via ``this.context.connection``. Please refer to the [networking document](./networking.md) for further information.

### Assets
Use ``this.context.assets`` to get access to assets that are imported inside GLTF files.

## Accessing URL Parameters
Use `utils.getParam("stream");` to quickly access URL parameters and define behaviour with them:
```ts
import { Behaviour } from "needle.tiny.engine/engine-components/Component";
import * as utils from "needle.tiny.engine/engine/engine_utils"

export class MyScript extends Behaviour
{ 
    awake(): void {
        // access the url parameter
        const urlParam = utils.getParam("target");
        if (urlParam && typeof urlParam === "string" && urlParam.length > 0) {
            // const do something based on ?target=some_string
        }
    }
}
```

## Accessing components from external javascript
It is possible to access all the functionality described above using regular javascript code that is no component and lives somewhere else. For that just find the ``<needle-tiny>`` web-component in your DOM and retrieve the ``Context`` from it e.g. by calling ``document.getElementById("tiny")?.context``.  
The web-component also exposes a reference to the static ``GameObject`` functions described above. You can find components using ``document.getElementById("tiny")?.gameObject.findObjectOfType("AudioSource")`` for example. It is recommended to cache those references as searching the whole scene repeatedly is expensive!


## Automatically generating Unity components from typescript files
*Experimental feature to automatically generate Unity components for typescript component in your project - installation and setup might change*  
- Open ``<path/to/needle.tiny.engine>/../component-compiler`` and run ``npm install``.
- In Unity add a ``Component Generator`` component to the GameObject with your ``ExportInfo`` component. Select the path to the ``component-compiler/src`` folder. 
- Now when adding new components in ``threejs/project/src/scripts`` it will automatically generate Unity scripts in ``Assets/Needle/GeneratedComponents``.

### Controling component generation
You can use the following typescript attributes to control generation behavior:
| Attribute | Result |
| -- | -- |
| `// @generate-component` | Force generation of next class|
| `// @dont-generate-component` | Disable generation of next class |
| `// @serializeField` | Decorate generated field with `[SerializeField]` |
| `// @type(UnityEngine.Camera)` | Specify generated C# field type |

The attribute `@dont-generate-component` is especially useful if you have an existing Unity script you want to match, or when you want to extend the generated code with custom logic (e.g. Gizmo drawing). You'll have to ensure that the serialized fields match yourself in this case (only matching fields/properties will be exported).

### Version Control
Make sure your generated components are checked into git/version control, otherwise their GUIDs might change between machines and script connections will be lost.

## Serialization / Components in glTF files
To embed components and recreate components with their correct types in glTF, we also need to save non-primitive types (everything that is not a ``Number``, ``Boolean`` or ``String``). The easiest way to do so is adding a ``@serializeable(<type>)`` decorator above your field or property. 
Example:
```js
export class MyClass extends Behaviour {
    @serializeable(Object3D)
    myObjectReference: THREE.Object3D | null = null;
} 
``` 

To serialize from and to custom formats it is possible to derive from the ``TypeSerializer`` class and create an instance. Use ``super()`` in the constructor to register supported types.  

In addition to matching fields, properties will also be exported when they match to fields in the typescript file.  

## Renamed Unity Types in TypeScript
This is a list of Unity types and their renamed counterpart types in our engine.
- ``UnityEvent`` → ``EventList``
