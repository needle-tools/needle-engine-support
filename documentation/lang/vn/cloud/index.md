---
title: Needle Cloud
description: 'Needle Cloud là một dịch vụ trực tuyến. Nó giúp bạn lưu trữ, quản lý và chia sẻ tài sản 3D cũng như ứng dụng trên web.
 Hỗ trợ nhiều định dạng tệp khác nhau, bao gồm glTF, USD, FBX, VRM, và nhiều định dạng khác. Ứng dụng web không gian được tạo bằng Needle có thể được triển khai lên cloud trực tiếp từ tích hợp Unity, và thông qua giao diện dòng lệnh (CLI).'
---

<br/>
<discountbanner/>


# Needle Cloud

## Tổng quan

Needle Cloud là một dịch vụ trực tuyến. Nó giúp bạn lưu trữ, quản lý và chia sẻ tài sản 3D cũng như ứng dụng trên web.
Hỗ trợ nhiều định dạng tệp khác nhau, bao gồm glTF, USD, FBX, VRM, và nhiều định dạng khác. Ứng dụng web không gian được tạo bằng Needle có thể được triển khai trực tiếp từ [tích hợp Unity](#deploy-from-unity) hoặc [giao diện dòng lệnh](#deploy-from-the-cli) (CLI) Needle Cloud của chúng tôi.

Truy cập [Needle Cloud](https://cloud.needle.tools) để tạo tài khoản miễn phí.

![Needle Cloud Overview](/cloud/cloud-overview-page.webp)

## Tính năng

1. **Lưu trữ ứng dụng web không gian**  
   Các ứng dụng được tạo bằng Needle có thể được triển khai lên cloud trực tiếp từ các tích hợp engine của chúng tôi. Điều này cho phép bạn dễ dàng cung cấp cho nhóm của mình và khách hàng quyền truy cập công khai vào các ứng dụng, mà không cần phải thiết lập máy chủ riêng. Nếu cần, bạn có thể bảo vệ ứng dụng bằng mật khẩu.

2. **Quản lý tài sản 3D một cách riêng tư và an toàn**  
   Dễ dàng tải lên và sắp xếp các tệp 3D của bạn. Nhờ CDN (mạng lưới phân phối nội dung) nhanh chóng của chúng tôi, các tệp của bạn được lưu trữ an toàn và có thể truy cập nhanh chóng từ mọi nơi trên thế giới.
   Needle Cloud không phải là một marketplace, và cũng không phải là một mạng xã hội. Nó được thiết kế cho các agency, studio và creator để quản lý tài sản của họ một cách riêng tư và an toàn.

3. **Tối ưu hóa tài sản 3D từ nhiều định dạng khác nhau**  
   Tự động nén các tệp của bạn để giảm kích thước trong khi vẫn giữ chất lượng hình ảnh. Điều này giúp tệp của bạn tải nhanh hơn và tiết kiệm băng thông cũng như bộ nhớ trên thiết bị của người dùng.

4. **Chia sẻ và Kiểm soát Phiên bản (Version Control)**  
   Các liên kết đến tệp của bạn có thể được chia sẻ với người khác và sử dụng trực tiếp trong các dự án của bạn. Bạn có thể tải lên các phiên bản mới của tài sản và ứng dụng. Các phiên bản riêng lẻ có thể được dán nhãn, cho phép quy trình xem xét linh hoạt: ví dụ, bạn có thể dán nhãn một phiên bản là `main` hoặc `experimental`. Bạn cũng có thể hoàn nguyên nhãn về một phiên bản trước đó nếu cần.

5. **Công cụ tự động hóa và Pipeline qua CLI**  
   CLI (giao diện dòng lệnh) `needle-cloud` giúp dễ dàng tự động hóa việc tải lên và tối ưu hóa tệp. Điều này hữu ích cho việc tích hợp Needle Cloud vào pipeline hiện có của bạn, hoặc để tự động hóa việc tải lên số lượng lớn tệp.

6. **Quản lý Giấy phép**  
   Giấy phép cho Needle Engine dành cho solo creator và nhóm được quản lý thông qua Needle Cloud. Điều này đảm bảo chỉ những người dùng được ủy quyền mới có thể truy cập tệp và dự án của bạn. Liên hệ với chúng tôi để biết giấy phép Enterprise và Edu.


## Triển khai từ Unity

Needle Cloud được tích hợp vào Unity Editor. Điều này cho phép bạn triển khai ứng dụng của mình trực tiếp từ Unity lên Needle Cloud. Bạn cũng có thể tải lên và tải xuống tài sản từ Needle Cloud trực tiếp trong Unity.

1. **Cài đặt tích hợp Unity, nếu bạn chưa làm.**   
   Xem [trang này](./../unity/) để biết thêm thông tin.

2. **Thêm component `Needle Engine` (trước đây là ExportInfo) vào scene của bạn.**   
   Component này được sử dụng để cấu hình cài đặt export cho ứng dụng của bạn.  
   Bạn có thể sử dụng mục menu `GameObject > Needle Engine > Add Export Info` hoặc tạo một scene mới từ một template Needle thông qua mục menu `File > New Scene`.

3. **Nhấp vào `Upload to Needle Cloud`.**   
   Thao tác này sẽ build ứng dụng của bạn và tải nó lên Needle Cloud. Bạn cũng có thể chọn triển khai tới một nhóm và dự án cụ thể. _upload name_ của dự án, hiển thị bên cạnh nút, được lưu trong scene. Các lần tải lên sau sẽ sử dụng cùng _upload name_, và tất cả các phiên bản đã tải lên sẽ được nhóm lại trên trang web Needle Cloud.   
   
   ![Needle Cloud Unity Integration](/cloud/cloud-deploy-v1.webp)

## Triển khai từ CLI

Needle Cloud cung cấp giao diện dòng lệnh (CLI) cho phép bạn quản lý tài sản của mình và triển khai ứng dụng một cách hiệu quả. Bạn có thể sử dụng CLI để tự động hóa các tác vụ và tích hợp Needle Cloud vào quy trình làm việc hiện có của mình.

CLI có sẵn dưới dạng [gói npm](https://www.npmjs.com/package/needle-cloud), nghĩa là bạn cần phải cài đặt Node.js trên máy của mình. Bạn có thể kiểm tra xem mình đã cài đặt Node.js chưa bằng cách chạy lệnh sau trong terminal:

```bash
node -v
```
Nếu bạn chưa cài đặt Node.js, bạn có thể tải nó từ [trang web Node.js](https://nodejs.org/).  

Bạn có thể cài đặt gói CLI `needle-cloud` globally hoặc sử dụng nó thông qua `npx`. Điều này cho phép bạn chạy các lệnh CLI mà không cần cài đặt nó globally. 


1. **Sử dụng lệnh npx (được khuyến nghị)**
   ```bash
   npx needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```
2. **Hoặc cài đặt needle-cloud globally**  
   Cài đặt globally cho phép sử dụng CLI từ bất kỳ đâu trên hệ thống của bạn. Để cài đặt CLI globally, chạy lệnh sau trong terminal: 
   ```bash
   npm install -g needle-cloud
   ```
   Bây giờ, bạn có thể sử dụng lệnh `needle-cloud` trong terminal:

   ```bash
   needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```

### Triển khai tự động
Để triển khai từ **Github Actions** hoặc **Stackblitz**, bạn có thể cung cấp một access token dưới dạng `--token <access_token>`. Access token có thể được tạo trên [trang nhóm của bạn](https://cloud.needle.tools/team) trên Needle Cloud. Đảm bảo tạo token với quyền `read/write`.      

Sử dụng [Needle Cloud Github Action](https://github.com/marketplace/actions/deploy-to-needle-cloud) để triển khai bản cập nhật từ Github (ví dụ: mỗi khi bạn push lên repository)

#### Ví dụ: Needle Cloud Github Action
```yml
      - name: Deploy to Needle Cloud
        uses: needle-tools/deploy-to-needle-cloud-action@v1
        id: deploy
        with:
            token: ${{ secrets.NEEDLE_CLOUD_TOKEN }}
            dir: ./dist
            name: vite-template # optional
```

#### Ví dụ: Triển khai bằng lệnh CLI

```bash
# Triển khai lên Needle Cloud từ ví dụ như một github action
npx needle-cloud deploy '/path/to/output' --team 'My team' --name 'some name or id' --token '<access_token>'
```

### Trợ giúp CLI
Sử dụng `help` để xem tất cả các tùy chọn dòng lệnh có sẵn và trợ giúp cho từng lệnh riêng lẻ.
```bash
# xem tất cả các tùy chọn có sẵn
npx needle-cloud help
# nhận trợ giúp cho một lệnh cụ thể ví dụ như deploy
npx needle-cloud help deploy
```


## URL triển khai

Khi triển khai lên Needle Cloud, mỗi lần tải lên sẽ nhận được một URL duy nhất. Bạn có thể chia sẻ liên kết đến một phiên bản _cụ thể_, hoặc đến một phiên bản _được dán nhãn_ với nhóm hoặc khách hàng của mình.

-----

Trong ví dụ sau, chúng ta có một ứng dụng đã được triển khai hai lần. Mỗi lần triển khai nhận được một URL cụ thể, còn được gọi là URL _ghim_ (pinned) vì nó được ghim vào một phiên bản cụ thể.
1. [collaborativesandbox-zubcks1qdkhy<strong>-1qdkhy</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-1qdkhy.needle.run/)  
   Đây là phiên bản đầu tiên được tải lên.
2. [collaborativesandbox-zubcks1qdkhy<strong>-2e2spt</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-2e2spt.needle.run/)  
   Đây là phiên bản thứ hai được tải lên.

Bản triển khai _mới nhất_ (latest) luôn có sẵn tại URL sau. URL này hữu ích cho việc chia sẻ với nhóm của bạn, vì nó luôn trỏ đến phiên bản mới nhất của ứng dụng. Một tên phổ biến khác cho phiên bản này là _dev_ hoặc _canary_.
- [collaborativesandbox-zubcks1qdkhy<strong>-latest</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-latest.needle.run/)  
  URL này tự động hiển thị phiên bản mới khi bạn tải lên một phiên bản mới của ứng dụng.

Bản triển khai _chính_ (main) hữu ích cho việc chia sẻ với khách hàng, vì nó luôn trỏ đến phiên bản mới nhất của ứng dụng mà bạn đã promote. Các tên phổ biến khác cho phiên bản này là _production_, _stable_, hoặc _live_.
- [collaborativesandbox-zubcks1qdkhy.needle.run](https://collaborativesandbox-zubcks1qdkhy.needle.run/)  
  URL này không thay đổi khi bạn tải lên một phiên bản mới. Nó sẽ chỉ thay đổi khi bạn promote rõ ràng một phiên bản mới lên _chính_.

Thông thường, bạn tải lên một phiên bản mới, xem xét nó, và sau đó quyết định xem bạn có muốn promote nó lên _chính_ hay không.

-----

Trang web Needle Cloud hiển thị tất cả các phiên bản ứng dụng đã được triển khai, bao gồm các phiên bản latest và main. Các nhãn có thể được di chuyển bằng cách nhấp vào <kbd>⋮</kbd> và chọn <kbd>Đặt nhãn chính</kbd> (Set main label) hoặc <kbd>Xóa nhãn chính</kbd> (Remove main label).  

![Needle Cloud Version List](/cloud/cloud-edit-page.webp)

## Các định dạng 3D được hỗ trợ

1. **glTF và GLB** <a href="https://cloud.needle.tools/view?file=2oAMeWZ1hWL3C-latest-product" target="_blank">Ví dụ</a>   
   Định dạng glTF là định dạng được hỗ trợ rộng rãi nhất cho 3D trên web. Đây là định dạng nhẹ có thể lưu trữ mô hình 3D, animation và texture. Tệp GLB là phiên bản nhị phân của tệp glTF, nơi tất cả dữ liệu được lưu trữ trong một tệp duy nhất.
   glTF hỗ trợ các kỹ thuật nén tiên tiến như Draco, KTX2 và Meshopt, được hỗ trợ đầy đủ bởi Needle Cloud và Needle Engine.

2. **OpenUSD**   
   USD là định dạng mạnh mẽ cho việc trao đổi dữ liệu 3D. Nó nổi tiếng được sử dụng trong ngành công nghiệp phim và VFX, và đang ngày càng phổ biến trong ngành công nghiệp game. Needle Cloud hỗ trợ tệp USDZ và USD nguyên bản thông qua công việc của chúng tôi trên USD-WASM, đồng thời cũng chuyển đổi tệp USD sang glTF để xử lý và tối ưu hóa thêm.

3. **FBX**  
   FBX đã là định dạng phổ biến để trao đổi dữ liệu 3D trong nhiều năm, nhưng thiếu một số tính năng hiện đại như vật liệu PBR và các extension. Needle Cloud chuyển đổi tệp FBX sang glTF để xử lý và tối ưu hóa thêm.  

4. **VRM**  
   VRM là định dạng dành cho avatar hình người. Nó dựa trên glTF với các ràng buộc bổ sung thông qua việc sử dụng các glTF extension. Needle Cloud hỗ trợ tệp VRM nguyên bản và có thể tối ưu hóa chúng giống như các tệp glTF khác, bao gồm các VRM extension phức tạp như phonemes, toon shading và dynamic bones.

5. **OBJ**  
   OBJ là định dạng dựa trên văn bản đơn giản cho mô hình 3D. Nó hỗ trợ vật liệu cơ bản thông qua tệp MTL, animation và hệ thống phân cấp đối tượng. Needle Cloud chuyển đổi tệp OBJ sang glTF để xử lý và tối ưu hóa thêm. 

:::tip Sử dụng glTF hoặc USD khi có thể
Chúng tôi khuyên dùng glTF và USD làm các định dạng chính để trao đổi dữ liệu 3D. Chúng được hỗ trợ rộng rãi, có các tính năng hiện đại và mô hình vật liệu tốt.
:::

## Tài sản trên Cloud

### Tải tài sản lên

Bạn có thể dễ dàng tải tệp của mình lên bằng cách kéo chúng vào trang web hoặc chọn chúng từ máy tính của bạn.
Các tệp không phải glTF được tự động chuyển đổi sang glTF để xử lý thêm, nhưng các tệp gốc vẫn được giữ lại để tải xuống và xem trên web. 

### Phiên bản tài sản

Khi bạn truy cập Trang chỉnh sửa (Edit Page) của một tài sản, bạn có thể xem tất cả các phiên bản đã được bạn hoặc nhóm của bạn tải lên cho đến nay. Bạn cũng có thể gắn thẻ các phiên bản để đánh dấu chúng là "main" hoặc "experimental". "Latest" là thẻ mặc định cho phiên bản mới nhất.

### Chia sẻ liên kết đến tài sản

Bạn có thể tạo liên kết để chia sẻ các tệp cụ thể hoặc các tệp được gắn thẻ với nhóm hoặc khách hàng của mình. Các liên kết được gắn thẻ sẽ tự động cập nhật khi bạn di chuyển thẻ – vì vậy bạn có thể chia sẻ một liên kết "main" một lần và tiếp tục cập nhật tệp mà không cần gửi liên kết mới.

### Sử dụng tài sản trên Cloud trong Needle Engine

Các tệp được lưu trữ trong Needle Cloud có thể được đưa trực tiếp vào các dự án Needle Engine một cách dễ dàng. Component `Needle Cloud Asset` nhận một liên kết đến tài sản và tải nó trong thời gian runtime. Điều này cho phép bạn giữ kích thước dự án của mình nhỏ và tải tài sản theo yêu cầu, những tài sản này vẫn có thể được cập nhật trên cloud. 

::: tip Sử dụng Progressive Loading khi có thể
Các tài sản được lưu trữ trên Needle Cloud được tự động tối ưu hóa để sử dụng tối ưu trong thời gian runtime bằng công nghệ Progressive Loading của chúng tôi. Đối với mỗi mesh và texture, nhiều phiên bản mức độ chi tiết (level-of-detail) được tạo ra, và chỉ những phần của tài sản cần thiết mới được tải trong thời gian runtime. 

Điều này giúp tiết kiệm rất nhiều băng thông và bộ nhớ (thường là 90% hoặc hơn so với việc tải toàn bộ tài sản).
:::

### Nhúng Cloud Viewer vào trang web của bạn

Cách nhanh chóng để đưa 3D lên trang web của riêng bạn là **nhúng** trình xem Needle Cloud. 
Để làm như vậy, hãy truy cập Trang chỉnh sửa (Edit Page) của một tài sản và nhấp vào <kbd>Nhúng</kbd> (Embed). Sau đó, bạn có thể sao chép đoạn mã `iframe` và dán nó vào trang web của mình.

::: tip Nhúng các phiên bản cụ thể
Bạn cũng có thể nhúng trình xem với liên kết trực tiếp đến tài sản, hoặc với một thẻ cụ thể. Điều này cho phép bạn cập nhật tài sản trên Needle Cloud mà không cần phải cập nhật mã nhúng trên trang web của mình.
:::

### Nhúng vào các framework khác

Các tùy chọn nhúng sau có sẵn:
1. **Needle Cloud Viewer**  
   Sử dụng đoạn mã `iframe` để nhúng trình xem Needle Cloud vào trang web của bạn.

1. **Needle Engine**  
  Sử dụng đoạn mã được cung cấp để nhúng Needle Engine vào trang web của bạn dưới dạng [web component](./../three/).

1. **model-viewer**  
  Dự án [model-viewer](https://modelviewer.dev) cung cấp một web component để hiển thị các mô hình 3D đơn giản, không tương tác trong trình duyệt.

1. **three.js**  
  Nếu bạn quen thuộc với three.js, bạn có thể sử dụng đoạn mã được cung cấp làm điểm khởi đầu cho một ứng dụng three.js hỗ trợ Needle Progressive Loading và tải tệp từ Needle Cloud một cách hiệu quả.

1. **React-Three-Fiber**  
  Nếu bạn đang sử dụng React-Three-Fiber, bạn có thể sử dụng đoạn mã được cung cấp làm điểm khởi đầu cho một dự án hỗ trợ Needle Progressive Loading và tải tệp từ Needle Cloud một cách hiệu quả.

1. **Unity**  
  Nếu bạn đang sử dụng Unity, bạn có thể tích hợp tài sản Needle Cloud trực tiếp vào các dự án của mình bằng cách sử dụng component Needle Cloud Asset để tải và tối ưu hóa liền mạch.

### Sử dụng tài sản trên Cloud với các engine khác như Unity hoặc Unreal

Có nhiều cách để sử dụng tài sản được lưu trữ trên Needle Cloud trong các engine khác như Unity hoặc Unreal.
1. **Tải xuống và Import**  
   Bạn có thể tải xuống tài sản và import nó vào dự án của mình.

2. **Liên kết trực tiếp (Direct Link)**   
   Bạn có thể sử dụng liên kết trực tiếp đến tài sản trong dự án của mình. Bằng cách này, bạn có thể cập nhật tài sản trên Needle Cloud và nó sẽ tự động cập nhật trong dự án của bạn. Việc sử dụng liên kết nào tùy thuộc vào engine và khả năng xử lý glTF của nó:
    - Hỗ trợ **glTF với Progressive Loading**:   
      Sử dụng liên kết `Progressive-World` hoặc `Progressive-Product`.
      Xem [npm:@needle-tools/gltf-progressive](https://www.npmjs.com/package/@needle-tools/gltf-progressive) để biết thêm thông tin về progressive loading và cách bật nó cho engine của bạn.

    - Hỗ trợ **glTF với Draco và KTX2**:
      Sử dụng liên kết `Optimized`.
    - Hỗ trợ glTF, nhưng **không có extension nén**:  
      Sử dụng liên kết `Upload` (đối với tệp gltf/glb đã tải lên) hoặc `Converted` (đối với các tệp khác đã tải lên).

3. **Component Needle Cloud Asset**   
   Nếu bạn đang sử dụng Needle Engine, bạn có thể sử dụng component `Needle Cloud Asset` để tải tài sản trong thời gian runtime. Nó sẽ tự động chọn liên kết tốt nhất cho nền tảng của bạn và tải tài sản bằng Progressive Loading. Điều này cũng được hỗ trợ trong thời gian runtime trong Unity Builds.

## CLI cho Tài sản

Giao diện dòng lệnh (CLI) cho Needle Cloud cho phép tự động hóa việc tải lên và nén tệp. CLI có thể được sử dụng như một phần của bước build (thay thế một tài sản bằng một phiên bản được tối ưu hóa), hoặc như một công cụ độc lập (để xử lý hàng loạt tệp).

Xem [npm:needle-cloud](https://www.npmjs.com/package/needle-cloud) để biết thêm thông tin về CLI và cách sử dụng nó.


## RBAC (kiểm soát truy cập dựa trên vai trò)

Các nhóm bao gồm các thành viên, và mỗi thành viên của một nhóm có thể được gán một vai trò. Các vai trò này xác định những gì bạn có thể và không thể làm trong một nhóm trên Needle Cloud.

Khi dự án của bạn mở rộng và bạn thêm nhiều thành viên nhóm hơn, bạn có thể gán vai trò cho họ để đảm bảo rằng họ có quyền phù hợp để làm việc trên các dự án của bạn.

| | |
| -- | -- |
| **Owner** | Cấp độ quyền hạn cao nhất. Vai trò Owner có thể quản lý toàn bộ nhóm (bao gồm thanh toán và vai trò thành viên), xem tất cả các dự án, các bản tải lên và triển khai  |
| **Manager** | Vai trò Manager có thể quản lý toàn bộ nhóm (bao gồm thanh toán và vai trò thành viên), xem tất cả các dự án, các bản tải lên và triển khai |
| **Billing** | Vai trò Billing chuyên biệt cho các hoạt động tài chính, có thể giám sát thông tin thanh toán của nhóm, xem xét và quản lý chi phí dự án và xử lý các tùy chọn thanh toán. <br/>Vai trò Billing chỉ có quyền xem các bản triển khai và tài sản và không thể thực hiện triển khai hoặc tải lên tài sản. <br/>Vai trò Billing có thể được gán mà không mất thêm chi phí. Vai trò này giới hạn một thành viên mỗi nhóm. |
| **Member** | Vai trò Member (vai trò developer) có thể tạo các bản triển khai, tải lên/tải xuống tài sản để tối ưu hóa hoặc sử dụng các tính năng AI. |

## Câu hỏi thường gặp

1. **Needle Cloud là gì?**   
   Đây là một dịch vụ trực tuyến để tải lên, nén và chia sẻ tài sản và cảnh 3D.

2. **Làm cách nào để tải tài sản lên Needle Cloud?**   
   Bạn có thể tải tệp lên bằng cách kéo chúng vào trang web, hoặc bằng cách tải lên trực tiếp từ các tích hợp được hỗ trợ. Nếu bạn có nhiều tệp, bạn có thể sử dụng CLI (giao diện dòng lệnh) hoặc API (giao diện lập trình ứng dụng).

3. **Làm cách nào để tải xuống các tệp đã tối ưu hóa từ Needle Cloud?**   
   Bạn có thể tải tệp xuống từ trang web. Nhấp vào `Share` và sau đó `Download`. Bạn cũng có thể sử dụng CLI để tải tệp xuống.

4. **Tôi có thể chia sẻ tệp của mình với người khác không?**   
   Có, bạn có thể tạo liên kết để chia sẻ tệp của mình. Liên kết có thể là liên kết tải xuống trực tiếp, hoặc liên kết đến trình xem Needle Cloud.

5. **Có giới hạn về kích thước tệp không?**   
   Giới hạn tải lên phụ thuộc vào gói của bạn. Kiểm tra chi tiết tài khoản của bạn để biết thêm thông tin.

6. **Các tệp trên Needle Cloud có thể được sử dụng với các công cụ khác không?**   
   Có, bạn có thể sử dụng tệp của mình trong các chương trình khác bằng cách export chúng dưới dạng glTF. Export USD sẽ ra mắt sau.

7. **Điều gì xảy ra nếu tôi hết dung lượng lưu trữ?**   
   Bạn có thể cần nâng cấp gói của mình hoặc xóa các tệp cũ để tạo không gian.

8. **Thêm câu trả lời**   
   Truy cập [Needle Cloud FAQ](https://cloud.needle.tools/faq)

Trang tự động dịch bằng AI