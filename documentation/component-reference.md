# Component Reference 🧩

Here is a overview of some of the most common components that we provide. For a complete list please have a look at the components inside ``node_modules/@needle-tools/engine/engine-components`` and ``engine-components-experimental``.  

> You can always add your own components or add wrappers for Unity components we haven't provided yet. Take a look at the [Scripting](./scripting.md) section.

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
| LODGroup |  |
| Light |  |
| ParticleSystem | Experimental and currently not fully supported |
| XRFlag | Control when objects will be visible. E.g. only enable object when in AR  |
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

Physics is implemented using [cannon-es](https://github.com/pmndrs/cannon-es).  

| Name  | Description |
| ------------- | ------------- |
| BoxCollider |  |
| SphereCollider |  |
| Rigidbody |  |

> **Note**: MeshCollider is currently not supported.

## XR / WebXR
| Name  | Description |
| ------------- | ------------- |
| WebXR | Add to scene for AR and VR avatars |
| WebXRSync | Responsible for networking avatars |
| SpectatorCamera | Mirrors VR view to screen when e.g. connected via Oculus Link |
| XRFlag | Control when objects are visible, e.g. only in VR or AR or only in ThirdPerson |
| WebARSessionRoot | Put your AR content inside a WebARSessionRoot for placement and scale |

## Debugging
| Name  | Description |
| ------------- | ------------- |
| GridHelper | Draws a grid |
| BoxGizmo | Draws a box |
| AxesHelper | Draws axes |

## IO
| Name  | Description |
| ------------- | ------------- |
| GltfExport | Experimental! Use to export gltf from web runtime. |
| DropListener | Receive file drop events for uploading and networking |

## UI
| Name  | Description |
| ------------- | ------------- |
| Canvas | Unity's UI system. Must be outside of GltfObject currently. This will change in the future. |
| Text |  |
| Button |  |
| Image |  |
| RawImage |  |

