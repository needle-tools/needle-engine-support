import{_ as a,M as e,p as t,q as o,N as p,R as n,a1 as c}from"./framework-40b57650.js";const i={},l=n("p",null,[n("a",{href:"/docs/community/contributions"},"Overview")],-1),u=c(`<p>Add this class to your project to always open with Chrome instead of your default browser (Firefox in my case) when you click &quot;Play&quot; or &quot;Start Server&quot;. Note: This is an editor class and should either be put into an editor-only assembly or wrapped in <code>#if UNITY_EDITOR</code> and <code>#endif</code>.</p><div class="language-csharp line-numbers-mode" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">UnityEditor</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">UnityEngine</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Needle<span class="token punctuation">.</span>Engine</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">InitializeOnLoad</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">CustomBrowserOpen</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token function">CustomBrowserOpen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">RuntimeInitializeOnLoadMethod</span></span><span class="token punctuation">]</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ActionsBrowser<span class="token punctuation">.</span>BeforeOpen <span class="token operator">+=</span> ActionsBrowser_BeforeOpen<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ActionsBrowser_BeforeOpen</span><span class="token punctuation">(</span><span class="token class-name">ActionsBrowser<span class="token punctuation">.</span>OpenBrowserArguments</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        args<span class="token punctuation">.</span>PreventDefault <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> processArgs <span class="token operator">=</span> args<span class="token punctuation">.</span>Url<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> psi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ProcessStartInfo</span>
        <span class="token punctuation">{</span>
            FileName <span class="token operator">=</span> <span class="token string">&quot;chrome.exe&quot;</span><span class="token punctuation">,</span>
            Arguments <span class="token operator">=</span> processArgs
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        Process<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>psi<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function r(d,k){const s=e("contribution-header");return t(),o("div",null,[l,p(s,{url:"https://github.com/krisrok",author:"krisrok",page:"/docs/community/contributions/krisrok",profileImage:"https://avatars.githubusercontent.com/u/3404365?s=100&u=7025bf7e83b4a3cd72dc2cae9cec729080ee8970&v=4",githubUrl:"https://github.com/needle-tools/needle-engine-support/discussions/178",title:"Always open in specific browser",gradient:"True"}),u])}const m=a(i,[["render",r],["__file","index.html.vue"]]);export{m as default};
