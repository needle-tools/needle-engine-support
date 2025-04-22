---
title: Everywhere Actions
---

## Everywhere Actionsとは？

NeedleのEverywhere Actionsは、厳選されたコンポーネントセットであり、コードを一行も書かずにUnityでインタラクティブな体験を作成できます。
これらは、Web、モバイル、XR、**iOS上の拡張現実を含む**体験のための構成要素として機能するように設計されています。

低レベルのトリガーとアクションから、より高レベルの複雑なインタラクティブな振る舞いを構築できます。

### 対応プラットフォーム
- デスクトップ
- モバイル (Android / iOS)
- VRグラス
- ARデバイス
- iOS AR – QuickLook (はい、本当に！)

## Everywhere Actionsの使い方は？

iOSをサポートするには、シーンに`USDZExporter`コンポーネントを追加します。`WebXR`コンポーネントと同じオブジェクトに追加するのが良い習慣ですが、必須ではありません。

シーン内の任意のオブジェクトにアクションを追加するには、
そのオブジェクトを選択し、`Add Component > Needle > Everywhere Actions > [Action]`をクリックします。

![](/imgs/everywhere-actions-component-menu.gif)

## Everywhere Actionsリスト

| アクション | 説明 | 使用例 |
| --- | --- | --- |
| Play Animation on Click | Animatorから選択したアニメーションステートを再生します。再生後、必要に応じて別のアニメーションに遷移できます。 | 製品プレゼンテーション、インタラクティブチュートリアル、キャラクターの動き |
| Change Material on Click | マテリアルを別のものに切り替えます。そのマテリアルを持つすべてのオブジェクトが一緒に切り替わります。 | 製品コンフィギュレーター、キャラクター |
| Look At | オブジェクトをカメラの方に向けます。 | UI要素、スプライト、インフォグラフィック、ビルボードエフェクト、クリック可能なホットスポット |
| Play Audio on Click | 選択したオーディオクリップを再生します。 | 効果音、ナレーション、美術館の展示 |
| Hide on Start | 後で表示するために、シーン開始時にオブジェクトを非表示にします。 | |
| Set Active on Click | オブジェクトを表示または非表示にします。 | |
| Change Transform on Click | オブジェクトを移動、回転、またはスケールします。絶対的または相対的な移動が可能です。 | キャラクター、製品、UIアニメーション（より複雑な動きにはアニメーションを使用） |
| Audio Source | 開始時にオーディオを再生し、ループを続けます。空間的または非空間的 | BGM、環境音 |
| WebXR Image Tracking | 画像ターゲットをトラッキングし、オブジェクトを表示または非表示にします。 | AR体験、製品プレゼンテーション |

## サンプル

### Musical Instrument

空間オーディオ、アニメーション、インタラクションをデモンストレーションします。

<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Simple Character Controllers

アニメーション、Look At、移動の組み合わせをデモンストレーションします。

<sample src="https://engine.needle.tools/samples-uploads/usdz-characters" />

### Image Tracking

カスタム画像マーカーに3Dコンテンツをアタッチする方法をデモンストレーションします。以下のシーンをARで開始し、画面上の画像マーカーにスマートフォンのカメラを向けるか、印刷してください。

<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Image Marker" width=300 />

<a href="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" target="_blank">サンプル画像マーカーをダウンロード</a>

**Androidの場合:** Chrome Flagsで「WebXR Incubations」をオンにしてください。これは、AndroidスマートフォンのChromeブラウザのアドレスバーに [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) を貼り付けることで見つけることができます。

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />

### Interactive Building Blocks Overview

<sample src="https://engine.needle.tools/samples-uploads/usdz-interactivity" />

## 独自のEverywhere Actionsを作成する

新しいEverywhere Actionsの作成には、ブラウザやWebXRで使用されるTypeScriptでアクションのコードを記述すること、そしてTriggerBuilderとActionBuilder APIを使用して、QuickLook経由でのiOS上の拡張現実のための対応するセットアップを作成することが含まれます。カスタムアクションを作成する際は、QuickLookでは利用できる機能セットが限られていることに留意してください。ブラウザとWebXRでは任意のコードを使用できますが、QuickLookの振る舞いは、利用可能なトリガーとアクションから構築された近似である必要がある場合があります。

:::tip
多くの場合、特定の振る舞いを構築するには、既にある低レベルのアクションを既成概念にとらわれずに創造的に適用することが必要です。「Tap to Place」アクションはその一例です。QuickLookにはレイキャスティングやヒットテストの機能はありませんが、配置したい領域を複数の見えないオブジェクトで覆い、「Tap」トリガーを使用して、タップされた見えないオブジェクトの位置に配置したいオブジェクトを移動させることができます。
:::

QuickLookのトリガーとアクションは、[AppleのPreliminary Interactive USD Schemas](https://developer.apple.com/documentation/arkit/usdz_schemas_for_ar/actions_and_triggers)に基づいています。

### コード例

以下は`HideOnStart`の実装例で、ブラウザとQuickLookの両方の実装を含むEverywhere Actionの作成方法を示しています。
@[code ts twoslash](@code/component-everywhere-action-hideonstart.ts)

::: tip
多くの場合、適切な振る舞いを得るには、利用可能な**低レベルアクション**から**高レベルアクション**を構成することが必要になります。例えば、私たちの「Change Material on Click」アクションは、多数の`fadeActions`で構成されており、内部的には異なるマテリアルセットを持つオブジェクトを複製しています。これらのアクションを注意深く構成することで、複雑な振る舞いを実現できます。
:::

### 独自のAction構築のための低レベルメソッド

| トリガー | |
| --- | --- |
| `TriggerBuilder.sceneStartTrigger` | |
| `TriggerBuilder.tapTrigger` | |

| アクション | |
| --- | --- |
| `ActionBuilder.fadeAction` | |
| `ActionBuilder.startAnimationAction` | |
| `ActionBuilder.waitAction` | |
| `ActionBuilder.lookAtCameraAction` | |
| `ActionBuilder.emphasize` | |
| `ActionBuilder.transformAction` | |
| `ActionBuilder.playAudioAction` | |

| グループアクション | |
| --- | --- |
| `ActionBuilder.sequence` | |
| `ActionBuilder.parallel` | |
| `GroupAction.addAction` | |
| `GroupAction.makeParallel` | |
| `GroupAction.makeSequence` | |
| `GroupAction.makeLooping` | |
| `GroupAction.makeRepeat` | |

組み込みのEverywhere Actionsの実装を見るには、`src/engine-components/export/usdz/extensions/behavior/BehaviourComponents.ts`を参照してください。

## さらに読む

以下のページでは、すぐにテストして探索できるより多くの例とサンプルを提供しています。

- iOS AR & Quicklookに焦点を当てた多くのインタラクティブなAR例がある、[AR Showcase Website](https://engine.needle.tools/projects/ar-showcase/)をご覧ください。
- [Needle Engine Everywhere Action Samples](https://engine.needle.tools/samples/?overlay=samples&tag=everywhere+actions)

---
このページはAIによって自動的に翻訳されました。