---
title: Everywhere Actions — Trải nghiệm tương tác trên Desktop, Android & iOS (thậm chí cả AR)
description: Everywhere Actions của Needle là một tập hợp các thành phần được lựa chọn cẩn thận cho phép bạn tạo ra các trải nghiệm tương tác trong Unity mà không cần viết một dòng mã nào. Chúng được thiết kế để phục vụ như các khối xây dựng cho các trải nghiệm trên web, thiết bị di động và XR, **bao gồm cả Thực tế tăng cường trên iOS**. Từ các trigger và action cấp thấp, có thể xây dựng các hành vi tương tác phức tạp ở cấp cao hơn.
---

## Everywhere Actions là gì?

Everywhere Actions của Needle là một tập hợp các thành phần được lựa chọn cẩn thận cho phép bạn tạo ra các trải nghiệm tương tác trong Unity mà không cần viết một dòng mã nào.
Chúng được thiết kế để phục vụ như các khối xây dựng cho các trải nghiệm trên web, thiết bị di động và XR, **bao gồm cả Thực tế tăng cường trên iOS**.

Từ các trigger và action cấp thấp, có thể xây dựng các hành vi tương tác phức tạp ở cấp cao hơn.

### Nền tảng được hỗ trợ
- Desktop
- Thiết bị di động (Android / iOS)
- Kính VR
- Thiết bị AR
- iOS AR – QuickLook (vâng, thật vậy!)

## Làm thế nào để sử dụng Everywhere Actions?

Để hỗ trợ iOS, hãy thêm thành phần `USDZExporter` vào scene của bạn. Tốt nhất là thêm nó vào cùng đối tượng với thành phần `WebXR` (nhưng không bắt buộc)

Để thêm một action vào bất kỳ đối tượng nào trong scene của bạn
chọn đối tượng đó và sau đó nhấp vào `Add Component > Needle > Everywhere Actions > [Action]`.

![](/imgs/everywhere-actions-component-menu.gif)

## Danh sách các Everywhere Actions

| Hành động | Mô tả | Các trường hợp sử dụng ví dụ |
| --- | --- | --- |
| Play Animation on Click | Phát một trạng thái animation được chọn từ một Animator. Sau khi phát, nó có thể tùy chọn chuyển sang một animation khác. | Trình bày sản phẩm, hướng dẫn tương tác, chuyển động nhân vật |
| Change Material on Click | Chuyển đổi một material này sang các material khác. Tất cả các đối tượng có material đó sẽ được chuyển đổi cùng nhau. | Cấu hình sản phẩm, nhân vật |
| Look At | Làm cho một đối tượng nhìn vào camera. | Các phần tử UI, sprite, đồ họa thông tin, hiệu ứng billboard, điểm nóng có thể nhấp |
| Play Audio on Click | Phát một đoạn âm thanh được chọn. | Hiệu ứng âm thanh, tường thuật, triển lãm bảo tàng |
| Hide on Start | Ẩn một đối tượng khi scene bắt đầu để tiết lộ sau này. |
| Set Active on Click | Hiển thị hoặc ẩn các đối tượng. | |
| Change Transform on Click | Di chuyển, xoay hoặc thay đổi tỷ lệ một đối tượng. Cho phép di chuyển tuyệt đối hoặc tương đối. | Nhân vật, sản phẩm, animation UI (sử dụng animation cho các chuyển động phức tạp hơn) |
| Audio Source | Phát âm thanh khi bắt đầu và lặp lại liên tục. Không gian hoặc không không gian. | Nhạc nền, âm thanh môi trường |
| WebXR Image Tracking | Theo dõi một mục tiêu hình ảnh và hiển thị hoặc ẩn các đối tượng. | Trải nghiệm AR, trình bày sản phẩm |

## Mẫu

### Nhạc cụ

Minh họa âm thanh không gian, animation và tương tác.

<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Bộ điều khiển Nhân vật đơn giản

Minh họa cách kết hợp animation, nhìn vào và di chuyển.

<sample src="https://engine.needle.tools/samples-uploads/usdz-characters" />

### Theo dõi Hình ảnh

Minh họa cách gắn nội dung 3D vào một điểm đánh dấu hình ảnh tùy chỉnh.
Bắt đầu scene bên dưới trong AR và hướng camera điện thoại của bạn vào điểm đánh dấu hình ảnh trên màn hình, hoặc in nó ra.

:::info WebXR Image Tracking trên Android
**Trên Android** vui lòng bật "WebXR Incubations" trong Chrome Flags. Bạn có thể tìm thấy chúng bằng cách dán [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) vào thanh địa chỉ trình duyệt Chrome trên điện thoại Android của bạn.
:::

[Đọc thêm về Image Tracking với Needle Engine](./webxr-image-tracking.md)

<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Điểm đánh dấu hình ảnh" width=300 />

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />


### Tổng quan về Khối xây dựng Tương tác

<sample src="https://engine.needle.tools/samples-uploads/usdz-interactivity" />

## Tạo Everywhere Actions của riêng bạn

Tạo Everywhere Actions mới liên quan đến việc viết mã cho hành động của bạn bằng TypeScript, sẽ được sử dụng trong trình duyệt và cho WebXR, và sử dụng API TriggerBuilder và ActionBuilder của chúng tôi để tạo thiết lập phù hợp cho Thực tế tăng cường trên iOS qua QuickLook. Khi tạo các hành động tùy chỉnh, hãy lưu ý rằng QuickLook có một tập hợp tính năng hạn chế. Bạn vẫn có thể sử dụng bất kỳ mã nào bạn muốn cho trình duyệt và WebXR, nhưng hành vi cho QuickLook có thể cần phải là một xấp xỉ được xây dựng từ các trigger và action có sẵn.

:::tip
Thông thường, việc xây dựng các hành vi cụ thể đòi hỏi phải suy nghĩ sáng tạo và áp dụng khéo léo các hành động cấp thấp có sẵn. Một ví dụ sẽ là hành động "Tap to Place" – không có raycasting hoặc hit testing khả dụng trong QuickLook, nhưng bạn có thể bao phủ khu vực đặt mong muốn bằng một số đối tượng vô hình và sử dụng trigger "Tap" để di chuyển đối tượng cần đặt đến vị trí của đối tượng vô hình được chạm.
:::

Các Trigger và Action cho QuickLook dựa trên [Apple's Preliminary Interactive USD Schemas](https://developer.apple.com/documentation/arkit/usdz_schemas_for_ar/actions_and_triggers)

### Ví dụ mã

Đây là triển khai cho `HideOnStart` làm ví dụ về cách tạo một Everywhere Action với các triển khai cho cả trình duyệt và QuickLook:
@[code ts twoslash](@code/component-everywhere-action-hideonstart.ts)

:::tip
Thông thường, việc đạt được hành vi phù hợp sẽ bao gồm việc kết hợp các _hành động cấp cao hơn_ từ các _hành động cấp thấp hơn_ có sẵn. Ví dụ, hành động "Change Material on Click" của chúng tôi được tạo thành từ một số `fadeActions` và bên trong nó nhân bản các đối tượng với các bộ material khác nhau. Bằng cách xây dựng cẩn thận các hành động này, các hành vi phức tạp có thể được đạt được.
:::

### Các phương thức cấp thấp để xây dựng hành động của riêng bạn

| Triggers | |
| --- | --- |
| `TriggerBuilder.sceneStartTrigger` | |
| `TriggerBuilder.tapTrigger` | |

| Actions | |
| --- | --- |
| `ActionBuilder.fadeAction` | |
| `ActionBuilder.startAnimationAction` | |
| `ActionBuilder.waitAction` | |
| `ActionBuilder.lookAtCameraAction` | |
| `ActionBuilder.emphasize` | |
| `ActionBuilder.transformAction` | |
| `ActionBuilder.playAudioAction` | |

|  Group Actions | |
| --- | --- |
| `ActionBuilder.sequence` | |
| `ActionBuilder.parallel` | |
| `GroupAction.addAction` | |
| `GroupAction.makeParallel` | |
| `GroupAction.makeSequence` | |
| `GroupAction.makeLooping` | |
| `GroupAction.makeRepeat` | |

Để xem cách triển khai của các Everywhere Actions được tích hợp sẵn của chúng tôi, vui lòng xem `src/engine-components/export/usdz/extensions/behavior/BehaviourComponents.ts`.

## Tham khảo
- [Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)

## Đọc thêm

- [Truy cập Trang web Trưng bày AR của chúng tôi](https://engine.needle.tools/projects/ar-showcase/) có nhiều ví dụ AR tương tác tập trung vào iOS AR & Quicklook
- [Mẫu Everywhere Action của Needle Engine](https://engine.needle.tools/samples/?overlay=samples&tag=everywhere+actions)
- [Image Tracking với Needle Engine](./webxr-image-tracking.md)

Trang được dịch tự động bằng AI