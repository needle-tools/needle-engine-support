---
title: MaterialX
---

## Needle Engine 中的 MaterialX

MaterialX 是一种功能强大的标准，用于以基于图的方式描述材质和着色器，与渲染引擎无关。它允许您定义具有多个表面层和逼真照明的复杂材质。

它广泛应用于电影、VFX 和电子商务领域，并受到许多专业创作工具的支持，例如 Autodesk Maya 和 3ds Max、Houdini、V-Ray 和 Omniverse。

::: tip 了解更多
您可以在 [MaterialX 网站](https://www.materialx.org/)上了解更多关于 MaterialX 的信息。
:::

使用 Unity 的 [**Shader Graph**](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.3/manual/index.html) 制作的材质可以通过 **Needle MaterialX Exporter** 自动导出为 MaterialX 文件，该导出器是我们 Unity 集成包的一部分。

这使您可以在 Unity 中创建复杂的、带照明的材质，并随您的场景自动导出。MaterialX 导出扩展了我们现有的 Unlit 着色器导出，后者由于使用 WebGL2 着色器而便携性较低。借助 MaterialX，您已为 WebGPU 和未来的渲染技术做好准备，可以在您的 Web 项目中实现高保真材质。

Needle Engine 中对 MaterialX 的支持使用了官方的 [MaterialX JavaScript 库](https://github.com/materialx/MaterialX)，这意味着材质以尽可能高的保真度呈现。这允许您使用任何 MaterialX 文件。

::: info Shader Graph 到 MaterialX 导出需要 **Pro**、**Edu** 或 **Enterprise** 计划。
MaterialX Exporter 适用于 Pro、Edu 和 Enterprise 计划的用户。
[查看计划和定价。](https://needle.tools/pricing)
:::

## 用例

如果您符合以下情况，MaterialX 是一个不错的选择：
- 为项目使用**基于图的材质**，以获得艺术控制和灵活性。
- 需要**丰富而复杂的表面特征**，例如程序纹理、细节贴图或分层材质。
- 拥有**现有的 MaterialX 材质**，并希望在整个工作室流程中保留它们。
- 希望确保不同渲染引擎之间渲染的**一致性和兼容性**。

## 在您的项目中启用 MaterialX 支持

要在您的 Needle Engine 项目中启用 MaterialX 支持，您需要将 `@needle-tools/materialx` 包添加到您的项目中。

::: tabs

@tab Unity

1. 在您的场景中选择 Needle Engine 组件。

2. 在 Inspector 中找到“NpmDef Dependencies”部分，并通过增加“Size”数字（例如从 0 到 1）来添加新的依赖项。

3. 单击对象选择器符号，使用眼睛符号启用包可见性，然后从列表中选择 `Needle MaterialX` 包。

   ![在 Unity 中查找并添加 MaterialX 包依赖项。](/materialx/add-materialx-package-dependency.jpeg)
   _在 Unity 中查找并添加 MaterialX 包依赖项。_

您现在可以在您的 Web 项目中使用 MaterialX 了。

@tab 其他 Needle 集成

1. 在代码编辑器（例如 VS Code）中查找并打开您的 Web 项目。
   [了解如何打开您的 Web 项目。](./project-structure.html#opening-the-web-project-in-a-code-editor)
2. 在您的 Web 项目中从 NPM 注册表安装 Needle MaterialX 包。

   ```bash
   npm install @needle-tools/materialx
   ```

   这将把 MaterialX 包添加到您的项目中。

3. 如果您正在使用我们任何基于 Vite 的模板，则无需执行任何其他操作。MaterialX 包将自动包含在您的项目中。

    ::: tip 如果您不确定，您很可能正在使用我们的基于 Vite 的模板之一！
    :::

4. 如果您没有使用 Needle Vite 插件，请在您的主入口文件（例如 `main.ts`）中导入并注册 MaterialX：

   ```ts
   import { useNeedleMaterialX } from "@needle-tools/materialx";
   useNeedleMaterialX();
   ```

您现在可以在您的 Web 项目中使用 MaterialX 了。

@tab three.js

您可以在任何 three.js 项目中使用我们的 MaterialX 包，即使您没有使用 Needle Engine。

1. 在您的 `GLTFLoader` 中注册我们的 `MaterialX` 插件：

    ```ts
    import { useNeedleMaterialX } from "@needle-tools/materialx";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

    const gltfLoader = new GLTFLoader();
    
    // ... 注册其他插件，如 DRACOLoader, KTX2Loader 等。
    useNeedleMaterialX(gltfLoader);

    // ... 加载包含 MaterialX 材质的文件
    gltfLoader.load("https://cloud.needle.tools/-/assets/Z23hmXB2qfHiF-2qfHiF/file", (gltf) => {
        scene.add(gltf.scene);
    });
    ```

2. 加载包含 `NEEDLE_materials_mtlx` 扩展的 GLB 文件。该插件将自动加载 MaterialX 材质并将其应用于使用它们的物体。

3. 您可以通过调用 `useNeedleMaterialX(gltfLoader, { preload: true })` 来启用 MaterialX WebAssembly 模块的预加载。这将提前加载 MaterialX WebAssembly 模块，以便在您加载包含 MaterialX 材质的 GLB 文件时即可使用。

您可以在 StackBlitz 上找到如何在 three.js 项目中使用 MaterialX 的完整示例：[MaterialX in three.js](https://stackblitz.com/edit/needle-materialx-example?file=main.js)。

:::
## 导出支持 MaterialX 的材质

1. 使用 Unity 的 Shader Graph 创建材质。

   ![Unity 中复杂 Shader Graph 的示例。](/materialx/shadergraph-example.webp)
   _Unity 中复杂 Shader Graph 的示例。_

2. 选择场景中具有基于 Shader Graph 材质的对象，或在 Project View 中选择着色器资源。

3. 在材质属性中，找到“Needle Engine – 自定义着色器设置”部分，并选择“MaterialX”作为着色器导出类型。

    ![在 Shader Graph 材质属性中启用 MaterialX 导出类型。](/materialx/enable-asset-label-from-material.jpeg)
    _在 Shader Graph 材质属性中启用 MaterialX 导出类型。_

3. 当您导出场景时，所有使用“MaterialX”导出类型着色器的材质都将与您的 3D 内容一同嵌入，并在运行时加载。

## 使用外部创建的 MaterialX 文件

Needle MaterialX 包包含直接加载 MaterialX 文件的实验性支持。纹理可以通过回调函数解析，材质以 three.js `ShaderMaterial` 的形式返回。

您可以在 StackBlitz 上的 [MaterialX 集合](https://stackblitz.com/@marwie/collections/materialx)中找到使用 Needle MaterialX 包的示例。

:::: tabs
@tab 通过代码

```ts
import { TextureLoader } from 'three';
import { Experimental_API } from '@needle-tools/materialx';

// 从 URL 加载 MaterialX 文件及其引用的纹理
function load(mtlx_url) {
    const parts = mtlx_url.split('/');
    parts.pop();
    const dir = parts.join('/');

    return fetch(mtlx_url)
    .then((res) => res.text())
    .then((mtlx) => {
        const loader = new TextureLoader();
        Experimental_API.createMaterialXMaterial(mtlx, '', {
            getTexture: async (url) => {
                return await loader.loadAsync(dir + url);
            },
        }).then((mat) => {
            console.log("MaterialX 材质已加载：", mat);
        });
    });
}
```

::: info
`Experimental_API.createMaterialXMaterial()` 方法目前不支持加载多个材质，或带有额外 .mtlx 引用的 MaterialX 文件。
:::

::::

## 支持的节点和功能

Needle Engine 支持完整的 MaterialX 规范，包括 OpenPBR、Standard Surface、UsdPreviewSurface 和 Unlit Surface 节点，以及 NPR（非真实感渲染）节点，如菲涅尔效应。嵌套的节点图定义和自定义节点也受支持。

Needle Engine 中的 MaterialX 材质支持以下功能：
- **基于图像的照明** (IBL)，自动来自场景的环境贴图
- **反射探针**影响使用 MaterialX 材质的对象
- **光源**：定向光、点光源和聚光灯，目前每个场景限制为 8 个光源
- **纹理压缩和渐进式纹理**。MaterialX 材质完全支持 Needle Engine 强大的纹理压缩和渐进式加载功能，允许您使用大型纹理。它们只会在需要时加载，并且只以当前视图所需的P分辨率加载。
- **动画材质属性**，用于颜色、浮点数、向量。与 Needle Engine 中的其他材质一样，任何数字材质属性都可以进行动画处理。
- 所有 MaterialX 表面模型，包括 **OpenPBR**、**Standard Surface**、**UsdPreviewSurface** 和 **Unlit Surface**。

Needle MaterialX Exporter 利用 Unity Shader Graph 基于图的结构进行导出，并将 Shader Graph 节点转换为 MaterialX nodedefs 和 nodegraphs。它支持以下功能：
- **材质属性**，如颜色、浮点数、向量、纹理
- 对数字、向量和矩阵的**操作**
- **混合节点**，如 Mix、Add、Multiply 和具有各种混合模式的 Blend
- **纹理**和颜色空间
- **子图**，具有一个或多个嵌套级别
- **顶点颜色**受支持
- **多个 UV 通道**受支持（最多 4 个）
- **着色器关键字**受支持，并将作为 MaterialX 中的开关节点导出。

## 支持的 MaterialX 版本

Needle Engine 目前支持 MaterialX 1.39.4 版。早期版本的 MaterialX 文档也受支持，并将自动升级到最新版本。

## MaterialX 导出器的限制

Shader Graph 支持的所有功能并非都受 MaterialX 支持。如果您尝试导出不支持的节点，导出器将记录错误并停止导出过程。然后，如果可能，您可以通过将不支持的节点替换为受支持的节点来解决此问题。

- **顶点置换尚不受支持**：MaterialX 支持置换贴图，但 Needle Engine 目前不支持。这意味着您的 MaterialX 文件中的任何置换节点都将被忽略。
- **实时阴影**：场景中的光源将影响 MaterialX 材质，但目前不支持实时阴影。
- **烘焙光照贴图**：MaterialX 材质目前不支持烘焙光照贴图。
- **切线空间**目前不受支持，这意味着指定“Tangent”为空间的 Shader Graph 节点将看起来不同。
- **代码节点**目前不受支持。

::: tip 特殊的“MATERIALX”着色器关键字
如果您有包含不受支持节点的复杂着色器，可以使用“MATERIALX”关键字来阻止导出它们。关键字开关的“On”路径将被导出，“Off”路径将被忽略导出。您可以使用此功能使包含自定义节点或不受支持功能的着色器保持功能正常，但仍将其导出到 MaterialX。
:::

::: info three.js 中内置的 MaterialX 支持
虽然 three.js 对 MaterialX 有一些初步支持，但它使用的是自定义实现，不支持该标准的许多功能，导致材质表示的准确性较低。Needle Engine 使用官方的 MaterialX JavaScript 库，这意味着材质以尽可能高的保真度呈现。

Needle 正在为 three.js 内置的 MaterialX 支持做出贡献，以便在某个时候我们可以提供两种选择，或者在 three.js 实现更全面时切换到它。
:::


---
页面由 AI 自动翻译