---
title: Deployment and Optimization
---

## What does deployment mean?

Deployment is the process of making your application available to the public on a website. Needle Engine ensures that your project is as small and fast as possible by using the latest compression techniques such as **KTX2**, **Draco**, and **Meshopt**.  

## Available Deployment Targets 

- [Needle Cloud](./cloud/#deploy-from-unity) 
  Great for spatial web apps and sharing assets.

- [Netlify](#deploy-to-netlify)
  Great for hosting your own website and custom domain names.
- [itch.io](#deploy-to-itch.io)
  Often used for games.
- [GitHub Pages](#deploy-to-github-pages)
  Free static page hosting.
- [Vercel](#deploy-to-vercel)
  Platform for frontend developers
- [FTP Upload](#deploy-to-ftp)
  Deploy directly to any server with FTP support. Both FTP and SFTP are supported.
- [Build to folder](#build-to-folder)
  When building to a folder, you can upload the files to any web server or other hosting service.
- [Facebook Instant Games](#deploy-to-facebook-instant-games)
  Games platform on Facebook and Facebook Messenger.
  
::: tip Feel something is missing? 
Please let us know in our [forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)!
:::

## Development Builds

See guides above on how to access the options from within your Editor (e.g. Unity or Blender).  

The main difference to a production build is that it does not perform [ktx2](https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html) and [draco](https://google.github.io/draco/) compression (for reduction of file size and loading speed) as well as the option to progressively load high-quality textures.  

We generally recommend making production builds for optimized file size and loading speed (see more information below).

## Production Builds

To make a production build, you need to have [toktx](https://github.com/KhronosGroup/KTX-Software/releases) installed, which provides texture compression using the KTX2 supercompression format. Please go to the [toktx Releases Page](https://github.com/KhronosGroup/KTX-Software/releases) and download and install the latest version (v4.1.0 at the time of writing). You may need to restart Unity after installing it.  
*If you're sure that you have installed toktx and it's part of your PATH but still can't be found, please restart your machine and try build again.*  

:::details Advanced: Custom glTF extensions
If you plan on adding your own custom glTF extensions, building for production requires handling those in ``gltf-transform``. See [@needle-tools/gltf-build-pipeline](https://www.npmjs.com/package/@needle-tools/gltf-build-pipeline) for reference.
:::

### Optimization and Compression Options  

### Texture compression
Production builds will by default compress textures using **KTX2** (either ETC1S or UASTC depending on their usage in the project)   
but you can also select **WebP** compression and select a quality level.  

#### How do I choose between ETC1S, UASTC and WebP compression?

| Format | ETC1S | UASTC | WebP |
| --- | --- | --- | --- |
| **GPU Memory Usage** | Low | Low | High (uncompressed) |
| **File Size** | Low | High | Very low |
| **Quality** | Medium | Very high | Depends on quality setting |
| **Typical usage** | Works for everything, but best for color textures | High-detail data textures: normal maps, roughness, metallic, etc. | Files where ETC1S quality is not sufficient but UASTC is too large |


You have the option to select texture compression and progressive loading options per Texture by using the Needle Texture Importer in Unity or in the Material tab in Blender.
 
:::details Unity: How can I set per-texture compression settings?
![image](/imgs/unity-texture-compression.jpg)  
![image](/imgs/unity-texture-compression-options.jpg)  
:::

:::details Blender: How can I set per-texture compression settings?
Select the material tab. You will see compression options for all textures that are being used by that material.  
![Texture Compression options in Blender](/blender/texture-compression.webp)
:::

:::details Toktx can not be found  
  Windows: Make sure you have added toktx to your system environment variables. You may need to restart your computer after adding it to refresh the environment variables. The default install location is ``C:\Program Files\KTX-Software\bin``    
  ![image](/imgs/ktx-env-variable.webp)
:::

### Mesh compression

By default, a production build will compress meshes using Draco compression. Use the `MeshCompression` component to select between draco and mesh-opt per exported glTF.     
Additionally you can setup mesh simplification to reduce the polycount for production builds in the mesh import settings (Unity). When viewing your application in the browser, you can append `?wireframe` to your URL to preview the meshes.       
  
#### How do I choose between Draco and Meshopt?
| Format | Draco | Meshopt |
| --- | --- | --- |
| **GPU Memory Usage** | Medium | Low |
| **File Size** | Lowest | Low |
| **Animation compression** | No | Yes |


:::details How can I set draco and meshopt compression settings?
Add the MeshCompression component to select which compression should be applied per exported glTF.   

![image](/imgs/unity-mesh-compression-component.jpg)    
- To change compression for the **current scene** just add it anywhere in your root scene.
- To change compression for a **prefab or NestedGltf** add it to a `GltfObject` or the prefab that is referenced / exported by any of your components.
- To change compression for a **referenced scene** just add it to the referenced scene that is exported  
:::

:::details Where to find mesh simplification options to reduce the vertex count when building for production?
Select a Mesh and open the Needle importer options to see available options for the selected mesh:  
![image](/imgs/unity-mesh-simplification.jpg)
:::


### Progressive Textures

You can also add the `Progressive Texture Settings` component anywhere in your scene, to make all textures in your project be progressively loaded. Progressive loading is not applied to lightmaps or skybox textures at this point.   

With progressive loading textures will first be loaded using a lower resolution version. A full quality version will be loaded dynamically when the texture becomes visible. This usually reduces initial loading of your scene significantly.

:::details How can I enable progressive texture loading?
### Progressive textures can be enabled per texture<br/>or for all textures in your project:  
![image](/imgs/unity-texture-compression.jpg)    
### Enable for all textures in the project that don't have any other specific setting:  
![image](/imgs/unity-progressive-textures.jpg)   
:::

### Automatic Mesh LODs (Level of Detail)

Since Needle Engine 3.36 we automatically generate LOD meshes and switch between them at runtime. LODs are loaded on demand and only when needed so so this feature both reduces your loading time as well as performance.

**Key Beneftis**
- Faster initial loading time
- Faster rendering time due to less vertices on screen on average
- Faster raycasting due to the use of LOD meshes

You can either disable LOD generation for your whole project in the `Progressive Loading Settings` component or in the Mesh Importer settings.

![image](/imgs/unity-lods-settings-1.jpg)

![image](/imgs/unity-lods-settings-2.jpg)


## Deployment Options  

### Deploy to Netlify  
:::details How do I deploy to Netlify from Unity?
Just add the `DeployToNetlify` component to your scene and follow the instructions. You can create new projects with the click of a button or by deploying to existing projects.  

![Deploy to netlify component](/deployment/deploytonetlify-2.jpg)  

![Deploy to netlify component](/deployment/deploytonetlify.jpg)  
:::

### Deploy to Vercel

1) Create a new project on vercel
2) Add your web project to a github repository
3) Add the repository to your project on vercel


See our [sample project](https://github.com/needle-engine/nextjs-sample) for the project configuration


### Deploy to itch.io  

:::details How do I deploy to itch.io from Unity?
1) Create a new project on [itch.io](https://itch.io/game/new)
2) Set ``Kind of project`` to ``HTML``  
  ![image](https://user-images.githubusercontent.com/5083203/191211856-8a114480-bae7-4bd1-868e-2e955587acd7.png)
3) Add the ``DeployToItch`` component to your scene and click the ``Build`` button  
  ![image](https://user-images.githubusercontent.com/5083203/193812540-1881837e-ed9e-49fc-9658-52e5a914299a.png)

4) Wait for the build to finish, it will open a folder with the final zip when it has finished
5) Upload to final zip to itch.io  
  ![20220920-104629_Create_a_new_project_-_itch io_-_Google_Chrome-needle](https://user-images.githubusercontent.com/5083203/191212661-f626f0cb-bc8e-4738-ad2c-3982aca65f39.png)
6) Select ``This file will be played in the browser``  
  ![image](https://user-images.githubusercontent.com/5083203/191212967-00b687f3-bf56-449e-880c-d8daf8a52247.png)
7) Save your itch page and view the itch project page.  
  It should now load your Needle Engine project 😊
  
#### Optional settings
![image](https://user-images.githubusercontent.com/5083203/191217263-355d9b72-5431-4170-8eca-bfbbb39ae810.png)
:::

:::details Itch.io: failed to find index.html

#### Failed to find index.html
![image](https://user-images.githubusercontent.com/5083203/191213162-2be63e46-2a65-4d41-a713-98c753ccb600.png)  
If you see this error after uploading your project make sure you do not upload a gzipped index.html.
You can disable gzip compression in ``vite.config.js`` in your Needle web project folder. Just remove the line with ``viteCompression({ deleteOriginFile: true })``. The build your project again and upload to itch.  

::: 

### Deploy to FTP

:::details How do I deploy to my FTP server from Unity?
1) Add the ``DeployToFTP`` component¹ on a GameObject in your scene (it is good practice to add it to the same GameObject as ExportInfo - but it is not mandatory) 
2) Assign an FTP server asset and fill out server, username, and password if you have not already ²    
  *This asset contains the access information to your FTP server - you get them when you create a new FTP account at your hosting provider*
3) Click the <kbd>Build & Deploy</kbd> button on the ``DeployToFTP`` component to build your project and uploading it to your FTP account  


![Deploy to FTP component in Unity](/deployment/deploytoftp.jpg)  
*¹ Deploy to FTP component*

![Deploy to FTP server asset](/deployment/deploytoftp2.jpg)  
*² FTP Server asset containing the access information of your FTP user account*

![Deploy to FTP component in Unity with server asset assigned](/deployment/deploytoftp3.jpg)  
*Deploy To FTP component after server asset is assigned. You can directly deploy to a subfolder on your server using the path field* 
:::

:::details How do I deploy to my FTP server manually?

1) Open `File > Build Settings`, select `Needle Engine`, and click on <kbd>Build</kbd>
2) Wait for the build to complete - the resulting `dist` folder will open automatically after all build and compression steps have run.
3) Copy the files from the `dist` folder to your FTP storage.

**That's it!** 😉

![20220830-003602_explorer-needle](https://user-images.githubusercontent.com/2693840/187311461-e6afb2d7-5761-48cf-bacb-1c1733bb768b.png)




> **Note**: If the result doesn't work when uploaded it might be that your web server does not support serving gzipped files. You have two options to fix the problem:   
Option 1: You can try enabling gzip compression on your server using a htaccess file!    
Option 2: You can turn gzip compression off in the build settings at File/Build Window and selecting the Needle Engine platform.  

> **Note**: If you're getting errors during compression, please let us know and report a bug! If your project works locally and only fails when doing production builds, you can get unstuck right away by doing a Development Build. For that, simply toggle `Development Build` on in the Build Settings.

![Unity build window showing Needle Engine platform](/deployment/buildoptions_gzip.jpg)  

:::

#### Enabling gzip using a .htaccess file
To enable gzip compression on your FTP server you can create a file named `.htaccess` in the directory you want to upload to (or a parent directory).  
Insert the following code into your `.htaccess` file and save/upload it to your server:   
```
<IfModule mod_mime.c>
RemoveType .gz
AddEncoding gzip .gz
AddType application/javascript .js.gz
``` 


### Deploy to Github Pages
:::details How do I deploy to Github Pages from Unity?

Add the DeployToGithubPages component to your scene and copy-paste the github repository (or github pages url) that you want to deploy to.  
![Deploy To github pages component](/deployment/deploytogithubpages.jpg) 


<video-embed src="https://www.youtube.com/watch?v=Vyk3cWB6u-c" />


:::

#### Troubleshooting github pages
- **I deployed to github pages but no action is running / the website is not live**    
   - If you deployed for the first time it can take a few minutes until your website becomes available. You can check the **Actions** tab on github (`/actions`) to see the deployment process. 
   - If your website is not live after a few minutes or you don't see any workflow run in the **Actions** tab on github then go to the **Github Pages** settings page (`/settings/pages`) and make sure the **Branch** is set to *gh-pages*



### Deploy to Facebook Instant Games

With Needle Engine you can build to Facebook Instant Games automatically  
No manual adjustments to your web app or game are required.  


:::details How do I deploy to Facebook Instant Games from Unity?
- Add the `Deploy To Facebook Instant Games` component to your scene:
  ![Deploy to facebook instant games component](/deployment/deploytofacebookinstantgames.jpg) 
- Click the `Build For Instant Games` button
- After the build has finished you will get a ZIP file that you can upload to your facebook app.   
- On Facebook add the `Instant Games` module and go to `Instant Games/Web hosting` 
  ![Hosting a facebook instant games](/deployment/deploytofacebookinstantgames-hosting.jpg) 
- You can upload your zip using the `Upload version` button (1). After the upload has finished and the zip has been processed click the `Stage for testing` button to test your app (2, here the blue button) or `Push to production` (the button with the star icon)
  ![Upload the zip to facebook instant games](/deployment/deploytofacebookinstantgames-upload.jpg) 
- That's it - you can then click the `Play` button next to each version to test your game on facebook.

:::


:::details How do I create a app on Facebook (with Instant Games capabilities)

1) [Create a new app](https://developers.facebook.com/apps/creation/) and select `Other`. Then click `Next`
  ![Create facebook instant games app](/deployment/facebookinstantgames-1.jpg) 

2) Select type `Instant Games`
  ![Create facebook instant games app](/deployment/facebookinstantgames-2.jpg) 

3) After creating the app add the `Instant Games` product
  ![Add instant games product](/deployment/facebookinstantgames-3.jpg) 

Here you can find [the official instant games documentation](https://developers.facebook.com/docs/games/build/instant-games) on facebook.  
**Note** that all you have to do is to create an app with instant games capabilities.  
We will take care of everything else and no manual adjustments to your Needle Engine website are required.
:::



## Build To Folder


In Unity open ``File/Build Settings`` and select ``Needle Engine`` for options:

![image](/imgs/unity-build-window-menu.jpg)    

![image](/imgs/unity-build-window.jpg)  

 

To build your web project for uploading to any web server you can click **Build** in the Unity Editor Build Settings Window. You can enable the ``Development Build`` checkbox to omit compression (see below) which requires toktx to be installed on your machine.   

To locally preview your final build you can use the `Preview Build` button at the bottom of the window. This button will first perform a regular build and then start a local server in the directory with the final files so you can see what you get once you upload these files to your webserver.

Nodejs is **only** required during development. The distributed website (using our default vite template) is a static page that doesn't rely on Nodejs and can be put on any regular web server. Nodejs is required if you want to run our minimalistic networking server on the same web server. 


---

## Cross-Platform Deployment Workflows

It's possible to create regular Unity projects where you can build both to Needle Engine and to regular Unity platforms such as Desktop or even WebGL. Our "component mapping" approach means that no runtime logic is modified inside Unity - if you want you can regularily use Play Mode and build to other target platforms. In some cases this will mean that you have duplicate code (C# code and matching TypeScript logic). The amount of extra work through this depends on your project.  

**Enter Play Mode in Unity**  
In `Project Settings > Needle Engine`, you can turn off `Override Play Mode` and `Override Build settings` to switch between Needle's build process and Unity's build process:  
![image](https://user-images.githubusercontent.com/2693840/187308490-5acb9016-ffff-4113-be62-4de450a42b08.png)



## Needle Engine Commandline Arguments for Unity

Needle Engine for Unity supports various commandline arguments to export single assets (Prefabs or Scenes) or to build a whole web project in batch mode (windowsless).     

The following list gives a table over the available options:  

| | |
| -- | -- |
| `-scene` | path to a scene or a asset to be exported e.g. `Assets/path/to/myObject.prefab` or `Assets/path/to/myScene.unity` |
| `-outputPath <path/to/output.glb>` | set the output path for the build (only valid when building a scene) |
| `-buildProduction` | run a production build | 
| `-buildDevelopment` | run a development build |
| `-debug` | open a console window for debugging |
