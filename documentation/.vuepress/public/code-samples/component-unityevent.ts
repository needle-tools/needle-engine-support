import { Behaviour, serializable, EventList } from "@needle-tools/engine"

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent? : EventList;

    start() {
        this.myEvent?.invoke();
    }
}