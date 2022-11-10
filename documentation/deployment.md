---
title: Deploying to the Web
---

### How to build for uploading to the web

Needle Engine is tightly integrated into the Unity Editor:  
Open ``File/Build Settings`` and select ``Needle Engine`` for options!

To build your web project for deployment you can click **Build** in the Unity Editor Build Settings Window. You can enable the ``Development Build`` checkbox to omit compression (see below) which requires toktx to be installed on your machine.

> **Note**: Nodejs is **only** required during development. The distributed website (using the vite template) is a static page, doesn't rely on Nodejs and can be put on any regular web server. Nodejs is required if you want to run our minimalistic networking server on the same web server (automatically contained in the Glitch deployment process). 

#### Building a development distribution
See notes above on how to access. The main difference to a production build is that it does not perform [``ktx2``](https://github.khronos.org/KTX-Specification/) and [``draco``](https://google.github.io/draco/) compression. Both can reduce file-size drastically. We generally recommend making builds using the ``production`` option.

#### Building a production distribution (optimized and compressed)

To make a production build you need to have [toktx](https://github.com/KhronosGroup/KTX-Software/releases) to be installed, which provides texture compression using the KTX2 supercompression format. Please go to the [toktx Releases Page](https://github.com/KhronosGroup/KTX-Software/releases) and download and install the latest version (v4.1.0-rc3 at the time of writing, there might be a newer one). You may need to restart Unity after installing it.  
*If you're sure that you have installed toktx and it's part of your path but it still can't be found, please restart your machine and try again.*  

If you plan on adding your own custom glTF extensions, building for production requires handling those in ``gltf-transform``. See [@needle-tools/gltf-transform-extensionsw](https://www.npmjs.com/package/@needle-tools/gltf-transform-extensions) for reference.

## Deploy to Glitch 🎏

[Glitch](https://glitch.com/) provides a fast and free way for everyone to host small and large websites. We're providing an easy way to remix and deploy to a new Glitch page (based on our starter), and also to run a minimalistic networking server on the same Glitch page if needed.  

1) Add the ``Deployment`` component to the GameObject that also has the ``ExportInfo`` component.

3) Click the ``Remix on glitch`` button on the component
4) Your browser will open the glitch project template
5) Find and click the ``Remix another`` button on the glitch website  
   ![image](https://user-images.githubusercontent.com/5083203/179834548-acf68b02-95d8-43e5-802a-4e4086e39309.png)
5) Glitch will now create a remix of the template. Copy the URL from your browser   
   ![image](https://user-images.githubusercontent.com/5083203/179834901-f28852a9-6b06-4d87-8b5b-0384768c92c1.png)
6) Open Unity again and paste the URL in the ``Project Name`` field of your ``Deployment`` component  
  ![image](https://user-images.githubusercontent.com/5083203/179835274-033e5e1d-b70d-4b13-95ad-f1e2f159b14e.png)
7) On Glitch open the ``.env`` file and enter a password in the field ``Variable Value`` next to the **DEPLOY_KEY**  
  ![image](https://user-images.githubusercontent.com/5083203/179835779-ec128288-4db2-42f7-adc0-3c1de6799cef.png)
8) Add the same password in Unity  
  ![image](https://user-images.githubusercontent.com/5083203/179835883-b524d23f-d887-4ac1-9a59-d5508b6b30c2.png)

## Deploy to itch.io  

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
  
### Optional settings
![image](https://user-images.githubusercontent.com/5083203/191217263-355d9b72-5431-4170-8eca-bfbbb39ae810.png)


### Troubleshooting itch.io  

#### Failed to find index.html
![image](https://user-images.githubusercontent.com/5083203/191213162-2be63e46-2a65-4d41-a713-98c753ccb600.png)  
If you see this error after uploading your project make sure you do not upload a gzipped index.html.
You can disable gzip compression in ``vite.config.js`` in your Needle web project folder. Just remove the line with ``viteCompression({ deleteOriginFile: true })``. The build your project again and upload to itch.  


## Deploy to FTP
1) Add the ``DeloyToFTP`` component¹ on a GameObject in your scene (it is good practice to add it to the same GameObject as ExportInfo - but it is not mandatory) 
2) Assign an FTP server asset and fill out server, username, and password if you have not already ²    
  *This asset contains the access information to your FTP server - you get them when you create a new FTP account at your hosting provider*
3) Click the <kbd>Build & Deploy</kbd> button on the ``DeployToFTP`` component to build your project and uploading it to your FTP account  


![Deploy to FTP component in Unity](/deployment/deploytoftp.jpg)  
*¹ Deploy to FTP component*

![Deploy to FTP server asset](/deployment/deploytoftp2.jpg)  
*² FTP Server asset containing the access information of your FTP user account*

![Deploy to FTP component in Unity with server asset assigned](/deployment/deploytoftp3.jpg)  
*Deploy To FTP component after server asset is assigned. You can directly deploy to a subfolder on your server using the path field* 

## Deploy to FTP (manual upload)

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


---

## Cross-Platform Deployment Workflows

It's possible to create regular Unity projects where you can build both to Needle Engine and to regular Unity platforms such as Desktop or even WebGL. Our "component mapping" approach means that no runtime logic is modified inside Unity - if you want you can regularily use Play Mode and build to other target platforms. In some cases this will mean that you have duplicate code (C# code and matching TypeScript logic). The amount of extra work through this depends on your project.  

**Enter Play Mode in Unity**  
In `Project Settings > Needle Engine`, you can turn off `Override Play Mode` and `Override Build settings` to switch between Needle's build process and Unity's build process:  
![image](https://user-images.githubusercontent.com/2693840/187308490-5acb9016-ffff-4113-be62-4de450a42b08.png)

