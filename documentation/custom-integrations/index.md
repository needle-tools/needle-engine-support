<br/>
<!-- <div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> 
    +
    <span style="font-size: 50px;">✨</span> 
</div> -->

# Integrate with other tools

Needle Engine is designed to be flexible and extensible. It can be integrated with other tools and services to improve your workflow for bringing rich, interactive 3D to the web from any software.

At the core of a custom integration with Needle Engine is the glTF 3D format. This is the most widely supported format for 3D on the web, and the most versatile. This lightweight format can store 3D models, animations, textures, and all kinds of extra data. glTF is extensible, which is exactly why we chose it as the basis for Needle Engine. It allows us to add rich features and interactive capabilities to 3D files, including better rendering, physics, interactions, XR, networking, and more.

As a result of using the standardized glTF format for interchange, creating a basic integration into any software is easy – just export your 3D assets as glTF files and import them into Needle Engine. From there, you can add more features to your integration, to support our scripting extensions. Usually, this is done via a plugin, extension or export hook in your 3D software.

## Structure of a custom integration
The structure of a custom integration looks like this:

1. Export your 3D assets as glTF files. At this point, your integration is likely as simple as clicking the export button in your 3D software.
2. Use the glTF file in a web project using Needle Engine.
   - This can be a web project created with another integration, downloaded from a sample, or a new web project made with `npx needle-create`.
   - Export the glTF file into the `assets` folder. Your web app should automatically refresh whenever you re-export the glTF file.
3. At this point, you have a basic functional integration, and you could already add custom functionality via TypeScript in the web project.
4. The next step is to add a way to create and adjust components in your software. Depending on the software, this can be done through a custom UI, a script, or a plugin.
   - To start, try with a component like `DragControls`. It has a few options, but the defaults are good enough to get started.
   - Then, move onto components that require configuration. A good starting point are our `Everywhere Actions`, because they allow creators to build a wide range of interactive experiences without needing to write any code.
5. Export those components as part of the `NEEDLE_components` glTF extension for each node. Usually, this is done by adding a custom glTF extension or hook to the existing glTF exporter in your software.
6. Integrate with a web project so that UI can be generated for custom components. For Unity and Blender, we call this `Component Compiler` – it automatically creates a UI for the components in your project, and serves as a bridge between TypeScript components and your 3D software.

## Integrate the web project workflow

A fully-flegded integration might also manage more of the web project workflow. All of these operations can be done from the command line, but for ease of use, they can be neatly wrapped in a GUI or a custom menu in your 3D software. This includes:

1. Creating a new project or changing the location of the web project
2. Running the web project from within your 3D software
   - Our [Unity integration](./../unity/) overrides the "Play" button to run the web project.
   - The [Blender integration](./../blender/) has a custom "Play" button that runs the web project.
3. Building the web project to a folder
4. Uploading the built project to Needle Cloud or another platform, and remembering the Project ID and Team ID
   - Our Unity integration additionally shows the last uploads for your team, and allows you to jump to the last deployment of a project.
5. Uploading/downloading individual assets to Needle Cloud or another platform

:::tip Reach out if you're planning to build a custom integration!
Please reach out to us if you are interested in building a custom integration. We are happy to help you with the process, and explain more of the details. For Enterprise customers, we also provide custom integrations as a service.
:::