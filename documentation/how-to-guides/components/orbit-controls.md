---
title: Camera Controls (OrbitControls)
description: The core camera controller for interactive 3D experiences. Rotate, pan, and zoom around your scene with mouse, touch, and keyboard. Works in Unity and Blender.
---

# Camera Controls (OrbitControls)

The primary camera controller for navigating and exploring 3D scenes with intuitive mouse, touch, and keyboard controls.

<video-embed src="/docs/videos/orbitcontrols-1.mp4" autoplay muted />

:::tip Works with Unity and Blender
The OrbitControls component is available for both Unity and Blender integrations.
:::

## What You Can Do

- **Rotate** - Orbit around objects by dragging
- **Pan** - Move the camera side-to-side (right-click drag or two-finger touch)
- **Zoom** - Scroll to zoom in/out
- **Auto-Rotate** - Automatically rotate the camera around the scene
- **Auto-Fit** - Automatically frame the entire scene
- **Focus on Click** - Double-click objects to focus on them
- **Smooth Animations** - Animate camera movements programmatically

Perfect for:
- Product showcases and configurators
- Architectural visualizations
- Interactive 3D models
- Any scene requiring camera control
- All Needle Engine projects (it's the default!)

## Quick Start

### Default Behavior

OrbitControls is typically added automatically to your camera in Unity or Blender. Just export and you're ready to go!

**Controls:**
- **Left-click drag** - Rotate around the scene
- **Right-click drag** or **Two-finger touch** - Pan the camera
- **Mouse wheel** or **Pinch** - Zoom in/out
- **Double-click** - Focus on the clicked object

### Adding Manually

**In Unity or Blender:**
1. Select your camera object
2. Add the `OrbitControls` component
3. Export - camera controls are now active!

## Core Features

### Auto-Rotate

<video-embed src="/docs/videos/orbitcontrols-autorotate.mp4" autoplay muted />

Automatically rotate the camera for presentations:

**In Editor:**
1. Enable **Auto Rotate** on the OrbitControls component
2. Set **Auto Rotate Speed** (default is `1.0`)
3. The camera rotates automatically - any user interaction stops it

**From Code:**
```ts
import { Behaviour, OrbitControls } from "@needle-tools/engine";

export class AutoRotateExample extends Behaviour {
    start() {
        const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);
        if (orbit) {
            orbit.autoRotate = true;
            orbit.autoRotateSpeed = 2.0; // Rotate twice as fast
        }
    }
}
```

### Auto-Fit to Scene

<video-embed src="/docs/videos/orbitcontrols-autofit.mp4" autoplay muted />

Automatically frame the entire scene when it loads or when users click the background:

**In Editor:**
- Enable **Auto Fit** - Camera frames all objects on start
- Set **Click Background To Fit Scene** - Number of clicks on background to re-fit (default: `2`)

Users can double-click the background at any time to re-fit the camera to the entire scene.

**From Code:**
```ts
const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);
orbit?.fitCamera(); // Fit entire scene
```

### Focus on Objects

Users can double-click objects to focus the camera on them. Configure this behavior:

| Setting | What it does | Default |
| --- | --- | --- |
| **Double Click To Focus** | Focus on object when double-clicked | `true` |
| **Middle Click To Focus** | Focus on object when middle-clicked | `true` |
| **Click Background To Fit Scene** | Number of clicks on background to fit entire scene | `2` |

## Settings

### Rotation Controls

| Setting | What it does | Default |
| --- | --- | --- |
| **Enable Rotate** | Allow camera rotation | `true` |
| **Auto Rotate** | Automatically rotate camera | `false` |
| **Auto Rotate Speed** | Rotation speed when auto-rotating | `1.0` |
| **Min Azimuth Angle** | Minimum horizontal rotation (radians) | `Infinity` (no limit) |
| **Max Azimuth Angle** | Maximum horizontal rotation (radians) | `Infinity` (no limit) |
| **Min Polar Angle** | Minimum vertical rotation (radians) | `0` |
| **Max Polar Angle** | Maximum vertical rotation (radians) | `Math.PI` |

### Zoom Controls

| Setting | What it does | Default |
| --- | --- | --- |
| **Enable Zoom** | Allow zooming | `true` |
| **Zoom Speed** | How fast zooming happens | `1` |
| **Zoom To Cursor** | Zoom toward cursor position instead of center | `false` |
| **Min Zoom** | Minimum zoom distance | `0` |
| **Max Zoom** | Maximum zoom distance | `Infinity` |

### Pan Controls

| Setting | What it does | Default |
| --- | --- | --- |
| **Enable Pan** | Allow panning | `true` |

### Movement Feel

| Setting | What it does | Default |
| --- | --- | --- |
| **Enable Damping** | Smooth, inertial movement | `true` |
| **Damping Factor** | How much damping (lower = more smooth) | `0.1` |
| **Enable Keys** | Allow keyboard controls | `false` |

### Behavior

| Setting | What it does | Default |
| --- | --- | --- |
| **Auto Target** | Automatically find focus point | `true` |
| **Auto Fit** | Fit scene to view on start | `false` |
| **Allow Interrupt** | User input stops animations | `true` |
| **Target Lerp Duration** | Animation duration in seconds | `1` |


## Examples

### Product Viewer

Create a product showcase that auto-rotates until touched:

```ts
import { Behaviour, OrbitControls } from "@needle-tools/engine";

export class ProductViewer extends Behaviour {

    start() {
        const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);

        if (orbit) {
            // Auto-rotate the product
            orbit.autoRotate = true;
            orbit.autoRotateSpeed = 0.5;

            // Fit the product in view
            orbit.fitCamera();

            // Stop rotation when user interacts
            orbit.onStartInteraction(() => {
                orbit.autoRotate = false;
            });
        }
    }
}
```

### Restrict Camera Movement

Limit rotation to prevent users from seeing under/behind objects:

```ts
import { Mathf, OrbitControls } from "@needle-tools/engine";

// In your component
const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);

if (orbit) {
    // Prevent looking directly up or down
    orbit.minPolarAngle = Mathf.toRadians(30);  // 30 degrees from top
    orbit.maxPolarAngle = Mathf.toRadians(80);  // 80 degrees from top

    // Limit horizontal rotation
    orbit.minAzimuthAngle = Mathf.toRadians(-45);  // -45 degrees
    orbit.maxAzimuthAngle = Mathf.toRadians(45);   // +45 degrees
}
```

### Animate Camera to Position


<video-embed src="/docs/videos/orbitcontrols-setcamera-and-looktarget.mp4" autoplay muted />



Smoothly move camera to look at a specific object:

```ts
import { Behaviour, OrbitControls, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

export class FocusObject extends Behaviour {

    @serializable(Object3D)
    targetObject?: Object3D;

    focusOnTarget() {
        const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);

        if (orbit && this.targetObject) {
            // Animate camera to look at the target
            orbit.setCameraAndLookTarget(this.targetObject);

            // Or set positions separately:
            // orbit.setLookTargetPosition(this.targetObject.worldPosition);
            // orbit.setCameraTargetPosition(cameraPosition);
        }
    }
}
```

### Fit Specific Objects

Frame specific objects instead of the whole scene:

```ts
import { Behaviour, OrbitControls } from "@needle-tools/engine";
import { Object3D } from "three";

export class FitObjects extends Behaviour {

    fitToObjects(objects: Object3D[]) {
        const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);

        if (orbit) {
            orbit.fitCamera({
                objects: objects,
                immediate: false, // Animate to the new view
            });
        }
    }
}
```

### Keyboard Controls

Enable keyboard navigation:

```ts
const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);

if (orbit) {
    orbit.enableKeys = true;

    // Users can now use:
    // Arrow keys - Pan camera
    // Default three.js orbit controls keys are used
}
```

## Scripting API

### Camera Movement

```ts
const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);

// Rotate the camera
orbit.rotateLeft(0.1);  // Rotate left in radians
orbit.rotateUp(-0.1);   // Rotate down in radians

// Pan the camera
orbit.pan(10, 0);  // Pan 10 pixels right

// Zoom
orbit.zoomIn(0.1);   // Zoom in 10%
orbit.zoomIn(-0.1);  // Zoom out 10%
```

### Camera Animations

```ts
const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);

// Animate camera position
orbit.setCameraTargetPosition(newPosition, 2.0); // 2 second duration

// Animate look target
orbit.setLookTargetPosition(targetPosition, 1.5); // 1.5 second duration

// Set immediately (no animation)
orbit.setCameraTargetPosition(newPosition, true);

// Stop ongoing animations
orbit.stopCameraLerp();
orbit.stopLookTargetLerp();

// Check if animating
if (orbit.cameraLerpActive) {
    console.log("Camera is moving...");
}
```

### Field of View

```ts
const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);

// Animate FOV change
orbit.setFieldOfView(60, 1.0); // Change to 60° over 1 second

// Set immediately
orbit.setFieldOfView(45, true);
```

### Fitting Camera

```ts
const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);

// Fit entire scene
orbit.fitCamera();

// Fit specific objects
orbit.fitCamera({
    objects: [object1, object2],
    immediate: false,  // Animate to view
});

// Advanced options
orbit.fitCamera({
    objects: myObjects,
    immediate: false,
    centerCamera: "y",  // Only center on Y axis
    fov: 50,            // Set field of view
});
```

### Access Three.js Controls

```ts
const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);

// Access underlying three.js OrbitControls
const threeControls = orbit.controls;

if (threeControls) {
    // Direct access to three.js properties
    console.log("Distance:", threeControls.getDistance());
    console.log("Azimuth:", threeControls.getAzimuthalAngle());
    console.log("Polar:", threeControls.getPolarAngle());

    // Access the camera being controlled
    console.log("Camera:", orbit.controllerObject);
}
```

### Events

```ts
import { OrbitControls, OrbitControlsEventsType } from "@needle-tools/engine";

const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);

// Listen for user interaction
orbit.onStartInteraction(() => {
    console.log("User started interacting with camera");
});

// Listen for camera target reached
orbit.addEventListener(OrbitControlsEventsType.CameraTargetReached, (evt) => {
    console.log("Camera reached target:", evt.detail.type);
    // evt.detail.type is either "camera" or "lookat"
});
```

## Advanced Features

### Look At Constraints

Make the camera always look at a specific object:

**In Editor:**
1. Create a `LookAtConstraint` component
2. Assign the target object to the constraint
3. Assign the constraint to **Look At Constraint** on OrbitControls

The camera will always look at the constrained object while users control it.

### Target Bounds

Restrict where users can pan the camera:

**In Editor:**
1. Create an empty object to define the bounds
2. Scale it to the desired size
3. Assign it to **Target Bounds** on OrbitControls

Users can only pan within this defined volume.

### Custom Dom Element

Make OrbitControls listen to a different HTML element:

```ts
const orbit = this.context.mainCameraComponent?.getComponent(OrbitControls);

if (orbit) {
    orbit.targetElement = document.getElementById("my-custom-element");
}
```

## Common Questions

**How do I disable camera controls temporarily?**  
Disable the OrbitControls component: `orbit.enabled = false;`

**Can users control the camera in VR/AR?**  
OrbitControls automatically disables in XR mode. Camera control happens through the headset instead.

**Why does auto-rotate stop when I interact?**  
This is default behavior. Auto-rotation resumes only if you re-enable it via script.

**How do I prevent users from seeing under the floor?**  
Set **Min Polar Angle** and **Max Polar Angle** to limit vertical rotation.

**Can I change controls sensitivity?**  
Yes! Adjust **Damping Factor** (lower = smoother), **Zoom Speed**, and **Auto Rotate Speed**.

**How do I focus camera on an object immediately?**  
Use `orbit.setCameraAndLookTarget(targetObject, true);` - the `true` makes it instant.

**Can I use keyboard controls?**  
Enable **Enable Keys** to allow arrow key navigation.

## Performance Tips

**Damping:**
Damping creates smooth motion but requires updates every frame. For static presentations, you can disable it once camera settles.

**Auto-Rotate:**
Auto-rotation updates every frame. Disable when not needed to save performance.

**Manual Updates:**
For very static scenes, consider handling camera control yourself and disabling OrbitControls entirely.

## Debugging

Enable debug mode by adding `?debugorbit` to your URL:

```
http://localhost:3000?debugorbit
```

This shows:
- Camera look target as a green sphere
- Raycast hit points
- Detailed logging of camera operations

**Other debug parameters:**
- `?freecam` - Unlock all camera restrictions
- `?smoothcam` or `?smoothcam=0.95` - Override damping factor
- `?debugcamerafit` - Log camera fitting operations

## More Information

**API Documentation:**
- [OrbitControls API](https://engine.needle.tools/docs/api/OrbitControls) - Complete technical reference
- [three.js OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) - Underlying three.js implementation

**Related Components:**
- [Camera](/docs/reference/components#camera) - Camera component settings
- [LookAtConstraint](/docs/reference/components#lookatconstraint) - Constrain camera look target
