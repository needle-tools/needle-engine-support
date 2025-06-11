---
title: Frameworks, Bundler, HTML
---

## Bundling und Web-Frontends

Needle Engine ist als Web Component aufgebaut. Das bedeutet, installiere einfach `@needle-tools/engine` in deinem Projekt und füge `<needle-engine src="path/to/your.glb">` überall in deinem Web-Projekt ein.

- Installation mit npm:
  `npm i @needle-tools/engine`

Mit unserer Standard-Vite-basierten Projektvorlage wird Needle Engine bei der Bereitstellung zu einer Web-App gebündelt. Dies sorgt für kleinere Dateien, Tree-shaking (ähnlich dem Code-Stripping in Unity) und optimiert die Ladezeiten. Anstatt zahlreiche kleine Skripte und Komponenten herunterzuladen, wird nur eines oder wenige heruntergeladen, die den minimal benötigten Code enthalten.

Vite (unser Standard-Bundler) erklärt gut, warum Web-Apps gebündelt werden sollten: [Why Bundle for Production](https://vitejs.dev/guide/why.html)

### Vite, Vue, React, Svelte, React Three Fiber...

Needle Engine ist unvoreingenommen bezüglich der Wahl des Frameworks. Unsere Standardvorlage verwendet das beliebte [vite](https://vitejs.dev) als Bundler. Von dort aus kannst du vue, svelte, nuxt, react, react-three-fiber oder andere Frameworks hinzufügen, und wir haben Beispiele für viele davon. Du kannst auch andere Bundler integrieren oder gar keinen verwenden – einfach reines HTML und Javascript.

Hier sind einige Beispiel-Tech-Stacks, die möglich sind und mit denen wir Needle Engine verwenden:

- **Vite + HTML** – Das verwendet unsere Standardvorlage!

- **Vite + Vue** – Das verwendet die Website von [Needle Tools](https://needle.tools)! Ein Beispiel zum Herunterladen findest du [hier](https://github.com/needle-tools/needle-engine-samples).
- **Vite + Svelte**
- **Vite + SvelteKit**
- **Vite + React** – Es gibt eine experimentelle Vorlage, die mit der Unity-Integration geliefert wird und die du bei der Projekterstellung auswählen kannst!
- **react-three-fiber** – Es gibt eine experimentelle Vorlage, die mit der Unity-Integration geliefert wird und die du bei der Projekterstellung auswählen kannst!
- **Vercel & Nextjs** – Ein [Beispiel-Nextjs-Projekt findest du hier](https://github.com/needle-engine/nextjs-sample).
- **CDN ohne Bundler** – Ein Codebeispiel findest du [hier](./vanilla-js.md).

Kurz gesagt: Wir stellen derzeit eine minimale Vite-Vorlage bereit, aber du kannst sie erweitern oder zu anderen Frameworks wechseln – Lass uns wissen, was und wie du baust, und wie wir das Erlebnis für deinen Anwendungsfall verbessern oder ein Beispiel bereitstellen können!

:::tip
Einige Frameworks erfordern benutzerdefinierte Einstellungen in `needle.config.json`. Erfahre mehr [hier](./reference/needle-config-json.md). Typischerweise muss die `baseUrl` festgelegt werden.
:::

:::details Wie erstelle ich eine benutzerdefinierte Projektvorlage in Unity?

Du kannst deine eigenen Webprojektvorlagen erstellen und teilen, um andere Bundler, Build-Systeme oder gar keine zu verwenden.

**Eine neue Vorlage erstellen**
1. Wähle `Create/Needle Engine/Project Template`, um ein ProjectTemplate in den Ordner einzufügen, den du als Vorlage verwenden möchtest.
2. Fertig! So einfach ist das.

Die Abhängigkeiten kommen von Unity, wenn es ein NpmDef im Projekt gibt (also wenn dein Projekt lokale Referenzen verwendet). Du könntest deine Pakete auch bei npm veröffentlichen und sie über die Versionsnummer referenzieren.
:::

### Tree-shaking zur Reduzierung der Bundle-Größe

Tree shaking bezeichnet eine gängige Praxis beim Bundling von Webanwendungen ([siehe MSDN docs](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)). Das bedeutet, dass Codepfade und Features, die in deinem Code nicht verwendet werden, aus der endgültigen gebündelten Javascript-Datei(en) entfernt werden, um die Dateigröße zu reduzieren. Siehe unten zu Features, die Needle Engine enthält und wie du sie entfernen kannst:

:::details Wie entferne ich die Rapier Physics Engine? (Reduziert die gesamte Bundle-Größe um ca. 2MB (~600KB bei Gzipping))

- **Option 1**: über die needlePlugins-Konfiguration:
  Setze `useRapier` auf `false` in deiner vite.config: `needlePlugins(command, needleConfig, { useRapier: false }),`

- **Option 2**: über die vite.define-Konfiguration:
  Deklariere das `NEEDLE_USE_RAPIER`-Define mit `false`
  ```js
  define: {
    NEEDLE_USE_RAPIER: false
  },
  ```

- **Option 3**: über .env
  Erstelle eine `.env`-Datei in deinem Webprojekt und füge `VITE_NEEDLE_USE_RAPIER=false` hinzu.

- **Option 4**: über die Unity-Komponente:
  Füge die `Needle Engine Modules`-Komponente zu deiner Szene hinzu und setze `Physics Engine` auf `None`.
  ![](/imgs/unity-needle-engine-modules-physics.jpg)

:::

## Eine PWA erstellen

Wir unterstützen die einfache Erstellung einer Progressive Web App (PWA) direkt aus unserer Vite-Vorlage. PWAs sind Webanwendungen, die wie normale Webseiten oder Websites laden, aber Benutzerfunktionen wie Offline-Arbeit, Push-Benachrichtigungen und Zugriff auf Geräte-Hardware bieten können, die traditionell nur für native mobile Anwendungen verfügbar sind. Standardmäßig verfügen mit Needle erstellte PWAs über Offline-Unterstützung und können optional automatisch aktualisiert werden, wenn du eine neue Version deiner App veröffentlichst.

1) Installiere das [Vite PWA plugin](https://vite-pwa-org.netlify.app/) in deinem Webprojekt: `npm install vite-plugin-pwa --save-dev`
2) Ändere deine `vite.config.js` wie unten gezeigt. Stelle sicher, dass du dasselbe `pwaOptions`-Objekt sowohl an `needlePlugins` als auch an `VitePWA` übergibst.

```js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async ({ command }) => {

    // Erstelle das pwaOptions-Objekt.
    // Hier kannst du PWA-Einstellungen bearbeiten oder eingeben (z.B. den PWA-Namen ändern oder Icons hinzufügen).
    /** @type {import("vite-plugin-pwa").VitePWAOptions} */
    const pwaOptions = {};

    const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");

    return {
        plugins: [
            // übergib das pwaOptions-Objekt an die needlePlugins- und die VitePWA-Funktion
            needlePlugins(command, needleConfig, { pwa: pwaOptions }),
            VitePWA(pwaOptions),
        ],
        // der Rest deiner vite config...
```

:::tip Alle Assets werden standardmäßig gecacht
Beachte, dass standardmäßig alle Assets in deinem Build-Ordner dem PWA Precache hinzugefügt werden – für große Anwendungen mit vielen dynamischen Assets ist dies möglicherweise nicht das, was du willst (stell dir vor, die YouTube PWA cached alle Videos, sobald ein Benutzer die App öffnet!). Unter [Weitere PWA-Optionen](#more-pwa-options) erfährst du, wie du dieses Verhalten anpassen kannst.
:::

### PWAs testen

Um deine PWA zu testen, deploye die Seite, zum Beispiel mit der `DeployToFTP`-Komponente. Öffne dann die deployed Seite in einem Browser und prüfe, ob die PWA Features wie erwartet funktionieren:
- die App wird als installierbar angezeigt
- die App funktioniert offline
- die App wird von [pwabuilder.com](https://pwabuilder.com/) als offline-fähige PWA erkannt.

PWAs verwenden Service Worker, um Ressourcen zu cachen und Offline-Unterstützung bereitzustellen. Service Worker sind während der Entwicklung etwas schwieriger zu verwenden und werden typischerweise nur für Builds aktiviert (z. B. wenn du eine `DeployTo...`-Komponente verwendest).

Du kannst die PWA-Unterstützung für die Entwicklung aktivieren, indem du Folgendes zum Options-Objekt in deiner `vite.config.js` hinzufügst.

```js
const pwaOptions = {
  // Hinweis: PWAs verhalten sich im Entwicklungsmodus anders.
  // Stelle sicher, dass du das Verhalten in Produktions-Builds überprüfst!
  devOptions: {
    enabled: true,
  }
};
```

Bitte beachte, dass PWAs im Entwicklungsmodus keine Offline-Nutzung unterstützen – ein Versuch kann zu unerwartetem Verhalten führen.

### Automatische Aktualisierung laufender Apps

Websites zeigen normalerweise neue oder aktualisierte Inhalte beim Seiten-Refresh an.

In einigen Situationen möchtest du, dass die Seite automatisch aktualisiert und neu geladen wird, wenn eine neue Version veröffentlicht wurde – wie zum Beispiel in einem Museum, auf einer Messe, auf öffentlichen Displays oder in anderen langlebigen Szenarien.

Um automatische Updates zu aktivieren, setze die `updateInterval`-Eigenschaft im pwaOptions-Objekt auf eine Dauer (in Millisekunden), in der die App nach Updates suchen soll. Wenn ein Update erkannt wird, wird die Seite automatisch neu geladen.

```js
const pwaOptions = {
  updateInterval: 15 * 60 * 1000, // 15 Minuten, in Millisekunden
};
```

:::tip Periodische Neuladungen und Benutzerdaten
Es wird nicht empfohlen, automatische Neuladungen in Anwendungen zu verwenden, in denen Benutzer mit Formularen oder anderen Daten interagieren, die bei einer Neuladung verloren gehen könnten. Für diese Anwendungen wird empfohlen, einen Neulade-Prompt anzuzeigen. Weitere Informationen zur Implementierung eines Neulade-Prompts anstelle von automatischem Neuladen findest du in der [Vite PWA plugin documentation](https://vite-pwa-org.netlify.app/guide/prompt-for-update.html).
:::

### Weitere PWA-Optionen

Da Needle unter der Haube das [Vite PWA plugin](https://vite-pwa-org.netlify.app/) verwendet, kannst du alle von diesem bereitgestellten Optionen und Hooks nutzen. Zum Beispiel kannst du ein teilweises Manifest mit einem benutzerdefinierten App-Titel oder einer benutzerdefinierten Themenfarbe bereitstellen:

```js
const pwaOptions = {
  // Hier bereitgestellte Manifest-Optionen überschreiben die Standardeinstellungen
  manifest: {
    name: "My App",
    short_name: "My App",
    theme_color: "#B2D464",
  }
};
```

Für komplexe Anforderungen wie partielles Caching, benutzerdefinierte Service Worker oder verschiedene Aktualisierungsstrategien kannst du die Option `{ pwa: pwaOptions }` aus `needlePlugins` entfernen und die PWA-Funktionalität direkt über das Vite PWA plugin hinzufügen.

## Zugriff auf Needle Engine und Komponenten aus externem Javascript

Code, den du exponierst, kann nach dem Bundling aus JavaScript aufgerufen werden. Dies ermöglicht den Aufbau von Viewern und anderen Anwendungen, bei denen es eine Trennung zwischen Daten gibt, die zur Bearbeitungszeit bekannt sind, und Daten, die erst zur Laufzeit bekannt sind (z. B. dynamisch geladene Dateien, vom Benutzer generierte Inhalte). Für den Zugriff auf Komponenten aus regulärem Javascript außerhalb der Engine siehe den Abschnitt [Interop mit regulärem Javascript](./scripting.md#accessing-needle-engine-and-components-from-anywhere).

## Anpassen des Ladebildschirms

Siehe den Abschnitt *Loading Display* in der [Needle Engine Komponentenreferenz](./reference/needle-engine-attributes.md).

### Eingebaute Stile

Die Lade-Optik von Needle Engine kann einen hellen oder dunklen Skin verwenden. Um die Optik zu ändern, verwende das `loading-style`-Attribut auf der `<needle-engine>` Webkomponente. Optionen sind `light` und `dark` (Standard):

``<needle-engine loading-style="light"></needle-engine>``

### Benutzerdefinierter Lade-Stil — *PRO Feature* #

Bitte siehe den Abschnitt *Loading Display* in der [Needle Engine Komponentenreferenz](./reference/needle-engine-attributes.md).

![Benutzerdefiniertes Laden](/imgs/custom-loading-style.webp)


Seite automatisch mit KI übersetzt