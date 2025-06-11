---
title: Needle Cloud
description: 'Needle Cloud é um serviço online. Ajuda a armazenar, gerir e partilhar ativos e aplicações 3D na web.
 Uma variedade de formatos de ficheiro são suportados, incluindo glTF, USD, FBX, VRM, e mais. As aplicações web espaciais criadas com Needle podem ser implementadas na cloud diretamente a partir da integração Unity, e via linha de comando (CLI).'
---

<br/>
<discountbanner/>


# Needle Cloud

## Visão Geral

Needle Cloud é um serviço online. Ajuda a armazenar, gerir e partilhar ativos e aplicações 3D na web.
Uma variedade de formatos de ficheiro são suportados, incluindo glTF, USD, FBX, VRM, e mais. As aplicações web espaciais criadas com Needle podem ser implementadas na cloud diretamente a partir da integração Unity, e via linha de comando (CLI). A integração Blender chegará numa fase posterior; pode usar o CLI entretanto.

Visite [Needle Cloud](https://cloud.needle.tools) para começar.

![Visão Geral do Needle Cloud](/cloud/cloud-overview-page.webp)

## Funcionalidades

1. **Hospedar aplicações web espaciais**  
   As aplicações criadas com Needle podem ser implementadas na cloud diretamente a partir das nossas integrações de motor. Isto permite dar à sua equipa e clientes acesso público a aplicações facilmente, sem ter de configurar o seu próprio servidor. Se necessário, pode proteger aplicações com uma palavra-passe.

2. **Gerir ativos 3D de forma privada e segura**  
   Carregue e organize facilmente os seus ficheiros 3D. Graças à nossa rápida CDN (content delivery network), os seus ficheiros são armazenados de forma segura e podem ser acedidos rapidamente a partir de qualquer parte do mundo.
   Needle Cloud não é um marketplace, nem uma rede social. É projetado para agências, estúdios e criadores gerirem os seus ativos de forma privada e segura.

3. **Otimizar ativos 3D a partir de uma variedade de formatos**  
   Comprima automaticamente os seus ficheiros para reduzir o seu tamanho mantendo a qualidade visual. Isto faz com que os seus ficheiros carreguem mais rápido, e poupa largura de banda e memória nos dispositivos dos utilizadores.

4. **Partilha e Controlo de Versões**  
   As ligações para os seus ficheiros podem ser partilhadas com outros e usadas diretamente nos seus projetos. Pode carregar novas versões de ativos e aplicações. Versões individuais podem ser rotuladas, o que permite fluxos de trabalho de revisão flexíveis: por exemplo, pode rotular uma versão como `main` ou `experimental`. Também pode reverter rótulos para uma versão anterior, se necessário.

5. **Ferramentas de Automação e Pipeline via CLI**  
   O `needle-cloud` CLI (command line interface) torna fácil automatizar o carregamento e otimização de ficheiros. Isto é útil para integrar Needle Cloud no seu pipeline existente, ou para automatizar o carregamento de um grande número de ficheiros.

6. **Gestão de Licenças**  
   As licenças para Needle Engine para criadores individuais e equipas são geridas através do Needle Cloud. Isto garante que apenas utilizadores autorizados podem aceder aos seus ficheiros e projetos. Contacte-nos para licenças Enterprise e Edu.

## Implementar a partir do Unity

Needle Cloud está integrado no Unity Editor. Isto permite-lhe implementar as suas aplicações diretamente do Unity para Needle Cloud. Também pode carregar e transferir ativos de Needle Cloud diretamente no Unity.

1. **Instale a integração Unity, se ainda não o fez.**  
   Consulte [esta página](./../unity/) para mais informações.

2. **Adicione o componente `Export Info` à sua cena.**  
   Este componente é usado para configurar as definições de exportação para a sua aplicação.  
   Pode usar o item de menu `GameObject > Needle Engine > Add Export Info` ou criar uma nova cena a partir de um modelo Needle via o item de menu `File > New Scene`.

3. **Clique em `Upload to Needle Cloud`.**  
   Isto construirá a sua aplicação e a carregará para Needle Cloud. Também pode escolher implementar para uma equipa e projeto específicos. O _nome de carregamento_ do projeto, visível ao lado do botão, é guardado na cena. Futuros carregamentos usarão o mesmo nome de carregamento, e todas as versões carregadas serão agrupadas no website Needle Cloud.

   ![Integração Needle Cloud Unity](/cloud/cloud-deploy-v1.webp)

## Implementar a partir do CLI

Needle Cloud fornece uma interface de linha de comando (CLI) que lhe permite gerir os seus ativos e implementar as suas aplicações eficientemente. Pode usar o CLI para automatizar tarefas e integrar Needle Cloud nos seus fluxos de trabalho existentes.

O CLI está disponível como um [pacote npm](https://www.npmjs.com/package/needle-cloud), o que significa que precisa de ter Node.js instalado na sua máquina. Pode verificar se tem Node.js instalado executando o seguinte comando no seu terminal:

```bash
node -v
```
Se não tiver o Node.js instalado, pode transferi-lo a partir do [website Node.js](https://nodejs.org/).

Pode instalar o pacote `needle-cloud` CLI globalmente ou usá-lo via `npx`. Isto permite-lhe executar os comandos do CLI sem ter de o instalar globalmente.


1. **Use o comando npx (recomendado)**
   ```bash
   npx needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```
2. **Ou instale needle-cloud globalmente**  
   Uma instalação global permite usar o CLI a partir de qualquer lugar no seu sistema. Para instalar o CLI globalmente, execute o seguinte comando no seu terminal:
   ```bash
   npm install -g needle-cloud
   ```
   Agora, pode usar o comando `needle-cloud` no seu terminal:

   ```bash
   needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```

### Implementações Automatizadas
Para implementar a partir de **Github Actions** ou **Stackblitz**, pode fornecer um access token como `--token <access_token>`. Os access tokens podem ser criados na [sua página de equipa](https://cloud.needle.tools/team) no Needle Cloud. Certifique-se de criar o seu token com permissões de `read/write`.

Use a [Needle Cloud Github Action](https://github.com/marketplace/actions/deploy-to-needle-cloud) para implementar uma atualização a partir do Github (por exemplo, sempre que fizer um push para o repositório)

#### Exemplo: Needle Cloud Github Action
```yml
      - name: Deploy to Needle Cloud
        uses: needle-tools/deploy-to-needle-cloud-action@v1
        id: deploy
        with:
            token: ${{ secrets.NEEDLE_CLOUD_TOKEN }}
            dir: ./dist
            name: vite-template # optional
```

#### Exemplo: Implementar usando um comando CLI

```bash
# Deploy to Needle Cloud from e.g. a github action
npx needle-cloud deploy '/path/to/output' --team 'My team' --name 'some name or id' --token '<access_token>'
```

### Ajuda do CLI
Use `help` para ver todas as opções de linha de comando disponíveis e ajuda para comandos individuais.
```bash
# ver todas as opções disponíveis
npx needle-cloud help
# obter ajuda para um comando específico, por exemplo, deploy
npx needle-cloud help deploy
```


## URLs de Implementação

Ao implementar para Needle Cloud, cada carregamento obtém um URL único. Pode partilhar uma ligação para uma versão _específica_, ou para uma versão _rotulada_ com a sua equipa ou clientes.

-----

No exemplo seguinte, temos uma aplicação que até agora foi implementada duas vezes. Cada implementação obtém um URL específico, também conhecido como URL _fixo_, uma vez que está fixo a uma versão específica.
1. [collaborativesandbox-zubcks1qdkhy<strong>-1qdkhy</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-1qdkhy.needle.run/)  
   Esta é a primeira versão que foi carregada.
2. [collaborativesandbox-zubcks1qdkhy<strong>-2e2spt</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-2e2spt.needle.run/)  
   Esta é a segunda versão que foi carregada.

A implementação _mais recente_ está sempre disponível no seguinte URL. Este URL é útil para partilhar com a sua equipa, pois aponta sempre para a versão mais recente da aplicação. Outro nome comum para esta versão é _dev_ ou _canary_.
- [collaborativesandbox-zubcks1qdkhy<strong>-latest</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-latest.needle.run/)  
  Este URL mostra automaticamente a nova versão quando carrega uma nova versão da aplicação.

A implementação _main_ é útil para partilhar com clientes, pois aponta sempre para a versão mais recente da aplicação que promoveu. Outros nomes comuns para esta versão são _production_, _stable_ ou _live_.
- [collaborativesandbox-zubcks1qdkhy.needle.run](https://collaborativesandbox-zubcks1qdkhy.needle.run/)  
  Este URL não muda quando carrega uma nova versão. Só mudará quando promover explicitamente uma nova versão para _main_.

Tipicamente, carrega uma nova versão, revê-a e depois decide se a quer promover para _main_.

-----

O website Needle Cloud mostra todas as versões implementadas da aplicação, incluindo as versões latest e main. Os rótulos podem ser movidos clicando em <kbd>⋮</kbd> e selecionando <kbd>Set main label</kbd> ou <kbd>Remove main label</kbd>.

![Lista de Versões do Needle Cloud](/cloud/cloud-edit-page.webp)

## Formatos 3D Suportados

1. **glTF e GLB** <a href="https://cloud.needle.tools/view?file=2oAMeWZ1hWL3C-latest-product" target="_blank">Exemplo</a>  
   O formato glTF é o formato mais amplamente suportado para 3D na web. É um formato leve que pode armazenar modelos 3D, animações e texturas. Os ficheiros GLB são versões binárias de ficheiros glTF, onde todos os dados são armazenados num único ficheiro.
   glTF suporta técnicas de compressão avançadas como Draco, KTX2 e Meshopt, que são totalmente suportadas por Needle Cloud e Needle Engine.

2. **OpenUSD**  
   USD é um formato poderoso para intercâmbio de dados 3D. É conhecido pelo seu uso na indústria cinematográfica e VFX, e está a ganhar popularidade na indústria de jogos. Needle Cloud suporta ficheiros USDZ e USD nativamente através do nosso trabalho em USD-WASM, e também converte ficheiros USD para glTF para processamento e otimização adicionais.

3. **FBX**  
   FBX tem sido um formato popular para intercâmbio de dados 3D por muitos anos, mas carece de uma série de funcionalidades modernas como materiais PBR e extensões. Needle Cloud converte ficheiros FBX para glTF para processamento e otimização adicionais.

4. **VRM**  
   VRM é um formato para avatares humanoides. Baseia-se em glTF com restrições adicionais através do uso de extensões glTF. Needle Cloud suporta ficheiros VRM nativamente e pode otimizá-los como outros ficheiros glTF, incluindo extensões VRM complexas como fonemas, sombreamento toon e ossos dinâmicos.

5. **OBJ**  
   OBJ é um formato simples baseado em texto para modelos 3D. Suporta materiais básicos através de ficheiros MTL, animações e hierarquias de objetos. Needle Cloud converte ficheiros OBJ para glTF para processamento e otimização adicionais.

:::tip Utilize glTF ou USD sempre que possível
Recomendamos glTF e USD como formatos primários para intercâmbio de dados 3D. São amplamente suportados, têm funcionalidades modernas e um bom modelo de material.
:::

## Cloud Assets

### Carregar Ativos

Pode carregar os seus ficheiros facilmente arrastando-os para o website ou selecionando-os do seu computador.
Os ficheiros não glTF são automaticamente convertidos para glTF para processamento adicional, mas os ficheiros originais são mantidos para transferência e visualização web.

### Versões de Ativos

Ao visitar a Página de Edição de um asset, pode ver todas as versões que foram carregadas até agora por si ou pela sua equipa. Também pode etiquetar versões para as marcar como "main" ou "experimental". "Latest" é a etiqueta padrão para a versão mais recente.

### Partilhar Ligações para Ativos

Pode criar ligações para partilhar ficheiros específicos ou ficheiros etiquetados com a sua equipa ou clientes. As ligações etiquetadas atualizarão automaticamente quando mover a etiqueta – assim, pode partilhar uma ligação "main" uma vez e continuar a atualizar o ficheiro sem ter de enviar uma nova ligação.

### Utilizar Cloud Assets no Needle Engine

Os ficheiros armazenados em Needle Cloud podem ser facilmente levados diretamente para projetos Needle Engine. O componente `Needle Cloud Asset` aceita uma ligação para um asset e carrega-o em runtime. Isto permite manter o tamanho do seu projeto pequeno e carregar assets sob demanda que ainda podem ser atualizados na cloud.

::: tip Utilize Progressive Loading sempre que possível
Os assets armazenados em Needle Cloud são otimizados automaticamente para uso ideal em runtime usando a nossa tecnologia de Progressive Loading. Para cada malha e textura, são geradas múltiplas versões de level-of-detail, e apenas as partes do asset que são necessárias são carregadas em runtime.

Isto poupa muita largura de banda e memória (tipicamente 90% ou mais em comparação com o carregamento do asset completo).
:::

### Incorporar o Cloud Viewer no Seu Website

Uma maneira rápida de trazer 3D para o seu próprio website é **incorporar** o Needle Cloud viewer.
Para fazê-lo, vá à Página de Edição de um asset e clique em <kbd>Embed</kbd>. Pode então copiar o snippet de código `iframe` e colá-lo no seu website.

::: tip Incorporar versões específicas
Também pode incorporar o viewer com uma ligação direta para o asset, ou com uma etiqueta específica. Isto permite-lhe atualizar o asset em Needle Cloud sem ter de atualizar o código de incorporação no seu website.
:::

### Incorporar noutros frameworks

As seguintes opções de incorporação estão disponíveis:
1. **Needle Cloud Viewer**  
   Use o snippet de código `iframe` para incorporar o Needle Cloud viewer no seu website.

1. **Needle Engine**  
  Use o snippet de código fornecido para incorporar Needle Engine no seu website como [web component](./../three/).

1. **model-viewer**  
  O projeto [model-viewer](https://modelviewer.dev) fornece um web component para renderizar modelos 3D simples e não interativos no browser.

1. **three.js**  
  Se estiver familiarizado com three.js, pode usar o snippet de código fornecido como ponto de partida para uma aplicação three.js que suporta Needle Progressive Loading e carrega ficheiros eficientemente a partir de Needle Cloud.

1. **React-Three-Fiber**  
  Se estiver a usar React-Three-Fiber, pode usar o snippet de código fornecido como ponto de partida para um projeto que suporta Needle Progressive Loading e carrega ficheiros eficientemente a partir de Needle Cloud.

1. **Unity**  
  Se estiver a usar Unity, pode integrar Needle Cloud assets diretamente nos seus projetos usando o componente Needle Cloud Asset para carregamento e otimização contínuos.

### Utilizar Cloud Assets com outros engines como Unity ou Unreal

Existem várias maneiras de usar assets armazenados em Needle Cloud noutros engines como Unity ou Unreal.
1. **Transferir e Importar**  
   Pode transferir o asset e importá-lo para o seu projeto.

2. **Ligação Direta**  
   Pode usar a ligação direta para o asset no seu projeto. Desta forma, pode atualizar o asset em Needle Cloud e este atualizará automaticamente no seu projeto. Que ligação usar depende do engine e das suas capacidades glTF:
    - Suporte para **glTF com Progressive Loading**:  
      Use a ligação `Progressive-World` ou `Progressive-Product`.
      Consulte [npm:@needle-tools/gltf-progressive](https://www.npmjs.com/package/@needle-tools/gltf-progressive) para mais informações sobre carregamento progressivo e como ativá-lo para o seu engine.

    - Suporte para **glTF com Draco e KTX2**:
      Use a ligação `Optimized`.
    - Suporte para glTF, mas **sem extensões de compressão**:  
      Use a ligação `Upload` (para carregamentos gltf/glb) ou `Converted` (para outros carregamentos).

3. **Componente Needle Cloud Asset**  
   Se estiver a usar Needle Engine, pode usar o componente `Needle Cloud Asset` para carregar assets em runtime. Ele escolherá automaticamente a melhor ligação para a sua plataforma e carregará o asset com Progressive Loading. Isto também é suportado em runtime em Unity Builds.

## CLI para Assets

A interface de linha de comando (CLI) para Needle Cloud permite automatizar o carregamento e a compressão de ficheiros. O CLI pode ser usado como parte de um passo de build (substituindo um asset por uma versão otimizada), ou como uma ferramenta autónoma (para processamento em batch de ficheiros).

Consulte [npm:needle-cloud](https://www.npmjs.com/package/needle-cloud) para mais informações sobre o CLI e como usá-lo.

## Perguntas Frequentes

1. **O que é Needle Cloud?**  
   É um serviço online para carregar, comprimir e partilhar assets e cenas 3D.

2. **Como carrego assets para Needle Cloud?**  
   Pode carregar ficheiros arrastando-os para o website, ou carregando-os diretamente de integrações suportadas. Se tiver muitos ficheiros, pode usar o CLI (command line interface) ou a API (application programming interface).

3. **Como transfiro ficheiros otimizados de Needle Cloud?**  
   Pode transferir ficheiros do website. Clique em `Share` e depois em `Download`. Também pode usar o CLI para transferir ficheiros.

4. **Posso partilhar os meus ficheiros com outros?**  
   Sim, pode criar ligações para partilhar os seus ficheiros. As ligações podem ser ligações de transferência direta ou ligações para o Needle Cloud viewer.

5. **Existe um limite para o tamanho dos ficheiros?**  
   Os limites de carregamento dependem do seu plano. Verifique os detalhes da sua conta para mais informações.

6. **Os ficheiros Needle Cloud podem ser usados com outras ferramentas?**  
   Sim, pode usar os seus ficheiros noutros programas exportando-os como glTF. A exportação USD chegará numa fase posterior.

7. **O que acontece se ficar sem espaço de armazenamento?**  
   Pode precisar de atualizar o seu plano ou eliminar ficheiros antigos para libertar espaço.


Página traduzida automaticamente usando IA