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
6. Enable **Public Client** if the Activity authenticates without a server.
7. Copy the application ID. This is the public client ID.

Never put a client secret or bot token in the web project. A public client uses PKCE and does not use a client secret. A confidential client exchanges the authorization code on a server.

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

`instanceId` is ready after you create the SDK object. `discord.ready()` completes the SDK handshake. Authenticate the SDK before you request participant names.

### Authenticate without a server

Use a public client with PKCE when the game needs participant names for UI. Keep the token in memory:

```ts
function base64Url(bytes: Uint8Array) {
    return btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

async function authenticatePublicClient(discord: DiscordSDK, clientId: string) {
    const verifier = base64Url(crypto.getRandomValues(new Uint8Array(48)));
    const digest = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(verifier),
    );
    const challenge = base64Url(new Uint8Array(digest));

    const { code } = await discord.commands.authorize({
        client_id: clientId,
        response_type: "code",
        prompt: "none",
        scope: ["identify"],
        code_challenge: challenge,
        code_challenge_method: "S256",
    });

    const response = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code,
            code_verifier: verifier,
        }),
    });
    if (!response.ok) throw new Error(`Discord OAuth failed (${response.status})`);

    const { access_token } = await response.json();
    await discord.commands.authenticate({ access_token });
}
```

Call this function after `discord.ready()` and before `getInstanceConnectedParticipants()`.

::: info Participant data is UI data
Discord states that Activity client data can be changed by the client. Use it for names, avatars, and local presentation. Verify identity on your server before it grants accounts, purchases, saved progress, or other trusted state.
:::

Use a confidential client when your server needs a verified Discord identity. Leave **Public Client** disabled, exchange the authorization code on the server, and send the access token to the Activity. Read [Building Your First Activity](https://docs.discord.com/developers/activities/building-an-activity#step-5-authorizing--authenticating-users) for this flow.

After authentication, request and subscribe to the participant list. If Discord returns code `4006`, the SDK session is not authenticated or the access token is invalid.

The Embedded App SDK supplies the room ID and participant list. Your game server sends positions, rotations, shots, and game state. Needle networking can send this state.

Connect Needle networking after the SDK is ready. Use the Activity instance ID as part of the room name:

```ts
const networkingUrl = `wss://${clientId}.discordsays.com/needle-networking`;

await context.connection.connect(networkingUrl);
context.connection.joinRoom(`my-game:${discord.instanceId}`);
```

Add these URL mappings in this order:

| Prefix | Target |
| --- | --- |
| `/needle-networking` | `networking-2.needle.tools/socket` |
| `/` | Your game host |

Discord sends the first URL to the Needle networking server. The root mapping sends all other requests to the game host.

::: tip URL mapping order
Put `/needle-networking` before `/`. Discord matches the first suitable prefix. Mapping targets do not include `https://` or `wss://`.
:::

Discord supports WebSockets. It does not support WebRTC or WebTransport. Send only the game state that other players need. Validate player messages before you apply them.

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

## Switch between development and production

Change only the Activity URL setting. Keep the OAuth and networking settings:

| Developer Portal setting | Proxy development | Direct local development | Production |
| --- | --- | --- | --- |
| **OAuth2 → Public Client** | Enabled | Enabled | Enabled |
| **OAuth2 → Redirect URI** | `https://127.0.0.1` | `https://127.0.0.1` | `https://127.0.0.1` |
| **Activities → URL Mapping `/needle-networking`** | `networking-2.needle.tools/socket` | Not used by the override | `networking-2.needle.tools/socket` |
| **Activities → URL Mapping `/`** | HTTPS tunnel hostname | Keep the production hostname | Deployed hostname |
| **Application URL Override** | Disabled | `https://127.0.0.1:5173/` | Disabled |

Mapping targets contain the hostname and path only. Do not add `https://`, `wss://`, or `index.html`. Put `/needle-networking` before `/`.

::: tip Return to production
Disable **Application URL Override** and restore the `/` mapping to the deployed hostname. The OAuth settings do not change.
:::

## 5. Test through the Discord proxy

Use this workflow to test the SDK, URL mappings, and multiplayer. Discord recommends this workflow because it uses the same proxy as production.

1. Build the Discord target.
2. Start an HTTPS tunnel. Discord uses `cloudflared` in its local development guide:

   ```sh
   cloudflared tunnel --url http://127.0.0.1:5173
   ```

3. Copy the `trycloudflare.com` host from the terminal.
4. Serve `dist/Discord/` and allow that exact host:

   ```sh
   __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS=YOUR_TUNNEL_HOST \
   npx vite preview --host 127.0.0.1 --port 5173 --outDir dist/Discord
   ```

   Replace `YOUR_TUNNEL_HOST` with the hostname only. Vite rejects other host headers.
5. Open the tunnel URL in a browser. Confirm that it shows the game.
6. In the Developer Portal, open **Activities → URL Mappings**.
7. Add `/needle-networking` with target `networking-2.needle.tools/socket` if the game uses Needle networking.
8. Add `/` with the tunnel host as its target. Remove `https://` from the target.
9. Open **Activities → Settings** and enable Activities.
10. Check that Discord created the default **Launch** entry point command.
11. Keep **Application URL Override** disabled.

Reset the root mapping after the test. A quick-tunnel hostname can be assigned to another user after the tunnel stops.

::: info Development access
An Activity that is not distributed is available only to its owner and developer-team members. Enable Discord **Developer Mode** to find it in the Developer Activity Shelf.
:::

Discord also supports a direct local URL override. Read [Local Development](https://docs.discord.com/developers/activities/development-guides/local-development) for the HTTPS and platform rules.

<!-- SCREENSHOT PLACEHOLDER
Title: Discord Activity — local URL mapping
Capture: The root URL mapping to the HTTPS tunnel used for local development.
-->

## 6. Use direct local HTTPS

Use a direct URL override to inspect a Vite development build. Desktop Discord requires a trusted HTTPS certificate for this path. Direct traffic does not use Discord URL mappings.

Install `vite-plugin-mkcert`:

```sh
npm install --save-dev --save-exact vite-plugin-mkcert
```

Enable it only for the Discord development mode:

```js
import mkcert from "vite-plugin-mkcert";

export default defineConfig(({ command, mode }) => ({
    plugins: [
        command === "serve" && mode === "discord" ? mkcert() : null,
        needlePlugins(command, needleConfig, { playableAds }),
    ],
}));
```

Add a script and start it:

```json
{
    "scripts": {
        "dev:discord": "vite --host 127.0.0.1 --mode discord"
    }
}
```

```sh
npm run dev:discord
```

The first run creates and installs a local certificate authority. The operating system asks for permission. Open `https://127.0.0.1:5173/` in a browser and confirm that the certificate is trusted.

Then open the Activity in Discord and enable **Application URL Override**. Set it to `https://127.0.0.1:5173/`. Set the application ID in the build because a local hostname does not contain it.

```sh
VITE_DISCORD_CLIENT_ID=YOUR_APPLICATION_ID npm run dev:discord
```

Do not add Discord launch parameters to the override URL. Discord adds the channel, guild, and Activity instance parameters when it creates the iframe.

::: warning Direct networking
Direct local traffic does not use `/needle-networking`. Connect to the full development WebSocket URL, or use the proxy workflow in the previous section.
:::

If the SDK reports `Invalid Origin`, disable the override and use the proxy workflow. This confirms the Activity against the same origin and Content Security Policy as production.

<!-- SCREENSHOT PLACEHOLDER
Title: Discord Activity — direct local URL override
Capture: Application URL Override enabled with a trusted local HTTPS URL.
-->

## 7. Test in Discord

1. Open a test server or direct message.
2. Open the App Launcher or Activity shelf.
3. Start the Activity.
4. Test mouse, touch, resize, and audio.
5. Join from a second account if the game uses participants or multiplayer.
6. Check the browser console on desktop.

For multiplayer, start the same Activity instance with two Discord users. Confirm these results:

- Both clients use the same `discord.instanceId`.
- The participant event reports both users.
- Needle networking reports two users in the room.
- Each client renders and updates the other player's object.
- Leaving and joining removes and restores the remote player.

On mobile, enable Developer Mode and open **User Settings → Debug Logs**. Discord also lets you share application logs from a voice channel.

Read [Local Development](https://docs.discord.com/developers/activities/development-guides/local-development) and [Building Your First Activity](https://docs.discord.com/developers/activities/building-an-activity).

<!-- SCREENSHOT PLACEHOLDER
Title: Needle Activity running in Discord
Capture: The Activity running from the Developer Activity Shelf with the game canvas visible.
-->

## 8. Deploy and release

Deploy `dist/Discord/` to a stable HTTPS host. To use Needle Cloud, follow [Deploy from the CLI](/docs/cloud/#deploy-from-the-cli) and select `dist/Discord/` as the deployment directory.

In **Activities → URL Mappings**, map `/` to the deployed hostname. Do not include `https://` and do not target `index.html`. Keep **Application URL Override** disabled.

Test this configuration through the Developer Activity Shelf. For public access, complete Discord's discovery and distribution setup.

<!-- SCREENSHOT PLACEHOLDER
Title: Discord Activity — production URL mapping
Capture: The root mapping to the deployed HTTPS hostname with Application URL Override disabled.
-->

## Test with an agent

An agent can test the full desktop flow with an authorized Discord test application:

1. Build `dist/Discord/` and run the platform validator.
2. Start `vite preview` and `cloudflared` with the commands above.
3. Set the root URL mapping to the tunnel host. Keep the networking mapping before it.
4. Connect to Discord Desktop through its browser debugging port.
5. Open the Activity from the Developer Activity Shelf.
6. Inspect the Activity iframe, not only the main Discord window.
7. Confirm that the canvas has non-black pixels and changes after input.
8. Confirm this SDK order: `ready`, `authorize`, token exchange, `authenticate`, participant request.
9. Confirm that the participant list contains the signed-in user's display name.
10. Confirm that no request is blocked by the Content Security Policy.
11. Start a second client in the same instance. Confirm two room users, two participant names, and two rendered player objects.
12. Test input, resize, audio unlock, reconnect, and leave cleanup.
13. Restore the production root mapping after the test.

The agent must report the tested Discord client version, Activity application ID, mapping targets, build commit, and exact errors. A clean parent-window console does not prove that the Activity iframe works.

Do not let an agent publish the Activity, change discovery settings, or use a client secret without explicit permission.

## Network requests

Discord routes Activity traffic through its proxy. Add one URL mapping for each external service. Call the mapped path from the game. For example, map `/api` to `api.example.com`, then call `/api` from the Activity.

Put specific paths before the root `/` mapping. This lets `/needle-networking` reach the WebSocket server while `/` reaches the game host.

Read [Discord URL Mapping](https://docs.discord.com/developers/activities/development-guides/local-development#url-mapping).

::: info External packages
Check packages for hard-coded external URLs. Discord blocks an unmapped request with `blocked:csp`. Keep files in the Discord build when the package can load them locally. Add a mapping only when the service must stay online.
:::

## Related pages

- [Build Playable Ads and Hosted Games](/docs/how-to-guides/deployment/playable-ads)
- [Discord Activities overview](https://docs.discord.com/developers/activities/overview)
- [How Activities Work](https://docs.discord.com/developers/activities/how-activities-work)
- [Production readiness](https://docs.discord.com/developers/activities/development-guides/production-readiness)
- [Discovery and distribution](https://docs.discord.com/developers/discovery/overview)
- [Needle Cloud](/docs/cloud/)
