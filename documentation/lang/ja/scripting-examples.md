---
title: Scripting Examples
description: 役立つスクリプトスニペットと例のコレクションです。
---

# スクリプティング例

スクリプト初心者の方は、まず以下のガイドを読むことを**強くお勧めします**。

- [初心者ガイド: Typescript Essentials](./getting-started/typescript-essentials.md)
- [初心者ガイド: Unity開発者向けNeedle Engine](./getting-started/for-unity-developers.md)
- [ビデオチュートリアル: カスタムコンポーネントの書き方](https://youtu.be/uf5UK0bLHlY?si=82U_2L4n2V7XL7RJ)

以下に、クイックリファレンスとしていくつかの基本的なスクリプトを示します。

また、開始点としてダウンロードして使用できるサンプルシーンと完全なプロジェクトを多数提供しています。
- [サンプルWebサイトを見る](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=scripting_examples)
- [サンプルパッケージをダウンロード](https://engine.needle.tools/downloads/unity/samples)
- [Needle Engine Stackblitzコレクション](https://stackblitz.com/@marwie/collections/needle-engine)
- [Needle Engine API](https://engine.needle.tools/api)

## 基本コンポーネント
<stackblitz file="@code/basic-component.ts"></stackblitz>
@[code ts twoslash](@code/basic-component.ts)

すべてのコンポーネントイベントについては、[スクリプティング](scripting#lifecycle-methods)を参照してください。

## Unityからのオブジェクトを参照
@[code ts twoslash](@code/component-object-reference.ts)

## Unityからのアセット（PrefabまたはSceneAsset）を参照してロード
@[code ts twoslash](@code/component-prefab.ts)

## Unityからのシーンを参照してロード
::: tip
[サンプルの動作例](https://engine.needle.tools/samples/multi-scenes-(dynamic-loading))をダウンロードしてお試しください。
:::

@[code ts twoslash](@code/component-scene.ts)

## オブジェクトのクリックを受け取る
このスクリプトをクリック可能にしたいシーン内の任意のオブジェクトに追加します。また、そのオブジェクトの親階層に`ObjectRaycaster`コンポーネントがあることを確認してください。

<stackblitz file="@code/component-click.ts">
test
</stackblitz>

@[code ts twoslash](@code/component-click.ts)

## オブジェクトのクリックをネットワーク化

このスクリプトをクリック可能にしたいシーン内の任意のオブジェクトに追加します。また、そのオブジェクトの親階層に`ObjectRaycaster`コンポーネントがあることを確認してください。
このコンポーネントは、受信したクリックを接続されているすべてのクライアントに送信し、アプリで反応できるイベントを発生させます。UnityまたはBlenderを使用している場合、単に`onClick`イベントに呼び出す関数を割り当てることで、たとえばアニメーションを再生したり、オブジェクトを非表示にしたりできます。

@[code ts twoslash](@code/component-click-networking.ts)

### クリックでアニメーションを再生
@[code ts twoslash](@code/component-animation-onclick.ts)

## アニメーションクリップを参照
これは、カスタムアニメーションロジックを実行したい場合に便利です。
クリップの配列をエクスポートすることもできます。
@[code ts twoslash](@code/component-animationclip.ts)

## UnityEventを作成および起動

@[code ts twoslash](@code/component-unityevent.ts)
::: tip
EventListイベントはコンポーネントレベルでも起動されます。つまり、上記で宣言されたイベントを``myComponent.addEventListener("my-event", evt => {...})``を使用して購読することも可能です。
これは実験的機能です。[フォーラム](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)でフィードバックを提供してください。
:::

### カスタムイベント型を宣言
これは、UnityまたはBlenderにカスタム引数（文字列など）を持つイベントを公開したい場合に便利です。
@[code ts twoslash](@code/component-customevent.ts)

_使用例:_
![20221128-210735_Unity-needle](https://user-images.githubusercontent.com/2693840/204370950-4c89b877-90d7-4e6f-8266-3352e6da16f4.png)

## ネストされたオブジェクトとシリアライゼーションを使用

オブジェクトとそのデータをネストできます。適切に一致する`@serializable(SomeType)`デコレーターを使用すると、データは自動的に正しい型にシリアライズおよびデシリアライズされます。

Typescriptコンポーネント内:
@[code ts twoslash](@code/component-nested-serialization.ts)

C#スクリプト内:
@[code](@code/component-nested-serialization-cs.cs)

::: tip
正しい型デコレーターがない場合でもデータは取得できますが、それは単なるプレーンオブジェクトとしてです。これはコンポーネントを移植する際に便利で、すべてのデータにアクセスでき、必要に応じて型を追加できます。
:::

## Web APIを使用
::: tip
すべてのWeb APIと[npm](https://npmjs.org)パッケージに引き続きアクセスできることを忘れないでください！
もしここでそう言っても許されるなら、それがNeedle Engineの魅力です😊
:::

### 現在位置を表示
@[code ts twoslash](@code/component-location.ts)

### Coroutineを使用して現在時刻を表示
@[code ts twoslash](@code/component-time.ts)

<video-embed src="./videos/component-time.mp4" limit_height />

## カスタムシェーダープロパティを変更

`_Speed`というfloat値のプロパティを持つカスタムシェーダーがある場合、スクリプトからそれを変更する方法を以下に示します。
[サンプルのライブ例](https://engine.needle.tools/samples/shaders/)をダウンロードして試すことができます。

<!-- SAMPLE modify custom shader material property -->

## src属性の切り替え

StackBlitzの[ライブ例](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)を参照してください。

## 新しいポストプロセス効果を追加

Webプロジェクトで[`npm i postprocessing`](https://github.com/pmndrs/postprocessing)をインストールしていることを確認してください。その後、`PostProcessingEffect`から派生させることで新しい効果を追加できます。

効果を使用するには、`Volume`コンポーネントと同じオブジェクトに追加します。

これは、[Outlineポストプロセス効果](https://pmndrs.github.io/postprocessing/public/demo/#outline)をラップする例です。任意の効果も単なるthree.jsシーン内のコンポーネントであるため、通常通り変数や設定を公開できます。

@[code](@code/custom-post-effect.ts)

## カスタムParticleSystemビヘイビア

@[code ts twoslash](@code/custom-particle-system-behaviour.ts)

## カスタム2Dオーディオコンポーネント

これは、独自のオーディオコンポーネントを作成する方法の例です。
ただし、ほとんどのユースケースでは、コアAudioSourceコンポーネントを使用でき、コードを書く必要はありません。

@[code ts twoslash](@code/component-2d-audio.ts)

## 任意の外部ファイル

FileReference型を使用して外部ファイル（JSONファイルなど）をロードします。
@[code ts twoslash](@code/component-filereference.ts)

<!-- SAMPLE receive click from HTML button
## コンポーネントでHTML要素のクリックを受け取る
-->

<!-- SAMPLE disable environment light
## 環境光を無効にする
-->

<!-- SAMPLE using mediapipe with hands
## mediapipeパッケージを使用して手で3Dシーンを制御
mediapipeパッケージをインストールしていることを確認してください。完全なプロジェクトセットアップについては、以下のgithubリンクを参照してください。
[ライブで試す](https://engine.needle.tools/samples/mediapipe-hands/) - Webカメラ/カメラが必要です
-->

<!-- SAMPLE Change Color On Collision
## 衝突時に色を変更
-->

<!-- SAMPLE Physics Trigger Relay
## Physicsトリガーリレー
オブジェクトの物理トリガーメソッドを使用してイベントを起動します
-->

<!-- SAMPLE Auto Reset
## オートリセット
オブジェクトが物理トリガーから離れるときに、その位置を自動的にリセットします
-->

<!-- SAMPLE Play Audio On Collision
## 衝突時にオーディオを再生
-->

<!-- SAMPLE Set Random Color
## ランダムな色を設定
開始時にオブジェクトの色をランダム化します。マテリアルは`start`メソッドでクローンされることに注意してください
-->

<!-- SAMPLE Timed Spawn
## 時間をかけてオブジェクトをスポーン
-->

---
ページはAIによって自動的に翻訳されました。