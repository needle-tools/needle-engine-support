---
title: Project Structure
---

# Needle Engine Project Structure

### Web Project Files

| | |
| --- | --- |
| **Needle Engine** | |
| [`needle.config.json`](./reference/needle-config-json.md) | Configuration for Needle Engine builds and integrations |
| **Ecosystem** | |
| `package.json` | Project configuration containing name, version, dependencies and scripts |
| `tsconfig.json` | Typescript compiler configuration |
| `.gitignore` | Files and folders to be ignored in git |
| `vite.config.js` | Contains vite specific configuration.<br/>It also adds the Needle Engine vite plugins. |


### Default Vite project structure

Our main project template uses the superfast [vite](https://vitejs.dev/) bundler. The following shows the structure of the Vite template that we created and ship (altough it is possible to adapt it to your own needs).

| | |
| --- | --- |
| **Folders** | |
| `assets/` | The asset folder contains exported assets from Unity. E.g. generated ``gltf`` files, audio or video files. It is not recommended to manually add files to ``assets`` as it will get cleared on building the distribution for the project.
| `include/` | (optional) - If you have custom assets that you need to reference/load add them to the include directory. On build this directory will be copied to the output folder.
| `src/generated/` | The generated javascript code. Do not edit manually!
| `src/scripts/` | Your project specific scripts / components
| `src/styles/` | Stylesheets
| `*` | You can add any new folders here as you please. Make sure to [copy](./reference/needle-config-json.md) them to the output directory when building |
| **Files** | |
| `index.html` | The landing- or homepage of your website
| `vite.config` | The [vite config](https://vitejs.dev/config/). Settings for building the distribution and hosting the development server are made here. It is usually not necessary to edit these settings.
| `src/main.ts` | Included from `index.html` and importing `needle-engine`
| `*` | You can add any new files here as you please. Make sure to [copy](./reference/needle-config-json.md) them to the output directory when building (unless they are just being used during development) |

Our exporter can be used with other project structures as well, vite is just our go-to frontend bundling tool because of its speed. Feel free to set up your JavaScript project as you like. 

[Learn more in the docs about bundling and usage with other frameworks](html.md)



---
# Unity Project Folders and Files


| Folder | |
| --- | --- |
| **Unity** | |
| `Assets` | This is where project specific/exclusive assets live. |
| `Packages` | This is where packages installed for this project live. A package can contain any asset type. The main difference is that it can be added to multiple Unity projects. It therefor is a great method to share code or assets. To learn more about packages see [the Unity documentation about packages](https://docs.unity3d.com/Manual/PackagesList.html).
| **Needle Engine Unity Package** | |
| ``Core/Runtime/Components`` | Contains all Needle Engine built-in runtime components (See `Packages/Needle Engine Exporter` in the Unity Project Window)


## Projects in Unity

When creating a new web project in Unity you can choose to create it from a local template (by default we ship a vite based web template). It is also possible to create custom local templates using the Project View context menu in `Create/Needle Engine/Project Template`.

![Unity ExportInfo local templates](/imgs/unity-project-local-template.jpg)

You can also reference remote templates by entering a repository URL in the ExportInfo project path (this can be saved with your scene for example). When creating a new web project the repository will be either cloned or downloaded (depending on if you have git installed) and searched for a `needle.config.json` file. If none can be found in the cloned repository the root directory will be used. Examples of remote template projects can be found on [github.com/needle-engine](https://github.com/needle-engine)

![Unity ExportInfo local templates](/imgs/unity-project-remote-template.jpg)

### Temporary Projects

If you're planning to only add custom files via NpmDefs and not change the project config (e.g. for a quick fullscreen test), you can prefix the project path with `Library`. The project will be generated in the Unity Project Library and does not need to be added to source control (the Library folder should be excluded from source control). We call these projects _temporary projects_. They're great for quickly testing out ideas!


## Typescript in Unity

**NPM Definition** are [npm packages](https://docs.npmjs.com/about-packages-and-modules) tightly integrated into the Unity Editor.    

That includes generating C# component stubs automatically. In the future, we're planning to support automatically copying assets to output/distribution folders as well. 

#### Creating and installing a npmdef
To create a *NPM Definition* right click in the Unity Project browser and select ``Create/NPM Definition``.   
You can **install a *NPM Definition* package** to your runtime project by e.g. selecting your ``Export Info`` component and adding it to the ``dependencies`` list (internally this will just add the underlying npm package to your package.json).

![image](https://user-images.githubusercontent.com/5083203/170374130-d0e32516-a1d4-4903-97c2-7ec9fa0b17d4.png)

Don't forget to install the newly added package by e.g. clicking Install on the ExportInfo component and also restart the server if it is already running

To edit the code inside a *NPM Definition* package just double click the asset *NPM Definition* asset in your project browser and it will open the vscode workspace that comes with each npmdef.



#### Continue Reading

- [Typescript Guide for Unity Developers](./getting-started/for-unity-developers.md)
- [Typescript Essentials](./getting-started/typescript-essentials.md)
- [Writing custom scripts](./scripting.md)
- [Everywhere Actions](./everywhere-actions.md)
