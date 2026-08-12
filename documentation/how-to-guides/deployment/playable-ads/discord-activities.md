---
title: Build a Discord Activity
description: Build and test a Needle Engine game as a Discord Activity.
---

# Build a Discord Activity

A Discord Activity is a hosted web game. Discord runs it in an iframe and connects it to the Discord client through the Embedded App SDK.

::: info Needle output
The `discord` target creates `dist/Discord/`. Deploy this folder to an HTTPS web host. Discord does not use a playable-ad ZIP.
:::

## 1. Create the Discord application

1. Enable **Developer Mode** in Discord.
2. Open the [Discord Developer Portal](https://discord.com/developers/applications).
3. Create an application.
4. Under **Installation**, enable **User Install** and **Guild Install**.
5. Under **OAuth2**, add `https://127.0.0.1` as a redirect URI for initial testing.
6. Copy the application ID. This is the public client ID.

Do not put the client secret or bot token in the web project. Exchange OAuth tokens on a server.

<!-- SCREENSHOT PLACEHOLDER
Title: Discord Developer Portal — Activity application
Capture: The application settings with Activities enabled.
-->

## 2. Add the Embedded App SDK

Install the official SDK:

```sh
npm install @discord/embedded-app-sdk
```

Initialize it before you use Discord commands:

```ts
import { DiscordSDK } from "@discord/embedded-app-sdk";

const discord = new DiscordSDK("YOUR_APPLICATION_ID");
await discord.ready();
```

Use the SDK for participant data, channel data, invitations, rich presence, purchases, and instance events. Read the [Embedded App SDK reference](https://docs.discord.com/developers/developer-tools/embedded-app-sdk).

## 3. Add multiplayer

Discord gives every running Activity an `instanceId`. Players in the same Activity receive the same value. Use it as the room ID for your game server.

```ts
import { DiscordSDK, Events } from "@discord/embedded-app-sdk";

const discord = new DiscordSDK("YOUR_APPLICATION_ID");
const roomId = discord.instanceId;

await discord.ready();
const { participants } = await discord.commands.getInstanceConnectedParticipants();

await discord.subscribe(Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE, event => {
    updatePlayerNames(event.participants);
});
```

`instanceId` is ready after you create the SDK object. Participant commands are ready after `discord.ready()`.

The Embedded App SDK supplies the room ID and participant list. Your game server sends positions, rotations, shots, and game state. Needle networking can send this state.

For the Space Strike sample, add these URL mappings in this order:

| Prefix | Target |
| --- | --- |
| `/needle-networking` | `networking-2.needle.tools/socket` |
| `/` | Your game host |

Use `wss://<your-application-id>.discordsays.com/needle-networking` in the Activity. Discord sends this request to the mapped WebSocket server.

Read [Multiplayer Experience](https://docs.discord.com/developers/activities/development-guides/multiplayer-experience) and [Networking](https://docs.discord.com/developers/activities/development-guides/networking).

<!-- SCREENSHOT PLACEHOLDER
Title: Discord Activity — two connected players
Capture: Two player ships with different colors and visible name badges.
-->

## 4. Add the build target

```js
playableAds: {
    name: "MyGame",
    platforms: [
        { platform: "discord" },
    ],
}
```

Build the project:

```sh
npm run build -- --production
```

Serve `dist/Discord/` from an HTTPS host. Keep all Vite paths relative.

## 5. Test the Activity locally

Discord desktop and web require HTTPS. Test through Discord's proxy so local and production URLs behave the same way.

1. Serve `dist/Discord/` on a local port.
2. Start an HTTPS tunnel. The Discord guide uses `cloudflared`:

   ```sh
   cloudflared tunnel --url http://localhost:3000
   ```

3. In the Developer Portal, open **Activities → URL Mappings**.
4. If the game uses Needle networking, add `/needle-networking` and set its target to `networking-2.needle.tools/socket`.
5. Add prefix `/` and set the target to the tunnel host without `https://`.
6. Open **Activities → Settings** and enable Activities.
7. Check that Discord created the default **Launch** entry point command.
8. Keep **Application URL Override** disabled.

::: info Development access
An Activity that is not distributed is available only to its owner and developer-team members. Enable Discord **Developer Mode** to find it in the Developer Activity Shelf.
:::

Discord also supports a direct local URL override. Read [Local Development](https://docs.discord.com/developers/activities/development-guides/local-development) for the HTTPS and platform rules.

<!-- SCREENSHOT PLACEHOLDER
Title: Discord Activity — local URL mapping
Capture: The root URL mapping to the HTTPS tunnel used for local development.
-->

## 6. Test in Discord

1. Open a test server or direct message.
2. Open the App Launcher or Activity shelf.
3. Start the Activity.
4. Test mouse, touch, resize, and audio.
5. Join from a second account if the game uses participants or multiplayer.
6. Check the browser console on desktop.

On mobile, enable Developer Mode and open **User Settings → Debug Logs**. Discord also lets you share application logs from a voice channel.

Read [Local Development](https://docs.discord.com/developers/activities/development-guides/local-development) and [Building Your First Activity](https://docs.discord.com/developers/activities/building-an-activity).

<!-- SCREENSHOT PLACEHOLDER
Title: Needle Activity running in Discord
Capture: The Activity running from the Developer Activity Shelf with the game canvas visible.
-->

## 7. Deploy and release

Deploy `dist/Discord/` to a stable HTTPS host. To use Needle Cloud, follow [Deploy from the CLI](/docs/cloud/#deploy-from-the-cli) and select `dist/Discord/` as the deployment directory.

In **Activities → URL Mappings**, map `/` to the deployed hostname. Do not include `https://` and do not target `index.html`. Keep **Application URL Override** disabled.

Test this configuration through the Developer Activity Shelf. For public access, complete Discord's discovery and distribution setup.

<!-- SCREENSHOT PLACEHOLDER
Title: Discord Activity — production URL mapping
Capture: The root mapping to the deployed HTTPS hostname with Application URL Override disabled.
-->

## Test with an agent

An agent can serve `dist/Discord/`, start the tunnel, and configure an authorized test application. It can then connect to Discord Desktop through its browser debugging port and record console errors, network errors, input, and rendered canvas pixels.

Do not let an agent publish the Activity, change discovery settings, or use a client secret without explicit permission.

## Network requests

Discord routes Activity traffic through its proxy. Add one URL mapping for each external service. Call the mapped path from the game. For example, map `/api` to `api.example.com`, then call `/api` from the Activity.

Put specific paths before the root `/` mapping. This lets `/needle-networking` reach the WebSocket server while `/` reaches the game host.

Read [Discord URL Mapping](https://docs.discord.com/developers/activities/development-guides/local-development#url-mapping).

## Related pages

- [Build Playable Ads and Hosted Games](/docs/how-to-guides/deployment/playable-ads)
- [Discord Activities overview](https://docs.discord.com/developers/activities/overview)
- [How Activities Work](https://docs.discord.com/developers/activities/how-activities-work)
- [Production readiness](https://docs.discord.com/developers/activities/development-guides/production-readiness)
- [Discovery and distribution](https://docs.discord.com/developers/discovery/overview)
- [Needle Cloud](/docs/cloud/)
