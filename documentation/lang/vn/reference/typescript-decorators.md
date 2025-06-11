---
title: "@serializable và các decorator khác"
---

Bảng sau chứa các decorator Typescript có sẵn mà Needle Engine cung cấp.

Bạn có thể coi chúng như các Attribute nâng cao (nếu bạn quen thuộc với C#) - chúng có thể được thêm vào các lớp (class), trường (field) hoặc phương thức (method) trong Typescript để cung cấp chức năng bổ sung.

|  |  |
| --- | ---
| **Field & Property Decorators** | |
| `@serializable()` | Thêm vào các trường được phơi bày / serialize. Được sử dụng khi tải các tệp glTF đã được xuất cùng với các component từ Unity hoặc Blender. |
| `@syncField()` | Thêm vào một trường để đồng bộ giá trị qua mạng khi nó thay đổi. Bạn có thể truyền vào một phương thức để được gọi khi trường thay đổi. |
| `@validate()` | Thêm vào để nhận các callback trong phương thức sự kiện component `onValidate` bất cứ khi nào giá trị thay đổi. Hành vi này tương tự như onValidate của Unity. |
| **Method Decorators** | |
| `@prefix(<type>)` (experimental) | Có thể được sử dụng để dễ dàng chèn mã tùy chỉnh vào các component khác. Tùy chọn trả về `false` để ngăn không cho phương thức gốc được thực thi. Xem [ví dụ dưới đây](#prefix) |
| **Class Decorators** | |
| `@registerType` | Không có đối số. Có thể thêm vào một lớp component tùy chỉnh để được đăng ký vào các kiểu của Needle Engine và để hỗ trợ hot reloading. |

## Ví dụ

### Serializable

```ts twoslash
import { Behaviour, serializable, EventList } from "@needle-tools/engine";
import { Object3D } from "three";

export class SomeComponentType extends Behaviour {}

export class ButtonObject extends Behaviour {
    // you can omit the type if it's a primitive 
    // e.g. Number, String or Bool
    // bạn có thể bỏ qua kiểu nếu đó là kiểu nguyên thủy
    // ví dụ: Number, String hoặc Bool
    @serializable()
    myNumber: number = 42;

    // otherwise add the concrete type that you want to serialize to
    // ngược lại, thêm kiểu cụ thể mà bạn muốn serialize tới
    @serializable(EventList)
    onClick?: EventList;

    @serializable(SomeComponentType)
    myComponent?: SomeComponentType;

    // Note that for arrays you still add the concrete type (not the array)
    // Lưu ý rằng đối với mảng, bạn vẫn thêm kiểu cụ thể (không phải mảng)
    @serializable(Object3D)
    myObjects?: Object3D[];
}
```

### SyncField

Decorator `@syncField` có thể được sử dụng để tự động đồng bộ các thuộc tính của component của bạn qua mạng cho tất cả người dùng (khách truy cập trang web của bạn) kết nối trong cùng một phòng mạng. Nó có thể tùy chọn nhận một hàm callback sẽ được gọi bất cứ khi nào giá trị thay đổi.

-   To notify the system that a reference value (like an object or an array) has changed you need to re-assign the field. E.g. like this: `myField = myField`
    Để thông báo cho hệ thống rằng một giá trị tham chiếu (như object hoặc mảng) đã thay đổi, bạn cần gán lại trường đó. Ví dụ: như thế này: `myField = myField`
-   The callback function can *not* be an arrow function (e.g. `MyScript.prototype.onNumberChanged` works for `onNumberChanged() { ... }` but it does not for `myNumberChanged = () => { ... }`)
    Hàm callback *không* thể là hàm mũi tên (arrow function) (ví dụ: `MyScript.prototype.onNumberChanged` hoạt động cho `onNumberChanged() { ... }` nhưng không hoạt động cho `myNumberChanged = () => { ... }`)

```ts twoslash
import { Behaviour, serializable, syncField } from "@needle-tools/engine";

export class MyScript extends Behaviour {

    @syncField(MyScript.prototype.onNumberChanged)
    @serializable()
    myNumber: number = 42;

    private onNumberChanged(newValue: number, oldValue: number){
        console.log("Number changed from ", oldValue, "to", newValue)
    }
}
```

### Validate
```ts twoslash
import { Behaviour, serializable, validate } from "@needle-tools/engine";

export class MyScript extends Behaviour {

    @validate()
    @serializable()
    myNumber?: number;

    start() { setInterval(() => this.myNumber = Math.random(), 1000) }

    onValidate(fieldName: string) {
        console.log("Validate", fieldName, this.myNumber);
    }
}
```

### Prefix
[Ví dụ trực tiếp](https://stackblitz.com/edit/needle-engine-prefix-example?file=src%2Fmain.ts)
```ts twoslash
import { Camera, prefix } from "@needle-tools/engine";
class YourClass {
    @prefix(Camera) // < this is type that has the method you want to change
    // < đây là kiểu chứa phương thức bạn muốn thay đổi
    awake() { // < this is the method name you want to change
        // < đây là tên phương thức bạn muốn thay đổi

        // this is now called before the Camera.awake method runs
        // phương thức này giờ sẽ được gọi trước khi phương thức Camera.awake chạy
        // NOTE: `this` does now refer to the Camera instance and NOT `YourClass` anymore. This allows you to access internal state of the component as well
        // LƯU Ý: `this` hiện tại đề cập đến instance của Camera chứ KHÔNG PHẢI `YourClass` nữa. Điều này cho phép bạn truy cập trạng thái nội bộ của component.
        console.log("Hello camera:", this)
        // optionally return false if you want to prevent the default behaviour
        // tùy chọn trả về false nếu bạn muốn ngăn hành vi mặc định
    }
}
```


Trang được dịch tự động bằng AI