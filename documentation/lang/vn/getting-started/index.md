---
lang: vn-VN
title: Bắt đầu & Cài đặt
next: ../project-structure.md
---

<br/>

<discountbanner />


# Tải về

Với **Needle Engine**, bạn có thể tạo các trang web 3D tương tác đầy đủ bằng framework yêu thích của mình.

Các dự án được tạo bằng Needle Engine có thể được triển khai ở bất kỳ đâu trên web và được tối ưu hóa tự động bằng pipeline tối ưu hóa hiện đại của chúng tôi với hỗ trợ LOD tự động – giảm kích thước asset tới 100 lần mà không ảnh hưởng đến chất lượng.

Needle Engine có sẵn dưới dạng **package cho Unity, add-on cho Blender, Web Component sẵn sàng sử dụng**, hoặc dưới dạng npm package cho các dự án không tích hợp với editor.
Mỗi lựa chọn này đều đi kèm với các component giống nhau, các khối xây dựng của chúng tôi và khả năng tạo ra nhiều hơn – lựa chọn là của bạn.

## Chọn quy trình làm việc của bạn

<tool-tiles></tool-tiles>

<!-- | Tool |  |  |
| -- | -- | -- |
| Node.js **(required)** | 16.x or 18.x <br>[Windows](https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi) <br/> [MacOS](https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg)   | For running a local development server
| VS Code *(recommended)* | any version<br/>[Windows](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user) <br/> [MacOS](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal) | For code editing (optional)  |
| **Supported Editors** | |
| Unity | 2020.3.16+ <br/>2021.3.9+ <br/>2022.3.0+<br/>[Get Unity Hub](https://unity.com/download) | For setting up your scenes, components, animations... |
| Blender | 3.3<br/>3.4<br/>3.5<br/>3.6<br/>[Get Blender](https://www.blender.org/download/) | For setting up your scenes, components, animations... |
   -->


<!-- ### For optimized builds

| Tool | | |
| -- | -- | -- |
| | | |
| **toktx** | 4.1<br/>[Windows](https://fwd.needle.tools/needle-engine/toktx/win) <br/> [MacOS](https://fwd.needle.tools/needle-engine/toktx/osx) <br/> [Mac OS Apple Silicon](https://fwd.needle.tools/needle-engine/toktx/osx-silicon) <br/> [Other Releases](https://github.com/KhronosGroup/KTX-Software/releases/tag/v4.1.0-rc3)  | For texture compression (recommended) <br/>You can read more about that [here](./deployment.md#production-builds) in our docs -->



<br/>
<br/>



<!--
<img src="/imgs/unity-logo.webp" style="max-height:70px;" />


## Needle Engine for Unity

*Supported Unity versions: 2021.3 LTS, 2022.3 LTS*

<needle-button event_goal="download_unity" event_position="getting_started" large href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"><strong>Tải về Needle Engine cho Unity</strong></needle-button>

- Drop the downloaded .unitypackage file into a Unity project and confirm that you want to import it.
- Wait a moment for the installation and import to finish. A window may open stating that "A new scoped registry is now available in the Package Manager.". This is our Needle Package registry. You can safely close that window.
- **Explore Samples** – Select the menu option _Needle Engine > Explore Samples_ to view, open and modify all available [sample scenes](https://engine.needle.tools/samples).


**Xem [Needle Engine cho Unity](../unity/index.md)** để biết danh sách đầy đủ các tính năng và hướng dẫn bắt đầu.


---


<img src="/blender/logo.png" style="max-height:70px;" />

## Needle Engine for Blender
*Supported Blender versions: 4.1+*

<needle-button event_goal="download_blender" event_position="getting_started" large href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"><strong>Tải về Needle Engine cho Blender</strong></needle-button>

<br/>

- The Blender add-on is downloaded as a zip file.
- In Blender, go to `File > Settings > Add-ons` and click the `Install` button.
- Then select the downloaded zip to install it.

**Xem [Needle Engine cho Blender](../blender/index.md)** để biết danh sách đầy đủ các tính năng và hướng dẫn bắt đầu.

<br/>
<br/>
<br/>



<br/>
<br/>
<br/>

-->

## Trình chỉnh sửa code và Công cụ

### Cài đặt trình chỉnh sửa code

Needle Engine giúp dễ dàng xây dựng các ứng dụng web. Điều này thường bao gồm, nhưng không phải lúc nào cũng vậy, coding với JavaScript/TypeScript hoặc viết HTML và CSS để mô tả giao diện người dùng. Chúng tôi khuyến khích sử dụng [Visual Studio Code](https://code.visualstudio.com) để tạo và chỉnh sửa các tệp này. Đây là trình chỉnh sửa code miễn phí, mã nguồn mở chạy trên Windows, macOS và Linux.

<ClientOnly>
<!-- <br/><os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Unity</os-link> — <os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Blender</os-link> -->

<os-link windows_url="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" osx_url="https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal">Tải về Visual Studio Code</os-link>


<br/>
<br/>

### Các công cụ hữu ích khác

::: tip
Needle Engine sử dụng các công cụ sau để tạo ứng dụng web của bạn, nhưng bạn không cần cài đặt chúng thủ công khi sử dụng tích hợp Unity hoặc Blender. Chúng tôi sẽ hướng dẫn bạn qua quá trình cài đặt sau khi bạn đã cài đặt tích hợp Needle.
:::

<br/>
<os-link windows_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi" osx_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1.pkg">Node.js 20 LTS hoặc 22 LTS.</os-link>
Needle Engine sử dụng Node.js để quản lý, xem trước và build ứng dụng web mà bạn đang tạo trên máy tính cục bộ của mình.
Nó cũng được sử dụng để upload (triển khai) trang web của bạn lên internet.

<br/><os-link windows_url="https://fwd.needle.tools/needle-engine/toktx/win" osx_url="https://fwd.needle.tools/needle-engine/toktx/osx" osx_silicon_url="https://fwd.needle.tools/needle-engine/toktx/osx-silicon">KTX Software – công cụ toktx texture.</os-link> Chúng tôi sử dụng toktx của Khronos Group để tối ưu hóa và nén cục bộ các tệp 3D của bạn. Tìm hiểu thêm về production builds [trong tài liệu](../deployment.md#production-builds).

<br/>
</ClientOnly>

<!--
## Option 1: Quick Start — Starter Project ⚡
1. **Download or Clone this repository**
   It's set up with the right packages and settings to get you started right away.

   _Clone with HTTPS:_ ``https://github.com/needle-tools/needle-engine-support.git``
   _OR clone with SSH:_ ``git@github.com:needle-tools/needle-engine-support.git``
   _OR download directly:_ <a href="https://github.com/needle-tools/needle-engine-support/archive/refs/heads/main.zip" target="_blank">Download Repository</a>


2. **Open the starter project**
  Open `starter/Needle Engine Starter 2020_3` for a full sandbox project that's ready to run (including a couple of simple example scenes for lightmaps and custom shaders).
  This is a sandbox builder project! It already comes with multi-player capabilities, and works across mobile, desktop, VR and AR.

3. **Press Play**
  Make sure the scene CollaborativeSandbox is open, and press Play! This will automatically do some setup steps and start a local server.
  Once the setup is complete, a browser window will open, and your project is live.
  From now on, all changes you do in Unity will be immediately visible in your browser.

    > **Note**: Your browser might warn you about an untrusted SSL connection. Don't worry, the connection is still encrypted – please click "Advance" if your browser asks you to verify that you're sure you want to visit your server.

4. **Make it your own**
  Add assets and components, play around with lighting, add scripts and logic – this is your world now!
  You can also [publish it on the web for free](#deploy-your-project-to-glitch-) so that others can join you.
-->



## Các bước tiếp theo

Bây giờ bạn đã cài đặt Needle Engine, bạn đã sẵn sàng đi sâu hơn vào việc tạo dự án, component workflow, scripting, triển khai và nhiều hơn nữa.

- [Bắt đầu: Unity](../unity/index.md)
- [Bắt đầu: Blender](../blender/index.md)
- [Khái niệm: Xuất đối tượng và nội dung 3D](../export.md)
- [Khái niệm: Cấu trúc dự án](../project-structure.md)
- [Khái niệm: Triển khai trang web của bạn lên web](../deployment.md)
- [Hướng dẫn cho người mới bắt đầu: Kiến thức cơ bản về Typescript](./typescript-essentials.md)
- [Hướng dẫn cho người mới bắt đầu: Needle Engine cho nhà phát triển Unity](./for-unity-developers.md)
- [Hướng dẫn cho người mới bắt đầu: Tham khảo Scripting](../scripting.md)
- [Ví dụ trực tiếp: Needle Engine Samples](https://engine.needle.tools/samples)

Trong trường hợp bạn cần trợ giúp khắc phục sự cố, vui lòng xem phần [Câu hỏi và Trả lời – FAQ](../faq.md).
Chúng tôi chào mừng bạn tham gia [Diễn đàn](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) và [Cộng đồng Discord](https://discord.needle.tools) của chúng tôi.

Trang được dịch tự động bằng AI