import { Behaviour, GameObject } from "needle.tiny.engine/engine-components/Component";
import { EventList } from "needle.tiny.engine/engine-components/EventList";
import { Renderer } from "needle.tiny.engine/engine-components/Renderer";
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
        this.targetScale = Mathf.lerp(this.minScale, this.maxScale, Math.random());
    }

    private targetScale : number = 1;

    awake(){
        this.targetScale = this.target?.scale.x ?? 1;
    }

    update(){
        if (this.target) {
            const scale = Mathf.lerp(this.target.scale.x, this.targetScale, this.context.time.deltaTime / .1);
            this.target.scale.set(scale, scale, scale);
        }
    }
}


export class RandomizeColor extends Behaviour
{

    private renderers : Renderer[] = [];

    start(){
        this.renderers = GameObject.getComponentsInChildren(this.gameObject, Renderer);
        for(const rend of this.renderers){
            rend.material = rend.material.clone();
        }
    }

    randomizeColor(){
        for(const rend of this.renderers){
            const mat = rend.material;
            if(mat){
                if(!mat["color"]) continue;
                const col = mat["color"];
                col.r = Math.random();
                col.g = Math.random();
                col.b = Math.random();
            }
        }
    }
}