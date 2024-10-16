---
title: Needle Core Components
---

# Needle Core Components

Here is a overview of some of the components that we provide. Many of them map to components and functionality in Unity, Blender or other integrations.

For a complete list please have a look at our [API docs](https://engine.needle.tools/docs/api/latest).

You can always add your own components or add wrappers for Unity components we haven't provided yet.  

Learn more in the [Scripting](./scripting.md) section of our docs.

## Audio
| Name  | Description |
| ------------- | ------------- |
| `AudioListener` |  |
| `AudioSource` | Use to play audio |

## Animation
| Name  | Description |
| ------------- | ------------- |
| `Animator` with `AnimatorController` | Export with animation state machine, conditions, transitions  |
| `Animation` | Most basic animation component. Only first clip is exported |
| `PlayableDirector` with `TimelineAsset` | Export powerful sequences to control animation, audio, state and more |

## Rendering
| Name  | Description |
| ------------- | ------------- |
| `Camera` |  |
| `Light` | DirectionalLight, PointLight, Spotlight. Note that you can use it to bake light (e.g. Rectangular Light shapes) as well |
| `XRFlag` | Control when objects will be visible. E.g. only enable object when in AR  |
| `DeviceFlag` | Control on which device objects will be visible  |
| `LODGroup` |  |
| `ParticleSystem` | Experimental and currently not fully supported |
| `VideoPlayer` | Playback videos from url or referenced video file (will be copied to output on export). The VideoPlayer also supports streaming from MediaStream objects or `M3U8` livestream URLs |
| `MeshRenderer` | Used to handle rendering of objects including lightmapping and instancing |
| `SkinnedMeshRenderer` | *See MeshRenderer* |
| `SpriteRenderer` | Used to render Sprites and Spriteanimations |
| `Volume` with `PostProcessing` asset | See [table below](#postprocessing) |

### Postprocessing

Postprocessing effects use the [pmndrs postprocessing library](https://www.npmjs.com/package/postprocessing) under the hood. This means you can also easily add your own custom effects and get an automatically optimized postprocessing pass.

- **Unity only**: *Note that Postprocessing effects using a Volume in Unity is only supported with URP*

| Effect Name | |
| --- | --- | 
| Antialiasing | *extra Unity Component* |
| Bloom | *via Volume asset* |
| Chromatic Aberration | *via Volume asset* |
| Color Adjustments / Color Correction | *via Volume asset* | 
| Depth Of Field | *via Volume asset* |
| Vignette | *via Volume asset* |
| ToneMappingEffect | *via Volume asset or separate component* |
| Pixelation | |
| Screenspace Ambient Occlusion N8 | |
| Screenspace Ambient Occlusion | |
| Tilt Shift Effect | |
| SharpeningEffect | |
| *Your custom effect* | [See example on stackblitz](https://stackblitz.com/edit/needle-engine-custom-postprocessing-effect) |

## Networking
| Name  | Description |
| ------------- | ------------- |
| `SyncedRoom` | Main networking component. Put in your scene to enable networking |
| `Networking` | Used to setup backend server for networking. |
| `SyncedTransform` | Automatically network object transformation |
| `SyncedCamera` | Automatically network camera position and view to other users in room. You can define how the camera is being rendered by referencing an object |
| `WebXRSync` | Networks WebXR avatars (AR and VR) |
| `Voip` | Enables voice-chat |
| `Screensharing` | Enables screen-sharing capabilities |

## Interaction
| Name  | Description |
| ------------- | ------------- |
| `EventSystem` | Handles raising pointer events and UI events on objects in the scene |
| `ObjectRaycater` | Required for DragControls and Duplicatable |
| `GraphicsRaycaster` | Same as ObjectRaycaster but for UI elements |
| `DragControls` | Allows objects to be dragged in the scene. Requires raycaster in parent hierarchy, e.g. ObjectRaycaster |
| `Duplicatable` | Can duplicate assigned objects by drag. Requires DragControls |
| `Interactable` | Basic component to mark an object to be interactable. |
| `OrbitControls` | Add to camera to add camera orbit control functionality |
| `SmoothFollow` | Allows to interpolate smoothly to another object's transform |
| `DeleteBox` | Will destroy objects with the `Deletable` component when entering the box |
| `Deletable` | The GameObject this component is attached to will be deleted when it enters or intersects with a `DeleteBox` |
| `DropListener` | Add to receive file drop events for uploading |
| `SpatialTrigger` | Use to raise event if an object enters a specific space or area. You can also use Physics events |
| `SpatialTriggerReceiver` | Use to receive events from SpatialTrigger |

## Physics

Physics is implemented using [Rapier](https://rapier.rs/).  

| Name  | Description |
| ------------- | ------------- |
| `Rigidbody` | Add to make an object react to gravity (or be kinematic and static) |
| `BoxCollider` | A Box collider shape that objects can collide with or raise trigger events when set to `trigger` |
| `SphereCollider` | *See BoxCollider* |
| `CapsuleCollider` | *See BoxCollider* |
| `MeshCollider` | *See BoxCollider* |
| `HingeJoint` | A hinge which can rotate only on one axis in a allowed angle range (used for doors, chains or pendulums) |
| `FixedJoint` | A hinge that is used to mimic a fixed connection e.g. this can be used when you can't parent objects under one another |
| Physics Materials | Physics materials can be used to define e.g. the bouncyness of a collider |

## XR / WebXR  

[Read the XR docs](xr.md)

| Name  | Description |
| ------------- | ------------- |
| `WebXR` | Add to scene for VR, AR and Passthrough support as well as rendering Avatar models |
| [`USDZExporter`](./everywhere-actions.md) | Add to enable USD and Quicklook support
| `XRFlag` | Control when objects are visible, e.g. only in VR or AR or only in ThirdPerson |
| `WebARSessionRoot` | Handles placement and scale of your scene in AR mode |
| `WebARCameraBackground` | Add to access the AR camera image and apply effects or use it for rendering |
| `WebXRImageTracking` | Assign images to be tracked and optionally instantiate an object at the image position |
| `WebXRPlaneTracking` | Create plane meshes or colliders for tracked planes |
| `XRControllerModel` | Can be added to render device controllers or hand models (will be created by default when enabled in the WebXR component) |
| `XRControllerMovement` | Can be added to provide default movement and teleport controls |
| `XRControllerFollow` | Can be added to any object in the scene and configured to follow either left or right hands or controllers |


## Debugging  
| Name  | Description |
| ------------- | ------------- |
| `GridHelper` | Draws a grid |
| `BoxGizmo` | Draws a box |
| `AxesHelper` | Draws XYZ axes |
| | Note: When you're writing custom code you can use the static `Gizmos` methods for drawing debugging lines and shapes | |

## Runtime File Input/Output  
| Name  | Description |
| ------------- | ------------- |
| `GltfExport` | Experimental! Use to export gltf from web runtime. |
| `DropListener` | Receive file drop events for uploading and networking |

## UI

Spatial UI components are mapped from Unity UI (Canvas, not UI Toolkit) to [three-mesh-ui](https://github.com/felixmariotto/three-mesh-ui). 
UI can be animated.   

| Name  | Description |
| ------------- | ------------- |
| `Canvas` | Unity's UI system. Needs to be in World Space mode right now. |
| `Text (Legacy)` | Render Text using Unity's UI Text component. Custom fonts are supported, a font atlas will be automatically generated on export. Use the font settings or the `FontAdditionalCharacters` component to control which characters are included in the atlas.<br/>**Note**: In Unity make sure to use the `Legacy/Text` component (*TextMeshPro* is not supported at the moment) |
| `Button` | Receives click events - use the onClick event to react to it. It can be added too 3D scene objects as well.<br/>**Note**: Make sure to use the `Legacy/Text` component in the Button (or create the Button via the `UI/Legacy/Button` Unity context menu since *TextMeshPro* is not supported at the moment) |
| `Image` | Renders a sprite image |
| `RawImage` | Renders a texture |
| `InputField` | Allows text input |

**Note**: Depending on your project, often a mix of spatial and 2D UI makes sense for cross-platform projects where VR, AR, and screens are supported. Typically, you'd build the 2D parts with HTML for best accessibility, and the 3D parts with geometric UIs that also support depth offsets (e.g. button hover states and the like).  

## Other

| Name  | Description |
| ------------- | ------------- |
| `SceneSwitcher` | Handles loading and unloading of other scenes or prefabs / glTF files. Has features to preload, change scenes via swiping, keyboard events or URL navigation | 


## Editor Only
| Name  | Description |
| --- | --- |
| `ExportInfo` | Main component for managing the web project(s) to e.g. install or start the web app
| `EditorSync` | Add to enable networking material or component value changes to the running three.js app directly from the Unity Editor without having to reload |
