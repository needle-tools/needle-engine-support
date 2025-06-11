---
title: Skripting in Needle Engine
description: Unterschiede, Gemeinsamkeiten und Schlüsselkonzepte von Typescript, Javascript und C#.
sidebarDepth: 2
---

Der folgende Leitfaden beleuchtet einige der wichtigsten Unterschiede zwischen C#, Javascript und Typescript. Dies ist besonders nützlich für Entwickler, die neu im Web-Ökosystem sind.

Hier sind auch einige nützliche Ressourcen, um Typescript zu lernen:

- [Typescript Tutorial](https://www.typescripttutorial.net/)
- [Learn Typescript](https://www.tutorialsteacher.com/typescript)
- [Typescript Documentation](https://www.typescriptlang.org/docs/)

### Hauptunterschiede zwischen C#, Javascript oder Typescript

**CSharp** oder **C#** ist eine statically typed & compiled language. Das bedeutet, dass **bevor** Ihr Code laufen (oder ausgeführt werden) kann, er kompiliert – übersetzt – werden muss in IL oder CIL, eine intermediate language, die etwas näher am *machine code* ist. Wichtig ist hier zu verstehen, dass Ihr Code analysiert wird und bestimmte Prüfungen und Regeln bestehen muss, die vom Compiler **durchgesetzt** werden. Sie erhalten compiler errors **in Unity**, und Ihre Anwendung startet nicht einmal, wenn Sie Code schreiben, der gegen eine der Regeln der C#-Sprache verstößt. Sie können den Play-Mode nicht mit compiler errors starten.

**Javascript** hingegen wird zur runtime interpretiert. Das bedeutet, Sie können Code schreiben, der nicht gültig ist und Fehler verursacht – aber Sie werden diese Fehler erst *sehen*, wenn Ihr Programm läuft oder versucht, genau die Zeile mit dem Fehler zu **ausführen**. Zum Beispiel können Sie `var points = 100; points += "hello world";` schreiben, und niemand wird sich beschweren, *bis* Sie den Code in einem Browser ausführen.

**Typescript** ist eine von Microsoft entwickelte Sprache, die zu **Javascript kompiliert**. Sie fügt viele Funktionen hinzu, wie zum Beispiel **type-safety**. Das bedeutet, wenn Sie Code in Typescript schreiben, können Sie Typen deklarieren und erhalten somit Fehler zur *compile-time*, wenn Sie zum Beispiel ungültige Zuweisungen vornehmen oder Methoden mit unerwarteten Typen aufrufen. Lesen Sie weiter unten mehr über Typen in Javascript und Typescript.

### Typen – oder deren Fehlen

**Vanilla Javascript** hat (stand heute) **kein** Konzept von *Typen*: Es gibt keine Garantie, dass eine Variable, die Sie als `let points = 100` deklariert haben, später in Ihrer Anwendung immer noch eine *Zahl* sein wird. Das bedeutet, dass es in Javascript vollkommen gültiger Code ist, später in Ihrem Code `points = new Vector3(100, 0, 0);` zuzuweisen. Oder sogar `points = null` oder `points = myRandomObject` – Sie verstehen die Idee. Das ist alles in Ordnung, während Sie den Code schreiben, **aber** es kann schrecklich abstürzen, wenn Ihr Code ausgeführt wird, weil Sie später `points -= 1` schreiben und **jetzt** Fehler im Browser erhalten, während Ihre Anwendung bereits läuft.

Wie oben erwähnt, wurde **Typescript** entwickelt, um dieses Problem zu beheben, indem Syntax zur Definition von Typen hinzugefügt wurde.

Es ist wichtig zu verstehen, dass Sie *im Grunde* immer noch Javascript schreiben, wenn Sie Typescript schreiben, und obwohl es *möglich* ist, alle type checking und safety checks zu umgehen, indem Sie z. B. ``//@ts-ignore`` über eine fehlerhafte Zeile hinzufügen oder alle Typen als ``any`` definieren, ist dies **definitiv nicht empfohlen**. Typen sind dazu da, Ihnen zu helfen, Fehler zu finden, bevor sie tatsächlich auftreten. Sie möchten Ihre Website wirklich nicht auf Ihrem Server bereitstellen, nur um später Berichte von Benutzern oder Besuchern zu erhalten, die Ihnen mitteilen, dass Ihre App abgestürzt ist, während sie lief.

Während *vanilla Javascript* keine Typen anbietet, können Sie Ihren Javascript-Variablen, Klassen und Methoden dennoch type-annotations hinzufügen, indem Sie **[JSDoc](https://jsdoc.app/)** verwenden.

### Variablen

In C# schreiben Sie Variablen entweder unter Verwendung des Typs oder des `var` keyword.
Zum Beispiel können Sie entweder `int points = 100;` schreiben
oder alternativ `var` verwenden und den Compiler den richtigen Typ für Sie herausfinden lassen: `var points = 100`

In Javascript oder Typescript haben Sie zwei moderne Optionen zur Deklaration einer Variable.
Für eine Variable, die Sie neu zuweisen möchten, verwenden Sie `let`, zum Beispiel `let points = 100;`
Für eine Variable, die Sie nicht neu zuweisen möchten, verwenden Sie `const`, zum Beispiel `const points = 100;`
> *Achtung bei var*
Möglicherweise stoßen Sie auch in Javascript auf das `var` keyword, aber es wird nicht empfohlen, es zu verwenden, und der moderne Ersatz dafür ist `let`. Erfahren Sie mehr über [var vs let](https://stackoverflow.com/a/11444416).

Bitte beachten Sie, dass Sie Variablen, die mit const deklariert wurden, *dennoch* Werte zuweisen *können*, wenn sie (zum Beispiel) ein custom type sind. Betrachten Sie das folgende Beispiel:

```ts twoslash
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition.x = 100; // Die Zuweisung von x ist völlig in Ordnung
```
Das Obige ist vollkommen gültiger Typescript-Code, weil Sie `myPosition` nicht neu zuweisen, sondern nur das `x` Mitglied von `myPosition`. Andererseits wäre das folgende Beispiel **nicht** erlaubt und würde einen runtime- oder Typescript-Fehler verursachen:
```ts twoslash
// @errors: 2588
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition = new Vector3(100, 0, 0); // ⚠ ZUWEISUNG ZU CONST IST NICHT ERLAUBT
```

### Verwenden oder Importieren von Typen

In Unity fügen Sie normalerweise `using` statements am Anfang Ihres Codes hinzu, um bestimmte namespaces aus Assemblies zu importieren, auf die in Ihrem Projekt verwiesen wird, oder – in bestimmten Fällen – importieren Sie möglicherweise einen bestimmten Typ mit einem Namen aus einem namespace.
Siehe das folgende Beispiel:
```csharp
using UnityEngine;
// nur einen bestimmten Typ importieren und ihm einen Namen geben
using MonoBehaviour = UnityEngine.MonoBehaviour;
```

So machen Sie dasselbe in Typescript, um bestimmte Typen aus einem package zu importieren:
```ts twoslash
import { Vector3 } from 'three';
import { Behaviour } from '@needle-tools/engine';
```

Sie *können* auch alle Typen aus einem bestimmten package importieren, indem Sie ihm einen Namen geben, was Sie hier und da sehen könnten:
```ts twoslash
import * as THREE from 'three';
const myVector : THREE.Vector3 = new THREE.Vector3(1, 2, 3);
```

### Primitive Typen
*Vector2, Vector3, Vector4...*
Wenn Sie einen C#-Hintergrund haben, kennen Sie möglicherweise den Unterschied zwischen einer class und einer struct. Während eine class ein reference type ist, ist eine struct ein benutzerdefinierter value type. Das bedeutet, dass sie je nach Kontext auf dem stack zugewiesen wird und bei der Übergabe an eine Methode standardmäßig eine Kopie erstellt wird.
Betrachten Sie das folgende Beispiel in C#:

```csharp
void MyCallerMethod(){
    var position = new Vector3(0,0,0);
    MyExampleVectorMethod(position);
    UnityEngine.Debug.Log("Position.x is " + position.x); // Hier ist x 0
}
void MyExampleVectorMethod(Vector3 position){
    position.x = 42;
}
```

Eine Methode wird mit einem Vector3 namens position aufgerufen. Innerhalb der Methode wird der übergebene Vektor `position` geändert: x wird auf 42 gesetzt. Aber in C# wird der ursprüngliche Vektor, der an diese Methode übergeben wird (siehe Zeile 2), **nicht** geändert, und x wird **immer noch** 0 sein (Zeile 4).

Dasselbe gilt nicht für Javascript/Typescript. Hier haben wir keine custom value types, was bedeutet, dass Sie, wenn Sie in Needle Engine oder three.js auf einen Vektor stoßen, immer einen reference type haben werden.
Betrachten Sie das folgende Beispiel in Typescript:
```ts twoslash
import { Vector3 } from 'three'

function myCallerMethod() : void {
    const position = new Vector3(0,0,0);
    myExampleVectorMethod(position);
    console.log("Position.x is " + position.x); // Hier ist x 42
}
function myExampleVectorMethod(position: Vector3) : void {
    position.x = 42;
}
```
Sehen Sie den Unterschied? Da Vektoren und alle custom objects tatsächlich reference types *sind*, haben wir die ursprüngliche Variable `position` (Zeile 3) geändert, und x ist nun 42.

Dies ist nicht nur wichtig für Methoden, sondern auch beim Arbeiten mit Variablen.
In C# erzeugt der folgende Code zwei Instanzen von Vector3, und das Ändern einer hat keinen Einfluss auf die andere:
```csharp
var myVector = new Vector3(1,1,1);
var myOtherVector = myVector;
myOtherVector.x = 42;
// loggt: 1, 42
UnityEngine.Debug.Log(myVector.x + ", " + myOtherVector.x);
```
Wenn Sie dasselbe in Typescript tun, werden Sie **keine** Kopie erstellen, sondern stattdessen eine reference auf dieselbe `myVector` Instanz erhalten:
```ts twoslash
import { Vector3 } from 'three'

const myVector = new Vector3(1,1,1);
const myOtherVector = myVector;
myOtherVector.x = 42;
// loggt: 42, 42
console.log(myVector.x, myOtherVector.x);
```

### Vektor-Mathematik und Operatoren

Während Sie in C# operator overloading verwenden können, ist dies in Javascript leider nicht verfügbar. Das bedeutet, dass Sie einen Vector3 in C# zwar so multiplizieren können:

```csharp
var myFirstVector = new Vector3(1,1,1);
var myFactor = 100f;
myFirstVector *= myFactor;
// → myFirstVector ist jetzt 100, 100, 100
```

müssen Sie eine Methode auf dem Vector3-Typ verwenden, um dasselbe Ergebnis zu erzielen (nur mit etwas mehr boilerplate code)

```ts twoslash
import { Vector3 } from "three"

const myFirstVector : Vector3 = new Vector3(1, 1, 1)
const myFactor = 100;
myFirstVector.multiplyScalar(myFactor);
// → myFirstVector ist jetzt 100, 100, 100
```

### Gleichheitsprüfungen

#### loose vs strict comparison
In C# können Sie es wie folgt schreiben, wenn Sie prüfen möchten, ob zwei Variablen gleich sind:
```csharp
var playerIsNull = myPlayer == null;
```
in Javascript/Typescript gibt es einen Unterschied zwischen `==` und `===`, wobei `===` strenger auf den Typ prüft:
```ts twoslash
const myPlayer: any = null;
// ---cut-before---
const playerIsNull = myPlayer === null;
const playerIsNullOrUndefined = myPlayer == null;
```
Sie stellen fest, dass die zweite Variable `playerIsNullOrUndefined` `==` verwendet, was eine loose equality check durchführt, bei der `null` und `undefined` beide zu `true` führen. Sie können [hier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) mehr darüber lesen.

### Events, Binding und `this`

Wenn Sie ein Event in C# abonnieren, tun Sie dies wie folgt:
```csharp
// So wird ein Event deklariert
event Action MyEvent;
// Sie abonnieren, indem Sie hinzufügen (oder entfernen)
void OnEnable() {
    MyEvent += OnMyEvent;
}
void OnDisable() {
    MyEvent -= OnMyEvent;
}
void OnMyEvent() {}
```
In Typescript und Javascript müssen Sie "this binden", wenn Sie eine Methode zu einer Liste hinzufügen. Das bedeutet im Wesentlichen, dass Sie eine Methode erstellen, bei der Sie `this` explizit auf (normalerweise) Ihre aktuelle Klasseninstanz setzen. Es gibt zwei Möglichkeiten, dies zu erreichen.

Bitte beachten Sie, dass wir hier den Typ `EventList` verwenden, der ein Needle Engine Typ zur Deklaration von events ist (die EventList wird auch automatisch in ein UnityEvent oder eine event list in Blender umgewandelt, wenn Sie sie mit unseren Editor-Integrationen verwenden).

Die kurze und **empfohlene** Syntax dafür ist die Verwendung von [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

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

    // Deklarieren der Funktion als Arrow Function, um `this` automatisch zu binden
    private onMyEvent = () => {
        console.log(this !== undefined, this)
    }
}
```
Es gibt auch die ausführlichere "klassische" Methode, dasselbe zu erreichen, indem Sie this manuell binden (und die Methode in einer Variable speichern, um sie später wieder aus der event list zu entfernen):
```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent?: EventList;

    private _onMyEventFn?: Function;

    onEnable() {
        // this binden
        this._onMyEventFn = this.onMyEvent.bind(this);
        // die gebundene Methode zum event hinzufügen
        this.myEvent?.addEventListener(this._onMyEventFn);
    }

    onDisable() {
        this.myEvent?.removeEventListener(this._onMyEventFn);
    }

    // Deklarieren der Funktion als Arrow Function, um `this` automatisch zu binden
    private onMyEvent = () => { }
}
```

## Was kommt als Nächstes?

- [Needle Engine Scripting](/scripting.md)


Seite automatisch mit AI übersetzt