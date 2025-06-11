<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle ロゴ" alt="Needle ロゴ"/> +
    <img src="/imgs/logo-webcomponents.png" style="max-height:70px;" title="Web Components ロゴ" alt="Web Components ロゴ"/> +
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="three.js ロゴ" alt="three.js ロゴ"/>
</div>

# Web ComponentとしてのNeedle Engine

Needle Engineは、数行のコードでリッチでインタラクティブな3DシーンをHTMLに直接表示できる使いやすいWeb Componentを提供します。これは、私たちの統合を支えているのと同じWeb Componentです。

Web Componentの設定オプションだけでは物足りなくなった場合は、カスタムスクリプトやコンポーネント、そして完全なプログラムによるシーングラフアクセスで拡張できます。

:::tip 統合を活用しましょう！
複雑な3Dシーンや迅速な反復開発には、いずれかの統合を使用してNeedle Engineを利用することをお勧めします。これらは、ライブプレビュー、ホットリロード、3D最適化を含む高度な制作ワークフローを提供します。
:::

### クイックスタート
::: code-tabs
@tab index.html
@[code html](@code/basic-webcomponent.html)

@tab 結果
```html
<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%;
    aspect-ratio: 16/9;
    outline: none;
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>
```
:::
[Stackblitzでこの例を開く](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)



## npmからインストール

統合を使用せずにNeedle Engineを直接扱うことができます。Needle Engineは、シーングラフおよびレンダリングライブラリとして[three.js](https://threejs.org/)を使用しているため、three.jsのすべての機能がNeedleでも利用可能です。

[\`npm\`](https://www.npmjs.com/package/@needle-tools/engine)からNeedle Engineをインストールするには、以下を実行します。
<br/>
`npm i @needle-tools/engine`

## CDNからneedle-engineをインストール

デフォルトのテンプレートは[vite](https://vitejs.dev)を使用していますが、Needle EngineはバニラJavascript（バンドラーを使用しない）でも直接使用できます。

完全に事前にバンドルされたNeedle Engineを、たった1行のコードでウェブサイトに追加できます。
これには、コアコンポーネント、物理演算、パーティクル、ネットワーク、XRなどが含まれます。どれを使うか迷ったらこれを使用してください！

```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine@4/dist/needle-engine.min.js">
</script>
```


多くの例は[StackBlitz](https://stackblitz.com/@marwie/collections/needle-engine)で見つけることができます。

## StackBlitzでの迅速なプロトタイピング

ちょっとした実験には、すぐに始められる新しいプロジェクトを作成するための便利なリンクを提供しています：[engine.needle.tools/new](https://engine.needle.tools/new)
豊富な例は、私たちの[Needle Engine Stackblitz Collection](https://stackblitz.com/@marwie/collections/needle-engine)でも利用可能です。

## VS Codeでのローカル開発

統合を使用せずにNeedle Engineを使いたい場合は、ウェブサイトのローカルサーバーを実行したいと思うでしょう。Visual Studio Codeを使ってそれを行う方法は以下の通りです。

1.  Visual Studio CodeでHTMLファイルのあるフォルダを開きます。
2.  [LiveServer拡張機能](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)をインストールします。
3.  Live Serverを起動します（VSCodeのフッターに「Go Live」ボタンがあります）。
4.  自動的に開かない場合は、Webブラウザで``http://localhost:5500/index.html``を開きます。

## three.jsとNeedle Engine

Needle Engineはシーングラフおよびレンダリングライブラリとして[three.js](https://threejs.org/)を使用しているため、three.jsのすべての機能がNeedleでも利用可能であり、コンポーネントスクリプトから使用できます。私たちはthree.jsのフォークを使用しており、特にWebXR、アニメーション、USDZエクスポートに関連する追加機能と改善が含まれています。


::: tip
``<needle-engine src="myScene.glb">`` のパスが既存のglbファイルを指しているか確認してください。または、[このサンプルglbをダウンロード](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb)して、index.htmlと同じフォルダに置き、``myScene.glb``という名前にするか、srcパスを更新してください。
:::

@[code](@code/basic-html.html)


[githubで表示](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla)

AIによる自動翻訳ページ