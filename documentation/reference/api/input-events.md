---
title: Input Event Methods
description: Reference for pointer, touch, and controller input events
---

# Input Event Methods

Handle pointer/touch/controller interactions on your components.

:::tip Cross-Platform Input
These events work across **desktop, mobile, and VR**—no need to handle different input types separately!
:::

---

## Event Methods

| Method | Parameters | When Called |
| --- | --- | --- |
| `onPointerEnter` | `args: PointerEventData` | Cursor **starts** hovering (object or children) |
| `onPointerMove` | `args: PointerEventData` | Cursor **moves** over object (or children) |
| `onPointerExit` | `args: PointerEventData` | Cursor **stops** hovering |
| `onPointerDown` | `args: PointerEventData` | Cursor **pressed** (mouse/touch down) |
| `onPointerUp` | `args: PointerEventData` | Cursor **released** |
| `onPointerClick` | `args: PointerEventData` | Cursor **clicked** (down + up on same object) |

---

## PointerEventData

The event parameter provides detailed information:

```ts
interface PointerEventData {
    // The point where the raycast hit the object
    point: Vector3;

    // The object that was hit
    object: Object3D;

    // Screen-space pointer position (0-1 range)
    pointerId: number;

    // Mouse button or touch index
    button: number;

    // Original browser event
    event: PointerEvent;
}
```

---

## Example: Simple Click Handler

```ts
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class Clickable extends Behaviour {
    onPointerClick(args: PointerEventData) {
        console.log("Clicked on", this.gameObject.name);
        console.log("Click position:", args.point);
    }
}
```

---

## Example: Hover Effects

```ts
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class HoverEffect extends Behaviour {
    private originalColor: Color;

    awake() {
        const renderer = this.gameObject.getComponent(Renderer);
        this.originalColor = renderer.material.color.clone();
    }

    onPointerEnter(args: PointerEventData) {
        const renderer = this.gameObject.getComponent(Renderer);
        renderer.material.color.set(0xff0000); // Red on hover
    }

    onPointerExit(args: PointerEventData) {
        const renderer = this.gameObject.getComponent(Renderer);
        renderer.material.color.copy(this.originalColor);
    }
}
```

---

## Example: Drag and Drop

```ts
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class Draggable extends Behaviour {
    private isDragging = false;

    onPointerDown(args: PointerEventData) {
        this.isDragging = true;
    }

    onPointerUp(args: PointerEventData) {
        this.isDragging = false;
    }

    onPointerMove(args: PointerEventData) {
        if (this.isDragging) {
            this.gameObject.position.copy(args.point);
        }
    }
}
```

---

## Global Input Events

Subscribe to input events globally (not just on specific objects):

```ts
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class GlobalInputHandler extends Behaviour {
    onEnable() {
        this.context.input.addEventListener(InputEvents.PointerDown, this.onGlobalPointerDown);
    }

    onDisable() {
        this.context.input.removeEventListener(InputEvents.PointerDown, this.onGlobalPointerDown);
    }

    private onGlobalPointerDown = (evt: NEPointerEvent) => {
        console.log("Pointer down anywhere in the scene", evt);
    }
}
```

---

## Polling Input State

Check input state every frame:

```ts
import { Behaviour } from "@needle-tools/engine";

export class PollingExample extends Behaviour {
    update() {
        // Check if pointer is down (mouse button 0 or first touch)
        if (this.context.input.getPointerDown(0)) {
            console.log("Pointer is down");
        }

        // Check if pointer was pressed this frame
        if (this.context.input.getPointerPressed(0)) {
            console.log("Pointer was just pressed");
        }

        // Check if pointer was released this frame
        if (this.context.input.getPointerUp(0)) {
            console.log("Pointer was just released");
        }
    }
}
```

---

## Browser Events

You can also subscribe to native browser events:

```ts
import { Behaviour } from "@needle-tools/engine";

export class BrowserEvents extends Behaviour {
    onEnable() {
        window.addEventListener("click", this.onWindowClick);
    }

    onDisable() {
        window.removeEventListener("click", this.onWindowClick);
    }

    private onWindowClick = () => {
        console.log("Click anywhere on the page");
    }
}
```

:::warning
When using browser events directly, you need to handle platform differences yourself (mouse vs touch vs VR controllers). Needle Engine input events handle this automatically.
:::

---

## Requirements

For input events to work:

1. **Object must be visible** (`visible = true`)
2. **Object's layer** must not be set to "Ignore Raycast"
3. **GameObject must have a collider** - Only required when using physics-based raycasting. For regular pointer events, a mesh with geometry is sufficient.

---

## Related

- [Lifecycle Methods](./lifecycle-methods) - Component lifecycle
- [Handle User Input](../../how-to-guides/scripting/handle-input) - Input guide
- [Perform Raycasting](../../how-to-guides/scripting/perform-raycasting) - Manual raycasting
