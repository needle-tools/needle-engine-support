---
title: Everywhere Actions
---

## Qu'est-ce que les Everywhere Actions ?

Les Everywhere Actions de Needle sont un ensemble de composants soigneusement sélectionnés qui vous permettent de créer des expériences interactives dans Unity sans écrire une seule ligne de code.
Elles sont conçues pour servir de blocs de construction pour des expériences sur le web, mobile et XR, **y compris la réalité augmentée sur iOS**.

À partir de triggers et actions de bas niveau, des comportements interactifs complexes de niveau supérieur peuvent être construits.

### Plateformes prises en charge
- Desktop
- Mobile (Android / iOS)
- Lunettes VR
- Appareils AR
- iOS AR – QuickLook (oui, vraiment !)

## Comment utiliser les Everywhere Actions ?

Pour le support iOS, ajoutez le composant `USDZExporter` à votre scène. Il est recommandé de l'ajouter au même objet que le composant `WebXR` (mais ce n'est pas obligatoire).

Pour ajouter une action à n'importe quel objet de votre scène
sélectionnez-le, puis cliquez sur `Add Component > Needle > Everywhere Actions > [Action]`.

![](/imgs/everywhere-actions-component-menu.gif)

## Liste des Everywhere Actions

| Action | Description | Exemples d'utilisation |
| --- | --- | --- |
| Play Animation on Click | Joue un état d'animation sélectionné à partir d'un Animator. Après avoir joué, il peut éventuellement passer à une autre animation. | Présentations de produits, tutoriels interactifs, mouvement de personnage |
| Change Material on Click | Échange un material contre d'autres. Tous les objets utilisant ce material seront changés ensemble. | Configurateurs de produits, personnages |
| Look At | Fait regarder un objet vers la caméra. | Éléments d'interface utilisateur, sprites, infographies, effets de billboard, zones cliquables (hotspots) |
| Play Audio on Click | Joue un clip audio sélectionné. | Effets sonores, narration, expositions de musée |
| Hide on Start | Cache un objet au démarrage de la scène pour le révéler ultérieurement. |
| Set Active on Click | Montre ou cache des objets. |  |
| Change Transform on Click | Déplace, fait pivoter ou met à l'échelle un objet. Permet un mouvement absolu ou relatif. | Personnages, produits, animation d'interface utilisateur (utiliser l'animation pour des mouvements plus complexes) |
| Audio Source | Joue un son au démarrage et continue de boucler. Spatial ou non-spatial. | Musique de fond, sons d'ambiance |
| WebXR Image Tracking | Suive une image cible et montre ou cache des objets. | Expériences AR, présentations de produits |

## Exemples (Samples)

### Musical Instrument

Démontre l'audio spatial, l'animation et les interactions.

<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Simple Character Controllers

Démontre la combinaison d'animations, de look at et de mouvement.

<sample src="https://engine.needle.tools/samples-uploads/usdz-characters" />

### Image Tracking

Démontre comment attacher du contenu 3D à un marqueur d'image personnalisé. Lancez la scène ci-dessous en AR et pointez la caméra de votre téléphone vers le marqueur d'image sur un écran, ou imprimez-le.

<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Image Marker" width=300 />

<a href="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" target="_blank">Télécharger l'exemple de marqueur d'image</a>

**Sur Android :** veuillez activer "WebXR Incubations" dans les Chrome Flags. Vous pouvez les trouver en copiant [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) dans la barre d'adresse du navigateur Chrome de votre téléphone Android.

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />

### Interactive Building Blocks Overview

<sample src="https://engine.needle.tools/samples-uploads/usdz-interactivity" />

## Créez vos propres Everywhere Actions

La création de nouvelles Everywhere Actions implique l'écriture de code pour votre action en TypeScript, qui sera utilisé dans le navigateur et pour WebXR, et l'utilisation de notre API TriggerBuilder et ActionBuilder pour créer une configuration correspondante pour la réalité augmentée sur iOS via QuickLook. Lors de la création d'actions personnalisées, gardez à l'esprit que QuickLook dispose d'un ensemble limité de fonctionnalités disponibles. Vous pouvez toujours utiliser n'importe quel code de votre choix pour le navigateur et WebXR, mais le comportement pour QuickLook devra peut-être être une approximation construite à partir des triggers et actions disponibles.

:::tip
Souvent, la construction de comportements spécifiques nécessite de penser différemment et d'appliquer de manière créative les actions de bas niveau disponibles. Un exemple serait une action "Tap to Place" – il n'y a pas de raycasting ou de hit testing disponible dans QuickLook, mais vous pourriez couvrir la zone de placement attendue avec un certain nombre d'objets invisibles et utiliser un trigger "Tap" pour déplacer l'objet à placer vers la position de l'objet invisible tapé.
:::

Les triggers et actions pour QuickLook sont basés sur les [Preliminary Interactive USD Schemas d'Apple](https://developer.apple.com/documentation/arkit/usdz_schemas_for_ar/actions_and_triggers).

### Exemple de code

Voici l'implémentation de `HideOnStart` comme exemple de création d'une Everywhere Action avec des implémentations pour le navigateur et QuickLook :
@[code ts twoslash](@code/component-everywhere-action-hideonstart.ts)

::: tip
Souvent, obtenir le bon comportement impliquera de composer des *actions de niveau supérieur* à partir des *actions de niveau inférieur* disponibles. Par exemple, notre action "Change Material on Click" est composée d'un certain nombre de `fadeActions` et duplique en interne des objets avec différents ensembles de materials. En construisant soigneusement ces actions, des comportements complexes peuvent être atteints.
:::

### Méthodes de bas niveau pour construire vos propres actions

| Triggers | |
| --- | --- |
| `TriggerBuilder.sceneStartTrigger` | |
| `TriggerBuilder.tapTrigger` | |

| Actions | |
| --- | --- |
| `ActionBuilder.fadeAction` | |
| `ActionBuilder.startAnimationAction` | |
| `ActionBuilder.waitAction` | |
| `ActionBuilder.lookAtCameraAction` | |
| `ActionBuilder.emphasize` | |
| `ActionBuilder.transformAction` | |
| `ActionBuilder.playAudioAction` | |

|  Group Actions | |
| --- | --- |
| `ActionBuilder.sequence` | |
| `ActionBuilder.parallel` | |
| `GroupAction.addAction` | |
| `GroupAction.makeParallel` | |
| `GroupAction.makeSequence` | |
| `GroupAction.makeLooping` | |
| `GroupAction.makeRepeat` | |

Pour voir l'implémentation de nos Everywhere Actions intégrées, veuillez consulter `src/engine-components/export/usdz/extensions/behavior/BehaviourComponents.ts`.

## Pour en savoir plus

Les pages suivantes fournissent d'autres exemples que vous pouvez tester et explorer dès maintenant :

- Visitez notre [site web AR Showcase](https://engine.needle.tools/projects/ar-showcase/) qui contient de nombreux exemples AR interactifs axés sur iOS AR & Quicklook.
- [Exemples d'Everywhere Actions Needle Engine](https://engine.needle.tools/samples/?overlay=samples&tag=everywhere+actions)

Page traduite automatiquement par l'IA
