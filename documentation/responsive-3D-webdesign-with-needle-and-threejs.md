---
description: "Creating responsive 3D websites doesn't have to be complicated. This site offers practical solutions and techniques on how to seamlessly and responsively integrate 3D content into your existing web layout, specifically using three.js and the Needle Engine."
---

# Responsive 3D Webdesign

## Focus Rect
The main purpose of FocusRect is to make your website responsive and ensure the 3D element is always adjusting to the available space. The 3D content moves dynamic with your existing HTML layout.

### How to use Focus Rect

Set the element you like to focus on simply by querying an HTML element on your website. You then set this element using the method: [```context.setCameraFocusRect(<element>)```](https://engine.needle.tools/docs/api/classes/Engine_Core.Context.html#setcamerafocusrect).

For example `onStart` [hook](/scripting.md#hooks) in your Needle Engine code (e.g., in main.ts) to query the FocusRect element and pass it to the camera.

```ts twoslash
import "@needle-tools/engine";
import {onStart} from "@needle-tools/engine";

onStart((ctx)=>{
    const div = document.querySelector(".focus_rect");
    if(div){
        ctx.setCameraFocusRect(div);
    }
})
```

[View needle-engine attributes for more](/reference/needle-engine-attributes.md)

### Links to Samples
[Demo Webpage Sword and Shield](https://portfolio-header-demo-z23hmxb19zenk-19zenk.needle.run/)

[Demo Webpage Bike](https://focus-rect-demo-z23hmxbztexgt-z19e07i.needle.run/)


### Video Tutorial

This tutorial shows the Focus Rect workflow in action:

<video-embed src="https://www.youtube.com/watch?v=YAPInggEIg8" limit_height />

## ViewBox

[ViewBox](https://engine.needle.tools/docs/api/classes/Built-in_Components.ViewBox.html) can be used to automatically fit a certain box area into the camera view - no matter your screen size or aspect ratio.

This component can be used to automatically fit a certain box area into the camera view - no matter your screen size or aspect ratio.
This is useful for example to frame a character or object in the center of the screen and ensure it is always fully visible. You can also animate or scale the viewbox to create zoom or framing effects.

### Video

<video-embed src="https://www.youtube.com/watch?v=Dn9lmWy3Vak" limit_height/>

<video-embed src="https://www.youtube.com/watch?v=-YKKoYRIrtg" limit_height/>

### Links to Samples

[Example on needle.run](https://viewbox-demo-z23hmxbz2gkayo-z1nyzm6.needle.run/)

[Scrollytelling Demo using animated Viewbox](https://scrollytelling-bike-z23hmxb2gnu5a.needle.run/)

[Example on Stackblitz](https://stackblitz.com/edit/needle-engine-view-box-example?file=README.md)