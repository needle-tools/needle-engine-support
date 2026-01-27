---
title: Scripting Introduction for Unity Developers
---

# <logo-header logo="/imgs/unity-logo.webp" alt="Unity">For Unity Developers</logo-header>

From <logo-header logo="/imgs/unity-logo.webp" alt="Unity"></logo-header><logo-header logo="/imgs/csharp-logo.webp" alt="C#">Unity</logo-header> to <logo-header logo="/imgs/threejs-logo.webp" alt="three.js">three.js</logo-header> with <logo-header logo="/imgs/needle-logo.webp" alt="Needle Engine">Needle Engine</logo-header>

Needle Engine provides tight integration with the Unity Editor, allowing developers and designers to work together in a familiar environment and deliver **fast, performant, and lightweight web experiences**.

**Who is this guide for?**
- Unity developers learning web development
- Web developers understanding Needle Engine's Unity integration
- Teams bridging Unity and three.js workflows

:::tip New to TypeScript?
Read the [TypeScript Essentials Guide](./typescript-essentials.html) for key differences between C# and TypeScript/JavaScript.
:::

:::tip Try It Now
Create a project in your browser: [engine.needle.tools/new](https://engine.needle.tools/new) ⚡
:::

## The Basics

### <logo-header logo="/imgs/threejs-logo.webp" alt="three.js">Built on three.js</logo-header>

Needle Engine is a 3D web engine built on [three.js](https://threejs.org/), one of the most popular WebGL rendering libraries.

**Key concept:** In Needle Engine, a `gameObject` **is** a three.js `Object3D`. These terms are interchangeable.

**Benefits:**
- Full three.js compatibility - use any three.js code or library
- Access to the entire three.js ecosystem
- No learning curve if you already know three.js

:::important How Needle Engine Works
Needle Engine does **NOT** compile C# code to WebAssembly.

**Instead:**
- Unity defines scene structure, components, and data
- Export process converts to glTF format
- TypeScript/JavaScript powers runtime behavior

**Why?** Fast iteration speed and maximum flexibility for web experiences. Read more: [Vision](../../explanation/core-concepts/vision) • [Technical Overview](../../explanation/architecture/technical-overview)
::: 


:::details How to create a new Unity project with Needle Engine? (Video)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />  
:::

## Creating a Component

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">Unity (C#)</logo-header> vs <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">Needle Engine (TypeScript)</logo-header>

| Unity (C#) | Needle Engine (TypeScript) |
| --- | --- |
| ```csharp<br/>using UnityEngine;<br/>public class MyComponent : MonoBehaviour {<br/>}<br/>``` | ```typescript<br/>import { Behaviour } from "@needle-tools/engine";<br/>export class MyComponent extends Behaviour {<br/>}<br/>``` |
| Derives from `MonoBehaviour` | Derives from `Behaviour` |
| Compiled C# | Interpreted TypeScript/JavaScript |
| Unity manages lifecycle | Needle Engine manages lifecycle |
## Script Fields

### serializable
If you have seen some Needle Engine scripts then you might have noticed that some variables are annotated with `@serializable` above their declaration. This is a Decorator in Typescript and can be used to modify or annotate code. In Needle Engine this is used for example to let the core serialization know which types we expect in our script when it converts from the raw component information stored in the glTF to a Component instance.   
Consider the following example: 
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

class SomeClass extends Behaviour{
    @serializable(Behaviour)
    myOtherComponent?: Behaviour;
    @serializable(Object3D)
    someOtherObject?: Object3D;
}
```
This tells Needle Engine that `myOtherComponent` should be of type `Behaviour`. It will then automatically assign the correct reference to the field when your scene is loaded. The same is true for `someOtherObject` where we want to deserialize to an `Object3D` reference.  

Note that in some cases the type can be ommitted. This can be done for all [primitive types in Javascript](https://developer.mozilla.org/en-US/docs/Glossary/Primitive). These are `boolean`, `number`, `bigint`, `string`, `null` and `undefined`.
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    @serializable() // < no type is needed here because the field type is a primitive
    myString?: string;
}
```

### public vs private
Field without any accessor modified like `private`, `public` or `protected` will by default be `public` in javascript  
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    /// no accessor means it is public:
    myNumber?: number;
    // explicitly making it private:
    private myPrivateNumber?: number;
    protected myProtectedNumber?: number;
}
```
The same is true for methods as well.

## GameObjects and the Scene
To access the current scene from a component you use `this.scene` which is equivalent to `this.context.scene`, this gives you the root three.js scene object.

To traverse the hierarchy from a component you can either iterate over the children of an object   
with a for loop:  
```ts twoslash
for (let i = 0; i < this.gameObject.children; i++) {
    console.log(this.gameObject.children[i]);
}
```
or you can iterate using the `foreach` equivalent:
```ts twoslash
for (const child of this.gameObject.children) {
    console.log(child);
}
```
You can also use three.js specific methods to quickly iterate all objects recursively using the [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse) method:  
```ts twoslash
import { GameObject } from "@needle-tools/engine";
//---cut-before---
this.gameObject.traverse((obj: GameObject) => console.log(obj))
```
or to just traverse visible objects use [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) instead.

Another option that is quite useful when you just want to iterate objects being renderable you can query all renderer components and iterate over them like so:   
```ts twoslash
import { Renderer } from "@needle-tools/engine";

for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
For more information about getting components see the next section.

## Components
Needle Engine is making heavy use of a Component System that is similar to that of Unity. This means that you can add or remove components to any `Object3D` / `GameObject` in the scene. A component will be registered to the engine when using `addNewComponent(<Object3D>, <ComponentType>)`.   
The event methods that the attached component will then automatically be called by the engine (e.g. `update` or `onBeforeRender`). A full list of event methods can be found in the [lifecycle methods reference](../../reference/api/lifecycle-methods)    

#### Finding Components in the Scene
For getting component you can use the familiar methods similar to Unity. Note that the following uses the `Animator` type as an example but you can as well use any component type that is either built-in or created by you.
| Method name | Desciption |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | Get the `Animator` component on a GameObject/Object3D. It will either return the `Animator` instance if it has an Animator component or `null` if the object has no such componnent. |
| `this.gameObject.getComponentInChildren(Animator)` | Get the first `Animator` component on a GameObject/Object3D or on any of its children
| `this.gameObject.getComponentsInParents(Animator)` | Get all animator components in the parent hierarchy (including the current GameObject/Object3D)

These methods are also available on the static GameObject type. For example ``GameObject.getComponent(this.gameObject, Animator)`` to get the `Animator` component on a passed in GameObject/Object3D. 

To search the whole scene for one or multiple components you can use ``GameObject.findObjectOfType(Animator)`` or `GameObject.findObjectsOfType(Animator)`.

## Type Mappings: Unity → Needle Engine

Some Unity types are mapped to different names in Needle Engine:

| Unity Type | Needle Engine Type | Notes |
| --- | --- | --- |
| `UnityEvent` | `EventList` | Use `@serializable(EventList)` to deserialize |
| `GameObject` | `Object3D` | Same as three.js `Object3D` |
| `Transform` | `Object3D` | No separate Transform component (except `RectTransform`) |
| `Color` | `RGBAColor` | Custom type with alpha channel (three.js `Color` has no alpha) |

:::tip Key Difference
In Unity, `GameObject` and `Transform` are separate. In three.js/Needle Engine, they're the **same object**.
:::

## Transform Properties

Transform data is accessed directly on `GameObject`/`Object3D` (no separate Transform component):

| Property | Space | Type | three.js docs |
| --- | --- | --- | --- |
| `position` | **Local** | `Vector3` | [position](https://threejs.org/docs/#api/en/core/Object3D.position) |
| `worldPosition` | World | `Vector3` | (calculated) |
| `rotation` | **Local** | `Euler` | [rotation](https://threejs.org/docs/#api/en/core/Object3D.rotation) |
| `worldRotation` | World | `Euler` | (calculated) |
| `quaternion` | **Local** | `Quaternion` | [quaternion](https://threejs.org/docs/#api/en/core/Object3D.quaternion) |
| `worldQuaternion` | World | `Quaternion` | (calculated) |
| `scale` | **Local** | `Vector3` | [scale](https://threejs.org/docs/#api/en/core/Object3D.scale) |
| `worldScale` | World | `Vector3` | (calculated) |

:::warning Unity vs three.js
**Major difference:** In Unity, `position` is **world space** by default. In three.js/Needle Engine, `position` is **local space**.

Use `worldPosition` for world space coordinates!
:::

### WORLD- Position, Rotation, Scale...

In three.js (and thus also in Needle Engine) the `object.position`, `object.rotation`, `object.scale` are all local space coordinates. This is different to Unity where we are used to `position` being worldspace and using `localPosition` to deliberately use the local space position.  

If you want to access the world coordinates in Needle Engine we have utility methods that you can use with your objects. Call `getWorldPosition(yourObject)` to calculate the world position. Similar methods exist for rotation/quaternion and scale. To get access to those methods just import them from Needle Engine like so `import { getWorldPosition } from "@needle.tools/engine"`

Note that these utility methods like `getWorldPosition`, `getWorldRotation`, `getWorldScale` internally have a buffer of Vector3 instances and are meant to be used locally only. This means that you should not cache them in your component, otherwise your cached value will eventually be overriden. But it is safe to call `getWorldPosition` multiple times in your function to make calculations without having to worry to re-use the same instance. If you are not sure what this means you should take a look at the **Primitive Types** section in the [Typescript Essentials Guide](./typescript-essentials.md#primitive-types)

## Time & Delta Time

Access time data via `this.context.time`:

| Property | Unity Equivalent | Description |
| --- | --- | --- |
| `time` | `Time.time` | Scaled time since app started |
| `deltaTime` | `Time.deltaTime` | Time since last frame |
| `frameCount` | `Time.frameCount` | Total frames rendered |
| `realtimeSinceStartup` | `Time.realtimeSinceStartup` | Unscaled time since start |
| `timeScale` | `Time.timeScale` | Time multiplier (default `1.0`) |

:::tip Frame-Rate Independent Movement
Always multiply movement by `deltaTime`:
```ts
this.gameObject.position.x += speed * this.context.time.deltaTime;
```
:::


## Raycasting
Use ``this.context.physics.raycast()`` to perform a raycast and get a list of intersections. If you dont pass in any options the raycast is performed from the mouse position (or first touch position) in screenspace using the currently active `mainCamera`. You can also pass in a `RaycastOptions` object that has various settings like `maxDistance`, the camera to be used or the layers to be tested against.

Use ``this.context.physics.raycastFromRay(your_ray)`` to perform a raycast using a [three.js ray](https://threejs.org/docs/#api/en/math/Ray)

Note that the calls above are by default raycasting against visible scene objects. That is different to Unity where you always need colliders to hit objects. The default three.js solution has both pros and cons where one major con is that it can perform quite slow depending on your scene geometry. It may be especially slow when raycasting against skinned meshes. It is therefor recommended to usually set objects with SkinnedMeshRenderers in Unity to the `Ignore Raycast` layer which will then be ignored by default by Needle Engine as well.   

Another option is to use the physics raycast methods which will only return hits with colliders in the scene. 

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Here is a editable [example for physics raycast](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)

## Input
Use ``this.context.input`` to poll input state:

```ts twoslash
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
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable(){
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }
    onDisable() {
        // it is recommended to also unsubscribe from events when your component becomes inactive
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    inputPointerDown = (evt: NEPointerEvent) => { console.log(evt); }
}
```

If you want to handle inputs yourself you can also subscribe to [all events the browser provides](https://developer.mozilla.org/en-US/docs/Web/Events) (there are a ton). For example to subscribe to the browsers click event you can write:
```ts twoslash
window.addEventListener("click", () => { console.log("MOUSE CLICK"); });
```
Note that in this case you have to handle all cases yourself. For example you may need to use different events if your user is visiting your website on desktop vs mobile vs a VR device. These cases are automatically handled by the Needle Engine input events (e.g. `PointerDown` is raised both for mouse down, touch down and in case of VR on controller button down).


## InputSystem Callbacks
Similar to Unity (see [IPointerClickHandler in Unity](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html)) you can also register to receive input events on the component itself.

```ts twoslash
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class ReceiveClickEvent extends Behaviour {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```

Available pointer events for all components:
- `onPointerDown`
- `onPointerUp`
- `onPointerEnter`
- `onPointerMove`
- `onPointerExit`
- `onPointerClick`

All have a `PointerEventData` argument describing the event.

## Debug.Log
The `Debug.Log()` equivalent in javascript is `console.log()`. You can also use `console.warn()` or `console.error()`.  
```ts twoslash
import { GameObject, Renderer } from "@needle-tools/engine";
const someVariable = 42;
// ---cut-before---

console.log("Hello web");
// You can pass in as many arguments as you want like so:
console.log("Hello", someVariable, GameObject.findObjectOfType(Renderer), this.context);
```

## Debug Gizmos

### Unity vs Needle Engine

| Unity | Needle Engine |
| --- | --- |
| `OnDrawGizmos()` method | Call `Gizmos` from **anywhere** |
| `OnDrawGizmosSelected()` | Use `if(isDevEnvironment())` to filter |
| Only in Editor | Visible in browser (filter for production!) |

**Example:** Draw a red wire sphere for 1 second
```ts
import { Gizmos, isDevEnvironment } from "@needle-tools/engine";

if (isDevEnvironment()) {
    Gizmos.DrawWireSphere(hit.point, 0.05, 0xff0000, 1);
}
```

### Available Gizmo Methods

| Method | Description |
| --- | --- |
| `DrawArrow` | Arrow between two points |
| `DrawBox` | Wireframe box |
| `DrawBox3` | Wireframe Box3 |
| `DrawDirection` | Direction arrow from origin |
| `DrawLine` | Line between two points |
| `DrawRay` | Infinite ray from origin |
| `DrawSphere` | Solid sphere |
| `DrawWireSphere` | Wireframe sphere |

[See full Gizmos API](../../how-to-guides/scripting/use-gizmos)


## Useful Utility Methods

Import from `@needle-tools/engine`:

| Method | Returns | Description |
| --- | --- | --- |
| `getParam(name)` | `string \| boolean` | Get URL parameter value (e.g., `?debug=1` or `?flag`) |
| `isMobileDevice()` | `boolean` | Check if running on mobile device |
| `isDevEnvironment()` | `boolean` | Check if running on local dev server |
| `isiOS()` | `boolean` | Check if running on iOS |
| `isSafari()` | `boolean` | Check if running in Safari |
| `isMozillaXR()` | `boolean` | Check if running in Mozilla XR Viewer |

**Examples:**
```ts
import { getParam, isMobileDevice, isDevEnvironment } from "@needle-tools/engine";

// Check URL parameter
if (getParam("debug")) {
    console.log("Debug mode enabled");
}

// Platform detection
if (isMobileDevice()) {
    // Mobile-specific logic
}

// Development vs production
if (isDevEnvironment()) {
    // Show debug UI, gizmos, etc.
}
```

## Web Projects & Package Management

### <logo-header logo="/imgs/unity-logo.webp" alt="Unity">Unity</logo-header> vs <logo-header logo="/imgs/npm-logo.webp" alt="npm">Web Development</logo-header>

| Concept | Unity | Web (Needle Engine) |
| --- | --- | --- |
| **Package Manager** | Unity Package Manager (UPM) | <logo-header logo="/imgs/npm-logo.webp" alt="npm">npm</logo-header> (Node Package Manager) |
| **Package Registry** | Unity Registry / Asset Store | [npmjs.com](https://npmjs.com/) |
| **Package List** | `manifest.json` (auto-managed) | `package.json` (editable) |
| **Install Location** | `Packages/` | `node_modules/` |
| **Install Command** | Unity UI | `npm install <package>` |

**Key difference:** In Unity, package management is mostly GUI-based. In web development, you use the command line (`npm`) or edit `package.json` directly.    

Here is an example of how a package.json might look like: 
```json
{
  "name": "@optional_org/package_name",
  "version": "1.0.0",
  "scripts": {
    "start": "vite --host"
  },
  "dependencies": {
	  "@needle-tools/engine": "^3.5.9-beta",
	  "three": "npm:@needle-tools/three@0.146.8"
	},
  "devDependencies": {
	  "@types/three": "0.146.0",
	  "@vitejs/plugin-basic-ssl": "^1.0.1",
	  "typescript": "^5.0.4",
	  "vite": "^4.3.4",
	  "vite-plugin-compression": "^0.5.1"
	}
}
```

### <logo-header logo="/imgs/vite-logo.webp" alt="Vite">Build Tool & Frameworks</logo-header>

Our default template uses **Vite** as its bundler and has no frontend framework pre-installed. Needle Engine is unopinionated about which framework to use - work with whatever you prefer!

**Supported frameworks:**
- Vue.js, Svelte, Next.js, React, React Three Fiber
- [See framework samples](https://engine.needle.tools/samples/?tag=framework)

## Installing packages & dependencies
To install a dependency from npm you can open your web project in a commandline (or terminal) and run `npm i <the/package_name>` (shorthand for `npm install`)  
For example run `npm i @needle-tools/engine` to install [Needle Engine](https://www.npmjs.com/package/@needle-tools/engine). This will then add the package to your `package.json` to the `dependencies` array.  
To install a package as a devDependency only you can run `npm i --save-dev <package_name>`. More about the difference between dependencies and devDependencies below.    

### What's the difference between 'dependencies' and 'devDependencies'
You may have noticed that there are two entries containing *dependency* - `dependencies` and `devDependencies`.   

`dependencies` are **always installed** (or bundled) when either your web project is installed or in cases where you develop a library and your package is installed as a dependency of another project.  

`devDependencies` are **only** installed when developing the project (meaning that when you directly run `install` in the specific directory) and they are otherwise **not** included in your project.


### How do I install another package or dependency and how to use it?
The [Installing](#installing) section taught us that you can install dependencies by running `npm i <package_name>` in your project directory where the `package_name` can be any package that you find on [npm.js](https://npmjs.org).

Let's assume you want to add a tweening library to your project. We will use [`@tweenjs/tween.js`](https://www.npmjs.com/package/@tweenjs/tween.js) for this example. [Here](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts) is the final project if you want to jump ahead and just see the result.

First run `npm install @tweenjs/tween.js` in the terminal and wait for the installation to finish. This will add a new entry to our package.json:  
```json
"dependencies": {
    "@needle-tools/engine": "^3.5.11-beta",
    "@tweenjs/tween.js": "^20.0.3",
    "three": "npm:@needle-tools/three@0.146.8"
}
```    

Then open one of your script files in which you want to use tweening and import at the top of the file:   
```ts twoslash
import * as TWEEN from '@tweenjs/tween.js';
```
Note that we do here import all types in the library by writing `* as TWEEN`. We could also just import specific types like `import { Tween } from @tweenjs/tween.js`.   

Now we can use it in our script. It is always recommended to refer to the documentation of the library that you want to use. In the case of tween.js they provide a [user guide](https://github.com/tweenjs/tween.js/blob/HEAD/docs/user_guide.md) that we can follow. Usually the Readme page of the package on npm contains information on how to install and use the package.   

To rotate a cube we create a new component type called `TweenRotation`, we then go ahead and create our tween instance for the object rotation, how often it should repeat, which easing to use, the tween we want to perform and then we start it. We then only have to call `update` every frame to update the tween animation. The final script looks like this:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
import * as TWEEN from '@tweenjs/tween.js';

export class TweenRotation extends Behaviour {

    // save the instance of our tweener
    private _tween?: TWEEN.Tween<any>; 

    start() {
        const rotation = this.gameObject.rotation;
        // create the tween instance
        this._tween = new TWEEN.Tween(rotation);
        // set it to repeat forever
        this._tween.repeat(Infinity);
        // set the easing to use
        this._tween.easing(TWEEN.Easing.Quintic.InOut);
        // set the values to tween
        this._tween.to({ y: Math.PI * 0.5 }, 1000);
        // start it
        this._tween.start();
    }
    
    update() {
        // update the tweening every frame
        // the '?' is a shorthand for checking if _tween has been created
        this._tween?.update();
    }
}
```
Now we only have to add it to any of the objects in our scene to rotate them forever.   
You can see the final script in action [here](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts).


# Learning more

- [Creating Components](../../how-to-guides/scripting/create-components)
- [Typescript Essentials](./typescript-essentials)
- [Component Reference](../../reference/components)

