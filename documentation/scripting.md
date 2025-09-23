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

# Creating custom components

If you are new to scripting we **highly recommend** reading the following guides first:

- [Typescript Essentials](./getting-started/typescript-essentials.md)
- [Needle Engine for Unity Developers](./getting-started/for-unity-developers.md)

:::tip Already familiar with Needle Engine components?
If you know what you're doing, feel free to jump right into the [Needle Engine API documentation](https://engine.needle.tools/docs/api/latest).
:::

---

Runtime code for Needle Engine is written in TypeScript (recommended) or JavaScript. Needle Engine automatically generates C# stub components out of that, which you can add to GameObjects in the editor. The C# components and their data are recreated by the runtime as JavaScript components with the same data and attached to three.js objects.  

Both custom components as well as built-in Unity components can be mapped to JavaScript components in this way. For example, mappings for many built-in components related to animation, rendering or physics are already [included in Needle Engine](./component-reference.md#unity-components).  

:::tip Try it out 
If you want to code-along with the following examples without having to install anything you just click the following link: [Create virtual workspace to code along](https://engine.needle.tools/new).
:::

----

Our web runtime engine adopts a component model similar to Unity and thus provides a lot of functionality that will feel familiar.
Components attached to three's Object3D objects have lifecycle methods like ``awake``, ``start``, ``onEnable``, ``onDisable``, ``update`` and ``lateUpdate`` that you can implement. You can also use [Coroutines](#coroutines).   

----

## When you don't need to write code

Often, interactive scenes can be realized using Events in Unity and calling methods on built-in components. A typical example is playing an animation on button click - you create a button, add a Click event in the inspector, and have that call Animator.SetTrigger or similar to play a specific animation.  

Needle Engine translates Unity Events into JavaScript method calls, which makes this a very fast and flexible workflow - set up your events as usual and when they're called they'll work the same as in Unity.  

![image](https://user-images.githubusercontent.com/2693840/187314594-7e34905d-e704-4fa3-835c-6b40f11e1c62.png)   
_An example of a Button Click Event that is working out-of-the-box in Needle Engine — no code needed._ 

:::tip Built-in Components
Checkout the component reference for a list of built-in components that you can use without writing any code: [Component Reference](/component-reference.md)
:::

## Creating a new component
Scripts are written in TypeScript (recommended) or JavaScript.   
There are two ways to add custom scripts to your project:

- Simply add a file with an `.ts` or `.js` extension inside `src/scripts/` in your web project folder, for example `src/scripts/MyFirstScript.ts`.

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

Now inside Unity a new script called ``Rotate.cs`` will be automatically generated. Add the new Unity component to a Cube and save the scene.   
The cube is now rotating inside the browser.   
Open the chrome developer console by `F12` to inspect the log from the ``Rotate.start`` method. This is a helpful practice to learn and debug what fields are exported and currently assigned. In general all public and serializable fields and all public properties are exported.  

Now add a new field ``public float speed = 5`` to your Unity component and save it. The Rotate component inspector now shows a ``speed`` field that you can edit. Save the scene (or click the ``Build`` button) and note that the javascript component now has the exported ``speed`` value assigned. 
:::

:::details Create component with a custom function
Refer to the [Typescript Essentials Guide](./getting-started/typescript-essentials.md) to learn more about the syntax and language.
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

To stop a coroutine, either exit the routine by returning from it, or cache the return value of ``startCoroutine`` and call ``this.stopCoroutine(<...>)``. All Coroutines are stopped at ``onDisable`` / when disabling a component.




## Hooks

Needle Engine also exposes methods that you can use to hook into to easily receive callbacks at specific moments during the Engine lifecycle. Those hooks can be inserted at any point in your web application (for example in toplevel scope or in a svelte component or in your `<script type="module">` tag in index.html).  
| Method name | Description |
| -- | --
| `onInitialized(<callback>, <options?>)` | Called when a new context is initialized (before the first frame)
| `onClear(<callback>, <options?>)` | Register a callback before the engine context is cleared
| `onDestroy(<callback>, <options?>)` |  Register a callback in the engine before the context is destroyed
| `onStart(<callback>, <options?>)` | Called directly after components `start` at the beginning of a frame
| `onUpdate(<callback>, <options?>)` | Called directly after components `update`
| `onBeforeRender(<callback>, <options?>)` | called before calling render
| `onAfterRender(<callback>, <options?>)` | called before calling render

For example ([See example on stackblitz](https://stackblitz.com/edit/needle-engine-lifecycle-hooks?file=src%2Fmain.ts))
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

## Finding, adding and removing components

To access other components, use the static methods on ``GameObject`` or ``this.gameObject`` methods. For example, to access a `Renderer` component in the parent use ``GameObject.getComponentInParent(this.gameObject, Renderer)`` or ``this.gameObject.getComponentInParent(Renderer)``.  

**Example:**
```ts twoslash
import { Behaviour, Renderer } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    start() {
        const renderer = this.gameObject.getComponentInParent(this.gameObject, Renderer);
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
| `GameObject.removeComponent(Component)` | removes a component from a Object3D
| `GameObject.getComponent(Object3D, Type)` | returns the first component matching a type on the provided object.
| `GameObject.getComponents(Object3D, Type)` | returns all components matching a type on the provided object.
| `GameObject.getComponentInChildren` | same as ``getComponent`` but also searches in child objects.
| `GameObject.getComponentsInChildren` | same as ``getComponents`` but also searches in child objects.
| `GameObject.getComponentInParent` | same as ``getComponent`` but also searches in parent objects.
| `GameObject.getComponentsInParent` | same as ``getComponents`` but also searches in parent objects.
| `GameObject.findObjectOfType` | searches the whole scene for a type.
| `GameObject.findObjectsOfType` | searches the whole scene for all matching types.


## Three.js and the HTML DOM
  
The three.js scene lives inside a custom HTML component called ``<needle-engine>`` (see the *index.html* in your project). You can access the `<needle-engine>` web component using `this.context.domElement` (or if you're using a hook you can use e.g. `onStart(context => context.domElement)`).   

This architecture allows to embed the Needle Engine rendering onto your webpage and wherever you want. You can also overlay HTML elements on top of the 3D scene or use CSS to style the canvas. 

### Access the scene
To access the current scene from a component you use `this.context.scene`, this gives you the root [three.js Scene](https://threejs.org/docs/#api/en/scenes/Scene) object.

To traverse the hierarchy from a component you can either iterate over the children of an object   
with a for loop:  
```ts twoslash
for(let i = 0; i < this.gameObject.children; i++) 
    console.log(this.gameObject.children[i]);
```
or you can iterate using the `foreach` equivalent:
```ts twoslash
for(const child of this.gameObject.children) {
    console.log(child);
}
```

You can also use three.js specific methods to quickly iterate all objects recursively using the [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse) method:  

```ts twoslash
import { Object3D } from "three";
this.gameObject.traverse((obj: Object3D) => console.log(obj));
```
or to just traverse visible objects use [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) instead.

Another option that is quite useful when you just want to iterate objects being renderable you can query all renderer components and iterate over them like so:   
```ts twoslash
import { Renderer } from "@needle-tools/engine";
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
Receive input data for the object the component is on:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onPointerDown() {
        console.log("POINTER DOWN on " + this.gameObject.name);
    }
}
```

You can also subscribe to global events in the ``InputEvents`` enum like so:
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable() {
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    onDisable() {
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    private inputPointerDown = evt => { 
        console.log("POINTER DOWN anywhere in the scene", evt); 
    }
}
```

Or use ``this.context.input`` if you want to poll input state every frame:

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

If you want to handle inputs yourself you can also subscribe to [events the browser provides](https://developer.mozilla.org/en-US/docs/Web/Events). For example to subscribe to the browsers click event you can write:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onEnable() {
        window.addEventListener("click", this.onWindowClick);
    }

    onDisable() {
        // unsubscribe again when the component is disabled
        window.removeEventListener("click", this.onWindowClick);
    }

    private onWindowClick = () => { 
        console.log("CLICK anywhere on the page, not just on <needle-engine>");
    }
}
```
Note that in this case you have to handle all cases yourself. For example you may need to use different events if your user is visiting your website on desktop vs mobile vs a VR device. These cases are automatically handled by the Needle Engine input events (e.g. `PointerDown` is raised both for mouse down, touch down and in case of VR on controller button down). 

### Raycasting

Use ``this.context.physics.raycast()`` to perform a raycast and get a list of intersections. If you dont pass in any options the raycast is performed from the mouse position (or first touch position) in screenspace using the currently active `mainCamera`. You can also pass in a `RaycastOptions` object that has various settings like `maxDistance`, the camera to be used or the layers to be tested against.

Use ``this.context.physics.raycastFromRay(your_ray)`` to perform a raycast using a [three.js ray](https://threejs.org/docs/#api/en/math/Ray).  

Consider setting objects's layer to `Ignore Raycast` that you want to ignore from raycasting.

:::tip
 [This type of raycast casts a ray](https://www.youtube.com/watch?v=QkiCYT6tGH4) against all visible objects in the scene. No physics engine is needed, which is *different* to the behaviour in Unity, where you always need colliders to hit objects. If you want to cast against physics colliders only, use `physics.engine.raycast` methods described below.
:::


:::info Faster Raycasting by default
Needle Engine automatically uses faster raycasting methods. Under the BVH structures are created on a different browser thread to speed up raycasting. This is especially useful for complex meshes. We use a library called `three-mesh-bvh` under the hood.
:::

:::warning Performance considerations
When using default Needle compression settings, proxy meshes  are automatically created and used for raycasting. Still, some types of meshes are slow – for example, skinned meshes or meshes with blendshapes require expensive calculations to determine exact hits. 
:::

#### Raycast Collider Meshes

Another option is to use the physics raycast methods which will only return hits with colliders in the scene. 

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Here is an editable [example for physics raycast](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)

### Networking
Networking methods can be accessed via ``this.context.connection``. Please refer to the [networking page](./networking.md) for further information.


## Accessing Needle Engine and components from anywhere
It is possible to access all the functionality described above using regular JavaScript code that is not inside components and lives somewhere else. All the components and functionality of the needle runtime is accessible via the global ``Needle`` namespace (you can write ``console.log(Needle)`` to get an overview)

You can find components using ``Needle.findObjectOfType(Needle.AudioSource)`` for example. It is recommended to cache those references, as searching the whole scene repeatedly is expensive. See the list for [finding adding and removing components](#finding-adding-and-removing-components) above.  

For getting callbacks for the initial scene load see the following example ([Try on Stackblitz](https://stackblitz.com/edit/needle-engine-threejs-rotate-component?file=index.html))  
```html
<!-- Import the Needle Engine module -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"> </script>

<!-- Add the needle-engine web component in your HTML body -->
<needle-engine src="https://cloud.needle.tools/-/assets/Z23hmXBZ21QnG-Z21QnG-world/file.glb"></needle-engine>

<!-- Optionally add custom scripting to modify the scene -->
<script type="module">
  import { onStart, Behaviour, } from 'https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js';
  
  onStart((context) => {
    const components = context.scene.getComponentsInChildren();
    console.log('Hello Needle: Found ' + components.length + ' components');
   
    // Add a rotate component to all meshes in the scene
    context.scene.traverse((obj) => {
      if (obj.type === 'Mesh') obj.addComponent(MyScript);
    });
  });
  
  class MyScript extends Behaviour {
    update() {
      this.gameObject.rotateY(this.context.time.deltaTime);
    }
  }
</script>
```  

:::tip
See all available [lifecycle hooks](#hooks)
:::


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


## Serialization / Components in glTF files
To embed components and recreate components with their correct types in glTF, we also need to save non-primitive types (everything that is not a ``Number``, ``Boolean`` or ``String``). You can do so is adding a ``@serializable(<type>)`` decorator above your field or property. 

**Example:**
@[code ts twoslash](@code/component-object-reference.ts)

To serialize from and to custom formats, it is possible to extend from the ``TypeSerializer`` class and create an instance. Use ``super()`` in the constructor to register supported types.  

> **Note**: In addition to matching fields, matching properties will also be exported when they match to fields in the typescript file. 

## Loading Scenes
In Unity referenced Prefabs, SceneAssets and AssetReferences (Unity's Addressable System) will automatically be exported as glTF files (please refer to the [Export Prefabs](export.md) documentation).  

These exported gltf files will be serialized as plain string URIs. To simplify loading these from TypeScript components, we added the concept of ``AssetReference`` types. They can be loaded at runtime and thus allow to defer loading parts of your app or loading external content.

**Example:**
@[code ts twoslash](@code/component-prefab.ts)

AssetReferences are cached by URI, so if you reference the same exported glTF/Prefab in multiple components/scripts it will only be loaded once and then re-used.  

# Next Steps
