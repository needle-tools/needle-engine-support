---
title: VR & AR (WebXR)
---

# <logo-header logo="/imgs/webxr-logo.webp" alt="WebXR">WebXR with Needle Engine</logo-header>

**WebXR made easy.** Build immersive AR and VR experiences that work everywhere – from Meta Quest to Apple Vision Pro, Android to iOS, and everything in between. No app stores, no installation, no SDKs. Just pure web technology.

:::tip Try it now
Experience WebXR in action: [View XR Samples](https://engine.needle.tools/samples/?overlay=samples&tag=xr)
:::

## Why Choose Needle Engine for XR

**True Cross-Platform Support**
Needle Engine supports the full [WebXR specification](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API), including both AR and VR. Your experiences work on:
- **<logo-header logo="/imgs/meta-logo.webp" alt="Meta">VR Headsets</logo-header>**: Meta Quest, Apple Vision Pro, Pico, HTC Vive, Valve Index, and more
- **<logo-header logo="/imgs/android-logo.webp" alt="Android">Mobile AR</logo-header>**: Android devices with Chrome/Firefox
- **<logo-header logo="/imgs/apple-logo.webp" alt="Apple">iOS AR</logo-header>**: Native WebXR via [App Clips](ios-webxr-app-clip.md) - a unique Needle Engine advantage
- **Emerging Tech**: Looking Glass displays, Hololens, Magic Leap, and future devices

**Instant Deployment**
No app stores, no installation, no waiting for approval. Share your XR experiences with a simple URL or QR code. Users can jump into AR/VR in seconds.

**Future-Proof**
When a new XR device comes out that supports WebXR, your apps work automatically. This is the power of building with web standards – compatibility is not limited to a specific set of devices or SDKs.

**Component-Based Simplicity**
Add immersive XR capabilities to any scene with a single component. No complex setup, no boilerplate code. It just works.

## Quickstart: Enable XR in 2 Minutes

Adding AR or VR support to your Needle Engine scene is incredibly simple:

**1. Add the WebXR Component**

You can add it visually using the [Unity Integration](/docs/unity/) or [Blender addon](/docs/blender/), or with just a few lines of code:

```ts
import { onStart, WebXR } from "@needle-tools/engine";

onStart(context => {
  context.scene.addComponent(WebXR);
});
```

**2. Deploy and Test**

Deploy your scene to any HTTPS URL and open it on an XR device. That's it!

:::tip Learn More
- [XR Event Methods](/reference/api/xr-events) - Event methods and lifecycle
- [NeedleXRSession API](https://engine.needle.tools/docs/api/NeedleXRSession) - Advanced session control
- [WebXR Component API](https://engine.needle.tools/docs/api/WebXR) - Full component reference
:::

## Platform Support

### <logo-header logo="/imgs/apple-logo.webp" alt="Apple">iOS: Full WebXR Support Now Available</logo-header>

**Native iOS WebXR via App Clips** 🎉

Needle Engine provides full WebXR support on iPhone and iPad through [App Clip technology](ios-webxr-app-clip.md) – a unique advantage that sets Needle Engine apart. Users can experience your WebXR AR content instantly via QR codes, links, or smart app banners without installing an app.

**Features:**
- Full WebXR session management powered by ARKit
- Hit testing and plane detection
- DOM overlays for UI elements
- Image tracking
- Anchor creation and tracking (work in progress)
- Lighting estimation (work in progress)

**No code changes required** – your existing Needle Engine WebXR scenes work automatically on iOS. Simply enable the WebXR component with the `createARButton` option and deploy to an HTTPS URL.

[Try it now](https://appclip.needle.tools) • [Read full iOS WebXR docs](./ios-webxr-app-clip)

**Alternative: Everywhere Actions**

For USDZ/QuickLook-based iOS AR experiences, see [Everywhere Actions](/how-to-guides/everywhere-actions/). This approach uses Apple's native 3D format and supports a subset of functionality including spatial audio, animations, and interactions.

### Supported Devices & Browsers

The following devices and browsers have been verified to work with Needle Engine. When new devices with WebXR support are released, they will work with your apps out of the box.

#### Mobile Devices

| Device | Browser | Features |
| --- | --- | --- |
| <logo-header logo="/imgs/android-logo.webp" alt="Android">Android 10+</logo-header> | ✔️ Chrome | Full WebXR AR support |
| <logo-header logo="/imgs/android-logo.webp" alt="Android">Android 10+</logo-header> | ✔️ Firefox | Full WebXR AR support |
| <logo-header logo="/imgs/apple-logo.webp" alt="Apple">iOS 14+</logo-header> | ✔️ Safari<br/>✔️ Chrome | Full WebXR via [App Clip technology](/docs/explanation/core-concepts/ios-webxr-app-clip) (ARKit-powered). Alternative: [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) for USDZ/QuickLook |
| <logo-header logo="/imgs/apple-logo.webp" alt="Apple">iOS 15+</logo-header> | ✔️ WebXR Viewer | Older browser option (somewhat dated) |
| <logo-header logo="/imgs/microsoft-logo.webp" alt="Microsoft">Hololens 2</logo-header> | ✔️ Edge | hand tracking |
| <logo-header logo="/imgs/microsoft-logo.webp" alt="Microsoft">Hololens 1</logo-header> | ❌ | no WebXR support |
| <logo-header logo="/imgs/magic-leap-logo.webp" alt="Magic Leap">Magic Leap 2</logo-header> | ✔️ | |

#### VR Headsets

| Device | Browser | Features |
| --- | --- | --- |
| <logo-header logo="/imgs/apple-logo.webp" alt="Apple">Apple Vision Pro</logo-header> | ✔️ Safari | hand tracking, transient pointer support |
| <logo-header logo="/imgs/meta-logo.webp" alt="Meta">Meta Quest 3</logo-header> | ✔️ Meta Browser | hand tracking, sessiongranted<sup>1</sup>, passthrough, depth sensing, mesh tracking |
| <logo-header logo="/imgs/meta-logo.webp" alt="Meta">Meta Quest 3S</logo-header> | ✔️ Meta Browser | hand tracking, sessiongranted<sup>1</sup>, passthrough, depth sensing, mesh tracking |
| <logo-header logo="/imgs/meta-logo.webp" alt="Meta">Meta Quest 2</logo-header> | ✔️ Meta Browser | hand tracking, sessiongranted<sup>1</sup>, passthrough (black and white) |
| <logo-header logo="/imgs/meta-logo.webp" alt="Meta">Meta Quest Pro</logo-header> | ✔️ Meta Browser | hand tracking, sessiongranted<sup>1</sup>, passthrough |
| <logo-header logo="/imgs/meta-logo.webp" alt="Meta">Meta Quest 1</logo-header> | ✔️ Meta Browser | hand tracking, sessiongranted<sup>1</sup> |
| <logo-header logo="/imgs/pico-logo.webp" alt="Pico">Pico Neo 4</logo-header> | ✔️ Pico Browser | passthrough, hand tracking<sup>2</sup> |
| <logo-header logo="/imgs/pico-logo.webp" alt="Pico">Pico Neo 3</logo-header> | ✔️ Pico Browser | basic support (no hand tracking, inverted controller thumbsticks) |
| <logo-header logo="/imgs/meta-logo.webp" alt="Meta">Oculus Rift 1/2</logo-header> | ✔️ Chrome |  |
| Valve Index | ✔️ Chrome |  |
| HTC Vive | ✔️ Chrome |  |
| <logo-header logo="/imgs/microsoft-logo.webp" alt="Microsoft">Hololens 2</logo-header> | ✔️ Edge | hand tracking, AR and VR modes |


#### Other Devices

| Device | Browser | Notes |
| --- | --- | --- |
| Looking Glass Holographic Display | ✔️ Chrome | requires Looking Glass bridge and custom code, [see our sample](https://engine.needle.tools/samples/looking-glass/) |
| <logo-header logo="/imgs/logitech-logo.webp" alt="Logitech">Logitech MX Ink</logo-header> | ✔️ Meta Browser | officially supported, see [docs](https://logitech.github.io/mxink/WebXR/WebXrIntegration.html#using-needle-tools) |

<sup>1</sup>: Requires enabling browser flag: `chrome://flags/#webxr-navigation-permission`
<sup>2</sup>: Requires enabling toggle in Developer settings

## Live Examples

Experience what's possible with Needle Engine XR. Try these interactive examples on your device:

<sample src="https://engine.needle.tools/samples/collaborative-sandbox/"/>

**More Examples:**
- [Image Tracking Demo](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr) - WebXR on Android, QuickLook on iOS
- [Musical Instrument](https://engine.needle.tools/samples-uploads/musical-instrument) - Spatial audio, animation, interactions
- [AR Overlay UI](https://engine.needle.tools/samples-uploads/ar-overlay/) - HTML content in AR
- [Browse all XR samples](https://engine.needle.tools/samples/?overlay=samples&tag=xr)

**Real-World Projects:**
> **[In Arm's Reach](https://engine.needle.tools/samples/in-arms-reach/)** - Immersive mixed reality experience connecting users spatially and emotionally from their city to remote places of nature. This climate awareness project was realized in only 2.5 days and won 5 prizes including the Grand Prize at MIT Reality Hack 2024 - the most prizes for a project in the event's history!
> — #madewithneedle 💚

> **[Castle Builder](https://castle.needle.tools/)** - Cross-platform multiplayer sandbox with VR support, voice chat, and synchronized experiences across desktop and VR headsets.
> — #madebyneedle 💚

> **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** - Collaborative text placement with AR viewing on iOS via USDZ export.
> — #madewithneedle by Katja Rempel 💚

## Core XR Features

### AR Settings

When building AR experiences, you'll often need to adjust scale and positioning:

**1. Define AR Session Root and Scale**
Add a `WebXR` component to your root object and modify the scale property. For AR experiences, you typically want to scale the scene to fit the real world (e.g., a product might be scaled to actual size).

**2. Define User Scale**
Adjust the user scale to shrink (< 1) or enlarge (> 1) the user in relation to the scene when entering AR. This affects how large the virtual environment appears relative to the user.

### Controlling Object Visibility

Use the `XR Flag` component to control whether objects are visible in different contexts:

- Browser (desktop/mobile 2D view)
- AR mode
- VR mode
- First Person view
- Third Person view

**Common Use Cases:**
- Hide floors when entering AR (real-world floor is visible)
- Hide avatar head in first-person VR view
- Show different UI elements in different modes

### Image Tracking

Needle Engine supports **WebXR Image Tracking** on Android and **QuickLook Image Tracking** on iOS.

Track images in the real world and attach 3D content to them. Perfect for:
- Product packaging experiences
- Posters and marketing materials
- Interactive business cards
- Museum exhibits

[Try the live demo](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr) • [Read full Image Tracking docs](./image-tracking)

## Advanced Features

### Multiplayer & Networking in XR

Add real-time multiplayer support to your XR experiences with Needle Engine's built-in networking:

**1. Enable Networking**
Add a `SyncedRoom` component to enable multiplayer sessions.

**2. Sync Desktop Viewers**
Add a `SyncedCamera` component to allow desktop users to watch VR/AR users.

**3. Enable Voice Chat**
Add a `VoIP` component for spatial voice communication.

:::tip Scene Structure
These components can be placed anywhere in your hierarchy. They can all be on the same GameObject, which is a common pattern.
:::

### HTML Content Overlays in AR

Display custom HTML UI elements during AR sessions using the `dom-overlay` feature:

```html
<needle-engine>
    <div class="desktop ar" style="pointer-events:none;">
        <div class="positioning-container">
          <p>Your content for AR and desktop</p>
          <p class="only-in-ar">This only appears in AR</p>
        </div>
    </div>
</needle-engine>
```

Control visibility with CSS:

```css
.only-in-ar {
  display: none;
}

.ar-session-active .only-in-ar {
  display: initial;
}
```

:::tip Styling Note
The overlay element will always be displayed fullscreen while in XR. To align content differently, create a container _inside_ the AR element.
:::

[See live example](https://engine.needle.tools/samples-uploads/ar-overlay/)

### Customize AR Exit Button

By default, Needle Engine creates an "X" button in the top-right corner to exit AR. You can customize or hide it:

**Custom Button:**
```html
<needle-engine>
  <div slot="quit-ar">
    Exit AR
  </div>
</needle-engine>
```

**Hide Button:**
```html
<needle-engine>
  <div slot="quit-ar"></div>
</needle-engine>
```

:::tip
Always provide users with a way to exit AR. Use [NeedleXRSession.stop()](https://engine.needle.tools/docs/api/NeedleXRSession) to exit programmatically.
:::

### Travelling Between VR Worlds

Needle Engine supports the [`sessiongranted`](https://github.com/immersive-web/navigation) state, allowing users to seamlessly navigate between WebXR applications without leaving their immersive session.

**How to Use:**
Add the `OpenURL` component to clickable objects to create links to other XR experiences.

**Availability:**
Currently supported on Meta Quest 1, 2, and 3 in the Meta Browser (requires browser flag: `chrome://flags/#webxr-navigation-permission`). On other platforms, users will need to re-enter VR on the new page.

### Custom Avatars

While Needle Engine doesn't provide out-of-the-box integration with external avatar systems, you can create custom application-specific avatars:

**Basic Avatar Setup:**
1. Create an empty GameObject as avatar root
2. Add an object named `Head` with an `XRFlag` set to Third Person
3. Add objects named `HandLeft` and `HandRight`
4. Add your graphics below these objects

**Experimental Components:**

There are several experimental components for more expressive avatars. These are subject to change, so we recommend duplicating them for your own use:

- **`PlayerColor`** - Randomized synchronized player colors
- **`AvatarEyeLook_Rotation`** - Eyes follow other avatars (synchronized)
- **`AvatarBlink_Simple`** - Periodic eye blinking animation
- **`OffsetConstraint`** - Position constraints for body parts
- **`BasicIKConstraint`** - Simple IK for arms and legs

![Avatar Example](https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif)
*Example Avatar Rig with basic neck model and limb constraints*

## Next Steps

**Learn More:**
- [XR Event Methods](/docs/reference/api/xr-events) - Event methods and lifecycle hooks
- [WebXR Component API](https://engine.needle.tools/docs/api/WebXR) - Complete component documentation
- [NeedleXRSession API](https://engine.needle.tools/docs/api/NeedleXRSession) - Advanced session control
- [Image Tracking Guide](/docs/how-to-guides/xr/image-tracking) - Detailed image tracking documentation

**iOS AR Options:**
- [iOS WebXR App Clip](/docs/how-to-guides/xr/ios-webxr-app-clip) - Native WebXR support for iPhone and iPad
- [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) - USDZ/QuickLook-based interactive AR

**Get Inspired:**
- [Browse XR Samples](https://engine.needle.tools/samples/?overlay=samples&tag=xr) - Interactive examples
- [Community Projects](https://forum.needle.tools/?utm_source=needle_docs&utm_content=xr) - Projects from the Needle community
