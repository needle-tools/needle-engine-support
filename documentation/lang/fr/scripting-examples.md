---
title: Exemples de Scripting
description: Une collection d'extraits et d'exemples de scripts utiles.
---

# Exemples de Scripting

Si vous débutez dans le scripting, nous **recommandons fortement** de lire d'abord les guides suivants :

- [Guide du débutant : Essentiels de Typescript](./getting-started/typescript-essentials.md)
- [Guide du débutant : Needle Engine pour les développeurs Unity](./getting-started/for-unity-developers.md)
- [Tutoriel vidéo : Comment écrire des composants personnalisés](https://youtu.be/uf5UK0bLHlY?si=82U_2L4n2V7XL7RJ)

Ci-dessous, vous trouverez quelques scripts de base comme référence rapide.

Nous proposons également de nombreuses scènes d'exemple et des projets complets que vous pouvez télécharger et utiliser comme point de départ :
- [Visiter le site web des exemples](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=scripting_examples)
- [Télécharger le package d'exemples](https://engine.needle.tools/downloads/unity/samples)
- [Collection Stackblitz Needle Engine](https://stackblitz.com/@marwie/collections/needle-engine)
- [API Needle Engine](https://engine.needle.tools/api)

## Composant de base
<stackblitz file="@code/basic-component.ts"></stackblitz>
@[code ts twoslash](@code/basic-component.ts)

voir [scripting](scripting#lifecycle-methods) pour tous les événements de composant

## Référencer un objet depuis Unity
@[code ts twoslash](@code/component-object-reference.ts)

## Référencer et charger un asset depuis Unity (Prefab ou SceneAsset)
@[code ts twoslash](@code/component-prefab.ts)

## Référencer et charger des scènes depuis Unity
::: tip
Trouvez un [exemple fonctionnel dans nos échantillons](https://engine.needle.tools/samples/multi-scenes-(dynamic-loading)) à télécharger et à essayer
:::

@[code ts twoslash](@code/component-scene.ts)

## Recevoir des clics sur des objets
Ajoutez ce script à tout objet de votre scène que vous souhaitez rendre cliquable. Assurez-vous également d'avoir un composant `ObjectRaycaster` dans la hiérarchie parente de cet objet.

<stackblitz file="@code/component-click.ts">
test
</stackblitz>

@[code ts twoslash](@code/component-click.ts)


## Clics réseau sur les objets

Ajoutez ce script à tout objet de votre scène que vous souhaitez rendre cliquable. Assurez-vous également d'avoir un composant `ObjectRaycaster` dans la hiérarchie parente de cet objet.
Le composant enverra le clic reçu à tous les clients connectés et déclenchera un événement auquel vous pourrez ensuite réagir dans votre application. Si vous utilisez Unity ou Blender, vous pouvez simplement assigner des fonctions à appeler à l'événement `onClick` pour, par exemple, lire une animation ou masquer des objets.

@[code ts twoslash](@code/component-click-networking.ts)

### Lire une animation au clic
@[code ts twoslash](@code/component-animation-onclick.ts)

## Référencer un clip d'animation
Cela peut être utile si vous souhaitez exécuter votre logique d'animation personnalisée.
Vous pouvez également exporter un tableau de clips.
@[code ts twoslash](@code/component-animationclip.ts)


## Créer et déclencher un UnityEvent

@[code ts twoslash](@code/component-unityevent.ts)
::: tip
Les événements EventList sont également déclenchés au niveau du composant. Cela signifie que vous pouvez également vous abonner à l'événement déclaré ci-dessus en utilisant ``myComponent.addEventListener("my-event", evt => {...})`` également.
Ceci est une fonctionnalité expérimentale. Veuillez nous faire part de vos commentaires sur notre [forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)
:::


### Déclarer un type d'événement personnalisé
Ceci est utile lorsque vous souhaitez exposer un événement à Unity ou Blender avec des arguments personnalisés (comme une chaîne de caractères)
@[code ts twoslash](@code/component-customevent.ts)

_Exemple d'utilisation :_
![20221128-210735_Unity-needle](https://user-images.githubusercontent.com/2693840/204370950-4c89b877-90d7-4e6f-8266-3352e6da16f4.png)

## Utiliser des objets imbriqués et la sérialisation

Vous pouvez imbriquer des objets et leurs données. Avec des décorateurs `@serializable(SomeType)` correctement assortis, les données seront automatiquement sérialisées et désérialisées dans les types corrects.

Dans votre composant TypeScript :
@[code ts twoslash](@code/component-nested-serialization.ts)

En C# dans n'importe quel script :
@[code](@code/component-nested-serialization-cs.cs)

::: tip
Sans les décorateurs de type corrects, vous obtiendrez toujours les données, mais simplement sous forme d'objet brut. C'est utile lors du portage de composants, car vous aurez accès à toutes les données et pourrez ajouter les types selon les besoins.
:::

## Utiliser les API web
::: tip
Gardez à l'esprit que vous avez toujours accès à toutes les API web et aux packages [npm](https://npmjs.org) !
C'est la beauté de Needle Engine, si nous pouvons nous permettre de le dire ici 😊
:::

### Afficher la position actuelle
@[code ts twoslash](@code/component-location.ts)

### Afficher l'heure actuelle en utilisant une Coroutine
@[code ts twoslash](@code/component-time.ts)

<video-embed src="./videos/component-time.mp4" limit_height />


## Modifier une propriété de shader personnalisée

En supposant que vous ayez un shader personnalisé avec une propriété nommée `_Speed` qui est une valeur flottante, voici comment la modifier depuis un script.
Vous pouvez trouver un [exemple fonctionnel à télécharger dans nos échantillons](https://engine.needle.tools/samples/shaders/)

<!-- SAMPLE modify custom shader material property -->


## Commutation de l'attribut src

Voir l'[exemple fonctionnel](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html) sur StackBlitz


## Ajout de nouveaux effets de post-traitement

Assurez-vous d'installer [`npm i postprocessing`](https://github.com/pmndrs/postprocessing) dans votre projet web. Vous pouvez ensuite ajouter de nouveaux effets en dérivant de `PostProcessingEffect`.

Pour utiliser l'effet, ajoutez-le au même objet que votre composant `Volume`.

Voici un exemple qui encapsule l'[effet de post-traitement Outline](https://pmndrs.github.io/postprocessing/public/demo/#outline). Vous pouvez exposer des variables et des paramètres comme d'habitude, car tout effet est également un composant dans votre scène three.js.

@[code](@code/custom-post-effect.ts)


## Comportement personnalisé du système de particules


@[code ts twoslash](@code/custom-particle-system-behaviour.ts)


## Composant audio 2D personnalisé

C'est un exemple de la façon dont vous pourriez créer votre propre composant audio.
Cependant, pour la plupart des cas d'utilisation, vous pouvez utiliser le composant AudioSource principal et n'avez pas besoin d'écrire de code.

@[code ts twoslash](@code/component-2d-audio.ts)


## Fichiers externes arbitraires

Utilisez le type FileReference pour charger des fichiers externes (par exemple, un fichier json)
@[code ts twoslash](@code/component-filereference.ts)

<!-- SAMPLE receive click from HTML button
## Receiving html element click in component
-->



<!-- SAMPLE disable environment light
## Disable environment light
-->


<!-- SAMPLE using mediapipe with hands
## Use mediapipe package to control the 3D scene with hands
Make sure to install the mediapipe package. Visit the github link below to see the complete project setup.
Try it [live here](https://engine.needle.tools/samples/mediapipe-hands/) - requires a webcam/camera
-->


<!-- SAMPLE Change Color On Collision
## Change Color On Collision
-->

<!-- SAMPLE Physics Trigger Relay
## Physics Trigger Relay
Invoke events using an objects physics trigger methods
-->

<!-- SAMPLE Auto Reset
## Auto Reset
Reset an object's position automatically when it's leaving a physics trigger
-->

<!-- SAMPLE Play Audio On Collision
## Play Audio On Collision
-->

<!-- SAMPLE Set Random Color
## Set Random Color
Randomize the color of an object on start. Note that the materials are cloned in the `start` method
-->

<!-- SAMPLE Timed Spawn
## Spawn Objects Over Time
-->

---
Page automatiquement traduite par IA