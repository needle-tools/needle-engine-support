---
title: Tạo và sử dụng Component
tags:
    - scripting
    - serialization
    - csharp
    - typescript
    - javascript
    - components
---

# Tạo component tùy chỉnh

Nếu bạn mới làm quen với lập trình script, chúng tôi **rất khuyến khích** bạn đọc các hướng dẫn sau trước:

- [Kiến thức TypeScript cơ bản](./getting-started/typescript-essentials.md)
- [Needle Engine cho nhà phát triển Unity](./getting-started/for-unity-developers.md)

Nếu bạn đã biết mình đang làm gì, cứ thoải mái truy cập trực tiếp vào [tài liệu API của Needle Engine](https://engine.needle.tools/docs/api/latest).

---

Mã runtime cho Needle Engine được viết bằng [TypeScript](https://typescriptlang.org) (được khuyến khích) hoặc [JavaScript](https://javascript.info/). Chúng tôi tự động tạo các C# stub component từ đó, bạn có thể thêm chúng vào các GameObject trong trình chỉnh sửa. Các C# component và dữ liệu của chúng được runtime tạo lại dưới dạng JavaScript component với dữ liệu tương tự và được đính kèm vào các đối tượng three.js.

Cả custom component lẫn built-in Unity component đều có thể được ánh xạ tới JavaScript component theo cách này. Ví dụ, ánh xạ cho nhiều built-in component liên quan đến hoạt hình, kết xuất hoặc vật lý đã [được bao gồm trong Needle Engine](./component-reference.md#unity-components).

Nếu bạn muốn thực hành theo các ví dụ sau mà không cần cài đặt bất cứ thứ gì, bạn chỉ cần nhấp vào liên kết sau:

- [Tạo không gian làm việc ảo để thực hành mã](https://stackblitz.com/fork/github/needle-engine/vite-template?file=src%2Fmain.ts).

----

Engine runtime trên web của chúng tôi áp dụng mô hình component tương tự như Unity và do đó cung cấp nhiều chức năng quen thuộc.
Component được đính kèm vào đối tượng Object3D của three có các phương thức vòng đời như ``awake``, ``start``, ``onEnable``, ``onDisable``, ``update`` và ``lateUpdate`` mà bạn có thể implement. Bạn cũng có thể sử dụng [Coroutines](#coroutines).

----

## Khi bạn không cần viết mã

Thông thường, các cảnh tương tác có thể được thực hiện bằng cách sử dụng Event trong Unity và gọi các phương thức trên built-in component. Một ví dụ điển hình là phát hoạt hình khi nhấn nút - bạn tạo một nút, thêm sự kiện Click trong inspector và gọi Animator.SetTrigger hoặc tương tự để phát hoạt hình cụ thể.

Needle Engine dịch các Unity Event thành các lệnh gọi phương thức JavaScript, điều này làm cho quy trình làm việc này rất nhanh và linh hoạt - bạn thiết lập các sự kiện như thường lệ và khi chúng được gọi, chúng sẽ hoạt động giống như trong Unity.

![image](https://user-images.githubusercontent.com/2693840/187314594-7e34905d-e704-4fa3-835c-6b40f11e1c62.png)
_Ví dụ về một Button Click Event hoạt động sẵn sàng trong Needle Engine — không cần mã._

## Tạo component mới
Script được viết bằng TypeScript (được khuyến nghị) hoặc JavaScript.
Có hai cách để thêm script tùy chỉnh vào dự án của bạn:

- Chỉ cần thêm một tệp với đuôi `.ts` hoặc `.js` bên trong thư mục `src/scripts/` trong thư mục dự án được tạo của bạn, ví dụ: `src/scripts/MyFirstScript.ts`

- Cụ thể cho Unity:
  Tổ chức mã của bạn thành NPM Definition Files (npm packages). Điều này giúp bạn mô-đun hóa và tái sử dụng mã giữa các dự án và nếu bạn quen thuộc với phát triển web thì chúng thực chất là các npm package thông thường được cài đặt cục bộ.
  Trong Unity, bạn có thể tạo tệp NpmDef thông qua `Create > NPM Definition` và sau đó thêm các tệp TypeScript bằng cách nhấp chuột phải vào tệp NpmDef và chọn `Create > TypeScript`. Vui lòng xem [chương này](./project-structure.md#npm-definition-files) để biết thêm thông tin.

Trong cả hai cách tiếp cận, các thư mục nguồn được theo dõi sự thay đổi và C# stub component hoặc Blender panels được tạo lại bất cứ khi nào phát hiện sự thay đổi.
Các thay đổi đối với tệp nguồn cũng dẫn đến tải lại nóng (hot reload) trang web đang chạy – bạn không cần chờ Unity biên dịch lại các C# component. Điều này giúp việc lặp lại mã diễn ra gần như tức thời.

Bạn thậm chí có thể có nhiều loại component trong một tệp (ví dụ: bạn có thể khai báo ``export class MyComponent1`` và ``export class MyOtherComponent`` trong cùng một tệp Typescript).

Nếu bạn mới bắt đầu viết Javascript hoặc Typescript, chúng tôi khuyên bạn nên đọc [Hướng dẫn TypeScript Essentials](./getting-started/typescript-essentials.md) trước khi tiếp tục với hướng dẫn này.

:::details Ví dụ: Tạo một Component làm quay một đối tượng

- **Tạo một component làm quay một đối tượng**
  Tạo ``src/scripts/Rotate.ts`` và thêm mã sau:
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class Rotate extends Behaviour
{
    @serializable()
    speed : number = 1;

    start(){
        // logging this is useful for debugging in the browser.
        // You can open the developer console (F12) to see what data your component contains
        console.log(this);
    }

    // update will be called every frame
    update(){
        this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
    }
}
```

Bây giờ, trong Unity, một script mới có tên ``Rotate.cs`` sẽ được tự động tạo. Thêm component Unity mới này vào một Cube và lưu cảnh.
Cube bây giờ sẽ quay trong trình duyệt.
Mở bảng điều khiển dành cho nhà phát triển Chrome bằng ``F12`` để kiểm tra log từ phương thức ``Rotate.start``. Đây là một thực hành hữu ích để tìm hiểu và gỡ lỗi các trường dữ liệu nào được xuất và hiện đang được gán. Nói chung, tất cả các trường dữ liệu công khai và có thể tuần tự hóa cũng như tất cả các thuộc tính công khai đều được xuất.

Bây giờ thêm một trường dữ liệu mới ``public float speed = 5`` vào component Unity của bạn và lưu lại. Inspector của component Rotate giờ đây hiển thị một trường ``speed`` mà bạn có thể chỉnh sửa. Lưu cảnh (hoặc nhấp vào nút ``Build``) và lưu ý rằng JavaScript component giờ đây đã được gán giá trị ``speed`` được xuất.
:::

:::details Tạo component với hàm tùy chỉnh
Tham khảo [Hướng dẫn TypeScript Essentials](./getting-started/typescript-essentials.md) để tìm hiểu thêm về cú pháp và ngôn ngữ.
```ts twoslash
import { Behaviour } from "@needle-tools/engine";

export class PrintNumberComponent extends Behaviour
{
    start(){
      this.printNumber(42);
    }

    private printNumber(myNumber : number){
        console.log("My Number is: " + myNumber);
    }
}
```
:::

:::details Version Control & Unity
Mặc dù các C# component được tạo sử dụng tên kiểu để tạo GUID ổn định, chúng tôi khuyên nên đưa (check in) các component được tạo vào hệ thống kiểm soát phiên bản như một thực hành tốt.
:::

## Kiến trúc component
Component được thêm vào Object3D của three.js. Điều này tương tự như cách Component trong Unity được thêm vào GameObject. Do đó, khi chúng ta muốn truy cập một Object3D của three.js, chúng ta có thể truy cập nó dưới dạng ``this.gameObject``, trả về Object3D mà component được đính kèm vào.

***Lưu ý**: Đặt ``visible`` thành false trên một Object3D sẽ hoạt động giống như ``SetActive(false)`` trong Unity - nghĩa là nó cũng sẽ vô hiệu hóa tất cả các component hiện tại trên đối tượng này và các đối tượng con của nó. Sự kiện Update cho các component không hoạt động sẽ không được gọi cho đến khi ``visible`` được đặt lại thành true.* Nếu bạn muốn ẩn một đối tượng mà không ảnh hưởng đến các component, bạn chỉ cần vô hiệu hóa component Needle Engine ``Renderer``.

### Các phương thức vòng đời

Lưu ý rằng các phương thức vòng đời chỉ được gọi khi chúng được khai báo. Vì vậy, chỉ khai báo các phương thức vòng đời `update` khi thực sự cần thiết, nếu không có thể ảnh hưởng đến hiệu suất nếu bạn có nhiều component với vòng lặp update không làm gì cả.

| Tên phương thức | Mô tả |
| -- | --
| ``awake()`` | Phương thức đầu tiên được gọi khi một component mới được tạo
| ``onEnable()`` | Được gọi khi một component được bật (ví dụ: khi ``enabled`` thay đổi từ false sang true)
| ``onDisable()`` | Được gọi khi một component bị vô hiệu hóa (ví dụ: khi ``enabled`` thay đổi từ true sang false)
| ``onDestroy()`` | Được gọi khi Object3D hoặc component đang bị hủy
| ``start()`` | Được gọi khi bắt đầu khung hình đầu tiên sau khi component được tạo
| ``earlyUpdate()`` | Sự kiện update đầu tiên
| ``update()`` | Sự kiện update mặc định
| ``lateUpdate()`` | Được gọi sau update
| ``onBeforeRender()`` | Sự kiện update cuối cùng trước khi gọi render
| ``onAfterRender()`` | Được gọi sau sự kiện render

### Các phương thức sự kiện vật lý
| Tên phương thức | Mô tả |
| -- | --
| ``onCollisionEnter(col : Collision)`` |
| ``onCollisionStay(col : Collision)`` |
| ``onCollisionExit(col : Collision)`` |
| ``onTriggerEnter(col : Collision)`` |
| ``onTriggerStay(col : Collision)`` |
| ``onTriggerExit(col : Collision)`` |

### Các phương thức sự kiện đầu vào
| Tên phương thức | Mô tả |
| -- | --
| ``onPointerEnter(args : PointerEventData)`` | Được gọi khi con trỏ bắt đầu di chuột qua một đối tượng (hoặc bất kỳ đối tượng con nào của nó)
| ``onPointerMove(args : PointerEventData)`` | Được gọi khi con trỏ di chuyển qua một đối tượng (hoặc bất kỳ đối tượng con nào của nó)
| ``onPointerExit(args : PointerEventData)`` | Được gọi khi con trỏ rời khỏi (dừng di chuột) một đối tượng
| ``onPointerDown(args : PointerEventData)`` | Được gọi khi con trỏ được nhấn trên một đối tượng
| ``onPointerUp(args : PointerEventData)`` | Được gọi khi con trỏ được nhả ra trên một đối tượng
| ``onPointerClick(args : PointerEventData)`` | Được gọi khi con trỏ được nhấp trên một đối tượng


### Các phương thức sự kiện XR
*yêu cầu Needle Engine >= 3.32.0*
| Tên phương thức | Mô tả |
| -- | --
| ``supportsXR(mode: XRSessionMode)`` | Tùy chọn implement nếu bạn chỉ muốn nhận các callback XR cho các chế độ XR cụ thể như ``immersive-vr`` hoặc ``immersive-ar``. Trả về ``true`` để thông báo cho hệ thống rằng bạn muốn nhận callback cho chế độ được truyền vào
| ``onBeforeXR(mode: XRSessionMode, init: XRSessionInit)`` | Được gọi ngay trước khi XRSession được yêu cầu và có thể được sử dụng để sửa đổi đối tượng XRSessionInit
| ``onEnterXR(args: NeedleXREventArgs)`` | Callback khi component này tham gia một xr session (hoặc trở nên hoạt động trong một XR session đang chạy)
| ``onUpdateXR(args: NeedleXREventArgs)`` | Callback khi một xr session cập nhật (trong khi nó vẫn đang hoạt động trong XR session)
| ``onLeaveXR(args: NeedleXREventArgs)`` | Callback khi component này thoát khỏi một xr session (hoặc khi nó trở nên không hoạt động trong một XR session đang chạy)
| ``onControllerAdded(args: NeedleXRControllerEventArgs)`` | Callback khi một controller được kết nối/thêm trong khi đang trong một XR session HOẶC khi component tham gia một XR session đang chạy đã có controller được kết nối HOẶC khi component trở nên hoạt động trong một XR session đang chạy đã có controller được kết nối
| ``onControllerRemoved(args: NeedleXRControllerEventArgs)`` | Callback khi một controller bị gỡ bỏ trong khi đang trong một XR session HOẶC khi component trở nên không hoạt động trong một XR session đang chạy

#### Các sự kiện XR bổ sung

| Tên phương thức | Mô tả |
| -- | --
| ``window.addEventListener("needle-xrsession-start")`` | CustomEvent được gọi khi XRSession bắt đầu. ``details`` chứa ``NeedleXRSession``
| ``window.addEventListener("needle-xrsession-end")`` | CustomEvent được gọi khi XRSession bắt đầu. ``details`` chứa ``NeedleXRSession``
| ``onXRSessionStart(args: { session:NeedleXRSession } )`` | Hook sự kiện toàn cục. Để hủy đăng ký sử dụng ``offXRSessionStart``


### Coroutines

Coroutines có thể được khai báo bằng cách sử dụng [JavaScript Generator Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).
Để bắt đầu một coroutine, gọi ``this.startCoroutine(this.myRoutineName());``

**Ví dụ**
```ts twoslash
import { Behaviour, FrameEvent } from "@needle-tools/engine";

export class Rotate extends Behaviour {

    start() {
        // the second argument is optional and allows you to specifiy
        // when it should be called in the current frame loop
        // coroutine events are called after regular component events of the same name
        // for example: Update coroutine events are called after component.update() functions
        this.startCoroutine(this.rotate(), FrameEvent.Update);
    }

    // this method is called every frame until the component is disabled
    *rotate() {
        // keep looping forever
        while (true) {
            yield;
        }
    }
}
```

Để dừng một coroutine, bạn có thể thoát khỏi routine bằng cách trả về từ nó, hoặc lưu giá trị trả về của ``startCoroutine`` vào bộ nhớ cache và gọi ``this.stopCoroutine(<...>)``. Tất cả các Coroutines đều bị dừng ở ``onDisable`` / khi vô hiệu hóa một component.

## Các hook vòng đời đặc biệt

Needle Engine cũng cung cấp một vài hook vòng đời mà bạn có thể sử dụng để móc nối vào vòng lặp update mà không cần viết một component đầy đủ.
Các hook này có thể được chèn vào bất kỳ điểm nào trong ứng dụng web của bạn (ví dụ: trong phạm vi cấp cao nhất hoặc trong một svelte component)
| Tên phương thức | Mô tả |
| -- | --
| ``onInitialized(cb, options)`` | Được gọi khi một ngữ cảnh mới được khởi tạo (trước khung hình đầu tiên)
| ``onClear(cb, options)`` | Đăng ký một callback trước khi ngữ cảnh engine bị xóa
| ``onDestroy(cb, options)`` | Đăng ký một callback trong engine trước khi ngữ cảnh bị hủy
| ``onStart(cb, options)`` | Được gọi ngay sau khi component ``start`` ở đầu một khung hình
| ``onUpdate(cb, options)`` | Được gọi ngay sau khi component ``update``
| ``onBeforeRender(cb, options)`` | Được gọi trước khi gọi render
| ``onAfterRender(cb, options)`` | Được gọi trước khi gọi render

Ví dụ ([Xem ví dụ trên stackblitz](https://stackblitz.com/edit/needle-engine-lifecycle-hooks?file=src%2Fmain.ts))
```ts twoslash
// this can be put into e.g. main.ts or a svelte component (similar to onMount)
import { onStart, onUpdate, onBeforeRender, onAfterRender } from "@needle-tools/engine"

onStart(ctx => console.log("Hello Scene", ctx.scene));

onUpdate(ctx => {
    // do something... e.g. access the frame # or deltatime via ctx.time
    console.log("UPDATE", ctx.time.frame);
});

onBeforeRender(ctx => {
    // this event is only called once because of the { once: true } argument
    console.log("ON BEFORE RENDER", ctx.time.frame);
}, { once: true } );

// Every event hook returns a method to unsubscribe from the event
const unsubscribe = onAfterRender(ctx => {
    console.log("ON AFTER RENDER", ctx.time.frame);
});
// Unsubscribe from the event at any time
setTimeout(()=> unsubscribe(), 1000);
```

## Tìm kiếm, thêm và xóa component

Để truy cập các component khác, sử dụng các phương thức static trên ``GameObject`` hoặc các phương thức của ``this.gameObject``. Ví dụ, để truy cập một component ``Renderer`` trong đối tượng cha, sử dụng ``GameObject.getComponentInParent(this.gameObject, Renderer)`` hoặc ``this.gameObject.getComponentInParent(Renderer)``.

**Ví dụ:**
```ts twoslash
import { Behaviour, GameObject, Renderer } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    start() {
        const renderer = GameObject.getComponentInParent(this.gameObject, Renderer);
        console.log(renderer);
    }
}
```

### Một số phương thức khả dụng:

| Phương thức |  |
| -- | --
| ``GameObject.instantiate(Object3D, InstantiateOptions)`` | Tạo một instance mới của đối tượng này bao gồm các instance mới của tất cả các component của nó
| ``GameObject.destroy(Object3D \| Component)`` | Hủy một component hoặc Object3D (và các component của nó)
| ``GameObject.addNewComponent(Object3D, Type)`` | Thêm (và tạo) một component mới cho một loại vào đối tượng được cung cấp. Lưu ý rằng ``awake`` và ``onEnable`` đã được gọi khi component được trả về
| ``GameObject.addComponent(Object3D, Component)`` | Di chuyển một instance component đến đối tượng được cung cấp. Hữu ích nếu bạn đã có một instance, ví dụ khi bạn tạo một component bằng ``new MyComponent()`` và sau đó đính kèm nó vào một đối tượng
| ``GameObject.removeComponent(Component)`` | Xóa một component khỏi một gameObject
| ``GameObject.getComponent(Object3D, Type)`` | Trả về component đầu tiên khớp với một loại trên đối tượng được cung cấp.
| ``GameObject.getComponents(Object3D, Type)`` | Trả về tất cả các component khớp với một loại trên đối tượng được cung cấp.
| ``GameObject.getComponentInChildren`` | Tương tự như ``getComponent`` nhưng cũng tìm kiếm trong các đối tượng con.
| ``GameObject.getComponentsInChildren`` | Tương tự như ``getComponents`` nhưng cũng tìm kiếm trong các đối tượng con.
| ``GameObject.getComponentInParent`` | Tương tự như ``getComponent`` nhưng cũng tìm kiếm trong các đối tượng cha.
| ``GameObject.getComponentsInParent`` | Tương tự như ``getComponents`` nhưng cũng tìm kiếm trong các đối tượng cha.
| ``GameObject.findObjectOfType`` | Tìm kiếm toàn bộ cảnh cho một loại.
| ``GameObject.findObjectsOfType`` | Tìm kiếm toàn bộ cảnh cho tất cả các loại khớp.

## Three.js và HTML DOM

Ngữ cảnh đề cập đến runtime bên trong một [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
Cảnh three.js nằm bên trong một custom HTML component có tên ``<needle-engine>`` (xem *index.html* trong dự án của bạn). Bạn có thể truy cập web component ``<needle-engine>`` bằng cách sử dụng ``this.context.domElement``.

Kiến trúc này cho phép có khả năng có nhiều cảnh WebGL của needle trên cùng một trang web, có thể chạy độc lập hoặc giao tiếp với nhau như các phần của trang web của bạn.

### Truy cập cảnh
Để truy cập cảnh hiện tại từ một component, bạn sử dụng ``this.scene``, tương đương với ``this.context.scene``, điều này cung cấp cho bạn đối tượng scene root của three.js.

Để duyệt qua hệ thống phân cấp từ một component, bạn có thể lặp qua các đối tượng con của một đối tượng
bằng vòng lặp for:
```ts twoslash
for(let i = 0; i < this.gameObject.children; i++)
    console.log(this.gameObject.children[i]);
```
hoặc bạn có thể lặp bằng cách sử dụng phương thức tương đương ``foreach``:
```ts twoslash
for(const child of this.gameObject.children) {
    console.log(child);
}
```
Bạn cũng có thể sử dụng các phương thức cụ thể của three.js để lặp nhanh chóng tất cả các đối tượng đệ quy bằng phương thức [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse):
```ts twoslash
import { Object3D } from "three";
this.gameObject.traverse((obj: Object3D) => console.log(obj));
```
hoặc để chỉ duyệt qua các đối tượng hiển thị, sử dụng [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) thay thế.

Một tùy chọn khác khá hữu ích khi bạn chỉ muốn lặp qua các đối tượng có thể kết xuất (renderable), bạn có thể truy vấn tất cả các component renderer và lặp qua chúng như sau:
```ts twoslash
import { Renderer } from "@needle-tools/engine";
for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
Để biết thêm thông tin về việc lấy component, xem phần tiếp theo.

### Thời gian
Sử dụng ``this.context.time`` để truy cập dữ liệu thời gian:
- ``this.context.time.time`` là thời gian kể từ khi ứng dụng bắt đầu chạy
- ``this.context.time.deltaTime`` là thời gian đã trôi qua kể từ khung hình cuối cùng
- ``this.context.time.frameCount`` là số lượng khung hình đã trôi qua kể từ khi ứng dụng bắt đầu
- ``this.context.time.realtimeSinceStartup`` là thời gian không được chia tỷ lệ kể từ khi ứng dụng bắt đầu chạy

Cũng có thể sử dụng ``this.context.time.timeScale`` để cố ý làm chậm thời gian cho các hiệu ứng chuyển động chậm (slow motion).

### Đầu vào
Nhận dữ liệu đầu vào cho đối tượng mà component đang ở trên:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onPointerDown() {
        console.log("POINTER DOWN on " + this.gameObject.name);
    }
}
```

Bạn cũng có thể đăng ký các sự kiện toàn cục trong enum ``InputEvents`` như sau:
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable() {
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    onDisable() {
        // it is recommended to also unsubscribe from events when your component becomes inactive
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    // @nonSerialized
    inputPointerDown = (evt: NEPointerEvent) => { console.log("POINTER DOWN anywhere on the <needle-engine> element"); }
}
```

Hoặc sử dụng ``this.context.input`` nếu bạn muốn kiểm tra trạng thái đầu vào (poll input state) mỗi khung hình:

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update() {
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN anywhere")
        }
    }
}
```

Nếu bạn muốn tự xử lý đầu vào, bạn cũng có thể đăng ký [tất cả các sự kiện mà trình duyệt cung cấp](https://developer.mozilla.org/en-US/docs/Web/Events) (có rất nhiều). Ví dụ, để đăng ký sự kiện click của trình duyệt, bạn có thể viết:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onEnable() {
        window.addEventListener("click", this.windowClick);
    }

    onDisable() {
        // unsubscribe again when the component is disabled
        window.removeEventListener("click", this.windowClick);
    }

    windowClick = () => { console.log("CLICK anywhere on the page, not just on <needle-engine>"); }
}
```
Lưu ý rằng trong trường hợp này, bạn phải tự xử lý tất cả các trường hợp. Ví dụ, bạn có thể cần sử dụng các sự kiện khác nhau nếu người dùng truy cập trang web của bạn trên máy tính để bàn so với thiết bị di động so với thiết bị VR. Các trường hợp này được tự động xử lý bởi các sự kiện đầu vào của Needle Engine (ví dụ: ``PointerDown`` được kích hoạt cho cả chuột nhấn, chạm màn hình và trong trường hợp VR là nút controller nhấn).

### Raycasting

Sử dụng ``this.context.physics.raycast()`` để thực hiện một raycast và nhận danh sách các giao điểm. Nếu bạn không truyền bất kỳ tùy chọn nào, raycast được thực hiện từ vị trí chuột (hoặc vị trí chạm đầu tiên) trong không gian màn hình (screenspace) bằng cách sử dụng ``mainCamera`` đang hoạt động. Bạn cũng có thể truyền vào một đối tượng ``RaycastOptions`` có nhiều cài đặt khác nhau như ``maxDistance``, camera được sử dụng hoặc các lớp (layers) để kiểm tra.

Sử dụng ``this.context.physics.raycastFromRay(your_ray)`` để thực hiện một raycast bằng cách sử dụng một [three.js ray](https://threejs.org/docs/#api/en/math/Ray).

> **Lưu ý**: Loại raycast này chiếu một tia (ray) vào tất cả các đối tượng hiển thị trong cảnh. Không cần physics engine, điều này khác với hành vi trong Unity, nơi bạn luôn cần collider để va chạm với đối tượng. Nếu bạn muốn chiếu chỉ vào các physics collider, sử dụng các phương thức ``physics.engine.raycast`` được mô tả dưới đây.

#### Cân nhắc hiệu suất

Khi sử dụng cài đặt nén mặc định của Needle, các phiên bản lưới (mesh) được đơn giản hóa sẽ được tự động tạo và cũng được sử dụng cho raycasting. Tuy nhiên, một số loại lưới vẫn chậm – ví dụ, skinned mesh hoặc mesh có blendshape yêu cầu các phép tính tốn kém để xác định va chạm chính xác. Cân nhắc đặt các đối tượng đó vào lớp ``Ignore Raycast`` trong Unity để tránh raycasting vào chúng.

#### Raycasting dựa trên vật lý

Một tùy chọn khác là sử dụng các phương thức raycast vật lý sẽ chỉ trả về các va chạm với collider trong cảnh.

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Dưới đây là một [ví dụ có thể chỉnh sửa cho physics raycast](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)

### Mạng
Các phương thức mạng có thể được truy cập thông qua ``this.context.connection``. Vui lòng tham khảo [tài liệu mạng](./networking.md) để biết thêm thông tin.


## Truy cập Needle Engine và component từ bất cứ đâu
Có thể truy cập tất cả chức năng được mô tả ở trên bằng cách sử dụng mã JavaScript thông thường không nằm bên trong các component và nằm ở nơi khác. Tất cả các component và chức năng của runtime của needle đều có thể truy cập thông qua namespace toàn cục ``Needle`` (bạn có thể viết ``console.log(Needle)`` để có cái nhìn tổng quan).

Bạn có thể tìm component bằng cách sử dụng ``Needle.findObjectOfType(Needle.AudioSource)`` chẳng hạn. Nên lưu trữ các tham chiếu này vào bộ nhớ cache, vì việc tìm kiếm toàn bộ cảnh lặp đi lặp lại tốn kém. Xem danh sách về [tìm kiếm, thêm và xóa component](#finding-adding-and-removing-components) ở trên.

Để nhận các callback khi tải cảnh ban đầu, xem ví dụ sau:
```js
<needle-engine loadstart="loadingStarted" progress="loadingProgress" loadfinished="loadingFinished"></needle-engine>

<script type="text/javascript">
function loadingStarted() { console.log("START") }
function loadingProgress() { console.log("LOADING...") }
function loadingFinished() { console.log("FINISHED!") }
</script>
```

Bạn cũng có thể đăng ký ``NeedleEngine`` toàn cục (đôi khi còn được gọi là *ContextRegistry*) để nhận callback khi ngữ cảnh Needle Engine đã được tạo hoặc để truy cập tất cả các ngữ cảnh có sẵn:
```ts twoslash
class YourComponentType extends Behaviour {}
//---cut---
import { NeedleEngine, GameObject, Behaviour } from "@needle-tools/engine";

NeedleEngine.addContextCreatedCallback((args) => {
  const context = args.context;
  const scene = context.scene;
  const myInstance = GameObject.getComponentInChildren(scene, YourComponentType);
});
```

Một tùy chọn khác là sử dụng [hook vòng đời](#special-lifecycle-hooks) ``onInitialized(ctx => {})``.

Bạn cũng có thể truy cập tất cả các ngữ cảnh có sẵn thông qua ``NeedleEngine.Registered``, trả về mảng nội bộ. (Lưu ý rằng mảng này không nên được sửa đổi nhưng có thể được sử dụng để lặp qua tất cả các ngữ cảnh đang hoạt động để sửa đổi cài đặt, ví dụ: đặt tất cả các ngữ cảnh thành ``context.isPaused = true``)

Dưới đây là danh sách các sự kiện khả dụng trên kiểu ``NeedleEngine`` static.
Bạn có thể đăng ký các sự kiện này thông qua ``NeedleEngine.registerCallback(ContextEvent.ContextCreated, (args) => {})``.

| Các tùy chọn ContextEvent | |
|---|---|
| ``ContextEvent.ContextRegistered`` | Được gọi khi ngữ cảnh được đăng ký vào registry. |
| ``ContextEvent.ContextCreationStart`` | Được gọi trước khi glb đầu tiên được tải và có thể được sử dụng để khởi tạo physics engine. Có thể trả về một promise |
| ``ContextEvent.ContextCreated`` | Được gọi khi ngữ cảnh đã được tạo trước khung hình đầu tiên |
| ``ContextEvent.ContextDestroyed`` | Được gọi khi ngữ cảnh đã bị hủy |
| ``ContextEvent.MissingCamera`` | Được gọi khi ngữ cảnh không tìm thấy camera, hiện chỉ được gọi trong quá trình tạo |
| ``ContextEvent.ContextClearing`` | Được gọi khi ngữ cảnh đang được xóa: tất cả các đối tượng trong cảnh đang bị hủy và trạng thái nội bộ được đặt lại |
| ``ContextEvent.ContextCleared`` | Được gọi sau khi ngữ cảnh đã được xóa |

## Gizmos

Lớp ``Gizmos`` static có thể được sử dụng để vẽ đường, hình dạng và văn bản, chủ yếu hữu ích cho việc gỡ lỗi.
Tất cả các hàm gizmos đều có nhiều tùy chọn, ví dụ: màu sắc hoặc thời gian chúng nên được hiển thị trong cảnh. Bên trong, chúng được lưu vào bộ nhớ cache và tái sử dụng.

| Gizmos | |
| -- | -- |
| ``Gizmos.DrawLabel`` | Vẽ một nhãn tùy chọn có nền. Có thể đính kèm vào một đối tượng. Trả về một handle Label có thể được sử dụng để cập nhật văn bản. |
| ``Gizmos.DrawRay`` | Nhận một điểm gốc và hướng trong worldspace để vẽ một đường ray vô hạn |
| ``Gizmos.DrawDirection`` | Nhận một điểm gốc và hướng để vẽ một hướng trong worldspace |
| ``Gizmos.DrawLine`` | Nhận hai điểm vec3 trong worldspace để vẽ một đường thẳng |
| ``Gizmos.DrawWireSphere`` | Vẽ một quả cầu khung dây (wireframe) trong worldspace |
| ``Gizmos.DrawSphere`` | Vẽ một quả cầu đặc trong worldspace |
| ``Gizmos.DrawWireBox`` | Vẽ một hộp khung dây (wireframe) trong worldspace |
| ``Gizmos.DrawWireBox3`` | Vẽ một hộp wireframe box3 |
| ``Gizmos.DrawArrow`` | Vẽ một mũi tên nhận hai điểm trong worldspace |


## Tuần tự hóa (Serialization) / Component trong tệp glTF
Để nhúng component và tạo lại component với các kiểu chính xác trong glTF, chúng ta cũng cần lưu các kiểu không nguyên thủy (mọi thứ không phải là ``Number``, ``Boolean`` hoặc ``String``). Bạn có thể làm điều đó bằng cách thêm decorator ``@serializable(<type>)`` phía trên trường dữ liệu hoặc thuộc tính của bạn.

**Ví dụ:**
@[code ts twoslash](@code/component-object-reference.ts)

Để tuần tự hóa từ và sang các định dạng tùy chỉnh, có thể mở rộng từ lớp ``TypeSerializer`` và tạo một instance. Sử dụng ``super()`` trong hàm tạo (constructor) để đăng ký các kiểu được hỗ trợ.

> **Lưu ý**: Ngoài các trường dữ liệu khớp, các thuộc tính khớp cũng sẽ được xuất khi chúng khớp với các trường dữ liệu trong tệp typescript.

## Tải cảnh
Trong Unity, các Prefab, SceneAsset và AssetReference (Unity's Addressable System) được tham chiếu sẽ tự động được xuất dưới dạng tệp glTF (vui lòng tham khảo tài liệu [Export Prefabs](export.md)).

Các tệp gltf đã xuất này sẽ được tuần tự hóa dưới dạng URI chuỗi đơn giản. Để đơn giản hóa việc tải chúng từ các component TypeScript, chúng tôi đã thêm khái niệm về các kiểu ``AssetReference``. Chúng có thể được tải ở runtime và do đó cho phép hoãn việc tải các phần của ứng dụng hoặc tải nội dung bên ngoài.

**Ví dụ:**
@[code ts twoslash](@code/component-prefab.ts)

AssetReference được lưu vào bộ nhớ cache bằng URI, vì vậy nếu bạn tham chiếu cùng một tệp glTF/Prefab đã xuất trong nhiều component/script, nó sẽ chỉ được tải một lần và sau đó được tái sử dụng.

# Các bước tiếp theo

Page automatically translated using AI