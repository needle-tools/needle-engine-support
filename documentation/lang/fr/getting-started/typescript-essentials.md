---
title: Scripting in Needle Engine
description: Differences, similarities and key concepts of Typescript, Javascript and C#.
sidebarDepth: 2
---

Le guide suivant tente de mettre en évidence certaines des différences clés entre C#, Javascript et Typescript. Ceci est particulièrement utile pour les développeurs qui découvrent l'écosystème web.

Voici également quelques ressources utiles pour apprendre à écrire du Typescript :

- [Typescript Tutorial](https://www.typescripttutorial.net/)
- [Learn Typescript](https://www.tutorialsteacher.com/typescript)
- [Typescript Documentation](https://www.typescriptlang.org/docs/)

### Différences clés entre C#, Javascript ou Typescript


**CSharp** ou **C#** est un langage statiquement typé et compilé. Cela signifie qu'**avant** que votre code puisse s'exécuter (ou être exécuté), il doit être compilé - traduit - en IL ou CIL, un langage intermédiaire qui est un peu plus proche du *code machine*. L'élément important à comprendre ici est que votre code est analysé et doit passer certaines vérifications et règles qui sont **appliquées** par le compilateur. Vous obtiendrez des erreurs de compilation **dans Unity** et votre application ne démarrera même pas si vous écrivez du code qui viole l'une des règles du langage C#. Vous ne pourrez pas entrer en mode Play avec des erreurs de compilation.

**Javascript**, quant à lui, est interprété à l'exécution. Cela signifie que vous pouvez écrire du code qui n'est pas valide et provoquer des erreurs - mais vous ne verrez pas ces erreurs *avant que votre programme ne s'exécute* ou n'essaie d'**exécuter** exactement la ligne qui contient l'erreur. Par exemple, vous pouvez écrire `var points = 100; points += "hello world";` et personne ne se plaindra *tant que* vous n'aurez pas exécuté le code dans un navigateur.

**Typescript** est un langage conçu par Microsoft qui **se compile en javascript**.
Il ajoute de nombreuses fonctionnalités comme par exemple la **sécurité des types**. Cela signifie que lorsque vous écrivez du code en Typescript, vous *pouvez* déclarer des types et ainsi obtenir des erreurs au moment de la *compilation* si vous essayez par exemple d'effectuer des assignations invalides ou d'appeler des méthodes avec des types inattendus. Lisez la suite sur les types en Javascript et Typescript ci-dessous.

### Types — ou leur absence

Le **Javascript pur** (à ce jour) n'a **pas** de concept de *types* : il n'y a aucune garantie qu'une variable que vous avez déclarée comme `let points = 100` restera un *nombre* plus tard dans votre application. Cela signifie qu'en Javascript, il est parfaitement valide d'assigner `points = new Vector3(100, 0, 0);` plus tard dans votre code. Ou même `points = null` ou `points = myRandomObject` - vous avez compris l'idée. Tout cela est OK pendant que vous écrivez le code **mais** cela peut planter horriblement lorsque votre code est exécuté parce que plus tard vous écrivez `points -= 1` et **maintenant** vous obtenez des erreurs dans le navigateur alors que votre application est déjà en cours d'exécution.

Comme mentionné ci-dessus, **Typescript** a été créé pour aider à résoudre ce problème en ajoutant une syntaxe pour définir les types.

Il est important de comprendre que vous écrivez *essentiellement* toujours du Javascript lorsque vous écrivez du Typescript et bien qu'il *soit* possible de contourner toutes les vérifications de type et de sécurité en ajoutant par exemple ``//@ts-ignore`` au-dessus d'une ligne erronée ou en définissant tous les types comme ``any``, ce n'est **définitivement pas recommandé**. Les types sont là pour vous aider à trouver des erreurs avant qu'elles ne se produisent réellement. Vous ne voulez vraiment pas déployer votre site web sur votre serveur pour ensuite recevoir des rapports d'utilisateurs ou de visiteurs vous disant que votre application a planté pendant son exécution.

Bien que le *Javascript pur* n'offre pas de types, vous pouvez toujours ajouter des annotations de type à vos variables, classes et méthodes javascript en utilisant **[JSDoc](https://jsdoc.app/)**.

### Variables

En C#, vous déclarez des variables en utilisant le type ou le mot-clé `var`.
Par exemple, vous pouvez écrire `int points = 100;`
ou alternativement utiliser `var` et laisser le compilateur déterminer le type correct pour vous : `var points = 100`

En Javascript ou Typescript, vous avez deux options modernes pour déclarer une variable.
Pour une variable que vous prévoyez de réassigner, utilisez `let`, par exemple `let points = 100;`
Pour une variable que vous ne voulez pas pouvoir réassigner, utilisez `const`, par exemple `const points = 100;`
> *Faites attention à var*
Vous pourriez rencontrer le mot-clé `var` en javascript également, mais il n'est pas recommandé de l'utiliser et son remplacement moderne est `let`. Apprenez-en plus sur [var vs let](https://stackoverflow.com/a/11444416).

Veuillez noter que vous *pouvez* toujours assigner des valeurs aux variables déclarées avec `const` si elles sont (par exemple) un type personnalisé. Considérez l'exemple suivant :

```ts twoslash
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition.x = 100; // L'assignation de x est parfaitement valide
```
L'exemple ci-dessus est un code Typescript parfaitement valide car vous ne réassignez pas `myPosition` mais seulement le membre `x` de `myPosition`. D'un autre côté, l'exemple suivant ne serait **pas** autorisé et provoquerait une erreur d'exécution ou Typescript :
```ts twoslash
// @errors: 2588
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition = new Vector3(100, 0, 0); // ⚠ L'ASSIGNATION À CONST N'EST PAS AUTORISÉE
```

### Utilisation ou importation de types

Dans Unity, vous ajoutez généralement des instructions `using` en haut de votre code pour importer des namespaces spécifiques à partir d'assemblies référencées dans votre projet ou - dans certains cas - vous pourriez vous retrouver à importer un type spécifique avec un nom à partir d'un namespace.
Voir l'exemple suivant :
```csharp
using UnityEngine;
// importation d'un type spécifique et lui donner un nom
using MonoBehaviour = UnityEngine.MonoBehaviour;
```

Voici comment faire la même chose en Typescript pour importer des types spécifiques d'un package :
```ts twoslash
import { Vector3 } from 'three';
import { Behaviour } from '@needle-tools/engine';
```

Vous *pouvez* également importer tous les types d'un package spécifique en lui donnant un nom, ce que vous pourriez voir ici et là :
```ts twoslash
import * as THREE from 'three';
const myVector : THREE.Vector3 = new THREE.Vector3(1, 2, 3);
```

### Types primitifs
*Vector2, Vector3, Vector4...*
Si vous avez un background C#, vous connaissez peut-être la différence entre une classe et une struct. Alors qu'une classe est un type par référence, une struct est un type par valeur personnalisé. Cela signifie qu'elle est, selon le contexte, allouée sur la pile et lorsqu'elle est passée à une méthode, une copie est créée par défaut.
Considérez l'exemple suivant en C# :

```csharp
void MyCallerMethod(){
    var position = new Vector3(0,0,0);
    MyExampleVectorMethod(position);
    UnityEngine.Debug.Log("Position.x is " + position.x); // Ici x sera 0
}
void MyExampleVectorMethod(Vector3 position){
    position.x = 42;
}
```

Une méthode est appelée avec un Vector3 nommé position. À l'intérieur de la méthode, le vecteur `position` passé est modifié : x est mis à 42. Mais en C#, le vecteur original qui est passé dans cette méthode (voir ligne 2) n'est **pas** modifié et x sera **toujours** 0 (ligne 4).

La même chose n'est pas vraie pour Javascript/Typescript. Ici, nous n'avons pas de types par valeur personnalisés, ce qui signifie que si vous rencontrez un Vector dans Needle Engine ou three.js, vous aurez toujours un type par référence.
Considérez l'exemple suivant en typescript :
```ts twoslash
import { Vector3 } from 'three'

function myCallerMethod() : void {
    const position = new Vector3(0,0,0);
    myExampleVectorMethod(position);
    console.log("Position.x is " + position.x); // Ici x sera 42
}
function myExampleVectorMethod(position: Vector3) : void {
    position.x = 42;
}
```
Voyez-vous la différence ? Parce que les vecteurs et tous les objets personnalisés *sont* en fait des types par référence, nous aurons modifié la variable `position` originale (ligne 3) et x est maintenant 42.

Ceci n'est pas seulement important à comprendre pour les méthodes mais aussi lors de l'utilisation de variables.
En C#, le code suivant produira deux instances de Vector3 et changer l'une n'affectera pas l'autre :
```csharp
var myVector = new Vector3(1,1,1);
var myOtherVector = myVector;
myOtherVector.x = 42;
// affichera : 1, 42
UnityEngine.Debug.Log(myVector.x + ", " + myOtherVector.x);
```
Si vous faites la même chose en Typescript, vous ne créerez **pas** de copie mais obtiendrez une référence à la même instance `myVector` à la place :
```ts twoslash
import { Vector3 } from 'three'

const myVector = new Vector3(1,1,1);
const myOtherVector = myVector;
myOtherVector.x = 42;
// affichera : 42, 42
console.log(myVector.x, myOtherVector.x);
```

### Mathématiques vectorielles et opérateurs

Alors qu'en C# vous pouvez utiliser la surcharge d'opérateurs, cela n'est malheureusement pas disponible en Javascript. Cela signifie que bien que vous puissiez multiplier un Vector3 en C# comme ceci :

```csharp
var myFirstVector = new Vector3(1,1,1);
var myFactor = 100f;
myFirstVector *= myFactor;
// → myFirstVector est maintenant 100, 100, 100
```

vous devez utiliser une méthode sur le type Vector3 pour obtenir le même résultat (juste avec un peu plus de code standard)

```ts twoslash
import { Vector3 } from "three"

const myFirstVector : Vector3 = new Vector3(1, 1, 1)
const myFactor = 100;
myFirstVector.multiplyScalar(myFactor);
// → myFirstVector est maintenant 100, 100, 100
```

### Vérifications d'égalité

#### Comparaison lâche vs stricte
En C#, lorsque vous voulez vérifier si deux variables sont identiques, vous pouvez l'écrire comme suit :
```csharp
var playerIsNull = myPlayer == null;
```
en Javascript/Typescript, il y a une différence entre `==` et `===`, où `===` vérifie plus strictement le type :
```ts twoslash
const myPlayer: any = null;
// ---cut-before---
const playerIsNull = myPlayer === null;
const playerIsNullOrUndefined = myPlayer == null;
```
Vous remarquez que la deuxième variable `playerIsNullOrUndefined` utilise `==`, qui effectue une vérification d'égalité lâche, auquel cas `null` et `undefined` donneront tous deux `true` ici. Vous pouvez en savoir plus à ce sujet [ici](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

### Événements, Binding et `this`

Lorsque vous vous abonnez à un événement en C#, vous le faites comme suit :
```csharp
// voici comment un événement est déclaré
event Action MyEvent;
// vous vous abonnez en ajoutant (ou supprimant)
void OnEnable() {
    MyEvent += OnMyEvent;
}
void OnDisable() {
    MyEvent -= OnMyEvent;
}
void OnMyEvent() {}
```
En Typescript et Javascript, lorsque vous ajoutez une méthode à une liste, vous devez "lier this". Cela signifie essentiellement que vous créez une méthode où vous définissez explicitement `this` à (généralement) votre instance de classe actuelle. Il y a deux façons d'y parvenir.

Veuillez noter que nous utilisons ici le type `EventList`, qui est un type Needle Engine pour déclarer des événements (l'EventList sera également automatiquement converti en UnityEvent et/ou en liste d'événements dans Blender lorsque vous les utilisez avec nos intégrations d'éditeur).

La syntaxe courte et **recommandée** pour ce faire est d'utiliser les [Fonctions fléchées](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

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

    // Déclarer la fonction comme une fonction fléchée pour lier automatiquement `this`
    private onMyEvent = () => {
        console.log(this !== undefined, this)
    }
}
```
Il existe également la manière "classique" plus verbeuse pour obtenir le même résultat en liant manuellement `this` (et en sauvegardant la méthode dans une variable pour ensuite la retirer à nouveau de la liste d'événements) :
```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent?: EventList;

    private _onMyEventFn?: Function;

    onEnable() {
        // lier this
        this._onMyEventFn = this.onMyEvent.bind(this);
        // ajouter la méthode liée à l'événement
        this.myEvent?.addEventListener(this._onMyEventFn);
    }

    onDisable() {
        this.myEvent?.removeEventListener(this._onMyEventFn);
    }

    // Déclarer la fonction comme une fonction fléchée pour lier automatiquement `this`
    private onMyEvent = () => { }
}
```

## Et ensuite ?

- [Needle Engine Scripting](/scripting.md)


Page automatiquement traduite par l'IA