---
title: Typescript Essentials
description: Differences, similarities and key concepts of Typescript, Javascript and C#.
sidebarDepth: 2
---

# TypeScript Essentials

<logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript</logo-header> • <logo-header logo="/imgs/javascript-logo.webp" alt="JavaScript">JavaScript</logo-header> • <logo-header logo="/imgs/csharp-logo.webp" alt="C#">C#</logo-header>

This guide highlights key differences between C#, JavaScript, and TypeScript—essential knowledge for developers new to the web ecosystem.

:::important How Needle Engine Works
Needle Engine does **not** compile C# to WebAssembly or run C# code in the browser. Instead:

- **Unity/Blender editors** define your scene structure, components, and data
- **Export process** converts your scene hierarchy and component properties to glTF format
- **TypeScript/JavaScript** powers the runtime behavior in the browser

Think of C# scripts in Unity or Blender panels as **data structure definitions** that get exported. You'll write your runtime logic in TypeScript/JavaScript using Needle Engine's API.
:::

:::tip Already familiar with TypeScript and JavaScript?
Skip ahead to [Needle Engine Scripting](../scripting.html) to start building!
:::

## Learning Resources

- [TypeScript Tutorial](https://www.typescripttutorial.net/)
- [Learn TypeScript](https://www.tutorialsteacher.com/typescript)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## <logo-header logo="/imgs/csharp-logo.webp" alt="C#">vs</logo-header> <logo-header logo="/imgs/javascript-logo.webp" alt="JavaScript">vs</logo-header> <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">Key Differences</logo-header>


### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">C# (CSharp)</logo-header>

**Statically typed & compiled language**

- Code must be **compiled before** it runs (translated to IL/CIL)
- Compiler **enforces** rules and catches errors before runtime
- You'll get compiler errors in Unity if code violates C# rules
- **Cannot enter Play Mode** with compiler errors

### <logo-header logo="/imgs/javascript-logo.webp" alt="JavaScript">JavaScript</logo-header>

**Interpreted at runtime**

- Code runs directly in the browser without compilation
- Errors only appear **when that specific line executes**
- Example: `var points = 100; points += "hello world";` won't error until runtime
- More flexibility but less safety during development

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript</logo-header>

**JavaScript with type safety** (designed by Microsoft)

- **Compiles to JavaScript** for browser execution
- Adds **type annotations** for compile-time error checking
- Catches invalid assignments and method calls before runtime
- Best of both worlds: JavaScript flexibility + C# safety

:::tip Why TypeScript?
TypeScript helps you find errors **before deployment**, not after users report crashes. It's JavaScript with guardrails.
::: 

## Types & Type Safety

### JavaScript: No Type Guarantees

Vanilla JavaScript has **no concept of types**—a variable can change types at any time:

```js
let points = 100;           // number
points = new Vector3();     // now it's a Vector3
points = null;              // now it's null
points -= 1;                // 💥 Runtime error!
```

This is all valid JavaScript syntax, but crashes when executed.

### TypeScript: Compile-Time Type Checking

TypeScript solves this by adding type annotations:

```ts
let points: number = 100;
points = new Vector3();    // ❌ TypeScript error at compile time!
```

:::warning Don't Bypass Type Safety
While you *can* disable TypeScript checks with `//@ts-ignore` or `any` types, **this defeats the purpose**. Types help you catch errors before deployment—don't circumvent them!
:::

### Alternative: JSDoc for JavaScript

If you prefer vanilla JavaScript, you can add type annotations using [JSDoc](https://jsdoc.app/):

```js
/** @type {number} */
let points = 100;
```

## Variables

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">C# Variable Declaration</logo-header>

```csharp
int points = 100;           // Explicit type
var points = 100;           // Type inference (still strongly typed)
```

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript/JavaScript Variable Declaration</logo-header>

```ts
let points = 100;           // Reassignable variable
const points = 100;         // Cannot reassign (recommended when possible)
```

:::warning Avoid `var`
You might see `var` in older JavaScript code, but it's **not recommended**. Always use `let` or `const` instead. [Learn why →](https://stackoverflow.com/a/11444416)
:::

Please note that you *can* still assign values to variables declared with const if they are (for example) a custom type. Consider the following example:  

```ts twoslash
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition.x = 100; // Assigning x is perfectly fine
```
The above is perfectly fine Typescript code because you don't re-assign `myPosition` but only the `x` member of `myPosition`. On the other hand the following example would **not**  be allowed and cause a runtime or typescript error:  
```ts twoslash
// @errors: 2588
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition = new Vector3(100, 0, 0); // ⚠ ASSIGNING TO CONST IS NOT ALLOWED
```

## Imports & Modules

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">C# - Using Statements</logo-header>

In Unity, you import namespaces with `using` statements:

```csharp
using UnityEngine;
using System.Collections.Generic;

// Importing a specific type with an alias
using MonoBehaviour = UnityEngine.MonoBehaviour;
```

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript - Import Statements</logo-header>

In TypeScript, you import specific exports from packages:

**Named imports (recommended):**
```ts
import { Vector3, Object3D } from 'three';
import { Behaviour, serializable } from '@needle-tools/engine';
```

**Namespace imports:**
```ts
import * as THREE from 'three';
const myVector: THREE.Vector3 = new THREE.Vector3(1, 2, 3);
```

:::tip Which Import Style?
**Named imports** are preferred—they enable better tree shaking (smaller bundle sizes) and clearer dependencies. Use namespace imports only when you need many types from one package.
:::

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

myVector.multiplyScalar(myFactor);           // ❌ Can't use *= operator
myVector.add(new Vector3(5, 0, 0));          // ❌ Can't use + operator
// → myVector is now (105, 100, 100)
```

**Common vector operations:**

| Operation | C# | TypeScript |
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

## Equality Checks

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">C# - Single Equality Operator</logo-header>

```csharp
var playerIsNull = myPlayer == null;  // Simple equality check
```

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript - Loose vs Strict Equality</logo-header>

JavaScript/TypeScript has **two** equality operators:

**Strict equality (`===`)** - Recommended:
```ts
const playerIsNull = myPlayer === null;      // Only true if exactly null
const playerIsUndefined = myPlayer === undefined; // Only true if exactly undefined
```

**Loose equality (`==`)** - Less common:
```ts
const playerIsNullOrUndefined = myPlayer == null; // true for BOTH null and undefined
```

| Expression | `===` (Strict) | `==` (Loose) |
| --- | --- | --- |
| `null === null` | ✅ true | ✅ true |
| `undefined === undefined` | ✅ true | ✅ true |
| `null === undefined` | ❌ false | ✅ true |
| `0 === false` | ❌ false | ✅ true |
| `"" === false` | ❌ false | ✅ true |

:::tip Always Use `===`
Use strict equality (`===`) by default. Only use loose equality (`==`) when you specifically want to check for both `null` and `undefined`.

[Learn more about equality comparisons →](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
:::

## Events, Binding & `this`

### <logo-header logo="/imgs/csharp-logo.webp" alt="C#">C# - Simple Event Subscription</logo-header>

In C#, subscribing to events is straightforward:

```csharp
event Action MyEvent;

void OnEnable() {
    MyEvent += OnMyEvent;  // Subscribe
}

void OnDisable() {
    MyEvent -= OnMyEvent;  // Unsubscribe
}

void OnMyEvent() {
    // 'this' is automatically correct
}
```

### <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript - Binding `this`</logo-header>

In JavaScript/TypeScript, you must explicitly bind `this` when passing methods to event listeners.

:::info About EventList
`EventList` is a Needle Engine type that automatically converts to UnityEvents (Unity) or event lists (Blender) in the editor integrations.
:::

**Method 1: Arrow Functions (Recommended):**

Arrow functions automatically bind `this` to the class instance:  

```ts
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent!: EventList;

    onEnable() {
        this.myEvent.addEventListener(this.onMyEvent);  // Subscribe
    }

    onDisable() {
        this.myEvent.removeEventListener(this.onMyEvent);  // Unsubscribe
    }

    // ✅ Arrow function automatically binds 'this'
    private onMyEvent = () => {
        console.log(this); // 'this' correctly refers to MyComponent instance
    }
}
```

**Method 2: Manual Binding (Verbose):**

The classical way—manually bind `this` and store the reference:

```ts
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent?: EventList;

    private _onMyEventFn?: Function;

    onEnable() {
        // Manually bind 'this' and store the reference
        this._onMyEventFn = this.onMyEvent.bind(this);
        this.myEvent?.addEventListener(this._onMyEventFn);
    }

    onDisable() {
        // Must use the same bound reference to unsubscribe
        this.myEvent?.removeEventListener(this._onMyEventFn);
    }

    // Regular function - needs manual binding
    private onMyEvent() {
        console.log(this); // Without binding, 'this' would be undefined!
    }
}
```

:::tip Use Arrow Functions
Arrow functions are cleaner and less error-prone. Use them for event handlers unless you have a specific reason not to.

[Learn more about arrow functions →](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
:::

## What's next?

- [Needle Engine Scripting](/scripting.md)
