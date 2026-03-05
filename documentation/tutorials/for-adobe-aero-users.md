---
title: Needle Engine for Adobe Aero Users
description: A guide for Adobe Aero users looking for an alternative AR creation platform. Learn how to build interactive AR experiences with Needle Engine using visual editors or code.
sidebarTitle: For Adobe Aero Users
---

# Needle Engine for Adobe Aero Users

Adobe Aero was discontinued in November 2025. If you're looking for a new platform to create augmented reality experiences, this guide will help you understand how Needle Engine picks up where Aero left off — and goes further.

<testimonial
  name="Mike Bardeggia"
  role="Founder, Pedestrian-X"
  src="https://www.pedestrian-x.com/"
>
I've tried Adobe Aero, 8th Wall, and Niantic Lightship — all either dropped or required app store downloads. Finally, I found Needle with AppClip tech. I feel like I've found the right path with Needle.
</testimonial>

:::tip New to Needle Engine?
Needle Engine is a web-first 3D runtime built on three.js. It works with [Unity](/docs/unity/) and [Blender](/docs/blender/) for visual scene authoring, or you can code directly with TypeScript/JavaScript.

**[Try it now →](https://engine.needle.tools/new)** – Opens a ready-to-use project in your browser.
:::

## How Needle Engine Compares to Adobe Aero

| Aspect | Adobe Aero | Needle Engine |
|--------|-----------|---------------|
| **Status** | Discontinued (Nov 2025) | Actively developed |
| **AR on iOS** | ARKit (native app) | **WebXR via [App Clip](/docs/how-to-guides/xr/ios-webxr-app-clip) with native ARKit** or [Interactive USDZ/QuickLook](/docs/how-to-guides/everywhere-actions/) |
| **AR on Android** | Limited (Aero Player beta) | **WebXR with native ARCore** (Chrome/Firefox) |
| **VR headsets** | No | Yes (Meta Quest 2/3/Pro, Pico, Valve Index, etc.) |
| **Spatial computing** | No | Yes (Apple Vision Pro, HoloLens 2) |
| **Interactivity** | Visual Behaviors (triggers + actions) | [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) + TypeScript scripting |
| **Scene editor** | Aero desktop/mobile app | Unity or Blender |
| **No-code workflow** | Yes (core feature) | Yes (via Unity or Blender with built-in components) |
| **3D model formats** | GLB, FBX, OBJ | glTF, GLB, FBX, OBJ, and more |
| **2D asset support** | PSD, PNG, JPG, GIF, TIFF | PNG, JPG, WebP, SVG, and more |
| **Sharing** | QR code / link (required Aero app) | Standard URL (works in any browser) |
| **Hosting** | Adobe servers (now offline) | Self-host anywhere |
| **Pricing** | Free (was part of Creative Cloud) | Free for non-commercial; flat Pro license |

### Where Needle Engine Shines

- **Still available** – Adobe Aero is gone. Needle Engine is actively developed and growing.
- **No app required** – Experiences run directly in the browser. No app download, no App Store dependency.
- **Native AR quality** – Full ARKit (iOS via [App Clips](/docs/how-to-guides/xr/ios-webxr-app-clip)) and ARCore (Android) tracking quality through WebXR.
- **Interactive USDZ export** – Dynamic USDZ generation with full interactivity via [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) for iOS QuickLook — far beyond static 3D model viewing.
- **Cross-platform** – AR, VR, desktop, and mobile from one project. Aero was limited to AR on iOS with a restricted Android beta.
- **Visual editing** – Build scenes in Unity or Blender with drag-and-drop, then export to the web with one click.
- **Hosting freedom** – Deploy to any web server, or use [Needle Cloud](/docs/cloud/) for one-command deployment.
- **Extensible** – When visual tools aren't enough, write custom behaviors in TypeScript with full access to three.js.

### What Adobe Aero Had That's Different in Needle Engine

- **Integrated mobile authoring** – Aero let you place objects in AR directly on your phone. Needle Engine uses desktop editors (Unity/Blender) for authoring and the browser for viewing.
- **Adobe Creative Cloud integration** – Direct PSD/AI file import from Photoshop and Illustrator. With Needle Engine, you import standard formats (PNG, JPG, glTF) through Unity or Blender.
- **Built-in starter asset library** – Aero included ready-to-use shapes and animations. In Needle Engine, you can start from [ready-made samples](https://engine.needle.tools/samples/), use assets from Unity Asset Store, Blender add-ons, or any glTF source.

---

## Migrating Your Aero Assets

When Adobe Aero was discontinued, the only way to extract assets was to rename `.real` files to `.zip` and extract 3D models in GLB format from the Assets folder. If you managed to export your assets before the December 2025 deadline, here's how to use them.

### What You Can Reuse

**Direct compatibility:**
- 3D models exported as GLB files
- Textures (PNG, JPG)
- Audio files (WAV, MP3)
- Image tracking target images

**Needs rebuilding:**
- Aero Behaviors (trigger + action chains) → Rebuild with [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) or TypeScript
- Scene layout and spatial positioning → Recreate in Unity or Blender
- Animations created inside Aero → Recreate in your editor or with code

### Loading Your Models

**Quick test — load a GLB directly:**

```html
<needle-engine src="your-model.glb"></needle-engine>
```

**For full scenes — import into Unity or Blender:**
1. Import your GLB models into Unity or Blender
2. Arrange objects in 3D space
3. Add Needle components for interactivity
4. Export to web with one click

---

## Aero Behaviors → Needle Everywhere Actions

Adobe Aero's visual Behaviors system let you chain triggers and actions without code. Needle Engine's [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) provide similar functionality — and work across web, iOS QuickLook, and Android.

### Behavior Mapping

| Aero Behavior | Needle Engine Equivalent |
|---------------|--------------------------|
| **Tap** trigger | Pointer events (`onPointerClick`) |
| **Start** trigger | Auto-play animations / `HideOnStart` |
| **Proximity** trigger | `SpatialTrigger` component |
| **Play Animation** action | `PlayAnimationOnClick` / `Animation` component |
| **Spin** action | `ChangeTransformOnClick` or rotation animation clips |
| **Bounce** action | `EmphasizeOnClick` component (supports bounce and jiggle) |
| **Move / Rotate** action | `ChangeTransformOnClick`, transform animations |
| **Show / Hide** action | `SetActiveOnClick` component |
| **Look At** action | `LookAt` component |
| **Play Audio** action | `PlayAudioOnClick` component |
| **Open URL** action | `OpenURL` component |
| **Drag / Place** action | `DragControls` component |
| **Image tracking** trigger | `WebXRImageTracking` component |

### Example: Tap to Play Animation

In Aero, you'd add a Tap trigger → Play Animation action. In Needle Engine, add the `PlayAnimationOnClick` component to your object, select the animation clip, and export — no code needed.

### Example: Tap to Show/Hide

In Aero, you'd use Tap → Show or Tap → Hide. In Needle Engine, add the `SetActiveOnClick` component to toggle visibility on tap — no code needed.

### Example: Custom Behavior (Code)

When you need something beyond built-in components, write custom behaviors in TypeScript:

```typescript
import { Behaviour } from "@needle-tools/engine";

export class RotateOnHover extends Behaviour {
  onPointerEnter() {
    this.gameObject.rotation.y += Math.PI / 4;
  }
}
```

---

## Getting Started

### Quick Start (Browser)

The fastest way to try Needle Engine:

**[engine.needle.tools/new](https://engine.needle.tools/new)** – Creates a project in your browser, ready to edit.

### Visual Editing (Recommended for Aero Users)

If you liked Aero's visual approach, you'll feel at home with Unity or Blender:

- **[Unity Integration](/docs/unity/)** – Download the Unity package
- **[Blender Integration](/docs/blender/)** – Download the Blender add-on

Both let you build scenes visually — drag and drop models, position objects in 3D, add interactivity with components, and export to the web with one click.

### Code-First

If you prefer working with code:

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

---

## iOS AR Support

Adobe Aero was primarily an iOS app, so iOS AR is likely important to you. Here's how Needle Engine handles it:

### WebXR via App Clip (Most Flexible)

Full ARKit tracking quality without an app download:

- Users tap a link or scan a QR code
- A lightweight App Clip opens with full AR
- No App Store download required
- Native ARKit tracking quality

[iOS WebXR App Clip documentation →](/docs/how-to-guides/xr/ios-webxr-app-clip)

### USDZ / QuickLook with Interactivity

Needle Engine **automatically generates interactive USDZ files at runtime**:

- Your 3D scene is converted to USDZ on-the-fly when iOS users tap "View in AR"
- Animations, material changes, audio, and tap interactions work in QuickLook
- Works on iPhone, iPad, and Apple Vision Pro

This goes beyond what Aero offered — Aero required its own app to view experiences. With Needle Engine, iOS users can view interactive AR content directly through Safari and QuickLook.

**Supported interactions via [Everywhere Actions](/docs/how-to-guides/everywhere-actions/):**
- Play animations on tap
- Change materials (product configurators)
- Show/hide objects
- Play spatial audio
- Transform objects (move, rotate, scale)
- Image tracking

[Everywhere Actions documentation →](/docs/how-to-guides/everywhere-actions/)

---

## Deployment

Unlike Aero (which relied on Adobe's servers, now offline), you own your hosting:

**Needle Cloud (simplest):**
```bash
npx needle-cloud deploy
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

## FAQ

### Can I import my Aero projects directly?

No. Aero's `.real` file format was proprietary and Adobe's servers are now offline. If you extracted GLB models before the December 2025 deadline, those models work directly in Needle Engine. Scene layouts and behaviors need to be recreated.

### I'm not a developer. Can I still use Needle Engine?

Yes. Needle Engine works with Unity and Blender as visual editors. Many interactive behaviors are available as drag-and-drop components — no coding required. The [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) system provides no-code interactivity similar to Aero's Behaviors.

### Do I need Unity or Blender?

Not strictly — you can use Needle Engine with just code. But if you're coming from Aero's visual workflow, Unity or Blender will feel more familiar and make scene setup much easier.

### Does it work on Android?

Yes — unlike Aero, which had very limited Android support and required an app install. Needle Engine provides full AR on Android through WebXR with native ARCore tracking in Chrome and Firefox — no app install required.

### Does it work on iOS?

Yes. Needle Engine offers two ways to deliver AR on iOS — both without requiring a full app install:
- **[WebXR via App Clip](/docs/how-to-guides/xr/ios-webxr-app-clip)** — Full ARKit tracking quality through a lightweight App Clip that launches instantly from a link or QR code.
- **[Interactive USDZ / QuickLook](/docs/how-to-guides/everywhere-actions/)** — Needle Engine automatically generates interactive USDZ files at runtime, so iOS users can tap "View in AR" and get animations, material changes, and tap interactions directly in QuickLook.

### How does pricing work?

- **Free** for non-commercial use
- **Pro license** for commercial projects — **no per-view fees**
- **Host anywhere** — use your own servers or Needle Cloud

[Pricing details →](https://needle.tools/pricing)

---

## Next Steps

1. **[Try the samples](https://engine.needle.tools/samples/)** – See what's possible
2. **[Create a project](https://engine.needle.tools/new)** – Start in your browser
3. **[Learn Everywhere Actions](/docs/how-to-guides/everywhere-actions/)** – Rebuild your Aero Behaviors
4. **[Read the XR guide](/docs/how-to-guides/xr/)** – Learn about AR/VR features
5. **[Join Discord](https://discord.needle.tools)** – Get help from the community

---

## See Also

- [For 8th Wall Users](./for-8thwall-users) – Migration guide for 8th Wall developers
- [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) – No-code interactivity
- [WebXR Documentation](/docs/how-to-guides/xr/) – AR and VR capabilities
- [Deployment Guide](/docs/how-to-guides/deployment/) – Hosting options
