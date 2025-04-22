# 機能概要

Needle Engineは、ブラウザで実行される本格的な3Dエンジンです。最新の3Dエンジンに期待されるすべての機能と、それ以上の機能が付属しています。まだご覧になっていない場合は、[ホームページ](https://needle.tools)と[サンプルおよびショーケース](https://engine.needle.tools/samples)をご覧ください。

[[toc]]

## シェーダーとマテリアル

PBR MaterialsとShader Graphまたは他のシステムで作成されたカスタムシェーダーの両方をエクスポートできます。

<img src="https://user-images.githubusercontent.com/5083203/186012027-9bbe3944-fa56-41fa-bfbb-c989fa87aebb.png" />

ノードベースの[ShaderGraph](https://unity.com/features/shader-graph)を使用して、ウェブ用のシェーダーを作成します。ShaderGraphを使用すると、アーティストは構文を気にすることなく制作を続けることができます。

詳細については、[PBR Materials](./export.md#physically-based-materials-pbr) • [Custom Shaders](./export.md#custom-shaders) をお読みください。

## クロスプラットフォーム：VR、AR、モバイル、デスクトップ
Needle Engineは、ウェブテクノロジーが動作するところならどこでも実行できます。同じアプリケーションをデスクトップ、モバイル、AR、VRで実行できます。私たちは[XRを念頭に置いて](./xr.md)Needle Engineを構築しており、これをレスポンシブウェブデザインの不可欠な一部と考えています！

[Everywhere Actions](./everywhere-actions.md)を使用して、**AndroidとiOSの両方でインタラクティブAR**を実現します。

## ライトマップ

![lightmaps](https://user-images.githubusercontent.com/5083203/186163693-093c7ae2-96eb-4d75-b98f-bf19f78032ff.gif)

ライトマップはUnityまたはBlenderでベイクでき、3Dコンテンツに美しい静的光を簡単に追加できます。ウェブ向けのライトベイクはかつてないほど簡単になりました。UnityでライトマップしたいオブジェクトをStaticとマークし、シーンに1つまたは複数のライトを追加（または放射マテリアルを使用）してベイクをクリックするだけです。Needle Engineはシーンごとにライトマップをエクスポートし、エディターで見える通りに自動的に読み込んで表示します！

> **注意**: 使用するライトマッパーに技術的な制限はありません。Unityのライトマッピングデータ構造に収まる限り使用できます。したがって、[Bakery](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218)などのサードパーティ製ライトマッパーもサポートされています。

- [ライトマップのエクスポート](https://fwd.needle.tools/needle-engine/docs/lightmaps)について詳しく読む

## マルチプレイヤーとネットワーキング
ネットワーキングはコアランタイムに組み込まれています。GlitchへのNeedle Engineデプロイには小さなサーバーが付属しており、マルチプレイヤー3D環境を数秒でデプロイできます。組み込みのネットワーク対応コンポーネントにより、簡単に始めることができ、独自の同期コンポーネントを作成できます。変数と状態の同期は非常に簡単です！

- [ネットワーキング](https://fwd.needle.tools/needle-engine/docs/networking) • [スクリプティング](https://fwd.needle.tools/needle-engine/docs/scripting)について詳しく読む

## アニメーションとシーケンス
Needle Engineは、パワフルなアニメーション、状態制御、シーケンス機能をウェブにもたらします。単一のアニメーション再生から、複雑なアニメーションやキャラクターコントローラーの編成およびブレンドまで対応します。Exporterは、UnityのAnimatorやTimelineのようなコンポーネントをウェブ対応フォーマットに変換できます。
さらに、Blenderアドオンにもこの機能を追加し、互換性のあるアニメーションステートマシンを作成し、nlaトラックをタイムラインとしてBlender内からウェブにエクスポートすることも可能です。

- [アニメーションコンポーネント](./component-reference.md#animation)について詳しく読む

### Animator

<img src="https://user-images.githubusercontent.com/5083203/186011302-176524b3-e8e5-4e6e-9b77-7faf3561bb15.png" />

Unityの[AnimatorおよびAnimatorController](https://docs.unity3d.com/Manual/class-AnimatorController.html)コンポーネントを使用すると、アニメーションを設定し、それらをいつどのようにブレンドするかを定義できます。ステートマシン、StateMachineBehaviours、トランジション、レイヤーのエクスポートをサポートしています。StateMachineBehavioursは、``OnStateEnter``、``OnStateUpdate``、および``OnStateExit``イベントでもサポートされています。

> **注意**: サブステートとブレンドツリーはサポートされていません。

### Timeline

![2022-08-23-013517_Scene](https://user-images.githubusercontent.com/5083203/186037829-ee99340d-b19c-484d-b551-94797519c9d9.png)

また、[UnityのTimeline](https://unity.com/features/timeline)設定とトラックをウェブ対応フォーマットに変換しています。
サポートされているトラックは以下の通りです。AnimationTrack、AudioTrack、ActivationTrack、ControlTrack、SignalTrack。

> **注意**: サブタイムラインは現在サポートされていません。

> **注意**: [カスタムタイムライントラックをエクスポートすることも可能](https://github.com/needle-tools/needle-engine-modules/tree/main/package/TimelineHtml)です。

- [アニメーションコンポーネント](./component-reference.md#animation)について詳しく読む

## 物理
Rigidbodies、Mesh Colliders、Box Colliders、SphereCollidersを使用してワールドに物理を追加できます。

- [物理コンポーネント](./component-reference.md#physics)について詳しく読む

<sample src="https://engine.needle.tools/samples-uploads/physics-animation/" />

## UI
UnityのUIキャンバスシステムを使用したUI構築は開発中です。現在の機能には、テキスト（フォントを含む）、画像、ボタンのエクスポートが含まれます。

サポートされているコンポーネントについては、[UIコンポーネントリファレンス](component-reference.md#ui)を参照してください。

<sample src="https://engine.needle.tools/samples-uploads/screenspace-ui" />

## パーティクル
Unity ParticleSystem (Shuriken)のエクスポートは開発中です。現在の機能には、ワールド/ローカル空間シミュレーション、ボックスおよびスフィアエミッター形状、時間経過による放出およびバースト放出、時間経過による速度および色、速度による放出、テクスチャシートアニメーション、基本的なトレイルが含まれます。
サポートされている機能の[ライブサンプル](https://engine.needle.tools/samples/particles)を以下で確認してください。

<sample src="https://engine.needle.tools/samples-uploads/particles/" />

## ポストプロセス

組み込みのエフェクトには、Bloom、Screenspace Ambient Occlusion、Depth of Field、Color Correctionなどが含まれます。独自のカスタムエフェクトを作成することもできます。完全なリストについては、[コンポーネントリファレンス](./component-reference.md#postprocessing)を参照してください。

<sample src="https://engine.needle.tools/samples-uploads/postprocessing/" />

## エディター統合
Needle Engineには、Unity EditorおよびBlenderへの強力な統合が付属しています。
視覚的な方法で複雑なシーンを設定およびエクスポートできるため、アーティストと開発者の間で簡単かつ柔軟なコラボレーションが可能になります。

## スクリプティング
Needle Engineは[コンポーネントベースのワークフロー](scripting.md#component-architecture)を使用します。typescriptまたはjavascriptでカスタムスクリプトを作成します。Unityに統合された[モジュラーなnpmベースのパッケージワークフロー](https://fwd.needle.tools/needle-engine/docs/npmdef)を使用します。また、[typescriptからC#へのコンポーネントコンパイラ](https://fwd.needle.tools/needle-engine/docs/component-compiler)は、その場で魔法のようにUnityコンポーネントを生成します。

- [スクリプティングリファレンス](scripting) • [Npm定義ファイル](https://fwd.needle.tools/needle-engine/docs/npmdef)について詳しく読む

## その他にも

- ポストプロセス → Bloom、Screenspace Ambient Occlusion、Depth of Field、Color Correction...
- EditorSync → ローカル開発用に、Unityでの編集を実行中のthree.jsアプリケーションにライブ同期します
- iOSおよびAndroid上のインタラクティブAR → 当社の[Everywhere Actions](./everywhere-actions.md)機能セットを使用するか、独自のものを構築します

---
# 次へ

Needle Engineのダウンロード方法とセットアップ方法については、[はじめにガイド](getting-started/)を参照してください。
[当社のビジョン](vision)について学ぶか、そのすべてを支える[技術的な背景とglTF](technical-overview)についてさらに詳しく掘り下げてください。


このページはAIによって自動的に翻訳されました