---
title: iOS WebXR Support for Needle Engine
description: Needle Engine now supports native iOS WebXR on iPhone and iPad using ARKit-powered App Clips. Run WebXR AR experiences instantly without app installation on Safari iOS.
---

# <logo-header logo="/imgs/webxr-logo.webp" alt="WebXR">iOS WebXR Support for Needle Engine</logo-header>

:::tip Now Available
iOS WebXR support is now available natively in **Needle Engine**.
:::


Needle Engine now includes native iOS WebXR support through Needle Go. While Safari on iOS doesn't support WebXR by default, Needle Engine automatically bridges this gap using native ARKit to provide full WebXR functionality in a lightweight, instant-launch format.

[![iOS WebXR on iPhone](https://cloud.needle.tools/-/media/WI0Q0s961BjdXgUEQHxifQ.gif)](https://appclip.needle.tools)

<testimonial
  name="Dario Sanchez"
  role="why.de"
  img="/docs/testimonial/DarioSanchez.jpg"
>
Needle Engine has been the most flexible, easy to implement, and solid web AR implementation I've come across.
</testimonial>

## How iOS WebXR Works in Needle Engine

Needle Engine automatically enables WebXR AR experiences on iPhone and iPad using App Clip technology, in the form of our Needle Go App Clip. App Clips launch instantly without requiring full app installation, making it perfect for sharing AR experiences via QR codes, links, or smart app banners.

The App Clip acts as a lightweight browser/runtime: Needle Engine adds the WebXR API on top of native ARKit, so the same WebXR scene that runs in Chrome on Android runs here too. There's no Apple Developer account or App Clip setup required — your scene runs inside Needle's shared **Needle Go** App Clip.

**Key Benefits:**
- **No Installation Required**: Users access AR experiences instantly without downloading an app
- **Native iOS WebXR**: Run WebXR scenes on iPhone and iPad with full ARKit integration
- **Easy Sharing**: Share AR experiences through QR codes, links, or website banners
- **Full AR Features**: Supports hit testing, anchors (wip), lighting estimation (wip), and more
- **Works with three.js**: Also compatible with any three.js-based web application via Needle Go

## Why Native iOS WebXR Support?

WebXR is not natively supported on Safari for iOS. Previously, the only option was Mozilla's WebXR Viewer app, which requires installation and hasn't been updated in years.

Needle Engine solves this by providing instant access to WebXR experiences through Apple's App Clip technology, automatically handling the integration for you.

## Getting Started

### Try it now

Visit [appclip.needle.tools](https://appclip.needle.tools) on your iPhone or iPad with Safari to experience iOS WebXR in action.

### How does iOS WebXR work in Needle Engine?

Needle Engine uses App Clips to instantly launch WebXR experiences in Augmented Reality without requiring app installation. The integration is automatic—your existing Needle Engine projects work on iOS without modifications.

### Which devices are supported?

iOS WebXR in Needle Engine works on iPhone and iPad devices running iOS 14 or later, from the Safari or Chrome browser.

## Experience WebXR AR on iOS

Users can experience your Needle Engine WebXR content through their iPhone or iPad screen, viewing and interacting with 3D content overlaid on the real world using native ARKit capabilities.


[![iOS WebXR Physics Example](https://cloud.needle.tools/-/media/I0gsLjFwcM2pyydPfkxaiw.gif)](https://engine.needle.tools/samples/physics-playground) [![iOS WebXR Image Tracking](https://cloud.needle.tools/-/media/vRUf9BmqW_bgNARATjmfCQ.gif)](https://engine.needle.tools/samples/image-tracking) [![More iOS WebXR Examples](https://cloud.needle.tools/-/media/gcj_YoSns8FivafQRiCiOQ.gif)](https://appclip.needle.tools)

Try out more iOS WebXR examples at [appclip.needle.tools](https://appclip.needle.tools).

## Using iOS WebXR with Needle Engine

Your existing Needle Engine WebXR scenes work automatically on iOS. Simply ensure your scene:

1. Has a `WebXR` component with the `createARButton` option enabled (see [WebXR documentation](/docs/how-to-guides/xr/))
2. Is deployed to a publicly accessible HTTPS URL
3. Is optimized for mobile devices

### Enabling iOS WebXR

There are two ways to enable iOS WebXR support in your Needle Engine project:

**Option 1: Enable AR Button (Recommended)**  
Enable the `createARButton` option in your [WebXR component](http://engine.needle.tools/docs/api/WebXR). This automatically creates a button that users can tap to enter AR mode.

**Option 2: Start Programmatically**
Manually start an XR session in your code:
```typescript
NeedleXRSession.start("ar");
```

:::tip No Additional Changes Required
The WebXR-to-ARKit integration is handled automatically when users access your experience on iOS Safari and Chrome. On Android the standard WebXR API is used.
:::

### For Vanilla three.js Applications

Even if you're using vanilla three.js without Needle Engine, you can enable iOS WebXR support by linking to:

```
https://appclip.needle.tools/ar?url=<your-webxr-url>
```

**Example:**
```
https://appclip.needle.tools/ar?url=https://example.com/my-ar-experience
```

Use this URL in QR codes, links, or share it directly. When opened on iPhone or iPad, it launches the Needle Go App Clip with your WebXR experience.

### QR Codes for Instant AR

When creating QR codes for your AR experience, you can link directly to the App Clip so that users on iOS are immediately presented with the App Clip card and can enter AR without navigating your website first.

To do this, encode the following URL in your QR code:

```
https://appclip.needle.tools/ar?url=<your-webxr-url>
```

**Example:**
```
https://appclip.needle.tools/ar?url=https://example.com/my-ar-experience
```

When an iOS user scans this QR code, the App Clip card appears immediately, allowing them to jump straight into the AR experience with a single tap.

:::tip
This is the recommended approach for physical installations, exhibitions, product packaging, or any scenario where you want users to enter AR as quickly as possible.
:::

## Supported WebXR Features

Needle Engine's iOS WebXR support includes comprehensive functionality:

- WebXR session management
- Hit testing and plane detection
- DOM overlays for UI elements
- Image tracking
- Anchor creation and tracking (wip)
- Lighting estimation (wip)

## Custom Branding for iOS AR

On iOS, the Needle Go App Clip experience includes a splash screen and wording. This branding can be customized for your project with a PRO subscription — your own header image, title, subtitle, and call-to-action button.

Custom branding is delivered through a **dedicated branded link** we set up for your experience, of the form:

```
https://appclip.needle.tools/x/<your-experience>
```

Opening this link on an iPhone or iPad shows **your** App Clip card (your image, title, and subtitle) before launching into AR.

::: tip Now works from a link click — not only QR codes
Previously, custom branding only appeared when launching via a **QR code**. Your branded `/x/…` link now also shows your custom card when **tapped directly** in Safari — so you can put it behind an *Enter AR* button on your website, send it in a message, or link to it from any app. Opening it in Safari presents your branded App Clip card automatically.

Note: only your branded `/x/…` link carries your branding. The generic `…/ar?url=…` link always shows the default Needle card, because Apple selects the card by URL **path** (and your branded experience is registered on its own path).
:::

### Connecting your branded experience to the *Enter AR* button

If you're building with Needle Engine, you can make the built-in *Enter AR* button (and any `NeedleXRSession.start("ar")` call) launch **your** branded App Clip experience instead of the default Needle card. Set `NeedleXRSession.appClipUrl` once, early in your app — for example at startup or in a component's `start()`:

```ts
import { NeedleXRSession } from "@needle-tools/engine";

// Use your branded experience id …
NeedleXRSession.appClipUrl = "your-experience";

// … or the full branded URL:
NeedleXRSession.appClipUrl = "https://appclip.needle.tools/x/your-experience";
```

From then on, when an iOS visitor taps *Enter AR*, Needle Engine opens your branded `/x/your-experience` link and iOS shows your custom App Clip card.

::: tip Must match your registered link
The value must resolve to the exact branded link we set up for you (`https://appclip.needle.tools/x/<your-experience>`). The engine opens it as-is and does **not** append any query parameters, because Apple selects the App Clip card by the registered URL. Providing only the experience id expands it onto `https://appclip.needle.tools/x/`. Available in Needle Engine 5.1.0 and later.
:::

Scan the QR code below with your iOS device to see how the App Clip card looks with the [image tracking sample](/docs/how-to-guides/xr/image-tracking):

<img src="/imgs/needlego-qrcode.png" alt="Needle Go App Clip QR Code" style="max-width: 400px; display: block;">
<small>https://appclip.needle.tools/ar?url=https://image-tracking-zubckszr0qj2.needle.run/</small>


An active PRO subscription is required to maintain your custom branding. If your subscription lapses, the iOS AR experience will revert to the default Needle branding. To keep your custom look and feel, make sure your PRO subscription stays active.

Please contact us at [hi@needle.tools](mailto:hi@needle.tools) for custom branding.

::: tip Required Branding Assets

Please provide the following assets for iOS AR branding customization:
- The URL to your experience (e.g. `https://yourdomain.com/your-ar-experience`)
- A header image: Minimum width 1800px, Height must be 1200px, PNG or JPG, No transparency, Maximum 10MB
- A display title (max. 30 chars) and subtitle (max. 56 chars)
- If needed, translations for display title and subtitle
- Your choice of "View", "Open", or "Play" for the call-to-action button text

Here's an example of how the iOS AR experience looks with custom branding:

![Example of iOS AR branding assets](/imgs/needlego-advancedexperience-template.webp "2x")

:::


## Troubleshooting

### AR experiences aren't working

Ensure that camera permissions are granted. Check in your device settings if the App Clip has access to the camera.

### Why is there a black background when I take a screenshot in AR mode on iOS? Only the 3D model is visible

This is expected: **capturing the camera feed in an AR screenshot is not yet supported** on iOS. On the iOS WebXR App Clip, a screenshot taken during an AR session contains only your 3D content over a black/transparent background — the real-world camera frames are not available to the screenshot, so you cannot composite them into the captured image today.

Note that requesting the `camera-access` feature (or adding a `WebARCameraBackground` component) does **not** fix this on iOS. That is the Android / standard-WebXR path for exposing camera frames; on the iOS App Clip the camera feed isn't accessible that way, and adding `WebARCameraBackground` can instead cause a black screen when entering AR. So there is currently no code workaround to include the live camera in an iOS AR screenshot.

We're actively working on AR camera capture for iOS. If this matters for your project, please let us know at [hi@needle.tools](mailto:hi@needle.tools) so we can gauge interest and prioritize it accordingly.

### I don't see my custom branding

Custom branding is shown on your dedicated **branded link** (`https://appclip.needle.tools/x/<your-experience>`), opened in **Safari** on iOS — via either a direct tap or a QR code. If it doesn't appear, check:

- You're using your branded `/x/<your-experience>` link, **not** the generic `https://appclip.needle.tools/ar?url=…` link (the generic one always shows the default Needle card).
- If you launch AR from Needle Engine's *Enter AR* button, set `NeedleXRSession.appClipUrl` to your branded experience (see [Connecting your branded experience to the *Enter AR* button](#connecting-your-branded-experience-to-the-enter-ar-button)). Without it, the button opens the default Needle card.
- You opened it in **Safari**. App Clip cards don't appear in Chrome or Firefox on iOS — those browsers prompt you to open the page in Safari first.
- Your custom branding is active (PRO) and the experience has been approved on Apple's side (a newly set-up experience can take a little while to go live).
- The full Needle Go app isn't already installed on the device — if it is, iOS shows an "Open" banner instead of the App Clip card.

See [Custom Branding for iOS AR](#custom-branding-for-ios-ar) for details.

## Alternative: Everywhere Actions

Looking for a different iOS AR approach? Check out [Everywhere Actions](/docs/how-to-guides/everywhere-actions/), which enables interactive AR experiences on iOS using USDZ and QuickLook (Apple's native 3D format).

### Apple Vision Pro

The instant App Clip AR flow above is for iPhone and iPad. On Apple Vision Pro, Needle Engine falls back to QuickLook for AR — so for custom, interactive AR on visionOS, use [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) (USDZ + QuickLook) rather than the WebXR App Clip.

## Related Documentation

- [WebXR Documentation](/docs/how-to-guides/xr/) - Setting up WebXR in Needle Engine
- [Image Tracking](/docs/how-to-guides/xr/image-tracking) - WebXR image tracking guide
- [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) - iOS AR solution using USDZ
- [Deployment](/docs/how-to-guides/deployment/) - Publishing your Needle Engine projects
