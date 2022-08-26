# Questions And Answers 💡

<details>
<summary><b>My objects are white after export</b></summary>
  
This usually happens when you're using custom shaders or materials and their properties don't cleanly translate to known property names for glTF export.  
You can either make sure you're using glTF-compatible materials and shaders, or mark shaders as "custom" to export them directly.  
- Read more about recommended glTF workflows: <link>
- Read more about custom shaders: <link>
</details>

<details>
<summary><b>There's a SSL error when opening the local website</b></summary>

This is expected. We're enforcing HTTPS to make sure that WebXR and other modern web APIs work out-of-the-box, but that means some browsers complain that the SSL connection (between your local development server and the local website) can't be verified.   

You can generate a local self-signed SSL certificate to fix this if you want.  
  
</details>

<details>
<summary><b>My local website stays black</b></summary>
  
If that happens there's usually an exception either in engine code or your code. Open the dev tools (<kbd>Ctrl + Shift + I</kbd> in Chrome) and check the Console for errors.  
In some cases, especially when you just updated the Needle Engine package version, this can be fixed by stopping and restarting the local dev server.  
For that, click on the running progress bar in the bottom right corner of the Editor, and click the little <kbd>X</kbd> to cancel the running task. Then, simply press Play again.  

</details>

<details>
<summary><b>My website becomes to large (too many MB)</b></summary>
  
This can have many reasons, but a few common ones are:
- too many textures or textures are too large
- meshes have too many vertices
- meshes have vertex attributes you don't actually need (e.g. have normals and tangents but you're not using them)
- objects are disabled and not ignored – disabled objects get exported as well in case you want to turn them on at runtime! Set their Tag to `EditorOnly` to completely ignore them for export.
  
If loading time itself is an issue you can **try to split up your content into multiple glb files** and load them on-demand (this is what we do on our website). For it to work you can put your content into Prefabs or Scenes and reference them from any of your scripts. Please have a look at [Scripting/Addressables in the documentation](./scripting.md#assetreference-and-addressables).
</details>

<details>
<summary><b>My scripts don't work after export</b></summary>
  
- Your existing C# code will *not* export as-is, you have to write matching typescript / javascript for it.  
- Needle uses typescript / javascript for components and generates C# stubs for them.  
- Components that already have matching JS will show that in the Inspector.  
</details>

<details>
<summary><b>My lightmaps look different / too bright</b></summary>

Ensure you're following [best practices for lightmaps](https://docs.needle.tools/lightmaps) and read about [mixing baked and non-baked objects](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects)
</details>

<details>
<summary><b>My scene is too bright / lighting looks different than in Unity</b></summary>
Make sure that your lights are set to "Baked" or "Realtime". "Mixed" is currently not supported.  
  
- Lights set to mixed (with lightmapping) do affect objects twice in three.js, since there is currently no way to exclude lightmapped objects from lighting
- The ``Intensity Multiplier`` factor for Skybox in ``Lighting/Environment`` is currently not supported and has no effect in Needle Engine  
  ![image](https://user-images.githubusercontent.com/5083203/185429006-2a5cd6a1-8ea2-4a8e-87f8-33e3afd080ec.png)
- Light shadow intensity can currently not be changed due to a three.js limitation.
  
Also see the docs on [mixing baked and non-baked objects](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects).

</details>

<details>
<summary><b>My Shadows are not visible or cut off</b></summary>  
  
Please the following points:   
  
  - Your light has shadows enabled (either Soft Shadow or Hard Shadow)
  - Your objects are set to "Cast Shadows: On" (see MeshRenderer component)
  - For directional lights the position of the light is currently important since the shadow camera will be placed where the light is located in the scene.

</details>

<details>
<summary><b>My colors look wrong</b></summary>
  
Ensure your project is set to Linear colorspace.
</details>

<details>
<summary><b>I'm using networking and Glitch and it doesn't work if more than 30 people visit the Glitch page at the same time</b></summary>
  
- Deploying on Glitch is a fast way to prototype and might even work for some small productions. The little server there doesn't have the power and bandwidth to host many people in a persistent session.  
- We're working on other networking ideas, but in the meantime you can host the website somewhere else (with node.js support) or simply remix it to distribute load among multiple servers. You can also host the [networking backend package](https://www.npmjs.com/package/@needle-tools/needle-tiny-networking-ws) itself somewhere else where it can scale e.g. Google Cloud.
</details>

<details>
<summary><b>My website doesn't have AR/VR buttons</b></summary>
  
- Make sure to add the `WebXR` component somewhere inside your root `GltfObject`.
- Optionally add a `AR Session Root` component on your root `GltfObject` or within the child hierarchy to specify placement, scale and orientation for WebXR.
- Optionally add a `XR Rig` component to control where users start in VR
</details>

<details>
<summary><b>I created a new script in a sub-scene but it does not work</b></summary>
  When creating new scripts in npmdefs in sub-scenes (that is a scene that is exported as a reference from a script in your root export scene) you currently have to re-export the root scene again. This is because the code-gen that is responsible for registering new scripts currently only runs for scenes with a ``ExportInfo`` component. This will be fixed in the future.
</details>

<details>
  <summary><b>My local server does not start / I do not see a website</b></summary>
  
The most likely reason is an incorrect installation. 
Check the console and the `ExportInfo` component for errors or warnings.  

If these warnings/errors didn't help, try the following steps in order. Give them some time to complete. Stop once your problem has been resolved. Check the console for warnings and errors.  
  
- Make sure you follow the [Prerequisites](./getting_started.md#prerequisites-).
- Install your project by selecting your `ExportInfo` component and clicking `Install` 
- Run a clean installation by selecting your `ExportInfo` component, holding Alt and clicking `Clean Install`
- Try opening your web project directory in a command line tool and follow these steps:
  - run ``npm install`` and then ``npm run dev-host``
  - Make sure both the local runtime package (``node_modules/@needle-tools/engine``) as well as three.js (``node_modules/three``) did install. 
  - You may run ``npm install`` in both of these directories as well.

</details>


<details>
  <summary><b>Does C# component generation work with javascript only too?</b></summary>
  While generating C# components does technically run with vanilla javascript too we don't recommend it and fully support it since it is more guesswork or simply impossible for the generator to know which C# type to create for your javascript class. Below you find a minimal example on how to generate a Unity Component from javascript if you really want to tho.    
  
```js
class MyScript extends Behaviour
{
    //@type float
    myField = 5;
}
```
</details>

<details>
<summary><b>I don't have any buttons like "Generate Project" in my components/inspector</b></summary>  
  
Please check that you're not accidentally in the Inspector's `Debug` mode – switch back to `Normal`:
  ![20220824-025011-S2GQ-Unity_lKlT-needle](https://user-images.githubusercontent.com/2693840/186291615-56e7ebdb-1221-4326-813d-f88526fa126c.png)

</details>

<details>
  <summary><b>...</b></summary>

</details>


## Still have questions? 😱
[Ask in our friendly discord community](https://discord.needle.tools)
