import { Behaviour, serializable, Animation, IPointerClickHandler, PointerEventData } from "@needle-tools/engine";

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