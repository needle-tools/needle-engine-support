---
title: Webプロジェクトの構造
---

# Needle Engineプロジェクトの構造

### Webプロジェクトファイル

| | |
| --- | --- |
| **Needle Engine** | |
| [`needle.config.json`](./reference/needle-config-json.md) | Needle Engineのビルドと統合のための設定 |
| **エコシステム** | |
| `package.json` | 名前、バージョン、依存関係、スクリプトを含むプロジェクト設定 |
| `tsconfig.json` | Typescriptコンパイラ設定 |
| `.gitignore` | gitで無視されるファイルとフォルダー |
| `vite.config.js` | vite固有の設定が含まれています。<br/>また、Needle Engineのviteプラグインも追加します。 |


### デフォルトのViteプロジェクト構造

私たちのメインプロジェクトテンプレートは、超高速の[vite](https://vitejs.dev/)バンドラーを使用しています。以下に、私たちが作成・配布しているViteテンプレートの構造を示します（ただし、独自のニーズに合わせて適応させることも可能です）。

| | |
| --- | --- |
| **フォルダー** | |
| `assets/` | このアセットフォルダーには、Unityからエクスポートされたアセットが含まれます。例：生成された``gltf``ファイル、オーディオ、ビデオファイル。プロジェクトの配布用ビルド時に``assets``はクリアされるため、手動でファイルを追加することは推奨されません。
| `include/` | (オプション) - 参照/ロードする必要があるカスタムアセットがある場合は、includeディレクトリに追加してください。ビルド時、このディレクトリは出力フォルダーにコピーされます。
| `src/generated/` | 生成されたjavascriptコード。手動で編集しないでください！
| `src/scripts/` | プロジェクト固有のスクリプト / コンポーネント
| `src/styles/` | スタイルシート
| `*` | ここに好きなように新しいフォルダーを追加できます。ビルド時には、必ずそれらを[出力ディレクトリにコピー](./reference/needle-config-json.md)してください。 |
| **ファイル** | |
| `index.html` | ウェブサイトのランディングページまたはホームページ
| `vite.config` | [viteの設定](https://vitejs.dev/config/)です。配布用ビルドや開発サーバーのホストに関する設定がここで行われます。通常、これらの設定を編集する必要はありません。
| `src/main.ts` | `index.html`からインクルードされ、`needle-engine`をインポートします |
| `*` | ここに好きなように新しいファイルを追加できます。ビルド時には、必ずそれらを[出力ディレクトリにコピー](./reference/needle-config-json.md)してください（開発中のみ使用される場合を除く）。 |

私たちのエクスポーターは他のプロジェクト構造でも使用できます。viteはその速度から、私たちの主要なフロントエンドバンドルツールです。ご自由にJavaScriptプロジェクトをセットアップしてください。

[ドキュメントで他のフレームワークとのバンドルと使用についてもっと学ぶ](html.md)



---

#### 引き続き読む

- [Unity開発者のためのTypescriptガイド](./getting-started/for-unity-developers.md)
- [Typescriptの基礎](./getting-started/typescript-essentials.md)
- [カスタムスクリプトの記述](./scripting.md)
- [エブリウェア・アクション](./everywhere-actions.md)


このページはAIによって自動的に翻訳されました