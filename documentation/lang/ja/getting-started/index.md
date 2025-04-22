---
lang: ja-JP
title: はじめに & インストール
next: ../project-structure.md
---

<br/>

<discountbanner />


# ダウンロード

**Needle Engine** を使用すると、お気に入りのフレームワークを使って完全にインタラクティブな 3D ウェブサイトを作成できます。

Needle Engine で作成されたプロジェクトは、ウェブ上のどこにでもデプロイでき、自動 LOD サポートを備えた最先端の最適化パイプラインによって自動的に最適化されます。これにより、品質を損なうことなくアセットサイズを最大 100 倍削減できます。

Needle Engine は、**Unity 用パッケージ、Blender 用アドオン、すぐに使える Web Component** として、またはエディタ連携なしのプロジェクト向けに npm パッケージとして利用できます。
これらはそれぞれ、私たちの構成要素と同じコンポーネントを備えており、さらに多くのものを作成する力を持っています。選択はあなた次第です。

## ワークフローを選択

<tool-tiles></tool-tiles>

<!-- | Tool |  |  |
| -- | -- | -- |
| Node.js **(required)** | 16.x or 18.x <br>[Windows](https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi) <br/> [MacOS](https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg)   | For running a local development server
| VS Code *(recommended)* | any version<br/>[Windows](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user) <br/> [MacOS](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal) | For code editing (optional)  |
| **Supported Editors** | |
| Unity | 2020.3.16+ <br/>2021.3.9+ <br/>2022.3.0+<br/>[Get Unity Hub](https://unity.com/download) | For setting up your scenes, components, animations... |
| Blender | 3.3<br/>3.4<br/>3.5<br/>3.6<br/>[Get Blender](https://www.blender.org/download/) | For setting up your scenes, components, animations... |
   -->


<!-- ### For optimized builds

| Tool | | |
| -- | -- | -- |
| | | |
| **toktx** | 4.1<br/>[Windows](https://fwd.needle.tools/needle-engine/toktx/win) <br/> [MacOS](https://fwd.needle.tools/needle-engine/toktx/osx) <br/> [Mac OS Apple Silicon](https://fwd.needle.tools/needle-engine/toktx/osx-silicon) <br/> [Other Releases](https://github.com/KhronosGroup/KTX-Software/releases/tag/v4.1.0-rc3)  | For texture compression (recommended) <br/>You can read more about that [here](./deployment.md#production-builds) in our docs -->



<br/>
<br/>



<!--
<img src="/imgs/unity-logo.webp" style="max-height:70px;" />


## Needle Engine for Unity

*Supported Unity versions: 2021.3 LTS, 2022.3 LTS*

<needle-button event_goal="download_unity" event_position="getting_started" large href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"><strong>Download Needle Engine for Unity</strong></needle-button>

- Drop the downloaded .unitypackage file into a Unity project and confirm that you want to import it.
- Wait a moment for the installation and import to finish. A window may open stating that "A new scoped registry is now available in the Package Manager.". This is our Needle Package registry. You can safely close that window.
- **Explore Samples** – Select the menu option _Needle Engine > Explore Samples_ to view, open and modify all available [sample scenes](https://engine.needle.tools/samples).


**See [Needle Engine for Unity](../unity/index.md)** for a full list of features and instructions on getting started.


---


<img src="/blender/logo.png" style="max-height:70px;" />

## Needle Engine for Blender
*Supported Blender versions: 4.1+*

<needle-button event_goal="download_blender" event_position="getting_started" large href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"><strong>Download Needle Engine for Blender</strong></needle-button>

<br/>

- The Blender add-on is downloaded as a zip file.
- In Blender, go to `File > Settings > Add-ons` and click the `Install` button.
- Then select the downloaded zip to install it.

**See [Needle Engine for Blender](../blender/index.md)** for a full list of features and instructions on getting started.

<br/>
<br/>
<br/>



<br/>
<br/>
<br/>

-->

## コードエディタとツール

### コードエディタのインストール

Needle Engine を使用すると、ウェブアプリを簡単に構築できます。これには、多くの場合、JavaScript/TypeScript によるコーディングや、ユーザーインターフェースを記述するための HTML および CSS の作成が含まれますが、常にではありません。これらのファイルの作成と編集には、[Visual Studio Code](https://code.visualstudio.com) を推奨します。これは、Windows、macOS、Linux で動作する無料のオープンソースコードエディタです。

<ClientOnly>
<!-- <br/><os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Unity</os-link> — <os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Blender</os-link> -->

<os-link windows_url="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" osx_url="https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal">Visual Studio Code をダウンロード</os-link>


<br/>
<br/>

### その他の便利なツール

::: tip
Needle Engine は、ウェブアプリを作成するために以下のツールを使用しますが、Unity または Blender 連携を使用している場合は、手動でインストールする必要はありません。Needle 連携をインストールした後、インストールプロセスをご案内します。
:::

<br/>
<os-link windows_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi" osx_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1.pkg">Node.js 20 LTS または 22 LTS.</os-link>
Needle Engine は、Node.js を使用して、ローカルコンピュータで作成しているウェブアプリを管理、プレビュー、ビルドします。
これは、ウェブサイトをインターネットにアップロード（デプロイ）するためにも使用されます。

<br/><os-link windows_url="https://fwd.needle.tools/needle-engine/toktx/win" osx_url="https://fwd.needle.tools/needle-engine/toktx/osx" osx_silicon_url="https://fwd.needle.tools/needle-engine/toktx/osx-silicon">KTX Software – toktx テクスチャツール。</os-link> 私たちは、Khronos Group による toktx を使用して、3D ファイルをローカルで最適化および圧縮します。プロダクションビルドの詳細については、[ドキュメント](../deployment.md#production-builds) を参照してください。

<br/>
</ClientOnly>

<!--
## Option 1: Quick Start — Starter Project ⚡
1. **Download or Clone this repository**
   It's set up with the right packages and settings to get you started right away.

   _Clone with HTTPS:_ ``https://github.com/needle-tools/needle-engine-support.git``
   _OR clone with SSH:_ ``git@github.com:needle-tools/needle-engine-support.git``
   _OR download directly:_ <a href="https://github.com/needle-tools/needle-engine-support/archive/refs/heads/main.zip" target="_blank">Download Repository</a>


2. **Open the starter project**
  Open `starter/Needle Engine Starter 2020_3` for a full sandbox project that's ready to run (including a couple of simple example scenes for lightmaps and custom shaders).
  This is a sandbox builder project! It already comes with multi-player capabilities, and works across mobile, desktop, VR and AR.

3. **Press Play**
  Make sure the scene CollaborativeSandbox is open, and press Play! This will automatically do some setup steps and start a local server.
  Once the setup is complete, a browser window will open, and your project is live.
  From now on, all changes you do in Unity will be immediately visible in your browser.

    > **Note**: Your browser might warn you about an untrusted SSL connection. Don't worry, the connection is still encrypted – please click "Advance" if your browser asks you to verify that you're sure you want to visit your server.

4. **Make it your own**
  Add assets and components, play around with lighting, add scripts and logic – this is your world now!
  You can also [publish it on the web for free](#deploy-your-project-to-glitch-) so that others can join you.
-->



## 次のステップ

Needle Engine をインストールしたら、プロジェクト作成、コンポーネントワークフロー、スクリプト、デプロイなどについてさらに深く掘り下げる準備ができました。

- [はじめに: Unity](../unity/index.md)
- [はじめに: Blender](../blender/index.md)
- [コンセプト: 3D オブジェクトとコンテンツのエクスポート](../export.md)
- [コンセプト: プロジェクト構造](../project-structure.md)
- [コンセプト: ウェブサイトをウェブにデプロイ](../deployment.md)
- [初心者ガイド: Typescript Essentials](./typescript-essentials.md)
- [初心者ガイド: Unity 開発者向け Needle Engine](./for-unity-developers.md)
- [初心者ガイド: スクリプト参照](../scripting.md)
- [ライブ例: Needle Engine サンプル](https://engine.needle.tools/samples)

トラブルシューティングのヘルプが必要な場合は、[質問と回答 – FAQ](../faq.md) セクションを参照してください。
ぜひ、[フォーラム](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) および [Discord Community](https://discord.needle.tools) にご参加ください。


ページはAIによって自動的に翻訳されました