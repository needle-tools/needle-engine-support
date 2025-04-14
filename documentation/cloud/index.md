---
title: Needle Cloud
description: 'Needle Cloud is an online service. It helps you store, manage, and share 3D assets and apps on the web.
 A variety of file formats are supported, including glTF, USD, FBX, VRM, and more. Spatial web apps made with Needle can be deployed to the cloud directly from the Unity integration, and via command line (CLI).'
---

<br/>
<discountbanner/>


# Needle Cloud

## Overview

Needle Cloud is an online service. It helps you store, manage, and share 3D assets and apps on the web.
A variety of file formats are supported, including glTF, USD, FBX, VRM, and more. Spatial web apps made with Needle can be deployed to the cloud directly from the Unity integration, and via command line (CLI). The Blender integration is coming at a later point; you can use the CLI in the meantime.

Visit [Needle Cloud](https://cloud.needle.tools) to get started.

![Needle Cloud Overview](/cloud/cloud-overview-page.webp)

## Features

1. **Host spatial web apps**  
   Apps made with Needle can be deployed to the cloud directly from our engine integrations. This allows you to give your team and customers public access to apps easily, without having to set up your own server. If needed, you can protect apps with a password.

2. **Manage 3D assets privately and securely**  
   Easily upload and organize your 3D files. Thanks to our fast CDN (content delivery network), your files are stored securely and can be accessed quickly from anywhere in the world.
   Needle Cloud is not a marketplace, and not a social network. It is designed for agencies, studios and creators to manage their assets privately and securely.

3. **Optimize 3D assets from a variety of formats**  
   Automatically compress your files to reduce their size while maintaining visual quality. This makes your files load faster, and saves bandwidth and memory on user's devices.

4. **Sharing and Version Control**  
   Links to your files can be shared with others and used directly in your projects. You can upload new versions of assets and apps. Individual versions can be labelled, which allows for flexible review workflows: for example, you can label a version as `main` or `experimental`. You can also revert labels back to a previous version if needed.

5. **Automation and Pipeline Tools via CLI**  
   The `needle-cloud` CLI (command line interface) makes it easy to automate uploading and optimizing files. This is useful for integrating Needle Cloud into your existing pipeline, or for automating the upload of large numbers of files.

6. **License Management**  
   Licenses for Needle Engine for solo creators and teams are managed through Needle Cloud. This ensures only authorized users can access your files and projects. Contact us for Enterprise and Edu licenses.

## Deploy from Unity

Needle Cloud is integrated into the Unity Editor. This allows you to deploy your apps directly from Unity to Needle Cloud. You can also upload and download assets from Needle Cloud directly in Unity.

1. **Install the Unity integration, if you haven't already.**   
   See [this page](./../unity/) for more info.

2. **Add the `Export Info` component to your scene.**   
   This component is used to configure the export settings for your app.  
   You can use the menu item `GameObject > Needle Engine > Add Export Info` or create a new scene from a Needle template via the menu item `File > New Scene`.

3. **Click on `Upload to Needle Cloud`.**   
   This will build your app, and upload it to Needle Cloud. You can also choose to deploy to a specific team and project. The _upload name_ of the project, visible next to the button, is saved in the scene. Future uploads will use the same upload name, and all uploaded versions will be grouped together on the Needle Cloud website.   
   
   ![Needle Cloud Unity Integration](/cloud/cloud-deploy-v1.webp)

## Deploy from the CLI

Needle Cloud provides a command line interface (CLI) that allows you to manage your assets and deploy your applications efficiently. You can use the CLI to automate tasks and integrate Needle Cloud into your existing workflows.

The CLI is available as an [npm package](https://www.npmjs.com/package/needle-cloud), which means that you need to have Node.js installed on your machine. You can check if you have Node.js installed by running the following command in your terminal:

```bash
node -v
```
If you don't have Node.js installed, you can download it from the [Node.js website](https://nodejs.org/).  

You can install the `needle-cloud` CLI package globally or use it via `npx`. This allows you to run the CLI commands without having to install it globally. 


1. **Use the npx command (recommended)**
   ```bash
   npx needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```
2. **Or install needle-cloud globally**  
   A global installation allows use to use the CLI from anywhere on your system. To install the CLI globally, run the following command in your terminal: 
   ```bash
   npm install -g needle-cloud
   ```
   Now, you can use the `needle-cloud` command in your terminal:

   ```bash
   needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```

### Automated Deployments
To deploy from **Github Actions** or **Stackblitz** you can provide an access token as `--token <access_token>`. Access tokens can be created on [your team page](https://cloud.needle.tools/team) on Needle Cloud. Make sure to create your token with `read/write` permissions.     

Use the [Needle Cloud Github Action](https://github.com/marketplace/actions/deploy-to-needle-cloud) to deploy an update from Github (e.g. every time when you push to the repository)

#### Example: Needle Cloud Github Action
```yml
      - name: Deploy to Needle Cloud
        uses: needle-tools/deploy-to-needle-cloud-action@v1.0.2
        id: deploy
        with:
            token: ${{ secrets.NEEDLE_CLOUD_TOKEN }}
            dir: ./dist
            name: vite-template # optional
```

#### Example: Deploy using a CLI command

```bash
# Deploy to Needle Cloud from e.g. a github action
npx needle-cloud deploy '/path/to/output' --team 'My team' --name 'some name or id' --token '<access_token>'
```

### CLI Help
Use `help` to see all available commandline options and help to individual commands.
```bash
# see all available options
npx needle-cloud help
# get help for a specific command e.g. deploy
npx needle-cloud help deploy
```


## Deployment URLs

When deploying to Needle Cloud, each upload gets a unique URL. You can either share a link to a _specific_ version, or to a _labeled_ version with your team or clients.

-----

In the following example, we have an app that has so far been deployed twice. Each deployment gets a specific URL, also known as a _pinned_ URL since it's pinned to a specific version.
1. [collaborativesandbox-zubcks1qdkhy<strong>-1qdkhy</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-1qdkhy.needle.run/)  
   This is the first version that was uploaded.
2. [collaborativesandbox-zubcks1qdkhy<strong>-2e2spt</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-2e2spt.needle.run/)  
   This is the second version that was uploaded.

The _latest_ deployment is always available at the following URL. This URL is useful for sharing with your team, as it always points to the most recent version of the app. Another common name for this version is _dev_ or _canary_.
- [collaborativesandbox-zubcks1qdkhy<strong>-latest</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-latest.needle.run/)  
  This URL automatically shows the new version when you upload a new version of the app.

The _main_ deployment is useful for sharing with clients, as it always points to the most recent version of the app that you promoted. Other common names for this version are _production_, _stable_, or _live_.
- [collaborativesandbox-zubcks1qdkhy.needle.run](https://collaborativesandbox-zubcks1qdkhy.needle.run/)  
  This URL does not change when you upload a new version. It will only change when you explicitly promote a new version to _main_.

Typically, you upload a new version, review it, and then decide whether you want to promote it to _main_.

-----

The Needle Cloud website shows all deployed versions of the app, including the latest and main versions. Labels can be moved by clicking on <kbd>⋮</kbd> and selecting <kbd>Set main label</kbd> or <kbd>Remove main label</kbd>.  

![Needle Cloud Version List](/cloud/cloud-edit-page.webp)

## Supported 3D Formats

1. **glTF and GLB** <a href="https://cloud.needle.tools/view?file=2oAMeWZ1hWL3C-latest-product" target="_blank">Example</a>   
   The glTF format is the most widely supported format for 3D on the web. It is a lightweight format that can store 3D models, animations, and textures. GLB files are binary versions of glTF files, where all data is stored in a single file.
   glTF supports advanced compression techniques like Draco, KTX2, and Meshopt, which are fully supported by Needle Cloud and Needle Engine.

2. **OpenUSD**   
   USD is a powerful format for 3D data interchange. It is known for its use in the film and VFX industry, and is gaining popularity in the game industry. Needle Cloud supports USDZ and USD files natively through our work on USD-WASM, and also converts USD files to glTF for further processing and optimization.

3. **FBX**  
   FBX has been a popular format for 3D data interchange for many years, but is lacking a number of modern features like PBR materials and extensions. Needle Cloud converts FBX files to glTF for further processing and optimization.  

4. **VRM**  
   VRM is a format for humanoid avatars. It is based on glTF with additional constraints through the use of glTF extensions. Needle Cloud supports VRM files natively, and can optimize them like other glTF files, including complex VRM extensions like phonemes, toon shading and dynamic bones.

5. **OBJ**  
   OBJ is a simple text-based format for 3D models. It supports basic materials through MTL files, animations, and hierarchies of objects. Needle Cloud converts OBJ files to glTF for further processing and optimization. 

:::tip Use glTF or USD when possible
We recommend glTF and USD as the primary formats for 3D data interchange. They are widely supported, have modern features and a good material model.
:::

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
  Use the provided code snippet to embed Needle Engine on your website as [web component](./../three/).

1. **model-viewer**  
  The [model-viewer](https://modelviewer.dev) project provides a web component for rendering simple, non-interactive 3D models in the browser.

1. **three.js**  
  If you're familiar with three.js, you can use the provided code snippet as a starting point for a three.js app that supports Needle Progressive Loading and efficiently loads files from Needle Cloud.

1. **React-Three-Fiber**  
  If you're using React-Three-Fiber, you can use the provided code snippet as a starting point for a project that supports Needle Progressive Loading and efficiently loads files from Needle Cloud.

1. **Unity**  
  If you're using Unity, you can integrate Needle Cloud assets directly into your projects using the Needle Cloud Asset component for seamless loading and optimization.

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

## CLI for Assets

The command line interface (CLI) for Needle Cloud allows automating file uploads and compression. The CLI can be used as part of a build step (replacing an asset with an optimized version), or as a standalone tool (for batch processing of files).

See [npm:needle-cloud](https://www.npmjs.com/package/needle-cloud) for more information about the CLI and how to use it.

## FAQ

1. **What is Needle Cloud?**   
   It’s an online service to upload, compress and share 3D assets and scenes.

2. **How do I upload assets to Needle Cloud?**   
   You can upload files by dragging them onto the website, or by uploading them directly from supported integrations. If you have many files, you can use the CLI (command line interface) or the API (application programming interface).

3. **How do I download optimized files from Needle Cloud?**   
   You can download files from the website. Click on `Share` and then `Download`. You can also use the CLI to download files.

4. **Can I share my files with others?**   
   Yes, you can create links to share your files. Links can either be direct download links, or links to the Needle Cloud viewer.

5. **Is there a limit to file sizes?**   
   Upload limits depend on your plan. Check your account details for more info.

6. **Can Needle Cloud files be used with other tools?**   
   Yes, you can use your files in other programs by exporting them as glTF. USD export is coming at a later point.

7. **What happens if I run out of storage space?**   
   You might need to upgrade your plan or delete old files to make room.
