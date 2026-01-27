# Sync Component State

**Automatically network your component fields with a single decorator.**

Fields in your custom components can be networked very easily. Changes to the field will automatically be detected and sent to all users in the room. The changes are also persisted as part of the Room State, so users that join later will receive the current state as well.


## Using @syncField

To automatically network a field in a component, decorate it with the `@syncField()` decorator:

:::: code-group
::: code-group-item Sync a number
```ts twoslash
import { Behaviour, syncField } from "@needle-tools/engine"

export class SyncedNumber extends Behaviour {

    // Use `@syncField` to automatically network a field.
    // You can optionally assign a method or method name to be called when the value changes.
    @syncField("myValueChanged")
    mySyncedValue?: number = 1;

    private myValueChanged() {
       console.log("My value changed", this.mySyncedValue);
    }

    onPointerClick() {
       this.mySyncedValue = Math.random();
    }
}
```
:::
::: code-group-item Sync an object's color
<!-- SAMPLE network color change -->
:::
::::

## Change Callbacks

The `@syncField` decorator has an optional parameter to specify a method that should be called when the value changes:

```ts
@syncField("onColorChanged")
color?: Color;

private onColorChanged() {
    // This runs when the color changes
    // Update your object's material, etc.
}
```

The callback method:
- Should be defined in the same class
- Can be a method name (string) or a method reference
- Runs on all clients when the value changes
- Useful for triggering visual updates or side effects

## Project Setup

::: tip Custom Project Setup
If you're using a custom project setup, you need to have `experimentalDecorators: true` in your `tsconfig.json` file for syncField decorators to work. Projects created with Needle Starters have this enabled by default.
:::

## Creating and Destroying Objects

Often, you want to create and destroy objects at runtime, and these changes should be synchronized across the network.

### PlayerSync Component

The `PlayerSync` component simplifies this by automatically instantiating a specific object for each connected player. When a player leaves the room, the object is destroyed for all users.

**In Unity/Blender:**
1. Add a `PlayerSync` component to your scene
2. Assign a prefab to the "Player" field
3. The prefab will be instantiated for each connected player

### Manual Instantiation

Needle Engine provides two high-level methods:

#### syncInstantiate()

Duplicate objects across the network:

```ts
import { syncInstantiate } from "@needle-tools/engine";

// Create a new instance for all users
const newObject = syncInstantiate(originalObject, {
    parent: parentObject,
    position: new Vector3(0, 1, 0),
    visible: true
});
```

[API Documentation](https://engine.needle.tools/docs/api/latest/syncInstantiate)

#### syncDestroy()

Destroy objects across the network:

```ts
import { syncDestroy } from "@needle-tools/engine";

// Destroy the object for all users
syncDestroy(objectToDestroy);
```

[API Documentation](https://engine.needle.tools/docs/api/latest/syncDestroy)

## Best Practices

### Keep Synced Fields Simple

`@syncField` works best with simple data types:
- Numbers
- Strings
- Booleans
- Simple objects with JSON-serializable properties

For complex objects or high-frequency updates, consider [Manual Networking](/docs/how-to-guides/networking/manual-networking).

### Use Callbacks for Side Effects

Always use the callback parameter when you need to react to changes:

```ts
@syncField("onHealthChanged")
health: number = 100;

private onHealthChanged() {
    // Update UI, trigger effects, etc.
    this.updateHealthBar();
}
```

### Consider Performance

Each synced field creates network traffic when it changes. For objects that update frequently (like transforms), use built-in components like `SyncedTransform` which are optimized for high-frequency updates.

## Supported Field Types

The following types can be automatically synced:

- **Primitives:** `number`, `string`, `boolean`
- **three.js types:** `Vector2`, `Vector3`, `Vector4`, `Quaternion`, `Color`
- **Arrays:** Arrays of supported types
- **Objects:** Plain objects with JSON-serializable properties

## Next Steps

**Learn more:**
- [Manual Networking](/docs/how-to-guides/networking/manual-networking) - Send custom messages for more control
- [Understanding Networking](/docs/explanation/networking/architecture) - Learn how state sync works

**Reference:**
- [Networking Events API](/docs/reference/api/networking-events) - Complete event reference
- [Built-in Components](/docs/reference/components#networking) - Networking component catalog
