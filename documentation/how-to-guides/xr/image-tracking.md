---
title: WebXR Image Tracking with Needle Engine
---

# <logo-header logo="/imgs/webxr-logo.webp" alt="WebXR">WebXR Image Tracking</logo-header>

## What is WebXR Image Tracking

**WebXR image tracking enables browsers to detect and track specific images in the real world** through a device's camera, providing real-time position and orientation data to anchor virtual content precisely to physical markers like posters, packaging, or artwork.

By pointing the camera at a recognized image, the image tracking API continuously updates the spatial relationship between the virtual and physical elements, ensuring proper alignment even as the device or image moves.

Image tracking transforms static images into interactive AR triggers—allowing museum paintings to display overlaid information, product packages to reveal 3D animations, or business cards to show floating contact details—all through web standards without requiring users to download dedicated apps, making AR experiences instantly accessible through any compatible web browser.

## Platform Support

Needle Engine supports image tracking across multiple platforms:

| Platform | Technology | Status |
| --- | --- | --- |
| **iOS (Safari, Chrome)** | Native WebXR via [App Clip](/docs/how-to-guides/xr/ios-webxr-app-clip) | ✅ Full support |
| **Android** | WebXR Image Tracking | ✅ Supported (requires Chrome flag) |
| **iOS (Alternative)** | QuickLook Image Tracking | ✅ Supported via [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) |

### iOS: Native WebXR Image Tracking 🎉

**NEW:** iOS now supports native WebXR image tracking through [Needle Go - iOS WebXR App Clip](/docs/how-to-guides/xr/ios-webxr-app-clip)!

Users can experience your image tracking AR content instantly on iPhone and iPad via:
- QR codes
- Smart app banners
- Direct links

**No app installation required** – powered by ARKit for high-quality tracking.

[Try it now](https://appclip.needle.tools) • [Learn more about iOS WebXR](/docs/how-to-guides/xr/ios-webxr-app-clip)

### Android: WebXR Image Tracking

Android devices support WebXR Image Tracking through Chrome with a browser flag enabled.

:::info Enable WebXR Image Tracking on Android
**On Android**, turn on "WebXR Incubations" in Chrome Flags:
1. Open Chrome on your Android device
2. Paste `chrome://flags/#webxr-incubations` in the address bar
3. Enable the "WebXR Incubations" flag
4. Restart Chrome
:::

## Live Demo

[**Try the live demo →**](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)

Start the scene below in AR and point your phone's camera at the image marker on a screen, or print it out.

<img src="https://image-tracking-zubckszr0qj2.needle.run/assets/image-marker.jpg" alt="Image Marker" style="max-width: 300px" />

<a href="/docs/imgs/imagetracking-handout.pdf" target="_blank">Download printable marker (PDF)</a>

<sample src="https://image-tracking-zubckszr0qj2.needle.run/" />

**How to test:**
1. Open the demo on your device (iOS or Android)
2. Tap the AR button to enter AR mode
3. Point your camera at the marker image above
4. Watch 3D content appear tracked to the marker!

---

## Setup in Unity or Blender

Image tracking can be set up in both Unity and Blender by adding a `WebXRImageTracking` component to an object. Then add your images to the `Tracked Images` array.

### <logo-header logo="/imgs/unity-logo.webp" alt="Unity">Unity Setup</logo-header>

![Unity WebXR Image Tracking Component](/imgs/webxr-image-tracking-unity-component.jpg)
*Image tracking component in Unity*

**Steps:**
1. Add a `WebXRImageTracking` component to a GameObject
2. In the `Tracked Images` array, add your marker images
3. Assign content to display when each image is detected
4. Export and test on device

### <logo-header logo="/blender/logo.png" alt="Blender">Blender Setup</logo-header>

![Blender WebXR Image Tracking Component](/imgs/webxr-image-tracking-blender-component.jpg)
*Image tracking component in Blender*

**Steps:**
1. Add a `WebXRImageTracking` component in the Needle Engine panel
2. Add your marker images to the tracked images list
3. Set up content to appear when images are detected
4. Export and test on device

---

## Technical Details

### <logo-header logo="/imgs/ios-logo.webp" alt="iOS">iOS: Full Native Support ✅</logo-header>

iOS image tracking works through [Needle Go App Clip](/docs/how-to-guides/xr/ios-webxr-app-clip) with full ARKit support:
- ✅ **No browser flags required**
- ✅ **No setup needed**
- ✅ **High-quality ARKit tracking**
- ✅ **Works in Safari and Chrome**
- ✅ **Instant access via QR codes or links**

Your Needle Engine project works automatically on iOS with image tracking enabled. [Learn more →](/docs/how-to-guides/xr/ios-webxr-app-clip)

### <logo-header logo="/imgs/android-logo.webp" alt="Android">Android: Browser Flag Required</logo-header>

Android uses the WebXR Image Tracking API, which is currently in draft specification status ([Marker Tracking Explainer](https://github.com/immersive-web/image-tracking/blob/main/explainer.md)).

**Requirements:**
- Enable `WebXR Incubations` flag in Chrome (`chrome://flags/#webxr-incubations`)
- Restart Chrome after enabling the flag

:::tip
This is a temporary requirement while browser vendors finalize the specification. Once finalized, the flag won't be needed.
:::

### Alternative Approaches

If you need image tracking without WebXR support, consider these alternatives:

**1. Everywhere Actions (iOS QuickLook)**
- Works on iOS without App Clip
- Uses Apple's QuickLook with USDZ
- Limited to QuickLook capabilities
- [Learn more about Everywhere Actions](/docs/how-to-guides/everywhere-actions/)

**2. Camera-Based Libraries**
These require camera access permissions and use local computer vision:
- [Experimental AR.js integration](https://github.com/FireDragonGameStudio/NeedleAndARjs) by FireDragonGameStudio
- [AR.js](https://github.com/AR-js-org/AR.js) (open source)
- [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)

:::tip
For the best user experience on iOS, we recommend using the [iOS WebXR App Clip](/docs/how-to-guides/xr/ios-webxr-app-clip) approach, which provides native ARKit tracking without requiring camera permissions or additional setup.
:::

---

## Use Cases

Image tracking opens up many creative possibilities:

**Marketing & Advertising:**
- Product packaging reveals 3D animations
- Posters come to life with video content
- Business cards show contact information in AR

**Education & Museums:**
- Paintings display historical context
- Textbooks show 3D models
- Exhibits provide interactive information

**Retail & E-commerce:**
- Product catalogs show 3D previews
- Magazine ads become interactive
- Store displays trigger AR experiences

**Events & Entertainment:**
- Concert posters show ticket info
- Movie posters play trailers
- Event badges trigger AR content

---

## Best Practices

**Image Marker Design:**
- Use high-contrast images
- Include distinctive features
- Avoid repeating patterns
- Test at different sizes
- Ensure good lighting conditions

**Performance:**
- Keep tracked content lightweight
- Use texture compression
- Optimize 3D models
- Test on target devices

**User Experience:**
- Provide clear instructions
- Show the marker image prominently
- Handle detection/loss gracefully
- Test in various lighting conditions

---

## Next Steps

**Get Started:**
- [Unity Integration](/docs/unity/) - Set up image tracking in Unity
- [Blender Integration](/docs/blender/) - Set up image tracking in Blender
- [iOS WebXR Guide](/docs/how-to-guides/xr/ios-webxr-app-clip) - Enable native iOS support

**Learn More:**
- [XR Documentation](/docs/how-to-guides/xr/) - Full XR capabilities
- [Everywhere Actions](/docs/how-to-guides/everywhere-actions/) - Alternative AR approaches
- [Deployment Guide](/docs/how-to-guides/deployment/) - Publish your AR experience

**Resources:**
- [Live Demo](https://engine.needle.tools/samples/image-tracking) - Try it now
- [WebXR Marker Tracking Explainer](https://github.com/immersive-web/image-tracking/blob/main/explainer.md)
- [WebXR Device API](https://www.w3.org/TR/webxr/)
- [caniuse: WebXR](https://caniuse.com/webxr)

---

:::tip Need Help?
Join our [Discord community](https://discord.needle.tools) or visit our [Forum](https://forum.needle.tools) for support with image tracking and other AR features.
:::
