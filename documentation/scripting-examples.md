# Script Examples

## Basic component
@[code](@code/basic-component.ts)

see [scripting](scripting#lifecycle-methods) for all component events

## Reference an Object from Unity
@[code](@code/component-object-reference.ts)  

## Reference and load an asset from Unity (Prefab or SceneAsset)
@[code](@code/component-prefab.ts)

## Reference and load scenes from Unity
::: tip
Find a [working example in our samples](https://engine.needle.tools/samples/?open=1#multi-scenes--dynamic-loading) to download and try
:::

@[code](@code/component-scene.ts)

## Receive Clicks on Objects

::: tip
Make sure you have an ObjectRaycaster component in your parent hierarchy (or on the object that should receive clicks)
:::

@[code](@code/component-click.ts)

### Play Animation on click
@[code](@code/component-animation-onclick.ts)


## Create and invoke a UnityEvent
@[code](@code/component-unityevent.ts)
::: tip
EventList events are also invoked on the component level. This means you can also subscribe to the event declared above using ``myComponent.addEventListener("my-event", evt => {...})`` as well.   
This is an experimental feature: please provide feedback in our [discord](https://discord.needle.tools)
:::

### Declare a custom event type
::: tip
This is useful for when you want to expose an event to Unity or Blender with some custom arguments (like a string)
:::
@[code](@code/component-customevent.ts)

_Example use:_  
![20221128-210735_Unity-needle](https://user-images.githubusercontent.com/2693840/204370950-4c89b877-90d7-4e6f-8266-3352e6da16f4.png)


## Get current location
@[code](@code/component-location.ts) 