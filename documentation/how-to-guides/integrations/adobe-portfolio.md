---
title: Integrating with Adobe Portfolio
---

# <logo-header logo="/imgs/adobe-portfolio-logo.svg" alt="Adobe Portfolio">Integrating with Adobe Portfolio</logo-header>

[Adobe Portfolio](https://portfolio.adobe.com) lets you build a portfolio site without writing code. You can add interactive 3D to any page by embedding a Needle scene through Portfolio's **Embed** module — no build step, no hosting to set up.

The fastest path is **[Needle Cloud](/docs/cloud/)**: drop your 3D file onto the website, and it's optimized, hosted, and ready to embed in seconds.

## 1. Upload your model to Needle Cloud

1. Go to [cloud.needle.tools](https://cloud.needle.tools) and **drag your 3D file onto the page** (or click to select it).
2. Needle Cloud automatically compresses it (Draco + KTX2) and adds [Progressive Loading](/docs/gltf-progressive/) — so the model loads fast, even on mobile, saving ~90% bandwidth and memory compared to the raw file.

You don't need a Unity or Blender project for this — just the exported model file.

:::tip Supported file formats
Needle Cloud accepts **glTF / GLB, USD / USDZ, FBX, VRM, and OBJ**. glTF and USD are used natively; FBX, OBJ, and other formats are converted to glTF for optimization. We recommend exporting to **glTF or USD** when you can. See [Supported 3D Formats](/docs/cloud/#supported-3d-formats).
:::

## 2. Customize the 3D view — no code required

Open your uploaded asset in Needle Cloud and use the **viewer settings** to make it look right on your page — all without touching code:

- Pick a **[FastHDR skybox](/docs/explanation/fasthdr)** from 27+ built-in environments (or upload your own `.hdr`/`.exr`), and set environment/background intensity, blur, and rotation.
- Toggle **Ground Projection**, adjust lighting, framing, and the camera.
- Set a transparent or custom background.

Your changes are saved with the asset and carry over to the embed automatically.

## 3. Copy the embed code from Needle Cloud

1. Open your asset's **Edit** page on Needle Cloud.
2. Click <kbd>Embed</kbd> and copy the ready-made **iframe** code. It looks like this:

```html
<iframe src="https://cloud.needle.tools/view/embed?file=YOUR-ASSET-ID"
    style="width: 100%; height: 500px; border: none;"
    allow="xr; xr-spatial-tracking; fullscreen">
</iframe>
```

You can embed a specific version or a moving label like `latest`, so the page updates automatically when you upload a new version — no need to touch Portfolio again.

## 4. Paste it into Adobe Portfolio

1. Edit the Portfolio page or project where you want the 3D content.
2. Add an **Embed** module (the <kbd>+</kbd> / add-content button → **Embed**).
3. Paste the iframe code from step 3 and apply it.

Your interactive 3D scene now appears on the page — visitors can orbit, zoom, and (where supported) view it in AR.

:::warning Adobe Portfolio only accepts iframe embeds — and may restrict the source
Portfolio's Embed module accepts `<iframe>` code only, and has historically allowed iframes from a limited set of providers (YouTube, Vimeo, Adobe Express, …). If it rejects the Needle embed with an **"invalid embed code"** error, use the fallback below.
:::

### Fallback: link to the full-screen viewer

If the Embed module won't accept the iframe, you can still share the scene by **linking to the Needle Cloud viewer** instead of embedding it inline. On the asset's Share menu, copy the **viewer URL**:

```
https://cloud.needle.tools/view?file=YOUR-ASSET-ID
```

Add it in Portfolio as a button or a linked thumbnail (use a screenshot of your model as the image). Clicking it opens the interactive 3D scene full-screen in a new tab.

:::tip Embedding a full Needle Engine app
The steps above embed a **3D asset** via the Needle Cloud viewer. If you've built a full interactive app (a Unity/Blender or code project deployed to Needle Cloud), embed its `*.needle.run` deployment URL the same way — click <kbd>Share</kbd> on the deployment to copy its iframe code. Note that cross-site embedding of `*.needle.run` deployments requires an EDU/Pro/Enterprise license; see [X-Frame-Options](/docs/reference/faq#my-embedded-scene-shows-refused-to-display-because-it-set-x-frame-options-to-sameorigin).
:::

## There are more integration options

See [Embedding a Needle project into an existing website](/docs/how-to-guides/deployment/embedding#platform-specific-integrations) for more options and details.
