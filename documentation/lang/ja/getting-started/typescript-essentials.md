---
title: Needle Engineでのスクリプティング
description: Typescript、Javascript、C#の違い、類似点、重要な概念。
sidebarDepth: 2
---

以下のガイドでは、C#、Javascript、Typescript間のいくつかの主な違いを強調しています。これは、Webエコシステムに慣れていない開発者にとって特に役立ちます。

Typescriptの書き方を学ぶための便利なリソースもいくつかあります。

- [Typescript Tutorial](https://www.typescripttutorial.net/)
- [Learn Typescript](https://www.tutorialsteacher.com/typescript)
- [Typescript Documentation](https://www.typescriptlang.org/docs/)

### C#、Javascript、またはTypescript間の主な違い


**CSharp**または**C#**は静的型付けされたコンパイル言語です。これは、コードが実行される**前**に、コンパイル（翻訳）されてILまたはCILという中間言語になる必要があることを意味します。この中間言語は、*機械語*に少し近いです。ここで理解すべき重要な点は、コードが分析され、コンパイラによって**強制される**特定のチェックとルールに合格しなければならないということです。C#言語のいずれかのルールに違反するコードを書いた場合、**Unityで**コンパイラエラーが発生し、アプリケーションは実行すら開始しません。コンパイラエラーがあると、Play-Modeに入ることはできません。

一方、**Javascript**はランタイムで解釈されます。つまり、無効なコードを書いてエラーを引き起こす可能性がありますが、それらのエラーは*プログラムが実行されるまで*、またはエラーのある正確な行を**実行しようとするまで**表示されません。たとえば、`var points = 100; points += "hello world";`と書いても、ブラウザでコードを*実行するまで*誰も文句を言いません。

**Typescript**は、Microsoftによって設計された言語で、**javascriptにコンパイルされます**。
これは、例えば**型安全**のような多くの機能を追加します。つまり、Typescriptでコードを書くとき、型を宣言することが*でき*、その結果、例えば無効な代入を行ったり、予期しない型のメソッドを呼び出したりしようとしたときに、*コンパイル時*にエラーを得ることができます。以下でJavascriptとTypescriptにおける型について詳しく読んでください。

### 型 — あるいはその欠如

**素のJavascript**には、（今日現在）*型*の概念が**ありません**。`let points = 100`と宣言した変数が、アプリケーションの後半でまだ*数値*であるという保証はありません。つまり、Javascriptでは、後でコードで`points = new Vector3(100, 0, 0);`を代入することは完全に有効なコードです。あるいは`points = null`や`points = myRandomObject`でも構いません。これがどういうことかお分かりでしょう。コードを書いている間はこれで全く問題ありませんが、後で`points -= 1`と書いたときに、コードが実行されるとひどくクラッシュする可能性があります。**その時**、アプリケーションが既に実行されているブラウザでエラーが発生します。

上述のように、**Typescript**は型を定義するための構文を追加することで、その問題を修正するために作成されました。

Typescriptを書くとき、*基本的に*まだJavascriptを書いていることを理解することが重要です。そして、例えばエラーのある行の上に``//@ts-ignore``を追加したり、すべての型を``any``として定義したりすることで、すべての型チェックと安全チェックを回避することは*可能*ですが、これは**絶対にお勧めできません**。型は、実際にエラーが発生する前にエラーを見つけるのを助けるために存在します。サーバーにウェブサイトをデプロイしてから、後でユーザーや訪問者から、実行中にアプリがクラッシュしたという報告を受けることは、決して望ましくないでしょう。

*素のJavascript*には型が提供されていませんが、**[JSDoc](https://jsdoc.app/)**を使用することで、javascriptの変数、クラス、メソッドに型アノテーションを追加することはできます。

### 変数

C#では、型を使用するか、`var`キーワードを使用して変数を記述します。
例えば、`int points = 100;`と書くか、
あるいは`var`を使用してコンパイラに正しい型を推論させることができます:`var points = 100`

JavascriptまたはTypescriptでは、変数を宣言するための現代的なオプションが2つあります。
再代入する予定の変数には`let`を使用します。例えば`let points = 100;`
再代入できないようにしたい変数には`const`を使用します。例えば`const points = 100;`
> *varに注意*
Javascriptでも`var`キーワードに出くわすかもしれませんが、その使用は推奨されておらず、現代的な代替手段は`let`です。[var vs let](https://stackoverflow.com/a/11444416)について詳しく学んでください。

ただし、`const`で宣言された変数でも、それが（例えば）カスタム型である場合は、値を代入することが*可能*であることに注意してください。以下の例を考えてみてください。

```ts twoslash
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition.x = 100; // Assigning x is perfectly fine
```
上記は完全に問題のないTypescriptコードです。なぜなら、`myPosition`自体を再代入しているのではなく、`myPosition`の`x`メンバーだけを操作しているからです。一方、以下の例は許可され**ません**。ランタイムエラーまたはtypescriptエラーが発生します。
```ts twoslash
// @errors: 2588
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition = new Vector3(100, 0, 0); // ⚠ constへの代入は許可されていません
```

### 型の使用またはインポート

Unityでは、通常、コードの先頭に`using`ステートメントを追加して、プロジェクトで参照されているアセンブリから特定のネームスペースをインポートします。あるいは、特定のケースでは、ネームスペースから名前付きの特定の型をインポートすることもあります。
以下の例を見てください。
```csharp
using UnityEngine;
// 特定の型だけをインポートして名前を付ける
using MonoBehaviour = UnityEngine.MonoBehaviour;
```

これは、Typescriptでパッケージから特定の型をインポートする方法です。
```ts twoslash
import { Vector3 } from 'three';
import { Behaviour } from '@needle-tools/engine';
```

特定のパッケージからすべての型をインポートして名前を付けることも*でき*ます。これは時々見かけるかもしれません。
```ts twoslash
import * as THREE from 'three';
const myVector : THREE.Vector3 = new THREE.Vector3(1, 2, 3);
```

### プリミティブ型
*Vector2, Vector3, Vector4...*
C#の経験があるなら、クラスと構造体の違いについてご存知かもしれません。クラスが参照型であるのに対し、構造体はカスタムの値型です。つまり、文脈によってはスタックに割り当てられ、メソッドに渡される際にはデフォルトでコピーが作成されます。
C#の以下の例を考えてみてください。

```csharp
void MyCallerMethod(){
    var position = new Vector3(0,0,0);
    MyExampleVectorMethod(position);
    UnityEngine.Debug.Log("Position.x is " + position.x); // ここでxは0になります
}
void MyExampleVectorMethod(Vector3 position){
    position.x = 42;
}
```

`position`という名前のVector3でメソッドが呼び出されます。メソッド内で、渡されたベクトル`position`が変更され、xが42に設定されます。しかし、C#では、このメソッドに渡されている元のベクトル（2行目を参照）は変更されて**いません**。xは**引き続き**0になります（4行目）。

Javascript/Typescriptでは事情が異なります。こちらにはカスタムの値型はありません。つまり、Needle Engineやthree.jsでベクトルに出くわした場合、常に参照型となります。
typescriptの以下の例を考えてみてください。
```ts twoslash
import { Vector3 } from 'three'

function myCallerMethod() : void {
    const position = new Vector3(0,0,0);
    myExampleVectorMethod(position);
    console.log("Position.x is " + position.x); // ここでxは42になります
}
function myExampleVectorMethod(position: Vector3) : void {
    position.x = 42;
}
```
違いがわかりますか？ベクトルやすべてのカスタムオブジェクトは実際には参照型で*ある*ため、元の`position`変数（3行目）を変更したことになり、xは今や42です。

これはメソッドだけでなく、変数を使用する際にも理解しておくことが重要です。
C#では、以下のコードはVector3の2つのインスタンスを生成し、一方を変更してももう一方には影響しません。
```csharp
var myVector = new Vector3(1,1,1);
var myOtherVector = myVector;
myOtherVector.x = 42;
// ログ出力: 1, 42
UnityEngine.Debug.Log(myVector.x + ", " + myOtherVector.x);
```
Typescriptで同じことを行うと、コピーは**作成されず**、代わりに同じ`myVector`インスタンスへの参照が得られます。
```ts twoslash
import { Vector3 } from 'three'

const myVector = new Vector3(1,1,1);
const myOtherVector = myVector;
myOtherVector.x = 42;
// ログ出力: 42, 42
console.log(myVector.x, myOtherVector.x);
```

### ベクトル演算と演算子

C#では演算子オーバーロードを使用できますが、残念ながらJavascriptでは利用できません。これは、C#でVector3をこのように乗算できる一方で：

```csharp
var myFirstVector = new Vector3(1,1,1);
var myFactor = 100f;
myFirstVector *= myFactor;
// → myFirstVector は現在 100, 100, 100 です
```

同じ結果を得るためには、Vector3型のメソッドを使用する必要があります（少しボイラープレートコードが増えます）。

```ts twoslash
import { Vector3 } from "three"

const myFirstVector : Vector3 = new Vector3(1, 1, 1)
const myFactor = 100;
myFirstVector.multiplyScalar(myFactor);
// → myFirstVector は現在 100, 100, 100 です
```

### 等価性チェック

#### 緩やかな比較と厳密な比較
C#では、2つの変数が同じかどうかをチェックしたい場合、次のように書くことができます。
```csharp
var playerIsNull = myPlayer == null;
```
Javascript/Typescriptでは、`==`と`===`の間に違いがあります。`===`は型をより厳密にチェックします。
```ts twoslash
const myPlayer: any = null;
// ---cut-before---
const playerIsNull = myPlayer === null;
const playerIsNullOrUndefined = myPlayer == null;
```
2番目の変数`playerIsNullOrUndefined`が`==`を使用していることに気づくでしょう。これは緩やかな等価性チェックを行い、この場合、`null`と`undefined`の両方が`true`になります。詳細については、[こちら](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)を参照してください。

### イベント、バインディング、そして`this`

C#でイベントを購読（サブスクライブ）する場合、次のように行います。
```csharp
// イベントはこのように宣言されます
event Action MyEvent;
// 追加（または削除）して購読します
void OnEnable() {
    MyEvent += OnMyEvent;
}
void OnDisable() {
    MyEvent -= OnMyEvent;
}
void OnMyEvent() {}
```
TypescriptとJavascriptでは、メソッドをリストに追加する際、「thisをバインドする」必要があります。これは本質的に、`this`を（通常は）現在のクラスインスタンスに明示的に設定するメソッドを作成することを意味します。これを実現する方法は2つあります。

ここでは`EventList`型を使用していることに注意してください。これはNeedle Engineのイベントを宣言するための型です（`EventList`は、私たちのEditor統合と使用する際に、UnityEventまたはBlenderのイベントリストにも自動的に変換されます）。

これを行うための短く**推奨される**構文は、[アロー関数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)を使用することです。

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

    // 関数をアロー関数として宣言して`this`を自動的にバインドします
    private onMyEvent = () => {
        console.log(this !== undefined, this)
    }
}
```
同じことを実現するための、より冗長な「古典的な」方法もあります。これは手動で`this`をバインドすることです（そして、後でイベントリストから再び削除するために、メソッドを変数に保存します）。
```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent?: EventList;

    private _onMyEventFn?: Function;

    onEnable() {
        // thisをバインドする
        this._onMyEventFn = this.onMyEvent.bind(this);
        // バインドされたメソッドをイベントに追加する
        this.myEvent?.addEventListener(this._onMyEventFn);
    }

    onDisable() {
        this.myEvent?.removeEventListener(this._onMyEventFn);
    }

    // 関数をアロー関数として宣言して`this`を自動的にバインドします
    private onMyEvent = () => { }
}
```

## 次は何ですか？

- [Needle Engine Scripting](/scripting.md)


このページはAIによって自動的に翻訳されました