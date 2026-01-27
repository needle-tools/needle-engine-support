---
title: Component Lifecycle Methods
description: Complete reference for Needle Engine component lifecycle methods
---

# Component Lifecycle Methods

Complete reference for all lifecycle methods available in Needle Engine components.

:::tip Performance Best Practice
Only implement lifecycle methods you actually need. Empty `update()` loops on many components hurt performance!
:::

---

## Lifecycle Methods

Lifecycle methods are **only called if declared**. Don't add empty methods!

| Method | When Called | Use For |
| --- | --- | --- |
| `awake()` | Component created | Initial setup, references |
| `onEnable()` | Component enabled | Subscribe to events |
| `start()` | First frame after creation | Initialization logic |
| `earlyUpdate()` | Before default update | Pre-update calculations |
| `update()` | Every frame | Main logic loop |
| `lateUpdate()` | After all updates | Follow cameras, final adjustments |
| `onBeforeRender()` | Just before render | Last-minute visual updates |
| `onAfterRender()` | After render | Post-processing logic |
| `onDisable()` | Component disabled | Unsubscribe from events |
| `onDestroy()` | Component/Object destroyed | Cleanup resources |

---

## Method Details

### awake()

**Called:** When component is first created (before `start()`)

**Use for:**
- Setting up references
- Initializing variables
- Finding other components

**Example:**
```ts
awake() {
    this.renderer = this.gameObject.getComponent(Renderer);
}
```

---

### onEnable()

**Called:** When component is enabled or re-enabled

**Use for:**
- Subscribing to events
- Starting processes
- Resetting state

**Example:**
```ts
onEnable() {
    this.context.input.addEventListener(InputEvents.PointerDown, this.onPointerDown);
}
```

---

### start()

**Called:** First frame after component creation (after `awake()`, after all `awake()` calls)

**Use for:**
- Initialization that depends on other components
- Starting coroutines
- Initial state setup

**Example:**
```ts
start() {
    this.startCoroutine(this.myRoutine());
    console.log("Component initialized");
}
```

---

### earlyUpdate()

**Called:** Before `update()`, every frame

**Use for:**
- Pre-update calculations
- Input processing before main logic

**Example:**
```ts
earlyUpdate() {
    this.processInput();
}
```

---

### update()

**Called:** Every frame (main update loop)

**Use for:**
- Game logic
- Movement
- Animation
- State updates

**Example:**
```ts
update() {
    this.gameObject.position.x += this.speed * this.context.time.deltaTime;
}
```

---

### lateUpdate()

**Called:** After all `update()` calls, before render

**Use for:**
- Camera following
- Final position adjustments
- Calculations that depend on other objects' updates

**Example:**
```ts
lateUpdate() {
    // Make camera follow player (after player has moved)
    this.gameObject.position.copy(this.target.position);
}
```

---

### onBeforeRender()

**Called:** Just before the frame is rendered

**Use for:**
- Last-minute visual updates
- Shader parameter updates
- Material property changes

**Example:**
```ts
onBeforeRender() {
    this.material.opacity = this.calculateOpacity();
}
```

---

### onAfterRender()

**Called:** After the frame is rendered

**Use for:**
- Post-processing logic
- Statistics gathering
- Frame cleanup

**Example:**
```ts
onAfterRender() {
    this.frameCount++;
}
```

---

### onDisable()

**Called:** When component is disabled

**Use for:**
- Unsubscribing from events
- Stopping processes
- Cleanup (temporary)

**Example:**
```ts
onDisable() {
    this.context.input.removeEventListener(InputEvents.PointerDown, this.onPointerDown);
    this.stopAllCoroutines();
}
```

---

### onDestroy()

**Called:** When component or its GameObject is destroyed

**Use for:**
- Final cleanup
- Resource disposal
- Removing global references

**Example:**
```ts
onDestroy() {
    this.disposeResources();
}
```

---

## Execution Order

```
1. awake()           // All components
2. onEnable()        // All components
3. start()           // All components (first frame only)
4. earlyUpdate()     // Every frame
5. update()          // Every frame
6. lateUpdate()      // Every frame
7. onBeforeRender()  // Every frame
8. [RENDER]
9. onAfterRender()   // Every frame
```

When disabling:
```
onDisable()
```

When destroying:
```
onDisable()
onDestroy()
```

---

## Best Practices

### ✅ DO

- Only implement methods you need
- Cache component references in `awake()` or `start()`
- Use `deltaTime` for frame-rate independent movement
- Unsubscribe from events in `onDisable()`
- Clean up resources in `onDestroy()`

### ❌ DON'T

- Don't add empty `update()` methods
- Don't search for components every frame (use `findObjectOfType` sparingly)
- Don't forget to unsubscribe from events
- Don't do heavy calculations in `update()` without optimization

---

## Related

- [Physics Events](./physics-events) - Collision and trigger events
- [Input Events](./input-events) - User input handling
- [XR Events](./xr-events) - WebXR-specific events
- [Lifecycle Hooks](../../how-to-guides/scripting/use-lifecycle-hooks) - Global hooks
- [Time API](./time) - Accessing time and deltaTime
