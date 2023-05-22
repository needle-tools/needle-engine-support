---
title: Needle Engine for Unity Developers
---

Needle Engine provides a tight integration into the Unity Editor. This allows developers and designers alike to work together in a familiar environment and deliver fast, performant and lightweight web-experiences.  

The following guide is mainly aimed at developers with a Unity3D background but it may also be useful for developers with a web or three.js background. It covers topics regarding how things are done in Unity vs in three.js or Needle Engine.

If you are all new to Typescript and Javascript and you want to dive into writing scripts for Needle Engine then we also recommend reading the [Typescript Essentials Guide](./typescript-essentials) for a basic understanding between the differences between C# and Javascript/Typescript.

If you want to code-along with the following examples without having to install anything you just click the following link to [spin-up a StackBlitz virtual environment](https://stackblitz.com/fork/github/needle-engine/vite-template?file=src%2Fmain.ts).

## The Basics
Needle Engine is a 3d web engine running on-top of [three.js](https://threejs.org/). Three.js is one of the most popular 3D webgl based rendering libraries for the web. Whenever we refer to a `gameObject` in Needle Engine we are *actually* also talking about a three.js `Object3D`, the base type of any object in three.js. Both terms can be used interchangeably. Any `gameObject` *is* a `Object3D`.   

This also means that - if you are already familiar with three.js - you will have no problem at all using Needle Engine. Everything you can do with three.js can be done in Needle Engine as well. If you are already using certain libraries then you will be able to also use them in a Needle Engine based environment. You are free to use as much or as little of our for your development as you like.


:::details How to create a new Unity project with Needle Engine? (Video)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />  
:::

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

## Components
Needle Engine is making heavy use of a Component System that is similar to that of Unity. This means that you can add or remove components to any `Object3D` / `GameObject` in the scene. A component will be registered to the engine when using `addNewComponent(<Object3D>, <ComponentType>)`.   
The event methods that the attached component will then automatically be called by the engine (e.g. `update` or `onBeforeRender`)    

#### Finding Components in the Scene
For getting component you can use the familiar methods similar to Unity. Note that the following uses the `Animator` type as an example but you can as well use any component type that is either built-in or created by you.
| Method name | Desciption |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | Get the `Animator` component on a GameObject/Object3D. It will either return the `Animator` instance if it has an Animator component or `null` if the object has no such componnent. |
| `this.gameObject.getComponentInChildren(Animator)` | Get the first `Animator` component on a GameObject/Object3D or on any of its children
| `this.gameObject.getComponentsInParents(Animator)` | Get all animator components in the parent hierarchy (including the current GameObject/Object3D)

These methods are also available on the static GameObject type. For example ``GameObject.getComponent(this.gameObject, Animator)`` to get the `Animator` component on a passed in GameObject/Object3D. 

To search the whole scene for one or multiple components you can use ``GameObject.findObjectOfType(Animator)`` or `GameObject.findObjectsOfType(Animator)`.

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
Use ``this.context.physics.raycast()`` to perform a raycast. If you dont pass in any options the raycast is performed from the mouse position (or first touch position) in screenspace using the currently active `mainCamera`. You can also pass in a `RaycastOptions` object that has various settings like `maxDistance`, the camera to be used or the layers to be tested against.

Use ``this.context.physics.raycastFromRay(your_ray)`` to perform a raycast using a [three.js ray](https://threejs.org/docs/#api/en/math/Ray)

## Input
Use ``this.context.input`` to poll input state:

```ts
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update(){
        if(this.context.input.getPointerDown(0)){
            // CLICKED
        }
    }
}
```

You can also subscribe to events in the ``InputEvents`` enum like so:
```ts
import { Behaviour, InputEvents } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    start(){
        this.context.input.addEventListener(InputEvents.PointerDown, evt => {
            console.log(evt);
        });
    }
}
```

You can also subscribe to browser events. For example to receive mouse clicks:
```ts
export class MyScript extends Behaviour
{
    start(){
        window.addEventListener("click", () => {
            console.log("MOUSE CLICK");
        });
    }
}
```


## Subscribing to Events

Any component can dispatch events by calling ``this.dispatchEvent()``, see [javascript documentation](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent).  
Vice-versa you can subscribe to any component ``this.otherComponent.addEventListener("someEvent", ...)``    

Any ``EventList`` / ``UnityEvent`` will automatically also be dispatched as a event. For example if your field is ``myEvent : EventList`` it will be dispatched as ``my-event``.

*The following example shows how to subscribe to the [three.js OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) events* 

```ts
import { Behaviour, GameObject, OrbitControls } from "@needle-tools/engine";

export class OrbitEventExample extends Behaviour {
    start() {
        const orbit = GameObject.findObjectOfType(OrbitControls);

        // Usually you want to subscribe and unsubscribe to events in onEnable and onDisable
        // But for the purpose of this example we will just subscribe inside the start() method:

        // Variant 1: subscribe using arrow syntax (have a look at how this.onStarted is declared below)
        orbit?.controls?.addEventListener("start", this.onStarted);
    
        // Variant 2: subscribe with binding a method (this is what happens implictly when using arrow functions)
        orbit?.controls?.addEventListener("end", this.onEnded.bind(this));

        // Variant 3: subscribe with inline function. With this variant you can not unsubscribe from the event (e.g. when the component gets destroyed or disabled)
        orbit?.controls?.addEventListener("change", args => {
            console.log("CHANGE");
        });

    }

    // Variant 1
    onStarted = (args) => {
        console.log("STARTED", args, this);
    }

    // Variant 2 When subscribing to an event with this signature make sure to bind the method, otherwise `this` will be undefined
    onEnded(args) {
        console.log("ENDED", args, this);
    }
}
```


## InputSystem callbacks
Similar to Unity (see [IPointerClickHandler in Unity](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html)) you can also register to receive input events
> **Note**: Make sure your object has a ``ObjectRaycaster`` or ``GraphicRaycaster`` component in the parent hierarchy

```ts
import { Behaviour, IPointerEventHandler, PointerEventData } from "@needle-tools/engine";

export class ReceiveClickEvent extends Behaviour implements IPointerEventHandler {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```


## Exporting VideoClips

Generate a C# component that takes a list of VideoClips. VideoClips are on export copied to the output directory and your typescript component receives a list of relative paths to the videos (e.g. ``["assets/myVideo1.mp4", "assets/myOtherVideo.mp4"]``)

You can also use the ``VideoPlayer`` component if you just want to playback some video.

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

declare type VideoClip = string;

export class MyVideos extends Behaviour {

    @serializable(null)
    videos?: Array<VideoClip>;

    video? : VideoClip;

    start(){
        console.log(this);
    }
}
```


## Managing Dependencies
In C# you usually work with a solution containing one or many projects. In Unity this solution is managed by Unity for you and when you open a C# script it opens the project and shows you the file.   
You usually install Packages using Unity's built-in package manager to add features provided by either Unity or other developers (either on your team or e.g. via Unity's AssetStore). Unity does a great job of making adding and managing packages easy with their PackageManager and you might never have had to manually edit a file like the `manifest.json` (this is what Unity uses to track which packages are installed) or run a command from the command line to install a package.

In a web environment you use `npm` - the Node Package Manager - to manage dependencies / packages for you. It does basically the same to what Unity's PackageManager does - it installs (downloads) packages from *some* server (you hear it usually called a *registry* in that context) and puts them inside a folder named `node_modules`.     

When working with a web project most of you dependencies are installed from [npmjs.com](https://npmjs.com/). It is the most popular package registry out there for web projects.  

#### Installing
To install a dependency from npm you can open your web project in a commandline (or terminal) and run `npm i @needle-tools/engine`. This will then add the package to the `package.json` inside the `dependencies` array.  
Here is an example of how such a package.json might look like: 
```json
{
  "name": "my-needle-engine-project",
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

Note that there are two separate entries here that relate to *a dependency*. One is `dependencies` and the other is `devDependencies`. The crucial difference between the two is that `dependencies` are always installed (or bundled) while `devDependencies` are **only** installed when developing the project and otherwise **not** be included in your *bundled*  application (a *bundle* is basically all your code that is required to run your application inside one javascript file to be uploaded to a web server. It is "final" and you can think of it as maybe the `exe`, `app` or a `dll` of your application) 


# Learning more

- [Scripting in Needle Engine](../scripting)
- [Typescript Essentials](./typescript-essentials.md)
- [Component Reference](../component-reference.md)

