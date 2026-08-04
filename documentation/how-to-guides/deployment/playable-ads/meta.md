---
title: Build and Upload a Meta Playable Ad
description: Build, test, and upload a Meta playable ad.
---

# Build and Upload a Meta Playable Ad

A Meta playable ad contains a lead-in video, a full-screen game, and an app-install CTA.

::: info Generated output
Needle creates `dist/Meta/playable.zip`. The ZIP contains one self-contained `index.html` file.
:::

## Requirements

- A Meta Business Portfolio
- An ad account
- A registered mobile app
- A lead-in video

Read the current [Meta playable specifications](https://www.facebook.com/business/help/412951382532338). Then read the [Meta upload procedure](https://www.facebook.com/business/help/338940216641734).

## 1. Add the profile

```js
playableAds: {
    name: "MyGame",
    platforms: [{
        platform: "meta",
        maxBytes: 5_000_000,
        reportPath: "artifacts/meta-playable-build-report.json",
    }],
}
```

See [Build Playable Ads](/docs/how-to-guides/deployment/playable-ads) for the complete Vite configuration.

## 2. Build the ZIP file

```sh
npm run build -- --production
```

The ZIP has this structure:

```text
playable.zip
└── index.html
```

Meta applies these rules:

- Maximum ZIP size: 5 MB
- HTML location: ZIP root
- MRAID: not required
- JavaScript redirects: not permitted
- `XMLHttpRequest`: not permitted
- External game resources: not permitted
- CTA API: `FbPlayableAd.onCTAClick()`

## 3. Test the ZIP file

1. Open [Meta Playable Preview](https://developers.facebook.com/tools/playable-preview/).
2. Upload `dist/Meta/playable.zip`.
3. Start and complete the game.
4. Press the install CTA.
5. Check the package and CSP results.
6. Check the file-load results.
7. Check the CTA result.

The CTA result becomes green after the call to `FbPlayableAd.onCTAClick()`.

<!-- SCREENSHOT PLACEHOLDER
Title: Meta Playable Preview — uploaded Needle playable
Capture: The running playable and the complete specification panel.
-->

<!-- SCREENSHOT PLACEHOLDER
Title: Meta Playable Preview — CTA check passed
Capture: The green CTA result after the install button was pressed.
-->

## 4. Create the ad

1. Open [Meta Ads Manager](https://adsmanager.facebook.com/adsmanager/manage/ads/edit/standalone).
2. Select **+ Create**.
3. Select **App promotion**.
4. Select the registered app at ad-set level.
5. Select **Single image or video** at ad level.
6. Select **Playable source** under **Destination**.
7. Select **Set up playable ad**.
8. Select **Upload playable asset**.
9. Upload `dist/Meta/playable.zip`.
10. Preview the playable.
11. Select **Done**.
12. Add the lead-in video.

<!-- SCREENSHOT PLACEHOLDER
Title: Meta Ads Manager — select the app
Capture: App promotion selected with the registered app. Hide account data.
-->

<!-- SCREENSHOT PLACEHOLDER
Title: Meta Ads Manager — select Playable source
Capture: Destination with Playable source and Set up playable ad visible.
-->

<!-- SCREENSHOT PLACEHOLDER
Title: Meta Ads Manager — upload the playable ZIP
Capture: The upload dialog with dist/Meta/playable.zip selected.
-->

<!-- SCREENSHOT PLACEHOLDER
Title: Meta Ads Manager — playable preview
Capture: The running playable, Refresh playable, and Done controls.
-->

::: info Placements
Meta supports selected Facebook, Instagram, and Audience Network placements. Ads Manager lists the enabled placements for the campaign.
:::

## Test with an agent

Use Meta Playable Preview without a campaign. Upload the ZIP and record all console, CSP, file-load, and CTA results.

The upload control opens a file chooser. Handle the file chooser after you select **Upload playable asset**.

Select **Refresh playable** before a second test.

Use Ads Manager only for an authorized draft. Do not publish a campaign or change its spend without permission.

## Test on a device

Use the device or placement preview in Ads Manager. Test portrait layout, touch, audio, hide, resume, performance, and CTA access.

<!-- SCREENSHOT PLACEHOLDER
Title: Meta Ads Manager — mobile placement preview
Capture: The mobile or placement preview with the playable running.
-->

## Troubleshooting

| Error | Action |
| --- | --- |
| Upload control is absent | Check the objective, registered app, permissions, and placements. |
| ZIP rejected | Check the 5 MB limit. Check that `index.html` is at the ZIP root. |
| CSP blocks a data URL | Rebuild the Meta profile. The profile uses Blob URLs for embedded game files. |
| Redirect rejected | Call `NeedlePlayableAd.open()`. Do not use `window.open()` or `location`. |
| CTA does not work locally | Use Meta Playable Preview. The preview supplies `FbPlayableAd`. |

::: info Different Meta product
Facebook Instant Games use `FBInstant`. They require a different build and upload procedure.
:::

## Related pages

- [Meta playable ad overview](https://www.facebook.com/business/ads/playable-ad-format)
- [Meta Playable Preview](https://developers.facebook.com/tools/playable-preview/)
- [Test Playable Ads](/docs/how-to-guides/deployment/playable-ads/testing)
- [Playable Ad Build Profiles](/docs/reference/playable-ads)
