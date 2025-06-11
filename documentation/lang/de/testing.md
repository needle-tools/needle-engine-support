---
title: Testen auf lokalen Geräten
---

## Testen auf lokalen Geräten

Wenn Sie unsere Vorlagen verwenden, startet Needle Engine für Sie einen lokalen Entwicklungsserver. Drücken Sie einfach auf Play, und eine Website öffnet sich in Ihrem Standardbrowser, bereit zum Testen auf Ihrem lokalen Gerät. Für das Testen auf anderen Geräten im selben Netzwerk müssen Sie möglicherweise ein selbstsigniertes Zertifikat installieren (siehe unten).

Wenn Sie ein benutzerdefiniertes Setup / Framework verwenden, lesen Sie bitte die Dokumentation Ihres Frameworks, wie Sie einen sicheren lokalen Entwicklungsserver starten.

::: tip
Unser lokaler Server verwendet die IP-Adresse in Ihrem lokalen Netzwerk (z. B. `https://192.168.0.123:3000`) anstelle von `localhost:3000`. Dies ermöglicht es Ihnen, Ihr Projekt schnell von mobilen Geräten, VR-Brillen und anderen Maschinen im selben Netzwerk aus anzuzeigen und zu testen.

Wir verwenden HTTPS anstelle des älteren HTTP, da moderne leistungsfähige Web-APIs wie WebXR eine sichere Verbindung erfordern – das S steht für "secure".
:::

## Einrichten eines selbstsignierten Zertifikats für die Entwicklung

Verschiedene Betriebssysteme haben unterschiedliche Sicherheitsanforderungen für die lokale Entwicklung. Typischerweise funktioniert die Anzeige einer Website auch mit einem automatisch generierten, nicht vertrauenswürdigen Zertifikat, aber Browser können vor dem fehlenden Vertrauen warnen und einige Funktionen sind nicht verfügbar. Hier ist eine Zusammenfassung:

::: tip
Die Installation vertrauenswürdiger selbstsignierter Zertifikate auf Ihren Entwicklungsgeräten wird für eine reibungslose Entwicklungserfahrung empfohlen. Die Schritte finden Sie am Ende dieser Seite.
:::

**Standard – mit automatisch generiertem, nicht vertrauenswürdigem Zertifikat**
_Zeigt beim Öffnen des Projekts in einem Browser eine Zertifikatswarnung an._
_Verwendet das [vite-plugin-basic-ssl](https://github.com/vitejs/vite-plugin-basic-ssl) npm-Paket._

Wir verwenden websocket-Verbindungen zur Kommunikation zwischen dem Browser und dem lokalen Entwicklungsserver. Websockets erfordern eine sichere Verbindung (HTTPS), um zu funktionieren. Abhängig von der Plattform müssen Sie möglicherweise ein benutzerdefiniertes Zertifikat für die lokale Entwicklung einrichten. Android und Windows benötigen kein benutzerdefiniertes Zertifikat, aber iOS und MacOS schon.

| OS             | Anzeige im Browser<br/>(mit einer Sicherheitswarnung) | Automatische Neuladungen |
| -------------- | ------------------------------------------------ | ------------------------ |
| Windows        | (✓)                                              | ✓                        |
| Linux          | (✓)                                              | ✓                        |
| Android        | (✓)                                              | ✓                        |
| macOS          | (✓)                                              | ❌                       |
| iOS            | (✓ Safari and Chrome, after page reload)<br/>❌ Mozilla XR Viewer | ❌                       |
| Xcode Simulators | (✓ after page reload)                            | ❌                       |

**Mit einem selbstsignierten, vertrauenswürdigen Root-Zertifikat**
_Es wird keine Sicherheitswarnung angezeigt. Sie müssen das generierte Zertifikat auf Ihren Geräten installieren._
_Verwendet das [vite-plugin-mkcert](https://github.com/liuweiGL/vite-plugin-mkcert) npm-Paket._

| OS      | Anzeige im Browser | Automatische Neuladungen |
| ------- | ------------------ | ------------------------ |
| Windows | ✓                  | ✓                        |
| Linux   | ✓                  | ✓                        |
| Android | ✓                  | ✓                        |
| macOS   | ✓                  | ✓                        |
| iOS     | ✓                  | ✓                        |

### Generieren eines selbstsignierten Entwicklungszertifikats

- Klicken Sie in Unity/Blender auf "Open Workspace", um VS Code zu öffnen.

- Überprüfen Sie, ob Sie `vite-plugin-mkcert` anstelle von `vite-plugin-basic-ssl` verwenden (letzteres generiert kein vertrauenswürdiges Root-Zertifikat, das wir benötigen) in Ihrer `vite.config.ts` Datei:
  - Öffnen Sie `package.json`.
  - Entfernen Sie die Zeile mit `"@vitejs/plugin-basic-ssl"` aus `devDependencies`.
  - Öffnen Sie ein Terminal in VS Code und führen Sie `npm install vite-plugin-mkcert --save-dev` aus, um die neueste Version hinzuzufügen.
  - Öffnen Sie `vite.config.ts` und ersetzen Sie `import basicSsl from '@vitejs/plugin-basic-ssl'` durch `import mkcert from'vite-plugin-mkcert'`.
  - In `plugins: [`, ersetzen Sie `basicSsl(),` durch `mkcert(),`.
  - package.json sieht jetzt so aus:
  ![](/testing/switch-to-mkcert.webp)
- Führen Sie `npm run start` einmalig vom Terminal von VS Code aus aus.
  - Unter Windows öffnet sich ein neues Fenster und führt Sie durch die Erstellung und Installation des Zertifikats.
  - Unter MacOS fordert das Terminal Ihr Passwort an und generiert und installiert dann das Zertifikat.
  - Wenn Sie einen Fehler `Error: Port 3000 is already in use` erhalten, schließen Sie bitte den Server, der möglicherweise noch von Unity läuft.
- Das generierte Zertifikat wird automatisch auf der Maschine installiert, auf der Sie es generiert haben.
- Sie können den Terminalprozess wieder beenden.
- Von nun an verwendet das Drücken von Play in Unity/Blender das generierte Zertifikat für den lokalen Server, und es wird keine "Sicherheitswarnung" mehr angezeigt, da Ihr Browser nun die lokale Verbindung als vertrauenswürdig einstuft.

## Installieren des Zertifikats auf Ihren Entwicklungsgeräten

Auf Ihren Entwicklungsgeräten müssen Sie das generierte Zertifikat _installieren_ und dem OS erlauben, ihm zu _vertrauen_. Dies ist für jedes OS unterschiedlich. Für jedes benötigen Sie die generierte `rootCA.pem` Datei und senden sie an das Gerät, das Sie authentifizieren möchten.

**Unter Windows:** Finden Sie das Zertifikat in `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem`
**Unter MacOS:** Finden Sie das Zertifikat in `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem`

Senden Sie die Datei an sich selbst (z. B. per E-Mail, AirDrop, iCloud, USB, Slack, ...), damit Sie auf Ihren Entwicklungsgeräten darauf zugreifen können.

### Installieren des Zertifikats auf Android

1. Öffnen Sie die Datei. Sie werden aufgefordert, das Zertifikat zu installieren.

### Installieren des Zertifikats auf iOS / iPadOS / VisionOS
1. Öffnen Sie die Datei.
2. Sie werden aufgefordert, das Profil zu Ihrem Gerät _hinzuzufügen_. Bestätigen Sie.
3. Gehen Sie zu den Einstellungen.
4. Es gibt einen neuen Eintrag "Profil". Wählen Sie ihn aus und erlauben Sie, dass das Profil für dieses Gerät _aktiv_ ist.
5. Unter iOS / iPadOS müssen Sie auch "Root Certificate Trust" erlauben. Suchen Sie dazu nach `Trust` oder gehen Sie zu `Settings > General > About > Info > Certificate Trust Settings` und aktivieren Sie volles Vertrauen für das Root-Zertifikat.

::: tip
Das Zertifikat wird automatisch auf der Maschine installiert, auf der Sie es generiert haben. Für andere Maschinen im lokalen Netzwerk folgen Sie den Schritten unten, um ebenfalls eine vertrauenswürdige Verbindung herzustellen.
:::

### Installieren des Zertifikats auf einer anderen MacOS-Maschine
1. Öffnen Sie die Datei. Keychain Access öffnet sich und ermöglicht Ihnen die Installation des Zertifikats.
2. Möglicherweise müssen Sie "Trust" auf "Always allow" setzen.

### Installieren des Zertifikats auf einer anderen Windows-Maschine
1. Öffnen Sie `certmgr` ("Benutzerzertifikate verwalten"), indem Sie <kbd>Windows-Taste</kbd> + `certmgr` eingeben.
2. Wählen Sie in der linken Seitenleiste "Vertrauenswürdige Stammzertifizierungsstellen" aus.
3. Klicken Sie mit der rechten Maustaste auf "Zertifikate" und wählen Sie "Alle Aufgaben > Importieren".
4. Wählen Sie die Datei `rootCA.pem` aus (möglicherweise müssen Sie den Dateityp auf "Alle" ändern) und folgen Sie den Anweisungen.


Seite automatisch mit KI übersetzt