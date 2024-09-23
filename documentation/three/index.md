<br/>
<img src="/imgs/threejs-logo.webp" style="max-height:70px;" />

# Needle Engine for three.js

Since Needle Engine uses [three.js](https://threejs.org/) as scene graph and rendering library, all functionality from three.js is available in Needle as well and can be used from component scripts. We're using a fork of three.js that includes additional features and improvements, especially in relation to WebXR, Animation, and USDZ export.

## npm Installation

You can work directly with Needle Engine without using any Integration. Needle Engine uses [three.js](https://threejs.org/) as scene graph and rendering library, so all functionality from three.js is available in Needle as well.  

You can install Needle Engine from `npm` by running:   
<br/>
`npm i @needle-tools/engine`  

## Rapid Prototyping on StackBlitz

For quick experiments, we provide a convenient link to create a new project ready to start, powered by [StackBlitz](https://stackblitz.com/):   
[engine.needle.tools/new](https://engine.needle.tools/new)


## CDN Usage

If you're not using npm or a bundler, you can instead add a prebundled version of Needle Engine to your website: 

`https://unpkg.com/@needle-tools/engine/dist/needle-engine.min.js` or  
`https://unpkg.com/@needle-tools/engine/dist/needle-engine.light.min.js` *(no physics module, smaller)*