---
title: 如何调试
---

## 处理 glTF 的实用资源

在线检查 glTF 或 glb 文件：
- [gltf.report](https://gltf.report/) - 基于 three.js
- [modelviewer.dev/editor](https://modelviewer.dev/editor) - 基于 three.js
- [Khronos glTF Sample Viewer](https://github.khronos.org/glTF-Sample-Viewer-Release/)
- [Babylon Sandbox](https://sandbox.babylonjs.com/)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)

在本地检查它们：
- 使用 [glTF Shell Extension for Windows](https://apps.microsoft.com/store/detail/gltf-shell-extensions/9NPGVJ9N57MV?hl=en-us&gl=US) 在 glTF 和 glb 之间转换
- 使用 [glTF Tools VS Code Extension](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode) 在本地查看验证错误和引擎内预览

## 内置 URL 参数

调试标志可以作为 URL query parameters 附加。
使用 ``?help`` 获取所有可用参数列表。

以下是一些最常用的参数：

- ``help`` 在控制台打印所有可用的 url parameter
- ``console`` 打开一个屏幕上的开发控制台，对移动调试很有用
- ``printGltf`` 将加载的 gltf 文件记录到控制台
- ``stats`` 每隔几秒显示 FPS module 并记录 threejs renderer stats
- ``showcolliders`` 可视化 physics colliders
- ``gizmos`` 启用 gizmo 渲染（例如，使用 BoxCollider 或 AxesHelper 组件时）
- 还有更多：请使用 ``help`` 查看全部

## 调试方法

Needle Engine 还有一些非常强大和有用的调试方法，它们是静态 `Gizmos` 类的一部分。更多信息请参阅[脚本文档](./scripting.md#gizmos)。

## 本地测试 release 构建

- 首先，安装 http-server: `npm install -g http-server`
- 进行构建（development 或 production）
- 使用命令行工具打开 *dist* 目录
- 运行 `http-server -g` | *`-g` 启用 gzip 支持*
- 可选：如果您想测试 WebXR，生成一个[自签名 SSL 证书](https://stackoverflow.com/a/35231213)，然后运行 `http-server -g -S` 以启用 https (WebXR 需要)。

## VSCode

您可以将 VSCode 附加到正在运行的本地服务器以设置 breakpoints 并调试您的代码。您可以在此处阅读更多关于[使用 VSCode 进行调试](https://code.visualstudio.com/docs/editor/debugging)的信息。

在您的 web 项目中的 `.vscode/launch.json` 创建一个 launch.json 文件，内容如下：
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Attach Chrome",
            "url": "https://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

如果您更改了服务器启动的 port，请务必相应更新 `url` 字段。
然后，您可以从 VSCode 内部启动本地服务器：

![](/debugging/vscode-start-debugging.webp)

## 移动端

### Android 调试

对于 **Android** 调试，您可以将 Chrome Dev Tools 附加到您的设备，并直接从 PC 查看 logs。您必须将设备切换到开发模式并通过 USB 连接。

请参阅官方 chrome 文档[此处](https://developer.chrome.com/docs/devtools/remote-debugging/)
- 确保您的手机上已启用 [Developer Mode](https://developer.android.com/studio/debug/dev-options)
- 通过 USB 将手机连接到电脑
- 在浏览器中打开此 url ``chrome://inspect/#devices``
- 在您的移动设备上允许 USB 连接到您的电脑
- 在您的电脑上，一段时间后 chrome 中应该会看到打开的标签页列表（在 ``chrome://inspect/#devices``）
- 点击您想要调试的标签页上的 ``Inspect``

### iOS 调试

对于简单的 iOS 调试，添加 ``?console`` URL 参数以获取有用的屏幕 JavaScript console。

如果您有 Mac，您也可以附加到 Safari（类似于上面的 Android 流程）。

在 iOS 上使用和调试 WebXR 需要使用第三方浏览器：[Mozilla WebXR Viewer](https://labs.mozilla.org/projects/webxr-viewer/)。

### Quest 调试

Quest 只是一个 Android 设备 - 请参阅[Android 调试](#android-debugging)部分了解步骤。

---
页面由 AI 自动翻译