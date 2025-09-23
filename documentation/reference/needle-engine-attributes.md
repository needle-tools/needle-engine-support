---
title: <needle-engine> Attributes
---

## Attributes of the Needle Engine Web Component

Needle Engine is available as a web component: `<needle-engine>`. This component can be used to load and display 3D scenes, models, and more in a web browser. It comes with a set of attributes that allow you to configure its behavior, look and feel. All those settings can be overwritten by code, but the attributes are a convenient way to set them up in HTML.

::: tip The web component is in `index.html`
Whether creating a project via Unity or Blender, or directly in code, you can use and adjust the `<needle-engine>` web component. Usually, you will find it in the `index.html` file of your web project.
:::

The table below shows a list of available attributes and their descriptions.

| Attribute | Description |
| --- | --- |
| **Loading** | |
| `src` | Path to one or multiple glTF or glb files.<br/>Supported types are `string`, `string[]` or a stringified array (`,` separated) |
| **Loading Display** | *Available options to change how the Needle Engine loading display looks. Use `localhost:3000?debugloadingrendering` for easier editing* |
| `loading-background` | **PRO** — Default: `transparent`. Change the loading background color (e.g. `#dd5500`) |
| `loading-logo-src` | **PRO** — Change the loading logo image (e.g. `https://yourdomain.com/logo.png` or `/logo.png`) |
| `hide-loading-overlay` | **PRO** — Do not show the loading overlay |
| `loading-blur` | Optional: Blur the scene until LODs are loaded (if any). Default: disabled |
| `poster` | Optional: Set the `poster` attribute to show a placeholder image while loading. Example: `<needle-engine poster="https://yourdomain.com/poster.png">`. By just using the attribute without a url the poster in `include/poster.webp` will be used if it exists (e.g. `<needle-engine poster>`) |
| **Events** | |
| `loadstart` | Name of the function to call when loading starts. Note that the arguments are `(ctx:Context, evt:Event)`. You can call `evt.preventDefault()` to hide the default loading overlay | 
| `progress` | Name of the function to call when loading updates. `onProgress(ctx:Context, evt: {detail: {context:Context, name:string, index:number, count:number, totalProgress01:number, progress:ProgressEvent}) { ... }`   |
| `loadfinished` | Name of the function to call when loading finishes | 
| **Rendering** | |
| `background-color` | optional, hex color to be used as a background color. Examples: `rgb(255, 200, 100)`, `#dddd00` | 
| `background-image` | optional, URL to a skybox image (background image) or a preset string: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` | 
| `background-blurriness` | optional, bluriness value between 0 (no blur) and 1 (max blur) for the `background-image`. Example: `background-blurriness="0.5"` | 
| `environment-image` | optional, URL to a environment image (environment light) or a preset string: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `contactshadows` | optional, render contact shadows |
| `tone-mapping` | optional, supported values are `none`, `linear`, `neutral`, `agx` |
| `tone-mapping-exposure` | optional number e.g. increase exposure with `tone-mapping-exposure="1.5"`, requires `tone-mapping` to be set |
| **Interaction** | |
| `autoplay` | add or set to `true` to auto play animations e.g. `<needle-engine autoplay` | 
| `camera-controls` | add or set to `true` to automatically add OrbitControls if no camera controls are found in the scene |
| `auto-rotate` | add to enable auto-rotate (only used with `camera-controls`) |
| **Advanced** | *Available options to change how the Needle Engine loading display looks. Use `?debugloadingrendering` for easier editing* |
| `dracoDecoderPath` | URL to the draco decoder e.g. `./include/draco/` to use the local Draco decoder |
| `dracoDecoderType` | draco decoder type. Options are `wasm` or `js`. See [three.js documentation](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) |
| `ktx2DecoderPath` | URL to the KTX2 decoder e.g. `./include/ktx2/` to use the local KTX2 decoder |
| **Internal** | |
| `hash` | Used internally, is appended to the files being loaded to force an update (e.g. when the browser has cached a glb file). Should not be edited manually. |

**Upgrade notice**:   
- Removed attributes in Needle Engine 4.5.0 `loading-style`, `loading-background-color`, `loading-text-color`, `primary-color`, `secondary-color`

# Examples

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
Needle Engine can also be used with Editors like [Unity](/unity/index.md) or [Blender](/blender/index.md).
:::