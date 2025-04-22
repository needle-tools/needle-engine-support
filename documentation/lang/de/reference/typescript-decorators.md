---
title: "@serializable und andere Decorators"
---

Die folgende Tabelle enthält verfügbare Typescript Decorators, die von Needle Engine bereitgestellt werden.

Sie können sie sich wie Attribute auf Steroiden vorstellen (falls Sie mit C# vertraut sind) – sie können zu Klassen, Feldern oder Methoden in Typescript hinzugefügt werden, um zusätzliche Funktionalität bereitzustellen.

|  |  |
| --- | --- |
| **Feld- & Eigenschafts-Decorators** | |
| `@serializable()` | Fügen Sie dies zu exponierten / serialisierten Feldern hinzu. Wird verwendet, wenn glTF-Dateien geladen werden, die mit Komponenten aus Unity oder Blender exportiert wurden. |
| `@syncField()` | Fügen Sie dies zu einem Feld hinzu, um den Wert über das Netzwerk zu synchronisieren, wenn er sich ändert. Sie können eine Methode übergeben, die aufgerufen wird, wenn sich das Feld ändert. |
| `@validate()` | Fügen Sie dies hinzu, um Rückrufe in der Komponenten-Event-Methode `onValidate` zu erhalten, wann immer sich der Wert ändert. Dies verhält sich ähnlich wie Unitys onValidate. |
| **Methoden-Decorators** | |
| `@prefix(<type>)` (experimentell) | Kann verwendet werden, um einfach benutzerdefinierten Code in andere Komponenten zu injizieren. Geben Sie optional `false` zurück, um die Ausführung der ursprünglichen Methode zu verhindern. Siehe das [Beispiel unten](#prefix) |
| **Klassen-Decorators** | |
| `@registerType` | Kein Argument. Kann zu einer benutzerdefinierten Komponentenklasse hinzugefügt werden, um für die Needle Engine Typen registriert zu werden und Hot-Reloading-Unterstützung zu ermöglichen. |


## Beispiele


### Serializable

```ts twoslash
import { Behaviour, serializable, EventList } from "@needle-tools/engine";
import { Object3D } from "three";

export class SomeComponentType extends Behaviour {}

export class ButtonObject extends Behaviour {
    // you can omit the type if it's a primitive
    // e.g. Number, String or Bool
    // Sie können den Typ weglassen, wenn es ein primitiver Typ ist
    // z.B. Number, String oder Bool
    @serializable()
    myNumber: number = 42;

    // otherwise add the concrete type that you want to serialize to
    // Andernfalls fügen Sie den konkreten Typ hinzu, in den Sie serialisieren möchten
    @serializable(EventList)
    onClick?: EventList;

    @serializable(SomeComponentType)
    myComponent?: SomeComponentType;

    // Note that for arrays you still add the concrete type (not the array)
    // Beachten Sie, dass Sie bei Arrays immer noch den konkreten Typ (nicht das Array) hinzufügen
    @serializable(Object3D)
    myObjects?: Object3D[];
}
```


### SyncField

Der `@syncField` Decorator kann verwendet werden, um Eigenschaften Ihrer Komponenten für alle Benutzer (Besucher Ihrer Website), die mit demselben Netzwerk-Raum verbunden sind, automatisch über das Netzwerk zu synchronisieren. Er kann optional eine Rückruffunktion entgegennehmen, die aufgerufen wird, wann immer sich der Wert ändert.

- Um dem System mitzuteilen, dass sich ein Referenzwert (wie ein Objekt oder ein Array) geändert hat, müssen Sie das Feld neu zuweisen. Z.B. so: `myField = myField`
- Die Rückruffunktion *darf keine* Pfeilfunktion sein (z.B. `MyScript.prototype.onNumberChanged` funktioniert für `onNumberChanged() { ... }`, aber nicht für `myNumberChanged = () => { ... }`)

```ts twoslash
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
```ts twoslash
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
[Live-Beispiel](https://stackblitz.com/edit/needle-engine-prefix-example?file=src%2Fmain.ts)
```ts twoslash
import { Camera, prefix } from "@needle-tools/engine";
class YourClass {
    @prefix(Camera) // < this is type that has the method you want to change
    // < Dies ist der Typ, der die Methode enthält, die Sie ändern möchten
    awake() { // < this is the method name you want to change
        // < Dies ist der Name der Methode, die Sie ändern möchten

        // this is now called before the Camera.awake method runs
        // NOTE: `this` does now refer to the Camera instance and NOT `YourClass` anymore. This allows you to access internal state of the component as well
        // Dies wird nun aufgerufen, bevor die Methode Camera.awake ausgeführt wird
        // HINWEIS: `this` bezieht sich nun auf die Camera-Instanz und NICHT mehr auf `YourClass`. Dies ermöglicht Ihnen den Zugriff auf den internen Zustand der Komponente
        console.log("Hello camera:", this)
        // optionally return false if you want to prevent the default behaviour
        // Geben Sie optional false zurück, wenn Sie das Standardverhalten verhindern möchten
    }
}
```
Page automatically translated using AI