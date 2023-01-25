import { Behaviour } from "@needle-tools/engine";
import { IPointerClickHandler, PointerEventData } from "@needle-tools/engine/engine-components/ui/PointerEvents";

export class ClickExample extends Behaviour implements IPointerClickHandler {

    // Make sure to have an ObjectRaycaster component in the parent hierarchy
    onPointerClick(_args: PointerEventData) {
        console.log("Clicked", this.name);
    }
}
