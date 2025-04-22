---
title: Scripting Beispiele
description: Eine Sammlung nützlicher Skript-Snippets und Beispiele.
---

# Scripting Beispiele

Wenn du neu im Scripting bist, **empfehlen wir dringend**, zuerst die folgenden Anleitungen zu lesen:

- [Einsteiger-Anleitung: Typescript Grundlagen](./getting-started/typescript-essentials.md)
- [Einsteiger-Anleitung: Needle Engine für Unity Entwickler](./getting-started/for-unity-developers.md)
- [Video-Tutorial: Wie man eigene Komponenten schreibt](https://youtu.be/uf5UK0bLHlY?si=82U_2L4n2V7XL7RJ)

Unten findest du einige grundlegende Skripte als schnelle Referenz.

Wir bieten auch viele Beispiel-Szenen und komplette Projekte an, die du herunterladen und als Ausgangspunkt verwenden kannst:
- [Besuche die Samples Website](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=scripting_examples)
- [Lade das Samples Package herunter](https://engine.needle.tools/downloads/unity/samples)
- [Needle Engine Stackblitz Sammlung](https://stackblitz.com/@marwie/collections/needle-engine)
- [Needle Engine API](https://engine.needle.tools/api)

## Grundlegende Komponente
<stackblitz file="@code/basic-component.ts"></stackblitz>
@[code ts twoslash](@code/basic-component.ts)

siehe [scripting](scripting#lifecycle-methods) für alle Komponenten-Events

## Referenziere ein Objekt aus Unity
@[code ts twoslash](@code/component-object-reference.ts)

## Referenziere und lade ein Asset aus Unity (Prefab oder SceneAsset)
@[code ts twoslash](@code/component-prefab.ts)

## Referenziere und lade Szenen aus Unity
::: tip
Finde ein [funktionierendes Beispiel in unseren Samples](https://engine.needle.tools/samples/multi-scenes-(dynamic-loading)) zum Herunterladen und Ausprobieren
:::

@[code ts twoslash](@code/component-scene.ts)

## Klicks auf Objekte empfangen
Füge dieses Skript zu jedem Objekt in deiner Szene hinzu, das anklickbar sein soll. Stelle sicher, dass sich auch eine `ObjectRaycaster` Komponente in der übergeordneten Hierarchie dieses Objekts befindet.

<stackblitz file="@code/component-click.ts">
test
</stackblitz>

@[code ts twoslash](@code/component-click.ts)


## Vernetzte Klicks auf Objekte

Füge dieses Skript zu jedem Objekt in deiner Szene hinzu, das anklickbar sein soll. Stelle sicher, dass sich auch eine `ObjectRaycaster` Komponente in der übergeordneten Hierarchie dieses Objekts befindet.
Die Komponente sendet den empfangenen Klick an alle verbundenen Clients und löst ein Event aus, auf das du dann in deiner App reagieren kannst. Wenn du Unity oder Blender verwendest, kannst du einfach Funktionen dem `onClick` Event zuweisen, um z. B. eine Animation abzuspielen oder Objekte auszublenden.

@[code ts twoslash](@code/component-click-networking.ts)

### Animation bei Klick abspielen
@[code ts twoslash](@code/component-animation-onclick.ts)

## Referenziere einen Animation Clip
Dies kann nützlich sein, wenn du deine eigene Animationslogik ausführen möchtest.
Du kannst auch ein Array von Clips exportieren.
@[code ts twoslash](@code/component-animationclip.ts)


## Erstelle und löse ein UnityEvent aus

@[code ts twoslash](@code/component-unityevent.ts)
::: tip
EventList Events werden auch auf Komponentenebene ausgelöst. Das bedeutet, du kannst das oben deklarierte Event auch mit ``myComponent.addEventListener("my-event", evt => {...})`` abonnieren.
Dies ist eine experimentelle Funktion. Bitte gib Feedback in unserem [Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)
:::


### Deklariere einen benutzerdefinierten Event-Typ
Dies ist nützlich, wenn du ein Event mit benutzerdefinierten Argumenten (wie einem String) in Unity oder Blender verfügbar machen möchtest
@[code ts twoslash](@code/component-customevent.ts)

_Beispielverwendung:_
![20221128-210735_Unity-needle](https://user-images.githubusercontent.com/2693840/204370950-4c89b877-90d7-4e6f-8266-3352e6da16f4.png)

## Verschachtelte Objekte und Serialization verwenden

Du kannst Objekte und ihre Daten verschachteln. Mit passenden ``@serializable(SomeType)`` Decorators werden die Daten automatisch in die richtigen Typen serialisiert und deserialisiert.

In deiner Typescript-Komponente:
@[code ts twoslash](@code/component-nested-serialization.ts)

In C# in jedem Skript:
@[code](@code/component-nested-serialization-cs.cs)

::: tip
Ohne die korrekten Typ-Decorators erhältst du die Daten weiterhin, aber nur als einfaches Objekt. Das ist nützlich, wenn du Komponenten portierst, da du Zugriff auf alle Daten hast und die benötigten Typen hinzufügen kannst.
:::

## Web APIs verwenden
::: tip
Denke daran, dass du weiterhin Zugriff auf alle Web APIs und [npm](https://npmjs.org) Pakete hast!
Das ist die Schönheit von Needle Engine, wenn wir das hier so sagen dürfen 😊
:::

### Aktuellen Standort anzeigen
@[code ts twoslash](@code/component-location.ts)

### Aktuelle Zeit mit einer Coroutine anzeigen
@[code ts twoslash](@code/component-time.ts)

<video-embed src="./videos/component-time.mp4" limit_height />


## Benutzerdefinierte Shader-Eigenschaft ändern

Angenommen, du hast einen benutzerdefinierten Shader mit einer Eigenschaft namens `_Speed`, die ein Float-Wert ist, so würdest du sie von einem Skript aus ändern.
Ein Live-[Beispiel zum Herunterladen findest du in unseren Samples](https://engine.needle.tools/samples/shaders/)

<!-- SAMPLE modify custom shader material property -->


## src Attribut wechseln

Siehe [Live-Beispiel](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html) auf StackBlitz


## Neue Postprocessing Effekte hinzufügen

Stelle sicher, dass du [`npm i postprocessing`](https://github.com/pmndrs/postprocessing) in deinem Webprojekt installierst. Dann kannst du neue Effekte hinzufügen, indem du von `PostProcessingEffect` ableitest.

Um den Effekt zu verwenden, füge ihn demselben Objekt wie deine `Volume` Komponente hinzu.

Hier ist ein Beispiel, das den [Outline Postprocessing Effekt](https://pmndrs.github.io/postprocessing/public/demo/#outline) umschließt. Du kannst Variablen und Einstellungen wie gewohnt verfügbar machen, da jeder Effekt auch nur eine Komponente in deiner three.js Szene ist.

@[code](@code/custom-post-effect.ts)


## Benutzerdefiniertes ParticleSystem Verhalten


@[code ts twoslash](@code/custom-particle-system-behaviour.ts)


## Benutzerdefinierte 2D Audio Komponente

Dies ist ein Beispiel, wie du deine eigene Audio-Komponente erstellen könntest.
Für die meisten Anwendungsfälle kannst du jedoch die Kern-AudioSource Komponente verwenden und musst keinen Code schreiben.

@[code ts twoslash](@code/component-2d-audio.ts)


## Beliebige externe Dateien

Verwende den FileReference Typ, um externe Dateien (z. B. eine JSON-Datei) zu laden.
@[code ts twoslash](@code/component-filereference.ts)

<!-- SAMPLE receive click from HTML button
## HTML-Element-Klick in Komponente empfangen
-->



<!-- SAMPLE disable environment light
## Umgebungslicht deaktivieren
-->


<!-- SAMPLE using mediapipe with hands
## mediapipe Paket verwenden, um die 3D-Szene mit Händen zu steuern
Stelle sicher, dass du das mediapipe Paket installierst. Besuche den GitHub-Link unten, um die komplette Projekteinrichtung zu sehen.
Probiere es [hier live aus](https://engine.needle.tools/samples/mediapipe-hands/) - erfordert eine Webcam/Kamera
-->


<!-- SAMPLE Change Color On Collision
## Farbe bei Kollision ändern
-->

<!-- SAMPLE Physics Trigger Relay
## Physik Trigger Relay
Löse Events mit den Physik-Trigger-Methoden eines Objekts aus
-->

<!-- SAMPLE Auto Reset
## Auto Reset
Setze die Position eines Objekts automatisch zurück, wenn es einen Physik-Trigger verlässt
-->

<!-- SAMPLE Play Audio On Collision
## Audio bei Kollision abspielen
-->

<!-- SAMPLE Set Random Color
## Zufällige Farbe setzen
Zufällige Farbe eines Objekts beim Start festlegen. Beachte, dass die Materialien in der `start` Methode geklont werden
-->

<!-- SAMPLE Timed Spawn
## Objekte über Zeit spawnen
-->
Seite automatisch mit AI übersetzt