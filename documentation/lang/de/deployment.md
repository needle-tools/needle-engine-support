---
title: Bereitstellung und Optimierung
---

## Was bedeutet Bereitstellung (Deployment)?

Bereitstellung ist der Prozess, Ihre Anwendung öffentlich auf einer Website verfügbar zu machen. Needle Engine stellt sicher, dass Ihr Projekt so klein und schnell wie möglich ist, indem es die neuesten Komprimierungstechniken wie **KTX2**, **Draco** und **Meshopt** verwendet.

## Verfügbare Bereitstellungsziele

- [Needle Cloud](./cloud/#deploy-from-unity)
  Großartig für räumliche Webanwendungen und das Teilen von Assets.
- [Glitch](#deploy-to-glitch)
  Großartig zum Experimentieren und Hacken von serverseitigem Code.

- [Netlify](#deploy-to-netlify)
  Großartig zum Hosten Ihrer eigenen Website und benutzerdefinierten Domainnamen.
- [itch.io](#deploy-to-itch.io)
  Wird oft für Spiele verwendet.
- [GitHub Pages](#deploy-to-github-pages)
  Kostenloses statisches Seiten-Hosting.
- [Vercel](#deploy-to-vercel)
  Plattform für Frontend-Entwickler
- [FTP Upload](#deploy-to-ftp)
  Direkte Bereitstellung auf jedem Server mit FTP-Unterstützung. Sowohl FTP als auch SFTP werden unterstützt.
- [Build to folder](#build-to-folder)
  Wenn Sie in einen Ordner bauen, können Sie die Dateien auf jeden Webserver oder anderen Hosting-Service hochladen.
- [Facebook Instant Games](#deploy-to-facebook-instant-games)
  Spieleplattform auf Facebook und Facebook Messenger.

::: tip Fehlt Ihnen etwas?
Lassen Sie es uns bitte in unserem [Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) wissen!
:::

## Development Builds

Siehe die obigen Anleitungen, wie Sie die Optionen in Ihrem Editor (z.B. Unity oder Blender) aufrufen können.

Der Hauptunterschied zu einem Production Build ist, dass er keine [ktx2](https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html)- und [draco](https://google.github.io/draco/)-Komprimierung durchführt (zur Reduzierung der Dateigröße und Ladegeschwindigkeit) sowie die Option zum progressiven Laden von hochauflösenden Texturen.

Wir empfehlen im Allgemeinen, Production Builds für optimierte Dateigröße und Ladegeschwindigkeit zu erstellen (siehe weitere Informationen unten).

## Production Builds

Um einen Production Build zu erstellen, müssen Sie [toktx](https://github.com/KhronosGroup/KTX-Software/releases) installiert haben, das Texturkomprimierung im KTX2 Superkomprimierungsformat bereitstellt. Bitte gehen Sie zur [toktx Releases Page](https://github.com/KhronosGroup/KTX-Software/releases) und laden Sie die neueste Version (zum Zeitpunkt des Schreibens v4.1.0) herunter und installieren Sie sie. Möglicherweise müssen Sie Unity nach der Installation neu starten.
*Wenn Sie sicher sind, dass Sie toktx installiert haben und es Teil Ihres PATH ist, aber immer noch nicht gefunden werden kann, starten Sie bitte Ihren Computer neu und versuchen Sie den Build erneut.*

:::details Erweitert: Benutzerdefinierte glTF-Erweiterungen
Wenn Sie planen, Ihre eigenen benutzerdefinierten glTF-Erweiterungen hinzuzufügen, erfordert das Bauen für die Produktion die Handhabung dieser in ``gltf-transform``. Siehe [@needle-tools/gltf-build-pipeline](https://www.npmjs.com/package/@needle-tools/gltf-build-pipeline) als Referenz.
:::

### Optimierungs- und Komprimierungsoptionen

### Texturkomprimierung
Production Builds komprimieren Texturen standardmäßig mit **KTX2** (entweder ETC1S oder UASTC, abhängig von ihrer Verwendung im Projekt).
Sie können aber auch die **WebP**-Komprimierung auswählen und eine Qualitätsstufe wählen.

#### Wie wähle ich zwischen ETC1S-, UASTC- und WebP-Komprimierung?

| Format | ETC1S | UASTC | WebP |
| --- | --- | --- | --- |
| **GPU-Speicherverbrauch** | Gering | Gering | Hoch (unkomprimiert) |
| **Dateigröße** | Gering | Hoch | Sehr gering |
| **Qualität** | Mittel | Sehr hoch | Abhängig von der Qualitätseinstellung |
| **Typische Verwendung** | Funktioniert für alles, am besten für Farbtexturen | Hochdetaillierte Datentexturen: Normal Maps, Roughness, Metallic usw. | Dateien, bei denen die ETC1S-Qualität nicht ausreicht, UASTC aber zu groß ist |

Sie haben die Möglichkeit, Texturkomprimierungs- und progressive Ladeoptionen pro Textur auszuwählen, indem Sie den Needle Texture Importer in Unity oder im Material-Tab in Blender verwenden.

:::details Unity: Wie kann ich Komprimierungseinstellungen pro Textur festlegen?
![image](/imgs/unity-texture-compression.jpg)
![image](/imgs/unity-texture-compression-options.jpg)
:::

:::details Blender: Wie kann ich Komprimierungseinstellungen pro Textur festlegen?
Wählen Sie den Material-Tab. Sie sehen Komprimierungsoptionen für alle Texturen, die von diesem Material verwendet werden.
![Komprimierungsoptionen für Texturen in Blender](/blender/texture-compression.webp)
:::

:::details Toktx kann nicht gefunden werden
  Windows: Stellen Sie sicher, dass Sie toktx zu Ihren Systemumgebungsvariablen hinzugefügt haben. Möglicherweise müssen Sie Ihren Computer nach dem Hinzufügen neu starten, um die Umgebungsvariablen zu aktualisieren. Der Standardinstallationsort ist ``C:\Program Files\KTX-Software\bin``
  ![image](/imgs/ktx-env-variable.webp)
:::

### Mesh-Komprimierung

Standardmäßig komprimiert ein Production Build Meshes mithilfe der Draco-Komprimierung. Verwenden Sie die Komponente `MeshCompression`, um pro exportiertem glTF zwischen draco und mesh-opt zu wählen.
Zusätzlich können Sie in den Mesh-Importeinstellungen (Unity) eine Mesh-Vereinfachung einrichten, um die Polygonanzahl für Production Builds zu reduzieren. Wenn Sie Ihre Anwendung im Browser anzeigen, können Sie `?wireframe` an Ihre URL anhängen, um die Meshes als Drahtmodell anzuzeigen.

#### Wie wähle ich zwischen Draco und Meshopt?
| Format | Draco | Meshopt |
| --- | --- | --- |
| **GPU-Speicherverbrauch** | Mittel | Gering |
| **Dateigröße** | Am geringsten | Gering |
| **Animationskomprimierung** | Nein | Ja |

:::details Wie kann ich draco- und meshopt-Komprimierungseinstellungen festlegen?
Fügen Sie die MeshCompression-Komponente hinzu, um auszuwählen, welche Komprimierung pro exportiertem glTF angewendet werden soll.

![image](/imgs/unity-mesh-compression-component.jpg)
- Um die Komprimierung für die **aktuelle Szene** zu ändern, fügen Sie sie einfach irgendwo in Ihrer Root-Szene hinzu.
- Um die Komprimierung für ein **Prefab oder NestedGltf** zu ändern, fügen Sie sie einem `GltfObject` oder dem Prefab hinzu, auf das durch eine Ihrer Komponenten verwiesen/exportiert wird.
- Um die Komprimierung für eine **referenzierte Szene** zu ändern, fügen Sie sie einfach der referenzierten Szene hinzu, die exportiert wird.
:::

:::details Wo finde ich Optionen zur Mesh-Vereinfachung, um die Scheitelpunktanzahl beim Bauen für die Produktion zu reduzieren?
Wählen Sie ein Mesh aus und öffnen Sie die Needle Importer Optionen, um die verfügbaren Optionen für das ausgewählte Mesh anzuzeigen:
![image](/imgs/unity-mesh-simplification.jpg)
:::

### Progressive Texturen

Sie können auch die Komponente `Progressive Texture Settings` irgendwo in Ihrer Szene hinzufügen, damit alle Texturen in Ihrem Projekt progressiv geladen werden. Progressives Laden wird derzeit nicht auf Lightmaps oder Skybox-Texturen angewendet.

Beim progressiven Laden werden Texturen zuerst in einer niedrigeren Auflösung geladen. Eine Version in voller Qualität wird dynamisch geladen, wenn die Textur sichtbar wird. Dies reduziert normalerweise die anfängliche Ladezeit Ihrer Szene erheblich.

:::details Wie kann ich das progressive Laden von Texturen aktivieren?
### Progressive Texturen können pro Textur<br/>oder für alle Texturen in Ihrem Projekt aktiviert werden:
![image](/imgs/unity-texture-compression.jpg)
### Aktivieren für alle Texturen im Projekt, die keine andere spezifische Einstellung haben:
![image](/imgs/unity-progressive-textures.jpg)
:::

### Automatische Mesh-LODs (Level of Detail)

Seit Needle Engine 3.36 generieren wir automatisch LOD-Meshes und wechseln zur Laufzeit zwischen ihnen. LODs werden bei Bedarf geladen und nur dann, wenn sie benötigt werden, sodass diese Funktion sowohl Ihre Ladezeit als auch die Performance reduziert.

**Hauptvorteile**
- Schnellere anfängliche Ladezeit
- Schnellere Renderzeit durch durchschnittlich weniger Scheitelpunkte auf dem Bildschirm
- Schnelleres Raycasting durch die Verwendung von LOD-Meshes

Sie können die LOD-Generierung entweder für Ihr gesamtes Projekt in der Komponente `Progressive Loading Settings` oder in den Mesh Importer Einstellungen deaktivieren.

![image](/imgs/unity-lods-settings-1.jpg)

![image](/imgs/unity-lods-settings-2.jpg)


## Bereitstellungsoptionen

### Bereitstellung auf Glitch 🎏

[Glitch](https://glitch.com/) bietet eine schnelle und kostenlose Möglichkeit für jedermann, kleine und große Websites zu hosten. Wir bieten eine einfache Möglichkeit, einen neuen Glitch-Seite zu remixen und bereitzustellen (basierend auf unserem Starter), und bei Bedarf auch einen minimalistischen Netzwerkserver auf derselben Glitch-Seite auszuführen.

Sie können auf Glitch bereitstellen, indem Sie die Komponente `DeployToGlitch` zu Ihrer Szene hinzufügen und den Anweisungen folgen.

Beachten Sie, dass kostenlose Projekte, die auf Glitch gehostet werden, ~100 MB nicht überschreiten dürfen. Wenn Sie ein größeres Projekt hochladen müssen, sollten Sie ein anderes Bereitstellungsziel in Betracht ziehen.

:::details Wie stelle ich von Unity auf Glitch bereit?

1) Fügen Sie die Komponente ``DeployToGlitch`` zu dem GameObject hinzu, das auch die Komponente ``ExportInfo`` hat.

2) Klicken Sie auf die Schaltfläche ``Create new Glitch Remix`` in der Komponente
   ![image](/deployment/deploytoglitch-1.jpg)
3) Glitch erstellt nun einen Remix der Vorlage. Kopieren Sie die URL aus Ihrem Browser
   ![image](https://user-images.githubusercontent.com/5083203/179834901-f28852a9-6b06-4d87-8b5b-0384768c92c1.png)
4) Öffnen Sie Unity erneut und fügen Sie die URL in das Feld ``Project Name`` Ihrer Komponente ``Deploy To Glitch`` ein
  ![image](https://user-images.githubusercontent.com/5083203/179835274-033e5e1d-b70d-4b13-95ad-f1e2f159b14e.png)
5) Warten Sie ein paar Sekunden, bis Unity Ihren Bereitstellungsschlüssel von Glitch erhalten hat (dieser Schlüssel wird sicher in der `.env`-Datei auf Glitch gespeichert. Teilen Sie ihn nicht mit anderen, jeder, der diesen Schlüssel hat, kann auf Ihre Glitch-Website hochladen).
  ![Warten auf den Schlüssel](/deployment/deploytoglitch-2.jpg)
6) Sobald der Bereitstellungsschlüssel empfangen wurde, können Sie auf die Schaltfläche `Build & Deploy` klicken, um auf Glitch hochzuladen.

:::

:::details Wie stelle ich von Blender auf Glitch bereit?

![Deploy To Glitch Komponente von Blender](/blender/deploy_to_glitch.webp)

1) Suchen Sie das Deploy To Glitch Panel im Scene-Tab.
2) Klicken Sie auf die Schaltfläche ``Remix on glitch`` in der Komponente.
3) Ihr Browser öffnet die Glitch-Projektvorlage.
4) Warten Sie, bis Glitch ein neues Projekt generiert hat.
5) Kopieren Sie die Projekt-URL und fügen Sie sie als Projektnamen in das Blender DeployToGlitch Panel ein (Sie können die vollständige URL einfügen, das Panel extrahiert die notwendigen Informationen).
6) Öffnen Sie auf Glitch die Datei ``.env`` und geben Sie ein Passwort in das Feld ``Variable Value`` neben **DEPLOY_KEY** ein.
7) Geben Sie dasselbe Passwort in Blender in das Feld `Key` ein.
8) Klicken Sie auf die Schaltfläche `DeployToGlitch`, um Ihr Projekt zu bauen und auf Glitch hochzuladen. Nach Abschluss des Uploads öffnet sich ein Browser. Versuchen Sie, die Seite zu aktualisieren, wenn sie nach dem Öffnen schwarz angezeigt wird.
:::

#### Fehlerbehebung bei Glitch

Wenn Sie auf `Create new Glitch Remix` klicken und der Browser einen Fehler wie `there was an error starting the editor` anzeigt, können Sie auf **OK** klicken. Gehen Sie dann zu [glitch.com](https://glitch.com/) und stellen Sie sicher, dass Sie angemeldet sind. Danach können Sie erneut versuchen, die Schaltfläche in Unity oder Blender zu klicken.

### Bereitstellung auf Netlify
:::details Wie stelle ich von Unity auf Netlify bereit?
Fügen Sie einfach die Komponente `DeployToNetlify` zu Ihrer Szene hinzu und folgen Sie den Anweisungen. Sie können neue Projekte per Klick erstellen oder auf bestehende Projekte bereitstellen.

![Deploy to netlify Komponente](/deployment/deploytonetlify-2.jpg)

![Deploy to netlify Komponente](/deployment/deploytonetlify.jpg)
:::

### Bereitstellung auf Vercel

1) Erstellen Sie ein neues Projekt auf Vercel
2) Fügen Sie Ihr Webprojekt einem GitHub-Repository hinzu
3) Fügen Sie das Repository Ihrem Projekt auf Vercel hinzu

Siehe unser [Beispielprojekt](https://github.com/needle-engine/nextjs-sample) für die Projektkonfiguration

### Bereitstellung auf itch.io

:::details Wie stelle ich von Unity auf itch.io bereit?
1) Erstellen Sie ein neues Projekt auf [itch.io](https://itch.io/game/new)
2) Setzen Sie ``Kind of project`` auf ``HTML``
  ![image](https://user-images.githubusercontent.com/5083203/191211856-8a114480-bae7-4bd1-868e-2e955587acd7.png)
3) Fügen Sie die Komponente ``DeployToItch`` zu Ihrer Szene hinzu und klicken Sie auf die Schaltfläche ``Build``
  ![image](https://user-images.githubusercontent.com/5083203/193812540-1881837e-ed9e-49fc-9658-52e5a914299a.png)

4) Warten Sie, bis der Build abgeschlossen ist. Es wird ein Ordner mit dem endgültigen ZIP-Archiv geöffnet, wenn er fertig ist.
5) Laden Sie das endgültige ZIP-Archiv auf itch.io hoch.
  ![20220920-104629_Create_a_new_project_-_itch io_-_Google_Chrome-needle](https://user-images.githubusercontent.com/5083203/191212661-f626f0cb-bc8e-4738-ad2c-3982aca65f39.png)
6) Wählen Sie ``This file will be played in the browser``
  ![image](https://user-images.githubusercontent.com/5083203/191212967-00b687f3-bf56-449e-880c-d8daf8a52247.png)
7) Speichern Sie Ihre itch.io-Seite und sehen Sie sich die itch.io-Projektseite an.
  Ihr Needle Engine-Projekt sollte nun geladen werden 😊

#### Optionale Einstellungen
![image](https://user-images.githubusercontent.com/5083203/191217263-355d9b72-5431-4170-8eca-bfbbb39ae810.png)
:::

:::details Itch.io: failed to find index.html

#### Failed to find index.html
![image](https://user-images.githubusercontent.com/5083203/191213162-2be63e46-2a65-4d41-a713-98c753ccb600.png)
Wenn Sie diesen Fehler nach dem Hochladen Ihres Projekts sehen, stellen Sie sicher, dass Sie keine gzippte index.html hochladen.
Sie können die gzip-Komprimierung in ``vite.config.js`` in Ihrem Needle Webprojektordner deaktivieren. Entfernen Sie einfach die Zeile mit ``viteCompression({ deleteOriginFile: true })``. Erstellen Sie dann Ihr Projekt erneut und laden Sie es auf itch.io hoch.

:::

### Bereitstellung auf FTP

:::details Wie stelle ich von Unity auf meinen FTP-Server bereit?
1) Fügen Sie die Komponente ``DeployToFTP``¹ auf einem GameObject in Ihrer Szene hinzu (es ist ratsam, sie demselben GameObject wie ExportInfo hinzuzufügen - es ist jedoch nicht zwingend erforderlich).
2) Weisen Sie ein FTP-Server-Asset zu und füllen Sie Server, Benutzernamen und Passwort aus, falls Sie dies noch nicht getan haben ².
  *Dieses Asset enthält die Zugangsdaten zu Ihrem FTP-Server - Sie erhalten diese, wenn Sie ein neues FTP-Konto bei Ihrem Hosting-Provider erstellen.*
3) Klicken Sie auf die Schaltfläche <kbd>Build & Deploy</kbd> in der Komponente ``DeployToFTP``, um Ihr Projekt zu bauen und es auf Ihr FTP-Konto hochzuladen.


![Deploy to FTP Komponente in Unity](/deployment/deploytoftp.jpg)
*¹ Deploy to FTP Komponente*

![FTP Server Asset](/deployment/deploytoftp2.jpg)
*² FTP Server Asset enthält die Zugangsdaten Ihres FTP-Benutzerkontos*

![Deploy to FTP Komponente in Unity mit zugewiesenem Server Asset](/deployment/deploytoftp3.jpg)
*Deploy To FTP Komponente, nachdem das Server Asset zugewiesen wurde. Sie können direkt in einen Unterordner auf Ihrem Server bereitstellen, indem Sie das Pfadfeld verwenden.*
:::

:::details Wie stelle ich manuell auf meinen FTP-Server bereit?

1) Öffnen Sie `File > Build Settings`, wählen Sie `Needle Engine` und klicken Sie auf <kbd>Build</kbd>
2) Warten Sie, bis der Build abgeschlossen ist - der resultierende `dist`-Ordner wird nach Abschluss aller Build- und Komprimierungsschritte automatisch geöffnet.
3) Kopieren Sie die Dateien aus dem `dist`-Ordner auf Ihren FTP-Speicherplatz.

**Das war's!** 😉

![20220830-003602_explorer-needle](https://user-images.githubusercontent.com/2693840/187311461-e6afb2d7-5761-48cf-bacb-1c1733bb768b.png)

> **Hinweis**: Wenn das Ergebnis nach dem Hochladen nicht funktioniert, kann es sein, dass Ihr Webserver das Servieren von gzippten Dateien nicht unterstützt. Sie haben zwei Optionen, um das Problem zu beheben:
Option 1: Sie können versuchen, die gzip-Komprimierung auf Ihrem Server mithilfe einer .htaccess-Datei zu aktivieren!
Option 2: Sie können die gzip-Komprimierung in den Build-Einstellungen unter File/Build Window deaktivieren, indem Sie die Needle Engine Plattform auswählen.

> **Hinweis**: Wenn Sie während der Komprimierung Fehler erhalten, lassen Sie es uns bitte wissen und melden Sie einen Fehler! Wenn Ihr Projekt lokal funktioniert und nur bei Production Builds fehlschlägt, können Sie sofort weiterarbeiten, indem Sie einen Development Build erstellen. Aktivieren Sie dazu einfach die Checkbox `Development Build` in den Build Settings.

![Unity Build-Fenster zeigt die Needle Engine Plattform](/deployment/buildoptions_gzip.jpg)

:::

#### gzip mithilfe einer .htaccess-Datei aktivieren
Um die gzip-Komprimierung auf Ihrem FTP-Server zu aktivieren, können Sie eine Datei namens `.htaccess` in dem Verzeichnis, in das Sie hochladen möchten (oder einem übergeordneten Verzeichnis), erstellen.
Fügen Sie den folgenden Code in Ihre `.htaccess`-Datei ein und speichern/laden Sie sie auf Ihren Server hoch:
```
<IfModule mod_mime.c>
RemoveType .gz
AddEncoding gzip .gz
AddType application/javascript .js.gz
```

### Bereitstellung auf Github Pages
:::details Wie stelle ich von Unity auf Github Pages bereit?

Fügen Sie die Komponente DeployToGithubPages zu Ihrer Szene hinzu und kopieren Sie das GitHub-Repository (oder die GitHub Pages URL), auf das Sie bereitstellen möchten.
![Deploy To github pages Komponente](/deployment/deploytogithubpages.jpg)

<video-embed src="https://www.youtube.com/watch?v=Vyk3cWB6u-c" />

:::

#### Fehlerbehebung bei github pages
- **Ich habe auf GitHub Pages bereitgestellt, aber es wird keine Aktion ausgeführt / die Website ist nicht live.**
   - Wenn Sie zum ersten Mal bereitgestellt haben, kann es ein paar Minuten dauern, bis Ihre Website verfügbar ist. Sie können den Tab **Actions** auf GitHub (`/actions`) überprüfen, um den Bereitstellungsprozess zu sehen.
   - Wenn Ihre Website nach ein paar Minuten nicht live ist oder Sie keine Workflow-Ausführung im Tab **Actions** auf GitHub sehen, gehen Sie zur **Github Pages** Einstellungsseite (`/settings/pages`) und stellen Sie sicher, dass die **Branch** auf *gh-pages* eingestellt ist.

### Bereitstellung für Facebook Instant Games

Mit Needle Engine können Sie automatisch für Facebook Instant Games bauen.
Es sind keine manuellen Anpassungen Ihrer Web-App oder Ihres Spiels erforderlich.

:::details Wie stelle ich von Unity für Facebook Instant Games bereit?
- Fügen Sie die Komponente `Deploy To Facebook Instant Games` zu Ihrer Szene hinzu:
  ![Deploy to facebook instant games Komponente](/deployment/deploytofacebookinstantgames.jpg)
- Klicken Sie auf die Schaltfläche `Build For Instant Games`.
- Nach Abschluss des Builds erhalten Sie ein ZIP-Archiv, das Sie in Ihre Facebook-App hochladen können.
- Fügen Sie auf Facebook das Modul `Instant Games` hinzu und gehen Sie zu `Instant Games/Web hosting`.
  ![Hosting für facebook instant games](/deployment/deploytofacebookinstantgames-hosting.jpg)
- Sie können Ihr ZIP-Archiv mit der Schaltfläche `Upload version` (1) hochladen. Nachdem der Upload abgeschlossen und das ZIP-Archiv verarbeitet wurde, klicken Sie auf die Schaltfläche `Stage for testing`, um Ihre App zu testen (2, hier die blaue Schaltfläche) oder `Push to production` (die Schaltfläche mit dem Sternsymbol).
  ![Laden Sie das Zip-Archiv auf facebook instant games hoch](/deployment/deploytofacebookinstantgames-upload.jpg)
- Das war's – Sie können dann neben jeder Version auf die Schaltfläche `Play` klicken, um Ihr Spiel auf Facebook zu testen.

:::

:::details Wie erstelle ich eine App auf Facebook (mit Instant Games Fähigkeiten)?

1) [Erstellen Sie eine neue App](https://developers.facebook.com/apps/creation/) und wählen Sie `Other`. Klicken Sie dann auf `Next`.
  ![Erstellen Sie eine facebook instant games app](/deployment/facebookinstantgames-1.jpg)

2) Wählen Sie den Typ `Instant Games`.
  ![Erstellen Sie eine facebook instant games app](/deployment/facebookinstantgames-2.jpg)

3) Nach dem Erstellen der App fügen Sie das Produkt `Instant Games` hinzu.
  ![Fügen Sie das Produkt instant games hinzu](/deployment/facebookinstantgames-3.jpg)

Hier finden Sie [die offizielle Instant Games Dokumentation](https://developers.facebook.com/docs/games/build/instant-games) auf Facebook.
**Hinweis**: Alles, was Sie tun müssen, ist eine App mit Instant Games Fähigkeiten zu erstellen.
Wir kümmern uns um alles andere, und es sind keine manuellen Anpassungen Ihrer Needle Engine Website erforderlich.
:::

## In einen Ordner bauen

Öffnen Sie in Unity ``File/Build Settings`` und wählen Sie ``Needle Engine`` für die Optionen:

![image](/imgs/unity-build-window-menu.jpg)

![image](/imgs/unity-build-window.jpg)

Um Ihr Webprojekt für den Upload auf jeden Webserver zu bauen, können Sie in den Unity Editor Build Settings auf **Build** klicken. Sie können die Checkbox ``Development Build`` aktivieren, um die Komprimierung zu überspringen (siehe unten), die toktx auf Ihrem Computer erfordert.

Um Ihren endgültigen Build lokal anzuzeigen, können Sie die Schaltfläche `Preview Build` am unteren Rand des Fensters verwenden. Diese Schaltfläche führt zuerst einen regulären Build durch und startet dann einen lokalen Server in dem Verzeichnis mit den endgültigen Dateien, sodass Sie sehen können, was Sie erhalten, sobald Sie diese Dateien auf Ihren Webserver hochladen.

Nodejs wird **nur** während der Entwicklung benötigt. Die verteilte Website (unter Verwendung unserer standardmäßigen vite-Vorlage) ist eine statische Seite, die nicht auf Nodejs angewiesen ist und auf jedem regulären Webserver gehostet werden kann. Nodejs ist erforderlich, wenn Sie unseren minimalistischen Netzwerkserver auf demselben Webserver ausführen möchten (automatisch im Glitch-Bereitstellungsprozess enthalten).

---

## Cross-Plattform-Bereitstellungs-Workflows

Es ist möglich, reguläre Unity-Projekte zu erstellen, bei denen Sie sowohl für Needle Engine als auch für reguläre Unity-Plattformen wie Desktop oder sogar WebGL bauen können. Unser "Komponenten-Mapping"-Ansatz bedeutet, dass keine Laufzeitlogik innerhalb von Unity geändert wird – wenn Sie möchten, können Sie regelmäßig den Play Mode verwenden und für andere Zielplattformen bauen. In einigen Fällen bedeutet dies, dass Sie doppelte Code haben (C#-Code und entsprechende TypeScript-Logik). Der Mehraufwand hängt dabei von Ihrem Projekt ab.

**Play Mode in Unity starten**
In den `Project Settings > Needle Engine` können Sie `Override Play Mode` und `Override Build settings` deaktivieren, um zwischen dem Build-Prozess von Needle und dem Build-Prozess von Unity zu wechseln:
![image](https://user-images.githubusercontent.com/2693840/187308490-5acb9016-ffff-4113-be62-4de450a42b08.png)

## Needle Engine Befehlszeilenargumente für Unity

Needle Engine für Unity unterstützt verschiedene Befehlszeilenargumente, um einzelne Assets (Prefabs oder Szenen) zu exportieren oder ein ganzes Webprojekt im Batch-Modus (ohne Fenster) zu bauen.

Die folgende Liste gibt eine Tabelle über die verfügbaren Optionen:

| | |
| -- | -- |
| `-scene` | Pfad zu einer Szene oder einem Asset, das exportiert werden soll, z.B. `Assets/path/to/myObject.prefab` oder `Assets/path/to/myScene.unity` |
| `-outputPath <path/to/output.glb>` | Legt den Ausgabepfad für den Build fest (nur gültig beim Bauen einer Szene) |
| `-buildProduction` | Führt einen Production Build aus |
| `-buildDevelopment` | Führt einen Development Build aus |
| `-debug` | Öffnet ein Konsolenfenster zum Debugging |
Seite automatisch übersetzt durch AI