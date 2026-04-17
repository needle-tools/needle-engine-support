---
home: false
description: Build 3D web experiences with Unity, Blender, or three.js that deploy instantly to any device - no app stores, no waiting, no limitations.
next: ./getting-started/index.md
editLink: false
lastUpdated: false
footer: "Copyright © 2025 Needle Tools GmbH"
---

<video-embed :sources='["https://engine.needle.tools/samples-videos/showcase/hero-header-video-av1.mp4", "https://engine.needle.tools/samples-videos/showcase/hero-header-video-h264.mp4"]' />

# <logo-header logo="/imgs/needle-logo.webp" alt="Needle Engine Logo">Needle Engine</logo-header>

**Build 3D web experiences that work everywhere.** From browser to VR headsets, mobile AR to iOS WebXR – create once, deploy anywhere. No app stores, no waiting, no limitations.

## Why Needle Engine?

**🚀 Deploy Instantly to the Web**
Build on your machine, deploy anywhere. Share your 3D experiences with a simple URL or QR code. No app stores, no waiting for approval, no installation required.

**🌐 True Cross-Platform**
One codebase runs everywhere – desktop, mobile, VR headsets (Meta Quest, Apple Vision Pro), and mobile AR including native iOS WebXR support. When new XR devices launch, your apps work automatically.

**🎨 Work in Unity, Blender, or Pure Code**
Full-featured integrations for both **[Unity](/docs/unity/)** and **[Blender](/docs/blender/)** — modeling, materials, animations, lightmaps, and more. Or skip the editors entirely and [build from code](/docs/three/) with three.js.

**🎯 Built-in Rapier Physics**
Full physics simulation with rigidbodies, colliders, raycasting, and character controllers – powered by [Rapier](https://rapier.rs/), ready to use with zero setup.

**🤝 Multiplayer & XR Built-In**
Collaboration and XR aren't afterthoughts – they're core features. Add multiplayer, voice chat, or immersive XR with a single component.

**⚡️ Optimized for Performance**
Powerful compression and optimization pipeline ensures your files are small and load fast. Built on the glTF standard for maximum compatibility.


## What's New
Latest features, updates, and documentation changes

<whats-new />

<br/>

## Choose Your Path

<style>
.path-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.path-card {
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease, background 0.3s ease;
}

.path-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.8);
}

html[data-theme='dark'] .path-card {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

html[data-theme='dark'] .path-card:hover {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
</style>

<div class="path-cards">

<div class="path-card">

### 🎓 Learning

**Start with step-by-step tutorials**

Perfect for newcomers who want to learn the fundamentals.

- [Getting Started](./getting-started/)
- [TypeScript Essentials](./tutorials/fundamentals/typescript-essentials)
- [For Blender Artists](./tutorials/fundamentals/for-blender-artists)
- [For Unity Developers](./tutorials/fundamentals/for-unity-developers)
- [**Browse all Tutorials**](./tutorials/)

</div>

<div class="path-card">

### 🔧 Problem Solving

**Jump straight to practical guides**

Get things done with focused how-to instructions.

- [Create Components](./how-to-guides/scripting/create-components)
- [Deploy to Production](./how-to-guides/deployment/)
- [Use Physics](./how-to-guides/scripting/use-physics)
- [Add Multiplayer](./how-to-guides/networking/)
- [Enable WebXR](./how-to-guides/xr/)
- [**Browse all How-To Guides**](./how-to-guides/)

</div>

<div class="path-card">

### 📚 Understanding

**Explore concepts and architecture**

Deepen your knowledge of how Needle Engine works.

- [Features Overview](./explanation/core-concepts/features-overview)
- [Vision & Philosophy](./explanation/core-concepts/vision)
- [Technical Architecture](./explanation/architecture/technical-overview)
- [Project Structure](./explanation/core-concepts/project-structure)
- [**Browse all Explanations**](./explanation/)

</div>

<div class="path-card">

### 📖 Reference

**Look up specific APIs**

Quick reference for components, methods, and configuration.

- [Component Reference](./reference/components)
- [Lifecycle Methods](./reference/api/lifecycle-methods)
- [TypeScript API Docs](https://engine.needle.tools/docs/api/latest)
- [**Browse all Reference**](./reference/)

</div>

</div>

:::tip Build with AI
Install the **[Needle Engine skill](./ai/)** to give your AI coding assistant built-in knowledge of the engine. Works with Claude Code, Cursor, GitHub Copilot, Codex, Gemini CLI, and many more. Auto-installs via the Vite plugin, or install manually:
```bash
npx skills add needle-tools/ai
```
You can also **[connect AI to your live 3D scenes](./ai/needle-mcp-server)** with the Needle MCP Server.
:::

<br/><br/>

## What Our Users Say
[See all testimonials →](/docs/help/testimonials)

<br/>

<quoteslides>

<testimonial
  name="Mike Bardeggia"
  role="Founder, Pedestrian-X"
  src="https://www.pedestrian-x.com/"
>
I've tried Adobe Aero, 8th Wall, and Niantic Lightship — all either dropped or required app store downloads. Finally, I found Needle with AppClip tech. I feel like I've found the right path with Needle.
</testimonial>

<testimonial
  name="Dario Sanchez"
  role="why.de"
  src="https://why.de"
  img="./testimonial/DarioSanchez.jpg"
>
Needle Engine has been the most flexible, easy to implement, and solid web AR implementation I've come across.
</testimonial>

<testimonial
  name="Steven"
  role="CTO, Virtually Sports"
  src="https://www.youtube.com/watch?v=naPlw5aDJHs&t=3s"
>
We have something like 12 products used globally, made with Needle — it's been a fantastic tool for us over the past 2-3 years. As a tool, Needle Engine has been absolutely instrumental in us getting our products out the door. The support was really, really good. It just makes the workflow so easy, even people that aren't developers only have to click one button. We definitely plan on staying with Needle for the foreseeable future.
</testimonial>

<testimonial
  name="Fran & Nick"
  role="Cartoon Fun, UK"
  src="https://www.youtube.com/watch?v=F6_buCHZhWk&t=109s"
>
Using Needle Tools, it's just magical stuff to work with — it's brilliant. The speed of iteration, being able to see edits on the fly, is absolutely awesome. It's a total game changer. I've never seen or worked with anything like it. And none of this would be happening if it wasn't for Needle Tools.
</testimonial>

<testimonial
  name="Duncan Macintosh"
  role="Director, Gamola"
  src="https://www.youtube.com/watch?v=gZuC40Alr88&t=61s"
>
The reason we got into Needle, which I absolutely love, is because we were looking for a solution to show our interactive work. I saw some examples and it blew my mind. It just works on everything — that's the mad thing, it just works on every browser. It can be used by people like me who can't code.
</testimonial>

<testimonial
  name="Toby"
  role="XR Developer, Live Studios. MIT Reality Hack Winner"
  src="https://www.youtube.com/watch?v=3oHyrx8e20g&t=261s"
>
I discovered Needle which pretty much addressed all the issues I had. I could use Unity, my existing assets, the IDE I liked. There were so many pre-made components, samples, and such a well-made documentation that it felt really easy to get started. At the MIT hackathon, I think we were by far the fastest team.
</testimonial>

<testimonial
  name="Martin F"
  role="3D Generalist, Slovenia"
  src="https://www.youtube.com/watch?v=1KKfct3Zpcw&t=66s"
>
Needle Engine really eased up a lot of developer work — it's very artist friendly. The workflow was very fast and agile. When we saw it's multiplayer, we started screaming in our office. For everyone wanting to do web experiences or AR, I really recommend Needle Engine. Amazing support, amazing community — I love it.
</testimonial>

<testimonial
  name="Steffen Aaland"
  role="3D Artist"
  src="https://www.artstation.com/steffenaaland"
  img="./testimonial/SteffenAaland.webp"
>
I have tested in your engine, and it worked at first try, which i have not experienced in any other engine.
</testimonial>

<testimonial
  name="Chris Mahoney"
  role="Founder, Our Computer Company. Ex-Unity, Ex-Lamina1"
  src="https://x.com/mahoneymatic/status/1562981022932684800?t=qNqojoZkk2CZrJa7dGzqng&s=19"
  img="./testimonial/ChrisMahoney.webp"
>
Unbelievable Unity editor integration by an order of magnitude,
  and as straightforward as the docs claim. Wow.
</testimonial>

<testimonial
  name="Rinesh Thomas"
  role="Game Developer, Assassin's Creed VR"
  src="https://x.com/rineshthomas/status/1566342798063947777?t=z6sG3Z7mol-NfIRfTTKqCQ&s=19"
  img="./testimonial/RineshThomas.webp"
>
    This is the best thing I have seen after cinemachine in unity. Unity should acquire this
</testimonial>

<testimonial
  name="Matthew Pieri"
  role="Game Developer"
  src="https://discord.com/channels/717429793926283276/1097572505738301571/1097572505738301571"
  img="./testimonial/MatthewPieri.webp"
>
Spent the last 2.5 months building this game, never built a game/never used unity before, but absolutely loving the whole process with needle tools. So rapid!  Would love to make a career building AR experiences!
</testimonial>

<testimonial
  name="Yuzu"
  role="Web Game Developer"
  src="https://discord.com/channels/717429793926283276/1264966222467043433/1265268833485066240"
  img="./testimonial/Yuzu.webp"
>
My workflow has been optimized 10X ever since i started using needle
</testimonial>

</quoteslides>


<br/><br/><br/>

<copyright></copyright>

<ClientOnly>
<removeserviceworker/>
</ClientOnly>
