---
lang: en-US
title: Mercedes-Benz Showcase
editLink: false
---

## Giới thiệu

Xin chào, tên tôi là Kryštof và tôi đã thực hiện một dự án nghiên cứu về Needle. Tại [công ty của chúng tôi](https://www.ishowroom.cz/home/), chúng tôi muốn xác định xem Needle có thể giúp ích cho quy trình làm việc của chúng tôi như thế nào. Chúng tôi có một khách hàng địa phương chuyên bán lại xe hơi hạng sang. Chúng tôi đã bàn giao một ứng dụng di động và trải nghiệm VR sử dụng Unity. Chúng tôi có khoảng 30 chiếc xe độc đáo đã sẵn sàng trong engine. Chúng tôi có kế hoạch mở rộng trang web của khách hàng với các bản sao kỹ thuật số đẹp mắt có nhiều tùy chọn cấu hình hơn. Needle có thể đạt được chuyển đổi hoàn hảo 1:1 giữa hình ảnh trong Unity và web. Điều này sẽ là một lợi ích lớn cho quy trình làm việc của chúng tôi. Đó là điều đã khơi nguồn cho nghiên cứu của chúng tôi.

<sample src="https://engine.needle.tools/demos/mercedes-benz-demo/" />

## Ngữ cảnh

Tôi không có nhiều kinh nghiệm với javascript, typescript hoặc three.js, vì vậy quan điểm của tôi là một nhà phát triển Unity bán chuyên đang thử cách đơn giản nhất để tạo trải nghiệm web. Đối với những người đề xuất Unity WebGL, thật đáng tiếc là nó không hoạt động và không linh hoạt trên các trình duyệt di động. Needle thật tuyệt 💚

## Ánh sáng

Mô hình chiếu sáng của chúng tôi dựa trên reflection probes trong Unity. Chúng tôi không cần bất kỳ directional hoặc point lights nào, chỉ cần ambient lighting.

Chúng tôi đang sử dụng skybox này:

 ![Skybox](/showcase-mercedes/1_skybox.png)

Trông giống thế này trên lớp sơn xe:

![Paintjob](/showcase-mercedes/2_paintjob_simple.jpg)

Sau đó, để thêm một chút chi tiết nhỏ, tôi đã thêm 2 directional lights với cường độ không đáng kể (0.04) để tạo specular highlights. Vì vậy, trước đây trông như thế này:

![Specular off](/showcase-mercedes/3_SpecularHighlights_off.jpg)

Nhưng với việc thêm directional lights đã tạo thêm sự sống động tốt hơn. Hiệu ứng có thể được làm sâu sắc hơn với cường độ cao hơn:

![Specular on](/showcase-mercedes/4_SpecularHighlights_on.jpg)

## Phông nền

Cảnh hiện tại trông như thế này:

![No background](/showcase-mercedes/5_NoBackground.jpg)

Phông nền đen không được đẹp lắm. Vì vậy, để phân biệt giữa skybox hình ảnh và skybox chiếu sáng, tôi đã thêm một inverse sphere bao phủ toàn bộ bản đồ.

![With background](/showcase-mercedes/6_MapBackground.png)

Về gradient thì chuyển từ màu xám nhạt sang màu trắng..

Hiệu ứng này có thể dễ dàng tạo ra chỉ với UV mapping phù hợp và một texture cao một pixel để định nghĩa gradient.

Tôi đã tạo một unlit shader trong shader graph:

![Evironemnt shader](/showcase-mercedes/7_EnvShaderGraph.jpg)

Tôi nhận thấy một vấn đề color banding, vì vậy tôi đã cố gắng triển khai dithering. Thành thật mà nói, nó không giúp ích cho artefacts nhưng tôi cá rằng có một giải pháp đơn giản cho vấn đề đó. Vì vậy, phần trên của shader lấy mẫu gradient dựa trên trục Y trong object space. Và phần dưới cố gắng triệt tiêu color banding.

Bằng cách sử dụng shaders, việc sử dụng và lặp lại gradient trở nên đơn giản hơn. Bằng cách sử dụng Shadergraph markdown asset của Needle, nó còn đơn giản hơn nữa! 🌵

![Gradiant](/showcase-mercedes/8_Gradiant.png)

## Chuyển động giả của xe

Cảnh hiện tại là tĩnh vì không có gì di chuyển. Chúng ta có thể khắc phục điều đó bằng cách thêm cảm giác chuyển động giả. Hãy bắt đầu bằng cách thêm chuyển động cho bánh xe.

Với một component đơn giản gọi là Rotator, chúng tôi định nghĩa một trục và tốc độ theo trục đó.

![Rotator](/showcase-mercedes/9_Rotator.png)
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export enum RotationAxis {
    X, Y, Z
}

export class Rotator extends Behaviour {
    //@type RotationAxis
    @serializable()
    axis : RotationAxis = RotationAxis.X;

    @serializable()
    speed : number = 1;

    update() {
        const angle = this.speed * this.context.time.deltaTime;
        switch(this.axis) {
            case RotationAxis.X:
                this.gameObject.rotateX(angle);
                break;
            case RotationAxis.Y:
                this.gameObject.rotateY(angle);
                break;
            case RotationAxis.Z:
                this.gameObject.rotateZ(angle);
                break;
        }
    }
}
```

Người dùng giờ đây thấy một chiếc xe đang chạy trong hư vô sâu thẳm, màu sắc không giống bất cứ thứ gì và trải nghiệm thật nhàm chán. Chúng tôi muốn tạo nền cho mô hình và điều đó được thực hiện bằng cách thêm một grid và sau đó dịch chuyển nó để tạo cảm giác xe đang di chuyển. Đây là điều chúng tôi muốn đạt được:

![Motion](/showcase-mercedes/10_WheelsAndGrid.png)

Shader cho grid bao gồm hai phần. Một tiled texture đơn giản của grid được nhân với một circular gradient để làm mờ các cạnh.

![Grid](/showcase-mercedes/11_GridShader.jpg)

## Các yếu tố bổ sung

Bản demo công nghệ này có mục đích là giới thiệu các khả năng của chiếc xe.

Hãy bắt đầu bằng cách làm nổi bật bánh xe.

![Wheel highlight](/showcase-mercedes/12_WheelWithText.png)

Thêm shader này vào một plane sẽ tạo ra một vòng tròn nét đứt xoay theo tốc độ đã định. Kết hợp với world space UI sử dụng một Text component thông thường, điều này có thể làm nổi bật một số khả năng hoặc thông số thú vị của sản phẩm.

![Wheel shader](/showcase-mercedes/13_WheelShader.jpg)

Sau khi giới thiệu bánh xe, chúng tôi muốn kết thúc bằng thông tin chung về sản phẩm. Trong trường hợp này, đó sẽ là tên đầy đủ của xe và có thể một số cấu hình có sẵn.

![Rear UI](/showcase-mercedes/14_RearUI.jpg)

## Kết thúc

Bằng cách sử dụng Timeline của Unity, chúng ta có thể kiểm soát thời điểm hiển thị nét đứt bánh xe và văn bản. Điều này được bổ sung bởi hoạt ảnh camera.

## Kết luận

Needle Engine có vẻ là một lựa chọn rất tốt cho chúng tôi!

Có một vài tính năng mà chúng tôi còn thiếu.

Ví dụ đó là hỗ trợ đầy đủ cho Lit Shader Graphs. Nhưng không gì ngăn cản chúng tôi tạo shaders theo cách của three.js và tạo các shaders tương tự trong Unity để đội ngũ nội dung của chúng tôi tùy chỉnh materials.

Sử dụng Needle thật tuyệt vời! 🌵

Trang được dịch tự động bằng AI