---
title: Deployment Platforms
description: Deploy your Needle Engine projects to the web with one click. Learn how to publish to Netlify, Vercel, GitHub Pages, itch.io, FTP servers, and more. Includes optimization tips for production builds with KTX2 and Draco compression.
---

# Deployment Platforms

**Get your Needle Engine projects live on the web.** Deploy to popular hosting platforms like Netlify, Vercel, GitHub Pages, and more.

:::tip Optimize Your Build First
Before deploying to production, optimize your project for best performance:
**[Optimization & Compression →](/docs/how-to-guides/optimization/)**

Learn about texture compression (KTX2), mesh compression (Draco/Meshopt), progressive loading, and build types.
:::

## What does deployment mean?

Deployment is the process of making your application available to the public on a website. Needle Engine ensures that your project is as small and fast as possible by using the latest compression techniques such as **KTX2**, **Draco**, and **Meshopt**. Learn more about [Optimization & Compression](/docs/how-to-guides/optimization/).

## Quick Start: Choose Your Platform

Pick a hosting platform that fits your needs:

- **[Needle Cloud](/docs/cloud/#deploy-from-unity)** – Official Needle hosting. Great for all kinds of spatial web apps and 3D assets.
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

## Deployment Options

### <logo-header logo="/imgs/needle-logo.webp" alt="Needle Cloud">Deploy to Needle Cloud</logo-header>

**Official Needle hosting** – The fastest way to get your Needle Engine projects online with built-in networking support.

Needle Cloud provides instant deployment, automatic HTTPS, and seamless integration with multiplayer and networking features.

:::details Unity: Deploy to Needle Cloud

1. Add the **Needle Engine** component to your scene (if not already present)
2. Click **Upload to Needle Cloud** in the component inspector
3. Sign in to your Needle Cloud account when prompted
4. Choose your team and project name, then click **Upload**

Your project will be live at `https://<your-project-name>.needle.run` with automatic updates on every deployment.

![Deploy to Needle Cloud from Unity](/cloud/cloud-deploy-v3.webp)

:::

:::details Blender: Deploy to Needle Cloud

1. Open the **Needle Engine** panel in your scene (if not already present)
2. Sign in to your Needle Cloud account when prompted
3. Then click **Upload to Needle Cloud**

Your project will be live at `https://<your-blendfile-name>.needle.run` with automatic updates on every deployment.  
Note: The deployment url will by default be based on your blend file name.

![Deploy to Needle Cloud from Blender](/blender/blender-deploy-to-needle-cloud.webp)

:::

**Features:**
- **Instant deployment** – Get your project online in seconds
- **Built-in networking** – Multiplayer and real-time features work out of the box
- **Automatic HTTPS** – Secure connections by default
- **Version management** – Keep track of all your deployments
- **Custom domains** – Use your own domain name (Pro plan)

**Learn more:** [Needle Cloud Documentation](/docs/cloud/)

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

### Deploy to Glitch 🎏

:::warning Deprecated - Service Discontinued
Glitch has discontinued their hosting service. This deployment option is no longer available.

**Alternatives:**
- **[Needle Cloud](./cloud/#deploy-from-unity)** – Official Needle hosting with built-in networking support
- **[Netlify](#deploy-to-netlify)** – Professional hosting with custom domains
- **[Vercel](#deploy-to-vercel)** – Excellent performance for frontend projects
- **[Build to Folder](#build-to-folder)** – Deploy to any web server manually
:::

### <logo-header logo="/imgs/ftp-icon.webp" alt="FTP">Deploy to FTP</logo-header>

Deploy directly to any server with FTP or SFTP support.

:::details Unity: Deploy to FTP server

1. Add the `DeployToFTP` component to a GameObject in your scene
   *(Best practice: add it to the same GameObject as Needle Engine)*

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

#### Enabling gzip using a htaccess file

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

**<logo-header logo="/imgs/unity-logo.webp" alt="Unity">Unity: Access Build Options</logo-header>**

Open **File → Needle Engine → Build Window**:

![Unity Build Window](/imgs/unity-build-window-2.jpg)

**Available Options:**

- **Build to Disk** – Create production build in the `dist` folder
- **Preview Build** – Build and start a local server to preview the final result
- **Development Build** – Disable compression for debugging (not recommended for production)

**Learn more:** [Optimization & Compression](/docs/how-to-guides/optimization/) - Build types, compression options, and best practices

:::tip Node.js is only required during development
The distributed website (using our default Vite template) is a static page that doesn't rely on Node.js and can be hosted on any regular web server.

Node.js is only required if you want to run our minimalistic networking server for multiplayer experiences.
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

Needle Engine for Unity supports command-line arguments for batch exports and builds using -batchmode (headless/CLI options).

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

**Optimize Your Build:**
- [Optimization & Compression](/docs/how-to-guides/optimization/) – Make your project load faster and run smoother
- [Export Guide](/docs/how-to-guides/export/) – Best practices for 3D assets

**Learn More:**
- [Getting Started Guide](/docs/getting-started/) – Set up your first project
- [Needle Cloud Documentation](/docs/cloud/) – Official hosting platform
- [Features Overview](/docs/explanation/core-concepts/features-overview) – See what's possible

**Get Help:**
- [Forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=deployment) – Ask questions and share projects
- [Discord](https://discord.needle.tools) – Join the community
- [Help & Community](/docs/help/) – Additional resources
