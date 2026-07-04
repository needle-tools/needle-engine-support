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

<testimonial
  name="Martin F"
  role="3D Generalist, Slovenia"
  src="https://www.youtube.com/watch?v=1KKfct3Zpcw&t=66s"
>
Needle Engine really eased up a lot of developer work — it's very artist friendly. The workflow was very fast and agile.
</testimonial>

---

## Prerequisites

Before starting, make sure you have:

<ClientOnly>

- <a target="_blank" href="https://www.blender.org/download/"><strong>Blender 4.5+ LTS</strong></a>
- <os-link windows_url="https://fwd.needle.tools/needle-engine/nodejs/win" osx_url="https://fwd.needle.tools/needle-engine/nodejs/osx"><strong>Node.js 22 LTS or 24 LTS</strong></os-link>

</ClientOnly>
 
 :::tip
  Blender's glTF Exporter has undergone a number of changes in Blender 5.1+ and is still stabilizing. We recommend Blender 5.0 or LTS versions.
 :::
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

![Blender Add-on Settings](/blender/settings.webp "2x")

**✓ Checkpoint:** You should now see "Needle Engine Exporter for Blender" in your add-ons list with a checkmark.

:::tip Just want to publish a 3D model?
With the add-on installed, you can publish any scene as an optimized 3D asset via `File > Export > Upload glTF to Needle Cloud` — no web project needed. [Learn more →](/docs/blender/upload-to-needle-cloud)
:::

---

## Step 2: Create Your First Project

Let's start with a sample project to see how everything works.

### Get Sample Projects

[Download Blender Samples](https://engine.needle.tools/downloads/blender/download-samples?utm_source=needle_docs&utm_content=blender) — or [browse Blender Samples online](https://engine.needle.tools/samples/?overlay=samples&platform=blender)

Download and **open any sample `.blend` file** in Blender. These samples show what's possible and help you learn by example.

### Generate the Web Project

1. **Find the Needle Engine Panel**
   - Open the Viewport Sidebar (right side)
   - Click the **Needle Engine** tab
   ![Needle Engine Panel](/blender/needleviewportpanel.webp)

2. **Set Project Path**
   - Click the folder icon next to `Web Project Path`
   - Choose a location for your web project folder
   - This folder will contain all your web files

3. **Generate Project**
   - Click the `Generate Web Project` button
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

:::tip AI-Assisted Workflow
Need help with Needle Engine while working in Blender? Connect AI coding assistants like Claude, Copilot, or Cursor through Needle MCP — they can search your scene hierarchy, inspect objects and materials, read project context, and help you write components. You can also use the built-in `Ask AI about Project` action to get answers directly in Blender. [Learn more about Needle MCP →](/docs/ai/needle-mcp-server)
:::

---

## Step 3: Set Up Environment Lighting

Your HDRI environment is automatically exported and used for lighting — objects in your scene will reflect it and receive ambient light from it. The visible background is separate: it can show the skybox or render as a solid color.

**To set up your environment:**
1. Open **Viewport Shading** options (top right of 3D viewport)
2. Assign an HDRI cubemap
3. Optionally, set `World Opacity` to **1** to also show it as the background skybox
   <video-embed limit_height max_height="300px" src="/docs/blender/environment.mp4" />

**✓ Checkpoint:** Save and check the browser — your scene should now have environment lighting (and a visible skybox if you set World Opacity to 1)!

**[Learn more about environment lighting →](/docs/blender/environment)** — custom HDRIs, automatic compression for fast loading, and more.

---

## Step 4: Add Basic Interactivity

Now let's add camera controls so users can explore your scene.

### Add OrbitControls

1. **Select your camera** in Blender
2. Find the **Needle Object** panel (in Viewport Sidebar)
3. Click `Add Component`
4. Search for `OrbitControls` and select it 
   ![Add OrbitControls component](/blender/components-panel-select.webp "1.5x")
5. **Save your Blender file** (Ctrl/Cmd + S)
6. Watch the browser refresh automatically

**✓ Checkpoint:** You can now click and drag in the browser to orbit the camera around your scene!


### Understanding Components

Components are reusable behaviors you add to objects. Needle Engine includes 100+ built-in components:
- **OrbitControls** - Mouse/touch camera controls
- **Rigidbody** + **Colliders** - Built-in Rapier physics simulation
- **SyncedRoom** + **Voip** - Multiplayer with voice chat
- **Animation** - Play animation clips
- **WebXR** - Enable VR/AR with one click
- **DragControls** - Make objects draggable
- **VideoPlayer**, **AudioSource**, **ParticleSystem**, and many more!

**[Learn more about components →](/docs/blender/components)**

---

## Step 5: Set Up Color Management

By default, Blender uses `Filmic` which makes colors look different in the browser. Switch to `Standard` so what you see in Blender matches the web output.

1. Go to **Render Properties** tab
2. Find **Color Management** section
3. Set `View` to **Standard**

   ![Color management settings](/blender/settings-color-management.webp "1.5x")

**✓ Checkpoint:** Colors now match between Blender and the web!

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

**[For Blender Artists →](/docs/tutorials/fundamentals/for-blender-artists)**
Comprehensive guide covering what you can create without code, workflow tips, and when you might want scripting.

- [Environment Lighting](/docs/blender/environment) — custom HDRIs, skybox settings, and automatic compression
- [Animation](/docs/blender/animation) — playback, state machines, and timeline export
- [Components](/docs/blender/components) — 100+ built-in behaviors and creating your own
- [Lightmapping](/docs/blender/lightmapping) — baked lighting for stunning visuals with great performance
- [Deploy Your Project](/docs/how-to-guides/deployment/) — publish to Needle Cloud or self-host
- [Upload glTF to Needle Cloud](/docs/blender/upload-to-needle-cloud) — publish your scene as an optimized 3D asset in one click, no web project required
- [Sample Projects](https://engine.needle.tools/samples) — interactive examples to learn from ([Blender Samples](https://engine.needle.tools/samples/?overlay=samples&platform=blender))
- [FAQ](/docs/reference/faq) — common questions and troubleshooting

---

## Getting Help

**[Discord Community](https://discord.needle.tools)**
Ask questions and get real-time help from the community.

**[Forum](https://forum.needle.tools)**
Detailed discussions and solutions.

**Bug Reporter:**
Built-in tool in Blender (`Help > Needle`) for complex issues.

![Bug reporter](/blender/bugreporter.webp "1.5x")

---

:::tip Share Your Feedback
Your feedback helps us improve! [Tell us what you think in the forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)
:::
