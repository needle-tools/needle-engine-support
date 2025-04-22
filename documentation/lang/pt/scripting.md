---
title: Criar e usar Componentes
tags:
    - scripting
    - serialization
    - csharp
    - typescript
    - javascript
    - components
---

# Criar componentes personalizados

Se é novo em scripting, **altamente recomendamos** ler primeiro os seguintes guias:

- [Essenciais de Typescript](./getting-started/typescript-essentials.md)
- [Needle Engine para Programadores Unity](./getting-started/for-unity-developers.md)

Se sabe o que está a fazer, sinta-se à vontade para saltar diretamente para a [documentação da API do Needle Engine](https://engine.needle.tools/docs/api/latest).

---

O código de runtime para o Needle Engine é escrito em [TypeScript](https://typescriptlang.org) (recomendado) ou [JavaScript](https://javascript.info/). Geramos automaticamente componentes stub C# a partir disso, que pode adicionar a GameObjects no editor. Os componentes C# e os seus dados são recriados pelo runtime como componentes JavaScript com os mesmos dados e anexados a objetos three.js.

Tanto componentes personalizados como componentes Unity incorporados podem ser mapeados para componentes JavaScript desta forma. Por exemplo, mapeamentos para muitos componentes incorporados relacionados com animação, renderização ou física já estão [incluídos no Needle Engine](./component-reference.md#unity-components).

Se quiser codificar em conjunto com os exemplos seguintes sem ter de instalar nada, basta clicar no link seguinte:

- [Criar espaço de trabalho virtual para codificar em conjunto](https://stackblitz.com/fork/github/needle-engine/vite-template?file=src%2Fmain.ts).

----

O nosso motor de runtime web adota um modelo de componentes semelhante ao do Unity e, portanto, fornece muita funcionalidade que parecerá familiar.
Os componentes anexados a objetos three's Object3D têm métodos de ciclo de vida como ``awake``, ``start``, ``onEnable``, ``onDisable``, ``update`` e ``lateUpdate`` que pode implementar. Também pode usar [Coroutines](#coroutines).

----

## Quando não precisa de escrever código

Frequentemente, cenas interativas podem ser realizadas usando Eventos no Unity e chamando métodos em componentes incorporados. Um exemplo típico é reproduzir uma animação ao clicar num botão - cria um botão, adiciona um evento Click no inspector e faz com que este chame Animator.SetTrigger ou similar para reproduzir uma animação específica.

O Needle Engine traduz Eventos Unity em chamadas de métodos JavaScript, o que torna este um fluxo de trabalho muito rápido e flexível - configure os seus eventos como de costume e quando forem chamados, funcionarão da mesma forma que no Unity.

![image](https://user-images.githubusercontent.com/2693840/187314594-7e34905d-e704-4fa3-835c-6b40f11e1c62.png)
_Um exemplo de um Evento de Clique de Botão que funciona pronto a usar no Needle Engine - sem necessidade de código._

## Criar um novo componente
Os scripts são escritos em TypeScript (recomendado) ou JavaScript.
Existem duas formas de adicionar scripts personalizados ao seu projeto:

- Simplesmente adicione um ficheiro com uma extensão `.ts` ou `.js` dentro de `src/scripts/` no diretório do seu projeto gerado, por exemplo `src/scripts/MyFirstScript.ts`

- Específico do Unity:
Organize o seu código em Ficheiros de Definição NPM (pacotes npm). Estes ajudam a modularizar e reutilizar código entre projetos e, se estiver familiarizado com desenvolvimento web, são de facto pacotes npm regulares que são instalados localmente.
No Unity, pode criar ficheiros NpmDef através de `Create > NPM Definition` e depois adicionar ficheiros TypeScript clicando com o botão direito num ficheiro NpmDef e selecionando `Create > TypeScript`. Por favor, veja [este capítulo](./project-structure.md#npm-definition-files) para mais informações.

Em ambas as abordagens, os diretórios de código-fonte são observados para alterações e componentes stub C# ou painéis Blender são regenerados sempre que uma alteração é detetada.
Alterações nos ficheiros de código-fonte também resultam num hot reload do website em execução – não tem de esperar que o Unity recompile os componentes C#. Isto torna a iteração no código praticamente instantânea.

Pode até ter múltiplos tipos de componentes dentro de um único ficheiro (por exemplo, pode declarar `export class MyComponent1` e `export class MyOtherComponent` no mesmo ficheiro Typescript).

Se é novo a escrever Javascript ou Typescript, recomendamos ler o guia [Essenciais de Typescript](./getting-started/typescript-essentials.md) primeiro antes de continuar com este guia.

:::details Exemplo: Criar um Componente que roda um objeto

- **Criar um componente que roda um objeto**
Crie ``src/scripts/Rotate.ts`` e adicione o seguinte código:
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class Rotate extends Behaviour
{
    @serializable()
    speed : number = 1;

    start(){
        // logging this is useful for debugging in the browser.
        // You can open the developer console (F12) to see what data your component contains
        console.log(this);
    }

    // update will be called every frame
    update(){
        this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
    }
}
```

Agora dentro do Unity, um novo script chamado ``Rotate.cs`` será gerado automaticamente. Adicione o novo componente Unity a um Cubo e salve a cena.
O cubo está agora a rodar dentro do navegador.
Abra a consola do programador do chrome com `F12` para inspecionar o log do método ``Rotate.start``. Esta é uma prática útil para aprender e depurar quais campos são exportados e atualmente atribuídos. Em geral, todos os campos públicos e serializáveis e todas as propriedades públicas são exportados.

Agora adicione um novo campo ``public float speed = 5`` ao seu componente Unity e salve-o. O inspector do componente Rotate agora mostra um campo ``speed`` que pode editar. Salve a cena (ou clique no botão ``Build``) e note que o componente javascript agora tem o valor ``speed`` exportado atribuído.
:::

:::details Criar componente com uma função personalizada
Consulte o [Guia de Essenciais de Typescript](./getting-started/typescript-essentials.md) para saber mais sobre a sintaxe e linguagem.
```ts twoslash
import { Behaviour } from "@needle-tools/engine";

export class PrintNumberComponent extends Behaviour
{
    start(){
      this.printNumber(42);
    }

    private printNumber(myNumber : number){
        console.log("My Number is: " + myNumber);
    }
}
```
:::

:::details Controlo de Versão e Unity
Embora os componentes C# gerados usem o nome do tipo para produzir GUIDs estáveis, recomendamos submeter os componentes gerados no controlo de versão como uma boa prática.
:::

## Arquitetura de componentes
Os componentes são adicionados a `Object3Ds` do three.js. Isto é semelhante à forma como os Componentes no Unity são adicionados a `GameObjects`. Portanto, quando queremos aceder a um Object3D do three.js, podemos aceder a ele como ``this.gameObject``, que retorna o `Object3D` ao qual o componente está anexado.

***Nota**: Definir ``visible`` para false num Object3D agirá como ``SetActive(false)`` no Unity - significando que também desativará todos os componentes atuais neste objeto e nos seus filhos. Os eventos Update para componentes inativos não são chamados até que ``visible`` seja definido como true novamente.* Se quiser ocultar um objeto sem afetar os componentes, pode simplesmente desativar o componente Needle Engine `Renderer`.

### Métodos de ciclo de vida

Note que os métodos de ciclo de vida são apenas chamados quando são declarados. Portanto, declare apenas métodos de ciclo de vida `update` quando forem realmente necessários, caso contrário, pode prejudicar o desempenho se tiver muitos componentes com loops de atualização que não fazem nada.

| Nome do método | Descrição |
| -- | --
| `awake()` | Primeiro método chamado quando um novo componente é criado
| `onEnable()` | Chamado quando um componente é ativado (por exemplo, quando ``enabled`` muda de false para true)
| `onDisable()` | Chamado quando um componente é desativado (por exemplo, quando ``enabled`` muda de true para false)
| `onDestroy()` | chamado quando o Object3D ou componente está a ser destruído
| `start()` | Chamado no início do primeiro frame após o componente ter sido criado
| `earlyUpdate()` | Primeiro evento de atualização
| `update()` | Evento de atualização padrão
| `lateUpdate()` | Chamado após update
| `onBeforeRender()` | Último evento de atualização antes da chamada de renderização
| `onAfterRender()` | Chamado após o evento de renderização

### Métodos de eventos de física
| Nome do método | Descrição |
| -- | --
| `onCollisionEnter(col : Collision)` |
| `onCollisionStay(col : Collision)` |
| `onCollisionExit(col : Collision)` |
| `onTriggerEnter(col : Collision)` |
| `onTriggerStay(col : Collision)` |
| `onTriggerExit(col : Collision)` |

### Métodos de eventos de input
| Nome do método | Descrição |
| -- | --
| `onPointerEnter(args : PointerEventData)` | Chamado quando um cursor começa a pairar sobre um objeto (ou qualquer um dos seus filhos)
| `onPointerMove(args : PointerEventData)` | Chamado quando um cursor se move sobre um objeto (ou qualquer um dos seus filhos)
| `onPointerExit(args : PointerEventData)` | Chamado quando um cursor sai (pára de pairar) de um objeto
| `onPointerDown(args : PointerEventData)` | Chamado quando um cursor é pressionado sobre um objeto
| `onPointerUp(args : PointerEventData)` | Chamado quando um cursor é libertado sobre um objeto
| `onPointerClick(args : PointerEventData)` | Chamado quando um cursor é clicado sobre um objeto

### Métodos de eventos de XR
*requer Needle Engine >= 3.32.0*
| Nome do método | Descrição |
| -- | --
| `supportsXR(mode: XRSessionMode)` | Implementar opcionalmente se quiser receber callbacks XR apenas para modos XR específicos como `immersive-vr` ou `immersive-ar`. Retorne `true` para notificar o sistema que deseja callbacks para o modo passado
| `onBeforeXR(mode: XRSessionMode, init: XRSessionInit)` | Chamado logo antes de uma XRSession ser solicitada e pode ser usado para modificar o objeto XRSessionInit
| `onEnterXR(args: NeedleXREventArgs)` | Callback quando este componente se junta a uma sessão xr (ou se torna ativo numa sessão XR em execução)
| `onUpdateXR(args: NeedleXREventArgs)` | Callback quando uma sessão xr atualiza (enquanto ainda está ativa na sessão XR)
| `onLeaveXR(args: NeedleXREventArgs)` | Callback quando este componente sai de uma sessão xr (ou quando se torna inativo numa sessão XR em execução)
| `onControllerAdded(args: NeedleXRControllerEventArgs)` | Callback quando um controlador é ligado/adicionado enquanto numa sessão XR OU quando o componente se junta a uma sessão XR em execução que já tem controladores ligados OU quando o componente se torna ativo durante uma sessão XR em execução que já tem controladores ligados
| `onControllerRemoved(args: NeedleXRControllerEventArgs)` | callback quando um controlador é removido enquanto numa sessão XR OU quando o componente se torna inativo durante uma sessão XR em execução

#### Eventos XR adicionais

| Nome do método | Descrição |
| -- | --
| `window.addEventListener("needle-xrsession-start")` | CustomEvent que é invocado quando uma XRSession começa. `details` contém a `NeedleXRSession`
| `window.addEventListener("needle-xrsession-end")` | CustomEvent que é invocado quando uma XRSession começa. `details` contém a `NeedleXRSession`
| `onXRSessionStart(args: { session:NeedleXRSession } )` | hook de evento global. Para anular a subscrição use `offXRSessionStart`

### Coroutines

Coroutines podem ser declaradas usando a [Sintaxe de Gerador JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).
Para iniciar uma coroutine, chame ``this.startCoroutine(this.myRoutineName());``

**Exemplo**
```ts twoslash
import { Behaviour, FrameEvent } from "@needle-tools/engine";

export class Rotate extends Behaviour {

    start() {
        // the second argument is optional and allows you to specifiy
        // when it should be called in the current frame loop
        // coroutine events are called after regular component events of the same name
        // for example: Update coroutine events are called after component.update() functions
        this.startCoroutine(this.rotate(), FrameEvent.Update);
    }

    // this method is called every frame until the component is disabled
    *rotate() {
        // keep looping forever
        while (true) {
            yield;
        }
    }
}
```

Para parar uma coroutine, ou saia da rotina retornando dela, ou guarde em cache o valor de retorno de ``startCoroutine`` e chame ``this.stopCoroutine(<...>)``. Todas as Coroutines são paradas em ``onDisable`` / ao desativar um componente.

## Hooks de Ciclo de Vida Especiais

O Needle Engine também expõe alguns hooks de ciclo de vida que pode usar para enganchar no loop de atualização sem ter que escrever um componente completo.
Esses hooks podem ser inseridos em qualquer ponto da sua aplicação web (por exemplo, no âmbito de nível superior ou num componente svelte)
| Nome do método | Descrição |
| -- | --
| `onInitialized(cb, options)` | Chamado quando um novo contexto é inicializado (antes do primeiro frame)
| `onClear(cb, options)` | Registar um callback antes do contexto do motor ser limpo
| `onDestroy(cb, options)` | Registar um callback no motor antes do contexto ser destruído
| `onStart(cb, options)` | Chamado diretamente após o `start` dos componentes no início de um frame
| `onUpdate(cb, options)` | Chamado diretamente após o `update` dos componentes
| `onBeforeRender(cb, options)` | chamado antes de chamar render
| `onAfterRender(cb, options)` | chamado antes de chamar render

Por exemplo ([Ver exemplo no stackblitz](https://stackblitz.com/edit/needle-engine-lifecycle-hooks?file=src%2Fmain.ts))
```ts twoslash
// this can be put into e.g. main.ts or a svelte component (similar to onMount)
import { onStart, onUpdate, onBeforeRender, onAfterRender } from "@needle-tools/engine"

onStart(ctx => console.log("Hello Scene", ctx.scene));

onUpdate(ctx => {
    // do something... e.g. access the frame # or deltatime via ctx.time
    console.log("UPDATE", ctx.time.frame);
});

onBeforeRender(ctx => {
    // this event is only called once because of the { once: true } argument
    console.log("ON BEFORE RENDER", ctx.time.frame);
}, { once: true } );

// Every event hook returns a method to unsubscribe from the event
const unsubscribe = onAfterRender(ctx => {
    console.log("ON AFTER RENDER", ctx.time.frame);
});
// Unsubscribe from the event at any time
setTimeout(()=> unsubscribe(), 1000);
```

## Encontrar, adicionar e remover componentes

Para aceder a outros componentes, use os métodos estáticos em ``GameObject`` ou métodos ``this.gameObject``. Por exemplo, para aceder a um componente `Renderer` no pai, use ``GameObject.getComponentInParent(this.gameObject, Renderer)`` ou ``this.gameObject.getComponentInParent(Renderer)``.

**Exemplo:**
```ts twoslash
import { Behaviour, GameObject, Renderer } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    start() {
        const renderer = GameObject.getComponentInParent(this.gameObject, Renderer);
        console.log(renderer);
    }
}
```

### Alguns dos métodos disponíveis:

| Método |  |
| -- | --
| `GameObject.instantiate(Object3D, InstantiateOptions)` | cria uma nova instância deste objeto, incluindo novas instâncias de todos os seus componentes
| `GameObject.destroy(Object3D \| Component)` | destrói um componente ou Object3D (e os seus componentes)
| `GameObject.addNewComponent(Object3D, Type)` | adiciona (e cria) um novo componente de um tipo ao objeto fornecido. Note que ``awake`` e ``onEnable`` já são chamados quando o componente é retornado
| `GameObject.addComponent(Object3D, Component)` | move uma instância de componente para o objeto fornecido. É útil se já tiver uma instância, por exemplo, ao criar um componente com, por exemplo, `new MyComponent()` e depois anexá-lo a um objeto
| `GameObject.removeComponent(Component)` | remove um componente de um gameObject
| `GameObject.getComponent(Object3D, Type)` | retorna o primeiro componente que corresponde a um tipo no objeto fornecido.
| `GameObject.getComponents(Object3D, Type)` | retorna todos os componentes que correspondem a um tipo no objeto fornecido.
| `GameObject.getComponentInChildren` | igual a ``getComponent``, mas também pesquisa em objetos filhos.
| `GameObject.getComponentsInChildren` | igual a ``getComponents``, mas também pesquisa em objetos filhos.
| `GameObject.getComponentInParent` | igual a ``getComponent``, mas também pesquisa em objetos pai.
| `GameObject.getComponentsInParent` | igual a ``getComponents``, mas também pesquisa em objetos pai.
| `GameObject.findObjectOfType` | pesquisa toda a cena por um tipo.
| `GameObject.findObjectsOfType` | pesquisa toda a cena por todos os tipos correspondentes.

## Three.js e o HTML DOM

O contexto refere-se ao runtime dentro de um [componente web](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
A cena three.js vive dentro de um componente HTML personalizado chamado ``<needle-engine>`` (veja o *index.html* no seu projeto). Pode aceder ao componente web `<needle-engine>` usando ``this.context.domElement``.

Esta arquitetura permite potencialmente ter múltiplas cenas WebGL do Needle na mesma página web, que podem correr sozinhas ou comunicar entre si como partes da sua página web.

### Aceder à cena
Para aceder à cena atual a partir de um componente, use `this.scene`, que é equivalente a `this.context.scene`. Isto dá-lhe o objeto de cena three.js raiz.

Para percorrer a hierarquia a partir de um componente, pode iterar sobre os filhos de um objeto
com um loop for:
```ts twoslash
for(let i = 0; i < this.gameObject.children; i++)
    console.log(this.gameObject.children[i]);
```
ou pode iterar usando o equivalente a `foreach`:
```ts twoslash
for(const child of this.gameObject.children) {
    console.log(child);
}
```
Também pode usar métodos específicos do three.js para iterar rapidamente todos os objetos recursivamente usando o método [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse):
```ts twoslash
import { Object3D } from "three";
this.gameObject.traverse((obj: Object3D) => console.log(obj));
```
ou para apenas percorrer objetos visíveis, use [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) em vez disso.

Outra opção que é bastante útil quando quer apenas iterar objetos que são renderizáveis é consultar todos os componentes renderer e iterar sobre eles assim:
```ts twoslash
import { Renderer } from "@needle-tools/engine";
for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
Para mais informações sobre como obter componentes, veja a próxima seção.

### Tempo
Use `this.context.time` para aceder a dados de tempo:
- `this.context.time.time` é o tempo desde que a aplicação começou a correr
- `this.context.time.deltaTime` é o tempo que passou desde o último frame
- `this.context.time.frameCount` é o número de frames que passaram desde que a aplicação começou
- `this.context.time.realtimeSinceStartup` é o tempo não escalado desde que a aplicação começou a correr

Também é possível usar `this.context.time.timeScale` para abrandar deliberadamente o tempo para, por exemplo, efeitos de câmara lenta.

### Input
Receber dados de input para o objeto em que o componente se encontra:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onPointerDown() {
        console.log("POINTER DOWN on " + this.gameObject.name);
    }
}
```

Também pode subscrever eventos globais na enumeração ``InputEvents`` assim:
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable() {
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    onDisable() {
        // it is recommended to also unsubscribe from events when your component becomes inactive
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    // @nonSerialized
    inputPointerDown = (evt: NEPointerEvent) => { console.log("POINTER DOWN anywhere on the <needle-engine> element"); }
}
```

Ou use ``this.context.input`` se quiser sondar o estado do input a cada frame:

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update() {
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN anywhere")
        }
    }
}
```

Se quiser lidar com os inputs você mesmo, também pode subscrever a [todos os eventos que o navegador fornece](https://developer.mozilla.org/en-US/docs/Web/Events) (há imensos). Por exemplo, para subscrever o evento de clique do navegador, pode escrever:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onEnable() {
        window.addEventListener("click", this.windowClick);
    }

    onDisable() {
        // unsubscribe again when the component is disabled
        window.removeEventListener("click", this.windowClick);
    }

    windowClick = () => { console.log("CLICK anywhere on the page, not just on <needle-engine>"); }
}
```
Note que, neste caso, tem de lidar com todos os casos você mesmo. Por exemplo, pode precisar de usar eventos diferentes se o seu utilizador estiver a visitar o seu website em desktop vs mobile vs um dispositivo VR. Estes casos são automaticamente tratados pelos eventos de input do Needle Engine (por exemplo, `PointerDown` é acionado para clique do rato, toque e, no caso de VR, para o botão do controlador pressionado).

### Raycasting

Use ``this.context.physics.raycast()`` para executar um raycast e obter uma lista de interseções. Se não passar quaisquer opções, o raycast é executado a partir da posição do rato (ou primeira posição de toque) no espaço de ecrã usando a `mainCamera` atualmente ativa. Também pode passar um objeto `RaycastOptions` que tem várias configurações como `maxDistance`, a câmara a ser usada ou as camadas a serem testadas contra.

Use ``this.context.physics.raycastFromRay(your_ray)`` para executar um raycast usando um [raio three.js](https://threejs.org/docs/#api/en/math/Ray).

> **Nota**: Este tipo de raycast lança um raio contra todos os objetos visíveis na cena. Nenhum motor de física é necessário, o que é diferente do comportamento no Unity, onde sempre precisa de colliders para acertar em objetos. Se quiser lançar apenas contra colliders de física, use os métodos `physics.engine.raycast` descritos abaixo.

#### Considerações de desempenho

Ao usar as configurações de compressão padrão do Needle, versões simplificadas de meshes são automaticamente criadas e usadas também para raycasting. Ainda assim, alguns tipos de meshes são lentos – por exemplo, skinned meshes ou meshes com blendshapes requerem cálculos caros para determinar acertos exatos. Considere definir esses objetos para a camada `Ignore Raycast` no Unity para evitar raycasting contra eles.

#### Raycasting baseado em Física

Outra opção é usar os métodos de raycast de física que retornarão apenas acertos com colliders na cena.

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Aqui está um [exemplo editável para raycast de física](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)

### Networking
Os métodos de Networking podem ser acedidos via ``this.context.connection``. Por favor, consulte a [documentação de networking](./networking.md) para mais informações.

## Aceder ao Needle Engine e a componentes a partir de qualquer lugar
É possível aceder a toda a funcionalidade descrita acima usando código JavaScript regular que não está dentro de componentes e vive noutro lugar. Todos os componentes e funcionalidade do runtime do needle são acessíveis via o namespace global ``Needle`` (pode escrever ``console.log(Needle)`` para obter uma visão geral)

Pode encontrar componentes usando ``Needle.findObjectOfType(Needle.AudioSource)``, por exemplo. É recomendado guardar essas referências em cache, pois pesquisar repetidamente toda a cena é caro. Veja a lista para [encontrar, adicionar e remover componentes](#finding-adding-and-removing-components) acima.

Para obter callbacks para o carregamento inicial da cena, veja o exemplo seguinte:
```js
<needle-engine loadstart="loadingStarted" progress="loadingProgress" loadfinished="loadingFinished"></needle-engine>

<script type="text/javascript">
function loadingStarted() { console.log("START") }
function loadingProgress() { console.log("LOADING...") }
function loadingFinished() { console.log("FINISHED!") }
</script>
```

Também pode subscrever o `NeedleEngine` global (por vezes também referido como *ContextRegistry*) para receber um callback quando um contexto Needle Engine foi criado ou para aceder a todos os contextos disponíveis:
```ts twoslash
class YourComponentType extends Behaviour {}
//---cut---
import { NeedleEngine, GameObject, Behaviour } from "@needle-tools/engine";

NeedleEngine.addContextCreatedCallback((args) => {
  const context = args.context;
  const scene = context.scene;
  const myInstance = GameObject.getComponentInChildren(scene, YourComponentType);
});
```

Outra opção é usar o [hook de ciclo de vida](#special-lifecycle-hooks) `onInitialized(ctx => {})`.

Também pode aceder a todos os contextos disponíveis via `NeedleEngine.Registered`, que retorna o array interno. (Note que este array não deve ser modificado, mas pode ser usado para iterar todos os contextos ativos para modificar configurações, por exemplo, definir todos os contextos para `context.isPaused = true`)

Abaixo encontra uma lista de eventos disponíveis no tipo estático `NeedleEngine`.
Pode subscrever esses eventos via `NeedleEngine.registerCallback(ContextEvent.ContextCreated, (args) => {})`

| Opções de ContextEvent | |
|---|---|
| `ContextEvent.ContextRegistered` | Chamado quando o contexto é registado no registry. |
| `ContextEvent.ContextCreationStart` | Chamado antes do primeiro glb ser carregado e pode ser usado para inicializar o motor de física. Pode retornar uma promise |
| `ContextEvent.ContextCreated` | Chamado quando o contexto foi criado antes do primeiro frame |
| `ContextEvent.ContextDestroyed` | Chamado quando o contexto foi destruído |
| `ContextEvent.MissingCamera` | Chamado quando o contexto não conseguiu encontrar uma câmara, atualmente apenas chamado durante a criação |
| `ContextEvent.ContextClearing` | Chamado quando o contexto está a ser limpo: todos os objetos na cena estão a ser destruídos e o estado interno é redefinido |
| `ContextEvent.ContextCleared` | Chamado depois de o contexto ter sido limpo |

## Gizmos

A classe estática `Gizmos` pode ser usada para desenhar linhas, formas e texto, o que é principalmente útil para depuração.
Todas as funções gizmos têm múltiplas opções, por exemplo, para cores ou por quanto tempo devem ser exibidas na cena. Internamente, são armazenadas em cache e reutilizadas.

| Gizmos | |
| -- | -- |
| `Gizmos.DrawLabel` | Desenha uma etiqueta opcionalmente com fundo. Pode ser anexado a um objeto. Retorna um handle de Etiqueta que pode ser usado para atualizar o texto. |
| `Gizmos.DrawRay` | Recebe uma origem e direção no espaço do mundo para desenhar uma linha de raio infinita |
| `Gizmos.DrawDirection` | Recebe uma origem e direção para desenhar uma direção no espaço do mundo |
| `Gizmos.DrawLine` | Recebe dois pontos vec3 no espaço do mundo para desenhar uma linha |
| `Gizmos.DrawWireSphere` | Desenha uma esfera de arame no espaço do mundo |
| `Gizmos.DrawSphere` | Desenha uma esfera sólida no espaço do mundo |
| `Gizmos.DrawWireBox` | Desenha uma caixa de arame no espaço do mundo |
| `Gizmos.DrawWireBox3` | Desenha uma box3 de arame |
| `Gizmos.DrawArrow` | Desenha uma seta recebendo dois pontos no espaço do mundo |

## Serialização / Componentes em ficheiros glTF
Para embutir componentes e recriar componentes com os seus tipos corretos em glTF, também precisamos de guardar tipos não primitivos (tudo o que não é um ``Number``, ``Boolean`` ou ``String``). Pode fazê-lo adicionando um decorador ``@serializable(<type>)`` acima do seu campo ou propriedade.

**Exemplo:**
@[code ts twoslash](@code/component-object-reference.ts)

Para serializar de e para formatos personalizados, é possível estender da classe ``TypeSerializer`` e criar uma instância. Use ``super()`` no construtor para registar tipos suportados.

> **Nota**: Além de campos correspondentes, propriedades correspondentes também serão exportadas quando corresponderem a campos no ficheiro typescript.

## Carregamento de Cenas
No Unity, Prefabs, SceneAssets e AssetReferences (Sistema Endereçável do Unity) referenciados serão automaticamente exportados como ficheiros glTF (por favor, consulte a documentação [Exportar Prefabs](export.md)).

Estes ficheiros gltf exportados serão serializados como URIs de string simples. Para simplificar o carregamento destes a partir de componentes TypeScript, adicionámos o conceito de tipos ``AssetReference``. Podem ser carregados em runtime e, portanto, permitem adiar o carregamento de partes da sua aplicação ou carregar conteúdo externo.

**Exemplo:**
@[code ts twoslash](@code/component-prefab.ts)

AssetReferences são armazenados em cache por URI, portanto, se referenciar o mesmo glTF/Prefab exportado em múltiplos componentes/scripts, será carregado apenas uma vez e depois reutilizado.

# Próximos Passos

---
Página traduzida automaticamente usando IA