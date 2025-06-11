---
title: 在本地设备上测试
---

## 在本地设备上测试

使用我们的模板时，Needle Engine 会为您运行一个本地开发服务器。只需按下播放，您的默认浏览器中就会打开一个网站，即可在您的本地设备上进行测试。要在同一网络中的其他设备上进行测试，您可能需要安装一个自签名证书（见下文）。

使用自定义设置 / 框架时，请参阅您的框架文档，了解如何运行安全的本地开发服务器。

::: tip
我们的本地服务器使用您本地网络中的IP地址（例如 `https://192.168.0.123:3000`），而不是 `localhost:3000`。这使您可以从移动设备、VR眼镜和同一网络中的其他机器上快速查看和测试您的项目。

我们使用HTTPS而不是旧的HTTP，因为现代强大的Web API（如WebXR）需要安全连接——S代表“安全”。
:::

## 设置用于开发的自签名证书

不同的操作系统对本地开发有不同的安全要求。通常，即使使用自动生成的不可信证书，显示网站也能正常工作，但浏览器可能会警告缺少信任，并且某些功能可能无法使用。以下是摘要：

::: tip
建议在您的开发设备上安装受信任的自签名证书，以获得流畅的开发体验。请在本页底部查找步骤。
:::

**默认 – 使用自动生成的不可信证书**
_在浏览器中打开项目时显示证书警告。_
_使用 [vite-plugin-basic-ssl](https://github.com/vitejs/vite-plugin-basic-ssl) npm包。_

我们使用WebSocket连接在浏览器和本地开发服务器之间进行通信。WebSocket需要安全连接（HTTPS）才能工作。根据平台，您可能需要为本地开发设置自定义证书。Android和Windows不需要自定义证书，但iOS和MacOS需要。

| 操作系统 | 在浏览器中查看<br/>（有安全警告） | 自动重新加载 |
| --- | --- | --- |
| Windows | (✓) | ✓ |
| Linux | (✓) | ✓ |
| Android | (✓) | ✓ |
| macOS | (✓) | ❌ |
| iOS | (✓ Safari 和 Chrome，页面重新加载后)<br/>❌ Mozilla XR Viewer | ❌ |
| Xcode Simulators | (✓ 页面重新加载后) | ❌ |

**使用自签名、受信任的根证书**
_不显示安全警告。您需要在您的设备上安装生成的证书。_
_使用 [vite-plugin-mkcert](https://github.com/liuweiGL/vite-plugin-mkcert) npm包。_

| 操作系统 | 在浏览器中查看 | 自动重新加载 |
| --- | --- | --- |
| Windows | ✓ | ✓ |
| Linux | ✓ | ✓ |
| Android | ✓ | ✓ |
| macOS | ✓ | ✓ |
| iOS | ✓ | ✓ |

### 生成自签名开发证书

- 在Unity/Blender中，点击“Open Workspace”以打开VS Code

- 检查您在 `vite.config.ts` 文件中是否使用 `vite-plugin-mkcert` 而不是 `vite-plugin-basic-ssl`（后者不会生成我们需要的受信任根证书）：
  - 打开 `package.json`
  - 从 `devDependencies` 中删除包含 `"@vitejs/plugin-basic-ssl"` 的行
  - 在VS Code中打开终端并运行 `npm install vite-plugin-mkcert --save-dev`，这将添加最新版本
  - 打开 `vite.config.ts` 并将 `import basicSsl from '@vitejs/plugin-basic-ssl'` 替换为 `import mkcert from'vite-plugin-mkcert'`
  - 在 `plugins: [` 中，将 `basicSsl(),` 替换为 `mkcert(),`
  - package.json 现在看起来像这样：
  ![](/testing/switch-to-mkcert.webp)
- 从VS Code的终端运行一次 `npm run start`
  - 在Windows上，这将打开一个新窗口，引导您创建和安装证书
  - 在MacOS上，终端会提示您输入密码，然后生成并安装证书。
  - 如果您收到错误 `Error: Port 3000 is already in use`，请关闭可能仍在Unity中运行的服务器。
- 生成的证书将自动安装在您生成它的机器上。
- 您可以再次停止终端进程。
- 从现在起，在Unity/Blender中按下播放将为本地服务器使用生成的证书，并且将不再显示“安全警告”，因为您的浏览器现在信任本地连接。

## 在您的开发设备上安装证书

在您的开发设备上，您需要_安装_生成的证书并允许操作系统_信任_它。这在不同的操作系统上是不同的。对于每个操作系统，您都需要生成的 `rootCA.pem` 文件，并将其发送到您要认证的设备。

**在Windows上：** 在 `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem` 中找到证书
**在MacOS上：** 在 `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem` 中找到证书

将文件发送给自己（例如通过E-Mail、AirDrop、iCloud、USB、Slack等），以便您可以在您的开发设备上访问它。

### 在Android上安装证书

1. 打开文件。系统将提示您安装证书。

### 在iOS / iPadOS / VisionOS上安装证书
1. 打开文件。
2. 系统将提示您将描述文件_添加_到您的设备。确认。
3. 转到“设置”。
4. 将有一个新的条目“描述文件”。选择它并允许该描述文件在此设备上处于_活动_状态。
5. 在iOS / iPadOS上，您还需要允许“Root Certificate Trust”。为此，请搜索 `Trust` 或前往 `设置 > 通用 > 关于 > 证书信任设置` 并为根证书启用完全信任。

::: tip
证书会自动安装在您生成它的机器上。对于本地网络中的其他机器，请按照以下步骤操作以建立受信任的连接。
:::

### 在另一台MacOS机器上安装证书
1. 打开文件。Keychain Access将打开，允许您安装证书。
2. 您可能需要将“信任”设置为“始终允许”。

### 在另一台Windows机器上安装证书
1. 通过键入 <kbd>Windows key</kbd> + `certmgr` 打开 `certmgr`（“管理用户证书”）。
2. 在左侧边栏中，选择“受信任的根证书颁发机构”。
3. 右键单击“证书”，然后选择“所有任务 > 导入”。
4. 选择 `rootCA.pem` 文件（您可能需要将文件类型更改为“所有文件”）并按照说明操作。


---
此页面由AI自动翻译