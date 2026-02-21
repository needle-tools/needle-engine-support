# Needle Engine — LLM Context Reference

> Needle Engine is an open-source, web-based 3D engine built on **three.js**. It exports interactive 3D scenes from **Unity** or **Blender** to the web as lightweight **glTF** files, running anywhere via a `<needle-engine>` web component. It supports scripting in TypeScript, multiplayer networking, WebXR (VR/AR), and deploys to any static hosting.

**Key facts:**
- Runtime: TypeScript / JavaScript on three.js
- Asset format: glTF / GLB (with custom extensions for components, lightmaps, etc.)
- Editor integrations: Unity (2020.3+), Blender (4.1+), or standalone via npm/CDN
- Output: Static website (HTML/JS/CSS) — no server required for basic use
- License: Core is open-source; some features (branding removal, compression presets) require Pro

---

## Getting Started

### Prerequisites
- **Node.js** 20 LTS or 22 LTS (minimum 18.x)
- **Unity** 2021.3.9+ or 2022.3.0+ (recommended) — or —
- **Blender** 4.1+ (4.5 LTS recommended)
- Modern browser with WebGL 2.0

### Unity Setup
1. Download Needle Engine package from needle.tools
2. Open Unity, go to Package Manager → Add from disk or git URL
3. Create new scene, add empty GameObject → Add Component → `Needle Engine`
4. Press Play — a web project is auto-generated alongside the Unity project and a local dev server starts
5. Custom TypeScript files go in `src/scripts/` — component stubs auto-generate as C# scripts in Unity

### Blender Setup
1. Install the Needle Engine add-on for Blender
2. Open Blender, enable add-on in Preferences
3. Open the Needle Engine panel in 3D Viewport sidebar
4. Generate a new project or link to an existing web project directory
5. Press Play — local dev server starts; changes in Blender export automatically

### Vanilla Web / three.js (No Editor)
**CDN (quickest):**
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="scene.glb" camera-controls auto-rotate></needle-engine>
```

**npm:**
```bash
npm install @needle-tools/engine
```

**Lifecycle hooks for vanilla usage:**
```ts
import { onStart, onUpdate } from "@needle-tools/engine";

onStart(ctx => {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial());
  ctx.scene.add(mesh);
});

onUpdate(ctx => {
  // runs every frame
});
```

Available hooks: `onInitialized`, `onStart`, `onUpdate`, `onBeforeRender`, `onAfterRender`.

### Project Structure (Generated Web Project)
```
my-project/
├── index.html              ← <needle-engine> web component
├── src/
│   ├── main.ts             ← Engine bootstrap
│   ├── scripts/            ← Your custom components
│   └── generated/          ← Auto-generated (don't edit)
├── assets/                 ← Exported .glb files
├── include/                ← Custom static assets copied to build
├── dist/                   ← Production build output
├── package.json
├── vite.config.js
├── tsconfig.json
└── needle.config.json      ← Needle-specific config
```

---

## `<needle-engine>` Web Component

### Core Attributes
| Attribute | Type | Description |
|---|---|---|
| `src` | string / array | Path to glTF/glb file(s) |
| `camera-controls` | boolean | Add OrbitControls automatically |
| `auto-rotate` | boolean | Auto-rotate (with camera-controls) |
| `autoplay` | boolean | Auto-play animations |

### Visual Attributes
| Attribute | Values | Description |
|---|---|---|
| `background-color` | hex / rgb | Background color (`#dd5500`, `rgb(255,200,100)`) |
| `background-image` | URL / preset | Skybox (`studio`, `blurred-skybox`, `quicklook`, `quicklook-ar`) |
| `background-blurriness` | 0–1 | Background blur |
| `environment-image` | URL / preset | Environment lighting image |
| `contactshadows` | boolean | Enable contact shadows |
| `tone-mapping` | none/linear/neutral/agx | Tone mapping mode |
| `tone-mapping-exposure` | number | Exposure value |

### Loading & Branding
| Attribute | Description |
|---|---|
| `poster` | Placeholder image URL (or empty for default) |
| `loading-blur` | Blur scene until LODs load |
| `loading-background` | Background color during load |
| `hide-loading-overlay` | Hide loading UI |
| `logo-src` | Custom logo URL |

### Decoder Paths
| Attribute | Description |
|---|---|
| `dracoDecoderPath` | Path to Draco WASM decoder |
| `dracoDecoderType` | `wasm` or `js` |
| `ktx2DecoderPath` | Path to KTX2 decoder |

### Events
```html
<needle-engine src="scene.glb" progress="onProgress" loadfinished="onLoaded"></needle-engine>
<script>
function onProgress(ctx, evt) { console.log(evt.detail.totalProgress01); }
function onLoaded() { console.log("Scene loaded"); }
</script>
```

---

## Scripting & Components

### Creating a Component
All components extend `Behaviour` (note the British spelling). The file must be in `src/scripts/`.
```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
  @serializable()
  speed: number = 1;

  update() {
    this.gameObject.rotateY(this.speed * this.context.time.deltaTime);
  }
}
```

### Component Lifecycle (execution order)
| Method | When |
|---|---|
| `awake()` | On creation, before any other method |
| `onEnable()` | When component or object is enabled |
| `start()` | Before the first frame update |
| `earlyUpdate()` | Beginning of frame |
| `update()` | Every frame |
| `lateUpdate()` | After all update() calls |
| `fixedUpdate()` | At physics tick rate |
| `onBeforeRender()` | Just before rendering |
| `onAfterRender()` | Just after rendering |
| `onDisable()` | When component or object is disabled |
| `onDestroy()` | When component is destroyed |

### TypeScript Decorators

**@serializable(type?)** — Expose field to the editor; values transfer from Unity/Blender.
```ts
@serializable()       speed: number = 1;
@serializable()       label: string = "Hello";
@serializable(Object3D) target?: Object3D;
@serializable(Object3D) waypoints: Object3D[] = [];
@serializable(EventList) onClick?: EventList;
```

**@syncField(onChangedMethod?)** — Auto-sync field across networked clients.
```ts
@syncField("onColorChanged")
@serializable()
color: string = "#ff0000";

onColorChanged() { /* reacts to remote changes */ }
```

**@validate(method)** — Called when field changes (local or synced).
```ts
@validate("onHealthChanged")
@serializable()
health: number = 100;

onHealthChanged() { console.log("Health is now", this.health); }
```

**@prefix(type)** — Namespace for persistent state keys.
```ts
@prefix("my-app")
export class MyComponent extends Behaviour { ... }
```

### Context Object (`this.context`)
| Property | Type | Description |
|---|---|---|
| `scene` | Scene | three.js scene |
| `mainCamera` | Camera | Active camera |
| `renderer` | WebGLRenderer | three.js renderer |
| `domElement` | HTMLElement | Canvas container |
| `time.time` | number | Scaled time since start |
| `time.deltaTime` | number | Seconds since last frame |
| `time.frameCount` | number | Total frames rendered |
| `time.realtimeSinceStartup` | number | Unscaled time |
| `time.timeScale` | number | Time multiplier (default 1) |
| `input` | Input | Input system |
| `physics` | Physics | Physics / raycasting |

### Getting & Adding Components
```ts
const rb = this.gameObject.getComponent(Rigidbody);
const allRenderers = this.gameObject.getComponents(Renderer);
const childLight = this.gameObject.getComponentInChildren(Light);
const parentCam = this.gameObject.getComponentInParent(Camera);

// Add at runtime
const rb = this.gameObject.addNewComponent(Rigidbody);
```

### Working with three.js Objects
```ts
// this.gameObject IS a three.js Object3D
this.gameObject.position.set(0, 1, 0);
this.gameObject.rotateY(Math.PI / 4);
this.gameObject.scale.multiplyScalar(2);
this.gameObject.visible = false;

// Hierarchy
const parent = this.gameObject.parent;
const children = this.gameObject.children;
const found = this.context.scene.getObjectByName("MyObj");

// Materials (clone before modifying to avoid shared edits)
const renderer = this.gameObject.getComponent(Renderer);
if (renderer) {
  const mat = renderer.sharedMaterial.clone();
  renderer.sharedMaterial = mat;
  mat.color.set(0xff0000);
}
```

---

## Input

### Pointer Events (on components — requires mesh + ObjectRaycaster in parent)
```ts
onPointerEnter(args: PointerEventData) { }
onPointerMove(args: PointerEventData) { }
onPointerExit(args: PointerEventData) { }
onPointerDown(args: PointerEventData) { }
onPointerUp(args: PointerEventData) { }
onPointerClick(args: PointerEventData) { }
```

`PointerEventData` includes: `point` (Vector3), `object` (Object3D), `button`, `pointerId`.

### Keyboard & Pointer Polling (`this.context.input`)
```ts
input.getKey("w")           // held
input.getKeyDown("Space")   // just pressed
input.getKeyUp("Escape")    // just released

input.getPointerDown(0)     // button 0 held
input.getPointerPressed(0)  // just pressed
input.getPointerUp(0)       // just released
input.getPointerPosition(0) // Vector2 (normalized)
```

### Global Input Events
```ts
this.context.input.addEventListener(InputEvents.PointerDown, (evt: NEPointerEvent) => { });
this.context.input.addEventListener(InputEvents.KeyDown, (evt: KeyboardEvent) => { });
```

---

## Physics (Rapier Engine)

### Rigidbody
Properties: `mass`, `drag`, `angularDrag`, `useGravity`, `isKinematic`, `lockRotation`.
```ts
rb.applyImpulse(new Vector3(0, 10, 0));  // instant
rb.applyForce(new Vector3(0, 5, 0));     // continuous
rb.setVelocity(new Vector3(0, 0, 5));
```

### Collision & Trigger Events
```ts
onCollisionEnter(col: Collision) { console.log("hit", col.collider.gameObject.name); }
onCollisionStay(col: Collision) { }
onCollisionExit(col: Collision) { }
onTriggerEnter(col: Collision) { }
onTriggerStay(col: Collision) { }
onTriggerExit(col: Collision) { }
```

### Raycasting
```ts
const hits = this.context.physics.raycast(origin, direction, { maxDistance: 100 });
if (hits.length > 0) {
  console.log(hits[0].point, hits[0].object.name, hits[0].distance);
}
```

---

## Coroutines
```ts
import { WaitForSeconds, WaitForFrames } from "@needle-tools/engine";

start() { this.startCoroutine(this.myRoutine()); }

*myRoutine() {
  console.log("Start");
  yield WaitForSeconds(2);
  console.log("2s later");
  yield;  // wait one frame
  yield WaitForFrames(60);
}
```

Stop: `this.stopCoroutine(handle)`. Nest: `yield* this.subRoutine()`.

---

## Built-in Components

### Audio
- `AudioListener` — Attach to camera to receive audio
- `AudioSource` — Plays audio clips (spatial audio supported)

### Animation
- `Animator` — State machine with transitions and conditions
- `Animation` — Simple single-clip playback
- `PlayableDirector` — Timeline sequences (activation, animation, audio tracks)

### Camera & Controls
- `Camera` — Perspective / orthographic viewpoint
- `OrbitControls` — Rotate, zoom, pan around a target
- `ViewBox` — Responsive viewport bounds (defines visible area)

### Rendering
- `Light` — Directional, Point, Spot (with shadows)
- `MeshRenderer` — Standard mesh rendering (with lightmap + instancing support)
- `SkinnedMeshRenderer` — Animated/deformable meshes
- `SpriteRenderer` — 2D sprites
- `ParticleSystem` — Particle effects
- `VideoPlayer` — Video playback (file, MediaStream, M3U8)
- `XRFlag` — Visibility by mode (Browser / VR / AR / FirstPerson / ThirdPerson)
- `DeviceFlag` — Visibility by device type
- `ShadowCatcher` — Invisible mesh that receives shadows
- `ContactShadows` — Realtime contact shadows
- `GroundProjection` — Project environment onto ground plane
- `SeeThrough` — Fade objects that obscure the camera view

### Post-Processing (via `Volume` component)
`Antialiasing`, `BloomEffect`, `ChromaticAberration`, `ColorAdjustments`, `DepthOfField`, `TiltShiftEffect`, `Vignette`, `ToneMappingEffect`, `PixelationEffect`, `ScreenSpaceAmbientOcclusion`, `SharpeningEffect`

### Physics (Rapier)
- `Rigidbody` — Dynamic / kinematic / static body
- `BoxCollider`, `SphereCollider`, `CapsuleCollider`, `MeshCollider`
- `Attractor` — Attract or repel rigidbodies

### Interaction
- `DragControls` — Drag objects (needs ObjectRaycaster)
- `Duplicatable` — Clone objects by dragging
- `SmoothFollow` — Smooth follow a target
- `Deletable` / `DeleteBox` — Deletable objects + deletion zone
- `DropListener` — Receive file-drop events
- `SpatialTrigger` / `SpatialTriggerReceiver` — Events when objects enter a region
- `HoverAnimation` — Animate on hover
- `CursorFollow` — Make object follow cursor
- `ScrollFollow` — Bind page scroll to animations / timeline playback

### Networking
- `SyncedRoom` — Enable multiplayer (required)
- `Networking` — Configure custom backend server
- `SyncedTransform` — Sync position / rotation / scale
- `SyncedCamera` — Sync camera view
- `PlayerSync` — Instantiate per-user objects (avatars)
- `Voip` — Voice chat (spatial audio)
- `ScreenCapture` — Screen sharing

### UI (Spatial — three-mesh-ui based)
- `Canvas` — World-space UI container
- `Text` — Rendered text
- `Button` — Clickable with `onClick` event
- `Image` / `RawImage` — Sprite / texture rendering
- `InputField` — Text input

### XR / WebXR
- `WebXR` — Enable VR / AR / passthrough
- `WebARSessionRoot` — AR scene placement and scale
- `XRRig` — User start position in VR
- `USDZExporter` — iOS QuickLook AR
- `WebXRImageTracking` — Track images, instantiate objects
- `WebXRPlaneTracking` — Plane detection meshes/colliders
- `WebARCameraBackground` — Access AR camera feed for effects/rendering
- `XRControllerModel` — Render controllers / hands
- `XRControllerMovement` — Teleport + movement controls
- `XRControllerFollow` — Objects follow hands/controllers

### Scene Management
- `SceneSwitcher` — Load / unload scenes, prefabs, glTF at runtime

### Debugging
- `GridHelper`, `BoxGizmo`, `AxesHelper` — Visual debug helpers
- `Gizmos` — Static draw methods for lines/shapes

### File I/O
- `GltfExport` — Export glTF from runtime

---

## Unity Integration Details

- The Needle Engine Unity package adds an `ExportInfo` component (shown as "Needle Engine") to any GameObject
- Pressing Play in Unity starts a Vite dev server with hot reload
- TypeScript components in `src/scripts/` auto-generate matching C# stub scripts
- Serializable fields appear in the Unity Inspector and their values are embedded in the glTF
- Supported material shaders: UnityGLTF/PBRGraph (best), URP/Lit, Standard, Autodesk Interactive
- Custom shaders via Shader Graph export as MaterialX (Pro feature)
- Lightmaps bake and export automatically
- Animations (Animator, Timeline, AnimationClips) export with full state machine support
- EditorOnly tag excludes objects from export
- Smart Export (Project Settings → Needle) only re-exports changed assets

## Blender Integration Details

- Install the Needle Engine Blender add-on (supports Blender 4.1+)
- Panel in 3D Viewport sidebar manages project generation and export
- Components are added via the Needle Engine panel (not Blender's own component system)
- Custom TypeScript components auto-appear as Blender panels with matching properties
- Animation support: Actions, NLA tracks, shape keys
- Materials: Principled BSDF exports as PBR; node setups translate where possible
- Lightmaps via Cycles bake and export
- HDRI environment auto-exports for skybox/environment lighting

---

## Export & Assets

### glTF Extensions Used
`KHR_lights_punctual`, `KHR_materials_unlit`, `KHR_texture_transform`, `KHR_draco_mesh_compression`, `KHR_texture_basisu`, `EXT_meshopt_compression`, `NEEDLE_components`, `NEEDLE_gameobject_data`, `NEEDLE_lightmaps`, plus PBR extensions (clearcoat, transmission, IOR, iridescence, sheen, volume, specular).

### Recommended Limits
- File size: ≤50 MB uncompressed (10–20 MB compressed)
- Vertices: ≤500k (lower for mobile/VR)
- Lightmaps: ≤4× 2k textures
- Split large scenes into multiple glTF files loaded on demand via `SceneSwitcher`

### Prefabs & Lazy Loading
```ts
@serializable(AssetReference)
myPrefab?: AssetReference;

async start() {
  const instance = await this.myPrefab?.instantiate();
}
```

### Animations
- Animator state machines with transitions and conditions (bool, float, int, trigger)
- Timeline / PlayableDirector (activation, animation, audio tracks)
- AnimationClips with loop modes
- `KHR_ANIMATION_POINTER` for animating arbitrary properties

### Materials
**Recommended shaders (Unity):** UnityGLTF/PBRGraph (most features), URP/Lit, Standard.
**Custom shaders:** MaterialX via Shader Graph (Pro), or WebGL2 format (unlit only).
**Blender:** Principled BSDF → PBR.

---

## Optimization & Compression

### Development vs Production Builds
| | Development | Production |
|---|---|---|
| Command | `npm run start` | `npm run build` |
| Output | Local dev server | `dist/` folder |
| Compression | None | Full (textures + meshes) |
| Source maps | Yes | Minified |
| File size | Large | Optimized |

### Texture Compression (via KTX2 / toktx)
| Preset | Use Case | Quality | Size |
|---|---|---|---|
| **ETC1S** | Colors, skyboxes, large scenes | Good | Smallest |
| **UASTC** | Normal maps, HDR, data textures | Best | Medium |
| **WebP** | Fallback when GPU compression unsupported | Good | Small |

Set per-texture in Unity (texture import settings) or globally in build config.
**Requires:** toktx from [KTX-Software](https://github.com/KhronosGroup/KTX-Software/releases) installed and on PATH.

### Mesh Compression
| Method | Benefit |
|---|---|
| **Draco** | Aggressive geometry compression (default in production) |
| **Meshopt** | Good compression + fast decode |

### Progressive Loading & Mesh LODs
- Automatic LOD generation: 7 levels (LOD0 = full, LOD6 = lowest)
- Meshes and textures stream progressively — low-res loads first, high-res on demand
- Enabled automatically in Needle Cloud; can be enabled locally
- ~90% bandwidth savings typical
- Debug: add `?debugprogressive` to URL; press P to cycle LODs, W for wireframe

### Preview Compression Toggle (Unity)
In the Needle Engine component inspector, toggle "Preview Compression" to test production compression during development without a full build.

---

## Deployment

### One-Click (from Unity / Blender)
Add a deploy component to the scene and click Deploy:
- **Needle Cloud** — `DeployToNeedleCloud` (official hosting, CDN, auto-optimization)
- **Netlify** — `DeployToNetlify`
- **Vercel** — `DeployToVercel`
- **GitHub Pages** — `DeployToGithubPages`
- **itch.io** — `DeployToItchIO`
- **FTP** — `DeployToFTP`
- **Facebook Instant Games** — `DeployToFacebookInstantGames`

### Manual Build & Deploy
```bash
cd my-project
npm run build        # outputs to dist/
# Upload dist/ contents to any static host
```

### Embedding on Existing Sites
```html
<!-- iframe (simplest) -->
<iframe src="https://my-project.needle.run/" allow="xr; xr-spatial-tracking"></iframe>

<!-- Direct web component -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="https://cdn.example.com/scene.glb"></needle-engine>
```

### Framework Integration
Works with React, Vue, Svelte, Next.js, Angular — the `<needle-engine>` element is a standard web component.

---

## Networking & Multiplayer

### Setup
Add `SyncedRoom` component to the scene. Default server: `wss://networking.needle.tools` (free, ~15–20 concurrent users).

### Syncing Fields
```ts
import { Behaviour, serializable, syncField } from "@needle-tools/engine";

export class SyncedColor extends Behaviour {
  @syncField("onColorChanged")
  @serializable()
  color: string = "#ff0000";

  onColorChanged() {
    // Called when a remote client changes color
  }

  changeColor(newColor: string) {
    this.color = newColor; // auto-syncs to all clients
  }
}
```

### RPC / Manual Networking
```ts
import { Behaviour } from "@needle-tools/engine";

export class Chat extends Behaviour {
  sendMessage(text: string) {
    this.context.connection.send("chat-msg", { text, sender: this.context.connection.connectionId });
  }

  onEnable() {
    this.context.connection.beginListen("chat-msg", this.onReceive);
  }
  onDisable() {
    this.context.connection.stopListen("chat-msg", this.onReceive);
  }

  private onReceive = (data: { text: string; sender: string }) => {
    console.log(`${data.sender}: ${data.text}`);
  };
}
```

### Key Networking Concepts
- **Ownership:** `this.context.connection.send("request-ownership", { guid })` — only owner can modify synced state
- **Room State:** Persistent JSON on server; late-joiners receive full state. Include `guid` for persistence, set `dontSave` to skip.
- **SyncedTransform:** Component that auto-syncs position/rotation/scale
- **PlayerSync:** Instantiates a prefab per connected user (for avatars)
- **syncInstantiate() / syncDestroy():** Clone/destroy objects across network

### Ownership
Only the owner of an object can modify its synced state. Components like `DragControls` request ownership automatically.
```ts
// Request ownership
this.context.connection.send("request-ownership", { guid: this.guid });
// Release ownership
this.context.connection.send("remove-ownership", { guid: this.guid });
// Listen for ownership changes
this.context.connection.beginListen("gained-ownership", (data) => { /* you now own it */ });
this.context.connection.beginListen("lost-ownership", (data) => { /* ownership lost */ });
```

### Network Instantiation
```ts
import { syncInstantiate, syncDestroy } from "@needle-tools/engine";

// Create object on all clients
const obj = syncInstantiate(originalObject, {
  parent: parentObject,
  position: new Vector3(0, 1, 0),
  rotation: new Quaternion(),
  visible: true
});

// Destroy object on all clients
syncDestroy(obj);
```

### Message Persistence
```ts
// Persistent (saved in room state, sent to late-joiners) — include guid
this.context.connection.send("my-msg", { guid: this.guid, data: "value" });

// Transient (current users only) — omit guid
this.context.connection.send("my-msg", { data: "value" });

// Persistent but delete when sender disconnects
this.context.connection.send("my-msg", { guid: this.guid, data: "value", deleteOnDisconnect: true });

// Prevent persistence even with guid
this.context.connection.send("my-msg", { guid: this.guid, data: "value", dontSave: true });

// Delete state
this.context.connection.send("delete-state", { guid: "guid-to-delete" });
```

### Room Events
```ts
this.context.connection.beginListen(RoomEvents.JoinedRoom, ({ room, viewId, allowEditing, inRoom }) => { });
this.context.connection.beginListen(RoomEvents.LeftRoom, ({ room }) => { });
this.context.connection.beginListen(RoomEvents.UserJoinedRoom, ({ userId }) => { });
this.context.connection.beginListen(RoomEvents.UserLeftRoom, ({ userId }) => { });
this.context.connection.beginListen(RoomEvents.RoomStateSent, () => { /* initial sync complete */ });
```

### Custom Server
```bash
npm install @needle-tools/needle-networking
```

```js
// Fastify
import networking from "@needle-tools/needle-networking";
networking.startServerFastify(fastifyApp, { endpoint: "/socket" });

// Express
networking.startServerExpress(expressApp, { endpoint: "/socket" });
```

Options: `endpoint` (default `/`), `maxUsers` (default 50), `defaultUserTimeout` (default 30s).
Storage: disk (default `/.data`) or S3-compatible via env vars (`NEEDLE_NETWORKING_S3_ENDPOINT`, `_REGION`, `_BUCKET`, `_ACCESS_KEY_ID`, `_ACCESS_KEY`, `_PREFIX`).

### Networking Debug URL Parameters
`?debugnet` (log all messages), `?debugowner` (log ownership), `?debugnetbin` (log binary messages).

---

## WebXR (VR / AR)

### Supported Devices
| Device | Features |
|---|---|
| Meta Quest 1/2/3/3S/Pro | Hand tracking, passthrough, depth sensing |
| Apple Vision Pro | Hand tracking, transient pointer |
| Android 10+ (Chrome) | Full WebXR AR |
| iOS 14+ (Safari) | WebXR via Needle Go App Clip (ARKit) |
| Pico Neo 3/4 | Hand tracking |
| HTC Vive, Valve Index | Full VR |
| Hololens 2 | Hand tracking, AR/VR |

### Setup
Add `WebXR` component to the scene. Optionally add `XRRig` for VR start position and `WebARSessionRoot` for AR placement.

### XR Component Events
```ts
supportsXR(mode: XRSessionMode): boolean { return mode === "immersive-vr"; }
onBeforeXR(mode: XRSessionMode, init: XRSessionInit) { }
onEnterXR(args: NeedleXREventArgs) { }
onUpdateXR(args: NeedleXREventArgs) { }
onLeaveXR(args: NeedleXREventArgs) { }
onControllerAdded(args: NeedleXRControllerEventArgs) { }
onControllerRemoved(args: NeedleXRControllerEventArgs) { }
```

### iOS AR (Needle Go App Clip)
No app install needed. Launches via QR code or link:
```
https://appclip.needle.tools/ar?url=<your-webxr-url>
```

### iOS QuickLook (USDZ)
Add `USDZExporter` component for Apple QuickLook AR. Supports a subset of interactions via "Everywhere Actions."

### XRFlag
Control per-object visibility by mode: Browser, VR, AR, FirstPerson, ThirdPerson.

---

## Everywhere Actions (No-Code Interactions)

Interactive behaviors that work on desktop, mobile, VR, AR, and iOS QuickLook — no scripting required.

| Action | Description |
|---|---|
| Play Animation on Click | Play Animator state |
| Change Material on Click | Swap material |
| Look At | Face camera (billboard) |
| Play Audio on Click | Play audio clip |
| Hide on Start | Hidden initially, reveal later |
| Set Active on Click | Show / hide objects |
| Change Transform on Click | Move / rotate / scale |
| Audio Source | Play on start, spatial |
| WebXR Image Tracking | Track image, show objects |

Setup: Select object → Add Component → Needle → Everywhere Actions → choose action.

---

## Needle Cloud

### Hosting
- Global CDN with automatic compression (Draco, KTX2, progressive loading)
- Pinned URLs: `project-abc123.needle.run` (permanent per version)
- Labeled URLs: `project-latest.needle.run` (auto-updates), `project.needle.run` (manual promote)
- Password protection available

### CLI
```bash
npx needle-cloud deploy './dist' --team 'My Team' --name 'my-project'
npx needle-cloud upload path/to/model.fbx --team 'My Team'
npx needle-cloud help
```

### CI/CD (GitHub Actions)
```yaml
- uses: needle-tools/deploy-to-needle-cloud-action@v1
  with:
    token: ${{ secrets.NEEDLE_CLOUD_TOKEN }}
    dir: ./dist
    name: my-project
```

### Supported Upload Formats
glTF/GLB, OpenUSD, FBX, VRM, OBJ — non-glTF formats auto-convert and get full compression.

### Cloud Assets in Engine
Reference assets from Needle Cloud at runtime using the `NeedleCloudAsset` component. Only needed LODs load — saves ~90% bandwidth.

---

## AI Integration & MCP Server

Needle Engine provides AI tool integration via the **Model Context Protocol (MCP)**, allowing AI assistants to search documentation and inspect/modify live 3D scenes.

### MCP Server

Start the local MCP server:
```bash
npx needle-cloud start
```
Runs on `localhost:8424`. Provides two tool categories:
- **Always available:** `needle_search` (search docs & knowledge base), `needle_cloud_me` (current user info)
- **With Inspector open:** Full scene inspection, object editing, live debugging (dynamic tools registered by Inspector)

### Connecting AI Tools

**Claude Desktop:**
```bash
claude mcp add --scope user --transport http needle http://localhost:8424/mcp
```
Restart Claude Desktop fully (not just close window). Look for the plug icon.

**VS Code (GitHub Copilot):**
Command Palette → "MCP: Add Server" → name: `needle`, transport: `http`, URL: `http://localhost:8424/mcp`. Use `#needle` in Copilot chat. Requires VS Code 1.102+.

**Cursor:**
Create `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "needle": { "transport": "http", "url": "http://localhost:8424/mcp" }
  }
}
```
Restart Cursor. Must use **Agent Mode** (not Ask Mode).

### Connection Modes

| Mode | Command | Inspector Tools | Use Case |
|---|---|---|---|
| **HTTP/SSE** (full) | `npx needle-cloud start` | Yes | Active 3D scene work, live editing |
| **Stdio** (lightweight) | `npx needle-cloud mcp` | No | Code assistance, doc search only |

Stdio config (no server needed):
```json
{ "mcpServers": { "needle": { "command": "npx", "args": ["-y", "needle-cloud", "mcp"] } } }
```

### Needle Inspector (Chrome Extension)

Chrome DevTools-like extension for any three.js scene (Needle Engine, react-three-fiber, A-frame, Threlte):
- Real-time scene hierarchy inspection and property editing
- Performance monitoring (FPS, triangle counts, download size)
- AI-powered assistance via MCP integration
- Install from Chrome Web Store

### llms.txt

Machine-readable documentation available at:
- `https://cloud.needle.tools/llms.txt` — structured links to all doc pages
- `https://cloud.needle.tools/llms-full.txt` — full markdown content of all pages

---

## Configuration — `needle.config.json`

```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated",
  "baseUrl": "",
  "build": {
    "copy": ["additional-folder"]
  }
}
```

| Key | Description |
|---|---|
| `buildDirectory` | Production build output folder |
| `assetsDirectory` | Location of exported .glb files |
| `scriptsDirectory` | Watched directory for custom components |
| `codegenDirectory` | Auto-generated component registrations |
| `baseUrl` | Asset base path (needed for Next.js, SvelteKit) |
| `build.copy` | Extra files/folders to include in build |

---

## Debugging & Testing

### URL Parameters
| Parameter | Effect |
|---|---|
| `?help` | List all available parameters |
| `?console` | On-screen dev console (useful on mobile) |
| `?stats` | FPS counter and renderer stats |
| `?printGltf` | Log loaded glTF files |
| `?showcolliders` | Visualize physics colliders |
| `?gizmos` | Render debug gizmos |
| `?debugprogressive` | Debug progressive loading LODs |
| `?noprogressive` | Disable progressive loading |

### Local Network Testing
Press Play in Unity/Blender — console shows a local network URL (e.g., `https://192.168.x.x:3000`) for testing on other devices.

### Mobile Debugging
- **Android:** Connect USB → `chrome://inspect/#devices`
- **iOS:** Add `?console` to URL for on-screen console
- **Meta Quest:** Same as Android (USB debugging)

### VS Code Debugging
```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Debug Needle",
  "url": "https://localhost:3000",
  "webRoot": "${workspaceFolder}"
}
```

---

## Common Code Patterns

### Rotate Object
```ts
export class Rotate extends Behaviour {
  @serializable() speed: number = 1;
  update() {
    this.gameObject.rotateY(this.speed * this.context.time.deltaTime);
  }
}
```

### Click Handler
```ts
export class Clickable extends Behaviour {
  onPointerClick(args: PointerEventData) {
    console.log("Clicked", this.gameObject.name, "at", args.point);
  }
}
```

### Spawn Prefab
```ts
export class Spawner extends Behaviour {
  @serializable(AssetReference) prefab?: AssetReference;

  async spawn() {
    const instance = await this.prefab?.instantiate();
    instance?.position.copy(this.gameObject.position);
  }
}
```

### Smooth Follow
```ts
export class Follow extends Behaviour {
  @serializable(Object3D) target?: Object3D;
  @serializable() speed: number = 5;

  lateUpdate() {
    if (!this.target) return;
    this.gameObject.position.lerp(this.target.position, this.speed * this.context.time.deltaTime);
  }
}
```

### Keyboard Movement
```ts
export class Movement extends Behaviour {
  @serializable() speed: number = 5;
  update() {
    const dt = this.context.time.deltaTime;
    const input = this.context.input;
    if (input.getKey("w")) this.gameObject.position.z -= this.speed * dt;
    if (input.getKey("s")) this.gameObject.position.z += this.speed * dt;
    if (input.getKey("a")) this.gameObject.position.x -= this.speed * dt;
    if (input.getKey("d")) this.gameObject.position.x += this.speed * dt;
  }
}
```

### Timed Coroutine
```ts
export class Sequence extends Behaviour {
  start() { this.startCoroutine(this.run()); }

  *run() {
    console.log("Step 1");
    yield WaitForSeconds(2);
    console.log("Step 2");
    yield WaitForSeconds(1);
    console.log("Done");
  }
}
```

---

## FAQ Highlights

**Black screen after export?**
Check browser console for errors. Restart dev server if you just updated versions.

**White objects?**
Use glTF-compatible materials (PBRGraph, URP/Lit, Principled BSDF). Custom shaders need explicit export setup.

**Files too large?**
Reduce texture resolution, enable progressive loading, compress with Draco/KTX2, split into multiple glTF files.

**toktx not found (Windows)?**
Install KTX-Software, add `C:\Program Files\KTX-Software\bin` to PATH, restart.

**SSL/TLS certificate warning?**
Click Advanced → Proceed (one-time). For permanent fix, use `vite-plugin-mkcert` instead of `@vitejs/plugin-basic-ssl`.

**Website doesn't work after FTP upload?**
Enable gzip in `.htaccess` or disable gzip in Needle build options.

**npm install fails?**
Ensure disk supports symlinks (NTFS works; exFAT/FAT32 don't).

**NEEDLE_ENGINE_META not defined?**
Add Needle plugins to vite config:
```js
const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");
// add needlePlugins(command, needleConfig) to plugins array
```

**How to update Needle Engine?**
- **Unity / Blender:** The editor integration manages the `@needle-tools/engine` npm package version automatically. Update the editor package (Unity: Package Manager → Update; Blender: add-on update) and the runtime version follows.
- **Standalone web project (no editor):** Update via npm as usual: `npm update @needle-tools/engine` or set a specific version in `package.json`.
- **Pinning a version:** If `package.json` uses the `npm:` prefix for the engine dependency (e.g., `"@needle-tools/engine": "npm:@needle-tools/engine@^4.0.0"`), the version is locked and the editor will **not** override it. This is useful when you want full manual control over engine updates.

**Light/color looks wrong?**
Ensure Linear colorspace (Project Settings → Player). Don't use Mixed mode lights — use Baked or Realtime only.

---

## Links

- Documentation: [/docs](/docs)
- Scripting Reference: [/docs/reference](/docs/reference)
- Component List: [/docs/reference/components](/docs/reference/components)
- Samples: [/docs/samples](/docs/samples)
- FAQ: [/docs/reference/faq](/docs/reference/faq)
- Needle Cloud: [/docs/cloud](/docs/cloud)
- Deployment: [/docs/how-to-guides/deployment](/docs/how-to-guides/deployment)
- Optimization: [/docs/how-to-guides/optimization](/docs/how-to-guides/optimization)
- AI & MCP Server: [/docs/ai](/docs/ai)
- Networking: [/docs/how-to-guides/networking](/docs/how-to-guides/networking)
