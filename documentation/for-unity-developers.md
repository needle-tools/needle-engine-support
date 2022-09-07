# Needle Engine for Unity Developers

> **Note**: This page is under construction. 

Below you can find some common code examples that help you getting familiar when coming from Unity and starting to dive into web development with Needle Engine. 


Please also refer to the [Typescript reference ⇡](https://www.typescriptlang.org/docs/) for syntax and general language questions!  


### Components
For getting component you can use the familiar methods similar to Unity:   
For example 
- ``this.gameObject.getComponent(Animator)`` - returns the animator component on this gameobject (and null if none is found)
- ``this.gameObject.getComponentInChildren(Animator)`` - returns the first animator component in the child hierarchy
- ``this.gameObject.getComponentsInParents(Animator)`` - returns all animator components in the parent hierarchy (including the current gameObject)
   
These methods are also available on the static GameObject type.   
For example: ``GameObject.getComponent(this.gameObject, Animator)``.   
Search in the whole scene by calling ``GameObject.findObjectOfType(Animator)``

### Transform
Transform data can be accessed on the [threejs Object3D ⇡](https://threejs.org/docs/#api/en/core/Object3D) (we also call it GameObject) directly. Unlike to Unity there is no extra transform component. 
- ``this.gameObject.position`` - local space position
- ``this.gameObject.rotation`` - local space rotation in euler angles
- ``this.gameObject.quaternion`` - local space rotation as quaternion
- ``this.gameObject.scale`` - local space scale

### Events
```ts
import { Behaviour, GameObject } from "@needle-tools/engine";
import { OrbitControls } from "@needle-tools/engine/engine-components/OrbitControls";

export class OrbitEventExample extends Behaviour {
    start() {
        const orbit = GameObject.findObjectOfType(OrbitControls);

        orbit?.controls?.addEventListener("start", args => {
            this.onStarted(args);
        });

        orbit?.controls?.addEventListener("change", args => {
            console.log("CHANGE");
        });

        orbit?.controls?.addEventListener("end", args => {
            this.onEnded(args);
        });

    }

    onStarted(args) {
        console.log("STARTED", args);
    }

    onEnded(args) {
        console.log("ENDED", args);
    }
}
```

### Input

```ts
export class MyScript extends Behaviour
{
    update(){
        if(this.context.input.getPointerDown(0)){
            // CLICKED
        }
    }
}
```

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
