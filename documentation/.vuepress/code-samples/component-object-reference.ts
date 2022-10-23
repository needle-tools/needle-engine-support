import { Behaviour, serializeable } from "@needle-tools/engine";
import { Object3D } from "three"

export class MyClass extends Behaviour {
    // this will be a "Transform" field in Unity
    @serializeable(Object3D) 
    myObjectReference: Object3D | null = null;
} 