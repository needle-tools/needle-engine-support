---
title: Build Playable Ads and Hosted Games
description: Build playable ads and hosted games from a Needle Engine project.
---

# Build Playable Ads and Hosted Games

Playable Ads are small, interactive ads that can be shown in a mobile app or on a web page. They are often used to promote mobile games. There's usually an ad platform that hosts the playable ad, and an ad host that displays the ad to the user in a mobile app. Playable Ads have strict size limits and other requirements; each platform has its own rules. Read the [How Playable Ads Work](/docs/explanation/playable-ads) page for an overview of the ad architecture, including host APIs, MRAID, and more.

Needle Engine supports building playable ads for multiple platforms from a single project. The build process creates the required files, warns you if it can't meet a platform requirement, and generates a report of the build size and contents.

Discord Activities, YouTube Playables, and Facebook Instant Games are hosted games. They use the same platform list because Needle must localize, optimize, and package the project for each host.

Use `playableAds` to add ad-platform outputs to a Needle project.

::: info Supported platforms
Needle has direct support for AppLovin, Unity Ads, TikTok, Google Ads, Meta, Mintegral, WeChat/Weixin Mini Games, Discord Activities, YouTube Playables, and Facebook Instant Games.
Use the `custom` platform option for a platform without a built-in profile. Read [Custom Playable Ads](/docs/how-to-guides/deployment/playable-ads/custom) for more information.
:::

## Requirements

- A Needle project that builds and runs in the browser
- A commercial Needle license
- An iOS or Android store URL for which app to promote (some platforms need this upfront)
- Platform-specific accounts for uploading and testing the playable ad

## Design the playable

### Support portrait and landscape

Depending on the platform and user device, the playable ad may be displayed in portrait or landscape orientation. On some platforms, you can choose to limit the orientation (e.g. Google Ads), but on others (e.g. AppLovin), the playable ad must support both orientations.

Viewport size can also differ a lot; some ad platforms will display your ad as small as 320 × 480, while others will display it as large as 1280 × 720. Your playable ad should support all of these sizes and orientations.

Read [Create Responsive 3D Layouts](/docs/how-to-guides/web-integration/responsive-design#method-2-viewbox) to learn more about designing for responsiveness with ViewBox, safe areas, and anchors.

::: info Some things to check
- The player, objective, and CTA stay inside the view.
- Host platform controls do not cover important content.
- Text stays readable.
- Touch targets keep a usable size.
- The game remains playable after an orientation change.
:::

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

The goal of a playable ad is usually to get the user to install the promoted app. To achieve this, there's a call-to-action (CTA) button that opens the store page. Different host platforms provide different APIs for this action.

Other actions, such as starting the game, notifying the host that the game is ready, and notifying the host that the game has ended, are also available, and allow the platform to track user engagement with your playable ad. Please see the API docs for more information.

```ts
import { Behaviour } from "@needle-tools/engine";
import { getPlayableAd } from "@needle-tools/engine/playable";

export class PlayableActions extends Behaviour {

    userHasClickedOpen() {
        // Notify the host that the user has clicked the install CTA
        getPlayableAd().open();
    }
}
```

Add this component to a GameObject, and connect, for example, the `onClick` event of a `Button` component to the matching method.

The method `getPlayableAd().open()` does the right thing for each platform. The following table lists the platform-specific calls that are made when you call `open()`:

| Platform | CTA call |
| --- | --- |
| AppLovin | `mraid.open()` |
| Unity Ads | `mraid.open()` |
| TikTok | TikTok Playable SDK |
| Google Ads | `ExitApi.exit()` |
| Meta | `FbPlayableAd.onCTAClick()` |
| Mintegral | `window.install()` |
| WeChat/Weixin | `open` handler in the WeChat platform adapter |

### Keep the file within the platform limit

Needle compresses meshes, textures, scripts, and scene data. The playable profile then packages the local files and checks the upload size. Still, the size limits for playable ads are strict – we recommend planning ahead so that your 3D assets, textures, and audio are small enough to fit within the limit. If your scene needs many objects, use low-poly meshes, texture atlases or palette textures.

If the build exceeds its limit:

1. Set a lower maximum resolution for large textures.
2. Remove texture data that is not visible in the ad.
3. Use texture atlases or palette textures for stylized assets.
4. Simplify dense meshes before export.
5. Reuse materials and geometry.
6. Remove physics, post-processing, audio, and fonts. The Playable Ad build will automatically remove unused modules, but if your scene uses them, the build will include them. Remove them from the scene to reduce the build size.
7. Build again and read the new report.

Read [Texture Compression](/docs/how-to-guides/optimization/compress-textures), [Mesh Compression](/docs/how-to-guides/optimization/compress-meshes), and [Production Build Settings](/docs/how-to-guides/optimization/production-build-settings).

## Decide which playables to build

Add `playableAds` settings to the existing `needlePlugins()`, and set the `platforms` array to the platforms you want to build. Each platform has its own requirements, so read the platform-specific documentation before building.

```js
import { defineConfig } from "vite";
import { loadConfig, needlePlugins } from "@needle-tools/engine/vite";

export default defineConfig(async ({ command }) => {
    const needleConfig = await loadConfig();
    return {
        plugins: [needlePlugins(command, needleConfig, {
            playableAds: {
                name: "MyGame",
                // At least one store URL is required for Unity Ads,
                // for other platforms, the store URL is managed via the platform's dashboard
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
                    { platform: "discord" },
                    { platform: "youtube" },
                    { platform: "facebook-instant-games" },
                    // You can register for a WeChat Mini Game test account and get an appId for testing.
                    { platform: "wechat", appId: "wx0000000000000000" },
                ],
            },
        })],
        build: { outDir: "dist", emptyOutDir: true },
    };
});
```

## Build the project

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
├── Discord/index.html
├── YouTube/playable.zip
├── FacebookInstantGames/playable.zip
└── WeChat/
    ├── game.js
    ├── game.json
    └── project.config.json
```

::: tip Unsupported components
Ad profiles remove networking and WebXR components. Discord Activities and Facebook Instant Games keep online components. YouTube does not allow third-party network calls. Use the build log to see which components an ad profile removed.
:::

## Test the output

Follow the [playable test guidelines](/docs/how-to-guides/deployment/playable-ads/testing).

## Upload to the target platform

| Platform | Upload file | Guidelines |
| --- | --- | --- |
| AppLovin | `dist/AppLovin/index.html` | [AppLovin](/docs/how-to-guides/deployment/playable-ads/applovin) |
| Unity Ads | `dist/UnityAds/index.html` | [Unity Ads](/docs/how-to-guides/deployment/playable-ads/unity-ads) |
| TikTok | `dist/TikTok/playable.zip` | [TikTok](/docs/how-to-guides/deployment/playable-ads/tiktok) |
| Google Ads | `dist/GoogleAds/playable.zip` | [Google Ads](/docs/how-to-guides/deployment/playable-ads/google-ads) |
| Meta | `dist/Meta/playable.zip` | [Meta](/docs/how-to-guides/deployment/playable-ads/meta) |
| Mintegral | `dist/Mintegral/MyGame.zip` | [Mintegral](/docs/how-to-guides/deployment/playable-ads/mintegral) |
| WeChat/Weixin | `dist/WeChat` | [WeChat/Weixin](/docs/how-to-guides/deployment/playable-ads/wechat-mini-games) |
| Discord | `dist/Discord` | [Discord Activities](/docs/how-to-guides/deployment/playable-ads/discord-activities) |
| YouTube | `dist/YouTube/playable.zip` | [YouTube Playables](/docs/how-to-guides/deployment/playable-ads/youtube-playables) |
| Facebook Instant Games | `dist/FacebookInstantGames/playable.zip` | [Facebook Instant Games](/docs/how-to-guides/deployment/playable-ads/facebook-instant-games) |

## Related pages

- [Playable Build Profiles](/docs/reference/playable-ads)
- [Optimization and Compression](/docs/how-to-guides/optimization/)
- [Responsive 3D Layouts](/docs/how-to-guides/web-integration/responsive-design)
- [Needle UI Components](/docs/reference/components#ui)
