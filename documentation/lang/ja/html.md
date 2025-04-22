---
title: フレームワーク、バンドラー、HTML
---

## バンドルとウェブフロントエンド

Needle Engineはウェブコンポーネントとして構築されています。
これは、プロジェクトに`@needle-tools/engine`をインストールし、`<needle-engine src="path/to/your.glb">`をウェブプロジェクト内のどこにでも含めるだけでよいことを意味します。

- npmを使用してインストール:
  `npm i @needle-tools/engine`

デフォルトのViteベースのプロジェクトテンプレートを使用すると、Needle Engineはデプロイ時にウェブアプリにバンドルされます。これにより、ファイルサイズの削減、Tree-shaking (Unityでのコードストリッピングに似ています)、ロード時間の最適化が保証されます。多数の小さなスクリプトやコンポーネントをダウンロードする代わりに、必要最小限のコードを含む1つまたは少数のファイルのみがダウンロードされます。

Vite (デフォルトのバンドラー) には、ウェブアプリをバンドルすべき理由の良い説明があります: [Why Bundle for Production](https://vitejs.dev/guide/why.html)

### Vite, Vue, React, Svelte, React Three Fiber...

Needle Engineは、使用するフレームワークの選択に偏りがありません。デフォルトのテンプレートは、一般的な[vite](https://vitejs.dev) をバンドラーとして使用しています。そこから、vue、svelte、nuxt、react、react-three-fiber、その他のフレームワークを追加でき、それらの多くに対するサンプルを用意しています。他のバンドラーを統合したり、全く使用しない（プレーンなHTMLとJavascriptのみを使用する）ことも可能です。

Needle Engineと共に使用できる、以下のような技術スタックの例をいくつか紹介します。

- **Vite + HTML** — これはデフォルトのテンプレートが使用しているものです！

- **Vite + Vue** — これは[Needle Tools](https://needle.tools) ウェブサイトが使用しているものです！ ダウンロード可能なサンプルは[こちら](https://github.com/needle-tools/needle-engine-samples)で見つけられます。
- **Vite + Svelte**
- **Vite + SvelteKit**
- **Vite + React** — プロジェクトを生成する際に選択できる、Unity統合に同梱された実験的なテンプレートがあります！
- **react-three-fiber** — プロジェクトを生成する際に選択できる、Unity統合に同梱された実験的なテンプレートがあります！
- **Vercel & Nextjs** — [Nextjsプロジェクトの例はこちら](https://github.com/needle-engine/nextjs-sample)で見つけられます。
- **CDN without any bundler** — コードの例は[こちら](./vanilla-js.md)で見つけられます。

要するに、現在提供しているのは最小限のviteテンプレートですが、これを拡張したり、他のフレームワークに切り替えたりすることができます。
どのような方法で構築しているか、あなたのユースケースにおけるエクスペリエンスをどのように改善できるか、または例を提供できるか、ぜひお知らせください！

:::tip
一部のフレームワークでは、`needle.config.json`にカスタム設定が必要です。[こちら](./reference/needle-config-json.md)で詳細を確認できます。通常、`baseUrl`を設定する必要があります。
:::

:::details Unityでカスタムプロジェクトテンプレートを作成するには？

他のバンドラー、ビルドシステムを使用したり、全く使用しないなど、独自のウェブプロジェクトテンプレートを作成して共有できます。

**新しいテンプレートの作成**
1. `Create/Needle Engine/Project Template`を選択して、テンプレートとして使用したいフォルダにProjectTemplateを追加します。
2. 完了です！ これほどシンプルです。

プロジェクトにNpmDefがある場合 (ローカル参照を使用している場合)、依存関係はunityから提供されます。
パッケージをnpmに公開し、バージョン番号で参照することも可能です。
:::

### Tree-shakingによるバンドルサイズの削減

Tree shakingとは、ウェブアプリケーションのバンドルに関する一般的なプラクティスです([MSDN docsを参照](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking))。これは、最終的なバンドルされたjavascriptファイルから、コードで使用されていないコードパスや機能が削除され、ファイルサイズを削減することを意味します。以下に、Needle Engineに含まれる機能で、それらを削除する方法について説明します。

:::details Rapier physics engineを削除するには？ (全体的なバンドルサイズを削減し、約2MB (~600KB gzipping時)を削減)

- **オプション1**: needlePlugins configを使用
  vite.configの`needlePlugins`で`useRapier`を`false`に設定します: `needlePlugins(command, needleConfig, { useRapier: false }),`

- **オプション2**: vite.define configを使用
  `NEEDLE_USE_RAPIER`定義を`false`で宣言します。
  ```js
  define: {
    NEEDLE_USE_RAPIER: false
  },
  ```

- **オプション3**: .envを使用
  ウェブプロジェクトに`.env`ファイルを作成し、`VITE_NEEDLE_USE_RAPIER=false`を追加します。

- **オプション4**: Unityコンポーネントを使用
  シーンに`Needle Engine Modules`コンポーネントを追加し、`Physics Engine`を`None`に設定します。
  ![](/imgs/unity-needle-engine-modules-physics.jpg)

:::

## PWAの作成

私たちのviteテンプレートから、Progressive Web App (PWA) を簡単に作成することをサポートしています。
PWAは、通常のウェブページやウェブサイトのようにロードされるウェブアプリケーションですが、オフラインでの動作、プッシュ通知、デバイスハードウェアへのアクセスなど、従来ネイティブモバイルアプリケーションでのみ利用可能だったユーザー機能を提供できます。

デフォルトでは、Needleで作成されたPWAはオフラインサポートを備えており、アプリの新しいバージョンを公開したときにオプションで自動的にリフレッシュできます。

1) ウェブプロジェクトに[Vite PWA plugin](https://vite-pwa-org.netlify.app/)をインストールします: `npm install vite-plugin-pwa --save-dev`
2) 以下のように`vite.config.js`を修正します。同じ`pwaOptions`オブジェクトを`needlePlugins`と`VitePWA`の両方に渡すようにしてください。

```js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async ({ command }) => {

    // Create the pwaOptions object.
    // You can edit or enter PWA settings here (e.g. change the PWA name or add icons).
    /** @type {import("vite-plugin-pwa").VitePWAOptions} */
    const pwaOptions = {};

    const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");

    return {
        plugins: [
            // pass the pwaOptions object to the needlePlugins and the VitePWA function
            needlePlugins(command, needleConfig, { pwa: pwaOptions }),
            VitePWA(pwaOptions),
        ],
        // the rest of your vite config...
```

:::tip デフォルトですべてのアセットはキャッシュされます
デフォルトでは、ビルドフォルダ内のすべてのアセットがPWAプリキャッシュに追加されることに注意してください。多くの動的なアセットを持つ大規模なアプリケーションの場合、これは望ましい動作ではないかもしれません（YouTube PWAがユーザーがアプリを開くたびにすべてのビデオをキャッシュすることを想像してください！）。この動作をカスタマイズする方法については、[More PWA Options](#more-pwa-options)を参照してください。
:::

### PWAのテスト

PWAをテストするには、ページをデプロイします。たとえば、`DeployToFTP`コンポーネントを使用します。
次に、デプロイされたページをブラウザで開き、PWA機能が期待通りに動作するか確認します。
- アプリがインストール可能として表示されるか
- アプリがオフラインで動作するか
- アプリが[pwabuilder.com](https://pwabuilder.com/)によってオフライン対応PWAとして検出されるか

PWAはService Workerを使用してリソースをキャッシュし、オフラインサポートを提供します。Service Workerは開発中に使用するのがやや難しく、通常はビルドに対してのみ有効になります（たとえば、`DeployTo...`コンポーネントを使用する場合）。

開発用にPWAサポートを有効にするには、`vite.config.js`のoptionsオブジェクトに以下を追加します。

```js
const pwaOptions = {
  // Note: PWAs behave different in dev mode.
  // Make sure to verify the behaviour in production builds!
  devOptions: {
    enabled: true,
  }
};
```

開発モードのPWAはオフライン使用をサポートしないことに注意してください。試みると予期しない動作を引き起こす可能性があります。

### 実行中のアプリを自動的に更新する

ウェブサイトは通常、ページをリフレッシュすると新しいコンテンツや更新されたコンテンツを表示します。

博物館、トレードショー、公共展示、またはその他の長期実行シナリオなど、新しいバージョンが公開されたときにページを自動的にリフレッシュして再ロードしたい場合があります。

自動更新を有効にするには、`pwaOptions`オブジェクトの`updateInterval`プロパティに、アプリが更新をチェックすべき期間（ミリ秒単位）を設定します。更新が検出されると、ページは自動的に再ロードされます。

```js
const pwaOptions = {
  updateInterval: 15 * 60 * 1000, // 15 minutes, in milliseconds
};
```

:::tip 定期的な再ロードとユーザーデータ
ユーザーがフォームや再ロードによって失われる可能性のある他のデータとやり取りするアプリケーションでは、自動再ロードを使用することは推奨されません。これらのアプリケーションでは、再ロードプロンプトを表示することが推奨されます。
自動再ロードの代わりに再ロードプロンプトを実装する方法の詳細については、[Vite PWA plugin documentation](https://vite-pwa-org.netlify.app/guide/prompt-for-update.html)を参照してください。
:::

### その他のPWAオプション

Needleは内部で[Vite PWA plugin](https://vite-pwa-org.netlify.app/)を使用しているため、提供されているすべてのオプションとフックを使用できます。
たとえば、カスタムのアプリタイトルやテーマカラーを持つ部分的なマニフェストを提供できます。

```js
const pwaOptions = {
  // manifest options provided here will override the defaults
  manifest: {
    name: "My App",
    short_name: "My App",
    theme_color: "#B2D464",
  }
};
```

部分的なキャッシング、カスタムService Worker、または異なる更新戦略のような複雑な要件の場合、`needlePlugins`から`{ pwa: pwaOptions }`オプションを削除し、Vite PWA pluginを介して直接PWA機能を追加できます。

## 外部javascriptからのNeedle Engineとコンポーネントへのアクセス

公開したコードは、バンドル後にJavaScriptからアクセスできます。これにより、編集中に既知のデータと実行時にのみ既知のデータ（動的にロードされるファイル、ユーザー生成コンテンツなど）が分離されているビューアやその他のアプリケーションを構築できます。
エンジンの外部の通常のjavascriptからコンポーネントにアクセスする方法については、[interop with regular javascript section](./scripting.md#accessing-needle-engine-and-components-from-anywhere)を参照してください。

## ローディング表示のカスタマイズ

[needle engine component reference](./reference/needle-engine-attributes.md)の*Loading Display*セクションを参照してください。

### ビルトインスタイル

needle-engineのローディング表示は、ライトまたはダークのスキンを使用できます。
表示を変更するには、`<needle-engine>`ウェブコンポーネントの`loading-style`属性を使用します。
オプションは`light`と`dark`（デフォルト）です。

``<needle-engine loading-style="light"></needle-engine>``

### カスタムローディングスタイル — *PRO feature* #

[needle engine component reference](./reference/needle-engine-attributes.md)の*Loading Display*セクションを参照してください。

![custom loading](/imgs/custom-loading-style.webp)


Page automatically translated using AI
AIによる自動翻訳ページ