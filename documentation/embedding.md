# Needle Engine on your Website

Needle Engine can be used to create new web apps, and can also be integrated into existing websites. In both cases, you'll want to _upload_ your project's distribution folder to a web hoster to make them accessible to the world. 

There are several ways to integrate Needle Engine with your website. Which one is better depends on a number of factors, like complexity of your project, if you're using custom scripts or only core components, how much control you have over the target website, what the "trust level" is between you and the target website, and so on.


The two most common workflows are:
1. [Using the "Deploy to ..." components](#using-the-deploy-to-...-components)
2. [Embedding a Needle project into an existing website](#embedding-a-needle-project-into-an-existing-website)

## Quickstart
::: tip Try it out now!

If you want to quickly try out how projects made with Needle will look on your website, just add these two lines anywhere on your page for testing: 
::: 

:::: code-group
::: code-group-item Embedding Needle
```html
<script type="module" src="https://unpkg.com/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb"></needle-engine>
```
:::
::: code-group-item Using an iframe
```html
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px">
</iframe>
```
:::
::: code-group-item Result
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px" style="border:0; outline: 0;">
</iframe>
::::

## Using the "Deploy to ..." components

Our Needle Engine integrations ship with built-in deployment options. You can deploy your project to Needle Cloud, FTP servers, Glitch, Itch.io, GitHub Pages, and more with just a few clicks. 

See the [Deployment](./deployment.md) section for more information on each of these options.

1. Add the "Deploy to ..." component you want to use to your scene in Unity or Blender.
2. Configure the necessary options and click on "Deploy".
3. That's it! Your project is now live.

:::tip Recommended Workflow
This is the easiest option, and recommended for most workflows – it's very fast! You can iteratively work on your project on your computer, and then upload a new version to the web in seconds.
:::

## Uploading a production build as web app

If you don't want to use our "Deploy to..." components, or there's no component for your particlar workflow, you can do the same process manually. The resulting web app will be identical to what you see in your local server while working on the project. 

1. Make a production build of your web project. This will create a `dist/` folder with all necessary files, ready for distribution. It contains all necessary files, including the JavaScript bundle, the HTML file, and any other assets like textures, audio, or video files.

2. Upload the content of the `dist/` folder from your Web Project to your web hoster. You can do this via FTP, SFTP, or any other file transfer method your hoster provides. Look at the documentation of your web hoster for details. 

3. That's it! Your web app is now live.


::: tip The folder location influences the URL of your web app.
Depending on your hoster's settings, the folder location and name determine what the URL of your web app is. Here's an example:
- Your domain `https://your-website.com/` points at the folder `/var/www/html` on your webspace.
- You upload your files to `/var/www/html/my-app` so that the `index.html` file is at `/var/www/html/my-app/index.html`.
- The URL of your web app is now `https://your-website.com/my-app/`.
:::

## Embedding a Needle project into an existing website

In some cases, you want a Needle Engine project to be part of an existing web site, for example as a part of a blog post, a product page, or a portfolio. The process is very similar, but instead of uploading the files to the root of your web space, you _embed_ the project into an existing website with a few lines of code.

1. Make a production build of your web project. This will create a `dist/` folder with all necessary files, ready for distribution. It contains all necessary files, including the JavaScript bundle, the HTML file, and any other assets like textures, audio, or video files.

2. Upload the `dist/` folder from your Web Project to your web hoster. 
    ::: tip The folder can be hosted anywhere!
    If you don't have access to your web hoster's file system, or no way to upload files there, you can upload the folder to any other webspace and  use the public URL of that in the next step.
    :::

3. Inside your `dist` folder, you'll find an `index.html` file. We want to copy some lines from this folder, so open the file in a text editor. Typically, it looks like this:  
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

    There are two important lines here: 
    - the JavaScript bundle inside `<script>`, 
    - the `<needle-engine>` HTML tag.

4. On the target website, add the `<script...>` and `<needle-engine...>` tags as well. Make sure that the paths point at the location where you have uploaded the files to. 
    ```html
    <script type="module" src="/your-upload-folder/assets/index-732f0764.js"></script>
    <needle-engine src="/your-upload-folder/assets/scene.glb"></needle-engine>
    ```

5. That's it! The scene should now be displayed on your website.

## Embedding a Needle project as iframe

When you have limited access to a website, for example when you're using a CMS like WordPress, you can use an iframe to embed a Needle Engine scene into your website. You may know this workflow from embedding YouTube videos or Sketchfab models.

1. Make a production build of your web project. This will create a `dist/` folder with all necessary files, ready for distribution. 

2. Upload the `dist/` folder from your Web Project to your web hoster.
    ::: tip The folder can be hosted anywhere!
    If you don't have access to your web hoster's file system, or no way to upload files there, you can upload the folder to any other webspace and  use the public URL of that in the next step.
    :::

3. Add an iframe to your website, pointing to the `index.html` file in the `dist/` folder. 
    ```html
    <iframe
        src="https://your-website.com/needle-files/dist/index.html" 
        allow="xr; xr-spatial-tracking; fullscreen;">
    </iframe>
    ```


    ::: tip Permissions inside iframes
    The list inside `allow=` depends on the features your web app uses. For example, XR applications require `xr` and `xr-spatial-tracking` to work inside iframes. 

    There may be additional features needed, for example `camera; microphone; display-capture; geolocation`. See [the full list of iframe Permissions Policy directives on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy#directives).
    :::

4. That's it! The scene should now be displayed on your website.

## Embedding scenes that use no custom scripts

When your project uses only core components and no custom scripts, you can directly use Needle Engine from a CDN (content-delivery network).

1. Add the following snippet to your website, for example as "HTML Block" in your CMS:
    ```html
    <script type="module" src="https://unpkg.com/@needle-tools/engine/dist/needle-engine.min.js"></script>
    <needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb" background-blurriness="0.8"></needle-engine>
    ```
2. Upload the `assets/` folder from your Web Project to your web hoster. Depending on your project settings, this folder contains one or more `.glb` files and any number of other files like audio, video, skybox and more. 

3. Change the `src=` attribute of the `needle-engine` tag to the URL of the `.glb` file you want to display. Typically, this will be some path like `https://your-website.com/assets/MyScene.glb`. 

4. That's it! The scene should now be displayed on your website.

## Embedding a Needle Cloud web app as iframe 

If you deployed your project to Needle Cloud, you can easily display it on your own website with an iframe.  

::: warning <b>Under construction.</b> This section is not yet complete.
:::

# Web Hoster Integrations

## Wordpress

1. Decide on the method you want to use to embed your Needle Engine project. You can either use the "Embedding a Needle project into an existing website" method, or the "Embedding a Needle project as iframe" method.

2. Upload the content of the `dist/` folder from your Web Project to your web hoster. Usually, the Wordpress uploads directory is located at `wp-content/uploads/`. 

    ::: tip Wordpress Backups
    You can decide if your new project should be at `wp-content/uploads/my-project/`, or at a different location like `my-projects/my-project`. This affects if and how your project will be contained in Wordpress backups.
    :::

3. In the page you want to add Needle Engine to, add a `HTML` block and paste the code snippet as outlined above – either as script embed, or as iframe.

## Shopify

::: warning <b>Under construction.</b> Needs to be documented.
:::

## Wix

::: warning <b>Under construction.</b> Needs to be documented.
:::

## Webflow

::: warning <b>Under construction.</b> Needs to be documented.
:::