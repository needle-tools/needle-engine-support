---
title: Introduction au Scripting pour les Développeurs Unity
---

Needle Engine offre une intégration étroite dans l'Unity Editor. Cela permet aux développeurs et aux designers de travailler ensemble dans un environnement familier et de proposer des expériences web rapides, performantes et légères.

Le guide suivant s'adresse principalement aux développeurs ayant une expérience Unity3D, mais il peut également être utile aux développeurs ayant une expérience web ou three.js. Il couvre des sujets concernant la manière dont les choses sont faites dans Unity par rapport à three.js ou Needle Engine.

Si vous êtes novice en Typescript et Javascript et que vous souhaitez vous lancer dans l'écriture de scripts pour Needle Engine, nous vous recommandons également de lire le [Guide des Essentiels de Typescript](./typescript-essentials) pour une compréhension de base des différences entre C# et Javascript/Typescript.

Si vous souhaitez coder en même temps, vous pouvez [ouvrir engine.needle.tools/new](https://engine.needle.tools/new) pour créer un petit projet que vous pouvez éditer dans le navigateur ⚡

## Les Bases
Needle Engine est un moteur web 3D basé sur [three.js](https://threejs.org/). three.js est l'une des bibliothèques de rendu 3D webgl les plus populaires pour le web. Chaque fois que nous faisons référence à un `gameObject` dans Needle Engine, nous parlons *en fait* aussi d'un `Object3D` de three.js, le type de base de tout objet dans three.js. Les deux termes peuvent être utilisés de manière interchangeable. Tout `gameObject` *est* un `Object3D`.

Cela signifie également que - si vous êtes déjà familier avec three.js - vous n'aurez aucun problème à utiliser Needle Engine. Tout ce que vous pouvez faire avec three.js peut également être fait dans Needle Engine. Si vous utilisez déjà certaines bibliothèques, vous pourrez également les utiliser dans un environnement basé sur Needle Engine.

Note : **L'Exportateur de Needle Engine ne compile PAS votre code C# existant en Web Assembly**.
Bien que l'utilisation de Web Assembly _puisse_ entraîner de meilleures performances à l'exécution, elle a un coût élevé en termes de vitesse d'itération et de flexibilité dans la construction d'expériences web. Lisez-en davantage sur notre [vision](./../vision.md) et notre [aperçu technique](./../technical-overview.md).

:::details Comment créer un nouveau projet Unity avec Needle Engine ? (Vidéo)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />
:::

## Créer un Composant
Dans Unity, vous créez un nouveau composant en dérivant de `MonoBehaviour` :
```csharp
using UnityEngine;
public class MyComponent : MonoBehaviour {
}
```

Un composant personnalisé dans Needle Engine est écrit comme suit :
```ts twoslash
import { Behaviour } from "@needle-tools/engine"
export class MyComponent extends Behaviour {
}
```
## Champs de Script

### serializable
Si vous avez vu certains scripts Needle Engine, vous avez peut-être remarqué que certaines variables sont annotées avec `@serializable` au-dessus de leur déclaration. C'est un Décorateur en Typescript et il peut être utilisé pour modifier ou annoter du code. Dans Needle Engine, cela est utilisé par exemple pour indiquer à la sérialisation centrale quels types nous attendons dans notre script lors de la conversion des informations brutes du composant stockées dans le glTF en une instance de Composant.
Considérez l'exemple suivant :
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

class SomeClass extends Behaviour{
    @serializable(Behaviour)
    myOtherComponent?: Behaviour;
    @serializable(Object3D)
    someOtherObject?: Object3D;
}
```
Cela indique à Needle Engine que `myOtherComponent` doit être de type `Behaviour`. Il assignera alors automatiquement la référence correcte au champ lors du chargement de votre scène. Il en va de même pour `someOtherObject` où nous voulons désérialiser en une référence `Object3D`.

Notez que dans certains cas, le type peut être omis. Cela peut être fait pour tous les [types primitifs en Javascript](https://developer.mozilla.org/en-US/docs/Glossary/Primitive). Ce sont `boolean`, `number`, `bigint`, `string`, `null` et `undefined`.
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    @serializable() // < pas de type nécessaire ici car le type du champ est un primitif
    myString?: string;
}
```

### public vs private
Les champs sans modificateur d'accès comme `private`, `public` ou `protected` seront par défaut `public` en javascript
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    /// pas de modificateur signifie qu'il est public :
    myNumber?: number;
    // le rendre explicitement privé :
    private myPrivateNumber?: number;
    protected myProtectedNumber?: number;
}
```
Il en va de même pour les méthodes.

## GameObjects et la Scène
Pour accéder à la scène actuelle depuis un composant, vous utilisez `this.scene` qui est équivalent à `this.context.scene`, ce qui vous donne l'objet racine de la scène three.js.

Pour parcourir la hiérarchie depuis un composant, vous pouvez soit itérer sur les enfants d'un objet
avec une boucle for :
```ts twoslash
for (let i = 0; i < this.gameObject.children; i++) {
    console.log(this.gameObject.children[i]);
}
```
ou vous pouvez itérer en utilisant l'équivalent de `foreach` :
```ts twoslash
for (const child of this.gameObject.children) {
    console.log(child);
}
```
Vous pouvez également utiliser des méthodes spécifiques à three.js pour itérer rapidement sur tous les objets de manière récursive en utilisant la méthode [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse) :
```ts twoslash
import { GameObject } from "@needle-tools/engine";
//---cut-before---
this.gameObject.traverse((obj: GameObject) => console.log(obj))
```
ou pour parcourir uniquement les objets visibles, utilisez plutôt [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible).

Une autre option très utile lorsque vous souhaitez simplement itérer sur les objets rendables est de rechercher tous les composants Renderer et de les parcourir ainsi :
```ts twoslash
import { Renderer } from "@needle-tools/engine";

for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
Pour plus d'informations sur la récupération de composants, consultez la section suivante.

## Composants
Needle Engine utilise intensivement un Système de Composants similaire à celui d'Unity. Cela signifie que vous pouvez ajouter ou supprimer des composants à tout `Object3D` / `GameObject` dans la scène. Un composant sera enregistré auprès du moteur en utilisant `addNewComponent(<Object3D>, <ComponentType>)`.
Les méthodes événementielles du composant attaché seront alors automatiquement appelées par le moteur (par exemple `update` ou `onBeforeRender`). Une liste complète des méthodes événementielles peut être trouvée dans la [documentation sur le scripting](../scripting.md#lifecycle-methods).

#### Trouver des Composants dans la Scène
Pour obtenir des composants, vous pouvez utiliser les méthodes familières similaires à Unity. Notez que ce qui suit utilise le type `Animator` comme exemple, mais vous pouvez aussi bien utiliser n'importe quel type de composant intégré ou créé par vous-même.
| Nom de la méthode | Description |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | Obtient le composant `Animator` sur un GameObject/Object3D. Il retournera soit l'instance `Animator` si l'objet a un composant Animator, soit `null` si l'objet n'a pas un tel composant. |
| `this.gameObject.getComponentInChildren(Animator)` | Obtient le premier composant `Animator` sur un GameObject/Object3D ou sur l'un de ses enfants. |
| `this.gameObject.getComponentsInParents(Animator)` | Obtient tous les composants animator dans la hiérarchie parente (y compris le GameObject/Object3D actuel).

Ces méthodes sont également disponibles sur le type statique GameObject. Par exemple, ``GameObject.getComponent(this.gameObject, Animator)`` pour obtenir le composant `Animator` sur un GameObject/Object3D passé en argument.

Pour rechercher dans toute la scène un ou plusieurs composants, vous pouvez utiliser ``GameObject.findObjectOfType(Animator)`` ou `GameObject.findObjectsOfType(Animator)`.

## Types Unity renommés
Certains types spécifiques à Unity sont mappés à des noms de types différents dans notre moteur. Voir la liste suivante :

| Type dans Unity | Type dans Needle Engine |  |
| -- | -- | -- |
| `UnityEvent` | `EventList` | Un UnityEvent sera exporté en tant que type `EventList` (utiliser `serializable(EventList)` pour désérialiser les UnityEvents) |
| `GameObject` | `Object3D` | |
| `Transform` | `Object3D` | Dans three.js et Needle Engine, un GameObject et un Transform sont les mêmes (il n'y a pas de composant `Transform`). La seule exception à cette règle est lorsque l'on fait référence à un `RectTransform` qui est également un composant dans Needle Engine. |
| `Color` | `RGBAColor` | Le type de couleur de three.js ne possède pas de propriété alpha. Pour cette raison, tous les types Color exportés depuis Unity seront exportés en tant que `RGBAColor`, qui est un type personnalisé de Needle Engine. |

## Transform
Les données de Transform peuvent être accédées directement sur le `GameObject` / `Object3D`. Contrairement à Unity, il n'y a pas de composant de transform supplémentaire qui détient ces données.
- ``this.gameObject.position`` est la [position](https://threejs.org/docs/?q=obj#api/en/core/Object3D.position) Vector3 dans l'espace local
- ``this.gameObject.worldPosition`` est la position Vector3 dans l'espace monde
- ``this.gameObject.rotation`` est la [rotation d'Euler](https://threejs.org/docs/?q=obj#api/en/core/Object3D.rotation) dans l'espace local
- ``this.gameObject.worldRotation`` est la rotation d'Euler en angles d'Euler dans l'espace monde
- ``this.gameObject.quaternion`` - est la [rotation par quaternion](https://threejs.org/docs/?q=obj#api/en/core/Object3D.quaternion) dans l'espace local
- ``this.gameObject.worldQuaternion`` est la rotation par quaternion dans l'espace monde
- ``this.gameObject.scale`` - est la [scale](https://threejs.org/docs/?q=obj#api/en/core/Object3D.scale) Vector3 dans l'espace local
- ``this.gameObject.worldScale`` est la scale Vector3 dans l'espace monde

La différence majeure à garder à l'esprit ici est que `position` dans three.js est par défaut une position en espace local, tandis que dans Unity `position` serait en espace monde et utiliserait `localPosition` pour délibérément utiliser la position en espace local. La section suivante expliquera comment obtenir la position en espace monde dans three.js.

### Position, Rotation, Scale... MONDE

Dans three.js (et donc aussi dans Needle Engine) les `object.position`, `object.rotation`, `object.scale` sont toutes des coordonnées en espace local. C'est différent de Unity où nous sommes habitués à ce que `position` soit en espace monde et à utiliser `localPosition` pour utiliser délibérément la position en espace local.

Si vous souhaitez accéder aux coordonnées mondiales dans Needle Engine, nous disposons de méthodes utilitaires que vous pouvez utiliser avec vos objets. Appelez `getWorldPosition(yourObject)` pour calculer la position mondiale. Des méthodes similaires existent pour la rotation/quaternion et la scale. Pour accéder à ces méthodes, importez-les simplement depuis Needle Engine comme ceci : `import { getWorldPosition } from "@needle.tools/engine"`.

Notez que ces méthodes utilitaires comme `getWorldPosition`, `getWorldRotation`, `getWorldScale` ont en interne un tampon d'instances Vector3 et sont destinées à être utilisées localement uniquement. Cela signifie que vous ne devriez pas les mettre en cache dans votre composant, sinon votre valeur mise en cache sera éventuellement écrasée. Mais il est sûr d'appeler `getWorldPosition` plusieurs fois dans votre fonction pour effectuer des calculs sans avoir à vous soucier de réutiliser la même instance. Si vous n'êtes pas sûr de ce que cela signifie, vous devriez jeter un œil à la section **Primitive Types** dans le [Guide des Essentiels de Typescript](./typescript-essentials.md#primitive-types).

## Temps
Utilisez `this.context.time` pour accéder aux données temporelles :
- `this.context.time.time` est le temps écoulé depuis le démarrage de l'application
- `this.context.time.deltaTime` est le temps écoulé depuis la dernière frame
- `this.context.time.frameCount` est le nombre de frames écoulées depuis le démarrage de l'application
- `this.context.time.realtimeSinceStartup` est le temps non mis à l'échelle écoulé depuis le démarrage de l'application

Il est également possible d'utiliser `this.context.time.timeScale` pour ralentir délibérément le temps, par exemple pour des effets de ralenti.

## Raycasting
Utilisez ``this.context.physics.raycast()`` pour effectuer un raycast et obtenir une liste d'intersections. Si vous ne passez aucune option, le raycast est effectué depuis la position de la souris (ou la première position tactile) dans l'espace écran en utilisant la `mainCamera` actuellement active. Vous pouvez également passer un objet `RaycastOptions` qui contient divers paramètres comme `maxDistance`, la caméra à utiliser ou les layers à tester.

Utilisez ``this.context.physics.raycastFromRay(your_ray)`` pour effectuer un raycast en utilisant un [rayon three.js](https://threejs.org/docs/#api/en/math/Ray).

Notez que les appels ci-dessus effectuent par défaut un raycasting contre les objets de scène visibles. C'est différent d'Unity où vous avez toujours besoin de colliders pour toucher des objets. La solution par défaut de three.js a à la fois des avantages et des inconvénients, l'un des principaux inconvénients étant qu'elle peut être assez lente selon la géométrie de votre scène. Elle peut être particulièrement lente lors du raycasting contre des skinned meshes. Il est donc recommandé de généralement définir les objets avec des SkinnedMeshRenderers dans Unity sur le layer `Ignore Raycast`, qui sera alors ignoré par défaut par Needle Engine également.

Une autre option est d'utiliser les méthodes de raycast de la physique qui ne renverront que les hits avec des colliders dans la scène.

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Voici un [exemple éditable pour le raycast physique](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore).

## Input
Utilisez ``this.context.input`` pour interroger l'état de l'input :

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update(){
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN")
        }
    }
}
```

Vous pouvez également vous abonner à des événements dans l'enum ``InputEvents`` comme ceci :
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable(){
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }
    onDisable() {
        // il est recommandé de également se désabonner des événements lorsque votre composant devient inactif
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    inputPointerDown = (evt: NEPointerEvent) => { console.log(evt); }
}
```

Si vous souhaitez gérer les inputs vous-même, vous pouvez également vous abonner à [tous les événements fournis par le navigateur](https://developer.mozilla.org/en-US/docs/Web/Events) (il y en a une tonne). Par exemple, pour vous abonner à l'événement click du navigateur, vous pouvez écrire :
```ts twoslash
window.addEventListener("click", () => { console.log("MOUSE CLICK"); });
```
Notez que dans ce cas, vous devez gérer tous les cas vous-même. Par exemple, vous pourriez avoir besoin d'utiliser différents événements si votre utilisateur visite votre site web sur un ordinateur de bureau, un mobile ou un appareil VR. Ces cas sont automatiquement gérés par les événements d'input de Needle Engine (par exemple, `PointerDown` est déclenché à la fois pour le mouse down, le touch down et, dans le cas de la VR, pour le button down du contrôleur).

## Callbacks InputSystem
De manière similaire à Unity (voir [IPointerClickHandler dans Unity](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html)), vous pouvez également vous enregistrer pour recevoir des événements d'input sur le composant lui-même.

Pour que cela fonctionne, assurez-vous que votre objet possède un composant ``ObjectRaycaster`` ou ``GraphicRaycaster`` dans la hiérarchie parente.

```ts twoslash
import { Behaviour, IPointerEventHandler, PointerEventData } from "@needle-tools/engine";

export class ReceiveClickEvent extends Behaviour implements IPointerEventHandler {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```

Note : `IPointerEventHandler` abonne l'objet à tous les événements de pointeur possibles. Les gestionnaires correspondants sont :
- `onPointerDown`
- `onPointerUp`
- `onPointerEnter`
- `onPointerMove`
- `onPointerExit`
- `onPointerClick`

Tous ont un argument `PointerEventData` décrivant l'événement.

## Debug.Log
L'équivalent de `Debug.Log()` en javascript est `console.log()`. Vous pouvez également utiliser `console.warn()` ou `console.error()`.
```ts twoslash
import { GameObject, Renderer } from "@needle-tools/engine";
const someVariable = 42;
// ---cut-before---

console.log("Hello web");
// Vous pouvez passer autant d'arguments que vous le souhaitez comme ceci :
console.log("Hello", someVariable, GameObject.findObjectOfType(Renderer), this.context);
```

## Gizmos
Dans Unity, vous devez normalement utiliser des méthodes spéciales pour dessiner des Gizmos comme `OnDrawGizmos` ou `OnDrawGizmosSelected`. Dans Needle Engine, de telles méthodes n'existent pas et vous êtes libre de dessiner des gizmos depuis n'importe où dans votre script. Notez qu'il est alors également de votre responsabilité de *ne pas* les dessiner, par exemple, dans votre application web déployée (vous pouvez simplement les filtrer par `if(isDevEnvironment))`).

Voici un exemple pour dessiner une sphère filaire rouge pendant une seconde, par exemple pour visualiser un point en espace monde :
```ts twoslash
import { Vector3 } from "three";
const hit = { point: new Vector3(0, 0, 0) };
// ---cut-before---
import { Gizmos } from "@needle-tools/engine";
Gizmos.DrawWireSphere(hit.point, 0.05, 0xff0000, 1);
```
Voici quelques-unes des méthodes de gizmo disponibles :
| Nom de la méthode |  |
| --- | --- |
| `Gizmos.DrawArrow` | |
| `Gizmos.DrawBox` | |
| `Gizmos.DrawBox3` | |
| `Gizmos.DrawDirection` | |
| `Gizmos.DrawLine` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawSphere` | |
| `Gizmos.DrawWireSphere` | |

## Méthodes Utiles

Importer depuis `@needle-tools/engine` par exemple `import { getParam } from "@needle-tools/engine"`

| Nom de la méthode | Description |
| --- | --- |
| `getParam()` | Vérifie si un paramètre d'URL existe. Retourne true s'il existe mais n'a pas de valeur (par exemple `?help`), false s'il n'est pas trouvé dans l'URL ou est défini à 0 (par exemple `?help=0`), sinon il retourne la valeur (par exemple `?message=test`). |
| `isMobileDevice()` | Retourne true si l'application est accédée depuis un appareil mobile. |
| `isDevEnvironment()` | Retourne true si l'application actuelle s'exécute sur un serveur local. |
| `isMozillaXR()` | |
| `isiOS` | |
| `isSafari` | |

```ts twoslash
import { isMobileDevice } from "@needle-tools/engine"
if( isMobileDevice() )
```

```ts twoslash
import { getParam } from "@needle-tools/engine"
// retourne true
const myFlag = getParam("some_flag")
console.log(myFlag)
```

## Le projet Web
En C#, vous travaillez généralement avec une solution contenant un ou plusieurs projets. Dans Unity, cette solution est gérée par Unity pour vous et lorsque vous ouvrez un script C#, il ouvre le projet et vous montre le fichier.
Vous installez généralement des Packages à l'aide du gestionnaire de packages intégré d'Unity pour ajouter des fonctionnalités fournies par Unity ou d'autres développeurs (soit de votre équipe, soit par exemple via l'AssetStore d'Unity). Unity fait un excellent travail pour faciliter l'ajout et la gestion des packages avec son PackageManager et vous n'avez peut-être jamais eu à modifier manuellement un fichier comme le `manifest.json` (c'est ce qu'Unity utilise pour suivre les packages installés) ou à exécuter une commande en ligne de commande pour installer un package.

Dans un environnement web, vous utilisez `npm` - le Node Package Manager - pour gérer les dépendances / packages pour vous. Il fait en gros la même chose que le PackageManager d'Unity - il installe (télécharge) des packages depuis *un certain* serveur (vous l'entendez généralement appelé *registry* dans ce contexte) et les place dans un dossier nommé `node_modules`.

Lorsque vous travaillez avec un projet web, la plupart de vos dépendances sont installées depuis [npmjs.com](https://npmjs.com/). C'est le registry de packages le plus populaire pour les projets web.

Voici un exemple de ce à quoi pourrait ressembler un package.json :
```json
{
  "name": "@optional_org/package_name",
  "version": "1.0.0",
  "scripts": {
    "start": "vite --host"
  },
  "dependencies": {
	  "@needle-tools/engine": "^3.5.9-beta",
	  "three": "npm:@needle-tools/three@0.146.8"
	},
  "devDependencies": {
	  "@types/three": "0.146.0",
	  "@vitejs/plugin-basic-ssl": "^1.0.1",
	  "typescript": "^5.0.4",
	  "vite": "^4.3.4",
	  "vite-plugin-compression": "^0.5.1"
	}
}
```

Notre modèle par défaut utilise Vite comme bundler et n'a pas de framework frontend préinstallé. Needle Engine n'a pas d'opinion sur le framework à utiliser, vous êtes donc libre de travailler avec le framework que vous préférez. Nous avons des exemples pour des frameworks populaires comme Vue.js, Svelte, Next.js, React ou React Three Fiber.

## Installer des packages & dépendances
Pour installer une dépendance depuis npm, vous pouvez ouvrir votre projet web dans une ligne de commande (ou un terminal) et exécuter `npm i <the/package_name>` (raccourci pour `npm install`).
Par exemple, exécutez `npm i @needle-tools/engine` pour installer [Needle Engine](https://www.npmjs.com/package/@needle-tools/engine). Cela ajoutera alors le package à votre `package.json` dans le tableau `dependencies`.
Pour installer un package uniquement en tant que devDependency, vous pouvez exécuter `npm i --save-dev <package_name>`. Plus d'informations sur la différence entre dependencies et devDependencies ci-dessous.

### Quelle est la différence entre 'dependencies' et 'devDependencies'
Vous avez peut-être remarqué qu'il y a deux entrées contenant *dependency* - `dependencies` et `devDependencies`.

Les `dependencies` sont **toujours installées** (ou regroupées) lorsque votre projet web est installé ou dans les cas où vous développez une bibliothèque et que votre package est installé en tant que dépendance d'un autre projet.

Les `devDependencies` ne sont **installées** que lors du développement du projet (ce qui signifie que lorsque vous exécutez directement `install` dans le répertoire spécifique) et elles ne sont autrement **pas** incluses dans votre projet.

### Comment installer un autre package ou une dépendance et comment l'utiliser ?
La section [Installer](#installing) nous a appris que vous pouvez installer des dépendances en exécutant `npm i <package_name>` dans le répertoire de votre projet, où `package_name` peut être n'importe quel package que vous trouvez sur [npm.js](https://npmjs.org).

Supposons que vous souhaitiez ajouter une bibliothèque de tweening à votre projet. Nous utiliserons [`@tweenjs/tween.js`](https://www.npmjs.com/package/@tweenjs/tween.js) pour cet exemple. [Ici](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts) se trouve le projet final si vous voulez sauter en avant et voir le résultat.

Exécutez d'abord `npm install @tweenjs/tween.js` dans le terminal et attendez que l'installation se termine. Cela ajoutera une nouvelle entrée à notre package.json :
```json
"dependencies": {
    "@needle-tools/engine": "^3.5.11-beta",
    "@tweenjs/tween.js": "^20.0.3",
    "three": "npm:@needle-tools/three@0.146.8"
}
```

Ouvrez ensuite l'un de vos fichiers de script dans lequel vous souhaitez utiliser le tweening et importez-le en haut du fichier :
```ts twoslash
import * as TWEEN from '@tweenjs/tween.js';
```
Notez que nous importons ici tous les types de la bibliothèque en écrivant `* as TWEEN`. Nous pourrions également importer uniquement des types spécifiques comme `import { Tween } from @tweenjs/tween.js`.

Maintenant, nous pouvons l'utiliser dans notre script. Il est toujours recommandé de se référer à la documentation de la bibliothèque que vous souhaitez utiliser. Dans le cas de tween.js, ils fournissent un [guide utilisateur](https://github.com/tweenjs/tween.js/blob/HEAD/docs/user_guide.md) que nous pouvons suivre. Habituellement, la page Readme du package sur npm contient des informations sur l'installation et l'utilisation du package.

Pour faire tourner un cube, nous créons un nouveau type de composant appelé `TweenRotation`, puis nous créons notre instance de tween pour la rotation de l'objet, le nombre de répétitions, l'easing à utiliser, le tween que nous voulons effectuer, puis nous le démarrons. Nous devons ensuite simplement appeler `update` à chaque frame pour mettre à jour l'animation de tween. Le script final ressemble à ceci :
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
import * as TWEEN from '@tweenjs/tween.js';

export class TweenRotation extends Behaviour {

    // enregistrer l'instance de notre tweener
    private _tween?: TWEEN.Tween<any>;

    start() {
        const rotation = this.gameObject.rotation;
        // créer l'instance de tween
        this._tween = new TWEEN.Tween(rotation);
        // le définir pour se répéter à l'infini
        this._tween.repeat(Infinity);
        // définir l'easing à utiliser
        this._tween.easing(TWEEN.Easing.Quintic.InOut);
        // définir les valeurs à tweener
        this._tween.to({ y: Math.PI * 0.5 }, 1000);
        // le démarrer
        this._tween.start();
    }

    update() {
        // mettre à jour le tweening à chaque frame
        // le '?' est un raccourci pour vérifier si _tween a été créé
        this._tween?.update();
    }
}
```
Maintenant, il ne nous reste plus qu'à l'ajouter à n'importe quel objet de notre scène pour le faire tourner indéfiniment.
Vous pouvez voir le script final en action [ici](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts).

# Pour en savoir plus

- [Scripting dans Needle Engine](../scripting)
- [Essentiels de Typescript](./typescript-essentials.md)
- [Référence des Composants](../component-reference.md)

***
Page automatiquement traduite à l'aide de l'IA