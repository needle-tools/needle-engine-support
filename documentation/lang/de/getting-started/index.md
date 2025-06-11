---
lang: de-DE
title: Erste Schritte & Installation
next: ../project-structure.md
---

<br/>

<discountbanner />


# Downloads

Mit **Needle Engine** können Sie vollständig interaktive 3D-Websites mit Ihrem bevorzugten Framework erstellen.

Mit Needle Engine erstellte Projekte können überall im Web bereitgestellt und von unserer hochmodernen Optimierungs-Pipeline mit automatischer LOD-Unterstützung automatisch optimiert werden – wodurch die Asset-Größe um das bis zu 100-fache reduziert wird, ohne die Qualität zu beeinträchtigen.

Needle Engine ist als **Paket für Unity, Add-on für Blender, als vorgefertigte Web Component** oder als npm package für Projekte ohne Editor-Integration erhältlich.
Jede dieser Optionen enthält dieselben Komponenten als unsere Bausteine und die Möglichkeit, mehr zu erstellen – Sie haben die Wahl.

## Wählen Sie Ihren Workflow

<tool-tiles></tool-tiles>

<!-- | Tool |  |  |
| -- | -- | -- |
| Node.js **(required)** | 16.x or 18.x <br>[Windows](https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi) <br/> [MacOS](https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg)   | Zum Ausführen eines lokalen Entwicklungsservers
| VS Code *(recommended)* | any version<br/>[Windows](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user) <br/> [MacOS](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal) | Zur Code-Bearbeitung (optional)  |
| **Supported Editors** | |
| Unity | 2020.3.16+ <br/>2021.3.9+ <br/>2022.3.0+<br/>[Get Unity Hub](https://unity.com/download) | Zum Einrichten Ihrer Szenen, Komponenten, Animationen... |
| Blender | 3.3<br/>3.4<br/>3.5<br/>3.6<br/>[Get Blender](https://www.blender.org/download/) | Zum Einrichten Ihrer Szenen, Komponenten, Animationen... |
   -->


<!-- ### For optimized builds

| Tool | | |
| -- | -- | -- |
| | | |
| **toktx** | 4.1<br/>[Windows](https://fwd.needle.tools/needle-engine/toktx/win) <br/> [MacOS](https://fwd.needle.tools/needle-engine/toktx/osx) <br/> [Mac OS Apple Silicon](https://fwd.needle.tools/needle-engine/toktx/osx-silicon) <br/> [Other Releases](https://github.com/KhronosGroup/KTX-Software/releases/tag/v4.1.0-rc3)  | Zur Texturkomprimierung (empfohlen) <br/>Mehr dazu können Sie [hier](./deployment.md#production-builds) in unserer Dokumentation lesen -->



<br/>
<br/>



<!--
<img src="/imgs/unity-logo.webp" style="max-height:70px;" />


## Needle Engine for Unity

*Supported Unity versions: 2021.3 LTS, 2022.3 LTS*

<needle-button event_goal="download_unity" event_position="getting_started" large href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"><strong>Download Needle Engine for Unity</strong></needle-button>

- Drop the downloaded .unitypackage file into a Unity project and confirm that you want to import it.
- Wait a moment for the installation and import to finish. A window may open stating that "A new scoped registry is now available in the Package Manager.". This is our Needle Package registry. You can safely close that window.
- **Explore Samples** – Select the menu option _Needle Engine > Explore Samples_ to view, open and modify all available [sample scenes](https://engine.needle.tools/samples).


**See [Needle Engine for Unity](../unity/index.md)** for a full list of features and instructions on getting started.


---


<img src="/blender/logo.png" style="max-height:70px;" />

## Needle Engine for Blender
*Supported Blender versions: 4.1+*

<needle-button event_goal="download_blender" event_position="getting_started" large href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"><strong>Download Needle Engine for Blender</strong></needle-button>

<br/>

- The Blender add-on is downloaded as a zip file.
- In Blender, go to `File > Settings > Add-ons` and click the `Install` button.
- Then select the downloaded zip to install it.

**See [Needle Engine for Blender](../blender/index.md)** for a full list of features and instructions on getting started.

<br/>
<br/>
<br/>



<br/>
<br/>
<br/>

-->

## Code-Editor und Tools

### Einen Code-Editor installieren

Mit Needle Engine können Sie ganz einfach Web-Apps erstellen. Das beinhaltet oft, aber nicht immer, das Programmieren mit JavaScript/TypeScript oder das Schreiben von HTML und CSS zur Beschreibung von Benutzeroberflächen. Wir empfehlen [Visual Studio Code](https://code.visualstudio.com) zum Erstellen und Bearbeiten dieser Dateien. Es ist ein kostenloser, quelloffener Code-Editor, der unter Windows, macOS und Linux läuft.

<ClientOnly>
<!-- <br/><os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Unity</os-link> — <os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Blender</os-link> -->

<os-link windows_url="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" osx_url="https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal">Visual Studio Code herunterladen</os-link>


<br/>
<br/>

### Weitere nützliche Tools

::: tip
Needle Engine verwendet die folgenden Tools, um Ihre Web-App zu erstellen, aber Sie müssen sie nicht manuell installieren, wenn Sie die Unity- oder Blender-Integration verwenden. Wir führen Sie nach der Installation der Needle-Integration durch den Installationsprozess.
:::

<br/>
<os-link windows_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi" osx_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1.pkg">Node.js 20 LTS or 22 LTS.</os-link>
Needle Engine verwendet Node.js, um die Web-App, die Sie lokal auf Ihrem Computer erstellen, zu verwalten, in der Vorschau anzuzeigen und zu erstellen.
Es wird auch zum Hochladen (Deployment) Ihrer Website ins Internet verwendet.

<br/><os-link windows_url="https://fwd.needle.tools/needle-engine/toktx/win" osx_url="https://fwd.needle.tools/needle-engine/toktx/osx" osx_silicon_url="https://fwd.needle.tools/needle-engine/toktx/osx-silicon">KTX Software – toktx texture tools.</os-link> Wir verwenden toktx von der Khronos Group, um Ihre 3D-Dateien lokal zu optimieren und zu komprimieren. Erfahren Sie mehr über Production Builds [in der Dokumentation](../deployment.md#production-builds).

<br/>
</ClientOnly>

<!--
## Option 1: Quick Start — Starter Project ⚡
1. **Download or Clone this repository**
   It's set up with the right packages and settings to get you started right away.

   _Clone with HTTPS:_ ``https://github.com/needle-tools/needle-engine-support.git``
   _OR clone with SSH:_ ``git@github.com:needle-tools/needle-engine-support.git``
   _OR download directly:_ <a href="https://github.com/needle-tools/needle-engine-support/archive/refs/heads/main.zip" target="_blank">Download Repository</a>


2. **Open the starter project**
  Open `starter/Needle Engine Starter 2020_3` for a full sandbox project that's ready to run (including a couple of simple example scenes for lightmaps and custom shaders).
  This is a sandbox builder project! It already comes with multi-player capabilities, and works across mobile, desktop, VR and AR.

3. **Press Play**
  Make sure the scene CollaborativeSandbox is open, and press Play! This will automatically do some setup steps and start a local server.
  Once the setup is complete, a browser window will open, and your project is live.
  From now on, all changes you do in Unity will be immediately visible in your browser.

    > **Note**: Your browser might warn you about an untrusted SSL connection. Don't worry, the connection is still encrypted – please click "Advance" if your browser asks you to verify that you're sure you want to visit your server.

4. **Make it your own**
  Add assets and components, play around with lighting, add scripts and logic – this is your world now!
  You can also [publish it on the web for free](#deploy-your-project-to-glitch-) so that others can join you.
-->



## Nächste Schritte

Nachdem Sie Needle Engine installiert haben, können Sie tiefer in die Projekterstellung, Component-Workflows, Scripting, Deployment und mehr eintauchen.

- [Erste Schritte: Unity](../unity/index.md)
- [Erste Schritte: Blender](../blender/index.md)
- [Konzept: Exportieren von 3D-Objekten und -Inhalten](../export.md)
- [Konzept: Projektstruktur](../project-structure.md)
- [Konzept: Deployment Ihrer Website ins Web](../deployment.md)
- [Anfängerhandbuch: Typescript Essentials](./typescript-essentials.md)
- [Anfängerhandbuch: Needle Engine for Unity Developers](./for-unity-developers.md)
- [Anfängerhandbuch: Scripting Reference](../scripting.md)
- [Live-Beispiele: Needle Engine Samples](https://engine.needle.tools/samples)

Falls Sie Hilfe bei der Fehlerbehebung benötigen, lesen Sie bitte den Abschnitt [Fragen und Antworten – FAQ](../faq.md).
Wir laden Sie herzlich ein, unserem [Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) und unserer [Discord Community](https://discord.needle.tools) beizutreten.

Seite automatisch übersetzt mit KI