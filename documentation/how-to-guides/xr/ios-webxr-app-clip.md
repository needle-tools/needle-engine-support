---
title: iOS WebXR Support for Needle Engine
description: Needle Engine now supports native iOS WebXR on iPhone and iPad using ARKit-powered App Clips. Run WebXR AR experiences instantly without app installation on Safari iOS.
---

# <logo-header logo="/imgs/webxr-logo.webp" alt="WebXR">iOS WebXR Support for Needle Engine</logo-header>

:::tip Now Available in Beta
iOS WebXR support is now available natively in **Needle Engine Beta**.
:::


Needle Engine now includes native iOS WebXR support through Needle Go – using Apple's App Clip technology. While Safari on iOS doesn't support WebXR by default, Needle Engine automatically bridges this gap using native ARKit to provide full WebXR functionality in a lightweight, instant-launch format.

[![iOS WebXR on iPhone](https://cloud.needle.tools/-/media/WI0Q0s961BjdXgUEQHxifQ.gif)](https://appclip.needle.tools)

## How iOS WebXR Works in Needle Engine

Needle Engine automatically enables WebXR AR experiences on iPhone and iPad using App Clip technology (powered by "Needle Go"). App Clips launch instantly without requiring full app installation, making it perfect for sharing AR experiences via QR codes, links, or smart app banners.

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

## Supported WebXR Features

Needle Engine's iOS WebXR support includes comprehensive functionality:

- WebXR session management
- Hit testing and plane detection
- DOM overlays for UI elements
- Image tracking
- Anchor creation and tracking (wip)
- Lighting estimation (wip)

## Custom Branding for iOS AR

On iOS, the Needle Go App Clip experience includes a splash screen and wording. This branding can be customized for your project with a PRO subscription.  

At the moment, setting up custom branding isn't automated, so please reach out to us at [hi@needle.tools](mailto:hi@needle.tools) if you're interested in customizing the iOS AR experience for your project.

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

## Contact Us

If you need further assistance, you can reach us at:

- Email: [hi@needle.tools](mailto:hi@needle.tools)
- Website: [needle.tools](https://needle.tools)
- Discord: [Discord community](https://discord.needle.tools)

## Alternative: Everywhere Actions

Looking for a different iOS AR approach? Check out [Everywhere Actions](/docs/how-to-guides/everywhere-actions/), which enables interactive AR experiences on iOS using USDZ and QuickLook (Apple's native 3D format).

## Related Documentation

- [WebXR Documentation](/docs/how-to-guides/xr/) - Setting up WebXR in Needle Engine
- [Image Tracking](/docs/how-to-guides/xr/image-tracking) - WebXR image tracking guide
- [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) - iOS AR solution using USDZ
- [Deployment](/docs/how-to-guides/deployment/) - Publishing your Needle Engine projects
