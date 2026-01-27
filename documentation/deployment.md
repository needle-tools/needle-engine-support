---
title: Deployment and Optimization
---

# Deployment and Optimization

**Get your Needle Engine projects live on the web.** This guide covers everything from [optimization and compression](#optimization-and-compression-options) to deploying on popular hosting platforms.

## What does deployment mean?

Deployment is the process of making your application available to the public on a website. Needle Engine ensures that your project is as small and fast as possible by using the latest compression techniques such as **KTX2**, **Draco**, and **Meshopt**. Learn more about [optimization and compression options](#optimization-and-compression-options).

## Quick Start: Choose Your Platform

Pick a hosting platform that fits your needs:

- **[Needle Cloud](./cloud/#deploy-from-unity)** – Official Needle hosting. Great for all kinds of spatial web apps and 3D assets.
- **[Netlify](#deploy-to-netlify)** – Professional hosting with custom domains and CI/CD.
- **[Vercel](#deploy-to-vercel)** – Optimized platform for frontend developers with excellent performance.
- **[GitHub Pages](#deploy-to-github-pages)** – Free static hosting, great for open source projects.
- **[itch.io](#deploy-to-itchio)** – Perfect for games and interactive experiences.
- **[Facebook Instant Games](#deploy-to-facebook-instant-games)** – Reach users on Facebook and Messenger.
- **[FTP Upload](#deploy-to-ftp)** – Deploy directly to any server with FTP/SFTP support.
- **[Build to Folder](#build-to-folder)** – Upload manually to any web server or hosting service.
- **[Glitch](#deploy-to-glitch-)** *(Deprecated)* – Glitch has discontinued their hosting service.

:::tip Need Help?
Can't find what you're looking for? Let us know in our [forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)!
:::

---

## Understanding Build Types

### Development Builds

Development builds are optimized for fast iteration during development:
- **No texture compression** (KTX2) – faster build times
- **No mesh compression** (Draco) – faster build times
- **No progressive loading** – simpler debugging
- **Larger file sizes** – not suitable for production

**When to use:** During active development and testing.

### Production Builds

Production builds are optimized for performance and file size:
- **Texture compression** using KTX2 (ETC1S or UASTC)
- **Mesh compression** using Draco or Meshopt
- **Progressive texture loading** for faster initial load
- **Automatic mesh LODs** for better performance
- **Minimal file sizes** for fast loading

**When to use:** For deployment to production websites.

See guides in your Editor (Unity or Blender) for accessing build options.

---

## Production Build Setup

### Required: Install toktx

To make production builds, you need [toktx](https://github.com/KhronosGroup/KTX-Software/releases) installed for texture compression using the KTX2 supercompression format.

**Installation:**
1. Go to the [toktx Releases Page](https://github.com/KhronosGroup/KTX-Software/releases)
2. Download and install the latest version (v4.1.0 or newer)
3. Restart Unity after installation

:::tip Troubleshooting
If you've installed toktx and it's in your PATH but can't be found, restart your machine and try building again.
:::

:::details Troubleshooting: Toktx cannot be found (Windows)
Make sure you have added toktx to your system environment variables. You may need to restart your computer after adding it to refresh the environment variables.

**Default install location:** `C:\Program Files\KTX-Software\bin`
![Environment Variables](/imgs/ktx-env-variable.webp)
:::

:::details Advanced: Custom glTF extensions
If you plan on adding custom glTF extensions, building for production requires handling those in `gltf-transform`. See [@needle-tools/gltf-build-pipeline](https://www.npmjs.com/package/@needle-tools/gltf-build-pipeline) for reference.
:::

---

## Optimization and Compression Options

### Texture Compression

Production builds compress textures using **KTX2** (ETC1S or UASTC) or **WebP** depending on your settings and quality requirements.

#### Choosing Between ETC1S, UASTC and WebP

| Format | ETC1S | UASTC | WebP |
| --- | --- | --- | --- |
| **GPU Memory Usage** | Low | Low | High (uncompressed) |
| **File Size** | Low | High | Very low |
| **Quality** | Medium | Very high | Depends on quality setting |
| **Typical usage** | Works for everything, best for color textures | High-detail data textures: normal maps, roughness, metallic | Files where ETC1S quality is insufficient but UASTC is too large |

**Quick Guide:**
- **Color textures, UI**: Use ETC1S for small file size
- **Normal maps, detail textures**: Use UASTC for maximum quality
- **Photography, detailed textures**: Use WebP if ETC1S quality isn't sufficient

#### Setting Compression Per Texture

You can override compression settings for individual textures using the Needle Texture Importer (Unity) or Material tab (Blender).

:::details Unity: Global compression settings
Configure default compression for all textures:

![Unity Compression Settings](/imgs/unity-compression-settings.png)
:::

:::details Unity: Per-texture compression overrides
Use the Compression & LOD Settings component to override settings for specific textures. Assign all textures you want to override in the component.

![Unity Individual Texture Settings](/imgs/unity-compression-settings-individual.png)
:::

:::details Blender: Per-texture compression settings
Select the Material tab to see compression options for all textures used by that material.

![Texture Compression in Blender](/blender/texture-compression.webp)
:::

### Mesh Compression

Production builds compress meshes to reduce file size and improve loading times.

#### Choosing Between Draco and Meshopt

| Format | Draco | Meshopt |
| --- | --- | --- |
| **GPU Memory Usage** | Medium | Low |
| **File Size** | Lowest | Low |
| **Animation compression** | No | Yes |

**Quick Guide:**
- **Static meshes**: Use Draco for smallest file size
- **Animated meshes**: Use Meshopt (supports animation compression)

By default, production builds use Draco compression. Use the `MeshCompression` component to choose between Draco and Meshopt per exported glTF.

:::details Unity: Mesh compression settings
Use the Compression & LOD Settings component to select compression type:

![Unity Mesh Compression Options](/imgs/unity-mesh-compression-options.jpg)

- **Current scene**: Add component anywhere in your root scene
- **Prefab or NestedGltf**: Add to a `GltfObject` or the prefab referenced by your components
- **Referenced scene**: Add to the referenced scene that is exported
:::

:::details Unity: Mesh simplification to reduce vertex count
Use the Compression & LOD Settings component to configure mesh simplification for production builds. Append `?wireframe` to your URL to preview meshes in the browser.

![Unity Mesh Compression Options](/imgs/unity-mesh-compression-options.jpg)
:::

### Progressive Texture Loading (Texture LODs)

**Significantly reduce initial loading time** by loading low-resolution textures first, then upgrading to full quality when visible.

Add the `Progressive Texture Settings` component anywhere in your scene to enable progressive loading for all textures. Progressive loading is not applied to lightmaps or skybox textures.

**Benefits:**
- Much faster initial load times
- Full quality loaded on-demand
- Seamless quality transitions

:::details Unity: Enable progressive texture loading
Use the Compression & LOD Settings component to enable progressive loading globally. Can be disabled or enabled for individual textures as needed.

![Unity Compression Settings](/imgs/unity-compression-settings.png)
:::

### Automatic Mesh LODs (Level of Detail)

**Since Needle Engine 3.36**, mesh LODs are automatically generated during builds and chosen at runtime based on mesh density and screen size.

**Key Benefits:**
- Faster initial loading time
- Better rendering performance (fewer vertices on screen)
- Faster raycasting with LOD meshes
- Automatic on-demand loading

:::details Unity: Control LOD generation
Use the Compression & LOD Settings component to control LOD generation for all meshes or individual meshes.

![Unity Mesh Compression Options](/imgs/unity-mesh-compression-options.jpg)
:::

---

## Deployment Options

### Deploy to Glitch 🎏

:::danger Deprecated - Service Discontinued
Glitch has discontinued their hosting service. This deployment option is no longer available.

**Alternatives:**
- **[Needle Cloud](./cloud/#deploy-from-unity)** – Official Needle hosting with built-in networking support
- **[Netlify](#deploy-to-netlify)** – Professional hosting with custom domains
- **[Vercel](#deploy-to-vercel)** – Excellent performance for frontend projects
- **[Build to Folder](#build-to-folder)** – Deploy to any web server manually
:::

### <logo-header logo="/imgs/netlify-logo.webp" alt="Netlify">Deploy to Netlify</logo-header>

Professional hosting with custom domains, automatic HTTPS, and continuous deployment.

:::details Unity: Deploy to Netlify
Add the `DeployToNetlify` component to your scene and follow the instructions. You can create new projects or deploy to existing ones with a single click.

![Deploy to Netlify Component](/deployment/deploytonetlify-2.jpg)

![Deploy to Netlify](/deployment/deploytonetlify.jpg)
:::

### <logo-header logo="/imgs/vercel-logo.webp" alt="Vercel">Deploy to Vercel</logo-header>

Optimized platform for frontend developers with excellent performance and DX.

**Setup:**
1. Create a new project on Vercel
2. Add your web project to a GitHub repository
3. Connect the repository to your Vercel project

See our [Next.js sample project](https://github.com/needle-engine/nextjs-sample) for configuration reference.

### <logo-header logo="/imgs/itch-logo.webp" alt="itch.io">Deploy to itch.io</logo-header>

Perfect for games and interactive experiences with a built-in community.

:::details Unity: Deploy to itch.io step-by-step

1. Create a new project on [itch.io](https://itch.io/game/new)

2. Set **Kind of project** to **HTML**
   ![itch.io Project Type](https://user-images.githubusercontent.com/5083203/191211856-8a114480-bae7-4bd1-868e-2e955587acd7.png)

3. Add the `DeployToItch` component to your scene and click **Build**
   ![Deploy to itch Component](https://user-images.githubusercontent.com/5083203/193812540-1881837e-ed9e-49fc-9658-52e5a914299a.png)

4. Wait for the build to finish. It will open a folder with the final zip

5. Upload the final zip to itch.io
   ![Upload to itch.io](https://user-images.githubusercontent.com/5083203/191212661-f626f0cb-bc8e-4738-ad2c-3982aca65f39.png)

6. Select **This file will be played in the browser**
   ![Browser Playback](https://user-images.githubusercontent.com/5083203/191212967-00b687f3-bf56-449e-880c-d8daf8a52247.png)

7. Save your itch page and view the project page
   Your Needle Engine project should now load! 😊

**Optional settings:**

![Optional Settings](https://user-images.githubusercontent.com/5083203/191217263-355d9b72-5431-4170-8eca-bfbbb39ae810.png)

:::

:::details Troubleshooting: Failed to find index.html
![Failed to find index.html error](https://user-images.githubusercontent.com/5083203/191213162-2be63e46-2a65-4d41-a713-98c753ccb600.png)

If you see this error, make sure you're not uploading a gzipped index.html.

**Fix:** Disable gzip compression in `vite.config.js` in your Needle web project folder. Remove the line with `viteCompression({ deleteOriginFile: true })`, rebuild, and upload to itch.
:::

### <logo-header logo="/imgs/github-logo.webp" alt="GitHub">Deploy to GitHub Pages</logo-header>

Free static hosting, perfect for open source projects and documentation.

:::details Unity: Deploy to GitHub Pages

Add the `DeployToGithubPages` component to your scene and copy-paste your GitHub repository URL or GitHub Pages URL.

![Deploy To GitHub Pages Component](/deployment/deploytogithubpages.jpg)

<video-embed src="https://www.youtube.com/watch?v=Vyk3cWB6u-c" />

:::

#### Troubleshooting GitHub Pages

**Deployed but website is not live:**
- First deployment can take a few minutes. Check the **Actions** tab on GitHub (`/actions`) to see deployment progress.
- If not live after a few minutes or no workflow appears in **Actions**, go to **Settings → Pages** (`/settings/pages`) and ensure **Branch** is set to `gh-pages`.

### <logo-header logo="/imgs/facebook-logo.webp" alt="Facebook">Deploy to Facebook Instant Games</logo-header>

Reach users on Facebook and Facebook Messenger with instant-loading games.

**No manual adjustments required** – Needle Engine handles everything automatically.

:::details Unity: Deploy to Facebook Instant Games

1. Add the `Deploy To Facebook Instant Games` component to your scene
   ![Deploy to Facebook Instant Games](/deployment/deploytofacebookinstantgames.jpg)

2. Click **Build For Instant Games**

3. After the build finishes, you'll get a ZIP file to upload to your Facebook app

4. On Facebook, add the **Instant Games** module and go to **Instant Games → Web Hosting**
   ![Hosting Facebook Instant Games](/deployment/deploytofacebookinstantgames-hosting.jpg)

5. Upload your zip using **Upload version** (1). After processing, click **Stage for testing** (2) or **Push to production** (star icon)
   ![Upload to Facebook Instant Games](/deployment/deploytofacebookinstantgames-upload.jpg)

6. Click the **Play** button next to each version to test your game on Facebook

:::

:::details How to create a Facebook app with Instant Games

1. [Create a new app](https://developers.facebook.com/apps/creation/) and select **Other**, then click **Next**
   ![Create Facebook App](/deployment/facebookinstantgames-1.jpg)

2. Select type **Instant Games**
   ![Select Instant Games](/deployment/facebookinstantgames-2.jpg)

3. After creating the app, add the **Instant Games** product
   ![Add Instant Games Product](/deployment/facebookinstantgames-3.jpg)

See the [official Instant Games documentation](https://developers.facebook.com/docs/games/build/instant-games) for more details.

**Note:** You only need to create the app – Needle Engine handles all technical requirements automatically.
:::

### <logo-header logo="/imgs/ftp-icon.webp" alt="FTP">Deploy to FTP</logo-header>

Deploy directly to any server with FTP or SFTP support.

:::details Unity: Deploy to FTP server

1. Add the `DeployToFTP` component to a GameObject in your scene
   *(Best practice: add it to the same GameObject as ExportInfo)*

2. Assign an FTP server asset and fill in server, username, and password
   *Get these credentials from your hosting provider when you create an FTP account*

3. Click **Build & Deploy** to build and upload to your FTP account

![Deploy to FTP Component](/deployment/deploytoftp.jpg)

*Deploy to FTP component*

![FTP Server Asset](/deployment/deploytoftp2.jpg)

*FTP Server asset containing access information*

![Deploy to FTP with Server Assigned](/deployment/deploytoftp3.jpg)

*Deploy To FTP component with server asset assigned. You can deploy to a subfolder using the path field*

:::

:::details Manual FTP deployment

1. Open **File → Build Settings**, select **Needle Engine**, and click **Build**
2. Wait for the build to complete – the `dist` folder will open automatically
3. Copy the files from the `dist` folder to your FTP storage

**That's it!** 😉

![Dist Folder](https://user-images.githubusercontent.com/2693840/187311461-e6afb2d7-5761-48cf-bacb-1c1733bb768b.png)

**Troubleshooting:**

**Website doesn't work after upload:**
Your web server may not support serving gzipped files.

**Option 1:** Enable gzip compression on your server using a `.htaccess` file (see below)
**Option 2:** Turn off gzip compression in build settings at **File → Needle Engine → Build Window**

![Build Options Gzip](/deployment/buildoptions_gzip.jpg)

**Build errors during compression:**
Please report the bug! To get unstuck immediately, toggle **Development Build** on in Build Settings.

:::

#### Enabling gzip using a .htaccess file

Create a file named `.htaccess` in your upload folder (or parent folder) with this content:

```apache
<IfModule mod_mime.c>
RemoveType .gz
AddEncoding gzip .gz
AddType application/javascript .js.gz
```

Upload the `.htaccess` file to your server.

---

## <logo-header logo="/imgs/folder-icon.webp" alt="Folder">Build To Folder</logo-header>

Build your project locally for manual upload to any web server or hosting service.

When using our default Vite template, the build output folder is `<webproject>/dist`.

**Unity: Access Build Options**

Open **File → Needle Engine → Build Window**:

![Unity Build Window](/imgs/unity-build-window-2.jpg)

**Available Options:**

- **Build to Disk** – Create production build in the `dist` folder
- **Preview Build** – Build and start a local server to preview the final result
- **Development Build** – Disable compression for debugging (not recommended for production)

:::tip Node.js is only required during development
The distributed website (using our default Vite template) is a static page that doesn't rely on Node.js and can be hosted on any regular web server.

Node.js is only required if you want to run our minimalistic networking server for multiplayer experiences.
:::

---



~~[Glitch](https://glitch.com/) provides fast and free hosting for websites of all sizes. Includes a built-in networking server for multiplayer experiences.~~

**This section is kept for historical reference only.**

:::details Unity: Deploy to Glitch step-by-step

1. Add the `DeployToGlitch` component to the GameObject with the `ExportInfo` component

2. Click the **Create new Glitch Remix** button
   ![Deploy to Glitch Button](/deployment/deploytoglitch-1.jpg)

3. Glitch will create a remix of the template. Copy the URL from your browser
   ![Glitch URL](https://user-images.githubusercontent.com/5083203/179834901-f28852a9-6b06-4d87-8b5b-0384768c92c1.png)

4. Paste the URL in the **Project Name** field of your `Deploy To Glitch` component
   ![Paste URL](https://user-images.githubusercontent.com/5083203/179835274-033e5e1d-b70d-4b13-95ad-f1e2f159b14e.png)

5. Wait a few seconds for Unity to receive your deployment key from Glitch
   *The key is stored safely in the `.env` file on Glitch. Do not share it with others.*
   ![Waiting for Key](/deployment/deploytoglitch-2.jpg)

6. Click **Build & Deploy** to upload to Glitch

:::

:::details Blender: Deploy to Glitch step-by-step
![Deploy To Glitch from Blender](/blender/deploy_to_glitch.webp)

1. Find the Deploy To Glitch panel in the Scene tab
2. Click the **Remix on glitch** button
3. Your browser will open the Glitch project template
4. Wait for Glitch to generate a new project
5. Copy-paste the project URL as the project name in Blender
   *(You can paste the full URL, the panel will extract the necessary information)*
6. On Glitch, open the `.env` file and enter a password in the **DEPLOY_KEY** field
7. Enter the same password in Blender in the **Key** field
8. Click **DeployToGlitch** to build and upload
9. A browser will open when finished. Refresh the page if it shows black initially.

:::

:::details Troubleshooting Glitch

**Error: "there was an error starting the editor"**
1. Click **OK**
2. Go to [glitch.com](https://glitch.com/) and sign in
3. Try clicking the button again in Unity or Blender

:::

## Advanced Topics

### Cross-Platform Deployment Workflows

You can create Unity projects that build to both Needle Engine and regular Unity platforms (Desktop, WebGL, etc.). Our component mapping approach means no runtime logic is modified in Unity.

**Using Unity Play Mode:**

In **Project Settings → Needle Engine**, toggle **Override Play Mode** and **Override Build Settings** to switch between Needle's build process and Unity's build process:

![Unity Play Mode Settings](https://user-images.githubusercontent.com/2693840/187308490-5acb9016-ffff-4113-be62-4de450a42b08.png)

:::tip Dual Platform Development
This approach may require duplicate code (C# for Unity, TypeScript for Needle Engine). The amount of extra work depends on your project complexity.
:::

### Needle Engine Command Line Arguments for Unity

Needle Engine for Unity supports command-line arguments for batch exports and builds.

**Available Options:**

| Argument | Description |
| -- | -- |
| `-scene` | Path to a scene or asset to export<br/>Example: `Assets/path/to/myObject.prefab` or `Assets/path/to/myScene.unity` |
| `-outputPath <path>` | Set the output path for the build<br/>Example: `-outputPath path/to/output.glb` |
| `-buildProduction` | Run a production build |
| `-buildDevelopment` | Run a development build |
| `-debug` | Open a console window for debugging |

**Example Usage:**

```bash
Unity.exe -batchmode -projectPath "C:/MyProject" -scene "Assets/Scenes/MyScene.unity" -buildProduction -quit
```

---

## Next Steps

**Learn More:**
- [Getting Started Guide](./getting-started/) – Set up your first project
- [Features Overview](./features-overview) – See what's possible
- [Needle Cloud Documentation](./cloud/index.md) – Official hosting platform

**Optimize Your Project:**
- [Export Guide](./export.md) – Best practices for assets
- [Component Reference](./component-reference.md) – Available components

**Get Help:**
- [Forum](https://forum.needle.tools) – Ask questions and share projects
- [Discord](https://discord.needle.tools) – Join the community
- [Support](./support) – Additional resources
