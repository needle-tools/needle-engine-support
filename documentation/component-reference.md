# Component Reference 🧩

Here is a overview of some of the components that we provide. Some of them map directly to Unity components, while others are core components from Needle Engine. For Unity components, there may be an additional component called ???Data. These Data components contain additional parameters beyond the built in Unity components since we can't modify their inspector properties directly.
For a complete list please have a look at the components inside the folders ``node_modules/@needle-tools/engine/engine-components`` and ``engine-components-experimental``.  

> You can always add your own components or add wrappers for Unity components we haven't provided yet.  
> Read more in the [Scripting](./scripting.md) section of our docs.

## Audio
Audio is implemented using a custom mixer in the Needle runtime engine.  

| Name  | Description |
| ------------- | ------------- |
| AudioListener |  Maps the standard Unity Audiolistener parameters to web browser audio. |
| AudioSource |  Maps a Unity audio source to a web base audio source. |

## Animation
Animation is implemented using custom code the Needle runtime engine.  

| Name  | Description |
| ------------- | ------------- |
| Animator + AnimatorController | Export with animation state machine, conditions, transitions  |
| Animation | Most basic animation component. Only first clip is exported |
| PlayableDirector + Timeline | Export powerful sequences to control animation, audio, state and more |

## Rendering
Rendering is implemented using WebGL and WebXR code in the Needle runtime engine.  

| Name  | Description |
| ------------- | ------------- |
| Camera | Maps Unity camera to a standard three.js camera. |
| LODGroup | Creates an LOD Group |
| Light | Maps Unity light to one of the standard three.js lights |
| ParticleSystem | Experimental and currently not fully supported |
| XRFlag | Control when objects will be visible. E.g. only enable object when in AR  |
| VideoPlayer  | Playback videos from url or referenced video file (will be copied to output on export) |

## Networking
Networking is implemented in the Needle runtime engine and requires a Needle Tiny Server. 

| Name  | Description |
| ------------- | ------------- |
| SyncedRoom | Main networking component. Put in your scene to enable networking |
| Networking | Used to setup backend server for networking. |
| SyncedTransform | Automatically network object transformation |
| SyncedCamera | Automatically network camera to other users in room |
| WebXRSync | Networks WebXR avatars (AR and VR) |
| Voip | Enables voice-chat |

## Interaction
Interaction is implemented in the Needle runtime engine. Some features below may require a Needle tiny server for fullfunctionallity.

| Name  | Description |
| ------------- | ------------- |
| EventSystem |  |
| ObjectRaycaster | Adds a three.js raycaster that casts rays into it's child hierarchy. Required for DragControls and Duplicatable |
| DragControls | Allos an object to be dragged. Requires ObjectRaycaster in parent hierarchy |
| Duplicatable | Works with DragControls to make an object cloneable by dragging. Requires DragControls |
| Interactable | Basic component to mark an object to be interactable. |
| OrbitControls | Add to camera to add camera orbit control functionality using three.js OrbitControls |
| SmoothFollow | Allows to interpolate smoothly to another object's transform |
| DeleteBox |  |
| DropListener | Add to receive file drop events for uploading to a Needle tiny storage server |
| SpatialTrigger | Use to raise event if an object enters a specific space or area |
| SpatialTriggerReceiver | Use to receive events from SpatialTrigger |

## Physics

Physics is implemented using [rapier](https://rapier.rs/).  

| Name  | Description |
| ------------- | ------------- |
| Rigidbody | Maps to a Rapier Rigidbody|
| BoxCollider | Creates a Rapier box collider |
| SphereCollider |  Creates a Rapier box collider  |
| CapsuleCollider | Creates a Rapier box collider   |
| MeshCollider | Creates a Rapier mesh collider   |
| [Physics Materials](https://docs.unity3d.com/Manual/class-PhysicMaterial.html) | Physics materials can be used to define e.g. the bouncyness of a collider |

## XR / WebXR  

[Read the XR docs](xr.md)

| Name  | Description |
| ------------- | ------------- |
| WebXR | Add to scene for AR and VR avatars |
| WebXRSync | Responsible for networking avatars |
| SpectatorCamera | Mirrors VR view to screen when e.g. connected via Oculus Link |
| XRFlag | Control when objects are visible, e.g. only in VR or AR or only in ThirdPerson |
| WebARSessionRoot | Put your AR content inside a WebARSessionRoot for placement and scale |

## Debugging  

Implemented using standard three.js helpers.

| Name  | Description |
| ------------- | ------------- |
| GridHelper | Draws a three.js grid |
| BoxGizmo | Draws a three.js box |
| AxesHelper | Draws three.hs axes |

## Runtime File Input/Output  

These features are still experimental.

| Name  | Description |
| ------------- | ------------- |
| GltfExport | Use to export gltf from web runtime. |
| DropListener | Receive file drop events for uploading and networking, Requires Needle tiny storage server |

## UI

Spatial UI components are mapped from Unity UI (Canvas, not UI Toolkit) to [three-mesh-ui](https://github.com/felixmariotto/three-mesh-ui). 
UI can be animated.   

| Name  | Description |
| ------------- | ------------- |
| Canvas | Unity's UI system. Needs to be in World Space mode right now. |
| Text | Render Text using Unity's UI. Custom fonts are supported, a font atlas will be automatically generated on export. Use the font settings to control which characters are included in the atlas |
| Button |  |
| Image |  |
| RawImage |  |

> **Note**: Depending on your project, often a mix of spatial and 2D UI makes sense for cross-platform projects where VR, AR, and screens are supported. Typically, you'd build the 2D parts with HTML for best accessibility, and the 3D parts with geometric UIs that also support depth offsets (e.g. button hover states and the like).  
