---
lang: zh-CN
title: 入门与安装
next: ../project-structure.md
---

<br/>

<discountbanner />


# 下载

使用 **Needle Engine**，您可以使用您喜爱的框架创建完全交互式的 3D 网站。

使用 Needle Engine 创建的项目可以部署到 Web 上的任何位置，并通过我们最先进的优化流程进行自动优化，该流程支持自动 LOD，可在不牺牲质量的情况下将资产大小减少多达 100 倍。

Needle Engine 可用作 **Unity 包、Blender 附加组件、即用型 Web Component**，或用作没有编辑器集成的项目的 npm 包。
每个选项都包含我们构建块相同的组件以及创造更多内容的能力——选择权在您。

## 选择您的工作流程

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
| -- | -- | -- |
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

## 代码编辑器和工具

### 安装代码编辑器

Needle Engine 让构建 Web 应用变得轻松。这通常（但不总是）包括使用 JavaScript/TypeScript 编码或编写 HTML 和 CSS 来描述用户界面。我们推荐 [Visual Studio Code](https://code.visualstudio.com) 来创建和编辑这些文件。它是一个免费的开源代码编辑器，可在 Windows、macOS 和 Linux 上运行。

<ClientOnly>
<!-- <br/><os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Unity</os-link> — <os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Blender</os-link> -->

<os-link windows_url="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" osx_url="https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal">下载 Visual Studio Code</os-link>


<br/>
<br/>

### 其他有用的工具

::: tip
Needle Engine 使用以下工具创建您的 Web 应用，但在使用 Unity 或 Blender 集成时，您无需手动安装它们。安装 Needle 集成后，我们将引导您完成安装过程。
:::

<br/>
<os-link windows_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi" osx_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1.pkg">Node.js 20 LTS 或 22 LTS。</os-link>
Needle Engine 使用 Node.js 在您的计算机上本地管理、预览和构建您正在创建的 Web 应用。
它也用于将您的网站上传（部署）到互联网。

<br/><os-link windows_url="https://fwd.needle.tools/needle-engine/toktx/win" osx_url="https://fwd.needle.tools/needle-engine/toktx/osx" osx_silicon_url="https://fwd.needle.tools/needle-engine/toktx/osx-silicon">KTX Software – toktx texture tools。</os-link> 我们使用 Khronos Group 的 toktx 在本地优化和压缩您的 3D 文件。在[文档中的生产构建](../deployment.md#production-builds)部分了解更多信息。

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



## 下一步

现在您已经安装了 Needle Engine，您可以更深入地了解项目创建、组件工作流程、脚本编写、部署等内容。

- [入门：Unity](../unity/index.md)
- [入门：Blender](../blender/index.md)
- [概念：导出 3D 对象和内容](../export.md)
- [概念：项目结构](../project-structure.md)
- [概念：将您的网站部署到 Web](../deployment.md)
- [初学者指南：TypeScript 要点](./typescript-essentials.md)
- [初学者指南：面向 Unity 开发者的 Needle Engine](./for-unity-developers.md)
- [初学者指南：脚本参考](../scripting.md)
- [实时示例：Needle Engine 示例](https://engine.needle.tools/samples)

如果您需要故障排除帮助，请参阅[问答 – FAQ](../faq.md) 部分。
欢迎您加入我们的 [Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) 和 [Discord Community](https://discord.needle.tools)。


---
Page automatically translated using AI