---
title: Build a Facebook Instant Game
description: Build and test a Needle Engine game for Facebook Instant Games.
---

# Build a Facebook Instant Game

Facebook Instant Games are hosted games. They use the `FBInstant` SDK for startup, player data, context, storage, sharing, purchases, and ads.

::: info Use the Instant Games target
Use `facebook-instant-games` for a game on Facebook. Use `meta` only for a Meta playable ad.
:::

## 1. Create the Meta application

1. Open [Meta for Developers](https://developers.facebook.com/apps/).
2. Create an application for Instant Games.
3. Add the **Instant Games** product.
4. Complete the required application details and permissions.

<!-- SCREENSHOT PLACEHOLDER
Title: Meta for Developers — Instant Games product
Capture: The application dashboard with the Instant Games product enabled.
-->

## 2. Add the build target

```js
playableAds: {
    name: "MyGame",
    platforms: [
        {
            platform: "facebook-instant-games",
            orientation: "LANDSCAPE",
            overrideWebOrientation: "LANDSCAPE",
        },
    ],
}
```

Build the project:

```sh
npm run build -- --production
```

Needle creates `dist/FacebookInstantGames/playable.zip`. It adds:

- the `FBInstant` SDK;
- `initializeAsync()` and `startGameAsync()`;
- Needle loading progress through `setLoadingProgress()`;
- `fbapp-config.json` with the selected orientation.

The target uses Needle's existing Instant Games integration. It packages a separate ZIP so the SDK does not enter AppLovin, Meta ads, or other outputs.

## 3. Use Instant Games features

Call `FBInstant` after initialization. Common features include:

- `FBInstant.player` for player identity and player data;
- `FBInstant.context` for the current game context;
- `FBInstant.player.getConnectedPlayersAsync()` for social play;
- `FBInstant.player.setDataAsync()` and `getDataAsync()` for saved data;
- `FBInstant.getInterstitialAdAsync()` and `getRewardedVideoAsync()` for ads.

Do not put an app secret in the web project.

## 4. Upload the bundle

1. Open the Instant Games product in the Meta application dashboard.
2. Open **Web Hosting**.
3. Upload `dist/FacebookInstantGames/playable.zip`.
4. Stage the uploaded build.
5. Start the staged game from an authorized test account.
6. Move the build to production only after the platform checks pass.

<!-- SCREENSHOT PLACEHOLDER
Title: Facebook Instant Games — Web Hosting
Capture: The uploaded ZIP, its build status, and the stage control.
-->

## 5. Test on devices

Test the staged build on Facebook for desktop, Android, and iOS. Check loading progress, input, resize, audio, pause, resume, saved data, and each social feature that the game uses.

Use at least two test accounts for context or multiplayer features.

<!-- SCREENSHOT PLACEHOLDER
Title: Needle game running in Facebook Instant Games
Capture: The staged game running in the Facebook client on a test device.
-->

## Test with an agent

An agent can inspect the ZIP, run a local `FBInstant` host simulation, and record rendering and console results. With authorized dashboard access, it can upload and stage a test build.

Keep the application in development mode. Do not let an agent publish the application, change review settings, or start monetization without explicit permission.

## Related pages

- [Build Playable Ads and Hosted Games](/docs/how-to-guides/deployment/playable-ads)
- [Facebook Instant Games documentation](https://developers.facebook.com/docs/games/instant-games/)
- [Meta playable ads](/docs/how-to-guides/deployment/playable-ads/meta)
