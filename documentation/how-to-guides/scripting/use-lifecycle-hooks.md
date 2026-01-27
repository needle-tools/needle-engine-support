---
title: Use Lifecycle Hooks
description: Control when and how your component code runs
---

# Use Lifecycle Hooks

Learn how to use Needle Engine's lifecycle hooks to run code at the right time in your component's lifetime.

:::tip When to Use Lifecycle Hooks
- Initialize components when they're created
- Run code every frame for animation or gameplay
- React to component being enabled/disabled
- Clean up resources when components are destroyed
- Synchronize logic with rendering
:::

---

## Quick Start

Basic component with common lifecycle hooks:

```ts
import { Behaviour } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
    // Called when component is created
    awake() {
        console.log("Component created!");
    }

    // Called first frame after creation
    start() {
        console.log("Component started!");
    }

    // Called every frame
    update() {
        console.log("Frame update");
    }

    // Called when destroyed
    onDestroy() {
        console.log("Component destroyed");
    }
}
```

:::warning Performance
Only implement lifecycle methods you actually need! Empty `update()` methods on many components hurt performance.
:::

---

## Lifecycle Methods Overview

| Method | When Called | Common Uses |
| --- | --- | --- |
| `awake()` | Component created | Cache references, initialize variables |
| `onEnable()` | Component enabled | Subscribe to events, start processes |
| `start()` | First frame | Setup that needs other components |
| `earlyUpdate()` | Before update | Input processing, pre-calculations |
| `update()` | Every frame | Main game logic, movement, animation |
| `lateUpdate()` | After update | Camera following, final adjustments |
| `onBeforeRender()` | Before render | Last-minute visual updates |
| `onAfterRender()` | After render | Post-processing, statistics |
| `onDisable()` | Component disabled | Unsubscribe events, pause processes |
| `onDestroy()` | Component destroyed | Clean up resources, remove references |

**Full API:** [Lifecycle Methods Reference](/docs/reference/api/lifecycle-methods)

---

## Initialization: awake()

Called when the component is first created, before `start()`.

### Cache Component References

```ts
import { Behaviour } from "@needle-tools/engine";
import { MeshRenderer } from "three";

export class Example extends Behaviour {
    private renderer?: MeshRenderer;
    private otherComponent?: OtherComponent;

    awake() {
        // Cache references - do this once in awake, not every frame!
        this.renderer = this.gameObject.getComponent(MeshRenderer);
        this.otherComponent = this.gameObject.getComponent(OtherComponent);

        console.log("References cached");
    }
}
```

### Initialize Variables

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class Counter extends Behaviour {
    @serializable()
    startValue: number = 0;

    private currentCount = 0;

    awake() {
        // Initialize from serialized values
        this.currentCount = this.startValue;
    }
}
```

---

## Start Logic: start()

Called on the first frame after `awake()`, after all components' `awake()` has been called.

### Use Other Components

```ts
import { Behaviour } from "@needle-tools/engine";

export class Dependent extends Behaviour {
    private manager?: GameManager;

    awake() {
        // Find the manager
        this.manager = GameObject.findObjectOfType(GameManager);
    }

    start() {
        // Safe to use manager here - its awake() has been called
        if (this.manager) {
            this.manager.registerPlayer(this);
        }
    }
}
```

### Start Coroutines

```ts
import { Behaviour } from "@needle-tools/engine";

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

---

## Every Frame: update()

Called every frame. Use for main game logic.

### Movement

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class Mover extends Behaviour {
    @serializable()
    speed: number = 5;

    update() {
        // Use deltaTime for frame-rate independent movement
        const dt = this.context.time.deltaTime;
        this.gameObject.position.x += this.speed * dt;
    }
}
```

### Input Handling

```ts
import { Behaviour } from "@needle-tools/engine";

export class InputHandler extends Behaviour {
    update() {
        const input = this.context.input;

        // Check keyboard
        if (input.getKeyDown("space")) {
            this.jump();
        }

        // Check mouse
        if (input.getPointerPressed(0)) {
            this.shoot();
        }
    }

    private jump() {
        console.log("Jump!");
    }

    private shoot() {
        console.log("Shoot!");
    }
}
```

### Rotation

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class Rotator extends Behaviour {
    @serializable()
    rotationSpeed: number = 90; // Degrees per second

    update() {
        const dt = this.context.time.deltaTime;
        const radians = (this.rotationSpeed * dt) * (Math.PI / 180);
        this.gameObject.rotateY(radians);
    }
}
```

---

## Late Update: lateUpdate()

Called after all `update()` calls, before rendering. Perfect for cameras and final adjustments.

### Camera Following

```ts
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";

export class CameraFollow extends Behaviour {
    @serializable(Object3D)
    target?: Object3D;

    @serializable()
    followSpeed: number = 5;

    private offset = new Vector3(0, 2, -5);

    lateUpdate() {
        if (!this.target) return;

        // Follow target after it has moved in update()
        const targetPos = this.target.position.clone().add(this.offset);

        const dt = this.context.time.deltaTime;
        this.gameObject.position.lerp(targetPos, this.followSpeed * dt);

        // Look at target
        this.gameObject.lookAt(this.target.position);
    }
}
```

### Billboard Effect

```ts
import { Behaviour } from "@needle-tools/engine";

export class Billboard extends Behaviour {
    lateUpdate() {
        // Face camera after camera has moved
        const camera = this.context.mainCamera;
        if (camera) {
            this.gameObject.lookAt(camera.position);
        }
    }
}
```

---

## Enable/Disable: onEnable() & onDisable()

Called when component is enabled or disabled.

### Event Subscriptions

```ts
import { Behaviour } from "@needle-tools/engine";
import { InputEvents } from "@needle-tools/engine";

export class Clickable extends Behaviour {
    onEnable() {
        // Subscribe when enabled
        this.context.input.addEventListener(
            InputEvents.PointerDown,
            this.onPointerDown
        );
    }

    onDisable() {
        // Unsubscribe when disabled
        this.context.input.removeEventListener(
            InputEvents.PointerDown,
            this.onPointerDown
        );
    }

    private onPointerDown = () => {
        console.log("Pointer down!");
    }
}
```

### Pause/Resume

```ts
import { Behaviour } from "@needle-tools/engine";

export class Enemy extends Behaviour {
    private active = false;

    onEnable() {
        this.active = true;
        console.log("Enemy activated");
    }

    onDisable() {
        this.active = false;
        console.log("Enemy deactivated");
    }

    update() {
        if (!this.active) return;
        // Enemy logic...
    }
}
```

---

## Cleanup: onDestroy()

Called when component or GameObject is destroyed.

### Resource Cleanup

```ts
import { Behaviour } from "@needle-tools/engine";
import { Texture, Material } from "three";

export class TextureUser extends Behaviour {
    private customTexture?: Texture;
    private customMaterial?: Material;

    start() {
        // Create resources
        this.customTexture = new Texture();
        this.customMaterial = new Material();
    }

    onDestroy() {
        // Clean up to prevent memory leaks
        this.customTexture?.dispose();
        this.customMaterial?.dispose();

        console.log("Resources cleaned up");
    }
}
```

### Remove Global References

```ts
import { Behaviour } from "@needle-tools/engine";

export class Player extends Behaviour {
    start() {
        // Register globally
        GameManager.instance.registerPlayer(this);
    }

    onDestroy() {
        // Remove global reference
        GameManager.instance.unregisterPlayer(this);
    }
}
```

---

## Execution Order

Understanding the order lifecycle methods are called:

```
[Component Created]
  ↓
awake()           // All components
  ↓
onEnable()        // All components
  ↓
start()           // All components (first frame only)
  ↓
[Every Frame:]
  ↓
earlyUpdate()     // All components
  ↓
update()          // All components
  ↓
lateUpdate()      // All components
  ↓
onBeforeRender()  // All components
  ↓
[RENDER]
  ↓
onAfterRender()   // All components

[When Disabled:]
onDisable()

[When Destroyed:]
onDisable()
  ↓
onDestroy()
```

---

## Advanced: earlyUpdate()

Called before `update()`, useful for input processing:

```ts
import { Behaviour } from "@needle-tools/engine";
import { Vector2 } from "three";

export class InputProcessor extends Behaviour {
    private moveInput = new Vector2();

    earlyUpdate() {
        // Process input before other components need it
        const input = this.context.input;
        this.moveInput.x = (input.getKey("d") ? 1 : 0) - (input.getKey("a") ? 1 : 0);
        this.moveInput.y = (input.getKey("w") ? 1 : 0) - (input.getKey("s") ? 1 : 0);
        this.moveInput.normalize();
    }

    update() {
        // Use processed input
        const dt = this.context.time.deltaTime;
        this.gameObject.position.x += this.moveInput.x * dt;
        this.gameObject.position.z += this.moveInput.y * dt;
    }
}
```

---

## Advanced: onBeforeRender() & onAfterRender()

Called just before/after rendering:

### Update Shader Uniforms

```ts
import { Behaviour } from "@needle-tools/engine";
import { ShaderMaterial } from "three";

export class ShaderUpdater extends Behaviour {
    private material?: ShaderMaterial;

    awake() {
        const mesh = this.gameObject.getComponent(MeshRenderer);
        this.material = mesh?.material as ShaderMaterial;
    }

    onBeforeRender() {
        // Update shader just before render
        if (this.material?.uniforms) {
            this.material.uniforms.time.value = this.context.time.time;
        }
    }
}
```

### Gather Statistics

```ts
import { Behaviour } from "@needle-tools/engine";

export class FrameStats extends Behaviour {
    private frameCount = 0;
    private lastReportTime = 0;

    onAfterRender() {
        this.frameCount++;

        const time = this.context.time.time;
        if (time - this.lastReportTime > 1.0) {
            console.log("FPS:", this.frameCount);
            this.frameCount = 0;
            this.lastReportTime = time;
        }
    }
}
```

---

## Performance Best Practices

### ✅ DO

Cache component references in `awake()`:
```ts
awake() {
    this.rigidbody = this.gameObject.getComponent(Rigidbody);
}
```

Use `deltaTime` for frame-rate independence:
```ts
update() {
    const dt = this.context.time.deltaTime;
    this.gameObject.position.x += this.speed * dt;
}
```

Unsubscribe from events:
```ts
onDisable() {
    this.context.input.removeEventListener(InputEvents.PointerDown, this.callback);
}
```

### ❌ DON'T

Don't search every frame:
```ts
// BAD - very slow!
update() {
    const player = GameObject.findObjectOfType(Player);
}
```

Don't add empty methods:
```ts
// BAD - wastes performance
update() {
    // Empty!
}
```

Don't forget cleanup:
```ts
// BAD - memory leak!
start() {
    this.texture = new Texture();
}
// Missing onDestroy() to dispose texture
```

---

## Complete Example: Health System

Putting it all together:

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class Health extends Behaviour {
    @serializable()
    maxHealth: number = 100;

    @serializable()
    regenerateRate: number = 5;

    private currentHealth = 0;
    private isDead = false;

    // Initialize
    awake() {
        this.currentHealth = this.maxHealth;
    }

    // Register with manager
    start() {
        const manager = GameObject.findObjectOfType(GameManager);
        manager?.registerHealthComponent(this);
    }

    // Regenerate health
    update() {
        if (this.isDead) return;

        const dt = this.context.time.deltaTime;
        this.currentHealth = Math.min(
            this.currentHealth + this.regenerateRate * dt,
            this.maxHealth
        );
    }

    // Cleanup
    onDestroy() {
        const manager = GameObject.findObjectOfType(GameManager);
        manager?.unregisterHealthComponent(this);
    }

    // Public API
    takeDamage(amount: number) {
        if (this.isDead) return;

        this.currentHealth -= amount;

        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            this.isDead = true;
            this.onDeath();
        }
    }

    private onDeath() {
        console.log("Health depleted!");
        // Trigger death effects
    }

    getHealthPercent(): number {
        return this.currentHealth / this.maxHealth;
    }
}
```

---

## Next Steps

**Learn more:**
- [Handle User Input](./handle-input) - Process keyboard and pointer events
- [Use Physics](./use-physics) - Rigidbodies and collision events
- [Create Components](./create-components) - Component basics
- [Browse all How-To Guides](/docs/how-to-guides/) - See all task-oriented guides

**Reference:**
- [Lifecycle Methods](/docs/reference/api/lifecycle-methods) - Complete API reference
- [Time API](/docs/reference/api/time) - Access time and deltaTime
- [Input Events](/docs/reference/api/input-events) - Input event reference
