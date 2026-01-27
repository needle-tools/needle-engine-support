---
description: "Learn how to create responsive 3D websites that adapt to any screen size using Focus Rect and ViewBox features"
---

# Create Responsive 3D Layouts

This guide shows you how to build responsive 3D websites that adapt seamlessly to different screen sizes and aspect ratios. Whether you're building a portfolio, product showcase, or interactive experience, Needle Engine provides powerful tools to ensure your 3D content looks great on every device.

## Overview

Needle Engine offers two complementary approaches for responsive 3D design:

- **Focus Rect** - Adjusts the camera center based on your HTML layout
- **ViewBox** - Automatically frames specific 3D content in the view

Both can be used independently or combined for maximum flexibility.

---

## Method 1: Focus Rect

Focus Rect allows you to control the camera's focal point by linking it to HTML elements in your page layout. As your page layout responds to different screen sizes, the 3D camera automatically adjusts to keep the right content in view.

### When to Use Focus Rect

**Perfect for:**
- Portfolio websites with side-by-side text and 3D content
- Product showcases where UI elements frame the 3D view
- Landing pages with asymmetric layouts
- Any design where the 3D scene should respond to page structure

**Best for:** Layouts where you want the camera to follow your page design rather than the 3D content itself.

### How Focus Rect Works

Focus Rect uses CSS positioning to determine where the camera should point. You specify an HTML element (like a `<div>`), and Needle Engine:
1. Calculates the element's screen position
2. Adjusts the camera to center on that position
3. Updates automatically when the window resizes

### Setup with Code

Add this to your Needle Engine code (e.g., in `main.ts`):

```ts twoslash
import "@needle-tools/engine";
import { onStart } from "@needle-tools/engine";

onStart((ctx) => {
    const focusElement = document.querySelector(".focus-area");
    if (focusElement) {
        ctx.setCameraFocusRect(focusElement);
    }
})
```

Then create the HTML element to focus on:

```html
<div class="focus-area" style="
    position: absolute;
    left: 20%;
    top: 30%;
    width: 40%;
    height: 40%;
"></div>
```

::: tip No-Code Alternative
You can also use [HTML attributes](/docs/reference/needle-engine-attributes) to set focus rect without writing code. Add `focus-rect=".focus-area"` to your `<needle-engine>` element.
:::

### Dynamic Focus Changes

You can change the focus rect at runtime to create smooth camera transitions:

```ts
import { Context } from "@needle-tools/engine";

// Switch to a different focus area
function changeFocus(newElementSelector: string) {
    const newElement = document.querySelector(newElementSelector);
    if (newElement) {
        Context.Current.setCameraFocusRect(newElement);
    }
}

// Clear the focus rect to return to default view
function clearFocus() {
    Context.Current.setCameraFocusRect(null);
}
```

### Real-World Examples

**Portfolio Header:**

<sample src="https://portfolio-header-demo-z23hmxb19zenk-19zenk.needle.run/" />

[Open in new tab](https://portfolio-header-demo-z23hmxb19zenk-19zenk.needle.run/)

**Product Showcase:**

<sample src="https://focus-rect-demo-z23hmxbztexgt-z19e07i.needle.run/" />

[Open in new tab](https://focus-rect-demo-z23hmxbztexgt-z19e07i.needle.run/)

### Video Tutorial

<video-embed src="https://www.youtube.com/watch?v=YAPInggEIg8" limit_height />

---

## Method 2: ViewBox

The [ViewBox component](https://engine.needle.tools/docs/api/classes/Built-in_Components.ViewBox.html) defines a 3D bounding box that should always be visible in the camera view. Needle Engine automatically adjusts the camera framing to fit this box, regardless of screen size or aspect ratio.

### When to Use ViewBox

**Perfect for:**
- Character viewers that must show the full character
- Product configurators where the product should always be visible
- Scenes that need guaranteed content framing
- Apps that need to support both mobile (portrait) and desktop (landscape)

**Best for:** Ensuring specific 3D content is always properly framed, regardless of device.

### How ViewBox Works

ViewBox creates an invisible bounding box in your 3D scene. The camera automatically:
1. Adjusts its field of view or distance
2. Ensures the entire box is visible
3. Adapts to different screen aspect ratios
4. Maintains proper framing as you resize the window

### Setup in Unity

1. **Add the Component**
   - Create an empty GameObject in your scene
   - Add the `ViewBox` component from Needle Engine

2. **Position and Scale**
   - Position the GameObject to center on your content
   - Scale it to encompass everything you want visible
   - The box is only visible in the editor, not at runtime

3. **Test Different Aspect Ratios**
   - Preview your scene in Unity
   - Try different Game view aspect ratios
   - The ViewBox ensures your content stays framed

### Setup in Blender

1. **Add the Component**
   - Select an Empty object or create one
   - Add the `ViewBox` component in the Needle Engine panel

2. **Adjust the Bounds**
   - Scale the empty to frame your content
   - Use the viewport to visualize the bounds
   - Test with different viewport sizes

### Animated ViewBox

You can animate or scale the ViewBox to create dynamic effects:

```ts
import { Behaviour, serializable } from "@needle-tools/engine";
import { ViewBox } from "@needle-tools/engine";

export class AnimatedFraming extends Behaviour {

    @serializable(ViewBox)
    viewBox?: ViewBox;

    zoomIn() {
        if (!this.viewBox) return;
        // Smoothly scale the viewbox
        this.startCoroutine(this.animateScale(0.5, 1.0)); // zoom in
    }

    *animateScale(targetScale: number, duration: number) {
        const startScale = this.viewBox!.gameObject.scale.clone();
        let time = 0;

        while (time < duration) {
            time += this.context.time.deltaTime;
            const t = Math.min(time / duration, 1);
            const scale = startScale.lerp(targetScale, t);
            this.viewBox!.gameObject.scale.copy(scale);
            yield;
        }
    }
}
```

### Real-World Examples

#### 3D Bike Example

Note: The yellow box is the Viewbox Gizmo and only enabled for visualization purposes.

<sample src="https://viewbox-demo-z23hmxbz2gkayo-z1nyzm6.needle.run/" />

[Open in new tab](https://viewbox-demo-z23hmxbz2gkayo-z1nyzm6.needle.run/)

**Scrollytelling Experience:**

<sample src="https://scrollytelling-bike-z23hmxb2gnu5a.needle.run/" />

[Open in new tab](https://scrollytelling-bike-z23hmxb2gnu5a.needle.run/)

#### Interactive Example

[Editable Demo on Stackblitz](https://stackblitz.com/edit/needle-engine-view-box-example?file=README.md)

### Video Tutorials

**ViewBox Basics:**

<video-embed src="https://www.youtube.com/watch?v=Dn9lmWy3Vak" limit_height />

**Advanced ViewBox Techniques:**

<video-embed src="https://www.youtube.com/watch?v=-YKKoYRIrtg" limit_height />

---

## Combining Focus Rect and ViewBox

For maximum control over responsive design, use both techniques together:

**ViewBox** handles the 3D content framing:
- Ensures your character/product is always visible
- Adapts to different aspect ratios automatically
- Maintains proper scale across devices

**Focus Rect** handles the page layout:
- Centers the camera based on your UI design
- Responds to asymmetric page layouts
- Creates visual harmony between 2D and 3D

### Example: Portfolio Hero Section

```ts
import { onStart } from "@needle-tools/engine";

onStart((ctx) => {
    // Set focus rect for layout responsiveness
    const heroSection = document.querySelector(".hero-content");
    if (heroSection) {
        ctx.setCameraFocusRect(heroSection);
    }

    // ViewBox (added in Unity/Blender) ensures the character stays framed
    // Both work together for perfect responsiveness
});
```

This combination ensures:
- ✅ Your 3D content is always properly framed (ViewBox)
- ✅ The camera centers on the right part of the screen (Focus Rect)
- ✅ Everything adapts to any device or window size

---

## Best Practices

### Performance

- **Focus Rect** is lightweight and updates only on window resize
- **ViewBox** recalculates camera position every frame
- For static scenes, consider disabling ViewBox after initial framing

### Testing

Always test your responsive design on:
- 📱 Mobile portrait (9:16 or similar)
- 📱 Mobile landscape (16:9)
- 💻 Desktop (16:9, 16:10, 21:9)
- 🖥️ Ultra-wide monitors

### Common Pitfalls

**Focus Rect:**
- ❌ Don't use on elements that change size frequently
- ❌ Avoid tiny focus areas (camera may shake)
- ✅ Use stable, well-defined layout elements

**ViewBox:**
- ❌ Don't make it too tight (content may clip)
- ❌ Avoid very different aspect ratios in one box
- ✅ Leave some padding around your content

---

## Troubleshooting

**Camera doesn't follow focus rect:**
- Check that the element exists in the DOM
- Verify the element has actual dimensions (not `display: none`)
- Ensure you're calling `setCameraFocusRect` after the page loads

**ViewBox doesn't work:**
- Make sure the ViewBox component is active in your scene
- Check that the ViewBox isn't too small or collapsed
- Verify the camera has the ViewBox component reference

**Content is cut off:**
- Increase the ViewBox size to add padding
- Check if other camera constraints are interfering
- Test with different aspect ratios to find the issue

---

## Next Steps

- **Learn the APIs:** [Context API Reference](https://engine.needle.tools/docs/api/classes/Engine_Core.Context.html)
- **Master Components:** [ViewBox Component Reference](https://engine.needle.tools/docs/api/classes/Built-in_Components.ViewBox.html)
- **Web Attributes:** [HTML attributes for configuration](/docs/reference/needle-engine-attributes)
- **Dynamic Behavior:** [Lifecycle hooks for runtime changes](/docs/how-to-guides/scripting/use-lifecycle-hooks)
- **Web Integration:** [Frameworks, Bundlers & More](/docs/how-to-guides/web-integration/)
- **Deployment:** [Deploy your responsive site](/docs/how-to-guides/deployment/)
