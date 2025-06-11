---
title: Web-Projektstruktur
---

# Needle Engine Projektstruktur

### Web-Projektdateien

| | |
| --- | |
| **Needle Engine** | |
| [`needle.config.json`](./reference/needle-config-json.md) | Konfiguration für Needle Engine Builds und Integrationen |
| **Ökosystem** | |
| `package.json` | Projektkonfiguration mit Name, Version, Abhängigkeiten und Skripten |
| `tsconfig.json` | Typescript Compiler-Konfiguration |
| `.gitignore` | Dateien und Ordner, die in git ignoriert werden sollen |
| `vite.config.js` | Enthält spezifische Konfiguration für vite.<br/>Fügt auch die Needle Engine vite Plugins hinzu. |


### Standardmäßige Vite Projektstruktur

Unsere Hauptprojektvorlage verwendet den superschnellen [vite](https://vitejs.dev/) Bundler. Das Folgende zeigt die Struktur der Vite Vorlage, die wir erstellt und ausliefern (obwohl es möglich ist, sie an Ihre eigenen Bedürfnisse anzupassen).

| | |
| --- | |
| **Ordner** | |
| `assets/` | Der Assets-Ordner enthält exportierte Assets aus Unity. Z.B. generierte ``gltf`` Dateien, Audio- oder Videodateien. Es wird nicht empfohlen, Dateien manuell zu ``assets`` hinzuzufügen, da dieser Ordner beim Erstellen der Distribution für das Projekt geleert wird.
| `include/` | (optional) - Wenn Sie benutzerdefinierte Assets haben, die Sie referenzieren/laden müssen, fügen Sie diese dem include-Verzeichnis hinzu. Beim Build wird dieses Verzeichnis in den Ausgabeordner kopiert.
| `src/generated/` | Der generierte Javascript-Code. Nicht manuell bearbeiten!
| `src/scripts/` | Ihre projektspezifischen Skripte / Komponenten
| `src/styles/` | Stylesheets
| `*` | Sie können hier nach Belieben neue Ordner hinzufügen. Stellen Sie sicher, dass Sie diese beim Build in das Ausgabeverzeichnis [kopieren](./reference/needle-config-json.md). |
| **Dateien** | |
| `index.html` | Die Landingpage oder Homepage Ihrer Website |
| `vite.config` | Die [vite Konfiguration](https://vitejs.dev/config/). Hier werden Einstellungen für das Erstellen der Distribution und das Hosten des Entwicklungsservers vorgenommen. Es ist normalerweise nicht notwendig, diese Einstellungen zu bearbeiten. |
| `src/main.ts` | Wird von `index.html` eingeschlossen und importiert `needle-engine` |
| `*` | Sie können hier nach Belieben neue Dateien hinzufügen. Stellen Sie sicher, dass Sie diese beim Build in das Ausgabeverzeichnis [kopieren](./reference/needle-config-json.md) (es sei denn, sie werden nur während der Entwicklung verwendet). |

Unser Exporter kann auch mit anderen Projektstrukturen verwendet werden, vite ist nur unser bevorzugtes Frontend-Bundling-Tool aufgrund seiner Geschwindigkeit. Fühlen Sie sich frei, Ihr JavaScript-Projekt nach Belieben einzurichten.

[Erfahren Sie mehr in der Dokumentation über Bundling und die Verwendung mit anderen Frameworks](html.md)



---

#### Weiterlesen

- [Typescript-Leitfaden für Unity-Entwickler](./getting-started/for-unity-developers.md)
- [Typescript Grundlagen](./getting-started/typescript-essentials.md)
- [Benutzerdefinierte Skripte schreiben](./scripting.md)
- [Everywhere Actions](./everywhere-actions.md)

Seite automatisch mit AI übersetzt