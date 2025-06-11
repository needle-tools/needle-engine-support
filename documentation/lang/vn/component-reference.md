---
title: Needle Core Components
---

# Các Component Cốt lõi của Needle

Đây là tổng quan về một số component mà chúng tôi cung cấp. Nhiều trong số chúng tương ứng với các component và chức năng trong Unity, Blender hoặc các tích hợp khác.

Để có danh sách đầy đủ, vui lòng xem [tài liệu API](https://engine.needle.tools/docs/api/latest) của chúng tôi.

Bạn luôn có thể thêm các component của riêng mình hoặc thêm các wrapper cho các component của Unity mà chúng tôi chưa cung cấp.

Tìm hiểu thêm trong phần [Scripting](./scripting.md) của tài liệu của chúng tôi.

## Audio
| Name  | Description |
| ------------- | ------------- |
| `AudioListener` |  |
| `AudioSource` | Sử dụng để phát âm thanh |

## Animation
| Name  | Description |
| ------------- | ------------- |
| `Animator` with `AnimatorController` | Xuất với animation state machine, điều kiện, chuyển đổi  |
| `Animation` | Component animation cơ bản nhất. Chỉ clip đầu tiên được xuất |
| `PlayableDirector` with `TimelineAsset` | Xuất các chuỗi mạnh mẽ để kiểm soát animation, âm thanh, trạng thái và nhiều hơn nữa |

## Rendering
| Name  | Description |
| ------------- | ------------- |
| `Camera` |  |
| `Light` | DirectionalLight, PointLight, Spotlight. Lưu ý rằng bạn cũng có thể sử dụng nó để bake light (ví dụ: hình dạng Rectangular Light) |
| `XRFlag` | Kiểm soát khi nào đối tượng hiển thị. Ví dụ: chỉ bật đối tượng khi ở chế độ AR  |
| `DeviceFlag` | Kiểm soát trên thiết bị nào đối tượng sẽ hiển thị  |
| `LODGroup` |  |
| `ParticleSystem` | Thử nghiệm và hiện tại chưa được hỗ trợ đầy đủ |
| `VideoPlayer` | Phát video từ url hoặc tệp video được tham chiếu (sẽ được sao chép vào đầu ra khi xuất). VideoPlayer cũng hỗ trợ phát trực tiếp từ các đối tượng MediaStream hoặc URL livestream `M3U8` |
| `MeshRenderer` | Được sử dụng để xử lý render đối tượng bao gồm lightmapping và instancing |
| `SkinnedMeshRenderer` | *Xem MeshRenderer* |
| `SpriteRenderer` | Được sử dụng để render Sprites và Spriteanimations |
| `Volume` with `PostProcessing` asset | Xem [bảng dưới đây](#postprocessing) |

### Postprocessing

Các hiệu ứng postprocessing sử dụng [thư viện pmndrs postprocessing](https://www.npmjs.com/package/postprocessing) bên dưới. Điều này có nghĩa là bạn cũng có thể dễ dàng thêm các hiệu ứng tùy chỉnh của riêng mình và nhận được một pass postprocessing được tối ưu hóa tự động.

- **Chỉ Unity**: *Lưu ý rằng các hiệu ứng Postprocessing sử dụng Volume trong Unity chỉ được hỗ trợ với URP*

| Effect Name | |
| --- | --- |
| Antialiasing | *Component Unity bổ sung* |
| Bloom | *qua asset Volume* |
| Chromatic Aberration | *qua asset Volume* |
| Color Adjustments / Color Correction | *qua asset Volume* |
| Depth Of Field | *qua asset Volume* |
| Vignette | *qua asset Volume* |
| ToneMappingEffect | *qua asset Volume hoặc component riêng biệt* |
| Pixelation | |
| Screenspace Ambient Occlusion N8 | |
| Screenspace Ambient Occlusion | |
| Tilt Shift Effect | |
| SharpeningEffect | |
| *Hiệu ứng tùy chỉnh của bạn* | [Xem ví dụ trên stackblitz](https://stackblitz.com/edit/needle-engine-custom-postprocessing-effect) |

## Networking
| Name  | Description |
| ------------- | ------------- |
| `SyncedRoom` | Component mạng chính. Đặt vào scene của bạn để bật mạng |
| `Networking` | Được sử dụng để thiết lập máy chủ backend cho mạng. |
| `SyncedTransform` | Tự động mạng hóa biến đổi đối tượng |
| `SyncedCamera` | Tự động mạng hóa vị trí và góc nhìn camera cho người dùng khác trong phòng. Bạn có thể định nghĩa cách camera được render bằng cách tham chiếu một đối tượng |
| `WebXRSync` | Mạng hóa avatar WebXR (AR và VR) |
| `Voip` | Bật tính năng trò chuyện bằng giọng nói |
| `Screensharing` | Bật tính năng chia sẻ màn hình |

## Interaction
| Name  | Description |
| ------------- | ------------- |
| `EventSystem` | Xử lý việc kích hoạt các sự kiện con trỏ và sự kiện UI trên các đối tượng trong scene |
| `ObjectRaycater` | Bắt buộc đối với DragControls và Duplicatable |
| `GraphicsRaycaster` | Tương tự ObjectRaycaster nhưng cho các phần tử UI |
| `DragControls` | Cho phép kéo các đối tượng trong scene. Yêu cầu raycaster trong hệ thống phân cấp cha, ví dụ: ObjectRaycaster |
| `Duplicatable` | Có thể sao chép các đối tượng được gán bằng cách kéo. Yêu cầu DragControls |
| `Interactable` | Component cơ bản để đánh dấu một đối tượng là có thể tương tác. |
| `OrbitControls` | Thêm vào camera để thêm chức năng điều khiển quỹ đạo camera |
| `SmoothFollow` | Cho phép nội suy mượt mà đến biến đổi của đối tượng khác |
| `DeleteBox` | Sẽ phá hủy các đối tượng có component `Deletable` khi đi vào hộp |
| `Deletable` | GameObject mà component này được gắn vào sẽ bị xóa khi nó đi vào hoặc giao cắt với một `DeleteBox` |
| `DropListener` | Thêm vào để nhận các sự kiện kéo thả tệp để upload |
| `SpatialTrigger` | Sử dụng để kích hoạt sự kiện nếu một đối tượng đi vào một không gian hoặc khu vực cụ thể. Bạn cũng có thể sử dụng các sự kiện Physics |
| `SpatialTriggerReceiver` | Sử dụng để nhận sự kiện từ SpatialTrigger |

## Physics

Physics được triển khai bằng cách sử dụng [Rapier](https://rapier.rs/).

| Name  | Description |
| ------------- | ------------- |
| `Rigidbody` | Thêm vào để làm cho đối tượng phản ứng với trọng lực (hoặc là kinematic và static) |
| `BoxCollider` | Hình dạng collider Box mà các đối tượng có thể va chạm hoặc kích hoạt sự kiện trigger khi được đặt thành `trigger` |
| `SphereCollider` | *Xem BoxCollider* |
| `CapsuleCollider` | *Xem BoxCollider* |
| `MeshCollider` | *Xem BoxCollider* |
| Physics Materials | Vật liệu Physics có thể được sử dụng để định nghĩa độ nảy của collider, chẳng hạn |

## XR / WebXR

[Đọc tài liệu XR](xr.md)

| Name  | Description |
| ------------- | ------------- |
| `WebXR` | Thêm vào scene để hỗ trợ VR, AR và Passthrough cũng như render các mô hình Avatar |
| [`USDZExporter`](./everywhere-actions.md) | Thêm vào để bật hỗ trợ USD và Quicklook |
| `XRFlag` | Kiểm soát khi nào các đối tượng hiển thị, ví dụ: chỉ trong VR hoặc AR hoặc chỉ ở chế độ ThirdPerson |
| `WebARSessionRoot` | Xử lý vị trí và tỷ lệ của scene của bạn ở chế độ AR |
| `WebARCameraBackground` | Thêm vào để truy cập hình ảnh camera AR và áp dụng các hiệu ứng hoặc sử dụng nó để render |
| `WebXRImageTracking` | Gán hình ảnh để theo dõi và tùy chọn tạo một đối tượng tại vị trí hình ảnh |
| `WebXRPlaneTracking` | Tạo lưới mặt phẳng hoặc collider cho các mặt phẳng được theo dõi |
| `XRControllerModel` | Có thể thêm vào để render các bộ điều khiển thiết bị hoặc mô hình tay (sẽ được tạo mặc định khi được bật trong component WebXR) |
| `XRControllerMovement` | Có thể thêm vào để cung cấp các điều khiển di chuyển và dịch chuyển mặc định |
| `XRControllerFollow` | Có thể thêm vào bất kỳ đối tượng nào trong scene và cấu hình để theo dõi tay trái hoặc phải hoặc bộ điều khiển |

## Debugging
| Name  | Description |
| ------------- | ------------- |
| `GridHelper` | Vẽ một lưới |
| `BoxGizmo` | Vẽ một hộp |
| `AxesHelper` | Vẽ các trục XYZ |
| | Lưu ý: Khi bạn viết mã tùy chỉnh, bạn có thể sử dụng các phương thức `Gizmos` tĩnh để vẽ các đường và hình dạng debugging | |

## Runtime File Input/Output
| Name  | Description |
| ------------- | ------------- |
| `GltfExport` | Thử nghiệm! Sử dụng để xuất gltf từ runtime web. |
| `DropListener` | Nhận các sự kiện kéo thả tệp để upload và mạng hóa |

## UI

Các component Spatial UI được ánh xạ từ Unity UI (Canvas, không phải UI Toolkit) sang [three-mesh-ui](https://github.com/felixmariotto/three-mesh-ui).
UI có thể được hoạt ảnh.

| Name  | Description |
| ------------- | ------------- |
| `Canvas` | Hệ thống UI của Unity. Hiện tại cần ở chế độ World Space. |
| `Text (Legacy)` | Render Text sử dụng component UI Text của Unity. Các font tùy chỉnh được hỗ trợ, một font atlas sẽ được tự động tạo khi xuất. Sử dụng cài đặt font hoặc component `FontAdditionalCharacters` để kiểm soát những ký tự nào được bao gồm trong atlas.<br/>**Lưu ý**: Trong Unity hãy đảm bảo sử dụng component `Legacy/Text` (*TextMeshPro* hiện tại chưa được hỗ trợ) |
| `Button` | Nhận các sự kiện click - sử dụng sự kiện onClick để phản ứng với nó. Nó cũng có thể được thêm vào các đối tượng scene 3D.<br/>**Lưu ý**: Đảm bảo sử dụng component `Legacy/Text` trong Button (hoặc tạo Button thông qua menu ngữ cảnh `UI/Legacy/Button` của Unity vì *TextMeshPro* hiện tại chưa được hỗ trợ) |
| `Image` | Render một hình ảnh sprite |
| `RawImage` | Render một texture |
| `InputField` | Cho phép nhập văn bản |

**Lưu ý**: Tùy thuộc vào dự án của bạn, thường thì việc kết hợp giữa spatial UI và 2D UI là hợp lý cho các dự án đa nền tảng hỗ trợ VR, AR và màn hình. Thông thường, bạn sẽ xây dựng các phần 2D bằng HTML để có khả năng truy cập tốt nhất, và các phần 3D bằng UI hình học cũng hỗ trợ bù độ sâu (ví dụ: trạng thái hover của nút và những thứ tương tự).

## Other

| Name  | Description |
| ------------- | ------------- |
| `SceneSwitcher` | Xử lý việc tải và giải phóng các scene khác hoặc các tệp prefabs / glTF. Có các tính năng để preload, thay đổi scene thông qua vuốt, sự kiện bàn phím hoặc điều hướng URL |

## Editor Only
| Name  | Description |
| --- | --- |
| `ExportInfo` | Component chính để quản lý (các) dự án web, ví dụ: cài đặt hoặc khởi động ứng dụng web |
| `EditorSync` | Thêm vào để bật mạng hóa các thay đổi giá trị vật liệu hoặc component cho ứng dụng three.js đang chạy trực tiếp từ Unity Editor mà không cần tải lại |


Trang được tự động dịch bằng AI