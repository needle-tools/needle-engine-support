---
title: Needle Engine for Unity
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
  <img src="/imgs/unity-logo.webp" style="max-height:70px;" />
</div>

# Needle Engine for Unity

## Install the Unity Package


<NoDownloadYet>
  <br/>
  <needle-button 
    event_goal="download_unity" 
    event_position="getting_started" 
    large 
    href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"
    same_tab
    next_url="/docs/unity/"
    >
    <strong>Download Needle Engine for Unity</strong>
  </needle-button> 
</NoDownloadYet>

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
  Add an empty GameObject, name it "Exporter" and add the `Needle Engine` component to it (formerly named `Export Info`).  
  In this component you create and quickly access your exported runtime project.  
  It also warns you if any of our packages and modules are outdated or not locally installed in your web project.  

    ::: tip Project Name and Scene Name
    By default, the project name matches the name of your scene. If you want to change that, you can pick or enter a ``Directory Name`` where you want to create your new web project. The path is relative to your Unity project.  
    :::
 
3. **Choose a web project template**
  Now, select a web project template for your project. The default template is based on [Vite](https://vitejs.dev/), a fast web app bundler.  
  <br/>
    ![Unity ExportInfo local templates](/imgs/unity-project-local-template.jpg)


4. Click Play to install and start your new web project


:::tip Define your own templates
If you find yourself creating many similar projects, you can create your own local or remote templates using the Project View context menu under `Create/Needle Engine/Project Template`. Templates can either be local on disk (a folder being copied) or remote repositories (a git repository being cloned).
:::

## Project Folders and Files


| Folder | |
| --- | --- |
| **Unity** | |
| `Assets` | This is where project specific/exclusive assets live. |
| `Packages` | This is where packages installed for this project live. A package can contain any asset type. The main difference is that it can be added to multiple Unity projects. It therefor is a great method to share code or assets. To learn more about packages see [the Unity documentation about packages](https://docs.unity3d.com/Manual/PackagesList.html).
| **Needle Engine Unity Package** | |
| ``Core/Runtime/Components`` | Contains all Needle Engine built-in components. Learn more about them in the [Components Reference](./../component-reference.md). |

-----

When creating a new web project in Unity, you can choose to create it from a local template (by default we ship a vite based web template). 

You can also reference remote templates by entering a repository URL in the ExportInfo project path (this can be saved with your scene for example). When creating a new web project the repository will be either cloned or downloaded (depending on if you have git installed) and searched for a `needle.config.json` file. If none can be found in the cloned repository the root directory will be used. Examples of remote template projects can be found on [github.com/needle-engine](https://github.com/needle-engine)

![Unity ExportInfo local templates](/imgs/unity-project-remote-template.jpg)

### Temporary Projects

If you're planning to only add custom files via NpmDefs and not change the project config (e.g. for a quick fullscreen test), you can prefix the project path with `Library`. The project will be generated in the Unity Project Library and does not need to be added to source control (the Library folder should be excluded from source control). We call these projects _temporary projects_. They're great for quickly testing out ideas!


## Typescript in Unity

**NPM Definition** are [npm packages](https://docs.npmjs.com/about-packages-and-modules) tightly integrated into the Unity Editor which makes it easily possible to share scripts with multiple web- or even Unity projects.    

C# component stubs for typescript files will also be automatically generated for scripts inside npmdef packages.

#### Creating and installing a npmdef
To create a *NPM Definition* right click in the Unity Project browser and select ``Create/NPM Definition``.   
You can **install a *NPM Definition* package** to your runtime project by e.g. selecting your ``Export Info`` component and adding it to the ``dependencies`` list (internally this will just add the underlying npm package to your package.json).

![image](https://user-images.githubusercontent.com/5083203/170374130-d0e32516-a1d4-4903-97c2-7ec9fa0b17d4.png)

Don't forget to install the newly added package by e.g. clicking Install on the ExportInfo component and also restart the server if it is already running

To edit the code inside a *NPM Definition* package just double click the asset *NPM Definition* asset in your project browser and it will open the vscode workspace that comes with each npmdef.

