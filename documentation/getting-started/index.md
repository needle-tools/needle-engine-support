---
lang: en-US
title: Getting Started & Installation
next: ../project-structure.md
---
After following the steps below you will have a fully functional project ready for the web. 


## Prerequisites
Below each tool, you find quick links to download the latest version at the time of writing.  

### Install these tools for development

| Tool |  |  |
| -- | -- | -- | 
| Node.js (required) | 16.x or 18.x <br>[Windows](https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi) <br/> [MacOS](https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg)   | For running a local development server
| VS Code | any version<br/>[Windows](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user) <br/> [MacOS](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal) | For code editing (optional)  |
| **Supported Editors** | |
| Unity | 2020.3.16+ <br/>2021.3+ <br/>2022.2+<br/>[Get Unity Hub](https://unity.com/download) | For setting up your scenes, components, animations... |
| Blender | 3.3<br/>3.4<br/>3.5<br/>[Get Blender](https://www.blender.org/download/) | For setting up your scenes, components, animations... |
  

  
### Install these tools for production builds  

| Tool | | |
| -- | -- | -- |
| | | |
| **toktx** | 4.1<br/>[Windows](https://fwd.needle.tools/needle-engine/toktx/win) <br/> [MacOS](https://fwd.needle.tools/needle-engine/toktx/osx) <br/> [Mac OS Apple Silicon](https://fwd.needle.tools/needle-engine/toktx/osx-silicon) <br/> [Other Releases](https://github.com/KhronosGroup/KTX-Software/releases/tag/v4.1.0-rc3)  | For texture compression (recommended) <br/>You can read more about that [here](./deployment.md#production-builds) in our docs


After installing the tools above, you might have to restart your machine  
so that all environment variables are properly updated.  


<br/>
<br/>

## Needle Engine without Editor

If you just want to work with the Needle Engine runtime and don't want to use any Editor integration just yet then go ahead and install it from npm by running:   
<br/>
`npm i @needle-tools/engine`  


To quickly test Needle Engine in the browser use [engine.needle.tools/new](https://engine.needle.tools/new)   
*It creates a new project on StackBlitz*


<br/>
<br/>

## Needle Engine with Unity 


:::details Video: Starting from a fresh Unity project  
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />  

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />
:::

### Step 1 • **Make sure node.js and Unity are installed**

### Step 2 • **Create a new Unity project**  

Open Unity Hub and create a new project. 2021.3 recommended!  
Make sure to switch it to Linear color space in *Project Settings / Player*.
  
### Step 3 • **Install the Unity Integration** 
<br/>

<needle-button href="https://engine.needle.tools/downloads/unity"><strong>Download Needle Engine for Unity</strong></needle-button> [Alternative](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)   

Our installer is a .unitypackage that will set everything up for you.  
  
Drop the downloaded .unitypackage file into a Unity project (or double click to open) and confirm that you want to import it.  
This will set up our Needle Engine Unity integration - wait for the installation and import to finish.  

If the Installation has finished you seems not installed yet click _Assets > Refresh_ once or focus another app and then focus Unity again.  

A window may open stating that "A new scoped registry is now available in the Package Manager.". This is our Needle Package registry where packages are downloaded from. You can safely close that window and continue with the next step below.  

### Step 4 •  **Create a new scene from a template**  
Select _File > New Scene_ and choose from one of the Needle templates.  
We recommend the [Collab Sandbox](https://needle-tiny-starter.glitch.me/) template which is a great way to get started with interactivity, multiplayer,and adding assets.  

---

::::details Create a new scene from a Scene Template

We provide a number of Scene Templates for quickly starting new projects.  
These allow you to go from idea to prototype in a few clicks.  

1. Click on `File > New Scene`
2. Select one of the templates with (needle) in their name and click `Create`.
3. Click Play to install and startup your new web project.

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)

::::

::::details Create a new scene from scratch

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

::::


<br/>
<br/>



## Needle Engine with Blender

### Step 1 • **Make sure node.js and Blender 3.3, 3.4 or 3.5 are installed**

### Step 2 • Download and Install our Addon for Blender
<br/> 
<needle-button href="https://engine.needle.tools/downloads/blender"><strong>Download Needle Engine for Blender</strong></needle-button>

The Blender addon is downloaded as a zip file. In Blender go to _File / Settings / Add-ons_ and click the `Install` button. Then select the downloaded zip to install it.

### Step 3 • Read [Needle Engine for Blender Alpha](../blender/index.md) 

<br/>
<br/>
<br/>


## Questions?
  
::: details The local website shows a warning: website not secure
You might see a warning in your browser about SSL Security depending on your local configuration.  
This is because while the connection is encrypted, by default there's no SSL certificate that the browser can validate.  
If that happens: click ``Advanced`` and ``Proceed to Site``. Now you should see your scene in the browser!  
:::

::: details Something is not working as expected? Where can I see logs?    
Keep an eye for console warnings! We log useful details about recommended project settings and so on. For example, your project should be set to Linear color space (not Gamma), and we'll log an error to the Unity console if that's not the case.  
:::

Please also have a look at [our FAQ](../faq.md) if your question is not answered here.

<!--
## Option 1: Quick Start — Starter Project ⚡
1. **Download or Clone this repository**  
   It's set up with the right packages and settings to get you started right away.  

   _Clone with HTTPS:_ ``https://github.com/needle-tools/needle-engine-support.git``  
   _OR clone with SSH:_ ``git@github.com:needle-tools/needle-engine-support.git``  
   _OR download directly:_ <a href="https://github.com/needle-tools/needle-engine-support/archive/refs/heads/main.zip" target="_blank">Download Repository</a>
   
  
2. **Open the starter project**  
  Open `starter/Needle Engine Starter 2020_3` for a full sandbox project that's ready to run (including a couple of simple example scenes for lightmaps and custom shaders).  
  This is a sandbox builder project! It already comes with multi-player capabilities, and works across mobile, desktop, VR and AR.  

3. **Press Play**  
  Make sure the scene CollaborativeSandbox is open, and press Play! This will automatically do some setup steps and start a local server.  
  Once the setup is complete, a browser window will open, and your project is live.  
  From now on, all changes you do in Unity will be immediately visible in your browser.  

    > **Note**: Your browser might warn you about an untrusted SSL connection. Don't worry, the connection is still encrypted – please click "Advance" if your browser asks you to verify that you're sure you want to visit your server.  

4. **Make it your own**  
  Add assets and components, play around with lighting, add scripts and logic – this is your world now!  
  You can also [publish it on the web for free](#deploy-your-project-to-glitch-) so that others can join you.  
-->

## What's next?

- [Exporting 3D objects and content](../export.md)
- [Project Structure](../project-structure.md)
- [Deploy your website to the web](../deployment)
- [Typescript Essentials](./typescript-essentials.md) 
- [Needle Engine for Unity Developers](./for-unity-developers.md) 
- [Scripting Reference](../scripting.md) 

In case you need more troubleshooting help, please see the [Questions and Answers](../faq.md) section.  
You can also join our [Discord Community](https://discord.needle.tools)
