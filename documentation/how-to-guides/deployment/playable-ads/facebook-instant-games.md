---
title: Build a Facebook Instant Game
description: Build and test a Needle Engine game for Facebook Instant Games.
---

# Build a Facebook Instant Game

Use Facebook Instant Games when the game should run directly inside Facebook. The platform provides player identity, saved data, social play, sharing, purchases, and ads through `FBInstant`.

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

Upload `dist/FacebookInstantGames/playable.zip`. It includes:

- the `FBInstant` SDK;
- `initializeAsync()` and `startGameAsync()`;
- Needle loading progress through `setLoadingProgress()`;
- `fbapp-config.json` with the selected orientation.

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

## Ask an agent to test

Copy this prompt and replace the artifact path:

```text
Validate my Facebook Instant Game at <absolute path to dist/FacebookInstantGames/playable.zip>.

1. Inspect the ZIP structure and confirm that index.html and fbapp-config.json are in the expected locations.
2. Run it with a local FBInstant host simulation. Record loading progress, rendering, console errors, startup, pause, resume, and CTA behavior.
3. Test every FBInstant feature used by the game. If it uses context or multiplayer features, use two test users.
4. If Meta dashboard access is available, upload the ZIP to Instant Games Web Hosting, stage it, and run it from a test account.

Return the tested file path and hash, ZIP findings, rendered screenshots, console errors, host-simulation results, and staged-build results.
```

## Related pages

- [Build Playable Ads and Hosted Games](/docs/how-to-guides/deployment/playable-ads/)
- [Facebook Instant Games documentation](https://developers.facebook.com/docs/games/instant-games/)
- [Meta playable ads](/docs/how-to-guides/deployment/playable-ads/meta)
