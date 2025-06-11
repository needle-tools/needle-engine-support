---
title: "@serializable およびその他のデコレーター"
---

以下の表には、Needle Engine が提供する利用可能な Typescript デコレーターが含まれています。

これらは (C# に慣れている方なら) 強化版のアトリビュートと考えることができます。Typescript のクラス、フィールド、メソッドに追加することで、追加機能を提供できます。

|  |  |
| --- | --- |
| **Field & Property Decorators** | |
| `@serializable()` | 公開/シリアライズされるフィールドに追加します。Unity または Blender からコンポーネントをエクスポートした glTF ファイルをロードする際に使用されます。 |
| `@syncField()` | 値が変更されたときにネットワークで値を同期するためにフィールドに追加します。フィールドが変更されたときに呼び出されるメソッドを渡すことができます。 |
| `@validate()` | 値が変更されるたびに、コンポーネントイベントメソッド `onValidate` でコールバックを受け取るために追加します。これは Unity の onValidate と同様の動作をします。 |
| **Method Decorators** | |
| `@prefix(<type>)` (実験的) | 他のコンポーネントにカスタムコードを簡単に注入するために使用できます。オプションで `false` を返すと、元のメソッドの実行を防ぐことができます。[以下の例](#prefix)を参照してください。 |
| **Class Decorators** | |
| `@registerType` | 引数なし。カスタムコンポーネントクラスに追加することで、Needle Engine の型に登録され、ホットリロードのサポートが有効になります。 |

## 例

### Serializable

```ts twoslash
import { Behaviour, serializable, EventList } from "@needle-tools/engine";
import { Object3D } from "three";

export class SomeComponentType extends Behaviour {}

export class ButtonObject extends Behaviour {
    // プリミティブ型の場合は型を省略できます
    // 例: Number, String または Bool
    @serializable()
    myNumber: number = 42;

    // それ以外の場合は、シリアライズしたい具体的な型を追加します
    @serializable(EventList)
    onClick?: EventList;

    @serializable(SomeComponentType)
    myComponent?: SomeComponentType;

    // 配列の場合も、具体的な型（配列ではない）を追加することに注意してください
    @serializable(Object3D)
    myObjects?: Object3D[];
}
```

### SyncField

`@syncField` デコレーターは、同じネットワーキングルームに接続されているすべてのユーザー (ウェブサイトの訪問者) に対して、コンポーネントのプロパティを自動的にネットワーク同期するために使用できます。オプションで、値が変更されるたびに呼び出されるコールバック関数を受け取ることができます。

- 参照値 (オブジェクトや配列など) が変更されたことをシステムに通知するには、フィールドを再割り当てする必要があります。例えば、`myField = myField` のようにします。
- コールバック関数はアロー関数にすることはできません (例: `onNumberChanged() { ... }` の場合は `MyScript.prototype.onNumberChanged` が機能しますが、`myNumberChanged = () => { ... }` の場合は機能しません)。

```ts twoslash
import { Behaviour, serializable, syncField } from "@needle-tools/engine";

export class MyScript extends Behaviour {

    @syncField(MyScript.prototype.onNumberChanged)
    @serializable()
    myNumber: number = 42;

    private onNumberChanged(newValue: number, oldValue: number){
        console.log("Number changed from ", oldValue, "to", newValue)
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
[ライブ例](https://stackblitz.com/edit/needle-engine-prefix-example?file=src%2Fmain.ts)
```ts twoslash
import { Camera, prefix } from "@needle-tools/engine";
class YourClass {
    @prefix(Camera) // < これは変更したいメソッドを持つ型です
    awake() { // < これは変更したいメソッド名です

        // これは Camera.awake メソッドが実行される前に呼び出されます
        // 注: `this` は `YourClass` ではなく Camera インスタンスを参照します。これにより、コンポーネントの内部状態にもアクセスできます
        console.log("Hello camera:", this)
        // オプションで false を返すと、デフォルトの動作を防ぐことができます
    }
}
```


このページはAIによって自動的に翻訳されました。