---
title: Using Needle Engine with React
description: Add interactive, optimized 3D scenes to a React app with Needle Engine. Install via npm, use the <needle-engine> web component in JSX, and access the scene from React.
---

# <logo-header logo="/imgs/react-logo.svg" alt="React">Needle Engine + React</logo-header>

**Want interactive 3D in your React app?** Needle Engine ships as a standard [web component](/docs/reference/needle-engine-attributes), so it drops straight into JSX — no React-specific wrapper required. Install it from npm, render `<needle-engine>`, and you get an optimized, compressed 3D scene with camera controls, lighting, physics, XR and networking built in.

:::tip See a complete React project
The **[React sample](https://engine.needle.tools/samples/react-sample/)** is a full, ready-to-run React setup. (Prefer plain HTML/JS? **[engine.needle.tools/new](https://engine.needle.tools/new)** opens a vanilla Vite starter in StackBlitz.)
:::

## Quick Start

**1. Install Needle Engine** in your React project (Vite, Create React App, Next.js, …):

```bash
npm i @needle-tools/engine
```

**2. Import the engine once** (a side-effect import registers the `<needle-engine>` custom element) and render it in JSX:

```jsx
import '@needle-tools/engine';

export default function Scene() {
  return (
    <needle-engine
      src="https://cloud.needle.tools/-/assets/.../scene.glb"
      camera-controls
      background-color="transparent"
      environment-image="studio"
      contact-shadows
    ></needle-engine>
  );
}
```

That's it — the component bundles with your app for an optimized production build. See the [web component reference](/docs/reference/needle-engine-attributes) for the full list of attributes.

## TypeScript

No manual declaration needed — `<needle-engine>` is **typed in JSX automatically**. The package entry references its own JSX declarations, so just importing the engine registers the element types for React (and Preact, SolidJS, Svelte, and vanilla TS):

```ts
import '@needle-tools/engine';
// <needle-engine src="…"> is now type-checked in JSX
```

Attributes are typed by the exported `NeedleEngineAttributes` interface. Import it to build a small typed wrapper, so props get autocomplete and type-checking at the call site:

```tsx
import '@needle-tools/engine';
import type { NeedleEngineAttributes } from '@needle-tools/engine';

// Every attribute is optional — pass through whichever you need.
type SceneProps = Partial<NeedleEngineAttributes>;

export function Scene(props: SceneProps) {
  return <needle-engine {...props}></needle-engine>;
}
```

```tsx
// Usage — fully type-checked and autocompleted:
<Scene
  src="https://cloud.needle.tools/-/assets/.../scene.glb"
  camera-controls="true"
  environment-image="studio"
  contact-shadows="true"
/>
```

::: tip React 18 vs 19
React 19 has first-class custom-element support and forwards props as attributes/properties correctly. On React ≤ 18, string/number/boolean values are passed as **attributes** — all that the `<needle-engine src camera-controls>` markup above needs — but complex values (objects, functions) are not; pass those imperatively (see [Accessing the scene](#accessing-the-scene-from-react)).
:::

## Accessing the scene from React

Needle exposes global lifecycle hooks — `onStart`, `onInitialized`, `onUpdate` (plus `onBeforeRender`, `onClear`, …). Each receives the [`Context`](/docs/reference/) and **returns an unsubscribe function**, which maps cleanly onto a React `useEffect`. This is the recommended way to reach the scene from React — prefer it over reading the element imperatively.

### In a single component

Subscribe in an effect and keep the context in state, so the component re-renders once the scene is ready:

```jsx
import { useEffect, useState } from 'react';
import { onInitialized } from '@needle-tools/engine';
import '@needle-tools/engine';

export default function Scene() {
  const [context, setContext] = useState(null);

  useEffect(() => {
    // fires once the scene is created and its first content has loaded
    // (also re-fires if `src` changes). Returning the unsubscribe fn lets
    // React clean up — and makes StrictMode's double-invoke safe.
    return onInitialized(ctx => setContext(ctx));
  }, []);

  useEffect(() => {
    if (!context) return;
    console.log('Scene ready', context.scene);
    // query Needle components, add three.js objects, drive animations…
  }, [context]);

  return <needle-engine src="path/to/your.glb"></needle-engine>;
}
```

Use `onStart` instead of `onInitialized` to run *before* the first content finishes loading, or `onUpdate` for per-frame logic — same pattern, just return the unsubscribe from the effect.

### Across your app (store)

If several components need the scene, subscribe **once** and put the context in a store (Zustand, Jotai, or a React Context) instead of threading props:

```jsx
// store.js
import { create } from 'zustand';
export const useNeedle = create(set => ({
  context: null,
  setContext: ctx => set({ context: ctx }),
}));

// mounted once (e.g. in your <App>)
import { useEffect } from 'react';
import { onInitialized } from '@needle-tools/engine';
import { useNeedle } from './store';

useEffect(() => onInitialized(useNeedle.getState().setContext), []);
```

Any component can then read `const context = useNeedle(s => s.context)`.

::: tip Which approach?
- **State + hook subscription** (above) — one component that should re-render when the scene is ready. Recommended default.
- **Store** — many components across the tree need the scene. Subscribe once, share via the store.
- **`useRef` on the element** — for imperative access from event handlers only. `await ref.current.getContext()` resolves with the `Context` (or read the sync `ref.current.context`, which is `undefined` until ready). A ref won't trigger a re-render, so don't use it to drive "is the scene ready?" UI.
- **Mounting late?** If a component appears after the scene is already running, the global hooks may not re-fire — read `Context.Current` as a fallback.
- **Multiple `<needle-engine>` elements?** The global hooks fire for each context — use the `ctx` argument to tell them apart, or scope via the element ref.
:::

For writing your own interactive logic as components, see [Scripting & creating components](/docs/how-to-guides/scripting/create-components).

## Two ways to use React with Needle

| Approach | When to use |
| --- | --- |
| **`<needle-engine>` web component in JSX** (above) | You author scenes in Unity/Blender (or load a `.glb`) and embed them in a React UI. Recommended for most apps. |
| **react-three-fiber interop** | You already build your scene with [react-three-fiber](https://r3f.docs.pmnd.rs/) and want Needle features alongside it. ⚡ Experimental — see the [frameworks overview](/docs/how-to-guides/web-integration/). |

## Server-side rendering (Next.js)

`<needle-engine>` is a client-side component. In Next.js, render it only on the client (e.g. a `'use client'` component, or `next/dynamic` with `{ ssr: false }`). When your framework serves exported assets from a different path than they're written to, set `baseUrl` in [`needle.config.json`](/docs/reference/needle-config-json). A starting point is the [Next.js example project](https://github.com/needle-engine/nextjs-sample).

## Next Steps

- [Frameworks, bundlers & HTML overview](/docs/how-to-guides/web-integration/) — all supported stacks and the support matrix
- [Web component attributes](/docs/reference/needle-engine-attributes) — every `<needle-engine>` option
- [Write components & scripting](/docs/how-to-guides/scripting/create-components) — add your own interactivity
- [Deploy to Needle Cloud](/docs/cloud/) — one-command hosting with a shareable URL
