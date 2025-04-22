---
title: Ví dụ về Scripting
description: Tập hợp các đoạn mã script và ví dụ hữu ích.
---

# Ví dụ về Scripting

Nếu bạn là người mới làm quen với scripting, chúng tôi **khuyến khích mạnh mẽ** bạn nên đọc các hướng dẫn sau trước:

- [Hướng dẫn cho người mới bắt đầu: Các yếu tố thiết yếu của Typescript](./getting-started/typescript-essentials.md)
- [Hướng dẫn cho người mới bắt đầu: Needle Engine dành cho nhà phát triển Unity](./getting-started/for-unity-developers.md)
- [Video hướng dẫn: Cách viết các thành phần tùy chỉnh](https://youtu.be/uf5UK0bLHlY?si=82U_2L4n2V7XL7RJ)

Dưới đây bạn sẽ tìm thấy một vài script cơ bản để tham khảo nhanh.

Chúng tôi cũng cung cấp rất nhiều cảnh mẫu và các dự án hoàn chỉnh mà bạn có thể tải xuống và sử dụng làm điểm khởi đầu:
- [Truy cập trang web Mẫu](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=scripting_examples)
- [Tải xuống gói Mẫu](https://engine.needle.tools/downloads/unity/samples)
- [Bộ sưu tập Stackblitz của Needle Engine](https://stackblitz.com/@marwie/collections/needle-engine)
- [API của Needle Engine](https://engine.needle.tools/api)

## Thành phần cơ bản
<stackblitz file="@code/basic-component.ts"></stackblitz>
@[code ts twoslash](@code/basic-component.ts)

xem [scripting](scripting#lifecycle-methods) để biết tất cả các sự kiện của thành phần

## Tham chiếu một Object từ Unity
@[code ts twoslash](@code/component-object-reference.ts)

## Tham chiếu và tải một tài sản từ Unity (Prefab hoặc SceneAsset)
@[code ts twoslash](@code/component-prefab.ts)

## Tham chiếu và tải các cảnh từ Unity
::: tip
Tìm một [ví dụ hoạt động trong các mẫu của chúng tôi](https://engine.needle.tools/samples/multi-scenes-(dynamic-loading)) để tải xuống và thử nghiệm
:::

@[code ts twoslash](@code/component-scene.ts)

## Nhận các cú nhấp chuột trên Object
Thêm script này vào bất kỳ object nào trong cảnh của bạn mà bạn muốn có thể nhấp vào. Đảm bảo cũng có một thành phần `ObjectRaycaster` trong hệ thống cấp bậc cha của object đó.

<stackblitz file="@code/component-click.ts">
test
</stackblitz>

@[code ts twoslash](@code/component-click.ts)

## Nhấp chuột có mạng trên Object

Thêm script này vào bất kỳ object nào trong cảnh của bạn mà bạn muốn có thể nhấp vào. Đảm bảo cũng có một thành phần `ObjectRaycaster` trong hệ thống cấp bậc cha của object đó.
Thành phần này sẽ gửi cú nhấp chuột nhận được đến tất cả các client được kết nối và sẽ nâng lên một sự kiện mà sau đó bạn có thể phản ứng trong ứng dụng của mình. Nếu bạn đang sử dụng Unity hoặc Blender, bạn có thể đơn giản gán các hàm để gọi cho sự kiện `onClick` để ví dụ như phát hoạt ảnh hoặc ẩn các object.

@[code ts twoslash](@code/component-click-networking.ts)

### Phát hoạt ảnh khi nhấp chuột
@[code ts twoslash](@code/component-animation-onclick.ts)

## Tham chiếu một Animation Clip
Điều này có thể hữu ích nếu bạn muốn chạy logic hoạt ảnh tùy chỉnh của mình.
Bạn cũng có thể xuất một mảng các clip.
@[code ts twoslash](@code/component-animationclip.ts)

## Tạo và gọi một UnityEvent

@[code ts twoslash](@code/component-unityevent.ts)
::: tip
Các sự kiện EventList cũng được gọi ở cấp độ thành phần. Điều này có nghĩa là bạn cũng có thể đăng ký sự kiện được khai báo ở trên bằng cách sử dụng ``myComponent.addEventListener("my-event", evt => {...})``.
Đây là một tính năng thử nghiệm. Vui lòng cung cấp phản hồi trong [diễn đàn](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) của chúng tôi
:::

### Khai báo một loại sự kiện tùy chỉnh
Điều này hữu ích khi bạn muốn hiển thị một sự kiện cho Unity hoặc Blender với một số đối số tùy chỉnh (như một chuỗi)
@[code ts twoslash](@code/component-customevent.ts)

_Ví dụ sử dụng:_
![20221128-210735_Unity-needle](https://user-images.githubusercontent.com/2693840/204370950-4c89b877-90d7-4e6f-8266-3352e6da16f4.png)

## Sử dụng các object lồng nhau và serialization

Bạn có thể lồng các object và dữ liệu của chúng. Với các decorator `@serializable(SomeType)` phù hợp, dữ liệu sẽ được serialized và deserialized thành các kiểu chính xác một cách tự động.

Trong thành phần typescript của bạn:
@[code ts twoslash](@code/component-nested-serialization.ts)

Trong C# trong bất kỳ script nào:
@[code](@code/component-nested-serialization-cs.cs)

::: tip
Nếu không có các decorator kiểu chính xác, bạn vẫn sẽ nhận được dữ liệu, nhưng chỉ dưới dạng một object thuần túy. Điều này hữu ích khi bạn đang porting các thành phần, vì bạn sẽ có quyền truy cập vào tất cả dữ liệu và có thể thêm kiểu khi cần.
:::

## Sử dụng Web APIs
::: tip
Hãy nhớ rằng bạn vẫn có quyền truy cập vào tất cả các web apis và các gói [npm](https://npmjs.org)!
Đó là vẻ đẹp của Needle Engine nếu chúng tôi được phép nói điều này ở đây 😊
:::

### Hiển thị vị trí hiện tại
@[code ts twoslash](@code/component-location.ts)

### Hiển thị thời gian hiện tại bằng cách sử dụng Coroutine
@[code ts twoslash](@code/component-time.ts)

<video-embed src="./videos/component-time.mp4" limit_height />

## Thay đổi thuộc tính shader tùy chỉnh

Giả sử bạn có một shader tùy chỉnh với tên thuộc tính `_Speed` là một giá trị float, đây là cách bạn thay đổi nó từ một script.
Bạn có thể tìm thấy một [ví dụ hoạt động để tải xuống trong các mẫu của chúng tôi](https://engine.needle.tools/samples/shaders/)

<!-- SAMPLE modify custom shader material property -->

## Chuyển đổi thuộc tính src

Xem [ví dụ hoạt động](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html) trên StackBlitz

## Thêm các hiệu ứng postprocessing mới

Đảm bảo cài đặt [`npm i postprocessing`](https://github.com/pmndrs/postprocessing) trong dự án web của bạn. Sau đó, bạn có thể thêm các hiệu ứng mới bằng cách kế thừa từ `PostProcessingEffect`.

Để sử dụng hiệu ứng, hãy thêm nó vào cùng object với thành phần `Volume` của bạn.

Đây là một ví dụ gói hiệu ứng [Outline postprocessing effect](https://pmndrs.github.io/postprocessing/public/demo/#outline). Bạn có thể hiển thị các biến và cài đặt như bình thường vì bất kỳ hiệu ứng nào cũng chỉ là một thành phần trong cảnh three.js của bạn.

@[code](@code/custom-post-effect.ts)

## Custom ParticleSystem Behaviour

@[code ts twoslash](@code/custom-particle-system-behaviour.ts)

## Custom 2D Audio Component

Đây là một ví dụ về cách bạn có thể tạo thành phần âm thanh của riêng mình.
Tuy nhiên, đối với hầu hết các trường hợp sử dụng, bạn có thể sử dụng thành phần AudioSource cốt lõi và không cần viết mã.

@[code ts twoslash](@code/component-2d-audio.ts)

## Các tệp bên ngoài tùy ý

Sử dụng kiểu FileReference để tải các tệp bên ngoài (ví dụ: tệp json)
@[code ts twoslash](@code/component-filereference.ts)

<!-- SAMPLE receive click from HTML button
## Receiving html element click in component
-->

<!-- SAMPLE disable environment light
## Disable environment light
-->

<!-- SAMPLE using mediapipe with hands
## Use mediapipe package to control the 3D scene with hands
Make sure to install the mediapipe package. Visit the github link below to see the complete project setup.
Try it [live here](https://engine.needle.tools/samples/mediapipe-hands/) - requires a webcam/camera
-->

<!-- SAMPLE Change Color On Collision
## Change Color On Collision
-->

<!-- SAMPLE Physics Trigger Relay
## Physics Trigger Relay
Invoke events using an objects physics trigger methods
-->

<!-- SAMPLE Auto Reset
## Auto Reset
Reset an object's position automatically when it's leaving a physics trigger
-->

<!-- SAMPLE Play Audio On Collision
## Play Audio On Collision
-->

<!-- SAMPLE Set Random Color
## Set Random Color
Randomize the color of an object on start. Note that the materials are cloned in the `start` method
-->

<!-- SAMPLE Timed Spawn
## Spawn Objects Over Time
-->
Trang được dịch tự động bằng AI