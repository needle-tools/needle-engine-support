# Virtual and Augmented Reality

## VR (Virtual Reality)

## AR (Augmented Reality)

## Avatars

## Content Overlays in WebXR mode
    
If you want to display different html content whether the client is using a regular browser or using AR or VR you can just use a set of html classes. For example to make content appear on desktop and in AR add a ``<div class="desktop ar"> ... </div>`` inside the ``<needle-tiny>`` tag:

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
