---
title: AI & Needle Engine
description: Use AI to ask questions, write code, and interact with live 3D scenes — all with Needle Engine knowledge built in.
---

# AI & Needle Engine

Needle Engine integrates with popular AI tools so you can get help, write components, and inspect live scenes — all without leaving your workflow.

---

## Code with AI

The **Needle Engine skill** gives your AI coding assistant deep knowledge of the entire engine — so it can write components, debug issues, and answer questions with full context.

### Install

```bash
npx skills add needle-tools/ai
```

Works with **Claude Code, Cursor, GitHub Copilot, Codex, Gemini CLI, Windsurf**, and many more.

:::tip Automatic Setup
If you're already using `@needle-tools/engine`, the skill installs automatically via the Vite plugin — no manual setup needed.
:::

### What the Skill Knows

The skill provides your AI assistant with comprehensive context about:

- **Components & Lifecycle** — creating components, `start()`, `update()`, `onEnable()`, serialization, decorators
- **Physics** — Rapier integration, rigidbodies, colliders, raycasting, triggers, character controllers
- **Networking & Multiplayer** — state sync, RPC calls, room management, custom server setup
- **WebXR (VR & AR)** — session management, controllers, hand tracking, spatial UI, Everywhere Actions
- **Animation** — Animator, PlayableDirector, timeline control, blending
- **UI** — canvas rendering, text, buttons, layout, responsive design
- **Deployment** — Vite configuration, optimization, compression, hosting platforms
- **Editor Integration** — Unity/Blender workflows, export pipeline, glTF extensions

### How It Works

The skill bundles curated documentation and API references into a format that AI assistants understand natively. When you ask your AI to "add a physics-based interaction" or "set up multiplayer sync", it already has the full picture — no manual context needed.

The skill is [open source](https://github.com/needle-tools/ai). Contributions are welcome.

---

## Connect AI to your live scenes

The **[Needle MCP Server](./needle-mcp-server)** lets AI tools talk directly to your running 3D projects via the [Needle Inspector](../three/needle-devtools-for-threejs-chrome-extension). Works with Claude Desktop, Cursor, VS Code Copilot, Windsurf, and more.

**What it can do:**
- Search all Needle documentation with semantic search
- Inspect scene hierarchies, materials, and properties in real time
- Edit objects and settings through natural language
- Debug and optimize live scenes

**[Set up the MCP Server →](./needle-mcp-server)**

---

## Let AI read your logs

When the local dev server is running, the Needle Engine Vite plugin writes both **client-side logs** (from the browser) and **server-side logs** (from the dev server / build process) to files inside your web project's `node_modules/.needle/logs` directory:

```
node_modules/.needle/logs
```

Pointing your AI coding assistant at this folder lets it read what actually happened — browser errors, build warnings, and server output — so it can debug issues with real context instead of guessing. See [Debugging Parameters & Options](/docs/how-to-guides/debugging/) for more.

:::tip Great for testing on device
This is especially helpful when testing on any device where you can't easily attach DevTools — Android, **iOS/iPadOS**, **Meta Quest**, **visionOS (Apple Vision Pro)**, or any **WebXR** VR/AR headset. Because the logs are written to a file on your dev machine, you get the device's console output even on platforms (like iOS and visionOS) where remote debugging is awkward or unavailable. Point the AI at the log file and let it drive a hands-on loop: the AI tells you what to tap, you do it and reply "done", and the AI reads the freshly written logs to see what happened — then tells you the next step. No copy-pasting console output back and forth.
:::

---

## Use Needle docs with any AI

Every documentation page is available as plain markdown — just change `.html` to `.md` in the URL.

For local models (Ollama, etc.) or tools that accept a context file:

- **[llms.txt](https://cloud.needle.tools/llms.txt)** — compact, essential docs
- **[llms-full.txt](https://cloud.needle.tools/llms-full.txt)** — complete documentation

---

## Ask questions

**[Needle Forum AI](https://forum.needle.tools)** — Ask publicly. Searches all Needle docs, forum posts, and community content. Answers are visible to the community.

**[Needle Cloud AI](https://cloud.needle.tools/team#ai)** — Ask privately. Same knowledge base, private to your team.
