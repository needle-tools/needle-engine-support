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

Talk to your AI assistant about your local and online 3D scenes! Connect Claude, Cursor, or other AI tools to the Needle MCP Server so you can explore your three.js scenes, edit objects, and get help — all through natural conversation.

### Quick Start

1. [Connect your AI assistant](#how-to-connect) to the Needle MCP Server.
2. Start asking questions about Needle Engine, your project, or your 3D scenes!

:::tip Works with your favorite AI tools
Works with Claude Desktop, Cursor, VS Code Copilot, Antigravity, and more.
:::


## What Can You Do with the Needle MCP?

> "How do I add physics to my Needle project?"\
> "Show me how to use WebXR in Needle Engine"\
> "What's the best way to deploy to Vercel?"\
> "Show me all the lights in my scene"\
> "Change the main light color to warm orange"\
> "Why is my scene running slowly?"


## How to Connect

### <img src="/imgs/claude-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="Claude Logo" alt="Claude Logo"/> Using Claude Desktop

**Quick setup:**

1. Open your terminal and run:
   ```bash
   claude mcp add --scope user --transport http needle http://localhost:8424/mcp
   ```

2. Restart Claude Desktop

3. Look for the 🔌 icon in the bottom-right - you're connected!




### <img src="/imgs/codex-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="Codex Logo" alt="Codex Logo"/> Using OpenAI Codex CLI

**Quick setup:**

1. Open your terminal and run:
   ```bash
   codex mcp add needle --url http://localhost:8424/mcp
   ```

2. Start using Codex — it will automatically connect to the Needle MCP server!



### <img src="/imgs/vscode-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="VS Code Logo" alt="VS Code Logo"/> Using VS Code

**Quick setup:**

1. Click to [Install Needle MCP in VS Code](vscode:mcp/install?%7B%22name%22%3A%22needle%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22needle-cloud%22%2C%22mcp%22%5D%7D)

2. Type `#needle` in Copilot chat to see Needle tools, or just ask naturally!

<details>
<summary>Local server setup (for Inspector integration)</summary>

If you want your AI to also interact with live 3D scenes via the Needle Inspector, connect to the local server instead:

1. Open Command Palette: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Choose "MCP: Add Server"
3. Fill in the details:
   - Name: `needle`
   - Transport: `http`
   - URL: `http://localhost:8424/mcp`

See [Connection Modes](#advanced-connection-modes) for more details.

</details>





### <img src="/imgs/cursor-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="Cursor Logo" alt="Cursor Logo"/> Using Cursor

**Quick setup:**

1. Click to [Install Needle MCP in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=needle&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIm5lZWRsZS1jbG91ZCIsIm1jcCJdfQ==)

2. **Important**: Switch to Agent Mode (not Ask Mode)

3. Just ask naturally — Cursor will use Needle tools automatically!

<details>
<summary>Local server setup (for Inspector integration)</summary>

If you want your AI to also interact with live 3D scenes via the Needle Inspector, connect to the local server instead:

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

See [Connection Modes](#advanced-connection-modes) for more details.

</details>

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



## Built-in Tools

The Needle MCP Server comes with built-in tools that are always available, even without the Inspector.

| Tool | Description |
|------|-------------|
| `needle_search` | Search Needle Engine docs, forum posts, and community discussions by semantic similarity. |
| `load_needle_engine_skill` | Load the [Needle Engine skill](/docs/ai/#code-with-ai) with coding guidelines, patterns, and API references. |
| `get_editor_project_path` | Get the path to the currently opened Unity or Blender project. |
| `get_editor_scene_path` | Get the path to the currently opened scene. |
| `get_web_project_path` | Get the path to the Needle Engine web project directory. |
| `get_editor_logpath` | Get the path to the Unity or Blender editor log file. |
| `local_read_file` | Read a file from the editor or web project, with optional line range and text filter. |
| `local_grep` | Search project files by regex pattern, with optional glob and result limit. |
| `local_list_files` | List files in the project directories, with optional glob pattern and recursion. |
| `local_read_editor_log` | Read or search the editor log file by keyword. |
| `local_read_gltf` | Summarize a glTF/GLB file — nodes, meshes, materials, animations, extensions. Supports JSON pointer queries. |


## Additional Tools when using Needle Inspector

When you have the Needle Inspector open in Chrome, additional tools become available for interacting with 3D scenes:

1. The Inspector connects to the MCP server running locally (`localhost:8424`)
2. Your AI assistant can query the Inspector for scene information
3. The AI sees the same hierarchy, objects, and properties that you see
4. When you ask the AI to make changes, it sends commands through the Inspector
5. Changes appear instantly in your browser

This creates a powerful workflow where you can use natural language to explore and modify complex 3D scenes without manually clicking through the Inspector interface.

See [Needle Inspector for Chrome](../three/needle-devtools-for-threejs-chrome-extension.md) for details on the Inspector tools and capabilities.




## Advanced: Connection Modes

The Needle MCP Server supports two connection modes. Both provide the full set of tools. The main difference is how they run.

### Local Server (HTTP/SSE)
```bash
npx needle-cloud start
```
Runs a persistent local server on `localhost:8424`. Your AI client connects via HTTP.

If you're using Needle Engine for Unity or Blender, the local server is usually already running on your machine — the editor integrations start it automatically. See the [setup instructions above](#how-to-connect) to connect your AI client.

### stdio
```bash
npx needle-cloud mcp
```
Your AI client spawns the process directly — no server to start or keep running.

To use stdio mode, configure your AI client with:
```json
{
  "mcpServers": {
    "needle": {
      "command": "npx",
      "args": ["-y", "needle-cloud", "mcp"]
    }
  }
}
```

::: tip Looking for something else?
- [**AI for Needle Engine**](/docs/ai/) — Coding skills, prompt files, and AI workflows
- [**Needle Inspector for Chrome**](/docs/three/needle-devtools-for-threejs-chrome-extension) — Chat with your AI about live 3D scenes
- [**three.js Integration**](/docs/three/) — Using Needle with any three.js project
:::
