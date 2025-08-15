---
title: <needle-engine> 設定
---

## Needle Engine Webコンポーネントの属性

Needle Engineは、ウェブコンポーネントとして利用可能です: `<needle-engine>`。このコンポーネントは、ウェブブラウザで3Dシーン、モデルなどをロードして表示するために使用できます。その動作、見た目、操作感を設定できる一連の属性が付属しています。これらの設定はすべてコードで上書きできますが、属性はHTMLで設定する便利な方法です。

::: tip ウェブコンポーネントは `index.html` にあります
UnityやBlenderを介して、あるいは直接コードでプロジェクトを作成する場合でも、`<needle-engine>` ウェブコンポーネントを使用し、調整することができます。通常、ウェブプロジェクトの `index.html` ファイルでこれを見つけることができます。
:::

以下の表に、利用可能な属性とその説明を示します。

| 属性 | 説明 |
| --- | --- |
| **ローディング** | |
| `src` | 1つまたは複数のglTFまたはglbファイルへのパス。<br/>サポートされている型は `string`、`string[]`、または文字列化された配列 (`,`区切り) です |
| `dracoDecoderPath` | DracoデコーダーへのURL。例: ローカルDracoデコーダーを使用するための`./include/draco/` |
| `dracoDecoderType` | Dracoデコーダーのタイプ。オプションは `wasm` または `js` です。[three.jsドキュメント](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig)を参照してください |
| `ktx2DecoderPath` | KTX2デコーダーへのURL。例: ローカルKTX2デコーダーを使用するための`./include/ktx2/` |
| **レンダリング** | |
| `background-color` | オプション。背景色として使用される16進数カラー。例: `rgb(255, 200, 100)`、`#dddd00` |
| `background-image` | オプション。スカイボックス画像 (背景画像) またはプリセット文字列へのURL: `studio`、`blurred-skybox`、`quicklook`、`quicklook-ar` |
| `background-blurriness` | オプション。`background-image`のぼかし度。0 (ぼかしなし) から1 (最大のぼかし) までの値。例: `background-blurriness="0.5"` |
| `environment-image` | オプション。環境画像 (環境光) またはプリセット文字列へのURL: `studio`、`blurred-skybox`、`quicklook`、`quicklook-ar` |
| `contactshadows` | オプション。コンタクトシャドウをレンダリングします |
| `tone-mapping` | オプション。サポートされている値は `none`、`linear`、`neutral`、`agx` です |
| `tone-mapping-exposure` | オプションの数値。例: `tone-mapping-exposure="1.5"`で露出を上げます。`tone-mapping`が設定されている必要があります |
| **インタラクション** | |
| `autoplay` | アニメーションを自動再生するために追加するか、`true`に設定します。例: `<needle-engine autoplay` |
| `camera-controls` | シーンにカメラコントロールが見つからない場合、OrbitControlsを自動的に追加するために追加するか、`true`に設定します |
| `auto-rotate` | 自動回転を有効にするために追加します (`camera-controls`と一緒に使用した場合のみ) |
| **イベント** | |
| `loadstart` | ローディングが開始されたときに呼び出す関数の名前。引数は `(ctx:Context, evt:Event)` であることに注意してください。デフォルトのローディングオーバーレイを隠すために `evt.preventDefault()` を呼び出すことができます |
| `progress` | ローディングが更新されたときに呼び出す関数の名前。`onProgress(ctx:Context, evt: {detail: {context:Context, name:string, index:number, count:number, totalProgress01:number}) { ... }` |
| `loadfinished` | ローディングが完了したときに呼び出す関数の名前 |
| **ローディング表示** | *Needle Engineのローディング表示の外観を変更するために利用可能なオプションです。簡単に編集するには `?debugloadingrendering` を使用してください* |
| `loading-background` | **PRO** — デフォルト: `transparent`。ローディング背景色を変更します (例: `#dd5500`) |
| `loading-logo-src` | **PRO** — ローディングロゴ画像を変更します (例: `https://yourdomain.com/logo.png`または`/logo.png`) |
| `hide-loading-overlay` | **PRO** — ローディングオーバーレイを表示しません |
| **内部** | |
| `hash` | 内部で使用され、ロードされるファイルに付加されて更新を強制します (例: ブラウザがglbファイルをキャッシュしている場合)。手動で編集しないでください。 |

**アップグレード通知**:
- Needle Engine 4.5.0で削除された属性: `loading-style`、`loading-background-color`、`loading-text-color`、`primary-color`、`secondary-color`

# 例

```html
<!-- ロードするカスタム glb へのパスを設定する -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- Draco デコーダーの場所をオーバーライドする -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="./include/draco/"></needle-engine>
```

環境画像の設定、アニメーションの再生、自動カメラコントロール。[stackblitzでライブを見る](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)
```html
<needle-engine
      camera-controls
      auto-rotate
      autoplay
      skybox-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      environment-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf"
      >
      </needle-engine>
```

needle-engineコンテキストのローディングが完了したときにイベントを受け取る:
```html
<needle-engine loadfinished="onLoadFinished"> </needle-engine>
<script>
    function onLoadFinished() {
        console.log("Needle Engine has finished loading");
    }
</script>
```

### カスタムローディングスタイル (PRO)

`<needle-engine>`ウェブコンポーネントに適切な属性を設定することで、Needle Engineの外観を簡単に変更できます。詳細については、上記の表を参照してください。

![custom loading](/imgs/custom-loading-style.webp)
[githubでコードを見る](https://github.com/needle-engine/vite-template/blob/loading-style/custom/index.html)

AIにより自動翻訳されました