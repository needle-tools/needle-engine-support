import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three"

export class MyClass extends Behaviour {
    // this will be a "Transform" field in Unity
    @serializable(Object3D) 
    myObjectReference: Object3D | null = null;
} 