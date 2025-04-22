---
title: Scripting no Needle Engine
description: Diferenças, semelhanças e conceitos chave de Typescript, Javascript e C#.
sidebarDepth: 2
---

O seguinte guia tenta destacar algumas das principais diferenças entre C#, Javascript e Typescript. Isto é mais útil para programadores novos no ecossistema web.

Aqui ficam também alguns recursos úteis para aprender a escrever Typescript:

- [Tutorial de Typescript](https://www.typescripttutorial.net/)
- [Aprender Typescript](https://www.tutorialsteacher.com/typescript)
- [Documentação de Typescript](https://www.typescriptlang.org/docs/)

### Principais diferenças entre C#, Javascript ou Typescript

**CSharp** ou **C#** é uma linguagem de tipo estático e compilada. Significa que **antes** do seu código poder correr (ou ser executado), tem de ser compilado - traduzido - para IL ou CIL, uma linguagem intermédia que está um pouco mais perto do *código de máquina*. A parte importante a entender aqui é que o seu código é analisado e tem de passar certas verificações e regras que são **aplicadas** pelo compilador. Obterá erros de compilação **no Unity** e a sua aplicação nem sequer começará a correr se escrever código que viole alguma das regras da linguagem C#. Não conseguirá entrar no Play-Mode com erros de compilação.

O **Javascript**, por outro lado, é interpretado em tempo de execução. Isso significa que pode escrever código que não é válido e causar erros - mas não verá esses erros *até que o seu programa corra* ou tente **executar** exatamente a linha que contém o erro. Por exemplo, pode escrever `var points = 100; points += "hello world";` e ninguém reclamará *até* que execute o código num navegador.

**Typescript** é uma linguagem concebida pela Microsoft que **compila para javascript**
Adiciona muitas funcionalidades, como por exemplo, **segurança de tipo**. Isso significa que, ao escrever código em Typescript, *pode* declarar tipos e, portanto, obter erros em *tempo de compilação* quando tentar, por exemplo, fazer atribuições inválidas ou chamar métodos com tipos inesperados. Leia mais sobre tipos em Javascript e Typescript abaixo.

### Tipos — ou a falta deles

O **Vanilla Javascript** (até hoje) **não** tem qualquer conceito de *tipos*: não há garantia de que uma variável que declarou como `let points = 100` continue a ser um *número* mais tarde na sua aplicação. Isso significa que, em Javascript, é código perfeitamente válido atribuir `points = new Vector3(100, 0, 0);` mais tarde no seu código. Ou mesmo `points = null` ou `points = myRandomObject` - percebeu a ideia. Tudo isto está OK enquanto escreve o código **mas** pode falhar terrivelmente quando o seu código é executado, porque mais tarde escreve `points -= 1` e **agora** obtém erros no navegador quando a sua aplicação já está a correr.

Como mencionado acima, o **Typescript** foi criado para ajudar a corrigir esse problema, adicionando sintaxe para definir tipos.

É importante entender que *basicamente* ainda escreve Javascript quando escreve Typescript e, embora *seja* possível contornar todas as verificações de tipo e segurança, por exemplo, adicionando `//@ts-ignore` acima de uma linha errada ou definindo todos os tipos como `any`, isto **não é de todo recomendado**. Os tipos estão aqui para o ajudar a encontrar erros antes que realmente aconteçam. Não quer realmente implementar o seu site no seu servidor apenas para mais tarde receber relatórios de utilizadores ou visitantes a dizer que a sua aplicação falhou enquanto estava a correr.

Embora o *Vanilla Javascript* não ofereça tipos, ainda pode adicionar anotações de tipo às suas variáveis, classes e métodos javascript usando **[JSDoc](https://jsdoc.app/)**.

### Variáveis

Em C#, escreve variáveis usando o tipo ou a palavra-chave `var`.
Por exemplo, pode escrever `int points = 100;`
ou, alternativamente, usar `var` e deixar o compilador descobrir o tipo correto para si: `var points = 100`

Em Javascript ou Typescript, tem duas opções modernas para declarar uma variável.
Para uma variável que planeia reatribuir, use `let`, por exemplo `let points = 100;`
Para uma variável que não quer poder reatribuir, use `const`, por exemplo `const points = 100;`
> *Esteja ciente de var*
Pode encontrar a palavra-chave `var` em javascript também, mas não é recomendado usá-la, e a substituição moderna para ela é `let`. Saiba mais sobre [var vs let](https://stackoverflow.com/a/11444416).

Por favor, note que *ainda pode* atribuir valores a variáveis declaradas com const se forem (por exemplo) um tipo personalizado. Considere o seguinte exemplo:

```ts twoslash
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition.x = 100; // Atribuir x é perfeitamente válido
```
O acima é código Typescript perfeitamente válido porque não reatribui `myPosition`, mas apenas o membro `x` de `myPosition`. Por outro lado, o seguinte exemplo **não** seria permitido e causaria um erro de execução ou typescript:
```ts twoslash
// @errors: 2588
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition = new Vector3(100, 0, 0); // ⚠ ATRIBUIR A CONST NÃO É PERMITIDO
```

### Usando ou Importando Tipos

No Unity, geralmente adiciona instruções `using` no topo do seu código para importar namespaces específicos de Assemblies que são referenciados no seu projeto ou - em certos casos - pode encontrar-se a importar um tipo específico com um nome de um namespace.
Veja o seguinte exemplo:
```csharp
using UnityEngine;
// importando apenas um tipo específico e dando-lhe um nome
using MonoBehaviour = UnityEngine.MonoBehaviour;
```

É assim que faz o mesmo em Typescript para importar tipos específicos de um pacote:
```ts twoslash
import { Vector3 } from 'three';
import { Behaviour } from '@needle-tools/engine';
```

*Também pode* importar todos os tipos de um pacote específico, dando-lhe um nome, o que poderá ver aqui e ali:
```ts twoslash
import * as THREE from 'three';
const myVector : THREE.Vector3 = new THREE.Vector3(1, 2, 3);
```

### Tipos Primitivos
*Vector2, Vector3, Vector4...*
Se tiver formação em C#, poderá estar familiarizado com a diferença entre uma classe e uma struct. Enquanto uma classe é um tipo de referência, uma struct é um tipo de valor personalizado. Significando que é, dependendo do contexto, alocada na stack e, ao ser passada para um método por padrão, é criada uma cópia.
Considere o seguinte exemplo em C#:

```csharp
void MyCallerMethod(){
    var position = new Vector3(0,0,0);
    MyExampleVectorMethod(position);
    UnityEngine.Debug.Log("Position.x is " + position.x); // Aqui x será 0
}
void MyExampleVectorMethod(Vector3 position){
    position.x = 42;
}
```

É chamado um método com um Vector3 chamado position. Dentro do método, o vetor `position` passado é modificado: x é definido para 42. Mas em C#, o vetor original que está a ser passado para este método (ver linha 2) **não** é alterado e x **ainda** será 0 (linha 4).

O mesmo não é verdade para Javascript/Typescript. Aqui não temos tipos de valor personalizados, o que significa que se encontrar um Vector no Needle Engine ou three.js, terá sempre um tipo de referência.
Considere o seguinte exemplo em typescript:
```ts twoslash
import { Vector3 } from 'three'

function myCallerMethod() : void {
    const position = new Vector3(0,0,0);
    myExampleVectorMethod(position);
    console.log("Position.x is " + position.x); // Aqui x será 42
}
function myExampleVectorMethod(position: Vector3) : void {
    position.x = 42;
}
```
Consegue ver a diferença? Como os vetores e todos os objetos personalizados *são* de facto tipos de referência, teremos modificado a variável `position` original (linha 3) e x é agora 42.

Isto não é importante apenas para entender em métodos, mas também ao trabalhar com variáveis.
Em C#, o seguinte código produzirá duas instâncias de Vector3 e alterar uma não afetará a outra:
```csharp
var myVector = new Vector3(1,1,1);
var myOtherVector = myVector;
myOtherVector.x = 42;
// registará: 1, 42
UnityEngine.Debug.Log(myVector.x + ", " + myOtherVector.x);
```
Se fizer o mesmo em Typescript, **não** criará uma cópia, mas obterá uma referência à mesma instância de `myVector`.
```ts twoslash
import { Vector3 } from 'three'

const myVector = new Vector3(1,1,1);
const myOtherVector = myVector;
myOtherVector.x = 42;
// registará: 42, 42
console.log(myVector.x, myOtherVector.x);
```

### Matemática de Vetores e Operadores

Embora em C# possa usar sobrecarga de operadores, infelizmente, isto não está disponível em Javascript. Isto significa que, embora possa multiplicar um Vector3 em C# assim:

```csharp
var myFirstVector = new Vector3(1,1,1);
var myFactor = 100f;
myFirstVector *= myFactor;
// → myFirstVector é agora 100, 100, 100
```

tem de usar um método no tipo Vector3 para alcançar o mesmo resultado (apenas com um pouco mais de código boilerplate)

```ts twoslash
import { Vector3 } from "three"

const myFirstVector : Vector3 = new Vector3(1, 1, 1)
const myFactor = 100;
myFirstVector.multiplyScalar(myFactor);
// → myFirstVector é agora 100, 100, 100
```

### Verificações de Igualdade

#### comparação solta vs rigorosa
Em C#, quando quer verificar se duas variáveis são iguais, pode escrevê-lo da seguinte forma:
```csharp
var playerIsNull = myPlayer == null;
```
em Javascript/Typescript existe uma diferença entre `==` e `===`, onde `===` verifica o tipo de forma mais rigorosa:
```ts twoslash
const myPlayer: any = null;
// ---cut-before---
const playerIsNull = myPlayer === null;
const playerIsNullOrUndefined = myPlayer == null;
```
Repara que a segunda variável `playerIsNullOrUndefined` usa `==`, que faz uma verificação de igualdade solta, caso em que `null` e `undefined` resultarão ambos em `true` aqui. Pode ler mais sobre isso [aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

### Eventos, Binding e `this`

Quando subscreve um Evento em C#, faz assim:
```csharp
// é assim que um evento é declarado
event Action MyEvent;
// subscreve adicionando a (ou removendo de)
void OnEnable() {
    MyEvent += OnMyEvent;
}
void OnDisable() {
    MyEvent -= OnMyEvent;
}
void OnMyEvent() {}
```
Em Typescript e Javascript, quando adiciona um método a uma lista, tem de fazer "bind this". Isso essencialmente significa que cria um método onde define explicitamente `this` para (geralmente) a sua instância da classe atual. Existem duas maneiras de conseguir isto.

Por favor, note que estamos a usar o tipo `EventList` aqui, que é um tipo do Needle Engine para declarar eventos (a EventList também será automaticamente convertida para UnityEvent e/ou uma lista de eventos no Blender quando os usar com as nossas integrações de Editor)

A sintaxe curta e **recomendada** para fazer isto é usar [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent!: EventList;

    onEnable() {
        this.myEvent.addEventListener(this.onMyEvent);
    }

    onDisable() {
        this.myEvent.removeEventListener(this.onMyEvent);
    }

    // Declarando a função como uma arrow function para ligar automaticamente `this`
    private onMyEvent = () => {
        console.log(this !== undefined, this)
    }
}
```
Há também a forma "clássica" mais verbosa de conseguir o mesmo, ligando manualmente isto (e guardando o método numa variável para depois o remover novamente da lista de eventos):
```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent?: EventList;

    private _onMyEventFn?: Function;

    onEnable() {
        // ligar this
        this._onMyEventFn = this.onMyEvent.bind(this);
        // adicionar o método ligado ao evento
        this.myEvent?.addEventListener(this._onMyEventFn);
    }

    onDisable() {
        this.myEvent?.removeEventListener(this._onMyEventFn);
    }

    // Declarando a função como uma arrow function para ligar automaticamente `this`
    private onMyEvent = () => { }
}
```

## Qual é o próximo passo?

- [Scripting no Needle Engine](/scripting.md)


Página traduzida automaticamente usando IA