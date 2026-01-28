---
title: Detect Mobile Devices and Platforms
description: Learn how to detect mobile devices, tablets, browsers, and operating systems to create platform-specific experiences
---

# Detect Mobile Devices and Platforms

Learn how to detect what device, platform, or browser your users are on to create optimized experiences.

Needle Engine provides the `DeviceUtilities` namespace with functions to detect:
- **Device types**: Mobile phones, tablets, desktops, XR headsets
- **Operating systems**: iOS, Android, macOS, VisionOS
- **Browsers**: Safari, Chrome, specialized XR browsers
- **Capabilities**: AR support, microphone permissions, version info

Use these utilities to adapt your app's behavior, optimize performance, or enable platform-specific features.

:::tip Cross-Platform by Default
Needle Engine works seamlessly across all platforms! Use these utilities only when you need platform-specific features or optimizations. Your app should work everywhere by default, with progressive enhancement for capable devices.
:::

---

## Built-In Components (No Code Required!)

For many use cases, you don't need to write any code! Use these built-in components directly in Unity or Blender.

### DeviceFlag Component

Automatically show or hide GameObjects based on device type (mobile vs desktop).

**In Unity/Blender:**
1. Add the `DeviceFlag` component to any GameObject
2. Set `Visible On` to:
   - **Desktop** - Only visible on desktop/laptop computers
   - **Mobile** - Only visible on phones and tablets
   - **Desktop + Mobile** - Visible on all devices

**Use Cases:**
- Show high-quality models only on desktop
- Display simplified UI for mobile devices
- Hide complex effects on lower-powered devices

### XRFlag Component

Show or hide objects based on XR state (VR/AR mode, first/third person view).

**In Unity/Blender:**
1. Add the `XRFlag` component to any GameObject
2. Set `Visible In` to combinations of:
   - **Browser** - Normal web browser mode
   - **AR** - When in AR session
   - **VR** - When in VR session
   - **FirstPerson** - First-person camera view
   - **ThirdPerson** - Third-person camera view

**Use Cases:**
- Show UI only in browser mode, hide in VR/AR
- Display different models for VR vs AR
- Switch between first-person and third-person controls

:::tip Perfect for Non-Programmers
These components work automatically when added in your editor - no scripting needed! They're perfect for artists and designers who want device-specific content without writing code.
:::

---

## Quick Start (Code)

:::tip Recommended Approach
Use the `DeviceUtilities` namespace for all device detection - it keeps imports clean and organized.
:::

```ts
import { Behaviour, DeviceUtilities } from "@needle-tools/engine";

export class PlatformDetection extends Behaviour {
    start() {
        if (DeviceUtilities.isMobileDevice()) {
            console.log("Running on mobile device!");

            if (DeviceUtilities.isiOS()) {
                console.log("Specifically on iOS");
            } else if (DeviceUtilities.isAndroidDevice()) {
                console.log("Specifically on Android");
            }
        }
    }
}
```

---

## Device Type Detection

### Mobile vs Desktop

```ts
import { DeviceUtilities } from "@needle-tools/engine";

// Check if on phone or tablet
if (DeviceUtilities.isMobileDevice()) {
    // Reduce particle effects for mobile
    particleCount = 100;
} else if (DeviceUtilities.isDesktop()) {
    // Use higher quality settings on desktop
    particleCount = 1000;
}
```

### Specific Device Types

```ts
import { DeviceUtilities } from "@needle-tools/engine";

if (DeviceUtilities.isiPad()) {
    console.log("Running on iPad");
}

if (DeviceUtilities.isQuest()) {
    console.log("Running on Meta Quest");
}

if (DeviceUtilities.isVisionOS()) {
    console.log("Running on Apple Vision Pro");
}
```

---

## Operating System Detection

### iOS Detection

```ts
import { DeviceUtilities } from "@needle-tools/engine";

// Check for any iOS device (iPhone, iPad, iPod, Vision Pro)
if (DeviceUtilities.isiOS()) {
    console.log("iOS device detected");

    // Get specific iOS version
    const version = DeviceUtilities.getiOSVersion();
    if (version) {
        console.log("iOS version:", version);
    }
}

// Specific iPad detection
if (DeviceUtilities.isiPad()) {
    // iPad-specific UI layout
}
```

### Android Detection

```ts
import { DeviceUtilities } from "@needle-tools/engine";

if (DeviceUtilities.isAndroidDevice()) {
    console.log("Android device detected");
    // Use Android-specific features
}
```

### macOS Detection

```ts
import { DeviceUtilities } from "@needle-tools/engine";

if (DeviceUtilities.isMacOS()) {
    console.log("Running on macOS");
    // Show Command key shortcuts instead of Ctrl
}
```

---

## Browser Detection

### Safari

```ts
import { DeviceUtilities } from "@needle-tools/engine";

if (DeviceUtilities.isSafari()) {
    console.log("Safari browser detected");

    // Get Safari version
    const version = DeviceUtilities.getSafariVersion();
    if (version) {
        console.log("Safari version:", version);
    }

    // Apply Safari-specific workarounds if needed
}
```

### Chrome

```ts
import { DeviceUtilities } from "@needle-tools/engine";

const chromeVersion = DeviceUtilities.getChromeVersion();
if (chromeVersion) {
    console.log("Chrome version:", chromeVersion);
}
```

### Specialized Browsers

```ts
import { DeviceUtilities } from "@needle-tools/engine";

// Mozilla XR Viewer (iOS AR browser)
if (DeviceUtilities.isMozillaXR()) {
    console.log("Running in Mozilla XR Viewer");
}

// Needle App Clip
if (DeviceUtilities.isNeedleAppClip()) {
    console.log("Running in Needle App Clip");
}
```

---

## XR and AR Capabilities

### AR Support

```ts
import { DeviceUtilities } from "@needle-tools/engine";

// Check if device supports AR QuickLook (iOS AR)
if (DeviceUtilities.isiOS() && DeviceUtilities.supportsQuickLookAR()) {
    console.log("Device supports AR QuickLook");
    // Show AR button
}
```

### VR Devices

```ts
import { DeviceUtilities } from "@needle-tools/engine";

if (DeviceUtilities.isQuest()) {
    // Optimize for Quest rendering capabilities
    enableFoveatedRendering();
}

if (DeviceUtilities.isVisionOS()) {
    // Enable immersive space features
    enableVisionProMode();
}
```

---

## Practical Examples

### Platform-Specific Quality Settings

```ts
import { Behaviour, DeviceUtilities } from "@needle-tools/engine";

export class QualitySettings extends Behaviour {
    start() {
        const renderer = this.context.renderer;

        if (DeviceUtilities.isMobileDevice()) {
            // Lower quality on mobile
            renderer.setPixelRatio(1);
            renderer.shadowMap.enabled = false;

            if (DeviceUtilities.isiOS()) {
                // iOS-specific optimizations
                renderer.powerPreference = "low-power";
            }
        } else {
            // High quality on desktop
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.shadowMap.enabled = true;
        }
    }
}
```

### Adaptive UI

```ts
import { Behaviour, DeviceUtilities } from "@needle-tools/engine";

export class ResponsiveUI extends Behaviour {
    start() {
        if (DeviceUtilities.isiPad()) {
            // Larger touch targets for iPad
            this.buttonSize = 60;
        } else if (DeviceUtilities.isMobileDevice()) {
            // Medium size for phones
            this.buttonSize = 50;
        } else {
            // Smaller size for desktop with mouse
            this.buttonSize = 40;
        }

        this.updateButtonSizes();
    }

    private buttonSize: number = 40;

    private updateButtonSizes() {
        // Update UI button sizes based on device
        console.log("Setting button size to", this.buttonSize);
    }
}
```

### Control Scheme Selection

```ts
import { Behaviour, DeviceUtilities } from "@needle-tools/engine";

export class ControlManager extends Behaviour {
    start() {
        if (DeviceUtilities.isVisionOS() || DeviceUtilities.isQuest()) {
            // Enable XR hand tracking controls
            this.enableXRControls();
        } else if (DeviceUtilities.isMobileDevice()) {
            // Enable touch controls
            this.enableTouchControls();
        } else {
            // Enable keyboard + mouse controls
            this.enableDesktopControls();
        }
    }

    private enableXRControls() {
        console.log("XR controls enabled");
    }

    private enableTouchControls() {
        console.log("Touch controls enabled");
    }

    private enableDesktopControls() {
        console.log("Desktop controls enabled");
    }
}
```

### Feature Detection with Permissions

```ts
import { Behaviour, DeviceUtilities } from "@needle-tools/engine";

export class MicrophoneSetup extends Behaviour {
    async start() {
        // Check if microphone permission is granted
        const hasPermission = await DeviceUtilities.microphonePermissionsGranted();

        if (hasPermission) {
            console.log("Microphone access granted");
            // Enable voice features
        } else {
            console.log("Microphone access denied or not requested");
            // Show fallback UI
        }
    }
}
```

---

## Available Detection Functions

All functions are available under the `DeviceUtilities` namespace. See the [complete API documentation](https://engine.needle.tools/docs/api/DeviceUtilities) for more details.

### Device Types
- `DeviceUtilities.isMobileDevice()` - Any phone or tablet
- `DeviceUtilities.isDesktop()` - Desktop/laptop computer (excludes Hololens)
- `DeviceUtilities.isiPad()` - iPad specifically
- `DeviceUtilities.isQuest()` - Meta Quest devices
- `DeviceUtilities.isVisionOS()` - Apple Vision Pro

### Operating Systems
- `DeviceUtilities.isiOS()` - Any iOS device (iPhone, iPad, iPod, Vision Pro)
- `DeviceUtilities.isAndroidDevice()` - Android devices
- `DeviceUtilities.isMacOS()` - macOS computers

### Browsers
- `DeviceUtilities.isSafari()` - Safari browser
- `DeviceUtilities.isMozillaXR()` - Mozilla XR Viewer

### Capabilities
- `DeviceUtilities.supportsQuickLookAR()` - AR QuickLook support (iOS AR)
- `DeviceUtilities.microphonePermissionsGranted()` - Async check for microphone access

### Version Information
- `DeviceUtilities.getiOSVersion()` - Returns iOS version string
- `DeviceUtilities.getChromeVersion()` - Returns Chrome version string
- `DeviceUtilities.getSafariVersion()` - Returns Safari version string

---

## Best Practices

### Progressive Enhancement

Always build your core experience to work on all platforms, then enhance:

```ts
import { DeviceUtilities } from "@needle-tools/engine";

// ✅ Good: Works everywhere, enhanced on capable devices
if (DeviceUtilities.isMobileDevice()) {
    // Simplified mobile experience
} else {
    // Enhanced desktop experience with extra features
}

// ❌ Bad: Blocks users on certain platforms
if (!DeviceUtilities.isMobileDevice()) {
    throw new Error("Desktop only!");
}
```

### Test on Real Devices

Device detection isn't perfect. Always test on actual hardware:

- Use URL parameters for testing: `?forcemobile=true`
- Test on multiple iOS and Android versions
- Verify behavior in different browsers

### Combine with Feature Detection

Prefer feature detection over device detection when possible:

```ts
// Check for actual WebXR support
if ('xr' in navigator) {
    // Enable VR/AR features
}

// Check for touch support
if ('ontouchstart' in window) {
    // Enable touch-specific UI
}
```

---

## Next Steps

**Learn more:**
- [Handle User Input](./handle-input) - Cross-platform input handling
- [XR Development](/docs/how-to-guides/xr/) - VR and AR experiences
- [Optimization Guide](/docs/how-to-guides/optimization/) - Platform-specific optimizations

**Reference:**
- [DeviceUtilities API Documentation](https://engine.needle.tools/docs/api/DeviceUtilities) - Complete API reference
- [Utility Functions Reference](/docs/reference/api/utilities) - Complete utilities API
- [Component Reference](/docs/reference/components) - All built-in components
