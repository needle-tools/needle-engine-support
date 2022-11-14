import { Behaviour } from "@needle-tools/engine/engine-components/Component";
import { serializable } from "@needle-tools/engine/engine/engine_serialization_decorator";
import { Vector3 } from "three"

export class Rotate extends Behaviour {

    @serializable(Vector3)
    axes?: Vector3;
    randomAxes: boolean = true;
    speed: number = 1;

    start() { 
        if (this.randomAxes) {
            this.axes = new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
        }
        this.axes.normalize();
    }

    update(): void { 
        this.gameObject.rotateOnAxis(this.axes, this.context.time.deltaTime * this.speed); 
    }
}