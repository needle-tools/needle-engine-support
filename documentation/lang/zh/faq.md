---
title: 常见问题 (FAQ) 💡
---


## How can I activate my Needle Engine License?

### Activating the license in Unity

#### Needle Engine 4.x

Go to Project Settings/Needle and click on the login button. Follow the steps and log in to your Needle account.   
After that you'll see your account information in the Unity Project Settings window. Select the licensed team from the dropdown.   

#### Needle Engine 3.x

Open `Edit/Project Settings/Needle` to get the Needle Engine plugin settings. At the top of the window you'll find fields for entering your license information.
- `Email` - Enter the email you purchased the license with
- `Invoice ID` - Enter one of the invoice ids that you received by email

Note: You might need to restart the local webserver to apply the license.

![unity license window](/imgs/unity-needle-engine-license.jpg)

### Activating the license in Blender
Open `Addon Preferences/Needle Engine` to get to the Needle Engine addon settings 
- `Email` - Enter the email you purchased the license with
- `Invoice ID` - Enter one of the invoice ids that you received by email

Note: You might need to restart the local webserver to apply the license.



## My local website shows an SSL error e.g. 'Your connection is not private'

You might see a warning in your browser about SSL Security depending on your local configuration.  

This is because while the connection is encrypted, by default there's no SSL certificate that the browser can validate.
If that happens: click `Advanced` and `Proceed to Site`. In Safari, you might need to refresh the page afterwards, because it does not automatically proceed. Now you should see your scene in the browser!  

The dialogue should only show up once for the same local server

::: tip
Connections are secured, because we're enforcing HTTPS to make sure that WebXR and other modern web APIs work out-of-the-box. Some browsers will still complain that the SSL connection (between your local development server and the local website) can't be automatically trusted, and that you need to manually verify you trust that page. Automatic Page Reload and Websocket connections may also be affected depending on the browser and system settings.  

See [the Testing docs](./testing.md) for information on how to set up a self-signed certificate for a smoother development experience.
:::

![SLL warning on chrome](/videos/ssl-warning.gif)
  
  

## My local website stays black

If that happens there's usually an exception either in engine code or your code. Open the dev tools (<kbd>Ctrl + Shift + I</kbd> or <kbd>F12</kbd> in Chrome) and check the Console for errors.  
In some cases, especially when you just updated the Needle Engine package version, this can be fixed by stopping and restarting the local dev server.  
For that, click on the running progress bar in the bottom right corner of the Editor, and click the little <kbd>X</kbd> to cancel the running task. Then, simply press Play again.  


## My objects are white after export
This usually happens when you're using custom shaders or materials and their properties don't cleanly translate to known property names for glTF export.  
You can either make sure you're using glTF-compatible materials and shaders, or mark shaders as "custom" to export them directly.  
- Read more about recommended glTF workflows: <link>
- Read more about custom shaders: <link>


## Uncaught ReferenceError: NEEDLE_ENGINE_META is not defined / NEEDLE_USE_RAPIER is not defined

If you are using Vite or next.js make sure to add the Needle Engine plugins to your config.
Example for Vite:
```js
const { needlePlugins } = await import('@needle-tools/engine/plugins/vite/index.js');
plugins: [needlePlugins(command, needleConfig)]
```
Example for next.js
```js
const { needleNext } = await import("@needle-tools/engine/plugins/next/index.js");
return needleNext({}, { modules: { webpack } });
```
You can also just declare the missing variables in e.g. your root `index.html` in a script tag like so:
```html
<script>
  var NEEDLE_ENGINE_META = {}
  var NEEDLE_USE_RAPIER = true;
</script>
```

## THREE.EXRLoader: provided file doesnt appear to be in OpenEXR format

Please make sure that sure that you have set Lightmap Encoding to **Normal Quality**.   
Go to *Edit/Project Settings/Player* for changing the setting.  

![](/faq/lightmap_encoding.jpg)  

## My website becomes too large / is loading slow (too many MB)
  
This can have many reasons, but a few common ones are:
- too many textures or textures are too large
- meshes have too many vertices
- meshes have vertex attributes you don't actually need (e.g. have normals and tangents but you're not using them)
- objects are disabled and not ignored – disabled objects get exported as well in case you want to turn them on at runtime! Set their Tag to `EditorOnly` to completely ignore them for export.
- you have multiple ``GltfObject`` components in your scene and they all have ``EmbedSkybox`` enabled (you need to have the skybox only once per scene you export)
  
If loading time itself is an issue you can **try to split up your content into multiple glb files** and load them on-demand (this is what we do on our website). For it to work you can put your content into Prefabs or Scenes and reference them from any of your scripts. Please have a look at [Scripting/Addressables in the documentation](./scripting.md#assetreference-and-addressables).

## My UI is not rendering Text

- For Unity: Make sure that you use the `UI/Legacy/Text` component and **not** the `TextMeshPro - Text` component

## My scripts don't work after export
  
- Your existing C# code will *not* export as-is, you have to write matching typescript / javascript for it.  
- Needle uses typescript / javascript for components and generates C# stubs for them.  
- Components that already have matching JS will show that in the Inspector.  

## My lightmaps look different / too bright

Ensure you're following [best practices for lightmaps](https://docs.needle.tools/lightmaps?utm_source=needle_docs) and read about [mixing baked and non-baked objects](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects)

## My scene is too bright / lighting looks different than in Unity
Make sure that your lights are set to "Baked" or "Realtime". "Mixed" is currently not supported.  
  
- Lights set to mixed (with lightmapping) do affect objects twice in three.js, since there is currently no way to exclude lightmapped objects from lighting
- The ``Intensity Multiplier`` factor for Skybox in ``Lighting/Environment`` is currently not supported and has no effect in Needle Engine  
  ![image](https://user-images.githubusercontent.com/5083203/185429006-2a5cd6a1-8ea2-4a8e-87f8-33e3afd080ec.png)
- Light shadow intensity can currently not be changed due to a three.js limitation.
  
Also see the docs on [mixing baked and non-baked objects](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects).


## My skybox resolution is low? How to change my skybox resolution

  - **If you use a custom cubemap**: You can override the texture import settings of the skybox texture (assigned to your cubemap)
  
    ![image](https://user-images.githubusercontent.com/5083203/188179104-1e078cda-3397-4ebe-aaf9-7faa23ee4904.png)   

 
  - **If you use the default skybox**: Add a ``SkyboxExportSettings`` component anywhere in your scene to override the default resolution   
  
    ![image](https://user-images.githubusercontent.com/5083203/188171443-578380ab-2036-4d70-a8a7-f8cd9da9f603.png)



## My Shadows are not visible or cut off 
  
Please the following points:   
  
  - Your light has shadows enabled (either Soft Shadow or Hard Shadow)
  - Your objects are set to "Cast Shadows: On" (see MeshRenderer component)
  - For directional lights the position of the light is currently important since the shadow camera will be placed where the light is located in the scene.



## My colors look wrong
  
Ensure your project is set to Linear colorspace.

![image](https://user-images.githubusercontent.com/5083203/191774978-66e9feb1-0551-4549-85d3-3e5b8021f162.png)



## I'm using networking and Glitch and it doesn't work if more than 30 people visit the Glitch page at the same time
  
- Deploying on Glitch is a fast way to prototype and might even work for some small productions. The little server there doesn't have the power and bandwidth to host many people in a persistent session.  
- We're working on other networking ideas, but in the meantime you can host the website somewhere else (with node.js support) or simply remix it to distribute load among multiple servers. You can also host the [networking backend package](https://www.npmjs.com/package/@needle-tools/needle-tiny-networking-ws) itself somewhere else where it can scale e.g. Google Cloud.



## My website doesn't have AR/VR buttons
  
- Make sure to add the `WebXR` component somewhere inside your root `GltfObject`.
- Optionally add a `AR Session Root` component on your root `GltfObject` or within the child hierarchy to specify placement, scale and orientation for WebXR.
- Optionally add a `XR Rig` component to control where users start in VR


## I created a new script in a sub-scene but it does not work
  When creating new scripts in npmdefs in sub-scenes (that is a scene that is exported as a reference from a script in your root export scene) you currently have to re-export the root scene again. This is because the code-gen that is responsible for registering new scripts currently only runs for scenes with a ``ExportInfo`` component. This will be fixed in the future.


## My local server does not start / I do not see a website
  
The most likely reason is an incorrect installation. 
Check the console and the `ExportInfo` component for errors or warnings.  

If these warnings/errors didn't help, try the following steps in order. Give them some time to complete. Stop once your problem has been resolved. Check the console for warnings and errors.  
  
- Make sure you follow the [Prerequisites](./getting-started/#prerequisites).
- Install your project by selecting your `ExportInfo` component and clicking `Install` 
- Run a clean installation by selecting your `ExportInfo` component, holding Alt and clicking `Clean Install`
- Try opening your web project directory in a command line tool and follow these steps:
  - run ``npm install`` and then ``npm run dev-host``
  - Make sure both the local runtime package (``node_modules/@needle-tools/engine``) as well as three.js (``node_modules/three``) did install. 
  - You may run ``npm install`` in both of these directories as well.


## Does C# component generation work with javascript only too?
  While generating C# components does technically run with vanilla javascript too we don't recommend it and fully support it since it is more guesswork or simply impossible for the generator to know which C# type to create for your javascript class. Below you find a minimal example on how to generate a Unity Component from javascript if you really want to tho.    
  
```js
import { Behaviour } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    //@type float
    myField = 5;
}
```


## I don't have any buttons like "Generate Project" in my components/inspector
  
Please check that you're not accidentally in the Inspector's `Debug` mode – switch back to `Normal`:  
![20220824-025011-S2GQ-Unity_lKlT-needle](https://user-images.githubusercontent.com/2693840/186291615-56e7ebdb-1221-4326-813d-f88526fa126c.png)


## Toktx can not be found / toktx is not installed

- Make sure to [download and install toktx](http://localhost:8080/docs/getting-started/.html#install-these-tools-for-production-builds)

- On Windows: Make sure you have added toktx to your system environment variables. You may need to restart your computer after adding it to refresh the environment variables. The default install location is ``C:\Program Files\KTX-Software\bin``   

![image](/imgs/ktx-env-variable.webp)


## Installing the web project takes forever / does never finish / EONET: no such file or directory
- **Make sure to not create a project on a drive formatted as exFAT** because exFAT does not support symlinks, which is required for Needle Engine for Unity prior to version 3.x.    
  You can check the formatting of your drives using the following steps:
  1. Open "System Information" (either windows key and type that or enter "msinfo32" in cmd)
  2. Select Components > Storage > Drives
  3. Select all (Ctrl + A) on the right side of the screen and copy that (<kbd>Ctrl + C</kbd>) and paste here (<kbd>Ctrl + V</kbd>)

## NPM install fails and there are errors about hard drive / IO
Make sure your project is on a disk that is known to work with node.js. Main reason for failures is that the disk doesn't support symlinks (symbolic links / softlinks), which is a requirement for proper functioning of node.js.  
<kbd>NTFS</kbd> formatting should always work. Known problematic file system formattings are <kbd>exFAT</kbd> and <kbd>FAT32</kbd>. 

To check the format of your drives, you can:
1. Open "System Information" (either <kbd>Windows key</kbd> and type "System Information" or enter `msinfo32` in cmd <kbd>Windows + R</kbd>)
2. Select "Components > Storage > Drives"
3. There, you can see all drives and their formatting listed. Put your projects on a drive that is NTFS formatted.


## I'm getting errors with "Unexpected token `@`. Expected identifier, string literal, numeric literal or ..."

Needle Engine uses typescript decorators for serialization.   
To fix this error make sure to enable `experimentalDecorators` in your tsconfig.json 

## I'm getting an error 'failed to load config ... vite.config.js' when running npm commands on Mac OS

You're likely using an x86_64 version of Unity on an (ARM) Apple Silicon processor. Unity 2020.3 is only available for x86_64, later versions also have Apple Silicon versions.  
Our Unity integration calling npm will thus do so from an x86_64 process, resulting in the x86_64 version of node and vite/esbuild being used. When you afterwards try to run npm commands in the same project from an Apple Silicon app (e.g. VS Code), npm will complain about mismatching architectures with a long error message.  

To fix this, use an Apple Silicon version of Unity (2021.1 or later).  

You can also temporarily fix it on 2020.3 by deleting the `node_modules` folder and running `npm install` again from VS Code. You'll have to delete `node_modules` again when you switch back to Unity.

## Circular reference error

This can happen when you have e.g. a `SceneSwitcher` (or any other component that loads a scene or asset) and the referenced Asset in Unity contains a `GltfObject` that has the same name as your original scene with the `SceneSwitcher`. You can double check this in Unity if you get an error that says something like:

```
Failed to export ↑ YourSceneName.glb
you seem to have objects with the same name referencing each other.
```

To fix this you can:
- Remove the `GltfObject` in the referenced Prefab or Scene
- Rename the GameObject with the component that loads the referenced scenes

If this doesn't fix the problem please ask [in our forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content).

## My scene is not loading and the console contains a warning with 'circular references' or 'failed to update active state'
Please see the [circular reference error](#circular-reference-error) section.

## Does my machine support WebGL 2?

Use a detector [like this one](https://get.webgl.org/webgl2/) to determine if your device supports WebGL 2, it also hints at what could be the cause of your problem, but generally make sure you have updated your browser and drivers. WebGL 1 is not supported.

#### Known devices to cause issues:
- Lenovo Thinkpad - T495  

## I want to use Needle AI with my local AI model

If you want (or have to) run your AI locally you can use the Needle llms.txt files as context for your local AI (e.g. Ollama):

- [llms.txt](https://cloud.needle.tools/llms.txt)
- [llms-full.txt](https://cloud.needle.tools/llms-full.txt)


## Still have questions? 
[Ask in our forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) 

<a href="https://discord.needle.tools" target="_blank"><img height=20 src="https://img.shields.io/discord/717429793926283276?color=5562ea&label=Discord" /></a>

---
页面由 AI 自动翻译