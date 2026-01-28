---
title: Create Scroll-Based Animations (ScrollFollow)
description: Link scroll position to timelines, animations, and 3D objects to create immersive scrollytelling experiences. Works in Unity and Blender.
---

# Create Scroll-Based Animations

Drive timelines, animations, and object properties with page scroll position to create engaging narrative experiences.

<video-embed src="/docs/videos/scrolltimeline-viewbox-demo.mp4" autoplay muted />

**[View Live Demo →](https://scrollytelling-bike-z23hmxb2gnu5a.needle.run/)**

:::tip Works with Unity and Blender
The ScrollFollow component is available for both Unity and Blender integrations.
:::

## What You Can Do

- **Timeline Scrubbing** - Control Unity Timeline playback with scroll position
- **Animator Control** - Drive animation state machines based on scroll
- **Audio Playback** - Sync audio to scroll position for narrated experiences
- **Object Movement** - Move 3D objects vertically as users scroll
- **Spline Following** - Control camera paths along splines
- **Light Intensity** - Fade lights in/out based on scroll
- **Custom Properties** - Drive any property with scroll values

Perfect for:
- Product storytelling and reveals
- Interactive tutorials and guides
- Narrative-driven experiences
- Portfolio showcases
- Educational content
- Marketing campaigns

## Quick Start

### Basic Timeline Setup

**In Unity or Blender:**
1. Create a Timeline with your animations and camera movements
2. Add a `PlayableDirector` component to control the timeline
3. Add a `ScrollFollow` component to the same GameObject
4. Assign the **PlayableDirector** to ScrollFollow's **Target** property
5. Export and scroll - your timeline now scrubs with the page!

### With HTML Markers

For precise control over timeline sections, add markers in your HTML:

```html
<div data-timeline-marker="0.0">Introduction</div>
<div data-timeline-marker="0.5">Product Features</div>
<div data-timeline-marker="1.0">Call to Action</div>
```

The timeline will smoothly transition between these markers as they scroll into view.

## Settings

| Setting | What it does |
| --- | --- |
| **Target** | Object(s) to control with scroll (see supported types below) |
| **Damping** | Smoothness of scroll response (0 = instant, higher = smoother) |
| **Invert** | Reverse scroll direction (scrolling down = value decreases) |
| **HTML Selector** | CSS selector for custom scroll container (experimental) |
| **Changed** | Event fired when scroll position changes |

## Supported Target Types

The ScrollFollow component can drive many different component types:

### PlayableDirector (Timeline)
Scrubs timeline playback based on scroll position. Use with HTML markers for section-based control.

**How it works:**
- Scroll position maps to timeline time (0 = start, 1 = end)
- Timeline markers can be linked to HTML elements
- Automatically pauses and evaluates timeline

### Animator
Sets a float parameter named `"scroll"` on the Animator component.

**How to use:**
1. Create a float parameter named `"scroll"` in your Animator
2. Create transitions based on this parameter
3. Assign the Animator to ScrollFollow's target

### Animation
Controls animation playback time directly.

**How it works:**
- Scroll position maps to animation time
- 0 = animation start, 1 = animation end

### AudioSource
Scrubs audio playback position based on scroll.

**Use cases:**
- Narrated scrolling experiences
- Sound effects tied to visual reveals
- Music synchronized with scroll

### SplineWalker
Moves objects along a spline path as users scroll.

**How it works:**
- Scroll position sets the `position01` property
- Perfect for camera paths and object reveals

### Light
Controls light intensity with scroll position.

**How it works:**
- 0 = light off, 1 = full intensity
- Create fade-in/fade-out effects

### Object3D
Moves objects vertically based on scroll position.

**How it works:**
- Objects move within their bounding box height
- Natural parallax-like movement

### Custom Objects
Any object with a `scroll` property (number or function) can be controlled.

**Example:**
```ts
export class CustomScrollTarget extends Behaviour {
    scroll: number = 0; // Will be set by ScrollFollow

    update() {
        // Use this.scroll (0-1 value) for custom behavior
        this.gameObject.scale.setScalar(this.scroll);
    }
}
```

## Examples

### Product Reveal Timeline

Create a scrolling product showcase:

<video-embed src="/docs/videos/product-scrollytelling.mp4" autoplay muted />

**[View Live Example →](https://engine.needle.tools/samples/product-scrollytelling)**

1. Set up a Timeline with:
   - Camera animations revealing product details
   - Product rotation and zoom
   - UI elements appearing at key moments
2. Add `PlayableDirector` and `ScrollFollow` components
3. Add HTML markers for each section:
```html
<div data-timeline-marker="0.0">
  <h2>Introducing the Product</h2>
</div>
<div data-timeline-marker="0.33">
  <h2>Premium Materials</h2>
</div>
<div data-timeline-marker="0.66">
  <h2>Advanced Features</h2>
</div>
<div data-timeline-marker="1.0">
  <h2>Order Now</h2>
</div>
```

### Animator-Based Scroll

Control animation states with scroll:

1. Create an Animator with a float parameter `"scroll"`
2. Set up animation states and transitions:
   - State 1: "Idle" (scroll < 0.3)
   - State 2: "Opening" (scroll 0.3 - 0.7)
   - State 3: "Opened" (scroll > 0.7)
3. Add `ScrollFollow` component
4. Assign the Animator to the target

### Camera Path with Spline

Create a camera that follows a path as users scroll:

1. Create a spline path for your camera
2. Add `SplineWalker` component to the camera
3. Add `ScrollFollow` component
4. Assign the SplineWalker to the target
5. Camera smoothly follows the path based on scroll

### Parallax Object Movement

Create depth with scrolling objects:

1. Add `ScrollFollow` to multiple objects at different depths
2. Assign each object as its own target
3. Adjust **Damping** differently for each layer
4. Objects move at different speeds creating parallax

## Scripting

### Listen to Scroll Changes

React to scroll position changes in your code:

```ts
import { Behaviour, ScrollFollow, serializable } from "@needle-tools/engine";

export class ScrollListener extends Behaviour {

    @serializable(ScrollFollow)
    scrollFollow?: ScrollFollow;

    start() {
        this.scrollFollow?.changed.addEventListener((evt) => {
            console.log("Scroll value:", evt.value);

            // Prevent default scroll handling if needed
            if (evt.value > 0.5) {
                evt.preventDefault();
            }
        });
    }
}
```

### Get Current Scroll Value

Access the current scroll position:

```ts
import { Behaviour, ScrollFollow, serializable } from "@needle-tools/engine";

export class ScrollReader extends Behaviour {

    @serializable(ScrollFollow)
    scrollFollow?: ScrollFollow;

    update() {
        if (this.scrollFollow) {
            const value = this.scrollFollow.currentValue;
            // value is 0-1, where 0 = top, 1 = bottom

            if (value > 0.8) {
                console.log("Near bottom of page!");
            }
        }
    }
}
```

### Custom Scroll Target

Create components that respond to scroll:

```ts
import { Behaviour } from "@needle-tools/engine";

export class FadeOnScroll extends Behaviour {

    // ScrollFollow will set this property
    scroll(value: number) {
        // Fade object based on scroll position
        const material = this.gameObject.getComponent(Renderer)?.sharedMaterial;
        if (material) {
            material.opacity = value;
            material.transparent = true;
        }
    }
}
```

### Multiple Targets

Drive multiple components with one ScrollFollow:

```ts
import { Behaviour, ScrollFollow, PlayableDirector, Light } from "@needle-tools/engine";

export class ScrollSetup extends Behaviour {

    start() {
        const scrollFollow = this.gameObject.addComponent(ScrollFollow);

        // Control multiple targets at once
        scrollFollow.target = [
            this.gameObject.getComponent(PlayableDirector)!,
            this.gameObject.findByName("MainLight")!.getComponent(Light)!,
        ];

        scrollFollow.damping = 0.3; // Smooth scrolling
    }
}
```

## Timeline Markers

Timeline markers provide precise control over scroll-based storytelling:

### Unity Timeline Markers

In Unity, add custom markers to your Timeline:

1. Create a Timeline asset
2. Add markers at key moments
3. Name them descriptively
4. ScrollFollow automatically links them to HTML elements by index

### HTML Markers

Define scroll points in your HTML with `data-timeline-marker`:

```html
<!-- Normalized time values (0.0 to 1.0) -->
<section data-timeline-marker="0.0">
  <h1>Start</h1>
  <p>Beginning of the experience</p>
</section>

<section data-timeline-marker="0.25">
  <h2>First Feature</h2>
  <p>Description appears here</p>
</section>

<section data-timeline-marker="0.5">
  <h2>Second Feature</h2>
  <p>More content</p>
</section>

<section data-timeline-marker="1.0">
  <h2>Conclusion</h2>
  <p>End of timeline</p>
</section>
```

### How Markers Work

- Each marker corresponds to a time in your timeline
- When a marker's HTML element is in view, the timeline scrubs to that time
- Smooth blending occurs between visible markers
- Timeline stays at a marker until the next one comes into view

## Advanced Features

### Scroll Damping

Control how smoothly the scroll responds:

- **Damping = 0**: Instant response (timeline/animation jumps to scroll position)
- **Damping = 0.1-0.3**: Responsive with slight smoothing
- **Damping = 0.5-1.0**: Very smooth, floaty response
- **Higher values**: Increasingly laggy, cinematic feel

Perfect for:
- Low damping: Precise control, interactive experiences
- High damping: Cinematic reveals, smooth storytelling

### Inverted Scroll

Set **Invert** to `true` to reverse scroll behavior:
- Scrolling down decreases the value (1 → 0)
- Scrolling up increases the value (0 → 1)

Use cases:
- Objects that should descend as you scroll down
- Reverse-narrative experiences
- Custom scroll behaviors

### Custom Scroll Container

Use **HTML Selector** to scroll within a specific element instead of the whole page:

```ts
scrollFollow.htmlSelector = "#my-scroll-container";
```

```html
<div id="my-scroll-container" style="height: 100vh; overflow-y: auto;">
  <!-- Your scrollable content -->
</div>
```

:::warning Experimental Feature
Custom scroll containers are experimental and may change in future updates.
:::

## Responsive Design Tips

### Page Structure

For best results, structure your HTML for clear sections:

```html
<div class="scroll-container">
  <section data-timeline-marker="0.0" class="full-height">
    <h1>Section 1</h1>
  </section>

  <section data-timeline-marker="0.5" class="full-height">
    <h1>Section 2</h1>
  </section>

  <section data-timeline-marker="1.0" class="full-height">
    <h1>Section 3</h1>
  </section>
</div>
```

```css
.full-height {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Mobile Considerations

- Test scroll behavior on mobile devices
- Adjust damping for touch scrolling (often needs lower values)
- Ensure timeline markers are clearly visible
- Consider longer sections on mobile for easier viewing

### Performance

- Use timeline scrubbing instead of real-time animation for better performance
- Limit the number of active ScrollFollow components
- Consider disabling ScrollFollow on low-performance devices
- Use `?debugscroll` URL parameter to monitor performance

## Common Questions

**How do I make the timeline stay at a specific point longer?**  
Add multiple HTML markers with the same timeline time value, or make the HTML section taller.

**Can I control multiple timelines with one ScrollFollow?**  
Yes! Add multiple PlayableDirector components to the target array.

**Why isn't my timeline moving smoothly?**  
Check that your Timeline has enough keyframes, and consider increasing the damping value.

**How do I sync HTML content with timeline events?**  
Use timeline markers that correspond to `data-timeline-marker` elements. When those elements are in view, the timeline will be at that point.

**Can I use this with page scrolling libraries?**  
Yes, ScrollFollow works with most scrolling libraries. For custom scroll containers, use the **htmlSelector** property.

**Does it work on mobile?**  
Yes! ScrollFollow supports touch scrolling on mobile devices.

**How do I debug scroll issues?**  
Add `?debugscroll` to your URL to see detailed logging:
```
http://localhost:3000?debugscroll
```

## Debugging

Enable debug mode by adding `?debugscroll` to your URL:

```
http://localhost:3000?debugscroll
```

This shows:
- Current scroll value and percentage
- Number of active targets
- Timeline marker information and weights
- Scroll position calculations

## More Information

**Live Examples:**
- [Product Scrollytelling](https://engine.needle.tools/samples/product-scrollytelling) - Interactive product reveal
- [Bike Scrollytelling Demo](https://scrollytelling-bike-z23hmxb2gnu5a.needle.run/) - Product showcase
- [Scrollytelling Template](https://github.com/needle-engine/scrollytelling-template) - Starter template
- [Bike Demo Repository](https://github.com/needle-engine/needle-engine-bike-scrollytelling) - Complete source code

**API Documentation:**
- [ScrollFollow API](https://engine.needle.tools/docs/api/ScrollFollow) - Complete technical reference

**Related Components:**
- [PlayableDirector](/docs/reference/components#playabledirector) - Timeline control
- [Animator](/docs/reference/components#animator) - Animation state machines
- [SplineWalker](/docs/reference/components#splinewalker) - Spline path following
