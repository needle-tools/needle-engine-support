---
title: Needle Cloud
description: 'Needle Cloud est un service en ligne. Il vous aide à stocker, gérer et partager des assets et des applications 3D sur le web.
 Une variété de formats de fichiers sont pris en charge, y compris glTF, USD, FBX, VRM, et plus encore. Les applications web spatiales créées avec Needle peuvent être déployées sur le cloud directement depuis l''intégration Unity, et via la ligne de commande (CLI).'
---

<br/>
<discountbanner/>


# Needle Cloud

## Vue d'ensemble

Needle Cloud est un service en ligne. Il vous aide à stocker, gérer et partager des assets et des applications 3D sur le web.
Une variété de formats de fichiers sont pris en charge, y compris glTF, USD, FBX, VRM, et plus encore. Les applications web spatiales créées avec Needle peuvent être déployées sur le cloud directement depuis l'intégration Unity, et via la ligne de commande (CLI). L'intégration Blender arrivera plus tard ; vous pouvez utiliser la CLI en attendant.

Visitez [Needle Cloud](https://cloud.needle.tools) pour commencer.

![Vue d'ensemble de Needle Cloud](/cloud/cloud-overview-page.webp)

## Fonctionnalités

1. **Héberger des applications web spatiales**
   Les applications créées avec Needle peuvent être déployées sur le cloud directement depuis nos intégrations moteur. Cela vous permet de donner facilement un accès public à vos applications à votre équipe et à vos clients, sans avoir à configurer votre propre serveur. Si nécessaire, vous pouvez protéger les applications avec un mot de passe.

2. **Gérer les assets 3D en privé et en toute sécurité**
   Téléchargez et organisez facilement vos fichiers 3D. Grâce à notre CDN rapide (réseau de diffusion de contenu), vos fichiers sont stockés en toute sécurité et sont accessibles rapidement depuis n'importe où dans le monde.
   Needle Cloud n'est pas une place de marché, ni un réseau social. Il est conçu pour les agences, les studios et les créateurs afin de gérer leurs assets en privé et en toute sécurité.

3. **Optimiser les assets 3D à partir d'une variété de formats**
   Compressez automatiquement vos fichiers pour réduire leur taille tout en maintenant la qualité visuelle. Cela accélère le chargement de vos fichiers et économise de la bande passante et de la mémoire sur les appareils des utilisateurs.

4. **Partage et contrôle de version**
   Les liens vers vos fichiers peuvent être partagés avec d'autres et utilisés directement dans vos projets. Vous pouvez télécharger de nouvelles versions d'assets et d'applications. Les versions individuelles peuvent être étiquetées, ce qui permet des flux de travail de révision flexibles : par exemple, vous pouvez étiqueter une version comme `main` ou `experimental`. Vous pouvez également rétablir des étiquettes à une version précédente si nécessaire.

5. **Outils d'automatisation et de pipeline via CLI**
   La CLI `needle-cloud` (interface de ligne de commande) facilite l'automatisation du téléchargement et de l'optimisation des fichiers. C'est utile pour intégrer Needle Cloud dans votre pipeline existant, ou pour automatiser le téléchargement d'un grand nombre de fichiers.

6. **Gestion des licences**
   Les licences pour Needle Engine pour les créateurs individuels et les équipes sont gérées via Needle Cloud. Cela garantit que seuls les utilisateurs autorisés peuvent accéder à vos fichiers et projets. Contactez-nous pour les licences Entreprise et Éducation.

## Déployer depuis Unity

Needle Cloud est intégré à l'éditeur Unity. Cela vous permet de déployer vos applications directement depuis Unity vers Needle Cloud. Vous pouvez également télécharger et uploader des assets depuis Needle Cloud directement dans Unity.

1. **Installez l'intégration Unity, si ce n'est pas déjà fait.**
   Voir [cette page](./../unity/) pour plus d'infos.

2. **Ajoutez le composant `Export Info` à votre scène.**
   Ce composant est utilisé pour configurer les paramètres d'exportation de votre application.
   Vous pouvez utiliser l'élément de menu `GameObject > Needle Engine > Add Export Info` ou créer une nouvelle scène à partir d'un modèle Needle via l'élément de menu `File > New Scene`.

3. **Cliquez sur `Upload to Needle Cloud`.**
   Cela construira votre application et la téléchargera sur Needle Cloud. Vous pouvez également choisir de déployer sur une équipe et un projet spécifiques. Le _upload name_ du projet, visible à côté du bouton, est enregistré dans la scène. Les futurs téléchargements utiliseront le même nom de téléchargement, et toutes les versions téléchargées seront regroupées sur le site web de Needle Cloud.

   ![Intégration Unity de Needle Cloud](/cloud/cloud-deploy-v1.webp)

## Déployer depuis la CLI

Needle Cloud fournit une interface de ligne de commande (CLI) qui vous permet de gérer vos assets et de déployer vos applications efficacement. Vous pouvez utiliser la CLI pour automatiser les tâches et intégrer Needle Cloud dans vos flux de travail existants.

La CLI est disponible en tant que [paquet npm](https://www.npmjs.com/package/needle-cloud), ce qui signifie que vous devez avoir Node.js installé sur votre machine. Vous pouvez vérifier si Node.js est installé en exécutant la commande suivante dans votre terminal :

```bash
node -v
```
Si vous n'avez pas Node.js installé, vous pouvez le télécharger depuis le [site web de Node.js](https://nodejs.org/).

Vous pouvez installer le paquet `needle-cloud` CLI globalement ou l'utiliser via `npx`. Cela vous permet d'exécuter les commandes CLI sans avoir à l'installer globalement.


1. **Utiliser la commande npx (recommandé)**
   ```bash
   npx needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```
2. **Ou installer needle-cloud globalement**
   Une installation globale permet d'utiliser la CLI depuis n'importe où sur votre système. Pour installer la CLI globalement, exécutez la commande suivante dans votre terminal :
   ```bash
   npm install -g needle-cloud
   ```
   Maintenant, vous pouvez utiliser la commande `needle-cloud` dans votre terminal :

   ```bash
   needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```

### Déploiements automatisés
Pour déployer depuis **Github Actions** ou **Stackblitz**, vous pouvez fournir un jeton d'accès comme `--token <access_token>`. Les jetons d'accès peuvent être créés sur [votre page d'équipe](https://cloud.needle.tools/team) sur Needle Cloud. Assurez-vous de créer votre jeton avec les permissions `read/write`.

Utilisez l'[Action Github Needle Cloud](https://github.com/marketplace/actions/deploy-to-needle-cloud) pour déployer une mise à jour depuis Github (par exemple, chaque fois que vous poussez vers le dépôt)

#### Exemple : Action Github Needle Cloud
```yml
      - name: Déployer vers Needle Cloud
        uses: needle-tools/deploy-to-needle-cloud-action@v1
        id: deploy
        with:
            token: ${{ secrets.NEEDLE_CLOUD_TOKEN }}
            dir: ./dist
            name: vite-template # optional
```

#### Exemple : Déployer en utilisant une commande CLI

```bash
# Deploy to Needle Cloud from e.g. a github action
npx needle-cloud deploy '/path/to/output' --team 'My team' --name 'some name or id' --token '<access_token>'
```

### Aide CLI
Utilisez `help` pour voir toutes les options de ligne de commande disponibles et l'aide aux commandes individuelles.
```bash
# voir toutes les options disponibles
npx needle-cloud help
# obtenir de l'aide pour une commande spécifique, par exemple deploy
npx needle-cloud help deploy
```


## URL de déploiement

Lors du déploiement sur Needle Cloud, chaque téléchargement obtient une URL unique. Vous pouvez partager un lien vers une version _spécifique_, ou vers une version _étiquetée_ avec votre équipe ou vos clients.

-----

Dans l'exemple suivant, nous avons une application qui a été déployée deux fois jusqu'à présent. Chaque déploiement obtient une URL spécifique, également connue sous le nom d'URL _épinglée_ car elle est épinglée à une version spécifique.
1. [collaborativesandbox-zubcks1qdkhy<strong>-1qdkhy</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-1qdkhy.needle.run/)
   C'est la première version qui a été téléchargée.
2. [collaborativesandbox-zubcks1qdkhy<strong>-2e2spt</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-2e2spt.needle.run/)
   C'est la deuxième version qui a été téléchargée.

Le dernier déploiement (_latest_) est toujours disponible à l'URL suivante. Cette URL est utile pour partager avec votre équipe, car elle pointe toujours vers la version la plus récente de l'application. Un autre nom courant pour cette version est _dev_ ou _canary_.
- [collaborativesandbox-zubcks1qdkhy<strong>-latest</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-latest.needle.run/)
  Cette URL affiche automatiquement la nouvelle version lorsque vous téléchargez une nouvelle version de l'application.

Le déploiement _main_ est utile pour partager avec les clients, car il pointe toujours vers la version la plus récente de l'application que vous avez promue. D'autres noms courants pour cette version sont _production_, _stable_, ou _live_.
- [collaborativesandbox-zubcks1qdkhy.needle.run](https://collaborativesandbox-zubcks1qdkhy.needle.run/)
  Cette URL ne change pas lorsque vous téléchargez une nouvelle version. Elle ne changera que lorsque vous promouvez explicitement une nouvelle version vers _main_.

Typiquement, vous téléchargez une nouvelle version, la révisez, puis décidez si vous voulez la promouvoir vers _main_.

-----

Le site web de Needle Cloud affiche toutes les versions déployées de l'application, y compris les versions latest et main. Les étiquettes peuvent être déplacées en cliquant sur <kbd>⋮</kbd> et en sélectionnant <kbd>Set main label</kbd> ou <kbd>Remove main label</kbd>.

![Liste des versions de Needle Cloud](/cloud/cloud-edit-page.webp)

## Formats 3D pris en charge

1. **glTF et GLB** <a href="https://cloud.needle.tools/view?file=2oAMeWZ1hWL3C-latest-product" target="_blank">Exemple</a>
   Le format glTF est le format le plus largement pris en charge pour la 3D sur le web. C'est un format léger qui peut stocker des modèles 3D, des animations et des textures. Les fichiers GLB sont des versions binaires des fichiers glTF, où toutes les données sont stockées dans un seul fichier.
   glTF prend en charge les techniques de compression avancées comme Draco, KTX2 et Meshopt, qui sont entièrement prises en charge par Needle Cloud et Needle Engine.

2. **OpenUSD**
   USD est un format puissant pour l'échange de données 3D. Il est connu pour son utilisation dans l'industrie cinématographique et VFX, et gagne en popularité dans l'industrie du jeu. Needle Cloud prend en charge nativement les fichiers USDZ et USD grâce à notre travail sur USD-WASM, et convertit également les fichiers USD en glTF pour un traitement et une optimisation ultérieurs.

3. **FBX**
   FBX a été un format populaire pour l'échange de données 3D pendant de nombreuses années, mais il lui manque un certain nombre de fonctionnalités modernes comme les matériaux PBR et les extensions. Needle Cloud convertit les fichiers FBX en glTF pour un traitement et une optimisation ultérieurs.

4. **VRM**
   VRM est un format pour les avatars humanoïdes. Il est basé sur glTF avec des contraintes supplémentaires grâce à l'utilisation d'extensions glTF. Needle Cloud prend en charge nativement les fichiers VRM et peut les optimiser comme d'autres fichiers glTF, y compris les extensions VRM complexes comme les phonèmes, le toon shading et les dynamic bones.

5. **OBJ**
   OBJ est un format texte simple pour les modèles 3D. Il prend en charge les matériaux de base via les fichiers MTL, les animations et les hiérarchies d'objets. Needle Cloud convertit les fichiers OBJ en glTF pour un traitement et une optimisation ultérieurs.

:::tip Utiliser glTF ou USD quand c'est possible
Nous recommandons glTF et USD comme formats principaux pour l'échange de données 3D. Ils sont largement pris en charge, ont des fonctionnalités modernes et un bon modèle de matériau.
:::

## Assets Cloud

### Téléchargement d'Assets

Vous pouvez télécharger vos fichiers facilement en les faisant glisser sur le site web ou en les sélectionnant depuis votre ordinateur.
Les fichiers non-glTF sont automatiquement convertis en glTF pour un traitement ultérieur, mais les fichiers originaux sont conservés pour le téléchargement et la visualisation web.

### Versions d'Asset

Lorsque vous visitez la page d'édition (Edit Page) d'un asset, vous pouvez voir toutes les versions qui ont été téléchargées jusqu'à présent par vous ou votre équipe. Vous pouvez également étiqueter des versions pour les marquer comme "main" ou "experimental". "Latest" est l'étiquette par défaut pour la version la plus récente.

### Partager des liens vers des Assets

Vous pouvez créer des liens pour partager des fichiers spécifiques ou des fichiers étiquetés avec votre équipe ou vos clients. Les liens étiquetés se mettront automatiquement à jour lorsque vous déplacerez l'étiquette – vous pouvez donc partager un lien "main" une seule fois et continuer à mettre à jour le fichier sans avoir à envoyer un nouveau lien.

### Utiliser les Assets Cloud dans Needle Engine

Les fichiers stockés dans Needle Cloud peuvent être facilement intégrés directement dans les projets Needle Engine. Le composant `Needle Cloud Asset` prend un lien vers un asset et le charge au moment de l'exécution. Cela vous permet de garder la taille de votre projet petite et de charger les assets à la demande qui peuvent toujours être mis à jour dans le cloud.

::: tip Utiliser le chargement progressif lorsque c'est possible
Les assets stockés sur Needle Cloud sont automatiquement optimisés pour une utilisation idéale au moment de l'exécution grâce à notre technologie de chargement progressif (Progressive Loading). Pour chaque maillage et texture, plusieurs versions avec différents niveaux de détail (level-of-detail) sont générées, et seules les parties de l'asset nécessaires sont chargées au moment de l'exécution.

Cela économise beaucoup de bande passante et de mémoire (généralement 90 % ou plus par rapport au chargement de l'asset complet).
:::

### Intégrer le Viewer Cloud sur Votre Site Web

Un moyen rapide d'apporter de la 3D à votre propre site web est d'**intégrer** le visualiseur (viewer) de Needle Cloud.
Pour ce faire, allez sur la page d'édition (Edit Page) d'un asset et cliquez sur <kbd>Embed</kbd>. Vous pouvez ensuite copier l'extrait de code `iframe` et le coller dans votre site web.

::: tip Intégrer des versions spécifiques
Vous pouvez également intégrer le visualiseur avec un lien direct vers l'asset, ou avec une étiquette spécifique. Cela vous permet de mettre à jour l'asset sur Needle Cloud sans avoir à mettre à jour le code d'intégration sur votre site web.
:::

### Intégration dans d'autres frameworks

Les options d'intégration suivantes sont disponibles :
1. **Needle Cloud Viewer**
   Utilisez l'extrait de code `iframe` pour intégrer le visualiseur Needle Cloud sur votre site web.

1. **Needle Engine**
  Utilisez l'extrait de code fourni pour intégrer Needle Engine sur votre site web en tant que [composant web](./../three/).

1. **model-viewer**
  Le projet [model-viewer](https://modelviewer.dev) fournit un composant web pour le rendu de modèles 3D simples et non interactifs dans le navigateur.

1. **three.js**
  Si vous êtes familier avec three.js, vous pouvez utiliser l'extrait de code fourni comme point de départ pour une application three.js qui prend en charge le chargement progressif de Needle et charge efficacement les fichiers depuis Needle Cloud.

1. **React-Three-Fiber**
  Si vous utilisez React-Three-Fiber, vous pouvez utiliser l'extrait de code fourni comme point de départ pour un projet qui prend en charge le chargement progressif de Needle et charge efficacement les fichiers depuis Needle Cloud.

1. **Unity**
  Si vous utilisez Unity, vous pouvez intégrer directement les assets Needle Cloud dans vos projets à l'aide du composant Needle Cloud Asset pour un chargement et une optimisation fluides.

### Utiliser les Assets Cloud avec d'autres moteurs comme Unity ou Unreal

Il existe plusieurs façons d'utiliser les assets stockés sur Needle Cloud dans d'autres moteurs comme Unity ou Unreal.
1. **Télécharger et Importer**
   Vous pouvez télécharger l'asset et l'importer dans votre projet.

2. **Lien Direct**
   Vous pouvez utiliser le lien direct vers l'asset dans votre projet. De cette façon, vous pouvez mettre à jour l'asset sur Needle Cloud et il se mettra automatiquement à jour dans votre projet. Le lien à utiliser dépend du moteur et de ses capacités glTF :
    - Prise en charge de **glTF avec chargement progressif (Progressive Loading)** :
      Utilisez le lien `Progressive-World` ou `Progressive-Product`.
      Consultez [npm:@needle-tools/gltf-progressive](https://www.npmjs.com/package/@needle-tools/gltf-progressive) pour plus d'informations sur le chargement progressif et comment l'activer pour votre moteur.

    - Prise en charge de **glTF avec Draco et KTX2** :
      Utilisez le lien `Optimized`.
    - Prise en charge de glTF, mais **aucune extension de compression** :
      Utilisez le lien `Upload` (pour les téléchargements gltf/glb) ou `Converted` (pour les autres téléchargements).

3. **Composant Needle Cloud Asset**
   Si vous utilisez Needle Engine, vous pouvez utiliser le composant `Needle Cloud Asset` pour charger les assets au moment de l'exécution. Il choisira automatiquement le meilleur lien pour votre plateforme et chargera l'asset avec le chargement progressif (Progressive Loading). Cela est également pris en charge au moment de l'exécution dans les builds Unity.

## CLI pour les Assets

L'interface de ligne de commande (CLI) pour Needle Cloud permet d'automatiser les téléchargements et la compression de fichiers. La CLI peut être utilisée dans le cadre d'une étape de construction (remplaçant un asset par une version optimisée), ou comme un outil autonome (pour le traitement par lots de fichiers).

Consultez [npm:needle-cloud](https://www.npmjs.com/package/needle-cloud) pour plus d'informations sur la CLI et comment l'utiliser.

## FAQ

1. **Qu'est-ce que Needle Cloud ?**
   C'est un service en ligne pour télécharger, compresser et partager des assets et des scènes 3D.

2. **Comment puis-je télécharger des assets sur Needle Cloud ?**
   Vous pouvez télécharger des fichiers en les faisant glisser sur le site web, ou en les téléchargeant directement depuis les intégrations prises en charge. Si vous avez beaucoup de fichiers, vous pouvez utiliser la CLI (interface de ligne de commande) ou l'API (interface de programmation d'application).

3. **Comment puis-je télécharger des fichiers optimisés depuis Needle Cloud ?**
   Vous pouvez télécharger des fichiers depuis le site web. Cliquez sur `Share` puis sur `Download`. Vous pouvez également utiliser la CLI pour télécharger des fichiers.

4. **Puis-je partager mes fichiers avec d'autres ?**
   Oui, vous pouvez créer des liens pour partager vos fichiers. Les liens peuvent être soit des liens de téléchargement direct, soit des liens vers le visualiseur Needle Cloud.

5. **Y a-t-il une limite à la taille des fichiers ?**
   Les limites de téléchargement dépendent de votre forfait. Consultez les détails de votre compte pour plus d'infos.

6. **Les fichiers Needle Cloud peuvent-ils être utilisés avec d'autres outils ?**
   Oui, vous pouvez utiliser vos fichiers dans d'autres programmes en les exportant au format glTF. L'exportation USD arrivera plus tard.

7. **Que se passe-t-il si je n'ai plus d'espace de stockage ?**
   Vous pourriez avoir besoin de mettre à niveau votre forfait ou de supprimer d'anciens fichiers pour faire de la place.


Page automatiquement traduite par l'IA