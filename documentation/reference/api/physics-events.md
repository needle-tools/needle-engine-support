---
title: Physics Event Methods
description: Reference for physics collision and trigger events
---

# Physics Event Methods

Respond to physics collisions and triggers (powered by Rapier physics engine).

---

## Event Methods

| Method | Parameters | When Called |
| --- | --- | --- |
| `onCollisionEnter` | `col: Collision` | Rigidbody **starts** colliding with another |
| `onCollisionStay` | `col: Collision` | Rigidbody **continues** colliding |
| `onCollisionExit` | `col: Collision` | Rigidbody **stops** colliding |
| `onTriggerEnter` | `col: Collision` | Collider **enters** a trigger zone |
| `onTriggerStay` | `col: Collision` | Collider **stays** in a trigger zone |
| `onTriggerExit` | `col: Collision` | Collider **exits** a trigger zone |

---

## Collision vs Trigger

**Collisions:**
- Require Rigidbody components
- Generate physical response (bounce, block)
- Used for solid objects that interact physically

**Triggers:**
- Mark collider as "Is Trigger" in Unity/Blender
- No physical response (objects pass through)
- Used for zones, pickups, detection areas

---

## Collision Object

The `Collision` parameter provides information about the collision:

```ts
interface Collision {
    // The other object involved in the collision
    collider: Collider;

    // Contact points (if available)
    contacts?: ContactPoint[];
}
```

---

## Example: Collision Detection

```ts
import { Behaviour, Collision } from "@needle-tools/engine";

export class Ball extends Behaviour {
    onCollisionEnter(col: Collision) {
        console.log("Ball hit:", col.collider.gameObject.name);
    }

    onCollisionStay(col: Collision) {
        // Called every frame while touching
    }

    onCollisionExit(col: Collision) {
        console.log("Ball stopped touching:", col.collider.gameObject.name);
    }
}
```

---

## Example: Trigger Zone

```ts
import { Behaviour, Collision } from "@needle-tools/engine";

export class TriggerZone extends Behaviour {
    onTriggerEnter(col: Collision) {
        console.log("Object entered zone:", col.collider.gameObject.name);

        // Check what type of object entered
        const player = col.collider.gameObject.getComponent(PlayerController);
        if (player) {
            this.onPlayerEntered(player);
        }
    }

    onTriggerExit(col: Collision) {
        console.log("Object exited zone:", col.collider.gameObject.name);
    }

    private onPlayerEntered(player: PlayerController) {
        // Handle player entering zone
    }
}
```

---

## Requirements

For physics events to work:

1. **GameObject must have a Collider component** (BoxCollider, SphereCollider, etc.)
2. **For collision events:** GameObject needs a Rigidbody component
3. **For trigger events:** Collider must be marked as "Is Trigger"

---

## Performance Tips

- Use triggers instead of collisions when physical response isn't needed
- Keep `onCollisionStay` and `onTriggerStay` logic lightweight (called every frame)
- Consider using layers to filter what collides with what

---

## Related

- [Lifecycle Methods](./lifecycle-methods) - Component lifecycle
- [Component Reference](../components/) - Built-in physics components
- [How to use Physics](../../how-to-guides/physics/) - Physics setup guide
