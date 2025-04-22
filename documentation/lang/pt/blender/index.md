---
title: Needle Engine para Blender
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Logótipo Needle" alt="Logótipo Needle"/> +
    <img src="/blender/logo.png" style="max-height:70px;" />
</div>

# Needle Engine para Blender

O Needle Engine para Blender permite criar aplicações web altamente interativas, flexíveis e leves diretamente dentro do Blender. Use as poderosas ferramentas do Blender para configurar visualmente as suas cenas 3D, animar e projetar.

## Instalar o Add-on do Blender

<ClientOnly>

Certifique-se de que instalou o <a target="_blank" href="https://www.blender.org/download/"><strong>Blender</strong> 4.1 ou 4.2</a> e o <os-link windows_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi" osx_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0.pkg"><strong>node.js</strong></os-link>.
</ClientOnly>

<NoDownloadYet>
    <needle-button
        event_goal="download_blender"
        event_position="getting_started"
        large
        href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"
        same_tab
        next_url="/docs/blender/"
        >
        <strong>Descarregar Needle Engine para Blender</strong>
    </needle-button>
</NoDownloadYet>

1.  No Blender, vá a `Edit > Preferences > Add-ons` e clique na seta para baixo para encontrar o botão `Install from Disk`.

2.  Selecione o ficheiro zip descarregado (nomeado `needle-blender-plugin-*.zip`) para o instalar.

3.  Pesquise por "Needle" na barra de pesquisa de Add-ons e certifique-se de que `Needle Engine Exporter for Blender` está ativado.

![Settings](/blender/settings.webp)

## Primeiros Passos

Obrigado por usar o Needle Engine para Blender.

Com este add-on pode criar experiências WebGL e WebXR altamente interativas e otimizadas dentro do Blender, que funcionam usando o Needle Engine e o three.js.

Será capaz de sequenciar animações, 'cozinhar' (lightmap) facilmente as suas cenas, adicionar interatividade ou criar os seus próprios scripts escritos em Typescript ou Javascript que são executados na web.

<video-embed src="/docs/blender/environment-light.mp4" />
*Combinando definições de iluminação e ambiente entre Blender e Needle Engine. As luzes de ambiente HDRI são automaticamente exportadas, diretamente do Blender. Depois de guardar, a página é automaticamente recarregada.*

:::tip Fornecer Feedback

**O seu feedback é inestimável** na hora de decidir quais funcionalidades e fluxos de trabalho devemos priorizar. Se tiver feedback para nós (bom ou mau), por favor, [informe-nos no fórum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)!
:::

## Exemplos para Blender

- [Descarregar Exemplos do Blender](https://engine.needle.tools/downloads/blender/download-samples?utm_source=needle_docs&utm_content=blender)

Primeiro crie ou abra um novo ficheiro blend que pretende exportar para a web.
Abra a janela Propriedades e abra a categoria Cena. Selecione um `Project Path` no painel Needle Engine. Em seguida, clique em `Generate Project`. Ele irá instalar e iniciar automaticamente o servidor - assim que terminar, o seu navegador deverá abrir e a cena three.js será carregada.

![Project panel](/blender/project-panel.webp)

Por predefinição, a sua cena será automaticamente re-exportada quando guardar o ficheiro blend.
Se o servidor local estiver a funcionar (por exemplo, clicando em `Run Project`), o website irá atualizar automaticamente com o seu modelo alterado.

Quando o seu projeto web já existe e pretende apenas continuar a trabalhar no website
clique no botão azul `Run Project` para iniciar o servidor local:
![Project panel](/blender/project-panel-2.webp)

### Visão geral do Painel do Projeto
![Project panel](/blender/project-panel-3.webp)

1)  O caminho para o seu projeto web. Pode usar o pequeno botão de pasta à direita para selecionar um caminho diferente.
2)  O botão `Run Project` aparece quando o Caminho do Projeto aponta para um projeto web válido. Um projeto web é válido quando contém um `package.json`
3)  `Directory` abre o diretório do seu projeto web (o `Project Path`)
4)  Este botão re-exporta a cena atual como um GLB para o seu projeto web local. Isto também acontece por predefinição ao guardar o seu ficheiro blend.
5)  `Code Editor` tenta abrir o espaço de trabalho do VSCode no seu projeto web
6)  Se trabalhar com várias cenas num ficheiro blend, pode configurar qual cena é a sua cena Principal e deve ser exportada para a web. Se algum dos seus componentes referenciar outra cena, eles também serão exportados como ficheiros GLB separados. Ao clicar no botão "Export", a sua cena Principal será a que é carregada no navegador.
7)  Use os botões `Build: Development` ou `Build: Production` quando quiser carregar o seu projeto web para um servidor. Isto irá empacotar o seu projeto web e produzir os ficheiros que pode carregar. Ao clicar em `Build: Production`, também aplicará otimização às suas texturas (serão comprimidas para a web)
8)  Abrir a documentação

## Definições do Blender

### Gestão de Cores

Por predefinição, a viewport do Blender está definida para `Filmic` - com esta definição, as suas cores no Blender e no three.js não corresponderão.
Para corrigir isto, vá para a categoria Renderização do Blender e no painel Gestão de Cores selecione `View Transform`: `Standard`

![Correct color management settings](/blender/settings-color-management.webp)

## Iluminação de Ambiente

Pode mudar a iluminação de ambiente e o skybox usando as opções de sombreamento da Viewport.
Atribua um cubemap para usar para iluminação ou para o skybox de fundo. Pode ajustar a intensidade ou o desfoque para modificar a aparência ao seu gosto.

Nota: Para também ver o cubemap do skybox no navegador, aumente a `World Opacity` para 1.

Nota: Alternativamente, pode ativar a definição `Scene World` no separador Sombreamento da Viewport para usar a textura de ambiente atribuída nas definições do mundo do Blender.

![Environment](/blender/environment.webp)

<video-embed limit_height max_height="300px" src="/docs/blender/environment.mp4" />

Alternativamente, se não quiser ver o cubemap como fundo, adicione um componente Câmara à sua Câmara do Blender e mude `clearFlags: SolidColor` - note que as definições `backgroundBlurriness` e `backgroundIntensity` da Câmara substituem as definições de sombreamento da Viewport.

![Environment Camera](/blender/environment-camera.webp)

### Adicione a sua iluminação de ambiente e skybox HDRI / EXR personalizados

<video-embed limit_height src="/docs/blender/custom_hdri.mp4" />

## Exportar

Para excluir um objeto de ser exportado, pode desativar a visualização na Viewport e na Renderização (veja a imagem abaixo)

![Exclude from export](/blender/dont-export.webp)

## Animação 🏇

Para casos de uso simples, pode usar o componente Animação para reprodução de um ou múltiplos animation clips.
Basta selecionar o seu objeto, adicionar um componente Animação e atribuir o clip (pode adicionar clips adicionais para serem exportados para o array clips.
Por predefinição, apenas reproduzirá o primeiro clip atribuído quando `playAutomatically` estiver ativado. Pode acionar os outros clips usando um componente typescript personalizado simples)
<video-embed limit_height src="/docs/blender/animation.mp4" />

### AnimatorController

O controlador do animator pode ser criado para cenários mais complexos. Funciona como uma máquina de estados que lhe permite criar múltiplos estados de animação num gráfico e configurar condições e definições de interpolação para fazer a transição entre eles.

<video-embed src="/docs/blender/animatorcontroller-web.mp4" />
*Criar e exportar [máquinas de estados do animator](#animatorcontroller) para controlar animações complexas de personagens*

#### Criar um AnimatorController

O editor do AnimatorController pode ser aberto usando o dropdown EditorType no canto superior esquerdo de cada painel:

![AnimatorController open window](/blender/animatorcontroller-open.webp)

<video-embed limit_height max_height="188px" src="/docs/blender/animatorcontroller-create.mp4" />
*Criar um novo asset de animator-controller ☝ ou selecionar um dos seus assets criados anteriormente*

##### Visão geral do Gráfico
![AnimatorController overview](/blender/animatorcontroller-overview.webp)
1)  Use `Shift+A` para criar um novo AnimatorState
2)  O nó `Parameters` será criado assim que adicionar o primeiro nó. Selecione-o para configurar parâmetros para serem usados em transições (através do painel Nó na borda direita)
3)  Este é um AnimatorState. o estado laranja é o estado inicial (pode ser alterado usando o botão `Set default state` no painel Nó/Propriedades)
4)  As Propriedades para um AnimatorState podem ser usadas para configurar uma ou múltiplas transições para outros estados. Use o array `Conditions` para selecionar parâmetros que devem corresponder à condição para fazer a transição.

#### Usar um AnimatorController

Para usar um AnimatorController, adicione um componente Animator ao objeto raiz das suas animações e selecione o asset AnimatorController que pretende usar para este objeto.

![AnimatorController assign to animator](/blender/animatorcontroller-assigning.webp)

Pode definir os parâmetros do Animator a partir de typescript ou, por exemplo, usando o evento de um componente Botão.

### Linha do Tempo — Exportação de NLA Tracks 🎬

Pode exportar NLA tracks do Blender diretamente para a web.
Adicione um componente PlayableDirector (através de `Add Component`) a qualquer objeto do Blender. Atribua os objetos na lista ``animation tracks`` no componente para o qual pretende que as NLA tracks sejam exportadas.

![](/blender/timeline_setup.webp)
![](/blender/timeline.webp)

::: details Exemplo de código para reprodução interativa da linha do tempo
Adicione este script a `src/scripts` (veja a secção de componentes personalizados) e adicione-o a qualquer objeto no Blender para fazer com que o tempo de uma linha do tempo seja controlado por scrolling nos navegadores

```ts twoslash
import { Behaviour, PlayableDirector, serializable, Mathf } from "@needle-tools/engine";

export class ScrollTimeline extends Behaviour {

    @serializable(PlayableDirector)
    timeline?: PlayableDirector;

    @serializable()
    sensitivity: number = .5;

    @serializable()
    clamp: boolean = false;

    private _targetTime: number = 0;

    awake() {
        this.context.domElement.addEventListener("wheel", this.onWheel);
        if (this.timeline) this.timeline.pause();
    }

    private onWheel = (e: WheelEvent) => {
        if (this.timeline) {
            this._targetTime = this.timeline.time + e.deltaY * 0.01 * this.sensitivity;
            if (this.clamp) this._targetTime = Mathf.clamp(this._targetTime, 0, this.timeline.duration);
        }
    }

    update(): void {
        if (!this.timeline) return;
        const time = Mathf.lerp(this.timeline.time, this._targetTime, this.context.time.deltaTime / .3);
        this.timeline.time = time;
        this.timeline.pause();
        this.timeline.evaluate();
    }
}
```
:::

## Interatividade 😎

Pode adicionar ou remover componentes a objetos na sua hierarquia usando o painel Componentes do Needle:

![Component panel](/blender/components-panel.webp)

![Component panel](/blender/components-panel-select.webp)
*Por exemplo, adicionando um componente `OrbitControls` ao objeto câmara*
*obtém controlos básicos da câmara para dispositivos móveis e desktop*
*Ajuste as definições para cada componente nos respetivos painéis*

Os componentes podem ser removidos usando o botão X no canto inferior direito:

![Remove component](/blender/remove-component.webp)

### Componentes Personalizados
Componentes personalizados também podem ser facilmente adicionados simplesmente escrevendo classes Typescript. Serão automaticamente compilados e aparecerão no Blender quando guardados.

Para criar componentes personalizados, abra o espaço de trabalho através do painel Projeto do Needle e adicione um ficheiro de script `.ts` em `src/scripts` dentro do seu projeto web. Por favor, consulte a [documentação de scripting](http://docs.needle.tools/scripting) para aprender como escrever componentes personalizados para o Needle Engine.

::: warning Nota
Certifique-se de que ``@needle-tools/needle-component-compiler`` 2.x está instalado no seu projeto web (package.json devDependencies)
:::

## Lightmapping 💡

O Needle inclui um plugin de lightmapping que torna muito fácil 'cozinhar' (bake) belas luzes em texturas e trazê-las para a web. O plugin irá gerar automaticamente UVs para lightmap para todos os modelos marcados para lightmap, não há necessidade de criar um atlas de textura manual. Também suporta lightmapping de múltiplas instâncias com os seus próprios dados de lightmap.
Para que o lightmapping funcione, precisa de pelo menos uma luz e um objeto com `Lightmapped` ativado no painel `Needle Object`.

<video-embed limit_height max_height="800px" src="/docs/blender/lightmapping.mp4" />

::: tip
Pode descarregar o ficheiro .blend do vídeo [aqui](https://engine.needle.tools/downloads/blender/lightmaps.blend).
:::
Use o painel Objeto do Needle para ativar o lightmapping para um objeto de malha ou luz:

![Lightmapping object](/blender/lightmapping-object.webp)

Para acesso rápido às definições de lightmap e opções de 'cozedura' (baking), pode usar o painel de vista da cena no separador `Needle`:

![Lightmapping scene panel](/blender/lightmapping-scene-panel.webp)

Alternativamente, também pode usar o painel Lightmapping no separador `Render Properties`:

![Lightmapping object](/blender/lightmapping-panel.webp)

::: warning Funcionalidade Experimental
O plugin de lightmapping é experimental. Recomendamos criar uma cópia de segurança do seu ficheiro .blend ao usá-lo. Por favor, reporte problemas ou erros que encontrar no [nosso fórum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) 🙏
:::

## Compressão de Texturas

O Pipeline de Compilação do Needle Engine comprime automaticamente texturas usando ECT1S e UASTC (dependendo do seu uso nos materiais) ao fazer uma compilação de produção (**requer que o [toktx](../getting-started/index.md#install-these-tools-for-production-builds) esteja instalado**). Mas pode substituir ou mudar o tipo de compressão por textura no painel Material.

Pode modificar a compressão que está a ser aplicada por textura. Para substituir as definições de compressão predefinidas, vá para o separador `Material` e abra as `Needle Material Settings`. Lá encontrará um botão de alternância para substituir as definições de textura por textura usada no seu material. Veja a [tabela de compressão de texturas](../deployment.md#how-do-i-choose-between-etc1s-uastc-and-webp-compression) para uma breve visão geral sobre as diferenças entre cada algoritmo de compressão.

![Texture Compression options in Blender](/blender/texture-compression.webp)

## Atualização

A lâmpada no painel Projeto do Needle informa-o quando uma nova versão do add-on está disponível.
Basta clicar no ícone para descarregar a nova versão.
![Update notification](/blender/updates.webp)

## Reportar um problema

Se encontrar quaisquer problemas, teremos todo o gosto em ajudar! Por favor, junte-se ao [nosso fórum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) para suporte rápido.

Por favor, verifique também os logs no Blender. Pode encontrar logs específicos do Add-on Needle Engine através de `Help/Needle` no Blender.

### Reportador de Bugs Integrado
![Needle Blender Bug Reporter panel](/blender/bugreporter.webp)
Também pode criar e carregar automaticamente um relatório de bug diretamente do Blender. Relatórios de bug carregados serão usados unicamente para debugging. São encriptados no nosso backend e serão eliminados após 30 dias.

Se necessário, em certos casos, também podemos configurar NDAs personalizados para os seus projetos. Por favor, contacte-nos para mais informações.

:::tip Usar o Reportador de Bugs requer um projeto web
Certifique-se de que configurou um projeto web antes de enviar um relatório de bug – isso permitir-nos-á entender mais sobre o seu sistema e configuração e tornará mais fácil reproduzir o problema.
:::

# Próximos Passos

- [Conceito: Projetos Web](../project-structure.md)
- [Conceito: Exportar Assets](../export.md)
- [Conceito: Implementação (Partilhe o seu website)](../deployment.md)
- [Componentes: Aprenda sobre Everywhere Actions](../everywhere-actions.md)
- [Scripting para Iniciantes: Fundamentos de Typescript](../getting-started/typescript-essentials.md)
- [Scripting para Iniciantes: Como escrever componentes personalizados](../scripting.md)

---
Página automaticamente traduzida usando IA