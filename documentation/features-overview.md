# Feature Overview

Needle Engine is a fully fledged 3D engine that runs in the browser. It comes with all the features you'd expect from a modern 3D engine, and more.  If you haven't yet, take a look at our [Homepage](https://needle.tools) and our [Samples and Showcase](https://engine.needle.tools/samples).

[[toc]]

## Shaders and Materials

Both [PBR Materials](./export.md#physically-based-materials-pbr) and [Custom shaders](./export.md#custom-shaders) created with Shader Graph or other systems can be exported. 

<img src="https://user-images.githubusercontent.com/5083203/186012027-9bbe3944-fa56-41fa-bfbb-c989fa87aebb.png" />

Use the node based ShaderGraph to create shaders for the web. ShaderGraph makes it easy for artists to keep creating without having to worry about syntax.

Read more about [PBR Materials](./export.md#physically-based-materials-pbr) • [Custom Shaders](./export.md#custom-shaders)

## Crossplatform: VR, AR, Mobile, Desktop
Needle Engine runs everywhere web technology does: run the same application on desktop, mobile, AR or VR. We build Needle Engine [with XR in mind](./xr.md) and consider this as and integral part of responsive webdesign!

### iOS WebXR Support
Native [iOS WebXR support](./ios-webxr-app-clip.md) is now available through App Clip technology. Run WebXR AR experiences instantly on iPhone and iPad with Safari without requiring app installation. Powered by ARKit, it provides full WebXR functionality including hit testing, plane detection, and DOM overlays. [Try it now](https://appclip.needle.tools) or learn more about [iOS WebXR](./ios-webxr-app-clip.md).

### Everywhere Actions
Use [Everywhere Actions](./everywhere-actions.md) for **Interactive AR on both Android and iOS** using USDZ and QuickLook for native 3D viewing experiences.


## Lightmaps

![lightmaps](https://user-images.githubusercontent.com/5083203/186163693-093c7ae2-96eb-4d75-b98f-bf19f78032ff.gif)

Lightmaps can be baked in Unity or Blender to easily add beautiful static light to your 3d content. Lightbaking for the web was never as easy. Just mark objects that you want to lightmap as static in Unity, add one or many lights to your scene (or use emissive materials) and click bake. Needle Engine will export your lightmaps per scene and automatically load and display them just as you see it in the Editor! 

> **Note**: There is no technical limitation on which lightmapper to use, as long as they end up in Unity's lightmapping data structures. Third party lightmappers such as [Bakery](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218) thus are also supported. 

- Read more about [Exporting Lightmaps](https://fwd.needle.tools/needle-engine/docs/lightmaps)

## Multiplayer and Networking
Networking is built into the core runtime. Needle Engine deployments to Glitch come with a tiny server that allows you to deploy a multiplayer 3D environment in seconds. The built-in networked components make it easy to get started, and you can create your own synchronized components. Synchronizing variables and state is super easy!  

- Read more about [Networking](https://fwd.needle.tools/needle-engine/docs/networking) • [Scripting](https://fwd.needle.tools/needle-engine/docs/scripting)

## Animations and Sequencing
Needle Engine brings powerful animations, state control and sequencing to the web — from just playing a single animation to orchestrating and blending complex animations and character controllers. The Exporter can translate Unity components like Animator and Timeline into a web-ready format.   
We even added this functionality to our Blender addon so you can craft compatible animation state machines and export nla tracks as timelines to the web from within Blender too.  

- Read more about [Animation Components](./component-reference.md#animation)

### Animator

<img src="https://user-images.githubusercontent.com/5083203/186011302-176524b3-e8e5-4e6e-9b77-7faf3561bb15.png" />

The [Animator and AnimatorController](https://docs.unity3d.com/Manual/class-AnimatorController.html) components in Unity let you setup animations and define conditions for when and how to blend between them. We support exporting state machines, StateMachineBehaviours, transitions and layers. StateMachineBehaviours are also supported with ``OnStateEnter``, ``OnStateUpdate`` and ``OnStateExit`` events.  


> **Note**: Sub-states and Blend Trees are not supported.  


### Timeline

![2022-08-23-013517_Scene](https://user-images.githubusercontent.com/5083203/186037829-ee99340d-b19c-484d-b551-94797519c9d9.png)

We're also translating [Unity's Timeline](https://unity.com/features/timeline) setup and tracks into a web-ready format.  
Supported tracks include: AnimationTrack, AudioTrack, ActivationTrack, ControlTrack, SignalTrack.   

> **Note**: Sub-Timelines are currently not supported.  

> **Note**: It's possible to [export custom timeline tracks](https://github.com/needle-tools/needle-engine-modules/tree/main/package/TimelineHtml).  

- Read more about [Animation Components](./component-reference.md#animation)

## Physics
Use Rigidbodies, Mesh Colliders, Box Colliders or SphereColliders to add physics to your world.

- Read more about [Physics Components](./component-reference.md#physics)

<sample src="https://engine.needle.tools/samples-uploads/physics-animation/" />

## UI
Building UI using Unity's UI canvas system is in development. Features currently include exporting Text (including fonts), Images, Buttons.  

See the [ui component reference](component-reference.md#ui) for supported component.

<sample src="https://engine.needle.tools/samples-uploads/screenspace-ui" />

## Particles
Export of Unity ParticleSystem (Shuriken) is in development. Features currently include world/local space simulation, box and sphere emitter shapes, emission over time as well as burst emission, velocity- and color over time, emission by velocity, texturesheet animation, basic trails.   
See a [live sample](https://engine.needle.tools/samples/particles) of supported features below:

<sample src="https://engine.needle.tools/samples-uploads/particles/" />

## PostProcessing  

Builtin effects include Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction. You can also create your own custom effects. See [the component reference](./component-reference.md#postprocessing) for a complete list.  

<sample src="https://engine.needle.tools/samples-uploads/postprocessing/" />

## Editor Integrations
Needle Engine comes with powerful integrations into the Unity Editor and Blender.   
It allows you to setup and export complex scenes in a visual way providing easy and flexible collaboration between artists and developers. 

## Scripting
Needle Engine uses as [component based workflow](scripting.md#component-architecture). Create custom scripts in typescript or javascript. Use our [modular npm-based package workflow](https://fwd.needle.tools/needle-engine/docs/npmdef) integrated into Unity. A [typescript to C# component compiler](https://fwd.needle.tools/needle-engine/docs/component-compiler) produces Unity components magically on the fly. 

- Read more about [Scripting Reference](scripting) • [Npm Definition Files](https://fwd.needle.tools/needle-engine/docs/npmdef)


## And there is more

- PostProcessing → Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction...
- EditorSync → Live synchronize editing in Unity to the running three.js application for local development
- Native iOS WebXR → Run WebXR AR experiences on iPhone and iPad with [App Clip technology](./ios-webxr-app-clip.md)
- Interactive AR on iOS and Android → Use our [Everywhere Actions](./everywhere-actions.md) feature set or build your own

---
# Where to go next

See our [Getting Started Guide](getting-started/) to learn about how to download and set up Needle Engine.   
Learn about [our vision](vision) or dive deeper into some of the [technical background and glTF](technical-overview) powering it all.  
