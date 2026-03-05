---
title: Accessibility
description: Make your Needle Engine 3D scenes accessible to screen reader users and assistive technology. The built-in AccessibilityManager exposes interactive 3D objects to the browser accessibility tree with ARIA roles, labels, and live announcements.
---

# Accessibility

**Needle Engine includes built-in accessibility support**, making interactive 3D content discoverable and usable with screen readers and other assistive technology — without requiring any code changes for common use cases.

Since v4.15.0, Needle Engine automatically maintains a visually-hidden DOM overlay that mirrors your 3D scene's interactive elements with proper ARIA roles and labels. When users hover over interactive objects, the browser's live region announces them — no focus steal required.

## How It Works

The `AccessibilityManager` creates an invisible DOM tree alongside your 3D canvas. This tree mirrors interactive objects in the scene with proper ARIA semantics, so assistive technology (like screen readers) can discover and navigate them.

- **ARIA roles and labels** — each interactive object gets a `role` and `aria-label` in the hidden DOM
- **Live region** — hovering over 3D objects announces them to the screen reader via `aria-live="polite"` without moving focus
- **Focus tracking** — keyboard focus can be routed to the correct accessible element when a 3D element is activated
- **No visual change** — the overlay is `position: absolute; width: 1px; height: 1px; clip: rect(0,0,0,0)`, completely invisible

## Automatic Integration

The following built-in components register themselves with the `AccessibilityManager` automatically — no configuration needed:

| Component | ARIA role | Announced as |
| --- | --- | --- |
| `Button` | `button` | Button label |
| `Text` | `text` / `paragraph` | Text content |
| `DragControls` | `application` | Draggable object name |
| `ChangeTransformOnClick` | `button` | Object name |
| `ChangeMaterialOnClick` | `button` | Object name |
| `EmphasizeOnClick` | `button` | Object name |
| `PlayAudioOnClick` | `button` | Object name |
| `PlayAnimationOnClick` | `button` | Object name |

If your scene uses any of these components, screen readers can already announce and navigate interactive elements out of the box.

## Accessing the Manager

From any component, access the manager via `this.context.accessibility`:

```ts
import { Behaviour } from "@needle-tools/engine";

export class MyInteractiveObject extends Behaviour {
    onEnable() {
        const accessibility = this.context.accessibility;
        if (!accessibility) return;

        // Register this object as an accessible button
        accessibility.updateElement(this.gameObject, {
            role: "button",
            label: "Spin the cube",
        });
    }

    onDisable() {
        this.context.accessibility?.removeElement(this.gameObject);
    }
}
```

You can also use the static accessor from anywhere:

```ts
import { AccessibilityManager } from "@needle-tools/engine";

const manager = AccessibilityManager.get(context); // pass a Context
const manager2 = AccessibilityManager.get(myComponent); // or a component
```

## API Reference

### `updateElement(obj, data)`

Registers the accessible DOM element for a 3D object or component. Call this once in `onEnable` to add the object to the accessibility tree.

```ts
accessibility.updateElement(this.gameObject, {
    role: "button",    // ARIA role — e.g. "button", "img", "region", "application"
    label: "Play",     // Human-readable label announced by screen readers
    hidden: false,     // When true, hides from the accessibility tree
    busy: false,       // When true, indicates content is being updated
});
```

To change the label dynamically after registration, call `removeElement()` first, then `updateElement()` again with the new data.

### `hover(obj, text?)`

Announces a hover event to screen readers via the ARIA live region. Call this when the user's cursor enters an interactive 3D object:

```ts
// On pointer enter — announces the element's aria-label
accessibility.hover(this.gameObject);

// Or announce custom text
accessibility.hover(this.gameObject, "Hovering over the magic portal");
```

### `focus(obj)` / `unfocus(obj)`

Routes keyboard focus to (or away from) the accessible element for a 3D object. The element must have a `tabindex` attribute to receive focus — built-in components set this up automatically.

```ts
accessibility.focus(this.gameObject);   // give focus
accessibility.unfocus(this.gameObject); // remove focus
```

### `removeElement(obj)`

Removes the accessible DOM element for an object and stops tracking it:

```ts
accessibility.removeElement(this.gameObject);
```

### `enabled`

Enables or disables the entire accessibility overlay. When disabled, the hidden DOM is removed from the page:

```ts
// Disable the overlay (e.g. for performance-critical embedded scenarios)
this.context.accessibility.enabled = false;

// Re-enable it
this.context.accessibility.enabled = true;
```

## Custom Component Example

Here is a complete example of a custom interactive component that participates in the accessibility tree:

```ts
import { Behaviour, IPointerEventHandler, PointerEventData } from "@needle-tools/engine";

export class AccessiblePortal extends Behaviour implements IPointerEventHandler {

    /** Label read by screen readers */
    label: string = "Enter portal";

    onEnable() {
        this.context.accessibility?.updateElement(this.gameObject, {
            role: "button",
            label: this.label,
        });
    }

    onDisable() {
        this.context.accessibility?.removeElement(this.gameObject);
    }

    onPointerEnter(_data: PointerEventData) {
        this.context.accessibility?.hover(this.gameObject);
    }

    onPointerClick(_data: PointerEventData) {
        this.context.accessibility?.focus(this.gameObject);
        // ... do the portal logic
    }
}
```

## ARIA Roles Reference

Common ARIA roles for 3D interactive objects:

| Role | When to use |
| --- | --- |
| `button` | Clickable objects that trigger an action |
| `img` | Decorative or informational 3D models |
| `region` | A major section of the scene |
| `application` | Complex interactive widgets (drag, multi-step) |
| `status` | Objects whose state changes and should be announced |

For a complete list, see the [WAI-ARIA roles reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).

## Tips & Best Practices

:::tip Label interactive objects clearly
Use descriptive, action-oriented labels: `"Rotate left"` is better than `"Object 3"`. The label is what a screen reader user hears when they encounter the element.
:::

:::tip Use hover() for cursor interaction
When a user moves the cursor over an interactive 3D object, call `accessibility.hover(obj)` to announce it. The live region announces without stealing focus — safe to call frequently.
:::

:::tip Clean up on disable
Always call `removeElement()` in `onDisable()` or `onDestroy()`. Orphaned elements stay in the accessibility tree after the 3D object is gone.
:::

:::info Available since v4.15.0
The `AccessibilityManager` was introduced in Needle Engine **v4.15.0** (February 2026). If you are on an older version, upgrade to access these features.
:::
