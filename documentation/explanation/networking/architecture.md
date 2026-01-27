# Networking Architecture

**Understanding how multiplayer works in Needle Engine.**

Needle Engine includes a comprehensive networking solution built on WebSockets and modern web technologies. This page explains the concepts and architecture behind Needle's networking system.

## Overview

Networking in Needle Engine is based on [WebSockets](https://github.com/jjxxs/websocket-ts). For most use cases, automatic networking uses JSON data for ease of use. For complex use cases and high-performance requirements, Needle uses [Flatbuffers](https://google.github.io/flatbuffers/) for efficient binary message transfer.

## Core Concepts

### Rooms and State

At the heart of networking in Needle Engine is the concept of **synchronized rooms**. Each room has a unique ID, and users connect to a room by providing this ID. Rooms are stored on a server, and users can join and leave rooms at any time.

**The Room Lifecycle:**

1. **Joining** - When a user joins a room, they receive the current state of the room
2. **Synchronization** - The client applies the current state to their scene
3. **Live Updates** - The client listens for changes to the room state
4. **Leaving** - When a user leaves a room, they stop listening for changes

**State Persistence:**

Room state is stored as JSON data on the server, making all changes persistent. This means:
- Room state survives user disconnects
- Useful not only for multiplayer, but also for single-user persistence
- Users joining later see the same state as everyone else

**View-Only Access:**

Needle can provide _view-only IDs_ for rooms. When accessing a room with a view-only ID, the user:
- Cannot interact with or modify the room state
- Can see the current state and get live updates
- Useful for presentations, demonstrations, or spectator modes

### Ownership

Objects in a room can be _owned_ by a specific user. This ensures that only the owner of an object can change its state.

**Ownership Rules:**

- By default, objects have no owner
- Components like `DragControls` automatically request ownership before modifying objects
- In custom components, you control how ownership is handled:
  - No ownership required
  - Automatic ownership transfer
  - Manual ownership transfer only

**Ownership and Disconnection:**

When a user leaves a room, objects owned by that user will either be:
- Deleted from the room (if marked as temporary)
- Have ownership reset (allowing others to take control)

This behavior depends on how the object was created and whether `deleteOnDisconnect` was specified.

## Message Types

Needle Engine supports two types of messages:

### JSON Messages (Default)

- **Easy to use and debug**
- Human-readable format
- Ideal for most use cases
- Used by automatic networking (`@syncField`)
- Good for up to 15-20 concurrent users

### Binary Messages (Flatbuffers)

- **High performance**
- Compact binary format
- Lower bandwidth usage
- Faster serialization/deserialization
- Ideal for high-frequency updates (transforms, animations)
- Required for larger deployments

## Architecture Components

### Client-Side

**Connection API** - Available via `this.context.connection` in components:
- Send and receive messages
- Join and leave rooms
- Request and manage ownership
- Subscribe to networking events

**Automatic Networking** - High-level API using decorators:
- `@syncField()` - Automatically sync component fields
- `syncInstantiate()` - Create objects across the network
- `syncDestroy()` - Destroy objects across the network

**Manual Networking** - Low-level API for custom control:
- `send()` - Send JSON messages
- `sendBinary()` - Send binary (Flatbuffer) messages
- `beginListen()` / `stopListen()` - Subscribe to message types

### Server-Side

**Default Needle Servers:**
- Managed cloud infrastructure
- No setup required
- Free for typical usage (15-20 concurrent users)
- Handles rooms, state persistence, and message routing

**Custom Servers:**
- Full control over infrastructure
- Self-hosted networking server (Node.js package)
- Supports Fastify, Express, or custom frameworks
- Configurable storage (disk, S3-compatible services)
- Scalable for larger deployments

## Message Persistence

Messages can be:

### Persistent Messages
- Saved in room state
- Include a `guid` field
- Sent to users who join later
- Used for object state, transforms, etc.

### Non-Persistent Messages
- Only sent to users currently in the room
- No `guid` field, or `dontSave: true`
- Used for effects, sounds, temporary notifications
- Not replayed for late-joining users

### Conditional Persistence
- `deleteOnDisconnect: true` - Saved in room state but deleted when the user disconnects
- Useful for player-specific state that shouldn't persist

## WebRTC for Voice and Video

For voice chat and screen sharing, Needle Engine uses [peer.js](https://peerjs.com/) which is built on WebRTC. This provides:
- Direct peer-to-peer audio/video connections
- Lower latency than server-relayed streams
- Built-in NAT traversal with ICE/STUN/TURN servers
- Configurable server infrastructure

## Next Steps

**Want to get started?**
- [Enable Networking](/docs/how-to-guides/networking/setup) - Add multiplayer to your project
- [Sync Component State](/docs/how-to-guides/networking/sync-state) - Automatic networking with `@syncField`

**Want to dive deeper?**
- [Manual Networking](/docs/how-to-guides/networking/manual-networking) - Low-level message API
- [Custom Servers](/docs/how-to-guides/networking/custom-servers) - Host your own networking infrastructure

**Looking for reference?**
- [Networking Events API](/docs/reference/api/networking-events) - Complete event reference
- [Built-in Networking Components](/docs/reference/components#networking) - Component catalog
