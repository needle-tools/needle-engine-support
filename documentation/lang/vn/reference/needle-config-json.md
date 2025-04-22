---
title: needle.config.json
---

`needle.config.json` được sử dụng để cung cấp cấu hình cho các tích hợp của Needle Editor và cho các plugin của quy trình build Needle Engine.

| | |
| --- | --- |
| **Đường dẫn** | |
| `buildDirectory` | Đây là nơi các tệp dự án đã build được sao chép đến |
| `assetsDirectory` | Đây là nơi các asset tích hợp Editor sẽ được sao chép đến hoặc tạo ra (ví dụ: các tệp `.glb` được xuất từ Unity hoặc Blender) |
| `scriptsDirectory` | Đây là thư mục mà tích hợp Editor đang theo dõi các thay đổi mã để tạo lại các component |
| `codegenDirectory` | Đây là nơi tích hợp Editor xuất các tệp đã tạo. |
| `baseUrl` | Bắt buộc cho ví dụ như tích hợp next.js hoặc SvelteKit. Khi baseUrl được thiết lập, các đường dẫn tương đối cho codegen và bên trong các tệp sẽ sử dụng baseUrl, chứ không phải assetsDirectory. Điều này hữu ích trong các trường hợp assetDirectory không khớp với url máy chủ.<br/>Ví dụ, đường dẫn trên đĩa có thể là `"assetsDirectory": "public/assets"`, nhưng framework phục vụ các tệp từ `"baseUrl": "assets"`. |
| **Công cụ** | |
| `build : { copy: ["myFileOrDirectory"] }` | Mảng các đường dẫn chuỗi để sao chép các tệp hoặc thư mục bổ sung vào `buildDirectory`. Chúng có thể là tuyệt đối hoặc tương đối. |

#### Ví dụ cơ bản
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### Ví dụ sao chép
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated",
  "build": {
    "copy": [
      "cards"
    ]
  }
}
```

#### Ví dụ với baseUrl khác (ví dụ: SvelteKit, Next.js)
Các tệp được xuất sang `static/assets` nhưng framework phục vụ chúng từ `/assets`. Trong trường hợp này, `baseUrl` cần được đặt thành `assets` để các đường dẫn tương đối trong các tệp là chính xác.

```json
{
  "baseUrl": "assets",
  "buildDirectory": "dist",
  "assetsDirectory": "static/assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### Các liên kết liên quan
- [Project Structure](../project-structure.md)

Trang được dịch tự động bằng AI