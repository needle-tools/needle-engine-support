---
title: Exporting Assets to glTF
---



# 导出资源、动画、预制体、材质、光照贴图...
向您的 Unity 场景添加一个 ``ExportInfo`` 组件，以根据模板生成新的 Web 项目，链接到您要导出的现有 Web 项目，设置对其他库和包的依赖关系，并部署您的项目。

默认情况下，您的场景将在保存时导出。可以通过禁用 ``ExportInfo`` 组件中的 ``Auto Export`` 来更改此设置。

## 📦 导出 glTF 文件
要导出网格、材质、动画、纹理等，请在您的层级视图中创建一个新的 GameObject 并向其添加一个 ``GltfObject`` 组件。这是新的 glTF 文件的根对象。每当您更改场景并保存时，它都会被导出。

只有位于这些根对象上和内部的脚本和数据会被导出。位于它们之外的脚本和数据不会被导出。

将一个立方体添加为您的根对象的子对象并保存您的场景。请注意，输出的 ``assets/`` 文件夹（参见 [项目结构](#vite-project-structure)）现在包含一个新的 ``.glb`` 文件，其名称与您的根 GameObject 相同。

您可以启用 ``Smart Export`` 设置（通过 `Edit/Project Settings/Needle`）仅在此对象层级发生更改时进行导出。

:::details 如何防止特定对象被导出
带有 `EditorOnly` 标签的对象将被忽略导出，包括其子对象层级。
请注意，这比禁用对象更可取，因为禁用对象在稍后被启用时仍会被导出。
:::

### 懒加载和多关卡/场景

如果您想将应用程序拆分为多个关卡或场景，只需使用 `SceneSwitcher` 组件即可。然后，您可以将应用程序构建成多个场景或预制体，并将它们添加到 SceneSwitcher 数组中以便在运行时加载和卸载。这是避免预加载所有内容并保持加载时间较短的绝佳方法（例如，我们在 [needle.tools](https://needle.tools?utm_source=needle_docs&utm_content=export_scenes) 上就是这样做的，将网站的每个部分拆分为独立的场景，并在需要时才加载它们）。

### 每个 glTF 的推荐复杂度

- 未压缩的最大导出尺寸 50 MB（通常压缩后约为 10-20 MB）
- 最大 50 万顶点（如果也面向移动 VR，则更少）
- 最大 4x 2k 光照贴图

您可以将场景和预制体拆分为多个 glTF 文件，然后在需要时按需加载这些文件。这可以保持加载性能快速，文件大小小巧。请参阅 [脚本文档中的 AssetReference 部分](scripting.md#assetreference-and-addressables)。

这里的场景复杂度是推荐的，以确保在一系列支持 Web 的设备和带宽上获得良好性能。除了您设备的性能外，这没有技术限制。

### 预制体
预制体可以作为独立的 glTF 文件导出并在运行时实例化。要将预制体导出为 glTF，只需[从您的脚本中](https://fwd.needle.tools/needle-engine/docs/addressables)引用预制体资源（来自项目视图而非场景中）。

导出预制体也支持嵌套：预制体中的一个组件可以引用另一个预制体，然后该预制体也会被导出。
这种机制允许构建场景尽可能轻量，并首先加载最重要的内容，然后延迟加载其他内容。

### 场景资源
与预制体资源类似，您可以引用其他场景资源。
入门方法是，在 Unity 中创建一个带有 ``UnityEditor.SceneAsset`` 字段的组件，并将其添加到 GltfObject 内部的某个 GameObject 中。引用的场景现在将作为单独的 glTF 文件导出，并可以作为 TypeScript 中的 ``AssetReference`` 进行加载/反序列化。

您可以在引用的场景中继续工作，同时仍更新您的主导出场景/网站。在场景保存或播放模式切换时，我们将检测当前场景是否被您当前运行的服务器使用，然后触发仅针对该 glb 的重新导出。（此检查按名称进行 - 如果您的 ``<web_project>/assets/`` 文件夹中存在一个 glb，它将被再次导出，主场景将重新加载它。）

例如，在[我们的网站](https://needle.tools?utm_source=needle_docs&utm_content=export_sceneassets)上，每个部分都被设置为一个独立的场景，并在导出时打包成多个 glb 文件，我们按需加载这些文件：

![2022-08-22-172605_Needle_Website_-_Website_-_Windows,_Mac,_Linux_-_U](https://user-images.githubusercontent.com/5083203/185958983-71913c97-5eec-4cfd-99f5-76798582373e.png)

#### 从自定义脚本加载预制体或场景
如果您想从您的脚本中引用并加载预制体，可以声明一个 `AssetReference` 类型。
这是一个最小示例：

@[code ts twoslash](@code/component-prefab.ts)

## 🏇 导出动画
Needle Engine 支持 Unity 动画功能的相当大且强大的子集：

- **Timeline** 包括激活轨道、动画轨道、轨道偏移
- **Animator** 包括顶层状态转换
  - 目前不支持 Blend trees。
  - 目前不支持 Sub state machines。
- **AnimationClips** 包括循环模式
- **程序化动画** 可以通过脚本创建

Needle Engine 是首批支持新的 [glTF 扩展 KHR_ANIMATION_POINTER](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer) 的引擎之一。
这意味着几乎所有属性，包括脚本变量，都是可动画化的。

当前的一个限制是材质在导出时不会被复制——例如，如果您想用不同的颜色动画同一个材质，您当前需要将材质分成两部分。

## 🌍 导出天空盒
Unity 天空盒和自定义反射（如果有）在导出时会被烘焙成纹理，并自动在 ``NEEDLE_lightmaps`` 扩展中导出。

要更改天空盒分辨率，您可以向场景添加一个 ``SkyboxExportSettings`` 组件。

![image](https://user-images.githubusercontent.com/5083203/196030839-170a9496-9ed9-4ebc-bc1d-2df6c746f8c8.png)

如果您完全不想在 glb 文件中导出天空盒，可以取消勾选 ``GltfObject`` 组件上的 ``Embed Skybox`` 选项。

![image](https://user-images.githubusercontent.com/5083203/196030825-8a05037f-5acc-4795-9128-2bdacedd0d49.png)

## ✨ 导出材质

### 基于物理的材质 (PBR)
默认情况下，材质在导出时会被转换为 glTF 材质。glTF 支持基于物理的材质模型，并有一些扩展有助于表示复杂材质。

为了完全控制导出内容，强烈建议使用 UnityGltf 提供的 glTF 材质：
- PBRGraph
- UnlitGraph

::: tip 拿不准的时候，使用 PBRGraph 着色器
PBRGraph 材质具有很多功能，比 Standard 或 URP/Lit 多得多。其中包括折射、虹彩、光泽等高级功能。此外，使用 PBRGraph 和 UnlitGraph 的材质会按原样导出，无需转换。
:::

可以开箱即用转换的材质：
- BiRP/Standard
- BiRP/Autodesk Interactive
- BiRP/Unlit
- URP/Lit
- URP/Unlit

其他材质使用属性名称启发式进行转换。这意味着根据您的材质和着色器使用的属性名称，您可能需要重构您的自定义着色器的属性以使用 URP/Lit 或 PBRGraph 的属性名称，或者将材质导出为[自定义着色器](#custom-shaders)。

### 自定义着色器
要导出自定义的无光照着色器（例如使用 ShaderGraph 创建的），请将 ``ExportShader`` 资源标签添加到您要导出的着色器上。资源标签可在 Inspector 窗口底部看到。

![2022-08-22-172029_Needle_Website_-_CustomShaders_-_Windows,_Mac,_Lin](https://user-images.githubusercontent.com/5083203/185957781-9fae18c5-09ff-490f-8958-57e138aa0003.png)

#### 限制
- 我们目前仅支持自定义的**无光照**着色器——尚不正式支持 Lit 着色器转换。
- 自定义 Lit 着色器目前处于实验阶段。并非所有渲染模式都受支持。
- 不支持自定义着色器的阴影接收
- 不支持带有自定义着色器的蒙皮网格
- 由于从 Unity 到 three.js 和 glTF 会发生多次坐标系更改，因此可能需要进行一些更改才能使高级效果生效。我们尝试在导出时转换数据，但可能无法捕捉到所有需要转换的情况。
  - Unity 中的 UV 坐标从左下角开始；glTF 中从左上角开始。
  - glTF 中的 X 轴值与 Unity 中的相反。这是左手坐标系到右手坐标系更改的一种变体。着色器中使用的数据可能需要在 X 轴上进行翻转才能正确显示。

::: note 非 glTF 规范的一部分
请注意，**自定义着色器**并非 glTF 规范的官方部分。我们实现的自定义着色器使用一个称为 KHR_techniques_webgl 的扩展，该扩展将 WebGL 着色器代码直接存储在 glTF 文件中。生成的资源将在基于 Needle Engine 的查看器中工作，但在其他查看器中可能无法正确显示。
:::

## 💡 导出光照贴图
![2022-08-22-171650_Needle_-_Google_Chrome](https://user-images.githubusercontent.com/5083203/185957005-d04c9530-07eb-40f5-b305-9822d13b79ab.png)

要导出光照贴图，只需在 Unity 中[生成光照贴图](https://docs.unity3d.com/Manual/Lightmapping.html)。光照贴图将自动导出。

处理多个场景时，禁用“自动生成”并显式烘焙光照贴图。否则，Unity 会在场景切换时丢弃临时光照贴图。

### 推荐的光照贴图设置
- 光照贴图编码：普通质量（在 Project Settings > Player 中调整）
- Progressive GPU（更快，对于小场景通常足够准确）
- 非定向光照贴图
- 最大光照贴图尺寸 2k（可以更高，但预计文件会很大）
- 每个场景最多 4x 2k 光照贴图（可以更高，但预计文件会很大）
- 压缩光照贴图 关闭（提高质量；否则导出时会再次压缩）

![2022-08-22-171356_Needle_Website_-_Lightmaps_-_Windows,_Mac,_Linux_-](https://user-images.githubusercontent.com/5083203/185956392-f4031f45-ad13-4e6d-a14c-c8ec5c1fcfd4.png)

### 混合烘焙和非烘焙对象

Unity 处理灯光和环境的方式与 three.js 处理方式之间没有 100% 的映射。例如，Unity 对已烘焙光照贴图和未烘焙光照贴图的对象有完全独立的执行路径（已烘焙光照贴图的对象不接收环境光，因为环境光已烘焙到它们的贴图中），而 three.js 在这方面没有区分。

这意味着为了获得最佳结果，如果您在场景中混合烘焙和非烘焙对象，我们目前推荐特定设置：
```
环境照明：Skybox
环境强度：1
环境颜色：黑色
```

**2021.3+**
![20220826-175324-SqBL-Unity_pMXa-needle](https://user-images.githubusercontent.com/2693840/186947184-2446672f-420c-47e8-8f7d-970a7d52bf35.png)

**2020.3+**
![20220826-175514-tnGc-Unity_mycs-needle](https://user-images.githubusercontent.com/2693840/186947203-2d7d96c3-f566-44b4-889c-4103fac505d4.png)

如果您的场景中没有烘焙对象，则以下设置也应产生正确结果：
```
环境照明：Color
环境颜色：任意
```


页面由 AI 自动翻译