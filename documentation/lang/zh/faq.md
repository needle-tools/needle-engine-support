---
title: 常见问题 (FAQ) 💡
---

## 如何激活我的 Needle Engine 许可？

### 在 Unity 中激活许可

#### Needle Engine 4.x

转到 Project Settings/Needle 并点击登录按钮。按照步骤登录到您的 Needle 账户。
之后，您将在 Unity 项目设置窗口中看到您的账户信息。从下拉菜单中选择已授权的团队。

#### Needle Engine 3.x

打开 `Edit/Project Settings/Needle` 以获取 Needle Engine 插件设置。在窗口顶部，您会找到输入许可信息的字段。
- `Email` - 输入您购买许可时使用的电子邮件
- `Invoice ID` - 输入您通过电子邮件收到的一个发票 ID

注意：您可能需要重新启动本地 webserver 以应用许可。

![unity license window](/imgs/unity-needle-engine-license.jpg)

### 在 Blender 中激活许可
打开 `Addon Preferences/Needle Engine` 以获取 Needle Engine 插件设置
- `Email` - 输入您购买许可时使用的电子邮件
- `Invoice ID` - 输入您通过电子邮件收到的一个发票 ID

注意：您可能需要重新启动本地 webserver 以应用许可。

## 我的本地网站显示 SSL 错误，例如“您的连接不是私密的”

根据您的本地配置，您可能会在浏览器中看到关于 SSL Security 的警告。

这是因为尽管连接已加密，但默认情况下没有浏览器可以验证的 SSL 证书。
如果发生这种情况：点击 `Advanced` 和 `Proceed to Site`。在 Safari 中，您可能需要在之后刷新页面，因为它不会自动继续。现在您应该可以在浏览器中看到您的场景了！

对于同一个本地 server，该对话框应该只显示一次

::: tip
连接是安全的，因为我们强制使用 HTTPS 以确保 WebXR 和其他现代 web API 可以即时工作。一些浏览器仍然会抱怨 SSL 连接（在您的本地 development server 和本地网站之间）无法自动信任，并且您需要手动验证您信任该页面。根据浏览器和系统设置，自动 Page Reload 和 Websocket 连接也可能会受到影响。

有关如何设置 self-signed certificate 以获得更流畅 development experience 的信息，请参阅[测试文档](./testing.md)。
:::

![SLL warning on chrome](/videos/ssl-warning.gif)

## 我的本地网站一片漆黑

如果发生这种情况，通常是在 engine code 或您的 code 中出现了异常。打开 dev tools（在 Chrome 中按 <kbd>Ctrl + Shift + I</kbd> 或 <kbd>F12</kbd>）并检查 Console 中的错误。
在某些情况下，特别是当您刚刚更新了 Needle Engine package 版本时，可以通过停止并重新启动本地 dev server 来解决。
为此，请点击 Editor 右下角运行中的进度条，然后点击小 <kbd>X</kbd> 取消正在运行的任务。然后，只需再次按下 Play。

## 我的物体导出后变成白色
这通常在使用 custom shaders 或 materials 时发生，并且它们的属性无法干净地转换为 glTF export 已知的属性名称。
您可以确保使用 glTF-compatible materials 和 shaders，或者将 shaders 标记为“custom”以直接导出它们。
- 阅读更多关于推荐的 glTF workflows：<link>
- 阅读更多关于 custom shaders：<link>

## Uncaught ReferenceError: NEEDLE_ENGINE_META is not defined / NEEDLE_USE_RAPIER is not defined

如果您正在使用 vite 或 next.js，请确保将 Needle Engine plugins 添加到您的 config 中。
vite 示例：
```js
const { needlePlugins } = await import('@needle-tools/engine/plugins/vite/index.js');
plugins: [needlePlugins(command, needleConfig)]
```
next.js 示例：
```js
const { needleNext } = await import("@needle-tools/engine/plugins/next/index.js");
return needleNext({}, { modules: { webpack } });
```
您也可以在例如您的根目录 `index.html` 中，通过 script 标签声明缺失的变量，如下所示：
```html
<script>
  var NEEDLE_ENGINE_META = {}
  var NEEDLE_USE_RAPIER = true;
</script>
```

## THREE.EXRLoader: provided file doesnt appear to be in OpenEXR format

请确保您已将 Lightmap Encoding 设置为 **Normal Quality**。
前往 *Edit/Project Settings/Player* 更改设置。

![](/faq/lightmap_encoding.jpg)

## 我的网站变得太大 / 加载缓慢 (MB 数过多)

这可能有很多原因，但一些常见的原因是：
- textures 过多或 textures 过大
- meshes 的 vertices 过多
- meshes 具有您实际不需要的 vertex attributes（例如，有 normals 和 tangents 但您未使用它们）
- objects 被禁用但未被忽略 - 禁用的 objects 也会被导出，以防您想在 runtime 启用它们！将其 Tag 设置为 `EditorOnly` 以完全忽略导出。
- 您的场景中有多个 ``GltfObject`` components，并且它们都启用了 ``EmbedSkybox``（您需要为导出的每个场景只包含一个 skybox）

如果加载时间本身是一个问题，您可以**尝试将您的内容分割成多个 glb 文件**并按需加载它们（这就是我们在网站上所做的）。为了实现这一点，您可以将内容放入 Prefabs 或 Scenes 中，并从您的任何脚本中引用它们。请查看[文档中的 Scripting/Addressables](./scripting.md#assetreference-and-addressables)。

## 我的 UI 没有渲染 Text

- 对于 Unity：确保您使用的是 `UI/Legacy/Text` component 而**不是** `TextMeshPro - Text` component

## 我的脚本导出后不工作

- 您现有的 C# code 将*不会*按原样导出，您必须为其编写匹配的 typescript / javascript。
- Needle 使用 typescript / javascript 作为 components，并为其生成 C# stubs。
- 已有匹配 JS 的 Components 将在 Inspector 中显示。

## 我的 lightmaps 看起来不同 / 过亮

确保您遵循[lightmaps 最佳实践](https://docs.needle.tools/lightmaps?utm_source=needle_docs)并阅读[baked 和 non-baked objects 混合使用](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects)

## 我的场景太亮 / 照明看起来与 Unity 不同
确保您的 lights 设置为 "Baked" 或 "Realtime"。"Mixed" 目前不支持。

- 设置为 mixed 的 Lights (带 lightmapping) 在 three.js 中会对 objects 产生两次影响，因为目前没有办法从 lighting 中排除 lightmapped objects
- Skybox 在 ``Lighting/Environment`` 中的 ``Intensity Multiplier`` 因子目前不支持，在 Needle Engine 中没有效果
  ![image](https://user-images.githubusercontent.com/5083203/185429006-2a5cd6a1-8ea2-4a8e-87f8-33e3afd080ec.png)
- 由于 three.js 的限制，Light shadow intensity 目前无法更改。

另请参阅关于[baked 和 non-baked objects 混合使用](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects)的文档。

## 我的 skybox 分辨率低？如何更改我的 skybox 分辨率

- **如果您使用 custom cubemap**：您可以覆盖 skybox texture（分配给您的 cubemap）的 texture import settings

  ![image](https://user-images.githubusercontent.com/5083203/188179104-1e078cda-3397-4ebe-aaf9-7faa23ee4904.png)

- **如果您使用默认 skybox**：在您的场景中的任何位置添加一个 ``SkyboxExportSettings`` component 以覆盖默认分辨率

  ![image](https://user-images.githubusercontent.com/5083203/188171443-578380ab-2036-4d70-a8a7-f8cd9da9f603.png)

## 我的 Shadows 不可见或被截断

请检查以下几点：

- 您的 light 已启用 shadows（Soft Shadow 或 Hard Shadow）
- 您的 objects 设置为 "Cast Shadows: On"（参见 MeshRenderer component）
- 对于 directional lights，light 的位置目前很重要，因为 shadow camera 将放置在 light 在场景中的位置。

## 我的颜色看起来不对

确保您的项目设置为 Linear colorspace。

![image](https://user-images.githubusercontent.com/5083203/191774978-66e9feb1-0551-4549-85d3-3e5b8021f162.png)

## 我正在使用 networking 和 Glitch，当超过 30 人同时访问 Glitch 页面时它不工作

- 在 Glitch 上部署是一种快速 prototyping 的方式，甚至可能适用于一些小型 productions。那里的小 server 没有足够的 power 和 bandwidth 来在一个 persistent session 中 host 许多人。
- 我们正在研究其他的 networking 想法，但在此期间，您可以将网站 host 在其他地方（支持 node.js）或者简单地 remix 它以将 load 分布到多个 servers。您也可以将 [networking backend package](https://www.npmjs.com/package/@needle-tools/needle-tiny-networking-ws) 本身 host 在其他可以 scale 的地方，例如 Google Cloud。

## 我的网站没有 AR/VR 按钮

- 确保在您的根目录 ``GltfObject`` 内的某个地方添加 `WebXR` component。
- 可选地在您的根目录 ``GltfObject`` 或其子层级中添加 `AR Session Root` component，以指定 WebXR 的 placement、scale 和 orientation。
- 可选地添加 `XR Rig` component 来控制用户在 VR 中的起始位置。

## 我在 sub-scene 中创建了一个新脚本，但它不工作
在 sub-scenes 的 npmdefs 中创建新脚本（即从根导出场景中的脚本导出的参考场景）时，目前您必须重新导出根场景。这是因为负责注册新脚本的 code-gen 目前只对包含 ``ExportInfo`` component 的场景运行。这将在未来修复。

## 我的本地 server 没有启动 / 我看不到网站

最可能的原因是安装不正确。
检查 console 和 ``ExportInfo`` component 是否有 errors 或 warnings。

如果这些 warnings/errors 没有帮助，请按顺序尝试以下步骤。给它们一些时间完成。一旦问题解决就停止。检查 console 是否有 warnings 或 errors。

- 确保您遵循了[先决条件](./getting-started/#prerequisites)。
- 通过选择您的 ``ExportInfo`` component 并点击 `Install` 来安装您的项目
- 通过选择您的 ``ExportInfo`` component，按住 Alt 并点击 `Clean Install` 来运行干净安装
- 尝试在命令行工具中打开您的 web project 目录并按照以下步骤操作：
  - 运行 ``npm install``，然后运行 ``npm run dev-host``
  - 确保本地 runtime package (``node_modules/@needle-tools/engine``) 和 three.js (``node_modules/three``) 都已安装。
  - 您也可以在这些目录中运行 ``npm install``。

## C# component 生成是否也适用于纯 javascript？
虽然从技术上讲，C# components 生成也可以与 vanilla javascript 一起运行，但我们不推荐并且不完全支持它，因为生成器更像是猜测或者根本无法知道要为您的 javascript class 创建哪种 C# type。如果您真的想这样做，下面是一个如何从 javascript 生成 Unity Component 的最小示例。

```js
import { Behaviour } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    //@type float
    myField = 5;
}
```

## 我的 components/inspector 中没有像“Generate Project”这样的按钮

请检查您是否不小心处于 Inspector 的 ``Debug`` mode – 切换回 ``Normal``：
![20220824-025011-S2GQ-Unity_lKlT-needle](https://user-images.githubusercontent.com/2693840/186291615-56e7ebdb-1221-4326-813d-f88526fa126c.png)

## Toktx 找不到 / toktx 未安装

- 确保[下载并安装 toktx](http://localhost:8080/docs/getting-started/.html#install-these-tools-for-production-builds)

- 在 Windows 上：确保您已将 toktx 添加到您的 system environment variables 中。添加后您可能需要重启电脑以刷新 environment variables。默认安装位置是 ``C:\Program Files\KTX-Software\bin``

![image](/imgs/ktx-env-variable.webp)

## 安装 web project 花费了很长时间 / 从未完成 / EONET: no such file or directory
- **请确保不要在格式化为 exFAT 的 drive 上创建项目**，因为 exFAT 不支持 symlinks，而 Needle Engine for Unity 在版本 3.x 之前需要 symlinks。
  您可以使用以下步骤检查您的 drives 的格式化情况：
  1. 打开“System Information”（按 windows key 并输入或在 cmd 中输入 "msinfo32"）
  2. 选择 Components > Storage > Drives
  3. 在屏幕右侧全选 (<kbd>Ctrl + A</kbd>) 并复制 (<kbd>Ctrl + C</kbd>) 然后粘贴到此处 (<kbd>Ctrl + V</kbd>)

## NPM install 失败并且出现关于 hard drive / IO 的错误
确保您的项目位于已知可以与 node.js 兼容的 disk 上。失败的主要原因是 disk 不支持 symlinks (symbolic links / softlinks)，这是 node.js 正常运行的要求。
<kbd>NTFS</kbd> 格式化通常都有效。已知有问题的 file system 格式化是 <kbd>exFAT</kbd> 和 <kbd>FAT32</kbd>。

要检查您的 drives 的格式，您可以：
1. 打开“System Information”（按 <kbd>Windows key</kbd> 并输入“System Information”或在 cmd <kbd>Windows + R</kbd> 中输入 `msinfo32`）
2. 选择“Components > Storage > Drives”
3. 在那里，您可以看到所有 drives 及其格式化列表。将您的项目放在 NTFS 格式化的 drive 上。

## 我收到了诸如 "Unexpected token `@`. Expected identifier, string literal, numeric literal or ..." 的错误

Needle Engine 使用 typescript decorators 进行 serialization。
要解决此错误，请确保在您的 tsconfig.json 中启用 ``experimentalDecorators``

## 在 Mac OS 上运行 npm 命令时收到“failed to load config ... vite.config.js”错误

您可能在 (ARM) Apple Silicon 处理器上使用了 x86_64 版本的 Unity。Unity 2020.3 仅提供 x86_64 版本，更高版本也提供了 Apple Silicon 版本。
因此，我们的 Unity 集成调用 npm 将会从 x86_64 进程中进行，导致使用 x86_64 版本的 node 和 vite/esbuild。当您随后尝试从 Apple Silicon 应用（例如 VS Code）在同一项目中运行 npm 命令时，npm 将会抱怨架构不匹配，并显示一条长错误消息。

要解决此问题，请使用 Apple Silicon 版本的 Unity (2021.1 或更高版本)。

您也可以在 2020.3 上暂时解决此问题，方法是删除 ``node_modules`` 文件夹，然后从 VS Code 再次运行 ``npm install``。当您切换回 Unity 时，您需要再次删除 ``node_modules``。

## 循环引用错误 (Circular reference error)

当您有一个例如 ``SceneSwitcher`` (或任何其他加载场景或 asset 的 component) 并且 Unity 中引用的 Asset 包含一个与您原始场景中带有 ``SceneSwitcher`` 的名称相同的 ``GltfObject`` 时，可能会发生这种情况。如果在 Unity 中收到类似以下的错误，您可以仔细检查：

```
Failed to export ↑ YourSceneName.glb
you seem to have objects with the same name referencing each other.
```

要解决此问题，您可以：
- 删除引用的 Prefab 或 Scene 中的 ``GltfObject``
- 重命名包含加载引用场景的 component 的 GameObject

如果这不能解决问题，请在[我们的论坛](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)中提问。

## 我的场景没有加载，并且控制台包含一个关于“circular references”或“failed to update active state”的警告
请参阅[循环引用错误](#circular-reference-error)部分。

## 我的机器是否支持 WebGL 2？

使用[这样的检测器](https://get.webgl.org/webgl2/)来确定您的设备是否支持 WebGL 2，它还会提示可能导致您问题的原因，但通常请确保您已更新浏览器和 drivers。不支持 WebGL 1。

#### 已知会导致问题的设备：
- Lenovo Thinkpad - T495

## 我想将 Needle AI 与我的本地 AI 模型一起使用

如果您想（或必须）在本地运行您的 AI，您可以使用 Needle llms.txt 文件作为您的本地 AI (例如 Ollama) 的 context：

- [llms.txt](https://cloud.needle.tools/llms.txt)
- [llms-full.txt](https://cloud.needle.tools/llms-full.txt)

## 还有问题？
[在我们的论坛提问](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)

<a href="https://discord.needle.tools" target="_blank"><img height=20 src="https://img.shields.io/discord/717429793926283276?color=5562ea&label=Discord" /></a>

---

页面由 AI 自动翻译