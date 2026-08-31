---
title: WebMCP — Use Needle Apps Through Your Browser's AI Agent
description: Needle docs, the Inspector, the Mesh Baker and FastCut hand their capabilities to the AI agent in your browser. Ask for what you want and the agent operates the site directly — no install, no server, no API keys.
---

# WebMCP

Needle web apps describe what they can do to the AI agent in your browser. Ask for what you want, and the agent uses the site directly — it calls the app's own functions instead of guessing which button to click.

Nothing to install, no server to run, no API key. If your browser's agent supports **WebMCP**, the tools are simply there when you open the page.

## What you can do

**Read the docs with an agent that can search them.** Every page in this documentation exposes a search tool covering all Needle documentation, API reference, forum posts, Discord threads and source code. Ask *"how do I add a rigidbody?"* while you are on any docs page and the agent searches the real knowledge base instead of recalling something vaguely Needle-shaped.

**Work with a live 3D scene.** The [Needle Inspector](/docs/three/needle-devtools-for-threejs-chrome-extension) hands over the scene graph on the page — what is in it, how it is set up, and changing it. *"What is making this scene slow?"*, *"list every material using a transparent shader"*.

**Optimize a model.** The [Needle Mesh Baker](/docs/products/needle-mesh-baker) can load a model and bake it down to a triangle budget. *"Bake this to 6,000 triangles and show me the comparison."*

**Cut out and pack images.** [FastCut](https://fastcut.needle.tools) removes backgrounds, splits sprite sheets and packs images into a grid. *"Remove the background from these four and export them as one sheet."*

**Manage your projects.** [Needle Cloud](/docs/cloud/) is being fitted with tools for your hosted projects and assets.

More Needle apps are getting tools as we build them out. The agent always discovers the current set from the page itself, so the reliable move is to open a Needle app and ask your agent what it can do here.

## Why this is better than an agent clicking around

An agent automating a website normally works from the outside: read the DOM, find something that looks like a button, click it, hope it did what it looked like it would do. On real flows that guesswork fails often.

When the page publishes its own tools, the agent gets intent instead of pixels. *"Bake this model to 6,000 triangles"* is one call with a typed number — not a hunt for a slider and a guess at where to drag it. It keeps working when we redesign the page, and it runs inside your tab where you are already signed in, so your data never detours through a third-party service.

## What you need

WebMCP is new, and the honest answer is that the client side is ahead of nothing and behind a lot. Two pieces have to line up: a browser that implements WebMCP, and an agent that actually calls the tools it finds.

- **Browser** — Chromium-based browsers. Edge 147+ and ChatGPT Atlas expose it directly. Chrome implements it from version 149 but only reveals it to a site carrying an [origin trial](https://developer.chrome.com/origintrials) token — a site that ships one works for ordinary visitors with no flag, which is how the [Needle Mesh Baker](/docs/products/needle-mesh-baker) does it. For a site that does not, `chrome://flags/#enable-webmcp-testing` turns it on locally.
- **Agent** — the narrower of the two. The <img class="inline-logo" src="/imgs/openai-logo.webp" title="ChatGPT" alt="ChatGPT" /> ChatGPT app calls page tools, as do Gemini in Chrome and Chrome's [Model Context Tool Inspector extension](https://developer.chrome.com/docs/ai/webmcp). Assistants that still drive pages by clicking and scraping will not pick them up.

The standard is deliberately model-agnostic, so support keeps broadening. Needle apps expose their tools now, which means they work the moment your agent of choice learns to use them.

::: tip Not seeing any tools?
Almost always one of the two above: the browser has WebMCP switched off, or the agent you are using does not call WebMCP tools yet. [Chrome's WebMCP guide](https://developer.chrome.com/docs/ai/webmcp) tracks the current state.
:::

## WebMCP or the Needle MCP Server?

They solve different halves of the problem, and they work well together.

| | **WebMCP** | **[Needle MCP Server](/docs/ai/needle-mcp-server)** |
|---|---|---|
| **Where the agent lives** | In your browser | Your AI assistant — Claude, Cursor, VS Code Copilot, Codex |
| **What it reaches** | The page you have open | Your project files, Unity/Blender editor, docs, and live scenes via the Inspector |
| **Setup** | None — it ships with the page | Connect your AI client once |
| **Works today with** | Gemini in Chrome | Claude, Cursor, Copilot, Codex, Antigravity |
| **Best for** | Driving a Needle web app in the moment | Coding, debugging, and editing your project |

Use WebMCP when the thing you want to act on is on screen. Use the MCP Server when you want your coding assistant to work on the project behind it — writing components, reading logs, and pulling live scene edits back into your source.

If you want AI help with Needle right now, the [Needle MCP Server](/docs/ai/needle-mcp-server) is the one that works with the assistants people actually use today.

## Exposing tools from your own project

There is no Needle Engine API for registering WebMCP tools yet — support is currently built into Needle's own web apps. WebMCP is a plain browser API, though, so you can register tools from a Needle Engine component today with `document.modelContext.registerTool()`. See the [WebMCP specification](https://github.com/webmachinelearning/webmcp) and [Chrome's guide](https://developer.chrome.com/docs/ai/webmcp); expect the API to shift while the standard is a draft.

::: tip Looking for something else?
- [**AI for Needle Engine**](/docs/ai/) — coding skills, log access, and AI workflows
- [**Needle MCP Server**](/docs/ai/needle-mcp-server) — connect Claude, Cursor and other AI tools to your project
- [**Needle Inspector**](/docs/three/needle-devtools-for-threejs-chrome-extension) — inspect and edit live 3D scenes
:::
