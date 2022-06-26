import { Behaviour } from "needle.tiny.engine/engine-components/Component";


export class Hover extends Behaviour {

    private _offset: number = 0;

    start(){
        this._offset = Math.random() * 10;
    }

    update(){
        this.gameObject.position.y += Math.sin(this.context.time.time + this._offset) * this.context.time.deltaTime * .1;
    }
}