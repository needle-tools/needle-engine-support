---
title: Build and Upload a Unity Ads Playable
description: Build, test, and upload a Unity Ads playable.
---

# Build and Upload a Unity Ads Playable

Unity Ads accepts one inline `index.html` file. The file must be smaller than 5 MB.

::: info Generated output
Needle creates `dist/UnityAds/index.html`. The file includes MRAID 3.0 and the configured store URL.
:::

## Requirements

- A Unity Cloud organization
- A User Acquisition project
- An advertised app
- Permission to manage creatives

Read the current [Unity Ads playable specifications](https://docs.unity.com/en-us/user-acquisition/creatives/creative-specifications#playable).

## 1. Add the profile

```js
playableAds: {
    name: "MyGame",
    appStoreUrls: {
        ios: "https://apps.apple.com/app/id0000000000",
        android: "https://play.google.com/store/apps/details?id=com.example.game",
    },
    platforms: [{
        platform: "unity",
        maxBytes: 5_000_000,
        reportPath: "artifacts/unity-playable-build-report.json",
    }],
}
```

Add at least one store URL. See [Build Playable Ads](/docs/how-to-guides/deployment/playable-ads) for the complete Vite configuration.

## 2. Build the file

```sh
npm run build -- --production
```

Test these functions before upload:

- Portrait and landscape layout
- Audio start after the first interaction
- Pause when the ad is not visible
- Store open from an explicit CTA

## 3. Upload the file

1. Open the Unity User Acquisition **Creatives** library.
2. Select **Upload creatives**.
3. Select the advertised app.
4. Upload `dist/UnityAds/index.html`.
5. Select a moderation language.
6. Wait for validation.
7. Add the creative to a creative pack.

Read the [Unity Ads upload guide](https://docs.unity.com/en-us/user-acquisition/creatives/upload-creatives) for the current dashboard procedure.

<!-- SCREENSHOT PLACEHOLDER
Title: Unity User Acquisition — upload a playable
Capture: The upload form with the app, index.html, and language selected.
-->

<!-- SCREENSHOT PLACEHOLDER
Title: Unity User Acquisition — validation passed
Capture: The complete validation report, including warnings.
-->

## 4. Test on a device

Use the [Unity Ads creative pack preview](https://docs.unity.com/en-us/user-acquisition/creatives/preview-creative-packs).

1. Install **Ad Testing for Unity Ads** on [iOS](https://apps.apple.com/us/app/ad-testing/id1463016906) or [Android](https://play.google.com/store/apps/details?id=com.unity3d.auicreativetestapp).
2. Select **Show QR code** for the creative pack.
3. Scan the code in the app.
4. Test orientation, touch, audio, pause, resume, and the CTA.

<!-- SCREENSHOT PLACEHOLDER
Title: Unity creative pack — device test QR code
Capture: The QR code panel and creative-pack name. Hide account data.
-->

## Test with an agent

Upload the HTML to an authorized draft. Record the complete validation report. Keep the campaign inactive.

Use the Unity preview to test MRAID and the store action.

## Troubleshooting

| Error | Action |
| --- | --- |
| Store URL warning | Add a public Apple App Store or Google Play URL. |
| `mraid.js` warning | Upload the Unity profile. Do not upload a generic HTML build. |
| `window.top` rejected | Rebuild the Unity profile. Do not change the generated file. |
| Game runs while hidden | Bind the playable API. Use the MRAID viewability state. |

## Related pages

- [Test Playable Ads](/docs/how-to-guides/deployment/playable-ads/testing)
- [Playable Ad Build Profiles](/docs/reference/playable-ads)
