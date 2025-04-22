---
title: Needle Engine pour Blender
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Logo Needle" alt="Logo Needle"/> +
    <img src="/blender/logo.png" style="max-height:70px;" />
</div>

# Needle Engine pour Blender

Needle Engine pour Blender vous permet de créer des applications web très interactives, flexibles et légères directement dans Blender. Utilisez les puissants outils de Blender pour configurer visuellement vos scènes 3D, animer et concevoir.

## Installer l'Add-on Blender

<ClientOnly>

Assurez-vous d'avoir installé <a target="_blank" href="https://www.blender.org/download/"><strong>Blender</strong> 4.1 ou 4.2</a> et <os-link windows_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi" osx_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0.pkg"><strong>node.js</strong></os-link>.
</ClientOnly>

<NoDownloadYet>
    <needle-button
        event_goal="download_blender"
        event_position="getting_started"
        large
        href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"
        same_tab
        next_url="/docs/blender/"
        >
        <strong>Télécharger Needle Engine pour Blender</strong>
    </needle-button>
</NoDownloadYet>

1. Dans Blender, allez dans `Edit > Preferences > Add-ons` et cliquez sur la flèche déroulante pour trouver le bouton `Install from Disk`.

2. Sélectionnez le fichier zip téléchargé (nommé `needle-blender-plugin-*.zip`) pour l'installer.

3. Recherchez "Needle" dans la barre de recherche des Add-ons et assurez-vous que `Needle Engine Exporter for Blender` est activé.


![Paramètres](/blender/settings.webp)

## Démarrer

Nous vous remercions d'utiliser Needle Engine pour Blender.

Avec cet add-on, vous pouvez créer des expériences WebGL et WebXR très interactives et optimisées à l'intérieur de Blender, qui fonctionnent avec Needle Engine et three.js.

Vous pourrez séquencer des animations, facilement appliquer des lightmaps à vos scènes, ajouter de l'interactivité ou créer vos propres scripts écrits en Typescript ou Javascript qui s'exécutent sur le web.

<video-embed src="/docs/blender/environment-light.mp4" />
*Correspondance des paramètres d'éclairage et d'environnement entre Blender et Needle Engine. Les éclairages d'environnement HDRI sont automatiquement exportés, directement depuis Blender. Une fois enregistré, la page est automatiquement rechargée.*

:::tip Fournir des commentaires

**Vos commentaires sont inestimables** lorsqu'il s'agit de décider des fonctionnalités et des flux de travail que nous devrions prioriser. Si vous avez des commentaires à nous faire (bons ou mauvais), n'hésitez pas à nous [les faire savoir sur le forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) !
:::

## Exemples pour Blender

- [Télécharger les exemples Blender](https://engine.needle.tools/downloads/blender/download-samples?utm_source=needle_docs&utm_content=blender)

Commencez par créer ou ouvrir un nouveau fichier blend que vous souhaitez exporter vers le web.
Ouvrez la fenêtre Properties et ouvrez la catégorie scene. Sélectionnez un `Project Path` dans le panneau Needle Engine. Cliquez ensuite sur `Generate Project`. Cela installera et démarrera automatiquement le serveur - une fois terminé, votre navigateur devrait s'ouvrir et la scène three.js se chargera.

![Panneau Projet](/blender/project-panel.webp)

Par défaut, votre scène sera automatiquement réexportée lorsque vous enregistrez le fichier blend.
Si le serveur local est en cours d'exécution (par exemple en cliquant sur `Run Project`), le site web se rafraîchira automatiquement avec votre modèle modifié.


Lorsque votre projet web existe déjà et que vous souhaitez simplement continuer à travailler sur le site web
cliquez sur le bouton bleu `Run Project` pour démarrer le serveur local :
![Panneau Projet](/blender/project-panel-2.webp)

### Vue d'ensemble du panneau Projet
![Panneau Projet](/blender/project-panel-3.webp)

1) Le chemin vers votre projet web. Vous pouvez utiliser le petit bouton dossier sur la droite pour sélectionner un chemin différent.
2) Le bouton `Run Project` apparaît lorsque le chemin du Projet pointe vers un projet web valide. Un projet web est valide s'il contient un `package.json`.
3) `Directory` ouvre le répertoire de votre projet web (le `Project Path`).
4) Ce bouton réexporte la scène actuelle en tant que glb vers votre projet web local. Cela se produit également par défaut lors de l'enregistrement de votre fichier blend.
5) `Code Editor` essaie d'ouvrir l'espace de travail vscode dans votre projet web.
6) Si vous travaillez avec plusieurs scènes dans un même fichier blend, vous pouvez configurer quelle scène est votre scène principale et doit être exportée vers le web. Si l'un de vos composants référence une autre scène, ils seront également exportés en tant que fichiers glb séparés. Lorsque vous cliquez sur le bouton "Export", votre scène principale sera celle qui sera chargée dans le navigateur.
7) Utilisez les boutons `Build: Development` ou `Build: Production` lorsque vous souhaitez télécharger votre projet web sur un serveur. Cela regroupera votre projet web et produira les fichiers que vous pourrez télécharger. Lorsque vous cliquez sur `Build: Production`, cela appliquera également une optimisation à vos textures (elles seront compressées pour le web).
8) Ouvrir la documentation



## Paramètres de Blender

### Gestion des couleurs

Par défaut, la fenêtre de Blender est réglée sur `Filmic` - avec ce paramètre, vos couleurs dans Blender et dans three.js ne correspondront pas.
Pour corriger cela, allez dans la catégorie Render de Blender et dans le panneau ColorManagement sélectionnez `View Transform` : `Standard`.

![Paramètres corrects de gestion des couleurs](/blender/settings-color-management.webp)


## Éclairage d'environnement

Vous pouvez modifier l'éclairage d'environnement et le skybox en utilisant les options de Viewport shading.
Attribuez une cubemap à utiliser pour l'éclairage ou le skybox d'arrière-plan. Vous pouvez ajuster la force ou le flou pour modifier l'apparence à votre guise.

Note : Pour voir également la cubemap du skybox dans le navigateur, augmentez la `World Opacity` à 1.

Note : Alternativement, vous pouvez activer le paramètre `Scene World` dans l'onglet Viewport Shading pour utiliser la texture d'environnement attribuée dans les paramètres du monde de Blender.

![Environnement](/blender/environment.webp)

<video-embed limit_height max_height="300px" src="/docs/blender/environment.mp4" />

Alternativement, si vous ne souhaitez pas voir la cubemap comme arrière-plan, ajoutez un composant Camera à votre caméra Blender et changez `clearFlags: SolidColor` - notez que les paramètres `backgroundBlurriness` et `backgroundIntensity` de la caméra annulent les paramètres de Viewport shading.

![Caméra Environnement](/blender/environment-camera.webp)

### Ajouter votre éclairage et skybox d'environnement HDRI / EXR personnalisés

<video-embed limit_height src="/docs/blender/custom_hdri.mp4" />


## Exportation

Pour exclure un objet de l'exportation, vous pouvez désactiver l'affichage Viewport et Render (voir l'image ci-dessous).

![Exclure de l'exportation](/blender/dont-export.webp)


## Animation 🏇

Pour les cas d'utilisation simples, vous pouvez utiliser le composant Animation pour la lecture d'un ou plusieurs clips d'animation.
Sélectionnez simplement votre objet, ajoutez un composant Animation et attribuez le clip (vous pouvez ajouter des clips supplémentaires à exporter vers le tableau clips).
Par défaut, il ne lira que le premier clip attribué lorsque `playAutomatically` est activé. Vous pouvez déclencher les autres clips en utilisant un simple composant typescript personnalisé).
<video-embed limit_height src="/docs/blender/animation.mp4" />

### AnimatorController

L'AnimatorController peut être créé pour des scénarios plus complexes. Il fonctionne comme une machine à états qui vous permet de créer plusieurs états d'animation dans un graphique et de configurer les conditions et les paramètres d'interpolation pour les transitions entre ceux-ci.

<video-embed src="/docs/blender/animatorcontroller-web.mp4" />
*Créer et exporter des [machines à états d'animateur](#animatorcontroller) pour contrôler des animations de personnages complexes.*


#### Créer un AnimatorController

L'éditeur AnimatorController peut être ouvert à l'aide de la liste déroulante EditorType dans le coin supérieur gauche de chaque panneau :

![Fenêtre d'ouverture de l'AnimatorController](/blender/animatorcontroller-open.webp)

<video-embed limit_height max_height="188px" src="/docs/blender/animatorcontroller-create.mp4" />
*Créer un nouvel asset d'animateur-contrôleur ☝ ou en sélectionner un parmi vos assets précédemment créés.*

##### Vue d'ensemble du graphique
![Vue d'ensemble de l'AnimatorController](/blender/animatorcontroller-overview.webp)
1) Utilisez `Shift+A` pour créer un nouvel AnimatorState.
2) Le nœud `Parameters` sera créé une fois que vous aurez ajouté un premier nœud. Sélectionnez-le pour configurer les paramètres à utiliser dans les transitions (via le panneau Node sur le bord droit).
3) Ceci est un AnimatorState. L'état orange est l'état de départ (il peut être modifié à l'aide du bouton `Set default state` dans le panneau Node/Properties).
4) Les propriétés d'un AnimatorState peuvent être utilisées pour configurer une ou plusieurs transitions vers d'autres états. Utilisez le tableau `Conditions` pour sélectionner les paramètres qui doivent correspondre à la condition pour effectuer la transition.

#### Utiliser un AnimatorController

Pour utiliser un AnimatorController, ajoutez un composant Animator à l'objet racine de vos animations et sélectionnez l'asset AnimatorController que vous souhaitez utiliser pour cet objet.

![Attribuer l'AnimatorController à l'animateur](/blender/animatorcontroller-assigning.webp)

Vous pouvez définir les paramètres de l'Animator à partir de typescript ou, par exemple, en utilisant l'événement d'un composant Button.


### Timeline — Export des pistes NLA 🎬

Vous pouvez exporter les pistes NLA de Blender directement vers le web.
Ajoutez un composant PlayableDirector (via `Add Component`) à n'importe quel objet Blender. Attribuez les objets dans la liste ``animation tracks`` du composant pour lesquels vous souhaitez que les pistes NLA soient exportées.

![](/blender/timeline_setup.webp)
![](/blender/timeline.webp)

::: details Exemple de code pour une lecture interactive de la timeline
Ajoutez ce script à `src/scripts` (voir la section sur les composants personnalisés) et ajoutez-le à n'importe quel objet dans Blender pour contrôler le temps d'une timeline en faisant défiler dans les navigateurs.

```ts twoslash
import { Behaviour, PlayableDirector, serializable, Mathf } from "@needle-tools/engine";

export class ScrollTimeline extends Behaviour {

    @serializable(PlayableDirector)
    timeline?: PlayableDirector;

    @serializable()
    sensitivity: number = .5;

    @serializable()
    clamp: boolean = false;

    private _targetTime: number = 0;

    awake() {
        this.context.domElement.addEventListener("wheel", this.onWheel);
        if (this.timeline) this.timeline.pause();
    }

    private onWheel = (e: WheelEvent) => {
        if (this.timeline) {
            this._targetTime = this.timeline.time + e.deltaY * 0.01 * this.sensitivity;
            if (this.clamp) this._targetTime = Mathf.clamp(this._targetTime, 0, this.timeline.duration);
        }
    }

    update(): void {
        if (!this.timeline) return;
        const time = Mathf.lerp(this.timeline.time, this._targetTime, this.context.time.deltaTime / .3);
        this.timeline.time = time;
        this.timeline.pause();
        this.timeline.evaluate();
    }
}
```
:::

## Interactivité 😎

Vous pouvez ajouter ou supprimer des composants aux objets de votre hiérarchie en utilisant le panneau Needle Components :

![Panneau Composants](/blender/components-panel.webp)

![Panneau Composants](/blender/components-panel-select.webp)
*Par exemple, en ajoutant un composant `OrbitControls` à l'objet caméra*
*vous obtenez des contrôles de caméra de base pour les appareils mobiles et de bureau.*
*Ajustez les paramètres de chaque composant dans leurs panneaux respectifs.*

Les composants peuvent être supprimés en utilisant le bouton X en bas à droite :

![Supprimer un composant](/blender/remove-component.webp)

### Composants personnalisés
Des composants personnalisés peuvent également être facilement ajoutés en écrivant simplement des classes Typescript. Elles compileront et s'afficheront automatiquement dans Blender une fois enregistrées.

Pour créer des composants personnalisés, ouvrez l'espace de travail via le panneau Needle Project et ajoutez un fichier script `.ts` dans `src/scripts` à l'intérieur de votre projet web. Veuillez vous référer à la [documentation sur le scripting](http://docs.needle.tools/scripting) pour apprendre à écrire des composants personnalisés pour Needle Engine.

::: warning Note
Assurez-vous que ``@needle-tools/needle-component-compiler`` 2.x est installé dans votre projet web (devDependencies de package.json).
:::

## Lightmapping 💡

Needle inclut un plugin de lightmapping qui facilite grandement la cuisson de belles lumières dans des textures et leur transfert sur le web. Le plugin générera automatiquement des UVs de lightmap pour tous les modèles marqués pour être lightmappés, il n'est pas nécessaire de créer un atlas de texture manuel. Il prend également en charge le lightmapping de plusieurs instances avec leurs propres données de lightmap.
Pour que le lightmapping fonctionne, vous avez besoin d'au moins une lumière et d'un objet avec `Lightmapped` activé dans le panneau `Needle Object`.

<video-embed limit_height max_height="800px" src="/docs/blender/lightmapping.mp4" />

::: tip
Vous pouvez télécharger le fichier .blend de la vidéo [ici](https://engine.needle.tools/downloads/blender/lightmaps.blend).
:::
Utilisez le panneau Needle Object pour activer le lightmapping pour un objet mesh ou une lumière :

![Objet Lightmapping](/blender/lightmapping-object.webp)

Pour un accès rapide aux paramètres de lightmap et aux options de cuisson, vous pouvez utiliser le panneau de vue de scène dans l'onglet `Needle` :

![Panneau de scène Lightmapping](/blender/lightmapping-scene-panel.webp)

Alternativement, vous pouvez également utiliser le panneau Lightmapping dans l'onglet `Render Properties` :

![Objet Lightmapping](/blender/lightmapping-panel.webp)

::: warning Fonctionnalité expérimentale
Le plugin de lightmapping est expérimental. Nous vous recommandons de créer une sauvegarde de votre fichier .blend lorsque vous l'utilisez. Veuillez signaler les problèmes ou erreurs que vous rencontrez dans [notre forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) 🙏
:::

## Compression de texture

Le Pipeline de construction de Needle Engine compresse automatiquement les textures en utilisant ECT1S et UASTC (en fonction de leur utilisation dans les matériaux) lors de la création d'une version de production (**nécessite l'installation de [toktx](../getting-started/index.md#install-these-tools-for-production-builds)**). Mais vous pouvez remplacer ou modifier le type de compression par texture dans le panneau Material.

Vous pouvez modifier la compression appliquée par texture. Pour remplacer les paramètres de compression par défaut, allez dans l'onglet `Material` et ouvrez les `Needle Material Settings`. Vous y trouverez un interrupteur pour remplacer les paramètres de texture par texture utilisée dans votre matériau. Consultez le [tableau de compression de texture](../deployment.md#how-do-i-choose-between-etc1s-uastc-and-webp-compression) pour un bref aperçu des différences entre chaque algorithme de compression.

![Options de compression de texture dans Blender](/blender/texture-compression.webp)

## Mise à jour

L'ampoule dans le panneau Needle Project vous informe lorsqu'une nouvelle version de l'addon est disponible.
Cliquez simplement sur l'icône pour télécharger la nouvelle version.
![Notification de mise à jour](/blender/updates.webp)

## Signaler un problème

Si vous rencontrez des problèmes, nous serons plus qu'heureux de vous aider ! Veuillez rejoindre [notre forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) pour un support rapide.

Veuillez également vérifier les journaux dans Blender. Vous pouvez trouver des journaux spécifiques à l'Addon Needle Engine via `Help/Needle` dans Blender.

### Bug Reporter intégré
![Panneau Bug Reporter de Needle Blender](/blender/bugreporter.webp)
Vous pouvez également créer et télécharger automatiquement un rapport de bogue directement depuis Blender. Les rapports de bogue téléchargés seront uniquement utilisés pour le débogage. Ils sont cryptés sur notre backend et seront supprimés après 30 jours.

Si nécessaire, dans certains cas, nous pouvons également mettre en place des NDA personnalisés pour vos projets. Veuillez nous contacter pour plus d'informations.

:::tip L'utilisation du Bug Reporter nécessite un projet web
Assurez-vous d'avoir configuré un projet web avant d'envoyer un rapport de bogue – cela nous permettra de mieux comprendre votre système et votre configuration et facilitera la reproduction du problème.
:::

# Prochaines étapes

- [Concept : Projets Web](../project-structure.md)
- [Concept : Exportation d'Assets](../export.md)
- [Concept : Déploiement (Partager votre site web)](../deployment.md)
- [Composants : En savoir plus sur les Everywhere Actions](../everywhere-actions.md)
- [Scripting pour débutants : L'essentiel de Typescript](../getting-started/typescript-essentials.md)
- [Scripting pour débutants : Comment écrire des composants personnalisés](../scripting.md)


Page automatiquement traduite à l'aide de l'IA