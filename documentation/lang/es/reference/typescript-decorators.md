---
title: "@serializable y otros decoradores"
---

La siguiente tabla contiene los decoradores de Typescript disponibles que Needle Engine proporciona.

Puedes pensar en ellos como Atributos con esteroides (si estás familiarizado con C#) - se pueden añadir a clases, campos o métodos en Typescript para proporcionar funcionalidad adicional.

|  |  |
| --- | --- |
| **Decoradores de Campo y Propiedad** | |
| `@serializable()` | Añadir a campos expuestos / serializados. Se utiliza al cargar archivos glTF que han sido exportados con componentes desde Unity o Blender. |
| `@syncField()` | Añadir a un campo para sincronizar su valor en red cuando cambie. Puedes pasar un método que se llamará cuando el campo cambie. |
| `@validate()` | Añadir para recibir callbacks en el método de evento del componente `onValidate` siempre que el valor cambie. Esto se comporta de forma similar al `onValidate` de Unity. |
| **Decoradores de Método** | |
| `@prefix(<type>)` (experimental) | Puede utilizarse para inyectar fácilmente código personalizado en otros componentes. Opcionalmente, devuelve `false` para evitar que se ejecute el método original. Consulta el [ejemplo siguiente](#prefix). |
| **Decoradores de Clase** | |
| `@registerType` | Sin argumento. Se puede añadir a una clase de componente personalizada para registrarla en los tipos de Needle Engine y habilitar el soporte de recarga en caliente. |

## Ejemplos

### Serializable

```ts twoslash
import { Behaviour, serializable, EventList } from "@needle-tools/engine";
import { Object3D } from "three";

export class SomeComponentType extends Behaviour {}

export class ButtonObject extends Behaviour {
    // you can omit the type if it's a primitive
    // e.g. Number, String or Bool
    // puedes omitir el tipo si es un primitivo
    // por ejemplo, Number, String o Bool
    @serializable()
    myNumber: number = 42;

    // otherwise add the concrete type that you want to serialize to
    // de lo contrario, añade el tipo concreto al que quieres serializar
    @serializable(EventList)
    onClick?: EventList;

    @serializable(SomeComponentType)
    myComponent?: SomeComponentType;

    // Note that for arrays you still add the concrete type (not the array)
    // Ten en cuenta que para los arrays sigues añadiendo el tipo concreto (no el array)
    @serializable(Object3D)
    myObjects?: Object3D[];
}
```

### SyncField

El decorador `@syncField` se puede utilizar para sincronizar automáticamente propiedades de tus componentes en red para todos los usuarios (visitantes de tu sitio web) conectados a la misma sala de networking. Opcionalmente, puede tomar una función de callback que se invocará siempre que el valor cambie.

- Para notificar al sistema que un valor de referencia (como un objeto o un array) ha cambiado, necesitas reasignar el campo. Por ejemplo, así: `myField = myField`
- La función de callback *no* puede ser una función flecha (por ejemplo, `MyScript.prototype.onNumberChanged` funciona para `onNumberChanged() { ... }` pero no para `myNumberChanged = () => { ... }`)

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
[Ejemplo en vivo](https://stackblitz.com/edit/needle-engine-prefix-example?file=src%2Fmain.ts)
```ts twoslash
import { Camera, prefix } from "@needle-tools/engine";
class YourClass {
    @prefix(Camera) // < this is type that has the method you want to change
    // < este es el tipo que tiene el método que quieres cambiar
    awake() { // < this is the method name you want to change
        // < este es el nombre del método que quieres cambiar

        // this is now called before the Camera.awake method runs
        // NOTE: `this` does now refer to the Camera instance and NOT `YourClass` anymore. This allows you to access internal state of the component as well
        // esto se llama ahora antes de que se ejecute el método Camera.awake
        // NOTA: `this` ahora se refiere a la instancia de Camera y NO a `YourClass`. Esto te permite acceder también al estado interno del componente
        console.log("Hello camera:", this)
        // optionally return false if you want to prevent the default behaviour
        // opcionalmente devuelve false si quieres evitar el comportamiento por defecto
    }
}
```


Página traducida automáticamente con IA