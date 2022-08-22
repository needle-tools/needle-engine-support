# Debugging

> **Warning**: This section is under construction and the information here might be outdated or incomplete. 🏗️

## Built-in URL parameters 🔖

Debug Flags can be appended as URL query parameters.  
Use ``?help`` to get a list of ALL parameters available.  

The following parameters can be added to URLs to emit more debugging info, change behaviour or show gizmos/helpers: 

- ``avatar=<id>`` avatar to spawn when entering VR  
- ``mirror`` opens another window to render world when entering VR  
- ``postfx`` enables threejs postprocessing [EffectComposer ⇡](https://threejs.org/docs/#examples/en/postprocessing/EffectComposer)  

### Debugging
- ``debug`` shows transform gizmos (if any)
- ``debugnet`` networking debug
- ``debugowner`` ownership logs
- ``debugavatar=<avatarid>`` instantiates one debug avatar in center of world
- ``debugphysics`` shows physics colliders
- ``debugsync`` logs sync (synced transform) messages
- ``debugassets`` logs messages about registered assets (e.g. builtin textures)
- ``debugvoip`` logs voip related messages
- ``disableRT`` used to disable render textures (e.g. tv screen)
- ``gizmos`` enables gizmo rendering (e.g. when using BoxCollider or AxesHelper components)

### Local Testing of release builds
- First, install http-server: `npm install -g http-server` 
- make a production build
- in that directory, run `http-server -g` (-g enables gzip support)
- if you want to test WebXR, generate a [self-signed SSL certificate ⇡](https://stackoverflow.com/a/35231213), then run `http-server -g -S` to enable https (required for WebXR).

## Mobile Console 

We're providing a simple but effective console overlay for seeing logs from mobile devices. iOS issues are otherwise notoriously hard to debug.  
(not documented yet) 

For Android, you can attach Chrome Dev Tools to your device and see logs right from your PC. 
