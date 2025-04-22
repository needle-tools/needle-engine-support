---
next: features-overview
---

# Tầm nhìn của chúng tôi 🔮

## Tương lai của Web 3D

Chúng tôi tin rằng việc sử dụng 3D trên web sẽ mở rộng đáng kể trong những năm tới. Trong khi ngày nay các ứng dụng native là tiêu chuẩn, ngày càng có nhiều nội dung được cung cấp dưới dạng web app hoặc [PWA](https://web.dev/progressive-web-apps/). Các thiết bị VR và AR mới sẽ [mở rộng sang web](https://immersive-web.github.io/webxr-samples/), tạo ra một vấn đề thú vị: responsive đột nhiên không chỉ có nghĩa là "màn hình nhỏ" hay "màn hình lớn", bạn còn phải xử lý không gian, 3D, vị trí không gian và tiềm năng là kính và bộ điều khiển!

Thêm vào đó là sự thúc đẩy hướng tới tương tác và hợp tác nhiều hơn, và bạn sẽ có một hỗn hợp các thách thức thú vị.

Tại Needle, chúng tôi tin rằng việc lên ý tưởng và sáng tạo trong không gian này phải dễ dàng. Chúng tôi đã đặt ra mục tiêu đẩy nhanh tiến độ – tạo ra runtime riêng để đạt được những mục tiêu này. Đó là lý do tại sao chúng tôi tích hợp khả năng triển khai tới AR và VR ngay vào các core components của mình, và liên tục kiểm tra xem các ý tưởng mới có hoạt động trên các nền tảng hay không.

## Tại sao lại có thêm một nền tảng khác cho 3D trên web? Chẳng phải đã có đủ lựa chọn rồi sao?

Có rất nhiều lựa chọn, đúng là như vậy! Chúng tôi nhận thấy rằng các hệ thống hiện tại<sup>1</sup> có thể được phân loại sơ bộ thành hai nhóm: một số có khả năng xử lý asset, các tool và workflow thân thiện với artist rất tốt nhưng xuất ra một loại binary blob, và những loại khác tập trung vào code nhiều hơn, thân thiện với developer và cho phép tích hợp tuyệt vời vào các modern web workflows<sup>2</sup>.

Chúng tôi muốn kết nối hai thế giới này và kết hợp những gì tốt nhất của cả hai: workflow thân thiện với artist và modern web technologies. Kết hợp với các modern formats và workflow nhanh chóng, chúng tôi tin rằng điều này sẽ cho phép nhiều creator hơn đưa nội dung của họ lên web. Chúng tôi cũng nhìn thấy cơ hội để làm tốt ngay từ đầu với AR, VR và collaboration.

<sup>1</sup>: _Ví dụ bao gồm Unity, PlayCanvas, three.js, react-three-fiber, Babylon, A-Frame, Godot, và nhiều hơn nữa._
<sup>2</sup>: _Có nhiều sắc thái hơn về điều này so với những gì có thể trình bày trong một đoạn giới thiệu! Tất cả các engine và framework đều có những điểm mạnh và điểm yếu riêng, và liên tục phát triển._

## Tạo ra Quy trình làm việc (Workflow), không phải Trình chỉnh sửa (Editor)

Chúng tôi nghĩ rằng làn sóng ứng dụng 3D tiếp theo trên web sẽ đi kèm với _workflows_ tốt hơn: mọi người đều có thể tạo một 3D scene, một phòng trưng bày nghệ thuật, giới thiệu sản phẩm hoặc 3D scan trên web hoặc làm simple games. Để đạt được mục tiêu này sẽ cần nhiều hơn là chỉ hỗ trợ một hệ thống cụ thể và xuất ra web từ đó.

Mục tiêu của chúng tôi là cho phép mọi người đưa data lên web từ _các creative tools_ của họ: dù là Unity, Blender, Photoshop, hay thứ gì khác. Chúng tôi biết rằng đây là một mục tiêu lớn – nhưng thay vì làm mọi thứ cùng một lúc, chúng tôi muốn lặp lại và tiến gần hơn đến mục tiêu đó cùng nhau.

## Tiêu chuẩn mở thay vì Vùng chứa độc quyền

Tại cốt lõi của Needle Engine là định dạng [glTF](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) và khả năng mở rộng của nó với các custom extensions. Mục tiêu là: một tệp `.glb` duy nhất có thể chứa toàn bộ data của ứng dụng của bạn.

Điều đáng chú ý là không phải mục tiêu là vận chuyển code thực tế bên trong glTF; việc vận chuyển và chạy code là công việc của các modern web runtimes và bundling. Chúng tôi chắc chắn có thể hình dung rằng các abstract representations của logic (ví dụ: graphs, state machines, v.v.) có thể được chuẩn hóa đến một mức độ nhất định và cho phép interoperable worlds, nhưng chúng tôi chưa đạt đến đó.

[Đọc thêm về cách chúng tôi sử dụng glTF và các extension](./technical-overview.md)

# Các mục tiêu và những điều không phải mục tiêu

## Các mục tiêu
- Iteration phải nhanh chóng và triển khai phải nhanh.
- Làm việc trên các dự án web 3D phải dễ dàng như làm việc với các dự án web 2D.
- Developers và artists có thể cộng tác trực tiếp.
- Responsive web mở rộng ra ngoài màn hình – AR và VR nên được xây dựng tích hợp, không phải là suy nghĩ sau.
- Chúng tôi muốn đóng góp trở lại cho các open-source projects.
- Thảo luận cởi mở về 3D và web standards.
- Khả năng đưa và lấy data của bạn ở các open formats.
- Khả năng chọn web framework bạn sử dụng, không bị lock-in vào các framework và vendor cụ thể.
- Các common usecases hoạt động mà không cần hoặc chỉ cần kinh nghiệm coding hạn chế.

## Những điều không phải mục tiêu
- Không phải mục tiêu là có 100% coverage của tất cả các sự kết hợp giữa Editor versions, feature sets, render pipelines.
- Không phải mục tiêu là cung cấp một môi trường no-code hoàn chỉnh.
- Không phải mục tiêu là sánh ngang feature set, capabilities, hoặc runtime performance của các engines khác.

# Mối liên hệ với các engine và framework khác

## Needle Engine và Unity WebGL

Qua nhiều năm làm việc với Unity, chúng tôi nhận thấy rằng trong khi engine và editor tiến bộ với tốc độ tuyệt vời, output WebGL hơi bị tụt lại phía sau. Việc tích hợp Unity players vào các web-based systems khá khó khăn, việc "nói chuyện" với website xung quanh đòi hỏi một số giải pháp thay thế, và quan trọng nhất, thời gian iteration rất chậm do cách Unity đóng gói tất cả code vào WebAssembly thông qua IL2CPP. Những công nghệ này rất tuyệt vời và mang lại runtime performance tuyệt vời cùng rất nhiều flexibility. Nhưng chúng chậm hơn và bị ngăn cách nhiều so với modern web development workflows đến nỗi chúng tôi quyết định tự mình giải quyết vấn đề.

## Needle Engine và three.js

Needle Engine được xây dựng trên three.js. Tất cả rendering đều đi qua nó, các tệp glTF được tải qua các extension interfaces của three, và component system của chúng tôi xoay quanh Object3D và scene graph của three. Chúng tôi cam kết đóng góp một số thay đổi và cải tiến của mình lên upstream, tạo pull requests và báo cáo issues trong quá trình thực hiện.

Trang được tự động dịch bằng AI