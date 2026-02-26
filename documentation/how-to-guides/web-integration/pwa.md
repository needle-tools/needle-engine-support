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

:::tip All assets are cached by default
Note that by default, all assets in your build folder are added the PWA precache – for large applications with many dynamic assets, this may not be what you want (imagine the YouTube PWA caching all videos once a user opens the app!). See [More PWA Options](#more-pwa-options) for how to customize this behavior.
:::

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

**Tips for reliable offline experiences:**
- Deploy and open the app once while online to let the service worker cache all assets
- Test offline behavior by disabling the network in Chrome DevTools (Application > Service Workers > Offline)
- For large scenes with many assets, verify that all files are included in the precache (see [More PWA Options](#more-pwa-options))
- Combine with [automatic updates](#automatically-update-running-apps) so the display stays current when connectivity returns

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
