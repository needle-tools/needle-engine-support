---
title: Needle Config
---

The `needle.config.json` is used to provide configuration for the Needle Editor integrations and for the Needle Engine build pipeline plugins.

| | |
| --- | --- | 
| **Paths** | |
| `buildDirectory` | This is where the built project files are being copied to |
| `assetsDirectory` | This is where the Editor integration assets will be copied to or created at (e.g. the `.glb` files exported from Unity or Blender) |
| `scriptsDirectory` | This is the directory the Editor integration is watching for code changes to re-generate components |
| `codegenDirectory` | This is where the Editor integration is outputting generated files to. |
| `baseUrl` | Required for e.g. next.js or SvelteKit integration. When baseUrl is set, relative paths for codegen and inside files are using baseUrl, not assetsDirectory. This is useful in cases where the assetDirectory does not match the server url.<br/>For example, the path on disk could be `"assetsDirectory": "public/assets"`, but the framework serves files from `"baseUrl": "assets"`. |
| **Tools** | |
| `build : { copy: ["myFileOrDirectory"] }` | Array of string paths for copying additional files or folders to the `buildDirectory`. These can either be absolute or relative. |


#### Basic Example 
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### Copy Example
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

#### Example with different baseUrl (e.g. SvelteKit, Next.js)
Files are exported to `static/assets` but the framework serves them from `/assets`. In this case, the `baseUrl` needs to be set to `assets` so that relative paths in files are correct.

```json
{
  "baseUrl": "assets",
  "buildDirectory": "dist",
  "assetsDirectory": "static/assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### Related Links
- [Project Structure](../project-structure.md)
