import { Behaviour, serializeable, EventList } from "@needle-tools/engine"

export class MyComponent extends Behaviour {

    @serializeable(EventList)
    myEvent? : EventList;

    start() {
        this.myEvent?.invoke();
    }
}