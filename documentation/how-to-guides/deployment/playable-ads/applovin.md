---
title: Build and Upload an AppLovin Playable Ad
description: Build, test, and upload an AppLovin playable ad.
---

# Build and Upload an AppLovin Playable Ad

AppLovin accepts one self-contained HTML file.

::: info Generated output
Needle creates `dist/AppLovin/index.html`. The file includes MRAID 2.0 support and all game resources.
:::

## Requirements

- An AppLovin advertiser account
- An advertised app
- Access to **Media → HTMLs**

Read the current [AppLovin HTML playable specifications](https://support.applovin.com/en/growth/promoting-your-apps/welcome-to-applovin/creative-specs-and-guidelines#html-playable-specifications).

## 1. Add the profile

```js
playableAds: {
    name: "MyGame",
    appStoreUrls: {
        ios: "https://apps.apple.com/app/id0000000000",
        android: "https://play.google.com/store/apps/details?id=com.example.game",
    },
    platforms: [{
        platform: "applovin",
        maxBytes: 5_000_000,
        reportPath: "artifacts/applovin-playable-build-report.json",
    }],
}
```

See [Build Playable Ads](/docs/how-to-guides/deployment/playable-ads) for the complete Vite configuration.

## 2. Build the file

```sh
npm run build -- --production
```

Do not put `dist/AppLovin/index.html` in a ZIP file.

The profile checks these rules:

- Maximum file size: 5 MB
- Resource encoding: Base64 or Base122
- External game requests: none
- Audio and timer start: after the first interaction
- Lifecycle and CTA API: MRAID 2.0
- WebGL fallback: present

Read `artifacts/applovin-playable-build-report.json` for the file size, hash, and URL results.

## 3. Test the file

1. Open [AppLovin Playable Preview](https://p.applov.in/playablePreview?create=1).
2. Upload `dist/AppLovin/index.html`.
3. Start and complete the game.
4. Press the CTA.
5. Test portrait and landscape.
6. Reload the preview.
7. Test the first interaction again.

<!-- SCREENSHOT PLACEHOLDER
Title: AppLovin Playable Preview — upload index.html
Capture: The upload control with dist/AppLovin/index.html selected.
-->

<!-- SCREENSHOT PLACEHOLDER
Title: AppLovin Playable Preview — test passed
Capture: The playable, orientation control, and complete validation result.
-->

## 4. Upload the file

1. Open [AppLovin Ads Manager](https://ads.applovin.com/media).
2. Open **Media → HTMLs**.
3. Select **Upload**.
4. Select `dist/AppLovin/index.html`.
5. Select the app and campaign.
6. Preview the ad.

<!-- SCREENSHOT PLACEHOLDER
Title: AppLovin Ads Manager — upload an HTML playable
Capture: Media → HTMLs with the upload panel open. Hide account data.
-->

::: tip Upload control
If **Upload** is not visible, ask the account owner to check your permissions.
:::

## Test on a device

Install AppLovin Playable Preview for [iOS](https://apps.apple.com/us/app/playable-preview/id6468529760) or [Android](https://play.google.com/store/apps/details?id=com.applovin.apps.playables).

Test touch, audio, pause, resume, orientation, and the CTA.

## Test with an agent

```sh
agent-browser --session applovin open "https://p.applov.in/playablePreview?create=1"
agent-browser --session applovin snapshot -i -C
agent-browser --session applovin upload @eN /absolute/path/to/dist/AppLovin/index.html
agent-browser --session applovin wait 3000
agent-browser --session applovin errors
```

Use the upload element from the latest snapshot. Inspect the playable frame for game requests.

## Troubleshooting

| Error | Action |
| --- | --- |
| External request | Rebuild the AppLovin profile. Remove remote fonts, media, workers, analytics, and configuration. |
| CTA does not open | Add a store URL. Call `NeedlePlayableAd.open()` from the install button. |
| First tap opens the store | Start the game on the first tap. Use a separate tap for the CTA. |

## Related pages

- [Test Playable Ads](/docs/how-to-guides/deployment/playable-ads/testing)
- [Playable Ad Build Profiles](/docs/reference/playable-ads)
