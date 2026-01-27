# Manual Networking

**Send and receive custom network messages with full control.**

Needle Engine provides a low-level API for sending and receiving messages. We call this "manual networking". The principles are the same as automatic networking, but you're in full control of when to send messages, what data to send, and how to handle incoming messages.

## When to Use Manual Networking

Use manual networking when you need:
- Custom message formats
- Complex data structures
- Fine-grained control over when messages are sent
- High-performance binary messages
- Custom server-side logic

For simple field synchronization, use [`@syncField`](/docs/how-to-guides/networking/sync-state) instead.

## Sending Messages

### Send JSON Messages

Send a message to all users in the same room:

```ts
this.context.connection.send(key: string, data: IModel | object | boolean | string | number | null);
```

**Example:**

```ts
// Send a custom event
this.context.connection.send("player-jumped", {
    playerId: this.playerId,
    height: 2.5,
    timestamp: Date.now()
});
```

### Send Binary Messages (Advanced)

::: warning Advanced - Not Needed for Most Use Cases
Binary messages with FlatBuffers are an **advanced optimization** for very high-frequency updates (100+ messages per second). **Most applications should use JSON messages** which are simpler and easier to work with.
:::

For extreme performance scenarios, send binary (Flatbuffer) messages:

```ts
this.context.connection.sendBinary(byteArray: Uint8Array);
```

See [Using Flatbuffers](#using-flatbuffers) for details.

## Receiving Messages

### Subscribe to Messages

You can subscribe to events in the room using a specific key. Typically, you want to match subscribing with unsubscribing:

**Option 1: Enable/Disable Lifecycle**
Subscribe in `onEnable` and unsubscribe in `onDisable`. With this approach, no messages will be received while the object is disabled.

```ts
onEnable() {
    this.context.connection.beginListen("player-jumped", this.onPlayerJumped);
}

onDisable() {
    this.context.connection.stopListen("player-jumped", this.onPlayerJumped);
}

private onPlayerJumped = (data: any) => {
    console.log("Player jumped:", data.playerId, data.height);
}
```

**Option 2: Start/Destroy Lifecycle**
Subscribe in `start` and unsubscribe in `onDestroy`. With this approach, messages will still be received while the object is disabled.

```ts
start() {
    this.context.connection.beginListen("player-jumped", this.onPlayerJumped);
}

onDestroy() {
    this.context.connection.stopListen("player-jumped", this.onPlayerJumped);
}

private onPlayerJumped = (data: any) => {
    console.log("Player jumped:", data.playerId, data.height);
}
```

### Unsubscribe from Messages

Always unsubscribe when you're done listening:

```ts
this.context.connection.stopListen(key: string);
```

## Message Persistence

When sending network messages, you can control whether messages should be saved in the room state (persistent) or only sent to users currently in the room (non-persistent).

### Persistent Messages

To persist a message, include a `guid` field. This field typically identifies which object the message applies to:

```ts
// This message will be saved in room state
// and sent to users who join later
this.context.connection.send("my-message", {
    guid: this.guid,
    myData: "myValue"
});
```

### Non-Persistent Messages

Messages without a `guid` field are only sent to users currently in the room:

```ts
// This message will NOT be saved in room state
// Only current users receive it
this.context.connection.send("my-message", {
    myData: "myValue"
});
```

### Prevent Persistence (with guid)

To target a specific object (include a `guid`) but still prevent persistence, set `dontSave` to `true`:

```ts
// Send to a specific object but don't persist
this.context.connection.send("my-message", {
    guid: this.guid,
    myData: "myValue",
    dontSave: true
});
```

### Delete on Disconnect

To persist a message but delete it when the user disconnects, use `deleteOnDisconnect`:

```ts
// Persist until the user disconnects
this.context.connection.send("my-message", {
    guid: this.guid,
    myData: "myValue",
    deleteOnDisconnect: true
});
```

### Delete Specific State

To delete state for a specific guid from the backend storage:

```ts
this.context.connection.send("delete-state", {
    guid: "guid_to_delete"
});
```

## Debug Flags

Use these URL parameters to understand network messages:

| Flag | Description |
|------|-------------|
| `?debugnet` | Log all incoming and outgoing network messages |
| `?debugowner` | Log all ownership requests and changes |
| `?debugnetbin` | Log binary message details |

**Example:**
```
http://localhost:3000/?debugnet
```

## Using Flatbuffers (Advanced)

::: warning Advanced Feature - Not Necessary for Most Projects
**You probably don't need this.** FlatBuffers are an advanced optimization for extreme performance scenarios (e.g., 100+ network messages per second).

**For most multiplayer applications**, JSON messages are:
- Much easier to implement and debug
- Fully sufficient for typical gameplay (movement, interactions, chat, etc.)
- Already optimized by Needle Engine

Only consider FlatBuffers if you have profiled your application and confirmed that JSON message serialization is a bottleneck.
:::

Binary messages using [Flatbuffers](https://google.github.io/flatbuffers/) can be faster and more efficient than JSON messages for very high-frequency updates or extremely large data structures.

**Requirements:**
- Define custom FlatBuffer schemas (`.fbs` files)
- Compile schemas to TypeScript using the FlatBuffers compiler
- Register schemas with the networking system
- Write custom serialization/deserialization code

### Register a Schema

```ts
import { registerBinaryType } from '@needle-tools/engine';
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

registerBinaryType(MySchemaIdentifier, MyDataModel.getRootAsSyncedTransformModel);
```

### Send Binary Messages

```ts
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";
const builder = new flatbuffers.Builder();

// Construct a Flatbuffer message
function createMyCustomModel(somePayload: string): Uint8Array {
    builder.clear();
    MyDataModel.startMyDataModel(builder);
    const guidObj = builder.createString(guid);
    MyDataModel.addSomePayload(builder, guidObj);
    const res = MyDataModel.endMyDataModel(builder);
    builder.finish(res, MySchemaIdentifier);
    return builder.asUint8Array();
}

// Send the data
function sendData() {
    const data = createMyCustomModel("your-payload");
    this.context.connection.sendBinary(data);
}
```

### Receive Binary Messages

```ts
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

this.context.connection.beginListenBinary(MySchemaIdentifier, (data) => {
    const model = MyDataModel.getRootAsMyDataModel(data);
    console.log("Received binary message", model, model.somePayload());
});
```

### Unsubscribe from Binary Messages

```ts
this.context.connection.stopListenBinary(identifier: string);
```

### Built-in Flatbuffer Schemas

Needle Engine uses these binary schemas internally:

- **SyncedTransform** ('STRS') - High-frequency transform updates
- **SyncedCamera** ('SCAM') - Camera position/rotation sync
- **Vec2/3/4** - Optimized vector types

::: tip Custom Binary Messages
Currently, custom binary messages can't be automatically persisted on the networking server. To enable persistence, you need to modify the networking server to process your custom flatbuffer schemas.
:::

### Flatbuffer Resources

- [Built-in schemas in Needle Engine](https://github.com/needle-tools/needle-engine-support/tree/main/documentation/node_modules/@needle-tools/engine/src/engine-schemes)
- [Generating a schema](https://google.github.io/flatbuffers/flatbuffers_guide_writing_schema.html)
- [Using the schema compiler](https://google.github.io/flatbuffers/flatbuffers_guide_using_schema_compiler.html)
- [Flatbuffers in TypeScript](https://google.github.io/flatbuffers/flatbuffers_guide_use_typescript.html)

## Next Steps

**Learn more:**
- [Host Your Own Server](/docs/how-to-guides/networking/custom-servers) - Deploy custom networking infrastructure
- [Understanding Networking](/docs/explanation/networking/architecture) - Learn how messages work

**Reference:**
- [Networking Events API](/docs/reference/api/networking-events) - Complete event reference
- [Built-in Components](/docs/reference/components#networking) - Networking component catalog
