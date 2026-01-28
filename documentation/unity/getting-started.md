---
title: Getting Started with Unity
description: Complete tutorial for setting up your first Needle Engine project in Unity - from samples to manual setup, TypeScript components, and NpmDef packages
---

# Getting Started with Unity

Learn how to create your first interactive web project with Needle Engine in Unity.

:::tip Already Installed?
If you haven't installed Needle Engine for Unity yet, see the [Unity Integration page](./index) first.
:::

:::tip Unity Developer?
New to web development? Start with **[For Unity Developers](../tutorials/fundamentals/for-unity-developers)** to learn how Unity concepts translate to Needle Engine and TypeScript.
:::

:::details Video: Getting Started with Unity (16 minutes)
This comprehensive video tutorial walks you through setting up Needle Engine in Unity and creating your first interactive web project.

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />
:::

---

## Choose Your Starting Point

There are three ways to get started. Pick the one that fits your workflow:

### 🎨 Start from a Sample (Recommended)

**Best for:** Learning, exploring features, getting inspired

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

---

### 🚀 Start from a Scene Template (Fast!)

**Best for:** Quick prototypes, starting fresh projects

**Go from idea to prototype in seconds** with pre-built scene templates.

**Steps:**
1. Click `File > New Scene`
2. Select a template with **(needle)** in the name
3. Click **"Create"**
4. Press Play!

**Recommended:** [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox) - includes interactivity, multiplayer, and physics.

![Unity Scene Templates with Needle Engine](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)

---

### ⚙️ Start from Scratch (Manual Setup)

**Best for:** Full control, understanding the workflow

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

![Unity Needle Engine local templates](/imgs/unity-project-local-template.jpg)

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

---

## Understanding Project Structure

When you create a Needle Engine project, you get both Unity assets and a web project:

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
Contains all built-in components for Needle Engine. You can learn more about them in the [Components Reference](../reference/components). Looking at samples and going through this folder are great ways to see what components are available and how they can be used in your projects.
:::
::::

**Web Project Location:**

When creating a new web project in Unity, you can choose to create it from a local template (by default we ship a Vite based web template). The web project lives alongside your Unity project:

```
MyUnityProject/
├── Assets/
└── MyUnityProject-Web/    ← Your web project
```

### Use Web Projects Directly from Github

Besides the web project templates that already ship with the Unity integration you can setup your web project directly from github by entering the Github repository URL in the Project Folder field.

When creating a new web project the repository will be cloned (or downloaded if you don't have git installed). The repository is then searched for a `needle.config.json` file. If none can be found in the cloned repository the root directory will be used.

Examples of remote template projects can be found on [github.com/needle-engine](https://github.com/needle-engine)

![Unity Needle Engine remote templates](/imgs/unity-project-remote-template.jpg)

### Temporary Projects

If you're planning to only add custom files via NpmDefs and not change the project config (e.g. for a quick fullscreen test), you can prefix the project path with `Library`. The project will be generated in the Unity Project Library and does not need to be added to source control (the Library folder should be excluded from source control). We call these projects _temporary projects_. They're great for quickly testing out ideas!

---

## <logo-header logo="/imgs/typescript-logo.webp" alt="TypeScript">Writing TypeScript Components</logo-header>

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

**What happens next:**
1. Save the TypeScript file
2. A C# stub is generated in `Assets/Needle/Components.codegen/`
3. The component appears in Unity's Add Component menu
4. Attach it to GameObjects and configure properties in the Inspector

[Learn more about creating components →](../how-to-guides/scripting/create-components)

---

### Option 2: <logo-header logo="/imgs/npm-logo.webp" alt="npm">NpmDef</logo-header> (Advanced)

**Best for:** Sharing code between multiple projects, team workflows

**NPM Definitions** (NpmDef) are [NPM packages](https://docs.npmjs.com/about-packages-and-modules) integrated into Unity Editor.

**Benefits:**
- Share scripts across multiple web or Unity projects
- C# stubs generated automatically
- Version-controlled packages
- Easier collaboration and code reuse

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

**Example NpmDef structure:**
```
MyPackage/
├── package.json
├── src/
│   └── MyComponent.ts
└── README.md
```

[Learn more about scripting →](../how-to-guides/scripting/create-components)

---

## Troubleshooting

**Common issues:**

| Issue | Solution |
| --- | --- |
| Server won't start | [Install Node.js](../getting-started/#prerequisites) (version 18.x or newer) |
| Can't edit code | [Install VSCode](../getting-started/#code-editor-and-tools) (recommended editor) |
| Components not showing in Unity | Restart Unity or click "Generate C# Components" on Needle Engine component |
| Hot reload not working | Check console for errors, restart dev server with "Install" button |
| Web project not found | Check the Directory Name field points to correct location |
| Port already in use | Change port in `vite.config.js` or close other dev servers |

**Still having issues?**
- Check the [FAQ](../reference/faq) for more solutions
- Ask in [Discord](https://discord.needle.tools) for community help
- Review the [full troubleshooting guide](../reference/faq)

---

## Next Steps

Now that you have your first project set up, continue learning:

### Learn the Unity Workflow
- [Working with Unity Integration](../tutorials/fundamentals/unity-integration) - Complete Unity workflow guide
- [Exporting Assets](../how-to-guides/export/) - What gets exported and how
- [Editor Sync](./editor-sync) - Live sync between Unity and browser

### Start Scripting
- [For Unity Developers](../tutorials/fundamentals/for-unity-developers) - Complete learning path
- [C# to TypeScript Translation](../tutorials/fundamentals/c-sharp-to-typescript) - Translate your C# knowledge
- [TypeScript Essentials](../tutorials/fundamentals/typescript-essentials) - Language basics

### Explore Features
- [Component Reference](../reference/components) - All built-in components
- [XR/AR Support](/docs/how-to-guides/xr/) - VR and AR experiences
- [Networking](/docs/how-to-guides/networking/) - Multiplayer and collaboration
- [Deployment](../how-to-guides/deployment/) - Share your website

### Get Inspired
- [100+ Samples](https://engine.needle.tools/samples/) - Interactive examples
- [Showcase](https://samples.needle.tools/#showcase) - Community projects
- [Video Tutorials](https://www.youtube.com/@needle-tools) - Step-by-step guides
