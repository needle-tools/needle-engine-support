import { Behaviour, EventList, IPointerClickHandler, PointerEventData, serializable } from "@needle-tools/engine";

export class SyncedClick extends Behaviour implements IPointerClickHandler {

    @serializable(EventList)
    onClick!: EventList;

    onPointerClick(_args: PointerEventData) {
        console.log("SEND CLICK");
        this.context.connection.send("clicked/" + this.guid);
        this.onClick?.invoke();
    }

    onEnable(): void {
        this.context.connection.beginListen("clicked/" + this.guid, this.onRemoteClick);
    }
    onDisable(): void {
        this.context.connection.stopListen("clicked/" + this.guid, this.onRemoteClick);
    }


    onRemoteClick = () => {
        console.log("RECEIVED CLICK");
        this.onClick?.invoke();
    }
    
}