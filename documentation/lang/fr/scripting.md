---
title: Créer et utiliser des Components
tags:
    - scripting
    - serialization
    - csharp
    - typescript
    - javascript
    - components
---

# Créer des composants personnalisés

Si vous débutez en scripting, nous vous **recommandons fortement** de lire d'abord les guides suivants :

- [Principes essentiels de Typescript](./getting-started/typescript-essentials.md)
- [Needle Engine pour les développeurs Unity](./getting-started/for-unity-developers.md)

Si vous savez ce que vous faites, n'hésitez pas à consulter directement la [documentation API de Needle Engine](https://engine.needle.tools/docs/api/latest).

---

Le code d'exécution pour Needle Engine est écrit en [TypeScript](https://typescriptlang.org) (recommandé) ou en [JavaScript](https://javascript.info/). Nous générons automatiquement des composants C# stub à partir de cela, que vous pouvez ajouter aux GameObjects dans l'éditeur. Les composants C# et leurs données sont recréés par le runtime en tant que composants JavaScript avec les mêmes données et attachés aux objets three.js.

Les composants personnalisés ainsi que les composants Unity intégrés peuvent être mappés en composants JavaScript de cette manière. Par exemple, les mappages pour de nombreux composants intégrés liés à l'animation, au rendu ou à la physique sont déjà [inclus dans Needle Engine](./component-reference.md#unity-components).

Si vous souhaitez suivre les exemples suivants sans rien installer, cliquez simplement sur le lien suivant :

- [Créer un espace de travail virtuel pour coder](https://stackblitz.com/fork/github/needle-engine/vite-template?file=src%2Fmain.ts).

----

Notre moteur d'exécution web adopte un modèle de composant similaire à Unity et offre ainsi de nombreuses fonctionnalités qui vous seront familières.
Les composants attachés aux objets three.js Object3D ont des méthodes de cycle de vie comme ``awake``, ``start``, ``onEnable``, ``onDisable``, ``update`` et ``lateUpdate`` que vous pouvez implémenter. Vous pouvez également utiliser des [Coroutines](#coroutines).

----

## Quand vous n'avez pas besoin d'écrire de code

Souvent, les scènes interactives peuvent être réalisées en utilisant des Events dans Unity et en appelant des méthodes sur des composants intégrés. Un exemple typique est de jouer une animation sur un clic de bouton - vous créez un bouton, ajoutez un événement Click dans l'inspector, et le faites appeler Animator.SetTrigger ou similaire pour jouer une animation spécifique.

Needle Engine traduit les Unity Events en appels de méthodes JavaScript, ce qui en fait un flux de travail très rapide et flexible - configurez vos événements comme d'habitude et lorsqu'ils sont appelés, ils fonctionneront de la même manière que dans Unity.

![image](https://user-images.githubusercontent.com/2693840/187314594-7e34905d-e704-4fa3-835c-6b40f11e1c62.png)
_Un exemple d'événement Button Click fonctionnant immédiatement dans Needle Engine — aucun code n'est nécessaire._

## Créer un nouveau composant
Les scripts sont écrits en TypeScript (recommandé) ou JavaScript.
Il existe deux façons d'ajouter des scripts personnalisés à votre projet :

- Ajoutez simplement un fichier avec une extension `.ts` ou `.js` à l'intérieur de `src/scripts/` dans le répertoire de votre projet généré, par exemple `src/scripts/MyFirstScript.ts`.

- Spécifique à Unity :
  Organisez votre code en fichiers de définition NPM (paquets npm). Ceux-ci vous aident à modulariser et réutiliser le code entre les projets et si vous êtes familier avec le développement web, ce sont en fait des paquets npm réguliers qui sont installés localement.
  Dans Unity, vous pouvez créer des fichiers NpmDef via `Create > NPM Definition`, puis ajouter des fichiers TypeScript en cliquant droit sur un fichier NpmDef et en sélectionnant `Create > TypeScript`. Veuillez consulter [ce chapitre](./project-structure.md#npm-definition-files) pour plus d'informations.

Dans les deux approches, les répertoires source sont surveillés pour les modifications et les composants C# stub ou les panneaux Blender sont régénérés chaque fois qu'une modification est détectée.
Les modifications apportées aux fichiers source entraînent également un rechargement à chaud du site web en cours d'exécution – vous n'avez pas à attendre que Unity recompile les composants C#. Cela rend l'itération sur le code quasiment instantanée.

Vous pouvez même avoir plusieurs types de composants dans un seul fichier (par exemple, vous pouvez déclarer `export class MyComponent1` et `export class MyOtherComponent` dans le même fichier Typescript).

Si vous débutez dans l'écriture de Javascript ou Typescript, nous vous recommandons de lire d'abord le guide [Principes essentiels de Typescript](./getting-started/typescript-essentials.md) avant de continuer avec ce guide.

:::details Exemple : Créer un composant qui fait pivoter un objet

- **Créer un composant qui fait pivoter un objet**
  Créer ``src/scripts/Rotate.ts`` et ajouter le code suivant :
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class Rotate extends Behaviour
{
    @serializable()
    speed : number = 1;

    start(){
        // logging this is useful for debugging in the browser.
        // You can open the developer console (F12) to see what data your component contains
        console.log(this);
    }

    // update will be called every frame
    update(){
        this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
    }
}
```

Maintenant, dans Unity, un nouveau script appelé ``Rotate.cs`` sera automatiquement généré. Ajoutez le nouveau composant Unity à un Cube et sauvegardez la scène.
Le cube tourne maintenant dans le navigateur.
Ouvrez la console de développement chrome avec `F12` pour inspecter le log de la méthode ``Rotate.start``. C'est une pratique utile pour apprendre et déboguer quels champs sont exportés et actuellement assignés. En général, tous les champs publics et sérialisables ainsi que toutes les propriétés publiques sont exportés.

Ajoutez maintenant un nouveau champ ``public float speed = 5`` à votre composant Unity et sauvegardez-le. L'inspector du composant Rotate affiche maintenant un champ ``speed`` que vous pouvez modifier. Sauvegardez la scène (ou cliquez sur le bouton ``Build``) et notez que le composant javascript a maintenant la valeur ``speed`` exportée assignée.
:::

:::details Créer un composant avec une fonction personnalisée
Référez-vous au [Guide des principes essentiels de Typescript](./getting-started/typescript-essentials.md) pour en savoir plus sur la syntaxe et le langage.
```ts twoslash
import { Behaviour } from "@needle-tools/engine";

export class PrintNumberComponent extends Behaviour
{
    start(){
      this.printNumber(42);
    }

    private printNumber(myNumber : number){
        console.log("My Number is: " + myNumber);
    }
}
```
:::

:::details Gestion de version et Unity
Bien que les composants C# générés utilisent le nom du type pour produire des GUID stables, nous recommandons d'enregistrer les composants générés dans le contrôle de version comme bonne pratique.
:::

## Architecture des composants
Les composants sont ajoutés aux ``Object3Ds`` de three.js. Cela est similaire à la façon dont les Components dans Unity sont ajoutés aux ``GameObjects``. Par conséquent, lorsque nous voulons accéder à un Object3D de three.js, nous pouvons y accéder en tant que ``this.gameObject``, qui retourne le ``Object3D`` auquel le composant est attaché.

***Note** : Mettre ``visible`` à false sur un Object3D agira comme ``SetActive(false)`` dans Unity - ce qui signifie que cela désactivera également tous les composants actuels sur cet objet et ses enfants. Les événements Update pour les composants inactifs ne sont pas appelés tant que ``visible`` n'est pas remis à true.* Si vous souhaitez masquer un objet sans affecter les composants, vous pouvez simplement désactiver le composant Needle Engine ``Renderer``.

### Méthodes de cycle de vie

Notez que les méthodes de cycle de vie ne sont appelées que lorsqu'elles sont déclarées. Il ne faut donc déclarer les méthodes de cycle de vie `update` que lorsqu'elles sont réellement nécessaires, sinon cela peut nuire aux performances si vous avez de nombreux composants avec des boucles d'update qui ne font rien.

| Nom de la méthode | Description |
| -- | --
| `awake()` | Première méthode appelée lors de la création d'un nouveau composant
| `onEnable()` | Appelée lorsqu'un composant est activé (par exemple lorsque ``enabled`` passe de false à true)
| `onDisable()` | Appelée lorsqu'un composant est désactivé (par exemple lorsque ``enabled`` passe de true à false)
| `onDestroy()` | appelée lorsque l'Object3D ou le composant est détruit
| `start()` | Appelée au début de la première image après la création du composant
| `earlyUpdate()` | Premier événement de mise à jour
| `update()` | Événement de mise à jour par défaut
| `lateUpdate()` | Appelée après update
| `onBeforeRender()` | Dernier événement de mise à jour avant l'appel de rendu
| `onAfterRender()` | Appelée après l'événement de rendu

### Méthodes d'événement physique
| Nom de la méthode | Description |
| -- | --
| `onCollisionEnter(col : Collision)` |
| `onCollisionStay(col : Collision)` |
| `onCollisionExit(col : Collision)` |
| `onTriggerEnter(col : Collision)` |
| `onTriggerStay(col : Collision)` |
| `onTriggerExit(col : Collision)` |

### Méthodes d'événement d'entrée
| Nom de la méthode | Description |
| -- | --
| `onPointerEnter(args : PointerEventData)` | Appelée lorsqu'un curseur commence à survoler un objet (ou l'un de ses enfants)
| `onPointerMove(args : PointerEventData)` | Appelée lorsqu'un curseur se déplace sur un objet (ou l'un de ses enfants)
| `onPointerExit(args : PointerEventData)` | Appelée lorsqu'un curseur quitte (arrête de survoler) un objet
| `onPointerDown(args : PointerEventData)` | Appelée lorsqu'un curseur est pressé sur un objet
| `onPointerUp(args : PointerEventData)` | Appelée lorsqu'un curseur est relâché sur un objet
| `onPointerClick(args : PointerEventData)` | Appelée lorsqu'un curseur est cliqué sur un objet


### Méthodes d'événement XR
*nécessite Needle Engine >= 3.32.0*
| Nom de la méthode | Description |
| -- | --
| `supportsXR(mode: XRSessionMode)` | Optionnellement implémenté si vous souhaitez ne recevoir des callbacks XR que pour des modes XR spécifiques comme `immersive-vr` ou `immersive-ar`. Retourne `true` pour notifier le système que vous souhaitez des callbacks pour le mode passé.
| `onBeforeXR(mode: XRSessionMode, init: XRSessionInit)` | Appelé juste avant qu'une XRSession soit demandée et peut être utilisé pour modifier l'objet XRSessionInit
| `onEnterXR(args: NeedleXREventArgs)` | Callback lorsque ce composant rejoint une session xr (ou devient actif dans une session XR en cours)
| `onUpdateXR(args: NeedleXREventArgs)` | Callback lorsqu'une session xr est mise à jour (tant qu'elle est encore active dans la session XR)
| `onLeaveXR(args: NeedleXREventArgs)` | Callback lorsque ce composant quitte une session xr (ou lorsqu'il devient inactif dans une session XR en cours)
| `onControllerAdded(args: NeedleXRControllerEventArgs)` | Callback lorsqu'un contrôleur est connecté/ajouté pendant une session XR OU lorsque le composant rejoint une session XR en cours qui a déjà des contrôleurs connectés OU lorsque le composant devient actif pendant une session XR en cours qui a déjà des contrôleurs connectés
| `onControllerRemoved(args: NeedleXRControllerEventArgs)` | Callback lorsqu'un contrôleur est supprimé pendant une session XR OU lorsque le composant devient inactif pendant une session XR en cours

#### Événements XR supplémentaires

| Nom de la méthode | Description |
| -- | --
| `window.addEventListener("needle-xrsession-start")` | CustomEvent qui est invoqué lorsqu'une XRSession démarre. `details` contient la `NeedleXRSession`
| `window.addEventListener("needle-xrsession-end")` | CustomEvent qui est invoqué lorsqu'une XRSession se termine. `details` contient la `NeedleXRSession`
| `onXRSessionStart(args: { session:NeedleXRSession } )` | hook d'événement global. Pour se désabonner, utiliser `offXRSessionStart`


### Coroutines

Les Coroutines peuvent être déclarées en utilisant la [syntaxe JavaScript Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).
Pour démarrer une coroutine, appelez ``this.startCoroutine(this.myRoutineName());``

**Exemple**
```ts twoslash
import { Behaviour, FrameEvent } from "@needle-tools/engine";

export class Rotate extends Behaviour {

    start() {
        // the second argument is optional and allows you to specifiy
        // when it should be called in the current frame loop
        // coroutine events are called after regular component events of the same name
        // for example: Update coroutine events are called after component.update() functions
        this.startCoroutine(this.rotate(), FrameEvent.Update);
    }

    // this method is called every frame until the component is disabled
    *rotate() {
        // keep looping forever
        while (true) {
            yield;
        }
    }
}
```

Pour arrêter une coroutine, soit vous quittez la routine en y retournant, soit vous mettez en cache la valeur de retour de ``startCoroutine`` et appelez ``this.stopCoroutine(<...>)``. Toutes les Coroutines sont arrêtées à ``onDisable`` / lors de la désactivation d'un composant.

## Hooks de cycle de vie spéciaux

Needle Engine expose également quelques hooks de cycle de vie que vous pouvez utiliser pour vous brancher sur la boucle de mise à jour sans avoir à écrire un composant complet.
Ces hooks peuvent être insérés à n'importe quel point de votre application web (par exemple dans la portée de niveau supérieur ou dans un composant svelte)
| Nom de la méthode | Description |
| -- | --
| `onInitialized(cb, options)` | Appelé lorsqu'un nouveau contexte est initialisé (avant la première image)
| `onClear(cb, options)` | Enregistre un callback avant que le contexte du moteur ne soit effacé
| `onDestroy(cb, options)` | Enregistre un callback dans le moteur avant que le contexte ne soit détruit
| `onStart(cb, options)` | Appelé directement après le `start` des composants au début d'une image
| `onUpdate(cb, options)` | Appelé directement après l'`update` des composants
| `onBeforeRender(cb, options)` | Appelé avant l'appel de rendu
| `onAfterRender(cb, options)` | Appelé après l'appel de rendu

Par exemple ([Voir l'exemple sur stackblitz](https://stackblitz.com/edit/needle-engine-lifecycle-hooks?file=src%2Fmain.ts))
```ts twoslash
// this can be put into e.g. main.ts or a svelte component (similar to onMount)
import { onStart, onUpdate, onBeforeRender, onAfterRender } from "@needle-tools/engine"

onStart(ctx => console.log("Hello Scene", ctx.scene));

onUpdate(ctx => {
    // do something... e.g. access the frame # or deltatime via ctx.time
    console.log("UPDATE", ctx.time.frame);
});

onBeforeRender(ctx => {
    // this event is only called once because of the { once: true } argument
    console.log("ON BEFORE RENDER", ctx.time.frame);
}, { once: true } );

// Every event hook returns a method to unsubscribe from the event
const unsubscribe = onAfterRender(ctx => {
    console.log("ON AFTER RENDER", ctx.time.frame);
});
// Unsubscribe from the event at any time
setTimeout(()=> unsubscribe(), 1000);
```

## Trouver, ajouter et supprimer des composants

Pour accéder à d'autres composants, utilisez les méthodes statiques sur ``GameObject`` ou les méthodes ``this.gameObject``. Par exemple, pour accéder à un composant ``Renderer`` dans le parent, utilisez ``GameObject.getComponentInParent(this.gameObject, Renderer)`` ou ``this.gameObject.getComponentInParent(Renderer)``.

**Exemple :**
```ts twoslash
import { Behaviour, GameObject, Renderer } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    start() {
        const renderer = GameObject.getComponentInParent(this.gameObject, Renderer);
        console.log(renderer);
    }
}
```

### Quelques-unes des méthodes disponibles :

| Méthode | |
| -- | --
| `GameObject.instantiate(Object3D, InstantiateOptions)` | crée une nouvelle instance de cet objet incluant de nouvelles instances de tous ses composants
| `GameObject.destroy(Object3D \| Component)` | détruit un composant ou Object3D (et ses composants)
| `GameObject.addNewComponent(Object3D, Type)` | ajoute (et crée) un nouveau composant pour un type à l'objet fourni. Notez que ``awake`` et ``onEnable`` sont déjà appelés lorsque le composant est retourné.
| `GameObject.addComponent(Object3D, Component)` | déplace une instance de composant vers l'objet fourni. C'est utile si vous avez déjà une instance, par exemple lorsque vous créez un composant avec `new MyComponent()` et que vous l'attachez ensuite à un objet.
| `GameObject.removeComponent(Component)` | supprime un composant d'un gameObject
| `GameObject.getComponent(Object3D, Type)` | retourne le premier composant correspondant à un type sur l'objet fourni.
| `GameObject.getComponents(Object3D, Type)` | retourne tous les composants correspondant à un type sur l'objet fourni.
| `GameObject.getComponentInChildren` | idem que ``getComponent`` mais recherche également dans les objets enfants.
| `GameObject.getComponentsInChildren` | idem que ``getComponents`` mais recherche également dans les objets enfants.
| `GameObject.getComponentInParent` | idem que ``getComponent`` mais recherche également dans les objets parents.
| `GameObject.getComponentsInParent` | idem que ``getComponents`` mais recherche également dans les objets parents.
| `GameObject.findObjectOfType` | recherche dans toute la scène un type.
| `GameObject.findObjectsOfType` | recherche dans toute la scène tous les types correspondants.

## Three.js et le DOM HTML

Le contexte fait référence au runtime à l'intérieur d'un [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
La scène three.js se trouve à l'intérieur d'un composant HTML personnalisé appelé ``<needle-engine>`` (voir le fichier *index.html* dans votre projet). Vous pouvez accéder au web component ``<needle-engine>`` en utilisant ``this.context.domElement``.

Cette architecture permet potentiellement d'avoir plusieurs scènes Needle WebGL sur la même page web, qui peuvent soit s'exécuter indépendamment, soit communiquer entre elles en tant que parties de votre page web.

### Accéder à la scène
Pour accéder à la scène actuelle depuis un composant, utilisez ``this.scene``, ce qui est équivalent à ``this.context.scene``. Cela vous donne l'objet racine de la scène three.js.

Pour parcourir la hiérarchie à partir d'un composant, vous pouvez soit itérer sur les enfants d'un objet
avec une boucle for :
```ts twoslash
for(let i = 0; i < this.gameObject.children; i++)
    console.log(this.gameObject.children[i]);
```
ou vous pouvez itérer en utilisant l'équivalent de `foreach` :
```ts twoslash
for(const child of this.gameObject.children) {
    console.log(child);
}
```
Vous pouvez également utiliser des méthodes spécifiques à three.js pour itérer rapidement tous les objets récursivement en utilisant la méthode [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse) :
```ts twoslash
import { Object3D } from "three";
this.gameObject.traverse((obj: Object3D) => console.log(obj));
```
ou pour parcourir uniquement les objets visibles, utilisez [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) à la place.

Une autre option très utile lorsque vous souhaitez simplement itérer sur les objets pouvant être rendus est de interroger tous les composants renderer et d'itérer sur eux comme suit :
```ts twoslash
import { Renderer } from "@needle-tools/engine";
for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
Pour plus d'informations sur l'obtention de composants, consultez la section suivante.

### Temps
Utilisez ``this.context.time`` pour accéder aux données temporelles :
- ``this.context.time.time`` est le temps écoulé depuis le début de l'exécution de l'application
- ``this.context.time.deltaTime`` est le temps écoulé depuis la dernière frame
- ``this.context.time.frameCount`` est le nombre de frames écoulées depuis le début de l'application
- ``this.context.time.realtimeSinceStartup`` est le temps non mis à l'échelle écoulé depuis le début de l'exécution de l'application

Il est également possible d'utiliser ``this.context.time.timeScale`` pour ralentir délibérément le temps, par exemple pour des effets de ralenti.

### Entrée
Recevoir les données d'entrée pour l'objet sur lequel se trouve le composant :
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onPointerDown() {
        console.log("POINTER DOWN sur " + this.gameObject.name);
    }
}
```

Vous pouvez également vous abonner à des événements globaux dans l'énumération ``InputEvents`` comme ceci :
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable() {
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    onDisable() {
        // it is recommended to also unsubscribe from events when your component becomes inactive
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    // @nonSerialized
    inputPointerDown = (evt: NEPointerEvent) => { console.log("POINTER DOWN partout sur l'élément <needle-engine>"); }
}
```

Ou utilisez ``this.context.input`` si vous souhaitez interroger l'état de l'entrée à chaque frame :

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update() {
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN partout")
        }
    }
}
```

Si vous souhaitez gérer les entrées vous-même, vous pouvez également vous abonner à [tous les événements fournis par le navigateur](https://developer.mozilla.org/en-US/docs/Web/Events) (il y en a une tonne). Par exemple, pour vous abonner à l'événement click du navigateur, vous pouvez écrire :
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onEnable() {
        window.addEventListener("click", this.windowClick);
    }

    onDisable() {
        // unsubscribe again when the component is disabled
        window.removeEventListener("click", this.windowClick);
    }

    windowClick = () => { console.log("CLIC partout sur la page, pas seulement sur <needle-engine>"); }
}
```
Notez que dans ce cas, vous devez gérer vous-même tous les cas. Par exemple, vous pourriez avoir besoin d'utiliser différents événements si votre utilisateur visite votre site web sur un ordinateur de bureau, sur mobile ou sur un appareil VR. Ces cas sont gérés automatiquement par les événements d'entrée de Needle Engine (par exemple, ``PointerDown`` est déclenché à la fois pour le clic de souris, le toucher tactile et, dans le cas de la VR, pour le bouton du contrôleur).

### Raycasting

Utilisez ``this.context.physics.raycast()`` pour effectuer un lancer de rayon et obtenir une liste d'intersections. Si vous ne passez aucune option, le lancer de rayon est effectué depuis la position de la souris (ou la première position tactile) dans l'espace écran en utilisant la `mainCamera` actuellement active. Vous pouvez également passer un objet `RaycastOptions` qui contient diverses options comme `maxDistance`, la caméra à utiliser ou les calques à tester.

Utilisez ``this.context.physics.raycastFromRay(your_ray)`` pour effectuer un lancer de rayon en utilisant un [rayon three.js](https://threejs.org/docs/#api/en/math/Ray).

> **Note** : Ce type de lancer de rayon lance un rayon contre tous les objets visibles dans la scène. Aucun moteur physique n'est nécessaire, ce qui est différent du comportement dans Unity, où vous avez toujours besoin de colliders pour toucher les objets. Si vous voulez lancer uniquement contre les colliders physiques, utilisez les méthodes `physics.engine.raycast` décrites ci-dessous.

#### Considérations sur les performances

Lors de l'utilisation des paramètres de compression par défaut de Needle, des versions simplifiées des maillages sont automatiquement créées et utilisées également pour le lancer de rayons. Néanmoins, certains types de maillages sont lents – par exemple, les maillages skinnés ou les maillages avec blendshapes nécessitent des calculs coûteux pour déterminer les coups exacts. Considérez de définir ces objets sur le calque `Ignore Raycast` dans Unity pour éviter le lancer de rayons contre eux.

#### Raycasting basé sur la physique

Une autre option est d'utiliser les méthodes de lancer de rayons physiques qui ne retourneront que les hits avec les colliders dans la scène.

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Voici un [exemple éditable de raycast physique](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)

### Réseau
Les méthodes réseau sont accessibles via ``this.context.connection``. Veuillez vous référer à la [documentation réseau](./networking.md) pour plus d'informations.

## Accéder à Needle Engine et aux composants depuis n'importe où
Il est possible d'accéder à toutes les fonctionnalités décrites ci-dessus en utilisant du code JavaScript régulier qui n'est pas à l'intérieur de composants et qui se trouve ailleurs. Tous les composants et fonctionnalités du runtime Needle sont accessibles via l'espace de noms global ``Needle`` (vous pouvez écrire ``console.log(Needle)`` pour avoir un aperçu)

Vous pouvez trouver des composants en utilisant ``Needle.findObjectOfType(Needle.AudioSource)`` par exemple. Il est recommandé de mettre en cache ces références, car chercher dans toute la scène à plusieurs reprises est coûteux. Voir la liste pour [trouver, ajouter et supprimer des composants](#finding-adding-and-removing-components) ci-dessus.

Pour obtenir des callbacks pour le chargement initial de la scène, voir l'exemple suivant :
```js
<needle-engine loadstart="loadingStarted" progress="loadingProgress" loadfinished="loadingFinished"></needle-engine>

<script type="text/javascript">
function loadingStarted() { console.log("START") }
function loadingProgress() { console.log("LOADING...") }
function loadingFinished() { console.log("FINISHED!") }
</script>
```

Vous pouvez également vous abonner à l'événement global `NeedleEngine` (parfois aussi appelé *ContextRegistry*) pour recevoir un callback lorsqu'un contexte Needle Engine a été créé ou pour accéder à tous les contextes disponibles :
```ts twoslash
class YourComponentType extends Behaviour {}
//---cut---
import { NeedleEngine, GameObject, Behaviour } from "@needle-tools/engine";

NeedleEngine.addContextCreatedCallback((args) => {
  const context = args.context;
  const scene = context.scene;
  const myInstance = GameObject.getComponentInChildren(scene, YourComponentType);
});
```

Une autre option est d'utiliser le hook de cycle de vie `onInitialized(ctx => {})` [special](#special-lifecycle-hooks).

Vous pouvez également accéder à tous les contextes disponibles via ``NeedleEngine.Registered`` qui renvoie le tableau interne. (Notez que ce tableau ne doit pas être modifié mais peut être utilisé pour itérer sur tous les contextes actifs afin de modifier les paramètres, par exemple, définir tous les contextes sur ``context.isPaused = true``).

Ci-dessous, vous trouverez une liste des événements disponibles sur le type statique ``NeedleEngine``.
Vous pouvez vous abonner à ces événements via ``NeedleEngine.registerCallback(ContextEvent.ContextCreated, (args) => {})``

| Options ContextEvent | |
|---|---|
| `ContextEvent.ContextRegistered` | Appelé lorsque le contexte est enregistré dans le registre. |
| `ContextEvent.ContextCreationStart` | Appelé avant le chargement du premier glb et peut être utilisé pour initialiser le moteur physique. Peut retourner une promesse |
| `ContextEvent.ContextCreated` | Appelé lorsque le contexte a été créé avant la première image |
| `ContextEvent.ContextDestroyed` | Appelé lorsque le contexte a été détruit |
| `ContextEvent.MissingCamera` | Appelé lorsque le contexte n'a pas pu trouver de caméra, actuellement appelé uniquement pendant la création |
| `ContextEvent.ContextClearing` | Appelé lorsque le contexte est en cours d'effacement : tous les objets de la scène sont détruits et l'état interne est réinitialisé |
| `ContextEvent.ContextCleared` | Appelé après que le contexte a été effacé |

## Gizmos

La classe statique ``Gizmos`` peut être utilisée pour dessiner des lignes, des formes et du texte, ce qui est principalement utile pour le débogage.
Toutes les fonctions de gizmos ont plusieurs options pour, par exemple, les couleurs ou la durée pendant laquelle elles doivent être affichées dans la scène. En interne, elles sont mises en cache et réutilisées.

| Gizmos | |
| -- | -- |
| ``Gizmos.DrawLabel`` | Dessine une étiquette avec un arrière-plan optionnel. Elle peut être attachée à un objet. Retourne un handle Label qui peut être utilisé pour mettre à jour le texte. |
| ``Gizmos.DrawRay`` | Prend une origine et une direction en espace monde pour dessiner une ligne de rayon infinie |
| ``Gizmos.DrawDirection`` | Prend une origine et une direction pour dessiner une direction en espace monde |
| ``Gizmos.DrawLine`` | Prend deux points vec3 en espace monde pour dessiner une ligne |
| ``Gizmos.DrawWireSphere`` | Dessine une sphère en fil de fer en espace monde |
| ``Gizmos.DrawSphere`` | Dessine une sphère pleine en espace monde |
| ``Gizmos.DrawWireBox`` | Dessine une boîte en fil de fer en espace monde |
| ``Gizmos.DrawWireBox3`` | Dessine une boîte3 en fil de fer |
| ``Gizmos.DrawArrow`` | Dessine une flèche prenant deux points en espace monde |

## Sérialisation / Composants dans les fichiers glTF
Pour intégrer des composants et recréer des composants avec leurs types corrects en glTF, nous devons également enregistrer des types non primitifs (tout ce qui n'est pas un ``Number``, ``Boolean`` ou ``String``). Vous pouvez le faire en ajoutant un décorateur ``@serializable(<type>)`` au-dessus de votre champ ou propriété.

**Exemple :**
@[code ts twoslash](@code/component-object-reference.ts)

Pour sérialiser vers et depuis des formats personnalisés, il est possible d'étendre la classe ``TypeSerializer`` et de créer une instance. Utilisez ``super()`` dans le constructeur pour enregistrer les types pris en charge.

> **Note** : En plus des champs correspondants, les propriétés correspondantes seront également exportées si elles correspondent à des champs dans le fichier typescript.

## Chargement de scènes
In Unity referenced Prefabs, SceneAssets and AssetReferences (Unity's Addressable System) will automatically be exported as glTF files (please refer to the [Export Prefabs](export.md) documentation).

These exported gltf files will be serialized as plain string URIs. To simplify loading these from TypeScript components, we added the concept of ``AssetReference`` types. They can be loaded at runtime and thus allow to defer loading parts of your app or loading external content.

**Example:**
@[code ts twoslash](@code/component-prefab.ts)

Les AssetReferences sont mis en cache par URI, donc si vous référencez le même glTF/Prefab exporté dans plusieurs composants/scripts, il ne sera chargé qu'une seule fois et ensuite réutilisé.

# Prochaines étapes

---
Page automatiquement traduite par IA