---
title: Needle Engine cho Blender
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Logo Needle"/> +
    <img src="/blender/logo.png" style="max-height:70px;" />
</div>

# Needle Engine cho Blender

Needle Engine cho Blender cho phép bạn tạo các ứng dụng web có tính tương tác cao, linh hoạt và nhẹ ngay trong Blender. Sử dụng các công cụ mạnh mẽ của Blender để trực quan thiết lập các cảnh 3D, tạo hoạt ảnh và thiết kế.

## Cài đặt Add-on Blender

<ClientOnly>

Đảm bảo bạn đã cài đặt <a target="_blank" href="https://www.blender.org/download/"><strong>Blender</strong> 4.1 hoặc 4.2</a> và <os-link windows_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi" osx_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0.pkg"><strong>node.js</strong></os-link>.
</ClientOnly>

<NoDownloadYet>
    <needle-button
        event_goal="download_blender"
        event_position="getting_started"
        large
        href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"
        same_tab
        next_url="/docs/blender/"
        >
        <strong>Tải Needle Engine cho Blender</strong>
    </needle-button>
</NoDownloadYet>

1. Trong Blender, vào `Edit > Preferences > Add-ons` và nhấp vào mũi tên thả xuống để tìm nút `Install from Disk`.

2. Chọn tệp zip đã tải xuống (tên `needle-blender-plugin-*.zip`) để cài đặt.

3. Tìm kiếm "Needle" trong thanh tìm kiếm Add-ons và đảm bảo `Needle Engine Exporter for Blender` đã được bật.

![Settings](/blender/settings.webp)

## Bắt đầu

Cảm ơn bạn đã sử dụng Needle Engine cho Blender.

Với add-on này, bạn có thể tạo các trải nghiệm WebGL và WebXR có tính tương tác cao và được tối ưu hóa ngay trong Blender, chạy bằng Needle Engine và three.js.

Bạn sẽ có thể sắp xếp trình tự hoạt ảnh, dễ dàng lightmap cảnh của mình, thêm tương tác hoặc tạo các script riêng bằng Typescript hoặc Javascript chạy trên web.

<video-embed src="/docs/blender/environment-light.mp4" />
*Đối sánh cài đặt ánh sáng và môi trường giữa Blender và Needle Engine. Ánh sáng môi trường HDRI được tự động xuất, trực tiếp từ Blender. Sau khi bạn lưu, trang sẽ tự động tải lại.*

:::tip Cung cấp phản hồi

**Phản hồi của bạn là vô giá** khi quyết định những tính năng và quy trình làm việc nào chúng tôi nên ưu tiên. Nếu bạn có phản hồi cho chúng tôi (tốt hay xấu), vui lòng [cho chúng tôi biết trên diễn đàn](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)!
:::

## Các mẫu cho Blender

- [Tải các mẫu Blender](https://engine.needle.tools/downloads/blender/download-samples?utm_source=needle_docs&utm_content=blender)

Trước tiên, tạo hoặc mở một tệp blend mới mà bạn muốn xuất ra web.
Mở cửa sổ Properties, mở danh mục scene. Chọn một `Project Path` trong bảng Needle Engine. Sau đó nhấp vào `Generate Project`. Nó sẽ tự động cài đặt và khởi động máy chủ - sau khi hoàn tất, trình duyệt của bạn sẽ mở và cảnh threejs sẽ tải.

![Project panel](/blender/project-panel.webp)

Theo mặc định, cảnh của bạn sẽ tự động được xuất lại khi bạn lưu tệp blend.
Nếu máy chủ cục bộ đang chạy (ví dụ: bằng cách nhấp vào `Run Project`), trang web sẽ tự động làm mới với mô hình đã thay đổi của bạn.

Khi dự án web của bạn đã tồn tại và bạn chỉ muốn tiếp tục làm việc trên trang web
nhấp vào nút màu xanh lam `Run Project` để khởi động máy chủ cục bộ:
![Project panel](/blender/project-panel-2.webp)

### Tổng quan về Bảng Project
![Project panel](/blender/project-panel-3.webp)

1) Đường dẫn đến dự án web của bạn. Bạn có thể sử dụng nút thư mục nhỏ bên phải để chọn đường dẫn khác.
2) Nút `Run Project` hiển thị khi đường dẫn Project trỏ đến một dự án web hợp lệ. Dự án web hợp lệ khi chứa một `package.json`
3) `Directory` mở thư mục dự án web của bạn (là `Project Path`)
4) Nút này xuất lại cảnh hiện tại dưới dạng glb vào dự án web cục bộ của bạn. Điều này cũng xảy ra theo mặc định khi lưu tệp blend của bạn.
5) `Code Editor` cố gắng mở vscode workspace trong dự án web của bạn
6) Nếu bạn làm việc với nhiều cảnh trong một tệp blend, bạn có thể cấu hình cảnh nào là cảnh Main của bạn và nên được xuất ra web. Nếu bất kỳ component nào của bạn tham chiếu đến một cảnh khác, chúng cũng sẽ được xuất dưới dạng các tệp glb riêng biệt. Khi nhấp vào nút "Export", cảnh Main của bạn sẽ là cảnh được tải trong trình duyệt.
7) Sử dụng các nút `Build: Development` hoặc `Build: Production` khi bạn muốn tải dự án web của mình lên máy chủ. Điều này sẽ đóng gói dự án web của bạn và tạo ra các tệp mà bạn có thể tải lên. Khi nhấp vào `Build: Production`, nó cũng sẽ áp dụng tối ưu hóa cho texture của bạn (chúng sẽ được nén cho web)
8) Mở tài liệu

## Cài đặt Blender

### Quản lý Màu sắc

Theo mặc định, viewport của blender được đặt thành `Filmic` - với cài đặt này, màu sắc trong Blender và trong three.js sẽ không khớp.
Để khắc phục điều này, hãy vào danh mục Blender Render và trong bảng ColorManagement chọn `View Transform`: `Standard`

![Correct color management settings](/blender/settings-color-management.webp)

## Ánh sáng Môi trường

Bạn có thể thay đổi ánh sáng môi trường và skybox bằng cách sử dụng các tùy chọn Viewport shading.
Gán một cubemap để sử dụng cho ánh sáng hoặc skybox nền. Bạn có thể điều chỉnh cường độ hoặc độ mờ để sửa đổi hình thức theo ý thích.

Lưu ý: Để thấy cubemap skybox trong trình duyệt, hãy tăng `World Opacity` lên 1.

Lưu ý: Ngoài ra, bạn có thể bật cài đặt `Scene World` trong tab Viewport Shading để sử dụng texture môi trường được gán trong cài đặt world của blender.

![Environment](/blender/environment.webp)

<video-embed limit_height max_height="300px" src="/docs/blender/environment.mp4" />

Ngoài ra, nếu bạn không muốn thấy cubemap làm nền, hãy thêm một Camera component vào Blender Camera của bạn và thay đổi `clearFlags: SolidColor` - lưu ý rằng cài đặt `backgroundBlurriness` và `backgroundIntensity` của Camera sẽ ghi đè các cài đặt Viewport shading.

![Environment Camera](/blender/environment-camera.webp)

### Thêm ánh sáng môi trường HDRI / EXR và skybox tùy chỉnh của bạn

<video-embed limit_height src="/docs/blender/custom_hdri.mp4" />

## Xuất

Để loại trừ một đối tượng khỏi việc xuất, bạn có thể tắt hiển thị Viewport và Render (xem hình bên dưới)

![Exclude from export](/blender/dont-export.webp)

## Hoạt ảnh 🏇

Đối với các trường hợp sử dụng đơn giản, bạn có thể sử dụng Animation component để phát lại một hoặc nhiều animationclips.
Chỉ cần chọn đối tượng của bạn, thêm một Animation component và gán clip (bạn có thể thêm các clip khác để xuất vào mảng clips.
Theo mặc định, nó sẽ chỉ phát lại clip đầu tiên được gán khi `playAutomatically` được bật. Bạn có thể kích hoạt các clip khác bằng cách sử dụng một custom typescript component đơn giản)
<video-embed limit_height src="/docs/blender/animation.mp4" />

### AnimatorController

Animator controller có thể được tạo cho các kịch bản phức tạp hơn. Nó hoạt động như một statemachine cho phép bạn tạo nhiều trạng thái hoạt ảnh trong biểu đồ và cấu hình các điều kiện và cài đặt nội suy để chuyển đổi giữa chúng.

<video-embed src="/docs/blender/animatorcontroller-web.mp4" />
*Tạo và xuất [animator statemachines](#animatorcontroller) để điều khiển các hoạt ảnh nhân vật phức tạp*

#### Tạo một AnimatorController

Trình chỉnh sửa AnimatorController có thể được mở bằng cách sử dụng dropdown EditorType ở góc trên bên trái của mỗi panel:

![AnimatorController open window](/blender/animatorcontroller-open.webp)

<video-embed limit_height max_height="188px" src="/docs/blender/animatorcontroller-create.mp4" />
*Tạo một asset animator-controller mới ☝ hoặc chọn một asset từ những asset đã tạo trước đó của bạn*

##### Tổng quan biểu đồ
![AnimatorController overview](/blender/animatorcontroller-overview.webp)
1) Sử dụng `Shift+A` để tạo một AnimatorState mới
2) Node `Parameters` sẽ được tạo sau khi bạn thêm node đầu tiên. Chọn nó để thiết lập các thông số sẽ được sử dụng trong Transitions (qua panel Node ở biên phải)
3) Đây là một AnimatorState. Trạng thái màu cam là trạng thái bắt đầu (có thể thay đổi bằng cách sử dụng nút `Set default state` trong panel Node/Properties)
4) Các thuộc tính cho một AnimatorState có thể được sử dụng để thiết lập một hoặc nhiều Transitions đến các trạng thái khác. Sử dụng mảng `Conditions` để chọn các thông số phải khớp điều kiện để thực hiện Transition.

#### Sử dụng một AnimatorController

Để sử dụng một AnimatorController, thêm một Animator component vào đối tượng gốc của các hoạt ảnh của bạn và chọn asset AnimatorController mà bạn muốn sử dụng cho đối tượng này.

![AnimatorController assign to animator](/blender/animatorcontroller-assigning.webp)

Bạn có thể thiết lập các thông số Animator từ typescript hoặc ví dụ bằng cách sử dụng sự kiện của một Button component

### Timeline — Xuất NLA Tracks 🎬

Bạn có thể xuất NLA tracks của Blender trực tiếp ra web.
Thêm một PlayableDirector component (qua `Add Component`) vào bất kỳ đối tượng blender nào. Gán các đối tượng trong danh sách ``animation tracks`` trong component mà bạn muốn xuất NLA tracks của chúng.

![](/blender/timeline_setup.webp)
![](/blender/timeline.webp)

::: details Ví dụ code để phát lại timeline tương tác
Thêm script này vào `src/scripts` (xem phần custom components) và thêm nó vào bất kỳ đối tượng nào trong Blender để thời gian của một timeline được kiểm soát bằng cách cuộn trong trình duyệt

```ts twoslash
import { Behaviour, PlayableDirector, serializable, Mathf } from "@needle-tools/engine";

export class ScrollTimeline extends Behaviour {

    @serializable(PlayableDirector)
    timeline?: PlayableDirector;

    @serializable()
    sensitivity: number = .5;

    @serializable()
    clamp: boolean = false;

    private _targetTime: number = 0;

    awake() {
        this.context.domElement.addEventListener("wheel", this.onWheel);
        if (this.timeline) this.timeline.pause();
    }

    private onWheel = (e: WheelEvent) => {
        if (this.timeline) {
            this._targetTime = this.timeline.time + e.deltaY * 0.01 * this.sensitivity;
            if (this.clamp) this._targetTime = Mathf.clamp(this._targetTime, 0, this.timeline.duration);
        }
    }

    update(): void {
        if (!this.timeline) return;
        const time = Mathf.lerp(this.timeline.time, this._targetTime, this.context.time.deltaTime / .3);
        this.timeline.time = time;
        this.timeline.pause();
        this.timeline.evaluate();
    }
}
```
:::

## Tương tác 😎

Bạn có thể thêm hoặc xóa components cho các đối tượng trong hệ thống phân cấp của mình bằng cách sử dụng bảng Needle Components:

![Component panel](/blender/components-panel.webp)

![Component panel](/blender/components-panel-select.webp)
*Ví dụ: bằng cách thêm một component `OrbitControls` vào đối tượng camera*
*bạn sẽ có các điều khiển camera cơ bản cho thiết bị di động và máy tính để bàn*
*Điều chỉnh cài đặt cho mỗi component trong các bảng tương ứng*

Các component có thể được xóa bằng nút X ở góc dưới bên phải:

![Remove component](/blender/remove-component.webp)

### Custom Components
Custom components cũng có thể được thêm vào dễ dàng chỉ bằng cách viết các lớp Typescript. Chúng sẽ tự động biên dịch và hiển thị trong Blender khi được lưu.

Để tạo custom components, mở workspace qua bảng Needle Project và thêm một tệp script `.ts` vào `src/scripts` bên trong dự án web của bạn. Vui lòng tham khảo [tài liệu scripting](http://docs.needle.tools/scripting) để tìm hiểu cách viết custom components cho Needle Engine.

::: warning Lưu ý
Đảm bảo ``@needle-tools/needle-component-compiler`` phiên bản 2.x đã được cài đặt trong dự án web của bạn (package.json devDependencies)
:::

## Lightmapping 💡

Needle bao gồm một plugin lightmapping giúp việc bake ánh sáng đẹp vào texture và đưa chúng lên web rất dễ dàng. Plugin sẽ tự động tạo lightmap UV cho tất cả các mô hình được đánh dấu để lightmap, không cần tạo manual texture atlas. Nó cũng hỗ trợ lightmap cho nhiều instance với dữ liệu lightmap riêng của chúng.
Để lightmap hoạt động, bạn cần ít nhất một light và một đối tượng với `Lightmapped` được bật trong bảng `Needle Object`.

<video-embed limit_height max_height="800px" src="/docs/blender/lightmapping.mp4" />

::: tip
Bạn có thể tải tệp .blend từ video [tại đây](https://engine.needle.tools/downloads/blender/lightmaps.blend).
:::
Sử dụng bảng Needle Object để bật lightmap cho một đối tượng mesh hoặc light:

![Lightmapping object](/blender/lightmapping-object.webp)

Để truy cập nhanh vào cài đặt lightmap và tùy chọn baking, bạn có thể sử dụng bảng scene view trong tab `Needle`:

![Lightmapping scene panel](/blender/lightmapping-scene-panel.webp)

Ngoài ra, bạn cũng có thể sử dụng bảng Lightmapping trong tab `Render Properties`:

![Lightmapping object](/blender/lightmapping-panel.webp)

::: warning Tính năng thử nghiệm
Plugin lightmapping là thử nghiệm. Chúng tôi khuyên bạn nên tạo bản sao lưu tệp .blend của mình khi sử dụng nó. Vui lòng báo cáo các vấn đề hoặc lỗi bạn gặp phải trong [diễn đàn của chúng tôi](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) 🙏
:::

## Nén Texture

Needle Engine Build Pipeline tự động nén texture bằng ECT1S và UASTC (tùy thuộc vào cách sử dụng của chúng trong material) khi tạo một production build (**yêu cầu [toktx](../getting-started/index.md#install-these-tools-for-production-builds) được cài đặt**). Nhưng bạn có thể ghi đè hoặc thay đổi loại nén trên mỗi texture trong bảng Material.

Bạn có thể sửa đổi cách nén được áp dụng cho mỗi texture. Để ghi đè cài đặt nén mặc định, vào tab `Material` và mở `Needle Material Settings`. Ở đó bạn sẽ tìm thấy một nút gạt để ghi đè cài đặt texture cho mỗi texture được sử dụng trong material của bạn. Xem [bảng nén texture](../deployment.md#how-do-i-choose-between-etc1s-uastc-and-webp-compression) để có cái nhìn tổng quan ngắn gọn về sự khác biệt giữa mỗi thuật toán nén.

![Texture Compression options in Blender](/blender/texture-compression.webp)

## Cập nhật

Biểu tượng bóng đèn trong bảng Needle Project thông báo cho bạn khi có phiên bản mới của addon khả dụng.
Chỉ cần nhấp vào biểu tượng để tải xuống phiên bản mới.
![Update notification](/blender/updates.webp)

## Báo cáo sự cố

Nếu bạn gặp bất kỳ vấn đề nào, chúng tôi rất sẵn lòng trợ giúp! Vui lòng tham gia [diễn đàn của chúng tôi](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) để được hỗ trợ nhanh chóng.

Vui lòng kiểm tra nhật ký trong Blender. Bạn có thể tìm nhật ký cụ thể cho Needle Engine Addon qua `Help/Needle` trong Blender.

### Tích hợp Bug Reporter
![Needle Blender Bug Reporter panel](/blender/bugreporter.webp)
Bạn cũng có thể tự động tạo và tải lên một bugreport trực tiếp từ Blender. Các bugreport được tải lên sẽ chỉ được sử dụng cho mục đích gỡ lỗi. Chúng được mã hóa trên backend của chúng tôi và sẽ bị xóa sau 30 ngày.

Nếu cần, trong một số trường hợp nhất định, chúng tôi cũng có thể thiết lập NDAs tùy chỉnh cho dự án của bạn. Vui lòng liên hệ với chúng tôi để biết thêm thông tin.

:::tip Sử dụng Bug Reporter yêu cầu một dự án web
Đảm bảo bạn đã thiết lập một dự án web trước khi gửi báo cáo lỗi – điều này sẽ giúp chúng tôi hiểu rõ hơn về hệ thống và thiết lập của bạn, giúp tái hiện sự cố dễ dàng hơn.
:::

# Các bước tiếp theo

- [Khái niệm: Dự án Web](../project-structure.md)
- [Khái niệm: Xuất Asset](../export.md)
- [Khái niệm: Triển khai (Chia sẻ trang web của bạn)](../deployment.md)
- [Components: Tìm hiểu về Everywhere Actions](../everywhere-actions.md)
- [Scripting cho người mới bắt đầu: Các yếu tố cần thiết của Typescript](../getting-started/typescript-essentials.md)
- [Scripting cho người mới bắt đầu: Cách viết custom components](../scripting.md)


Trang được dịch tự động bằng AI