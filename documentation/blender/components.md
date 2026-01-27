---
title: Components in Blender
description: Add interactivity using built-in and custom components
---

# Working with Components

Components are the building blocks of interactivity in Needle Engine. Add them to objects in Blender to create interactive behaviors, from simple camera controls to complex game mechanics.

---

## Built-in Components

Needle Engine includes **100+ ready-to-use components** for common interactive features.

### Adding Components

**In Blender:**

1. Select an object in your scene
2. Open the **Needle Components** panel (usually in the Properties area)
3. Click `Add Component`
4. Search for and select the component you need
5. Adjust component settings in the panel

![Needle Components panel](/blender/components-panel.webp)

**Component settings** appear immediately after adding. Each component has different properties you can configure directly in Blender.

---

### Example: Camera Controls

Add `OrbitControls` to your camera for instant mouse/touch controls on all devices:

![Add OrbitControls component](/blender/components-panel-select.webp)

**OrbitControls settings:**
- `target` - What the camera orbits around
- `autoRotate` - Automatic rotation
- `enableDamping` - Smooth camera movement
- `minDistance` / `maxDistance` - Zoom limits
- `enablePan` - Allow panning with right-click

---

### Popular Components by Category

**Camera Controls:**
- `OrbitControls` - Orbit around a target with mouse/touch

**Animation:**
- `Animation` - Play animation clips
- `Animator` - State machine animations
- `PlayableDirector` - Timeline-based sequences
- [Learn more about animation →](/docs/blender/animation)

**Interaction:**
- `DragControls` - Make objects draggable in 3D space
- `ObjectRaycaster` - Detect clicks and hover on objects

**UI & UX:**
- `Button` - Interactive buttons
- `Canvas` - UI container

**Media:**
- `VideoPlayer` - Play video files and streams

**Physics:**
- `Rigidbody` - Add physics simulation
- `BoxCollider` / `SphereCollider` / `MeshCollider` - Collision shapes

**Audio:**
- `AudioSource` - 3D spatial audio
- `AudioListener` - Hear 3D audio (usually on camera)

**Effects:**
- `ParticleSystem` - Visual effects
- `Light` - Dynamic lighting

**Optimization:**
- `ViewBox` - Ensure content stays framed

**XR (Virtual & Augmented Reality):**
- `WebXR` - Enable VR/AR with one click
- [Learn more about WebXR →](/docs/how-to-guides/xr/)

**Actions & Events:**
- `EverywhereActions` - Trigger actions on various events (click, hover, collision, etc.)

[See all 100+ components →](/docs/reference/components)

---

### Removing Components

Click the `X` button in the lower right of any component panel.

![Remove component](/blender/remove-component.webp)

---

## Custom Components

Want behavior that doesn't exist yet? Write your own TypeScript components that automatically appear in Blender.

### Creating Custom Components

**1. Open Your Project Code**

Click `Code Editor` in the Needle Project panel to open VS Code with your web project.

**2. Create a Component File**

In your project, navigate to `src/scripts/` and create a new `.ts` file (e.g., `RotateObject.ts`).

**3. Write Your Component**

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class RotateObject extends Behaviour {

    @serializable()
    speed: number = 1;

    @serializable()
    axis: "x" | "y" | "z" = "y";

    update() {
        const delta = this.context.time.deltaTime;
        switch(this.axis) {
            case "x": this.gameObject.rotateX(delta * this.speed); break;
            case "y": this.gameObject.rotateY(delta * this.speed); break;
            case "z": this.gameObject.rotateZ(delta * this.speed); break;
        }
    }
}
```

**4. Save and Use**

- Save the file
- The component automatically compiles
- It appears in Blender's component list
- Add it to objects just like built-in components
- Your `@serializable()` properties appear as editable fields in Blender

---

### Component Lifecycle

Components have lifecycle methods you can override:

```ts
import { Behaviour } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    // Called once when component is created
    awake() {
        console.log("Component created");
    }

    // Called when component becomes active
    onEnable() {
        console.log("Component enabled");
    }

    // Called every frame
    update() {
        // Your per-frame logic
    }

    // Called at fixed intervals (physics)
    fixedUpdate() {
        // Physics calculations
    }

    // Called when component is disabled
    onDisable() {
        console.log("Component disabled");
    }

    // Called when component is destroyed
    onDestroy() {
        console.log("Component destroyed");
    }
}
```

**[Learn more about lifecycle hooks →](/docs/how-to-guides/scripting/use-lifecycle-hooks)**

---

### Accessing Other Components

**Find components on the same object:**

```ts
import { Behaviour, Animation } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    start() {
        // Get a component on this object
        const anim = this.gameObject.getComponent(Animation);
        if (anim) {
            anim.play();
        }
    }
}
```

**Find components in children:**

```ts
// Get component in any child
const light = this.gameObject.getComponentInChildren(Light);

// Get all components in children
const allLights = this.gameObject.getComponentsInChildren(Light);
```

**Find components in parents:**

```ts
const canvas = this.gameObject.getComponentInParent(Canvas);
```

**Find components anywhere in scene:**

```ts
import { GameObject } from "@needle-tools/engine";

// Find by name
const player = GameObject.find("Player");

// Find first component of type
const camera = GameObject.findObjectOfType(Camera);

// Find all components of type
const allEnemies = GameObject.findObjectsOfType(Enemy);
```

**[Learn more about finding objects and components →](/docs/how-to-guides/scripting/find-objects-and-components)**

---

### Serializable Properties

Use `@serializable()` to expose properties in Blender:

```ts
import { Behaviour, serializable } from "@needle-tools/engine";
import { Vector3, Color } from "three";

export class MyComponent extends Behaviour {

    // Basic types
    @serializable()
    speed: number = 5;

    @serializable()
    enabled: boolean = true;

    @serializable()
    name: string = "Default";

    // Three.js types
    @serializable(Vector3)
    direction: Vector3 = new Vector3(0, 1, 0);

    @serializable(Color)
    color: Color = new Color(1, 0, 0);

    // References to other components
    @serializable(Light)
    targetLight?: Light;

    // Arrays
    @serializable()
    speeds: number[] = [1, 2, 3];
}
```

All these properties become editable in Blender's component panel!

**[Learn more about serializable properties →](/docs/how-to-guides/scripting/custom-component-properties)**

---

### Component Communication

**Using Events:**

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class Button extends Behaviour {

    @serializable()
    onClick: EventList = new EventList(); // Can assign in Blender!

    onPointerClick() {
        this.onClick.invoke();
    }
}

export class Door extends Behaviour {

    open() {
        console.log("Door opening!");
        // Animation logic here
    }
}
```

In Blender, assign the Door's `open()` method to the Button's `onClick` event.

**Direct References:**

```ts
export class PlayerController extends Behaviour {

    @serializable(Animator)
    animator?: Animator;

    jump() {
        this.animator?.setTrigger("jump");
    }
}
```

Assign the animator reference in Blender by dragging the component.

---

### Best Practices

**Component Design:**
- Keep components small and focused (single responsibility)
- Use `@serializable()` for values artists should control
- Provide sensible defaults
- Add comments to explain parameters

**Performance:**
- Avoid heavy calculations in `update()` - use `onEnable()` when possible
- Cache component references in `awake()` or `start()`
- Use object pooling for frequently created/destroyed objects

**Organization:**
- Group related components in the same file or folder
- Use clear, descriptive class names
- Follow TypeScript naming conventions

---

## Requirements

:::warning Component Compiler Required
Make sure `@needle-tools/needle-component-compiler` 2.x is in your `package.json` devDependencies for component hot-reloading to work.
:::

This is included by default in new projects. If components aren't appearing in Blender, check your `package.json`.

---

## Next Steps

- **[Create Components Guide](/docs/how-to-guides/scripting/create-components)** - Detailed scripting tutorial
- **[Component API Reference](https://engine.needle.tools/docs/api/)** - Complete API documentation
- **[Animation Workflows](/docs/blender/animation)** - Use animation components
- **[TypeScript Essentials](/docs/tutorials/fundamentals/typescript-essentials)** - Learn TypeScript basics

---

**Need Help?**
- [Discord Community](https://discord.needle.tools) - Ask about component development
- [Forum](https://forum.needle.tools) - Share your custom components
- [Component Catalog](/docs/reference/components) - Browse all built-in components
