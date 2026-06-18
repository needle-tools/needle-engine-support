---
title: Using Needle Engine with Svelte and SvelteKit
description: Add interactive, optimized 3D scenes to a Svelte or SvelteKit app with Needle Engine. Use the <needle-engine> web component, wire up the Vite plugin, and handle SvelteKit's SSR.
---

# <logo-header logo="/imgs/svelte-logo.svg" alt="Svelte">Needle Engine + Svelte & SvelteKit</logo-header>

**Want interactive 3D in your Svelte app?** Needle Engine ships as a standard [web component](/docs/reference/needle-engine-attributes), so `<needle-engine>` drops straight into a `.svelte` template. Both plain **Svelte** (Vite SPA) and **SvelteKit** are supported — the only extra consideration is SvelteKit's server-side rendering, which we cover below.

:::tip Start from a template
Scaffold a ready-to-run project with the [`create-needle` CLI](/docs/reference/templates#create-needle-cli):

```bash
npx create-needle my-app -t sveltekit   # or -t svelte for plain Svelte
```

Or explore the full **[SvelteKit sample](https://engine.needle.tools/samples/sveltekit-integration/)** ([source](https://github.com/needle-engine/sveltekit-sample)).
:::

## Quick Start

**1. Install Needle Engine:**

```bash
npm i @needle-tools/engine
```

**2. Use `<needle-engine>` in a component.** Because the engine is browser-only (WebGL), import it on the client — `onMount` runs only in the browser, so a dynamic import there keeps it out of SSR:

```svelte
<!-- src/lib/Scene.svelte -->
<script>
  import { onMount } from 'svelte';

  export let src;

  onMount(async () => {
    // client-only: registers the <needle-engine> custom element in the browser
    await import('@needle-tools/engine');
  });
</script>

<needle-engine {src} camera-controls></needle-engine>
```

```svelte
<!-- src/routes/+page.svelte -->
<script>
  import Scene from '$lib/Scene.svelte';
</script>

<Scene src="https://cloud.needle.tools/-/assets/.../scene.glb" />
```

Svelte renders the `<needle-engine>` markup immediately; the element upgrades and starts loading once the engine module is imported. See the [web component reference](/docs/reference/needle-engine-attributes) for all attributes.

:::tip Server-side imports (experimental)
Server-side imports are **experimental** right now and are expected to ship in Needle Engine 5.1.x. Once available, you'll be able to `import '@needle-tools/engine'` at the top level (including in `+page`/`+layout` modules) without the `onMount` client-only guard. Until then, keep engine imports inside `onMount` or behind a `browser` check — see [Server-side rendering](#server-side-rendering-sveltekit) below.
:::

## Vite plugin

For local assets, codegen, and the Unity/Blender export pipeline, add the Needle Vite plugin alongside SvelteKit's. `needlePlugins(...)` is **async** (it returns a `Promise<Plugin[]>`), so load it inside an async config and pass the resolved Needle config:

```js
// vite.config.js
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(async ({ command }) => {
  const { needlePlugins, loadConfig } = await import('@needle-tools/engine/vite');
  const needleConfig = await loadConfig() ?? undefined;

  return {
    plugins: [
      needlePlugins(command, needleConfig),
      sveltekit(),
    ],
  };
});
```

(Plain Svelte projects use the same plugin next to `svelte()` instead of `sveltekit()`.)

## Server-side rendering (SvelteKit)

SvelteKit renders on the server by default. Needle Engine — like vanilla three.js — is fundamentally a **WebGL / browser library**, so the engine runs on the client:

- **Import `@needle-tools/engine` on the client**, not at the top level of a component or `+page`/`+layout` module — today a top-level import evaluates browser-only code during SSR. Use the `onMount` dynamic import (as above) or guard with `import { browser } from '$app/environment'`. *(With the experimental server-side imports in 5.1.x, a top-level `import` is expected to work — see the experimental note under Quick Start.)*
- Rendering the `<needle-engine>` *tag* during SSR is fine regardless — it's emitted as inert HTML and upgrades once the engine loads on the client.

## Serving assets — `assetsDirectory` & `baseUrl`

SvelteKit serves files from `static/` at the site root, so Needle's asset paths need two keys in [`needle.config.json`](/docs/reference/needle-config-json):

```json
{
  "assetsDirectory": "static/assets",
  "baseUrl": "assets"
}
```

- **`assetsDirectory`** — *where* Needle writes exported assets on disk (`static/assets`).
- **`baseUrl`** — *the URL* those assets are served from (`/assets`), since SvelteKit strips the `static/` prefix.

This pairing keeps relative paths inside exported files resolving correctly. (See the [sample's `needle.config.json`](https://github.com/needle-engine/sveltekit-sample/blob/main/needle.config.json) for the full set, including `buildDirectory`, `scriptsDirectory`, and `codegenDirectory`.)

## Accessing the scene from Svelte

Needle exposes global lifecycle hooks — `onStart`, `onInitialized`, `onUpdate` (plus `onBeforeRender`, `onClear`, …). Each receives the [`Context`](/docs/api/Context) and **returns an unsubscribe function**. Subscribe in `onMount`, store the context in a Svelte store, and unsubscribe on cleanup:

```svelte
<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const context = writable(null);

  onMount(() => {
    let unsubscribe;
    let disposed = false;
    // dynamic import keeps the engine out of SSR
    import('@needle-tools/engine').then(({ onInitialized }) => {
      if (disposed) return;
      unsubscribe = onInitialized(ctx => context.set(ctx));
    });
    // NOTE: keep this onMount callback *synchronous* — an async onMount
    // returns a Promise, which Svelte will not use as a cleanup function.
    return () => { disposed = true; unsubscribe?.(); };
  });
</script>

<needle-engine src="/scene.glb" camera-controls></needle-engine>

{#if $context}
  <!-- the store updates reactively once the scene is ready -->
  <p>Scene ready ✔</p>
{/if}
```

Use `onStart` to run before the first content finishes loading, or `onUpdate` for per-frame logic. For your own interactive logic, see [Scripting & creating components](/docs/how-to-guides/scripting/create-components).

## Next Steps

- [Frameworks, bundlers & HTML overview](/docs/how-to-guides/web-integration/) — all supported stacks and the support matrix
- [Use Needle Engine with React](/docs/how-to-guides/web-integration/react) — the same patterns, for React
- [Web component attributes](/docs/reference/needle-engine-attributes) — every `<needle-engine>` option
- [Deploy to Needle Cloud](/docs/cloud/) — one-command hosting with a shareable URL
