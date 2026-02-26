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

[📖 See web component reference →](/docs/reference/needle-engine-attributes)

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
Some frameworks require custom settings in `needle.config.json`. Learn more [here](/docs/reference/needle-config-json). Typically, the `baseUrl` needs to be set. 
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

Turn your Needle Engine project into an installable, offline-capable Progressive Web App with automatic updates and smart caching.

[Learn how to set up PWA support →](/docs/how-to-guides/web-integration/pwa)

## Accessing Needle Engine and Components from external javascript
    
Code that you expose can be accessed from JavaScript after bundling. This allows to build viewers and other applications where there's a split between data known at edit time and data only known at runtime (e.g. dynamically loaded files, user generated content).  
For accessing components from regular javascript outside of the engine please refer to the [interop with regular javascript section](/docs/how-to-guides/scripting/create-components#accessing-needle-engine-and-components-from-anywhere)


## Customizing how loading looks

See the *Loading Display* section in [needle engine component reference](/docs/reference/needle-engine-attributes)

### Builtin styles

The needle-engine loading appearance can use a light or dark skin.  
To change the appearance use the `loading-style` attribute on the `<needle-engine>` web component.  
Options are `light` and `dark` (default):

``<needle-engine loading-style="light"></needle-engine>``

### Custom Loading Style — *PRO feature*  #

Please see the *Loading Display* section in [needle engine component reference](/docs/reference/needle-engine-attributes)

![custom loading](/imgs/custom-loading-style.webp)