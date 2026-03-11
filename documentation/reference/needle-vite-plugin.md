---
title: Vite Plugin Configuration
description: Reference for Needle Engine's Vite plugin options including makeFilesLocal for self-contained deployments, PWA integration, build pipeline settings, and more.
---

# Vite Plugin Configuration

The Needle Engine Vite plugin (`needlePlugins`) provides build-time features for optimizing, transforming, and bundling your project. Configure it via the options object passed to `needlePlugins()` in your `vite.config.js`.

```js
import { defineConfig } from 'vite';

export default defineConfig(async ({ command }) => {
    const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");
    return {
        plugins: [
            needlePlugins(command, { /* options go here */ }),
        ],
    };
});
```

---

## makeFilesLocal

*Available since Needle Engine 4.16.0*

Downloads external CDN assets at build time and bundles them into your output, producing fully self-contained deployments that work without internet access.

At build time, the plugin scans your project's compiled code for known external URLs (Google Fonts, Draco/KTX2 decoders, skyboxes, WebXR controller profiles, and more) and replaces them with local copies.

### When to use

- **Playable ads** — ad networks often require all assets to be served from a single origin
- **App store submissions** — platforms like Facebook Instant Games or Discord Activities that mandate self-contained bundles
- **Offline PWAs** — ensure every asset is available offline without relying on CDN connectivity
- **Restricted hosting** — environments where external network requests are blocked or unreliable (kiosks, museums, exhibitions)

:::tip Combine with PWA for full offline support
`makeFilesLocal` bundles external files into your build output. For full offline support including caching and installability, combine it with [PWA support](/docs/how-to-guides/web-integration/pwa).
:::

### Quick start

Enable with defaults (downloads everything):

```js
needlePlugins(command, {
    makeFilesLocal: true,
});
```

Auto-detect which features your project actually uses:

```js
needlePlugins(command, {
    makeFilesLocal: "auto",
});
```

### Configuration

`makeFilesLocal` accepts `true`, `"auto"`, or an options object:

| Value | Behavior |
|-------|----------|
| `true` | Download all known external assets |
| `"auto"` | Scan project files to detect which features are used, then only download those |
| `{ enabled: true, ... }` | Fine-grained control (see options below) |

#### Options object

```ts
{
    enabled: boolean;
    features?: "auto" | FeatureName[];
    excludeFeatures?: FeatureName[];
    exclude?: (string | RegExp)[];
    platform?: "discord" | "facebook-instant";
}
```

| Option | Type | Description |
|--------|------|-------------|
| `enabled` | `boolean` | Enable or disable the plugin |
| `features` | `"auto"` \| `string[]` | Which feature categories to include. `"auto"` detects from project usage. An explicit array includes only those features. Omit to include all. |
| `excludeFeatures` | `string[]` | Feature categories to exclude. Applied after `features` (including after auto-detection). |
| `exclude` | `(string \| RegExp)[]` | URL patterns to skip entirely |
| `platform` | `string` | Target platform preset (e.g. `"facebook-instant"`, `"discord"`) |

#### Available features

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

**Only include specific features:**

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

**Exclude specific URLs:**

```js
needlePlugins(command, {
    makeFilesLocal: {
        enabled: true,
        exclude: ["specific-font.woff2", /polyhaven\.org/],
    },
});
```

### Build output

When enabled, the plugin creates an `ext/` directory inside your build output containing all downloaded assets, organized by feature:

```
dist/
├── ext/
│   ├── draco/          # Draco decoder files
│   ├── ktx2/           # KTX2/Basis transcoder files
│   ├── fonts/          # Font files and CSS
│   ├── skybox/         # Skybox textures
│   ├── scripts/        # Third-party scripts
│   └── ...
├── assets/
│   └── ...
└── index.html
```

At the end of each build, the plugin logs a summary showing how many files were made local, the total size, and any downloads that failed.

---

## Other Plugin Options

Below is a summary of other options available in the Needle Vite plugin. For some of these, detailed guides are available elsewhere in the documentation.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `pwa` | `object \| boolean` | — | PWA configuration. See [PWA Guide](/docs/how-to-guides/web-integration/pwa). |
| `buildPipeline` | `object` | — | Configure the Needle build pipeline for compression and optimization. See [Optimization](/docs/how-to-guides/optimization/). |
| `useRapier` | `boolean` | `true` | Set to `false` to tree-shake the Rapier physics engine and reduce bundle size |
| `noPoster` | `boolean` | `false` | Disable automatic poster image generation |
| `noBuildPipeline` | `boolean` | `false` | Disable the Needle build pipeline entirely |
| `noBuildInfo` | `boolean` | `false` | Disable generating the `buildinfo.json` file |
| `noCopy` | `boolean` | `false` | Disable automatic copying of files to the output directory |
| `noReload` | `boolean` | `false` | Disable the reload plugin |
| `allowHotReload` | `boolean` | `true` | Enable or disable hot reload for the Needle plugin |
| `useDrop` | `boolean` | `false` | Enable the Vite drop plugin |
| `openBrowser` | `boolean` | — | Automatically open a browser using a network IP address when the local server starts |
| `loadMaterialX` | `boolean` | — | Automatically import MaterialX in `main.ts` |
| `debug` | `boolean` | `false` | Enable verbose debug output for Needle plugins |

---

## See Also

- [Progressive Web Apps (PWA)](/docs/how-to-guides/web-integration/pwa) — Offline support and installability
- [Optimization & Compression](/docs/how-to-guides/optimization/) — Build pipeline, KTX2, Draco
- [Deployment Platforms](/docs/how-to-guides/deployment/) — Hosting and deployment options
- [needle.config.json](/docs/reference/needle-config-json) — Project configuration file
