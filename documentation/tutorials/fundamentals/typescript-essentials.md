---
title: TypeScript Essentials
description: Learn TypeScript basics for web development with Needle Engine
sidebarDepth: 2
---

# TypeScript Essentials

<logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript</logo-header> • <logo-header logo="/imgs/javascript-logo.webp" alt="JavaScript">JavaScript</logo-header>

Learn the fundamentals of TypeScript and JavaScript—the languages that power Needle Engine in the browser.

:::tip Coming from Unity?
If you're a Unity developer familiar with C#, check out [For Unity Developers](./for-unity-developers) for a comparison-focused guide.
:::

:::tip Already know TypeScript?
Skip ahead to [Needle Engine Scripting](/docs/how-to-guides/scripting/create-components) to start building!
:::

---

## What is TypeScript?

TypeScript is a programming language that adds **type safety** to JavaScript. It helps you catch errors before your code runs, making development faster and more reliable.

**Key benefits:**
- 🛡️ **Catch errors early** - Find mistakes while writing code, not after deployment
- 🔍 **Better editor support** - Autocomplete, inline documentation, refactoring tools
- 📚 **Self-documenting** - Types make code easier to understand and maintain
- 🌐 **Runs everywhere** - Compiles to JavaScript, works in all browsers

:::info How It Works
TypeScript code is **compiled to JavaScript** before running in the browser. The TypeScript compiler checks your code for errors during this compilation step, then outputs plain JavaScript that browsers can execute.
:::

---

## Learning Resources

**For beginners:**
- [TypeScript Tutorial](https://www.typescripttutorial.net/) - Step-by-step guide
- [Learn TypeScript](https://www.tutorialsteacher.com/typescript) - Interactive lessons

**Official documentation:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Complete reference

---

## JavaScript vs TypeScript

### <logo-header logo="/imgs/javascript-logo.webp" alt="JavaScript">JavaScript</logo-header>

JavaScript is the language that runs in all web browsers. It's **dynamically typed**, meaning:

**Example of JavaScript's flexibility:**
```js
let score = 100;              // score is a number
score = "one hundred";        // now it's text - no error!
score = score - 10;           // 💥 Crashes at runtime: can't subtract from text
```

This code is valid JavaScript syntax, but crashes when it runs in the browser.

**Characteristics:**
- ✅ Very flexible - variables can change types
- ❌ Errors only appear when code runs
- ❌ No autocomplete for object properties
- ❌ Easy to make typos that cause runtime crashes

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript</logo-header>

TypeScript adds **type checking** to JavaScript. It catches errors before your code runs:

**Same example in TypeScript:**
```ts
let score: number = 100;      // score must be a number
score = "one hundred";        // ❌ TypeScript error immediately!
score = score - 10;           // Never runs - error caught first
```

TypeScript shows you the error *while you type*, not when users visit your site.

**Characteristics:**
- ✅ Catches errors before deployment
- ✅ Full autocomplete and inline documentation
- ✅ Refactoring tools (rename symbols safely)
- ✅ Self-documenting code

:::tip Why We Use TypeScript
TypeScript helps you find bugs **before users do**. It's especially valuable for larger projects and teams, where catching errors early saves hours of debugging.
::: 

## Understanding Types

Types describe what kind of data a variable can hold. Think of them as labels that help prevent mistakes.

### Common Types

**Basic types:**
```ts
let score: number = 100;           // Numbers (integers, decimals)
let playerName: string = "Alice";  // Text
let isActive: boolean = true;      // true or false
let position: Vector3;             // Custom type from three.js
```

**Type inference** - TypeScript can figure out types automatically:
```ts
let score = 100;                   // TypeScript knows this is a number
score = "hello";                   // ❌ Error: can't assign text to number
```

### Why Types Matter

Types prevent common mistakes:

```ts
// Without types (JavaScript):
let health = 100;
health = "full";                   // No error until runtime crash!

// With types (TypeScript):
let health: number = 100;
health = "full";                   // ❌ Error immediately while typing!
```

:::warning Don't Bypass Type Safety
You might see `//@ts-ignore` or `any` types in code. These disable type checking and should be avoided—they remove the safety that TypeScript provides!
:::

### Type Annotations

Sometimes you need to explicitly declare a type:

```ts
// When TypeScript can't infer the type:
let player: Player;                // Declared but not assigned yet

// When you want to be explicit:
let speed: number = 10;            // Clear what type this should be
```

## Variables

Variables store data that your program can use and change. In TypeScript, you declare variables with `let` or `const`.

### `let` - Changeable Variables

Use `let` when the value will change:

```ts
let score = 0;              // Start at 0
score = 10;                 // Update to 10
score = score + 5;          // Add 5 → now 15
```

### `const` - Fixed Variables

Use `const` when the value shouldn't change:

```ts
const maxHealth = 100;      // Set once
maxHealth = 200;            // ❌ Error: can't reassign const
```

:::tip When to Use `const`
Use `const` by default. Only use `let` when you know the variable needs to change. This makes your code clearer and prevents accidental changes.
:::

### `const` with Objects

`const` prevents *reassignment*, but you can still modify object properties:

```ts
import { Vector3 } from "three";

const position = new Vector3(0, 0, 0);
position.x = 100;           // ✅ OK: Modifying a property
position.y = 50;            // ✅ OK: Modifying another property

position = new Vector3();   // ❌ Error: Can't reassign the variable itself
```

:::warning Avoid `var`
You might see `var` in older JavaScript code. **Don't use it**—always use `let` or `const` instead. `var` has confusing scoping rules that cause bugs. [Learn why →](https://stackoverflow.com/a/11444416)
:::

## Imports & Modules

Modern JavaScript/TypeScript organizes code into **modules**—separate files that export and import functionality.

### Importing Code

To use code from another file or package, you import it:

**Named imports (most common):**
```ts
import { Vector3, Object3D } from 'three';
import { Behaviour, serializable } from '@needle-tools/engine';

// Now you can use these:
const position = new Vector3(0, 1, 0);
```

**Default imports:**
```ts
import MyComponent from './MyComponent';
```

**Namespace imports:**
```ts
import * as THREE from 'three';

// Access everything through the namespace:
const myVector = new THREE.Vector3(1, 2, 3);
```

### Exporting Code

To make your code available to other files, export it:

```ts
// Export a class
export class MyComponent extends Behaviour {
    // ...
}

// Export a function
export function calculateScore(points: number) {
    return points * 10;
}

// Export a constant
export const MAX_PLAYERS = 4;
```

:::tip Named vs Namespace Imports
**Named imports** are preferred—they're clearer and help build tools create smaller bundles. Use namespace imports only when you need many items from one package.
:::

## How Objects Work (References)

In JavaScript/TypeScript, when you assign an object to a variable, you're creating a **reference** (like a pointer or shortcut) to that object, not a copy.

### The Problem

```ts
import { Vector3 } from 'three';

const position = new Vector3(1, 2, 3);
const otherPosition = position;     // ⚠️ Creates a reference, not a copy!

otherPosition.x = 100;              // Modifies the original
console.log(position.x);            // 100 - both variables point to same object!
```

Both `position` and `otherPosition` refer to the **same object** in memory.

### The Solution: Clone Objects

To create a true copy, use `.clone()`:

```ts
import { Vector3 } from 'three';

const position = new Vector3(1, 2, 3);
const otherPosition = position.clone();  // ✅ Creates a new copy

otherPosition.x = 100;                   // Modifies only the copy
console.log(position.x);                 // Still 1 - original unchanged!
```

### When to Clone

Clone when you need an independent copy:

```ts
// ❌ Wrong: Modifies original
function movePlayer(position: Vector3) {
    position.x += 10;  // Changes the player's actual position!
}

// ✅ Right: Works with a copy
function calculateNextPosition(position: Vector3) {
    const newPos = position.clone();
    newPos.x += 10;  // Original unchanged
    return newPos;
}
```

:::tip Remember
- Simple types (`number`, `string`, `boolean`) are always copied
- Objects (including `Vector3`, arrays, custom classes) are **references**
- Use `.clone()` when you need an independent copy
:::

## Working with Vectors

Vectors represent positions, directions, and other 3D data. In Needle Engine, we use three.js vectors.

### Creating Vectors

```ts
import { Vector3 } from 'three';

const position = new Vector3(0, 1, 0);      // x, y, z coordinates
const direction = new Vector3(1, 0, 0);     // Points right
```

### Vector Math Operations

Unlike simple numbers, you can't use `+`, `-`, `*` operators with vectors. Use methods instead:

```ts
import { Vector3 } from 'three';

const position = new Vector3(1, 1, 1);

// Multiply by a number
position.multiplyScalar(2);                 // Now (2, 2, 2)

// Add another vector
position.add(new Vector3(5, 0, 0));         // Now (7, 2, 2)

// Subtract a vector
position.sub(new Vector3(1, 0, 0));         // Now (6, 2, 2)
```

### Common Vector Methods

```ts
import { Vector3 } from 'three';

const position = new Vector3(3, 4, 0);

// Get length (magnitude)
const distance = position.length();         // 5

// Normalize (make length = 1)
position.normalize();                       // Now (0.6, 0.8, 0)

// Distance between two points
const target = new Vector3(10, 4, 0);
const dist = position.distanceTo(target);  // 9.4
```

:::warning Methods Modify the Original
Most vector methods **change the original vector**. To keep the original, clone first:

```ts
const original = new Vector3(1, 2, 3);
const doubled = original.clone().multiplyScalar(2);  // Original unchanged
```
:::

## Comparing Values

JavaScript/TypeScript has two ways to check if values are equal: `===` and `==`.

### Strict Equality (`===`) - Use This!

Strict equality checks if values are **exactly** the same:

```ts
const score = 100;

score === 100       // ✅ true
score === "100"     // ❌ false (number vs string)
score === 99        // ❌ false

// Checking for null or undefined
const player = null;
player === null       // ✅ true
player === undefined  // ❌ false (different values)
```

### Loose Equality (`==`) - Rarely Needed

Loose equality performs **type conversion** before comparing:

```ts
const score = 100;

score == 100        // ✅ true
score == "100"      // ✅ true (converts string to number!)
0 == false          // ✅ true (converts false to 0!)
"" == false         // ✅ true (both convert to false!)

// Useful for checking both null AND undefined:
const player = null;
player == null      // ✅ true (matches both null and undefined)
```

### Comparison Table

| Expression | `===` (Strict) | `==` (Loose) |
| --- | --- | --- |
| `100 === 100` | ✅ true | ✅ true |
| `100 === "100"` | ❌ false | ✅ true |
| `0 === false` | ❌ false | ✅ true |
| `null === undefined` | ❌ false | ✅ true |

:::tip Always Use `===`
Use strict equality (`===`) by default. It's more predictable and avoids surprising type conversions. Only use `==` when you specifically need to check for both `null` and `undefined` together.
:::

## Functions and `this`

Functions are blocks of reusable code. In TypeScript, there are two ways to write them, and they handle `this` differently.

### Regular Functions

Traditional function syntax:

```ts
function greet(name: string) {
    return "Hello, " + name;
}

const message = greet("Alice");  // "Hello, Alice"
```

### Arrow Functions (Recommended)

Shorter syntax with automatic `this` binding:

```ts
const greet = (name: string) => {
    return "Hello, " + name;
}

// Even shorter for single expressions:
const greet = (name: string) => "Hello, " + name;
```

### The `this` Problem

In JavaScript, `this` can change depending on how a function is called. This causes problems with event handlers:

```ts
import { Behaviour } from "@needle-tools/engine";

export class Counter extends Behaviour {
    count = 0;

    // ❌ Problem: Regular function
    increment() {
        this.count++;  // 'this' might be undefined!
    }

    start() {
        // When used as event handler, 'this' is lost:
        button.addEventListener('click', this.increment);  // ❌ Breaks!
    }
}
```

### Solution: Arrow Functions

Arrow functions **automatically bind `this`** to your class:

```ts
import { Behaviour } from "@needle-tools/engine";

export class Counter extends Behaviour {
    count = 0;

    // ✅ Solution: Arrow function
    increment = () => {
        this.count++;  // 'this' always works correctly!
    }

    start() {
        // Arrow function keeps correct 'this':
        button.addEventListener('click', this.increment);  // ✅ Works!
    }
}
```

### When to Use Each

**Use arrow functions for:**
- Event handlers
- Callbacks
- Methods that need access to `this`

**Use regular functions for:**
- Top-level utility functions
- Functions that don't use `this`

```ts
// Utility function - regular function is fine
function calculateDistance(a: number, b: number) {
    return Math.abs(a - b);
}

// Event handler - use arrow function
class MyComponent extends Behaviour {
    onClick = () => {
        console.log(this);  // Works correctly
    }
}
```

:::tip Keep It Simple
**Use arrow functions for methods in your classes**—they're simpler and avoid `this` problems. You can always use regular functions for standalone utilities.
:::

---

## Quick Reference

Here's a cheat sheet of what you've learned:

```ts
// Variables
let changeable = 100;              // Use let for values that change
const fixed = 100;                 // Use const by default

// Types
let score: number = 100;
let name: string = "Alice";
let active: boolean = true;

// Imports
import { Vector3 } from 'three';
import { Behaviour } from '@needle-tools/engine';

// Vectors
const pos = new Vector3(0, 1, 0);
pos.add(new Vector3(1, 0, 0));     // Now (1, 1, 0)
const copy = pos.clone();          // Create independent copy

// Equality
if (score === 100) { }             // Use === (strict equality)

// Functions
const greet = (name: string) => {  // Arrow functions for methods
    return "Hello, " + name;
}
```

---

## What's Next?

Now that you understand TypeScript basics, you're ready to start building with Needle Engine!

**Start creating:**
- [Create Your First Component](/docs/how-to-guides/scripting/create-components) - Build interactive behaviors
- [Handle User Input](/docs/how-to-guides/scripting/handle-input) - Respond to mouse, touch, and keyboard
- [Use Lifecycle Hooks](/docs/how-to-guides/scripting/use-lifecycle-hooks) - Update loops and component lifecycle

**Explore more:**
- [How-To Guides](/docs/how-to-guides/) - Task-oriented guides for common scenarios
- [Scripting Examples](/docs/reference/scripting-examples) - Copy-paste code examples
- [API Reference](/docs/reference/) - Complete API documentation

**Coming from Unity?**
- [For Unity Developers](./for-unity-developers) - C# to TypeScript comparison guide
