---
title: Frameworks, Bundler, HTML
---

## Bundling und Web-Frontends

Needle Engine ist als Web Component aufgebaut.
Das bedeutet, Sie können `@needle-tools/engine` einfach in Ihrem Projekt installieren:

```bash
npm i @needle-tools/engine
```

und es dann so in HTML verwenden:

```html
<script type="module">
  import '@needle-tools/engine';
</script>
<needle-engine src="path/to/your.glb"></needle-engine>
```

Mit unserer standardmäßigen Vite-basierten Projektvorlage wird Needle Engine bei der Bereitstellung in Ihre Web-App gebündelt. Dies sorgt für kleinere Dateien und optimiert die Ladezeiten.

::: tip Bundling und Tree Shaking

**Bundling** bedeutet, dass alle CSS-, JS- und andere Dateien, aus denen Ihr Projekt besteht, zur Build-Zeit zu weniger und kleineren Dateien zusammengefasst werden. Dies stellt sicher, dass anstatt zahlreiche kleine Skripte und Komponenten herunterzuladen, nur ein oder wenige heruntergeladen werden, die den minimal benötigten Code enthalten. Die Vite-Dokumentation enthält eine hervorragende Erklärung, warum Web-Apps gebündelt werden sollten: [Why Bundle for Production](https://vitejs.dev/guide/why.html)

**Tree Shaking** ist eine gängige Praxis in der Webentwicklung, bei der ungenutzter Code aus dem finalen Bundle entfernt wird, um die Dateigröße zu reduzieren. Dies ähnelt dem "Code Stripping" in Unity. [Die MSDN-Dokumentation](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) enthält eine gute Erklärung zu Tree Shaking.
:::

### Vite, Vue, React, Svelte, React Three Fiber...

Needle Engine ist unvoreingenommen bezüglich der Wahl des Frameworks. Unsere Standardvorlage verwendet das beliebte [vite](https://vitejs.dev) als Bundler. Von dort aus können Sie Vue, Svelte, Nuxt, React, React-Three-Fiber oder andere Frameworks hinzufügen, und wir haben Beispiele für viele davon. Sie können auch andere Bundler integrieren oder gar keinen verwenden – einfach reines HTML und Javascript.

Hier sind einige Beispiel-Tech-Stacks, die möglich sind und mit denen wir Needle Engine verwenden:

- **Vite + HTML** — Das ist, was unsere Standardvorlage verwendet!

- **Vite + Vue** — Das ist, was die Website von [Needle Tools](https://needle.tools) verwendet! Ein Beispiel zum Herunterladen finden Sie [hier](https://github.com/needle-tools/needle-engine-samples).
- **Vite + Svelte**
- **Vite + SvelteKit**
- **Vite + React** — Es gibt eine experimentelle Vorlage, die mit der Unity-Integration geliefert wird und die Sie bei der Projekterstellung auswählen können!
- **react-three-fiber** — Es gibt eine experimentelle Vorlage, die mit der Unity-Integration geliefert wird und die Sie bei der Projekterstellung auswählen können!
- **Vercel & Nextjs** — Ein [Beispiel-Nextjs-Projekt finden Sie hier](https://github.com/needle-engine/nextjs-sample)
- **CDN without any bundler** — Ein Codebeispiel finden Sie [hier](./vanilla-js.md)

Kurz gesagt: Wir stellen derzeit eine minimale Vite-Vorlage bereit, aber Sie können diese erweitern oder zu anderen Frameworks wechseln –
Lassen Sie uns wissen, was und wie Sie bauen, und wie wir das Erlebnis für Ihren Anwendungsfall verbessern oder ein Beispiel bereitstellen können!

:::tip
Einige Frameworks erfordern benutzerdefinierte Einstellungen in `needle.config.json`. Erfahren Sie mehr [hier](./reference/needle-config-json.md). Typischerweise muss die `baseUrl` festgelegt werden.
:::

:::details Wie erstelle ich eine benutzerdefinierte Projektvorlage in Unity?

Sie können Ihre eigenen Webprojektvorlagen erstellen und teilen, um andere Bundler, Build-Systeme oder gar keine zu verwenden.

**Eine neue Vorlage erstellen**
1. Wählen Sie `Create/Needle Engine/Project Template`, um ein ProjectTemplate in den Ordner einzufügen, den Sie als Vorlage verwenden möchten.
2. Fertig! So einfach ist das.

Die Abhängigkeiten kommen von Unity, wenn ein NpmDef im Projekt vorhanden ist (also wenn Ihr Projekt lokale Referenzen verwendet).
Sie könnten Ihre Pakete auch bei npm veröffentlichen und sie über die Versionsnummer referenzieren.
:::

## Eine PWA erstellen

Wir unterstützen die einfache Erstellung einer Progressive Web App (PWA) direkt aus unserer Vite-Vorlage.
PWAs sind Webanwendungen, die wie normale Webseiten oder Websites laden, aber Benutzerfunktionen wie Offline-Arbeit, Push-Benachrichtigungen und Zugriff auf Geräte-Hardware bieten können, die traditionell nur für native mobile Anwendungen verfügbar sind.

Standardmäßig verfügen mit Needle erstellte PWAs über Offline-Unterstützung und können optional automatisch aktualisiert werden, wenn Sie eine neue Version Ihrer App veröffentlichen.

1) Installieren Sie das [Vite PWA plugin](https://vite-pwa-org.netlify.app/) in Ihrem Webprojekt: `npm install vite-plugin-pwa --save-dev`
2) Ändern Sie Ihre `vite.config.js` wie unten gezeigt. Stellen Sie sicher, dass Sie dasselbe `pwaOptions`-Objekt sowohl an `needlePlugins` als auch an `VitePWA` übergeben.

```js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async ({ command }) => {

    // Erstellen Sie das pwaOptions-Objekt. 
    // Hier können Sie PWA-Einstellungen bearbeiten oder eingeben (z.B. den PWA-Namen ändern oder Icons hinzufügen).
    /** @type {import("vite-plugin-pwa").VitePWAOptions} */
    const pwaOptions = {};
  
    const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");

    return {
        plugins: [
            // übergeben Sie das pwaOptions-Objekt an die needlePlugins- und die VitePWA-Funktion
            needlePlugins(command, needleConfig, { pwa: pwaOptions }),
            VitePWA(pwaOptions),
        ],
        // der Rest Ihrer Vite-Konfiguration...
```

:::tip Alle Assets werden standardmäßig gecacht
Beachten Sie, dass standardmäßig alle Assets in Ihrem Build-Ordner dem PWA-Precache hinzugefügt werden – für große Anwendungen mit vielen dynamischen Assets ist dies möglicherweise nicht das, was Sie wollen (stellen Sie sich vor, die YouTube PWA cached alle Videos, sobald ein Benutzer die App öffnet!). Unter [Weitere PWA-Optionen](#more-pwa-options) erfahren Sie, wie Sie dieses Verhalten anpassen können.
:::

### PWAs testen

Um Ihre PWA zu testen, deployen Sie die Seite, zum Beispiel mit der `DeployToFTP`-Komponente.
Öffnen Sie dann die deployte Seite in einem Browser und prüfen Sie, ob die PWA-Features wie erwartet funktionieren:
- die App wird als installierbar angezeigt
- die App funktioniert offline
- die App wird von [pwabuilder.com](https://pwabuilder.com/) als offline-fähige PWA erkannt.

PWAs verwenden Service Worker, um Ressourcen zu cachen und Offline-Unterstützung bereitzustellen. Service Worker sind während der Entwicklung etwas schwieriger zu verwenden und werden typischerweise nur für Builds aktiviert (z. B. wenn Sie eine `DeployTo...`-Komponente verwenden).

Sie können die PWA-Unterstützung für die Entwicklung aktivieren, indem Sie Folgendes zum Options-Objekt in Ihrer `vite.config.js` hinzufügen.

```js
const pwaOptions = {
  // Hinweis: PWAs verhalten sich im Entwicklungsmodus anders. 
  // Stellen Sie sicher, dass Sie das Verhalten in Produktions-Builds überprüfen!
  devOptions: {
    enabled: true,
  }
};
```

Bitte beachten Sie, dass PWAs im Entwicklungsmodus keine Offline-Nutzung unterstützen – ein Versuch kann zu unerwartetem Verhalten führen.

### Automatische Aktualisierung laufender Apps

Websites zeigen normalerweise neue oder aktualisierte Inhalte beim Seiten-Refresh an.

In einigen Situationen möchten Sie, dass die Seite automatisch aktualisiert und neu geladen wird, wenn eine neue Version veröffentlicht wurde –
wie zum Beispiel in einem Museum, auf einer Messe, auf öffentlichen Displays oder in anderen langlebigen Szenarien.

Um automatische Updates zu aktivieren, setzen Sie die `updateInterval`-Eigenschaft im pwaOptions-Objekt auf eine Dauer (in Millisekunden), in der die App nach Updates suchen soll. Wenn ein Update erkannt wird, wird die Seite automatisch neu geladen.

```js
const pwaOptions = {
  updateInterval: 15 * 60 * 1000, // 15 Minuten, in Millisekunden
};
```

:::tip Periodische Neuladungen und Benutzerdaten
Es wird nicht empfohlen, automatische Neuladungen in Anwendungen zu verwenden, in denen Benutzer mit Formularen oder anderen Daten interagieren, die bei einer Neuladung verloren gehen könnten. Für diese Anwendungen wird empfohlen, einen Neulade-Prompt anzuzeigen.
Weitere Informationen zur Implementierung eines Neulade-Prompts anstelle von automatischem Neuladen finden Sie in der [Vite PWA plugin documentation](https://vite-pwa-org.netlify.app/guide/prompt-for-update.html).
:::

### Weitere PWA-Optionen

Da Needle unter der Haube das [Vite PWA plugin](https://vite-pwa-org.netlify.app/) verwendet, können Sie alle von diesem bereitgestellten Optionen und Hooks nutzen.
Zum Beispiel können Sie ein teilweises Manifest mit einem benutzerdefinierten App-Titel oder einer benutzerdefinierten Themenfarbe bereitstellen:

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

Für komplexe Anforderungen wie partielles Caching, benutzerdefinierte Service Worker oder verschiedene Aktualisierungsstrategien können Sie die Option `{ pwa: pwaOptions }` aus `needlePlugins` entfernen und die PWA-Funktionalität direkt über das Vite PWA plugin hinzufügen.

## Zugriff auf Needle Engine und Komponenten aus externem Javascript

Code, den Sie exponieren, kann nach dem Bundling aus JavaScript aufgerufen werden. Dies ermöglicht den Aufbau von Viewern und anderen Anwendungen, bei denen es eine Trennung zwischen Daten gibt, die zur Bearbeitungszeit bekannt sind, und Daten, die erst zur Laufzeit bekannt sind (z. B. dynamisch geladene Dateien, vom Benutzer generierte Inhalte).
Für den Zugriff auf Komponenten aus regulärem Javascript außerhalb der Engine siehe den Abschnitt [Interop mit regulärem Javascript](./scripting.md#accessing-needle-engine-and-components-from-anywhere)

## Anpassen des Ladebildschirms

Siehe den Abschnitt *Loading Display* in der [Needle Engine Komponentenreferenz](./reference/needle-engine-attributes.md).

### Eingebaute Stile

Die Lade-Optik von Needle Engine kann einen hellen oder dunklen Skin verwenden.
Um die Optik zu ändern, verwenden Sie das `loading-style`-Attribut auf der `<needle-engine>` Webkomponente.
Optionen sind `light` und `dark` (Standard):

``<needle-engine loading-style="light"></needle-engine>``

### Benutzerdefinierter Lade-Stil — *PRO Feature* #

Bitte siehe den Abschnitt *Loading Display* in der [Needle Engine Komponentenreferenz](./reference/needle-engine-attributes.md).

![Benutzerdefiniertes Laden](/imgs/custom-loading-style.webp)


Seite automatisch mit KI übersetzt