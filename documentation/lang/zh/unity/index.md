---
title: Unity 版 Needle Engine
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
  <img src="/imgs/unity-logo.webp" style="max-height:70px;" />
</div>

# Unity 版 Needle Engine

Unity 版 Needle Engine 允许您直接在 Unity 中创建高度交互、灵活且轻量级的 Web 应用程序。使用强大的 Unity 编辑器工具来可视化设置您的 3D 场景、动画和设计。Unity 版 Needle Engine 负责将您的场景导出为 glTF，并轻松与任何 Web 前端框架集成。


## 安装 Unity 包


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
    <strong>下载 Unity 版 Needle Engine</strong>
  </needle-button> 
</NoDownloadYet>

<!-- [Mirror](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)    -->

1. **将下载的 .unitypackage 文件拖放**到 Unity 项目中，并确认您要导入它。

2. **稍等片刻**，等待安装和导入完成。可能会弹出一个窗口，提示“A new scoped registry is now available in the Package Manager.”（Package Manager 中有新的范围注册表可用）。这是我们的 Needle 包注册表。您可以安全地关闭该窗口。  
3. **探索示例**。  
  选择菜单选项 `Needle Engine > Explore Samples` 来查看、打开和修改所有可用的[示例场景](https://engine.needle.tools/samples)。  

## 快速入门视频教程

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />

## 从示例开始

有 100 多个示例，涵盖广泛的主题、用例和行业。  
要快速概览，请查看我们的[示例页面](https://engine.needle.tools/samples/)。

所有这些示例都直接在 Unity 中提供：
1. 前往 `Needle Engine > Explore Samples` 浏览示例
2. 点击“Install Samples”将示例包直接安装到您的编辑器中（或者[下载示例 unitypackage](http://engine.needle.tools/downloads/unity/samples) 手动安装包）
3. 选择任意示例并点击 `Open Scene`。

:::tip 示例是只读的 – 这使得它们易于更新。
我们的示例场景是 Unity 中 UPM 包的一部分。这意味着您无法直接编辑其中的资产和脚本——它们是只读的。要编辑示例包中的资产，请将其复制到您的项目 `Assets` 文件夹中。要编辑示例包中的脚本，请将其复制到您的 Web 项目的 `src` 文件夹中。
::: 

## 从模板开始

我们提供了许多场景模板，以便快速启动新项目。  
这些模板允许您在几次点击中从想法变为原型。  

1. 点击 `File > New Scene`

2. 选择名称中带有 (needle) 的模板之一，然后点击 `Create`。   
   我们推荐 [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox) 模板，它是开始交互性、多人游戏和添加资产的绝佳方式。  
3. 点击 Play 以安装并启动您的新 Web 项目。

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)


## 从零开始

如果您不想从场景模板开始，可以按照以下步骤操作。  
实际上，我们将重新创建随包附带的“Minimal (Needle)”模板。  

1. **创建一个新的空场景**  

2. **设置场景以便导出**   
  添加一个空的 GameObject，命名为“Exporter”，并为其添加 `Needle Engine` 组件（之前名为 `Export Info`）。  
  在此组件中，您可以创建并快速访问导出的运行时项目。  
  如果我们的任何包或模块已过时或未在您的 Web 项目中本地安装，它也会发出警告。  

    ::: tip 项目名称和场景名称
    默认情况下，项目名称与场景名称匹配。如果您想更改，可以选择或输入您希望创建新 Web 项目的 ``Directory Name``。路径是相对于您的 Unity 项目的。  
    :::
 
3. **选择一个 Web 项目模板**
  现在，为您的项目选择一个 Web 项目模板。默认模板基于 [Vite](https://vitejs.dev/)，这是一个快速的 Web 应用打包器。  
  <br/>
    ![Unity ExportInfo local templates](/imgs/unity-project-local-template.jpg)


4. 点击 Play 安装并启动您的新 Web 项目


:::tip 定义您自己的模板
如果您发现自己创建许多类似的项目，可以使用 Project View 上下文菜单中的 `Create/Needle Engine/Project Template` 创建您自己的本地或远程模板。模板可以是本地磁盘上的文件夹（被复制），也可以是远程仓库（git 仓库被克隆）。
:::

## 项目文件夹和文件

:::: file-tree name="Unity Project" showall="true"
::: file Assets/
这是项目特定/独有资产的存放位置。
::: 
::: file Packages/
这是为该项目安装的包的存放位置。包可以包含任何资产类型，并且可以添加到多个 Unity 项目中。因此，它是共享代码或资产的绝佳方法。要了解更多关于包的信息，请参阅[关于包的 Unity 文档](https://docs.unity3d.com/Manual/PackagesList.html)。
::: 
::: file Packages/Needle Engine/
Unity 版 Needle Engine 是一个包，其中包含将您的 Unity 场景导出到 Web 项目所需的所有文件。它还包含用于创建交互式 Web 项目的内置组件和工具。您可以通过 Unity Package Manager 更新该包。
:::
::: file Packages/Needle Engine/Core/
:::
::: file Packages/Needle Engine/Core/Runtime/
:::
::: file Packages/Needle Engine/Core/Runtime/Components/
包含所有 Needle Engine 内置组件。您可以在[组件参考](./../component-reference.md)中了解更多关于它们的信息。查看示例并浏览此文件夹是了解哪些组件可用以及如何在项目中使用的绝佳方式。
:::
:::: 

在 Unity 中创建新的 Web 项目时，您可以选择从本地模板创建（默认情况下，我们附带一个基于 Vite 的 Web 模板）。

您也可以通过在 ExportInfo 项目路径中输入仓库 URL 来引用远程模板（例如，这可以与您的场景一起保存）。创建新的 Web 项目时，仓库将被克隆或下载（取决于您是否安装了 git），并搜索 `needle.config.json` 文件。如果在克隆的仓库中找不到，将使用根目录。可以在 [github.com/needle-engine](https://github.com/needle-engine) 上找到远程模板项目的示例。

![Unity ExportInfo local templates](/imgs/unity-project-remote-template.jpg)

### 临时项目

如果您计划只通过 NpmDefs 添加自定义文件，而不更改项目配置（例如，用于快速全屏测试），则可以将项目路径前缀设为 `Library`。项目将在 Unity Project Library 中生成，无需添加到源代码控制（应将 Library 文件夹排除在源代码控制之外）。我们称这些项目为_临时项目_。它们非常适合快速测试想法！


## Unity 中的 TypeScript

**NPM Definitions** 是紧密集成到 Unity 编辑器中的 [npm packages](https://docs.npmjs.com/about-packages-and-modules)，这使得在多个 Web 项目或 Unity 项目之间共享脚本变得非常容易。    

NPM Def 包中脚本的 TypeScript 文件也会自动生成 C# 组件存根。

#### 创建和安装 NpmDef
要在 Unity 项目浏览器中右键单击并选择 ``Create/NPM Definition``，以创建 **NPM Definition**。   
您可以通过例如选择您的 ``Needle Engine`` 组件（之前名为 ``Export Info``）并将其添加到 ``dependencies`` 列表来**安装 *NPM Definition* 包**到您的运行时项目中（这实际上会将 NpmDef 包添加到您 Web 项目的 package.json 中的 `dependencies` 数组中，就像您手动操作或运行 `npm i <path/to/package>` 一样）。

![image](https://user-images.githubusercontent.com/5083203/170374130-d0e32516-a1d4-4903-97c2-7ec9fa0b17d4.png)

不要忘记安装新添加的包，例如点击 ExportInfo 组件上的 Install，如果服务器已在运行，也请重启它。

要编辑 *NPM Definition* 包内的代码，只需在项目浏览器中双击 *NPM Definition* 资产，它将打开每个 npmdef 都附带的 vscode 工作区。


# 下一步

- [概念：Web 项目](../project-structure.md)
- [概念：导出资产](../export.md)
- [概念：部署（共享您的网站）](../deployment.md)
- [组件：了解 Everywhere Actions](../everywhere-actions.md)
- [初学者脚本：TypeScript 要点](../getting-started/typescript-essentials.md)
- [初学者脚本：如何编写自定义组件](../scripting.md)

---
页面由 AI 自动翻译