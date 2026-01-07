---
title: iOS WebXR via App Clip (Coming Soon)
---

# iOS WebXR with Needle Go App Clip

:::warning Coming Soon
Needle Go is currently in development and will be available soon. This page provides an overview of the upcoming feature.
:::

Needle Go is an upcoming iOS App Clip that will enable full WebXR AR experiences on iOS devices. While Safari on iOS doesn't support WebXR natively, Needle Go bridges this gap by using native ARKit to provide WebXR functionality in a lightweight, instant-launch format.

## What is Needle Go?

Needle Go is an iOS App Clip that brings WebXR support to iPhone and iPad. App Clips launch instantly without requiring a full app installation, making it perfect for sharing AR experiences via QR codes, links, or smart app banners.

**Key Benefits:**
- **No Installation Required**: Users can access AR experiences instantly via App Clip
- **WebXR Support on iOS**: Run your Needle Engine WebXR scenes on iPhone and iPad
- **Easy Sharing**: Share AR experiences through QR codes, links, or website banners
- **Full AR Features**: Supports hit testing, anchors, lighting estimation, and more

## Why Needle Go?

WebXR is not supported on Safari for iOS. Previously, the only option was Mozilla's WebXR Viewer app, which requires installation and hasn't been updated in years.

Needle Go solves this by providing instant access to WebXR experiences through Apple's App Clip technology.

## How to Experience It

Experience WebXR content through your iPhone's screen, viewing and interacting with 3D content overlaid on the real world using native ARKit capabilities.

## How It Will Work

### Share via QR Code

1. Create a URL pointing to your WebXR experience
2. Generate a QR code
3. Users scan with iPhone camera to launch the App Clip instantly

### Embed in Your Website

Add a smart app banner to your site. When users visit on iOS, they can tap to launch your AR experience directly.

### Share Direct Links

Share links in messages, emails, or social media that launch the App Clip when opened on iOS.

## Using with Needle Engine

Your existing Needle Engine WebXR scenes will work automatically with Needle Go. Simply ensure your scene:

1. Has a `WebXR` component (see [WebXR documentation](xr.md))
2. Is deployed to a publicly accessible HTTPS URL
3. Is optimized for mobile devices

No changes to your Needle Engine project are required. Needle Go handles the WebXR-to-ARKit integration automatically.

## Supported Features

Needle Go will support comprehensive WebXR functionality:

- WebXR session management
- Hit testing and plane detection
- Anchor creation and tracking
- Lighting estimation
- DOM overlays for UI elements
- Image and object tracking

## Get Notified

Want to be notified when Needle Go launches?

- Follow updates in our [Discord community](https://discord.needle.tools)

## Alternative: Everywhere Actions

Looking for iOS AR support today? Check out [Everywhere Actions](everywhere-actions.md), which enables interactive AR experiences on iOS using USDZ and QuickLook.

## Related Documentation

- [WebXR Documentation](xr.md) - Setting up WebXR in Needle Engine
- [Everywhere Actions](everywhere-actions.md) - Current iOS AR solution using USDZ
- [Deployment](deployment.md) - Publishing your Needle Engine projects
