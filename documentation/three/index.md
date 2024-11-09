<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <img src="/imgs/logo-webcomponents.png" style="max-height:70px;" title="Web Components Logo" alt="Web Components Logo"/> +
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="three.js Logo" alt="three.js Logo"/>
</div>

# Needle Engine as Web Component

Needle Engine provides an easy-to-use web component that can be used to display rich, interactive 3D scenes directly in HTML with just a few lines of code. It's the same web component that powers our integrations. 

Once you outgrow the configuration options of the web component, you can extend it with custom scripts and components, and full programmatic scene graph access.

:::tip Use the integrations!
For complex 3D scenes and fast iteration, we recommend using Needle Engine with one of our integrations. They provide a powerful creation workflow, including a live preview, hot reloading, and an advanced build pipeline with 3D optimizations.
:::

### Quick Start
:::: code-group
::: code-group-item index.html
@[code html](@code/basic-webcomponent.html)
:::
::: code-group-item Result
<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%; 
    aspect-ratio: 16/9; 
    outline: none; 
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>
:::
::::
[Open this example on Stackblitz](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)



## Install from npm

You can work directly with Needle Engine without using any Integration. Needle Engine uses [three.js](https://threejs.org/) as scene graph and rendering library, so all functionality from three.js is available in Needle as well.  

You can install Needle Engine from `npm` by running:   
<br/>
`npm i @needle-tools/engine`  

## Install needle-engine from a CDN

While our default template uses [vite](https://vitejs.dev), Needle Engine can also be used directly with vanilla Javascript – without using any bundler.  

You can add a complete, prebundled version of Needle Engine to your website with just a line of code.
This includes our core components, physics, particles, networking, XR, and more. Use this if you're not sure!

```js
<script type="module" 
    src="https://unpkg.com/@needle-tools/engine/dist/needle-engine.min.js">
</script>
```

If you know your project doesn't require physics features, you can also use a smaller version of Needle Engine, without the physics engine. This will reduce the total downloaded size. 
```js
<script type="module"
    src="https://unpkg.com/@needle-tools/engine/dist/needle-engine.light.min.js">
</script>
```


Many examples can be found on [StackBlitz](https://stackblitz.com/@marwie/collections/needle-engine).  

## Rapid Prototyping on StackBlitz

For quick experiments, we provide a convenient link to create a new project ready to start: [engine.needle.tools/new](https://engine.needle.tools/new)

## Rapid Prototyping on Glitch

::: warning Under construction
:::

## Local Development with VS Code

If you want to work with Needle Engine without any integration, then you'll likely want to run a local server for your website. Here's how you can do that with Visual Studio Code:

1. Open the folder with your HTML file in Visual Studio Code.
2. Install the [LiveServer extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).  
3. Activate live-server (there's a button "Go Live" in the footer of VSCode) 
4. Open ``http://localhost:5500/index.html`` in your web browser, if it doesn't open automatically.


## three.js and Needle Engine

Since Needle Engine uses [three.js](https://threejs.org/) as scene graph and rendering library, all functionality from three.js is available in Needle as well and can be used from component scripts. We're using a fork of three.js that includes additional features and improvements, especially in relation to WebXR, Animation, and USDZ export.


::: tip
Make sure to update the ``<needle-engine src="myScene.glb">`` path to an existing glb file 
or [download this sample glb](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb) and put it in the same folder as the index.html, name it ``myScene.glb`` or update the src path.
:::

@[code](@code/basic-html.html) 


[View on github](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla)
