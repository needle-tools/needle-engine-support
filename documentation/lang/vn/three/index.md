<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <img src="/imgs/logo-webcomponents.png" style="max-height:70px;" title="Web Components Logo" alt="Web Components Logo"/> +
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="three.js Logo" alt="three.js Logo"/>
</div>

# Needle Engine dưới dạng Web Component

Needle Engine cung cấp một web component dễ sử dụng có thể được dùng để hiển thị các cảnh 3D phong phú, tương tác trực tiếp trong HTML chỉ với vài dòng code. Đây là web component tương tự được sử dụng trong các tích hợp của chúng tôi.

Một khi bạn vượt quá các tùy chọn cấu hình của web component, bạn có thể mở rộng nó bằng các script và component tùy chỉnh, cũng như truy cập đầy đủ vào scene graph theo lập trình.

:::tip Sử dụng các tích hợp!
Đối với các cảnh 3D phức tạp và lặp lại nhanh chóng, chúng tôi khuyên bạn nên sử dụng Needle Engine với một trong các tích hợp của chúng tôi. Chúng cung cấp quy trình tạo mạnh mẽ, bao gồm xem trước trực tiếp, hot reloading và pipeline build nâng cao với các tối ưu hóa 3D.
:::

### Bắt đầu nhanh
:::: code-group
::: code-group-item index.html
@[code html](@code/basic-webcomponent.html)
:::
::: code-group-item Kết quả
<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%;
    aspect-ratio: 16/9;
    outline: none;
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>
:::
::::
[Mở ví dụ này trên Stackblitz](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)



## Cài đặt từ npm

Bạn có thể làm việc trực tiếp với Needle Engine mà không cần sử dụng bất kỳ Tích hợp nào. Needle Engine sử dụng [three.js](https://threejs.org/) làm scene graph và thư viện render, vì vậy tất cả chức năng từ three.js cũng có sẵn trong Needle.

Bạn có thể cài đặt Needle Engine từ [`npm`](https://www.npmjs.com/package/@needle-tools/engine) bằng cách chạy:
<br/>
`npm i @needle-tools/engine`

## Cài đặt needle-engine từ một CDN

Mặc dù mẫu mặc định của chúng tôi sử dụng [vite](https://vitejs.dev), Needle Engine cũng có thể được sử dụng trực tiếp với vanilla Javascript – mà không cần sử dụng bất kỳ bundler nào.

Bạn có thể thêm phiên bản hoàn chỉnh, được đóng gói sẵn của Needle Engine vào trang web của mình chỉ với một dòng code.
Điều này bao gồm các core component, physics, particles, networking, XR, và nhiều hơn nữa. Hãy sử dụng cái này nếu bạn không chắc chắn!

```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js">
</script>
```

Nếu bạn biết dự án của mình không yêu cầu các tính năng vật lý (physics), bạn cũng có thể sử dụng phiên bản nhỏ hơn của Needle Engine, không có physics engine. Điều này sẽ làm giảm tổng kích thước tải về.
```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.light.min.js">
</script>
```


Nhiều ví dụ có thể được tìm thấy trên [StackBlitz](https://stackblitz.com/@marwie/collections/needle-engine).

## Tạo mẫu nhanh trên StackBlitz

Để thử nghiệm nhanh, chúng tôi cung cấp một liên kết tiện lợi để tạo một dự án mới sẵn sàng bắt đầu: [engine.needle.tools/new](https://engine.needle.tools/new)
Một bộ sưu tập lớn các ví dụ cũng có sẵn trong [Needle Engine Stackblitz Collection](https://stackblitz.com/@marwie/collections/needle-engine) của chúng tôi.

## Phát triển cục bộ với VS Code

Nếu bạn muốn làm việc với Needle Engine mà không có bất kỳ tích hợp nào, thì bạn sẽ muốn chạy một máy chủ cục bộ cho trang web của mình. Dưới đây là cách bạn có thể làm điều đó với Visual Studio Code:

1. Mở thư mục chứa file HTML của bạn trong Visual Studio Code.
2. Cài đặt extension [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
3. Kích hoạt live-server (có nút "Go Live" ở chân trang của VSCode).
4. Mở ``http://localhost:5500/index.html`` trong trình duyệt web của bạn, nếu nó không tự động mở.


## three.js và Needle Engine

Vì Needle Engine sử dụng [three.js](https://threejs.org/) làm scene graph và thư viện render, tất cả chức năng từ three.js cũng có sẵn trong Needle và có thể được sử dụng từ các component script. Chúng tôi đang sử dụng một fork của three.js bao gồm các tính năng và cải tiến bổ sung, đặc biệt liên quan đến WebXR, Animation và USDZ export.


::: tip
Đảm bảo cập nhật đường dẫn ``<needle-engine src="myScene.glb">`` đến một file glb hiện có
hoặc [tải xuống file glb mẫu này](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb) và đặt nó vào cùng thư mục với index.html, đặt tên là ``myScene.glb`` hoặc cập nhật đường dẫn src.
:::

@[code](@code/basic-html.html)


[Xem trên github](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla)

Trang được dịch tự động bằng AI