# Prerequisites 💿
- [nodejs ⇡](https://nodejs.org/en/) (required)
- [Unity 2020.3.x ⇡](https://unity3d.com/get-unity/download) (required)
- [vscode ⇡](https://code.visualstudio.com/) (recommended)

# Getting started 🛎

*Please follow the instructions in the Authentication section if this is your first time accessing packages by needle or a new machine.*

## Authentication  

*Needs to be setup once per machine.*  

1) Clone this repository and open ``starter/Authenticate`` with Unity 2020.3.x
2) Open [https://packages.needle.tools ⇡](https://packages.needle.tools) in your browser and login (top right corner) with your github account. 
3) Return to [packages.needle.tools ⇡](packages.needle.tools) and click the ``i`` icon in the top right corner opening the ``Registry Info`` window.
4) Copy the line containing ``_authToken`` ([see video](https://user-images.githubusercontent.com/5083203/166433857-a0c9e29f-9413-4e10-a1a1-2029e3d3ab06.mp4)).   
7) Focus Unity - a notification window should open that the information has been added successfully from your clipboard.
8) Click save and close Unity. You should now have access rights to the needle package registry.

## Quick start
Open the project in ``starter/Unity_2020_3`` for a Unity → threejs project ready to run.

## Slow start

*For the purpose of this guide we will use the Unity project at **projects/Unity-Threejs_2020_3** and we would recommend you do the same.*

Open ``Edit/Project Settings`` and find ``Needle/threejs Exporter``. Select the directory for the needle runtime package (``Local js package``) and for the local threejs module (``Local threejs``). 

### Creating a new project
To create a new project [create a new Unity scene ⇡](https://docs.unity3d.com/Manual/CreatingScenes.html). For exporting to threejs add an ``ExportInfo`` component on one of your GameObjects in the scene. We recommend to mark this GameObject with the ``EditorOnly`` [tag ⇡](https://docs.unity3d.com/Manual/Tags.html) to avoid exporting settings objects.

Choose a directory for your threejs project in the ``ExportInfo`` component. If the directory does not exist or does not contain a threejs project yet click the ``Generate Project`` button.   
Note that Unity is automatically running ``npm install`` in the newly generated project. Wait for the installation to finish. If chrome did not open automatically after the installation finished try clicking the ``Play`` button in the Unity editor. It will start a local server and open chrome at port 3000. Allow the unsecure connection: now you should see the default Unity skybox in your browser.  
⭐ **Congrats!** You just built your first project using Unity to threejs!


#### **Tips**
- For future projects start with one of our Unity scene templates (e.g. Basic) for even faster project creation in just a few clicks.
- You can also **create your own templates** using ``Create/Scene Template``: [documentation ⇡](https://docs.unity3d.com/Manual/scene-templates.html)

#### **Troubleshooting**
- The local server does not start
    - Try opening your threejs project directory in a command line tool and run ``npm install`` and then ``npm run dev-host``. Make sure both the local runtime package (``node_modules/needle.tiny.engine``) as well as threejs (``node_modules/three``) did install. You may run ``npm install`` in both of these directories as well.
- The skybox is broken
    - Try rebuilding the project in Unity (``ExportInfo/Build``) - this is a known issue and happens sometimes but will hopefully be fixed at some point.


You are now ready to continue reading about [exporting GLTF content](./export.md) and [scripting](./scripting.md)
