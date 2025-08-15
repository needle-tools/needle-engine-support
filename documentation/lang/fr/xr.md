---
title: VR & AR (WebXR)
---

## Appareils compatibles

Needle Engine prend en charge la spécification complète [WebXR specification](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API), y compris l'AR et la VR. WebXR est un standard web officiel qui apporte des expériences immersives sur le web, avec tous les avantages du web : aucune installation, pas de boutique d'applications, aucun SDK requis.

Tous les appareils dotés d'un navigateur peuvent exécuter des applications créées avec Needle. Si le navigateur prend en charge WebXR, vos applications fonctionneront également automatiquement en XR, en utilisant nos composants intégrés. Cela inclut les navigateurs de bureau, les navigateurs mobiles, de nombreux navigateurs sur les casques AR/VR, mais aussi d'autres technologies émergentes comme les écrans Looking Glass, les lunettes intelligentes, et plus encore.

:::tip Support AR sur iOS sans application via USDZ/QuickLook
Bien que les appareils iOS ne prennent pas encore en charge officiellement WebXR, Needle prend en charge la création d'expériences AR sur iOS en utilisant les [Everywhere Actions](everywhere-actions.md). Consultez la [section iOS](#augmented-reality-and-webxr-on-ios) pour plus de détails. Vous pouvez créer des expériences riches et interactives qui fonctionnent de manière transparente en AR sur les appareils iOS, même avec les limitations imposées par Apple.

Lorsque vous entrez en mode AR sur iOS, Needle convertit automatiquement votre scène en un fichier USDZ, qui est ensuite affiché en AR à l'aide de QuickLook d'Apple. Les objets, matériaux, audio, animations et Everywhere Actions seront conservés.
:::

Le tableau suivant répertorie certains des appareils que nous avons vérifiés comme fonctionnant avec Needle Engine.
Lorsqu'un nouvel appareil compatible WebXR sort, il fonctionnera directement avec vos applications. C'est l'un des grands avantages de la construction avec le navigateur comme plateforme – la compatibilité n'est pas limitée à un ensemble spécifique d'appareils ou de SDKs.

| Casque | Navigateur | Notes |
| -- | -- | -- |
| Apple Vision Pro | ✔️ Safari | suivi des mains, support pour pointeur transitoire |
| Meta Quest 3 | ✔️ Meta Browser | suivi des mains, support pour sessiongranted<sup>1</sup>, passthrough, détection de profondeur, suivi de maillage |
| Meta Quest 3S | ✔️ Meta Browser | suivi des mains, support pour sessiongranted<sup>1</sup>, passthrough, détection de profondeur, suivi de maillage |
| Meta Quest 2 | ✔️ Meta Browser | suivi des mains, support pour sessiongranted<sup>1</sup>, passthrough (noir et blanc) |
| Meta Quest 1 | ✔️ Meta Browser | suivi des mains, support pour sessiongranted<sup>1</sup> |
| Meta Quest Pro | ✔️ Meta Browser | suivi des mains, support pour sessiongranted<sup>1</sup>, passthrough |
| Pico Neo 4 | ✔️ Pico Browser | passthrough, suivi des mains<sup>2</sup> |
| Pico Neo 3 | ✔️ Pico Browser | pas de suivi des mains, thumbsticks du contrôleur inversés |
| Oculus Rift 1/2 | ✔️ Chrome |  |
| Valve Index | ✔️ Chrome |  |
| HTC Vive | ✔️ Chrome |  |
| Hololens 2 | ✔️ Edge | suivi des mains, support de l'AR et de la VR (en mode VR, l'arrière-plan est également rendu) |

| Appareil Mobile | Navigateur | Notes |
| -- | -- | -- |
| Android 10+ | ✔️ Chrome | |
| Android 10+ | ✔️ Firefox | |
| iOS 15+ | (✔️)<sup>3</sup> Safari<br/>(✔️)<sup>3</sup> Chrome | Pas de support complet du code, mais les [Everywhere Actions](everywhere-actions.md) de Needle sont supportées pour créer des fichiers USDZ dynamiques et interactifs. |
| iOS 15+ | ✔️ WebXR Viewer | le navigateur est un peu daté maintenant |
| Hololens 2 | ✔️ Edge | |
| Hololens 1 | ❌ | pas de support WebXR |
| Magic Leap 2 | ✔️ | |
| Magic Leap 1 | ✔️ | appareil déprécié |

| Autres Appareils | Navigateur | Notes |
| -- | -- | -- |
| Looking Glass Holographic Display | ✔️ Chrome | nécessite le bridge Looking Glass et du code personnalisé, [voir notre exemple](https://engine.needle.tools/samples/looking-glass/) |
| Logitech MX Ink | ✔️ Meta Browser | supporté officiellement, voir la [documentation](https://logitech.github.io/mxink/WebXR/WebXrIntegration.html#using-needle-tools) |

<sup>1</sup>: Nécessite l'activation d'un flag de navigateur : `chrome://flags/#webxr-navigation-permission`
<sup>2</sup>: Nécessite l'activation d'une option dans les paramètres Développeur
<sup>3</sup>: Utilise les [Everywhere Actions](everywhere-actions.md) ou [d'autres approches](#augmented-reality-and-webxr-on-ios)

## Exemples VR, AR et QuickLook

Visitez nos [Exemples Needle Engine](https://engine.needle.tools/samples/?overlay=samples&tag=xr) pour essayer de nombreux exemples interactifs dès maintenant. Ou, essayez-le en direct sur votre appareil en cliquant sur les boutons <kbd>QR Code</kbd> (pour téléphones) ou <kbd>Open on Quest</kbd> (pour casques Meta Quest) ci-dessous.

<sample src="https://engine.needle.tools/samples/collaborative-sandbox/"/>

## Ajouter des capacités VR et AR à une scène

Les capacités AR, VR et réseau dans Needle Engine sont conçues pour être modulaires. Vous pouvez choisir de n'en supporter aucune, ou d'ajouter seulement des fonctionnalités spécifiques.

### Capacités de base

1.  **Activer l'AR et la VR**
    Ajoutez un composant `WebXR`.
    *Optionnel :* vous pouvez définir un avatar personnalisé en référençant un [Prefab d'Avatar](#avatars).
    Par défaut, un `DefaultAvatar` de base est assigné.

2.  **Activer la téléportation**
    Ajoutez un composant `TeleportTarget` aux hiérarchies d'objets sur lesquelles on peut se téléporter.
    Pour exclure des objets spécifiques, définissez leur calque sur `IgnoreRaycasting`.

### Multijoueur

1.  **Activer le réseau**
    Ajoutez un composant `SyncedRoom`.

2.  **Activer la synchronisation de la vue de bureau**
    Ajoutez un composant `SyncedCamera`.

3.  **Activer le chat vocal**
    Ajoutez un composant `VoIP`.

:::tip Structure de la scène
Ces composants peuvent être n'importe où dans votre hiérarchie. Ils peuvent également tous être sur le même GameObject, ce qui est un schéma courant.
:::

> **[Castle Builder](https://castle.needle.tools/)** utilise tout ce qui précède pour une expérience sandbox multijoueur multiplateforme.
> — #madebyneedle 💚

### Composants AR spéciaux

1.  **Définir la racine et l'échelle de la session AR**
    Ajoutez un composant `WebARSessionRoot` à votre objet racine. Pour les expériences AR, vous souhaitez souvent mettre la scène à l'échelle pour l'adapter au monde réel.
2.  Définir l'**échelle de l'utilisateur** pour rétrécir (< 1) ou agrandir (> 1) l'utilisateur par rapport à la scène lors de l'entrée en AR.

### Contrôler l'affichage des objets pour la XR

1.  **Définir si un objet est visible dans le Navigateur, AR, VR, Première Personne, Troisième Personne**
    Ajoutez un composant `XR Flag` à l'objet que vous souhaitez contrôler.

2.  **Modifier les options dans la liste déroulante** selon les besoins.
    Les cas d'utilisation courants sont
    - masquer les sols lors de l'entrée en AR
    - masquer des parties d'Avatar dans les vues Première Personne ou Troisième Personne. Par exemple, en vue première personne, une personne ne devrait pas voir son propre modèle de tête.

### Voyager entre les mondes VR

Needle Engine prend en charge l'état [`sessiongranted`](https://github.com/immersive-web/navigation). Cela permet aux utilisateurs de naviguer de manière transparente entre les applications WebXR sans quitter une session immersive – ils restent en VR ou en AR.

Actuellement, cela n'est supporté que sur Oculus Quest 1, 2 et 3 dans le navigateur Oculus. Sur d'autres plateformes, les utilisateurs seront éjectés de leur session immersive actuelle et devront entrer à nouveau en VR sur la nouvelle page.
Nécessite l'activation d'un flag de navigateur : `chrome://flags/#webxr-navigation-permission`

-   **Cliquer sur des objets pour ouvrir des liens**
    Ajoutez le composant `OpenURL` qui facilite grandement la construction de mondes connectés.

## Scripting
En savoir plus sur le scripting pour la XR dans la [documentation scripting XR](./scripting.md#xr-event-methods)

## Avatars

Bien que nous ne fournissions pas actuellement d'intégration prête à l'emploi pour les systèmes d'avatar externes, vous pouvez créer des avatars spécifiques à l'application ou des systèmes personnalisés.

-   **Créer un Avatar personnalisé**
    -   Créez un GameObject vide comme racine d'avatar
    -   Ajoutez un objet nommé `Head` et ajoutez un `XRFlag` défini sur Third Person
    -   Ajoutez des objets nommés `HandLeft` et `HandRight`
    -   Ajoutez vos graphiques sous ces objets.

### Composants d'Avatar expérimentaux

Il existe un certain nombre de composants expérimentaux pour construire des Avatars plus expressifs. À ce stade, nous recommandons de les dupliquer pour créer vos propres variantes, car ils pourraient être modifiés ou supprimés ultérieurement.

![20220817-230858-87dG-Unity_PLjQ](https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif)
*Exemple de Rig d'Avatar avec modèle de cou de base et contraintes de membres*

-   **Couleurs aléatoires du joueur**
    À titre d'exemple de personnalisation d'avatar, vous pouvez ajouter un composant `PlayerColor` à vos renderers.
    Cette couleur aléatoire est synchronisée entre les joueurs.

-   **Rotation des yeux**
    `AvatarEyeLook_Rotation` fait pivoter les GameObjects (yeux) pour suivre d'autres avatars et une cible aléatoire. Ce composant est synchronisé entre les joueurs.

-   **Clignement des yeux**
    `AvatarBlink_Simple` cache aléatoirement des GameObjects (yeux) toutes les quelques secondes, emulant un clignement.

![image](https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png)
*Exemple de hiérarchie de Prefab d'Avatar*

-   **Contrainte d'Offset**
    `OffsetConstraint` permet de décaler un objet par rapport à un autre dans l'espace d'Avatar. Cela permet, par exemple, d'avoir un Corps suivant la Tête mais en maintenant la rotation nivelée. Cela permet également de construire des modèles de cou simples.

-   **Contrainte de membre**
    `BasicIKConstraint` est une contrainte très minimaliste qui prend deux transforms et un indice. C'est utile pour construire de simples chaînes de bras ou de jambes. Comme la rotation n'est pas correctement implémentée actuellement, les bras et les jambes peuvent devoir être symétriques en rotation pour "paraître corrects". Elle s'appelle "Basic" pour une raison !

## Superpositions de contenu HTML en AR

Si vous souhaitez afficher un contenu html différent selon que le client utilise un navigateur normal ou l'AR ou la VR, vous pouvez simplement utiliser un ensemble de classes html.
Ceci est contrôlé via les classes d'éléments HTML. Par exemple, pour faire apparaître du contenu sur le bureau et en AR, ajoutez un ``<div class="desktop ar"> ... </div>`` à l'intérieur de la balise `<needle-engine>` :

```html
<needle-engine>
    <div class="desktop ar" style="pointer-events:none;">
        <div class="positioning-container">
          <p>votre contenu pour AR et bureau va ici</p>
          <p class="only-in-ar">Ceci ne sera visible qu'en AR</p>
        <div>
    </div>
</needle-engine>
```

Les superpositions de contenu sont implémentées en utilisant la fonctionnalité optionnelle `dom-overlay` qui est généralement supportée sur les appareils AR basés sur écran (téléphones, tablettes).

Utilisez la classe `.ar-session-active` pour montrer/cacher du contenu spécifique pendant que vous êtes en AR. La [pseudo-classe `:xr-overlay`](https://www.w3.org/TR/webxr-dom-overlays-1/#css-pseudo-class) ne devrait pas être utilisée à ce stade car son utilisation casse le WebXR Viewer de Mozilla.

```css
.only-in-ar {
  display: none;
}

.ar-session-active .only-in-ar {
  display:initial;
}
```

Il est à noter que l'élément de superposition [sera toujours affiché en plein écran pendant la XR](https://www.w3.org/TR/webxr-dom-overlays-1/#ua-style-sheet-defaults), indépendamment du style appliqué. Si vous souhaitez aligner différemment les éléments, vous devriez créer un conteneur _à l'intérieur_ de l'élément `class="ar"`.

<sample src="https://engine.needle.tools/samples-uploads/ar-overlay/"/>

## Réalité Augmentée et WebXR sur iOS

Les expériences de Réalité Augmentée sur iOS sont quelque peu limitées, car Apple ne prend pas actuellement en charge WebXR sur les appareils iOS.

Les [Everywhere Actions](everywhere-actions.md) de Needle Engine sont conçues pour combler cette lacune, apportant des capacités interactives automatiques aux appareils iOS pour les scènes composées de composants spécifiques. Elles supportent un sous-ensemble des fonctionnalités disponibles dans WebXR, par exemple l'audio spatial, le suivi d'image, les animations, et plus encore. Voir [la documentation](everywhere-actions.md) pour plus d'informations.

:::tip Support limité du code personnalisé dans QuickLook
Apple a mis en place de fortes limitations quant au type de contenu utilisable dans QuickLook. Par conséquent, les composants de script personnalisés ne peuvent pas être automatiquement convertis pour être utilisés en AR sur iOS. Vous pouvez ajouter le support de certains types de code personnalisé en utilisant notre API Everywhere Actions.
:::

### Instrument de musique – Support WebXR et QuickLook

Voici un exemple d'instrument de musique qui utilise les Everywhere Actions et fonctionne donc dans les navigateurs et en AR sur les appareils iOS.
Il utilise l'audio spatial, l'animation et les interactions par tapotement.
<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Everywhere Actions et autres options pour l'AR sur iOS

Il existe également d'autres options pour guider les utilisateurs iOS vers des expériences AR interactives encore plus performantes :

3.  **Exporter du contenu à la volée en fichiers USDZ.**
    Ces fichiers peuvent être affichés sur les appareils iOS en AR. Lorsqu'ils sont exportés depuis des scènes avec Everywhere Actions l'interactivité est la même, plus que suffisante pour les configurateurs de produits, les expériences narratives et similaires.
    Un exemple est [Castle Builder](https://castle.needle.tools) où les créations (pas la session en direct) peuvent être visualisées en AR.

> **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** utilise cette approche. Les joueurs peuvent placer du texte en collaboration dans la scène sur leurs écrans, puis visualiser les résultats en AR sur iOS. Sur Android, ils peuvent également interagir directement en WebXR.
> — #madebyneedle 💚

1.  **Guider les utilisateurs vers des navigateurs compatibles WebXR sur iOS.**
    Selon votre public cible, vous pouvez guider les utilisateurs sur iOS vers par exemple le [WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056) pour expérimenter l'AR sur iOS.

2.  **Utiliser l'accès à la caméra et des algorithmes personnalisés sur les appareils iOS.**
    On peut demander l'accès à l'image de la caméra et exécuter des algorithmes personnalisés pour déterminer la pose de l'appareil.
    Bien que nous ne fournissions pas actuellement de composants intégrés pour cela, voici quelques références de bibliothèques et de frameworks que nous voulons essayer à l'avenir :
    -   [AR.js](https://github.com/AR-js-org/AR.js) (open source)
    -   [Experimental AR.js integration](https://github.com/FireDragonGameStudio/NeedleAndARjs) by FireDragonGameStudio
    -   [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)
    -   [8th Wall](https://www.8thwall.com/) (commercial)

## Suivi d'image

Needle Engine prend en charge le **WebXR Image Tracking** ([Démo Live](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) sur Android et le **QuickLook Image Tracking** sur iOS.

Vous pouvez trouver une documentation supplémentaire sur la page [WebXR Image Tracking](./webxr-image-tracking.md).

:::warning Le WebXR Image Tracking est toujours en phase de "brouillon" et n'est pas généralement disponible
Jusqu'à présent, les fournisseurs de navigateurs n'ont pas réussi à se mettre d'accord sur l'API finale de suivi d'image pour WebXR. Tant que la spécification est en phase de "brouillon" ([Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
vous et les utilisateurs de votre application devez suivre ces étapes pour activer le WebXR ImageTracking sur les appareils Android :
1.  Visitez ``chrome://flags`` sur votre navigateur Android Chrome
2.  Trouvez et activez l'option `WebXR Incubations`
:::

Sans cette spécification, on peut toujours demander l'accès à l'image de la caméra et exécuter des algorithmes personnalisés pour déterminer la pose de l'appareil. L'inconvénient est que les utilisateurs devront accepter des permissions supplémentaires comme l'accès à la caméra, et le suivi ne sera pas aussi précis qu'avec les capacités natives de l'appareil.

Voici quelques bibliothèques pour ajouter le suivi d'image basé sur l'accès à la caméra et des algorithmes de vision par ordinateur locaux :
-   [Experimental AR.js integration with Needle Engine](https://github.com/FireDragonGameStudio/NeedleAndARjs) by FireDragonGameStudio
-   [AR.js](https://github.com/AR-js-org/AR.js) (open source)
-   [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)

## Références

[WebXR Device API](https://www.w3.org/TR/webxr/)
[caniuse: WebXR](https://caniuse.com/webxr)
[Comportements préliminaires USD d'Apple](https://developer.apple.com/augmented-reality/quick-look/)

Page automatiquement traduite à l'aide de l'IA