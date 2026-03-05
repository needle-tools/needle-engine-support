---
title: Networking & Multiplayer
description: Build real-time multiplayer 3D web experiences with Needle Engine. Add shared state synchronization, voice chat (VoIP), screen sharing, and collaborative features with simple components. Supports 15-20 concurrent users on default servers, scalable to thousands with custom infrastructure.
---

# Networking & Multiplayer

**Build multiplayer 3D web experiences with shared state, voice chat, and real-time synchronization.**

Needle Engine includes a full networking solution for multiplayer experiences. Shared world state, voice chat, session persistence, and more can be achieved with our networking components and APIs.

<video-embed src="/docs/videos/networking-example.mp4" autoplay muted />

## Quick Start

Get your first multiplayer scene running in 5 minutes:

1. Add a `SyncedRoom` component to your scene
2. Add `SyncedTransform` to an object
3. Add `DragControls` to make it interactive
4. Open in two browser windows and drag the object!

**[Follow the complete setup guide →](./setup)**

## What Can You Build?

- **Collaborative Spaces** - Multiple users exploring and interacting together
- **Multiplayer Games** - Real-time games with synchronized state
- **Virtual Meetings** - Persistent meeting spaces with voice chat
- **Interactive Experiences** - Shared AR/VR experiences across devices
- **Collaborative Design** - Real-time 3D design collaboration

## Choose Your Path

### 🎯 First Time with Networking?

Start with the basics:
- **[Enable Networking](./setup)** - Add multiplayer to your project (5 min)
- **[Sync Component State](./sync-state)** - Use `@syncField` for automatic networking
- **[Understanding Networking](/docs/explanation/networking/architecture)** - Learn how it works

### 🔧 Building Something Specific?

Jump to practical guides:
- **[Sync Component State](./sync-state)** - Automatic networking with `@syncField`
- **[Manual Networking](./manual-networking)** - Send and receive custom messages
- **[Host Your Own Server](./custom-servers)** - Deploy custom networking infrastructure

### 📚 Want to Understand How It Works?

Learn the concepts:
- **[Networking Architecture](/docs/explanation/networking/architecture)** - Rooms, ownership, and state
- **[Message Types](/docs/explanation/networking/architecture#message-types)** - JSON vs Binary (Flatbuffers)
- **[WebRTC for Voice](/docs/explanation/networking/architecture#webrtc-for-voice-and-video)** - How voice chat works

### 📖 Looking for Reference?

Find specific information:
- **[Networking Events](/docs/reference/api/networking-events)** - Complete event reference
- **[Built-in Components](/docs/reference/components#networking)** - Networking component catalog
- **[API Documentation](https://engine.needle.tools/docs/api/latest)** - TypeScript API docs

## Built-in Networking Components

| Component | Description |
| --- | --- |
| `SyncedRoom` | Handles networking connection and room management |
| `SyncedTransform` | Synchronizes object transforms (position, rotation, scale) |
| `SyncedCamera` | Spawns a prefab for each user showing their viewpoint |
| `VoIP` | Voice-over-IP audio connections between users |
| `ScreenCapture` | Screen sharing via web APIs - [Example](https://engine.needle.tools/samples/screensharing) |
| `Networking` | Customize server backend URL or use local server |
| `DragControls` | Drag objects with automatic ownership transfer |
| `Duplicatable` | Duplicate objects across the network |
| `Deletable` | Delete objects across the network |
| `DeleteBox` | Delete objects when dragged into a volume |
| `PlayerSync` | Instantiate an object for each connected player |
| `PlayerState` | Component for objects instantiated by `PlayerSync` |
| `PlayerColor` | Assign each user a random color |
| `WebXR` | Synchronize VR/AR avatars (hands and heads) |

## Voice Chat (VoIP)

Needle Engine includes **built-in voice chat** using WebRTC — no server configuration needed.

### Quick Setup

Add voice chat to any multiplayer scene:

1. Add a `SyncedRoom` component (if not already present)
2. Add a `Voip` component to your scene
3. That's it — users can talk to each other!

```ts
import { Behaviour, Voip } from "@needle-tools/engine";

export class VoiceChatSetup extends Behaviour {
    start() {
        // Add voice chat to the scene programmatically
        this.gameObject.addComponent(Voip);
    }
}
```

### How It Works

- Uses **peer-to-peer WebRTC** connections (via peer.js) — audio goes directly between users, not through a server
- Supports **spatial audio** — voices get quieter with distance
- Works across desktop, mobile, and VR
- No additional server costs for voice

### Screen Sharing

Use the `ScreenCapture` component alongside VoIP for screen sharing capabilities — [example](https://engine.needle.tools/samples/screensharing).

---

## Default Networking Infrastructure

By default, Needle scenes connect to cloud infrastructure managed by Needle:
- ✅ No additional setup needed
- ✅ Currently no additional cost
- ✅ Works fine for 15-20 concurrent users per room
- ✅ Perfect for prototyping and small deployments

For production or larger deployments, you can [host your own server](./custom-servers).

## Common Questions

### How many users can connect?

**Default servers:** Around 15-20 concurrent users per room works well.

**Custom servers:** Scalable to hundreds or thousands of users depending on your infrastructure.

### Is voice chat included?

Yes! Use the `VoIP` component for voice chat and the `ScreenCapture` component for screen sharing. Both use WebRTC (peer.js) for direct peer-to-peer connections.

### Can I use my own server?

Absolutely! The networking server is available as an [NPM package](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking) and can be deployed anywhere. See [Custom Servers](./custom-servers) for details.

### How is state persisted?

Room state is automatically saved on the server as JSON. When new users join, they receive the current state. You can configure storage to use disk (default) or S3-compatible services.

### Can I send custom messages?

Yes! Use [manual networking](./manual-networking) for complete control over messages. You can send JSON or binary (Flatbuffer) messages with custom data.

## How-To Guides

**Setup & Basics:**
- [Enable Networking](./setup) - Add multiplayer to your project
- [Sync Component State](./sync-state) - Use `@syncField` decorator

**Advanced:**
- [Manual Networking](./manual-networking) - Send custom messages
- [Host Your Own Server](./custom-servers) - Deploy custom infrastructure

## Learn More

**Understanding:**
- [Networking Architecture](/docs/explanation/networking/architecture) - How networking works
- [Built-in Components](/docs/reference/components#networking) - Component catalog

**Reference:**
- [Networking Events](/docs/reference/api/networking-events) - Complete event reference
- [API Documentation](https://engine.needle.tools/docs/api/latest) - TypeScript API

**Resources:**
- [Networking Package](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking) - NPM package
- [Local Server Setup](https://fwd.needle.tools/needle-engine/local-networking-repository) - Development server

## Next Steps

1. **[Enable Networking](./setup)** - Get started with your first multiplayer scene
2. **[Sync Component State](./sync-state)** - Learn automatic networking
3. **[Understanding Networking](/docs/explanation/networking/architecture)** - Learn the concepts
