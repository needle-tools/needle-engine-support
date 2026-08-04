---
title: How Playable Ads Work
description: Learn the terms, host APIs, packages, and lifecycle rules for playable ads.
---

# How Playable Ads Work

A playable ad is an interactive ad. It runs in a host that the ad platform controls.

The host controls package rules, audio, visibility, store links, and reports. Each platform defines a different host contract.

## Advertiser and publisher roles

The **advertiser** uploads the playable. The advertiser selects the app, audience, and campaign settings.

The **publisher** shows ads in an app. The publisher adds an ad SDK or mediation SDK to that app.

::: info Playable location
The playable is an advertiser file. Do not add the publisher mediation SDK to the playable.
:::

## Mediation

Mediation sends an ad request to demand sources.

- **Bidding** uses a real-time auction.
- A **waterfall** tries sources in a configured order.
- A mediation setup can use bidding and a waterfall.

The host app selects the ad before the playable starts. The playable does not select an ad provider.

## SDK and API types

| Type | Location | Function |
| --- | --- | --- |
| Playable host API | Ad container | Controls CTA, lifecycle, size, visibility, and audio |
| Ad or mediation SDK | Publisher app | Requests and shows ads |
| Measurement SDK or MMP | Promoted app | Attributes installs and app events |

MRAID, TikTok Playable SDK, Google Exit API, and Playturbo are host APIs.

## MRAID

[MRAID](https://iabtechlab.com/standards/mobile-rich-media-ad-interface-definitions-mraid/) is an IAB Tech Lab API. Mobile ad hosts use it for rich-media ads.

An MRAID host adds the global `mraid` object. The playable uses this object for these functions:

- Host readiness
- Size and orientation
- Visibility
- Pause and resume
- Host volume
- Store CTA

::: warning `mraid.js`
The ad host supplies `mraid.js`. Do not replace this file with a CDN file.
:::

Not all platforms use MRAID.

| Platform | Host API |
| --- | --- |
| AppLovin | MRAID 2.0 |
| Unity Ads | MRAID 3.0 |
| TikTok | TikTok Playable SDK |
| Google Ads | Exit API or an accepted MRAID option |
| Meta | `FbPlayableAd` CTA API |
| Mintegral | Playturbo/Mindworks globals |
| WeChat/Weixin | Native `wx` APIs |

## Package types

| Platform | Package |
| --- | --- |
| AppLovin | One self-contained HTML file |
| Unity Ads | One inline HTML file |
| TikTok | ZIP with local game resources |
| Google Ads | ZIP with local game resources |
| Meta | ZIP with one self-contained root `index.html` |
| Mintegral | ZIP, folder, and HTML with the same name |
| WeChat/Weixin | Mini Game project |

A required host script does not permit remote game resources. Store models, textures, fonts, audio, and game code in the package.

Some validators scan URL text in unused code. Therefore, remove unused external URLs from the build.

## Lifecycle rules

The playable must perform these actions:

1. Load the required content.
2. Wait for the first interaction before audio or timer start.
3. Pause when the host hides the ad.
4. Resume from the same game state.
5. Open the store from an explicit CTA.
6. Support the required orientations and safe zones.
7. Show a fallback after a WebGL failure.

The platform defines the source of the store URL. The source is the file, campaign, or host API.

## Measurement

| Signal | Source |
| --- | --- |
| Impression, spend, engagement, and CTA | Ad platform |
| Install and post-install events | Promoted app and MMP or platform SDK |
| Publisher ad revenue | Mediation platform |
| Load and runtime test results | Local tests and platform preview |

Needle playable events control the game lifecycle. They do not provide campaign attribution.

Remote analytics make an offline package invalid. Use the ad platform and promoted app for measurement.

## A/B tests

Build one file for each variant. Change one primary item. Keep the other campaign settings equal.

Use the experiment function from the ad platform. Store the file hash with each result.

Do not select a random variant in one playable. The platform cannot report those variants separately.

## WeChat/Weixin runtime

WeChat Mini Games use `game.js`, a platform canvas, and `wx` APIs. They do not use an HTML page.

Regular Mini Games and production Mini Game Playables use different release processes. A regular Mini Game test does not prove Playable approval.

## Related pages

- [Build Playable Ads](/docs/how-to-guides/deployment/playable-ads)
- [Playable Ad Build Profiles](/docs/reference/playable-ads)
