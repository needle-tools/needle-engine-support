---
title: Everywhere Actions
---

## What are Everywhere Actions?

Needle's Everywhere Actions are a set of carefully chosen components that allow you to create interactive experiences in Unity without writing a single line of code.  
They are designed to serve as building blocks for experiences across the web, mobile and XR, **including Augmented Reality on iOS**.  

From low-level triggers and actions, higher-level complex interactive behaviours can be built.  

### Supported Platforms
- Desktop
- Mobile (Android / iOS)
- VR Glasses
- AR Devices
- iOS AR – QuickLook (yes, really!)

## How do I use Everywhere Actions?

After selecting an object, click `Add Component > Needle > Everywhere Actions > [Action]`.

![](/imgs/everywhere-actions-component-menu.gif)

## List of Everywhere Actions

| Action | Description | Example Use Cases |
| --- | --- | --- |
| Play Animation on Click | Plays a selected animation state from an Animator. After playing, it can optionally transition to another animation. | Product presentations, interactive tutorials, character movement |
| Change Material on Click | Switch out one material for others. All objects with that material will be switched together. | Product configurators, characters |
| Look At | Make an object look at the camera. | UI elements, sprites, info graphics, billboard effects, clickable hotspots |
| Play Audio on Click | Plays a selected audio clip. | Sound effects, Narration, Museum exhibits |
| Hide on Start | Hides an object at scene start for later reveal. |
| Set Active on Click | Show or hide objects. |  |
| Change Transform on Click | Move, rotate or scale an object. Allows for absolute or relative movement. | Characters, products, UI animation (use animation for more complex movements) |
| Audio Source | Plays audio on start and keeps looping. Spatial or non-spatial | Background music, ambient sounds |
| Image Tracking | Tracks an image target and shows or hides objects. | AR experiences, product presentations |

## Samples

### Musical Instrument

Demonstrates spatial audio, animation, and interactions.

<sample src="https://engine.needle.tools/samples/musical-instrument" />

### Simple Character Controllers

Demonstrates combining animations, look at, and movement.  

<sample src="https://engine.needle.tools/samples/usdz-characters" />

### Image Tracking

Demonstrates how to attach 3D content onto a custom image marker. Start the scene below in AR and point your phone's camera at the image marker on a screen, or print it out.     

<img src="https://engine.needle.tools/samples/image-tracking/assets/needle-marker.png" alt="Image Marker" width=300 />    

<a href="https://engine.needle.tools/samples/image-tracking/assets/needle-marker.png" target="_blank">Download Sample Image Marker</a>  

**On Android:** please turn on "WebXR Incubations" in the Chrome Flags. You can find those by pasting [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) into the Chrome browser address bar of your Android phone.  

<sample src="https://engine.needle.tools/samples/image-tracking" />

### Interactive Building Blocks Overview

<sample src="https://engine.needle.tools/samples/usdz-interactivity" />

## Creating your own Everywhere Actions

Creating new Everywhere Actions involves writing code for your action in TypeScript, which will be used in the browser and for WebXR, and using our TriggerBuilder and ActionBuilder API to create a matching setup for Augmented Reality on iOS via QuickLook. When creating custom actions, keep in mind that QuickLook has a limited set of features available. You can still use any code you want for the browser and WebXR, but the behaviour for QuickLook may need to be an approximation built from the available triggers and actions. 

:::tip
Often constructing specific behaviours requires thinking outside the box and creatively applying the available low-level actions. An example would be a "Tap to Place" action – there is no raycasting or hit testing available in QuickLook, but you could cover the expected placement area with a number of invisible objects and use a "Tap" trigger to move the object to be placed to the position of the tapped invisible object.  
:::

Triggers and Actions for QuickLook are based on <a href="https://developer.apple.com/documentation/arkit/usdz_schemas_for_ar/actions_and_triggers" target="_blank">Apple's Preliminary Interactive USD Schemas</a>.

### Code Example

Here's the implementation for `HideOnStart` as an example for how to create an Everywhere Action with implementations for both the browser and QuickLook:  
@[code](@code/component-everywhere-action-hideonstart.ts)

::: tip
Often, getting the right behaviour will involve composing _higher-level actions_ from the available _lower-level actions_. For example, our "Change Material on Click" action is composed of a number of `fadeActions` and internally duplicates objects with different sets of materials each. By carefully constructing these actions, complex behaviours can be achieved.  
:::

### List of triggers

- TriggerBuilder.sceneStartTrigger
- TriggerBuilder.tapTrigger

### List of actions

- ActionBuilder.fadeAction
- ActionBuilder.startAnimationAction
- ActionBuilder.waitAction
- ActionBuilder.lookAtCameraAction
- ActionBuilder.emphasize
- ActionBuilder.transformAction
- ActionBuilder.playAudioAction

### List of group actions

- ActionBuilder.sequence
- ActionBuilder.parallel
- GroupAction.addAction
- GroupAction.makeParallel
- GroupAction.makeSequence
- GroupAction.makeLooping
- GroupAction.makeRepeat

To see the implementation of our built-in Everywhere Actions, please take look at `src/engine-components/export/usdz/extensions/behavior/BehaviourComponents.ts`.