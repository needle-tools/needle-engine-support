---
title: Tester sur les appareils locaux
---

## Tester sur les appareils locaux

Lorsque vous utilisez nos templates, Needle Engine lance un serveur de développement local pour vous. Appuyez simplement sur "Play" et un site web s'ouvrira dans votre navigateur par défaut, prêt à être testé sur votre appareil local. Pour tester sur d'autres appareils du même réseau, vous devrez peut-être installer un certificat auto-signé (voir ci-dessous).

Si vous utilisez une configuration / un framework personnalisé, veuillez consulter la documentation de votre framework pour savoir comment exécuter un serveur de développement local sécurisé.

::: tip
Notre serveur local utilise l'adresse IP de votre réseau local (par ex. `https://192.168.0.123:3000`) au lieu de `localhost:3000`. Cela vous permet de visualiser et de tester rapidement votre projet depuis des appareils mobiles, des casques VR et d'autres machines sur le même réseau.

Nous utilisons HTTPS au lieu de l'ancien HTTP, car les API web modernes et puissantes comme WebXR nécessitent une connexion sécurisée – le S signifie "sécurisé".
:::

## Configurer un certificat auto-signé pour le développement

Les différents systèmes d'exploitation ont des exigences de sécurité différentes pour le développement local. Généralement, afficher un site web fonctionnera même avec un certificat non fiable auto-généré, mais les navigateurs peuvent émettre un avertissement concernant le manque de confiance et certaines fonctionnalités peuvent ne pas être disponibles. Voici un résumé :

::: tip
L'installation de certificats auto-signés fiables sur vos appareils de développement est recommandée pour une expérience de développement fluide. Trouvez les étapes au bas de cette page.
:::

**Par défaut – avec un certificat non fiable auto-généré**
_Affiche un avertissement de certificat lors de l'ouverture du projet dans un navigateur._
_Utilise le package npm [vite-plugin-basic-ssl](https://github.com/vitejs/vite-plugin-basic-ssl)._

Nous utilisons des connexions websocket pour communiquer entre le navigateur et le serveur de développement local. Les websockets nécessitent une connexion sécurisée (HTTPS) pour fonctionner. Selon la plateforme, vous pourriez avoir besoin de configurer un certificat personnalisé pour le développement local. Android et Windows n'ont pas besoin de certificat personnalisé, mais iOS et MacOS en ont besoin.

| OS | Affichage dans le navigateur<br/>(avec un avertissement de sécurité) | Rechargements automatiques |
| --- | --- | --- |
| Windows | (✓) | ✓ |
| Linux | (✓) | ✓ |
| Android | (✓) | ✓ |
| macOS | (✓) | ❌ |
| iOS | (✓ Safari et Chrome, après rechargement de la page)<br/>❌ Mozilla XR Viewer | ❌ |
| Simulateurs Xcode | (✓ après rechargement de la page) | ❌ |

**Avec un certificat racine auto-signé et fiable**
_Aucun avertissement de sécurité n'est affiché. Vous devez installer le certificat généré sur votre ou vos appareils._
_Utilise le package npm [vite-plugin-mkcert](https://github.com/liuweiGL/vite-plugin-mkcert)._

| OS | Affichage dans le navigateur | Rechargements automatiques |
| --- | --- | --- |
| Windows | ✓ | ✓ |
| Linux | ✓ | ✓ |
| Android | ✓ | ✓ |
| macOS | ✓ | ✓ |
| iOS | ✓ | ✓ |

### Générer un certificat de développement auto-signé

- dans Unity/Blender, cliquez sur "Open Workspace" pour ouvrir VS Code

- vérifiez que vous utilisez `vite-plugin-mkcert` au lieu de `vite-plugin-basic-ssl` (ce dernier ne génère pas de certificat racine fiable, ce dont nous avons besoin) dans votre fichier `vite.config.ts` :
  - ouvrez `package.json`
  - supprimez la ligne avec `"@vitejs/plugin-basic-ssl"` de `devDependencies`
  - ouvrez un Terminal dans VS Code et exécutez `npm install vite-plugin-mkcert --save-dev` qui ajoutera la dernière version
  - ouvrez `vite.config.ts` et remplacez `import basicSsl from '@vitejs/plugin-basic-ssl'` par `import mkcert from'vite-plugin-mkcert'`
  - dans `plugins: [`, remplacez `basicSsl(),` par `mkcert(),`
  - package.json ressemble à ceci maintenant :
  ![](/testing/switch-to-mkcert.webp)
- exécutez `npm run start` une fois depuis le terminal de VS Code
  - sous Windows, cela ouvrira une nouvelle fenêtre et vous guidera à travers la création et l'installation du certificat
  - sous MacOS, le terminal demandera votre mot de passe, puis générera et installera le certificat.
  - si vous obtenez l'erreur `Error: Port 3000 is already in use`, veuillez fermer le serveur qui pourrait encore fonctionner depuis Unity.
- le certificat généré sera automatiquement installé sur la machine sur laquelle vous l'avez généré.
- vous pouvez arrêter le processus du terminal à nouveau.
- à partir de maintenant, appuyer sur "Play" dans Unity/Blender utilisera le certificat généré pour le serveur local, et aucun "avertissement de sécurité" ne sera plus affiché, car votre navigateur fait désormais confiance à la connexion locale.

## Installer le certificat sur vos appareils de développement

Sur vos appareils de développement, vous devez _installer_ le certificat généré et permettre au système d'exploitation de lui faire _confiance_. Cela diffère pour chaque OS. Pour chacun d'eux, vous aurez besoin du fichier rootCA.pem qui a été généré, et l'envoyer à l'appareil que vous souhaitez authentifier.

**Sous Windows :** trouvez le certificat dans `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem`
**Sous MacOS :** trouvez le certificat dans `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem`

Envoyez le périphérique à vous-même (par ex. via E-Mail, AirDrop, iCloud, USB, Slack, ...) afin de pouvoir y accéder sur vos appareils de développement.

### Installer le certificat sous Android

1. Ouvrez le fichier. Il vous sera demandé d'installer le certificat.

### Installer le certificat sous iOS / iPadOS / VisionOS
1. Ouvrez le fichier.
2. Il vous sera demandé d'_ajouter_ le profil à votre appareil. Confirmez.
3. Allez dans Réglages
4. Il y aura une nouvelle entrée "Profil". Sélectionnez-la et autorisez le profil à être _actif_ pour cet appareil.
5. Sous iOS / iPadOS, vous devez également autoriser "Confiance du certificat racine" (Root Certificate Trust). Pour cela, recherchez `Confiance` ou allez dans `Réglages > Général > Informations > Réglages de confiance des certificats` et activez la confiance totale pour le certificat racine.

::: tip
Le certificat est automatiquement installé sur la machine sur laquelle vous l'avez généré. Pour les autres machines du réseau local, suivez les étapes ci-dessous pour également établir une connexion fiable.
:::

### Installer le certificat sur une autre machine MacOS
1. Ouvrez le fichier. Trousseau d'accès s'ouvrira et vous permettra d'installer le certificat.
2. Vous devrez peut-être définir la "Confiance" sur "Toujours autoriser".

### Installer le certificat sur une autre machine Windows
1. Ouvrez `certmgr` ("Gérer les certificats utilisateur") en tapant <kbd>touche Windows</kbd> + `certmgr`.
2. Dans la barre latérale gauche, sélectionnez "Autorités de certification racines de confiance".
3. Faites un clic droit sur "Certificats" et sélectionnez "Toutes les tâches > Importer".
4. Sélectionnez le fichier `rootCA.pem` (vous devrez peut-être changer le type de fichier en "tous") et suivez les instructions.

Page automatiquement traduite à l'aide de l'IA