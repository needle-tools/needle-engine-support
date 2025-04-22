---
title: needle.config.json
---

`needle.config.json` 文件用于为 Needle Editor 集成和 Needle Engine 构建管道插件提供配置。

| | |
| --- | --- | 
| **路径** | |
| `buildDirectory` | 这是构建的项目文件被复制到的位置 |
| `assetsDirectory` | 这是 Editor 集成资源将被复制到或创建的位置（例如从 Unity 或 Blender 导出的 `.glb` 文件） |
| `scriptsDirectory` | 这是 Editor 集成监视代码更改以重新生成组件的目录 |
| `codegenDirectory` | 这是 Editor 集成输出生成文件的位置。 |
| `baseUrl` | 例如对于 next.js 或 SvelteKit 集成是必需的。设置 baseUrl 后，代码生成和文件内部的相对路径将使用 baseUrl，而不是 assetsDirectory。当 assetDirectory 与服务器 URL 不匹配时，这很有用。<br/>例如，磁盘上的路径可能是 `"assetsDirectory": "public/assets"`，但框架从 `"baseUrl": "assets"` 提供文件。 |
| **工具** | |
| `build : { copy: ["myFileOrDirectory"] }` | 用于将附加文件或文件夹复制到 `buildDirectory` 的字符串路径数组。这些可以是绝对路径或相对路径。 |


#### 基本示例 
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### 复制示例
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated",
  "build": {
    "copy": [
      "cards"
    ]
  }
}
```

#### 使用不同 baseUrl 的示例（例如 SvelteKit、Next.js）
文件导出到 `static/assets`，但框架从 `/assets` 提供它们。在这种情况下，需要将 `baseUrl` 设置为 `assets`，以便文件中的相对路径正确。

```json
{
  "baseUrl": "assets",
  "buildDirectory": "dist",
  "assetsDirectory": "static/assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### 相关链接
- [项目结构](../project-structure.md)

页面由 AI 自动翻译
