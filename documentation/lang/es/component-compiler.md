---
title: Generación Automática de Componentes
tags:
  - codegen
  - components
  - unity
  - blender
  - editor
  - typescript
  - csharp
---

### Generación automática de componentes de Editor

Cuando trabajas en Unity o Blender, notarás que al crear un nuevo componente de Needle Engine en Typescript o Javascript, se generará automáticamente un componente C# stub de Unity O un panel de Blender para ti.

Esto es gracias a la magia del [compilador de componentes de Needle](https://www.npmjs.com/package/@needle-tools/needle-component-compiler) que se ejecuta en segundo plano en un entorno de editor y observa los cambios en tus archivos de script. Cuando nota que has creado un nuevo componente de Needle Engine, generará el componente de Unity o el panel de Blender correctos, incluyendo variables o propiedades públicas que luego podrás configurar o enlazar desde dentro del Editor.



### Control de la generación de componentes
Puedes usar los siguientes comentarios en tu código typescript para controlar el comportamiento de generación de código C#:
| Atributo | Resultado |
| -- | -- |
| `// @generate-component` | Forzar la generación de la siguiente clase|
| `// @dont-generate-component` | Deshabilitar la generación de la siguiente clase, útil en casos donde ya tienes un script C# existente en tu proyecto |
| `// @serializeField` | Decorar el campo generado con `[SerializeField]` |
| `// @type UnityEngine.Camera` | Especificar el tipo del campo C# generado |
| `// @nonSerialized` | Omitir la generación del siguiente campo o método |

#### Ejemplos

Fuerza al compilador de componentes a generar un campo C# AudioClip llamado `myAudioClip`
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
	//@type UnityEngine.AudioClip
	@serializable()
	myAudioClip?: string;
}

```

Fuerza al compilador de componentes a derivar de una subclase específica
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyCustomBaseClass extends Behaviour { /* ... */ }
// ---cut-before---
//@type MyNamespace.MyCustomBaseClass
export class MyComponent extends MyCustomBaseClass {
}
```


### Compilador de Componentes en Unity
Si quieres añadir scripts dentro de la carpeta ``src/scripts`` en tu proyecto, necesitas tener un ``Component Generator`` en el GameObject con tu componente ``ExportInfo``.
Ahora, al añadir nuevos componentes en ``your/threejs/project/src/scripts``, generará automáticamente scripts de Unity en `Assets/Needle/Components.codegen`.
Si quieres añadir scripts a cualquier archivo NpmDef, simplemente puedes crearlos - cada NpmDef observa automáticamente los cambios de script y maneja la generación de componentes, por lo que no necesitas ningún componente adicional en tu escena.

Para que los campos C# se generen correctamente, actualmente es importante que declares explícitamente un tipo Typescript. Por ejemplo ``myField : number = 5``

Puedes cambiar entre la entrada **Typescript** y los componentes **C#** stub generados usando las pestañas de abajo
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
::: code-group-item C# generado
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
::: code-group-item Extensión del C# generado
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


### Extensión de componentes generados
Las clases C# de componentes se generan con el flag [`partial`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods) para facilitar su extensión con funcionalidad. Esto es útil para dibujar gizmos, añadir menús contextuales o añadir campos o métodos adicionales que no forman parte de un componente built-in.


:::tip Uso de mayúsculas en miembros
Los miembros exportados comenzarán con una letra minúscula. Por ejemplo, si tu miembro C# se llama ``MyString``, se asignará a ``myString``.
:::

Página traducida automáticamente usando IA