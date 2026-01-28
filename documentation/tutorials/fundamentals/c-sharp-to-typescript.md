---
title: C# to TypeScript Translation Guide
description: Translate your C# knowledge to TypeScript for Needle Engine
---

# <logo-header logo="/imgs/csharp-logo.webp" alt="C#">C#</logo-header> to <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript</logo-header>

Translate your Unity C# knowledge to TypeScript for web development with Needle Engine.

:::tip New to TypeScript?
Start with [TypeScript Essentials](./typescript-essentials) for core language concepts without C# comparisons.
:::

---

## Value Types vs Reference Types

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">C# - Value Types (Structs)</logo-header>

In C#, `Vector3` is a **struct** (value type)—it gets **copied** when passed to methods:

```csharp
void MyCallerMethod() {
    var position = new Vector3(0, 0, 0);
    MyExampleVectorMethod(position);
    Debug.Log("Position.x is " + position.x); // ✅ Still 0 (copy was modified)
}

void MyExampleVectorMethod(Vector3 position) {
    position.x = 42; // Modifies the COPY, not the original
}
```

**Key behavior:** Assignment creates a copy:
```csharp
var myVector = new Vector3(1, 1, 1);
var myOtherVector = myVector;  // Creates a COPY
myOtherVector.x = 42;
// Logs: 1, 42 (two separate instances)
Debug.Log(myVector.x + ", " + myOtherVector.x);
```

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript - Reference Types (Objects)</logo-header>

In JavaScript/TypeScript, **all objects are reference types**—including `Vector3`:

```ts
import { Vector3 } from 'three'

function myCallerMethod() {
    const position = new Vector3(0, 0, 0);
    myExampleVectorMethod(position);
    console.log("Position.x is " + position.x); // ⚠️ Now 42 (original modified!)
}

function myExampleVectorMethod(position: Vector3) {
    position.x = 42; // Modifies the ORIGINAL
}
```

**Key behavior:** Assignment creates a reference:
```ts
import { Vector3 } from 'three'

const myVector = new Vector3(1, 1, 1);
const myOtherVector = myVector;  // Creates a REFERENCE
myOtherVector.x = 42;
// Logs: 42, 42 (same instance!)
console.log(myVector.x, myOtherVector.x);
```

:::warning Critical Difference!
In TypeScript, **modifying a Vector modifies the original**. To create a copy, use `.clone()`:

```ts
const myVector = new Vector3(1, 1, 1);
const myOtherVector = myVector.clone(); // ✅ Creates a true copy
myOtherVector.x = 42;
// Logs: 1, 42 (two separate instances)
console.log(myVector.x, myOtherVector.x);
```
:::

---

## Vector Math & Operators

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">C# - Operator Overloading</logo-header>

C# supports operator overloading for vectors:

```csharp
var myVector = new Vector3(1, 1, 1);
var myFactor = 100f;

myVector *= myFactor;          // ✅ Operators work
myVector = myVector + new Vector3(5, 0, 0);  // ✅ Addition works
// → myVector is now (105, 100, 100)
```

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript - Method Calls</logo-header>

JavaScript/TypeScript does **not** support operator overloading. Use methods instead:

```ts
import { Vector3 } from "three"

const myVector = new Vector3(1, 1, 1);
const myFactor = 100;

myVector.multiplyScalar(myFactor);           // Can't use *= operator
myVector.add(new Vector3(5, 0, 0));          // Can't use + operator
// → myVector is now (105, 100, 100)
```

### Common Vector Operations

| Operation | Unity (C#) | Needle Engine (TypeScript) |
| --- | --- | --- |
| Multiply | `vector *= 2` | `vector.multiplyScalar(2)` |
| Add | `vector += other` | `vector.add(other)` |
| Subtract | `vector -= other` | `vector.sub(other)` |
| Length | `vector.magnitude` | `vector.length()` |
| Normalize | `vector.normalized` | `vector.normalize()` |
| Distance | `Vector3.Distance(a, b)` | `a.distanceTo(b)` |

:::tip three.js Vector Methods
Most three.js vector methods **modify the original vector**. For immutable operations, clone first:

```ts
const result = myVector.clone().multiplyScalar(2); // Original unchanged
```
:::

---

## Time & Delta Time

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">Unity Time</logo-header>

```csharp
void Update() {
    transform.position.x += speed * Time.deltaTime;
    float currentTime = Time.time;
}
```

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">Needle Engine Time</logo-header>

Access time data via `this.context.time`:

```ts
update() {
    this.gameObject.position.x += this.speed * this.context.time.deltaTime;
    const currentTime = this.context.time.time;
}
```

### Property Mapping

| Unity (C#) | Needle Engine (TypeScript) | Description |
| --- | --- | --- |
| `Time.time` | `this.context.time.time` | Scaled time since app started |
| `Time.deltaTime` | `this.context.time.deltaTime` | Time since last frame |
| `Time.frameCount` | `this.context.time.frameCount` | Total frames rendered |
| `Time.realtimeSinceStartup` | `this.context.time.realtimeSinceStartup` | Unscaled time |
| `Time.timeScale` | `this.context.time.timeScale` | Time multiplier |

:::tip Frame-Rate Independent Movement
Always multiply movement by `deltaTime`:
```ts
this.gameObject.position.x += speed * this.context.time.deltaTime;
```
:::

[Read more about Time](../../how-to-guides/scripting/use-lifecycle-hooks#time)

---

## Raycasting

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">Unity Physics.Raycast</logo-header>

```csharp
if (Physics.Raycast(origin, direction, out RaycastHit hit, maxDistance)) {
    Debug.Log("Hit: " + hit.collider.name);
}
```

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">Needle Engine Raycast</logo-header>

```ts
// Screen-space raycast from mouse/touch
const hits = this.context.physics.raycast();
if (hits.length > 0) {
    console.log("Hit:", hits[0].object.name);
}

// Custom ray with options
const hits = this.context.physics.raycast({
    maxDistance: 100,
    lineOfSight: true
});

// Physics-based (requires colliders)
const hit = this.context.physics.engine?.raycast();
```

**Key differences:**
- Unity: Requires colliders for all raycasts
- Needle Engine: Default raycasts hit visible geometry, optional physics-based raycasts require colliders

[Read more about Raycasting](../../how-to-guides/scripting/perform-raycasting)

---

## Input

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">Unity Input</logo-header>

```csharp
void Update() {
    if (Input.GetMouseButtonDown(0)) {
        Debug.Log("Click!");
    }

    if (Input.GetKey(KeyCode.Space)) {
        Debug.Log("Space pressed");
    }
}
```

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">Needle Engine Input</logo-header>

**Polling input state:**
```ts
update() {
    if (this.context.input.getPointerDown(0)) {
        console.log("Click!");
    }

    if (this.context.input.getKeyDown("Space")) {
        console.log("Space pressed");
    }
}
```

**Event subscription:**
```ts
import { InputEvents, NEPointerEvent } from "@needle-tools/engine";

onEnable() {
    this.context.input.addEventListener(InputEvents.PointerDown, this.onPointerDown);
}

onDisable() {
    this.context.input.removeEventListener(InputEvents.PointerDown, this.onPointerDown);
}

private onPointerDown = (evt: NEPointerEvent) => {
    console.log("Pointer down at:", evt.point);
}
```

[Read more about Input](../../how-to-guides/scripting/handle-input)

---

## InputSystem Callbacks

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">Unity IPointerClickHandler</logo-header>

```csharp
using UnityEngine.EventSystems;

public class Clickable : MonoBehaviour, IPointerClickHandler {
    public void OnPointerClick(PointerEventData eventData) {
        Debug.Log("Clicked!");
    }
}
```

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">Needle Engine Pointer Events</logo-header>

```ts
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class Clickable extends Behaviour {
    onPointerClick(args: PointerEventData) {
        console.log("Clicked at:", args.point);
    }
}
```

**Available events:**
- `onPointerDown`
- `onPointerUp`
- `onPointerEnter`
- `onPointerMove`
- `onPointerExit`
- `onPointerClick`

All receive a `PointerEventData` argument.

---

## Debug.Log

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">Unity Debug</logo-header>

```csharp
Debug.Log("Hello Unity");
Debug.LogWarning("Warning message");
Debug.LogError("Error message");
```

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">JavaScript Console</logo-header>

```ts
console.log("Hello web");
console.warn("Warning message");
console.error("Error message");

// Log multiple values
console.log("Score:", score, "Player:", player);
```

---

## Debug Gizmos

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">Unity Gizmos</logo-header>

```csharp
void OnDrawGizmos() {
    Gizmos.color = Color.red;
    Gizmos.DrawWireSphere(transform.position, 1.0f);
    Gizmos.DrawLine(start, end);
}
```

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">Needle Engine Gizmos</logo-header>

```ts
import { Gizmos, isDevEnvironment } from "@needle-tools/engine";

update() {
    if (isDevEnvironment()) {
        Gizmos.DrawWireSphere(this.gameObject.position, 1.0, 0xff0000, 1);
        Gizmos.DrawLine(start, end, 0x00ff00, 0);
    }
}
```

**Key differences:**

| Unity | Needle Engine |
| --- | --- |
| `OnDrawGizmos()` method | Call `Gizmos` from **anywhere** |
| `OnDrawGizmosSelected()` | Use `if(isDevEnvironment())` to filter |
| Only in Editor | Visible in browser (filter for production!) |

**Available methods:**
- `DrawArrow` - Arrow between two points
- `DrawBox` / `DrawBox3` - Wireframe boxes
- `DrawDirection` - Direction arrow from origin
- `DrawLine` - Line between two points
- `DrawRay` - Infinite ray from origin
- `DrawSphere` / `DrawWireSphere` - Solid/wireframe spheres

[See full Gizmos API](../../how-to-guides/scripting/use-gizmos)

---

## Useful Utility Methods

### Common Unity Methods

| Unity (C#) | Needle Engine (TypeScript) |
| --- | --- |
| Check if in Editor | `#if UNITY_EDITOR` | `isDevEnvironment()` |
| Get URL parameter | N/A | `getParam("debug")` |
| Check mobile device | `Application.isMobilePlatform` | `DeviceUtilities.isMobileDevice()` |
| Check iOS | `Application.platform == RuntimePlatform.IPhonePlayer` | `DeviceUtilities.isiOS()` |

**Example:**
```ts
import { getParam, isDevEnvironment, DeviceUtilities } from "@needle-tools/engine";

// Check URL parameter
if (getParam("debug")) {
    console.log("Debug mode enabled");
}

// Platform detection
if (DeviceUtilities.isMobileDevice()) {
    // Mobile-specific logic
}

// Development vs production
if (isDevEnvironment()) {
    // Show debug UI, gizmos, etc.
}
```

[Read more about Platform Detection](../../how-to-guides/scripting/detect-mobile-devices)

---

## Quick Reference Cheat Sheet

| Task | Unity (C#) | Needle Engine (TypeScript) |
| --- | --- | --- |
| **Component** | `MonoBehaviour` | `Behaviour` |
| **GameObject** | `GameObject` | `Object3D` |
| **Transform** | `transform.position` | `this.gameObject.position` |
| **World Position** | `transform.position` | `this.gameObject.worldPosition` |
| **Find Component** | `GetComponent<T>()` | `getComponent(T)` |
| **Time** | `Time.deltaTime` | `this.context.time.deltaTime` |
| **Input** | `Input.GetMouseButtonDown(0)` | `this.context.input.getPointerDown(0)` |
| **Raycast** | `Physics.Raycast(...)` | `this.context.physics.raycast(...)` |
| **Debug Log** | `Debug.Log(...)` | `console.log(...)` |
| **Gizmos** | `OnDrawGizmos()` | `Gizmos.Draw...()` |
| **Vector Add** | `vector += other` | `vector.add(other)` |
| **Vector Multiply** | `vector *= 2` | `vector.multiplyScalar(2)` |

---

## What's Next?

**Continue learning:**
- [Working with Unity Integration](./unity-integration) - Unity workflow and glTF export
- [Create Components](../../how-to-guides/scripting/create-components) - Build interactive components
- [Lifecycle Methods](../../reference/api/lifecycle-methods) - Complete lifecycle API

**Reference:**
- [TypeScript Essentials](./typescript-essentials) - Core TypeScript/JavaScript concepts
- [Component Reference](../../reference/components) - Built-in components
- [Scripting Examples](../../reference/scripting-examples) - Code examples
