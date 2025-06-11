---
title: よくある質問（FAQ）💡
---


## Needle Engineライセンスをアクティベートするにはどうすればよいですか？

### Unityでのライセンスアクティベーション

#### Needle Engine 4.x

Project Settings/Needleに進み、ログインボタンをクリックします。手順に従って、Needleアカウントにログインしてください。
その後、Unityのプロジェクト設定ウィンドウにアカウント情報が表示されます。ドロップダウンからライセンスを持つチームを選択してください。

#### Needle Engine 3.x

`Edit/Project Settings/Needle`を開き、Needle Engineプラグイン設定を取得します。ウィンドウの上部にライセンス情報を入力するフィールドがあります。
- `Email` - ライセンスを購入したメールアドレスを入力します
- `Invoice ID` - メールで受け取った請求書IDのいずれかを入力します

注意：ライセンスを適用するために、ローカルウェブサーバーを再起動する必要がある場合があります。

![unity license window](/imgs/unity-needle-engine-license.jpg)

### Blenderでのライセンスアクティベーション
`Addon Preferences/Needle Engine`を開き、Needle Engineアドオン設定に移動します。
- `Email` - ライセンスを購入したメールアドレスを入力します
- `Invoice ID` - メールで受け取った請求書IDのいずれかを入力します

注意：ライセンスを適用するために、ローカルウェブサーバーを再起動する必要がある場合があります。



## ローカルウェブサイトにSSLエラーが表示されます。例：「接続はプライベートではありません」

ローカル設定によっては、ブラウザにSSLセキュリティに関する警告が表示されることがあります。

これは、接続は暗号化されていますが、デフォルトではブラウザが検証できるSSL証明書がないためです。
その場合は、`Advanced`をクリックし、`Proceed to Site`をクリックしてください。Safariでは、自動的に進まないため、その後ページを再読み込みする必要がある場合があります。これで、ブラウザにシーンが表示されるはずです！

このダイアログは、同じローカルサーバーに対して一度だけ表示されるはずです。

::: tip
Connections are secured, because we're enforcing HTTPS to make sure that WebXR and other modern web APIs work out-of-the-box. Some browsers will still complain that the SSL connection (between your local development server and the local website) can't be automatically trusted, and that you need to manually verify you trust that page. Automatic Page Reload and Websocket connections may also be affected depending on the browser and system settings.

See [the Testing docs](./testing.md) for information on how to set up a self-signed certificate for a smoother development experience.
:::

![SLL warning on chrome](/videos/ssl-warning.gif)



## ローカルウェブサイトが真っ暗なままです

通常、これはEngineコードまたはあなたのコードに例外がある場合に発生します。開発者ツール（Chromeでは<kbd>Ctrl + Shift + I</kbd>または<kbd>F12</kbd>）を開き、Consoleでエラーを確認してください。
特にNeedle Engineパッケージのバージョンをアップデートしたばかりの場合、ローカル開発サーバーを停止して再起動することでこれが修正されることがあります。
そのためには、Editorの右下隅にある実行中のプログレスバーをクリックし、小さな<kbd>X</kbd>をクリックして実行中のタスクをキャンセルします。その後、再度Playを押すだけです。


## エクスポート後、オブジェクトが白くなります
これは通常、カスタムシェーダーまたはマテリアルを使用しており、そのプロパティがglTFエクスポート用の既知のプロパティ名にうまく変換されない場合に発生します。
glTF互換のマテリアルとシェーダーを使用するか、シェーダーを「custom」としてマークして直接エクスポートすることができます。
- 推奨されるglTFワークフローについてもっと読む：<link>
- カスタムシェーダーについてもっと読む：<link>


## Uncaught ReferenceError: NEEDLE_ENGINE_META is not defined / NEEDLE_USE_RAPIER is not defined

viteやnext.jsを使用している場合は、Needle Engineプラグインをconfigに追加してください。
viteの例：
```js
const { needlePlugins } = await import('@needle-tools/engine/plugins/vite/index.js');
plugins: [needlePlugins(command, needleConfig)]
```
next.jsの例：
```js
const { needleNext } = await import("@needle-tools/engine/plugins/next/index.js");
return needleNext({}, { modules: { webpack } });
```
または、例えばルートの`index.html`にスクリプトタグで不足している変数を宣言するだけでもかまいません。
```html
<script>
  var NEEDLE_ENGINE_META = {}
  var NEEDLE_USE_RAPIER = true;
</script>
```

## THREE.EXRLoader: provided file doesnt appear to be in OpenEXR format

Lightmap Encodingが**Normal Quality**に設定されていることを確認してください。
設定変更には*Edit/Project Settings/Player*に進んでください。

![](/faq/lightmap_encoding.jpg)

## ウェブサイトが大きすぎる/読み込みが遅い（MBが多すぎる）

これには多くの理由がありますが、いくつかの一般的な理由は以下のとおりです。
- テクスチャが多すぎる、またはテクスチャが大きすぎる
- メッシュの頂点が多すぎる
- メッシュに実際には必要ない頂点属性がある（例：法線と接線があるが使用していない）
- オブジェクトが無効になっており、無視されていない – 無効なオブジェクトも実行時にオンにしたい場合に備えてエクスポートされます！エクスポートから完全に無視するには、Tagを`EditorOnly`に設定してください。
- シーンに複数の``GltfObject``コンポーネントがあり、それらすべてに``EmbedSkybox``が有効になっています（エクスポートするシーンごとにスカイボックスは1つだけにする必要があります）

読み込み時間自体が問題の場合は、**コンテンツを複数のglbファイルに分割**し、オンデマンドで読み込むことができます（これは当社のウェブサイトで行っていることです）。そのためには、コンテンツをPrefabまたはSceneに入れ、スクリプトからそれらを参照できます。ドキュメンテーションの[Scripting/Addressables](./scripting.md#assetreference-and-addressables)をご覧ください。

## UIでTextがレンダリングされません

- Unityの場合：`UI/Legacy/Text`コンポーネントを使用し、`TextMeshPro - Text`コンポーネントは**使用しない**ようにしてください。

## スクリプトがエクスポート後に動作しません

- 既存のC#コードはそのままではエクスポートされません。対応するtypescript / javascriptを記述する必要があります。
- Needleはコンポーネントにtypescript / javascriptを使用し、それらのC#スタブを生成します。
- 対応するJSがすでに存在するコンポーネントは、Inspectorにそれが表示されます。

## ライトマップが異なって見える/明るすぎる

[ライトマップのベストプラクティス](https://docs.needle.tools/lightmaps?utm_source=needle_docs)に従っていること、および[ベイクされたオブジェクトとベイクされていないオブジェクトの混合](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects)について読んでください。

## シーンが明るすぎる/ライティングがUnityと異なって見える
ライトが「Baked」または「Realtime」に設定されていることを確認してください。「Mixed」は現在サポートされていません。
- Mixed（ライトマッピングあり）に設定されたライトは、three.jsではオブジェクトに二重に影響を与えます。現在、ライトマップされたオブジェクトをライティングから除外する方法がないためです。
- ``Lighting/Environment``のSkyboxの``Intensity Multiplier``ファクターは現在サポートされておらず、Needle Engineでは効果がありません。
![image](https://user-images.githubusercontent.com/5083203/185429006-2a5cd6a1-8ea2-4a8e-87f8-33e3afd080ec.png)
- three.jsの制限により、ライトシャドウの強度は現在変更できません。

[ベイクされたオブジェクトとベイクされていないオブジェクトの混合](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects)に関するドキュメントも参照してください。


## スカイボックスの解像度が低いですか？スカイボックスの解像度を変更する方法

- **カスタムキューブマップを使用している場合**：スカイボックステクスチャ（キューブマップに割り当てられている）のテクスチャインポート設定をオーバーライドできます。

![image](https://user-images.githubusercontent.com/5083203/188179104-1e078cda-3397-4ebe-aaf9-7faa23ee4904.png)


- **デフォルトのスカイボックスを使用している場合**：シーンのどこかに``SkyboxExportSettings``コンポーネントを追加して、デフォルトの解像度をオーバーライドします。

![image](https://user-images.githubusercontent.com/5083203/188171443-578380ab-2036-4d70-a8a7-f8cd9da9f603.png)



## シャドウが表示されない、または途中で途切れる

以下の点を確認してください。
- ライトにシャドウが有効になっていること（Soft ShadowまたはHard Shadowのいずれか）
- オブジェクトが「Cast Shadows: On」に設定されていること（MeshRendererコンポーネントを参照）
- ディレクショナルライトの場合、シャドウカメラはシーン内のライトの位置に配置されるため、ライトの位置が現在重要です。


## 色が間違っているように見えます

プロジェクトがLinear colorspaceに設定されていることを確認してください。

![image](https://user-images.githubusercontent.com/5083203/191774978-66e9feb1-0551-4549-85d3-3e5b8021f162.png)


## ネットワーキングとGlitchを使用しており、Glitchページに同時に30人以上がアクセスすると動作しません

- Glitchでのデプロイはプロトタイプ作成の高速な方法であり、小規模なプロダクションにも機能する場合があります。そこの小さなサーバーには、永続的なセッションで多くの人々をホストするだけの能力と帯域幅はありません。
- 他のネットワーキングアイデアに取り組んでいますが、それまでの間は、他の場所（node.jsサポート付き）でウェブサイトをホストするか、単にそれをリミックスして複数のサーバー間で負荷を分散させることができます。また、[networking backend package](https://www.npmjs.com/package/@needle-tools/needle-tiny-networking-ws)自体を、たとえばGoogle Cloudのようなスケーリング可能な場所にホストすることもできます。


## ウェブサイトにAR/VRボタンがありません

- ルートの``GltfObject``内のどこかに``WebXR``コンポーネントを追加していることを確認してください。
- オプションで、WebXRの配置、スケール、向きを指定するために、ルートの``GltfObject``または子ヒエラルキー内に``AR Session Root``コンポーネントを追加します。
- オプションで、VRでユーザーがどこから開始するかを制御するために、``XR Rig``コンポーネントを追加します。


## サブシーンで新しいスクリプトを作成しましたが、動作しません

サブシーンのnpmdefs（ルートエクスポートシーンのスクリプトから参照としてエクスポートされるシーン）で新しいスクリプトを作成する場合、現在、ルートシーンを再度エクスポートする必要があります。これは、新しいスクリプトを登録するコード生成が、現在``ExportInfo``コンポーネントを持つシーンでのみ実行されるためです。これは将来修正される予定です。


## ローカルサーバーが起動しない / ウェブサイトが表示されない

最も可能性の高い理由は、インストールが正しくないことです。
Consoleおよび``ExportInfo``コンポーネントでエラーまたは警告を確認してください。

これらの警告/エラーが解決に役立たない場合は、以下の手順を順番に試してください。完了には時間がかかる場合があります。問題が解決したら停止してください。Consoleで警告とエラーを確認してください。

- [Prerequisites](./getting-started/#prerequisites)に従っていることを確認してください。
- ``ExportInfo``コンポーネントを選択し、``Install``をクリックしてプロジェクトをインストールしてください。
- ``ExportInfo``コンポーネントを選択し、Altキーを押しながら``Clean Install``をクリックしてクリーンインストールを実行してください。
- ウェブプロジェクトディレクトリをコマンドラインツールで開いて、以下の手順を試してください。
- ``npm install``を実行し、次に``npm run dev-host``を実行してください。
- ローカルランタイムパッケージ（``node_modules/@needle-tools/engine``）とthree.js（``node_modules/three``）の両方がインストールされていることを確認してください。
- これらの両方のディレクトリでも``npm install``を実行してもかまいません。


## C#コンポーネント生成はJavaScriptのみでも動作しますか？
技術的には、バニラJavaScriptでもC#コンポーネント生成は実行されますが、ジェネレーターがJavaScriptクラスに対してどのC#タイプを作成するかを知ることは推測が多かったり、単に不可能だったりするため、推奨せず、完全にサポートしていません。本当に必要であれば、JavaScriptからUnityコンポーネントを生成する方法の最小限の例を以下に示します。

```js
import { Behaviour } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    //@type float
    myField = 5;
}
```


## コンポーネント/インスペクターに「Generate Project」のようなボタンが表示されません

誤ってInspectorの`Debug`モードになっていないか確認してください – `Normal`に戻してください。
![20220824-025011-S2GQ-Unity_lKlT-needle](https://user-images.githubusercontent.com/2693840/186291615-56e7ebdb-1221-4326-813d-f88526fa126c.png)


## toktxが見つからない / toktxがインストールされていない

- [toktxをダウンロードしてインストール](http://localhost:8080/docs/getting-started/.html#install-these-tools-for-production-builds)していることを確認してください。

- Windowsの場合：toktxをシステム環境変数に追加していることを確認してください。環境変数を更新するためにコンピュータを再起動する必要がある場合があります。デフォルトのインストール場所は``C:\Program Files\KTX-Software\bin``です。

![image](/imgs/ktx-env-variable.webp)


## ウェブプロジェクトのインストールに時間がかかりすぎる / 全く終わらない / EONET: no such file or directory

- **exFATとしてフォーマットされたドライブにプロジェクトを作成しないようにしてください**。exFATはsymlinksをサポートしておらず、Needle Engine for Unityバージョン3.xより前では必須です。
  以下の手順でドライブのフォーマットを確認できます。
  1. 「システム情報」を開く（Windowsキーを押して検索するか、cmdで「msinfo32」と入力）
  2. Components > Storage > Drivesを選択
  3. 画面右側で全て選択（<kbd>Ctrl + A</kbd>）し、コピー（<kbd>Ctrl + C</kbd>）してここにペースト（<kbd>Ctrl + V</kbd>）

## NPMインストールが失敗し、ハードドライブ/IOに関するエラーが発生します

プロジェクトがnode.jsで動作することが知られているディスク上にあることを確認してください。失敗の主な理由は、ディスクがsymlinks（symbolic links / softlinks）をサポートしていないことであり、これはnode.jsの適切な機能のために必要です。
<kbd>NTFS</kbd>フォーマットは常に動作するはずです。問題があることが知られているファイルシステムフォーマットは<kbd>exFAT</kbd>と<kbd>FAT32</kbd>です。

ドライブのフォーマットを確認するには：
1. 「システム情報」を開く（<kbd>Windows key</kbd>を押して「System Information」と入力するか、cmd（<kbd>Windows + R</kbd>）で`msinfo32`と入力）
2. 「Components > Storage > Drives」を選択
3. そこに、全てのドライブとそのフォーマットが一覧表示されます。プロジェクトはNTFSフォーマットのドライブに置いてください。


## "Unexpected token `@`. Expected identifier, string literal, numeric literal or ..." というエラーが発生します

Needle Engineはシリアライズにtypescript decoratorsを使用しています。
このエラーを修正するには、tsconfig.jsonで`experimentalDecorators`を有効にしてください。

## Mac OSでnpmコマンドを実行すると「failed to load config ... vite.config.js」というエラーが発生します

(ARM) Apple Siliconプロセッサ上でx86_64バージョンのUnityを使用している可能性が高いです。Unity 2020.3はx86_64版のみ利用可能で、それ以降のバージョンにはApple Silicon版もあります。
したがって、Unity統合がnpmを呼び出す際にはx86_64プロセスから行われるため、nodeとvite/esbuildのx86_64版が使用されます。その後、同じプロジェクトでApple Siliconアプリ（例: VS Code）からnpmコマンドを実行しようとすると、長いエラーメッセージと共にアーキテクチャの不一致に関するnpmの苦情が発生します。

これを修正するには、Apple Silicon版のUnity（2021.1以降）を使用してください。

2020.3でも一時的に修正するには、`node_modules`フォルダを削除し、VS Codeから再度`npm install`を実行してください。Unityに戻す際には、再び`node_modules`を削除する必要があります。

## 循環参照エラー

これは、例えば`SceneSwitcher`（またはシーンやアセットをロードする他のコンポーネント）があり、参照されたUnityのアセットに、元の`SceneSwitcher`を含むシーンと同じ名前の`GltfObject`が含まれている場合に発生することがあります。以下のようなエラーが表示された場合、Unityで再度確認できます。

```
Failed to export ↑ YourSceneName.glb
you seem to have objects with the same name referencing each other.
```

これを修正するには、以下のいずれかを実行します。
- 参照されたPrefabまたはSceneの`GltfObject`を削除します。
- 参照されたシーンをロードするコンポーネントを持つGameObjectの名前を変更します。

これで問題が解決しない場合は、[フォーラム](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)でお問い合わせください。

## シーンがロードされず、コンソールに「circular references」または「failed to update active state」という警告が表示されます
[circular reference error](#circular-reference-error)セクションを参照してください。

## 自分のマシンはWebGL 2をサポートしていますか？

お使いのデバイスがWebGL 2をサポートしているかを確認するには、[このような検出ツール](https://get.webgl.org/webgl2/)を使用してください。これにより、問題の原因のヒントも得られますが、一般的にはブラウザとドライバーを更新していることを確認してください。WebGL 1はサポートされていません。

#### 問題を起こすことが知られているデバイス：
- Lenovo Thinkpad - T495

## ローカルAIモデルでNeedle AIを使用したい

AIをローカルで実行したい（または実行する必要がある）場合は、ローカルAI（例: Ollama）のコンテキストとしてNeedleのllms.txtファイルを使用できます。

- [llms.txt](https://cloud.needle.tools/llms.txt)
- [llms-full.txt](https://cloud.needle.tools/llms-full.txt)


## まだ質問がありますか？
[フォーラムでお問い合わせください](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)

<a href="https://discord.needle.tools" target="_blank"><img height=20 src="https://img.shields.io/discord/717429793926283276?color=5562ea&label=Discord" /></a>


このページはAIによって自動的に翻訳されました