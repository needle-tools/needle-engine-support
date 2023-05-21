---
title: Needle Config
---

The `needle.config.json` is used to provide configuration for the Needle Editor integrations and for the Needle Engine build pipeline plugins.

| | |
| --- | --- | 
| **Paths** | |
| `buildDirectory` | This is where the built project files are being copied to |
| `assetsDirectory` | This is where the Editor integration assets will be copied to or created at (e.g. the glb files exported from Unity or Blender) |
| `scriptsDirectory` | This is the directory the Editor integration is watching for code changes to re-generate components |
| `codegenDirectory` | This is where the Editor integration is outputting generated files to. |
| `baseUrl` | Required for e.g. next.js integration only.
| **Tools** | |
| `build : { copy: [] }` | Array of string paths for copying additional files or folders to the `buildDirectory` |


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

#### Related Links
- [Project Structure](../project_structure.md)
