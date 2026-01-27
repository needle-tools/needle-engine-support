---
title: XR Event Methods
description: Reference for WebXR AR/VR events
---

# XR Event Methods

Build immersive AR/VR experiences with WebXR event methods.

---

## Component XR Events

| Method | Parameters | When Called |
| --- | --- | --- |
| `supportsXR` | `mode: XRSessionMode` | **Optional:** Filter which XR modes to support (`immersive-vr`, `immersive-ar`) |
| `onBeforeXR` | `mode: XRSessionMode`<br/>`init: XRSessionInit` | Before XR session starts (modify init options) |
| `onEnterXR` | `args: NeedleXREventArgs` | Component **enters** XR session |
| `onUpdateXR` | `args: NeedleXREventArgs` | Every frame **during** XR session |
| `onLeaveXR` | `args: NeedleXREventArgs` | Component **exits** XR session |
| `onControllerAdded` | `args: NeedleXRControllerEventArgs` | VR controller **connected** or component joins session with controllers |
| `onControllerRemoved` | `args: NeedleXRControllerEventArgs` | VR controller **disconnected** or component becomes inactive |

---

## XR Session Modes

```ts
type XRSessionMode =
    | "immersive-vr"  // VR headset
    | "immersive-ar"  // AR device
    | "inline";       // Non-immersive (not commonly used)
```

---

## Example: Filter XR Support

Only enable component for VR (not AR):

```ts
import { Behaviour, XRSessionMode } from "@needle-tools/engine";

export class VROnlyComponent extends Behaviour {
    supportsXR(mode: XRSessionMode): boolean {
        // Only activate in VR sessions
        return mode === "immersive-vr";
    }

    onEnterXR(args: NeedleXREventArgs) {
        console.log("Entered VR mode");
    }
}
```

---

## Example: XR Session Lifecycle

```ts
import { Behaviour, NeedleXREventArgs } from "@needle-tools/engine";

export class XRLifecycle extends Behaviour {
    onEnterXR(args: NeedleXREventArgs) {
        console.log("Entered XR session", args.xr.session);
        this.enableVRUI();
    }

    onUpdateXR(args: NeedleXREventArgs) {
        // Called every frame in XR
        this.updateVRControls();
    }

    onLeaveXR(args: NeedleXREventArgs) {
        console.log("Exited XR session");
        this.disableVRUI();
    }

    private enableVRUI() {
        // Show VR-specific UI
    }

    private updateVRControls() {
        // Update VR interaction every frame
    }

    private disableVRUI() {
        // Hide VR UI
    }
}
```

---

## Example: VR Controller Events

```ts
import { Behaviour, NeedleXRControllerEventArgs } from "@needle-tools/engine";

export class VRControllerHandler extends Behaviour {
    onControllerAdded(args: NeedleXRControllerEventArgs) {
        console.log("Controller connected:", args.controller);

        // Access controller model
        const model = args.controller.controllerModel;

        // Check handedness
        if (args.controller.handedness === "left") {
            this.setupLeftController(args.controller);
        } else {
            this.setupRightController(args.controller);
        }
    }

    onControllerRemoved(args: NeedleXRControllerEventArgs) {
        console.log("Controller disconnected:", args.controller);
    }

    private setupLeftController(controller) {
        // Configure left controller
    }

    private setupRightController(controller) {
        // Configure right controller
    }
}
```

---

## Global XR Events

For global XR session events (outside components):

| Event | Type | Description |
| --- | --- | --- |
| `"needle-xrsession-start"` | `CustomEvent` | XR session starts (`details.session` = `NeedleXRSession`) |
| `"needle-xrsession-end"` | `CustomEvent` | XR session ends (`details.session` = `NeedleXRSession`) |
| `onXRSessionStart` | Hook | Global hook for session start (unsubscribe with `offXRSessionStart`) |

---

## Example: Global XR Events

```ts
// Using CustomEvent
window.addEventListener("needle-xrsession-start", (evt) => {
    console.log("XR Session started:", evt.detail.session);
});

// Using global hook
import { onXRSessionStart } from "@needle-tools/engine";

onXRSessionStart((args) => {
    console.log("XR Session started:", args.session);
});
```

---

## Modify XR Session Init Options

```ts
import { Behaviour, XRSessionMode } from "@needle-tools/engine";

export class XRSessionConfig extends Behaviour {
    onBeforeXR(mode: XRSessionMode, init: XRSessionInit) {
        // Request specific features
        if (mode === "immersive-ar") {
            init.requiredFeatures = ["hit-test", "anchors"];
            init.optionalFeatures = ["hand-tracking"];
        }
    }
}
```

---

## Related

- [XR Guide](/docs/how-to-guides/xr/) - Set up WebXR
- [Image Tracking](/docs/how-to-guides/xr/image-tracking) - AR image tracking
- [Lifecycle Methods](/docs/reference/api/lifecycle-methods) - Component lifecycle
