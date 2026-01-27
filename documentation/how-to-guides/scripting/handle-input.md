---
title: Handle User Input
description: Respond to mouse, touch, keyboard, and controller input
---

# Handle User Input

Learn how to respond to user input in Needle Engine—from mouse clicks to touch gestures to VR controllers.

:::tip Cross-Platform by Default
Needle Engine's input system works across **desktop, mobile, and VR** automatically. You don't need to handle different input types separately!
:::

---

## Pointer Events (Mouse, Touch, VR)

The easiest way to handle input is using **pointer event methods** on your components. These work for mouse, touch, and VR controllers automatically.

### Basic Click Handler

```ts
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class Clickable extends Behaviour {
    onPointerClick(args: PointerEventData) {
        console.log("Clicked on", this.gameObject.name);
        console.log("World position:", args.point);
    }
}
```

**Add this component to any object** and it will respond to clicks!

### Available Pointer Events

| Method | When Called |
| --- | --- |
| `onPointerEnter` | Mouse/touch starts hovering |
| `onPointerMove` | Mouse/touch moves over object |
| `onPointerExit` | Mouse/touch stops hovering |
| `onPointerDown` | Mouse/touch pressed |
| `onPointerUp` | Mouse/touch released |
| `onPointerClick` | Mouse/touch clicked (down + up) |

---

## Hover Effects

Change object appearance on hover:

```ts
import { Behaviour, PointerEventData, Renderer } from "@needle-tools/engine";
import { Color } from "three";

export class HoverEffect extends Behaviour {
    private originalColor?: Color;

    awake() {
        const renderer = this.gameObject.getComponent(Renderer);
        if (renderer?.sharedMaterial) {
            this.originalColor = renderer.sharedMaterial.color.clone();
        }
    }

    onPointerEnter(args: PointerEventData) {
        const renderer = this.gameObject.getComponent(Renderer);
        if (renderer?.sharedMaterial) {
            renderer.sharedMaterial.color.set(0xff0000); // Red
        }
    }

    onPointerExit(args: PointerEventData) {
        const renderer = this.gameObject.getComponent(Renderer);
        if (renderer?.sharedMaterial && this.originalColor) {
            renderer.sharedMaterial.color.copy(this.originalColor);
        }
    }
}
```

---

## Drag and Drop

Track pointer movement while dragging:

```ts
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class SimpleDrag extends Behaviour {
    private isDragging = false;

    onPointerDown(args: PointerEventData) {
        this.isDragging = true;
    }

    onPointerUp(args: PointerEventData) {
        this.isDragging = false;
    }

    onPointerMove(args: PointerEventData) {
        if (this.isDragging) {
            // Move object to the hit point
            this.gameObject.position.copy(args.point);
        }
    }
}
```

:::tip Built-in DragControls
For production use, consider the built-in `DragControls` component which includes:
- Smooth dragging on surfaces
- Networking support
- Throw physics
- Touch and VR support
:::

---

## Keyboard Input

Check keyboard state in `update()`:

```ts
import { Behaviour } from "@needle-tools/engine";

export class KeyboardMovement extends Behaviour {
    speed: number = 5;

    update() {
        const input = this.context.input;

        // Check if keys are held down
        if (input.getKey("w")) {
            this.gameObject.position.z -= this.speed * this.context.time.deltaTime;
        }
        if (input.getKey("s")) {
            this.gameObject.position.z += this.speed * this.context.time.deltaTime;
        }
        if (input.getKey("a")) {
            this.gameObject.position.x -= this.speed * this.context.time.deltaTime;
        }
        if (input.getKey("d")) {
            this.gameObject.position.x += this.speed * this.context.time.deltaTime;
        }

        // Check for key press (once per press)
        if (input.getKeyDown("Space")) {
            console.log("Space was just pressed!");
        }
    }
}
```

### Keyboard Methods

| Method | Description |
| --- | --- |
| `getKey(key)` | Is key currently held down? |
| `getKeyDown(key)` | Was key pressed this frame? |
| `getKeyUp(key)` | Was key released this frame? |

**Key names:** Use keyboard event key values like `"w"`, `"Space"`, `"ArrowUp"`, `"Escape"`, etc.

---

## Polling Input State

Check input state continuously in `update()`:

```ts
import { Behaviour } from "@needle-tools/engine";

export class InputPolling extends Behaviour {
    update() {
        // Mouse/touch pointer state (button 0 = left mouse button / first touch)
        if (this.context.input.getPointerDown(0)) {
            console.log("Pointer is currently down");
        }

        if (this.context.input.getPointerPressed(0)) {
            console.log("Pointer was just pressed this frame");
        }

        if (this.context.input.getPointerUp(0)) {
            console.log("Pointer was just released this frame");
        }

        // Get pointer position (normalized 0-1)
        const pointerPos = this.context.input.getPointerPosition(0);
        if (pointerPos) {
            console.log("Pointer X:", pointerPos.x, "Y:", pointerPos.y);
        }
    }
}
```

---

## Global Input Events

Subscribe to input events that fire anywhere in the scene (not just on specific objects):

```ts
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class GlobalInputHandler extends Behaviour {
    onEnable() {
        // Listen to all pointer events globally
        this.context.input.addEventListener(InputEvents.PointerDown, this.onGlobalPointerDown);
        this.context.input.addEventListener(InputEvents.PointerUp, this.onGlobalPointerUp);
    }

    onDisable() {
        // Clean up event listeners
        this.context.input.removeEventListener(InputEvents.PointerDown, this.onGlobalPointerDown);
        this.context.input.removeEventListener(InputEvents.PointerUp, this.onGlobalPointerUp);
    }

    private onGlobalPointerDown = (evt: NEPointerEvent) => {
        console.log("Pointer down at:", evt.clientX, evt.clientY);
    }

    private onGlobalPointerUp = (evt: NEPointerEvent) => {
        console.log("Pointer up at:", evt.clientX, evt.clientY);
    }
}
```

### Global Input Events

| Event | When Fired |
| --- | --- |
| `InputEvents.PointerDown` | Any pointer down |
| `InputEvents.PointerUp` | Any pointer up |
| `InputEvents.PointerMove` | Any pointer movement |
| `InputEvents.KeyDown` | Any key pressed |
| `InputEvents.KeyUp` | Any key released |

---

## Browser Events

You can also subscribe to native browser events:

```ts
import { Behaviour } from "@needle-tools/engine";

export class BrowserEvents extends Behaviour {
    onEnable() {
        window.addEventListener("click", this.onWindowClick);
        window.addEventListener("keydown", this.onKeyDown);
    }

    onDisable() {
        window.removeEventListener("click", this.onWindowClick);
        window.removeEventListener("keydown", this.onKeyDown);
    }

    private onWindowClick = (evt: MouseEvent) => {
        console.log("Click anywhere:", evt.clientX, evt.clientY);
    }

    private onKeyDown = (evt: KeyboardEvent) => {
        console.log("Key pressed:", evt.key);
    }
}
```

:::warning Platform Differences
When using browser events directly, you need to handle platform differences yourself (mouse vs touch vs VR). Needle Engine's input system handles this automatically.
:::

---

## Requirements for Pointer Events

For pointer events (`onPointerClick`, etc.) to work:

1. **Object must be visible** - `visible = true`
2. **GameObject needs geometry** - A mesh 
3. **Layer not set to "Ignore Raycast"**

:::tip For input on invisible objects use Layer Masks
By default only visible objects receive input events. You can set the object's layer mask to a different layer, then disable rendering for that layer in the main camera. This way the object can still receive pointer events while being invisible.
:::

---

## Touch Gestures

Handle multi-touch gestures:

```ts
import { Behaviour } from "@needle-tools/engine";

export class TouchGestures extends Behaviour {
    update() {
        const input = this.context.input;

        // Check number of active touches
        const touchCount = input.getPointerCount();

        if (touchCount === 2) {
            // Two-finger pinch/zoom
            const touch0 = input.getPointerPosition(0);
            const touch1 = input.getPointerPosition(1);

            if (touch0 && touch1) {
                const distance = touch0.distanceTo(touch1);
                console.log("Pinch distance:", distance);
            }
        }
    }
}
```

---

## VR Controller Input

Pointer events work automatically with VR controllers! No extra code needed.

For advanced VR input (button presses, thumbstick), see:
- [XR Development Guide](/docs/how-to-guides/xr/)
- [XR Event Methods](/docs/reference/api/xr-events)

---

## Next Steps

**Learn more:**
- [Perform Raycasting](./perform-raycasting) - Manual raycasting for advanced use cases
- [Use Coroutines](./use-coroutines) - Sequence actions over time
- [Component Lifecycle](./use-lifecycle-hooks) - awake, start, update methods

**Reference:**
- [Input Event Methods Reference](/docs/reference/api/input-events) - Complete API
- [XR Event Methods](/docs/reference/api/xr-events) - VR/AR events
- [Scripting Examples](/docs/reference/scripting-examples) - More code patterns
