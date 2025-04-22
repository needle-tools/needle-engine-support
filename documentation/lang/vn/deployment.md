---
title: Triển khai và Tối ưu hóa
---

## Triển khai nghĩa là gì?

Triển khai là quá trình làm cho ứng dụng của bạn khả dụng với công chúng trên một trang web. Needle Engine đảm bảo rằng dự án của bạn nhỏ nhất và nhanh nhất có thể bằng cách sử dụng các kỹ thuật nén mới nhất như **KTX2**, **Draco**, và **Meshopt**.

## Các nền tảng triển khai khả dụng

- [Needle Cloud](./cloud/#deploy-from-unity)
  Tuyệt vời cho các ứng dụng web không gian và chia sẻ tài sản.
- [Glitch](#deploy-to-glitch)
  Tuyệt vời cho thử nghiệm và viết mã phía máy chủ.

- [Netlify](#deploy-to-netlify)
  Tuyệt vời để lưu trữ trang web và tên miền tùy chỉnh của riêng bạn.
- [itch.io](#deploy-to-itch.io)
  Thường được sử dụng cho game.
- [GitHub Pages](#deploy-to-github-pages)
  Lưu trữ trang tĩnh miễn phí.
- [Vercel](#deploy-to-vercel)
  Nền tảng dành cho các nhà phát triển frontend
- [FTP Upload](#deploy-to-ftp)
  Triển khai trực tiếp đến bất kỳ máy chủ nào có hỗ trợ FTP. Cả FTP và SFTP đều được hỗ trợ.
- [Build to folder](#build-to-folder)
  Khi build ra một thư mục, bạn có thể tải các file lên bất kỳ máy chủ web nào hoặc dịch vụ lưu trữ khác.
- [Facebook Instant Games](#deploy-to-facebook-instant-games)
  Nền tảng game trên Facebook và Facebook Messenger.

::: tip Bạn cảm thấy thiếu gì đó?
Vui lòng cho chúng tôi biết trong [diễn đàn](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) của chúng tôi!
:::

## Các bản dựng phát triển (Development Builds)

Xem các hướng dẫn ở trên về cách truy cập các tùy chọn từ bên trong Editor của bạn (ví dụ: Unity hoặc Blender).

Sự khác biệt chính so với bản dựng sản xuất là nó không thực hiện nén [ktx2](https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html) và [draco](https://google.github.io/draco/) (để giảm kích thước file và tốc độ tải) cũng như tùy chọn tải texture chất lượng cao dần dần.

Chúng tôi thường khuyên nên tạo các bản dựng sản xuất để tối ưu hóa kích thước file và tốc độ tải (xem thêm thông tin bên dưới).

## Các bản dựng sản xuất (Production Builds)

Để tạo bản dựng sản xuất, bạn cần cài đặt [toktx](https://github.com/KhronosGroup/KTX-Software/releases), cung cấp khả năng nén texture bằng định dạng siêu nén KTX2. Vui lòng truy cập [Trang phát hành toktx](https://github.com/KhronosGroup/KTX-Software/releases) và tải xuống, cài đặt phiên bản mới nhất (v4.1.0 tại thời điểm viết bài này). Bạn có thể cần khởi động lại Unity sau khi cài đặt.
*Nếu bạn chắc chắn rằng bạn đã cài đặt toktx và nó nằm trong PATH của bạn nhưng vẫn không tìm thấy, vui lòng khởi động lại máy của bạn và thử build lại.*

:::details Nâng cao: Các phần mở rộng glTF tùy chỉnh
Nếu bạn định thêm các phần mở rộng glTF tùy chỉnh của riêng mình, build cho sản xuất yêu cầu xử lý chúng trong ``gltf-transform``. Xem [@needle-tools/gltf-build-pipeline](https://www.npmjs.com/package/@needle-tools/gltf-build-pipeline) để tham khảo.
:::

### Tùy chọn tối ưu hóa và nén

### Nén texture
Các bản dựng sản xuất theo mặc định sẽ nén texture bằng **KTX2** (ETC1S hoặc UASTC tùy thuộc vào cách sử dụng của chúng trong dự án)
nhưng bạn cũng có thể chọn nén **WebP** và chọn mức chất lượng.

#### Làm cách nào để chọn giữa nén ETC1S, UASTC và WebP?

| Định dạng | ETC1S | UASTC | WebP |
| --- | --- | --- | --- |
| **Sử dụng bộ nhớ GPU** | Thấp | Thấp | Cao (chưa nén) |
| **Kích thước file** | Thấp | Cao | Rất thấp |
| **Chất lượng** | Trung bình | Rất cao | Phụ thuộc vào cài đặt chất lượng |
| **Cách sử dụng điển hình** | Hoạt động cho mọi thứ, nhưng tốt nhất cho texture màu | Texture dữ liệu chi tiết cao: normal map, roughness, metallic, v.v. | Các file mà chất lượng ETC1S không đủ nhưng UASTC quá lớn |

Bạn có tùy chọn chọn cài đặt nén texture và tải tiến trình cho từng Texture bằng cách sử dụng Needle Texture Importer trong Unity hoặc trong tab Material trong Blender.

:::details Unity: Làm cách nào để đặt cài đặt nén cho từng texture?
![image](/imgs/unity-texture-compression.jpg)
![image](/imgs/unity-texture-compression-options.jpg)
:::

:::details Blender: Làm cách nào để đặt cài đặt nén cho từng texture?
Chọn tab material. Bạn sẽ thấy các tùy chọn nén cho tất cả các texture đang được material đó sử dụng.
![Texture Compression options in Blender](/blender/texture-compression.webp)
:::

:::details Toktx không tìm thấy
Windows: Đảm bảo bạn đã thêm toktx vào các biến môi trường hệ thống của mình. Bạn có thể cần khởi động lại máy tính sau khi thêm để làm mới các biến môi trường. Vị trí cài đặt mặc định là ``C:\Program Files\KTX-Software\bin``
![image](/imgs/ktx-env-variable.webp)
:::

### Nén Mesh

Theo mặc định, bản dựng sản xuất sẽ nén mesh bằng nén Draco. Sử dụng thành phần `MeshCompression` để chọn giữa draco và mesh-opt cho mỗi glTF được xuất ra.
Ngoài ra, bạn có thể thiết lập mesh simplification để giảm số lượng poly cho các bản dựng sản xuất trong cài đặt import mesh (Unity). Khi xem ứng dụng của bạn trong trình duyệt, bạn có thể thêm `?wireframe` vào URL của mình để xem trước mesh.

#### Làm cách nào để chọn giữa Draco và Meshopt?
| Định dạng | Draco | Meshopt |
| --- | --- | --- |
| **Sử dụng bộ nhớ GPU** | Trung bình | Thấp |
| **Kích thước file** | Thấp nhất | Thấp |
| **Nén Animation** | Không | Có |

:::details Làm cách nào để đặt cài đặt nén draco và meshopt?
Thêm thành phần MeshCompression để chọn loại nén nào nên được áp dụng cho mỗi glTF được xuất ra.

![image](/imgs/unity-mesh-compression-component.jpg)
- Để thay đổi nén cho **scene hiện tại**, chỉ cần thêm nó vào bất kỳ đâu trong scene gốc của bạn.
- Để thay đổi nén cho **prefab hoặc NestedGltf**, hãy thêm nó vào một `GltfObject` hoặc prefab được tham chiếu / xuất bởi bất kỳ thành phần nào của bạn.
- Để thay đổi nén cho **scene được tham chiếu**, chỉ cần thêm nó vào scene được tham chiếu được xuất ra.
:::

:::details Nơi tìm các tùy chọn mesh simplification để giảm số lượng đỉnh khi build cho sản xuất?
Chọn một Mesh và mở các tùy chọn Needle importer để xem các tùy chọn có sẵn cho mesh đã chọn:
![image](/imgs/unity-mesh-simplification.jpg)
:::

### Progressive Textures

Bạn cũng có thể thêm thành phần `Progressive Texture Settings` vào bất kỳ đâu trong scene của mình, để tất cả các texture trong dự án của bạn được tải dần dần. Tải progressive hiện chưa áp dụng cho lightmap hoặc skybox texture.

Với tải progressive, texture sẽ được tải trước bằng phiên bản độ phân giải thấp hơn. Phiên bản chất lượng đầy đủ sẽ được tải động khi texture trở nên hiển thị. Điều này thường giảm đáng kể thời gian tải ban đầu của scene của bạn.

:::details Làm cách nào để bật tải progressive texture?
### Progressive textures có thể được bật cho từng texture<br/>hoặc cho tất cả các texture trong dự án của bạn:
![image](/imgs/unity-texture-compression.jpg)
### Bật cho tất cả các texture trong dự án không có cài đặt cụ thể nào khác:
![image](/imgs/unity-progressive-textures.jpg)
:::

### Automatic Mesh LODs (Level of Detail)

Kể từ Needle Engine 3.36, chúng tôi tự động tạo LOD mesh và chuyển đổi giữa chúng trong runtime. LOD được tải theo yêu cầu và chỉ khi cần, vì vậy tính năng này giúp giảm cả thời gian tải và hiệu suất của bạn.

**Lợi ích chính**
- Thời gian tải ban đầu nhanh hơn
- Thời gian render nhanh hơn do trung bình ít đỉnh hơn trên màn hình
- Raycasting nhanh hơn do sử dụng LOD mesh

Bạn có thể tắt tạo LOD cho toàn bộ dự án của mình trong thành phần `Progressive Loading Settings` hoặc trong cài đặt Mesh Importer.

![image](/imgs/unity-lods-settings-1.jpg)

![image](/imgs/unity-lods-settings-2.jpg)

## Các tùy chọn triển khai

### Triển khai đến Glitch 🎏

[Glitch](https://glitch.com/) cung cấp một cách nhanh chóng và miễn phí cho mọi người để lưu trữ các trang web nhỏ và lớn. Chúng tôi cung cấp một cách dễ dàng để remix và triển khai đến một trang Glitch mới (dựa trên mẫu khởi đầu của chúng tôi), và cũng để chạy một máy chủ mạng tối giản trên cùng trang Glitch nếu cần.

Bạn có thể triển khai đến Glitch bằng cách thêm thành phần `DeployToGlitch` vào scene của bạn và làm theo hướng dẫn.

Lưu ý rằng các dự án miễn phí được lưu trữ trên Glitch không thể vượt quá ~100 MB. Nếu bạn cần tải lên một dự án lớn hơn, hãy cân nhắc sử dụng một nền tảng triển khai khác.

:::details Làm cách nào để triển khai đến Glitch từ Unity?

1) Thêm thành phần ``DeployToGlitch`` vào GameObject cũng có thành phần ``ExportInfo``.

2) Nhấp vào nút ``Create new Glitch Remix`` trên thành phần
   ![image](/deployment/deploytoglitch-1.jpg)
3) Glitch bây giờ sẽ tạo một bản remix của template. Sao chép URL từ trình duyệt của bạn
   ![image](https://user-images.githubusercontent.com/5083203/179834901-f28852a9-6b06-4d87-8b5b-0384768c92c1.png)
4) Mở lại Unity và dán URL vào trường ``Project Name`` của thành phần ``Deploy To Glitch`` của bạn
  ![image](https://user-images.githubusercontent.com/5083203/179835274-033e5e1d-b70d-4b13-95ad-f1e2f159b14e.png)
5) Chờ vài giây cho đến khi Unity nhận được khóa triển khai của bạn từ glitch (khóa này được lưu trữ an toàn trong file `.env` trên glitch. Không chia sẻ nó với người khác, bất kỳ ai có khóa này sẽ có thể tải lên trang web glitch của bạn)
  ![waiting for the key](/deployment/deploytoglitch-2.jpg)
6) Sau khi Khóa Triển khai đã được nhận, bạn có thể nhấp vào nút `Build & Deploy` để tải lên glitch.

:::

:::details Làm cách nào để triển khai đến Glitch từ Blender?

![Deploy To Glitch from Blender component](/blender/deploy_to_glitch.webp)

1) Tìm bảng Deploy To Glitch trong tab Scene
2) Nhấp vào nút ``Remix on glitch`` trên thành phần
3) Trình duyệt của bạn sẽ mở template dự án glitch
4) Chờ Glitch tạo dự án mới
5) Sao chép và dán URL dự án vào bảng Blender DeployToGlitch làm tên dự án (bạn có thể dán toàn bộ URL, bảng điều khiển sẽ trích xuất thông tin cần thiết)
6) Trên Glitch, mở file ``.env`` và nhập mật khẩu vào trường ``Variable Value`` bên cạnh **DEPLOY_KEY**
7) Nhập cùng mật khẩu vào Blender trong trường `Key`
8) Nhấp vào nút `DeployToGlitch` để build và tải dự án của bạn lên glitch. Trình duyệt sẽ mở ra khi quá trình tải lên hoàn thành. Thử làm mới trang nếu nó hiển thị màu đen sau khi đã mở.
:::

#### Khắc phục sự cố Glitch

Nếu bạn nhấp vào `Create new Glitch Remix` và trình duyệt hiển thị lỗi như `there was an error starting the editor`, bạn có thể nhấp vào **OK**. Sau đó, truy cập [glitch.com](https://glitch.com/) và đảm bảo bạn đã đăng nhập. Sau đó, bạn có thể thử nhấp lại nút trong Unity hoặc Blender.

### Triển khai đến Netlify
:::details Làm cách nào để triển khai đến Netlify từ Unity?
Chỉ cần thêm thành phần `DeployToNetlify` vào scene của bạn và làm theo hướng dẫn. Bạn có thể tạo dự án mới chỉ với một cú nhấp chuột hoặc bằng cách triển khai đến các dự án hiện có.

![Deploy to netlify component](/deployment/deploytonetlify-2.jpg)

![Deploy to netlify component](/deployment/deploytonetlify.jpg)
:::

### Triển khai đến Vercel

1) Tạo một dự án mới trên vercel
2) Thêm dự án web của bạn vào kho lưu trữ github
3) Thêm kho lưu trữ vào dự án của bạn trên vercel

Xem [dự án mẫu](https://github.com/needle-engine/nextjs-sample) của chúng tôi để biết cấu hình dự án

### Triển khai đến itch.io

:::details Làm cách nào để triển khai đến itch.io từ Unity?
1) Tạo một dự án mới trên [itch.io](https://itch.io/game/new)
2) Đặt ``Kind of project`` là ``HTML``
  ![image](https://user-images.githubusercontent.com/5083203/191211856-8a114480-bae7-4bd1-868e-2e955587acd7.png)
3) Thêm thành phần ``DeployToItch`` vào scene của bạn và nhấp vào nút ``Build``
  ![image](https://user-images.githubusercontent.com/5083203/193812540-1881837e-ed9e-49fc-9658-52e5a914299a.png)

4) Chờ quá trình build hoàn thành, nó sẽ mở một thư mục chứa file zip cuối cùng khi hoàn thành
5) Tải file zip cuối cùng lên itch.io
  ![20220920-104629_Create_a_new_project_-_itch io_-_Google_Chrome-needle](https://user-images.githubusercontent.com/5083203/191212661-f626f0cb-bc8e-4738-ad2c-3982aca65f39.png)
6) Chọn ``This file will be played in the browser``
  ![image](https://user-images.githubusercontent.com/5083203/191212967-00b687f3-bf56-449e-880c-d8daf8a52247.png)
7) Lưu trang itch của bạn và xem trang dự án itch.
  Nó sẽ tải dự án Needle Engine của bạn 😊

#### Cài đặt tùy chọn
![image](https://user-images.githubusercontent.com/5083203/191217263-355d9b70-5431-4170-8eca-bfbbb39ae810.png)
:::

:::details Itch.io: failed to find index.html

#### Failed to find index.html
![image](https://user-images.githubusercontent.com/5083203/191213162-2be63e46-2a65-4d41-a713-98c753ccb600.png)
Nếu bạn thấy lỗi này sau khi tải dự án của mình lên, hãy đảm bảo bạn không tải lên file index.html đã được nén gzip.
Bạn có thể tắt nén gzip trong ``vite.config.js`` trong thư mục dự án web Needle của bạn. Chỉ cần xóa dòng có ``viteCompression({ deleteOriginFile: true })``. Sau đó build lại dự án của bạn và tải lên itch.

:::

### Triển khai đến FTP

:::details Làm cách nào để triển khai đến máy chủ FTP của tôi từ Unity?
1) Thêm thành phần ``DeployToFTP``¹ vào một GameObject trong scene của bạn (nên thêm vào cùng GameObject với ExportInfo - nhưng không bắt buộc)
2) Gán một asset máy chủ FTP và điền thông tin máy chủ, tên người dùng và mật khẩu nếu bạn chưa làm ²
  *Asset này chứa thông tin truy cập đến máy chủ FTP của bạn - bạn nhận được chúng khi tạo một tài khoản FTP mới tại nhà cung cấp dịch vụ lưu trữ của bạn*
3) Nhấp vào nút <kbd>Build & Deploy</kbd> trên thành phần ``DeployToFTP`` để build dự án của bạn và tải nó lên tài khoản FTP của bạn

![Deploy to FTP component in Unity](/deployment/deploytoftp.jpg)
*¹ Thành phần Deploy to FTP*

![Deploy to FTP server asset](/deployment/deploytoftp2.jpg)
*² Asset máy chủ FTP chứa thông tin truy cập của tài khoản người dùng FTP của bạn*

![Deploy to FTP component in Unity with server asset assigned](/deployment/deploytoftp3.jpg)
*Thành phần Deploy To FTP sau khi asset máy chủ được gán. Bạn có thể trực tiếp triển khai đến một thư mục con trên máy chủ của mình bằng cách sử dụng trường path*
:::

:::details Làm cách nào để triển khai đến máy chủ FTP của tôi theo cách thủ công?

1) Mở `File > Build Settings`, chọn `Needle Engine`, và nhấp vào <kbd>Build</kbd>
2) Chờ quá trình build hoàn thành - thư mục `dist` kết quả sẽ tự động mở ra sau khi tất cả các bước build và nén đã chạy.
3) Sao chép các file từ thư mục `dist` vào bộ nhớ FTP của bạn.

**Xong!** 😉

![20220830-003602_explorer-needle](https://user-images.githubusercontent.com/2693840/187311461-e6afb2d7-5761-48cf-bacb-1c1733bb768b.png)

> **Lưu ý**: Nếu kết quả không hoạt động khi tải lên, có thể máy chủ web của bạn không hỗ trợ phục vụ các file đã nén gzip. Bạn có hai tùy chọn để khắc phục vấn đề:
> Tùy chọn 1: Bạn có thể thử bật nén gzip trên máy chủ của mình bằng cách sử dụng file htaccess!
> Tùy chọn 2: Bạn có thể tắt nén gzip trong cài đặt build tại File/Build Window và chọn nền tảng Needle Engine.

> **Lưu ý**: Nếu bạn gặp lỗi trong quá trình nén, vui lòng cho chúng tôi biết và báo cáo lỗi! Nếu dự án của bạn hoạt động cục bộ và chỉ thất bại khi thực hiện các bản dựng sản xuất, bạn có thể khắc phục ngay bằng cách thực hiện Bản dựng phát triển (Development Build). Để làm điều đó, chỉ cần bật `Development Build` trong Build Settings.

![Unity build window showing Needle Engine platform](/deployment/buildoptions_gzip.jpg)

:::

#### Bật gzip bằng file .htaccess
Để bật nén gzip trên máy chủ FTP của bạn, bạn có thể tạo một file có tên `.htaccess` trong thư mục bạn muốn tải lên (hoặc thư mục mẹ).
Chèn đoạn mã sau vào file `.htaccess` của bạn và lưu/tải nó lên máy chủ của bạn:
```
<IfModule mod_mime.c>
RemoveType .gz
AddEncoding gzip .gz
AddType application/javascript .js.gz
```

### Triển khai đến Github Pages
:::details Làm cách nào để triển khai đến Github Pages từ Unity?

Thêm thành phần DeployToGithubPages vào scene của bạn và sao chép-dán kho lưu trữ github (hoặc url github pages) mà bạn muốn triển khai đến.
![Deploy To github pages component](/deployment/deploytogithubpages.jpg)

<video-embed src="https://www.youtube.com/watch?v=Vyk3cWB6u-c" />

:::

#### Khắc phục sự cố github pages
- **Tôi đã triển khai đến github pages nhưng không có action nào chạy / trang web không trực tuyến**
   - Nếu bạn triển khai lần đầu, có thể mất vài phút để trang web của bạn hoạt động. Bạn có thể kiểm tra tab **Actions** trên github (`/actions`) để xem quá trình triển khai.
   - Nếu trang web của bạn không trực tuyến sau vài phút hoặc bạn không thấy bất kỳ workflow nào chạy trong tab **Actions** trên github, thì hãy vào trang cài đặt **Github Pages** (`/settings/pages`) và đảm bảo **Branch** được đặt thành *gh-pages*.

### Triển khai đến Facebook Instant Games

Với Needle Engine, bạn có thể build cho Facebook Instant Games một cách tự động
Không yêu cầu bất kỳ chỉnh sửa thủ công nào đối với ứng dụng web hoặc game của bạn.

:::details Làm cách nào để triển khai đến Facebook Instant Games từ Unity?
- Thêm thành phần `Deploy To Facebook Instant Games` vào scene của bạn:
  ![Deploy to facebook instant games component](/deployment/deploytofacebookinstantgames.jpg)
- Nhấp vào nút `Build For Instant Games`
- Sau khi quá trình build hoàn thành, bạn sẽ nhận được một file ZIP mà bạn có thể tải lên ứng dụng facebook của mình.
- Trên Facebook, thêm module `Instant Games` và truy cập `Instant Games/Web hosting`
  ![Hosting a facebook instant games](/deployment/deploytofacebookinstantgames-hosting.jpg)
- Bạn có thể tải file zip của mình lên bằng cách sử dụng nút `Upload version` (1). Sau khi quá trình tải lên hoàn thành và file zip đã được xử lý, nhấp vào nút `Stage for testing` để kiểm tra ứng dụng của bạn (2, ở đây là nút màu xanh) hoặc `Push to production` (nút có biểu tượng ngôi sao)
  ![Upload the zip to facebook instant games](/deployment/deploytofacebookinstantgames-upload.jpg)
- Xong - sau đó bạn có thể nhấp vào nút `Play` bên cạnh mỗi phiên bản để kiểm tra game của bạn trên facebook.

:::

:::details Làm cách nào để tạo một ứng dụng trên Facebook (với khả năng Instant Games)

1) [Tạo một ứng dụng mới](https://developers.facebook.com/apps/creation/) và chọn `Other`. Sau đó nhấp `Next`
  ![Create facebook instant games app](/deployment/facebookinstantgames-1.jpg)

2) Chọn loại `Instant Games`
  ![Create facebook instant games app](/deployment/facebookinstantgames-2.jpg)

3) Sau khi tạo ứng dụng, thêm sản phẩm `Instant Games`
  ![Add instant games product](/deployment/facebookinstantgames-3.jpg)

Tại đây bạn có thể tìm [tài liệu chính thức về instant games](https://developers.facebook.com/docs/games/build/instant-games) trên facebook.
**Lưu ý** rằng tất cả những gì bạn phải làm là tạo một ứng dụng có khả năng instant games.
Chúng tôi sẽ lo mọi thứ khác và không cần chỉnh sửa thủ công nào đối với trang web Needle Engine của bạn.
:::

## Build ra thư mục

Trong Unity, mở ``File/Build Settings`` và chọn ``Needle Engine`` để xem các tùy chọn:

![image](/imgs/unity-build-window-menu.jpg)

![image](/imgs/unity-build-window.jpg)

Để build dự án web của bạn để tải lên bất kỳ máy chủ web nào, bạn có thể nhấp vào **Build** trong Cửa sổ Build Settings của Unity Editor. Bạn có thể bật hộp kiểm ``Development Build`` để bỏ qua nén (xem bên dưới), điều này yêu cầu phải cài đặt toktx trên máy tính của bạn.

Để xem trước bản build cuối cùng của bạn cục bộ, bạn có thể sử dụng nút `Preview Build` ở cuối cửa sổ. Nút này trước tiên sẽ thực hiện một bản build thông thường và sau đó khởi động một máy chủ cục bộ trong thư mục chứa các file cuối cùng để bạn có thể thấy kết quả khi tải các file này lên máy chủ web của mình.

Nodejs **chỉ** cần thiết trong quá trình phát triển. Trang web được phân phối (sử dụng template vite mặc định của chúng tôi) là một trang tĩnh không phụ thuộc vào Nodejs và có thể được đặt trên bất kỳ máy chủ web thông thường nào. Nodejs là cần thiết nếu bạn muốn chạy máy chủ mạng tối giản của chúng tôi trên cùng một máy chủ web (tự động có trong quá trình triển khai Glitch).

---

## Quy trình triển khai đa nền tảng

Có thể tạo các dự án Unity thông thường mà bạn có thể build cho cả Needle Engine và các nền tảng Unity thông thường như Desktop hoặc thậm chí WebGL. Phương pháp "component mapping" của chúng tôi có nghĩa là không có logic runtime nào bị sửa đổi bên trong Unity - nếu muốn, bạn có thể thường xuyên sử dụng Play Mode và build cho các nền tảng mục tiêu khác. Trong một số trường hợp, điều này sẽ có nghĩa là bạn có mã trùng lặp (mã C# và logic TypeScript tương ứng). Mức độ công việc bổ sung do điều này phụ thuộc vào dự án của bạn.

**Vào Play Mode trong Unity**
Trong `Project Settings > Needle Engine`, bạn có thể tắt `Override Play Mode` và `Override Build settings` để chuyển đổi giữa quy trình build của Needle và quy trình build của Unity:
![image](https://user-images.githubusercontent.com/2693840/187308490-5acb9016-ffff-4113-be62-4de450a42b08.png)

## Tham số dòng lệnh Needle Engine cho Unity

Needle Engine cho Unity hỗ trợ nhiều tham số dòng lệnh khác nhau để xuất các asset riêng lẻ (Prefabs hoặc Scenes) hoặc để build toàn bộ dự án web ở chế độ batch (không cửa sổ).

Danh sách sau đây đưa ra một bảng các tùy chọn có sẵn:

| | |
| -- | -- |
| `-scene` | đường dẫn đến một scene hoặc một asset để xuất, ví dụ: `Assets/path/to/myObject.prefab` hoặc `Assets/path/to/myScene.unity` |
| `-outputPath <path/to/output.glb>` | đặt đường dẫn đầu ra cho bản build (chỉ hợp lệ khi build một scene) |
| `-buildProduction` | chạy bản dựng sản xuất |
| `-buildDevelopment` | chạy bản dựng phát triển |
| `-debug` | mở cửa sổ console để gỡ lỗi |

Page automatically translated using AI