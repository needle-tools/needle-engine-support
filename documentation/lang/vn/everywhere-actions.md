---
title: Hành động ở mọi nơi (Everywhere Actions)
---

## Hành động ở mọi nơi (Everywhere Actions) là gì?

Everywhere Actions của Needle là một tập hợp các thành phần được chọn lọc cẩn thận cho phép bạn tạo ra các trải nghiệm tương tác trong Unity mà không cần viết một dòng mã nào. Chúng được thiết kế để phục vụ như các khối xây dựng cho các trải nghiệm trên web, thiết bị di động và XR, **bao gồm cả Thực tế tăng cường (Augmented Reality) trên iOS**.

Từ các trigger và action cấp thấp, có thể xây dựng các hành vi tương tác phức tạp ở cấp cao hơn.

### Nền tảng được hỗ trợ
- Máy tính để bàn (Desktop)
- Thiết bị di động (Mobile - Android / iOS)
- Kính VR (VR Glasses)
- Thiết bị AR (AR Devices)
- iOS AR – QuickLook (vâng, thật vậy!)

## Tôi sử dụng Everywhere Actions như thế nào?

Để hỗ trợ iOS, hãy thêm thành phần `USDZExporter` vào scene của bạn. Tốt nhất là thêm nó vào cùng một đối tượng với thành phần `WebXR` (nhưng không bắt buộc)

Để thêm một action vào bất kỳ đối tượng nào trong scene của bạn
chọn đối tượng đó và sau đó nhấp vào `Add Component > Needle > Everywhere Actions > [Action]`.

![](/imgs/everywhere-actions-component-menu.gif)

## Danh sách các Hành động ở mọi nơi (Everywhere Actions)

| Hành động (Action) | Mô tả (Description) | Các trường hợp sử dụng ví dụ (Example Use Cases) |
| --- | --- | --- |
| Phát Animation khi Nhấp (Play Animation on Click) | Phát một trạng thái animation được chọn từ một Animator. Sau khi phát, tùy chọn có thể chuyển sang một animation khác. | Trình bày sản phẩm, hướng dẫn tương tác, chuyển động nhân vật |
| Thay đổi Material khi Nhấp (Change Material on Click) | Chuyển đổi một material này sang material khác. Tất cả các đối tượng sử dụng material đó sẽ được chuyển đổi cùng lúc. | Cấu hình sản phẩm, nhân vật |
| Nhìn vào (Look At) | Làm cho một đối tượng nhìn vào camera. | Các phần tử UI, sprite, đồ họa thông tin, hiệu ứng billboard, điểm nóng có thể nhấp |
| Phát Âm thanh khi Nhấp (Play Audio on Click) | Phát một đoạn âm thanh được chọn. | Hiệu ứng âm thanh, tường thuật, triển lãm bảo tàng |
| Ẩn khi Bắt đầu (Hide on Start) | Ẩn một đối tượng khi scene bắt đầu để tiết lộ sau này. | |
| Đặt Trạng thái Kích hoạt khi Nhấp (Set Active on Click) | Hiển thị hoặc ẩn các đối tượng. | |
| Thay đổi Transform khi Nhấp (Change Transform on Click) | Di chuyển, xoay hoặc thay đổi tỷ lệ một đối tượng. Cho phép di chuyển tuyệt đối hoặc tương đối. | Nhân vật, sản phẩm, animation UI (sử dụng animation cho các chuyển động phức tạp hơn) |
| Nguồn Âm thanh (Audio Source) | Phát âm thanh khi bắt đầu và lặp lại liên tục. Không gian hoặc không gian. | Nhạc nền, âm thanh môi trường |
| Theo dõi Hình ảnh WebXR (WebXR Image Tracking) | Theo dõi một mục tiêu hình ảnh và hiển thị hoặc ẩn các đối tượng. | Trải nghiệm AR, trình bày sản phẩm |

## Mẫu (Samples)

### Nhạc cụ (Musical Instrument)

Minh họa âm thanh không gian, animation và tương tác.

<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Bộ điều khiển Nhân vật đơn giản (Simple Character Controllers)

Minh họa cách kết hợp animation, nhìn vào và di chuyển.

<sample src="https://engine.needle.tools/samples-uploads/usdz-characters" />

### Theo dõi Hình ảnh (Image Tracking)

Minh họa cách gắn nội dung 3D vào một điểm đánh dấu hình ảnh tùy chỉnh. Bắt đầu scene bên dưới trong AR và hướng camera điện thoại của bạn vào điểm đánh dấu hình ảnh trên màn hình hoặc in nó ra.

<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Image Marker" width=300 />

<a href="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" target="_blank">Tải xuống Điểm đánh dấu hình ảnh mẫu (Download Sample Image Marker)</a>

**Trên Android:** vui lòng bật "WebXR Incubations" trong Chrome Flags. Bạn có thể tìm thấy chúng bằng cách dán [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) vào thanh địa chỉ trình duyệt Chrome trên điện thoại Android của bạn.

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />

### Tổng quan về Khối xây dựng tương tác (Interactive Building Blocks Overview)

<sample src="https://engine.needle.tools/samples-uploads/usdz-interactivity" />

## Tạo Hành động ở mọi nơi (Everywhere Actions) của riêng bạn

Tạo Hành động ở mọi nơi mới liên quan đến việc viết mã cho hành động của bạn bằng TypeScript, sẽ được sử dụng trong trình duyệt và cho WebXR, và sử dụng API TriggerBuilder và ActionBuilder của chúng tôi để tạo thiết lập phù hợp cho Thực tế tăng cường trên iOS qua QuickLook. Khi tạo các hành động tùy chỉnh, hãy lưu ý rằng QuickLook có một tập hợp tính năng hạn chế. Bạn vẫn có thể sử dụng bất kỳ mã nào bạn muốn cho trình duyệt và WebXR, nhưng hành vi cho QuickLook có thể cần phải là một xấp xỉ được xây dựng từ các trigger và action có sẵn.

:::tip
Thông thường, để có được hành vi phù hợp, bạn cần suy nghĩ sáng tạo và áp dụng một cách khéo léo các hành động cấp thấp có sẵn. Một ví dụ là hành động "Chạm để Đặt" (Tap to Place) – không có raycasting hoặc hit testing trong QuickLook, nhưng bạn có thể phủ khu vực đặt mong muốn bằng một số đối tượng vô hình và sử dụng trigger "Chạm" (Tap) để di chuyển đối tượng cần đặt đến vị trí của đối tượng vô hình được chạm.
:::

Các Trigger và Action cho QuickLook dựa trên [Apple's Preliminary Interactive USD Schemas](https://developer.apple.com/documentation/arkit/usdz_schemas_for_ar/actions_and_triggers)

### Ví dụ mã (Code Example)

Đây là triển khai cho `HideOnStart` làm ví dụ về cách tạo một Hành động ở mọi nơi với các triển khai cho cả trình duyệt và QuickLook:
@[code ts twoslash](@code/component-everywhere-action-hideonstart.ts)

::: tip
Thông thường, để có được hành vi phù hợp sẽ liên quan đến việc kết hợp các _hành động cấp cao hơn_ từ các _hành động cấp thấp hơn_ có sẵn. Ví dụ, hành động "Thay đổi Material khi Nhấp" (Change Material on Click) của chúng tôi được kết hợp từ một số `fadeActions` và bên trong nó nhân bản các đối tượng với các bộ material khác nhau. Bằng cách xây dựng cẩn thận các hành động này, các hành vi phức tạp có thể được đạt được.
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

Để xem cách triển khai của các Hành động ở mọi nơi được tích hợp sẵn của chúng tôi, vui lòng xem `src/engine-components/export/usdz/extensions/behavior/BehaviourComponents.ts`.

## Đọc thêm

Các trang sau đây cung cấp thêm ví dụ và mẫu mà bạn có thể thử nghiệm và khám phá ngay bây giờ:

- Truy cập [Trang web Trưng bày AR](https://engine.needle.tools/projects/ar-showcase/) của chúng tôi có nhiều ví dụ AR tương tác tập trung vào iOS AR & Quicklook
- [Mẫu Hành động ở mọi nơi của Needle Engine](https://engine.needle.tools/samples/?overlay=samples&tag=everywhere+actions)

Page automatically translated using AI