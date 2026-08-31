---
title: Build a YouTube Playable
description: Build, test, and submit a Needle Engine game to YouTube Playables.
---

# Build a YouTube Playable

YouTube Playables are web games hosted by YouTube. Access to the Playables Developer Portal is by invitation.

::: info Needle output
The `youtube` target creates `dist/YouTube/playable.zip`. The ZIP has `index.html` at its root.
:::

## 1. Get portal access

1. Read the [YouTube Playables overview](https://developers.google.com/youtube/gaming/playables).
2. Submit the Playables interest form from that page.
3. Use a YouTube channel that is enabled for Playables.
4. Give each uploader Editor or Manager access in YouTube Studio.
5. Open the [Playables Developer Portal](https://www.youtube.com/playables_portal).

<!-- SCREENSHOT PLACEHOLDER
Title: YouTube Playables Developer Portal — game list
Capture: The game list and the control used to add a game.
-->

## 2. Add the build target

```js
playableAds: {
    name: "MyGame",
    platforms: [
        { platform: "youtube" },
    ],
}
```

Build the project:

```sh
npm run build -- --production
```

The YouTube target handles these required host functions:

- `firstFrameReady()` when the YouTube host connects
- `gameReady()` when Needle Engine is ready
- `isAudioEnabled()` and `onAudioEnabledChange()`
- `onPause()` and `onResume()`

YouTube hides the game until `firstFrameReady()`. The target calls it in the required order before starting the game.

The build stops if it finds a third-party request, an absolute bundle path, an invalid file name, too many files, or an over-size file.

## 3. Add game services

Needle handles startup, audio, pause, and resume. Add the game-specific services that your game uses.

Check the host before you call the SDK:

```ts
const youtube = globalThis.ytgame;
if (youtube?.IN_PLAYABLES_ENV) {
    const saved = await youtube.game.loadData();

    // Restore the game state from `saved`.

    await youtube.game.saveData(JSON.stringify({ level: 3 }));
    await youtube.engagement.sendScore({ value: 1200 });
}
```

Apply these rules:

- Load saved data before the first save. Handle an empty string and invalid data.
- Save a well-formed string below 3 MiB. Catch SDK errors.
- Send an integer score. Use one score type throughout the game.
- Use `ytgame.system.getLanguage()` for the current language.
- Use the YouTube ad APIs for interstitial and rewarded ads.

Read the [Playables SDK reference](https://developers.google.com/youtube/gaming/playables/reference/sdk).

## 4. Test locally

1. Serve `dist/YouTube/` from a local HTTPS server.
2. Open the [YouTube Playables Test Suite](https://developers.google.com/youtube/gaming/playables/test_suite).
3. Enter the local `index.html` URL.
4. Start the game and earn a score.
5. Fix every failed **MUST** test.

The test must confirm:

- The SDK loads before the game code.
- `firstFrameReady()` runs before `gameReady()`.
- `gameReady()` runs after the loading state and within five seconds.
- Saved data stays below 3 MiB.
- `sendScore()` receives an integer after real game progress.
- The initial bundle stays below 30 MiB.

Also test touch, mouse, resize, audio, pause, and resume. Check the rendered game, not only the console.

### Test a Needle Cloud deployment

Deploy the same folder that you tested locally:

```sh
npx needle-cloud@latest deploy dist/YouTube --team "My Team" --name "My YouTube Playable"
```

Copy the HTTPS URL from the command output. Open the [YouTube Playables Test Suite](https://developers.google.com/youtube/gaming/playables/test_suite) and enter that URL. Start the game and complete the same checks as in the local test.

See [Needle Cloud](/docs/cloud/) for login, team, and deployment details.

YouTube measures the initial bundle until `gameReady()`. Keep it below 30 MiB. The full bundle must be below 250 MiB. Each file must be below 30 MiB. Use at most 8,000 files.

<!-- SCREENSHOT PLACEHOLDER
Title: YouTube Playables Test Suite — passing result
Capture: The tested local or Needle Cloud URL, all MUST results, the gameReady timing, and the score event.
-->

## 5. Upload and test on devices

1. In the Developer Portal, select **Add a new game**.
2. Add the title, genre, description, publisher, developer, and thumbnails.
3. Upload `dist/YouTube/playable.zip`.
4. Select **Create release**.
5. Open **Verify and test**.
6. Run the Test Suite link.
7. Open the YouTube Dev Link on desktop web, mobile web, Android, and iOS.
8. Submit for certification after the tests pass.

<!-- SCREENSHOT PLACEHOLDER
Title: YouTube Playables — Verify and test
Capture: The release page with the Dev Link and Test Suite Link.
-->

Read the [Developer Portal guide](https://developers.google.com/youtube/gaming/playables/developer_portal) and [certification requirements](https://developers.google.com/youtube/gaming/playables/certification/requirements).

## Ask an agent to test

Copy this prompt and replace the project and team names:

```text
Validate the YouTube Playables target in this project.

1. Build the youtube target and serve dist/YouTube over local HTTPS.
2. Open the official YouTube Playables Test Suite in an isolated browser session, enter the local URL, and wait for all SDK results.
3. Interact with the game until it reports a score. Capture the rendered game, full result list, SDK event log, console errors, and network requests.
4. Deploy dist/YouTube to Needle Cloud using team <team> and name <deployment name>.
5. Run the official Test Suite again with the deployed HTTPS URL and collect the same evidence.
6. Confirm firstFrameReady/gameReady order, gameReady timing, saved-data behavior, score reporting, bundle limits, touch, mouse, resize, audio, pause, and resume.

Chrome may require Local Network Access checks to be disabled for the localhost test, and a self-signed certificate may require a temporary certificate exception. Apply those workarounds only to the isolated test browser, never to the game.

If Developer Portal access is available, upload a draft, run its release Test Suite, and open the desktop Dev Link. Stop after validation and report which checks still require physical iOS and Android devices.
```

## Related pages

- [Build Playable Ads and Hosted Games](/docs/how-to-guides/deployment/playable-ads/)
- [YouTube integration requirements](https://developers.google.com/youtube/gaming/playables/certification/requirements_integration)
- [YouTube stability requirements](https://developers.google.com/youtube/gaming/playables/certification/requirements_stability)
- [YouTube design requirements](https://developers.google.com/youtube/gaming/playables/certification/requirements_design)
