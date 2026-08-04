---
title: Scripting Walkthrough
description: Learn Needle Engine scripting one step at a time — short, self-contained examples running live next to the code that produces them.
editLink: true
---

<ask-ai />

# Scripting Walkthrough

Needle Engine scripting in a handful of short steps. Each one adds a single idea, runs live in the page, and shows the whole file that produces it — the code on the left is the code running on the right.

You don't need a project set up to follow along. Every example is one HTML page that loads the engine from a CDN, so you can copy it into a file and open it in a browser. That also means no compile step, so the examples use plain JavaScript without decorators — see [marking fields as serializable](#marking-fields-as-serializable) for what changes in a real project.

::: tip Looking for something else?
[Scripting Examples](/docs/reference/scripting-examples) has copy-paste snippets by topic. The [samples gallery](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=walkthrough) has finished projects to pull apart.
:::

---

## 01 · Your first component

<walkthrough-tags symbols="Behaviour, update, addComponent" />

<walkthrough-takeaway>

Logic lives on the object it belongs to. You write a class, attach it to an object, and it runs — there's no central `animate()` function to add it to and no update list to maintain.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-01-first-component.html" title="A rotating shape driven by a Behaviour component">

@[code js](@code/walkthrough-01-first-component.js)

</walkthrough-step>

A component is a class extending `Behaviour`. Override the methods you need — here just `update`, which runs once per frame — and attach it with `addComponent`.

Inside a component, `this.gameObject` is the object it's attached to and `this.context` is the shared runtime. `this.context.time.deltaTime` is how many seconds passed since the last frame; multiplying by it is what keeps the shape turning at the same rate on a 60 Hz and a 144 Hz screen.

→ [Create Components](/docs/how-to-guides/scripting/create-components) · [Lifecycle Hooks](/docs/how-to-guides/scripting/use-lifecycle-hooks)

---

## 02 · Several components on one object

<walkthrough-tags symbols="addComponent, awake" />

<walkthrough-takeaway>

Components stack. Each one handles a single behaviour and doesn't know the others exist, so you can add, remove or reorder them freely.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-02-composition.html" title="One shape driven by three independent components at once">

@[code js](@code/walkthrough-02-composition.js)

</walkthrough-step>

The shape has three components on it: one turns it, one moves it up and down, one scales it. None of them refer to each other.

They coexist because each writes to a different property — `rotation.y`, `position.y`, and `scale`. Two components writing the same property is the one case where order starts to matter, and it's worth avoiding.

`Bob` reads its starting height in `awake` rather than in a field initializer, because `this.gameObject` isn't set until the component is attached to something.

→ [Lifecycle Hooks](/docs/how-to-guides/scripting/use-lifecycle-hooks)

---

## 03 · The component lifecycle

<walkthrough-tags symbols="awake, onEnable, start, onDisable, onDestroy, destroy, enabled" />

<walkthrough-takeaway>

Every component goes through the same sequence, whatever it does: set up, switch on, run each frame, switch off, clean up. Open your browser console, then use the buttons below the scene.

</walkthrough-takeaway>

<walkthrough-step
  src="/docs/code-samples/walkthrough-03-lifecycle.html"
  title="A component that logs each of its lifecycle methods as it runs"
  :actions='[
    { "name": "disable", "code": "component.enabled = false", "label": "Disable" },
    { "name": "enable",  "code": "component.enabled = true",  "label": "Enable" },
    { "name": "hide",    "code": "beacon.visible = false",    "label": "Hide object" },
    { "name": "show",    "code": "beacon.visible = true",     "label": "Show object" },
    { "name": "destroy", "code": "destroy(component)",        "label": "Destroy" }
  ]'>

@[code js](@code/walkthrough-03-lifecycle.js)

</walkthrough-step>

Each button runs the line next to it, and there are three different scopes here.

**Disable** stops this one behaviour: `update` is no longer called, so the cone stops turning. Nothing else about the object changes — it keeps its position and material, and any other components on it keep running. **Enable** starts it again from where it left off.

**Hide object** sets `visible = false`, which in Needle does more than hide. It deactivates the whole object: every component on it *and on its children* gets `onDisable` and stops updating. It's the equivalent of Unity's `SetActive(false)`. If you want an object hidden but still running, disable its `Renderer` component instead.

**Destroy** removes the component for good.

The component logs a line each time one of its methods runs. On first activation the order is `awake` → `onEnable` → `start`, then `update` every frame. Setting `enabled` back and forth fires `onEnable` and `onDisable` each time, but `awake` and `start` only ever run once. After `destroy` the instance is finished — attaching the behaviour again creates a new one, starting from `awake`.

A rule that saves a lot of debugging: whatever you set up in `awake`, undo in `onDestroy`; whatever you subscribe to in `onEnable`, unsubscribe in `onDisable`.

→ [Lifecycle Hooks](/docs/how-to-guides/scripting/use-lifecycle-hooks) · [Lifecycle Methods reference](/docs/reference/api/lifecycle-methods)

---

## 04 · One class, many instances

<walkthrough-tags symbols="addComponent" />

<walkthrough-takeaway>

A component class is a template. `addComponent` takes an object of values as its second argument, so each copy can be configured differently without writing a subclass.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-04-many-instances.html" title="144 cubes sharing one component class, each given a different phase offset">

@[code js](@code/walkthrough-04-many-instances.js)

</walkthrough-step>

144 cubes share one `Wave` class, one geometry and one material. Only the `offset` differs per cube.

Anything the init object doesn't mention keeps the value declared on the class, so `amplitude = 0.6` acts as a default. The values are assigned after the instance is constructed, which is why they're plain class fields rather than constructor parameters.

### Marking fields as serializable

In a real project you would mark those fields with `@serializable()`:

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class Wave extends Behaviour {
    @serializable()
    amplitude: number = 0.6;

    @serializable()
    speed: number = 2;
}
```

That does two things a plain field can't. The field shows up in the Unity or Blender inspector, so someone who doesn't write code can set it per object. And its value is written into the glTF on export, so it survives into the running app instead of resetting to the default.

The examples on this page leave it out for one reason: decorators need a compile step, and these pages run straight from a CDN with no build. Any component you write in an actual project should use it.

→ [Create Components](/docs/how-to-guides/scripting/create-components) · [@serializable reference](/docs/reference/typescript-decorators#serializable)

---

## 05 · Components in a hierarchy

<walkthrough-tags symbols="Group, LineLoop, addComponent" />

<walkthrough-takeaway>

A component only ever moves its own object. Parent an object to another and it inherits that motion, so nesting the same component builds complex movement out of one simple class.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-05-hierarchy.html" title="A sun, two planets and a moon, all driven by the same one-line Orbit component at different depths">

@[code js](@code/walkthrough-05-hierarchy.js)

</walkthrough-step>

`Orbit` turns its own object and knows nothing else. Used four times it produces a spinning sun, two planets, and a moon.

The pivots are what make it work. A pivot sits at the centre of an orbit with the child parked out to one side, so turning the pivot swings the child around it — the child has no orbit logic at all. The drawn ring is the circle that child travels.

Two things follow from that, both visible in the scene. The moon's pivot is a child of the **planet**, so it inherits the planet's orbit and adds its own on top. And tilting the outer pivot by `rotation.z` tilts that whole orbit — ring, planet and all — because everything under a pivot moves with it.

This is the difference from [step 04](#04-one-class-many-instances): there the copies were siblings and independent. Here they're nested, so their transforms compound.

→ [Create Components](/docs/how-to-guides/scripting/create-components)

---

## 06 · Pointer input

<walkthrough-tags symbols="onPointerEnter, onPointerExit, onPointerClick, MaterialPropertyBlock" />

<walkthrough-takeaway>

Pointer methods are part of a component, like `awake` or `update`. Needle raycasts the scene for you and calls them on whatever is under the pointer — you don't set up a raycaster or track which object was hit.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-06-input.html" title="Five boxes that highlight on hover and start spinning when clicked">

@[code js](@code/walkthrough-06-input.js)

</walkthrough-step>

Hover a box to highlight it, click to start and stop it spinning. The same component is on all five, and each one only ever touches its own object — there's no central list of what's hovered or selected.

`onPointerEnter` and `onPointerExit` come in pairs, so anything changed in one gets restored in the other. This component stores `restColor` in `awake` and puts it back on exit, rather than assuming what the colour was.

Recolouring one box is where this would normally get awkward. All five meshes share a single `MeshStandardMaterial`, so setting `material.color` on hover would recolour the whole row. The usual workaround is to clone the material per object, which multiplies material instances for the sake of one property.

`MaterialPropertyBlock` avoids that. `MaterialPropertyBlock.get(object)` returns a per-object override set — the override is applied in `onBeforeRender` and the original restored in `onAfterRender`, so the material itself is never modified and stays shared. `clearAllOverrides()` puts the box back to the shared colour, which is why the component doesn't need to remember what the original was.

Needle uses the same mechanism internally for lightmaps and reflection probes.

These same methods fire for touch and for VR controllers, so a component written this way works on a phone and in a headset without changes.

→ [Handle User Input](/docs/how-to-guides/scripting/handle-input) · [Perform Raycasting](/docs/how-to-guides/scripting/perform-raycasting) · [MaterialPropertyBlocks](/docs/how-to-guides/scripting/material-property-blocks)

---

## 07 · Physics and collisions

<walkthrough-tags symbols="Rigidbody, BoxCollider, SphereCollider, PhysicsMaterial, onCollisionEnter" />

<walkthrough-takeaway>

Physics is two components, not a system you set up. Add a `Rigidbody` to be moved by physics and a collider to give the object a shape — collisions then arrive as component methods, the same way pointer events do.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-07-physics.html" title="Three balls with different bounciness dropped onto a floor that flashes when hit">

@[code js](@code/walkthrough-07-physics.js)

</walkthrough-step>

The two components do different jobs and you usually need both. **`Rigidbody`** makes an object move under gravity and respond to forces. A **collider** gives it a shape to collide with. An object with a collider but no `Rigidbody` never moves — which is exactly what you want for the floor here, and for walls and static scenery generally.

`onCollisionEnter(collision)` fires on the component when its object is hit. `collision.gameObject` is the *other* object involved, so the floor can report what landed on it without holding a list of balls. There's also `onCollisionExit` and `onCollisionStay`, the latter running every frame that the contact lasts.

Each ball carries a different **physics material** on its collider — `bounciness` rising from `0` on the left to `0.95` on the right, which is the entire difference between the clay, plastic and rubber balls. `bounceCombine: Maximum` makes each ball's own value decide the result; the default averages it with the floor's, so a bouncy ball on a dead floor would only half bounce.

::: warning A collider is its own shape
A collider does not read the mesh it sits on — `BoxCollider` defaults to a 1×1×1 box whatever the mesh size. On a 9×9 floor that leaves a small pad in the middle, and anything landing elsewhere drops straight through.

`BoxCollider.add(object)` measures the object's geometry and sizes the collider to match, which is why the floor here doesn't set a size by hand. Pass `{ rigidbody: true }` and it adds a `Rigidbody` at the same time. This helper exists on `BoxCollider` only — for a sphere or capsule, set the shape yourself.
:::

### Mass and density

Nothing here sets a mass, because you rarely need to. A `Rigidbody` has `autoMass` on by default and works out its mass from the colliders attached to it, using `mass = density × volume`.

That means **size already affects weight**. Double a ball's radius and it gets heavier on its own, with no code change — which is usually what you want and is easy to break by hardcoding a mass.

To make something heavier or lighter than its size suggests, set `density` on the collider rather than `mass` on the body. Density is a real-world figure: water is `1.0` (the engine default), rubber `1.2`, steel `7.8`. Setting `mass` directly still works, but it switches `autoMass` off, and from then on the value stays fixed even if the object is rescaled.

Physics is powered by [Rapier](https://rapier.rs/), which the engine loads on demand the first time a scene uses it.

→ [Use Physics](/docs/how-to-guides/scripting/use-physics)

---

## 08 · Networking

<walkthrough-tags symbols="SyncedRoom, connection.send, connection.beginListen, syncField" />

<walkthrough-takeaway>

Multiplayer is a component sending and receiving, not a separate architecture. Join a room, send when something changes, and listen for the same event to apply what others did.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-08-networking.html" title="Two visitors in one room, clicking cubes to change their colour for both" split>

@[code js](@code/walkthrough-08-networking.js)

</walkthrough-step>

Two views of the same room, side by side — the same thing two people opening the link would see. Click a cube in either one and it changes in both.

`SyncedRoom` joins a room, and that's the whole connection setup. After that, `connection.send(channel, data)` broadcasts to everyone else in the room and `connection.beginListen(channel, callback)` receives. The channel is any string both sides agree on — here it comes from the object's name, so each cube has its own.

Three details that matter more than they look:

**The `guid` is what makes the change stick.** A message sent with a `guid` is stored in the room state on the server, so anyone who joins later receives it — the cubes look right to them rather than resetting to the starting colour. Drop the `guid` and the message is delivered only to people already in the room, and is forgotten the moment it arrives. That single field is the difference between a room with a memory and one without. The value identifies *what* the message is about, which is why it's per cube here.

**The click applies the colour locally as well as sending it.** `send` broadcasts to everyone else in the room — it does not come back to the sender. Leave out the local `apply` and the one person who clicked is the only one who sees nothing happen.

**`beginListen` is wrapped in `autoCleanup`.** A listener that outlives its component keeps firing against an object that's gone. Subscribing in `onEnable` and letting `autoCleanup` unsubscribe is the pairing rule from [step 03](#03-the-component-lifecycle).

### Syncing a field instead

Explicit messages are worth understanding, but for keeping a value in step there's much less to write:

```ts
export class SharedColor extends Behaviour {
    @syncField("onIndexChanged")
    index: number = 0;

    onIndexChanged() {
        this.apply();
    }
}
```

Assigning `this.index = 2` now syncs on its own — no channel name, no `send`, no listener to clean up, and persistence is handled for you rather than depending on remembering the `guid`.

Like [`@serializable`](#marking-fields-as-serializable), it's a decorator, so it needs a compile step — which is why the runnable example on this page uses the explicit calls instead.

→ [Networking Overview](/docs/how-to-guides/networking/) · [Sync Component State](/docs/how-to-guides/networking/sync-state) · [Manual Networking](/docs/how-to-guides/networking/manual-networking) — including `dontSave` and `deleteOnDisconnect` for finer control over what persists

