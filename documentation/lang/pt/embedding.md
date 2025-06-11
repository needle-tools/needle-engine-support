# Needle Engine no seu Website

O Needle Engine pode ser usado para criar novas aplicações web e também pode ser integrado em websites existentes. Em ambos os casos, irá querer _carregar_ a pasta de distribuição do seu projeto para um web hoster para os tornar acessíveis ao mundo.

Existem várias formas de integrar o Needle Engine com o seu website. Qual é a melhor depende de uma série de fatores, como a complexidade do seu projeto, se está a usar scripts personalizados ou apenas componentes principais, quanto controlo tem sobre o website de destino, qual é o "nível de confiança" entre si e o website de destino, e assim por diante.

## Experimente

Se quiser experimentar rapidamente como os projetos feitos com Needle ficarão no seu website, basta adicionar estas duas linhas em qualquer lugar na sua página para teste:

::: code-tabs
@tab Option 1: Embedding Needle
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="https://cloud.needle.tools/-/assets/ZUBcksQ0gIz-latest-optimized/file"></needle-engine>
```
@tab Option 2: Using an iframe
```html
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px">
</iframe>
```
@tab Resulting Website
<iframe src="https://musicalinstrument-zubcksz1usd7h-z1usd7h.needle.run/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px" style="border:0; outline: 0;">
</iframe>
:::

# Formas de criar aplicações web com Needle

Os fluxos de trabalho mais comuns para levar o Needle Engine para o seu website são:
1. [Usando os componentes "Deploy to ..."](#using-the-deploy-to-...-components)
2. [Carregar a sua aplicação web para uma pasta](#uploading-your-web-app-to-a-folder)
3. [Incorporar um projeto Needle num website existente](#embedding-a-needle-project-into-an-existing-website)

## Usando os componentes "Deploy to ..."

As nossas integrações do Needle Engine vêm com opções de implementação integradas. Pode implementar o seu projeto para Needle Cloud, servidores FTP, Glitch, Itch.io, GitHub Pages e muito mais com apenas alguns cliques.

Consulte a secção [Deployment](./deployment.md) para mais informações sobre cada uma destas opções.

1. Adicione o componente "Deploy to ..." que pretende usar à sua cena no Unity ou Blender.
2. Configure as opções necessárias e clique em "Deploy".
3. É isso! O seu projeto está agora online.

:::tip Fluxo de trabalho recomendado
Esta é a opção mais fácil e recomendada para a maioria dos fluxos de trabalho – é muito rápido! Pode trabalhar iterativamente no seu projeto no seu computador e depois carregar uma nova versão para a web em segundos.
:::

## Carregar a sua aplicação web para uma pasta

Se não quiser usar os nossos componentes "Deploy to...", ou se não houver um componente para o seu fluxo de trabalho específico, pode fazer o mesmo processo manualmente. A aplicação web resultante será idêntica ao que vê no seu servidor local enquanto trabalha no projeto.

1. Faça uma construção de produção do seu projeto web. Isto criará uma pasta `dist/` com todos os ficheiros necessários, pronta para distribuição. Contém todos os ficheiros necessários, incluindo o bundle JavaScript, o ficheiro HTML e quaisquer outros ativos como texturas, áudio ou ficheiros de vídeo.

2. Carregue o conteúdo da pasta `dist/` do seu Projeto Web para o seu web hoster. Pode fazer isto via FTP, SFTP ou qualquer outro método de transferência de ficheiros que o seu hoster forneça. Consulte a documentação do seu web hoster para detalhes.

3. É isso! A sua aplicação web está agora online.


::: tip A localização da pasta influencia o URL da sua aplicação web.
Dependendo das configurações do seu hoster, a localização e o nome da pasta determinam qual é o URL da sua aplicação web. Aqui está um exemplo:
- O seu domínio `https://your-website.com/` aponta para a pasta `/var/www/html` no seu espaço web.
- Carrega os seus ficheiros para `/var/www/html/my-app` para que o ficheiro `index.html` esteja em `/var/www/html/my-app/index.html`.
- O URL da sua aplicação web é agora `https://your-website.com/my-app/`.
:::

## Incorporar um projeto Needle num website existente

Em alguns casos, pretende que um projeto Needle Engine faça parte de um website existente, por exemplo, como parte de uma publicação de blog, uma página de produto ou um portefólio. O processo é muito semelhante, mas em vez de carregar os ficheiros para a raiz do seu espaço web, _incorpora_ o projeto num website existente com algumas linhas de código.

1. Faça uma construção de produção do seu projeto web. Isto criará uma pasta `dist/` com todos os ficheiros necessários, pronta para distribuição. Contém todos os ficheiros necessários, incluindo o bundle JavaScript, o ficheiro HTML e quaisquer outros ativos como texturas, áudio ou ficheiros de vídeo.

2. Carregue a pasta `dist/` do seu Projeto Web para o seu web hoster.
    ::: tip A pasta pode ser alojada em qualquer lugar!
    Se não tiver acesso ao sistema de ficheiros do seu web hoster, ou nenhuma forma de carregar ficheiros para lá, pode carregar a pasta para qualquer outro espaço web e usar o URL público desse no próximo passo.
    :::

3. Dentro da sua pasta `dist`, encontrará um ficheiro `index.html`. Queremos copiar algumas linhas desta pasta, então abra o ficheiro num editor de texto. Tipicamente, tem este aspeto:
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

    Existem duas linhas importantes aqui:
    - o bundle JavaScript dentro de `<script>`,
    - a tag HTML `<needle-engine>`.

4. No website de destino, adicione também as tags `<script...>` e `<needle-engine...>`. Certifique-se de que os caminhos apontam para a localização onde carregou os ficheiros.
    ```html
    <script type="module" src="/your-upload-folder/assets/index-732f0764.js"></script>
    <needle-engine src="/your-upload-folder/assets/scene.glb"></needle-engine>
    ```

5. É isso! A cena deverá agora ser exibida no seu website.

## Incorporar um projeto Needle como iframe

Quando tem acesso limitado a um website, por exemplo, quando está a usar um CMS como o Wordpress, pode usar um iframe para incorporar uma cena Needle Engine no seu website. Pode conhecer este fluxo de trabalho de incorporar vídeos do YouTube ou modelos do Sketchfab.

1. Faça uma construção de produção do seu projeto web. Isto criará uma pasta `dist/` com todos os ficheiros necessários, pronta para distribuição.

2. Carregue a pasta `dist/` do seu Projeto Web para o seu web hoster.
    ::: tip A pasta pode ser alojada em qualquer lugar!
    If you don't have access to your web hoster's file system, or no way to upload files there, you can upload the folder to any other webspace and  use the public URL of that in the next step.
    :::

3. Adicione um iframe ao seu website, apontando para o ficheiro `index.html` na pasta `dist/`.
    ```html
    <iframe
        src="https://your-website.com/needle-files/dist/index.html"
        allow="xr; xr-spatial-tracking; fullscreen;">
    </iframe>
    ```


    ::: tip Permissões dentro de iframes
    A lista dentro de `allow=` depends on the features your web app uses. For example, XR applications require `xr` and `xr-spatial-tracking` to work inside iframes.

    There may be additional features needed, for example `camera; microphone; xr-spatial-tracking; accelerometer; gyroscope; display-capture; geolocation;`. See [the full list of iframe Permissions Policy directives on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy#directives).
    :::

4. É isso! The scene should now be displayed on your website.

## Incorporar cenas que não usam scripts personalizados

Quando o seu projeto usa apenas componentes principais e nenhum script personalizado, pode usar diretamente o Needle Engine a partir de um CDN (content-delivery network).

1. Adicione o seguinte snippet ao seu website, for example as "HTML Block" in your CMS:
    ```html
    <script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
    <needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb" background-blurriness="0.8"></needle-engine>
    ```
2. Carregue a pasta `assets/` do seu Projeto Web para o seu web hoster. Depending on your project settings, this folder contains one or more `.glb` files and any number of other files like audio, video, skybox and more.

3. Change the `src=` attribute of the `needle-engine` tag to the URL of the `.glb` file you want to display. Typically, this will be some path like `https://your-website.com/assets/MyScene.glb`.

4. É isso! The scene should now be displayed on your website.

## Incorporar uma aplicação web Needle Cloud como iframe

If you deployed your project to Needle Cloud, you can easily display it on your own website with an iframe.

::: warning <b>Em construção.</b> This section is not yet complete.
:::

# Fluxos de trabalho comuns

## Creating a web app for a client's website

1. **Understand what type of app you're building**, and if and how it connects to an existing website.
   Often, you're building a standalone app that is accessible from a link on the client's domain.
   But there might also be other server-side and client-side components involved.

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
    A typical approach is to start on [Needle Cloud](./cloud/) for initial prototypes and during development, and move to the client's webspace and domain for the final version.

    The choice mostly depends on the client's requirements regarding branding, SEO, and technical setup. Often, you'll have to discuss this with the client's IT department or webmaster.
    :::

1. **Understand how the web app will be deployed and maintained.**
    - Will you have access to a folder on the client's web server so you can upload the latest version, or do they want to manage the deployment themselves?
      ::: tip A simple approach: FTP access
      Often, you can ask for FTP or SFTP access to a folder on the client's web server. You'll get a URL, username, and password, and then you can upload your files to that folder. We provide a "Deploy to FTP" component that makes this particularly easy. The client's IT department will set up which URL the folder is accessible from.
        :::

    - Is there a lot of content that needs to be updated regularly, or is the app mostly static?
        ::: tip Static vs. dynamic content
        For mostly static content, it's often enough to upload a new build from time to time. For dynamic content, you might need a CMS (content management system) or a database connection.
        :::
    - Which devices and browsers are the target audience using?
        ::: tip Browser compatibility and testing
        While Needle Engine works on all modern devices and browsers, it's always a good idea to test your app on the devices and browsers your target audience is using to make sure everything works as expected. For example, when creating an AR app for phones, you'll want to test across Android and iOS devices.
        :::

2. **Set up the project, a test deployment, and client deployment.**
   It's often a good idea to test the deployment process early on, to make sure you understand how it works and what the requirements are. For example, when you've decided on using FTP, then you could set up a test folder on your own web server and test the deployment process there. Once changes are approved by the client, you can then deploy to the client's server.

3. **Start creating!**
   With requirements and deployment in place, go ahead and start making your project! You'll usually iterate locally, then deploy to your test server for approval, and then to the client's server.

## Wordpress

1. Decide on the method you want to use to embed your Needle Engine project. You can either use the "Embedding a Needle project into an existing website" method, or the "Embedding a Needle project as iframe" method.

2. Upload the content of the `dist/` folder from your Web Project to your web hoster. Usually, the Wordpress uploads directory is located at `wp-content/uploads/`.

    ::: tip Wordpress Backups
    You can decide if your new project should be at `wp-content/uploads/my-project/`, or at a different location like `my-projects/my-project`. This affects if and how your project will be contained in Wordpress backups.
    :::

3. In the page you want to add Needle Engine to, add a `HTML` block and paste the code snippet as outlined above – either as script embed, or as iframe.

## Shopify

::: warning <b>Em construção.</b> Needs to be documented.
:::

## Wix

::: warning <b>Em construção.</b> Needs to be documented.
:::

## Webflow

::: warning <b>Em construção.</b> Needs to be documented.
:::


Página traduzida automaticamente usando IA