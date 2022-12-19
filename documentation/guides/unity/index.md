---
lang: en-US
title: Installation and Setup
next: creating-a-project.md
---


# Getting started 🎈

These steps will get you started with **Needle Engine for Unity**.  
After following them, you'll have a fully functional project.  
From here, you can dive deeper into [Scripting](../../scripting.md), [VR and AR](../../xr.md), [Networking](../../networking.md), or the various [Samples and Modules](../../samples-and-modules.md).  

You can either watch our Getting Started video or continue reading below 😊  
<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />

## Option 1: Automatic Setup ⚡

1. **Make sure node.js and Unity are installed - [see details](../)**  

2. **Create a new Unity project**  
  Open Unity Hub and create a new project. 2021.3 recommended!  
  Make sure to switch it to Linear color space in `Project Settings > Player`.
  
1. **Download our installer**  
    <needle-button href="https://engine.needle.tools/downloads/unity"><strong>Download Needle Engine for Unity</strong></needle-button>  • [Alternative](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)   

    *Our installer is a `.unitypackage` that will set everything up for you.*  
  
1. **Install by dropping into Unity**   
   Drop the downloaded `.unitypackage` file into a Unity project and confirm that you want to import it.  
   This will set up Needle Engine and Needle Exporter for Unity.  

2. **Wait for the installation to finish**  
   You may have to click _Assets > Refresh_ once or focus another app and then focus Unity again.  
     > **Note**: A window may open stating that "A new scoped registry is now available in the Package Manager.". This is our Needle Package registry where packages are downloaded from. You can safely close that window.  

3. **Create a new scene from a template**  
   Select _File > New Scene_ and choose from one of the Needle templates.  
   We recommend the [Collab Sandbox](https://engine.needle.tools/samples/sandbox) template which is a great way to get started with interactivity, multiplayer, and adding assets.  

4. **Continue [here](./creating-a-project.md) to make it your own**  
   Learn how to create, test, build and publish your first project 

## Option 2: Manual Setup 🐢 

### Create a new Unity project

1. **Set up a new project**  
Create a new Unity project via the [Hub](https://docs.unity3d.com/hub/manual/index.html).  
We recommend 2021.3 LTS. Make sure to switch to Linear color space!  

2. **Add our registry to Package Manager**  
Open ``Edit/Project Settings`` and select ``Package Manager``.  
Add a new [scoped registry](https://docs.unity3d.com/Manual/upm-scoped.html):
    - Name: ``needle``
    - URL: ``https://packages.needle.tools``
    - Scope(s):   
      `com.needle`  
      `org.khronos`  
  ![image](https://user-images.githubusercontent.com/2693840/186287175-0de831b8-9112-43fa-989d-c13680186ff0.png)


3. **Add the Exporter package**  
Open the [Unity Package Manager](https://docs.unity3d.com/Manual/upm-ui.html) via ``Window/Package Manager``.  
In the dropdown in top left corner of the window select ``My Registries``.  
Select ``Needle Engine Exporter`` and click install in the bottom right corner.  

::: tip Note
You only need to install `Needle Engine Exporter` – other packages will automatically be installed as dependencies.  
:::

### Variant a - Create a new scene from a Scene Template

We provide a number of Scene Templates for quickly starting new projects.  
These allow you to go from idea to prototype in a few clicks.  

1. Click on `File > New Scene`
2. Select one of the templates with (needle) in their name and click `Create`.
3. **Continue [here](#generate-a-web-project-and-add-content)**.

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)

### Variant b - Create a new scene from scratch

If you don't want to start from a scene template, you can follow these steps.  
Effectively, we're going to recreate the "Minimal (Needle)" template that's shipping with the package.  

1. **Ceate a new empty scene**  

2. **Set up your scene for exporting**   
  Add an empty GameObject, name it "Exporter" and add an `ExportInfo` component to it.  
  In this component you create and quickly access your exported runtime project.  
  It also warns you if any of our packages and modules are outdated or not locally installed in your web project.  

::: tip Note
By default, the project name matches the name of your scene. If you want to change that, you can enter a ``Directory Name`` where you want to create your new runtime project. The path is relative to your Unity project.  
:::
 
3. **Choose a web project template**  
  Now, select a web project template for your project. The default template is based on [Vite](https://vitejs.dev/), a fast web app bundler.  

4. **Continue [here](./creating-a-project)**.

