---
description: A overview of some of the components that we provide
---

# Component Reference 🧩

Here is a overview of some of the components that we provide. Some of them map directly to Unity components, while others are core components from Needle Engine.   
For a complete list please have a look at the components inside the folders ``node_modules/@needle-tools/engine/engine-components`` and ``engine-components-experimental``.  

> You can always add your own components or add wrappers for Unity components we haven't provided yet.  
> Read more in the [Scripting](./scripting.md) section of our docs.

## Audio
| Name  | Description |
| ------------- | ------------- |
| AudioListener |  |
| AudioSource |  |

## Animation
| Name  | Description |
| ------------- | ------------- |
| Animator + AnimatorController | Export with animation state machine, conditions, transitions  |
| Animation | Most basic animation component. Only first clip is exported |
| PlayableDirector + Timeline | Export powerful sequences to control animation, audio, state and more |

## Rendering
| Name  | Description |
| ------------- | ------------- |
| Camera |  |
| Light |  |
| XRFlag | Control when objects will be visible. E.g. only enable object when in AR  |
| DeviceFlag | Control on which device objects will be visible  |
| LODGroup |  |
| ParticleSystem | Experimental and currently not fully supported |
| VideoPlayer  | Playback videos from url or referenced video file (will be copied to output on export) |

## Networking
| Name  | Description |
| ------------- | ------------- |
| SyncedRoom | Main networking component. Put in your scene to enable networking |
| Networking | Used to setup backend server for networking. |
| SyncedTransform | Automatically network object transformation |
| SyncedCamera | Automatically network camera to other users in room |
| WebXRSync | Networks WebXR avatars (AR and VR) |
| Voip | Enables voice-chat |

## Interaction
| Name  | Description |
| ------------- | ------------- |
| EventSystem |  |
| ObjectRaycater | Required for DragControls and Duplicatable |
| DragControls | Requires raycaster in parent hierarchy, e.g. ObjectRaycaster |
| Duplicatable | Requires DragControls |
| Interactable | Basic component to mark an object to be interactable. |
| OrbitControls | Add to camera to add camera orbit control functionality |
| SmoothFollow | Allows to interpolate smoothly to another object's transform |
| DeleteBox |  |
| DropListener | Add to receive file drop events for uploading |
| SpatialTrigger | Use to raise event if an object enters a specific space or area |
| SpatialTriggerReceiver | Use to receive events from SpatialTrigger |

## Physics

Physics is implemented using [rapier](https://rapier.rs/).  

| Name  | Description |
| ------------- | ------------- |
| Rigidbody | |
| BoxCollider |  |
| SphereCollider |  |
| CapsuleCollider |  |
| MeshCollider |  |
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
| WebXRImageTracking | Assign images to be tracked and optionally instantiate an object at the image position |
| WebXRPlaneTracking | Create plane meshes or colliders for tracked planes |

## Debugging  
| Name  | Description |
| ------------- | ------------- |
| GridHelper | Draws a grid |
| BoxGizmo | Draws a box |
| AxesHelper | Draws axes |

## Runtime File Input/Output  
| Name  | Description |
| ------------- | ------------- |
| GltfExport | Experimental! Use to export gltf from web runtime. |
| DropListener | Receive file drop events for uploading and networking |

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
