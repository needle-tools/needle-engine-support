<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <span style="font-size: 50px;">✨</span>
</div>

# Tích hợp với các công cụ khác

Needle Engine được thiết kế để linh hoạt và có khả năng mở rộng. Nó có thể được tích hợp với các công cụ và dịch vụ khác để cải thiện quy trình làm việc của bạn trong việc đưa nội dung 3D phong phú, tương tác lên web từ bất kỳ phần mềm nào.

Cốt lõi của việc tích hợp tùy chỉnh với Needle Engine là định dạng 3D glTF. Đây là định dạng được hỗ trợ rộng rãi nhất cho nội dung 3D trên web và linh hoạt nhất. Định dạng nhẹ này có thể lưu trữ các mô hình 3D, hoạt ảnh, texture và tất cả các loại dữ liệu bổ sung. glTF có khả năng mở rộng, đây chính là lý do chúng tôi chọn nó làm nền tảng cho Needle Engine. Nó cho phép chúng tôi thêm các tính năng phong phú và khả năng tương tác vào các tệp 3D, bao gồm better rendering, physics, interactions, XR, networking, và nhiều hơn nữa.

Do sử dụng định dạng glTF được tiêu chuẩn hóa để trao đổi, việc tạo một tích hợp cơ bản vào bất kỳ phần mềm nào đều dễ dàng – chỉ cần xuất tài sản 3D của bạn dưới dạng tệp glTF và nhập chúng vào Needle Engine. Từ đó, bạn có thể thêm nhiều tính năng hơn vào tích hợp của mình để hỗ trợ các scripting extensions của chúng tôi. Thông thường, điều này được thực hiện thông qua một plugin, extension hoặc export hook trong phần mềm 3D của bạn.

## Cấu trúc của một tích hợp tùy chỉnh
Cấu trúc của một tích hợp tùy chỉnh trông như thế này:

1. Xuất tài sản 3D của bạn dưới dạng tệp glTF. Ở giai đoạn này, tích hợp của bạn có lẽ đơn giản như việc nhấp vào nút export trong phần mềm 3D của bạn.
2. Sử dụng tệp glTF trong một dự án web sử dụng Needle Engine.
   - Đây có thể là một dự án web được tạo bằng một tích hợp khác, tải xuống từ một mẫu, hoặc một dự án web mới được tạo bằng `npx needle-create`.
   - Xuất tệp glTF vào thư mục `assets`. Ứng dụng web của bạn sẽ tự động làm mới bất cứ khi nào bạn re-export tệp glTF.
3. Ở giai đoạn này, bạn đã có một tích hợp chức năng cơ bản và bạn đã có thể thêm chức năng tùy chỉnh thông qua TypeScript trong dự án web.
4. Bước tiếp theo là thêm một cách để tạo và điều chỉnh các components trong phần mềm của bạn. Tùy thuộc vào phần mềm, điều này có thể được thực hiện thông qua UI tùy chỉnh, một script hoặc một plugin.
   - Để bắt đầu, hãy thử với một component như `DragControls`. Nó có một vài tùy chọn, nhưng các giá trị mặc định là đủ tốt để bắt đầu.
   - Sau đó, chuyển sang các components yêu cầu cấu hình. Một điểm khởi đầu tốt là `Everywhere Actions` của chúng tôi, bởi vì chúng cho phép người tạo xây dựng nhiều loại trải nghiệm tương tác mà không cần viết bất kỳ dòng code nào.
5. Xuất các components đó như một phần của glTF extension `NEEDLE_components` cho mỗi node. Thông thường, điều này được thực hiện bằng cách thêm custom glTF extension hoặc hook vào glTF exporter hiện có trong phần mềm của bạn.
6. Tích hợp với một dự án web sao cho UI có thể được tạo cho các components tùy chỉnh. Đối với Unity và Blender, chúng tôi gọi đây là `Component Compiler` – nó tự động tạo UI cho các components trong dự án của bạn và đóng vai trò là cầu nối giữa các components TypeScript và phần mềm 3D của bạn.

## Tích hợp quy trình làm việc của dự án web

Một tích hợp fully-flegded có thể cũng quản lý nhiều hơn quy trình làm việc của dự án web. Tất cả các thao tác này có thể được thực hiện từ command line, nhưng để dễ sử dụng, chúng có thể được gói gọn trong GUI hoặc một menu tùy chỉnh trong phần mềm 3D của bạn. Điều này bao gồm:

1. Tạo một dự án mới hoặc thay đổi location của dự án web
2. Chạy dự án web từ bên trong phần mềm 3D của bạn
   - Tích hợp [Unity integration](./../unity/) của chúng tôi overrides nút "Play" để chạy dự án web.
   - Tích hợp [Blender integration](./../blender/) có một nút "Play" tùy chỉnh để chạy dự án web.
3. Building dự án web vào một folder
4. Uploading dự án đã built lên Needle Cloud hoặc một nền tảng khác, và ghi nhớ Project ID và Team ID
   - Tích hợp Unity của chúng tôi additionally hiển thị các uploads gần đây nhất cho team của bạn, và cho phép bạn jump đến deployment cuối cùng của một dự án.
5. Uploading/downloading individual assets lên Needle Cloud hoặc một nền tảng khác

:::tip Hãy liên hệ nếu bạn đang có kế hoạch xây dựng một tích hợp tùy chỉnh!
Vui lòng liên hệ với chúng tôi nếu bạn quan tâm đến việc xây dựng một tích hợp tùy chỉnh. Chúng tôi rất sẵn lòng giúp bạn trong quá trình này và giải thích thêm các chi tiết. Đối với khách hàng Enterprise, chúng tôi cũng cung cấp dịch vụ custom integrations.
:::

Trang tự động dịch bằng AI