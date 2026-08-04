---
title: Build Playable Ads
description: Build playable ads from a Needle Engine project.
---

# Build Playable Ads

Use `playableAds` to add ad-platform outputs to a Needle project. This option does not change the standard web output.

::: info Supported platforms
Needle supports AppLovin, Unity Ads, TikTok, Google Ads, Meta, Mintegral, and WeChat/Weixin Mini Games.
:::

## Requirements

- A Needle project that has a valid production build
- A commercial Needle license for output without Needle branding
- An iOS or Android store URL
- Access to each selected ad platform

For definitions of MRAID and host APIs, read [How Playable Ads Work](/docs/explanation/playable-ads).

## Design the playable

### Support portrait and landscape

Build one layout that works in both orientations. Needle updates the camera aspect ratio when the viewport changes.

Add a **ViewBox** component around the required gameplay area. The ViewBox keeps this area inside the camera view. Leave space around the ViewBox for host controls and device safe areas.

Read [Create Responsive 3D Layouts](/docs/how-to-guides/web-integration/responsive-design#method-2-viewbox) for the ViewBox setup.

The ad host sets the available viewport. Its width, height, aspect ratio, and pixel ratio change across devices and placements.

Support small phone viewports, for example 320 × 480. Also support larger viewports, for example 1280 × 720. Support the rotated orientations and intermediate aspect ratios.

These sizes are examples. They are not fixed platform sizes or limits. Google accepts 320 × 480 and 480 × 320 metadata, but it still requires responsive full-screen content. See the [Google HTML5 asset rules](https://support.google.com/google-ads/answer/12771973).

The layout size and the WebGL render size can differ because of the device pixel ratio. Build the layout from the viewport size. Do not position UI from the render-buffer resolution.

AppLovin requires support for both orientations. See the [AppLovin HTML playable rules](https://support.applovin.com/en/growth/promoting-your-apps/welcome-to-applovin/creative-specs-and-guidelines#html-playable-specifications).

Resize the browser from narrow portrait to wide landscape. Then repeat the test in the platform preview. Check these items:

- The player, objective, and CTA stay inside the view.
- Host controls do not cover important content.
- Text stays readable.
- Touch targets keep a usable size.
- The game remains playable after an orientation change.

### Build the UI in the scene

WeChat/Weixin Mini Games do not have an HTML page. Use Needle UI for every required control when WeChat is a target.

1. Add a Needle **Canvas** to the scene.
2. Use **RectTransform** anchors for screen edges and corners.
3. Use layout groups for rows, columns, and button groups.
4. Add **Button**, **Image**, and **Text** components below the Canvas.
5. Resize the preview from narrow portrait to wide landscape.

Needle renders this UI with WebGL. The same UI works in HTML hosts and HTML-less hosts.

Use a screen-space Canvas for a HUD. Use a world-space Canvas for controls inside the 3D scene. Read [UI Components](/docs/reference/components#ui) and [Add Spatial UI Text](/docs/how-to-guides/components/ui-text).

### Connect game actions to the host

A Needle Button handles the pointer input. Connect the Button to the playable bridge for host actions.

```ts
import { Behaviour } from "@needle-tools/engine";
import { getPlayableAd } from "@needle-tools/engine/playable";

export class PlayableActions extends Behaviour {
    startGame() {
        getPlayableAd().start();
    }

    gameReady() {
        getPlayableAd().notifyReady?.();
    }

    completeGame() {
        getPlayableAd().notifyEnd?.();
    }

    retryGame() {
        getPlayableAd().notifyRetry?.();
    }

    openStore() {
        getPlayableAd().open();
    }
}
```

Add this component to a GameObject. Connect each UI Button `onClick` event to the matching method.

Call `startGame()` from the first interaction that starts the game. Call `openStore()` only from the install CTA. Do not use `window.open()` or a direct link.

The build profile maps `openStore()` to the selected host API:

| Platform | CTA call |
| --- | --- |
| AppLovin and Unity Ads | `mraid.open()` |
| TikTok | TikTok Playable SDK |
| Google Ads | `ExitApi.exit()` |
| Meta | `FbPlayableAd.onCTAClick()` |
| Mintegral | `window.install()` |
| WeChat/Weixin | `open` handler in the WeChat platform adapter |

Mintegral also receives the ready, end, and retry notifications. Other profiles ignore notifications that their host does not use.

### Keep the file within the platform limit

Needle production builds compress meshes, textures, scripts, and scene data. The playable profile then packages the local files and checks the upload size.

Read the build report after each build. It lists the largest embedded files.

If the build exceeds its limit:

1. Set a lower maximum resolution for large textures.
2. Remove texture data that is not visible in the ad.
3. Use texture atlases or palette textures for stylized assets.
4. Simplify dense meshes before export.
5. Reuse materials and geometry.
6. Remove unused physics, post-processing, audio, and fonts.
7. Build again and read the new report.

Compression stores geometry efficiently. It does not remove draw calls or unnecessary model detail. Plan repeated objects and large scenes for a small source asset.

Read [Texture Compression](/docs/how-to-guides/optimization/compress-textures), [Mesh Compression](/docs/how-to-guides/optimization/compress-meshes), and [Production Build Settings](/docs/how-to-guides/optimization/production-build-settings).

## 1. Add the platforms

Add `playableAds` to the existing `needlePlugins()` settings. The `platforms` array controls the outputs.

```js
import { defineConfig } from "vite";
import { loadConfig, needlePlugins } from "@needle-tools/engine/vite";

export default defineConfig(async ({ command }) => {
    const needleConfig = await loadConfig();
    return {
        plugins: [needlePlugins(command, needleConfig, {
            playableAds: {
                name: "MyGame",
                appStoreUrls: {
                    ios: "https://apps.apple.com/app/id0000000000",
                    android: "https://play.google.com/store/apps/details?id=com.example.game",
                },
                platforms: [
                    { platform: "applovin" },
                    { platform: "unity" },
                    { platform: "tiktok" },
                    { platform: "google-ads" },
                    { platform: "meta" },
                    { platform: "mintegral" },
                    { platform: "wechat", appId: "wx0000000000000000" },
                ],
            },
        })],
        build: { outDir: "dist", emptyOutDir: true },
    };
});
```

Delete each platform that you do not need. Unity Ads requires one store URL. WeChat/Weixin requires a Mini Game AppID.

::: warning AppSecret
Do not add a WeChat AppSecret to the project. Store the AppSecret on a trusted server.
:::

## 2. Build the project

```sh
npm run build -- --production
```

Needle exports and optimizes the project first. Needle then creates the selected platform outputs.

```text
dist/
├── AppLovin/index.html
├── UnityAds/index.html
├── TikTok/playable.zip
├── GoogleAds/playable.zip
├── Meta/playable.zip
├── Mintegral/MyGame.zip
└── WeChat/
    ├── game.js
    ├── game.json
    └── project.config.json
```

The build removes offline-incompatible components. Examples are networking and WebXR components. The build log identifies each removed component.

::: tip Build reports
Store build reports outside `dist`. Do not include reports in an uploaded ad.
:::

## 3. Test the output

Do not change a generated file. Test the file that you will upload.

Follow the [playable test procedure](/docs/how-to-guides/deployment/playable-ads/testing).

## 4. Upload the output

| Platform | Upload file | Procedure |
| --- | --- | --- |
| AppLovin | `dist/AppLovin/index.html` | [AppLovin](/docs/how-to-guides/deployment/playable-ads/applovin) |
| Unity Ads | `dist/UnityAds/index.html` | [Unity Ads](/docs/how-to-guides/deployment/playable-ads/unity-ads) |
| TikTok | `dist/TikTok/playable.zip` | [TikTok](/docs/how-to-guides/deployment/playable-ads/tiktok) |
| Google Ads | `dist/GoogleAds/playable.zip` | [Google Ads](/docs/how-to-guides/deployment/playable-ads/google-ads) |
| Meta | `dist/Meta/playable.zip` | [Meta](/docs/how-to-guides/deployment/playable-ads/meta) |
| Mintegral | `dist/Mintegral/MyGame.zip` | [Mintegral](/docs/how-to-guides/deployment/playable-ads/mintegral) |
| WeChat/Weixin | `dist/WeChat` | [WeChat/Weixin](/docs/how-to-guides/deployment/playable-ads/wechat-mini-games) |

## Related pages

- [Playable Ad Build Profiles](/docs/reference/playable-ads)
- [Optimization and Compression](/docs/how-to-guides/optimization/)
- [Responsive 3D Layouts](/docs/how-to-guides/web-integration/responsive-design)
- [Needle UI Components](/docs/reference/components#ui)
