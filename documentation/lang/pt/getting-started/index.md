---
lang: po-PT
title: Começar e Instalação
next: ../project-structure.md
---

<br/>

<discountbanner />

# Downloads

Com o **Needle Engine**, pode criar websites 3D totalmente interativos usando o seu framework favorito.

Projetos criados com o Needle Engine podem ser implementados em qualquer lugar na web e são otimizados automaticamente pelo nosso pipeline de otimização de última geração com suporte automático a LOD – reduzindo o tamanho dos assets em até x100 sem comprometer a qualidade.

O Needle Engine está disponível como um **package para Unity, add-on para Blender, um Web Component pronto a usar**, ou como um package npm para projetos sem integração de editor.
Cada um destes vem com os mesmos componentes, os nossos blocos de construção e a potência para criar mais – a escolha é sua.

## Escolha o seu Fluxo de Trabalho

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

## Editor de Código e Ferramentas

### Instalar um editor de código

O Needle Engine facilita a criação de web apps. Isso frequentemente, mas nem sempre, inclui codificar com JavaScript/TypeScript ou escrever HTML e CSS para descrever interfaces de utilizador. Recomendamos o [Visual Studio Code](https://code.visualstudio.com) para criar e editar esses ficheiros. É um editor de código gratuito e de código aberto que funciona em Windows, macOS e Linux.

<ClientOnly>
<!-- <br/><os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Unity</os-link> — <os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Blender</os-link> -->

<os-link windows_url="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" osx_url="https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal">Descarregar Visual Studio Code</os-link>

<br/>
<br/>

### Outras ferramentas úteis

::: tip
O Needle Engine usa as seguintes ferramentas para criar a sua web app, mas não precisa de as instalar manualmente ao usar a integração com Unity ou Blender. Iremos guiá-lo através do processo de instalação após ter instalado a integração com o Needle.
:::

<br/>
<os-link windows_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi" osx_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1.pkg">Node.js 20 LTS ou 22 LTS.</os-link>
O Needle Engine usa Node.js para gerir, pré-visualizar e construir a web app que está a criar localmente no seu computador.
Também é usado para carregar (implementar) o seu website na internet.

<br/><os-link windows_url="https://fwd.needle.tools/needle-engine/toktx/win" osx_url="https://fwd.needle.tools/needle-engine/toktx/osx" osx_silicon_url="https://fwd.needle.tools/needle-engine/toktx/osx-silicon">KTX Software – ferramentas de textura toktx.</os-link> Usamos toktx da Khronos Group para otimizar e comprimir localmente os seus ficheiros 3D. Saiba mais sobre compilações de produção [na documentação](../deployment.md#production-builds).

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

## Próximos Passos

Agora que instalou o Needle Engine, está pronto para mergulhar mais fundo na criação de projetos, fluxos de trabalho de componentes, scripting, implementação e muito mais.

-   [Começar: Unity](../unity/index.md)
-   [Começar: Blender](../blender/index.md)
-   [Conceito: Exportar objetos e conteúdo 3D](../export.md)
-   [Conceito: Estrutura do Projeto](../project-structure.md)
-   [Conceito: Implementar o seu website na web](../deployment.md)
-   [Guia para Iniciantes: Fundamentos de Typescript](./typescript-essentials.md)
-   [Guia para Iniciantes: Needle Engine para Desenvolvedores Unity](./for-unity-developers.md)
-   [Guia para Iniciantes: Referência de Scripting](../scripting.md)
-   [Exemplos ao vivo: Exemplos de Needle Engine](https://engine.needle.tools/samples)

Caso precise de ajuda para resolver problemas, consulte a seção [Perguntas e Respostas – FAQ](../faq.md).
Convidamo-lo a juntar-se ao nosso [Fórum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) e [Comunidade Discord](https://discord.needle.tools).

---
Página traduzida automaticamente usando IA