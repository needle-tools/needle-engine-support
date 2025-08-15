---
title: WebXR Image Tracking với Needle Engine
---

## WebXR Image Tracking là gì
**WebXR image tracking cho phép trình duyệt phát hiện và theo dõi các hình ảnh cụ thể trong thế giới thực** thông qua camera của thiết bị, cung cấp dữ liệu vị trí và hướng theo thời gian thực để neo nội dung ảo một cách chính xác vào các điểm đánh dấu vật lý như áp phích, bao bì hoặc tác phẩm nghệ thuật.

Bằng cách hướng camera vào một hình ảnh được nhận dạng, API theo dõi hình ảnh liên tục cập nhật mối quan hệ không gian giữa các yếu tố ảo và vật lý, đảm bảo sự căn chỉnh phù hợp ngay cả khi thiết bị hoặc hình ảnh di chuyển.

Theo dõi hình ảnh biến các hình ảnh tĩnh thành các tác nhân AR tương tác—cho phép tranh bảo tàng hiển thị thông tin phủ lên, bao bì sản phẩm tiết lộ hình ảnh động 3D hoặc danh thiếp hiển thị chi tiết liên hệ nổi—tất cả thông qua chuẩn web mà không yêu cầu người dùng tải xuống các ứng dụng chuyên dụng, giúp trải nghiệm AR có thể truy cập tức thì thông qua bất kỳ trình duyệt web tương thích nào.

## Bản demo

Needle Engine hỗ trợ **WebXR Image Tracking** ([Bản demo trực tiếp](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) trên Android và **QuickLook Image Tracking** trên iOS.

Khởi động cảnh dưới đây trong AR và hướng camera điện thoại của bạn vào điểm đánh dấu hình ảnh trên màn hình hoặc in nó ra.

:::info WebXR Image Tracking trên Android
**Trên Android** vui lòng bật "WebXR Incubations" trong Chrome Flags. Bạn có thể tìm thấy chúng bằng cách dán [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) vào thanh địa chỉ trình duyệt Chrome của điện thoại Android của bạn.
:::


<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Điểm đánh dấu hình ảnh" width=300 />    

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />


## Giải thích


:::warning WebXR Image Tracking vẫn đang trong giai đoạn "bản nháp" và chưa được phát hành rộng rãi
Cho đến nay, các nhà cung cấp trình duyệt vẫn chưa thể thống nhất về API theo dõi hình ảnh cuối cùng cho WebXR. Miễn là đặc tả đang trong giai đoạn "bản nháp" ([Giải thích theo dõi điểm đánh dấu](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
bạn và người dùng ứng dụng của bạn cần làm theo các bước sau để bật WebXR ImageTracking trên thiết bị Android:
1. Truy cập ``chrome://flags`` trên trình duyệt Chrome Android của bạn
2. Tìm và bật tùy chọn `WebXR Incubations`
:::

Nếu không có đặc tả đó, người ta vẫn có thể yêu cầu quyền truy cập hình ảnh camera và chạy các thuật toán tùy chỉnh để xác định tư thế thiết bị. Nhược điểm là người dùng sẽ phải chấp nhận các quyền bổ sung như truy cập camera, và việc theo dõi sẽ không chính xác bằng khả năng gốc của thiết bị.

Dưới đây là một số thư viện để thêm tính năng theo dõi hình ảnh dựa trên quyền truy cập camera và các thuật toán thị giác máy tính cục bộ:  
   - [Tích hợp AR.js thử nghiệm với Needle Engine](https://github.com/FireDragonGameStudio/NeedleAndARjs) bởi FireDragonGameStudio
   - [AR.js](https://github.com/AR-js-org/AR.js) (mã nguồn mở)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (mã nguồn mở)


### Tích hợp
Image Tracking có thể được thiết lập trong cả Unity và Blender bằng cách thêm một component WebXRImageTracking vào một đối tượng. Sau đó, thêm hình ảnh của bạn vào mảng `Tracked Images`.

![unity screenshot](/imgs/webxr-image-tracking-unity-component.jpg)  
*Component theo dõi hình ảnh trong Unity*

![blender screenshot](/imgs/webxr-image-tracking-blender-component.jpg)  
*Component theo dõi hình ảnh trong Blender*

## Tài liệu tham khảo

- [Giải thích theo dõi điểm đánh dấu WebXR](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)
- [WebXR Device API](https://www.w3.org/TR/webxr/)  
- [caniuse: WebXR](https://caniuse.com/webxr)  
- [Các hành vi USD sơ bộ của Apple](https://developer.apple.com/augmented-reality/quick-look/)


## Đọc thêm
- [Needle Everywhere Actions](./everywhere-actions.md) *trải nghiệm chạy ở mọi nơi*
- [Tài liệu XR](./xr.md)

Trang được dịch tự động bằng AI