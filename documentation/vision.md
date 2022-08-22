# Our Vision 🔮

## The Future of the 3D Web

We believe the use of 3D on the web will expand considerably in the next years. While today native apps are the norm, more and more content is made available as a web app or [PWA](https://web.dev/progressive-web-apps/).  New VR and AR devices will extend into the web, creating an interesting problem: responsive suddenly not only means  "small screen" or "large screen", you're also dealing with spaces, 3D, spatial placement and potentially glasses and controllers!  
Add to that a push towards more interactivity and collaboration, and you have an interesting mix of challenges.  

At Needle, we believe ideating and creating in this space about this should be easy. We've set out to speed things up – creating our own runtime to reach these goals. That's why we're baking the ability to deploy to AR and VR right into our core components, and continually test that new ideas work across platforms. 

## Why another platform for 3D on the web? Aren't there enough options already?

There's numerous options, that's true! We found that current systems (e.g. Unity, PlayCanvas, three.js, react-three-fibe, Babylon, A-Frame, Godot, and many more) can be roughly sorted into two categories: some have great asset handling, tools, and artist-friendly workflows but output some sort of binary blob, and others are more code-focussed, developer-friendly and allow for great integration into modern web workflows<sup>1<sup>.  

We want to bridge these worlds and combine the best of both worlds: artist-friendly workflows and modern web technologies. Combined with modern formats and a snappy workflow, we believe this will allow many more creators to bring their content to the web. We also saw an opportunity to get AR, VR and collaboration right from the start.  
  
<sup>1</sup>: _There's more nuance to this than fits into an introductory paragraph! All engines and frameworks have their strengths and weaknesses, and are constantly evolving._
  
## Open Standards instead of Proprietary Containers

At the core of Needle Engine stands the glTF format and its ability to be extended with custom extensions. The goal is: a single .glb file can contain your entire application's data. It's worth noting that it's not a goal to ship actual code inside glTF; shipping and running code is the job of modern web runtimes and bundling. We certainly can imagine that abstract representations of logic (e.g. graphs, state machines, and so on) can be standardized to a certain degree and allow for interoperable worlds, but we're not there yet.  
  
[Read more about our use of glTF and extensions](./technical-overview.md)
  
## Needle Engine and Unity WebGL

From working with Unity for many years we've found that while the engine and editor progress at a great pace, WebGL output has somewhat lacked behind. Integration of Unity players into web-based systems is rather hard, "talking" to the surrounding website requires a number of workarounds, and most of all, iteration times are very slow due to the way that Unity packs all code into WebAssembly via IL2CPP. These technologies are awesome, and result in great runtime performance and a lot of flexibility. But they're so much slower and walled off than modern web development workflows should be that we decided to look for alternate options.  

## Needle Engine and three.js

Needle Engine builds on three.js. All rendering goes through it, glTF files are loaded via three's extension interfaces, and our component system revolves around three's Object3D and scene graph. We're committed to upstreaming some of our changes and improvements, creating pull requests and reporting issues along the way.  
