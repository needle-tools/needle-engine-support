---
title: Cách gỡ lỗi
---

## Tài nguyên hữu ích khi làm việc với glTF

Để kiểm tra các tệp glTF hoặc glb trực tuyến:
- [gltf.report](https://gltf.report/) - dựa trên three.js
- [modelviewer.dev/editor](https://modelviewer.dev/editor) - dựa trên three.js
- [Khronos glTF Sample Viewer](https://github.khronos.org/glTF-Sample-Viewer-Release/)
- [Babylon Sandbox](https://sandbox.babylonjs.com/)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)

Để kiểm tra chúng cục bộ:
- sử dụng [glTF Shell Extension cho Windows](https://apps.microsoft.com/store/detail/gltf-shell-extensions/9NPGVJ9N57MV?hl=en-us&gl=US) để chuyển đổi giữa glTF và glb
- sử dụng [glTF Tools VS Code Extension](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode) để xem lỗi validation và previews trong engine cục bộ

## Các URL parameter tích hợp

Debug Flags có thể được thêm vào dưới dạng các URL query parameter.
Sử dụng ``?help`` để nhận danh sách TẤT CẢ các parameter có sẵn.

Đây là một số parameter được sử dụng phổ biến nhất:

- ``help`` in ra tất cả các url parameter có sẵn trong console
- ``console`` mở một dev console trên màn hình, hữu ích cho việc debugging trên thiết bị di động
- ``printGltf`` logs các tệp gltf đã tải vào console
- ``stats`` hiển thị module FPS và logs stats của threejs renderer sau mỗi vài giây
- ``showcolliders`` hiển thị trực quan physics colliders
- ``gizmos`` bật rendering gizmo (ví dụ: khi sử dụng các component BoxCollider hoặc AxesHelper)
- và nhiều thứ khác nữa: vui lòng sử dụng ``help`` để xem tất cả

## Phương thức Debug

Needle Engine cũng có một số phương thức debugging rất mạnh mẽ và hữu ích thuộc class static `Gizmos`. Xem [tài liệu scripting](./scripting.md#gizmos) để biết thêm thông tin.

## Kiểm thử cục bộ các bản dựng phát hành
- Đầu tiên, cài đặt http-server: `npm install -g http-server`
- tạo một bản dựng (development hoặc production)
- mở thư mục *dist* bằng một công cụ commandline
- chạy `http-server -g` | *`-g` cho phép hỗ trợ gzip*
- tùy chọn: nếu bạn muốn kiểm tra WebXR, tạo một [chứng chỉ SSL tự ký](https://stackoverflow.com/a/35231213), sau đó chạy `http-server -g -S` để bật https (bắt buộc đối với WebXR).

## VSCode

Bạn có thể attach VSCode vào local server đang chạy để đặt breakpoints và debug code của bạn. Bạn có thể đọc thêm về [debugging với VSCode](https://code.visualstudio.com/docs/editor/debugging) tại đây.

Tạo một tệp launch.json tại `.vscode/launch.json` trong dự án web của bạn với nội dung sau:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Attach Chrome",
            "url": "https://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

Nếu bạn đã thay đổi port mà server của bạn khởi động, hãy đảm bảo cập nhật trường `url` cho phù hợp.
Sau đó, bạn có thể khởi động local server của mình từ trong VSCode:

![](/debugging/vscode-start-debugging.webp)

## Thiết bị di động

### Debugging Android

Đối với debugging trên **Android**, bạn có thể attach Chrome Dev Tools vào thiết bị của mình và xem logs ngay từ PC. Bạn phải chuyển thiết bị của mình sang development mode và kết nối qua USB.

Xem tài liệu chrome chính thức [tại đây](https://developer.chrome.com/docs/devtools/remote-debugging/)
- Đảm bảo [Developer Mode](https://developer.android.com/studio/debug/dev-options) được bật trên điện thoại của bạn
- Kết nối điện thoại của bạn với máy tính qua cổng USB
- Mở url này trong browser của bạn ``chrome://inspect/#devices``
- Trên thiết bị di động của bạn, cho phép kết nối USB với máy tính
- Trên máy tính của bạn trong chrome, bạn sẽ thấy danh sách các tab đang mở sau một lúc (tại ``chrome://inspect/#devices``)
- Nhấp vào ``Inspect`` trên tab bạn muốn debug

### Debugging iOS

Để debugging iOS dễ dàng, thêm URL parameter ``?console`` để có một JavaScript console hữu ích trên màn hình.

Nếu bạn có máy Mac, bạn cũng có thể attach vào Safari (tương tự như workflow Android ở trên).

Việc sử dụng và debugging WebXR trên iOS yêu cầu sử dụng một browser bên thứ ba: [Mozilla WebXR Viewer](https://labs.mozilla.org/projects/webxr-viewer/).

### Debugging Quest

Quest chỉ là một thiết bị Android - xem phần [Debugging Android](#android-debugging) để biết các bước thực hiện.

Trang được dịch tự động bằng AI