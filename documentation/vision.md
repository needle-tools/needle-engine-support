---
next: features-overview
---

# Our Vision 🔮

## The Future of the 3D Web

We believe the use of 3D on the web will expand considerably in the next years. While today native apps are the norm, more and more content is made available as a web app or [PWA](https://web.dev/progressive-web-apps/).  New VR and AR devices will [extend into the web](https://immersive-web.github.io/webxr-samples/), creating an interesting problem: responsive suddenly not only means  "small screen" or "large screen", you're also dealing with spaces, 3D, spatial placement and potentially glasses and controllers!  

Add to that a push towards more interactivity and collaboration, and you have an interesting mix of challenges.  

At Needle, we believe ideating and creating in this space about this should be easy. We've set out to speed things up – creating our own runtime to reach these goals. That's why we're baking the ability to deploy to AR and VR right into our core components, and continually test that new ideas work across platforms. 

## Why another platform for 3D on the web? Aren't there enough options already?

There's numerous options, that's true! We found that current systems<sup>1</sup> can be roughly sorted into two categories: some have great asset handling, tools, and artist-friendly workflows but output some sort of binary blob, and others are more code-focussed, developer-friendly and allow for great integration into modern web workflows<sup>2</sup>.  

We want to bridge these worlds and combine the best of both worlds: artist-friendly workflows and modern web technologies. Combined with modern formats and a snappy workflow, we believe this will allow many more creators to bring their content to the web. We also saw an opportunity to get AR, VR and collaboration right from the start.  
  
<sup>1</sup>: _Examples include Unity, PlayCanvas, three.js, react-three-fiber, Babylon, A-Frame, Godot, and many more._
<sup>2</sup>: _There's more nuance to this than fits into an introductory paragraph! All engines and frameworks have their strengths and weaknesses, and are constantly evolving._
  
## Creating a Workflow, not an Editor
  
We think the next wave of 3D apps on the web will come with better _workflows_: everyone should be able to put together a 3D scene, an art gallery, present a product or 3D scan on the web or make simple games. Reaching this goal will require more than just supporting one particular system and exporting to the web from there.
  
Our goal is to allow people to bring data to the web from _their_ creative tools: be it Unity, Blender, Photoshop, or something else. We're aware that this is a big goal – but instead of doing everything at once, we want to iterate and get closer to it together.  
  
## Open Standards instead of Proprietary Containers

At the core of Needle Engine stands the [glTF](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) format and its ability to be extended with custom extensions. The goal is: a single `.glb` file can contain your entire application's data. 
  
It's worth noting that it's not a goal to ship actual code inside glTF; shipping and running code is the job of modern web runtimes and bundling. We certainly can imagine that abstract representations of logic (e.g. graphs, state machines, and so on) can be standardized to a certain degree and allow for interoperable worlds, but we're not there yet.  
  
[Read more about our use of glTF and extensions](./technical-overview.md)

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

## Needle Engine and Unity WebGL

From working with Unity for many years we've found that while the engine and editor progress at a great pace, WebGL output has somewhat lacked behind. Integration of Unity players into web-based systems is rather hard, "talking" to the surrounding website requires a number of workarounds, and most of all, iteration times are very slow due to the way that Unity packs all code into WebAssembly via IL2CPP. These technologies are awesome, and result in great runtime performance and a lot of flexibility. But they're so much slower and walled off compared to modern web development workflows that we decided to take matters into our own hands.  

## Needle Engine and three.js

Needle Engine builds on three.js. All rendering goes through it, glTF files are loaded via three's extension interfaces, and our component system revolves around three's Object3D and scene graph. We're committed to upstreaming some of our changes and improvements, creating pull requests and reporting issues along the way.  
