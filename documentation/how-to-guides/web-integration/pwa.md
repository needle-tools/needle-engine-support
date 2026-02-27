---
title: Progressive Web Apps (PWA)
description: Turn your Needle Engine project into an installable, offline-capable Progressive Web App with automatic updates and smart caching.
---

# Progressive Web Apps (PWA)

<logo-header logo="/imgs/pwa-logo.webp" alt="PWA"></logo-header>

Turn your Needle Engine project into a Progressive Web App with offline support, automatic updates, and installability.

**PWA Benefits:**
- 📱 Install on home screen (mobile & desktop)
- ⚡ Works offline
- 🔄 Auto-update when you publish new versions
- 🚀 Faster loading with smart caching

## What Needle handles for you

Needle's PWA plugin takes care of the hard parts of PWA setup automatically:

- **All build assets are pre-cached** — 3D scenes, textures, audio, WASM, and scripts are cached so the app works fully offline after the first visit.
- **Compressed files (.gz) are excluded from pre-caching** — browsers fetch the uncompressed version, so pre-caching `.gz` files would cause 404 errors. Needle excludes them automatically.
- **SPA routing works offline** — requests for unknown URLs fall back to `index.html`, so navigation continues to work without a network connection.
- **Web manifest is auto-generated** — sensible defaults for icons, display mode, and theme are set so you get a working installable app without any manual manifest configuration.

You only need to think about a few things — see [What to watch out for](#what-to-watch-out-for) below.

## Setup

**1. Install the Vite PWA plugin:**

```bash
npm install vite-plugin-pwa --save-dev
```

**2. Configure `vite.config.js`:**

Pass the same `pwaOptions` object to both `needlePlugins` and `VitePWA`.

```js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async ({ command }) => {

    // Create the pwaOptions object.
    // You can edit or enter PWA settings here (e.g. change the PWA name or add icons).
    /** @type {import("vite-plugin-pwa").VitePWAOptions} */
    const pwaOptions = {};

    const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");

    return {
        plugins: [
            // pass the pwaOptions object to the needlePlugins and the VitePWA function
            needlePlugins(command, needleConfig, { pwa: pwaOptions }),
            VitePWA(pwaOptions),
        ],
        // the rest of your Vite config...
```

That's it! After building and deploying, your app is a fully functional PWA.

## What to watch out for

### Assets must be downloaded on the first visit

PWAs cache everything on first load — but that means **the device must be online the first time** the app is opened. After that initial load, the app works fully offline.

For kiosk or exhibition setups, make sure to open the app once on-site while connected to the internet before going offline. Check the browser's DevTools → Application → Cache Storage to confirm all assets were cached.

### External and dynamically loaded assets are not pre-cached

The PWA pre-cache only includes assets in your **build output folder**. Assets loaded from external sources (CDNs, remote APIs, or dynamically constructed URLs at runtime) are not cached automatically.

If your app fetches external resources that must work offline, you'll need to add a custom caching strategy. See the [Vite PWA plugin docs](https://vite-pwa-org.netlify.app/workbox/generate-sw.html) for runtime caching options.

### Large projects: pre-caching everything can be slow

By default, all build assets are pre-cached. For large applications with many assets (large textures, audio, video), this can result in a significant download on first visit. Consider which assets are truly needed offline and customize `globPatterns` to limit what gets pre-cached:

```js
const pwaOptions = {
  workbox: {
    // Only pre-cache HTML, JS, CSS, WASM, and GLB files.
    // Large textures or audio can be left for runtime/on-demand caching.
    globPatterns: ['**/*.{html,js,css,wasm,glb}'],
  }
};
```

## Testing PWAs

To test your PWA, deploy the page, for example using the `DeployToFTP` component.
Then, open the deployed page in a browser and check if the PWA features work as expected:
- the app shows up as installable
- the app works offline
- the app is detected as offline-capable PWA by [pwabuilder.com](https://pwabuilder.com/)

PWAs use Service Workers to cache resources and provide offline support. Service Workers are somewhat harder to use during development, and typically are only enabled for builds (e.g. when you use a `DeployTo...` component).

You can enable PWA support for development by adding the following to the options object in your `vite.config.js`.

```js
const pwaOptions = {
  // Note: PWAs behave different in dev mode.
  // Make sure to verify the behaviour in production builds!
  devOptions: {
    enabled: true,
  }
};
```

Please note that PWAs in development mode do not support offline usage – trying it may result in unexpected behavior.

## Automatically update running apps

Websites typically show new or updated content on page refresh.

In some situations, you may want the page to refresh and reload automatically when a new version has been published –
such as in a museum, trade show, public display, or other long-running scenarios.

To enable automatic updates, set the `updateInterval` property in the pwaOptions object to a duration (in milliseconds) in which the app should check for updates. If an update is detected, the page will reload automatically.

```js
const pwaOptions = {
  updateInterval: 15 * 60 * 1000, // 15 minutes, in milliseconds
};
```

:::tip Periodic Reloads and User Data
It's not recommended to use automatic reloads in applications where users are interacting with forms or other data that could be lost on a reload. For these applications, showing a reload prompt is recommended.
See the [Vite PWA plugin documentation](https://vite-pwa-org.netlify.app/guide/prompt-for-update.html) for more information on how to implement a reload prompt instead of automatic reloading.
:::

## Offline use at conventions and exhibitions

PWAs are ideal for trade shows, museums, public displays, and other scenarios where internet connectivity may be unreliable or unavailable. Once a user (or a kiosk device) loads the app while online, all assets are cached locally and the app continues to work fully offline.

**Recommended setup for kiosk / convention use:**

```js
const pwaOptions = {
  // Automatically check for updates every 15 minutes
  updateInterval: 15 * 60 * 1000,
};
```

**Checklist for reliable offline experiences:**
- ✅ Deploy the app and open it **once while online** — this triggers the service worker to cache all assets
- ✅ Verify caching in Chrome DevTools → Application → Service Workers → check "Offline", then reload
- ✅ Check Chrome DevTools → Application → Cache Storage to confirm all required files are listed
- ✅ For large scenes, verify that all 3D assets and textures appear in the cache
- ✅ Combine with [automatic updates](#automatically-update-running-apps) so the display stays current when connectivity returns
- ✅ Test your update flow: deploy a new version, wait for the update interval, confirm the page reloads

## More PWA options

Since Needle uses the [Vite PWA plugin](https://vite-pwa-org.netlify.app/) under the hood, you can use all options and hooks provided by that.
For example, you can provide a partial manifest with a custom app title or theme color:

```js
const pwaOptions = {
  // manifest options provided here will override the defaults
  manifest: {
    name: "My App",
    short_name: "My App",
    theme_color: "#B2D464",
  }
};
```

For complex requirements like partial caching, custom service workers or different update strategies, you can remove the `{ pwa: pwaOptions }` option from `needlePlugins` and add PWA functionality directly through the Vite PWA plugin.
