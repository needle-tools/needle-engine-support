# Features Overview

## Fast Iteration ⚡
Needle Engine Exporter for Unity provides a tight (but flexible) integration into a world class game engine. You can keep using your workflows and we take care to bring your content to the web in seconds (not minutes). We embrace web technologies so [all your code is written in typescript and javascript](./documentation/scripting.md). This allows for almost instant reloads. Paired with a poweful editor and asset management you get the best of both worlds!   

## Shader Graph 🕸
Use the node based [ShaderGraph ⇡](https://unity.com/features/shader-graph) to create shaders for the web. ShaderGraph makes it easy for artists to keep creating without having to worry about syntax.

## Crossplatform: VR, AR, Mobile, Desktop 💻  
Needle Engine runs everywhere web technology does: run the same application on desktop, mobile, AR or VR. 

## Lightmaps 💡

Needle Engine utilizes the [Unity Editor Lightmapper ⇡](https://docs.unity3d.com/Manual/progressive-lightmapper.html) to easily bake static light for your 3d content. Lightbaking for the web was never as easy. Just mark objects that you want to lightmap as static in Unity, add one or many lights to your scene (or use emissive materials) and click bake. Needle Engine will export your lightmaps per scene and automatically load and display them just as you see it in the Editor! 

> **Note**: There is no technical limitation on which lightmapper to use so you could also use a third party lightmapper like [Bakery ⇡](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218) for the job.

## Multiplayer and Networking 🎭
Networking is built into the core runtime. Needle Engine deployments to Glitch come with a tiny server that allows you to deploy a multiplayer 3d environment in seconds. Needle Engine comes with some networked components that make it easy to get started. Synchronizing variables and state is super easy!

## Animation 🏇
Needle Engine animations are super powerful 💪 — from just playing a single animation to orchestrating and blending multiple complex and dynamic animations - we got you covered. Needle Engine has builtin support for Unity's Animator as well as Unity's amazing Timeline! 

### AnimatorController

The powerful [AnimationController ⇡](https://docs.unity3d.com/Manual/class-AnimatorController.html) in Unity lets you setup animations and define conditions for when and how to blend between them.

### Timeline

Needle Engine has core support for all of [Unity's Timeline ⇡](https://unity.com/features/timeline) tracks to build complex dynamic animations and audio-visual experiences.  
The supported tracks include: AnimationTracks, AudioTracks, ActivationTracks, ControlTracks, SignalTracks. 

> **Note**: Sub-Timelines are currently not supported  
> **Note**: Yes it is even possible to export your custom timeline tracks!  

## Physics 🏓
Use Rigidbodies, Box- or SphereColliders to add some juicy physics to your world!

## Scripting
Needle Engine uses as [component based workflow](./documentation/scripting.md#component-architecture). Create custom scripts in typescript or javascript. Use our [modular npm-based package workflow](https://fwd.needle.tools/need-engine/docs/npmdef) integrated into Unity. A [typescript to C# component compiler](https://fwd.needle.tools/need-engine/docs/component-compiler) produces Unity components magically on the fly. 
