<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <img src="/imgs/logo-webcomponents.png" style="max-height:70px;" title="Logo Web Components" alt="Logo Web Components"/> +
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="three.js Logo" alt="three.js Logo"/>
</div>

# Needle Engine en tant que Web Component

Needle Engine fournit un web component facile à utiliser qui peut être utilisé pour afficher des scènes 3D riches et interactives directement en HTML avec seulement quelques lignes de code. C'est le même web component qui alimente nos intégrations.

Une fois que les options de configuration du web component ne suffisent plus, vous pouvez l'étendre avec des scripts et des components personnalisés, et un accès programmatique complet au scene graph.

:::tip Utilisez les intégrations !
Pour les scènes 3D complexes et l'itération rapide, nous recommandons d'utiliser Needle Engine avec l'une de nos intégrations. Elles offrent un workflow de création puissant, incluant une prévisualisation en direct, le hot reloading, et un build pipeline avancé avec des optimisations 3D.
:::

### Démarrage rapide
::: code-tabs
@tab index.html
@[code html](@code/basic-webcomponent.html)

@tab Résultat
```html
<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%;
    aspect-ratio: 16/9;
    outline: none;
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>
```
:::
[Ouvrir cet exemple sur Stackblitz](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)



## Installation depuis npm

Vous pouvez travailler directement avec Needle Engine sans utiliser d'Integration. Needle Engine utilise [three.js](https://threejs.org/) comme scene graph et rendering library, donc toutes les fonctionnalités de three.js sont également disponibles dans Needle.

Vous pouvez installer Needle Engine depuis [`npm`](https://www.npmjs.com/package/@needle-tools/engine) en exécutant :
<br/>
`npm i @needle-tools/engine`

## Installation de needle-engine depuis un CDN

Bien que notre modèle par défaut utilise [vite](https://vitejs.dev), Needle Engine peut également être utilisé directement avec du vanilla Javascript – sans utiliser de bundler.

Vous pouvez ajouter une version complète, prebundled de Needle Engine à votre site web avec juste une ligne de code.
Cela inclut nos core components, physics, particles, networking, XR, et plus encore. Utilisez ceci si vous n'êtes pas sûr !

```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine@4/dist/needle-engine.min.js">
</script>
```


De nombreux exemples peuvent être trouvés sur [StackBlitz](https://stackblitz.com/@marwie/collections/needle-engine).

## Prototypage rapide sur StackBlitz

Pour des expériences rapides, nous fournissons un lien pratique pour créer un nouveau projet prêt à démarrer : [engine.needle.tools/new](https://engine.needle.tools/new)
Une grande collection d'exemples est également disponible dans notre [Needle Engine Stackblitz Collection](https://stackblitz.com/@marwie/collections/needle-engine)

## Développement local avec VS Code

Si vous souhaitez travailler avec Needle Engine sans aucune integration, vous aurez probablement besoin d'exécuter un local server pour votre site web. Voici comment procéder avec Visual Studio Code :

1. Ouvrez le dossier contenant votre fichier HTML dans Visual Studio Code.
2. Installez l'extension [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
3. Activez live-server (il y a un bouton "Go Live" dans le pied de page de VSCode).
4. Ouvrez ``http://localhost:5500/index.html`` dans votre navigateur web, si cela ne s'ouvre pas automatiquement.


## three.js et Needle Engine

Comme Needle Engine utilise [three.js](https://threejs.org/) comme scene graph et rendering library, toutes les fonctionnalités de three.js sont également disponibles dans Needle et peuvent être utilisées depuis des component scripts. Nous utilisons un fork de three.js qui inclut des fonctionnalités et des améliorations supplémentaires, notamment en relation avec WebXR, Animation, et l'exportation USDZ.


::: tip
Assurez-vous de mettre à jour le chemin ``<needle-engine src="myScene.glb">`` vers un fichier glb existant ou [téléchargez cet exemple de glb](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb) et placez-le dans le même dossier que le fichier index.html, nommez-le ``myScene.glb`` ou mettez à jour le chemin src.
:::

@[code](@code/basic-html.html)


[Voir sur github](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla)

Page automatiquement traduite par l'IA