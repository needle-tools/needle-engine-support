# Deployment ⚒

Needle Engine is tightly integrated into the Unity Editor:  
Open ``File/Build Settings`` and select ``Needle Engine`` for options!  

![image](https://user-images.githubusercontent.com/5083203/179510828-931e534a-c155-44b5-b9aa-29bac33a0c48.png)


To deploy your threejs project you can click ``Build`` in the Unity Editor Build Settings Window. You can enable the ``Development Build`` checkbox to omit compression (see Deploying for production below) which requires toktx to be installed on your machine.

*Note: that Nodejs is **only** required during development. The distributed website (using the vite template) is not relying on Nodejs and can be used on any regular server.*

### Deploying for development
See notes above on how to access. The main difference to a production build is that it does not perform [``ktx2`` ⇡](https://github.khronos.org/KTX-Specification/) and [``draco`` ⇡](https://google.github.io/draco/) compression. Both can reduce file-size drastically. We generally recommend making builds using the ``production`` option.

### Deploying for production (optimized and compressed)
To make a production build you need to have [toktx ⇡](https://github.com/KhronosGroup/KTX-Software/releases) to be installed (for compressing your files). Please go to the [github releases ⇡](https://github.com/KhronosGroup/KTX-Software/releases) and download and install the latest version of toktx. You may need to restart Unity after installing it. 

NOTE: when building for production using custom extensions make sure to handle those in ``gltf-transform``, see ``needle.tiny.engine/plugins/gltf-packer`` for reference.

## Deploy to glitch 🐟
1) Add the ``Deployment`` component to the GameObject that also has the ``ExportInfo`` component.
2) Click the ``Remix on glitch`` button on the component
3) Your browser will open the glitch project template
4) Find and click the ``Remix another`` button on the glitch website  
   ![image](https://user-images.githubusercontent.com/5083203/179834548-acf68b02-95d8-43e5-802a-4e4086e39309.png)
5) Glitch will now create a remix of the template. Copy the URL from your browser   
   ![image](https://user-images.githubusercontent.com/5083203/179834901-f28852a9-6b06-4d87-8b5b-0384768c92c1.png)
6) Open Unity again and paste the URL in the ``Project Name`` field of your ``Deployment`` component  
  ![image](https://user-images.githubusercontent.com/5083203/179835274-033e5e1d-b70d-4b13-95ad-f1e2f159b14e.png)
7) On Glitch open the ``.env`` file and enter a password in the field ``Variable Value`` next to the **DEPLOY_KEY**  
  ![image](https://user-images.githubusercontent.com/5083203/179835779-ec128288-4db2-42f7-adc0-3c1de6799cef.png)
8) Add the same password in Unity  
  ![image](https://user-images.githubusercontent.com/5083203/179835883-b524d23f-d887-4ac1-9a59-d5508b6b30c2.png)




