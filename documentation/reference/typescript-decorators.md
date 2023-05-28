---
title: Typescript Decorators
---

The following table contains available Typescript decorators that Needle Engine provides.  
 
You can think of them as Attributes on steroids (if you are familiar with C#) - they can be added to classes, fields or methods in Typescript to provide additional functionality. 

|  |  | 
| --- | --- |
| **Field & Property Decorators** | |
| `@serializable()` | Add to exposed / serialized fields. Is used when loading glTF files that have been exported with components from Unity or Blender. |
| `@syncField()` | Add to a field to network the value when it changes. You can pass in a method to be called when the field changes |
| `@validate()` | Add to receive callbacks in the component event method `onValidate` whenever the value changes. This behaves similar to Unity's onValidate. |
| **Method Decorators** | |
| `@prefix(<type>)` (experimental) | Can be used to easily inject custom code into other components. See the [example below](#prefix) |
| **Class Decorators** | |
| `@registerType` | No argument. Can be added to a custom component class to be registered to the Needle Engine types and to enable hot reloading support. |


## Examples


### Serializable

```ts
export class ButtonObject extends Behaviour {
    // you can omit the type if it's a primitive 
    // e.g. Number, String or Bool
    @serializable()
    myNumber: number = 42;

    // otherwise add the concrete type that you want to serialize to
    @serializable(EventList)
    onClick?: EventList;

    @serializable(SomeComponentType)
    myComponent: SomeComponentType;

    // Note that for arrays you still add the concrete type (not the array)
    @serializable(Object3D)
    myObjects: Object3D[];
}
```


### SyncField
```ts
export class MyScript extends Behaviour {

    @syncField(MyScript.prototype.onNumberChanged)
    @serializable()
    myNumber: number = 42;

    private onNumberChanged(newValue : number, oldValue : number){
        console.log("Number changed from ", oldValue, "to", newValue)
    }
}
```


### Validate
```ts
export class MyScript extends Behaviour {

    @validate()
    @serializable()
    myNumber?: number;

    start() { setInterval(() => this.myNumber = Math.random(), 1000) }

    onValidate(fieldName: string) {
        console.log("Validate", fieldName, this.myNumber);
    }
}
```


### Prefix
```ts
import { Camera } from "@needle-tools/engine";
class YourClass {
    @prefix(Camera)
    awake() {
        // this is now called before the Camera.awake method runs
        console.log("Hello camera:", this)
    }
}
```