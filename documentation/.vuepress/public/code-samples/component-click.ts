import { Behaviour, IPointerClickHandler, PointerEventData, showBalloonMessage } from "@needle-tools/engine";

export class ClickExample extends Behaviour implements IPointerClickHandler {

    // Make sure to have an ObjectRaycaster component in the parent hierarchy
    onPointerClick(_args: PointerEventData) {
        showBalloonMessage("Clicked " + this.name);
    }
}
