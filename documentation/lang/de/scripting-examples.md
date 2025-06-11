---
title: Scripting Beispiele
description: Eine Sammlung nützlicher Skript-Snippets und Beispiele.
---

# Scripting Beispiele

Wenn Sie neu im Scripting sind, **empfehlen wir dringend**, zuerst die folgenden Anleitungen zu lesen:

- [Einsteiger-Anleitung: Typescript Grundlagen](./getting-started/typescript-essentials.md)
- [Einsteiger-Anleitung: Needle Engine für Unity Entwickler](./getting-started/for-unity-developers.md)
- [Video-Tutorial: Wie man eigene Komponenten schreibt](https://youtu.be/uf5UK0bLHlY?si=82U_2L4n2V7XL7RJ)

Unten finden Sie einige grundlegende Skripte als schnelle Referenz.

Wir bieten auch viele Beispiel-Szenen und komplette Projekte an, die Sie herunterladen und als Ausgangspunkt verwenden können:
- [Besuchen Sie die Samples Website](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=scripting_examples)
- [Laden Sie das Samples Package herunter](https://engine.needle.tools/downloads/unity/samples)
- [Needle Engine Stackblitz Sammlung](https://stackblitz.com/@marwie/collections/needle-engine)
- [Needle Engine API](https://engine.needle.tools/api)

## Grundlegende Komponente
<stackblitz file="@code/basic-component.ts"></stackblitz>
@[code ts twoslash](@code/basic-component.ts)

siehe [scripting](scripting#lifecycle-methods) für alle Komponenten-Events

## Referenzieren eines Objekts aus Unity
@[code ts twoslash](@code/component-object-reference.ts)

## Referenzieren und Laden eines Assets aus Unity (Prefab oder SceneAsset)
@[code ts twoslash](@code/component-prefab.ts)

## Referenzieren und Laden von Szenen aus Unity
::: tip
Finden Sie ein [funktionierendes Beispiel in unseren Samples](https://engine.needle.tools/samples/multi-scenes-(dynamic-loading)) zum Herunterladen und Ausprobieren
:::

@[code ts twoslash](@code/component-scene.ts)

## Klicks auf Objekte empfangen
Fügen Sie dieses Skript zu jedem Objekt in Ihrer Szene hinzu, das anklickbar sein soll. Stellen Sie sicher, dass sich auch eine `ObjectRaycaster` Komponente in der übergeordneten Hierarchie dieses Objekts befindet.

<stackblitz file="@code/component-click.ts">
Test
</stackblitz>

@[code ts twoslash](@code/component-click.ts)


## Vernetzte Klicks auf Objekte

Fügen Sie dieses Skript zu jedem Objekt in Ihrer Szene hinzu, das anklickbar sein soll. Stellen Sie sicher, dass sich auch eine `ObjectRaycaster` Komponente in der übergeordneten Hierarchie dieses Objekts befindet.
Die Komponente sendet den empfangenen Klick an alle verbundenen Clients und löst ein Event aus, auf das Sie dann in Ihrer App reagieren können. Wenn Sie Unity oder Blender verwenden, können Sie einfach Funktionen dem `onClick` Event zuweisen, um z. B. eine Animation abzuspielen oder Objekte auszublenden.

@[code ts twoslash](@code/component-click-networking.ts)

### Animation bei Klick abspielen
@[code ts twoslash](@code/component-animation-onclick.ts)

## Referenzieren eines Animation Clip
Dies kann nützlich sein, wenn Sie Ihre eigene Animationslogik ausführen möchten.
Sie können auch ein Array von Clips exportieren.
@[code ts twoslash](@code/component-animationclip.ts)


## Erstellen und Auslösen eines UnityEvent

@[code ts twoslash](@code/component-unityevent.ts)
::: tip
EventList Events werden auch auf Komponentenebene ausgelöst. Das bedeutet, Sie können das oben deklarierte Event auch mit ``myComponent.addEventListener("my-event", evt => {...})`` abonnieren.
Dies ist eine experimentelle Funktion. Bitte geben Sie Feedback in unserem [Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)
:::


### Deklarieren eines benutzerdefinierten Event-Typs
Dies ist nützlich, wenn Sie ein Event mit benutzerdefinierten Argumenten (wie einem String) in Unity oder Blender verfügbar machen möchten
@[code ts twoslash](@code/component-customevent.ts)

_Beispielverwendung:_
![20221128-210735_Unity-needle](https://user-images.githubusercontent.com/2693840/204370950-4c89b877-90d7-4e6f-8266-3352e6da16f4.png)

## Verschachtelte Objekte und Serialization verwenden

Sie können Objekte und ihre Daten verschachteln. Mit passenden ``@serializable(SomeType)`` Decorators werden die Daten automatisch in die richtigen Typen serialisiert und deserialisiert.

In Ihrer Typescript-Komponente:
@[code ts twoslash](@code/component-nested-serialization.ts)

In C# in jedem Skript:
@[code](@code/component-nested-serialization-cs.cs)

::: tip
Ohne die korrekten Typ-Decorators erhalten Sie die Daten weiterhin, aber nur als einfaches Objekt. Das ist nützlich, wenn Sie Komponenten portieren, da Sie Zugriff auf alle Daten haben und die benötigten Typen hinzufügen können.
:::

## Web APIs verwenden
::: tip
Denken Sie daran, dass Sie weiterhin Zugriff auf alle Web APIs und [npm](https://npmjs.org) Pakete haben!
Das ist die Schönheit von Needle Engine, wenn wir das hier so sagen dürfen 😊
:::

### Aktuellen Standort anzeigen
@[code ts twoslash](@code/component-location.ts)

### Aktuelle Zeit mit einer Coroutine anzeigen
@[code ts twoslash](@code/component-time.ts)

<video-embed src="./videos/component-time.mp4" limit_height />


## Benutzerdefinierte Shader-Eigenschaft ändern

Angenommen, Sie haben einen benutzerdefinierten Shader mit einer Eigenschaft namens `_Speed`, die ein Float-Wert ist, so würden Sie sie von einem Skript aus ändern.
Ein Live-[Beispiel zum Herunterladen finden Sie in unseren Samples](https://engine.needle.tools/samples/shaders/)

<!-- SAMPLE modify custom shader material property -->


## src Attribut wechseln

Siehe [Live-Beispiel](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html) auf StackBlitz


## Neue Postprocessing Effekte hinzufügen

Stellen Sie sicher, dass Sie [`npm i postprocessing`](https://github.com/pmndrs/postprocessing) in Ihrem Webprojekt installieren. Dann können Sie neue Effekte hinzufügen, indem Sie von `PostProcessingEffect` ableiten.

Um den Effekt zu verwenden, fügen Sie ihn demselben Objekt wie Ihre `Volume` Komponente hinzu.

Hier ist ein Beispiel, das den [Outline Postprocessing Effekt](https://pmndrs.github.io/postprocessing/public/demo/#outline) umschließt. Sie können Variablen und Einstellungen wie gewohnt verfügbar machen, da jeder Effekt auch nur eine Komponente in Ihrer three.js Szene ist.

@[code](@code/custom-post-effect.ts)


## Benutzerdefiniertes ParticleSystem Verhalten


@[code ts twoslash](@code/custom-particle-system-behaviour.ts)


## Benutzerdefinierte 2D Audio Komponente

Dies ist ein Beispiel, wie Sie Ihre eigene Audio-Komponente erstellen könnten.
Für die meisten Anwendungsfälle können Sie jedoch die Kern-AudioSource Komponente verwenden und müssen keinen Code schreiben.

@[code ts twoslash](@code/component-2d-audio.ts)


## Beliebige externe Dateien

Verwenden Sie den FileReference Typ, um externe Dateien (z. B. eine JSON-Datei) zu laden.
@[code ts twoslash](@code/component-filereference.ts)

<!-- SAMPLE receive click from HTML button
## HTML-Element-Klick in Komponente empfangen
-->



<!-- SAMPLE disable environment light
## Umgebungslicht deaktivieren
-->


<!-- SAMPLE using mediapipe with hands
## mediapipe Paket verwenden, um die 3D-Szene mit Händen zu steuern
Stellen Sie sicher, dass Sie das mediapipe Paket installieren. Besuchen Sie den GitHub-Link unten, um die komplette Projekteinrichtung zu sehen.
Probieren Sie es [hier live aus](https://engine.needle.tools/samples/mediapipe-hands/) - erfordert eine Webcam/Kamera
-->


<!-- SAMPLE Change Color On Collision
## Farbe bei Kollision ändern
-->

<!-- SAMPLE Physics Trigger Relay
## Physik Trigger Relay
Lösen Sie Events mit den Physik-Trigger-Methoden eines Objekts aus
-->

<!-- SAMPLE Auto Reset
## Auto Reset
Setzen Sie die Position eines Objekts automatisch zurück, wenn es einen Physik-Trigger verlässt
-->

<!-- SAMPLE Play Audio On Collision
## Audio bei Kollision abspielen
-->

<!-- SAMPLE Set Random Color
## Zufällige Farbe setzen
Zufällige Farbe eines Objekts beim Start festlegen. Beachten Sie, dass die Materialien in der `start` Methode geklont werden
-->

<!-- SAMPLE Timed Spawn
## Objekte über Zeit spawnen
-->

Seite automatisch mit AI übersetzt