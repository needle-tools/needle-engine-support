---
title: Time API
description: Reference for time and deltaTime in Needle Engine
---

# Time API

Access time data via `this.context.time` in components.

---

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `time` | `number` | Scaled time since app started (affected by `timeScale`) |
| `deltaTime` | `number` | Time since last frame (use for smooth animations) |
| `frameCount` | `number` | Total frames rendered since app started |
| `realtimeSinceStartup` | `number` | Unscaled time since app started (ignores `timeScale`) |
| `timeScale` | `number` | Time multiplier (default `1.0`, set to `0.5` for slow-motion) |

---

## Frame-Rate Independent Movement

:::tip Always Use deltaTime
Multiply movement by `deltaTime` for smooth, frame-rate independent animation:

```ts
this.gameObject.position.x += speed * this.context.time.deltaTime;
```
:::

---

## Examples

### Basic Movement

```ts
import { Behaviour } from "@needle-tools/engine";

export class MoveRight extends Behaviour {
    speed: number = 5;

    update() {
        // Move 5 units per second (frame-rate independent)
        this.gameObject.position.x += this.speed * this.context.time.deltaTime;
    }
}
```

---

### Rotation

```ts
import { Behaviour } from "@needle-tools/engine";

export class Rotate extends Behaviour {
    rotationSpeed: number = 90; // degrees per second

    update() {
        // Convert degrees to radians and rotate
        const radiansPerSecond = this.rotationSpeed * (Math.PI / 180);
        this.gameObject.rotateY(radiansPerSecond * this.context.time.deltaTime);
    }
}
```

---

### Time-Based Logic

```ts
import { Behaviour } from "@needle-tools/engine";

export class TimedSpawner extends Behaviour {
    spawnInterval: number = 2.0; // seconds
    private nextSpawnTime: number = 0;

    update() {
        // Check if enough time has passed
        if (this.context.time.time >= this.nextSpawnTime) {
            this.spawnObject();
            this.nextSpawnTime = this.context.time.time + this.spawnInterval;
        }
    }

    private spawnObject() {
        console.log("Spawning at time:", this.context.time.time);
    }
}
```

---

### Slow Motion Effect

```ts
import { Behaviour } from "@needle-tools/engine";

export class SlowMotionController extends Behaviour {
    start() {
        // Normal speed
        this.context.time.timeScale = 1.0;
    }

    enableSlowMotion() {
        // Half speed
        this.context.time.timeScale = 0.5;
    }

    disableSlowMotion() {
        // Back to normal
        this.context.time.timeScale = 1.0;
    }

    pause() {
        // Freeze time
        this.context.time.timeScale = 0.0;
    }
}
```

---

### Frame Counting

```ts
import { Behaviour } from "@needle-tools/engine";

export class FrameCounter extends Behaviour {
    update() {
        // Log every 60 frames
        if (this.context.time.frameCount % 60 === 0) {
            console.log("Frame:", this.context.time.frameCount);
            console.log("Time:", this.context.time.time);
        }
    }
}
```

---

### Real Time (Unscaled)

```ts
import { Behaviour } from "@needle-tools/engine";

export class RealTimeCounter extends Behaviour {
    update() {
        // This continues even if timeScale is 0
        const realTime = this.context.time.realtimeSinceStartup;
        console.log("Real seconds elapsed:", realTime);
    }
}
```

---

## Scaled vs Unscaled Time

| Property | Affected by timeScale? | Use For |
| --- | --- | --- |
| `time` | ✅ Yes | Game logic, animations |
| `deltaTime` | ✅ Yes | Movement, rotation |
| `realtimeSinceStartup` | ❌ No | Profiling, UI timers, cooldowns that shouldn't pause |

---

## Common Patterns

### Smooth Lerp

```ts
const alpha = 5.0 * this.context.time.deltaTime; // Lerp factor
this.gameObject.position.lerp(targetPosition, alpha);
```

### Clamp Movement Speed

```ts
const maxSpeed = 10;
const movement = speed * this.context.time.deltaTime;
const clampedMovement = Math.min(movement, maxSpeed * this.context.time.deltaTime);
```

---

## Best Practices

### ✅ DO
- Always use `deltaTime` for movement and animations
- Use `time` for time-based triggers
- Use `realtimeSinceStartup` for UI timers
- Cache `this.context.time` if accessing multiple properties

### ❌ DON'T
- Don't use fixed values for movement (not frame-rate independent)
- Don't forget to multiply by `deltaTime`
- Don't use `Date.now()` for game logic (use `context.time`)

---

## Related

- [Lifecycle Methods](./lifecycle-methods) - When to use time
- [Component Creation](../../how-to-guides/scripting/create-components) - Basic components
- [Coroutines](../../how-to-guides/scripting/use-coroutines) - Time-based sequences
