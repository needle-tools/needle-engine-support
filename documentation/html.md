---
title: Frameworks, Bundlers, HTML
---

## Bundling and web frontends

Needle Engine is build as a web component.   
This means just install `@needle-tools/engine` in your project and include `<needle-engine src="path/to/your.glb">` anywhere in your web-project.  

- Install using npm:   
  `npm i @needle-tools/engine`

With our default Vite based project template Needle Engine gets bundled into a web app on deployment. This ensures smaller files, tree-shaking (similar to code stripping in Unity) and optimizes load times. Instead of downloading numerous small scripts and components, only one or a few are downloaded that contain the minimal code needed.  

Vite (our default bundler) has a good explanation why web apps should be bundled: [Why Bundle for Production](https://vitejs.dev/guide/why.html)

### Vite, Vue, React, Svelte, React Three Fiber...

Needle Engine is unoponiated about the choice of framework. Our default template uses the popular [vite](https://vitejs.dev) as bundler. From there, you can add vue, svelte, nuxt, react, react-three-fiber or other frameworks, and we have samples for a lot of them. You can also integrate other bundlers, or use none at all – just plain HTML and Javascript.  

Here's some example tech stacks that are possible and that we use Needle Engine with:  

- **Vite + HTML** — This is what our default template uses!
    
- **Vite + Vue** — This is what the [Needle Tools](https://needle.tools) website uses!. Find a sample to download [here](https://github.com/needle-tools/needle-engine-samples). 
- **Vite + Svelte** 
- **Vite + SvelteKit**
- **Vite + React** — There's an experimental template shipped with the Unity integration for this that you can pick when generating a project!
- **react-three-fiber** — There's an experimental template shipped with the Unity integration for this that you can pick when generating a project!
- **Vercel & Nextjs** — Find a [example nextjs project here](https://github.com/needle-engine/nextjs-sample)
- **CDN without any bundler** — Find a code example [here](./vanilla-js.md)

In short: we're currently providing a minimal vite template, but you can extend it or switch to other frameworks –  
Let us know what and how you build, and how we can improve the experience for your usecase or provide an example!

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

### Tree-shaking to reduce bundle size

Tree shaking refers to a common practice when it comes to bundling of web applications ([see MSDN docs](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)). It means that code paths and features that are not used in your code will be removed from the final bundled javascript file(s) to reduce filesize. See below about features that Needle Engine includes and remove them: 

:::details How to remove Rapier physics engine? (Reduce the overall bundle size removing ~2MB (~600KB when gzipping))

- **Option 1**: via needlePlugins config:  
Set `useRapier` to `false` in your vite.config: `needlePlugins(command, needleConfig, { useRapier: false }),`

- **Option 2**: via vite.define config:  
  Declare the `NEEDLE_USE_RAPIER` define with `false`
  ```js
  define: {
    NEEDLE_USE_RAPIER: false
  },
  ```

- **Option 3**: via .env  
  Create a `.env` file in your web project and add `VITE_NEEDLE_USE_RAPIER=false`

- **Option 4**: via Unity component   
  Add the `Needle Engine Modules` component to your scene and set `Physics Engine` to `None`  
  ![](/imgs/unity-needle-engine-modules-physics.jpg)

:::

## Creating a PWA

We support easily creating a Progressive Web App (PWA) directly from our vite template.  
PWAs are web applications that load like regular web pages or websites but can offer user functionality such as working offline, push notifications, and device hardware access traditionally available only to native mobile applications.   

By default, PWAs created with Needle have offline support, and can optionally refresh automatically when you publish a new version of your app. 

1) Install the [Vite PWA plugin](https://vite-pwa-org.netlify.app/) in your web project: `npm install vite-plugin-pwa --save-dev`
2) Modify `vite.config.js` as seen below. Make sure to pass the same `pwaOptions` object to both `needlePlugins` and `VitePWA`.

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
        // the rest of your vite config...
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