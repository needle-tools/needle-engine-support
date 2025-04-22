---
title: Cấu trúc dự án Web
---

# Cấu trúc dự án Needle Engine

### Các tệp dự án Web

| | |
| --- | --- |
| **Needle Engine** | |
| [`needle.config.json`](./reference/needle-config-json.md) | Cấu hình cho các bản build và tích hợp của Needle Engine |
| **Ecosystem** | |
| `package.json` | Cấu hình dự án chứa tên, phiên bản, dependencies và script |
| `tsconfig.json` | Cấu hình trình biên dịch Typescript |
| `.gitignore` | Các tệp và thư mục bị bỏ qua trong git |
| `vite.config.js` | Chứa cấu hình dành riêng cho vite.<br/>Nó cũng thêm các plugin vite của Needle Engine. |

### Cấu trúc dự án Vite mặc định

Mẫu dự án chính của chúng tôi sử dụng bundler [vite](https://vitejs.dev/) siêu nhanh. Sau đây là cấu trúc của mẫu Vite mà chúng tôi đã tạo và phân phối (mặc dù có thể điều chỉnh theo nhu cầu riêng của bạn).

| | |
| --- | --- |
| **Thư mục** | |
| `assets/` | Thư mục asset chứa các asset được xuất từ Unity. Ví dụ: các tệp ``gltf`` được tạo, tệp âm thanh hoặc video. Không khuyến khích thêm tệp thủ công vào ``assets`` vì nó sẽ bị xóa khi build bản phân phối cho dự án.
| `include/` | (tùy chọn) - Nếu bạn có các asset tùy chỉnh cần tham chiếu/tải, hãy thêm chúng vào thư mục include. Khi build, thư mục này sẽ được sao chép vào thư mục đầu ra.
| `src/generated/` | Mã javascript được tạo. Không chỉnh sửa thủ công!
| `src/scripts/` | Các script / component dành riêng cho dự án của bạn
| `src/styles/` | Các tệp stylesheet
| `*` | Bạn có thể thêm bất kỳ thư mục mới nào vào đây tùy ý. Đảm bảo [copy](./reference/needle-config-json.md) chúng vào thư mục đầu ra khi build |
| **Tệp** | |
| `index.html` | Trang đích hoặc trang chủ của trang web của bạn
| `vite.config` | Tệp [cấu hình vite](https://vitejs.dev/config/). Các cài đặt để build bản phân phối và host máy chủ phát triển được thực hiện tại đây. Thông thường không cần thiết phải chỉnh sửa các cài đặt này.
| `src/main.ts` | Được bao gồm từ `index.html` và import `needle-engine`
| `*` | Bạn có thể thêm bất kỳ tệp mới nào vào đây tùy ý. Đảm bảo [copy](./reference/needle-config-json.md) chúng vào thư mục đầu ra khi build (trừ khi chúng chỉ được sử dụng trong quá trình phát triển) |

Trình exporter của chúng tôi cũng có thể được sử dụng với các cấu trúc dự án khác, vite chỉ là công cụ bundling frontend ưa thích của chúng tôi vì tốc độ của nó. Bạn có thể tự do thiết lập dự án JavaScript của mình theo ý muốn.

[Tìm hiểu thêm trong tài liệu về bundling và sử dụng với các framework khác](html.md)

---

#### Đọc tiếp

- [Hướng dẫn về Typescript cho Nhà phát triển Unity](./getting-started/for-unity-developers.md)
- [Những điều cơ bản về Typescript](./getting-started/typescript-essentials.md)
- [Viết script tùy chỉnh](./scripting.md)
- [Everywhere Actions](./everywhere-actions.md)

Trang được dịch tự động bằng AI