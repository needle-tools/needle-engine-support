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

1. [Configure your AI assistant](#how-to-connect) to run `npx -y needle-cloud mcp` as an MCP server.
2. Start your AI assistant. It launches the MCP command for you. The command reuses or starts the shared local server at `localhost:8424`, so the Needle Inspector and editor integrations can connect too.
3. Ask about Needle Engine, your project, or your 3D scenes.

If your AI client only supports an HTTP MCP URL, see [Local Server (HTTP)](#local-server-http) below.

:::tip Works with your favorite AI tools
Works with Claude Desktop, Cursor, VS Code Copilot, Antigravity, and more.
:::


## What Can You Do with the Needle MCP?

> "How do I add physics to my Needle project?"\
> "Show me how to use WebXR in Needle Engine"\
> "Show me all the lights in my scene"\
> "Change the main light color to warm orange"\
> "Why is my scene running slowly?"

Your agent can also pull the edits you made by hand in the [Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension) and apply them to your source code — tweak a material in the browser, then ask your AI to make it permanent.

## How to Connect

The stdio command `npx -y needle-cloud mcp` starts the shared local server when needed. For the HTTP setups below, run `npx needle-cloud start` first and keep it running. Unity and Blender editor integrations may already have started it.

### <img src="/imgs/claude-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="Claude Logo" alt="Claude Logo"/> Using Claude Code

**Quick setup:**

1. Open your terminal and run:
   ```bash
   claude mcp add --scope user --transport stdio needle -- npx -y needle-cloud mcp
   ```

2. Start or restart Claude Code. It starts the Needle MCP command automatically. Use `/mcp` to check the connection.

### <img src="/imgs/claude-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="Claude Logo" alt="Claude Logo"/> Using Claude Desktop

Open Claude Desktop **Settings > Developer > Edit Config** and add Needle to your MCP configuration. If you already have other servers, add the `needle` entry to your existing `mcpServers` object:

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

Save the configuration, fully quit Claude Desktop, and reopen it. It starts the MCP command when it connects; you do not need to start a separate server.

### <img src="/imgs/codex-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="Codex Logo" alt="Codex Logo"/> Using OpenAI Codex CLI

**Quick setup:**

1. Open your terminal and run:
   ```bash
   codex mcp add needle -- npx -y needle-cloud mcp
   ```

2. Start using Codex — it will automatically connect to the Needle MCP server!



### <img src="/imgs/vscode-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="VS Code Logo" alt="VS Code Logo"/> Using VS Code

**Quick setup:**

1. Click to [Install Needle MCP in VS Code](vscode:mcp/install?%7B%22name%22%3A%22needle%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22needle-cloud%22%2C%22mcp%22%5D%7D)

2. Type `#needle` in Copilot chat to see Needle tools, or just ask naturally!

<details>
<summary>HTTP alternative</summary>

If you need an HTTP connection, start `npx needle-cloud start` and add a server with URL `http://localhost:8424/mcp` in VS Code's "MCP: Add Server" command. The stdio setup above also supports Needle Inspector tools.

</details>





### <img src="/imgs/cursor-logo.webp" style="height:3em; vertical-align:middle; margin-top:-.1lh; margin-right:.5em;" title="Cursor Logo" alt="Cursor Logo"/> Using Cursor

**Quick setup:**

1. Click to [Install Needle MCP in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=needle&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIm5lZWRsZS1jbG91ZCIsIm1jcCJdfQ==)

2. **Important**: Switch to Agent Mode (not Ask Mode)

3. Just ask naturally — Cursor will use Needle tools automatically!

<details>
<summary>HTTP alternative</summary>

If you need an HTTP connection, start `npx needle-cloud start` and add this to `.cursor/mcp.json`:

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

The stdio setup above also supports Needle Inspector tools.

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
| Search | Search Needle Engine docs, forum posts, and community discussions by semantic similarity. |
| Load Needle Skill | Load the [Needle Engine skill](/docs/ai/#code-with-ai) with coding guidelines, patterns, and API references. |
| Get Project Path | Get the path to the currently opened Unity or Blender project. |
| Get Scene Path | Get the path to the currently opened scene. |
| Get Web Project Path | Get the path to the Needle Engine web project directory. |
| Get Log Path | Get the path to the Unity or Blender editor log file. |
| Read File | Read a file from the editor or web project, with optional line range and text filter. |
| Search Files | Search project files by regex pattern, with optional glob and result limit. |
| List Files | List files in the project directories, with optional glob pattern and recursion. |
| Read Log | Read or search the editor log file by keyword. |
| Read glTF / GLB | Summarize a glTF/GLB file — nodes, meshes, materials, animations, extensions. Supports JSON pointer queries. |

:::tip No MCP? Use the Search API
The Search tool's knowledge base is also a public HTTP endpoint — see [Search API](/docs/ai/#search-api). Handy for agents without MCP support, CI scripts, or your own tooling.
:::

## <logo-header logo="/blender/logo.png" alt="Blender">Blender Tools</logo-header>

When you're using the **[Needle Blender add-on](/docs/blender/)**, it also registers Blender-specific MCP tools. This means your AI can do more than just read files: it can inspect your Blender scene structure and help make targeted changes.

| Tool | What it does |
|------|---------------|
| Hierarchy Search | Search the Blender hierarchy by name or object type, optionally including Needle components. |
| Object Details | Inspect object details including transforms, mesh stats, materials, modifiers, constraints, visibility, and Needle components. |
| Selected Objects | Read the current Blender selection, optionally with full object details. |
| Object Selection | Select one or more Blender objects by name and set the active object. |
| Scene Settings | Read Needle scene settings such as compression, XR, networking, rendering, and export-related options. |
| Change Scene Settings | Change those scene settings — they control which components are implicitly added during export. |
| Add Component | Add a Needle component to a Blender object and optionally set initial properties. |
| Component Properties | Change one or more properties on an existing Needle component. |
| Object Transform | Move, rotate, and scale Blender objects. |

Try prompts like:
- *"Show me all cameras in my Blender scene"*
- *"What Needle components are on the selected objects?"*
- *"Add OrbitControls to the main camera"*
- *"Set the BoxCollider size on Cube to match the mesh"*
- *"Which materials on this object use image textures?"*

:::tip Blender + AI
If you've seen AI tools announce Blender support recently: Needle already provides this workflow. Start the Blender add-on, connect Claude, Copilot, Cursor, or OpenAI/Codex to Needle MCP, and your AI can work with real Blender scene context. You can also open Needle Cloud AI directly from Blender via `Ask AI about Project`.
:::

## Additional Tools when using Needle Inspector

When you have the Needle Inspector open in Chrome, additional tools become available for interacting with 3D scenes:

1. The Inspector connects to the MCP server running locally (`localhost:8424`)
2. Your AI assistant can query the Inspector for scene information
3. The AI sees the same hierarchy, objects, and properties that you see
4. When you ask the AI to make changes, it sends commands through the Inspector
5. Changes appear instantly in your browser

This creates a powerful workflow where you can use natural language to explore and modify complex 3D scenes without manually clicking through the Inspector interface.

See [Needle Inspector for Chrome](/docs/three/needle-devtools-for-threejs-chrome-extension) for details on the Inspector tools and capabilities.




## Advanced: Connection Modes

The Needle MCP Server supports two connection modes. Both provide the full set of tools. The main difference is how they run.

### Local Server (HTTP)

```bash
npx needle-cloud start
```

Starts the shared local server on `localhost:8424`. Connect your AI client to `http://localhost:8424/mcp` and keep this process running. Unity and Blender editor integrations may already have started it.

### stdio

```bash
npx -y needle-cloud mcp
```

Use this as the command in your AI client's MCP configuration. The client starts the stdio process. It reuses the shared local server if one exists, or starts it automatically; Inspector and editor tools work through this connection too. When the AI client closes the stdio process, the shared server remains available to other apps.

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
- [**WebMCP**](/docs/ai/webmcp) — Let the AI agent in your browser operate Needle web apps directly
- [**Needle Inspector for Chrome**](/docs/three/needle-devtools-for-threejs-chrome-extension) — Chat with your AI about live 3D scenes
- [**three.js Integration**](/docs/three/) — Using Needle with any three.js project
:::
