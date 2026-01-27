---
home: false
next: ./getting-started/index.md
editLink: false
lastUpdated: false
footer: "Copyright © 2025 Needle Tools GmbH"
---

<discountbanner fallback_image="/docs/imgs/banner.webp" />

# Needle Engine

**Build 3D web experiences that work everywhere.** From browser to VR headsets, mobile AR to iOS WebXR – create once, deploy anywhere. No app stores, no waiting, no limitations.

## Why Needle Engine?

**🚀 Deploy Instantly to the Web**
Build on your machine, deploy anywhere. Share your 3D experiences with a simple URL or QR code. No app stores, no waiting for approval, no installation required.

**🌐 True Cross-Platform**
One codebase runs everywhere – desktop, mobile, VR headsets (Meta Quest, Apple Vision Pro), and mobile AR including native iOS WebXR support. When new XR devices launch, your apps work automatically.

**🎨 Work in Powerful 3D Editors**
Use Unity or Blender for modeling, materials, animations, lightmaps, and more. Visual authoring meets web deployment. Perfect for artists and developers collaborating together.

**🤝 Multiplayer & XR Built-In**
Collaboration and XR aren't afterthoughts – they're core features. Add multiplayer or immersive XR with a single component.

**⚡️ Optimized for Performance**
Powerful compression and optimization pipeline ensures your files are small and load fast. Built on the glTF standard for maximum compatibility.

<actiongroup>
    <action href="getting-started/">
    Get Started ⭐
    </action>
    <action href="features-overview">
    Features 🎨
    </action>
    <action href="https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=actionbutton">
    Samples 👓
    </action>
    <action href="xr">
    WebXR 🥽
    </action>
    <action href="cloud/index">
    Needle Cloud ⛅️
    </action>
    <action href="support">
    Help 💬
    </action>
</actiongroup>

## What Developers Say

<quoteslides>

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
  name="Kevin Curry"
  role="Founder, Intangible.ai. Ex-Unity"
  src="https://x.com/kmcurry/status/1574333302022062080"
  img="./testimonial/KevinCurry.webp"
>
needle.tools is a wonderful showcase of what @NeedleTools contributes to 3D via the web. I just love it.
</testimonial>

<testimonial
  name="Brit Gardner"
  role="Senior Software Engineer, Coherence. Ex-Blizzard"
  src="https://x.com/britg/status/1562443905580163072"
  img="./testimonial/BritGardner.webp"
>
Played with this a bit this morning 🤯🤯 pretty magical
</testimonial>

<testimonial
  name="Marc Wakefield"
  role="Augmented Reality Expert"
  src="https://x.com/mrm_design/status/1567391880169545729"
  img="./testimonial/MarcWakefield.webp"
>
This is huge for WebXR and shared, immersive 3D experiences! Thank you so much for putting in the work on this @NeedleTools crew! Hoping @Apple
 sort out their WebXR situation sooner rather than later. The AR part worked flawlessly on my @SamsungMobile S21.
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
  name="Stella Cannefax"
  role="CTO Dora, Game Developer"
  src="https://x.com/0xstella/status/1574853012585172993"
  img="./testimonial/StellaCannefax.webp"
>
Thanks to @NeedleTools, seeing quite a bit of this solution for web-based real time 3d tools - export scenes from Unity, where you can leverage the extensive 3d editor ecosystem & content, and then render them in your own web-based engine
</testimonial>

<testimonial
  name="Pete Patterson"
  role="Spatial Computing Specialist"
  src="https://x.com/VRSpatialist/status/1572300394285383680"
  img="./testimonial/PetePatterson.webp"
>
Finally checking out @NeedleTools with Unity. Super easy to get something up and running in the cloud using their
 integrations
</testimonial>

<testimonial
  name="Dilmer Valecillos"
  role="Developer Advocate for Mixed Reality @Meta, Tutorial Creator"
  src="https://x.com/Dilmerv/status/1562209049856188420"
  img="./testimonial/DilmerValecillos.webp"
>
 This is amazing and if you are curious about #WebXR with Unity this will help us get there
</testimonial>

<testimonial
  name="VRSpatialist"
  src="https://discord.com/channels/717429793926283276/722046635525537842/1030201907513405530"
  img="./testimonial/VRSpatialist.webp"
>
 I am a long time Unity dev and recently started playing with Needle Tools and I love it! It's a great on ramp for Unity devs who want to learn WebXR and three.js. The runtime engine is awesome and it was pretty easy to create my own custom component
</testimonial>

<testimonial
  name="Unity for Digital Twins"
  role="Powering the enterprise metaverse"
  src="https://x.com/DigitalTwin/status/1576934958681055233"
  img="./testimonial/UnityforDigitalTwins.webp"
>
We just gotta say WOW 🤩
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

## Technical Details

**Needle Engine** is a web-based runtime for complex and simple 3D applications alike. Built on three.js and the glTF standard, it provides:

- **Full-featured 3D engine** – [PBR materials](./export.md#physically-based-materials-pbr), [custom shaders](./export.md#custom-shaders), [lightmaps](./export.md#lightmaps), [physics](./component-reference.md#physics), [particles](./component-reference.md#particles), [UI](./component-reference.md#ui), and [more](./features-overview)
- **Editor integrations** – [Unity](./unity/index.md) and [Blender](./blender/index.md) for professional authoring workflows
- **Built-in networking** – [Multiplayer components](./networking.md) for collaborative experiences
- **Native WebXR support** – [AR and VR](./xr.md) on all platforms, including [iOS via App Clips](./ios-webxr-app-clip.md)
- **Compression pipeline** – Optimized [deployment and compression](./deployment.md) for web delivery
- **Component-based architecture** – [TypeScript/JavaScript scripting](./scripting.md) with familiar patterns
- **Extensible and flexible** – [Integrate with any web framework](./html.md) or use [vanilla JS](./vanilla-js.md)

<!-- <video-embed src="https://www.youtube.com/watch?v=p83q4siNeWo" /> -->

 <br/>
 <br/>

<actiongroup>


<a class="no-external-link-icon" href="https://www.npmjs.com/package/@needle-tools/engine"><img src="https://img.shields.io/npm/v/@needle-tools/engine?style=flat&colorA=ddd&colorB=ddd"/></a>

<a class="no-external-link-icon" href="https://engine.needle.tools/docs/getting-started/"><img src="https://img.shields.io/npm/dt/@needle-tools/engine.svg?style=flat&colorA=ddd&colorB=ddd"/></a>


<a class="no-external-link-icon" href="https://discord.needle.tools"><img src="https://img.shields.io/discord/717429793926283276?style=flat&colorA=ddd&colorB=ddd&label=discord&logo=discord&logoColor=ffffff"></a>


</actiongroup>




<p></p>
<copyright></copyright>

<ClientOnly>
<removeserviceworker/>
</ClientOnly>
