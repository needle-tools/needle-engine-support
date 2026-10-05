---
title: Drive Needle Engine from an external render loop
description: Use a host three.js renderer to update and render a Needle Engine context.
---

# Drive Needle Engine from an external render loop

::: warning Preview: Needle Engine 6 alpha
This integration is currently available for evaluation in Needle Engine 6 alpha builds. The APIs and behavior described here may change before the stable 6.0 release. Test with the Three.js version and renderer setup used by your application.
:::

Use this approach when an existing three.js application owns the renderer and frame loop, but you want Needle components and scenes to run inside that application. The example applies to Needle Engine 6.x.

## Use one copy of three.js

The host application and Needle Engine must resolve `three` to the same installed package. A second copy gives objects different prototypes, so Needle extensions such as `Object3D.getComponent()` and `Object3D.worldScale` may be missing on host objects.

Check the dependency tree with `npm ls three`. When using Vite, also inspect the resolved `three` path in the development server output. If there are two copies, resolve the package duplication before sharing objects between the applications. A single copy is necessary, but the chosen three.js version must still be compatible with the Needle Engine version you use.

## Give the host renderer to Needle

Create the context with the host's `WebGLRenderer`. Register for `ContextCreated` before constructing the context: creation begins in the constructor, and it resets the renderer's animation loop. Install the host loop only after the callback runs.

```ts
import { Context, ContextEvent, ContextRegistry } from "@needle-tools/engine";
import { WebGLRenderer } from "three";

const container = document.querySelector<HTMLElement>("#viewer")!;
const renderer = new WebGLRenderer({ antialias: true });
container.appendChild(renderer.domElement);

let needle: Context;
const unsubscribe = ContextRegistry.registerCallback(
  ContextEvent.ContextCreated,
  ({ context }) => {
    if (context !== needle) return;
    unsubscribe();

    // Add or load Needle content into needle.scene here.
    // Keep your existing host scene separate.

    renderer.setAnimationLoop((timestamp, xrFrame) => {
      needle.update(timestamp, xrFrame);
      renderer.render(needle.scene, needle.mainCamera);
    });
  },
);

needle = new Context({ renderer, domElement: container });
```

`needle.update()` runs a full Needle frame, including component callbacks and physics. Because the renderer is managed externally, Needle does not issue the render call; the host does that after the update. Pass the XR frame through when using WebXR.

The example renders the Needle scene by itself. If the host also renders its own scene, decide how to combine the scenes, cameras, clearing, and postprocessing in the host renderer. Keep the render order explicit.

The example starts with an empty Needle scene. To add a Needle export or another glTF asset, see [load 3D assets at runtime](/docs/how-to-guides/scripting/load-3d-web-assets-at-runtime). Load content after the context has been created.

## Pause Needle behavior while keeping the view

Set `needle.lifecycle = "held"` to keep the frame pipeline available while component activation, updates, coroutines, and physics are held. Set it back to `"running"` to resume. Continue calling `needle.update()` and rendering in both modes.

```ts
needle.lifecycle = "held";    // Preview without running Needle behavior.
needle.lifecycle = "running"; // Resume Needle behavior.
```

For an editor play/stop cycle, the advanced `resetRuntimeState()` API can reset script and physics state after you have properly destroyed the played content. It does not destroy scene objects or GPU resources for you.

## Current limits

- `Context.update()` runs the whole Needle frame. The component, coroutine, and physics phases are not exposed as separate host-driven steps. `updatePhysics()` is available for additional manual physics steps, but it does not replace the full update.
- The `timestamp` argument drives the frame loop, but Needle's `Time` also reads the browser clock. Passing a synthetic timestamp alone does not provide deterministic fixed-step simulation.
- In an externally managed context, Needle's `onAfterRender` callbacks run during `needle.update()`, before the host's `renderer.render()` call. Run work that truly depends on the completed host render in the host loop.
- Do not pass an existing host scene or camera through the `Context` constructor as a shared ownership shortcut. Context creation clears its scene and resets its camera references. Keep host-owned objects separate until your integration explicitly manages their lifetime.

See the [Context API](https://engine.needle.tools/docs/api/classes/Engine_Core.Context.html) and [lifecycle methods](/docs/reference/api/lifecycle-methods) for the underlying APIs.
