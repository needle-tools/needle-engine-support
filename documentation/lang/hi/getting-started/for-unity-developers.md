---
title: Unity डेवलपर्स के लिए स्क्रिप्टिंग परिचय
---

Needle Engine यूनिटी एडिटर के साथ गहरा एकीकरण प्रदान करता है। यह डेवलपर्स और डिजाइनरों दोनों को परिचित वातावरण में एक साथ काम करने और तेज़, प्रदर्शनकारी और हल्के वेब अनुभव प्रदान करने की अनुमति देता है।

निम्नलिखित गाइड मुख्य रूप से Unity3D पृष्ठभूमि वाले डेवलपर्स के लिए है, लेकिन यह वेब या three.js पृष्ठभूमि वाले डेवलपर्स के लिए भी उपयोगी हो सकती है। यह इस बात पर ध्यान केंद्रित करता है कि Unity में चीजें कैसे की जाती हैं बनाम three.js या Needle Engine में।

यदि आप Typescript और Javascript के लिए बिल्कुल नए हैं और आप Needle Engine के लिए स्क्रिप्ट लिखने में गहराई से उतरना चाहते हैं तो हम C# और Javascript/Typescript के बीच के अंतर की मूल समझ के लिए [Typescript Essentials Guide](./typescript-essentials) को पढ़ने की भी सलाह देते हैं।

यदि आप कोड-साथ करना चाहते हैं तो आप एक छोटा प्रोजेक्ट बनाने के लिए [engine.needle.tools/new](https://engine.needle.tools/new) खोल सकते हैं जिसे आप ब्राउज़र में संपादित कर सकते हैं ⚡

## मूल बातें
Needle Engine [three.js](https://threejs.org/) के ऊपर चलने वाला एक 3d वेब इंजन है। Three.js वेब के लिए सबसे लोकप्रिय 3D webgl-आधारित रेंडरिंग लाइब्रेरी में से एक है। जब भी हम Needle Engine में किसी `gameObject` का उल्लेख करते हैं तो हम *वास्तव में* एक three.js `Object3D` के बारे में भी बात कर रहे होते हैं, जो three.js में किसी भी ऑब्जेक्ट का मूल प्रकार है। दोनों शब्दों का परस्पर उपयोग किया जा सकता है। कोई भी `gameObject` एक `Object3D` *है*।

इसका मतलब यह भी है कि - यदि आप पहले से ही three.js से परिचित हैं - तो आपको Needle Engine का उपयोग करने में बिल्कुल भी समस्या नहीं होगी। three.js के साथ आप जो कुछ भी कर सकते हैं वह Needle Engine में भी किया जा सकता है। यदि आप पहले से ही कुछ लाइब्रेरी का उपयोग कर रहे हैं तो आप उन्हें Needle Engine-आधारित वातावरण में भी उपयोग कर पाएंगे।

ध्यान दें: **Needle Engine का Exporter आपके मौजूदा C# कोड को Web Assembly में संकलित *नहीं* करता है**।
जबकि Web Assembly का उपयोग रनटाइम पर बेहतर प्रदर्शन दे सकता है, यह वेब अनुभव बनाने में पुनरावृति गति और लचीलेपन के लिए उच्च लागत पर आता है। हमारे [विजन](./../vision.md) और [तकनीकी अवलोकन](./../technical-overview.md) के बारे में और पढ़ें।

:::details Needle Engine के साथ नया Unity प्रोजेक्ट कैसे बनाएं? (वीडियो)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />
:::

## एक कॉम्पोनेन्ट बनाना
Unity में आप `MonoBehaviour` से व्युत्पन्न करके एक नया कॉम्पोनेन्ट बनाते हैं:
```csharp
using UnityEngine;
public class MyComponent : MonoBehaviour {
}
```

दूसरी ओर Needle Engine में एक कस्टम कॉम्पोनेन्ट इस प्रकार लिखा जाता है:
```ts twoslash
import { Behaviour } from "@needle-tools/engine"
export class MyComponent extends Behaviour {
}
```
## स्क्रिप्ट फ़ील्ड्स

### serializable
यदि आपने कुछ Needle Engine स्क्रिप्ट देखी हैं, तो आपने देखा होगा कि कुछ वेरिएबल्स को उनकी घोषणा के ऊपर `@serializable` के साथ एनोटेट किया गया है। यह Typescript में एक Decorator है और इसका उपयोग कोड को संशोधित या एनोटेट करने के लिए किया जा सकता है। Needle Engine में इसका उपयोग उदाहरण के लिए कोर क्रमबद्धता को यह बताने के लिए किया जाता है कि जब वह glTF में संग्रहीत कच्चे कॉम्पोनेन्ट जानकारी से एक कॉम्पोनेन्ट इंस्टेंस में परिवर्तित होता है तो हम अपनी स्क्रिप्ट में किन प्रकारों की उम्मीद करते हैं।
निम्नलिखित उदाहरण पर विचार करें:
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

class SomeClass extends Behaviour{
    @serializable(Behaviour)
    myOtherComponent?: Behaviour;
    @serializable(Object3D)
    someOtherObject?: Object3D;
}
```
यह Needle Engine को बताता है कि `myOtherComponent` को `Behaviour` प्रकार का होना चाहिए। जब आपका दृश्य लोड होता है तो यह स्वचालित रूप से फ़ील्ड को सही संदर्भ असाइन करेगा। `someOtherObject` के लिए भी यही सच है जहां हम `Object3D` संदर्भ में डीसेरियलाइज़ करना चाहते हैं।

ध्यान दें कि कुछ मामलों में प्रकार को छोड़ा जा सकता है। यह [Javascript में सभी प्रिमिटिव प्रकारों](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) के लिए किया जा सकता है। ये `boolean`, `number`, `bigint`, `string`, `null` और `undefined` हैं।
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    @serializable() // < फ़ील्ड प्रकार प्रिमिटिव होने के कारण यहाँ किसी प्रकार की आवश्यकता नहीं है
    myString?: string;
}
```

### public vs private
`private`, `public` या `protected` जैसे किसी भी एक्सेस संशोधक के बिना फ़ील्ड्स जावास्क्रिप्ट में डिफ़ॉल्ट रूप से `public` होंगे
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    /// no accessor means it is public:
    myNumber?: number;
    // explicitly making it private:
    private myPrivateNumber?: number;
    protected myProtectedNumber?: number;
}
```
यही विधियों के लिए भी सच है।

## GameObjects और सीन
एक कॉम्पोनेन्ट से वर्तमान सीन तक पहुंचने के लिए आप `this.scene` का उपयोग करते हैं जो `this.context.scene` के बराबर है, यह आपको रूट three.js सीन ऑब्जेक्ट देता है।

एक कॉम्पोनेन्ट से पदानुक्रम को ट्रैवर्स करने के लिए आप किसी ऑब्जेक्ट के बच्चों पर पुनरावृति कर सकते हैं
for लूप के साथ:
```ts twoslash
for (let i = 0; i < this.gameObject.children; i++) {
    console.log(this.gameObject.children[i]);
}
```
या आप `foreach` समकक्ष का उपयोग करके पुनरावृति कर सकते हैं:
```ts twoslash
for (const child of this.gameObject.children) {
    console.log(child);
}
```
आप `traverse` विधि का उपयोग करके सभी वस्तुओं को पुनरावृति करने के लिए three.js विशिष्ट विधियों का भी उपयोग कर सकते हैं:
```ts twoslash
import { GameObject } from "@needle-tools/engine";
//---cut-before---
this.gameObject.traverse((obj: GameObject) => console.log(obj))
```
या केवल दृश्यमान वस्तुओं को ट्रैवर्स करने के लिए इसके बजाय [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) का उपयोग करें।

एक और विकल्प जो बहुत उपयोगी है जब आप केवल रेंडर करने योग्य वस्तुओं को पुनरावृति करना चाहते हैं तो आप सभी रेंडरर कॉम्पोनेन्ट को क्वेरी कर सकते हैं और उन पर इस तरह से पुनरावृति कर सकते हैं:
```ts twoslash
import { Renderer } from "@needle-tools/engine";

for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
कॉम्पोनेन्ट प्राप्त करने के बारे में अधिक जानकारी के लिए अगला अनुभाग देखें।

## कॉम्पोनेन्ट
Needle Engine एक कॉम्पोनेन्ट सिस्टम का भारी उपयोग कर रहा है जो Unity के समान है। इसका मतलब है कि आप सीन में किसी भी `Object3D` / `GameObject` में कॉम्पोनेन्ट जोड़ या हटा सकते हैं। `addNewComponent(<Object3D>, <ComponentType>)` का उपयोग करते समय एक कॉम्पोनेन्ट इंजन के साथ पंजीकृत किया जाएगा।
संलग्न कॉम्पोनेन्ट के इवेंट मेथड को तब इंजन द्वारा स्वचालित रूप से बुलाया जाएगा (जैसे `update` या `onBeforeRender`)। इवेंट मेथड की पूरी सूची [स्क्रिप्टिंग डॉक्यूमेंटेशन](../scripting.md#lifecycle-methods) में पाई जा सकती है

#### सीन में कॉम्पोनेन्ट ढूँढना
कॉम्पोनेन्ट प्राप्त करने के लिए आप Unity के समान परिचित विधियों का उपयोग कर सकते हैं। ध्यान दें कि निम्नलिखित एक उदाहरण के रूप में `Animator` प्रकार का उपयोग करता है, लेकिन आप किसी भी कॉम्पोनेन्ट प्रकार का उपयोग कर सकते हैं जो या तो बिल्ट-इन है या आपके द्वारा बनाया गया है।
| विधि का नाम | विवरण |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | GameObject/Object3D पर `Animator` कॉम्पोनेन्ट प्राप्त करें। यदि इसमें Animator कॉम्पोनेन्ट है तो यह `Animator` इंस्टेंस लौटाएगा या यदि ऑब्जेक्ट में ऐसा कोई कॉम्पोनेन्ट नहीं है तो `null` लौटाएगा। |
| `this.gameObject.getComponentInChildren(Animator)` | GameObject/Object3D पर या उसके किसी बच्चे पर पहला `Animator` कॉम्पोनेन्ट प्राप्त करें
| `this.gameObject.getComponentsInParents(Animator)` | पैरेंट पदानुक्रम में सभी animator कॉम्पोनेन्ट प्राप्त करें (वर्तमान GameObject/Object3D सहित)

ये विधियां स्टैटिक GameObject प्रकार पर भी उपलब्ध हैं। उदाहरण के लिए ``GameObject.getComponent(this.gameObject, Animator)`` पास किए गए GameObject/Object3D पर `Animator` कॉम्पोनेन्ट प्राप्त करने के लिए।

एक या अधिक कॉम्पोनेन्ट के लिए पूरे सीन को खोजने के लिए आप ``GameObject.findObjectOfType(Animator)`` या `GameObject.findObjectsOfType(Animator)` का उपयोग कर सकते हैं।

## नाम बदले गए Unity प्रकार
हमारे इंजन में कुछ Unity-विशिष्ट प्रकारों को अलग-अलग प्रकार के नामों पर मैप किया गया है। निम्नलिखित सूची देखें:

| Unity में प्रकार | Needle Engine में प्रकार |  |
| -- | -- | -- |
| `UnityEvent` | `EventList` | एक UnityEvent को `EventList` प्रकार के रूप में निर्यात किया जाएगा (`UnityEvents` को डीसेरियलाइज़ करने के लिए `serializable(EventList)` का उपयोग करें) |
| `GameObject` | `Object3D` | |
| `Transform` | `Object3D` | three.js और Needle Engine में एक GameObject और एक Transform समान हैं (कोई `Transform` कॉम्पोनेन्ट नहीं है)। इस नियम का एकमात्र अपवाद `RectTransform` को संदर्भित करना है जो Needle Engine में भी एक कॉम्पोनेन्ट है। |
| `Color` | `RGBAColor` | three.js रंग प्रकार में अल्फा प्रॉपर्टी नहीं होती है। इस कारण से Unity से निर्यात किए गए सभी Color प्रकारों को `RGBAColor` के रूप में निर्यात किया जाएगा जो एक कस्टम Needle Engine प्रकार है |

## Transform
Transform डेटा को सीधे `GameObject` / `Object3D` पर एक्सेस किया जा सकता है। Unity के विपरीत, ऐसा कोई अतिरिक्त transform कॉम्पोनेन्ट नहीं है जो इस डेटा को धारण करता हो।
- ``this.gameObject.position`` स्थानीय स्पेस में Vector3 [position](https://threejs.org/docs/?q=obj#api/en/core/Object3D.position) है
- ``this.gameObject.worldPosition`` वर्ल्ड स्पेस में Vector3 position है
- ``this.gameObject.rotation`` स्थानीय स्पेस में [euler rotation](https://threejs.org/docs/?q=obj#api/en/core/Object3D.rotation) है
- ``this.gameObject.worldRotation`` वर्ल्ड स्पेस में euler कोणों में euler rotation है
- ``this.gameObject.quaternion`` - स्थानीय स्पेस में [quaternion rotation](https://threejs.org/docs/?q=obj#api/en/core/Object3D.quaternion) है
- ``this.gameObject.worldQuaternion`` वर्ल्ड स्पेस में quaternion rotation है
- ``this.gameObject.scale`` - स्थानीय स्पेस में Vector3 [scale](https://threejs.org/docs/?q=obj#api/en/core/Object3D.scale) है
- ``this.gameObject.worldScale`` वर्ल्ड स्पेस में Vector3 scale है

यहां ध्यान रखने योग्य मुख्य अंतर यह है कि three.js में `position` डिफ़ॉल्ट रूप से एक स्थानीय स्पेस स्थिति है, जबकि Unity में `position` वर्ल्ड स्पेस होगी और स्थानीय स्पेस स्थिति का जानबूझकर उपयोग करने के लिए `localPosition` का उपयोग किया जाएगा।

यदि आप Needle Engine में वर्ल्ड निर्देशांक तक पहुंचना चाहते हैं तो हमारे पास यूटिलिटी विधियां हैं जिनका उपयोग आप अपनी वस्तुओं के साथ कर सकते हैं। वर्ल्ड स्थिति की गणना करने के लिए `getWorldPosition(yourObject)` कॉल करें। रोटेशन/क्वाटरनियन और स्केल के लिए समान विधियां मौजूद हैं। उन विधियों तक पहुंचने के लिए उन्हें Needle Engine से आयात करें जैसे `import { getWorldPosition } from "@needle.tools/engine"`

ध्यान दें कि `getWorldPosition`, `getWorldRotation`, `getWorldScale` जैसी ये यूटिलिटी विधियां आंतरिक रूप से Vector3 इंस्टेंस का बफ़र रखती हैं और इनका उपयोग केवल स्थानीय रूप से किया जाना है। इसका मतलब है कि आपको उन्हें अपने कॉम्पोनेन्ट में कैश नहीं करना चाहिए, अन्यथा आपका कैश किया गया मान अंततः ओवरराइड हो जाएगा। लेकिन एक ही इंस्टेंस का दोबारा उपयोग करने की चिंता किए बिना गणना करने के लिए अपने फ़ंक्शन में `getWorldPosition` को कई बार कॉल करना सुरक्षित है। यदि आप निश्चित नहीं हैं कि इसका क्या मतलब है तो आपको [Typescript Essentials Guide](./typescript-essentials.md#primitive-types) में **प्रिमिटिव प्रकार** अनुभाग देखना चाहिए।

## Time
समय डेटा तक पहुंचने के लिए `this.context.time` का उपयोग करें:
- `this.context.time.time` एप्लिकेशन के चलने के बाद से का समय है
- `this.context.time.deltaTime` अंतिम फ्रेम के बाद से बीता हुआ समय है
- `this.context.time.frameCount` एप्लिकेशन के शुरू होने के बाद से गुजरे हुए फ्रेम की संख्या है
- `this.context.time.realtimeSinceStartup` एप्लिकेशन के शुरू होने के बाद से का अस्केल किया गया समय है

जानबूझकर समय को धीमा करने के लिए `this.context.time.timeScale` का उपयोग करना भी संभव है, जैसे स्लो मोशन प्रभाव के लिए।

## Raycasting
Raycast करने और इंटरसेक्शन की सूची प्राप्त करने के लिए ``this.context.physics.raycast()`` का उपयोग करें। यदि आप कोई विकल्प पास नहीं करते हैं तो raycast स्क्रीनस्पेस में माउस स्थिति (या पहली स्पर्श स्थिति) से ​​वर्तमान में सक्रिय `mainCamera` का उपयोग करके किया जाता है। आप एक `RaycastOptions` ऑब्जेक्ट भी पास कर सकते हैं जिसमें विभिन्न सेटिंग्स होती हैं जैसे `maxDistance`, उपयोग करने के लिए कैमरा या जिस लेयर के विरुद्ध परीक्षण किया जाना है।

[three.js ray](https://threejs.org/docs/#api/en/math/Ray) का उपयोग करके raycast करने के लिए ``this.context.physics.raycastFromRay(your_ray)`` का उपयोग करें

ध्यान दें कि उपरोक्त कॉल डिफ़ॉल्ट रूप से दृश्यमान दृश्य ऑब्जेक्ट के विरुद्ध raycast कर रहे हैं। यह Unity से अलग है जहाँ आपको ऑब्जेक्ट को हिट करने के लिए हमेशा कोलाइडर की आवश्यकता होती है। डिफ़ॉल्ट three.js समाधान के दोनों फायदे और नुकसान हैं, जिसमें एक बड़ा नुकसान यह है कि यह आपके दृश्य ज्यामिति के आधार पर काफी धीमी गति से प्रदर्शन कर सकता है। यह विशेष रूप से स्किन्ड जाल के विरुद्ध raycasting करते समय धीमा हो सकता है। इसलिए आमतौर पर Unity में SkinnedMeshRenderers वाले ऑब्जेक्ट को `Ignore Raycast` लेयर पर सेट करने की सलाह दी जाती है जिसे Needle Engine द्वारा भी डिफ़ॉल्ट रूप से अनदेखा किया जाएगा।

एक और विकल्प फिजिक्स रेकास्ट विधियों का उपयोग करना है जो केवल दृश्य में कोलाइडर के साथ हिट लौटाएगा।

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

यहाँ फिजिक्स रेकास्ट के लिए एक संपादन योग्य [उदाहरण](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore) है

## Input
इनपुट स्थिति को पोल ​​करने के लिए ``this.context.input`` का उपयोग करें:

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update(){
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN")
        }
    }
}
```

आप ``InputEvents`` एनम में इवेंट्स की सदस्यता भी ले सकते हैं:
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable(){
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }
    onDisable() {
        // यह अनुशंसा की जाती है कि आपका कॉम्पोनेन्ट निष्क्रिय होने पर इवेंट से सदस्यता समाप्त कर लें
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    inputPointerDown = (evt: NEPointerEvent) => { console.log(evt); }
}
```

यदि आप स्वयं इनपुट संभालना चाहते हैं तो आप [ब्राउज़र द्वारा प्रदान किए जाने वाले सभी इवेंट्स](https://developer.mozilla.org/en-US/docs/Web/Events) (वहाँ बहुत सारे हैं) की सदस्यता भी ले सकते हैं। उदाहरण के लिए ब्राउज़र के क्लिक इवेंट की सदस्यता लेने के लिए आप लिख सकते हैं:
```ts twoslash
window.addEventListener("click", () => { console.log("MOUSE CLICK"); });
```
ध्यान दें कि इस मामले में आपको सभी मामलों को स्वयं संभालना होगा। उदाहरण के लिए यदि आपका उपयोगकर्ता डेस्कटॉप, मोबाइल या VR डिवाइस पर आपकी वेबसाइट पर आ रहा है तो आपको अलग-अलग इवेंट्स का उपयोग करने की आवश्यकता हो सकती है। इन मामलों को Needle Engine इनपुट इवेंट्स द्वारा स्वचालित रूप से संभाला जाता है (उदाहरण के लिए `PointerDown` माउस डाउन, टच डाउन और VR के मामले में कंट्रोलर बटन डाउन के लिए उठाया जाता है)।

## InputSystem Callbacks
Unity के समान (Unity में [IPointerClickHandler](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html) देखें) आप कॉम्पोनेन्ट पर इनपुट इवेंट प्राप्त करने के लिए भी पंजीकरण कर सकते हैं।

इसे काम करने के लिए सुनिश्चित करें कि आपकी वस्तु में पैरेंट पदानुक्रम में ``ObjectRaycaster`` या ``GraphicRaycaster`` कॉम्पोनेन्ट है।

```ts twoslash
import { Behaviour, IPointerEventHandler, PointerEventData } from "@needle-tools/engine";

export class ReceiveClickEvent extends Behaviour implements IPointerEventHandler {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```

नोट: `IPointerEventHandler` ऑब्जेक्ट को सभी संभावित पॉइंटर इवेंट्स की सदस्यता देता है। उनके हैंडलर हैं:
- `onPointerDown`
- `onPointerUp`
- `onPointerEnter`
- `onPointerMove`
- `onPointerExit`
- `onPointerClick`

सभी में इवेंट का वर्णन करने वाला एक `PointerEventData` आर्गुमेंट होता है।

## Debug.Log
जावास्क्रिप्ट में `Debug.Log()` के बराबर `console.log()` है। आप `console.warn()` या `console.error()` का भी उपयोग कर सकते हैं।
```ts twoslash
import { GameObject, Renderer } from "@needle-tools/engine";
const someVariable = 42;
// ---cut-before---

console.log("Hello web");
// आप जितने चाहें उतने आर्गुमेंट पास कर सकते हैं जैसे:
console.log("Hello", someVariable, GameObject.findObjectOfType(Renderer), this.context);
```

## Gizmos
Unity में आपको आम तौर पर Gizmos जैसे `OnDrawGizmos` या `OnDrawGizmosSelected` खींचने के लिए विशेष विधियों का उपयोग करना पड़ता है। दूसरी ओर Needle Engine में ऐसी विधियां मौजूद नहीं हैं और आप अपनी स्क्रिप्ट में कहीं से भी gizmos खींचने के लिए स्वतंत्र हैं। ध्यान दें कि फिर उन्हें e.g. आपके परिनियोजित वेब एप्लिकेशन में *नहीं* खींचने की जिम्मेदारी भी आपकी है (आप उन्हें `if(isDevEnvironment)) के द्वारा फ़िल्टर कर सकते हैं)।

यहाँ एक सेकंड के लिए लाल वायर स्फेयर खींचने का एक उदाहरण दिया गया है, उदाहरण के लिए वर्ल्ड स्पेस में एक बिंदु का विज़ुअलाइज़ेशन
```ts twoslash
import { Vector3 } from "three";
const hit = { point: new Vector3(0, 0, 0) };
// ---cut-before---
import { Gizmos } from "@needle-tools/engine";
Gizmos.DrawWireSphere(hit.point, 0.05, 0xff0000, 1);
```
यहाँ कुछ उपलब्ध gizmo विधियाँ दी गई हैं:
| विधि का नाम |  |
| --- | --- |
| `Gizmos.DrawArrow` | |
| `Gizmos.DrawBox` | |
| `Gizmos.DrawBox3` | |
| `Gizmos.DrawDirection` | |
| `Gizmos.DrawLine` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawSphere` | |
| `Gizmos.DrawWireSphere` | |

## उपयोगी यूटिलिटी विधियाँ

`@needle-tools/engine` से आयात करें, उदाहरण के लिए `import { getParam } from "@needle-tools/engine"`

| विधि का नाम | विवरण |
| --- | --- |
| `getParam()` | जाँचता है कि url पैरामीटर मौजूद है या नहीं। यदि यह मौजूद है लेकिन इसका कोई मान नहीं है (जैसे `?help`), तो true लौटाता है, यदि यह url में नहीं पाया जाता है या 0 पर सेट है (जैसे `?help=0`), तो false लौटाता है, अन्यथा यह मान लौटाता है (जैसे `?message=test`) |
| `isMobileDevice()` | यदि ऐप को मोबाइल डिवाइस से एक्सेस किया जा रहा है तो true लौटाता है |
| `isDevEnvironment()` | यदि वर्तमान ऐप स्थानीय सर्वर पर चल रहा है तो true लौटाता है |
| `isMozillaXR()` | |
| `isiOS` | |
| `isSafari` | |

```ts twoslash
import { isMobileDevice } from "@needle-tools/engine"
if( isMobileDevice() )
```

```ts twoslash
import { getParam } from "@needle-tools/engine"
// true लौटाता है
const myFlag = getParam("some_flag")
console.log(myFlag)
```

## वेब प्रोजेक्ट
C# में आप आमतौर पर एक समाधान के साथ काम करते हैं जिसमें एक या कई प्रोजेक्ट होते हैं। Unity में यह समाधान आपके लिए Unity द्वारा प्रबंधित किया जाता है और जब आप C# स्क्रिप्ट खोलते हैं तो यह प्रोजेक्ट खोलता है और आपको फ़ाइल दिखाता है।
आप आमतौर पर Unity के बिल्ट-इन पैकेज मैनेजर का उपयोग करके पैकेज इंस्टॉल करते हैं ताकि Unity या अन्य डेवलपर्स (या तो आपकी टीम में या उदाहरण के लिए Unity के AssetStore के माध्यम से) द्वारा प्रदान की जाने वाली सुविधाओं को जोड़ा जा सके। Unity अपने PackageManager के साथ पैकेज जोड़ना और प्रबंधित करना आसान बनाने का शानदार काम करता है और आपको `manifest.json` जैसी फ़ाइल को मैन्युअल रूप से संपादित करने (यह वह है जिसका उपयोग Unity यह ट्रैक करने के लिए करता है कि कौन से पैकेज स्थापित हैं) या पैकेज स्थापित करने के लिए कमांड लाइन से एक कमांड चलाने की आवश्यकता कभी नहीं पड़ी होगी।

वेब वातावरण में आप अपने लिए निर्भरताओं / पैकेजों को प्रबंधित करने के लिए `npm` - Node Package Manager - का उपयोग करते हैं। यह मूल रूप से वही करता है जो Unity का PackageManager करता है - यह *कुछ* सर्वर से पैकेज स्थापित (डाउनलोड) करता है (आप आमतौर पर उस संदर्भ में इसे *रजिस्ट्री* कहते हैं) और उन्हें `node_modules` नामक फ़ोल्डर के अंदर रखता है।

वेब प्रोजेक्ट के साथ काम करते समय आपकी अधिकांश निर्भरताएं [npmjs.com](https://npmjs.com/) से स्थापित की जाती हैं। यह वेब प्रोजेक्ट के लिए सबसे लोकप्रिय पैकेज रजिस्ट्री है।

यहां एक उदाहरण दिया गया है कि package.json कैसा दिख सकता है:
```json
{
  "name": "@optional_org/package_name",
  "version": "1.0.0",
  "scripts": {
    "start": "vite --host"
  },
  "dependencies": {
	  "@needle-tools/engine": "^3.5.9-beta",
	  "three": "npm:@needle-tools/three@0.146.8"
	},
  "devDependencies": {
	  "@types/three": "0.146.0",
	  "@vitejs/plugin-basic-ssl": "^1.0.1",
	  "typescript": "^5.0.4",
	  "vite": "^4.3.4",
	  "vite-plugin-compression": "^0.5.1"
	}
}
```

हमारा डिफ़ॉल्ट टेम्पलेट Vite को इसके बंडलर के रूप में उपयोग करता है और कोई फ्रंटएंड फ्रेमवर्क पूर्व-स्थापित नहीं है। Needle Engine इस बारे में किसी भी ढांचे का विरोध नहीं करता है, इसलिए आप अपनी पसंद के किसी भी ढांचे के साथ काम करने के लिए स्वतंत्र हैं। हमारे पास Vue.js, Svelte, Next.js, React या React Three Fiber जैसे लोकप्रिय ढांचों के लिए नमूने हैं।

## पैकेज और निर्भरताएं स्थापित करना
npm से एक निर्भरता स्थापित करने के लिए आप कमांडलाइन (या टर्मिनल) में अपना वेब प्रोजेक्ट खोल सकते हैं और `npm i <the/package_name>` (जो `npm install` का संक्षिप्त रूप है) चला सकते हैं
उदाहरण के लिए [Needle Engine](https://www.npmjs.com/package/@needle-tools/engine) स्थापित करने के लिए `npm i @needle-tools/engine` चलाएँ। यह तब आपके `package.json` में `dependencies` ऐरे में पैकेज जोड़ देगा।
केवल devDependency के रूप में एक पैकेज स्थापित करने के लिए आप `npm i --save-dev <package_name>` चला सकते हैं। नीचे dependencies और devDependencies के बीच अंतर के बारे में अधिक।

### 'dependencies' और 'devDependencies' में क्या अंतर है?
आपने देखा होगा कि *डिपेंडेंसी* - `dependencies` और `devDependencies` वाले दो एंट्री हैं।

`dependencies` **हमेशा इंस्टॉल** (या बंडल) की जाती हैं जब या तो आपका वेब प्रोजेक्ट इंस्टॉल होता है या उन मामलों में जहां आप एक लाइब्रेरी विकसित करते हैं और आपका पैकेज किसी अन्य प्रोजेक्ट की निर्भरता के रूप में इंस्टॉल होता है।

`devDependencies` प्रोजेक्ट विकसित करते समय **ही** इंस्टॉल की जाती हैं (जिसका अर्थ है कि जब आप सीधे विशिष्ट निर्देशिका में `install` चलाते हैं) और वे अन्यथा आपके प्रोजेक्ट में **शामिल नहीं** होती हैं।

### मैं दूसरा पैकेज या निर्भरता कैसे स्थापित करूं और इसका उपयोग कैसे करूं?
[स्थापित करना](#स्थापित करना) अनुभाग ने हमें सिखाया कि आप अपनी प्रोजेक्ट निर्देशिका में `npm i <package_name>` चलाकर निर्भरताएं स्थापित कर सकते हैं जहाँ `package_name` [npm.js](https://npmjs.org) पर पाए जाने वाले कोई भी पैकेज हो सकता है।

मान लीजिए कि आप अपने प्रोजेक्ट में एक ट्वीनिंग लाइब्रेरी जोड़ना चाहते हैं। हम इस उदाहरण के लिए [`@tweenjs/tween.js`](https://www.npmjs.com/package/@tweenjs/tween.js) का उपयोग करेंगे। यदि आप आगे बढ़ना चाहते हैं और केवल परिणाम देखना चाहते हैं तो [यहाँ](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts) अंतिम प्रोजेक्ट है।

पहले टर्मिनल में `npm install @tweenjs/tween.js` चलाएँ और इंस्टॉलेशन पूरा होने तक प्रतीक्षा करें। यह हमारे package.json में एक नई एंट्री जोड़ देगा:
```json
"dependencies": {
    "@needle-tools/engine": "^3.5.11-beta",
    "@tweenjs/tween.js": "^20.0.3",
    "three": "npm:@needle-tools/three@0.146.8"
}
```

फिर अपनी स्क्रिप्ट फ़ाइलों में से एक खोलें जिसमें आप ट्वीनिंग का उपयोग करना चाहते हैं और फ़ाइल के शीर्ष पर आयात करें:
```ts twoslash
import * as TWEEN from '@tweenjs/tween.js';
```
ध्यान दें कि हम यहाँ `* as TWEEN` लिखकर लाइब्रेरी में सभी प्रकारों को आयात कर रहे हैं। हम विशिष्ट प्रकारों को भी आयात कर सकते हैं जैसे `import { Tween } from @tweenjs/tween.js`।

अब हम अपनी स्क्रिप्ट में इसका उपयोग कर सकते हैं। यह हमेशा सलाह दी जाती है कि आप जिस लाइब्रेरी का उपयोग करना चाहते हैं उसके दस्तावेज़ देखें। tween.js के मामले में वे एक [उपयोगकर्ता गाइड](https://github.com/tweenjs/tween.js/blob/HEAD/docs/user_guide.md) प्रदान करते हैं जिसका हम पालन कर सकते हैं। आमतौर पर npm पर पैकेज के Readme पृष्ठ में पैकेज को कैसे स्थापित और उपयोग किया जाए इसकी जानकारी होती है।

एक क्यूब को घुमाने के लिए हम `TweenRotation` नामक एक नया कॉम्पोनेन्ट प्रकार बनाते हैं, फिर हम ऑब्जेक्ट रोटेशन के लिए अपना ट्विन इंस्टेंस बनाते हैं, यह कितनी बार दोहराना चाहिए, किस ईजिंग का उपयोग करना चाहिए, जो ट्विन हम प्रदर्शन करना चाहते हैं और फिर हम इसे शुरू करते हैं। फिर हमें ट्विन एनीमेशन को अपडेट करने के लिए हर फ्रेम में केवल `update` कॉल करना होगा। अंतिम स्क्रिप्ट इस तरह दिखती है:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
import * as TWEEN from '@tweenjs/tween.js';

export class TweenRotation extends Behaviour {

    // हमारे ट्वीनर का इंस्टेंस सेव करें
    private _tween?: TWEEN.Tween<any>;

    start() {
        const rotation = this.gameObject.rotation;
        // ट्विन इंस्टेंस बनाएं
        this._tween = new TWEEN.Tween(rotation);
        // इसे हमेशा के लिए दोहराने के लिए सेट करें
        this._tween.repeat(Infinity);
        // उपयोग करने के लिए ईजिंग सेट करें
        this._tween.easing(TWEEN.Easing.Quintic.InOut);
        // ट्विन करने के लिए मान सेट करें
        this._tween.to({ y: Math.PI * 0.5 }, 1000);
        // इसे शुरू करें
        this._tween.start();
    }

    update() {
        // हर फ्रेम में ट्वीनिंग अपडेट करें
        // '_'tween बनाया गया है या नहीं इसकी जाँच करने के लिए '?' एक संक्षिप्त रूप है
        this._tween?.update();
    }
}
```
अब हमें उन्हें हमेशा के लिए घुमाने के लिए अपने सीन में किसी भी वस्तु में जोड़ना होगा।
आप [यहाँ](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts) अंतिम स्क्रिप्ट को क्रियान्वित होते हुए देख सकते हैं।

# और जानें

- [Needle Engine में स्क्रिप्टिंग](../scripting)
- [Typescript Essentials](./typescript-essentials.md)
- [कॉम्पोनेन्ट संदर्भ](../component-reference.md)

---
यह पेज AI का उपयोग करके स्वचालित रूप से अनुवादित किया गया है