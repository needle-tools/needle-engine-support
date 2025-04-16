import{_ as n,c as l,e as a,b as t,a as e,r,o}from"./app-B4MxFGS_.js";const h="/docs/imgs/everywhere-actions-component-menu.gif",d={};function p(c,i){const s=r("sample");return o(),l("div",null,[i[0]||(i[0]=a('<h2 id="what-are-everywhere-actions" tabindex="-1"><a class="header-anchor" href="#what-are-everywhere-actions"><span>What are Everywhere Actions?</span></a></h2><p>Needle&#39;s Everywhere Actions are a set of carefully chosen components that allow you to create interactive experiences in Unity without writing a single line of code.<br> They are designed to serve as building blocks for experiences across the web, mobile and XR, <strong>including Augmented Reality on iOS</strong>.</p><p>From low-level triggers and actions, higher-level complex interactive behaviours can be built.</p><h3 id="supported-platforms" tabindex="-1"><a class="header-anchor" href="#supported-platforms"><span>Supported Platforms</span></a></h3><ul><li>Desktop</li><li>Mobile (Android / iOS)</li><li>VR Glasses</li><li>AR Devices</li><li>iOS AR – QuickLook (yes, really!)</li></ul><h2 id="how-do-i-use-everywhere-actions" tabindex="-1"><a class="header-anchor" href="#how-do-i-use-everywhere-actions"><span>How do I use Everywhere Actions?</span></a></h2><p>For iOS support add the <code>USDZExporter</code> component to your scene. It is good practice to add it to the same object as the <code>WebXR</code> component (but not mandatory)</p><p>To add an action to any object in your scene<br> select it and then click <code>Add Component &gt; Needle &gt; Everywhere Actions &gt; [Action]</code>.</p><p><img src="'+h+'" alt=""></p><h2 id="list-of-everywhere-actions" tabindex="-1"><a class="header-anchor" href="#list-of-everywhere-actions"><span>List of Everywhere Actions</span></a></h2><table><thead><tr><th>Action</th><th>Description</th><th>Example Use Cases</th></tr></thead><tbody><tr><td>Play Animation on Click</td><td>Plays a selected animation state from an Animator. After playing, it can optionally transition to another animation.</td><td>Product presentations, interactive tutorials, character movement</td></tr><tr><td>Change Material on Click</td><td>Switch out one material for others. All objects with that material will be switched together.</td><td>Product configurators, characters</td></tr><tr><td>Look At</td><td>Make an object look at the camera.</td><td>UI elements, sprites, info graphics, billboard effects, clickable hotspots</td></tr><tr><td>Play Audio on Click</td><td>Plays a selected audio clip.</td><td>Sound effects, Narration, Museum exhibits</td></tr><tr><td>Hide on Start</td><td>Hides an object at scene start for later reveal.</td><td></td></tr><tr><td>Set Active on Click</td><td>Show or hide objects.</td><td></td></tr><tr><td>Change Transform on Click</td><td>Move, rotate or scale an object. Allows for absolute or relative movement.</td><td>Characters, products, UI animation (use animation for more complex movements)</td></tr><tr><td>Audio Source</td><td>Plays audio on start and keeps looping. Spatial or non-spatial</td><td>Background music, ambient sounds</td></tr><tr><td>WebXR Image Tracking</td><td>Tracks an image target and shows or hides objects.</td><td>AR experiences, product presentations</td></tr></tbody></table><h2 id="samples" tabindex="-1"><a class="header-anchor" href="#samples"><span>Samples</span></a></h2><h3 id="musical-instrument" tabindex="-1"><a class="header-anchor" href="#musical-instrument"><span>Musical Instrument</span></a></h3><p>Demonstrates spatial audio, animation, and interactions.</p>',14)),t(s,{src:"https://engine.needle.tools/samples-uploads/musical-instrument"}),i[1]||(i[1]=e("h3",{id:"simple-character-controllers",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#simple-character-controllers"},[e("span",null,"Simple Character Controllers")])],-1)),i[2]||(i[2]=e("p",null,"Demonstrates combining animations, look at, and movement.",-1)),t(s,{src:"https://engine.needle.tools/samples-uploads/usdz-characters"}),i[3]||(i[3]=a('<h3 id="image-tracking" tabindex="-1"><a class="header-anchor" href="#image-tracking"><span>Image Tracking</span></a></h3><p>Demonstrates how to attach 3D content onto a custom image marker. Start the scene below in AR and point your phone&#39;s camera at the image marker on a screen, or print it out.</p><img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Image Marker" width="300"><p><a href="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" target="_blank">Download Sample Image Marker</a></p><p><strong>On Android:</strong> please turn on &quot;WebXR Incubations&quot; in the Chrome Flags. You can find those by pasting <a href="chrome://flags/#webxr-incubations" target="_blank" rel="noopener noreferrer">chrome://flags/#webxr-incubations</a> into the Chrome browser address bar of your Android phone.</p>',5)),t(s,{src:"https://engine.needle.tools/samples-uploads/image-tracking"}),i[4]||(i[4]=e("h3",{id:"interactive-building-blocks-overview",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#interactive-building-blocks-overview"},[e("span",null,"Interactive Building Blocks Overview")])],-1)),t(s,{src:"https://engine.needle.tools/samples-uploads/usdz-interactivity"}),i[5]||(i[5]=a(`<h2 id="create-your-own-everywhere-actions" tabindex="-1"><a class="header-anchor" href="#create-your-own-everywhere-actions"><span>Create your own Everywhere Actions</span></a></h2><p>Creating new Everywhere Actions involves writing code for your action in TypeScript, which will be used in the browser and for WebXR, and using our TriggerBuilder and ActionBuilder API to create a matching setup for Augmented Reality on iOS via QuickLook. When creating custom actions, keep in mind that QuickLook has a limited set of features available. You can still use any code you want for the browser and WebXR, but the behaviour for QuickLook may need to be an approximation built from the available triggers and actions.</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>Often constructing specific behaviours requires thinking outside the box and creatively applying the available low-level actions. An example would be a &quot;Tap to Place&quot; action – there is no raycasting or hit testing available in QuickLook, but you could cover the expected placement area with a number of invisible objects and use a &quot;Tap&quot; trigger to move the object to be placed to the position of the tapped invisible object.</p></div><p>Triggers and Actions for QuickLook are based on <a href="https://developer.apple.com/documentation/arkit/usdz_schemas_for_ar/actions_and_triggers" target="_blank" rel="noopener noreferrer">Apple&#39;s Preliminary Interactive USD Schemas</a></p><h3 id="code-example" tabindex="-1"><a class="header-anchor" href="#code-example"><span>Code Example</span></a></h3><p>Here&#39;s the implementation for <code>HideOnStart</code> as an example for how to create an Everywhere Action with implementations for both the browser and QuickLook:</p><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#4c4f69;--shiki-dark:#c6d0f5;--shiki-light-bg:#eff1f5;--shiki-dark-bg:#303446;"><pre class="shiki shiki-themes catppuccin-latte catppuccin-frappe vp-code"><code><span class="line"><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">import</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> Behaviour</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> UsdzBehaviour</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> BehaviorModel</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> TriggerBuilder</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> ActionBuilder</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> BehaviorExtension</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> USDObject</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> USDZExporterContext </span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">}</span><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;"> from</span><span style="--shiki-light:#40A02B;--shiki-dark:#A6D189;"> &quot;@needle-tools/engine&quot;</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">export</span><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;"> class</span><span style="--shiki-light:#DF8E1D;--shiki-light-font-style:italic;--shiki-dark:#E5C890;--shiki-dark-font-style:italic;"> HideOnStart</span><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;"> extends</span><span style="--shiki-light:#DF8E1D;--shiki-light-font-style:italic;--shiki-dark:#E5C890;--shiki-dark-font-style:italic;"> Behaviour</span><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;"> implements</span><span style="--shiki-light:#DF8E1D;--shiki-light-font-style:italic;--shiki-dark:#E5C890;--shiki-dark-font-style:italic;"> UsdzBehaviour</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#8CAAEE;--shiki-dark-font-style:italic;">    start</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">()</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span></span>
<span class="line"><span style="--shiki-light:#D20F39;--shiki-dark:#E78284;">        this</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">gameObject</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">visible </span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">=</span><span style="--shiki-light:#FE640B;--shiki-dark:#EF9F76;"> false</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">;</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#8CAAEE;--shiki-dark-font-style:italic;">    createBehaviours</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">(</span><span style="--shiki-light:#E64553;--shiki-light-font-style:italic;--shiki-dark:#EA999C;--shiki-dark-font-style:italic;">ext</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">:</span><span style="--shiki-light:#DF8E1D;--shiki-light-font-style:italic;--shiki-dark:#E5C890;--shiki-dark-font-style:italic;"> BehaviorExtension</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#E64553;--shiki-light-font-style:italic;--shiki-dark:#EA999C;--shiki-dark-font-style:italic;"> model</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">:</span><span style="--shiki-light:#DF8E1D;--shiki-light-font-style:italic;--shiki-dark:#E5C890;--shiki-dark-font-style:italic;"> USDObject</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#E64553;--shiki-light-font-style:italic;--shiki-dark:#EA999C;--shiki-dark-font-style:italic;"> _context</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">:</span><span style="--shiki-light:#DF8E1D;--shiki-light-font-style:italic;--shiki-dark:#E5C890;--shiki-dark-font-style:italic;"> USDZExporterContext</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">)</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span></span>
<span class="line"><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">        if</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> (model</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">uuid </span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">===</span><span style="--shiki-light:#D20F39;--shiki-dark:#E78284;"> this</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">gameObject</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">uuid)</span></span>
<span class="line"><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">            ext</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#8CAAEE;--shiki-dark-font-style:italic;">addBehavior</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">(</span><span style="--shiki-light:#8839EF;--shiki-light-font-weight:bold;--shiki-dark:#CA9EE6;--shiki-dark-font-weight:bold;">new</span><span style="--shiki-light:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#8CAAEE;--shiki-dark-font-style:italic;"> BehaviorModel</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">(</span><span style="--shiki-light:#40A02B;--shiki-dark:#A6D189;">&quot;HideOnStart_&quot;</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;"> +</span><span style="--shiki-light:#D20F39;--shiki-dark:#E78284;"> this</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">gameObject</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">name</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span></span>
<span class="line"><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">                TriggerBuilder</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#8CAAEE;--shiki-dark-font-style:italic;">sceneStartTrigger</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">()</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span></span>
<span class="line"><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">                ActionBuilder</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#8CAAEE;--shiki-dark-font-style:italic;">fadeAction</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">(model</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#FE640B;--shiki-dark:#EF9F76;"> 0</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#FE640B;--shiki-dark:#EF9F76;"> false</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">)</span></span>
<span class="line"><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">            ))</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">;</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#8CAAEE;--shiki-dark-font-style:italic;">    beforeCreateDocument</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">()</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span></span>
<span class="line"><span style="--shiki-light:#D20F39;--shiki-dark:#E78284;">        this</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">gameObject</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">visible </span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">=</span><span style="--shiki-light:#FE640B;--shiki-dark:#EF9F76;"> true</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">;</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#8CAAEE;--shiki-dark-font-style:italic;">    afterCreateDocument</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">()</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span></span>
<span class="line"><span style="--shiki-light:#D20F39;--shiki-dark:#E78284;">        this</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">gameObject</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">visible </span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">=</span><span style="--shiki-light:#FE640B;--shiki-dark:#EF9F76;"> false</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">;</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">    }</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">}</span></span></code></pre></div><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>Often, getting the right behaviour will involve composing <em>higher-level actions</em> from the available <em>lower-level actions</em>. For example, our &quot;Change Material on Click&quot; action is composed of a number of <code>fadeActions</code> and internally duplicates objects with different sets of materials each. By carefully constructing these actions, complex behaviours can be achieved.</p></div><h3 id="low-level-methods-for-building-your-own-actions" tabindex="-1"><a class="header-anchor" href="#low-level-methods-for-building-your-own-actions"><span>Low level methods for building your own actions</span></a></h3><table><thead><tr><th>Triggers</th><th></th></tr></thead><tbody><tr><td><code>TriggerBuilder.sceneStartTrigger</code></td><td></td></tr><tr><td><code>TriggerBuilder.tapTrigger</code></td><td></td></tr></tbody></table><table><thead><tr><th>Actions</th><th></th></tr></thead><tbody><tr><td><code>ActionBuilder.fadeAction</code></td><td></td></tr><tr><td><code>ActionBuilder.startAnimationAction</code></td><td></td></tr><tr><td><code>ActionBuilder.waitAction</code></td><td></td></tr><tr><td><code>ActionBuilder.lookAtCameraAction</code></td><td></td></tr><tr><td><code>ActionBuilder.emphasize</code></td><td></td></tr><tr><td><code>ActionBuilder.transformAction</code></td><td></td></tr><tr><td><code>ActionBuilder.playAudioAction</code></td><td></td></tr></tbody></table><table><thead><tr><th>Group Actions</th><th></th></tr></thead><tbody><tr><td><code>ActionBuilder.sequence</code></td><td></td></tr><tr><td><code>ActionBuilder.parallel</code></td><td></td></tr><tr><td><code>GroupAction.addAction</code></td><td></td></tr><tr><td><code>GroupAction.makeParallel</code></td><td></td></tr><tr><td><code>GroupAction.makeSequence</code></td><td></td></tr><tr><td><code>GroupAction.makeLooping</code></td><td></td></tr><tr><td><code>GroupAction.makeRepeat</code></td><td></td></tr></tbody></table><p>To see the implementation of our built-in Everywhere Actions, please take look at <code>src/engine-components/export/usdz/extensions/behavior/BehaviourComponents.ts</code>.</p><h2 id="further-reading" tabindex="-1"><a class="header-anchor" href="#further-reading"><span>Further reading</span></a></h2><p>The following pages provide more examples and samples that you can test and explore right now:</p><ul><li>Visit our <a href="https://engine.needle.tools/projects/ar-showcase/" target="_blank" rel="noopener noreferrer">AR Showcase Website</a> that has many interactive AR examples with a focus on iOS AR &amp; Quicklook</li><li><a href="https://engine.needle.tools/samples/?overlay=samples&amp;tag=everywhere+actions" target="_blank" rel="noopener noreferrer">Needle Engine Everywhere Action Samples</a></li></ul>`,16))])}const g=n(d,[["render",p]]),m=JSON.parse(`{"path":"/everywhere-actions.html","title":"Everywhere Actions","lang":"en-US","frontmatter":{"title":"Everywhere Actions","head":[["meta",{"name":"og:image","content":"https://engine.needle.tools/docs/.preview/everywhere actions.png"}],["meta",{"name":"og:description","content":"---\\nNeedle's Everywhere Actions are a set of carefully chosen components that allow you to create interactive experiences in Unity without writing a single line of code.\\nThey are designed to serve as building blocks for experiences across the web, mobile and XR, including Augmented Reality on iOS.\\nFrom low-level triggers and actions, higher-level complex interactive behaviours can be built."}]],"description":"---\\nNeedle's Everywhere Actions are a set of carefully chosen components that allow you to create interactive experiences in Unity without writing a single line of code.\\nThey are designed to serve as building blocks for experiences across the web, mobile and XR, including Augmented Reality on iOS.\\nFrom low-level triggers and actions, higher-level complex interactive behaviours can be built."},"headers":[{"level":2,"title":"What are Everywhere Actions?","slug":"what-are-everywhere-actions","link":"#what-are-everywhere-actions","children":[{"level":3,"title":"Supported Platforms","slug":"supported-platforms","link":"#supported-platforms","children":[]}]},{"level":2,"title":"How do I use Everywhere Actions?","slug":"how-do-i-use-everywhere-actions","link":"#how-do-i-use-everywhere-actions","children":[]},{"level":2,"title":"List of Everywhere Actions","slug":"list-of-everywhere-actions","link":"#list-of-everywhere-actions","children":[]},{"level":2,"title":"Samples","slug":"samples","link":"#samples","children":[{"level":3,"title":"Musical Instrument","slug":"musical-instrument","link":"#musical-instrument","children":[]},{"level":3,"title":"Simple Character Controllers","slug":"simple-character-controllers","link":"#simple-character-controllers","children":[]},{"level":3,"title":"Image Tracking","slug":"image-tracking","link":"#image-tracking","children":[]},{"level":3,"title":"Interactive Building Blocks Overview","slug":"interactive-building-blocks-overview","link":"#interactive-building-blocks-overview","children":[]}]},{"level":2,"title":"Create your own Everywhere Actions","slug":"create-your-own-everywhere-actions","link":"#create-your-own-everywhere-actions","children":[{"level":3,"title":"Code Example","slug":"code-example","link":"#code-example","children":[]},{"level":3,"title":"Low level methods for building your own actions","slug":"low-level-methods-for-building-your-own-actions","link":"#low-level-methods-for-building-your-own-actions","children":[]}]},{"level":2,"title":"Further reading","slug":"further-reading","link":"#further-reading","children":[]}],"git":{"updatedTime":1726585195000,"contributors":[{"name":"Felix Herbst","username":"","email":"felix.herbst@gmail.com","commits":3},{"name":"Marcel Wiessler","username":"","email":"marcel@gaisterhand.de","commits":3},{"name":"Krystof","username":"Krystof","email":"kipash612@gmail.com","commits":2,"url":"https://github.com/Krystof"}],"changelog":[{"hash":"0c64faf1313d420ba4c8c47435cd9876833c6805","time":1726585195000,"email":"felix.herbst@gmail.com","author":"Felix Herbst","message":"explicitly set twoslash on the scripts that work"},{"hash":"e3ea659903981023a9a441c71d568e9257d2a54c","time":1718696909000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update everywhere-actions.md"},{"hash":"777836d88cccad41a890bca296be5ede16fc809d","time":1707764568000,"email":"kipash612@gmail.com","author":"Krystof","message":"fix sample embeds' url","tag":"release/3.32.22-exp"},{"hash":"20a9090f8055720977d1963c6ef32ce84ae3066c","time":1694716356000,"email":"kipash612@gmail.com","author":"Krystof","message":"fix AR Image Marker url"},{"hash":"209cda4e06b6c96c4d8494627bc4b640728f39e1","time":1687530718000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"Everywhere Actions image tracking is WebXR Image Tracking"},{"hash":"335c49491215f9f41d68a966578a4696a22a89ff","time":1684678095000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"Add features, update export, update everywhere actions"},{"hash":"206d46ae21175852093a377b29f9addb404a3f56","time":1683903559000,"email":"felix.herbst@gmail.com","author":"Felix Herbst","message":"Add image marker image and download link"},{"hash":"62cb6d67ef87d54c0066fd319f12c9dfe797069a","time":1683902734000,"email":"felix.herbst@gmail.com","author":"Felix Herbst","message":"add first version of everywhere actions docs"}]},"filePathRelative":"everywhere-actions.md"}`);export{g as comp,m as data};
