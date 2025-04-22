---
title: Frameworks, Bundlers, HTML
---

## Bundling et frontends web

Needle Engine est conçu comme un composant web.
Cela signifie simplement installer `@needle-tools/engine` dans votre projet et inclure `<needle-engine src="path/to/your.glb">` n'importe où dans votre projet web.

- Installation avec npm:
  `npm i @needle-tools/engine`

Avec notre modèle de projet par défaut basé sur Vite, Needle Engine est regroupé (bundled) en une application web lors du déploiement. Cela garantit des fichiers plus petits, le tree-shaking (similaire au code stripping dans Unity) et optimise les temps de chargement. Au lieu de télécharger de nombreux petits scripts et composants, seul un ou quelques-uns sont téléchargés, contenant le code minimal nécessaire.

Vite (notre bundler par défaut) offre une bonne explication expliquant pourquoi les applications web devraient être regroupées (bundled) : [Why Bundle for Production](https://vitejs.dev/guide/why.html)

### Vite, Vue, React, Svelte, React Three Fiber...

Needle Engine n'a pas de préférence quant au choix du framework. Notre modèle par défaut utilise le populaire [vite](https://vitejs.dev) comme bundler. À partir de là, vous pouvez ajouter vue, svelte, nuxt, react, react-three-fiber ou d'autres frameworks, et nous avons des exemples pour beaucoup d'entre eux. Vous pouvez également intégrer d'autres bundlers, ou n'en utiliser aucun – juste du HTML et Javascript simples.

Voici quelques exemples de piles technologiques possibles avec lesquelles nous utilisons Needle Engine :

- **Vite + HTML** — C'est ce que notre modèle par défaut utilise !

- **Vite + Vue** — C'est ce que le site web [Needle Tools](https://needle.tools) utilise ! Trouvez un exemple à télécharger [ici](https://github.com/needle-tools/needle-engine-samples).
- **Vite + Svelte**
- **Vite + SvelteKit**
- **Vite + React** — Il existe un modèle expérimental inclus avec l'intégration Unity pour cela que vous pouvez choisir lors de la génération d'un projet !
- **react-three-fiber** — Il existe un modèle expérimental inclus avec l'intégration Unity pour cela que vous pouvez choisir lors de la génération d'un projet !
- **Vercel & Nextjs** — Trouvez un [exemple de projet nextjs ici](https://github.com/needle-engine/nextjs-sample)
- **CDN sans aucun bundler** — Trouvez un exemple de code [ici](./vanilla-js.md)

En bref : nous proposons actuellement un modèle vite minimal, mais vous pouvez l'étendre ou passer à d'autres frameworks –
Faites-nous savoir ce que vous construisez et comment, et comment nous pouvons améliorer l'expérience pour votre cas d'utilisation ou fournir un exemple !

:::tip
Certains frameworks nécessitent des paramètres personnalisés dans `needle.config.json`. Apprenez-en davantage [ici](./reference/needle-config-json.md). Typiquement, la `baseUrl` doit être définie.
:::

:::details Comment créer un modèle de projet personnalisé dans Unity ?

Vous pouvez créer et partager vos propres modèles de projet web pour utiliser d'autres bundlers, systèmes de build, ou aucun du tout.

**Créer un nouveau Modèle**
1. Sélectionnez `Create/Needle Engine/Project Template` pour ajouter un ProjectTemplate dans le dossier que vous souhaitez utiliser comme modèle
2. Terminé ! C'est aussi simple que ça.

Les dépendances proviennent d'Unity lorsqu'il y a un NpmDef dans le projet (donc lorsque votre projet utilise des références locales).
Vous pourriez également publier vos packages sur npm et y faire référence via un numéro de version.
:::

### Tree-shaking pour réduire la taille du bundle

Le Tree shaking fait référence à une pratique courante en matière de regroupement (bundling) d'applications web ([voir documentation MSDN](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)). Cela signifie que les chemins de code et les fonctionnalités qui ne sont pas utilisés dans votre code seront supprimés des fichiers javascript finaux regroupés (bundled) afin de réduire la taille des fichiers. Voir ci-dessous les fonctionnalités que Needle Engine inclut et comment les supprimer :

:::details Comment supprimer le moteur physique Rapier ? (Réduit la taille globale du bundle en supprimant ~2Mo (~600Ko une fois compressé avec gzip))

- **Option 1**: via la configuration needlePlugins :
  Définissez `useRapier` sur `false` dans votre vite.config : `needlePlugins(command, needleConfig, { useRapier: false }),`

- **Option 2**: via la configuration vite.define :
  Déclarez la définition `NEEDLE_USE_RAPIER` avec `false`
  ```js
  define: {
    NEEDLE_USE_RAPIER: false
  },
  ```

- **Option 3**: via .env
  Créez un fichier `.env` dans votre projet web et ajoutez `VITE_NEEDLE_USE_RAPIER=false`

- **Option 4**: via le composant Unity
  Ajoutez le composant `Needle Engine Modules` à votre scène et définissez `Physics Engine` sur `None`
  ![](/imgs/unity-needle-engine-modules-physics.jpg)

:::

## Créer une PWA

Nous prenons en charge la création aisée d'une Progressive Web App (PWA) directement à partir de notre modèle vite.
Les PWAs sont des applications web qui se chargent comme des pages web ou des sites web ordinaires, mais peuvent offrir des fonctionnalités utilisateur telles que le travail hors ligne, les notifications push et l'accès au matériel de l'appareil, traditionnellement disponibles uniquement pour les applications mobiles natives.

Par défaut, les PWAs créées avec Needle prennent en charge le mode hors ligne et peuvent éventuellement se rafraîchir automatiquement lorsque vous publiez une nouvelle version de votre application.

1) Installez le [plugin Vite PWA](https://vite-pwa-org.netlify.app/) dans votre projet web : `npm install vite-plugin-pwa --save-dev`
2) Modifiez `vite.config.js` comme indiqué ci-dessous. Assurez-vous de passer le même objet `pwaOptions` à la fois à `needlePlugins` et à `VitePWA`.

```js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async ({ command }) => {

    // Create the pwaOptions object.
    // You can edit or enter PWA settings here (e.g. change the PWA name or add icons).
    // Créez l'objet pwaOptions.
    // Vous pouvez modifier ou saisir les paramètres PWA ici (par exemple, changer le nom de la PWA ou ajouter des icônes).
    /** @type {import("vite-plugin-pwa").VitePWAOptions} */
    const pwaOptions = {};

    const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");

    return {
        plugins: [
            // pass the pwaOptions object to the needlePlugins and the VitePWA function
            // passez l'objet pwaOptions aux fonctions needlePlugins et VitePWA
            needlePlugins(command, needleConfig, { pwa: pwaOptions }),
            VitePWA(pwaOptions),
        ],
        // the rest of your vite config...
        // le reste de votre configuration vite...
```

:::tip Tous les assets sont mis en cache par défaut
Notez que par défaut, tous les assets de votre dossier de build sont ajoutés au pré-cache de la PWA – pour les grandes applications avec de nombreux assets dynamiques, ce n'est peut-être pas ce que vous souhaitez (imaginez la PWA YouTube mettant en cache toutes les vidéos une fois qu'un utilisateur ouvre l'application !). Voir [Plus d'options PWA](#more-pwa-options) pour savoir comment personnaliser ce comportement.
:::

### Tester les PWAs

Pour tester votre PWA, déployez la page, par exemple en utilisant le composant `DeployToFTP`.
Ensuite, ouvrez la page déployée dans un navigateur et vérifiez si les fonctionnalités PWA fonctionnent comme prévu :
- l'application apparaît comme installable
- l'application fonctionne hors ligne
- l'application est détectée comme PWA capable de fonctionner hors ligne par [pwabuilder.com](https://pwabuilder.com/)

Les PWAs utilisent des Service Workers pour mettre en cache les ressources et fournir un support hors ligne. Les Service Workers sont un peu plus difficiles à utiliser pendant le développement, et ne sont généralement activés que pour les builds (par exemple, lorsque vous utilisez un composant `DeployTo...`).

Vous pouvez activer le support PWA pour le développement en ajoutant ce qui suit à l'objet options dans votre `vite.config.js`.

```js
const pwaOptions = {
  // Note: PWAs behave different in dev mode.
  // Make sure to verify the behaviour in production builds!
  // Note : Les PWAs se comportent différemment en mode développement.
  // Assurez-vous de vérifier le comportement dans les builds de production !
  devOptions: {
    enabled: true,
  }
};
```

Veuillez noter que les PWAs en mode développement ne prennent pas en charge l'utilisation hors ligne – essayer pourrait entraîner un comportement inattendu.

### Mettre à jour automatiquement les applications en cours d'exécution

Les sites web affichent généralement du contenu nouveau ou mis à jour lors d'un rafraîchissement de page.

Dans certaines situations, vous pourriez vouloir que la page se rafraîchisse et se recharge automatiquement lorsqu'une nouvelle version a été publiée –
comme dans un musée, un salon professionnel, un affichage public, ou d'autres scénarios de longue durée.

Pour activer les mises à jour automatiques, définissez la propriété `updateInterval` dans l'objet pwaOptions sur une durée (en millisecondes) pendant laquelle l'application doit vérifier les mises à jour. Si une mise à jour est détectée, la page se rechargera automatiquement.

```js
const pwaOptions = {
  updateInterval: 15 * 60 * 1000, // 15 minutes, en millisecondes
};
```

:::tip Rechargements Périodiques et Données Utilisateur
Il n'est pas recommandé d'utiliser les rechargements automatiques dans les applications où les utilisateurs interagissent avec des formulaires ou d'autres données qui pourraient être perdues lors d'un rechargement. Pour ces applications, il est recommandé d'afficher une invite de rechargement.
Consultez la [documentation du plugin Vite PWA](https://vite-pwa-org.netlify.app/guide/prompt-for-update.html) pour plus d'informations sur la façon d'implémenter une invite de rechargement au lieu d'un rechargement automatique.
:::

### Plus d'options PWA

Étant donné que Needle utilise le [plugin Vite PWA](https://vite-pwa-org.netlify.app/) en coulisses, vous pouvez utiliser toutes les options et les hooks qu'il fournit.
Par exemple, vous pouvez fournir un manifeste partiel avec un titre d'application ou une couleur de thème personnalisés :

```js
const pwaOptions = {
  // manifest options provided here will override the defaults
  // les options du manifeste fournies ici remplaceront les valeurs par défaut
  manifest: {
    name: "My App",
    short_name: "My App",
    theme_color: "#B2D464",
  }
};
```

Pour des exigences complexes comme le cache partiel, les service workers personnalisés ou différentes stratégies de mise à jour, vous pouvez supprimer l'option `{ pwa: pwaOptions }` de `needlePlugins` et ajouter la fonctionnalité PWA directement via le plugin Vite PWA.

## Accéder à Needle Engine et aux composants depuis du javascript externe

Le code que vous exposez est accessible depuis JavaScript après le bundling.
Cela permet de créer des visualiseurs et d'autres applications où il y a une séparation entre les données connues au moment de l'édition et les données connues uniquement à l'exécution (par exemple, les fichiers chargés dynamiquement, le contenu généré par l'utilisateur).
Pour accéder aux composants depuis du javascript ordinaire en dehors du moteur, veuillez vous référer à la section [interopérabilité avec du javascript ordinaire](./scripting.md#accessing-needle-engine-and-components-from-anywhere)

## Personnaliser l'apparence du chargement

Voir la section *Loading Display* dans la [référence des composants Needle Engine](./reference/needle-engine-attributes.md)

### Styles intégrés

L'apparence de chargement de needle-engine peut utiliser un thème clair (light) ou sombre (dark).
Pour changer l'apparence, utilisez l'attribut `loading-style` sur le composant web `<needle-engine>`.
Les options sont `light` (clair) et `dark` (sombre) (par défaut) :

```<needle-engine loading-style="light"></needle-engine>```

### Style de chargement personnalisé — *Fonctionnalité PRO* #

Veuillez consulter la section *Loading Display* dans la [référence des composants Needle Engine](./reference/needle-engine-attributes.md)

![custom loading](/imgs/custom-loading-style.webp)


Page traduite automatiquement par l'IA