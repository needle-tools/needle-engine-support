# Networking

Needle Engine includes a full networking solution for multiplayer experiences.  
A shared world state, voice chat, session persistence, and more can be achieved with our networking components and APIs. You can network your own components with a choice of automatic or manual networking.  

Networking in Needle Engine is  based on [Websockets](https://github.com/jjxxs/websocket-ts). Automatic networking uses JSON data for ease of use. For complex usecases and high-performance requirements, we use [Flatbuffers](https://google.github.io/flatbuffers/).

Access to core networking functionality can be obtained by using ``this.context.connection`` from a component. The default backend server connects users to rooms. Users in the same room will share state and receive messages from each other.

## Networking Concepts

### Rooms and State

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

### Dynamic objects: `syncInstantiate()` and `syncDestroy()`

> 🏗️ Under Construction

## Enable Networking for your project

1. Add a `SyncedRoom` component to your scene. By default, this will use networking infrastructure provided by Needle.
2. Add a `SyncedTransform` component to a object whose movement you want to synchronize across the network.
3. Add a `DragControls` component to the same object.
4. Run the project. In the browser, click on "Join Room" and copy the URL.
5. Open a new browser window and paste the URL. You should now see the same object in both windows. Try dragging the object in one window and see it move in the other window.

The `DragControls` component, like many other Needle components, has built-in networking support. 
Ownership will be transferred to whoever starts dragging the object. 

## Built-In Components with Networking Support

| Component | Description |
| --- | --- |
| `SyncedRoom` | Handles networking connection and connection to a room. |
| `SyncedTransform` | Handles synchronizing transforms. |
| `SyncedCamera` | Spawns a prefab for any user connected to the room which will follow their position. |
| `VoIP` | Handles voice-over-IP audio connections, microphone access etc. between users. |
| `ScreenCapture` | Handles screensharing via web APIs. |
| `Networking` | Use to customize the server backend URL. Also allows setting a local server for development. |
| `DragControls` | Handles dragging objects. Ownership will automatically be passed to the last user dragging an object. |
| `Duplicatable` | Handles duplicating objects. Duplicated objects are instantiated for everyone in the room. |
| `Deletable` | Handles deleting objects. Deletions are synchronized across the network. |
| `DeleteBox` | Handles deleting objects that have a "Deletable" component when they are dragged into a box volume. |
| `PlayerSync` | Helper component for synchronizing player-specific data. |
| `PlayerColor` | Each user gets assigned a random color upon joining a room. This component assigns that color to the object's main material. |
| `WebXR` | Handles synchronizing user avatars (hands and heads). |

## Automatic Networking for Components

Fields in your own components can be networked very easily. Changes to the field will automatically be detected and sent to all users in the room. The changes are also persisted as part of the Room State, so users that join the room later will receive the current state of the field as well, ensuring everyone sees the same data.

To automatically network a field in a component, decorate it with the ``@syncField()`` decorator:

::::code-group
:::code-group-item Sync a number
```ts twoslash
import { Behaviour, syncField, IPointerClickHandler } from "@needle-tools/engine"

export class SyncedNumber extends Behaviour implements IPointerClickHandler {

    // Use `@syncField` to automatically network a field. 
    // You can optionally assign a method or method name to be called when the value changes.
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
:::code-group-item Sync an object's color
<!-- SAMPLE network color change -->
:::
::::

Note that syncField has an optional parameter to specify a method that should be called when the value changes. This method should be defined in the same class. 

::: tip Custom Project Setup
If you're using a custom project setup, you need to have ``experimentalDecorators: true`` in your ``tsconfig.json`` file for syncField decorators to work. Projects created with Needle Starters have this enabled by default.
:::

## Manual Networking

Needle Engine also provides a low-level API for sending and receiving messages. We call this "manual networking". The principles are the same, but you're in full control for sending and receiving messages and how to handle them.

### Sending Messages

Send a message to all users in the same room: 
```ts
this.context.connection.send(key: string, data: IModel | object | boolean | string | number | null);
```

### Receiving Messages

You can subscribe to events in the room using a specific key.
Typically, you want to match this with unsubscribing:   

- subscribe in `onEnable` and unsubscribe in `onDisable`  
  With this approach, no messages will be received while the object is disabled.

- or subscribe in `start` and unsubscribe in `onDestroy`  
  With this approach, messages will still be received while the object is disabled.

```ts
this.context.connection.beginListen(key:string, callback:(data) => void)
```   

Unsubscribe from events: 
```ts
this.context.connection.stopListen(key:string)
```

### Controlling message persistence

When sending network messages, the low-level API allows you to decide whether that message should be persistet (saved in the room state) or not (only sent to users currently in the room). To persist a message, make sure it has a `guid` field. This field is typically used to apply the message data to a specific object, by providing that object's guid. If you want target a specific object (and thus,  include a `guid` field) but want the data to not be persisted, set the `dontSave` field to `true` in your message.

All persistent messages are saved in the room state and will be sent to users that connect at a later point. Non-persistent messages are only sent to users currently in the room, which is useful for effects (like playing a sound effect) that don't make sense to play for users that are currently not in the room. Optionally, you can include a `deleteOnDisconnect` field in your message to delete this particular message when the user disconnects.

```ts
// This message will be sent to all users currently in the room,
// AND to users that join the room later.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue" });

// This message will be sent to all users currently in the room,
// but NOT be sent to users that join the room later.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", dontSave: true });

// This message will be sent to all users currently in the room,
// but NOT be sent to users that join the room later.
this.context.connection.send("my-message", { myData: "myValue" });

// This message will be sent to all users currently in the room,
// AND to users that join the room later,
// but will be deleted from the room state when the user disconnects.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", deleteOnDisconnect: true });
```

To delete state for a specific guid from the backend storage, set the message key to `delete-state` and target a specific object with its guid: `{ guid: "guid_to_delete" } `.

```ts
this.context.connection.send("delete-state", { guid: "guid_to_delete" });
```

### Using debug flags to understand network messages

There are several debug flags that can be used to dive deeper into network messages. 
These can be appended the the page URL, like `https://localhost:3000/?debugnet`.

| Flag | Description |
|------|-------------|
| `?debugnet` | Log all incoming and outgoing network messages to the console |
| `?debugowner` | Log all ownership requests and changes to the console |
| `?debugnetbin` | Log additional information for incoming and outgoing binary messages |


## Networking Lifecycle Events

The following events are available to listen to in your components. They describe common network events that you might want to react to in your components, like yourself or another user joining or leaving a room. 

```ts
// Listen to the event when *you* have joined a networked room
this.context.beginListen(RoomEvents.JoinedRoom, ({room, viewId, allowEditing, inRoom}) => { ... });

// Listen to the event when *you* have left a networked room
this.context.beginListen(RoomEvents.LeftRoom, ({room}) => { ... });

// Listen to the event when *another user* has joined your networked room
this.context.beginListen(RoomEvents.UserJoinedRoom, ({userId}) => { ... });

// Listen to the event when *another user* has left your networked room
this.context.beginListen(RoomEvents.UserLeftRoom, ({userId}) => { ... });

// This event is received after all current room state has been sent to the client
this.context.beginListen(RoomEvents.RoomStateSent, () => { ... });
```

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

Our networking server is available on NPM [own networking package](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking) as node.js package. The package contains pre-configured integrations for the popular web frameworks [Fastify](https://www.npmjs.com/package/fastify) and [Express](https://www.npmjs.com/package/express), and can be integrated into other Node.js server frameworks as well.

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
:::code-group-item Custom Integration
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
:::
::::

::: tip Example on Glitch.com
See the code on [glitch.com/edit/#!/needle-networking](https://glitch.com/edit/#!/needle-networking?path=server.js) for an example of how to integrate Needle Networking with an Express server.
:::

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

## Local Networking Server

For testing and development purposes, you can run the Needle Engine networking package on a local server. We have prepared a repository that is set up to host the websocket package and to make that easy for you. 

1. Download the local server sample from [github.com/needle-tools/networking-local](https://fwd.needle.tools/needle-engine/local-networking-repository)  
2. Follow the instructions in the README to set up the server. The server will run on `wss://localhost:9001/socket` by default.
3. Add the `Networking` component to your scene.
4. Paste the local server address into the `Localhost` field on the `Networking` component.

## Advanced: Customizing WebRTC settings for peer.js

Needle Engine `Screencapture` (Screensharing) and `VoIP` (Voice communication) components use [peer.js](https://peerjs.com/) for networking audio and video. Peer.js uses WebRTC under the hood.

Needle Engine uses reasonable defaults for peerjs. If you want to modify those defaults, you can call 
```ts
setPeerOptions(opts: PeerjsOptions);
```
with your custom settings. This can be used to modify the hosting provider for ICE/STUN/TURN servers, for example when you use your own WebRTC servers.

## Advanced: Server and Client Message Formats

::: warning For informational purposes. Use the APIs provided by Needle Engine instead.
Typically, you do not need to interact with these message formats directly, as the low-level networking API already handles parsing messages and giving you the correct types. The information here is provided for advanced users who want to understand the underlying message formats or implement their own networking solutions.
:::

Messages are sent in JSON format. They always have a `key` field that describes the type of message, and a `data` field that contains the message payload. The `data` field can be any JSON-serializable object.

### Built-in Room Events

::::code-group
:::code-group-item Join
```json
// Sent to the server to attempt joining a room.
{
    "key": "join-room",
    "data": {
        "room": string,
        "viewOnly": boolean,
    }
}
```
:::
:::code-group-item Leave
```json
// Sent to the server to leave a room.
{
    "key": "leave-room",
    "data": {
        "room": string
    }
}
```
:::
:::code-group-item JoinedRoom
```json
// Sent to the client when the local user has joined a room.
// Type: JoinedRoomResponse
{
    "key": "joined-room",
    "data": {
        "room": string,
        "viewId": string,
        "allowEditing": boolean,
        "inRoom": string[] // connection IDs
    }
}
```
:::
:::code-group-item LeftRoom
```json
// Sent to the client when the local user has left a room.
// Type: LeftRoomResponse
{
    "key": "left-room",
    "data": {
        "room": string
    }
}
```
:::
:::code-group-item UserJoinedRoom
```json
// Sent to the client when any user has joined a room.
// Type: UserJoinedOrLeftRoomModel
{
    "key": "user-joined-room",
    "data": {
        "userId": string // connection ID
    }
}
```
:::
:::code-group-item UserLeftRoom
```json
// Sent to the client when any user has left a room.
// Type: UserJoinedOrLeftRoomModel
{
    "key": "user-left-room",
    "data": {
        "userId": string // connection ID
    }
}
````
:::
:::code-group-item RoomStateSent
```json
// Sent to the client after the complete room state has been sent.
{
    "key": "room-state-sent",
    "data": {}
}
```
:::
::::

### Built-In Utility Events

::::code-group
:::code-group-item ConnectionInfo
```json
// Sent to the client when the connection is established.
{
    "key": "connection-start-info",
    "data": {
        "id": string // connection ID
    }
}
```
:::
:::code-group-item syncInstantiate
```json
// Used by the syncInstantiate() API to create a new instance of an asset.
// Type: NewInstanceModel
{
    "key": "new-instance-created",
    "data": {
        "guid": string,
        "originalGuid": string,
        "seed": number | undefined,
        "visible": boolean | undefined,
        "dontSave": boolean | undefined,

        "parent": string | undefined,
        "position": { x: number, y: number, z: number } | undefined,
        "rotation": { x: number, y: number, z: number, w: number } | undefined,
        "scale": { x: number, y: number, z: number } | undefined,

        "deleteStateOnDisconnect": boolean | undefined
    }
```
:::
:::code-group-item syncDestroy
```json
// Used by the syncDestroy() API to destroy an instance of an asset.
// Type: DestroyInstanceModel
{
    "key": "instance-destroyed",
    "data": {
        "guid": string,
        "dontSave": boolean | undefined
    }
}
```
:::
:::code-group-item DeleteState
```json
// Sent to the server to delete state for a specific guid.
{
    "key": "delete-state",
    "data": {
        "guid": <string>
    }
}
```
:::
:::code-group-item DeleteAllState
```json
// Sent to the server to delete ALL current room state.
{
    "key": "delete-all-state",
    "data": {}
}
```
::::

### Built-In Ownership Events

::::code-group
:::code-group-item OwnershipRequest
```json
{
    "key": 
      "request-has-owner" | 
      "request-ownership" | 
      "remove-ownership",
    "data": {
        "guid": string
    }
}
```
:::
:::code-group-item OwnershipResponse
// Type: OwnershipResponse
```json
{
    "key": 
      "response-has-owner",
    "data": {
        "guid": string,
        "value": boolean
    }
}
```
:::
::: code-group-item OwnershipBroadcastResponse
```json
{
    "key": 
      "gained-ownership" | 
      "lost-ownership" | 
      "gained-ownership-broadcast" | 
      "lost-ownership-broadcast",
    "data": {
        "guid": string,
        "owner": string
    }
}
```
:::
::::

### Built-In Flatbuffer Schemas

Flatbuffer messages are sent directly as binary messages.

::::code-group
:::code-group-item SyncedTransform ('STRS')
```cs
<!-- SAMPLE node_modules/@needle-tools/engine/src/engine-schemes/transforms.fbs -->
```
:::
:::code-group-item SyncedCamera ('SCAM')
```cs
<!-- SAMPLE node_modules/@needle-tools/engine/src/engine-schemes/syncedCamera.fbs -->
```
:::
:::code-group-item Vec2|3|4
```cs
<!-- SAMPLE node_modules/@needle-tools/engine/src/engine-schemes/vec.fbs -->
```
:::
::::

## Advanced: Binary Messages in the Flatbuffer format

JSON messages are easy to use and understand, but are typically larger in memory and bandwidth. For large amounts of data, or when sending fast updates, binary messages are faster and more efficient. You can use Flatbuffers messages in Needle Engine for cases where that is required. Using Flatbuffers requires additional setup steps like defining and compiling a message schema, and is harder to debug since you're dealing with binary messages.

Note that when sending and receiving flatbuffer messages, there is no `key` field – the message type is part of the Flatbuffer schema. What you send and receive over the Websocket connection is a single binary buffer.  

Send a binary message to all users in the same room:
```ts
this.context.connection.sendBinary(byteArray: Uint8Array);
```

Subscribe to binary messages in Flatbuffer format: 
```ts
this.context.connection.beginListenBinary(identifier:string, callback:(data : ByteBuffer) => void);
```

Unsubscribe from binary messages:
```ts
this.context.connection.stopListenBinary(identifier:string);
```

#### Flatbuffers Sample Code

Before you can send and receive Flatbuffer messages, you need to define a schema and compile it to TypeScript. Then, register the schema with the networking system and use the generated schema methods to create and parse messages.

- [Built-in Flatbuffer schemas in Needle Engine](#built-in-flatbuffer-schemas)
- [Generating a schema](https://google.github.io/flatbuffers/flatbuffers_guide_writing_schema.html)
- [Using the schema compiler](https://google.github.io/flatbuffers/flatbuffers_guide_using_schema_compiler.html)
- [Flatbuffers in Typescript](https://google.github.io/flatbuffers/flatbuffers_guide_use_typescript.html)


::::code-group
:::code-group-item Register a schema
```ts
// Register a new Flatbuffer schema with the networking system
import { registerBinaryType } from '@needle-tools/engine';
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

registerBinaryType(MySchemaIdentifier, MyDataModel.getRootAsSyncedTransformModel);
```
:::
:::code-group-item Send Messages
```ts
// Prepare data for sending by creating a Flatbuffer message:
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
    const data = createMyCustomModel("your-payload", this, true);
    this.context.connection.sendBinary(data);
}
```
:::
:::code-group-item Receive Messages
```ts
// Subscribe to receive this specific message type:
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

this.context.connection.beginListenBinary(MySchemaIdentifier, (data) => {
    const model = MyDataModel.getRootAsMyDataModel(data);
    console.log("Received binary message", model, model.somePayload());
});
```
:::
::::

::: tip Custom Flatbuffer messages and persistence
Currently, custom binary messages can't be persisted on the networking server. Modify the networking server and add your custom flatbuffer schemas to ensure the guid property can be processed.
:::

## Summary

Needle Engine makes the complex topic of networking approachable and easy to use. You can get started with automatic networking for your components with just a few lines of code, and you can dive deeper into manual networking when you need more control.