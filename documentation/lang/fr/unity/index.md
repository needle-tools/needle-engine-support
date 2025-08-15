---
title: Needle Engine pour Unity
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
  <img src="/imgs/unity-logo.webp" style="max-height:70px;" />
</div>

# Needle Engine pour Unity

Needle Engine pour Unity vous permet de créer des applications web hautement interactives, flexibles et légères directement dans Unity. Utilisez les puissants outils de l'Unity editor pour configurer visuellement vos scènes 3D, animer et concevoir. Needle Engine pour Unity s'occupe d'exporter votre scène au format glTF et s'intègre facilement à n'importe quel web frontend framework.


## Installer le Unity Package


<NoDownloadYet>
  <br/>
  <needle-button 
    event_goal="download_unity" 
    event_position="getting_started" 
    large 
    href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"
    same_tab
    next_url="/docs/unity/"
    >
    <strong>Télécharger Needle Engine pour Unity</strong>
  </needle-button> 
</NoDownloadYet>

<!-- [Mirror](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)    -->

1. **Déposez le fichier .unitypackage téléchargé** dans un projet Unity et confirmez que vous souhaitez l'importer.

2. **Attendez un instant** que l'installation et l'importation soient terminées. Une fenêtre peut s'ouvrir indiquant qu' "A new scoped registry is now available in the Package Manager.". Il s'agit de notre registre Needle Package. Vous pouvez fermer cette fenêtre en toute sécurité.  
3. **Explorer les Samples**.  
  Sélectionnez l'option de menu `Needle Engine > Explore Samples` pour visualiser, ouvrir et modifier tous les [sample scenes](https://engine.needle.tools/samples) disponibles.  

## Tutoriel Vidéo de Démarrage Rapide

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />

## Démarrer à partir d'un Sample

Il existe plus de 100 samples qui couvrent un large éventail de sujets, de cas d'utilisation et d'industries.  
Pour un aperçu rapide, jetez un œil à notre [page Samples](https://engine.needle.tools/samples/). 

Tous ces samples sont disponibles directement dans Unity :
1. Allez dans `Needle Engine > Explore Samples` pour parcourir les samples
2. Cliquez sur "Install Samples" pour installer le package d'exemples directement dans votre éditeur (ou [téléchargez le unitypackage d'exemples](http://engine.needle.tools/downloads/unity/samples) pour installer le package manuellement)
3. Choisissez n'importe quel sample et cliquez sur `Open Scene`. 

:::tip Les Samples sont en lecture seule – ce qui les rend faciles à mettre à jour.
Nos sample scenes font partie d'un UPM package dans Unity. Cela signifie que vous ne pouvez pas modifier les assets et les scripts directement – ils sont en lecture seule. Pour modifier un asset du package d'exemples, copiez-le dans le dossier `Assets` de votre projet. Pour modifier un script du package d'exemples, copiez-le dans le dossier `src` de votre web project.
::: 

## Démarrer à partir d'un modèle

Nous fournissons un certain nombre de Scene Templates pour démarrer rapidement de nouveaux projets.  
Ils vous permettent de passer de l'idée au prototype en quelques clics.  

1. Cliquez sur `File > New Scene`

2. Sélectionnez l'un des modèles avec (needle) dans leur nom et cliquez sur `Create`.   
   Nous recommandons le modèle [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox) qui est un excellent moyen de démarrer avec l'interactivité, le multijoueur et l'ajout d'assets.  
3. Cliquez sur Play pour installer et démarrer votre nouveau web project.

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)


## Démarrer de zéro

Si vous ne souhaitez pas démarrer à partir d'un modèle de scène, vous pouvez suivre ces étapes.  
En fait, nous allons recréer le modèle "Minimal (Needle)" fourni avec le package.  

1. **Créer une nouvelle scène vide**  

2. **Configurer votre scène pour l'exportation**   
  Ajoutez un GameObject vide, nommez-le "Exporter" et ajoutez le composant `Needle Engine` à lui (anciennement nommé `Export Info`).  
  Dans ce composant, vous créez et accédez rapidement à votre exported runtime project.  
  Il vous avertit également si l'un de nos packages et modules est obsolète ou non installé localement dans votre web project.  

    ::: tip Nom du Projet et Nom de la Scène
    Par défaut, le nom du projet correspond au nom de votre scène. Si vous souhaitez le modifier, vous pouvez choisir ou entrer un ``Directory Name`` où vous souhaitez créer votre nouveau web project. Le chemin est relatif à votre projet Unity.  
    :::
 
3. **Choisir un modèle de web project**
  Maintenant, sélectionnez un modèle de web project pour votre projet. Le modèle par défaut est basé sur [Vite](https://vitejs.dev/), un fast web app bundler.  
  <br/>
    ![Unity ExportInfo local templates](/imgs/unity-project-local-template.jpg)


4. Cliquez sur Play pour installer et démarrer votre nouveau web project


:::tip Définir vos propres modèles
Si vous vous trouvez à créer de nombreux projets similaires, vous pouvez créer vos propres local ou remote templates en utilisant le menu contextuel de la vue Projet sous `Create/Needle Engine/Project Template`. Les Modèles peuvent être locaux sur le disque (un dossier étant copié) ou remote repositories (un dépôt git étant cloné).
:::

## Dossiers et Fichiers du Projet

:::: file-tree name="Unity Project" showall="true"
::: file Assets/
C'est là que résident les assets spécifiques/exclusifs au projet.
::: 
::: file Packages/
C'est là que résident les packages installés pour ce projet. Un package peut contenir n'importe quel type d'asset, et peut être ajouté à plusieurs projets Unity. C'est donc une excellente méthode pour partager du code ou des assets. Pour en savoir plus sur les packages, consultez [la documentation Unity sur les packages](https://docs.unity3d.com/Manual/PackagesList.html).
::: 
::: file Packages/Needle Engine/
Needle Engine pour Unity est un package qui contient tous les fichiers nécessaires pour exporter votre scène Unity vers un web project. Il contient également les composants et outils intégrés pour créer des web projects interactifs. Vous pouvez mettre à jour le package via le Unity Package Manager.
:::
::: file Packages/Needle Engine/Core/
:::
::: file Packages/Needle Engine/Core/Runtime/
:::
::: file Packages/Needle Engine/Core/Runtime/Components/
Contient tous les built-in components pour Needle Engine. Vous pouvez en apprendre plus sur eux dans la [Référence des composants](./../component-reference.md). Regarder des samples et parcourir ce dossier sont d'excellents moyens de voir quels composants sont disponibles et comment ils peuvent être utilisés dans vos projets.
:::
:::: 

Lorsque vous créez un nouveau web project dans Unity, vous pouvez choisir de le créer à partir d'un local template (par défaut, nous fournissons un Vite based web template). 

Vous pouvez également référencer des remote templates en entrant une repository URL dans le chemin du projet ExportInfo (cela peut être sauvegardé avec votre scène par exemple). Lors de la création d'un nouveau web project, le repository sera cloné ou téléchargé (selon si vous avez git installé) et recherché un fichier `needle.config.json`. Si aucun n'est trouvé dans le repository cloné, le répertoire racine sera utilisé. Des exemples de remote template projects peuvent être trouvés sur [github.com/needle-engine](https://github.com/needle-engine)

![Unity ExportInfo local templates](/imgs/unity-project-remote-template.jpg)

### Projets Temporaires

Si vous prévoyez d'ajouter uniquement des fichiers personnalisés via NpmDefs et de ne pas modifier la project config (par exemple, pour un test en plein écran rapide), vous pouvez préfixer le chemin du projet avec `Library`. Le projet sera généré dans la Unity Project Library et n'a pas besoin d'être ajouté au source control (le dossier Library doit être exclu du source control). Nous appelons ces projets des _projets temporaires_. Ils sont parfaits pour tester rapidement des idées !


## Typescript dans Unity

Les **NPM Definition** sont des [npm packages](https://docs.npmjs.com/about-packages-and-modules) étroitement intégrés dans l'Unity Editor, ce qui permet de partager facilement des scripts entre plusieurs web projects ou Unity projects.    

Des C# component stubs pour les TypeScript files seront également générés automatiquement pour les scripts à l'intérieur des NpmDef packages.

#### Créer et installer un NpmDef
Pour créer une **NPM Definition**, cliquez avec le bouton droit dans le Unity Project browser et sélectionnez ``Create/NPM Definition``.   
Vous pouvez **installer un package *NPM Definition*** dans votre runtime project en sélectionnant par exemple votre composant ``Needle Engine`` (anciennement ``Export Info``) et en l'ajoutant à la liste ``dependencies`` (cela ajoutera effectivement le package NpmDef à votre `package.json` de votre web project dans le tableau `dependencies` comme vous le feriez manuellement ou en exécutant `npm i <path/to/package>`).

![image](https://user-images.githubusercontent.com/5083203/170374130-d0e32516-a1d4-4903-97c2-7ec9fa0b17d4.png)

N'oubliez pas d'installer le package nouvellement ajouté en cliquant par exemple sur Install sur le composant ExportInfo et de redémarrer également le serveur s'il est déjà en cours d'exécution

Pour modifier le code à l'intérieur d'un package *NPM Definition*, double-cliquez simplement sur l'asset *NPM Definition* dans votre project browser et cela ouvrira le vscode workspace qui accompagne chaque npmdef.


# Prochaines Étapes

- [Concept : Projets Web](../project-structure.md)
- [Concept : Exportation d'Assets](../export.md)
- [Concept : Déploiement (Partager votre site web)](../deployment.md)
- [Composants : En savoir plus sur les Everywhere Actions](../everywhere-actions.md)
- [Scripting pour Débutants : Bases de Typescript](../getting-started/typescript-essentials.md)
- [Scripting pour Débutants : Comment écrire des custom components](../scripting.md)

---
Page automatiquement traduite par l'IA