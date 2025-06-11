---
title: Frameworks, Bundlers, HTML
---

## Bundlers và frontend web

Needle Engine được xây dựng dưới dạng web component.
Điều này có nghĩa là chỉ cần cài đặt `@needle-tools/engine` trong dự án của bạn và bao gồm `<needle-engine src="path/to/your.glb">` ở bất cứ đâu trong dự án web của bạn.

- Cài đặt bằng npm:
  `npm i @needle-tools/engine`

Với template dự án mặc định dựa trên Vite của chúng tôi, Needle Engine được đóng gói thành một ứng dụng web khi triển khai. Điều này đảm bảo các file nhỏ hơn, tree-shaking (tương tự như code stripping trong Unity) và tối ưu hóa thời gian tải. Thay vì tải xuống vô số script và component nhỏ, chỉ một hoặc vài file được tải xuống chứa mã tối thiểu cần thiết.

Vite (bundler mặc định của chúng tôi) có giải thích tốt về lý do tại sao các ứng dụng web nên được đóng gói: [Why Bundle for Production](https://vitejs.dev/guide/why.html)

### Vite, Vue, React, Svelte, React Three Fiber...

Needle Engine không bị ràng buộc về lựa chọn framework. Template mặc định của chúng tôi sử dụng [vite](https://vitejs.dev) phổ biến làm bundler. Từ đó, bạn có thể thêm vue, svelte, nuxt, react, react-three-fiber hoặc các framework khác, và chúng tôi có các mẫu cho nhiều framework trong số đó. Bạn cũng có thể tích hợp các bundler khác hoặc không sử dụng bundler nào cả – chỉ cần HTML và Javascript thuần.

Dưới đây là một số stack công nghệ ví dụ có thể sử dụng và chúng tôi sử dụng Needle Engine với:

- **Vite + HTML** — Đây là template mặc định của chúng tôi sử dụng!

- **Vite + Vue** — Đây là những gì website [Needle Tools](https://needle.tools) sử dụng! Tìm mẫu để tải xuống [tại đây](https://github.com/needle-tools/needle-engine-samples).
- **Vite + Svelte**
- **Vite + SvelteKit**
- **Vite + React** — Có một template thử nghiệm được đi kèm với tích hợp Unity cho điều này mà bạn có thể chọn khi tạo dự án!
- **react-three-fiber** — Có một template thử nghiệm được đi kèm với tích hợp Unity cho điều này mà bạn có thể chọn khi tạo dự án!
- **Vercel & Nextjs** — Tìm [dự án nextjs ví dụ tại đây](https://github.com/needle-engine/nextjs-sample)
- **CDN without any bundler** — Tìm ví dụ code [tại đây](./vanilla-js.md)

Tóm lại: hiện tại chúng tôi đang cung cấp một template vite tối thiểu, nhưng bạn có thể mở rộng hoặc chuyển sang các framework khác –
Hãy cho chúng tôi biết bạn xây dựng gì và như thế nào, và làm thế nào chúng tôi có thể cải thiện trải nghiệm cho trường hợp sử dụng của bạn hoặc cung cấp một ví dụ!

:::tip
Một số framework yêu cầu cài đặt tùy chỉnh trong `needle.config.json`. Tìm hiểu thêm [tại đây](./reference/needle-config-json.md). Thông thường, `baseUrl` cần được thiết lập.
:::

:::details Làm thế nào để tạo template dự án tùy chỉnh trong Unity?

Bạn có thể tạo và chia sẻ các template dự án web của riêng mình để sử dụng các bundler, hệ thống build khác hoặc không sử dụng gì cả.

**Tạo Template mới**
1. Chọn `Create/Needle Engine/Project Template` để thêm ProjectTemplate vào thư mục bạn muốn sử dụng làm template
2. Hoàn tất! Thật đơn giản.

Các dependency đến từ unity khi có một NpmDef trong dự án (nghĩa là khi dự án của bạn sử dụng các tham chiếu cục bộ).
Bạn cũng có thể publish các package của mình lên npm và tham chiếu chúng qua số phiên bản.
:::

### Tree-shaking để giảm kích thước bundle

Tree shaking đề cập đến một kỹ thuật phổ biến trong việc đóng gói các ứng dụng web ([xem tài liệu MSDN](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)). Điều này có nghĩa là các đường dẫn code và tính năng không được sử dụng trong code của bạn sẽ bị loại bỏ khỏi file javascript được đóng gói cuối cùng để giảm kích thước file. Xem bên dưới về các tính năng mà Needle Engine bao gồm và cách loại bỏ chúng:

:::details Làm thế nào để loại bỏ Rapier physics engine? (Giảm kích thước bundle tổng thể khoảng ~2MB (~600KB khi gzipping))

- **Tùy chọn 1**: qua config needlePlugins:
  Đặt `useRapier` thành `false` trong vite.config của bạn: `needlePlugins(command, needleConfig, { useRapier: false }),`

- **Tùy chọn 2**: qua config vite.define:
  Khai báo define `NEEDLE_USE_RAPIER` với `false`
  ```js
  define: {
    NEEDLE_USE_RAPIER: false
  },
  ```

- **Tùy chọn 3**: qua .env
  Tạo một file `.env` trong dự án web của bạn và thêm `VITE_NEEDLE_USE_RAPIER=false`

- **Tùy chọn 4**: qua component Unity
  Thêm component `Needle Engine Modules` vào scene của bạn và đặt `Physics Engine` thành `None`
  ![](/imgs/unity-needle-engine-modules-physics.jpg)

:::

### Tạo PWA

Chúng tôi hỗ trợ tạo Progressive Web App (PWA) một cách dễ dàng trực tiếp từ template vite của chúng tôi.
PWA là các ứng dụng web tải giống như các trang web thông thường nhưng có thể cung cấp chức năng cho người dùng như làm việc offline, thông báo đẩy (push notifications) và truy cập phần cứng thiết bị mà theo truyền thống chỉ có trên các ứng dụng di động native.

Theo mặc định, PWA được tạo bằng Needle có hỗ trợ offline và tùy chọn tự động làm mới khi bạn publish phiên bản mới của ứng dụng.

1) Cài đặt [plugin Vite PWA](https://vite-pwa-org.netlify.app/) trong dự án web của bạn: `npm install vite-plugin-pwa --save-dev`
2) Sửa đổi `vite.config.js` như hình dưới đây. Đảm bảo truyền cùng đối tượng `pwaOptions` cho cả `needlePlugins` và `VitePWA`.

```js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async ({ command }) => {

    // Create the pwaOptions object.
    // You can edit or enter PWA settings here (e.g. change the PWA name or add icons).
    /** @type {import("vite-plugin-pwa").VitePWAOptions} */
    const pwaOptions = {};

    const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");

    return {
        plugins: [
            // pass the pwaOptions object to the needlePlugins and the VitePWA function
            needlePlugins(command, needleConfig, { pwa: pwaOptions }),
            VitePWA(pwaOptions),
        ],
        // the rest of your vite config...
```

:::tip Tất cả asset đều được cache theo mặc định
Lưu ý rằng theo mặc định, tất cả các asset trong thư mục build của bạn đều được thêm vào precache của PWA – đối với các ứng dụng lớn với nhiều asset động, đây có thể không phải là điều bạn muốn (hãy tưởng tượng PWA YouTube lưu cache tất cả video khi người dùng mở ứng dụng!). Xem [Các tùy chọn PWA khác](#more-pwa-options) để biết cách tùy chỉnh hành vi này.
:::

### Kiểm tra PWA

Để kiểm tra PWA của bạn, hãy deploy trang, ví dụ sử dụng component `DeployToFTP`.
Sau đó, mở trang đã deploy trong trình duyệt và kiểm tra xem các tính năng PWA có hoạt động như mong đợi không:
- ứng dụng hiển thị có thể cài đặt được
- ứng dụng hoạt động offline
- ứng dụng được [pwabuilder.com](https://pwabuilder.com/) phát hiện là PWA có khả năng offline

PWA sử dụng Service Worker để cache tài nguyên và cung cấp hỗ trợ offline. Service Worker hơi khó sử dụng hơn trong quá trình phát triển và thường chỉ được bật cho các bản build (ví dụ: khi bạn sử dụng component `DeployTo...`).

Bạn có thể bật hỗ trợ PWA cho quá trình phát triển bằng cách thêm đoạn sau vào đối tượng options trong `vite.config.js` của bạn.

```js
const pwaOptions = {
  // Note: PWAs behave different in dev mode.
  // Make sure to verify the behaviour in production builds!
  devOptions: {
    enabled: true,
  }
};
```

Xin lưu ý rằng PWA ở chế độ phát triển không hỗ trợ sử dụng offline – thử nó có thể dẫn đến hành vi không mong muốn.

### Tự động cập nhật ứng dụng đang chạy

Các website thường hiển thị nội dung mới hoặc cập nhật khi refresh trang.

Trong một số trường hợp, bạn có thể muốn trang tự động làm mới và tải lại khi có phiên bản mới được publish – chẳng hạn như ở bảo tàng, triển lãm thương mại, màn hình công cộng hoặc các kịch bản chạy dài khác.

Để bật tự động cập nhật, đặt thuộc tính `updateInterval` trong đối tượng pwaOptions thành một khoảng thời gian (tính bằng mili giây) mà ứng dụng nên kiểm tra cập nhật. Nếu phát hiện cập nhật, trang sẽ tự động tải lại.

```js
const pwaOptions = {
  updateInterval: 15 * 60 * 1000, // 15 minutes, in milliseconds
};
```

:::tip Tải lại Định kỳ và Dữ liệu Người dùng
Không nên sử dụng tự động tải lại trong các ứng dụng nơi người dùng đang tương tác với các biểu mẫu hoặc dữ liệu khác có thể bị mất khi tải lại. Đối với các ứng dụng này, nên hiển thị lời nhắc tải lại.
Xem tài liệu [plugin Vite PWA](https://vite-pwa-org.netlify.app/guide/prompt-for-update.html) để biết thêm thông tin về cách triển khai lời nhắc tải lại thay vì tự động tải lại.
:::

### Các tùy chọn PWA khác

Vì Needle sử dụng [plugin Vite PWA](https://vite-pwa-org.netlify.app/), bạn có thể sử dụng tất cả các tùy chọn và hook được cung cấp bởi plugin đó.
Ví dụ, bạn có thể cung cấp một manifest một phần với tiêu đề ứng dụng hoặc màu chủ đề tùy chỉnh:

```js
const pwaOptions = {
  // manifest options provided here will override the defaults
  manifest: {
    name: "My App",
    short_name: "My App",
    theme_color: "#B2D464",
  }
};
```

Đối với các yêu cầu phức tạp như cache một phần, Service Worker tùy chỉnh hoặc các chiến lược cập nhật khác nhau, bạn có thể xóa tùy chọn `{ pwa: pwaOptions }` khỏi `needlePlugins` và thêm chức năng PWA trực tiếp thông qua plugin Vite PWA.

## Truy cập Needle Engine và Components từ javascript bên ngoài

Code mà bạn expose có thể được truy cập từ JavaScript sau khi đóng gói. Điều này cho phép xây dựng các trình xem (viewer) và các ứng dụng khác nơi có sự phân tách giữa dữ liệu đã biết khi chỉnh sửa và dữ liệu chỉ biết khi chạy (ví dụ: các file được tải động, nội dung do người dùng tạo).
Để truy cập các component từ javascript thông thường bên ngoài engine, vui lòng tham khảo phần [interop với javascript thông thường](./scripting.md#accessing-needle-engine-and-components-from-anywhere)

## Tùy chỉnh giao diện loading

Xem phần *Loading Display* trong [tham khảo component needle engine](./reference/needle-engine-attributes.md)

### Các style tích hợp

Giao diện loading của needle-engine có thể sử dụng skin sáng hoặc tối.
Để thay đổi giao diện, sử dụng thuộc tính `loading-style` trên web component `<needle-engine>`.
Các tùy chọn là `light` (sáng) và `dark` (tối) (mặc định):

``<needle-engine loading-style="light"></needle-engine>``

### Style Loading Tùy chỉnh — *Tính năng PRO* #

Vui lòng xem phần *Loading Display* trong [tham khảo component needle engine](./reference/needle-engine-attributes.md)

![custom loading](/imgs/custom-loading-style.webp)

Trang được dịch tự động bằng AI