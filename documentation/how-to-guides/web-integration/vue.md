---
title: Using Needle Engine with Vue and Nuxt
description: Add interactive, optimized 3D scenes to a Vue or Nuxt app with Needle Engine. Configure isCustomElement, wire up the Vite plugin, and handle Nuxt's SSR.
---

# <logo-header logo="/imgs/vue-logo.svg" alt="Vue">Needle Engine + Vue & Nuxt</logo-header>

**Want interactive 3D in your Vue app?** Needle Engine ships as a standard [web component](/docs/reference/needle-engine-attributes), so `<needle-engine>` drops into a Vue template once you tell Vue's compiler it's a custom element. Vue is a first-class target — [needle.tools](https://needle.tools) itself is built with **Nuxt + Needle Engine**.

:::tip Start from a template
Scaffold a ready-to-run project with the [`create-needle` CLI](/docs/reference/templates#create-needle-cli):

```bash
npx create-needle my-app -t vue
```

Or explore the full **[Vue sample](https://engine.needle.tools/samples/vue.js-integration)** ([source](https://github.com/needle-engine/vuejs-sample)).
:::

## Quick Start

**1. Install Needle Engine:**

```bash
npm i @needle-tools/engine
```

**2. Tell Vue that `<needle-engine>` is a custom element.** Vue otherwise tries to resolve it as a component and warns *"Failed to resolve component: needle-engine"*. Configure `isCustomElement` (see [Vite configuration](#vite-configuration) below for the full file):

```js
isCustomElement: (tag) => tag.startsWith('needle-')
```

`startsWith('needle-')` matches only Needle's elements (`needle-engine`, `needle-menu`, `needle-button`, …). A broader `tag.includes('-')` also works, but treats *every* hyphenated tag as a custom element — which can mask typos in real component names.

**3. Use `<needle-engine>` in a component.** In a plain Vue (Vite) app there's no SSR, so importing the engine at the top of `<script setup>` is fine:

```vue
<script setup>
import '@needle-tools/engine';
</script>

<template>
  <needle-engine
    src="https://cloud.needle.tools/-/assets/.../scene.glb"
    camera-controls
  ></needle-engine>
</template>
```

See the [web component reference](/docs/reference/needle-engine-attributes) for all attributes.

## Vite configuration

Configure the Vue plugin's `isCustomElement` and add the Needle Vite plugin (for local assets, codegen, and the Unity/Blender export pipeline). `needlePlugins(...)` is **async** (returns a `Promise<Plugin[]>`), so load it in an async config:

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(async ({ command }) => {
  const { needlePlugins, loadConfig } = await import('@needle-tools/engine/vite');
  const needleConfig = await loadConfig() ?? undefined;

  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // treat <needle-engine> and other needle-* elements as custom elements
            isCustomElement: (tag) => tag.startsWith('needle-'),
          },
        },
      }),
      needlePlugins(command, needleConfig),
    ],
  };
});
```

## Accessing the scene from Vue

Needle exposes global lifecycle hooks — `onStart`, `onInitialized`, `onUpdate` (plus `onBeforeRender`, `onClear`, …). Each receives the [`Context`](/docs/api/Context) and **returns an unsubscribe function**. Subscribe in `onMounted` and store the context in a `ref`:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { onInitialized } from '@needle-tools/engine';

const context = ref(null);
let unsubscribe;

onMounted(() => {
  // fires once the scene is created and its content has loaded
  unsubscribe = onInitialized(ctx => { context.value = ctx; });
});
onUnmounted(() => unsubscribe?.());
</script>

<template>
  <needle-engine src="/scene.glb" camera-controls></needle-engine>
  <p v-if="context">Scene ready ✔</p>
</template>
```

### Share the scene across components

For app-wide access, wrap the subscription in a composable backed by a module-scoped `ref` — every component that calls it shares the same reactive context, with no prop-drilling and no extra dependency:

```js
// composables/useNeedle.js
import { ref } from 'vue';

const context = ref(null);
let subscribed = false;

export function useNeedle() {
  if (!subscribed) {
    subscribed = true;
    import('@needle-tools/engine').then(({ onInitialized }) => {
      onInitialized(ctx => { context.value = ctx; });
    });
  }
  return { context };
}
```

```vue
<script setup>
import { useNeedle } from '@/composables/useNeedle';
const { context } = useNeedle();
</script>
```

(In Nuxt, files in `composables/` are auto-imported, so you can drop the `import`.) For larger apps, the same idea maps cleanly onto a [Pinia](https://pinia.vuejs.org/) store.

Use `onStart` to run before the first content finishes loading, or `onUpdate` for per-frame logic. For your own interactive logic, see [Scripting & creating components](/docs/how-to-guides/scripting/create-components).

## Nuxt (SSR)

Nuxt renders on the server by default, and Needle Engine — like vanilla three.js — is a **WebGL / browser library**. Two things to set up:

**1. Register the custom element** in `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('needle-'),
    },
  },
});
```

**2. Render `<needle-engine>` on the client.** Wrap it in `<ClientOnly>` and import the engine in `onMounted` (or a `.client.vue` component) so browser-only code never runs during SSR:

```vue
<script setup>
import { onMounted } from 'vue';
onMounted(() => { import('@needle-tools/engine'); });
</script>

<template>
  <ClientOnly>
    <needle-engine src="/scene.glb" camera-controls></needle-engine>
  </ClientOnly>
</template>
```

:::tip Server-side imports (experimental)
Experimental server-side imports in Needle Engine 5.1.x are expected to let you `import '@needle-tools/engine'` at the top level without the client-only guard. Until then, keep engine imports on the client.
:::

**Serving assets:** Nuxt serves files from `public/` at the site root. If Needle writes assets to `public/assets` but they're served from `/assets`, set `baseUrl` in [`needle.config.json`](/docs/reference/needle-config-json):

```json
{
  "assetsDirectory": "public/assets",
  "baseUrl": "assets"
}
```

(A plain Vue + Vite app serves from `assets/` and needs no `baseUrl`.)

## Next Steps

- [Frameworks, bundlers & HTML overview](/docs/how-to-guides/web-integration/) — all supported stacks and the support matrix
- [Use Needle Engine with React](/docs/how-to-guides/web-integration/react) and [Svelte & SvelteKit](/docs/how-to-guides/web-integration/sveltekit)
- [Web component attributes](/docs/reference/needle-engine-attributes) — every `<needle-engine>` option
- [Deploy to Needle Cloud](/docs/cloud/) — one-command hosting with a shareable URL
