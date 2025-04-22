# Needle Engine sur votre site Web

Needle Engine peut être utilisé pour créer de nouvelles applications Web, et peut également être intégré à des sites Web existants. Dans les deux cas, vous voudrez _téléverser_ le dossier de distribution de votre projet sur un hébergeur Web pour les rendre accessibles au monde entier.

Il existe plusieurs façons d'intégrer Needle Engine à votre site Web. La meilleure dépend de nombreux facteurs, tels que la complexité de votre projet, si vous utilisez des scripts personnalisés ou uniquement des composants principaux, le degré de contrôle que vous avez sur le site Web cible, le "niveau de confiance" entre vous et le site Web cible, etc.

## Essayez

Si vous souhaitez rapidement essayer l'apparence des projets réalisés avec Needle sur votre site Web, ajoutez simplement ces deux lignes n'importe où sur votre page pour tester :

:::: code-group
::: code-group-item Option 1: Embedding Needle
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb"></needle-engine>
```
:::
::: code-group-item Option 2: Using an iframe
```html
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px">
</iframe>
```
:::
::: code-group-item Resulting Website
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px" style="border:0; outline: 0;">
</iframe>
::::

# Façons de créer des applications Web avec Needle

Les workflows les plus courants pour amener Needle Engine sur votre site Web sont :
1. [Utilisation des composants "Deploy to ..."](#using-the-deploy-to-...-components)
2. [Téléversement de votre application Web dans un dossier](#uploading-your-web-app-to-a-folder)
3. [Intégration d'un projet Needle dans un site Web existant](#embedding-a-needle-project-into-an-existing-website)

## Utilisation des composants "Deploy to ..."

Nos intégrations Needle Engine sont livrées avec des options de déploiement intégrées. Vous pouvez déployer votre projet vers Needle Cloud, des serveurs FTP, Glitch, Itch.io, GitHub Pages, et plus encore en quelques clics.

Consultez la section [Déploiement](./deployment.md) pour plus d'informations sur chacune de ces options.

1. Ajoutez le composant "Deploy to ..." que vous souhaitez utiliser à votre scène dans Unity ou Blender.
2. Configurez les options nécessaires et cliquez sur "Deploy".
3. Et voilà ! Votre projet est maintenant en ligne.

:::tip Workflow recommandé
C'est l'option la plus simple et recommandée pour la plupart des workflows – c'est très rapide ! Vous pouvez travailler de manière itérative sur votre projet sur votre ordinateur, puis téléverser une nouvelle version sur le Web en quelques secondes.
:::

## Téléversement de votre application Web dans un dossier

Si vous ne souhaitez pas utiliser nos composants "Deploy to...", ou s'il n'y a pas de composant pour votre workflow particulier, vous pouvez effectuer le même processus manuellement. L'application Web résultante sera identique à ce que vous voyez sur votre serveur local lorsque vous travaillez sur le projet.

1. Créez un build de production de votre projet Web. Cela créera un dossier `dist/` avec tous les fichiers nécessaires, prêts pour la distribution. Il contient tous les fichiers nécessaires, y compris le bundle JavaScript, le fichier HTML et tous les autres assets tels que les textures, l'audio ou les fichiers vidéo.

2. Téléversez le contenu du dossier `dist/` de votre projet Web sur votre hébergeur Web. Vous pouvez le faire via FTP, SFTP ou toute autre méthode de transfert de fichiers fournie par votre hébergeur. Consultez la documentation de votre hébergeur Web pour plus de détails.

3. Et voilà ! Votre application Web est maintenant en ligne.


::: tip L'emplacement du dossier influence l'URL de votre application Web.
Selon les paramètres de votre hébergeur, l'emplacement et le nom du dossier déterminent l'URL de votre application Web. Voici un exemple :
- Votre domaine `https://your-website.com/` pointe vers le dossier `/var/www/html` sur votre espace Web.
- Vous téléversez vos fichiers dans `/var/www/html/my-app` afin que le fichier `index.html` se trouve dans `/var/www/html/my-app/index.html`.
- L'URL de votre application Web est maintenant `https://your-website.com/my-app/`.
:::

## Intégration d'un projet Needle dans un site Web existant

Dans certains cas, vous souhaitez qu'un projet Needle Engine fasse partie d'un site Web existant, par exemple dans le cadre d'un article de blog, d'une page produit ou d'un portfolio. Le processus est très similaire, mais au lieu de téléverser les fichiers à la racine de votre espace Web, vous _intégrez_ le projet dans un site Web existant avec quelques lignes de code.

1. Créez un build de production de votre projet Web. Cela créera un dossier `dist/` avec tous les fichiers nécessaires, prêts pour la distribution. Il contient tous les fichiers nécessaires, y compris le bundle JavaScript, le fichier HTML et tous les autres assets tels que les textures, l'audio ou les fichiers vidéo.

2. Téléversez le dossier `dist/` de votre projet Web sur votre hébergeur Web.
    ::: tip Le dossier peut être hébergé n'importe où !
    Si vous n'avez pas accès au système de fichiers de votre hébergeur Web, ou si vous n'avez aucun moyen d'y téléverser des fichiers, vous pouvez téléverser le dossier sur n'importe quel autre espace Web et utiliser l'URL publique de celui-ci à l'étape suivante.
    :::

3. Dans votre dossier `dist`, vous trouverez un fichier `index.html`. Nous voulons copier quelques lignes de ce dossier, alors ouvrez le fichier dans un éditeur de texte. Typiquement, il ressemble à ceci :
    ```html
    <head>
        ...
        <script type="module" crossorigin src="./assets/index-732f0764.js"></script>
        ...
    </head>
    <body>
        <needle-engine src="assets/scene.glb"></needle-engine>
    </body>
    ```

    Deux lignes sont importantes ici :
    - le bundle JavaScript à l'intérieur de `<script>`,
    - la balise HTML `<needle-engine>`.

4. Sur le site Web cible, ajoutez également les balises `<script...>` et `<needle-engine...>`. Assurez-vous que les chemins pointent vers l'emplacement où vous avez téléversé les fichiers.
    ```html
    <script type="module" src="/your-upload-folder/assets/index-732f0764.js"></script>
    <needle-engine src="/your-upload-folder/assets/scene.glb"></needle-engine>
    ```

5. Et voilà ! La scène devrait maintenant s'afficher sur votre site Web.

## Intégration d'un projet Needle en tant qu'iframe

Lorsque vous avez un accès limité à un site Web, par exemple lorsque vous utilisez un CMS comme WordPress, vous pouvez utiliser un iframe pour intégrer une scène Needle Engine à votre site Web. Vous connaissez peut-être ce workflow grâce à l'intégration de vidéos YouTube ou de modèles Sketchfab.

1. Créez un build de production de votre projet Web. Cela créera un dossier `dist/` avec tous les fichiers nécessaires, prêts pour la distribution.

2. Téléversez le dossier `dist/` de votre projet Web sur votre hébergeur Web.
    ::: tip Le dossier peut être hébergé n'importe où !
    Si vous n'avez pas accès au système de fichiers de votre hébergeur Web, ou si vous n'avez aucun moyen d'y téléverser des fichiers, vous pouvez téléverser le dossier sur n'importe quel autre espace Web et utiliser l'URL publique de celui-ci à l'étape suivante.
    :::

3. Ajoutez un iframe à votre site Web, pointant vers le fichier `index.html` dans le dossier `dist/`.
    ```html
    <iframe
        src="https://your-website.com/needle-files/dist/index.html"
        allow="xr; xr-spatial-tracking; fullscreen;">
    </iframe>
    ```


    ::: tip Permissions à l'intérieur des iframes
    La liste à l'intérieur de `allow=` dépend des fonctionnalités utilisées par votre application Web. Par exemple, les applications XR nécessitent `xr` et `xr-spatial-tracking` pour fonctionner à l'intérieur des iframes.

    Des fonctionnalités supplémentaires peuvent être nécessaires, par exemple `camera; microphone; display-capture; geolocation`. Consultez [la liste complète des directives Permissions Policy pour iframe sur MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy#directives).
    :::

4. Et voilà ! La scène devrait maintenant s'afficher sur votre site Web.

## Intégration de scènes qui n'utilisent pas de scripts personnalisés

Lorsque votre projet n'utilise que des composants principaux et aucun script personnalisé, vous pouvez utiliser directement Needle Engine à partir d'un CDN (content-delivery network).

1. Ajoutez le snippet suivant à votre site Web, par exemple en tant que "bloc HTML" dans votre CMS :
    ```html
    <script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
    <needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb" background-blurriness="0.8"></needle-engine>
    ```
2. Téléversez le dossier `assets/` de votre projet Web sur votre hébergeur Web. Selon les paramètres de votre projet, ce dossier contient un ou plusieurs fichiers `.glb` et un nombre quelconque d'autres fichiers comme audio, vidéo, skybox et plus encore.

3. Modifiez l'attribut `src=` de la balise `needle-engine` pour qu'il pointe vers l'URL du fichier `.glb` que vous souhaitez afficher. Typiquement, ce sera un chemin comme `https://your-website.com/assets/MyScene.glb`.

4. Et voilà ! La scène devrait maintenant s'afficher sur votre site Web.

## Intégration d'une application Web Needle Cloud en tant qu'iframe

Si vous avez déployé votre projet sur Needle Cloud, vous pouvez facilement l'afficher sur votre propre site Web avec un iframe.

::: warning <b>En cours de construction.</b> Cette section n'est pas encore terminée.
:::

# Workflows courants

## Création d'une application Web pour le site Web d'un client

1. **Comprenez le type d'application que vous créez**, et si et comment elle se connecte à un site Web existant.
   Souvent, vous construisez une application autonome accessible via un lien sur le domaine du client.
   Mais d'autres composants côté serveur et côté client peuvent également être impliqués.

2. **Comprenez l'URL à partir de laquelle l'application Web doit être accessible.**
   Cela pourrait être

    - Une page sur **[Needle Cloud](./cloud/)**
      `collaborativesandbox-zubcks1qdkhy.needle.run`

    - Une **sous-page** sur le site Web du client
      `mon-site.com/app`

    - Un nouveau **sous-domaine**
      `app.mon-site.com`
    - Un **domaine** nouveau ou existant
      `mon-app.com`

    ::: tip Il n'y a pas de "bon" ou de "mauvais" ici.
    Une approche typique consiste à commencer sur [Needle Cloud](./cloud/) pour les prototypes initiaux et pendant le développement, et à passer à l'espace Web et au domaine du client pour la version finale.

    Le choix dépend principalement des exigences du client en matière de branding, de SEO et de configuration technique. Souvent, vous devrez en discuter avec le service informatique ou le webmaster du client.
    :::

1. **Comprenez comment l'application Web sera déployée et maintenue.**
    - Aurez-vous accès à un dossier sur le serveur Web du client afin de pouvoir téléverser la dernière version, ou souhaitent-ils gérer eux-mêmes le déploiement ?
      ::: tip Une approche simple : l'accès FTP
      Souvent, vous pouvez demander un accès FTP ou SFTP à un dossier sur le serveur Web du client. Vous obtiendrez une URL, un nom d'utilisateur et un mot de passe, puis vous pourrez téléverser vos fichiers dans ce dossier. Nous fournissons un composant "Deploy to FTP" qui facilite particulièrement cette tâche. Le service informatique du client configurera l'URL à partir de laquelle le dossier est accessible.
        :::

    - Y a-t-il beaucoup de contenu qui doit être mis à jour régulièrement, ou l'application est-elle principalement statique ?
        ::: tip Contenu statique vs dynamique
        Pour un contenu principalement statique, il suffit souvent de téléverser un nouveau build de temps en temps. Pour le contenu dynamique, vous pourriez avoir besoin d'un CMS (système de gestion de contenu) ou d'une connexion à une base de données.
        :::
    - Quels appareils et navigateurs le public cible utilise-t-il ?
        ::: tip Compatibilité et tests des navigateurs
        Bien que Needle Engine fonctionne sur tous les appareils et navigateurs modernes, il est toujours bon de tester votre application sur les appareils et navigateurs que votre public cible utilise pour vous assurer que tout fonctionne comme prévu. Par exemple, lorsque vous créez une application AR pour téléphones, vous voudrez tester sur les appareils Android et iOS.
        :::

2. **Configurez le projet, un déploiement de test et le déploiement client.**
   Il est souvent judicieux de tester le processus de déploiement rapidement, pour vous assurer de comprendre comment il fonctionne et quelles sont les exigences. Par exemple, si vous avez opté pour le FTP, vous pouvez configurer un dossier de test sur votre propre serveur Web et tester le processus de déploiement là-bas. Une fois les modifications approuvées par le client, vous pouvez ensuite déployer sur le serveur du client.

3. **Commencez à créer !**
   Avec les exigences et le déploiement en place, lancez-vous et commencez à créer votre projet ! Vous itérerez généralement localement, puis déploierez sur votre serveur de test pour approbation, puis sur le serveur du client.

## Wordpress

1. Décidez de la méthode que vous souhaitez utiliser pour intégrer votre projet Needle Engine. Vous pouvez utiliser soit la méthode "Intégration d'un projet Needle dans un site Web existant", soit la méthode "Intégration d'un projet Needle en tant qu'iframe".

2. Téléversez le contenu du dossier `dist/` de votre projet Web sur votre hébergeur Web. Habituellement, le répertoire des téléversements de Wordpress se trouve dans `wp-content/uploads/`.

    ::: tip Sauvegardes Wordpress
    Vous pouvez décider si votre nouveau projet doit se trouver dans `wp-content/uploads/my-project/`, ou à un autre emplacement comme `my-projects/my-project`. Cela influence si et comment votre projet sera inclus dans les sauvegardes Wordpress.
    :::

3. Dans la page à laquelle vous souhaitez ajouter Needle Engine, ajoutez un bloc `HTML` et collez le snippet de code comme décrit ci-dessus – soit en tant qu'embed de script, soit en tant qu'iframe.

## Shopify

::: warning <b>En cours de construction.</b> Doit être documenté.
:::

## Wix

::: warning <b>En cours de construction.</b> Doit être documenté.
:::

## Webflow

::: warning <b>En cours de construction.</b> Doit être documenté.
:::

---
Page automatiquement traduite à l'aide de l'IA