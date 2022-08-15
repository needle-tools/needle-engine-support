# Prerequisites 💿
- [nodejs ⇡](https://nodejs.org/en/) (required for development)
- [Unity 2020.3.x ⇡](https://unity3d.com/get-unity/download) (required for development)
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

## Quick start ⚡
Open the project in ``starter/Unity_2020_3`` for a Unity → threejs project ready to run.

## Slow start 🐢

### Creating a new project

Create a new Unity project. Currently we support 2020.3.x and 2022. We recommend you install the [Unity Hub ⇡](https://docs.unity3d.com/hub/manual/index.html) to manage your editor installations.

Open ``Edit/Project Settings`` and select ``Package Manager``. Add a new [scoped registry ⇡](https://docs.unity3d.com/Manual/upm-scoped.html):
- Name: ``needle``
- URL: ``https://packages.needle.tools``
- Scope(s): ``[com.needle, org.khronos]``

Open the [Unity Package Manager ⇡](https://docs.unity3d.com/Manual/upm-ui.html) via ``Window/Package Manager``. In the dropdown in top left corner of the window select ``MyRegistries``. Select ``Needle Engine Exporter`` and click install in the bottom right corner.

Open ``Edit/Project Settings`` and find ``Needle/Needle Engine``. Select the directory for the needle runtime package (``Local js package``) and for the local threejs module (``Local threejs``). 

### Creating a new scene

You can export scenes to threejs by adding an ``ExportInfo`` component to any GameObject. In this component you create and quick-access your exported runtime javascript project. It also warns you if any of the required modules is outdated or not installed.

To get started enter a ``Directory Name`` where you want to create a new runtime project. The path is relative to your Unity project.

Next select a template you want to generate a project from (default is using [Vite ⇡](https://vitejs.dev/)) and click ``Generate Project``. Wait for the installation to finish (you can see a progress indicator in the bottom right corner of the editor).

After installation your project should automatically run and a new browser window opens. You might see a warning about ssl security depending on your local configuration. You can just click ``advanced`` and ``proceed to site``. Now you should see the Unity skybox in your browser. ⭐ **Congrats!** You just built your first project using Unity to threejs!

Our exporter comes with a set of [prebuilt components](./component-reference.md) that you can use to easily make your scene interactive. One of those components is ``OrbitControls``. Select your ``Main Camera`` GameObject and add a new ``OrbitControls`` script to it. Save your scene. Your browser should refresh and you can now move the camera around!

To add content to the scene create a new GameObject and add a ``GltfObject`` component to it. This component marks parts of your hierarchy to be exported as glTF files. Add a mesh (e.g. via context ``Create/3D Object/Cube``) as a child to the ``GltfObject`` hierarchy and save. Again this refreshes your browser to render the cube.

#### **Tips**
- For future projects start with one of our Unity scene templates (e.g. Basic) for even faster project creation in just a few clicks.
- You can also **create your own templates** using ``Create/Scene Template``: [documentation ⇡](https://docs.unity3d.com/Manual/scene-templates.html)

#### **Troubleshooting**
- The local server does not start
    - Try opening your threejs project directory in a command line tool and run ``npm install`` and then ``npm run dev-host``. Make sure both the local runtime package (``node_modules/@needle-tools/engine``) as well as threejs (``node_modules/three``) did install. You may run ``npm install`` in both of these directories as well.
- The skybox is broken
    - Try rebuilding the project in Unity (``ExportInfo/Play`` or ) - this is a known issue and happens sometimes but will hopefully be fixed at some point.


You are now ready to continue reading about [exporting GLTF content](./export.md) and [scripting](./scripting.md)
