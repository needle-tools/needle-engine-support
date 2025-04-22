---
title: Questions et Réponses (FAQ) 💡
---


## Comment puis-je activer ma licence Needle Engine ?

### Activation de la licence dans Unity

#### Needle Engine 4.x

Allez dans Project Settings/Needle et cliquez sur le bouton de connexion. Suivez les étapes et connectez-vous à votre compte Needle.
Après cela, vous verrez les informations de votre compte dans la fenêtre des paramètres du projet Unity. Sélectionnez l'équipe sous licence dans le menu déroulant.

#### Needle Engine 3.x

Ouvrez `Edit/Project Settings/Needle` pour accéder aux paramètres du plugin Needle Engine. En haut de la fenêtre, vous trouverez des champs pour saisir les informations de votre licence.
- `Email` - Saisissez l'adresse e-mail avec laquelle vous avez acheté la licence
- `Invoice ID` - Saisissez l'un des identifiants de facture que vous avez reçus par e-mail

Note : Vous pourriez avoir besoin de redémarrer le serveur web local pour appliquer la licence.

![unity license window](/imgs/unity-needle-engine-license.jpg)

### Activation de la licence dans Blender
Ouvrez `Addon Preferences/Needle Engine` pour accéder aux paramètres de l'addon Needle Engine
- `Email` - Saisissez l'adresse e-mail avec laquelle vous avez acheté la licence
- `Invoice ID` - Saisissez l'un des identifiants de facture que vous avez reçus par e-mail

Note : Vous pourriez avoir besoin de redémarrer le serveur web local pour appliquer la licence.



## Mon site web local affiche une erreur SSL, par exemple 'Votre connexion n'est pas privée'

Vous pourriez voir un avertissement dans votre navigateur concernant la sécurité SSL en fonction de votre configuration locale.

Cela est dû au fait que bien que la connexion soit chiffrée, par défaut, il n'y a pas de certificat SSL que le navigateur puisse valider.
Si cela se produit : cliquez sur `Avancé` puis sur `Continuer vers le site`. Dans Safari, vous pourriez avoir besoin d'actualiser la page après, car il ne continue pas automatiquement. Maintenant, vous devriez voir votre scène dans le navigateur !

Le dialogue ne devrait s'afficher qu'une seule fois pour le même serveur local.

::: tip
Les connexions sont sécurisées, car nous appliquons le HTTPS pour nous assurer que WebXR et d'autres API web modernes fonctionnent directement. Certains navigateurs se plaindront toujours que la connexion SSL (entre votre serveur de développement local et le site web local) ne peut pas être automatiquement approuvée, et que vous devez vérifier manuellement que vous faites confiance à cette page. Le rechargement automatique des pages et les connexions Websocket peuvent également être affectés selon le navigateur et les paramètres système.

Consultez [les documents de test](./testing.md) pour obtenir des informations sur la configuration d'un certificat auto-signé pour une expérience de développement plus fluide.
:::

![SLL warning on chrome](/videos/ssl-warning.gif)



## Mon site web local reste noir

Si cela se produit, il y a généralement une exception soit dans le code du moteur, soit dans votre code. Ouvrez les outils de développement (<kbd>Ctrl + Shift + I</kbd> ou <kbd>F12</kbd> dans Chrome) et vérifiez la Console pour les erreurs.
Dans certains cas, surtout lorsque vous venez de mettre à jour la version du package Needle Engine, cela peut être résolu en arrêtant et en redémarrant le serveur de développement local.
Pour cela, cliquez sur la barre de progression en cours d'exécution dans le coin inférieur droit de l'éditeur, et cliquez sur le petit <kbd>X</kbd> pour annuler la tâche en cours. Ensuite, appuyez simplement à nouveau sur Play.


## Mes objets sont blancs après l'export
Cela se produit généralement lorsque vous utilisez des shaders ou des matériaux personnalisés et que leurs propriétés ne se traduisent pas correctement en noms de propriétés connus pour l'exportation glTF.
Vous pouvez soit vous assurer que vous utilisez des matériaux et des shaders compatibles glTF, soit marquer les shaders comme "custom" pour les exporter directement.
- En savoir plus sur les flux de travail glTF recommandés : <link>
- En savoir plus sur les shaders personnalisés : <link>


## Uncaught ReferenceError: NEEDLE_ENGINE_META is not defined / NEEDLE_USE_RAPIER is not defined

Si vous utilisez vite ou next.js, assurez-vous d'ajouter les plugins Needle Engine à votre configuration.
Exemple pour vite :
```js
const { needlePlugins } = await import('@needle-tools/engine/plugins/vite/index.js');
plugins: [needlePlugins(command, needleConfig)]
```
Exemple pour next.js :
```js
const { needleNext } = await import("@needle-tools/engine/plugins/next/index.js");
return needleNext({}, { modules: { webpack } });
```
Vous pouvez également simplement déclarer les variables manquantes dans, par exemple, votre `index.html` racine dans une balise script comme suit :
```html
<script>
  var NEEDLE_ENGINE_META = {}
  var NEEDLE_USE_RAPIER = true;
</script>
```

## THREE.EXRLoader: provided file doesnt appear to be in OpenEXR format

Veuillez vous assurer que vous avez défini Lightmap Encoding sur **Normal Quality**.
Allez dans *Edit/Project Settings/Player* pour modifier le paramètre.

![](/faq/lightmap_encoding.jpg)

## Mon site web devient trop volumineux / est lent à charger (trop de Mo)

Cela peut avoir de nombreuses raisons, mais quelques-unes courantes sont :
- trop de textures ou les textures sont trop grandes
- les maillages ont trop de sommets
- les maillages ont des attributs de sommet dont vous n'avez pas réellement besoin (par exemple, ils ont des normales et des tangentes, mais vous ne les utilisez pas)
- les objets sont désactivés et non ignorés – les objets désactivés sont également exportés au cas où vous voudriez les activer au moment de l'exécution ! Définissez leur Tag sur `EditorOnly` pour les ignorer complètement à l'exportation.
- vous avez plusieurs composants ``GltfObject`` dans votre scène et ils ont tous ``EmbedSkybox`` activé (vous n'avez besoin d'avoir le skybox qu'une seule fois par scène que vous exportez)

Si le temps de chargement lui-même est un problème, vous pouvez **essayer de diviser votre contenu en plusieurs fichiers glb** et les charger à la demande (c'est ce que nous faisons sur notre site web). Pour que cela fonctionne, vous pouvez placer votre contenu dans des Prefabs ou des Scenes et y faire référence depuis n'importe lequel de vos scripts. Veuillez consulter [Scripting/Addressables dans la documentation](./scripting.md#assetreference-and-addressables).

## Mon interface utilisateur n'affiche pas de texte

- Pour Unity : Assurez-vous d'utiliser le composant `UI/Legacy/Text` et **non** le composant `TextMeshPro - Text`.

## Mes scripts ne fonctionnent pas après l'export
- Votre code C# existant ne sera *pas* exporté tel quel, vous devez écrire le typescript / javascript correspondant.
- Needle utilise typescript / javascript pour les composants et génère des stubs C# pour eux.
- Les composants qui ont déjà le JS correspondant l'afficheront dans l'Inspector.

## Mes lightmaps semblent différentes / trop lumineuses

Assurez-vous de suivre les [bonnes pratiques pour les lightmaps](https://docs.needle.tools/lightmaps?utm_source=needle_docs) et lisez sur [le mélange d'objets cuits et non cuits](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects).

## Ma scène est trop lumineuse / l'éclairage semble différent de celui dans Unity
Assurez-vous que vos lumières sont définies sur "Baked" ou "Realtime". "Mixed" n'est actuellement pas pris en charge.
- Les lumières définies sur mixed (avec lightmapping) affectent les objets deux fois dans three.js, car il n'y a actuellement aucun moyen d'exclure les objets lightmapped de l'éclairage.
- Le facteur ``Intensity Multiplier`` pour Skybox dans ``Lighting/Environment`` n'est actuellement pas pris en charge et n'a aucun effet dans Needle Engine.
![image](https://user-images.githubusercontent.com/5083203/185429006-2a5cd6a1-8ea2-4a8e-87f8-33e3afd080ec.png)
- L'intensité de l'ombre lumineuse ne peut actuellement pas être modifiée en raison d'une limitation de three.js.

Voir également la documentation sur [le mélange d'objets cuits et non cuits](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects).


## La résolution de ma skybox est faible ? Comment modifier la résolution de ma skybox ?

- **Si vous utilisez une cubemap personnalisée** : Vous pouvez modifier les paramètres d'importation de la texture de la skybox (attribuée à votre cubemap).

![image](https://user-images.githubusercontent.com/5083203/188179104-1e078cda-3397-4ebe-aaf9-7faa23ee4904.png)


- **Si vous utilisez la skybox par défaut** : Ajoutez un composant ``SkyboxExportSettings`` n'importe où dans votre scène pour modifier la résolution par défaut.

![image](https://user-images.githubusercontent.com/5083203/188171443-578380ab-2036-4d70-a8a7-f8cd9da9f603.png)



## Mes ombres ne sont pas visibles ou sont coupées

Veuillez vérifier les points suivants :
- Votre lumière a les ombres activées (Soft Shadow ou Hard Shadow)
- Vos objets sont définis sur "Cast Shadows: On" (voir le composant MeshRenderer)
- Pour les directional lights, la position de la lumière est actuellement importante car la shadow camera sera placée là où la lumière est située dans la scène.



## Mes couleurs semblent fausses

Assurez-vous que votre projet est défini sur l'espace colorimétrique Linear.

![image](https://user-images.githubusercontent.com/5083203/191774978-66e9feb1-0551-4549-85d3-3e5b8021f162.png)



## J'utilise le networking et Glitch et cela ne fonctionne pas si plus de 30 personnes visitent la page Glitch en même temps

- Le déploiement sur Glitch est un moyen rapide de prototyper et peut même fonctionner pour certaines petites productions. Le petit serveur n'a pas la puissance et la bande passante nécessaires pour héberger de nombreuses personnes dans une session persistante.
- Nous travaillons sur d'autres idées de networking, mais en attendant, vous pouvez héberger le site web ailleurs (avec prise en charge de node.js) ou simplement le remixer pour répartir la charge entre plusieurs serveurs. Vous pouvez également héberger le [package backend de networking](https://www.npmjs.com/package/@needle-tools/needle-tiny-networking-ws) lui-même ailleurs où il peut évoluer, par exemple Google Cloud.



## Mon site web n'a pas de boutons AR/VR

- Assurez-vous d'ajouter le composant `WebXR` quelque part à l'intérieur de votre ``GltfObject`` racine.
- Ajoutez éventuellement un composant ``AR Session Root`` sur votre ``GltfObject`` racine ou dans la hiérarchie enfant pour spécifier le placement, l'échelle et l'orientation pour WebXR.
- Ajoutez éventuellement un composant ``XR Rig`` pour contrôler où les utilisateurs commencent en VR.


## J'ai créé un nouveau script dans une sous-scène mais il ne fonctionne pas
Lorsque vous créez de nouveaux scripts dans des npmdefs dans des sous-scènes (c'est-à-dire une scène qui est exportée comme référence à partir d'un script dans votre scène d'exportation racine), vous devez actuellement réexporter la scène racine. Cela est dû au fait que la génération de code responsable de l'enregistrement des nouveaux scripts ne s'exécute actuellement que pour les scènes ayant un composant ``ExportInfo``. Cela sera corrigé à l'avenir.


## Mon serveur local ne démarre pas / Je ne vois pas de site web

La raison la plus probable est une installation incorrecte.
Vérifiez la console et le composant ``ExportInfo`` pour les erreurs ou avertissements.

Si ces avertissements/erreurs n'ont pas aidé, essayez les étapes suivantes dans l'ordre. Accordez-leur un peu de temps pour se terminer. Arrêtez-vous une fois que votre problème est résolu. Vérifiez la console pour les avertissements et erreurs.
- Assurez-vous de suivre les [Prérequis](./getting-started/#prerequisites).
- Installez votre projet en sélectionnant votre composant ``ExportInfo`` et en cliquant sur ``Install``.
- Exécutez une installation propre en sélectionnant votre composant ``ExportInfo``, en maintenant Alt et en cliquant sur ``Clean Install``.
- Essayez d'ouvrir le répertoire de votre projet web dans un outil de ligne de commande et suivez ces étapes :
  - exécutez ``npm install`` puis ``npm run dev-host``.
  - Assurez-vous que le package runtime local (``node_modules/@needle-tools/engine``) ainsi que three.js (``node_modules/three``) ont été installés.
  - Vous pouvez également exécuter ``npm install`` dans ces deux répertoires.


## La génération de composants C# fonctionne-t-elle aussi uniquement avec javascript ?
Bien que la génération de composants C# fonctionne techniquement aussi avec du javascript vanilla, nous ne la recommandons pas et ne la prenons pas entièrement en charge, car il est plus difficile, voire impossible, pour le générateur de savoir quel type C# créer pour votre classe javascript. Ci-dessous, vous trouverez un exemple minimal sur la façon de générer un composant Unity à partir de javascript si vous le souhaitez vraiment.

```js
import { Behaviour } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    //@type float
    myField = 5;
}
```


## Je n'ai pas de boutons comme "Generate Project" dans mes composants/inspector

Veuillez vérifier que vous n'êtes pas accidentellement dans le mode `Debug` de l'Inspector – revenez à `Normal` :
![20220824-025011-S2GQ-Unity_lKlT-needle](https://user-images.githubusercontent.com/2693840/186291615-56e7ebdb-1221-4326-813d-f88526fa126c.png)


## Toktx est introuvable / toktx n'est pas installé

- Assurez-vous de [télécharger et installer toktx](http://localhost:8080/docs/getting-started/.html#install-these-tools-for-production-builds).

- Sous Windows : Assurez-vous d'avoir ajouté toktx à vos variables d'environnement système. Vous pourriez avoir besoin de redémarrer votre ordinateur après l'avoir ajouté pour actualiser les variables d'environnement. L'emplacement d'installation par défaut est ``C:\Program Files\KTX-Software\bin``.

![image](/imgs/ktx-env-variable.webp)


## L'installation du projet web prend une éternité / ne se termine jamais / EONET: no such file or directory

- **Assurez-vous de ne pas créer un projet sur un disque formaté en exFAT**, car exFAT ne prend pas en charge les symlinks, ce qui est requis pour Needle Engine pour Unity avant la version 3.x.
Vous pouvez vérifier le formatage de vos disques en suivant ces étapes :
1. Ouvrez "Informations système" (soit la touche Windows et tapez cela, soit entrez "msinfo32" dans cmd).
2. Sélectionnez Composants > Stockage > Disques.
3. Sélectionnez tout (Ctrl + A) sur le côté droit de l'écran et copiez cela (<kbd>Ctrl + C</kbd>) et collez ici (<kbd>Ctrl + V</kbd>).

## NPM install échoue et il y a des erreurs concernant le disque dur / IO

Assurez-vous que votre projet se trouve sur un disque dont on sait qu'il fonctionne avec node.js. La principale raison des échecs est que le disque ne prend pas en charge les symlinks (liens symboliques / softlinks), ce qui est une exigence pour le bon fonctionnement de node.js.
Le formatage <kbd>NTFS</kbd> devrait toujours fonctionner. Les formatages de système de fichiers connus pour être problématiques sont <kbd>exFAT</kbd> et <kbd>FAT32</kbd>.

Pour vérifier le format de vos disques, vous pouvez :
1. Ouvrez "Informations système" (soit la <kbd>touche Windows</kbd> et tapez "Informations système", soit entrez `msinfo32` dans cmd <kbd>Windows + R</kbd>).
2. Sélectionnez "Composants > Stockage > Disques".
3. Là, vous pouvez voir tous les disques et leur formatage listés. Placez vos projets sur un disque formaté en NTFS.


## J'obtiens des erreurs avec "Unexpected token `@`. Expected identifier, string literal, numeric literal or ..."

Needle Engine utilise des typescript decorators pour la sérialisation.
Pour corriger cette erreur, assurez-vous d'activer `experimentalDecorators` dans votre tsconfig.json.

## J'obtiens une erreur 'failed to load config ... vite.config.js' lorsque j'exécute des commandes npm sur Mac OS

Vous utilisez probablement une version x86_64 d'Unity sur un processeur (ARM) Apple Silicon. Unity 2020.3 n'est disponible que pour x86_64, les versions ultérieures ont également des versions Apple Silicon.
Notre intégration Unity appelant npm le fera donc à partir d'un processus x86_64, ce qui entraînera l'utilisation de la version x86_64 de node et vite/esbuild étant utilisés. Lorsque vous essayerez ensuite d'exécuter des commandes npm dans le même projet à partir d'une application Apple Silicon (par exemple VS Code), npm se plaindra d'architectures incompatibles avec un long message d'erreur.

Pour résoudre ce problème, utilisez une version Apple Silicon d'Unity (2021.1 ou ultérieure).

Vous pouvez également le résoudre temporairement sur 2020.3 en supprimant le dossier `node_modules` et en exécutant à nouveau `npm install` depuis VS Code. Vous devrez à nouveau supprimer `node_modules` lorsque vous reviendrez à Unity.

## Erreur de référence circulaire

Cela peut se produire lorsque vous avez par exemple un ``SceneSwitcher`` (ou tout autre composant qui charge une scène ou un asset) et que l'Asset référencé dans Unity contient un ``GltfObject`` qui a le même nom que votre scène d'origine avec le ``SceneSwitcher``. Vous pouvez vérifier cela dans Unity si vous obtenez une erreur indiquant quelque chose comme :

```
Failed to export ↑ YourSceneName.glb
you seem to have objects with the same name referencing each other.
```

Pour résoudre ce problème, vous pouvez :
- Supprimer le ``GltfObject`` dans le Prefab ou la Scène référencé(e).
- Renommer le GameObject avec le composant qui charge les scènes référencées.

Si cela ne résout pas le problème, veuillez poser votre question [sur notre forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content).

## Ma scène ne se charge pas et la console contient un avertissement avec 'circular references' ou 'failed to update active state'
Veuillez consulter la section [Erreur de référence circulaire](#circular-reference-error).

## Ma machine prend-elle en charge WebGL 2 ?

Utilisez un détecteur [comme celui-ci](https://get.webgl.org/webgl2/) pour déterminer si votre appareil prend en charge WebGL 2. Il donne également des indices sur la cause potentielle de votre problème, mais assurez-vous généralement que vous avez mis à jour votre navigateur et vos pilotes. WebGL 1 n'est pas pris en charge.

#### Appareils connus pour causer des problèmes :
- Lenovo Thinkpad - T495

## Je veux utiliser Needle AI avec mon modèle AI local

Si vous voulez (ou devez) exécuter votre AI localement, vous pouvez utiliser les fichiers llms.txt de Needle comme contexte pour votre AI local (par exemple Ollama) :

- [llms.txt](https://cloud.needle.tools/llms.txt)
- [llms-full.txt](https://cloud.needle.tools/llms-full.txt)


## Vous avez encore des questions ?
[Posez-les sur notre forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)

<a href="https://discord.needle.tools" target="_blank"><img height=20 src="https://img.shields.io/discord/717429793926283276?color=5562ea&label=Discord" /></a>


```
```
Page automatiquement traduite par IA.