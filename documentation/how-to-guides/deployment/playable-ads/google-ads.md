---
title: Build and Upload a Google Ads Playable
description: Build, test, and upload a playable to a Google Ads App campaign.
---

# Build and Upload a Google Ads Playable

Google Ads calls this file an **HTML5/Playable asset**. App campaigns use a ZIP file.

::: info Generated output
Needle creates `dist/GoogleAds/playable.zip`. The ZIP includes orientation data and the Google Exit API integration.
:::

## Requirements

- A Google Ads account
- A live iOS or Android app
- An App campaign for installs
- [App conversion tracking](https://support.google.com/google-ads/answer/6167168)
- [HTML5 upload access](https://support.google.com/google-ads/answer/1722096)

## 1. Add the profile

```js
playableAds: {
    name: "MyGame",
    platforms: [{
        platform: "google-ads",
        maxBytes: 5_000_000,
        reportPath: "artifacts/google-ads-playable-build-report.json",
        orientation: "portrait,landscape",
    }],
}
```

Set `orientation` to `portrait`, `landscape`, or `portrait,landscape`.

See [Build Playable Ads](/docs/how-to-guides/deployment/playable-ads) for the complete Vite configuration.

## 2. Build the ZIP file

```sh
npm run build -- --production
```

Read the current [Google App campaign specification](https://support.google.com/google-ads/answer/9981650).

Google applies these limits:

- Maximum ZIP size: 5 MB
- Maximum file count: 512
- Layout: responsive
- Game resources: local
- Audio start: after interaction
- Local storage: not permitted

::: info Exit API
Needle includes Google's hosted `exitapi.js`. `NeedlePlayableAd.open()` calls `ExitApi.exit()`.
:::

Google reads the final store URL from the campaign.

## 3. Validate the ZIP file

1. Open the [Google HTML5 Validator](https://h5validator.appspot.com/adwords/asset).
2. Select **For App Campaigns**.
3. Upload `dist/GoogleAds/playable.zip`.
4. Fix each applicable error.
5. Build the ZIP again.
6. Repeat the validation.

<!-- SCREENSHOT PLACEHOLDER
Title: Google HTML5 Validator — upload an App campaign ZIP
Capture: For App Campaigns selected with the upload control visible.
-->

<!-- SCREENSHOT PLACEHOLDER
Title: Google HTML5 Validator — validation passed
Capture: The complete report, including size and orientation checks.
-->

## 4. Add the ZIP to a campaign

1. Create or open an **App campaign for installs**.
2. Open the ad or asset editor.
3. Find the **HTML** asset.
4. Select **+ Add**.
5. Upload `dist/GoogleAds/playable.zip`.
6. Test each configured orientation.
7. Add the required text, image, and video assets.
8. Save the campaign.
9. Submit the campaign for review.

In Google Ads Editor, select **Manage → Ads → App ads for installs → HTML5 → + Add**.

<!-- SCREENSHOT PLACEHOLDER
Title: Google Ads App campaign — add an HTML5 asset
Capture: The HTML asset upload in the campaign editor.
-->

<!-- SCREENSHOT PLACEHOLDER
Title: Google Ads App campaign — playable preview
Capture: The playable in each configured orientation.
-->

## Test on a device

Use the campaign preview for the host test.

Use a temporary HTTPS address for an additional iOS and Android test. This test covers touch, layout, audio, and performance.

The browser test does not test the Google Ads host API.

## Test with an agent

Use the public HTML5 Validator. Record its complete report.

The upload control opens a native file chooser in some browsers. Handle the file chooser before the test continues.

Use an authenticated account only for an authorized draft. Do not publish a campaign or change its spend without permission.

## Troubleshooting

| Error | Action |
| --- | --- |
| ZIP is too large | Reduce the size below 5 MB. Keep free space below the limit. |
| Orientation rejected | Set a supported `orientation` value. Build the ZIP again. |
| CTA is missing | Build the Google Ads profile. Call `NeedlePlayableAd.open()`. |
| External file rejected | Store game files in the ZIP. Keep only Google libraries that the specification permits. |

Read [Google HTML5 upload troubleshooting](https://support.google.com/google-ads/answer/12771973) for more validator errors.

## Related pages

- [Test Playable Ads](/docs/how-to-guides/deployment/playable-ads/testing)
- [Playable Ad Build Profiles](/docs/reference/playable-ads)
