---
title: Convert C# Components to TypeScript
description: Use the C# to TypeScript package to automatically generate starter TypeScript code from existing Unity C# components for Needle Engine.
tags:
  - unity
  - csharp
  - typescript
  - migration
  - codegen
---

# Convert C# Components to TypeScript

Generate TypeScript scaffolding from your existing C# components using the **C# to TypeScript** package. It does **not** fully convert C# logic — instead it produces starter files with correct class structure, typed fields, and method stubs that serve as a starting point for porting your project to Needle Engine. This is the reverse of the [component compiler](/docs/explanation/core-concepts/component-compiler), which generates C# stubs from TypeScript.

:::warning Experimental
This package is **experimental**. Features and APIs may change. Please report issues on our [Discord](https://discord.needle.tools).
:::

:::tip When to use this
Use this package when you have an **existing Unity project with C# components** and want to port them to Needle Engine. It creates TypeScript scaffolding that you can then fill in with web-specific logic.
:::

:::info Not a full converter
This tool generates **starter files**, not fully converted logic. C# method bodies are stubbed out — you'll need to manually translate the implementation to TypeScript. Think of it as a head start, not a replacement for understanding the [C# to TypeScript differences](/docs/tutorials/fundamentals/c-sharp-to-typescript).
:::

---

## Installation

The package requires **Unity 2021.3+** and **Needle Engine for Unity**.

<needle-button
  large
  href="https://package-installer.needle.tools/v1/installer/Needle.tools/com.needle.csharp-to-typescript?registry=https://packages.needle.tools"
  same_tab
  >
  <strong>Install C# to TypeScript Package</strong>
</needle-button>

Or install manually via the **Unity Package Manager**:

1. Open **Window > Package Manager**
2. Click the **+** button and select **Add package by name...**
3. Enter `com.needle.csharp-to-typescript` and click **Add**

The Needle scoped registry must be configured in your project for the package to resolve. This is done automatically when you install Needle Engine for Unity.

**Dependencies** (resolved automatically): `com.needle.engine-exporter`, `com.unity.code-analysis`

---

## Usage

1. **Right-click** a C# script in the Unity Project window
2. Select the option to **generate TypeScript**
3. The generated `.ts` file is placed in your web project

The generated file includes:
- Class declaration extending `Behaviour`
- `@serializable()` decorated fields with mapped types
- Method stubs for all public methods
- Proper imports from `@needle-tools/engine` and `three`

---

## What Gets Converted

| C# Feature | TypeScript Output |
|---|---|
| Classes (`MonoBehaviour`) | `class extends Behaviour` |
| Structs | TypeScript class |
| Enums | TypeScript enum |
| `[SerializeField]` fields | `@serializable()` properties |
| Public properties | Typed properties with defaults |
| Public methods | Method stubs (empty bodies) |
| Unity types (`Vector3`, `Color`, etc.) | three.js / Needle Engine equivalents |

### Type Mappings

Common Unity-to-TypeScript type translations:

| Unity / C# Type | TypeScript / Needle Engine Type |
|---|---|
| `float`, `double`, `int` | `number` |
| `string` | `string` |
| `bool` | `boolean` |
| `Vector2` / `Vector3` / `Vector4` | `Vector2` / `Vector3` / `Vector4` (from `three`) |
| `Color` | `RGBAColor` |
| `Quaternion` | `Quaternion` (from `three`) |
| `GameObject` | `Object3D` (from `three`) |
| `Transform` | `Object3D` (from `three`) |
| `MonoBehaviour` | `Behaviour` |
| `UnityEvent` | `EventList` |
| `AudioClip` | `string` |
| `List<T>` / `T[]` | `T[]` |

---

## Example

Given this C# component:

::: code-tabs
@tab C# Input
```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float speed = 5f;
    [SerializeField] private Transform target;
    public bool isActive = true;

    void Update()
    {
        if (isActive && target != null)
        {
            transform.position = Vector3.MoveTowards(
                transform.position, target.position, speed * Time.deltaTime);
        }
    }
}
```
@tab Generated TypeScript
```ts
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

export class PlayerController extends Behaviour {
    @serializable()
    speed: number = 5;

    @serializable(Object3D)
    target?: Object3D;

    @serializable()
    isActive: boolean = true;

    update() {
        // TODO: implement movement logic
        // See: https://engine.needle.tools/docs/tutorials/fundamentals/c-sharp-to-typescript
    }
}
```
:::

The generated output gives you the correct class structure, typed fields, and serialization decorators. You then fill in the `update()` body using [Needle Engine APIs](/docs/tutorials/fundamentals/c-sharp-to-typescript#quick-reference-cheat-sheet).

---

## Tips for Porting

After generating your TypeScript stubs:

1. **Translate method bodies** — C# logic needs manual conversion. Refer to the [C# to TypeScript translation guide](/docs/tutorials/fundamentals/c-sharp-to-typescript) for common patterns (vectors, time, input, raycasting).

2. **Watch for value vs reference types** — C# structs like `Vector3` are value types (copied on assignment). In TypeScript, they're reference types. Use `.clone()` when you need a copy.

3. **Replace operators with methods** — TypeScript doesn't support operator overloading. `vector += other` becomes `vector.add(other)`.

4. **Update API calls** — Unity APIs translate to Needle Engine equivalents:
   | Unity | Needle Engine |
   |---|---|
   | `Time.deltaTime` | `this.context.time.deltaTime` |
   | `Input.GetMouseButtonDown(0)` | `this.context.input.getPointerDown(0)` |
   | `GetComponent<T>()` | `this.gameObject.getComponent(T)` |
   | `Debug.Log()` | `console.log()` |

5. **Use the component compiler going forward** — Once you've ported your components, new components should be written in TypeScript first. The [component compiler](/docs/explanation/core-concepts/component-compiler) will auto-generate C# stubs for the Unity Editor.

---

## Related

- [Automatic Component Generation](/docs/explanation/core-concepts/component-compiler) — The reverse: TypeScript → C# stub generation
- [C# to TypeScript Translation Guide](/docs/tutorials/fundamentals/c-sharp-to-typescript) — Language differences and API mappings
- [Create Components](/docs/how-to-guides/scripting/create-components) — Writing components from scratch
- [For Unity Developers](/docs/tutorials/fundamentals/for-unity-developers) — Complete learning path for Unity developers
