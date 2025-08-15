---
title: MaterialX
---

## Needle EngineにおけるMaterialX

MaterialXは、レンダリングエンジンに依存せず、グラフベースでマテリアルやシェーダーを記述するための強力な標準です。複数のサーフェスレイヤーや現実的なライティングを持つ複雑なマテリアルを定義できます。

映画、VFX、eコマースの分野で広く使用されており、Autodesk Mayaや3ds Max、Houdini、V-Ray、Omniverseなどの多くのプロのオーサリングツールでサポートされています。

::: tip 詳細はこちら
MaterialXの詳細については、[MaterialXウェブサイト](https://www.materialx.org/)をご覧ください。
:::

Unityの[**Shader Graph**](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.3/manual/index.html)で作成されたマテリアルは、当社のUnity統合パッケージの一部である**Needle MaterialX Exporter**を介してMaterialXファイルに自動的にエクスポートできます。

これにより、Unityで複雑なライティングされたマテリアルを作成し、それらがシーンと一緒に自動的にエクスポートされます。MaterialXエクスポートは、WebGL2シェーダーの使用により可搬性が低い既存のUnlitシェーダーのエクスポートを拡張します。MaterialXを使用すると、WebGPUや将来のレンダリング技術に対応でき、ウェブプロジェクトで高精度のマテリアルを実現できます。

Needle EngineのMaterialXサポートは、公式の[MaterialX JavaScriptライブラリ](https://github.com/materialx/MaterialX)を使用しており、これによりマテリアルは可能な限り最高の忠実度で表現されます。これにより、任意のMaterialXファイルを使用できます。

::: info Shader GraphからMaterialXへの変換には、**Pro**、**Edu**、または**Enterprise**プランが必要です。
MaterialX Exporterは、Pro、Edu、およびEnterpriseプランのユーザーにご利用いただけます。
[プランと価格を見る。](https://needle.tools/pricing)
:::

## ユースケース

MaterialXは、次のような場合に最適です。
- 芸術的なコントロールと柔軟性のために、プロジェクトで**グラフベースのマテリアル**を使用している場合。
- プロシージャルテクスチャ、ディテールマップ、レイヤー化されたマテリアルなど、**豊富で複雑なサーフェス機能**が必要な場合。
- スタジオパイプライン全体で保持したい**既存のMaterialXマテリアル**がある場合。
- 異なるレンダリングエンジン間でレンダリングの**一貫性と互換性**を確保したい場合。

## プロジェクトでMaterialXサポートを有効にする

Needle EngineプロジェクトでMaterialXサポートを有効にするには、`@needle-tools/materialx`パッケージをプロジェクトに追加する必要があります。

::: tabs

@tab Unity

1. シーンでNeedle Engineコンポーネントを選択します。

2. Inspectorで「NpmDef Dependencies」セクションを見つけ、「Size」の数値を増やして（例：0から1へ）新しい依存関係を追加します。

3. Object Pickerシンボルをクリックし、目のシンボルでパッケージの可視性を有効にし、リストから`Needle MaterialX`パッケージを選択します。

   ![UnityでMaterialXパッケージの依存関係を見つけて追加する。](/materialx/add-materialx-package-dependency.jpeg)
   _UnityでMaterialXパッケージの依存関係を見つけて追加する。_

これで、ウェブプロジェクトでMaterialXを使用する準備が整いました。

@tab その他のNeedle統合

1. ウェブプロジェクトをコードエディター（例：VS Code）で探し、開きます。
   [ウェブプロジェクトを開く方法を学ぶ。](./project-structure.html#opening-the-web-project-in-a-code-editor)
2. ウェブプロジェクトでNPMレジストリからNeedle MaterialXパッケージをインストールします。

   ```bash
   npm install @needle-tools/materialx
   ```

   これにより、MaterialXパッケージがプロジェクトに追加されます。

3. 当社のViteベースのテンプレートを使用している場合、他に何もする必要はありません。MaterialXパッケージはプロジェクトに自動的に含まれます。

    ::: tip 不明な場合は、おそらく当社のViteベースのテンプレートのいずれかを使用しています。
    :::

4. Needle Viteプラグインを使用していない場合は、MaterialXをメインのエントリファイル（例:`main.ts`）でインポートして登録します。

   ```ts
   import { useNeedleMaterialX } from "@needle-tools/materialx";
   useNeedleMaterialX();
   ```

これで、ウェブプロジェクトでMaterialXを使用する準備が整いました。

@tab three.js

Needle Engineを使用していないthree.jsプロジェクトでも、当社のMaterialXパッケージを使用できます。

1. `GLTFLoader`に当社の`MaterialX`プラグインを登録します。

    ```ts
    import { useNeedleMaterialX } from "@needle-tools/materialx";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

    const gltfLoader = new GLTFLoader();
    
    // ... register other plugins such as DRACOLoader, KTX2Loader, etc.
    useNeedleMaterialX(gltfLoader);

    // ... load a file that contains MaterialX materials
    gltfLoader.load("https://cloud.needle.tools/-/assets/Z23hmXB2qfHiF-2qfHiF/file", (gltf) => {
        scene.add(gltf.scene);
    });
    ```

2. `NEEDLE_materials_mtlx`拡張子を含むGLBファイルをロードします。プラグインは、それらを使用しているオブジェクトにMaterialXマテリアルを自動的にロードして適用します。

3. `useNeedleMaterialX(gltfLoader, { preload: true })`を呼び出すことで、MaterialX WebAssemblyモジュールのプリロードを有効にできます。これにより、MaterialX WebAssemblyモジュールが事前にロードされ、MaterialXマテリアルを含むGLBファイルをロードする準備が整います。

three.jsプロジェクトでMaterialXを使用する方法の完全な例は、StackBlitzで確認できます: [MaterialX in three.js](https://stackblitz.com/edit/needle-materialx-example?file=main.js)。

:::
## MaterialXサポート付きマテリアルのエクスポート

1. UnityのShader Graphでマテリアルを作成します。

   ![Unityでの複雑なShader Graphの例。](/materialx/shadergraph-example.webp)
   _Unityでの複雑なShader Graphの例。_

2. シーンでShader Graphベースのマテリアルを持つオブジェクトを選択するか、Projectビューでシェーダーアセットを選択します。

3. Materialプロパティで、「Needle Engine – Custom Shader Settings」セクションを見つけ、「Shader Export Type」として「MaterialX」を選択します。

    ![Shader GraphマテリアルプロパティでMaterialXエクスポートタイプを有効にする。](/materialx/enable-asset-label-from-material.jpeg)
    _Shader GraphマテリアルプロパティでMaterialXエクスポートタイプを有効にする。_

3. シーンをエクスポートすると、「MaterialX」エクスポートタイプを使用するすべてのシェーダーのマテリアルが、3Dコンテンツとともに埋め込まれ、ランタイムでロードされます。

## 外部で作成されたMaterialXファイルの使用

Needle MaterialXパッケージには、MaterialXファイルを直接ロードするための実験的なサポートが含まれています。テクスチャはコールバック関数を介して解決でき、マテリアルはthree.js `ShaderMaterial`として返されます。

Needle MaterialXパッケージの操作例は、[StackBlitzのMaterialXコレクション](
https://stackblitz.com/@marwie/collections/materialx)で確認できます。

:::: tabs
@tab コードから

```ts
import { TextureLoader } from 'three';
import { Experimental_API } from '@needle-tools/materialx';

// Load a MaterialX file and its referenced textures from a URL
function load(mtlx_url) {
    const parts = mtlx_url.split('/');
    parts.pop();
    const dir = parts.join('/');

    return fetch(mtlx_url)
    .then((res) => res.text())
    .then((mtlx) => {
        const loader = new TextureLoader();
        Experimental_API.createMaterialXMaterial(mtlx, '', {
            getTexture: async (url) => {
                return await loader.loadAsync(dir + url);
            },
        }).then((mat) => {
            console.log("MaterialX material has been loaded:", mat);
        });
    });
}
```

::: info
`Experimental_API.createMaterialXMaterial()`メソッドは現在、複数のマテリアルのロード、または追加の.mtlx参照を持つMaterialXファイルのロードをサポートしていません。
:::

::::

## サポートされるノードと機能

Needle Engineは、MaterialXの完全な仕様をサポートしており、OpenPBR、Standard Surface、UsdPreviewSurface、Unlit Surfaceノード、およびフレネル効果のようなNPR（非写実的レンダリング）ノードも含まれます。ネストされたノードグラフ定義とカスタムノードもサポートされています。

Needle EngineのMaterialXマテリアルは、以下の機能をサポートしています。
- **Image-Based Lighting** (IBL)：シーンの環境マップから自動的に供給される
- **Reflection Probes**：MaterialXマテリアルを使用するオブジェクトに影響を与える
- **Light sources**：指向性、点、スポットライト。現在のシーンあたりのライトは8個までという制限がある
- **Texture compression and progressive textures**：テクスチャ圧縮とプログレッシブテクスチャ。MaterialXマテリアルは、Needle Engineの強力なテクスチャ圧縮とプログレッシブローディング機能を完全にサポートしており、大きなテクスチャを使用できます。これらは、必要なときにのみ、現在のビューに必要な解像度でのみロードされます。
- **Animated material properties**：色、浮動小数点、ベクトルに対するアニメーション化されたマテリアルプロパティ。Needle Engineの他のマテリアルと同様に、任意の数値マテリアルプロパティをアニメーション化できます。
- すべてのMaterialXサーフェスモデル。**OpenPBR**、**Standard Surface**、**UsdPreviewSurface**、**Unlit Surface**を含む。

Needle MaterialX Exporterは、UnityのShader Graphのグラフベースの構造をエクスポートに利用し、Shader GraphノードをMaterialXのnodedefsとnodegraphsに変換します。以下の機能をサポートしています。
- **Material properties**：色、浮動小数点、ベクトル、テクスチャなどのマテリアルプロパティ
- **Operations**：数値、ベクトル、行列に対する演算
- **Blend nodes**：Mix、Add、Multiply、および様々なブレンドモードを持つBlendノード
- **Textures**：テクスチャとカラースペース
- **Subgraphs**：1つ以上のネストレベルを持つサブグラフ
- **Vertex colors**：頂点色がサポートされています
- **Multiple UV channels**：複数のUVチャンネルがサポートされています（最大4つ）
- **Shader Keywords**：シェーダーキーワードがサポートされており、MaterialXではスイッチノードとしてエクスポートされます。

## サポートされるMaterialXバージョン

Needle Engineは現在、MaterialXバージョン1.39.4をサポートしています。以前のバージョンのMaterialXドキュメントもサポートされており、最新バージョンに自動的にアップグレードされます。

## MaterialX Exporterの制限事項

Shader Graphがサポートするすべての機能がMaterialXでもサポートされているわけではありません。サポートされていないノードをエクスポートしようとすると、エクスポーターはエラーをログに記録し、エクスポートプロセスを停止します。その場合、可能であればサポートされているノードに置き換えることで問題を修正できます。

- **Vertex displacement is not yet supported**：頂点ディスプレイスメントはまだサポートされていません。MaterialXはディスプレイスメントマッピングをサポートしていますが、Needle Engineは現在サポートしていません。これは、MaterialXファイル内のディスプレイスメントノードがすべて無視されることを意味します。
- **Realtime shadows**：リアルタイムシャドウ。シーン内の光源はMaterialXマテリアルに影響を与えますが、リアルタイムシャドウは現在サポートされていません。
- **Baked Lightmaps**：ベイクドライトマップは現在、MaterialXマテリアルではサポートされていません。
- **Tangent space**：Tangent spaceは現在サポートされていません。これは、「Tangent」を空間として指定するShader Graphノードが異なる外観になることを意味します。
- **Code Nodes**：Code Nodesは現在サポートされていません。

::: tip 特別な「MATERIALX」シェーダーキーワード
サポートされていないノードを含む複雑なシェーダーがある場合、「MATERIALX」キーワードを使用してそれらのエクスポートを防ぐことができます。キーワードスイッチの「On」パスはエクスポートされ、「Off」パスはエクスポート時に無視されます。これにより、カスタムノードやサポートされていない機能を持つシェーダーを機能させつつ、MaterialXにエクスポートすることができます。
:::

::: info three.jsの組み込みMaterialXサポート
three.jsにはMaterialXの初期サポートがありますが、標準の多くの機能をサポートしないカスタム実装を使用しているため、マテリアル表現の精度が低くなります。Needle Engineは公式のMaterialX JavaScriptライブラリを使用しており、これによりマテリアルは可能な限り最高の忠実度で表現されます。

Needleは、three.jsの組み込みMaterialXサポートに貢献しており、いずれは両方のオプションを提供するか、three.jsの実装がより包括的になった時点でそれに切り替えることができるようにしています。
:::

---
このページはAIによって自動的に翻訳されました