# Getting started 🛎

## Prerequisites 💿

These steps will get you started with Needle Engine and Exporter for Unity. After following them, you'll have a fully functional project and also done your first deployment to Glitch. From here, you can dive deeper into [Scripting](./scripting.md), [VR and AR](./xr.md), [Networking](.networking.md), or the various [Samples and Modules](./samples-and-modules.md).  

**Tools you'll need**   
  [Node.js (14.x or 16.x) ⇡](https://nodejs.org/en/) (required)  
  [VS Code ⇡](https://code.visualstudio.com/) (recommended)  
  
**Recommended Unity Versions**  
  [Unity 2020.3+ or 2022.2+⇡](https://unity3d.com/get-unity/download)
  [Universal Render Pipeline or Built-In Render Pipeline]

## Quick Start — Starter Project ⚡
1. **Clone this repository**  
   It's set up with the right packages and settings to get you started right away.  
   
   _Clone with HTTPS:_  
   ```
   https://github.com/needle-tools/three-exporter-support.git
   ```
   _Or clone with SSH:_  
   ```
   git@github.com:needle-tools/three-exporter-support.git
   ```
  
2. **Open the starter project**  
  Open `starter/Unity_2020_3` for a full sandbox project that's ready to run.  
  This is a sandbox builder project!  
  Just add your own assets and you have your first multi-user, cross-platform, 3D sandbox website.  

## Quick Start — Package Installer 📦
1. [Click here](https://package-installer.glitch.me/v1/installer/OpenUPM/org.khronos.unitygltf?registry=https://packages.needle.tools) to download a UnityGLTF installer package
2. [Click here](https://package-installer.glitch.me/v1/installer/OpenUPM/com.needle.engine-exporter?registry=https://packages.needle.tools) to download a Needle Engine Exporter installer package
3. Drop both into your project to install the required packages from our registry 
4. Wait for the installation to finish

## Regular Start — from a Template or from Scratch 🐢

### Create a new project

Create a new Unity project. Currently we support 2020.3.x and 2022. We recommend you install the [Unity Hub ⇡](https://docs.unity3d.com/hub/manual/index.html) to manage your Editor installations.

Open ``Edit/Project Settings`` and select ``Package Manager``.  
Add a new [scoped registry ⇡](https://docs.unity3d.com/Manual/upm-scoped.html):
- Name: ``needle``
- URL: ``https://packages.needle.tools``
- Scope(s): ``[com.needle, org.khronos]``

Open the [Unity Package Manager ⇡](https://docs.unity3d.com/Manual/upm-ui.html) via ``Window/Package Manager``. In the dropdown in top left corner of the window select ``My Registries``. Select ``Needle Engine Exporter`` and click install in the bottom right corner.  

### Create a new scene from a Scene Template 🌵

We provide a number of Scene Templates for quickly starting new projects.  
These allow you to go from idea to prototype in a few clicks.  

1. Click on `File > New Scene`
2. Select one of the templates with (needle) in their name.

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)
 
### Create a new scene from scratch

If you don't want to start from a template, you can follow these steps.  
Effectively, we're going to recreate the "Minimal (Needle)" template that's shipping with the package.  

1. **Ceate a new empty scene**  

3. **Set up your scene for exporting**   
  Add an empty GameObject, name it "Exporter" and add an `ExportInfo` component to it.  
  In this component you create and quickly access your exported runtime project.  
  It also warns you if any of our packages and modules are outdated or not locally installed in your web project.  

  > By default, the project name matches the name of your scene. If you want to change that, you can enter a ``Directory Name`` where you want to create your new runtime project. The path is relative to your Unity project.  
 
3. **Choose a web project template**  
  Now, select a web project template for your project. The default template is based on [Vite ⇡](https://vitejs.dev/), a fast web app bundler.  
 
5. **Generate your web project**   
  Click ``Generate Project``. 
  Wait for the installation to finish — you can see a progress indicator in the bottom right corner of the editor.  

5. **View your project in a browser**
  After a few seconds of installation, your project should automatically run and a new browser window opens. 
  
  > **Note**: You might see a warning in your browser about SSL Security depending on your local configuration.  
    This is because while the connection is encrypted, by default there's no SSL certificate that the browser can validate.  
    If that happens: click ``Advanced`` and ``Proceed to Site``. Now you should see your scene in the browser!  

⭐ **Congratulations!**  You just started your first project using Needle Engine! We're excited what you'll build.  

------------

6. **Add content**    
   1. Create a new empty GameObject
   1. Add a ``GltfObject`` component to it. This component marks parts of your hierarchy to be exported as glTF file. 
   1. Add an object (e.g. ``Create/3D Object/Cube``) as a child to the ``GltfObject`` hierarchy and save. 
   1. Your browser should refresh and your object is visible.

6. **Make it interactive**  
  Needle Engine comes with a set of [prebuilt components](./component-reference.md) that you can use to easily make your scene interactive. One of those components is ``OrbitControls``, which we're going to use to make the camera interactive.
    1. Select your ``Main Camera`` GameObject
    1. Add a new ``OrbitControls`` component to it 
    1. Press play or save your scene
    1. Your browser should refresh and you can now move the camera around.

> **The local server does not start / no website in your browser?**  
  Make sure you read and followed the [Prerequisites](#prerequisites-).  
  Also check the console and `ExportInfo` component for warnings or errors.   
  And last but not least, press `Play` to start the local server.  
  
> **No cube on your website?**   
  Make sure it's a child of your GltfObject root.  
  
> **The Skybox looks weird?**    
  This is a known issue and will be fixed soon — just press play again and the skybox should appear correctly.  

### Deploy your project to Glitch

Glitch is a free website hosting and code editing environment, right in your browser. You can use Glitch as a fast-easy-free way to host prototypes and little apps. You'll even get a small web server included that provides networking and persistence for your projects.  

1. **Add the Deployment component**  
  Select your `ExportInfo` object, and add a new `Deployment` component to it.

2. **Remix our starter, right from Unity**  
  1. Click on `Create new Glitch Remix`.  
    ![image](https://user-images.githubusercontent.com/2693840/185919478-8ba99499-cea9-4d29-ae1c-6d6da602f869.png)  
    This will open your browser and remix the page.  
    
2. **Paste the name of your new remix**
  Copy the URL of your new remix and paste it into the `Project Name` text field in Unity.    

3. **Deploy to Glitch**  
  Click on `Build & Deploy: Prod`. This will kick of bundling, compression, and upload of your project.  
  Wait for a few seconds.
  Your browser window will open on your new project.

⭐ **Congratulations!** You just deployed your first project from Unity to the web.  

------------

In case you need more troubleshooting help, please see the [Questions and Answers](./faq.md) section.  

👉 Continue reading about [exporting GLTF content](./export.md) and [scripting](./scripting.md) →
