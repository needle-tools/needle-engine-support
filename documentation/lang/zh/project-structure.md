---
title: Web 项目结构
---

# Needle Engine 项目结构

### Web 项目文件

| | |
| --- | --- |
| **Needle Engine** | |
| [`needle.config.json`](./reference/needle-config-json.md) | Needle Engine 构建和集成的配置 |
| **生态系统** | |
| `package.json` | 包含名称、版本、依赖项和脚本的项目配置 |
| `tsconfig.json` | Typescript 编译器配置 |
| `.gitignore` | 在 git 中忽略的文件和文件夹 |
| `vite.config.js` | 包含 vite 特定的配置。<br/>它也添加了 Needle Engine vite 插件。 |


### 默认的 Vite 项目结构

我们的主要项目模板使用超快的 [vite](https://vitejs.dev/) 打包器。以下显示了我们创建和交付的 Vite 模板结构（尽管可以根据您的需要进行调整）。

| | |
| --- | |
| **文件夹** | |
| `assets/` | 资产文件夹包含从 Unity 导出的资产。例如，生成的 ``gltf`` 文件、音频或视频文件。不建议手动添加文件到 ``assets``，因为在构建项目分发版本时会清除该文件夹。 |
| `include/` | （可选）- 如果您有需要引用/加载的自定义资产，请将它们添加到 include 目录。构建时，此目录将被复制到输出文件夹。 |
| `src/generated/` | 生成的 javascript 代码。请勿手动编辑！ |
| `src/scripts/` | 您的项目特定脚本/组件 |
| `src/styles/` | 样式表 |
| `*` | 您可以随意在此处添加任何新文件夹。请确保在构建时将它们 [复制](./reference/needle-config-json.md) 到输出目录 |
| **文件** | |
| `index.html` | 您网站的着陆页或主页 |
| `vite.config` | [vite 配置](https://vitejs.dev/config/)。在此处进行构建分发和托管开发服务器的设置。通常不需要编辑这些设置。 |
| `src/main.ts` | 从 `index.html` 包含并导入 `needle-engine` |
| `*` | 您可以随意在此处添加任何新文件。请确保在构建时将它们 [复制](./reference/needle-config-json.md) 到输出目录（除非它们仅在开发期间使用） |

我们的导出器也可以与其他项目结构一起使用，vite 只是我们首选的前端打包工具，因为它速度快。请随意按照您喜欢的方式设置您的 JavaScript 项目。

[在文档中了解更多关于打包以及与其他框架的使用](html.md)

---

#### 继续阅读

- [面向 Unity 开发者的 Typescript 指南](./getting-started/for-unity-developers.md)
- [Typescript 要点](./getting-started/typescript-essentials.md)
- [编写自定义脚本](./scripting.md)
- [Everywhere Actions](./everywhere-actions.md)

***
页面由 AI 自动翻译