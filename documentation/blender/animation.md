---
title: Animation in Blender
description: Export and control animations from Blender to the web
---

# Animation Workflows

Needle Engine offers multiple ways to animate your 3D content on the web, from simple playback to complex state machines and timeline-based sequences.

---

## Simple Animation Component

For basic animation playback, use the `Animation` component.

**When to use:**
- Single animations that play on load
- Simple triggered animations
- Sequential animation clips

**Setup:**

1. Select your animated object in Blender
2. Add an `Animation` component (Needle Components panel)
3. Assign your animation clip
4. Enable `playAutomatically` to start on load

<video-embed limit_height src="/docs/blender/animation.mp4" />

:::tip Multiple Clips
Add additional clips to the `clips` array. By default, only the first clip plays automatically. Trigger others using custom TypeScript or UI buttons.
:::

---

## AnimatorController - State Machine Animations

For complex character animations or interactive state-based systems, use the **AnimatorController**.

<video-embed src="/docs/blender/animatorcontroller-web.mp4" />

*State machine animations for complex character control*

**When to use:**
- Character controllers with multiple states (idle, walk, run, jump)
- Interactive objects with different behaviors
- Complex animation blending and transitions
- Game-like mechanics

**What is an AnimatorController?**
- A visual state machine graph for managing animation transitions
- Define multiple animation states and conditions for switching between them
- Configure blend times and transition rules
- Perfect for character controllers, interactive objects, and game mechanics

---

### Creating an AnimatorController

**1. Open the Editor**

Use the `Editor Type` dropdown (top left of any panel) and select `AnimatorController`.

![Open AnimatorController editor](/blender/animatorcontroller-open.webp)

**2. Create or Select an Asset**

Click `+` to create a new AnimatorController or select from existing assets.

<video-embed limit_height max_height="188px" src="/blender/animatorcontroller-create.mp4" />

---

### Understanding the Graph

![AnimatorController graph overview](/blender/animatorcontroller-overview.webp)

**Graph Elements:**

1. **Create States** - Press `Shift+A` to add new animation states
2. **Parameters Node** - Appears automatically; defines conditions for transitions
3. **Animation States** - Orange state is the starting state (change via Properties panel)
4. **Transitions** - Configure in the Properties panel with conditions and blend settings

**Workflow:**

1. Create states for each animation (idle, walk, run, etc.)
2. Add parameters (bool, float, int, trigger) to control transitions
3. Connect states with transitions
4. Set conditions for when transitions should occur
5. Configure blend times for smooth transitions

---

### Using Your AnimatorController

**In Blender:**

1. Add an `Animator` component to the root of your animated object
2. Assign your AnimatorController asset to the component

![Assign AnimatorController to Animator](/blender/animatorcontroller-assigning.webp)

**Controlling from Code:**

```ts
import { Animator } from "@needle-tools/engine";

// Get the Animator component
const animator = this.gameObject.getComponent(Animator);

// Set parameters to trigger transitions
animator.setBool("isWalking", true);
animator.setFloat("speed", 2.5);
animator.setTrigger("jump");
```

**Controlling from UI:**

Use Button components to set animator parameters without code. In the button's `onClick` event, select your Animator and choose which parameter to set.

---

## PlayableDirector - Timeline Animation

Export Blender's **NLA Tracks** (Non-Linear Animation) directly to the web using the PlayableDirector component.

**When to use:**
- Cinematic sequences
- Scroll-driven storytelling
- Coordinated multi-object animations
- Timeline-based interactive experiences
- Complex choreographed scenes

**Setup:**

1. Create NLA tracks in Blender for your animated objects
2. Add a `PlayableDirector` component to any object
3. In the component settings, add objects to the `animation tracks` list
4. Needle Engine exports those objects' NLA tracks

![Timeline setup](/blender/timeline_setup.webp)

![Timeline tracks](/blender/timeline.webp)

---

### Controlling Timeline Playback

**From Code:**

```ts
import { PlayableDirector } from "@needle-tools/engine";

// Get the PlayableDirector
const timeline = this.gameObject.getComponent(PlayableDirector);

// Control playback
timeline.play();
timeline.pause();
timeline.stop();

// Jump to specific time
timeline.time = 5.0; // seconds

// Evaluate at current time
timeline.evaluate();
```

---

### Example: Scroll-Controlled Timeline

This script controls timeline playback with mouse scrolling - perfect for scroll-based storytelling:

```ts
import { Behaviour, PlayableDirector, serializable, Mathf } from "@needle-tools/engine";

export class ScrollTimeline extends Behaviour {

    @serializable(PlayableDirector)
    timeline?: PlayableDirector;

    @serializable()
    sensitivity: number = .5;

    @serializable()
    clamp: boolean = false;

    private _targetTime: number = 0;

    awake() {
        this.context.domElement.addEventListener("wheel", this.onWheel);
        if (this.timeline) this.timeline.pause();
    }

    private onWheel = (e: WheelEvent) => {
        if (this.timeline) {
            this._targetTime = this.timeline.time + e.deltaY * 0.01 * this.sensitivity;
            if (this.clamp) this._targetTime = Mathf.clamp(this._targetTime, 0, this.timeline.duration);
        }
    }

    update(): void {
        if (!this.timeline) return;
        const time = Mathf.lerp(this.timeline.time, this._targetTime, this.context.time.deltaTime / .3);
        this.timeline.time = time;
        this.timeline.pause();
        this.timeline.evaluate();
    }
}
```

**How it works:**
- Listens for mouse wheel events
- Smoothly interpolates timeline position
- Optional clamping to timeline duration
- Adjustable sensitivity

---

## Animation Tips & Best Practices

**Performance:**
- Use AnimatorController for characters with multiple states
- Use Animation component for simple one-off animations
- Use PlayableDirector for coordinated multi-object sequences

**Organization:**
- Name your animation clips clearly
- Group related animations in AnimatorController states
- Use consistent parameter names across AnimatorControllers

**Optimization:**
- Remove unused animation tracks before export
- Use lower frame rates for background animations
- Consider LOD (Level of Detail) for distant animated objects

---

## Next Steps

- **[Components Overview](/docs/blender/components)** - Learn about other interactive components
- **[Custom Components](/docs/how-to-guides/scripting/create-components)** - Write code to trigger animations
- **[Deployment](/docs/how-to-guides/deployment/)** - Publish your animated scenes

---

**Need Help?**
- [Discord Community](https://discord.needle.tools) - Ask questions about animation workflows
- [Forum](https://forum.needle.tools) - Share your animated projects
- [FAQ](/docs/reference/faq) - Common animation issues
