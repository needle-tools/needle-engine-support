---
lang: es-ES
title: Primeros pasos e instalación
next: ../project-structure.md
---

<br/>

<discountbanner />


# Descargas

Con **Needle Engine**, puedes crear sitios web 3D completamente interactivos utilizando tu framework favorito.

Los proyectos creados con Needle Engine se pueden desplegar en cualquier lugar de la web y se optimizan automáticamente mediante nuestra pipeline de optimización de última generación con soporte automático de LOD, reduciendo el tamaño de los assets hasta x100 sin comprometer la calidad.

Needle Engine está disponible como **paquete para Unity, add-on para Blender, un Web Component listo para usar**, o como un paquete npm para proyectos sin integración de editor.
Cada uno de ellos viene con los mismos componentes, nuestros bloques de construcción y el poder para crear más – la elección es tuya.

## Elige tu flujo de trabajo

<tool-tiles></tool-tiles>

<!-- | Tool |  |  |
| -- | -- | -- |
| Node.js **(required)** | 16.x or 18.x <br>[Windows](https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi) <br/> [MacOS](https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg)   | For running a local development server
| VS Code *(recommended)* | any version<br/>[Windows](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user) <br/> [MacOS](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal) | For code editing (optional)  |
| **Supported Editors** | |
| Unity | 2020.3.16+ <br/>2021.3.9+ <br/>2022.3.0+<br/>[Get Unity Hub](https://unity.com/download) | For setting up your scenes, components, animations... |
| Blender | 3.3<br/>3.4<br/>3.5<br/>3.6<br/>[Get Blender](https://www.blender.org/download/) | For setting up your scenes, components, animations... |
   -->


<!-- ### For optimized builds

| Tool | | |
| -- | -- | |
| | | |
| **toktx** | 4.1<br/>[Windows](https://fwd.needle.tools/needle-engine/toktx/win) <br/> [MacOS](https://fwd.needle.tools/needle-engine/toktx/osx) <br/> [Mac OS Apple Silicon](https://fwd.needle.tools/needle-engine/toktx/osx-silicon) <br/> [Other Releases](https://github.com/KhronosGroup/KTX-Software/releases/tag/v4.1.0-rc3)  | For texture compression (recommended) <br/>You can read more about that [here](./deployment.md#production-builds) in our docs -->



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

## Editor de código y herramientas

### Instalar un editor de código

Needle Engine facilita la creación de aplicaciones web. Esto a menudo, pero no siempre, incluye codificar con JavaScript/TypeScript o escribir HTML y CSS para describir interfaces de usuario. Recomendamos [Visual Studio Code](https://code.visualstudio.com) para crear y editar estos archivos. Es un editor de código gratuito y de código abierto que se ejecuta en Windows, macOS y Linux.

<ClientOnly>
<!-- <br/><os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Unity</os-link> — <os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Blender</os-link> -->

<os-link windows_url="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" osx_url="https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal">Descargar Visual Studio Code</os-link>


<br/>
<br/>

### Otras herramientas útiles

::: tip
Needle Engine utiliza las siguientes herramientas para crear tu aplicación web, pero no necesitas instalarlas manualmente si utilizas la integración de Unity o Blender. Te guiaremos a través del proceso de instalación después de que hayas instalado la integración de Needle.
:::

<br/>
<os-link windows_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi" osx_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1.pkg">Node.js 20 LTS o 22 LTS.</os-link>
Needle Engine utiliza Node.js para gestionar, previsualizar y compilar la aplicación web que estás creando localmente en tu ordenador.
También se utiliza para subir (desplegar) tu sitio web a internet.

<br/><os-link windows_url="https://fwd.needle.tools/needle-engine/toktx/win" osx_url="https://fwd.needle.tools/needle-engine/toktx/osx" osx_silicon_url="https://fwd.needle.tools/needle-engine/toktx/osx-silicon">KTX Software – toktx texture tools.</os-link> Utilizamos toktx de Khronos Group para optimizar y comprimir localmente tus archivos 3D. Aprende más sobre las compilaciones de producción [en la documentación](../deployment.md#production-builds).

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



## Próximos pasos

Ahora que has instalado Needle Engine, estás listo para profundizar en la creación de proyectos, flujos de trabajo de componentes, scripting, despliegue y más.

- [Primeros pasos: Unity](../unity/index.md)
- [Primeros pasos: Blender](../blender/index.md)
- [Concepto: Exportación de objetos y contenido 3D](../export.md)
- [Concepto: Estructura del proyecto](../project-structure.md)
- [Concepto: Despliega tu sitio web en la web](../deployment.md)
- [Guía para principiantes: Conceptos esenciales de Typescript](./typescript-essentials.md)
- [Guía para principiantes: Needle Engine para desarrolladores de Unity](./for-unity-developers.md)
- [Guía para principiantes: Referencia de scripting](../scripting.md)
- [Ejemplos en vivo: Ejemplos de Needle Engine](https://engine.needle.tools/samples)

En caso de que necesites ayuda para solucionar problemas, consulta la sección [Preguntas y respuestas – FAQ](../faq.md).
Te invitamos a unirte a nuestro [Foro](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) y a la [Comunidad de Discord](https://discord.needle.tools).

Página traducida automáticamente con IA