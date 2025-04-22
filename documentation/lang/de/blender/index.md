---
title: Needle Engine für Blender
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <img src="/blender/logo.png" style="max-height:70px;" />
</div>

# Needle Engine für Blender

Needle Engine für Blender ermöglicht es Ihnen, hochgradig interaktive, flexible und leichtgewichtige Webanwendungen direkt in Blender zu erstellen. Nutzen Sie die leistungsstarken Werkzeuge von Blender, um Ihre 3D-Szenen visuell einzurichten, zu animieren und zu gestalten.

## Das Blender Add-on installieren

<ClientOnly>

Stellen Sie sicher, dass Sie <a target="_blank" href="https://www.blender.org/download/"><strong>Blender</strong> 4.1 oder 4.2</a> und <os-link windows_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi" osx_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0.pkg"><strong>node.js</strong></os-link> installiert haben.
</ClientOnly>

<NoDownloadYet>
    <needle-button
        event_goal="download_blender"
        event_position="getting_started"
        large
        href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"
        same_tab
        next_url="/docs/blender/"
        >
        <strong>Needle Engine für Blender herunterladen</strong>
    </needle-button>
</NoDownloadYet>

1. Gehen Sie in Blender zu `Edit > Preferences > Add-ons` und klicken Sie auf den Dropdown-Pfeil, um die Schaltfläche `Install from Disk` zu finden.

2. Wählen Sie die heruntergeladene ZIP-Datei (benannt `needle-blender-plugin-*.zip`) aus, um sie zu installieren.

3. Suchen Sie in der Suchleiste für Add-ons nach "Needle" und stellen Sie sicher, dass `Needle Engine Exporter for Blender` aktiviert ist.


![Settings](/blender/settings.webp)

## Erste Schritte

Vielen Dank, dass Sie Needle Engine für Blender verwenden.

Mit diesem Add-on können Sie hochgradig interaktive und optimierte WebGL- und WebXR-Erlebnisse in Blender erstellen, die mit Needle Engine und three.js laufen.

Sie können Animationen sequenzieren, Ihre Szenen einfach mit Lightmaps versehen, Interaktivität hinzufügen oder eigene Skripte in Typescript oder Javascript erstellen, die im Web laufen.

<video-embed src="/docs/blender/environment-light.mp4" />
*Anpassen der Beleuchtungs- und Umgebungs-Einstellungen zwischen Blender und Needle Engine. HDRI-Umgebungsbeleuchtungen werden automatisch direkt aus Blender exportiert. Sobald Sie speichern, wird die Seite automatisch neu geladen.*

:::tip Feedback geben

**Ihr Feedback ist von unschätzbarem Wert**, wenn es darum geht, zu entscheiden, welche Funktionen und Workflows wir priorisieren sollten. Wenn Sie Feedback für uns haben (gut oder schlecht), [lassen Sie es uns bitte im Forum wissen](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)!
:::

## Beispiele für Blender

- [Blender Beispiele herunterladen](https://engine.needle.tools/downloads/blender/download-samples?utm_source=needle_docs&utm_content=blender)

Erstellen oder öffnen Sie zunächst eine neue Blend-Datei, die Sie ins Web exportieren möchten.
Öffnen Sie das Properties-Fenster und wählen Sie die Scene-Kategorie. Wählen Sie im Needle Engine-Panel einen `Project Path` aus. Klicken Sie dann auf `Generate Project`. Es wird automatisch installiert und der Server gestartet – sobald dies abgeschlossen ist, sollte Ihr Browser geöffnet werden und die threejs-Szene wird geladen.

![Project panel](/blender/project-panel.webp)

Standardmäßig wird Ihre Szene beim Speichern der Blend-Datei automatisch erneut exportiert.
Wenn der lokale Server läuft (z.B. durch Klicken auf `Run Project`), wird die Website mit Ihrem geänderten Modell automatisch aktualisiert.


Wenn Ihr Webprojekt bereits existiert und Sie einfach weiter an der Website arbeiten möchten
klicken Sie auf die blaue Schaltfläche `Run Project`, um den lokalen Server zu starten:
![Project panel](/blender/project-panel-2.webp)

### Übersicht des Projekt-Panels
![Project panel](/blender/project-panel-3.webp)

1) Der Pfad zu Ihrem Webprojekt. Sie können die kleine Ordner-Schaltfläche rechts verwenden, um einen anderen Pfad auszuwählen.
2) Die Schaltfläche `Run Project` wird angezeigt, wenn der Projektpfad auf ein gültiges Webprojekt verweist. Ein Webprojekt ist gültig, wenn es eine `package.json` enthält.
3) `Directory` öffnet das Verzeichnis Ihres Webprojekts (den `Project Path`).
4) Diese Schaltfläche exportiert die aktuelle Szene erneut als glb in Ihr lokales Webprojekt. Dies geschieht standardmäßig auch beim Speichern Ihrer Blend-Datei.
5) `Code Editor` versucht, den vscode Workspace in Ihrem Webprojekt zu öffnen.
6) Wenn Sie mit mehreren Szenen in einer Blend-Datei arbeiten, können Sie konfigurieren, welche Szene Ihre Hauptszene ist und ins Web exportiert werden soll. Wenn eine Ihrer Komponenten auf eine andere Szene verweist, werden diese ebenfalls als separate glb-Dateien exportiert. Wenn Sie auf die Schaltfläche "Export" klicken, wird Ihre Hauptszene diejenige sein, die im Browser geladen wird.
7) Verwenden Sie die Schaltflächen `Build: Development` oder `Build: Production`, wenn Sie Ihr Webprojekt auf einen Server hochladen möchten. Dies bündelt Ihr Webprojekt und erzeugt die Dateien, die Sie hochladen können. Beim Klicken auf `Build: Production` werden auch Optimierungen auf Ihre Texturen angewendet (sie werden für das Web komprimiert).
8) Dokumentation öffnen



## Blender Einstellungen

### Farbmanagement

Standardmäßig ist der Blender-Viewport auf `Filmic` eingestellt – mit dieser Einstellung stimmen Ihre Farben in Blender und in three.js nicht überein.
Um dies zu beheben, gehen Sie zur Blender Render-Kategorie und wählen Sie im ColorManagement-Panel `View Transform`: `Standard`

![Correct color management settings](/blender/settings-color-management.webp)


## Umgebungsbeleuchtung

Sie können die Umgebungsbeleuchtung und den Skybox über die Viewport-Shading-Optionen ändern.
Weisen Sie eine Cubemap für die Beleuchtung oder den Hintergrund-Skybox zu. Sie können die Stärke oder den Weichzeichner anpassen, um das Erscheinungsbild nach Ihren Wünschen zu ändern.

Hinweis: Um die Skybox-Cubemap auch im Browser zu sehen, erhöhen Sie die `World Opacity` auf 1.

Hinweis: Alternativ können Sie die Einstellung `Scene World` im Viewport Shading-Tab aktivieren, um die in den Blender World-Einstellungen zugewiesene Umgebungstextur zu verwenden.

![Environment](/blender/environment.webp)

<video-embed limit_height max_height="300px" src="/docs/blender/environment.mp4" />

Alternativ, wenn Sie die Cubemap nicht als Hintergrund sehen möchten, fügen Sie einer beliebigen Blender Camera eine Camera-Komponente hinzu und ändern Sie `clearFlags: SolidColor` – beachten Sie, dass die Camera-Einstellungen `backgroundBlurriness` und `backgroundIntensity` die Viewport-Shading-Einstellungen überschreiben.

![Environment Camera](/blender/environment-camera.webp)

### Eigene HDRI / EXR Umgebungsbeleuchtung und Skybox hinzufügen

<video-embed limit_height src="/docs/blender/custom_hdri.mp4" />


## Export

Um ein Objekt vom Export auszuschließen, können Sie die Viewport- und Render-Anzeige deaktivieren (siehe Abbildung unten).

![Exclude from export](/blender/dont-export.webp)


## Animation 🏇

Für einfache Anwendungsfälle können Sie die Animation-Komponente zur Wiedergabe eines oder mehrerer Animationclips verwenden.
Wählen Sie einfach Ihr Objekt aus, fügen Sie eine Animation-Komponente hinzu und weisen Sie den Clip zu (Sie können zusätzliche Clips zum Exportieren dem Clips-Array hinzufügen).
Standardmäßig wird nur der erste zugewiesene Clip wiedergegeben, wenn `playAutomatically` aktiviert ist. Sie können die anderen Clips mit einer einfachen benutzerdefinierten Typescript-Komponente auslösen).
<video-embed limit_height src="/docs/blender/animation.mp4" />

### AnimatorController

Der Animator-Controller kann für komplexere Szenarien erstellt werden. Er funktioniert als Zustandsmaschine (statemachine), mit der Sie mehrere Animationszustände in einem Graph erstellen und Bedingungen und Interpolations-Einstellungen für Übergänge zwischen diesen konfigurieren können.

<video-embed src="/docs/blender/animatorcontroller-web.mp4" />
*Erstellen und exportieren Sie [Animator-Zustandsmaschinen](#animatorcontroller) zur Steuerung komplexer Charakteranimationen*

#### Einen AnimatorController erstellen

Der AnimatorController-Editor kann über das EditorType-Dropdown in der oberen linken Ecke jedes Panels geöffnet werden:

![AnimatorController open window](/blender/animatorcontroller-open.webp)

<video-embed limit_height max_height="188px" src="/docs/blender/animatorcontroller-create.mp4" />
*Erstellen eines neuen Animator-Controller Assets ☝ oder Auswahl eines aus Ihren zuvor erstellten Assets*

##### Graph-Übersicht
![AnimatorController overview](/blender/animatorcontroller-overview.webp)
1) Verwenden Sie `Shift+A`, um einen neuen AnimatorState zu erstellen.
2) Der `Parameters`-Knoten wird erstellt, sobald Sie einen ersten Knoten hinzufügen. Wählen Sie ihn aus, um Parameter einzurichten, die in Übergängen verwendet werden (über das Node-Panel am rechten Rand).
3) Dies ist ein AnimatorState. Der orangefarbene Zustand ist der Startzustand (er kann über die Schaltfläche `Set default state` im Node-/Properties-Panel geändert werden).
4) Die Properties für einen AnimatorState können verwendet werden, um einen oder mehrere Übergänge zu anderen Zuständen einzurichten. Verwenden Sie das `Conditions`-Array, um Parameter auszuwählen, die die Bedingung für den Übergang erfüllen müssen.

#### Einen AnimatorController verwenden

Um einen AnimatorController zu verwenden, fügen Sie dem Root-Objekt Ihrer Animationen eine Animator-Komponente hinzu und wählen Sie das AnimatorController Asset aus, das Sie für dieses Objekt verwenden möchten.

![AnimatorController assign to animator](/blender/animatorcontroller-assigning.webp)

Sie können die Animator-Parameter von Typescript aus einstellen oder z.B. über das Ereignis einer Button-Komponente.


### Zeitachse — NLA Tracks exportieren 🎬

Sie können Blender NLA Tracks direkt ins Web exportieren.
Fügen Sie einem beliebigen Blender-Objekt eine PlayableDirector-Komponente hinzu (über `Add Component`). Weisen Sie die Objekte in der Liste ``animation tracks`` in der Komponente zu, für die die NLA Tracks exportiert werden sollen.

![](/blender/timeline_setup.webp)
![](/blender/timeline.webp)

::: details Codebeispiel für interaktive Zeitachsen-Wiedergabe
Fügen Sie dieses Skript zu `src/scripts` hinzu (siehe Abschnitt benutzerdefinierte Komponenten) und fügen Sie es einem beliebigen Objekt in Blender hinzu, damit die Zeit einer Zeitachse durch Scrollen im Browser gesteuert wird.

```ts twoslash
import { Behaviour, PlayableDirector, serializable, Mathf } from "@needle-tools/engine";

export class ScrollTimeline extends Behaviour {

    @serializable(PlayableDirector)
    timeline?: PlayableDirector;

    @serializable()
    sensitivity: number = .5;

    @serializable()
    clamp: boolean = false;

    private _targetTime: number = 0;

    awake() {
        this.context.domElement.addEventListener("wheel", this.onWheel);
        if (this.timeline) this.timeline.pause();
    }

    private onWheel = (e: WheelEvent) => {
        if (this.timeline) {
            this._targetTime = this.timeline.time + e.deltaY * 0.01 * this.sensitivity;
            if (this.clamp) this._targetTime = Mathf.clamp(this._targetTime, 0, this.timeline.duration);
        }
    }

    update(): void {
        if (!this.timeline) return;
        const time = Mathf.lerp(this.timeline.time, this._targetTime, this.context.time.deltaTime / .3);
        this.timeline.time = time;
        this.timeline.pause();
        this.timeline.evaluate();
    }
}
```
:::

## Interaktivität 😎

Sie können Objekte in Ihrer Hierarchie über das Needle Components-Panel hinzufügen oder entfernen:

![Component panel](/blender/components-panel.webp)

![Component panel](/blender/components-panel-select.webp)
*Zum Beispiel durch Hinzufügen einer `OrbitControls`-Komponente zum Kameraobjekt*
*erhalten Sie grundlegende Kamerasteuerungen für Mobil- und Desktop-Geräte*
*Passen Sie die Einstellungen für jede Komponente in den entsprechenden Panels an*

Komponenten können über die X-Schaltfläche unten rechts entfernt werden:

![Remove component](/blender/remove-component.webp)

### Benutzerdefinierte Komponenten
Benutzerdefinierte Komponenten können auch einfach durch das Schreiben von Typescript-Klassen hinzugefügt werden. Sie werden automatisch kompiliert und erscheinen in Blender, wenn sie gespeichert werden.

Um benutzerdefinierte Komponenten zu erstellen, öffnen Sie den Workspace über das Needle Project-Panel und fügen Sie eine `.ts` Skriptdatei in `src/scripts` innerhalb Ihres Webprojekts hinzu. Bitte beachten Sie die [Scripting-Dokumentation](http://docs.needle.tools/scripting), um zu erfahren, wie Sie benutzerdefinierte Komponenten für Needle Engine schreiben.

::: warning Hinweis
Stellen Sie sicher, dass ``@needle-tools/needle-component-compiler`` 2.x in Ihrem Webprojekt installiert ist (package.json devDependencies).
:::

## Lightmapping 💡

Needle enthält ein Lightmapping-Plugin, das es sehr einfach macht, schöne Lichter auf Texturen zu baken und diese ins Web zu bringen. Das Plugin generiert automatisch Lightmap UVs für alle Modelle, die als lightmapped markiert sind, es ist kein manueller Textur-Atlas erforderlich. Es unterstützt auch Lightmapping von mehreren Instanzen mit ihren eigenen Lightmap-Daten.
Damit Lightmapping funktioniert, benötigen Sie mindestens ein Licht und ein Objekt mit aktiviertem `Lightmapped` im `Needle Object`-Panel.

<video-embed limit_height max_height="800px" src="/docs/blender/lightmapping.mp4" />

::: tip Tipp
Sie können die .blend-Datei aus dem Video [hier](https://engine.needle.tools/downloads/blender/lightmaps.blend) herunterladen.
:::
Verwenden Sie das Needle Object-Panel, um Lightmapping für ein Mesh-Objekt oder Licht zu aktivieren:

![Lightmapping object](/blender/lightmapping-object.webp)

Für schnellen Zugriff auf Lightmap-Einstellungen und Baking-Optionen können Sie das Scene View-Panel im `Needle`-Tab verwenden:

![Lightmapping scene panel](/blender/lightmapping-scene-panel.webp)

Alternativ können Sie auch das Lightmapping-Panel im `Render Properties`-Tab verwenden:

![Lightmapping object](/blender/lightmapping-panel.webp)

::: warning Experimentelle Funktion
Das Lightmapping-Plugin ist experimentell. Wir empfehlen Ihnen, beim Gebrauch eine Sicherungskopie Ihrer .blend-Datei zu erstellen. Bitte melden Sie Probleme oder Fehler, die Ihnen begegnen, in [unserem Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) 🙏
:::

## Texturkomprimierung

Die Needle Engine Build Pipeline komprimiert Texturen automatisch mithilfe von ECT1S und UASTC (abhängig von ihrer Verwendung in Materialien), wenn ein Production Build erstellt wird (**erfordert die Installation von [toktx](../getting-started/index.md#install-these-tools-for-production-builds)**). Sie können jedoch den Komprimierungstyp pro Textur im Material-Panel überschreiben oder ändern.

Sie können die Komprimierung pro Textur ändern. Um die Standard-Komprimierungseinstellungen zu überschreiben, gehen Sie zum `Material`-Tab und öffnen Sie die `Needle Material Settings`. Dort finden Sie einen Schalter, um die Textureinstellungen pro in Ihrem Material verwendeter Textur zu überschreiben.
Siehe die [Texturkomprimierungstabelle](../deployment.md#how-do-i-choose-between-etc1s-uastc-and-webp-compression) für eine kurze Übersicht über die Unterschiede zwischen den einzelnen Komprimierungsalgorithmen.

![Texture Compression options in Blender](/blender/texture-compression.webp)

## Aktualisierung

Die Glühbirne im Needle Project-Panel informiert Sie, wenn eine neue Version des Add-ons verfügbar ist.
Klicken Sie einfach auf das Symbol, um die neue Version herunterzuladen.
![Update notification](/blender/updates.webp)

## Ein Problem melden

Wenn Sie auf Probleme stoßen, helfen wir Ihnen gerne weiter! Treten Sie bitte [unserem Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) bei, um schnellen Support zu erhalten.

Bitte überprüfen Sie auch die Logs in Blender. Sie finden spezifische Logs für das Needle Engine Addon über `Help/Needle` in Blender.

### Integrierter Bug Reporter
![Needle Blender Bug Reporter panel](/blender/bugreporter.webp)
Sie können auch automatisch einen Bugreport direkt aus Blender erstellen und hochladen.
Hochgeladene Bugreports werden ausschließlich zum Debugging verwendet. Sie sind auf unserem Backend verschlüsselt und werden nach 30 Tagen gelöscht.

Bei Bedarf können wir in bestimmten Fällen auch benutzerdefinierte NDAs für Ihre Projekte einrichten. Bitte kontaktieren Sie uns für weitere Informationen.

:::tip Die Nutzung des Bug Reporters erfordert ein Webprojekt
Stellen Sie sicher, dass Sie ein Webprojekt eingerichtet haben, bevor Sie einen Bugreport senden – dies hilft uns, mehr über Ihr System und Ihre Einrichtung zu verstehen und das Problem leichter zu reproduzieren.
:::

# Nächste Schritte

- [Konzept: Webprojekte](../project-structure.md)
- [Konzept: Assets exportieren](../export.md)
- [Konzept: Deployment (Ihre Website teilen)](../deployment.md)
- [Komponenten: Erfahren Sie mehr über Everywhere Actions](../everywhere-actions.md)
- [Scripting für Anfänger: Typescript Grundlagen](../getting-started/typescript-essentials.md)
- [Scripting für Anfänger: Eigene Komponenten schreiben](../scripting.md)

Seite automatisch von KI übersetzt