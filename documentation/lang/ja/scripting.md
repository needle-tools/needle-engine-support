---
title: Creating and using Components
tags:
    - scripting
    - serialization
    - csharp
    - typescript
    - javascript
    - components
---

# カスタムコンポーネントの作成

スクリプトに慣れていない場合は、まず以下のガイドを読むことを**強くお勧めします**。

- [Typescript Essentials](./getting-started/typescript-essentials.md)
- [Unity開発者向けNeedle Engine](./getting-started/for-unity-developers.md)

何をしているか分かっている場合は、[Needle Engine APIドキュメント](https://engine.needle.tools/docs/api/latest)を直接参照してください。

---

Needle Engineのランタイムコードは、[TypeScript](https://typescriptlang.org)（推奨）または[JavaScript](https://javascript.info/)で記述されています。これらからC#スタブコンポーネントが自動生成され、エディタでGameObjectsに追加できます。C#コンポーネントとそのデータは、ランタイムによって同じデータを持つJavaScriptコンポーネントとして再作成され、three.jsオブジェクトにアタッチされます。

カスタムコンポーネントと組み込みのUnityコンポーネントの両方を、この方法でJavaScriptコンポーネントにマッピングできます。たとえば、アニメーション、レンダリング、物理学に関連する多くの組み込みコンポーネントのマッピングは、Needle Engineに[すでに含まれています](./component-reference.md#unity-components)。

以下の例をインストールせずにコードで追いたい場合は、以下のリンクをクリックするだけです。

- [コード追従用の仮想ワークスペースを作成する](https://stackblitz.com/fork/github/needle-engine/vite-template?file=src%2Fmain.ts)。

----

当社のウェブランタイムエンジンは、Unityに類似したコンポーネントモデルを採用しており、馴染みのある多くの機能を提供します。
threeのObject3Dオブジェクトにアタッチされたコンポーネントには、``awake``、``start``、``onEnable``、``onDisable``、``update``、``lateUpdate``といったライフサイクルメソッドを実装できます。また、[コルーチン](#coroutines)を使用することもできます。

----

## コードを書く必要がない場合

多くの場合、Unityのイベントと組み込みコンポーネントのメソッド呼び出しを使用してインタラクティブなシーンを実現できます。典型的な例は、ボタンクリック時のアニメーション再生です。ボタンを作成し、インスペクターにClickイベントを追加し、Animator.SetTriggerなどを呼び出して特定のアニメーションを再生します。

Needle EngineはUnityのイベントをJavaScriptメソッド呼び出しに翻訳するため、これは非常に高速で柔軟なワークフローになります。イベントを通常通り設定すれば、呼び出されたときにUnityと同じように動作します。

![image](https://user-images.githubusercontent.com/2693840/187314594-7e34905d-e704-4fa3-835c-6b40f11e1c62.png)
_Needle Engineでそのまま動作するButton Clickイベントの例 — コードは不要です。_

## 新しいコンポーネントの作成
スクリプトはTypeScript（推奨）またはJavaScriptで記述されます。
カスタムスクリプトをプロジェクトに追加するには2つの方法があります。

- 生成されたプロジェクトディレクトリの`src/scripts/`内に`.ts`または`.js`拡張子のファイルをシンプルに追加します。たとえば、`src/scripts/MyFirstScript.ts`のように。

- Unity固有:
  コードをNPM Definition Files（npmパッケージ）に整理します。これらはプロジェクト間でコードをモジュール化して再利用するのに役立ちます。Web開発に慣れている場合、これらは実際にはローカルにインストールされる通常のnpmパッケージです。
  Unityでは、`Create > NPM Definition`からNpmDefファイルを作成し、NpmDefファイルを右クリックして`Create > TypeScript`を選択することでTypeScriptファイルを追加できます。詳細については、[この章](./project-structure.md#npm-definition-files)を参照してください。

どちらの方法でも、ソースディレクトリは変更が監視され、変更が検出されるたびにC#スタブコンポーネントまたはBlenderパネルが再生成されます。
ソースファイルの変更は、実行中のウェブサイトのホットリロードも引き起こします。C#コンポーネントの再コンパイルをUnityが待つ必要はありません。これにより、コードの反復がほぼ瞬時に行えます。

1つのファイル内に複数のコンポーネントタイプを含めることもできます（例：同じTypescriptファイル内で`export class MyComponent1`と`export class MyOtherComponent`を宣言できます）。

JavascriptまたはTypescriptの記述に慣れていない場合は、このガイドを続ける前に[Typescript Essentialsガイド](./getting-started/typescript-essentials.md)を読むことをお勧めします。

:::details 例: オブジェクトを回転させるコンポーネントの作成

- **オブジェクトを回転させるコンポーネントを作成する**
  ``src/scripts/Rotate.ts``を作成し、以下のコードを追加します。
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

これでUnity内に``Rotate.cs``という新しいスクリプトが自動的に生成されます。新しいUnityコンポーネントをCubeに追加し、シーンを保存します。
Cubeがブラウザ内で回転するようになります。
Chrome開発者コンソールを`F12`で開き、``Rotate.start``メソッドからのログを確認してください。これは、エクスポートされているフィールドと現在割り当てられているデータを学習およびデバッグするのに役立つ実践です。一般的に、すべてのpublicおよびserializableなフィールドとすべてのpublicプロパティがエクスポートされます。

次に、Unityコンポーネントに新しいフィールド``public float speed = 5``を追加し、保存します。Rotateコンポーネントのインスペクターに編集可能な``speed``フィールドが表示されます。シーンを保存（または``Build``ボタンをクリック）すると、javascriptコンポーネントにエクスポートされた``speed``値が割り当てられていることに注意してください。
:::

:::details カスタム関数を持つコンポーネントの作成
構文と言語について詳しくは、[Typescript Essentialsガイド](./getting-started/typescript-essentials.md)を参照してください。
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

:::details バージョン管理とUnity
生成されたC#コンポーネントはタイプ名を使用して安定したGUIDを生成しますが、良い習慣として生成されたコンポーネントをバージョン管理でチェックインすることをお勧めします。
:::

## コンポーネントアーキテクチャ
コンポーネントはthree.jsの`Object3D`に追加されます。これはUnityでコンポーネントが`GameObject`に追加される方法に似ています。したがって、three.jsのObject3Dにアクセスしたい場合は、コンポーネントがアタッチされている`Object3D`を返す``this.gameObject``としてアクセスできます。

***注意**: Object3Dの``visible``をfalseに設定すると、Unityの``SetActive(false)``のように動作します。つまり、このオブジェクトとその子オブジェクト上のすべての現在のコンポーネントも無効になります。非アクティブなコンポーネントのUpdateイベントは、``visible``が再びtrueに設定されるまで呼び出されません。コンポーネントに影響を与えずにオブジェクトを非表示にしたい場合は、Needle Engineの`Renderer`コンポーネントを無効にするだけです。*

### ライフサイクルメソッド

ライフサイクルメソッドは、宣言されている場合にのみ呼び出されることに注意してください。したがって、実際に必要な場合にのみ`update`ライフサイクルメソッドを宣言してください。そうしないと、何も行わないアップデートループを持つコンポーネントが多数ある場合にパフォーマンスが低下する可能性があります。

| メソッド名          | 説明                                                               |
| :-------------- | :----------------------------------------------------------------- |
| `awake()`       | 新しいコンポーネントが作成されたときに最初に呼び出されるメソッド。                    |
| `onEnable()`    | コンポーネントが有効になったとき（例：``enabled``がfalseからtrueに変わったとき）に呼び出される。 |
| `onDisable()`   | コンポーネントが無効になったとき（例：``enabled``がtrueからfalseに変わったとき）に呼び出される。 |
| `onDestroy()`   | Object3Dまたはコンポーネントが破棄されているときに呼び出される。                         |
| `start()`       | コンポーネントが作成された後の最初のフレームの開始時に呼び出される。                      |
| `earlyUpdate()` | 最初のUpdateイベント。                                                  |
| `update()`      | デフォルトのUpdateイベント。                                                |
| `lateUpdate()`  | Updateの後に呼び出される。                                                 |
| `onBeforeRender()` | Render呼び出し前の最後のUpdateイベント。                                      |
| `onAfterRender()` | Renderイベントの後に呼び出される。                                              |

### 物理イベントメソッド
| メソッド名                 | 説明 |
| :----------------------- | -- |
| `onCollisionEnter(col : Collision)` |    |
| `onCollisionStay(col : Collision)`  |    |
| `onCollisionExit(col : Collision)`  |    |
| `onTriggerEnter(col : Collision)`   |    |
| `onTriggerStay(col : Collision)`    |    |
| `onTriggerExit(col : Collision)`    |    |

### 入力イベントメソッド
| メソッド名                    | 説明                                                               |
| :---------------------------- | :----------------------------------------------------------------- |
| `onPointerEnter(args : PointerEventData)` | カーソルがオブジェクト（またはその子オブジェクト）の上にホバーを開始したときに呼び出される。 |
| `onPointerMove(args : PointerEventData)`  | カーソルがオブジェクト（またはその子オブジェクト）の上を移動したときに呼び出される。 |
| `onPointerExit(args : PointerEventData)`  | カーソルがオブジェクトから離れたとき（ホバーを停止したとき）に呼び出される。         |
| `onPointerDown(args : PointerEventData)`  | カーソルがオブジェクト上で押されたときに呼び出される。                             |
| `onPointerUp(args : PointerEventData)`    | カーソルがオブジェクト上で離されたときに呼び出される。                             |
| `onPointerClick(args : PointerEventData)` | カーソルがオブジェクト上でクリックされたときに呼び出される。                         |

### XRイベントメソッド
*Needle Engine >= 3.32.0が必要です*
| メソッド名                                        | 説明                                                                                                                                                                                                                                                           |
| :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `supportsXR(mode: XRSessionMode)`               | `immersive-vr`や`immersive-ar`などの特定のXRモードのコールバックのみを受け取りたい場合に任意で実装します。渡されたモードのコールバックを受け取りたいことをシステムに通知するために`true`を返します。                                                                                                                                  |
| `onBeforeXR(mode: XRSessionMode, init: XRSessionInit)` | XRSessionが要求される直前に呼び出され、XRSessionInitオブジェクトを変更するために使用できます。                                                                                                                                                                      |
| `onEnterXR(args: NeedleXREventArgs)`              | このコンポーネントがXRセッションに参加したとき（または実行中のXRセッションでアクティブになったとき）のコールバック。                                                                                                                                                                   |
| `onUpdateXR(args: NeedleXREventArgs)`             | XRセッションが更新されたとき（XRセッション中にアクティブである間）のコールバック。                                                                                                                                                                                   |
| `onLeaveXR(args: NeedleXREventArgs)`              | このコンポーネントがXRセッションを終了したとき（または実行中のXRセッションで非アクティブになったとき）のコールバック。                                                                                                                                                                 |
| `onControllerAdded(args: NeedleXRControllerEventArgs)` | XRセッション中にコントローラーが接続/追加されたとき、またはコンポーネントがすでに接続されているコントローラーを持つ実行中のXRセッションに参加したとき、または実行中のXRセッション中にコンポーネントがアクティブになったときのコールバック。                                                                                                                                       |
| `onControllerRemoved(args: NeedleXRControllerEventArgs)` | XRセッション中にコントローラーが削除されたとき、または実行中のXRセッション中にコンポーネントが非アクティブになったときのコールバック。                                                                                                                                                             |

#### 追加のXRイベント

| メソッド名                                         | 説明                                                                             |
| :------------------------------------------------- | :------------------------------------------------------------------------------- |
| `window.addEventListener("needle-xrsession-start")` | XRSessionが開始されたときに呼び出されるCustomEventです。`details`に`NeedleXRSession`が含まれます。 |
| `window.addEventListener("needle-xrsession-end")`   | XRSessionが開始されたときに呼び出されるCustomEventです。`details`に`NeedleXRSession`が含まれます。 |
| `onXRSessionStart(args: { session:NeedleXRSession } )` | グローバルイベントフックです。購読解除には`offXRSessionStart`を使用します。                        |

### コルーチン

コルーチンは[JavaScript Generator構文](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)を使用して宣言できます。
コルーチンを開始するには、``this.startCoroutine(this.myRoutineName());``を呼び出します。

**例**
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

コルーチンを停止するには、ルーチンからreturnして終了するか、``startCoroutine``の戻り値をキャッシュして``this.stopCoroutine(<...>)``を呼び出します。すべてのコルーチンは``onDisable``時/コンポーネント無効時に停止されます。

## 特殊なライフサイクルフック

Needle Engineは、コンポーネント全体を記述することなく更新ループにフックするために使用できるいくつかのライフサイクルフックも公開しています。
これらのフックは、Webアプリケーションの任意の場所（たとえば、トップレベルのスコープやsvelteコンポーネント内）に挿入できます。
| メソッド名               | 説明                                                                 |
| :----------------------- | :------------------------------------------------------------------- |
| `onInitialized(cb, options)` | 新しいコンテキストが初期化されたとき（最初のフレームの前）に呼び出されます。                      |
| `onClear(cb, options)`   | エンジンコンテキストがクリアされる前にコールバックを登録します。                               |
| `onDestroy(cb, options)` | エンジンコンテキストが破棄される前にコールバックを登録します。                               |
| `onStart(cb, options)`   | コンポーネントの`start`の直後、フレームの開始時に呼び出されます。                                |
| `onUpdate(cb, options)`  | コンポーネントの`update`の直後に呼び出されます。                                   |
| `onBeforeRender(cb, options)` | render呼び出し前に呼び出されます。                                              |
| `onAfterRender(cb, options)` | render呼び出し後に呼び出されます。                                              |

例（[stackblitzの例を参照](https://stackblitz.com/edit/needle-engine-lifecycle-hooks?file=src%2Fmain.ts)）
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

## コンポーネントの検索、追加、削除

他のコンポーネントにアクセスするには、``GameObject``または``this.gameObject``の静的メソッドを使用します。たとえば、親の`Renderer`コンポーネントにアクセスするには、``GameObject.getComponentInParent(this.gameObject, Renderer)``または``this.gameObject.getComponentInParent(Renderer)``を使用します。

**例:**
```ts twoslash
import { Behaviour, GameObject, Renderer } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    start() {
        const renderer = GameObject.getComponentInParent(this.gameObject, Renderer);
        console.log(renderer);
    }
}
```

### 利用可能なメソッドの一部:

| メソッド                                        |                                                                                                   |
| :------------------------------------------------ | :------------------------------------------------------------------------------------------------ |
| `GameObject.instantiate(Object3D, InstantiateOptions)` | このオブジェクトの新しいインスタンスを、すべてのコンポーネントの新しいインスタンスを含めて作成します。                                  |
| `GameObject.destroy(Object3D \| Component)`       | コンポーネントまたはObject3D（とそのコンポーネント）を破棄します。                                      |
| `GameObject.addNewComponent(Object3D, Type)`      | 指定されたオブジェクトに、タイプに応じた新しいコンポーネントを追加（および作成）します。コンポーネントが返されるときには、``awake``および``onEnable``は既に呼び出されていることに注意してください。 |
| `GameObject.addComponent(Object3D, Component)`    | コンポーネントインスタンスを指定されたオブジェクトに移動します。例えば`new MyComponent()`でコンポーネントを作成し、それをオブジェクトにアタッチする場合など、インスタンスが既にある場合に便利です。 |
| `GameObject.removeComponent(Component)`           | gameObjectからコンポーネントを削除します。                                                            |
| `GameObject.getComponent(Object3D, Type)`         | 指定されたオブジェクト上で、タイプに一致する最初のコンポーネントを返します。                                     |
| `GameObject.getComponents(Object3D, Type)`        | 指定されたオブジェクト上で、タイプに一致するすべてのコンポーネントを返します。                                     |
| `GameObject.getComponentInChildren`             | ``getComponent``と同じですが、子オブジェクト内も検索します。                                                |
| `GameObject.getComponentsInChildren`            | ``getComponents``と同じですが、子オブジェクト内も検索します。                                               |
| `GameObject.getComponentInParent`               | ``getComponent``と同じですが、親オブジェクト内も検索します。                                                |
| `GameObject.getComponentsInParent`              | ``getComponents``と同じですが、親オブジェクト内も検索します。                                               |
| `GameObject.findObjectOfType`                   | シーン全体でタイプを検索します。                                                                |
| `GameObject.findObjectsOfType`                  | シーン全体で一致するすべてのタイプを検索します。                                                            |

## Three.jsとHTML DOM

コンテキストとは、[Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components)内のランタイムを指します。
three.jsのシーンは、``<needle-engine>``というカスタムHTMLコンポーネント内に存在します（プロジェクトの*index.html*を参照）。``this.context.domElement``を使用して``<needle-engine>`` Web Componentにアクセスできます。

このアーキテクチャにより、同じウェブページ上に複数のNeedle WebGLシーンを配置することが可能になります。これらのシーンは単独で実行することも、ウェブページの一部として互いに通信することもできます。

### シーンにアクセスする
コンポーネントから現在のシーンにアクセスするには、`this.scene`を使用します。これは`this.context.scene`と同等で、three.jsのルートシーンオブジェクトを取得します。

コンポーネントから階層をたどるには、オブジェクトの子をforループで反復処理できます。
```ts twoslash
for(let i = 0; i < this.gameObject.children; i++)
    console.log(this.gameObject.children[i]);
```
または、`foreach`と同等の方法で反復処理できます。
```ts twoslash
for(const child of this.gameObject.children) {
    console.log(child);
}
```
three.js固有のメソッドを使用して、[`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse)メソッドでオブジェクトを再帰的に素早く反復処理することもできます。
```ts twoslash
import { Object3D } from "three";
this.gameObject.traverse((obj: Object3D) => console.log(obj));
```
または、表示可能なオブジェクトのみをたどる場合は、[`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible)を使用してください。

もう1つの便利なオプションは、レンダリング可能なオブジェクトのみを反復処理したい場合に、すべてのrendererコンポーネメントをクエリして以下のように反復処理することです。
```ts twoslash
import { Renderer } from "@needle-tools/engine";
for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
コンポーネントの取得について詳しくは、次のセクションを参照してください。

### 時間
時間データにアクセスするには、`this.context.time`を使用します。
- `this.context.time.time` はアプリケーションの開始からの時間です。
- `this.context.time.deltaTime` は前回のフレームから経過した時間です。
- `this.context.time.frameCount` はアプリケーションの開始から経過したフレーム数です。
- `this.context.time.realtimeSinceStartup` はアプリケーションの開始からのスケールされていない時間です。

また、`this.context.time.timeScale`を使用して、例えばスローモーション効果のために時間を意図的に遅くすることも可能です。

### 入力
コンポーネントが存在するオブジェクトの入力データを受け取ります。
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onPointerDown() {
        console.log("POINTER DOWN on " + this.gameObject.name);
    }
}
```

また、以下のように``InputEvents`` enumのグローバルイベントを購読することもできます。
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

または、毎フレーム入力状態をポーリングしたい場合は``this.context.input``を使用します。

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

自分で入力を処理したい場合は、[ブラウザが提供するすべてのイベント](https://developer.mozilla.org/en-US/docs/Web/Events)（非常にたくさんあります）を購読することもできます。例えば、ブラウザのクリックイベントを購読するには、以下のように記述します。
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
この場合、すべてのケースを自分で処理する必要があることに注意してください。たとえば、ユーザーがデスクトップ、モバイル、VRデバイスのいずれでウェブサイトを訪問しているかによって、異なるイベントを使用する必要がある場合があります。これらのケースは、Needle Engineの入力イベント（例：`PointerDown`はマウスダウン、タッチダウン、およびVRコントローラーのボタンダウンの両方で発生します）によって自動的に処理されます。

### レイキャスト

レイキャストを実行し、交差のリストを取得するには、``this.context.physics.raycast()``を使用します。オプションを渡さない場合、レイキャストは画面空間のマウス位置（または最初のタッチ位置）から、現在アクティブな`mainCamera`を使用して実行されます。`maxDistance`、使用するカメラ、テストするレイヤーなどのさまざまな設定を持つ`RaycastOptions`オブジェクトを渡すこともできます。

[three.jsのRay](https://threejs.org/docs/#api/en/math/Ray)を使用してレイキャストを実行するには、``this.context.physics.raycastFromRay(your_ray)``を使用します。

> **注意**: このタイプのレイキャストは、シーン内のすべての可視オブジェクトに対してレイをキャストします。物理エンジンは必要ありません。これは、オブジェクトにヒットするために常にコライダーが必要なUnityの挙動とは異なります。物理コライダーのみに対してキャストしたい場合は、以下の`physics.engine.raycast`メソッドを使用してください。

#### パフォーマンスに関する考慮事項

デフォルトのNeedle圧縮設定を使用する場合、メッシュの単純化されたバージョンが自動的に作成され、レイキャストにも使用されます。それでも、一部のタイプのメッシュは遅いです。例えば、スキンメッシュやブレンドシェイプを持つメッシュは、正確なヒットを判断するために高価な計算が必要です。それらのオブジェクトをUnityの`Ignore Raycast`レイヤーに設定して、それらに対するレイキャストを避けることを検討してください。

#### 物理ベースのレイキャスト

もう1つのオプションは、物理レイキャストメソッドを使用することです。これにより、シーン内のコライダーとのヒットのみが返されます。

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

物理レイキャストの編集可能な[例はこちら](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)。

### ネットワーク
ネットワーク関連のメソッドには``this.context.connection``経由でアクセスできます。詳細については、[ネットワークドキュメント](./networking.md)を参照してください。

## どこからでもNeedle Engineとコンポーネントにアクセスする
コンポーネント内にない通常のJavaScriptコードから上記で説明したすべての機能にアクセスすることが可能です。Needleランタイムのすべてのコンポーネントと機能はグローバルな``Needle``名前空間経由でアクセスできます（``console.log(Needle)``と記述すると概要を確認できます）。

たとえば、``Needle.findObjectOfType(Needle.AudioSource)``を使用してコンポーネントを見つけることができます。シーン全体を繰り返し検索するのは高コストであるため、これらの参照をキャッシュすることをお勧めします。上記の[コンポーネントの検索、追加、削除](#finding-adding-and-removing-components)のリストを参照してください。

最初のシーンロードのコールバックを取得するには、以下の例を参照してください。
```js
<needle-engine loadstart="loadingStarted" progress="loadingProgress" loadfinished="loadingFinished"></needle-engine>

<script type="text/javascript">
function loadingStarted() { console.log("START") }
function loadingProgress() { console.log("LOADING...") }
function loadingFinished() { console.log("FINISHED!") }
</script>
```

また、グローバルな`NeedleEngine`（「ContextRegistry」と呼ばれることもあります）を購読して、Needle Engineコンテキストが作成されたときのコールバックを受け取ったり、利用可能なすべてのコンテキストにアクセスしたりすることもできます。
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

もう1つのオプションは、`onInitialized(ctx => {})` [ライフサイクルフック](#special-lifecycle-hooks)を使用することです。

また、`NeedleEngine.Registered`経由で利用可能なすべてのコンテキストにアクセスすることも可能です。これは内部配列を返します。（ただし、この配列は変更されるべきではなく、すべての aktif コンテキストを反復処理して設定を変更するために使用できます。例：すべてのコンテキストを`context.isPaused = true`に設定するなど）

以下に、静的`NeedleEngine`タイプで利用可能なイベントのリストを示します。
`NeedleEngine.registerCallback(ContextEvent.ContextCreated, (args) => {})`経由でこれらのイベントを購読できます。

| ContextEventオプション           |                                                                                             |
| :------------------------------- | :------------------------------------------------------------------------------------------ |
| `ContextEvent.ContextRegistered` | コンテキストがレジストリに登録されたときに呼び出されます。                                                                  |
| `ContextEvent.ContextCreationStart` | 最初のglbがロードされる前に呼び出され、物理エンジンの初期化に使用できます。Promiseを返すことも可能です。                                     |
| `ContextEvent.ContextCreated`    | 最初のフレームの前にコンテキストが作成されたときに呼び出されます。                                                              |
| `ContextEvent.ContextDestroyed`  | コンテキストが破棄されたときに呼び出されます。                                                                  |
| `ContextEvent.MissingCamera`     | コンテキストがカメラを見つけられなかったときに呼び出されます。現在、作成時のみ呼び出されます。                                           |
| `ContextEvent.ContextClearing`   | コンテキストがクリアされているときに呼び出されます。シーン内のすべてのオブジェクトが破棄され、内部状態がリセットされます。                               |
| `ContextEvent.ContextCleared`    | コンテキストがクリアされた後に呼び出されます。                                                                  |

## ギズモ

静的クラス`Gizmos`を使用して、線、形状、テキストを描画できます。これは主にデバッグに役立ちます。
すべてのギズモ関数には、色やシーンに表示される期間など、複数のオプションがあります。内部的にはキャッシュされて再利用されます。

| ギズモ              |                                                                                             |
| :------------------ | :------------------------------------------------------------------------------------------ |
| `Gizmos.DrawLabel`  | オプションで背景付きのラベルを描画します。オブジェクトにアタッチできます。テキストを更新するために使用できるLabelハンドルを返します。                              |
| `Gizmos.DrawRay`    | ワールド空間の原点と方向を受け取り、無限のレイラインを描画します。                                                              |
| `Gizmos.DrawDirection` | ワールド空間の原点と方向を受け取り、方向を描画します。                                                              |
| `Gizmos.DrawLine`   | ワールド空間の2つのvec3ポイントを受け取り、線を描画します。                                                              |
| `Gizmos.DrawWireSphere` | ワールド空間にワイヤーフレームの球体を描画します。                                                              |
| `Gizmos.DrawSphere` | ワールド空間にソリッドな球体を描画します。                                                                |
| `Gizmos.DrawWireBox` | ワールド空間にワイヤーフレームのボックスを描画します。                                                              |
| `Gizmos.DrawWireBox3` | ワイヤーフレームのbox3を描画します。                                                                |
| `Gizmos.DrawArrow`  | ワールド空間の2つのポイントを受け取り、矢印を描画します。                                                               |

## シリアライゼーション / glTFファイル内のコンポーネント
コンポーネントを埋め込み、それらを正しいタイプでglTFで再作成するために、非プリミティブ型（``Number``、``Boolean``、``String``以外のすべて）も保存する必要があります。これは、フィールドまたはプロパティの上に``@serializable(<type>)``デコレータを追加することで行えます。

**例:**
@[code ts twoslash](@code/component-object-reference.ts)

カスタム形式でシリアライズおよびデシリアライズするには、``TypeSerializer``クラスを拡張してインスタンスを作成することが可能です。サポートされているタイプを登録するために、コンストラクタで``super()``を使用します。

> **注意**: 一致するフィールドに加えて、typescriptファイル内のフィールドと一致するプロパティもエクスポートされます。

## シーンのロード
Unityで参照されているPrefabs、SceneAssets、およびAssetReferences（UnityのAddressable System）は、自動的にglTFファイルとしてエクスポートされます（[Export Prefabs](export.md)ドキュメントを参照してください）。

これらのエクスポートされたglTFファイルは、プレーンな文字列URIとしてシリアライズされます。これらのファイルをTypeScriptコンポーネントから簡単にロードするために、``AssetReference``タイプの概念が追加されました。これらはランタイムにロードできるため、アプリの一部や外部コンテンツのロードを遅延させることが可能です。

**例:**
@[code ts twoslash](@code/component-prefab.ts)

AssetReferenceはURIごとにキャッシュされるため、複数のコンポーネント/スクリプトで同じエクスポートされたglTF/Prefabを参照しても、一度だけロードされて再利用されます。

# 次のステップ
---
AIによって自動翻訳されたページ