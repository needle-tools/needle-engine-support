# Needle Engine on your Website

Needle Engine can be used to create new web apps, and can also be integrated int
o existing websites. In both cases, you'll want to _upload_ your project's distr
ibution folder to a web hoster to make them accessible to the world.

There are several ways to integrate Needle Engine with your website. Which one i
s better depends on a number of factors, like complexity of your project, if you
're using custom scripts or only core components, how much control you have over
 the target website, what the "trust level" is between you and the target websit
e, and so on.

## Try it out

If you want to quickly try out how projects made with Needle will look on your w
ebsite, just add these two lines anywhere on your page for testing:

::: code-tabs
@tab Option 1: Embedding Needle
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dis
t/needle-engine.min.js"></script>
<needle-engine src="https://cloud.needle.tools/-/assets/ZUBcksQ0gIz-latest-optim
ized/file"></needle-engine>
```
@tab Option 2: Using an iframe
```html
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px">
</iframe>
```
@tab Resulting Website
<iframe src="https://musicalinstrument-zubcksz1usd7h-z1usd7h.needle.run/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px" sty
le="border:0; outline: 0;">
</iframe>
:::

# Ways to create web apps with Needle

The most common workflows to bring Needle Engine to your website are:
1. [Using the "Deploy to ..." components](#using-the-deploy-to-...-components)
2. [Uploading your web app to a folder](#uploading-your-web-app-to-a-folder)
3. [Embedding a Needle project into an existing website](#embedding-a-needle-pro
ject-into-an-existing-website)

## Using the "Deploy to ..." components

Our Needle Engine integrations ship with built-in deployment options. You can de
ploy your project to Needle Cloud, FTP servers, Glitch, Itch.io, GitHub Pages, a
nd more with just a few clicks.

See the [Deployment](./deployment.md) section for more information on each of th
ese options.

1. Add the "Deploy to ..." component you want to use to your scene in Unity or B
lender.
2. Configure the necessary options and click on "Deploy".
3. That's it! Your project is now live.

:::tip Recommended Workflow
This is the easiest option, and recommended for most workflows – it's very fast!
 You can iteratively work on your project on your computer, and then upload a ne
w version to the web in seconds.
:::

## Uploading your web app to a folder

If you don't want to use our "Deploy to..." components, or there's no component
for your particlar workflow, you can do the same process manually. The resulting
 web app will be identical to what you see in your local server while working on
 the project.

1. Make a production build of your web project. This will create a `dist/` folde
r with all necessary files, ready for distribution. It contains all necessary fi
les, including the JavaScript bundle, the HTML file, and any other assets like t
extures, audio, or video files.

2. Upload the content of the `dist/` folder from your Web Project to your web ho
ster. You can do this via FTP, SFTP, or any other file transfer method your host
er provides. Look at the documentation of your web hoster for details.

3. That's it! Your web app is now live.


::: tip The folder location influences the URL of your web app.
Depending on your hoster's settings, the folder location and name determine what
 the URL of your web app is. Here's an example:
- Your domain `https://your-website.com/` points at the folder `/var/www/html` o
n your webspace.
- You upload your files to `/var/www/html/my-app` so that the `index.html` file
is at `/var/www/html/my-app/index.html`.
- The URL of your web app is now `https://your-website.com/my-app/`.
:::

## Embedding a Needle project into an existing website

In some cases, you want a Needle Engine project to be part of an existing web si
te, for example as a part of a blog post, a product page, or a portfolio. The pr
ocess is very similar, but instead of uploading the files to the root of your we
b space, you _embed_ the project into an existing website with a few lines of co
de.

1. Make a production build of your web project. This will create a `dist/` folde
r with all necessary files, ready for distribution. It contains all necessary fi
les, including the JavaScript bundle, the HTML file, and any other assets like t
extures, audio, or video files.

2. Upload the `dist/` folder from your Web Project to your web hoster.
    ::: tip The folder can be hosted anywhere!
    If you don't have access to your web hoster's file system, or no way to uplo
ad files there, you can upload the folder to any other webspace and  use the pub
lic URL of that in the next step.
    :::

3. Inside your `dist` folder, you'll find an `index.html` file. We want to copy
some lines from this folder, so open the file in a text editor. Typically, it lo
oks like this:
    ```html
    <head>
        ...
        <script type="module" crossorigin src="./assets/index-732f0764.js"></scr
ipt>
        ...
    </head>
    <body>
        <needle-engine src="assets/scene.glb"></needle-engine>
    </body>
    ```

    There are two important lines here:
    - the JavaScript bundle inside `<script>`,
    - the `<needle-engine>` HTML tag.

4. On the target website, add the `<script...>` and `<needle-engine...>` tags as
 well. Make sure that the paths point at the location where you have uploaded th
e files to.
    ```html
    <script type="module" src="/your-upload-folder/assets/index-732f0764.js"></s
cript>
    <needle-engine src="/your-upload-folder/assets/scene.glb"></needle-engine>
    ```

5. That's it! The scene should now be displayed on your website.

## Embedding a Needle project as iframe

When you have limited access to a website (e.g., using a CMS) or want a simple way to integrate, using an iframe is a common approach. This section outlines the general method. **If your project is deployed to Needle Cloud (recommended), the `src` attribute of your iframe will simply be your Needle Cloud project URL.**

The following steps assume a scenario where you might be self-hosting the build output. For Needle Cloud hosting, skip to step 3 and use your Needle Cloud URL as the iframe `src`.

1. Make a production build of your web project. This will create a `dist/` folde
r with all necessary files, ready for distribution.

2. Upload the `dist/` folder from your Web Project to your web hoster if you are self-hosting.
    ::: tip The folder can be hosted anywhere!
    If you don't have access to your web hoster's file system, or no way to uplo
ad files there, you can upload the folder to any other webspace and  use the pub
lic URL of that in the next step. (This step is not necessary if using Needle Cloud).
    :::

3. Add an iframe to your website. If self-hosting, point the `src` to the `index.html` file in the `dist/` folder. **If using Needle Cloud, point the `src` to your Needle Cloud project URL.**
    ```html
    <iframe
        src="YOUR_NEEDLE_CLOUD_URL_OR_SELF_HOSTED_URL"
        style="width: 100%; height: 600px; border: none;"
        allow="xr-spatial-tracking; fullscreen; camera; microphone">
    </iframe>
    ```


    ::: tip Permissions inside iframes
    The list inside `allow=` depends on the features your web app uses. For exam
ple, XR applications require `xr` and `xr-spatial-tracking` to work inside ifram
es.

    There may be additional features needed, for example `camera; microphone; xr
-spatial-tracking; accelerometer; gyroscope; display-capture; geolocation;`. See
 [the full list of iframe Permissions Policy directives on MDN](https://develope
r.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy#directives).
    :::

4. That's it! The scene should now be displayed on your website.

## Embedding scenes that use no custom scripts

When your project uses only core components and no custom scripts, you can direc
tly use Needle Engine from a CDN (content-delivery network).

1. Add the following snippet to your website, for example as "HTML Block" in you
r CMS:
    ```html
    <script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine
/dist/needle-engine.min.js"></script>
    <needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b1
11/MusicalInstrument.glb" background-blurriness="0.8"></needle-engine>
    ```
2. Upload the `assets/` folder from your Web Project to your web hoster. Dependi
ng on your project settings, this folder contains one or more `.glb` files and a
ny number of other files like audio, video, skybox and more.

3. Change the `src=` attribute of the `needle-engine` tag to the URL of the `.gl
b` file you want to display. Typically, this will be some path like `https://you
r-website.com/assets/MyScene.glb`.

4. That's it! The scene should now be displayed on your website.

## Embedding a Needle Cloud web app as iframe

Embedding your Needle Engine project via an iframe, with your application hosted on Needle Cloud, is the recommended and most straightforward method for many platforms and custom websites. This approach ensures your project benefits from Needle Cloud's optimized hosting and delivery.

For detailed, platform-specific instructions on how to do this, please see the following sections:
- [WordPress](#wordpress)
- [Shopify](#shopify)
- [Wix](#wix)
- [Webflow](#webflow)

For other platforms or if you are building a custom website, you can adapt the general principles outlined in the "[Embedding a Needle project as iframe](#embedding-a-needle-project-as-iframe)" section. The key difference when using Needle Cloud is that the `src` attribute of your iframe will be the public URL of your project on Needle Cloud.

# Common Workflows

## Creating a web app for a client's website

1. **Understand what type of app you're building**, and if and how it connects t
o an existing website.
   Often, you're building a standalone app that is accessible from a link on the
 client's domain.
   But there might also be other server-side and client-side components involved
.

2. **Understand which URL the web app should be accessible from.**
  This could either be

    - A page on **[Needle Cloud](./cloud/)**
      `collaborativesandbox-zubcks1qdkhy.needle.run`

    - A **Subpage** on the client's website
      `my-page.com/app`

    - A new **Subdomain**
      `app.my-page.com`
    - A new or existing **Domain**
      `my-app.com`

    ::: tip There's no "good" or "bad" here.
    A typical approach is to start on [Needle Cloud](./cloud/) for initial proto
types and during development, and move to the client's webspace and domain for t
he final version.

    The choice mostly depends on the client's requirements regarding branding, S
EO, and technical setup. Often, you'll have to discuss this with the client's IT
 department or webmaster.
    :::

1. **Understand how the web app will be deployed and maintained.**
    - Will you have access to a folder on the client's web server so you can upl
oad the latest version, or do they want to manage the deployment themselves?
      ::: tip A simple approach: FTP access
      Often, you can ask for FTP or SFTP access to a folder on the client's web
server. You'll get a URL, username, and password, and then you can upload your f
iles to that folder. We provide a "Deploy to FTP" component that makes this part
icularly easy. The client's IT department will set up which URL the folder is ac
cessible from.
        :::

    - Is there a lot of content that needs to be updated regularly, or is the ap
p mostly static?
        ::: tip Static vs. dynamic content
        For mostly static content, it's often enough to upload a new build from
time to time. For dynamic content, you might need a CMS (content management syst
em) or a database connection.
        :::
    - Which devices and browsers are the target audience using?
        ::: tip Browser compatibility and testing
        While Needle Engine works on all modern devices and browsers, it's alway
s a good idea to test your app on the devices and browsers your target audience
is using to make sure everything works as expected. For example, when creating a
n AR app for phones, you'll want to test across Android and iOS devices.
        :::

2. **Set up the project, a test deployment, and client deployment.**
   It's often a good idea to test the deployment process early on, to make sure
you understand how it works and what the requirements are. For example, when you
've decided on using FTP, then you could set up a test folder on your own web se
rver and test the deployment process there. Once changes are approved by the cli
ent, you can then deploy to the client's server.

3. **Start creating!**
   With requirements and deployment in place, go ahead and start making your pro
ject! You'll usually iterate locally, then deploy to your test server for approv
al, and then to the client's server.

## Wordpress

The recommended way to embed a Needle Engine project into your WordPress site is by using an HTML iframe with your project hosted on Needle Cloud.

1.  **Deploy to Needle Cloud**:
    *   In your Needle Engine project (e.g., in Unity), right-click your `*.needle` scene asset and select `Build for Publishing`.
    *   This process builds your project and uploads it to Needle Cloud.
    *   Once completed, your browser will open the Needle Cloud URL for your project. Copy this URL. You can also find all your deployments at [https://needle.tools/cloud](https://needle.tools/cloud).

2.  **Get your public project URL**:
    *   From Needle Cloud, ensure you have the public URL for your deployed project (e.g., `https://your-project-name.needle.run`).

3.  **Embed in WordPress**:
    *   In your WordPress editor (whether using the Gutenberg block editor or the Classic Editor), open the page or post where you want to embed your project.
    *   **Gutenberg Editor**: Click the `+` icon to add a new block, then search for and select the "Custom HTML" block.
    *   **Classic Editor**: Switch to the "Text" mode of the editor.
    *   Paste the following HTML iframe code into the Custom HTML block or Text mode, replacing `YOUR_NEEDLE_CLOUD_URL` with the URL you copied in step 2:
        ```html
        <div style="width: 100%; max-width: 800px; height: 600px; margin: 1em auto;"> <!-- Adjust max-width and height as needed -->
          <iframe
            src="YOUR_NEEDLE_CLOUD_URL"
            style="width: 100%; height: 100%; border: none;"
            allowfullscreen="true"
            allow="xr-spatial-tracking; fullscreen; camera; microphone">
          </iframe>
        </div>
        ```

4.  **Adjust iframe size and permissions**:
    *   You can adjust the `max-width` and `height` values in the `style` attribute of the outer `div` in the HTML snippet to control the size of the embedded project on your page.
    *   The `allow` attribute (`xr-spatial-tracking; fullscreen; camera; microphone`) includes common permissions for interactive and XR experiences. Modify these based on your project's specific requirements. For simple 3D viewers, `allow="fullscreen"` might be sufficient.
    *   Preview or update your WordPress page to see the embedded project.

This method ensures your project is served from Needle Cloud's optimized infrastructure while being neatly displayed on your WordPress site.

## Shopify

Embedding a Needle Engine project hosted on Needle Cloud into your Shopify store typically involves adding a custom HTML section or editing your theme code to include an iframe.

1.  **Deploy to Needle Cloud**:
    *   In your Needle Engine project (e.g., in Unity), right-click your `*.needle` scene asset and select `Build for Publishing`.
    *   This builds your project and uploads it to Needle Cloud.
    *   After completion, your browser opens the Needle Cloud URL for your project. Copy this URL. Find all deployments at [https://needle.tools/cloud](https://needle.tools/cloud).

2.  **Get your public project URL**:
    *   From Needle Cloud, copy the public URL for your deployed project (e.g., `https://your-project-name.needle.run`).

3.  **Embed in Shopify**:
    There are a couple of ways to add custom HTML/iframe to Shopify:

    *   **Using a "Custom HTML" section (Recommended for supported themes)**:
        1.  In your Shopify Admin, go to `Online Store > Themes`.
        2.  Find your theme and click `Customize`.
        3.  Navigate to the page or section where you want to add the project.
        4.  Click `+ Add section` in the sidebar (if available) and look for a "Custom HTML", "HTML", or similar section type.
        5.  Add the section, then paste your iframe code (see step 4 below) into the HTML content field.
        6.  Save your changes.

    *   **Editing theme code (Advanced)**:
        1.  In your Shopify Admin, go to `Online Store > Themes`.
        2.  Find the theme you want to edit, click `Actions > Edit code`.
        3.  Choose a relevant Liquid theme file where you want your project to appear (e.g., `product.liquid` for product pages, or create a new section snippet under the `sections` folder and include it in a template).
        4.  Paste your iframe code (see step 4 below) into the file.
        5.  Save your changes.

4.  **HTML iframe Code**:
    Use the following HTML snippet, replacing `YOUR_NEEDLE_CLOUD_URL` with the URL from step 2:
    ```html
    <div style="width: 100%; height: 600px; margin: 0 auto;"> <!-- Adjust height as needed -->
      <iframe
        src="YOUR_NEEDLE_CLOUD_URL"
        style="width: 100%; height: 100%; border: none;"
        allowfullscreen="true"
        allow="xr-spatial-tracking; fullscreen; camera; microphone">
      </iframe>
    </div>
    ```
    *   The outer `div` helps in managing the iframe's dimensions and centering. Adjust `height: 600px;` as needed.

5.  **Adjust iframe size and permissions**:
    *   Modify the `width` and `height` attributes of the iframe or the surrounding `div` in the HTML snippet to fit your page layout.
    *   The `allow` attribute (`xr-spatial-tracking; fullscreen; camera; microphone`) includes common permissions. Adjust these based on your project's needs. For non-XR projects, `allow="fullscreen"` might be sufficient.
    *   Ensure your Shopify theme's CSS doesn't conflict with the iframe display.

Test your Shopify page to see the embedded Needle Engine project.

## Wix

To embed your Needle Engine project into a Wix website, you'll first deploy it to Needle Cloud and then use an HTML iframe on your Wix page.

1.  **Deploy to Needle Cloud**:
    *   In your Needle Engine project (e.g., in Unity), right-click your `*.needle` scene asset and select `Build for Publishing`.
    *   This will build your project and automatically upload it to Needle Cloud.
    *   Once the upload is complete, your browser will open with the Needle Cloud URL for your project. Copy this URL. You can also find all your deployments at [https://needle.tools/cloud](https://needle.tools/cloud).

2.  **Get your public project URL**:
    *   From Needle Cloud, ensure you have the public URL for your deployed project (e.g., `https://your-project-name.needle.run`).

3.  **Add HTML iframe in Wix Editor**:
    *   Open your Wix site in the Wix Editor.
    *   Click `+ Add` on the left side of the Editor.
    *   Go to `Embed Code` and then select `Embed HTML`. An HTML iframe element will be added to your page.

4.  **Set the iframe source**:
    *   Select the newly added HTML element on your page.
    *   Click `Enter Code`.
    *   In the `What do you want to add?` section, choose `Code`.
    *   In the HTML code box, paste the following, replacing `YOUR_NEEDLE_CLOUD_URL` with the URL you copied in step 2:
        ```html
        <iframe src="YOUR_NEEDLE_CLOUD_URL" width="100%" height="100%" allowfullscreen="" allow="xr-spatial-tracking; fullscreen; camera; microphone"></iframe>
        ```
    *   Click `Update`.

5.  **Adjust iframe size and permissions**:
    *   Resize the iframe element on your Wix page to your desired dimensions.
    *   The `allow` attribute in the iframe code snippet above includes common permissions for interactive and XR experiences (`xr-spatial-tracking`, `fullscreen`, `camera`, `microphone`). Adjust these as necessary for your project's requirements. For basic 3D viewers without XR, you might only need `allow="fullscreen"`. For XR projects, ensure `xr-spatial-tracking` (and potentially `camera` for AR) is included.
    *   Wix may have its own settings for iframe permissions or sandboxing that you might need to check if you encounter issues.

That's it! Your Needle Engine project should now be embedded in your Wix site.

## Webflow

To embed your Needle Engine project in a Webflow site, you'll deploy it to Needle Cloud and then use Webflow's "Embed" element with an iframe.

1.  **Deploy to Needle Cloud**:
    *   In your Needle Engine project (e.g., within Unity), right-click your `*.needle` scene asset.
    *   Select `Build for Publishing`. This action builds your project and uploads it directly to Needle Cloud.
    *   Upon completion, your default web browser will open the Needle Cloud URL for your project. Copy this URL. You can manage all your deployments at [https://needle.tools/cloud](https://needle.tools/cloud).

2.  **Get your public project URL**:
    *   From Needle Cloud, ensure you have the correct public URL for the project version you wish to embed (e.g., `https://your-project-name.needle.run`).

3.  **Add Embed Element in Webflow**:
    *   Open your Webflow project in the Designer.
    *   From the `Add` panel (usually on the left, shortcut `A`), find the `Embed` element under the "Components" section.
    *   Drag and drop the `Embed` element onto your page where you want the project to appear.

4.  **Paste iframe Code**:
    *   With the Embed element selected, a modal dialog titled "HTML Embed Code Editor" will appear.
    *   Paste the following HTML iframe code into the editor, replacing `YOUR_NEEDLE_CLOUD_URL` with the URL you copied in step 2:
        ```html
        <iframe
          src="YOUR_NEEDLE_CLOUD_URL"
          style="width: 100%; height: 100%; border: none;"
          allowfullscreen="true"
          allow="xr-spatial-tracking; fullscreen; camera; microphone"
          loading="lazy">
        </iframe>
        ```
    *   Click `Save & Close`.

5.  **Style the Embed Element**:
    *   The Embed element itself is a div. You need to style it to define the size of your iframe.
    *   Select the Embed element on the canvas.
    *   In the `Style` panel (usually on the right), set the `Width` and `Height` properties (e.g., `Width: 100%`, `Height: 600px`). Ensure the iframe inside takes up 100% of these dimensions as per the `style` attribute in the iframe code.

6.  **Adjust iframe Permissions**:
    *   The `allow` attribute in the iframe code (`xr-spatial-tracking; fullscreen; camera; microphone`) includes common permissions for interactive and XR experiences. Adjust these based on your project's needs. For simple 3D viewers, `allow="fullscreen"` might be sufficient.
    *   The `loading="lazy"` attribute can help with page load performance if the embed is below the fold.

Publish your Webflow site to see the embedded Needle Engine project live.
