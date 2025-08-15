---
title: Needle EngineでのWebXR画像トラッキング
---

## WebXR画像トラッキングとは
**WebXR画像トラッキングは、ブラウザがデバイスのカメラを通して現実世界で特定の画像を検出し、追跡することを可能にし、リアルタイムの位置と向きのデータを提供して、ポスター、パッケージ、アートワークなどの物理的なマーカーに仮想コンテンツを正確に固定します。**

カメラを認識された画像に向けることで、画像トラッキングAPIは、仮想要素と物理要素間の空間的関係を継続的に更新し、デバイスや画像が移動しても適切なアライメントを保証します。

画像トラッキングは、静止画像をインタラクティブなARトリガーに変えます。これにより、美術館の絵画に重ねられた情報を表示したり、製品パッケージが3Dアニメーションを प्रकटしたり、名刺にフローティング連絡先詳細を表示したりすることが、すべてWeb標準を介して可能になります。ユーザーは専用アプリをダウンロードする必要がなく、互換性のある任意のWebブラウザを通じてAR体験に即座にアクセスできます。

## デモ

Needle Engineは、Androidで**WebXR Image Tracking**（[ライブデモ](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)）を、iOSで**QuickLook Image Tracking**をサポートしています。

以下のシーンをARで開始し、スマートフォンのカメラを画面上の画像マーカーに向けるか、それを印刷してください。

:::info AndroidでのWebXR画像トラッキング
**Androidの場合**、「WebXR Incubations」をChrome Flagsでオンにしてください。これらは、AndroidスマートフォンのChromeブラウザのアドレスバーに[chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations)を貼り付けることで見つけることができます。
:::

<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="画像マーカー" width=300 />

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />

## 解説

:::warning WebXR画像トラッキングはまだ「ドラフト」段階であり、一般には利用できません。
今のところ、ブラウザベンダーはWebXR用の最終的な画像トラッキングAPIについて合意できていません。仕様が「ドラフト」段階（[マーカートラッキング解説](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)）にある限り、
ユーザーとアプリの利用者は、AndroidデバイスでWebXR ImageTrackingを有効にするために以下の手順を踏む必要があります。
1. Android Chromeブラウザで``chrome://flags``にアクセスします。
2. `WebXR Incubations`オプションを見つけて有効にします。
:::

この仕様がなくても、カメラ画像へのアクセスを要求し、カスタムアルゴリズムを実行してデバイスのポーズを決定することは可能です。欠点は、ユーザーがカメラアクセスのような追加のパーミッションを受け入れる必要があり、トラッキングがデバイスのネイティブ機能ほど正確ではないことです。

カメラアクセスとローカルのコンピュータビジョンアルゴリズムに基づいて画像トラッキングを追加するためのライブラリをいくつか紹介します。
- FireDragonGameStudioによる[Needle Engineとの実験的なAR.js統合](https://github.com/FireDragonGameStudio/NeedleAndARjs)
- [AR.js](https://github.com/AR-js-org/AR.js) (オープンソース)
- [Mind AR](https://github.com/hiukim/mind-ar-js) (オープンソース)

### 統合
画像トラッキングは、オブジェクトにWebXRImageTrackingコンポーネントを追加することで、UnityとBlenderの両方で設定できます。その後、画像を`Tracked Images`配列に追加します。

![Unityのスクリーンショット](/imgs/webxr-image-tracking-unity-component.jpg)
*Unityの画像トラッキングコンポーネント*

![Blenderのスクリーンショット](/imgs/webxr-image-tracking-blender-component.jpg)
*Blenderの画像トラッキングコンポーネント*

## 参考文献

- [WebXR Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)
- [WebXR Device API](https://www.w3.org/TR/webxr/)
- [caniuse: WebXR](https://caniuse.com/webxr)
- [Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)

## さらに読む
- [Needle Everywhere Actions](./everywhere-actions.md) *どこでも実行できる体験*
- [XRドキュメント](./xr.md)

このページはAIによって自動翻訳されました