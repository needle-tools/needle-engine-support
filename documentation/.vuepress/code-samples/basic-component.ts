import { Behaviour, serializeable } from "@needle-tools/engine"
import { Object3D } from "three"

export class MyComponent extends Behaviour {

    @serializeable(Object3D)
    myObjectReference?: Object3D;

    start() {
        console.log("Hello world", this);
    }

    update() {
        // called every frame
    }
}