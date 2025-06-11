---
title: Unity用Needle Engine
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needleのロゴ" alt="Needleのロゴ"/> +
  <img src="/imgs/unity-logo.webp" style="max-height:70px;" />
</div>

# Unity用Needle Engine

Unity用Needle Engineを使用すると、Unity内で直接、非常にインタラクティブで柔軟性があり軽量なWebアプリケーションを作成できます。Unityエディターの強力なツールを使用して、3Dシーンの視覚的な設定、アニメーション、デザインを行います。Unity用Needle Engineは、シーンをglTFにエクスポートすることを担当し、あらゆるWebフロントエンドフレームワークと簡単に統合できます。


## Unityパッケージのインストール


<NoDownloadYet>
  <br/>
  <needle-button
    event_goal="download_unity"
    event_position="getting_started"
    large
    href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"
    same_tab
    next_url="/docs/unity/"
    >
    <strong>Unity用Needle Engineをダウンロード</strong>
  </needle-button>
</NoDownloadYet>

<!-- [Mirror](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)    -->

1. **ダウンロードした.unitypackageファイルをドロップ**し、Unityプロジェクトにインポートを確定します。

2. インストールとインポートが完了するまで**しばらく待ちます**。「A new scoped registry is now available in the Package Manager.」というウィンドウが表示される場合があります。これはNeedleパッケージのレジストリです。このウィンドウは安全に閉じることができます。
3. **サンプルを探索**。
  メニューオプション`Needle Engine > Explore Samples`を選択して、利用可能なすべての[サンプルシーン](https://engine.needle.tools/samples)を表示、開く、変更します。

## クイックスタートビデオチュートリアル

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />

## サンプルから開始

幅広いトピック、ユースケース、業界をカバーする100以上のサンプルがあります。
概要については、[サンプルページ](https://engine.needle.tools/samples/)をご覧ください。

これらのサンプルはすべてUnityで直接利用できます。
1. サンプルをブラウズするには、`Needle Engine > Explore Samples`に進みます
2. 「Install Samples」をクリックして、エディター内にサンプルパッケージをインストールします（または、パッケージを手動でインストールするには、[サンプルのunitypackageをダウンロード](http://engine.needle.tools/downloads/unity/samples)します）
3. 任意のサンプルを選択し、`Open Scene`をクリックします。

:::tip サンプルは読み取り専用です – これにより簡単に更新できます。
私たちのサンプルシーンは、UnityのUPMパッケージの一部です。これは、それらのアセットやスクリプトを直接編集できないことを意味します – それらは読み取り専用です。サンプルパッケージからアセットを編集するには、プロジェクトの`Assets`フォルダーにコピーします。サンプルパッケージからスクリプトを編集するには、Webプロジェクトの`src`フォルダーにコピーします。
:::

## テンプレートから開始

新規プロジェクトを迅速に開始するためのシーンテンプレートを多数提供しています。
これにより、アイデアからプロトタイプまで数クリックで進むことができます。

1. `File > New Scene`をクリックします

2. 名前に(needle)が含まれるテンプレートのいずれかを選択し、`Create`をクリックします。[Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox)テンプレートをお勧めします。これは、インタラクティビティ、マルチプレイヤー、アセットの追加を始めるのに最適な方法です。
3. Playをクリックして、新しいWebプロジェクトをインストールして起動します。

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)


## ゼロから開始

シーンテンプレートから開始したくない場合は、以下の手順に従うことができます。
実際には、パッケージに含まれている「Minimal (Needle)」テンプレートを再作成します。

1. **新しい空のシーンを作成**

2. **エクスポート用にシーンを設定**
  空のGameObjectを追加し、名前を「Exporter」にして、`Needle Engine`コンポーネント（旧称`Export Info`）を追加します。
  このコンポーネントでは、エクスポートされたランタイムプロジェクトを作成し、迅速にアクセスできます。
  また、いずれかのパッケージやモジュールが古いか、Webプロジェクトにローカルにインストールされていない場合に警告が表示されます。

    ::: tip プロジェクト名とシーン名
    デフォルトでは、プロジェクト名はシーンの名前に一致します。それを変更したい場合は、新しいWebプロジェクトを作成したい``Directory Name``を選択または入力できます。パスはUnityプロジェクトからの相対パスです。
    :::

3. **Webプロジェクトテンプレートを選択**
  次に、プロジェクトのWebプロジェクトテンプレートを選択します。デフォルトのテンプレートは、高速なWebアプリバンドラーである[Vite](https://vitejs.dev/)に基づいています。
  <br/>
    ![Unity ExportInfo local templates](/imgs/unity-project-local-template.jpg)


4. Playをクリックして、新しいWebプロジェクトをインストールして開始します


:::tip 独自のテンプレートを定義
似たようなプロジェクトを多数作成する場合は、Project Viewのコンテキストメニューにある`Create/Needle Engine/Project Template`を使用して、独自のローカルまたはリモートテンプレートを作成できます。テンプレートは、ディスク上のローカル（コピーされるフォルダ）またはリモートリポジトリ（クローンされるgitリポジトリ）のいずれかにすることができます。
:::

## プロジェクトフォルダとファイル


| フォルダ | |
| --- | --- |
| **Unity** | |
| `Assets` | ここにプロジェクト固有/専用のアセットが配置されます。 |
| `Packages` | ここにこのプロジェクトにインストールされたパッケージが配置されます。パッケージには任意のアセットタイプを含めることができます。主な違いは、複数のUnityプロジェクトに追加できることです。したがって、コードやアセットを共有するための優れた方法です。パッケージの詳細については、[パッケージに関するUnityドキュメント](https://docs.unity3d.com/Manual/PackagesList.html)を参照してください。
| **Needle Engine Unityパッケージ** | |
| ``Core/Runtime/Components`` | すべてのNeedle Engine組み込みコンポーネントが含まれています。[コンポーネントリファレンス](./../component-reference.md)で詳細を学べます。 |

-----

Unityで新しいWebプロジェクトを作成する際、ローカルテンプレートから作成するかを選択できます（デフォルトでは、viteベースのWebテンプレートを出荷しています）。

ExportInfoプロジェクトパスにリポジトリURLを入力して、リモートテンプレートを参照することもできます（これはシーンと一緒に保存できます）。新しいWebプロジェクトを作成する際、リポジトリはクローンされるかダウンロードされ（gitがインストールされているかどうかによります）、`needle.config.json`ファイルが検索されます。クローンされたリポジトリに見つからない場合は、ルートディレクトリが使用されます。[github.com/needle-engine](https://github.com/needle-engine)でリモートテンプレートプロジェクトの例を見つけることができます。

![Unity ExportInfo local templates](/imgs/unity-project-remote-template.jpg)

### 一時プロジェクト

NpmDefs経由でのみカスタムファイルを追加し、プロジェクト設定を変更しない場合（例：迅速なフルスクリーンテストの場合）、プロジェクトパスの前に`Library`を付けることができます。プロジェクトはUnityプロジェクトのLibraryフォルダに生成され、ソース管理に追加する必要はありません（Libraryフォルダはソース管理から除外する必要があります）。私たちはこれらのプロジェクトを_一時プロジェクト_と呼んでいます。アイデアを迅速にテストするのに最適です！


## UnityでのTypescript

**NPM Definition**は[npm packages](https://docs.npmjs.com/about-packages-and-modules)であり、Unityエディターに密接に統合されており、複数のWebまたはUnityプロジェクトとスクリプトを簡単に共有できます。

npmdefパッケージ内のスクリプトの場合、typescriptファイルに対するC#コンポーネントスタブも自動的に生成されます。

#### npmdefの作成とインストール
*NPM Definition*を作成するには、Unity Projectブラウザーで右クリックし、「``Create/NPM Definition``」を選択します。
*NPM Definition*パッケージをランタイムプロジェクトに**インストール**するには、例えば``Export Info``コンポーネントを選択し、``dependencies``リストに追加します（内部的には、これは単に基になるnpmパッケージをpackage.jsonに追加するだけです）。

![image](https://user-images.githubusercontent.com/5083203/170374130-d0e32516-a1d4-4903-97c2-7ec9fa0b17d4.png)

ExportInfoコンポーネントでInstallをクリックするなどして、新しく追加したパッケージをインストールすることを忘れないでください。また、サーバーが既に実行されている場合は再起動してください。

*NPM Definition*パッケージ内のコードを編集するには、プロジェクトブラウザーで*NPM Definition*アセットをダブルクリックするだけで、各npmdefに付属するvscodeワークスペースが開きます。


# 次のステップ

- [コンセプト: Webプロジェクト](../project-structure.md)
- [コンセプト: アセットのエクスポート](../export.md)
- [コンセプト: デプロイメント（Webサイトの共有）](../deployment.md)
- [コンポーネント: Everywhere Actionsについて学ぶ](../everywhere-actions.md)
- [初心者向けスクリプト: Typescriptの基本](../getting-started/typescript-essentials.md)
- [初心者向けスクリプト: カスタムコンポーネントの書き方](../scripting.md)


このページはAIによって自動的に翻訳されました