---
title: Suivi d'image WebXR avec Needle Engine
---

## Qu'est-ce que le suivi d'image WebXR
**Le suivi d'image WebXR permet aux navigateurs de détecter et de suivre des images spécifiques dans le monde réel** via la caméra d'un appareil, fournissant des données de position et d'orientation en temps réel pour ancrer précisément le contenu virtuel à des marqueurs physiques comme des affiches, des emballages ou des œuvres d'art.

En pointant la caméra vers une image reconnue, l'API de suivi d'image met continuellement à jour la relation spatiale entre les éléments virtuels et physiques, assurant un alignement correct même lorsque l'appareil ou l'image se déplace.

Le suivi d'image transforme les images statiques en déclencheurs de RA interactifs, permettant aux peintures de musée d'afficher des informations superposées, aux emballages de produits de révéler des animations 3D, ou aux cartes de visite de montrer des détails de contact flottants — le tout via des standards web sans obliger les utilisateurs à télécharger des applications dédiées, rendant les expériences de RA instantanément accessibles via n'importe quel navigateur web compatible.

## Démo

Needle Engine prend en charge le **suivi d'image WebXR** ([Démo en direct](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) sur Android et le **suivi d'image QuickLook** sur iOS.

Lancez la scène ci-dessous en RA et pointez la caméra de votre téléphone vers le marqueur d'image sur un écran, ou imprimez-le.

:::info WebXR Image Tracking on Android
**Sur Android**, veuillez activer "WebXR Incubations" dans les Chrome Flags. Vous pouvez les trouver en collant [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) dans la barre d'adresse du navigateur Chrome de votre téléphone Android.
:::


<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Marqueur d'image" width=300 />

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />


## Explicateur


:::warning WebXR Image Tracking est encore en phase de "brouillon" et n'est pas généralement disponible
Jusqu'à présent, les fournisseurs de navigateurs n'ont pas réussi à s'accorder sur l'API de suivi d'image finale pour WebXR. Tant que la spécification est en phase de "brouillon" ([Explicateur de suivi de marqueurs](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
vous et les utilisateurs de votre application devez suivre ces étapes pour activer le suivi d'image WebXR sur les appareils Android :
1. Rendez-vous sur ``chrome://flags`` dans votre navigateur Chrome Android
2. Trouvez et activez l'option `WebXR Incubations`
:::

Sans cette spécification, il est toujours possible de demander l'accès à l'image de la caméra et d'exécuter des algorithmes personnalisés pour déterminer la pose de l'appareil. L'inconvénient est que les utilisateurs devront accepter des autorisations supplémentaires comme l'accès à la caméra, et le suivi ne sera pas aussi précis qu'avec les capacités natives de l'appareil.

Voici quelques bibliothèques pour ajouter le suivi d'image basé sur l'accès à la caméra et les algorithmes de vision par ordinateur locaux :
   - [Experimental AR.js integration with Needle Engine](https://github.com/FireDragonGameStudio/NeedleAndARjs) by FireDragonGameStudio
   - [AR.js](https://github.com/AR-js-org/AR.js) (open source)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)


### Intégrations
Le suivi d'image peut être configuré dans Unity et Blender en ajoutant un composant WebXRImageTracking à un objet. Ajoutez ensuite vos images au tableau `Tracked Images`.

![unity screenshot](/imgs/webxr-image-tracking-unity-component.jpg)
*Composant de suivi d'image dans Unity*

![blender screenshot](/imgs/webxr-image-tracking-blender-component.jpg)
*Composant de suivi d'image dans Blender*

## Références

- [Explicateur de suivi de marqueurs WebXR](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)
- [WebXR Device API](https://www.w3.org/TR/webxr/)
- [caniuse: WebXR](https://caniuse.com/webxr)
- [Comportements USD préliminaires d'Apple](https://developer.apple.com/augmented-reality/quick-look/)


## Pour en savoir plus
- [Needle Everywhere Actions](./everywhere-actions.md) *expériences qui fonctionnent partout*
- [Documentation XR](./xr.md)


Page automatiquement traduite par l'IA