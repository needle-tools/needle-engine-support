---
title: Kiểm thử trên thiết bị cục bộ
---

## Kiểm thử trên thiết bị cục bộ

Khi sử dụng các mẫu của chúng tôi, Needle Engine sẽ chạy một máy chủ phát triển cục bộ cho bạn. Chỉ cần nhấn Play, và một trang web sẽ mở trong trình duyệt mặc định của bạn, sẵn sàng để kiểm thử trên thiết bị cục bộ của bạn. Để kiểm thử trên các thiết bị khác trong cùng mạng, bạn có thể phải cài đặt một chứng chỉ tự ký (xem bên dưới).

Khi sử dụng thiết lập tùy chỉnh / framework, vui lòng tham khảo tài liệu của framework của bạn về cách chạy một máy chủ phát triển cục bộ an toàn.

::: tip
Máy chủ cục bộ của chúng tôi sử dụng địa chỉ IP trong mạng cục bộ của bạn (ví dụ: `https://192.168.0.123:3000`) thay vì `localhost:3000`. Điều này cho phép bạn nhanh chóng xem và kiểm thử dự án của mình từ thiết bị di động, kính VR và các máy khác trong cùng mạng.

Chúng tôi sử dụng HTTPS thay vì HTTP cũ hơn, bởi vì các API web mạnh mẽ hiện đại như WebXR yêu cầu kết nối bảo mật – chữ S viết tắt cho "secure" (bảo mật).
:::

## Thiết lập chứng chỉ tự ký cho việc phát triển

Các hệ điều hành khác nhau có các yêu cầu bảo mật khác nhau đối với việc phát triển cục bộ. Thông thường, việc hiển thị một trang web vẫn hoạt động ngay cả với chứng chỉ không đáng tin cậy được tự động tạo, nhưng trình duyệt có thể cảnh báo về việc thiếu tin cậy và một số tính năng sẽ không khả dụng. Dưới đây là bản tóm tắt:

::: tip
Việc cài đặt các chứng chỉ tự ký đáng tin cậy trên thiết bị phát triển của bạn được khuyến nghị để có trải nghiệm phát triển mượt mà. Tìm các bước thực hiện ở cuối trang này.
:::

**Mặc định – với chứng chỉ không đáng tin cậy được tự động tạo**
_Hiển thị cảnh báo chứng chỉ khi mở dự án trong trình duyệt._
_Sử dụng npm package [vite-plugin-basic-ssl](https://github.com/vitejs/vite-plugin-basic-ssl)._

Chúng tôi sử dụng kết nối websocket để giao tiếp giữa trình duyệt và máy chủ phát triển cục bộ. Websocket yêu cầu kết nối bảo mật (HTTPS) để hoạt động. Tùy thuộc vào nền tảng, bạn có thể cần thiết lập chứng chỉ tùy chỉnh cho việc phát triển cục bộ. Android và Windows không cần chứng chỉ tùy chỉnh, nhưng iOS và MacOS thì cần.

| OS | Xem trong trình duyệt<br/>(với cảnh báo bảo mật) | Tự động tải lại |
| --- | --- | --- |
| Windows | (✓) | ✓ |
| Linux | (✓) | ✓ |
| Android | (✓) | ✓ |
| macOS | (✓) | ❌ |
| iOS | (✓ Safari và Chrome, sau khi tải lại trang)<br/>❌ Mozilla XR Viewer | ❌ |
| Xcode Simulators | (✓ sau khi tải lại trang) | ❌ |

**Với chứng chỉ gốc tự ký, đáng tin cậy**
_Không hiển thị cảnh báo bảo mật. Bạn cần cài đặt chứng chỉ được tạo trên thiết bị của mình._
_Sử dụng npm package [vite-plugin-mkcert](https://github.com/liuweiGL/vite-plugin-mkcert)._

| OS | Xem trong trình duyệt | Tự động tải lại |
| --- | --- | --- |
| Windows | ✓ | ✓ |
| Linux | ✓ | ✓ |
| Android | ✓ | ✓ |
| macOS | ✓ | ✓ |
| iOS | ✓ | ✓ |

### Tạo chứng chỉ phát triển tự ký

- trong Unity/Blender, nhấp vào "Open Workspace" để mở VS Code

- kiểm tra xem bạn đang sử dụng `vite-plugin-mkcert` thay vì `vite-plugin-basic-ssl` (cái sau không tạo chứng chỉ gốc đáng tin cậy, điều mà chúng ta cần) trong file `vite.config.ts` của bạn:
  - mở `package.json`
  - xóa dòng có `"@vitejs/plugin-basic-ssl"` khỏi `devDependencies`
  - mở Terminal trong VS Code và chạy `npm install vite-plugin-mkcert --save-dev` để thêm phiên bản mới nhất
  - mở `vite.config.ts` và thay thế `import basicSsl from '@vitejs/plugin-basic-ssl'` bằng `import mkcert from'vite-plugin-mkcert'`
  - trong `plugins: [`, thay thế `basicSsl(),` bằng `mkcert(),`
  - package.json bây giờ trông như thế này:
  ![](/testing/switch-to-mkcert.webp)
- chạy `npm run start` một lần từ terminal của VS Code
  - trên Windows, điều này sẽ mở một cửa sổ mới và hướng dẫn bạn qua việc tạo và cài đặt chứng chỉ
  - trên MacOS, terminal sẽ nhắc nhập mật khẩu của bạn và sau đó tạo và cài đặt chứng chỉ.
  - nếu bạn gặp lỗi `Error: Port 3000 is already in use`, vui lòng đóng máy chủ có thể vẫn đang chạy từ Unity.
- chứng chỉ được tạo sẽ tự động được cài đặt trên máy mà bạn tạo nó trên.
- bạn có thể dừng tiến trình terminal lại.
- từ giờ trở đi, việc nhấn Play trong Unity/Blender sẽ sử dụng chứng chỉ đã tạo cho máy chủ cục bộ, và sẽ không còn hiển thị "cảnh báo bảo mật" nữa, vì trình duyệt của bạn bây giờ đã tin cậy kết nối cục bộ.

## Cài đặt chứng chỉ trên thiết bị phát triển của bạn

Trên thiết bị phát triển của bạn, bạn cần _cài đặt_ chứng chỉ đã tạo và cho phép hệ điều hành _tin cậy_ nó. Điều này khác nhau đối với mỗi hệ điều hành. Đối với mỗi hệ điều hành, bạn sẽ cần file rootCA.pem đã được tạo và gửi nó đến thiết bị bạn muốn xác thực.

**Trên Windows:** tìm chứng chỉ trong `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem`
**Trên MacOS:** tìm chứng chỉ trong `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem`

Gửi file này cho chính bạn (ví dụ: qua E-Mail, AirDrop, iCloud, USB, Slack, ...) để bạn có thể truy cập nó trên thiết bị phát triển của mình.

### Cài đặt chứng chỉ trên Android

1. Mở file. Bạn sẽ được nhắc cài đặt chứng chỉ.

### Cài đặt chứng chỉ trên iOS / iPadOS / VisionOS
1. Mở file.
2. Bạn sẽ được nhắc _thêm_ cấu hình (profile) vào thiết bị của mình. Xác nhận.
3. Đi tới Cài đặt (Settings)
4. Sẽ có một mục mới là "Profile" (Cấu hình). Chọn nó và cho phép cấu hình được _kích hoạt_ cho thiết bị này.
5. Trên iOS / iPadOS, bạn cũng cần cho phép "Root Certificate Trust" (Tin cậy Chứng chỉ Gốc). Để làm điều này, tìm kiếm `Trust` (Tin cậy) hoặc đi tới `Settings > General > About > Info > Certificate Trust Settings` (Cài đặt > Chung > Giới thiệu > Thông tin > Cài đặt Tin cậy Chứng chỉ) và bật tin cậy hoàn toàn cho chứng chỉ gốc.

::: tip
Chứng chỉ được tự động cài đặt trên máy mà bạn tạo nó trên. Đối với các máy khác trong mạng cục bộ, làm theo các bước dưới đây để cũng thiết lập kết nối đáng tin cậy.
:::

### Cài đặt chứng chỉ trên một máy MacOS khác
1. Mở file. Keychain Access sẽ mở và cho phép bạn cài đặt chứng chỉ.
2. Bạn có thể phải đặt "Trust" (Tin cậy) thành "Always allow" (Luôn cho phép).

### Cài đặt chứng chỉ trên một máy Windows khác
1. Mở `certmgr` ("Manage user certificates" - Quản lý chứng chỉ người dùng) bằng cách gõ <kbd>phím Windows</kbd> + `certmgr`.
2. Trong thanh bên trái, chọn "Trusted Root Certification Authorities".
3. Nhấp chuột phải vào "Certificates" và chọn "All Tasks > Import".
4. Chọn file `rootCA.pem` (bạn có thể phải thay đổi loại file thành "all" - tất cả) và làm theo hướng dẫn.

Trang được dịch tự động bằng AI