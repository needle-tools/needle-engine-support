---
title: Use Physics
description: Add realistic physics simulation with rigidbodies, colliders, and forces
---

# Use Physics

Learn how to add realistic physics simulation to your Needle Engine projects using the built-in Rapier physics engine.

:::tip When to Use Physics
- Realistic object movement and interactions
- Gravity and falling objects
- Collision detection and response
- Force-based movement (explosions, wind, throwing)
- Trigger zones for gameplay mechanics
:::

---

## Quick Start

Add physics to an object:

```ts
import { Behaviour, Rigidbody } from "@needle-tools/engine";

export class PhysicsExample extends Behaviour {
    start() {
        // Add a rigidbody component at runtime
        const rb = this.gameObject.addNewComponent(Rigidbody);

        // Configure physics properties
        rb.mass = 10;
        rb.drag = 0.5;
        rb.angularDrag = 0.5;

        console.log("Physics enabled!");
    }
}
```

:::tip Unity/Blender Setup
In most cases, you'll add Rigidbody and Collider components directly in Unity or Blender, not in code. The exported glTF will include these physics components automatically.
:::

---

## Rigidbodies

Rigidbodies add physics simulation to objects. They respond to forces, gravity, and collisions.

### Basic Rigidbody

```ts
import { Behaviour, Rigidbody } from "@needle-tools/engine";

export class Ball extends Behaviour {
    private rigidbody?: Rigidbody;

    awake() {
        // Get the rigidbody component
        this.rigidbody = this.gameObject.getComponent(Rigidbody);
    }

    start() {
        if (this.rigidbody) {
            // Configure mass and drag
            this.rigidbody.mass = 5;
            this.rigidbody.drag = 0.1;
            this.rigidbody.angularDrag = 0.05;

            // Enable/disable gravity
            this.rigidbody.useGravity = true;
        }
    }
}
```

### Rigidbody Properties

| Property | Type | Description |
| --- | --- | --- |
| `mass` | number | Mass in kilograms (default: 1) |
| `drag` | number | Linear drag (air resistance) |
| `angularDrag` | number | Rotational drag |
| `useGravity` | boolean | Apply gravity force |
| `isKinematic` | boolean | Controlled by code, not physics |
| `lockRotation` | boolean | Prevent rotation from physics |

---

## Apply Forces

Move rigidbodies using physics forces:

### Impulse Force (Instant)

```ts
import { Behaviour, Rigidbody, serializable } from "@needle-tools/engine";
import { Vector3 } from "three";

export class Launcher extends Behaviour {
    @serializable()
    launchForce: number = 10;

    private rigidbody?: Rigidbody;

    awake() {
        this.rigidbody = this.gameObject.getComponent(Rigidbody);
    }

    launch() {
        if (this.rigidbody) {
            // Apply instant force upward
            const force = new Vector3(0, this.launchForce, 0);
            this.rigidbody.applyImpulse(force);

            console.log("Object launched!");
        }
    }
}
```

### Continuous Force

```ts
import { Behaviour, Rigidbody } from "@needle-tools/engine";
import { Vector3 } from "three";

export class Thruster extends Behaviour {
    private rigidbody?: Rigidbody;
    private thrust = 5;

    awake() {
        this.rigidbody = this.gameObject.getComponent(Rigidbody);
    }

    update() {
        if (this.rigidbody) {
            // Apply continuous upward force
            const force = new Vector3(0, this.thrust, 0);
            this.rigidbody.applyForce(force);
        }
    }
}
```

### Torque (Rotation)

```ts
import { Behaviour, Rigidbody } from "@needle-tools/engine";
import { Vector3 } from "three";

export class Spinner extends Behaviour {
    private rigidbody?: Rigidbody;

    awake() {
        this.rigidbody = this.gameObject.getComponent(Rigidbody);
    }

    start() {
        if (this.rigidbody) {
            // Apply rotational impulse around Y axis
            const torque = new Vector3(0, 10, 0);
            this.rigidbody.applyTorque(torque);
        }
    }
}
```

---

## Set Velocity Directly

Control rigidbody velocity:

```ts
import { Behaviour, Rigidbody } from "@needle-tools/engine";
import { Vector3 } from "three";

export class DirectMovement extends Behaviour {
    private rigidbody?: Rigidbody;

    awake() {
        this.rigidbody = this.gameObject.getComponent(Rigidbody);
    }

    update() {
        if (this.rigidbody) {
            // Set velocity directly
            const velocity = new Vector3(0, 0, 5); // Move forward at 5 m/s
            this.rigidbody.setVelocity(velocity);

            // Set angular velocity (rotation)
            const angularVel = new Vector3(0, 1, 0); // Spin around Y axis
            this.rigidbody.setAngularVelocity(angularVel);
        }
    }

    getSpeed(): number {
        // Get current speed
        return this.rigidbody?.getVelocity().length() ?? 0;
    }
}
```

---

## Kinematic Rigidbodies

Kinematic rigidbodies are controlled by code, not physics:

```ts
import { Behaviour, Rigidbody } from "@needle-tools/engine";
import { Vector3 } from "three";

export class Platform extends Behaviour {
    private rigidbody?: Rigidbody;
    private startPos = new Vector3();

    awake() {
        this.rigidbody = this.gameObject.getComponent(Rigidbody);
        this.startPos.copy(this.gameObject.position);
    }

    start() {
        if (this.rigidbody) {
            // Make kinematic - controlled by code
            this.rigidbody.isKinematic = true;
        }
    }

    update() {
        // Move platform with code
        const time = this.context.time.time;
        this.gameObject.position.y = this.startPos.y + Math.sin(time) * 2;

        // Kinematic rigidbodies still affect dynamic objects!
        // Objects will ride on this platform
    }
}
```

:::tip Kinematic Use Cases
- Moving platforms
- Elevators
- Doors
- Character controllers
- Anything that moves predictably but should affect other physics objects
:::

---

## Collision Detection

Detect when rigidbodies collide:

```ts
import { Behaviour, Collision, serializable } from "@needle-tools/engine";

export class Breakable extends Behaviour {
    @serializable()
    breakForce: number = 10;

    onCollisionEnter(col: Collision) {
        console.log("Hit by:", col.collider.gameObject.name);

        // Calculate impact force (approximate)
        const impact = this.estimateImpact(col);

        if (impact > this.breakForce) {
            console.log("Object broke from impact!");
            this.destroy();
        }
    }

    private estimateImpact(col: Collision): number {
        // Get relative velocity (simplified)
        return 5; // In real code, calculate from velocities
    }
}
```

### Collision Events

| Event | When Called |
| --- | --- |
| `onCollisionEnter` | Collision starts |
| `onCollisionStay` | Collision continues (every frame) |
| `onCollisionExit` | Collision ends |

**See:** [Physics Events Reference](/docs/reference/api/physics-events) for complete API

---

## Trigger Zones

Triggers detect objects without physical collision:

```ts
import { Behaviour, Collision, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

export class Checkpoint extends Behaviour {
    @serializable()
    nextCheckpoint?: Object3D;

    private activated = false;

    onTriggerEnter(col: Collision) {
        if (this.activated) return;

        // Check if player entered
        const player = col.collider.gameObject.getComponent(PlayerController);
        if (player) {
            this.activated = true;
            console.log("Checkpoint reached!");
            this.onCheckpointReached(player);
        }
    }

    private onCheckpointReached(player: PlayerController) {
        // Handle checkpoint logic
        player.setSpawnPoint(this.gameObject.position);
    }
}
```

:::tip Trigger vs Collision
- **Triggers:** Objects pass through (detection zones, pickups, checkpoints)
- **Collisions:** Physical response (solid walls, bouncing balls)

Mark colliders as "Is Trigger" in Unity/Blender to make them triggers.
:::

---

## Raycasting

Check for physics objects along a ray:

```ts
import { Behaviour, RaycastOptions } from "@needle-tools/engine";
import { Vector3 } from "three";

export class Scanner extends Behaviour {
    update() {
        const origin = this.gameObject.position;
        const direction = this.gameObject.forward;

        // Raycast using physics engine (tests against colliders)
        const options: RaycastOptions = {
            maxDistance: 10,
            precise: true,  // Use collider shapes
        };

        const hits = this.context.physics.engine.raycast(origin, direction, options);

        if (hits.length > 0) {
            console.log("Found object:", hits[0].object.name);
            console.log("Distance:", hits[0].distance);
        }
    }
}
```

**See:** [Perform Raycasting](./perform-raycasting) for complete guide

---

## Layers and Filtering

Use layers to control what collides with what:

```ts
import { Behaviour, Rigidbody } from "@needle-tools/engine";

export class LayeredObject extends Behaviour {
    awake() {
        // Set object layer
        this.gameObject.layers.set(1); // Layer 1
    }

    start() {
        const rb = this.gameObject.getComponent(Rigidbody);
        if (rb) {
            // Configure which layers this rigidbody collides with
            // (This is typically done in Unity/Blender physics settings)
        }
    }
}
```

:::tip Layer Configuration
Layer collision matrices are usually configured in Unity's Physics Settings or Blender's physics properties, not in code.
:::

---

## Physics Materials

Control friction and bounciness:

```ts
import { Behaviour, PhysicsMaterial } from "@needle-tools/engine";

export class BouncyBall extends Behaviour {
    start() {
        // Physics materials are typically set in Unity/Blender
        // But you can modify them at runtime:

        const collider = this.gameObject.getComponent(BoxCollider);
        if (collider?.physicsMaterial) {
            collider.physicsMaterial.bounciness = 0.9;  // Very bouncy
            collider.physicsMaterial.friction = 0.1;    // Low friction
        }
    }
}
```

---

## Character Controller Example

Complete physics-based character:

```ts
import { Behaviour, Rigidbody, serializable } from "@needle-tools/engine";
import { Vector3 } from "three";

export class PhysicsCharacter extends Behaviour {
    @serializable()
    moveSpeed: number = 5;

    @serializable()
    jumpForce: number = 8;

    private rigidbody?: Rigidbody;
    private isGrounded = false;

    awake() {
        this.rigidbody = this.gameObject.getComponent(Rigidbody);
    }

    start() {
        if (this.rigidbody) {
            // Configure for character
            this.rigidbody.lockRotation = true;  // Don't fall over
            this.rigidbody.drag = 2;             // Stop quickly
        }
    }

    update() {
        if (!this.rigidbody) return;

        const input = this.context.input;
        const velocity = this.rigidbody.getVelocity();

        // Horizontal movement
        const moveX = (input.getKey("d") ? 1 : 0) - (input.getKey("a") ? 1 : 0);
        const moveZ = (input.getKey("s") ? 1 : 0) - (input.getKey("w") ? 1 : 0);

        velocity.x = moveX * this.moveSpeed;
        velocity.z = moveZ * this.moveSpeed;

        // Jump
        if (input.getKeyDown("space") && this.isGrounded) {
            velocity.y = this.jumpForce;
        }

        this.rigidbody.setVelocity(velocity);

        // Check if grounded (simplified)
        this.checkGrounded();
    }

    private checkGrounded() {
        // Use raycast to check ground
        const origin = this.gameObject.position.clone();
        origin.y += 0.1;
        const direction = new Vector3(0, -1, 0);

        const hits = this.context.physics.raycast(origin, direction, {
            maxDistance: 0.2
        });

        this.isGrounded = hits.length > 0;
    }
}
```

---

## Performance Tips

### Reduce Physics Updates

```ts
// Don't do this every frame:
❌ this.gameObject.getComponent(Rigidbody);

// Cache it once:
✅ awake() {
    this.rigidbody = this.gameObject.getComponent(Rigidbody);
}
```

### Use Sleep

Physics objects automatically sleep when stationary. Don't wake them unnecessarily:

```ts
// This wakes the rigidbody:
rigidbody.setVelocity(new Vector3(0, 0, 0));

// This keeps it asleep:
if (rigidbody.getVelocity().length() > 0.1) {
    rigidbody.setVelocity(new Vector3(0, 0, 0));
}
```

### Simplify Colliders

- Use primitive colliders (box, sphere, capsule) instead of mesh colliders
- Mesh colliders are much slower, use sparingly
- For complex shapes, combine multiple primitive colliders

---

## Common Issues

### Object Falls Through Floor

**Problem:** Fast-moving objects pass through thin colliders

**Solution:** Enable Continuous Collision Detection (CCD) in Unity/Blender, or use thicker colliders

### Physics Feels Floaty

**Problem:** Movement doesn't feel responsive

**Solution:**
- Increase `drag` on rigidbody
- Use higher gravity (configure in Unity/Blender)
- Reduce `mass` for lighter feel

### Jittery Movement

**Problem:** Objects vibrate or jitter

**Solution:**
- Reduce `angularDrag` if spinning too much
- Check for multiple overlapping colliders
- Ensure colliders don't start intersecting

---

## Next Steps

**Learn more:**
- [Perform Raycasting](./perform-raycasting) - Cast rays for detection
- [Use Lifecycle Hooks](./use-lifecycle-hooks) - When to run physics code
- [Handle User Input](./handle-input) - Keyboard and pointer events
- [Browse all How-To Guides](/docs/how-to-guides/) - See all task-oriented guides

**Reference:**
- [Physics Events](/docs/reference/api/physics-events) - Collision/trigger events API
- [Component Reference](/docs/reference/components) - Built-in physics components
- [Rapier Physics](https://rapier.rs/) - Underlying physics engine
