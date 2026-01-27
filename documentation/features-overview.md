# Feature Overview

**Needle Engine is a fully-fledged 3D engine for the web** with everything you'd expect from a modern 3D engine, and more. Build stunning web experiences that work everywhere – from browsers to VR headsets to mobile AR.

:::tip See It In Action
Explore our [Samples and Showcase](https://engine.needle.tools/samples) to experience what's possible.
:::

[[toc]]

## Cross-Platform: Desktop, Mobile, VR, and AR

**One codebase, every platform.** Needle Engine runs everywhere web technology does – desktop, mobile, AR, and VR. We build Needle Engine [with XR in mind](./xr.md) as an integral part of responsive web design.

### Native iOS WebXR Support

**Full WebXR on iPhone and iPad** – no app required! 🎉

Native [iOS WebXR support](./ios-webxr-app-clip.md) is now available through App Clip technology. Users can experience your WebXR AR content instantly via QR codes or links, without installing an app. Powered by ARKit, it provides:

- Hit testing and plane detection
- DOM overlays for UI elements
- Image tracking
- Anchor creation and tracking (work in progress)
- Lighting estimation (work in progress)

[Try it now](https://appclip.needle.tools) • [Read iOS WebXR docs](./ios-webxr-app-clip.md)

### Everywhere Actions for iOS and Android

Use [Everywhere Actions](./everywhere-actions.md) for **interactive AR experiences** on both iOS and Android using USDZ and QuickLook. Perfect for product configurators, marketing experiences, and interactive storytelling.

**Platform Support:**
- **VR Headsets**: Meta Quest, Apple Vision Pro, Pico, HTC Vive, Valve Index
- **Mobile AR**: Android (WebXR), iOS (WebXR via App Clips + USDZ/QuickLook)
- **Desktop**: All modern browsers
- **Future devices work automatically** – that's the power of web standards

[Learn more about XR support](./xr.md)

## Graphics and Rendering

### Shaders and Materials

**Professional-grade rendering on the web.** Export both [PBR Materials](./export.md#physically-based-materials-pbr) and [Custom shaders](./export.md#custom-shaders) created with Shader Graph or other systems.

<img src="https://user-images.githubusercontent.com/5083203/186012027-9bbe3944-fa56-41fa-bfbb-c989fa87aebb.png" alt="Shader Graph Example" />

Use Unity's node-based ShaderGraph to create shaders for the web. Artists can keep creating without worrying about syntax or web-specific code.

Read more: [PBR Materials](./export.md#physically-based-materials-pbr) • [Custom Shaders](./export.md#custom-shaders)

### Lightmaps

**Beautiful baked lighting, automatically exported to the web.**

![lightmaps](https://user-images.githubusercontent.com/5083203/186163693-093c7ae2-96eb-4d75-b98f-bf19f78032ff.gif)

Lightmaps can be baked in Unity or Blender and automatically exported to your web experience. Just mark objects as static, add lights (or use emissive materials), click bake, and Needle Engine handles the rest. What you see in the editor is what you get on the web.

**Flexible Setup:**
- Works with Unity's built-in lightmapper
- Compatible with third-party lightmappers like [Bakery](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218)
- Per-scene lightmaps automatically loaded

[Read more about Lightmaps](https://fwd.needle.tools/needle-engine/docs/lightmaps)

### Post-Processing Effects

**Industry-standard post-processing for the web.**

Built-in effects include Bloom, Screen Space Ambient Occlusion (SSAO), Depth of Field, and Color Correction. You can also create custom effects tailored to your project.

<sample src="https://engine.needle.tools/samples-uploads/postprocessing/" />

[See all post-processing components](./component-reference.md#postprocessing)

## Animation and Sequencing

**Powerful animation tools that translate directly to the web.** From simple animations to complex state machines and cinematic sequences – Needle Engine brings professional animation workflows to web experiences.

### Animator State Machines

<img src="https://user-images.githubusercontent.com/5083203/186011302-176524b3-e8e5-4e6e-9b77-7faf3561bb15.png" alt="Unity Animator" />

Unity's [Animator and AnimatorController](https://docs.unity3d.com/Manual/class-AnimatorController.html) let you set up animations and define conditions for blending between them. Needle Engine exports:

- Animation state machines
- StateMachineBehaviours with `OnStateEnter`, `OnStateUpdate`, and `OnStateExit` events
- Transitions and layers
- Parameter-driven state changes

> **Note**: Sub-states and Blend Trees are not yet supported.

### Timeline Sequencing

![Timeline Example](https://user-images.githubusercontent.com/5083203/186037829-ee99340d-b19c-484d-b551-94797519c9d9.png)

Create cinematic sequences with [Unity's Timeline](https://unity.com/features/timeline). Needle Engine translates Timeline setups into web-ready format.

**Supported Tracks:**
- AnimationTrack
- AudioTrack
- ActivationTrack
- ControlTrack
- SignalTrack

> **Note**: Sub-Timelines are not yet supported. Custom timeline tracks can be exported – [see example](https://github.com/needle-tools/needle-engine-modules/tree/main/package/TimelineHtml).

### Blender Support

Animation support extends to Blender too! Create animation state machines and export NLA tracks as timelines directly from Blender.

[Read more about Animation Components](./component-reference.md#animation)

## Physics

**Real-time physics simulation in the browser.**

Add realistic physics interactions using familiar components:
- Rigidbodies for dynamic objects
- Colliders: Box, Sphere, and Mesh
- Physics materials for friction and bounce
- Raycasting and collision detection

<sample src="https://engine.needle.tools/samples-uploads/physics-animation/" />

[Read more about Physics Components](./component-reference.md#physics)

## Particle Systems

**Create stunning visual effects with Unity's Shuriken particle system.**

Export Unity ParticleSystems to the web with support for:
- World/local space simulation
- Box and sphere emitter shapes
- Emission over time and burst emission
- Velocity and color over lifetime
- Emission influenced by velocity
- Texture sheet animation
- Basic trails

<sample src="https://engine.needle.tools/samples-uploads/particles/" />

[Try live particle samples](https://engine.needle.tools/samples/particles)

## User Interface

**Build interactive UIs using Unity's Canvas system.**

Export Unity UI components including:
- Text (with custom fonts)
- Images and sprites
- Buttons with events
- Layout groups
- World-space and screen-space canvases

<sample src="https://engine.needle.tools/samples-uploads/screenspace-ui" />

[See supported UI components](component-reference.md#ui)

## Multiplayer and Networking

**Real-time multiplayer, built-in.**

Networking is integrated into the core runtime. Deploy multiplayer 3D environments in seconds with built-in networked components. Synchronizing variables and state is incredibly simple.

**Features:**
- Built-in networking components
- Easy variable synchronization
- Voice chat support (VoIP)
- Works seamlessly with XR
- Quick deployment to Glitch with included server

[Read more about Networking](https://fwd.needle.tools/needle-engine/docs/networking) • [Scripting Guide](https://fwd.needle.tools/needle-engine/docs/scripting)

## Editor Integrations

**Visual authoring meets web deployment.**

Powerful integrations for Unity and Blender allow artists and developers to collaborate seamlessly. Set up and export complex scenes visually, with flexible workflows for both technical and creative team members.

**Unity Integration:**
- Full component support
- Visual scene authoring
- Asset pipeline integration
- Hot reload during development

**Blender Addon:**
- Export glTF with Needle Engine components
- Animation support (NLA tracks, state machines)
- Material and lighting export
- Node-based workflow

## Scripting and Development

**Flexible, powerful, and developer-friendly.**

Needle Engine uses a [component-based architecture](scripting.md#component-architecture) familiar to Unity developers. Create custom components in TypeScript or JavaScript.

**Developer Features:**
- Component-based workflow (like Unity)
- TypeScript and JavaScript support
- [Modular npm-based packages](https://fwd.needle.tools/needle-engine/docs/npmdef)
- [TypeScript to C# component compiler](https://fwd.needle.tools/needle-engine/docs/component-compiler) – write TypeScript, get Unity components automatically
- Hot module replacement for fast iteration
- Full three.js access for advanced use cases

[Read more: Scripting Reference](scripting) • [Npm Definition Files](https://fwd.needle.tools/needle-engine/docs/npmdef)

## Additional Features

**Even more capabilities to power your projects:**

- **EditorSync** – Live synchronize editing in Unity to your running web application for instant feedback during development
- **Compression Pipeline** – Automatic optimization for web delivery with glTF compression and texture optimization
- **Audio Support** – Spatial audio, audio sources, and audio listeners
- **Image Tracking** – WebXR image tracking on Android, QuickLook image tracking on iOS
- **Custom Components** – Extend the engine with your own components and systems
- **Framework Integration** – Works with React, Vue, Svelte, and other web frameworks
- **Deployment Tools** – Built-in deployment to Glitch, Vercel, and other platforms

---

## Where to Go Next

**Get Started:**
- [Getting Started Guide](getting-started/) – Download and set up Needle Engine
- [Unity Integration](./unity/index.md) – Set up the Unity integration
- [Blender Addon](./blender/index.md) – Install the Blender addon

**Learn More:**
- [Our Vision](vision) – Learn about our goals and philosophy
- [Technical Overview](technical-overview) – Deep dive into glTF and architecture
- [XR Documentation](xr.md) – Build immersive AR and VR experiences
- [Browse Samples](https://engine.needle.tools/samples) – See what's possible

**Start Building:**
- [Scripting Guide](scripting) – Create custom components
- [Component Reference](component-reference.md) – Browse all available components
- [Deployment Guide](deployment.md) – Publish your experiences

---

Have questions? Join our [Discord community](https://discord.needle.tools) or check out our [support resources](support).
