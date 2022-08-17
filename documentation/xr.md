# Virtual and Augmented Reality

## Adding VR and AR capabilities to a scene

AR, VR and networking capabilites in Needle Engine are very modular. You can choose to not support any of them, or add only specific features. Here's how:  

### Basic capabilities

- **Enable AR and VR**  
  Add a `WebXR` component.  
  *Optional:* you can set a custom avatar by referencing an [Avatar Prefab](#avatars).   
  By default a very basic `DefaultAvatar` is assigned.
  
- **Enable Teleportation**  
  Add a `TeleportTarget` component to object hierarchies that can be teleported on.  
  To exclude specific objects, set their layer to `IgnoreRaycasting`.  

- **Enable going into Miniature Mode**  
  Pointing onto a surface and pressing <kb>A</kb> on a controller switches between 1:10 scale (miniature mode) and 1:1 scale.  
  We're planning to add a component to have more control over this functionality.  

### Multiplayer

- **Enable Networking**  
  Add a `SyncedRoom` component.

- **Enable Desktop Viewer Sync**  
  Add a `SyncedCamera` component.

- **Enable XR Avatar Sync**  
  Add a `WebXRSync` component.
  
- **Enable Voice Chat**  
  Add a `VoIP` component.

> **Note**: these components can be anywhere inside your `GltfObject` hierarchy. They can also all be on the same GameObject.

### Special AR Components

- **Define the AR Session Root and Scale**  
  Add a `WebARSessionRoot` component to your root object.  
  Here you can define the user scale to shrink (< 1) or enlarge (> 1) the user in relation to the scene when entering AR.

### Controlling object display for XR

- **Define whether an object is visible in Browser, AR, VR, First Person, Third Person**  
  Add a `XR Flag` component to the object you want to control. Change options on the dropdown as needed.  
  
  Common usecases are
  - hiding floors when entering AR
  - hiding Avatar parts in First or Third Person views (e.g. first-person head shouldn't be visible).

### Travelling between VR worlds

Needle Engine supports the [`sessiongranted`](https://github.com/immersive-web/navigation) state. This allows users to seamlessly traverse between WebXR applications without leaving an immersive session – they stay in VR or AR.  

Currently, this is only supported on Oculus Quest 1 and 2 in the Oculus Browser. On other platforms, users will be kicked out of their current immersive session and have to enter VR again on the new page.  

## Avatars

While we don't currently provide an out-of-the-box integration external avatar systems, you can create application-specific avatars or custom systems.  

- **Create a custom Avatar**  
  - Create an empty GameObject as avatar root
  - Add an object named `Head` and add a `XRFlag` that's set to Third Person
  - Add objects named `HandLeft` and `HandRight`
  - Add your graphics below these objects.

### Experimental Avatar Components

There's a number of experimental components to build more expressive Avatars. It's recommended to duplicate these and make your own variants since they might be removed at a later point.  

- **Random Player Colors**  
  As an example for avatar customization, you can add a `PlayerColor` component to your renderers.  
  This randomized color is synchronized between players.  

- **Eye Rotation**  
  `AvatarEyeLook_Rotation` rotates GameObjects (eyes) to follow other avatars and a random target. This component is synchronized between players.  
  
- **Eye Blinking**  
  `AvatarBlink_Simple` randomly hides GameObjects (eyes) every few seconds, emulating a blink.  
  
  ![image](https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png)  
  *Avatar Prefab hierarchy*
  
- **Offset Constraint**  
  `OffsetConstraint` allows to shift an object in relation to another one in Avatar space. This allows, for example, to have a Body follow the Head but keep rotation levelled. It also allows to construct simple neck models.  
  
- **IK Constraint**  
  `BasicIKConstraint` is a very minimalistic constraint that takes two transforms and a hint. This is useful to construct simple arm or leg chains. As rotation is currently not properly implemented, arms and legs may need to be rotationally symmetric to "look right". It's called "Basic" for a reason!  

## HTML Content Overlays in AR  
    
If you want to display different html content whether the client is using a regular browser or using AR or VR, you can just use a set of html classes.  
This is controlled via HTML element classes. For example, to make content appear on desktop and in AR add a ``<div class="desktop ar"> ... </div>`` inside the `<needle-tiny>` tag:  

```html
<needle-tiny src="loadScene">
    <div class="desktop ar" style="pointer-events:none;">
        your content for AR and desktop goes here
    </div>
</needle-tiny>
```

## Limitations for WebXR on iOS

Due to Apple currently not supporting WebXR on iOS devices, Augmented Reality experiences on iOS are limited.  

A number of options and workarounds exist to still give iOS users _some_ AR:  

1. **Guiding users towards WebXR-compatible browsers on iOS.**
   Depending on your target audience, you can guide users on iOS towards for example Mozilla's [WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056) to experience AR on iOS.  
   
3. **Exporting content on-the-fly as USDZ files.**  
   These files can be displayed on iOS devices in AR. They lack interactivity (besides a small set of built-in components) but can be sufficient for product configurators and similar relatively static usecases.
   An example is [Castle Builder](https://castle.needle.tools) where creations (not the live session) can be viewed in AR.
   - The [three.js USDZ converter](https://threejs.org/examples/misc_exporter_usdz.html) can be used like any other three.js example to create and view USDZ files at runtime.  

 > **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** uses this approach. Players can collaboratively build scenes on their screens and then view the results in AR on iOS. On Android, they can also build in WebXR.   
 > — #madewithneedle by Katja Rempel 💚  

2. **Using camera access and custom algorithms on iOS devices.**  
   It's to request camera image access and run custom algorithms to determine device pose.  
   While we don't provide built-in components for this, here's a few references to libraries and frameworks that we want to try in the future:  
   - [AR.js](https://github.com/AR-js-org/AR.js) (open source)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)
   - [8th Wall](https://www.8thwall.com/) (commercial)

## References

[WebXR Device API](https://www.w3.org/TR/webxr/)  
[caniuse: WebXR](https://caniuse.com/webxr)  
