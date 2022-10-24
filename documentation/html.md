---
title: Bundling and Templates
---

## Bundling

By default, Needle Engine gets bundled into a web app on deployment. This ensures smaller files, tree-shaking (similar to code stripping in Unity) and optimizes load times. Instead of downloading numerous small scripts and components, only one or a few are downloaded that contain the minimal code needed.  

Vite (our default bundler) has a good explanation why web apps should be bundled: [Why Bundle for Production](https://vitejs.dev/guide/why.html)

## Vue, React, Mustache, etc.

Needle Engine is unoponiated about the choice of framework. The default template only uses vite as bundler. Adding vue to that is easy (see the [vite docs](https://vitejs.dev)), we also provide an (experimental) react-three-fiber template and there should be nothing stopping your from using simpler or more complex frameworks.

You can, for example, use
- **just vite + HTML**  
    *Our default template does this*
    
- **vite + vue**  
    *This is what the Needle Tools website uses!*
- **vite + react**  
    *There's an experimental template for this, that you can pick when generating a project!*
- **react-three-fiber wrapped around a `<NeedleEngine>` tag**  
    *We've used this for some experiments*
- **`tsc` to compile TypeScript, no bundling required**
    *No example yet*
- **a pre-built Needle Engine and direct JavaScript**
    *No example yet*

In short: we're currently providing a minimal vite template, but you can extend it or switch to other frameworks –  
let us know what and how you build, and how we can improve the experience!

## Creating custom web project templates

::: warning
This section is Under Construction.  🏗️
:::

You can create and share your own web project templates to use other bundlers, build systems, or none at all.  

**Create a new Template**  
1. Select `Create/Needle Engine/Project Template` to add a ProjectTemplate into the folder you want to use as a template 
2. Done! It's that simple.

The dependencies come from unity when there is a NpmDef in the project (so when your project uses local references).  
You could also publish your packages to npm and reference them via version number.  

## Accessing components from regular javascript
    
Code that you expose can be accessed from JavaScript after bundling. This allows to build viewers and other applications where there's a split between data known at edit time and data only known at runtime (e.g. dynamically loaded files, user generated content).  
For accessing components from regular javascript outside of the engine please refer to the [interop with regular javascript section](./scripting.md#accessing-components-from-external-javascript)
