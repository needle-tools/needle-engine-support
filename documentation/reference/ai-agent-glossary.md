---
title: AI Agent Glossary
description: Lookup reference for AI agent terms, MCP concepts, Needle AI tools, browser tools, image tools, and common agent phrases.
---

# AI Agent Glossary

This is a reference page for AI agent concepts, MCP terms, Needle AI tools, and common phrases you may see in agentic workflows.

For a friendly overview, see [Understanding AI Agents](/docs/explanation/understanding-ai-agents). If you mainly want to understand terminal output, start with [Understanding Terminal Commands in AI Agent Workflows](/docs/explanation/understanding-ai-agent-terminal-commands). For command lookup, see the [Terminal Command Glossary](/docs/reference/terminal-command-glossary).

## Agent concepts

| Term | Meaning |
| --- | --- |
| Agent | An AI assistant that can pursue a goal by using tools, reading results, and continuing through a loop. |
| Agent mode | A mode in some AI clients where the assistant can edit files, run commands, and call tools. |
| Ask mode | A mode where the assistant mostly answers questions and may not change files or run tools. |
| Assistant | The AI participant in the conversation. |
| Context | The information available to the model right now: messages, files, logs, docs, screenshots, tool results, or scene data. |
| Context window | The maximum amount of information the model can consider at one time. |
| Goal | The desired outcome the agent is working toward. |
| Instruction | A rule or request that guides the model's behavior. |
| Loop | The repeated observe, plan, act, and verify cycle used by agents. |
| Message | One conversation item, such as a user request, assistant reply, tool call, or tool result. |
| Model | The AI system generating the next response or tool call. |
| Orchestration | Coordinating models, tools, subagents, memory, and permissions to complete a task. |
| Plan | A short sequence of intended steps. Useful for multi-step work. |
| Prompt | The text and context sent to the model. |
| RAG | Retrieval-augmented generation: searching external docs or data and using the results as context. |
| Subagent | A specialized helper agent used for a smaller part of the work, such as research, QA, or review. |
| Tool | A callable capability outside the model, such as search, file editing, shell commands, browser automation, or image generation. |
| Tool call | A request from the agent to run a tool with specific arguments. |
| Tool result | The output returned by a tool. |
| Token | A small unit of text processed by the model. Context windows and pricing are often measured in tokens. |
| Turn | One round of interaction. A single user turn can contain multiple tool calls before the agent replies. |
| Verification | Checking whether the work succeeded, usually by running tests, building, inspecting output, or reviewing the result. |
| Workspace | The project folder or set of files an agent is allowed to inspect and edit. |

## Model and retrieval terms

| Term | Meaning |
| --- | --- |
| Embedding | A numeric representation of text, images, or other data used for semantic search. |
| Semantic search | Search by meaning rather than exact words. Useful when asking docs a natural-language question. |
| Vector database | A database optimized for storing embeddings and finding similar content. |
| Hallucination | A confident answer that is not grounded in the available facts. Good tooling reduces this by checking real context. |
| Temperature | A model setting that affects how varied or conservative responses are. Lower values are usually more predictable. |
| Grounding | Connecting an answer to real sources such as files, docs, logs, or tool results. |
| Memory | Information saved across interactions by an AI client. Not all tools have persistent memory. |
| Guardrail | A rule, permission boundary, or validation step that limits what an agent can do. |
| Evaluation | A test or scoring process used to measure whether model behavior is good enough for a workflow. |

## MCP terms

| Term | Meaning |
| --- | --- |
| MCP | Model Context Protocol, a standard way for AI clients to connect to tools and context providers. |
| MCP client | The AI application that connects to an MCP server, such as Claude Desktop, Cursor, VS Code Copilot, or Codex. |
| MCP server | A process that exposes tools and resources to an AI client. |
| MCP tool | A callable action exposed by an MCP server. |
| MCP resource | Readable context exposed by an MCP server. |
| HTTP transport | A connection mode where the MCP server runs persistently and the client connects over HTTP. |
| SSE | Server-sent events, often used with HTTP MCP connections. |
| stdio transport | A connection mode where the AI client starts the MCP server process and communicates through standard input and output. |
| Tool discovery | The step where an AI client learns which tools an MCP server provides. |

## Needle AI and MCP commands

| Command | What it does |
| --- | --- |
| `npx skills add needle-tools/ai` | Installs the Needle Engine skill for compatible AI coding assistants. |
| `npx needle-cloud login` | Signs in to Needle Cloud from the command line. |
| `npx needle-cloud start` | Starts the local Needle Cloud server on `localhost:8424`, including HTTP MCP support. |
| `npx needle-cloud start-server` | Alias for starting the local Needle Cloud server. |
| `npx needle-cloud mcp` | Runs Needle MCP in stdio mode, useful for AI clients that spawn the server directly. |
| `npx needle-cloud send-logs` | Bundles and uploads recent logs for Needle support, with sensitive values redacted. |
| `npx needle-cloud settings remote-ai-tools false` | Disables remote AI tools so project access stays local. |
| `npx needle-cloud settings remote-ai-tools true` | Re-enables remote AI tools. |

## Needle MCP tools

| Tool | What it does |
| --- | --- |
| Search | Searches Needle docs, forum posts, and community discussions by semantic similarity. |
| Load Needle Skill | Loads Needle Engine coding guidance, patterns, and API references into the AI context. |
| Get Project Path | Returns the currently opened Unity or Blender project path. |
| Get Scene Path | Returns the currently opened scene path. |
| Get Web Project Path | Returns the Needle Engine web project directory. |
| Get Log Path | Returns the Unity or Blender editor log path. |
| Read File | Reads a file from the editor or web project. |
| Search Files | Searches project files by regex pattern. |
| List Files | Lists files in project directories. |
| Read Log | Reads or searches editor logs. |
| Read glTF / GLB | Summarizes a glTF or GLB file, including nodes, meshes, materials, animations, and extensions. |
| Hierarchy Search | Searches a Blender scene hierarchy by name or object type when Blender tools are available. |
| Object Details | Inspects object transforms, mesh stats, materials, modifiers, visibility, and Needle components. |
| Selected Objects | Reads the current Blender selection. |
| Object Selection | Selects one or more Blender objects. |
| Scene Settings | Reads Needle scene settings in Blender. |
| Add Component | Adds a Needle component to a Blender object. |
| Component Properties | Changes properties on an existing Needle component. |
| Object Transform | Moves, rotates, or scales Blender objects. |

## Browser and visual tools

| Tool | What it does |
| --- | --- |
| Browser automation | Opens pages, clicks buttons, fills forms, and tests workflows. |
| Screenshot | Captures the visible page or full page for inspection. |
| Console inspection | Reads browser console logs and JavaScript errors. |
| Network inspection | Reads requests, responses, status codes, and failed asset loads. |
| Lighthouse audit | Checks accessibility, SEO, best practices, or performance depending on the tool. |
| Canvas pixel check | Verifies that WebGL or canvas content is actually rendering and not blank. |
| DOM snapshot | Reads the accessible page structure so an agent can find buttons, links, and form fields. |
| Viewport resize | Tests a page at desktop, tablet, or mobile sizes. |
| Local dev server | Runs a project locally so a browser tool can inspect it. |

## Image tools

| Tool | What it does |
| --- | --- |
| Generate image | Creates a new bitmap image from a prompt, useful for mockups, concepts, textures, or placeholders. |
| Edit image | Modifies an existing image, such as removing an object, changing colors, or extending a background. |
| Image search | Finds existing reference images or product images. |
| View image | Inspects a local image file. |
| Texture generation | Creates materials, backgrounds, sprites, or visual references for a 3D scene. |
| Transparent cutout | Generates or edits an image with an alpha channel for UI, sprites, decals, or overlays. |
| Upscale | Produces a higher-resolution image from a smaller source when supported by the tool. |

## Common agent phrases

| Phrase | What it usually means |
| --- | --- |
| "I'll inspect the repo" | The agent will list and search files before editing. |
| "I'll run the build" | The agent will execute the project's build command to check for errors. |
| "I'll verify" | The agent will test, build, open the app, or otherwise check the result. |
| "Tool call" | The agent is asking its host application to run a specific tool. |
| "Reading logs" | The agent is inspecting output from a build, server, browser, Unity, Blender, or Needle. |
| "Context is stale" | The agent needs to re-read files or rerun commands because things may have changed. |
| "Needs approval" | The agent cannot perform an action until a person allows it. Common for network, filesystem, or destructive operations. |
| "Destructive command" | A command that can delete or discard work, such as `rm -rf`, `git reset --hard`, or restoring files. |

## See also

- [Understanding AI Agents](/docs/explanation/understanding-ai-agents)
- [Understanding Terminal Commands in AI Agent Workflows](/docs/explanation/understanding-ai-agent-terminal-commands)
- [Terminal Command Glossary](/docs/reference/terminal-command-glossary)
- [AI & Needle Engine](/docs/ai/)
- [Needle MCP Server](/docs/ai/needle-mcp-server)
- [Needle Inspector for Chrome](/docs/three/needle-devtools-for-threejs-chrome-extension)
