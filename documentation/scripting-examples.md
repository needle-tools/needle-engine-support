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

<video-embed src="/videos/component-time.mp4" limit_height />


## Change custom shader property

Assuming you have a custom shader with a property name `_Speed` that is a float value this is how you would change it from a script:
@[code](@code/component-customshaderproperty.ts)

