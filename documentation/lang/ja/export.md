---
title: glTFへのアセットのエクスポート
---



# アセット、アニメーション、Prefab、マテリアル、ライトマップなどのエクスポート
Unityシーンに``ExportInfo``コンポーネントを追加すると、テンプレートから新しいWebプロジェクトを生成したり、エクスポートしたい既存のWebプロジェクトにリンクしたり、他のライブラリやパッケージへの依存関係を設定したり、プロジェクトをデプロイしたりできます。

デフォルトでは、シーンは保存時にエクスポートされます。この設定は、``ExportInfo``コンポーネントで``Auto Export``を無効にすることで変更できます。

## 📦 glTFファイルのエクスポート
メッシュ、マテリアル、アニメーション、テクスチャなどをエクスポートするには、Hierarchyで新しいGameObjectを作成し、それに``GltfObject``コンポーネントを追加します。これが新しいglTFファイルのルートになります。シーンを変更して保存するたびにエクスポートされます。

エクスポートされるのは、これらのルートオブジェクト上および内部のスクリプトとデータのみです。それらの外部にあるスクリプトとデータはエクスポートされません。


ルートオブジェクトの子としてCubeを追加し、シーンを保存します。出力の``assets/``フォルダ([プロジェクト構造](#vite-project-structure)を参照)に、ルートGameObjectと同じ名前の新しい``.glb``ファイルが含まれていることに注意してください。

``Smart Export``設定（`Edit/Project Settings/Needle`から）を有効にすると、このオブジェクトのHierarchyで変更が検出された場合にのみエクスポートが行われます。

:::details 特定のオブジェクトがエクスポートされないようにする方法
`EditorOnly`タグを持つオブジェクトは、その子Hierarchyを含めてエクスポート時に無視されます。
これは、無効化されたオブジェクトが後で有効になった場合でもエクスポートされるため、無効化よりも推奨されます。
:::

### 遅延読み込みと複数のレベル/シーン

アプリケーションを複数のレベルまたはシーンに分割したい場合は、単純に`SceneSwitcher`コンポーネントを使用できます。アプリケーションを複数のシーンまたはPrefabに構造化し、それらをSceneSwitcher配列に追加して実行時に読み込み/解放することができます。これは、すべてのコンテンツを最初に読み込むのを避け、読み込み時間を短く保つのに最適な方法です（例えば、[needle.tools](https://needle.tools?utm_source=needle_docs&utm_content=export_scenes)では、Webサイトの各セクションを独自のシーンに分離し、必要なときにのみ読み込むことでこれを行いました）。

### 推奨されるglTFごとの複雑さ

- 最大50 MB（非圧縮）のエクスポートサイズ（通常、圧縮後は約10-20 MBになります）
- 最大50万頂点（モバイルVRもターゲットとする場合はさらに少ない）
- 最大4x 2kライトマップ

シーンとPrefabを複数のglTFファイルに分割し、必要に応じて（必要なときにのみ）それらを読み込むことができます。これにより、読み込みパフォーマンスが速くなり、ファイルサイズが小さく保たれます。 [スクリプトドキュメントのAssetReferenceセクション](scripting.md#assetreference-and-addressables)を参照してください。

ここでのシーンの複雑さは、様々なWeb対応デバイスと帯域幅で良好なパフォーマンスを確保するために推奨されるものです。これには、デバイスの能力を超えた技術的な制限はありません。

### Prefab
Prefabは個別のglTFファイルとしてエクスポートされ、実行時にインスタンス化できます。PrefabをglTFとしてエクスポートするには、Prefabアセット（プロジェクトブラウザから、シーン内ではなく）を[スクリプトのいずれかから参照する](https://fwd.needle.tools/needle-engine/docs/addressables)だけです。

Prefabのエクスポートはネストにも対応しています。Prefab内のコンポーネントは別のPrefabを参照でき、それもエクスポートされます。
このメカニズムにより、シーンを可能な限り軽量にし、最も重要なコンテンツを最初に読み込み、追加コンテンツの読み込みを遅延させることができます。

### シーンアセット
Prefabアセットと同様に、他のシーンアセットを参照できます。
まず、``UnityEditor.SceneAsset``フィールドを持つコンポーネントをUnityで作成し、GltfObject内のGameObjectsのいずれかにそれを追加します。参照されたシーンは別のglTFファイルとしてエクスポートされ、TypeScriptから``AssetReference``として読み込み/デシリアライズできるようになります。

参照されたシーン内で作業を続けながら、メインのエクスポーターシーン/Webサイトを更新することも可能です。シーン保存時またはプレイモード変更時に、現在のシーンが現在実行中のサーバーで使用されているかどうかを検出し、そのglbのみの再エクスポートをトリガーします。(このチェックは名前で行われます - ``<web_project>/assets/``フォルダ内にglbが存在する場合、それは再度エクスポートされ、メインシーンがそれを再読み込みします。)

[当社のWebサイト](https://needle.tools?utm_source=needle_docs&utm_content=export_sceneassets)の例では、各セクションが別々のシーンとして設定されており、エクスポート時には複数のglbファイルにパックされ、必要に応じて読み込まれます。

![2022-08-22-172605_Needle_Website_-_Website_-_Windows,_Mac,_Linux_-_U](https://user-images.githubusercontent.com/5083203/185958983-71913c97-5eec-4cfd-99f5-76798582373e.png)

#### カスタムスクリプトからのPrefabまたはシーンの読み込み
スクリプトの1つからPrefabを参照して読み込みたい場合は、`AssetReference`型を宣言できます。
最小限の例を以下に示します。

@[code ts twoslash](@code/component-prefab.ts)

## 🏇 アニメーションのエクスポート
Needle Engineは、Unityのアニメーション機能のかなり強力なサブセットをサポートしています：

- **Timeline** アクティベーショントラック、アニメーショントラック、トラックオフセットを含む
- **Animator** トップレベルの状態遷移を含む
  - Blend treesは現在サポートされていません。
  - サブステートマシンは現在サポートされていません。
- **AnimationClips** ループモードを含む
- **Procedural Animations** スクリプトを介して作成できます

Needle Engineは、新しい[glTF拡張機能KHR_ANIMATION_POINTER](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer)をサポートする最初期のものの1つです。
これは、スクリプト変数を含むほぼすべてのプロパティがアニメーション可能であることを意味します。

現在の1つの制限は、エクスポート時にマテリアルが複製されないことです。例えば、同じマテリアルを異なる色でアニメーションさせたい場合は、現在マテリアルを2つに分割する必要があります。

## 🌍 Skyboxのエクスポート
UnityのSkyboxとカスタムのリフレクション（もしあれば）は、エクスポート時にテクスチャにベイクされ、``NEEDLE_lightmaps``拡張機能内に自動的にエクスポートされます。

Skyboxの解像度を変更するには、シーンに``SkyboxExportSettings``コンポーネントを追加します。

![image](https://user-images.githubusercontent.com/5083203/196030839-170a9496-9ed9-4ebc-bc1d-2df6c746f8c8.png)


glbファイルでSkyboxを全くエクスポートしたくない場合は、``GltfObject``コンポーネントの``Embed Skybox``オプションのチェックを外すことができます。

![image](https://user-images.githubusercontent.com/5083203/196030825-8a05037f-5acc-4795-9128-2bdacedd0d49.png)

## ✨ マテリアルのエクスポート

### Physically Based Materials (PBR)
デフォルトでは、マテリアルはエクスポート時にglTFマテリアルに変換されます。glTFは物理ベースのマテリアルモデルをサポートしており、複雑なマテリアルを表現するのに役立つ多くの拡張機能を持っています。

エクスポートされるものを完全に制御するには、UnityGltfが提供するglTFマテリアルを使用することを強く推奨します。
- UnityGLTF/PBRGraph
- UnityGLTF/UnlitGraph

::: tip 迷ったらPBRGraphシェーダーを使用してください。
PBRGraphマテリアルには、Unityが提供する「Standard」または「Lit」シェーダーよりもはるかに多くの機能があります。これらの機能には、クリアコート、光沢、虹彩などのサーフェスエフェクト、および透過、屈折、分散などのボリュームエフェクトが含まれます。
:::

そのまま変換可能な他のシェーダー：
- Universal Render Pipeline/Lit
- Universal Render Pipeline/Unlit
- Standard (Built-in Render Pipeline)
- Autodesk Interactive (Built-in Render Pipeline)
- Unlit (Built-in Render Pipeline)

他のマテリアルは、プロパティ名ヒューリスティクスを使用して変換されます。これは、マテリアルとシェーダーが使用するプロパティ名に応じて、カスタムシェーダーのプロパティをUniversal Render Pipeline/LitまたはPBRGraphのプロパティ名を使用するようにリファクタリングするか、マテリアルを[カスタムシェーダー](#custom-shaders)としてエクスポートする必要がある場合があることを意味します。

### カスタムシェーダー
カスタムのUnlitシェーダー（例えばShaderGraphで作られたもの）をエクスポートするには、エクスポートしたいシェーダーに``ExportShader`` Asset Labelを追加します。Asset LabelはInspectorウィンドウの下部で確認できます。

![2022-08-22-172029_Needle_Website_-_CustomShaders_-_Windows,_Mac,_Lin](https://user-images.githubusercontent.com/5083203/185957781-9fae18c5-09ff-490f-8958-57e138aa0003.png)

#### 制限
- 現在、カスタムの**Unlit**シェーダーのみをサポートしています。Litシェーダーの変換は公式にはサポートされていません。
- カスタムLitシェーダーは現在実験的です。すべてのレンダリングモードがサポートされているわけではありません。
- カスタムシェーダーでのシャドウレシービングはサポートされていません。
- カスタムシェーダーを使用したスキニングメッシュはサポートされていません。
- Unityからthree.jsおよびglTFに移行する際に複数の座標系の変更があるため、高度なエフェクトを機能させるにはいくつかの変更が必要になる場合があります。エクスポート時にデータを変換しようとしますが、変換が必要なすべてのケースを検出できない場合があります。
  - UnityのUV座標は左下から始まります。glTFでは左上から始まります。
  - glTFでは、X軸の値がUnityと比較して反転します。これは左手系から右手系への座標系変更の一種です。シェーダーで使用されるデータは、正しく表示するためにXで反転する必要がある場合があります。

::: note glTF仕様の一部ではありません
**カスタムシェーダー**はglTF仕様の公式な一部ではないことに注意してください。カスタムシェーダーの当社の実装では、KHR_techniques_webglと呼ばれる拡張機能を使用しており、WebGLシェーダーコードをglTFファイルに直接保存します。結果として得られるアセットはNeedle Engineベースのビューアでは機能します。
:::

## 💡 ライトマップのエクスポート
![2022-08-22-171650_Needle_-_Google_Chrome](https://user-images.githubusercontent.com/5083203/185957005-d04c9530-07eb-40f5-b305-9822d13b79ab.png)


ライトマップをエクスポートするには、Unityで[ライトマップを生成する](https://docs.unity3d.com/Manual/Lightmapping.html)だけです。ライトマップは自動的にエクスポートされます。

複数のシーンで作業する場合は、「Auto Generate」を無効にして、ライトマップを明示的にベイクしてください。そうしないと、Unityはシーン変更時に一時的なライトマップを破棄します。

### 推奨ライトマップ設定
- Lightmap Encoding: Normal Quality (Project Settings > Playerで調整)
- Progressive GPU (高速で、通常は小規模シーンで十分な精度)
- Non-Directional Lightmaps
- Max Lightmap Size 2k (これより高くすることも可能ですが、ファイルサイズが大きくなることを想定してください)
- シーンあたり最大4x 2kライトマップ (これより高くすることも可能ですが、ファイルサイズが大きくなることを想定してください)
- Compress Lightmaps OFF (品質が向上します。そうしないと、エクスポート時に再び圧縮されます)

![2022-08-22-171356_Needle_Website_-_Lightmaps_-_Windows,_Mac,_Linux_-](https://user-images.githubusercontent.com/5083203/185956392-f4031f45-ad13-4e6d-a14c-c8ec5c1fcfd4.png)

### ベイクされたオブジェクトと非ベイクされたオブジェクトの混在

Unityがライトと環境を処理する方法と、three.jsがそれを処理する方法の間には、100%のマッピングはありません。例えば、Unityではライトマップされたオブジェクトと非ライトマップされたオブジェクトでコードパスが完全に分かれており（ライトマップされたオブジェクトはすでにマップにベイクされているため、環境光を受け取りません）、three.jsはそのように区別しません。

これは、シーンでベイクされたオブジェクトと非ベイクされたオブジェクトを混在させる場合に、最良の結果を得るために特定の推奨設定があることを意味します。
```
Environment Lighting: Skybox
Ambient Intensity: 1
Ambient Color: black
```

**2021.3+**
![20220826-175324-SqBL-Unity_pMXa-needle](https://user-images.githubusercontent.com/2693840/186947184-2446672f-420c-47e8-8f7d-970a7d52bf35.png)

**2020.3+**
![20220826-175514-tnGc-Unity_mycs-needle](https://user-images.githubusercontent.com/2693840/186947203-2d7d96c3-f566-44b4-889c-4103fac505d4.png)

シーンにベイクされたオブジェクトがない場合、以下の設定でも正しい結果が得られるはずです。
```
Environment Lighting: Color
Ambient Color: any
```

---
このページはAIによって自動翻訳されました