---
title: "@serializable và các decorator khác"
---

Bảng sau chứa các decorator Typescript có sẵn mà Needle Engine cung cấp.

Bạn có thể coi chúng như các Attribute nâng cao (nếu bạn quen thuộc với C#) - chúng có thể được thêm vào các lớp (class), trường (field) hoặc phương thức (method) trong Typescript để cung cấp chức năng bổ sung.

|  |  |
| --- | --- |
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
    // bạn có thể bỏ qua kiểu nếu đó là kiểu nguyên thủy
    // ví dụ: Number, String hoặc Bool
    @serializable()
    myNumber: number = 42;

    // ngược lại, thêm kiểu cụ thể mà bạn muốn serialize tới
    @serializable(EventList)
    onClick?: EventList;

    @serializable(SomeComponentType)
    myComponent?: SomeComponentType;

    // Lưu ý rằng đối với mảng, bạn vẫn thêm kiểu cụ thể (không phải mảng)
    @serializable(Object3D)
    myObjects?: Object3D[];
}
```

### SyncField

Decorator `@syncField` có thể được sử dụng để tự động đồng bộ các thuộc tính của component của bạn qua mạng cho tất cả người dùng (khách truy cập trang web của bạn) kết nối trong cùng một phòng mạng. Nó có thể tùy chọn nhận một hàm callback sẽ được gọi bất cứ khi nào giá trị thay đổi.

-   Để thông báo cho hệ thống rằng một giá trị tham chiếu (như object hoặc mảng) đã thay đổi, bạn cần gán lại trường đó. Ví dụ: như thế này: `myField = myField`
-   Hàm callback *không* thể là hàm mũi tên (arrow function) (ví dụ: `MyScript.prototype.onNumberChanged` hoạt động cho `onNumberChanged() { ... }` nhưng không hoạt động cho `myNumberChanged = () => { ... }`)

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
    @prefix(Camera) // < đây là kiểu chứa phương thức bạn muốn thay đổi
    awake() { // < đây là tên phương thức bạn muốn thay đổi

        // phương thức này giờ sẽ được gọi trước khi phương thức Camera.awake chạy
        // LƯU Ý: `this` hiện tại đề cập đến instance của Camera chứ KHÔNG PHẢI `YourClass` nữa. Điều này cho phép bạn truy cập trạng thái nội bộ của component.
        console.log("Hello camera:", this)
        // tùy chọn trả về false nếu bạn muốn ngăn hành vi mặc định
    }
}
```

Trang được dịch tự động bằng AI