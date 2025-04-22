---
title: Scripting in Needle Engine
description: Diferencias, similitudes y conceptos clave de Typescript, Javascript y C#.
sidebarDepth: 2
---

La siguiente guía intenta destacar algunas de las diferencias clave entre C#, Javascript y Typescript. Esto es muy útil para desarrolladores nuevos en el ecosistema web.

Aquí hay también algunos recursos útiles para aprender a escribir Typescript:

- [Tutorial de Typescript](https://www.typescripttutorial.net/)
- [Aprende Typescript](https://www.tutorialsteacher.com/typescript)
- [Documentación de Typescript](https://www.typescriptlang.org/docs/)

### Diferencias clave entre C#, Javascript o Typescript

**CSharp** o **C#** es un lenguaje tipado estáticamente y compilado. Significa que **antes** de que tu código pueda ejecutarse, tiene que ser compilado - traducido - a IL o CIL, un lenguaje intermedio que está un poco más cerca del *código máquina*. Lo importante a entender aquí es que tu código es analizado y debe pasar ciertas comprobaciones y reglas que son **impuestas** por el compilador. Obtendrás errores del compilador **en Unity** y tu aplicación ni siquiera comenzará a ejecutarse si escribes código que viole cualquiera de las reglas del lenguaje C#. No podrás entrar en Play-Mode con errores del compilador.

**Javascript**, por otro lado, es interpretado en tiempo de ejecución. Esto significa que puedes escribir código que no es válido y causar errores, pero no verás esos errores *hasta que tu programa se ejecute* o intente **ejecutar** exactamente esa línea que tiene el error. Por ejemplo, puedes escribir `var points = 100; points += "hello world";` y nadie se quejará *hasta que* ejecutes el código en un navegador.

**Typescript** es un lenguaje diseñado por Microsoft que **compila a javascript**.
Añade muchas características como, por ejemplo, la **seguridad de tipos** (type-safety). Esto significa que cuando escribes código en Typescript, *puedes* declarar tipos y, por lo tanto, obtener errores en *tiempo de compilación* cuando intentas, por ejemplo, hacer asignaciones no válidas o llamar a métodos con tipos inesperados. Lee más sobre tipos en Javascript y Typescript a continuación.

### Tipos — o la falta de ellos

**Vanilla Javascript** (a día de hoy) **no** tiene ningún concepto de *tipos*: no hay garantía de que una variable que declaraste como `let points = 100` siga siendo un *número* más adelante en tu aplicación. Esto significa que en Javascript es un código perfectamente válido asignar `points = new Vector3(100, 0, 0);` más adelante en tu código. O incluso `points = null` o `points = myRandomObject`, te haces una idea. Todo esto está bien mientras escribes el código, **pero** puede fallar horriblemente cuando tu código se ejecute porque más adelante escribes `points -= 1` y **ahora** obtienes errores en el navegador cuando tu aplicación ya está en funcionamiento.

Como se mencionó anteriormente, **Typescript** fue creado para ayudar a solucionar ese problema añadiendo sintaxis para definir tipos.

Es importante entender que *básicamente* sigues escribiendo Javascript cuando escribes Typescript, y aunque *es* posible eludir todas las comprobaciones de tipos y de seguridad, por ejemplo, añadiendo ``//@ts-ignore`` encima de una línea errónea o definiendo todos los tipos como ``any``, esto **definitivamente no es recomendable**. Los tipos están ahí para ayudarte a encontrar errores antes de que realmente ocurran. Realmente no querrás desplegar tu sitio web en tu servidor solo para que más tarde recibas informes de usuarios o visitantes diciéndote que tu aplicación falló mientras se estaba ejecutando.

Aunque *vanilla Javascript* no ofrece tipos, todavía puedes añadir anotaciones de tipo a tus variables, clases y métodos de javascript utilizando **[JSDoc](https://jsdoc.app/)**.

### Variables

En C# escribes variables utilizando el tipo o la palabra clave `var`.
Por ejemplo, puedes escribir `int points = 100;`
o alternativamente usar `var` y dejar que el compilador descubra el tipo correcto por ti: `var points = 100`

En Javascript o Typescript tienes dos opciones modernas para declarar una variable.
Para una variable que planeas reasignar, usa `let`, por ejemplo `let points = 100;`
Para una variable que no quieres poder reasignar, usa `const`, por ejemplo `const points = 100;`
> *Ten cuidado con var*
  Puede que encuentres la palabra clave `var` también en javascript, pero no se recomienda usarla y su reemplazo moderno es `let`. Aprende más sobre [var vs let](https://stackoverflow.com/a/11444416).

Ten en cuenta que *todavía puedes* asignar valores a variables declaradas con const si son (por ejemplo) un tipo personalizado. Considera el siguiente ejemplo:

```ts twoslash
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition.x = 100; // Assigning x is perfectly fine
```
Lo anterior es código Typescript perfectamente válido porque no reasignas `myPosition`, sino solo el miembro `x` de `myPosition`. Por otro lado, el siguiente ejemplo **no** estaría permitido y causaría un error en tiempo de ejecución o de Typescript:
```ts twoslash
// @errors: 2588
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition = new Vector3(100, 0, 0); // ⚠ ASSIGNING TO CONST IS NOT ALLOWED
```

### Uso o Importación de Tipos

En Unity, normalmente añades declaraciones `using` al principio de tu código para importar espacios de nombres específicos de Assemblies que están referenciados en tu proyecto o, en ciertos casos, puede que te encuentres importando un tipo específico con un nombre desde un espacio de nombres.
Consulta el siguiente ejemplo:
```csharp
using UnityEngine;
// importing just a specific type and giving it a name
using MonoBehaviour = UnityEngine.MonoBehaviour;
```

Así es como haces lo mismo en Typescript para importar tipos específicos desde un paquete:
```ts twoslash
import { Vector3 } from 'three';
import { Behaviour } from '@needle-tools/engine';
```

*Puedes* también importar todos los tipos de un paquete específico dándole un nombre, lo cual podrías ver por ahí:
```ts twoslash
import * as THREE from 'three';
const myVector : THREE.Vector3 = new THREE.Vector3(1, 2, 3);
```

### Tipos Primitivos
*Vector2, Vector3, Vector4...*
Si tienes experiencia en C#, puede que estés familiarizado con la diferencia entre una clase y una struct. Mientras que una clase es un tipo por referencia, una struct es un tipo por valor personalizado. Esto significa que, dependiendo del contexto, se asigna en la stack y, cuando se pasa a un método, por defecto se crea una copia.
Considera el siguiente ejemplo en C#:

```csharp
void MyCallerMethod(){
    var position = new Vector3(0,0,0);
    MyExampleVectorMethod(position);
    UnityEngine.Debug.Log("Position.x is " + position.x); // Here x will be 0
}
void MyExampleVectorMethod(Vector3 position){
    position.x = 42;
}
```

Se llama a un método con un Vector3 llamado position. Dentro del método, el vector `position` pasado se modifica: x se establece en 42. Pero en C#, el vector original que se pasa a este método (ver línea 2) **no** se cambia y x **seguirá** siendo 0 (línea 4).

Lo mismo no es cierto para Javascript/Typescript. Aquí no tenemos tipos por valor personalizados, lo que significa que si encuentras un Vector en Needle Engine o three.js, siempre tendrás un tipo por referencia.
Considera el siguiente ejemplo en typescript:
```ts twoslash
import { Vector3 } from 'three'

function myCallerMethod() : void {
    const position = new Vector3(0,0,0);
    myExampleVectorMethod(position);
    console.log("Position.x is " + position.x); // Here x will be 42
}
function myExampleVectorMethod(position: Vector3) : void {
    position.x = 42;
}
```
¿Ves la diferencia? Dado que los vectores y todos los objetos personalizados *son* de hecho tipos por referencia, habremos modificado la variable `position` original (línea 3) y x ahora es 42.

Esto no solo es importante de entender para los métodos, sino también cuando se trabaja con variables.
En C#, el siguiente código producirá dos instancias de Vector3 y cambiar una no afectará a la otra:
```csharp
var myVector = new Vector3(1,1,1);
var myOtherVector = myVector;
myOtherVector.x = 42;
// will log: 1, 42
UnityEngine.Debug.Log(myVector.x + ", " + myOtherVector.x);
```
Si haces lo mismo en Typescript, **no** crearás una copia, sino que obtendrás una referencia a la misma instancia `myVector` en su lugar:
```ts twoslash
import { Vector3 } from 'three'

const myVector = new Vector3(1,1,1);
const myOtherVector = myVector;
myOtherVector.x = 42;
// will log: 42, 42
console.log(myVector.x, myOtherVector.x);
```

### Matemáticas de Vector y Operadores

Mientras que en C# puedes usar la sobrecarga de operadores, lamentablemente esto no está disponible en Javascript. Esto significa que, aunque puedes multiplicar un Vector3 en C# así:

```csharp
var myFirstVector = new Vector3(1,1,1);
var myFactor = 100f;
myFirstVector *= myFactor;
// → myFirstVector is now 100, 100, 100
```

tienes que usar un método del tipo Vector3 para lograr el mismo resultado (solo con un poco más de código repetitivo)

```ts twoslash
import { Vector3 } from "three"

const myFirstVector : Vector3 = new Vector3(1, 1, 1)
const myFactor = 100;
myFirstVector.multiplyScalar(myFactor);
// → myFirstVector is now 100, 100, 100
```

### Comprobaciones de Igualdad

#### comparación laxa vs estricta
En C#, cuando quieres comprobar si dos variables son iguales, puedes escribirlo así:
```csharp
var playerIsNull = myPlayer == null;
```
en Javascript/Typescript hay una diferencia entre `==` y `===`, donde `===` comprueba de manera más estricta el tipo:
```ts twoslash
const myPlayer: any = null;
// ---cut-before---
const playerIsNull = myPlayer === null;
const playerIsNullOrUndefined = myPlayer == null;
```
Observa que la segunda variable `playerIsNullOrUndefined` usa `==`, que realiza una comprobación de igualdad laxa en la que `null` y `undefined` resultarán ambos en `true` aquí. Puedes leer más sobre esto [aquí](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

### Eventos, Binding y `this`

Cuando te suscribes a un Evento en C#, lo haces así:
```csharp
// this is how an event is declared
event Action MyEvent;
// you subscribe by adding to (or removing from)
void OnEnable() {
    MyEvent += OnMyEvent;
}
void OnDisable() {
    MyEvent -= OnMyEvent;
}
void OnMyEvent() {}
```
En Typescript y Javascript, cuando añades un método a una lista, tienes que hacer "bind this". Esto significa esencialmente que creas un método donde estableces explícitamente `this` a (generalmente) la instancia de tu clase actual. Hay dos maneras de lograr esto.

Ten en cuenta que estamos usando el tipo `EventList` aquí, que es un tipo de Needle Engine para declarar eventos (el EventList también se convertirá automáticamente en un UnityEvent y/o una lista de eventos en Blender cuando los uses con nuestras integraciones del Editor)

La sintaxis corta y **recomendada** para hacer esto es usar [Funciones de Flecha](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent!: EventList;

    onEnable() {
        this.myEvent.addEventListener(this.onMyEvent);
    }

    onDisable() {
        this.myEvent.removeEventListener(this.onMyEvent);
    }

    // Declaring the function as an arrow function to automatically bind `this`
    private onMyEvent = () => {
        console.log(this !== undefined, this)
    }
}
```
También existe la forma "clásica" más detallada de lograr lo mismo haciendo el binding manual de this (y guardando el método en una variable para luego eliminarlo de la lista de eventos):
```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent?: EventList;

    private _onMyEventFn?: Function;

    onEnable() {
        // bind this
        this._onMyEventFn = this.onMyEvent.bind(this);
        // add the bound method to the event
        this.myEvent?.addEventListener(this._onMyEventFn);
    }

    onDisable() {
        this.myEvent?.removeEventListener(this._onMyEventFn);
    }

    // Declaring the function as an arrow function to automatically bind `this`
    private onMyEvent = () => { }
}
```

## ¿Qué sigue?

- [Scripting en Needle Engine](/scripting.md)

Página traducida automáticamente por IA
