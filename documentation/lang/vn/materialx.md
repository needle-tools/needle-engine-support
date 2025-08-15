---
title: MaterialX
---

## MaterialX trong Needle Engine

MaterialX là một tiêu chuẩn mạnh mẽ để mô tả vật liệu và shader theo cách dựa trên đồ thị, không phụ thuộc vào công cụ kết xuất. Nó cho phép bạn xác định các vật liệu phức tạp, với nhiều lớp bề mặt và ánh sáng chân thực.

Nó được sử dụng rộng rãi trong phim ảnh, VFX và thương mại điện tử, và được hỗ trợ bởi nhiều công cụ sáng tạo chuyên nghiệp như Autodesk Maya và 3ds Max, Houdini, V-Ray, và Omniverse.

::: tip Tìm hiểu thêm
Bạn có thể tìm hiểu thêm về MaterialX trên [trang web MaterialX](https://www.materialx.org/).
:::

Các vật liệu được tạo bằng [**Shader Graph**](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.3/manual/index.html) của Unity có thể được xuất sang tệp MaterialX một cách tự động thông qua **Needle MaterialX Exporter**, đây là một phần của gói tích hợp Unity của chúng tôi.

Điều này cho phép bạn tạo các vật liệu phức tạp, có ánh sáng trong Unity, và chúng tự động được xuất cùng với cảnh của bạn. Tính năng xuất MaterialX mở rộng tính năng xuất shader Unlit hiện có của chúng tôi, vốn ít di động hơn do sử dụng shader WebGL2. Với MaterialX, bạn đã sẵn sàng cho WebGPU và các công nghệ kết xuất trong tương lai, và có thể đạt được vật liệu có độ trung thực cao trong các dự án web của mình.

Hỗ trợ MaterialX trong Needle Engine sử dụng [thư viện JavaScript MaterialX](https://github.com/materialx/MaterialX) chính thức, điều này có nghĩa là các vật liệu được biểu diễn với độ trung thực cao nhất có thể. Điều này cho phép bạn sử dụng bất kỳ tệp MaterialX nào.

::: info Shader Graph sang MaterialX yêu cầu gói **Pro**, **Edu** hoặc **Enterprise**.
MaterialX Exporter có sẵn cho người dùng các gói Pro, Edu và Enterprise.
[Xem các gói và giá cả.](https://needle.tools/pricing)
:::

## Các trường hợp sử dụng

MaterialX là một lựa chọn tuyệt vời nếu bạn
- đang sử dụng **vật liệu dựa trên đồ thị** cho các dự án của bạn để kiểm soát nghệ thuật và linh hoạt.
- cần **các tính năng bề mặt phong phú và phức tạp** như kết cấu thủ tục, bản đồ chi tiết hoặc vật liệu phân lớp.
- có **vật liệu MaterialX hiện có** mà bạn muốn giữ xuyên suốt quy trình sản xuất của studio.
- muốn đảm bảo **tính nhất quán và tương thích** cho các kết xuất của bạn trên các công cụ kết xuất khác nhau.

## Bật hỗ trợ MaterialX trong dự án của bạn

Để bật hỗ trợ MaterialX trong dự án Needle Engine của bạn, bạn cần thêm gói `@needle-tools/materialx` vào dự án của mình.

::: tabs

@tab Unity

1. Chọn thành phần Needle Engine trong cảnh của bạn.

2. Tìm phần "NpmDef Dependencies" trong Inspector, và thêm một phụ thuộc mới bằng cách tăng số "Size" (ví dụ từ 0 lên 1).

3. Nhấp vào biểu tượng Bộ chọn đối tượng (Object Picker), bật Hiển thị Gói (Package Visibility) bằng biểu tượng con mắt, và chọn gói `Needle MaterialX` từ danh sách.

   ![Tìm và thêm phụ thuộc gói MaterialX trong Unity.](/materialx/add-materialx-package-dependency.jpeg)
   _Tìm và thêm phụ thuộc gói MaterialX trong Unity._

Bây giờ bạn đã sẵn sàng sử dụng MaterialX trong dự án web của mình.

@tab Các tích hợp Needle khác

1. Tìm và mở dự án web của bạn trong trình chỉnh sửa mã (ví dụ: VS Code).
   [Tìm hiểu cách mở dự án web của bạn.](./project-structure.html#opening-the-web-project-in-a-code-editor)
2. Cài đặt gói Needle MaterialX từ kho lưu trữ NPM trong dự án web của bạn.

   ```bash
   npm install @needle-tools/materialx
   ```

   Thao tác này sẽ thêm gói MaterialX vào dự án của bạn.

3. Nếu bạn đang sử dụng bất kỳ mẫu nào dựa trên Vite của chúng tôi, bạn không cần làm gì thêm. Gói MaterialX sẽ tự động được bao gồm trong dự án của bạn.

    ::: tip Nếu bạn không chắc chắn, có lẽ bạn đang sử dụng một trong các mẫu dựa trên Vite của chúng tôi!
    :::

4. Nếu bạn không sử dụng các plugin Needle Vite, hãy nhập và đăng ký MaterialX trong tệp đầu vào chính của bạn, ví dụ trong `main.ts`:

   ```ts
   import { useNeedleMaterialX } from "@needle-tools/materialx";
   useNeedleMaterialX();
   ```

Bây giờ bạn đã sẵn sàng sử dụng MaterialX trong dự án web của mình.

@tab three.js

Bạn có thể sử dụng gói MaterialX của chúng tôi trong bất kỳ dự án three.js nào, ngay cả khi bạn không sử dụng Needle Engine.

1. Đăng ký plugin `MaterialX` của chúng tôi với `GLTFLoader` của bạn:

    ```ts
    import { useNeedleMaterialX } from "@needle-tools/materialx";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

    const gltfLoader = new GLTFLoader();

    // ... đăng ký các plugin khác như DRACOLoader, KTX2Loader, v.v.
    useNeedleMaterialX(gltfLoader);

    // ... tải một tệp chứa vật liệu MaterialX
    gltfLoader.load("https://cloud.needle.tools/-/assets/Z23hmXB2qfHiF-2qfHiF/file", (gltf) => {
        scene.add(gltf.scene);
    });
    ```

2. Tải các tệp GLB chứa tiện ích mở rộng `NEEDLE_materials_mtlx`. Plugin sẽ tự động tải và áp dụng các vật liệu MaterialX cho các đối tượng đang sử dụng chúng.

3. Bạn có thể bật tính năng tải trước mô-đun MaterialX WebAssembly bằng cách gọi `useNeedleMaterialX(gltfLoader, { preload: true })`. Thao tác này sẽ tải mô-đun MaterialX WebAssembly trước, để nó sẵn sàng khi bạn tải một tệp GLB chứa vật liệu MaterialX.

Bạn có thể tìm thấy một ví dụ đầy đủ về cách sử dụng MaterialX trong một dự án three.js trên StackBlitz: [MaterialX trong three.js](https://stackblitz.com/edit/needle-materialx-example?file=main.js).

:::
## Xuất vật liệu với hỗ trợ MaterialX

1. Tạo vật liệu bằng Shader Graph của Unity.

   ![Ví dụ về một Shader Graph phức tạp trong Unity.](/materialx/shadergraph-example.webp)
   _Ví dụ về một Shader Graph phức tạp trong Unity._

2. Chọn một đối tượng có vật liệu dựa trên Shader Graph trong cảnh của bạn, hoặc chọn tài sản shader trong Project View.

3. Trong thuộc tính Vật liệu, tìm phần "Needle Engine – Custom Shader Settings", và chọn "MaterialX" làm Loại Xuất Shader.

    ![Bật loại xuất MaterialX trong thuộc tính vật liệu Shader Graph.](/materialx/enable-asset-label-from-material.jpeg)
    _Bật loại xuất MaterialX trong thuộc tính vật liệu Shader Graph._

3. Khi bạn xuất cảnh của mình, tất cả các vật liệu sử dụng shader với loại xuất "MaterialX" sẽ được nhúng cùng với nội dung 3D của bạn và được tải trong thời gian chạy.

## Sử dụng tệp MaterialX được tạo bên ngoài

Gói Needle MaterialX chứa hỗ trợ thử nghiệm để tải trực tiếp các tệp MaterialX. Các kết cấu có thể được phân giải thông qua một hàm callback, và các vật liệu được trả về dưới dạng `ShaderMaterial` của three.js.

Bạn có thể tìm thấy các ví dụ về cách làm việc với gói Needle MaterialX [trong bộ sưu tập MaterialX của chúng tôi trên StackBlitz](
https://stackblitz.com/@marwie/collections/materialx).

:::: tabs
@tab Từ mã

```ts
import { TextureLoader } from 'three';
import { Experimental_API } from '@needle-tools/materialx';

// Tải một tệp MaterialX và các kết cấu được tham chiếu của nó từ một URL
function load(mtlx_url) {
    const parts = mtlx_url.split('/');
    parts.pop();
    const dir = parts.join('/');

    return fetch(mtlx_url)
    .then((res) => res.text())
    .then((mtlx) => {
        const loader = new TextureLoader();
        Experimental_API.createMaterialXMaterial(mtlx, '', {
            getTexture: async (url) => {
                return await loader.loadAsync(dir + url);
            },
        }).then((mat) => {
            console.log("Vật liệu MaterialX đã được tải:", mat);
        });
    });
}
```

::: info
Phương thức `Experimental_API.createMaterialXMaterial()` hiện tại không hỗ trợ tải nhiều vật liệu, hoặc các tệp MaterialX có tham chiếu .mtlx bổ sung.
:::

::::

## Các Nút và Tính năng Được Hỗ trợ

Needle Engine hỗ trợ đầy đủ đặc tả MaterialX, bao gồm các nút OpenPBR, Standard Surface, UsdPreviewSurface và Unlit Surface, và bao gồm các nút NPR (kết xuất phi ảnh thực) như hiệu ứng fresnel. Các định nghĩa nodegraph lồng nhau và các nút tùy chỉnh cũng được hỗ trợ.

Các vật liệu MaterialX trong Needle Engine hỗ trợ các tính năng sau:
- **Chiếu sáng dựa trên hình ảnh** (IBL) tự động từ bản đồ môi trường của cảnh
- **Reflection Probes** ảnh hưởng đến các đối tượng sử dụng vật liệu MaterialX
- **Nguồn sáng**: Đèn định hướng, điểm và đèn rọi, với giới hạn hiện tại là 8 đèn mỗi cảnh
- **Nén kết cấu và kết cấu tiến bộ**. Các vật liệu MaterialX hỗ trợ đầy đủ các tính năng nén kết cấu và tải tiến bộ mạnh mẽ của Needle Engine, cho phép bạn sử dụng các kết cấu lớn. Chúng sẽ chỉ được tải khi cần, và chỉ ở độ phân giải cần thiết cho chế độ xem hiện tại.
- **Thuộc tính vật liệu hoạt hình** cho màu sắc, số thập phân (floats), vector. Tương tự như các vật liệu khác trong Needle Engine, bất kỳ thuộc tính vật liệu số nào cũng có thể được hoạt hình.
- Tất cả các mô hình bề mặt MaterialX, bao gồm **OpenPBR**, **Standard Surface**, **UsdPreviewSurface**, và **Unlit Surface**.

Needle MaterialX Exporter tận dụng cấu trúc dựa trên đồ thị của Shader Graph của Unity để xuất, và chuyển đổi các nút Shader Graph thành nodedefs và nodegraphs của MaterialX. Nó có hỗ trợ cho các tính năng sau:
- **Thuộc tính vật liệu** như màu sắc, số thập phân (floats), vector, kết cấu
- **Các phép toán** trên số, vector và ma trận
- **Nút hòa trộn** như Mix, Add, Multiply và Blend với nhiều chế độ hòa trộn khác nhau
- **Kết cấu** và không gian màu
- **Đồ thị con** với một hoặc nhiều cấp độ lồng nhau
- **Màu đỉnh** được hỗ trợ
- **Nhiều kênh UV** được hỗ trợ (tối đa 4)
- **Shader Keywords** được hỗ trợ và sẽ được xuất dưới dạng các nút chuyển đổi trong MaterialX.

## Phiên bản MaterialX được hỗ trợ

Needle Engine hiện hỗ trợ MaterialX phiên bản 1.39.4. Các tài liệu MaterialX với các phiên bản cũ hơn cũng được hỗ trợ và sẽ tự động được nâng cấp lên phiên bản mới nhất.

## Các hạn chế của MaterialX Exporter

Không phải tất cả các tính năng mà Shader Graph hỗ trợ đều được MaterialX hỗ trợ. Nếu bạn cố gắng xuất một nút không được hỗ trợ, công cụ xuất sẽ ghi lại lỗi và dừng quá trình xuất. Sau đó, bạn có thể khắc phục sự cố bằng cách thay thế nút không được hỗ trợ bằng một nút được hỗ trợ, nếu có thể.

- **Vertex displacement chưa được hỗ trợ**: MaterialX hỗ trợ ánh xạ displacement, nhưng Needle Engine hiện không hỗ trợ. Điều này có nghĩa là bất kỳ nút displacement nào trong tệp MaterialX của bạn sẽ bị bỏ qua.
- **Bóng đổ thời gian thực**: Các nguồn sáng trong cảnh của bạn sẽ ảnh hưởng đến vật liệu MaterialX, nhưng bóng đổ thời gian thực hiện chưa được hỗ trợ.
- **Bản đồ ánh sáng được nướng (Baked Lightmaps)**: Bản đồ ánh sáng được nướng hiện không được hỗ trợ trong vật liệu MaterialX.
- **Tangent space** hiện chưa được hỗ trợ, điều này có nghĩa là các nút Shader Graph chỉ định "Tangent" làm không gian sẽ trông khác.
- **Code Nodes** hiện chưa được hỗ trợ.

::: tip Từ khóa shader đặc biệt "MATERIALX"
Nếu bạn có các shader phức tạp với các nút không được hỗ trợ, bạn có thể sử dụng từ khóa "MATERIALX" để ngăn không cho chúng được xuất. Đường dẫn "On" của các công tắc từ khóa sẽ được xuất, và đường dẫn "Off" sẽ bị bỏ qua để xuất. Bạn có thể sử dụng điều này để giữ cho các shader có nút tùy chỉnh hoặc các tính năng không được hỗ trợ vẫn hoạt động, nhưng vẫn xuất chúng sang MaterialX.
:::

::: info Hỗ trợ MaterialX tích hợp trong three.js
Mặc dù three.js có một số hỗ trợ ban đầu cho MaterialX, nhưng nó đang sử dụng một triển khai tùy chỉnh không hỗ trợ nhiều tính năng của tiêu chuẩn, dẫn đến độ chính xác thấp hơn trong biểu diễn vật liệu. Needle Engine sử dụng thư viện JavaScript MaterialX chính thức, điều này có nghĩa là các vật liệu được biểu diễn với độ trung thực cao nhất có thể.

Needle đang đóng góp vào hỗ trợ MaterialX tích hợp của three.js, để đến một thời điểm nào đó chúng tôi có thể cung cấp cả hai tùy chọn hoặc chuyển sang triển khai của three.js khi nó toàn diện hơn.
:::

Trang được dịch tự động bằng AI