# 在您的网站上使用 Needle Engine

Needle Engine 可用于创建新的 web 应用，也可集成到现有网站中。在这两种情况下，您都需要将项目的分发文件夹**上传**到虚拟主机提供商，以便全世界访问。

有几种方法可以将 Needle Engine 与您的网站集成。选择哪种方法取决于许多因素，例如项目的复杂性、您是否使用自定义脚本或仅使用核心组件、您对目标网站的控制程度、您与目标网站之间的“信任级别”等等。

## 试试看

如果您想快速尝试使用 Needle 制作的项目在您的网站上看起来如何，只需在您的页面上任意位置添加以下两行代码进行测试：

:::: code-group
::: code-group-item 选项 1：嵌入 Needle
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb"></needle-engine>
```
:::
::: code-group-item 选项 2：使用 iframe
```html
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px">
</iframe>
```
:::
::: code-group-item 最终网站
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px" style="border:0; outline: 0;">
</iframe>
::::

# 使用 Needle 创建 web 应用的方法

将 Needle Engine 带到您的网站的最常见工作流程是：
1. [使用“部署到...”组件](#using-the-deploy-to-...-components)
2. [将您的 web 应用上传到文件夹](#uploading-your-web-app-to-a-folder)
3. [将 Needle 项目嵌入现有网站](#embedding-a-needle-project-into-an-existing-website)

## 使用“部署到...”组件

我们的 Needle Engine 集成带有内置部署选项。只需点击几下，您就可以将项目部署到 Needle Cloud、FTP 服务器、Glitch、Itch.io、GitHub Pages 等等。

有关这些选项的更多信息，请参阅[部署](./deployment.md)部分。

1. 在 Unity 或 Blender 中将您想要使用的“部署到...”组件添加到场景中。
2. 配置必要的选项并点击“部署”。
3. 完成了！您的项目现在已上线。

:::tip 推荐工作流程
这是最简单的选项，推荐用于大多数工作流程 – 速度非常快！您可以在计算机上迭代地开发项目，然后在几秒钟内将新版本上传到网络。
:::

## 将您的 web 应用上传到文件夹

如果您不想使用我们的“部署到...”组件，或者您的特定工作流程没有相应的组件，您可以手动执行相同的过程。生成的 web 应用将与您在本地服务器上工作时看到的内容完全相同。

1. 对您的 web 项目进行生产构建。这将创建一个 `dist/` 文件夹，其中包含所有必要的文件，可用于分发。它包含所有必要的文件，包括 JavaScript 包、HTML 文件以及任何其他资源，例如纹理、音频或视频文件。

2. 将您的 Web 项目中的 `dist/` 文件夹内容上传到您的虚拟主机提供商。您可以通过 FTP、SFTP 或您的主机提供商提供的任何其他文件传输方法进行此操作。请查阅您的虚拟主机提供商的文档了解详细信息。

3. 完成了！您的 web 应用现在已上线。

::: tip 文件夹位置会影响您的 web 应用的 URL。
根据您的主机提供商的设置，文件夹的位置和名称决定了您的 web 应用的 URL。以下是一个示例：
- 您的域名 `https://your-website.com/` 指向您网页空间上的文件夹 `/var/www/html`。
- 您将文件上传到 `/var/www/html/my-app`，以便 `index.html` 文件位于 `/var/www/html/my-app/index.html`。
- 您的 web 应用的 URL 现在是 `https://your-website.com/my-app/`。
:::

## 将 Needle 项目嵌入现有网站

在某些情况下，您希望将 Needle Engine 项目作为现有网站的一部分，例如作为博客文章、产品页面或作品集的一部分。此过程非常相似，但不是将文件上传到您的网页空间的根目录，而是通过几行代码将项目**嵌入**到现有网站中。

1. 对您的 web 项目进行生产构建。这将创建一个 `dist/` 文件夹，其中包含所有必要的文件，可用于分发。它包含所有必要的文件，包括 JavaScript 包、HTML 文件以及任何其他资源，例如纹理、音频或视频文件。

2. 将您的 Web 项目中的 `dist/` 文件夹上传到您的虚拟主机提供商。
    ::: tip 文件夹可以在任何地方托管！
    如果您无法访问您的虚拟主机提供商的文件系统，或者无法在那里上传文件，您可以将文件夹上传到任何其他网页空间，并在下一步中使用其公共 URL。
    :::

3. 在您的 `dist` 文件夹中，您会找到一个 `index.html` 文件。我们需要从该文件中复制一些行，所以用文本编辑器打开该文件。通常，它看起来像这样：
    ```html
    <head>
        ...
        <script type="module" crossorigin src="./assets/index-732f0764.js"></script>
        ...
    </head>
    <body>
        <needle-engine src="assets/scene.glb"></needle-engine>
    </body>
    ```

    这里有两行重要的代码：
    - `<script>` 中的 JavaScript 包，
    - `<needle-engine>` HTML 标签。

4. 在目标网站上，也添加 `<script...>` 和 `<needle-engine...>` 标签。确保路径指向您上传文件的位置。
    ```html
    <script type="module" src="/your-upload-folder/assets/index-732f0764.js"></script>
    <needle-engine src="/your-upload-folder/assets/scene.glb"></needle-engine>
    ```

5. 完成了！场景现在应该显示在您的网站上。

## 将 Needle 项目嵌入为 iframe

当您对网站的访问权限有限时，例如在使用像 WordPress 这样的内容管理系统 (CMS) 时，您可以使用 iframe 将 Needle Engine 场景嵌入到您的网站中。您可能熟悉从嵌入 YouTube 视频或 Sketchfab 模型时使用的工作流程。

1. 对您的 web 项目进行生产构建。这将创建一个 `dist/` 文件夹，其中包含所有必要的文件，可用于分发。

2. 将您的 Web 项目中的 `dist/` 文件夹上传到您的虚拟主机提供商。
    ::: tip 文件夹可以在任何地方托管！
    如果您无法访问您的虚拟主机提供商的文件系统，或者无法在那里上传文件，您可以将文件夹上传到任何其他网页空间，并在下一步中使用其公共 URL。
    :::

3. 在您的网站上添加一个 iframe，指向 `dist/` 文件夹中的 `index.html` 文件。
    ```html
    <iframe
        src="https://your-website.com/needle-files/dist/index.html"
        allow="xr; xr-spatial-tracking; fullscreen;">
    </iframe>
    ```

    ::: tip iframe 中的权限
    `allow=` 中的列表取决于您的 web 应用使用的功能。例如，XR 应用需要在 iframe 中工作需要 `xr` 和 `xr-spatial-tracking`。

    可能还需要其他功能，例如 `camera; microphone; display-capture; geolocation`。请参阅 [MDN 上 iframe Permissions Policy 指令的完整列表](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy#directives)。
    :::

4. 完成了！场景现在应该显示在您的网站上。

## 嵌入不使用自定义脚本的场景

当您的项目仅使用核心组件且不使用自定义脚本时，您可以直接从 CDN（内容分发网络）使用 Needle Engine。

1. 将以下代码片段添加到您的网站，例如在您的 CMS 中作为“HTML 块”：
    ```html
    <script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
    <needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb" background-blurriness="0.8"></needle-engine>
    ```
2. 将您的 Web 项目中的 `assets/` 文件夹上传到您的虚拟主机提供商。根据您的项目设置，此文件夹包含一个或多个 `.glb` 文件以及任意数量的其他文件，例如音频、视频、天空盒等。

3. 将 `needle-engine` 标签的 `src=` 属性更改为您想要显示的 `.glb` 文件的 URL。通常，这将是类似于 `https://your-website.com/assets/MyScene.glb` 的路径。

4. 完成了！场景现在应该显示在您的网站上。

## 将 Needle Cloud web 应用嵌入为 iframe

如果您将项目部署到 Needle Cloud，您可以使用 iframe 轻松地将其显示在您自己的网站上。

::: warning <b>正在施工中。</b> 本节尚未完成。
:::

# 常见工作流程

## 为客户网站创建 web 应用

1. **了解您正在构建的应用类型**，以及它是否以及如何连接到现有网站。
   通常，您构建的是一个独立的应用程序，可以通过客户域名上的链接访问。
   但也可能涉及其他服务器端和客户端组件。

2. **了解 web 应用应该从哪个 URL 访问。**
  这可以是

    - **[Needle Cloud](./cloud/)** 上的一个页面
      `collaborativesandbox-zubcks1qdkhy.needle.run`

    - 客户网站上的**子页面**
      `my-page.com/app`

    - 新的**子域名**
      `app.my-page.com`
    - 新的或现有的**域名**
      `my-app.com`

    ::: tip 这里没有“好”或“坏”。
    典型的方法是在 [Needle Cloud](./cloud/) 上开始进行初始原型和开发，然后在最终版本中迁移到客户的网页空间和域名。

    选择主要取决于客户在品牌、SEO 和技术设置方面的要求。通常，您需要与客户的 IT 部门或网站管理员讨论此事。
    :::

1. **了解 web 应用将如何部署和维护。**
    - 您是否可以访问客户 web 服务器上的文件夹以便上传最新版本，还是他们希望自行管理部署？
      ::: tip 一种简单的方法：FTP 访问
      通常，您可以要求获得客户 web 服务器上某个文件夹的 FTP 或 SFTP 访问权限。您将获得 URL、用户名和密码，然后您可以将文件上传到该文件夹。我们提供了一个“部署到 FTP”组件，这使得操作特别容易。客户的 IT 部门将设置该文件夹可以从哪个 URL 访问。
        :::

    - 是否有很多内容需要定期更新，还是应用大部分是静态的？
        ::: tip 静态内容 vs. 动态内容
        对于大部分静态内容，不时上传新构建通常就足够了。对于动态内容，您可能需要一个 CMS（内容管理系统）或数据库连接。
        :::
    - 目标受众使用哪些设备和浏览器？
        ::: tip 浏览器兼容性和测试
        尽管 Needle Engine 在所有现代设备和浏览器上都可以工作，但始终建议在目标受众使用的设备和浏览器上测试您的应用，以确保一切按预期工作。例如，为手机创建 AR 应用时，您需要跨 Android 和 iOS 设备进行测试。
        :::

2. **设置项目、测试部署和客户端部署。**
   早期测试部署过程通常是一个好主意，以确保您了解其工作原理和要求。例如，当您决定使用 FTP 时，您可以在自己的 web 服务器上设置一个测试文件夹并在那里测试部署过程。一旦客户批准了更改，您就可以部署到客户的服务器。

3. **开始创作！**
   确定需求并完成部署设置后，继续开始制作您的项目！您通常会在本地迭代，然后部署到测试服务器进行批准，然后再部署到客户端服务器。

## Wordpress

1. 决定您想要用来嵌入 Needle Engine 项目的方法。您可以使用“将 Needle 项目嵌入现有网站”方法，或“将 Needle 项目嵌入为 iframe”方法。

2. 将您的 Web 项目中的 `dist/` 文件夹内容上传到您的虚拟主机提供商。通常，Wordpress 上传目录位于 `wp-content/uploads/`。

    ::: tip Wordpress 备份
    您可以决定您的新项目是放在 `wp-content/uploads/my-project/`，还是放在 `my-projects/my-project` 等不同位置。这会影响您的项目是否以及如何包含在 Wordpress 备份中。
    :::

3. 在您想要添加 Needle Engine 的页面中，添加一个 `HTML` 块，并按照上面概述的方式粘贴代码片段 – 无论是作为脚本嵌入还是作为 iframe。

## Shopify

::: warning <b>正在施工中。</b> 待补充文档。
:::

## Wix

::: warning <b>正在施工中。</b> 待补充文档。
:::

## Webflow

::: warning <b>正在施工中。</b> 待补充文档。
:::


页面由 AI 自动翻译