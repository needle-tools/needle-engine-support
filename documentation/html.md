# HTML 🧱

## The future of the web

We believe the web will expand considerably in the next years. While today native apps are the norm, more and more content is made available as a web app or [PWA](https://web.dev/progressive-web-apps/).  New VR and AR devices will extend into the web, creating an interesting problem: responsive suddenly doesn't only need "small screen" or "large screen", suddenly you're also dealing with spaces, 3D, spatial placement and potentially glasses and controllers!  
Add to that a push towards more interactivity and collaboration, and you have an interesting mix of challenges.  

At Needle, we believe thinking about this should be easy. That's why we're baking the ability to deploy to AR and VR right into our core components, and continually test that new ideas to work across platforms. 

## Bundling

By default, Needle Engine gets bundled into a web app on deployment. This ensures smaller files, tree-shaking (similar to code stripping in Unity) and optimizes load times. Instead of downloading numerous small scripts and components, only one or a few are downloaded that contain the minimal code needed.  

Vite (our default bundler) has a good explanation why web apps should be bundled: [Why Bundle for Production](https://vitejs.dev/guide/why.html)

## Vue, React, Mustache, etc.

Needle Engine is unoponiated about the choice of framework. The default template only uses vite as bundler. Adding vue to that is easy (see the [vite docs]()), we also provide an (experimental) react-three-fiber template and there should be nothing stopping your from using simpler or more complex frameworks.

You can, for example, use
- **just vite + HTML**  
    *Our default template does this*
    
- **vite + vue**  
    *This is what the Needle Tools website uses!*
- **vite + react**  
    *There's an experimental template for this, that you can pick when generating a project!*
- **react-three-fiber wrapped around a `<NeedleEngine>` tag**  
    *We've used this for some experiments*
- **`tsc` to compile TypeScript, no bundling required**
    *No example yet*
- **a pre-built Needle Engine and direct JavaScript**
    *No example yet*

In short: we're currently providing a minimal vite template, but you can extend it or switch to other frameworks –  
let us know what and how you build, and how we can improve the experience!

## Accessing components from regular javascript
    
Code that you expose can be accessed from JavaScript after bundling. This allows to build viewers and other applications where there's a split between data known at edit time and data only known at runtime (e.g. dynamically loaded files, user generated content).  
For accessing components from regular javascript outside of the engine please refer to the [interop with regular javascript section](./scripting.md#accessing-components-from-external-javascript)
