---
title: Web Essentials for 3D Developers
description: A practical introduction to the web stack — Node.js, npm, TypeScript, and Vite — for Unity and Blender developers building with Needle Engine.
---

# Web Essentials for 3D Developers

If you come from Unity or Blender, you already think in scenes, components, and assets. The web adds one more layer: a **build toolchain** that packages everything into something browsers can run. This guide walks you through it — no prior web experience needed.

By the end you'll understand:
- What Node.js and npm are and why you need them
- What `package.json` and `package-lock.json` do
- How TypeScript fits in and why it's used
- What Vite does and when you interact with it
- How all of this maps to the familiar Unity/Blender workflow

:::tip Just want the files explained?
See [Project Structure](/docs/explanation/core-concepts/project-structure) for a file-by-file reference of the web project.
:::

---

## The web runtime in one sentence

A Needle Engine project compiles your **TypeScript components + 3D assets + HTML** into a folder of static files that any browser can open — no plugin, no install, just a URL.

---

## Node.js — the engine room

[Node.js](https://nodejs.org/) lets JavaScript run on your machine (outside a browser). Needle Engine uses it at **development time** to:

- Run the local dev server (`npm run dev`)
- Compile TypeScript to JavaScript
- Bundle and optimise files for production (`npm run build`)

Node.js does **not** run in the final browser build — it's purely a development tool, like Unity's Editor process.

:::tip Check your install
```bash
node -v   # e.g. v20.11.0
npm -v    # e.g. 10.2.4
```
If either command fails, [download Node.js](https://nodejs.org/) (LTS version recommended).
:::

---

## npm — the package manager

**npm** (Node Package Manager) ships with Node.js. It downloads and manages the libraries your project depends on.

| Web | Unity | Blender |
|-----|-------|---------|
| npm | Package Manager | — |
| `package.json` | `Packages/manifest.json` | — |
| `node_modules/` | `Library/` | — |
| `package-lock.json` | `.meta` files | — |

### Scaffolding a new project

```bash
npm create needle
```

This is the fastest way to start a standalone Needle Engine project from the terminal — no Unity or Blender required. It asks a few questions (project name, framework) and generates a ready-to-run web project for you:

```
┌  Welcome to Needle Engine! 🌵
│
◇  Where should we create your project?
│  my-project
│
◇  What framework do you want to use?
│  HTML, CSS, JavaScript with Vite
│
└  Your project is ready!

Next steps:
  1: cd my-project
  2: npm install
  3: npm run dev
```

### The core npm commands

```bash
npm install        # Download all dependencies listed in package.json
npm run dev        # Start the local development server
npm run build      # Build production-ready files into dist/
```

Needle runs these for you automatically when you press Play or click Build in Unity/Blender. You only need to run them manually when working directly in the terminal.

---

## package.json — your project's manifest

Every web project has a `package.json` at its root. Open it and you'll find:

```json
{
  "name": "my-needle-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "dev-host": "vite --host"
  },
  "dependencies": {
    "@needle-tools/engine": "^4.0.0",
    "three": "^0.160.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

- **`scripts`** — shortcuts for terminal commands. `npm run dev` runs the `"dev"` entry.
- **`dependencies`** — libraries needed at runtime (Needle Engine, three.js).
- **`devDependencies`** — tools needed only during development (TypeScript, Vite).

You rarely edit this by hand. When you add a package via `npm install some-library`, npm updates it automatically.

### package-lock.json

`package-lock.json` is automatically generated and records the **exact version** of every installed package (including sub-dependencies). Never edit it manually — but always commit it to git. It ensures every team member and your CI/CD pipeline installs identical versions.

---

## TypeScript — JavaScript with types

Needle Engine components are written in **TypeScript** (`.ts` files). TypeScript is JavaScript with optional type annotations — it compiles to plain JavaScript before running in the browser.

**Why TypeScript instead of plain JavaScript?**

- Errors are caught while you type, not at runtime
- Your editor can autocomplete component properties and methods
- It mirrors C# enough that Unity developers feel at home

```ts
// TypeScript — familiar if you know C#
import { Behaviour, serializable } from "@needle-tools/engine";

export class Rotator extends Behaviour {
    @serializable()
    speed: number = 1;

    update() {
        this.gameObject.rotateY(this.speed * this.context.time.deltaTime);
    }
}
```

You don't need to manually compile TypeScript — Vite handles that automatically when the dev server is running.

:::tip New to TypeScript?
[TypeScript Essentials](/docs/tutorials/fundamentals/typescript-essentials) covers the language fundamentals in about 20 minutes.
:::

---

## Vite — the build tool

[Vite](https://vitejs.dev/) is the development server and bundler for Needle Engine projects. Think of it as Unity's background compilation process — it watches your files and rebuilds instantly when something changes.

### What Vite does

| Task | How |
|------|-----|
| Serve the local site at `https://localhost:3000` | `npm run dev` |
| Hot-reload when you save a file | Automatic while dev server runs |
| Compile TypeScript → JavaScript | Automatic |
| Bundle everything into `dist/` for deployment | `npm run build` |

### vite.config.js

The `vite.config.js` file at the project root configures Vite. Needle adds its own plugin here so the build works out of the box. You usually don't need to touch this file unless you're adding framework integrations (React, Vue, Svelte) or custom build steps.

---

## How it all fits together

Here's the full picture from source to browser:

```
Your files                   Build tools              Browser
─────────────────────────────────────────────────────────────
src/scripts/*.ts  ──┐
index.html        ──┤  Vite + TypeScript  ──►  dist/  ──►  🌐
assets/*.glb      ──┘  (npm run build)
```

During development (`npm run dev`), Vite serves files directly — no `dist/` folder needed. The browser connects to the local server and updates live as you edit.

---

## Mapping the web stack to Unity/Blender

| Web | Unity | Blender | Role |
|-----|-------|---------|------|
| Visual Studio Code | Unity Editor | Blender | Where you write code |
| TypeScript (.ts) | C# scripts | Python scripts | Component logic |
| npm | Package Manager | — | Dependency management |
| `package.json` | `Packages/manifest.json` | — | Lists dependencies |
| `node_modules/` | `Library/` | — | Downloaded packages (don't commit) |
| `npm run build` → `dist/` | Build → `Build/` | — | Deployable output |
| `npm run dev` | Play Mode | — | Local preview with live reload |

---

## Checklist: what you should now understand

- [ ] Node.js runs JavaScript on your machine for development tasks
- [ ] npm installs and manages packages (like Unity's Package Manager or Blender add-ons)
- [ ] `package.json` lists your dependencies; `package-lock.json` pins exact versions
- [ ] TypeScript compiles to JavaScript and adds type safety
- [ ] Vite runs the dev server, hot-reloads changes, and bundles for production
- [ ] `npm run dev` = Play Mode; `npm run build` = Build

---

## Next steps

- [Project Structure](/docs/explanation/core-concepts/project-structure) — every file and folder explained
- [TypeScript Essentials](/docs/tutorials/fundamentals/typescript-essentials) — learn the language
- [For Unity Developers](/docs/tutorials/fundamentals/for-unity-developers) — Unity-to-web transition guide
- [Create Components](/docs/how-to-guides/scripting/create-components) — start writing your own scripts
