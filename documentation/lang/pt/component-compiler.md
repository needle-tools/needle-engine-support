---
title: Geração Automática de Componentes
tags:
  - codegen
  - components
  - unity
  - blender
  - editor
  - typescript
  - csharp
---

### Gerar componentes do Editor automaticamente

Ao trabalhar no Unity ou Blender, notará que, ao criar um novo componente Needle Engine em Typescript ou Javascript, ele gerará automaticamente um componente C# stub do Unity OU um painel do Blender para si.

Isto é graças à magia do [compilador de componentes Needle](https://www.npmjs.com/package/@needle-tools/needle-component-compiler) que é executado em segundo plano num ambiente de editor e monitoriza as alterações nos seus ficheiros de script. Quando este deteta que criou um novo componente Needle Engine, gerará então o componente Unity ou painel Blender correto, incluindo variáveis públicas ou propriedades que pode definir ou ligar a partir do Editor.


**Nota**: O compilador de componentes atualmente **apenas gera componentes**. Portanto, se precisar de expor um Enum Typescript no Unity, pode adicioná-lo ao seu C# manualmente, quer num novo ficheiro C#, quer fora do código gerado (veja os exemplos abaixo)


### Controlar a geração de componentes
Pode usar os seguintes comentários no seu código Typescript para controlar o comportamento da geração de código C#:
| Attribute | Result |
| -- | -- |
| `// @generate-component` | Força a geração da próxima classe|
| `// @dont-generate-component` | Desativa a geração da próxima classe, isto é útil em casos em que já tem um script C# existente no seu projeto |
| `// @serializeField` | Decora o campo gerado com `[SerializeField]` |
| `// @type UnityEngine.Camera` | Especifica o tipo de campo C# gerado |
| `// @nonSerialized` | Ignora a geração do próximo campo ou método |

#### Exemplos

Forçar o compilador de componentes a gerar um campo C# AudioClip chamado `myAudioClip`
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
	//@type UnityEngine.AudioClip
	@serializable()
	myAudioClip?: string;
}

```

Forçar o compilador de componentes a derivar de uma subclasse específica
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyCustomBaseClass extends Behaviour { /* ... */ }
// ---cut-before---
//@type MyNamespace.MyCustomBaseClass
export class MyComponent extends MyCustomBaseClass {
}
```


### Compilador de Componentes no Unity
Se quiser adicionar scripts dentro da pasta ``src/scripts`` no seu projeto, então precisa de ter um ``Component Generator`` no GameObject com o seu componente ``ExportInfo``.
Agora, ao adicionar novos componentes em ``your/threejs/project/src/scripts``, ele gerará automaticamente scripts Unity em ``Assets/Needle/Components.codegen``.
Se quiser adicionar scripts a qualquer ficheiro NpmDef, pode simplesmente criá-los - cada NpmDef monitoriza automaticamente as alterações nos scripts e trata da geração de componentes, para que não precise de nenhum componente adicional na sua cena.

Para que os campos C# sejam corretamente gerados, é atualmente importante que declare explicitamente um tipo Typescript. Por exemplo ``myField : number = 5``

Pode alternar entre a entrada **Typescript** e os componentes stub **C#** gerados usando os separadores abaixo
::: code-tabs
@tab Typescript
```ts twoslash
import { AssetReference, Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

export class MyCustomComponent extends Behaviour {
    @serializable()
    myFloatValue: number = 42;

    @serializable(Object3D)
    myOtherObject?: Object3D;

    @serializable(AssetReference)
    prefabs: AssetReference[] = [];

    start() {
        this.sayHello();
    }

    private sayHello() {
        console.log("Hello World", this);
    }
}
```
@tab Generated C#
```csharp
// NEEDLE_CODEGEN_START
// código auto gerado - não editar diretamente

#pragma warning disable

namespace Needle.Typescript.GeneratedComponents
{
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{
		public float @myFloatValue = 42f;
		public UnityEngine.Transform @myOtherObject;
		public UnityEngine.Transform[] @prefabs = new UnityEngine.Transform[]{ };
		public void start(){}
		public void update(){}
	}
}

// NEEDLE_CODEGEN_END
```
@tab Extending Generated C#
```csharp
using UnityEditor;

// pode adicionar código acima ou abaixo dos blocos NEEDLE_CODEGEN_

// NEEDLE_CODEGEN_START
// código auto gerado - não editar diretamente

#pragma warning disable

namespace Needle.Typescript.GeneratedComponents
{
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{
		
		public void MyAdditionalMethod()
		{
		}

		private void OnValidate()
		{
			myFloatValue = 42;
		}
	}

    // É assim que estende o componente gerado (namespace e nome da classe devem corresponder!)
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{
		
		public void MyAdditionalMethod()
		{
		}

		private void OnValidate()
		{
			myFloatValue = 42;
		}
	}

    // claro que também pode adicionar editores personalizados
	[CustomEditor(typeof(MyCustomComponent))]
	public class MyCustomComponentEditor : Editor
	{
		public override void OnInspectorGUI()
		{
			EditorGUILayout.HelpBox("Este é o meu componente de exemplo", MessageType.None);
			base.OnInspectorGUI();
		}
	}
}

```
:::


### Estender componentes gerados
As classes C# de componentes são geradas com a flag [`partial`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods) para que seja fácil estendê-las com funcionalidade. Isto é útil para desenhar gizmos, adicionar menus de contexto ou adicionar campos ou métodos adicionais que não fazem parte de um componente incorporado.


:::tip Casing de Membros
Os membros exportados começarão com uma letra minúscula. Por exemplo, se o seu membro C# se chamar ``MyString``, ele será atribuído a ``myString``.
:::

Página traduzida automaticamente usando IA