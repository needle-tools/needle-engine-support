---
title: VR & AR (WebXR)
---

## Supported Devices
Theoretically all WebXR-capable devices and browsers should be supported. That being said, we've tested the following configurations:  

| Tested VR Device | Browser | Notes |
| -- | -- | -- |
| Apple Vision Pro | ✔️ Safari Browser | hand tracking, support for transient pointer |
| Meta Quest 1 | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup> |
| Meta Quest 2 | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup>, passthrough (black and white) |
| Meta Quest 3 | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup>, passthrough, depth sensing, mesh tracking |
| Meta Quest Pro | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup>, passthrough |
| Pico Neo 3 | ✔️ Pico Browser | no hand tracking, inverted controller thumbsticks |
| Pico Neo 4 | ✔️ Pico Browser | passthrough, hand tracking<sup>2</sup> |
| Oculus Rift 1/2 | ✔️ Chrome |  |
| Hololens 2 | ✔️ Edge | hand tracking, support for AR and VR (in VR mode, background is rendered as well) |
| Looking Glass Portrait | ✔️ Chrome | requires shim, see samples | 

| Tested AR Device | Browser | Notes |
| -- | -- | -- |
| Android 10+ | ✔️ Chrome | |
| Android 10+ | ✔️ Firefox | |
| iOS 15+ | ✔️ WebXR Viewer | does not fully implement standards, but supported |
| iOS 15+ | (✔️)<sup>3</sup> Safari | No full code support, but Needle [Everywhere Actions](everywhere-actions.md) are supported for creating dynamic, interactive USDZ files. |
| Hololens 2 | ✔️ Edge | |
| Hololens 1 | ❌ | no WebXR support |
| Magic Leap 2 | ✔️ | |

| Not Tested but Should Work™️ | Browser | Notes |
| -- | -- | -- |
| Magic Leap 1 | | please let us know if you tried! |


<sup>1</sup>: Requires enabling a browser flag: `chrome://flags/#webxr-navigation-permission`   
<sup>2</sup>: Requires enabling a toggle in the Developer settings    
<sup>3</sup>: Uses [Everywhere Actions](everywhere-actions.md) or [other approaches](#augmented-reality-and-webxr-on-ios)

## Examples

Visit our [Needle Engine XR Samples](https://engine.needle.tools/samples/?overlay=samples&tag=xr) to try many interactive examples right now!

## Adding VR and AR capabilities to a scene

AR, VR and networking capabilites in Needle Engine are designed to be modular. You can choose to not support any of them, or add only specific features. 

### Basic capabilities

- **Enable AR and VR**  
  Add a `WebXR` component.  
  *Optional:* you can set a custom avatar by referencing an [Avatar Prefab](#avatars).   
  By default a very basic `DefaultAvatar` is assigned.
  
- **Enable Teleportation**  
  Add a `TeleportTarget` component to object hierarchies that can be teleported on.  
  To exclude specific objects, set their layer to `IgnoreRaycasting`.  

### Multiplayer

- **Enable Networking**  
  Add a `SyncedRoom` component.

- **Enable Desktop Viewer Sync**  
  Add a `SyncedCamera` component.
  
- **Enable Voice Chat**  
  Add a `VoIP` component.

> **Note**: these components can be anywhere inside your `GltfObject` hierarchy. They can also all be on the same GameObject.

 > **[Castle Builder](https://castle.needle.tools/)** uses all of the above for a cross-platform multiplayer sandbox experience.   
 > — #madebyneedle 💚  
   
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

Currently, this is only supported on Oculus Quest 1, 2 and 3 in the Oculus Browser. On other platforms, users will be kicked out of their current immersive session and have to enter VR again on the new page.  
Requires enabling a browser flag: `chrome://flags/#webxr-navigation-permission`  

- **Click on objects to open links**  
  Add the `OpenURL` component that makes it very easy to build connected worlds.  

## Scripting  
Read more about scripting for XR at the [scripting XR documentation](./scripting.md#xr-event-methods)

## Avatars

While we don't currently provide an out-of-the-box integration external avatar systems, you can create application-specific avatars or custom systems.  

- **Create a custom Avatar**  
  - Create an empty GameObject as avatar root
  - Add an object named `Head` and add a `XRFlag` that's set to Third Person
  - Add objects named `HandLeft` and `HandRight`
  - Add your graphics below these objects.

### Experimental Avatar Components

There's a number of experimental components to build more expressive Avatars. At this point we recommended duplicating them to make your own variants, since they might be changed or removed at a later point.  

![20220817-230858-87dG-Unity_PLjQ](https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif)  
*Example Avatar Rig with basic neck model and limb constraints*

- **Random Player Colors**  
  As an example for avatar customization, you can add a `PlayerColor` component to your renderers.  
  This randomized color is synchronized between players.  

- **Eye Rotation**  
  `AvatarEyeLook_Rotation` rotates GameObjects (eyes) to follow other avatars and a random target. This component is synchronized between players.  
  
- **Eye Blinking**  
  `AvatarBlink_Simple` randomly hides GameObjects (eyes) every few seconds, emulating a blink.  
  
  ![image](https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png)  
  *Example Avatar Prefab hierarchy*
  
- **Offset Constraint**  
  `OffsetConstraint` allows to shift an object in relation to another one in Avatar space. This allows, for example, to have a Body follow the Head but keep rotation levelled. It also allows to construct simple neck models.  
  
- **Limb Constraint**  
  `BasicIKConstraint` is a very minimalistic constraint that takes two transforms and a hint. This is useful to construct simple arm or leg chains. As rotation is currently not properly implemented, arms and legs may need to be rotationally symmetric to "look right". It's called "Basic" for a reason!  

## HTML Content Overlays in AR  
    
If you want to display different html content whether the client is using a regular browser or using AR or VR, you can just use a set of html classes.  
This is controlled via HTML element classes. For example, to make content appear on desktop and in AR add a ``<div class="desktop ar"> ... </div>`` inside the `<needle-engine>` tag:  

```html
<needle-engine>
    <div class="desktop ar" style="pointer-events:none;">
        <div class="positioning-container">
          <p>your content for AR and desktop goes here</p>
          <p class="only-in-ar">This will only be visible in AR</p>
        <div>
    </div>
</needle-engine>
```

Content Overlays are implemented using the optional `dom-overlay` feature which is usually supported on screen-based AR devices (phones, tablets).  

Use the `.ar-session-active` class to show/hide specific content while in AR. The [`:xr-overlay` pseudo class](https://www.w3.org/TR/webxr-dom-overlays-1/#css-pseudo-class) shouldn't be used at this point because using it breaks Mozilla's WebXR Viewer. 

```css
.only-in-ar {
  display: none;
}

.ar-session-active .only-in-ar {
  display:initial;
}
```

It's worth noting that the overlay element [will be always displayed fullscreen while in XR](https://www.w3.org/TR/webxr-dom-overlays-1/#ua-style-sheet-defaults), independent of styling that has been applied. If you want to align items differently, you should make a container _inside_ the `class="ar"` element.  

<sample src="https://engine.needle.tools/samples-uploads/ar-overlay/"/>

## Image Tracking

WebXR ImageTracking is still in "draft" phase: [Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)   
But you can still use WebXR ImageTracking with Needle Engine today:

- Enable `WebXR Incubations` in chrome
- Add the `WebXRImageTracking` component

You can find additional documentation in the [Everywhere Actions](everywhere-actions.md#image-tracking) section

Without that spec, one can still request camera image access and run custom algorithms to determine device pose.  
Libraries to add image tracking:  
   - [AR.js](https://github.com/AR-js-org/AR.js) (open source)
     - [Experimental AR.js integration](https://github.com/FireDragonGameStudio/NeedleAndARjs) by FireDragonGameStudio
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)


## Augmented Reality and WebXR on iOS

Augmented Reality experiences on iOS are somewhat limited, due to Apple currently not supporting WebXR on iOS devices.  

Needle Engine's [Everywhere Actions](everywhere-actions.md) are designed to fill that gap, bringing automatic interactive capabilities to iOS devices for scenes composed of specific components. They support a subset of the functionality that's available in WebXR, for example spatial audio, image tracking, animations, and more. See [the docs](everywhere-actions.md) for more information. 

### Musical Instrument – WebXR and QuickLook support

Here's an example for a musical instrument that uses Everywhere Actions and thus works in browsers and in AR on iOS devices. 
It uses spatial audio, animation, and tap interactions.  
<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Everywhere Actions and other options for iOS AR

There's also other options for guiding iOS users to even more capable interactive AR experiences:

3. **Exporting content on-the-fly as USDZ files.**  
   These files can be displayed on iOS devices in AR. When exported from scenes with Everywhere Actions the interactivity is the same, more than sufficient for product configurators, narrative experiences and similar.
   An example is [Castle Builder](https://castle.needle.tools) where creations (not the live session) can be viewed in AR.  

 > **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** uses this approach. Players can collaboratively place text into the scene on their screens and then view the results in AR on iOS. On Android, they can also interact right in WebXR.   
 > — #madewithneedle by Katja Rempel 💚  

1. **Guiding users towards WebXR-compatible browsers on iOS.**
   Depending on your target audience, you can guide users on iOS towards for example Mozilla's [WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056) to experience AR on iOS.  
   
2. **Using camera access and custom algorithms on iOS devices.**  
   One can request camera image access and run custom algorithms to determine device pose.  
   While we currently don't provide built-in components for this, here's a few references to libraries and frameworks that we want to try in the future:  
   - [AR.js](https://github.com/AR-js-org/AR.js) (open source)
     - [Experimental AR.js integration](https://github.com/FireDragonGameStudio/NeedleAndARjs) by FireDragonGameStudio
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)
   - [8th Wall](https://www.8thwall.com/) (commercial)

## References

[WebXR Device API](https://www.w3.org/TR/webxr/)  
[caniuse: WebXR](https://caniuse.com/webxr)  
[Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)
