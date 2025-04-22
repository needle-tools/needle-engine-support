---
title: 部署与优化
---

## 部署是什么意思？

部署是将您的应用程序通过网站公开的过程。Needle Engine 利用最新的压缩技术，例如 **KTX2**、**Draco** 和 **Meshopt**，确保您的项目尽可能小巧快速。

## 可用的部署目标

- [Needle Cloud](./cloud/#deploy-from-unity)
  非常适合空间网络应用和资产共享。
- [Glitch](#deploy-to-glitch)
  非常适合实验和修改服务器端代码。

- [Netlify](#deploy-to-netlify)
  非常适合托管您自己的网站和自定义域名。
- [itch.io](#deploy-to-itch.io)
  常用于游戏。
- [GitHub Pages](#deploy-to-github-pages)
  免费静态页面托管。
- [Vercel](#deploy-to-vercel)
  面向前端开发者的平台。
- [FTP Upload](#deploy-to-ftp)
  直接部署到任何支持 FTP 的服务器。支持 FTP 和 SFTP。
- [Build to folder](#build-to-folder)
  构建到文件夹后，您可以将文件上传到任何网络服务器或其他托管服务。
- [Facebook Instant Games](#deploy-to-facebook-instant-games)
  Facebook 和 Facebook Messenger 上的游戏平台。

::: tip 觉得缺少了什么？
请在我们的[论坛](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)中告知我们！
:::

## 开发版本构建 (Development Builds)

请参阅上面的指南，了解如何在编辑器（例如 Unity 或 Blender）中访问这些选项。

与生产版本构建 (Production Build) 的主要区别在于，开发版本构建不会进行 [ktx2](https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html) 和 [draco](https://google.github.io/draco/) 压缩（用于减小文件大小和加载速度），也没有逐步加载高质量纹理的选项。

我们通常建议进行生产版本构建以优化文件大小和加载速度（详见下文）。

## 生产版本构建 (Production Builds)

要进行生产版本构建，您需要安装 [toktx](https://github.com/KhronosGroup/KTX-Software/releases)，它使用 KTX2 超级压缩格式提供纹理压缩。请访问 [toktx Releases Page](https://github.com/KhronosGroup/KTX-Software/releases) 下载并安装最新版本（撰写本文时为 v4.1.0）。安装后可能需要重启 Unity。
*如果您确定已安装 toktx 并且它在您的 PATH 中，但仍然找不到，请重启您的机器并尝试再次构建。*

:::details 高级：自定义 glTF 扩展
如果您计划添加自己的自定义 glTF 扩展，生产版本构建需要处理 `gltf-transform` 中的这些扩展。请参阅 [@needle-tools/gltf-build-pipeline](https://www.npmjs.com/package/@needle-tools/gltf-build-pipeline) 获取参考。
:::

### 优化和压缩选项

### 纹理压缩 (Texture compression)
生产版本构建默认使用 **KTX2** 压缩纹理（根据项目中的使用情况，可以是 ETC1S 或 UASTC），
但您也可以选择 **WebP** 压缩并选择质量级别。

#### 如何在 ETC1S、UASTC 和 WebP 压缩之间进行选择？

| 格式 (Format) | ETC1S | UASTC | WebP |
| --- | --- | --- | --- |
| **GPU 内存使用 (GPU Memory Usage)** | 低 (Low) | 低 (Low) | 高（未压缩）(High (uncompressed)) |
| **文件大小 (File Size)** | 低 (Low) | 高 (High) | 非常低 (Very low) |
| **质量 (Quality)** | 中 (Medium) | 非常高 (Very high) | 取决于质量设置 (Depends on quality setting) |
| **典型用法 (Typical usage)** | 适用于所有情况，但最适合颜色纹理 (Works for everything, but best for color textures) | 高细节数据纹理：法线贴图、粗糙度、金属度等 (High-detail data textures: normal maps, roughness, metallic, etc.) | ETC1S 质量不足但 UASTC 过大的文件 (Files where ETC1S quality is not sufficient but UASTC is too large) |

您可以使用 Unity 中的 Needle Texture Importer 或 Blender 中材质标签页上的选项，对每个纹理选择纹理压缩和逐步加载选项。

:::details Unity：如何设置每个纹理的压缩设置？
![image](/imgs/unity-texture-compression.jpg)
![image](/imgs/unity-texture-compression-options.jpg)
:::

:::details Blender：如何设置每个纹理的压缩设置？
选择材质标签页。您将看到该材质使用的所有纹理的压缩选项。
![Texture Compression options in Blender](/blender/texture-compression.webp)
:::

:::details Toktx 找不到
Windows：确保您已将 toktx 添加到您的系统环境变量中。添加后可能需要重启计算机才能刷新环境变量。默认安装位置是 ``C:\Program Files\KTX-Software\bin``
![image](/imgs/ktx-env-variable.webp)
:::

### 网格压缩 (Mesh compression)

默认情况下，生产版本构建将使用 Draco 压缩网格。使用 `MeshCompression` 组件可以选择为每个导出的 glTF 应用 draco 或 mesh-opt 压缩。
此外，您可以在网格导入设置（Unity）中设置网格简化，以减少生产版本构建的多边形数量。在浏览器中查看您的应用程序时，您可以附加 `?wireframe` 到您的 URL 以预览网格。

#### 如何在 Draco 和 Meshopt 之间进行选择？
| 格式 (Format) | Draco | Meshopt |
| --- | --- | --- |
| **GPU 内存使用 (GPU Memory Usage)** | 中 (Medium) | 低 (Low) |
| **文件大小 (File Size)** | 最低 (Lowest) | 低 (Low) |
| **动画压缩 (Animation compression)** | 否 (No) | 是 (Yes) |

:::details 如何设置 draco 和 meshopt 压缩设置？
添加 MeshCompression 组件，为每个导出的 glTF 选择应应用的压缩方式。

![image](/imgs/unity-mesh-compression-component.jpg)
- 要更改**当前场景**的压缩，只需将其添加到根场景中的任意位置。
- 要更改 **prefab 或 NestedGltf** 的压缩，将其添加到 `GltfObject` 或任何组件引用/导出的 prefab 中。
- 要更改**引用的场景**的压缩，只需将其添加到导出的引用场景中即可。
:::

:::details 在哪里可以找到网格简化选项以在生产版本构建时减少顶点数量？
选择一个 Mesh 并打开 Needle 导入器选项，查看选定网格的可用选项：
![image](/imgs/unity-mesh-simplification.jpg)
:::

### 渐进式纹理 (Progressive Textures)

您还可以将 `Progressive Texture Settings` 组件添加到场景中的任意位置，使项目中的所有纹理都进行渐进式加载。目前，渐进式加载不应用于光照贴图或天空盒纹理。

通过渐进式加载，纹理将首先以较低分辨率版本加载。当纹理可见时，全质量版本将动态加载。这通常会显着减少场景的初始加载时间。

:::details 如何启用渐进式纹理加载？
### 可以为每个纹理启用渐进式纹理加载
### 或者为项目中的所有纹理启用：
![image](/imgs/unity-texture-compression.jpg)
### 为项目中没有其他特定设置的所有纹理启用：
![image](/imgs/unity-progressive-textures.jpg)
:::

### 自动网格 LODs (Level of Detail)

自 Needle Engine 3.36 起，我们会自动生成 LOD 网格并在运行时进行切换。LOD 按需加载，仅在需要时加载，因此此功能既减少了加载时间，也提升了性能。

**主要优势**
- 更快的初始加载时间
- 由于屏幕上平均顶点数量更少，渲染时间更快
- 由于使用 LOD 网格，光线投射更快

您可以在 `Progressive Loading Settings` 组件中或在 Mesh Importer 设置中为整个项目禁用 LOD 生成。

![image](/imgs/unity-lods-settings-1.jpg)

![image](/imgs/unity-lods-settings-2.jpg)

## 部署选项

### 部署到 Glitch 🎏

[Glitch](https://glitch.com/) 为所有人提供了一种快速免费的方式来托管小型和大型网站。我们提供了一种简单的方法来混音 (remix) 并部署到新的 Glitch 页面（基于我们的 starter），以及在需要时在同一个 Glitch 页面上运行一个极简的网络服务器。

您可以通过将 `DeployToGlitch` 组件添加到场景中并按照说明进行操作来部署到 glitch。

请注意，glitch 上托管的免费项目不能超过约 100 MB。如果您需要上传更大的项目，请考虑使用不同的部署目标。

:::details 如何从 Unity 部署到 Glitch？

1) 将 ``DeployToGlitch`` 组件添加到具有 ``ExportInfo`` 组件的 GameObject 上。

2) 点击组件上的 ``Create new Glitch Remix`` 按钮
   ![image](/deployment/deploytoglitch-1.jpg)
3) Glitch 现在将创建模板的混音 (remix)。从浏览器中复制 URL
   ![image](https://user-images.githubusercontent.com/5083203/179834901-f28852a9-6b06-4d87-8b5b-0384768c92c1.png)
4) 再次打开 Unity，并将 URL 粘贴到 ``Deploy To Glitch`` 组件的 ``Project Name`` 字段中
  ![image](https://user-images.githubusercontent.com/5083203/179835274-033e5e1d-b70d-4b13-95ad-f1e2f159b14e.png)
5) 等待几秒钟，直到 Unity 从 glitch 收到您的部署密钥（此密钥安全地存储在 glitch 的 `.env` 文件中。不要与他人共享，拥有此密钥的任何人都可以上传到您的 glitch 网站）
  ![waiting for the key](/deployment/deploytoglitch-2.jpg)
6) 收到部署密钥后，您可以点击 `Build & Deploy` 按钮上传到 glitch。

:::

:::details 如何从 Blender 部署到 Glitch？

![Deploy To Glitch from Blender component](/blender/deploy_to_glitch.webp)

1) 在 Scene 标签页中找到 Deploy To Glitch 面板
2) 点击组件上的 ``Remix on glitch`` 按钮
3) 您的浏览器将打开 glitch 项目模板
4) 等待 Glitch 生成新项目
5) 将项目 URL 复制粘贴到 Blender DeployToGlitch 面板中作为项目名称（您可以粘贴完整的 URL，面板将提取必要的信息）
6) 在 Glitch 上打开 ``.env`` 文件，并在 **DEPLOY_KEY** 旁边的 ``Variable Value`` 字段中输入密码
7) 在 Blender 的 `Key` 字段中输入相同的密码
8) 点击 `DeployToGlitch` 按钮构建并上传您的项目到 glitch。上传完成后将打开一个浏览器。如果打开后显示黑色，请尝试刷新页面。
:::

#### Glitch 故障排除

如果您点击 `Create new Glitch Remix`，浏览器显示 `there was an error starting the editor` 这样的错误，您可以点击 **OK**。然后访问 [glitch.com](https://glitch.com/) 并确保您已登录。之后，您可以再次尝试点击 Unity 或 Blender 中的按钮。

### 部署到 Netlify
:::details 如何从 Unity 部署到 Netlify？
只需将 `DeployToNetlify` 组件添加到您的场景中并按照说明进行操作。您可以通过点击按钮或部署到现有项目来创建新项目。

![Deploy to netlify component](/deployment/deploytonetlify-2.jpg)

![Deploy to netlify component](/deployment/deploytonetlify.jpg)
:::

### 部署到 Vercel

1) 在 vercel 上创建一个新项目
2) 将您的 web 项目添加到 github 仓库
3) 将仓库添加到 vercel 上的项目

请参阅我们的 [sample project](https://github.com/needle-engine/nextjs-sample) 获取项目配置

### 部署到 itch.io

:::details 如何从 Unity 部署到 itch.io？
1) 在 [itch.io](https://itch.io/game/new) 上创建一个新项目
2) 将 ``Kind of project`` 设置为 ``HTML``
  ![image](https://user-images.githubusercontent.com/5083203/191211856-8a114480-bae7-4bd1-868e-2e955587acd7.png)
3) 将 ``DeployToItch`` 组件添加到您的场景中，然后点击 ``Build`` 按钮
  ![image](https://user-images.githubusercontent.com/5083203/193812540-1881837e-ed9e-49fc-9658-52e5a914299a.png)

4) 等待构建完成，完成后会打开一个包含最终 zip 文件的文件夹
5) 将最终 zip 上传到 itch.io
  ![20220920-104629_Create_a_new_project_-_itch io_-_Google_Chrome-needle](https://user-images.githubusercontent.com/5083203/191212661-f626f0cb-bc8e-4738-ad2c-3982aca65f39.png)
6) 选择 ``This file will be played in the browser``
  ![image](https://user-images.githubusercontent.com/5083203/191212967-00b687f3-bf56-449e-880c-d8daf8a52247.png)
7) 保存您的 itch 页面并查看 itch 项目页面。
  现在它应该会加载您的 Needle Engine 项目 😊

#### 可选设置
![image](https://user-images.githubusercontent.com/5083203/191217263-355d9b70-5431-4170-8eca-bfbbb39ae810.png)
:::

:::details Itch.io: 未找到 index.html

#### Failed to find index.html
![image](https://user-images.githubusercontent.com/5083203/191213162-2be63e46-2a65-4d41-a713-98c753ccb600.png)
如果您在上传项目后看到此错误，请确保您没有上传 gzipped 的 index.html 文件。
您可以在 Needle web 项目文件夹中的 ``vite.config.js`` 中禁用 gzip 压缩。只需删除包含 ``viteCompression({ deleteOriginFile: true })`` 的行。然后再次构建您的项目并上传到 itch。

:::

### 部署到 FTP

:::details 如何从 Unity 部署到我的 FTP 服务器？
1) 将 ``DeployToFTP`` 组件¹ 添加到场景中的一个 GameObject 上（将其添加到与 ExportInfo 相同的 GameObject 是个好习惯 - 但不是强制的）
2) 如果尚未这样做，请分配一个 FTP 服务器资产并填写服务器、用户名和密码 ²
  *此资产包含您 FTP 服务器的访问信息 - 您在托管服务提供商处创建新的 FTP 帐户时会获得这些信息*
3) 点击 ``DeployToFTP`` 组件上的 <kbd>Build & Deploy</kbd> 按钮，构建您的项目并将其上传到您的 FTP 帐户

![Deploy to FTP component in Unity](/deployment/deploytoftp.jpg)
*¹ Deploy to FTP 组件*

![Deploy to FTP server asset](/deployment/deploytoftp2.jpg)
*² 包含您 FTP 用户帐户访问信息的 FTP Server 资产*

![Deploy to FTP component in Unity with server asset assigned](/deployment/deploytoftp3.jpg)
*分配服务器资产后的 Deploy To FTP 组件。您可以使用路径字段直接部署到服务器的子文件夹*
:::

:::details 如何手动部署到我的 FTP 服务器？

1) 打开 `File > Build Settings`，选择 `Needle Engine`，然后点击 <kbd>Build</kbd>
2) 等待构建完成 - 所有构建和压缩步骤运行完成后，结果 `dist` 文件夹将自动打开。
3) 将 `dist` 文件夹中的文件复制到您的 FTP 存储空间。

**就这样！** 😉

![20220830-003602_explorer-needle](https://user-images.githubusercontent.com/2693840/187311461-e6afb2d7-5761-48cf-bacb-1c1733bb768b.png)

> **注意**: 如果上传后结果不工作，可能是因为您的网络服务器不支持提供 gzipped 文件。您有两种方法解决此问题：
选项 1: 您可以尝试使用 .htaccess 文件在您的服务器上启用 gzip 压缩！
选项 2: 您可以在 Build Settings 中（File/Build Window，选择 Needle Engine 平台）关闭 gzip 压缩。

> **注意**: 如果在压缩过程中出现错误，请告知我们并报告 bug！如果您的项目在本地工作，但仅在进行生产版本构建时失败，您可以通过进行开发版本构建立即解决问题。只需在 Build Settings 中切换 `Development Build` 即可。

![Unity build window showing Needle Engine platform](/deployment/buildoptions_gzip.jpg)

:::

#### 使用 .htaccess 文件启用 gzip

要在您的 FTP 服务器上启用 gzip 压缩，您可以在要上传的目录（或父目录）中创建一个名为 `.htaccess` 的文件。
将以下代码插入到您的 `.htaccess` 文件中，然后保存/上传到您的服务器：
```
<IfModule mod_mime.c>
RemoveType .gz
AddEncoding gzip .gz
AddType application/javascript .js.gz
</IfModule>
```

### 部署到 Github Pages
:::details 如何从 Unity 部署到 Github Pages？

将 DeployToGithubPages 组件添加到您的场景中，并复制粘贴您想要部署到的 github 仓库（或 github pages url）。
![Deploy To github pages component](/deployment/deploytogithubpages.jpg)

<video-embed src="https://www.youtube.com/watch?v=Vyk3cWB6u-c" />

:::

#### Github Pages 故障排除
- **我部署到 github pages 了，但是没有运行任何 action / 网站没有上线**
  - 如果您是第一次部署，可能需要几分钟网站才能上线。您可以在 github 上查看 **Actions** 标签页（`/actions`）来查看部署过程。
  - 如果几分钟后您的网站仍未上线，或者您在 github 上的 **Actions** 标签页中没有看到任何 workflow 运行，请转到 **Github Pages** 设置页面（`/settings/pages`），并确保 **Branch** 设置为 *gh-pages*

### 部署到 Facebook Instant Games

使用 Needle Engine，您可以自动构建到 Facebook Instant Games
无需对您的 web 应用或游戏进行手动调整。

:::details 如何从 Unity 部署到 Facebook Instant Games？
- 将 `Deploy To Facebook Instant Games` 组件添加到您的场景中：
  ![Deploy to facebook instant games component](/deployment/deploytofacebookinstantgames.jpg)
- 点击 `Build For Instant Games` 按钮
- 构建完成后，您将获得一个 ZIP 文件，您可以将其上传到您的 facebook 应用。
- 在 Facebook 上添加 `Instant Games` 模块，并转到 `Instant Games/Web hosting`
  ![Hosting a facebook instant games](/deployment/deploytofacebookinstantgames-hosting.jpg)
- 您可以使用 `Upload version` 按钮 (1) 上传您的 zip。上传完成并处理完 zip 后，点击 `Stage for testing` 按钮测试您的应用（2，此处为蓝色按钮）或 `Push to production`（带星号的按钮）
  ![Upload the zip to facebook instant games](/deployment/deploytofacebookinstantgames-upload.jpg)
- 就这样 - 然后您可以点击每个版本旁边的 `Play` 按钮在 facebook 上测试您的游戏。

:::

:::details 如何在 Facebook 上创建应用（具有 Instant Games 功能）

1) [创建一个新应用](https://developers.facebook.com/apps/creation/)，选择 `Other`。然后点击 `Next`
  ![Create facebook instant games app](/deployment/facebookinstantgames-1.jpg)

2) 选择类型 `Instant Games`
  ![Create facebook instant games app](/deployment/facebookinstantgames-2.jpg)

3) 创建应用后，添加 `Instant Games` 产品
  ![Add instant games product](/deployment/facebookinstantgames-3.jpg)

您可以在此处找到 [官方 instant games 文档](https://developers.facebook.com/docs/games/build/instant-games)。
**注意**：您只需创建一个具有 instant games 功能的应用即可。
我们将处理其他所有事情，无需对您的 Needle Engine 网站进行手动调整。
:::

## 构建到文件夹 (Build To Folder)

在 Unity 中打开 ``File/Build Settings``，选择 ``Needle Engine`` 以获取选项：

![image](/imgs/unity-build-window-menu.jpg)

![image](/imgs/unity-build-window.jpg)

要构建您的 web 项目以便上传到任何网络服务器，您可以点击 Unity Editor Build Settings Window 中的 **Build** 按钮。您可以启用 ``Development Build`` 复选框以忽略压缩（见下文），这需要您的机器上安装 toktx。

要本地预览最终构建，您可以使用窗口底部的 `Preview Build` 按钮。此按钮将首先执行常规构建，然后在包含最终文件的目录中启动本地服务器，以便您可以看到将这些文件上传到网络服务器后得到的结果。

Nodejs **仅**在开发期间需要。发布的网站（使用我们默认的 vite 模板）是一个静态页面，不依赖于 Nodejs，可以放在任何常规网络服务器上。如果您想在同一个网络服务器上运行我们的极简网络服务器（自动包含在 Glitch 部署过程中），则需要 Nodejs。

---

## 跨平台部署工作流程 (Cross-Platform Deployment Workflows)

可以创建常规的 Unity 项目，您可以同时构建到 Needle Engine 和常规的 Unity 平台，例如 Desktop 甚至 WebGL。我们的“组件映射”方法意味着在 Unity 内部不会修改运行时逻辑 - 如果您愿意，您可以常规地使用 Play Mode 并构建到其他目标平台。在某些情况下，这意味着您将有重复的代码（C# 代码和匹配的 TypeScript 逻辑）。由此产生的额外工作量取决于您的项目。

**在 Unity 中进入 Play Mode**
在 `Project Settings > Needle Engine` 中，您可以关闭 `Override Play Mode` 和 `Override Build settings` 来在 Needle 的构建过程和 Unity 的构建过程之间切换：
![image](https://user-images.githubusercontent.com/2693840/187308490-5acb9016-ffff-4113-be62-4de450a42b08.png)

## Unity 的 Needle Engine 命令行参数

Unity 的 Needle Engine 支持各种命令行参数，用于导出单个资产（Prefabs 或 Scenes）或以批处理模式（无窗口）构建整个 web 项目。

下表列出了可用的选项：

| | |
| -- | -- |
| `-scene` | 要导出场景或资产的路径，例如 `Assets/path/to/myObject.prefab` 或 `Assets/path/to/myScene.unity` |
| `-outputPath <path/to/output.glb>` | 设置构建的输出路径（仅在构建场景时有效） |
| `-buildProduction` | 运行生产版本构建 |
| `-buildDevelopment` | 运行开发版本构建 |
| `-debug` | 打开控制台窗口进行调试 |

---
本页面由 AI 自动翻译