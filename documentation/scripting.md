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

# Creating Custom Components

<logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript</logo-header> • <logo-header logo="/imgs/javascript-logo.webp" alt="JavaScript">JavaScript</logo-header> • <logo-header logo="/imgs/unity-logo.webp" alt="Unity">Unity</logo-header> • <logo-header logo="/blender/logo.png" alt="Blender">Blender</logo-header>

Learn how to create interactive components for Needle Engine using TypeScript or JavaScript. Components work seamlessly with Unity and Blender editor integrations.

:::tip Prerequisites
New to TypeScript? Start here:
- [TypeScript Essentials](./getting-started/typescript-essentials.html) - Language fundamentals
- [Needle Engine for Unity Developers](./getting-started/for-unity-developers.html) - Unity to web workflow

Already know Needle Engine? Jump to the [API documentation](https://engine.needle.tools/docs/api/latest).
:::

## How It Works

**Write once, use everywhere:**

1. **Write** TypeScript/JavaScript components with runtime logic
2. **Generate** C# stub components (Unity) or Blender panels automatically
3. **Design** in Unity/Blender editor with serialized properties
4. **Export** scene data to glTF format
5. **Run** TypeScript/JavaScript in the browser with exported data

:::tip Try It Live
Code along without installing anything: [Open StackBlitz workspace →](https://engine.needle.tools/new)
:::

### Component Architecture

Needle Engine uses a **component model** similar to Unity/Blender:

- Components attach to **three.js Object3D** (like Unity's GameObject)
- Lifecycle methods: `awake`, `start`, `onEnable`, `onDisable`, `update`, `lateUpdate`
- [Coroutines](#coroutines) for sequenced operations
- Input events, physics events, XR events   

## No-Code Approach

Many interactive experiences can be built **without writing any code** using Unity/Blender events and built-in components.

**Example:** Playing an animation on button click
1. Create a UI Button in Unity
2. Add a Click event in the Inspector
3. Drag the Animator component
4. Select `Animator.SetTrigger()`
5. Done! Works the same in the browser

![Unity Button Click Event Example](https://user-images.githubusercontent.com/2693840/187314594-7e34905d-e704-4fa3-835c-6b40f11e1c62.png)
_Unity Events work out-of-the-box in Needle Engine—no JavaScript needed._

:::tip Built-in Components
Over 100+ built-in components available—animations, physics, UI, XR, and more:
[Browse Component Reference →](./component-reference.html)
:::

## Creating Your First Component

Write components in **TypeScript** (recommended) or **JavaScript**. Choose your approach:

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">Quick Start - Direct File Approach</logo-header>

Add a `.ts` or `.js` file to `src/scripts/` in your web project:

```
your-project/
└── src/
    └── scripts/
        └── MyFirstScript.ts  ← Add your component here
```

**Benefits:**
- ✅ Simple and direct
- ✅ Perfect for small projects
- ✅ Automatic hot reload

### <logo-header logo="/imgs/unity-logo.webp" alt="Unity">Unity - NPM Definition Approach</logo-header>

Organize code into reusable npm packages using NPM Definition files:

1. In Unity: `Create > NPM Definition`
2. Right-click the NpmDef: `Create > TypeScript`
3. Write your component

**Benefits:**
- ✅ Modular code organization
- ✅ Share code between projects
- ✅ Standard npm package format

[Learn more about NPM Definitions →](./project-structure.html#npm-definition-files)

### Auto-Generation & Hot Reload

**What happens automatically:**
- 🔄 **C# stubs** (Unity) or **Blender panels** regenerate on file save
- ⚡ **Hot reload** in browser—no Unity recompilation needed
- 🚀 **Instant iteration**—see changes in ~1 second

:::tip Multiple Components Per File
You can export multiple components from one file:

```ts
export class MyComponent1 extends Behaviour { }
export class MyComponent2 extends Behaviour { }
```
:::

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


## <logo-header logo="/imgs/needle-logo.webp" alt="three.js">Component Architecture</logo-header>

Components attach to **three.js Object3D** instances (similar to Unity's GameObject):

- Access the Object3D: `this.gameObject`
- Access the scene: `this.context.scene`
- Access components: `this.gameObject.getComponent(Type)`

:::warning Visibility & Active State
Setting `visible = false` on an Object3D acts like Unity's `SetActive(false)`:
- Disables **all** components on this object and its children
- **No** update events called until `visible = true` again
- To hide visually without affecting components, disable the `Renderer` component instead
:::

## Lifecycle Methods

Lifecycle methods are **only called if declared**. Don't add empty `update()` methods—they impact performance!

| Method | When Called | Use For |
| --- | --- | --- |
| `awake()` | Component created | Initial setup, references |
| `onEnable()` | Component enabled | Subscribe to events |
| `start()` | First frame after creation | Initialization logic |
| `earlyUpdate()` | Before default update | Pre-update calculations |
| `update()` | Every frame | Main logic loop |
| `lateUpdate()` | After all updates | Follow cameras, final adjustments |
| `onBeforeRender()` | Just before render | Last-minute visual updates |
| `onAfterRender()` | After render | Post-processing logic |
| `onDisable()` | Component disabled | Unsubscribe from events |
| `onDestroy()` | Component/Object destroyed | Cleanup resources |

:::tip Performance Best Practice
Only implement lifecycle methods you actually need. Empty `update()` loops on many components hurt performance!
:::

## <logo-header logo="/imgs/rapier-physics-logo.webp" alt="Rapier">Physics Event Methods</logo-header>

Respond to physics collisions and triggers (powered by Rapier physics engine):

| Method | Parameters | When Called |
| --- | --- | --- |
| `onCollisionEnter` | `col: Collision` | Rigidbody **starts** colliding with another |
| `onCollisionStay` | `col: Collision` | Rigidbody **continues** colliding |
| `onCollisionExit` | `col: Collision` | Rigidbody **stops** colliding |
| `onTriggerEnter` | `col: Collision` | Collider **enters** a trigger zone |
| `onTriggerStay` | `col: Collision` | Collider **stays** in a trigger zone |
| `onTriggerExit` | `col: Collision` | Collider **exits** a trigger zone |

## Input Event Methods

Handle pointer/touch/controller interactions:

| Method | Parameters | When Called |
| --- | --- | --- |
| `onPointerEnter` | `args: PointerEventData` | Cursor **starts** hovering (object or children) |
| `onPointerMove` | `args: PointerEventData` | Cursor **moves** over object (or children) |
| `onPointerExit` | `args: PointerEventData` | Cursor **stops** hovering |
| `onPointerDown` | `args: PointerEventData` | Cursor **pressed** (mouse/touch down) |
| `onPointerUp` | `args: PointerEventData` | Cursor **released** |
| `onPointerClick` | `args: PointerEventData` | Cursor **clicked** (down + up on same object) |

:::tip Cross-Platform Input
These events work across **desktop, mobile, and VR**—no need to handle different input types separately!
:::

## XR Event Methods

Build immersive AR/VR experiences with WebXR:

| Method | Parameters | When Called |
| --- | --- | --- |
| `supportsXR` | `mode: XRSessionMode` | **Optional:** Filter which XR modes to support (`immersive-vr`, `immersive-ar`) |
| `onBeforeXR` | `mode: XRSessionMode`<br/>`init: XRSessionInit` | Before XR session starts (modify init options) |
| `onEnterXR` | `args: NeedleXREventArgs` | Component **enters** XR session |
| `onUpdateXR` | `args: NeedleXREventArgs` | Every frame **during** XR session |
| `onLeaveXR` | `args: NeedleXREventArgs` | Component **exits** XR session |
| `onControllerAdded` | `args: NeedleXRControllerEventArgs` | VR controller **connected** or component joins session with controllers |
| `onControllerRemoved` | `args: NeedleXRControllerEventArgs` | VR controller **disconnected** or component becomes inactive |

### Global XR Events

For global XR session events (outside components):

| Event | Type | Description |
| --- | --- | --- |
| `"needle-xrsession-start"` | `CustomEvent` | XR session starts (`details.session` = `NeedleXRSession`) |
| `"needle-xrsession-end"` | `CustomEvent` | XR session ends (`details.session` = `NeedleXRSession`) |
| `onXRSessionStart` | Hook | Global hook for session start (unsubscribe with `offXRSessionStart`) |

**Example:**
```ts
// Using CustomEvent
window.addEventListener("needle-xrsession-start", (evt) => {
    console.log("XR Session started:", evt.detail.session);
});

// Using global hook
onXRSessionStart((args) => {
    console.log("XR Session started:", args.session);
});
```


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




## Lifecycle Hooks

Use hooks to receive callbacks at specific moments during the engine lifecycle. Hooks can be inserted **anywhere** in your web application:
- Top-level scope in `main.ts`
- Inside Svelte/React/Vue components
- Inside `<script type="module">` in `index.html`

| Hook | When Called | Options |
| --- | --- | --- |
| `onInitialized` | Context initialized (before first frame) | `{ once?: boolean }` |
| `onStart` | After components `start()` | `{ once?: boolean }` |
| `onUpdate` | After components `update()` | `{ once?: boolean }` |
| `onBeforeRender` | Before render call | `{ once?: boolean }` |
| `onAfterRender` | After render call | `{ once?: boolean }` |
| `onClear` | Before engine context cleared | `{ once?: boolean }` |
| `onDestroy` | Before context destroyed | `{ once?: boolean }` |

:::tip Unsubscribe
Every hook returns an unsubscribe function. Store it and call it later to stop receiving callbacks!
:::

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




### GameObject Methods

**Component management and scene queries:**

| Method | Parameters | Description |
| --- | --- | --- |
| `instantiate` | `(Object3D, InstantiateOptions?)` | Create new instance with all components cloned |
| `destroy` | `(Object3D \| Component)` | Destroy component or Object3D and its components |
| `addNewComponent` | `(Object3D, Type)` | Create and add component (calls `awake()` and `onEnable()`) |
| `addComponent` | `(Object3D, Component)` | Move existing component instance to object |
| `removeComponent` | `(Component)` | Remove component from its Object3D |
| **Query single** | | |
| `getComponent` | `(Object3D, Type)` | Find first component of type on object |
| `getComponentInChildren` | `(Object3D, Type)` | Find first component in children (recursive) |
| `getComponentInParent` | `(Object3D, Type)` | Find first component in parents (recursive) |
| `findObjectOfType` | `(Type)` | Find first component of type in entire scene |
| **Query multiple** | | |
| `getComponents` | `(Object3D, Type)` | Get all components of type on object |
| `getComponentsInChildren` | `(Object3D, Type)` | Get all components of type in children (recursive) |
| `getComponentsInParent` | `(Object3D, Type)` | Get all components of type in parents (recursive) |
| `findObjectsOfType` | `(Type)` | Get all components of type in entire scene |

:::warning Performance Tip
`findObjectOfType` and `findObjectsOfType` search the **entire scene**. Cache results or use local queries (`getComponent*`) when possible!
:::


## <logo-header logo="/imgs/threejs-logo.webp" alt="three.js">three.js</logo-header> & <logo-header logo="/imgs/html-logo.webp" alt="HTML">HTML DOM</logo-header>

The three.js scene lives inside a custom HTML web component: `<needle-engine>`

**Access the DOM:**
- From components: `this.context.domElement`
- From hooks: `onStart(context => context.domElement)`
- HTML file: See `index.html` in your project

**Why this matters:**
- Embed Needle Engine **anywhere** on your webpage
- Overlay HTML elements on top of 3D scenes
- Style the canvas with CSS
- Mix 3D and 2D content seamlessly 

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

### Time & Delta Time

Access time data via `this.context.time`:

| Property | Type | Description |
| --- | --- | --- |
| `time` | `number` | Scaled time since app started (affected by `timeScale`) |
| `deltaTime` | `number` | Time since last frame (use for smooth animations) |
| `frameCount` | `number` | Total frames rendered since app started |
| `realtimeSinceStartup` | `number` | Unscaled time since app started (ignores `timeScale`) |
| `timeScale` | `number` | Time multiplier (default `1.0`, set to `0.5` for slow-motion) |

:::tip Frame-Rate Independent Movement
Always multiply movement by `deltaTime` for smooth, frame-rate independent animation:
```ts
this.gameObject.position.x += speed * this.context.time.deltaTime;
```
:::

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


## Debug Gizmos

The static `Gizmos` class draws debug visualizations in your scene. Perfect for debugging!

**Features:**
- All functions accept options for colors, duration, and more
- Internally cached and reused for performance
- Visible in development, easily toggled off for production

| Method | Parameters | Description |
| --- | --- | --- |
| `DrawLabel` | `(text, position, options?)` | Text label with optional background (returns handle for updates) |
| `DrawRay` | `(origin, direction, options?)` | Infinite ray line from origin in direction |
| `DrawDirection` | `(origin, direction, options?)` | Direction arrow from origin |
| `DrawLine` | `(from, to, options?)` | Line between two worldspace points |
| `DrawWireSphere` | `(center, radius, options?)` | Wireframe sphere |
| `DrawSphere` | `(center, radius, options?)` | Solid sphere |
| `DrawWireBox` | `(center, size, options?)` | Wireframe box |
| `DrawWireBox3` | `(box3, options?)` | Wireframe box from Box3 object |
| `DrawArrow` | `(from, to, options?)` | Arrow between two points |

:::tip Common Options
```ts
{
  color?: ColorRepresentation,  // Line/shape color
  duration?: number,             // How long to display (seconds)
  depthTest?: boolean           // Whether to occlude behind objects
}
```
:::


## <logo-header logo="/imgs/gltf-logo.webp" alt="gltf">Serialization / Components in glTF files</logo-header>
To embed components and recreate components with their correct types in glTF, we also need to save non-primitive types (everything that is not a ``Number``, ``Boolean`` or ``String``). You can do so is adding a ``@serializable(<type>)`` decorator above your field or property. 

**Example:**
@[code ts twoslash](@code/component-object-reference.ts)

To serialize from and to custom formats, it is possible to extend from the ``TypeSerializer`` class and create an instance. Use ``super()`` in the constructor to register supported types.  

> **Note**: In addition to matching fields, matching properties will also be exported when they match to fields in the typescript file. 

## Loading Scenes
Referenced Prefabs, SceneAssets and AssetReferences (Unity's Addressable System) will automatically be exported as glTF files (please refer to the [Export Prefabs](export.md) documentation). In Blender referenced Scenes will be exported as glTF files. 

These exported gltf files will be serialized as plain string URIs. To simplify loading these from TypeScript components use the [``AssetReference``](https://engine.needle.tools/docs/api/AssetReference) class. An AssetReference can be loaded at runtime and allow to defer loading parts of your app or loading external content or glTF files at any point.

**Example:**
@[code ts twoslash](@code/component-prefab.ts)

AssetReferences are cached by URI, so if you reference the same exported glTF/Prefab in multiple components/scripts it will only be loaded once and then re-used.  

# Next Steps
