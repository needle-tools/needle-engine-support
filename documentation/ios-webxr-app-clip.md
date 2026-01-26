---
title: iOS WebXR Support for Needle Engine
description: Needle Engine now supports native iOS WebXR on iPhone and iPad using ARKit-powered App Clips. Run WebXR AR experiences instantly without app installation on Safari iOS.
---

# iOS WebXR Support for Needle Engine

:::tip Now Available
iOS WebXR support is now available natively in Needle Engine.
:::


Needle Engine now includes native iOS WebXR support through App Clip technology. While Safari on iOS doesn't support WebXR by default, Needle Engine automatically bridges this gap using native ARKit to provide full WebXR functionality in a lightweight, instant-launch format.

![](https://cloud.needle.tools/-/media/aZ7UXxYFLdVN65cb99Tnyw.gif)

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

## Using iOS WebXR with Needle Engine

Your existing Needle Engine WebXR scenes work automatically on iOS. Simply ensure your scene:

1. Has a `WebXR` component with the `createARButton` option enabled (see [WebXR documentation](xr.md))
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

No additional changes are required. The WebXR-to-ARKit integration is handled automatically when users access your experience on iOS Safari and Chrome. On Android the standard WebXR API is used.

### For three.js Applications

If you're using three.js (not Needle Engine), you can still enable iOS WebXR support through Needle Go by integrating it into your existing web application.

## Supported WebXR Features

Needle Engine's iOS WebXR support includes comprehensive functionality:

- WebXR session management
- Hit testing and plane detection
- DOM overlays for UI elements
- Image tracking
- Anchor creation and tracking (wip)
- Lighting estimation (wip)

## Troubleshooting

### AR experiences aren't working

Ensure that camera permissions are granted. Check in your device settings if the App Clip has access to the camera.

## Contact Us

If you need further assistance, you can reach us at:

- Email: [hi@needle.tools](mailto:hi@needle.tools)
- Website: [needle.tools](https://needle.tools)
- Discord: [Discord community](https://discord.needle.tools)

## Alternative: Everywhere Actions

Looking for a different iOS AR approach? Check out [Everywhere Actions](everywhere-actions.md), which enables interactive AR experiences on iOS using USDZ and QuickLook (Apple's native 3D format).

## Related Documentation

- [WebXR Documentation](xr.md) - Setting up WebXR in Needle Engine
- [Everywhere Actions](everywhere-actions.md) - Current iOS AR solution using USDZ
- [Deployment](deployment.md) - Publishing your Needle Engine projects
