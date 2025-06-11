---
title: needle.config.json
---

Die `needle.config.json` wird verwendet, um Konfigurationen für die Needle Editor Integrationen und die Plugins der Needle Engine Build-Pipeline bereitzustellen.

| | |
| --- | --- |
| **Pfade** | |
| `buildDirectory` | Hierhin werden die erstellten Projektdateien kopiert |
| `assetsDirectory` | Hierhin werden die Editor-Integrations-Assets kopiert oder erstellt (z.B. die `.glb` Dateien, die aus Unity oder Blender exportiert wurden) |
| `scriptsDirectory` | Dies ist das Verzeichnis, das die Editor-Integration auf Codeänderungen überwacht, um Komponenten neu zu generieren |
| `codegenDirectory` | Hierhin gibt die Editor-Integration generierte Dateien aus. |
| `baseUrl` | Erforderlich z.B. für next.js oder SvelteKit Integration. Wenn baseUrl gesetzt ist, verwenden relative Pfade für Codegen und innerhalb von Dateien baseUrl, nicht assetsDirectory. Dies ist nützlich in Fällen, in denen das assetDirectory nicht mit der Server-URL übereinstimmt.<br/>Zum Beispiel könnte der Pfad auf der Festplatte `"assetsDirectory": "public/assets"` sein, aber das Framework serviert Dateien von `"baseUrl": "assets"`. |
| **Werkzeuge** | |
| `build : { copy: ["myFileOrDirectory"] }` | Array von String-Pfaden zum Kopieren zusätzlicher Dateien oder Ordner in das `buildDirectory`. Diese können absolut oder relativ sein. |


#### Grundlegendes Beispiel
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### Kopier-Beispiel
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

#### Beispiel mit anderem baseUrl (z.B. SvelteKit, Next.js)
Dateien werden nach `static/assets` exportiert, aber das Framework serviert sie von `/assets`. In diesem Fall muss `baseUrl` auf `assets` gesetzt werden, damit relative Pfade in Dateien korrekt sind.

```json
{
  "baseUrl": "assets",
  "buildDirectory": "dist",
  "assetsDirectory": "static/assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### Verwandte Links
- [Projektstruktur](../project-structure.md)


Seite automatisch von KI übersetzt