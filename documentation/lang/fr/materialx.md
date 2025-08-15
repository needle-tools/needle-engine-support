---
title: MaterialX
---

## MaterialX dans Needle Engine

MaterialX est une norme puissante pour décrire les matériaux et les shaders de manière graphique, indépendamment du moteur de rendu. Il vous permet de définir des matériaux complexes, avec plusieurs couches de surface et un éclairage réaliste.

Il est largement utilisé dans le cinéma, les VFX et le commerce électronique, et est pris en charge par de nombreux outils de création professionnels tels que Autodesk Maya et 3ds Max, Houdini, V-Ray et Omniverse.

::: tip En savoir plus
Vous pouvez en savoir plus sur MaterialX sur le [site web de MaterialX](https://www.materialx.org/).
:::

Les matériaux créés avec le [**Shader Graph**](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.3/manual/index.html) de Unity peuvent être exportés automatiquement vers des fichiers MaterialX via le **Needle MaterialX Exporter**, qui fait partie de notre package d'intégration Unity.

Cela vous permet de créer des matériaux complexes et éclairés dans Unity, et ils sont automatiquement exportés avec votre scène. L'exportation MaterialX étend notre exportation existante de shaders Unlit, qui est moins portable en raison de l'utilisation de shaders WebGL2. Avec MaterialX, vous êtes prêt pour WebGPU et les futures technologies de rendu, et pouvez obtenir des matériaux de haute fidélité dans vos projets web.

La prise en charge de MaterialX dans Needle Engine utilise la [bibliothèque JavaScript officielle de MaterialX](https://github.com/materialx/MaterialX), ce qui signifie que les matériaux sont représentés avec la plus haute fidélité possible. Cela vous permet d'utiliser n'importe quel fichier MaterialX.

::: info Shader Graph vers MaterialX nécessite un plan **Pro**, **Edu** ou **Enterprise**.
L'exportateur MaterialX est disponible pour les utilisateurs des plans Pro, Edu et Enterprise.
[Voir les plans et les prix.](https://needle.tools/pricing)
:::

## Cas d'utilisation

MaterialX est un excellent choix si vous
- utilisez des **matériaux basés sur des graphes** pour vos projets afin de bénéficier d'un contrôle artistique et d'une flexibilité.
- avez besoin de **caractéristiques de surface riches et complexes** telles que des textures procédurales, des cartes de détail ou des matériaux en couches.
- disposez de **matériaux MaterialX existants** que vous souhaitez conserver tout au long de votre pipeline de studio.
- souhaitez assurer la **cohérence et la compatibilité** de vos rendus sur différents moteurs de rendu.

## Activer la prise en charge de MaterialX dans votre projet

Pour activer la prise en charge de MaterialX dans votre projet Needle Engine, vous devez ajouter le package `@needle-tools/materialx` à votre projet.

::: tabs

@tab Unity

1. Sélectionnez le composant Needle Engine dans votre scène.

2. Trouvez la section "NpmDef Dependencies" dans l'Inspecteur, et ajoutez une nouvelle dépendance en augmentant le nombre "Size" (par exemple de 0 à 1).

3. Cliquez sur le symbole Object Picker, activez la visibilité des packages avec le symbole de l'œil, et sélectionnez le package `Needle MaterialX` dans la liste.

   ![Trouver et ajouter la dépendance du package MaterialX dans Unity.](/materialx/add-materialx-package-dependency.jpeg)
   _Trouver et ajouter la dépendance du package MaterialX dans Unity._

Vous êtes maintenant prêt à utiliser MaterialX dans votre projet web.

@tab Autres intégrations Needle

1. Trouvez et ouvrez votre projet web dans un éditeur de code (par exemple VS Code).
   [Découvrez comment ouvrir votre projet web.](./project-structure.html#opening-the-web-project-in-a-code-editor)
2. Installez le package Needle MaterialX depuis le registre NPM dans votre projet web.

   ```bash
   npm install @needle-tools/materialx
   ```

   Cela ajoutera le package MaterialX à votre projet.

3. Si vous utilisez l'un de nos modèles basés sur Vite, vous n'avez rien d'autre à faire. Le package MaterialX sera automatiquement inclus dans votre projet.

    ::: tip Si vous n'êtes pas sûr, vous utilisez probablement l'un de nos modèles basés sur Vite !
    :::

4. Si vous n'utilisez pas les plugins Needle Vite, importez et enregistrez MaterialX dans votre fichier d'entrée principal, par exemple dans `main.ts` :

   ```ts
   import { useNeedleMaterialX } from "@needle-tools/materialx";
   useNeedleMaterialX();
   ```

Vous êtes maintenant prêt à utiliser MaterialX dans votre projet web.

@tab three.js

Vous pouvez utiliser notre package MaterialX dans n'importe quel projet three.js, même si vous n'utilisez pas Needle Engine.

1. Enregistrez notre plugin `MaterialX` avec votre `GLTFLoader` :

    ```ts
    import { useNeedleMaterialX } from "@needle-tools/materialx";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

    const gltfLoader = new GLTFLoader();

    // ... enregistrez d'autres plugins tels que DRACOLoader, KTX2Loader, etc.
    useNeedleMaterialX(gltfLoader);

    // ... chargez un fichier qui contient des matériaux MaterialX
    gltfLoader.load("https://cloud.needle.tools/-/assets/Z23hmXB2qfHiF-2qfHiF/file", (gltf) => {
        scene.add(gltf.scene);
    });
    ```

2. Chargez les fichiers GLB qui contiennent l'extension `NEEDLE_materials_mtlx`. Le plugin chargera et appliquera automatiquement les matériaux MaterialX aux objets qui les utilisent.

3. Vous pouvez activer le préchargement du module WebAssembly MaterialX en appelant `useNeedleMaterialX(gltfLoader, { preload: true })`. Cela chargera le module WebAssembly MaterialX à l'avance, de sorte qu'il soit prêt lorsque vous chargerez un fichier GLB avec des matériaux MaterialX.

Vous pouvez trouver un exemple complet d'utilisation de MaterialX dans un projet three.js sur StackBlitz : [MaterialX in three.js](https://stackblitz.com/edit/needle-materialx-example?file=main.js).

:::
## Exportation de matériaux avec la prise en charge de MaterialX

1. Créez des matériaux avec le Shader Graph de Unity.

   ![Exemple d'un Shader Graph complexe dans Unity.](/materialx/shadergraph-example.webp)
   _Exemple d'un Shader Graph complexe dans Unity._

2. Sélectionnez un objet qui a un matériau basé sur le Shader Graph dans votre scène, ou sélectionnez l'asset du shader dans la vue Projet.

3. Dans les propriétés du matériau, trouvez la section "Needle Engine – Custom Shader Settings", et sélectionnez "MaterialX" comme Type d'Exportation de Shader.

    ![Activation du type d'exportation MaterialX dans les propriétés du matériau Shader Graph.](/materialx/enable-asset-label-from-material.jpeg)
    _Activation du type d'exportation MaterialX dans les propriétés du matériau Shader Graph._

3. Lorsque vous exportez votre scène, tous les matériaux utilisant des shaders avec le type d'exportation "MaterialX" seront intégrés à votre contenu 3D et chargés à l'exécution.

## Utilisation de fichiers MaterialX créés en externe

Le package Needle MaterialX contient un support expérimental pour le chargement direct des fichiers MaterialX. Les textures peuvent être résolues via une fonction de rappel, et les matériaux sont retournés en tant que `ShaderMaterial` de three.js.

Vous pouvez trouver des exemples d'utilisation du package Needle MaterialX [dans notre collection MaterialX sur StackBlitz](
https://stackblitz.com/@marwie/collections/materialx).

:::: tabs
@tab Depuis le code

```ts
import { TextureLoader } from 'three';
import { Experimental_API } from '@needle-tools/materialx';

// Charge un fichier MaterialX et ses textures référencées à partir d'une URL
function load(mtlx_url) {
    const parts = mtlx_url.split('/');
    parts.pop();
    const dir = parts.join('/');

    return fetch(mtlx_url)
    .then((res) => res.text())
    .then((mtlx) => {
        const loader = new TextureLoader();
        Experimental_API.createMaterialXMaterial(mtlx, '', {
            getTexture: async (url) => {
                return await loader.loadAsync(dir + url);
            },
        }).then((mat) => {
            console.log("Le matériau MaterialX a été chargé :", mat);
        });
    });
}
```

::: info
La méthode `Experimental_API.createMaterialXMaterial()` ne prend actuellement pas en charge le chargement de plusieurs matériaux, ni les fichiers MaterialX avec des références .mtlx supplémentaires.
:::

::::

## Nœuds et fonctionnalités pris en charge

Needle Engine prend en charge l'intégralité de la spécification MaterialX, y compris les nœuds OpenPBR, Standard Surface, UsdPreviewSurface et Unlit Surface, ainsi que les nœuds NPR (rendu non photoréaliste) comme les effets de Fresnel. Les définitions de graphes de nœuds imbriqués et les nœuds personnalisés sont également pris en charge.

Les matériaux MaterialX dans Needle Engine prennent en charge les fonctionnalités suivantes :
- **Éclairage Basé sur l'Image** (IBL) provenant automatiquement de la carte d'environnement de la scène
- Les **Sondes de Réflexion** affectent les objets utilisant des matériaux MaterialX
- **Sources lumineuses** : Lumières directionnelles, ponctuelles et spot, avec une limite actuelle de 8 lumières par scène
- **Compression de textures et textures progressives**. Les matériaux MaterialX prennent entièrement en charge les puissantes fonctionnalités de compression de textures et de chargement progressif de Needle Engine, vous permettant d'utiliser de grandes textures. Elles ne seront chargées que lorsque nécessaire, et uniquement dans la résolution requise pour la vue actuelle.
- **Propriétés de matériau animées** pour les couleurs, les flottants, les vecteurs. Comme pour les autres matériaux dans Needle Engine, toute propriété de matériau numérique peut être animée.
- Tous les modèles de surface MaterialX, y compris **OpenPBR**, **Standard Surface**, **UsdPreviewSurface** et **Unlit Surface**.

L'exportateur Needle MaterialX tire parti de la structure basée sur les graphes du Shader Graph de Unity pour l'exportation, et convertit les nœuds Shader Graph en nodedefs et nodegraphs MaterialX. Il prend en charge les fonctionnalités suivantes :
- **Propriétés de matériau** comme les couleurs, les flottants, les vecteurs, les textures
- **Opérations** sur les nombres, les vecteurs et les matrices
- **Nœuds de mélange** comme Mix, Add, Multiply et Blend avec différents modes de mélange
- **Textures** et espaces colorimétriques
- **Sous-graphes** avec un ou plusieurs niveaux d'imbrication
- Les **couleurs de sommet** sont prises en charge
- Plusieurs **canaux UV** sont pris en charge (jusqu'à 4)
- Les **Mots-clés de Shader** sont pris en charge et seront exportés en tant que nœuds de commutation dans MaterialX.

## Version de MaterialX prise en charge

Needle Engine prend actuellement en charge la version 1.39.4 de MaterialX. Les documents MaterialX de versions antérieures sont également pris en charge et seront automatiquement mis à niveau vers la dernière version.

## Limitations de l'exportateur MaterialX

Toutes les fonctionnalités prises en charge par Shader Graph ne sont pas également prises en charge par MaterialX. Si vous tentez d'exporter un nœud non pris en charge, l'exportateur enregistrera une erreur et arrêtera le processus d'exportation. Vous pourrez alors corriger le problème en remplaçant le nœud non pris en charge par un nœud pris en charge, si possible.

- **Le déplacement de sommet n'est pas encore pris en charge** : MaterialX prend en charge le mappage de déplacement, mais Needle Engine ne le prend pas encore en charge. Cela signifie que tous les nœuds de déplacement dans vos fichiers MaterialX seront ignorés.
- **Ombres en temps réel** : Les sources lumineuses de votre scène affecteront les matériaux MaterialX, mais les ombres en temps réel ne sont actuellement pas prises en charge.
- **Lightmaps précalculées** : Les lightmaps précalculées ne sont actuellement pas prises en charge dans les matériaux MaterialX.
- L'**espace tangent** n'est pas pris en charge pour le moment, ce qui signifie que les nœuds Shader Graph spécifiant "Tangent" comme espace auront un aspect différent.
- Les **Nœuds de Code** ne sont pas pris en charge pour le moment.

::: tip Le mot-clé spécial de shader "MATERIALX"
Si vous avez des shaders complexes avec des nœuds non pris en charge, vous pouvez utiliser le mot-clé "MATERIALX" pour éviter de les exporter. Le chemin "On" des commutateurs de mots-clés sera exporté, et le chemin "Off" sera ignoré pour l'exportation. Vous pouvez l'utiliser pour maintenir des shaders avec des nœuds personnalisés ou des fonctionnalités non prises en charge fonctionnels, tout en les exportant vers MaterialX.
:::

::: info Prise en charge intégrée de MaterialX dans three.js
Bien que three.js ait un support initial pour MaterialX, il utilise une implémentation personnalisée qui ne prend pas en charge de nombreuses fonctionnalités de la norme, ce qui entraîne une précision moindre dans la représentation des matériaux. Needle Engine utilise la bibliothèque JavaScript officielle de MaterialX, ce qui signifie que les matériaux sont représentés avec la plus haute fidélité possible.

Needle contribue au support MaterialX intégré de three.js, afin qu'à un certain point nous puissions offrir les deux options ou passer à l'implémentation de three.js une fois qu'elle sera plus complète.
:::

Page automatiquement traduite à l'aide de l'IA