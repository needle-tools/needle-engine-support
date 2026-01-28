---
title: Needle Engine for Unity
description: Learn how to install Needle Engine for Unity and create interactive 3D web experiences. Export Unity scenes to optimized glTF, write TypeScript components with C# stubs, and deploy to any web platform with hot reload support.
editLink: true
---

# <logo-header logo="/imgs/unity-logo.webp" alt="Unity">Needle Engine for Unity</logo-header>

Create **highly interactive, flexible, and lightweight web applications** right inside Unity.

**What you can do:**
- Use Unity's powerful editor tools for 3D scenes, animation, and design
- Export scenes to optimized glTF format automatically
- Integrate seamlessly with any web frontend framework
- Deploy anywhere on the web


## Install the Unity Package


<NoDownloadYet>
  <br/>
  <needle-button 
    event_goal="download_unity" 
    event_position="getting_started" 
    large 
    href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"
    same_tab
    next_url="/docs/unity/"
    >
    <strong>Download Needle Engine for Unity</strong>
  </needle-button> 
</NoDownloadYet>

<!-- [Mirror](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)    -->

1. **Drop the downloaded .unitypackage file** into a Unity project and confirm that you want to import it.

2. **Wait a moment** for the installation and import to finish. A window may open stating that "A new scoped registry is now available in the Package Manager.". This is our Needle Package registry. You can safely close that window.  
3. **Explore Samples**.  
  Select the menu option `Needle Engine > Explore Samples` to view, open and modify all available [sample scenes](https://engine.needle.tools/samples).  

## Quickstart Video Tutorial

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />

## Getting Started Options

### 🎨 Start from a Sample (Recommended)

**100+ samples** covering a wide range of topics, use cases, and industries.

**Browse online:** [Samples page](https://engine.needle.tools/samples/)

**Install in Unity:**
1. Open `Needle Engine > Explore Samples`
2. Click **"Install Samples"** (or [download manually](http://engine.needle.tools/downloads/unity/samples))
3. Choose any sample and click **"Open Scene"**
4. Press Play!

:::tip Samples are Read-Only (Easy Updates!)
Samples are UPM packages, so they're read-only by design.

**To modify:**
- **Scenes:** When you open a sample via the Samples window, it's automatically copied to your `Assets/` folder where you can edit it
- **Additional Assets:** Some materials or assets may need to be manually copied to your `Assets/` folder, depending on the sample
- **Scripts:** Copy to your web project's `src/` folder to customize behavior
:::

### 🚀 Start from a Scene Template (Fast!)

**Go from idea to prototype in seconds** with pre-built scene templates.

**Steps:**
1. Click `File > New Scene`
2. Select a template with **(needle)** in the name
3. Click **"Create"**
4. Press Play!

**Recommended:** [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox) - includes interactivity, multiplayer, and physics.

![Unity Scene Templates with Needle Engine](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)


### ⚙️ Start from Scratch (Manual Setup)

Want full control? Follow these steps to recreate the "Minimal (Needle)" template manually.

**1. Create a new empty scene**

**2. Set up your scene for exporting**
- Add an empty GameObject, name it **"Exporter"**
- Add the **`Needle Engine`** component to it
- This component:
  - Creates and manages your web project
  - Shows warnings for outdated packages
  - Provides quick access to project settings

**3. Choose a web project template**

Select a template for your project. Default: <logo-header logo="/imgs/vite-logo.webp" alt="Vite">Vite</logo-header> (fast web bundler)

![Unity ExportInfo local templates](/imgs/unity-project-local-template.jpg)

**4. Press Play** to install and start your web project

:::tip Project Name & Location
By default, the project name matches your scene name. Change it via **"Directory Name"** (path is relative to your Unity project).
:::

:::tip Custom Templates
Create your own templates: `Project View > Create > Needle Engine > Project Template`

**Template types:**
- **Local:** Folder copied from disk
- **Remote:** GitHub repository cloned
:::

## Project Folders and Files

:::: file-tree name="Unity Project" showall="true"
::: file Assets/
This is where project specific/exclusive assets live.
::: 
::: file Packages/
This is where packages installed for this project live. A package can contain any asset type, and can be added to multiple Unity projects. It therefore is a great method to share code or assets. To learn more about packages, see [the Unity documentation about packages](https://docs.unity3d.com/Manual/PackagesList.html).
::: 
::: file Packages/Needle Engine/
Needle Engine for Unity is a package that contains all the necessary files to export your Unity scene to a web project. It also contains the built-in components and tools for creating interactive web projects. You can update the package via the Unity Package Manager.
:::
::: file Packages/Needle Engine/Core/
:::
::: file Packages/Needle Engine/Core/Runtime/
:::
::: file Packages/Needle Engine/Core/Runtime/Components/
Contains all built-in components for Needle Engine. You can learn more about them in the [Components Reference](./../component-reference.md). Looking at samples and going through this folder are great ways to see what components are available and how they can be used in your projects.
:::
:::: 

When creating a new web project in Unity, you can choose to create it from a local template (by default we ship a Vite based web template). 

### Use web projects directly from Github

Besides the web project templates that already ship with the Unity integration you can setup your web project directly from github by entering the Github repository URL in the Project Folder field.     

When creating a new web project the repository will be cloned (or downloaded if you don't have git installed). The repository is then searched for a `needle.config.json` file. If none can be found in the cloned repository the root directory will be used.   

Examples of remote template projects can be found on [github.com/needle-engine](https://github.com/needle-engine)

![Unity ExportInfo local templates](/imgs/unity-project-remote-template.jpg)

### Temporary Projects

If you're planning to only add custom files via NpmDefs and not change the project config (e.g. for a quick fullscreen test), you can prefix the project path with `Library`. The project will be generated in the Unity Project Library and does not need to be added to source control (the Library folder should be excluded from source control). We call these projects _temporary projects_. They're great for quickly testing out ideas!


## <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">TypeScript</logo-header> ↔ <logo-header logo="/imgs/csharp-logo.webp" alt="C#">Unity</logo-header>

Write TypeScript code that automatically becomes available in Unity as C# stub components.

**How it works:**
1. Write TypeScript classes in your web project
2. C# stubs are generated automatically
3. Attach components in Unity Editor
4. Properties marked with `@serializable` appear in Inspector
5. See changes in seconds (hot reload)

:::tip Perfect Team Workflow
**Web Developer:** Writes components, manages web project

**3D Designer:** Edits scenes, content, and settings in Unity

**Result:** Both see changes instantly with hot reload 🔥
:::

### Option 1: <logo-header logo="/imgs/folder-icon.webp" alt="Folder">Scripts Directory</logo-header> (Simple)

**Best for:** Single projects, quick prototyping

Add components in the `scripts` folder (usually `src/scripts/`). C# stubs are generated automatically.

**Example:**
```ts
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

export class MyComponent extends Behaviour {
  @serializable(Object3D)
  otherObject?: Object3D;

  start() {
    console.log("Hello World", this.otherObject);
  }
}
```

[Read more about scripting](../scripting.html)

---

### Option 2: <logo-header logo="/imgs/npm-logo.webp" alt="npm">NpmDef</logo-header> (Advanced)

**Best for:** Sharing code between multiple projects

**NPM Definitions** (NpmDef) are [NPM packages](https://docs.npmjs.com/about-packages-and-modules) integrated into Unity Editor.

**Benefits:**
- Share scripts across multiple web or Unity projects
- C# stubs generated automatically
- Version-controlled packages

#### Creating an NpmDef

**1. Create:**
- Right-click in Unity Project browser
- Select `Create > NPM Definition`

**2. Install to project:**
- Select your `Needle Engine` component
- Add the NpmDef to the **dependencies** list
- Click **"Install"**
- Restart the dev server

**3. Edit code:**
- Double-click the NpmDef asset
- Opens VSCode workspace automatically

![NpmDef in Unity](https://user-images.githubusercontent.com/5083203/170374130-d0e32516-a1d4-4903-97c2-7ec9fa0b17d4.png)

:::tip How it Works
Adding an NpmDef to dependencies adds the local NPM package to `package.json`:
```bash
# Equivalent to:
npm i <path/to/package>
```
:::

[Read more about scripting](../scripting.html)


## Troubleshooting

**Common issues:**

| Issue | Solution |
| --- | --- |
| Server won't start | [Install Node.js](../getting-started/#code-editor-and-tools) |
| Can't edit code | [Install VSCode](../getting-started/#code-editor-and-tools) (recommended) |
| Components not showing | Restart Unity or click "Generate C# Components" |
| Hot reload not working | Check console for errors, restart dev server |

[See full troubleshooting guide](../getting-started/)

---

## Next Steps

### 📚 Learn Core Concepts
- [Web Projects](../project-structure.html) - Project structure and files
- [Exporting Assets](../export.html) - glTF export process
- [Deployment](../deployment.html) - Share your website
- [Everywhere Actions](../everywhere-actions.html) - No-code interactivity

### 💻 Start Scripting
- [For Unity Developers](../getting-started/for-unity-developers.html) - Unity → Web guide
- [TypeScript Essentials](../getting-started/typescript-essentials.html) - Language basics
- [Scripting Reference](../scripting.html) - Write custom components
- [Component Reference](../component-reference.html) - Built-in components

### 🎯 Explore More
- [100+ Samples](https://engine.needle.tools/samples/) - Live examples
- [XR/AR Support](../xr.html) - VR and AR experiences
- [Networking](../networking.html) - Multiplayer and collaboration
