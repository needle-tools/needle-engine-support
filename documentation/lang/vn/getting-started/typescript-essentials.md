---
title: Scripting trong Needle Engine
description: Khác biệt, tương đồng và các khái niệm chính của Typescript, Javascript và C#.
sidebarDepth: 2
---

Hướng dẫn sau đây cố gắng làm nổi bật một số khác biệt chính giữa C#, Javascript và Typescript. Điều này hữu ích nhất cho các nhà phát triển mới làm quen với hệ sinh thái web.

Dưới đây cũng là một số tài nguyên hữu ích để học cách viết Typescript:

- [Typescript Tutorial](https://www.typescripttutorial.net/)
- [Learn Typescript](https://www.tutorialsteacher.com/typescript)
- [Typescript Documentation](https://www.typescriptlang.org/docs/)

### Sự khác biệt chính giữa C#, Javascript hoặc Typescript

**CSharp** hay **C#** là một ngôn ngữ strongly typed & compiled. Điều đó có nghĩa là **trước khi** mã của bạn có thể chạy (hoặc được thực thi), nó phải được compiled - dịch - thành IL hoặc CIL, một ngôn ngữ trung gian (intermediate language) gần hơn một chút với *mã máy*. Điều quan trọng cần hiểu ở đây là mã của bạn được phân tích và phải vượt qua các kiểm tra và quy tắc nhất định được **thực thi** bởi compiler. Bạn sẽ gặp các lỗi compiler **trong Unity** và ứng dụng của bạn thậm chí sẽ không bắt đầu chạy nếu bạn viết mã vi phạm bất kỳ quy tắc nào của ngôn ngữ C#. Bạn sẽ không thể vào Play-Mode nếu có lỗi compiler.

**Javascript** mặt khác được interpreted tại runtime. Điều đó có nghĩa là bạn có thể viết mã không hợp lệ và gây ra lỗi - nhưng bạn sẽ không thấy những lỗi đó *cho đến khi chương trình của bạn chạy* hoặc cố gắng **thực thi** chính xác dòng mã đó có lỗi. Ví dụ: bạn có thể viết `var points = 100; points += "hello world";` và sẽ không ai phàn nàn *cho đến khi* bạn chạy mã trong trình duyệt.

**Typescript** là một ngôn ngữ được thiết kế bởi Microsoft và **compile sang javascript**.
Nó thêm rất nhiều tính năng như **type-safety**. Điều đó có nghĩa là khi bạn viết mã bằng Typescript, bạn *có thể* khai báo kiểu và do đó nhận được lỗi tại *compile-time* khi bạn cố gắng, ví dụ, thực hiện các gán giá trị không hợp lệ hoặc gọi phương thức với các kiểu không mong đợi. Đọc thêm về các kiểu trong Javascript và Typescript bên dưới.

### Các kiểu - hoặc sự thiếu hụt của chúng

**Vanilla Javascript** (tính đến thời điểm hiện tại) **không** có bất kỳ khái niệm nào về *kiểu*: không có sự đảm bảo nào rằng một biến mà bạn đã khai báo là `let points = 100` sẽ vẫn là một *số* sau này trong ứng dụng của bạn. Điều đó có nghĩa là trong Javascript, mã hoàn toàn hợp lệ khi gán `points = new Vector3(100, 0, 0);` sau này trong mã của bạn. Hoặc thậm chí `points = null` hoặc `points = myRandomObject` - bạn hiểu rồi đấy. Tất cả điều này đều OK khi bạn viết mã **nhưng** nó có thể gây lỗi nghiêm trọng khi mã của bạn được thực thi bởi vì sau đó bạn viết `points -= 1` và **bây giờ** bạn gặp lỗi trong trình duyệt khi ứng dụng của bạn đang chạy.

Như đã đề cập ở trên, **Typescript** được tạo ra để giúp khắc phục vấn đề đó bằng cách thêm cú pháp để định nghĩa các kiểu.

Điều quan trọng là phải hiểu rằng bạn *về cơ bản* vẫn viết Javascript khi bạn viết Typescript và mặc dù *có thể* bỏ qua tất cả các kiểm tra kiểu và kiểm tra an toàn bằng cách ví dụ thêm ``//@ts-ignore`` phía trên một dòng lỗi hoặc định nghĩa tất cả các kiểu là ``any`` thì điều này **chắc chắn không được khuyến khích**. Các kiểu ở đây để giúp bạn tìm lỗi trước khi chúng thực sự xảy ra. Bạn thực sự không muốn triển khai trang web của mình lên máy chủ chỉ để sau đó nhận báo cáo từ người dùng hoặc khách truy cập nói rằng ứng dụng của bạn đã bị lỗi khi đang chạy.

Mặc dù *vanilla Javascript* không cung cấp các kiểu, bạn vẫn có thể thêm chú thích kiểu (type-annotations) vào các biến, lớp và phương thức javascript của mình bằng cách sử dụng **[JSDoc](https://jsdoc.app/)**.

### Biến

Trong C#, bạn khai báo biến bằng cách sử dụng kiểu hoặc từ khóa `var`.
Ví dụ, bạn có thể viết `int points = 100;`
hoặc thay thế sử dụng `var` và để compiler tự động xác định kiểu chính xác cho bạn: `var points = 100`

Trong Javascript hoặc Typescript, bạn có hai tùy chọn hiện đại để khai báo một biến.
Đối với biến mà bạn có kế hoạch gán lại giá trị, hãy sử dụng `let`, ví dụ `let points = 100;`
Đối với biến mà bạn không muốn có thể gán lại giá trị, hãy sử dụng `const`, ví dụ `const points = 100;`
> *Lưu ý về var*
Bạn có thể gặp từ khóa `var` trong javascript nhưng không nên sử dụng nó và từ khóa thay thế hiện đại cho nó là `let`. Tìm hiểu thêm về [var vs let](https://stackoverflow.com/a/11444416).

Xin lưu ý rằng bạn *vẫn có thể* gán giá trị cho các thành viên bên trong (ví dụ) một biến được khai báo bằng `const` nếu chúng là một kiểu tùy chỉnh. Hãy xem xét ví dụ sau:

```ts twoslash
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition.x = 100; // Gán giá trị cho x hoàn toàn ổn
```
Mã trên hoàn toàn là mã Typescript hợp lệ bởi vì bạn không gán lại `myPosition` mà chỉ gán cho thành viên `x` của `myPosition`. Mặt khác, ví dụ sau sẽ **không** được phép và gây ra lỗi runtime hoặc typescript:
```ts twoslash
// @errors: 2588
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition = new Vector3(100, 0, 0); // ⚠ GÁN GIÁ TRỊ CHO BIẾN CONST KHÔNG ĐƯỢC PHÉP
```

### Sử dụng hoặc Import các kiểu

Trong Unity, bạn thường thêm các câu lệnh `using` ở đầu mã để import các namespace cụ thể từ các Assembly được tham chiếu trong dự án của bạn hoặc - trong một số trường hợp nhất định - bạn có thể thấy mình import một kiểu cụ thể với một tên từ một namespace.
Xem ví dụ sau:
```csharp
using UnityEngine;
// import chỉ một kiểu cụ thể và đặt tên cho nó
using MonoBehaviour = UnityEngine.MonoBehaviour;
```

Đây là cách bạn làm tương tự trong Typescript để import các kiểu cụ thể từ một package:
```ts twoslash
import { Vector3 } from 'three';
import { Behaviour } from '@needle-tools/engine';
```

Bạn *có thể* cũng import tất cả các kiểu từ một package cụ thể bằng cách đặt tên cho nó, điều này bạn có thể thấy ở đâu đó:
```ts twoslash
import * as THREE from 'three';
const myVector : THREE.Vector3 = new THREE.Vector3(1, 2, 3);
```

### Các kiểu nguyên thủy (Primitive Types)
*Vector2, Vector3, Vector4...*
Nếu bạn có kinh nghiệm về C#, bạn có thể quen thuộc với sự khác biệt giữa class và struct. Trong khi class là kiểu tham chiếu (reference type), struct là kiểu giá trị tùy chỉnh (custom value type). Điều đó có nghĩa là, tùy thuộc vào ngữ cảnh, nó được cấp phát trên stack và khi được truyền vào một phương thức, mặc định sẽ tạo ra một bản sao.
Xem xét ví dụ sau trong C#:

```csharp
void MyCallerMethod(){
    var position = new Vector3(0,0,0);
    MyExampleVectorMethod(position);
    UnityEngine.Debug.Log("Position.x is " + position.x); // Ở đây x sẽ là 0
}
void MyExampleVectorMethod(Vector3 position){
    position.x = 42;
}
```

Một phương thức được gọi với một Vector3 tên là position. Bên trong phương thức, vector `position` được truyền vào được sửa đổi: x được đặt thành 42. Nhưng trong C#, vector gốc được truyền vào phương thức này (xem dòng 2) **không** bị thay đổi và x sẽ **vẫn** là 0 (dòng 4).

Điều tương tự không đúng với Javascript/Typescript. Ở đây chúng ta không có các kiểu giá trị tùy chỉnh, điều đó có nghĩa là nếu bạn gặp một Vector trong Needle Engine hoặc three.js, bạn sẽ luôn có một kiểu tham chiếu.
Xem xét ví dụ sau trong Typescript:
```ts twoslash
import { Vector3 } from 'three'

function myCallerMethod() : void {
    const position = new Vector3(0,0,0);
    myExampleVectorMethod(position);
    console.log("Position.x is " + position.x); // Ở đây x sẽ là 42
}
function myExampleVectorMethod(position: Vector3) : void {
    position.x = 42;
}
```
Bạn thấy sự khác biệt không? Bởi vì các vector và tất cả các đối tượng tùy chỉnh *là* kiểu tham chiếu, chúng ta đã sửa đổi biến `position` gốc (dòng 3) và x bây giờ là 42.

Điều này không chỉ quan trọng để hiểu cho các phương thức mà còn khi làm việc với các biến.
Trong C#, mã sau đây sẽ tạo ra hai instance của Vector3 và thay đổi một instance sẽ không ảnh hưởng đến instance còn lại:
```csharp
var myVector = new Vector3(1,1,1);
var myOtherVector = myVector;
myOtherVector.x = 42;
// sẽ ghi log: 1, 42
UnityEngine.Debug.Log(myVector.x + ", " + myOtherVector.x);
```
Nếu bạn làm tương tự trong Typescript, bạn sẽ **không** tạo ra một bản sao mà thay vào đó sẽ nhận được một tham chiếu đến cùng một instance `myVector`:
```ts twoslash
import { Vector3 } from 'three'

const myVector = new Vector3(1,1,1);
const myOtherVector = myVector;
myOtherVector.x = 42;
// sẽ ghi log: 42, 42
console.log(myVector.x, myOtherVector.x);
```

### Toán tử Vector và Toán tử

Trong khi ở C#, bạn có thể sử dụng operator overloading, điều này không khả dụng trong Javascript. Điều này có nghĩa là trong khi bạn có thể nhân một Vector3 trong C# như thế này:

```csharp
var myFirstVector = new Vector3(1,1,1);
var myFactor = 100f;
myFirstVector *= myFactor;
// → myFirstVector bây giờ là 100, 100, 100
```

bạn phải sử dụng một phương thức trên kiểu Vector3 để đạt được kết quả tương tự (chỉ với một ít mã lặp lại hơn)

```ts twoslash
import { Vector3 } from "three"

const myFirstVector : Vector3 = new Vector3(1, 1, 1)
const myFactor = 100;
myFirstVector.multiplyScalar(myFactor);
// → myFirstVector bây giờ là 100, 100, 100
```

### Kiểm tra bằng (Equality Checks)

#### So sánh lỏng lẻo (loose) so với so sánh nghiêm ngặt (strict)
Trong C#, khi bạn muốn kiểm tra xem hai biến có giống nhau không, bạn có thể viết như sau:
```csharp
var playerIsNull = myPlayer == null;
```
Trong Javascript/Typescript, có sự khác biệt giữa `==` và `===` trong đó `===` kiểm tra nghiêm ngặt hơn về kiểu:
```ts twoslash
const myPlayer: any = null;
// ---cut-before---
const playerIsNull = myPlayer === null;
const playerIsNullOrUndefined = myPlayer == null;
```
Bạn nhận thấy rằng biến thứ hai `playerIsNullOrUndefined` đang sử dụng `==`, thực hiện kiểm tra bằng lỏng lẻo, trong trường hợp này `null` và `undefined` đều sẽ trả về `true`. Bạn có thể đọc thêm về điều đó [tại đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

### Sự kiện, Binding và `this`

Khi bạn đăng ký một Sự kiện trong C#, bạn làm như sau:
```csharp
// đây là cách khai báo một sự kiện
event Action MyEvent;
// bạn đăng ký bằng cách thêm vào (hoặc xóa khỏi)
void OnEnable() {
    MyEvent += OnMyEvent;
}
void OnDisable() {
    MyEvent -= OnMyEvent;
}
void OnMyEvent() {}
```
Trong Typescript và Javascript, khi bạn thêm một phương thức vào một danh sách, bạn phải "bind this". Điều này về cơ bản có nghĩa là bạn tạo một phương thức trong đó bạn thiết lập rõ ràng `this` là (thường là) instance lớp hiện tại của bạn. Có hai cách để đạt được điều này.

Xin lưu ý rằng chúng tôi đang sử dụng kiểu `EventList` ở đây, đây là một kiểu của Needle Engine để khai báo các sự kiện (EventList cũng sẽ tự động được chuyển đổi thành UnityEvent và hoặc một danh sách sự kiện trong Blender khi bạn sử dụng chúng với tích hợp Editor của chúng tôi).

Cú pháp ngắn gọn và **được khuyến nghị** để làm điều này là sử dụng [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent!: EventList;

    onEnable() {
        this.myEvent.addEventListener(this.onMyEvent);
    }

    onDisable() {
        this.myEvent.removeEventListener(this.onMyEvent);
    }

    // Khai báo hàm là một arrow function để tự động bind `this`
    private onMyEvent = () => {
        console.log(this !== undefined, this)
    }
}
```
Ngoài ra còn có cách "cổ điển" dài dòng hơn để đạt được điều tương tự bằng cách bind this thủ công (và lưu phương thức vào một biến để sau đó xóa nó khỏi danh sách sự kiện):
```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent?: EventList;

    private _onMyEventFn?: Function;

    onEnable() {
        // bind this
        this._onMyEventFn = this.onMyEvent.bind(this);
        // thêm phương thức đã bind vào sự kiện
        this.myEvent?.addEventListener(this._onMyEventFn);
    }

    onDisable() {
        this.myEvent?.removeEventListener(this._onMyEventFn);
    }

    // Khai báo hàm là một arrow function để tự động bind `this`
    private onMyEvent = () => { }
}
```

## Tiếp theo là gì?

- [Scripting trong Needle Engine](/scripting.md)

Trang được dịch tự động bằng AI