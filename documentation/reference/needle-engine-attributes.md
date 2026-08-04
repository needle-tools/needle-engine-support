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
| `loading-background` | Default: `transparent`. Change the loading background color (e.g. `#dd5500`) |
| `hide-loading-overlay` | Do not show the loading overlay |
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

### Loading screen (Needle Engine 6)

::: warning Preview — Needle Engine 6 (alpha)
The loading screen was redesigned in **Needle Engine 6** (currently in alpha) and the options in this section are **in preview** — attribute names, CSS variables and defaults may still change before the stable release. Everything above this section applies to the current stable release.
:::

Needle Engine 6 renders an animated progress bar (with an optional logo) that can be themed via HTML attributes or CSS custom properties.

| Attribute | |
| --- | --- |
| `loading-style` | Color theme of the loading overlay: `auto` (default — follows the OS `prefers-color-scheme`), `light`, or `dark` |
| `loading-layout` | `centered` (default — bar centered, max 50% width) or `minimal` (thin bar pinned to the top edge) |
| `loading-logo` | Show the logo on the loading overlay: `true` / `false` (off by default). The image comes from `loading-logo-src` or `logo-src`, otherwise the Needle logo |
| `loading-logo-src` | **PRO** — Custom loading logo image (URL, `data:` or `blob:` URL). Falls back to `logo-src`, then the Needle logo. Mirrors `qrcode-logo-src` |

**CSS custom properties** — set any of these on the `<needle-engine>` element (inline `style` or in your CSS) to restyle the loader. A consumer value always wins over the built-in theme default:

| Variable | Controls | Default |
| --- | --- | --- |
| `--needle-loading-bar` | progress bar fill color | per theme |
| `--needle-loading-bar-track` | unfilled track color | per theme |
| `--needle-loading-bar-done` | fill color once complete | same as fill |
| `--needle-loading-bar-sheen` | animated highlight color | per theme |
| `--needle-loading-sheen-size` | sheen tile width (smaller = more bands) | per layout |
| `--needle-loading-sheen-speed` | time to scroll one sheen band | per layout |
| `--needle-loading-background` | scrim color behind the loader | per theme |
| `--needle-loading-blur` | backdrop blur behind the loader | `6px` |
| `--needle-loading-color` | text color | per theme |

The `poster` image can be styled via CSS variables, or fully via `needle-engine::part(poster)`:

| Variable | Controls | Default |
| --- | --- | --- |
| `--needle-loading-poster-overlay` | color painted over the image (darken/tint) | `transparent` |
| `--needle-loading-poster-blur` | blur amount | `0` (url) / `50px` (bare `poster`) |
| `--needle-loading-poster-size` | `cover` / `contain` / … | `cover` |
| `--needle-loading-poster-position` | background position | `center` |
| `--needle-loading-poster-opacity` | poster opacity | `1` |

Example — a centered dark loader with a custom bar color and a darkened poster:
```html
<needle-engine
  loading-style="dark"
  loading-layout="centered"
  poster="/poster.jpg"
  style="--needle-loading-bar:#78e08f; --needle-loading-poster-overlay:rgba(0,0,0,.5)">
</needle-engine>
```

Or restyle the loading bar from your stylesheet — set the variables on the `<needle-engine>` element (they win over the built-in theme):
```css
needle-engine {
  --needle-loading-bar: #c9d497;                      /* fill color */
  --needle-loading-bar-track: rgba(85, 87, 12, 0.18); /* unfilled track */
  --needle-loading-bar-sheen: rgba(255, 255, 255, .5); /* animated highlight */
  --needle-loading-sheen-size: 400px;                  /* smaller = more/tighter bands */
  --needle-loading-sheen-speed: 1s;                  /* smaller = faster */
}

/* Optionally give dark mode its own bar color */
@media (prefers-color-scheme: dark) {
  needle-engine { --needle-loading-bar: #dbe6a8; }
}
```

::: tip Setting `poster="0"` disables the poster (same as omitting it). A poster automatically turns off the scrim/backdrop blur, since it becomes the background.
:::

**Upgrade notice**:   
- Needle Engine **4.x–5.x**: `loading-style`, `loading-background-color`, `loading-text-color`, `primary-color`, `secondary-color` were removed in 4.5.0, and the loading display rendered no logo since 4.10.0.
- Needle Engine **6** (alpha) reintroduces a redesigned, themeable loading screen — see [Loading screen (Needle Engine 6)](#loading-screen-needle-engine-6) above. `loading-style` returns with a new meaning (color theme: `auto`/`light`/`dark`), the logo is available again (opt-in via `loading-logo`), and `loading-logo-src` becomes the loading-specific logo source (mirroring `qrcode-logo-src`).

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
