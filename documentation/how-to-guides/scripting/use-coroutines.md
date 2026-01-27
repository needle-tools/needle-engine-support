---
title: Use Coroutines
description: Run sequenced operations over time without blocking
---

# Use Coroutines

Learn how to use coroutines to run code over multiple frames, create delays, and sequence operations. Coroutines in Needle Engine are built on JavaScript generators and run on the main thread, pausing and resuming execution across frames without blocking.

:::tip Related Guide
If you're new to Needle Engine components, start with [Use Lifecycle Hooks](./use-lifecycle-hooks) to learn about `awake()`, `start()`, and `update()` methods. Coroutines are a complementary tool for time-based and sequenced operations.
:::

:::tip When to Use Coroutines
- Sequence operations with delays between them
- Animate values over time
- Wait for conditions to be met
- Run periodic tasks without update()
- Load resources with delays or retries
- Create smooth transitions and effects
:::

:::warning When NOT to Use Coroutines
For code that needs to run every frame (like continuous movement, rotation, or input handling), use the `update()` lifecycle method instead. See [Lifecycle Hooks](./use-lifecycle-hooks) for more details.
:::

---

## Quick Start

Basic component using a coroutine:

```ts
import { Behaviour, WaitForSeconds } from "@needle-tools/engine";

export class Spawner extends Behaviour {
    start() {
        // Start a coroutine
        this.startCoroutine(this.spawnRoutine());
    }

    *spawnRoutine() {
        while (true) {
            this.spawnEnemy();
            yield WaitForSeconds(2); // Wait 2 seconds
        }
    }

    private spawnEnemy() {
        console.log("Enemy spawned!");
    }
}
```

:::tip JavaScript Generators
Coroutines use JavaScript generator functions (`function*`). The `yield` keyword pauses execution and resumes on the next frame or after a wait. Unlike web workers or threads, coroutines run on the main thread—they don't create true parallelism but allow you to write sequential code that executes over time.
:::

---

## Wait Methods

Needle Engine provides several wait methods for coroutines:

### WaitForSeconds

Wait for a specific amount of time in seconds:

```ts
import { Behaviour, WaitForSeconds } from "@needle-tools/engine";

export class DelayedAction extends Behaviour {
    start() {
        this.startCoroutine(this.delayedMessage());
    }

    *delayedMessage() {
        console.log("Starting...");
        yield WaitForSeconds(3); // Wait 3 seconds
        console.log("3 seconds later!");
    }
}
```

### WaitForFrames

Wait for a specific number of frames:

```ts
import { Behaviour, WaitForFrames } from "@needle-tools/engine";

export class FrameDelay extends Behaviour {
    start() {
        this.startCoroutine(this.waitFrames());
    }

    *waitFrames() {
        console.log("Frame:", this.context.time.frameCount);
        yield WaitForFrames(60); // Wait 60 frames
        console.log("60 frames later:", this.context.time.frameCount);
    }
}
```

### yield null

Wait for the next frame:

```ts
*myRoutine() {
    console.log("Frame 1");
    yield null; // Wait one frame
    console.log("Frame 2");
    yield null; // Wait another frame
    console.log("Frame 3");
}
```

---

## Common Patterns

### Timed Display Updates

Update UI or text at regular intervals:

```ts
import { Behaviour, Text, serializable, WaitForSeconds } from "@needle-tools/engine";

export class DisplayTime extends Behaviour {
    @serializable(Text)
    text?: Text;

    onEnable() {
        this.startCoroutine(this.updateTime());
    }

    private *updateTime() {
        while (true) {
            if (this.text) {
                this.text.text = new Date().toLocaleTimeString();
            }
            yield WaitForSeconds(1); // Update every second
        }
    }
}
```

### Fade Effect

Smoothly animate values over time:

```ts
import { Behaviour, WaitForSeconds } from "@needle-tools/engine";

export class Fader extends Behaviour {
    fadeIn(duration: number = 1) {
        this.startCoroutine(this.fadeRoutine(0, 1, duration));
    }

    fadeOut(duration: number = 1) {
        this.startCoroutine(this.fadeRoutine(1, 0, duration));
    }

    *fadeRoutine(from: number, to: number, duration: number) {
        const startTime = this.context.time.time;

        while (true) {
            const elapsed = this.context.time.time - startTime;
            const t = Math.min(elapsed / duration, 1);

            const alpha = from + (to - from) * t;
            this.setOpacity(alpha);

            if (t >= 1) break;
            yield null; // Wait for next frame
        }
    }

    private setOpacity(alpha: number) {
        // Set material opacity
        console.log("Opacity:", alpha);
    }
}
```

### Delayed Sequence

Execute multiple actions with delays:

```ts
import { Behaviour, WaitForSeconds } from "@needle-tools/engine";

export class Sequencer extends Behaviour {
    start() {
        this.startCoroutine(this.playSequence());
    }

    *playSequence() {
        console.log("Action 1");
        yield WaitForSeconds(1);

        console.log("Action 2");
        yield WaitForSeconds(2);

        console.log("Action 3");
        yield WaitForSeconds(1);

        console.log("Sequence complete!");
    }
}
```

### Wait for Condition

Wait until a condition is met:

```ts
import { Behaviour, GameObject } from "@needle-tools/engine";

export class Waiter extends Behaviour {
    target?: GameObject;

    start() {
        this.startCoroutine(this.waitForTarget());
    }

    *waitForTarget() {
        console.log("Waiting for target...");

        // Wait until target exists
        while (!this.target) {
            yield null;
        }

        console.log("Target found!", this.target);
    }
}
```

### Periodic Task

Run a task repeatedly with delays:

```ts
import { Behaviour, WaitForSeconds } from "@needle-tools/engine";

export class PeriodicTask extends Behaviour {
    private _running = false;

    onEnable() {
        this._running = true;
        this.startCoroutine(this.periodicUpdate());
    }

    onDisable() {
        this._running = false;
    }

    *periodicUpdate() {
        while (this._running) {
            this.doTask();
            yield WaitForSeconds(5); // Every 5 seconds
        }
    }

    private doTask() {
        console.log("Task executed at:", new Date().toLocaleTimeString());
    }
}
```

---

## Stopping Coroutines

You can stop coroutines by storing the generator reference:

```ts
import { Behaviour, WaitForSeconds } from "@needle-tools/engine";

export class StoppableRoutine extends Behaviour {
    private _routine?: Generator;

    start() {
        this._routine = this.startCoroutine(this.myRoutine());
    }

    stopRoutine() {
        if (this._routine) {
            this.stopCoroutine(this._routine);
            this._routine = undefined;
        }
    }

    *myRoutine() {
        while (true) {
            console.log("Running...");
            yield WaitForSeconds(1);
        }
    }
}
```

:::tip Automatic Cleanup
Coroutines are automatically stopped when a component is disabled or destroyed, so you don't need to manually stop them in most cases.
:::

---

## Coroutines vs update()

When should you use coroutines instead of `update()`?

**Use Coroutines when:**
- You need delays between operations
- You're sequencing multiple steps
- You want code to run periodically (not every frame)
- You're waiting for conditions or events
- You need clearer, more readable sequential logic

**Use update() when:**
- You need to run code every frame
- You're doing continuous animation or movement
- You need maximum performance (less overhead)
- You're implementing physics or game logic that updates constantly

```ts
// ❌ Don't use update() for periodic tasks
update() {
    this._timer += this.context.time.deltaTime;
    if (this._timer >= 2) {
        this._timer = 0;
        this.doSomething();
    }
}

// ✅ Use coroutines instead
start() {
    this.startCoroutine(this.periodicTask());
}

*periodicTask() {
    while (true) {
        this.doSomething();
        yield WaitForSeconds(2);
    }
}
```

---

## Advanced: Nested Coroutines

You can yield other coroutines:

```ts
import { Behaviour, WaitForSeconds } from "@needle-tools/engine";

export class NestedRoutines extends Behaviour {
    start() {
        this.startCoroutine(this.mainRoutine());
    }

    *mainRoutine() {
        console.log("Starting main routine");

        // Wait for sub-routine to complete
        yield* this.subRoutine();

        console.log("Main routine complete");
    }

    *subRoutine() {
        console.log("Sub-routine started");
        yield WaitForSeconds(2);
        console.log("Sub-routine finished");
    }
}
```

---

## Best Practices

:::tip Do's
- Use coroutines for time-based sequences
- Stop coroutines when they're no longer needed
- Use meaningful variable names for wait times
- Check conditions before long operations
- Use `WaitForSeconds` for time-based delays
:::

:::warning Don'ts
- Avoid infinite loops without yields (will freeze)
- Don't use coroutines for every-frame updates
- Don't forget to yield in loops
- Avoid too many simultaneous coroutines (performance)
:::

---

## Next Steps

- [Use Lifecycle Hooks](./use-lifecycle-hooks) - awake, start, update methods
- [Handle User Input](./handle-input) - Mouse, touch, keyboard
- [Scripting Examples](/docs/reference/scripting-examples) - More code examples
- [Component API Reference](/docs/reference/api/lifecycle-methods) - Complete API

---
