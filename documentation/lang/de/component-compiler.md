---
title: Automatische Komponenten-Generierung
tags:
  - codegen
  - components
  - unity
  - blender
  - editor
  - typescript
  - csharp
---

### Automatische Generierung von Editor-Komponenten

Beim Arbeiten in Unity oder Blender wirst du feststellen, dass, wenn du eine neue Needle Engine Komponente in Typescript oder Javascript erstellst, automatisch eine Unity C# Stub Komponente ODER ein Blender Panel für dich generiert wird.

Dies ist der Magie des [Needle component compiler](https://www.npmjs.com/package/@needle-tools/needle-component-compiler) zu verdanken, der im Hintergrund in einer Editor-Umgebung läuft und Änderungen an deinen Skriptdateien überwacht. Wenn er bemerkt, dass du eine neue Needle Engine Komponente erstellt hast, generiert er die korrekte Unity Komponente oder das Blender Panel inklusive öffentlicher Variablen oder Properties, die du dann im Editor setzen oder verknüpfen kannst.


**Hinweis**: Der component compiler generiert derzeit **nur Komponenten**. Wenn du also ein Typescript Enum in Unity sichtbar machen musst, kannst du es manuell zu deinem C# hinzufügen, entweder in einer neuen C#-Datei oder außerhalb des generierten Codes (siehe Beispiele unten).


### Steuerung der Komponenten-Generierung
Du kannst die folgenden Kommentare in deinem Typescript Code verwenden, um das Verhalten der C#-Code-Generierung zu steuern:
| Attribut | Ergebnis |
| -- | -- |
| `// @generate-component` | Erzwingt die Generierung der nächsten Klasse |
| `// @dont-generate-component` | Deaktiviert die Generierung der nächsten Klasse; dies ist nützlich in Fällen, in denen du bereits ein bestehendes C#-Skript in deinem Projekt hast |
| `// @serializeField` | Dekoriert das generierte Feld mit `[SerializeField]` |
| `// @type UnityEngine.Camera` | Spezifiziert den Typ des generierten C#-Feldes |
| `// @nonSerialized` | Überspringt die Generierung des nächsten Feldes oder der nächsten Methode |

#### Beispiele

Erzwingt, dass der component compiler ein C# AudioClip-Feld namens `myAudioClip` generiert
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
	//@type UnityEngine.AudioClip
	@serializable()
	myAudioClip?: string;
}

```

Erzwingt, dass der component compiler von einer spezifischen Unterklasse ableitet
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyCustomBaseClass extends Behaviour { /* ... */ }
// ---cut-before---
//@type MyNamespace.MyCustomBaseClass
export class MyComponent extends MyCustomBaseClass {
}
```


### Component Compiler in Unity
Wenn du Skripte im Ordner ``src/scripts`` in deinem Projekt hinzufügen möchtest, benötigst du einen ``Component Generator`` auf dem GameObject mit deiner ``ExportInfo`` Komponente.
Wenn du nun neue Komponenten in ``your/threejs/project/src/scripts`` hinzufügst, werden automatisch Unity Skripte in `Assets/Needle/Components.codegen` generiert.
Wenn du Skripte zu einer NpmDef Datei hinzufügen möchtest, kannst du sie einfach erstellen - jede NpmDef überwacht automatisch Skriptänderungen und handhabt die Komponenten-Generierung, sodass du keine zusätzliche Komponente in deiner Szene benötigst.

Damit C#-Felder korrekt generiert werden, ist es derzeit wichtig, dass du explizit einen Typescript-Typ deklarierst. Zum Beispiel ``myField : number = 5``

Du kannst über die Tabs unten zwischen **Typescript** Eingabe und generierten **C#** Stub-Komponenten wechseln
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
// auto generated code - do not edit directly
// automatisch generierter Code - nicht direkt bearbeiten

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

// you can add code above or below the NEEDLE_CODEGEN_ blocks
// Du kannst Code oberhalb oder unterhalb der NEEDLE_CODEGEN_ Blöcke hinzufügen

// NEEDLE_CODEGEN_START
// auto generated code - do not edit directly
// automatisch generierter Code - nicht direkt bearbeiten

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
    // So erweiterst du die generierte Komponente (Namespace und Klassenname müssen übereinstimmen!)
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
    // natürlich kannst du auch benutzerdefinierte Editoren hinzufügen
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


### Erweitern generierter Komponenten
C#-Klassen von Komponenten werden mit dem [`partial`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods) Flag generiert, um sie einfach um Funktionalität zu erweitern. Dies ist hilfreich, um Gizmos zu zeichnen, Kontextmenüs hinzuzufügen oder zusätzliche Felder oder Methoden hinzuzufügen, die nicht Teil einer integrierten Komponente sind.

:::tip Member Casing
Exportierte Member beginnen mit einem Kleinbuchstaben. Wenn dein C#-Member zum Beispiel ``MyString`` benannt ist, wird es ``myString`` zugewiesen.
:::


Seite automatisch mit KI übersetzt