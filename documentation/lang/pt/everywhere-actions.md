---
title: Everywhere Actions
---

## O que são Everywhere Actions?

As Everywhere Actions da Needle são um conjunto de componentes cuidadosamente selecionados que permitem criar experiências interativas em Unity sem escrever uma única linha de código.
São desenhadas para servir como blocos de construção para experiências na web, mobile e XR, **incluindo Realidade Aumentada em iOS**.

A partir de triggers e actions de baixo nível, podem ser construídos comportamentos interativos complexos de nível superior.

### Plataformas Suportadas
- Desktop
- Mobile (Android / iOS)
- Óculos VR
- Dispositivos AR
- iOS AR – QuickLook (sim, é verdade!)

## Como usar Everywhere Actions?

Para suporte iOS, adicione o componente `USDZExporter` à sua cena. É uma boa prática adicioná-lo ao mesmo objeto que o componente `WebXR` (mas não é obrigatório).

Para adicionar uma action a qualquer objeto na sua cena
selecione-o e depois clique em `Add Component > Needle > Everywhere Actions > [Action]`.

![](/imgs/everywhere-actions-component-menu.gif)

## Lista de Everywhere Actions

| Action | Descrição | Casos de Uso de Exemplo |
| --- | --- | --- |
| Tocar Animação ao Clicar | Toca um estado de animação selecionado de um Animator. Após tocar, pode opcionalmente fazer a transição para outra animação. | Apresentações de produtos, tutoriais interativos, movimento de personagens |
| Mudar Material ao Clicar | Troca um material por outros. Todos os objetos com esse material serão trocados em conjunto. | Configuradores de produtos, personagens |
| Olhar Para | Faz um objeto olhar para a câmara. | Elementos de UI, sprites, infográficos, efeitos de billboard, hotspots clicáveis |
| Tocar Áudio ao Clicar | Toca um clipe de áudio selecionado. | Efeitos sonoros, Narração, Exposições de museus |
| Ocultar ao Iniciar | Oculta um objeto no início da cena para revelação posterior. |
| Definir Ativo ao Clicar | Mostra ou oculta objetos. |  |
| Mudar Transform ao Clicar | Move, roda ou escala um objeto. Permite movimento absoluto ou relativo. | Personagens, produtos, animação de UI (use animação para movimentos mais complexos) |
| Fonte de Áudio | Toca áudio ao iniciar e continua em loop. Espacial ou não espacial. | Música de fundo, sons ambiente |
| WebXR Image Tracking | Rastreia um alvo de imagem e mostra ou oculta objetos. | Experiências AR, apresentações de produtos |

## Exemplos

### Instrumento Musical

Demonstra áudio espacial, animação e interações.

<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Controladores de Personagem Simples

Demonstra a combinação de animações, "olhar para" e movimento.

<sample src="https://engine.needle.tools/samples-uploads/usdz-characters" />

### Rastreamento de Imagem

Demonstra como anexar conteúdo 3D a um marcador de imagem personalizado. Inicie a cena abaixo em AR e aponte a câmara do seu telemóvel para o marcador de imagem num ecrã, ou imprima-o.

<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Marcador de Imagem" width=300 />

<a href="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" target="_blank">Descarregar Marcador de Imagem de Exemplo</a>

**Em Android:** por favor, ative "WebXR Incubations" nos Chrome Flags. Pode encontrá-los colando [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) na barra de endereço do navegador Chrome do seu telemóvel Android.

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />

### Visão Geral de Blocos de Construção Interativos

<sample src="https://engine.needle.tools/samples-uploads/usdz-interactivity" />

## Criar as suas próprias Everywhere Actions

Criar novas Everywhere Actions envolve escrever código para a sua action em TypeScript, que será usado no navegador e para WebXR, e usar a nossa API TriggerBuilder e ActionBuilder para criar uma configuração correspondente para Realidade Aumentada em iOS via QuickLook. Ao criar actions personalizadas, tenha em mente que o QuickLook tem um conjunto limitado de funcionalidades disponíveis. Ainda pode usar qualquer código que queira para o navegador e WebXR, mas o comportamento para QuickLook pode precisar ser uma aproximação construída a partir dos triggers e actions disponíveis.

:::tip
Muitas vezes, construir comportamentos específicos requer pensar de forma criativa e aplicar as actions de baixo nível disponíveis. Um exemplo seria uma action "Tocar para Colocar" – não há raycasting ou hit testing disponível no QuickLook, mas pode cobrir a área de colocação esperada com vários objetos invisíveis e usar um trigger "Tap" para mover o objeto a ser colocado para a posição do objeto invisível tocado.
:::

Triggers e Actions para QuickLook são baseados nos [Apple's Preliminary Interactive USD Schemas](https://developer.apple.com/documentation/arkit/usdz_schemas_for_ar/actions_and_triggers)

### Exemplo de Código

Aqui está a implementação para `HideOnStart` como exemplo de como criar uma Everywhere Action com implementações para o navegador e para QuickLook:
@[code ts twoslash](@code/component-everywhere-action-hideonstart.ts)

::: tip
Frequentemente, obter o comportamento certo envolverá compor _actions de nível superior_ a partir das _actions de nível inferior_ disponíveis. Por exemplo, a nossa action "Change Material on Click" é composta por várias `fadeActions` e internamente duplica objetos com diferentes conjuntos de materiais cada. Ao construir cuidadosamente estas actions, podem ser alcançados comportamentos complexos.
:::

### Métodos de baixo nível para criar as suas próprias actions

| Triggers | |
| --- | --- |
| `TriggerBuilder.sceneStartTrigger` | |
| `TriggerBuilder.tapTrigger` | |

| Actions | |
| --- | --- |
| `ActionBuilder.fadeAction` | |
| `ActionBuilder.startAnimationAction` | |
| `ActionBuilder.waitAction` | |
| `ActionBuilder.lookAtCameraAction` | |
| `ActionBuilder.emphasize` | |
| `ActionBuilder.transformAction` | |
| `ActionBuilder.playAudioAction` | |

| Group Actions | |
| --- | --- |
| `ActionBuilder.sequence` | |
| `ActionBuilder.parallel` | |
| `GroupAction.addAction` | |
| `GroupAction.makeParallel` | |
| `GroupAction.makeSequence` | |
| `GroupAction.makeLooping` | |
| `GroupAction.makeRepeat` | |

Para ver a implementação das nossas Everywhere Actions integradas, por favor, consulte `src/engine-components/export/usdz/extensions/behavior/BehaviourComponents.ts`.

## Leitura adicional

As seguintes páginas fornecem mais exemplos que pode testar e explorar agora mesmo:

- Visite o nosso [Website AR Showcase](https://engine.needle.tools/projects/ar-showcase/) que tem muitos exemplos de AR interativos com foco em iOS AR & Quicklook
- [Needle Engine Everywhere Action Samples](https://engine.needle.tools/samples/?overlay=samples&tag=everywhere+actions)

Página traduzida automaticamente usando IA