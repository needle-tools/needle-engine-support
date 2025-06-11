---
title: Blender 用 Needle Engine
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle ロゴ" alt="Needle ロゴ"/> +
    <img src="/blender/logo.png" style="max-height:70px;" />
</div>

# Blender 用 Needle Engine

Blender 用 Needle Engine を使用すると、Blender の中で非常にインタラクティブで柔軟かつ軽量な Web アプリケーションを作成できます。Blender の強力なツールを使用して、3D シーンの視覚的なセットアップ、アニメーション、およびデザインを行います。

## Blender アドオンをインストールする

<ClientOnly>

<a target="_blank" href="https://www.blender.org/download/">**Blender** 4.1 または 4.2</a> および <os-link windows_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi" osx_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0.pkg">**node.js**</os-link> をインストールしていることを確認してください。
</ClientOnly>

<NoDownloadYet>
    <needle-button
        event_goal="download_blender"
        event_position="getting_started"
        large
        href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"
        same_tab
        next_url="/docs/blender/"
        >
        **Blender 用 Needle Engine をダウンロード**
    </needle-button>
</NoDownloadYet>

1. Blender で、`Edit > Preferences > Add-ons` に移動し、ドロップダウン矢印をクリックして `Install from Disk` ボタンを見つけます。

2. ダウンロードした zip ファイル (`needle-blender-plugin-*.zip` という名前) を選択してインストールします。

3. Add-ons 検索バーで「Needle」を検索し、`Needle Engine Exporter for Blender` が有効になっていることを確認します。


![Settings](/blender/settings.webp)

## はじめに

Blender 用 Needle Engine をご利用いただきありがとうございます。

このアドオンを使用すると、Blender 内で、Needle Engine と three.js を使用して実行される、非常にインタラクティブで最適化された WebGL および WebXR エクスペリエンスを作成できます。

アニメーションのシーケンス、シーンのライトマップの簡単化、インタラクティビティの追加、または Web 上で実行される Typescript または Javascript で記述された独自のスクリプトの作成が可能になります。

<video-embed src="/docs/blender/environment-light.mp4" />
*Blender と Needle Engine の間で照明および環境設定を一致させます。HDRI 環境光は Blender から直接自動的にエクスポートされます。保存すると、ページは自動的に再読み込みされます。*

:::tip フィードバックを提供する

機能とワークフローのどちらを優先するかを決定する際に、**あなたのフィードバックは非常に貴重です**。フィードバック（良い点、悪い点どちらでも）がある場合は、[フォーラムでお知らせください](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)！
:::

## Blender 用サンプル

- [Blender サンプルをダウンロード](https://engine.needle.tools/downloads/blender/download-samples?utm_source=needle_docs&utm_content=blender)

まず、Web にエクスポートする新しいブレンドファイルを作成または開きます。
プロパティウィンドウを開き、シーンカテゴリを開きます。Needle Engine パネルで `Project Path` を選択します。次に `Generate Project` をクリックします。これにより、サーバーが自動的にインストールおよび起動されます。完了すると、ブラウザが開き、three.js シーンがロードされるはずです。

![Project panel](/blender/project-panel.webp)

デフォルトでは、ブレンドファイルを保存するとシーンが自動的に再エクスポートされます。
ローカルサーバーが実行されている場合（たとえば `Run Project` をクリックした場合）、Web サイトは変更されたモデルで自動的に更新されます。


Web プロジェクトがすでに存在し、Web サイトでの作業を続けたいだけの場合は、
青い `Run Project` ボタンをクリックしてローカルサーバーを起動します。
![Project panel](/blender/project-panel-2.webp)

### プロジェクトパネル概要
![Project panel](/blender/project-panel-3.webp)

1) Web プロジェクトへのパス。右側にある小さなフォルダボタンを使用して、別のパスを選択できます。
2) `Run Project` ボタンは、プロジェクトパスが有効な Web プロジェクトを示している場合に表示されます。Web プロジェクトは `package.json` を含んでいる場合に有効です。
3) `Directory` は Web プロジェクトのディレクトリ (`Project Path`) を開きます。
4) このボタンは、現在のシーンを glb としてローカル Web プロジェクトに再エクスポートします。これは、ブレンドファイルを保存するときにもデフォルトで発生します。
5) `Code Editor` は、Web プロジェクト内の vscode ワークスペースを開こうとします。
6) 1 つのブレンドファイルで複数のシーンを操作する場合、どのシーンがメインシーンであり、Web にエクスポートされるべきかを設定できます。コンポーネントが別のシーンを参照している場合は、それらも個別の glb ファイルとしてエクスポートされます。「Export」ボタンをクリックすると、メインシーンがブラウザにロードされるシーンになります。
7) Web プロジェクトをサーバーにアップロードしたい場合は、`Build: Development` または `Build: Production` ボタンを使用します。これにより、Web プロジェクトがバンドルされ、アップロードできるファイルが生成されます。`Build: Production` をクリックすると、テクスチャに最適化も適用されます（Web 用に圧縮されます）。
8) ドキュメントを開く

## Blender 設定

### カラーマネジメント

デフォルトでは、Blender ビューポートは `Filmic` に設定されています。この設定では、Blender と three.js の色のマッチングが合いません。
これを修正するには、Blender Render カテゴリに移動し、ColorManagement パネルで `View Transform`: `Standard` を選択します。

![Correct color management settings](/blender/settings-color-management.webp)


## 環境ライティング

ビューポートシェーディングオプションを使用して、環境ライティングとスカイボックスを変更できます。
ライティングまたは背景スカイボックスに使用するキューブマップを割り当てます。強度またはぼかしを調整して、好みに合わせて外観を変更できます。

注: ブラウザでもスカイボックスキューブマップを表示するには、`World Opacity` を 1 に増やします。

注: あるいは、ビューポートシェーディングタブで `Scene World` 設定を有効にして、Blender のワールド設定で割り当てられた環境テクスチャを使用することもできます。

![Environment](/blender/environment.webp)

<video-embed limit_height max_height="300px" src="/docs/blender/environment.mp4" />

あるいは、キューブマップを背景として表示したくない場合は、Blender カメラに Camera コンポーネントを追加し、`clearFlags: SolidColor` を変更します。ただし、Camera の `backgroundBlurriness` および `backgroundIntensity` 設定は、ビューポートシェーディング設定をオーバーライドすることに注意してください。

![Environment Camera](/blender/environment-camera.webp)

### カスタム HDRI / EXR 環境ライティングとスカイボックスを追加する

<video-embed limit_height src="/docs/blender/custom_hdri.mp4" />


## エクスポート

オブジェクトをエクスポートから除外するには、ビューポートとレンダー表示を無効にします（下図参照）。

![Exclude from export](/blender/dont-export.webp)


## アニメーション 🏇

簡単なユースケースでは、Animation コンポーネントを使用して 1 つまたは複数のアニメーションクリップを再生できます。
オブジェクトを選択し、Animation コンポーネントを追加してクリップを割り当てます（追加のクリップをクリップ配列に追加してエクスポートできます）。
デフォルトでは、`playAutomatically` が有効な場合、割り当てられた最初のクリップのみを再生します。単純なカスタム Typescript コンポーネントを使用して他のクリップをトリガーできます。
<video-embed limit_height src="/docs/blender/animation.mp4" />

### AnimatorController

Animator Controller は、より複雑なシナリオのために作成できます。これはステートマシンとして機能し、グラフ内で複数のアニメーションステートを作成し、それらの間で遷移するための条件と補間設定を構成できます。

<video-embed src="/docs/blender/animatorcontroller-web.mp4" />
*複雑なキャラクターアニメーションを制御するための [アニメーターステートマシン](#animatorcontroller) を作成してエクスポートします。*

#### AnimatorController の作成

AnimatorController エディターは、各パネルの左上にある EditorType ドロップダウンを使用して開くことができます。

![AnimatorController open window](/blender/animatorcontroller-open.webp)

<video-embed limit_height max_height="188px" src="/docs/blender/animatorcontroller-create.mp4" />
*新しいアニメーターコントローラーアセットを作成する ☝ または、以前に作成したアセットから選択する*

##### グラフ概要
![AnimatorController overview](/blender/animatorcontroller-overview.webp)
1) `Shift+A` を使用して新しい AnimatorState を作成します。
2) 最初のノードを追加すると、`Parameters` ノードが作成されます。これを選択して、遷移で使用するパラメータを設定します（右側境界の Node パネル経由）。
3) これは AnimatorState です。オレンジ色のステートは開始ステートです（Node/Properties パネルの `Set default state` ボタンを使用して変更できます）。
4) AnimatorState の Properties は、他のステートへの 1 つまたは複数の遷移を設定するために使用できます。`Conditions` 配列を使用して、遷移のために条件に一致する必要があるパラメータを選択します。

#### AnimatorController の使用

AnimatorController を使用するには、アニメーションのルートオブジェクトに Animator コンポーネントを追加し、このオブジェクトに使用したい AnimatorController アセットを選択します。

![AnimatorController assign to animator](/blender/animatorcontroller-assigning.webp)

Typescript から、またはたとえば Button コンポーネントのイベントを使用して、Animator のパラメータを設定できます。

### タイムライン — NLA トラックのエクスポート 🎬

Blender の NLA トラックを直接 Web にエクスポートできます。
任意の Blender オブジェクトに PlayableDirector コンポーネント（`Add Component` 経由）を追加します。NLA トラックをエクスポートしたいオブジェクトをコンポーネントの ``animation tracks`` リストに割り当てます。

![](/blender/timeline_setup.webp)
![](/blender/timeline.webp)

::: details インタラクティブなタイムライン再生のコード例
このスクリプトを `src/scripts`（カスタムコンポーネントのセクションを参照）に追加し、Blender の任意のオブジェクトに追加すると、タイムラインの時間がブラウザでのスクロールによって制御されるようになります。

```ts twoslash
import { Behaviour, PlayableDirector, serializable, Mathf } from "@needle-tools/engine";

export class ScrollTimeline extends Behaviour {

    @serializable(PlayableDirector)
    timeline?: PlayableDirector;

    @serializable()
    sensitivity: number = .5;

    @serializable()
    clamp: boolean = false;

    private _targetTime: number = 0;

    awake() {
        this.context.domElement.addEventListener("wheel", this.onWheel);
        if (this.timeline) this.timeline.pause();
    }

    private onWheel = (e: WheelEvent) => {
        if (this.timeline) {
            this._targetTime = this.timeline.time + e.deltaY * 0.01 * this.sensitivity;
            if (this.clamp) this._targetTime = Mathf.clamp(this._targetTime, 0, this.timeline.duration);
        }
    }

    update(): void {
        if (!this.timeline) return;
        const time = Mathf.lerp(this.timeline.time, this._targetTime, this.context.time.deltaTime / .3);
        this.timeline.time = time;
        this.timeline.pause();
        this.timeline.evaluate();
    }
}
```
:::

## インタラクティビティ 😎

Needle Components パネルを使用して、階層内のオブジェクトにコンポーネントを追加または削除できます。

![Component panel](/blender/components-panel.webp)

![Component panel](/blender/components-panel-select.webp)
*例えば、カメラオブジェクトに `OrbitControls` コンポーネントを追加することで、*
*モバイルデバイスおよびデスクトップデバイス用の基本的なカメラコントロールが得られます*
*各コンポーネントの設定は、それぞれのパネルで調整してください*

コンポーネントは、右下隅にある X ボタンを使用して削除できます。

![Remove component](/blender/remove-component.webp)

### カスタムコンポーネント
カスタムコンポーネントも、Typescript クラスを記述するだけで簡単に追加できます。保存すると自動的にコンパイルされ、Blender に表示されます。

カスタムコンポーネントを作成するには、Needle Project パネルからワークスペースを開き、Web プロジェクト内の `src/scripts` に `.ts` スクリプトファイルを追加します。Needle Engine 用のカスタムコンポーネントの記述方法については、[スクリプトドキュメント](http://docs.needle.tools/scripting) を参照してください。

::: warning 注意
Web プロジェクトに ``@needle-tools/needle-component-compiler`` 2.x がインストールされていることを確認してください (package.json devDependencies)
:::

## ライトマップ 💡

Needle には、美しいライトをテクスチャにベイクして Web に持ち込むのを非常に簡単にするライトマッププラグインが含まれています。このプラグインは、ライトマップがオンになっているすべてのモデルに対してライトマップ UV を自動的に生成します。手動でテクスチャアトラスを作成する必要はありません。独自のライトマップデータを持つ複数のインスタンスのライトマップもサポートしています。
ライトマップを機能させるには、少なくとも 1 つのライトと、`Needle Object` パネルで `Lightmapped` がオンになっているオブジェクトが 1 つ必要です。

<video-embed limit_height max_height="800px" src="/docs/blender/lightmapping.mp4" />

::: tip
動画で使用されている .blend ファイルは[こちら](https://engine.needle.tools/downloads/blender/lightmaps.blend)からダウンロードできます。
:::
Needle Object パネルを使用して、メッシュオブジェクトまたはライトのライトマッピングを有効にします。

![Lightmapping object](/blender/lightmapping-object.webp)

ライトマップの設定やベイクオプションに素早くアクセスするには、`Needle` タブのシーンビューパネルを使用できます。

![Lightmapping scene panel](/blender/lightmapping-scene-panel.webp)

あるいは、`Render Properties` タブの Lightmapping パネルを使用することもできます。

![Lightmapping object](/bller/lightmapping-panel.webp)

::: warning 実験的な機能
ライトマッピングプラグインは実験的な機能です。使用する際は .blend ファイルのバックアップを作成することをおすすめします。問題やエラーが発生した場合は、[私たちのフォーラム](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)にご報告ください 🙏
:::

## テクスチャ圧縮

Needle Engine Build Pipeline は、プロダクションビルドを作成する際に、テクスチャを ECT1S および UASTC を使用して自動的に圧縮します（マテリアルでの使用方法によります）（**プロダクションビルドには [toktx](../getting-started/index.md#install-these-tools-for-production-builds) のインストールが必要です**）。ただし、マテリアルパネルでテクスチャごとに圧縮タイプをオーバーライドまたは変更できます。

テクスチャごとに適用される圧縮を変更できます。デフォルトの圧縮設定をオーバーライドするには、`Material` タブに移動し、`Needle Material Settings` を開きます。そこで、マテリアルで使用されているテクスチャごとにテクスチャ設定をオーバーライドするトグルが見つかります。[テクスチャ圧縮テーブル](../deployment.md#how-do-i-choose-between-etc1s-uastc-and-webp-compression) を参照して、各圧縮アルゴリズムの違いの簡単な概要を確認してください。

![Texture Compression options in Blender](/blender/texture-compression.webp)

## 更新

Needle Project パネルの電球は、アドオンの新しいバージョンが利用可能になったことを通知します。
アイコンをクリックするだけで、新しいバージョンをダウンロードできます。
![Update notification](/blender/updates.webp)

## 問題の報告

何か問題が発生した場合は、喜んでお手伝いします！迅速なサポートのために、[私たちのフォーラム](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)にご参加ください。

また、Blender のログも確認してください。Needle Engine Addon に特化したログは、Blender の `Help/Needle` から見つけることができます。

### 統合されたバグ報告機能
![Needle Blender Bug Reporter panel](/blender/bugreporter.webp)
Blender から直接、バグレポートを自動的に作成およびアップロードすることもできます。アップロードされたバグレポートはデバッグのみに使用されます。バックエンドで暗号化され、30 日後に削除されます。

必要に応じて、特定のケースでは、プロジェクトに対してカスタム NDA を設定することも可能です。詳細についてはお問い合わせください。

:::tip バグ報告機能の使用には Web プロジェクトが必要です
バグレポートを送信する前に Web プロジェクトを設定していることを確認してください。これにより、システムとセットアップについてより理解し、問題を再現しやすくなります。
:::

# 次のステップ

- [コンセプト: Web プロジェクト](../project-structure.md)
- [コンセプト: アセットのエクスポート](../export.md)
- [コンセプト: デプロイメント (Web サイトの共有)](../deployment.md)
- [コンポーネント: Everywhere Actions について学ぶ](../everywhere-actions.md)
- [初心者向けスクリプト: Typescript の基本](../getting-started/typescript-essentials.md)
- [初心者向けスクリプト: カスタムコンポーネントの書き方](../scripting.md)


このページはAIによって自動翻訳されました。