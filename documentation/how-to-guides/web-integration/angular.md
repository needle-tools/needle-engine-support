---
title: Using Needle Engine with Angular
description: Add a Needle Engine scene to an Angular app and include a signed license in Angular builds.
---

# Needle Engine + Angular

Needle Engine's `<needle-engine>` web component can run in an Angular application. Angular projects do not use the Needle Vite or Next.js plugins, so a signed license must be generated separately for development and production builds.

This guide requires an `@needle-tools/engine` version that includes the `needle-license` command. The command was added after `6.0.0-alpha.4`.

## Add Needle Engine to an Angular app

Install the package:

```bash
npm install @needle-tools/engine
```

Import the engine once and allow its custom element in the Angular component that uses it:

```ts
import '@needle-tools/engine';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<needle-engine src="/assets/scene.glb" camera-controls></needle-engine>',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {}
```

Put the `.glb` file where Angular serves static assets, or use a full URL in `src`. See the [web component reference](/docs/reference/needle-engine-attributes) for more attributes.

## Include a signed license

Add this tag to `src/index.html` inside `<head>`:

```html
<meta name="needle-license" content="needle-license.json">
```

Add scripts to the Angular project's `package.json`:

```json
{
  "scripts": {
    "prestart": "needle-license --out public/needle-license.json",
    "start": "ng serve",
    "prebuild": "needle-license --out public/needle-license.json",
    "build": "ng build"
  }
}
```

Run `npm start` for development and `npm run build` for production. npm runs each `pre*` script before its matching command. Angular copies `public/needle-license.json` into the served app or build output. If your project uses another static asset directory, change the `--out` path to match it.

Add `public/needle-license.json` to the project's `.gitignore`. The generated JSON contains a signed license token, not your Needle Cloud access token, but it should be regenerated for each build. Running `ng serve` or `ng build` directly skips the license generation step.

For automated builds, set `NEEDLE_CLOUD_TOKEN` to a token for the team that owns your license. For local builds, sign in with the Needle Cloud CLI. If your account belongs to multiple teams, pass `--team your-team-id` to `needle-license`. Keep the Cloud access token in your CI secrets; never put it in `public/` or client code.

If no signed license is available, the command writes an empty license file so an older signed token cannot be reused accidentally. The engine then performs its usual runtime license check. The signed file is requested without browser caching.

## Angular build settings

The license command only generates the license file. Depending on the Angular and Needle dependency versions, the Angular application builder may also need these options in the project's `angular.json` build `options`:

```json
{
  "loader": { ".wasm": "file" },
  "externalDependencies": ["node:module"]
}
```

The `.wasm` loader lets Angular bundle WebAssembly assets. The `node:module` external entry avoids bundling a guarded Node-only import in the current MaterialX dependency. Configure decoder assets such as Draco or KTX2 in the Angular project if your scenes use them; `needle-license` does not copy assets.
