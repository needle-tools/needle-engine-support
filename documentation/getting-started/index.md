---
lang: en-US
title: Getting Started & Installation
next: ../project-structure.md
---

## Prerequisites
Before getting started we recommend you install Nodejs (if you don't have it already)   

<ClientOnly>

<!-- <br/><os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Unity</os-link> — <os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Blender</os-link> -->

<br/><os-link windows_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi" osx_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0.pkg">Download Nodejs ⭐</os-link>   
Node.js is used to preview and build the website that you are creating on your computer.   
It is also used for uploading (deploy) your website when you are finished and when you want to share it.
<br/>
<br/>

---
### The following tools are optional - *but recommended*

<br/><os-link windows_url="https://fwd.needle.tools/needle-engine/toktx/win" osx_url="https://fwd.needle.tools/needle-engine/toktx/osx" osx_silicon_url="https://fwd.needle.tools/needle-engine/toktx/osx-silicon">Download Toktx 🗜</os-link>   
We use Toktx in production builds (optimized builds) for texture compression (KTX2). You can read more about production builds [here](../deployment.md#production-builds) in our docs

<br/><os-link windows_url="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" osx_url="https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal">Download VSCode 📑</os-link>   
When you plan to edit or write code (js or HTML) then we *recommend* that you use VSCode as your code editor.


<br/>
</ClientOnly>


<br/>
<br/>
After having installed the tools listed above you might have to restart your machine once!  

Then continue below at [Needle Engine for Unity](#needle-engine-with-unity) or [Needle Engine for Blender](#needle-engine-with-blender)

<br/>
<br/>

<!-- | Tool |  |  |
| -- | -- | -- | 
| Node.js **(required)** | 16.x or 18.x <br>[Windows](https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi) <br/> [MacOS](https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg)   | For running a local development server
| VS Code *(recommended)* | any version<br/>[Windows](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user) <br/> [MacOS](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal) | For code editing (optional)  |
| **Supported Editors** | |
| Unity | 2020.3.16+ <br/>2021.3.9+ <br/>2022.3.0+<br/>[Get Unity Hub](https://unity.com/download) | For setting up your scenes, components, animations... |
| Blender | 3.3<br/>3.4<br/>3.5<br/>3.6<br/>[Get Blender](https://www.blender.org/download/) | For setting up your scenes, components, animations... |
   -->

  
<!-- ### For optimized builds 

| Tool | | |
| -- | -- | -- |
| | | |
| **toktx** | 4.1<br/>[Windows](https://fwd.needle.tools/needle-engine/toktx/win) <br/> [MacOS](https://fwd.needle.tools/needle-engine/toktx/osx) <br/> [Mac OS Apple Silicon](https://fwd.needle.tools/needle-engine/toktx/osx-silicon) <br/> [Other Releases](https://github.com/KhronosGroup/KTX-Software/releases/tag/v4.1.0-rc3)  | For texture compression (recommended) <br/>You can read more about that [here](./deployment.md#production-builds) in our docs -->



<br/>
<br/>

<img src="/imgs/unity-logo.webp" style="max-height:70px;" />

## Needle Engine with Unity 

*We support Unity 2021 and 2022 LTS*

<needle-button large href="https://engine.needle.tools/downloads/unity"><strong>Download Needle Engine for Unity</strong></needle-button> 
<!-- [Mirror](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)    -->
    
- Drop the downloaded .unitypackage file into a Unity project (or double click to open) and confirm that you want to import it.
- Wait for the installation and import to finish.  
- A window may open stating that "A new scoped registry is now available in the Package Manager.". This is our Needle Package registry where packages are downloaded from. You can safely close that window and continue with the next step below.  

- Continue....
  - **Option 1: Explore Samples**  
  Select _Needle Engine > Explore Samples_ to view, open and modify all available [sample scenes](https://engine.needle.tools/samples).  


  - **Option 2: Create a new scene from a template**  
  Select _File > New Scene_ and choose from one of the Needle templates.  
  We recommend the [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox) template which is a great way to get started with interactivity, multiplayer,and adding assets.  


:::details Video: Starting from a fresh Unity project  
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />  

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />
:::

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
<br/>



<img src="/blender/logo.png" style="max-height:70px;" />

## Needle Engine with Blender 
*We support Blender 3.6 and Blender 4.0*

<needle-button large href="https://engine.needle.tools/downloads/blender"><strong>Download Needle Engine for Blender</strong></needle-button>  
 

*With Needle Engine for Blender you can build fully interactive 3D websites running on three.js.   
They can easily deployed to the web and get optimized automatically by the Needle Engine Build Pipeline (needs Node.js installed)*
<br/> 

- The Blender addon is downloaded as a zip file.
- In Blender go to `File / Settings / Add-ons` and click the `Install` button.
- Then select the downloaded zip to install it.

**Continue reading [Needle Engine for Blender](../blender/index.md)** for a full feature list and instructions

<br/>
<br/>
<br/>



<img src="/imgs/threejs-logo.webp" style="max-height:70px;" />

## Needle Engine without Editor

Needle Engine is built ontop of three.js. If you just want to work with the Needle Engine runtime and don't want to use any Editor integration just yet then go ahead and install it from npm by running:   
<br/>
`npm i @needle-tools/engine`  


To quickly test Needle Engine in the browser use [engine.needle.tools/new](https://engine.needle.tools/new)   
*It creates a new project on StackBlitz*

Alternatively you can add a prebundled version of Needle Engine to your website: 

`https://unpkg.com/@needle-tools/engine/dist/needle-engine.min.js`  
`https://unpkg.com/@needle-tools/engine/dist/needle-engine.light.min.js` *no physics module*


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
You can also join our [Discord Community](https://discord.needle.tools) or [Forum](https://forum.needle.tools)
