---
title: "@serializable e outros decorators"
---

A tabela a seguir contém os decorators de Typescript disponíveis que o Needle Engine oferece.  
 
Pode pensar neles como Atributos em esteróides (se estiver familiarizado com C#) - podem ser adicionados a classes, campos ou métodos em Typescript para fornecer funcionalidade adicional. 

|  |  | 
| --- | ---
| **Decoradores de Campos e Propriedades** | |
| `@serializable()` | Adicionar a campos expostos / serializados. É usado ao carregar ficheiros glTF que foram exportados com componentes do Unity ou Blender. |
| `@syncField()` | Adicionar a um campo para sincronizar o valor na rede quando muda. Pode passar um método a ser chamado quando o campo muda. |
| `@validate()` | Adicionar para receber callbacks no método de evento do componente `onValidate` sempre que o valor muda. Isto comporta-se de forma semelhante ao onValidate do Unity. |
| **Decoradores de Métodos** | |
| `@prefix(<type>)` (experimental) | Pode ser usado para injetar código personalizado noutros componentes. Opcionalmente, retornar `false` para impedir que o método original seja executado. Veja o [exemplo abaixo](#prefix). |
| **Decoradores de Classes** | |
| `@registerType` | Sem argumento. Pode ser adicionado a uma classe de componente personalizada para ser registada nos tipos do Needle Engine e para ativar o suporte a hot reloading. |


## Exemplos


### Serializable

```ts twoslash
import { Behaviour, serializable, EventList } from "@needle-tools/engine";
import { Object3D } from "three";

export class SomeComponentType extends Behaviour {}

export class ButtonObject extends Behaviour {
    // you can omit the type if it's a primitive 
    // e.g. Number, String or Bool
    @serializable()
    myNumber: number = 42;

    // otherwise add the concrete type that you want to serialize to
    @serializable(EventList)
    onClick?: EventList;

    @serializable(SomeComponentType)
    myComponent?: SomeComponentType;

    // Note that for arrays you still add the concrete type (not the array)
    @serializable(Object3D)
    myObjects?: Object3D[];
}
```


### SyncField

O decorator `@syncField` pode ser usado para sincronizar automaticamente propriedades dos seus componentes na rede para todos os utilizadores (visitantes do seu site) conectados à mesma sala de networking. Opcionalmente, pode receber uma função de callback que será invocada sempre que o valor mudar.     

- Para notificar o sistema que um valor de referência (como um objeto ou array) mudou, precisa de reatribuir o campo. Por exemplo, assim: `myField = myField`   
- A função de callback *não* pode ser uma arrow function (por exemplo, `MyScript.prototype.onNumberChanged` funciona para `onNumberChanged() { ... }`, mas não funciona para `myNumberChanged = () => { ... }`)

```ts twoslash
import { Behaviour, serializable, syncField } from "@needle-tools/engine";

export class MyScript extends Behaviour {

    @syncField(MyScript.prototype.onNumberChanged)
    @serializable()
    myNumber: number = 42;

    private onNumberChanged(newValue: number, oldValue: number){
        console.log("Número mudou de ", oldValue, "para", newValue)
    }
}
```


### Validate
```ts twoslash
import { Behaviour, serializable, validate } from "@needle-tools/engine";

export class MyScript extends Behaviour {

    @validate()
    @serializable()
    myNumber?: number;

    start() { setInterval(() => this.myNumber = Math.random(), 1000) }

    onValidate(fieldName: string) {
        console.log("Validate", fieldName, this.myNumber);
    }
}
```


### Prefix
[Exemplo ao vivo](https://stackblitz.com/edit/needle-engine-prefix-example?file=src%2Fmain.ts)
```ts twoslash
import { Camera, prefix } from "@needle-tools/engine";
class YourClass {
    @prefix(Camera) // < este é o tipo que tem o método que quer mudar
    awake() { // < este é o nome do método que quer mudar

        // isto é agora chamado antes do método Camera.awake executar
        // NOTA: `this` refere-se agora à instância da Camera e NÃO mais a `YourClass`. Isto permite-lhe aceder também ao estado interno do componente
        console.log("Olá câmera:", this)
        // opcionalmente, retorne false se quiser impedir o comportamento padrão
    }
}
```


Página traduzida automaticamente usando IA