---
title: Test Playables
description: Test a playable ad or hosted game package, runtime, platform host, and device.
---

# Test Playables

Test the generated output at four levels. Use the same file for each applicable test.

::: warning Generated output
Do not change the HTML or ZIP file. Change the source project, and then build the output again.
:::

## 1. Test the package

1. Read the build report.
2. Fix each build error.
3. Check the file name and ZIP structure.
4. Check the file size and orientation.
5. Check the resource rules.
6. Record the file hash.
7. Check each external URL.

Permit only the host URLs that the selected platform requires.

Extract a ZIP into a new temporary folder. Do not reuse files from an earlier build.

## 2. Test in a browser

1. Open the exact HTML entry.
2. Check that a compressed mesh renders.
3. Check that its texture renders.
4. Start the game.
5. Check that the first interaction does not open the store.
6. Complete the game.
7. Press the CTA.
8. Hide and restore the page.
9. Check pause and resume for animation, timers, and audio.
10. Test each configured orientation.
11. Test muted audio.
12. Test the WebGL fallback.
13. Record console errors and network requests.

::: tip Render test
A ready message does not prove that the scene renders. Check the canvas pixels.
:::

### Ask an agent to run the browser test

Copy this prompt and replace the entry path:

```text
Browser-test the playable at <absolute path to the HTML entry> in an isolated browser session with local-file access enabled.

1. Test at 390 × 844 and at 844 × 390.
2. Confirm that a compressed mesh and its texture render; inspect canvas pixels rather than relying only on a ready message.
3. Start and complete the game. Confirm that the first interaction does not open the store, then test the CTA separately.
4. Hide and restore the page. Check animation, timers, and audio after pause and resume.
5. Test muted audio and the WebGL fallback.
6. Record console errors and network requests from the playable itself.

Return screenshots for both orientations, the tested file path and hash, interaction results, console errors, and network requests. Keep credentials and evidence outside the upload artifact.
```

## 3. Test in the platform host

Use the validator or preview from the platform procedure. Only the platform host test covers the platform API.

Record these items:

- Complete validator result
- Each configured orientation
- Start, completion, and CTA actions
- All platform warnings
- File hash and test date

The validator page makes its own network requests. Identify the requests that came from the playable frame.

## 4. Test on devices

Test on iOS and Android. Include one lower-performance device.

| Record | Value |
| --- | --- |
| Device | Model name |
| Software | OS and preview-app version |
| Layout | Orientation and safe zones |
| Input | Tap, drag, and multi-touch result |
| Lifecycle | Hide, resume, and audio-interruption result |
| Performance | Load time, frame pacing, and memory result |
| Evidence | Screenshots, video, and console output |

Use the device test that the platform supplies:

- AppLovin Playable Preview
- Unity Ad Testing
- TikTok QR preview
- Meta placement preview
- Playturbo QR preview
- WeChat Developer Tools Preview
- Discord Developer Activity Shelf
- YouTube Dev Link on desktop, mobile web, Android, and iOS
- Facebook Instant Games staged build

## Troubleshooting

| Error | Action |
| --- | --- |
| First tap opens the store | Call `NeedlePlayableAd.open()` only from the install CTA. |
| Browser test passes but upload fails | Check the profile, ZIP root, URLs, resources, and forbidden globals. |
| External script found | Check whether the platform requires TikTok SDK, Google Exit API, or MRAID. |
| Canvas is blank | Find the first decoder or renderer error. Check the canvas pixels. |
| CTA fails in the platform preview | Check the host API and store URL. |

## Related pages

- [Build Playable Ads and Hosted Games](/docs/how-to-guides/deployment/playable-ads/)
- [Playable Build Profiles](/docs/reference/playable-ads)
