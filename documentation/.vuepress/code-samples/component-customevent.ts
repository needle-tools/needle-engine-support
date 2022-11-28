import { Behaviour, EventList, GameObject, serializeable } from "@needle-tools/engine";

// Documentation → https://docs.needle.tools/scripting

export class CustomEventCaller extends Behaviour {

    // The next line is not just a comment, it defines 
    // a specific type for the component generator to use.

    //@type(UnityEngine.Events.UnityEvent<string, UnityEngine.GameObject>)
    @serializeable(EventList)
    myEvent: EventList;

    // just for testing - could be when a button is clicked, etc.
    start() {
        this.myEvent.invoke("Hello", this.gameObject);
    }
}

export class CustomEventReceiver extends Behaviour {

    logStringAndObject(str : string, go : GameObject) {
        console.log("From Event: ", str, go);
    }
}
