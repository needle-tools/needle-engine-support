---
title: Needle Engine Scripting
---

If you are new to scripting we recommend reading the following guides first:

- [Typescript Essentials](./getting-started/typescript-essentials.md)
- [Needle Engine for Unity Developers](./getting-started/for-unity-developers.md)

Sometimes it can also be helpful to dive into the [Needle Engine Api documentation](https://engine.needle.tools/docs/api).

---

Runtime code for Needle Engine is written in [TypeScript](https://typescriptlang.org) (recommended) or [JavaScript](https://javascript.info/). We automatically generate C# stub components out of that, which you can add to GameObjects in the editor. The C# components and their data are recreated by the runtime as JavaScript components with the same data and attached to three.js objects.  

Both custom components as well as built-in Unity components can be mapped to JavaScript components in this way. For example, mappings for many built-in components related to animation, rendering or physics are already [included in Needle Engine](./component-reference.md#unity-components).  

If you want to code-along with the following examples without having to install anything you just click the following link:

- [Create virtual workspace to code along](https://stackblitz.com/fork/github/needle-engine/vite-template?file=src%2Fmain.ts).

----

Our web runtime engine adopts a component model similar to Unity and thus provides a lot of functionality that will feel familiar.
Components attached to three's Object3D objects have lifecycle methods like ``awake``, ``start``, ``onEnable``, ``onDisable``, ``update`` and ``lateUpdate`` that you can implement. You can also use [Coroutines](#coroutines).   

----

## When you don't need to write code

Often, interactive scenes can be realized using Events in Unity and calling methods on built-in components. A typical example is playing an animation on button click - you create a button, add a Click event in the inspector, and have that call Animator.SetTrigger or similar to play a specific animation.  

Needle Engine translates Unity Events into JavaScript method calls, which makes this a very fast and flexible workflow - set up your events as usual and when they're called they'll work the same as in Unity.  

![image](https://user-images.githubusercontent.com/2693840/187314594-7e34905d-e704-4fa3-835c-6b40f11e1c62.png)   
_An example of a Button Click Event that is working out-of-the-box in Needle Engine — no code needed._ 


## Creating a new component
Scripts are written in TypeScript (recommended) or JavaScript.   
There are two ways to add custom scripts to your project:

- Simply add a file with an `.ts` or `.js` extension inside `src/scripts/` in your generated project directory, for example `src/scripts/MyFirstScript.ts`

- Unity specific:   
  Organize your code into NPM Definition Files (npm packages). These help you to modularize and re-use code between projects and if you are familiar with web development they are in fact regular npm packages that are installed locally.  
  In Unity you can create NpmDef files via `Create > NPM Definition` and then add TypeScript files by right-clicking an NpmDef file and selecting `Create > TypeScript`. Please see [this chapter](./project-structure.md#npm-definition-files) for more information.  


In both approaches, source directories are watched for changes and C# stub components or Blender panels are regenerated whenever a change is detected.   
Changes to the source files also result in a hot reload of the running website – you don't have to wait for Unity to recompile the C# components. This makes iterating on code pretty much instant.  

You can even have multiple component types inside one file (e.g. you can declare `export class MyComponent1` and `export class MyOtherComponent` in the same Typescript file).

If you are new to writing Javascript or Typescript we recommend reading the [Typescript Essentials Guide](./getting-started/typescript-essentials.md) guide first before continuing with this guide.

:::details Example: Creating a Component that rotates an object

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

Now inside Unity a new script called ``Rotate.cs`` will be automatically generated. Add the new Unity component to a Cube and save the scene.   
The cube is now rotating inside the browser.   
Open the chrome developer console by `F12` to inspect the log from the ``Rotate.start`` method. This is a helpful practice to learn and debug what fields are exported and currently assigned. In general all public and serializable fields and all public properties are exported.  

Now add a new field ``public float speed = 5`` to your Unity component and save it. The Rotate component inspector now shows a ``speed`` field that you can edit. Save the scene (or click the ``Build`` button) and note that the javascript component now has the exported ``speed`` value assigned. 
:::

:::details Create component with a custom function
Refer to the [Typescript Essentials Guide](./getting-started/typescript-essentials.md) to learn more about the syntax and language.
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
:::

:::details Version Control & Unity
While generated C# components use the type name to produce stable GUIDs, we recommend checking in generated components in version control as a good practice. 
::: 


## Component architecture
Components are added to three.js `Object3Ds`. This is similar to how Components in Unity are added to `GameObjects`. Therefore when we want to access a three.js Object3D, we can access it as ``this.gameObject`` which returns the `Object3D` that the component is attached to.  

***Note**: Setting ``visible`` to false on a Object3D will act like ``SetActive(false)`` in Unity - meaning it will also disable all the current components on this object and its children. Update events for inactive components are not being called until ``visible`` is set to true again.* If you want to hide an object without affecting components you can just disable the Needle Engine `Renderer` component.

### Lifecycle methods

Note that lifecycle methods are only being called when they are declared. So only declare `update` lifecycle methods when they are actually necessary, otherwise it may hurt performance if you have many components with update loops that do nothing.

| Method name | Description |
| -- | --
| `awake()` | First method being called when a new component is created
| `onEnable()` | Called when a component is enabled (e.g. when ``enabled`` changes from false to true)
| `onDisable()` | Called when a component is disabled (e.g. when ``enabled`` changes from true to false)
| `onDestroy()` | called when the Object3D or component is being destroyed
| `start()` | Called on the start of the first frame after the component was created
| `earlyUpdate()` | First update event
| `update()` | Default update event
| `lateUpdate()` | Called after update
| `onBeforeRender()` | Last update event before render call
| `onAfterRender()` | Called after render event

### Physic event methods
| Method name | Description |
| -- | --
| `onCollisionEnter(col : Collision)` | 
| `onCollisionStay(col : Collision)` | 
| `onCollisionExit(col : Collision)` | 
| `onTriggerEnter(col : Collision)` | 
| `onTriggerStay(col : Collision)` | 
| `onTriggerExit(col : Collision)` | 

### Input event methods
| Method name | Description |
| -- | --
| `onPointerEnter(args : PointerEventData)` | Called when a cursor starts to hover over an object (or any of it's children)
| `onPointerMove(args : PointerEventData)` | Called when a cursor moves over an object (or any of it's children)
| `onPointerExit(args : PointerEventData)` | Called when a cursor exists (stops hovering) an object
| `onPointerDown(args : PointerEventData)` | Called when a cursor is pressed over an object 
| `onPointerUp(args : PointerEventData)` | Called when a cursor is released over an object
| `onPointerClick(args : PointerEventData)` | Called when a cursor is clicked over an object


### XR event methods
*requires Needle Engine >= 3.32.0*
| Method name | Description |
| -- | --
| `supportsXR(mode: XRSessionMode)` | Optionally implement if you only want to receive XR callbacks for specific XR modes like `immersive-vr` or `immersive-ar`. Return `true` to notify the system that you want callbacks for the passed in mode
| `onBeforeXR(mode: XRSessionMode, init: XRSessionInit)` | Called right before a XRSession is requested and can be used to modify the XRSessionInit object
| `onEnterXR(args: NeedleXREventArgs)` | Callback when this component joins a xr session (or becomes active in a running XR session)
| `onUpdateXR(args: NeedleXREventArgs)` | Callback when a xr session updates (while it is still active in XR session)
| `onLeaveXR(args: NeedleXREventArgs)` | allback when this component exists a xr session (or when it becomes inactive in a running XR session) 
| `onControllerAdded(args: NeedleXRControllerEventArgs)` | Callback when a controller is connected/added while in a XR session    OR when the component joins a running XR session that has already connected controllers   OR when the component becomes active during a running XR session that has already connected controllers
| `onControllerRemoved(args: NeedleXRControllerEventArgs)` | callback when a controller is removed while in a XR session   OR when the component becomes inactive during a running XR session

#### Additional XR events

| Method name | Description |
| -- | --
| `window.addEventListener("needle-xrsession-start")` | CustomEvent that is invoked when a XRSession starts. `details` contains the `NeedleXRSession`
| `window.addEventListener("needle-xrsession-end")` | CustomEvent that is invoked when a XRSession starts. `details` contains the `NeedleXRSession`
| `onXRSessionStart(args: { session:NeedleXRSession } )` | global event hook. To unsubscribe use `offXRSessionStart`


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




## Special Lifecycle hooks

Needle Engine also exposes a few lifecycle hooks that you can use to hook into the update loop without having to write a full component.  
Those hooks can be inserted at any point in your web application (for example in toplevel scope or in a svelte component)  
| Method name | Description |
| -- | --
| `onInitialized()` | Called when a new context is initialized (before the first frame)
| `onStart()` | Called directly after components `start` at the beginning of a frame (once per context)
| `onUpdate()` | Called directly after components `update`
| `onBeforeRender()` | called before calling render

For example:
```ts
// this can be put into e.g. main.ts or a svelte component (similar to onMount)
import { onUpdate } from "@needle-tools/engine"
onUpdate((context:Context) => {
    // do something... e.g. access the scene via context.scene
}
```



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


| Method |  |
| -- | -- 
| `GameObject.instantiate(Object3D, InstantiateOptions)` | creates a new instance of this object including new instances of all its components 
| `GameObject.destroy(Object3D \| Component)` | destroy a component or Object3D (and its components) 
| `GameObject.addNewComponent(Object3D, Type)` | adds (and creates) a new component for a type to the provided object. Note that ``awake`` and ``onEnable`` is already called when the component is returned 
| `GameObject.addComponent(Object3D, Component)` |  moves a component instance to the provided object. It is useful if you already have an instance e.g. when you create a component with e.g. `new MyComponent()` and then attach it to a object
| `GameObject.removeComponent(Component)` | removes a component from a gameObject
| `GameObject.getComponent(Object3D, Type)` | returns the first component matching a type on the provided object.
| `GameObject.getComponents(Object3D, Type)` | returns all components matching a type on the provided object.
| `GameObject.getComponentInChildren` | same as ``getComponent`` but also searches in child objects.
| `GameObject.getComponentsInChildren` | same as ``getComponents`` but also searches in child objects.
| `GameObject.getComponentInParent` | same as ``getComponent`` but also searches in parent objects.
| `GameObject.getComponentsInParent` | same as ``getComponents`` but also searches in parent objects.
| `GameObject.findObjectOfType` | searches the whole scene for a type.
| `GameObject.findObjectsOfType` | searches the whole scene for all matching types.


## Three.js and the HTML DOM

The context refers to the runtime inside a [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).  
The three.js scene lives inside a custom HTML component called ``<needle-engine>`` (see the *index.html* in your project). You can access the `<needle-engine>` web component using ``this.context.domElement``.   

This architecture allows for potentially having multiple needle WebGL scenes on the same webpage, that can either run on their own or communicate between each other as parts of your webpage.  

### Access the scene
To access the current scene from a component you use `this.scene` which is equivalent to `this.context.scene`, this gives you the root three.js scene object.

To traverse the hierarchy from a component you can either iterate over the children of an object   
with a for loop:  
```ts
for(let i = 0; i < this.gameObject.children; i++) 
    const ch = this.gameObject.children[i];
```
or you can iterate using the `foreach` equivalent:
```ts
for(const child of this.gameObject.children) {
    console.log(child);
}
```
You can also use three.js specific methods to quickly iterate all objects recursively using the [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse) method:  
```ts
this.gameObject.traverse(obj => console.log(obj))
```
or to just traverse visible objects use [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) instead.

Another option that is quite useful when you just want to iterate objects being renderable you can query all renderer components and iterate over them like so:   
```ts
for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
For more information about getting components see the next section.

### Time
Use `this.context.time` to get access to time data:  
- `this.context.time.time` is the time since the application started running
- `this.context.time.deltaTime` is the time that has passed since the last frame
- `this.context.time.frameCount` is the number of frames that have passed since the application started
- `this.context.time.realtimeSinceStartup` is the unscaled time since the application has started running  

It is also possible to use `this.context.time.timeScale` to deliberately slow down time for e.g. slow motion effects.

### Input
Use ``this.context.input`` to poll input state:

```ts
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

You can also subscribe to events in the ``InputEvents`` enum like so:
```ts
import { Behaviour, InputEvents } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable(){
        this.context.input.addEventListener(InputEvents.PointerDown, this.onPointerDown);
    }
    onDisable() {
        // it is recommended to also unsubscribe from events when your component becomes inactive
        this.context.input.removeEventListener(InputEvents.PointerDown, this.onPointerDown);
    }

    private onPointerDown = (evt) => { console.log(evt); }
}
```

If you want to handle inputs yourself you can also subscribe to [all events the browser provides](https://developer.mozilla.org/en-US/docs/Web/Events) (there are a ton). For example to subscribe to the browsers click event you can write:
```ts
window.addEventListener("click", () => { console.log("MOUSE CLICK"); });
```
Note that in this case you have to handle all cases yourself. For example you may need to use different events if your user is visiting your website on desktop vs mobile vs a VR device. These cases are automatically handled by the Needle Engine input events (e.g. `PointerDown` is raised both for mouse down, touch down and in case of VR on controller button down). 

### Physics
Use ``this.context.physics.raycast()`` to perform a raycast and get a list of intersections. If you dont pass in any options the raycast is performed from the mouse position (or first touch position) in screenspace using the currently active `mainCamera`. You can also pass in a `RaycastOptions` object that has various settings like `maxDistance`, the camera to be used or the layers to be tested against.

Use ``this.context.physics.raycastFromRay(your_ray)`` to perform a raycast using a [three.js ray](https://threejs.org/docs/#api/en/math/Ray)

Note that the calls above are by default raycasting against visible scene objects. That is different to Unity where you always need colliders to hit objects. The default three.js solution has both pros and cons where one major con is that it can perform quite slow depending on your scene geometry. It may be especially slow when raycasting against skinned meshes. It is therefor recommended to usually set objects with SkinnedMeshRenderers in Unity to the `Ignore Raycast` layer which will then be ignored by default by Needle Engine as well.   

Another option is to use the physics raycast methods which will only return hits with colliders in the scene. 

```ts
const hit = this.context.physics.engine?.raycast();
```

Here is a editable [example for physics raycast](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)

### Networking
Networking methods can be accessed via ``this.context.connection``. Please refer to the [networking docs](./networking.md) for further information.


## Accessing Needle Engine and components from anywhere
It is possible to access all the functionality described above using regular JavaScript code that is not inside components and lives somewhere else. All the components and functionality of the needle runtime is accessible via the global ``Needle`` namespace (you can write ``console.log(Needle)`` to get an overview)

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

You can also subscribe to the globale `NeedleEngine` (sometimes also referred to as *ContextRegistry*) to receive a callback when a Needle Engine context has been created or to access all available contexts:
```ts
import { NeedleEngine } from "@needle-tools/engine";
NeedleEngine.addContextCreatedCallback((args) => {
  const context = args.context;
  const scene = context.scene;
  const myInstance = GameObject.getComponentInChildren(scene, YourComponentType);
});
```

Another option is using the `onInitialized(ctx => {})` [lifecycle hook](#special-lifecycle-hooks)

You can also access all available contexts via `NeedleEngine.Registered` which returns the internal array. (Note that this array should not be modified but can be used to iterate all active contexts to modify settings, e.g. set all contexts to `context.isPaused = true`) 

Below you find a list of available events on the static `NeedleEngine` type.   
You can subscribe to those events via `NeedleEngine.registerCallback(ContextEvent.ContextCreated, (args) => {})`

| ContextEvent options | |
|---|---|
| `ContextEvent.ContextRegistered` | Called when the context is registered to the registry. |
| `ContextEvent.ContextCreationStart` | Called before the first glb is loaded and can be used to initialize the physics engine. Can return a promise |
| `ContextEvent.ContextCreated` | Called when the context has been created before the first frame |
| `ContextEvent.ContextDestroyed` | Called when the context has been destroyed |
| `ContextEvent.MissingCamera` | Called when the context could not find a camera, currently only called during creation |
| `ContextEvent.ContextClearing` | Called when the context is being cleared: all objects in the scene are being destroyed and internal state is reset |
| `ContextEvent.ContextCleared` | Called after the context has been cleared |
 

## Gizmos

The static `Gizmos` class can be used to draw lines, shapes and text which is mostly useful for debugging.  
All gizmos function have multiple options for e.g. colors or for how long they should be displayed in the scene. Internally they are cached and re-used. 

| Gizmos | |
| -- | -- |
| `Gizmos.DrawLabel` | Draws a label with a background optionally. It can be attached to an object. Returns a Label handle which can be used to update the text. |
| `Gizmos.DrawRay` | Takes an origin and direction in worldspace to draw an infinite ray line |
| `Gizmos.DrawDirection` | Takes a origin and direction to draw a direction in worldspace |
| `Gizmos.DrawLine` | Takes two vec3 worldspace points to draw a line |
| `Gizmos.DrawWireSphere` | Draws a wireframe sphere in worldspace |
| `Gizmos.DrawSphere` | Draws a solid sphere in worldspace |
| `Gizmos.DrawWireBox` | Draws a wireframe box in worldspace |
| `Gizmos.DrawWireBox3` | Draws a wireframe box3 |
| `Gizmos.DrawArrow` | Draws an arrow taking two points in worldspace |


## Serialization / Components in glTF files :tags serialization
To embed components and recreate components with their correct types in glTF, we also need to save non-primitive types (everything that is not a ``Number``, ``Boolean`` or ``String``). You can do so is adding a ``@serializable(<type>)`` decorator above your field or property. 

**Example:**
@[code](@code/component-object-reference.ts)

To serialize from and to custom formats, it is possible to extend from the ``TypeSerializer`` class and create an instance. Use ``super()`` in the constructor to register supported types.  

> **Note**: In addition to matching fields, matching properties will also be exported when they match to fields in the typescript file. 

## Loading Scenes
Referenced Prefabs, SceneAssets and [``AssetReferences``](https://docs.unity3d.com/Packages/com.unity.addressables@latest/manual/AddressableAssetsGettingStarted.html) in Unity will automatically be exported as glTF files (please refer to the [Export Prefabs](export.md) documentation).  

These exported gltf files will be serialized as plain string URIs. To simplify loading these from TypeScript components, we added the concept of ``AssetReference`` types. They can be loaded at runtime and thus allow to defer loading parts of your app or loading external content.

**Example:**
@[code](@code/component-prefab.ts)

AssetReferences are cached by URI, so if you reference the same exported glTF/Prefab in multiple components/scripts it will only be loaded once and then re-used.  
