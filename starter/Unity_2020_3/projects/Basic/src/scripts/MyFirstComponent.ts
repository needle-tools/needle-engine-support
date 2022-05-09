import { Behaviour, GameObject } from "needle.tiny.engine/engine-components/Component";
import { EventList } from "needle.tiny.engine/engine-components/EventList";
import { IPointerClickHandler, PointerEventData } from "needle.tiny.engine/engine-components/ui/PointerEvents";
import { Mathf } from "needle.tiny.engine/engine/engine_math";
import { serializeable } from "needle.tiny.engine/engine/engine_serialization_decorator";
import { Object3D } from "three";

export class MyFirstComponent extends Behaviour implements IPointerClickHandler {
    @serializeable(EventList)
    onClick?: EventList;

    onPointerClick(evt: PointerEventData) {
        console.log("CLICKED", this, evt);
        this.onClick?.invoke();
    }
}

export class RandomizeScale extends Behaviour {
    @serializeable(Object3D)
    target?: Object3D;

    minScale: number = .1;
    maxScale: number = .3;

    ranomizeScaleNow() {
        const scale = Mathf.lerp(this.minScale, this.maxScale, Math.random());
        if (this.target) {
            this.target.scale.set(scale, scale, scale);
        }
    }
}