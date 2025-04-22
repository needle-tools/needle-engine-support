# 功能概览

Needle Engine 是一个功能齐全的 3D 引擎，可在浏览器中运行。它具备了您期望的现代 3D 引擎的所有功能，甚至更多。如果您还没有了解，请查看我们的 [Homepage](https://needle.tools) 和我们的 [Samples and Showcase](https://engine.needle.tools/samples)。

[[toc]]

## 着色器和材质 (Shaders and Materials)

使用 Shader Graph 或其他系统创建的 PBR 材质和自定义着色器都可以导出。

<img src="https://user-images.githubusercontent.com/5083203/186012027-9bbe3944-fa56-41fa-bfbb-c989fa87aebb.png" />

使用基于节点的 [ShaderGraph](https://unity.com/features/shader-graph) 为 Web 创建着色器。ShaderGraph 让艺术家可以轻松地持续创作，而无需担心语法问题。

阅读更多关于 [PBR Materials](./export.md#physically-based-materials-pbr) • [Custom Shaders](./export.md#custom-shaders) 的信息

## 跨平台：VR、AR、移动、桌面

Needle Engine 可以在任何 Web 技术运行的地方运行：在桌面、移动设备、AR 或 VR 上运行同一个应用程序。我们构建 Needle Engine 时就考虑到了 [XR](./xr.md)，并将其视为响应式 Web 设计不可或缺的一部分！

使用 [Everywhere Actions](./everywhere-actions.md) 实现 **Android 和 iOS 上的交互式 AR**。

## 光照贴图 (Lightmaps)

![lightmaps](https://user-images.githubusercontent.com/5083203/186163693-093c7ae2-96eb-4d75-b98f-bf19f78032ff.gif)

光照贴图可以在 Unity 或 Blender 中烘焙，轻松为您的 3D 内容添加美丽的静态光照。Web 的光照烘焙从未如此简单。只需在 Unity 中将您想要烘焙光照贴图的对象标记为 static，向您的场景添加一个或多个光源（或使用自发光材质），然后点击烘焙。Needle Engine 将按场景导出您的光照贴图，并自动加载和显示它们，就像您在编辑器中看到的一样！

> **注意**：对使用哪种光照烘焙器没有技术限制，只要它们最终存储在 Unity 的光照贴图数据结构中即可。因此，第三方光照烘焙器如 [Bakery](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218) 也受支持。

- 阅读更多关于 [Exporting Lightmaps](https://fwd.needle.tools/needle-engine/docs/lightmaps) 的信息

## 多人游戏和网络 (Multiplayer and Networking)

联网功能内置于核心运行时中。Needle Engine 部署到 Glitch 后，会附带一个微型服务器，让您可以在几秒钟内部署一个多人 3D 环境。内置的联网组件让您轻松入门，您也可以创建自己的同步组件。同步变量和状态非常容易！

- 阅读更多关于 [Networking](https://fwd.needle.tools/needle-engine/docs/networking) • [Scripting](https://fwd.needle.tools/needle-engine/docs/scripting) 的信息

## 动画和序列 (Animations and Sequencing)

Needle Engine 为 Web 带来了强大的动画、状态控制和序列功能——从播放单个动画到编排和混合复杂的动画和角色控制器。导出器可以将 Unity 组件（如 Animator 和 Timeline）转换为 Web 兼容的格式。
我们甚至将此功能添加到我们的 Blender 插件中，这样您也可以在 Blender 中制作兼容的动画状态机，并将 nla 轨道作为 timeline 导出到 Web。

- 阅读更多关于 [Animation Components](./component-reference.md#animation) 的信息

### Animator

<img src="https://user-images.githubusercontent.com/5083203/186011302-176524b3-e8e5-4e6e-9b77-7faf3561bb15.png" />

Unity 中的 [Animator 和 AnimatorController](https://docs.unity3d.com/Manual/class-AnimatorController.html) 组件允许您设置动画并定义何时以及如何混合它们。我们支持导出状态机、StateMachineBehaviours、过渡和层。StateMachineBehaviours 也支持 `OnStateEnter`、`OnStateUpdate` 和 `OnStateExit` 事件。

> **注意**：不支持 Sub-states 和 Blend Trees。

### Timeline

![2022-08-23-013517_Scene](https://user-images.githubusercontent.com/5083203/186037829-ee99340d-b19c-484d-b551-94797519c9d9.png)

我们也将 [Unity 的 Timeline](https://unity.com/features/timeline) 设置和轨道转换为 Web 兼容的格式。
支持的轨道包括：AnimationTrack、AudioTrack、ActivationTrack、ControlTrack、SignalTrack。

> **注意**：目前不支持 Sub-Timelines。

> **注意**：可以 [导出自定义 timeline 轨道](https://github.com/needle-tools/needle-engine-modules/tree/main/package/TimelineHtml)。

- 阅读更多关于 [Animation Components](./component-reference.md#animation) 的信息

## 物理 (Physics)

使用 Rigidbodies、Mesh Colliders、Box Colliders 和 SphereColliders 为您的世界添加有趣的物理效果。

- 阅读更多关于 [Physics Components](./component-reference.md#physics) 的信息

<sample src="https://engine.needle.tools/samples-uploads/physics-animation/" />

## UI

使用 Unity 的 UI canvas 系统构建 UI 正在开发中。目前的功能包括导出 Text（包括字体）、Images、Buttons。

请参阅 [UI 组件参考](component-reference.md#ui) 查看支持的组件。

<sample src="https://engine.needle.tools/samples-uploads/screenspace-ui" />

## 粒子 (Particles)

导出 Unity ParticleSystem (Shuriken) 正在开发中。目前的功能包括世界/局部空间模拟、箱形和球形发射器形状、随时间发射以及爆发发射、随时间变化的速度和颜色、随速度发射、纹理表动画、基本拖尾。
请参阅下面的[实时示例](https://engine.needle.tools/samples/particles)，了解支持的功能：

<sample src="https://engine.needle.tools/samples-uploads/particles/" />

## 后处理 (PostProcessing)

内置效果包括 Bloom、屏幕空间环境光遮蔽 (Screenspace Ambient Occlusion)、景深 (Depth of Field)、颜色校正 (Color Correction)。您也可以创建自己的自定义效果。请参阅[组件参考](./component-reference.md#postprocessing) 获取完整列表。

<sample src="https://engine.needle.tools/samples-uploads/postprocessing/" />

## 编辑器集成 (Editor Integrations)

Needle Engine 与 Unity Editor 和 Blender 有强大的集成。
它允许您以可视化的方式设置和导出复杂场景，为艺术家和开发者提供了简单灵活的协作。

## 脚本 (Scripting)

Needle Engine 使用[基于组件的工作流程](scripting.md#component-architecture)。使用 TypeScript 或 JavaScript 创建自定义脚本。使用我们集成到 Unity 中的[基于 npm 的模块化包工作流程](https://fwd.needle.tools/needle-engine/docs/npmdef)。一个 [TypeScript 到 C# 组件编译器](https://fwd.needle.tools/needle-engine/docs/component-compiler) 会神奇地即时生成 Unity 组件。

- 阅读更多关于 [Scripting Reference](scripting) • [Npm Definition Files](https://fwd.needle.tools/needle-engine/docs/npmdef) 的信息

## 还有更多

- 后处理 (PostProcessing) → Bloom、屏幕空间环境光遮蔽 (Screenspace Ambient Occlusion)、景深 (Depth of Field)、颜色校正 (Color Correction)...
- EditorSync → 在 Unity 中编辑时实时同步到运行中的 three.js 应用程序，用于本地开发
- iOS 和 Android 上的交互式 AR → 使用我们的 [Everywhere Actions](./everywhere-actions.md) 功能集或构建您自己的功能

---
# 下一步

请参阅我们的 [Getting Started Guide](getting-started/) 了解如何下载和设置 Needle Engine。
了解[我们的愿景](vision)或深入了解驱动这一切的一些[技术背景和 glTF](technical-overview)。


此页面由 AI 自动翻译