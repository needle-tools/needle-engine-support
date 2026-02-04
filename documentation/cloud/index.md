---
title: Needle Cloud
description: 'Needle Cloud is an online service. It helps you store, manage, and share 3D assets and apps on the web.
 A variety of file formats are supported, including glTF, USD, FBX, VRM, and more. Spatial web apps made with Needle can be deployed to the cloud directly from the Unity integration, and via command line (CLI).'
---

<br/>
<discountbanner/>


# Needle Cloud

## Overview

**Needle Cloud is the official hosting and optimization platform for Needle Engine**—a core part of Needle Services. Store, manage, and share 3D assets and apps on the web. Deploy spatial web apps, optimize 3D files, and collaborate with your team—all from one platform.

:::tip Quick Links
**Get Started:** [Create a free account](https://cloud.needle.tools)

**Deploy Apps:** [From Unity](#deploy-from-unity) • [From Blender](#deploy-from-blender) • [From CLI](#deploy-from-the-cli)

**Manage Assets:** [Upload 3D Assets](#cloud-assets) • [Supported Formats](#supported-3d-formats)
:::

![Needle Cloud Overview](/cloud/cloud-overview-page.webp)

## Why Use Needle Cloud?

Needle Cloud offers significant advantages over traditional hosting solutions like FTP, self-hosting, or generic cloud storage.

### vs. Self-Hosting / FTP

| Feature | Needle Cloud | Self-Hosting / FTP |
| --- | --- | --- |
| **Global CDN** | ✅ Instant worldwide delivery | ❌ Single server location, slow for distant users |
| **Automatic Optimization** | ✅ Draco, KTX2, Progressive Loading | ❌ Manual optimization required |
| **Version Control** | ✅ Built-in with labeled versions | ❌ Manual file management |
| **Preview URLs** | ✅ Each upload gets unique URL | ❌ Must manage URLs manually |
| **Deploy from Editor** | ✅ One-click from Unity | ❌ Manual export and upload |
| **Password Protection** | ✅ Built-in per-project | ❌ Server configuration required |
| **Setup Time** | ✅ Minutes | ❌ Hours or days |
| **Maintenance** | ✅ Zero—we handle it | ❌ Ongoing server management |

### Key Benefits

**🌍 Global CDN Performance**  
Your apps and assets are served from servers closest to your users worldwide. No need to configure or pay for CDN separately—it's included.

**⚡ Automatic Optimization**  
Upload any format (glTF, USD, FBX, VRM) and get automatic compression with Draco, KTX2, and Progressive Loading. Saves ~90% bandwidth and memory compared to unoptimized files.

**🏷️ Version Control & Preview URLs**  
Every upload gets a unique URL. Label versions as `main`, `experimental`, or `dev`. Share a labeled link once—it auto-updates when you move the label. Perfect for client reviews.

**🚀 Deploy from Anywhere**  
One-click from Unity, command-line from any web project, or automated via GitHub Actions. No manual FTP uploads or SSH commands.

**🔒 Built-in Security**  
Password-protect projects with one click. Role-based access control for teams. Private by default—not a marketplace or social network.

**👥 Team Collaboration**  
Multiple team members can deploy and manage assets. Role-based permissions (Owner, Manager, Member, Billing) ensure the right access levels.

**🤖 CI/CD Ready**  
Deploy automatically on every commit with GitHub Actions integration or custom CI/CD pipelines via the CLI.

:::tip Perfect for Agencies & Studios
Needle Cloud is designed for professional workflows. Spend time creating, not managing servers and build pipelines.
:::


## <logo-header logo="/imgs/unity-logo.webp" alt="Unity">Deploy from Unity</logo-header>

Needle Cloud is integrated into the Unity Editor. This allows you to deploy your apps directly from Unity to Needle Cloud. You can also upload and download assets from Needle Cloud directly in Unity.

1. **Install the Unity integration, if you haven't already.**   
   See [this page](./../unity/) for more info.

2. **Add the `Needle Engine` component (formerly ExportInfo) to your scene.**   
   This component is used to configure the export settings for your app.  
   You can use the menu item `GameObject > Needle Engine > Add Export Info` or create a new scene from a Needle template via the menu item `File > New Scene`.

3. **Click on `Upload to Needle Cloud`.**  
   This will build your app, and upload it to Needle Cloud. You can also choose to deploy to a specific team and project. The _upload name_ of the project, visible next to the button, is saved in the scene. Future uploads will use the same upload name, and all uploaded versions will be grouped together on the Needle Cloud website.

   ![Needle Cloud Unity Integration](/cloud/cloud-deploy-v3.webp)

## <logo-header logo="/blender/logo.png" alt="Blender">Deploy from Blender</logo-header>

Needle Cloud is integrated into Blender. This allows you to deploy your apps directly from Blender to Needle Cloud.

1. **Install the Blender integration, if you haven't already.**  
   See [this page](./../blender/) for more info.

2. **Find the `Needle Engine` panel in the scene tab.**  
   This panel is used to configure the export settings for your web project and app.

3. **Click on `Upload to Needle Cloud`.**  
   This will build your app, and upload it to Needle Cloud.

   ![Needle Cloud Blender Integration](/blender/blender-deploy-to-needle-cloud.webp)

## <logo-header logo="/imgs/needle-logo.webp" alt="Needle Cloud">Deploy from the CLI</logo-header>

Deploy to Needle Cloud from the command line—perfect for web projects, automation, and CI/CD pipelines.

**Prerequisites:** [Node.js](https://nodejs.org/) installed on your machine. Check with `node -v` in your terminal.

### Basic Usage

**Option 1: npx (Recommended)**

No installation needed—use `npx` to run the CLI directly:

```bash
npx needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
```

**Option 2: Global Installation**

Install once, use everywhere:

```bash
npm install -g needle-cloud
needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
```

### <logo-header logo="/imgs/github-logo.webp" alt="GitHub">CI/CD & Automated Deployments</logo-header>

Deploy automatically from GitHub Actions, GitLab CI, or other CI/CD platforms using access tokens.

**Create an Access Token:**
1. Go to [your team page](https://cloud.needle.tools/team) on Needle Cloud
2. Create a token with `read/write` permissions
3. Add it as a secret in your CI/CD platform

**GitHub Actions Example:**

Use the official [Needle Cloud GitHub Action](https://github.com/marketplace/actions/deploy-to-needle-cloud):

```yml
- name: Deploy to Needle Cloud
  uses: needle-tools/deploy-to-needle-cloud-action@v1
  with:
    token: ${{ secrets.NEEDLE_CLOUD_TOKEN }}
    dir: ./dist
    name: my-project
```

**CLI Command with Token:**

```bash
npx needle-cloud deploy '/path/to/output' \
  --team 'My team' \
  --name 'project-id' \
  --token '<access_token>'
```

### Starting the Needle License Server

For CI/CD systems and automated builds, you can start the Needle license server using:

```bash
npx --yes needle-cloud start-server
```

This is required when running automated builds on CI/CD systems to validate your Needle Engine PRO license.

### Getting Help

```bash
# See all available commands
npx needle-cloud help

# Get help for a specific command
npx needle-cloud help deploy
```

[📦 Full CLI documentation on npm](https://www.npmjs.com/package/needle-cloud)


## Deployment URLs & Version Management

Needle Cloud gives you powerful URL-based version control for your deployments. Every upload creates a permanent URL, and you can use labels to manage which version users see.

### Two Types of URLs

**1. Pinned URLs** – Link to exactly one version (never changes)

Each deployment gets a unique, permanent URL that always points to that specific version:

- [collaborativesandbox-zubcks1qdkhy<strong>-1qdkhy</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-1qdkhy.needle.run/) → Version 1
- [collaborativesandbox-zubcks1qdkhy<strong>-2e2spt</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-2e2spt.needle.run/) → Version 2

These URLs never change, even when you upload new versions. Perfect for archiving or testing specific builds.

**2. Labeled URLs** – Dynamic links that update when you move the label

Labels are pointers you can move between versions. Share the labeled URL once, then update what it points to:

| Label URL | Purpose | Updates When |
| --- | --- | --- |
| `projectname-`**`latest`**`.needle.run` | Always shows newest upload | Automatically on every new upload |
| `projectname.needle.run` (or `-`**`main`**) | Production/stable version | You manually promote a version to `main` |

### Typical Workflow

1. **Deploy a new version** → Gets pinned URL like `project-abc123.needle.run`
2. **`latest` label auto-updates** → Your team sees it at `project-latest.needle.run`
3. **Review and test** → Share the pinned URL or `latest` with your team
4. **Promote to `main`** → Move the `main` label to this version
5. **Clients see the update** → `project.needle.run` now shows the new version

:::tip Why This Matters
- **Client links never break** – Share `project.needle.run` once, update behind the scenes
- **No more "v2 link"** – Labels let you update what users see without new URLs
- **Safe rollbacks** – Move the `main` label back to a previous version instantly
- **Preview specific builds** – Send pinned URLs for exact version testing
:::

### Managing Labels

On the Needle Cloud website, click <kbd>⋮</kbd> next to any version to move labels:
- **Set main label** – Promote this version to production
- **Remove main label** – Unpromote (label stays on previous version)

:::info Custom Labels Coming Soon
The ability to create custom labels like `staging`, `beta`, or `client-preview` is planned for a future release. Currently, you can use `main` and `latest`, plus access any version via its pinned URL.
:::

![Needle Cloud Version List](/cloud/cloud-edit-page.webp)

## Securing Pages

The Needle Cloud dashboard allows you to password-protect your pages and assets to ensure data remains confidential until a product's release. This is particularly useful when collaborating with clients.

<video-embed src="https://www.youtube.com/watch?v=6JsC9TruZQY" limit_height />

### How to Set a Password

1. Navigate to the project you wish to protect.
2. Click on "edit info".
3. Locate the password section.
4. Enter the desired password.
5. Click on "save changes".

A small lock icon 🔒 will now appear next to the project name, indicating that the pages are protected.

### How to Remove the Password Protection

If you wish to make the pages public under the same URL, you must remove the password protection.

1. Navigate back to the project's "edit info"
2. Remove the existing password.
3. Save the changes.

The pages will now be accessible again without requiring a password.

### Accessing Protected Pages

When a user attempts to access the latest version of the asset, they will be greeted with a page that asks for authentication. They must enter the correct password to access the content.

:::important
All pages for this asset will be password-protected, including the main one.
:::


## Cloud Assets

Needle Cloud is not just for hosting apps—it's a powerful asset management system for 3D files.

### Upload & Optimize

**Drag and drop** files into the website or select them from your computer. Supported formats include glTF, USD, FBX, VRM, OBJ, and more.

- Non-glTF files are automatically converted to glTF for optimization
- Original files are kept for download
- Automatic compression with Draco, KTX2, and Progressive Loading
- Typically saves 90% or more bandwidth and memory

### Version Control & Sharing

**Track multiple versions** of each asset:
- Upload new versions anytime
- Label versions as `main`, `experimental`, `dev`, etc.
- `Latest` always points to the most recent upload
- Share tagged links that auto-update when you move labels

**Share with your team:**
- Create direct download links
- Share Needle Cloud viewer links
- Password-protect sensitive assets

### Use Assets in Your Projects

**In Needle Engine:**

Use the `Needle Cloud Asset` component to load assets at runtime. Keeps project sizes small and enables cloud updates.

:::tip Progressive Loading
Cloud assets automatically load only what's needed using our Progressive Loading technology. This saves ~90% bandwidth and memory compared to loading full assets.
:::

**In Other Engines (Unity, Unreal, etc.):**

Three ways to use cloud assets:

1. **Download and Import** – Standard workflow
2. **Direct Link** – Link to cloud asset for automatic updates
   - Progressive Loading: Use `Progressive-World` or `Progressive-Product` link ([learn more](https://www.npmjs.com/package/@needle-tools/gltf-progressive))
   - Draco + KTX2: Use `Optimized` link
   - Basic glTF: Use `Upload` or `Converted` link
3. **Needle Cloud Asset Component** – For Needle Engine projects (works in Unity builds too)

### Embed on Your Website

**Option 1: Needle Cloud Viewer** (Quick embed)

Go to asset's Edit Page → <kbd>Embed</kbd> → Copy iframe code. Embed specific versions or tagged versions that auto-update.

**Option 2: Choose Your Framework**

Get optimized embed code for:
- **Needle Engine** – Full-featured [web component](./../three/)
- **three.js** – With Progressive Loading support
- **React-Three-Fiber** – With Progressive Loading support
- **model-viewer** – Simple, non-interactive 3D viewer
- **Unity** – Needle Cloud Asset component for direct integration

### CLI for Batch Processing

Automate uploads and optimization with the `needle-cloud` CLI:

```bash
# Upload and optimize files
npx needle-cloud upload path/to/file.fbx --team 'My Team'

# Batch process entire folders
npx needle-cloud upload path/to/folder --recursive
```

**Use cases:**
- Part of a build step (replace assets with optimized versions)
- Batch processing large numbers of files
- CI/CD integration

[📦 Full CLI documentation](https://www.npmjs.com/package/needle-cloud)

## Supported 3D Formats

1. **glTF and GLB** <a href="https://cloud.needle.tools/view?file=2oAMeWZ1hWL3C-latest-product" target="_blank">Example</a>   
   The glTF format is the most widely supported format for 3D on the web. It is a lightweight format that can store 3D models, animations, and textures. GLB files are binary versions of glTF files, where all data is stored in a single file.
   glTF supports advanced compression techniques like Draco, KTX2, and Meshopt, which are fully supported by Needle Cloud and Needle Engine.

2. **OpenUSD**   
   USD is a powerful format for 3D data interchange. It is known for its use in the film and VFX industry, and is gaining popularity in the game industry. Needle Cloud supports USDZ and USD files natively through our work on USD-WASM, and also converts USD files to glTF for further processing and optimization.

3. **FBX**  
   FBX has been a popular format for 3D data interchange for many years, but is lacking a number of modern features like PBR materials and extensions. Needle Cloud converts FBX files to glTF for further processing and optimization.  

4. **VRM**  
   VRM is a format for humanoid avatars. It is based on glTF with additional constraints through the use of glTF extensions. Needle Cloud supports VRM files natively, and can optimize them like other glTF files, including complex VRM extensions like phonemes, toon shading and dynamic bones.

5. **OBJ**  
   OBJ is a simple text-based format for 3D models. It supports basic materials through MTL files, animations, and hierarchies of objects. Needle Cloud converts OBJ files to glTF for further processing and optimization. 

:::tip Use glTF or USD when possible
We recommend glTF and USD as the primary formats for 3D data interchange. They are widely supported, have modern features and a good material model.
:::

## RBAC (role-based access control)

Teams consist of members, and each member of a team can get assigned a role. These roles define what you can and cannot do within a team on Needle Cloud.

As your project scales and you add more team members, you can assign them roles to ensure that they have the right permissions to work on your projects.

| | |
| -- | -- |
| **Owner** | Highest level of authority. The owner role can manage the whole team (including billing and member roles), see all projects, uploads and deployments  |
| **Manager** | The manager role can manage the whole team (including billing and member roles), see all projects, uploads and deployments |
| **Billing** | The billing role is specialized for financial operations, can oversee the team's billing information, review and manage project cost and handle payment options. <br/>The billing role has view-only access to deployments and assets and can not perform deployments or upload assets. <br/>The billing role can be assigned at no extra cost. The role is limited to one member per team. |
| **Member** | The member role (developer role) can create deployments, upload/download assets for optimization or use AI features. |

## FAQ

1. **What is Needle Cloud?**   
   It’s an online service to upload, compress and share 3D assets and scenes.

2. **How do I upload assets to Needle Cloud?**   
   You can upload files by dragging them onto the website, or by uploading them directly from supported integrations. If you have many files, you can use the CLI (command line interface) or the API (application programming interface).

3. **How do I download optimized files from Needle Cloud?**   
   You can download files from the website. Click on `Share` and then `Download`. You can also use the CLI to download files.

4. **Can I share my files with others?**   
   Yes, you can create links to share your files. Links can either be direct download links, or links to the Needle Cloud viewer.

5. **Is there a limit to file sizes?**   
   Upload limits depend on your plan. Check your account details for more info.

6. **Can Needle Cloud files be used with other tools?**   
   Yes, you can use your files in other programs by exporting them as glTF. USD export is coming at a later point.

7. **What happens if I run out of storage space?**   
   You might need to upgrade your plan or delete old files to make room.

8. **More answers**   
   Visit the [Needle Cloud FAQ](https://cloud.needle.tools/faq)
