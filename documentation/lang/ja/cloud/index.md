---
title: Needle Cloud
description: 'Needle Cloudはオンラインサービスです。Web上で3Dアセットやアプリを保存、管理、共有するのに役立ちます。glTF、USD、FBX、VRMなど、さまざまなファイル形式がサポートされています。Needleで作成された空間Webアプリは、Unity統合から、またはコマンドライン（CLI）を介してクラウドに直接デプロイできます。'
---

<br/>
<discountbanner/>


# Needle Cloud

## 概要

Needle Cloudはオンラインサービスです。Web上で3Dアセットやアプリを保存、管理、共有するのに役立ちます。
glTF、USD、FBX、VRMなど、さまざまなファイル形式がサポートされています。Needleで作成された空間Webアプリは、[Unity統合](#deploy-from-unity)から、またはNeedle Cloudの[コマンドラインインターフェース](#deploy-from-the-cli)（CLI）を介して直接デプロイできます。

無料でアカウントを作成するには、[Needle Cloud](https://cloud.needle.tools)にアクセスしてください。

![Needle Cloud 概要](/cloud/cloud-overview-page.webp)

## 機能

1. **空間Webアプリのホスティング**  
   Needleで作成されたアプリは、エンジンの統合機能からクラウドに直接デプロイできます。これにより、独自のサーバーを設定することなく、チームや顧客にアプリへの公開アクセスを簡単に提供できます。必要に応じて、パスワードでアプリを保護することもできます。

2. **プライベートかつ安全な3Dアセット管理**  
   3Dファイルを簡単にアップロードして整理できます。高速なCDN（コンテンツ配信ネットワーク）のおかげで、ファイルは安全に保管され、世界中のどこからでも迅速にアクセスできます。
   Needle Cloudはマーケットプレイスでもソーシャルネットワークでもありません。代理店、スタジオ、クリエイターがアセットをプライベートかつ安全に管理できるように設計されています。

3. **多様な形式の3Dアセットの最適化**  
   ファイルを自動的に圧縮して、視覚的な品質を維持しながらサイズを削減します。これにより、ファイルの読み込みが速くなり、ユーザーデバイスの帯域幅とメモリを節約できます。

4. **共有とバージョン管理**  
   ファイルへのリンクは他のユーザーと共有したり、プロジェクトで直接使用したりできます。アセットやアプリの新しいバージョンをアップロードできます。個々のバージョンにはラベルを付けることができ、柔軟なレビューワークフローが可能になります。たとえば、バージョンを`main`または`experimental`としてラベル付けできます。必要に応じて、ラベルを以前のバージョンに戻すこともできます。

5. **CLIによる自動化およびパイプラインツール**  
   `needle-cloud` CLI（コマンドラインインターフェース）を使用すると、ファイルのアップロードと最適化を簡単に自動化できます。これは、既存のパイプラインにNeedle Cloudを統合する場合や、多数のファイルのアップロードを自動化する場合に役立ちます。

6. **ライセンス管理**  
   ソロクリエイターおよびチーム向けのNeedle Engineのライセンスは、Needle Cloudを通じて管理されます。これにより、許可されたユーザーのみがファイルとプロジェクトにアクセスできるようになります。エンタープライズおよびEduライセンスについてはお問い合わせください。


## Unityからのデプロイ

Needle CloudはUnity Editorに統合されています。これにより、Unityから直接Needle Cloudにアプリをデプロイできます。また、Needle CloudからUnityにアセットを直接アップロードおよびダウンロードすることもできます。

1. **Unity統合をインストールしてください（まだの場合）。**   
   詳細は[このページ](./../unity/)を参照してください。

2. **シーンに`Needle Engine`コンポーネント（旧ExportInfo）を追加します。**   
   このコンポーネントは、アプリのエクスポート設定を構成するために使用されます。  
   メニュー項目 `GameObject > Needle Engine > Add Export Info` を使用するか、メニュー項目 `File > New Scene` からNeedleテンプレートを使用して新しいシーンを作成できます。

3. **`Upload to Needle Cloud`をクリックします。**   
   これにより、アプリがビルドされ、Needle Cloudにアップロードされます。特定のチームとプロジェクトにデプロイすることも選択できます。ボタンの横に表示されるプロジェクトの_アップロード名_は、シーンに保存されます。今後のアップロードでは同じアップロード名が使用され、アップロードされたすべてのバージョンはNeedle Cloudウェブサイト上でグループ化されます。   
   
   ![Needle Cloud Unity統合](/cloud/cloud-deploy-v1.webp)

## CLIからのデプロイ

Needle Cloudは、アセットの管理とアプリケーションの効率的なデプロイを可能にするコマンドラインインターフェース（CLI）を提供します。CLIを使用すると、タスクを自動化し、Needle Cloudを既存のワークフローに統合できます。

CLIは[npm package](https://www.npmjs.com/package/needle-cloud)として提供されており、Node.jsがお使いのマシンにインストールされている必要があります。端末で以下のコマンドを実行することで、Node.jsがインストールされているか確認できます。

```bash
node -v
```
Node.jsがインストールされていない場合は、[Node.jsウェブサイト](https://nodejs.org/)からダウンロードできます。  

`needle-cloud` CLIパッケージをグローバルにインストールするか、`npx`を介して使用できます。これにより、グローバルにインストールすることなくCLIコマンドを実行できます。 


1. **npxコマンドを使用する（推奨）**
   ```bash
   npx needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```
2. **またはneedle-cloudをグローバルにインストールする**  
   グローバルにインストールすると、システムのどこからでもCLIを使用できます。CLIをグローバルにインストールするには、端末で以下のコマンドを実行します。 
   ```bash
   npm install -g needle-cloud
   ```
   これで、端末で`needle-cloud`コマンドを使用できます。

   ```bash
   needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```

### 自動デプロイ
**Github Actions**または**Stackblitz**からデプロイするには、`--token <access_token>`としてアクセストークンを提供できます。アクセストークンは、Needle Cloud上の[チームページ](https://cloud.needle.tools/team)で作成できます。`read/write`権限を持つトークンを作成してください。      

[Needle Cloud Github Action](https://github.com/marketplace/actions/deploy-to-needle-cloud)を使用して、Githubからアップデートをデプロイできます（例: リポジトリにプッシュするたびに）。

#### 例: Needle Cloud Github Action
```yml
      - name: Deploy to Needle Cloud
        uses: needle-tools/deploy-to-needle-cloud-action@v1
        id: deploy
        with:
            token: ${{ secrets.NEEDLE_CLOUD_TOKEN }}
            dir: ./dist
            name: vite-template # optional
```

#### 例: CLIコマンドを使用したデプロイ

```bash
# Deploy to Needle Cloud from e.g. a github action
npx needle-cloud deploy '/path/to/output' --team 'My team' --name 'some name or id' --token '<access_token>'
```

### CLIヘルプ
`help`を使用して、利用可能なすべてのコマンドラインオプションと個々のコマンドのヘルプを表示します。
```bash
# see all available options
npx needle-cloud help
# get help for a specific command e.g. deploy
npx needle-cloud help deploy
```


## デプロイURL

Needle Cloudにデプロイすると、各アップロードには一意のURLが付与されます。チームまたはクライアントと、_特定の_バージョンへのリンク、または_ラベル付けされた_バージョンへのリンクを共有できます。

-----

以下の例では、これまでに2回デプロイされたアプリがあります。各デプロイには特定のURLが付与されます。これは特定のバージョンに固定されているため、_固定された_URLとも呼ばれます。
1. [collaborativesandbox-zubcks1qdkhy<strong>-1qdkhy</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-1qdkhy.needle.run/)  
   これはアップロードされた最初のバージョンです。
2. [collaborativesandbox-zubcks1qdkhy<strong>-2e2spt</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-2e2spt.needle.run/)  
   これはアップロードされた2番目のバージョンです。

_latest_のデプロイは常に以下のURLで利用できます。このURLは常にアプリの最新バージョンを指しているため、チームと共有するのに役立ちます。このバージョンの別の一般的な名前は_dev_または_canary_です。
- [collaborativesandbox-zubcks1qdkhy<strong>-latest</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-latest.needle.run/)  
  このURLは、アプリの新しいバージョンをアップロードすると、新しいバージョンを自動的に表示します。

_main_のデプロイはクライアントと共有するのに役立ちます。これは常にプロモートしたアプリの最新バージョンを指しているためです。このバージョンの他の一般的な名前は、_production_、_stable_、または_live_です。
- [collaborativesandbox-zubcks1qdkhy.needle.run](https://collaborativesandbox-zubcks1qdkhy.needle.run/)  
  このURLは新しいバージョンをアップロードしても変更されません。新しいバージョンを_main_に明示的にプロモートした場合にのみ変更されます。

通常、新しいバージョンをアップロードし、レビューしてから、_main_にプロモートするかどうかを決定します。

-----

Needle Cloudウェブサイトには、latestバージョンとmainバージョンを含む、アプリのすべてのデプロイ済みバージョンが表示されます。<kbd>⋮</kbd>をクリックし、<kbd>Set main label</kbd>または<kbd>Remove main label</kbd>を選択することでラベルを移動できます。  

![Needle Cloud バージョンリスト](/cloud/cloud-edit-page.webp)

## サポートされている3D形式

1. **glTFとGLB** <a href="https://cloud.needle.tools/view?file=2oAMeWZ1hWL3C-latest-product" target="_blank">例</a>   
   glTF形式は、Web上の3Dで最も広くサポートされている形式です。3Dモデル、アニメーション、テクスチャを格納できる軽量な形式です。GLBファイルはglTFファイルのバイナリバージョンで、すべてのデータが単一のファイルに格納されます。
   glTFは、Draco、KTX2、Meshoptなどの高度な圧縮技術をサポートしており、これらはNeedle CloudとNeedle Engineによって完全にサポートされています。

2. **OpenUSD**   
   USDは、3Dデータ交換のための強力な形式です。映画およびVFX業界での使用で知られており、ゲーム業界でも人気が高まっています。Needle Cloudは、USD-WASMに関する当社の取り組みを通じてUSDZファイルとUSDファイルをネイティブにサポートし、さらに処理と最適化のためにUSDファイルをglTFに変換します。

3. **FBX**  
   FBXは長年3Dデータ交換で人気のある形式ですが、PBRマテリアルや拡張機能などの現代的な機能がいくつか不足しています。Needle Cloudは、さらなる処理と最適化のためにFBXファイルをglTFに変換します。  

4. **VRM**  
   VRMはヒューマノイドアバターの形式です。glTFに基づいており、glTF拡張機能の使用による追加の制約があります。Needle CloudはVRMファイルをネイティブにサポートし、フォニーム、トゥーンシェーディング、ダイナミックボーンなどの複雑なVRM拡張機能を含む、他のglTFファイルのように最適化できます。

5. **OBJ**  
   OBJは、3Dモデル用のシンプルなテキストベースの形式です。MTLファイルを介した基本的なマテリアル、アニメーション、オブジェクトの階層をサポートしています。Needle Cloudは、さらなる処理と最適化のためにOBJファイルをglTFに変換します。 

:::tip 可能な場合はglTFまたはUSDを使用する
glTFとUSDは、3Dデータ交換の主要な形式として推奨されます。これらは広くサポートされており、現代的な機能と優れたマテリアルモデルを備えています。
:::

## Cloudアセット

### アセットのアップロード

ファイルをウェブサイトにドラッグするか、コンピューターから選択することで簡単にアップロードできます。
glTF以外のファイルは、さらなる処理のために自動的にglTFに変換されますが、元のファイルはダウンロードおよびウェブ閲覧用に保持されます。 

### アセットのバージョン

アセットの編集ページにアクセスすると、これまでにあなたまたはあなたのチームによってアップロードされたすべてのバージョンを確認できます。バージョンを「main」または「experimental」としてタグ付けすることもできます。「Latest」は最新バージョンのデフォルトタグです。

### アセットへのリンク共有

特定のファイルまたはタグ付けされたファイルをチームまたはクライアントと共有するためのリンクを作成できます。タグ付きリンクは、タグを移動すると自動的に更新されるため、「main」リンクを一度共有しておけば、新しいリンクを送信することなくファイルを更新し続けることができます。

### Needle EngineでのCloudアセットの使用

Needle Cloudに保存されているファイルは、Needle Engineプロジェクトに簡単に直接取り込むことができます。`Needle Cloud Asset`コンポーネントは、アセットへのリンクを受け取り、ランタイムで読み込みます。これにより、プロジェクトのサイズを小さく保ち、クラウドで更新できるアセットをオンデマンドで読み込むことができます。 

::: tip 可能な場合はProgressive Loadingを使用する
Needle Cloudに保存されているアセットは、当社のProgressive Loadingテクノロジーを使用して、理想的なランタイム使用のために自動的に最適化されます。各メッシュおよびテクスチャに対して、複数のレベル・オブ・ディテールバージョンが生成され、アセットの必要な部分のみがランタイムで読み込まれます。

これにより、帯域幅とメモリを大幅に節約できます（アセット全体を読み込む場合と比較して通常90%以上）。
:::

### ウェブサイトへのCloud Viewerの埋め込み

独自のウェブサイトに3Dを組み込む簡単な方法は、Needle Cloud viewerを**埋め込む**ことです。 
これを行うには、アセットの編集ページに移動し、<kbd>Embed</kbd>をクリックします。次に、`iframe`コードスニペットをコピーして、ウェブサイトに貼り付けることができます。

::: tip 特定のバージョンの埋め込み
アセットへの直接リンク、または特定のタグを使用してビューアを埋め込むこともできます。これにより、ウェブサイト上の埋め込みコードを更新することなく、Needle Cloudでアセットを更新できます。 
:::

### 他のフレームワークへの埋め込み

以下の埋め込みオプションが利用可能です。
1. **Needle Cloud Viewer**  
   `iframe`コードスニペットを使用して、Needle Cloudビューアをウェブサイトに埋め込みます。

1. **Needle Engine**  
  提供されているコードスニペットを使用して、[web component](./../three/)としてNeedle Engineをウェブサイトに埋め込みます。

1. **model-viewer**  
  [model-viewer](https://modelviewer.dev)プロジェクトは、ブラウザでシンプルでインタラクティブでない3DモデルをレンダリングするためのWebコンポーネントを提供します。

1. **three.js**  
  three.jsに慣れている場合は、提供されているコードスニペットを、Needle Progressive Loadingをサポートし、Needle Cloudからファイルを効率的に読み込むthree.jsアプリの開始点として使用できます。

1. **React-Three-Fiber**  
  React-Three-Fiberを使用している場合は、提供されているコードスニペットを、Needle Progressive Loadingをサポートし、Needle Cloudからファイルを効率的に読み込むプロジェクトの開始点として使用できます。

1. **Unity**  
  Unityを使用している場合は、Needle Cloud Assetコンポーネントを使用してNeedle Cloudアセットをプロジェクトに直接統合することで、シームレスな読み込みと最適化が可能です。これはUnityビルドでのランタイムでもサポートされています。

### UnityまたはUnrealのような他のエンジンでのCloudアセットの使用

Needle Cloudに保存されているアセットを、UnityやUnrealなどの他のエンジンで使用する方法はいくつかあります。
1. **ダウンロードとインポート**  
   アセットをダウンロードしてプロジェクトにインポートできます。

2. **直接リンク**   
   プロジェクトでアセットへの直接リンクを使用できます。この方法では、Needle Cloudでアセットを更新すると、プロジェクトでも自動的に更新されます。使用するリンクは、エンジンとそのglTF機能によって異なります。
    - **Progressive Loadingを含むglTF**のサポート:   
      `Progressive-World`または`Progressive-Product`リンクを使用します。
      プログレッシブローディングとそのエンジンの有効化方法の詳細については、[npm:@needle-tools/gltf-progressive](https://www.npmjs.com/package/@needle-tools/gltf-progressive)を参照してください。

    - **DracoとKTX2を含むglTF**のサポート:
      `Optimized`リンクを使用します。
    - glTFはサポートしているが、**圧縮拡張機能なし**:  
      `Upload`（gltf/glbアップロード用）または`Converted`（その他のアップロード用）リンクを使用します。

3. **Needle Cloud Assetコンポーネント**   
   Needle Engineを使用している場合は、`Needle Cloud Asset`コンポーネントを使用してランタイムでアセットを読み込むことができます。プラットフォームに最適なリンクを自動的に選択し、Progressive Loadingを使用してアセットを読み込みます。これはUnityビルドでのランタイムでもサポートされています。

## アセット用CLI

Needle Cloudのコマンドラインインターフェース（CLI）を使用すると、ファイルのアップロードと圧縮を自動化できます。CLIはビルドステップの一部（アセットを最適化されたバージョンに置き換える）として、またはスタンドアロンツール（ファイルのバッチ処理用）として使用できます。

CLIとその使用方法の詳細については、[npm:needle-cloud](https://www.npmjs.com/package/needle-cloud)を参照してください。


## RBAC (role-based access control)

チームはメンバーで構成され、チームの各メンバーにはロールを割り当てることができます。これらのロールは、Needle Cloud内でチームが何を実行できるか、できないかを定義します。

プロジェクトが拡大し、チームメンバーが増えるにつれて、プロジェクトで作業するための適切な権限を確保するために、ロールを割り当てることができます。

| | |
| -- | -- |
| **Owner** | 最高レベルの権限。オーナーロールはチーム全体（請求およびメンバーロールを含む）を管理し、すべてのプロジェクト、アップロード、デプロイを表示できます。 |
| **Manager** | マネージャーロールはチーム全体（請求およびメンバーロールを含む）を管理し、すべてのプロジェクト、アップロード、デプロイを表示できます。 |
| **Billing** | ビリングロールは財務業務に特化しており、チームの請求情報を監督し、プロジェクトコストを確認および管理し、支払いオプションを処理できます。<br/>ビリングロールはデプロイとアセットへの表示専用アクセス権を持ち、デプロイやアセットのアップロードを実行できません。<br/>ビリングロールは追加費用なしで割り当てられます。このロールはチームごとに1人のメンバーに制限されます。 |
| **Member** | メンバーロール（開発者ロール）は、デプロイを作成したり、最適化のためにアセットをアップロード/ダウンロードしたり、AI機能を使用したりできます。 |

## FAQ

1. **Needle Cloudとは何ですか？**   
   3Dアセットとシーンをアップロード、圧縮、共有するためのオンラインサービスです。

2. **Needle Cloudにアセットをアップロードするにはどうすればよいですか？**   
   ファイルをウェブサイトにドラッグするか、サポートされている統合機能から直接アップロードできます。ファイルが多い場合は、CLI（コマンドラインインターフェース）またはAPI（アプリケーションプログラミングインターフェース）を使用できます。

3. **Needle Cloudから最適化されたファイルをダウンロードするにはどうすればよいですか？**   
   ウェブサイトからファイルをダウンロードできます。`Share`をクリックし、次に`Download`をクリックします。CLIを使用してファイルをダウンロードすることもできます。

4. **ファイルを他のユーザーと共有できますか？**   
   はい、ファイルを共有するためのリンクを作成できます。リンクは、直接ダウンロードリンク、またはNeedle Cloudビューアへのリンクのいずれかです。

5. **ファイルサイズに制限はありますか？**   
   アップロード制限はプランによって異なります。詳細についてはアカウントの詳細をご確認ください。

6. **Needle Cloudのファイルは他のツールで使用できますか？**   
   はい、ファイルをglTFとしてエクスポートすることで他のプログラムで使用できます。USDエクスポートは後日提供予定です。

7. **ストレージ容量が不足した場合はどうなりますか？**   
   プランをアップグレードするか、古いファイルを削除して容量を確保する必要がある場合があります。

8. **その他の回答**   
   [Needle Cloud FAQ](https://cloud.needle.tools/faq)をご覧ください。


---
このページはAIによって自動的に翻訳されました。