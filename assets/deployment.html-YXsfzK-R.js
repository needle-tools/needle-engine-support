import{_ as d}from"./texture-compression-BuEaeBZn.js";import{_ as p}from"./ktx-env-variable-DxwKzzNo.js";import{_ as c,r as n,o as h,c as u,a as t,d as o,b as s,w as m,e as i}from"./app-DzhQqn-2.js";const a="/docs/imgs/unity-texture-compression.jpg",g="/docs/imgs/unity-texture-compression-options.jpg",y="/docs/imgs/unity-mesh-compression-component.jpg",b="/docs/imgs/unity-mesh-simplification.jpg",f="/docs/imgs/unity-progressive-textures.jpg",w="/docs/imgs/unity-lods-settings-1.jpg",v="/docs/imgs/unity-lods-settings-2.jpg",k="/docs/deployment/deploytoglitch-1.jpg",x="/docs/deployment/deploytoglitch-2.jpg",T="/docs/blender/deploy_to_glitch.webp",j="/docs/deployment/deploytonetlify-2.jpg",_="/docs/deployment/deploytonetlify.jpg",D="/docs/deployment/deploytoftp.jpg",P="/docs/deployment/deploytoftp2.jpg",F="/docs/deployment/deploytoftp3.jpg",G="/docs/deployment/buildoptions_gzip.jpg",I="/docs/deployment/deploytogithubpages.jpg",U="/docs/deployment/deploytofacebookinstantgames.jpg",N="/docs/deployment/deploytofacebookinstantgames-hosting.jpg",C="/docs/deployment/deploytofacebookinstantgames-upload.jpg",B="/docs/deployment/facebookinstantgames-1.jpg",S="/docs/deployment/facebookinstantgames-2.jpg",O="/docs/deployment/facebookinstantgames-3.jpg",A="/docs/imgs/unity-build-window-menu.jpg",z="/docs/imgs/unity-build-window.jpg",E={},M={class:"hint-container details"};function W(L,e){const r=n("RouteLink"),l=n("video-embed");return h(),u("div",null,[e[6]||(e[6]=t("h2",{id:"what-does-deployment-mean",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#what-does-deployment-mean"},[t("span",null,"What does deployment mean?")])],-1)),e[7]||(e[7]=t("p",null,[o("Deployment is the process of making your application available to the public on a website. Needle Engine ensures that your project is as small and fast as possible by using the latest compression techniques such as "),t("strong",null,"KTX2"),o(", "),t("strong",null,"Draco"),o(", and "),t("strong",null,"Meshopt"),o(".")],-1)),e[8]||(e[8]=t("h2",{id:"available-deployment-targets",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#available-deployment-targets"},[t("span",null,"Available Deployment Targets")])],-1)),t("ul",null,[t("li",null,[t("p",null,[s(r,{to:"/cloud/"},{default:m(()=>e[0]||(e[0]=[o("Needle Cloud")])),_:1}),e[1]||(e[1]=t("br",null,null,-1)),e[2]||(e[2]=o(" Great for spatial web apps and sharing assets."))])]),e[3]||(e[3]=i('<li><p><a href="#deploy-to-glitch">Glitch</a> Great for experimentation and hacking on server-side code.</p></li><li><p><a href="#deploy-to-netlify">Netlify</a> Great for hosting your own website and custom domain names.</p></li><li><p><a href="#deploy-to-itch.io">itch.io</a> Often used for games.</p></li><li><p><a href="#deploy-to-github-pages">GitHub Pages</a> Free static page hosting.</p></li><li><p><a href="#deploy-to-vercel">Vercel</a> Platform for frontend developers</p></li><li><p><a href="#deploy-to-ftp">FTP Upload</a> Deploy directly to any server with FTP support. Both FTP and SFTP are supported.</p></li><li><p><a href="#build-to-folder">Build to folder</a> When building to a folder, you can upload the files to any web server or other hosting service.</p></li><li><p><a href="#deploy-to-facebook-instant-games">Facebook Instant Games</a> Games platform on Facebook and Facebook Messenger.</p></li>',8))]),e[9]||(e[9]=i('<div class="hint-container tip"><p class="hint-container-title">Feel something is missing?</p><p>Please let us know in our <a href="https://forum.needle.tools/?utm_source=needle_docs&amp;utm_content=content" target="_blank" rel="noopener noreferrer">forum</a>!</p></div><h2 id="development-builds" tabindex="-1"><a class="header-anchor" href="#development-builds"><span>Development Builds</span></a></h2><p>See guides above on how to access the options from within your Editor (e.g. Unity or Blender).</p><p>The main difference to a production build is that it does not perform <a href="https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html" target="_blank" rel="noopener noreferrer">ktx2</a> and <a href="https://google.github.io/draco/" target="_blank" rel="noopener noreferrer">draco</a> compression (for reduction of file size and loading speed) as well as the option to progressively load high-quality textures.</p><p>We generally recommend making production builds for optimized file size and loading speed (see more information below).</p><h2 id="production-builds" tabindex="-1"><a class="header-anchor" href="#production-builds"><span>Production Builds</span></a></h2><p>To make a production build, you need to have <a href="https://github.com/KhronosGroup/KTX-Software/releases" target="_blank" rel="noopener noreferrer">toktx</a> installed, which provides texture compression using the KTX2 supercompression format. Please go to the <a href="https://github.com/KhronosGroup/KTX-Software/releases" target="_blank" rel="noopener noreferrer">toktx Releases Page</a> and download and install the latest version (v4.1.0 at the time of writing). You may need to restart Unity after installing it.<br><em>If you&#39;re sure that you have installed toktx and it&#39;s part of your PATH but still can&#39;t be found, please restart your machine and try build again.</em></p><details class="hint-container details"><summary>Advanced: Custom glTF extensions</summary><p>If you plan on adding your own custom glTF extensions, building for production requires handling those in <code>gltf-transform</code>. See <a href="https://www.npmjs.com/package/@needle-tools/gltf-build-pipeline" target="_blank" rel="noopener noreferrer">@needle-tools/gltf-build-pipeline</a> for reference.</p></details><h3 id="optimization-and-compression-options" tabindex="-1"><a class="header-anchor" href="#optimization-and-compression-options"><span>Optimization and Compression Options</span></a></h3><h3 id="texture-compression" tabindex="-1"><a class="header-anchor" href="#texture-compression"><span>Texture compression</span></a></h3><p>Production builds will by default compress textures using <strong>KTX2</strong> (either ETC1S or UASTC depending on their usage in the project)<br> but you can also select <strong>WebP</strong> compression and select a quality level.</p><h4 id="how-do-i-choose-between-etc1s-uastc-and-webp-compression" tabindex="-1"><a class="header-anchor" href="#how-do-i-choose-between-etc1s-uastc-and-webp-compression"><span>How do I choose between ETC1S, UASTC and WebP compression?</span></a></h4><table><thead><tr><th>Format</th><th>ETC1S</th><th>UASTC</th><th>WebP</th></tr></thead><tbody><tr><td><strong>GPU Memory Usage</strong></td><td>Low</td><td>Low</td><td>High (uncompressed)</td></tr><tr><td><strong>File Size</strong></td><td>Low</td><td>High</td><td>Very low</td></tr><tr><td><strong>Quality</strong></td><td>Medium</td><td>Very high</td><td>Depends on quality setting</td></tr><tr><td><strong>Typical usage</strong></td><td>Works for everything, but best for color textures</td><td>High-detail data textures: normal maps, roughness, metallic, etc.</td><td>Files where ETC1S quality is not sufficient but UASTC is too large</td></tr></tbody></table><p>You have the option to select texture compression and progressive loading options per Texture by using the Needle Texture Importer in Unity or in the Material tab in Blender.</p><details class="hint-container details"><summary>Unity: How can I set per-texture compression settings?</summary><p><img src="'+a+'" alt="image"><br><img src="'+g+'" alt="image"></p></details><details class="hint-container details"><summary>Blender: How can I set per-texture compression settings?</summary><p>Select the material tab. You will see compression options for all textures that are being used by that material.<br><img src="'+d+'" alt="Texture Compression options in Blender"></p></details><details class="hint-container details"><summary>Toktx can not be found</summary><p>Windows: Make sure you have added toktx to your system environment variables. You may need to restart your computer after adding it to refresh the environment variables. The default install location is <code>C:\\Program Files\\KTX-Software\\bin</code><br><img src="'+p+'" alt="image"></p></details><h3 id="mesh-compression" tabindex="-1"><a class="header-anchor" href="#mesh-compression"><span>Mesh compression</span></a></h3><p>By default, a production build will compress meshes using Draco compression. Use the <code>MeshCompression</code> component to select between draco and mesh-opt per exported glTF.<br> Additionally you can setup mesh simplification to reduce the polycount for production builds in the mesh import settings (Unity). When viewing your application in the browser, you can append <code>?wireframe</code> to your URL to preview the meshes.</p><h4 id="how-do-i-choose-between-draco-and-meshopt" tabindex="-1"><a class="header-anchor" href="#how-do-i-choose-between-draco-and-meshopt"><span>How do I choose between Draco and Meshopt?</span></a></h4><table><thead><tr><th>Format</th><th>Draco</th><th>Meshopt</th></tr></thead><tbody><tr><td><strong>GPU Memory Usage</strong></td><td>Medium</td><td>Low</td></tr><tr><td><strong>File Size</strong></td><td>Lowest</td><td>Low</td></tr><tr><td><strong>Animation compression</strong></td><td>No</td><td>Yes</td></tr></tbody></table><details class="hint-container details"><summary>How can I set draco and meshopt compression settings?</summary><p>Add the MeshCompression component to select which compression should be applied per exported glTF.</p><p><img src="'+y+'" alt="image"></p><ul><li>To change compression for the <strong>current scene</strong> just add it anywhere in your root scene.</li><li>To change compression for a <strong>prefab or NestedGltf</strong> add it to a <code>GltfObject</code> or the prefab that is referenced / exported by any of your components.</li><li>To change compression for a <strong>referenced scene</strong> just add it to the referenced scene that is exported</li></ul></details><details class="hint-container details"><summary>Where to find mesh simplification options to reduce the vertex count when building for production?</summary><p>Select a Mesh and open the Needle importer options to see available options for the selected mesh:<br><img src="'+b+'" alt="image"></p></details><h3 id="progressive-textures" tabindex="-1"><a class="header-anchor" href="#progressive-textures"><span>Progressive Textures</span></a></h3><p>You can also add the <code>Progressive Texture Settings</code> component anywhere in your scene, to make all textures in your project be progressively loaded. Progressive loading is not applied to lightmaps or skybox textures at this point.</p><p>With progressive loading textures will first be loaded using a lower resolution version. A full quality version will be loaded dynamically when the texture becomes visible. This usually reduces initial loading of your scene significantly.</p><details class="hint-container details"><summary>How can I enable progressive texture loading?</summary><h3 id="progressive-textures-can-be-enabled-per-textureor-for-all-textures-in-your-project" tabindex="-1"><a class="header-anchor" href="#progressive-textures-can-be-enabled-per-textureor-for-all-textures-in-your-project"><span>Progressive textures can be enabled per texture<br>or for all textures in your project:</span></a></h3><p><img src="'+a+'" alt="image"></p><h3 id="enable-for-all-textures-in-the-project-that-don-t-have-any-other-specific-setting" tabindex="-1"><a class="header-anchor" href="#enable-for-all-textures-in-the-project-that-don-t-have-any-other-specific-setting"><span>Enable for all textures in the project that don&#39;t have any other specific setting:</span></a></h3><p><img src="'+f+'" alt="image"></p></details><h3 id="automatic-mesh-lods-level-of-detail" tabindex="-1"><a class="header-anchor" href="#automatic-mesh-lods-level-of-detail"><span>Automatic Mesh LODs (Level of Detail)</span></a></h3><p>Since Needle Engine 3.36 we automatically generate LOD meshes and switch between them at runtime. LODs are loaded on demand and only when needed so so this feature both reduces your loading time as well as performance.</p><p><strong>Key Beneftis</strong></p><ul><li>Faster initial loading time</li><li>Faster rendering time due to less vertices on screen on average</li><li>Faster raycasting due to the use of LOD meshes</li></ul><p>You can either disable LOD generation for your whole project in the <code>Progressive Loading Settings</code> component or in the Mesh Importer settings.</p><p><img src="'+w+'" alt="image"></p><p><img src="'+v+'" alt="image"></p><h2 id="deployment-options" tabindex="-1"><a class="header-anchor" href="#deployment-options"><span>Deployment Options</span></a></h2><h3 id="deploy-to-glitch" tabindex="-1"><a class="header-anchor" href="#deploy-to-glitch"><span>Deploy to Glitch 🎏</span></a></h3><p><a href="https://glitch.com/" target="_blank" rel="noopener noreferrer">Glitch</a> provides a fast and free way for everyone to host small and large websites. We&#39;re providing an easy way to remix and deploy to a new Glitch page (based on our starter), and also to run a minimalistic networking server on the same Glitch page if needed.</p><p>You can deploy to glitch by adding the <code>DeployToGlitch</code> component to your scene and following the instructions.</p><p>Note that free projects hosted on glitch may not exceed ~100 MB. If you need to upload a larger project consider using a different deployment target.</p><details class="hint-container details"><summary>How do I deploy to Glitch from Unity?</summary><ol><li><p>Add the <code>DeployToGlitch</code> component to the GameObject that also has the <code>ExportInfo</code> component.</p></li><li><p>Click the <code>Create new Glitch Remix</code> button on the component <img src="'+k+'" alt="image"></p></li><li><p>Glitch will now create a remix of the template. Copy the URL from your browser<br><img src="https://user-images.githubusercontent.com/5083203/179834901-f28852a9-6b06-4d87-8b5b-0384768c92c1.png" alt="image"></p></li><li><p>Open Unity again and paste the URL in the <code>Project Name</code> field of your <code>Deploy To Glitch</code> component<br><img src="https://user-images.githubusercontent.com/5083203/179835274-033e5e1d-b70d-4b13-95ad-f1e2f159b14e.png" alt="image"></p></li><li><p>Wait a few seconds until Unity has received your deployment key from glitch (this key is safely stored in the <code>.env</code> file on glitch. Do not share it with others, everyone with this key will be able to upload to your glitch website)<br><img src="'+x+'" alt="waiting for the key"></p></li><li><p>Once the Deploy Key has been received you can click the <code>Build &amp; Deploy</code> button to upload to glitch.</p></li></ol></details><details class="hint-container details"><summary>How do I deploy to Glitch from Blender?</summary><p><img src="'+T+'" alt="Deploy To Glitch from Blender component"></p><ol><li>Find the Deploy To Glitch panel in the Scene tab</li><li>Click the <code>Remix on glitch</code> button on the component</li><li>Your browser will open the glitch project template</li><li>Wait for Glitch to generate a new project</li><li>Copy paste the project URL in the Blender DeployToGlitch panel as the project name (you can paste the full URL, the panel will extract the necessary information)</li><li>On Glitch open the <code>.env</code> file and enter a password in the field <code>Variable Value</code> next to the <strong>DEPLOY_KEY</strong></li><li>Enter the same password in Blender in the <code>Key</code> field</li><li>Click the <code>DeployToGlitch</code> button to build and upload your project to glitch. A browser will open when the upload has finished. Try to refresh the page if it shows black after having opened it.</li></ol></details><h4 id="troubleshooting-glitch" tabindex="-1"><a class="header-anchor" href="#troubleshooting-glitch"><span>Troubleshooting Glitch</span></a></h4><p>If you click <code>Create new Glitch Remix</code> and the browser shows an error like <code>there was an error starting the editor</code> you can click <strong>OK</strong>. Then go to <a href="https://glitch.com/" target="_blank" rel="noopener noreferrer">glitch.com</a> and make sure you are signed in. After that you then try clicking the button again in Unity or Blender.</p><h3 id="deploy-to-netlify" tabindex="-1"><a class="header-anchor" href="#deploy-to-netlify"><span>Deploy to Netlify</span></a></h3><details class="hint-container details"><summary>How do I deploy to Netlify from Unity?</summary><p>Just add the <code>DeployToNetlify</code> component to your scene and follow the instructions. You can create new projects with the click of a button or by deploying to existing projects.</p><p><img src="'+j+'" alt="Deploy to netlify component"></p><p><img src="'+_+'" alt="Deploy to netlify component"></p></details><h3 id="deploy-to-vercel" tabindex="-1"><a class="header-anchor" href="#deploy-to-vercel"><span>Deploy to Vercel</span></a></h3><ol><li>Create a new project on vercel</li><li>Add your web project to a github repository</li><li>Add the repository to your project on vercel</li></ol><p>See our <a href="https://github.com/needle-engine/nextjs-sample" target="_blank" rel="noopener noreferrer">sample project</a> for the project configuration</p><h3 id="deploy-to-itch.io" tabindex="-1"><a class="header-anchor" href="#deploy-to-itch.io"><span>Deploy to itch.io</span></a></h3><details class="hint-container details"><summary>How do I deploy to itch.io from Unity?</summary><ol><li><p>Create a new project on <a href="https://itch.io/game/new" target="_blank" rel="noopener noreferrer">itch.io</a></p></li><li><p>Set <code>Kind of project</code> to <code>HTML</code><br><img src="https://user-images.githubusercontent.com/5083203/191211856-8a114480-bae7-4bd1-868e-2e955587acd7.png" alt="image"></p></li><li><p>Add the <code>DeployToItch</code> component to your scene and click the <code>Build</code> button<br><img src="https://user-images.githubusercontent.com/5083203/193812540-1881837e-ed9e-49fc-9658-52e5a914299a.png" alt="image"></p></li><li><p>Wait for the build to finish, it will open a folder with the final zip when it has finished</p></li><li><p>Upload to final zip to itch.io<br><img src="https://user-images.githubusercontent.com/5083203/191212661-f626f0cb-bc8e-4738-ad2c-3982aca65f39.png" alt="20220920-104629_Create_a_new_project_-itch io-_Google_Chrome-needle"></p></li><li><p>Select <code>This file will be played in the browser</code><br><img src="https://user-images.githubusercontent.com/5083203/191212967-00b687f3-bf56-449e-880c-d8daf8a52247.png" alt="image"></p></li><li><p>Save your itch page and view the itch project page.<br> It should now load your Needle Engine project 😊</p></li></ol><h4 id="optional-settings" tabindex="-1"><a class="header-anchor" href="#optional-settings"><span>Optional settings</span></a></h4><p><img src="https://user-images.githubusercontent.com/5083203/191217263-355d9b72-5431-4170-8eca-bfbbb39ae810.png" alt="image"></p></details><details class="hint-container details"><summary>Itch.io: failed to find index.html</summary><h4 id="failed-to-find-index.html" tabindex="-1"><a class="header-anchor" href="#failed-to-find-index.html"><span>Failed to find index.html</span></a></h4><p><img src="https://user-images.githubusercontent.com/5083203/191213162-2be63e46-2a65-4d41-a713-98c753ccb600.png" alt="image"><br> If you see this error after uploading your project make sure you do not upload a gzipped index.html. You can disable gzip compression in <code>vite.config.js</code> in your Needle web project folder. Just remove the line with <code>viteCompression({ deleteOriginFile: true })</code>. The build your project again and upload to itch.</p></details><h3 id="deploy-to-ftp" tabindex="-1"><a class="header-anchor" href="#deploy-to-ftp"><span>Deploy to FTP</span></a></h3><details class="hint-container details"><summary>How do I deploy to my FTP server from Unity?</summary><ol><li>Add the <code>DeployToFTP</code> component¹ on a GameObject in your scene (it is good practice to add it to the same GameObject as ExportInfo - but it is not mandatory)</li><li>Assign an FTP server asset and fill out server, username, and password if you have not already ²<br><em>This asset contains the access information to your FTP server - you get them when you create a new FTP account at your hosting provider</em></li><li>Click the <kbd>Build &amp; Deploy</kbd> button on the <code>DeployToFTP</code> component to build your project and uploading it to your FTP account</li></ol><p><img src="'+D+'" alt="Deploy to FTP component in Unity"><br><em>¹ Deploy to FTP component</em></p><p><img src="'+P+'" alt="Deploy to FTP server asset"><br><em>² FTP Server asset containing the access information of your FTP user account</em></p><p><img src="'+F+'" alt="Deploy to FTP component in Unity with server asset assigned"><br><em>Deploy To FTP component after server asset is assigned. You can directly deploy to a subfolder on your server using the path field</em></p></details><details class="hint-container details"><summary>How do I deploy to my FTP server manually?</summary><ol><li>Open <code>File &gt; Build Settings</code>, select <code>Needle Engine</code>, and click on <kbd>Build</kbd></li><li>Wait for the build to complete - the resulting <code>dist</code> folder will open automatically after all build and compression steps have run.</li><li>Copy the files from the <code>dist</code> folder to your FTP storage.</li></ol><p><strong>That&#39;s it!</strong> 😉</p><p><img src="https://user-images.githubusercontent.com/2693840/187311461-e6afb2d7-5761-48cf-bacb-1c1733bb768b.png" alt="20220830-003602_explorer-needle"></p><blockquote><p><strong>Note</strong>: If the result doesn&#39;t work when uploaded it might be that your web server does not support serving gzipped files. You have two options to fix the problem:<br> Option 1: You can try enabling gzip compression on your server using a htaccess file!<br> Option 2: You can turn gzip compression off in the build settings at File/Build Window and selecting the Needle Engine platform.</p></blockquote><blockquote><p><strong>Note</strong>: If you&#39;re getting errors during compression, please let us know and report a bug! If your project works locally and only fails when doing production builds, you can get unstuck right away by doing a Development Build. For that, simply toggle <code>Development Build</code> on in the Build Settings.</p></blockquote><p><img src="'+G+`" alt="Unity build window showing Needle Engine platform"></p></details><h4 id="enabling-gzip-using-a-.htaccess-file" tabindex="-1"><a class="header-anchor" href="#enabling-gzip-using-a-.htaccess-file"><span>Enabling gzip using a .htaccess file</span></a></h4><p>To enable gzip compression on your FTP server you can create a file named <code>.htaccess</code> in the directory you want to upload to (or a parent directory).<br> Insert the following code into your <code>.htaccess</code> file and save/upload it to your server:</p><div class="language-" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#4c4f69;--shiki-dark:#c6d0f5;--shiki-light-bg:#eff1f5;--shiki-dark-bg:#303446;"><pre class="shiki shiki-themes catppuccin-latte catppuccin-frappe vp-code"><code><span class="line"><span>&lt;IfModule mod_mime.c&gt;</span></span>
<span class="line"><span>RemoveType .gz</span></span>
<span class="line"><span>AddEncoding gzip .gz</span></span>
<span class="line"><span>AddType application/javascript .js.gz</span></span></code></pre></div><h3 id="deploy-to-github-pages" tabindex="-1"><a class="header-anchor" href="#deploy-to-github-pages"><span>Deploy to Github Pages</span></a></h3>`,58)),t("details",M,[e[4]||(e[4]=t("summary",null,"How do I deploy to Github Pages from Unity?",-1)),e[5]||(e[5]=t("p",null,[o("Add the DeployToGithubPages component to your scene and copy-paste the github repository (or github pages url) that you want to deploy to."),t("br"),t("img",{src:I,alt:"Deploy To github pages component"})],-1)),s(l,{src:"https://www.youtube.com/watch?v=Vyk3cWB6u-c"})]),e[10]||(e[10]=i('<h3 id="deploy-to-facebook-instant-games" tabindex="-1"><a class="header-anchor" href="#deploy-to-facebook-instant-games"><span>Deploy to Facebook Instant Games</span></a></h3><p>With Needle Engine you can build to Facebook Instant Games automatically<br> No manual adjustments to your web app or game are required.</p><details class="hint-container details"><summary>How do I deploy to Facebook Instant Games from Unity?</summary><ul><li>Add the <code>Deploy To Facebook Instant Games</code> component to your scene: <img src="'+U+'" alt="Deploy to facebook instant games component"></li><li>Click the <code>Build For Instant Games</code> button</li><li>After the build has finished you will get a ZIP file that you can upload to your facebook app.</li><li>On Facebook add the <code>Instant Games</code> module and go to <code>Instant Games/Web hosting</code><img src="'+N+'" alt="Hosting a facebook instant games"></li><li>You can upload your zip using the <code>Upload version</code> button (1). After the upload has finished and the zip has been processed click the <code>Stage for testing</code> button to test your app (2, here the blue button) or <code>Push to production</code> (the button with the star icon) <img src="'+C+'" alt="Upload the zip to facebook instant games"></li><li>That&#39;s it - you can then click the <code>Play</code> button next to each version to test your game on facebook.</li></ul></details><details class="hint-container details"><summary>How do I create a app on Facebook (with Instant Games capabilities)</summary><ol><li><p><a href="https://developers.facebook.com/apps/creation/" target="_blank" rel="noopener noreferrer">Create a new app</a> and select <code>Other</code>. Then click <code>Next</code><img src="'+B+'" alt="Create facebook instant games app"></p></li><li><p>Select type <code>Instant Games</code><img src="'+S+'" alt="Create facebook instant games app"></p></li><li><p>After creating the app add the <code>Instant Games</code> product <img src="'+O+'" alt="Add instant games product"></p></li></ol><p>Here you can find <a href="https://developers.facebook.com/docs/games/build/instant-games" target="_blank" rel="noopener noreferrer">the official instant games documentation</a> on facebook.<br><strong>Note</strong> that all you have to do is to create an app with instant games capabilities.<br> We will take care of everything else and no manual adjustments to your Needle Engine website are required.</p></details><h2 id="build-to-folder" tabindex="-1"><a class="header-anchor" href="#build-to-folder"><span>Build To Folder</span></a></h2><p>In Unity open <code>File/Build Settings</code> and select <code>Needle Engine</code> for options:</p><p><img src="'+A+'" alt="image"></p><p><img src="'+z+'" alt="image"></p><p>To build your web project for uploading to any web server you can click <strong>Build</strong> in the Unity Editor Build Settings Window. You can enable the <code>Development Build</code> checkbox to omit compression (see below) which requires toktx to be installed on your machine.</p><p>To locally preview your final build you can use the <code>Preview Build</code> button at the bottom of the window. This button will first perform a regular build and then start a local server in the directory with the final files so you can see what you get once you upload these files to your webserver.</p><p>Nodejs is <strong>only</strong> required during development. The distributed website (using our default vite template) is a static page that doesn&#39;t rely on Nodejs and can be put on any regular web server. Nodejs is required if you want to run our minimalistic networking server on the same web server (automatically contained in the Glitch deployment process).</p><hr><h2 id="cross-platform-deployment-workflows" tabindex="-1"><a class="header-anchor" href="#cross-platform-deployment-workflows"><span>Cross-Platform Deployment Workflows</span></a></h2><p>It&#39;s possible to create regular Unity projects where you can build both to Needle Engine and to regular Unity platforms such as Desktop or even WebGL. Our &quot;component mapping&quot; approach means that no runtime logic is modified inside Unity - if you want you can regularily use Play Mode and build to other target platforms. In some cases this will mean that you have duplicate code (C# code and matching TypeScript logic). The amount of extra work through this depends on your project.</p><p><strong>Enter Play Mode in Unity</strong><br> In <code>Project Settings &gt; Needle Engine</code>, you can turn off <code>Override Play Mode</code> and <code>Override Build settings</code> to switch between Needle&#39;s build process and Unity&#39;s build process:<br><img src="https://user-images.githubusercontent.com/2693840/187308490-5acb9016-ffff-4113-be62-4de450a42b08.png" alt="image"></p><h2 id="needle-engine-commandline-arguments-for-unity" tabindex="-1"><a class="header-anchor" href="#needle-engine-commandline-arguments-for-unity"><span>Needle Engine Commandline Arguments for Unity</span></a></h2><p>Needle Engine for Unity supports various commandline arguments to export single assets (Prefabs or Scenes) or to build a whole web project in batch mode (windowsless).</p><p>The following list gives a table over the available options:</p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><code>-scene</code></td><td>path to a scene or a asset to be exported e.g. <code>Assets/path/to/myObject.prefab</code> or <code>Assets/path/to/myScene.unity</code></td></tr><tr><td><code>-outputPath &lt;path/to/output.glb&gt;</code></td><td>set the output path for the build (only valid when building a scene)</td></tr><tr><td><code>-buildProduction</code></td><td>run a production build</td></tr><tr><td><code>-buildDevelopment</code></td><td>run a development build</td></tr><tr><td><code>-debug</code></td><td>open a console window for debugging</td></tr></tbody></table>',19))])}const K=c(E,[["render",W],["__file","deployment.html.vue"]]),R=JSON.parse('{"path":"/deployment.html","title":"Deployment and Optimization","lang":"en-US","frontmatter":{"title":"Deployment and Optimization","head":[["meta",{"name":"og:image","content":"https://engine.needle.tools/docs/.preview/deployment and optimization.png"}],["meta",{"name":"og:description","content":"---\\nDeployment is the process of making your application available to the public on a website. Needle Engine ensures that your project is as small and fast as possible by using the latest compression techniques such as KTX2, Draco, and Meshopt."}]],"description":"---\\nDeployment is the process of making your application available to the public on a website. Needle Engine ensures that your project is as small and fast as possible by using the latest compression techniques such as KTX2, Draco, and Meshopt."},"headers":[{"level":2,"title":"What does deployment mean?","slug":"what-does-deployment-mean","link":"#what-does-deployment-mean","children":[]},{"level":2,"title":"Available Deployment Targets","slug":"available-deployment-targets","link":"#available-deployment-targets","children":[]},{"level":2,"title":"Development Builds","slug":"development-builds","link":"#development-builds","children":[]},{"level":2,"title":"Production Builds","slug":"production-builds","link":"#production-builds","children":[{"level":3,"title":"Optimization and Compression Options","slug":"optimization-and-compression-options","link":"#optimization-and-compression-options","children":[]},{"level":3,"title":"Texture compression","slug":"texture-compression","link":"#texture-compression","children":[]},{"level":3,"title":"Mesh compression","slug":"mesh-compression","link":"#mesh-compression","children":[]},{"level":3,"title":"Progressive Textures","slug":"progressive-textures","link":"#progressive-textures","children":[]},{"level":3,"title":"Automatic Mesh LODs (Level of Detail)","slug":"automatic-mesh-lods-level-of-detail","link":"#automatic-mesh-lods-level-of-detail","children":[]}]},{"level":2,"title":"Deployment Options","slug":"deployment-options","link":"#deployment-options","children":[{"level":3,"title":"Deploy to Glitch 🎏","slug":"deploy-to-glitch","link":"#deploy-to-glitch","children":[]},{"level":3,"title":"Deploy to Netlify","slug":"deploy-to-netlify","link":"#deploy-to-netlify","children":[]},{"level":3,"title":"Deploy to Vercel","slug":"deploy-to-vercel","link":"#deploy-to-vercel","children":[]},{"level":3,"title":"Deploy to itch.io","slug":"deploy-to-itch.io","link":"#deploy-to-itch.io","children":[]},{"level":3,"title":"Deploy to FTP","slug":"deploy-to-ftp","link":"#deploy-to-ftp","children":[]},{"level":3,"title":"Deploy to Github Pages","slug":"deploy-to-github-pages","link":"#deploy-to-github-pages","children":[]},{"level":3,"title":"Deploy to Facebook Instant Games","slug":"deploy-to-facebook-instant-games","link":"#deploy-to-facebook-instant-games","children":[]}]},{"level":2,"title":"Build To Folder","slug":"build-to-folder","link":"#build-to-folder","children":[]},{"level":2,"title":"Cross-Platform Deployment Workflows","slug":"cross-platform-deployment-workflows","link":"#cross-platform-deployment-workflows","children":[]},{"level":2,"title":"Needle Engine Commandline Arguments for Unity","slug":"needle-engine-commandline-arguments-for-unity","link":"#needle-engine-commandline-arguments-for-unity","children":[]}],"git":{"updatedTime":1734715587000},"filePathRelative":"deployment.md"}');export{K as comp,R as data};