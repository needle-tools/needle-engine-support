# Deployment ⚒

Needle Engine is tightly integrated into the Unity Editor:  
Open ``File/Build Settings`` and select ``Needle Engine`` for options!  

![image](https://user-images.githubusercontent.com/5083203/179510828-931e534a-c155-44b5-b9aa-29bac33a0c48.png)


To deploy your threejs project you can click ``Build`` in the Unity Editor Build Settings Window. You can enable the ``Development Build`` checkbox to omit compression (see Deploying for production below) which requires toktx to be installed on your machine.

> **Note**: Nodejs is **only** required during development. The distributed website (using the vite template) is a static page, doesn't rely on Nodejs and can be put on any regular web server. Nodejs is required if you want to run our minimalistic networking server on the same web server (automatically contained in the Glitch deployment process). 

### Deploying for development
See notes above on how to access. The main difference to a production build is that it does not perform [``ktx2`` ⇡](https://github.khronos.org/KTX-Specification/) and [``draco`` ⇡](https://google.github.io/draco/) compression. Both can reduce file-size drastically. We generally recommend making builds using the ``production`` option.

### Deploying for production (optimized and compressed)
To make a production build you need to have [toktx ⇡](https://github.com/KhronosGroup/KTX-Software/releases) to be installed (for compressing your files). Please go to the [toktx Releases Page ⇡](https://github.com/KhronosGroup/KTX-Software/releases) and download and install the latest version of `toktx`. You may need to restart Unity after installing it.  

> **Note**: If you plan on adding your own custom glTF extensions, building for production requires handling those in ``gltf-transform``. See `needle.tiny.engine/plugins/gltf-packer` for reference.

## Deploy to glitch 🎏

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

## Deploy to FTP

1) Open `File > Build Settings`, select `Needle Engine`, and click on <kbd>Build</kbd>
6) Wait for the build to complete - the resulting `dist` folder will open automatically after all build and compression steps have run.
7) Copy the files from the `dist` folder to your FTP storage.

![20220830-003602_explorer-needle](https://user-images.githubusercontent.com/2693840/187311461-e6afb2d7-5761-48cf-bacb-1c1733bb768b.png)

That's it! 

> **Note**: If the result doesn't work, it might be that your web server does not support serving gzipped files. By default, we're outputting gzipped files ready for deployment, but you can turn that off.

_Optional:_ **Disable gzipping of files if your server does not support it:**  
1. open the VSCode workspace by clicking <kbd>VS Workspace</kbd> on your ExportInfo component
2. Find and open `vite.config.js`
3. Comment out the line that starts with `viteCompression(` - this turns compression off.
4. Create and upload a new build

![image](https://user-images.githubusercontent.com/2693840/187311408-c8a90de4-559e-4d38-b2e1-7e3d36c5a9de.png)


> **Note**: If you're getting errors during compression, please let us know and report a bug! If your project works locally and only fails when doing production builds, you can get unstuck right away by doing a Development Build. For that, simply toggle `Development Build` on in the Build Settings.

## Cross-Platform Deployment Workflows

It's possible to create regular Unity projects where you can build both to Needle Engine and to regular Unity platforms such as Desktop or even WebGL. Our "component mapping" approach means that no runtime logic is modified inside Unity - if you want you can regularily use Play Mode and build to other target platforms. In some cases this will mean that you have duplicate code (C# code and matching TypeScript logic). The amount of extra work through this depends on your project.  

**Enter Play Mode in Unity**  
In `Project Settings > Needle Engine`, you can turn off `Override Play Mode` and `Override Build settings` to switch between Needle's build process and Unity's build process:  
![image](https://user-images.githubusercontent.com/2693840/187308490-5acb9016-ffff-4113-be62-4de450a42b08.png)
