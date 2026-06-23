---
title: Upgrading Vite (4 → 8)
description: Step-by-step guide for moving an older Needle Engine project from the pinned Vite 4 setup to Vite 8.
---

# <logo-header logo="/imgs/vite-logo.webp" alt="Vite">Upgrading Vite (4 → 8)</logo-header>

Needle projects created before early 2026 pinned Vite to `<= 4.3.9`. This was a deliberate workaround for a Vite HTTP/2 bug that caused dev-server session-memory timeouts. That bug is resolved in modern Vite, and the current template ships against **Vite 8**.

In practice the Vite 4 → 8 jump happens together with the **Needle Engine 4 → 5** upgrade — they were updated in the same template change. This guide covers the Vite-side changes.

:::tip Upgrading is optional
Vite 4 still works, so you don't have to update. We recommend updating older projects to pick up newer Vite features and fixes. `package.json` and `vite.config.js` are part of your project (the Unity / Blender integrations don't overwrite them), so the steps below apply however your project was created.
:::

---

## 1. Check your Node.js version

This is the most common upgrade blocker. Vite 8 requires:

- **Node.js 20.19+** or **22.12+**

Older Needle projects ran fine on Node 14/16. Vite dropped those long ago:

| Vite | Minimum Node.js |
|------|-----------------|
| 4 | 14.18+ / 16+ |
| 5 | 18+ |
| 6 | 18+ / 20+ / 22+ |
| 7 | 20.19+ / 22.12+ |
| 8 | 20.19+ / 22.12+ |

Check yours with `node -v` and update if needed before continuing.

---

## 2. Update `package.json`

Update the relevant dependency versions. Before:

```json
"dependencies": {
    "@needle-tools/engine": "^4.17.0-alpha",
    "three": "npm:@needle-tools/three@^0.169.19"
},
"devDependencies": {
    "@needle-tools/helper": "^1.11.4",
    "@types/three": "0.169.0",
    "@vitejs/plugin-basic-ssl": "^1.0.1",
    "typescript": "^5.0.4",
    "vite": "<= 4.3.9",
    "vite-plugin-compression": "^0.5.1"
}
```

After:

```json
"dependencies": {
    "@needle-tools/engine": "^5.0.0",
    "three": "npm:@needle-tools/three@0.169.19"
},
"devDependencies": {
    "@needle-tools/helper": "^1.11.4",
    "@types/three": "0.169.0",
    "@vitejs/plugin-basic-ssl": "2",
    "typescript": "^5.0.4",
    "vite": "8"
}
```

Key changes:

- **`vite`** `<= 4.3.9` → `8` — remove the version cap entirely.
- **`@needle-tools/engine`** → `^5.0.0` (or the latest version).
- **`@vitejs/plugin-basic-ssl`** `^1.0.1` → `2` — v2 is required for Vite 5+.
- **`vite-plugin-compression` is optional** — the current template drops it. If you [deploy to Needle Cloud](/docs/cloud/), assets are gzip/brotli compressed on deploy, so you don't need the plugin. It still works with Vite 8 if you keep it (`^0.5.1` declares `vite >=2.0.0`), which is useful when self-hosting on a server that doesn't compress responses for you. If you remove it, also remove its entry from `vite.config.js` (see below).

After editing, delete `node_modules` and your lockfile, then reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 3. Update `vite.config.js`

The config got simpler — Vite-version workarounds and manual setup that Needle now handles automatically can be removed.

Before (the old pinned-Vite config):

```js
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(async ({ command }) => {
    const { needlePlugins, useGzip, loadConfig } = await import("@needle-tools/engine/plugins/vite/index.js");
    const needleConfig = await loadConfig();
    return {
        base: "./",
        plugins: [
            useGzip(needleConfig) ? viteCompression({ deleteOriginFile: true }) : null,
            needlePlugins(command, needleConfig, { /** custom options */ }),
        ],
        server: {
            https: false,
            proxy: {
              'https://localhost:3000': 'https://localhost:3000',
            },
            strictPort: true,
            port: 3000,
            hmr: false,
        },
        build: {
            outDir: "./dist",
            emptyOutDir: true,
        }
    }
});
```

After:

```js
import { defineConfig } from 'vite';

export default defineConfig(async ({ command }) => {
    const { needlePlugins, loadConfig } = await import("@needle-tools/engine/vite");
    const needleConfig = await loadConfig();
    return {
        base: "./",
        plugins: [
            needlePlugins(command, needleConfig, { /** custom options */ }),
        ],
        server: {
            https: false,
            proxy: {
              'https://localhost:3000': 'https://localhost:3000',
            },
            strictPort: true,
            port: 3000,
            hmr: false,
        },
        build: {
            outDir: "./dist",
            emptyOutDir: true,
        }
    }
});
```

What changed:

- **Import path** `@needle-tools/engine/plugins/vite/index.js` → `@needle-tools/engine/vite`. The old path still resolves (it's an alias), but the short form is the current convention.
- **Dropped the `vite-plugin-compression`** import and the `useGzip(...) ? viteCompression(...) : null` plugin entry, matching the current template. This is optional — keep both if you want the plugin to compress your build output (see step 2). Needle Cloud compresses on deploy regardless.
- **Removed manual `basicSsl()` and `resolve.alias`** entries if your project still has them from a very old template — `needlePlugins` sets up three.js / engine aliases for you. See [Vite Plugin Configuration](/docs/reference/needle-vite-plugin#aliases).

:::tip Why the HTTP/2 proxy line is still there
The `proxy` entry was originally a workaround for the Vite HTTP/2 session-memory bug. It's harmless on Vite 8 and the current template keeps it, so you can leave it as-is.
:::

---

## 4. Test the dev server and a production build

```bash
npm run dev          # or: npm start
npm run build        # production build into ./dist
```

The build script name depends on your `package.json`. Current templates have `build` (production) and `build:dev` (uncompressed). Older templates may only have `build:dev` and `build:production` — run whichever your project defines (`npm run build:production`, etc.).

If the dev server starts and a production build completes, the upgrade is done.

---

## Troubleshooting

### `Vite requires Node.js version 20.19+ or 22.12+`

Your Node.js is too old. See [step 1](#_1-check-your-node-js-version).

### `@vitejs/plugin-basic-ssl` errors / wrong default export

Make sure it's on `2`, not `^1.x`.

### Module resolution / duplicate three.js issues

Enable alias debug logging with `debugAlias: true`. See [Debugging alias resolution](/docs/reference/needle-vite-plugin#debugging-alias-resolution).

### Still stuck?

Ask on [Discord](https://discord.needle.tools) or the [Forum](https://forum.needle.tools).

---

## See Also

- [Vite Plugin Configuration](/docs/reference/needle-vite-plugin) — Full reference for `needlePlugins` options
- [Templates](/docs/reference/templates) — Start from an up-to-date project template
- [Official Vite migration guide](https://vite.dev/guide/migration) — Vite's own breaking-change notes per version
