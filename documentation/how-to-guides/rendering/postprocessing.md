---
title: Add Post-Processing Effects
description: Add bloom, depth of field and ambient occlusion to a scene, control them from code, and write your own effect component.
---

<ask-ai />

# Add Post-Processing Effects

Post-processing runs over the finished image each frame. Needle Engine ships each effect as a component, so adding one is the same as adding any other component.

::: tip Want to see them running first?
The [Scripting Walkthrough](/docs/tutorials/scripting-walkthrough#18-post-processing) has a live scene with bloom, depth of field and ambient occlusion, each on its own toggle.
:::

## Add an effect

Add the effect component to any object in the scene. It registers itself — there is no manager, profile asset or `Volume` to set up first.

The object doesn't matter. An effect is applied to the whole image however deep in the hierarchy it sits, so put it wherever it belongs for your project.

```ts
import { BloomEffect, onStart } from "@needle-tools/engine";

onStart(context => {
    const bloom = context.scene.addComponent(BloomEffect);
});
```

In Unity or Blender, add the matching component in the editor instead. The result is the same.

## Change settings

Effect settings are `VolumeParameter` objects rather than plain numbers, so read and write them through `.value`:

```ts
bloom.threshold.value = 0.9;
bloom.intensity.value = 1.4;
```

The extra step is what lets a setting be animated or blended between one set of values and another.

You can also pass values when the component is created. The constructor assigns them for you:

```ts
const bloom = context.scene.addComponent(BloomEffect, {
    threshold: 0.9,
    intensity: 1.4,
});
```

## Turn an effect on and off

An effect is a component, so use `enabled`:

```ts
bloom.enabled = false;
```

It leaves the stack while it's off and rejoins when you switch it back on.

The same applies to the object it sits on. Deactivating any object above it in the hierarchy deactivates the effect too, and the effect is removed from the stack for as long as that lasts:

```ts
// Everything under this object stops, including the effect.
group.visible = false;
```

That makes it easy to group a look: put several effects under one object and switch the whole set with it.

Removing the component with `destroy` takes it out of the stack for good.

## Reach the whole stack

`context.postprocessing` is the subsystem effects register with. Use it when you need the stack rather than one effect:

```ts
// Everything currently applied, in the order it runs.
for (const effect of context.postprocessing.effects) {
    console.log(effect);
}
```

It also exposes `addEffect` and `removeEffect`, which is what the effect components call for you, and `composer` for reaching the underlying [EffectComposer](https://github.com/pmndrs/postprocessing).

To switch everything off, disable the effect components. There is no single switch on the subsystem.

::: tip Needle Engine only downloads what you use
The post-processing library is a separate chunk, fetched the first time an effect component is added. A project with no effects never downloads that code at all — it isn't shipped in the page and left unused.
:::

## Available effects

Bloom, depth of field, ambient occlusion, colour adjustments, tonemapping, vignette, chromatic aberration, pixelation, sharpening, tilt shift and antialiasing all ship with the engine. See the [component reference](/docs/reference/components#postprocessing) for the full list.

Two settings are worth knowing about because they don't read the way you might expect:

- **`DepthOfField.aperture`** behaves like an f-stop. A **bigger** number is a smaller opening, and therefore **less** blur.
- **`DepthOfField.resolutionScale`** defaults to `1 / devicePixelRatio`. That is cheaper, but the upscale can leave coloured fringes along high-contrast edges. Set it to `1` if you see them.

## Write a custom effect

Any effect from the [postprocessing](https://github.com/pmndrs/postprocessing) library can become a Needle component. Extend `PostProcessingEffect` and implement two things: a `typeName`, and `onCreateEffect` returning the effect to add to the stack.

```ts
import {
    PostProcessingEffect,
    VolumeParameter,
    registerCustomEffectType,
    serializable,
    NEEDLE_ENGINE_MODULES,
    type EffectProviderResult,
} from "@needle-tools/engine";

export class Scanlines extends PostProcessingEffect {

    // Identifies the effect. It must be unique.
    get typeName(): string {
        return "Scanlines";
    }

    // Settings are VolumeParameters, so they can be edited in Unity and
    // Blender and animated at runtime.
    @serializable(VolumeParameter)
    readonly density: VolumeParameter = new VolumeParameter(1.25);

    onCreateEffect(): EffectProviderResult {
        // Take the library from the engine's module registry. It is already
        // loaded by the time an effect is created, and importing it directly
        // would pull the whole library into your bundle.
        const { ScanlineEffect } = NEEDLE_ENGINE_MODULES.POSTPROCESSING.MODULE;

        // Build it from the current parameter values, so anything set before
        // the effect existed is respected.
        const effect = new ScanlineEffect({ density: this.density.value });

        // Then keep it in sync with later changes.
        this.density.onValueChanged = v => effect.density = v;

        return effect;
    }
}

// Lets the effect be restored from a volume profile exported by Unity or Blender.
registerCustomEffectType("Scanlines", Scanlines);
```

Add it like any built-in effect:

```ts
context.scene.addComponent(Scanlines, { density: 2 });
```

### Read the parameters when you create the effect

`onValueChanged` only fires on later assignments. Build the effect from `parameter.value`, as above, so values set before the effect existed still apply. Skipping this is the usual reason a custom effect ignores its settings.

### Control where it lands in the stack

Effects are applied in registration order unless you say otherwise. Set `order` relative to a built-in effect:

```ts
import { PostProcessingEffectOrder } from "@needle-tools/engine";

export class Scanlines extends PostProcessingEffect {
    order = PostProcessingEffectOrder.Bloom + 1;  // after bloom
}
```

### Per-frame work

`PostProcessingEffect` extends `Behaviour`, so the usual lifecycle methods are available. Use `update` for anything that has to run each frame:

```ts
update() {
    if (!this._effect) return;
    this._effect.time = this.context.time.time;
}
```

## Related

- [Scripting Walkthrough — Post-processing](/docs/tutorials/scripting-walkthrough#18-post-processing) — a live example with toggles
- [Component reference](/docs/reference/components#postprocessing) — every effect that ships with the engine
- [Postprocessing sample](https://samples.needle.tools/postprocessing)
- [postprocessing library](https://github.com/pmndrs/postprocessing) — the effects Needle builds on
