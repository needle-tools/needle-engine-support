---
title: <needle-engine> Attributes
---

## Attributes of the Needle Engine Web Component

Needle Engine is typically used as a web component: `<needle-engine>`. This component can be used to load and display 3D scenes, models, and more in a web browser. It comes with a set of attributes that allow you to configure its behavior, look and feel. All those settings can be overwritten by code, but the attributes are a convenient way to set them up in HTML. The tables below show a list of available attributes and what they do.


::: tip The web component is in `index.html`
Whether creating a project via Unity or Blender, or directly in code, you can use and adjust the `<needle-engine>` web component. Usually, you will find it in the `index.html` file of your web project.
:::


### File Loading and Events
| | |
| --- | --- |
| `src` | Path to one or multiple glTF or glb files.<br/>Supported types are `string`, `string[]` or a stringified array (comma-separated). |
| `loadstart` | Name of the function to call when loading starts. Note that the arguments are `(ctx:Context, evt:Event)`. You can call `evt.preventDefault()` to hide the default loading overlay | 
| `progress` | Name of the function to call when loading updates. `onProgress(ctx:Context, evt: {detail: {context:Context, name:string, index:number, count:number, totalProgress01:number, progress:ProgressEvent}) { ... }`   |
| `loadfinished` | Name of the function to call when loading finishes |

### Custom Branding
Available attributes to change the Needle Engine loading and custom branding
| | |
| --- | --- |
| `loading-blur` | Optional: Blur the scene until LODs are loaded (if any). Default: disabled |
| `poster` | Optional: Set the `poster` attribute to show a placeholder image while loading. Example: `<needle-engine poster="https://yourdomain.com/poster.png">`. By just using the attribute without a url the poster in `include/poster.webp` will be used if it exists (e.g. `<needle-engine poster>`) |
| `loading-background` | **PRO** — Default: `transparent`. Change the loading background color (e.g. `#dd5500`) |
| `hide-loading-overlay` | **PRO** — Do not show the loading overlay |
| `logo-src` | **PRO** — Change the logo image (e.g. `https://yourdomain.com/logo.png` or `/logo.png`). This logo will then be used in the QR code and XR session loading |
| `qrcode-logo-src` | **PRO** – Change the logo image for the QR code (e.g. `https://yourdomain.com/logo.png` or `/logo.png`). If not provided the `logo-src` attribute will be used.


### Visual Settings
| | |
| --- | --- |
| `background-color` | optional, hex color to be used as a background color. Examples: `rgb(255, 200, 100)`, `#dddd00` | 
| `background-image` | optional, URL to a skybox image (background image) or a preset string: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar`. Supports [FastHDR](https://cloud.needle.tools/hdris) | 
| `background-blurriness` | optional, bluriness value between 0 (no blur) and 1 (max blur) for the `background-image`. Example: `background-blurriness="0.5"` | 
| `environment-image` | optional, URL to a environment image (environment light) or a preset string: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar`. Supports [FastHDR](https://cloud.needle.tools/hdris) |
| `contactshadows` | optional, render contact shadows |
| `tone-mapping` | optional, supported values are `none`, `linear`, `neutral`, `agx` |
| `tone-mapping-exposure` | optional number e.g. increase exposure with `tone-mapping-exposure="1.5"`, requires `tone-mapping` to be set |

### Interaction and Camera
| | | 
| -- | - |
| `autoplay` | add or set to `true` to auto play animations e.g. `<needle-engine autoplay` | 
| `camera-controls` | add or set to `true` to automatically add OrbitControls if no camera controls are found in the scene |
| `auto-rotate` | add to enable auto-rotate (only used with `camera-controls`) |
| `focus-rect` | Query string to select an HTML element on your website to be used as the [camera-focus-rect](https://engine.needle.tools/docs/api/classes/Engine_Core.Context.html#setcamerafocusrect) - [Demo](https://focus-rect-demo-z23hmxbztexgt-z19e07i.needle.run/). Note that you can also set it programmatically with `ctx.setCameraFocusRect(<element>\|DOMRect)` |

### Decoder Settings
For files that require a decoder (e.g. Draco compressed glb files), we automatically load an efficient decoder from the Needle CDN. If you want to create fully self-contained projects, can specify the path to the decoder with the following attributes.

| | |
| --- | --- |
| `dracoDecoderPath` | URL to the draco decoder e.g. `./include/draco/` to use the local Draco decoder |
| `dracoDecoderType` | draco decoder type. Options are `wasm` or `js`. See [three.js documentation](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) |
| `ktx2DecoderPath` | URL to the KTX2 decoder e.g. `./include/ktx2/` to use the local KTX2 decoder |

### Other
| | |
| --- | --- |
| `hash` | Used internally, is appended to the files being loaded to force an update (e.g. when the browser has cached a GLB file). Should not be edited manually. |

**Upgrade notice**:   
- Removed attributes in Needle Engine 4.5.0: `loading-style`, `loading-background-color`, `loading-text-color`, `primary-color`, `secondary-color`
- Replaced `loading-logo-src` (old) with `logo-src` (new). 
- Since Needle Engine 4.10.0 the `<needle-engine>` loading display has been modified and will not render a logo anymore

## Examples

```html
<!-- Setting the path to a custom glb to be loaded -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- Overriding where the draco decoder is located -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="./include/draco/"></needle-engine>
```

Setting environment images, playing animation and automatic camera controls. [See it live on stackblitz](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)
```html
<needle-engine
      camera-controls
      auto-rotate
      autoplay
      skybox-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      environment-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf"
      >
      </needle-engine>
```

Receiving loading events:
```html
<needle-engine progress="onProgress" loadfinished="onLoadFinished"> </needle-engine>
<script>
    function onProgress(ctx, event) {
        const progress01 = evt.detail.totalProgress01;
        console.log(progress01);
    }

    function onLoadFinished() {
        console.log("Needle Engine has finished loading");
    }
</script>
```

:::tip Need more control?
For further customization or callbacks see the [scripting documentation](/scripting.md) or [Needle Engine hooks](/scripting.md#hooks). Needle Engine is fully scriptable.
:::

:::tip Prefer working visually?
These attributes can also be changed from within our Editor integrations, like [Unity](/unity/index.md) and [Blender](/blender/index.md).
:::
