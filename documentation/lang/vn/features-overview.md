# Tổng quan tính năng

Needle Engine là một công cụ 3D đầy đủ tính năng chạy trong trình duyệt. Nó đi kèm với tất cả các tính năng mà bạn mong đợi từ một công cụ 3D hiện đại, và nhiều hơn nữa. Nếu bạn chưa xem, hãy truy cập [Trang chủ](https://needle.tools) và [Mẫu và Trưng bày](https://engine.needle.tools/samples) của chúng tôi.

[[toc]]

## Shaders và Materials

Cả PBR Materials và Custom shaders được tạo bằng Shader Graph hoặc các hệ thống khác đều có thể xuất.

<img src="https://user-images.githubusercontent.com/5083203/186012027-9bbe3944-fa56-41fa-bfbb-c989fa87aebb.png" />

Sử dụng [ShaderGraph](https://unity.com/features/shader-graph) dựa trên node để tạo shader cho web. ShaderGraph giúp các nghệ sĩ dễ dàng tiếp tục sáng tạo mà không phải lo lắng về cú pháp.

Đọc thêm về [PBR Materials](./export.md#physically-based-materials-pbr) • [Custom Shaders](./export.md#custom-shaders)

## Đa nền tảng: VR, AR, Mobile, Desktop
Needle Engine chạy ở mọi nơi công nghệ web hoạt động: chạy cùng một ứng dụng trên desktop, mobile, AR hoặc VR. Chúng tôi xây dựng Needle Engine [với XR trong tâm trí](./xr.md) và coi đây là một phần không thể thiếu của thiết kế web đáp ứng!

Sử dụng [Everywhere Actions](./everywhere-actions.md) cho **Interactive AR trên cả Android và iOS**.


## Lightmaps

![lightmaps](https://user-images.githubusercontent.com/5083203/186163693-093c7ae2-96eb-4d75-b98f-bf19f78032ff.gif)

Lightmaps có thể được bake trong Unity hoặc Blender để dễ dàng thêm ánh sáng tĩnh đẹp mắt vào nội dung 3d của bạn. Lightbaking cho web chưa bao giờ dễ dàng đến thế. Chỉ cần đánh dấu các đối tượng bạn muốn lightmap là static trong Unity, thêm một hoặc nhiều đèn vào cảnh của bạn (hoặc sử dụng emissive materials) và nhấn bake. Needle Engine sẽ xuất lightmaps của bạn theo từng cảnh và tự động tải và hiển thị chúng giống như bạn thấy trong Editor!

> **Lưu ý**: Không có giới hạn kỹ thuật về lightmapper nào được sử dụng, miễn là chúng kết thúc trong cấu trúc dữ liệu lightmapping của Unity. Do đó, các lightmapper bên thứ ba như [Bakery](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218) cũng được hỗ trợ.

- Đọc thêm về [Xuất Lightmaps](https://fwd.needle.tools/needle-engine/docs/lightmaps)

## Multiplayer và Networking
Networking được tích hợp vào runtime lõi. Các triển khai Needle Engine tới Glitch đi kèm với một máy chủ nhỏ cho phép bạn triển khai môi trường 3D multiplayer trong vài giây. Các networked components tích hợp sẵn giúp dễ dàng bắt đầu và bạn có thể tạo các synchronized components của riêng mình. Đồng bộ hóa biến và trạng thái cực kỳ dễ dàng!

- Đọc thêm về [Networking](https://fwd.needle.tools/needle-engine/docs/networking) • [Scripting](https://fwd.needle.tools/needle-engine/docs/scripting)

## Animations và Sequencing
Needle Engine mang đến các animations mạnh mẽ, kiểm soát trạng thái và sequencing cho web — từ việc chỉ phát một animation đơn giản đến điều phối và hòa trộn các animation và character controllers phức tạp. Exporter có thể dịch các Unity components như Animator và Timeline sang định dạng sẵn sàng cho web. Chúng tôi thậm chí còn thêm chức năng này vào Blender addon để bạn có thể tạo các animation state machines tương thích và xuất nla tracks dưới dạng timelines lên web ngay từ Blender.

- Đọc thêm về [Animation Components](./component-reference.md#animation)

### Animator

<img src="https://user-images.githubusercontent.com/5083203/186011302-176524b3-e8e5-4e6e-9b77-7faf3561bb15.png" />

Các [Animator và AnimatorController](https://docs.unity3d.com/Manual/class-AnimatorController.html) components trong Unity cho phép bạn thiết lập animations và xác định điều kiện khi nào và làm thế nào để blend giữa chúng. Chúng tôi hỗ trợ xuất state machines, StateMachineBehaviours, transitions và layers. StateMachineBehaviours cũng được hỗ trợ với các sự kiện ``OnStateEnter``, ``OnStateUpdate`` và ``OnStateExit``.

> **Lưu ý**: Sub-states và Blend Trees không được hỗ trợ.

### Timeline

![2022-08-23-013517_Scene](https://user-images.githubusercontent.com/5083203/186037829-ee99340d-b19c-484d-b551-94797519c9d9.png)

Chúng tôi cũng đang dịch thiết lập và tracks của [Unity's Timeline](https://unity.com/features/timeline) sang định dạng sẵn sàng cho web.
Các tracks được hỗ trợ bao gồm: AnimationTrack, AudioTrack, ActivationTrack, ControlTrack, SignalTrack.

> **Lưu ý**: Sub-Timelines hiện chưa được hỗ trợ.

> **Lưu ý**: Có thể [xuất các custom timeline tracks](https://github.com/needle-tools/needle-engine-modules/tree/main/package/TimelineHtml).

- Đọc thêm về [Animation Components](./component-reference.md#animation)

## Physics
Sử dụng Rigidbodies, Mesh Colliders, Box Colliders và SphereColliders để thêm physics vào thế giới của bạn.

- Đọc thêm về [Physics Components](./component-reference.md#physics)

<sample src="https://engine.needle.tools/samples-uploads/physics-animation/" />

## UI
Xây dựng UI bằng hệ thống UI canvas của Unity đang được phát triển. Các tính năng hiện tại bao gồm xuất Text (bao gồm cả font), Images, Buttons.

Xem [tài liệu tham khảo ui component](component-reference.md#ui) để biết các component được hỗ trợ.

<sample src="https://engine.needle.tools/samples-uploads/screenspace-ui" />

## Particles
Xuất Unity ParticleSystem (Shuriken) đang được phát triển. Các tính năng hiện tại bao gồm mô phỏng world/local space, hình dạng box và sphere emitter, emission over time cũng như burst emission, velocity- và color over time, emission by velocity, texturesheet animation, basic trails.
Xem [ví dụ trực tiếp](https://engine.needle.tools/samples/particles) về các tính năng được hỗ trợ bên dưới:

<sample src="https://engine.needle.tools/samples-uploads/particles/" />

## PostProcessing

Các hiệu ứng tích hợp bao gồm Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction. Bạn cũng có thể tạo các custom effects của riêng mình. Xem [tài liệu tham khảo component](./component-reference.md#postprocessing) để biết danh sách đầy đủ.

<sample src="https://engine.needle.tools/samples-uploads/postprocessing/" />

## Tích hợp Editor
Needle Engine đi kèm với các tích hợp mạnh mẽ vào Unity Editor và Blender. Nó cho phép bạn thiết lập và xuất các cảnh phức tạp một cách trực quan, cung cấp sự cộng tác dễ dàng và linh hoạt giữa các nghệ sĩ và nhà phát triển.

## Scripting
Needle Engine sử dụng [workflow dựa trên component](scripting.md#component-architecture). Tạo các custom scripts bằng typescript hoặc javascript. Sử dụng [modular npm-based package workflow](https://fwd.needle.tools/needle-engine/docs/npmdef) tích hợp vào Unity của chúng tôi. Một [typescript to C# component compiler](https://fwd.needle.tools/needle-engine/docs/component-compiler) tạo ra các Unity components một cách kỳ diệu ngay lập tức.

- Đọc thêm về [Scripting Reference](scripting) • [Npm Definition Files](https://fwd.needle.tools/needle-engine/docs/npmdef)


## Và còn nhiều hơn nữa

- PostProcessing → Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction...
- EditorSync → Đồng bộ hóa trực tiếp việc chỉnh sửa trong Unity với ứng dụng three.js đang chạy để phát triển cục bộ
- Interactive AR trên iOS và Android → Sử dụng bộ tính năng [Everywhere Actions](./everywhere-actions.md) của chúng tôi hoặc tự xây dựng

---
# Tiếp theo nên làm gì

Xem [Hướng dẫn Bắt đầu](getting-started/) của chúng tôi để tìm hiểu cách tải xuống và thiết lập Needle Engine.
Tìm hiểu về [tầm nhìn của chúng tôi](vision) hoặc đi sâu hơn vào [nền tảng kỹ thuật và glTF](technical-overview) cung cấp năng lượng cho tất cả.


Trang được dịch tự động bằng AI