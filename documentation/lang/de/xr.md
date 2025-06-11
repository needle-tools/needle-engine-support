---
title: VR & AR (WebXR)
---

## Unterstützte Geräte

Needle Engine unterstützt die vollständige [WebXR-Spezifikation](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API), einschließlich AR und VR. WebXR ist ein offizieller Webstandard, der immersive Erlebnisse ins Web bringt, mit allen Vorteilen des Webs: keine Installation, kein App Store, keine SDKs erforderlich.

Alle Geräte mit einem Browser können mit Needle erstellte Apps ausführen. Wenn der Browser WebXR unterstützt, funktionieren Ihre Apps automatisch auch in XR, indem sie unsere integrierten Komponenten verwenden. Dazu gehören Desktop-Browser, mobile Browser, viele Browser auf AR/VR-Headsets, aber auch andere aufkommende Technologien wie Looking Glass Displays, Smart Glasses und mehr.

:::tip App-freie iOS AR-Unterstützung über USDZ/QuickLook
Während iOS-Geräte noch keine offizielle WebXR-Unterstützung bieten, unterstützt Needle die Erstellung von AR-Erlebnissen auf iOS mithilfe von [Everywhere Actions](everywhere-actions.md). Weitere Details finden Sie im [iOS-Abschnitt](#augmented-reality-and-webxr-on-ios). Sie können reichhaltige, interaktive Erlebnisse erstellen, die nahtlos in AR auf iOS-Geräten funktionieren, selbst mit den Einschränkungen, die Apple festgelegt hat.

Wenn Sie den AR-Modus auf iOS aufrufen, konvertiert Needle Ihre Szene automatisch in eine USDZ-Datei, die dann in AR mithilfe von Apples QuickLook angezeigt wird. Objekte, Materialien, Audio, Animation und Everywhere Actions bleiben erhalten.
:::

Die folgende Tabelle listet einige der Geräte auf, die wir erfolgreich mit Needle Engine getestet haben.
Wenn ein neues Gerät auf den Markt kommt, das WebXR unterstützt, funktioniert es ohne weiteres mit Ihren Apps. Dies ist einer der großen Vorteile der Entwicklung mit dem Browser als Plattform – die Kompatibilität ist nicht auf eine bestimmte Gruppe von Geräten oder SDKs beschränkt.

| Headset Device | Browser | Notes |
| -- | -- | -- |
| Apple Vision Pro | ✔️ Safari | Hand-Tracking, Unterstützung für transienten Pointer |
| Meta Quest 3 | ✔️ Meta Browser | Hand-Tracking, Unterstützung für sessiongranted<sup>1</sup>, Passthrough, Tiefenmessung, Mesh-Tracking |
| Meta Quest 3S | ✔️ Meta Browser | Hand-Tracking, Unterstützung für sessiongranted<sup>1</sup>, Passthrough, Tiefenmessung, Mesh-Tracking |
| Meta Quest 2 | ✔️ Meta Browser | Hand-Tracking, Unterstützung für sessiongranted<sup>1</sup>, Passthrough (Schwarz-Weiß) |
| Meta Quest 1 | ✔️ Meta Browser | Hand-Tracking, Unterstützung für sessiongranted<sup>1</sup> |
| Meta Quest Pro | ✔️ Meta Browser | Hand-Tracking, Unterstützung für sessiongranted<sup>1</sup>, Passthrough |
| Pico Neo 4 | ✔️ Pico Browser | Passthrough, Hand-Tracking<sup>2</sup> |
| Pico Neo 3 | ✔️ Pico Browser | kein Hand-Tracking, invertierte Controller-Thumbsticks |
| Oculus Rift 1/2 | ✔️ Chrome |  |
| Valve Index | ✔️ Chrome |  |
| HTC Vive | ✔️ Chrome |  |
| Hololens 2 | ✔️ Edge | Hand-Tracking, Unterstützung für AR und VR (im VR-Modus wird der Hintergrund ebenfalls gerendert) |

| Mobile Device | Browser | Notes |
| -- | -- | -- |
| Android 10+ | ✔️ Chrome | |
| Android 10+ | ✔️ Firefox | |
| iOS 15+ | (✔️)<sup>3</sup> Safari<br/>(✔️)<sup>3</sup> Chrome | Keine vollständige Code-Unterstützung, aber Needle [Everywhere Actions](everywhere-actions.md) werden zur Erstellung dynamischer, interaktiver USDZ-Dateien unterstützt. |
| iOS 15+ | ✔️ WebXR Viewer | Browser ist inzwischen etwas veraltet |
| Hololens 2 | ✔️ Edge | |
| Hololens 1 | ❌ | keine WebXR-Unterstützung |
| Magic Leap 2 | ✔️ | |
| Magic Leap 1 | ✔️ | veraltetes Gerät |

| Other Devices | Browser | Notes |
| -- | -- | -- |
| Looking Glass Holographic Display | ✔️ Chrome | erfordert Looking Glass bridge und etwas eigenen Code, [siehe unser Beispiel](https://engine.needle.tools/samples/looking-glass/) |
| Logitech MX Ink | ✔️ Meta Browser | offiziell unterstützt, siehe [Dokumentation](https://logitech.github.io/mxink/WebXR/WebXrIntegration.html#using-needle-tools) |

<sup>1</sup>: Erfordert die Aktivierung eines Browser-Flags: `chrome://flags/#webxr-navigation-permission`
<sup>2</sup>: Erfordert die Aktivierung einer Einstellung in den Entwickleroptionen
<sup>3</sup>: Verwendet [Everywhere Actions](everywhere-actions.md) oder [andere Ansätze](#augmented-reality-and-webxr-on-ios)

## VR-, AR- und QuickLook-Beispiele

Besuchen Sie unsere [Needle Engine Samples](https://engine.needle.tools/samples/?overlay=samples&tag=xr), um viele interaktive Beispiele sofort auszuprobieren. Oder testen Sie es live auf Ihrem Gerät, indem Sie auf die Schaltflächen <kbd>QR Code</kbd> (für Telefone) oder <kbd>Open on Quest</kbd> (für Meta Quest-Headsets) unten klicken.

<sample src="https://engine.needle.tools/samples/collaborative-sandbox/"/>

## Hinzufügen von VR- und AR-Funktionen zu einer Szene

AR-, VR- und Netzwerkfähigkeiten in Needle Engine sind modular aufgebaut. Sie können wählen, ob Sie keine davon unterstützen oder nur bestimmte Funktionen hinzufügen möchten.

### Grundfunktionen

1.  **AR und VR aktivieren**
    Fügen Sie eine `WebXR`-Komponente hinzu.
    *Optional:* Sie können einen benutzerdefinierten Avatar festlegen, indem Sie auf ein [Avatar Prefab](#avatars) verweisen.
    Standardmäßig ist ein einfacher `DefaultAvatar` zugewiesen.

2.  **Teleportation aktivieren**
    Fügen Sie eine `TeleportTarget`-Komponente zu Objekthierarchien hinzu, auf die teleportiert werden kann.
    Um bestimmte Objekte auszuschließen, setzen Sie deren Layer auf `IgnoreRaycasting`.

### Multiplayer

1.  **Networking aktivieren**
    Fügen Sie eine `SyncedRoom`-Komponente hinzu.

2.  **Desktop Viewer Sync aktivieren**
    Fügen Sie eine `SyncedCamera`-Komponente hinzu.

3.  **Voice Chat aktivieren**
    Fügen Sie eine `VoIP`-Komponente hinzu.

:::tip Szenenstruktur
Diese Komponenten können sich überall in Ihrer Hierarchie befinden. Sie können auch alle auf demselben GameObject liegen, was ein übliches Muster ist.
:::

> **[Castle Builder](https://castle.needle.tools/)** verwendet alle oben genannten Funktionen für ein plattformübergreifendes Multiplayer-Sandbox-Erlebnis.
> – #madebyneedle 💚

### Spezielle AR-Komponenten

1.  **AR-Session-Root und -Skalierung definieren**
    Fügen Sie Ihrem Root-Objekt eine `WebARSessionRoot`-Komponente hinzu. Bei AR-Erlebnissen möchten Sie die Szene oft so skalieren, dass sie in die reale Welt passt.
2.  Definieren Sie die **Benutzerskala**, um den Benutzer beim Betreten von AR im Verhältnis zur Szene zu verkleinern (< 1) oder zu vergrößern (> 1).

### Steuerung der Objektanzeige für XR

1.  **Definieren Sie, ob ein Objekt im Browser, in AR, in VR, in der First Person, in der Third Person sichtbar ist**
    Fügen Sie dem Objekt, das Sie steuern möchten, eine `XR Flag`-Komponente hinzu.

2.  **Ändern Sie die Optionen im Dropdown** nach Bedarf.
    Gängige Anwendungsfälle sind
    - Ausblenden von Böden beim Betreten von AR
    - Ausblenden von Avatar-Teilen in der First oder Third Person Ansicht. In der First-Person-Ansicht sollte eine Person zum Beispiel ihr eigenes Kopfmodell nicht sehen können.

### Reisen zwischen VR-Welten

Needle Engine unterstützt den [`sessiongranted`](https://github.com/immersive-web/navigation)-Zustand. Dies ermöglicht Benutzern, nahtlos zwischen WebXR-Anwendungen zu wechseln, ohne eine immersive Sitzung zu verlassen – sie bleiben in VR oder AR.

Derzeit wird dies nur auf Oculus Quest 1, 2 und 3 im Oculus Browser unterstützt. Auf anderen Plattformen werden Benutzer aus ihrer aktuellen immersiven Sitzung geworfen und müssen auf der neuen Seite VR erneut betreten.
Erfordert die Aktivierung eines Browser-Flags: `chrome://flags/#webxr-navigation-permission`

-   **Klicken Sie auf Objekte, um Links zu öffnen**
    Fügen Sie die `OpenURL`-Komponente hinzu, die es sehr einfach macht, verbundene Welten zu erstellen.

## Scripting

Lesen Sie mehr über Scripting für XR in der [XR-Scripting-Dokumentation](./scripting.md#xr-event-methods)

## Avatare

Auch wenn wir derzeit keine sofort einsatzbereite Integration externer Avatarsysteme anbieten, können Sie anwendungsspezifische Avatare oder benutzerdefinierte Systeme erstellen.

-   **Einen benutzerdefinierten Avatar erstellen**
    -   Erstellen Sie ein leeres GameObject als Avatar-Wurzel
    -   Fügen Sie ein Objekt mit dem Namen `Head` hinzu und fügen Sie eine `XRFlag` hinzu, die auf Third Person eingestellt ist
    -   Fügen Sie Objekte mit den Namen `HandLeft` und `HandRight` hinzu
    -   Fügen Sie Ihre Grafiken unterhalb dieser Objekte hinzu.

### Experimentelle Avatar-Komponenten

Es gibt eine Reihe experimenteller Komponenten, um ausdrucksstärkere Avatare zu erstellen. Zu diesem Zeitpunkt empfehlen wir, sie zu duplizieren, um eigene Varianten zu erstellen, da sie später geändert oder entfernt werden könnten.

![20220817-230858-87dG-Unity_PLjQ](https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif)
*Beispiel Avatar Rig mit einfachem Halsmodell und Gliedmaßen-Constraints*

-   **Zufällige Spielerfarben**
    Als Beispiel für die Avatar-Anpassung können Sie eine `PlayerColor`-Komponente zu Ihren Renderern hinzufügen.
    Diese zufällige Farbe wird zwischen den Spielern synchronisiert.

-   **Augenrotation**
    `AvatarEyeLook_Rotation` dreht GameObjects (Augen), um anderen Avataren und einem zufälligen Ziel zu folgen. Diese Komponente wird zwischen den Spielern synchronisiert.

-   **Augenblinzeln**
    `AvatarBlink_Simple` versteckt GameObjects (Augen) zufällig alle paar Sekunden und imitiert so ein Blinzeln.

![image](https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png)
*Beispiel Avatar Prefab Hierarchie*

-   **Offset Constraint**
    `OffsetConstraint` ermöglicht das Verschieben eines Objekts im Verhältnis zu einem anderen im Avatar-Raum. Dies ermöglicht es beispielsweise, dass ein Body dem Head folgt, aber die Rotation ausgerichtet bleibt. Es ermöglicht auch den Aufbau einfacher Halsmodelle.

-   **Limb Constraint**
    `BasicIKConstraint` ist ein sehr minimalistisches Constraint, das zwei Transforms und einen Hinweis benötigt. Dies ist nützlich, um einfache Arm- oder Beinketten zu konstruieren. Da die Rotation derzeit nicht richtig implementiert ist, müssen Arme und Beine möglicherweise rotationssymmetrisch sein, damit sie "richtig aussehen". Es heißt aus gutem Grund "Basic"!

## HTML-Inhalts-Overlays in AR

Wenn Sie unterschiedliche HTML-Inhalte anzeigen möchten, je nachdem, ob der Client einen regulären Browser oder AR oder VR verwendet, können Sie einfach eine Reihe von HTML-Klassen verwenden.
Dies wird über HTML-Elementklassen gesteuert. Um Inhalte beispielsweise auf dem Desktop und in AR erscheinen zu lassen, fügen Sie ein ``<div class="desktop ar"> ... </div>`` innerhalb des `<needle-engine>`-Tags hinzu:

```html
<needle-engine>
    <div class="desktop ar" style="pointer-events:none;">
        <div class="positioning-container">
          <p>Ihr Inhalt für AR und Desktop kommt hier rein</p>
          <p class="only-in-ar">Dies wird nur in AR sichtbar sein</p>
        <div>
    </div>
</needle-engine>
```

Inhalts-Overlays werden mithilfe der optionalen `dom-overlay`-Funktion implementiert, die normalerweise auf bildschirmbasierten AR-Geräten (Telefone, Tablets) unterstützt wird.

Verwenden Sie die Klasse `.ar-session-active`, um spezifische Inhalte während der AR-Sitzung ein-/auszublenden. Die Pseudoklasse [`:xr-overlay`](https://www.w3.org/TR/webxr-dom-overlays-1/#css-pseudo-class) sollte derzeit nicht verwendet werden, da ihre Verwendung den WebXR Viewer von Mozilla beschädigt.

```css
.only-in-ar {
  display: none;
}

.ar-session-active .only-in-ar {
  display:initial;
}
```

Es ist erwähnenswert, dass das Overlay-Element [während der XR-Sitzung immer im Vollbildmodus angezeigt wird](https://www.w3.org/TR/webxr-dom-overlays-1/#ua-style-sheet-defaults), unabhängig von angewendeten Stildefinitionen. Wenn Sie Elemente anders ausrichten möchten, sollten Sie einen Container _innerhalb_ des Elements mit der Klasse `class="ar"` erstellen.

<sample src="https://engine.needle.tools/samples-uploads/ar-overlay/"/>

## Augmented Reality und WebXR auf iOS

Augmented Reality-Erlebnisse auf iOS sind etwas eingeschränkt, da Apple WebXR derzeit auf iOS-Geräten nicht unterstützt.

Needle Engine's [Everywhere Actions](everywhere-actions.md) wurden entwickelt, um diese Lücke zu schließen und automatische interaktive Funktionen auf iOS-Geräten für Szenen zu ermöglichen, die aus spezifischen Komponenten bestehen. Sie unterstützen eine Teilmenge der Funktionalität, die in WebXR verfügbar ist, zum Beispiel räumliches Audio, Bild-Tracking, Animationen und mehr. Weitere Informationen finden Sie in [der Dokumentation](everywhere-actions.md).

:::tip Begrenzte Unterstützung für benutzerdefinierten Code in QuickLook
Apple hat starke Einschränkungen hinsichtlich der Art von Inhalten festgelegt, die in QuickLook verwendet werden können. Daher können benutzerdefinierte Skriptkomponenten nicht automatisch für die Verwendung in AR auf iOS konvertiert werden. Sie können mithilfe unserer Everywhere Actions API Unterstützung für einige Arten von benutzerdefiniertem Code hinzufügen.
:::

### Musikinstrument – WebXR- und QuickLook-Unterstützung

Hier ist ein Beispiel für ein Musikinstrument, das Everywhere Actions verwendet und daher in Browsern und in AR auf iOS-Geräten funktioniert.
Es verwendet räumliches Audio, Animation und Tap-Interaktionen.
<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Everywhere Actions und andere Optionen für iOS AR

Es gibt auch andere Optionen, um iOS-Benutzer zu noch leistungsfähigeren interaktiven AR-Erlebnissen zu führen:

3.  **On-the-fly-Export von Inhalten als USDZ-Dateien.**
    Diese Dateien können auf iOS-Geräten in AR angezeigt werden. Beim Export aus Szenen mit Everywhere Actions ist die Interaktivität dieselbe, mehr als ausreichend für Produktkonfiguratoren, narrative Erlebnisse und Ähnliches.
    Ein Beispiel ist [Castle Builder](https://castle.needle.tools), wo Kreationen (nicht die Live-Sitzung) in AR betrachtet werden können.

> **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** verwendet diesen Ansatz. Spieler können kollaborativ Text in die Szene auf ihren Bildschirmen platzieren und dann die Ergebnisse in AR auf iOS ansehen. Auf Android können sie auch direkt in WebXR interagieren.
> – #madewithneedle von Katja Rempel 💚

1.  **Führen von Benutzern zu WebXR-kompatiblen Browsern auf iOS.**
    Je nach Zielgruppe können Sie Benutzer auf iOS beispielsweise zum [WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056) von Mozilla führen, um AR auf iOS zu erleben.

2.  **Verwendung des Kamerazugriffs und benutzerdefinierter Algorithmen auf iOS-Geräten.**
    Man kann den Zugriff auf das Kamerabild anfordern und benutzerdefinierte Algorithmen ausführen, um die Geräteposition zu bestimmen.
    Obwohl wir derzeit keine integrierten Komponenten dafür bereitstellen, finden Sie hier einige Verweise auf Bibliotheken und Frameworks, die wir in Zukunft ausprobieren möchten:
    -   [AR.js](https://github.com/AR-js-org/AR.js) (Open Source)
        -   [Experimentelle AR.js-Integration](https://github.com/FireDragonGameStudio/NeedleAndARjs) von FireDragonGameStudio
    -   [Mind AR](https://github.com/hiukim/mind-ar-js) (Open Source)
    -   [8th Wall](https://www.8thwall.com/) (kommerziell)

## Bild-Tracking

Needle Engine unterstützt **WebXR Image Tracking** ([Live Demo](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) auf Android und **QuickLook Image Tracking** auf iOS.

Zusätzliche Dokumentation finden Sie im Abschnitt [Everywhere Actions](everywhere-actions.md#image-tracking).

:::warning WebXR Image Tracking befindet sich noch in einer "Draft"-Phase und ist nicht allgemein verfügbar
Bislang konnten sich die Browser-Anbieter noch nicht auf die endgültige Image Tracking API für WebXR einigen. Solange die Spezifikation in der "Draft"-Phase ist ([Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
müssen Sie und die Benutzer Ihrer App die folgenden Schritte ausführen, um WebXR ImageTracking auf Android-Geräten zu aktivieren:
1. Besuchen Sie ``chrome://flags`` in Ihrem Android Chrome-Browser
2. Suchen und aktivieren Sie die Option `WebXR Incubations`
:::

Ohne diese Spezifikation kann man immer noch den Zugriff auf das Kamerabild anfordern und benutzerdefinierte Algorithmen ausführen, um die Geräteposition zu bestimmen. Der Nachteil ist, dass Benutzer zusätzliche Berechtigungen wie Kamerazugriff akzeptieren müssen und das Tracking nicht so genau sein wird wie mit den nativen Fähigkeiten des Geräts.

Hier sind einige Bibliotheken, um Bild-Tracking basierend auf Kamerazugriff und lokalen Computer-Vision-Algorithmen hinzuzufügen:
-   [Experimentelle AR.js-Integration mit Needle Engine](https://github.com/FireDragonGameStudio/NeedleAndARjs) von FireDragonGameStudio
-   [AR.js](https://github.com/AR-js-org/AR.js) (Open Source)
-   [Mind AR](https://github.com/hiukim/mind-ar-js) (Open Source)

## Referenzen

[WebXR Device API](https://www.w3.org/TR/webxr/)
[caniuse: WebXR](https://caniuse.com/webxr)
[Apples vorläufige USD-Verhaltensweisen](https://developer.apple.com/augmented-reality/quick-look/)

Seite automatisch mit KI übersetzt