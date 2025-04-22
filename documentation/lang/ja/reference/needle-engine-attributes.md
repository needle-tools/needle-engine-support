---
title: <needle-engine> 設定
---

`<needle-engine>` ウェブコンポーネントには、組み込み属性の優れたコレクションが付属しており、three.js シーンを直接追加または編集することなく、ロードされたシーンの見た目と操作感を変更するために使用できます。
以下の表は、最も重要な属性のリストを示しています。

| 属性 | 説明 |
| --- | --- |
| **ローディング** | |
| `src` | 1つ以上の glTF または glb ファイルへのパス。<br/>サポートされているタイプは `string`、`string[]`、または文字列化された配列 (`,` 区切り) です |
| `dracoDecoderPath` | Draco デコーダーへの URL |
| `dracoDecoderType` | Draco デコーダーのタイプ。オプションは `wasm` または `js` です。[three.js ドキュメント](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) を参照してください |
| `ktx2DecoderPath` | KTX2 デコーダーへの URL |
| **レンダリング** | |
| `background-color` | オプション。背景色として使用する16進数カラー。例: `rgb(255, 200, 100)`、`#dddd00` |
| `background-image` | オプション。スカイボックス画像 (背景画像) またはプリセット文字列への URL: `studio`、`blurred-skybox`、`quicklook`、`quicklook-ar` |
| `background-blurriness` | オプション。`background-image` のぼかし度を0 (ぼかしなし) から1 (最大のぼかし) の間の値で指定。例: `background-blurriness="0.5"` |
| `environment-image` | オプション。環境画像 (環境ライト) またはプリセット文字列への URL: `studio`、`blurred-skybox`、`quicklook`、`quicklook-ar` |
| `contactshadows` | オプション。コンタクトシャドウをレンダリングします |
| `tone-mapping` | オプション。サポートされている値は `none`、`linear`、`neutral`、`agx` です |
| `tone-mapping-exposure` | オプションの数値。例: `tone-mapping-exposure="1.5"` で露出を上げます。`tone-mapping` が設定されている必要があります |
| **インタラクション** | |
| `autoplay` | アニメーションを自動再生するために追加または `true` に設定します。例: `<needle-engine autoplay` |
| `camera-controls` | シーン内にカメラコントロールが見つからない場合、OrbitControls を自動的に追加するために追加または `true` に設定します |
| `auto-rotate` | 自動回転を有効にするために追加します (`camera-controls` と一緒に使用した場合のみ) |
| **イベント** | |
| `loadstart` | ローディングが開始されたときに呼び出す関数の名前。引数は `(ctx:Context, evt:Event)` であることに注意してください。デフォルトのローディングオーバーレイを隠すために `evt.preventDefault()` を呼び出すことができます |
| `progress` | ローディングが更新されたときに呼び出す関数の名前。`onProgress(ctx:Context, evt: {detail: {context:Context, name:string, index:number, count:number, totalProgress01:number}) { ... }` |
| `loadfinished` | ローディングが完了したときに呼び出す関数の名前 |
| **ローディング表示** | *Needle Engine のローディング表示の外観を変更するために利用可能なオプションです。簡単に編集するには `?debugloadingrendering` を使用してください* |
| `loading-style` | オプションは `light` または `dark` です |
| `loading-background-color` | **PRO** — ローディング背景色を変更します (例: `=#dd5500`) |
| `loading-text-color` | **PRO** — ローディングテキスト色を変更します |
| `loading-logo-src` | **PRO** — ローディングロゴ画像を変更します |
| `primary-color` | **PRO** — プライマリーローディング色を変更します |
| `secondary-color` | **PRO** — セカンダリーローディング色を変更します |
| `hide-loading-overlay` | **PRO** — ローディングオーバーレイを表示しません。Needle Engine > 3.17.1 に追加されました
| **内部** | |
| `hash` | 内部で使用されます。ロードされるファイルに付加され、更新を強制します (例: ブラウザが glb ファイルをキャッシュしている場合)。手動で編集しないでください。 |


# 例

```html
<!-- ロードするカスタム glb へのパスを設定する -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- Draco デコーダーの場所をオーバーライドする -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="path/to/draco/folder"></needle-engine>
```

環境画像の設定、アニメーションの再生、自動カメラコントロール。[stackblitz でライブを見る](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)
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

needle-engine コンテキストのローディングが完了したときにイベントを受け取る:
```html
<needle-engine loadfinished="onLoadFinished"> </needle-engine>
<script>
    function onLoadFinished() {
        console.log("Needle Engine has finished loading");
    }
</script>
```

### カスタムローディングスタイル (PRO)

`<needle-engine>` ウェブコンポーネントに適切な属性を設定することで、Needle Engine の外観を簡単に変更できます。詳細については、上記の表を参照してください。

![custom loading](/imgs/custom-loading-style.webp)
[github でコードを見る](https://github.com/needle-engine/vite-template/blob/loading-style/custom/index.html)

AIにより自動翻訳されました