import{_ as t,o as i,c as n,e as o}from"./app-DzhQqn-2.js";const a="/docs/testing/switch-to-mkcert.webp",r={};function s(l,e){return i(),n("div",null,e[0]||(e[0]=[o('<h2 id="testing-on-local-devices" tabindex="-1"><a class="header-anchor" href="#testing-on-local-devices"><span>Testing on local devices</span></a></h2><p>When using our templates, Needle Engine runs a local development server for you. Simply press play, and a website will open in your default browser, ready for testing on your local device. For testing on other devices in the same network, you may have to install a self-signed certificate (see below).</p><p>When using a custom setup / framework, please refer to your framework&#39;s documentation on how to run a secure local development server.</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>Our local server uses the IP address in your local network (e.g. <code>https://192.168.0.123:3000</code>) instead of <code>localhost:3000</code>. This allows you to quickly view and test your project from mobile devices, VR glasses, and other machines in the same network.</p><p>We&#39;re using HTTPS instead of the older HTTP, because modern powerful web APIs like WebXR require a secure connection – the S stands for &quot;secure&quot;.</p></div><h2 id="setting-up-a-self-signed-certificate-for-development" tabindex="-1"><a class="header-anchor" href="#setting-up-a-self-signed-certificate-for-development"><span>Setting up a self-signed certificate for development</span></a></h2><p>Different operating systems have different security requirements for local development. Typically, displaying a website will work even with a auto-generated untrusted certificate, but browsers may warn about the missing trust and some features are not available. Here&#39;s a summary:</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>Installing trusted self-signed certificates on your development devices is recommended for a smooth development experience. Find the steps at the bottom of this page.</p></div><p><strong>Default – with auto-generated untrusted certificate</strong><br><em>Displays a certificate warning upon opening the project in a browser.</em><em>Uses the <a href="https://github.com/vitejs/vite-plugin-basic-ssl" target="_blank" rel="noopener noreferrer">vite-plugin-basic-ssl</a> npm package.</em></p><p>We&#39;re using websocket connections to communicate between the browser and the local development server. Websockets require a secure connection (HTTPS) in order to work. Depending on the platform, you might need to set up a custom certificate for local development. Android and Windows don&#39;t need a custom certificate, but iOS and MacOS do.</p><table><thead><tr><th>OS</th><th>Viewing in the browser<br>(with a security warning)</th><th>Automatic reloads</th></tr></thead><tbody><tr><td>Windows</td><td>(✓)</td><td>✓</td></tr><tr><td>Linux</td><td>(✓)</td><td>✓</td></tr><tr><td>Android</td><td>(✓)</td><td>✓</td></tr><tr><td>macOS</td><td>(✓)</td><td>❌</td></tr><tr><td>iOS</td><td>(✓ Safari and Chrome, after page reload)<br>❌ Mozilla XR Viewer</td><td>❌</td></tr><tr><td>Xcode Simulators</td><td>(✓ after page reload)</td><td>❌</td></tr></tbody></table><p><strong>With a self-signed, trusted root certificate</strong><br><em>No security warning is displayed. You need to install the generated certificate on your device(s).</em><br><em>Uses the <a href="https://github.com/liuweiGL/vite-plugin-mkcert" target="_blank" rel="noopener noreferrer">vite-plugin-mkcert</a> npm package.</em></p><table><thead><tr><th>OS</th><th>Viewing in the browser</th><th>Automatic reloads</th></tr></thead><tbody><tr><td>Windows</td><td>✓</td><td>✓</td></tr><tr><td>Linux</td><td>✓</td><td>✓</td></tr><tr><td>Android</td><td>✓</td><td>✓</td></tr><tr><td>macOS</td><td>✓</td><td>✓</td></tr><tr><td>iOS</td><td>✓</td><td>✓</td></tr></tbody></table><h3 id="generating-a-self-signed-development-certificate" tabindex="-1"><a class="header-anchor" href="#generating-a-self-signed-development-certificate"><span>Generating a self-signed development certificate</span></a></h3><ul><li><p>in Unity/Blender, click on &quot;Open Workspace&quot; to open VS Code</p></li><li><p>check that you&#39;re using <code>vite-plugin-mkcert</code> instead of <code>vite-plugin-basic-ssl</code> (the latter doesn&#39;t generate a trusted root certificate, which we need) in your <code>vite.config.ts</code> file:</p><ul><li>open <code>package.json</code></li><li>remove the line with <code>&quot;@vitejs/plugin-basic-ssl&quot;</code> from <code>devDependencies</code></li><li>open a Terminal in VS Code and run <code>npm install vite-plugin-mkcert --save-dev</code> which will add the latest version</li><li>open <code>vite.config.ts</code> and replace <code>import basicSsl from &#39;@vitejs/plugin-basic-ssl&#39;</code> with <code>import mkcert from&#39;vite-plugin-mkcert&#39;</code></li><li>in <code>plugins: [</code>, replace <code>basicSsl(),</code> with <code>mkcert(),</code></li><li>package.json looks like this now: <img src="'+a+'" alt=""></li></ul></li><li><p>run <code>npm run start</code> once from VS Code&#39;s terminal</p><ul><li>on Windows, this will open a new window and guide you through the creation and installation of the certificate</li><li>on MacOS, the terminal prompts for your password and then generates and installs the certificate.</li><li>if you&#39;re getting an error <code>Error: Port 3000 is already in use</code>, please close the server that may still be running from Unity.</li></ul></li><li><p>the generated certificate will automatically be installed on the machine you generated it on.</p></li><li><p>you can stop the terminal process again.</p></li><li><p>from now on, pressing Play in Unity/Blender will use the generated certificate for the local server, and no &quot;security warning&quot; will be shown anymore, since your browser now trusts the local connection.</p></li></ul><h2 id="installing-the-certificate-on-your-development-devices" tabindex="-1"><a class="header-anchor" href="#installing-the-certificate-on-your-development-devices"><span>Installing the certificate on your development devices</span></a></h2><p>On your development devices, you need to <em>install</em> the generated certificate and allow the OS to <em>trust</em> it. This is different for each OS. For each of them, you&#39;ll need the rootCA.pem file that was generated, and send it to the device you want to authenticate.</p><p><strong>On Windows:</strong> find the certificate in <code>Users/&lt;your-user&gt;/.vite-plugin-mkcert/rootCA.pem</code><br><strong>On MacOS:</strong> find the certificate in <code>Users/&lt;your-user&gt;/.vite-plugin-mkcert/rootCA.pem</code></p><p>Send the device to yourself (e.g. via E-Mail, AirDrop, iCloud, USB, Slack, ...) so that you can access it on your development devices.</p><h3 id="installing-the-certificate-on-android" tabindex="-1"><a class="header-anchor" href="#installing-the-certificate-on-android"><span>Installing the certificate on Android</span></a></h3><ol><li>Open the file. You&#39;ll be prompted to install the certificate.</li></ol><h3 id="installing-the-certificate-on-ios-ipados-visionos" tabindex="-1"><a class="header-anchor" href="#installing-the-certificate-on-ios-ipados-visionos"><span>Installing the certificate on iOS / iPadOS / VisionOS</span></a></h3><ol><li>Open the file.</li><li>You&#39;ll be prompted to <em>add</em> the profile to your device. Confirm.</li><li>Go to Settings</li><li>There will be a new entry &quot;Profile&quot;. Select it and allow the profile to be <em>active</em> for this device.</li><li>On iOS / iPadOS, you also need to allow &quot;Root Certificate Trust&quot;. For this, search for <code>Trust</code> or go to <code>Settings &gt; General &gt; About &gt; Info &gt; Certificate Trust Settings</code> and enable full trust for the root certificate.</li></ol><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>The certificate is automatically installed on the machine you generated it on. For other machines in the local network, follow the steps below to also establish a trusted connection.</p></div><h3 id="installing-the-certificate-on-another-macos-machine" tabindex="-1"><a class="header-anchor" href="#installing-the-certificate-on-another-macos-machine"><span>Installing the certificate on another MacOS machine</span></a></h3><ol><li>Open the file. Keychain Access will open and allow you to install the certificate.</li><li>You may have to set &quot;Trust&quot; to &quot;Always allow&quot;.</li></ol><h3 id="installing-the-certificate-on-another-windows-machine" tabindex="-1"><a class="header-anchor" href="#installing-the-certificate-on-another-windows-machine"><span>Installing the certificate on another Windows machine</span></a></h3><ol><li>Open <code>certmgr</code> (&quot;Manage user certificates&quot;) by typing <kbd>Windows key</kbd> + <code>certmgr</code>.</li><li>In the left sidebar, select &quot;Trusted Root Certification Authorities&quot;.</li><li>Right-click on &quot;Certificates&quot; and select &quot;All Tasks &gt; Import&quot;.</li><li>Select the <code>rootCA.pem</code> file (you may have to change the file type to &quot;all&quot;) and follow the instructions.</li></ol>',27)]))}const d=t(r,[["render",s],["__file","testing.html.vue"]]),h=JSON.parse(`{"path":"/testing.html","title":"Testing on local devices","lang":"en-US","frontmatter":{"title":"Testing on local devices","head":[["meta",{"name":"og:image","content":"https://engine.needle.tools/docs/.preview/testing on local devices.png"}],["meta",{"name":"og:description","content":"---\\nWhen using our templates, Needle Engine runs a local development server for you. Simply press play, and a website will open in your default browser, ready for testing on your local device. For testing on other devices in the same network, you may have to install a self-signed certificate (see below).\\nWhen using a custom setup / framework, please refer to your framework's documentation on how to run a secure local development server.\\n::: tip\\nOur local server uses the IP address in your local network (e.g. https://192.168.0.123:3000) instead of localhost:3000.  This allows you to quickly view and test your project from mobile devices, VR glasses, and other machines in the same network.\\nWe're using HTTPS instead of the older HTTP, because modern powerful web APIs like WebXR require a secure connection – the S stands for 'secure'.\\n:::\\nDifferent operating systems have different security requirements for local development. Typically, displaying a website will work even with a auto-generated untrusted certificate, but browsers may warn about the missing trust and some features are not available. Here's a summary:\\n::: tip\\nInstalling trusted self-signed certificates on your development devices is recommended for a smooth development experience. Find the steps at the bottom of this page.\\n:::\\nDefault – with auto-generated untrusted certificate\\n_Displays a certificate warning upon opening the project in a browser._\\n_Uses the vite-plugin-basic-ssl npm package._\\nWe're using websocket connections to communicate between the browser and the local development server. Websockets require a secure connection (HTTPS) in order to work. Depending on the platform, you might need to set up a custom certificate for local development. Android and Windows don't need a custom certificate, but iOS an"}]],"description":"---\\nWhen using our templates, Needle Engine runs a local development server for you. Simply press play, and a website will open in your default browser, ready for testing on your local device. For testing on other devices in the same network, you may have to install a self-signed certificate (see below).\\nWhen using a custom setup / framework, please refer to your framework's documentation on how to run a secure local development server.\\n::: tip\\nOur local server uses the IP address in your local network (e.g. https://192.168.0.123:3000) instead of localhost:3000.  This allows you to quickly view and test your project from mobile devices, VR glasses, and other machines in the same network.\\nWe're using HTTPS instead of the older HTTP, because modern powerful web APIs like WebXR require a secure connection – the S stands for 'secure'.\\n:::\\nDifferent operating systems have different security requirements for local development. Typically, displaying a website will work even with a auto-generated untrusted certificate, but browsers may warn about the missing trust and some features are not available. Here's a summary:\\n::: tip\\nInstalling trusted self-signed certificates on your development devices is recommended for a smooth development experience. Find the steps at the bottom of this page.\\n:::\\nDefault – with auto-generated untrusted certificate\\n_Displays a certificate warning upon opening the project in a browser._\\n_Uses the vite-plugin-basic-ssl npm package._\\nWe're using websocket connections to communicate between the browser and the local development server. Websockets require a secure connection (HTTPS) in order to work. Depending on the platform, you might need to set up a custom certificate for local development. Android and Windows don't need a custom certificate, but iOS an"},"headers":[{"level":2,"title":"Testing on local devices","slug":"testing-on-local-devices","link":"#testing-on-local-devices","children":[]},{"level":2,"title":"Setting up a self-signed certificate for development","slug":"setting-up-a-self-signed-certificate-for-development","link":"#setting-up-a-self-signed-certificate-for-development","children":[{"level":3,"title":"Generating a self-signed development certificate","slug":"generating-a-self-signed-development-certificate","link":"#generating-a-self-signed-development-certificate","children":[]}]},{"level":2,"title":"Installing the certificate on your development devices","slug":"installing-the-certificate-on-your-development-devices","link":"#installing-the-certificate-on-your-development-devices","children":[{"level":3,"title":"Installing the certificate on Android","slug":"installing-the-certificate-on-android","link":"#installing-the-certificate-on-android","children":[]},{"level":3,"title":"Installing the certificate on iOS / iPadOS / VisionOS","slug":"installing-the-certificate-on-ios-ipados-visionos","link":"#installing-the-certificate-on-ios-ipados-visionos","children":[]},{"level":3,"title":"Installing the certificate on another MacOS machine","slug":"installing-the-certificate-on-another-macos-machine","link":"#installing-the-certificate-on-another-macos-machine","children":[]},{"level":3,"title":"Installing the certificate on another Windows machine","slug":"installing-the-certificate-on-another-windows-machine","link":"#installing-the-certificate-on-another-windows-machine","children":[]}]}],"git":{"updatedTime":1689176384000},"filePathRelative":"testing.md"}`);export{d as comp,h as data};