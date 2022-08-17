# Virtual and Augmented Reality

## Adding VR and AR capabilities to a scene

AR, VR and networking capabilites in Needle Engine are very modular. You can choose to not support any of them, or add only specific features. Here's how:  

### Basic capabilities
- **Enable AR and VR**  
  Add a `WebXR` component.  
  *Optional:* you can set a custom avatar by referencing an [Avatar Prefab](#avatars).   
  By default a very basic `DefaultAvatar` is assigned.

### Multiplayer
- **Enable Networking**  
  Add a `SyncedRoom` component.

- **Enable Desktop Viewer Sync**  
  Add a `SyncedCamera` component.

- **Enable XR Avatar Sync**  
  Add a `WebXRSync` component.
  
- **Enable voice chat**  
  Add a `VoIP` component.

> **Note**: these components can be anywhere inside your `GltfObject` hierarchy. They can also all be on the same GameObject.

### Special AR Components

- **Define the AR Session Root and Scale**  
  Add a `WebARSessionRoot` component to your root object.  
  Here you can define the user scale to shrink (< 1) or enlarge (> 1) the user in relation to the scene when entering AR.

### Controlling object display for XR

- **Define whether an object is visible in Browser, AR, VR, First Person, Third Person**  
  Add a `XR Flag` component to the object you want to control. By default, it's always visible.  
  
  Common usecases are
  - hiding floors when entering AR
  - hiding Avatar parts in first or third person views (e.g. first-person head shouldn't be visible).

## Avatars

While we don't currently provide an out-of-the-box integration external avatar systems, you can create application-specific avatars or custom systems.  

- **Create a custom Avatar**  
  - Create an empty GameObject as avatar root
  - Add an object named `Head` and add a `XRFlag` that's set to Third Person
  - Add objects named `HandLeft` and `HandRight`
  - Add your graphics below these objects.

- **Assign Random Player Colors**  
  As an example for avatar customization, you can add a `PlayerColor` component to your renderers.  
  The randomized color is synchronized across objects using the script and across the network to other players.  

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

## Limitations

Due to Apple currently not supporting WebXR on iOS devices, augmented reality experiences on iOS are limited.  

A number of options exist in the meantime:  

1. **Guiding users towards WebXR-compatible browsers on iOS.**
   Depending on your target audience, you can guide users on iOS towards for example Mozilla's [WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056) to experience AR on iOS.  
   
3. **Exporting content on-the-fly as USDZ files.**  
   These files can be displayed on iOS devices in AR. They lack interactivity (besides a small set of built-in components) but can be sufficient for product configurators and similar relatively static usecases.
   An example is [Castle Builder](https://castle.needle.tools) where creations (not the live session) can be viewed in AR.
   - The [three.js USDZ converter](https://threejs.org/examples/misc_exporter_usdz.html) can be used like any other three.js example to create and view USDZ files at runtime.

2. **Using camera access and custom algorithms on iOS devices.**  
   Similar to what 8th Wall and some other platform do, it's possible to request camera image access and run custom algorithms to determine device pose and some other properties.
   While we don't provide built-in components for this, here's a few references for things we want to try in the future:
   - [AR.js](https://github.com/AR-js-org/AR.js)
   - [Mind AR](https://github.com/hiukim/mind-ar-js)
   - [8th Wall](https://www.8thwall.com/)

## References

[WebXR Device API](https://www.w3.org/TR/webxr/)
[caniuse: WebXR](https://caniuse.com/webxr)
