---
title: Needle Engine for Blender
description: Create interactive web experiences directly from Blender
editLink: true
---

# <logo-header logo="/blender/logo.png" alt="Blender">Needle Engine for Blender</logo-header>

**Create interactive 3D web experiences directly from Blender.** This tutorial will guide you through installing the add-on and creating your first interactive web project in under 10 minutes.

:::tip What You'll Learn
By the end of this tutorial, you'll have the Blender add-on installed, a web project running locally, and understand how to add basic interactivity to your scenes.
:::

---

## Prerequisites

Before starting, make sure you have:

<ClientOnly>

- <a target="_blank" href="https://www.blender.org/download/"><strong>Blender 4.5+ LTS</strong></a>
- <os-link windows_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi" osx_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0.pkg"><strong>Node.js 20 LTS</strong></os-link>

</ClientOnly>

---

## Step 1: Install the Add-on

### Download

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

### Install

1. In Blender, go to `Edit > Preferences > Add-ons`
2. Click the dropdown arrow → Select `Install from Disk`
3. Choose the downloaded `.zip` file → Click `Install Add-on`
4. Search for "Needle" and **check the box** to enable it

![Blender Add-on Settings](/blender/settings.webp)

**✓ Checkpoint:** You should now see "Needle Engine Exporter for Blender" in your add-ons list with a checkmark.

---

## Step 2: Create Your First Project

Let's start with a sample project to see how everything works.

### Get Sample Projects

[Download Blender Samples](https://engine.needle.tools/downloads/blender/download-samples?utm_source=needle_docs&utm_content=blender)

Download and **open any sample `.blend` file** in Blender. These samples show what's possible and help you learn by example.

### Generate the Web Project

1. **Find the Needle Engine Panel**
   - Open the Properties panel (right side)
   - Click the **Scene Properties** tab (scene icon with geometric shapes)
   - Scroll to find the **Needle Engine** panel

2. **Set Project Path**
   - Click the folder icon next to `Project Path`
   - Choose a location for your web project folder
   - This folder will contain all your web files

3. **Generate Project**
   - Click the `Generate Project` button
   - Wait while Needle Engine:
     - Creates your web project files
     - Installs dependencies (may take 1-2 minutes)
     - Starts the local development server
   - Your browser should open automatically!

<video-embed src="/docs/blender/environment-light.mp4" />

**✓ Checkpoint:** You should see your 3D scene running in a web browser. Try rotating the view with your mouse!

:::tip Auto-Export
When you save your `.blend` file, Needle Engine automatically re-exports your scene and refreshes the browser. This hot reload makes iteration super fast!
:::

---

## Step 3: Add Basic Interactivity

Now let's add camera controls so users can explore your scene.

### Add OrbitControls

1. **Select your camera** in Blender
2. Find the **Needle Components** panel (in Properties)
3. Click `Add Component`
4. Search for `OrbitControls` and select it
5. **Save your Blender file** (Ctrl/Cmd + S)
6. Watch the browser refresh automatically

**✓ Checkpoint:** You can now click and drag in the browser to orbit the camera around your scene!

![Add OrbitControls component](/blender/components-panel-select.webp)

### Understanding Components

Components are reusable behaviors you add to objects. Needle Engine includes 100+ built-in components:
- **OrbitControls** - Mouse/touch camera controls
- **Animation** - Play animation clips
- **WebXR** - Enable VR/AR with one click
- **DragControls** - Make objects draggable
- And many more!

**[Learn more about components →](/docs/blender/components)**

---

## Step 4: Configure Essential Settings

Before going further, let's fix two common issues.

### Fix Color Management

By default, Blender uses `Filmic` which makes colors look different in the browser.

**To fix:**
1. Go to **Render Properties** tab
2. Find **Color Management** section
3. Set `View Transform` to **Standard**

![Color management settings](/blender/settings-color-management.webp)

**✓ Checkpoint:** Colors now match between Blender and the web!

### Setup Environment Lighting

Your HDRI environment exports automatically, but you need to make it visible.

**To show skybox:**
1. Open **Viewport Shading** options (top right of 3D viewport)
2. Assign an HDRI cubemap
3. Set `World Opacity` to **1**

<video-embed limit_height max_height="300px" src="/docs/blender/environment.mp4" />

**✓ Checkpoint:** Save and see your skybox appear in the browser!

---

## What You've Learned

Congratulations! You've just:
- ✅ Installed the Needle Engine add-on
- ✅ Created and launched a web project
- ✅ Added interactive camera controls
- ✅ Configured colors and environment lighting

Your Blender scenes are now running on the web with hot reload!

---

## Next Steps

### Continue Learning (Tutorials)

**[For Blender Artists →](/docs/tutorials/fundamentals/for-blender-artists)**
Comprehensive guide for 3D artists covering what you can create without code, workflow tips, and when you might want scripting.

**[TypeScript Essentials →](/docs/tutorials/fundamentals/typescript-essentials)**
Learn TypeScript basics to create custom interactive behaviors.

---

### Add More Interactivity (How-To Guides)

Now that you have the basics, explore specific features:

**[Animation Workflows →](/docs/blender/animation)**
Learn all animation methods: simple Animation component, AnimatorController state machines, and PlayableDirector timeline export.

**[Components Guide →](/docs/blender/components)**
Master the 100+ built-in components and learn to create your own custom TypeScript components.

**[Lightmapping →](/docs/blender/lightmapping)**
Bake photorealistic lighting for stunning visuals with great performance.

**[Deploy Your Project →](/docs/how-to-guides/deployment/)**
Publish your interactive scene to the web for everyone to see.

**[Enable WebXR →](/docs/how-to-guides/xr/)**
Add VR and AR support to your scenes.

---

### Look Things Up (Reference)

**[Component Catalog →](/docs/reference/components)**
Browse all 100+ built-in components with descriptions and settings.

**[API Documentation →](https://engine.needle.tools/docs/api/)**
Complete TypeScript API reference for advanced development.

**[FAQ →](/docs/reference/faq)**
Common questions and troubleshooting.

---

### Get Inspired

**[Sample Projects →](https://engine.needle.tools/samples)**
Explore interactive examples to see what's possible.

**[Download More Samples →](https://engine.needle.tools/downloads/blender/download-samples)**
Get working `.blend` files to learn from.

---

## Getting Help

**[Discord Community →](https://discord.needle.tools)**
Ask questions and get real-time help from the community.

**[Forum →](https://forum.needle.tools)**
Detailed discussions and solutions.

**Bug Reporter:**
Built-in tool in Blender (`Help > Needle`) for complex issues.

![Bug reporter](/blender/bugreporter.webp)

---

:::tip Share Your Feedback
Your feedback helps us improve! [Tell us what you think in the forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)
:::
