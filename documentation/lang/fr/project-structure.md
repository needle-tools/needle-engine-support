---
title: Structure de projet Web
---

# Structure du projet Needle Engine

### Fichiers du projet Web

| | |
| --- | --- |
| **Needle Engine** | |
| [`needle.config.json`](./reference/needle-config-json.md) | Configuration pour les builds et les intégrations de Needle Engine |
| **Écosystème** | |
| `package.json` | Configuration du projet contenant le nom, la version, les dépendances et les scripts |
| `tsconfig.json` | Configuration du compilateur Typescript |
| `.gitignore` | Fichiers et dossiers à ignorer dans git |
| `vite.config.js` | Contient la configuration spécifique à vite.<br/>Il ajoute également les plugins vite de Needle Engine. |


### Structure par défaut du projet Vite

Notre modèle de projet principal utilise le bundler super rapide [vite](https://vitejs.dev/). Ce qui suit montre la structure du modèle Vite que nous avons créé et livré (bien qu'il soit possible de l'adapter à vos propres besoins).

| | |
| --- | --- |
| **Dossiers** | |
| `assets/` | Le dossier d'assets contient les assets exportés depuis Unity. Par exemple, les fichiers `gltf` générés, les fichiers audio ou vidéo. Il n'est pas recommandé d'ajouter manuellement des fichiers à `assets` car ils seront supprimés lors de la construction de la distribution du projet.
| `include/` | (optionnel) - Si vous avez des assets personnalisés que vous devez référencer/charger, ajoutez-les au répertoire include. Lors du build, ce répertoire sera copié dans le dossier de sortie.
| `src/generated/` | Le code javascript généré. Ne pas modifier manuellement !
| `src/scripts/` | Vos scripts / composants spécifiques au projet
| `src/styles/` | Feuilles de style
| `*` | Vous pouvez ajouter de nouveaux dossiers ici à votre guise. Assurez-vous de les [copier](./reference/needle-config-json.md) dans le répertoire de sortie lors du build |
| **Fichiers** | |
| `index.html` | La page d'atterrissage ou d'accueil de votre site web
| `vite.config` | La [configuration de vite](https://vitejs.dev/config/). Les paramètres pour la construction de la distribution et l'hébergement du serveur de développement sont définis ici. Il n'est généralement pas nécessaire de modifier ces paramètres.
| `src/main.ts` | Inclus depuis `index.html` et important `needle-engine`
| `*` | Vous pouvez ajouter de nouveaux fichiers ici à votre guise. Assurez-vous de les [copier](./reference/needle-config-json.md) dans le répertoire de sortie lors du build (à moins qu'ils ne soient utilisés que pendant le développement) |

Notre exportateur peut également être utilisé avec d'autres structures de projet, vite est simplement notre outil de bundling frontend privilégié en raison de sa rapidité. N'hésitez pas à configurer votre projet JavaScript comme vous le souhaitez.

[Apprenez-en davantage dans la documentation sur le bundling et l'utilisation avec d'autres frameworks](html.md)



---

#### Poursuivre la lecture

- [Guide Typescript pour les développeurs Unity](./getting-started/for-unity-developers.md)
- [Principes essentiels de Typescript](./getting-started/typescript-essentials.md)
- [Écrire des scripts personnalisés](./scripting.md)
- [Actions partout](./everywhere-actions.md)

Page automatiquement traduite par IA