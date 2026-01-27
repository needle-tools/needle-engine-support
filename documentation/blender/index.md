---
title: Needle Engine for Blender
description: Create interactive web experiences directly from Blender
editLink: true
---

# <logo-header logo="/blender/logo.png" alt="Blender">Needle Engine for Blender</logo-header>

**Create interactive 3D web experiences directly from Blender.** This integration brings the power of Needle Engine to your favorite 3D tool, letting you export scenes, animations, and interactive elements to the web with a single click.

:::tip What You'll Learn
This guide covers installation, basic setup, and your first interactive web project. By the end, you'll have a working 3D website running in your browser.
:::

---

## Prerequisites

Before installing the Needle Engine add-on, make sure you have:

<ClientOnly>

- <a target="_blank" href="https://www.blender.org/download/"><strong>Blender 4.5+ LTS</strong></a> - Your 3D creation tool
- <os-link windows_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi" osx_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0.pkg"><strong>Node.js 20 LTS</strong></os-link> - Required for running the local web server

</ClientOnly>

---

## Step 1: Download and Install

### Download the Add-on

<NoDownloadYet>
    <needle-button
        event_goal="download_blender"
        event_position="getting_started"
        large
        href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"
        same_tab
        next_url="/docs/blender/"
        >
        <strong>Download Needle Engine for Blender</strong>
    </needle-button>
</NoDownloadYet>

### Install in Blender

1. **Open Blender Preferences**
   - Go to `Edit > Preferences > Add-ons`
   - Click the dropdown arrow next to the install button
   - Select `Install from Disk`

2. **Select the Download**
   - Navigate to your downloaded file (named `needle-blender-plugin-*.zip`)
   - Click `Install Add-on`

3. **Enable the Add-on**
   - Search for "Needle" in the Add-ons search bar
   - Check the box next to `Needle Engine Exporter for Blender`

![Blender Add-on Settings](/blender/settings.webp)

---

## Step 2: Create Your First Project

Now that the add-on is installed, let's create your first interactive web experience.

### Option A: Start with a Sample Project

**Recommended for first-time users** - Sample projects show you what's possible and give you working examples to learn from.

[Download Blender Samples](https://engine.needle.tools/downloads/blender/download-samples?utm_source=needle_docs&utm_content=blender)

Open any sample `.blend` file, then skip to [Step 3: Generate Web Project](#step-3-generate-web-project).

### Option B: Start from Scratch

1. **Create or Open a Blender File**
   - Create a new `.blend` file or open an existing one
   - This will be the 3D scene that gets exported to the web

2. **Locate the Needle Engine Panel**
   - Open the Properties panel (usually on the right)
   - Click the Scene Properties tab (icon looks like a scene/camera)
   - Find the **Needle Engine** panel

![Needle Engine Project Panel](/blender/project-panel.webp)

---

## Step 3: Generate Web Project

1. **Set Project Path**
   - In the Needle Engine panel, click the folder icon next to `Project Path`
   - Choose where to create your web project folder
   - This creates a separate folder with all web files

2. **Generate Project**
   - Click the `Generate Project` button
   - Needle Engine will:
     - Create a web project with all necessary files
     - Install dependencies (this may take a minute)
     - Start a local development server
     - Open your browser automatically

3. **See Your Scene Live**
   - Your browser should open showing your 3D scene
   - The scene updates automatically when you save in Blender
   - Hot reload keeps everything in sync

<video-embed src="/docs/blender/environment-light.mp4" />

*Live sync in action: Changes to lighting and materials in Blender instantly update in the browser.*

:::tip Automatic Export
By default, your scene is automatically re-exported whenever you save the `.blend` file. The website refreshes automatically if the local server is running.
:::

---

## Step 4: Working with Your Project

Once your project is generated, you'll see additional options:

![Project Panel - Running State](/blender/project-panel-2.webp)

### Running Your Project

- **Run Project** (blue button) - Starts the local development server
- The server must be running to see live updates in the browser
- Your scene is accessible at `http://localhost:3000` (or similar)

### Understanding the Project Panel

![Needle Engine Project Panel Overview](/blender/project-panel-3.webp)

The Needle Engine panel provides quick access to common tasks:

1. **Project Path** - Location of your web project folder (click folder icon to change)
2. **Run Project** - Start the local development server (appears when project is valid)
3. **Directory** - Opens your web project folder in file explorer
4. **Export** - Manually re-export scene as GLB (also happens automatically on save)
5. **Code Editor** - Opens VS Code with your project
6. **Main Scene** - Select which scene to export (useful for multi-scene files)
7. **Build Buttons** - Create production-ready builds for deployment
   - `Development` - Fast build for testing
   - `Production` - Optimized build with compressed textures
8. **Documentation** - Opens this documentation

---



## Essential Setup

### Color Management - Match Colors Between Blender and Web

By default, Blender uses `Filmic` color management, which makes colors look different in the browser.

**To ensure colors match:**

1. Open the **Render Properties** tab in Blender
2. Find the **Color Management** section
3. Set `View Transform` to **Standard**

![Correct color management settings](/blender/settings-color-management.webp)

:::tip Why This Matters
`Filmic` applies a cinematic tone curve that looks great for renders but doesn't match how three.js displays colors. `Standard` gives you accurate color reproduction.
:::

---


### Environment Lighting - Setup HDRI and Skybox

Needle Engine automatically exports your environment lighting settings from Blender.

**Quick Setup:**

1. Open **Viewport Shading** options (top right of 3D viewport)
2. Assign an HDRI cubemap for lighting and/or background
3. Adjust `Strength` and `Blur` to taste
4. Increase `World Opacity` to 1 to show the skybox in the browser

![Environment lighting options](/blender/environment.webp)

<video-embed limit_height max_height="300px" src="/docs/blender/environment.mp4" />

:::tip Alternative: Scene World
Enable `Scene World` in the Viewport Shading tab to use the environment texture from Blender's World settings instead.
:::

**Using Custom HDRI Files:**

<video-embed limit_height src="/docs/blender/custom_hdri.mp4" />

**Camera-Specific Settings:**

For more control, add a `Camera` component to your Blender camera:
- Set `clearFlags: SolidColor` to hide the skybox but keep lighting
- Adjust `backgroundBlurriness` and `backgroundIntensity`
- These settings override Viewport Shading options

![Camera component settings](/blender/environment-camera.webp)

--- 


### Controlling What Gets Exported

**To exclude objects from export:**
- Disable both **Viewport** and **Render** visibility icons in the Outliner

![Exclude objects from export](/blender/dont-export.webp)

Only objects visible in both viewport and render will be exported to your web project.

---


## Adding Interactivity

### Animation Playback

Needle Engine offers multiple ways to animate your 3D content on the web.

#### Simple Animation Component

For basic animation playback, use the `Animation` component:

1. Select your animated object in Blender
2. Add an `Animation` component (Needle Components panel)
3. Assign your animation clip
4. Enable `playAutomatically` to start on load

<video-embed limit_height src="/docs/blender/animation.mp4" />

:::tip Multiple Clips
Add additional clips to the `clips` array. By default, only the first clip plays automatically. Trigger others using custom TypeScript or UI buttons.
:::   

#### AnimatorController - State Machine Animations

For complex character animations or interactive state-based systems, use the **AnimatorController**.

<video-embed src="/docs/blender/animatorcontroller-web.mp4" />

*State machine animations for complex character control*

**What is an AnimatorController?**
- A visual state machine graph for managing animation transitions
- Define multiple animation states and conditions for switching between them
- Configure blend times and transition rules
- Perfect for character controllers, interactive objects, and game mechanics

**Creating an AnimatorController:**

1. **Open the Editor**
   - Use the `Editor Type` dropdown (top left of any panel)
   - Select `AnimatorController`

![Open AnimatorController editor](/blender/animatorcontroller-open.webp)

2. **Create or Select an Asset**
   - Click `+` to create a new AnimatorController
   - Or select from existing assets

<video-embed limit_height max_height="188px" src="/docs/blender/animatorcontroller-create.mp4" />

**Understanding the Graph:**

![AnimatorController graph overview](/blender/animatorcontroller-overview.webp)

1. **Create States** - Press `Shift+A` to add new animation states
2. **Parameters Node** - Appears automatically; defines conditions for transitions
3. **Animation States** - Orange state is the starting state
4. **Transitions** - Configure in the Properties panel with conditions and blend settings

**Using Your AnimatorController:**

1. Add an `Animator` component to the root of your animated object
2. Assign your AnimatorController asset
3. Control parameters from TypeScript or UI buttons

![Assign AnimatorController to Animator](/blender/animatorcontroller-assigning.webp)


#### PlayableDirector - Timeline Animation

Export Blender's **NLA Tracks** (Non-Linear Animation) directly to the web using the PlayableDirector component.

**Setup:**

1. Create NLA tracks in Blender for your animated objects
2. Add a `PlayableDirector` component to any object
3. In the component settings, add objects to the `animation tracks` list
4. Needle Engine exports those objects' NLA tracks

![Timeline setup](/blender/timeline_setup.webp)
![Timeline tracks](/blender/timeline.webp)

**Use Cases:**
- Cinematic sequences
- Scroll-driven storytelling
- Coordinated multi-object animations
- Timeline-based interactive experiences

::: details Example: Scroll-Controlled Timeline
Add this script to `src/scripts` to control timeline playback with mouse scrolling:

```ts twoslash
import { Behaviour, PlayableDirector, serializable, Mathf } from "@needle-tools/engine";

export class ScrollTimeline extends Behaviour {

    @serializable(PlayableDirector)
    timeline?: PlayableDirector;

    @serializable()
    sensitivity: number = .5;

    @serializable()
    clamp: boolean = false;

    private _targetTime: number = 0;

    awake() {
        this.context.domElement.addEventListener("wheel", this.onWheel);
        if (this.timeline) this.timeline.pause();
    }

    private onWheel = (e: WheelEvent) => {
        if (this.timeline) {
            this._targetTime = this.timeline.time + e.deltaY * 0.01 * this.sensitivity;
            if (this.clamp) this._targetTime = Mathf.clamp(this._targetTime, 0, this.timeline.duration);
        }
    }

    update(): void {
        if (!this.timeline) return;
        const time = Mathf.lerp(this.timeline.time, this._targetTime, this.context.time.deltaTime / .3);
        this.timeline.time = time;
        this.timeline.pause();
        this.timeline.evaluate();
    }
}
```
:::

---

### Built-in Components

Needle Engine includes 100+ ready-to-use components for common interactive features.

**Adding Components:**

1. Select an object in Blender
2. Open the **Needle Components** panel
3. Click `Add Component`
4. Search and select the component you need

![Needle Components panel](/blender/components-panel.webp)

**Example: Camera Controls**

Add `OrbitControls` to your camera for instant mouse/touch controls on all devices:

![Add OrbitControls component](/blender/components-panel-select.webp)

Each component has settings you can adjust right in Blender.

**Removing Components:**

Click the `X` button in the lower right of any component panel.

![Remove component](/blender/remove-component.webp)

**Popular Components:**
- `OrbitControls` - Camera controls
- `Animation` - Play animation clips
- `Animator` - State machine animations
- `WebXR` - Enable VR/AR
- `DragControls` - Make objects draggable
- `UIButton` - Interactive buttons

[See all components →](/docs/reference/components)

---

### Custom Components - Extend with Code

Want custom behavior? Write TypeScript components that automatically appear in Blender.

**Creating Custom Components:**

1. Click `Code Editor` in the Needle Project panel to open VS Code
2. Create a `.ts` file in `src/scripts/`
3. Write your component class
4. Save the file
5. The component appears in Blender's component list automatically

**Example Component:**

```ts
import { Behaviour, serializable } from "@needle-tools/engine";

export class RotateObject extends Behaviour {
    @serializable()
    speed: number = 1;

    update() {
        this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
    }
}
```

[Learn more about scripting →](/docs/how-to-guides/scripting/create-components)

:::warning Required Dependency
Make sure `@needle-tools/needle-component-compiler` 2.x is in your `package.json` devDependencies for component hot-reloading.
:::

--- 

## Advanced Features

### Lightmapping - Bake Beautiful Lighting

Bake realistic lighting directly in Blender and export it to the web for stunning visuals with great performance.

<video-embed limit_height max_height="800px" src="/docs/blender/lightmapping.mp4" />

**What is Lightmapping?**
- Bakes lighting and shadows into textures
- Dramatically improves visual quality on the web
- No need for manual UV atlasing - automatic UV generation
- Supports multiple instances with individual lightmaps

**Requirements:**
- At least one light in your scene
- Objects marked as `Lightmapped` in the Needle Object panel

**Quick Setup:**

1. **Mark Objects for Lightmapping**
   - Select your mesh object
   - In the **Needle Object** panel, enable `Lightmapped`
   - Do the same for lights you want to bake

![Enable lightmapping on objects](/blender/lightmapping-object.webp)

2. **Configure Settings**
   - Use the **Needle** tab in the 3D viewport for quick access
   - Or use the **Render Properties** > **Lightmapping** panel

![Lightmap settings - Scene panel](/blender/lightmapping-scene-panel.webp)

![Lightmap settings - Render properties](/blender/lightmapping-panel.webp)

3. **Bake**
   - Click the `Bake` button
   - Wait for baking to complete
   - Lightmaps are automatically exported with your scene

::: tip Download Example
Get the complete lightmapping example: [lightmaps.blend](https://engine.needle.tools/downloads/blender/lightmaps.blend)
:::

:::warning Experimental Feature
Lightmapping is experimental. **Create a backup** of your `.blend` file before using it. [Report issues in our forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content).
:::

--- 

### Texture Compression - Optimize File Sizes

Needle Engine automatically compresses textures for optimal web performance during production builds.

**How It Works:**
- Automatic compression during `Build: Production`
- Chooses ETC1S or UASTC based on texture usage
- Significantly reduces file sizes without noticeable quality loss
- Requires [toktx](/docs/getting-started/#required-tools) to be installed

**Override Per-Texture Settings:**

1. Select a material in Blender
2. Go to the **Material** tab
3. Open **Needle Material Settings**
4. Toggle texture-specific compression settings

![Texture compression override options](/blender/texture-compression.webp)

**Compression Types:**
- **ETC1S** - Smaller files, good for most textures
- **UASTC** - Higher quality, larger files
- **WebP** - Alternative format for certain use cases

[Learn more about compression formats →](/docs/how-to-guides/deployment/#texture-compression)

---

## Maintenance & Support

### Updating the Add-on

Needle Engine notifies you when updates are available.

**Update Process:**
1. Look for the lightbulb icon in the Needle Project panel
2. Click the icon to download the latest version
3. Install following the same steps as initial installation

![Update notification](/blender/updates.webp)

:::tip Stay Updated
Updates include bug fixes, new features, and performance improvements. We recommend updating regularly.
:::

---

### Getting Help

**Need Support?**
- [Discord Community](https://discord.needle.tools) - Real-time help and community support
- [Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) - Detailed discussions and solutions
- [FAQ](/docs/reference/faq) - Common questions and answers

**Before Reporting Issues:**
1. Check the Blender logs: `Help > Needle` in Blender
2. Try with a sample project to isolate the issue
3. Make sure Node.js and dependencies are up to date

**Integrated Bug Reporter:**

For complex issues, use the built-in bug reporter:

![Bug reporter panel](/blender/bugreporter.webp)

- Automatically captures system information
- Uploads encrypted reports (deleted after 30 days)
- Requires a valid web project to be set up
- For sensitive projects, custom NDAs are available - [contact us](https://needle.tools/contact)

---

## Troubleshooting

**Common Issues:**

- **Project won't generate** - [Ensure Node.js is installed](/docs/getting-started/#prerequisites)
- **Code editing** - [We recommend VS Code](/docs/getting-started/#install-a-code-editor)
- **Colors don't match** - Check [Color Management settings](#essential-setup)
- **Can't see environment** - Increase World Opacity to 1 in viewport shading
- **Textures not compressing** - [Install toktx](/docs/getting-started/#required-tools) for production builds

[See full FAQ →](/docs/reference/faq)

---

## Next Steps

Now that you have Needle Engine for Blender set up, here's where to go next:

### 🎓 Learn the Fundamentals (Tutorials)

New to web development or Needle Engine? Start here:

- **[For Blender Artists](/docs/tutorials/fundamentals/for-blender-artists)** - Comprehensive guide for 3D artists
- **[TypeScript Essentials](/docs/tutorials/fundamentals/typescript-essentials)** - Learn coding basics for custom components

### 🛠️ Solve Specific Tasks (How-To Guides)

Ready to build something specific?

- **[Create Custom Components](/docs/how-to-guides/scripting/create-components)** - Write your own interactive behaviors
- **[Deploy Your Project](/docs/how-to-guides/deployment/)** - Publish your website
- **[Enable WebXR](/docs/how-to-guides/xr/)** - Add VR and AR support
- **[Export Optimization](/docs/how-to-guides/export/)** - Optimize assets for the web

### 💡 Understand How It Works (Explanation)

Want to understand the architecture?

- **[Project Structure](/docs/explanation/core-concepts/project-structure)** - How Blender and web projects connect
- **[Component System](/docs/explanation/core-concepts/component-system)** - How components work
- **[glTF Extensions](/docs/explanation/architecture/technical-overview)** - Technical details of export format

### 📖 Look Things Up (Reference)

Quick reference materials:

- **[Component Catalog](/docs/reference/components)** - All 100+ built-in components
- **[API Documentation](https://engine.needle.tools/docs/api/)** - Complete TypeScript API reference
- **[FAQ](/docs/reference/faq)** - Common questions and troubleshooting

### 🎨 Get Inspired

- **[Sample Projects](https://engine.needle.tools/samples)** - Interactive examples
- **[Showcase](/docs/samples-and-showcase/)** - See what others have built
- **[Download Blender Samples](https://engine.needle.tools/downloads/blender/download-samples?utm_source=needle_docs&utm_content=blender)** - Working .blend files

---

:::tip Providing Feedback
Your feedback helps us prioritize features and improvements. [Share your thoughts in the forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)!
:::
