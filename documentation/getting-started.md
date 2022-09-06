# Getting started 🛎

These steps will get you started with Needle Engine and Exporter for Unity. After following them, you'll have a fully functional project and also done your first deployment to Glitch. From here, you can dive deeper into [Scripting](./scripting.md), [VR and AR](./xr.md), [Networking](.networking.md), or the various [Samples and Modules](./samples-and-modules.md).  

## Prerequisites 💿

Below each tool, you find quick links to download the latest version at the time of writing.  

### Download these tools for development

  [**Node.js** (14.x or 16.x) ⇡](https://nodejs.org/en/) – for running a local development server (required)   
  [Windows 16.7](https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi) • [MacOS Universal](https://nodejs.org/dist/v16.17.0/node-v16.17.0.pkg)  
    
  [**git** ⇡](https://git-scm.com/downloads) – for downloading packages from GitHub (required)  
  [Windows](https://git-scm.com/download/win) • [MacOS Universal](https://git-scm.com/download/mac)  
   
  [**VS Code** ⇡](https://code.visualstudio.com/) – for code editing (recommended)  
  [Windows](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user) • [MacOS Universal](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal)  
  
  [**Unity** 2020.3.16+, 2021.3+ or 2022.2+ ⇡](https://unity3d.com/get-unity/download) – for setting up your scene and components  (required)  
  _Universal Render Pipeline or Built-In Render Pipeline_  
  
### Download these tools for production builds

  [**toktx** 4.x ⇡](https://github.com/KhronosGroup/KTX-Software/releases/tag/v4.1.0-rc3) – for texture compression (recommended)   
  [Windows x64](https://github.com/KhronosGroup/KTX-Software/releases/download/v4.1.0-rc3/KTX-Software-4.1.0-rc3-Windows-x64.exe) • [MacOS x64](https://github.com/KhronosGroup/KTX-Software/releases/download/v4.1.0-rc3/KTX-Software-4.1.0-rc3-Darwin-x86_64.pkg) • [Mac OS with Apple Silicon](https://github.com/KhronosGroup/KTX-Software/releases/download/v4.1.0-rc3/KTX-Software-4.1.0-rc3-Darwin-arm64.pkg)  
  _Have a different platform? Scroll down to the "Assets" section on the link above, download and run the right installer for your system._  
  
After installing the tools above, you might have to restart your machine so that all environment variables are properly updated.  

## Option 1: Quick Start — Starter Project ⚡
1. **Clone this repository**  
   It's set up with the right packages and settings to get you started right away.  
   
   _Clone with HTTPS:_ ``https://github.com/needle-tools/needle-engine-support.git``  
   _OR clone with SSH:_ ``git@github.com:needle-tools/needle-engine-support.git``  
  
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

## Option 2: Quick Start — Package Installer 📦
1. [**Click here to download a Needle Engine Exporter installer package**](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos) 
2. Drop both into a Unity project to install the Needle Engine, Needle Engine Exporter and UnityGLTF package
3. Wait for the installation to finish (You might need to click ``Refresh`` in the Unity Project browser after the installer has finished)
4. Now create a new scene and select one of our scene templates!

## Option 3: Regular Start — from a Template or from Scratch 🐢

### Create a new project

1. **Set up a new project**  
Create a new Unity project. Currently we support 2020.3.x and 2022. We recommend you install the [Unity Hub ⇡](https://docs.unity3d.com/hub/manual/index.html) to manage your Editor installations.

1. **Add our registry to Package Manager**  
Open ``Edit/Project Settings`` and select ``Package Manager``.  
Add a new [scoped registry ⇡](https://docs.unity3d.com/Manual/upm-scoped.html):
    - Name: ``needle``
    - URL: ``https://packages.needle.tools``
    - Scope(s):   
      `com.needle`  
      `org.khronos`  
  ![image](https://user-images.githubusercontent.com/2693840/186287175-0de831b8-9112-43fa-989d-c13680186ff0.png)


1. **Add the Exporter package**  
Open the [Unity Package Manager ⇡](https://docs.unity3d.com/Manual/upm-ui.html) via ``Window/Package Manager``.  
In the dropdown in top left corner of the window select ``My Registries``.  
Select ``Needle Engine Exporter`` and click install in the bottom right corner.  

> **Note**: You only need to install `Needle Engine Exporter` – other packages will automatically be installed as dependencies.  

### Create a new scene from a Scene Template 🌵

We provide a number of Scene Templates for quickly starting new projects.  
These allow you to go from idea to prototype in a few clicks.  

1. Click on `File > New Scene`
2. Select one of the templates with (needle) in their name.

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)
 
### Create a new scene from scratch

If you don't want to start from a scene template, you can follow these steps.  
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

## Deploy your project to Glitch 🎏

[Glitch ⇡](https://glitch.com) is a free website hosting and code editing environment, right in your browser. You can use Glitch as a fast-easy-free way to host prototypes and little apps. You'll even get a small web server included that provides networking and persistence for your projects.  

1. **Add the Deployment component**  
  Select your `ExportInfo` object, and add a new `Deployment` component to it.

2. **Remix [our starter ⇡](https://fwd.needle.tools/needle-engine/glitch-starter-editor), right from Unity**  
   1. **Click on `Create new Glitch Remix`.**  
    ![image](https://user-images.githubusercontent.com/2693840/185919478-8ba99499-cea9-4d29-ae1c-6d6da602f869.png)  
    This will open your browser and remix the page.  
    
   2. **Paste the name of your new remix**  
  Copy the URL of your new remix and paste it into the `Project Name` text field in Unity.    
  ![179834901-f28852a9-6b06-4d87-8b5b-0384768c92c1](https://user-images.githubusercontent.com/5083203/186165097-9b44f3dc-ec2f-48f4-819b-8fab5fac5270.png)

   3. **Deploy to Glitch**  
  Click on `Build & Deploy: Prod`. This will kick of bundling, compression, and upload of your project.  
  Wait for a few seconds.
  Your browser window will open on your new project.

⭐ **Congratulations!** You just deployed your first project from Unity to the web.  

------------

In case you need more troubleshooting help, please see the [Questions and Answers](./faq.md) section.  

👉 Continue reading about [exporting GLTF content](./export.md) and [scripting](./scripting.md) →
