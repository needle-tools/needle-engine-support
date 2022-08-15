# HTML 🧱

## Bundling

By default, Needle Engine gets bundled into a web app on deployment. This ensures smaller files, tree-shaking (similar to code stripping in Unity) and optimizes load times. Instead of downloading numerous small scripts and components, only one or a few are downloaded that contain the minimal code needed.  

Vite (our default bundler) has a good explanation why web apps should be bundled: [Why Bundle for Production](https://vitejs.dev/guide/why.html)

## Vue, React, Mustache, etc.

Needle Engine is unoponiated about the choice of framework. The default template only uses vite as bundler. Adding vue to that is easy (see the [vite docs]()), we also provide an (experimental) react-three-fiber template and there should be nothing stopping your from using simpler or more complex frameworks.

You can, for example
- just use tsc to compile TypeScript, no bundling required
- pre-build Needle Engine and then just use JavaScript
- use vite + vue
- use vite + react
- use react-three-fiber wrapped around a <NeedleEngine> tag

In short: let us know what and how you build, and how we can improve the experience!

## Content Overlays in WebXR mode
    
If you want to display different html content whether the client is using a regular browser or using AR or VR you can just use a set of html classes. For example to make content appear on desktop and in AR add a ``<div class="desktop ar"> ... </div>`` inside the ``<needle-tiny>`` tag:

```html
<needle-tiny src="loadScene">
    <div class="desktop ar" style="pointer-events:none;">
        your content for AR and desktop goes here
    </div>
</needle-tiny>
```

## Accessing components from regular javascript
    
Code that you expose can be accessed from JavaScript after bundling. This allows to build viewers and other applications where there's a split between data known at edit time and data only known at runtime (e.g. dynamically loaded files, user generated content).  
For accessing components from regular javascript outside of the engine please refer to the [interop with regular javascript section](./scripting.md#accessing-components-from-external-javascript)
