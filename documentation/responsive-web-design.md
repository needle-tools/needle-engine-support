# Responsive Web Design

## Focus Rect
The main purpose of FocusRect is to make your website responsive and ensure the 3D element is always adjusting to the available space. The 3D content moves dynamic with the your existing HTML layout.

### How to use Focus Rect

Set the element you like to focus on simply by querying an HTML element on your website. You then set this element using the method: ```context.setCameraFocusRect(<element>)```.

For example `onStart` hook in your Needle Engine code (e.g., in main.ts) to query the FocusRect element and pass it to the camera.

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



### Video Tutorial

This tutorial shows the Focus Rec workflow in action:

<video-embed src="https://www.youtube.com/watch?v=YAPInggEIg8" limit_height />  
