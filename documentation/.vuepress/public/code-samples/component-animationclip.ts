import { Behaviour, serializable } from "@needle-tools/engine";
import { AnimationClip } from "three"

export class ExportAnimationClip extends Behaviour {

    @serializable(AnimationClip)
    animation?: AnimationClip;

    awake() {
        console.log("My referenced animation clip", this.animation);
    }
}