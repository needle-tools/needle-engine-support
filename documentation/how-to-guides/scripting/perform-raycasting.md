---
title: Perform Raycasting
description: Cast rays to detect objects and hit points in your scene
---

# Perform Raycasting

Learn how to cast rays through your scene to detect objects, find hit points, and implement custom interaction logic.

:::tip When to Use Raycasting
- Custom interaction detection beyond pointer events
- Line-of-sight checks (can A see B?)
- Projectile trajectories
- Ground detection for character placement
- Custom selection tools
:::

---

## Basic Raycasting

Cast a ray from a point in a direction:

```ts
import { Behaviour } from "@needle-tools/engine";
import { Vector3 } from "three";

export class BasicRaycast extends Behaviour {
    start() {
        // Set ray origin and direction
        const origin = new Vector3(0, 1, 0);
        const direction = new Vector3(0, 0, -1); // Forward

        // Cast ray using Needle's physics raycast
        const hits = this.context.physics.raycast(origin, direction);

        if (hits.length > 0) {
            const hit = hits[0];
            console.log("Hit object:", hit.object.name);
            console.log("Hit point:", hit.point);
            console.log("Distance:", hit.distance);
        }
    }
}
```

:::tip Use Needle's Raycast Method
**Always use `this.context.physics.raycast()`** instead of three.js `Raycaster` directly. Needle's method:
- Uses **Mesh BVH** acceleration for much faster raycasts against mesh geometry
- Provides consistent results across the engine
- For physics colliders specifically, use `this.context.physics.engine.raycast()`
:::

---

## Raycast from Camera

Cast a ray from the camera based on screen position:

```ts
import { Behaviour } from "@needle-tools/engine";
import { Vector3 } from "three";

export class CameraRaycast extends Behaviour {
    update() {
        const input = this.context.input;

        // Check if pointer was clicked
        if (input.getPointerPressed(0)) {
            // Get pointer position (normalized -1 to 1)
            const pointerPos = input.getPointerPositionRC(0);
            if (!pointerPos) return;

            const camera = this.context.mainCamera!;

            // Calculate ray from camera
            const origin = new Vector3();
            const direction = new Vector3();

            origin.setFromMatrixPosition(camera.matrixWorld);
            direction.set(pointerPos.x, pointerPos.y, 0.5)
                .unproject(camera)
                .sub(origin)
                .normalize();

            // Cast ray using Needle's physics raycast
            const hits = this.context.physics.raycast(origin, direction);

            if (hits.length > 0) {
                const hit = hits[0];
                console.log("Clicked on:", hit.object.name);
                console.log("World position:", hit.point);
            }
        }
    }
}
```

---

## Raycast Options

Configure raycasts with additional options:

```ts
import { Behaviour, RaycastOptions } from "@needle-tools/engine";
import { Vector3 } from "three";

export class RaycastWithOptions extends Behaviour {
    start() {
        const origin = new Vector3(0, 5, 0);
        const direction = new Vector3(0, -1, 0); // Down

        // Raycast options
        const options: RaycastOptions = {
            maxDistance: 100,        // Maximum ray distance
            precise: true,           // Use collider shapes (more accurate)
            testTriggers: false,     // Exclude trigger colliders
        };

        // Perform raycast with options
        const hits = this.context.physics.raycast(origin, direction, options);

        if (hits.length > 0) {
            const hit = hits[0];
            console.log("Hit object:", hit.object.name);
            console.log("Hit point:", hit.point);
            console.log("Hit normal:", hit.normal);
            console.log("Distance:", hit.distance);
        }
    }
}
```

### RaycastOptions

| Option | Type | Description |
| --- | --- | --- |
| `maxDistance` | number | Maximum ray distance (default: Infinity) |
| `precise` | boolean | Use physics colliders for more accurate results |
| `testTriggers` | boolean | Include trigger colliders in results |
| `layerMask` | number | Filter objects by layer mask |

---

## Line of Sight Check

Check if one object can "see" another:

```ts
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";

export class LineOfSight extends Behaviour {
    @serializable(Object3D)
    target?: Object3D;

    update() {
        if (!this.target) return;

        // Calculate direction to target
        const direction = new Vector3();
        direction.subVectors(this.target.position, this.gameObject.position);
        const distance = direction.length();
        direction.normalize();

        // Raycast to target
        const hits = this.context.physics.raycast(
            this.gameObject.position,
            direction,
            { maxDistance: distance }
        );

        // Check if we hit the target (or nothing blocking)
        if (hits.length === 0 || hits[0].object === this.target) {
            console.log("Target is visible!");
        } else {
            console.log("Target is blocked by:", hits[0].object.name);
        }
    }
}
```

---

## Ground Detection

Find the ground below an object:

```ts
import { Behaviour } from "@needle-tools/engine";
import { Vector3 } from "three";

export class GroundDetection extends Behaviour {
    update() {
        const origin = this.gameObject.position.clone();
        origin.y += 0.1; // Start slightly above

        const direction = new Vector3(0, -1, 0); // Downward

        const hits = this.context.physics.raycast(origin, direction, {
            maxDistance: 10
        });

        if (hits.length > 0) {
            const groundHeight = hits[0].point.y;
            console.log("Ground is at height:", groundHeight);

            // Snap object to ground
            this.gameObject.position.y = groundHeight;
        }
    }
}
```

---

## Raycast Against Specific Objects

Only test ray against specific objects by filtering the results:

```ts
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";

export class SelectiveRaycast extends Behaviour {
    @serializable(Object3D)
    targetObjects?: Object3D[];

    update() {
        if (!this.targetObjects || this.targetObjects.length === 0) return;

        const input = this.context.input;
        if (input.getPointerPressed(0)) {
            const pointerPos = input.getPointerPositionRC(0);
            if (!pointerPos) return;

            const camera = this.context.mainCamera!;
            const origin = new Vector3();
            const direction = new Vector3();

            origin.setFromMatrixPosition(camera.matrixWorld);
            direction.set(pointerPos.x, pointerPos.y, 0.5)
                .unproject(camera)
                .sub(origin)
                .normalize();

            // Cast ray
            const hits = this.context.physics.raycast(origin, direction);

            // Filter to only target objects
            for (const hit of hits) {
                if (this.targetObjects.includes(hit.object)) {
                    console.log("Hit target:", hit.object.name);
                    break;
                }
            }
        }
    }
}
```

---

## Filter by Layer

Use the `layerMask` option to control which layers are tested:

```ts
import { Behaviour, RaycastOptions } from "@needle-tools/engine";
import { Vector3 } from "three";

export class LayerRaycast extends Behaviour {
    start() {
        const origin = new Vector3(0, 1, 0);
        const direction = new Vector3(0, 0, -1);

        // Only test specific layers
        const options: RaycastOptions = {
            layerMask: 1 << 0 // Only layer 0
        };

        // Cast ray
        const hits = this.context.physics.raycast(origin, direction, options);

        console.log("Found", hits.length, "objects on layer 0");
    }
}
```

---

## Visualize Rays (Debug)

Draw debug lines to see your rays:

```ts
import { Behaviour, Gizmos } from "@needle-tools/engine";
import { Vector3, Color } from "three";

export class VisualizeRay extends Behaviour {
    update() {
        const origin = this.gameObject.position;
        const direction = this.gameObject.forward; // Forward direction
        const distance = 10;

        // Cast ray
        const hits = this.context.physics.raycast(origin, direction, {
            maxDistance: distance
        });

        // Draw ray
        const end = origin.clone().add(direction.clone().multiplyScalar(distance));

        if (hits.length > 0) {
            // Draw in red if hit
            Gizmos.DrawLine(origin, hits[0].point, new Color(1, 0, 0), 0.1);
        } else {
            // Draw in green if no hit
            Gizmos.DrawLine(origin, end, new Color(0, 1, 0), 0.1);
        }
    }
}
```

---

## Intersection Data

Raycasts return intersection data with useful information:

```ts
interface Intersection {
    // The hit point in world space
    point: Vector3;

    // Distance from ray origin
    distance: number;

    // The object that was hit
    object: Object3D;

    // Surface normal at hit point
    normal?: Vector3;

    // UV coordinates at hit point (if available)
    uv?: Vector2;

    // Face index that was hit (for meshes)
    faceIndex?: number;
}
```

---

## Performance Tips

### Use Needle's Built-in Raycast

**Always prefer `this.context.physics.raycast()`** over three.js `Raycaster`:

```ts
// ✅ FAST - Uses Mesh BVH acceleration
const hits = this.context.physics.raycast(origin, direction);

// ❌ SLOW - No BVH acceleration
const raycaster = new Raycaster();
raycaster.set(origin, direction);
const hits = raycaster.intersectObjects(scene.children, true);
```

Needle's built-in raycast is **significantly faster** because it:
- Uses **Mesh BVH** (Bounding Volume Hierarchy) for spatial acceleration
- Automatically optimizes for static vs dynamic objects
- Tests against mesh geometry efficiently

:::tip Physics Colliders
To raycast against physics colliders specifically, use `this.context.physics.engine.raycast()` instead.
:::

### Use Layers

Filter by layers to reduce tested objects:

```ts
const options: RaycastOptions = {
    layerMask: 1 << 1 // Only test layer 1
};
const hits = this.context.physics.raycast(origin, direction, options);
```

### Limit Ray Distance

Specify `maxDistance` to stop testing early:

```ts
const options: RaycastOptions = {
    maxDistance: 10 // Only check first 10 units
};
const hits = this.context.physics.raycast(origin, direction, options);
```

---

## Common Use Cases

### Custom Grabbing/Picking

```ts
import { Behaviour } from "@needle-tools/engine";
import { Object3D } from "three";

export class CustomPicker extends Behaviour {
    private pickedObject?: Object3D;

    update() {
        const input = this.context.input;

        if (input.getPointerPressed(0)) {
            const pointerPos = input.getPointerPositionRC(0);
            if (!pointerPos) return;

            const raycaster = this.context.physics.getRaycaster();
            raycaster.setFromCamera(pointerPos, this.context.mainCamera!);

            const hits = raycaster.intersectObjects(this.context.scene.children, true);
            if (hits.length > 0) {
                this.pickedObject = hits[0].object;
                console.log("Picked:", this.pickedObject.name);
            }
        }

        if (input.getPointerUp(0)) {
            this.pickedObject = undefined;
        }
    }
}
```

### Projectile Path

```ts
import { Behaviour } from "@needle-tools/engine";
import { Vector3 } from "three";

export class Projectile extends Behaviour {
    speed: number = 10;
    private velocity = new Vector3();

    start() {
        // Set initial velocity
        this.velocity.copy(this.gameObject.forward).multiplyScalar(this.speed);
    }

    update() {
        const dt = this.context.time.deltaTime;

        // Calculate movement this frame
        const movement = this.velocity.clone().multiplyScalar(dt);
        const distance = movement.length();
        const direction = movement.normalize();

        // Raycast along path
        const hits = this.context.physics.raycast(
            this.gameObject.position,
            direction,
            { maxDistance: distance }
        );

        if (hits.length > 0) {
            // Hit something!
            console.log("Projectile hit:", hits[0].object.name);
            this.destroy();
        } else {
            // Move forward
            this.gameObject.position.add(movement);
        }
    }
}
```

---

## Next Steps

**Learn more:**
- [Handle User Input](./handle-input) - Pointer and keyboard events
- [Use Physics](./use-physics) - Rigidbodies and colliders
- [Component Lifecycle](./use-lifecycle-hooks) - awake, start, update

**Reference:**
- [Input Event Methods](/docs/reference/api/input-events) - Pointer events API
- [Physics Events](/docs/reference/api/physics-events) - Collision events
- [three.js Raycaster](https://threejs.org/docs/#api/en/core/Raycaster) - Raycaster API
