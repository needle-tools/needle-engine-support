---
title: Build and Test a WeChat/Weixin Mini Game
description: Build and test a Needle Engine WeChat/Weixin Mini Game.
---

# Build and Test a WeChat/Weixin Mini Game

WeChat is also called Weixin in China. This guide uses “WeChat.”

::: info Supported output
Needle creates a regular Mini Game project in `dist/WeChat`. The output includes the Needle WeChat platform adapter.
:::

::: warning Mini Game Playable
The production Mini Game Playable is a different product. It has a separate AppID, API set, upload, and release process.
:::

## Requirements

- A Mini Game test number or AppID
- The current [WeChat Developer Tools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- Access to the AppID

Get a test number from the [WeChat/Weixin sandbox](https://developers.weixin.qq.com/miniprogram/dev/devtools/sandbox.html).

## 1. Add the platform

```js
import { defineConfig } from "vite";
import { loadConfig, needlePlugins } from "@needle-tools/engine/vite";

export default defineConfig(async ({ command }) => {
    const needleConfig = await loadConfig();
    return {
        plugins: [needlePlugins(command, needleConfig, {
            playableAds: {
                name: "MyGame",
                platforms: [{
                    platform: "wechat",
                    appId: "wx0000000000000000",
                    orientation: "portrait",
                }],
            },
        })],
    };
});
```

## 2. Build the project

```sh
npm run build -- --production
```

`dist/WeChat` contains these files:

- `game.js`
- `game.json`
- `project.config.json`
- Needle runtime files
- Local game resources

::: warning AppSecret
Do not add the AppSecret to the project. Store the AppSecret on a trusted server.
:::

## 3. Import the project

1. Open WeChat Developer Tools.
2. Select **Mini Game**.
3. Import `dist/WeChat`.
4. Enter the Mini Game AppID.
5. Select **Compile**.

Import the folder that contains `game.json`. Do not select its parent folder.

<!-- SCREENSHOT PLACEHOLDER
Title: WeChat Developer Tools — import a Mini Game
Capture: The import dialog with dist/WeChat, Mini Game, and AppID fields.
-->

## 4. Test in the simulator

1. Check the scene, environment, textures, and UI.
2. Start and finish the game.
3. Test mouse input.
4. Test touch input.
5. Check that one touch creates one pointer.
6. Test audio after the first interaction.
7. Test particles and orientation.
8. Hide and restore the game.
9. Fix all red console errors.

<!-- SCREENSHOT PLACEHOLDER
Title: WeChat Developer Tools — game running with a clean console
Capture: The rendered game after interaction and the complete console.
-->

## 5. Test on a device

1. Select **Preview** in Developer Tools.
2. Scan the QR code with WeChat/Weixin.
3. Test on iOS.
4. Test on Android.
5. Record the Developer Tools version.
6. Record the base-library version.
7. Record the build hash, device, OS, and console output.

<!-- SCREENSHOT PLACEHOLDER
Title: WeChat Developer Tools — Preview QR code
Capture: The QR dialog, build mode, and base-library version.
-->

<!-- SCREENSHOT PLACEHOLDER
Title: WeChat/Weixin — device preview
Capture: The game running on a device after interaction. Hide account data.
-->

## Test with an agent

Use an Electron agent or the WeChat IDE driver. Compile the project and record the console output.

Interact with the canvas. Capture a rendered frame. A successful compile message does not prove that the game renders.

Do not change the AppID or domain checks without permission. Do not upload a build without permission.

Run the Needle browser integration test before the Developer Tools test. The browser test covers files, rendering, input, lifecycle, audio, and startup.

## Use a custom platform entry

Most projects do not need a custom entry. For a custom host action, install the adapter before the Engine import.

```ts
import { installWechatPlatform } from "@needle-tools/engine/playable/wechat";

export const wechatPlatform = installWechatPlatform({
    title: "My Game",
    open: () => {
        // Call an approved host action.
        return true;
    },
});
```

Use `@needle-tools/engine/playable/wechat-context` for custom Needle context creation.

See the [WeChat target reference](/docs/reference/playable-ads#wechat-weixin-mini-game-target) for all options.

## Configure network access

The default playable build does not make network requests. For a networked Mini Game, add each required HTTPS or WSS domain.

Read the [Mini Game network guide](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/network.html).

## Prepare a production Mini Game Playable

Production access requires a verified enterprise Mini Game and the Playable capability.

- [Playable overview](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/playable/guide.html)
- [Capability and release management](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/playable/manage.html)
- [Development and API set](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/playable/dev.html)

Check the AppID, package limits, `game.json` fields, `wx` APIs, device previews, upload, and review process.

## Troubleshooting

| Error | Action |
| --- | --- |
| `game.json` is missing | Import `dist/WeChat`. Re-import the folder after a rebuild. |
| Device rejects JavaScript | Update Needle. Build the WeChat output again. |
| Browser global is missing | Update Needle. Remove each app-local platform shim. |
| Texture does not load | Check the file below `dist/WeChat`. Use a package-relative path. |
| Scene is black | Find the first renderer or file-load error. Check rendered pixels. |
| One touch acts twice | Remove the app-local touch bridge. Use the Needle adapter. |

See the [Mini Game API types](https://github.com/wechat-miniprogram/minigame-api-typings) and the [Tencent Mini Game tutorial](https://github.com/dotgreg/weixin-minigame-tutorial).

## Related pages

- [Test Playable Ads](/docs/how-to-guides/deployment/playable-ads/testing)
- [Playable Ad Build Profiles](/docs/reference/playable-ads)
