---
title: Bundling, Templates & HTML
---

## Bundling and usage with various web frontends

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
- **Vite + React** — There's an experimental template shipped with the Unity integration for this that you can pick when generating a project!
- **react-three-fiber** — There's an experimental template shipped with the Unity integration for this that you can pick when generating a project!
- **CDN without any bundler** — Find a code example [here](./vanilla-js.html)

In short: we're currently providing a minimal vite template, but you can extend it or switch to other frameworks –  
Let us know what and how you build, and how we can improve the experience for your usecase or provide an example!

:::details How do I create a custom project template in Unity?

You can create and share your own web project templates to use other bundlers, build systems, or none at all.  

**Create a new Template**  
1. Select `Create/Needle Engine/Project Template` to add a ProjectTemplate into the folder you want to use as a template 
2. Done! It's that simple.

The dependencies come from unity when there is a NpmDef in the project (so when your project uses local references).  
You could also publish your packages to npm and reference them via version number.  
:::

## Accessing Needle Engine and Components from external javascript
    
Code that you expose can be accessed from JavaScript after bundling. This allows to build viewers and other applications where there's a split between data known at edit time and data only known at runtime (e.g. dynamically loaded files, user generated content).  
For accessing components from regular javascript outside of the engine please refer to the [interop with regular javascript section](./scripting.md#accessing-components-from-external-javascript)


## Customizing how loading looks

### Builtin styles

The needle-engine loading appearance can use a light or dark skin.  
To change the appearance use the `loading-style` attribute on the `<needle-engine>` web component.  
Options are `light` and `dark` (default):

``<needle-engine loading-style="light"></needle-engine>``

### Custom Loading Style*  
**Requires Pro License*  

To change the loading appearance the following attributes can be used:

- `loading-background-color`
- `loading-text-color`
- `loading-logo-src`
- `primary-color`
- `secondary-color`

For example:  
``<needle-engine loading-background-color="#444" loading-text-color="#000000" loading-logo-src="your_logo.png" primary-color="#00ff00" secondary-color="#ff0000"></needle-engine>``    

During styling of the loading bar you can append `?debugloadingbarrendering` to your URL to keep the loading overlay visible.
