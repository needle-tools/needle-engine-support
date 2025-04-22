---
title: Déploiement et Optimisation
---

## Qu'est-ce que le déploiement ?

Le déploiement est le processus qui consiste à rendre votre application disponible au public sur un site web. Needle Engine garantit que votre projet est aussi petit et rapide que possible en utilisant les dernières techniques de compression telles que **KTX2**, **Draco** et **Meshopt**.

## Cibles de déploiement disponibles

- [Needle Cloud](./cloud/#deploy-from-unity)
  Idéal pour les applications web spatiales et le partage d'assets.
- [Glitch](#deploy-to-glitch)
  Idéal pour l'expérimentation et le développement de code côté serveur.

- [Netlify](#deploy-to-netlify)
  Idéal pour héberger votre propre site web et des noms de domaine personnalisés.
- [itch.io](#deploy-to-itch.io)
  Souvent utilisé pour les jeux.
- [GitHub Pages](#deploy-to-github-pages)
  Hébergement gratuit de pages statiques.
- [Vercel](#deploy-to-vercel)
  Plateforme pour les développeurs frontend
- [FTP Upload](#deploy-to-ftp)
  Déployez directement sur n'importe quel serveur avec support FTP. Les protocoles FTP et SFTP sont pris en charge.
- [Build to folder](#build-to-folder)
  Lorsque vous compilez vers un dossier, vous pouvez télécharger les fichiers sur n'importe quel serveur web ou autre service d'hébergement.
- [Facebook Instant Games](#deploy-to-facebook-instant-games)
  Plateforme de jeux sur Facebook et Facebook Messenger.

::: tip Vous pensez qu'il manque quelque chose ?
N'hésitez pas à nous le faire savoir sur notre [forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) !
:::

## Compilations de développement (Development Builds)

Consultez les guides ci-dessus pour savoir comment accéder aux options depuis votre Éditeur (par exemple Unity ou Blender).

La principale différence avec une compilation de production est qu'elle ne réalise pas de compression [ktx2](https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html) et [draco](https://google.github.io/draco/) (pour la réduction de la taille des fichiers et la vitesse de chargement), et qu'elle offre la possibilité de charger progressivement les textures de haute qualité.

Nous recommandons généralement de réaliser des compilations de production pour une taille de fichier et une vitesse de chargement optimisées (voir plus d'informations ci-dessous).

## Compilations de production (Production Builds)

Pour réaliser une compilation de production, vous devez avoir installé [toktx](https://github.com/KhronosGroup/KTX-Software/releases), qui fournit la compression de textures en utilisant le format de supercompression KTX2. Veuillez vous rendre sur la [page des versions de toktx](https://github.com/KhronosGroup/KTX-Software/releases) et télécharger et installer la dernière version (v4.1.0 au moment de la rédaction). Vous devrez peut-être redémarrer Unity après l'installation.
*Si vous êtes certain d'avoir installé toktx et qu'il fait partie de votre PATH mais qu'il n'est toujours pas trouvé, veuillez redémarrer votre machine et réessayer la compilation.*

:::details Avancé : Extensions glTF personnalisées
Si vous prévoyez d'ajouter vos propres extensions glTF personnalisées, la compilation pour la production nécessite leur gestion dans ``gltf-transform``. Voir [@needle-tools/gltf-build-pipeline](https://www.npmjs.com/package/@needle-tools/gltf-build-pipeline) pour référence.
:::

### Options d'optimisation et de compression

### Compression de textures
Les compilations de production compresseront par défaut les textures en utilisant **KTX2** (soit ETC1S soit UASTC selon leur utilisation dans le projet)
mais vous pouvez également sélectionner la compression **WebP** et choisir un niveau de qualité.

#### Comment choisir entre la compression ETC1S, UASTC et WebP ?

| Format | ETC1S | UASTC | WebP |
| --- | --- | --- | --- |
| **Utilisation mémoire GPU** | Faible | Faible | Élevée (non compressée) |
| **Taille du fichier** | Faible | Élevée | Très faible |
| **Qualité** | Moyenne | Très élevée | Dépend du paramètre de qualité |
| **Utilisation typique** | Fonctionne pour tout, mais optimal pour les textures de couleur | Textures de données à haute résolution : normal maps, roughness, metallic, etc. | Fichiers où la qualité ETC1S est insuffisante mais UASTC est trop volumineux |

Vous avez la possibilité de sélectionner les options de compression de textures et de chargement progressif par Texture en utilisant le Needle Texture Importer dans Unity ou dans l'onglet Material dans Blender.

:::details Unity : Comment définir les paramètres de compression par texture ?
![image](/imgs/unity-texture-compression.jpg)
![image](/imgs/unity-texture-compression-options.jpg)
:::

:::details Blender : Comment définir les paramètres de compression par texture ?
Sélectionnez l'onglet material. Vous verrez les options de compression pour toutes les textures utilisées par ce material.
![Texture Compression options in Blender](/blender/texture-compression.webp)
:::

:::details Toktx introuvable
Windows : Assurez-vous d'avoir ajouté toktx à vos variables d'environnement système. Vous devrez peut-être redémarrer votre ordinateur après l'avoir ajouté pour actualiser les variables d'environnement. L'emplacement d'installation par défaut est ``C:\Program Files\KTX-Software\bin``
![image](/imgs/ktx-env-variable.webp)
:::

### Compression de maillages (Mesh compression)

Par défaut, une compilation de production compressera les maillages en utilisant la compression Draco. Utilisez le composant `MeshCompression` pour choisir entre draco et mesh-opt par glTF exporté.
De plus, vous pouvez configurer la simplification de maillage pour réduire le nombre de polygones pour les compilations de production dans les paramètres d'importation de maillage (Unity). Lorsque vous visualisez votre application dans le navigateur, vous pouvez ajouter `?wireframe` à votre URL pour prévisualiser les maillages.

#### Comment choisir entre Draco et Meshopt ?
| Format | Draco | Meshopt |
| --- | --- | --- |
| **Utilisation mémoire GPU** | Moyenne | Faible |
| **Taille du fichier** | La plus faible | Faible |
| **Compression d'animation** | Non | Oui |

:::details Comment définir les paramètres de compression draco et meshopt ?
Ajoutez le composant MeshCompression pour sélectionner quelle compression doit être appliquée par glTF exporté.

![image](/imgs/unity-mesh-compression-component.jpg)
- Pour modifier la compression de la **scène actuelle**, ajoutez-le simplement n'importe où dans votre scène racine.
- Pour modifier la compression d'un **prefab ou NestedGltf**, ajoutez-le à un `GltfObject` ou au prefab qui est référencé / exporté par l'un de vos composants.
- Pour modifier la compression d'une **scène référencée**, ajoutez-le simplement à la scène référencée qui est exportée
:::

:::details Où trouver les options de simplification de maillage pour réduire le nombre de sommets lors de la compilation pour la production ?
Sélectionnez un maillage et ouvrez les options de l'importer Needle pour voir les options disponibles pour le maillage sélectionné :
![image](/imgs/unity-mesh-simplification.jpg)
:::


### Textures progressives (Progressive Textures)

Vous pouvez également ajouter le composant `Progressive Texture Settings` n'importe où dans votre scène, pour que toutes les textures de votre projet soient chargées progressivement. Le chargement progressif n'est pas appliqué aux lightmaps ni aux textures de skybox pour le moment.

Avec le chargement progressif, les textures seront d'abord chargées en utilisant une version de résolution inférieure. Une version de qualité complète sera chargée dynamiquement lorsque la texture deviendra visible. Cela réduit généralement considérablement le chargement initial de votre scène.

:::details Comment activer le chargement progressif des textures ?
### Les textures progressives peuvent être activées par texture<br/>ou pour toutes les textures de votre projet :
![image](/imgs/unity-texture-compression.jpg)
### Activer pour toutes les textures du projet qui n'ont pas de paramètre spécifique :
![image](/imgs/unity-progressive-textures.jpg)
:::

### LODs de maillage automatiques (Level of Detail)

Depuis Needle Engine 3.36, nous générons automatiquement des maillages LOD et basculons entre eux à l'exécution. Les LODs sont chargés à la demande et uniquement lorsque nécessaire, donc cette fonctionnalité réduit à la fois votre temps de chargement et les performances.

**Avantages clés**
- Temps de chargement initial plus rapide
- Temps de rendu plus rapide grâce à moins de sommets à l'écran en moyenne
- Raycasting plus rapide grâce à l'utilisation des maillages LOD

Vous pouvez soit désactiver la génération de LOD pour l'ensemble de votre projet dans le composant `Progressive Loading Settings`, soit dans les paramètres du Mesh Importer.

![image](/imgs/unity-lods-settings-1.jpg)

![image](/imgs/unity-lods-settings-2.jpg)


## Options de déploiement

### Déployer sur Glitch 🎏

[Glitch](https://glitch.com/) offre un moyen rapide et gratuit pour chacun d'héberger de petits et grands sites web. Nous offrons un moyen facile de remixer et de déployer sur une nouvelle page Glitch (basée sur notre modèle de départ), et aussi d'exécuter un serveur réseau minimaliste sur la même page Glitch si nécessaire.

Vous pouvez déployer sur Glitch en ajoutant le composant `DeployToGlitch` à votre scène et en suivant les instructions.

Notez que les projets gratuits hébergés sur Glitch ne doivent pas dépasser environ 100 Mo. Si vous avez besoin de téléverser un projet plus volumineux, envisagez d'utiliser une autre cible de déploiement.

:::details Comment déployer sur Glitch depuis Unity ?

1) Ajoutez le composant ``DeployToGlitch`` à l'objet de jeu (GameObject) qui possède également le composant ``ExportInfo``.

2) Cliquez sur le bouton ``Create new Glitch Remix`` sur le composant
   ![image](/deployment/deploytoglitch-1.jpg)
3) Glitch va maintenant créer un remix du template. Copiez l'URL depuis votre navigateur
   ![image](https://user-images.githubusercontent.com/5083203/179834901-f28852a9-6b06-4d87-8b5b-0384768c92c1.png)
4) Ouvrez à nouveau Unity et collez l'URL dans le champ ``Project Name`` de votre composant ``Deploy To Glitch``
  ![image](https://user-images.githubusercontent.com/5083203/179835274-033e5e1d-b70d-4b13-95ad-f1e2f159b14e.png)
5) Attendez quelques secondes que Unity reçoive votre clé de déploiement depuis Glitch (cette clé est stockée en toute sécurité dans le fichier `.env` sur Glitch. Ne la partagez pas avec d'autres, toute personne disposant de cette clé pourra téléverser sur votre site Glitch)
  ![waiting for the key](/deployment/deploytoglitch-2.jpg)
6) Une fois la clé de déploiement reçue, vous pouvez cliquer sur le bouton `Build & Deploy` pour téléverser sur Glitch.

:::

:::details Comment déployer sur Glitch depuis Blender ?

![Deploy To Glitch from Blender component](/blender/deploy_to_glitch.webp)

1) Trouvez le panneau Deploy To Glitch dans l'onglet Scene
2) Cliquez sur le bouton ``Remix on glitch`` sur le composant
3) Votre navigateur ouvrira le template du projet Glitch
4) Attendez que Glitch génère un nouveau projet
5) Copiez-collez l'URL du projet dans le panneau Blender DeployToGlitch comme nom de projet (vous pouvez coller l'URL complète, le panneau extraira les informations nécessaires)
6) Sur Glitch, ouvrez le fichier ``.env`` et entrez un mot de passe dans le champ ``Variable Value`` à côté de la **DEPLOY_KEY**
7) Entrez le même mot de passe dans Blender dans le champ `Key`
8) Cliquez sur le bouton `DeployToGlitch` pour compiler et téléverser votre projet sur Glitch. Un navigateur s'ouvrira lorsque le téléversement sera terminé. Essayez d'actualiser la page si elle s'affiche en noir après l'ouverture.
:::

#### Dépannage Glitch

Si vous cliquez sur `Create new Glitch Remix` et que le navigateur affiche une erreur comme `there was an error starting the editor`, vous pouvez cliquer sur **OK**. Ensuite, allez sur [glitch.com](https://glitch.com/) et assurez-vous d'être connecté. Après cela, vous pouvez essayer de cliquer à nouveau sur le bouton dans Unity ou Blender.

### Déployer sur Netlify
:::details Comment déployer sur Netlify depuis Unity ?
Ajoutez simplement le composant `DeployToNetlify` à votre scène et suivez les instructions. Vous pouvez créer de nouveaux projets en un clic ou en déployant sur des projets existants.

![Deploy to netlify component](/deployment/deploytonetlify-2.jpg)

![Deploy to netlify component](/deployment/deploytonetlify.jpg)
:::

### Déployer sur Vercel

1) Créez un nouveau projet sur vercel
2) Ajoutez votre projet web à un dépôt github
3) Ajoutez le dépôt à votre projet sur vercel

Voir notre [projet exemple](https://github.com/needle-engine/nextjs-sample) pour la configuration du projet

### Déployer sur itch.io

:::details Comment déployer sur itch.io depuis Unity ?
1) Créez un nouveau projet sur [itch.io](https://itch.io/game/new)
2) Définissez ``Kind of project`` (Type de projet) sur ``HTML``
  ![image](https://user-images.githubusercontent.com/5083203/191211856-8a114480-bae7-4bd1-868e-2e955587acd7.png)
3) Ajoutez le composant ``DeployToItch`` à votre scène et cliquez sur le bouton ``Build``
  ![image](https://user-images.githubusercontent.com/5083203/193812540-1881837e-ed9e-49fc-9658-52e5a914299a.png)

4) Attendez que la compilation se termine, un dossier avec le zip final s'ouvrira automatiquement lorsqu'elle sera terminée.
5) Téléchargez le zip final sur itch.io
  ![20220920-104629_Create_a_new_project_-_itch io_-_Google_Chrome-needle](https://user-images.githubusercontent.com/5083203/191212661-f626f0cb-bc8e-4738-ad2c-3982aca65f39.png)
6) Sélectionnez ``This file will be played in the browser`` (Ce fichier sera joué dans le navigateur)
  ![image](https://user-images.githubusercontent.com/5083203/191212967-00b687f3-bf56-449e-880c-d8daf8a52247.png)
7) Enregistrez votre page itch et visualisez la page du projet itch.
  Elle devrait maintenant charger votre projet Needle Engine 😊

#### Paramètres optionnels
![image](https://user-images.githubusercontent.com/5083203/191217263-355d9b72-5431-4170-8eca-bfbbb39ae810.png)
:::

:::details Itch.io : impossible de trouver index.html

#### Failed to find index.html
![image](https://user-images.githubusercontent.com/5083203/191213162-2be63e46-2a65-4d41-a713-98c753ccb600.png)
Si vous voyez cette erreur après avoir téléversé votre projet, assurez-vous de ne pas téléverser un index.html compressé en gzip.
Vous pouvez désactiver la compression gzip dans ``vite.config.js`` dans le dossier de votre projet web Needle. Il suffit de supprimer la ligne ``viteCompression({ deleteOriginFile: true })``. Puis compilez à nouveau votre projet et téléchargez-le sur itch.

:::

### Déployer sur FTP

:::details Comment déployer sur mon serveur FTP depuis Unity ?
1) Ajoutez le composant ``DeployToFTP``¹ sur un objet de jeu (GameObject) dans votre scène (il est recommandé de l'ajouter au même GameObject que ExportInfo - mais ce n'est pas obligatoire)
2) Attribuez un asset de serveur FTP et remplissez les champs serveur, nom d'utilisateur et mot de passe si vous ne l'avez pas déjà fait ²
  *Cet asset contient les informations d'accès à votre serveur FTP - vous les obtenez lorsque vous créez un nouveau compte FTP chez votre fournisseur d'hébergement*
3) Cliquez sur le bouton <kbd>Build & Deploy</kbd> sur le composant ``DeployToFTP`` pour compiler votre projet et le téléverser sur votre compte FTP.


![Deploy to FTP component in Unity](/deployment/deploytoftp.jpg)
*¹ Composant Deploy to FTP*

![Deploy to FTP server asset](/deployment/deploytoftp2.jpg)
*² Asset de serveur FTP contenant les informations d'accès de votre compte utilisateur FTP*

![Deploy to FTP component in Unity with server asset assigned](/deployment/deploytoftp3.jpg)
*Composant Deploy To FTP après l'affectation de l'asset serveur. Vous pouvez déployer directement dans un sous-dossier sur votre serveur en utilisant le champ de chemin.*
:::

:::details Comment déployer manuellement sur mon serveur FTP ?

1) Ouvrez `File > Build Settings`, sélectionnez `Needle Engine`, et cliquez sur <kbd>Build</kbd>
2) Attendez que la compilation se termine - le dossier `dist` résultant s'ouvrira automatiquement après l'exécution de toutes les étapes de compilation et de compression.
3) Copiez les fichiers du dossier `dist` vers votre espace de stockage FTP.

**Voilà !** 😉

![20220830-003602_explorer-needle](https://user-images.githubusercontent.com/2693840/187311461-e6afb2d7-5761-48cf-bacb-1c1733bb768b.png)

> **Note** : Si le résultat ne fonctionne pas une fois téléversé, il se peut que votre serveur web ne prenne pas en charge la diffusion de fichiers compressés en gzip. Vous avez deux options pour résoudre le problème :
Option 1 : Vous pouvez essayer d'activer la compression gzip sur votre serveur en utilisant un fichier .htaccess !
Option 2 : Vous pouvez désactiver la compression gzip dans les paramètres de compilation dans File/Build Window en sélectionnant la plateforme Needle Engine.

> **Note** : Si vous rencontrez des erreurs pendant la compression, veuillez nous en informer et signaler un bug ! Si votre projet fonctionne localement et échoue uniquement lors des compilations de production, vous pouvez vous débloquer immédiatement en effectuant une compilation de développement (Development Build). Pour cela, activez simplement l'option `Development Build` dans les Build Settings.

![Unity build window showing Needle Engine platform](/deployment/buildoptions_gzip.jpg)

:::

#### Activation de gzip à l'aide d'un fichier .htaccess
Pour activer la compression gzip sur votre serveur FTP, vous pouvez créer un fichier nommé `.htaccess` dans le répertoire vers lequel vous souhaitez télécharger (ou un répertoire parent).
Insérez le code suivant dans votre fichier `.htaccess` et enregistrez/téléchargez-le sur votre serveur :
```
<IfModule mod_mime.c>
RemoveType .gz
AddEncoding gzip .gz
AddType application/javascript .js.gz
```

### Déployer sur Github Pages
:::details Comment déployer sur Github Pages depuis Unity ?

Ajoutez le composant DeployToGithubPages à votre scène et copiez-collez le dépôt github (ou l'url github pages) vers lequel vous souhaitez déployer.
![Deploy To github pages component](/deployment/deploytogithubpages.jpg)

<video-embed src="https://www.youtube.com/watch?v=Vyk3cWB6u-c" />

:::

#### Dépannage github pages
- **J'ai déployé sur github pages mais aucune action ne s'exécute / le site web n'est pas en ligne**
   - Si vous avez déployé pour la première fois, cela peut prendre quelques minutes avant que votre site web ne soit disponible. Vous pouvez vérifier l'onglet **Actions** sur github (`/actions`) pour voir le processus de déploiement.
   - Si votre site web n'est pas en ligne après quelques minutes ou si vous ne voyez aucune exécution de workflow dans l'onglet **Actions** sur github, alors allez sur la page des paramètres **Github Pages** (`/settings/pages`) et assurez-vous que la **Branch** est définie sur *gh-pages*.

### Déployer sur Facebook Instant Games

Avec Needle Engine, vous pouvez compiler automatiquement pour Facebook Instant Games
Aucun ajustement manuel de votre application ou jeu web n'est requis.

:::details Comment déployer sur Facebook Instant Games depuis Unity ?
- Ajoutez le composant `Deploy To Facebook Instant Games` à votre scène :
  ![Deploy to facebook instant games component](/deployment/deploytofacebookinstantgames.jpg)
- Cliquez sur le bouton `Build For Instant Games`
- Une fois la compilation terminée, vous obtiendrez un fichier ZIP que vous pourrez télécharger sur votre application Facebook.
- Sur Facebook, ajoutez le module `Instant Games` et allez dans `Instant Games/Web hosting`
  ![Hosting a facebook instant games](/deployment/deploytofacebookinstantgames-hosting.jpg)
- Vous pouvez télécharger votre zip en utilisant le bouton `Upload version` (1). Une fois le téléchargement terminé et le zip traité, cliquez sur le bouton `Stage for testing` pour tester votre application (2, ici le bouton bleu) ou `Push to production` (le bouton avec l'icône étoile)
  ![Upload the zip to facebook instant games](/deployment/deploytofacebookinstantgames-upload.jpg)
- C'est tout - vous pouvez ensuite cliquer sur le bouton `Play` à côté de chaque version pour tester votre jeu sur Facebook.

:::

:::details Comment créer une application sur Facebook (avec les capacités Instant Games)

1) [Créez une nouvelle application](https://developers.facebook.com/apps/creation/) et sélectionnez `Other`. Puis cliquez sur `Next`.
  ![Create facebook instant games app](/deployment/facebookinstantgames-1.jpg)

2) Sélectionnez le type `Instant Games`
  ![Create facebook instant games app](/deployment/facebookinstantgames-2.jpg)

3) Après avoir créé l'application, ajoutez le produit `Instant Games`.
  ![Add instant games product](/deployment/facebookinstantgames-3.jpg)

Vous trouverez ici [la documentation officielle d'Instant Games](https://developers.facebook.com/docs/games/build/instant-games) sur Facebook.
**Notez** que tout ce que vous avez à faire est de créer une application avec les capacités Instant Games.
Nous nous occuperons de tout le reste et aucun ajustement manuel de votre site web Needle Engine n'est requis.
:::

## Compiler vers un dossier (Build To Folder)

Dans Unity, ouvrez ``File/Build Settings`` et sélectionnez ``Needle Engine`` pour les options :

![image](/imgs/unity-build-window-menu.jpg)

![image](/imgs/unity-build-window.jpg)

Pour compiler votre projet web en vue de le télécharger sur n'importe quel serveur web, vous pouvez cliquer sur **Build** dans la fenêtre Build Settings de l'éditeur Unity. Vous pouvez cocher la case ``Development Build`` pour omettre la compression (voir ci-dessous), ce qui nécessite que toktx soit installé sur votre machine.

Pour prévisualiser localement votre compilation finale, vous pouvez utiliser le bouton `Preview Build` en bas de la fenêtre. Ce bouton effectuera d'abord une compilation normale, puis démarrera un serveur local dans le répertoire contenant les fichiers finaux afin que vous puissiez voir ce que vous obtenez une fois ces fichiers téléchargés sur votre serveur web.

Nodejs est **uniquement** requis pendant le développement. Le site web distribué (utilisant notre template vite par défaut) est une page statique qui ne dépend pas de Nodejs et peut être placée sur n'importe quel serveur web standard. Nodejs est requis si vous souhaitez exécuter notre serveur réseau minimaliste sur le même serveur web (automatiquement inclus dans le processus de déploiement Glitch).

---

## Flux de travail de déploiement multiplateforme

Il est possible de créer des projets Unity réguliers où vous pouvez compiler à la fois pour Needle Engine et pour les plateformes Unity régulières telles que Desktop ou même WebGL. Notre approche de "mappage de composants" signifie qu'aucune logique d'exécution n'est modifiée à l'intérieur d'Unity - si vous le souhaitez, vous pouvez utiliser le mode Play (Play Mode) et compiler régulièrement pour d'autres plateformes cibles. Dans certains cas, cela signifiera que vous avez du code dupliqué (code C# et logique TypeScript correspondante). La quantité de travail supplémentaire qui en résulte dépend de votre projet.

**Entrer en mode Play (Play Mode) dans Unity**
Dans `Project Settings > Needle Engine`, vous pouvez désactiver `Override Play Mode` et `Override Build settings` pour basculer entre le processus de compilation de Needle et le processus de compilation d'Unity :
![image](https://user-images.githubusercontent.com/2693840/187308490-5acb9016-ffff-4113-be62-4de450a42b08.png)

## Arguments de ligne de commande Needle Engine pour Unity

Needle Engine pour Unity prend en charge divers arguments de ligne de commande pour exporter des assets uniques (Prefabs ou Scenes) ou pour compiler un projet web entier en mode batch (sans fenêtre).

La liste suivante présente un tableau des options disponibles :

| | |
| -- | -- |
| `-scene` | chemin vers une scène ou un asset à exporter, par exemple `Assets/path/to/myObject.prefab` ou `Assets/path/to/myScene.unity` |
| `-outputPath <path/to/output.glb>` | définit le chemin de sortie pour la compilation (valide uniquement lors de la compilation d'une scène) |
| `-buildProduction` | exécute une compilation de production |
| `-buildDevelopment` | exécute une compilation de développement |
| `-debug` | ouvre une fenêtre de console pour le débogage |

***
Page automatiquement traduite à l'aide de l'IA