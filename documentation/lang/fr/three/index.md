<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <img src="/imgs/logo-webcomponents.png" style="max-height:70px;" title="Web Components Logo" alt="Web Components Logo"/> +
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="three.js Logo" alt="three.js Logo"/>
</div>

# Needle Engine en tant que composant web

Needle Engine fournit un composant web facile à utiliser qui peut être utilisé pour afficher des scènes 3D riches et interactives directement en HTML avec seulement quelques lignes de code. C'est le même composant web qui alimente nos intégrations.

Une fois que les options de configuration du composant web ne suffisent plus, vous pouvez l'étendre avec des scripts et des composants personnalisés, et un accès programmatique complet au graphe de scène.

:::tip Utilisez les intégrations !
Pour les scènes 3D complexes et l'itération rapide, nous recommandons d'utiliser Needle Engine avec l'une de nos intégrations. Elles offrent un flux de travail de création puissant, incluant une prévisualisation en direct, le rechargement à chaud (hot reloading) et un pipeline de build avancé avec des optimisations 3D.
:::

### Démarrage rapide
:::: code-group
::: code-group-item index.html
@[code html](@code/basic-webcomponent.html)
:::
::: code-group-item Résultat
<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%;
    aspect-ratio: 16/9;
    outline: none;
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>
:::
::::
[Ouvrir cet exemple sur Stackblitz](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)



## Installation depuis npm

Vous pouvez travailler directement avec Needle Engine sans utiliser d'intégration. Needle Engine utilise [three.js](https://threejs.org/) comme graphe de scène et bibliothèque de rendu, donc toutes les fonctionnalités de three.js sont également disponibles dans Needle.

Vous pouvez installer Needle Engine depuis [`npm`](https://www.npmjs.com/package/@needle-tools/engine) en exécutant :
<br/>
`npm i @needle-tools/engine`

## Installation de needle-engine depuis un CDN

Bien que notre modèle par défaut utilise [vite](https://vitejs.dev), Needle Engine peut également être utilisé directement avec du vanilla Javascript – sans utiliser de bundler.

Vous pouvez ajouter une version complète et pré-packagée de Needle Engine à votre site web avec juste une ligne de code.
Cela inclut nos composants de base, la physique, les particules, le réseautage, XR, et plus encore. Utilisez ceci si vous n'êtes pas sûr !

```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js">
</script>
```

Si vous savez que votre projet ne nécessite pas de fonctionnalités de physique, vous pouvez également utiliser une version plus petite de Needle Engine, sans le moteur physique. Cela réduira la taille totale téléchargée.
```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.light.min.js">
</script>
```


De nombreux exemples peuvent être trouvés sur [StackBlitz](https://stackblitz.com/@marwie/collections/needle-engine).

## Prototypage rapide sur StackBlitz

Pour des expériences rapides, nous fournissons un lien pratique pour créer un nouveau projet prêt à démarrer : [engine.needle.tools/new](https://engine.needle.tools/new)
Une grande collection d'exemples est également disponible dans notre [Needle Engine Stackblitz Collection](https://stackblitz.com/@marwie/collections/needle-engine)

## Développement local avec VS Code

Si vous souhaitez travailler avec Needle Engine sans aucune intégration, vous aurez probablement besoin d'exécuter un serveur local pour votre site web. Voici comment procéder avec Visual Studio Code :

1. Ouvrez le dossier contenant votre fichier HTML dans Visual Studio Code.
2. Installez l'extension [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
3. Activez Live-Server (il y a un bouton "Go Live" dans le pied de page de VSCode).
4. Ouvrez ``http://localhost:5500/index.html`` dans votre navigateur web, si cela ne s'ouvre pas automatiquement.


## three.js et Needle Engine

Comme Needle Engine utilise [three.js](https://threejs.org/) comme graphe de scène et bibliothèque de rendu, toutes les fonctionnalités de three.js sont également disponibles dans Needle et peuvent être utilisées depuis des scripts de composants. Nous utilisons un fork de three.js qui inclut des fonctionnalités et des améliorations supplémentaires, notamment en relation avec WebXR, Animation et l'exportation USDZ.


::: tip
Assurez-vous de mettre à jour le chemin ``<needle-engine src="myScene.glb">`` vers un fichier glb existant ou [téléchargez cet exemple de glb](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb) et placez-le dans le même dossier que le fichier index.html, nommez-le ``myScene.glb`` ou mettez à jour le chemin src.
:::

@[code](@code/basic-html.html)


[Voir sur github](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla)


Page automatiquement traduite par l'IA