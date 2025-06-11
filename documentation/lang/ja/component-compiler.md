---
title: 自動コンポーネント生成
tags:
  - codegen
  - components
  - unity
  - blender
  - editor
  - typescript
  - csharp
---

### エディターコンポーネントの自動生成

UnityやBlenderで作業していると、TypescriptやJavascriptで新しいNeedle Engineコンポーネントを作成した際に、自動的にUnityのC#スタブコンポーネントまたはBlenderパネルが生成されることに気づくでしょう。

これは、エディター環境でバックグラウンドで実行され、スクリプトファイルの変更を監視する[Needle component compiler](https://www.npmjs.com/package/@needle-tools/needle-component-compiler)の魔法のおかげです。新しいNeedle Engineコンポーネントを作成したことが検出されると、公開変数やプロパティを含む正しいUnityコンポーネントまたはBlenderパネルが生成され、エディター内でそれらを設定またはリンクできるようになります。

**Note**: コンポーネントコンパイラは現在、**コンポーネントのみを生成します**。そのため、UnityでTypescript Enumを公開する必要がある場合は、新しいC#ファイルまたは生成されたコードの外で手動でC#に追加できます（以下の例を参照）。

### コンポーネント生成の制御
Typescriptコードで以下のコメントを使用して、C#コード生成の動作を制御できます。
| 属性 | 結果 |
| -- | -- |
| `// @generate-component` | 次のクラスの生成を強制 |
| `// @dont-generate-component` | 次のクラスの生成を無効化。プロジェクトに既存のC#スクリプトがある場合に便利です。 |
| `// @serializeField` | 生成されたフィールドを`[SerializeField]`で装飾 |
| `// @type UnityEngine.Camera` | 生成されたC#フィールドの型を指定 |
| `// @nonSerialized` | 次のフィールドまたはメソッドの生成をスキップ |

#### 例

コンポーネントコンパイラに`myAudioClip`という名前のC# AudioClipフィールドを強制的に生成させます。
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
	//@type UnityEngine.AudioClip
	@serializable()
	myAudioClip?: string;
}

```

コンポーネントコンパイラに特定のサブクラスから継承させることを強制します。
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyCustomBaseClass extends Behaviour { /* ... */ }
// ---cut-before---
//@type MyNamespace.MyCustomBaseClass
export class MyComponent extends MyCustomBaseClass {
}
```

### Unityでのコンポーネントコンパイラ
プロジェクトの``src/scripts``フォルダ内にスクリプトを追加したい場合、``ExportInfo``コンポーネントを持つGameObjectに``Component Generator``が必要です。
``your/threejs/project/src/scripts``に新しいコンポーネントを追加すると、`Assets/Needle/Components.codegen`にUnityスクリプトが自動的に生成されます。
任意のNpmDefファイルにスクリプトを追加したい場合は、作成するだけで構いません。各NpmDefはスクリプトの変更を自動的に監視し、コンポーネント生成を処理するため、シーンに追加のコンポーネントは必要ありません。

C#フィールドを正しく生成するためには、現在、Typescriptの型を明示的に宣言することが重要です。例えば、``myField : number = 5``のようにします。

以下のタブを使用して、**Typescript**の入力と生成された**C#**スタブコンポーネントを切り替えることができます。
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

// NEEDLE_CODEGEN_ ブロックの上または下にコードを追加できます

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
    // これは生成されたコンポーネントを拡張する方法です（名前空間とクラス名は一致させる必要があります！）
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

    // もちろんカスタムエディターを追加することもできます
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

### 生成されたコンポーネントの拡張
コンポーネントのC#クラスは[`partial`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods)フラグ付きで生成されるため、機能を簡単に拡張できます。これは、gizmoを描画したり、コンテキストメニューを追加したり、組み込みコンポーネントの一部ではない追加のフィールドやメソッドを追加したりする場合に役立ちます。

:::tip メンバーのケーシング
エクスポートされたメンバーは小文字で始まります。たとえば、C#メンバーの名前が``MyString``の場合、それは``myString``に割り当てられます。
:::

本ページはAIにより自動的に翻訳されています