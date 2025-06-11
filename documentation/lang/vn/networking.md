# Kết nối mạng

Needle Engine bao gồm một giải pháp kết nối mạng đầy đủ cho các trải nghiệm nhiều người chơi.
Trạng thái thế giới được chia sẻ, trò chuyện thoại, tính bền vững của phiên làm việc và nhiều hơn nữa có thể đạt được với các component và API kết nối mạng của chúng tôi. Bạn có thể kết nối mạng các component của riêng mình với lựa chọn kết nối mạng tự động hoặc thủ công.

Kết nối mạng trong Needle Engine dựa trên [Websockets](https://github.com/jjxxs/websocket-ts). Kết nối mạng tự động sử dụng dữ liệu JSON để dễ sử dụng. Đối với các trường hợp sử dụng phức tạp và yêu cầu hiệu suất cao, chúng tôi sử dụng [Flatbuffers](https://google.github.io/flatbuffers/).

Truy cập chức năng kết nối mạng cốt lõi có thể đạt được bằng cách sử dụng ``this.context.connection`` từ một component. Máy chủ backend mặc định kết nối người dùng vào các phòng (rooms). Người dùng trong cùng một phòng sẽ chia sẻ trạng thái và nhận tin nhắn từ nhau.

## Khái niệm kết nối mạng

### Phòng và Trạng thái

Cốt lõi của kết nối mạng trong Needle Engine là khái niệm về các phòng được đồng bộ hóa (synchronized rooms). Mỗi phòng có một ID và người dùng kết nối đến một phòng bằng cách cung cấp ID này. Các phòng được lưu trữ trên máy chủ và người dùng có thể tham gia và rời phòng bất cứ lúc nào.
Khi người dùng tham gia một phòng, họ nhận được trạng thái hiện tại của phòng, áp dụng trạng thái hiện tại đó vào cảnh của họ và sau đó lắng nghe các thay đổi đối với trạng thái phòng.
Khi người dùng rời phòng, họ ngừng lắng nghe các thay đổi đối với trạng thái phòng.

Trạng thái phòng được lưu trữ dưới dạng dữ liệu JSON trên máy chủ, vì vậy tất cả các thay đổi đều có tính bền vững. Điều này có nghĩa là trạng thái phòng không chỉ hữu ích cho kết nối mạng mà còn để duy trì hành động của một người dùng duy nhất.

Needle có thể cung cấp _ID chỉ xem_ cho các phòng. Khi truy cập một phòng bằng ID chỉ xem, người dùng sẽ không thể tương tác với phòng, nhưng sẽ có thể xem trạng thái hiện tại và nhận các cập nhật trực tiếp. Điều này hữu ích cho các bài thuyết trình hoặc trình diễn.

### Quyền sở hữu

Các đối tượng trong một phòng có thể được _sở hữu_ bởi một người dùng. Điều này có nghĩa là chỉ chủ sở hữu của một đối tượng mới có thể thay đổi trạng thái của nó.
Theo mặc định, các đối tượng không có chủ sở hữu.
Các component như `DragControls` sẽ yêu cầu quyền sở hữu một đối tượng trước khi thực sự di chuyển nó.
Trong các component tùy chỉnh, bạn có thể kiểm soát cách xử lý quyền sở hữu.
Có thể không yêu cầu quyền sở hữu, quyền sở hữu có thể được cho phép tự động chuyển giao cho người dùng khác, hoặc quyền sở hữu chỉ có thể được chuyển giao bằng một hành động cụ thể.

Khi người dùng rời phòng, các đối tượng thuộc sở hữu của người dùng đó sẽ bị xóa hoặc quyền sở hữu sẽ được đặt lại, tùy thuộc vào cách đối tượng được tạo.

## Kích hoạt kết nối mạng cho dự án của bạn

1.  Thêm component `SyncedRoom` vào cảnh của bạn. Theo mặc định, điều này sẽ sử dụng hạ tầng kết nối mạng do Needle cung cấp.
2.  Thêm component `SyncedTransform` vào một đối tượng mà bạn muốn đồng bộ hóa chuyển động của nó qua mạng.
3.  Thêm component `DragControls` vào cùng đối tượng đó.
4.  Chạy dự án. Trong trình duyệt, nhấp vào "Join Room" và sao chép URL.
5.  Mở một cửa sổ trình duyệt mới và dán URL. Bây giờ bạn sẽ thấy cùng một đối tượng trong cả hai cửa sổ. Thử kéo đối tượng trong một cửa sổ và xem nó di chuyển trong cửa sổ kia.

Component `DragControls`, giống như nhiều component Needle khác, có hỗ trợ kết nối mạng tích hợp sẵn.
Quyền sở hữu sẽ được chuyển giao cho người bắt đầu kéo đối tượng.

## Các Component tích hợp sẵn với hỗ trợ kết nối mạng

| Component         | Mô tả                                                                                                                                |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `SyncedRoom`      | Xử lý kết nối mạng và kết nối đến một phòng.                                                                                          |
| `SyncedTransform` | Xử lý đồng bộ hóa transform.                                                                                                           |
| `SyncedCamera`    | Tạo một prefab cho bất kỳ người dùng nào kết nối đến phòng, prefab này sẽ theo dõi vị trí của họ.                                        |
| `VoIP`            | Xử lý các kết nối âm thanh voice-over-IP, truy cập microphone, v.v. giữa những người dùng.                                              |
| `ScreenCapture`   | Xử lý chia sẻ màn hình qua API web.                                                                                                    |
| `Networking`      | Sử dụng để tùy chỉnh URL máy chủ backend. Cũng cho phép đặt máy chủ cục bộ để phát triển.                                               |
| `DragControls`    | Xử lý kéo đối tượng. Quyền sở hữu sẽ tự động được chuyển cho người dùng cuối cùng kéo đối tượng.                                        |
| `Duplicatable`    | Xử lý sao chép đối tượng. Các đối tượng được sao chép sẽ được tạo thể hiện cho mọi người trong phòng.                                 |
| `Deletable`       | Xử lý xóa đối tượng. Các thao tác xóa được đồng bộ hóa qua mạng.                                                                       |
| `DeleteBox`       | Xử lý xóa các đối tượng có component "Deletable" khi chúng được kéo vào một vùng hộp.                                                  |
| `PlayerSync`      | Component mạnh mẽ giúp tạo thể hiện một đối tượng cụ thể cho mỗi người chơi được kết nối.                                                |
| `PlayerState`     | Thêm component này vào các đối tượng được gán cho `PlayerSync`.                                                                        |
| `PlayerColor`     | Component đơn giản cho màu sắc riêng của người chơi. Mỗi người dùng được gán một màu ngẫu nhiên khi tham gia phòng. Component này gán màu đó cho vật liệu chính của đối tượng. |
| `WebXR`           | Xử lý đồng bộ hóa avatar người dùng (tay và đầu).                                                                                     |

## Kết nối mạng tự động cho các Component tùy chỉnh

Các trường (fields) trong các component của riêng bạn có thể được kết nối mạng rất dễ dàng. Các thay đổi đối với trường sẽ được tự động phát hiện và gửi đến tất cả người dùng trong phòng. Các thay đổi này cũng được duy trì như một phần của Trạng thái Phòng, vì vậy người dùng tham gia phòng sau này cũng sẽ nhận được trạng thái hiện tại của trường, đảm bảo mọi người đều thấy cùng dữ liệu.

Để tự động kết nối mạng một trường trong một component, trang trí nó bằng decorator ``@syncField()``:

::::code-group
:::code-group-item Đồng bộ hóa một số
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
:::code-group-item Đồng bộ hóa màu của đối tượng
<!-- SAMPLE network color change -->
:::
::::

Lưu ý rằng syncField có một tham số tùy chọn để chỉ định một phương thức sẽ được gọi khi giá trị thay đổi. Phương thức này nên được định nghĩa trong cùng một lớp.

::: tip Cài đặt dự án tùy chỉnh
Nếu bạn đang sử dụng cài đặt dự án tùy chỉnh, bạn cần có ``experimentalDecorators: true`` trong tệp ``tsconfig.json`` của mình để decorator syncField hoạt động. Các dự án được tạo bằng Needle Starters đã bật tính năng này theo mặc định.
:::

## Tạo và hủy đối tượng

Thông thường, bạn muốn tạo và hủy đối tượng trong thời gian chạy, và tất nhiên những thay đổi này phải được đồng bộ hóa qua mạng.

Component `PlayerSync` đơn giản hóa quy trình này bằng cách tự động tạo thể hiện một đối tượng cụ thể cho mỗi người chơi được kết nối.
Khi một người chơi rời phòng, đối tượng sẽ bị hủy cho tất cả người dùng.

Ngoài ra, Needle Engine cung cấp hai phương thức cấp cao:
- [`syncInstantiate()`](https://engine.needle.tools/docs/api/latest/syncInstantiate) để sao chép đối tượng qua mạng.
- [`syncDestroy()`](https://engine.needle.tools/docs/api/latest/syncDestroy) để hủy đối tượng qua mạng.

> 🏗️ Mẫu mã đang được xây dựng

## Kết nối mạng thủ công

Needle Engine cũng cung cấp API cấp thấp để gửi và nhận tin nhắn. Chúng tôi gọi đây là "kết nối mạng thủ công". Các nguyên tắc tương tự, nhưng bạn hoàn toàn kiểm soát việc gửi và nhận tin nhắn cũng như cách xử lý chúng.

### Gửi tin nhắn

Gửi tin nhắn đến tất cả người dùng trong cùng một phòng:
```ts
this.context.connection.send(key: string, data: IModel | object | boolean | string | number | null);
```

### Nhận tin nhắn

Bạn có thể đăng ký các sự kiện trong phòng bằng cách sử dụng một khóa cụ thể.
Thông thường, bạn sẽ muốn kết hợp điều này với việc hủy đăng ký:

- đăng ký trong `onEnable` và hủy đăng ký trong `onDisable`
Với cách tiếp cận này, không có tin nhắn nào sẽ được nhận trong khi đối tượng bị vô hiệu hóa.

- hoặc đăng ký trong `start` và hủy đăng ký trong `onDestroy`
Với cách tiếp cận này, tin nhắn vẫn sẽ được nhận trong khi đối tượng bị vô hiệu hóa.

```ts
this.context.connection.beginListen(key:string, callback:(data) => void)
```

Hủy đăng ký các sự kiện:
```ts
this.context.connection.stopListen(key:string)
```

### Kiểm soát tính bền vững của thông báo

Khi gửi các tin nhắn mạng, API cấp thấp cho phép bạn quyết định xem tin nhắn đó có nên được duy trì (lưu trong trạng thái phòng) hay không (chỉ gửi đến những người dùng hiện đang ở trong phòng). Để duy trì một tin nhắn, hãy đảm bảo nó có trường `guid`. Trường này thường được sử dụng để áp dụng dữ liệu tin nhắn cho một đối tượng cụ thể, bằng cách cung cấp guid của đối tượng đó. Nếu bạn muốn nhắm mục tiêu một đối tượng cụ thể (và do đó, bao gồm trường `guid`) nhưng muốn dữ liệu không được duy trì, hãy đặt trường `dontSave` thành `true` trong tin nhắn của bạn.

Tất cả các tin nhắn bền vững được lưu trong trạng thái phòng và sẽ được gửi đến những người dùng kết nối sau này. Các tin nhắn không bền vững chỉ được gửi đến những người dùng hiện đang ở trong phòng, điều này hữu ích cho các hiệu ứng (như phát hiệu ứng âm thanh) không có ý nghĩa khi phát cho những người dùng hiện không ở trong phòng. Tùy chọn, bạn có thể bao gồm trường `deleteOnDisconnect` trong tin nhắn của mình để xóa tin nhắn cụ thể này khi người dùng ngắt kết nối.

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

Để xóa trạng thái cho một guid cụ thể khỏi bộ nhớ backend, hãy đặt khóa tin nhắn thành `delete-state` và nhắm mục tiêu một đối tượng cụ thể bằng guid của nó: `{ guid: "guid_to_delete" }`.

```ts
this.context.connection.send("delete-state", { guid: "guid_to_delete" });
```

### Sử dụng cờ gỡ lỗi để hiểu tin nhắn mạng

Có một số cờ gỡ lỗi có thể được sử dụng để tìm hiểu sâu hơn về tin nhắn mạng.
Chúng có thể được thêm vào URL trang, ví dụ `https://localhost:3000/?debugnet`.

| Cờ           | Mô tả                                                                |
| :----------- | :------------------------------------------------------------------- |
| `?debugnet`  | Ghi log tất cả tin nhắn mạng đến và đi vào console                     |
| `?debugowner` | Ghi log tất cả yêu cầu và thay đổi quyền sở hữu vào console             |
| `?debugnetbin`| Ghi log thông tin bổ sung cho tin nhắn nhị phân đến và đi vào console |

## Các sự kiện vòng đời kết nối mạng

Các sự kiện sau đây có sẵn để lắng nghe trong các component của bạn. Chúng mô tả các sự kiện mạng phổ biến mà bạn có thể muốn phản ứng lại trong các component của mình, chẳng hạn như chính bạn hoặc người dùng khác tham gia hoặc rời phòng.

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

- [Xem tất cả các sự kiện Phòng trong tài liệu API](https://engine.needle.tools/docs/api/latest/RoomEvents)
- [Xem tất cả các sự kiện Quyền sở hữu trong tài liệu API](https://engine.needle.tools/docs/api/latest/OwnershipEvent)
- [Xem tất cả các sự kiện Kết nối trong tài liệu API](https://engine.needle.tools/docs/api/latest/ConnectionEvents)

## Sử dụng Máy chủ kết nối mạng Needle

Theo mặc định, các cảnh Needle có kết nối mạng kết nối với hạ tầng đám mây được quản lý và cung cấp bởi Needle. Không cần cài đặt bổ sung và hiện tại không có chi phí bổ sung nào cho việc sử dụng dịch vụ này.

Thông thường, điều này sẽ hoạt động tốt cho khoảng 15-20 người dùng trong cùng một phòng. Khi dự án của bạn trưởng thành, bạn có thể nâng cấp lên giải pháp kết nối mạng lớn hơn/tốt hơn/mạnh mẽ hơn bằng cách lưu trữ máy chủ kết nối mạng của riêng bạn.

## Lưu trữ Máy chủ kết nối mạng của riêng bạn

Bạn có thể muốn lưu trữ máy chủ kết nối mạng của riêng mình cho các triển khai lớn hơn hoặc để có nhiều quyền kiểm soát hơn đối với hạ tầng và triển khai kết nối mạng.

Máy chủ kết nối mạng của chúng tôi có sẵn trên NPM [gói kết nối mạng riêng](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking) dưới dạng gói node.js. Gói này chứa các tích hợp được cấu hình sẵn cho các framework web phổ biến [Fastify](https://www.npmjs.com/package/fastify) và [Express](https://www.npmjs.com/package/express), và có thể được tích hợp vào các framework máy chủ Node.js khác.

::: tip Để thử nghiệm nhanh: Remix trên Glitch
Bạn có thể remix một máy chủ kết nối mạng đơn giản chạy trên Glitch từ trang này: [needle-networking.glitch.me](https://needle-networking.glitch.me/) bằng cách nhấp vào nút ở góc dưới bên phải.

Phiên bản máy chủ Glitch mặc định nhỏ và chỉ có thể xử lý một số lượng người dùng hạn chế. Nếu bạn mong đợi hơn 15-20 người ở trong cảnh của mình cùng lúc, bạn nên xem xét lưu trữ máy chủ kết nối mạng của mình ở nơi khác (như trên Google Cloud hoặc AWS).
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
:::code-group-item Tích hợp tùy chỉnh
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

::: tip Ví dụ trên Glitch.com
Xem mã trên [glitch.com/edit/#!/needle-networking](https://glitch.com/edit/#!/needle-networking?path=server.js) để biết ví dụ về cách tích hợp Needle Networking với máy chủ Express.
:::

### Cấu hình

Các tùy chọn sau có sẵn:

| Tùy chọn                             | Mô tả                                                                                                                                                                                                 |
| :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options.endpoint` *string*          | Tùy chọn. Endpoint máy chủ tương đối. Ví dụ: `/socket` sẽ bắt đầu endpoint websocket trên `yourserver/socket`. Mặc định là `/`.                                                                          |
| `options.maxUsers` *number*          | Số lượng người dùng đồng thời tối đa trên một máy chủ. Mặc định là `50`.                                                                                                                               |
| `options.defaultUserTimeout` *number*| Thời gian tính bằng giây sau đó người dùng được coi là đã ngắt kết nối. Mặc định là `30`.                                                                                                             |
| `process.env.VIEW_ONLY_SALT` *string*| Giá trị muối được sử dụng để tạo ID phòng chỉ xem từ các ID phòng thông thường. Mặc định là một giá trị muối được định nghĩa trước.                                                                          |
| `process.env.NEEDLE_NETWORKING_S3_*` *string* | Bật lưu trữ S3. Xem phần dưới đây để biết danh sách đầy đủ các biến môi trường bạn cần thiết lập cho điều này. Khi không được thiết lập, bộ nhớ mặc định được sử dụng (tệp JSON trên đĩa). |

Máy chủ kết nối mạng sẽ tự động quản lý việc kết nối và ngắt kết nối người dùng, nhận và gửi tin nhắn, và duy trì trạng thái phòng.

Các máy chủ kết nối mạng tùy chỉnh có thể được triển khai ở bất kỳ đâu, ví dụ như trên Google Cloud. Để biết thêm hướng dẫn, vui lòng tham khảo kho lưu trữ này: [Máy chủ kết nối mạng cục bộ Needle](https://fwd.needle.tools/needle-engine/local-networking-repository)

::: tip Các vị trí máy chủ khác nhau cho phát triển cục bộ và được lưu trữ
Nếu bạn đang làm việc trên mã kết nối mạng tùy chỉnh, bạn có thể muốn sử dụng các vị trí máy chủ khác nhau cho phát triển cục bộ và ứng dụng được lưu trữ. Bạn có thể đặt các URL máy chủ riêng lẻ trong component `Networking`:

![Component kết nối mạng Needle Engine với máy chủ kết nối mạng được lưu trữ ở nơi khác](/imgs/networking_absolute.webp)
:::

#### Lưu trữ Trạng thái

Trạng thái mạng theo mặc định được lưu vào đĩa trên máy chủ dưới dạng tệp JSON trong thư mục `/.data`.
Mỗi phòng có tệp riêng và trạng thái được gửi đến các client kết nối khi họ tham gia phòng.

Tùy chọn, trạng thái kết nối mạng có thể được lưu trữ với nhà cung cấp lưu trữ tương thích S3. Sử dụng các biến môi trường sau để bật lưu trữ S3:

```bash
NEEDLE_NETWORKING_S3_ENDPOINT=
NEEDLE_NETWORKING_S3_REGION=
NEEDLE_NETWORKING_S3_BUCKET=
NEEDLE_NETWORKING_S3_ACCESS_KEY_ID=
NEEDLE_NETWORKING_S3_ACCESS_KEY=
NEEDLE_NETWORKING_S3_PREFIX= # all state saved in the bucket will be prefixed with this string. This can be a path e.g. `my_state/` or a unique id `server_123_`
```

## Máy chủ kết nối mạng cục bộ

Để kiểm tra và phát triển, bạn có thể chạy gói kết nối mạng Needle Engine trên máy chủ cục bộ. Chúng tôi đã chuẩn bị một kho lưu trữ được thiết lập để lưu trữ gói websocket và giúp bạn dễ dàng thực hiện điều đó.

1.  Tải xuống mẫu máy chủ cục bộ từ [github.com/needle-tools/networking-local](https://fwd.needle.tools/needle-engine/local-networking-repository)
2.  Làm theo hướng dẫn trong README để thiết lập máy chủ. Máy chủ sẽ chạy trên `wss://localhost:9001/socket` theo mặc định.
3.  Thêm component `Networking` vào cảnh của bạn.
4.  Dán địa chỉ máy chủ cục bộ vào trường `Localhost` trên component `Networking`.

## Nâng cao: Tùy chỉnh cài đặt WebRTC cho peer.js

Các component `Screencapture` (Chia sẻ màn hình) và `VoIP` (Giao tiếp thoại) của Needle Engine sử dụng [peer.js](https://peerjs.com/) để kết nối mạng âm thanh và video. Peer.js sử dụng WebRTC dưới nền.

Needle Engine sử dụng các giá trị mặc định hợp lý cho peerjs. Nếu bạn muốn sửa đổi các giá trị mặc định đó, bạn có thể gọi
```ts
setPeerOptions(opts: PeerjsOptions);
```
với các cài đặt tùy chỉnh của bạn. Điều này có thể được sử dụng để sửa đổi nhà cung cấp lưu trữ cho máy chủ ICE/STUN/TURN, ví dụ khi bạn sử dụng máy chủ WebRTC của riêng mình.

## Nâng cao: Định dạng thông báo của Máy chủ và Client

::: warning Chỉ dành cho mục đích thông tin. Hãy sử dụng các API được cung cấp bởi Needle Engine thay thế.
Thông thường, bạn không cần tương tác trực tiếp với các định dạng thông báo này, vì API kết nối mạng cấp thấp đã xử lý việc phân tích cú pháp tin nhắn và cung cấp cho bạn các loại dữ liệu chính xác. Thông tin ở đây được cung cấp cho người dùng nâng cao muốn hiểu các định dạng tin nhắn cơ bản hoặc triển khai các giải pháp kết nối mạng của riêng họ.
:::

Tin nhắn được gửi ở định dạng JSON. Chúng luôn có một trường `key` mô tả loại tin nhắn và một trường `data` chứa tải trọng tin nhắn. Trường `data` có thể là bất kỳ đối tượng nào có thể tuần tự hóa JSON.

### Các sự kiện phòng tích hợp sẵn

::::code-group
:::code-group-item Tham gia
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
:::code-group-item Rời đi
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
    "room": string,
    "viewId": string,
    "allowEditing": boolean,
    "inRoom": string[] // connection IDs
}
```
:::
:::code-group-item LeftRoom
```json
// Sent to the client when the local user has left a room.
// Type: LeftRoomResponse
{
    "key": "left-room",
    "room": string
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
    "room": string // room name 
}
```
:::
::::

### Các sự kiện tiện ích tích hợp sẵn

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
:::code-group-item Ping
```json
// Sent to the server every few seconds to keep the connection alive.
{
    "key": "ping",
    "data": {}
}
```
:::
:::code-group-item Pong
```json
// Sent by the server in response to a ping.
{
    "key": "pong",
    "data": {}
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

### Các sự kiện quyền sở hữu tích hợp sẵn

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

### Các schema Flatbuffer tích hợp sẵn

Tin nhắn Flatbuffer được gửi trực tiếp dưới dạng tin nhắn nhị phân.

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

## Nâng cao: Tin nhắn nhị phân ở định dạng Flatbuffer

Tin nhắn JSON dễ sử dụng và hiểu, nhưng thường lớn hơn về bộ nhớ và băng thông. Đối với lượng lớn dữ liệu hoặc khi gửi các cập nhật nhanh, tin nhắn nhị phân nhanh hơn và hiệu quả hơn. Bạn có thể sử dụng tin nhắn Flatbuffers trong Needle Engine cho những trường hợp cần thiết đó. Sử dụng Flatbuffers yêu cầu các bước cài đặt bổ sung như định nghĩa và biên dịch một schema tin nhắn và khó gỡ lỗi hơn vì bạn đang xử lý các tin nhắn nhị phân.

Lưu ý rằng khi gửi và nhận tin nhắn flatbuffer, không có trường `key` – loại tin nhắn là một phần của schema Flatbuffer. Những gì bạn gửi và nhận qua kết nối Websocket là một buffer nhị phân duy nhất.

Gửi tin nhắn nhị phân đến tất cả người dùng trong cùng một phòng:
```ts
this.context.connection.sendBinary(byteArray: Uint8Array);
```

Đăng ký nhận tin nhắn nhị phân ở định dạng Flatbuffer:
```ts
this.context.connection.beginListenBinary(identifier:string, callback:(data : ByteBuffer) => void);
```

Hủy đăng ký nhận tin nhắn nhị phân:
```ts
this.context.connection.stopListenBinary(identifier:string);
```

#### Mã mẫu Flatbuffers

Trước khi có thể gửi và nhận tin nhắn Flatbuffer, bạn cần định nghĩa một schema và biên dịch nó sang TypeScript. Sau đó, đăng ký schema với hệ thống kết nối mạng và sử dụng các phương thức schema đã tạo để tạo và phân tích cú pháp tin nhắn.

- [Các schema Flatbuffer tích hợp sẵn trong Needle Engine](#built-in-flatbuffer-schemas)
- [Tạo schema](https://google.github.io/flatbuffers/flatbuffers_guide_writing_schema.html)
- [Sử dụng trình biên dịch schema](https://google.github.io/flatbuffers/flatbuffers_guide_using_schema_compiler.html)
- [Flatbuffers trong Typescript](https://google.github.io/flatbuffers/flatbuffers_guide_use_typescript.html)

::::code-group
:::code-group-item Đăng ký schema
```ts
// Register a new Flatbuffer schema with the networking system
import { registerBinaryType } from '@needle-tools/engine';
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

registerBinaryType(MySchemaIdentifier, MyDataModel.getRootAsSyncedTransformModel);
```
:::
:::code-group-item Gửi tin nhắn
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
:::code-group-item Nhận tin nhắn
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

::: tip Tin nhắn Flatbuffer tùy chỉnh và tính bền vững
Hiện tại, các tin nhắn nhị phân tùy chỉnh không thể được duy trì trên máy chủ kết nối mạng. Sửa đổi máy chủ kết nối mạng và thêm các schema flatbuffer tùy chỉnh của bạn để đảm bảo thuộc tính guid có thể được xử lý.
:::

## Tóm tắt

Needle Engine làm cho chủ đề phức tạp của kết nối mạng trở nên dễ tiếp cận và dễ sử dụng. Bạn có thể bắt đầu với kết nối mạng tự động cho các component của mình chỉ với vài dòng mã và bạn có thể tìm hiểu sâu hơn về kết nối mạng thủ công khi cần kiểm soát nhiều hơn.

Trang được dịch tự động bằng AI