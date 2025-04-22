import { Behaviour, serializable, EventList } from "@needle-tools/engine";
import { Object3D } from "three";

/*
Make sure to have a c# file in your project with the following content:

using UnityEngine;
using UnityEngine.Events;

[System.Serializable]
public class MyCustomUnityEvent : UnityEvent<string>
{
}

Unity documentation about custom events: 
https://docs.unity3d.com/ScriptReference/Events.UnityEvent_2.html

*/

// Documentation → https://docs.needle.tools/scripting

export class CustomEventCaller extends Behaviour {

    // The next line is not just a comment, it defines 
    // a specific type for the component generator to use.

    //@type MyCustomUnityEvent
    @serializable(EventList)
    myEvent!: EventList;

    // just for testing - could be when a button is clicked, etc.
    start() {
        this.myEvent.invoke("Hello");
    }
}

export class CustomEventReceiver extends Behaviour {

    logStringAndObject(str: string) {
        console.log("From Event: ", str);
    }
}