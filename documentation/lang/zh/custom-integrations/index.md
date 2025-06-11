<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <span style="font-size: 50px;">✨</span>
</div>

# 与其他工具集成

Needle Engine 设计灵活且可扩展。它可以与其他工具和服务集成，以改善您从任何软件将丰富、交互式 3D 带到 Web 的工作流程。

与 Needle Engine 进行自定义集成的核心是 glTF 3D 格式。这是 Web 上最广泛支持的 3D 格式，也是最通用的格式。这种轻量级格式可以存储 3D 模型、动画、纹理以及各种额外数据。glTF 是可扩展的，这正是我们选择它作为 Needle Engine 基础的原因。它允许我们在 3D 文件中添加丰富的功能和交互能力，包括更好的渲染、物理、交互、XR、网络等。

由于使用标准化的 glTF 格式进行交换，创建与任何软件的基本集成变得容易——只需将您的 3D 资产导出为 glTF 文件并将其导入 Needle Engine。从那里，您可以为您的集成添加更多功能，以支持我们的脚本扩展。通常，这是通过您的 3D 软件中的插件、扩展或导出钩子来完成的。

## 自定义集成的结构
自定义集成的结构如下所示：

1. 将您的 3D 资产导出为 glTF 文件。此时，您的集成可能就像在您的 3D 软件中点击导出按钮一样简单。
2. 在使用 Needle Engine 的 Web 项目中使用 glTF 文件。
   - 这可以是一个由其他集成创建的 Web 项目、从示例下载的 Web 项目，或者使用 `npx needle-create` 创建的新 Web 项目。
   - 将 glTF 文件导出到 `assets` 文件夹中。每当您重新导出 glTF 文件时，您的 Web 应用都应自动刷新。
3. 此时，您已经有一个基本的功能性集成，并且您已经可以通过 Web 项目中的 TypeScript 添加自定义功能。
4. 下一步是在您的软件中添加一种创建和调整组件的方法。根据软件的不同，这可以通过自定义 UI、脚本或插件来完成。
   - 首先，尝试使用像 `DragControls` 这样的组件。它有一些选项，但默认值足以开始。
   - 然后，转向需要配置的组件。一个好的起点是我们的 `Everywhere Actions`，因为它们允许创作者构建各种交互体验，而无需编写任何代码。
5. 将这些组件作为每个节点的 `NEEDLE_components` glTF 扩展的一部分导出。通常，这是通过向您软件中现有的 glTF 导出器添加自定义 glTF 扩展或钩子来完成的。
6. 集成与 Web 项目，以便为自定义组件生成 UI。对于 Unity 和 Blender，我们称之为 `Component Compiler`——它会自动为项目中的组件创建 UI，并充当 TypeScript 组件和您的 3D 软件之间的桥梁。

## 集成 Web 项目工作流程

一个成熟的集成还可能管理更多的 Web 项目工作流程。所有这些操作都可以通过命令行完成，但为了易于使用，可以将它们整齐地包装在您的 3D 软件的 GUI 或自定义菜单中。这包括：

1. 创建新项目或更改 Web 项目的位置
2. 从您的 3D 软件内部运行 Web 项目
   - 我们的 [Unity integration](./../unity/) 会覆盖“播放”按钮来运行 Web 项目。
   - [Blender integration](./../blender/) 有一个自定义的“播放”按钮，用于运行 Web 项目。
3. 将 Web 项目构建到文件夹中
4. 将构建好的项目上传到 Needle Cloud 或其他平台，并记住 Project ID 和 Team ID。
   - 我们的 Unity 集成还会显示您团队的最新上传，并允许您跳转到项目的最新部署。
5. 将单个资产上传/下载到 Needle Cloud 或其他平台。

:::tip 如果您计划构建自定义集成，请联系我们！
如果您有兴趣构建自定义集成，请联系我们。我们很乐意帮助您完成此过程，并解释更多细节。对于企业客户，我们也提供自定义集成服务。
:::

页面由AI自动翻译