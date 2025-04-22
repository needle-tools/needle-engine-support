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
- sử dụng [glTF Tools VS Code Extension](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode) để xem lỗi xác thực và xem trước trong engine cục bộ

## Các tham số URL tích hợp

Cờ gỡ lỗi (Debug Flags) có thể được thêm vào dưới dạng các tham số truy vấn URL (URL query parameters).
Sử dụng ``?help`` để nhận danh sách TẤT CẢ các tham số có sẵn.

Đây là một số tham số được sử dụng phổ biến nhất:

- ``help`` in ra tất cả các tham số URL có sẵn trong console
- ``console`` mở một dev console trên màn hình, hữu ích cho việc gỡ lỗi trên thiết bị di động
- ``printGltf`` ghi lại các tệp gltf đã tải vào console
- ``stats`` hiển thị mô-đun FPS và ghi lại thống kê của threejs renderer sau mỗi vài giây
- ``showcolliders`` hiển thị trực quan physics colliders
- ``gizmos`` bật hiển thị gizmo (ví dụ: khi sử dụng các component BoxCollider hoặc AxesHelper)
- và nhiều thứ khác nữa: vui lòng sử dụng ``help`` để xem tất cả

## Phương thức gỡ lỗi

Needle Engine cũng có một số phương thức gỡ lỗi rất mạnh mẽ và hữu ích thuộc lớp tĩnh `Gizmos`. Xem [tài liệu scripting](./scripting.md#gizmos) để biết thêm thông tin.

## Kiểm thử cục bộ bản dựng phát hành
- Đầu tiên, cài đặt http-server: `npm install -g http-server`
- tạo bản dựng (development hoặc production)
- mở thư mục *dist* bằng công cụ commandline
- chạy `http-server -g` | *`-g` cho phép hỗ trợ gzip*
- tùy chọn: nếu bạn muốn kiểm tra WebXR, tạo [chứng chỉ SSL tự ký](https://stackoverflow.com/a/35231213), sau đó chạy `http-server -g -S` để bật https (bắt buộc đối với WebXR).

## VSCode

Bạn có thể gắn VSCode vào local server đang chạy để đặt breakpoints và gỡ lỗi mã của bạn. Bạn có thể đọc thêm về [gỡ lỗi với VSCode](https://code.visualstudio.com/docs/editor/debugging) tại đây.

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

### Gỡ lỗi Android

Đối với gỡ lỗi trên **Android**, bạn có thể gắn Chrome Dev Tools vào thiết bị của mình và xem logs ngay từ PC. Bạn phải chuyển thiết bị của mình sang chế độ development và kết nối qua USB.

Xem tài liệu chrome chính thức [tại đây](https://developer.chrome.com/docs/devtools/remote-debugging/)
- Đảm bảo [Developer Mode](https://developer.android.com/studio/debug/dev-options) được bật trên điện thoại của bạn
- Kết nối điện thoại của bạn với máy tính qua cổng USB
- Mở url này trong trình duyệt của bạn ``chrome://inspect/#devices``
- Trên thiết bị di động của bạn, cho phép kết nối USB với máy tính
- Trên máy tính của bạn trong chrome, bạn sẽ thấy danh sách các tab đang mở sau một lúc (tại ``chrome://inspect/#devices``)
- Nhấp vào ``Inspect`` trên tab bạn muốn gỡ lỗi

### Gỡ lỗi iOS

Để gỡ lỗi iOS dễ dàng, thêm tham số URL ``?console`` để có một JavaScript console hữu ích trên màn hình.

Nếu bạn có máy Mac, bạn cũng có thể gắn vào Safari (tương tự như quy trình làm việc Android ở trên).

Việc sử dụng và gỡ lỗi WebXR trên iOS yêu cầu sử dụng trình duyệt bên thứ ba: [Mozilla WebXR Viewer](https://labs.mozilla.org/projects/webxr-viewer/).

### Gỡ lỗi Quest

Quest chỉ là một thiết bị Android - xem phần [Gỡ lỗi Android](#android-debugging) để biết các bước thực hiện.

Trang được dịch tự động bằng AI