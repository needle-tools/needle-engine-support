---
title: Giới thiệu về Scripting cho các nhà phát triển Unity
---

Needle Engine cung cấp sự tích hợp chặt chẽ vào Unity Editor. Điều này cho phép cả nhà phát triển và nhà thiết kế cùng làm việc trong một môi trường quen thuộc và mang đến những trải nghiệm web nhanh, hiệu quả và nhẹ nhàng.

Hướng dẫn sau đây chủ yếu nhắm đến các nhà phát triển có kinh nghiệm với Unity3D, nhưng nó cũng có thể hữu ích cho các nhà phát triển có kinh nghiệm về web hoặc three.js. Nó bao gồm các chủ đề liên quan đến cách thực hiện mọi thứ trong Unity so với trong three.js hoặc Needle Engine.

Nếu bạn hoàn toàn mới với Typescript và Javascript và muốn tìm hiểu sâu về việc viết script cho Needle Engine, chúng tôi cũng khuyên bạn nên đọc [Hướng dẫn cơ bản về Typescript](./typescript-essentials) để hiểu cơ bản về sự khác biệt giữa C# và Javascript/Typescript.

Nếu bạn muốn code theo, bạn có thể [mở engine.needle.tools/new](https://engine.needle.tools/new) để tạo một dự án nhỏ mà bạn có thể chỉnh sửa trong trình duyệt ⚡

## Những điều cơ bản
Needle Engine là một engine web 3D chạy trên nền [three.js](https://threejs.org/). Three.js là một trong những thư viện render 3D dựa trên webgl phổ biến nhất cho web. Bất cứ khi nào chúng ta đề cập đến một `gameObject` trong Needle Engine, chúng ta *thực sự* cũng đang nói về một `Object3D` của three.js, loại cơ sở của bất kỳ đối tượng nào trong three.js. Cả hai thuật ngữ có thể được sử dụng thay thế cho nhau. Bất kỳ `gameObject` *đều là* một `Object3D`.

Điều này cũng có nghĩa là - nếu bạn đã quen thuộc với three.js - bạn sẽ không gặp vấn đề gì khi sử dụng Needle Engine. Mọi thứ bạn có thể làm với three.js đều có thể được thực hiện trong Needle Engine. Nếu bạn đã sử dụng một số thư viện nhất định, bạn cũng có thể sử dụng chúng trong môi trường dựa trên Needle Engine.

Lưu ý: **Exporter của Needle Engine _KHÔNG_ biên dịch mã C# hiện có của bạn sang Web Assembly**.
Mặc dù sử dụng Web Assembly *có thể* mang lại hiệu suất tốt hơn khi chạy, nhưng nó phải trả giá đắt cho tốc độ lặp lại và tính linh hoạt trong việc xây dựng trải nghiệm web. Đọc thêm về [tầm nhìn](./../vision.md) và [tổng quan kỹ thuật](./../technical-overview.md) của chúng tôi.

:::details Cách tạo một dự án Unity mới với Needle Engine? (Video)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />
:::

## Tạo Component
Trong Unity, bạn tạo một component mới bằng cách kế thừa từ `MonoBehaviour`:
```csharp
using UnityEngine;
public class MyComponent : MonoBehaviour {
}
```

Mặt khác, một component tùy chỉnh trong Needle Engine được viết như sau:
```ts twoslash
import { Behaviour } from "@needle-tools/engine"
export class MyComponent extends Behaviour {
}
```
## Các trường Script

### serializable
Nếu bạn đã xem qua một số script của Needle Engine, bạn có thể nhận thấy rằng một số biến được chú thích bằng `@serializable` phía trên khai báo của chúng. Đây là một Decorator trong Typescript và có thể được sử dụng để sửa đổi hoặc chú thích mã. Trong Needle Engine, điều này được sử dụng, ví dụ, để cho biết việc serialization chính cần loại nào mà chúng ta mong đợi trong script của mình khi nó chuyển đổi từ thông tin component thô được lưu trữ trong glTF thành một instance Component.
Hãy xem xét ví dụ sau:
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

class SomeClass extends Behaviour{
    @serializable(Behaviour)
    myOtherComponent?: Behaviour;
    @serializable(Object3D)
    someOtherObject?: Object3D;
}
```
Điều này cho Needle Engine biết rằng `myOtherComponent` phải có kiểu `Behaviour`. Sau đó, nó sẽ tự động gán tham chiếu chính xác cho trường khi cảnh của bạn được tải. Điều tương tự cũng đúng với `someOtherObject`, nơi chúng ta muốn deserialize thành một tham chiếu `Object3D`.

Lưu ý rằng trong một số trường hợp, kiểu có thể được bỏ qua. Điều này có thể được thực hiện cho tất cả [kiểu nguyên thủy trong Javascript](https://developer.mozilla.org/en-US/docs/Glossary/Primitive). Đó là `boolean`, `number`, `bigint`, `string`, `null` và `undefined`.
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    @serializable() // < không cần kiểu ở đây vì kiểu trường là kiểu nguyên thủy
    myString?: string;
}
```

### public vs private
Các trường không có bổ ngữ truy cập nào như `private`, `public` hoặc `protected` sẽ mặc định là `public` trong javascript
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    /// không có bổ ngữ truy cập có nghĩa là public:
    myNumber?: number;
    // khai báo rõ ràng là private:
    private myPrivateNumber?: number;
    protected myProtectedNumber?: number;
}
```
Điều tương tự cũng đúng với các phương thức.

## GameObjects và Scene
Để truy cập cảnh hiện tại từ một component, bạn sử dụng `this.scene` tương đương với `this.context.scene`, điều này cung cấp cho bạn đối tượng scene gốc của three.js.

Để duyệt qua hệ thống cấp bậc từ một component, bạn có thể lặp lại các children của một đối tượng
với vòng lặp for:
```ts twoslash
for (let i = 0; i < this.gameObject.children; i++) {
    console.log(this.gameObject.children[i]);
}
```
hoặc bạn có thể lặp lại bằng cách sử dụng tương đương với `foreach`:
```ts twoslash
for (const child of this.gameObject.children) {
    console.log(child);
}
```
Bạn cũng có thể sử dụng các phương thức cụ thể của three.js để nhanh chóng lặp lại tất cả các đối tượng một cách đệ quy bằng phương thức [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse):
```ts twoslash
import { GameObject } from "@needle-tools/engine";
//---cut-before---
this.gameObject.traverse((obj: GameObject) => console.log(obj))
```
hoặc chỉ để duyệt qua các đối tượng hiển thị, sử dụng [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) thay thế.

Một tùy chọn khác khá hữu ích khi bạn chỉ muốn lặp lại các đối tượng có thể render, bạn có thể truy vấn tất cả các component renderer và lặp lại chúng như sau:
```ts twoslash
import { Renderer } from "@needle-tools/engine";

for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
Để biết thêm thông tin về việc lấy component, xem phần tiếp theo.

## Components
Needle Engine sử dụng mạnh mẽ Hệ thống Component tương tự như Unity. Điều này có nghĩa là bạn có thể thêm hoặc xóa component vào bất kỳ `Object3D` / `GameObject` nào trong scene. Một component sẽ được đăng ký với engine khi sử dụng `addNewComponent(<Object3D>, <ComponentType>)`.
Các phương thức sự kiện mà component đính kèm sẽ được engine tự động gọi (ví dụ: `update` hoặc `onBeforeRender`). Bạn có thể tìm thấy danh sách đầy đủ các phương thức sự kiện trong [tài liệu scripting](../scripting.md#lifecycle-methods)

#### Tìm Component trong Scene
Để lấy component, bạn có thể sử dụng các phương thức quen thuộc tương tự như Unity. Lưu ý rằng ví dụ sau sử dụng kiểu `Animator` nhưng bạn cũng có thể sử dụng bất kỳ kiểu component nào được tích hợp sẵn hoặc do bạn tạo.
| Tên phương thức | Mô tả |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | Lấy component `Animator` trên một GameObject/Object3D. Nó sẽ trả về instance `Animator` nếu đối tượng có component Animator hoặc `null` nếu đối tượng không có component đó. |
| `this.gameObject.getComponentInChildren(Animator)` | Lấy component `Animator` đầu tiên trên một GameObject/Object3D hoặc trên bất kỳ children nào của nó |
| `this.gameObject.getComponentsInParents(Animator)` | Lấy tất cả các component Animator trong hệ thống cấp bậc parent (bao gồm cả GameObject/Object3D hiện tại)

Các phương thức này cũng có sẵn trên kiểu GameObject tĩnh. Ví dụ ``GameObject.getComponent(this.gameObject, Animator)`` để lấy component `Animator` trên GameObject/Object3D được truyền vào.

Để tìm kiếm toàn bộ scene cho một hoặc nhiều component, bạn có thể sử dụng ``GameObject.findObjectOfType(Animator)`` hoặc ``GameObject.findObjectsOfType(Animator)``.

## Các kiểu Unity đã được đổi tên
Một số kiểu cụ thể của Unity được ánh xạ sang các tên kiểu khác trong engine của chúng tôi. Xem danh sách sau:

| Kiểu trong Unity | Kiểu trong Needle Engine |  |
| -- | -- | -- |
| `UnityEvent` | `EventList` | Một UnityEvent sẽ được export dưới dạng kiểu `EventList` (sử dụng `serializable(EventList)` để deserialize UnityEvents) |
| `GameObject` | `Object3D` | |
| `Transform` | `Object3D` | Trong three.js và Needle Engine, GameObject và Transform là như nhau (không có component `Transform`). Ngoại lệ duy nhất cho quy tắc đó là khi tham chiếu đến một `RectTransform`, cũng là một component trong Needle Engine. |
| `Color` | `RGBAColor` | Kiểu color của three.js không có thuộc tính alpha. Vì vậy, tất cả các kiểu Color được export từ Unity sẽ được export dưới dạng `RGBAColor`, là một kiểu tùy chỉnh của Needle Engine |

## Transform
Dữ liệu Transform có thể được truy cập trực tiếp trên `GameObject` / `Object3D`. Không giống như Unity, không có component transform bổ sung nào lưu trữ dữ liệu này.
- ``this.gameObject.position`` là vector3 [position](https://threejs.org/docs/?q=obj#api/en/core/Object3D.position) trong không gian cục bộ (local space)
- ``this.gameObject.worldPosition`` là vector3 position trong không gian thế giới (world space)
- ``this.gameObject.rotation`` là [euler rotation](https://threejs.org/docs/?q=obj#api/en/core/Object3D.rotation) trong không gian cục bộ (local space)
- ``this.gameObject.worldRotation`` là euler rotation theo góc euler trong không gian thế giới (world space)
- ``this.gameObject.quaternion`` - là [quaternion rotation](https://threejs.org/docs/?q=obj#api/en/core/Object3D.quaternion) trong không gian cục bộ (local space)
- ``this.gameObject.worldQuaternion`` là quaternion rotation trong không gian thế giới (world space)
- ``this.gameObject.scale`` - là vector3 [scale](https://threejs.org/docs/?q=obj#api/en/core/Object3D.scale) trong không gian cục bộ (local space)
- ``this.gameObject.worldScale`` là vector3 scale trong không gian thế giới (world space)

Điểm khác biệt chính cần lưu ý ở đây là `position` trong three.js mặc định là vị trí localspace, trong khi trong Unity `position` là worldspace và sử dụng `localPosition` để cố ý sử dụng vị trí local space. Phần tiếp theo sẽ giải thích cách lấy vị trí worldspace trong three.js.

### WORLD- Position, Rotation, Scale...

Trong three.js (và do đó cả trong Needle Engine), `object.position`, `object.rotation`, `object.scale` đều là tọa độ local space. Điều này khác với Unity, nơi chúng ta quen với việc `position` là worldspace và sử dụng `localPosition` để cố tình sử dụng vị trí local space.

Nếu bạn muốn truy cập tọa độ thế giới (world coordinates) trong Needle Engine, chúng tôi có các phương thức tiện ích mà bạn có thể sử dụng với các đối tượng của mình. Gọi `getWorldPosition(yourObject)` để tính toán vị trí thế giới. Các phương thức tương tự tồn tại cho rotation/quaternion và scale. Để truy cập các phương thức đó, chỉ cần import chúng từ Needle Engine như sau: `import { getWorldPosition } from "@needle.tools/engine"`

Lưu ý rằng các phương thức tiện ích như `getWorldPosition`, `getWorldRotation`, `getWorldScale` nội bộ có một bộ đệm các instance Vector3 và chỉ dành để sử dụng cục bộ. Điều này có nghĩa là bạn không nên cache chúng trong component của mình, nếu không giá trị đã cache của bạn cuối cùng sẽ bị ghi đè. Nhưng việc gọi `getWorldPosition` nhiều lần trong hàm của bạn để thực hiện tính toán là an toàn mà không phải lo lắng về việc sử dụng lại cùng một instance. Nếu bạn không chắc điều này có nghĩa là gì, bạn nên xem phần **Primitive Types** trong [Hướng dẫn cơ bản về Typescript](./typescript-essentials.md#primitive-types)

## Thời gian
Sử dụng `this.context.time` để truy cập dữ liệu thời gian:
- `this.context.time.time` là thời gian kể từ khi ứng dụng bắt đầu chạy
- `this.context.time.deltaTime` là thời gian đã trôi qua kể từ frame cuối cùng
- `this.context.time.frameCount` là số frame đã trôi qua kể từ khi ứng dụng bắt đầu
- `this.context.time.realtimeSinceStartup` là thời gian chưa được scale kể từ khi ứng dụng bắt đầu chạy

Cũng có thể sử dụng `this.context.time.timeScale` để cố ý làm chậm thời gian, ví dụ cho hiệu ứng chuyển động chậm (slow motion).

## Raycasting
Sử dụng ``this.context.physics.raycast()`` để thực hiện raycast và lấy danh sách các điểm giao nhau. Nếu bạn không truyền bất kỳ tùy chọn nào, raycast được thực hiện từ vị trí chuột (hoặc vị trí chạm đầu tiên) trong screenspace bằng cách sử dụng `mainCamera` hiện đang hoạt động. Bạn cũng có thể truyền vào một đối tượng `RaycastOptions` có nhiều cài đặt khác nhau như `maxDistance`, camera được sử dụng hoặc các layer để kiểm tra va chạm.

Sử dụng ``this.context.physics.raycastFromRay(your_ray)`` để thực hiện raycast bằng cách sử dụng một [three.js ray](https://threejs.org/docs/#api/en/math/Ray)

Lưu ý rằng các lệnh gọi ở trên mặc định raycasting đối với các đối tượng scene hiển thị. Điều này khác với Unity, nơi bạn luôn cần collider để va chạm với đối tượng. Giải pháp mặc định của three.js có cả ưu và nhược điểm, trong đó một nhược điểm chính là nó có thể hoạt động khá chậm tùy thuộc vào hình học scene của bạn. Nó có thể đặc biệt chậm khi raycasting đối với skinned mesh. Do đó, thường nên đặt các đối tượng có SkinnedMeshRenderers trong Unity vào layer `Ignore Raycast`, layer này sau đó cũng sẽ bị Needle Engine bỏ qua mặc định.

Một tùy chọn khác là sử dụng các phương thức raycast vật lý, chỉ trả về va chạm với các collider trong scene.

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Đây là [ví dụ có thể chỉnh sửa cho raycast vật lý](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)

## Input
Sử dụng ``this.context.input`` để thăm dò trạng thái input:

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update(){
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN")
        }
    }
}
```

Bạn cũng có thể đăng ký sự kiện trong enum ``InputEvents`` như sau:
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable(){
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }
    onDisable() {
        // Nên hủy đăng ký sự kiện khi component của bạn trở nên không hoạt động
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    inputPointerDown = (evt: NEPointerEvent) => { console.log(evt); }
}
```

Nếu bạn muốn tự xử lý input, bạn cũng có thể đăng ký [tất cả các sự kiện mà trình duyệt cung cấp](https://developer.mozilla.org/en-US/docs/Web/Events) (có rất nhiều). Ví dụ, để đăng ký sự kiện click của trình duyệt, bạn có thể viết:
```ts twoslash
window.addEventListener("click", () => { console.log("MOUSE CLICK"); });
```
Lưu ý rằng trong trường hợp này, bạn phải tự xử lý tất cả các trường hợp. Ví dụ, bạn có thể cần sử dụng các sự kiện khác nhau nếu người dùng truy cập trang web của bạn trên desktop, mobile hay thiết bị VR. Các trường hợp này được xử lý tự động bởi các sự kiện input của Needle Engine (ví dụ: `PointerDown` được kích hoạt cho cả nhấn chuột xuống, chạm xuống và trong trường hợp VR là nhấn nút trên bộ điều khiển).

## InputSystem Callbacks
Tương tự như Unity (xem [IPointerClickHandler trong Unity](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html)), bạn cũng có thể đăng ký để nhận các sự kiện input trên chính component đó.

```ts twoslash
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class ReceiveClickEvent extends Behaviour {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```

Các sự kiện pointer có sẵn cho tất cả các component:
- `onPointerDown`
- `onPointerUp`
- `onPointerEnter`
- `onPointerMove`
- `onPointerExit`
- `onPointerClick`

Tất cả đều có đối số `PointerEventData` mô tả sự kiện.

## Debug.Log
Phương thức tương đương với `Debug.Log()` trong javascript là `console.log()`. Bạn cũng có thể sử dụng `console.warn()` hoặc `console.error()`.
```ts twoslash
import { GameObject, Renderer } from "@needle-tools/engine";
const someVariable = 42;
// ---cut-before---

console.log("Hello web");
// Bạn có thể truyền vào bao nhiêu đối số tùy ý như sau:
console.log("Hello", someVariable, GameObject.findObjectOfType(Renderer), this.context);
```

## Gizmos
Trong Unity, bạn thường phải sử dụng các phương thức đặc biệt để vẽ Gizmos như `OnDrawGizmos` hoặc `OnDrawGizmosSelected`. Mặt khác, trong Needle Engine, các phương thức như vậy không tồn tại và bạn có thể thoải mái vẽ gizmos từ bất kỳ đâu trong script của mình. Lưu ý rằng bạn cũng phải chịu trách nhiệm *không* vẽ chúng trong, ví dụ, ứng dụng web đã triển khai của bạn (bạn chỉ cần lọc chúng bằng `if(isDevEnvironment))`).

Đây là một ví dụ về cách vẽ một wire sphere màu đỏ trong một giây, ví dụ để hiển thị một điểm trong không gian thế giới
```ts twoslash
import { Vector3 } from "three";
const hit = { point: new Vector3(0, 0, 0) };
// ---cut-before---
import { Gizmos } from "@needle-tools/engine";
Gizmos.DrawWireSphere(hit.point, 0.05, 0xff0000, 1);
```
Đây là một số phương thức gizmo có sẵn:
| Tên phương thức |  |
| --- | --- |
| `Gizmos.DrawArrow` | |
| `Gizmos.DrawBox` | |
| `Gizmos.DrawBox3` | |
| `Gizmos.DrawDirection` | |
| `Gizmos.DrawLine` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawSphere` | |
| `Gizmos.DrawWireSphere` | |


## Các phương thức tiện ích hữu ích

Import từ `@needle-tools/engine` ví dụ `import { getParam } from "@needle-tools/engine"`

| Tên phương thức | Mô tả |
| --- | --- |
| `getParam()` | Kiểm tra xem tham số url có tồn tại không. Trả về true nếu nó tồn tại nhưng không có giá trị (ví dụ: `?help`), false nếu không tìm thấy trong url hoặc được đặt thành 0 (ví dụ: `?help=0`), ngược lại nó trả về giá trị (ví dụ: `?message=test`) |
| `isMobileDevice()` | Trả về true nếu ứng dụng được truy cập từ thiết bị di động |
| `isDevEnvironment()` | Trả về true nếu ứng dụng hiện tại đang chạy trên local server |
| `isMozillaXR()` | |
| `isiOS` | |
| `isSafari` | |

```ts twoslash
import { isMobileDevice } from "@needle-tools/engine"
if( isMobileDevice() )
```

```ts twoslash
import { getParam } from "@needle-tools/engine"
// returns true
const myFlag = getParam("some_flag")
console.log(myFlag)
```

## Dự án Web
Trong C#, bạn thường làm việc với một solution chứa một hoặc nhiều project. Trong Unity, solution này được Unity quản lý cho bạn và khi bạn mở một script C#, nó sẽ mở project và hiển thị file cho bạn.
Bạn thường cài đặt các Package bằng trình quản lý package tích hợp của Unity để thêm các tính năng do Unity hoặc các nhà phát triển khác cung cấp (cả trong nhóm của bạn hoặc ví dụ qua AssetStore của Unity). Unity làm rất tốt việc giúp thêm và quản lý các package dễ dàng với PackageManager của họ và bạn có thể chưa bao giờ phải chỉnh sửa thủ công một file như `manifest.json` (đây là file Unity sử dụng để theo dõi các package đã được cài đặt) hoặc chạy một lệnh từ command line để cài đặt một package.

Trong môi trường web, bạn sử dụng `npm` - Node Package Manager - để quản lý các dependencies / package cho bạn. Nó về cơ bản làm điều tương tự với những gì PackageManager của Unity làm - nó cài đặt (tải xuống) các package từ *một số* máy chủ (bạn thường nghe nó được gọi là *registry* trong ngữ cảnh đó) và đặt chúng vào một thư mục có tên `node_modules`.

Khi làm việc với một dự án web, hầu hết các dependencies của bạn được cài đặt từ [npmjs.com](https://npmjs.com/). Đây là registry package phổ biến nhất hiện có cho các dự án web.

Đây là một ví dụ về cách một package.json có thể trông như thế nào:
```json
{
  "name": "@optional_org/package_name",
  "version": "1.0.0",
  "scripts": {
    "start": "vite --host"
  },
  "dependencies": {
	  "@needle-tools/engine": "^3.5.9-beta",
	  "three": "npm:@needle-tools/three@0.146.8"
	},
  "devDependencies": {
	  "@types/three": "0.146.0",
	  "@vitejs/plugin-basic-ssl": "^1.0.1",
	  "typescript": "^5.0.4",
	  "vite": "^4.3.4",
	  "vite-plugin-compression": "^0.5.1"
	}
}
```

Mẫu mặc định của chúng tôi sử dụng Vite làm bundler và không cài đặt sẵn framework frontend nào. Needle Engine không có quan điểm về việc nên sử dụng framework nào, vì vậy bạn có thể thoải mái làm việc với bất kỳ framework nào bạn thích. Chúng tôi có các mẫu cho các framework phổ biến như Vue.js, Svelte, Next.js, React hoặc React Three Fiber.

## Cài đặt package & dependencies
Để cài đặt một dependency từ npm, bạn có thể mở dự án web của mình trong commandline (hoặc terminal) và chạy `npm i <the/package_name>` (viết tắt của `npm install`)
Ví dụ, chạy `npm i @needle-tools/engine` để cài đặt [Needle Engine](https://www.npmjs.com/package/@needle-tools/engine). Lệnh này sau đó sẽ thêm package vào mảng `dependencies` trong `package.json` của bạn.
Để cài đặt một package chỉ là devDependency, bạn có thể chạy `npm i --save-dev <package_name>`. Thông tin thêm về sự khác biệt giữa dependencies và devDependencies ở bên dưới.

### Sự khác biệt giữa 'dependencies' và 'devDependencies'
Bạn có thể nhận thấy rằng có hai mục chứa *dependency* - `dependencies` và `devDependencies`.

`dependencies` **luôn được cài đặt** (hoặc bundled) khi dự án web của bạn được cài đặt hoặc trong trường hợp bạn phát triển một thư viện và package của bạn được cài đặt như một dependency của một dự án khác.

`devDependencies` **chỉ** được cài đặt khi phát triển dự án (nghĩa là khi bạn chạy `install` trực tiếp trong thư mục cụ thể) và chúng **không** được bao gồm trong dự án của bạn trong các trường hợp khác.

### Làm thế nào để tôi cài đặt package hoặc dependency khác và sử dụng nó?
Phần [Cài đặt](#installing) đã dạy chúng ta rằng bạn có thể cài đặt dependencies bằng cách chạy `npm i <package_name>` trong thư mục dự án của bạn, trong đó `package_name` có thể là bất kỳ package nào bạn tìm thấy trên [npm.js](https://npmjs.org).

Giả sử bạn muốn thêm một thư viện tweening vào dự án của mình. Chúng ta sẽ sử dụng [`@tweenjs/tween.js`](https://www.npmjs.com/package/@tweenjs/tween.js) cho ví dụ này. [Tại đây](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts) là dự án cuối cùng nếu bạn muốn bỏ qua và chỉ xem kết quả.

Đầu tiên chạy `npm install @tweenjs/tween.js` trong terminal và đợi quá trình cài đặt kết thúc. Điều này sẽ thêm một mục mới vào package.json của chúng ta:
```json
"dependencies": {
    "@needle-tools/engine": "^3.5.11-beta",
    "@tweenjs/tween.js": "^20.0.3",
    "three": "npm:@needle-tools/three@0.146.8"
}
```

Sau đó mở một trong các file script của bạn mà bạn muốn sử dụng tweening và import ở đầu file:
```ts twoslash
import * as TWEEN from '@tweenjs/tween.js';
```
Lưu ý rằng chúng ta đang import tất cả các kiểu trong thư viện bằng cách viết `* as TWEEN`. Chúng ta cũng có thể chỉ import các kiểu cụ thể như `import { Tween } from @tweenjs/tween.js`.

Bây giờ chúng ta có thể sử dụng nó trong script của mình. Luôn khuyến nghị tham khảo tài liệu của thư viện mà bạn muốn sử dụng. Trong trường hợp của tween.js, họ cung cấp một [hướng dẫn sử dụng](https://github.com/tweenjs/tween.js/blob/HEAD/docs/user_guide.md) mà chúng ta có thể làm theo. Thông thường, trang Readme của package trên npm chứa thông tin về cách cài đặt và sử dụng package.

Để xoay một cube, chúng ta tạo một kiểu component mới gọi là `TweenRotation`, sau đó chúng ta tạo instance tween cho rotation của đối tượng, số lần nó lặp lại, easing nào sẽ sử dụng, tween mà chúng ta muốn thực hiện và sau đó chúng ta bắt đầu nó. Sau đó, chúng ta chỉ cần gọi `update` mỗi frame để cập nhật animation tween. Script cuối cùng trông như thế này:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
import * as TWEEN from '@tweenjs/tween.js';

export class TweenRotation extends Behaviour {

    // lưu instance của tweener của chúng ta
    private _tween?: TWEEN.Tween<any>;

    start() {
        const rotation = this.gameObject.rotation;
        // tạo instance tween
        this._tween = new TWEEN.Tween(rotation);
        // đặt nó lặp lại mãi mãi
        this._tween.repeat(Infinity);
        // đặt easing để sử dụng
        this._tween.easing(TWEEN.Easing.Quintic.InOut);
        // đặt các giá trị để tween
        this._tween.to({ y: Math.PI * 0.5 }, 1000);
        // bắt đầu
        this._tween.start();
    }

    update() {
        // cập nhật tweening mỗi frame
        // dấu '?' là viết tắt của việc kiểm tra xem _tween đã được tạo chưa
        this._tween?.update();
    }
}
```
Bây giờ chúng ta chỉ cần thêm nó vào bất kỳ đối tượng nào trong scene của mình để xoay chúng mãi mãi.
Bạn có thể xem script cuối cùng hoạt động [tại đây](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts).


# Tìm hiểu thêm

- [Scripting trong Needle Engine](../scripting)
- [Các yếu tố cơ bản về Typescript](./typescript-essentials.md)
- [Tham khảo Component](../component-reference.md)

Trang được dịch tự động bằng AI