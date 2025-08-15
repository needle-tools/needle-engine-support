---
title: 框架、打包器、HTML
---

## 打包和 Web 前端

Needle Engine 被构建为一个 web component。
这意味着你可以直接在你的项目中安装 `@needle-tools/engine`：

```bash
npm i @needle-tools/engine
```

然后像这样从 HTML 中使用它：

```html
<script type="module">
  import '@needle-tools/engine';
</script>
<needle-engine src="path/to/your.glb"></needle-engine>
```

通过我们默认的基于 Vite 的项目模板，Needle Engine 在部署时会被打包到你的 Web 应用中。这确保了文件更小并优化了加载时间。

::: tip 打包和 Tree shaking

**打包 (Bundling)** 意味着组成你项目的所有 css、js 和其他文件在构建时会被合并成更少、更小的文件。这确保了只下载一个或少数几个包含所需最少代码的文件，而不是下载大量小型脚本和组件。Vite 文档包含一个很好的解释，说明为什么 Web 应用应该被打包：[Why Bundle for Production](https://vitejs.dev/guide/why.html)

**Tree shaking** 是 Web 开发中一种常见的做法，其中未使用的代码会从最终的 bundle 中移除以减小文件大小。这类似于 Unity 中的“code stripping”。[MSDN 文档](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) 对 tree shaking 做了很好的解释。
:::

### Vite, Vue, React, Svelte, React Three Fiber...

Needle Engine 对框架的选择不持特定立场。我们的默认模板使用流行的 [vite](https://vitejs.dev) 作为打包器。在此基础上，你可以添加 vue、svelte、nuxt、react、react-three-fiber 或其他框架，我们提供了许多示例。你还可以集成其他打包器，或者完全不使用——只使用纯粹的 HTML 和 Javascript。

以下是一些可能的、我们用于 Needle Engine 的技术栈示例：

- **Vite + HTML** — 这是我们的默认模板所使用的！

- **Vite + Vue** — 这是 [Needle Tools](https://needle.tools) 网站所使用的！可以在 [这里](https://github.com/needle-tools/needle-engine-samples) 找到示例下载。
- **Vite + Svelte**
- **Vite + SvelteKit**
- **Vite + React** — Unity 集成中包含了一个实验性模板，你可以在生成项目时选择它！
- **react-three-fiber** — Unity 集成中包含了一个实验性模板，你可以在生成项目时选择它！
- **Vercel & Nextjs** — 在[这里](https://github.com/needle-engine/nextjs-sample)找到一个 nextjs 项目示例
- **不使用任何打包器的 CDN** — 在[这里](./vanilla-js.md)找到代码示例

简而言之：我们目前提供一个最小化的 Vite 模板，但你可以扩展它或切换到其他框架——
请告诉我们你构建了什么以及如何构建，以及我们如何改进你的用例体验或提供示例！

:::tip
一些框架需要在 `needle.config.json` 中进行自定义设置。更多信息请参见[此处](./reference/needle-config-json.md)。通常需要设置 `baseUrl`。
:::

:::details 如何在 Unity 中创建自定义项目模板？

你可以创建和分享你自己的 Web 项目模板，以使用其他打包器、构建系统，或完全不使用。

**创建新模板**
1. 选择 `Create/Needle Engine/Project Template` 将 ProjectTemplate 添加到你想用作模板的文件夹中
2. 完成！就是这么简单。

当项目中存在 NpmDef 时（即当你的项目使用本地引用时），依赖项会从 unity 中获取。
你也可以将你的包发布到 npm 并通过版本号引用它们。
:::

## 创建 PWA

我们支持直接从我们的 Vite 模板轻松创建渐进式 Web 应用 (PWA)。
PWA 是一种 Web 应用，加载方式与普通网页或网站相同，但可以提供用户功能，如离线工作、推送通知以及通常只有原生移动应用才能访问的设备硬件。

默认情况下，使用 Needle 创建的 PWA 支持离线功能，并且在你发布新版本的应用时，可以选择自动刷新。

1) 在你的 Web 项目中安装 [Vite PWA plugin](https://vite-pwa-org.netlify.app/)：`npm install vite-plugin-pwa --save-dev`
2) 如下所示修改 `vite.config.js`。确保将相同的 `pwaOptions` 对象传递给 `needlePlugins` 和 `VitePWA`。

```js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async ({ command }) => {

    // 创建 pwaOptions 对象。
    // 你可以在这里编辑或输入 PWA 设置（例如更改 PWA 名称或添加图标）。
    /** @type {import("vite-plugin-pwa").VitePWAOptions} */
    const pwaOptions = {};

    const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");

    return {
        plugins: [
            // 将 pwaOptions 对象传递给 needlePlugins 和 VitePWA 函数
            needlePlugins(command, needleConfig, { pwa: pwaOptions }),
            VitePWA(pwaOptions),
        ],
        // vite 配置的其余部分...
```

:::tip 所有资源默认会被缓存
请注意，默认情况下，你的构建文件夹中的所有资源都会添加到 PWA 预缓存中——对于包含大量动态资产的大型应用程序，这可能不是你想要的（想象一下用户打开应用后，YouTube PWA 缓存所有视频！）。有关如何自定义此行为，请参见[更多 PWA 选项](#more-pwa-options)。
:::

### 测试 PWA

要测试你的 PWA，部署页面，例如使用 `DeployToFTP` 组件。
然后，在浏览器中打开已部署的页面，检查 PWA 功能是否按预期工作：
- 应用显示为可安装
- 应用可以离线工作
- 应用被 [pwabuilder.com](https://pwabuilder.com/) 检测为具备离线能力的 PWA

PWA 使用 Service Workers 缓存资源并提供离线支持。Service Workers 在开发过程中使用起来有些困难，通常只在构建时启用（例如，当你使用 `DeployTo...` 组件时）。

你可以通过在你的 `vite.config.js` 中的 options 对象中添加以下内容来启用开发时的 PWA 支持。

```js
const pwaOptions = {
  // 注意：PWA 在开发模式下的行为不同。
  // 请确保在生产构建中验证其行为！
  devOptions: {
    enabled: true,
  }
};
```

请注意，开发模式下的 PWA 不支持离线使用——尝试这样做可能会导致意外的行为。

### 自动更新正在运行的应用

网站通常在页面刷新时显示新的或更新的内容。

在某些情况下，你可能希望在发布新版本时页面自动刷新和重新加载——
例如在博物馆、贸易展览、公共显示器或其他长期运行的场景中。

要启用自动更新，请在 pwaOptions 对象中设置 `updateInterval` 属性，其值为应用应检查更新的时间间隔（以毫秒为单位）。如果检测到更新，页面将自动重新加载。

```js
const pwaOptions = {
  updateInterval: 15 * 60 * 1000, // 15 分钟，单位毫秒
};
```

:::tip 周期性重新加载与用户数据
在用户与表单或其他可能因重新加载而丢失的数据进行交互的应用程序中，不建议使用自动重新加载。对于这些应用程序，建议显示重新加载提示。
有关如何实现重新加载提示而非自动重新加载的更多信息，请参见 [Vite PWA plugin 文档](https://vite-pwa-org.netlify.app/guide/prompt-for-update.html)。
:::

### 更多 PWA 选项

由于 Needle 在底层使用了 [Vite PWA plugin](https://vite-pwa-org.netlify.app/)，你可以使用其提供的所有选项和钩子。
例如，你可以提供一个带有自定义应用标题或主题颜色的部分 manifest：

```js
const pwaOptions = {
  // 此处提供的 manifest 选项将覆盖默认值
  manifest: {
    name: "My App",
    short_name: "My App",
    theme_color: "#B2D464",
  }
};
```

对于部分缓存、自定义 Service Workers 或不同的更新策略等复杂需求，你可以从 `needlePlugins` 中移除 `{ pwa: pwaOptions }` 选项，并直接通过 Vite PWA plugin 添加 PWA 功能。

## 从外部 javascript 访问 Needle Engine 和组件

你暴露的代码在打包后可以从 JavaScript 中访问。这允许构建查看器和其他应用程序，其中编辑时已知的数据与仅在运行时已知的数据（例如，动态加载的文件、用户生成的内容）是分开的。
要从引擎外部的普通 javascript 访问组件，请参阅[与普通 javascript 互操作部分](./scripting.md#accessing-needle-engine-and-components-from-anywhere)

## 自定义加载外观

参见 [needle engine 组件参考](./reference/needle-engine-attributes.md) 中的 *加载显示* 部分

### 内置样式

needle-engine 加载外观可以使用浅色或深色皮肤。
要更改外观，请在 `<needle-engine>` Web 组件上使用 `loading-style` 属性。
选项包括 `light` 和 `dark`（默认）：

``<needle-engine loading-style="light"></needle-engine>``

### 自定义加载样式 — *PRO feature* #

请参见 [needle engine 组件参考](./reference/needle-engine-attributes.md) 中的 *加载显示* 部分

![custom loading](/imgs/custom-loading-style.webp)

页面由 AI 自动翻译