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

Needle Engine is unoponiated about the choice of framework. The default template only uses vite as bundler. Adding vue to that is easy (see the [vite docs](https://vitejs.dev)), we also provide an (experimental) react-three-fiber template and there should be nothing stopping your from using simpler or more complex frameworks.

Here's some example tech stacks that are possible and that we use Needle Engine with:  

- **Vite + HTML** — It is what our default template uses
    
- **Vite + Vue** — This is what the [Needle Tools](https://needle.tools) website uses!. Find a sample to download [here](https://github.com/needle-tools/needle-engine-samples). 
- **Vite + Svelte** 
- **Vite + SvelteKit**
- **Vite + React** — There's an experimental template shipped with the Unity integration for this that you can pick when generating a project!
- **react-three-fiber** — There's an experimental template shipped with the Unity integration for this that you can pick when generating a project!
- **Vercel & Nextjs** — Find a [example nextjs project here](https://github.com/needle-engine/nextjs-sample)
- **CDN without any bundler** — Find a code example [here](./vanilla-js.html)

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