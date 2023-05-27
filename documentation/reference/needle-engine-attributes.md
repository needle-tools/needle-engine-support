---
title: Needle Engine Attributes
---

The `<needle-engine>` web-component comes with a nice collection of built-in attributes that can be used to modify the look and feel of the loaded scene without the need to add or edit the three.js scene directly.   
The table below shows a list of the most important ones:

| Attribute | Description |
| --- | --- |
| **Loading** | |
| `src` | Path to one or multiple glTF or glb files.<br/>Supported types are `string`, `string[]` or a stringified array (`,` separated) |
| `dracoDecoderPath` | URL to the draco decoder |
| `dracoDecoderType` | draco decoder type. Options are `wasm` or `js`. See [three.js documentation](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) |
| `ktx2DecoderPath` | URL to the KTX2 decoder |
| **Rendering** | |
| `skybox-image` | URL to a skybox image (background image) | 
| `environment-image` | optional, URL to a environment image (environment light) |
| **Interaction** | |
| `autoplay` | add or set to `true` to auto play animations e.g. `<needle-engine autoplay` | 
| `camera-controls` | add or set to `true` to automatically add OrbitControls if no camera controls are found in the scene |
| `auto-rotate` | add to enable auto-rotate (only used with `camera-controls`) |
| **Events** | |
| `loadstart` | Name of the function to call when loading starts. Note that the arguments are `(ctx:Context, evt:Event)`. You can call `evt.preventDefault()` to hide the default loading overlay | 
| `progress` | Name of the function to call when loading updates |
| `loadfinished` | Name of the function to call when loading finishes | 
| **Internal** | |
| `hash` | Used internally, is appended to the files being loaded to force an update (e.g. when the browser has cached a glb file). Should not be edited manually. |

