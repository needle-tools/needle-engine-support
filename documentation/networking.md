# Networking

Needle Engine includes a full networking solution for multiplayer experiences.  
A shared world state, voice chat, session persistence, and more can be achieved with our networking components and APIs. You can network your own components with a choice of automatic or manual networking.  

Networking in Needle Engine is  based on [Websockets](https://github.com/jjxxs/websocket-ts). Automatic networking uses JSON data for ease of use. For complex usecases and high-performance requirements, we use [Flatbuffers](https://google.github.io/flatbuffers/).

Access to core networking functionality can be obtained by using ``this.context.connection`` from a component. The default backend server connects users to rooms. Users in the same room will share state and receive messages from each other.

## Networking Concepts

### Rooms

At the heart of networking in Needle Engine is the concept of synchronized rooms. Each room has an ID, and users connect to a room by providing this ID. Rooms are stored on a server, and users can join and leave rooms at any time.  
When a user joins a room, they receive the current state of the room, apply that current state to their scene, and then listen for changes to the room state.  
When a user leaves a room, they stop listening for changes to the room state. 

Room state is stored as JSON data on the server, so all changes are persistent. This means that room state is not only useful for networking, but also for persisting actions of a single user.

Needle can provide _view-only IDs_ for rooms. When accessing a room with a view-only ID, the user will not be able to interact with the room, but will be able to see the current state and get live updates. This is useful for presentations or demonstrations.

### Ownership

Objects in a room can be _owned_ by a user. This means that only the owner of an object can change its state. 
By default, objects have no owner.
Components like `DragControls` will request ownership of an object before actually moving it.
In custom components, you can control how ownership is handled. 
There may be no ownership required, ownership may be allowed to be transferred to another user automatically, or ownership may be transferred only by a specific action.

When a user leaves a room, objects owned by that user will either be deleted or have ownership reset, depending on how the object was created.

### Dynamic objects: `SyncInstantiate` and `SyncDestroy`

## Enable basic Networking for your project

1. Add a `SyncedRoom` component to your scene. By default, this will use networking infrastructure provided by Needle.
2. Add a `SyncedTransform` component to a object whose movement you want to synchronize across the network.
3. Add a `DragControls` component to the same object.

The `DragControls` component, like many other Needle components, has built-in networking support. 
Ownership will be transferred to whoever starts dragging the object. 

## Networked Components



- **SyncedRoom**  
  Handles networking connection and connection to a room.  
  This can also be done by code using the networking api accessible from `this.context.connection`

## Core Components with Networking Support

| Component | Description |
| --- | --- |
| `SyncedRoom` | Handles networking connection and connection to a room. |
| `SyncedTransform` | Handles synchronizing transforms. |
| `SyncedCamera` | Spawns a prefab for any user connected to the room which will follow their position. |
| `VoIP` | Handles voice-over-IP audio connections, microphone access etc. between users. |
| `Networking` | Use to customize the server backend URL. |
| `DragControls` | Handles dragging objects. Ownership will automatically be passed to the last user dragging an object. |
| `ScreenCapture` | Handles screensharing via web APIs. |
| `Duplicatable` | Handles duplicating objects. Duplicated objects are instantiated for everyone in the room. |
| `Deletable` | Handles deleting objects. Deletions are synchronized across the network. |
| `PlayerColor` | Each user gets assigned a random color upon joining a room. This component assigns that color to the object's main material. |

## Automatic Networking for Components

Fields in your own components can be networked very easily. Changes to the field will automatically be detected and sent to all users in the room. The changes are also persisted as part of the Room State, so users that join the room later will receive the current state of the field as well, ensuring everyone sees the same data.

To automatically network a field in a component, decorate it with the ``@syncField()`` decorator:

:::details Example Code

<!-- SAMPLE network color change
*Automatically network a color field. The following script also changes the color randomly on click*
-->

*Simple networking of a number*
```ts twoslash
import { Behaviour, syncField, IPointerClickHandler } from "@needle-tools/engine"

export class AutoFieldSync extends Behaviour implements IPointerClickHandler {

    // Use `@syncField` to automatically network a field. 
    // You can optionally assign a method or method name to be called when the value changes
    @syncField("myValueChanged")
    mySyncedValue?: number = 1;
    
    private myValueChanged() {
       console.log("My value changed", this.mySyncedValue);
    }
    
    onPointerClick() {
       this.mySyncedValue = Math.random();
    }
}
```
:::

Note that syncField has an optional parameter to specify a method that should be called when the value changes. This method should be defined in the same class. 

::: tip Custom Project Setup
If you're using a custom project setup, you need to have ``experimentalDecorators: true`` in your ``tsconfig.json`` file for syncField decorators to work. Projects created with Needle Starters have this enabled by default.
:::

## Manual Networking

Needle Engine also provides a low-level API for sending and receiving messages. We call this "manual networking". The principles are the same, but you're in full control for sending and receiving messages and how to handle them.

When sending network messages, the low-level API allows you to decide whether that message should be persistet (saved in the room state) or not (only sent to users currently in the room). To persist a message, make sure it has a `guid` field and it is set to a unique value. This field is typically used to apply the message data to a specific object. 

All persistent messages are saved in the room state and will be sent to users that connect at a later point. Non-persistent messages are only sent to users currently in the room, which is useful for effects (like playing a sound effect) that don't make sense to play for users that are currently not in the room.

To delete state for a specific guid from the backend storage, set the message key to `delete-state` and target a specific object with its guid: `{ guid: "guid_to_delete" } `.

### Sending Messages

Send a message to all users in the same room: 
```ts
this.context.connection.send(key: string, data: IModel | object | boolean | string | number | null);
```

Send a flatbuffer binary array to all users in the same room:    
```ts
this.context.connect.sendBinary(byteArray: Uint8Array);
```

### Receiving Messages

You can subscribe to events in the room using a specific key.
Typically, you want to match this with unsubscribing:   

- subscribe in `onEnable` and unsubscribe in `onDisable`
  _No messages will be received while the object is disabled._
- or subscribe in `start` and unsubscribe in `onDestroy`
  _Messages will still be received while the object is disabled._

```ts
this.context.connection.beginListen(key:string, callback:(data) => void)
```   

Unsubscribe from events: 
```ts
this.context.connection.stopListen(key:string)
```

### Using debug flags to understand network messages

There are several debug flags that can be used to dive deeper into network messages. 
These can be appended the the page URL, like `https://localhost:3000/?debugnet`.

| Flag | Description |
|------|-------------|
| `?debugnet` | Log all incoming and outgoing network messages to the console |
| `?debugowner` | Log all ownership requests and changes to the console |
| `?debugnetbin` | Log additional information for incoming and outgoing binary messages |

### Binary Messages in the Flatbuffer format

JSON messages are easy to use and understand, but are typically larger in memory and bandwidth. For large amounts of data, or when sending fast updates, binary messages are faster and more efficient. You can use Flatbuffers messages in Needle Engine for cases where that is required. Using Flatbuffers requires additional setup steps like defining and compiling a message schema, and is harder to debug since you're dealing with binary messages.

Note that when sending and receiving flatbuffer messages, there is no `key` field – the message type is part of the Flatbuffer schema. What you send and receive over the Websocket connection is a single binary buffer.  

Subscribe to binary messages in Flatbuffer format: 
```ts
this.context.connection.beginListenBinary(identifier:string, callback:(data : ByteBuffer) => void);
```

Unsubscribe from binary messages:
```ts
this.context.connection.stopListenBinary(identifier:string);
```

#### Flatbuffers Sample Code

Register a new Flatbuffer schema with the networking system:  
```ts
import { registerBinaryType } from '@needle-tools/engine';
import { MyDataModel } from 'my-data-model.js';
const MySchemaIdentifier = "MYSC";
registerBinaryType(MySchemaIdentifier, MyDataModel.getRootAsSyncedTransformModel);
```

Prepare data for sending by creating a Flatbuffer message:
```ts
import { MyDataModel } from 'my-data-model.js';
const MySchemaIdentifier = "MYSC";
const builder = new flatbuffers.Builder();

// Construct a Flatbuffer message
export function createMyCustomModel(somePayload: string): Uint8Array {
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
    const data = createMyCustomModel("your-payload", this, true);
    this.context.connection.sendBinary(data);
}
```

Subscribe to receive this specific message type:
```ts
import { MyDataModel } from 'my-data-model.js';
const MySchemaIdentifier = "MYSC";

this.context.connection.beginListenBinary(MySchemaIdentifier, (data) => {
    const model = MyDataModel.getRootAsMyDataModel(data);
    console.log("Received binary message", model, model.somePayload());
});
```

#### Further reading: Generating and using Flatbuffer schemas

- [Using the schema compiler](https://google.github.io/flatbuffers/flatbuffers_guide_using_schema_compiler.html)
- [Generating a schema](https://google.github.io/flatbuffers/flatbuffers_guide_writing_schema.html)
- [Flatbuffers in Typescript](https://google.github.io/flatbuffers/flatbuffers_guide_use_typescript.html)

## Built-In Network Lifecycle Events

The following events are available to listen to in your components. They describe common network events that you might want to react to in your components, like yourself or another user joining or leaving a room. 

| **Room Events** ||  
| - | - |
| `this.context.beginListen(RoomEvents.JoinedRoom, () => { })` | Listen to the event when *you* have joined a networked room |
| `this.context.beginListen(RoomEvents.LeftRoom, () => { })` | Listen to the event when *you* have left a networked room |
| `this.context.beginListen(RoomEvents.UserJoinedRoom, () => { })` | Listen to the event when *another user* has joined your networked room |
| `this.context.beginListen(RoomEvents.UserLeftRoom, () => { })` | Listen to the event when *another user* has left your networked room |

- [See all Room Events in the API docs](https://engine.needle.tools/docs/api/latest/RoomEvents)
- [See all Ownership Events in the API docs](https://engine.needle.tools/docs/api/latest/OwnershipEvent)
- [See all Connection Events in the API docs](https://engine.needle.tools/docs/api/latest/ConnectionEvents)

## Networking on Glitch

When deploying your app to Glitch, we include a simple networking backend that is great for prototyping and small deployments (~15-20 people at the same time). You can later update to a bigger/better/stronger networking solution if required. 

::: tip Max. 15-20 people on a default Glitch project
:::

::: tip For quick experiments: Remix on Glitch
You can remix a simple networking server running on Glitch from this page: [needle-networking.glitch.me](https://needle-networking.glitch.me/) by clicking the button in the bottom right corner.

The default Glitch server instance is small and can only handle a limited amount of users. If you expect more than 15-20 people to be in your scene at the same time, you should consider hosting your networking server elsewhere (like on Google Cloud or AWS).
:::

## Hosting your own Networking Server

By default, networked Needle scenes connect to cloud infrastructure managed and provided by Needle. This is great for prototyping and small deployments, but you might want to host your own networking server for larger deployments or to have more control over the networking infrastructure and implementation.

Our networking server is available on NPM [own networking package](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking) as node.js package. The package contains pre-configured integrations for popular web frameworks:
- [Fastify](https://www.npmjs.com/package/fastify)
- [Express](https://www.npmjs.com/package/express)

and can be integrated into other Node.js server frameworks as well.

### Integrate with Fastify
```js
import networking from "@needle-tools/needle-networking";
networking.startServerFastify(fastifyApp, { endpoint: "/socket" });
```

### Integrate with Express
```js
import networking from "@needle-tools/needle-networking";
networking.startServerExpress(expressApp, { endpoint: "/socket" });
```

::: tip Example on Glitch.com
See the code on [glitch.com/edit/#!/needle-networking](https://glitch.com/edit/#!/needle-networking?path=server.js) for an example of how to integrate Needle Networking with an Express server.
:::

### Integrate with other server frameworks
```js
import { init, onConnection } from "@needle-tools/networking";

// Add your framework-specific websocket implementation here. 
// You can view the fastify and express implementations in server.js for reference.
class WebsocketConnector {
    constructor(frameworkWebsocket) {
        // Your implementation.
    }
    on(event, callback) {
        // Your implementation. When receiving a message in the websocket connection, call the callback.
        // 'event' can be 'message' or 'close'.
    }
    send(key, value) {
        // Your implementation. Pass the message along to the websocket connection.
    }
}
const options = { endpoint: "/socket" };
init(options);
yourFramework.createWebsocketRoute(options.endpoint, frameworkWebsocket => {
    onConnection(new WebsocketConnector(frameworkWebsocket));
});
```

### Configuration

The following options are available:

| Option | Description |
| -- | -- |
| `options.endpoint` *string* | Optional. Relative server endpoint. For example, `/socket` will start the websocket endpoint on `yourserver/socket`. Defaults to `/`. |
| `options.maxUsers` *number* | Maximum number of concurrent users on a server. Defaults to `50`. |
| `options.defaultUserTimeout` *number* | Time in seconds after which a user is considered disconnected. Defaults to `30`. |
| `process.env.VIEW_ONLY_SALT` *string* | Salt value used for generating view-only room IDs from regular room IDs. Defaults to a predefined salt value. |
| `process.env.NEEDLE_NETWORKING_S3_*` *string* | Enable S3 storage. See below for the full list of environment variables you need to set for this. When not set, the default storage is used (JSON files on disk). |

The networking server will automatically manage connecting and disconnecting users, receiving and sending messages, and persisting room state.

Custom networking servers can be deployed anywhere, for example on Google Cloud. For further instructions please refer to this repository: [Local Needle Networking Server](https://fwd.needle.tools/needle-engine/local-networking-repository)

::: tip Different server locations for local and hosted development
If you're working on custom networking code, you may want to use different server locations for local development and the hosted app. You can set individual server URLs in the `Networking` component: 

![Needle Engine Networking component with networking server hosted elswhere](/imgs/networking_absolute.webp)
::: 

#### State Storage

Network state is by default stored to disk on the server as JSON files in the `/.data` directory.  
Each room has its own file, and the state is sent to connecting clients when they join a room.

Optionally, the networking state can be stored with an S3 compatible storage provider. Use the following environment variables to enable S3 storage:  

```bash
NEEDLE_NETWORKING_S3_ENDPOINT=
NEEDLE_NETWORKING_S3_REGION=
NEEDLE_NETWORKING_S3_BUCKET=
NEEDLE_NETWORKING_S3_ACCESS_KEY_ID=
NEEDLE_NETWORKING_S3_ACCESS_KEY=
NEEDLE_NETWORKING_S3_PREFIX= # all state saved in the bucket will be prefixed with this string. This can be a path e.g. `my_state/` or a unique id `server_123_`
```

## Local Networking for Custom Server Development

For testing and development purposes, you can run the Needle Engine networking package on a local server. We have prepared a repository that is set up to host the websocket package and to make that easy for you. Please follow the instructions in this repository: 
- [Local Networking Repository](https://fwd.needle.tools/needle-engine/local-networking-repository)

## Customizing WebRTC settings for peer.js

Needle Engine `Screencapture` (Screensharing) and `VoIP` (Voice communication) components use [peer.js](https://peerjs.com/) for networking audio and video. Peer.js uses WebRTC under the hood.

Needle Engine uses reasonable defaults for peerjs. If you want to modify those defaults, you can call 
```ts
setPeerOptions(opts: PeerjsOptions);
```
with your custom settings. This can be used to modify the hosting provider for ICE/STUN/TURN servers, for example when you use your own WebRTC servers.
