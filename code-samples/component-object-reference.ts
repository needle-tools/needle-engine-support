import { Behaviour, serializable, Camera } from "@needle-tools/engine";
import { Object3D } from "three"

export class MyClass extends Behaviour {
    // this will be a "Transform" field in Unity
    @serializable(Object3D) 
    myObjectReference: Object3D | null = null;
    
    // this will be a "Transform" array field in Unity
    // Note that the @serializable decorator contains the array content type! (Object3D and not Object3D[])
    @serializable(Object3D) 
    myObjectReferenceList: Object3D[] | null = null;

    // for component or other objects use the object's type
    @serializable(Camera)
    myCameraComponent: Camera | null = null;
} 
