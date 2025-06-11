---
title: Unity開発者向けスクリプト入門
---

Needle EngineはUnity Editorに密接に統合されています。これにより、開発者とデザイナーの両方が慣れ親しんだ環境で協力し、高速で高性能、かつ軽量なWebエクスペリエンスを提供できます。

以下のガイドは主にUnity3Dのバックグラウンドを持つ開発者を対象としていますが、Webまたはthree.jsのバックグラウンドを持つ開発者にも役立つ可能性があります。Unityとthree.jsまたはNeedle Engineでどのように物事が行われるかに関するトピックを扱います。

もしTypescriptとJavascriptを初めて使用し、Needle Engineのスクリプト作成に深く入りたい場合は、C#とJavascript/Typescriptの違いの基本的な理解のために、[Typescript Essentials Guide](./typescript-essentials)を読むこともお勧めします。

コードを書きながら進めたい場合は、[engine.needle.tools/new](https://engine.needle.tools/new)を開いて、ブラウザで編集できる小さなプロジェクトを作成できます⚡

## 基本
Needle Engineは、[three.js](https://threejs.org/)上で動作する3D Webエンジンです。Three.jsは、Web向けの最も人気のある3D WebGLベースのレンダリングライブラリの1つです。Needle Engineで`gameObject`を参照する場合、それは*実際には*three.jsの`Object3D`、three.jsのあらゆるオブジェクトの基本タイプも指しています。これらの用語は互換的に使用できます。任意の`gameObject`は`Object3D`*です*。

これはまた、もしthree.jsに既に慣れているなら、Needle Engineを使用する上で全く問題がないことを意味します。three.jsでできることはすべて、Needle Engineでも可能です。特定のライブラリを既に使っている場合、Needle Engineベースの環境でもそれらを使用できます。

注：**Needle EngineのExporterは、既存のC#コードをWeb Assemblyにコンパイル*しません*。** Web Assemblyを使用するとランタイムパフォーマンスが向上する*可能性*がありますが、Webエクスペリエンス構築における反復速度と柔軟性には大きなコストがかかります。[ビジョン](./../vision.md)と[技術概要](./../technical-overview.md)について詳しくはこちらをご覧ください。

:::details Needle Engineを使用して新しいUnityプロジェクトを作成する方法は？（動画）
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />
:::

## コンポーネントの作成
Unityでは、`MonoBehaviour`から派生させることで新しいコンポーネントを作成します。
```csharp
using UnityEngine;
public class MyComponent : MonoBehaviour {
}
```

一方、Needle Engineでのカスタムコンポーネントは次のように書かれます。
```ts twoslash
import { Behaviour } from "@needle-tools/engine"
export class MyComponent extends Behaviour {
}
```
## スクリプトフィールド

### serializable
一部のNeedle Engineスクリプトを見たことがある場合、一部の変数が宣言の上に`@serializable`でアノテーションされていることに気づいたかもしれません。これはTypescriptのDecoratorであり、コードを変更またはアノテーションするために使用できます。Needle Engineでは、例えば、glTFに保存されている生のコンポーネント情報からコンポーネントインスタンスに変換する際に、スクリプトでどのようなタイプを期待するかをコアのシリアライゼーションに知らせるために使用されます。
次の例を考えてみましょう。
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
これはNeedle Engineに、`myOtherComponent`が`Behaviour`タイプであるべきだと伝えます。これにより、シーンがロードされる際にフィールドに正しい参照が自動的に割り当てられます。`someOtherObject`も同様で、ここでは`Object3D`参照にデシリアライズしたいと考えています。

場合によっては型を省略できることに注意してください。これは[Javascriptのすべてのプリミティブ型](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)で行うことができます。これらは`boolean`、`number`、`bigint`、`string`、`null`、`undefined`です。
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    @serializable() // < no type is needed here because the field type is a primitive
    myString?: string;
}
```

### public vs private
`private`、`public`、`protected`のようなアクセサー修飾子がないフィールドは、javascriptではデフォルトで`public`になります。
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    /// no accessor means it is public:
    myNumber?: number;
    // explicitly making it private:
    private myPrivateNumber?: number;
    protected myProtectedNumber?: number;
}
```
メソッドにも同様のことが言えます。

## GameObjectとシーン
コンポーネントから現在のシーンにアクセスするには、`this.scene`を使用します。これは`this.context.scene`と同等であり、ルートとなるthree.jsシーンオブジェクトを取得できます。

コンポーネントからヒエラルキーを走査するには、オブジェクトの子をforループで反復するか、
```ts twoslash
for (let i = 0; i < this.gameObject.children; i++) {
    console.log(this.gameObject.children[i]);
}
```
`foreach`と同等のものを使用して反復できます。
```ts twoslash
for (const child of this.gameObject.children) {
    console.log(child);
}
```
または、[`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse)メソッドを使用して、すべてのオブジェクトを再帰的に迅速に反復するためのthree.js固有のメソッドを使用することもできます。
```ts twoslash
import { GameObject } from "@needle-tools/engine";
//---cut-before---
this.gameObject.traverse((obj: GameObject) => console.log(obj))
```
または、可視オブジェクトだけを走査するには、代わりに[`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible)を使用します。

レンダリング可能なオブジェクトを反復したい場合に非常に便利な別のオプションとして、すべてのRendererコンポーネントをクエリして、次のように反復することができます。
```ts twoslash
import { Renderer } from "@needle-tools/engine";

for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
コンポーネントの取得に関する詳細については、次のセクションを参照してください。

## コンポーネント
Needle Engineは、Unityのそれに類似したコンポーネントシステムを多用しています。これは、シーン内の任意の`Object3D` / `GameObject`にコンポーネントを追加または削除できることを意味します。`addNewComponent(<Object3D>, <ComponentType>)`を使用すると、コンポーネントがエンジンに登録されます。
アタッチされたコンポーネントのイベントメソッドは、エンジンによって自動的に呼び出されます（例：`update`または`onBeforeRender`）。イベントメソッドの完全なリストは、[スクリプトドキュメント](../scripting.md#lifecycle-methods)で見つけることができます。

#### シーン内のコンポーネントを見つける
コンポーネントを取得するには、Unityと同様の慣れ親しんだメソッドを使用できます。以下では`Animator`タイプを例として使用していますが、組み込みまたは自分で作成した任意のコンポーネントタイプを使用することもできます。
| メソッド名 | 説明 |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | GameObject/Object3D上の`Animator`コンポーネントを取得します。Animatorコンポーネントがある場合は`Animator`インスタンスを返し、オブジェクトにそのようなコンポーネントがない場合は`null`を返します。 |
| `this.gameObject.getComponentInChildren(Animator)` | GameObject/Object3Dまたはその子にある最初の`Animator`コンポーネントを取得します。 |
| `this.gameObject.getComponentsInParents(Animator)` | 親ヒエラルキーにあるすべてのAnimatorコンポーネントを取得します（現在のGameObject/Object3Dを含む）。 |

これらのメソッドは、静的なGameObjectタイプでも利用可能です。例えば、渡されたGameObject/Object3D上の`Animator`コンポーネントを取得するには、``GameObject.getComponent(this.gameObject, Animator)``を使用します。

シーン全体から1つまたは複数のコンポーネントを検索するには、``GameObject.findObjectOfType(Animator)``または`GameObject.findObjectsOfType(Animator)`を使用できます。

## 名前が変更されたUnityタイプ
一部のUnity固有のタイプは、当社のエンジンで異なるタイプ名にマッピングされています。以下のリストを参照してください。

| Unityでのタイプ | Needle Engineでのタイプ |  |
| -- | -- | -- |
| `UnityEvent` | `EventList` | `UnityEvent`は`EventList`タイプとしてエクスポートされます（UnityEventをデシリアライズするには`serializable(EventList)`を使用します）。 |
| `GameObject` | `Object3D` | |
| `Transform` | `Object3D` | three.jsとNeedle Engineでは、GameObjectとTransformは同じです（`Transform`コンポーネントはありません）。このルールの唯一の例外は、Needle Engineでもコンポーネントである`RectTransform`を参照する場合です。 |
| `Color` | `RGBAColor` | three.jsのcolorタイプにはalphaプロパティがありません。そのため、UnityからエクスポートされるすべてのColorタイプは、カスタムのNeedle Engineタイプである`RGBAColor`としてエクスポートされます。 |

## Transform
Transformデータは、`GameObject` / `Object3D`上で直接アクセスできます。Unityとは異なり、このデータを保持する追加のTransformコンポーネントはありません。
- ``this.gameObject.position`` は、ローカルスペースのベクトル3 [位置](https://threejs.org/docs/?q=obj#api/en/core/Object3D.position)です
- ``this.gameObject.worldPosition`` は、ワールドスペースのベクトル3位置です
- ``this.gameObject.rotation`` は、ローカルスペースの[オイラー回転](https://threejs.org/docs/?q=obj#api/en/core/Object3D.rotation)です
- ``this.gameObject.worldRotation`` は、ワールドスペースのオイラー角でのオイラー回転です
- ``this.gameObject.quaternion`` - は、ローカルスペースの[クォータニオン回転](https://threejs.org/docs/?q=obj#api/en/core/Object3D.quaternion)です
- ``this.gameObject.worldQuaternion`` は、ワールドスペースのクォータニオン回転です
- ``this.gameObject.scale`` - は、ローカルスペースのベクトル3 [スケール](https://threejs.org/docs/?q=obj#api/en/core/Object3D.scale)です
- ``this.gameObject.worldScale`` は、ワールドスペースのベクトル3スケールです

ここで覚えておくべき主な違いは、three.jsでは`position`がデフォルトでローカルスペース位置であるのに対し、Unityでは`position`がワールドスペースであることです。次のセクションでは、three.jsでワールドスペース位置を取得する方法を説明します。

### WORLD- 位置、回転、スケール...

three.js（したがってNeedle Engineも）では、`object.position`、`object.rotation`、`object.scale`はすべてローカルスペース座標です。これは、`position`がワールドスペースであり、明示的にローカルスペース位置を使用するために`localPosition`を使用することに慣れているUnityとは異なります。

Needle Engineでワールド座標にアクセスしたい場合は、オブジェクトとともに使用できるユーティリティメソッドがあります。`getWorldPosition(yourObject)`を呼び出してワールド位置を計算します。回転/クォータニオン、スケールにも同様のメソッドが存在します。これらのメソッドにアクセスするには、Needle Engineから`import { getWorldPosition } from "@needle.tools/engine"`のようにインポートするだけです。

`getWorldPosition`、`getWorldRotation`、`getWorldScale`のようなこれらのユーティリティメソッドは、内部的にVector3インスタンスのバッファを持っており、ローカルでのみ使用することを意図していることに注意してください。これは、コンポーネントでそれらをキャッシュすべきではないことを意味します。そうしないと、キャッシュされた値が最終的に上書きされます。ただし、同じインスタンスを再利用することを心配することなく計算を行うために、関数内で`getWorldPosition`を複数回呼び出すことは安全です。これが何を意味するか不明な場合は、[Typescript Essentials Guide](./typescript-essentials.md#primitive-types)の**Primitive Types**セクションを参照してください。

## 時間
時間データにアクセスするには、`this.context.time`を使用します。
- `this.context.time.time` は、アプリケーションが実行を開始してからの時間です
- `this.context.time.deltaTime` は、最後のフレームから経過した時間です
- `this.context.time.frameCount` は、アプリケーションが開始してから経過したフレーム数です
- `this.context.time.realtimeSinceStartup` は、アプリケーションが実行を開始してからのスケールされない時間です

また、`this.context.time.timeScale`を使用して、例えばスローモーション効果のために時間を意図的に遅くすることも可能です。

## Raycasting
``this.context.physics.raycast()``を使用してレイキャストを実行し、交差のリストを取得します。オプションを何も渡さない場合、レイキャストは現在アクティブな`mainCamera`を使用して、スクリーン空間でのマウス位置（または最初のタッチ位置）から実行されます。`maxDistance`、使用するカメラ、テスト対象のレイヤーなど、様々な設定を持つ`RaycastOptions`オブジェクトを渡すこともできます。

[three.js ray](https://threejs.org/docs/#api/en/math/Ray)を使用してレイキャストを実行するには、``this.context.physics.raycastFromRay(your_ray)``を使用します。

上記の呼び出しは、デフォルトでは可視シーンオブジェクトに対してレイキャストを実行することに注意してください。これは、オブジェクトにヒットするために常にコライダーが必要なUnityとは異なります。デフォルトのthree.jsソリューションには利点と欠点の両方があり、主な欠点の1つは、シーンジオメトリによっては非常に遅くなる可能性があることです。スキニングされたメッシュに対してレイキャストを行う場合は特に遅くなる可能性があります。そのため、通常、UnityでSkinnedMeshRendererを持つオブジェクトを`Ignore Raycast`レイヤーに設定することをお勧めします。これにより、Needle Engineでもデフォルトで無視されます。

もう1つのオプションは、シーン内のコライダーを持つヒットのみを返す物理レイキャストメソッドを使用することです。

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

ここに編集可能な[物理レイキャストの例](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)があります。

## 入力
入力状態をポーリングするには、``this.context.input``を使用します。

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

``InputEvents`` enum内のイベントに、次のように購読することもできます。
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable(){
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }
    onDisable() {
        // コンポーネントが非アクティブになった際にもイベントの購読を解除することを推奨します
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    inputPointerDown = (evt: NEPointerEvent) => { console.log(evt); }
}
```

入力を自分で処理したい場合は、[ブラウザが提供するすべてのイベント](https://developer.mozilla.org/en-US/docs/Web/Events)（たくさんあります）に購読することもできます。例えば、ブラウザのクリックイベントに購読するには、次のように書くことができます。
```ts twoslash
window.addEventListener("click", () => { console.log("MOUSE CLICK"); });
```
この場合、すべてのケースを自分で処理する必要があることに注意してください。例えば、ユーザーがデスクトップ、モバイル、VRデバイスのいずれでWebサイトを閲覧しているかによって、異なるイベントを使用する必要がある場合があります。これらのケースはNeedle Engineの入力イベントによって自動的に処理されます（例：`PointerDown`は、マウスダウン、タッチダウン、およびVRコントローラーのボタンダウンの場合の両方で発生します）。

## InputSystemコールバック
Unityと同様に（[UnityのIPointerClickHandler](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html)参照）、コンポーネント自体で入力イベントを受け取るように登録することもできます。

```ts twoslash
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class ReceiveClickEvent extends Behaviour {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```

すべてのコンポーネントで利用可能なポインターイベント：
- `onPointerDown`
- `onPointerUp`
- `onPointerEnter`
- `onPointerMove`
- `onPointerExit`
- `onPointerClick`

すべてに、イベントを記述する`PointerEventData`引数があります。

## Debug.Log
javascriptでの`Debug.Log()`に相当するのは`console.log()`です。`console.warn()`や`console.error()`も使用できます。
```ts twoslash
import { GameObject, Renderer } from "@needle-tools/engine";
const someVariable = 42;
// ---cut-before---

console.log("Hello web");
// このように、好きなだけ多くの引数を渡すことができます：
console.log("Hello", someVariable, GameObject.findObjectOfType(Renderer), this.context);
```

## Gizmos
Unityでは通常、`OnDrawGizmos`や`OnDrawGizmosSelected`のような特別なメソッドを使用してGizmoを描画する必要があります。一方、Needle Engineにはそのようなメソッドはなく、スクリプトのどこからでも自由にGizmoを描画できます。その際、例えばデプロイされたWebアプリケーションでそれらを描画しないようにすることはあなたの責任であることに注意してください（`if(isDevEnvironment))`などでフィルタリングできます）。

例えば、ワールド空間の点を視覚化するために、1秒間赤いワイヤースフィアを描画する例です。
```ts twoslash
import { Vector3 } from "three";
const hit = { point: new Vector3(0, 0, 0) };
// ---cut-before---
import { Gizmos } from "@needle-tools/engine";
Gizmos.DrawWireSphere(hit.point, 0.05, 0xff0000, 1);
```
利用可能なGizmoメソッドの一部を以下に示します。
| メソッド名 |  |
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

## 便利なユーティリティメソッド

`@needle-tools/engine`からインポートします（例: `import { getParam } from "@needle-tools/engine"`）。

| メソッド名 | 説明 |
| --- | --- |
| `getParam()` | URLパラメータが存在するか確認します。値がない場合（例: `?help`）はtrueを返し、URLに見つからないか0に設定されている場合（例: `?help=0`）はfalseを返し、それ以外の場合は値を返します（例: `?message=test`）。 |
| `isMobileDevice()` | アプリがモバイルデバイスからアクセスされている場合はtrueを返します。 |
| `isDevEnvironment()` | 現在のアプリがローカルサーバーで実行されている場合はtrueを返します。 |
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

## Webプロジェクト
C#では通常、1つまたは複数のプロジェクトを含むソリューションを扱います。Unityでは、このソリューションはUnityによって管理され、C#スクリプトを開くとプロジェクトが開き、ファイルが表示されます。
Unityの組み込みパッケージマネージャーを使用してパッケージをインストールすることで、Unityまたは他の開発者（チーム内やUnityのAssetStoreなど）が提供する機能を追加するのが一般的です。UnityはPackageManagerを使ってパッケージの追加と管理を容易にする優れた仕事をしています。そのため、`manifest.json`のようなファイル（Unityがどのパッケージがインストールされているかを追跡するために使用するもの）を手動で編集したり、コマンドラインからコマンドを実行してパッケージをインストールしたりする必要はなかったかもしれません。

Web環境では、`npm`（Node Package Manager）を使用して、依存関係/パッケージを管理します。これは基本的にUnityのPackageManagerと同じことを行います。パッケージを*何らかの*サーバー（この文脈では通常*レジストリ*と呼ばれます）からインストール（ダウンロード）し、`node_modules`という名前のフォルダーに入れます。

Webプロジェクトを扱う際、ほとんどの依存関係は[npmjs.com](https://npmjs.com/)からインストールされます。これは、Webプロジェクトにとって最も人気のあるパッケージレジストリです。

package.jsonの例を以下に示します。
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

デフォルトのテンプレートはViteをバンドラーとして使用しており、フロントエンドフレームワークはプリインストールされていません。Needle Engineはどのフレームワークを使用するかについて制約がないため、好きなフレームワークで自由に作業できます。Vue.js、Svelte、Next.js、React、React Three Fiberなどの人気フレームワークのサンプルを用意しています。

## パッケージと依存関係のインストール
npmから依存関係をインストールするには、コマンドライン（またはターミナル）でWebプロジェクトを開き、`npm i <パッケージ名>`（`npm install`の短縮形）を実行します。
例えば、[Needle Engine](https://www.npmjs.com/package/@needle-tools/engine)をインストールするには、`npm i @needle-tools/engine`を実行します。これにより、パッケージが`package.json`の`dependencies`配列に追加されます。
パッケージをdevDependencyとしてのみインストールするには、`npm i --save-dev <パッケージ名>`を実行します。dependenciesとdevDependenciesの違いについては、以下で詳しく説明します。

### 'dependencies' と 'devDependencies' の違い
*dependency*を含む2つのエントリがあることに気づいたかもしれません - `dependencies`と`devDependencies`です。

`dependencies`は、Webプロジェクトがインストールされる場合、またはライブラリを開発していてパッケージが別のプロジェクトの依存関係としてインストールされる場合に、**常にインストール**（またはバンドル）されます。

`devDependencies`は、プロジェクトを開発する際に**のみ**インストールされます（つまり、特定のディレクトリで直接`install`を実行する場合）。それ以外の場合はプロジェクトには**含まれません**。

### 別のパッケージまたは依存関係をインストールして使用する方法は？
[Installing](#installing)セクションでは、プロジェクトディレクトリで`npm i <package_name>`を実行することで依存関係をインストールできることを学びました。`package_name`は[npm.js](https://npmjs.org)で見つけることができる任意のパッケージです。

プロジェクトにトゥイーンライブラリを追加したいと仮定しましょう。この例では[`@tweenjs/tween.js`](https://www.npmjs.com/package/@tweenjs/tween.js)を使用します。結果だけを先に確認したい場合は[こちら](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts)が最終プロジェクトです。

まずターミナルで`npm install @tweenjs/tween.js`を実行し、インストールが完了するまで待ちます。これにより、package.jsonに新しいエントリが追加されます。
```json
"dependencies": {
    "@needle-tools/engine": "^3.5.11-beta",
    "@tweenjs/tween.js": "^20.0.3",
    "three": "npm:@needle-tools/three@0.146.8"
}
```
次に、トゥイーンを使用したいスクリプトファイルのいずれかを開き、ファイルの先頭でインポートします。
```ts twoslash
import * as TWEEN from '@tweenjs/tween.js';
```
ここでは`* as TWEEN`と書くことでライブラリ内のすべての型をインポートしていることに注意してください。`import { Tween } from @tweenjs/tween.js`のように特定の型だけをインポートすることもできます。

これでスクリプトで使用できます。使用したいライブラリのドキュメントを参照することを常にお勧めします。tween.jsの場合、従うことができる[ユーザーガイド](https://github.com/tweenjs/tween.js/blob/HEAD/docs/user_guide.md)が提供されています。通常、npm上のパッケージのReadmeページには、パッケージのインストール方法と使用方法に関する情報が含まれています。

キューブを回転させるために、`TweenRotation`という新しいコンポーネントタイプを作成します。次に、オブジェクトの回転に対するトゥイーンインスタンス、繰り返しの頻度、使用するイージング、実行したいトゥイーンを作成し、開始します。あとは毎フレーム`update`を呼び出してトゥイーンアニメーションを更新するだけです。最終的なスクリプトは次のようになります。
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
import * as TWEEN from '@tweenjs/tween.js';

export class TweenRotation extends Behaviour {

    // トゥイーナーのインスタンスを保存します
    private _tween?: TWEEN.Tween<any>;

    start() {
        const rotation = this.gameObject.rotation;
        // トゥイーンインスタンスを作成します
        this._tween = new TWEEN.Tween(rotation);
        // 無限に繰り返すように設定します
        this._tween.repeat(Infinity);
        // 使用するイージングを設定します
        this._tween.easing(TWEEN.Easing.Quintic.InOut);
        // トゥイーンする値を設定します
        this._tween.to({ y: Math.PI * 0.5 }, 1000);
        // 開始します
        this._tween.start();
    }

    update() {
        // 毎フレームトゥイーンを更新します
        // '?' は_tweenが作成されたかチェックするための短縮形です
        this._tween?.update();
    }
}
```
これで、シーン内の任意のオブジェクトに追加するだけで、オブジェクトを永遠に回転させることができます。
最終的なスクリプトの動作は[こちら](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts)で確認できます。

# さらに学ぶ

- [Needle Engineでのスクリプト作成](../scripting)
- [Typescriptの基本](./typescript-essentials.md)
- [コンポーネントリファレンス](../component-reference.md)

このページはAIによって自動的に翻訳されました。