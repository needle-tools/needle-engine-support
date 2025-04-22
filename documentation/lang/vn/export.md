---
title: Exporting Assets to glTF
---

# Xuất Tài sản, Hoạt ảnh, Prefab, Vật liệu, Lightmap...
Thêm một component ``ExportInfo`` vào scene Unity của bạn để tạo một web project mới từ một template, liên kết đến một web project hiện có mà bạn muốn xuất tới, thiết lập các dependencies đến các thư viện và package khác, và để triển khai project của bạn.

Theo mặc định, scene của bạn sẽ được xuất khi lưu. Cài đặt này có thể thay đổi bằng cách tắt ``Auto Export`` trong component ``ExportInfo``.

## 📦 Xuất file glTF
Để xuất meshes, materials, animations, textures (...) tạo một GameObject mới trong hierarchy của bạn và thêm một component ``GltfObject`` vào đó. Đây là gốc của một file glTF mới. Nó sẽ được xuất bất cứ khi nào bạn thực hiện thay đổi trong scene và lưu lại.

Chỉ các script và dữ liệu trên và bên trong các đối tượng gốc này mới được xuất. Script và dữ liệu bên ngoài chúng sẽ không được xuất.

Thêm một cube làm con của đối tượng gốc của bạn và lưu scene. Lưu ý rằng thư mục ``assets/`` đầu ra (xem [project structure](#vite-project-structure)) hiện chứa một file ``.glb`` mới cùng tên với GameObject gốc của bạn.

Bạn có thể bật cài đặt ``Smart Export`` (qua `Edit/Project Settings/Needle`) để chỉ xuất khi phát hiện có thay đổi trong hierarchy của đối tượng này.

:::details Cách ngăn các đối tượng cụ thể không bị xuất
Các đối tượng có tag `EditorOnly` sẽ bị bỏ qua khi xuất, bao gồm cả hierarchy con của chúng.
Lưu ý rằng điều này được ưu tiên hơn việc tắt các đối tượng vì các đối tượng bị tắt vẫn sẽ được xuất trong trường hợp chúng được bật lại sau này.
:::

### Lazy loading và nhiều cấp độ / scene

Nếu bạn muốn chia ứng dụng của mình thành nhiều cấp độ hoặc scene, bạn chỉ cần sử dụng component `SceneSwitcher`. Sau đó, bạn có thể cấu trúc ứng dụng của mình thành nhiều scene hoặc prefab và thêm chúng vào mảng SceneSwitcher để được tải và giải phóng ở runtime. Đây là một cách tuyệt vời để tránh phải tải tất cả nội dung ngay từ đầu và giữ thời gian tải nhỏ (ví dụ: đây là những gì chúng tôi đã làm trên [needle.tools](https://needle.tools?utm_source=needle_docs&utm_content=export_scenes) bằng cách chia mỗi phần của website thành scene riêng và chỉ tải chúng khi cần thiết)

### Độ phức tạp khuyến nghị cho mỗi glTF

- Kích thước xuất tối đa 50 MB chưa nén (thường khoảng ~10-20 MB khi nén)
- Tối đa 500 nghìn vertices (ít hơn nếu bạn nhắm mục tiêu cả mobile VR)
- Tối đa 4x 2k lightmaps

Bạn có thể chia nhỏ các scene và prefab thành nhiều file glTF, sau đó tải chúng theo yêu cầu (chỉ khi cần thiết). Điều này giúp hiệu suất tải nhanh và kích thước file nhỏ. Xem phần [AssetReference trong tài liệu Scripting](scripting.md#assetreference-and-addressables).

Độ phức tạp scene ở đây được khuyến nghị để đảm bảo hiệu suất tốt trên một loạt các thiết bị có khả năng web và băng thông. Không có giới hạn kỹ thuật nào ngoài khả năng của thiết bị của bạn.

### Prefab
Prefab có thể được xuất dưới dạng các file glTF riêng lẻ và được khởi tạo ở runtime. Để xuất một prefab dưới dạng glTF, chỉ cần tham chiếu một prefab asset (từ project browser chứ không phải trong scene) [từ một trong các script của bạn](https://fwd.needle.tools/needle-engine/docs/addressables).

Xuất Prefab cũng hoạt động với nesting: một component trong một Prefab có thể tham chiếu đến một Prefab khác, Prefab đó cũng sẽ được xuất.
Cơ chế này cho phép các scene cấu thành nhẹ nhất có thể và tải nội dung quan trọng nhất trước, sau đó tải nội dung bổ sung.

### Scene Assets
Tương tự như Prefab assets, bạn có thể tham chiếu các Scene assets khác.
Để bắt đầu, tạo một component trong Unity với trường ``UnityEditor.SceneAsset`` và thêm nó vào một trong các GameObjects của bạn bên trong một GltfObject. Scene được tham chiếu bây giờ sẽ được xuất dưới dạng một file glTF riêng biệt và có thể được tải/giải tuần tự hóa dưới dạng một ``AssetReference`` từ TypeScript.

Bạn có thể tiếp tục làm việc bên trong một scene được tham chiếu và vẫn cập nhật scene xuất chính/website của bạn. Khi lưu scene hoặc thay đổi play mode, chúng tôi sẽ phát hiện xem scene hiện tại có đang được sử dụng bởi server đang chạy của bạn hay không và sau đó kích hoạt việc xuất lại chỉ cho file glb đó. (Việc kiểm tra này được thực hiện theo tên - nếu một file glb bên trong thư mục ``<web_project>/assets/`` của bạn tồn tại, nó sẽ được xuất lại và scene chính sẽ tải lại nó.)

Ví dụ trên [website của chúng tôi](https://needle.tools?utm_source=needle_docs&utm_content=export_sceneassets), mỗi phần được thiết lập như một scene riêng biệt và khi xuất được đóng gói thành nhiều file glb mà chúng tôi tải theo yêu cầu:

![2022-08-22-172605_Needle_Website_-_Website_-_Windows,_Mac,_Linux_-_U](https://user-images.githubusercontent.com/5083203/185958983-71913c97-5eec-4cfd-99f5-76798582373e.png)

#### Tải một Prefab hoặc Scene từ một script tùy chỉnh
Nếu bạn muốn tham chiếu và tải một prefab từ một trong các script của mình, bạn có thể khai báo kiểu ``AssetReference``.
Đây là một ví dụ tối thiểu:

@[code ts twoslash](@code/component-prefab.ts)

## 🏇 Xuất Hoạt ảnh
Needle Engine hỗ trợ một tập hợp đáng kể và mạnh mẽ các tính năng animation của Unity:

- **Timeline** bao gồm activation tracks, animation tracks, track offsets
- **Animator** bao gồm chuyển đổi trạng thái cấp cao nhất
  - Blend trees hiện không được hỗ trợ.
  - Sub state machines hiện không được hỗ trợ.
- **AnimationClips** bao gồm Loop modes
- **Procedural Animations** có thể được tạo qua scripting

Needle Engine là một trong những công cụ đầu tiên hỗ trợ extension glTF mới [KHR_ANIMATION_POINTER](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer).
Điều này có nghĩa là hầu hết tất cả các thuộc tính, bao gồm cả biến script, đều có thể tạo animation.

Một hạn chế hiện tại là các vật liệu sẽ không được nhân đôi khi xuất — ví dụ, nếu bạn muốn tạo animation cho cùng một vật liệu với các màu khác nhau, hiện tại bạn cần chia vật liệu đó thành hai.

## 🌍 Xuất Skybox
Skybox Unity và custom reflection (nếu có) được bake thành texture khi xuất và tự động xuất bên trong extension ``NEEDLE_lightmaps``.

Để thay đổi độ phân giải skybox, bạn có thể thêm component ``SkyboxExportSettings`` vào scene của mình.

![image](https://user-images.githubusercontent.com/5083203/196030839-170a9496-9ed9-4ebc-bc1d-2df6c746f8c8.png)

Nếu bạn không muốn skybox được xuất hoàn toàn trong file glb, bạn có thể bỏ chọn tùy chọn ``Embed Skybox`` trên component ``GltfObject`` của mình.

![image](https://user-images.githubusercontent.com/5083203/196030825-8a05037f-5acc-4795-9128-2bdacedd0d49.png)

## ✨ Xuất Vật liệu

### Vật liệu dựa trên vật lý (PBR)
Theo mặc định, các vật liệu được chuyển đổi thành vật liệu glTF khi xuất. glTF hỗ trợ mô hình vật liệu dựa trên vật lý và có một số extension giúp biểu diễn các vật liệu phức tạp.

Để kiểm soát hoàn toàn những gì được xuất, rất khuyến khích sử dụng các vật liệu glTF được cung cấp bởi UnityGltf:
- PBRGraph
- UnlitGraph

::: tip Khi nghi ngờ, hãy sử dụng shader PBRGraph
Vật liệu PBRGraph có rất nhiều tính năng, nhiều hơn đáng kể so với Standard hoặc URP/Lit. Bao gồm các tính năng nâng cao như khúc xạ, ánh cầu vồng (iridescence), sheen, và nhiều hơn nữa. Ngoài ra, các vật liệu sử dụng PBRGraph và UnlitGraph được xuất nguyên trạng, không cần chuyển đổi.
:::

Các vật liệu có thể được chuyển đổi ngay lập tức:
- BiRP/Standard
- BiRP/Autodesk Interactive
- BiRP/Unlit
- URP/Lit
- URP/Unlit

Các vật liệu khác được chuyển đổi bằng cách sử dụng thuật toán phỏng đoán dựa trên tên thuộc tính. Điều đó có nghĩa là tùy thuộc vào tên thuộc tính mà vật liệu và shader tùy chỉnh của bạn sử dụng, bạn có thể muốn tái cấu trúc các thuộc tính của shader tùy chỉnh để sử dụng tên thuộc tính của URP/Lit hoặc PBRGraph, hoặc xuất vật liệu dưới dạng [Custom Shader](#custom-shaders).

### Custom Shaders
Để xuất các unlit shader tùy chỉnh (ví dụ: được tạo bằng ShaderGraph), hãy thêm Asset Label ``ExportShader`` vào shader bạn muốn xuất. Asset Label có thể được nhìn thấy ở cuối cửa sổ Inspector.

![2022-08-22-172029_Needle_Website_-_CustomShaders_-_Windows,_Mac,_Lin](https://user-images.githubusercontent.com/5083203/185957781-9fae18c5-09ff-490f-8958-57e138aa0003.png)

#### Hạn chế
- Chúng tôi hiện chỉ hỗ trợ các shader **Unlit** tùy chỉnh — việc chuyển đổi Lit shader không được hỗ trợ chính thức.
- Custom Lit Shaders hiện đang thử nghiệm. Không phải tất cả các chế độ hiển thị đều được hỗ trợ.
- Nhận bóng (shadow receiving) trên custom shaders không được hỗ trợ
- Skinned meshes với custom shaders không được hỗ trợ
- Vì có nhiều thay đổi hệ tọa độ khi chuyển từ Unity sang three.js và glTF, có thể cần thực hiện một số thay đổi để các hiệu ứng nâng cao hoạt động. Chúng tôi cố gắng chuyển đổi dữ liệu khi xuất nhưng có thể không xử lý được tất cả các trường hợp cần chuyển đổi.
  - Tọa độ UV trong Unity bắt đầu từ dưới cùng bên trái; trong glTF, chúng bắt đầu từ trên cùng bên trái.
  - Các giá trị trục X bị lật trong glTF so với Unity. Đây là một biến thể của sự thay đổi hệ tọa độ từ tay trái sang tay phải. Dữ liệu được sử dụng trong shader có thể cần phải lật trên trục X để hiển thị chính xác.

::: note Không phải là một phần của đặc tả glTF
Lưu ý rằng **Custom Shaders** không phải là một phần chính thức của đặc tả glTF. Việc triển khai custom shaders của chúng tôi sử dụng một extension gọi là KHR_techniques_webgl, extension này lưu trữ mã shader WebGL trực tiếp trong file glTF. Các asset kết quả sẽ hoạt động trong các viewer dựa trên Needle Engine, nhưng có thể không hiển thị chính xác trong các viewer khác.
:::

## 💡 Xuất Lightmap
![2022-08-22-171650_Needle_-_Google_Chrome](https://user-images.githubusercontent.com/5083203/185957005-d04c9530-07eb-40f5-b305-9822d13b79ab.png)

Để xuất lightmap, bạn chỉ cần [tạo lightmap](https://docs.unity3d.com/Manual/Lightmapping.html) trong Unity. Lightmap sẽ được xuất tự động.

Khi làm việc trên nhiều scene, hãy tắt "Auto Generate" và bake lightmap một cách rõ ràng. Nếu không, Unity sẽ loại bỏ lightmap tạm thời khi chuyển scene.

### Cài đặt Lightmap khuyến nghị
- Lightmap Encoding: Normal Quality (điều chỉnh trong Project Settings > Player)
- Progressive GPU (nhanh hơn và thường đủ chính xác cho các scene nhỏ)
- Non-Directional Lightmaps
- Kích thước Lightmap tối đa 2k (bạn có thể tăng cao hơn, nhưng sẽ có file lớn)
- Tối đa 4x 2k lightmaps cho mỗi scene (bạn có thể tăng cao hơn, nhưng sẽ có file lớn)
- Compress Lightmaps OFF (tăng chất lượng; nếu không sẽ bị nén lại khi xuất)

![2022-08-22-171356_Needle_Website_-_Lightmaps_-_Windows,_Mac,_Linux_-](https://user-images.githubusercontent.com/5083203/185956392-f4031f45-ad13-4e6d-a14c-c8ec5c1fcfd4.png)

### Kết hợp đối tượng đã Bake và chưa Bake

Không có sự ánh xạ 100% giữa cách Unity xử lý ánh sáng và môi trường với cách three.js xử lý. Ví dụ, Unity có các đường dẫn mã hoàn toàn riêng biệt cho các đối tượng đã bake lightmap và các đối tượng chưa bake lightmap (các đối tượng đã bake lightmap không nhận ambient light vì nó đã được bake vào bản đồ của chúng), còn three.js thì không phân biệt theo cách đó.

Điều này có nghĩa là để đạt được kết quả tốt nhất, chúng tôi hiện khuyến nghị các cài đặt cụ thể nếu bạn kết hợp các đối tượng đã bake và chưa bake trong một scene:
```
Environment Lighting: Skybox
Ambient Intensity: 1
Ambient Color: black
```

**2021.3+**
![20220826-175324-SqBL-Unity_pMXa-needle](https://user-images.githubusercontent.com/2693840/186947184-2446672f-420c-47e8-8f7d-970a7d52bf35.png)

**2020.3+**
![20220826-175514-tnGc-Unity_mycs-needle](https://user-images.githubusercontent.com/2693840/186947203-2d7d96c3-f566-44b4-889c-4103fac505d4.png)

Nếu scene của bạn không có đối tượng nào đã bake, thì các cài đặt sau cũng sẽ cho kết quả chính xác:
```
Environment Lighting: Color
Ambient Color: any
```
Trang tự động dịch bằng AI