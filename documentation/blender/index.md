---
title: Needle Engine for Blender
editLink: false
---

# Needle Engine Exporter for Blender — *Pre Alpha*

Thanks for participating in our pre-alpha tester phase. Please read the following docs carefully.   

## Preface

The current state of the exporter for Blender is early which means many features you may know from Needle Engine Exporter for Unity are not yet implemented. Your feedback is invaluable when it comes to deciding which of those features should be prioritizes. If you have feedback for us please let us know in [discussions](https://github.com/needle-tools/needle-engine-for-blender-alpha/discussions)! If you find bugs or see errors please [open an issue](https://github.com/needle-tools/needle-engine-for-blender-alpha/issues). Thank you!

> **Note**: At this early stage we support windows only. Versions for OSX and Linux will follow later

## Download and Installation 💿

1) [Download the latest version](https://engine.needle.tools/downloads/blender) of Needle Engine Exporter for Blender
2) Install the addon (see the [Blender documentation](https://docs.blender.org/manual/en/latest/editors/preferences/addons.html#installing-add-ons))
3) Make sure you have [Node.js and npm](https://fwd.needle.tools/needle-engine/docs/prerequisites) installed


## Getting Started 🚩

All options for generating a web project, starting the local server, building for deployment and making your scene interactive can be found in the Object Properties tab: 

 ![Object panels](/blender/object-panels.webp)

First create or open a new blend file that you want to run in the web.  
Save the file on disc to be able to generate a web project. After saving you can click `Start Server` to generate a project next to your blend file. It will automatically install and start the server - once it has finished your browser should open and the threejs scene will load.
 
 ![Object panels](/blender/project-panel.webp)

By default your scene will automatically re-exported when you save the blend file.

## Interactivity

You can add or remove components to objects in your hierarchy using the Needle Components panel:

![Component panel](/blender/components-panel.webp)  
*For example by adding an `OrbitControls` component to the camera object*  
*you get basic camera controls for mobile and desktop devices*
*Adjust settings for each component in their respective panels*

Components can be removed using the X button in the lower right:

![Remove component](/blender/remove-component.webp)

### Custom Components
Custom components can also be easily added by simply writing Typescript classes. They will automatically compile and show up in Blender when saved.  

To create custom components open the workspace via the Needle Project panel and add a `.ts` script file in `src/scripts` inside your web project. Please refer to the [scripting documentation](http://docs.needle.tools/scripting) to learn how to write custom components for Needle Engine.


## Lightmapping

Needle Lightmapping will automatically generate lightmap UVs for all models marked to be lightmapped. For lightmapping to work you need at least one light and one object with `Lightmapped` turned on.

::: danger Please keep in mind:
You are using an early preview of these features - we recommend creating a backup of your blend file when using Lightmapping at this point in time. Please report problems or errors you encounter in [our discord](https://discord.needle.tools) 🙏
::: 

Use the Needle Object panel to enable lightmapping for a mesh object or light: 

![Ligthmapping object](/blender/lightmapping-object.webp)

For quick access to lightmap settings and baking options you can use the scene view panel in the `Needle` tab:

![Ligthmapping scene panel](/blender/lightmapping-scene-panel.webp)
 
Alternatively you can also use the Lightmapping panel in the `Render Properties` tab:   

![Ligthmapping object](/blender/lightmapping-panel.webp)
