# Frequently Asked Questions 💡

<details>
<summary><b>My objects are white after export</b></summary>
  
This usually happens when you're using custom shaders or materials and their properties don't cleanly translate to known property names for glTF export.  
You can either make sure you're using glTF-compatible materials and shaders, or mark shaders as "custom" to export them directly.  
- Read more about recommended glTF workflows: <link>
- Read more about custom shaders: <link>
</details>

<details>
<summary><b>My website becomes to large (too many MB)</b></summary>
  
This can have many reasons, but a few common ones are:
- too many textures or textures are too large
- meshes have too many vertices
- meshes have vertex attributes you don't actually need (e.g. have normals and tangents but you're not using them)
- objects are disabled and not ignored – disabled objects get exported as well in case you want to turn them on at runtime! Set their Tag to `EditorOnly` to completely ignore them for export.
</details>

<details>
<summary><b>My scripts don't work after export</b></summary>
  
- Your existing C# code will *not* export as-is, you have to write matching typescript / javascript for it.  
- Needle uses typescript / javascript for components and generates C# stubs for them.  
- Components that already have matching JS will show that in the Inspector.  
</details>

  <details>
<summary><b>My lightmaps look different</b></summary>
  
Ensure you're following best practices for lightmaps: <link>
</details>

<details>
<summary><b>My colors look wrong</b></summary>
  
Ensure your project is set to Linear colorspace.
</details>

<details>
<summary><b>I'm using networking and Glitch and it doesn't work if more than 30 people visit the Glitch page at the same time</b></summary>
  
- Deploying on Glitch is a fast way to prototype and might even work for some small productions. The little server there doesn't have the power and bandwidth to host many people in a persistent session.  
- We're working on other networking ideas, but in the meantime you cab host the website somewhere else (with node.js support) or simply remix it to distribute load among multiple servers.
</details>

<details>
<summary><b>My website doesn't have AR/VR buttons</b></summary>
  
- Make sure to add the `WebXR` component somewhere inside your root `GltfObject`.
- Optionally add a `AR Session Root` on your root `GltfObject` to specify scale and orientation for WebXR.
</details>

<details>
<summary><b>I created a new script in a sub-scene but it does not work</b></summary>
  When creating new scripts in npmdefs in sub-scenes (that is a scene that is exported as a reference from a script in your root export scene) you currently have to re-export the root scene again. This is because the code-gen that is responsible for registering new scripts currently only runs for scenes with a ``ExportInfo`` component. This will be fixed in the future.
</details>

<details>
  <summary><b>...</b></summary>
</details>
