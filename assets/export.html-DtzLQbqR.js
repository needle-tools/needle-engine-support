import{_ as i,c as n,e as t,a as r,d as a,b as o,w as l,r as d,o as h}from"./app-B4MxFGS_.js";const c={};function p(m,e){const s=d("RouteLink");return h(),n("div",null,[e[3]||(e[3]=t('<h1 id="exporting-assets-animations-prefabs-materials-lightmaps..." tabindex="-1"><a class="header-anchor" href="#exporting-assets-animations-prefabs-materials-lightmaps..."><span>Exporting Assets, Animations, Prefabs, Materials, Lightmaps...</span></a></h1><p>Add an <code>ExportInfo</code> component to your Unity scene to generate a new web project from a template, link to an existing web project that you want to export to, set up dependencies to other libraries and packages and to deploy your project.</p><p>By default, your scene is exported on save. This setting can be changed by disabling <code>Auto Export</code> in the <code>ExportInfo</code> component.</p><h2 id="exporting-gltf-files" tabindex="-1"><a class="header-anchor" href="#exporting-gltf-files"><span>📦 Exporting glTF files</span></a></h2><p>To export meshes, materials, animations, textures (...) create a new GameObject in your hierarchy and add a <code>GltfObject</code> component to it. This is the root of a new glTF file. It will be exported whenever you make a change to the scene and save.</p><p>Only scripts and data on and inside those root objects is exported. Scripts and data outside of them are not exported.</p><p>Add a cube as a child of your root object and save your scene. Note that the output <code>assets/</code> folder (see <a href="#vite-project-structure">project structure</a>) now contains a new <code>.glb</code> file with the same name as your root GameObject.</p><p>You can enable the <code>Smart Export</code> setting (via <code>Edit/Project Settings/Needle</code> ) to only export when a change in this object&#39;s hierarchy is detected.</p><details class="hint-container details"><summary>How to prevent specific objects from being exported</summary><p>Objects with the <code>EditorOnly</code> tag will be ignored on export including their child hierarchy.<br> Be aware that this is preferred over disabling objects as disabled will still get exported in case they&#39;re turned on later.</p></details><h3 id="lazy-loading-and-multiple-levels-scenes" tabindex="-1"><a class="header-anchor" href="#lazy-loading-and-multiple-levels-scenes"><span>Lazy loading and multiple levels / scenes</span></a></h3><p>If you want to split up your application into multiple levels or scenes then you can simply use the <code>SceneSwitcher</code> component. You can then structure your application into multiple scenes or prefabs and add them to the SceneSwitcher array to be loaded and unloaded at runtime. This is a great way to avoid having to load all your content upfront and to keep loading times small (for example it is what we did on <a href="https://needle.tools?utm_source=needle_docs&amp;utm_content=export_scenes" target="_blank" rel="noopener noreferrer">needle.tools</a> by separating each section of your website into its own scene and only loading them when necessary)</p><h3 id="recommended-complexity-per-gltf" tabindex="-1"><a class="header-anchor" href="#recommended-complexity-per-gltf"><span>Recommended Complexity per glTF</span></a></h3><ul><li>Max. 50 MB export size uncompressed (usually ends up ~10-20 MB compressed)</li><li>Max. 500k vertices (less if you target mobile VR as well)</li><li>Max. 4x 2k lightmaps</li></ul>',13)),r("p",null,[e[1]||(e[1]=a("You can split up scenes and prefabs into multiple glTF files, and then load those on demand (only when needed). This keeps loading performance fast and file size small. See the ")),o(s,{to:"/scripting.html#assetreference-and-addressables"},{default:l(()=>e[0]||(e[0]=[a("AssetReference section in the Scripting docs")])),_:1}),e[2]||(e[2]=a("."))]),e[4]||(e[4]=t(`<p>The scene complexity here is recommended to ensure good performance across a range of web-capable devices and bandwidths. There&#39;s no technical limitation to this beyond the capabilities of your device.</p><h3 id="prefabs" tabindex="-1"><a class="header-anchor" href="#prefabs"><span>Prefabs</span></a></h3><p>Prefabs can be exported as invidual glTF files and instantiated at runtime. To export a prefab as glTF just reference a prefab asset (from the project browser and not in the scene) <a href="https://fwd.needle.tools/needle-engine/docs/addressables" target="_blank" rel="noopener noreferrer">from one of your scripts</a>.</p><p>Exporting Prefabs works with nesting too: a component in a Prefab can reference another Prefab which will then also be exported.<br> This mechanism allows for composing scenes to be as lightweight as possible and loading the most important content first and defer loading of additional content.</p><h3 id="scene-assets" tabindex="-1"><a class="header-anchor" href="#scene-assets"><span>Scene Assets</span></a></h3><p>Similar to Prefab assets, you can reference other Scene assets.<br> To get started, create a component in Unity with a <code>UnityEditor.SceneAsset</code> field and add it to one of your GameObjects inside a GltfObject. The referenced scene will now be exported as a separate glTF file and can be loaded/deserialized as a <code>AssetReference</code> from TypeScript.</p><p>You can keep working inside a referenced scene and still update your main exporter scene/website. On scene save or play mode change we will detect if the current scene is being used by your currently running server and then trigger a re-export for only that glb. (This check is done by name - if a glb inside your <code>&lt;web_project&gt;/assets/</code> folder exists, it is exported again and the main scene reloads it.)</p><p>As an example on <a href="https://needle.tools?utm_source=needle_docs&amp;utm_content=export_sceneassets" target="_blank" rel="noopener noreferrer">our website</a> each section is setup as a separate scene and on export packed into multiple glb files that we load on demand:</p><p><img src="https://user-images.githubusercontent.com/5083203/185958983-71913c97-5eec-4cfd-99f5-76798582373e.png" alt="2022-08-22-172605_Needle_Website_-Website-_Windows,_Mac,Linux-_U"></p><h4 id="loading-a-prefab-or-scene-from-a-custom-script" tabindex="-1"><a class="header-anchor" href="#loading-a-prefab-or-scene-from-a-custom-script"><span>Loading a Prefab or Scene from a custom script</span></a></h4><p>If you want to reference and load a prefab from one of your scripts you can declare a <code>AssetReference</code> type.<br> Here is a minimal example:</p><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#4c4f69;--shiki-dark:#c6d0f5;--shiki-light-bg:#eff1f5;--shiki-dark-bg:#303446;"><pre class="shiki shiki-themes catppuccin-latte catppuccin-frappe vp-code"><code><span class="line"><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">import</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> Behaviour</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> serializable</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">,</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> AssetReference </span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">}</span><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;"> from</span><span style="--shiki-light:#40A02B;--shiki-dark:#A6D189;"> &quot;@needle-tools/engine&quot;</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">export</span><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;"> class</span><span style="--shiki-light:#DF8E1D;--shiki-light-font-style:italic;--shiki-dark:#E5C890;--shiki-dark-font-style:italic;"> MyClass</span><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;"> extends</span><span style="--shiki-light:#DF8E1D;--shiki-light-font-style:italic;--shiki-dark:#E5C890;--shiki-dark-font-style:italic;"> Behaviour</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#949CBB;--shiki-dark-font-style:italic;">    // if you export a prefab or scene as a reference from Unity you&#39;ll get a path to that asset</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#949CBB;--shiki-dark-font-style:italic;">    // which you can de-serialize to AssetReference for convenient loading</span></span>
<span class="line"><span style="--shiki-light:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#8CAAEE;--shiki-dark-font-style:italic;">    @serializable</span><span style="--shiki-light:#FE640B;--shiki-dark:#EF9F76;">(</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">AssetReference</span><span style="--shiki-light:#FE640B;--shiki-dark:#EF9F76;">)</span></span>
<span class="line"><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">    myPrefab</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">?:</span><span style="--shiki-light:#DF8E1D;--shiki-light-font-style:italic;--shiki-dark:#E5C890;--shiki-dark-font-style:italic;"> AssetReference</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">;</span></span>
<span class="line"><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">    </span></span>
<span class="line"><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">    async</span><span style="--shiki-light:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#8CAAEE;--shiki-dark-font-style:italic;"> start</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">()</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;"> {</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#949CBB;--shiki-dark-font-style:italic;">      // directly instantiate</span></span>
<span class="line"><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;">      const</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;"> myInstance </span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">=</span><span style="--shiki-light:#8839EF;--shiki-dark:#CA9EE6;"> await</span><span style="--shiki-light:#D20F39;--shiki-dark:#E78284;"> this</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">.</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">myPrefab</span><span style="--shiki-light:#179299;--shiki-dark:#81C8BE;">?.</span><span style="--shiki-light:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#8CAAEE;--shiki-dark-font-style:italic;">instantiate</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">()</span><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#949CBB;--shiki-dark-font-style:italic;">      // you can also just load and instantiate later</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#949CBB;--shiki-dark-font-style:italic;">      // const myInstance = await this.myPrefab.loadAssetAsync();</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#949CBB;--shiki-dark-font-style:italic;">      // this.gameObject.add(myInstance)</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#949CBB;--shiki-dark-font-style:italic;">      // this is useful if you know that you want to load this asset only once because it will not create a copy</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#949CBB;--shiki-dark-font-style:italic;">      // since \`\`instantiate()\`\` does create a copy of the asset after loading it</span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">    }</span><span style="--shiki-light:#4C4F69;--shiki-dark:#C6D0F5;">  </span></span>
<span class="line"><span style="--shiki-light:#7C7F93;--shiki-dark:#949CBB;">}</span></span></code></pre></div><h2 id="exporting-animations" tabindex="-1"><a class="header-anchor" href="#exporting-animations"><span>🏇 Exporting Animations</span></a></h2><p>Needle Engine supports a considerable and powerful subset of Unity&#39;s animation features:</p><ul><li><strong>Timeline</strong> incl. activation tracks, animation tracks, track offsets</li><li><strong>Animator</strong> incl. top-level state transitions <ul><li>Blend trees are currently not supported.</li><li>Sub state machines are currently not supported.</li></ul></li><li><strong>AnimationClips</strong> incl. Loop modes</li><li><strong>Procedural Animations</strong> can be created via scripting</li></ul><p>Needle Engine is one of the first to support the new <a href="https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer" target="_blank" rel="noopener noreferrer">glTF extension KHR_ANIMATION_POINTER</a>.<br> This means that almost all properties, including script variables, are animatable.</p><p>One current limitation is that materials won&#39;t be duplicated on export — if you want to animate the same material with different colors, for example, you currently need to split the material in two.</p><h2 id="exporting-the-skybox" tabindex="-1"><a class="header-anchor" href="#exporting-the-skybox"><span>🌍 Exporting the Skybox</span></a></h2><p>The Unity skybox and custom reflection (if any) are baked into a texture on export and automatically exported inside the <code>NEEDLE_lightmaps</code> extension.</p><p>To change the skybox resolution you can add a <code>SkyboxExportSettings</code> component to your scene.</p><p><img src="https://user-images.githubusercontent.com/5083203/196030839-170a9496-9ed9-4ebc-bc1d-2df6c746f8c8.png" alt="image"></p><p>If you don&#39;t want to skybox to be exported at all in a glb file you can untick the <code>Embed Skybox</code> option on your <code>GltfObject</code> component</p><p><img src="https://user-images.githubusercontent.com/5083203/196030825-8a05037f-5acc-4795-9128-2bdacedd0d49.png" alt="image"></p><h2 id="exporting-materials" tabindex="-1"><a class="header-anchor" href="#exporting-materials"><span>✨ Exporting Materials</span></a></h2><h3 id="physically-based-materials-pbr" tabindex="-1"><a class="header-anchor" href="#physically-based-materials-pbr"><span>Physically Based Materials (PBR)</span></a></h3><p>By default, materials are converted into glTF materials on export. glTF supports a physically based material model and has a number of extensions that help to represent complex materials.</p><p>For full control over what gets exported, it&#39;s highly recommended to use the glTF materials provided by UnityGltf:</p><ul><li>PBRGraph</li><li>UnlitGraph</li></ul><div class="hint-container tip"><p class="hint-container-title">When in doubt, use the PBRGraph shader</p><p>The PBRGraph material has a lot of features, way more than Standard or URP/Lit. These include advanced features like refraction, iridescence, sheen, and more. Additionally, materials using PBRGraph and UnlitGraph are exported as-is, with no conversion necessary.</p></div><p>Materials that can be converted out-of-the-box:</p><ul><li>BiRP/Standard</li><li>BiRP/Autodesk Interactive</li><li>BiRP/Unlit</li><li>URP/Lit</li><li>URP/Unlit</li></ul><p>Other materials are converted using a propery name heuristic. That means that depending on what property names your materials and shaders use, you might want to either refactor your custom shader&#39;s properties to use the property names of either URP/Lit or PBRGraph, or export the material as <a href="#custom-shaders">Custom Shader</a>.</p><h3 id="custom-shaders" tabindex="-1"><a class="header-anchor" href="#custom-shaders"><span>Custom Shaders</span></a></h3><p>To export custom unlit shaders (for example made with ShaderGraph), add an <code>ExportShader</code> Asset Label to the shader you want to export. Asset Labels can be seen at the bottom of the Inspector window.</p><p><img src="https://user-images.githubusercontent.com/5083203/185957781-9fae18c5-09ff-490f-8958-57e138aa0003.png" alt="2022-08-22-172029_Needle_Website_-CustomShaders-_Windows,_Mac,_Lin"></p><h4 id="limitations" tabindex="-1"><a class="header-anchor" href="#limitations"><span>Limitations</span></a></h4><ul><li>We currently only support custom <strong>Unlit</strong> shaders — Lit shader conversion is not officially supported.</li><li>Custom Lit Shaders are currently experimental. Not all rendering modes are supported.</li><li>Shadow receiving on custom shaders is not supported</li><li>Skinned meshes with custom shaders are not supported</li><li>As there&#39;s multiple coordinate system changes when going from Unity to three.js and glTF, there might be some changes necessary to get advanced effects to work. We try to convert data on export but may not catch all cases where conversions are necessary. <ul><li>UV coordinates in Unity start at the bottom left; in glTF they start at the top left.</li><li>X axis values are flipped in glTF compared to Unity. This is a variant of a left-handed to right-handed coordinate system change. Data used in shaders may need to be flipped on X to display correctly.</li></ul></li></ul><div class="hint-container note"><p class="hint-container-title">Not part of the glTF specification</p><p>Note that <strong>Custom Shaders</strong> aren&#39;t officially part of the glTF specification. Our implementation of custom shaders uses an extension called KHR_techniques_webgl, that stores the WebGL shader code directly in the glTF file. The resulting assets will work in viewers based on Needle Engine, but may not display correctly in other viewers.</p></div><h2 id="exporting-lightmaps" tabindex="-1"><a class="header-anchor" href="#exporting-lightmaps"><span>💡 Exporting Lightmaps</span></a></h2><p><img src="https://user-images.githubusercontent.com/5083203/185957005-d04c9530-07eb-40f5-b305-9822d13b79ab.png" alt="2022-08-22-171650_Needle_-_Google_Chrome"></p><p>To export lightmaps simply <a href="https://docs.unity3d.com/Manual/Lightmapping.html" target="_blank" rel="noopener noreferrer">generate lightmaps</a> in Unity. Lightmaps will be automatically exported.</p><p>When working on multiple scenes, disable &quot;Auto Generate&quot; and bake lightmaps explicitly. Otherwise, Unity will discard temporary lightmaps on scene change.</p><h3 id="recommended-lightmap-settings" tabindex="-1"><a class="header-anchor" href="#recommended-lightmap-settings"><span>Recommended Lightmap Settings</span></a></h3><ul><li>Lightmap Encoding: Normal Quality (adjust in Project Settings &gt; Player)</li><li>Progressive GPU (faster and usually accurate enough for small scenes)</li><li>Non-Directional Lightmaps</li><li>Max Lightmap Size 2k (you can go higher, but expect large files)</li><li>Max 4x 2k lightmaps per scene (you can go higher, but expect large files)</li><li>Compress Lightmaps OFF (increases quality; otherwise will be compressed again at export time)</li></ul><p><img src="https://user-images.githubusercontent.com/5083203/185956392-f4031f45-ad13-4e6d-a14c-c8ec5c1fcfd4.png" alt="2022-08-22-171356_Needle_Website_-Lightmaps-_Windows,_Mac,Linux-"></p><h3 id="mixing-baked-and-non-baked-objects" tabindex="-1"><a class="header-anchor" href="#mixing-baked-and-non-baked-objects"><span>Mixing Baked and Non-Baked Objects</span></a></h3><p>There&#39;s no 100% mapping between how Unity handles lights and environment and how three.js handle that. For example, Unity has entirely separate code paths for lightmapped and non-lightmapped objects (lightmapped objects don&#39;t receive ambient light since that is already baked into their maps), and three.js doesn&#39;t distinguish in that way.</p><p>This means that to get best results, we currently recommend specific settings if you&#39;re mixing baked and non-baked objects in a scene:</p><div class="language-" data-highlighter="shiki" data-ext="" style="--shiki-light:#4c4f69;--shiki-dark:#c6d0f5;--shiki-light-bg:#eff1f5;--shiki-dark-bg:#303446;"><pre class="shiki shiki-themes catppuccin-latte catppuccin-frappe vp-code"><code><span class="line"><span>Environment Lighting: Skybox</span></span>
<span class="line"><span>Ambient Intensity: 1</span></span>
<span class="line"><span>Ambient Color: black</span></span></code></pre></div><p><strong>2021.3+</strong><br><img src="https://user-images.githubusercontent.com/2693840/186947184-2446672f-420c-47e8-8f7d-970a7d52bf35.png" alt="20220826-175324-SqBL-Unity_pMXa-needle"></p><p><strong>2020.3+</strong><br><img src="https://user-images.githubusercontent.com/2693840/186947203-2d7d96c3-f566-44b4-889c-4103fac505d4.png" alt="20220826-175514-tnGc-Unity_mycs-needle"></p><p>If you have no baked objects in your scene, then the following settings should also yield correct results:</p><div class="language-" data-highlighter="shiki" data-ext="" style="--shiki-light:#4c4f69;--shiki-dark:#c6d0f5;--shiki-light-bg:#eff1f5;--shiki-dark-bg:#303446;"><pre class="shiki shiki-themes catppuccin-latte catppuccin-frappe vp-code"><code><span class="line"><span>Environment Lighting: Color</span></span>
<span class="line"><span>Ambient Color: any</span></span></code></pre></div>`,53))])}const u=i(c,[["render",p]]),b=JSON.parse(`{"path":"/export.html","title":"Exporting Assets to glTF","lang":"en-US","frontmatter":{"title":"Exporting Assets to glTF","head":[["meta",{"name":"og:image","content":"https://engine.needle.tools/docs/.preview/exporting assets to gltf.png"}],["meta",{"name":"og:description","content":"---\\nAdd an ExportInfo component to your Unity scene to generate a new web project from a template, link to an existing web project that you want to export to, set up dependencies to other libraries and packages and to deploy your project.\\nBy default, your scene is exported on save. This setting can be changed by disabling Auto Export in the ExportInfo component.\\nTo export meshes, materials, animations, textures (...) create a new GameObject in your hierarchy and add a GltfObject component to it. This is the root of a new glTF file. It will be exported whenever you make a change to the scene and save.\\nOnly scripts and data on and inside those root objects is exported. Scripts and data outside of them are not exported.\\nAdd a cube as a child of your root object and save your scene. Note that the output assets/ folder (see project structure) now contains a new .glb file with the same name as your root GameObject.\\nYou can enable the Smart Export setting (via Edit/Project Settings/Needle ) to only export when a change in this object's hierarchy is detected.\\n:::details How to prevent specific objects from being exported\\nObjects with the EditorOnly tag will be ignored on export including their child hierarchy.\\nBe aware that this is preferred over disabling objects as disabled will still get exported in case they're turned on later.\\n:::\\nIf you want to split up your application into multiple levels or scenes then you can simply use the SceneSwitcher component. You can then structure your application into multiple scenes or prefabs and add them to the SceneSwitcher array to be loaded and unloaded at runtime. This is a great way to avoid having to load all your content upfront and to keep loading times small (for example i"}]],"description":"---\\nAdd an ExportInfo component to your Unity scene to generate a new web project from a template, link to an existing web project that you want to export to, set up dependencies to other libraries and packages and to deploy your project.\\nBy default, your scene is exported on save. This setting can be changed by disabling Auto Export in the ExportInfo component.\\nTo export meshes, materials, animations, textures (...) create a new GameObject in your hierarchy and add a GltfObject component to it. This is the root of a new glTF file. It will be exported whenever you make a change to the scene and save.\\nOnly scripts and data on and inside those root objects is exported. Scripts and data outside of them are not exported.\\nAdd a cube as a child of your root object and save your scene. Note that the output assets/ folder (see project structure) now contains a new .glb file with the same name as your root GameObject.\\nYou can enable the Smart Export setting (via Edit/Project Settings/Needle ) to only export when a change in this object's hierarchy is detected.\\n:::details How to prevent specific objects from being exported\\nObjects with the EditorOnly tag will be ignored on export including their child hierarchy.\\nBe aware that this is preferred over disabling objects as disabled will still get exported in case they're turned on later.\\n:::\\nIf you want to split up your application into multiple levels or scenes then you can simply use the SceneSwitcher component. You can then structure your application into multiple scenes or prefabs and add them to the SceneSwitcher array to be loaded and unloaded at runtime. This is a great way to avoid having to load all your content upfront and to keep loading times small (for example i"},"headers":[{"level":2,"title":"📦 Exporting glTF files","slug":"exporting-gltf-files","link":"#exporting-gltf-files","children":[{"level":3,"title":"Lazy loading and multiple levels / scenes","slug":"lazy-loading-and-multiple-levels-scenes","link":"#lazy-loading-and-multiple-levels-scenes","children":[]},{"level":3,"title":"Recommended Complexity per glTF","slug":"recommended-complexity-per-gltf","link":"#recommended-complexity-per-gltf","children":[]},{"level":3,"title":"Prefabs","slug":"prefabs","link":"#prefabs","children":[]},{"level":3,"title":"Scene Assets","slug":"scene-assets","link":"#scene-assets","children":[]}]},{"level":2,"title":"🏇 Exporting Animations","slug":"exporting-animations","link":"#exporting-animations","children":[]},{"level":2,"title":"🌍 Exporting the Skybox","slug":"exporting-the-skybox","link":"#exporting-the-skybox","children":[]},{"level":2,"title":"✨ Exporting Materials","slug":"exporting-materials","link":"#exporting-materials","children":[{"level":3,"title":"Physically Based Materials (PBR)","slug":"physically-based-materials-pbr","link":"#physically-based-materials-pbr","children":[]},{"level":3,"title":"Custom Shaders","slug":"custom-shaders","link":"#custom-shaders","children":[]}]},{"level":2,"title":"💡 Exporting Lightmaps","slug":"exporting-lightmaps","link":"#exporting-lightmaps","children":[{"level":3,"title":"Recommended Lightmap Settings","slug":"recommended-lightmap-settings","link":"#recommended-lightmap-settings","children":[]},{"level":3,"title":"Mixing Baked and Non-Baked Objects","slug":"mixing-baked-and-non-baked-objects","link":"#mixing-baked-and-non-baked-objects","children":[]}]}],"git":{"updatedTime":1728145797000,"contributors":[{"name":"Marcel Wiessler","username":"","email":"marcel@gaisterhand.de","commits":25},{"name":"hybridherbst","username":"hybridherbst","email":"felix.herbst@gmail.com","commits":15,"url":"https://github.com/hybridherbst"},{"name":"Felix Herbst","username":"","email":"felix.herbst@gmail.com","commits":1}],"changelog":[{"hash":"9b41157d92fc833f3a244a305ba496e3d58f3e9d","time":1728145797000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"some adjustments to export, reword embedding header"},{"hash":"0c64faf1313d420ba4c8c47435cd9876833c6805","time":1726585195000,"email":"felix.herbst@gmail.com","author":"Felix Herbst","message":"explicitly set twoslash on the scripts that work"},{"hash":"7e82f841e5eee5a5267dd13d1a1689dc221a8295","time":1724755401000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"more utm sources"},{"hash":"66db30ed3cffe994ffde36958d8737faee06562f","time":1691327708000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md","tag":"release/3.11.5-pre"},{"hash":"335c49491215f9f41d68a966578a4696a22a89ff","time":1684678095000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"Add features, update export, update everywhere actions"},{"hash":"30069ee5ba161126775a894bed84df7ccd01b77f","time":1684611246000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"Update project structure, export, add some basic needle-config.json documentation"},{"hash":"2c9b15c8fd2ceddd28377fced3697da661031141","time":1684592760000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"fix some docs, add nav links to sidebar that are always being shown"},{"hash":"2c17f913a8aa587a7521cfe06d767353910b52d1","time":1684501668000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"add link to next template, adjust some wording"},{"hash":"d4a82c825eb10e2f23282446efe787ba8a3327b7","time":1683048628000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"info regarding skinned meshes and custom shaders"},{"hash":"f3c3e83e99c02a75b3b84e1352b42919a8d21f2c","time":1677321583000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"shader info"},{"hash":"dcd519932faa578e92da58c0227a413c271614b8","time":1666640676000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"add tips and make manifest image url absolute now..."},{"hash":"8bf6f6c316461a708e0f2941f1f3638019d83fea","time":1666603563000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"update docs, move flowcharts in own file"},{"hash":"faab8f506b6231e57d842a852231c21b11aa55d9","time":1666542505000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"copyright + update scripting and remove external link icons"},{"hash":"75eb490ba53ee2f434319aa866a104a20d983f98","time":1665916873000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md","tag":"release/2.35.5-pre"},{"hash":"4a8feb4f6d6500d188b645f595adae755621e6ac","time":1665916727000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"4769c6fccb75203b57a66e7fd8b2ac26e8b2dd53","time":1665039596000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"1a17da49616cc8b3c2f9466aa906d3c82eac244c","time":1661530309000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"fed12c1397db64f70b9b5d7acef0795b795b48bf","time":1661243185000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"227340e69b1bef7e6694cc857f9450b716d73e0c","time":1661181988000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"03aae4753765b42d6c149b4ba04a69c137b3d2ee","time":1661181744000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"041c5d6b9430b70b448980b3a86b092dee8b7581","time":1661181665000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"3050e6ef1cfe98ef1bafaec4da2bee80550c4288","time":1661181486000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"7cb79075b036024e80cce30122a613ecf6917263","time":1660601308000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"76774c27cbae9d9e27f179ea516f6eed1974c0fe","time":1660600939000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"b0cc1a811f5613baa67ce1ed461ab052bf18da8c","time":1660600509000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"8142ed3fcaaadc2b2b4710af065e4a77d8f490bf","time":1660600457000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"1db0626728953480a24e81525bd5520f15b18898","time":1660598244000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"37d6da4464bffc21920598f1f5a9e47605477235","time":1660598184000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"56bd5d89143ec5250dc36eb093244a7a277a1609","time":1660597582000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"65631332821be527d0de26f3336bb8a3cd904662","time":1660597023000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"9462a89f05a678e8837ce686d8f81c1e41c3fa5f","time":1660596900000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"b20360a94a0c03018f74cdab13cd165ec06af8fd","time":1660596804000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"925333d306365ceafdfa7d962f1e53dbe7b99774","time":1660596624000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"649ddbfbb320e09d8e68522ebab3b8faaf2ebdc1","time":1660596582000,"email":"felix.herbst@gmail.com","author":"hybridherbst","message":"Update export.md"},{"hash":"bd27972bf1ef829249de68a9c46ff0720d0cb6f7","time":1656575970000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"b6091a2ebe2f149f6389640bbf56dfa2f61fc2c3","time":1655393778000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"ebf021ea12ec1d5be4a6ebdd83c82099b93bb0a8","time":1655393598000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"16a2e39f5a65a8d5141a1628999317087b9e749c","time":1655393576000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"4f8f1a8fdda50312aaf1146186bec89ec6375125","time":1655284496000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"28a3f6c1f5021d3809f17466df5bfa266f289b45","time":1651823617000,"email":"marwie@users.noreply.github.com","author":"Marcel Wiessler","message":"Update export.md"},{"hash":"9816d3fc6509a7c4d7884069e4afc124bd9eed86","time":1651258076000,"email":"marcel@gaisterhand.de","author":"Marcel Wiessler","message":"add docs"}]},"filePathRelative":"export.md"}`);export{u as comp,b as data};
