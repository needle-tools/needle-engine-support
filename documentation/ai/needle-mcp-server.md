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

2. Connect your AI assistant using the instructions below

3. Optional: Install the [Needle Inspector for Chrome](./needle-inspector.md) to chat with your AI about any three.js scene in the browser.

:::tip Works with your favorite AI tools
Works with Claude Desktop, Cursor, VS Code Copilot, Antigravity, and more.
:::


## What Can You Do?

Once connected, open the Needle Inspector on any three.js webpage and chat naturally with your AI assistant:

- **Explore 3D scenes**: "Show me all the lights in my scene"
- **Inspect objects**: "What materials are used in this scene?"
- **Edit properties**: "Change the main light color to warm orange"
- **Get creative help**: "How can I make this scene look more realistic?"
- **Optimize performance**: "Why is my scene running slowly?"
- **Learn techniques**: "How do I add reflections to this material?"
- **Debug issues**: "This object looks weird, what's wrong with it?"

Your AI can actually see your 3D scene through the Inspector and help you work with specific objects, materials, lighting, and settings in real-time.


## How to Connect

<!-- ### Using Claude Desktop

**Quick setup:**

1. Open your terminal and run:
   ```bash
   claude mcp add --scope user --transport http needle http://localhost:8424/mcp
   ```

2. Restart Claude Desktop

3. Look for the 🔌 icon in the bottom-right - you're connected!

**Manual setup:**

If the quick setup doesn't work, you can add Needle manually:

1. Find your Claude settings file:
   - **Mac**: Open `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: Open `%APPDATA%\Claude\claude_desktop_config.json`

2. Add Needle to the file:
   ```json
   {
     "mcpServers": {
       "needle": {
         "url": "http://localhost:8424/mcp"
       }
     }
   }
   ```

3. Restart Claude Desktop

Try it out: *"What objects are in my three.js scene?"*

:::tip
Claude will ask before using any tools - you stay in control!
::: -->


### Using Cursor

**Quick setup:**

1. In Cursor, go to Settings → MCP
2. Look for Needle in the server list and install it

**Manual setup:**

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


### Using VS Code

**Setup:**

1. Open Command Palette: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)

2. Choose "Preferences: Open Settings (JSON)"

3. Add this:
   ```json
   {
     "github.copilot.chat.mcp.servers": {
       "needle": {
         "transport": "http",
         "url": "http://localhost:8424/mcp"
       }
     }
   }
   ```

4. Restart VS Code

**Using it:**

Type `#needle` in Copilot chat to see Needle tools, or just ask naturally!


### Using Antigravity

**Quick setup:**

1. Click the Agent pane menu
2. Select "MCP Servers"
3. Search for "Needle"
4. Click "Install"

That's it! Antigravity will connect automatically.

**Manual setup:**

1. Go to "Manage MCP Servers"
2. Click "View raw config"
3. Add Needle:
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

Antigravity is great at understanding what you want - just describe your goal!


## What to Ask

Here are some examples to get you started. Make sure the Needle Inspector is open in your browser with a three.js scene loaded:

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


## How It Works

When you have the Needle Inspector open in Chrome:

1. The Inspector connects to the MCP server running locally (`localhost:8424`)
2. Your AI assistant can query the Inspector for scene information
3. The AI sees the same hierarchy, objects, and properties that you see
4. When you ask the AI to make changes, it sends commands through the Inspector
5. Changes appear instantly in your browser

This creates a powerful workflow where you can use natural language to explore and modify complex 3D scenes without manually clicking through the Inspector interface.


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
