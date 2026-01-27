---
title: Embedding Needle Engine
---

# Embedding Needle Engine on Your Website

**Add interactive 3D to any website.** Needle Engine can be integrated into existing websites, embedded in CMSs like WordPress, or deployed as standalone web apps. This guide covers all the ways to get your 3D content live.

## Quick Test: 2-Minute Integration

Want to see how Needle Engine looks on your website? Add these two lines anywhere on your page:

<codewrap>

```html
<!-- Import the component -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>

<!-- Use it like any other HTML element -->
<needle-engine src="https://cloud.needle.tools/-/assets/Z23hmXBZ21QnG-Z21QnG-world/file" background-color="transparent"></needle-engine>
```

</codewrap>

<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%;
    aspect-ratio: 16/9;
    outline: none;
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>

[Open this example on StackBlitz](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)

---

## Deployment Methods

Choose the approach that fits your workflow:

### 1. One-Click Deployment Components (Recommended)

**Best for:** Quick iterations, multiple hosting platforms, team workflows

Our Unity and Blender integrations include built-in deployment components. Deploy to multiple platforms with just a few clicks.

**Supported platforms:**
- [Needle Cloud](./cloud/#deploy-from-unity) – Official hosting with CLI support
- [Netlify](./deployment.md#deploy-to-netlify) – Professional hosting
- [Vercel](./deployment.md#deploy-to-vercel) – Frontend-optimized
- [GitHub Pages](./deployment.md#deploy-to-github-pages) – Free static hosting
- [FTP](./deployment.md#deploy-to-ftp) – Any web server
- [itch.io](./deployment.md#deploy-to-itchio) – Game hosting

**How it works:**

*From Unity or Blender:*
1. Add the "Deploy to..." component to your scene
2. Configure the necessary options
3. Click "Deploy"

*From Command Line (Needle Cloud):*
```bash
# Deploy to Needle Cloud from any web project
npx needle-cloud deploy
```

[Learn more about deployment options](./deployment.md) • [Needle Cloud CLI docs](./cloud/)

:::tip Recommended Workflow
This is the easiest and fastest option. Iterate locally, then upload a new version in seconds.
:::

### 2. Command-Line Deployment (Needle Cloud)

**Best for:** CI/CD pipelines, automation, web-only projects, developers

Deploy to Needle Cloud directly from the command line without Unity or Blender.

**Steps:**

1. Navigate to your web project folder (the one with `package.json`)
2. Run the deploy command:

```bash
npx needle-cloud deploy
```

3. Follow the prompts to:
   - Log in to your Needle Cloud account (if not already logged in)
   - Choose or create a project
   - Confirm deployment

**Features:**
- ✅ **Works from any web project** – No editor needed
- ✅ **Automatic builds** – Builds and optimizes before uploading
- ✅ **Fast updates** – Incremental uploads for quick iterations
- ✅ **CI/CD ready** – Perfect for automated workflows

[Learn more about Needle Cloud CLI →](./cloud/)

:::tip Automated Deployment
Add `npx needle-cloud deploy --ci` to your GitHub Actions or other CI/CD pipeline for automatic deployments on every commit.
:::

### 3. Manual Build & Upload

**Best for:** Custom workflows, unsupported hosting platforms

Build your project and manually upload the distribution files to any web server.

**Steps:**
1. Create a production build of your web project
   - This generates a `dist/` folder with all files
2. Upload the contents of the `dist/` folder to your web host
   - Use FTP, SFTP, or your host's file manager
3. Your web app is live!

:::tip URL Structure
The folder location determines your app's URL:
- Domain: `https://your-website.com/` points to `/var/www/html`
- Upload to: `/var/www/html/my-app/`
- Your URL: `https://your-website.com/my-app/`
:::

### 4. iframe Embedding

**Best for:** Limited website access, CMS platforms (WordPress, Wix), quick embeds

Embed your Needle Engine scene like you would a YouTube video.

**Steps:**
1. Build and upload your project to any web host
2. Add an iframe to your website:

```html
<iframe
    src="https://your-website.com/needle-files/dist/index.html"
    allow="xr; xr-spatial-tracking; fullscreen;"
    style="width: 100%; height: 600px; border: none;">
</iframe>
```

:::tip Required Permissions
The `allow` attribute depends on your app's features:
- **XR apps:** `xr; xr-spatial-tracking`
- **Fullscreen:** `fullscreen`
- **Camera/Mic:** `camera; microphone`
- **More features:** `accelerometer; gyroscope; display-capture; geolocation`

[See full list of iframe permissions →](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy#directives)
:::

### 5. Direct Integration (Advanced)

**Best for:** Existing websites, custom layouts, advanced control

Embed a Needle Engine project directly into an existing webpage's HTML.

**Steps:**

1. Build your project (creates a `dist/` folder)
2. Upload the `dist/` folder to your web host
3. Open `dist/index.html` in a text editor and find these lines:

```html
<head>
    <script type="module" crossorigin src="./assets/index-732f0764.js"></script>
</head>
<body>
    <needle-engine src="assets/scene.glb"></needle-engine>
</body>
```

4. Copy both lines to your target website, updating paths:

```html
<script type="module" src="/your-upload-folder/assets/index-732f0764.js"></script>
<needle-engine src="/your-upload-folder/assets/scene.glb"></needle-engine>
```

---

### 6. CDN for Core Components Only

**Best for:** Projects without custom scripts, quick prototypes, simple scenes

Use Needle Engine directly from a CDN without uploading any JavaScript bundles.

**Requirements:** Your project must use only core Needle Engine components (no custom scripts).

**Steps:**

1. Add the CDN script to your website:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="https://your-website.com/assets/MyScene.glb"></needle-engine>
```

2. Upload your `assets/` folder to your web host
   - Contains `.glb` files and other assets (audio, video, skybox, etc.)
3. Update the `src` attribute to point to your uploaded `.glb` file

### 7. Needle Cloud iframe

**Best for:** Projects hosted on Needle Cloud, quick sharing, portfolios

If you've deployed to [Needle Cloud](./cloud/), embed it anywhere with a simple iframe.

**How to get the embed code:**
1. Go to your asset page on Needle Cloud
2. Click the "Embed" button
3. Copy the generated iframe code

```html
<iframe
    src="https://cloud.needle.tools/view/embed?file=Z23hmXBZ21QnG-Z21QnG-world"
    title="Your Project | Hosted on Needle Cloud"
    style="width: 100%; height: 600px"
    frameborder="0"
    allow="xr-spatial-tracking; accelerometer; gyroscope; display-capture; geolocation; camera; microphone"
    allowfullscreen>
</iframe>
```

<iframe src="https://cloud.needle.tools/view/embed?file=Z23hmXBZ21QnG-Z21QnG-world" title="The forgotten knight | Hosted on Needle Cloud" style="width: 100%; height: 600px" frameborder="0" allow="xr-spatial-tracking; accelerometer; gyroscope; display-capture; geolocation; camera; microphone" allowfullscreen></iframe>

## Common Workflows

### Client Projects: Professional Deployment

When building a web app for a client, consider these factors:

#### 1. Determine the Type of Application

- **Standalone app** – Accessible via a link on the client's domain
- **Integrated app** – Part of existing website with server-side/client-side components
- **Embedded experience** – Inside a CMS or existing page

#### 2. Choose the URL Structure

The app can be hosted at:

| Option | Example | When to Use |
| --- | --- | --- |
| **Needle Cloud** | `myproject.needle.run` | Prototypes, development, demos |
| **Subpage** | `client-site.com/app` | Part of existing site |
| **Subdomain** | `app.client-site.com` | Separate but branded |
| **Domain** | `my-app.com` | Standalone product |

:::tip Development to Production
Start on [Needle Cloud](./cloud/) for prototypes and development, then move to the client's domain for the final version. This approach balances speed with branding requirements.
:::

#### 3. Plan Deployment & Maintenance

**Access & Updates:**
- Will you have FTP/SFTP access to upload updates?
- Will the client manage deployments?
- How often does content need updating?

:::tip FTP Access
Request FTP/SFTP access to a folder on the client's server. Use our [Deploy to FTP](./deployment.md#deploy-to-ftp) component for easy uploads. The client's IT team handles URL configuration.
:::

**Content Type:**
- **Static content** – Occasional updates via new builds
- **Dynamic content** – May need CMS or database integration

**Target Audience:**
- Which devices and browsers do users have?
- Test on actual target devices (especially for AR/VR)

#### 4. Set Up Test & Production Environments

Test the deployment process early:
1. Set up a test environment (your own server or subdomain)
2. Practice the deployment workflow
3. Get client approval on test environment
4. Deploy to production environment

#### 5. Development Workflow

Iterate efficiently:
1. Develop and test locally
2. Deploy to test server for client review
3. After approval, deploy to production server
4. Repeat as needed

## Platform-Specific Integrations

### <logo-header logo="/imgs/framer-logo.webp" alt="Framer"><a href="./integrating-with-framer.html">Framer</a></logo-header>

Integrate Needle Engine scenes into Framer websites.

### <logo-header logo="/imgs/wordpress-logo.webp" alt="WordPress"><a href="./integrating-with-wordpress.html">WordPress</a></logo-header>

Embed Needle Engine in WordPress posts, pages, and custom themes.

### <logo-header logo="/imgs/shopify-logo.webp" alt="Shopify">Shopify</logo-header>

:::warning Under Construction
Shopify integration guide coming soon. In the meantime, use the [iframe method](#4-iframe-embedding) for quick integration.
:::

### <logo-header logo="/imgs/webflow-logo.webp" alt="Webflow">Webflow</logo-header>

:::warning Under Construction
Webflow integration guide coming soon. In the meantime, use the [iframe method](#4-iframe-embedding) for quick integration.
:::

## Next Steps

**Configuration & Customization:**
- [Web Component Attributes](./reference/needle-engine-attributes.md) – Configure the `<needle-engine>` element
- [Scripting Guide](./scripting.md) – Add custom functionality
- [Deployment Options](./deployment.md) – Explore all hosting platforms

**Editor Integrations:**
- <logo-header logo="/imgs/unity-logo.webp" alt="Unity"><a href="./unity/">Unity Integration</a></logo-header> – Visual scene creation with Unity
- <logo-header logo="/blender/logo.png" alt="Blender"><a href="./blender/">Blender Integration</a></logo-header> – Visual scene creation with Blender

**Get Help:**
- [Forum](https://forum.needle.tools) – Ask questions and share projects
- [Discord](https://discord.needle.tools) – Join our community
- [FAQ](./faq.md) – Common questions and troubleshooting

:::tip Visual Scene Creation
Did you know Needle Engine integrates with Unity and Blender? Create complex 3D scenes visually and export them directly to the web. Perfect for non-coders or teams with 3D artists.

<logo-header logo="/imgs/unity-logo.webp" alt="Unity"><a href="./unity/">Learn about Unity Integration</a></logo-header> • <logo-header logo="/blender/logo.png" alt="Blender"><a href="./blender/">Learn about Blender Integration</a></logo-header>
:::
