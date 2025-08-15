---
title: <needle-engine> Configuration
---

## Attributs du composant web Needle Engine

Needle Engine est disponible en tant que composant web : `<needle-engine>`. Ce composant peut être utilisé pour charger et afficher des scènes 3D, des modèles, et plus encore dans un navigateur web. Il est livré avec un ensemble d'attributs qui vous permettent de configurer son comportement et son apparence. Tous ces paramètres peuvent être écrasés par le code, mais les attributs sont un moyen pratique de les configurer en HTML.

::: tip Le composant web se trouve dans `index.html`
Que vous créiez un projet via Unity ou Blender, ou directement dans le code, vous pouvez utiliser et ajuster le composant web `<needle-engine>`. Généralement, vous le trouverez dans le fichier `index.html` de votre projet web.
:::

Le tableau ci-dessous présente la liste des attributs disponibles et leurs descriptions.

| Attribut | Description |
| --- | --- |
| **Chargement** | |
| `src` | Chemin vers un ou plusieurs fichiers glTF ou glb.<br/>Les types pris en charge sont `string`, `string[]` ou un tableau sous forme de chaîne de caractères (séparés par `,`) |
| `dracoDecoderPath` | URL vers le décodeur draco, par ex. `./include/draco/` pour utiliser le décodeur Draco local |
| `dracoDecoderType` | Type de décodeur draco. Les options sont `wasm` ou `js`. Voir [documentation three.js](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) |
| `ktx2DecoderPath` | URL vers le décodeur KTX2, par ex. `./include/ktx2/` pour utiliser le décodeur KTX2 local |
| **Rendu** | |
| `background-color` | optionnel, couleur hexadécimale à utiliser comme couleur de fond. Exemples : `rgb(255, 200, 100)`, `#dddd00` |
| `background-image` | optionnel, URL vers une image de skybox (image de fond) ou une chaîne de préréglage : `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `background-blurriness` | optionnel, valeur de flou entre 0 (pas de flou) et 1 (flou max) pour l'`background-image`. Exemple : `background-blurriness="0.5"` |
| `environment-image` | optionnel, URL vers une image d'environnement (lumière d'environnement) ou une chaîne de préréglage : `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `contactshadows` | optionnel, rend les ombres de contact |
| `tone-mapping` | optionnel, les valeurs prises en charge sont `none`, `linear`, `neutral`, `agx` |
| `tone-mapping-exposure` | nombre optionnel, par ex. augmente l'exposition avec `tone-mapping-exposure="1.5"`, nécessite que `tone-mapping` soit défini |
| **Interaction** | |
| `autoplay` | ajouter ou définir sur `true` pour lire automatiquement les animations, par ex. `<needle-engine autoplay` |
| `camera-controls` | ajouter ou définir sur `true` pour ajouter automatiquement des OrbitControls si aucun contrôle de caméra n'est trouvé dans la scène |
| `auto-rotate` | ajouter pour activer la rotation automatique (uniquement utilisé avec `camera-controls`) |
| **Événements** | |
| `loadstart` | Nom de la fonction à appeler lorsque le chargement commence. Notez que les arguments sont `(ctx:Context, evt:Event)`. Vous pouvez appeler `evt.preventDefault()` pour masquer l'overlay de chargement par défaut |
| `progress` | Nom de la fonction à appeler lors des mises à jour de chargement. `onProgress(ctx:Context, evt: {detail: {context:Context, name:string, index:number, count:number, totalProgress01:number}) { ... }` |
| `loadfinished` | Nom de la fonction à appeler lorsque le chargement est terminé |
| **Affichage de Chargement** | *Options disponibles pour modifier l'apparence de l'affichage de chargement de Needle Engine. Utilisez `?debugloadingrendering` pour faciliter l'édition* |
| `loading-background` | **PRO** — Défaut : `transparent`. Change la couleur de fond du chargement (par ex. `#dd5500`) |
| `loading-logo-src` | **PRO** — Change l'image du logo de chargement (par ex. `https://yourdomain.com/logo.png` ou `/logo.png`) |
| `hide-loading-overlay` | **PRO** — Ne pas afficher l'overlay de chargement |
| **Interne** | |
| `hash` | Utilisé en interne, est ajouté aux fichiers chargés pour forcer une mise à jour (par ex. lorsque le navigateur a mis en cache un fichier glb). Ne devrait pas être modifié manuellement. |

**Avis de mise à niveau**:
- Attributs supprimés dans Needle Engine 4.5.0 : `loading-style`, `loading-background-color`, `loading-text-color`, `primary-color`, `secondary-color`

# Exemples

```html
<!-- Réglage du chemin vers un fichier glb personnalisé à charger -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- Remplacement de l'emplacement du décodeur draco -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="./include/draco/"></needle-engine>
```

Définition des images d'environnement, lecture d'animation et contrôles automatiques de la caméra. [Voir en direct sur stackblitz](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)
```html
<needle-engine
      camera-controls
      auto-rotate
      autoplay
      skybox-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      environment-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf"
      >
      </needle-engine>
```

Réception d'un événement lorsque le contexte needle-engine a terminé le chargement :
```html
<needle-engine loadfinished="onLoadFinished"> </needle-engine>
<script>
    function onLoadFinished() {
        console.log("Needle Engine a terminé le chargement");
    }
</script>
```

### Style de chargement personnalisé (PRO)

Vous pouvez facilement modifier l'apparence de Needle Engine en définissant les attributs appropriés sur le composant web `<needle-engine>`. Veuillez consulter le tableau ci-dessus pour plus de détails.

![chargement personnalisé](/imgs/custom-loading-style.webp)
[Voir le code sur github](https://github.com/needle-engine/vite-template/blob/loading-style/custom/index.html)

Page traduite automatiquement par l'IA