---
title: VR & AR (WebXR)
---

## Thiết bị được hỗ trợ

Needle Engine hỗ trợ đầy đủ [WebXR specification](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API), bao gồm cả AR và VR. WebXR là một tiêu chuẩn web chính thức mang đến trải nghiệm nhập vai cho web, với tất cả lợi ích của web: không cần cài đặt, không cần app store, không cần SDKs.

Tất cả các thiết bị có trình duyệt đều có thể chạy các ứng dụng được tạo bằng Needle. Nếu trình duyệt hỗ trợ WebXR, các ứng dụng của bạn cũng sẽ tự động hoạt động trong XR, sử dụng các built-in components của chúng tôi. Điều này bao gồm trình duyệt trên máy tính để bàn, trình duyệt di động, nhiều trình duyệt trên các thiết bị AR/VR headsets, nhưng cũng bao gồm các công nghệ mới nổi khác như Looking Glass displays, smart glasses, và nhiều hơn nữa.

:::tip Hỗ trợ AR trên iOS không cần ứng dụng qua USDZ/QuickLook
Mặc dù các thiết bị iOS chưa có hỗ trợ WebXR chính thức, Needle hỗ trợ tạo AR experiences trên iOS bằng cách sử dụng [Everywhere Actions](everywhere-actions.md). Xem phần [iOS](#augmented-reality-and-webxr-on-ios) để biết thêm chi tiết. Bạn có thể tạo các trải nghiệm phong phú, tương tác hoạt động liền mạch trong AR trên các thiết bị iOS, ngay cả với những limitations mà Apple đưa ra.   

Khi bạn vào AR mode trên iOS, Needle sẽ tự động chuyển đổi scene của bạn thành một USDZ file, sau đó được hiển thị trong AR sử dụng Apple's QuickLook. Objects, materials, audio, animation và Everywhere Actions sẽ được giữ nguyên.
:::

Bảng sau liệt kê một số thiết bị mà chúng tôi đã xác minh hoạt động với Needle Engine.
Khi một thiết bị mới ra mắt hỗ trợ WebXR, nó sẽ hoạt động với ứng dụng của bạn ngay lập tức. Đây là một trong những lợi thế lớn của việc xây dựng với trình duyệt làm nền tảng – khả năng tương thích không bị giới hạn trong một tập hợp thiết bị hoặc SDK cụ thể.


| Thiết bị Headset | Browser | Notes |
| -- | -- | -- |
| Apple Vision Pro | ✔️ Safari | hand tracking, support for transient pointer |
| Meta Quest 3 | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup>, passthrough, depth sensing, mesh tracking |
| Meta Quest 3S | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup>, passthrough, depth sensing, mesh tracking |
| Meta Quest 2 | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup>, passthrough (black and white) |
| Meta Quest 1 | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup> |
| Meta Quest Pro | ✔️ Meta Browser | hand tracking, support for sessiongranted<sup>1</sup>, passthrough |
| Pico Neo 4 | ✔️ Pico Browser | passthrough, hand tracking<sup>2</sup> |
| Pico Neo 3 | ✔️ Pico Browser | no hand tracking, inverted controller thumbsticks |
| Oculus Rift 1/2 | ✔️ Chrome |  |
| Valve Index | ✔️ Chrome |  |
| HTC Vive | ✔️ Chrome |  |
| Hololens 2 | ✔️ Edge | hand tracking, support for AR and VR (in VR mode, background is rendered as well) |

| Thiết bị Mobile | Browser | Notes |
| -- | -- | -- |
| Android 10+ | ✔️ Chrome | |
| Android 10+ | ✔️ Firefox | |
| iOS 15+ | (✔️)<sup>3</sup> Safari<br/>(✔️)<sup>3</sup> Chrome | Không hỗ trợ mã đầy đủ, nhưng Needle [Everywhere Actions](everywhere-actions.md) được hỗ trợ để tạo các tệp USDZ động, tương tác. |
| iOS 15+ | ✔️ WebXR Viewer | trình duyệt hiện đã khá cũ |
| Hololens 2 | ✔️ Edge | |
| Hololens 1 | ❌ | no WebXR support |
| Magic Leap 2 | ✔️ | |
| Magic Leap 1 | ✔️ | thiết bị đã ngừng hỗ trợ |

| Thiết bị khác | Browser | Notes |
| -- | -- | -- |
| Looking Glass Holographic Display | ✔️ Chrome | yêu cầu Looking Glass bridge và một số mã tùy chỉnh, [xem ví dụ của chúng tôi](https://engine.needle.tools/samples/looking-glass/) |
| Logitech MX Ink | ✔️ Meta Browser | được hỗ trợ chính thức, xem [tài liệu](https://logitech.github.io/mxink/WebXR/WebXrIntegration.html#using-needle-tools) |

<sup>1</sup>: Yêu cầu bật một cờ trình duyệt: `chrome://flags/#webxr-navigation-permission`   
<sup>2</sup>: Yêu cầu bật một công tắc trong cài đặt Developer    
<sup>3</sup>: Sử dụng [Everywhere Actions](everywhere-actions.md) hoặc [các phương pháp khác](#augmented-reality-and-webxr-on-ios)

## Ví dụ về VR, AR và QuickLook

Truy cập [Needle Engine Samples](https://engine.needle.tools/samples/?overlay=samples&tag=xr) của chúng tôi để thử nhiều ví dụ tương tác ngay bây giờ. Hoặc, thử trực tiếp trên thiết bị của bạn bằng cách nhấp vào nút <kbd>QR Code</kbd> (cho điện thoại) hoặc <kbd>Open on Quest</kbd> (cho tai nghe Meta Quest) bên dưới.

<sample src="https://engine.needle.tools/samples/collaborative-sandbox/"/>

## Thêm khả năng VR và AR vào một scene

AR, VR và khả năng mạng trong Needle Engine được thiết kế theo mô-đun. Bạn có thể chọn không hỗ trợ bất kỳ tính năng nào trong số đó, hoặc chỉ thêm các tính năng cụ thể. 

### Các khả năng cơ bản

1. **Bật AR và VR**  
  Thêm một `WebXR` component.  
  *Tùy chọn:* bạn có thể đặt một avatar tùy chỉnh bằng cách tham chiếu một [Avatar Prefab](#avatars).   
  Mặc định, một `DefaultAvatar` cơ bản được gán.
  
2. **Bật Teleportation**  
  Thêm một `TeleportTarget` component vào các object hierarchies mà có thể teleport đến.  
  Để loại trừ các object cụ thể, hãy đặt layer của chúng thành `IgnoreRaycasting`.  

### Multiplayer

1. **Bật Networking**  
  Thêm một `SyncedRoom` component.

2. **Bật Desktop Viewer Sync**  
  Thêm một `SyncedCamera` component.
  
3. **Bật Voice Chat**  
  Thêm một `VoIP` component.

:::tip Cấu trúc Scene
Các components này có thể ở bất cứ đâu trong hierarchy của bạn. Chúng cũng có thể nằm tất cả trên cùng một GameObject, đây là một pattern phổ biến.
:::

 > **[Castle Builder](https://castle.needle.tools/)** sử dụng tất cả những điều trên cho trải nghiệm sandbox đa nền tảng, nhiều người chơi.   
 > — #madebyneedle 💚  
   
### Special AR Components

1. **Xác định AR Session root và scale**  
  Thêm một `WebARSessionRoot` component vào root object của bạn. Đối với AR experiences, bạn thường muốn scale scene để phù hợp với thế giới thực.  
2. Xác định **user scale** để thu nhỏ (< 1) hoặc phóng to (> 1) người dùng so với scene khi vào AR.

### Controlling object display for XR

1. **Xác định xem một object có hiển thị trong Browser, AR, VR, First Person, Third Person không**  
  Thêm một `XR Flag` component vào object mà bạn muốn kiểm soát.

2. **Thay đổi các tùy chọn trên dropdown** khi cần.   
    Các trường hợp sử dụng phổ biến là
    - ẩn sàn khi vào AR
    - ẩn các phần của Avatar trong các chế độ xem First Person hoặc Third Person. Ví dụ, trong chế độ xem góc nhìn thứ nhất, một người không nên có thể nhìn thấy mô hình đầu của chính họ.

### Di chuyển giữa các thế giới VR

Needle Engine hỗ trợ trạng thái [`sessiongranted`](https://github.com/immersive-web/navigation). Điều này cho phép người dùng di chuyển liền mạch giữa các ứng dụng WebXR mà không cần rời khỏi một immersive session – họ vẫn ở trong VR hoặc AR.  

Hiện tại, điều này chỉ được hỗ trợ trên Oculus Quest 1, 2 và 3 trong Oculus Browser. Trên các nền tảng khác, người dùng sẽ bị thoát khỏi immersive session hiện tại của họ và phải vào lại VR trên trang mới.  
Yêu cầu bật một cờ trình duyệt: `chrome://flags/#webxr-navigation-permission`  

- **Nhấp vào các object để mở liên kết**  
  Thêm `OpenURL` component giúp việc xây dựng các thế giới được kết nối trở nên rất dễ dàng.  

## Scripting  
Đọc thêm về scripting cho XR tại [tài liệu scripting XR](./scripting.md#xr-event-methods)

## Avatars

Mặc dù hiện tại chúng tôi không cung cấp tích hợp sẵn cho các hệ thống avatar bên ngoài, bạn có thể tạo các avatar dành riêng cho ứng dụng hoặc các hệ thống tùy chỉnh.  

- **Tạo một Avatar tùy chỉnh**  
  - Tạo một GameObject trống làm avatar root
  - Thêm một object có tên `Head` và thêm một `XRFlag` được đặt thành Third Person
  - Thêm các object có tên `HandLeft` và `HandRight`
  - Thêm đồ họa của bạn bên dưới các object này.

### Experimental Avatar Components

Có một số experimental components để xây dựng các Avatar biểu cảm hơn. Tại thời điểm này, chúng tôi khuyến nghị sao chép chúng để tạo các biến thể của riêng bạn, vì chúng có thể bị thay đổi hoặc xóa sau này.  

![20220817-230858-87dG-Unity_PLjQ](https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif)  
*Ví dụ Avatar Rig với mô hình cổ cơ bản và các giới hạn chi*

- **Màu sắc ngẫu nhiên cho người chơi**  
  Ví dụ về tùy chỉnh avatar, bạn có thể thêm một `PlayerColor` component vào các renderers của mình.  
  Màu ngẫu nhiên này được đồng bộ hóa giữa các người chơi.  

- **Xoay mắt**  
  `AvatarEyeLook_Rotation` xoay GameObjects (mắt) để theo dõi các avatar khác và một mục tiêu ngẫu nhiên. Component này được đồng bộ hóa giữa các người chơi.  
  
- **Nháy mắt**  
  `AvatarBlink_Simple` ngẫu nhiên ẩn GameObjects (mắt) mỗi vài giây, mô phỏng một cái chớp mắt.  
  
  ![image](https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png)  
  *Ví dụ về phân cấp Avatar Prefab*
  
- **Giới hạn bù trừ**  
  `OffsetConstraint` cho phép dịch chuyển một object so với một object khác trong không gian Avatar. Điều này cho phép, ví dụ, có một Body theo dõi Head nhưng giữ cho rotation được cân bằng. Nó cũng cho phép xây dựng các mô hình cổ đơn giản.  
  
- **Giới hạn chi**  
  `BasicIKConstraint` là một constraint rất tối giản nhận hai transform và một gợi ý. Điều này hữu ích để xây dựng các chuỗi cánh tay hoặc chân đơn giản. Vì rotation hiện tại chưa được triển khai đúng cách, cánh tay và chân có thể cần đối xứng quay để "trông đúng". Nó được gọi là "Basic" là có lý do!  

## HTML Content Overlays in AR  
    
Nếu bạn muốn hiển thị nội dung html khác nhau tùy thuộc vào việc client đang sử dụng trình duyệt thông thường hay đang sử dụng AR hoặc VR, bạn có thể chỉ cần sử dụng một tập hợp các lớp html.  
Điều này được kiểm soát thông qua các lớp HTML element. Ví dụ, để làm cho nội dung xuất hiện trên máy tính để bàn và trong AR, hãy thêm một ``<div class="desktop ar"> ... </div>`` bên trong thẻ `<needle-engine>`:  

```html
<needle-engine>
    <div class="desktop ar" style="pointer-events:none;">
        <div class="positioning-container">
          <p>nội dung của bạn cho AR và máy tính để bàn ở đây</p>
          <p class="only-in-ar">Cái này sẽ chỉ hiển thị trong AR</p>
        <div>
    </div>
</needle-engine>
```

Content Overlays được triển khai bằng cách sử dụng tính năng `dom-overlay` tùy chọn, thường được hỗ trợ trên các thiết bị AR dựa trên màn hình (điện thoại, máy tính bảng).  

Sử dụng lớp `.ar-session-active` để hiển thị/ẩn nội dung cụ thể khi ở trong AR. Lớp giả [`:xr-overlay`](https://www.w3.org/TR/webxr-dom-overlays-1/#css-pseudo-class) không nên được sử dụng vào thời điểm này vì việc sử dụng nó làm hỏng WebXR Viewer của Mozilla. 

```css
.only-in-ar {
  display: none;
}

.ar-session-active .only-in-ar {
  display:initial;
}
```

Điều đáng chú ý là phần tử overlay [sẽ luôn được hiển thị toàn màn hình khi ở trong XR](https://www.w3.org/TR/webxr-dom-overlays-1/#ua-style-sheet-defaults), không phụ thuộc vào kiểu dáng đã được áp dụng. Nếu bạn muốn căn chỉnh các mục khác nhau, bạn nên tạo một container _bên trong_ phần tử `class="ar"`.  

<sample src="https://engine.needle.tools/samples-uploads/ar-overlay/"/>


## Augmented Reality và WebXR trên iOS

Trải nghiệm Augmented Reality trên iOS có phần hạn chế, do Apple hiện không hỗ trợ WebXR trên các thiết bị iOS.  

Needle Engine's [Everywhere Actions](everywhere-actions.md) được thiết kế để lấp đầy khoảng trống đó, mang đến khả năng tương tác tự động cho các thiết bị iOS đối với các scene được tạo thành từ các components cụ thể. Chúng hỗ trợ một tập hợp con các chức năng có sẵn trong WebXR, ví dụ: spatial audio, image tracking, animations, và nhiều hơn nữa. Xem [tài liệu](everywhere-actions.md) để biết thêm thông tin.

:::tip Hỗ trợ mã tùy chỉnh hạn chế trong QuickLook
Apple có những hạn chế nghiêm ngặt về loại nội dung có thể được sử dụng trong QuickLook. Do đó, các custom script components không thể tự động được chuyển đổi để sử dụng trong AR trên iOS. Bạn có thể thêm hỗ trợ cho một số loại custom code bằng cách sử dụng Everywhere Actions API của chúng tôi.
:::

### Nhạc cụ – Hỗ trợ WebXR và QuickLook

Đây là một ví dụ về một nhạc cụ sử dụng Everywhere Actions và do đó hoạt động trong trình duyệt và trong AR trên các thiết bị iOS. 
Nó sử dụng spatial audio, animation và tap interactions.  
<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Everywhere Actions và các tùy chọn khác cho iOS AR

Cũng có các tùy chọn khác để hướng dẫn người dùng iOS đến các trải nghiệm AR tương tác mạnh mẽ hơn:

3. **Xuất nội dung ngay lập tức dưới dạng tệp USDZ.**  
   Các tệp này có thể được hiển thị trên các thiết bị iOS trong AR. Khi xuất từ các scene với Everywhere Actions, khả năng tương tác là như nhau, quá đủ cho các cấu hình sản phẩm, trải nghiệm kể chuyện và tương tự.
   Một ví dụ là [Castle Builder](https://castle.needle.tools) nơi các sáng tạo (không phải phiên trực tiếp) có thể được xem trong AR.  

 > **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** sử dụng phương pháp này. Người chơi có thể cộng tác đặt văn bản vào scene trên màn hình của họ và sau đó xem kết quả trong AR trên iOS. Trên Android, họ cũng có thể tương tác trực tiếp trong WebXR.   
 > — #madewithneedle by Katja Rempel 💚  

1. **Hướng dẫn người dùng đến các trình duyệt tương thích WebXR trên iOS.**
   Tùy thuộc vào đối tượng mục tiêu của bạn, bạn có thể hướng dẫn người dùng iOS đến ví dụ như [WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056) của Mozilla để trải nghiệm AR trên iOS.  
   
2. **Sử dụng quyền truy cập camera và các thuật toán tùy chỉnh trên các thiết bị iOS.**  
   Người ta có thể yêu cầu quyền truy cập hình ảnh camera và chạy các thuật toán tùy chỉnh để xác định tư thế thiết bị.  
   Mặc dù hiện tại chúng tôi không cung cấp các built-in components cho điều này, đây là một vài tài liệu tham khảo về các thư viện và framework mà chúng tôi muốn thử trong tương lai:  
   - [AR.js](https://github.com/AR-js-org/AR.js) (open source)
     - [Experimental AR.js integration](https://github.com/FireDragonGameStudio/NeedleAndARjs) by FireDragonGameStudio
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)
   - [8th Wall](https://www.8thwall.com/) (commercial)


## Image Tracking

Needle Engine hỗ trợ **WebXR Image Tracking** ([Bản demo trực tiếp](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) trên Android và **QuickLook Image Tracking** trên iOS.

Bạn có thể tìm thấy tài liệu bổ sung trên trang [WebXR Image Tracking](./webxr-image-tracking.md).

:::warning WebXR Image Tracking vẫn đang trong giai đoạn "bản nháp" và chưa khả dụng rộng rãi
Cho đến nay, các nhà cung cấp trình duyệt vẫn chưa thể thống nhất về API theo dõi hình ảnh cuối cùng cho WebXR. Chừng nào đặc tả còn ở giai đoạn "bản nháp" ([Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
bạn và người dùng ứng dụng của bạn cần làm theo các bước sau để bật WebXR ImageTracking trên các thiết bị Android:
1. Truy cập ``chrome://flags`` trên trình duyệt Android Chrome của bạn
2. Tìm và bật tùy chọn `WebXR Incubations`
:::


Nếu không có spec đó, người ta vẫn có thể yêu cầu quyền truy cập hình ảnh camera và chạy các thuật toán tùy chỉnh để xác định tư thế thiết bị. Nhược điểm là người dùng sẽ phải chấp nhận các quyền bổ sung như quyền truy cập camera, và khả năng theo dõi sẽ không chính xác bằng các khả năng gốc của thiết bị.

Dưới đây là một số thư viện để thêm theo dõi hình ảnh dựa trên quyền truy cập camera và các thuật toán computer vision cục bộ:  
   - [Experimental AR.js integration with Needle Engine](https://github.com/FireDragonGameStudio/NeedleAndARjs) by FireDragonGameStudio
   - [AR.js](https://github.com/AR-js-org/AR.js) (open source)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)


## Tham khảo

[WebXR Device API](https://www.w3.org/TR/webxr/)  
[caniuse: WebXR](https://caniuse.com/webxr)  
[Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)

Trang được dịch tự động bằng AI