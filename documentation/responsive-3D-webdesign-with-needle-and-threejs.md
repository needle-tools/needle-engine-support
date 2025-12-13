---
description: "Learn how to easily create 3D websites that are responsive on any screen with Needle Engine and three.js"
---

# Responsive 3D Webdesign

Needle Engine offers several building blocks to make building responsive 3d websites easy. Learn how to use and combine Focus Rect and ViewBox features:

## Focus Rect
Use the Needle Engine focus rect feature to adjust the center of your 3D scene using CSS. This is the basic building block for responsive layouts. It can be enabled with one line of code and no changes to your scene are required.  

### Video Tutorial

<video-embed src="https://www.youtube.com/watch?v=YAPInggEIg8" limit_height />

### How to use the Focus Rect

Set the element to focus on by querying an HTML element on your website. You then set this element using the [```setCameraFocusRect(<element>)```](https://engine.needle.tools/docs/api/classes/Engine_Core.Context.html#setcamerafocusrect) method.

For example using the `onStart` [hook](/scripting.md#hooks) in your Needle Engine code (e.g., in main.ts) to query the element and pass it to Needle Engine.

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

### Focus Rect Samples
[Demo Webpage Sword and Shield](https://portfolio-header-demo-z23hmxb19zenk-19zenk.needle.run/)

[Demo Webpage Bike](https://focus-rect-demo-z23hmxbztexgt-z19e07i.needle.run/)



## ViewBox

The [ViewBox](https://engine.needle.tools/docs/api/classes/Built-in_Components.ViewBox.html) can be used to automatically fit a certain box area into the camera view - no matter your screen size or aspect ratio.

This is useful for example to frame a character or object in the center of the screen and ensure it is always fully visible. The Viewbox can also be animated or scaled to create zoom effects or to adjust the visible area.

### ViewBox Video

<video-embed src="https://www.youtube.com/watch?v=Dn9lmWy3Vak" limit_height/>

<video-embed src="https://www.youtube.com/watch?v=-YKKoYRIrtg" limit_height/>

### Links to Samples

[Example on needle.run](https://viewbox-demo-z23hmxbz2gkayo-z1nyzm6.needle.run/)

[Scrollytelling Demo using animated Viewbox](https://scrollytelling-bike-z23hmxb2gnu5a.needle.run/)

[Example on Stackblitz](https://stackblitz.com/edit/needle-engine-view-box-example?file=README.md)
