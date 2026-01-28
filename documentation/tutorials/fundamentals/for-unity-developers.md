---
title: Needle Engine for Unity Developers
description: Complete guide for Unity developers learning Needle Engine - from Unity integration to TypeScript scripting
---

# <logo-header logo="/imgs/unity-logo.webp" alt="Unity">For Unity Developers</logo-header>

From <logo-header logo="/imgs/unity-logo.webp" alt="Unity"></logo-header><logo-header logo="/imgs/csharp-logo.webp" alt="C#">Unity</logo-header> to <logo-header logo="/imgs/threejs-logo.webp" alt="three.js">three.js</logo-header> with <logo-header logo="/imgs/needle-logo.webp" alt="Needle Engine">Needle Engine</logo-header>

Needle Engine provides tight integration with the Unity Editor, allowing developers and designers to work together in a familiar environment and deliver **fast, performant, and lightweight web experiences**.

**Who is this guide for?**
- Unity developers learning web development
- Web developers understanding Needle Engine's Unity integration
- Teams bridging Unity and three.js workflows

:::tip Getting Started
Make sure you have Needle Engine installed in Unity: [Unity Installation](/docs/unity/)
:::

---

## The Basics

### <logo-header logo="/imgs/threejs-logo.webp" alt="three.js">Built on three.js</logo-header>

Needle Engine is a 3D web engine built on [three.js](https://threejs.org/), one of the most popular WebGL rendering libraries.

**Key concept:** In Needle Engine, a `gameObject` **is** a three.js `Object3D`. These terms are interchangeable.

**Benefits:**
- Full three.js compatibility - use any three.js code or library
- Access to the entire three.js ecosystem
- No learning curve if you already know three.js

:::important How Needle Engine Works
Needle Engine does **NOT** compile C# code to WebAssembly.

**Instead:**
- Unity defines scene structure, components, and data
- Export process converts to glTF format
- TypeScript/JavaScript powers runtime behavior

**Why?** Fast iteration speed and maximum flexibility for web experiences. Read more: [Vision](../../explanation/core-concepts/vision) • [Technical Overview](../../explanation/architecture/technical-overview)
:::

:::details How to create a new Unity project with Needle Engine? (Video)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />
:::

---

## Learning Path

This tutorial is split into two focused guides to help you learn efficiently:

### 1. <logo-header logo="/imgs/unity-logo.webp" alt="Unity">Working with Unity Integration</logo-header>

**Start here** to understand how Needle Engine integrates with Unity:

- How the Unity workflow translates to web
- Creating and structuring components
- Understanding glTF export
- Managing web projects and packages
- Editor sync and hot reload

**[Read: Working with Unity Integration →](./unity-integration)**

**What you'll learn:**
- Unity Editor workflow with Needle Engine
- Component system and `@serializable` decorator
- GameObject/Object3D hierarchy and scene structure
- Type mappings (Unity → three.js)
- glTF export process (what gets exported, what doesn't)
- Web project structure on disk
- Package management (npm vs Unity Package Manager)
- Build tools and framework integration

---

### 2. <logo-header logo="/imgs/csharp-logo.webp" alt="C#">C#</logo-header> to <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript</logo-header> Translation

**Continue here** to translate your C# knowledge to TypeScript:

- Value types vs reference types (structs vs objects)
- Vector math without operator overloading
- Time, input, and raycasting APIs
- Debug logging and gizmos
- Common utility methods

**[Read: C# to TypeScript Translation →](./c-sharp-to-typescript)**

**What you'll learn:**
- Critical differences in how vectors work (copy vs reference)
- Using method calls instead of operators (`vector.add()` not `vector +`)
- Accessing time via `this.context.time`
- Input polling and event subscription
- Raycasting with and without physics
- Console logging and runtime gizmos
- Platform detection utilities

---

## Quick Reference

**Core Type Mappings:**

| Unity Type | Needle Engine Type | Notes |
| --- | --- | --- |
| `MonoBehaviour` | `Behaviour` | Base class for components |
| `GameObject` | `Object3D` | Same as three.js `Object3D` |
| `Transform` | `Object3D` | No separate Transform component |
| `Time.deltaTime` | `this.context.time.deltaTime` | Access via context |
| `Input` | `this.context.input` | Access via context |
| `Physics.Raycast` | `this.context.physics.raycast()` | Access via context |
| `UnityEvent` | `EventList` | Use `@serializable(EventList)` |
| `Color` | `RGBAColor` | Custom type with alpha |

:::tip Key Difference
In Unity, `position` is **world space** by default. In three.js/Needle Engine, `position` is **local space**.

Use `worldPosition` for world coordinates!
:::

---

## New to TypeScript?

If you're not familiar with TypeScript or JavaScript fundamentals, start here:

**[TypeScript Essentials →](./typescript-essentials)**

Learn the core language concepts:
- Variables (`let`, `const`, `var`)
- Functions and arrow functions
- Objects and classes
- Imports and modules
- How references work in JavaScript

---

## What's Next?

**After completing both guides:**

- [Create Components](../../how-to-guides/scripting/create-components) - Build interactive components
- [Lifecycle Methods](../../reference/api/lifecycle-methods) - Complete lifecycle API reference
- [Component Reference](../../reference/components) - Built-in components
- [Scripting Examples](../../reference/scripting-examples) - Code examples and patterns

**Additional Resources:**

- [three.js Documentation](https://threejs.org/docs/) - Core rendering library
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Language reference
- [Needle Engine Samples](https://engine.needle.tools/samples/) - Example projects
