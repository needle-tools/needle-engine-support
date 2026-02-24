---
title: Needle Engine for 8th Wall Users
description: A practical guide for 8th Wall developers looking for a WebAR platform. Learn how to build AR experiences with Needle Engine using your existing three.js knowledge.
sidebarTitle: For 8th Wall Users
---

# Needle Engine for 8th Wall Users

If you're an 8th Wall developer looking for a new platform for your WebAR projects, this guide will help you understand how Needle Engine works and how your existing skills transfer over.

:::tip New to Needle Engine?
Needle Engine is a web-first 3D runtime built on three.js. It works with Unity and Blender for visual scene authoring, or you can code directly with TypeScript/JavaScript.

**[Try it now →](https://engine.needle.tools/new)** – Opens a ready-to-use project in your browser.
:::

## How Needle Engine Compares to 8th Wall

If you're evaluating alternatives, here's how the two platforms differ:

| Aspect | 8th Wall | Needle Engine |
|--------|----------|---------------|
| **AR on Android** | 8th Wall SLAM | WebXR (native Chrome/Firefox) |
| **AR on iOS** | 8th Wall SLAM | WebXR via [App Clip](/docs/how-to-guides/xr/ios-webxr-app-clip) (ARKit) or [Interactive USDZ/QuickLook](/docs/how-to-guides/everywhere-actions/) (runtime export with interactivity) |
| **Image tracking** | Built-in | [WebXR Image Tracking](/docs/how-to-guides/xr/image-tracking) |
| **Face tracking** | Built-in | Via [@needle-tools/facefilter](https://github.com/needle-engine/facefilter) package |
| **VPS / Location AR** | Lightship VPS | No built-in support |
| **VR headsets** | No | Yes (Meta Quest 2/3/Pro, Pico, Valve Index, etc.) |
| **Spatial computing** | No | Yes (Apple Vision Pro, HoloLens 2) |
| **Scene editor** | Cloud Editor | Unity or Blender |
| **Hosting** | 8th Wall required | Self-host anywhere |
| **Underlying tech** | Custom XR8 engine | three.js |

### Where Needle Engine Shines

- **Performance optimization** – Automatic texture compression, mesh optimization, and progressive loading
- **Visual editing** – Use Unity or Blender instead of code-only workflows
- **Platform flexibility** – AR, VR, desktop, and mobile from one codebase
- **Hosting freedom** – Deploy to any web server or use Needle Cloud
- **three.js compatibility** – Your existing three.js code works directly

### What 8th Wall Does That Needle Doesn't (Out of the Box)

- **VPS / Location-based AR** – No built-in support in Needle Engine
- **Cloud-based editor** – Needle uses desktop editors (Unity/Blender)

---

## Working with Exported 8th Wall Projects

If you've exported your 8th Wall project as a buildable .zip file, here's what you can do with the assets:

### What You Can Reuse

Your exported 8th Wall project contains assets that work with any web platform:

**Direct compatibility:**
- 3D models (glTF, GLB, OBJ, FBX)
- Textures (PNG, JPG, WebP)
- Audio files
- Image tracking targets (the images themselves)

**Needs adaptation:**
- JavaScript code using `XR8.*` APIs
- A-Frame components (if used)
- 8th Wall-specific pipeline modules

### Migrating Assets to Needle Engine

**Option 1: Load glTF/GLB models directly**

If your 8th Wall project used glTF models, they work in Needle Engine without changes:

```html
<needle-engine src="your-model.glb"></needle-engine>
```

**Option 2: Import into Unity or Blender**

For more complex scenes:
1. Import your 3D models into Unity or Blender
2. Set up materials and lighting
3. Add Needle components for interactivity
4. Export to web

This approach is better for projects with many assets or complex scene hierarchies.

---

## Your three.js Knowledge Transfers

Needle Engine is built on three.js, so your existing knowledge applies directly. Here's how the code patterns compare:

### Adding Objects to the Scene

```javascript
// This three.js code works in both platforms
import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// In Needle Engine, use lifecycle hooks to access the scene
import { onStart } from "@needle-tools/engine";

onStart(context => {
  context.scene.add(cube);
});
```

### Enabling AR

```javascript
// 8th Wall approach
XR8.addCameraPipelineModules([
  XR8.GlTextureRenderer.pipelineModule(),
  XR8.Threejs.pipelineModule(),
  XR8.XrController.pipelineModule(),
]);

// Needle Engine approach
import { onStart, WebXR } from "@needle-tools/engine";

onStart(context => {
  // Add WebXR with configuration options
  context.scene.addComponent(WebXR, {
    createARButton: true,
    createVRButton: false,
  });
});
```

### Animation Loop

```javascript
// 8th Wall (via three.js or custom pipeline)
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Needle Engine
import { onUpdate } from "@needle-tools/engine";

onUpdate(context => {
  cube.rotation.y += context.time.deltaTime;
});
```

### API Mapping Reference

| 8th Wall | Needle Engine |
|----------|---------------|
| `XR8.Threejs.pipelineModule()` | Built-in (Needle uses three.js) |
| `XR8.XrController.pipelineModule()` | `WebXR` component |
| `XR8.GlTextureRenderer` | Built-in renderer |
| `scene.add(object)` | `context.scene.add(object)` |
| `XRExtras.Loading` | `<needle-engine loading-style="...">` |
| Image Targets config | `WebXRImageTracking` component |

---

## Getting Started

### Quick Start (Code-First)

If you want to start coding immediately:

**In your browser:** [engine.needle.tools/new](https://engine.needle.tools/new)

**Or install locally:**
```bash
npm install @needle-tools/engine
```

**Minimal AR example:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
  <needle-engine src="scene.glb"></needle-engine>

  <script type="module">
    import { onStart, WebXR } from "@needle-tools/engine";

    onStart(context => {
      context.scene.addComponent(WebXR, {
        createARButton: true,
        createVRButton: false,
      });
    });
  </script>
</body>
</html>
```

### Visual Editing (Recommended for Complex Scenes)

For projects with many assets or complex scene setups, using a visual editor saves time:

- **[Unity Integration](/docs/unity/)** – Download the Unity package
- **[Blender Integration](/docs/blender/)** – Download the Blender add-on

Both integrations let you build scenes visually and export to the web with one click.

---

## iOS AR Support

8th Wall's iOS support was one of its strengths. Here's how Needle Engine handles iOS:

### WebXR via App Clip (Best Quality)

Needle Engine provides full WebXR support on iOS through App Clip technology:

- Users tap a link or scan a QR code
- No app download required
- Full ARKit tracking quality
- Your WebXR code works without changes

[iOS WebXR App Clip documentation →](/docs/how-to-guides/xr/ios-webxr-app-clip)

### USDZ / QuickLook with Interactivity

Needle Engine **automatically exports interactive USDZ files at runtime**:

- **Automatic conversion** – Your 3D scene is converted to USDZ on-the-fly when iOS users tap "View in AR"
- **Full interactivity** – Animations, material changes, audio, and tap interactions work in QuickLook
- **No manual export** – Add the `USDZExporter` component and it just works
- **Works on iPhone, iPad, and Apple Vision Pro**

This is fundamentally different from static USDZ export. Most tools require you to manually export a frozen 3D model. Needle Engine generates interactive USDZ files dynamically, preserving the same behaviors you built for the web.

**Supported interactions via [Everywhere Actions](/docs/how-to-guides/everywhere-actions/):**
- Play animations on tap
- Change materials (product configurators)
- Show/hide objects
- Play spatial audio
- Transform objects (move, rotate, scale)
- Image tracking

[Everywhere Actions documentation →](/docs/how-to-guides/everywhere-actions/)

---

## Image Tracking

If your 8th Wall project used image targets, Needle Engine supports WebXR Image Tracking:

- Works on Android (Chrome with flag enabled)
- Works on iOS (via App Clip with ARKit)
- Alternative: QuickLook image tracking on iOS

[Image Tracking documentation →](/docs/how-to-guides/xr/image-tracking)

---

## Deployment

Unlike 8th Wall, you can host Needle Engine projects anywhere:

**Needle Cloud (simplest):**
```bash
npx needle-tools deploy
```

**Any static host:**
- Vercel, Netlify, GitHub Pages
- AWS S3, Google Cloud Storage
- Your own web server

```bash
npm run build
# Upload the dist/ folder
```

[Deployment guide →](/docs/how-to-guides/deployment/)

---

## Key Differences in Workflow

| Task | 8th Wall | Needle Engine |
|------|----------|---------------|
| **Create a scene** | Cloud Editor | Unity, Blender, or code |
| **Preview locally** | `npm run serve` | `npm run dev` (with hot reload) |
| **Deploy** | Publish to 8th Wall | Deploy anywhere |
| **Version control** | Limited | Standard Git |
| **Team collaboration** | Via 8th Wall | Any tool (Git, etc.) |

---

## Learning Resources

### Documentation

- [Getting Started](/docs/getting-started/) – Installation and setup
- [XR (AR/VR) Guide](/docs/how-to-guides/xr/) – WebXR features
- [Scripting Guide](/docs/how-to-guides/scripting/create-components) – Creating components
- [three.js Integration](/docs/three/) – Using three.js with Needle

### Examples

- [XR Samples](https://engine.needle.tools/samples/?overlay=samples&tag=xr) – AR and VR demos
- [Image Tracking Demo](https://engine.needle.tools/samples/image-tracking) – Live example
- [All Samples](https://engine.needle.tools/samples/) – Interactive examples

### Community

- [Discord](https://discord.needle.tools) – Quick help and discussion
- [Forum](https://forum.needle.tools) – Longer discussions
- [GitHub](https://github.com/needle-tools/needle-engine-support) – Issues and feature requests

---

## FAQ

### Can I import my 8th Wall project directly?

Not directly. 8th Wall projects use the XR8 engine which is proprietary. However, you can:
- Reuse all your 3D assets (models, textures, audio)
- Adapt your three.js code to use Needle's lifecycle hooks
- Rebuild your scene in Unity/Blender for better results

### Do I need Unity or Blender?

No. You can use Needle Engine with just code (similar to 8th Wall's approach). However, visual editors make complex scenes much easier to build and maintain.

### What about face tracking?

Needle Engine has a dedicated face filter package:

- **[@needle-tools/facefilter](https://github.com/needle-engine/facefilter)** – Official package with MediaPipe integration
- [Live demo](https://engine.needle.tools/samples/face-filter/) – Try it in your browser

The package supports texture mapping, video overlays, custom shaders, and multi-face tracking.

### How does pricing work?

- **Free** for non-commercial use
- **Pro license** for commercial projects – **no per-view fees**, no matter how many users access your experience
- **Host anywhere** – use your own servers or Needle Cloud

This is a significant difference from 8th Wall's per-view pricing model. With Needle Engine, you pay a flat license fee regardless of traffic.

[Pricing details →](https://needle.tools/pricing)

---

## Next Steps

1. **[Try the samples](https://engine.needle.tools/samples/)** – See what's possible
2. **[Create a project](https://engine.needle.tools/new)** – Start in your browser
3. **[Read the XR guide](/docs/how-to-guides/xr/)** – Learn about AR/VR features
4. **[Join Discord](https://discord.needle.tools)** – Get help from the community

---

## See Also

- [Needle vs 8th Wall Comparison](https://cloud.needle.tools/compare/needle-vs-8thwall) – Detailed feature comparison
- [WebXR Documentation](/docs/how-to-guides/xr/) – AR and VR capabilities
- [three.js Integration](/docs/three/) – Working with three.js
- [Deployment Guide](/docs/how-to-guides/deployment/) – Hosting options
