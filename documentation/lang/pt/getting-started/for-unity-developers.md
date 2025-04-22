---
title: Introdução à Scripting para Developers Unity
---

O Needle Engine oferece uma integração estreita com o Unity Editor. Isto permite que developers e designers trabalhem juntos num ambiente familiar e entreguem experiências web rápidas, performáticas e leves.

Este guia destina-se principalmente a developers com background em Unity3D, mas também pode ser útil para developers com background em web ou three.js. Abrange tópicos sobre como as coisas são feitas no Unity vs no three.js ou Needle Engine.

Se for completamente novo em Typescript e Javascript e quiser aprofundar-se na escrita de scripts para o Needle Engine, recomendamos também a leitura do [Guia Essencial de Typescript](./typescript-essentials) para uma compreensão básica das diferenças entre C# e Javascript/Typescript.

Se quiser acompanhar a codificação, pode [abrir engine.needle.tools/new](https://engine.needle.tools/new) para criar um pequeno projeto que pode editar no browser ⚡

## O Básico
Needle Engine é um motor web 3D que corre sobre [three.js](https://threejs.org/). Three.js é uma das bibliotecas de renderização 3D baseadas em webgl mais populares para a web. Sempre que nos referimos a um `gameObject` no Needle Engine, estamos *na verdade* também a falar de um `Object3D` do three.js, o tipo base de qualquer objeto no three.js. Ambos os termos podem ser usados indistintamente. Qualquer `gameObject` *é* um `Object3D`.

Isto também significa que - se já estiver familiarizado com three.js - não terá nenhum problema em usar o Needle Engine. Tudo o que pode fazer com three.js pode ser feito também no Needle Engine. Se já estiver a usar certas bibliotecas, também poderá usá-las num ambiente baseado em Needle Engine.

Nota: **O Exporter do Needle Engine _NÃO_ compila o seu código C# existente para Web Assembly**.
Embora o uso de Web Assembly *possa* resultar em melhor performance em tempo de execução, tem um alto custo para a velocidade de iteração e flexibilidade na construção de experiências web. Leia mais sobre a nossa [visão](./../vision.md) e [visão geral técnica](./../technical-overview.md).

:::details Como criar um novo projeto Unity com Needle Engine? (Vídeo)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />
:::

## Criar um Componente
No Unity, cria um novo componente derivando de `MonoBehaviour`:
```csharp
using UnityEngine;
public class MyComponent : MonoBehaviour {
}
```

Um componente custom no Needle Engine, por outro lado, é escrito da seguinte forma:
```ts twoslash
import { Behaviour } from "@needle-tools/engine"
export class MyComponent extends Behaviour {
}
```
## Campos de Script

### serializable
Se viu alguns scripts do Needle Engine, deve ter notado que algumas variáveis são anotadas com `@serializable` acima da sua declaração. Este é um Decorator em Typescript e pode ser usado para modificar ou anotar código. No Needle Engine, é usado, por exemplo, para permitir que a serialização principal saiba quais os tipos que esperamos no nosso script quando converte da informação raw do componente armazenada no glTF para uma instância de Componente.
Considere o seguinte exemplo:
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

class SomeClass extends Behaviour{
    @serializable(Behaviour)
    myOtherComponent?: Behaviour;
    @serializable(Object3D)
    someOtherObject?: Object3D;
}
```
Isto indica ao Needle Engine que `myOtherComponent` deve ser do tipo `Behaviour`. Ele irá então atribuir automaticamente a referência correta ao campo quando a sua cena for carregada. O mesmo se aplica a `someOtherObject` onde queremos desserializar para uma referência de `Object3D`.

Note que em alguns casos o tipo pode ser omitido. Isso pode ser feito para todos os [primitive types em Javascript](https://developer.mozilla.org/en-US/docs/Glossary/Primitive). São eles: `boolean`, `number`, `bigint`, `string`, `null` e `undefined`.
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    @serializable() // < não é necessário tipo aqui porque o tipo do campo é primitivo
    myString?: string;
}
```

### public vs private
Campos sem qualquer modificador de acesso como `private`, `public` ou `protected` serão por padrão `public` em javascript
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    /// nenhum modificador de acesso significa que é público:
    myNumber?: number;
    // tornando-o explicitamente privado:
    private myPrivateNumber?: number;
    protected myProtectedNumber?: number;
}
```
O mesmo se aplica a métodos também.

## GameObjects e a Cena
Para aceder à cena atual a partir de um componente, use `this.scene` que é equivalente a `this.context.scene`, isto dá-lhe o objeto raiz da cena three.js.

Para percorrer a hierarquia a partir de um componente, pode iterar sobre os filhos de um objeto
com um ciclo for:
```ts twoslash
for (let i = 0; i < this.gameObject.children; i++) {
    console.log(this.gameObject.children[i]);
}
```
ou pode iterar usando o equivalente a `foreach`:
```ts twoslash
for (const child of this.gameObject.children) {
    console.log(child);
}
```
Também pode usar métodos específicos do three.js para iterar rapidamente todos os objetos recursivamente usando o método [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse):
```ts twoslash
import { GameObject } from "@needle-tools/engine";
//---cut-before---
this.gameObject.traverse((obj: GameObject) => console.log(obj))
```
ou para percorrer apenas objetos visíveis, use [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) em vez disso.

Outra opção que é bastante útil quando quer apenas iterar objetos renderizáveis é consultar todos os componentes de renderização e iterar sobre eles assim:
```ts twoslash
import { Renderer } from "@needle-tools/engine";

for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
Para mais informações sobre como obter componentes, consulte a próxima secção.

## Componentes
Needle Engine faz uso intenso de um Sistema de Componentes que é semelhante ao do Unity. Isto significa que pode adicionar ou remover componentes a qualquer `Object3D` / `GameObject` na cena. Um componente será registado no engine ao usar `addNewComponent(<Object3D>, <ComponentType>)`.
Os métodos de evento que o componente anexado terá serão então automaticamente chamados pelo engine (por exemplo, `update` ou `onBeforeRender`). Uma lista completa de métodos de evento pode ser encontrada na [documentação de scripting](../scripting.md#lifecycle-methods).

#### Encontrar Componentes na Cena
Para obter componentes, pode usar os métodos familiares semelhantes aos do Unity. Note que o seguinte usa o tipo `Animator` como exemplo, mas pode usar qualquer tipo de componente que seja built-in ou criado por si.
| Nome do Método | Descrição |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | Obtém o componente `Animator` num GameObject/Object3D. Retornará a instância de `Animator` se tiver um componente Animator ou `null` se o objeto não tiver tal componente. |
| `this.gameObject.getComponentInChildren(Animator)` | Obtém o primeiro componente `Animator` num GameObject/Object3D ou em qualquer um dos seus filhos |
| `this.gameObject.getComponentsInParents(Animator)` | Obtém todos os componentes Animator na hierarquia pai (incluindo o GameObject/Object3D atual)

Estes métodos também estão disponíveis no tipo estático GameObject. Por exemplo, ``GameObject.getComponent(this.gameObject, Animator)`` para obter o componente `Animator` num GameObject/Object3D passado.

Para procurar na cena inteira por um ou múltiplos componentes, pode usar ``GameObject.findObjectOfType(Animator)`` ou `GameObject.findObjectsOfType(Animator)`.

## Tipos Unity Renomeados
Alguns tipos específicos do Unity são mapeados para nomes de tipos diferentes no nosso engine. Veja a seguinte lista:

| Tipo no Unity | Tipo no Needle Engine |  |
| -- | -- | -- |
| `UnityEvent` | `EventList` | Um UnityEvent será exportado como um tipo `EventList` (use `serializable(EventList)` para desserializar UnityEvents) |
| `GameObject` | `Object3D` | |
| `Transform` | `Object3D` | No three.js e Needle Engine, um GameObject e um Transform são o mesmo (não há componente `Transform`). A única exceção a essa regra é ao referenciar um `RectTransform` que é um componente no Needle Engine também. |
| `Color` | `RGBAColor` | O tipo de cor do three.js não tem uma propriedade alpha. Por causa disso, todos os tipos Color exportados do Unity serão exportados como `RGBAColor` que é um tipo custom do Needle Engine |

## Transform
Os dados de Transform podem ser acedidos diretamente no `GameObject` / `Object3D`. Ao contrário do Unity, não há um componente de Transform extra que armazene esses dados.
- ``this.gameObject.position`` é a posição [position](https://threejs.org/docs/?q=obj#api/en/core/Object3D.position) vector3 no espaço local
- ``this.gameObject.worldPosition`` é a posição vector3 no espaço mundo
- ``this.gameObject.rotation`` é a [euler rotation](https://threejs.org/docs/?q=obj#api/en/core/Object3D.rotation) no espaço local
- ``this.gameObject.worldRotation`` é a euler rotation em ângulos de euler no espaço mundo
- ``this.gameObject.quaternion`` - é a [quaternion rotation](https://threejs.org/docs/?q=obj#api/en/core/Object3D.quaternion) no espaço local
- ``this.gameObject.worldQuaternion`` é a quaternion rotation no espaço mundo
- ``this.gameObject.scale`` - é a [scale](https://threejs.org/docs/?q=obj#api/en/core/Object3D.scale) vector3 no espaço local
- ``this.gameObject.worldScale`` é a scale vector3 no espaço mundo

A principal diferença a ter em mente aqui é que `position` no three.js é por padrão uma posição no espaço local, enquanto no Unity `position` seria no espaço mundo e usaria `localPosition` para usar deliberadamente a posição no espaço local. A próxima secção explicará como obter a posição no espaço mundo no three.js.

### Posição, Rotação, Scale... no MUNDO

No three.js (e, portanto, também no Needle Engine), `object.position`, `object.rotation`, `object.scale` são todas coordenadas de espaço local. Isso é diferente do Unity, onde estamos acostumados a `position` ser no espaço mundo e usar `localPosition` para usar deliberadamente a posição no espaço local.

Se quiser aceder às coordenadas do mundo no Needle Engine, temos métodos de utilidade que pode usar com os seus objetos. Chame `getWorldPosition(yourObject)` para calcular a posição do mundo. Métodos semelhantes existem para rotação/quaternion e scale. Para ter acesso a esses métodos, importe-os simplesmente do Needle Engine assim: `import { getWorldPosition } from "@needle.tools/engine"`

Note que estes métodos de utilidade como `getWorldPosition`, `getWorldRotation`, `getWorldScale` internamente têm um buffer de instâncias de Vector3 e destinam-se a ser usados apenas localmente. Isso significa que não deve guardá-los em cache no seu componente, caso contrário, o seu valor em cache será eventualmente substituído. Mas é seguro chamar `getWorldPosition` várias vezes na sua função para fazer cálculos sem ter que se preocupar em reutilizar a mesma instância. Se não tiver a certeza do que isto significa, deve dar uma vista de olhos na secção **Primitive Types** no [Guia Essencial de Typescript](./typescript-essentials.md#primitive-types).

## Tempo
Use `this.context.time` para aceder aos dados de tempo:
- `this.context.time.time` é o tempo desde que a aplicação começou a correr
- `this.context.time.deltaTime` é o tempo que passou desde o último frame
- `this.context.time.frameCount` é o número de frames que passaram desde que a aplicação começou
- `this.context.time.realtimeSinceStartup` é o tempo não escalonado desde que a aplicação começou a correr

Também é possível usar `this.context.time.timeScale` para deliberadamente abrandar o tempo, por exemplo, para efeitos de slow motion.

## Raycasting
Use ``this.context.physics.raycast()`` para realizar um raycast e obter uma lista de interseções. Se não passar nenhuma opção, o raycast é realizado a partir da posição do rato (ou primeira posição de toque) no espaço de ecrã usando a `mainCamera` atualmente ativa. Também pode passar um objeto `RaycastOptions` que tem várias configurações como `maxDistance`, a câmara a ser usada ou as layers a testar.

Use ``this.context.physics.raycastFromRay(your_ray)`` para realizar um raycast usando um [three.js ray](https://threejs.org/docs/#api/en/math/Ray).

Note que as chamadas acima estão por padrão a fazer raycasting contra objetos visíveis na cena. Isso é diferente do Unity, onde precisa sempre de colliders para acertar em objetos. A solução padrão do three.js tem prós e contras, onde um dos principais contras é que pode ter um desempenho bastante lento dependendo da geometria da sua cena. Pode ser especialmente lento ao fazer raycasting contra skinned meshes. É, portanto, recomendado geralmente definir objetos com SkinnedMeshRenderers no Unity para a layer `Ignore Raycast`, que então serão ignorados por padrão pelo Needle Engine também.

Outra opção é usar os métodos de raycast da física, que só retornarão hits com colliders na cena.

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Aqui está um [exemplo editável para raycast de física](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore).

## Input
Use ``this.context.input`` para obter o estado de input:

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update(){
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN")
        }
    }
}
```

Também pode subscrever eventos na enum ``InputEvents`` assim:
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable(){
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }
    onDisable() {
        // é recomendado também anular a subscrição de eventos quando o seu componente se torna inativo
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    inputPointerDown = (evt: NEPointerEvent) => { console.log(evt); }
}
```

Se quiser lidar com os inputs você mesmo, pode também subscrever [todos os eventos que o browser fornece](https://developer.mozilla.org/en-US/docs/Web/Events) (há imensos). Por exemplo, para subscrever o evento de clique do browser, pode escrever:
```ts twoslash
window.addEventListener("click", () => { console.log("MOUSE CLICK"); });
```
Note que neste caso, tem que lidar com todos os casos sozinho. Por exemplo, pode precisar de usar eventos diferentes se o seu utilizador estiver a visitar o seu website no desktop vs mobile vs um dispositivo VR. Estes casos são automaticamente tratados pelos eventos de input do Needle Engine (por exemplo, `PointerDown` é acionado tanto para mouse down, touch down e, no caso de VR, para controller button down).

## Callbacks do InputSystem
Semelhante ao Unity (veja [IPointerClickHandler no Unity](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html)), também pode registar-se para receber eventos de input no próprio componente.

Para que isto funcione, certifique-se de que o seu objeto tem um componente ``ObjectRaycaster`` ou ``GraphicRaycaster`` na hierarquia pai.

```ts twoslash
import { Behaviour, IPointerEventHandler, PointerEventData } from "@needle-tools/engine";

export class ReceiveClickEvent extends Behaviour implements IPointerEventHandler {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```

Nota: `IPointerEventHandler` subscreve o objeto a todos os eventos de ponteiro possíveis. Os manipuladores para eles são:
- `onPointerDown`
- `onPointerUp`
- `onPointerEnter`
- `onPointerMove`
- `onPointerExit`
- `onPointerClick`

Todos têm um argumento `PointerEventData` que descreve o evento.

## Debug.Log
O equivalente a `Debug.Log()` em javascript é `console.log()`. Pode também usar `console.warn()` ou `console.error()`.
```ts twoslash
import { GameObject, Renderer } from "@needle-tools/engine";
const someVariable = 42;
// ---cut-before---

console.log("Hello web");
// Pode passar quantos argumentos quiser assim:
console.log("Hello", someVariable, GameObject.findObjectOfType(Renderer), this.context);
```

## Gizmos
No Unity, normalmente tem que usar métodos especiais para desenhar Gizmos como `OnDrawGizmos` ou `OnDrawGizmosSelected`. No Needle Engine, por outro lado, tais métodos não existem e é livre para desenhar gizmos de qualquer lugar no seu script. Note que também é sua responsabilidade *não* desenhá-los, por exemplo, na sua aplicação web implementada (pode simplesmente filtrá-los por `if(isDevEnvironment))`).

Aqui está um exemplo para desenhar uma esfera de arame vermelha por um segundo, por exemplo, para visualizar um ponto no espaço mundo.
```ts twoslash
import { Vector3 } from "three";
const hit = { point: new Vector3(0, 0, 0) };
// ---cut-before---
import { Gizmos } from "@needle-tools/engine";
Gizmos.DrawWireSphere(hit.point, 0.05, 0xff0000, 1);
```
Aqui estão alguns dos métodos de gizmo disponíveis:
| Nome do Método |  |
| --- | --- |
| `Gizmos.DrawArrow` | |
| `Gizmos.DrawBox` | |
| `Gizmos.DrawBox3` | |
| `Gizmos.DrawDirection` | |
| `Gizmos.DrawLine` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawSphere` | |
| `Gizmos.DrawWireSphere` | |

## Métodos Utilitários Úteis

Importe de `@needle-tools/engine`, por exemplo, `import { getParam } from "@needle-tools/engine"`

| Nome do Método | Descrição |
| --- | --- |
| `getParam()` | Verifica se existe um parâmetro de URL. Retorna true se existir mas não tiver valor (por exemplo, `?help`), false se não for encontrado no URL ou for definido como 0 (por exemplo, `?help=0`), caso contrário, retorna o valor (por exemplo, `?message=test`) |
| `isMobileDevice()` | Retorna true se a app for acedida a partir de um dispositivo móvel |
| `isDevEnvironment()` | Retorna true se a app atual estiver a correr num servidor local |
| `isMozillaXR()` | |
| `isiOS` | |
| `isSafari` | |

```ts twoslash
import { isMobileDevice } from "@needle-tools/engine"
if( isMobileDevice() )
```

```ts twoslash
import { getParam } from "@needle-tools/engine"
// returns true
const myFlag = getParam("some_flag")
console.log(myFlag)
```

## O projeto Web
Em C#, geralmente trabalha com uma solution contendo um ou muitos projetos. No Unity, esta solution é gerida pelo Unity para si, e quando abre um script C#, ele abre o projeto e mostra-lhe o ficheiro.
Normalmente instala Packages usando o package manager built-in do Unity para adicionar funcionalidades fornecidas pelo Unity ou por outros developers (seja da sua equipa ou, por exemplo, via AssetStore do Unity). O Unity faz um excelente trabalho ao tornar a adição e gestão de packages fácil com o seu PackageManager, e talvez nunca tenha tido que editar manualmente um ficheiro como o `manifest.json` (isto é o que o Unity usa para rastrear quais packages estão instalados) ou executar um comando da linha de comandos para instalar um package.

Num ambiente web, usa `npm` - o Node Package Manager - para gerir dependências / packages para si. Ele faz basicamente o mesmo que o PackageManager do Unity - instala (faz download) packages de *algum* servidor (geralmente chamado de *registry* nesse contexto) e os coloca dentro de uma pasta chamada `node_modules`.

Ao trabalhar com um projeto web, a maioria das suas dependências são instaladas de [npmjs.com](https://npmjs.com/). É o registry de packages mais popular para projetos web.

Aqui está um exemplo de como um package.json pode parecer:
```json
{
  "name": "@optional_org/package_name",
  "version": "1.0.0",
  "scripts": {
    "start": "vite --host"
  },
  "dependencies": {
	  "@needle-tools/engine": "^3.5.9-beta",
	  "three": "npm:@needle-tools/three@0.146.8"
	},
  "devDependencies": {
	  "@types/three": "0.146.0",
	  "@vitejs/plugin-basic-ssl": "^1.0.1",
	  "typescript": "^5.0.4",
	  "vite": "^4.3.4",
	  "vite-plugin-compression": "^0.5.1"
	}
}
```

O nosso template padrão usa Vite como o seu bundler e não tem nenhum framework frontend pré-instalado. Needle Engine não tem opinião sobre qual framework usar, por isso é livre para trabalhar com o framework que preferir. Temos exemplos para frameworks populares como Vue.js, Svelte, Next.js, React ou React Three Fiber.

## Instalar packages e dependências
Para instalar uma dependência do npm, pode abrir o seu projeto web numa linha de comandos (ou terminal) e executar `npm i <the/package_name>` (abreviação para `npm install`)
Por exemplo, execute `npm i @needle-tools/engine` para instalar [Needle Engine](https://www.npmjs.com/package/@needle-tools/engine). Isso adicionará então o package ao seu `package.json` no array `dependencies`.
Para instalar um package apenas como devDependency, pode executar `npm i --save-dev <package_name>`. Mais sobre a diferença entre dependencies e devDependencies abaixo.

### Qual a diferença entre 'dependencies' e 'devDependencies'
Deve ter notado que existem duas entradas contendo *dependency* - `dependencies` e `devDependencies`.

`dependencies` são **sempre instaladas** (ou agrupadas) quando o seu projeto web é instalado ou em casos em que desenvolve uma biblioteca e o seu package é instalado como dependência de outro projeto.

`devDependencies` são **apenas** instaladas durante o desenvolvimento do projeto (o que significa que quando executa diretamente `install` na diretoria específica) e caso contrário **não** são incluídas no seu projeto.

### Como instalo outro package ou dependência e como usá-lo?
A secção [Instalar](#installing) ensinou-nos que pode instalar dependências executando `npm i <package_name>` na diretoria do seu projeto, onde `package_name` pode ser qualquer package que encontre em [npm.js](https://npmjs.org).

Vamos supor que quer adicionar uma biblioteca de tweening ao seu projeto. Usaremos [`@tweenjs/tween.js`](https://www.npmjs.com/package/@tweenjs/tween.js) para este exemplo. [Aqui](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts) está o projeto final se quiser saltar à frente e apenas ver o resultado.

Primeiro, execute `npm install @tweenjs/tween.js` no terminal e espere que a instalação termine. Isso adicionará uma nova entrada ao nosso package.json:
```json
"dependencies": {
    "@needle-tools/engine": "^3.5.11-beta",
    "@tweenjs/tween.js": "^20.0.3",
    "three": "npm:@needle-tools/three@0.146.8"
}
```

Depois, abra um dos seus ficheiros de script em que quer usar tweening e importe no topo do ficheiro:
```ts twoslash
import * as TWEEN from '@tweenjs/tween.js';
```
Note que importamos aqui todos os tipos na biblioteca escrevendo `* as TWEEN`. Poderíamos também importar apenas tipos específicos como `import { Tween } from @tweenjs/tween.js`.

Agora podemos usá-lo no nosso script. É sempre recomendado consultar a documentação da biblioteca que quer usar. No caso do tween.js, eles fornecem um [user guide](https://github.com/tweenjs/tween.js/blob/HEAD/docs/user_guide.md) que podemos seguir. Geralmente, a página Readme do package no npm contém informações sobre como instalar e usar o package.

Para rodar um cubo, criamos um novo tipo de componente chamado `TweenRotation`, depois procedemos a criar a nossa instância de tween para a rotação do objeto, quantas vezes deve repetir, qual easing usar, o tween que queremos realizar e depois iniciamos. Temos apenas que chamar `update` a cada frame para atualizar a animação do tween. O script final parece assim:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
import * as TWEEN from '@tweenjs/tween.js';

export class TweenRotation extends Behaviour {

    // save the instance of our tweener
    private _tween?: TWEEN.Tween<any>;

    start() {
        const rotation = this.gameObject.rotation;
        // create the tween instance
        this._tween = new TWEEN.Tween(rotation);
        // set it to repeat forever
        this._tween.repeat(Infinity);
        // set the easing to use
        this._tween.easing(TWEEN.Easing.Quintic.InOut);
        // set the values to tween
        this._tween.to({ y: Math.PI * 0.5 }, 1000);
        // start it
        this._tween.start();
    }

    update() {
        // update the tweening every frame
        // the '?' is a shorthand for checking if _tween has been created
        this._tween?.update();
    }
}
```
Agora só temos que adicioná-lo a qualquer um dos objetos na nossa cena para os rodar para sempre.
Pode ver o script final em ação [aqui](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts).

# Aprender Mais

- [Scripting no Needle Engine](../scripting)
- [Essentials de Typescript](./typescript-essentials.md)
- [Referência de Componentes](../component-reference.md)


Página traduzida automaticamente usando IA