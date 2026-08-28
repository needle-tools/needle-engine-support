---
title: Scripting Walkthrough
description: Learn Needle Engine scripting one step at a time — short, self-contained examples running live next to the code that produces them.
image: /imgs/scripting-walkthrough-unfurl.webp
editLink: true
---

<ask-ai />

# Scripting Walkthrough

Learn Needle Engine scripting one idea at a time. Each step runs live beside the script that drives it.

The first few steps cover the basics the rest builds on. After that you can jump to whatever you need.

Each example is an HTML page that loads the engine from a CDN, plus the script shown here. The page never changes, so only the script is printed. Both files are in [the docs repository](https://github.com/needle-tools/needle-engine-support/tree/main/documentation/.vuepress/public/code-samples).

There is no build step, so the code is plain JavaScript. See [marking fields as serializable](#marking-fields-as-serializable) for what TypeScript adds.

::: tip New to Needle Engine?
The components you write here are the same ones an artist configures in Unity or Blender, and the same code runs on desktop, mobile and in XR. [Why Needle Engine exists](/docs/why) covers the problem it solves and how it compares to three.js, React Three Fiber and Unity WebGL.
:::

::: tip Looking for something else?
[Scripting Examples](/docs/reference/scripting-examples) has copy-paste snippets by topic. The [samples gallery](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=walkthrough) has finished projects to pull apart.
:::

---

## 01 · Your first component

<walkthrough-tags symbols="Behaviour, update, addComponent" />

<walkthrough-takeaway>

Write a class, attach it to an object, and it starts running. That same class shows up as a component in Unity and Blender, so an artist can use it without touching code.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-01-first-component.html" title="A rotating shape driven by a Behaviour component">

@[code js](@code/walkthrough-01-first-component.js)

</walkthrough-step>

A component is a class extending `Behaviour`. Override the methods you want, then attach it with `addComponent`. This one overrides `update`, which the engine calls once per frame.

Two properties are available inside any component. `this.gameObject` is the object it is attached to. `this.context` is the shared runtime: time, input, physics, the scene.

The rotation is multiplied by `this.context.time.deltaTime`, the seconds since the last frame. This is what keeps the speed the same on every device. Leave it out and the shape turns per frame instead of per second, so it spins faster on hardware that draws more frames.

::: info Coming from plain three.js?
Normally you keep one `animate()` function that calls into every moving part, and add each new one to it by hand. Here `update` sits on the component itself. Adding behaviour to an object never means editing a shared function, and deleting the object takes its logic with it.
:::

→ [Create Components](/docs/how-to-guides/scripting/create-components) · [Lifecycle Hooks](/docs/how-to-guides/scripting/use-lifecycle-hooks)

---

## 02 · Several components on one object

<walkthrough-tags symbols="addComponent, awake" />

<walkthrough-takeaway>

Build behaviour by stacking small components rather than writing one big one. An object can hold any number, and you can add or remove them while the scene runs.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-02-composition.html" title="One shape driven by three independent components at once">

@[code js](@code/walkthrough-02-composition.js)

</walkthrough-step>

One shape, three components: `Rotate` turns it, `MoveUpDown` lifts it, `Breathe` scales it. Each is a few lines long and knows nothing about the other two.

That is the point of the pattern. Three small components are easier to write, reuse and remove than one component doing three jobs. They combine here because each writes to a different property — `rotation.y`, `position.y` and `scale`. Order only starts to matter when two of them write the same one.

Components can reach each other when they need to. `getComponent` finds another on the same object.

`MoveUpDown` and `Breathe` both read `this.context.time.time`, the seconds since the scene started. Passing it through `Math.sin` gives a value that rises and falls forever, so neither has to track a position or a direction of its own.

`MoveUpDown` records its starting height in `awake`. That is the first method to run once a component becomes active, and the earliest point where `this.gameObject` exists. A field initializer would run before the component is attached to anything, with nothing yet to read.

→ [Lifecycle Hooks](/docs/how-to-guides/scripting/use-lifecycle-hooks)

---

## 03 · The component lifecycle

<walkthrough-tags symbols="awake, onEnable, start, onDisable, onDestroy, destroy, enabled" />

<walkthrough-takeaway>

Every component runs through the same sequence: set up, switch on, update each frame, switch off, clean up. Knowing which method runs when is what stops setup code landing in the wrong place.

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

Each button runs the line printed beside it. Try them in order and watch the cone — the three buttons switch things off at three different levels.

**Disable** stops this one behaviour: `update` is no longer called, so the cone stops turning. Nothing else about the object changes — it keeps its position and material, and any other components on it keep running. **Enable** starts it again from where it left off.

**Hide object** sets `visible = false`, which in Needle does more than hide. It deactivates the whole object: every component on it *and on its children* gets `onDisable` and stops updating. To hide an object but keep it running, disable its `Renderer` component instead.

**Destroy** removes the component for good.

::: info Coming from Unity?
`visible = false` is the equivalent of `SetActive(false)`. It deactivates the object and everything under it, rather than only hiding it from view.
:::

### When each method runs

On first activation the order is `awake` → `onEnable` → `start`, then `update` on every frame after that.

`awake` and `start` run once per component and never again, not even if you remove it from an object and add it back. Only a new component runs `awake`. `onEnable` and `onDisable` run every time the component is switched on and off.

That difference decides where your code belongs. Read a starting value once in `awake`. Put anything that has to happen on every switch-on, such as subscribing to an event, in `onEnable`.

One rule keeps components tidy. Undo in `onDestroy` whatever you set up in `awake`. Unsubscribe in `onDisable` whatever you subscribe to in `onEnable`.

For subscriptions there's a shortcut. Wrap one in `this.autoCleanup(...)` and the component unsubscribes it for you. You don't write the `onDisable` half at all — [step 11](#11-networking) uses it for a network listener.

→ [Lifecycle Hooks](/docs/how-to-guides/scripting/use-lifecycle-hooks) · [Lifecycle Methods reference](/docs/reference/api/lifecycle-methods)

---

## 04 · One class, many instances

<walkthrough-tags symbols="addComponent" />

<walkthrough-takeaway>

One class, many copies, each set up differently. `addComponent` takes a second argument with values, so you configure an instance instead of writing a subclass for every variation.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-04-many-instances.html" title="100 cubes sharing one component class, each given a different phase offset">

@[code js](@code/walkthrough-04-many-instances.js)

</walkthrough-step>

100 cubes, one `Wave` class, one geometry and one material. Only `offset` differs, and it is what turns 100 identical cubes into a wave.

Anything the second argument leaves out keeps the value declared on the class. `amplitude` and `speed` are never passed here, so every cube uses the defaults on `Wave`. Values are assigned after the instance is built, which is why they are plain class fields rather than constructor parameters.

### Marking fields as serializable

In a TypeScript project, mark those fields with `@serializable()`:

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class Wave extends Behaviour {
    @serializable()
    amplitude: number = 0.45;

    @serializable()
    speed: number = 2.2;
}
```

That does two things a plain field cannot. The field appears in the Unity or Blender inspector, so someone who does not write code can set it per object. Its value is also written into the glTF on export, so it arrives in the running app instead of falling back to the default.

The examples here leave it out because decorators need TypeScript, and these pages run straight from a CDN. Use it for any component you write in a project.

→ [Create Components](/docs/how-to-guides/scripting/create-components) · [@serializable reference](/docs/reference/typescript-decorators#serializable)

---

## 05 · Components in a hierarchy

<walkthrough-tags symbols="Group, addComponent, rotation" />

<walkthrough-takeaway>

Nesting does the hard part. Each component moves only the object it sits on, but a child inherits its parent's position and rotation, so simple parts combine into complex motion.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-05-hierarchy.html" title="A sun, two planets and a moon, all driven by the same one-line Orbit component at different depths">

@[code js](@code/walkthrough-05-hierarchy.js)

</walkthrough-step>

`Orbit` does one thing: it turns the object it is on. Four copies produce a spinning sun, two planets and a moon.

The pivots do the rest. A pivot sits at the centre of an orbit with the child parked out to one side, so turning the pivot carries the child around it. Nothing in `Orbit` knows what an orbit is.

Two results are visible in the scene. The moon's pivot is a child of the **planet**, so it inherits the planet's orbit and adds its own on top. Tilting the outer pivot by `rotation.z` tilts that whole orbit, because everything under a pivot moves with it.

That is the difference from [step 04](#04-one-class-many-instances). There the copies were siblings and independent. Here they are nested, so their transforms compound.

→ [Create Components](/docs/how-to-guides/scripting/create-components)

---

## 06 · Cloning objects

<walkthrough-tags symbols="instantiate, destroy, getComponentInChildren" />

<walkthrough-takeaway>

Build something once, then copy it as often as you like while the scene runs. `instantiate` takes the object, its children and every component on them.

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

`buildWindmill` builds one windmill, and `instantiate` makes every copy after that. Press **Add one** to add one, and **Remove all** to leave only the original.

`Sway` sits on the root and `Spin` on the blades, which is a child object. Both come along with the copy, because `instantiate` takes the whole subtree rather than the top object.

Use `instantiate` to copy objects. (three.js `clone()` doesn't take components along.)

The second argument places the copy. `parent` adds it to the scene as part of the call. Leave it out and you get the copy back without it being added, so you add it yourself. `position`, `rotation` and `scale` work the same way and take plain arrays.

A clone's components are ordinary components. `getComponent` and `getComponentInChildren` find them, and each clone owns its own instances. Giving one clone a new `speed` leaves the rest turning at theirs.

::: tip Where the original usually comes from
Here the original is built in code so the example stays self-contained. In a project it's more often a model you loaded, or an object placed in Unity or Blender and referenced with `@serializable`. `instantiate` treats them all the same.
:::

To spawn a copy for everyone in a networked scene, `syncInstantiate` does the same job across the connection — see [step 11](#11-networking).

→ [Duplicatable component](/docs/how-to-guides/components/duplicatable) · [syncInstantiate](/docs/how-to-guides/networking/sync-state#syncinstantiate)

---

## 07 · Pointer input

<walkthrough-tags symbols="onPointerEnter, onPointerExit, onPointerClick, MaterialPropertyBlock" />

<walkthrough-takeaway>

Handling clicks takes no setup. Pointer methods belong to a component, like `awake` or `update`, and the engine calls them on whichever object is under the pointer.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-07-input.html" title="Five boxes that highlight on hover and start spinning when clicked">

@[code js](@code/walkthrough-07-input.js)

</walkthrough-step>

Hover a box to highlight it, click to start and stop it spinning. The same component is on all five, and each copy handles its own box. Adding a sixth box means adding the component to it, and nothing else.

::: info Coming from plain three.js?
This is the part you normally write yourself. You set up a `Raycaster`, convert pointer coordinates to normalised device space, and intersect the scene each frame. You also track which object was hit last, so you can tell enter from exit. Needle does all of that and calls the methods on the object instead.

It also does it faster than a plain raycast. Meshes get a [BVH](https://github.com/gkjohnson/three-mesh-bvh) built for them. A hit test then descends a tree instead of walking every triangle, which keeps clicking a dense mesh cheap.
:::

`onPointerEnter` and `onPointerExit` come in pairs. Whatever one changes, the other puts back.

Recolouring a single box is where this usually gets awkward. All five meshes share one `MeshStandardMaterial`, so setting `material.color` on hover would recolour the whole row. The common workaround is to clone the material per object, which creates five materials to vary one property.

`MaterialPropertyBlock` solves it. `MaterialPropertyBlock.get(object)` returns a set of overrides for one object, and the engine applies them per object as it renders. The material itself is never touched and stays shared.

On exit the component removes the one property it set, and the shared colour comes back. There is no original to save in `awake` and no stale value to put back later. `clearAllOverrides()` removes every override at once, which is worth avoiding when something else may have set one.

The same methods fire for touch and for VR controllers, so this component works on a phone and in a headset with no changes.

→ [Handle User Input](/docs/how-to-guides/scripting/handle-input) · [Perform Raycasting](/docs/how-to-guides/scripting/perform-raycasting) · [MaterialPropertyBlocks](/docs/how-to-guides/scripting/material-property-blocks)

---

## 08 · Moving the camera

<walkthrough-tags symbols="OrbitControls, fitCamera, setCameraTargetPosition, setLookTargetPosition" />

<walkthrough-takeaway>

Camera controls come with the scene, so orbit, zoom and double-click-to-focus already work. From code you can frame any object, or send the camera to a shot you chose.

</walkthrough-takeaway>

<walkthrough-step
  src="/docs/code-samples/walkthrough-08-camera.html"
  title="Three objects the camera can frame, focus and fly between"
  :actions='[
    { "name": "frameAll",  "code": "orbit.fitCamera()",                            "label": "Frame everything" },
    { "name": "frameOne",  "code": "orbit.fitCamera({ objects: [tower] })",        "label": "Frame one object" },
    { "name": "fromFront", "code": "orbit.fitCamera({ fitDirection })",            "label": "Frame from the front" },
    { "name": "viewpoint", "code": "orbit.setCameraTargetPosition(pos, 1.2)",      "label": "Fly to a viewpoint" }
  ]'>

@[code js](@code/walkthrough-08-camera.js)

</walkthrough-step>

For most projects you never touch them. This step covers the two times you do: framing an object from code, and sending the camera to a viewpoint you chose.

Try the scene before the buttons. Drag to orbit and scroll to zoom. **Double-click** any object to focus it, and **double-click empty space** to frame everything again. All of that comes with `OrbitControls`.

### Framing objects

`fitCamera()` frames the whole scene. It works out the distance from the bounds of whatever it is framing, so you never guess at a camera position. That helps most with a model whose size you don't know ahead of time.

Two options change what it does:

- `objects` frames a selection instead of everything. This is how you point the camera at one thing without knowing where that thing is.
- `fitDirection` also chooses which side to look from. Without it, the camera fits from wherever it already happens to be. That is the only difference between the third button and the first two.

### The point the camera turns around

The red dot marks it. That point is normally invisible, so `ShowOrbitTarget` draws a marker on it. Making something invisible visible is worth doing whenever it is hard to reason about.

Right-drag to pan and watch the dot slide, then stop at the edge of a box. That box is `targetBounds`. It takes an object, and reads its world position as the centre and its world scale as the size. Panning then stays inside it, which keeps a visitor from wandering off the scene and losing it.

### Moving to a viewpoint

`setCameraTargetPosition` and `setLookTargetPosition` place the camera somewhere specific. The second argument is the travel time in seconds: `1.2` eases over that long, and `true` arrives instantly.

Both take a point rather than a rotation, because the controls aim the camera at a look target. The second call is what decides where the camera ends up pointing.

::: tip Driving the camera yourself
`<needle-engine camera-controls="false">` stops the engine adding controls at all, and [step 09](#09-custom-camera-controls) does exactly that. If you only want to remove part of the behaviour, keeping the controls and switching off rotation, zoom or panning is the smaller change.
:::

→ [Camera Controls (OrbitControls)](/docs/how-to-guides/components/orbit-controls) · [OrbitControls API](https://engine.needle.tools/docs/api/OrbitControls)

---

## 09 · Custom camera controls

<walkthrough-tags symbols="camera-controls, getPointerPositionRC, Mathf.clamp" />

<walkthrough-takeaway>

Writing your own camera controls is a component, not a project. Turn the built-in ones off, move the camera in `update`, and you decide exactly what it can do.

</walkthrough-takeaway>

<walkthrough-step
  src="/docs/code-samples/walkthrough-09-custom-camera.html"
  title="A camera that looks towards the cursor, and zooms in on what you hold"
  :actions='[
    { "name": "front", "code": "rig.moveTo(VIEWPOINTS.front)", "label": "Move to the front" },
    { "name": "side",  "code": "rig.moveTo(VIEWPOINTS.side)",  "label": "Move to the side" }
  ]'>

@[code js](@code/walkthrough-09-custom-camera.js)

</walkthrough-step>

A camera controller is a component like any other. It reads input in `update` and moves the object it sits on. There is no special base class and no system to register with. `CameraRig` below is the whole thing.

That matters because built-in controls are general by design. Sometimes you want a camera that behaves one specific way: locked to a corridor, driven by scroll, or limited like this one. Writing forty lines is usually less work than bending orbit controls into shape.

Try it first. Move the cursor across the scene and the camera turns towards it, up to 18° to either side and 9° up and down. Hold down any object and the camera leans in. The field of view narrows, the aim moves onto that object, and the cursor glance eases back to centre. Let go and all three reverse.

### Switching the defaults off

The page sets `camera-controls="false"`. The engine then adds no controls of its own, and the camera is left to this component.

A component can also take their place. When the context is created, the engine looks for a camera controller on the main camera, and only adds `OrbitControls` if it finds none. `CameraRig` reports `isCameraController`, which is what marks it as one. That check runs once at startup, so it suits a camera set up in Unity or Blender. For a scene built entirely in code, the attribute is the simpler route.

### What the rig does

`getPointerPositionRC` gives the cursor from `-1` to `1`, with `0` at the centre. That is already what you want: how far from the middle, whatever the canvas size. Clamp it before use and a cursor leaving the canvas stops pushing the camera further.

Position, field of view, look-at point and glance angles all ease towards a value instead of jumping to it. This is what makes an interruption safe. Press the other button while the camera is moving and it simply heads somewhere else.

The rig aims from a point each frame rather than turning the camera a little more each time. That keeps the angle limits exact, however long you move the cursor around. Yaw turns around world up, and pitch around the camera's own right, which keeps the horizon level. Rotating in the camera's local space would roll it, slightly but visibly.

Hovering brightens the object with a `MaterialPropertyBlock`, the same as [step 07](#07-pointer-input). It overrides the colour on that one object, not on the material it shares.

→ [Camera Controls (OrbitControls)](/docs/how-to-guides/components/orbit-controls) · [OrbitControls API](https://engine.needle.tools/docs/api/OrbitControls) · [Handle User Input](/docs/how-to-guides/scripting/handle-input)

---

## 10 · Physics and collisions

<walkthrough-tags symbols="Rigidbody, BoxCollider, SphereCollider, PhysicsMaterial, onCollisionEnter, applyImpulse" />

<walkthrough-takeaway>

Physics is two components, not a system you set up. A `Rigidbody` makes an object move. A collider gives it a shape. The engine then calls your component when something hits it, the same way it calls pointer events. You don't have to write any physics code to receive them.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-10-physics.html" title="Three balls with different bounciness dropped onto a floor that flashes when hit — click a ball to launch it">

@[code js](@code/walkthrough-10-physics.js)

</walkthrough-step>

Click any ball to launch it upwards. The difference in bounciness shows on the way back down.

`applyImpulse` is an instant change in velocity, like a kick. Use `applyForce` instead for a push applied over time.

You usually need both components. **`Rigidbody`** makes an object fall and respond to forces. A **collider** gives it a shape to collide with. An object with a collider and no `Rigidbody` never moves, which is exactly right for the floor here, and for walls and scenery.

`onCollisionEnter(collision)` fires on the component when its object is hit. `collision.gameObject` is the *other* object involved, so the floor can report what landed on it without keeping a list of balls.

There are two more: `onCollisionExit` when the contact ends, and `onCollisionStay` on every frame it lasts.

Each ball carries a different **physics material** on its collider. `bounciness` rises from `0` on the left to `0.98` on the right. That is the entire difference between the clay, plastic and rubber balls. `bounceCombine: Maximum` lets each ball's own value decide the result. The default averages it with the floor's, so a bouncy ball on a dead floor would only half bounce.

A collider is its own shape and doesn't read the mesh. `BoxCollider` defaults to 1×1×1 whatever the object's size, so anything landing off that pad falls through. `BoxCollider.add(object)` fits it to the geometry for you. Other collider types have no such helper.

::: tip Needle Engine only downloads what you use
The physics engine is a separate chunk, fetched the first time a physics component is added. A project with no physics never downloads that code at all — it isn't shipped in the page and left unused.
:::

### Mass and density

Nothing here sets a mass, because you rarely need to. A `Rigidbody` has `autoMass` on by default and works out its mass from the colliders attached to it, using `mass = density × volume`.

That means **size already affects weight**. Double a ball's radius and it gets heavier on its own, with no code change. Hardcoding a mass breaks that.

To make something heavier or lighter than its size suggests, set `density` on the collider rather than `mass` on the body. Density is a real-world figure: water is `1.0` (the engine default), rubber `1.2`, steel `7.8`. Setting `mass` directly still works, but it switches `autoMass` off, and from then on the value stays fixed even if the object is rescaled.

Physics is powered by [Rapier](https://rapier.rs/), which the engine loads on demand the first time a scene uses it.

→ [Use Physics](/docs/how-to-guides/scripting/use-physics)

---

## 11 · Networking

<walkthrough-tags symbols="SyncedRoom, connection.send, connection.beginListen, syncField" />

<walkthrough-takeaway>

Multiplayer needs no separate architecture. Join a room, send a message when something changes, and listen for the same message to apply what other people did.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-11-networking.html" title="Two visitors in one room, clicking cubes to change their colour for both" split>

@[code js](@code/walkthrough-11-networking.js)

</walkthrough-step>

Two views of the same room, side by side. This is what two people opening the same link would see. Click a cube in either one and it changes in both.

`SyncedRoom` joins a room, and that is the whole connection setup. See [Set Up Networking](/docs/how-to-guides/networking/setup) for rooms, servers and hosting.

From there, `connection.send(channel, data)` broadcasts to everyone else in the room, and `connection.beginListen(channel, callback)` receives. The channel is any string both sides agree on. All three cubes share one channel here, and the message says which cube it is about.

Three details are worth knowing:

**The `guid` makes the change persist.** A message sent with one is stored in the room state on the server, so anyone joining later receives it. Without a `guid` the message only reaches people already in the room and is then forgotten.

The value also identifies which cube changed, so it has to mean the same thing in every visitor's browser. Each component is given one where it is added, built from the cube's name. A scene exported from Unity or Blender usually uses the component's own `guid`, which the export assigns and every client receives.

**The click applies the colour locally as well as sending it.** `send` broadcasts to everyone else in the room. It does not come back to the sender. Leave out the local `apply` and the one person who clicked is the only one who sees nothing happen.

**`beginListen` is wrapped in `autoCleanup`.** A listener that outlives its component keeps firing against an object that's gone. Subscribing in `onEnable` and letting `autoCleanup` unsubscribe is the pairing rule from [step 03](#03-the-component-lifecycle).

### Syncing a field instead

Explicit messages are worth understanding. To keep a single value in step, though, there is far less to write:

```ts
export class SharedColor extends Behaviour {
    @syncField("onIndexChanged")
    index: number = 0;

    onIndexChanged() {
        this.apply();
    }
}
```

Assigning `this.index = 2` now syncs on its own. There is no channel name, no `send` and no listener to clean up. Persistence is handled for you, rather than depending on you remembering the `guid`.

Like [`@serializable`](#marking-fields-as-serializable), it's a decorator and needs TypeScript — which is why the runnable example on this page uses the explicit calls instead.

→ [Networking Overview](/docs/how-to-guides/networking/) · [Sync Component State](/docs/how-to-guides/networking/sync-state) · [Manual Networking](/docs/how-to-guides/networking/manual-networking) — including `dontSave` and `deleteOnDisconnect` for finer control over what persists

---

## 12 · AR and VR

<walkthrough-tags symbols="WebXR, XRRig" />

<walkthrough-takeaway>

One component adds AR and VR. There is no separate build and no separate code path — the components you already wrote keep running in a headset.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-12-webxr.html" title="A scene with AR and VR enabled by a single WebXR component">

@[code js](@code/walkthrough-12-webxr.js)

</walkthrough-step>

The buttons appear on their own when a mode is available. A phone offers AR, a headset offers VR, and so does a desktop with a headset connected.

Two options cover the machines without one. `createSendToQuestButton` offers to open the page on a Quest. `createQRCode` shows a QR code, so you can open the same URL on a phone and try AR. `useDefaultControls` adds movement and teleporting once you are in VR.

`arScale` is worth setting for AR, because a scene is placed at real-world size. A cube one unit across arrives as a one-metre block in the room.

The value scales *you*, not the scene. Raise it and you become larger relative to everything, so the scene looks smaller. `8` here brings it down to something that sits on a table.

`XRRig` decides where the visitor arrives. In XR the user is parented to a rig, so moving the rig moves the user — put one where you want someone to start, facing the way you want them to look. Without one they begin at the world origin, which may be inside your scene. A scene can hold several rigs and switch between them during a session with `setAsActiveXRRig()`.

`Spin` is the same component from step 01, unchanged, running in a headset.

→ [WebXR Guides](/docs/how-to-guides/xr/) · [iOS WebXR](/docs/how-to-guides/xr/ios-webxr-app-clip) · [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) for AR on iOS via QuickLook

---

## 13 · Following the cursor

<walkthrough-tags symbols="CursorFollow, LookAt" />

<walkthrough-takeaway>

Check for a built-in component before writing one. Two of them make a head that watches you, with no code of your own: one follows the pointer, the other aims an object at a target.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-13-cursor.html" title="A head whose eyes track the mouse pointer">

@[code js](@code/walkthrough-13-cursor.js)

</walkthrough-step>

`CursorFollow` moves an object towards the pointer. `damping` sets how smoothly it gets there: higher values ease in gradually, lower values track the pointer closely. `LookAt` turns an object to face a target.

The pupils are children of the eyes, so turning an eye takes its pupil with it. That is the same nesting idea as [step 05](#05-components-in-a-hierarchy).

The [Component Reference](/docs/reference/components) lists everything that ships with the engine. It is worth a look before writing something yourself.

→ [Cursor Follow](/docs/how-to-guides/components/cursor-follow) · [Component Reference](/docs/reference/components)

---

## 14 · Loading a model

<walkthrough-tags symbols="loadAsset" />

<walkthrough-takeaway>

Load a model from any URL while the scene is running. What comes back is an ordinary object, so components attach to it like anything else.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-14-loading.html" title="A model downloaded from a URL at runtime and framed by the camera">

@[code js](@code/walkthrough-14-loading.js)

</walkthrough-step>

`loadAsset(url)` fetches and parses the file, then hands back an object with `.scene` and `.animations`. It doesn't add anything to your scene, so you decide where the model goes and when it appears.

`asset.scene` is a plain `THREE.Object3D`. Add components to it, move it, or parent it to something else, exactly as with a shape you built yourself. A loaded object is not special in any way.

`fitCamera()` on `OrbitControls` frames whatever is in the scene. That saves guessing at a camera position for a model whose size you don't know in advance.

Assets exported through Needle are compressed and progressively loaded by default, so a model like this one appears early instead of arriving all at once.

This is one of four ways to load a model. Which one fits depends on what you are doing: a single root scene, switching between many, spawning copies of one, or a quick one-off like this.

→ [Load 3D Web Assets at Runtime](/docs/how-to-guides/scripting/load-3d-web-assets-at-runtime) compares all four

---

## 15 · Seeing what your code is doing

<walkthrough-tags symbols="Gizmos" />

<walkthrough-takeaway>

Draw into the scene from code to see what a value is doing. Gizmos put it on the object it belongs to, instead of in the console.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-15-gizmos.html" title="An orbiting marker with its path, position and heading drawn as gizmos">

@[code js](@code/walkthrough-15-gizmos.js)

</walkthrough-step>

`Orbit` moves the marker. `ShowWhatItIsDoing` draws the circle it follows, a sphere at its position, a line back to the centre, and a label with the live coordinates.

Call a `Gizmos` method and it draws at the position you give it. Positions are in world space.

Each call lasts one frame, which is why these sit in `update`. Stop calling and the gizmo is gone. Pass a duration to keep one on screen longer, which suits things that happen once — a raycast hit, or a collision point.

`Gizmos.DrawLabel` draws readable text in the scene. That suits a value which changes every frame, because you see it on the object it belongs to rather than scrolling past in the console.

→ [Debugging & Profiling](/docs/how-to-guides/debugging/) · [Gizmos API](https://engine.needle.tools/docs/api/Gizmos)

---

## 16 · Adapting to the device

<walkthrough-tags symbols="DeviceUtilities, XRFlag, XRStateFlag" />

<walkthrough-takeaway>

The same page runs on a phone, a desktop and a headset. Check which one you are on, and mark objects to appear only in the modes you choose.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-16-device.html" title="A sphere whose detail depends on the device, plus two boxes that only appear in AR or VR">

@[code js](@code/walkthrough-16-device.js)

</walkthrough-step>

`DeviceUtilities` answers questions about the device. `isMobileDevice()` and `isDesktop()` cover most cases, with `isIPad()`, `isAndroidDevice()`, `isiOS()` and `isVisionOS()` for the rest.

Here the answer decides what gets built: a CRT monitor on a desktop, a candybar phone on a mobile. Open this page on your phone to see the other branch. The label reports which one ran.

Results are cached, so a check costs nothing and can go wherever it reads best. This one runs at startup, because it decides what to build.

`XRFlag` covers the other case: an object that should exist in some modes only. Set `visibleIn` and the object hides everywhere else. That is why two boxes are missing above — one is marked AR only, the other AR and VR, and you are in a browser.

The avatar head is the case this exists for. In VR you are looking out through it, so rendering it fills your view with the inside of your own skull. Everyone else still needs to see it, and so do you in third person or when the scene is mirrored into AR:

```ts
head.addComponent(XRFlag, {
    visibleIn: XRStateFlag.Browser | XRStateFlag.ThirdPerson | XRStateFlag.AR,
});
```

Combine modes with `|`. The options are `Browser`, `AR`, `VR`, `FirstPerson` and `ThirdPerson`. The last two are what make this work, because the same headset session switches between them.

The rule lives on the object. The head knows when to hide itself, and nothing has to go looking for it when a session starts.

→ [Detect Mobile Devices](/docs/how-to-guides/scripting/detect-mobile-devices) · [WebXR Guides](/docs/how-to-guides/xr/)

---

## 17 · Audio

<walkthrough-tags symbols="AudioSource, play, pause, getOrAddComponent" />

<walkthrough-takeaway>

Sound is a component you put on an object. This one sits on the radio, so the sound comes from the radio and fades as you orbit away.

</walkthrough-takeaway>

<walkthrough-step src="/docs/code-samples/walkthrough-17-audio.html" title="A radio with 3D buttons for play, pause and track switching, and bars that move while it plays">

@[code js](@code/walkthrough-17-audio.js)

</walkthrough-step>

Click the buttons on the radio itself. They are objects in the scene with a `Button` component, using the pointer methods from [step 07](#07-pointer-input). `onPointerDown` presses one into the case, `onPointerUp` releases it, and `onPointerClick` calls the matching method on the radio. Each button gets its action as an init object, so one class covers all three.

One `AudioSource` plays every track. `play()` takes a clip, so changing track is a single call.

`Radio` adds the `AudioSource` itself with `getOrAddComponent`. Attaching `Radio` is therefore all you need, and an object that already has an `AudioSource` keeps the one it has.

`spatialBlend: 1` makes the sound positional. It comes from wherever the object is and fades as you orbit away. Set it to `0` for flat audio at constant volume, which is what you want for music or narration covering the whole scene.

Browsers block audio until the visitor interacts with the page. The engine handles that: it waits for the first interaction and starts playback then. `playOnAwake` works as you would expect, for audio and for video, with nothing to write yourself. It is off here only because the buttons decide when playback starts.

The bars follow the actual sound. `AudioSource.Sound` is the underlying three.js audio object, and `audioContext` is the Web Audio context. `Visualiser` connects an `AnalyserNode` to the output and reads the frequency data each frame. That is the standard Web Audio API, reachable because the engine does not hide it.

The analyser is created on first use rather than in `start`, because the audio object doesn't exist until something plays.

→ [Spatial Audio sample](https://engine.needle.tools/samples/spatial-audio) · [AudioSource API](https://engine.needle.tools/docs/api/AudioSource)

---

## 18 · Post-processing

<walkthrough-tags symbols="BloomEffect, DepthOfField, ScreenSpaceAmbientOcclusionN8, VolumeParameter" />

<walkthrough-takeaway>

Bloom, depth of field, ambient occlusion and the rest ship as components. Add one to the scene to switch it on, remove it to switch it off — the same as any other component.

</walkthrough-takeaway>

<walkthrough-step
  src="/docs/code-samples/walkthrough-18-postprocessing.html"
  title="Glowing orbs receding into the distance, with bloom and depth of field"
  :actions='[
    { "name": "bloom", "code": "bloom.enabled = !bloom.enabled", "label": "Toggle bloom" },
    { "name": "dof",   "code": "dof.enabled = !dof.enabled",     "label": "Toggle depth of field" },
    { "name": "ao",    "code": "ao.enabled = !ao.enabled",       "label": "Toggle ambient occlusion" }
  ]'>

@[code js](@code/walkthrough-18-postprocessing.js)

</walkthrough-step>

An effect registers itself when you add it. There is no manager or profile asset to set up first — `addComponent` is the whole setup. Turn all three buttons off to see the scene underneath.

`context.postprocessing` is the subsystem effects register with, if you ever need to reach it directly.

Effect settings are `VolumeParameter` objects rather than plain numbers, so values go through `.value`. That extra step is what lets a setting be animated, or blended between one set of values and another.

Bloom only affects what is already brighter than its `threshold`. The lamps use an emissive material to get there. A plain colour stays below the line and never glows, however high you push the intensity.

`focusDistance` is a distance from the camera in metres, not a point in the scene, so it follows nothing on its own. `AutoFocus` does what a camera does: it raycasts through the middle of the view and focuses on whatever it hits.

`screenPoint` is in normalized device coordinates, so `(0, 0)` is the centre. Hits come back sorted, nearest first.

The raycast runs on a timer rather than every frame, because focus does not need measuring 60 times a second. Each new distance is eased into, which is what makes it rack focus instead of snapping. Orbit the scene and watch the focus follow what you point at.

::: tip Needle Engine only downloads what you use
The post-processing library is a separate chunk, fetched the first time an effect component is added. A project with no effects never downloads that code at all — it isn't shipped in the page and left unused. The same is true of physics, in [step 10](#10-physics-and-collisions).
:::

→ [Post-Processing Effects](/docs/how-to-guides/rendering/postprocessing) · [Postprocessing components](/docs/reference/components#postprocessing) · [Postprocessing sample](https://samples.needle.tools/postprocessing)

---

## 19 · Scrolling along a spline

<walkthrough-tags symbols="SplineContainer, SplineWalker, position01, addKnot, ObjectUtils" />

<walkthrough-takeaway>

A spline is a path through a list of points. Put a `SplineWalker` on the camera and you can send it anywhere along that path, driven by scroll, by time, or by anything else you like.

</walkthrough-takeaway>

<walkthrough-step
  src="/docs/code-samples/walkthrough-19-spline.html"
  title="A camera circling a podium as you scroll, with shapes spiralling in to hang above it"
  :actions='[
    { "name": "path",   "code": "spline.getPointAt(t)", "label": "Show the path" },
    { "name": "replay", "code": "scrollTo({ top: 0 })",         "label": "Reset scene" }
  ]'>

@[code js](@code/walkthrough-19-spline.js)

</walkthrough-step>

Scroll inside the scene to move the camera. Press **Show the path** to draw every curve at once.

A spline is a path through a list of points. `SplineContainer` holds one and smooths the curve between them, so a few points give you a shape that would be tedious to describe any other way.

`SplineWalker` moves an object along that path. Its `position01` runs from 0 at the start to 1 at the end, whatever the length. Scroll progress is also 0 to 1, so one sets the other directly.

Every position in the scene is read from the scrollbar each frame, so the scene follows it in both directions.

The camera, the four shapes and the path drawing are each a small component of your own — the walker is a convenience, not a requirement.

::: tip Building a scroll-driven page?
The page pins the scene with `position: fixed` and puts a tall empty element behind it. That element gives the page its scroll length, and nothing else has to move. Open the <a href="/docs/code-samples/walkthrough-19-spline.html" target="_blank">example page</a> on its own to see it full size.
:::

→ [SplineContainer API](https://engine.needle.tools/docs/api/SplineContainer) · [SplineWalker API](https://engine.needle.tools/docs/api/SplineWalker) · [Splines sample](https://samples.needle.tools/splines)

---

## What's next

That is the whole idea: components on objects, a lifecycle, and a context they share. Everything else in Needle Engine works the same way, so a component you meet later will look like the ones on this page.

**Set up a project.** These examples run from a CDN to keep them copyable, but a project adds hot reload, TypeScript, and the editor integrations. [Getting Started](/docs/getting-started/) — pick Unity, Blender, or code.

**Open components up to the editor.** [Create Components](/docs/how-to-guides/scripting/create-components) covers `@serializable`, which lets fields be set per object in Unity and Blender. It also covers where component files live in a project.

**Look things up.** [Scripting Examples](/docs/reference/scripting-examples) is snippets by topic. [Component Reference](/docs/reference/components) lists every built-in component — a lot of what you might write by hand already exists.

**See it at scale.** The [samples gallery](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=walkthrough_next) has 150+ finished projects to pull apart, from configurators to multiplayer games. In Unity and Blender you can install them from the Samples window and open any scene directly.

**Keep the code from this page.** Every step is one HTML page and one JS file, with no build step and nothing to install. Take both from [the docs repository](https://github.com/needle-tools/needle-engine-support/tree/main/documentation/.vuepress/public/code-samples) — the script alone won't run, since the page is what loads the engine. Save the pair side by side, open the HTML, and it works.

Something missing or unclear on this page? [Open an issue](https://github.com/needle-tools/needle-engine-support/issues) or ask in [Discord](https://discord.needle.tools).

