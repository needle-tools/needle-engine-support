# 网络

Needle Engine 包含一个用于多人体验的完整网络解决方案。
使用我们的网络组件和 API 可以实现共享世界状态、语音聊天、会话持久化等功能。您可以通过选择自动或手动联网来对自己的组件进行联网。

Needle Engine 中的网络基于 [Websockets](https://github.com/jjxxs/websocket-ts)。自动联网使用 JSON 数据，易于使用。对于复杂的用例和高性能要求，我们使用 [Flatbuffers](https://google.github.io/flatbuffers/)。

通过在组件中使用 ``this.context.connection`` 可以访问核心网络功能。默认的后端服务器将用户连接到房间。同一房间中的用户将共享状态并接收彼此的消息。

## 网络概念

### 房间和状态

Needle Engine 网络的核心是同步房间的概念。每个房间都有一个 ID，用户通过提供此 ID 连接到房间。房间存储在服务器上，用户可以随时加入和离开房间。
当用户加入房间时，他们会接收房间的当前状态，将该当前状态应用到他们的场景，然后监听房间状态的变化。
当用户离开房间时，他们停止监听房间状态的变化。

房间状态以 JSON 数据形式存储在服务器上，因此所有更改都是持久化的。这意味着房间状态不仅对联网有用，也对持久化单个用户的操作有用。

Needle 可以为房间提供*只读 ID*。使用只读 ID 访问房间时，用户将无法与房间互动，但能够查看当前状态并获取实时更新。这对于演示或展示非常有用。

### 所有权

房间中的对象可以由用户*拥有*。这意味着只有对象的拥有者才能更改其状态。
默认情况下，对象没有拥有者。
像 `DragControls` 这样的组件在实际移动对象之前会请求对象的所有权。
在自定义组件中，您可以控制如何处理所有权。
可能不需要所有权，所有权可以自动转移给另一个用户，或者所有权只能通过特定操作转移。

当用户离开房间时，由该用户拥有的对象将根据其创建方式被删除或重置所有权。

## 为项目启用网络

1.  向场景添加 `SyncedRoom` 组件。默认情况下，这将使用由 Needle 提供的网络基础设施。
2.  向您想要在网络中同步其移动的对象添加 `SyncedTransform` 组件。
3.  向同一个对象添加 `DragControls` 组件。
4.  运行项目。在浏览器中，点击“Join Room”并复制 URL。
5.  打开一个新的浏览器窗口并粘贴 URL。您现在应该在两个窗口中看到同一个对象。尝试在一个窗口中拖动对象，观察它在另一个窗口中移动。

`DragControls` 组件与其他许多 Needle 组件一样，具有内置的网络支持。
所有权将转移给开始拖动对象的人。

## 具有网络支持的内置组件

| 组件             | 描述                                                                                                                                                                |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `SyncedRoom`     | 处理网络连接和房间连接。                                                                                                                                            |
| `SyncedTransform`| 处理变换的同步。                                                                                                                                                    |
| `SyncedCamera`   | 为连接到房间的任何用户实例化一个预制件，该预制件将跟随其位置。                                                                                                        |
| `VoIP`           | 处理用户之间的语音通话音频连接、麦克风访问等。                                                                                                                        |
| `ScreenCapture`  | 通过 web API 处理屏幕共享。                                                                                                                                         |
| `Networking`     | 用于自定义服务器后端 URL。也允许设置本地服务器进行开发。                                                                                                              |
| `DragControls`   | 处理对象的拖动。所有权将自动传递给最后拖动对象的用户。                                                                                                                |
| `Duplicatable`   | 处理对象的复制。复制的对象会在房间中的每个人那里实例化。                                                                                                              |
| `Deletable`      | 处理对象的删除。删除操作会在网络中同步。                                                                                                                            |
| `DeleteBox`      | 处理将具有“Deletable”组件的对象拖入箱体体积时删除对象。                                                                                                               |
| `PlayerSync`     | 强大的组件，为每个连接的玩家实例化一个特定对象。                                                                                                                      |
| `PlayerState`    | 将此组件添加到分配给 `PlayerSync` 的对象。                                                                                                                           |
| `PlayerColor`    | 简单的组件，用于玩家特定的颜色。每个用户加入房间时会分配一个随机颜色。此组件将该颜色分配给对象的主要材质。                                                              |
| `WebXR`          | 处理同步用户头像（手部和头部）。                                                                                                                                     |

## 自定义组件的自动联网

您自己组件中的字段可以非常容易地进行联网。字段的更改将自动被检测到并发送到房间中的所有用户。更改也会作为房间状态的一部分持久化，因此稍后加入房间的用户也将接收到字段的当前状态，确保每个人看到相同的数据。

要自动联网组件中的字段，请使用 ``@syncField()`` 装饰器对其进行装饰：

::::code-group
:::code-group-item 同步一个数字
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
:::code-group-item 同步对象的颜色
<!-- SAMPLE network color change -->
:::
::::

请注意，syncField 有一个可选参数，用于指定当值更改时应调用的方法。此方法应在同一类中定义。

::: tip 自定义项目设置
如果您正在使用自定义项目设置，您的 ``tsconfig.json`` 文件中需要包含 ``experimentalDecorators: true``，以便 syncField 装饰器正常工作。使用 Needle Starters 创建的项目默认启用此设置。
:::

## 创建和销毁对象

通常，您希望在运行时创建和销毁对象，当然这些更改也应该在网络中同步。

`PlayerSync` 组件通过为每个连接的玩家自动实例化一个特定对象来简化此过程。
当玩家离开房间时，该对象会为所有用户销毁。

此外，Needle Engine 提供了两个高层级方法：
- [`syncInstantiate()`](https://engine.needle.tools/docs/api/latest/syncInstantiate) 用于在网络中复制对象。
- [`syncDestroy()`](https://engine.needle.tools/docs/api/latest/syncDestroy) 用于在网络中销毁对象。

> 🏗️ 示例代码正在建设中

## 手动联网

Needle Engine 还提供了一个用于发送和接收消息的低级 API。我们称之为“手动联网”。其原理是相同的，但您可以完全控制消息的发送和接收以及如何处理它们。

### 发送消息

将消息发送到同一房间中的所有用户：
```ts
this.context.connection.send(key: string, data: IModel | object | boolean | string | number | null);
```

### 接收消息

您可以使用特定的 key 订阅房间中的事件。
通常，您会希望与取消订阅配对：

- 在 `onEnable` 中订阅，在 `onDisable` 中取消订阅
  通过这种方法，当对象被禁用时，将不会接收到消息。

- 或者在 `start` 中订阅，在 `onDestroy` 中取消订阅
  通过这种方法，即使对象被禁用，消息仍会接收到。

```ts
this.context.connection.beginListen(key:string, callback:(data) => void)
```

取消订阅事件：
```ts
this.context.connection.stopListen(key:string)
```

### 控制消息持久性

发送网络消息时，低级 API 允许您决定该消息是否应该持久化（保存在房间状态中）或不持久化（仅发送给当前在房间中的用户）。要持久化消息，请确保它有一个 `guid` 字段。此字段通常用于将消息数据应用到特定对象，通过提供该对象的 guid。如果您想定位特定对象（因此包含 `guid` 字段）但希望数据不持久化，请在您的消息中将 `dontSave` 字段设置为 `true`。

所有持久化消息都保存在房间状态中，并将发送给稍后连接的用户。非持久化消息仅发送给当前在房间中的用户，这对于不适合为当前不在房间中的用户播放的效果（例如播放音效）非常有用。您可以选择在消息中包含一个 `deleteOnDisconnect` 字段，以便在用户断开连接时删除此特定消息。

```ts
// 这条消息将发送给当前在房间中的所有用户，
// 以及稍后加入房间的用户。
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue" });

// 这条消息将发送给当前在房间中的所有用户，
// 但不会发送给稍后加入房间的用户。
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", dontSave: true });

// 这条消息将发送给当前在房间中的所有用户，
// 但不会发送给稍后加入房间的用户。
this.context.connection.send("my-message", { myData: "myValue" });

// 这条消息将发送给当前在房间中的所有用户，
// 以及稍后加入房间的用户，
// 但将在用户断开连接时从房间状态中删除。
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", deleteOnDisconnect: true });
```

要从后端存储中删除特定 guid 的状态，请将消息 key 设置为 `delete-state` 并使用其 guid 定位特定对象：`{ guid: "guid_to_delete" }`。

```ts
this.context.connection.send("delete-state", { guid: "guid_to_delete" });
```

### 使用调试标志理解网络消息

有几个调试标志可用于深入了解网络消息。
可以将它们附加到页面 URL，例如 `https://localhost:3000/?debugnet`。

| Flag          | Description                                      |
|---------------|--------------------------------------------------|
| `?debugnet`   | 将所有传入和传出网络消息记录到控制台       |
| `?debugowner` | 将所有所有权请求和更改记录到控制台         |
| `?debugnetbin`| 记录传入和传出二进制消息的附加信息     |

## 网络生命周期事件

以下事件可在您的组件中监听。它们描述了您可能希望在组件中做出反应的常见网络事件，例如您自己或另一个用户加入或离开房间。

```ts
// 监听 *您* 加入联网房间的事件
this.context.beginListen(RoomEvents.JoinedRoom, ({room, viewId, allowEditing, inRoom}) => { ... });

// 监听 *您* 离开联网房间的事件
this.context.beginListen(RoomEvents.LeftRoom, ({room}) => { ... });

// 监听 *另一个用户* 加入您联网房间的事件
this.context.beginListen(RoomEvents.UserJoinedRoom, ({userId}) => { ... });

// 监听 *另一个用户* 离开您联网房间的事件
this.context.beginListen(RoomEvents.UserLeftRoom, ({userId}) => { ... });

// 在所有当前房间状态已发送到客户端后接收此事件
this.context.beginListen(RoomEvents.RoomStateSent, () => { ... });
```

- [在 API 文档中查看所有 Room Events](https://engine.needle.tools/docs/api/latest/RoomEvents)
- [在 API 文档中查看所有 Ownership Events](https://engine.needle.tools/docs/api/latest/OwnershipEvent)
- [在 API 文档中查看所有 Connection Events](https://engine.needle.tools/docs/api/latest/ConnectionEvents)

## 使用 Needle Networking 服务器

默认情况下，联网的 Needle 场景连接到由 Needle 管理和提供的云基础设施。无需额外设置，目前使用此服务也无需额外费用。

通常，这对于同一房间中的大约 15-20 个用户来说工作正常。一旦您的项目成熟，您可以通过托管自己的网络服务器来升级到更大/更好/更强的网络解决方案。

## 托管自己的网络服务器

对于大规模部署或为了更好地控制网络基础设施和实现，您可能希望托管自己的网络服务器。

我们的网络服务器作为 node.js 包在 NPM [自有网络包](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking)上提供。该包包含对流行的 Web 框架 [Fastify](https://www.npmjs.com/package/fastify) 和 [Express](https://www.npmjs.com/package/express) 的预配置集成，也可以集成到其他 Node.js 服务器框架中。

::: tip 快速实验：在 Glitch 上 Remix
您可以通过点击右下角的按钮，从此页面 [needle-networking.glitch.me](https://needle-networking.glitch.me/) Remix 一个运行在 Glitch 上的简单网络服务器。

默认的 Glitch 服务器实例很小，只能处理有限数量的用户。如果您预计您的场景中同时会有超过 15-20 人，您应该考虑在其他地方托管您的网络服务器（例如 Google Cloud 或 AWS）。
:::

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
:::code-group-item 自定义集成
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

::: tip Glitch.com 上的示例
请参阅 [glitch.com/edit/#!/needle-networking](https://glitch.com/edit/#!/needle-networking?path=server.js) 上的代码，了解如何将 Needle Networking 与 Express 服务器集成。
:::

### 配置

以下选项可用：

| 选项                                   | 描述                                                                                                                               |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `options.endpoint` *string*            | 可选。相对服务器 endpoint。例如，`/socket` 将在 `yourserver/socket` 启动 websocket endpoint。默认为 `/`。                              |
| `options.maxUsers` *number*            | 服务器上的最大并发用户数。默认为 `50`。                                                                                              |
| `options.defaultUserTimeout` *number*  | 用户被认为断开连接前的超时时间（秒）。默认为 `30`。                                                                                  |
| `process.env.VIEW_ONLY_SALT` *string*  | 用于从常规房间 ID 生成只读房间 ID 的盐值。默认为预定义的盐值。                                                                         |
| `process.env.NEEDLE_NETWORKING_S3_*` *string* | 启用 S3 存储。请参阅下文，了解启用此功能所需的完整环境变量列表。未设置时，使用默认存储（磁盘上的 JSON 文件）。                    |

网络服务器将自动管理用户的连接和断开连接、消息的接收和发送以及房间状态的持久化。

自定义网络服务器可以部署在任何地方，例如 Google Cloud 上。有关进一步说明，请参阅此仓库：[本地 Needle Networking 服务器](https://fwd.needle.tools/needle-engine/local-networking-repository)

::: tip 本地和托管开发使用不同的服务器位置
如果您正在开发自定义网络代码，您可能希望在本地开发和托管应用中使用不同的服务器位置。您可以在 `Networking` 组件中设置单独的服务器 URL：

![Needle Engine Networking component with networking server hosted elswhere](/imgs/networking_absolute.webp)
:::

#### 状态存储

网络状态默认以 JSON 文件形式存储在服务器磁盘的 `/.data` 目录中。
每个房间都有自己的文件，状态会在客户端连接加入房间时发送给他们。

或者，网络状态可以使用兼容 S3 的存储提供商存储。使用以下环境变量启用 S3 存储：

```bash
NEEDLE_NETWORKING_S3_ENDPOINT=
NEEDLE_NETWORKING_S3_REGION=
NEEDLE_NETWORKING_S3_BUCKET=
NEEDLE_NETWORKING_S3_ACCESS_KEY_ID=
NEEDLE_NETWORKING_S3_ACCESS_KEY=
NEEDLE_NETWORKING_S3_PREFIX= # 存储在 bucket 中的所有状态将以此字符串作为前缀。这可以是一个路径，例如 `my_state/`，或一个唯一的 ID，例如 `server_123_`
```

## 本地网络服务器

为了测试和开发目的，您可以在本地服务器上运行 Needle Engine 网络包。我们准备了一个仓库，已设置为托管 websocket 包，以便您轻松实现这一点。

1.  从 [github.com/needle-tools/networking-local](https://fwd.needle.tools/needle-engine/local-networking-repository) 下载本地服务器示例
2.  按照 README 中的说明设置服务器。服务器默认将在 `wss://localhost:9001/socket` 上运行。
3.  将 `Networking` 组件添加到您的场景。
4.  将本地服务器地址粘贴到 `Networking` 组件上的 `Localhost` 字段中。

## 高级：为 peer.js 定制 WebRTC 设置

Needle Engine 的 `Screencapture`（屏幕共享）和 `VoIP`（语音通信）组件使用 [peer.js](https://peerjs.com/) 进行音频和视频的网络通信。Peer.js 底层使用 WebRTC。

Needle Engine 为 peerjs 使用了合理的默认设置。如果您想修改这些默认设置，可以调用
```ts
setPeerOptions(opts: PeerjsOptions);
```
并传入您的自定义设置。这可用于修改 ICE/STUN/TURN 服务器的托管提供商，例如当您使用自己的 WebRTC 服务器时。

## 高级：服务器和客户端消息格式

::: warning 仅供参考。请使用 Needle Engine 提供的 API。
通常，您无需直接与这些消息格式交互，因为低级网络 API 已经处理了消息解析并为您提供了正确的类型。此处提供的信息适用于想要了解底层消息格式或实现自己的网络解决方案的高级用户。
:::

消息以 JSON 格式发送。它们始终包含一个描述消息类型的 `key` 字段和一个包含消息负载的 `data` 字段。`data` 字段可以是任何可 JSON 序列化的对象。

### 内置房间事件

::::code-group
:::code-group-item Join
```json
// 发送到服务器以尝试加入房间。
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
// 发送到服务器以离开房间。
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
// 当本地用户加入房间时发送到客户端。
// 类型：JoinedRoomResponse
{
    "key": "joined-room",
    "room": string,
    "viewId": string,
    "allowEditing": boolean,
    "inRoom": string[] // 连接 ID
}
```
:::
:::code-group-item LeftRoom
```json
// 当本地用户离开房间时发送到客户端。
// 类型：LeftRoomResponse
{
    "key": "left-room",
    "room": string
}
```
:::
:::code-group-item UserJoinedRoom
```json
// 当任何用户加入房间时发送到客户端。
// 类型：UserJoinedOrLeftRoomModel
{
    "key": "user-joined-room",
    "data": {
        "userId": string // 连接 ID
    }
}
```
:::
:::code-group-item UserLeftRoom
```json
// 当任何用户离开房间时发送到客户端。
// 类型：UserJoinedOrLeftRoomModel
{
    "key": "user-left-room",
    "data": {
        "userId": string // 连接 ID
    }
}
````
:::
:::code-group-item RoomStateSent
```json
// 在完整的房间状态发送后发送到客户端。
{
    "key": "room-state-sent",
    "room": string // 房间名称 
}
```
:::
::::

### 内置实用工具事件

::::code-group
:::code-group-item ConnectionInfo
```json
// 连接建立时发送到客户端。
{
    "key": "connection-start-info",
    "data": {
        "id": string // 连接 ID
    }
}
```
:::
:::code-group-item syncInstantiate
```json
// 由 syncInstantiate() API 用于创建资产的新实例。
// 类型：NewInstanceModel
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
// 由 syncDestroy() API 用于销毁资产实例。
// 类型：DestroyInstanceModel
{
    "key": "instance-destroyed",
    "data": {
        "guid": string,
        "dontSave": boolean | undefined
    }
}
```
:::
:::code-group-item Ping
```json
// 每隔几秒发送到服务器以保持连接活跃。
{
    "key": "ping",
    "data": {}
}
```
:::
:::code-group-item Pong
```json
// 服务器响应 ping 时发送。
{
    "key": "pong",
    "data": {}
}
```
:::
:::code-group-item DeleteState
```json
// 发送到服务器以删除特定 guid 的状态。
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
// 发送到服务器以删除所有当前房间状态。
{
    "key": "delete-all-state",
    "data": {}
}
```
::::

### 内置所有权事件

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
// 类型：OwnershipResponse
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

### 内置 Flatbuffer Schema

Flatbuffer 消息直接以二进制消息形式发送。

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

## 高级：Flatbuffer 格式的二进制消息

JSON 消息易于使用和理解，但通常在内存和带宽方面更大。对于大量数据或需要快速更新时，二进制消息更快、更高效。您可以在 Needle Engine 中使用 Flatbuffers 消息来满足此需求。使用 Flatbuffers 需要额外的设置步骤，例如定义和编译消息 schema，并且由于您处理的是二进制消息，因此更难调试。

请注意，发送和接收 Flatbuffer 消息时没有 `key` 字段——消息类型是 Flatbuffer schema 的一部分。您通过 Websocket 连接发送和接收的是单个二进制 buffer。

向同一房间中的所有用户发送二进制消息：
```ts
this.context.connection.sendBinary(byteArray: Uint8Array);
```

以 Flatbuffer 格式订阅二进制消息：
```ts
this.context.connection.beginListenBinary(identifier:string, callback:(data : ByteBuffer) => void);
```

取消订阅二进制消息：
```ts
this.context.connection.stopListenBinary(identifier:string);
```

#### Flatbuffers 示例代码

在发送和接收 Flatbuffer 消息之前，您需要定义一个 schema 并将其编译为 TypeScript。然后，将 schema 注册到网络系统，并使用生成的 schema 方法来创建和解析消息。

- [Needle Engine 中的内置 Flatbuffer schema](#built-in-flatbuffer-schemas)
- [生成 schema](https://google.github.io/flatbuffers/flatbuffers_guide_writing_schema.html)
- [使用 schema 编译器](https://google.github.io/flatbuffers/flatbuffers_guide_using_schema_compiler.html)
- [TypeScript 中的 Flatbuffers](https://google.github.io/flatbuffers/flatbuffers_guide_use_typescript.html)

::::code-group
:::code-group-item 注册 schema
```ts
// Register a new Flatbuffer schema with the networking system
import { registerBinaryType } from '@needle-tools/engine';
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

registerBinaryType(MySchemaIdentifier, MyDataModel.getRootAsSyncedTransformModel);
```
:::
:::code-group-item 发送消息
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
:::code-group-item 接收消息
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

::: tip 自定义 Flatbuffer 消息和持久性
目前，自定义二进制消息无法在网络服务器上持久化。修改网络服务器并添加您的自定义 flatbuffer schema，以确保 guid 属性可以被处理。
:::

## 总结

Needle Engine 使复杂的网络主题变得易于上手和使用。您只需几行代码即可开始使用自动联网来处理您的组件，并且在需要更多控制时，您可以深入了解手动联网。

---
页面由 AI 自动翻译