---
description: Our vision for the 3D web - bridging artist-friendly workflows with modern web technologies using open standards like glTF and WebXR.
next: features-overview
---

# Our Vision 🔮

This page is about where we think the 3D web is going and what we're deliberately not building. If you're weighing up whether to use Needle Engine, [Why Needle Engine exists](/docs/why) is the more practical read — it covers the problem it solves, who it suits, and how it compares to three.js, React Three Fiber, Blender and Unity WebGL.

## The Future of the 3D Web

We believe the use of 3D on the web will expand considerably in the next years. While today native apps are the norm, more and more content is made available as a web app or [PWA](https://web.dev/progressive-web-apps/).  New VR and AR devices will [extend into the web](https://immersive-web.github.io/webxr-samples/), creating an interesting problem: responsive suddenly not only means  "small screen" or "large screen", you're also dealing with spaces, 3D, spatial placement and potentially glasses and controllers!  

Add to that a push towards more interactivity and collaboration, and you have an interesting mix of challenges.  

At Needle, we believe ideating and creating in this space should be easy. We've set out to speed things up – creating our own runtime to reach these goals. That's why we're baking the ability to deploy to AR and VR right into our core components, and continually test that new ideas work across platforms. 

## Creating a Workflow, not an Editor
  
We think the next wave of 3D apps on the web will come with better _workflows_: everyone should be able to put together a 3D scene, an art gallery, present a product or 3D scan on the web or make simple games. Reaching this goal will require more than just supporting one particular system and exporting to the web from there.
  
Our goal is to allow people to bring data to the web from _their_ creative tools: be it Unity, Blender, Photoshop, or something else. We're aware that this is a big goal – but instead of doing everything at once, we want to iterate and get closer to it together.  
  
## Open Standards instead of Proprietary Containers

At the core of Needle Engine stands the [glTF](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) format and its ability to be extended with custom extensions. The goal is: a single `.glb` file can contain your entire application's data. 
  
It's worth noting that it's not a goal to ship actual code inside glTF; shipping and running code is the job of modern web runtimes and bundling. We certainly can imagine that abstract representations of logic (e.g. graphs, state machines, and so on) can be standardized to a certain degree and allow for interoperable worlds, but we're not there yet.  
  
[Read more about our use of glTF and extensions](/explanation/architecture/technical-overview)

# Goals and Non-Goals

## Goals
- Iteration should be rapid and deployment should be fast. 
- Working on 3D web projects should be the as easy as working 2D web projects.   
- Developers and artists should be able to collaborate directly.   
- Responsive web extends beyond screens – AR and VR should be built in, not afterthoughts.   
- We want to contribute back to open-source projects. 
- Open discussion regarding 3D and web standards. 
- Ability to bring and take your data in open formats. 
- Ability to choose what web framework you use, not lock-in to particular frameworks and vendors. 
- Common usecases work without or with limited coding experience.  

## Non-Goals
- It's not a goal to have 100% coverage of all combinations of Editor versions, feature sets, render pipelines.  
- It's not a goal to provide a full no-code environment.  
- It's not a goal to match the feature set, capabilities, or runtime performance of other engines.  
  
# Relation to other engines and frameworks

How Needle Engine relates to three.js, React Three Fiber, Blender and Unity WebGL is covered in [Why Needle Engine exists](/docs/why#how-it-relates-to-what-you-already-use).
