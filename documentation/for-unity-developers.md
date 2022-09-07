# Needle Engine for Unity Developers

> **Note**: This page is under construction. 

Below you can find some common code examples that help you getting familiar when coming from Unity and starting to dive into web development with Needle Engine. 


Please also refer to the [Typescript reference ⇡](https://www.typescriptlang.org/docs/) for syntax and general language questions!  


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
