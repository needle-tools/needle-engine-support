---
title: Needle Engine for Blender
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <img src="/blender/logo.png" style="max-height:70px;" />
</div>

# 适用于 Blender 的 Needle Engine

适用于 Blender 的 Needle Engine 使您能够直接在 Blender 中创建高度交互、灵活且轻量级的 Web 应用程序。使用 Blender 强大的工具可视化设置 3D 场景、进行动画制作和设计。

## 安装 Blender 插件

<ClientOnly>

请确保已安装 <a target="_blank" href="https://www.blender.org/download/"><strong>Blender</strong> 4.1 或 4.2</a> 和 <os-link windows_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi" osx_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0.pkg"><strong>node.js</strong></os-link>。
</ClientOnly>

<NoDownloadYet>
    <needle-button
        event_goal="download_blender"
        event_position="getting_started"
        large
        href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"
        same_tab
        next_url="/docs/blender/"
        >
        <strong>下载适用于 Blender 的 Needle Engine</strong>
    </needle-button>
</NoDownloadYet>

1. 在 Blender 中，前往 `Edit > Preferences > Add-ons` 并点击下拉箭头找到 `Install from Disk` 按钮。

2. 选择下载的 zip 文件（命名为 `needle-blender-plugin-*.zip`）进行安装。

3. 在“插件”搜索栏中搜索“Needle”并确保 `Needle Engine Exporter for Blender` 已启用。


![Settings](/blender/settings.webp)

## 入门指南

感谢您使用适用于 Blender 的 Needle Engine。

通过此插件，您可以在 Blender 中创建高度交互且优化的 WebGL 和 WebXR 体验，这些体验使用 Needle Engine 和 three.js 运行。

您将能够对动画进行排序，轻松对场景进行光照烘焙，添加交互性，或创建自己的以 Typescript 或 Javascript 编写的脚本并在 Web 上运行。

<video-embed src="/docs/blender/environment-light.mp4" />
*在 Blender 和 Needle Engine 之间匹配灯光和环境设置。HDRI 环境光会自动从 Blender 直接导出。保存后，页面会自动重新加载。*

:::tip 提供反馈

**您的反馈非常宝贵**，对于我们决定优先开发哪些功能和工作流程至关重要。如果您对我们有任何反馈（无论好坏），请[在论坛中告知我们](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)！
:::

## Blender 示例

- [下载 Blender 示例](https://engine.needle.tools/downloads/blender/download-samples?utm_source=needle_docs&utm_content=blender)

首先创建或打开一个新的 blend 文件，您希望将其导出到 Web。
打开“属性”窗口，然后打开“场景”类别。在 Needle Engine 面板中选择一个 `Project Path`。然后点击 `Generate Project`。它将自动安装并启动服务器 - 完成后，您的浏览器应该会打开并加载 threejs 场景。

![Project panel](/blender/project-panel.webp)

默认情况下，当您保存 blend 文件时，您的场景将自动重新导出。
如果本地服务器正在运行（例如，点击 `Run Project`），网站将自动刷新您更改的模型。


当您的 Web 项目已存在并且您只想继续处理网站时
点击蓝色的 `Run Project` 按钮以启动本地服务器：
![Project panel](/blender/project-panel-2.webp)

### 项目面板概览
![Project panel](/blender/project-panel-3.webp)

1) 您的 Web 项目路径。您可以使用右侧的小文件夹按钮选择不同的路径。
2) 当项目路径指向有效的 Web 项目时，该 `Run Project` 按钮显示。当包含 `package.json` 文件时，Web 项目有效
3) `Directory` 打开 Web 项目目录（即 `Project Path`）
4) 此按钮将当前场景作为 glb 重新导出到您的本地 Web 项目中。当您保存 blend 文件时，默认情况下也会发生这种情况。
5) `Code Editor` 尝试在您的 Web 项目中打开 vscode 工作区
6) 如果您在一个 blend 文件中处理多个场景，您可以配置哪个场景是您的主场景，并应导出到 Web。如果您的任何组件引用了另一个场景，它们也将作为单独的 glb 文件导出。点击“导出”按钮时，您的主场景将是浏览器中加载的场景。
7) 当您想将 Web 项目上传到服务器时，使用 `Build: Development` 或 `Build: Production` 按钮。这将捆绑您的 Web 项目并生成您可以上传的文件。点击 `Build: Production` 时，它还将对您的纹理应用优化（它们将针对 Web 进行压缩）
8) 打开文档



## Blender 设置

### 颜色管理

默认情况下，Blender 视口设置为 `Filmic` - 使用此设置，Blender 和 three.js 中的颜色将不匹配。
要解决此问题，请转到 Blender 渲染类别，并在“颜色管理”面板中选择 `View Transform`: `Standard`

![Correct color management settings](/blender/settings-color-management.webp)


## 环境光照

您可以使用视口着色选项更改环境光照和 skybox。
指定一个 cubemap 用于照明或背景 skybox。您可以调整强度或模糊来修改外观，使其符合您的喜好。

注意：要在浏览器中也看到 skybox cubemap，将 `World Opacity` 增加到 1。

注意：另外，您也可以在“视口着色”标签中启用 `Scene World` 设置，以使用 Blender 世界设置中指定的环境纹理。

![Environment](/blender/environment.webp)

<video-embed limit_height max_height="300px" src="/docs/blender/environment.mp4" />

*在 Blender 和 Needle Engine 之间匹配灯光和环境设置。HDRI 环境光会自动从 Blender 直接导出。保存后，页面会自动重新加载。*

另外，如果您不想将 cubemap 作为背景显示，请将 Camera 组件添加到您的 Blender 相机，并将 `clearFlags` 更改为 `SolidColor` - 请注意，相机 `backgroundBlurriness` 和 `backgroundIntensity` 设置会覆盖视口着色设置。

![Environment Camera](/blender/environment-camera.webp)

### 添加自定义 HDRI / EXR 环境光照和 skybox

<video-embed limit_height src="/docs/blender/custom_hdri.mp4" />


## 导出

要将对象排除在导出之外，您可以禁用视口和渲染显示（见下图）

![Exclude from export](/blender/dont-export.webp)


## 动画 🏇

对于简单的用例，您可以使用 Animation 组件用于播放一个或多个 animationclips。
只需选择您的对象，添加一个 Animation 组件，并指定剪辑（您可以添加额外的剪辑导出到 clips 数组。
默认情况下，仅当 `playAutomatically` 启用时，才会播放指定给它的第一个剪辑。您可以使用简单的自定义 typescript 组件触发其他剪辑)
<video-embed limit_height src="/docs/blender/animation.mp4" />

### AnimatorController

Animator 控制器可用于更复杂的场景。它作为状态机工作，允许您在图中创建多个动画状态，并配置状态之间转换的条件和插值设置。

<video-embed src="/docs/blender/animatorcontroller-web.mp4" />
*创建并导出 [animator statemachines](#animatorcontroller) 用于控制复杂的角色动画*

#### 创建 AnimatorController

可以使用每个面板左上角的 EditorType 下拉菜单打开 AnimatorController 编辑器：

![AnimatorController open window](/blender/animatorcontroller-open.webp)

<video-embed limit_height max_height="188px" src="/docs/blender/animatorcontroller-create.mp4" />
*创建一个新的 animator-controller 资产 ☝ 或从之前创建的资产中选择一个*

##### 图表概览
![AnimatorController overview](/blender/animatorcontroller-overview.webp)
1) 使用 `Shift+A` 创建新的 AnimatorState
2) 该 `Parameters` 节点在您添加第一个节点后创建。选择它以设置用于转换的参数（通过右侧边缘的“节点”面板）
3) 这是一个 AnimatorState。橙色状态是开始状态（可以使用“节点/属性”面板中的 `Set default state` 按钮更改）
4) AnimatorState 的“属性”可用于设置一个或多个到其他状态的转换。使用 `Conditions` 数组选择必须与转换条件匹配的参数。

#### 使用 AnimatorController

要使用 AnimatorController，将 Animator 组件添加到您的动画根对象，并选择您希望用于此对象的 AnimatorController 资产。

![AnimatorController assign to animator](/blender/animatorcontroller-assigning.webp)

您可以从 typescript 或通过例如使用 Button 组件的事件来设置 Animator 参数

### 时间轴 — NLA 轨道导出 🎬

您可以将 Blender NLA 轨道直接导出到 Web。
添加一个 PlayableDirector 组件（通过 `Add Component`）到任何 Blender 对象。在该组件的 ``animation tracks`` 列表中指定您希望为其导出 NLA 轨道的对象。

![](/blender/timeline_setup.webp)
![](/blender/timeline.webp)

::: details 交互式时间轴播放的代码示例
将此脚本添加到 `src/scripts`（参见自定义组件部分），并将其添加到 Blender 中的任何对象，以通过浏览器中的滚动来控制时间轴的时间

```ts twoslash
import { Behaviour, PlayableDirector, serializable, Mathf } from "@needle-tools/engine";

export class ScrollTimeline extends Behaviour {

    @serializable(PlayableDirector)
    timeline?: PlayableDirector;

    @serializable()
    sensitivity: number = .5;

    @serializable()
    clamp: boolean = false;

    private _targetTime: number = 0;

    awake() {
        this.context.domElement.addEventListener("wheel", this.onWheel);
        if (this.timeline) this.timeline.pause();
    }

    private onWheel = (e: WheelEvent) => {
        if (this.timeline) {
            this._targetTime = this.timeline.time + e.deltaY * 0.01 * this.sensitivity;
            if (this.clamp) this._targetTime = Mathf.clamp(this._targetTime, 0, this.timeline.duration);
        }
    }

    update(): void {
        if (!this.timeline) return;
        const time = Mathf.lerp(this.timeline.time, this._targetTime, this.context.time.deltaTime / .3);
        this.timeline.time = time;
        this.timeline.pause();
        this.timeline.evaluate();
    }
}
```
:::

## 交互性 😎

您可以使用 Needle Components 面板添加或移除组件到层次结构中的对象：

![Component panel](/blender/components-panel.webp)

![Component panel](/blender/components-panel-select.webp)
*例如，通过将 `OrbitControls` 组件添加到相机对象*
*您将获得适用于移动和桌面设备的基本相机控制*
*在各自的面板中调整每个组件的设置*

可以使用右下角的 X 按钮移除组件：

![Remove component](/blender/remove-component.webp)

### 自定义组件
只需编写 Typescript 类，也可以轻松添加自定义组件。保存后，它们将自动编译并显示在 Blender 中。

要创建自定义组件，通过 Needle Project 面板打开工作区，并在您的 Web 项目中的 `src/scripts` 内添加一个 `.ts` 脚本文件。请参阅[脚本文档](http://docs.needle.tools/scripting)了解如何为 Needle Engine 编写自定义组件。

::: warning Note
请确保 `@needle-tools/needle-component-compiler` 2.x 已安装在您的 Web 项目中 (package.json devDependencies)
:::

## 光照烘焙 💡

Needle 包含一个光照烘焙插件，使您可以非常轻松地将漂亮的光照烘焙到纹理并将其带到 Web。该插件将自动生成光照贴图 UV，对于所有标记为需要进行光照烘焙的模型，无需手动制作纹理图集。它还支持对具有自己光照贴图数据的多个实例进行光照烘焙。
为了使光照烘焙工作，您需要至少一个光源和在 `Needle Object` 面板中打开 `Lightmapped` 的一个对象。

<video-embed limit_height max_height="800px" src="/docs/blender/lightmapping.mp4" />

::: tip
您可以[在此处](https://engine.needle.tools/downloads/blender/lightmaps.blend)下载视频中的 .blend 文件。
:::
使用 Needle Object 面板启用网格对象或光源的光照烘焙：

![Lightmapping object](/blender/lightmapping-object.webp)

为了快速访问光照贴图设置和烘焙选项，您可以使用 `Needle` 选项卡中的场景视图面板：

![Lightmapping scene panel](/blender/lightmapping-scene-panel.webp)

另外，您也可以在 `Render Properties` 选项卡中使用光照烘焙面板：

![Lightmapping object](/blender/lightmapping-panel.webp)

::: warning Experimental Feature
光照烘焙插件是实验性的。建议在使用时备份 .blend 文件。请将您遇到的问题或错误报告到[我们的论坛](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) 🙏
:::

## 纹理压缩

Needle Engine 构建管线在进行生产构建时会自动使用 ECT1S 和 UASTC 压缩纹理（取决于它们在材质中的使用方式）（**需要 [toktx](../getting-started/index.md#install-these-tools-for-production-builds) 安装**）。但您可以在“材质”面板中覆盖或更改每张纹理的压缩类型。

您可以修改每张纹理应用的压缩。要覆盖默认压缩设置，请前往 `Material` 选项卡并打开 `Needle Material Settings`。在那里您会找到一个开关，用于覆盖您材质中使用的每张纹理的纹理设置。请参阅[纹理压缩表](../deployment.md#how-do-i-choose-between-etc1s-uastc-and-webp-compression)以简要了解各种压缩算法之间的差异。

![Texture Compression options in Blender](/blender/texture-compression.webp)

## 更新

Needle Project 面板中的灯泡会通知您当插件有新版本可用时。
只需点击该图标下载新版本。
![Update notification](/blender/updates.webp)

## 报告问题

如果您遇到任何问题，我们非常乐意提供帮助！请加入[我们的论坛](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)以获得快速支持。

也请检查 Blender 中的日志。您可以通过 Blender 中的 `Help/Needle` 找到 Needle Engine 插件的特定日志。

### 集成错误报告工具
![Needle Blender Bug Reporter panel](/blender/bugreporter.webp)
您还可以直接从 Blender 自动创建并上传错误报告。上传的错误报告将仅用于调试。它们在我们的后端是加密的，并将在 30 天后删除。

如有需要，在某些情况下，我们也可以为您的项目设置定制的 NDA。请联系我们获取更多信息。

:::tip 使用错误报告工具需要 Web 项目
在发送错误报告之前，请确保您已设置 Web 项目——这将有助于我们更好地了解您的系统和设置，并使重现问题变得更容易。
:::

# 下一步

- [概念：Web 项目](../project-structure.md)
- [概念：导出资产](../export.md)
- [概念：部署（分享您的网站）](../deployment.md)
- [组件：了解 Everywhere Actions](../everywhere-actions.md)
- [初学者脚本：Typescript 要点](../getting-started/typescript-essentials.md)
- [初学者脚本：如何编写自定义组件](../scripting.md)


页面由 AI 自动翻译