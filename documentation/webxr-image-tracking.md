---
title: WebXR Image Tracking with Needle Engine
---

## What is WebXR Image Tracking
**WebXR image tracking enables browsers to detect and track specific images in the real world** through a device's camera, providing real-time position and orientation data to anchor virtual content precisely to physical markers like posters, packaging, or artwork.   

By pointing the camera at a recognized image, the image tracking api continuously updates the spatial relationship between the virtual and physical elements, ensuring proper alignment even as the device or image moves.   

Image tracking transforms static images into interactive AR triggers—allowing museum paintings to display overlaid information, product packages to reveal 3D animations, or business cards to show floating contact details—all through web standards without requiring users to download dedicated apps, making AR experiences instantly accessible through any compatible web browser.

## Demo

Needle Engine supports **WebXR Image Tracking** ([Live Demo](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) on Android and **QuickLook Image Tracking** on iOS.

Start the scene below in AR and point your phone's camera at the image marker on a screen, or print it out.  

:::info WebXR Image Tracking on Android
**On Android** please turn on "WebXR Incubations" in the Chrome Flags. You can find those by pasting [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) into the Chrome browser address bar of your Android phone.  
:::


<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Image Marker" width=300 />    

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />


## Explainer


:::warning WebXR Image Tracking is still in a "draft" phase and not generally available
So far, browser vendors haven't been able to agree on the final image tracking API for WebXR. As long as the specification is in "draft" phase ([Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
you and your app's users need to follow these steps to enable WebXR ImageTracking on Android devices:
1. Visit ``chrome://flags`` on your Android Chrome browser
2. Find and enable the `WebXR Incubations` option
:::

Without that spec, one can still request camera image access and run custom algorithms to determine device pose. The downside is that users will have to accept additional permissions like camera access, and the tracking will not be as accurate as with the native capabilities of the device.

Here are some libraries to add image tracking based on camera access and local computer vision algorithms:  
   - [Experimental AR.js integration with Needle Engine](https://github.com/FireDragonGameStudio/NeedleAndARjs) by FireDragonGameStudio
   - [AR.js](https://github.com/AR-js-org/AR.js) (open source)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)


### Integrations
Image Tracking can be setup in both Unity and Blender by adding a WebXRImageTracking component to an object. Then add your images to the `Tracked Images` array.

![unity screenshot](/imgs/webxr-image-tracking-unity-component.jpg)  
*Image tracking component in Unity*

![blender screenshot](/imgs/webxr-image-tracking-blender-component.jpg)  
*Image tracking component in Blender*

## References

- [WebXR Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)
- [WebXR Device API](https://www.w3.org/TR/webxr/)  
- [caniuse: WebXR](https://caniuse.com/webxr)  
- [Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)


## Further reading
- [Needle Everywhere Actions](./everywhere-actions.md) *experiences that run everywhere*
- [XR documentation](./xr.md)