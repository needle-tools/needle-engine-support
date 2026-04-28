---
title: needle.config.json
---

The `needle.config.json` is used to provide configuration for the Needle Editor integrations and for the Needle Engine build pipeline plugins.

| | |
| --- | --- | 
| **Paths** | |
| `buildDirectory` | This is where the built project files are being copied to |
| `assetsDirectory` | This is where the Editor integration assets will be copied to or created at (e.g. the `.glb` files exported from Unity or Blender) |
| `scriptsDirectory` | This is the directory the Editor integration is watching for code changes to re-generate components |
| `codegenDirectory` | This is where the Editor integration is outputting generated files to. |
| `baseUrl` | Sets the server URL path where assets are served from, replacing the `assetsDirectory` in generated URLs. Only needed when the filesystem path doesn't match the server URL (e.g. Next.js, SvelteKit).<br/>For example, the path on disk could be `"assetsDirectory": "public/assets"`, but the framework serves files from `"baseUrl": "assets"`.<br/>**Note:** For standard Vite projects, you don't need to set `baseUrl` manually. The `base` option from `vite.config.js` is automatically detected and combined with `assetsDirectory`. `baseUrl` is *not* the same as Vite's `base` — it's the full path to the assets folder on the server, not a URL prefix. |
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

#### Vite base path (subfolder / SPA deployment)
When your `vite.config.js` sets a `base` option (e.g. `base: "/app/"`), the Needle Engine Editor integration automatically detects it and generates correct absolute asset URLs. No `baseUrl` in `needle.config.json` is needed:

```js
// vite.config.js
export default defineConfig({
  base: "/app/",
  // ...
});
```
```json
// needle.config.json — no baseUrl needed
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```
This produces asset URLs like `/app/assets/scene.glb`.

#### Example with different baseUrl (e.g. SvelteKit, Next.js)
For frameworks where the filesystem path doesn't match the server URL, set `baseUrl` explicitly. Files are exported to `static/assets` but the framework serves them from `/assets`. In this case, the `baseUrl` needs to be set to `assets` so that relative paths in files are correct.

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
