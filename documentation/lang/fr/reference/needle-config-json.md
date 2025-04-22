---
title: needle.config.json
---

Le `needle.config.json` est utilisé pour fournir la configuration des intégrations de l'éditeur Needle et des plugins du pipeline de build de Needle Engine.

| | |
| --- | --- |
| **Chemins** | |
| `buildDirectory` | C'est là que les fichiers du projet construits sont copiés |
| `assetsDirectory` | C'est là que les assets de l'intégration de l'éditeur seront copiés ou créés (par exemple, les fichiers `.glb` exportés depuis Unity ou Blender) |
| `scriptsDirectory` | C'est le répertoire que l'intégration de l'éditeur surveille pour les changements de code afin de re-générer les composants |
| `codegenDirectory` | C'est là que l'intégration de l'éditeur génère les fichiers de sortie. |
| `baseUrl` | Requis pour l'intégration de next.js ou SvelteKit par exemple. Lorsque baseUrl est défini, les chemins relatifs pour le codegen et à l'intérieur des fichiers utilisent baseUrl, et non assetsDirectory. Ceci est utile dans les cas où l'assetDirectory ne correspond pas à l'url du serveur.<br/>Par exemple, le chemin sur disque pourrait être `"assetsDirectory": "public/assets"`, mais le framework sert les fichiers depuis `"baseUrl": "assets"`. |
| **Outils** | |
| `build : { copy: ["myFileOrDirectory"] }` | Tableau de chemins de chaînes de caractères pour copier des fichiers ou dossiers supplémentaires vers le `buildDirectory`. Ces chemins peuvent être absolus ou relatifs. |


#### Exemple simple
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### Exemple avec copie
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated",
  "build": {
    "copy": [
      "cards"
    ]
  }
}
```

#### Exemple avec un baseUrl différent (par exemple SvelteKit, Next.js)
Les fichiers sont exportés vers `static/assets` mais le framework les sert depuis `/assets`. Dans ce cas, le `baseUrl` doit être défini sur `assets` afin que les chemins relatifs dans les fichiers soient corrects.

```json
{
  "baseUrl": "assets",
  "buildDirectory": "dist",
  "assetsDirectory": "static/assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### Liens connexes
- [Structure du projet](../project-structure.md)


Page traduite automatiquement à l'aide de l'IA