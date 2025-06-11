---
lang: ja-JP
title: メルセデス・ベンツ ショーケース
editLink: false
---

## 概要

こんにちは、Kryštofです。私はNeedleについてのリサーチプロジェクトを実施しました。[当社](https://www.ishowroom.cz/home/)では、Needleがワークフローでどのように役立つかを判断したいと考えていました。当社には高級車を再販する地元のお客様がいます。すでにUnityを使用してモバイルアプリとVR体験を提供しました。Engineには約30台のユニークな車が準備されています。視覚的に魅力的なデジタルクローンとより多くの構成オプションを備えたクライアントのウェブサイトを拡張する計画があります。NeedleはUnityとウェブのビジュアル間で完璧な1:1変換を実現できます。これは当社のワークフローにとって非常に大きな利点となります。これがリサーチのきっかけとなったのです。


<sample src="https://engine.needle.tools/demos/mercedes-benz-demo/" />


## コンテキスト

私はjavascript、typescript、またはthree.jsの経験があまりありませんので、私の視点はウェブ体験を作成する最も簡単な方法を試している半経験的なUnity開発者としてのものです。Unity WebGLを提案される方もいるかもしれませんが、残念ながらそれは機能せず、モバイルブラウザでは柔軟性がありません。Needleは💚です。


## ライティング

当社のライティングモデルはUnityのリフレクションプローブに基づいています。ディレクショナルライトやポイントライトは必要なく、アンビエントライティングのみです。


このスカイボックスを使用しています。

 ![スカイボックス](/showcase-mercedes/1_skybox.png)

塗装は次のようになります。

![塗装](/showcase-mercedes/2_paintjob_simple.jpg)

さらに少しディテールを追加するために、わずかな強度（0.04）のディレクショナルライトを2つ追加して、スペキュラーハイライトを作成しました。以前は次のようになっていました。

![スペキュラーオフ](/showcase-mercedes/3_SpecularHighlights_off.jpg)

しかし、ディレクショナルライトを追加することで、より良いダイナミクスが加わりました。強度を高くすると効果を深めることができます。

![スペキュラーオン](/showcase-mercedes/4_SpecularHighlights_on.jpg)



## 背景

シーンは現在次のようになっています。

![背景なし](/showcase-mercedes/5_NoBackground.jpg)

黒い背景はあまり美しくありません。そこで、視覚的なスカイボックスとライティングのスカイボックスを区別するために、マップ全体を包み込む逆球体を追加しました。

![背景あり](/showcase-mercedes/6_MapBackground.png)

グラデーションに関しては、わずかなグレーからホワイトの色へ変化します。

この効果は、適切なUVマッピングと、グラデーションを定義する単一ピクセル高のテクスチャだけで簡単に作成できます。

シェーダーグラフでunlitシェーダーを作成しました。

![環境シェーダー](/showcase-mercedes/7_EnvShaderGraph.jpg)

カラーバンディングの問題に気づいたので、ディザリングを実装しようとしました。率直に言って、アーティファクトの改善には役立ちませんでしたが、その問題に対する簡単な解決策があるはずです。したがって、シェーダーの上部はオブジェクト空間のY軸に基づいてグラデーションをサンプリングします。そして、下部はカラーバンディングを打ち消そうとします。

シェーダーを使用することで、グラデーションの使用とイテレーションがより簡単になります。NeedleのShadergraph markdownアセットを使用すると、さらに簡単になります！🌵

![グラデーション](/showcase-mercedes/8_Gradiant.png)


## 車の擬似的な動き

現在のシーンは何も動かないため静的です。動きの擬似的な感覚を追加することで、これを打ち消すことができます。まず、ホイールに動きを追加することから始めましょう。

Rotatorと呼ばれるシンプルなコンポーネントで、軸と速度を定義します。

![Rotator](/showcase-mercedes/9_Rotator.png)
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export enum RotationAxis {
    X, Y, Z
}

export class Rotator extends Behaviour {
    //@type RotationAxis
    @serializable()
    axis : RotationAxis = RotationAxis.X;

    @serializable()
    speed : number = 1;

    update() {
        const angle = this.speed * this.context.time.deltaTime;
        switch(this.axis) {
            case RotationAxis.X:
                this.gameObject.rotateX(angle);
                break;
            case RotationAxis.Y:
                this.gameObject.rotateY(angle);
                break;
            case RotationAxis.Z:
                this.gameObject.rotateZ(angle);
                break;
        }
    }
}
```


ユーザーは今、何もない深淵を走行している車を見ています。色は何も似ておらず、体験は退屈です。モデルを地面に固定したいのですが、それはグリッドを追加し、それをシフトさせて車が動いているように見せることで実現できます。達成したいことは次のとおりです。

![モーション](/showcase-mercedes/10_WheelsAndGrid.png)

グリッドのシェーダーは2つの部分で構成されています。グリッドのシンプルなタイリングテクスチャと、エッジをフェードアウトさせるための円形グラデーションによって乗算される部分です。

![グリッド](/showcase-mercedes/11_GridShader.jpg)


## その他の要素

この技術デモは、車の機能を紹介することを目的としています。

まず、ホイールをハイライトすることから始めましょう。

![ホイールハイライト](/showcase-mercedes/12_WheelWithText.png)

このシェーダーを平面に追加すると、定義された速度で回転する破線の円が生成されます。ワールド空間UIと通常のTextコンポーネントを組み合わせることで、特定の製品の興味深い機能やパラメーターをハイライトできます。

![ホイールシェーダー](/showcase-mercedes/13_WheelShader.jpg)

ホイールの紹介の後、製品に関する広範な情報で締めくくりたいと思います。この場合、車のフルネームと、おそらく利用可能な構成になります。

![リアUI](/showcase-mercedes/14_RearUI.jpg)



## まとめ

Unityのタイムラインを使用することで、ホイールの破線とテキストが表示されるタイミングを制御できます。これはカメラアニメーションによって補完されます。


## 結論

Needle Engineは当社にとって非常に良い候補となりそうです！

いくつかの欠けている機能があります。

例えば、Lit Shader Graphsの適切なサポートなどです。しかし、three.jsの方法でシェーダーを作成し、当社のコンテンツチームがマテリアルを調整できるようにUnityで同様のシェーダーを作成することを妨げるものはありません。

Needleの使用は最高でした！🌵


---
このページはAIによって自動的に翻訳されました。