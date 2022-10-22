---
head:
  - - meta
    - name: foo
      content: yaml array syntax
  - [meta, { name: bar , content: square brackets syntax }]
---

# Debugging

## Useful resources for working with glTF 🖇

To inspect glTF or glb files online:
- [gltf.report ⇡](https://gltf.report/) - three.js based
- [modelviewer.dev/editor ⇡](https://modelviewer.dev/editor) - three.js based
- [Khronos glTF Sample Viewer ⇡](https://github.khronos.org/glTF-Sample-Viewer-Release/)
- [Babylon Sandbox ⇡](https://sandbox.babylonjs.com/)
- [glTF Validator ⇡](https://github.khronos.org/glTF-Validator/)

To inspect them locally:
- use the [glTF Shell Extension for Windows ⇡](https://apps.microsoft.com/store/detail/gltf-shell-extensions/9NPGVJ9N57MV?hl=en-us&gl=US) to convert between glTF and glb
- use the [glTF Tools VS Code Extension ⇡](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode) to see validation errors and in-engine previews locally


## Built-in URL parameters 🔖

::: warning
This section is under construction and the information here might be outdated or incomplete. 🏗️
:::

Debug Flags can be appended as URL query parameters.  
Use ``?help`` to get a list of ALL parameters available.  

The following parameters can be added to URLs to emit more debugging info, change behaviour or show gizmos/helpers: 

- ``help`` print all available url parameter
- ``printGltf`` logs loaded gltf files to the console
- ``debugextension`` logs gltf extension debug information. Beware: it might be a lot
- ``debug`` shows transform gizmos (if any)
- ``debugnet`` networking debug
- ``debugowner`` ownership logs
- ``debugavatar=<avatarid>`` instantiates one debug avatar in center of world
- ``debugphysics`` shows physics colliders
- ``debugsync`` logs sync (synced transform) messages
- ``debugassets`` logs messages about registered assets (e.g. builtin textures)
- ``debugvoip`` logs voip related messages
- ``disableRT`` used to disable render textures (e.g. tv screen)
- ``gizmos`` enables gizmo rendering (e.g. when using BoxCollider or AxesHelper components)
- and a lot more: please use ``help`` to see them all

### Local Testing of release builds
- First, install http-server: `npm install -g http-server` 
- make a production build
- in that directory, run `http-server -g` (-g enables gzip support)
- if you want to test WebXR, generate a [self-signed SSL certificate ⇡](https://stackoverflow.com/a/35231213), then run `http-server -g -S` to enable https (required for WebXR).

## Mobile Console 

We're providing a simple but effective console overlay for seeing logs from mobile devices. iOS issues are otherwise notoriously hard to debug.  
(not documented yet) 

For **Android**, you can attach Chrome Dev Tools to your device and see logs right from your PC. You have to switch your device into development mode and connect it via USB.  

For **Quest**, you can attach Chrome Dev Tools to your device and see logs right from your PC. You have to switch your device into development mode and connect it via USB.  

### Debug Chrome on Mobile (Android)
See the official chrome documentation [here ⇡](https://developer.chrome.com/docs/devtools/remote-debugging/)
- [Activate Developer Mode ⇡](https://developer.android.com/studio/debug/dev-options)
- Connect your phone to your computer via USB
- Open this url in your browser ``chrome://inspect/#devices``
- On your mobile device allow the USB connection to your computer
- On your computer in chrome you should see a list of open tabs after a while (on ``chrome://inspect/#devices``)
- Click ``Inspect`` on the tab you want to debug
