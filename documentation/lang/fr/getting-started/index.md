---
lang: fr-FR
title: Premiers pas et installation
next: ../project-structure.md
---

<br/>

<discountbanner />


# Téléchargements

Avec **Needle Engine**, vous pouvez créer des sites web 3D entièrement interactifs en utilisant votre framework préféré.

Les projets créés avec Needle Engine peuvent être déployés partout sur le web et sont optimisés automatiquement par notre pipeline d'optimisation à la pointe de la technologie avec support automatique des LOD – réduisant la taille des assets jusqu'à x100 sans compromettre la qualité.

Needle Engine est disponible en tant que **package pour Unity, add-on pour Blender, un Web Component prêt à l'emploi**, ou comme package npm pour les projets sans intégration d'éditeur.
Chacun d'eux est livré avec les mêmes composants que nos blocs de construction pour créer plus – le choix vous appartient.

## Choisissez votre flux de travail

<tool-tiles></tool-tiles>

<!-- | Tool |  |  |
| -- | -- | -- |
| Node.js **(required)** | 16.x or 18.x <br>[Windows](https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi) <br/> [MacOS](https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg)   | For running a local development server
| VS Code *(recommended)* | any version<br/>[Windows](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user) <br/> [MacOS](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal) | For code editing (optional)  |
| **Supported Editors** | |
| Unity | 2020.3.16+ <br/>2021.3.9+ <br/>2022.3.0+<br/>[Get Unity Hub](https://unity.com/download) | For setting up your scenes, components, animations... |
| Blender | 3.3<br/>3.4<br/>3.5<br/>3.6<br/>[Get Blender](https://www.blender.org/download/) | For setting up your scenes, components, animations... |
   -->


<!-- ### For optimized builds

| Tool | | |
| -- | -- | -- |
| | | |
| **toktx** | 4.1<br/>[Windows](https://fwd.needle.tools/needle-engine/toktx/win) <br/> [MacOS](https://fwd.needle.tools/needle-engine/toktx/osx) <br/> [Mac OS Apple Silicon](https://fwd.needle.tools/needle-engine/toktx/osx-silicon) <br/> [Other Releases](https://github.com/KhronosGroup/KTX-Software/releases/tag/v4.1.0-rc3)  | For texture compression (recommended) <br/>You can read more about that [here](./deployment.md#production-builds) in our docs -->



<br/>
<br/>



<!--
<img src="/imgs/unity-logo.webp" style="max-height:70px;" />


## Needle Engine for Unity

*Supported Unity versions: 2021.3 LTS, 2022.3 LTS*

<needle-button event_goal="download_unity" event_position="getting_started" large href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"><strong>Download Needle Engine for Unity</strong></needle-button>

- Drop the downloaded .unitypackage file into a Unity project and confirm that you want to import it.
- Wait a moment for the installation and import to finish. A window may open stating that "A new scoped registry is now available in the Package Manager.". This is our Needle Package registry. You can safely close that window.
- **Explore Samples** – Select the menu option _Needle Engine > Explore Samples_ to view, open and modify all available [sample scenes](https://engine.needle.tools/samples).


**See [Needle Engine for Unity](../unity/index.md)** for a full list of features and instructions on getting started.


---


<img src="/blender/logo.png" style="max-height:70px;" />

## Needle Engine for Blender
*Supported Blender versions: 4.1+*

<needle-button event_goal="download_blender" event_position="getting_started" large href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"><strong>Download Needle Engine for Blender</strong></needle-button>

<br/>

- The Blender add-on is downloaded as a zip file.
- In Blender, go to `File > Settings > Add-ons` and click the `Install` button.
- Then select the downloaded zip to install it.

**See [Needle Engine for Blender](../blender/index.md)** for a full list of features and instructions on getting started.

<br/>
<br/>
<br/>



<br/>
<br/>
<br/>

-->

## Éditeur de code et outils

### Installer un éditeur de code

Needle Engine facilite la création d'applications web. Cela implique souvent, mais pas toujours, de coder en JavaScript/TypeScript ou d'écrire du HTML et du CSS pour décrire les interfaces utilisateur. Nous recommandons [Visual Studio Code](https://code.visualstudio.com) pour créer et éditer ces fichiers. C'est un éditeur de code gratuit et open-source qui fonctionne sous Windows, macOS et Linux.

<ClientOnly>
<!-- <br/><os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Unity</os-link> — <os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Blender</os-link> -->

<os-link windows_url="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" osx_url="https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal">Télécharger Visual Studio Code</os-link>


<br/>
<br/>

### Autres outils utiles

::: tip
Needle Engine utilise les outils suivants pour créer votre application web, mais vous n'avez pas besoin de les installer manuellement si vous utilisez l'intégration Unity ou Blender. Nous vous guiderons à travers le processus d'installation après que vous ayez installé l'intégration Needle.
:::

<br/>
<os-link windows_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi" osx_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1.pkg">Node.js 20 LTS ou 22 LTS.</os-link>
Needle Engine utilise Node.js pour gérer, prévisualiser et construire l'application web que vous créez localement sur votre ordinateur.
Il est également utilisé pour télécharger (déployer) votre site web sur internet.

<br/><os-link windows_url="https://fwd.needle.tools/needle-engine/toktx/win" osx_url="https://fwd.needle.tools/needle-engine/toktx/osx" osx_silicon_url="https://fwd.needle.tools/needle-engine/toktx/osx-silicon">KTX Software – toktx texture tools.</os-link> Nous utilisons toktx par le Khronos Group pour optimiser et compresser localement vos fichiers 3D. Apprenez-en plus sur les builds de production [dans les docs](../deployment.md#production-builds).

<br/>
</ClientOnly>

<!--
## Option 1: Quick Start — Starter Project ⚡
1. **Download or Clone this repository**
   It's set up with the right packages and settings to get you started right away.

   _Clone with HTTPS:_ ``https://github.com/needle-tools/needle-engine-support.git``
   _OR clone with SSH:_ ``git@github.com:needle-tools/needle-engine-support.git``
   _OR download directly:_ <a href="https://github.com/needle-tools/needle-engine-support/archive/refs/heads/main.zip" target="_blank">Download Repository</a>


2. **Open the starter project**
  Open `starter/Needle Engine Starter 2020_3` for a full sandbox project that's ready to run (including a couple of simple example scenes for lightmaps and custom shaders).
  This is a sandbox builder project! It already comes with multi-player capabilities, and works across mobile, desktop, VR and AR.

3. **Press Play**
  Make sure the scene CollaborativeSandbox is open, and press Play! This will automatically do some setup steps and start a local server.
  Once the setup is complete, a browser window will open, and your project is live.
  From now on, all changes you do in Unity will be immediately visible in your browser.

    > **Note**: Your browser might warn you about an untrusted SSL connection. Don't worry, the connection is still encrypted – please click "Advance" if your browser asks you to verify that you're sure you want to visit your server.

4. **Make it your own**
  Add assets and components, play around with lighting, add scripts and logic – this is your world now!
  You can also [publish it on the web for free](#deploy-your-project-to-glitch-) so that others can join you.
-->



## Prochaines étapes

Maintenant que vous avez installé Needle Engine, vous êtes prêt à plonger plus profondément dans la création de projets, les flux de travail de composants, le scripting, le déploiement et plus encore.

- [Premiers pas : Unity](../unity/index.md)
- [Premiers pas : Blender](../blender/index.md)
- [Concept : Exporter des objets et du contenu 3D](../export.md)
- [Concept : Structure du projet](../project-structure.md)
- [Concept : Déployer votre site web sur le web](../deployment.md)
- [Guide du débutant : Essentiels de Typescript](./typescript-essentials.md)
- [Guide du débutant : Needle Engine pour les développeurs Unity](./for-unity-developers.md)
- [Guide du débutant : Référence de scripting](../scripting.md)
- [Exemples en direct : Exemples Needle Engine](https://engine.needle.tools/samples)

En cas de problème, veuillez consulter la section [Questions et réponses – FAQ](../faq.md).
Nous vous invitons à rejoindre notre [Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) et notre [Communauté Discord](https://discord.needle.tools).


Page automatiquement traduite à l'aide de l'IA