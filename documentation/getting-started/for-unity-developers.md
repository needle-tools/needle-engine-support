---
title: Scripting Introduction for Unity Developers
---

Needle Engine provides a tight integration into the Unity Editor. This allows developers and designers alike to work together in a familiar environment and deliver fast, performant and lightweight web-experiences.  

The following guide is mainly aimed at developers with a Unity3D background but it may also be useful for developers with a web or three.js background. It covers topics regarding how things are done in Unity vs in three.js or Needle Engine.

If you are all new to Typescript and Javascript and you want to dive into writing scripts for Needle Engine then we also recommend reading the [Typescript Essentials Guide](./typescript-essentials) for a basic understanding between the differences between C# and Javascript/Typescript.

If you want to code-along you can [open engine.needle.tools/new](https://engine.needle.tools/new) to create a small project that you can edit in the browser ⚡

## The Basics
Needle Engine is a 3d web engine running on-top of [three.js](https://threejs.org/). Three.js is one of the most popular 3D webgl based rendering libraries for the web. Whenever we refer to a `gameObject` in Needle Engine we are *actually* also talking about a three.js `Object3D`, the base type of any object in three.js. Both terms can be used interchangeably. Any `gameObject` *is* a `Object3D`.   

This also means that - if you are already familiar with three.js - you will have no problem at all using Needle Engine. Everything you can do with three.js can be done in Needle Engine as well. If you are already using certain libraries then you will be able to also use them in a Needle Engine based environment.

Note: **Needle Engine's Exporter does _NOT_ compile your existing C# code to Web Assembly**.   
While using Web Assembly _may_ result in better performance at runtime, it comes at a high cost for iteration speed and flexibility in building web experiences. Read more about our [vision](./vision.md) and [technical overview](./technical-overview). 


:::details How to create a new Unity project with Needle Engine? (Video)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />  
:::

## Creating a Component
In Unity you create a new component by deriving from `MonoBehaviour`:
```csharp
using UnityEngine;
public class MyComponent : MonoBehaviour { 
}
```

A custom component in Needle Engine on the other hand is written as follows:
```ts
import { Behaviour } from "@needle-tools/engine"
export class MyComponent extends Behaviour { 
}
```
## Script Fields

### serializable
If you have seen some Needle Engine scripts then you might have noticed that some variables are annotated with `@serializable` above their declaration. This is a Decorator in Typescript and can be used to modify or annotate code. In Needle Engine this is used for example to let the core serialization know which types we expect in our script when it converts from the raw component information stored in the glTF to a Component instance.   
Consider the following example: 
```ts
@serializable(Behaviour)
myOtherComponent?: Behaviour;
@serializable(Object3D)
someOtherObject?: Object3D;
```
This tells Needle Engine that `myOtherComponent` should be of type `Behaviour`. It will then automatically assign the correct reference to the field when your scene is loaded. The same is true for `someOtherObject` where we want to deserialize to an `Object3D` reference.  

Note that in some cases the type can be ommitted. This can be done for all [primitive types in Javascript](https://developer.mozilla.org/en-US/docs/Glossary/Primitive). These are `boolean`, `number`, `bigint`, `string`, `null` and `undefined`.
```ts
@serializable() // < no type is needed here because the field type is a primitive
myString?: string;
```

### public vs private
Field without any accessor modified like `private`, `public` or `protected` will by default be `public` in javascript  
```ts
/// no accessor means it is public:
myNumber?: number;
// explicitly making it private:
private myPrivateNumber?: number;
protected myProtectedNumber?: number;
```
The same is true for methods as well.

## GameObjects and the Scene
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

## Components
Needle Engine is making heavy use of a Component System that is similar to that of Unity. This means that you can add or remove components to any `Object3D` / `GameObject` in the scene. A component will be registered to the engine when using `addNewComponent(<Object3D>, <ComponentType>)`.   
The event methods that the attached component will then automatically be called by the engine (e.g. `update` or `onBeforeRender`). A full list of event methods can be found in the [scripting documentation](../scripting.md#lifecycle-methods)    

#### Finding Components in the Scene
For getting component you can use the familiar methods similar to Unity. Note that the following uses the `Animator` type as an example but you can as well use any component type that is either built-in or created by you.
| Method name | Desciption |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | Get the `Animator` component on a GameObject/Object3D. It will either return the `Animator` instance if it has an Animator component or `null` if the object has no such componnent. |
| `this.gameObject.getComponentInChildren(Animator)` | Get the first `Animator` component on a GameObject/Object3D or on any of its children
| `this.gameObject.getComponentsInParents(Animator)` | Get all animator components in the parent hierarchy (including the current GameObject/Object3D)

These methods are also available on the static GameObject type. For example ``GameObject.getComponent(this.gameObject, Animator)`` to get the `Animator` component on a passed in GameObject/Object3D. 

To search the whole scene for one or multiple components you can use ``GameObject.findObjectOfType(Animator)`` or `GameObject.findObjectsOfType(Animator)`.

## Renamed Unity Types
Some Unity-specific types are mapped to different type names in our engine. See the following list:  

| Type in Unity | Type in Needle Engine |  |
| -- | -- | -- |
| `UnityEvent` | `EventList` | A UnityEvent will be exported as a `EventList` type (use `serializable(EventList)` to deserialize UnityEvents) |
| `GameObject` | `Object3D` | |
| `Transform` | `Object3D` | In three.js and Needle Engine a GameObject and a Transform are the same (there is no `Transform` component). The only exception to that rule is when referencing a `RectTransform` which is a component in Needle Engine as well. |
| `Color` | `RGBAColor` | The three.js color type doesnt have a alpha property. Because of that all Color types exported from Unity will be exported as `RGBAColor` which is a custom Needle Engine type |

## Transform
Transform data can be accessed on the `GameObject` / `Object3D` directly. Unlike to Unity there is no extra transform component that holds this data.  
- ``this.gameObject.position`` is the [position](https://threejs.org/docs/?q=obj#api/en/core/Object3D.position) in local space
- ``this.gameObject.rotation`` is the [rotation in euler angles](https://threejs.org/docs/?q=obj#api/en/core/Object3D.rotation) in local space
- ``this.gameObject.quaternion`` - is the [quaternion](https://threejs.org/docs/?q=obj#api/en/core/Object3D.quaternion) in local space
- ``this.gameObject.scale`` - is the [scale](https://threejs.org/docs/?q=obj#api/en/core/Object3D.scale) in local space

The major difference here to keep in mind is that `position` in three.js is by default a localspace position whereas in Unity `position` would be worldspace. The next section will explain how to get the worldspace position in three.js.

### WORLD- Position, Rotation, Scale...

In three.js (and thus also in Needle Engine) the `object.position`, `object.rotation`, `object.scale` are all local space coordinates. This is different to Unity where we are used to `position` being worldspace and using `localPosition` to deliberately use the local space position.  

If you want to access the world coordinates in Needle Engine we have utility methods that you can use with your objects. Call `getWorldPosition(yourObject)` to calculate the world position. Similar methods exist for rotation/quaternion and scale. To get access to those methods just import them from Needle Engine like so `import { getWorldPosition } from "@needle.tools/engine"`

Note that these utility methods like `getWorldPosition`, `getWorldRotation`, `getWorldScale` internally have a buffer of Vector3 instances and are meant to be used locally only. This means that you should not cache them in your component, otherwise your cached value will eventually be overriden. But it is safe to call `getWorldPosition` multiple times in your function to make calculations without having to worry to re-use the same instance. If you are not sure what this means you should take a look at the **Primitive Types** section in the [Typescript Essentials Guide](./typescript-essentials.md#primitive-types)

## Time
Use `this.context.time` to get access to time data:  
- `this.context.time.time` is the time since the application started running
- `this.context.time.deltaTime` is the time that has passed since the last frame
- `this.context.time.frameCount` is the number of frames that have passed since the application started
- `this.context.time.realtimeSinceStartup` is the unscaled time since the application has started running  

It is also possible to use `this.context.time.timeScale` to deliberately slow down time for e.g. slow motion effects.


## Raycasting
Use ``this.context.physics.raycast()`` to perform a raycast and get a list of intersections. If you dont pass in any options the raycast is performed from the mouse position (or first touch position) in screenspace using the currently active `mainCamera`. You can also pass in a `RaycastOptions` object that has various settings like `maxDistance`, the camera to be used or the layers to be tested against.

Use ``this.context.physics.raycastFromRay(your_ray)`` to perform a raycast using a [three.js ray](https://threejs.org/docs/#api/en/math/Ray)

Note that the calls above are by default raycasting against visible scene objects. That is different to Unity where you always need colliders to hit objects. The default three.js solution has both pros and cons where one major con is that it can perform quite slow depending on your scene geometry. It may be especially slow when raycasting against skinned meshes. It is therefor recommended to usually set objects with SkinnedMeshRenderers in Unity to the `Ignore Raycast` layer which will then be ignored by default by Needle Engine as well.   

Another option is to use the physics raycast methods which will only return hits with colliders in the scene. 

```ts
const hit = this.context.physics.engine?.raycast();
```

Here is a editable [example for physics raycast](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)

## Input
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


## InputSystem Callbacks
Similar to Unity (see [IPointerClickHandler in Unity](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html)) you can also register to receive input events on the component itself.

To make this work make sure your object has a ``ObjectRaycaster`` or ``GraphicRaycaster`` component in the parent hierarchy.

```ts
import { Behaviour, IPointerEventHandler, PointerEventData } from "@needle-tools/engine";

export class ReceiveClickEvent extends Behaviour implements IPointerEventHandler {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```

Note: `IPointerEventHandler` subscribes the object to all possible pointer events. The handlers for them are:
- `onPointerDown`
- `onPointerUp`
- `onPointerEnter`
- `onPointerMove`
- `onPointerExit`
- `onPointerClick`

All have a `PointerEventData` argument describing the event.

## Debug.Log
The `Debug.Log()` equivalent in javascript is `console.log()`. You can also use `console.warn()` or `console.error()`.  
```ts
console.log("Hello web");
// You can pass in as many arguments as you want like so:
console.log("Hello", someVariable, GameObject.findObjectOfType(Renderer), this.context);
```

## Gizmos
In Unity you normally have to use special methods to draw Gizmos like `OnDrawGizmos` or `OnDrawGizmosSelected`. In Needle Engine on the other hand such methods dont exist and you are free to draw gizmos from anywhere in your script. Note that it is also your responsibility then to *not* draw them in e.g. your deployed web application (you can just filter them by `if(isDevEnvironment))`).  

Here is an example to draw a red wire sphere for one second for e.g. visualizing a point in worldspace
```ts
Gizmos.DrawWireSphere(hit.point, 0.05, 0xff0000, 1);
```
Here are some of the available gizmo methods:  
| Method name |  |
| --- | --- |
| `Gizmos.DrawArrow` | |
| `Gizmos.DrawBox` | |
| `Gizmos.DrawBox3` | |
| `Gizmos.DrawDirection` | |
| `Gizmos.DrawLine` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawSphere` | |
| `Gizmos.DrawWireSphere` | |


## Useful Utility Methods

Import from `@needle-tools/engine` e.g. `import { getParam } from "@needle-tools/engine"`

| Method name | Description |
| --- | --- |
| `getParam()` | Checks if a url parameter exists. Returns true if it exists but has no value (e.g. `?help`), false if it is not found in the url or is set to 0 (e.g. `?help=0`), otherwise it returns the value (e.g. `?message=test`) |
| `isMobileDevice()` | Returns true if the app is accessed from a mobile device |
| `isDevEnvironment()` | Returns true if the current app is running on a local server |
| `isMozillaXR()` | |
| `isiOS` | |
| `isSafari` | |

```ts
import { isMobileDevice } from "@needle-tools/engine"
if( isMobileDevice() )
```

```ts
import { getParam } from "@needle-tools/engine"
// returns true 
const myFlag = getParam("some_flag")
console.log(myFlag)
```

## The Web project
In C# you usually work with a solution containing one or many projects. In Unity this solution is managed by Unity for you and when you open a C# script it opens the project and shows you the file.   
You usually install Packages using Unity's built-in package manager to add features provided by either Unity or other developers (either on your team or e.g. via Unity's AssetStore). Unity does a great job of making adding and managing packages easy with their PackageManager and you might never have had to manually edit a file like the `manifest.json` (this is what Unity uses to track which packages are installed) or run a command from the command line to install a package.

In a web environment you use `npm` - the Node Package Manager - to manage dependencies / packages for you. It does basically the same to what Unity's PackageManager does - it installs (downloads) packages from *some* server (you hear it usually called a *registry* in that context) and puts them inside a folder named `node_modules`.     

When working with a web project most of you dependencies are installed from [npmjs.com](https://npmjs.com/). It is the most popular package registry out there for web projects.    

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

Our default template uses Vite as its bundler and has no frontend framework pre-installed. Needle Engine is unoppionated about which framework to use so you are free to work with whatever framework you like. We have samples for popular frameworks like Vue.js, Svelte, Next.js, React or React Three Fiber.

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
```ts
import * as TWEEN from '@tweenjs/tween.js';
```
Note that we do here import all types in the library by writing `* as TWEEN`. We could also just import specific types like `import { Tween } from @tweenjs/tween.js`.   

Now we can use it in our script. It is always recommended to refer to the documentation of the library that you want to use. In the case of tween.js they provide a [user guide](https://github.com/tweenjs/tween.js/blob/HEAD/docs/user_guide.md) that we can follow. Usually the Readme page of the package on npm contains information on how to install and use the package.   

To rotate a cube we create a new component type called `TweenRotation`, we then go ahead and create our tween instance for the object rotation, how often it should repeat, which easing to use, the tween we want to perform and then we start it. We then only have to call `update` every frame to update the tween animation. The final script looks like this:
```ts
export class TweenRotation extends Behaviour {

    // save the instance of our tweener
    private _tween?: TWEEN.Tween<any>; 

    start() {
        // create the tween instance
        this._tween = new TWEEN.Tween(this.gameObject.rotation);
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

- [Scripting in Needle Engine](../scripting)
- [Typescript Essentials](./typescript-essentials.md)
- [Component Reference](../component-reference.md)

