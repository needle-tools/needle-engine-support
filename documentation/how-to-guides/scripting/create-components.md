---
title: Create Components
description: Write custom TypeScript/JavaScript components for Needle Engine
---

# Create Components

Learn how to create interactive components for Needle Engine using TypeScript or JavaScript.

:::tip Prerequisites
New to TypeScript? Start here:
- [TypeScript Essentials](../../tutorials/fundamentals/typescript-essentials) - Language fundamentals
- [Needle Engine for Unity Developers](../../tutorials/fundamentals/for-unity-developers) - Unity to web workflow
:::

---

## Quick Start

### Direct File Approach

Add a `.ts` or `.js` file to `src/scripts/` in your web project:

```
your-project/
└── src/
    └── scripts/
        └── MyFirstScript.ts  ← Add your component here
```

**Benefits:**
- Simple and direct
- Perfect for small projects
- Automatic hot reload

### Unity - NPM Definition Approach

Organize code into reusable npm packages using NPM Definition files:

1. In Unity: `Create > NPM Definition`
2. Right-click the NpmDef: `Create > TypeScript`
3. Write your component

**Benefits:**
- Modular code organization
- Share code between projects
- Standard npm package format

[Learn more about NPM Definitions](../../explanation/core-concepts/npm-modules)

---

## Your First Component

Create `src/scripts/Rotate.ts`:

```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class Rotate extends Behaviour
{
    @serializable()
    speed : number = 1;

    start(){
        // Logging is useful for debugging in the browser
        // Open the developer console (F12) to see your component's data
        console.log(this);
    }

    // update will be called every frame
    update(){
        this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
    }
}
```

**What happens next:**
- 🔄 **C# stub** (Unity) or **Blender panel** auto-generates on save
- ⚡ **Hot reload** in browser—no Unity recompilation needed
- 🚀 **Instant iteration**—see changes in ~1 second

---

## Component with Custom Function

```ts twoslash
import { Behaviour } from "@needle-tools/engine";

export class PrintNumberComponent extends Behaviour
{
    start(){
      this.printNumber(42);
    }

    private printNumber(myNumber : number){
        console.log("My Number is: " + myNumber);
    }
}
```

---

## Multiple Components Per File

You can export multiple components from one file:

```ts
export class MyComponent1 extends Behaviour { }
export class MyComponent2 extends Behaviour { }
```

---

## Component Architecture

Components attach to **three.js Object3D** instances:

- Access the Object3D: `this.gameObject`
- Access the scene: `this.context.scene`
- Access components: `this.gameObject.getComponent(Type)`

:::warning Visibility & Active State
Setting `visible = false` on an Object3D acts like Unity's `SetActive(false)`:
- Disables **all** components on this object and its children
- **No** update events called until `visible = true` again
- To hide visually without affecting components, disable the `Renderer` component instead
:::

---

## Serialization

To serialize custom types (not Number, Boolean, or String), use the `@serializable()` decorator:

```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

export class MyComponent extends Behaviour
{
    @serializable(Object3D)
    myTarget?: Object3D;

    @serializable()
    myNumber: number = 42;
}
```

[Learn more about serialization](../../explanation/core-concepts/serialization)

---

## Version Control

While generated C# components use the type name to produce stable GUIDs, we recommend checking in generated components in version control as a good practice.

---

## Next Steps

- [Use Lifecycle Hooks](./use-lifecycle-hooks) - awake, start, update methods
- [Handle User Input](./handle-input) - Mouse, touch, keyboard
- [Find Components](./find-components) - Query the scene graph
- [Use Coroutines](./use-coroutines) - Sequenced operations
- [Component Lifecycle Reference](../../reference/api/lifecycle-methods) - Complete API

---

## Need Help?

- [TypeScript Essentials](../../tutorials/fundamentals/typescript-essentials)
- [Scripting Examples](../../reference/scripting-examples)
- [API Documentation](https://engine.needle.tools/docs/api/latest)
- [Discord Community](https://discord.needle.tools)
