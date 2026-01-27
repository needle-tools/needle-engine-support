<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="three.js Logo" alt="three.js Logo"/> +
    <img src="/imgs/chrome-logo.webp" style="max-height:70px;" title="Chrome Logo" alt="Chrome Logo"/>
</div>

# Needle Inspector — DevTools for three.js

The **Needle Inspector** is a powerful Chrome DevTools extension for inspecting and debugging three.js, react-three-fiber, and Needle Engine projects directly in your browser. Think of it as the browser's built-in inspector, but specifically designed for 3D scenes.


<video-embed src="https://www.youtube.com/watch?v=zSFqZSqzGGw" />

### Quick Start

1. Install the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/needle-inspector-%E2%80%94-devtoo/jonplpbnhmanoekkgcepnedhghflblmo)
2. Enable the inspector by clicking the Needle icon in the browser toolbar
3. Navigate to any webpage with a three.js scene
4. The inspector will automatically detect the scene and appear
5. Start exploring your 3D content!

:::tip Works on any three.js website
The Needle Inspector works on **any** website using three.js, react-three-fiber, or Needle Engine – not just your own projects. Use it to learn from other developers' work or debug production sites.
:::


## Features

### Real-time Scene Inspection

The inspector gives you a complete view of your 3D scene hierarchy, similar to how the browser's Elements panel shows your HTML structure.

- **Scene Hierarchy**: Browse through all objects, meshes, lights, and cameras in an expandable tree view
- **Search & Filter**: Quickly find specific objects by name or type
- **Live Updates**: See changes to your scene in real-time as they happen

### Property Editing

Edit any property of your 3D objects directly in the browser – no need to reload or rebuild your project.

- **Transform Controls**: Adjust position, rotation, and scale with intuitive number inputs
- **Material Properties**: Change colors, textures, opacity, and rendering settings
- **Boolean Toggles**: Show/hide objects, enable/disable features
- **Texture Inspection**: View and analyze texture properties

All changes are applied instantly to the running scene, making it perfect for tweaking values until they look just right.

### Performance Monitoring

Keep track of your scene's performance with built-in stats:

- **FPS Counter**: Monitor frame rate in real-time
- **Scene Statistics**: View object counts, triangle counts, and geometry stats
- **Download Size**: See estimated bandwidth usage

### AI-Powered Assistance <div style="display:inline-flex;gap:.5em;vertical-align:middle;padding-left:.5em;"> <img style="max-height:1.2em;" src="/imgs/vscode-logo.webp" title="VS Code Logo" alt="VS Code Logo"/> <img style="max-height:1.2em;" src="/imgs/claude-logo.webp" title="Claude Logo" alt="Claude Logo"/> <img style="max-height:1.2em;" src="/imgs/cursor-logo.webp" title="Cursor Logo" alt="Cursor Logo"/> <img style="max-height:1.2em;" src="/imgs/antigravity-logo.webp" title="Antigravity Logo" alt="Antigravity Logo"/> </div>



Connect the inspector to AI tools like Claude or Cursor for intelligent debugging and development assistance.

- **MCP Integration**: Exposes inspector capabilities to AI assistants
- **Natural Language Queries**: Ask questions about your scene
- **Automated Analysis**: Get suggestions for optimization and improvements

Setup is simple:
```bash
npx needle-cloud start
```

Then connect your AI tool to explore your scene with natural language.   
**Learn how to connect your local AI tools**: [Needle MCP documentation](../ai/needle-mcp-server).


### Export Changes

Made some tweaks you want to keep? Export your changes for later use:

- **JSON Export**: Save property modifications as structured data
- **Text Export**: Get a readable summary of your changes
- **Version Control**: Perfect for sharing modifications with your team

## How It Works

The Needle Inspector automatically detects three.js scenes on any webpage you visit. When a scene is found:

1. An inspector panel appears showing the scene hierarchy
2. Click any object to view and edit its properties
3. Changes are applied immediately to the live scene
4. Use the search and filter tools to navigate complex scenes

### Supported Platforms

- three.js (all versions)
- react-three-fiber
- Needle Engine
- A-frame (via three.js)
- Threlte
- Any three.js-based framework

## Installation

1. Visit the [Needle Inspector page on the Chrome Web Store](https://chromewebstore.google.com/detail/needle-inspector-%E2%80%94-devtoo/jonplpbnhmanoekkgcepnedhghflblmo)
2. Ensure you are using Google Chrome or a Chromium-based browser
3. Click "Add to Chrome" and you're ready to go!

## Usage Tips

:::tip Toggle the inspector
Click the Needle Inspector extension icon to show or hide the inspector panel at any time.
:::

:::tip Multiple scenes
If a page has multiple three.js scenes, you can switch between them using the scene selector at the top of the inspector.
:::

:::tip Inspect in isolation
Right-click any object in the hierarchy and select "Inspect" to view it in an isolated 3D view, making it easier to focus on specific parts of your scene.
:::

## Use Cases

### Development & Debugging
- Quickly test different property values without recompiling
- Debug complex scene hierarchies
- Identify performance bottlenecks

### Learning & Exploration
- Inspect how other developers build their scenes
- Understand three.js best practices by examining production sites
- Learn new techniques by exploring example projects

### Optimization
- Monitor performance metrics
- Identify heavy objects or excessive geometry
- Test optimization strategies in real-time

## Next Steps

- [Learn about Needle Engine](/docs/)
- [Explore three.js integration](/docs/three/)
- [Get started with Needle in Unity](/docs/unity/)
- [Get started with Needle in Blender](/docs/blender/)
- [AI-Powered Development](/docs/ai/) - Connect AI assistants to the inspector

:::tip Using Needle Engine?
The inspector has special features when used with Needle Engine projects, including component editing, networking inspection, and XR debugging tools.
:::
