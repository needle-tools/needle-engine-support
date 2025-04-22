---
title: Needle Engine para Unity
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Logótipo Needle"/> +
  <img src="/imgs/unity-logo.webp" style="max-height:70px;" />
</div>

# Needle Engine para Unity

O Needle Engine para Unity permite criar aplicações web altamente interativas, flexíveis e leves diretamente no Unity. Utilize as poderosas ferramentas do editor Unity para configurar visualmente as suas cenas 3D, animar e criar designs. O Needle Engine para Unity trata da exportação da sua cena para glTF e integra-se facilmente com qualquer framework de frontend web.


## Instale o Pacote Unity


<NoDownloadYet>
  <br/>
  <needle-button 
    event_goal="download_unity" 
    event_position="getting_started" 
    large 
    href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"
    same_tab
    next_url="/docs/unity/"
    >
    <strong>Descarregar Needle Engine para Unity</strong>
  </needle-button> 
</NoDownloadYet>

<!-- [Mirror](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)    -->

1. **Arraste e largue o ficheiro .unitypackage descarregado** para um projeto Unity e confirme que o pretende importar.

2. **Aguarde um momento** para que a instalação e importação terminem. Uma janela pode abrir indicando que "Um novo registo com escopo está agora disponível no Package Manager.". Este é o nosso registo de Pacotes Needle. Pode fechar essa janela em segurança.  
3. **Explorar Exemplos**.  
  Selecione a opção de menu `Needle Engine > Explorar Exemplos` para ver, abrir e modificar todas as [cenas de exemplo](https://engine.needle.tools/samples) disponíveis.  

## Tutorial em Vídeo de Início Rápido

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />

## Comece por um Exemplo

Existem mais de 100 exemplos que abrangem uma vasta gama de tópicos, casos de uso e indústrias.  
Para uma visão geral rápida, veja a nossa [página de Exemplos](https://engine.needle.tools/samples/). 

Todos estes exemplos estão disponíveis diretamente no Unity:
1. Vá para `Needle Engine > Explorar Exemplos` para procurar exemplos
2. Clique em "Instalar Exemplos" para instalar o pacote de exemplos diretamente no seu editor (ou [descarregue o unitypackage de exemplos](http://engine.needle.tools/downloads/unity/samples) para instalar o pacote manualmente)
3. Escolha qualquer exemplo e clique em `Abrir Cena`. 

:::tip Os Exemplos são só de leitura – o que os torna fáceis de atualizar.
As nossas cenas de exemplo fazem parte de um pacote UPM no Unity. Isto significa que não pode editar os assets e scripts diretamente neles – são só de leitura. Para editar um asset do pacote de exemplos, copie-o para a pasta `Assets` do seu projeto. Para editar um script do pacote de exemplos, copie-o para a pasta `src` do seu projeto web.
::: 

## Comece por um template

Fornecemos vários Scene Templates para iniciar rapidamente novos projetos.  
Estes permitem que vá de uma ideia a um protótipo em poucos cliques.  

1. Clique em `Ficheiro > Nova Cena`

2. Selecione um dos templates com (needle) no nome e clique em `Criar`.   
   Recomendamos o template [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox) que é uma ótima maneira de começar com interatividade, multiplayer e adição de assets.  
3. Clique em Play para instalar e iniciar o seu novo projeto web.

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)


## Comece do zero

Se não quiser começar de um scene template, pode seguir estes passos.  
Efetivamente, vamos recriar o template "Minimal (Needle)" que vem com o pacote.  

1. **Crie uma nova cena vazia**  

2. **Configure a sua cena para exportação**   
  Adicione um GameObject vazio, dê-lhe o nome "Exporter" e adicione o component `Needle Engine` (anteriormente chamado `Export Info`).  
  Neste component, cria e acede rapidamente ao seu projeto runtime exportado.  
  Também o avisa se algum dos nossos pacotes e módulos estiver desatualizado ou não estiver instalado localmente no seu projeto web.  

    ::: tip Nome do Projeto e Nome da Cena
    Por predefinição, o nome do projeto corresponde ao nome da sua cena. Se quiser alterar isso, pode escolher ou inserir um ``Nome de Diretório`` onde pretende criar o seu novo projeto web. O caminho é relativo ao seu projeto Unity.  
    :::
 
3. **Escolha um template de projeto web**
  Agora, selecione um template de projeto web para o seu projeto. O template predefinido é baseado em [Vite](https://vitejs.dev/), um bundler rápido de aplicações web.  
  <br/>
    ![Unity ExportInfo local templates](/imgs/unity-project-local-template.jpg)


4. Clique em Play para instalar e iniciar o seu novo projeto web


:::tip Defina os seus próprios templates
Se se encontrar a criar muitos projetos semelhantes, pode criar os seus próprios templates locais ou remotos usando o menu de contexto do Project View em `Criar/Needle Engine/Project Template`. Templates podem ser locais no disco (uma pasta a ser copiada) ou repositórios remotos (um repositório git a ser clonado).
:::

## Pastas e Ficheiros do Projeto


| Pasta | |
| --- | --- |
| **Unity** | |
| `Assets` | É aqui que residem os assets específicos/exclusivos do projeto. |
| `Packages` | É aqui que residem os pacotes instalados para este projeto. Um pacote pode conter qualquer tipo de asset. A principal diferença é que pode ser adicionado a vários projetos Unity. É, portanto, um ótimo método para partilhar código ou assets. Para saber mais sobre pacotes, consulte a [documentação Unity sobre pacotes](https://docs.unity3d.com/Manual/PackagesList.html).
| **Pacote Unity Needle Engine** | |
| ``Core/Runtime/Components`` | Contém todos os components integrados do Needle Engine. Saiba mais sobre eles na [Referência de Components](./../component-reference.md). |

-----

Ao criar um novo projeto web no Unity, pode optar por criá-lo a partir de um template local (por predefinição, fornecemos um template web baseado em vite). 

Também pode referenciar templates remotos introduzindo um URL de repositório no caminho do projeto ExportInfo (isto pode ser guardado com a sua cena, por exemplo). Ao criar um novo projeto web, o repositório será clonado ou descarregado (dependendo se tem o git instalado) e procurado um ficheiro `needle.config.json`. Se nenhum for encontrado no repositório clonado, o diretório raiz será usado. Exemplos de projetos de template remotos podem ser encontrados em [github.com/needle-engine](https://github.com/needle-engine)

![Unity ExportInfo local templates](/imgs/unity-project-remote-template.jpg)

### Projetos Temporários

Se estiver a planear adicionar apenas ficheiros personalizados via NpmDefs e não alterar a configuração do projeto (por exemplo, para um teste rápido em ecrã completo), pode prefixar o caminho do projeto com `Library`. O projeto será gerado na Biblioteca de Projetos Unity e não precisa de ser adicionado ao controlo de código-fonte (a pasta Library deve ser excluída do controlo de código-fonte). Chamamos a estes projetos de _projetos temporários_. São ótimos para testar ideias rapidamente!


## Typescript no Unity

**NPM Definition** são [pacotes npm](https://docs.npmjs.com/about-packages-and-modules) firmemente integrados no Editor Unity, o que torna fácil partilhar scripts com múltiplos projetos web ou até mesmo Unity.    

Stubs de component C# para ficheiros typescript também serão gerados automaticamente para scripts dentro de pacotes npmdef.

#### Criar e instalar um npmdef
Para criar um *NPM Definition* clique com o botão direito no navegador de Projeto Unity e selecione ``Criar/NPM Definition``.   
Pode **instalar um pacote *NPM Definition*** para o seu projeto runtime, por exemplo, selecionando o seu component ``Export Info`` e adicionando-o à lista de ``dependencies`` (internamente, isto apenas adicionará o pacote npm subjacente ao seu package.json).

![image](https://user-images.githubusercontent.com/5083203/170374130-d0e32516-a1d4-4903-97c2-7ec9fa0b17d4.png)

Não se esqueça de instalar o pacote recém-adicionado, por exemplo, clicando em Install no component ExportInfo, e também reiniciar o servidor se já estiver a correr.

Para editar o código dentro de um pacote *NPM Definition*, basta fazer duplo clique no asset *NPM Definition* no seu navegador de projeto e abrirá o workspace do vscode que acompanha cada npmdef.


# Próximos Passos

- [Conceito: Projetos Web](../project-structure.md)
- [Conceito: Exportar Assets](../export.md)
- [Conceito: Implementação (Partilhe o seu website)](../deployment.md)
- [Components: Saiba mais sobre Everywhere Actions](../everywhere-actions.md)
- [Scripting para Iniciantes: Fundamentos de Typescript](../getting-started/typescript-essentials.md)
- [Scripting para Iniciantes: Como escrever components personalizados](../scripting.md)

---
Página traduzida automaticamente usando IA