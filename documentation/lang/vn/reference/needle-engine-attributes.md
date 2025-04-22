---
title: Cấu hình <needle-engine>
---

Thành phần web `<needle-engine>` đi kèm với bộ sưu tập các thuộc tính tích hợp sẵn tuyệt vời có thể được sử dụng để sửa đổi giao diện của cảnh được tải mà không cần thêm hoặc chỉnh sửa trực tiếp cảnh three.js. Bảng dưới đây hiển thị danh sách những thuộc tính quan trọng nhất:

| Thuộc tính | Mô tả |
| --- | --- |
| **Tải** | |
| `src` | Đường dẫn đến một hoặc nhiều tệp glTF hoặc glb.<br/>Các loại được hỗ trợ là `string`, `string[]` hoặc một mảng dạng chuỗi (phân tách bằng `,`) |
| `dracoDecoderPath` | URL đến draco decoder |
| `dracoDecoderType` | Loại draco decoder. Các tùy chọn là `wasm` hoặc `js`. Xem [three.js documentation](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) |
| `ktx2DecoderPath` | URL đến KTX2 decoder |
| **Kết xuất** | |
| `background-color` | tùy chọn, mã màu hex được sử dụng làm màu nền. Ví dụ: `rgb(255, 200, 100)`, `#dddd00` |
| `background-image` | tùy chọn, URL đến hình ảnh skybox (hình ảnh nền) hoặc một chuỗi cài sẵn: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `background-blurriness` | tùy chọn, giá trị làm mờ giữa 0 (không mờ) và 1 (mờ tối đa) cho `background-image`. Ví dụ: `background-blurriness="0.5"` |
| `environment-image` | tùy chọn, URL đến hình ảnh môi trường (ánh sáng môi trường) hoặc một chuỗi cài sẵn: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `contactshadows` | tùy chọn, kết xuất contact shadows |
| `tone-mapping` | tùy chọn, các giá trị được hỗ trợ là `none`, `linear`, `neutral`, `agx` |
| `tone-mapping-exposure` | số tùy chọn, ví dụ tăng độ phơi sáng với `tone-mapping-exposure="1.5"`, yêu cầu `tone-mapping` phải được đặt |
| **Tương tác** | |
| `autoplay` | thêm hoặc đặt thành `true` để tự động phát hoạt ảnh, ví dụ: `<needle-engine autoplay` |
| `camera-controls` | thêm hoặc đặt thành `true` để tự động thêm OrbitControls nếu không tìm thấy điều khiển camera nào trong cảnh |
| `auto-rotate` | thêm để bật tự động xoay (chỉ sử dụng với `camera-controls`) |
| **Sự kiện** | |
| `loadstart` | Tên của hàm cần gọi khi bắt đầu tải. Lưu ý rằng các đối số là `(ctx:Context, evt:Event)`. Bạn có thể gọi `evt.preventDefault()` để ẩn lớp phủ tải mặc định |
| `progress` | Tên của hàm cần gọi khi quá trình tải cập nhật. `onProgress(ctx:Context, evt: {detail: {context:Context, name:string, index:number, count:number, totalProgress01:number}) { ... }` |
| `loadfinished` | Tên của hàm cần gọi khi quá trình tải kết thúc |
| **Hiển thị Tải** | *Các tùy chọn có sẵn để thay đổi giao diện hiển thị tải của Needle Engine. Sử dụng `?debugloadingrendering` để chỉnh sửa dễ dàng hơn* |
| `loading-style` | Các tùy chọn là `light` hoặc `dark` |
| `loading-background-color` | **PRO** — Thay đổi màu nền khi tải (ví dụ: `=#dd5500`) |
| `loading-text-color` | **PRO** — Thay đổi màu văn bản khi tải |
| `loading-logo-src` | **PRO** — Thay đổi hình ảnh logo khi tải |
| `primary-color` | **PRO** — Thay đổi màu chính khi tải |
| `secondary-color` | **PRO** — Thay đổi màu phụ khi tải |
| `hide-loading-overlay` | **PRO** — Không hiển thị lớp phủ tải, được thêm vào trong Needle Engine > 3.17.1 |
| **Nội bộ** | |
| `hash` | Được sử dụng nội bộ, được thêm vào các tệp đang tải để buộc cập nhật (ví dụ: khi trình duyệt đã lưu trữ tệp glb). Không nên chỉnh sửa thủ công. |

# Ví dụ

```html
<!-- Đặt đường dẫn đến tệp glb tùy chỉnh cần tải -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- Ghi đè vị trí của draco decoder -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="path/to/draco/folder"></needle-engine>
```

Đặt hình ảnh môi trường, phát hoạt ảnh và điều khiển camera tự động. [Xem trực tiếp trên stackblitz](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)
```html
<needle-engine
      camera-controls
      auto-rotate
      autoplay
      skybox-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      environment-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf"
      >
      </needle-engine>
```

Nhận một sự kiện khi ngữ cảnh needle-engine đã tải xong:
```html
<needle-engine loadfinished="onLoadFinished"> </needle-engine>
<script>
    function onLoadFinished() {
        console.log("Needle Engine has finished loading");
    }
</script>
```

### Kiểu Tải Tùy Chỉnh (PRO)

Bạn có thể dễ dàng sửa đổi giao diện của Needle Engine bằng cách đặt các thuộc tính thích hợp trên thành phần web `<needle-engine>`. Vui lòng xem bảng trên để biết chi tiết.

![tải tùy chỉnh](/imgs/custom-loading-style.webp)
[Xem mã trên github](https://github.com/needle-engine/vite-template/blob/loading-style/custom/index.html)
Trang được dịch tự động bằng AI