---
title: 常见问题 (FAQ) 💡
---

## 如何激活我的 Needle Engine 许可？

### 在 Unity 中激活许可

#### Needle Engine 4.x

转到 Project Settings/Needle 并点击登录按钮。按照步骤登录到您的 Needle account。
之后，您将在 Unity project settings window 中看到您的账户信息。从 dropdown 中选择已授权的团队。

#### Needle Engine 3.x

打开 `Edit/Project Settings/Needle` 以获取 Needle Engine plugin settings。在窗口顶部，您会找到输入许可信息的字段。
- `Email` - 输入您购买许可时使用的电子邮件
- `Invoice ID` - 输入您通过电子邮件收到的一个 invoice id

注意：您可能需要重新启动本地 webserver 以应用许可。

![unity license window](/imgs/unity-needle-engine-license.jpg)

### 在 Blender 中激活许可
打开 `Addon Preferences/Needle Engine` 以获取 Needle Engine addon settings
- `Email` - 输入您购买许可时使用的电子邮件
- `Invoice ID` - 输入您通过电子邮件收到的一个 invoice id

注意：您可能需要重新启动本地 webserver 以应用许可。

## 我的本地网站显示 SSL 错误，例如“您的连接不是私密的”

根据您的本地配置，您可能会在浏览器中看到关于 SSL Security 的警告。

这是因为尽管连接已加密，但默认情况下没有浏览器可以验证的 SSL certificate。
如果发生这种情况：点击 `Advanced` 和 `Proceed to Site`。在 Safari 中，您可能需要在之后刷新页面，因为它不会自动继续。现在您应该可以在浏览器中看到您的场景了！

对于同一个本地 server，该对话框应该只显示一次

::: tip
连接是安全的，因为我们强制使用 HTTPS 以确保 WebXR 和其他现代 web APIs 可以即时工作。一些浏览器仍然会抱怨 SSL connection（在您的本地 development server 和本地 website 之间）无法自动信任，并且您需要手动验证您信任该页面。根据浏览器和系统设置，Automatic Page Reload 和 Websocket connections 也可能会受到影响。

有关如何设置 self-signed certificate 以获得更流畅 development experience 的信息，请参阅[测试文档](./testing.md)。
:::

![SLL warning on chrome](/videos/ssl-warning.gif)

## 我的本地网站一片漆黑

如果发生这种情况，通常是在 engine code 或您的 code 中出现了异常。打开 dev tools（在 Chrome 中按 <kbd>Ctrl + Shift + I</kbd> 或 <kbd>F12</kbd>）并检查 Console 中的错误。
在某些情况下，特别是当您刚刚更新了 Needle Engine package version 时，可以通过停止并重新启动本地 dev server 来解决。
为此，请点击 Editor 右下角运行中的进度条，然后点击小 <kbd>X</kbd> 取消正在运行的 task。然后，只需再次按下 Play。

## 我的物体导出后变成白色
这通常在使用 custom shaders 或 materials 时发生，并且它们的 property names 无法干净地转换为 glTF export 已知的 property names。
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
您也可以在例如您的根目录 `index.html` 中，通过 script tag 声明缺失的 variables，如下所示：
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
- objects 被禁用但未被忽略 - 禁用的 objects 也会被导出，以防您想在 runtime 启用它们！将其 Tag 设置为 `EditorOnly` 以完全忽略 export。
- 您的 scene 中有多个 ``GltfObject`` components，并且它们都启用了 ``EmbedSkybox``（您需要为导出的每个 scene 只包含一个 skybox）

如果 loading time 本身是一个问题，您可以**尝试将您的 content 分割成多个 glb files** 并按需加载它们（这就是我们在 website 上所做的）。为了实现这一点，您可以将 content 放入 Prefabs 或 Scenes 中，并从您的任何 scripts 中引用它们。请查看[documentation 中的 Scripting/Addressables](./scripting.md#assetreference-and-addressables)。

## 我的 UI 没有渲染 Text

- 对于 Unity：确保您使用的是 `UI/Legacy/Text` component 而**不是** `TextMeshPro - Text` component

## 我的脚本导出后不工作

- 您现有的 C# code 将*不会*按原样 export，您必须为其编写匹配的 typescript / javascript。
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

- **如果您使用默认 skybox**：在您的 scene 中的任何位置添加一个 ``SkyboxExportSettings`` component 以覆盖默认分辨率

  ![image](https://user-images.githubusercontent.com/5083203/188171443-578380ab-2036-4d70-a8a7-f8cd9da9f603.png)

## 我的 Shadows 不可见或被截断

请检查以下几点：

- 您的 light 已启用 shadows（Soft Shadow 或 Hard Shadow）
- 您的 objects 设置为 "Cast Shadows: On"（参见 MeshRenderer component）
- 对于 directional lights，light 的位置目前很重要，因为 shadow camera 将放置在 light 在 scene 中的位置。

## 我的颜色看起来不对

确保您的项目设置为 Linear colorspace。

![image](https://user-images.githubusercontent.com/5083203/191774978-66e9feb1-0551-4549-85d3-3e5b8021f162.png)

## 我正在使用 networking 和 Glitch，当超过 30 人同时访问 Glitch 页面时它不工作

- 在 Glitch 上部署是一种快速 prototyping 的方式，甚至可能适用于一些小型 productions。那里的小 server 没有足够的 power 和 bandwidth 来在一个 persistent session 中 host 许多人。
- 我们正在研究其他的 networking 想法，但在此期间，您可以将 website host 在其他地方（支持 node.js）或者简单地 remix 它以将 load 分布到多个 servers。您也可以将 [networking backend package](https://www.npmjs.com/package/@needle-tools/needle-tiny-networking-ws) 本身 host 在其他可以 scale 的地方，例如 Google Cloud。

## 我的网站没有 AR/VR 按钮

- 确保在您的根目录 ``GltfObject`` 内的某个地方添加 `WebXR` component。
- 可选地在您的根目录 ``GltfObject`` 或其 child hierarchy 中添加 `AR Session Root` component，以指定 WebXR 的 placement、scale 和 orientation。
- 可选地添加 `XR Rig` component 来控制 users 在 VR 中的起始位置。

## 我在 sub-scene 中创建了一个新脚本，但它不工作
在 sub-scenes 的 npmdefs 中创建新 script（即从根 export scene 中的 script export 的参考 scene）时，目前您必须重新 export 根 scene。这是因为负责 registering new scripts 的 code-gen 目前只对包含 ``ExportInfo`` component 的 scenes 运行。这将在 future 修复。

## 我的本地 server 没有启动 / 我看不到网站

最可能的原因是 installation 不正确。
检查 console 和 ``ExportInfo`` component 是否有 errors 或 warnings。

如果这些 warnings/errors 没有帮助，请按顺序尝试以下步骤。给它们一些时间完成。一旦问题解决就停止。检查 console 是否有 warnings 或 errors。

- 确保您遵循了[Prerequisites](./getting-started/#prerequisites)。
- 通过选择您的 ``ExportInfo`` component 并点击 `Install` 来安装您的项目
- 通过选择您的 ``ExportInfo`` component，按住 Alt 并点击 `Clean Install` 来运行干净 installation
- 尝试在 command line tool 中打开您的 web project directory 并按照以下步骤操作：
  - 运行 ``npm install``，然后运行 ``npm run dev-host``
  - 确保本地 runtime package (``node_modules/@needle-tools/engine``) 和 three.js (``node_modules/three``) 都已 install。
  - 您也可以在这些 directories 中运行 ``npm install``。

## C# component 生成是否也适用于纯 javascript？
虽然从技术上讲，C# components generation 也可以与 vanilla javascript 一起运行，但我们不推荐并且不完全支持它，因为 generator 更像是猜测或者根本无法知道要为您的 javascript class 创建哪种 C# type。如果您真的想这样做，下面是一个如何从 javascript 生成 Unity Component 的最小示例。

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

- Make sure to [download and install toktx](http://localhost:8080/docs/getting-started/.html#install-these-tools-for-production-builds)

- On Windows: Make sure you have added toktx to your system environment variables. You may need to restart your computer after adding it to refresh the environment variables. The default install location is ``C:\Program Files\KTX-Software\bin``

![image](/imgs/ktx-env-variable.webp)

## 安装 web project 花费了很长时间 / 从未完成 / EONET: no such file or directory
- **Make sure to not create a project on a drive formatted as exFAT** because exFAT does not support symlinks, which is required for Needle Engine for Unity prior to version 3.x. You can check the formatting of your drives using the following steps:
  1. Open "System Information" (either windows key and type that or enter "msinfo32" in cmd)
  2. Select Components > Storage > Drives
  3. Select all (<kbd>Ctrl + A</kbd>) on the right side of the screen and copy that (<kbd>Ctrl + C</kbd>) and paste here (<kbd>Ctrl + V</kbd>)

## NPM install 失败并且出现关于 hard drive / IO 的错误
Make sure your project is on a disk that is known to work with node.js. Main reason for failures is that the disk doesn't support symlinks (symbolic links / softlinks), which is a requirement for proper functioning of node.js.
<kbd>NTFS</kbd> formatting should always work. Known problematic file system formattings are <kbd>exFAT</kbd> and <kbd>FAT32</kbd>.

To check the format of your drives, you can:
1. Open "System Information" (either <kbd>Windows key</kbd> and type "System Information" or enter `msinfo32` in cmd <kbd>Windows + R</kbd>)
2. Select "Components > Storage > Drives"
3. There, you can see all drives and their formatting listed. Put your projects on a drive that is NTFS formatted.

## 我收到了诸如 "Unexpected token `@`. Expected identifier, string literal, numeric literal or ..." 的错误

Needle Engine 使用 typescript decorators 进行 serialization。
要解决此错误，请确保在您的 tsconfig.json 中启用 ``experimentalDecorators``

## 在 Mac OS 上运行 npm 命令时收到“failed to load config ... vite.config.js”错误

You're likely using an x86_64 version of Unity on an (ARM) Apple Silicon processor. Unity 2020.3 is only available for x86_64, later versions also have Apple Silicon versions.
Our Unity integration calling npm will thus do so from an x86_64 process, resulting in the x86_64 version of node and vite/esbuild being used. When you afterwards try to run npm commands in the same project from an Apple Silicon app (e.g. VS Code), npm will complain about mismatching architectures with a long error message.

To fix this, use an Apple Silicon version of Unity (2021.1 or later).

You can also temporarily fix it on 2020.3 by deleting the ``node_modules`` folder and running ``npm install`` again from VS Code. You'll have to delete ``node_modules`` again when you switch back to Unity.

## 循环引用错误 (Circular reference error)

This can happen when you have e.g. a ``SceneSwitcher`` (or any other component that loads a scene or asset) and the referenced Asset in Unity contains a ``GltfObject`` that has the same name as your original scene with the ``SceneSwitcher``. You can double check this in Unity if you get an error that says something like:

```
Failed to export ↑ YourSceneName.glb
you seem to have objects with the same name referencing each other.
```

To fix this you can:
- Remove the ``GltfObject`` in the referenced Prefab or Scene
- Rename the GameObject with the component that loads the referenced scenes

If this doesn't fix the problem please ask [in our forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content).

## 我的场景没有加载，并且控制台包含一个关于“circular references”或“failed to update active state”的警告
请参阅[circular reference error](#circular-reference-error)部分。

## 我的机器是否支持 WebGL 2？

Use a [detector like this one](https://get.webgl.org/webgl2/) to determine if your device supports WebGL 2, it also hints at what could be the cause of your problem, but generally make sure you have updated your browser and drivers. WebGL 1 is not supported.

#### 已知会导致问题的设备：
- Lenovo Thinkpad - T495

## 我想将 Needle AI 与我的本地 AI 模型一起使用

If you want (or have to) run your AI locally you can use the Needle llms.txt files as context for your local AI (e.g. Ollama):

- [llms.txt](https://cloud.needle.tools/llms.txt)
- [llms-full.txt](https://cloud.needle.tools/llms-full.txt)

## 还有问题？
[在我们的论坛提问](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)

<a href="https://discord.needle.tools" target="_blank"><img height=20 src="https://img.shields.io/discord/717429793926283276?color=5562ea&label=Discord" /></a>

---

页面由 AI 自动翻译