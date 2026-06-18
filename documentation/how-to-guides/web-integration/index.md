---
title: Frameworks, Bundlers, HTML
---

# Web Integration & Frameworks

Needle Engine is a web component that works with any modern web framework or vanilla JavaScript. Install it via npm and use it anywhere.

[Learn more about Needle Engine →](https://needle.tools)

:::tip Already have a website?
This page is about **building a web project** with Needle (frameworks, bundlers, the web component). If you already have a site — your own HTML, **Webflow**, WordPress, AEM… — and just want to drop a scene in, see [Embedding Needle Engine](/docs/how-to-guides/deployment/embedding).
:::

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

## Examples

A few common ways to use the `<needle-engine>` web component.

**Show a model with lighting, shadows and camera controls**
```html
<needle-engine
  src="path/to/your.glb"
  camera-controls="1"
  background-color="transparent"
  environment-image="studio"
  contact-shadows>
</needle-engine>
```

**Run your own code once the scene is ready**
```html
<script type="module">
  import { onStart } from '@needle-tools/engine';

  onStart(context => {
    console.log('Scene loaded', context.scene);
    // add three.js objects, query components, drive animations…
  });
</script>
```

**Use straight from a CDN — no install, no bundler**
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="https://your-host.com/assets/MyScene.glb"></needle-engine>
```

## <logo-header logo="/imgs/vite-logo.webp" alt="Vite">Supported Frameworks & Bundlers</logo-header>

Needle Engine is framework-agnostic—use it with any modern web stack. Our default template uses [Vite](https://vitejs.dev), but you can integrate with any framework or bundler.

### Production-Ready Stacks

| Framework | Status | Notes |
| --- | --- | --- |
| **Vite + HTML** | ✅ Default template | Minimal setup, great for getting started |
| **Vite + Vue** | ✅ Production use | [Vue & Nuxt guide](/docs/how-to-guides/web-integration/vue) • powers [needle.tools](https://needle.tools) |
| **Vite + React** | ⚡ Experimental template | [React guide](/docs/how-to-guides/web-integration/react) • Available in Unity integration |
| **Vite + Svelte** | ✅ Supported | [Svelte & SvelteKit guide](/docs/how-to-guides/web-integration/sveltekit) |
| **Vite + SvelteKit** | ✅ Supported | [Svelte & SvelteKit guide](/docs/how-to-guides/web-integration/sveltekit) |
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

## Next Steps

- [Embed on an existing website](/docs/how-to-guides/deployment/embedding) – iframe, `needle-app`, and platform guides (Webflow, Framer, WordPress, AEM)
- [Web component attributes](/docs/reference/needle-engine-attributes) – All `<needle-engine>` options
- [Write components & scripting](/docs/how-to-guides/scripting/create-components) – Add your own interactivity
- [Deploy to Needle Cloud](/docs/cloud/) – One-command hosting with a shareable URL
