<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <!-- <img src="/imgs/logo-webcomponents.png" style="max-height:70px;" title="Web Components Logo" alt="Web Components Logo"/> + -->
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="three.js Logo" alt="three.js Logo"/>
</div>

# Needle Engine is three.js

Needle Engine is built on top of [three.js](https://threejs.org/) and provides a component-based architecture for creating interactive 3D web experiences. **All three.js APIs remain fully accessible** – you can write vanilla three.js code, use any three.js-compatible library, or mix and match as needed.

The key benefits of using Needle Engine over vanilla three.js include:
- **Component system** for organizing and reusing 3D logic
- **Built-in features** like physics, XR, networking, and particles
- **Editor integrations** with Unity and Blender for visual scene creation
- **Optimized build pipeline** with automatic 3D asset optimization
- **Faster development** with less boilerplate

Whether you're building a simple scene with pure three.js or a complex application with Needle's components, you have complete flexibility. The component system is an enhancement, not a replacement – use what makes sense for your project.

**On this page**, you'll learn how to use Needle Engine with vanilla JavaScript and HTML – perfect for integrating 3D into existing web projects or building from scratch without a 3D editor.

**Want visual editing?** Check out our editor integrations:
- [Unity Integration](/unity/index.md) – Full-featured 3D editor with C# scripting support
- [Blender Integration](/blender/index.md) – Open-source 3D creation suite with Python scripting

:::tip Inspect and debug with Needle Inspector
Use the [Needle Inspector](./needle-devtools-for-threejs-chrome-extension.md) Chrome extension to inspect, debug, and edit any three.js scene directly in your browser – perfect for development and learning from other developers' work.
:::


# \<needle-engine> web component

Needle Engine provides an easy-to-use web component that can be used to display rich, interactive 3D scenes directly in HTML with just a few lines of code.

### Quick Start

<codewrap>

```html
<!-- Import the component -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
 
<!-- Use it like any other HTML element -->
 <needle-engine src="https://cloud.needle.tools/-/assets/Z23hmXBZ21QnG-Z21QnG-world/file" background-color="transparent"></needle-engine>
 ```

 </codewrap>

<!-- Here is a full example:

@[code html](@code/basic-webcomponent.html) -->

<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%; 
    aspect-ratio: 16/9; 
    outline: none; 
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>

[Open this example on Stackblitz](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)


[View needle-engine attributes](/reference/needle-engine-attributes.md)

:::tip Scripting support
Once you outgrow the [configuration options of the web component](/reference/needle-engine-attributes.md), you can extend it with custom scripts and components, and full programmatic scene graph access.
:::


:::tip Use the integrations!
For complex 3D scenes and visual editing, we recommend using Needle Engine with one of our Editor integrations. They provide a powerful creation workflow and an state-of-the-art build pipeline with 3D optimizations.
:::


## Install from CDN

While our default template uses [vite](https://vitejs.dev), Needle Engine can also be used directly with vanilla Javascript – without using any bundler.  

You can add a complete, prebundled version of Needle Engine to your website with just a line of code.
This includes our core components, physics, particles, networking, XR, and more. Use this if you're not sure!


<codewrap>

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js">
</script>
```

</codewrap>

## Install from NPM

You can work directly with Needle Engine without using any Integration. Needle Engine uses three.js as scene graph and rendering library, so all functionality from three.js is available in Needle as well.  

You can install Needle Engine from NPM by running:   
<br/>
`npm i @needle-tools/engine`  


Many examples can be found on [StackBlitz](https://stackblitz.com/@marwie/collections/needle-engine).  


## Local Development with VS Code

If you want to work with Needle Engine without any integration, then you'll likely want to run a local server for your website. Here's how you can do that with Visual Studio Code:

1. Open the folder with your HTML file in Visual Studio Code.
2. Install the [LiveServer extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).  
3. Start live-server (there's a button "Go Live" in the footer of VSCode) 
4. Open ``http://localhost:5500`` in your web browser, if it doesn't open automatically.


## three.js and Needle Engine

Since Needle Engine uses [three.js](https://threejs.org/) as scene graph and rendering library, all functionality from three.js is available in Needle as well and can be used from component scripts. We're using a fork of three.js that includes additional features and improvements, especially in relation to WebXR, Animation, and USDZ export.


::: tip
Make sure to update the ``<needle-engine src="myScene.glb">`` path to an existing glb file 
or [download this sample glb](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb) and put it in the same folder as the index.html, name it ``myScene.glb`` or update the src path.
:::

@[code](@code/basic-html.html) 


[View on github](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla) - [View on Stackblitz](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)



### Rapid Prototyping on StackBlitz

For quick experiments, we provide a convenient link to create a new project ready to start: [engine.needle.tools/new](https://engine.needle.tools/new)  
A large collection of examples are also available in our [Needle Engine Stackblitz Collection](https://stackblitz.com/@marwie/collections/needle-engine) 



# Next Steps

- [Learn more about the web component attributes](/reference/needle-engine-attributes.md)
- [Learn how to extend Needle Engine with custom scripts and components](/scripting.md)
- [Use Needle DevTools for three.js to inspect and debug your scenes](./needle-devtools-for-threejs-chrome-extension.md)


:::tip Using Needle with Unity or Blender
Did you know that Needle Engine seamlessly integrates in Blender and Unity? This allows you to create complex 3D scenes visually and export them directly to the web with Needle Engine. Check out our [Unity integration](/unity/index.md) and [Blender integration](/blender/index.md) for more information.
:::
