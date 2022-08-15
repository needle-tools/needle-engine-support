# Prerequisites 💿
- [nodejs ⇡](https://nodejs.org/en/) (required for development)
- [Unity 2020.3+ or 2022.2+⇡](https://unity3d.com/get-unity/download) (required for development)
- [vscode ⇡](https://code.visualstudio.com/) (recommended for development)

# Getting started 🛎

*Please follow the instructions in the Authentication section if this is your first time accessing packages by needle on this machine.*

## Authentication  

*Needs to be setup once per machine.*  

1) Clone this repository and open ``starter/Authenticate`` with Unity 2020.3.x
2) Open [https://packages.needle.tools ⇡](https://packages.needle.tools) in your browser and login (top right corner) with your github account. 
3) Return to [packages.needle.tools ⇡](https://packages.needle.tools) and click the ``i`` icon in the top right corner opening the ``Registry Info`` window.
4) Copy the line containing ``_authToken`` (see the video below)  
   <video src="https://user-images.githubusercontent.com/5083203/166433857-a0c9e29f-9413-4e10-a1a1-2029e3d3ab06.mp4" autoplay></video>
6) Focus Unity - a notification window should open that the information has been added successfully from your clipboard.
7) Click save and close Unity. You should now have access rights to the needle package registry.

## Quick Start — Starter Project ⚡
Clone this repository and open the project in ``starter/Unity_2020_3`` for a full project that's ready to run.

## Start from Scene Template 🌵

We provide a number of Scene Templates for quickly starting new projects. This allows you to go from idea to prototype in a few clicks.

> You can also create your own templates using [``Create/Scene Template ⇡``](https://docs.unity3d.com/Manual/scene-templates.html)
 
## Slow Start — from Scratch 🐢

### Create a new project

Create a new Unity project. Currently we support 2020.3.x and 2022. We recommend you install the [Unity Hub ⇡](https://docs.unity3d.com/hub/manual/index.html) to manage your Editor installations.

Open ``Edit/Project Settings`` and select ``Package Manager``.  
Add a new [scoped registry ⇡](https://docs.unity3d.com/Manual/upm-scoped.html):
- Name: ``needle``
- URL: ``https://packages.needle.tools``
- Scope(s): ``[com.needle, org.khronos]``

Open the [Unity Package Manager ⇡](https://docs.unity3d.com/Manual/upm-ui.html) via ``Window/Package Manager``. In the dropdown in top left corner of the window select ``My Registries``. Select ``Needle Engine Exporter`` and click install in the bottom right corner.  

### Create a new scene

Create a new empty scene. Now, add an empty GameObject, name it "Exporter" and add an `ExportInfo` component to it.  
In this component you create and quickly access your exported runtime project.  
It also warns you if any of the required modules is outdated or not installed.  

The project name is by default the scene name. If you want to change it, you can enter a ``Directory Name`` where you want to create your new runtime project. The path is relative to your Unity project.  

Next select a web template for your project. The default template is based on [Vite ⇡](https://vitejs.dev/), a fast web app bundler.  
Click ``Generate Project``. Wait for the installation to finish — you can see a progress indicator in the bottom right corner of the editor.  

After installation your project should automatically run and a new browser window opens. You might see a warning about SSL security depending on your local configuration. If that happens: click ``Advanced`` and ``Proceed to Site``. Now you should see the default Skybox in your browser.  

⭐ **Congratulations!** You just started your first project using Needle Engine! We're excited what you'll build.  

Needle Engine comes with a set of [prebuilt components](./component-reference.md) that you can use to easily make your scene interactive. One of those components is ``OrbitControls``, which we're going to use to make the camera interactive.
1. Select your ``Main Camera`` GameObject
2. Add a new ``OrbitControls`` component to it 
3. Press play or save your scene
4. Your browser should refresh and you can now move the camera around!

To add content to the scene create a new GameObject and add a ``GltfObject`` component to it. This component marks parts of your hierarchy to be exported as glTF files. Add an object (e.g. ``Create/3D Object/Cube``) as a child to the ``GltfObject`` hierarchy and save. This will refresh your browser window and the cube should now be displayed.

> **No cube on your website**? Make sure it's a child of your GltfObject root.
> **The Skybox looks weird**? This is a known issue and will be fixed soon — just press play again and the skybox should appear correctly.
> **The local server does not start?** Make sure you read and followed the [Prerequisites](#prerequisites-) Also check the console and `ExportInfo` component for warnings or errors. 

In case you need more troubleshooting help, please see the [Questions and Answers](./faq.md) section.  

💚

Continue reading about [exporting GLTF content](./export.md) and [scripting](./scripting.md) →
