---
title: Câu hỏi thường gặp (FAQ) 💡
---


## Làm thế nào để kích hoạt Giấy phép Needle Engine của tôi?

### Kích hoạt giấy phép trong Unity

#### Needle Engine 4.x

Đi tới Project Settings/Needle và nhấp vào nút đăng nhập. Làm theo các bước và đăng nhập vào tài khoản Needle của bạn.   
Sau đó, bạn sẽ thấy thông tin tài khoản của mình trong cửa sổ cài đặt dự án Unity. Chọn nhóm được cấp phép từ menu thả xuống.   

#### Needle Engine 3.x

Mở `Edit/Project Settings/Needle` để vào cài đặt plugin Needle Engine. Ở đầu cửa sổ, bạn sẽ tìm thấy các trường để nhập thông tin giấy phép của mình.
- `Email` - Nhập email mà bạn đã mua giấy phép
- `Invoice ID` - Nhập một trong các invoice ID mà bạn đã nhận qua email

Lưu ý: Bạn có thể cần khởi động lại máy chủ web cục bộ để áp dụng giấy phép.

![unity license window](/imgs/unity-needle-engine-license.jpg)

### Kích hoạt giấy phép trong Blender
Mở `Addon Preferences/Needle Engine` để vào cài đặt addon Needle Engine
- `Email` - Nhập email mà bạn đã mua giấy phép
- `Invoice ID` - Nhập một trong các invoice ID mà bạn đã nhận qua email

Lưu ý: Bạn có thể cần khởi động lại máy chủ web cục bộ để áp dụng giấy phép.



## Trang web cục bộ của tôi hiển thị lỗi SSL, ví dụ: 'Kết nối của bạn không riêng tư'

Bạn có thể thấy cảnh báo trong trình duyệt của mình về SSL Security tùy thuộc vào cấu hình cục bộ của bạn.  

Điều này là do mặc dù kết nối được mã hóa, nhưng theo mặc định không có chứng chỉ SSL nào mà trình duyệt có thể xác thực.
Nếu điều đó xảy ra: nhấp vào `Advanced` và `Proceed to Site`. Trong Safari, bạn có thể cần làm mới trang sau đó, vì nó không tự động tiếp tục. Bây giờ bạn sẽ thấy cảnh của mình trong trình duyệt!  

Hộp thoại chỉ nên hiển thị một lần cho cùng một máy chủ cục bộ

::: tip
Các kết nối được bảo mật, vì chúng tôi đang áp dụng HTTPS để đảm bảo rằng WebXR và các API web hiện đại khác hoạt động ngay lập tức. Một số trình duyệt vẫn sẽ phàn nàn rằng kết nối SSL (giữa máy chủ phát triển cục bộ của bạn và trang web cục bộ) không thể tự động tin cậy và bạn cần xác minh thủ công rằng bạn tin tưởng trang đó. Tự động tải lại trang và kết nối Websocket cũng có thể bị ảnh hưởng tùy thuộc vào cài đặt trình duyệt và hệ thống.  

Xem [tài liệu Testing](./testing.md) để biết thông tin về cách thiết lập chứng chỉ tự ký cho trải nghiệm phát triển mượt mà hơn.
:::

![SLL warning on chrome](/videos/ssl-warning.gif)
  
  

## Trang web cục bộ của tôi bị đen

Nếu điều đó xảy ra, thường có một ngoại lệ trong mã engine hoặc mã của bạn. Mở dev tools (<kbd>Ctrl + Shift + I</kbd> hoặc <kbd>F12</kbd> trong Chrome) và kiểm tra Console để tìm lỗi.  
Trong một số trường hợp, đặc biệt là khi bạn vừa cập nhật phiên bản gói Needle Engine, điều này có thể được khắc phục bằng cách dừng và khởi động lại máy chủ dev cục bộ.  
Để làm điều đó, hãy nhấp vào thanh tiến trình đang chạy ở góc dưới bên phải của Editor, và nhấp vào nút <kbd>X</kbd> nhỏ để hủy tác vụ đang chạy. Sau đó, chỉ cần nhấn Play lại.  


## Các đối tượng của tôi bị trắng sau khi xuất
Điều này thường xảy ra khi bạn đang sử dụng custom shaders hoặc materials và các thuộc tính của chúng không được dịch rõ ràng sang các tên thuộc tính đã biết để xuất glTF.  
Bạn có thể đảm bảo rằng bạn đang sử dụng materials và shaders tương thích với glTF, hoặc đánh dấu shaders là "custom" để xuất chúng trực tiếp.  
- Đọc thêm về các quy trình làm việc glTF được đề xuất: <link>
- Đọc thêm về custom shaders: <link>


## Uncaught ReferenceError: NEEDLE_ENGINE_META is not defined / NEEDLE_USE_RAPIER is not defined

Nếu bạn đang sử dụng Vite hoặc next.js, hãy đảm bảo thêm các plugin Needle Engine vào cấu hình của bạn.
Ví dụ cho Vite:
```js
const { needlePlugins } = await import('@needle-tools/engine/plugins/vite/index.js');
plugins: [needlePlugins(command, needleConfig)]
```
Ví dụ cho next.js
```js
const { needleNext } = await import("@needle-tools/engine/plugins/next/index.js");
return needleNext({}, { modules: { webpack } });
```
Bạn cũng có thể chỉ khai báo các biến bị thiếu trong ví dụ như `index.html` gốc của bạn trong một thẻ script như sau:
```html
<script>
  var NEEDLE_ENGINE_META = {}
  var NEEDLE_USE_RAPIER = true;
</script>
```

## THREE.EXRLoader: provided file doesnt appear to be in OpenEXR format

Vui lòng đảm bảo rằng bạn đã đặt Lightmap Encoding thành **Normal Quality**.   
Truy cập *Edit/Project Settings/Player* để thay đổi cài đặt.  

![](/faq/lightmap_encoding.jpg)  

## Trang web của tôi trở nên quá lớn / tải chậm (quá nhiều MB)
  
Điều này có thể có nhiều lý do, nhưng một vài lý do phổ biến là:
- quá nhiều textures hoặc textures quá lớn
- meshes có quá nhiều vertices
- meshes có các vertex attributes mà bạn thực sự không cần (ví dụ: có normals và tangents nhưng bạn không sử dụng chúng)
- các đối tượng bị vô hiệu hóa và không bị bỏ qua – các đối tượng bị vô hiệu hóa cũng được xuất trong trường hợp bạn muốn bật chúng lên khi chạy! Đặt Tag của chúng thành `EditorOnly` để bỏ qua hoàn toàn chúng khi xuất.
- bạn có nhiều thành phần ``GltfObject`` trong cảnh của mình và tất cả chúng đều bật ``EmbedSkybox`` (bạn chỉ cần có skybox một lần cho mỗi cảnh bạn xuất)
  
Nếu thời gian tải là vấn đề, bạn có thể **thử chia nội dung của mình thành nhiều tệp glb** và tải chúng theo yêu cầu (đây là cách chúng tôi làm trên trang web của mình). Để nó hoạt động, bạn có thể đặt nội dung của mình vào Prefabs hoặc Scenes và tham chiếu chúng từ bất kỳ tập lệnh nào của bạn. Vui lòng xem [Scripting/Addressables trong tài liệu](./scripting.md#assetreference-and-addressables).

## UI của tôi không hiển thị Text

- Đối với Unity: Đảm bảo rằng bạn sử dụng thành phần `UI/Legacy/Text` và **không phải** thành phần `TextMeshPro - Text`

## Các tập lệnh của tôi không hoạt động sau khi xuất
  
- Mã C# hiện có của bạn sẽ *không* được xuất nguyên trạng, bạn phải viết typescript / javascript tương ứng cho nó.  
- Needle sử dụng typescript / javascript cho các thành phần và tạo ra các C# stubs cho chúng.  
- Các thành phần đã có JS tương ứng sẽ hiển thị điều đó trong Inspector.  

## lightmaps của tôi trông khác / quá sáng

Đảm bảo bạn đang tuân thủ [best practices for lightmaps](https://docs.needle.tools/lightmaps?utm_source=needle_docs) và đọc về [mixing baked and non-baked objects](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects)

## Cảnh của tôi quá sáng / ánh sáng trông khác so với trong Unity
Đảm bảo rằng đèn của bạn được đặt thành "Baked" hoặc "Realtime". "Mixed" hiện chưa được hỗ trợ.  
  
- Đèn được đặt thành mixed (với lightmapping) ảnh hưởng đến đối tượng hai lần trong three.js, vì hiện tại không có cách nào để loại trừ các đối tượng được lightmap khỏi hệ thống chiếu sáng.
- Hệ số ``Intensity Multiplier`` cho Skybox trong ``Lighting/Environment`` hiện chưa được hỗ trợ và không có hiệu quả trong Needle Engine.  
  ![image](https://user-images.githubusercontent.com/5083203/185429006-2a5cd6a1-8ea2-4a8e-87f8-33e3afd080ec.png)
- Độ mạnh bóng đèn hiện không thể thay đổi do hạn chế của three.js.
  
Cũng xem tài liệu về [mixing baked and non-baked objects](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects).


## Độ phân giải skybox của tôi thấp? Làm thế nào để thay đổi độ phân giải skybox của tôi

  - **Nếu bạn sử dụng custom cubemap**: Bạn có thể ghi đè cài đặt nhập texture của texture skybox (được gán cho cubemap của bạn)
  
    ![image](https://user-images.githubusercontent.com/5083203/188179104-1e078cda-3397-4ebe-aaf9-7faa23ee4904.png)   

 
  - **Nếu bạn sử dụng skybox mặc định**: Thêm một thành phần ``SkyboxExportSettings`` ở bất kỳ đâu trong cảnh của bạn để ghi đè độ phân giải mặc định   
  
    ![image](https://user-images.githubusercontent.com/5083203/188171443-578380ab-2036-4d70-a8a7-f8cd9da9f603.png)



## Bóng của tôi không hiển thị hoặc bị cắt 
  
Vui lòng kiểm tra các điểm sau:   
  
  - Đèn của bạn đã bật bóng (Soft Shadow hoặc Hard Shadow)
  - Các đối tượng của bạn được đặt thành "Cast Shadows: On" (xem thành phần MeshRenderer)
  - Đối với directional lights, vị trí của đèn hiện tại rất quan trọng vì shadow camera sẽ được đặt ở vị trí đèn trong cảnh.



## Màu sắc của tôi trông không đúng
  
Đảm bảo dự án của bạn được đặt thành Linear colorspace.

![image](https://user-images.githubusercontent.com/5083203/191774978-66e9feb1-0551-4549-85d3-3e5b8021f162.png)



## Tôi đang sử dụng networking và Glitch và nó không hoạt động nếu hơn 30 người truy cập trang Glitch cùng lúc
  
- Triển khai trên Glitch là một cách nhanh chóng để tạo mẫu và thậm chí có thể hoạt động cho một số sản xuất nhỏ. Máy chủ nhỏ ở đó không có đủ năng lực và băng thông để chứa nhiều người trong một phiên liên tục.  
- Chúng tôi đang nghiên cứu các ý tưởng networking khác, nhưng trong thời gian chờ đợi, bạn có thể lưu trữ trang web ở nơi khác (với hỗ trợ node.js) hoặc chỉ cần remix nó để phân phối tải giữa nhiều máy chủ. Bạn cũng có thể lưu trữ [gói networking backend](https://www.npmjs.com/package/@needle-tools/needle-tiny-networking-ws) ở nơi khác nơi nó có thể mở rộng, ví dụ: Google Cloud.



## Trang web của tôi không có nút AR/VR
  
- Đảm bảo thêm thành phần `WebXR` ở đâu đó bên trong `GltfObject` gốc của bạn.
- Tùy chọn thêm thành phần `AR Session Root` trên `GltfObject` gốc của bạn hoặc trong cây phân cấp con để chỉ định vị trí, tỷ lệ và hướng cho WebXR.
- Tùy chọn thêm thành phần `XR Rig` để kiểm soát nơi người dùng bắt đầu trong VR


## Tôi đã tạo một tập lệnh mới trong sub-scene nhưng nó không hoạt động
  Khi tạo các tập lệnh mới trong npmdefs trong sub-scenes (nghĩa là một cảnh được xuất dưới dạng tham chiếu từ một tập lệnh trong cảnh xuất gốc của bạn), hiện tại bạn phải xuất lại cảnh gốc. Điều này là do code-gen chịu trách nhiệm đăng ký các tập lệnh mới hiện chỉ chạy cho các cảnh có thành phần ``ExportInfo``. Điều này sẽ được khắc phục trong tương lai.


## Máy chủ cục bộ của tôi không khởi động / Tôi không thấy trang web
  
Lý do có khả năng nhất là cài đặt không chính xác. 
Kiểm tra console và thành phần `ExportInfo` để tìm lỗi hoặc cảnh báo.  

Nếu những cảnh báo/lỗi này không giúp ích, hãy thử các bước sau theo thứ tự. Dành thời gian cho chúng hoàn thành. Dừng lại ngay khi vấn đề của bạn đã được giải quyết. Kiểm tra console để tìm cảnh báo và lỗi.  
  
- Đảm bảo bạn tuân thủ [Prerequisites](./getting-started/#prerequisites).
- Cài đặt dự án của bạn bằng cách chọn thành phần `ExportInfo` của bạn và nhấp vào `Install` 
- Chạy cài đặt sạch bằng cách chọn thành phần `ExportInfo` của bạn, giữ phím Alt và nhấp vào `Clean Install`
- Thử mở thư mục dự án web của bạn trong công cụ dòng lệnh và làm theo các bước sau:
  - chạy ``npm install`` và sau đó ``npm run dev-host``
  - Đảm bảo cả gói runtime cục bộ (``node_modules/@needle-tools/engine``) cũng như three.js (``node_modules/three``) đã cài đặt. 
  - Bạn cũng có thể chạy ``npm install`` trong cả hai thư mục này.


## Việc tạo thành phần C# có hoạt động chỉ với javascript không?
  Mặc dù việc tạo thành phần C# về mặt kỹ thuật cũng hoạt động với vanilla javascript, chúng tôi không khuyến nghị và không hỗ trợ đầy đủ vì nó cần đoán nhiều hơn hoặc đơn giản là không thể để bộ tạo biết loại C# nào cần tạo cho lớp javascript của bạn. Dưới đây bạn tìm thấy một ví dụ tối thiểu về cách tạo Unity Component từ javascript nếu bạn thực sự muốn làm điều đó.    
  
```js
import { Behaviour } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    //@type float
    myField = 5;
}
```


## Tôi không có bất kỳ nút nào như "Generate Project" trong các thành phần/inspector của mình
  
Vui lòng kiểm tra xem bạn có vô tình ở chế độ `Debug` của Inspector không – chuyển về `Normal`:  
![20220824-025011-S2GQ-Unity_lKlT-needle](https://user-images.githubusercontent.com/2693840/186291615-56e7ebdb-1221-4326-813d-f88526fa126c.png)


## Toktx không thể tìm thấy / toktx chưa được cài đặt

- Đảm bảo [tải xuống và cài đặt toktx](http://localhost:8080/docs/getting-started/.html#install-these-tools-for-production-builds)

- Trên Windows: Đảm bảo bạn đã thêm toktx vào biến môi trường hệ thống của mình. Bạn có thể cần khởi động lại máy tính sau khi thêm để làm mới các biến môi trường. Vị trí cài đặt mặc định là ``C:\Program Files\KTX-Software\bin``   

![image](/imgs/ktx-env-variable.webp)


## Cài đặt dự án web mất mãi / không bao giờ kết thúc / EONET: không có tệp hoặc thư mục như vậy
- **Đảm bảo không tạo dự án trên ổ đĩa được định dạng exFAT** vì exFAT không hỗ trợ symlinks, điều này là bắt buộc đối với Needle Engine cho Unity trước phiên bản 3.x.    
  Bạn có thể kiểm tra định dạng ổ đĩa của mình bằng các bước sau:
  1. Mở "System Information" (hoặc nhấn phím windows và gõ từ đó hoặc nhập "msinfo32" vào cmd)
  2. Chọn Components > Storage > Drives
  3. Chọn tất cả (Ctrl + A) ở phía bên phải màn hình và sao chép (<kbd>Ctrl + C</kbd>) và dán vào đây (<kbd>Ctrl + V</kbd>)

## NPM install thất bại và có lỗi về ổ cứng / IO
Đảm bảo dự án của bạn nằm trên ổ đĩa được biết là hoạt động với node.js. Lý do chính gây ra lỗi là ổ đĩa không hỗ trợ symlinks (symbolic links / softlinks), đây là yêu cầu để node.js hoạt động đúng.  
<kbd>NTFS</kbd> formatting should always work. Known problematic file system formattings are <kbd>exFAT</kbd> and <kbd>FAT32</kbd>. 

Để kiểm tra định dạng ổ đĩa của bạn, bạn có thể:
1. Mở "System Information" (hoặc nhấn <kbd>phím Windows</kbd> và gõ "System Information" hoặc nhập `msinfo32` vào cmd <kbd>Windows + R</kbd>)
2. Chọn "Components > Storage > Drives"
3. Ở đó, bạn có thể thấy tất cả các ổ đĩa và định dạng của chúng được liệt kê. Đặt dự án của bạn trên ổ đĩa được định dạng NTFS.


## Tôi gặp lỗi với "Unexpected token `@`. Expected identifier, string literal, numeric literal or ..."

Needle Engine sử dụng typescript decorators để serialization.   
Để khắc phục lỗi này, hãy đảm bảo bật `experimentalDecorators` trong tsconfig.json của bạn

## Tôi gặp lỗi 'failed to load config ... vite.config.js' khi chạy các lệnh npm trên Mac OS

Bạn có thể đang sử dụng phiên bản Unity x86_64 trên bộ xử lý Apple Silicon (ARM). Unity 2020.3 chỉ có sẵn cho x86_64, các phiên bản sau này cũng có phiên bản Apple Silicon.  
Do đó, tích hợp Unity của chúng tôi gọi npm sẽ làm như vậy từ một tiến trình x86_64, dẫn đến việc sử dụng phiên bản node và vite/esbuild x86_64. Khi bạn sau đó cố gắng chạy các lệnh npm trong cùng dự án từ một ứng dụng Apple Silicon (ví dụ: VS Code), npm sẽ phàn nàn về sự không khớp kiến trúc với một thông báo lỗi dài.  

Để khắc phục điều này, hãy sử dụng phiên bản Unity dành cho Apple Silicon (2021.1 trở lên).  

Bạn cũng có thể tạm thời khắc phục nó trên 2020.3 bằng cách xóa thư mục `node_modules` và chạy lại `npm install` từ VS Code. Bạn sẽ phải xóa lại `node_modules` khi chuyển về Unity.

## Lỗi tham chiếu vòng (Circular reference error)

Điều này có thể xảy ra khi bạn có ví dụ: một `SceneSwitcher` (hoặc bất kỳ thành phần nào khác tải một cảnh hoặc asset) và Asset được tham chiếu trong Unity chứa một `GltfObject` có cùng tên với cảnh gốc của bạn có `SceneSwitcher`. Bạn có thể kiểm tra kỹ điều này trong Unity nếu bạn nhận được lỗi nói đại loại như:

```
Failed to export ↑ YourSceneName.glb
you seem to have objects with the same name referencing each other.
```

Để khắc phục điều này, bạn có thể:
- Xóa `GltfObject` trong Prefab hoặc Scene được tham chiếu
- Đổi tên GameObject với thành phần tải các cảnh được tham chiếu

Nếu điều này không khắc phục được vấn đề, vui lòng hỏi [trong diễn đàn của chúng tôi](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content).

## Cảnh của tôi không tải và console chứa cảnh báo với 'circular references' hoặc 'failed to update active state'
Vui lòng xem phần [lỗi tham chiếu vòng (circular reference error)](#circular-reference-error).

## Máy của tôi có hỗ trợ WebGL 2 không?

Sử dụng bộ phát hiện [như thế này](https://get.webgl.org/webgl2/) để xác định xem thiết bị của bạn có hỗ trợ WebGL 2 không, nó cũng gợi ý nguyên nhân gây ra vấn đề của bạn, nhưng nói chung, hãy đảm bảo bạn đã cập nhật trình duyệt và drivers của mình. WebGL 1 không được hỗ trợ.

#### Các thiết bị được biết là gây ra vấn đề:
- Lenovo Thinkpad - T495  

## Tôi muốn sử dụng Needle AI với mô hình AI cục bộ của mình

Nếu bạn muốn (hoặc phải) chạy AI của mình cục bộ, bạn có thể sử dụng các tệp llms.txt của Needle làm ngữ cảnh cho AI cục bộ của bạn (ví dụ: Ollama):

- [llms.txt](https://cloud.needle.tools/llms.txt)
- [llms-full.txt](https://cloud.needle.tools/llms-full.txt)


## Vẫn còn câu hỏi? 
[Hỏi trong diễn đàn của chúng tôi](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) 

<a href="https://discord.needle.tools" target="_blank"><img height=20 src="https://img.shields.io/discord/717429793926283276?color=5562ea&label=Discord" /></a>

Trang được dịch tự động bằng AI