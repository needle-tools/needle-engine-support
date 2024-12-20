<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/>
</div>

# Needle Cloud

## Overview

Needle Cloud is an online service. It helps you store, manage, and share 3D assets and apps on the web.
A variety of file formats are supported, including glTF, USD, FBX, VRM, and more. Spatial web apps made with Needle can be deployed to the cloud directly from the Unity integration (Blender integration support is coming at a later point).

Visit [Needle Cloud](https://cloud.needle.tools) to get started.

## Features

1. **Spatial Web Hosting**  
   Apps made with Needle can be deployed to the cloud directly from our engine integrations. This allows you to host your apps publicly, without having to set up your own server.

1. **Asset Management**  
   Easily upload and organize your 3D files. Thanks to our fast CDN, your files are stored securely and can be accessed quickly from anywhere in the world. Links to your files can be shared with others and used directly in your projects.

1. **3D Asset Optimization**  
   Automatically compress your files to reduce their size while maintaining visual quality. This makes your files load faster and saves bandwidth and graphics memory.

1. **Version Control**  
   Keep track of all the changes made to your files. Versions can be tagged, which allows for flexible review workflows – for example, you can tag a version as "main" or "experimental".

1. **Collaboration Tools**  
   Share your files with others and work together on projects.

1. **License Management**  
   Licenses for Needle Engine for invidiuals and teams are managed through Needle Cloud. 

## Supported 3D Formats

1. **glTF** and **glb**  
   The glTF format is the most widely supported format for 3D on the web. It is a lightweight format that can store 3D models, animations, and textures. glTF supports advanced compression techniques like Draco and KTX2, which are fully leveraged by Needle Cloud and Needle Engine.

2. **OpenUSD**   
   USD is a powerful format for 3D data interchange. It is known for its use in the film and VFX industry, and is gaining popularity in the game industry. Needle Cloud supports USDZ and USD files natively through our work on USD-WASM.  

3. **FBX**  
   FBX has been a popular format for 3D data interchange for many years, but is lacking a number of modern features like PBR materials and extensions. Needle Cloud converts FBX files to glTF for further processing.  

4. **VRM**  
   VRM is a format for humanoid avatars. It is based on glTF with additional constraints through the use of glTF extensions. Needle Cloud supports VRM files natively, and can optimize them like other glTF files, including complex VRM extensions like phonemes, toon shading and dynamic bones.

5. **OBJ**  
   OBJ is a simple text-based format for 3D models. Needle Cloud converts OBJ files to glTF for further processing and supports MTL materials. 

## Cloud Assets

### Uploading Assets

You can upload your files easily by dragging them into the website or selecting them from your computer.
Non-glTF files are automatically converted to glTF for further processing, but the original files are kept for download and web viewing. 

### Asset Versions

When you visit the Edit Page of an asset, you can see all versions that were uploaded so far by you or your team. You can also tag versions to mark them as "main" or "experimental". "Latest" is the default tag for the most recent version.

### Sharing Links to Assets

You can create links to share specific files or tagged files with your team or clients. Tagged links will automatically update when you move the tag – so you can share a "main" link once and keep updating the file without having to send a new link.

### Using Cloud Assets in Needle Engine

Files stored in Needle Cloud can be brought directly into Needle Engine projects easily. The `Needle Cloud Asset` component takes a link to an asset, and loads it at runtime. This allows you to keep your project size small and load assets on demand that can still be updated in the cloud. 

::: tip Use Progressive Loading where possible
Assets stored on Needle Cloud are automatically optimized for ideal runtime usage using our Progressive Loading technology. For each mesh and texture, multiple level-of-detail versions are generated, and only the parts of the asset that are needed are loaded at runtime. 

This save a lot of bandwidth and memory (typically 90% or more compared to loading the full asset).
:::

### Embedding the Cloud Viewer on Your Website

A fast way to bring 3D to your own website is to **embed** the Needle Cloud viewer. 
To do so, go to an asset's Edit Page and click on <kbd>Embed</kbd>. You can then copy the `iframe` code snippet and paste it into your website.

::: tip Embedding specific versions
You can also embed the viewer with a direct link to the asset, or with a specific tag. This allows you to update the asset on Needle Cloud without having to update the embed code on your website. 
:::

### Embedding in other frameworks

The following embed options are available:
1. **Needle Cloud Viewer**  
   Use the `iframe` code snippet to embed the Needle Cloud viewer on your website.

1. **Needle Engine**  
  Use the provided code snippet to embed the Needle Engine on your website.

1. **model-viewer**  
  The [model-viewer](https://modelviewer.dev) project provides a web component for rendering simple, non-interactive 3D models in the browser.

1. **three.js**  
  If you're familiar with three.js, you can use the provided code snippet as a starting point for a three.js app that supports Needle Progressive Loading and efficiently loads files from Needle Cloud.

1. **React-Three-Fiber**  
  If you're using React-Three-Fiber, you can use the provided code snippet as a starting point for a project that supports Needle Progressive Loading and efficiently loads files from Needle Cloud.


### Using Cloud Assets with other engines like Unity or Unreal

There are several ways to use assets stored on Needle Cloud in other engines like Unity or Unreal.
1. **Download and Import**  
   You can download the asset and import it into your project.

2. **Direct Link**   
   You can use the direct link to the asset in your project. This way, you can update the asset on Needle Cloud and it will automatically update in your project. Which link to use depends on the engine and its glTF capabilities:
    - Support for **glTF with Progressive Loading**:   
      Use the `Progressive-World` or `Progressive-Product` link.
      See [npm:@needle-tools/gltf-progressive](https://www.npmjs.com/package/@needle-tools/gltf-progressive) for more information about progressive loading and how to enable it for your engine.

    - Support for **glTF with Draco and KTX2**:
      Use the `Optimized` link.
    - Support for glTF, but **no compression extensions**:  
      Use the `Upload` (for gltf/glb uploads) or `Converted` (for other uploads) link.

3. **Needle Cloud Asset Component**   
   If you are using Needle Engine, you can use the `Needle Cloud Asset` component to load assets at runtime. It will automatically choose the best link for your platform and load the asset with Progressive Loading. This is also supported at runtime in Unity Builds.

## Programmatic Usage

### CLI (Command Line Interface)

The Command Line Interface (CLI) allows automating file uploads and compression. The CLI can be used as part of a build step, or as standalone tool.

See [npm:needle-cloud](https://www.npmjs.com/package/needle-cloud) for more information.

### API (Application Programming Interface)

::: warning <b>Under construction.</b> This section is not yet complete.
:::

## FAQ

1. **What is Needle Cloud?**   
   It’s a service to upload, compress and share your 3D files online.

1. **How do I upload assets to Needle Cloud?**   
   You can upload files by dragging them onto the website, or by uploading them directly from supported integrations. If you have many files, you can use the CLI (command line interface) or the API (application programming interface).

1. **Can I share my files with others?**   
   Yes, you can create links to share your files. Links can either be direct download links, or links to the Needle Cloud viewer.

1. **Is there a limit to file sizes?**   
   Upload limits depend on your plan. Check your account details for more info.

1. **Can Needle Cloud files be used with other tools?**   
   Yes, you can use your files in other programs by exporting them as glTF. USD export is coming at a later point.

1. **What happens if I run out of storage space?**   
   You might need to upgrade your plan or delete old files to make room.