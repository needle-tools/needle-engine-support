<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <img src="/imgs/logo-webcomponents.png" style="max-height:70px;" title="Web Components Logo" alt="Web Components Logo"/> +
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="three.js Logo" alt="three.js Logo"/>
</div>

# Needle Engine 作为 Web Component

Needle Engine 提供一个易于使用的 Web Component，只需几行代码即可直接在 HTML 中显示丰富、交互式的 3D 场景。它是支持我们集成的同一个 Web Component。

一旦你超越了 Web Component 的配置选项，你可以通过自定义脚本和组件以及完全的程序化 scene graph 访问来扩展它。

:::tip 使用集成！
对于复杂的 3D 场景和快速迭代，我们建议将 Needle Engine 与我们的一种集成配合使用。它们提供了强大的创建工作流程，包括实时预览、hot reloading 和包含 3D 优化的先进 build pipeline。
:::

### 快速开始
::: code-tabs
@tab index.html
@[code html](@code/basic-webcomponent.html)

@tab Result
```html
<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%;
    aspect-ratio: 16/9;
    outline: none;
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>
```
:::
[在 Stackblitz 上打开此示例](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)



## 从 npm 安装

你不使用任何集成即可直接使用 Needle Engine。Needle Engine 使用 [three.js](https://threejs.org/) 作为 scene graph 和渲染库，因此 three.js 的所有功能在 Needle 中也可用。

你可以通过运行以下命令从 [`npm`](https://www.npmjs.com/package/@needle-tools/engine) 安装 Needle Engine：
<br/>
`npm i @needle-tools/engine`

## 从 CDN 安装 needle-engine

虽然我们的默认模板使用 [vite](https://vitejs.dev)，但 Needle Engine 也可以直接与 vanilla Javascript 一起使用 – 无需使用任何 bundler。

你只需一行代码即可将完整、预捆绑的 Needle Engine 版本添加到你的网站。
这包括我们的核心组件、physics、particles、networking、XR 等。如果你不确定，请使用此版本！

```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine@4/dist/needle-engine.min.js">
</script>
```


许多示例可在 [StackBlitz](https://stackblitz.com/@marwie/collections/needle-engine) 上找到。

## 在 StackBlitz 上快速原型设计

为了快速实验，我们提供一个方便的链接来创建一个随时可以开始的新项目：[engine.needle.tools/new](https://engine.needle.tools/new)
我们的大量示例集也可在我们的 [Needle Engine Stackblitz Collection](https://stackblitz.com/@marwie/collections/needle-engine) 中找到。

## 使用 VS Code 进行本地开发

如果你想不使用任何集成来使用 Needle Engine，那么你可能需要为你的网站运行一个本地服务器。以下是如何使用 Visual Studio Code 实现：

1.  在 Visual Studio Code 中打开包含你的 HTML 文件的文件夹。
2.  安装 [LiveServer extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)。
3.  激活 live-server（VSCode 底部有一个“Go Live”按钮）。
4.  如果未自动打开，请在你的网页浏览器中打开 ``http://localhost:5500/index.html``。


## three.js 和 Needle Engine

由于 Needle Engine 使用 [three.js](https://threejs.org/) 作为 scene graph 和渲染库，因此 three.js 的所有功能在 Needle 中也可用，并且可以从 component scripts 中使用。我们正在使用 three.js 的一个 fork，其中包含额外的功能和改进，特别是在 WebXR、Animation 和 USDZ export 方面。


::: tip
确保将 ``<needle-engine src="myScene.glb">`` 路径更新为现有的 glb 文件
或者[下载这个示例 glb](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb) 并将其放在与 index.html 相同的文件夹中，命名为 ``myScene.glb`` 或更新 src 路径。
:::

@[code](@code/basic-html.html)


[在 github 上查看](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla)

Page automatically translated using AI
页面由 AI 自动翻译