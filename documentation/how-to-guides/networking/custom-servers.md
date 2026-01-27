# Host Your Own Networking Server

**Deploy custom networking infrastructure for production and large-scale deployments.**

By default, networked Needle scenes connect to cloud infrastructure managed by Needle. For production deployments, larger audiences, or custom requirements, you can host your own networking server.

## When to Use Custom Servers

Consider hosting your own networking server when you need:
- **Scale** - More than 15-20 concurrent users per room
- **Control** - Full control over infrastructure and implementation
- **Custom Logic** - Server-side validation, custom message handling
- **Data Sovereignty** - Keep data in specific regions or on-premises
- **Cost Optimization** - Predictable costs for high-traffic scenarios

## Using Needle Networking Servers

Needle provides a ready-to-use networking server as an NPM package that you can deploy anywhere.


## Self-Hosted Server Setup

### Installation

The networking server is available as a Node.js package:

```bash
npm install @needle-tools/needle-networking
```

### Integration

Choose your web framework:

::::code-group  

:::code-group-item Fastify

```js
import networking from "@needle-tools/needle-networking";
networking.startServerFastify(fastifyApp, { endpoint: "/socket" });
```
:::

:::code-group-item Express
```js
import networking from "@needle-tools/needle-networking";
networking.startServerExpress(expressApp, { endpoint: "/socket" });
```
:::

:::code-group-item Custom Framework
```js
import { init, onConnection } from "@needle-tools/networking";

// Add your framework-specific websocket implementation
class WebsocketConnector {
    constructor(frameworkWebsocket) {
        // Your implementation
    }
    on(event, callback) {
        // Handle 'message' and 'close' events
        // Call the callback when receiving messages
    }
    send(key, value) {
        // Send messages to the websocket connection
    }
}

const options = { endpoint: "/socket" };
init(options);

yourFramework.createWebsocketRoute(options.endpoint, frameworkWebsocket => {
    onConnection(new WebsocketConnector(frameworkWebsocket));
});
```
:::

::::

::: tip Example Code
See a complete example on [glitch.com/edit/#!/needle-networking](https://glitch.com/edit/#!/needle-networking?path=server.js) with Express integration.
:::

## Configuration Options

The following options are available when starting the server:

| Option | Type | Description | Default |
| --- | --- | --- | --- |
| `options.endpoint` | string | Relative server endpoint (e.g., `/socket` → `yourserver/socket`) | `/` |
| `options.maxUsers` | number | Maximum concurrent users on the server | `50` |
| `options.defaultUserTimeout` | number | Time in seconds before a user is considered disconnected | `30` |

### Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `VIEW_ONLY_SALT` | Salt for generating view-only room IDs from regular room IDs | Predefined value |
| `NEEDLE_NETWORKING_S3_*` | S3 storage configuration (see below) | Not set (uses disk storage) |

## State Storage

### Default Storage (Disk)

By default, network state is stored as JSON files in the `/.data` directory:
- Each room has its own file
- State is sent to clients when they join a room
- Simple and works out of the box
- Suitable for development and small deployments

### S3-Compatible Storage

For production deployments, you can use S3-compatible storage providers (AWS S3, MinIO, DigitalOcean Spaces, etc.):

```bash
NEEDLE_NETWORKING_S3_ENDPOINT=https://your-s3-endpoint.com
NEEDLE_NETWORKING_S3_REGION=us-east-1
NEEDLE_NETWORKING_S3_BUCKET=your-bucket-name
NEEDLE_NETWORKING_S3_ACCESS_KEY_ID=your-access-key
NEEDLE_NETWORKING_S3_ACCESS_KEY=your-secret-key
NEEDLE_NETWORKING_S3_PREFIX=my_state/ # Optional prefix for all state files
```

## Local Development Server

For testing and development, run a local networking server:

### Setup

1. Download the local server from [github.com/needle-tools/networking-local](https://fwd.needle.tools/needle-engine/local-networking-repository)
2. Follow the README instructions to set up the server
3. The server will run on `wss://localhost:9001/socket` by default

### Configure Your Scene

1. Add a `Networking` component to your scene
2. Paste the local server address into the "Localhost" field:
   ```
   wss://localhost:9001/socket
   ```

![Needle Engine Networking component with custom server](/imgs/networking_absolute.webp)

## Different Servers for Development and Production

You can use different server URLs for local development and hosted deployment:

**In the Networking component:**
- **Localhost** - Used during local development
- **Production** - Used when your app is deployed

This allows you to:
- Test with a local server during development
- Automatically use production servers when deployed
- Avoid hardcoding server URLs

## Deployment

The networking server can be deployed to any Node.js hosting provider:

### Recommended Platforms

- **Google Cloud Run** - Serverless, auto-scaling
- **AWS EC2 / ECS** - Full control, scalable
- **Azure App Service** - Managed Node.js hosting
- **DigitalOcean App Platform** - Simple deployment
- **Railway** - Easy deployment with git integration
- **Render** - Modern deployment platform

### Deployment Checklist

- [ ] Set appropriate `maxUsers` limit
- [ ] Configure S3 storage for persistence (recommended)
- [ ] Set up SSL/TLS certificates (wss:// required)
- [ ] Configure CORS if needed
- [ ] Set up monitoring and logging
- [ ] Test with expected user load
- [ ] Configure auto-scaling if supported

## Advanced: WebRTC Customization

For voice chat (`VoIP`) and screen sharing (`ScreenCapture`), Needle Engine uses [peer.js](https://peerjs.com/) with WebRTC.

To use custom ICE/STUN/TURN servers:

```ts
import { setPeerOptions } from "@needle-tools/engine";

setPeerOptions({
    config: {
        iceServers: [
            { urls: 'stun:your-stun-server.com:19302' },
            {
                urls: 'turn:your-turn-server.com:3478',
                username: 'username',
                credential: 'password'
            }
        ]
    }
});
```

## Troubleshooting

### Connection Issues

**Problem:** Can't connect to custom server

**Solutions:**
- Verify server is running and accessible
- Check WebSocket endpoint URL (should start with `ws://` or `wss://`)
- Ensure CORS is configured if hosting on different domain
- Check firewall rules allow WebSocket connections

### Performance Issues

**Problem:** Slow or laggy synchronization

**Solutions:**
- Increase server resources (CPU, memory)
- Use S3 storage instead of disk storage
- Deploy server closer to your users (CDN, edge functions)
- Consider using binary messages (Flatbuffers) for high-frequency updates
- Increase `maxUsers` if hitting limits

## Next Steps

**Learn more:**
- [Understanding Networking](/docs/explanation/networking/architecture) - How the networking system works
- [Manual Networking](/docs/how-to-guides/networking/manual-networking) - Custom message handling

**Reference:**
- [Networking Package Repository](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking) - Full server code
- [Local Server Repository](https://fwd.needle.tools/needle-engine/local-networking-repository) - Development server setup
- [Networking Events API](/docs/reference/api/networking-events) - Complete event reference
