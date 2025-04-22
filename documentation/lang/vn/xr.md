---
title: VR & AR (WebXR)
---

## Thiết bị được hỗ trợ

Needle Engine hỗ trợ đầy đủ [WebXR specification](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API), bao gồm cả AR và VR. WebXR là một tiêu chuẩn web chính thức mang đến trải nghiệm nhập vai cho web, với tất cả lợi ích của web: không cần cài đặt, không cần app store, không cần SDK.

Tất cả các thiết bị có trình duyệt đều có thể chạy các ứng dụng được tạo bằng Needle. Nếu trình duyệt hỗ trợ WebXR, các ứng dụng của bạn cũng sẽ tự động hoạt động trong XR, sử dụng các components được tích hợp sẵn của chúng tôi. Điều này bao gồm trình duyệt desktop, trình duyệt di động, nhiều trình duyệt trên các thiết bị AR/VR headset, nhưng cũng bao gồm các công nghệ mới nổi khác như Looking Glass displays, smart glasses, và nhiều hơn nữa.

:::tip Hỗ trợ AR trên iOS không cần ứng dụng thông qua USDZ/QuickLook
Mặc dù các thiết bị iOS chưa có hỗ trợ WebXR chính thức, Needle hỗ trợ tạo trải nghiệm AR trên iOS bằng cách sử dụng [Everywhere Actions](everywhere-actions.md). Xem phần [iOS](#augmented-reality-and-webxr-on-ios) để biết thêm chi tiết. Bạn có thể tạo các trải nghiệm phong phú, tương tác liền mạch trong AR trên các thiết bị iOS, ngay cả với những hạn chế mà Apple đưa ra.   

Khi bạn vào chế độ AR trên iOS, Needle sẽ tự động chuyển đổi scene của bạn thành một tệp USDZ, sau đó được hiển thị trong AR bằng QuickLook của Apple. Objects, materials, audio, animation và Everywhere Actions sẽ được giữ nguyên.
:::

Bảng sau liệt kê một số thiết bị mà chúng tôi đã xác minh hoạt động với Needle Engine.
Khi một thiết bị mới ra mắt hỗ trợ WebXR, nó sẽ hoạt động ngay với các ứng dụng của bạn. Đây là một trong những lợi thế lớn của việc xây dựng với trình duyệt làm nền tảng – khả năng tương thích không bị giới hạn bởi một bộ thiết bị hoặc SDK cụ thể.


| Thiết bị Headset | Trình duyệt | Ghi chú |
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

| Thiết bị di động | Trình duyệt | Ghi chú |
| -- | -- | -- |
| Android 10+ | ✔️ Chrome | |
| Android 10+ | ✔️ Firefox | |
| iOS 15+ | (✔️)<sup>3</sup> Safari<br/>(✔️)<sup>3</sup> Chrome | No full code support, but Needle [Everywhere Actions](everywhere-actions.md) are supported for creating dynamic, interactive USDZ files. |
| iOS 15+ | ✔️ WebXR Viewer | trình duyệt hiện đã hơi cũ |
| Hololens 2 | ✔️ Edge | |
| Hololens 1 | ❌ | no WebXR support |
| Magic Leap 2 | ✔️ | |
| Magic Leap 1 | ✔️ | thiết bị đã ngừng phát triển |

| Thiết bị khác | Trình duyệt | Ghi chú |
| -- | -- | -- |
| Looking Glass Holographic Display | ✔️ Chrome | yêu cầu Looking Glass bridge và một số custom code, [xem sample của chúng tôi](https://engine.needle.tools/samples/looking-glass/) |
| Logitech MX Ink | ✔️ Meta Browser | được hỗ trợ chính thức, xem [docs](https://logitech.github.io/mxink/WebXR/WebXrIntegration.html#using-needle-tools) |

<sup>1</sup>: Yêu cầu bật một browser flag: `chrome://flags/#webxr-navigation-permission`   
<sup>2</sup>: Yêu cầu bật một toggle trong Developer settings    
<sup>3</sup>: Sử dụng [Everywhere Actions](everywhere-actions.md) hoặc [các phương pháp khác](#augmented-reality-and-webxr-on-ios)

## Ví dụ về VR, AR và QuickLook

Truy cập [Needle Engine Samples](https://engine.needle.tools/samples/?overlay=samples&tag=xr) của chúng tôi để thử nhiều ví dụ tương tác ngay bây giờ. Hoặc, thử trực tiếp trên thiết bị của bạn bằng cách nhấp vào các nút <kbd>QR Code</kbd> (cho điện thoại) hoặc <kbd>Open on Quest</kbd> (cho các thiết bị Meta Quest headset) bên dưới.

<sample src="https://engine.needle.tools/samples/collaborative-sandbox/"/>

## Thêm khả năng VR và AR vào một scene

Các khả năng AR, VR và networking trong Needle Engine được thiết kế theo dạng modular. Bạn có thể chọn không hỗ trợ bất kỳ khả năng nào trong số đó, hoặc chỉ thêm các tính năng cụ thể. 

### Khả năng cơ bản

1. **Bật AR và VR**  
  Thêm một component `WebXR`.  
  *Tùy chọn:* bạn có thể thiết lập một custom avatar bằng cách tham chiếu đến một [Avatar Prefab](#avatars).   
  Theo mặc định, một `DefaultAvatar` cơ bản được gán.
  
2. **Bật Teleportation**  
  Thêm một component `TeleportTarget` vào object hierarchies có thể thực hiện teleportation.  
  Để loại trừ các objects cụ thể, hãy đặt layer của chúng là `IgnoreRaycasting`.  

### Multiplayer

1. **Bật Networking**  
  Thêm một component `SyncedRoom`.

2. **Bật Desktop Viewer Sync**  
  Thêm một component `SyncedCamera`.
  
3. **Bật Voice Chat**  
  Thêm một component `VoIP`.

:::tip Cấu trúc Scene
Các component này có thể nằm bất kỳ đâu bên trong hierarchy của bạn. Chúng cũng có thể cùng nằm trên cùng một GameObject, đây là một mô hình phổ biến.
:::

 > **[Castle Builder](https://castle.needle.tools/)** sử dụng tất cả các tính năng trên cho trải nghiệm sandbox multiplayer đa nền tảng.   
 > — #madebyneedle 💚  
   
### Special AR Components

1. **Xác định AR Session root và scale**  
  Thêm một component `WebARSessionRoot` vào root object của bạn. Đối với các trải nghiệm AR, thường bạn muốn scale scene để phù hợp với thế giới thực.  
2. Xác định **user scale** để thu nhỏ (< 1) hoặc phóng to (> 1) người dùng so với scene khi vào AR.

### Kiểm soát hiển thị object cho XR

1. **Xác định liệu một object có hiển thị trong Browser, AR, VR, First Person, Third Person hay không**  
  Thêm một component `XR Flag` vào object mà bạn muốn kiểm soát.

2. **Thay đổi các tùy chọn trên dropdown** theo nhu cầu.   
    Các trường hợp sử dụng phổ biến là
    - ẩn sàn nhà khi vào AR
    - ẩn các bộ phận Avatar trong chế độ First Person hoặc Third Person. Ví dụ, trong chế độ first-person view, một người không nên nhìn thấy mô hình đầu của chính họ.

### Di chuyển giữa các thế giới VR

Needle Engine hỗ trợ trạng thái [`sessiongranted`](https://github.com/immersive-web/navigation). Điều này cho phép người dùng di chuyển liền mạch giữa các ứng dụng WebXR mà không thoát khỏi immersive session – họ vẫn ở trong VR hoặc AR.  

Hiện tại, tính năng này chỉ được hỗ trợ trên Oculus Quest 1, 2 và 3 trong Oculus Browser. Trên các nền tảng khác, người dùng sẽ bị thoát khỏi immersive session hiện tại và phải vào lại VR trên trang mới.  
Yêu cầu bật một browser flag: `chrome://flags/#webxr-navigation-permission`  

- **Nhấp vào objects để mở link**  
  Thêm component `OpenURL` giúp việc xây dựng các thế giới kết nối trở nên rất dễ dàng.

## Scripting  
Đọc thêm về scripting cho XR tại tài liệu [scripting XR](./scripting.md#xr-event-methods)

## Avatars

Mặc dù hiện tại chúng tôi không cung cấp tích hợp sẵn các hệ thống avatar bên ngoài, bạn có thể tạo các avatar dành riêng cho ứng dụng hoặc các hệ thống custom.  

- **Tạo một custom Avatar**  
  - Tạo một GameObject rỗng làm avatar root
  - Thêm một object tên `Head` và thêm một `XRFlag` được đặt thành Third Person
  - Thêm các objects tên `HandLeft` và `HandRight`
  - Thêm graphics của bạn bên dưới các objects này.

### Experimental Avatar Components

Có một số experimental components để xây dựng các Avatars biểu cảm hơn. Tại thời điểm này, chúng tôi khuyến nghị sao chép chúng để tạo các biến thể của riêng bạn, vì chúng có thể bị thay đổi hoặc loại bỏ sau này.  

![20220817-230858-87dG-Unity_PLjQ](https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif)  
*Ví dụ về Avatar Rig với basic neck model và limb constraints*

- **Random Player Colors**  
  Như một ví dụ về avatar customization, bạn có thể thêm một component `PlayerColor` vào renderers của mình.  
  Màu ngẫu nhiên này được đồng bộ hóa giữa các người chơi.  

- **Eye Rotation**  
  `AvatarEyeLook_Rotation` xoay GameObjects (eyes) để theo dõi các avatar khác và một random target. Component này được đồng bộ hóa giữa các người chơi.  
  
- **Eye Blinking**  
  `AvatarBlink_Simple` ngẫu nhiên ẩn GameObjects (eyes) sau mỗi vài giây, mô phỏng việc chớp mắt.  
  
  ![image](https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png)  
  *Ví dụ về Avatar Prefab hierarchy*
  
- **Offset Constraint**  
  `OffsetConstraint` cho phép dịch chuyển một object so với một object khác trong không gian Avatar. Điều này cho phép, ví dụ, Body đi theo Head nhưng giữ cho rotation cân bằng. Nó cũng cho phép xây dựng các simple neck models.  
  
- **Limb Constraint**  
  `BasicIKConstraint` là một constraint rất tối giản, nhận hai transforms và một hint. Điều này hữu ích để xây dựng các simple arm hoặc leg chains. Vì rotation hiện chưa được triển khai đúng cách, cánh tay và chân có thể cần phải đối xứng quay để "trông đúng". Nó được gọi là "Basic" là có lý do!  

## HTML Content Overlays trong AR  
    
Nếu bạn muốn hiển thị nội dung html khác nhau tùy thuộc vào việc client đang sử dụng trình duyệt thông thường hay AR hoặc VR, bạn chỉ cần sử dụng một tập hợp các html classes.  
Điều này được kiểm soát thông qua HTML element classes. Ví dụ, để hiển thị nội dung trên desktop và trong AR, hãy thêm ``<div class="desktop ar"> ... </div>`` bên trong thẻ `<needle-engine>`:  

```html
<needle-engine>
    <div class="desktop ar" style="pointer-events:none;">
        <div class="positioning-container">
          <p>your content for AR and desktop goes here</p>
          <p class="only-in-ar">This will only be visible in AR</p>
        <div>
    </div>
</needle-engine>
```

Content Overlays được triển khai bằng cách sử dụng tính năng `dom-overlay` tùy chọn, thường được hỗ trợ trên các thiết bị AR dựa trên màn hình (điện thoại, máy tính bảng).  

Sử dụng class `.ar-session-active` để hiển thị/ẩn nội dung cụ thể khi ở trong AR. [`:xr-overlay` pseudo class](https://www.w3.org/TR/webxr-dom-overlays-1/#css-pseudo-class) không nên được sử dụng tại thời điểm này vì việc sử dụng nó làm hỏng WebXR Viewer của Mozilla. 

```css
.only-in-ar {
  display: none;
}

.ar-session-active .only-in-ar {
  display:initial;
}
```

Cần lưu ý rằng overlay element [sẽ luôn được hiển thị toàn màn hình khi ở trong XR](https://www.w3.org/TR/webxr-dom-overlays-1/#ua-style-sheet-defaults), bất kể styling đã được áp dụng. Nếu bạn muốn căn chỉnh các mục khác nhau, bạn nên tạo một container _bên trong_ element có `class="ar"`.  

<sample src="https://engine.needle.tools/samples-uploads/ar-overlay/"/>


## Augmented Reality và WebXR trên iOS

Trải nghiệm Augmented Reality trên iOS hơi bị hạn chế, do Apple hiện không hỗ trợ WebXR trên các thiết bị iOS.  

[Everywhere Actions](everywhere-actions.md) của Needle Engine được thiết kế để lấp đầy khoảng trống đó, mang đến khả năng tương tác tự động cho các thiết bị iOS đối với các scene được cấu tạo từ các components cụ thể. Chúng hỗ trợ một tập hợp con các chức năng có sẵn trong WebXR, ví dụ như spatial audio, image tracking, animations, và nhiều hơn nữa. Xem [tài liệu](everywhere-actions.md) để biết thêm thông tin.

:::tip Hỗ trợ custom code hạn chế trong QuickLook
Apple có những hạn chế chặt chẽ về loại nội dung có thể sử dụng trong QuickLook. Do đó, custom script components không thể tự động chuyển đổi để sử dụng trong AR trên iOS. Bạn có thể thêm hỗ trợ cho một số loại custom code bằng cách sử dụng Everywhere Actions API của chúng tôi.
:::

### Nhạc cụ – Hỗ trợ WebXR và QuickLook

Đây là một ví dụ về một nhạc cụ sử dụng Everywhere Actions và do đó hoạt động trong các trình duyệt và trong AR trên các thiết bị iOS. 
Nó sử dụng spatial audio, animation và tap interactions.  
<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Everywhere Actions và các tùy chọn khác cho iOS AR

Ngoài ra còn có các tùy chọn khác để hướng dẫn người dùng iOS đến những trải nghiệm AR tương tác mạnh mẽ hơn nữa:

3. **Export nội dung on-the-fly dưới dạng tệp USDZ.**  
   Các tệp này có thể hiển thị trên các thiết bị iOS trong AR. Khi xuất từ các scene có Everywhere Actions, khả năng tương tác vẫn giữ nguyên, đủ cho các product configurators, narrative experiences và tương tự.
   Một ví dụ là [Castle Builder](https://castle.needle.tools) nơi các sản phẩm được tạo (không phải live session) có thể được xem trong AR.  

 > **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** sử dụng phương pháp này. Người chơi có thể cùng nhau đặt text vào scene trên màn hình của họ và sau đó xem kết quả trong AR trên iOS. Trên Android, họ cũng có thể tương tác trực tiếp trong WebXR.   
 > — #madewithneedle by Katja Rempel 💚  

1. **Hướng dẫn người dùng đến các trình duyệt tương thích WebXR trên iOS.**
   Tùy thuộc vào đối tượng mục tiêu của bạn, bạn có thể hướng dẫn người dùng trên iOS đến, ví dụ, [WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056) của Mozilla để trải nghiệm AR trên iOS.  
   
2. **Sử dụng camera access và custom algorithms trên các thiết bị iOS.**  
   Người ta có thể yêu cầu camera image access và chạy custom algorithms để xác định device pose.  
   Mặc dù hiện tại chúng tôi không cung cấp built-in components cho việc này, dưới đây là một vài tham chiếu đến các thư viện và framework mà chúng tôi muốn thử trong tương lai:  
   - [AR.js](https://github.com/AR-js-org/AR.js) (open source)
     - [Experimental AR.js integration](https://github.com/FireDragonGameStudio/NeedleAndARjs) của FireDragonGameStudio
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)
   - [8th Wall](https://www.8thwall.com/) (commercial)

## Image Tracking

Needle Engine hỗ trợ **WebXR Image Tracking** ([Live Demo](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) trên Android và **QuickLook Image Tracking** trên iOS.

Bạn có thể tìm thấy tài liệu bổ sung trong phần [Everywhere Actions](everywhere-actions.md#image-tracking).

:::warning WebXR Image Tracking vẫn đang trong giai đoạn "draft" và chưa phổ biến rộng rãi
Cho đến nay, các browser vendors vẫn chưa thống nhất được API image tracking cuối cùng cho WebXR. Chừng nào specification còn trong giai đoạn "draft" ([Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
bạn và người dùng ứng dụng của bạn cần làm theo các bước sau để bật WebXR ImageTracking trên thiết bị Android:
1. Truy cập ``chrome://flags`` trên trình duyệt Chrome Android của bạn
2. Tìm và bật tùy chọn `WebXR Incubations`
:::


Nếu không có spec đó, người ta vẫn có thể yêu cầu camera image access và chạy custom algorithms để xác định device pose. Nhược điểm là người dùng sẽ phải chấp nhận các permissions bổ sung như camera access, và việc tracking sẽ không chính xác bằng khả năng native của thiết bị.

Dưới đây là một số thư viện để thêm image tracking dựa trên camera access và các local computer vision algorithms:  
   - [Experimental AR.js integration with Needle Engine](https://github.com/FireDragonGameStudio/NeedleAndARjs) của FireDragonGameStudio
   - [AR.js](https://github.com/AR-js-org/AR.js) (open source)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (open source)


## Tham khảo

[WebXR Device API](https://www.w3.org/TR/webxr/)  
[caniuse: WebXR](https://caniuse.com/webxr)  
[Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)

Trang được dịch tự động bằng AI