---
title: Working with Unity Integration
description: Learn how Needle Engine integrates with Unity, what gets exported, and how to structure your projects
---

# <logo-header logo="/imgs/unity-logo.webp" alt="Unity">Working with Unity Integration</logo-header>

Learn how Needle Engine integrates with Unity—from scene structure to glTF export and web project management.

:::tip Before You Start
Make sure you have Needle Engine installed in Unity. See [Unity Installation](/docs/unity/) for setup instructions.
:::

---

## How Needle Engine Works with Unity

Needle Engine provides tight integration with the Unity Editor, allowing you to:
- Design scenes and structure in Unity's familiar interface
- Define component data and references
- Export to optimized web formats
- Iterate quickly with hot reload

:::important Key Concept: Unity + glTF + Web
Needle Engine does **NOT** compile C# code to WebAssembly.

**The workflow:**
1. **Unity Editor** - Define scene structure, GameObject hierarchy, component data
2. **glTF Export** - Scene converts to glTF format with embedded component data
3. **TypeScript Runtime** - Browser loads glTF and executes TypeScript/JavaScript logic

**Why?** Fast iteration, small file sizes, and full web platform flexibility.

Read more: [Vision](../../explanation/core-concepts/vision) • [Technical Overview](../../explanation/architecture/technical-overview)
:::

:::details How to create a new Unity project with Needle Engine? (Video)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />
:::

---

## Creating Components

Components are the building blocks of Needle Engine. You define them in Unity, write TypeScript logic, and they run in the browser.

### Unity (C#) vs Needle Engine (TypeScript)

| Unity (C#) | Needle Engine (TypeScript) |
| --- | --- |
| ```csharp<br/>using UnityEngine;<br/>public class MyComponent : MonoBehaviour {<br/>}<br/>``` | ```typescript<br/>import { Behaviour } from "@needle-tools/engine";<br/>export class MyComponent extends Behaviour {<br/>}<br/>``` |
| Derives from `MonoBehaviour` | Derives from `Behaviour` |
| Compiled C# | TypeScript/JavaScript |
| Unity manages lifecycle | Needle Engine manages lifecycle |

**What gets exported:**
- Component type name
- Field values (marked with `@serializable`)
- References to other objects and components
- Transform hierarchy

**What doesn't get exported:**
- C# method implementations
- Private fields
- Unity-specific attributes (except serialized data)

---

## Script Fields

### @serializable Decorator

The `@serializable` decorator tells Needle Engine which fields to export from Unity and how to deserialize them in the browser.

**Example:**
```ts
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

export class MyComponent extends Behaviour {
    @serializable(Behaviour)
    targetComponent?: Behaviour;

    @serializable(Object3D)
    targetObject?: Object3D;

    @serializable()  // No type needed for primitives
    speed?: number;
}
```

**When the scene loads:**
- Needle Engine reads component data from glTF
- Automatically resolves references to other objects/components
- Assigns values to your TypeScript fields

### Primitive Types Don't Need Type Arguments

For JavaScript [primitive types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) (`boolean`, `number`, `bigint`, `string`, `null`, `undefined`), you can omit the type:

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
    @serializable()
    health?: number;

    @serializable()
    playerName?: string;

    @serializable()
    isActive?: boolean;
}
```

### public vs private

Fields without an accessor modifier are `public` by default in JavaScript:

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
    myNumber?: number;              // Public (default)
    private myPrivateNumber?: number;     // Private
    protected myProtectedNumber?: number;  // Protected
}
```

This applies to methods as well.

---

## GameObjects and Scene Structure

### Accessing the Scene

To access the current scene from a component:

```ts
this.scene              // Root three.js scene
this.context.scene      // Same as above
```

### Traversing the Hierarchy

**For loop over children:**
```ts
for (let i = 0; i < this.gameObject.children.length; i++) {
    console.log(this.gameObject.children[i]);
}
```

**For-of loop (cleaner):**
```ts
for (const child of this.gameObject.children) {
    console.log(child);
}
```

**Recursive traversal** with three.js methods:
```ts
import { GameObject } from "@needle-tools/engine";

// Traverse all objects recursively
this.gameObject.traverse((obj: GameObject) => {
    console.log(obj.name);
});

// Only traverse visible objects
this.gameObject.traverseVisible((obj: GameObject) => {
    console.log(obj.name);
});
```

**Query renderable objects:**
```ts
import { Renderer } from "@needle-tools/engine";

for (const renderer of this.gameObject.getComponentsInChildren(Renderer)) {
    console.log("Found renderer:", renderer);
}
```

---

## Components

Needle Engine uses a component system similar to Unity. Components are attached to `Object3D`/`GameObject` and automatically receive lifecycle callbacks.

### Adding/Removing Components

```ts
import { addNewComponent, destroyComponent } from "@needle-tools/engine";

// Add a component
const myComp = addNewComponent(someObject, MyComponent);

// Remove a component
destroyComponent(myComp);
```

When components are added via `addNewComponent`, they automatically receive lifecycle events (`awake`, `start`, `update`, etc.).

### Finding Components

Use familiar Unity-style methods:

| Method | Description |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | Get component on this GameObject |
| `this.gameObject.getComponentInChildren(Animator)` | Get first component on this object or children |
| `this.gameObject.getComponentsInParent(Animator)` | Get all components in parent hierarchy |
| `this.gameObject.getComponentsInChildren(Animator)` | Get all components in children |

**Static methods on GameObject:**
```ts
import { GameObject, Animator } from "@needle-tools/engine";

// Get component from any object
GameObject.getComponent(someObject, Animator);

// Find in entire scene
GameObject.findObjectOfType(Animator);       // First instance
GameObject.findObjectsOfType(Animator);      // All instances
```

[Full lifecycle reference](../../reference/api/lifecycle-methods)

---

## Type Mappings: Unity → three.js

Some Unity types map to different names in Needle Engine:

| Unity Type | Needle Engine Type | Notes |
| --- | --- | --- |
| `GameObject` | `Object3D` | Same as three.js `Object3D` |
| `Transform` | `Object3D` | No separate Transform component (except `RectTransform`) |
| `UnityEvent` | `EventList` | Use `@serializable(EventList)` |
| `Color` | `RGBAColor` | Custom type with alpha (three.js `Color` has no alpha) |

:::tip Key Difference
In Unity, `GameObject` and `Transform` are separate. In three.js/Needle Engine, they're the **same object**—`Object3D` contains both transform data and children.
:::

---

## Transform Properties

Transform data is accessed directly on `GameObject`/`Object3D`:

| Property | Space | Type | three.js docs |
| --- | --- | --- | --- |
| `position` | **Local** | `Vector3` | [position](https://threejs.org/docs/#api/en/core/Object3D.position) |
| `worldPosition` | World | `Vector3` | (calculated) |
| `rotation` | **Local** | `Euler` | [rotation](https://threejs.org/docs/#api/en/core/Object3D.rotation) |
| `worldRotation` | World | `Euler` | (calculated) |
| `quaternion` | **Local** | `Quaternion` | [quaternion](https://threejs.org/docs/#api/en/core/Object3D.quaternion) |
| `worldQuaternion` | World | `Quaternion` | (calculated) |
| `scale` | **Local** | `Vector3` | [scale](https://threejs.org/docs/#api/en/core/Object3D.scale) |
| `worldScale` | World | `Vector3` | (calculated) |

:::warning Unity vs three.js
**Major difference:** In Unity, `position` is **world space** by default. In three.js/Needle Engine, `position` is **local space**.

Use `worldPosition` for world space coordinates!
:::

### World Space Utility Methods

For world coordinates, use Needle Engine's utility methods:

```ts
import { getWorldPosition, getWorldRotation, getWorldScale } from "@needle-tools/engine";

const worldPos = getWorldPosition(this.gameObject);
const worldRot = getWorldRotation(this.gameObject);
const worldScale = getWorldScale(this.gameObject);
```

:::warning Don't Cache World Utility Results
These utility methods use an internal buffer for performance. Don't store the returned values—they'll be overwritten on the next call:

```ts
// ❌ Wrong: Caches a reference to the buffer
this.cachedPos = getWorldPosition(this.gameObject);

// ✅ Right: Clone if you need to store
this.cachedPos = getWorldPosition(this.gameObject).clone();
```
:::

---

## glTF Export

When you export from Unity, Needle Engine converts your scene to glTF format.

### What Gets Exported

**Scene Structure:**
- GameObject hierarchy
- Transform data (position, rotation, scale)
- Mesh and material data
- Textures and images
- Animations

**Component Data:**
- Component type names
- Serialized field values
- References to other GameObjects/components
- EventList connections (UnityEvents)

**Assets:**
- Meshes (optimized)
- Materials (converted to glTF PBR)
- Textures (compressed if configured)
- Audio files
- Custom assets referenced by components

### What Doesn't Get Exported

- C# method implementations (you write these in TypeScript)
- Private fields
- Editor-only components
- Unity-specific scripts without TypeScript counterpart
- Unserializable data types

### Export Optimization

Configure compression and optimization in Unity:
- Texture compression (KTX2, Draco)
- Mesh compression
- Progressive loading
- LOD (Level of Detail) support

[Learn more about export optimization](../../how-to-guides/export/)

---

## Web Project Structure

When Needle Engine generates a web project from Unity, it creates:

```
YourUnityProject/
├── Assets/
│   └── ... (Unity assets)
└── Packages/
    └── ... (Unity packages)

YourWebProject/              ← Generated web project
├── assets/
│   └── scene.glb            ← Exported glTF scene
├── src/
│   ├── main.ts              ← Entry point
│   └── scripts/
│       └── MyComponent.ts   ← Your components
├── package.json             ← npm dependencies
├── tsconfig.json            ← TypeScript config
└── vite.config.js           ← Build config (Vite)
```

### Project Location

By default, the web project is created **next to** your Unity project:

```
ParentFolder/
├── MyUnityProject/
└── MyUnityProject-Web/      ← Web project
```

You can configure this in the Needle Engine component in Unity.

---

## Package Management

### Unity vs npm

| Concept | Unity | Web (Needle Engine) |
| --- | --- | --- |
| **Package Manager** | Unity Package Manager (UPM) | npm (Node Package Manager) |
| **Package Registry** | Unity Registry / Asset Store | [npmjs.com](https://npmjs.com/) |
| **Package List** | `manifest.json` (auto-managed) | `package.json` (editable) |
| **Install Location** | `Packages/` | `node_modules/` |
| **Install Command** | Unity UI | `npm install <package>` |

**Key difference:** In Unity, package management is mostly GUI-based. In web development, you use the command line or edit `package.json` directly.

### Example package.json

```json
{
  "name": "@optional_org/package_name",
  "version": "1.0.0",
  "scripts": {
    "start": "vite --host"
  },
  "dependencies": {
    "@needle-tools/engine": "^3.5.9-beta",
    "three": "npm:@needle-tools/three@0.146.8"
  },
  "devDependencies": {
    "@types/three": "0.146.0",
    "@vitejs/plugin-basic-ssl": "^1.0.1",
    "typescript": "^5.0.4",
    "vite": "^4.3.4",
    "vite-plugin-compression": "^0.5.1"
  }
}
```

### Installing Packages

Open your web project in a terminal and run:

```bash
npm install <package-name>    # Install as dependency
npm install --save-dev <pkg>  # Install as dev dependency
```

**Example:** Install a tweening library:
```bash
npm install @tweenjs/tween.js
```

This adds the package to your `package.json`.

### dependencies vs devDependencies

- **`dependencies`** - Always installed and bundled with your app (e.g., `@needle-tools/engine`, `three`)
- **`devDependencies`** - Only installed during development (e.g., TypeScript compiler, build tools)

---

## Build Tool & Frameworks

The default Needle Engine template uses **Vite** as its bundler. Needle Engine is unopinionated about frontend frameworks—use whatever you prefer!

**Supported frameworks:**
- Vue.js
- Svelte
- Next.js
- React
- React Three Fiber
- SolidJS
- And more...

[See framework integration samples](https://engine.needle.tools/samples/?tag=framework)

---

## Editor Sync & Hot Reload

Needle Engine supports live syncing between Unity and the browser. Add the `EditorSync` component to your scene to enable automatic synchronization:

1. **Make changes in Unity** (move objects, change component values)
2. **Save the scene** (Ctrl+S / Cmd+S)
3. **Browser auto-updates** with your changes

This works for:
- Transform changes
- Component field values
- Material properties
- Scene hierarchy changes

**Code changes** (TypeScript) also hot-reload automatically when you save the file.

:::details Video: Editor Sync in Action
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />
:::

[Read more about Editor Sync →](../../unity/editor-sync)

---

## What's Next?

Now that you understand the Unity integration, learn how to write TypeScript code:

**Continue learning:**
- [C# to TypeScript Translation](./c-sharp-to-typescript) - Convert your C# knowledge to TypeScript
- [TypeScript Essentials](./typescript-essentials) - JavaScript/TypeScript fundamentals
- [Create Components](../../how-to-guides/scripting/create-components) - Build interactive components

**Reference:**
- [Component Reference](../../reference/components) - Built-in components
- [Lifecycle Methods](../../reference/api/lifecycle-methods) - Complete lifecycle API
