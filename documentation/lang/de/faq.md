---
title: Fragen und Antworten (FAQ) 💡
---


## Wie aktiviere ich meine Needle Engine Lizenz?

### Aktivieren der Lizenz in Unity

#### Needle Engine 4.x

Gehen Sie zu Project Settings/Needle und klicken Sie auf die Schaltfläche zum Anmelden. Folgen Sie den Schritten und melden Sie sich bei Ihrem Needle-Konto an.
Danach sehen Sie Ihre Kontoinformationen im Unity-Projekt-Einstellungen-Fenster. Wählen Sie das lizenzierte Team aus dem Dropdown-Menü aus.

#### Needle Engine 3.x

Öffnen Sie `Edit/Project Settings/Needle`, um zu den Plugin-Einstellungen für Needle Engine zu gelangen. Oben im Fenster finden Sie Felder zur Eingabe Ihrer Lizenzinformationen.
- `Email` - Geben Sie die E-Mail-Adresse ein, mit der Sie die Lizenz erworben haben
- `Invoice ID` - Geben Sie eine der Rechnungs-IDs ein, die Sie per E-Mail erhalten haben

Hinweis: Möglicherweise müssen Sie den lokalen Webserver neu starten, um die Lizenz anzuwenden.

![unity license window](/imgs/unity-needle-engine-license.jpg)

### Aktivieren der Lizenz in Blender
Öffnen Sie `Addon Preferences/Needle Engine`, um zu den Needle Engine Addon-Einstellungen zu gelangen
- `Email` - Geben Sie die E-Mail-Adresse ein, mit der Sie die Lizenz erworben haben
- `Invoice ID` - Geben Sie eine der Rechnungs-IDs ein, die Sie per E-Mail erhalten haben

Hinweis: Möglicherweise müssen Sie den lokalen Webserver neu starten, um die Lizenz anzuwenden.



## Meine lokale Webseite zeigt einen SSL-Fehler an, z.B. 'Ihre Verbindung ist nicht privat'

Abhängig von Ihrer lokalen Konfiguration sehen Sie möglicherweise eine Warnung in Ihrem Browser bezüglich SSL-Sicherheit.

Dies liegt daran, dass, obwohl die Verbindung verschlüsselt ist, standardmäßig kein SSL-Zertifikat vorhanden ist, das der Browser validieren kann.
Wenn das passiert: Klicken Sie auf `Advanced` und `Proceed to Site`. In Safari müssen Sie die Seite danach möglicherweise aktualisieren, da sie nicht automatisch fortfährt. Jetzt sollten Sie Ihre Szene im Browser sehen!

Der Dialog sollte nur einmal pro lokalem Server angezeigt werden

::: tip
Verbindungen sind gesichert, da wir HTTPS erzwingen, um sicherzustellen, dass WebXR und andere moderne Web-APIs sofort funktionieren. Einige Browser beschweren sich möglicherweise immer noch darüber, dass die SSL-Verbindung (zwischen Ihrem lokalen Entwicklungsserver und der lokalen Webseite) nicht automatisch vertrauenswürdig ist, und dass Sie manuell bestätigen müssen, dass Sie der Seite vertrauen. Automatische Seitenneuladung und Websocket-Verbindungen können ebenfalls betroffen sein, abhängig von den Browser- und Systemeinstellungen.

Informationen zum Einrichten eines selbstsignierten Zertifikats für eine reibungslosere Entwicklung finden Sie in den [Testing docs](./testing.md).
:::

![SLL warning on chrome](/videos/ssl-warning.gif)



## Meine lokale Webseite bleibt schwarz

Wenn das passiert, gibt es normalerweise eine Ausnahme entweder im Engine-Code oder in Ihrem Code. Öffnen Sie die Entwicklerwerkzeuge (<kbd>Strg + Shift + I</kbd> oder <kbd>F12</kbd> in Chrome) und prüfen Sie die Konsole auf Fehler.
In einigen Fällen, insbesondere wenn Sie gerade die Version des Needle Engine Pakets aktualisiert haben, kann dies durch Stoppen und erneutes Starten des lokalen Entwicklungsservers behoben werden.
Klicken Sie dazu auf die laufende Fortschrittsleiste in der unteren rechten Ecke des Editors und klicken Sie auf das kleine <kbd>X</kbd>, um die laufende Aufgabe abzubrechen. Drücken Sie dann einfach erneut auf Play.


## Meine Objekte sind nach dem Export weiß
Dies geschieht normalerweise, wenn Sie benutzerdefinierte Shader oder Materialien verwenden und deren Eigenschaften nicht sauber in bekannte Eigenschaftsnamen für den glTF-Export übersetzt werden.
Sie können entweder sicherstellen, dass Sie glTF-kompatible Materialien und Shader verwenden, oder Shader als "custom" markieren, um sie direkt zu exportieren.
- Lesen Sie mehr über empfohlene glTF-Workflows: <link>
- Lesen Sie mehr über benutzerdefinierte Shader: <link>


## Uncaught ReferenceError: NEEDLE_ENGINE_META is not defined / NEEDLE_USE_RAPIER is not defined

Wenn Sie vite oder next.js verwenden, stellen Sie sicher, dass Sie die Needle Engine Plugins zu Ihrer Konfiguration hinzufügen.
Beispiel für vite:
```js
const { needlePlugins } = await import('@needle-tools/engine/plugins/vite/index.js');
plugins: [needlePlugins(command, needleConfig)]
```
Beispiel für next.js
```js
const { needleNext } = await import("@needle-tools/engine/plugins/next/index.js");
return needleNext({}, { modules: { webpack } });
```
Sie können die fehlenden Variablen auch einfach z.B. in Ihrer Stamm-`index.html` in einem Skript-Tag wie folgt deklarieren:
```html
<script>
  var NEEDLE_ENGINE_META = {}
  var NEEDLE_USE_RAPIER = true;
</script>
```

## THREE.EXRLoader: provided file doesnt appear to be in OpenEXR format

Bitte stellen Sie sicher, dass Sie die Lightmap Encoding auf **Normal Quality** eingestellt haben.
Gehen Sie zu *Edit/Project Settings/Player*, um die Einstellung zu ändern.

![](/faq/lightmap_encoding.jpg)

## Meine Webseite wird zu groß / lädt langsam (zu viele MB)

Dies kann viele Gründe haben, aber einige häufige sind:
- zu viele Texturen oder Texturen sind zu groß
- Meshes haben zu viele Vertices
- Meshes haben Vertex-Attribute, die Sie eigentlich nicht benötigen (z.B. haben Normals und Tangents, aber Sie verwenden sie nicht)
- Objekte sind deaktiviert und werden nicht ignoriert – deaktivierte Objekte werden ebenfalls exportiert, falls Sie sie zur Laufzeit aktivieren möchten! Setzen Sie ihr Tag auf `EditorOnly`, um sie komplett vom Export auszuschließen.
- Sie haben mehrere `GltfObject` Komponenten in Ihrer Szene und alle haben `EmbedSkybox` aktiviert (Sie müssen die Skybox nur einmal pro exportierter Szene haben)

Wenn die Ladezeit selbst ein Problem darstellt, können Sie **versuchen, Ihren Inhalt in mehrere glb-Dateien aufzuteilen** und diese bei Bedarf zu laden (das ist es, was wir auf unserer Webseite tun). Damit dies funktioniert, können Sie Ihren Inhalt in Prefabs oder Scenes packen und von jedem Ihrer Skripte aus darauf verweisen. Bitte werfen Sie einen Blick auf [Scripting/Addressables in der Dokumentation](./scripting.md#assetreference-and-addressables).

## Meine UI rendert keinen Text

- Für Unity: Stellen Sie sicher, dass Sie die Komponente `UI/Legacy/Text` und **nicht** die Komponente `TextMeshPro - Text` verwenden

## Meine Skripte funktionieren nach dem Export nicht

- Ihr vorhandener C#-Code wird nicht unverändert exportiert, Sie müssen dafür passenden typescript / javascript schreiben.
- Needle verwendet typescript / javascript für Komponenten und generiert C#-Stubs dafür.
- Komponenten, die bereits passende JS haben, zeigen dies im Inspector an.

## Meine Lightmaps sehen anders/zu hell aus

Stellen Sie sicher, dass Sie die [Best Practices für Lightmaps](https://docs.needle.tools/lightmaps?utm_source=needle_docs) befolgen und lesen Sie über das [Mischen von gebackenen und nicht-gebackenen Objekten](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects)

## Meine Szene ist zu hell / Beleuchtung sieht anders aus als in Unity
Stellen Sie sicher, dass Ihre Lichter auf "Baked" oder "Realtime" eingestellt sind. "Mixed" wird derzeit nicht unterstützt.
- Lichter, die auf Mixed eingestellt sind (mit Lightmapping), beeinflussen Objekte in three.js zweimal, da es derzeit keine Möglichkeit gibt, Lightmap-Objekte von der Beleuchtung auszuschließen
- Der Faktor `Intensity Multiplier` für Skybox in `Lighting/Environment` wird derzeit nicht unterstützt und hat keinen Effekt in Needle Engine
  ![image](https://user-images.githubusercontent.com/5083203/185429006-2a5cd6a1-8ea2-4a8e-87f8-33e3afd080ec.png)
- Die Intensität von Lichtschatten kann aufgrund einer three.js-Begrenzung derzeit nicht geändert werden.

Siehe auch die Dokumentation über das [Mischen von gebackenen und nicht-gebackenen Objekten](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects).


## Meine Skybox-Auflösung ist niedrig? Wie ändere ich meine Skybox-Auflösung

- **Wenn Sie eine benutzerdefinierte Cubemap verwenden**: Sie können die Texture Import Settings der Skybox-Textur überschreiben (die Ihrer Cubemap zugewiesen ist)

  ![image](https://user-images.githubusercontent.com/5083203/188179104-1e078cda-3397-4ebe-aaf9-7faa23ee4904.png)


- **Wenn Sie die Standard-Skybox verwenden**: Fügen Sie eine `SkyboxExportSettings`-Komponente an einer beliebigen Stelle in Ihrer Szene hinzu, um die Standardauflösung zu überschreiben

  ![image](https://user-images.githubusercontent.com/5083203/188171443-578380ab-2036-4d70-a8a7-f8cd9da9f603.png)



## Meine Schatten sind nicht sichtbar oder abgeschnitten

Bitte beachten Sie die folgenden Punkte:
- Ihr Licht hat Schatten aktiviert (entweder Soft Shadow oder Hard Shadow)
- Ihre Objekte sind auf "Cast Shadows: On" eingestellt (siehe MeshRenderer-Komponente)
- Bei direktionalen Lichtern ist die Position des Lichts derzeit wichtig, da die Schattenkamera dort platziert wird, wo sich das Licht in der Szene befindet.



## Meine Farben sehen falsch aus

Stellen Sie sicher, dass Ihr Projekt auf Linear colorspace eingestellt ist.

![image](https://user-images.githubusercontent.com/5083203/191774978-66e9feb1-0551-4549-85d3-3e5b8021f162.png)



## Ich verwende Networking und Glitch und es funktioniert nicht, wenn mehr als 30 Personen gleichzeitig die Glitch-Seite besuchen

- Die Bereitstellung auf Glitch ist eine schnelle Methode zum Prototyping und kann sogar für einige kleine Produktionen funktionieren. Der kleine Server dort hat nicht die Leistung und Bandbreite, um viele Personen in einer persistenten Sitzung zu hosten.
- Wir arbeiten an anderen Networking-Ideen, aber in der Zwischenzeit können Sie die Webseite woanders hosten (mit node.js-Unterstützung) oder sie einfach remixen, um die Last auf mehrere Server zu verteilen. Sie können auch das [Networking-Backend-Paket](https://www.npmjs.com/package/@needle-tools/needle-tiny-networking-ws) selbst woanders hosten, wo es skalieren kann, z.B. in der Google Cloud.



## Meine Webseite hat keine AR/VR-Schaltflächen

- Stellen Sie sicher, dass Sie die `WebXR`-Komponente irgendwo innerhalb Ihres Stamm-`GltfObject` hinzufügen.
- Fügen Sie optional eine `AR Session Root`-Komponente zu Ihrem Stamm-`GltfObject` oder innerhalb der untergeordneten Hierarchie hinzu, um Platzierung, Skalierung und Ausrichtung für WebXR festzulegen.
- Fügen Sie optional eine `XR Rig`-Komponente hinzu, um zu steuern, wo Benutzer in VR starten


## Ich habe ein neues Skript in einer Sub-Szene erstellt, aber es funktioniert nicht
Beim Erstellen neuer Skripte in npmdefs in Sub-Szenen (d.h. einer Szene, die als Referenz aus einem Skript in Ihrer Root-Export-Szene exportiert wird) müssen Sie derzeit die Root-Szene erneut exportieren. Dies liegt daran, dass der Code-Gen, der für die Registrierung neuer Skripte verantwortlich ist, derzeit nur für Szenen mit einer `ExportInfo`-Komponente ausgeführt wird. Dies wird in Zukunft behoben werden.


## Mein lokaler Server startet nicht / Ich sehe keine Webseite

Der wahrscheinlichste Grund ist eine fehlerhafte Installation.
Prüfen Sie die Konsole und die `ExportInfo`-Komponente auf Fehler oder Warnungen.

Wenn diese Warnungen/Fehler nicht geholfen haben, versuchen Sie die folgenden Schritte der Reihe nach. Geben Sie ihnen etwas Zeit zum Abschließen. Stoppen Sie, sobald Ihr Problem behoben ist. Prüfen Sie die Konsole auf Warnungen und Fehler.
- Stellen Sie sicher, dass Sie die [Voraussetzungen](./getting-started/#prerequisites) befolgen.
- Installieren Sie Ihr Projekt, indem Sie Ihre `ExportInfo`-Komponente auswählen und auf `Install` klicken.
- Führen Sie eine saubere Installation durch, indem Sie Ihre `ExportInfo`-Komponente auswählen, Alt gedrückt halten und auf `Clean Install` klicken.
- Versuchen Sie, Ihr Webprojektverzeichnis in einem Befehlszeilentool zu öffnen und befolgen Sie diese Schritte:
- run ``npm install`` and then ``npm run dev-host``
- Stellen Sie sicher, dass sowohl das lokale Runtime-Paket (``node_modules/@needle-tools/engine``) als auch three.js (``node_modules/three``) installiert wurden.
- Sie können auch in beiden Verzeichnissen ``npm install`` ausführen.


## Funktioniert die C#-Komponentengenerierung auch nur mit javascript?
Während die Generierung von C#-Komponenten technisch auch mit Vanilla Javascript funktioniert, empfehlen wir es nicht und unterstützen es nicht vollständig, da es für den Generator mehr Ratespiel oder einfach unmöglich ist zu wissen, welchen C#-Typ er für Ihre Javascript-Klasse erstellen soll. Unten finden Sie ein minimales Beispiel, wie Sie eine Unity-Komponente aus Javascript generieren können, wenn Sie dies wirklich wünschen.
```js
import { Behaviour } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    //@type float
    myField = 5;
}
```


## Ich habe keine Schaltflächen wie "Generate Project" in meinen Komponenten/im Inspector

Bitte überprüfen Sie, ob Sie sich nicht versehentlich im Debug-Modus des Inspectors befinden – wechseln Sie zurück zu Normal:
![20220824-025011-S2GQ-Unity_lKlT-needle](https://user-images.githubusercontent.com/2693840/186291615-56e7ebdb-1221-4326-813d-f88526fa126c.png)


## Toktx kann nicht gefunden werden / toktx ist nicht installiert

- Stellen Sie sicher, dass Sie [toktx herunterladen und installieren](http://localhost:8080/docs/getting-started/.html#install-these-tools-for-production-builds)

- Unter Windows: Stellen Sie sicher, dass Sie toktx zu Ihren Systemumgebungsvariablen hinzugefügt haben. Möglicherweise müssen Sie Ihren Computer nach dem Hinzufügen neu starten, um die Umgebungsvariablen zu aktualisieren. Der Standardinstallationsort ist ``C:\Program Files\KTX-Software\bin``

![image](/imgs/ktx-env-variable.webp)


## Das Installieren des Webprojekts dauert ewig / wird nie fertig / EONET: no such file or directory
- **Stellen Sie sicher, dass Sie kein Projekt auf einem Laufwerk erstellen, das als exFAT formatiert ist**, da exFAT keine Symlinks unterstützt, was für Needle Engine für Unity vor Version 3.x erforderlich ist.
Sie können die Formatierung Ihrer Laufwerke mit den folgenden Schritten überprüfen:
1. Öffnen Sie "System Information" (entweder Windows-Taste und geben Sie dies ein oder geben Sie "msinfo32" in cmd ein)
2. Wählen Sie Components > Storage > Drives
3. Wählen Sie alles (<kbd>Strg + A</kbd>) auf der rechten Seite des Bildschirms aus und kopieren Sie dies (<kbd>Strg + C</kbd>) und fügen Sie es hier ein (<kbd>Strg + V</kbd>)

## NPM-Installation schlägt fehl und es gibt Fehler bezüglich Festplatte / IO
Stellen Sie sicher, dass sich Ihr Projekt auf einer Festplatte befindet, die bekanntermaßen mit node.js funktioniert. Hauptgrund für Fehler ist, dass die Festplatte keine Symlinks (Symbolische Links / Softlinks) unterstützt, was für das ordnungsgemäße Funktionieren von node.js eine Voraussetzung ist.
<kbd>NTFS</kbd>-Formatierung sollte immer funktionieren. Bekannte problematische Dateisystemformate sind <kbd>exFAT</kbd> und <kbd>FAT32</kbd>.

Um das Format Ihrer Laufwerke zu überprüfen, können Sie:
1. Öffnen Sie "System Information" (entweder <kbd>Windows-Taste</kbd> und geben Sie "System Information" ein oder geben Sie `msinfo32` in cmd <kbd>Windows + R</kbd> ein)
2. Wählen Sie "Components > Storage > Drives"
3. Dort können Sie alle Laufwerke und deren Formatierung aufgelistet sehen. Legen Sie Ihre Projekte auf ein Laufwerk, das NTFS formatiert ist.


## Ich erhalte Fehler mit "Unexpected token `@`. Expected identifier, string literal, numeric literal or ..."

Needle Engine verwendet typescript-Decorators für die Serialisierung.
Um diesen Fehler zu beheben, stellen Sie sicher, dass Sie `experimentalDecorators` in Ihrer tsconfig.json aktivieren.

## Ich erhalte beim Ausführen von npm-Befehlen unter Mac OS einen Fehler 'failed to load config ... vite.config.js'

Sie verwenden wahrscheinlich eine x86_64-Version von Unity auf einem (ARM) Apple Silicon Prozessor. Unity 2020.3 ist nur für x86_64 verfügbar, spätere Versionen haben auch Apple Silicon Versionen.
Unsere Unity-Integration, die npm aufruft, wird dies somit von einem x86_64-Prozess aus tun, was zur Verwendung der x86_64-Version von node und vite/esbuild führt. Wenn Sie danach versuchen, npm-Befehle im selben Projekt von einer Apple Silicon App (z.B. VS Code) aus auszuführen, wird npm sich über nicht übereinstimmende Architekturen mit einer langen Fehlermeldung beschweren.

Um dies zu beheben, verwenden Sie eine Apple Silicon Version von Unity (2021.1 oder höher).

Sie können dies auch temporär auf 2020.3 beheben, indem Sie den `node_modules`-Ordner löschen und ``npm install`` erneut von VS Code aus ausführen. Sie müssen `node_modules` erneut löschen, wenn Sie zurück zu Unity wechseln.

## Zirkulärer Referenzfehler

Dies kann passieren, wenn Sie z.B. einen `SceneSwitcher` (oder eine andere Komponente, die eine Szene oder ein Asset lädt) haben und das referenzierte Asset in Unity ein `GltfObject` enthält, das denselben Namen hat wie Ihre ursprüngliche Szene mit dem `SceneSwitcher`. Sie können dies in Unity überprüfen, wenn Sie einen Fehler erhalten, der in etwa lautet:

```
Failed to export ↑ YourSceneName.glb
you seem to have objects with the same name referencing each other.
```

Um dies zu beheben, können Sie:
- Entfernen Sie das `GltfObject` im referenzierten Prefab oder Scene
- Benennen Sie das GameObject mit der Komponente um, die die referenzierten Szenen lädt

Wenn dies das Problem nicht behebt, fragen Sie bitte [in unserem Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content).

## Meine Szene lädt nicht und die Konsole enthält eine Warnung mit 'circular references' oder 'failed to update active state'
Bitte lesen Sie den Abschnitt [Zirkulärer Referenzfehler](#circular-reference-error).

## Unterstützt meine Maschine WebGL 2?

Verwenden Sie einen Detector [wie diesen hier](https://get.webgl.org/webgl2/), um festzustellen, ob Ihr Gerät WebGL 2 unterstützt. Er gibt auch Hinweise auf mögliche Ursachen Ihres Problems, aber stellen Sie generell sicher, dass Sie Ihren Browser und Ihre Treiber aktualisiert haben. WebGL 1 wird nicht unterstützt.

#### Bekannte Geräte, die Probleme verursachen können:
- Lenovo Thinkpad - T495

## Ich möchte Needle AI mit meinem lokalen KI-Modell verwenden

Wenn Sie Ihre KI lokal ausführen möchten (oder müssen), können Sie die Needle llms.txt-Dateien als Kontext für Ihre lokale KI (z.B. Ollama) verwenden:

- [llms.txt](https://cloud.needle.tools/llms.txt)
- [llms-full.txt](https://cloud.needle.tools/llms-full.txt)


## Noch Fragen?
[Fragen Sie in unserem Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)

<a href="https://discord.needle.tools" target="_blank"><img height=20 src="https://img.shields.io/discord/717429793926283276?color=5562ea&label=Discord" /></a>

Seite automatisch von AI übersetzt