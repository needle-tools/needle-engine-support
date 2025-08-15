---
title: Everywhere Actions — Interaktive Erlebnisse auf Desktop, Android & iOS (sogar AR)
description: Die Everywhere Actions von Needle sind eine Reihe sorgfältig ausgewählter Komponenten, mit denen Sie in Unity interaktive Erlebnisse erstellen können, ohne eine einzige Codezeile schreiben zu müssen. Sie sind als Bausteine für Erlebnisse im Web, auf Mobilgeräten und in XR konzipiert, **einschließlich Augmented Reality auf iOS**. Aus niedrigschwelligen Triggern und Aktionen können komplexere interaktive Verhaltensweisen aufgebaut werden.
---

## Was sind Everywhere Actions?

Die Everywhere Actions von Needle sind eine Reihe sorgfältig ausgewählter Komponenten, mit denen Sie in Unity interaktive Erlebnisse erstellen können, ohne eine einzige Codezeile schreiben zu müssen.
Sie sind als Bausteine für Erlebnisse im Web, auf Mobilgeräten und in XR konzipiert, **einschließlich Augmented Reality auf iOS**.

Aus niedrigschwelligen Triggern und Aktionen können komplexere interaktive Verhaltensweisen aufgebaut werden.

### Unterstützte Plattformen
- Desktop
- Mobile (Android / iOS)
- VR-Brillen
- AR-Geräte
- iOS AR – QuickLook (ja, wirklich!)

## Wie verwende ich Everywhere Actions?

Für iOS-Unterstützung fügen Sie die Komponente `USDZExporter` zu Ihrer Szene hinzu. Es ist empfehlenswert, sie demselben Objekt wie die `WebXR`-Komponente hinzuzufügen (aber nicht zwingend erforderlich)

Um eine Aktion zu einem beliebigen Objekt in Ihrer Szene hinzuzufügen, wählen Sie es aus und klicken Sie dann auf `Add Component > Needle > Everywhere Actions > [Action]`.

![](/imgs/everywhere-actions-component-menu.gif)

## Liste der Everywhere Actions

| Aktion | Beschreibung | Anwendungsbeispiele |
| --- | --- | --- |
| Play Animation on Click | Spielt einen ausgewählten Animationszustand eines Animators ab. Nach der Wiedergabe kann optional zu einer anderen Animation übergegangen werden. | Produktpräsentationen, interaktive Tutorials, Charakterbewegung |
| Change Material on Click | Tauscht ein Material gegen andere aus. Alle Objekte mit diesem Material werden zusammen ausgetauscht. | Produktkonfiguratoren, Charaktere |
| Look At | Lässt ein Objekt zur Kamera schauen. | UI-Elemente, Sprites, Infografiken, Billboard-Effekte, anklickbare Hotspots |
| Play Audio on Click | Spielt einen ausgewählten Audioclip ab. | Soundeffekte, Erzählungen, Museumsausstellungen |
| Hide on Start | Verbirgt ein Objekt zu Beginn der Szene zur späteren Enthüllung. |
| Set Active on Click | Zeigt oder verbirgt Objekte. |  |
| Change Transform on Click | Verschiebt, rotiert oder skaliert ein Objekt. Ermöglicht absolute oder relative Bewegung. | Charaktere, Produkte, UI-Animationen (für komplexere Bewegungen Animation verwenden) |
| Audio Source | Spielt Audio beim Start ab und wiederholt es fortlaufend. Räumlich oder nicht-räumlich | Hintergrundmusik, Umgebungsgeräusche |
| WebXR Image Tracking | Verfolgt ein Bildziel und zeigt oder verbirgt Objekte. | AR-Erlebnisse, Produktpräsentationen |

## Beispiele

### Musikinstrument

Demonstriert räumliches Audio, Animation und Interaktionen.

<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Einfache Charakter-Controller

Demonstriert die Kombination von Animationen, Blickrichtung und Bewegung.

<sample src="https://engine.needle.tools/samples-uploads/usdz-characters" />

### Bildverfolgung

Demonstriert, wie 3D-Inhalte an einen benutzerdefinierten Bildmarker angehängt werden. Starten Sie die Szene unten in AR und richten Sie die Kamera Ihres Telefons auf den Bildmarker auf einem Bildschirm oder drucken Sie ihn aus.

:::info WebXR Image Tracking auf Android
**Auf Android** bitte aktivieren Sie "WebXR Incubations" in den Chrome Flags. Sie finden diese, indem Sie [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) in die Adressleiste des Chrome-Browsers Ihres Android-Telefons einfügen.
:::

[Lesen Sie mehr über Bildverfolgung mit Needle Engine](./webxr-image-tracking.md)

<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Bildmarker" width=300 />

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />

### Übersicht über interaktive Bausteine

<sample src="https://engine.needle.tools/samples-uploads/usdz-interactivity" />

## Eigene Everywhere Actions erstellen

Das Erstellen neuer Everywhere Actions erfordert das Schreiben von Code für Ihre Aktion in TypeScript, der im Browser und für WebXR verwendet wird, sowie die Verwendung unserer TriggerBuilder- und ActionBuilder-API, um eine passende Einrichtung für Augmented Reality auf iOS über QuickLook zu erstellen. Beim Erstellen benutzerdefinierter Aktionen beachten Sie bitte, dass QuickLook nur einen begrenzten Funktionsumfang bietet. Sie können weiterhin beliebigen Code für den Browser und WebXR verwenden, aber das Verhalten für QuickLook muss möglicherweise eine Annäherung sein, die aus den verfügbaren Triggern und Aktionen aufgebaut ist.

:::tip
Oft erfordert der Aufbau spezifischer Verhaltensweisen unkonventionelles Denken und die kreative Anwendung der verfügbaren niedrigschwelligen Aktionen. Ein Beispiel wäre eine "Zum Platzieren tippen"-Aktion – in QuickLook gibt es kein Raycasting oder Hit Testing, aber Sie könnten den erwarteten Platzierungsbereich mit einer Reihe unsichtbarer Objekte abdecken und einen "Tap"-Trigger verwenden, um das zu platzierende Objekt an die Position des angetippten unsichtbaren Objekts zu verschieben.
:::

Trigger und Aktionen für QuickLook basieren auf [Apple's Preliminary Interactive USD Schemas](https://developer.apple.com/documentation/arkit/usdz_schemas_for_ar/actions_and_triggers)

### Code-Beispiel

Hier ist die Implementierung für `HideOnStart` als Beispiel dafür, wie man eine Everywhere Action mit Implementierungen für den Browser und QuickLook erstellt:
@[code ts twoslash](@code/component-everywhere-action-hideonstart.ts)

::: tip
Oftmals erfordert das Erreichen des gewünschten Verhaltens die Komposition von _höheren Aktionen_ aus den verfügbaren _niedrigeren Aktionen_. Zum Beispiel setzt sich unsere Aktion "Change Material on Click" aus einer Reihe von `fadeActions` zusammen und dupliziert intern Objekte mit jeweils unterschiedlichen Materialsätzen. Durch sorgfältigen Aufbau dieser Aktionen können komplexe Verhaltensweisen erreicht werden.
:::

### Niedrigschwellige Methoden zum Erstellen eigener Aktionen

| Trigger | |
| --- | --- |
| `TriggerBuilder.sceneStartTrigger` | |
| `TriggerBuilder.tapTrigger` | |

| Aktionen | |
| --- | --- |
| `ActionBuilder.fadeAction` | |
| `ActionBuilder.startAnimationAction` | |
| `ActionBuilder.waitAction` | |
| `ActionBuilder.lookAtCameraAction` | |
| `ActionBuilder.emphasize` | |
| `ActionBuilder.transformAction` | |
| `ActionBuilder.playAudioAction` | |

|  Gruppenaktionen | |
| --- | --- |
| `ActionBuilder.sequence` | |
| `ActionBuilder.parallel` | |
| `GroupAction.addAction` | |
| `GroupAction.makeParallel` | |
| `GroupAction.makeSequence` | |
| `GroupAction.makeLooping` | |
| `GroupAction.makeRepeat` | |

Um die Implementierung unserer integrierten Everywhere Actions zu sehen, werfen Sie bitte einen Blick auf `src/engine-components/export/usdz/extensions/behavior/BehaviourComponents.ts`.

## Referenzen
- [Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)

## Weiterführendes Lesen

- [Besuchen Sie unsere AR Showcase Website](https://engine.needle.tools/projects/ar-showcase/), die viele interaktive AR-Beispiele mit Fokus auf iOS AR & Quicklook enthält
- [Needle Engine Everywhere Action Samples](https://engine.needle.tools/samples/?overlay=samples&tag=everywhere+actions)
- [Bildverfolgung mit Needle Engine](./webxr-image-tracking.md)

Seite automatisch mit KI übersetzt