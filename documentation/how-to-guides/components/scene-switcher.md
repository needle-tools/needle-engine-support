---
title: Switch Between Scenes (SceneSwitcher)
description: Dynamically load and switch between multiple 3D scenes with the SceneSwitcher component. Perfect for galleries, portfolios, and multi-scene experiences. Works in Unity and Blender.
---

# Switch Between Scenes

Dynamically load and switch between multiple 3D scenes with smooth transitions and preloading.

<video-embed src="/docs/videos/sceneswitcher.mp4" autoplay muted />

:::tip Works with Unity and Blender
The SceneSwitcher component is available for both Unity and Blender integrations.
:::

:::tip Needle Engine's Superpower: Interactive glTF/glb Files
A key feature of Needle Engine is that **glTF/glb files are fully interactive**. When you export from Unity or Blender, your scenes include not just 3D models, but all components, scripts, physics, animations, and custom logic. SceneSwitcher loads these complete, self-contained interactive experiences - not just static geometry!
:::

## What You Can Do

- **Load Fully Interactive Scenes** - Each scene is a complete Unity/Blender export with all its components, scripts, physics, animations, and interactivity
- **Self-Contained Experiences** - Loaded scenes bring their own logic (DragControls, particle systems, custom scripts, etc.)
- **Multiple Scenes** - Switch between different 3D environments
- **Multiple SceneSwitchers** - Have several independent SceneSwitchers in one scene, each managing different content
- **Keyboard Navigation** - Use arrow keys, A/D, or number keys to switch scenes
- **Swipe on Mobile** - Swipe left/right to navigate between scenes
- **Preloading** - Automatically preload nearby scenes for instant switching
- **Loading Scenes** - Optional loading screen while switching
- **Browser History** - Back/forward buttons work with scene changes
- **Custom Transitions** - Control scene open/close behavior with code

Perfect for:
- Portfolio and gallery websites
- Product showcases with multiple variations
- Multi-level experiences
- Interactive storytelling
- Virtual museums and exhibitions

## Quick Start

### Basic Setup

**In Unity or Blender:**
1. Create an empty GameObject
2. Add the `SceneSwitcher` component
3. Add your scene files to the **Scenes** array
4. Export and view - first scene loads automatically!

**Controls:**
- **Arrow Keys** or **A/D** - Switch scenes
- **Number Keys (1, 2, 3...)** - Jump to specific scene
- **Swipe** (mobile) - Swipe left/right to navigate

### Three Different Scenes

The video above shows three distinct scenes:
1. **Cylinder Garden** (Scene 1) - Decorative plants on cylinders
2. **Gold & Fog** (Scene 2) - Golden spheres in misty atmosphere
3. **Lightmapping** (Scene 3) - Statue with colored lighting

Users can navigate between them seamlessly using Previous/Next buttons or keyboard controls.

## Scene Organization Patterns

SceneSwitcher is incredibly flexible - you can organize your scenes in different ways depending on your needs:

### Pattern 1: Replace Entire Scene Content

For completely different environments (like the video above), use a minimal root scene:

**Root Scene (main.glb):**
- Camera
- Lights (optional - scenes can provide their own)
- SceneSwitcher component
- UI elements (optional - Previous/Next buttons)

**Individual Scenes:**
- scene1.glb - Complete environment with all objects
- scene2.glb - Complete environment with all objects
- scene3.glb - Complete environment with all objects

This pattern is perfect for:
- Portfolio galleries where each scene is completely different
- Virtual museums with distinct exhibition rooms
- Product showcases with entirely different setups

**See it in action:**
- [Multi-Scene Sample](https://engine.needle.tools/samples/multi-scene-example) - Live example with source code

### Pattern 2: Replace Parts of the Scene

<video-embed src="/docs/videos/sceneswitcher-loading-interactive-scenes.mp4" autoplay muted />

For partial content switching, keep persistent elements in the root scene and load interactive files:

**Root Scene:**
- Camera with OrbitControls
- Lighting setup (stays consistent)
- Ground plane or environment
- UI and navigation
- SceneSwitcher component

**Individual Scenes (exported from Unity or Blender):**
- Each scene is a full glTF export with all its components
- Loaded scenes bring their own scripts (DragControls, particle systems, etc.)
- Scenes can have animations, physics, UI, and custom logic
- Completely self-contained interactive experiences

This pattern is perfect for:
- Product configurators where environment stays the same
- Loading interactive demos or mini-games
- Character customization with persistent background
- Swapping focal content while keeping context
- Portfolio of interactive 3D experiences

**See it in action:**
- [Interactive Content Demo](https://sceneswitcher-interactive-content-zubcksz2mtep1.needle.run/) - Live example loading interactive scenes

### Pattern 3: Multiple SceneSwitchers (Very Powerful!)

<video-embed src="/docs/videos/sceneswitcher-multiple.mp4" autoplay muted />

You can have **multiple SceneSwitcher components** in the same scene, each managing different parts:

**Example: Showroom with Multiple Products**

```
Root Scene:
├── Camera
├── Showroom Environment (persistent)
├── ProductDisplay1 (with SceneSwitcher)
│   ├── Switches between: chair1.glb, chair2.glb, chair3.glb
├── ProductDisplay2 (with SceneSwitcher)
│   ├── Switches between: lamp1.glb, lamp2.glb, lamp3.glb
└── ProductDisplay3 (with SceneSwitcher)
    ├── Switches between: table1.glb, table2.glb, table3.glb
```

Each SceneSwitcher:
- Operates independently
- Has its own scene array
- Can use different navigation (one via UI, another via keyboard)
- Loads/unloads only its own content

This pattern is perfect for:
- Showrooms with multiple independent product displays
- Comparison tools (left side vs right side)
- Multi-panel presentations
- Complex configurators with multiple customization areas

**Example Code for Multiple Switchers:**

```ts
import { Behaviour, SceneSwitcher } from "@needle-tools/engine";

export class MultiSwitcherController extends Behaviour {

    start() {
        // Get all SceneSwitchers in the scene
        const switchers = this.gameObject.getComponentsInChildren(SceneSwitcher);

        console.log(`Found ${switchers.length} scene switchers`);

        // Control them independently
        if (switchers[0]) switchers[0].select(0); // First display: scene 0
        if (switchers[1]) switchers[1].select(1); // Second display: scene 1
        if (switchers[2]) switchers[2].select(2); // Third display: scene 2
    }
}
```

:::tip Multiple SceneSwitchers Power
Having multiple SceneSwitchers is what makes Needle Engine's scene management incredibly powerful and flexible. You're not limited to switching entire environments - you can switch specific parts independently!
:::

## Settings

### Basic Settings

| Setting | What it does | Default |
| --- | --- | --- |
| **Scenes** | Array of scene files to switch between | `[]` |
| **Auto Load First Scene** | Load first scene automatically on start | `true` |
| **Loading Scene** | Optional scene to display while loading | `undefined` |

### Navigation Settings

| Setting | What it does | Default |
| --- | --- | --- |
| **Use Keyboard** | Enable keyboard shortcuts (arrows, A/D, numbers) | `true` |
| **Use Swipe** | Enable swipe navigation on mobile | `true` |
| **Clamp** | Stop at first/last scene (or loop around) | `true` |

### URL & History

| Setting | What it does | Default |
| --- | --- | --- |
| **Query Parameter Name** | URL parameter for current scene (e.g., `?scene=1`) | `"scene"` |
| **Use Scene Name** | Use scene name in URL instead of index | `true` |
| **Use History** | Add scene changes to browser history | `true` |

### Scene Settings

| Setting | What it does | Default |
| --- | --- | --- |
| **Use Scene Lighting** | Apply lighting from loaded scene | `true` |
| **Use Scene Background** | Apply skybox from loaded scene | `true` |

### Preloading

| Setting | What it does | Default |
| --- | --- | --- |
| **Preload Next** | How many scenes ahead to preload | `1` |
| **Preload Previous** | How many scenes behind to preload | `1` |
| **Preload Concurrent** | Max concurrent downloads | `2` |

### UI

| Setting | What it does | Default |
| --- | --- | --- |
| **Create Menu Buttons** | Add Previous/Next to Needle menu | `false` |

## Examples

### Simple Gallery

Create a 3-scene portfolio:

**In Editor:**
1. Add `SceneSwitcher` component
2. Add 3 scenes to the **Scenes** array:
   - Scene1.glb
   - Scene2.glb
   - Scene3.glb
3. Enable **Clamp** to stop at first/last scene
4. Users navigate with arrows or swipe

### Infinite Loop Gallery

Let users loop through scenes endlessly:

**In Editor:**
1. Add scenes to SceneSwitcher
2. Disable **Clamp**
3. After the last scene, pressing "next" returns to first scene
4. Great for continuous presentations

### Product Configurator

Show different product variations:

```ts
import { Behaviour, SceneSwitcher, serializable } from "@needle-tools/engine";

export class ProductConfigurator extends Behaviour {

    @serializable(SceneSwitcher)
    sceneSwitcher?: SceneSwitcher;

    start() {
        // Add product variations dynamically
        this.sceneSwitcher?.addScene("products/red-variant.glb");
        this.sceneSwitcher?.addScene("products/blue-variant.glb");
        this.sceneSwitcher?.addScene("products/green-variant.glb");

        // Load the first one
        this.sceneSwitcher?.select(0);
    }

    selectColor(colorName: string) {
        // Switch to specific product by name
        this.sceneSwitcher?.select(colorName);
    }
}
```

### Custom Loading Screen

Show a loading scene while switching:

**In Editor:**
1. Create a simple loading scene (e.g., spinner, progress bar)
2. Export it as `loading.glb`
3. Assign it to **Loading Scene** on SceneSwitcher
4. The loading scene appears during transitions

## Scripting

### Switch Scenes Programmatically

```ts
import { Behaviour, SceneSwitcher } from "@needle-tools/engine";

export class SceneController extends Behaviour {

    start() {
        const switcher = this.gameObject.getComponent(SceneSwitcher);

        if (switcher) {
            // Navigate between scenes
            switcher.selectNext();  // Go to next scene
            switcher.selectPrev();  // Go to previous scene

            // Jump to specific scene by index
            switcher.select(2);  // Load scene at index 2

            // Jump to scene by name
            switcher.select("my-scene-name");

            // Get current scene info
            console.log("Current index:", switcher.currentIndex);
            console.log("Current scene:", switcher.currentlyLoadedScene?.url);
        }
    }
}
```

### Add Scenes Dynamically

```ts
const switcher = this.gameObject.getComponent(SceneSwitcher);

// Add a new scene
const newScene = switcher.addScene("path/to/scene.glb");

// Switch to it
switcher.switchScene(newScene);
```

### Listen to Scene Events

```ts
import { Behaviour, SceneSwitcher } from "@needle-tools/engine";

export class SceneMonitor extends Behaviour {

    start() {
        const switcher = this.gameObject.getComponent(SceneSwitcher);

        // When scene starts loading
        switcher.addEventListener("loadscene-start", (e) => {
            console.log("Loading scene:", e.detail.scene.url);
            console.log("Scene index:", e.detail.index);
        });

        // Loading progress
        switcher.addEventListener("progress", (e) => {
            const percent = (e.loaded / e.total) * 100;
            console.log(`Loading: ${percent.toFixed(1)}%`);
        });

        // When scene finished loading
        switcher.addEventListener("loadscene-finished", (e) => {
            console.log("Finished loading:", e.detail.scene.url);
        });

        // When scene is added and opened
        switcher.addEventListener("scene-opened", (e) => {
            console.log("Scene opened:", e.detail.scene.url);
        });
    }
}
```

### Check Loading State

```ts
const switcher = this.gameObject.getComponent(SceneSwitcher);

// Check if a scene is currently loading
if (switcher.currentlyLoadingScene) {
    console.log("Loading:", switcher.currentlyLoadingScene.url);

    // Get loading progress
    const progress = switcher.currentLoadingProgress;
    if (progress) {
        const percent = (progress.loaded / progress.total) * 100;
        console.log(`Progress: ${percent}%`);
    }
}
```

### Preload Scenes

```ts
const switcher = this.gameObject.getComponent(SceneSwitcher);

// Preload a specific scene by index
switcher.preload(2);

// Preloading happens automatically based on settings:
// - preloadNext: scenes ahead of current
// - preloadPrevious: scenes behind current
```

### Reload Current Scene

```ts
const switcher = this.gameObject.getComponent(SceneSwitcher);

// Reload the currently loaded scene
await switcher.reload();
```

### Unload Scene

```ts
const switcher = this.gameObject.getComponent(SceneSwitcher);

// Unload the current scene completely
await switcher.unload();
```

## Advanced Features

### ISceneEventListener Interface

Add custom logic when scenes open or close:

```ts
import { Behaviour, ISceneEventListener, SceneSwitcher } from "@needle-tools/engine";

// Add this to the root of your scene (the scene being loaded)
// or on the same object as the SceneSwitcher
export class MySceneTransition extends Behaviour implements ISceneEventListener {

    async sceneOpened(sceneSwitcher: SceneSwitcher) {
        console.log("My scene opened:", sceneSwitcher.currentlyLoadedScene?.url);

        // Fade in effect, play audio, etc.
        await this.fadeIn();
    }

    async sceneClosing() {
        console.log("My scene is closing");

        // Fade out, save state, etc.
        await this.fadeOut();
    }

    private async fadeIn() {
        // Your fade-in animation logic
    }

    private async fadeOut() {
        // Your fade-out animation logic
    }
}
```

### URL Parameters

SceneSwitcher syncs with URL parameters automatically:

```
https://example.com/?scene=2        // Load scene at index 2
https://example.com/?scene=gallery  // Load scene named "gallery"
```

Users can:
- **Bookmark** specific scenes
- **Share** direct links to scenes
- **Use browser back/forward** to navigate scenes

### Keyboard Shortcuts

Default keyboard controls:
- **Arrow Right / D** - Next scene
- **Arrow Left / A** - Previous scene
- **Number keys (1-9)** - Jump to scene by index (1 = first scene)

Disable with `useKeyboard = false`.

### Mobile Swipe

Swipe left/right to navigate on touch devices.

Configure threshold or disable with `useSwipe = false`.

## Common Questions

**How many scenes can I add?**  
No hard limit, but be mindful of total file size. Use preloading settings to control memory usage.

**Can scenes have different lighting?**  
Yes! Enable **Use Scene Lighting** and **Use Scene Background** to apply each scene's lighting/skybox.

**How do I prevent users from jumping scenes?**  
Set `useKeyboard = false` and `useSwipe = false`, then only provide your own UI for navigation.

**Can I load scenes from external URLs?**  
Yes! Use `addScene("https://example.com/scene.glb")` to add external scenes.

**What's the difference between Loading Scene and regular scenes?**  
The loading scene appears while other scenes load. It's optional but improves UX for large scenes.

**How does preloading work?**  
SceneSwitcher automatically downloads nearby scenes based on **Preload Next** and **Preload Previous** settings. This makes transitions instant.

**Can I use this with multiplayer?**  
Yes! Scene changes can be synced across users with custom networking code using the scene events.

## Performance Tips

**Preload Settings:**
- Set `preloadNext = 1` and `preloadPrevious = 0` for linear galleries
- Set both to `0` to disable preloading (saves memory, slower transitions)
- Increase `preloadConcurrent` for faster preloading on good connections

**Scene Size:**
- Keep scenes under 10MB for fast loading
- Use compressed textures
- Optimize geometry

**Loading Scene:**
- Keep loading scenes very small (< 1MB)
- Use simple geometry and minimal textures

**URL Parameters:**
- Set `queryParameterName = ""` to disable URL syncing if not needed

## Debugging

Enable debug mode by adding `?debugsceneswitcher` to your URL:

```
http://localhost:3000?debugsceneswitcher
```

This shows:
- Scene loading start/finish
- Progress bars in console
- Preloading schedule
- Scene add/remove operations

## More Information

**Live Example:**
- [Multi-Scene Sample](https://engine.needle.tools/samples/multi-scene-example) - Interactive demo with source code

**Real-World Examples:**
- [Needle Website](https://needle.tools) - Company website
- [Songs Of Cultures](https://app.songsofcultures.com) - Interactive cultural experience

**API Documentation:**
- [SceneSwitcher API](https://engine.needle.tools/docs/api/SceneSwitcher) - Complete technical reference
- [ISceneEventListener API](https://engine.needle.tools/docs/api/ISceneEventListener) - Scene transition interface

**Related Guides:**
- [Loading Scenes](/docs/how-to-guides/scripting/index#loading-scenes) - Load scenes programmatically
- [Asset References](/docs/how-to-guides/scripting/reference-assets) - Reference external assets
