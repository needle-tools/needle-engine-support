---
title: Génération automatique de composants
tags:
  - codegen
  - components
  - unity
  - blender
  - editor
  - typescript
  - csharp
---

### Génération automatique de composants Editor

Lorsque vous travaillez dans Unity ou Blender, vous remarquerez que lorsque vous créez un nouveau composant Needle Engine en Typescript ou Javascript, il génère automatiquement un composant C# stub Unity OU un panneau Blender pour vous.

C'est grâce à la magie du [Needle component compiler](https://www.npmjs.com/package/@needle-tools/needle-component-compiler) qui s'exécute en arrière-plan dans un environnement d'éditeur et surveille les changements apportés à vos fichiers script. Lorsqu'il remarque que vous avez créé un nouveau composant Needle Engine, il génère alors le composant Unity ou le panneau Blender approprié, y compris les variables ou propriétés publiques que vous pouvez ensuite définir ou lier depuis l'Editor.

### Contrôler la génération de composants
Vous pouvez utiliser les commentaires suivants dans votre code Typescript pour contrôler le comportement de génération de code C#:
| Attribut | Résultat |
| -- | -- |
| `// @generate-component` | Force la génération de la classe suivante|
| `// @dont-generate-component` | Désactive la génération de la classe suivante, utile si un script C# existe déjà dans votre projet |
| `// @serializeField` | Décore le champ généré avec `[SerializeField]` |
| `// @type UnityEngine.Camera` | Spécifie le type du champ C# généré |
| `// @nonSerialized` | Ignore la génération du champ ou de la méthode suivante |

#### Exemples

Force le component compiler à générer un champ C# AudioClip nommé `myAudioClip`
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
	//@type UnityEngine.AudioClip
	@serializable()
	myAudioClip?: string;
}

```

Force le component compiler à dériver d'une sous-classe spécifique
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyCustomBaseClass extends Behaviour { /* ... */ }
// ---cut-before---
//@type MyNamespace.MyCustomBaseClass
export class MyComponent extends MyCustomBaseClass {
}
```


### Component Compiler dans Unity
Si vous souhaitez ajouter des scripts dans le dossier ``src/scripts`` de votre projet, vous devez avoir un ``Component Generator`` sur le GameObject contenant votre composant ``ExportInfo``.
Maintenant, lorsque vous ajoutez de nouveaux composants dans ``your/threejs/project/src/scripts``, il générera automatiquement des scripts Unity dans `Assets/Needle/Components.codegen`.
Si vous souhaitez ajouter des scripts à n'importe quel fichier NpmDef, vous pouvez simplement les créer - chaque NpmDef surveille automatiquement les changements de script et gère la génération de composants, vous n'avez donc pas besoin de composant supplémentaire dans votre scène.

Pour que les champs C# soient correctement générés, il est actuellement important que vous déclariez explicitement un type Typescript. Par exemple ``myField : number = 5``

Vous pouvez basculer entre l'entrée **Typescript** et les composants **C#** stub générés à l'aide des onglets ci-dessous
:::: code-group
::: code-group-item Typescript
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
:::
::: code-group-item Generated C#
```csharp
// NEEDLE_CODEGEN_START
// auto generated code - do not edit directly

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
:::
::: code-group-item Extending Generated C#
```csharp
using UnityEditor;

// you can add code above or below the NEEDLE_CODEGEN_ blocks

// NEEDLE_CODEGEN_START
// auto generated code - do not edit directly

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

namespace Needle.Typescript.GeneratedComponents
{
    // This is how you extend the generated component (namespace and class name must match!)
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

    // of course you can also add custom editors
	[CustomEditor(typeof(MyCustomComponent))]
	public class MyCustomComponentEditor : Editor
	{
		public override void OnInspectorGUI()
		{
			EditorGUILayout.HelpBox("This is my sample component", MessageType.None);
			base.OnInspectorGUI();
		}
	}
}

```
:::
::::


### Étendre les composants générés
Les classes C# de composants sont générées avec le flag [`partial`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods) afin qu'il soit facile de les étendre avec des fonctionnalités. Ceci est utile pour dessiner des gizmos, ajouter des menus contextuels ou ajouter des champs ou méthodes supplémentaires qui ne font pas partie d'un composant intégré.


:::tip Member Casing
Les membres exportés commenceront par une lettre minuscule. Par exemple, si votre membre C# est nommé ``MyString``, il sera assigné à ``myString``.
:::


Page traduite automatiquement par l'IA