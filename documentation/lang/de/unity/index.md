---
title: Needle Engine für Unity
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
  <img src="/imgs/unity-logo.webp" style="max-height:70px;" alt="Unity Logo"/>
</div>

# Needle Engine für Unity

Needle Engine für Unity ermöglicht es Ihnen, hochinteraktive, flexible und leichtgewichtige Webanwendungen direkt in Unity zu erstellen. Nutzen Sie die leistungsstarken Werkzeuge des Unity Editors, um Ihre 3D-Szenen visuell einzurichten, zu animieren und zu gestalten. Needle Engine für Unity übernimmt den Export Ihrer Szene nach glTF und lässt sich leicht in jedes Web-Frontend-Framework integrieren.


## Installieren Sie das Unity Package


<NoDownloadYet>
  <br/>
  <needle-button
    event_goal="download_unity"
    event_position="getting_started"
    large
    href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"
    same_tab
    next_url="/docs/unity/"
    >
    <strong>Laden Sie Needle Engine für Unity herunter</strong>
  </needle-button>
</NoDownloadYet>

<!-- [Mirror](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)    -->

1. **Ziehen Sie die heruntergeladene .unitypackage-Datei** in ein Unity-Projekt und bestätigen Sie, dass Sie sie importieren möchten.

2. **Warten Sie einen Moment**, bis die Installation und der Import abgeschlossen sind. Ein Fenster kann sich öffnen, das besagt: "A new scoped registry is now available in the Package Manager.". Dies ist unser Needle Package registry. Sie können dieses Fenster sicher schließen.
3. **Beispiele erkunden**.
  Wählen Sie die Menüoption `Needle Engine > Explore Samples`, um alle verfügbaren [Beispiel-Szenen](https://engine.needle.tools/samples) anzuzeigen, zu öffnen und zu ändern.

## Schnellstart-Video-Tutorial

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />

## Aus einem Beispiel starten

Es gibt über 100 Beispiele, die eine breite Palette von Themen, Anwendungsfällen und Branchen abdecken.
Für einen schnellen Überblick werfen Sie einen Blick auf unsere [Beispielseite](https://engine.needle.tools/samples/).

Alle diese Beispiele sind direkt in Unity verfügbar:
1. Gehen Sie zu `Needle Engine > Explore Samples`, um nach Beispielen zu suchen.
2. Klicken Sie auf "Install Samples", um das samples package direkt in Ihrem editor zu installieren (oder [laden Sie das samples unitypackage herunter](http://engine.needle.tools/downloads/unity/samples), um das package manuell zu installieren).
3. Wählen Sie ein beliebiges Beispiel und klicken Sie auf `Open Scene`.

:::tip Die Beispiele sind schreibgeschützt – das macht sie leicht zu aktualisieren.
Unsere Beispiel-Szenen sind Teil eines UPM package in Unity. Das bedeutet, dass Sie die assets und scripts darin nicht direkt bearbeiten können – sie sind read-only. Um ein asset aus dem samples package zu bearbeiten, kopieren Sie es in den `Assets`-Ordner Ihres Projekts. Um ein script aus dem samples package zu bearbeiten, kopieren Sie es in den `src`-Ordner Ihres web project.
:::

## Aus einer Vorlage starten

Wir bieten eine Reihe von Scene Templates an, um schnell neue Projekte zu starten.
Diese ermöglichen es Ihnen, mit wenigen Klicks von der Idee zum Prototyp zu gelangen.

1. Klicken Sie auf `File > New Scene`.

2. Wählen Sie eine der Templates mit (needle) im Namen und klicken Sie auf `Create`.
   Wir empfehlen die [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox) Template, die eine großartige Möglichkeit ist, mit Interaktivität, Multiplayer und dem Hinzufügen von assets zu beginnen.
3. Klicken Sie auf Play, um Ihr neues web project zu installieren und zu starten.

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)


## Von Grund auf neu beginnen

Wenn Sie nicht von einer Scene Template starten möchten, können Sie diese Schritte befolgen.
Im Grunde werden wir die "Minimal (Needle)" Template, die mit dem package geliefert wird, neu erstellen.

1. **Erstellen Sie eine neue leere Szene**

2. **Richten Sie Ihre Szene für den Export ein**
  Fügen Sie ein leeres GameObject hinzu, nennen Sie es "Exporter" und fügen Sie die `Needle Engine` component hinzu (früher `Export Info` genannt).
  In dieser component erstellen und greifen Sie schnell auf Ihr exportiertes runtime project zu.
  Sie warnt Sie auch, wenn eines unserer packages und modules veraltet oder nicht lokal in Ihrem web project installiert ist.

    ::: tip Projektname und Szenenname
    Standardmäßig entspricht der Projektname dem Namen Ihrer Szene. Wenn Sie dies ändern möchten, können Sie einen ``Directory Name`` auswählen oder eingeben, in dem Sie Ihr neues web project erstellen möchten. Der Pfad ist relativ zu Ihrem Unity-Projekt.
    :::

3. **Wählen Sie eine web project template**
  Wählen Sie nun eine web project template für Ihr Projekt aus. Die Standardtemplate basiert auf [Vite](https://vitejs.dev/), einem schnellen Web-App-Bundler.
  <br/>
    ![Unity ExportInfo local templates](/imgs/unity-project-local-template.jpg)


4. Klicken Sie auf Play, um Ihr neues web project zu installieren und zu starten


:::tip Definieren Sie Ihre eigenen Templates
Wenn Sie viele ähnliche Projekte erstellen, können Sie eigene lokale oder remote templates mit dem Project View context menu unter `Create/Needle Engine/Project Template` erstellen. Templates können entweder local on disk liegen (ein Ordner wird kopiert) oder remote repositories sein (ein git repository wird geklont).
:::

## Projektordner und Dateien


| Ordner | |
| --- | --- |
| **Unity** | |
| `Assets` | Hier leben projektspezifische/exklusive assets. |
| `Packages` | Hier leben packages, die für dieses Projekt installiert sind. Ein package kann jeden asset-Typ enthalten. Der Hauptunterschied ist, dass es zu mehreren Unity-Projekten hinzugefügt werden kann. Es ist daher eine großartige Methode, Code oder assets zu teilen. Um mehr über packages zu erfahren, siehe [die Unity-Dokumentation über packages](https://docs.unity3d.com/Manual/PackagesList.html).
| **Needle Engine Unity Package** | |
| ``Core/Runtime/Components`` | Enthält alle Needle Engine eingebauten components. Erfahren Sie mehr darüber in der [Components Referenz](./../component-reference.md). |

-----

Beim Erstellen eines neuen web project in Unity können Sie es aus einer local template erstellen (standardmäßig liefern wir eine vite-basierte web template mit).

Sie können auch remote templates referenzieren, indem Sie eine repository URL im ExportInfo project path eingeben (diese kann z.B. mit Ihrer Szene gespeichert werden). Beim Erstellen eines neuen web project wird das repository entweder geklont oder heruntergeladen (je nachdem, ob Sie git installiert haben) und nach einer `needle.config.json`-Datei gesucht. Wenn keine im geklonten repository gefunden werden kann, wird das Root-Verzeichnis verwendet. Beispiele für remote template projects finden Sie auf [github.com/needle-engine](https://github.com/needle-engine).

![Unity ExportInfo local templates](/imgs/unity-project-remote-template.jpg)

### Temporäre Projekte

Wenn Sie planen, nur custom files über NpmDefs hinzuzufügen und die project config nicht zu ändern (z.B. für einen schnellen fullscreen test), können Sie dem project path ein `Library` voranstellen. Das Projekt wird in der Unity Project Library generiert und muss nicht zur source control hinzugefügt werden (der Library-Ordner sollte von der source control ausgeschlossen werden). Wir nennen diese Projekte _temporary projects_. Sie eignen sich hervorragend, um Ideen schnell zu testen!


## Typescript in Unity

**NPM Definition** sind [npm packages](https://docs.npmjs.com/about-packages-and-modules), die eng in den Unity Editor integriert sind, was es leicht möglich macht, Scripts mit mehreren Web- oder sogar Unity-Projekten zu teilen.

C# component stubs für typescript Dateien werden ebenfalls automatisch für Scripts innerhalb von npmdef packages generiert.

#### Erstellen und Installieren einer npmdef
Um eine *NPM Definition* zu erstellen, klicken Sie mit der rechten Maustaste im Unity Project browser und wählen Sie ``Create/NPM Definition``.
Sie können ein ***NPM Definition* package** zu Ihrem runtime project installieren, indem Sie z.B. Ihre ``Export Info`` component auswählen und sie zur ``dependencies`` Liste hinzufügen (intern wird dadurch nur das zugrunde liegende npm package zu Ihrer package.json hinzugefügt).

![image](https://user-images.githubusercontent.com/5083203/170374130-d0e32516-a1d4-4903-97c2-7ec9fa0b17d4.png)

Vergessen Sie nicht, das neu hinzugefügte package zu installieren, indem Sie z.B. auf Install auf der ExportInfo component klicken und auch den server neu starten, falls er bereits läuft

Um den code innerhalb eines *NPM Definition* package zu bearbeiten, doppelklicken Sie einfach auf das asset *NPM Definition* asset in Ihrem project browser und es wird der vscode workspace geöffnet, der mit jeder npmdef geliefert wird.


# Nächste Schritte

- [Konzept: Web Projects](../project-structure.md)
- [Konzept: Exportieren von Assets](../export.md)
- [Konzept: Deployment (Teilen Sie Ihre Website)](../deployment.md)
- [Components: Erfahren Sie mehr über Everywhere Actions](../everywhere-actions.md)
- [Scripting für Anfänger: Typescript Essentials](../getting-started/typescript-essentials.md)
- [Scripting für Anfänger: Wie man eigene components schreibt](../scripting.md)

Seite automatisch übersetzt mit KI