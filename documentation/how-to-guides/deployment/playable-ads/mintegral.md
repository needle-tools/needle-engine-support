---
title: Build and Upload a Mintegral Playable Ad
description: Build, test, and upload a Mintegral playable ad.
---

# Build and Upload a Mintegral Playable Ad

Mintegral uses the Playturbo/Mindworks host API. It does not use MRAID.

::: info Generated output
Needle creates `dist/Mintegral/MyGame.zip`. The ZIP contains all game resources and the Playturbo lifecycle integration.
:::

## Requirements

- A Mintegral advertiser account
- A registered app
- Company and billing information
- MMP or server attribution

Read the [Mintegral campaign procedure](https://helpcenter.mintegral.com/en/docs/campaign-set-up). Configure [MMP tracking](https://helpcenter.mintegral.com/en/docs/mmp-tracking/). Read the [Playturbo review guide](https://www.playturbo.com/review/doc).

## 1. Add the profile

```js
playableAds: {
    name: "MyGame",
    platforms: [{
        platform: "mintegral",
        maxBytes: 5_000_000,
        reportPath: "artifacts/mintegral-playable-build-report.json",
    }],
}
```

Use only letters, numbers, and underscores in `name`. Needle uses the same name for three paths:

```text
dist/Mintegral/MyGame.zip
└── MyGame/
    └── MyGame.html
```

See [Build Playable Ads](/docs/how-to-guides/deployment/playable-ads) for the complete Vite configuration.

## 2. Add lifecycle calls

```ts
import { bindPlayableAd, getPlayableAd } from "@needle-tools/engine/playable";

const playable = getPlayableAd();
bindPlayableAd(context, playable);

await loadRequiredAssets();
playable.notifyReady?.();

function finishPlayable() {
    playable.notifyEnd?.();
}

installButton.addEventListener("click", () => playable.open());
```

Call `notifyReady()` when the game is ready. Call `notifyEnd()` when the game ends. Call `open()` from the install CTA.

::: tip Input
Support mouse and touch input. The desktop reviewer uses mouse input.
:::

### Add action points

Mintegral supports five action points.

```js
platforms: [{
    platform: "mintegral",
    actionPoints: [
        "Started first wave",
        "Selected an upgrade",
        "Reached the boss",
    ],
}]
```

Call `getPlayableAd().track?.(2)` with the one-based action number. Needle adds `action.json` to the ZIP.

## 3. Build and test the ZIP

```sh
npm run build -- --production
```

1. Extract `dist/Mintegral/MyGame.zip` to a temporary folder.
2. Open `MyGame/MyGame.html` from the file system.
3. Open the [Playturbo reviewer](https://www.playturbo.com/review).
4. Upload the ZIP.
5. Start and finish the game.
6. Press the install CTA.
7. Check each required result.

Each required result must show **Test Success**. Some tests start after the related game action.

<!-- SCREENSHOT PLACEHOLDER
Title: Playturbo reviewer — upload the Mintegral ZIP
Capture: The upload control with dist/Mintegral/MyGame.zip selected.
-->

<!-- SCREENSHOT PLACEHOLDER
Title: Playturbo reviewer — all checks passed
Capture: The playable and all lifecycle and CTA results.
-->

## 4. Upload the ZIP

1. Open [Mintegral creative management](https://adv.mintegral.com/creatives?tab=creative).
2. Open **User Acquisition → Manage Creative → Create Set → Upload Creative Set**.
3. Upload `dist/Mintegral/MyGame.zip` as a playable.
4. Select the language and regions.
5. Select the creative set.
6. Preview the playable.
7. Apply the creative set to the offer.
8. Submit the offer for review.

<!-- SCREENSHOT PLACEHOLDER
Title: Mintegral AppGrowth — upload a playable creative set
Capture: The upload form with type, language, regions, and ZIP selected.
-->

<!-- SCREENSHOT PLACEHOLDER
Title: Mintegral AppGrowth — apply the creative set
Capture: The offer assignment with the playable creative set selected.
-->

::: warning Creative set
Apply the creative set to an offer. An unassigned creative set does not enter review.
:::

## Test with an agent

```sh
agent-browser --session mintegral open https://www.playturbo.com/review
agent-browser --session mintegral snapshot -i -C
agent-browser --session mintegral upload @eN /absolute/path/to/dist/Mintegral/MyGame.zip
agent-browser --session mintegral wait 3000
agent-browser --session mintegral errors
```

Continue the game until all required tests finish.

Use the Playturbo [Preview controls](https://doc.playturbo.com/playable-tools-content-editor/content-editor-user-guide/editing-page-module-intro/project-operation-area/preview) for orientation, QR, and device tests.

## Troubleshooting

| Error | Action |
| --- | --- |
| Name rejected | Use the same valid name for the ZIP, folder, and HTML file. |
| HTML does not open from the file system | Build the Mintegral profile. Open the HTML after ZIP extraction. |
| `gameReady` is missing | Call `notifyReady()` after asset and scene setup. |
| End or CTA test does not finish | Complete the game. Call `notifyEnd()`. Press the CTA in the reviewer. |

## Related pages

- [Test Playable Ads](/docs/how-to-guides/deployment/playable-ads/testing)
- [Mintegral lifecycle reference](/docs/reference/playable-ads#mintegral-lifecycle)
