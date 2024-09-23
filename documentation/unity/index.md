---
title: Needle Engine for Unity
editLink: true
---
<br/>
<img src="/imgs/unity-logo.webp" style="max-height:70px;" />

# Needle Engine for Unity

## Installation

<br/>
<needle-button event_goal="download_unity" event_position="getting_started" large href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"><strong>Download Needle Engine for Unity</strong></needle-button> 
<!-- [Mirror](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)    -->

1. **Drop the downloaded .unitypackage file** into a Unity project and confirm that you want to import it.

2. **Wait a moment** for the installation and import to finish. A window may open stating that "A new scoped registry is now available in the Package Manager.". This is our Needle Package registry. You can safely close that window.  
3. **Explore Samples**.  
  Select the menu option `Needle Engine > Explore Samples` to view, open and modify all available [sample scenes](https://engine.needle.tools/samples).  

## Quickstart Video Tutorial

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />

## Start from a Sample

There are 100+ samples that cover a wide range of topics, use cases, and industries.  
For a quick overview, take a look at our [Samples page](https://engine.needle.tools/samples/). 

All of these samples are available directly in Unity:
1. Go to `Needle Engine > Explore Samples` to browse for samples
2. Click "Install Samples" to install the samples package right inside your editor.
3. Choose any sample and click on `Open Scene`. 

:::tip The Samples are read-only – that makes them easy to update.
Our samples scenes are part of a UPM package in Unity. This means that you can't edit the assets and scripts in them directly – they are read-only. To edit an asset from the samples package, copy it into your project's `Assets` folder. To edit a script from the samples package, copy it into your web project's `src` folder.
::: 

## Start from a template

We provide a number of Scene Templates for quickly starting new projects.  
These allow you to go from idea to prototype in a few clicks.  

1. Click on `File > New Scene`

2. Select one of the templates with (needle) in their name and click `Create`.   
   We recommend the [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox) template which is a great way to get started with interactivity, multiplayer, and adding assets.  
3. Click Play to install and startup your new web project.

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)


## Start from scratch

If you don't want to start from a scene template, you can follow these steps.  
Effectively, we're going to recreate the "Minimal (Needle)" template that's shipping with the package.  

1. **Create a new empty scene**  

2. **Set up your scene for exporting**   
  Add an empty GameObject, name it "Exporter" and add an `ExportInfo` component to it.  
  In this component you create and quickly access your exported runtime project.  
  It also warns you if any of our packages and modules are outdated or not locally installed in your web project.  

::: tip Note
By default, the project name matches the name of your scene. If you want to change that, you can enter a ``Directory Name`` where you want to create your new runtime project. The path is relative to your Unity project.  
:::
 
3. **Choose a web project template**
  Now, select a web project template for your project. The default template is based on [Vite](https://vitejs.dev/), a fast web app bundler.  

4. Click Play to install and start your new web project

