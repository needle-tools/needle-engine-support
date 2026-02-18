<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <img src="/imgs/mcp-logo.webp" style="max-height:70px;" title="MCP Logo" alt="MCP Logo"/>
</div>

# Needle MCP Server — Local AI for Needle

Talk to your AI assistant about your 3D scenes! Connect Claude, Cursor, or other AI tools to the Needle Inspector so you can explore your three.js scenes, edit objects, and get help - all through natural conversation.

### Quick Start

1. Start the local MCP server:
   ```bash
   npx needle-cloud start
   ```

2. Connect your AI assistant using the instructions below in the [How to Connect](#how-to-connect) section.

3. Install the [Needle Inspector for Chrome](../three/needle-devtools-for-threejs-chrome-extension.md) to chat with your AI about any three.js scene in the browser.

4. Visit a three.js webpage (e.g. [needle.tools](https://needle.tools))

5. Ask your local AI assistant questions about the scene!

:::tip Works with your favorite AI tools
Works with Claude Desktop, Cursor, VS Code Copilot, Antigravity, and more.
:::


## What Can You Do?

### Always Available (No Inspector Required)

The MCP server provides powerful tools that work anywhere:

- **Search documentation**: "How do I add physics to my Needle project?"
- **Find examples**: "Show me how to use WebXR in Needle Engine"
- **Get help**: "What's the best way to deploy to Vercel?"
- **Learn APIs**: "How does the serializable decorator work?"

### With the Inspector Open

Open the Needle Inspector on any three.js webpage to also chat about live 3D scenes:

- **Explore 3D scenes**: "Show me all the lights in my scene"
- **Inspect objects**: "What materials are used in this scene?"
- **Edit properties**: "Change the main light color to warm orange"
- **Get creative help**: "How can I make this scene look more realistic?"
- **Optimize performance**: "Why is my scene running slowly?"
- **Learn techniques**: "How do I add reflections to this material?"
- **Debug issues**: "This object looks weird, what's wrong with it?"

Your AI can actually see your 3D scene through the Inspector and help you work with specific objects, materials, lighting, and settings in real-time.


## How to Connect

### <img src="/imgs/claude-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="Claude Logo" alt="Claude Logo"/> Using Claude Desktop

**Quick setup:**

1. Open your terminal and run:
   ```bash
   claude mcp add --scope user --transport http needle http://localhost:8424/mcp
   ```

2. Restart Claude Desktop

3. Look for the 🔌 icon in the bottom-right - you're connected!




### <img src="/imgs/vscode-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="VS Code Logo" alt="VS Code Logo"/> Using VS Code

**Quick setup:**

1. Click to [Install Needle MCP in VS Code](vscode:mcp/install?%7B%22name%22%3A%22needle%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22needle-cloud%22%2C%22mcp%22%5D%7D)

2. Type `#needle` in Copilot chat to see Needle tools, or just ask naturally!

<details>
<summary>Manual setup</summary>

1. Open Command Palette: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Choose "MCP: Add Server"
3. Fill in the details:
   - Name: `needle`
   - Transport: `http`
   - URL: `http://localhost:8424/mcp`

</details>





### <img src="/imgs/cursor-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="Cursor Logo" alt="Cursor Logo"/> Using Cursor 

1. In your project folder, create a file: `.cursor/mcp.json`

2. Add this:
   ```json
   {
     "mcpServers": {
       "needle": {
         "transport": "http",
         "url": "http://localhost:8424/mcp"
       }
     }
   }
   ```

3. Restart Cursor

4. **Important**: Switch to Agent Mode (not Ask Mode)

Try it: *"Show me all the meshes in my scene"*



### <img src="/imgs/antigravity-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="Antigravity Logo" alt="Antigravity Logo"/> Using Antigravity

**Quick setup:**

1. Open Command Palette: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)

2. Choose "MCP: Add Server"

3. Fill in the details:
   - Name: `needle`
   - Transport: `http`
   - URL: `http://localhost:8424/mcp`


Antigravity is great at understanding what you want - just describe your goal!


## What to Ask

### Documentation & Learning (Always Available)

You can ask your AI about Needle Engine anytime — no Inspector needed:

**Getting started:**
> "How do I create my first Needle Engine project?"
> "What's the difference between Unity and Blender workflows?"
> "How do I deploy my project to Needle Cloud?"

**APIs and features:**
> "How do I use the @serializable decorator?"
> "What lifecycle methods are available for components?"
> "How do I implement custom networking?"

**Troubleshooting:**
> "Why isn't my texture loading?"
> "How do I fix CORS issues?"
> "What are common WebXR problems?"

### Scene Inspection (With Inspector Open)

For these examples, make sure the Needle Inspector is open in your browser with a three.js scene loaded:

**Exploring scenes:**
> "Show me all the lights in my scene"
> "What materials am I using?"
> "Find all the cameras and tell me where they're positioned"
> "List all the meshes and their triangle counts"
> "Which objects in my scene are invisible?"

**Editing and tweaking:**
> "Change the directional light intensity to 0.5"
> "Make the sphere at position (0, 1, 0) red"
> "Hide all helper objects"
> "Set the fog color to light blue"

**Getting creative help:**
> "How can I make this look more photorealistic?"
> "What's the best way to add shadows to my scene?"
> "How do I create a metallic material?"
> "Suggest ways to improve the lighting"

**Analyzing and debugging:**
> "Why is my scene loading slowly?"
> "Which objects have the most geometry?"
> "Are there any materials with missing textures?"
> "What's causing the low frame rate?"

**Learning:**
> "Explain what this material's properties do"
> "How does the environment map affect the scene?"
> "What's the difference between a point light and a spot light?"
> "Show me best practices for three.js lighting"

Just ask naturally - your AI assistant can see what the Inspector sees and will help you understand and modify your 3D scene.


## Built-in Tools

The Needle MCP Server comes with built-in tools that are always available, even without the Inspector:

### `needle_search` — Search Needle Knowledge Base

Search across Needle Engine documentation, forum posts, and community discussions. Returns results ranked by semantic similarity.

**Example queries:**
- "How to add physics components"
- "WebXR hand tracking"
- "Deploy to Vercel"
- "Custom shaders in Needle"

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string | What to search for |
| `limit` | number | Maximum results (1-20, default: 5) |

This is perfect for getting AI assistance with Needle Engine development — your AI can search the docs and provide accurate, up-to-date answers.

### `needle_cloud_me` — Get Current User

Returns information about the currently logged-in Needle Cloud user, including name, email, and profile picture.

This is useful for AI workflows that need to know who's logged in or personalize responses.


## Inspector Tools

When you have the Needle Inspector open in Chrome, additional tools become available for interacting with 3D scenes:

1. The Inspector connects to the MCP server running locally (`localhost:8424`)
2. Your AI assistant can query the Inspector for scene information
3. The AI sees the same hierarchy, objects, and properties that you see
4. When you ask the AI to make changes, it sends commands through the Inspector
5. Changes appear instantly in your browser

This creates a powerful workflow where you can use natural language to explore and modify complex 3D scenes without manually clicking through the Inspector interface.

See [Needle Inspector for Chrome](../three/needle-devtools-for-threejs-chrome-extension.md) for details on the Inspector tools and capabilities.


## Troubleshooting

**Claude Desktop not connecting?**
- Quit Claude completely and restart it (not just close the window)
- Look for the 🔌 icon in the bottom-right corner - that means it's working
- Make sure the MCP server is running: `npx needle-cloud start-server`
- Double-check you followed the setup steps above

**Cursor not seeing Needle?**
- Make sure you're in Agent Mode (not Ask Mode)
- Try restarting Cursor
- Check that you created the `.cursor/mcp.json` file in your project
- Verify the MCP server is running

**VS Code not working?**
- Make sure you have a recent version of VS Code (1.102 or newer)
- Check that GitHub Copilot is active
- Verify the MCP server is running

**Can't see scene information?**
- Open the Needle Inspector extension in your browser
- Make sure you're viewing a page with a three.js scene
- The Inspector should show the scene hierarchy - if not, try refreshing the page
- Check the browser console for any error messages

**AI says it can't access the scene:**
- Verify the Needle Inspector is open and showing your scene
- Make sure the MCP server is running (`npx needle-cloud start-server`)
- Try closing and reopening the Inspector
- Check that your AI tool is properly configured with the MCP server URL


## Example Workflow

Here's a typical workflow using AI with the Needle Inspector:

1. **Open your scene**: Load a webpage with your three.js project
2. **Launch Inspector**: Click the Needle Inspector extension icon
3. **Ask for an overview**: *"What's in this scene?"*
4. **Explore specifics**: *"Show me the properties of the main camera"*
5. **Make changes**: *"Adjust the fog density to 0.02"*
6. **Get suggestions**: *"How can I improve performance here?"*
7. **Learn**: *"Explain what the roughness property does on this material"*

The AI becomes your assistant, helping you understand, debug, and improve your 3D content through conversation.


## What's Next?

Now that you're connected:
- Open the Needle Inspector on any three.js website
- Try asking about the scene structure
- Get AI help with tweaking materials and lighting
- Ask for optimization suggestions
- Learn three.js concepts by exploring real examples

For more help:
- [Needle Engine Docs](/index.md)
- [Needle Inspector Guide](../three/needle-devtools-for-threejs-chrome-extension.md)
- [three.js Integration](../three/index.md)

:::tip Using Needle Engine?
The Inspector has special features when used with Needle Engine projects, and the AI can help you work with Needle-specific components, networking, and XR features.
:::
