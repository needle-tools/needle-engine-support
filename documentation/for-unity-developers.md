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
- ``this.gameObject.position`` - local space [position ⇡](https://threejs.org/docs/?q=obj#api/en/core/Object3D.position)
- ``this.gameObject.rotation`` - local space [rotation in euler angles ⇡](https://threejs.org/docs/?q=obj#api/en/core/Object3D.rotation)
- ``this.gameObject.quaternion`` - local space rotation as [quaternion ⇡](https://threejs.org/docs/?q=obj#api/en/core/Object3D.quaternion)
- ``this.gameObject.scale`` - local space [scale ⇡](https://threejs.org/docs/?q=obj#api/en/core/Object3D.scale)


### Time
Use ``this.context.time`` to get access to time data. For example ``this.context.time.deltaTime``


### Raycasting
Use ``this.context.physics.raycast()`` to perform a raycast from the mouse position (by default).  
Use ``this.context.physics.raycastFromRay(your_ray)`` to perform a raycast using a [threejs ray ⇡](https://threejs.org/docs/#api/en/math/Ray)

### Input
Use ``this.context.input`` to poll input state 

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

### InputSystem callbacks
Similar to Unity (see [IPointerClickHandler in Unity](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html)) you can also register to receive input events
> **Note**: For this to work your object must have for example a ``ObjectRaycaster`` or ``GraphicRaycaster`` component in the parent hierarchy

```ts
import { Behaviour } from "@needle-tools/engine";
import { IPointerEventHandler, PointerEventData } from "@needle-tools/engine/engine-components/ui/PointerEvents";

export class ReceiveClickEvent extends Behaviour implements IPointerEventHandler {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```


### Exporting VideoClips

Generate a C# component that takes a list of VideoClips. VideoClips are on export copied to the output directory and your typescript component receives a list of relative paths to the videos (e.g. ``["assets/myVideo1.mp4", "assets/myOtherVideo.mp4"]``)

```ts
import { Behaviour, serializeable } from "@needle-tools/engine";

declare type VideoClip = string;

export class MyVideos extends Behaviour {

    @serializeable(null)
    videos?: Array<VideoClip>;

    video? : VideoClip;

    start(){
        console.log(this);
    }
}
```
