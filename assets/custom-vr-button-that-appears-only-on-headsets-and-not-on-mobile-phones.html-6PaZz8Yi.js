import{_ as t,r as n,o as e,c as l,a as i,b as h,e as k}from"./app-DzhQqn-2.js";const p={};function o(r,s){const a=n("contribution-header");return e(),l("div",null,[s[0]||(s[0]=i("p",null,[i("a",{href:"/docs/community/contributions"},"Overview")],-1)),h(a,{url:"https://github.com/llllkatjallll",author:"llllkatjallll",page:"/docs/community/contributions/llllkatjallll",profileImage:"https://avatars.githubusercontent.com/u/38395689?s=100&u=7ce0fef973c4819c4f07823568d6f6061abfe410&v=4",githubUrl:"https://github.com/needle-tools/needle-engine-support/discussions/198",title:"Custom VR Button, that appears only on headsets and not on mobile phones",gradient:"True"}),s[1]||(s[1]=k(`<p>I combined two checks - Needle&#39;s check to see if it&#39;s a mobile device (this way, you can exclude desktops), and then a second check that uses user agent info to see if it&#39;s one of the most common mobile systems. Result: the button does not appear on mobile phones, but it is visible on Quest and Pico 🙂</p><p>P.S: I am using Svelte for 2D UI handling.</p><div class="language-ts" data-highlighter="shiki" data-ext="ts" data-title="ts" style="--shiki-light:#4c4f69;--shiki-dark:#c6d0f5;--shiki-light-bg:#eff1f5;--shiki-dark-bg:#303446;"><pre class="shiki shiki-themes catppuccin-latte catppuccin-frappe vp-code"><code><span class="line"><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">import</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> isMobileDevice</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> NeedleXRSession </span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">}</span><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;"> from</span><span style="--shiki-light:#40A02B;--shiki-dark:#A6D189;"> &quot;@needle-tools/engine&quot;</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#9CA0B0;--shiki-dark:#737994;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">// check if this is a mobile phone</span></span>
<span class="line"><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">function</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> isMobilePhone</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">()</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span></span>
<span class="line"><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">    return</span><span style="--shiki-light:#EA76CB;--shiki-dark:#F4B8E4;"> /</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">Mobi</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">|</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">Android</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">|</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">iPhone</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">|</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">iPad</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">|</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">iPod</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">|</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">BlackBerry</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">|</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">IEMobile</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">|</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">Opera Mini</span><span style="--shiki-light:#EA76CB;--shiki-dark:#F4B8E4;">/</span><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">i</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">test</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">(navigator</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">userAgent)</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">;</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#9CA0B0;--shiki-dark:#737994;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">// show the button, if the device is not a mobile phone and VR is supported</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">{</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">#</span><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">if</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  isMobileDevice</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">() </span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&amp;&amp;</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;"> !</span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">isMobilePhone</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">() </span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">&amp;&amp;</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> $haveVR </span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">}</span></span>
<span class="line"><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">    &lt;</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">VrButton buttonFunction</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">=</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">{</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">() =&gt; </span><span style="--shiki-light:#1E66F5;--shiki-dark:#8CAAEE;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">StartVR</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">()}</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">{</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">/</span><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">if</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">}</span></span></code></pre></div>`,3))])}const g=t(p,[["render",o],["__file","custom-vr-button-that-appears-only-on-headsets-and-not-on-mobile-phones.html.vue"]]),c=JSON.parse('{"path":"/community/contributions/llllkatjallll/custom-vr-button-that-appears-only-on-headsets-and-not-on-mobile-phones","title":"","lang":"en-US","frontmatter":{"head":[["meta",{"name":"og:image","content":"https://engine.needle.tools/docs/.preview/llllkatjallll: custom vr button that appears only on headsets and not on mobile phones.png"}],["meta",{"name":"og:description","content":"Needle Engine is a web-based runtime for 3D apps. It runs on your machine for development, and can be deployed anywhere. It is flexible, extensible, and collaboration and XR come naturally. Needle Exporter for Unity bridges the Unity Editor and the web runtime. It helps you to export your assets, animations, lightmaps and so on to the web. It is built around the glTF standard for 3D assets."}]],"description":"Needle Engine is a web-based runtime for 3D apps. It runs on your machine for development, and can be deployed anywhere. It is flexible, extensible, and collaboration and XR come naturally. Needle Exporter for Unity bridges the Unity Editor and the web runtime. It helps you to export your assets, animations, lightmaps and so on to the web. It is built around the glTF standard for 3D assets."},"headers":[],"git":{},"filePathRelative":null}');export{g as comp,c as data};