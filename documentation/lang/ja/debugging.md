---
title: デバッグの方法
---

## glTFを扱うための便利なリソース

glTFまたはglbファイルをオンラインで検査するには：
- [gltf.report](https://gltf.report/) - three.jsベース
- [modelviewer.dev/editor](https://modelviewer.dev/editor) - three.jsベース
- [Khronos glTF Sample Viewer](https://github.khronos.org/glTF-Sample-Viewer-Release/)
- [Babylon Sandbox](https://sandbox.babylonjs.com/)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)

ローカルで検査するには：
- [glTF Shell Extension for Windows](https://apps.microsoft.com/store/detail/gltf-shell-extensions/9NPGVJ9N57MV?hl=en-us&gl=US)を使用して、glTFとglbの間で変換する
- [glTF Tools VS Code Extension](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode)を使用して、ローカルで検証エラーやエンジン内プレビューを確認する

## 組み込みのURLパラメータ

デバッグフラグはURLクエリパラメータとして追加できます。
利用可能な**すべて**のパラメータのリストを取得するには、``?help`` を使用します。

最もよく使用されるものをいくつか紹介します：

- ``help`` 利用可能なすべてのURLパラメータをコンソールに出力します
- ``console`` 画面上の開発コンソールを開きます。モバイルデバッグに便利です
- ``printGltf`` ロードされたglTFファイルをコンソールに記録します
- ``stats`` FPSモジュールを表示し、数秒ごとにthree.jsレンダラーの統計情報を記録します
- ``showcolliders`` 物理コライダーを可視化します
- ``gizmos`` ギズモレンダリングを有効にします（例：BoxColliderまたはAxesHelperコンポーネントを使用する場合）
- その他多数：すべてを確認するには、``help`` を使用してください

## デバッグメソッド

Needle Engineには、静的クラスである ``Gizmos`` の一部として、非常に強力で便利なデバッグメソッドがいくつかあります。[スクリプトドキュメント](./scripting.md#gizmos)で詳細を確認してください。

## リリースビルドのローカルテスト

- まず、http-serverをインストールします：`npm install -g http-server`
- ビルドを作成します（開発用または製品版）
- コマンドラインツールで*dist*ディレクトリを開きます
- ``http-server -g`` を実行します | *`-g` はgzipサポートを有効にします*
- オプション：WebXRをテストしたい場合は、[自己署名SSL証明書](https://stackoverflow.com/a/35231213)を生成し、``http-server -g -S`` を実行してhttpsを有効にします（WebXRには必須）。

## VSCode

実行中のローカルサーバーにVSCodeをアタッチして、ブレークポイントを設定し、コードをデバッグできます。[VSCodeでのデバッグ](https://code.visualstudio.com/docs/editor/debugging)については、こちらで詳細を確認できます。

Webプロジェクトの``.vscode/launch.json``に以下の内容でlaunch.jsonファイルを作成します：
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Attach Chrome",
            "url": "https://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

サーバーが開始するポートを変更した場合は、それに応じて``url``フィールドを更新してください。
その後、VSCode内からローカルサーバーを起動できます：

![](/debugging/vscode-start-debugging.webp)

## モバイル

### Androidデバッグ

**Android**デバッグの場合、Chrome Dev Toolsをデバイスにアタッチし、PCから直接ログを確認できます。デバイスを開発モードに切り替え、USB経由で接続する必要があります。

公式のChromeドキュメントは[こちら](https://developer.chrome.com/docs/devtools/remote-debugging/)をご覧ください
- お使いの携帯電話で[開発者向けオプション](https://developer.android.com/studio/debug/dev-options)が有効になっていることを確認してください
- USB経由で携帯電話をコンピュータに接続します
- ブラウザでこのURL ``chrome://inspect/#devices`` を開きます
- モバイルデバイスで、USB接続をコンピュータに許可します
- コンピュータのChromeで、しばらくすると開いているタブのリストが表示されるはずです（``chrome://inspect/#devices``上）
- デバッグしたいタブで ``Inspect`` をクリックします

### iOSデバッグ

簡単なiOSデバッグのために、``?console`` URLパラメータを追加すると、便利な画面上のJavaScriptコンソールが得られます。

Macをお持ちの場合は、Safariにアタッチすることもできます（上記のAndroidワークフローと同様）。

iOSでのWebXRの使用とデバッグには、サードパーティ製のブラウザである[Mozilla WebXR Viewer](https://labs.mozilla.org/projects/webxr-viewer/)を使用する必要があります。

### Questデバッグ

Questは単なるAndroidデバイスです - 手順については[Androidデバッグ](#android-debugging)セクションを参照してください。


このページはAIによって自動的に翻訳されました