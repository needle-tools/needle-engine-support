---
lang: en-US
title: Getting Started
next: deployment.md
---
After following the steps below you will have a fully functional project ready for the web. 


## Prerequisites 💿

::: details Install the tools that you need (nodejs, vscode, toktx) 

--- 
Below each tool, you find quick links to download the latest version at the time of writing.  

### Install these tools for development

  - **Node.js** (16.x or 18.x) – for running a local development server (required)   
  Download for [Windows 16.7](https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi) or [MacOS Universal](https://nodejs.org/dist/v16.17.0/node-v16.17.0.pkg)  

  ---
  
  <!--
  [**git**](https://git-scm.com/downloads) – for downloading packages from GitHub (required)  
  [Windows](https://git-scm.com/download/win) • [MacOS Universal](https://git-scm.com/download/mac)  
   -->
  
  - **VS Code** – for code editing (recommended)  
  Download for [Windows](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user) or [MacOS Universal](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal)    
  ---
  
  - Optional: **Unity** 2020.3.16+, 2021.3+ or 2022.2+ – for setting up your scene and components   

  
### Install these tools for production builds  
  ---

  - **toktx** 4.1 – for texture compression (recommended)   
  Download for [Windows x64](https://fwd.needle.tools/needle-engine/toktx/win) • [MacOS x64](https://fwd.needle.tools/needle-engine/toktx/osx) • [Mac OS with Apple Silicon](https://fwd.needle.tools/needle-engine/toktx/osx-silicon) • [Other](https://github.com/KhronosGroup/KTX-Software/releases/tag/v4.1.0-rc3)    
 
----

After installing the tools above, you might have to restart your machine  
so that all environment variables are properly updated.  


:::

## Unity Quick Start ⚡

:::details Video: Starting from a fresh Unity project  
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />  

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />
:::

### Step 1 • **Make sure node.js and Unity are installed**

### Step 2 • **Create a new Unity project**  

Open Unity Hub and create a new project. 2021.3 recommended!  
Make sure to switch it to Linear color space in *Project Settings / Player*.
  
### Step 3 • **Download our installer** 
<br/>

<needle-button href="https://engine.needle.tools/downloads/unity"><strong>Download Needle Engine for Unity</strong></needle-button> [Alternative](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)   

Our installer is a .unitypackage that will set everything up for you.  
  
### Step 4 • **Install by dropping into Unity**   
   Drop the downloaded .unitypackage file into a Unity project and confirm that you want to import it.  
   This will set up Needle Engine and Needle Exporter for Unity.  

**Wait for the installation to finish**  
   You may have to click _Assets > Refresh_ once or focus another app and then focus Unity again.  

> **Note**: A window may open stating that "A new scoped registry is now available in the Package Manager.". This is our Needle Package registry where packages are downloaded from. You can safely close that window.  

### Step 5 •  **Create a new scene from a template**  
   Select _File > New Scene_ and choose from one of the Needle templates.  
   We recommend the [Collab Sandbox](https://needle-tiny-starter.glitch.me/) template which is a great way to get started with interactivity, multiplayer, and adding assets.  

### Step 6 • **Continue [here](#generate-a-web-project-and-add-content) to make it your own.**  
   Learn how to iterate, test, build and publish your projects.  



## Create a new scene from a Scene Template (Unity)

We provide a number of Scene Templates for quickly starting new projects.  
These allow you to go from idea to prototype in a few clicks.  

1. Click on `File > New Scene`
2. Select one of the templates with (needle) in their name and click `Create`.
3. **Continue [here](#generate-a-web-project-and-add-content)**.

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)

## Create a new scene from scratch (Unity)

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

4. **Continue [here](#generate-a-web-project-and-add-content)**.

## Questions?
  
::: details The local website shows a warning: website not secure
You might see a warning in your browser about SSL Security depending on your local configuration.  
This is because while the connection is encrypted, by default there's no SSL certificate that the browser can validate.  
If that happens: click ``Advanced`` and ``Proceed to Site``. Now you should see your scene in the browser!  
:::

::: details Something is not working as expected? Where can I see logs?    
Keep an eye for console warnings! We log useful details about recommended project settings and so on. For example, your project should be set to Linear color space (not Gamma), and we'll log an error to the Unity console if that's not the case.  
:::


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

👉 Continue reading about [exporting 3D objects and content](./export.md), [scripting](./scripting.md) or learn about how to [deploy your website to the web](./deployment)!

In case you need more troubleshooting help, please see the [Questions and Answers](./faq.md) section.  
You can also join our [Discord Community](https://discord.needle.tools)!
