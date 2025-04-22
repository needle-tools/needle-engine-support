---
title: <needle-engine> Configuration
---

Le composant web `<needle-engine>` est livré avec une belle collection d'attributs intégrés qui peuvent être utilisés pour modifier l'apparence et la convivialité de la scène chargée sans avoir besoin d'ajouter ou de modifier la scène three.js directement.
Le tableau ci-dessous présente une liste des plus importants :

| Attribut | Description |
| --- | --- |
| **Chargement** | |
| `src` | Chemin vers un ou plusieurs fichiers glTF ou glb.<br/>Les types pris en charge sont `string`, `string[]` ou un tableau sous forme de chaîne de caractères (séparés par `,`) |
| `dracoDecoderPath` | URL du décodeur draco |
| `dracoDecoderType` | Type de décodeur draco. Les options sont `wasm` ou `js`. Voir la [documentation three.js](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) |
| `ktx2DecoderPath` | URL du décodeur KTX2 |
| **Rendu** | |
| `background-color` | optionnel, couleur hexadécimale à utiliser comme couleur de fond. Exemples : `rgb(255, 200, 100)`, `#dddd00` |
| `background-image` | optionnel, URL d'une image de skybox (image de fond) ou une chaîne de préréglage : `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `background-blurriness` | optionnel, valeur de flou entre 0 (pas de flou) et 1 (flou max) pour l'`background-image`. Exemple : `background-blurriness="0.5"` |
| `environment-image` | optionnel, URL d'une image d'environnement (lumière d'environnement) ou une chaîne de préréglage : `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `contactshadows` | optionnel, rend les ombres de contact |
| `tone-mapping` | optionnel, les valeurs prises en charge sont `none`, `linear`, `neutral`, `agx` |
| `tone-mapping-exposure` | nombre optionnel, par exemple augmente l'exposition avec `tone-mapping-exposure="1.5"`, nécessite que `tone-mapping` soit défini |
| **Interaction** | |
| `autoplay` | ajouter ou définir sur `true` pour lire automatiquement les animations, par exemple `<needle-engine autoplay` |
| `camera-controls` | ajouter ou définir sur `true` pour ajouter automatiquement des OrbitControls si aucun contrôle de caméra n'est trouvé dans la scène |
| `auto-rotate` | ajouter pour activer la rotation automatique (uniquement utilisé avec `camera-controls`) |
| **Événements** | |
| `loadstart` | Nom de la fonction à appeler lorsque le chargement commence. Notez que les arguments sont `(ctx:Context, evt:Event)`. Vous pouvez appeler `evt.preventDefault()` pour masquer l'overlay de chargement par défaut |
| `progress` | Nom de la fonction à appeler lors des mises à jour de chargement. `onProgress(ctx:Context, evt: {detail: {context:Context, name:string, index:number, count:number, totalProgress01:number}) { ... }` |
| `loadfinished` | Nom de la fonction à appeler lorsque le chargement est terminé |
| **Affichage de Chargement** | *Options disponibles pour modifier l'apparence de l'affichage de chargement de Needle Engine. Utilisez `?debugloadingrendering` pour faciliter l'édition* |
| `loading-style` | Les options sont `light` ou `dark` |
| `loading-background-color` | **PRO** — Change la couleur de fond du chargement (par exemple `=#dd5500`) |
| `loading-text-color` | **PRO** — Change la couleur du texte de chargement |
| `loading-logo-src` | **PRO** — Change l'image du logo de chargement |
| `primary-color` | **PRO** — Change la couleur primaire de chargement |
| `secondary-color` | **PRO** — Change la couleur secondaire de chargement |
| `hide-loading-overlay` | **PRO** — Ne pas afficher l'overlay de chargement, ajouté dans Needle Engine > 3.17.1
| **Interne** | |
| `hash` | Utilisé en interne, est ajouté aux fichiers chargés pour forcer une mise à jour (par exemple, lorsque le navigateur a mis en cache un fichier glb). Ne devrait pas être modifié manuellement. |


# Exemples

```html
<!-- Définition du chemin vers un glb personnalisé à charger -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- Remplacement de l'emplacement du décodeur draco -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="path/to/draco/folder"></needle-engine>
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
        console.log("Needle Engine has finished loading");
    }
</script>
```

### Style de chargement personnalisé (PRO)

Vous pouvez facilement modifier l'apparence de Needle Engine en définissant les attributs appropriés sur le composant web `<needle-engine>`. Veuillez consulter le tableau ci-dessus pour plus de détails.

![custom loading](/imgs/custom-loading-style.webp)
[Voir le code sur github](https://github.com/needle-engine/vite-template/blob/loading-style/custom/index.html)


Page traduite automatiquement par l'IA