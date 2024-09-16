---
title: "@serializable and other decorators"
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
| `@prefix(<type>)` (experimental) | Can be used to easily inject custom code into other components. Optionally return `false` to prevent the original method from being executed. See the [example below](#prefix) |
| **Class Decorators** | |
| `@registerType` | No argument. Can be added to a custom component class to be registered to the Needle Engine types and to enable hot reloading support. |


## Examples


### Serializable

```ts
import { Behaviour, serializable, EventList } from "@needle-tools/engine";
import { Object3D } from "three";
export class SomeComponentType extends Behaviour {}

export class ButtonObject extends Behaviour {
    // you can omit the type if it's a primitive 
    // e.g. Number, String or Bool
    @serializable()
    myNumber: number = 42;

    // otherwise add the concrete type that you want to serialize to
    @serializable(EventList)
    onClick?: EventList;

    @serializable(SomeComponentType)
    myComponent?: SomeComponentType;

    // Note that for arrays you still add the concrete type (not the array)
    @serializable(Object3D)
    myObjects?: Object3D[];
}
```


### SyncField

The `@syncField` decorator can be used to automatically network properties of your components for all users (visitors of your website) connected to the same networking room. It can optionally take a callback function that will be invoked whenever the value changes.     

- To notify the system that a reference value (like an object or an array) has changed you need to re-assign the field. E.g. like this: `myField = myField`   
- The callback function can *not* be an arrow function (e.g. `MyScript.prototype.onNumberChanged` works for `onNumberChanged() { ... }` but it does not for `myNumberChanged = () => { ... }`)

```ts
import { Behaviour, serializable, syncField } from "@needle-tools/engine";

export class MyScript extends Behaviour {

    @syncField(MyScript.prototype.onNumberChanged)
    @serializable()
    myNumber: number = 42;

    private onNumberChanged(newValue: number, oldValue: number){
        console.log("Number changed from ", oldValue, "to", newValue)
    }
}
```


### Validate
```ts
import { Behaviour, serializable, validate } from "@needle-tools/engine";

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
[Live example](https://stackblitz.com/edit/needle-engine-prefix-example?file=src%2Fmain.ts)
```ts
import { Camera, prefix } from "@needle-tools/engine";
class YourClass {
    @prefix(Camera) // < this is type that has the method you want to change
    awake() { // < this is the method name you want to change

        // this is now called before the Camera.awake method runs
        // NOTE: `this` does now refer to the Camera instance and NOT `YourClass` anymore. This allows you to access internal state of the component as well
        console.log("Hello camera:", this)
        // optionally return false if you want to prevent the default behaviour
    }
}
```
