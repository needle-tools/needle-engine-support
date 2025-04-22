---
title: Needle Cloud
description: 'Needle Cloud 是一项在线服务。它可以帮助您在网络上存储、管理和分享 3D 资产和应用。支持多种文件格式，包括 glTF、USD、FBX、VRM 等。使用 Needle 制作的空间 Web 应用可以直接从 Unity 集成或通过命令行 (CLI) 部署到云端。'
---

<br/>
<discountbanner/>


# Needle Cloud

## 概述

Needle Cloud 是一项在线服务。它可以帮助您在网络上存储、管理和分享 3D 资产和应用。
支持多种文件格式，包括 glTF、USD、FBX、VRM 等。使用 Needle 制作的空间 Web 应用可以直接从 Unity 集成或通过命令行 (CLI) 部署到云端。Blender 集成将在稍后推出；在此期间，您可以使用 CLI。

访问 [Needle Cloud](https://cloud.needle.tools) 开始使用。

![Needle Cloud Overview](/cloud/cloud-overview-page.webp)

## 功能特性

1. **托管空间 Web 应用**  
   使用 Needle 制作的应用可以直接从我们的引擎集成部署到云端。这使得您无需设置自己的服务器，即可轻松为您的团队和客户提供公共访问。如果需要，您可以用密码保护应用。

2. **私密安全地管理 3D 资产**  
   轻松上传和整理您的 3D 文件。得益于我们快速的 CDN（内容分发网络），您的文件可以安全存储并能从世界任何地方快速访问。
   Needle Cloud 不是一个市场，也不是一个社交网络。它专为代理机构、工作室和创作者私密安全地管理其资产而设计。

3. **优化多种格式的 3D 资产**  
   自动压缩您的文件，以在保持视觉质量的同时减小文件大小。这使得您的文件加载更快，并节省用户设备上的带宽和内存。

4. **分享和版本控制**  
   可以与他人分享文件链接并在您的项目中直接使用。您可以上传资产和应用的新版本。各个版本可以进行标签标记，这使得灵活的评审工作流程成为可能：例如，您可以将某个版本标记为 `main` 或 `experimental`。如果需要，您还可以将标签还原到之前的版本。

5. **通过 CLI 实现自动化和管道工具**  
   `needle-cloud` CLI（命令行界面）使得自动上传和优化文件变得容易。这对于将 Needle Cloud 集成到现有管道中，或者用于自动上传大量文件非常有用。

6. **许可证管理**  
   面向个人创作者和团队的 Needle Engine 许可证通过 Needle Cloud 进行管理。这确保只有授权用户可以访问您的文件和项目。企业版和教育版许可证请联系我们。

## 从 Unity 部署

Needle Cloud 已集成到 Unity Editor 中。这使得您可以直接从 Unity 将您的应用部署到 Needle Cloud。您也可以直接在 Unity 中从 Needle Cloud 上传和下载资产。

1. **安装 Unity 集成（如果尚未安装）。**   
   有关更多信息，请参见[此页面](./../unity/)。

2. **将 `Export Info` 组件添加到您的场景中。**   
   该组件用于配置您的应用的导出设置。  
   您可以使用菜单项 `GameObject > Needle Engine > Add Export Info`，或通过菜单项 `File > New Scene` 从 Needle 模板创建新场景。

3. **点击 `Upload to Needle Cloud`。**   
   这将构建您的应用并将其上传到 Needle Cloud。您也可以选择部署到特定的团队和项目。项目旁的_上传名称_（upload name），在按钮旁边可见，保存在场景中。未来的上传将使用相同的上传名称，并且所有上传的版本都将分组显示在 Needle Cloud 网站上。   
   
   ![Needle Cloud Unity Integration](/cloud/cloud-deploy-v1.webp)

## 从 CLI 部署

Needle Cloud 提供命令行界面 (CLI)，允许您高效地管理资产和部署应用程序。您可以使用 CLI 自动化任务并将 Needle Cloud 集成到现有工作流程中。

CLI 可作为 [npm package](https://www.npmjs.com/package/needle-cloud) 使用，这意味着您需要在计算机上安装 Node.js。您可以通过在终端中运行以下命令来检查是否安装了 Node.js：

```bash
node -v
```
如果未安装 Node.js，您可以从 [Node.js 网站](https://nodejs.org/) 下载。  

您可以全局安装 `needle-cloud` CLI package 或通过 `npx` 使用它。这允许您无需全局安装即可运行 CLI 命令。 


1. **使用 npx 命令（推荐）**
   ```bash
   npx needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```
2. **或全局安装 needle-cloud**  
   全局安装允许您在系统的任何地方使用 CLI。要在全局安装 CLI，请在终端中运行以下命令： 
   ```bash
   npm install -g needle-cloud
   ```
   现在，您可以在终端中使用 `needle-cloud` 命令：

   ```bash
   needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```

### 自动化部署
要从 **Github Actions** 或 **Stackblitz** 部署，您可以提供一个访问令牌作为 `--token <access_token>`。访问令牌可以在 Needle Cloud 的[您的团队页面](https://cloud.needle.tools/team)上创建。请确保您的令牌具有 `read/write` 权限。     

使用 [Needle Cloud Github Action](https://github.com/marketplace/actions/deploy-to-needle-cloud) 从 Github 部署更新（例如，每次推送到仓库时）。

#### 示例：Needle Cloud Github Action
```yml
      - name: Deploy to Needle Cloud
        uses: needle-tools/deploy-to-needle-cloud-action@v1.0.2
        id: deploy
        with:
            token: ${{ secrets.NEEDLE_CLOUD_TOKEN }}
            dir: ./dist
            name: vite-template # optional
```

#### 示例：使用 CLI 命令部署

```bash
# Deploy to Needle Cloud from e.g. a github action
npx needle-cloud deploy '/path/to/output' --team 'My team' --name 'some name or id' --token '<access_token>'
```

### CLI 帮助
使用 `help` 查看所有可用的命令行选项和单个命令的帮助。
```bash
# see all available options
npx needle-cloud help
# get help for a specific command e.g. deploy
npx needle-cloud help deploy
```


## 部署 URL

部署到 Needle Cloud 时，每次上传都会获得一个唯一的 URL。您可以与您的团队或客户分享指向_特定_版本或_带标签_版本的链接。

-----

在以下示例中，一个应用迄今已部署了两次。每次部署都会获得一个特定的 URL，也称为_固定_ URL (pinned URL)，因为它固定在一个特定版本上。
1. [collaborativesandbox-zubcks1qdkhy<strong>-1qdkhy</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-1qdkhy.needle.run/)  
   这是上传的第一个版本。
2. [collaborativesandbox-zubcks1qdkhy<strong>-2e2spt</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-2e2spt.needle.run/)  
   这是上传的第二个版本。

_最新_部署始终可以通过以下 URL 访问。此 URL 对于与您的团队分享很有用，因为它始终指向应用的最新版本。此版本的另一个常用名称是 _dev_ 或 _canary_。
- [collaborativesandbox-zubcks1qdkhy<strong>-latest</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-latest.needle.run/)  
  当您上传应用的新版本时，此 URL 会自动显示新版本。

_main_ 部署对于与客户分享很有用，因为它始终指向您推广的应用最新版本。此版本的其他常用名称是 _production_、_stable_ 或 _live_。
- [collaborativesandbox-zubcks1qdkhy.needle.run](https://collaborativesandbox-zubcks1qdkhy.needle.run/)  
  当您上传新版本时，此 URL 不会更改。它只会在您明确将新版本推广到 _main_ 时更改。

通常，您会上新版本，进行评审，然后决定是否将其推广到 _main_。

-----

Needle Cloud 网站显示应用的所有已部署版本，包括最新版本和 main 版本。可以通过点击 <kbd>⋮</kbd> 并选择 <kbd>Set main label</kbd> 或 <kbd>Remove main label</kbd> 来移动标签。  

![Needle Cloud Version List](/cloud/cloud-edit-page.webp)

## 支持的 3D 格式

1. **glTF 和 GLB** <a href="https://cloud.needle.tools/view?file=2oAMeWZ1hWL3C-latest-product" target="_blank">示例</a>   
   glTF 格式是 Web 上最广泛支持的 3D 格式。它是一种轻量级格式，可以存储 3D 模型、动画和纹理。GLB 文件是 glTF 文件的二进制版本，所有数据都存储在单个文件中。
   glTF 支持 Draco、KTX2 和 Meshopt 等高级压缩技术，这些技术得到 Needle Cloud 和 Needle Engine 的完全支持。

2. **OpenUSD**   
   USD 是一种强大的 3D 数据交换格式。它以在电影和 VFX 行业中的应用而闻名，并且在游戏行业中越来越受欢迎。Needle Cloud 通过我们对 USD-WASM 的工作原生支持 USDZ 和 USD 文件，并且还将 USD 文件转换为 glTF 以进行进一步处理和优化。

3. **FBX**  
   FBX 多年来一直是流行的 3D 数据交换格式，但缺乏许多现代功能，例如 PBR 材质和扩展。Needle Cloud 将 FBX 文件转换为 glTF 以进行进一步处理和优化。  

4. **VRM**  
   VRM 是一种用于类人化身的格式。它基于 glTF 并通过使用 glTF 扩展增加了额外的约束。Needle Cloud 原生支持 VRM 文件，并且可以像其他 glTF 文件一样优化它们，包括音素、卡通渲染和动态骨骼等复杂的 VRM 扩展。

5. **OBJ**  
   OBJ 是一种简单的基于文本的 3D 模型格式。它通过 MTL 文件支持基本材质、动画和对象层级结构。Needle Cloud 将 OBJ 文件转换为 glTF 以进行进一步处理和优化。 

:::tip 尽可能使用 glTF 或 USD
我们推荐 glTF 和 USD 作为主要的 3D 数据交换格式。它们得到广泛支持，具有现代功能和良好的材质模型。
:::

## 云端资产

### 上传资产

您可以通过将文件拖放到网站中或从您的计算机中选择文件来轻松上传文件。
非 glTF 文件会自动转换为 glTF 进行进一步处理，但原始文件会保留供下载和 Web 查看。 

### 资产版本

当您访问资产的编辑页面时，您可以看到您或您的团队迄今已上传的所有版本。您还可以为版本添加标签，将其标记为“main”或“experimental”。“Latest”是最新版本的默认标签。

### 分享资产链接

您可以创建链接来与您的团队或客户分享特定文件或带标签的文件。带标签的链接会在您移动标签时自动更新 – 因此您可以分享一个“main”链接一次，然后不断更新文件，而无需发送新链接。

### 在 Needle Engine 中使用云端资产

存储在 Needle Cloud 中的文件可以轻松地直接导入 Needle Engine 项目中。`Needle Cloud Asset` 组件接受资产链接，并在运行时加载它。这允许您保持项目规模较小，并按需加载可以在云端更新的资产。 

::: tip 尽可能使用渐进式加载
存储在 Needle Cloud 上的资产使用我们的 Progressive Loading 技术自动优化，以实现理想的运行时使用。对于每个网格和纹理，都会生成多个细节级别版本，并且在运行时只加载资产中需要的部分。 

这可以节省大量带宽和内存（通常比加载完整资产节省 90% 或更多）。
:::

### 在您的网站上嵌入云端查看器

将 3D 快速引入您自己网站的一种方法是**嵌入** Needle Cloud 查看器。 
为此，请转到资产的编辑页面并点击 <kbd>Embed</kbd>。然后，您可以复制 `iframe` 代码片段并将其粘贴到您的网站中。

::: tip 嵌入特定版本
您也可以使用资产的直接链接或特定标签来嵌入查看器。这使您可以在 Needle Cloud 上更新资产，而无需更新您网站上的嵌入代码。 
:::

### 在其他框架中嵌入

以下嵌入选项可用：
1. **Needle Cloud Viewer**  
   使用 `iframe` 代码片段将 Needle Cloud 查看器嵌入您的网站。

1. **Needle Engine**  
  使用提供的代码片段将 Needle Engine 作为[web component](./../three/) 嵌入您的网站。

1. **model-viewer**  
  [model-viewer](https://modelviewer.dev) 项目提供了一个 web component，用于在浏览器中渲染简单的、非交互式的 3D 模型。

1. **three.js**  
  如果您熟悉 three.js，可以使用提供的代码片段作为支持 Needle Progressive Loading 并从 Needle Cloud 高效加载文件的 three.js 应用的起点。

1. **React-Three-Fiber**  
  如果您正在使用 React-Three-Fiber，可以使用提供的代码片段作为支持 Needle Progressive Loading 并从 Needle Cloud 高效加载项目的起点。

1. **Unity**  
  如果您正在使用 Unity，可以使用 Needle Cloud Asset 组件将 Needle Cloud 资产直接集成到您的项目中，以实现无缝加载和优化。

### 在 Unity 或 Unreal 等其他引擎中使用云端资产

有几种方法可以在 Unity 或 Unreal 等其他引擎中使用存储在 Needle Cloud 上的资产。
1. **下载并导入**  
   您可以下载资产并将其导入您的项目中。

2. **直接链接**   
   您可以在项目中使用资产的直接链接。这样，您可以在 Needle Cloud 上更新资产，它将自动在您的项目中更新。使用哪个链接取决于引擎及其 glTF 功能：
    - 支持 **glTF with Progressive Loading**：   
      使用 `Progressive-World` 或 `Progressive-Product` 链接。
      有关渐进式加载以及如何为您的引擎启用它的更多信息，请参阅 [npm:@needle-tools/gltf-progressive](https://www.npmjs.com/package/@needle-tools/gltf-progressive)。

    - 支持 **glTF with Draco and KTX2**：
      使用 `Optimized` 链接。
    - 支持 glTF，但**不支持压缩扩展**：  
      使用 `Upload`（适用于 gltf/glb 上传）或 `Converted`（适用于其他上传）链接。

3. **Needle Cloud Asset Component**   
   如果您使用 Needle Engine，可以使用 `Needle Cloud Asset` 组件在运行时加载资产。它会自动为您的平台选择最佳链接，并使用 Progressive Loading 加载资产。在 Unity Build 中运行时也支持此功能。

## 用于资产的 CLI

用于 Needle Cloud 的命令行界面 (CLI) 允许自动化文件上传和压缩。CLI 可以作为构建步骤的一部分（用优化版本替换资产）或作为独立工具（用于批量处理文件）使用。

有关 CLI 及其使用方法的更多信息，请参见 [npm:needle-cloud](https://www.npmjs.com/package/needle-cloud)。

## 常见问题

1. **Needle Cloud 是什么？**   
   它是一个用于上传、压缩和分享 3D 资产和场景的在线服务。

2. **如何将资产上传到 Needle Cloud？**   
   您可以通过将文件拖放到网站上，或直接从支持的集成上传文件。如果您有很多文件，可以使用 CLI（命令行界面）或 API（应用程序编程接口）。

3. **如何从 Needle Cloud 下载优化后的文件？**   
   您可以从网站下载文件。点击 `Share`，然后点击 `Download`。您也可以使用 CLI 下载文件。

4. **我可以与他人分享我的文件吗？**   
   是的，您可以创建链接来分享您的文件。链接可以是直接下载链接，也可以是 Needle Cloud 查看器链接。

5. **文件大小有限制吗？**   
   上传限制取决于您的套餐。请查看您的账户详情以获取更多信息。

6. **Needle Cloud 文件可以与其他工具一起使用吗？**   
   是的，您可以通过将其导出为 glTF 来在其他程序中使用您的文件。USD 导出将在稍后推出。

7. **如果我的存储空间用完了怎么办？**   
   您可能需要升级您的套餐或删除旧文件以腾出空间。


页面由AI自动翻译