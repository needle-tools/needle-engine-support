---
title: Exemplos de Scripting
description: Uma coleção de snippets e exemplos de script úteis.
---

# Exemplos de Scripting

Se é novo em scripting, **altamente recomendamos** ler os guias seguintes primeiro:

- [Guia para Iniciantes: Essenciais de Typescript](./getting-started/typescript-essentials.md)
- [Guia para Iniciantes: Needle Engine para Developers Unity](./getting-started/for-unity-developers.md)
- [Tutorial em vídeo: Como escrever componentes personalizados](https://youtu.be/uf5UK0bLHlY?si=82U_2L4n2V7XL7RJ)

Abaixo encontrará alguns scripts básicos como referência rápida.

Também oferecemos muitas cenas de exemplo e projetos completos que pode descarregar e usar como ponto de partida:
- [Visitar Website de Exemplos](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=scripting_examples)
- [Descarregar Pacote de Exemplos](https://engine.needle.tools/downloads/unity/samples)
- [Coleção Stackblitz do Needle Engine](https://stackblitz.com/@marwie/collections/needle-engine)
- [API do Needle Engine](https://engine.needle.tools/api)

## Componente básico
<stackblitz file="@code/basic-component.ts"></stackblitz>
@[code ts twoslash](@code/basic-component.ts)

ver [scripting](scripting#lifecycle-methods) para todos os eventos de componente

## Referenciar um Objeto do Unity
@[code ts twoslash](@code/component-object-reference.ts)

## Referenciar e carregar um asset do Unity (Prefab ou SceneAsset)
@[code ts twoslash](@code/component-prefab.ts)

## Referenciar e carregar cenas do Unity
::: tip
Encontre um [exemplo funcional nos nossos samples](https://engine.needle.tools/samples/multi-scenes-(dynamic-loading)) para descarregar e experimentar
:::

@[code ts twoslash](@code/component-scene.ts)

## Receber Cliques em Objetos
Adicione este script a qualquer objeto na sua cena que deseja que seja clicável. Certifique-se de ter também um componente `ObjectRaycaster` na hierarquia pai desse objeto.

<stackblitz file="@code/component-click.ts">
test
</stackblitz>

@[code ts twoslash](@code/component-click.ts)


## Cliques em Objetos em Rede (Networking)

Adicione este script a qualquer objeto na sua cena que deseja que seja clicável. Certifique-se de ter também um componente `ObjectRaycaster` na hierarquia pai desse objeto.
O componente enviará o clique recebido para todos os clientes conectados e levantará um evento ao qual pode reagir na sua aplicação. Se estiver a usar Unity ou Blender, pode simplesmente atribuir funções para chamar ao evento `onClick` para, por exemplo, reproduzir uma animação ou ocultar objetos.

@[code ts twoslash](@code/component-click-networking.ts)

### Reproduzir Animação ao Clique
@[code ts twoslash](@code/component-animation-onclick.ts)

## Referenciar um Animation Clip
Isto pode ser útil se deseja executar a sua lógica de animação personalizada.
Pode também exportar um array de clips.
@[code ts twoslash](@code/component-animationclip.ts)


## Criar e invocar um UnityEvent

@[code ts twoslash](@code/component-unityevent.ts)
::: tip
Os eventos EventList são também invocados ao nível do componente. Isto significa que também pode subscrever o evento declarado acima usando ``myComponent.addEventListener("my-event", evt => {...})`` também.
Esta é uma funcionalidade experimental. Por favor, forneça feedback no nosso [fórum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)
:::


### Declarar um tipo de evento personalizado
Isto é útil quando deseja expor um evento ao Unity ou Blender com alguns argumentos personalizados (como uma string)
@[code ts twoslash](@code/component-customevent.ts)

_Exemplo de uso:_
![20221128-210735_Unity-needle](https://user-images.githubusercontent.com/2693840/204370950-4c89b877-90d7-4e6f-8266-3352e6da16f4.png)

## Usar objetos aninhados e serialização

Pode aninhar objetos e os seus dados. Com decoradores `@serializable(SomeType)` que correspondam corretamente, os dados serão serializados e desserializados nos tipos corretos automaticamente.

No seu componente typescript:
@[code ts twoslash](@code/component-nested-serialization.ts)

Em C# em qualquer script:
@[code](@code/component-nested-serialization-cs.cs)

::: tip
Sem os decoradores de tipo corretos, ainda obterá os dados, mas apenas como um objeto simples. Isto é útil quando está a portar componentes, uma vez que terá acesso a todos os dados e poderá adicionar tipos conforme necessário.
:::

## Usar Web APIs
::: tip
Tenha em mente que ainda tem acesso a todas as web apis e pacotes [npm](https://npmjs.org)!
Essa é a beleza do Needle Engine, se nos permitem dizê-lo aqui 😊
:::

### Exibir localização atual
@[code ts twoslash](@code/component-location.ts)

### Exibir hora atual usando uma Coroutine
@[code ts twoslash](@code/component-time.ts)

<video-embed src="./videos/component-time.mp4" limit_height />


## Alterar propriedade de shader personalizada

Assumindo que tem um shader personalizado com um nome de propriedade `_Speed` que é um valor float, é assim que o alteraria a partir de um script.
Pode encontrar um [exemplo live para descarregar nos nossos samples](https://engine.needle.tools/samples/shaders/)

<!-- SAMPLE modify custom shader material property -->


## Alternar atributo src

Ver [exemplo live](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html) no StackBlitz


## Adicionar novos efeitos de postprocessing

Certifique-se de instalar [`npm i postprocessing`](https://github.com/pmndrs/postprocessing) no seu projeto web. Então pode adicionar novos efeitos derivando de `PostProcessingEffect`.

Para usar o efeito, adicione-o ao mesmo objeto que o seu componente `Volume`.

Aqui está um exemplo que envolve o [efeito de postprocessing Outline](https://pmndrs.github.io/postprocessing/public/demo/#outline). Pode expor variáveis e configurações como de costume, pois qualquer efeito é também apenas um componente na sua cena three.js.

@[code](@code/custom-post-effect.ts)


## Comportamento de ParticleSystem personalizado


@[code ts twoslash](@code/custom-particle-system-behaviour.ts)


## Componente de Áudio 2D personalizado

Este é um exemplo de como poderia criar o seu próprio componente de áudio.
Para a maioria dos casos de uso, no entanto, pode usar o componente AudioSource principal e não precisa de escrever código.

@[code ts twoslash](@code/component-2d-audio.ts)


## Ficheiros externos arbitrários

Use o tipo FileReference para carregar ficheiros externos (por exemplo, um ficheiro json)
@[code ts twoslash](@code/component-filereference.ts)

<!-- SAMPLE receive click from HTML button
## Receber clique de elemento html em componente
-->



<!-- SAMPLE disable environment light
## Desativar luz de ambiente
-->


<!-- SAMPLE using mediapipe with hands
## Usar pacote mediapipe para controlar a cena 3D com as mãos
Certifique-se de instalar o pacote mediapipe. Visite o link do github abaixo para ver a configuração completa do projeto.
Experimente [live aqui](https://engine.needle.tools/samples/mediapipe-hands/) - requer uma webcam/câmara
-->


<!-- SAMPLE Change Color On Collision
## Alterar Cor na Colisão
-->

<!-- SAMPLE Physics Trigger Relay
## Relay de Trigger Físico
Invocar eventos usando métodos de trigger físico de um objeto
-->

<!-- SAMPLE Auto Reset
## Reset Automático
Resetar a posição de um objeto automaticamente quando este está a sair de um trigger físico
-->

<!-- SAMPLE Play Audio On Collision
## Reproduzir Áudio na Colisão
-->

<!-- SAMPLE Set Random Color
## Definir Cor Aleatória
Aleatorizar a cor de um objeto ao iniciar. Note que os materiais são clonados no método start
-->

<!-- SAMPLE Timed Spawn
## Spawn de Objetos ao Longo do Tempo
-->

Página traduzida automaticamente usando IA