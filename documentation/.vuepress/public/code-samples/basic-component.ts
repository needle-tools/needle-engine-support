import { Behaviour, serializable } from "@needle-tools/engine"
import { Object3D } from "three"

export class MyComponent extends Behaviour {

    @serializable(Object3D)
    myObjectReference?: Object3D;

    start() {
        console.log("Hello world", this);
    }

    update() {
        this.gameObject.rotateY(this.context.time.deltaTime);
    }
}