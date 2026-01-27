---
title: Frameworks, Bundlers, HTML
---

# Web Integration & Frameworks

Needle Engine is a web component that works with any modern web framework or vanilla JavaScript. Install it via npm and use it anywhere.

[Learn more about Needle Engine →](https://needle.tools)

## Quick Start

**Install:**
```bash
npm i @needle-tools/engine
```

**Use in HTML:**
```html
<script type="module">
  import '@needle-tools/engine';
</script>
<needle-engine src="path/to/your.glb"></needle-engine>
```

That's it! Needle Engine automatically bundles with your project for optimized production builds.

[📖 See web component reference →](./reference/needle-engine-attributes.html)

::: tip Bundling and tree shaking

**Bundling** means that all the css, js and other files making up your project are combined into less, and smaller, files at build time. This ensures that instead of downloading numerous small scripts and components, only one or a few are downloaded that contain the minimal code needed. The Vite docs contain a great explanation for why web apps should be bundled: [Why Bundle for Production](https://vitejs.dev/guide/why.html)

**Tree shaking** is a common practice in web development where unused code is removed from the final bundle to reduce file size. This is similar to "code stripping" in Unity. [The MSDN docs](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) have a good explanation of tree shaking.
:::

## <logo-header logo="/imgs/vite-logo.webp" alt="Vite">Supported Frameworks & Bundlers</logo-header>

Needle Engine is framework-agnostic—use it with any modern web stack. Our default template uses [Vite](https://vitejs.dev), but you can integrate with any framework or bundler.

### Production-Ready Stacks

| Framework | Status | Notes |
| --- | --- | --- |
| **Vite + HTML** | ✅ Default template | Minimal setup, great for getting started |
| **Vite + Vue** | ✅ Production use | Powers [needle.tools](https://needle.tools) • [Sample](https://github.com/needle-tools/needle-engine-samples) |
| **Vite + React** | ⚡ Experimental template | Available in Unity integration |
| **Vite + Svelte** | ✅ Supported | |
| **Vite + SvelteKit** | ✅ Supported | |
| **Next.js** | ✅ Supported | [Example project](https://github.com/needle-engine/nextjs-sample) |
| **react-three-fiber** | ⚡ Experimental template | Available in Unity integration |
| **Vanilla JS (CDN)** | ✅ Supported | No bundler needed • [Guide](./three/) |

:::tip Have a Different Stack?
Let us know what you're building with! We're always looking to improve the experience and provide more examples.
:::

:::tip
Some frameworks require custom settings in `needle.config.json`. Learn more [here](./reference/needle-config-json.md). Typically, the `baseUrl` needs to be set. 
:::

:::details How do I create a custom project template in Unity?

You can create and share your own web project templates to use other bundlers, build systems, or none at all.  

**Create a new Template**  
1. Select `Create/Needle Engine/Project Template` to add a ProjectTemplate into the folder you want to use as a template 
2. Done! It's that simple.

The dependencies come from unity when there is a NpmDef in the project (so when your project uses local references).  
You could also publish your packages to npm and reference them via version number.  
:::

## <logo-header logo="/imgs/pwa-logo.webp" alt="PWA">Progressive Web Apps (PWA)</logo-header>

Turn your Needle Engine project into a Progressive Web App with offline support, automatic updates, and installability.

**PWA Benefits:**
- 📱 Install on home screen (mobile & desktop)
- ⚡ Works offline
- 🔄 Auto-update when you publish new versions
- 🚀 Faster loading with smart caching

### Setup

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

### Testing PWAs

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

### Automatically update running apps

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

### More PWA options

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

## Accessing Needle Engine and Components from external javascript
    
Code that you expose can be accessed from JavaScript after bundling. This allows to build viewers and other applications where there's a split between data known at edit time and data only known at runtime (e.g. dynamically loaded files, user generated content).  
For accessing components from regular javascript outside of the engine please refer to the [interop with regular javascript section](./scripting.md#accessing-needle-engine-and-components-from-anywhere)


## Customizing how loading looks

See the *Loading Display* section in [needle engine component reference](./reference/needle-engine-attributes.md)

### Builtin styles

The needle-engine loading appearance can use a light or dark skin.  
To change the appearance use the `loading-style` attribute on the `<needle-engine>` web component.  
Options are `light` and `dark` (default):

``<needle-engine loading-style="light"></needle-engine>``

### Custom Loading Style — *PRO feature*  #

Please see the *Loading Display* section in [needle engine component reference](./reference/needle-engine-attributes.md)

![custom loading](/imgs/custom-loading-style.webp)