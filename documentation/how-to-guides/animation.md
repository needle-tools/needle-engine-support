---
title: Play Animations
description: Play and control animations in Needle Engine — with the Animation component, Animator, or Timeline, authored in Unity/Blender without code or driven from TypeScript.
---

# Play Animations

Needle Engine has several ways to play animations, and **most of them need no code** — you author them in Unity or Blender and they just work on the web. Pick the approach that matches your content, then trigger it from the editor, from UI, or from code.

## Which approach should I use?

| Approach | Best for | No-code in editor? | Trigger from UI? |
| --- | --- | --- | --- |
| **`Animation` component** | A single clip, or a few clips you start one at a time | Yes | Yes (Button → `play`) |
| **`Animator` / `AnimatorController`** | Multiple states (idle → walk → run, or step 1 → 2 → 3) with conditions, blending, and chained playback | Yes | Yes (set parameters) |
| **Timeline (`PlayableDirector`)** | A **sequence** of clips that play one after another, with **synced audio**, camera moves, activation, and other tracks | Yes | Yes (Button → `play`) |
| **Everywhere Actions (`PlayAnimationOnClick`)** | No-code click-to-play that also works in AR / USDZ on iOS | Yes | Click on object |
| **Code (`animation.play()`, builders)** | Fully custom or runtime-generated sequences | — | Yes (call from code) |

For most "play this, then that" needs — especially with audio — reach for **Timeline** before writing your own sequencing code.

---

## Author animations in the editor (no code)

All three core animation components are exported from Unity and Blender. You set them up in the editor and they run on the web unchanged — no TypeScript required.

### Animation component

For basic playback of one or a few clips.

1. Add an `Animation` component to your animated object.
2. Assign your animation clip(s). Add more to the `clips` array if needed (by default only the first plays automatically).
3. Enable `playAutomatically` to start on load, or leave it off and trigger later.

### Animator + AnimatorController

For multiple states with transitions, conditions, and blending — characters (idle/walk/run) or step-by-step sequences.

1. Create an `AnimatorController` asset and add states for each animation.
2. Add parameters (bool, float, int, trigger) and connect states with transitions and conditions.
3. Add an `Animator` component to your object and assign the controller.

In Unity you author this in the Animator window; in Blender, via the AnimatorController editor. See [Animation Workflows in Blender](/docs/blender/animation#animatorcontroller-state-machine-animations) for a Blender walkthrough.

### Timeline (PlayableDirector)

For coordinated, choreographed sequences — multiple clips one after another, audio tracks, camera moves, and object activation, all on one shared timeline.

- **Unity:** Build a Timeline asset and add a `PlayableDirector` component referencing it. Needle Engine translates [Unity's Timeline](https://unity.com/features/timeline) into a web-ready format, including animation and audio tracks.
- **Blender:** Author NLA tracks, then add a `PlayableDirector` component and list the objects whose NLA tracks should be exported. See [Animation Workflows → PlayableDirector](/docs/blender/animation#playabledirector-timeline-animation).

Leave `playOnAwake` off if you want the timeline to start only when triggered.

---

## Trigger animations from UI without code

You don't need a script to start an animation from a button:

- **`Button` component (`onClick`):** Wire the button's `onClick` event to a target component and method — for example call `play` on a `PlayableDirector`, or set a parameter on an `Animator`. This works for 3D and UI buttons.
- **Everywhere Actions — `PlayAnimationOnClick`:** Select an animation state from an `Animator` to play when the object is clicked, with an optional follow-up state. It works in the browser, in WebXR, **and** in interactive USDZ/QuickLook on iOS. See [Everywhere Actions](/docs/how-to-guides/everywhere-actions/).

---

## Play a sequence of animations with sound on a button press

This is a common request: *play several animations automatically one after another, with sound, starting when a button is pressed, and stop only once the whole sequence has finished.* The cleanest solution is a **Timeline** driven by a `PlayableDirector` — you generally don't need to write your own sequencing controller.

A Timeline lets you arrange animation clips and audio clips on tracks along one shared timeline. Because the order, timing, and audio are baked into the timeline, playing the whole sequence is a single call:

```ts
import { Behaviour, PlayableDirector, serializable } from "@needle-tools/engine";

export class PlaySequenceButton extends Behaviour {
    @serializable(PlayableDirector)
    timeline?: PlayableDirector;

    // Hook this up to a Button component's onClick in Unity/Blender,
    // or call it from your own HTML button.
    async playSequence() {
        if (!this.timeline || this.timeline.isPlaying) return;
        await this.timeline.play(); // resolves when the whole timeline finishes
    }
}
```

Why Timeline fits this use case:

- **Animations play in order automatically** — place clips on the track in sequence; no manual "play next when finished" chaining.
- **Audio is part of the timeline** — add an audio track and drop your sound clips where they should play. They stay in sync with the animations. Enable `waitForAudio` on the `PlayableDirector` if you want playback to wait for audio to load.
- **Triggered from UI** — wire a `Button` component's `onClick` to the director's `play` (no code), or call `play()` from a custom component as shown above. Leave `playOnAwake` disabled so it only starts on the button press.
- **Runs until complete** — `play()` returns a promise that resolves when the timeline reaches its end, so you can disable the button, show a "finished" state, or chain follow-up logic. Use `pause()` / `stop()` to interrupt.

A **state machine** is another good fit when the sequence is really "states that follow each other": use an `AnimatorController` with one state per animation and transitions between them. Each state can automatically advance to the next, and you can drive it from UI by setting parameters.

If you genuinely need custom logic between steps, you can still sequence the `Animation` component from code — `animation.play(clip)` returns a promise that resolves when that clip finishes, so you can `await` each one in turn. But for a fixed sequence with audio, Timeline is less code and easier to author for non-programmers.

---

## Control animations from code

When you do want code, every component exposes a runtime API.

**Animation component** — `play()` returns a promise that resolves when the clip finishes (it won't resolve while looping):

```ts
// Play clips one after another (clipA, clipB are AnimationClips)
await animation.play(clipA, { exclusive: true });
await animation.play(clipB, { exclusive: true });
```

**Animator** — set parameters or jump to a state:

```ts
animator.setBool("isWalking", true);
animator.setFloat("speed", 2.5);
animator.setTrigger("jump");
animator.play("Idle"); // play a state directly
```

**PlayableDirector** — control timeline playback, or scrub it manually:

```ts
timeline.play();
timeline.pause();
timeline.stop();

// Manual scrubbing (e.g. scroll-driven storytelling)
timeline.time = 5.0;  // seconds
timeline.evaluate();  // apply the new time while paused
```

For scroll-driven playback, the [`ScrollFollow`](/docs/how-to-guides/components/scroll-follow) component binds scroll position to a `PlayableDirector` without custom code.

---

## Create animations, timelines, and controllers from code

Needle Engine ships fluent **builder** utilities so you can construct animation clips, timelines, and `AnimatorController` state machines at runtime — no editor asset required. These are available as a **preview** in **Needle Engine 5.1+**: `TimelineBuilder`, `AnimatorControllerBuilder` (via `AnimatorController.build()`), and `AnimationBuilder`. They're ideal for procedural content, runtime-generated sequences, and tooling.

### Build a timeline (animations + audio) with `TimelineBuilder`

The most direct way to recreate the "several animations one after another, with synced sound, triggered by a button" use case entirely in code. Clips added to a track are placed back-to-back automatically (each `.clip()` advances a cursor), and an audio track plays alongside:

```ts
import { Behaviour, serializable, TimelineBuilder, PlayableDirector } from "@needle-tools/engine";
import { AnimationClip } from "three";

export class SequenceFromCode extends Behaviour {
    @serializable(AnimationClip)
    clips: AnimationClip[] = [];

    private director?: PlayableDirector;

    start() {
        // A PlayableDirector hosts the timeline we build
        this.director = this.gameObject.getComponent(PlayableDirector)
            ?? this.gameObject.addComponent(PlayableDirector);

        TimelineBuilder.create("Sequence")
            .animationTrack("Animation", this.gameObject)
                .clip(this.clips[0], { easeIn: 0.2 })
                .clip(this.clips[1])           // starts right after the previous clip
                .clip(this.clips[2])
            .audioTrack("Audio", this.gameObject)
                .clip("audio/intro.mp3", { start: 0, duration: 3, volume: 0.8 })
                .clip("audio/outro.mp3", { start: 3, duration: 2 })
            .signalTrack("Events")
                .signal(5, () => console.log("sequence reached 5s"))
            .install(this.director); // assigns the timeline; use .build() if you have no signal callbacks
    }

    // Call from a UI Button's onClick:
    async playSequence() {
        if (this.director && !this.director.isPlaying)
            await this.director.play(); // resolves when the whole timeline finishes
    }
}
```

`TimelineBuilder` supports `animationTrack`, `audioTrack`, `activationTrack` (show/hide objects), `controlTrack` (nested timelines), and `signalTrack`/`markerTrack` (fire callbacks at a time). Use `.build()` to get the timeline asset and assign it to `director.playableAsset` yourself, or `.install(director)` to assign it **and** wire up any `.signal()` callbacks.

### State machines with `AnimatorController`

If the sequence is better modeled as states that follow each other, build an `AnimatorController` from code instead.

**Chain clips into a sequence with `createFromClips`.** This turns each clip into a state and auto-transitions to the next — the quickest way to play several clips one after another:

```ts
import { AnimatorController, Animator } from "@needle-tools/engine";

// Each clip becomes a state; autoTransition advances to the next when finished
const controller = AnimatorController.createFromClips(myClips, {
    autoTransition: true,
    looping: false,
});

const animator = this.gameObject.getComponent(Animator) ?? this.gameObject.addComponent(Animator);
animator.runtimeAnimatorController = controller;
```

::: tip
With `autoTransition: true`, the **last** clip transitions back to the first, so the whole sequence loops. For a sequence that stops at the end, use the fluent builder below and leave the final state without an outgoing transition (or use a Timeline).
:::

**Build a full state machine fluently with `AnimatorController.build()`.** Add parameters, states, transitions, and conditions — ideal when the sequence should be driven by UI:

```ts
import { AnimatorController, Animator } from "@needle-tools/engine";

const controller = AnimatorController.build("Sequence")
    .triggerParameter("Play")
    .state("Idle", { clip: idleClip, loop: true })
    .state("Step1", { clip: step1Clip })
    .state("Step2", { clip: step2Clip })
    // Start the sequence when the "Play" trigger is set (e.g. from a button)
    .transition("Idle", "Step1", { duration: 0.1 })
        .condition("Play")
    // Advance automatically once each step finishes (exitTime = normalized 0-1)
    .transition("Step1", "Step2", { exitTime: 1, duration: 0.1 })
    .transition("Step2", "Idle", { exitTime: 1, duration: 0.1 })
    .build();

const animator = this.gameObject.getComponent(Animator) ?? this.gameObject.addComponent(Animator);
animator.runtimeAnimatorController = controller;

// Trigger the sequence from a UI Button's onClick, or from code:
animator.setTrigger("Play");
```

You can also set parameters with `animator.setBool(name, value)` / `setFloat(name, value)`, or jump straight to a state with `animator.play("Step1")`.

### Build standalone clips with `AnimationBuilder`

States and timeline tracks don't even need pre-existing clips — author keyframes inline with `.track()` on either builder, or build a standalone clip:

```ts
import { AnimationBuilder } from "@needle-tools/engine";

const slideClip = AnimationBuilder.create("Slide")
    .track(this.gameObject, "position", { from: [0, 0, 0], to: [2, 0, 0], duration: 1 })
    .build();
```

`AnimationBuilder.track()` supports position/scale/quaternion/rotation/visibility on objects, plus material, light, and camera properties — with either a keyframe array or a `{ from, to, duration }` tween shorthand.

---

## Related

- [Animation Workflows in Blender](/docs/blender/animation) — editor walkthroughs for Animation, AnimatorController, and Timeline (NLA)
- [Scripting Examples → Animation](/docs/reference/scripting-examples#animation) — more code snippets
- [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) — no-code, cross-platform interactions including iOS
- [Scroll Follow](/docs/how-to-guides/components/scroll-follow) — scroll-driven timeline playback
- [FAQ](/docs/reference/faq#animation) — common animation questions
