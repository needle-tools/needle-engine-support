---
title: Vite Plugin Configuration
description: Reference for Needle Engine's Vite plugin options including build pipeline, module aliases, makeFilesLocal, PWA, and more.
---

# Vite Plugin Configuration

The Needle Engine Vite plugin (`needlePlugins`) provides build-time features for optimizing, transforming, and bundling your project. Configure it via the options object passed to `needlePlugins()` in your `vite.config.js`.

```js
import { defineConfig } from 'vite';

export default defineConfig(async ({ command }) => {
    const { needlePlugins } = await import("@needle-tools/engine/vite");
    return {
        plugins: [
            needlePlugins(command, { /* options go here */ }),
        ],
    };
});
```

---

## Options Overview

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`buildPipeline`](#build-pipeline) | `object` | — | Configure compression and optimization for production builds |
| `noBuildPipeline` | `boolean` | `false` | Disable the Needle build pipeline entirely |
| [`makeFilesLocal`](#makefileslocal) | `boolean \| "auto" \| object` | — | Bundle external CDN assets locally for self-contained deployments |
| `pwa` | `object \| boolean` | — | PWA configuration. See [PWA Guide](/docs/how-to-guides/web-integration/pwa). |
| [`useRapier`](#defines) | `boolean` | `true` | Set to `false` to tree-shake the Rapier physics engine and reduce bundle size |
| [`noCopy`](#copy-files) | `boolean` | `false` | Disable automatic copying of files to the output directory |
| `noPoster` | `boolean` | `false` | Disable automatic poster image generation |
| `noBuildInfo` | `boolean` | `false` | Disable generating the `buildinfo.json` file |
| `noReload` | `boolean` | `false` | Disable the reload plugin |
| `allowHotReload` | `boolean` | `true` | Enable or disable hot reload for the Needle plugin |
| `openBrowser` | `boolean` | — | Automatically open a browser using a network IP address when the local server starts |
| [`debugAlias`](#aliases) | `boolean` | `false` | Log all module alias resolutions to a file for debugging import issues |
| `debug` | `boolean` | `false` | Enable verbose debug output for Needle plugins |

---

## Aliases

Needle Engine sets up [Vite aliases](https://vite.dev/config/shared-options.html#resolve-alias) to ensure consistent module resolution across your project and its dependencies.

**Key alias: `three/addons`**

Needle resolves `three/addons` to `three/examples/jsm`. This means you can write:

```ts
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
```

and it will resolve correctly regardless of which three.js version your dependencies expect.

Needle also ensures that all packages in your project resolve to the **same** three.js installation, preventing duplicate copies that can cause subtle bugs (e.g. `instanceof` checks failing across different three.js instances).

### Debugging alias resolution

If you're running into unexpected module resolution issues, enable alias debug logging:

```js
needlePlugins(command, {
    debugAlias: true,
});
```

This writes a detailed log of every import resolution to `node_modules/.needle/needle.alias.log`. The log shows which files are being imported and how they get resolved — useful for diagnosing cases where the wrong version of a package is picked up.

---

## Build Pipeline

The build pipeline compresses and optimizes your glTF/GLB assets during production builds. It runs automatically when you build with the `--production` flag:

```bash
npx vite build -- --production
```

Without `--production`, the pipeline is skipped (useful for quick test builds).

### Cloud vs local compression

The pipeline supports two modes:

- **Cloud compression** (default when a token is provided) — sends assets to Needle Cloud for optimized processing. Set your access token via `process.env.NEEDLE_CLOUD_TOKEN` or in the config.
- **Local compression** — runs the build pipeline locally on your machine.

### Configuration

```js
needlePlugins(command, {
    buildPipeline: {
        enabled: true,
        accessToken: process.env.NEEDLE_CLOUD_TOKEN, // optional, auto-read from env
        projectName: "my-project",                   // cloud project name
        version: "stable",                           // optional, default: "stable"
        maxWaitDuration: 60000,                      // ms to wait for bundling to finish (default: 60s)
        verbose: false,                              // enable detailed log output
    },
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Set to `false` to disable the pipeline |
| `accessToken` | `string` | — | Needle Cloud token for cloud compression. Also read from `process.env.NEEDLE_CLOUD_TOKEN`. |
| `projectName` | `string` | `"compression"` | Project name used for cloud builds |
| `version` | `string` | `"stable"` | Pipeline version to use (e.g. `"stable"`, `"2.2.0-alpha"`) |
| `maxWaitDuration` | `number` | `60000` | Max time (ms) to wait for the Vite bundling step to finish before the pipeline starts processing. Increase for large projects. |
| `verbose` | `boolean` | `false` | Verbose log output |

To skip the pipeline entirely, use `noBuildPipeline: true`.

:::tip CI environments
The access token is automatically read from `process.env.NEEDLE_CLOUD_TOKEN`. In CI, set this as a repository secret and expose it as an environment variable in your workflow.
:::

---

## Copy Files

During builds, Needle automatically copies files to the output directory (`dist/` by default):

1. **Assets** — your project's `assets/` directory is copied to `dist/assets/`
2. **Include** — your project's `include/` directory is copied to `dist/include/`

### Custom copy paths

You can copy additional files or directories by configuring `build.copy` in your `needle.config.json`:

```json
{
    "build": {
        "copy": ["myFolder", "myFile.txt"]
    }
}
```

Each entry is resolved relative to your project root and copied into the output directory.

To disable all automatic copying, set `noCopy: true` in the plugin options.

---

## makeFilesLocal

*Available since Needle Engine 4.16.0*

Downloads external CDN assets at build time and bundles them into your output, producing fully self-contained deployments that work without internet access.

The plugin scans your project's compiled code for known external URLs (Google Fonts, Draco/KTX2 decoders, skyboxes, WebXR controller profiles, and more) and replaces them with local copies.

**When to use:** playable ads, app store submissions (Facebook Instant Games, Discord Activities), offline PWAs, restricted hosting environments (kiosks, museums).

:::tip Combine with PWA for full offline support
`makeFilesLocal` bundles external files into your build output. For full offline support including caching and installability, combine it with [PWA support](/docs/how-to-guides/web-integration/pwa).
:::

### Quick start

```js
// Download everything
needlePlugins(command, { makeFilesLocal: true });

// Auto-detect which features your project uses
needlePlugins(command, { makeFilesLocal: "auto" });
```

### Configuration

| Value | Behavior |
|-------|----------|
| `true` | Download all known external assets |
| `"auto"` | Scan project files to detect which features are used, then only download those |
| `{ enabled, features, excludeFeatures, exclude, platform }` | Fine-grained control (see below) |

| Option | Type | Description |
|--------|------|-------------|
| `enabled` | `boolean` | Enable or disable the plugin |
| `features` | `"auto"` \| `string[]` | Which feature categories to include. `"auto"` detects from project usage. An explicit array includes only those features. Omit to include all. |
| `excludeFeatures` | `string[]` | Feature categories to exclude. Applied after `features` (including after auto-detection). |
| `exclude` | `(string \| RegExp)[]` | URL patterns to skip entirely |
| `platform` | `string` | Target platform preset (`"facebook-instant"`, `"discord"`) |

### Available features

| Feature | What it downloads |
|---------|-------------------|
| `"draco"` | Draco mesh decoder (WASM + JS) |
| `"ktx2"` | KTX2/Basis texture transcoder (WASM + JS) |
| `"materialx"` | MaterialX shader compiler (WASM + data) |
| `"xr"` | WebXR input profiles (controller models, profile data) |
| `"skybox"` | Skybox and environment textures |
| `"fonts"` | Google Fonts CSS and font files |
| `"needle-fonts"` | Needle CDN font assets (MSDF, etc.) |
| `"needle-models"` | Needle CDN model assets |
| `"needle-avatars"` | Needle CDN avatar assets |
| `"needle-branding"` | Needle CDN branding assets |
| `"polyhaven"` | Polyhaven HDRIs and environment maps |
| `"cdn-scripts"` | Third-party scripts (QRCode.js, vConsole, HLS.js) |
| `"github-content"` | GitHub raw content files |
| `"threejs-models"` | three.js example models |
| `"needle-uploads"` | Needle uploads assets |

### Examples

**Auto-detect with exclusions:**
```js
needlePlugins(command, {
    makeFilesLocal: {
        enabled: true,
        features: "auto",
        excludeFeatures: ["xr", "polyhaven"],
    },
});
```

**Only specific features:**
```js
needlePlugins(command, {
    makeFilesLocal: {
        enabled: true,
        features: ["draco", "ktx2", "fonts"],
    },
});
```

**For Facebook Instant Games:**
```js
needlePlugins(command, {
    makeFilesLocal: {
        enabled: true,
        features: "auto",
        platform: "facebook-instant",
    },
});
```

### Build output

When enabled, downloaded assets are placed in an `ext/` directory inside your build output, organized by feature type. The plugin logs a summary at the end of each build.

---

## Defines

The plugin injects [Vite defines](https://vite.dev/config/shared-options.html#define) — compile-time constants that enable tree-shaking of optional features.

**`useRapier`** — When set to `false`, the Rapier physics engine WASM module is tree-shaken from the bundle. Note that Rapier is already lazily loaded by Needle Engine at runtime (it's only fetched when a physics component is actually used), so this option only affects the size of the build output — not runtime performance.

```js
needlePlugins(command, {
    useRapier: false,
});
```

The plugin also injects build metadata (`NEEDLE_ENGINE_VERSION`, `NEEDLE_ENGINE_GENERATOR`, `NEEDLE_PROJECT_BUILD_TIME`) automatically.

---

## See Also

- [Progressive Web Apps (PWA)](/docs/how-to-guides/web-integration/pwa) — Offline support and installability
- [Optimization & Compression](/docs/how-to-guides/optimization/) — Build pipeline, KTX2, Draco
- [Deployment Platforms](/docs/how-to-guides/deployment/) — Hosting and deployment options
- [needle.config.json](/docs/reference/needle-config-json) — Project configuration file
