---
title: Needle Engine cho Unity
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
  <img src="/imgs/unity-logo.webp" style="max-height:70px;" />
</div>

# Needle Engine cho Unity

Needle Engine cho Unity cho phép bạn tạo các ứng dụng web có tính tương tác cao, linh hoạt và nhẹ nhàng ngay bên trong Unity. Sử dụng các công cụ mạnh mẽ của trình chỉnh sửa Unity để thiết lập trực quan các cảnh 3D, hoạt hình và thiết kế. Needle Engine cho Unity sẽ lo việc xuất cảnh của bạn sang glTF và tích hợp dễ dàng với bất kỳ web frontend framework nào.

## Cài đặt Gói Unity

<NoDownloadYet>
  <br/>
  <needle-button
    event_goal="download_unity"
    event_position="getting_started"
    large
    href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"
    same_tab
    next_url="/docs/unity/"
    >
    <strong>Tải xuống Needle Engine cho Unity</strong>
  </needle-button>
</NoDownloadYet>

<!-- [Mirror](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)    -->

1. **Kéo thả tệp .unitypackage đã tải xuống** vào một dự án Unity và xác nhận bạn muốn nhập nó.

2. **Đợi một chút** để quá trình cài đặt và nhập hoàn tất. Một cửa sổ có thể mở ra thông báo rằng "A new scoped registry is now available in the Package Manager.". Đây là registry Gói Needle của chúng tôi. Bạn có thể đóng cửa sổ đó một cách an toàn.
3. **Khám phá Mẫu**.
  Chọn tùy chọn menu `Needle Engine > Explore Samples` để xem, mở và chỉnh sửa tất cả các [cảnh mẫu](https://engine.needle.tools/samples) có sẵn.

## Hướng dẫn video bắt đầu nhanh

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />

## Bắt đầu từ một Mẫu

Có hơn 100 mẫu bao gồm nhiều chủ đề, trường hợp sử dụng và ngành công nghiệp khác nhau.
Để có cái nhìn tổng quan nhanh, hãy xem [trang Mẫu](https://engine.needle.tools/samples/) của chúng tôi.

Tất cả các mẫu này đều có sẵn trực tiếp trong Unity:
1. Truy cập `Needle Engine > Explore Samples` để duyệt tìm các mẫu
2. Nhấp vào "Install Samples" để cài đặt gói mẫu ngay trong trình chỉnh sửa của bạn (hoặc [tải xuống tệp unitypackage mẫu](http://engine.needle.tools/downloads/unity/samples) để cài đặt gói theo cách thủ công)
3. Chọn bất kỳ mẫu nào và nhấp vào `Open Scene`.

:::tip Các Mẫu là chỉ đọc – điều đó giúp chúng dễ cập nhật.
Các cảnh mẫu của chúng tôi là một phần của gói UPM trong Unity. Điều này có nghĩa là bạn không thể chỉnh sửa trực tiếp các asset và script trong đó – chúng là chỉ đọc. Để chỉnh sửa một asset từ gói mẫu, hãy sao chép nó vào thư mục `Assets` của dự án của bạn. Để chỉnh sửa một script từ gói mẫu, hãy sao chép nó vào thư mục `src` của dự án web của bạn.
:::

## Bắt đầu từ một template

Chúng tôi cung cấp một số Scene Templates để nhanh chóng bắt đầu các dự án mới.
Chúng cho phép bạn chuyển từ ý tưởng đến nguyên mẫu chỉ trong vài cú nhấp chuột.

1. Nhấp vào `File > New Scene`

2. Chọn một trong các template có chữ (needle) trong tên của chúng và nhấp `Create`.
   Chúng tôi khuyên dùng template [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox), đây là một cách tuyệt vời để bắt đầu với tính tương tác, multiplayer và thêm asset.
3. Nhấp Play để cài đặt và khởi động dự án web mới của bạn.

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)

## Bắt đầu từ đầu

Nếu bạn không muốn bắt đầu từ một template cảnh, bạn có thể làm theo các bước sau.
Thực tế, chúng ta sẽ tạo lại template "Minimal (Needle)" đi kèm với gói.

1. **Tạo một cảnh trống mới**

2. **Thiết lập cảnh của bạn để xuất**
  Thêm một GameObject trống, đặt tên là "Exporter" và thêm component `Needle Engine` vào nó (trước đây được gọi là `Export Info`).
  Trong component này, bạn tạo và truy cập nhanh dự án runtime đã xuất của mình.
  Nó cũng cảnh báo bạn nếu bất kỳ gói và module nào của chúng tôi đã lỗi thời hoặc không được cài đặt cục bộ trong dự án web của bạn.

    ::: tip Tên dự án và Tên cảnh
    Theo mặc định, tên dự án khớp với tên cảnh của bạn. Nếu bạn muốn thay đổi điều đó, bạn có thể chọn hoặc nhập ``Directory Name`` nơi bạn muốn tạo dự án web mới của mình. Đường dẫn này là tương đối so với dự án Unity của bạn.
    :::

3. **Chọn một mẫu dự án web**
  Bây giờ, chọn một mẫu dự án web cho dự án của bạn. Mẫu mặc định dựa trên [Vite](https://vitejs.dev/), một trình đóng gói ứng dụng web nhanh.
  <br/>
    ![Unity ExportInfo local templates](/imgs/unity-project-local-template.jpg)

4. Nhấp Play để cài đặt và khởi động dự án web mới của bạn

:::tip Định nghĩa các template của riêng bạn
Nếu bạn thường xuyên tạo nhiều dự án tương tự, bạn có thể tạo các template cục bộ hoặc từ xa của riêng mình bằng cách sử dụng menu ngữ cảnh Project View dưới `Create/Needle Engine/Project Template`. Các template có thể là cục bộ trên ổ đĩa (một thư mục được sao chép) hoặc kho lưu trữ từ xa (một kho lưu trữ git được clone).
:::

## Thư mục và Tệp dự án

| Thư mục | |
| --- | --- |
| **Unity** | |
| `Assets` | Đây là nơi chứa các asset dành riêng/độc quyền cho dự án. |
| `Packages` | Đây là nơi chứa các gói được cài đặt cho dự án này. Một gói có thể chứa bất kỳ loại asset nào. Sự khác biệt chính là nó có thể được thêm vào nhiều dự án Unity. Do đó, đây là một phương pháp tuyệt vời để chia sẻ mã hoặc asset. Để tìm hiểu thêm về các gói, xem [tài liệu Unity về các gói](https://docs.unity3d.com/Manual/PackagesList.html).
| **Gói Unity của Needle Engine** | |
| ``Core/Runtime/Components`` | Chứa tất cả các component tích hợp sẵn của Needle Engine. Tìm hiểu thêm về chúng trong [Tham khảo Component](./../component-reference.md). |

-----

Khi tạo một dự án web mới trong Unity, bạn có thể chọn tạo nó từ một template cục bộ (theo mặc định chúng tôi cung cấp một web template dựa trên vite).

Bạn cũng có thể tham chiếu các template từ xa bằng cách nhập URL kho lưu trữ vào đường dẫn dự án ExportInfo (điều này có thể được lưu cùng với cảnh của bạn, ví dụ). Khi tạo một dự án web mới, kho lưu trữ sẽ được clone hoặc tải xuống (tùy thuộc vào việc bạn đã cài đặt git hay chưa) và tìm kiếm tệp `needle.config.json`. Nếu không tìm thấy trong kho lưu trữ đã clone, thư mục gốc sẽ được sử dụng. Các ví dụ về dự án template từ xa có thể được tìm thấy trên [github.com/needle-engine](https://github.com/needle-engine)

![Unity ExportInfo local templates](/imgs/unity-project-remote-template.jpg)

### Dự án tạm thời

Nếu bạn chỉ định thêm các tệp tùy chỉnh qua NpmDefs và không thay đổi cấu hình dự án (ví dụ: để kiểm tra nhanh chế độ toàn màn hình), bạn có thể thêm tiền tố `Library` vào đường dẫn dự án. Dự án sẽ được tạo trong Unity Project Library và không cần thêm vào kiểm soát phiên bản (thư mục Library nên được loại trừ khỏi kiểm soát phiên bản). Chúng tôi gọi những dự án này là _dự án tạm thời_. Chúng rất tuyệt để nhanh chóng thử nghiệm các ý tưởng!

## Typescript trong Unity

**NPM Definition** là [các gói npm](https://docs.npmjs.com/about-packages-and-modules) được tích hợp chặt chẽ vào Unity Editor, giúp dễ dàng chia sẻ script với nhiều dự án web hoặc thậm chí là các dự án Unity.

Các C# component stubs cho các tệp typescript cũng sẽ được tự động tạo cho các script bên trong các gói npmdef.

#### Tạo và cài đặt một npmdef
Để tạo một *NPM Definition*, nhấp chuột phải vào trình duyệt dự án Unity và chọn ``Create/NPM Definition``.
Bạn có thể **cài đặt một gói *NPM Definition*** vào dự án runtime của mình bằng cách ví dụ chọn component ``Export Info`` và thêm nó vào danh sách ``dependencies`` (nội bộ, điều này sẽ chỉ thêm gói npm cơ bản vào tệp package.json của bạn).

![image](https://user-images.githubusercontent.com/5083203/170374130-d0e32516-a1d4-4903-97c2-7ec9fa0b17d4.png)

Đừng quên cài đặt gói vừa thêm bằng cách ví dụ nhấp Install trên component ExportInfo và cũng khởi động lại máy chủ nếu nó đang chạy

Để chỉnh sửa mã bên trong gói *NPM Definition*, chỉ cần nhấp đúp vào asset *NPM Definition* trong trình duyệt dự án của bạn và nó sẽ mở không gian làm việc vscode đi kèm với mỗi npmdef.

# Các bước tiếp theo

- [Khái niệm: Dự án Web](../project-structure.md)
- [Khái niệm: Xuất Asset](../export.md)
- [Khái niệm: Triển khai (Chia sẻ trang web của bạn)](../deployment.md)
- [Components: Tìm hiểu về Everywhere Actions](../everywhere-actions.md)
- [Scripting cho người mới bắt đầu: Các khái niệm cơ bản về Typescript](../getting-started/typescript-essentials.md)
- [Scripting cho người mới bắt đầu: Cách viết các component tùy chỉnh](../scripting.md)

-----
Trang được dịch tự động bằng AI