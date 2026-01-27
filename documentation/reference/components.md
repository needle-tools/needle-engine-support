---
title: Needle Core Components
---

# Needle Core Components

**Built-in components** that map to Unity, Blender, and three.js functionality.

:::tip Complete Reference
For the full API documentation, see [engine.needle.tools/docs/api](https://engine.needle.tools/docs/api)
:::

:::tip Custom Components
You can always create your own components or add wrappers for components we haven't provided yet.

[Learn scripting](/how-to-guides/scripting/create-components) • [For Unity Developers](/tutorials/fundamentals/for-unity-developers)
:::

## 🔊 Audio

| Component | Description |
| --- | --- |
| [`AudioListener`](https://engine.needle.tools/docs/api/AudioListener) | Receives audio in the scene (attach to camera) |
| [`AudioSource`](https://engine.needle.tools/docs/api/AudioSource) | Plays audio clips with spatial audio support |

## 🎬 Animation

| Component | Description |
| --- | --- |
| [`Animator`](https://engine.needle.tools/docs/api/Animator) | State machine with AnimatorController, transitions, and conditions |
| [`Animation`](https://engine.needle.tools/docs/api/Animation) | Basic animation playback (single clip) |
| [`PlayableDirector`](https://engine.needle.tools/docs/api/PlayableDirector) | Timeline sequences for animation, audio, state control |

## 📷 Camera & Controls

| Component | Description |
| --- | --- |
| [`Camera`](https://engine.needle.tools/docs/api/Camera) | Scene rendering viewpoint (perspective/orthographic) |
| [`OrbitControls`](https://engine.needle.tools/docs/api/OrbitControls) | Rotate, zoom, and pan around target • [Sample](https://samples.needle.tools/collaborative-sandbox) |
| [`ViewBox`](https://engine.needle.tools/docs/api/ViewBox) | Defines visible area bounds |

## 🎨 Rendering

| Component | Description |
| --- | --- |
| [`Light`](https://engine.needle.tools/docs/api/Light) | Directional, Point, Spot lights with shadow support and baking |
| [`MeshRenderer`](https://engine.needle.tools/docs/api/MeshRenderer) | Renders meshes with lightmapping and instancing |
| [`SkinnedMeshRenderer`](https://engine.needle.tools/docs/api/SkinnedMeshRenderer) | Renders animated/deformable meshes |
| [`SpriteRenderer`](https://engine.needle.tools/docs/api/SpriteRenderer) | Renders 2D sprites and animations • [Sample](https://samples.needle.tools/spritesheet-animation) |
| [`ParticleSystem`](https://engine.needle.tools/docs/api/ParticleSystem) | Particle effects system • [Sample](https://samples.needle.tools/particles) |
| [`VideoPlayer`](https://engine.needle.tools/docs/api/VideoPlayer) | Video playback, streaming (MediaStream, M3U8) • [Sample](https://samples.needle.tools/video-playback) |
| [`XRFlag`](https://engine.needle.tools/docs/api/XRFlag) | Control visibility by mode (VR/AR/Desktop) |
| [`DeviceFlag`](https://engine.needle.tools/docs/api/DeviceFlag) | Control visibility by device type |
| [`GroundProjection`](https://engine.needle.tools/docs/api/GroundProjectedEnv) | Project environment texture on ground • [Sample](https://samples.needle.tools/ground-projection) |
| [`SeeThrough`](https://engine.needle.tools/docs/api/SeeThrough) | Fade objects obscuring view • [Sample](https://samples.needle.tools/see-through) |
| [`ShadowCatcher`](https://engine.needle.tools/docs/api/ShadowCatcher) | Invisible shadow receiver • [Sample](https://samples.needle.tools/shadow-catcher) |
| [`ContactShadows`](https://engine.needle.tools/docs/api/ContactShadows) | Realtime contact shadows • [Sample](https://samples.needle.tools/contact-shadows) |
| [`Volume`](https://engine.needle.tools/docs/api/Volume) | Post-processing effects (see below) • [Sample](https://samples.needle.tools/postprocessing) |

### Postprocessing

Postprocessing effects use the [pmndrs postprocessing library](https://www.npmjs.com/package/postprocessing) under the hood. This means you can also easily add your own custom effects and get an automatically optimized postprocessing pass.

:::tip For Unity Users
For Needle Engine Postprocessing in Unity you need to use URP (Universal Render Pipeline)
:::


|  | |
| --- | --- | 
| [`Volume`](https://engine.needle.tools/docs/api/Volume) | Add effects below |
| **Effects** | |
| [`Antialiasing`](https://engine.needle.tools/docs/api/Antialiasing) | *extra Unity Component* |
| [`BloomEffect`](https://engine.needle.tools/docs/api/BloomEffect) | *via Volume asset* |
| [`Chromatic Aberration`](https://engine.needle.tools/docs/api/ChromaticAberration) | *via Volume asset* |
| [`Color Adjustments / Color Correction`](https://engine.needle.tools/docs/api/ColorAdjustments) | *via Volume asset* | 
| [`Depth Of Field`](https://engine.needle.tools/docs/api/DepthOfField) | *via Volume asset* |
| [`Tilt Shift Effect`](https://engine.needle.tools/docs/api/TiltShiftEffect) | *via Volume asset or separate component* |
| [`Vignette`](https://engine.needle.tools/docs/api/Vignette) | *via Volume asset* |
| [`ToneMappingEffect`](https://engine.needle.tools/docs/api/ToneMappingEffect) | *via Volume asset or separate component* |
| [`PixelationEffect`](https://engine.needle.tools/docs/api/PixelationEffect) | *via Volume asset or separate component* |
| [`Screenspace Ambient Occlusion N8`](https://engine.needle.tools/docs/api/ScreenSpaceAmbientOcclusionN8) | *via Volume asset or separate component* |
| [`Screenspace Ambient Occlusion`](https://engine.needle.tools/docs/api/ScreenSpaceAmbientOcclusion) | *via Volume asset or separate component* |
| [`SharpeningEffect`](https://engine.needle.tools/docs/api/SharpeningEffect) | *via Volume asset or separate component* |
| *Your custom effect* | [Example on Stackblitz](https://stackblitz.com/edit/needle-engine-custom-postprocessing-effect), [Example in docs](/reference/scripting-examples#adding-new-postprocessing-effects) |

## 🌐 Networking & Multiplayer

| Component | Description |
| --- | --- |
| [`SyncedRoom`](https://engine.needle.tools/docs/api/SyncedRoom) | Enable multiplayer networking (required for all networked features) |
| [`Networking`](https://engine.needle.tools/docs/api/Networking) | Configure custom backend server (defaults to Needle servers) |
| [`SyncedTransform`](https://engine.needle.tools/docs/api/SyncedTransform) | Sync object position, rotation, scale across clients |
| [`SyncedCamera`](https://engine.needle.tools/docs/api/SyncedCamera) | Sync camera view to other users with custom rendering |
| [`PlayerSync`](https://engine.needle.tools/docs/api/PlayerSync) | Instantiate object per connected user (avatars, etc.) |
| [`Voip`](https://engine.needle.tools/docs/api/Voip) | Voice chat with spatial audio • [Sample](https://samples.needle.tools/collaborative-sandbox) |
| [`ScreenCapture`](https://engine.needle.tools/docs/api/ScreenCapture) | Screen sharing capabilities • [Sample](https://samples.needle.tools/screensharing) |

## 🖱️ Interaction

| Component | Description |
| --- | --- |
| [`DragControls`](https://engine.needle.tools/docs/api/DragControls) | Drag objects in scene (requires raycaster in parent, e.g. ObjectRaycaster) |
| [`Duplicatable`](https://engine.needle.tools/docs/api/Duplicatable) | Duplicate objects by dragging (requires DragControls) |
| [`OrbitControls`](https://engine.needle.tools/docs/api/OrbitControls) | Camera orbit, zoom, and pan controls |
| [`SmoothFollow`](https://engine.needle.tools/docs/api/SmoothFollow) | Smooth interpolation to another object's transform |
| [`DeleteBox`](https://engine.needle.tools/docs/api/DeleteBox) | Destroys Deletable objects entering the box |
| [`Deletable`](https://engine.needle.tools/docs/api/Deletable) | Object can be deleted when entering DeleteBox |
| [`DropListener`](https://engine.needle.tools/docs/api/DropListener) | Receive file drop events for uploads |
| [`SpatialTrigger`](https://engine.needle.tools/docs/api/SpatialTrigger) | Raise events when objects enter space/area |
| [`SpatialTriggerReceiver`](https://engine.needle.tools/docs/api/SpatialTriggerReceiver) | Receive events from SpatialTrigger |
| [`CursorFollow`](https://engine.needle.tools/docs/api/CursorFollow) | Make object follow cursor • [Sample](https://engine.needle.tools/samples/scrollytelling-and-cursor-interaction) |
| [`ScrollFollow`](https://engine.needle.tools/docs/api/ScrollFollow) | Bind scroll to animations/timeline • [Sample](https://engine.needle.tools/samples/scrollytelling-and-cursor-interaction) |
| [`HoverAnimation`](https://engine.needle.tools/docs/api/HoverAnimation) | Animate on hover |


## <logo-header logo="/imgs/rapier-physics-logo.webp" alt="Rapier">Physics</logo-header>

Powered by [Rapier](https://rapier.rs/) physics engine.

| Component | Description |
| --- | --- |
| [`Rigidbody`](https://engine.needle.tools/docs/api/Rigidbody) | Physical body with gravity, mass, drag (dynamic/kinematic/static) |
| [`BoxCollider`](https://engine.needle.tools/docs/api/BoxCollider) | Box-shaped collision volume |
| [`SphereCollider`](https://engine.needle.tools/docs/api/SphereCollider) | Sphere-shaped collision volume |
| [`CapsuleCollider`](https://engine.needle.tools/docs/api/CapsuleCollider) | Capsule-shaped collision volume |
| [`MeshCollider`](https://engine.needle.tools/docs/api/MeshCollider) | Complex collision matching mesh geometry |
| *Physics Materials* | Control friction, bounciness, and other physical properties |
| [`Attractor`](https://engine.needle.tools/docs/api/Attractor) | Attract or repel rigidbodies • [Sample](https://engine.needle.tools/samples/scrollytelling-and-cursor-interaction) |

:::tip Colliders as Triggers
Set any collider to `isTrigger = true` to detect overlaps without physical collision response.
:::

## 🥽 XR / WebXR

[Read the full XR documentation](/how-to-guides/xr/)

| Component | Description |
| --- | --- |
| [`WebXR`](https://engine.needle.tools/docs/api/WebXR) | Enable VR, AR, passthrough, and avatar rendering |
| [`USDZExporter`](https://engine.needle.tools/docs/api/USDZExporter) | Enable QuickLook AR on iOS (USDZ format) |
| [`WebARSessionRoot`](https://engine.needle.tools/docs/api/WebARSessionRoot) | AR scene placement and scale (defines center/alignment) |
| [`XRRig`](https://engine.needle.tools/docs/api/XRRig) | Define user start position in VR |
| [`WebARCameraBackground`](https://engine.needle.tools/docs/api/WebARCameraBackground) | Access AR camera feed for effects/rendering |
| [`WebXRImageTracking`](https://engine.needle.tools/docs/api/WebXRImageTracking) | Track images and instantiate objects • [Sample](https://engine.needle.tools/samples/image-tracking) |
| [`WebXRPlaneTracking`](https://engine.needle.tools/docs/api/WebXRPlaneTracking) | Create meshes/colliders for tracked planes |
| [`XRControllerModel`](https://engine.needle.tools/docs/api/XRControllerModel) | Render VR controllers or hand models |
| [`XRControllerMovement`](https://engine.needle.tools/docs/api/XRControllerMovement) | Default movement and teleport controls |
| [`XRControllerFollow`](https://engine.needle.tools/docs/api/XRControllerFollow) | Make objects follow hands or controllers |
| [`XRFlag`](https://engine.needle.tools/docs/api/XRFlag) | Control visibility by mode (VR/AR/FirstPerson/ThirdPerson) |


## 🔧 Debugging

| Component | Description |
| --- | --- |
| [`GridHelper`](https://engine.needle.tools/docs/api/GridHelper) | Draws debug grid |
| [`BoxGizmo`](https://engine.needle.tools/docs/api/BoxGizmo) | Draws debug box |
| [`AxesHelper`](https://engine.needle.tools/docs/api/AxesHelper) | Draws XYZ axes |

:::tip Gizmos in Code
Use static `Gizmos` methods for drawing debug lines and shapes in your scripts. [See Gizmos API](/reference/scripting-examples#debug-gizmos)
:::

## 📁 Runtime File Input/Output

| Component | Description |
| --- | --- |
| [`GltfExport`](https://engine.needle.tools/docs/api/GltfExport) | Export glTF from runtime (experimental) |
| [`DropListener`](https://engine.needle.tools/docs/api/DropListener) | Receive file drop events for uploads and networking |

## 🖼️ UI

Spatial UI components map from Unity UI (Canvas, not UI Toolkit) to [three-mesh-ui](https://github.com/felixmariotto/three-mesh-ui). UI can be animated.

| Component | Description |
| --- | --- |
| [`Canvas`](https://engine.needle.tools/docs/api/Canvas) | Unity UI system (World Space mode required) |
| [`Text`](https://engine.needle.tools/docs/api/Text) | Render text with custom fonts (auto-generated atlas). Use Legacy/Text, not TextMeshPro |
| [`Button`](https://engine.needle.tools/docs/api/Button) | Click events with onClick. Works in 3D and UI. Use Legacy/Text for labels |
| [`Image`](https://engine.needle.tools/docs/api/Image) | Renders sprite images |
| [`RawImage`](https://engine.needle.tools/docs/api/RawImage) | Renders textures |
| [`InputField`](https://engine.needle.tools/docs/api/InputField) | Text input field |

:::tip HTML + Spatial UI
For cross-platform projects (VR, AR, desktop), mix spatial and HTML UI:
- **HTML**: 2D interfaces for best accessibility
- **Spatial UI**: 3D interfaces with depth (e.g., button hover states)
:::  

## 🔀 Scene Management

| Component | Description |
| --- | --- |
| [`SceneSwitcher`](https://engine.needle.tools/docs/api/SceneSwitcher) | Load/unload scenes, prefabs, glTF files with preload, swipe, keyboard, URL navigation |


## 🛠️ Editor Only (Unity/Blender)

| Component | Description |
| --- | --- |
| `ExportInfo` | Main component for managing web project(s) (install, start, deploy) |
| `EditorSync` | Sync material/component changes to runtime without reload (hot reload) |

---

## Complete API Documentation

For detailed TypeScript API documentation with all methods, properties, and types:

**[📖 View Complete API Reference →](https://engine.needle.tools/docs/api/)**

The API documentation includes:
- All component classes and their methods
- Component lifecycle hooks
- Event handlers and callbacks
- Type definitions and interfaces
- Code examples and usage patterns

---

## Related Documentation

### Learn How to Use Components

- **[Create Custom Components](/docs/how-to-guides/scripting/create-components)** - Build your own interactive components
- **[Component Lifecycle Methods](/docs/reference/api/lifecycle-methods)** - awake, start, update, onEnable, etc.
- **[Input Event Methods](/docs/reference/api/input-events)** - Handle pointer, touch, and keyboard input
- **[Physics Event Methods](/docs/reference/api/physics-events)** - Collision and trigger callbacks
- **[XR Event Methods](/docs/reference/api/xr-events)** - WebXR-specific events

### Integration Guides

- **[Unity Integration](/docs/unity/)** - Using components in Unity
- **[Blender Integration](/docs/blender/)** - Using components in Blender
- **[three.js Integration](/docs/three/)** - Using components in web projects

### Tutorials

- **[TypeScript Essentials](/docs/tutorials/fundamentals/typescript-essentials)** - Learn TypeScript for components
- **[For Unity Developers](/docs/tutorials/fundamentals/for-unity-developers)** - Component system differences from Unity

### How-To Guides

- **[Handle User Input](/docs/how-to-guides/scripting/handle-input)** - Mouse, touch, keyboard, VR controllers
- **[Enable Networking](/docs/how-to-guides/networking/setup)** - Multiplayer and sync
- **[Enable WebXR](/docs/how-to-guides/xr/)** - VR and AR experiences
- **[Export 3D Content](/docs/how-to-guides/export/)** - Meshes, materials, animations

### Additional Reference

- **[Scripting Examples](/docs/reference/scripting-examples)** - Common code patterns
- **[TypeScript Decorators](/docs/reference/typescript-decorators)** - @serializable and more
- **[Time API](/docs/reference/api/time)** - deltaTime and time management
