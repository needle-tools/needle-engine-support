# Needle Engine trên Trang web của bạn

Needle Engine có thể được sử dụng để tạo các ứng dụng web mới và cũng có thể được tích hợp vào các trang web hiện có. Trong cả hai trường hợp, bạn sẽ muốn _tải lên_ thư mục distribution của dự án lên web hoster để làm cho chúng có thể truy cập được với mọi người.

Có một số cách để tích hợp Needle Engine với trang web của bạn. Cách nào tốt hơn phụ thuộc vào một số yếu tố, như độ phức tạp của dự án, liệu bạn có sử dụng custom scripts hay chỉ core components, mức độ kiểm soát bạn có đối với trang web đích, mức độ "trust level" giữa bạn và trang web đích, v.v.

## Thử nghiệm

Nếu bạn muốn nhanh chóng thử xem các dự án được tạo bằng Needle sẽ trông như thế nào trên trang web của mình, chỉ cần thêm hai dòng này vào bất kỳ đâu trên trang của bạn để thử nghiệm:

:::: code-group
::: code-group-item Option 1: Embedding Needle
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb"></needle-engine>
```
:::
::: code-group-item Option 2: Using an iframe
```html
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px">
</iframe>
```
:::
::: code-group-item Resulting Website
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px" style="border:0; outline: 0;">
</iframe>
::::

# Các cách tạo ứng dụng web với Needle

Các quy trình làm việc phổ biến nhất để đưa Needle Engine lên trang web của bạn là:
1. [Sử dụng các component "Deploy to ..."](#using-the-deploy-to-...-components)
2. [Tải ứng dụng web của bạn lên một thư mục](#uploading-your-web-app-to-a-folder)
3. [Nhúng dự án Needle vào một trang web hiện có](#embedding-a-needle-project-into-an-existing-website)

## Sử dụng các component "Deploy to ..."

Các bản tích hợp Needle Engine của chúng tôi đi kèm với các tùy chọn triển khai tích hợp. Bạn có thể triển khai dự án của mình lên Needle Cloud, FTP servers, Glitch, Itch.io, GitHub Pages, và nhiều hơn nữa chỉ với vài cú nhấp chuột.

Xem phần [Deployment](./deployment.md) để biết thêm thông tin về từng tùy chọn này.

1. Thêm component "Deploy to ..." mà bạn muốn sử dụng vào scene của mình trong Unity hoặc Blender.
2. Cấu hình các tùy chọn cần thiết và nhấp vào "Deploy".
3. Xong! Dự án của bạn hiện đã hoạt động.

:::tip Quy trình làm việc được đề xuất
Đây là tùy chọn dễ nhất và được khuyến nghị cho hầu hết các quy trình làm việc – nó rất nhanh! Bạn có thể lặp đi lặp lại làm việc trên dự án của mình trên máy tính, sau đó tải phiên bản mới lên web chỉ trong vài giây.
:::

## Tải ứng dụng web của bạn lên một thư mục

Nếu bạn không muốn sử dụng các component "Deploy to..." của chúng tôi hoặc không có component nào phù hợp với quy trình làm việc cụ thể của bạn, bạn có thể thực hiện quy trình tương tự theo cách thủ công. Ứng dụng web kết quả sẽ giống hệt những gì bạn thấy trong local server khi đang làm việc trên dự án.

1. Tạo production build cho dự án web của bạn. Điều này sẽ tạo ra một thư mục `dist/` với tất cả các tệp cần thiết, sẵn sàng để phân phối. Nó chứa tất cả các tệp cần thiết, bao gồm JavaScript bundle, tệp HTML và bất kỳ tài sản nào khác như textures, audio, hoặc video files.

2. Tải nội dung của thư mục `dist/` từ Web Project của bạn lên web hoster của bạn. Bạn có thể thực hiện việc này qua FTP, SFTP hoặc bất kỳ phương thức truyền tệp nào khác mà hoster của bạn cung cấp. Hãy xem tài liệu của web hoster của bạn để biết chi tiết.

3. Xong! Ứng dụng web của bạn hiện đã hoạt động.

::: tip Vị trí thư mục ảnh hưởng đến URL của ứng dụng web của bạn.
Tùy thuộc vào cài đặt của hoster, vị trí và tên thư mục sẽ xác định URL của ứng dụng web của bạn là gì. Dưới đây là một ví dụ:
- Domain của bạn `https://your-website.com/` trỏ đến thư mục `/var/www/html` trên webspace của bạn.
- Bạn tải tệp của mình lên `/var/www/html/my-app` sao cho tệp `index.html` nằm ở `/var/www/html/my-app/index.html`.
- URL của ứng dụng web của bạn hiện là `https://your-website.com/my-app/`.
:::

## Nhúng dự án Needle vào một trang web hiện có

Trong một số trường hợp, bạn muốn một dự án Needle Engine trở thành một phần của một trang web hiện có, ví dụ như một phần của một bài đăng blog, một trang sản phẩm hoặc một portfolio. Quy trình này rất giống nhau, nhưng thay vì tải tệp lên thư mục gốc của web space, bạn _nhúng_ dự án vào một trang web hiện có với vài dòng code.

1. Tạo production build cho dự án web của bạn. Điều này sẽ tạo ra một thư mục `dist/` với tất cả các tệp cần thiết, sẵn sàng để phân phối. Nó chứa tất cả các tệp cần thiết, bao gồm JavaScript bundle, tệp HTML và bất kỳ tài sản nào khác như textures, audio, hoặc video files.

2. Tải thư mục `dist/` từ Web Project của bạn lên web hoster của bạn.
    ::: tip Thư mục có thể được lưu trữ ở bất kỳ đâu!
    Nếu bạn không có quyền truy cập vào hệ thống tệp của web hoster hoặc không có cách nào để tải tệp lên đó, bạn có thể tải thư mục lên bất kỳ webspace nào khác và sử dụng public URL của thư mục đó trong bước tiếp theo.
    :::

3. Bên trong thư mục `dist`, bạn sẽ tìm thấy một tệp `index.html`. Chúng ta muốn sao chép một số dòng từ thư mục này, vì vậy hãy mở tệp trong một trình soạn thảo văn bản. Thông thường, nó sẽ trông như thế này:
    ```html
    <head>
        ...
        <script type="module" crossorigin src="./assets/index-732f0764.js"></script>
        ...
    </head>
    <body>
        <needle-engine src="assets/scene.glb"></needle-engine>
    </body>
    ```

    Có hai dòng quan trọng ở đây:
    - JavaScript bundle bên trong `<script>`,
    - thẻ HTML `<needle-engine>`.

4. Trên trang web đích, thêm các thẻ `<script...>` và `<needle-engine...>` vào. Đảm bảo rằng các paths trỏ đến vị trí bạn đã tải tệp lên.
    ```html
    <script type="module" src="/your-upload-folder/assets/index-732f0764.js"></script>
    <needle-engine src="/your-upload-folder/assets/scene.glb"></needle-engine>
    ```

5. Xong! Scene hiện đã hiển thị trên trang web của bạn.

## Nhúng dự án Needle dưới dạng iframe

Khi bạn có quyền truy cập hạn chế vào một trang web, ví dụ khi bạn sử dụng một CMS như WordPress, bạn có thể sử dụng iframe để nhúng một scene Needle Engine vào trang web của mình. Bạn có thể quen thuộc với quy trình làm việc này từ việc nhúng YouTube videos hoặc Sketchfab models.

1. Tạo production build cho dự án web của bạn. Điều này sẽ tạo ra một thư mục `dist/` với tất cả các tệp cần thiết, sẵn sàng để phân phối.

2. Tải thư mục `dist/` từ Web Project của bạn lên web hoster của bạn.
    ::: tip Thư mục có thể được lưu trữ ở bất kỳ đâu!
    Nếu bạn không có quyền truy cập vào hệ thống tệp của web hoster hoặc không có cách nào để tải tệp lên đó, bạn có thể tải thư mục lên bất kỳ webspace nào khác và sử dụng public URL của thư mục đó trong bước tiếp theo.
    :::

3. Thêm một iframe vào trang web của bạn, trỏ đến tệp `index.html` trong thư mục `dist/`.
    ```html
    <iframe
        src="https://your-website.com/needle-files/dist/index.html"
        allow="xr; xr-spatial-tracking; fullscreen;">
    </iframe>
    ```

    ::: tip Quyền bên trong iframes
    Danh sách bên trong `allow=` phụ thuộc vào các tính năng mà ứng dụng web của bạn sử dụng. Ví dụ, các ứng dụng XR yêu cầu `xr` và `xr-spatial-tracking` để hoạt động bên trong iframes.

    Có thể cần thêm các tính năng bổ sung, ví dụ như `camera; microphone; display-capture; geolocation`. Xem [danh sách đầy đủ các chỉ thị Permissions Policy của iframe trên MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy#directives).
    :::

4. Xong! Scene hiện đã hiển thị trên trang web của bạn.

## Nhúng các scene không sử dụng custom scripts

Khi dự án của bạn chỉ sử dụng core components và không có custom scripts, bạn có thể sử dụng trực tiếp Needle Engine từ CDN (content-delivery network).

1. Thêm đoạn mã sau vào trang web của bạn, ví dụ như "HTML Block" trong CMS của bạn:
    ```html
    <script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
    <needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb" background-blurriness="0.8"></needle-engine>
    ```
2. Tải thư mục `assets/` từ Web Project của bạn lên web hoster của bạn. Tùy thuộc vào cài đặt dự án của bạn, thư mục này chứa một hoặc nhiều tệp `.glb` và bất kỳ số lượng tệp nào khác như audio, video, skybox, v.v.

3. Thay đổi thuộc tính `src=` của thẻ `needle-engine` thành URL của tệp `.glb` bạn muốn hiển thị. Thông thường, đây sẽ là một path như `https://your-website.com/assets/MyScene.glb`.

4. Xong! Scene hiện đã hiển thị trên trang web của bạn.

## Nhúng ứng dụng web Needle Cloud dưới dạng iframe

Nếu bạn đã triển khai dự án của mình lên Needle Cloud, bạn có thể dễ dàng hiển thị nó trên trang web của riêng mình bằng một iframe.

::: warning <b>Đang xây dựng.</b> Phần này chưa hoàn chỉnh.
:::

# Quy trình làm việc phổ biến

## Tạo ứng dụng web cho trang web của khách hàng

1. **Hiểu loại ứng dụng bạn đang xây dựng**, và liệu nó có kết nối với trang web hiện có hay không và bằng cách nào.
   Thông thường, bạn đang xây dựng một ứng dụng độc lập có thể truy cập được từ một liên kết trên domain của khách hàng.
   Nhưng cũng có thể có các thành phần server-side và client-side khác liên quan.

2. **Hiểu URL nào ứng dụng web sẽ có thể truy cập được từ đó.**
   Đây có thể là

    - Một trang trên **[Needle Cloud](./cloud/)**
      `collaborativesandbox-zubcks1qdkhy.needle.run`

    - Một **Subpage** trên trang web của khách hàng
      `my-page.com/app`

    - Một **Subdomain** mới
      `app.my-page.com`
    - Một **Domain** mới hoặc hiện có
      `my-app.com`

    ::: tip Không có gì là "tốt" hay "xấu" ở đây.
    Một phương pháp điển hình là bắt đầu trên [Needle Cloud](./cloud/) cho các prototype ban đầu và trong quá trình phát triển, sau đó chuyển sang webspace và domain của khách hàng cho phiên bản cuối cùng.

    Sự lựa chọn chủ yếu phụ thuộc vào yêu cầu của khách hàng về branding, SEO và thiết lập kỹ thuật. Thông thường, bạn sẽ phải thảo luận vấn đề này với bộ phận IT hoặc webmaster của khách hàng.
    :::

3. **Hiểu cách ứng dụng web sẽ được triển khai và duy trì.**
    - Bạn sẽ có quyền truy cập vào một thư mục trên web server của khách hàng để có thể tải lên phiên bản mới nhất, hay họ muốn tự quản lý việc triển khai?
      ::: tip Một phương pháp đơn giản: Truy cập FTP
      Thông thường, bạn có thể yêu cầu quyền truy cập FTP hoặc SFTP vào một thư mục trên web server của khách hàng. Bạn sẽ nhận được URL, username và password, sau đó bạn có thể tải tệp của mình lên thư mục đó. Chúng tôi cung cấp một component "Deploy to FTP" giúp việc này trở nên đặc biệt dễ dàng. Bộ phận IT của khách hàng sẽ thiết lập URL nào có thể truy cập được từ thư mục đó.
        :::

    - Có nhiều nội dung cần cập nhật thường xuyên không, hay ứng dụng chủ yếu là static?
        ::: tip Nội dung Static và Dynamic
        Đối với nội dung chủ yếu là static, việc tải lên một bản build mới theo thời gian thường là đủ. Đối với nội dung dynamic, bạn có thể cần một CMS (content management system) hoặc kết nối database.
        :::
    - Đối tượng mục tiêu đang sử dụng thiết bị và trình duyệt nào?
        ::: tip Tương thích trình duyệt và thử nghiệm
        Mặc dù Needle Engine hoạt động trên tất cả các thiết bị và trình duyệt hiện đại, nhưng luôn là một ý tưởng hay khi thử nghiệm ứng dụng của bạn trên các thiết bị và trình duyệt mà đối tượng mục tiêu của bạn đang sử dụng để đảm bảo mọi thứ hoạt động như mong đợi. Ví dụ, khi tạo ứng dụng AR cho điện thoại, bạn sẽ muốn thử nghiệm trên cả thiết bị Android và iOS.
        :::

4. **Thiết lập dự án, một bản triển khai thử nghiệm và bản triển khai cho khách hàng.**
   Thường là một ý tưởng hay khi thử nghiệm quy trình triển khai sớm, để đảm bảo bạn hiểu cách nó hoạt động và các yêu cầu là gì. Ví dụ, khi bạn đã quyết định sử dụng FTP, thì bạn có thể thiết lập một thư mục thử nghiệm trên web server của riêng mình và thử nghiệm quy trình triển khai ở đó. Khi các thay đổi được khách hàng chấp thuận, bạn có thể triển khai lên server của khách hàng.

5. **Bắt đầu tạo!**
   Với các yêu cầu và việc triển khai đã sẵn sàng, hãy tiếp tục và bắt đầu tạo dự án của bạn! Bạn thường sẽ lặp đi lặp lại local, sau đó triển khai lên server thử nghiệm để được chấp thuận, và sau đó là server của khách hàng.

## Wordpress

1. Quyết định phương pháp bạn muốn sử dụng để nhúng dự án Needle Engine của mình. Bạn có thể sử dụng phương pháp "Nhúng dự án Needle vào một trang web hiện có" hoặc phương pháp "Nhúng dự án Needle dưới dạng iframe".

2. Tải nội dung của thư mục `dist/` từ Web Project của bạn lên web hoster của bạn. Thông thường, thư mục Wordpress uploads nằm tại `wp-content/uploads/`.

    ::: tip Sao lưu Wordpress
    Bạn có thể quyết định liệu dự án mới của mình nên nằm ở `wp-content/uploads/my-project/`, hay ở một vị trí khác như `my-projects/my-project`. Điều này ảnh hưởng đến việc dự án của bạn có được chứa trong các bản sao lưu Wordpress hay không và bằng cách nào.
    :::

3. Trong trang bạn muốn thêm Needle Engine vào, thêm một khối `HTML` và dán đoạn mã như đã nêu ở trên – dưới dạng script embed hoặc iframe.

## Shopify

::: warning <b>Đang xây dựng.</b> Cần được ghi lại.
:::

## Wix

::: warning <b>Đang xây dựng.</b> Cần được ghi lại.
:::

## Webflow

::: warning <b>Đang xây dựng.</b> Cần được ghi lại.
:::

Page automatically translated using AI