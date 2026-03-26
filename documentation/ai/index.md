---
title: AI & Needle Engine
description: Use AI to ask questions, write code, and interact with live 3D scenes — all with Needle Engine knowledge built in.
---

# AI & Needle Engine

Needle Engine integrates with popular AI tools so you can get help, write components, and inspect live scenes — all without leaving your workflow.

---

## Ask questions

**[Needle Forum AI](https://forum.needle.tools)** — Ask publicly. Searches all Needle docs, forum posts, and community content. Answers are visible to the community.

**[Needle Cloud AI](https://cloud.needle.tools/team#ai)** — Ask privately. Same knowledge base, private to your team.

---

## Code with AI

Install the **Needle Engine skill** to give your AI coding assistant built-in knowledge of Needle Engine — components, lifecycle, serialization, physics, networking, WebXR, and more.

| Tool | How to install |
|------|----------------|
| Claude Code | `/plugin install needle-engine` |
| Other tools | See [github.com/needle-tools/ai](https://github.com/needle-tools/ai) |

The skill is open source. Contributions for additional tools (Codex, Copilot, etc.) are welcome.

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

## Use Needle docs with any AI

Every documentation page is available as plain markdown — just change `.html` to `.md` in the URL.

For local models (Ollama, etc.) or tools that accept a context file:

- **[llms.txt](https://cloud.needle.tools/llms.txt)** — compact, essential docs
- **[llms-full.txt](https://cloud.needle.tools/llms-full.txt)** — complete documentation
