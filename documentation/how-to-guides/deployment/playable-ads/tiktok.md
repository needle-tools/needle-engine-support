---
title: Build and Upload a TikTok Playable Ad
description: Build, test, and upload a TikTok playable ad.
---

# Build and Upload a TikTok Playable Ad

TikTok accepts a ZIP file. The ZIP root must contain `index.html` and `config.json`.

::: info Generated output
Needle creates `dist/TikTok/playable.zip`. The build uses the TikTok Playable SDK instead of MRAID.
:::

## Requirements

- A [TikTok for Business](https://ads.tiktok.com/business/en/advertise/ads-manager-paid) account
- A registered app
- Business and billing details
- A video for the feed ad
- An **App Promotion** campaign in Smart+

Read the [TikTok playable ad specification](https://ads.tiktok.com/help/article/playable-ads). Then read the [TikTok campaign procedure](https://ads.tiktok.com/help/article/how-to-create-playable-ads-on-tiktok-ads-manager).

## 1. Add the profile

```js
playableAds: {
    name: "MyGame",
    platforms: [{
        platform: "tiktok",
        maxBytes: 5_000_000,
        reportPath: "artifacts/tiktok-playable-build-report.json",
        orientation: 0,
    }],
}
```

| `orientation` | Layout |
| --- | --- |
| `0` | Portrait and landscape |
| `1` | Portrait only |
| `2` | Landscape only |

See [Build Playable Ads](/docs/how-to-guides/deployment/playable-ads) for the complete Vite configuration.

## 2. Build the ZIP file

```sh
npm run build -- --production
```

The ZIP has this structure:

```text
playable.zip
├── index.html
└── config.json
```

TikTok requires its hosted [Playable SDK](https://sf16-muse-va.ibytedtos.com/obj/union-fe-nc-i18n/playable/sdk/playable-sdk.js). The ZIP contains all other game files.

## 3. Upload the ZIP file

1. Open [Creative Library → Playable](https://ads.tiktok.com/i18n/creative-library/own/playable).
2. Select **+ Add**.
3. Upload `dist/TikTok/playable.zip`.
4. Wait for validation.
5. Open the preview.
6. Complete the game.

<!-- SCREENSHOT PLACEHOLDER
Title: TikTok Creative Library — add a playable
Capture: Creative Library → Playable with the upload panel open.
-->

<!-- SCREENSHOT PLACEHOLDER
Title: TikTok playable — validation passed
Capture: The complete validation result and preview controls.
-->

## 4. Add the playable to a campaign

1. Select **+ Create** in Ads Manager.
2. Select **App Promotion**.
3. Select **App Install**.
4. Select the app and optimization goal.
5. Select TikTok placement.
6. Select **+ Add Creative** at ad level.
7. Select the playable.
8. Add the required video.
9. Preview the ad.
10. Submit the ad for review.

<!-- SCREENSHOT PLACEHOLDER
Title: TikTok Smart+ campaign — select a playable
Capture: The ad-level creative panel with the playable selected.
-->

::: tip Safe zones
Use the TikTok UI overlays during the test. Keep controls and important text outside the overlays.
:::

## Test on a device

1. Open the campaign or ad group.
2. Open **View data → Creatives → Preview**.
3. Select **TikTok → QR Code**.
4. Scan the code with TikTok.
5. Select **Preview Ad**.

Read [Preview ads with a QR code](https://ads.tiktok.com/help/article/preview-ads-on-your-mobile-device-using-a-qr-code). A QR code expires after seven days. A preview session expires after 24 hours.

<!-- SCREENSHOT PLACEHOLDER
Title: TikTok Ads Manager — mobile QR preview
Capture: The QR code panel and selected playable. Hide account data.
-->

## Test with an agent

Upload the ZIP to an authorized Creative Library draft. Record all validator messages.

For a local test, extract the ZIP. Then use the [browser test procedure](/docs/how-to-guides/deployment/playable-ads/testing).

Do not publish a campaign or change its spend without permission.

## Troubleshooting

| Error | Action |
| --- | --- |
| ZIP structure rejected | Upload `playable.zip`. Do not put the ZIP in another ZIP or folder. |
| CTA does not work locally | Test the CTA in TikTok Preview. The local test does not supply the hosted SDK. |
| HTTP request rejected | Remove remote game files, fonts, analytics, and configuration. Keep the required TikTok SDK. |

## Related pages

- [Test Playable Ads](/docs/how-to-guides/deployment/playable-ads/testing)
- [Playable Ad Build Profiles](/docs/reference/playable-ads)
