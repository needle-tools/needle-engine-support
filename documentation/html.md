# HTML 🧱

## Content Overlays by WebXR mode
If you want to display different html content whether the client is using a regular browser or using AR or VR you can just use a set of html classes. For example to make content appear on desktop and in AR add a ``<div class="desktop ar"> ... </div>`` inside the ``<needle-tiny>`` tag:

```html
<needle-tiny src="loadScene">
    <div class="desktop ar" style="pointer-events:none;">
        your content for AR and desktop goes here
    </div>
</needle-tiny>
```


## Accessing components from regular javascript
For accessing components from regular javascript outside of the engine please refer to the [interop with regular javascript section](./scripting.md#accessing-components-from-external-javascript)