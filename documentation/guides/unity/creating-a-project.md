---
lang: en-US
title: Creating your first web project
next: ../../deployment.md
---
## Generate a web project and add content

Needle Engine is a web-based runtime, and so there's always two projects: your Unity project and a web project that contains regular HTML and CSS. Needle Exporter brings these together into a fast, iterative workflow.  
Usually, one Unity Scene with `ExportInfo` has one web project, so we're going to generate one now.  

1. **Generate your web project**   
  On the `ExportInfo` component, click ``Generate Project``.   
  Wait a moment for the installation to finish — you can see a progress indicator in the bottom right corner of the editor.  

2. **View your project in a browser**
  After a few seconds of installation, your project should automatically run and a new browser window opens. 
  
::: tip Note
You might see a warning in your browser about SSL Security depending on your local configuration.  
This is because while the connection is encrypted, by default there's no SSL certificate that the browser can validate.  
If that happens: click ``Advanced`` and ``Proceed to Site``. Now you should see your scene in the browser!  
:::

::: tip Note    
Keep an eye for console warnings! We log useful details about recommended project settings and so on. For example, your project should be set to Linear color space (not Gamma), and we'll log an error if that's not the case.  
:::

⭐ **Congratulations!**  You just started your first project using Needle Engine! We're excited what you'll build.  

------------

3. **Add content**    
   1. Create a new empty GameObject
   1. Add a ``GltfObject`` component to it. This component marks parts of your hierarchy to be exported as glTF file. 
   1. Add an object (e.g. ``Create/3D Object/Cube``) as a child to the ``GltfObject`` hierarchy and save. 
   1. Your browser should refresh and your object is visible.

4. **Make it interactive**  
  Needle Engine comes with a set of [prebuilt components](../../component-reference.md) that you can use to easily make your scene interactive. One of those components is ``OrbitControls``, which we're going to use to make the camera interactive.
    1. Select your ``Main Camera`` GameObject
    1. Add a new ``OrbitControls`` component to it 
    1. Press play or save your scene
    1. Your browser should refresh and you can now move the camera around.

::: tip Note    
**The local server does not start / no website in your browser?**  
  Make sure you read and followed the [Prerequisites](../).  
  Also check the console and `ExportInfo` component for warnings or errors.   
  And last but not least, press `Play` to start the local server.  
:::
  

::: tip Note    
**No cube on your website?**   
  Make sure it's a child of your GltfObject root.  
:::