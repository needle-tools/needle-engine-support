import{_ as o,c as n,e as t,a as r,b as s,w as i,r as l,o as d,d as h}from"./app-B4MxFGS_.js";const c={};function m(p,e){const a=l("RouteLink");return d(),n("div",null,[e[1]||(e[1]=t('<h1 id="our-vision" tabindex="-1"><a class="header-anchor" href="#our-vision"><span>Our Vision 🔮</span></a></h1><h2 id="the-future-of-the-3d-web" tabindex="-1"><a class="header-anchor" href="#the-future-of-the-3d-web"><span>The Future of the 3D Web</span></a></h2><p>We believe the use of 3D on the web will expand considerably in the next years. While today native apps are the norm, more and more content is made available as a web app or <a href="https://web.dev/progressive-web-apps/" target="_blank" rel="noopener noreferrer">PWA</a>. New VR and AR devices will <a href="https://immersive-web.github.io/webxr-samples/" target="_blank" rel="noopener noreferrer">extend into the web</a>, creating an interesting problem: responsive suddenly not only means &quot;small screen&quot; or &quot;large screen&quot;, you&#39;re also dealing with spaces, 3D, spatial placement and potentially glasses and controllers!</p><p>Add to that a push towards more interactivity and collaboration, and you have an interesting mix of challenges.</p><p>At Needle, we believe ideating and creating in this space should be easy. We&#39;ve set out to speed things up – creating our own runtime to reach these goals. That&#39;s why we&#39;re baking the ability to deploy to AR and VR right into our core components, and continually test that new ideas work across platforms.</p><h2 id="why-another-platform-for-3d-on-the-web-aren-t-there-enough-options-already" tabindex="-1"><a class="header-anchor" href="#why-another-platform-for-3d-on-the-web-aren-t-there-enough-options-already"><span>Why another platform for 3D on the web? Aren&#39;t there enough options already?</span></a></h2><p>There&#39;s numerous options, that&#39;s true! We found that current systems<sup>1</sup> can be roughly sorted into two categories: some have great asset handling, tools, and artist-friendly workflows but output some sort of binary blob, and others are more code-focussed, developer-friendly and allow for great integration into modern web workflows<sup>2</sup>.</p><p>We want to bridge these worlds and combine the best of both worlds: artist-friendly workflows and modern web technologies. Combined with modern formats and a snappy workflow, we believe this will allow many more creators to bring their content to the web. We also saw an opportunity to get AR, VR and collaboration right from the start.</p><p><sup>1</sup>: <em>Examples include Unity, PlayCanvas, three.js, react-three-fiber, Babylon, A-Frame, Godot, and many more.</em><sup>2</sup>: <em>There&#39;s more nuance to this than fits into an introductory paragraph! All engines and frameworks have their strengths and weaknesses, and are constantly evolving.</em></p><h2 id="creating-a-workflow-not-an-editor" tabindex="-1"><a class="header-anchor" href="#creating-a-workflow-not-an-editor"><span>Creating a Workflow, not an Editor</span></a></h2><p>We think the next wave of 3D apps on the web will come with better <em>workflows</em>: everyone should be able to put together a 3D scene, an art gallery, present a product or 3D scan on the web or make simple games. Reaching this goal will require more than just supporting one particular system and exporting to the web from there.</p><p>Our goal is to allow people to bring data to the web from <em>their</em> creative tools: be it Unity, Blender, Photoshop, or something else. We&#39;re aware that this is a big goal – but instead of doing everything at once, we want to iterate and get closer to it together.</p><h2 id="open-standards-instead-of-proprietary-containers" tabindex="-1"><a class="header-anchor" href="#open-standards-instead-of-proprietary-containers"><span>Open Standards instead of Proprietary Containers</span></a></h2><p>At the core of Needle Engine stands the <a href="https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html" target="_blank" rel="noopener noreferrer">glTF</a> format and its ability to be extended with custom extensions. The goal is: a single <code>.glb</code> file can contain your entire application&#39;s data.</p><p>It&#39;s worth noting that it&#39;s not a goal to ship actual code inside glTF; shipping and running code is the job of modern web runtimes and bundling. We certainly can imagine that abstract representations of logic (e.g. graphs, state machines, and so on) can be standardized to a certain degree and allow for interoperable worlds, but we&#39;re not there yet.</p>',15)),r("p",null,[s(a,{to:"/technical-overview.html"},{default:i(()=>e[0]||(e[0]=[h("Read more about our use of glTF and extensions")])),_:1})]),e[2]||(e[2]=t('<h1 id="goals-and-non-goals" tabindex="-1"><a class="header-anchor" href="#goals-and-non-goals"><span>Goals and Non-Goals</span></a></h1><h2 id="goals" tabindex="-1"><a class="header-anchor" href="#goals"><span>Goals</span></a></h2><ul><li>Iteration should be rapid and deployment should be fast.</li><li>Working on 3D web projects should be the as easy as working 2D web projects.</li><li>Developers and artists should be able to collaborate directly.</li><li>Responsive web extends beyond screens – AR and VR should be built in, not afterthoughts.</li><li>We want to contribute back to open-source projects.</li><li>Open discussion regarding 3D and web standards.</li><li>Ability to bring and take your data in open formats.</li><li>Ability to choose what web framework you use, not lock-in to particular frameworks and vendors.</li><li>Common usecases work without or with limited coding experience.</li></ul><h2 id="non-goals" tabindex="-1"><a class="header-anchor" href="#non-goals"><span>Non-Goals</span></a></h2><ul><li>It&#39;s not a goal to have 100% coverage of all combinations of Editor versions, feature sets, render pipelines.</li><li>It&#39;s not a goal to provide a full no-code environment.</li><li>It&#39;s not a goal to match the feature set, capabilities, or runtime performance of other engines.</li></ul><h1 id="relation-to-other-engines-and-frameworks" tabindex="-1"><a class="header-anchor" href="#relation-to-other-engines-and-frameworks"><span>Relation to other engines and frameworks</span></a></h1><h2 id="needle-engine-and-unity-webgl" tabindex="-1"><a class="header-anchor" href="#needle-engine-and-unity-webgl"><span>Needle Engine and Unity WebGL</span></a></h2><p>From working with Unity for many years we&#39;ve found that while the engine and editor progress at a great pace, WebGL output has somewhat lacked behind. Integration of Unity players into web-based systems is rather hard, &quot;talking&quot; to the surrounding website requires a number of workarounds, and most of all, iteration times are very slow due to the way that Unity packs all code into WebAssembly via IL2CPP. These technologies are awesome, and result in great runtime performance and a lot of flexibility. But they&#39;re so much slower and walled off compared to modern web development workflows that we decided to take matters into our own hands.</p><h2 id="needle-engine-and-three.js" tabindex="-1"><a class="header-anchor" href="#needle-engine-and-three.js"><span>Needle Engine and three.js</span></a></h2><p>Needle Engine builds on three.js. All rendering goes through it, glTF files are loaded via three&#39;s extension interfaces, and our component system revolves around three&#39;s Object3D and scene graph. We&#39;re committed to upstreaming some of our changes and improvements, creating pull requests and reporting issues along the way.</p>',10))])}const g=o(c,[["render",m]]),u=JSON.parse(`{"path":"/vision.html","title":"Our Vision 🔮","lang":"en-US","frontmatter":{"next":"features-overview","head":[["meta",{"name":"og:image","content":"https://engine.needle.tools/docs/.preview/vision.png"}],["meta",{"name":"og:description","content":"---\\nWe believe the use of 3D on the web will expand considerably in the next years. While today native apps are the norm, more and more content is made available as a web app or PWA.  New VR and AR devices will extend into the web, creating an interesting problem: responsive suddenly not only means  'small screen' or 'large screen', you're also dealing with spaces, 3D, spatial placement and potentially glasses and controllers!\\nAdd to that a push towards more interactivity and collaboration, and you have an interesting mix of challenges.\\nAt Needle, we believe ideating and creating in this space should be easy. We've set out to speed things up – creating our own runtime to reach these goals. That's why we're baking the ability to deploy to AR and VR right into our core components, and continually test that new ideas work across platforms.\\nThere's numerous options, that's true! We found that current systems1 can be roughly sorted into two categories: some have great asset handling, tools, and artist-friendly workflows but output some sort of binary blob, and others are more code-focussed, developer-friendly and allow for great integration into modern web workflows2.\\nWe want to bridge these worlds and combine the best of both worlds: artist-friendly workflows and modern web technologies. Combined with modern formats and a snappy workflow, we believe this will allow many more creators to bring their content to the web. We also saw an opportunity to get AR, VR and collaboration right from the start.\\n1: _Examples include Unity, PlayCanvas, three.js, react-three-fiber, Babylon, A-Frame, Godot, and many more._\\n2: _There's more nuance to this than fits into an introductory p"}]],"description":"---\\nWe believe the use of 3D on the web will expand considerably in the next years. While today native apps are the norm, more and more content is made available as a web app or PWA.  New VR and AR devices will extend into the web, creating an interesting problem: responsive suddenly not only means  'small screen' or 'large screen', you're also dealing with spaces, 3D, spatial placement and potentially glasses and controllers!\\nAdd to that a push towards more interactivity and collaboration, and you have an interesting mix of challenges.\\nAt Needle, we believe ideating and creating in this space should be easy. We've set out to speed things up – creating our own runtime to reach these goals. That's why we're baking the ability to deploy to AR and VR right into our core components, and continually test that new ideas work across platforms.\\nThere's numerous options, that's true! We found that current systems1 can be roughly sorted into two categories: some have great asset handling, tools, and artist-friendly workflows but output some sort of binary blob, and others are more code-focussed, developer-friendly and allow for great integration into modern web workflows2.\\nWe want to bridge these worlds and combine the best of both worlds: artist-friendly workflows and modern web technologies. Combined with modern formats and a snappy workflow, we believe this will allow many more creators to bring their content to the web. We also saw an opportunity to get AR, VR and collaboration right from the start.\\n1: _Examples include Unity, PlayCanvas, three.js, react-three-fiber, Babylon, A-Frame, Godot, and many more._\\n2: _There's more nuance to this than fits into an introductory p"},"headers":[{"level":2,"title":"The Future of the 3D Web","slug":"the-future-of-the-3d-web","link":"#the-future-of-the-3d-web","children":[]},{"level":2,"title":"Why another platform for 3D on the web? Aren't there enough options already?","slug":"why-another-platform-for-3d-on-the-web-aren-t-there-enough-options-already","link":"#why-another-platform-for-3d-on-the-web-aren-t-there-enough-options-already","children":[]},{"level":2,"title":"Creating a Workflow, not an Editor","slug":"creating-a-workflow-not-an-editor","link":"#creating-a-workflow-not-an-editor","children":[]},{"level":2,"title":"Open Standards instead of Proprietary Containers","slug":"open-standards-instead-of-proprietary-containers","link":"#open-standards-instead-of-proprietary-containers","children":[]},{"level":2,"title":"Goals","slug":"goals","link":"#goals","children":[]},{"level":2,"title":"Non-Goals","slug":"non-goals","link":"#non-goals","children":[]},{"level":2,"title":"Needle Engine and Unity WebGL","slug":"needle-engine-and-unity-webgl","link":"#needle-engine-and-unity-webgl","children":[]},{"level":2,"title":"Needle Engine and three.js","slug":"needle-engine-and-three.js","link":"#needle-engine-and-three.js","children":[]}],"git":{"updatedTime":1667075212000,"contributors":[{"name":"hybridherbst","username":"hybridherbst","email":"felix.herbst@gmail.com","commits":8,"url":"https://github.com/hybridherbst"},{"name":"Marcel Wiessler","username":"","email":"marwie@users.noreply.github.com","commits":4}],"changelog":[{"hash":"caacba9bade500b0f2e31e99160779e10efe7b5b","time":1667075212000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update vision.md","tag":"release/2.42.0-pre"},{"hash":"d452f6c48b81526e8f1a1607a63c5a232b60865e","time":1666540087000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"update"},{"hash":"263c12e104b8f4cb31f39ac1e2cf4ea87141b8f1","time":1666433637000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"fix error in vision md"},{"hash":"182abe004151f7349a8d78cd730babca7cce251e","time":1661207485000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update vision.md"},{"hash":"305d9a49351c4ca04946b0ec734fe50745852039","time":1661207471000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update vision.md"},{"hash":"42cbb46a91050ea27530141311002059196b9b16","time":1661207390000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update vision.md"},{"hash":"99e7886c932c4de898579b7374bdc2f25a9ad688","time":1661206493000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update vision.md","tag":"release/2.9.2-pre"},{"hash":"cbada4c7c50337973f567aa1bd70ec15f7a6bd34","time":1661206247000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update vision.md"},{"hash":"be387ddb1f0dcb9a2c1c2758c491ee7ac70eb52f","time":1661205700000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update vision.md"},{"hash":"7e76eb0303e033c43c7c5ecb240735a6e5b1662a","time":1661203967000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update vision.md","tag":"release/2.9.1-pre"},{"hash":"5219bffc1ed90ee31724ba4c523a3423d900ebb6","time":1660694117000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update vision.md"},{"hash":"eef626f3128e7ca67c4efb727346808d68662de5","time":1660682638000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Create vision.md"}]},"filePathRelative":"vision.md"}`);export{g as comp,u as data};
