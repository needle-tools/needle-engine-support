---
title: Needle Engine for Unity Developers
---

Needle Engine provides a tight integration into the Unity Editor. This allows developers and designers alike to work together in a familiar environment and deliver fast, performant and lightweight web-experiences.  

The following guide is mainly aimed at developers with a Unity3D background but it may also be useful for developers with a web or three.js background. It tries to cover some basics in Typescript and Javascript, differences to C# and then dives into topics of how certain things are done in Unity vs in three.js or Needle Engine.

### The Basics
Needle Engine is a 3d web engine running on-top of [three.js](https://threejs.org/). Three.js is one of the most popular 3D webgl based rendering libraries for the web. Whenever we refer to a `gameObject` in Needle Engine we are *actually* also talking about a three.js `Object3D`, the base type of any object in three.js. Both terms can be used interchangeably. Any `gameObject` *is* a `Object3D`.   

This also means that - if you are already familiar with three.js - you will have no problem at all using Needle Engine. Everything you can do with three.js can be done in Needle Engine as well. You are free to use as much or as little of the Needle Engine framework for your development as you like.

### Key differences between C#, Javascript or Typescript

#### Compile Time and Runtime

**CSharp** or **C#** is a statically typed & compiled language. It means that **before** your code can run (or be executed) it has to be compiled - translated - into IL or CIL, an intermediate language that is a little closer to *machine code*. The important bit to understand here is that your code is analyzed and has to pass certain checks and rules that are **enforced** by the compiler. You will get compiler errors **in Unity** and your application not even start running if you write code that violates any of the rules of the C# language. You will not be able to enter Play-Mode with compiler errors.

**Javascript** on the other hand is interpreted at runtime. That means you can write code that is not valid and cause errors - but you will not see those errors *until your program runs* or tries to **execute** exactly that line that has the error. For example you can write `var points = 100; points += "hello world";` and nobody will complain *until* you run the code in a browser.

**Typescript** is a language designed by Microsoft that **compiles to javascript**  
It adds a lot of features like for example **type-safety**. That means when you write code in Typescript you *can* declare types and hence get errors at *compile-time* when you try to e.g. make invalid assignments or call methods with unexpected types. Read more about types in Javascript and Typescript below. 

#### Types — or the lack thereof

**Vanilla Javascript** does (as of today) **not** have any concept of *types*: there is no guarantuee that a variable that you declared as `let points = 100` will still be a *number* later in your application. That means that in Javascript it is perfectly valid code to assign `points = new Vector3(100, 0, 0);` later in your code. Or even `points = null` or `points = myRandomObject` - you get the idea. This is all OK while you write the code **but** it may crash horrible when your code is executed because later you write `points -= 1` and **now** you get errors in the browser when your application is already running.

As mentioned above **Typescript** was created to help fix that problem by adding syntax for defining types.   

It is important to understand that you *basically* still write Javascript when you write Typescript and while it *is* possible to circumvent all type checking and safety checks by e.g. adding ``//@ts-ignore`` above a erroneous line or defining all types as ``any`` this is **definitely not recommneded**. Types are here to help you find errors before they actually happen. You really dont want to deploy your website to your server only to later get reports from users or visitors telling you your app crashed while it was running. 

While *vanilla Javascript* does not offer types you can still add type-annotations to your javascript variables, classes and methods by using **[JSDoc](https://jsdoc.app/)**.

### Variables

In C# you write variables either by using the type or the `var` keyword.   
For example you can either write `int points = 100;`  
or alternatively use `var` and let the compiler figure out the correct type for you: `var points = 100`

In Javascript or Typescript you have two modern options to declaring a variable.  
For a variable that you plan to re-assign use `let`, for example `let points = 100;`  
For a variable that you do not want to be able to re-assign use `const`, for example `const points = 100;`  
> *Be aware of var*   
  You might come across the `var` keyword in javascript as well but it is not recommended to use it and the modern replacement for it is `let`. Learn more about [var vs let](https://stackoverflow.com/a/11444416).

Please note that you *can* still assign values to variables declared with const if they are (for example) a custom type. Consider the following example:  

```ts
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition.x = 100; // Assigning x is perfectly fine
```
The above is perfectly fine Typescript code because you don't re-assign `myPosition` but only the `x` member of `myPosition`. On the other hand the following example would **not**  be allowed and cause a runtime or typescript error:  
```ts
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition = new Vector3(100, 0, 0); // ⚠ ASSIGNING TO CONST IS NOT ALLOWED
```

### Using or Importing Types

In Unity you usually add `using` statements at the top of you code to import specific namespaces from Assemblies that are references in your project or - in certain cases - you migth find yourself importing a specific type with a name from a namespace.   
See the following example:
```csharp
using UnityEngine;
// importing just a specific type and giving it a name
using MonoBehaviour = UnityEngine.MonoBehaviour;
```

This is how you do the same in Typescript to import specific types from a package:
```ts
import { Vector3 } from `three`
import { Behaviour } from `@needle-tools/engine`
```

You *can* also import all the types from a specific package by giving it a name which you might see here and there:
```ts
import * as THREE from `three`
const myVector : THREE.Vector3 = new THREE.Vector3(1, 2, 3);
```

### Primitive Types
*Vector2, Vector3, Vector4...*  
If you have a C# background you might be familiar with the difference between a class and a struct. While a class is a reference type a struct is a custom value type. Meaning it is, depending on the context, allocated on the stack and when being passed to a method by default a copy is created.   
Consider the following example in C#:

```csharp
void MyCallerMethod(){
    var position = new Vector3(0,0,0);
    MyExampleVectorMethod(position);
    UnityEngine.Debug.Log("Position.x is " + position.x); // Here x will be 0
}
void MyExampleVectorMethod(Vector3 position){
    position.x = 42;
}
```

A method is called with a Vector3 named position. Inside the method the passed in vector `position` is modified: x is set to 42. But in C# the original vector that is being passed into this method (see line 2) is **not** changed and x will **still** be 0 (line 4).  

The same is not true for Javascript/Typescript. Here we don't have custom value types, meaning if you come across a Vector in Needle Engine or three.js you will always have a reference type.   
Consider the following example in typescript:  
```ts
import { Vector3 } from "three"
function myCallerMethod() : void {
    const position = new Vector(0,0,0);
    myExampleVectorMethod(position);
    console.log("Position.x is " + position.x); // Here x will be 42
}
function myExampleVectorMethod(position: Vector3) : void {
    position.x = 42;
}
```
Do you see the difference? Because vectors and all custom objects *are* in fact reference types we will have modified the original `position` variable (line 3) and x is now 42.  


### Vector Maths and Operators

While in C# you can use operator overloading this is not available in Javascript unfortunately. This means that while you can multiply a Vector3 in C# like this: 

```csharp
var myFirstVector = new Vector3(1,1,1);
var myFactor = 100f;
myFirstVector *= myFactor;
// → myFirstVector is now 100, 100, 100
```

you have to use a method on the `Vector3.prototype` to archieve the same result (just with a  little more boilerplate code)

```ts
const myFirstVector : Vector3 = new Vector3(1, 1, 1)
const myFactor = 100f;
myFirstVector.multiplyScalar(myFactor);
// → myFirstVector is now 100, 100, 100
```


### Components
Needle Engine is making heavy use of a Component System that is similar to that of Unity.

For getting component you can use the familiar methods similar to Unity:   
For example 
- ``this.gameObject.getComponent(Animator)`` - returns the animator component on this gameobject (and null if none is found)
- ``this.gameObject.getComponentInChildren(Animator)`` - returns the first animator component in the child hierarchy
- ``this.gameObject.getComponentsInParents(Animator)`` - returns all animator components in the parent hierarchy (including the current gameObject)
   
These methods are also available on the static GameObject type.   
For example: ``GameObject.getComponent(this.gameObject, Animator)``.   
Search in the whole scene by calling ``GameObject.findObjectOfType(Animator)``

### Transform
Transform data can be accessed on the [three.js Object3D](https://threejs.org/docs/#api/en/core/Object3D) (we also call it GameObject) directly. Unlike to Unity there is no extra transform component. 
- ``this.gameObject.position`` - local space [position](https://threejs.org/docs/?q=obj#api/en/core/Object3D.position)
- ``this.gameObject.rotation`` - local space [rotation in euler angles](https://threejs.org/docs/?q=obj#api/en/core/Object3D.rotation)
- ``this.gameObject.quaternion`` - local space rotation as [quaternion](https://threejs.org/docs/?q=obj#api/en/core/Object3D.quaternion)
- ``this.gameObject.scale`` - local space [scale](https://threejs.org/docs/?q=obj#api/en/core/Object3D.scale)

#### World Position, Rotation, Scale...

In three.js (and thus also in Needle Engine) the `object.position`, `object.rotation`, `object.scale` are all local space coordinates. This is different to Unity where we are used to `position` being worldspace and using `localPosition` to deliberately use the local space position.  

If you want to access the world coordinates in Needle Engine we have utility methods that you can use with your objects. Call `getWorldPosition(yourObject)` to calculate the world position. Similar methods exist for rotation/quaternion and scale.


### Time
Use ``this.context.time`` to get access to time data. For example ``this.context.time.deltaTime``


### Raycasting
Use ``this.context.physics.raycast()`` to perform a raycast from the mouse position (by default).  
Use ``this.context.physics.raycastFromRay(your_ray)`` to perform a raycast using a [three.js ray](https://threejs.org/docs/#api/en/math/Ray)

### Input
Use ``this.context.input`` to poll input state

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


### Subscribing to Events

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


### InputSystem callbacks
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


### Exporting VideoClips

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


### Managing Dependencies
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

General information about [scripting in Needle Engine can be found here](./scripting).

Please also refer to the [Typescript reference](https://www.typescriptlang.org/docs/) for syntax and general language questions!  
