---
title: Implementação e Otimização
---

## O que significa implementação?

Implementação é o processo de tornar a sua aplicação disponível ao público num website. Needle Engine garante que o seu projeto seja o menor e mais rápido possível, utilizando as mais recentes técnicas de compressão, como **KTX2**, **Draco** e **Meshopt**.

## Alvos de Implementação Disponíveis

- [Needle Cloud](./cloud/#deploy-from-unity)
  Ótimo para aplicações web espaciais e partilha de assets.
- [Glitch](#deploy-to-glitch)
  Ótimo para experimentação e mexer em código do lado do servidor.

- [Netlify](#deploy-to-netlify)
  Ótimo para alojar o seu próprio website e nomes de domínio personalizados.
- [itch.io](#deploy-to-itch.io)
  Frequentemente usado para jogos.
- [GitHub Pages](#deploy-to-github-pages)
  Alojamento gratuito de páginas estáticas.
- [Vercel](#deploy-to-vercel)
  Plataforma para developers frontend
- [FTP Upload](#deploy-to-ftp)
  Implemente diretamente em qualquer servidor com suporte FTP. FTP e SFTP são suportados.
- [Build to folder](#build-to-folder)
  Ao compilar para uma pasta, pode fazer upload dos ficheiros para qualquer servidor web ou outro serviço de alojamento.
- [Facebook Instant Games](#deploy-to-facebook-instant-games)
  Plataforma de jogos no Facebook e Facebook Messenger.

::: tip Sente que algo está em falta?
Por favor, informe-nos no nosso [fórum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)!
:::

## Compilações de Desenvolvimento

Consulte os guias acima sobre como aceder às opções a partir do seu Editor (por exemplo, Unity ou Blender).

A principal diferença para uma compilação de produção é que não realiza a compressão [ktx2](https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html) e [draco](https://google.github.io/draco/) (para redução do tamanho do ficheiro e velocidade de carregamento), nem a opção de carregar progressivamente texturas de alta qualidade.

Geralmente recomendamos fazer compilações de produção para otimizar o tamanho do ficheiro e a velocidade de carregamento (veja mais informações abaixo).

## Compilações de Produção

Para fazer uma compilação de produção, precisa de ter o [toktx](https://github.com/KhronosGroup/KTX-Software/releases) instalado, que fornece compressão de textura usando o formato de supercompressão KTX2. Por favor, aceda à [Página de Lançamentos do toktx](https://github.com/KhronosGroup/KTX-Software/releases) e descarregue e instale a versão mais recente (v4.1.0 no momento da escrita). Poderá precisar de reiniciar o Unity após a instalação.
*Se tem a certeza de que instalou o toktx e ele faz parte do seu PATH, mas ainda não consegue encontrá-lo, por favor, reinicie a sua máquina e tente compilar novamente.*

:::details Avançado: Extensões glTF personalizadas
Se planeia adicionar as suas próprias extensões glTF personalizadas, a compilação para produção exige o tratamento dessas extensões em ``gltf-transform``. Consulte [@needle-tools/gltf-build-pipeline](https://www.npmjs.com/package/@needle-tools/gltf-build-pipeline) para referência.
:::

### Opções de Otimização e Compressão

### Compressão de textura
As compilações de produção por padrão comprimirão texturas usando **KTX2** (ETC1S ou UASTC, dependendo do seu uso no projeto), mas também pode selecionar a compressão **WebP** e escolher um nível de qualidade.

#### Como escolho entre a compressão ETC1S, UASTC e WebP?

| Formato | ETC1S | UASTC | WebP |
| --- | --- | --- | --- |
| **Uso de Memória da GPU** | Baixo | Baixo | Alto (não comprimido) |
| **Tamanho do Ficheiro** | Baixo | Alto | Muito baixo |
| **Qualidade** | Médio | Muito alto | Depende da configuração de qualidade |
| **Uso Típico** | Funciona para tudo, mas é melhor para texturas de cor | Texturas de dados de alta detalhe: mapas normais, rugosidade, metálico, etc. | Ficheiros onde a qualidade ETC1S não é suficiente, mas UASTC é demasiado grande |

Tem a opção de selecionar a compressão de textura e opções de carregamento progressivo por Textura, usando o Needle Texture Importer no Unity ou no separador Material no Blender.

:::details Unity: Como posso definir configurações de compressão por textura?
![image](/imgs/unity-texture-compression.jpg)
![image](/imgs/unity-texture-compression-options.jpg)
:::

:::details Blender: Como posso definir configurações de compressão por textura?
Selecione o separador Material. Verá opções de compressão para todas as texturas usadas por esse material.
![Opções de compressão de textura no Blender](/blender/texture-compression.webp)
:::

:::details Toktx não pode ser encontrado
  Windows: Certifique-se de que adicionou toktx às suas variáveis de ambiente do sistema. Poderá precisar de reiniciar o computador após adicioná-lo para atualizar as variáveis de ambiente. O local de instalação padrão é ``C:\Program Files\KTX-Software\bin``
  ![image](/imgs/ktx-env-variable.webp)
:::

### Compressão de malha

Por padrão, uma compilação de produção comprimirá malhas usando compressão Draco. Use o componente `MeshCompression` para selecionar entre draco e mesh-opt por glTF exportado.
Adicionalmente, pode configurar a simplificação de malha para reduzir a contagem de polígonos para compilações de produção nas configurações de importação de malha (Unity). Ao visualizar a sua aplicação no navegador, pode adicionar `?wireframe` ao seu URL para pré-visualizar as malhas.

#### Como escolho entre Draco e Meshopt?
| Formato | Draco | Meshopt |
| --- | --- | --- |
| **Uso de Memória da GPU** | Médio | Baixo |
| **Tamanho do Ficheiro** | Mais baixo | Baixo |
| **Compressão de Animação** | Não | Sim |

:::details Como posso definir configurações de compressão draco e meshopt?
Adicione o componente MeshCompression para selecionar qual compressão deve ser aplicada por glTF exportado.

![Componente de compressão de malha no Unity](/imgs/unity-mesh-compression-component.jpg)
- Para alterar a compressão da **cena atual**, basta adicioná-lo em qualquer lugar na sua cena raiz.
- Para alterar a compressão de um **prefab ou NestedGltf**, adicione-o a um `GltfObject` ou ao prefab que é referenciado/exportado por qualquer um dos seus componentes.
- Para alterar a compressão de uma **cena referenciada**, basta adicioná-lo à cena referenciada que é exportada
:::

:::details Onde encontrar opções de simplificação de malha para reduzir a contagem de vértices ao compilar para produção?
Selecione uma Malha e abra as opções do importador Needle para ver as opções disponíveis para a malha selecionada:
![Opções de simplificação de malha no Unity](/imgs/unity-mesh-simplification.jpg)
:::

### Texturas Progressivas

Também pode adicionar o componente `Progressive Texture Settings` em qualquer lugar na sua cena, para fazer com que todas as texturas no seu projeto sejam carregadas progressivamente. O carregamento progressivo não é aplicado a lightmaps ou texturas de skybox neste momento.

Com o carregamento progressivo, as texturas serão primeiro carregadas usando uma versão de resolução mais baixa. Uma versão de qualidade total será carregada dinamicamente quando a textura se tornar visível. Isto geralmente reduz significativamente o carregamento inicial da sua cena.

:::details Como posso ativar o carregamento progressivo de texturas?
### Texturas progressivas podem ser ativadas por textura<br/>ou para todas as texturas no seu projeto:
![image](/imgs/unity-texture-compression.jpg)
### Ativar para todas as texturas no projeto que não têm nenhuma outra configuração específica:
![image](/imgs/unity-progressive-textures.jpg)
:::

### LODs de Malha Automáticos (Nível de Detalhe)

Desde o Needle Engine 3.36, geramos automaticamente malhas LOD e alternamos entre elas em tempo de execução. Os LODs são carregados sob demanda e apenas quando necessário, de modo que este recurso reduz tanto o tempo de carregamento quanto o desempenho.

**Principais Benefícios**
- Tempo de carregamento inicial mais rápido
- Tempo de renderização mais rápido devido a menos vértices no ecrã em média
- Raycasting mais rápido devido ao uso de malhas LOD

Pode desativar a geração de LODs para todo o seu projeto no componente `Progressive Loading Settings` ou nas configurações do Mesh Importer.

![Configurações de LOD no Unity (1)](/imgs/unity-lods-settings-1.jpg)

![Configurações de LOD no Unity (2)](/imgs/unity-lods-settings-2.jpg)

## Opções de Implementação

### Implementar para Glitch 🎏

[Glitch](https://glitch.com/) oferece uma forma rápida e gratuita para todos alojarem websites pequenos e grandes. Oferecemos uma forma fácil de remixar e implementar para uma nova página Glitch (baseada no nosso starter), e também de executar um servidor de rede minimalista na mesma página Glitch, se necessário.

Pode implementar para glitch adicionando o componente `DeployToGlitch` à sua cena e seguindo as instruções.

Observe que projetos gratuitos alojados no glitch podem não exceder ~100 MB. Se precisar de fazer upload de um projeto maior, considere usar um alvo de implementação diferente.

:::details Como implemento para Glitch a partir do Unity?

1) Adicione o componente ``DeployToGlitch`` ao GameObject que também tem o componente ``ExportInfo``.

2) Clique no botão ``Create new Glitch Remix`` no componente
   ![image](/deployment/deploytoglitch-1.jpg)
3) O Glitch irá agora criar um remix do modelo. Copie o URL do seu navegador
   ![image](https://user-images.githubusercontent.com/5083203/179834901-f28852a9-6b06-4d87-8b5b-0384768c92c1.png)
4) Abra o Unity novamente e cole o URL no campo ``Project Name`` do seu componente ``Deploy To Glitch``
  ![image](https://user-images.githubusercontent.com/5083203/179835274-033e5e1d-b70d-4b13-95ad-f1e2f159b14e.png)
5) Espere alguns segundos até que o Unity tenha recebido a sua chave de implementação do glitch (esta chave é armazenada de forma segura no ficheiro `.env` no glitch. Não a partilhe com outros, qualquer pessoa com esta chave poderá fazer upload para o seu website no glitch)
  ![waiting for the key](/deployment/deploytoglitch-2.jpg)
6) Assim que a Chave de Implementação for recebida, pode clicar no botão `Build & Deploy` para fazer upload para o glitch.

:::

:::details Como implemento para Glitch a partir do Blender?

![Componente Deploy To Glitch no Blender](/blender/deploy_to_glitch.webp)

1) Encontre o painel Deploy To Glitch no separador Cena
2) Clique no botão ``Remix on glitch`` no componente
3) O seu navegador abrirá o modelo de projeto glitch
4) Espere que o Glitch gere um novo projeto
5) Copie e cole o URL do projeto no painel DeployToGlitch do Blender como o nome do projeto (pode colar o URL completo, o painel extrairá as informações necessárias)
6) No Glitch, abra o ficheiro ``.env`` e insira uma password no campo ``Variable Value`` ao lado de **DEPLOY_KEY**
7) Insira a mesma password no Blender no campo `Key`
8) Clique no botão `DeployToGlitch` para compilar e fazer upload do seu projeto para o glitch. Um navegador abrirá quando o upload terminar. Tente atualizar a página se ela aparecer em preto depois de a abrir.
:::

#### Resolução de Problemas do Glitch

Se clicar em `Create new Glitch Remix` e o navegador mostrar um erro como `there was an error starting the editor`, pode clicar em **OK**. Depois, aceda a [glitch.com](https://glitch.com/) e certifique-se de que está autenticado. Depois disso, tente clicar no botão novamente no Unity ou no Blender.

### Implementar para Netlify
:::details Como implemento para Netlify a partir do Unity?
Basta adicionar o componente `DeployToNetlify` à sua cena e seguir as instruções. Pode criar novos projetos com o clique de um botão ou implementando para projetos existentes.

![Componente Deploy to netlify](/deployment/deploytonetlify-2.jpg)

![Componente Deploy to netlify](/deployment/deploytonetlify.jpg)
:::

### Implementar para Vercel

1) Crie um novo projeto no Vercel
2) Adicione o seu projeto web a um repositório github
3) Adicione o repositório ao seu projeto no Vercel

Consulte o nosso [projeto de exemplo](https://github.com/needle-engine/nextjs-sample) para a configuração do projeto

### Implementar para itch.io

:::details Como implemento para itch.io a partir do Unity?
1) Crie um novo projeto em [itch.io](https://itch.io/game/new)
2) Defina ``Kind of project`` como ``HTML``
  ![image](https://user-images.githubusercontent.com/5083203/191211856-8a114480-bae7-4bd1-868e-2e955587acd7.png)
3) Adicione o componente ``DeployToItch`` à sua cena e clique no botão ``Build``
  ![image](https://user-images.githubusercontent.com/5083203/193812540-1881837e-ed9e-49fc-9658-52e5a914299a.png)

4) Espere que a compilação termine, abrirá uma pasta com o zip final quando terminar
5) Faça upload do zip final para itch.io
  ![20220920-104629_Create_a_new_project_-_itch io_-_Google_Chrome-needle](https://user-images.githubusercontent.com/5083203/191212661-f626f0cb-bc8e-4738-ad2c-3982aca65f39.png)
6) Selecione ``This file will be played in the browser``
  ![image](https://user-images.githubusercontent.com/5083203/191212967-00b687f3-bf56-449e-880c-d8daf8a52247.png)
7) Guarde a sua página itch e visualize a página do projeto itch.
  Agora deve carregar o seu projeto Needle Engine 😊

#### Configurações opcionais
![image](https://user-images.githubusercontent.com/5083203/191217263-355d9b72-5431-4170-8eca-bfbbb39ae810.png)
:::

:::details Itch.io: falha ao encontrar index.html

#### Falha ao encontrar index.html
![image](https://user-images.githubusercontent.com/5083203/191213162-2be63e46-2a65-4d41-a713-98c753ccb600.png)
Se vir este erro após fazer upload do seu projeto, certifique-se de que não faz upload de um index.html gzipped.
Pode desativar a compressão gzip em ``vite.config.js`` na pasta do seu projeto web Needle. Basta remover a linha com ``viteCompression({ deleteOriginFile: true })``. Compile o seu projeto novamente e faça upload para itch.

:::

### Implementar para FTP

:::details Como implemento para o meu servidor FTP a partir do Unity?
1) Adicione o componente ``DeployToFTP``¹ a um GameObject na sua cena (é uma boa prática adicioná-lo ao mesmo GameObject que o ExportInfo - mas não é obrigatório)
2) Atribua um asset de servidor FTP e preencha servidor, username e password, se ainda não o tiver feito ²
  *Este asset contém as informações de acesso ao seu servidor FTP - obtém-nas ao criar uma nova conta FTP no seu fornecedor de alojamento*
3) Clique no botão <kbd>Build & Deploy</kbd> no componente ``DeployToFTP`` para compilar o seu projeto e fazer upload para a sua conta FTP


![Componente Deploy to FTP no Unity](/deployment/deploytoftp.jpg)
*¹ Componente Deploy to FTP*

![Asset de servidor FTP](/deployment/deploytoftp2.jpg)
*² Asset de servidor FTP contendo as informações de acesso da sua conta de utilizador FTP*

![Componente Deploy To FTP no Unity com asset de servidor atribuído](/deployment/deploytoftp3.jpg)
*Componente Deploy To FTP depois do asset de servidor atribuído. Pode implementar diretamente para uma subpasta no seu servidor usando o campo path*
:::

:::details Como implemento para o meu servidor FTP manualmente?

1) Abra `File > Build Settings`, selecione `Needle Engine`, e clique em <kbd>Build</kbd>
2) Espere que a compilação termine - a pasta `dist` resultante abrirá automaticamente após a execução de todos os passos de compilação e compressão.
3) Copie os ficheiros da pasta `dist` para o seu armazenamento FTP.

**É isso!** 😉

![20220830-003602_explorer-needle](https://user-images.githubusercontent.com/2693840/187311461-e6afb2d7-5761-48cf-bacb-1c1733bb768b.png)

> **Nota**: Se o resultado não funcionar ao fazer upload, pode ser que o seu servidor web não suporte a servir ficheiros gzipped. Tem duas opções para resolver o problema:
Opção 1: Pode tentar ativar a compressão gzip no seu servidor usando um ficheiro htaccess!
Opção 2: Pode desativar a compressão gzip nas configurações de compilação em File/Build Window e selecionando a plataforma Needle Engine.

> **Nota**: Se estiver a ter erros durante a compressão, por favor, informe-nos e reporte um bug! Se o seu projeto funciona localmente e só falha ao fazer compilações de produção, pode resolver o problema imediatamente fazendo uma Compilação de Desenvolvimento. Para isso, basta ativar `Development Build` nas Configurações de Compilação.

![Janela de compilação do Unity mostrando a plataforma Needle Engine](/deployment/buildoptions_gzip.jpg)

:::

#### Ativando gzip usando um ficheiro .htaccess
Para ativar a compressão gzip no seu servidor FTP, pode criar um ficheiro chamado `.htaccess` no diretório onde deseja fazer upload (ou num diretório pai).
Insira o seguinte código no seu ficheiro `.htaccess` e guarde/faça upload para o seu servidor:
```
<IfModule mod_mime.c>
RemoveType .gz
AddEncoding gzip .gz
AddType application/javascript .js.gz
</IfModule>
```

### Implementar para Github Pages
:::details Como implemento para Github Pages a partir do Unity?

Adicione o componente DeployToGithubPages à sua cena e copie/cole o repositório github (ou o url do github pages) para onde deseja implementar.
![Componente Deploy To Github Pages](/deployment/deploytogithubpages.jpg)

<video-embed src="https://www.youtube.com/watch?v=Vyk3cWB6u-c" />

:::

#### Resolução de problemas do github pages
- **Implementei para github pages, mas nenhuma ação está a correr / o website não está online**
   - Se implementou pela primeira vez, pode demorar alguns minutos até que o seu website fique disponível. Pode verificar o separador **Actions** no github (`/actions`) para ver o processo de implementação.
   - Se o seu website não estiver online após alguns minutos ou não vir nenhuma execução de fluxo de trabalho no separador **Actions** no github, aceda à página de configurações **Github Pages** (`/settings/pages`) e certifique-se de que o **Branch** está definido para *gh-pages*

### Implementar para Facebook Instant Games

Com o Needle Engine, pode compilar para Facebook Instant Games automaticamente
Não são necessários ajustes manuais à sua aplicação web ou jogo.

:::details Como implemento para Facebook Instant Games a partir do Unity?
- Adicione o componente `Deploy To Facebook Instant Games` à sua cena:
  ![Componente Deploy to Facebook Instant Games](/deployment/deploytofacebookinstantgames.jpg)
- Clique no botão `Build For Instant Games`
- Depois que a compilação terminar, obterá um ficheiro ZIP que pode carregar para a sua aplicação do Facebook.
- No Facebook, adicione o módulo `Instant Games` e aceda a `Instant Games/Web hosting`
  ![Alojando um facebook instant games](/deployment/deploytofacebookinstantgames-hosting.jpg)
- Pode carregar o seu zip usando o botão `Upload version` (1). Depois que o upload terminar e o zip for processado, clique no botão `Stage for testing` para testar a sua aplicação (2, aqui o botão azul) ou `Push to production` (o botão com o ícone de estrela)
  ![Carregar o zip para facebook instant games](/deployment/deploytofacebookinstantgames-upload.jpg)
- É isso - pode então clicar no botão `Play` ao lado de cada versão para testar o seu jogo no facebook.

:::

:::details Como crio uma aplicação no Facebook (com capacidades de Instant Games)

1) [Crie uma nova aplicação](https://developers.facebook.com/apps/creation/) e selecione `Other`. Depois clique em `Next`
  ![Criar aplicação facebook instant games](/deployment/facebookinstantgames-1.jpg)

2) Selecione o tipo `Instant Games`
  ![Criar aplicação facebook instant games](/deployment/facebookinstantgames-2.jpg)

3) Depois de criar a aplicação, adicione o produto `Instant Games`
  ![Adicionar produto instant games](/deployment/facebookinstantgames-3.jpg)

Aqui pode encontrar [a documentação oficial dos instant games](https://developers.facebook.com/docs/games/build/instant-games) no facebook.
**Nota** que tudo o que precisa fazer é criar uma aplicação com capacidades de instant games.
Nós trataremos de tudo o resto e não são necessários ajustes manuais ao seu website Needle Engine.
:::

## Compilar para Pasta

No Unity, abra ``File/Build Settings`` e selecione ``Needle Engine`` para opções:

![image](/imgs/unity-build-window-menu.jpg)

![image](/imgs/unity-build-window.jpg)

Para compilar o seu projeto web para fazer upload para qualquer servidor web, pode clicar em **Build** na Janela de Configurações de Compilação do Unity Editor. Pode ativar a caixa de seleção ``Development Build`` para omitir a compressão (veja abaixo), o que exige que o toktx esteja instalado na sua máquina.

Para pré-visualizar localmente a sua compilação final, pode usar o botão `Preview Build` na parte inferior da janela. Este botão primeiro realizará uma compilação regular e depois iniciará um servidor local no diretório com os ficheiros finais, para que possa ver o que obtém assim que carregar estes ficheiros para o seu servidor web.

Nodejs é **apenas** necessário durante o desenvolvimento. O website distribuído (usando o nosso modelo vite padrão) é uma página estática que não depende de Nodejs e pode ser colocada em qualquer servidor web regular. Nodejs é necessário se quiser executar o nosso servidor de rede minimalista no mesmo servidor web (automaticamente contido no processo de implementação do Glitch).

---

## Fluxos de Trabalho de Implementação Cross-Platform

É possível criar projetos Unity regulares onde pode compilar tanto para Needle Engine como para plataformas Unity regulares, como Desktop ou até mesmo WebGL. A nossa abordagem de "mapeamento de componentes" significa que nenhuma lógica de runtime é modificada dentro do Unity - se desejar, pode usar regularmente o Modo Play e compilar para outras plataformas alvo. Em alguns casos, isto significará que tem código duplicado (código C# e lógica TypeScript correspondente). A quantidade de trabalho extra com isto depende do seu projeto.

**Entrar no Modo Play no Unity**
Em `Project Settings > Needle Engine`, pode desativar `Override Play Mode` e `Override Build settings` para alternar entre o processo de compilação do Needle e o processo de compilação do Unity:
![image](https://user-images.githubusercontent.com/2693840/187308490-5acb9016-ffff-4113-be62-4de450a42b08.png)

## Argumentos de Linha de Comando do Needle Engine para Unity

Needle Engine para Unity suporta vários argumentos de linha de comando para exportar assets individuais (Prefabs ou Cenas) ou para compilar um projeto web completo em modo batch (sem janela).

A lista seguinte apresenta uma tabela das opções disponíveis:

| | |
| -- | -- |
| `-scene` | caminho para uma cena ou um asset a ser exportado, por exemplo, ``Assets/path/to/myObject.prefab`` ou ``Assets/path/to/myScene.unity`` |
| `-outputPath <path/to/output.glb>` | definir o caminho de saída para a compilação (apenas válido ao compilar uma cena) |
| `-buildProduction` | executar uma compilação de produção |
| `-buildDevelopment` | executar uma compilação de desenvolvimento |
| `-debug` | abrir uma janela de consola para debugging |


Página traduzida automaticamente usando IA