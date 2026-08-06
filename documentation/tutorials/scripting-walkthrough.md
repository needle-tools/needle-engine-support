---
title: Scripting Walkthrough
description: Learn Needle Engine scripting one step at a time — short, self-contained examples running live next to the code that produces them.
editLink: true
---

<ask-ai />

# Scripting Walkthrough

Needle Engine scripting in a handful of short steps. Each one adds a single idea, runs live in the page, and shows the whole file that produces it — the code on the left is the code running on the right.

You don't need a project set up to follow along. Every example is one HTML page that loads the engine from a CDN, so you can copy it into a file and open it in a browser. That also means no compile step, so the examples are plain JavaScript rather than TypeScript — see [marking fields as serializable](#marking-fields-as-serializable) for what TypeScript adds.

::: tip Looking for something else?
[Scripting Examples](/docs/reference/scripting-examples) has copy-paste snippets by topic. The [samples gallery](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=walkthrough) has finished projects to pull apart.
:::

---

## 01 · Your first component

<walkthrough-tags symbols="Behaviour, update, addComponent" />

<walkthrough-takeaway>

You write a class, attach it to an object, and it starts running. The same class also appears in Unity and Blender. Artists can use it there to build scenes.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-01-first-component.html" title="A rotating shape driven by a Behaviour component">

@[code js](@code/walkthrough-01-first-component.js)

</walkthrough-step>

A component is a class extending `Behaviour`. Override the methods you need — here just `update`, which runs once per frame — and attach it with `addComponent`.

Inside a component, `this.gameObject` is the object it's attached to and `this.context` is the shared runtime. `this.context.time.deltaTime` is how many seconds passed since the last frame; multiplying by it is what keeps the shape turning at the same rate on a 60 Hz and a 144 Hz screen.

::: info Coming from plain three.js?
Normally you keep one `animate()` function that calls into every moving part, and add each new one to it by hand. Here `update` sits on the component itself. Adding behaviour to an object never means editing a shared function, and deleting the object takes its logic with it.
:::

→ [Create Components](/docs/how-to-guides/scripting/create-components) · [Lifecycle Hooks](/docs/how-to-guides/scripting/use-lifecycle-hooks)

---

## 02 · Several components on one object

<walkthrough-tags symbols="addComponent, awake" />

<walkthrough-takeaway>

An object can have any number of components. You can add or remove them at any time — including while the scene is running.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-02-composition.html" title="One shape driven by three independent components at once">

@[code js](@code/walkthrough-02-composition.js)

</walkthrough-step>

The shape has three components on it: one turns it, one moves it up and down, one scales it. None of them refer to each other.

They coexist here because each writes to a different property — `rotation.y`, `position.y`, and `scale`. Two components writing the same property is the one case where order starts to matter.

Independent is the default, not a rule. When a component does need another, `getComponent` finds it on the same object — step 08 uses it to reach a `Rigidbody`.

`Bob` reads its starting height in `awake` rather than in a field initializer, because `this.gameObject` isn't set until the component is attached to something.

→ [Lifecycle Hooks](/docs/how-to-guides/scripting/use-lifecycle-hooks)

---

## 03 · The component lifecycle

<walkthrough-tags symbols="awake, onEnable, start, onDisable, onDestroy, destroy, enabled" />

<walkthrough-takeaway>

Every component follows the same sequence. Set up, switch on, run each frame, switch off, clean up. Open your browser console, then use the buttons below the scene.

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

For subscriptions there's a shortcut. Wrap one in `this.autoCleanup(...)` and the component unsubscribes it for you when it's disabled or destroyed, so you don't write the `onDisable` half at all — [step 09](#09-networking) uses it for a network listener.

→ [Lifecycle Hooks](/docs/how-to-guides/scripting/use-lifecycle-hooks) · [Lifecycle Methods reference](/docs/reference/api/lifecycle-methods)

---

## 04 · One class, many instances

<walkthrough-tags symbols="addComponent" />

<walkthrough-takeaway>

A component class is a template. `addComponent` takes a second argument with values. Each copy can be configured differently, without writing a subclass.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-04-many-instances.html" title="144 cubes sharing one component class, each given a different phase offset">

@[code js](@code/walkthrough-04-many-instances.js)

</walkthrough-step>

144 cubes share one `Wave` class, one geometry and one material. Only the `offset` differs per cube.

Anything the init object doesn't mention keeps the value declared on the class, so `amplitude = 0.6` acts as a default. The values are assigned after the instance is constructed, which is why they're plain class fields rather than constructor parameters.

### Marking fields as serializable

In a TypeScript project, mark those fields with `@serializable()`:

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

The examples on this page leave it out because decorators need TypeScript, and these pages run straight from a CDN. Use it for any component you write in a project.

→ [Create Components](/docs/how-to-guides/scripting/create-components) · [@serializable reference](/docs/reference/typescript-decorators#serializable)

---

## 05 · Components in a hierarchy

<walkthrough-tags symbols="Group, LineLoop, addComponent" />

<walkthrough-takeaway>

A component only ever acts on its own object. Because a child inherits its parent's position and rotation, nesting objects lets one simple component build up complex results.

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

## 06 · Cloning objects

<walkthrough-tags symbols="instantiate, destroy, getComponentInChildren" />

<walkthrough-takeaway>

`instantiate` copies an object, its children, and the components on all of them. Build something once, then make as many as you need while the scene runs.

</walkthrough-takeaway>

<walkthrough-step
  src="/docs/code-samples/walkthrough-06-instantiate.html"
  title="Windmills cloned from one original, each turning at its own speed"
  :actions='[
    { "name": "spawn", "code": "instantiate(original, { parent, position })", "label": "Add one" },
    { "name": "clear", "code": "destroy(clone)",                              "label": "Remove all" }
  ]'>

@[code js](@code/walkthrough-06-instantiate.js)

</walkthrough-step>

The windmill is built once, in `buildWindmill`. `Sway` sits on the root and `Spin` on the blades, a child object — and both come along when the object is cloned. Cloning copies the whole subtree, not just the top. **Remove all** leaves the original standing, and **Add one** clones it again.

`parent` puts the clone into the scene as part of the call. Leave it out and you get an object that exists but isn't anywhere yet, which you add yourself. `position`, `rotation` and `scale` are set the same way, and take plain arrays.

A clone's components are ordinary components. `getComponent` and `getComponentInChildren` find them, and each clone has its own instances — so giving one a new `speed` leaves the others turning at theirs.

::: tip Where the original usually comes from
Here the original is built in code so the example stays self-contained. In a project it's more often a model you loaded, or an object placed in Unity or Blender and referenced with `@serializable`. `instantiate` treats them all the same.
:::

To spawn a copy for everyone in a networked scene, `syncInstantiate` does the same job across the connection — see [step 09](#09-networking).

→ [Duplicatable component](/docs/how-to-guides/components/duplicatable) · [syncInstantiate](/docs/how-to-guides/networking/sync-state#syncinstantiate)

---

## 07 · Pointer input

<walkthrough-tags symbols="onPointerEnter, onPointerExit, onPointerClick, MaterialPropertyBlock" />

<walkthrough-takeaway>

Pointer methods are part of a component, like `awake` or `update`. Needle works out what is under the pointer and calls them on that object.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-07-input.html" title="Five boxes that highlight on hover and start spinning when clicked">

@[code js](@code/walkthrough-07-input.js)

</walkthrough-step>

Hover a box to highlight it, click to start and stop it spinning. The same component is on all five, and each one only ever touches its own object — there's no central list of what's hovered or selected.

::: info Coming from plain three.js?
This is the part you normally write yourself. You set up a `Raycaster`, convert pointer coordinates to normalised device space, and intersect the scene each frame. You also track which object was hit last, so you can tell enter from exit. Needle does all of that and calls the methods on the object instead.

It also does it faster than a plain raycast. Meshes get a [BVH](https://github.com/gkjohnson/three-mesh-bvh) built for them, so a hit test descends a tree instead of walking every triangle — which is the difference between a dense mesh being fine to click on and being unusable.
:::

`onPointerEnter` and `onPointerExit` come in pairs, so anything changed in one gets restored in the other. This component stores `restColor` in `awake` and puts it back on exit, rather than assuming what the colour was.

Recolouring one box is where this would normally get awkward. All five meshes share a single `MeshStandardMaterial`, so setting `material.color` on hover would recolour the whole row. The usual workaround is to clone the material per object, which multiplies material instances for the sake of one property.

`MaterialPropertyBlock` avoids that. `MaterialPropertyBlock.get(object)` gives you a set of overrides for one object, and the engine applies them per object at render time — the material itself is never modified and stays shared.

It also makes the component simpler. `clearAllOverrides()` restores the shared colour, so there is no saved original to store in `awake` and no risk of restoring a stale value later.

These same methods fire for touch and for VR controllers, so a component written this way works on a phone and in a headset without changes.

→ [Handle User Input](/docs/how-to-guides/scripting/handle-input) · [Perform Raycasting](/docs/how-to-guides/scripting/perform-raycasting) · [MaterialPropertyBlocks](/docs/how-to-guides/scripting/material-property-blocks)

---

## 08 · Physics and collisions

<walkthrough-tags symbols="Rigidbody, BoxCollider, SphereCollider, PhysicsMaterial, onCollisionEnter, applyImpulse" />

<walkthrough-takeaway>

Physics is two components, not a system you set up. A `Rigidbody` makes an object move. A collider gives it a shape. Collisions then arrive as component methods, like pointer events do.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-08-physics.html" title="Three balls with different bounciness dropped onto a floor that flashes when hit — click a ball to launch it">

@[code js](@code/walkthrough-08-physics.js)

</walkthrough-step>

Click any ball to launch it upwards, and the difference in bounciness shows on the way back down. `applyImpulse` is an instant change in velocity — a kick. `applyForce` is the other option, for a push applied over time.

The two components do different jobs and you usually need both. **`Rigidbody`** makes an object move under gravity and respond to forces. A **collider** gives it a shape to collide with. An object with a collider but no `Rigidbody` never moves — which is exactly what you want for the floor here, and for walls and static scenery generally.

`onCollisionEnter(collision)` fires on the component when its object is hit. `collision.gameObject` is the *other* object involved, so the floor can report what landed on it without holding a list of balls. There's also `onCollisionExit` and `onCollisionStay`, the latter running every frame that the contact lasts.

Each ball carries a different **physics material** on its collider — `bounciness` rising from `0` on the left to `0.95` on the right, which is the entire difference between the clay, plastic and rubber balls. `bounceCombine: Maximum` makes each ball's own value decide the result; the default averages it with the floor's, so a bouncy ball on a dead floor would only half bounce.

::: tip A collider is its own shape
A collider doesn't read the mesh — `BoxCollider` defaults to 1×1×1 whatever the object's size, so anything landing off that pad falls through. `BoxCollider.add(object)` fits it to the geometry for you. Other collider types have no such helper.
:::

### Mass and density

Nothing here sets a mass, because you rarely need to. A `Rigidbody` has `autoMass` on by default and works out its mass from the colliders attached to it, using `mass = density × volume`.

That means **size already affects weight**. Double a ball's radius and it gets heavier on its own, with no code change — which is usually what you want and is easy to break by hardcoding a mass.

To make something heavier or lighter than its size suggests, set `density` on the collider rather than `mass` on the body. Density is a real-world figure: water is `1.0` (the engine default), rubber `1.2`, steel `7.8`. Setting `mass` directly still works, but it switches `autoMass` off, and from then on the value stays fixed even if the object is rescaled.

Physics is powered by [Rapier](https://rapier.rs/), which the engine loads on demand the first time a scene uses it.

→ [Use Physics](/docs/how-to-guides/scripting/use-physics)

---

## 09 · Networking

<walkthrough-tags symbols="SyncedRoom, connection.send, connection.beginListen, syncField" />

<walkthrough-takeaway>

Multiplayer is a component sending and receiving, not a separate architecture. Join a room, send when something changes, and listen for the same event to apply what others did.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-09-networking.html" title="Two visitors in one room, clicking cubes to change their colour for both" split>

@[code js](@code/walkthrough-09-networking.js)

</walkthrough-step>

Two views of the same room, side by side — the same thing two people opening the link would see. Click a cube in either one and it changes in both.

`SyncedRoom` joins a room, and that's the whole connection setup — see [Set Up Networking](/docs/how-to-guides/networking/setup) for rooms, servers and hosting. After that, `connection.send(channel, data)` broadcasts to everyone else in the room and `connection.beginListen(channel, callback)` receives. The channel is any string both sides agree on — here it comes from the object's name, so each cube has its own.

Three things to note:

**The `guid` makes the change persist.** A message sent with one is stored in the room state on the server, so anyone joining later receives it. Without a `guid` the message only reaches people already in the room and is then forgotten. The value identifies which object the message is about, which is why it is per cube here.

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

Like [`@serializable`](#marking-fields-as-serializable), it's a decorator and needs TypeScript — which is why the runnable example on this page uses the explicit calls instead.

→ [Networking Overview](/docs/how-to-guides/networking/) · [Sync Component State](/docs/how-to-guides/networking/sync-state) · [Manual Networking](/docs/how-to-guides/networking/manual-networking) — including `dontSave` and `deleteOnDisconnect` for finer control over what persists

---

## 10 · AR and VR

<walkthrough-tags symbols="WebXR" />

<walkthrough-takeaway>

XR is one component. Add `WebXR` to the scene and the page gains AR and VR. There is no separate build, and your existing components keep working.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-10-webxr.html" title="A scene with AR and VR enabled by a single WebXR component">

@[code js](@code/walkthrough-10-webxr.js)

</walkthrough-step>

The buttons appear by themselves when a mode is available: a phone offers AR, a headset offers VR, and a desktop with a headset connected offers VR too. Without one, `createSendToQuestButton` can offer to open the page on a Quest instead, and `createQRCode` shows a QR code so you can open the same URL on a phone to try AR. `useDefaultControls` adds movement and teleporting in VR.

`arScale` is worth setting for AR. Your scene is placed at real-world size, so a cube one unit across appears as a one-metre block in the room.

It scales *you*, not the scene: raise it and you become larger relative to everything, so the scene looks smaller. `8` here shrinks it to something that sits on a table.

`Spin` is the same component from step 01, unchanged, running in a headset.

→ [WebXR Guides](/docs/how-to-guides/xr/) · [iOS WebXR](/docs/how-to-guides/xr/ios-webxr-app-clip) · [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) for AR on iOS via QuickLook

---

## 11 · Following the cursor

<walkthrough-tags symbols="CursorFollow, LookAt" />

<walkthrough-takeaway>

Plenty of what you'd write by hand already exists as a component. One built-in follows the pointer. Another aims an object at a target. Together they make a head that watches you, with no custom code.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-11-cursor.html" title="A head whose eyes track the mouse pointer">

@[code js](@code/walkthrough-11-cursor.js)

</walkthrough-step>

`CursorFollow` moves an object towards the pointer, and `damping` sets how smoothly it gets there — higher values ease in more gradually, lower values track it closely. `LookAt` turns an object to face a target.

The pupils are children of the eyes, so turning an eye takes its pupil with it — the same nesting idea as [step 05](#05-components-in-a-hierarchy).

Before writing a component, it's worth checking whether one exists. The [Component Reference](/docs/reference/components) lists them all.

→ [Cursor Follow](/docs/how-to-guides/components/cursor-follow) · [Component Reference](/docs/reference/components)

---

## 12 · Loading a model

<walkthrough-tags symbols="loadAsset" />

<walkthrough-takeaway>

You can load a model from any URL at runtime. What comes back is an ordinary object, so components attach to it like anything else.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-12-loading.html" title="A model downloaded from a URL at runtime and framed by the camera">

@[code js](@code/walkthrough-12-loading.js)

</walkthrough-step>

`loadAsset(url)` fetches and parses the file, then hands back an object with `.scene` and `.animations`. It doesn't add anything to your scene, so you decide where the model goes and when it appears.

`asset.scene` is a plain `THREE.Object3D`. You can add components to it, move it, or parent it to something else, exactly as with a shape you built yourself. Nothing about a loaded object is special.

`fitCamera()` on `OrbitControls` frames whatever is in the scene, which saves guessing at a camera position for a model whose size you don't know in advance.

Assets exported through Needle are compressed and progressively loaded by default, so a model like this one starts showing up early rather than arriving all at once.

This is one of four ways to load a model, and the right choice depends on what you're doing — a single root scene, switching between many, spawning copies of one, or a quick one-off like this.

→ [Load 3D Web Assets at Runtime](/docs/how-to-guides/scripting/load-3d-web-assets-at-runtime) compares all four

---

## 13 · Seeing what your code is doing

<walkthrough-tags symbols="Gizmos" />

<walkthrough-takeaway>

Gizmos let you draw into the scene from code, so you can see a value instead of logging it.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-13-gizmos.html" title="An orbiting marker with its path, position and heading drawn as gizmos">

@[code js](@code/walkthrough-13-gizmos.js)

</walkthrough-step>

`Orbit` moves the marker. `ShowWhatItIsDoing` draws the circle it's following, a sphere at its position, a line back to the centre, and a label with the live coordinates.

You call a `Gizmos` method and it draws, at the position you give it. Each call lasts one frame, which is why these sit in `update` — stop calling and the gizmo is gone. Pass a duration to make one stay longer. That's useful for things that happen once, like marking a raycast hit or a collision point.

Positions are in world space. `Gizmos.DrawLabel` draws readable text in the scene, which is what you want for a value that changes every frame — you see it attached to the object it belongs to, instead of watching it scroll past in the console.

→ [Debugging & Profiling](/docs/how-to-guides/debugging/) · [Gizmos API](https://engine.needle.tools/docs/api/Gizmos)

---

## 14 · Adapting to the device

<walkthrough-tags symbols="DeviceUtilities, XRFlag, XRStateFlag" />

<walkthrough-takeaway>

The same page runs on a phone, a desktop and a headset. You can check which one you're on, and mark objects to appear only in certain modes.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-14-device.html" title="A sphere whose detail depends on the device, plus two boxes that only appear in AR or VR">

@[code js](@code/walkthrough-14-device.js)

</walkthrough-step>

`DeviceUtilities` answers questions about the device: `isMobileDevice()`, `isDesktop()`, and more specific ones like `isIPad()`, `isAndroidDevice()`, `isiOS()` and `isVisionOS()`. Here it decides what gets built at all — a CRT monitor on a desktop, a candybar phone on a mobile. Open this page on your phone to see the other one. The label tells you which branch ran.

The result is cached, so calling it is cheap and you can check wherever it reads best. Here it happens once at startup, because the answer decides what gets built.

`XRFlag` handles the other case: an object that should only exist in some modes. Set `visibleIn` and the object hides everywhere else. That's why the two boxes are missing above — one is marked AR only, the other AR and VR, and you're viewing this in a browser.

The avatar head is the case this exists for. In VR you are looking out through it, so rendering it fills your view with the inside of your own skull. Everyone else still needs to see it, and so do you in third person or when the scene is mirrored into AR:

```ts
head.addComponent(XRFlag, {
    visibleIn: XRStateFlag.Browser | XRStateFlag.ThirdPerson | XRStateFlag.AR,
});
```

Combine modes with `|`. The options are `Browser`, `AR`, `VR`, `FirstPerson` and `ThirdPerson` — and `FirstPerson` / `ThirdPerson` are what make this work, because the same headset session switches between them.

The rule lives on the object, which is why this beats a check elsewhere: the head knows when to hide itself, and nothing has to go looking for it when a session starts.

→ [Detect Mobile Devices](/docs/how-to-guides/scripting/detect-mobile-devices) · [WebXR Guides](/docs/how-to-guides/xr/)

---

## 15 · Audio

<walkthrough-tags symbols="AudioSource, play, pause, getOrAddComponent" />

<walkthrough-takeaway>

Sound is a component you put on an object. Because it sits on the radio, it comes from the radio — orbit away and it gets quieter.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-15-audio.html" title="A radio with 3D buttons for play, pause and track switching, and bars that move while it plays">

@[code js](@code/walkthrough-15-audio.js)

</walkthrough-step>

Click the buttons on the radio itself. They're objects in the scene with a `Button` component, using the pointer methods from [step 07](#07-pointer-input) — `onPointerDown` presses one into the case, `onPointerUp` releases it, and `onPointerClick` calls the matching method on the radio. The action is passed per button as an init object, so one class covers all three.

One `AudioSource` plays all three tracks, and `play()` takes a clip, so changing track is a single call. `Radio` adds the `AudioSource` itself with `getOrAddComponent`, so attaching `Radio` is all you need — and an object that already has one keeps it.

`spatialBlend: 1` makes the sound positional. It comes from wherever the object is and fades as you orbit away. Set it to `0` for flat audio at constant volume, which is what you want for music or narration covering the whole scene.

Browsers block audio until the visitor interacts with the page, but Needle handles that for you: it waits for the first interaction and starts playback then. `playOnAwake` works as you would expect, for audio and for video, and you don't have to write anything for it. It is off here only because the buttons decide when playback starts.

The bars follow the actual sound. `AudioSource.Sound` is the underlying three.js audio object and `audioContext` is the Web Audio context, so `Visualiser` connects an `AnalyserNode` to the output and reads the frequency data each frame. Nothing about that is Needle-specific — it's the standard Web Audio API, reachable because the engine doesn't hide it.

The analyser is created on first use rather than in `start`, because the audio object doesn't exist until something plays.

→ [Spatial Audio sample](https://engine.needle.tools/samples/spatial-audio) · [AudioSource API](https://engine.needle.tools/docs/api/AudioSource)

---

## 16 · Post-processing

<walkthrough-tags symbols="Volume, BloomEffect, DepthOfField, VolumeParameter" />

<walkthrough-takeaway>

Effects are components too. Add them to a `Volume`, set their values, and switch them on and off with the same `enabled` flag as everything else.

</walkthrough-takeaway>

<walkthrough-step
  src="/docs/code-samples/walkthrough-16-postprocessing.html"
  title="Glowing orbs receding into the distance, with bloom and depth of field"
  :actions='[
    { "name": "bloom", "code": "bloom.enabled = !bloom.enabled", "label": "Bloom" },
    { "name": "dof",   "code": "dof.enabled = !dof.enabled",     "label": "Depth of field" }
  ]'>

@[code js](@code/walkthrough-16-postprocessing.js)

</walkthrough-step>

A `Volume` holds the effects. Add it anywhere in the scene, then add each effect as a component next to it — the Volume collects them and passes them to the renderer. Turn both buttons off to see the scene underneath.

Effect settings are `VolumeParameter` objects rather than plain numbers, so values go through `.value`. That extra step is what lets a value be overridden per volume, and animated or blended between volumes.

Bloom only affects what is already brighter than its `threshold`. The orbs use an emissive material to get there — a plain colour would stay below the line and never glow, however high you push the intensity.

`focusDistance` is a distance from the camera in metres, not a point in the scene. It doesn't follow anything on its own, so `FocusOn` recalculates it each frame and the middle orb stays sharp as you orbit.

::: tip Effects load only when used
Post-processing ships as a separate chunk. A scene without a `Volume` never downloads it.
:::

→ [Postprocessing components](/docs/reference/components#postprocessing) · [Postprocessing sample](https://samples.needle.tools/postprocessing) · [Volume API](https://engine.needle.tools/docs/api/Volume)

---

## What's next

That's the whole model: components on objects, a lifecycle, and a context they share. Everything else in Needle Engine is built the same way, so a component you meet later will look like the ones on this page.

**Set up a project.** These examples run from a CDN to keep them copyable, but a project adds hot reload, TypeScript, and the editor integrations. [Getting Started](/docs/getting-started/) — pick Unity, Blender, or code.

**Open components up to the editor.** [Create Components](/docs/how-to-guides/scripting/create-components) covers `@serializable`, so fields can be set per object in Unity and Blender, and where component files live in a project.

**Look things up.** [Scripting Examples](/docs/reference/scripting-examples) is snippets by topic. [Component Reference](/docs/reference/components) lists every built-in component — a lot of what you might write by hand already exists.

**See it at scale.** The [samples gallery](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=walkthrough_next) has 150+ finished projects to pull apart, from configurators to multiplayer games. In Unity and Blender you can install them from the Samples window and open any scene directly.

**Keep the code from this page.** Every step here is a single HTML file that loads one JS file — no build step, nothing to install. Copy a step's code from above, or take the files from [the docs repository](https://github.com/needle-tools/needle-engine-support/tree/main/documentation/.vuepress/public/code-samples). Save the pair side by side, open the HTML, and it runs.

Something missing or unclear on this page? [Open an issue](https://github.com/needle-tools/needle-engine-support/issues) or ask in [Discord](https://discord.needle.tools).

