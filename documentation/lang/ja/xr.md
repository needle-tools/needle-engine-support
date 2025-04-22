---
title: VR & AR (WebXR)
---

## サポートされているデバイス

Needle Engineは、ARおよびVRを含む完全な[WebXR仕様](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)をサポートしています。WebXRは、没入型体験をWebにもたらす公式のWeb標準であり、Webのすべての利点があります。インストール、アプリストア、SDKは必要ありません。

ブラウザを搭載したすべてのデバイスは、Needleで作成されたアプリを実行できます。ブラウザがWebXRをサポートしている場合、Needle Engineに組み込まれているコンポーネントを使用して、アプリはXRでも自動的に動作します。これには、デスクトップブラウザ、モバイルブラウザ、多くのAR/VRヘッドセット上のブラウザだけでなく、Looking Glassディスプレイ、スマートグラスなどの他の新しいテクノロジーも含まれます。

:::tip USDZ/QuickLookによるアプリ不要のiOS ARサポート
iOSデバイスはまだ公式のWebXRサポートを持っていませんが、Needleは[Everywhere Actions](everywhere-actions.md)を使用してiOS上でAR体験を作成することをサポートしています。[iOSセクション](#augmented-reality-and-webxr-on-ios)で詳細を確認してください。Appleが設定している制限があっても、iOSデバイス上でシームレスにARで動作する、リッチでインタラクティブな体験を作成できます。

iOSでARモードに入ると、Needleは自動的にシーンをUSDZファイルに変換し、AppleのQuickLookを使用してARで表示されます。オブジェクト、マテリアル、オーディオ、アニメーション、Everywhere Actionsは保持されます。
:::

以下の表は、Needle Engineで動作することが確認されたデバイスの一部をリストしています。
WebXRをサポートする新しいデバイスが登場すると、すぐにアプリで動作します。これは、ブラウザをプラットフォームとして使用する大きな利点の1つです。互換性は特定のデバイスやSDKのセットに限定されません。

| ヘッドセットデバイス     | ブラウザ             | 注記                                                                                               |
| -------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| Apple Vision Pro     | ✔️ Safari            | ハンドトラッキング、トランジェントポインターのサポート                                                                     |
| Meta Quest 3         | ✔️ Meta Browser      | ハンドトラッキング、sessiongranted<sup>1</sup>のサポート、パススルー、深度センサー、メッシュトラッキング                                    |
| Meta Quest 3S        | ✔️ Meta Browser      | ハンドトラッキング、sessiongranted<sup>1</sup>のサポート、パススルー、深度センサー、メッシュトラッキング                                    |
| Meta Quest 2         | ✔️ Meta Browser      | ハンドトラッキング、sessiongranted<sup>1</sup>のサポート、パススルー（白黒）                                                      |
| Meta Quest 1         | ✔️ Meta Browser      | ハンドトラッキング、sessiongranted<sup>1</sup>のサポート                                                              |
| Meta Quest Pro       | ✔️ Meta Browser      | ハンドトラッキング、sessiongranted<sup>1</sup>のサポート、パススルー                                                              |
| Pico Neo 4           | ✔️ Pico Browser      | パススルー、ハンドトラッキング<sup>2</sup>                                                                           |
| Pico Neo 3           | ✔️ Pico Browser      | ハンドトラッキングなし、コントローラーのサムスティックが反転                                                                     |
| Oculus Rift 1/2      | ✔️ Chrome            |                                                                                                    |
| Valve Index          | ✔️ Chrome            |                                                                                                    |
| HTC Vive             | ✔️ Chrome            |                                                                                                    |
| Hololens 2           | ✔️ Edge              | ハンドトラッキング、ARおよびVRのサポート（VRモードでは背景もレンダリングされます）                                                              |

| モバイルデバイス      | ブラウザ                         | 注記                                                                                                                                                                |
| --------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android 10+     | ✔️ Chrome                        |                                                                                                                                                                   |
| Android 10+     | ✔️ Firefox                       |                                                                                                                                                                   |
| iOS 15+         | (✔️)<sup>3</sup> Safari<br/>(✔️)<sup>3</sup> Chrome | フルコードサポートなし、ただしNeedle [Everywhere Actions](everywhere-actions.md)が動的でインタラクティブなUSDZファイル作成をサポートしています。 |
| iOS 15+         | ✔️ WebXR Viewer                  | ブラウザは現在少し古くなっています                                                                                                                                            |
| Hololens 2      | ✔️ Edge                          |                                                                                                                                                                   |
| Hololens 1      | ❌                               | WebXRサポートなし                                                                                                                                                     |
| Magic Leap 2    | ✔️                               |                                                                                                                                                                   |
| Magic Leap 1    | ✔️                               | 非推奨デバイス                                                                                                                                                              |

| その他のデバイス                         | ブラウザ        | 注記                                                                                                                                              |
| ------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Looking Glass ホログラフィックディスプレイ | ✔️ Chrome       | Looking Glass bridgeと一部のカスタムコードが必要です、[サンプルを参照してください](https://engine.needle.tools/samples/looking-glass/)                                |
| Logitech MX Ink                      | ✔️ Meta Browser | 公式にサポートされています。[ドキュメントを参照してください](https://logitech.github.io/mxink/WebXR/WebXrIntegration.html#using-needle-tools) |

<sup>1</sup>: ブラウザフラグを有効にする必要があります: `chrome://flags/#webxr-navigation-permission`
<sup>2</sup>: 開発者設定でトグルを有効にする必要があります
<sup>3</sup>: [Everywhere Actions](everywhere-actions.md) または [その他のアプローチ](#augmented-reality-and-webxr-on-ios) を使用します

## VR、AR、およびQuickLookの例

[Needle Engineサンプル](https://engine.needle.tools/samples/?overlay=samples&tag=xr)にアクセスして、多くのインタラクティブな例を今すぐ試してみてください。または、以下の<kbd>QR Code</kbd>（電話用）または<kbd>Open on Quest</kbd>（Meta Questヘッドセット用）ボタンをクリックして、お使いのデバイスでライブで試してみてください。

<sample src="https://engine.needle.tools/samples/collaborative-sandbox/"/>

## シーンにVRおよびAR機能を追加する

Needle EngineのAR、VR、およびネットワーキング機能はモジュラー型に設計されています。それらのいずれもサポートしないことも、特定の機能のみを追加することも選択できます。

### 基本機能

1. **ARとVRを有効にする**
   `WebXR`コンポーネントを追加します。
   *オプション:* [アバター Prefab](#avatars) を参照してカスタムアバターを設定できます。
   デフォルトでは、基本的な`DefaultAvatar`が割り当てられています。

2. **テレポートを有効にする**
   テレポート可能なオブジェクト階層に`TeleportTarget`コンポーネントを追加します。
   特定のオブジェクトを除外するには、そのレイヤーを`IgnoreRaycasting`に設定します。

### マルチプレイヤー

1. **ネットワーキングを有効にする**
   `SyncedRoom`コンポーネントを追加します。

2. **デスクトップビューアの同期を有効にする**
   `SyncedCamera`コンポーネントを追加します。

3. **ボイスチャットを有効にする**
   `VoIP`コンポーネントを追加します。

:::tip シーン構造
これらのコンポーネントは、階層内のどこにでも配置できます。これらはすべて同じGameObjectに配置することも一般的です。
:::

 > **[Castle Builder](https://castle.needle.tools/)** は、クロスプラットフォームのマルチプレイヤーサンドボックス体験のために上記のすべてを使用しています。
 > — #madebyneedle 💚

### 特殊なARコンポーネント

1. **ARセッションのルートとスケールを定義する**
   ルートオブジェクトに`WebARSessionRoot`コンポーネントを追加します。AR体験では、シーンを現実世界に合わせてスケーリングしたいことがよくあります。
2. ARに入るときのシーンに対するユーザーのスケール（< 1で縮小、> 1で拡大）を定義する**ユーザーサイズ**を定義します。

### XRでのオブジェクト表示の制御

1. **オブジェクトがBrowser、AR、VR、First Person、Third Personで表示されるかどうかを定義する**
   制御したいオブジェクトに`XR Flag`コンポーネントを追加します。

2. **必要に応じてドロップダウンのオプションを変更します。**
   一般的な使用例は次のとおりです。
   - ARに入るときに床を非表示にする
   - First PersonまたはThird Personビューでアバターのパーツを非表示にする。たとえば、一人称視点では、自分の頭部モデルが見えるべきではありません。

### VRワールド間の移動

Needle Engineは[`sessiongranted`](https://github.com/immersive-web/navigation)状態をサポートしています。これにより、ユーザーは没入型セッションを離れることなく、WebXRアプリケーション間をシームレスに移動できます。つまり、VRまたはARに留まります。

現在、これはOculus Quest 1、2、3のOculus Browserでのみサポートされています。他のプラットフォームでは、ユーザーは現在の没入型セッションから強制終了され、新しいページで再度VRに入る必要があります。
ブラウザフラグを有効にする必要があります: `chrome://flags/#webxr-navigation-permission`

- **オブジェクトをクリックしてリンクを開く**
   非常に簡単に接続されたワールドを構築できる`OpenURL`コンポーネントを追加します。

## スクリプティング
XR用のスクリプティングについては、[スクリプティングXRドキュメント](./scripting.md#xr-event-methods)で詳細をご覧ください。

## アバター

現在、外部アバターシステムの統合はすぐに提供していませんが、アプリケーション固有のアバターやカスタムシステムを作成することは可能です。

- **カスタムアバターを作成する**
  - アバターのルートとして空のGameObjectを作成します
  - `Head`という名前のオブジェクトを追加し、Third Personに設定された`XRFlag`を追加します
  - `HandLeft`と`HandRight`という名前のオブジェクトを追加します
  - これらのオブジェクトの下にグラフィックスを追加します。

### 実験的なアバターコンポーネント

より表現力豊かなアバターを構築するための実験的なコンポーネントがいくつかあります。現時点では、これらのコンポーネントは後で変更または削除される可能性があるため、独自のバリアントを作成するために複製することをお勧めします。

![20220817-230858-87dG-Unity_PLjQ](https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif)
*基本的な首モデルと手足の制約を持つアバターリグの例*

- **ランダムプレイヤーカラー**
   アバターのカスタマイズの例として、レンダラーに`PlayerColor`コンポーネントを追加できます。
   このランダム化された色はプレイヤー間で同期されます。

- **目の回転**
   `AvatarEyeLook_Rotation`は、他のアバターとランダムなターゲットを追跡するようにGameObject（目）を回転させます。このコンポーネントはプレイヤー間で同期されます。

- **まばたき**
   `AvatarBlink_Simple`は、数秒ごとにGameObject（目）をランダムに非表示にし、まばたきをエミュレートします。

![image](https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png)
*アバターPrefab階層の例*

- **オフセット制約**
   `OffsetConstraint`を使用すると、アバター空間内の別のオブジェクトに対してオブジェクトをシフトできます。これにより、例えば、BodyがHeadに追従しながらも回転を水平に保つことができます。また、簡単な首モデルを構築することも可能です。

- **手足の制約**
   `BasicIKConstraint`は、2つのトランスフォームとヒントを受け取る非常にミニマルな制約です。これは、簡単な腕または脚のチェーンを構築するのに役立ちます。現在回転が適切に実装されていないため、腕や脚が「正しく見える」ためには、回転対称である必要がある場合があります。「Basic」と呼ばれるのはそのためです！

## ARでのHTMLコンテンツオーバーレイ

クライアントが通常のブラウザを使用しているか、ARまたはVRを使用しているかに応じて、異なるHTMLコンテンツを表示したい場合は、HTMLクラスのセットを使用するだけです。
これはHTML要素クラスによって制御されます。例えば、コンテンツをデスクトップとARで表示するには、`<needle-engine>`タグ内に``<div class="desktop ar"> ... </div>``を追加します。

```html
<needle-engine>
    <div class="desktop ar" style="pointer-events:none;">
        <div class="positioning-container">
          <p>ARとデスクトップ用のコンテンツはここにあります</p>
          <p class="only-in-ar">これはARでのみ表示されます</p>
        <div>
    </div>
</needle-engine>
```

コンテンツオーバーレイは、オプションの`dom-overlay`機能を使用して実装されており、通常、画面ベースのARデバイス（電話、タブレット）でサポートされています。

`.ar-session-active`クラスを使用して、ARセッション中に特定のコンテンツを表示/非表示にします。現時点では、[`:xr-overlay`疑似クラス](https://www.w3.org/TR/webxr-dom-overlays-1/#css-pseudo-class)は使用すべきではありません。なぜなら、これを使用するとMozillaのWebXR Viewerが壊れるためです。

```css
.only-in-ar {
  display: none;
}

.ar-session-active .only-in-ar {
  display:initial;
}
```

オーバーレイ要素は、適用されたスタイリングに関係なく、[XR中は常に全画面で表示される](https://www.w3.org/TR/webxr-dom-overlays-1/#ua-style-sheet-defaults)ことに注意する価値があります。アイテムを異なるように配置したい場合は、`class="ar"`要素の_内側_にコンテナを作成する必要があります。

<sample src="https://engine.needle.tools/samples-uploads/ar-overlay/"/>

## iOSでのARとWebXR

iOSデバイスでのAR体験は、Appleが現在iOSデバイスでWebXRをサポートしていないため、いくらか制限されています。

Needle Engineの[Everywhere Actions](everywhere-actions.md)は、このギャップを埋めるように設計されており、特定のコンポーネントで構成されたシーンに対して、iOSデバイスに自動的なインタラクティブ機能をもたらします。これらは、WebXRで利用可能な機能のサブセットをサポートしており、例えば空間オーディオ、画像トラッキング、アニメーションなどです。[ドキュメント](everywhere-actions.md)で詳細を確認してください。

:::tip QuickLookでのカスタムコードの制限
Appleは、QuickLookで使用できるコンテンツの種類に強力な制限を設けています。したがって、カスタムスクリプトコンポーネントは、iOSでのARでの使用のために自動的に変換することはできません。Everywhere Actions APIを使用して、特定の種類のカスタムコードのサポートを追加することは可能です。
:::

### 楽器 – WebXRとQuickLookのサポート

以下は、Everywhere Actionsを使用するため、ブラウザとiOSデバイスのARで動作する楽器の例です。
これは、空間オーディオ、アニメーション、およびタップインタラクションを使用しています。
<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Everywhere ActionsとiOS ARの他のオプション

iOSユーザーをさらに高機能なインタラクティブAR体験に導くための他のオプションもあります。

3. **コンテンツをオンザフライでUSDZファイルとしてエクスポートする。**
   これらのファイルは、iOSデバイスでARで表示できます。Everywhere Actionsを含むシーンからエクスポートされた場合、インタラクティビティは同じであり、製品コンフィギュレーター、ナラティブ体験などに十分すぎるほどです。
   例としては、[Castle Builder](https://castle.needle.tools)があり、そこで作成されたもの（ライブセッションではなく）をiOSでARで表示できます。

 > **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** はこのアプローチを使用しています。プレイヤーは画面上で協力してシーンにテキストを配置し、iOSでARで結果を表示できます。Androidでは、WebXRで直接インタラクトすることもできます。
 > — Katja Rempelによる#madewithneedle 💚

1. **iOSユーザーをWebXR対応ブラウザに誘導する。**
   ターゲットオーディエンスによっては、例えばMozillaの[WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056)など、iOSユーザーをiOSでAR体験ができるWebXR対応ブラウザに誘導することができます。

2. **iOSデバイスでカメラアクセスとカスタムアルゴリズムを使用する。**
   カメラ画像のアクセスを要求し、カスタムアルゴリズムを実行してデバイスのポーズを決定することができます。
   現在、これに対する組み込みコンポーネントは提供していませんが、将来試したいライブラリとフレームワークへのいくつかの参照を以下に示します。
   - [AR.js](https://github.com/AR-js-org/AR.js) (オープンソース)
     - FireDragonGameStudioによる[実験的なAR.js統合](https://github.com/FireDragonGameStudio/NeedleAndARjs)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (オープンソース)
   - [8th Wall](https://www.8thwall.com/) (商用)

## 画像トラッキング

Needle Engineは、Androidで**WebXR Image Tracking**（[ライブデモ](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)）を、iOSで**QuickLook Image Tracking**をサポートしています。

追加のドキュメントは、[Everywhere Actions](everywhere-actions.md#image-tracking)セクションにあります。

:::warning WebXR Image Trackingはまだ「ドラフト」段階であり、一般には利用できません
これまでのところ、ブラウザベンダーはWebXRの最終的な画像トラッキングAPIについて合意できていません。仕様が「ドラフト」段階にある限り（[Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)）、
あなたとあなたのアプリのユーザーは、AndroidデバイスでWebXR ImageTrackingを有効にするために以下の手順に従う必要があります。
1. Android Chromeブラウザで``chrome://flags``にアクセスします。
2. `WebXR Incubations`オプションを見つけて有効にします。
:::

その仕様がなくても、カメラ画像のアクセスを要求し、カスタムアルゴリズムを実行してデバイスのポーズを決定することは可能です。欠点は、ユーザーがカメラアクセスなどの追加の許可を受け入れる必要があること、およびトラッキングがデバイスのネイティブ機能ほど正確にならないことです。

以下は、カメラアクセスとローカルコンピュータビジョンアルゴリズムに基づいた画像トラッキングを追加するためのライブラリです。
- FireDragonGameStudioによる[Needle Engineとの実験的なAR.js統合](https://github.com/FireDragonGameStudio/NeedleAndARjs)
- [AR.js](https://github.com/AR-js-org/AR.js) (オープンソース)
- [Mind AR](https://github.com/hiukim/mind-ar-js) (オープンソース)

## 参考資料

[WebXR Device API](https://www.w3.org/TR/webxr/)
[caniuse: WebXR](https://caniuse.com/webxr)
[Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)

このページはAIによって自動的に翻訳されました