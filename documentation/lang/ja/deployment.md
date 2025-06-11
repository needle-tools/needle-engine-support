---
title: デプロイと最適化
---

## デプロイとは？

デプロイとは、アプリケーションをウェブサイトで公開し、一般に利用可能にするプロセスです。Needle Engineは、**KTX2**、**Draco**、**Meshopt**などの最新の圧縮技術を使用することで、プロジェクトを可能な限り小さく高速にします。

## 利用可能なデプロイターゲット

-   [Needle Cloud](./cloud/#deploy-from-unity)
    空間Webアプリやアセット共有に最適です。
-   [Glitch](#deploy-to-glitch)
    サーバーサイドコードの実験やハッキングに最適です。

-   [Netlify](#deploy-to-netlify)
    独自のウェブサイトやカスタムドメイン名のホスティングに最適です。
-   [itch.io](#deploy-to-itch.io)
    ゲームによく使用されます。
-   [GitHub Pages](#deploy-to-github-pages)
    無料の静的ページホスティングです。
-   [Vercel](#deploy-to-vercel)
    フロントエンド開発者向けプラットフォーム
-   [FTP Upload](#deploy-to-ftp)
    FTPサポートのある任意のサーバーに直接デプロイします。FTPとSFTPの両方がサポートされています。
-   [Build to folder](#build-to-folder)
    フォルダにビルドする場合、ファイルを任意のWebサーバーまたは他のホスティングサービスにアップロードできます。
-   [Facebook Instant Games](#deploy-to-facebook-instant-games)
    FacebookおよびFacebook Messenger上のゲームプラットフォームです。

::: tip 何か足りないと感じたら？
[フォーラム](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)でお知らせください！
:::

## 開発ビルド

エディター内（例：UnityまたはBlender）からオプションにアクセスする方法については、上記のガイドを参照してください。

製品ビルドとの主な違いは、[ktx2](https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html)および[draco](https://google.github.io/draco/)圧縮（ファイルサイズと読み込み速度の削減のため）を行わないこと、および高品質テクスチャのプログレッシブ読み込みオプションがないことです。

通常、ファイルサイズと読み込み速度を最適化するために、製品ビルドを作成することをお勧めします（詳細は以下を参照）。

## 製品ビルド

製品ビルドを作成するには、[toktx](https://github.com/KhronosGroup/KTX-Software/releases)がインストールされている必要があります。これは、KTX2スーパー圧縮フォーマットを使用したテクスチャ圧縮を提供します。[toktxリリース](https://github.com/KhronosGroup/KTX-Software/releases)ページにアクセスし、最新バージョン（執筆時点ではv4.1.0）をダウンロードしてインストールしてください。インストール後にUnityを再起動する必要がある場合があります。
*toktxをインストールしており、それがPATHの一部であるにもかかわらず見つからない場合は、マシンを再起動してから再度ビルドを試みてください。*

:::details 高度な設定: カスタムglTF拡張機能
独自のカスタムglTF拡張機能を追加する予定がある場合、製品ビルドには``gltf-transform``でのそれらの処理が必要です。参考として[@needle-tools/gltf-build-pipeline](https://www.npmjs.com/package/@needle-tools/gltf-build-pipeline)を参照してください。
:::

### 最適化と圧縮オプション

### テクスチャ圧縮
製品ビルドでは、デフォルトで**KTX2**（プロジェクトでの使用方法に応じてETC1SまたはUASTC）を使用してテクスチャを圧縮しますが、**WebP**圧縮を選択し、品質レベルを選択することもできます。

#### ETC1S、UASTC、WebP圧縮のどれを選択すればよいですか？

| フォーマット                 | ETC1S   | UASTC     | WebP            |
|--------------------------|---------|-----------|-----------------|
| **GPUメモリ使用量**          | 低      | 低        | 高（非圧縮）       |
| **ファイルサイズ**             | 低      | 高        | 非常に低い         |
| **品質**                   | 中      | 非常に高い | 品質設定による       |
| **一般的な使用例**             | 全てに機能しますが、カラーテクスチャに最適 | 高詳細データテクスチャ：ノーマルマップ、ラフネス、メタリックなど | ETC1Sの品質が不十分だがUASTCが大きすぎるファイル |

UnityのNeedle Texture Importerを使用するか、BlenderのMaterialタブで、テクスチャごとにテクスチャ圧縮およびプログレッシブ読み込みオプションを選択できます。

:::details Unity: テクスチャごとの圧縮設定を行うには？
![image](/imgs/unity-texture-compression.jpg)
![image](/imgs/unity-texture-compression-options.jpg)
:::

:::details Blender: テクスチャごとの圧縮設定を行うには？
マテリアルタブを選択します。そのマテリアルで使用されているすべてのテクスチャの圧縮オプションが表示されます。
![Texture Compression options in Blender](/blender/texture-compression.webp)
:::

:::details Toktxが見つかりません
Windows: システム環境変数にtoktxを追加したことを確認してください。環境変数を更新するためにコンピューターを再起動する必要がある場合があります。デフォルトのインストール場所は``C:\Program Files\KTX-Software\bin``です。
![image](/imgs/ktx-env-variable.webp)
:::

### メッシュ圧縮

デフォルトでは、製品ビルドはDraco圧縮を使用してメッシュを圧縮します。エクスポートされたglTFごとにdracoとmesh-optを選択するには、`MeshCompression`コンポーネントを使用します。
さらに、メッシュインポート設定（Unity）で、製品ビルドのポリゴン数を減らすためのメッシュ単純化を設定できます。ブラウザでアプリケーションを表示するときは、URLに`?wireframe`を追加してメッシュをプレビューできます。

#### DracoとMeshoptのどちらを選択すればよいですか？
| フォーマット             | Draco | Meshopt |
|----------------------|-------|---------|
| **GPUメモリ使用量**      | 中    | 低      |
| **ファイルサイズ**         | 最低  | 低      |
| **アニメーション圧縮**   | いいえ | はい    |

:::details dracoおよびmeshopt圧縮設定を行うには？
MeshCompressionコンポーネントを追加して、エクスポートされたglTFごとにどの圧縮を適用するかを選択します。

![image](/imgs/unity-mesh-compression-component.jpg)
- **現在のシーン**の圧縮を変更するには、ルートシーンの任意の場所に追加します。
- **prefabまたはNestedGltf**の圧縮を変更するには、`GltfObject`または任意のコンポーネントが参照/エクスポートするprefabに追加します。
- **参照されたシーン**の圧縮を変更するには、エクスポートされる参照されたシーンに追加します。
:::

:::details 製品向けビルド時の頂点数削減のためのメッシュ単純化オプションを見つける場所は？
メッシュを選択し、Needleインポーターオプションを開くと、選択したメッシュに使用可能なオプションが表示されます。
![image](/imgs/unity-mesh-simplification.jpg)
:::

### プログレッシブテクスチャ

シーンの任意の場所に`Progressive Texture Settings`コンポーネントを追加して、プロジェクト内のすべてのテクスチャをプログレッシブに読み込むこともできます。現時点では、ライトマップやスカイボックステクスチャにはプログレッシブ読み込みは適用されません。

プログレッシブ読み込みでは、テクスチャは最初に低解像度バージョンで読み込まれます。フル品質バージョンは、テクスチャが表示可能になったときに動的に読み込まれます。これにより、通常、シーンの最初の読み込みが大幅に削減されます。

:::details プログレッシブテクスチャ読み込みを有効にするには？
### プログレッシブテクスチャはテクスチャごとに有効にできます
### またはプロジェクト内のすべてのテクスチャに対して有効にできます：
![image](/imgs/unity-texture-compression.jpg)
### 他の特定の設定がないプロジェクト内のすべてのテクスチャに対して有効にする：
![image](/imgs/unity-progressive-textures.jpg)
:::

### 自動メッシュLODs (Level of Detail)

Needle Engine 3.36以降、LODメッシュが自動的に生成され、ランタイムでそれらが切り替わります。LODはオンデマンドで、必要なときにのみ読み込まれるため、この機能は読み込み時間とパフォーマンスの両方を向上させます。

**主な利点**
- 初回読み込み時間の短縮
- 画面上の平均頂点数が少なくなるため、レンダリング時間の短縮
- LODメッシュを使用するため、レイキャスティングの高速化

`Progressive Loading Settings`コンポーネントでプロジェクト全体のLOD生成を無効にするか、Mesh Importer設定で無効にすることができます。

![image](/imgs/unity-lods-settings-1.jpg)

![image](/imgs/unity-lods-settings-2.jpg)

## デプロイオプション

### Glitchにデプロイ 🎏

[Glitch](https://glitch.com/)は、誰でも小さくて大きなウェブサイトをホストするための高速で無料の方法を提供します。私たちのスターターをベースにした新しいGlitchページへのリミックスとデプロイ、および必要に応じて同じGlitchページでミニマルなネットワークサーバーを実行する簡単な方法を提供しています。

`DeployToGlitch`コンポーネントをシーンに追加し、手順に従うことでglitchにデプロイできます。

Glitchでホストされる無料プロジェクトは、約100MBを超えることはできません。より大きなプロジェクトをアップロードする必要がある場合は、別のデプロイターゲットの使用を検討してください。

:::details UnityからGlitchにデプロイするには？

1) ``ExportInfo``コンポーネントも持つGameObjectに``DeployToGlitch``コンポーネントを追加します。

2) コンポーネントの``Create new Glitch Remix``ボタンをクリックします
![image](/deployment/deploytoglitch-1.jpg)
3) Glitchがテンプレートのリミックスを作成します。ブラウザからURLをコピーします
![image](https://user-images.githubusercontent.com/5083203/179834901-f28852a9-6b06-4d87-8b5b-0384768c92c1.png)
4) Unityを再度開き、``Deploy To Glitch``コンポーネントの``Project Name``フィールドにURLを貼り付けます
![image](https://user-images.githubusercontent.com/5083203/179835274-033e5e1d-b70d-4b13-95ad-f1e2f159b14e.png)
5) UnityがGlitchからデプロイキーを受け取るまで数秒待ちます（このキーはGlitchの``.env``ファイルに安全に保存されています。他の人と共有しないでください。このキーを持つすべての人がGlitchウェブサイトにアップロードできるようになります）
![waiting for the key](/deployment/deploytoglitch-2.jpg)
6) デプロイキーが受信されたら、`Build & Deploy`ボタンをクリックしてGlitchにアップロードできます。

:::

:::details BlenderからGlitchにデプロイするには？

![Deploy To Glitch from Blender component](/blender/deploy_to_glitch.webp)

1) SceneタブでDeploy To Glitchパネルを見つけます
2) コンポーネントの``Remix on glitch``ボタンをクリックします
3) ブラウザがglitchプロジェクトテンプレートを開きます
4) Glitchが新しいプロジェクトを生成するまで待ちます
5) GlitchプロジェクトのURLをプロジェクト名としてBlenderのDeployToGlitchパネルにコピー＆ペーストします（完全なURLをペーストしても、パネルが必要な情報を抽出します）
6) Glitchで``.env``ファイルを開き、**DEPLOY_KEY**の隣にある``Variable Value``フィールドにパスワードを入力します
7) Blenderの`Key`フィールドに同じパスワードを入力します
8) `DeployToGlitch`ボタンをクリックしてプロジェクトをビルドし、glitchにアップロードします。アップロードが完了するとブラウザが開きます。開いた後に画面が真っ暗な場合は、ページを更新してみてください。
:::

#### Glitchのトラブルシューティング

`Create new Glitch Remix`をクリックしてブラウザに`there was an error starting the editor`のようなエラーが表示された場合は、**OK**をクリックしてください。その後、[glitch.com](https://glitch.com/)に移動し、サインインしていることを確認してください。その後、UnityまたはBlenderで再度ボタンをクリックしてみてください。

### Netlifyにデプロイ
:::details UnityからNetlifyにデプロイするには？
シーンに`DeployToNetlify`コンポーネントを追加し、手順に従うだけです。ボタンをクリックするか、既存のプロジェクトにデプロイすることで新しいプロジェクトを作成できます。

![Deploy to netlify component](/deployment/deploytonetlify-2.jpg)

![Deploy to netlify component](/deployment/deploytonetlify.jpg)
:::

### Vercelにデプロイ

1) vercelで新しいプロジェクトを作成します
2) webプロジェクトをgithubリポジトリに追加します
3) リポジトリをvercelのプロジェクトに追加します

プロジェクト設定については、[サンプルプロジェクト](https://github.com/needle-engine/nextjs-sample)を参照してください。

### itch.ioにデプロイ

:::details Unityからitch.ioにデプロイするには？
1) [itch.io](https://itch.io/game/new)で新しいプロジェクトを作成します
2) ``Kind of project``を``HTML``に設定します
![image](https://user-images.githubusercontent.com/5083203/191211856-8a114480-bae7-4bd1-868e-2e955587acd7.png)
3) シーンに``DeployToItch``コンポーネントを追加し、``Build``ボタンをクリックします
![image](https://user-images.githubusercontent.com/5083203/193812540-1881837e-ed9e-49fc-9658-52e5a914299a.png)

4) ビルドが完了するまで待ちます。完了すると最終的なzipファイルが入ったフォルダが開きます。
5) itch.ioに最終的なzipファイルをアップロードします
![20220920-104629_Create_a_new_project_-_itch io_-_Google_Chrome-needle](https://user-images.githubusercontent.com/5083203/191212661-f626f0cb-bc8e-4738-ad2c-3982aca65f39.png)
6) ``This file will be played in the browser``を選択します
![image](https://user-images.githubusercontent.com/5083203/191212967-00b687f3-bf56-449e-880c-d8daf8a52247.png)
7) itchページを保存し、itchプロジェクトページを表示します。
Needle Engineプロジェクトが読み込まれるはずです😊

#### オプション設定
![image](https://user-images.githubusercontent.com/5083203/191217263-355d9b72-5431-4170-8eca-bfbbb39ae810.png)
:::

:::details Itch.io: index.htmlが見つかりませんでした

#### index.htmlが見つかりませんでした
![image](https://user-images.githubusercontent.com/5083203/191213162-2be63e46-2a65-4d41-a713-98c753ccb600.png)
プロジェクトをアップロードした後にこのエラーが表示される場合は、gzippedされたindex.htmlをアップロードしていないことを確認してください。
Needle webプロジェクトフォルダの``vite.config.js``でgzip圧縮を無効にできます。``viteCompression({ deleteOriginFile: true })``の行を削除するだけです。プロジェクトを再度ビルドし、itchにアップロードしてください。

:::

### FTPにデプロイ

:::details UnityからFTPサーバーにデプロイするには？
1) シーン内のGameObjectに``DeployToFTP``コンポーネント¹を追加します（ExportInfoと同じGameObjectに追加するのが良い習慣ですが、必須ではありません）
2) まだ行っていない場合は、FTPサーバーアセットを割り当てて、サーバー、ユーザー名、パスワードを入力します ²
*このアセットには、FTPサーバーへのアクセス情報が含まれています。これらは、ホスティングプロバイダーで新しいFTPアカウントを作成するときに入手します。*
3) ``DeployToFTP``コンポーネントの<kbd>Build & Deploy</kbd>ボタンをクリックしてプロジェクトをビルドし、FTPアカウントにアップロードします

![Deploy to FTP component in Unity](/deployment/deploytoftp.jpg)
*¹ Deploy to FTPコンポーネント*

![Deploy to FTP server asset](/deployment/deploytoftp2.jpg)
*² FTPユーザーアカウントのアクセス情報を含むFTPサーバーアセット*

![Deploy to FTP component in Unity with server asset assigned](/deployment/deploytoftp3.jpg)
*サーバーアセットが割り当てられた後のDeploy To FTPコンポーネント。pathフィールドを使用して、サーバー上のサブフォルダに直接デプロイできます。*
:::

:::details FTPサーバーに手動でデプロイするには？

1) `File > Build Settings`を開き、`Needle Engine`を選択して<kbd>Build</kbd>をクリックします
2) ビルドが完了するまで待ちます。ビルドと圧縮のすべてのステップが実行された後、結果の`dist`フォルダが自動的に開きます。
3) `dist`フォルダからFTPストレージにファイルをコピーします。

**以上です！** 😉

![20220830-003602_explorer-needle](https://user-images.githubusercontent.com/2693840/187311461-e6afb2d7-5761-48cf-bacb-1c1733bb768b.png)

> **注意**: アップロードしたときに結果が機能しない場合は、Webサーバーがgzippedファイルの提供をサポートしていない可能性があります。問題を修正するには2つのオプションがあります。
オプション1: htaccessファイルを使用してサーバーでgzip圧縮を有効にしてみてください！
オプション2: ファイル/ビルドウィンドウでgzip圧縮を無効にし、Needle Engineプラットフォームを選択します。

> **注意**: 圧縮中にエラーが発生する場合は、バグを報告してください！ローカルでプロジェクトは機能するが、製品ビルド時のみ失敗する場合は、開発ビルドを行うことで直ちに解決できます。そのためには、ビルド設定で`Development Build`をオンに切り替えるだけです。

![Unity build window showing Needle Engine platform](/deployment/buildoptions_gzip.jpg)

:::

#### .htaccessファイルを使用したgzipの有効化
FTPサーバーでgzip圧縮を有効にするには、アップロードしたいディレクトリ（または親ディレクトリ）に`.htaccess`という名前のファイルを作成します。
以下のコードを`.htaccess`ファイルに挿入し、保存/サーバーにアップロードします。
```
<IfModule mod_mime.c>
RemoveType .gz
AddEncoding gzip .gz
AddType application/javascript .js.gz
```

### Github Pagesにデプロイ
:::details UnityからGithub Pagesにデプロイするには？

シーンにDeployToGithubPagesコンポーネントを追加し、デプロイしたいgithubリポジトリ（またはgithub pagesのURL）をコピー＆ペーストします。
![Deploy To github pages component](/deployment/deploytogithubpages.jpg)

<video-embed src="https://www.youtube.com/watch?v=Vyk3cWB6u-c" />

:::

#### github pagesのトラブルシューティング
- **github pagesにデプロイしましたが、アクションが実行されません / ウェブサイトがライブになりません**
- 初めてデプロイした場合、ウェブサイトが利用可能になるまで数分かかることがあります。githubの**Actions**タブ（`/actions`）でデプロイプロセスを確認できます。
- 数分経ってもウェブサイトがライブにならない、またはgithubの**Actions**タブでワークフローの実行が見られない場合は、**Github Pages**設定ページ（`/settings/pages`）に移動し、**Branch**が*gh-pages*に設定されていることを確認してください。

### Facebook Instant Gamesにデプロイ

Needle Engineを使用すると、Facebook Instant Gamesに自動的にビルドできます。
Webアプリやゲームを手動で調整する必要はありません。

:::details UnityからFacebook Instant Gamesにデプロイするには？
- シーンに`Deploy To Facebook Instant Games`コンポーネントを追加します。
![Deploy to facebook instant games component](/deployment/deploytofacebookinstantgames.jpg)
- `Build For Instant Games`ボタンをクリックします
- ビルドが完了すると、facebookアプリにアップロードできるZIPファイルが生成されます。
- Facebookで`Instant Games`モジュールを追加し、`Instant Games/Web hosting`に移動します
![Hosting a facebook instant games](/deployment/deploytofacebookinstantgames-hosting.jpg)
- `Upload version`ボタン（1）を使用してzipをアップロードできます。アップロードが完了し、zipが処理されたら、`Stage for testing`ボタン（2、ここでは青いボタン）をクリックしてアプリをテストするか、`Push to production`（星アイコンのボタン）をクリックします
![Upload the zip to facebook instant games](/deployment/deploytofacebookinstantgames-upload.jpg)
- これで完了です。各バージョンの横にある`Play`ボタンをクリックして、facebookでゲームをテストできます。

:::

:::details FacebookにInstant Games機能を持つアプリを作成するには？

1) [新しいアプリを作成](https://developers.facebook.com/apps/creation/)し、`Other`を選択します。その後、`Next`をクリックします。
![Create facebook instant games app](/deployment/facebookinstantgames-1.jpg)

2) タイプとして`Instant Games`を選択します。
![Create facebook instant games app](/deployment/facebookinstantgames-2.jpg)

3) アプリ作成後、`Instant Games`製品を追加します。
![Add instant games product](/deployment/facebookinstantgames-3.jpg)

facebookの[公式インスタントゲームドキュメント](https://developers.facebook.com/docs/games/build/instant-games)はこちらで見つけることができます。
**注意**：必要なのは、インスタントゲーム機能を持つアプリを作成することだけです。
それ以外のすべては当社が対応し、Needle Engineウェブサイトの手動調整は必要ありません。
:::

## フォルダへのビルド

Unityで``File/Build Settings``を開き、オプションとして``Needle Engine``を選択します。

![image](/imgs/unity-build-window-menu.jpg)

![image](/imgs/unity-build-window.jpg)

任意のWebサーバーにアップロードするためのWebプロジェクトをビルドするには、Unity EditorのBuild Settingsウィンドウで**Build**をクリックします。``Development Build``チェックボックスを有効にすると、圧縮（以下を参照）を省略できます。圧縮には、toktxがマシンにインストールされている必要があります。

最終ビルドをローカルでプレビューするには、ウィンドウ下部にある`Preview Build`ボタンを使用します。このボタンはまず通常のビルドを実行し、その後最終ファイルを含むディレクトリでローカルサーバーを開始するため、これらのファイルをWebサーバーにアップロードしたときに得られるものを確認できます。

Nodejsは開発中に**のみ**必要です。配布されるウェブサイト（デフォルトのviteテンプレートを使用）はNodejsに依存しない静的ページであり、任意の通常のWebサーバーに配置できます。同じWebサーバーでミニマルなネットワークサーバーを実行したい場合（Glitchデプロイプロセスに自動的に含まれています）は、Nodejsが必要です。

---

## クロスプラットフォームデプロイワークフロー

通常のUnityプロジェクトを作成し、Needle Engineだけでなく、デスクトップやWebGLのような通常のUnityプラットフォームにもビルドすることが可能です。「コンポーネントマッピング」アプローチにより、Unity内のランタイムロジックは変更されません。必要であれば、定期的にPlay Modeを使用し、他のターゲットプラットフォームにビルドできます。場合によっては、これにより重複したコード（C#コードとそれに対応するTypeScriptロジック）が発生します。これによる余分な作業量は、プロジェクトによって異なります。

**UnityでPlay Modeに入る**
`Project Settings > Needle Engine`で、`Override Play Mode`と`Override Build settings`をオフにすることで、NeedleのビルドプロセスとUnityのビルドプロセスを切り替えることができます。
![image](https://user-images.githubusercontent.com/2693840/187308490-5acb9016-ffff-4113-be62-4de450a42b08.png)

## Unity用Needle Engineコマンドライン引数

Unity用Needle Engineは、単一のアセット（Prefabまたはシーン）をエクスポートするため、またはバッチモード（ウィンドウなし）でWebプロジェクト全体をビルドするための様々なコマンドライン引数をサポートしています。

以下に利用可能なオプションの表を示します。

| | |
| -- | -- |
| `-scene` | エクスポートするシーンまたはアセットへのパス 例：`Assets/path/to/myObject.prefab` または `Assets/path/to/myScene.unity` |
| `-outputPath <path/to/output.glb>` | ビルドの出力パスを設定します（シーンをビルドする場合のみ有効） |
| `-buildProduction` | 製品ビルドを実行します |
| `-buildDevelopment` | 開発ビルドを実行します |
| `-debug` | デバッグ用のコンソールウィンドウを開きます |


AIによって自動翻訳されたページ