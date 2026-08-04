---
title: Test Playable Ads
description: Test a playable package, runtime, platform host, and device.
---

# Test Playable Ads

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

### Agent command

```sh
agent-browser --session playable --allow-file-access open file:///absolute/path/to/index.html
agent-browser --session playable set viewport 390 844
agent-browser --session playable errors
agent-browser --session playable console
agent-browser --session playable network requests
agent-browser --session playable screenshot evidence/portrait.png
agent-browser --session playable close
```

Take a new snapshot after each navigation or dialog. Keep credentials and test evidence outside the upload file.

## 3. Test in the platform host

Use the validator or preview from the platform procedure. Only the platform host test covers the platform API.

Record these items:

- Complete validator result
- Each configured orientation
- Start, completion, and CTA actions
- All platform warnings
- File hash and test date

The validator page makes its own network requests. Identify the requests that came from the playable frame.

::: info Agent permissions
An agent can upload an authorized draft and record results. Do not submit, publish, activate, or change spend without permission.
:::

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

## Run Needle tests

From the Needle Engine package, run:

```sh
npm run test:playable
cd tests/playwright
npx playwright test tests/plugins/playable-single-html.integration.spec.ts tests/plugins/wechat-platform.integration.spec.ts
```

These tests build each platform output. They test local loading, textured rendering, host APIs, network requests, and runtime errors.

The WeChat test also runs the generated Mini Game package in the browser host adapter.

Run the platform and device tests after the Needle tests.

## Troubleshooting

| Error | Action |
| --- | --- |
| First tap opens the store | Call `NeedlePlayableAd.open()` only from the install CTA. |
| Browser test passes but upload fails | Check the profile, ZIP root, URLs, resources, and forbidden globals. |
| External script found | Check whether the platform requires TikTok SDK, Google Exit API, or MRAID. |
| Canvas is blank | Find the first decoder or renderer error. Check the canvas pixels. |
| CTA fails in the platform preview | Check the host API and store URL. |

## Related pages

- [Build Playable Ads](/docs/how-to-guides/deployment/playable-ads)
- [Playable Ad Build Profiles](/docs/reference/playable-ads)
