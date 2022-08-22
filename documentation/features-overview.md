# Feature Overview

## Fast Iteration ⚡
Needle Exporter for Unity provides a flexible integration into a world-class game engine. You can keep using your workflows and we take care of bringing your content to the web in seconds. We embrace modern web technologies, so [all your code is written in TypeScript and JavaScript](./scripting.md). This allows for almost instant reloads. Paired with a powerful editor and asset management you get the best of both worlds!  

<p align="center"><a href="./getting-started.md">Get Started</a> • <a href="./scripting.md">Scripting</a> • <a href="./export.md">Assets and Export</a></p>

## Shader Graph 🕸
Use the node based [ShaderGraph ⇡](https://unity.com/features/shader-graph) to create shaders for the web. ShaderGraph makes it easy for artists to keep creating without having to worry about syntax.

<p align="center"><a href="./export.md#custom-shaders">PBR Materials</a> • <a href="./export.md#physically-based-materials-pbr">Custom Shaders</a></p>

## Crossplatform: VR, AR, Mobile, Desktop 💻  
Needle Engine runs everywhere web technology does: run the same application on desktop, mobile, AR or VR. We build Needle Engine [with XR in mind](./xr.md) and consider this as and integral part of responsive webdesign!

<p align="center"><a href="./xr.md">VR and AR</a> • <a href="./export.md#physically-based-materials-pbr">Custom Shaders</a></p>

## Lightmaps 💡

Lightmaps [baked in Unity](https://docs.unity3d.com/Manual/progressive-lightmapper.html) to easily bake static light for your 3d content. Lightbaking for the web was never as easy. Just mark objects that you want to lightmap as static in Unity, add one or many lights to your scene (or use emissive materials) and click bake. Needle Engine will export your lightmaps per scene and automatically load and display them just as you see it in the Editor! 

> **Note**: There is no technical limitation on which lightmapper to use, as long as they end up in Unity's lightmapping data structures. Third party lightmappers such as [Bakery ⇡](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218) thus are also supported.  

<p align="center"><a href="./export.md#exporting-lightmaps">Exporting Lightmaps</a></p>

## Multiplayer and Networking 🎭
Networking is built into the core runtime. Needle Engine deployments to Glitch come with a tiny server that allows you to deploy a multiplayer 3D environment in seconds. The built-in networked components make it easy to get started, and you can create your own synchronized components. Synchronizing variables and state is super easy!  

<p align="center"><a href="./networking.md">Networking</a> • <a href="./scripting.md">Scripting</a></p>

## Animation 🏇
Needle Engine brings powerful animations, state control and sequencing to the web — from just playing a single animation to orchestrating and blending complex animations and character controllers. The Exporter can translate Unity components like Animator and Timeline into a web-ready format.  

<p align="center"><a href="./component-reference.md#animation">Animation Components</a></p>

### Animator

The [Animator and AnimatorController ⇡](https://docs.unity3d.com/Manual/class-AnimatorController.html) components in Unity let you setup animations and define conditions for when and how to blend between them. We support exporting state machines, StateMachineBehaviours, transitions and layers.

> **Note**: Sub-states and Blend Trees are not supported.  

> **Note**: StateMachineBehaviours support ``OnStateEnter``, ``OnStateUpdate`` and ``OnStateExit``  

### Timeline

We're also translating [Unity's Timeline ⇡](https://unity.com/features/timeline) setup and tracks into a web-ready format.  
Supported tracks include: AnimationTrack, AudioTrack, ActivationTrack, ControlTrack, SignalTrack.   

> **Note**: Sub-Timelines are currently not supported.  

> **Note**: It's possible to [export custom timeline tracks](https://github.com/needle-tools/needle-engine-modules/tree/main/package/TimelineHtml).  

## Physics 🏓
Use Rigidbodies, Box Colliders and SphereColliders to add some juicy physics to your world.
> **Note**: MeshColliders are currently not supported  

<p align="center"><a href="./component-reference.md#physics">Physics Components</a></p>

## Scripting 🧩
Needle Engine uses as [component based workflow](./scripting.md#component-architecture). Create custom scripts in typescript or javascript. Use our [modular npm-based package workflow](https://fwd.needle.tools/needle-engine/docs/npmdef) integrated into Unity. A [typescript to C# component compiler](https://fwd.needle.tools/needle-engine/docs/component-compiler) produces Unity components magically on the fly. 

<p align="center"><a href="./scripting.md">Scripting Reference</a></p>

---
# Where to go next

See our [Getting Started Guide](./getting-started.md) to learn about how to download and set up Needle Engine.   
Learn about [our vision](./vision.md) or dive deeper into some of the [technical background and glTF](./technical-overview.md) powering it all.  
