---
title: Comment déboguer
---

## Ressources utiles pour travailler avec glTF

Pour inspecter les fichiers glTF ou glb en ligne :
- [gltf.report](https://gltf.report/) - basé sur three.js
- [modelviewer.dev/editor](https://modelviewer.dev/editor) - basé sur three.js
- [Khronos glTF Sample Viewer](https://github.khronos.org/glTF-Sample-Viewer-Release/)
- [Babylon Sandbox](https://sandbox.babylonjs.com/)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)

Pour les inspecter localement :
- utilisez l'[extension Shell glTF pour Windows](https://apps.microsoft.com/store/detail/gltf-shell-extensions/9NPGVJ9N57MV?hl=en-us&gl=US) pour convertir entre glTF et glb
- utilisez l'[extension glTF Tools VS Code](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode) pour voir les erreurs de validation et les aperçus in-engine localement


## Paramètres URL intégrés

Les drapeaux de débogage peuvent être ajoutés comme paramètres de requête URL.
Utilisez ``?help`` pour obtenir une liste de TOUS les paramètres disponibles.

Voici quelques-uns des plus couramment utilisés :

- ``help`` affiche tous les paramètres url disponibles dans la console
- ``console`` ouvre une console de développement à l'écran, utile pour le débogage mobile
- ``printGltf`` enregistre les fichiers gltf chargés dans la console
- ``stats`` affiche le module FPS et enregistre les statistiques du renderer threejs toutes les quelques secondes
- ``showcolliders`` visualise les colliders physiques
- ``gizmos`` active le rendu des gizmos (par exemple, lors de l'utilisation de composants BoxCollider ou AxesHelper)
- et bien plus encore : veuillez utiliser ``help`` pour tous les voir


## Méthodes de débogage

Needle Engine dispose également de méthodes de débogage très puissantes et utiles qui font partie de la classe statique `Gizmos`. Consultez la [documentation scripting](./scripting.md#gizmos) pour plus d'informations.


## Test local des builds de release
- D'abord, installez http-server : `npm install -g http-server`
- créez une build (development ou production)
- ouvrez le répertoire *dist* avec un outil en ligne de commande
- exécutez `http-server -g` | *`-g` active le support gzip*
- optionnel : si vous souhaitez tester WebXR, générez un [certificat SSL auto-signé](https://stackoverflow.com/a/35231213), puis exécutez `http-server -g -S` pour activer https (requis pour WebXR).



## VSCode

Vous pouvez attacher VSCode au serveur local en cours d'exécution pour définir des points d'arrêt et déboguer votre code. Vous pouvez en savoir plus sur le [débogage avec VSCode](https://code.visualstudio.com/docs/editor/debugging) ici.

Créez un fichier launch.json à l'emplacement `.vscode/launch.json` dans votre projet web avec le contenu suivant :
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Attach Chrome",
            "url": "https://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

Si vous avez changé le port sur lequel votre serveur démarre, assurez-vous de mettre à jour le champ `url` en conséquence.
Vous pouvez ensuite démarrer votre serveur local depuis VSCode :

![](/debugging/vscode-start-debugging.webp)

## Mobile

### Débogage Android

Pour le débogage **Android**, vous pouvez attacher les outils de développement Chrome Dev Tools à votre appareil et voir les logs directement depuis votre PC. Vous devez mettre votre appareil en mode développement et le connecter via USB.

Voir la documentation officielle de Chrome [ici](https://developer.chrome.com/docs/devtools/remote-debugging/)
- Assurez-vous que le [Mode Développeur](https://developer.android.com/studio/debug/dev-options) est activé sur votre téléphone
- Connectez votre téléphone à votre ordinateur via USB
- Ouvrez cette url dans votre navigateur ``chrome://inspect/#devices``
- Sur votre appareil mobile, autorisez la connexion USB à votre ordinateur
- Sur votre ordinateur dans Chrome, vous devriez voir une liste d'onglets ouverts après un certain temps (sur ``chrome://inspect/#devices``)
- Cliquez sur ``Inspect`` sur l'onglet que vous souhaitez déboguer

### Débogage iOS

Pour un débogage iOS facile, ajoutez le paramètre URL ``?console`` pour obtenir une console JavaScript à l'écran utile.

Si vous avez un Mac, vous pouvez également vous attacher à Safari (similaire au workflow Android ci-dessus).

L'utilisation et le débogage de WebXR sur iOS nécessitent l'utilisation d'un navigateur tiers : [Mozilla WebXR Viewer](https://labs.mozilla.org/projects/webxr-viewer/).

### Débogage Quest

Quest n'est qu'un appareil Android - voir la section [Débogage Android](#android-debugging) pour les étapes.

Page automatiquement traduite using AI