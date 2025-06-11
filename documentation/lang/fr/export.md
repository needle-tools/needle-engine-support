---
title: Exporter des Assets vers glTF
---



# Exporter des Assets, des Animations, des Prefabs, des Matériaux, des Lightmaps...
Ajoutez un composant ``ExportInfo`` à votre scène Unity pour générer un nouveau projet web à partir d'un modèle, lier un projet web existant vers lequel vous souhaitez exporter, configurer les dépendances à d'autres bibliothèques et packages, et déployer votre projet.

Par défaut, votre scène est exportée lors de la sauvegarde. Ce réglage peut être modifié en désactivant ``Auto Export`` dans le composant ``ExportInfo``.

## 📦 Exporter des fichiers glTF
Pour exporter des meshes, des matériaux, des animations, des textures (...) créez un nouveau GameObject dans votre hiérarchie et ajoutez-y un composant ``GltfObject``. C'est la racine d'un nouveau fichier glTF. Il sera exporté chaque fois que vous apportez une modification à la scène et la sauvegardez.

Seuls les scripts et les données sur et dans ces objets racines sont exportés. Les scripts et les données en dehors d'eux ne sont pas exportés.

Ajoutez un cube comme enfant de votre objet racine et sauvegardez votre scène. Notez que le dossier de sortie ``assets/`` (voir [structure du projet](#vite-project-structure)) contient maintenant un nouveau fichier ``.glb`` portant le même nom que votre GameObject racine.

Vous pouvez activer le réglage ``Smart Export`` (via `Edit/Project Settings/Needle`) pour n'exporter que lorsqu'une modification est détectée dans la hiérarchie de cet objet.

:::details Comment empêcher l'exportation d'objets spécifiques
Les objets avec le tag `EditorOnly` seront ignorés lors de l'export, y compris leur hiérarchie enfant.
Sachez que cela est préférable à la désactivation des objets, car les objets désactivés seront toujours exportés au cas où ils seraient réactivés plus tard.
:::

### Chargement paresseux et multiples niveaux / scènes

Si vous souhaitez diviser votre application en plusieurs niveaux ou scènes, vous pouvez simplement utiliser le composant `SceneSwitcher`. Vous pouvez ensuite structurer votre application en plusieurs scènes ou prefabs et les ajouter au tableau SceneSwitcher pour qu'ils soient chargés et déchargés à l'exécution. C'est un excellent moyen d'éviter de devoir charger tout votre contenu au départ et de réduire les temps de chargement (par exemple, c'est ce que nous avons fait sur [needle.tools](https://needle.tools?utm_source=needle_docs&utm_content=export_scenes) en séparant chaque section de votre site web en sa propre scène et en ne les chargeant que lorsque nécessaire).

### Complexité recommandée par glTF

- Taille d'exportation maximale de 50 Mo non compressée (se retrouve généralement autour de ~10-20 Mo compressée)
- Maximum 500k vertices (moins si vous ciblez également la VR mobile)
- Maximum 4x lightmaps 2k

Vous pouvez diviser les scènes et les prefabs en plusieurs fichiers glTF, puis les charger à la demande (uniquement lorsque nécessaire). Cela permet de maintenir les performances de chargement rapides et la taille des fichiers petite. Voir la [section AssetReference dans les documents de Scripting](scripting.md#assetreference-and-addressables).

La complexité de la scène ici est recommandée pour assurer de bonnes performances sur une gamme d'appareils web capables et de largeurs de bande passante. Il n'y a pas de limitation technique au-delà des capacités de votre appareil.

### Prefabs
Les prefabs peuvent être exportés en tant que fichiers glTF individuels et instanciés à l'exécution. Pour exporter un prefab en glTF, il suffit de référencer un asset prefab (depuis le navigateur de projet et non dans la scène) [depuis un de vos scripts](https://fwd.needle.tools/needle-engine/docs/addressables).

L'exportation de Prefabs fonctionne également avec l'imbrication : un composant dans un Prefab peut référencer un autre Prefab qui sera alors également exporté.
Ce mécanisme permet de composer des scènes aussi légères que possible et de charger le contenu le plus important en premier, puis de différer le chargement du contenu additionnel.

### Scene Assets
De manière similaire aux assets Prefab, vous pouvez référencer d'autres assets Scene.
Pour commencer, créez un composant dans Unity avec un champ ``UnityEditor.SceneAsset`` et ajoutez-le à l'un de vos GameObjects à l'intérieur d'un GltfObject. La scène référencée sera désormais exportée en tant que fichier glTF séparé et pourra être chargée/désérialisée en tant que ``AssetReference`` depuis TypeScript.

Vous pouvez continuer à travailler dans une scène référencée tout en mettant à jour votre scène d'exportation/site web principale. Lors de la sauvegarde de la scène ou du changement de mode de jeu, nous détecterons si la scène actuelle est utilisée par votre serveur actuellement en cours d'exécution et déclencherons alors une nouvelle exportation pour ce seul glb. (Cette vérification se fait par nom - si un glb dans votre dossier ``<web_project>/assets/`` existe, il est réexporté et la scène principale le recharge).

Par exemple, sur [notre site web](https://needle.tools?utm_source=needle_docs&utm_content=export_sceneassets), chaque section est configurée comme une scène distincte et lors de l'exportation, elles sont empaquetées dans plusieurs fichiers glb que nous chargeons à la demande :

![2022-08-22-172605_Needle_Website_-_Website_-_Windows,_Mac,_Linux_-_U](https://user-images.githubusercontent.com/5083203/185958983-71913c97-5eec-4cfd-99f5-76798582373e.png)

#### Charger un Prefab ou une Scène depuis un script personnalisé
Si vous souhaitez référencer et charger un prefab depuis un de vos scripts, vous pouvez déclarer un type `AssetReference`.
Voici un exemple minimal :

@[code ts twoslash](@code/component-prefab.ts)

## 🏇 Exporter des Animations
Needle Engine prend en charge un sous-ensemble considérable et puissant des fonctionnalités d'animation d'Unity :

- **Timeline** incl. pistes d'activation, pistes d'animation, décalages de pistes
- **Animator** incl. transitions d'état de haut niveau
  - Les blend trees ne sont pas pris en charge actuellement.
  - Les sous-machines d'état ne sont pas prises en charge actuellement.
- **AnimationClips** incl. modes de boucle
- **Animations procédurales** peuvent être créées via scripting

Needle Engine est l'un des premiers à supporter la nouvelle [extension glTF KHR_ANIMATION_POINTER](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer).
Cela signifie que presque toutes les propriétés, y compris les variables de script, sont animables.

Une limitation actuelle est que les matériaux ne seront pas dupliqués à l'exportation — si vous souhaitez animer le même matériau avec des couleurs différentes, par exemple, vous devez actuellement diviser le matériau en deux.

## 🌍 Exporter le Skybox
Le skybox Unity et la réflexion personnalisée (le cas échéant) sont cuits dans une texture lors de l'exportation et exportés automatiquement à l'intérieur de l'extension ``NEEDLE_lightmaps``.

Pour changer la résolution du skybox, vous pouvez ajouter un composant ``SkyboxExportSettings`` à votre scène.

![image](https://user-images.githubusercontent.com/5083203/196030839-170a9496-9ed9-4ebc-bc1d-2df6c746f8c8.png)

Si vous ne souhaitez pas que le skybox soit exporté du tout dans un fichier glb, vous pouvez décocher l'option ``Embed Skybox`` sur votre composant ``GltfObject``.

![image](https://user-images.githubusercontent.com/5083203/196030825-8a05037f-5acc-4795-9128-2bdacedd0d49.png)

## ✨ Exporter les Matériaux

### Matériaux Basés sur la Physique (PBR)
Par défaut, les matériaux sont convertis en matériaux glTF lors de l'exportation. glTF prend en charge un modèle de matériau basé sur la physique et dispose d'un certain nombre d'extensions qui aident à représenter des matériaux complexes.

Pour un contrôle total sur ce qui est exporté, il est fortement recommandé d'utiliser les matériaux glTF fournis par UnityGltf :
- PBRGraph
- UnlitGraph

::: tip En cas de doute, utilisez le shader PBRGraph
Le matériau PBRGraph possède de nombreuses fonctionnalités, bien plus que Standard ou URP/Lit. Celles-ci incluent des fonctionnalités avancées comme la réfraction, l'iridescence, le sheen, et plus encore. De plus, les matériaux utilisant PBRGraph et UnlitGraph sont exportés tels quels, sans conversion nécessaire.
:::

Matériaux pouvant être convertis directement :
- BiRP/Standard
- BiRP/Autodesk Interactive
- BiRP/Unlit
- URP/Lit
- URP/Unlit

Les autres matériaux sont convertis en utilisant une heuristique basée sur le nom des propriétés. Cela signifie qu'en fonction des noms de propriétés utilisés par vos matériaux et shaders personnalisés, vous pourriez vouloir soit refactoriser les propriétés de votre shader personnalisé pour utiliser les noms de propriétés de URP/Lit ou PBRGraph, soit exporter le matériau en tant que [Shader personnalisé](#custom-shaders).

### Shaders personnalisés
Pour exporter des shaders unlit personnalisés (par exemple créés avec ShaderGraph), ajoutez une étiquette d'asset ``ExportShader`` au shader que vous souhaitez exporter. Les étiquettes d'asset sont visibles en bas de la fenêtre de l'inspecteur.

![2022-08-22-172029_Needle_Website_-_CustomShaders_-_Windows,_Mac,_Lin](https://user-images.githubusercontent.com/5083203/185957781-9fae18c5-09ff-490f-8958-57e138aa0003.png)

#### Limitations
- Nous ne supportons actuellement que les shaders **Unlit** personnalisés — la conversion des shaders Lit n'est pas officiellement prise en charge.
- Les shaders Lit personnalisés sont actuellement expérimentaux. Tous les modes de rendu ne sont pas pris en charge.
- La réception d'ombres sur les shaders personnalisés n'est pas prise en charge.
- Les skinned meshes avec des shaders personnalisés ne sont pas pris en charge.
- Comme il y a de multiples changements de systèmes de coordonnées en passant d'Unity à three.js et glTF, des ajustements peuvent être nécessaires pour que les effets avancés fonctionnent. Nous essayons de convertir les données à l'exportation, mais il est possible que nous ne couvrions pas tous les cas où des conversions sont nécessaires.
  - Les coordonnées UV dans Unity commencent en bas à gauche; dans glTF, elles commencent en haut à gauche.
  - Les valeurs de l'axe X sont inversées dans glTF par rapport à Unity. C'est une variante d'un changement de système de coordonnées de gaucher à droitier. Les données utilisées dans les shaders peuvent devoir être inversées sur X pour s'afficher correctement.

::: note Ne fait pas partie de la spécification glTF
Notez que les **Shaders personnalisés** ne font pas officiellement partie de la spécification glTF. Notre implémentation des shaders personnalisés utilise une extension appelée KHR_techniques_webgl, qui stocke le code shader WebGL directement dans le fichier glTF. Les assets résultants fonctionneront dans les visualiseurs basés sur Needle Engine, mais pourraient ne pas s'afficher correctement dans d'autres visualiseurs.
:::

## 💡 Exporter les Lightmaps
![2022-08-22-171650_Needle_-_Google_Chrome](https://user-images.githubusercontent.com/5083203/185957005-d04c9530-07eb-40f5-b305-9822d13b79ab.png)

Pour exporter les lightmaps, il suffit de [générer des lightmaps](https://docs.unity3d.com/Manual/Lightmapping.html) dans Unity. Les lightmaps seront exportées automatiquement.

Lorsque vous travaillez sur plusieurs scènes, désactivez "Auto Generate" et cousez les lightmaps explicitement. Sinon, Unity supprimera les lightmaps temporaires lors du changement de scène.

### Paramètres Lightmap recommandés
- Encodage des Lightmaps : Normal Quality (ajuster dans Project Settings > Player)
- Progressive GPU (plus rapide et généralement assez précis pour les petites scènes)
- Lightmaps Non-Directionnelles
- Taille Lightmap max 2k (vous pouvez aller plus haut, mais attendez-vous à des fichiers volumineux)
- Max 4x lightmaps 2k par scène (vous pouvez aller plus haut, mais attendez-vous à des fichiers volumineux)
- Compress Lightmaps OFF (augmente la qualité ; sinon, elles seront compressées à nouveau lors de l'exportation)

![2022-08-22-171356_Needle_Website_-_Lightmaps_-_Windows,_Mac,_Linux_-](https://user-images.githubusercontent.com/5083203/185956392-f4031f45-ad13-4e6d-a14c-c8ec5c1fcfd4.png)

### Mélanger les objets cuits et non cuits

Il n'y a pas de correspondance parfaite entre la façon dont Unity gère les lumières et l'environnement et la façon dont three.js les gère. Par exemple, Unity a des chemins de code entièrement distincts pour les objets lightmappés et non lightmappés (les objets lightmappés ne reçoivent pas de lumière ambiante car celle-ci est déjà cuite dans leurs cartes), et three.js ne fait pas cette distinction.

Cela signifie que pour obtenir les meilleurs résultats, nous recommandons actuellement des paramètres spécifiques si vous mélangez des objets cuits et non cuits dans une scène :
```
Environment Lighting: Skybox
Ambient Intensity: 1
Ambient Color: black
```

**2021.3+**
![20220826-175324-SqBL-Unity_pMXa-needle](https://user-images.githubusercontent.com/2693840/186947184-2446672f-420c-47e8-8f7d-970a7d52bf35.png)

**2020.3+**
![20220826-175514-tnGc-Unity_mycs-needle](https://user-images.githubusercontent.com/2693840/186947203-2d7d96c3-f566-44b4-889c-4103fac505d4.png)

Si vous n'avez aucun objet cuit dans votre scène, les paramètres suivants devraient également donner des résultats corrects :
```
Environment Lighting: Color
Ambient Color: any
```
---
Page automatiquement traduite utilisant l'IA