```markdown
---
title: needle.config.json
---

`needle.config.json` は、Needle Editor インテグレーションおよび Needle Engine ビルドパイプラインプラグインの設定を提供するために使用されます。

| | |
| --- | --- |
| **パス** | |
| `buildDirectory` | ビルドされたプロジェクトファイルがコピーされる場所です |
| `assetsDirectory` | Editor インテグレーションのアセットがコピーまたは作成される場所です（例：UnityまたはBlenderからエクスポートされた`.glb`ファイル） |
| `scriptsDirectory` | Editor インテグレーションがコンポーネントを再生成するためにコードの変更を監視するディレクトリです |
| `codegenDirectory` | Editor インテグレーションが生成されたファイルを出力する場所です。 |
| `baseUrl` | 例えば next.js や SvelteKit インテグレーションに必要です。baseUrlが設定されている場合、codegenおよびファイル内の相対パスは、assetsDirectoryではなくbaseUrlを使用します。これは、assetDirectoryがサーバーのURLと一致しない場合に便利です。<br/>例えば、ディスク上のパスが `"assetsDirectory": "public/assets"` であっても、フレームワークは `"baseUrl": "assets"` からファイルを配信する場合があります。 |
| **ツール** | |
| `build : { copy: ["myFileOrDirectory"] }` | 追加のファイルまたはフォルダを buildDirectory にコピーするための文字列パスの配列です。これらは絶対パスまたは相対パスのいずれかになります。 |


#### 基本例
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### コピー例
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated",
  "build": {
    "copy": [
      "cards"
    ]
  }
}
```

#### baseUrlが異なる例 (例: SvelteKit, Next.js)
ファイルは `static/assets` にエクスポートされますが、フレームワークはそれらを `/assets` から配信します。この場合、ファイル内の相対パスが正しくなるように、`baseUrl` を `assets` に設定する必要があります。

```json
{
  "baseUrl": "assets",
  "buildDirectory": "dist",
  "assetsDirectory": "static/assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### 関連リンク
- [プロジェクト構造](../project-structure.md)

---
ページの自動翻訳: AIを使用
```