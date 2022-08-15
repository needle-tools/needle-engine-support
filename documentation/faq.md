# Frequently Asked Questions 💡

## My objects are white after export
This usually happens when you're using custom shaders or materials and their properties don't cleanly translate to known property names for glTF export.  
You can either make sure you're using glTF-compatible materials and shaders, or mark shaders as "custom" to export them directly.  
- Read more about recommended glTF workflows: <link>
- Read more about custom shaders: <link>

## My website becomes to large (too many MB)
This can have many reasons, but a few common ones are:
- too many textures or textures are too large
- meshes have too many vertices
- meshes have vertex attributes you don't actually need (e.g. have normals and tangents but you're not using them)
- objects are disabled and not ignored – disabled objects get exported as well in case you want to turn them on at runtime! Set their Tag to `EditorOnly` to completely ignore them for export.

## My scripts don't work after export
- Your existing C# code will *not* export as-is, you have to write matching typescript / javascript for it.
- Needle uses typescript / javascript for components and generates C# stubs for them.
- Components that already have matching JS will show that in the Inspector.

## My lightmaps look different
- Ensure you're following best practices for lightmaps: <link>

## My colors look wrong
- Ensure your project is set to Linear colorspace

## I'm using networking and Glitch and it doesn't work if more than 30 people visit the Glitch page at the same time
- Deploying on Glitch is a fast way to prototype and might even work for some small productions. The little server there doesn't have the power and bandwidth to host many people in a persistent session.  
- We're working on other networking ideas, but in the meantime you cab host the website somewhere else (with node.js support) or simply remix it to distribute load among multiple servers.

## My website doesn't have AR/VR buttons
- Make sure to add the `WebXR` component somewhere inside your root `GltfObject`.
- Optionally add a `AR Session Root` on your root `GltfObject` to specify scale and orientation for WebXR.

## 
