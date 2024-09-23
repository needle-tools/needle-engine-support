---
lang: en-US
title: Getting Started & Installation
next: ../project-structure.md
---

<br/>

# Downloads

With **Needle Engine**, you can create fully interactive 3D websites.
They can be deployed anywhere on the web and get optimized automatically by the **Needle Engine Build Pipeline**.  

## Needle Integrations

Needle Engine is available as a download for Unity, for Blender, and for web projects without an editor integration.  

| Unity | Blender | three.js | Custom Integrations |
| --- | --- | --- | --- |
| 2021.3, 2022.3, 6.0 | 4.0, 4.1, 4.2+ | r162 | Integrating with other tools |
| <img src="/imgs/unity-logo.webp" style="max-height:70px;" /> | <img src="/blender/logo.png" style="max-height:70px;" /> | <img src="/imgs/threejs-logo.webp" style="max-height:70px;" /> |  | 
| <needle-button event_goal="download_unity" event_position="getting_started" large href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started" next_url="./../unity/"><strong>Download</strong> for&nbsp;Unity</needle-button> | <needle-button event_goal="download_blender" event_position="getting_started" large href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"><strong>Download</strong> for&nbsp;Blender</needle-button> | <needle-button event_goal="download_threejs" event_position="getting_started" large href="https://engine.needle.tools/downloads/threejs?utm_source=needle_docs&utm_content=getting_started"><strong>Get Started</strong></needle-button> | <needle-button event_goal="download_custom" event_position="getting_started" large href="https://engine.needle.tools/downloads/custom?utm_source=needle_docs&utm_content=getting_started"><strong>Learn More</strong></needle-button> |
| [Get started with Needle and Unity](../unity/index.md) | [Get started with Needle and Blender](../blender/index.md) | [Get started with Needle and three.js](../threejs/index.md) | [Learn more about Custom Integrations](../custom/index.md) |

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



<!--
<img src="/imgs/unity-logo.webp" style="max-height:70px;" />


## Needle Engine for Unity 

*Supported Unity versions: 2021.3 LTS, 2022.3 LTS*

<needle-button event_goal="download_unity" event_position="getting_started" large href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"><strong>Download Needle Engine for Unity</strong></needle-button> 

- Drop the downloaded .unitypackage file into a Unity project and confirm that you want to import it.
- Wait a moment for the installation and import to finish. A window may open stating that "A new scoped registry is now available in the Package Manager.". This is our Needle Package registry. You can safely close that window.  
- **Explore Samples** – Select the menu option _Needle Engine > Explore Samples_ to view, open and modify all available [sample scenes](https://engine.needle.tools/samples).  


**See [Needle Engine for Unity](../unity/index.md)** for a full list of features and instructions on getting started.


---


<img src="/blender/logo.png" style="max-height:70px;" />

## Needle Engine for Blender 
*Supported Blender versions: 4.0+*

<needle-button event_goal="download_blender" event_position="getting_started" large href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"><strong>Download Needle Engine for Blender</strong></needle-button>  
 
<br/> 

- The Blender add-on is downloaded as a zip file.
- In Blender, go to `File > Settings > Add-ons` and click the `Install` button.
- Then select the downloaded zip to install it.

**See [Needle Engine for Blender](../blender/index.md)** for a full list of features and instructions on getting started.

<br/>
<br/>
<br/>



<br/>
<br/>
<br/>

-->

## Code Editor and Tools

### Install a code editor

Needle Engine makes it easy to build web apps. That often, but not always, includes coding with JavaScript/TypeScript or writing HTML and CSS to describe user interfacces. We recommend [Visual Studio Code](https://code.visualstudio.com) for creating and editing these files. It's a free, open-source code editor that runs on Windows, macOS, and Linux.

<ClientOnly>
<!-- <br/><os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Unity</os-link> — <os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Blender</os-link> -->

<os-link windows_url="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" osx_url="https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal">Download Visual Studio Code</os-link>


<br/>
<br/>

### Other useful tools

::: tip
Needle Engine uses the following tools to create your web app, but you don't need to manually install them when using the Unity or Blender integration. We'll guide you through the installation process after you've installed the Needle integration.
:::

<br/>
<os-link windows_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi" osx_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0.pkg">Node.js 18 LTS or 20 LTS.</os-link>
Needle Engine uses Node.js to manage, preview and build the web app that you are creating locally on your computer.     
It is also used for uploading (deploying) your website to the internet.

<br/><os-link windows_url="https://fwd.needle.tools/needle-engine/toktx/win" osx_url="https://fwd.needle.tools/needle-engine/toktx/osx" osx_silicon_url="https://fwd.needle.tools/needle-engine/toktx/osx-silicon">KTX Software – toktx texture tools.</os-link> We use toktx by the Khronos Group to locally optimize and compress your 3D files. Learn more about production builds [in the docs](../deployment.md#production-builds).

<br/>
</ClientOnly>

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



## Next Steps

Now that you've installed Needle Engine, you're ready to dive deeper into project creation, component workflows, scripting, deployment and more. 

- [Needle Engine Samples](https://engine.needle.tools/samples)
- [Exporting 3D objects and content](../export.md)
- [Project Structure](../project-structure.md)
- [Deploy your website to the web](../deployment.html)
- [Typescript Essentials](./typescript-essentials.md) 
- [Needle Engine for Unity Developers](./for-unity-developers.md) 
- [Scripting Reference](../scripting.md) 

In case you need troubleshooting help, please see the [Questions and Answers – FAQ](../faq.md) section.  
We welcome you to join our [Forum](https://forum.needle.tools) and [Discord Community](https://discord.needle.tools).

