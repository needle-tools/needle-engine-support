import { Behaviour, serializable, Animation } from "@needle-tools/engine";
import { IPointerClickHandler, PointerEventData } from "@needle-tools/engine/src/engine-components/ui/PointerEvents";

export class PlayAnimationOnClick extends Behaviour implements IPointerClickHandler {

    @serializable(Animation)
    animation?: Animation;

    awake() {
        if (this.animation) {
            this.animation.playAutomatically = false;
            this.animation.loop = false;
        }
    }

    onPointerClick(_args: PointerEventData) {
        if (this.animation) {
            this.animation.play();
        }
    }
}