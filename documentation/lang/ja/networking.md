# ネットワーキング

Needle Engineには、マルチプレイヤー体験のための完全なネットワーキングソリューションが含まれています。
当社のネットワーキングコンポーネントとAPIを使用すると、共有ワールド状態、ボイスチャット、セッション永続性などを実現できます。自動または手動のネットワーキングを選択して、独自のコンポーネントをネットワーク化できます。

Needle Engineのネットワーキングは、[Websockets](https://github.com/jjxxs/websocket-ts)に基づいています。自動ネットワーキングは、使いやすさのためにJSONデータを使用します。複雑なユースケースと高いパフォーマンス要件には、[Flatbuffers](https://google.github.io/flatbuffers/)を使用します。

コアネットワーキング機能へのアクセスは、コンポーネントから ``this.context.connection`` を使用することで取得できます。デフォルトのバックエンドサーバーはユーザーをルームに接続します。同じルームのユーザーは状態を共有し、互いにメッセージを受け取ります。

## ネットワーキングの概念

### ルームと状態

Needle Engineのネットワーキングの中心には、同期されたルームの概念があります。各ルームにはIDがあり、ユーザーはこのIDを提供することでルームに接続します。ルームはサーバーに保存され、ユーザーはいつでもルームに参加したり退出したりできます。
ユーザーがルームに参加すると、ルームの現在の状態を受け取り、その現在の状態をシーンに適用し、ルームの状態の変更をリッスンします。
ユーザーがルームを退出すると、ルームの状態の変更をリッスンを停止します。

ルームの状態はサーバーにJSONデータとして保存されるため、すべての変更は永続的です。これは、ルームの状態がネットワーキングだけでなく、単一ユーザーのアクションを永続化するためにも役立つことを意味します。

Needleはルームの _ビューのみのID_ を提供できます。ビューのみのIDでルームにアクセスする場合、ユーザーはルームとインタラクトすることはできませんが、現在の状態を確認し、ライブアップデートを取得できます。これはプレゼンテーションやデモンストレーションに役立ちます。

### 所有権

ルーム内のオブジェクトは、ユーザーに _所有_ されることができます。これは、オブジェクトの所有者だけがその状態を変更できることを意味します。
デフォルトでは、オブジェクトには所有者がありません。
`DragControls`のようなコンポーネントは、実際にオブジェクトを移動する前に、そのオブジェクトの所有権を要求します。
カスタムコンポーネントでは、所有権の処理方法を制御できます。
所有権が不要な場合、所有権が自動的に別のユーザーに譲渡される場合、または特定の操作によってのみ所有権が譲渡される場合があります。

ユーザーがルームを退出すると、そのユーザーが所有するオブジェクトは、オブジェクトが作成された方法に応じて、削除されるか所有権がリセットされます。

## プロジェクトのネットワーキングを有効にする

1.  シーンに `SyncedRoom` コンポーネントを追加します。デフォルトでは、これはNeedleによって提供されるネットワーキングインフラストラクチャを使用します。
2.  ネットワーク全体で移動を同期したいオブジェクトに `SyncedTransform` コンポーネントを追加します。
3.  同じオブジェクトに `DragControls` コンポーネントを追加します。
4.  プロジェクトを実行します。ブラウザで「Join Room」をクリックし、URLをコピーします。
5.  新しいブラウザウィンドウを開き、URLを貼り付けます。両方のウィンドウで同じオブジェクトが表示されるはずです。一方のウィンドウでオブジェクトをドラッグしてみて、もう一方のウィンドウで移動することを確認してください。

`DragControls` コンポーネントは、他の多くのNeedleコンポーネントと同様に、ネットワーキングサポートが組み込まれています。
所有権は、オブジェクトをドラッグし始めたユーザーに自動的に譲渡されます。

## ネットワーキング対応の組み込みコンポーネント

| コンポーネント          | 説明                                                                         |
| :---------------------- | :--------------------------------------------------------------------------- |
| `SyncedRoom`            | ネットワーキング接続とルームへの接続を処理します。                                           |
| `SyncedTransform`       | トランスフォームの同期を処理します。                                                     |
| `SyncedCamera`          | ルームに接続されたすべてのユーザーのために、位置を追従するPrefabを生成します。                               |
| `VoIP`                  | ユーザー間のVoIP（Voice-over-IP）オーディオ接続、マイクアクセスなどを処理します。                                |
| `ScreenCapture`         | Web APIを介した画面共有を処理します。                                                 |
| `Networking`            | サーバーバックエンドURLをカスタマイズするために使用します。開発のためにローカルサーバーを設定することもできます。                     |
| `DragControls`          | オブジェクトのドラッグを処理します。所有権は、最後にオブジェクトをドラッグしたユーザーに自動的に渡されます。                            |
| `Duplicatable`          | オブジェクトの複製を処理します。複製されたオブジェクトは、ルームの全員に対してインスタンス化されます。                             |
| `Deletable`             | オブジェクトの削除を処理します。削除はネットワーク全体で同期されます。                                    |
| `DeleteBox`             | "Deletable"コンポーネントを持つオブジェクトがボックスボリュームにドラッグされたときに、そのオブジェクトの削除を処理します。          |
| `PlayerSync`            | 各接続されたプレイヤーに対して特定のオブジェクトをインスタンス化する強力なコンポーネントです。                               |
| `PlayerState`           | `PlayerSync`に割り当てられるオブジェクトにこのコンポーネントを追加します。                                |
| `PlayerColor`           | プレイヤー固有の色を設定するシンプルなコンポーネントです。各ユーザーはルームへの参加時にランダムな色が割り当てられます。このコンポーネントは、その色をオブジェクトのメインマテリアルに割り当てます。 |
| `WebXR`                 | ユーザーアバター（手と頭）の同期を処理します。                                                   |

## カスタムコンポーネントの自動ネットワーキング

独自のコンポーネントのフィールドは、非常に簡単にネットワーク化できます。フィールドの変更は自動的に検出され、ルームのすべてのユーザーに送信されます。変更はルームの状態の一部として永続化されるため、後でルームに参加したユーザーもそのフィールドの現在の状態を受け取り、全員が同じデータを見ることができます。

コンポーネント内のフィールドを自動的にネットワーク化するには、``@syncField()`` デコレーターを付けます。

::::code-group
:::code-group-item 数値を同期
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
:::code-group-item オブジェクトの色の同期
<!-- SAMPLE network color change -->
:::
::::

syncFieldには、値が変更されたときに呼び出す必要があるメソッドを指定するためのオプションパラメータがあることに注意してください。このメソッドは同じクラスで定義する必要があります。

::: tip カスタムプロジェクト設定
カスタムプロジェクト設定を使用している場合は、syncFieldデコレーターを機能させるために、``tsconfig.json`` ファイルに ``experimentalDecorators: true`` が必要です。Needle Starterで作成されたプロジェクトでは、これがデフォルトで有効になっています。
:::

## オブジェクトの作成と破棄

多くの場合、実行時にオブジェクトを作成および破棄したい場合があり、もちろんこれらの変更はネットワーク全体で同期される必要があります。

`PlayerSync` コンポーネントは、各接続されたプレイヤーに対して特定のオブジェクトを自動的にインスタンス化することで、このプロセスを簡素化します。
プレイヤーがルームを退出すると、オブジェクトはすべてのユーザーに対して破棄されます。

さらに、Needle Engineは2つの高レベルメソッドを提供します。
- [`syncInstantiate()`](https://engine.needle.tools/docs/api/latest/syncInstantiate) は、ネットワーク全体でオブジェクトを複製します。
- [`syncDestroy()`](https://engine.needle.tools/docs/api/latest/syncDestroy) は、ネットワーク全体でオブジェクトを破棄します。

> 🏗️ コードサンプルは構築中です

## 手動ネットワーキング

Needle Engineは、メッセージを送受信するための低レベルAPIも提供しています。これを「手動ネットワーキング」と呼びます。原則は同じですが、メッセージの送信と受信、およびそれらの処理方法を完全に制御できます。

### メッセージの送信

同じルームのすべてのユーザーにメッセージを送信します：
```ts
this.context.connection.send(key: string, data: IModel | object | boolean | string | number | null);
```

### メッセージの受信

特定のキーを使用して、ルーム内のイベントをサブスクライブできます。
通常、これをサブスクライブ解除と一致させたい場合があります。

- `onEnable` でサブスクライブし、`onDisable` でサブスクライブ解除する
  このアプローチでは、オブジェクトが無効になっている間はメッセージを受信しません。

- または `start` でサブスクライブし、`onDestroy` でサブスクライブ解除する
  このアプローチでは、オブジェクトが無効になっている間もメッセージを受信します。

```ts
this.context.connection.beginListen(key:string, callback:(data) => void)
```

イベントのサブスクライブを解除します：
```ts
this.context.connection.stopListen(key:string)
```

### メッセージの永続性の制御

ネットワークメッセージを送信する場合、低レベルAPIを使用すると、そのメッセージを永続化するかどうか（ルームの状態に保存するかどうか）、またはそうでないか（現在ルームにいるユーザーにのみ送信するかどうか）を決定できます。メッセージを永続化するには、`guid`フィールドがあることを確認してください。このフィールドは通常、そのオブジェクトのguidを提供することで、特定のオブジェクトにメッセージデータを適用するために使用されます。特定のオブジェクトをターゲットにしたい場合（したがって、`guid`フィールドを含める場合）でも、データを永続化させたくない場合は、メッセージの`dontSave`フィールドを`true`に設定してください。

すべての永続化されたメッセージはルームの状態に保存され、後で接続したユーザーに送信されます。非永続化されたメッセージは、現在ルームにいるユーザーにのみ送信されます。これは、現在ルームにいないユーザーに対して再生しても意味がないエフェクト（サウンドエフェクトの再生など）に役立ちます。オプションで、メッセージに`deleteOnDisconnect`フィールドを含めて、ユーザーが切断したときにこの特定のメッセージを削除することができます。

```ts
// このメッセージは、現在ルームにいるすべてのユーザー、
// および後でルームに参加するユーザーに送信されます。
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue" });

// このメッセージは、現在ルームにいるすべてのユーザーに送信されますが、
// 後でルームに参加するユーザーには送信されません。
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", dontSave: true });

// このメッセージは、現在ルームにいるすべてのユーザーに送信されますが、
// 後でルームに参加するユーザーには送信されません。
this.context.connection.send("my-message", { myData: "myValue" });

// このメッセージは、現在ルームにいるすべてのユーザー、
// および後でルームに参加するユーザーに送信されますが、
// ユーザーが切断したときにルームの状態から削除されます。
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", deleteOnDisconnect: true });
```

バックエンドストレージから特定のguidの状態を削除するには、メッセージキーを`delete-state`に設定し、そのguidを持つ特定のオブジェクトをターゲットにします：`{ guid: "guid_to_delete" }`。

```ts
this.context.connection.send("delete-state", { guid: "guid_to_delete" });
```

### デバッグフラグを使用したネットワークメッセージの理解

ネットワークメッセージをより深く理解するために使用できるいくつかのデバッグフラグがあります。
これらはページのURLに追加できます。例えば `https://localhost:3000/?debugnet` のようにします。

| フラグ        | 説明                                                |
| :------------ | :-------------------------------------------------- |
| `?debugnet`   | すべての受信および送信ネットワークメッセージをコンソールにログ出力します。                  |
| `?debugowner` | すべての所有権要求と変更をコンソールにログ出力します。                               |
| `?debugnetbin`| 受信および送信バイナリメッセージの追加情報をログ出力します。                            |

## ネットワーキングライフサイクルイベント

コンポーネントでリッスンできる次のイベントがあります。これらは、自分自身や他のユーザーがルームに参加したり退出したりするなど、コンポーネントで反応したい一般的なネットワークイベントを表します。

```ts
// 自分がネットワーク化されたルームに参加したときのイベントをリッスンします
this.context.beginListen(RoomEvents.JoinedRoom, ({room, viewId, allowEditing, inRoom}) => { ... });

// 自分がネットワーク化されたルームから退出したときのイベントをリッスンします
this.context.beginListen(RoomEvents.LeftRoom, ({room}) => { ... });

// 別のユーザーが自分のネットワーク化されたルームに参加したときのイベントをリッスンします
this.context.beginListen(RoomEvents.UserJoinedRoom, ({userId}) => { ... });

// 別のユーザーが自分のネットワーク化されたルームから退出したときのイベントをリッスンします
this.context.beginListen(RoomEvents.UserLeftRoom, ({userId}) => { ... });

// 現在のルーム状態がすべてクライアントに送信された後に受信されるイベントです
this.context.beginListen(RoomEvents.RoomStateSent, () => { ... });
```

- [APIドキュメントですべてのRoom Eventsを確認する](https://engine.needle.tools/docs/api/latest/RoomEvents)
- [APIドキュメントですべてのOwnership Eventsを確認する](https://engine.needle.tools/docs/api/latest/OwnershipEvent)
- [APIドキュメントですべてのConnection Eventsを確認する](https://engine.needle.tools/docs/api/latest/ConnectionEvents)

## Needleネットワーキングサーバーの使用

デフォルトでは、ネットワーク化されたNeedleシーンは、Needleによって管理および提供されるクラウドインフラストラクチャに接続します。追加のセットアップは不要であり、現在、このサービスの使用に追加費用はかかりません。

通常、これは同じルームに約15〜20人のユーザーがいる場合にうまく機能します。プロジェクトが成熟したら、独自のネットワーキングサーバーをホストすることで、より大きく、より良く、より強力なネットワーキングソリューションにアップグレードできます。

## 独自のネットワーキングサーバーのホスト

大規模な展開や、ネットワーキングインフラストラクチャと実装をより細かく制御するために、独自のネットワーキングサーバーをホストすることをお勧めします。

当社のネットワーキングサーバーは、NPMの[独自のネットワーキングパッケージ](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking)としてNode.jsパッケージで利用できます。このパッケージには、人気のWebフレームワーク[Fastify](https://www.npmjs.com/package/fastify)および[Express](https://www.npmjs.com/package/express)の事前設定された統合が含まれており、他のNode.jsサーバーフレームワークにも統合できます。

::: tip 簡単な実験のために：Glitchでのリミックス
このページから、Glitchで実行されているシンプルなネットワーキングサーバーをリミックスできます：[needle-networking.glitch.me](https://needle-networking.glitch.me/) 右下隅のボタンをクリックしてください。

デフォルトのGlitchサーバーインスタンスは小さく、限られた数のユーザーしか処理できません。シーンに同時に15〜20人以上のユーザーがいると予想される場合は、Google CloudやAWSなど、別の場所でネットワーキングサーバーをホストすることを検討する必要があります。
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
:::code-group-item カスタム統合
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

::: tip Glitch.comの例
Needle NetworkingをExpressサーバーと統合する方法の例については、[glitch.com/edit/#!/needle-networking?path=server.js](https://glitch.com/edit/#!/needle-networking?path=server.js)でコードを確認してください。
:::

### 設定

以下のオプションが利用可能です。

| オプション                     | 説明                                                                                                   |
| :----------------------------- | :----------------------------------------------------------------------------------------------------- |
| `options.endpoint` *string*    | オプション。相対サーバーエンドポイント。例えば `/socket`は、`yourserver/socket`にWebSocketエンドポイントを開始します。デフォルトは`/`です。         |
| `options.maxUsers` *number*    | サーバー上の最大同時ユーザー数。デフォルトは`50`です。                                                              |
| `options.defaultUserTimeout` *number* | ユーザーが切断されたとみなされるまでの時間（秒）。デフォルトは`30`です。                                                        |
| `process.env.VIEW_ONLY_SALT` *string* | 通常のルームIDからビューのみのルームIDを生成するために使用されるソルト値。デフォルトは事前定義されたソルト値です。                               |
| `process.env.NEEDLE_NETWORKING_S3_*` *string* | S3ストレージを有効にします。これに必要な環境変数の一覧は以下を参照してください。設定されていない場合は、デフォルトのストレージ（ディスク上のJSONファイル）が使用されます。 |

ネットワーキングサーバーは、ユーザーの接続と切断、メッセージの送受信、ルーム状態の永続化を自動的に管理します。

カスタムネットワーキングサーバーは、Google Cloudなど、どこにでもデプロイできます。詳細な手順については、このリポジトリを参照してください：[Local Needle Networking Server](https://fwd.needle.tools/needle-engine/local-networking-repository)

::: tip ローカル開発とホストされた開発で異なるサーバーの場所を使用する
カスタムネットワーキングコードを開発している場合は、ローカル開発とホストされたアプリで異なるサーバーの場所を使用したい場合があります。`Networking`コンポーネントで個別のサーバーURLを設定できます：

![外部でホストされているネットワーキングサーバーを含むNeedle Engineネットワーキングコンポーネント](/imgs/networking_absolute.webp)
:::

#### 状態の保存

ネットワーク状態は、デフォルトでサーバー上のディスクに`/.data`ディレクトリ内のJSONファイルとして保存されます。
各ルームは独自のファイルを持ち、状態はルームに参加する接続クライアントに送信されます。

オプションで、ネットワーキング状態はS3互換ストレージプロバイダーを使用して保存できます。S3ストレージを有効にするには、次の環境変数を使用します：

```bash
NEEDLE_NETWORKING_S3_ENDPOINT=
NEEDLE_NETWORKING_S3_REGION=
NEEDLE_NETWORKING_S3_BUCKET=
NEEDLE_NETWORKING_S3_ACCESS_KEY_ID=
NEEDLE_NETWORKING_S3_ACCESS_KEY=
NEEDLE_NETWORKING_S3_PREFIX= # all state saved in the bucket will be prefixed with this string. This can be a path e.g. `my_state/` or a unique id `server_123_`
```

## ローカルネットワーキングサーバー

テストおよび開発目的のために、Needle Engineネットワーキングパッケージをローカルサーバーで実行できます。WebSocketパッケージをホストし、これを容易にするためのリポジトリを用意しました。

1.  [github.com/needle-tools/networking-local](https://fwd.needle.tools/needle-engine/local-networking-repository)からローカルサーバーサンプルをダウンロードします。
2.  READMEの指示に従ってサーバーをセットアップします。サーバーはデフォルトで`wss://localhost:9001/socket`で実行されます。
3.  シーンに`Networking`コンポーネントを追加します。
4.  ローカルサーバーのアドレスを`Networking`コンポーネントの`Localhost`フィールドに貼り付けます。

## 高度な設定：peer.jsのWebRTC設定のカスタマイズ

Needle Engineの`Screencapture`（画面共有）および`VoIP`（音声通信）コンポーネントは、オーディオとビデオのネットワーキングに[peer.js](https://peerjs.com/)を使用します。Peer.jsは内部でWebRTCを使用しています。

Needle Engineはpeerjsの合理的なデフォルトを使用します。これらのデフォルトを変更したい場合は、
```ts
setPeerOptions(opts: PeerjsOptions);
```
をカスタム設定で呼び出すことができます。これは、独自のWebRTCサーバーを使用する場合など、ICE/STUN/TURNサーバーのホスティングプロバイダーを変更するために使用できます。

## 高度な設定：サーバーとクライアントのメッセージ形式

::: warning 情報提供目的です。代わりにNeedle Engineが提供するAPIを使用してください。
通常、これらのメッセージ形式に直接インタラクトする必要はありません。なぜなら、低レベルネットワーキングAPIがすでにメッセージの解析と正しい型の提供を処理しているからです。ここに提供される情報は、基盤となるメッセージ形式を理解したり、独自のネットワーキングソリューションを実装したい高度なユーザー向けです。
:::

メッセージはJSON形式で送信されます。常にメッセージのタイプを表す`key`フィールドと、メッセージペイロードを含む`data`フィールドがあります。`data`フィールドは、JSONシリアライズ可能な任意のオブジェクトにすることができます。

### 組み込みルームイベント

::::code-group
:::code-group-item Join
```json
// ルームに参加を試みるためにサーバーに送信されます。
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
// ルームから退出するためにサーバーに送信されます。
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
// ローカルユーザーがルームに参加したときにクライアントに送信されます。
// 型：JoinedRoomResponse
{
    "key": "joined-room",
    "room": string,
    "viewId": string,
    "allowEditing": boolean,
    "inRoom": string[] // 接続ID
}
```
:::
:::code-group-item LeftRoom
```json
// ローカルユーザーがルームから退出したときにクライアントに送信されます。
// 型：LeftRoomResponse
{
    "key": "left-room",
    "room": string
}
```
:::
:::code-group-item UserJoinedRoom
```json
// 任意のユーザーがルームに参加したときにクライアントに送信されます。
// 型：UserJoinedOrLeftRoomModel
{
    "key": "user-joined-room",
    "data": {
        "userId": string // 接続ID
    }
}
```
:::
:::code-group-item UserLeftRoom
```json
// 任意のユーザーがルームから退出したときにクライアントに送信されます。
// 型：UserJoinedOrLeftRoomModel
{
    "key": "user-left-room",
    "data": {
        "userId": string // 接続ID
    }
}
````
:::
:::code-group-item RoomStateSent
```json
// 完全なルーム状態が送信された後にクライアントに送信されます。
{
    "key": "room-state-sent",
    "room": string // ルーム名
}
```
:::
::::

### 組み込みユーティリティイベント

::::code-group
:::code-group-item ConnectionInfo
```json
// 接続が確立されたときにクライアントに送信されます。
{
    "key": "connection-start-info",
    "data": {
        "id": string // 接続ID
    }
}
```
:::
:::code-group-item syncInstantiate
```json
// アセットの新しいインスタンスを作成するためにsyncInstantiate() APIによって使用されます。
// 型：NewInstanceModel
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
// アセットのインスタンスを破棄するためにsyncDestroy() APIによって使用されます。
// 型：DestroyInstanceModel
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
// 接続を維持するために数秒ごとにサーバーに送信されます。
{
    "key": "ping",
    "data": {}
}
```
:::
:::code-group-item Pong
```json
// pingに対する応答としてサーバーによって送信されます。
{
    "key": "pong",
    "data": {}
}
```
:::
:::code-group-item DeleteState
```json
// 特定のguidの状態を削除するためにサーバーに送信されます。
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
// 現在のルーム状態をすべて削除するためにサーバーに送信されます。
{
    "key": "delete-all-state",
    "data": {}
}
```
::::

### 組み込み所有権イベント

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
// 型：OwnershipResponse
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

### 組み込みFlatbufferスキーマ

Flatbufferメッセージはバイナリメッセージとして直接送信されます。

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

## 高度な設定：Flatbuffer形式のバイナリメッセージ

JSONメッセージは使いやすく理解しやすいですが、通常、メモリと帯域幅で大きくなります。大量のデータや高速な更新を送信する場合、バイナリメッセージはより高速で効率的です。Needle Engineでは、そのような要件がある場合にFlatbufferメッセージを使用できます。Flatbufferを使用するには、メッセージスキーマの定義とコンパイルなどの追加のセットアップ手順が必要であり、バイナリメッセージを扱うためデバッグが困難です。

Flatbufferメッセージを送受信する場合、`key`フィールドがないことに注意してください。メッセージタイプはFlatbufferスキーマの一部です。WebSocket接続で送受信するのは単一のバイナリバッファです。

同じルームのすべてのユーザーにバイナリメッセージを送信します：
```ts
this.context.connection.sendBinary(byteArray: Uint8Array);
```

Flatbuffer形式のバイナリメッセージをサブスクライブします：
```ts
this.context.connection.beginListenBinary(identifier:string, callback:(data : ByteBuffer) => void);
```

バイナリメッセージのサブスクライブを解除します：
```ts
this.context.connection.stopListenBinary(identifier:string);
```

#### Flatbuffersサンプルコード

Flatbufferメッセージを送受信する前に、スキーマを定義し、TypeScriptにコンパイルする必要があります。次に、ネットワーキングシステムにスキーマを登録し、生成されたスキーマメソッドを使用してメッセージを作成および解析します。

- [Needle Engineの組み込みFlatbufferスキーマ](#built-in-flatbuffer-schemas)
- [スキーマの生成](https://google.github.io/flatbuffers/flatbuffers_guide_writing_schema.html)
- [スキーマコンパイラの使用](https://google.github.io/flatbuffers/flatbuffers_guide_using_schema_compiler.html)
- [TypescriptでのFlatbuffers](https://google.github.io/flatbuffers/flatbuffers_guide_use_typescript.html)

::::code-group
:::code-group-item スキーマの登録
```ts
// ネットワーキングシステムに新しいFlatbufferスキーマを登録します
import { registerBinaryType } from '@needle-tools/engine';
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

registerBinaryType(MySchemaIdentifier, MyDataModel.getRootAsSyncedTransformModel);
```
:::
:::code-group-item メッセージの送信
```ts
// Flatbufferメッセージを作成して送信するデータを準備します：
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";
const builder = new flatbuffers.Builder();

// Flatbufferメッセージを構築します
function createMyCustomModel(somePayload: string): Uint8Array {
    builder.clear();
    MyDataModel.startMyDataModel(builder);
    const guidObj = builder.createString(guid);
    MyDataModel.addSomePayload(builder, guidObj);
    const res = MyDataModel.endMyDataModel(builder);
    builder.finish(res, MySchemaIdentifier);
    return builder.asUint8Array();
}

// データを送信します
function sendData() {
    const data = createMyCustomModel("your-payload", this, true);
    this.context.connection.sendBinary(data);
}
```
:::
:::code-group-item メッセージの受信
```ts
// この特定のメッセージタイプを受信するためにサブスクライブします：
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

this.context.connection.beginListenBinary(MySchemaIdentifier, (data) => {
    const model = MyDataModel.getRootAsMyDataModel(data);
    console.log("Received binary message", model, model.somePayload());
});
```
:::
::::

::: tip カスタムFlatbufferメッセージと永続性
現在、カスタムバイナリメッセージはネットワーキングサーバーに永続化できません。ネットワーキングサーバーを変更し、カスタムFlatbufferスキーマを追加して、guidプロパティが処理されるようにしてください。
:::

## まとめ

Needle Engineは、ネットワーキングの複雑なトピックを分かりやすく使いやすくします。わずか数行のコードでコンポーネントの自動ネットワーキングを開始でき、より細かく制御が必要な場合は手動ネットワーキングをさらに深く掘り下げることができます。


ページはAIによって自動的に翻訳されました。