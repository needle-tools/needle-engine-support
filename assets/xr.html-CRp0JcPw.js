import{_ as d,r as o,o as p,c as h,e as a,a as t,d as s,b as i,w as r}from"./app-DzhQqn-2.js";const c={};function u(g,e){const n=o("RouteLink"),l=o("sample");return p(),h("div",null,[e[34]||(e[34]=a('<h2 id="supported-devices" tabindex="-1"><a class="header-anchor" href="#supported-devices"><span>Supported Devices</span></a></h2><p>Theoretically all WebXR-capable devices and browsers should be supported. That being said, we&#39;ve tested the following configurations:</p><table><thead><tr><th>Tested VR Device</th><th>Browser</th><th>Notes</th></tr></thead><tbody><tr><td>Apple Vision Pro</td><td>✔️ Safari Browser</td><td>hand tracking, support for transient pointer</td></tr><tr><td>Meta Quest 1</td><td>✔️ Meta Browser</td><td>hand tracking, support for sessiongranted<sup>1</sup></td></tr><tr><td>Meta Quest 2</td><td>✔️ Meta Browser</td><td>hand tracking, support for sessiongranted<sup>1</sup>, passthrough (black and white)</td></tr><tr><td>Meta Quest 3</td><td>✔️ Meta Browser</td><td>hand tracking, support for sessiongranted<sup>1</sup>, passthrough, depth sensing, mesh tracking</td></tr><tr><td>Meta Quest Pro</td><td>✔️ Meta Browser</td><td>hand tracking, support for sessiongranted<sup>1</sup>, passthrough</td></tr><tr><td>Pico Neo 3</td><td>✔️ Pico Browser</td><td>no hand tracking, inverted controller thumbsticks</td></tr><tr><td>Pico Neo 4</td><td>✔️ Pico Browser</td><td>passthrough, hand tracking<sup>2</sup></td></tr><tr><td>Oculus Rift 1/2</td><td>✔️ Chrome</td><td></td></tr><tr><td>Hololens 2</td><td>✔️ Edge</td><td>hand tracking, support for AR and VR (in VR mode, background is rendered as well)</td></tr><tr><td>Looking Glass Portrait</td><td>✔️ Chrome</td><td>requires shim, see samples</td></tr></tbody></table>',3)),t("table",null,[e[11]||(e[11]=t("thead",null,[t("tr",null,[t("th",null,"Tested AR Device"),t("th",null,"Browser"),t("th",null,"Notes")])],-1)),t("tbody",null,[e[5]||(e[5]=t("tr",null,[t("td",null,"Android 10+"),t("td",null,"✔️ Chrome"),t("td")],-1)),e[6]||(e[6]=t("tr",null,[t("td",null,"Android 10+"),t("td",null,"✔️ Firefox"),t("td")],-1)),e[7]||(e[7]=t("tr",null,[t("td",null,"iOS 15+"),t("td",null,"✔️ WebXR Viewer"),t("td",null,"does not fully implement standards, but supported")],-1)),t("tr",null,[e[3]||(e[3]=t("td",null,"iOS 15+",-1)),e[4]||(e[4]=t("td",null,[s("(✔️)"),t("sup",null,"3"),s(" Safari")],-1)),t("td",null,[e[1]||(e[1]=s("No full code support, but Needle ")),i(n,{to:"/everywhere-actions.html"},{default:r(()=>e[0]||(e[0]=[s("Everywhere Actions")])),_:1}),e[2]||(e[2]=s(" are supported for creating dynamic, interactive USDZ files."))])]),e[8]||(e[8]=t("tr",null,[t("td",null,"Hololens 2"),t("td",null,"✔️ Edge"),t("td")],-1)),e[9]||(e[9]=t("tr",null,[t("td",null,"Hololens 1"),t("td",null,"❌"),t("td",null,"no WebXR support")],-1)),e[10]||(e[10]=t("tr",null,[t("td",null,"Magic Leap 2"),t("td",null,"✔️"),t("td")],-1))])]),e[35]||(e[35]=t("table",null,[t("thead",null,[t("tr",null,[t("th",null,"Not Tested but Should Work™️"),t("th",null,"Browser"),t("th",null,"Notes")])]),t("tbody",null,[t("tr",null,[t("td",null,"Magic Leap 1"),t("td"),t("td",null,"please let us know if you tried!")])])],-1)),t("p",null,[e[13]||(e[13]=t("sup",null,"1",-1)),e[14]||(e[14]=s(": Requires enabling a browser flag: ")),e[15]||(e[15]=t("code",null,"chrome://flags/#webxr-navigation-permission",-1)),e[16]||(e[16]=t("br",null,null,-1)),e[17]||(e[17]=t("sup",null,"2",-1)),e[18]||(e[18]=s(": Requires enabling a toggle in the Developer settings")),e[19]||(e[19]=t("br",null,null,-1)),e[20]||(e[20]=t("sup",null,"3",-1)),e[21]||(e[21]=s(": Uses ")),i(n,{to:"/everywhere-actions.html"},{default:r(()=>e[12]||(e[12]=[s("Everywhere Actions")])),_:1}),e[22]||(e[22]=s(" or ")),e[23]||(e[23]=t("a",{href:"#augmented-reality-and-webxr-on-ios"},"other approaches",-1))]),e[36]||(e[36]=a('<h2 id="examples" tabindex="-1"><a class="header-anchor" href="#examples"><span>Examples</span></a></h2><p>Visit our <a href="https://engine.needle.tools/samples/?overlay=samples&amp;tag=xr" target="_blank" rel="noopener noreferrer">Needle Engine XR Samples</a> to try many interactive examples right now!</p><h2 id="adding-vr-and-ar-capabilities-to-a-scene" tabindex="-1"><a class="header-anchor" href="#adding-vr-and-ar-capabilities-to-a-scene"><span>Adding VR and AR capabilities to a scene</span></a></h2><p>AR, VR and networking capabilites in Needle Engine are designed to be modular. You can choose to not support any of them, or add only specific features.</p><h3 id="basic-capabilities" tabindex="-1"><a class="header-anchor" href="#basic-capabilities"><span>Basic capabilities</span></a></h3><ul><li><p><strong>Enable AR and VR</strong><br> Add a <code>WebXR</code> component.<br><em>Optional:</em> you can set a custom avatar by referencing an <a href="#avatars">Avatar Prefab</a>.<br> By default a very basic <code>DefaultAvatar</code> is assigned.</p></li><li><p><strong>Enable Teleportation</strong><br> Add a <code>TeleportTarget</code> component to object hierarchies that can be teleported on.<br> To exclude specific objects, set their layer to <code>IgnoreRaycasting</code>.</p></li></ul><h3 id="multiplayer" tabindex="-1"><a class="header-anchor" href="#multiplayer"><span>Multiplayer</span></a></h3><ul><li><p><strong>Enable Networking</strong><br> Add a <code>SyncedRoom</code> component.</p></li><li><p><strong>Enable Desktop Viewer Sync</strong><br> Add a <code>SyncedCamera</code> component.</p></li><li><p><strong>Enable Voice Chat</strong><br> Add a <code>VoIP</code> component.</p></li></ul><blockquote><p><strong>Note</strong>: these components can be anywhere inside your <code>GltfObject</code> hierarchy. They can also all be on the same GameObject.</p></blockquote><blockquote><p><strong><a href="https://castle.needle.tools/" target="_blank" rel="noopener noreferrer">Castle Builder</a></strong> uses all of the above for a cross-platform multiplayer sandbox experience.<br> — #madebyneedle 💚</p></blockquote><h3 id="special-ar-components" tabindex="-1"><a class="header-anchor" href="#special-ar-components"><span>Special AR Components</span></a></h3><ul><li><strong>Define the AR Session Root and Scale</strong><br> Add a <code>WebARSessionRoot</code> component to your root object.<br> Here you can define the user scale to shrink (&lt; 1) or enlarge (&gt; 1) the user in relation to the scene when entering AR.</li></ul><h3 id="controlling-object-display-for-xr" tabindex="-1"><a class="header-anchor" href="#controlling-object-display-for-xr"><span>Controlling object display for XR</span></a></h3><ul><li><p><strong>Define whether an object is visible in Browser, AR, VR, First Person, Third Person</strong><br> Add a <code>XR Flag</code> component to the object you want to control. Change options on the dropdown as needed.</p><p>Common usecases are</p><ul><li>hiding floors when entering AR</li><li>hiding Avatar parts in First or Third Person views (e.g. first-person head shouldn&#39;t be visible).</li></ul></li></ul><h3 id="travelling-between-vr-worlds" tabindex="-1"><a class="header-anchor" href="#travelling-between-vr-worlds"><span>Travelling between VR worlds</span></a></h3><p>Needle Engine supports the <a href="https://github.com/immersive-web/navigation" target="_blank" rel="noopener noreferrer"><code>sessiongranted</code></a> state. This allows users to seamlessly traverse between WebXR applications without leaving an immersive session – they stay in VR or AR.</p><p>Currently, this is only supported on Oculus Quest 1, 2 and 3 in the Oculus Browser. On other platforms, users will be kicked out of their current immersive session and have to enter VR again on the new page.<br> Requires enabling a browser flag: <code>chrome://flags/#webxr-navigation-permission</code></p><ul><li><strong>Click on objects to open links</strong><br> Add the <code>OpenURL</code> component that makes it very easy to build connected worlds.</li></ul><h2 id="scripting" tabindex="-1"><a class="header-anchor" href="#scripting"><span>Scripting</span></a></h2>',19)),t("p",null,[e[25]||(e[25]=s("Read more about scripting for XR at the ")),i(n,{to:"/scripting.html#xr-event-methods"},{default:r(()=>e[24]||(e[24]=[s("scripting XR documentation")])),_:1})]),e[37]||(e[37]=a(`<h2 id="avatars" tabindex="-1"><a class="header-anchor" href="#avatars"><span>Avatars</span></a></h2><p>While we don&#39;t currently provide an out-of-the-box integration external avatar systems, you can create application-specific avatars or custom systems.</p><ul><li><strong>Create a custom Avatar</strong><ul><li>Create an empty GameObject as avatar root</li><li>Add an object named <code>Head</code> and add a <code>XRFlag</code> that&#39;s set to Third Person</li><li>Add objects named <code>HandLeft</code> and <code>HandRight</code></li><li>Add your graphics below these objects.</li></ul></li></ul><h3 id="experimental-avatar-components" tabindex="-1"><a class="header-anchor" href="#experimental-avatar-components"><span>Experimental Avatar Components</span></a></h3><p>There&#39;s a number of experimental components to build more expressive Avatars. At this point we recommended duplicating them to make your own variants, since they might be changed or removed at a later point.</p><p><img src="https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif" alt="20220817-230858-87dG-Unity_PLjQ"><br><em>Example Avatar Rig with basic neck model and limb constraints</em></p><ul><li><p><strong>Random Player Colors</strong><br> As an example for avatar customization, you can add a <code>PlayerColor</code> component to your renderers.<br> This randomized color is synchronized between players.</p></li><li><p><strong>Eye Rotation</strong><br><code>AvatarEyeLook_Rotation</code> rotates GameObjects (eyes) to follow other avatars and a random target. This component is synchronized between players.</p></li><li><p><strong>Eye Blinking</strong><br><code>AvatarBlink_Simple</code> randomly hides GameObjects (eyes) every few seconds, emulating a blink.</p><p><img src="https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png" alt="image"><br><em>Example Avatar Prefab hierarchy</em></p></li><li><p><strong>Offset Constraint</strong><br><code>OffsetConstraint</code> allows to shift an object in relation to another one in Avatar space. This allows, for example, to have a Body follow the Head but keep rotation levelled. It also allows to construct simple neck models.</p></li><li><p><strong>Limb Constraint</strong><br><code>BasicIKConstraint</code> is a very minimalistic constraint that takes two transforms and a hint. This is useful to construct simple arm or leg chains. As rotation is currently not properly implemented, arms and legs may need to be rotationally symmetric to &quot;look right&quot;. It&#39;s called &quot;Basic&quot; for a reason!</p></li></ul><h2 id="html-content-overlays-in-ar" tabindex="-1"><a class="header-anchor" href="#html-content-overlays-in-ar"><span>HTML Content Overlays in AR</span></a></h2><p>If you want to display different html content whether the client is using a regular browser or using AR or VR, you can just use a set of html classes.<br> This is controlled via HTML element classes. For example, to make content appear on desktop and in AR add a <code>&lt;div class=&quot;desktop ar&quot;&gt; ... &lt;/div&gt;</code> inside the <code>&lt;needle-engine&gt;</code> tag:</p><div class="language-html" data-highlighter="shiki" data-ext="html" data-title="html" style="--shiki-light:#4c4f69;--shiki-dark:#c6d0f5;--shiki-light-bg:#eff1f5;--shiki-dark-bg:#303446;"><pre class="shiki shiki-themes catppuccin-latte catppuccin-frappe vp-code"><code><span class="line"><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&lt;</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;">needle-engine</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">    &lt;</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;">div</span><span style="--shiki-light:#DF8E1D;--shiki-dark:#E5C890;"> class</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">=</span><span style="--shiki-light:#40A02B;--shiki-dark:#A6D189;">&quot;desktop ar&quot;</span><span style="--shiki-light:#DF8E1D;--shiki-dark:#E5C890;"> style</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">=</span><span style="--shiki-light:#40A02B;--shiki-dark:#A6D189;">&quot;</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">pointer-events:none;&quot;</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">        &lt;</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;">div</span><span style="--shiki-light:#DF8E1D;--shiki-dark:#E5C890;"> class</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">=</span><span style="--shiki-light:#40A02B;--shiki-dark:#A6D189;">&quot;positioning-container&quot;</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">          &lt;</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;">p</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&gt;</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">your content for AR and desktop goes here</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&lt;/</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;">p</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">          &lt;</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;">p</span><span style="--shiki-light:#DF8E1D;--shiki-dark:#E5C890;"> class</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">=</span><span style="--shiki-light:#40A02B;--shiki-dark:#A6D189;">&quot;only-in-ar&quot;</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&gt;</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">This will only be visible in AR</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&lt;/</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;">p</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">        &lt;</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;">div</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">    &lt;/</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;">div</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&lt;/</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;">needle-engine</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&gt;</span></span></code></pre></div><p>Content Overlays are implemented using the optional <code>dom-overlay</code> feature which is usually supported on screen-based AR devices (phones, tablets).</p><p>Use the <code>.ar-session-active</code> class to show/hide specific content while in AR. The <a href="https://www.w3.org/TR/webxr-dom-overlays-1/#css-pseudo-class" target="_blank" rel="noopener noreferrer"><code>:xr-overlay</code> pseudo class</a> shouldn&#39;t be used at this point because using it breaks Mozilla&#39;s WebXR Viewer.</p><div class="language-css" data-highlighter="shiki" data-ext="css" data-title="css" style="--shiki-light:#4c4f69;--shiki-dark:#c6d0f5;--shiki-light-bg:#eff1f5;--shiki-dark-bg:#303446;"><pre class="shiki shiki-themes catppuccin-latte catppuccin-frappe vp-code"><code><span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">.</span><span style="--shiki-light:#DF8E1D;--shiki-dark:#E5C890;">only-in-ar</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span></span>
<span class="line"><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;">  display</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">:</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> none</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">;</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">.</span><span style="--shiki-light:#DF8E1D;--shiki-dark:#E5C890;">ar-session-active</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> .</span><span style="--shiki-light:#DF8E1D;--shiki-dark:#E5C890;">only-in-ar</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span></span>
<span class="line"><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;">  display</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">:</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">initial</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">;</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">}</span></span></code></pre></div><p>It&#39;s worth noting that the overlay element <a href="https://www.w3.org/TR/webxr-dom-overlays-1/#ua-style-sheet-defaults" target="_blank" rel="noopener noreferrer">will be always displayed fullscreen while in XR</a>, independent of styling that has been applied. If you want to align items differently, you should make a container <em>inside</em> the <code>class=&quot;ar&quot;</code> element.</p>`,14)),i(l,{src:"https://engine.needle.tools/samples-uploads/ar-overlay/"}),e[38]||(e[38]=a('<h2 id="image-tracking" tabindex="-1"><a class="header-anchor" href="#image-tracking"><span>Image Tracking</span></a></h2><p>Needle Engine supports <strong>WebXR ImageTracking</strong> (<a href="https://engine.needle.tools/samples/image-tracking?utm_source=docs&amp;utm_content=xr" target="_blank" rel="noopener noreferrer">Live Demo</a>)<br><em>Note</em>: While WebXR ImageTracking is still in &quot;draft&quot; phase (<a href="https://github.com/immersive-web/marker-tracking/blob/main/explainer.md" target="_blank" rel="noopener noreferrer">Marker Tracking Explainer</a>)<br> you need to follow these steps to enable WebXR ImageTracking on Android devices:</p><ul><li>Enable <code>WebXR Incubations</code> in chrome</li><li>Add the <code>WebXRImageTracking</code> component</li></ul>',3)),t("p",null,[e[27]||(e[27]=s("You can find additional documentation in the ")),i(n,{to:"/everywhere-actions.html#image-tracking"},{default:r(()=>e[26]||(e[26]=[s("Everywhere Actions")])),_:1}),e[28]||(e[28]=s(" section"))]),e[39]||(e[39]=a('<p>Without that spec, one can still request camera image access and run custom algorithms to determine device pose.<br> Libraries to add image tracking:</p><ul><li><a href="https://github.com/AR-js-org/AR.js" target="_blank" rel="noopener noreferrer">AR.js</a> (open source)</li><li><a href="https://github.com/hiukim/mind-ar-js" target="_blank" rel="noopener noreferrer">Mind AR</a> (open source)</li><li><a href="https://github.com/FireDragonGameStudio/NeedleAndARjs" target="_blank" rel="noopener noreferrer">Experimental AR.js integration with Needle Engine</a> by FireDragonGameStudio</li></ul><h2 id="augmented-reality-and-webxr-on-ios" tabindex="-1"><a class="header-anchor" href="#augmented-reality-and-webxr-on-ios"><span>Augmented Reality and WebXR on iOS</span></a></h2><p>Augmented Reality experiences on iOS are somewhat limited, due to Apple currently not supporting WebXR on iOS devices.</p>',4)),t("p",null,[e[31]||(e[31]=s("Needle Engine's ")),i(n,{to:"/everywhere-actions.html"},{default:r(()=>e[29]||(e[29]=[s("Everywhere Actions")])),_:1}),e[32]||(e[32]=s(" are designed to fill that gap, bringing automatic interactive capabilities to iOS devices for scenes composed of specific components. They support a subset of the functionality that's available in WebXR, for example spatial audio, image tracking, animations, and more. See ")),i(n,{to:"/everywhere-actions.html"},{default:r(()=>e[30]||(e[30]=[s("the docs")])),_:1}),e[33]||(e[33]=s(" for more information."))]),e[40]||(e[40]=t("h3",{id:"musical-instrument-webxr-and-quicklook-support",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#musical-instrument-webxr-and-quicklook-support"},[t("span",null,"Musical Instrument – WebXR and QuickLook support")])],-1)),e[41]||(e[41]=t("p",null,"Here's an example for a musical instrument that uses Everywhere Actions and thus works in browsers and in AR on iOS devices. It uses spatial audio, animation, and tap interactions.",-1)),i(l,{src:"https://engine.needle.tools/samples-uploads/musical-instrument"}),e[42]||(e[42]=a('<h3 id="everywhere-actions-and-other-options-for-ios-ar" tabindex="-1"><a class="header-anchor" href="#everywhere-actions-and-other-options-for-ios-ar"><span>Everywhere Actions and other options for iOS AR</span></a></h3><p>There&#39;s also other options for guiding iOS users to even more capable interactive AR experiences:</p><ol start="3"><li><strong>Exporting content on-the-fly as USDZ files.</strong><br> These files can be displayed on iOS devices in AR. When exported from scenes with Everywhere Actions the interactivity is the same, more than sufficient for product configurators, narrative experiences and similar. An example is <a href="https://castle.needle.tools" target="_blank" rel="noopener noreferrer">Castle Builder</a> where creations (not the live session) can be viewed in AR.</li></ol><blockquote><p><strong><a href="https://accurate-tree-observation.glitch.me/" target="_blank" rel="noopener noreferrer">Encryption in Space</a></strong> uses this approach. Players can collaboratively place text into the scene on their screens and then view the results in AR on iOS. On Android, they can also interact right in WebXR.<br> — #madewithneedle by Katja Rempel 💚</p></blockquote><ol><li><p><strong>Guiding users towards WebXR-compatible browsers on iOS.</strong> Depending on your target audience, you can guide users on iOS towards for example Mozilla&#39;s <a href="https://apps.apple.com/de/app/webxr-viewer/id1295998056" target="_blank" rel="noopener noreferrer">WebXR Viewer</a> to experience AR on iOS.</p></li><li><p><strong>Using camera access and custom algorithms on iOS devices.</strong><br> One can request camera image access and run custom algorithms to determine device pose.<br> While we currently don&#39;t provide built-in components for this, here&#39;s a few references to libraries and frameworks that we want to try in the future:</p><ul><li><a href="https://github.com/AR-js-org/AR.js" target="_blank" rel="noopener noreferrer">AR.js</a> (open source) <ul><li><a href="https://github.com/FireDragonGameStudio/NeedleAndARjs" target="_blank" rel="noopener noreferrer">Experimental AR.js integration</a> by FireDragonGameStudio</li></ul></li><li><a href="https://github.com/hiukim/mind-ar-js" target="_blank" rel="noopener noreferrer">Mind AR</a> (open source)</li><li><a href="https://www.8thwall.com/" target="_blank" rel="noopener noreferrer">8th Wall</a> (commercial)</li></ul></li></ol><h2 id="references" tabindex="-1"><a class="header-anchor" href="#references"><span>References</span></a></h2><p><a href="https://www.w3.org/TR/webxr/" target="_blank" rel="noopener noreferrer">WebXR Device API</a><br><a href="https://caniuse.com/webxr" target="_blank" rel="noopener noreferrer">caniuse: WebXR</a><br><a href="https://developer.apple.com/augmented-reality/quick-look/" target="_blank" rel="noopener noreferrer">Apple&#39;s Preliminary USD Behaviours</a></p>',7))])}const m=d(c,[["render",u],["__file","xr.html.vue"]]),b=JSON.parse(`{"path":"/xr.html","title":"VR & AR (WebXR)","lang":"en-US","frontmatter":{"title":"VR & AR (WebXR)","head":[["meta",{"name":"og:image","content":"https://engine.needle.tools/docs/.preview/vr & ar.png"}],["meta",{"name":"og:description","content":"---\\nTheoretically all WebXR-capable devices and browsers should be supported. That being said, we've tested the following configurations:"}]],"description":"---\\nTheoretically all WebXR-capable devices and browsers should be supported. That being said, we've tested the following configurations:"},"headers":[{"level":2,"title":"Supported Devices","slug":"supported-devices","link":"#supported-devices","children":[]},{"level":2,"title":"Examples","slug":"examples","link":"#examples","children":[]},{"level":2,"title":"Adding VR and AR capabilities to a scene","slug":"adding-vr-and-ar-capabilities-to-a-scene","link":"#adding-vr-and-ar-capabilities-to-a-scene","children":[{"level":3,"title":"Basic capabilities","slug":"basic-capabilities","link":"#basic-capabilities","children":[]},{"level":3,"title":"Multiplayer","slug":"multiplayer","link":"#multiplayer","children":[]},{"level":3,"title":"Special AR Components","slug":"special-ar-components","link":"#special-ar-components","children":[]},{"level":3,"title":"Controlling object display for XR","slug":"controlling-object-display-for-xr","link":"#controlling-object-display-for-xr","children":[]},{"level":3,"title":"Travelling between VR worlds","slug":"travelling-between-vr-worlds","link":"#travelling-between-vr-worlds","children":[]}]},{"level":2,"title":"Scripting","slug":"scripting","link":"#scripting","children":[]},{"level":2,"title":"Avatars","slug":"avatars","link":"#avatars","children":[{"level":3,"title":"Experimental Avatar Components","slug":"experimental-avatar-components","link":"#experimental-avatar-components","children":[]}]},{"level":2,"title":"HTML Content Overlays in AR","slug":"html-content-overlays-in-ar","link":"#html-content-overlays-in-ar","children":[]},{"level":2,"title":"Image Tracking","slug":"image-tracking","link":"#image-tracking","children":[]},{"level":2,"title":"Augmented Reality and WebXR on iOS","slug":"augmented-reality-and-webxr-on-ios","link":"#augmented-reality-and-webxr-on-ios","children":[{"level":3,"title":"Musical Instrument – WebXR and QuickLook support","slug":"musical-instrument-webxr-and-quicklook-support","link":"#musical-instrument-webxr-and-quicklook-support","children":[]},{"level":3,"title":"Everywhere Actions and other options for iOS AR","slug":"everywhere-actions-and-other-options-for-ios-ar","link":"#everywhere-actions-and-other-options-for-ios-ar","children":[]}]},{"level":2,"title":"References","slug":"references","link":"#references","children":[]}],"git":{"updatedTime":1726086775000},"filePathRelative":"xr.md"}`);export{m as comp,b as data};