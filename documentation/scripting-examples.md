# Script Examples

Below you will find a few basic scripts as a quick reference. We also offer a lot of sample scenes and complete projects that you can download and use as a starting point:  
- [Visit Samples Website](https://engine.needle.tools/samples)
- [Download Samples Package](https://engine.needle.tools/downloads/unity/samples)
- [Needle Engine Stackblitz Collection](https://stackblitz.com/@marwie/collections/needle-engine)

## Basic component 
<stackblitz file="@code/basic-component.ts"></stackblitz> 
@[code](@code/basic-component.ts)

see [scripting](scripting#lifecycle-methods) for all component events

## Reference an Object from Unity
@[code](@code/component-object-reference.ts)  

## Reference and load an asset from Unity (Prefab or SceneAsset)
@[code](@code/component-prefab.ts)

## Reference and load scenes from Unity
::: tip
Find a [working example in our samples](https://engine.needle.tools/samples/multi-scenes-(dynamic-loading)) to download and try
:::

@[code](@code/component-scene.ts)

## Receive Clicks on Objects
Add this script to any object in your scene that you want to be clickable. Make sure to also have an `ObjectRaycaster` component in the parent hierarchy of that object.  

<stackblitz file="@code/component-click.ts">
test
</stackblitz> 

@[code](@code/component-click.ts)


## Networking Clicks on Objects

Add this script to any object in your scene that you want to be clickable. Make sure to also have an `ObjectRaycaster` component in the parent hierarchy of that object.   
The component will send the received click to all connected clients and will raise an event that you can then react to in your app. If you are using Unity or Blender you can simply assign functions to call to the `onClick` event to e.g. play an animation or hide objects.

@[code](@code/component-click-networking.ts)

### Play Animation on click
@[code](@code/component-animation-onclick.ts)

## Reference an Animation Clip
This can be useful if you want to run your custom animation logic.   
You can also export an array of clips.
@[code](@code/component-animationclip.ts)


## Create and invoke a UnityEvent

@[code](@code/component-unityevent.ts)
::: tip
EventList events are also invoked on the component level. This means you can also subscribe to the event declared above using ``myComponent.addEventListener("my-event", evt => {...})`` as well.   
This is an experimental feature: please provide feedback in our [discord](https://discord.needle.tools)
:::


### Declare a custom event type
This is useful for when you want to expose an event to Unity or Blender with some custom arguments (like a string)
@[code](@code/component-customevent.ts)

_Example use:_  
![20221128-210735_Unity-needle](https://user-images.githubusercontent.com/2693840/204370950-4c89b877-90d7-4e6f-8266-3352e6da16f4.png)

## Use nested objects and serialization

You can nest objects and their data. With properly matching `@serializable(SomeType)` decorators, the data will be serialized and deserialized into the correct types automatically.  

In your typescript component:  
@[code](@code/component-nested-serialization.ts)

In C# in any script:  
@[code](@code/component-nested-serialization-cs.cs)

::: tip
Without the correct type decorators, you will still get the data, but just as a plain object. This is useful when you're porting components, as you'll have access to all data and can add types as required.
:::

## Use Web APIs
::: tip
Keep in mind that you still have access to all web apis and [npm](https://npmjs.org) packages!    
That's the beauty of Needle Engine if we're allowed to say this here 😊
:::

### Display current location
@[code](@code/component-location.ts) 

### Display current time using a Coroutine
@[code](@code/component-time.ts) 

<video-embed src="./videos/component-time.mp4" limit_height />


## Change custom shader property

Assuming you have a custom shader with a property name `_Speed` that is a float value this is how you would change it from a script.   
You can find a live [example to download in our samples](https://engine.needle.tools/samples/shaders/)

<!-- SAMPLE modify custom shader material property -->


## Switching src attribute

See [live example](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html) on StackBlitz


## Adding new postprocessing effects

Make sure to install [`npm i postprocessing`](https://github.com/pmndrs/postprocessing) in your web project. Then you can add new effects by deriving from `PostProcessingEffect`.  

To use the effect add it to the same object as your `Volume` component.

Here is an example that wraps the [Outline postprocessing effect](https://pmndrs.github.io/postprocessing/public/demo/#outline). You can expose variables and settings as usual as any effect is also just a component in your three.js scene.

@[code](@code/custom-post-effect.ts) 


## Custom ParticleSystem Behaviour


@[code](@code/custom-particle-system-behaviour.ts) 


## Custom 2D Audio Component

This is an example how you could create your own audio component.   
For most usecases however you can use the core AudioSource component and don't have to write code.

@[code](@code/component-2d-audio.ts)


## Arbitrary external files

Use the FileReference type to load external files (e.g. a json file)
@[code](@code/component-filereference.ts)

<!-- SAMPLE receive click from HTML button
## Receiving html element click in component
-->



<!-- SAMPLE disable environment light 
## Disable environment light
-->


<!-- SAMPLE using mediapipe with hands 
## Use mediapipe package to control the 3D scene with hands
Make sure to install the mediapipe package. Visit the github link below to see the complete project setup.  
Try it [live here](https://engine.needle.tools/samples/mediapipe-hands/) - requires a webcam/camera
-->


<!-- SAMPLE Change Color On Collision
## Change Color On Collision
-->

<!-- SAMPLE Physics Trigger Relay
## Physics Trigger Relay
Invoke events using an objects physics trigger methods 
-->

<!-- SAMPLE Auto Reset
## Auto Reset
Reset an object's position automatically when it's leaving a physics trigger
-->

<!-- SAMPLE Play Audio On Collision
## Play Audio On Collision
-->

<!-- SAMPLE Set Random Color
## Set Random Color
Randomize the color of an object on start. Note that the materials are cloned in the `start` method
-->

<!-- SAMPLE Timed Spawn
## Spawn Objects Over Time
-->