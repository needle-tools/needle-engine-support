---
title: Needle Engine for Blender
editLink: false
---

# Needle Engine Exporter for Blender — *Pre Alpha*

Thanks for participating in our pre-alpha tester phase. Please read the following docs carefully.   

## Preface

The current state of the exporter for Blender is early which means many features you may know from Needle Engine Exporter for Unity are not yet implemented. Your feedback is invaluable when it comes to deciding which of those features should be prioritizes. If you have feedback for us please let us know in [discussions](https://github.com/needle-tools/needle-engine-support/discussions)! If you find bugs or see errors please [open an issue](https://github.com/needle-tools/needle-engine-support/issues). Thank you!

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

## Animation 🏇

For simple usecases you can use the Animation component for playback of one or multiple animationclips.  
Just select your object, add an Animation component and assign the clip (you can add additional clips to be exported to the clips array.  
By default it will only playback the first clip assigned when `playAutomatically` is enabled. You can trigger the other clips using a simple custom typescript component)  
<video-embed limit_height src="/docs/blender/animation.mp4" />   

### AnimatorController
The animator controller can be created for more complex scenarios. It works as a statemachine which allows you to create multiple animation states in a graph and configure conditions and interpolation settings for transitioning between those. 

#### Creating an AnimatorController

The AnimatorController editor can be opened using the EditorType dropdown in the topleft corner of each panel:

![AnimatorController open window](/blender/animatorcontroller-open.webp)

<video-embed limit_height max_height="188px" src="/docs/blender/animatorcontroller-create.mp4" /> 
*Creating a new animator-controller asset ☝ or select one from your previously created assets*  

##### Graph overview  
![AnimatorController overview](/blender/animatorcontroller-overview.webp)
1) Use `Shift+A` to create a new AnimatorState
2) The `Parameters` node will be created once you add a first node. Select it to setup parameters to be used in transitions (via the Node panel on the right border)
3) This is an AnimatorState. the orange state is the start state (it can be changed using the `Set default state` button in the Node/Properties panel)
4) The Properties for an AnimatorState can be used to setup one or multiple transitions to other states. Use the `Conditions` array to select parameters that must match the condition for doing the transition.

#### Using an AnimatorController

To use an AnimatorController add an Animator component to the root object of your animations and select the AnimatorController asset that you want to use for this object.

![AnimatorController assign to animator](/blender/animatorcontroller-assigning.webp)  

You can set the Animator parameters from typescript or by e.g. using the event of a Button component:

## Interactivity 😎

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


## Lightmapping 💡

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



## Updating

The lightbulb in the Needle Project panel informs you when a new version of the addon is available.  
Simply click the icon to download the new version.    
![Update notification](/blender/updates.webp)
