---
title: Debugging Parameters & Options
---

# Debugging Parameters & Options

**Debug and inspect your Needle Engine projects** using built-in tools, browser DevTools, and the Needle Inspector.

:::tip Also See
- **[Local Development Help](/docs/how-to-guides/testing)** - Test on mobile devices, VR headsets, and set up certificates
- **[Help & Community](/docs/help/)** - Get support and ask questions
:::

---

## Needle Inspector — DevTools for three.js

The **Needle Inspector** is a powerful Chrome extension for inspecting and debugging three.js, react-three-fiber, and Needle Engine projects directly in your browser.

<actiongroup>
<action href="https://chromewebstore.google.com/detail/needle-inspector-%E2%80%94-devtoo/jonplpbnhmanoekkgcepnedhghflblmo">
Install Needle Inspector →
</action>
</actiongroup>

**Key features:**
- Real-time scene hierarchy inspection
- Edit properties and see changes instantly
- Performance monitoring (FPS, stats)
- AI-powered assistance with MCP integration
- Works on any three.js website

**[Learn more about the Needle Inspector →](/docs/three/needle-devtools-for-threejs-chrome-extension)**

---

## Useful resources for working with glTF

To inspect glTF or glb files online:
- [gltf.report](https://gltf.report/) - three.js based
- [modelviewer.dev/editor](https://modelviewer.dev/editor) - three.js based
- [Khronos glTF Sample Viewer](https://github.khronos.org/glTF-Sample-Viewer-Release/)
- [Babylon Sandbox](https://sandbox.babylonjs.com/)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)

To inspect them locally:
- use the [glTF Shell Extension for Windows](https://apps.microsoft.com/store/detail/gltf-shell-extensions/9NPGVJ9N57MV?hl=en-us&gl=US) to convert between glTF and glb
- use the [glTF Tools VS Code Extension](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode) to see validation errors and in-engine previews locally


## Built-in URL parameters

Debug Flags can be appended as URL query parameters.  
Use ``?help`` to get a list of ALL parameters available.  

Here are some of the most commonly used:

- ``help`` print all available url parameter in the console
- ``console`` opens an on-screen dev console, useful for mobile debugging
- ``printGltf`` logs loaded gltf files to the console
- ``stats`` shows FPS module and logs threejs renderer stats every few seconds
- ``showcolliders`` visualizes physics colliders
- ``gizmos`` enables gizmo rendering (e.g. when using BoxCollider or AxesHelper components)
- and a lot more: please use ``help`` to see them all


## Debug Methods

Needle Engine also has some very powerful and useful debugging methods that are part of the static `Gizmos` class. See the [scripting documentation](/docs/how-to-guides/scripting/create-components#gizmos) for more information.


## Local Testing of release builds
- First, install http-server: `npm install -g http-server`
- make a build (development or production)
- open the *dist* folder with a commandline tool
- run `http-server -g` | *`-g` enables gzip support*  
- optional: if you want to test WebXR, generate a [self-signed SSL certificate](https://stackoverflow.com/a/35231213), then run `http-server -g -S` to enable https (required for WebXR).



## VSCode

You can attach VSCode to the running local server to set breakpoints and debug your code. You can read more about [debugging with VSCode](https://code.visualstudio.com/docs/editor/debugging) here.    

Create a launch.json file at `.vscode/launch.json` in your web project with the following content:  
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Attach Chrome",
            "url": "https://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

If you have changed the port on which your server starts make sure to update the `url` field accordingly.  
You can then start your local server from within VSCode:  
  
![](/debugging/vscode-start-debugging.webp)

## Mobile Debugging

### <logo-header logo="/imgs/android-logo.webp" alt="Android">Android Debugging</logo-header>

For **Android** debugging, you can attach Chrome Dev Tools to your device and see logs right from your PC. You have to switch your device into development mode and connect it via USB.

See the official chrome documentation [here](https://developer.chrome.com/docs/devtools/remote-debugging/)
- Make sure [Developer Mode](https://developer.android.com/studio/debug/dev-options) is enabled on your phone
- Connect your phone to your computer via USB
- Open this url in your browser ``chrome://inspect/#devices``
- On your mobile device allow the USB connection to your computer
- On your computer in chrome you should see a list of open tabs after a while (on ``chrome://inspect/#devices``)
- Click ``Inspect`` on the tab you want to debug

### <logo-header logo="/imgs/ios-logo.webp" alt="iOS">iOS Debugging</logo-header>

For easy iOS debugging add the ``?console`` URL parameter to get a useful on-screen JavaScript console.

If you have a Mac, you can also attach to Safari (similar to the Android workflow above).

WebXR usage and debugging on iOS requires using a third-party browser: [Mozilla WebXR Viewer](https://labs.mozilla.org/projects/webxr-viewer/).

### <logo-header logo="/imgs/meta-logo.webp" alt="Meta Quest">Quest Debugging</logo-header>

Quest is just an Android device - see the [Android Debugging](#android-debugging) section for steps.

---

## Related Documentation

- **[Local Development Help](/docs/how-to-guides/testing)** - Testing on mobile devices, VR headsets, and certificate setup
- **[Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension)** - Chrome DevTools extension for three.js
- **[FAQ](/docs/reference/faq)** - Frequently asked questions and troubleshooting
- **[Help & Community](/docs/help/)** - Get support, ask questions, and connect with the community  
