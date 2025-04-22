# Needle Engine no seu Website

O Needle Engine pode ser usado para criar novas aplicações web e também pode ser integrado em websites existentes. Em ambos os casos, irá querer _carregar_ a pasta de distribuição do seu projeto para um web hoster para os tornar acessíveis ao mundo.

Existem várias formas de integrar o Needle Engine com o seu website. Qual é a melhor depende de uma série de fatores, como a complexidade do seu projeto, se está a usar scripts personalizados ou apenas componentes principais, quanto controlo tem sobre o website de destino, qual é o "nível de confiança" entre si e o website de destino, e assim por diante.

## Experimente

Se quiser experimentar rapidamente como os projetos feitos com Needle ficarão no seu website, basta adicionar estas duas linhas em qualquer lugar na sua página para teste:

::: code-tabs
@tab Option 1: Embedding Needle
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb"></needle-engine>
```
@tab Option 2: Using an iframe
```html
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px">
</iframe>
```
@tab Resulting Website
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
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
    Se não tiver acesso ao sistema de ficheiros do seu web hoster, ou nenhuma forma de carregar ficheiros para lá, pode carregar a pasta para qualquer outro espaço web e usar o URL público desse no próximo passo.
    :::

3. Adicione um iframe ao seu website, apontando para o ficheiro `index.html` na pasta `dist/`.
    ```html
    <iframe
        src="https://your-website.com/needle-files/dist/index.html"
        allow="xr; xr-spatial-tracking; fullscreen;">
    </iframe>
    ```


    ::: tip Permissões dentro de iframes
    A lista dentro de `allow=` depende das funcionalidades que a sua aplicação web usa. Por exemplo, as aplicações XR requerem `xr` e `xr-spatial-tracking` para funcionar dentro de iframes.

    Podem ser necessárias funcionalidades adicionais, por exemplo `camera; microphone; display-capture; geolocation`. Consulte [a lista completa de diretivas de iframe Permissions Policy no MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy#directives).
    :::

4. É isso! A cena deverá agora ser exibida no seu website.

## Incorporar cenas que não usam scripts personalizados

Quando o seu projeto usa apenas componentes principais e nenhum script personalizado, pode usar diretamente o Needle Engine a partir de um CDN (content-delivery network).

1. Adicione o seguinte snippet ao seu website, por exemplo como "HTML Block" no seu CMS:
    ```html
    <script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
    <needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb" background-blurriness="0.8"></needle-engine>
    ```
2. Carregue a pasta `assets/` do seu Projeto Web para o seu web hoster. Dependendo das configurações do seu projeto, esta pasta contém um ou mais ficheiros `.glb` e um número qualquer de outros ficheiros como áudio, vídeo, skybox e mais.

3. Altere o atributo `src=` da tag `needle-engine` para o URL do ficheiro `.glb` que pretende exibir. Tipicamente, este será um caminho como `https://your-website.com/assets/MyScene.glb`.

4. É isso! A cena deverá agora ser exibida no seu website.

## Incorporar uma aplicação web Needle Cloud como iframe

Se implementou o seu projeto no Needle Cloud, pode exibi-lo facilmente no seu próprio website com um iframe.

::: warning <b>Em construção.</b> Esta secção ainda não está completa.
:::

# Fluxos de trabalho comuns

## Criar uma aplicação web para o website de um cliente

1. **Compreenda que tipo de aplicação está a construir**, e se e como ela se liga a um website existente.
   Frequentemente, está a construir uma aplicação autónoma que é acessível a partir de um link no domínio do cliente.
   Mas também podem estar envolvidos outros componentes do lado do servidor e do lado do cliente.

2. **Compreenda de qual URL a aplicação web deverá ser acessível.**
  Isto pode ser

    - Uma página no **[Needle Cloud](./cloud/)**
      `collaborativesandbox-zubcks1qdkhy.needle.run`

    - Uma **Subpágina** no website do cliente
      `my-page.com/app`

    - Um novo **Subdomínio**
      `app.my-page.com`
    - Um **Domínio** novo ou existente
      `my-app.com`

    ::: tip Não há "bom" ou "mau" aqui.
    Uma abordagem típica é começar no [Needle Cloud](./cloud/) para protótipos iniciais e durante o desenvolvimento, e passar para o espaço web e domínio do cliente para a versão final.

    A escolha depende principalmente dos requisitos do cliente relativamente a branding, SEO e configuração técnica. Frequentemente, terá de discutir isto com o departamento de TI do cliente ou com o webmaster.
    :::

1. **Compreenda como a aplicação web será implementada e mantida.**
    - Terá acesso a uma pasta no servidor web do cliente para poder carregar a versão mais recente, ou eles querem gerir a implementação eles próprios?
      ::: tip Uma abordagem simples: acesso FTP
      Frequentemente, pode pedir acesso FTP ou SFTP a uma pasta no servidor web do cliente. Obterá um URL, nome de utilizador e palavra-passe, e depois poderá carregar os seus ficheiros para essa pasta. Fornecemos um componente "Deploy to FTP" que torna isto particularmente fácil. O departamento de TI do cliente configurará qual URL torna a pasta acessível.
        :::

    - Há muito conteúdo que precisa ser atualizado regularmente, ou a aplicação é maioritariamente estática?
        ::: tip Conteúdo estático vs. dinâmico
        Para conteúdo maioritariamente estático, muitas vezes basta carregar uma nova compilação de tempos a tempos. Para conteúdo dinâmico, pode precisar de um CMS (sistema de gestão de conteúdo) ou uma ligação à base de dados.
        :::
    - Quais dispositivos e navegadores o público-alvo está a usar?
        ::: tip Compatibilidade de navegadores e testes
        Embora o Needle Engine funcione em todos os dispositivos e navegadores modernos, é sempre uma boa ideia testar a sua aplicação nos dispositivos e navegadores que o seu público-alvo está a usar para garantir que tudo funciona como esperado. Por exemplo, ao criar uma aplicação AR para telemóveis, irá querer testar em dispositivos Android e iOS.
        :::

2. **Configure o projeto, uma implementação de teste e a implementação para o cliente.**
   É frequentemente uma boa ideia testar o processo de implementação cedo, para garantir que compreende como funciona e quais são os requisitos. Por exemplo, se decidiu usar FTP, então pode configurar uma pasta de teste no seu próprio servidor web e testar o processo de implementação lá. Assim que as alterações forem aprovadas pelo cliente, pode então implementar no servidor do cliente.

3. **Comece a criar!**
   Com os requisitos e a implementação definidos, avance e comece a fazer o seu projeto! Normalmente, irá iterar localmente, depois implementar no seu servidor de teste para aprovação, e depois no servidor do cliente.

## Wordpress

1. Decida o método que pretende usar para incorporar o seu projeto Needle Engine. Pode usar o método "Embedding a Needle project into an existing website" ou o método "Embedding a Needle project as iframe".

2. Carregue o conteúdo da pasta `dist/` do seu Projeto Web para o seu web hoster. Geralmente, o diretório de uploads do Wordpress está localizado em `wp-content/uploads/`.

    ::: tip Backups do Wordpress
    Pode decidir se o seu novo projeto deverá estar em `wp-content/uploads/my-project/` ou noutra localização como `my-projects/my-project`. Isto afeta se e como o seu projeto será incluído nos backups do Wordpress.
    :::

3. Na página onde pretende adicionar o Needle Engine, adicione um bloco `HTML` e cole o snippet de código conforme descrito acima – seja como script embed, ou como iframe.

## Shopify

::: warning <b>Em construção.</b> Precisa ser documentado.
:::

## Wix

::: warning <b>Em construção.</b> Precisa ser documentado.
:::

## Webflow

::: warning <b>Em construção.</b> Precisa ser documentado.
:::


Página traduzida automaticamente usando IA