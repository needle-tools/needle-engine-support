---
title: "@serializable et autres décorateurs"
---

Le tableau suivant contient les décorateurs Typescript disponibles fournis par Needle Engine.

Vous pouvez les considérer comme des Attributs sous stéroïdes (si vous êtes familier avec C#) - ils peuvent être ajoutés aux classes, aux champs ou aux méthodes en Typescript pour fournir des fonctionnalités supplémentaires.

|  |  |
| --- | --- |
| **Décorateurs de champs et de propriétés** | |
| `@serializable()` | À ajouter aux champs exposés / sérialisés. Est utilisé lors du chargement de fichiers glTF qui ont été exportés avec des composants de Unity ou Blender. |
| `@syncField()` | À ajouter à un champ pour synchroniser la valeur sur le réseau lorsqu'elle change. Vous pouvez passer une méthode à appeler lorsque le champ change. |
| `@validate()` | À ajouter pour recevoir des rappels dans la méthode d'événement du composant `onValidate` chaque fois que la valeur change. Cela se comporte de manière similaire à `onValidate` de Unity. |
| **Décorateurs de méthodes** | |
| `@prefix(<type>)` (expérimental) | Peut être utilisé pour injecter facilement du code personnalisé dans d'autres composants. Optionnellement, renvoyez `false` pour empêcher l'exécution de la méthode originale. Voir l'[exemple ci-dessous](#prefix). |
| **Décorateurs de classes** | |
| `@registerType` | Aucun argument. Peut être ajouté à une classe de composant personnalisée pour être enregistrée dans les types de Needle Engine et pour activer le support du rechargement à chaud (hot reloading). |

## Exemples

### Serializable

```ts twoslash
import { Behaviour, serializable, EventList } from "@needle-tools/engine";
import { Object3D } from "three";

export class SomeComponentType extends Behaviour {}

export class ButtonObject extends Behaviour {
    // vous pouvez omettre le type s'il s'agit d'un type primitif
    // par exemple Number, String ou Bool
    @serializable()
    myNumber: number = 42;

    // sinon, ajoutez le type concret que vous souhaitez sérialiser
    @serializable(EventList)
    onClick?: EventList;

    @serializable(SomeComponentType)
    myComponent?: SomeComponentType;

    // Notez que pour les tableaux, vous ajoutez toujours le type concret (pas le tableau)
    @serializable(Object3D)
    myObjects?: Object3D[];
}
```

### SyncField

Le décorateur `@syncField` peut être utilisé pour synchroniser automatiquement les propriétés de vos composants sur le réseau pour tous les utilisateurs (visiteurs de votre site web) connectés à la même salle réseau. Il peut optionnellement prendre une fonction de rappel qui sera invoquée chaque fois que la valeur change.

- Pour notifier le système qu'une valeur de référence (comme un objet ou un tableau) a changé, vous devez réaffecter le champ. Par exemple : `myField = myField`
- La fonction de rappel ne *peut pas* être une fonction fléchée (par exemple `MyScript.prototype.onNumberChanged` fonctionne pour `onNumberChanged() { ... }` mais pas pour `myNumberChanged = () => { ... }`)

```ts twoslash
import { Behaviour, serializable, syncField } from "@needle-tools/engine";

export class MyScript extends Behaviour {

    @syncField(MyScript.prototype.onNumberChanged)
    @serializable()
    myNumber: number = 42;

    private onNumberChanged(newValue: number, oldValue: number){
        console.log("Le nombre a changé de ", oldValue, "à", newValue)
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
        console.log("Validation", fieldName, this.myNumber);
    }
}
```

### Prefix

[Exemple en direct](https://stackblitz.com/edit/needle-engine-prefix-example?file=src%2Fmain.ts)

```ts twoslash
import { Camera, prefix } from "@needle-tools/engine";
class YourClass {
    @prefix(Camera) // < c'est le type qui possède la méthode que vous voulez modifier
    awake() { // < c'est le nom de la méthode que vous voulez modifier

        // ceci est maintenant appelé avant l'exécution de la méthode Camera.awake
        // NOTE : `this` fait maintenant référence à l'instance de Camera et NON PLUS à `YourClass`. Cela vous permet d'accéder également à l'état interne du composant.
        console.log("Bonjour caméra :", this)
        // retournez optionnellement false si vous voulez empêcher le comportement par défaut
    }
}
```

Page automatiquement traduite à l'aide de l'IA