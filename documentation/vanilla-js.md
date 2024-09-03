---
title: Using Needle Engine directly from HTML
---

# Using Needle Engine directly from HTML

While our default template uses [vite](https://vitejs.dev) as powerful bundler, Needle Engine can also be used directly with vanilla Javascript – without using any bundler.  

A basic sample can be [found here](https://engine.needle.tools/samples/vanillajs/).  
Many examples can be found on [StackBlitz](https://stackblitz.com/@marwie/collections/needle-engine).  

### How to run locally
- Install the [VSCode LiveServer extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).  
- Then open this index.html with the live-server and navigate to ``http://localhost:5500/index.html`` in your web browser.

::: tip
Make sure to update the ``<needle-engine src="myScene.glb">`` path to an existing glb file 
or [download this sample glb](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb) and put it in the same folder as the index.html, name it ``myScene.glb`` or update the src path.
:::

@[code](@code/basic-html.html) 


[View on github](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla)