---
title: Playable Ad Build Profiles
description: Configuration and runtime API reference for Needle Engine playable outputs.
---

# Playable Ad Build Profiles

## Package entry points

| Import | Contents |
| --- | --- |
| `@needle-tools/engine/vite` | Build profiles and WeChat packaging |
| `@needle-tools/engine/playable` | Playable lifecycle, audio, viewability, and CTA bridge |
| `@needle-tools/engine/playable/wechat` | WeChat platform adapter |
| `@needle-tools/engine/playable/wechat-context` | Custom WeChat Needle context creation |

Import playable and WeChat APIs from the entry points in this table.

## High-level project setting

Add `playableAds` to the `needlePlugins()` settings:

```ts
type NeedlePlayableAdsOptions = {
    name?: string;
    appStoreUrls?: {
        ios?: string;
        android?: string;
    };
    platforms: NeedlePlayableAdTarget[];
    build?: {
        useRapier?: boolean;
        usePostprocessing?: boolean;
        noPeer?: boolean;
        excludeOptionalModules?: string[];
    };
};
```

Add at least one platform. The build stops for a duplicate or unknown platform.

### Platform entries

| `platform` | Additional fields | Default output |
| --- | --- | --- |
| `applovin` | Shared playable options | `dist/AppLovin/index.html` |
| `unity` | Shared options; optional legacy `appleAppStoreUrl`, `googlePlayStoreUrl` | `dist/UnityAds/index.html` |
| `tiktok` | `orientation`, `archiveName` | `dist/TikTok/playable.zip` |
| `google-ads` | `orientation`, `archiveName` | `dist/GoogleAds/playable.zip` |
| `meta` | `archiveName` | `dist/Meta/playable.zip` |
| `mintegral` | `name`, `actionPoints` | `dist/Mintegral/<name>.zip` |
| `wechat` | WeChat options; `appId` required | `dist/WeChat/` |

Unity requires at least one iOS or Android store destination. WeChat requires an AppID.

::: info Opt-in behavior
Only the `platforms` array selects outputs. Store URLs and project names do not select outputs.
:::

## Build helpers

Import these helpers from `@needle-tools/engine/vite`.

| Helper | Return value / purpose |
| --- | --- |
| `createPlayableAdsSettings(options)` | Converts `playableAds` options to Needle plugin settings |
| `needleSingleHtml(options)` | Low-level, platform-neutral single-HTML Vite plugin |
| `playableAd(options)` | Shared offline playable settings and bridge |
| `appLovinPlayableAd(options)` | AppLovin profile |
| `unityPlayableAd(options)` | Unity Ads profile |
| `tiktokPlayableAd(options)` | TikTok profile |
| `googleAdsPlayableAd(options)` | Google Ads profile |
| `metaPlayableAd(options)` | Meta profile |
| `mintegralPlayableAd(options)` | Mintegral profile |
| `playableAds(profiles, options)` | Creates several HTML or ZIP outputs from one browser build |
| `wechatMiniGame(options)` | Creates a separate WeChat Mini Game Vite target |
| `packageBuildAsSingleHtml(directory, options)` | Packages an existing build directory |
| `packageBuildAsSingleHtmlProfiles(directory, profiles)` | Packages several outputs from an existing build directory |

::: warning License requirement
Playable profiles require a commercial Needle license for output without Needle branding. `needleSingleHtml()` is the low-level single-file helper.
:::

## Shared playable options

| Option | Type | Default |
| --- | --- | --- |
| `outputDirectory` | `string` | required for multi-profile output |
| `maxBytes` | `number` | `5_000_000` |
| `reportPath` | `string` | profile-specific path below `.needle/playables` |
| `appStoreUrls` | `{ ios?: string; android?: string }` | none |
| `mraid` | `boolean` | `true` |
| `failOnExternalUrls` | `boolean` | profile-specific |
| `strictResourceEncoding` | `boolean` | `true` |
| `stripRemoteRuntimeFeatures` | `boolean` | `true` |
| `stripExternalUrlLiterals` | `boolean` | profile-specific |
| `disallowWindowTop` | `boolean` | profile-specific |
| `offlineRuntime` | `boolean` | `true` |
| `webglFallback` | `boolean \| { title?: string; message?: string }` | `true` |
| `excludeOptionalModules` | `string[]` | `[]` |
| `singleHtml` | `boolean \| NeedleSingleHtmlOptions` | enabled |
| `makeFilesLocal` | Needle localization options | enabled with playable exclusions |

## Platform options

### TikTok

| Option | Values | Default |
| --- | --- | --- |
| `orientation` | `0` responsive, `1` portrait, `2` landscape | `0` |
| `archiveName` | ZIP filename without directories | `playable.zip` |

### Google Ads

| Option | Values | Default |
| --- | --- | --- |
| `orientation` | `portrait`, `landscape`, `portrait,landscape` | `portrait,landscape` |
| `archiveName` | ZIP filename without directories | `playable.zip` |

### Meta

| Option | Values | Default |
| --- | --- | --- |
| `archiveName` | ZIP filename without directories | `playable.zip` |

The ZIP contains one self-contained root `index.html`. The profile rejects invalid names, redirects, external game URLs, and files above 5 MB.

The profile also rejects browser popups and `XMLHttpRequest`.

### Mintegral

| Option | Type | Constraint |
| --- | --- | --- |
| `name` | `string` | letters, numbers, and underscores only |
| `actionPoints` | `string[]` | up to five non-empty descriptions |

The Mintegral ZIP, folder, and HTML file use `name`.

## Runtime bridge

```ts
import { bindPlayableAd, getPlayableAd } from "@needle-tools/engine/playable";
```

`getPlayableAd()` returns the active platform API. `bindPlayableAd(context)` connects pause and audio state to the Needle context.

Common members:

| Member | Purpose |
| --- | --- |
| `ready` | Resolves when the host bridge is ready |
| `start()` | Starts the playable timer after user interaction |
| `open()` | Calls the platform CTA |
| `notifyReady()` | Signals that required content is ready |
| `notifyEnd()` | Signals win/failure or the end of play |
| `notifyRetry()` | Signals a retry |
| `track(id)` | Reports a platform action point when supported |
| `on(type, listener)` | Subscribes to bridge events |
| `elapsedTime` | Active playable time in seconds |
| `isPaused`, `muted`, `volume` | Current host lifecycle/audio state |

Call `start()` from the first game interaction. Call `open()` only from an explicit CTA.

## Mintegral lifecycle

| Needle | Playturbo/Mindworks |
| --- | --- |
| `notifyReady()` | `window.gameReady()` |
| host start | global `gameStart()` emits Needle `start` |
| `notifyEnd()` | `window.gameEnd()` |
| `notifyRetry()` | `window.gameRetry()` |
| host close | global `gameClose()` pauses and mutes Needle |
| `open()` | `window.install()` |

## Compliance report

Playable build reports include:

- output path, upload size, HTML size, and limit;
- output and source-build SHA-256 hashes;
- embedded files and bytes by MIME type;
- Base64 encoded, decoded, and expansion bytes;
- external application URLs and intentional platform URLs;
- resource-encoding findings;
- platform, orientation, ZIP settings, and compatibility settings.

The report describes the build. Run the platform validator before upload.

## WeChat/Weixin Mini Game target

`wechatMiniGame(options)` creates a WeChat Vite target without HTML.

| Option | Type / meaning |
| --- | --- |
| `appId` | Required Mini Game AppID; never an AppSecret |
| `htmlEntry` | Regular Needle HTML entry used to derive platform, host, and game entries |
| `platformEntry` | Advanced custom platform entry; requires `gameEntry` |
| `gameEntry` | Advanced custom application entry; requires `platformEntry` |
| `orientation` | `portrait` or `landscape` |
| `outputDirectory` | Developer Tools project; default `dist/WeChat` |
| `stagingDirectory` | Temporary Vite output |
| `assetsDirectory` | Application assets copied below the package `assets` folder |
| `prepareAssets` | Optional post-copy asset hook |
| `requiredAssets` | Package-relative files required by validation |
| `requiredRuntimeTokens` | Runtime capabilities required by validation |
| `excludeOptionalModules` | Module IDs replaced for this target |
| `useRapier` | Include Rapier; capability-driven when omitted |
| `usePostprocessing` | Include post-processing; capability-driven when omitted |
| `maxJavaScriptBytes` | Per-file parser budget; default 2,048,000 bytes |
| `maxPackageBytes` | Optional package budget |
| `origin` | Local `import.meta` origin |
| `urlCheck` | Developer Tools production domain/TLS checking; default `true` |

Generated files include `game.js`, `game.json`, `project.config.json`, platform/host/game entries, CommonJS chunks, assets, and a build report.

Install the public adapter before the Engine import:

```ts
import { installWechatPlatform } from "@needle-tools/engine/playable/wechat";
```

Import `createWechatPlatformContext()` from `@needle-tools/engine/playable/wechat-context`.

## Related

- [Build Playable Ads](/docs/how-to-guides/deployment/playable-ads.html)
- [Test Playable Ads](/docs/how-to-guides/deployment/playable-ads/testing)
- [How Playable Ads Work](/docs/explanation/playable-ads)
