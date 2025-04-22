---
title: कंपोनेंट बनाना और उपयोग करना
tags:
    - scripting
    - serialization
    - csharp
    - typescript
    - javascript
    - components
---

# कस्टम कंपोनेंट बनाना

यदि आप स्क्रिप्टिंग के लिए नए हैं तो हम **दृढ़तापूर्वक अनुशंसा करते हैं** कि आप पहले निम्नलिखित गाइड पढ़ें:

- [Typescript Essentials](./getting-started/typescript-essentials.md)
- [Unity डेवलपर्स के लिए Needle Engine](./getting-started/for-unity-developers.md)

यदि आप जानते हैं कि आप क्या कर रहे हैं, तो सीधे [Needle Engine API दस्तावेज़ीकरण](https://engine.needle.tools/docs/api/latest) में कूदने के लिए स्वतंत्र महसूस करें।

---

Needle Engine के लिए रनटाइम कोड [TypeScript](https://typescriptlang.org) (अनुशंसित) या [JavaScript](https://javascript.info/) में लिखा जाता है। हम स्वचालित रूप से इससे C# स्टब कंपोनेंट उत्पन्न करते हैं, जिसे आप संपादक में GameObjects में जोड़ सकते हैं। C# कंपोनेंट और उनके डेटा को रनटाइम द्वारा समान डेटा के साथ JavaScript कंपोनेंट के रूप में फिर से बनाया जाता है और three.js ऑब्जेक्ट्स से जोड़ा जाता है।

कस्टम कंपोनेंट के साथ-साथ बिल्ट-इन Unity कंपोनेंट को भी इस तरह से JavaScript कंपोनेंट में मैप किया जा सकता है। उदाहरण के लिए, एनीमेशन, रेंडरिंग या भौतिकी से संबंधित कई बिल्ट-इन कंपोनेंट के लिए मैपिंग पहले से ही [Needle Engine में शामिल हैं](./component-reference.md#unity-components)।

यदि आप कुछ भी इंस्टॉल किए बिना निम्नलिखित उदाहरणों के साथ कोड-अलोंग करना चाहते हैं तो बस निम्नलिखित लिंक पर क्लिक करें:

- [कोड-अलोंग करने के लिए वर्चुअल वर्कस्पेस बनाएं](https://stackblitz.com/fork/github/needle-engine/vite-template?file=src%2Fmain.ts)।

----

हमारा वेब रनटाइम इंजन Unity के समान कंपोनेंट मॉडल को अपनाता है और इस प्रकार बहुत सारी कार्यक्षमता प्रदान करता है जो परिचित लगेगी।
three के Object3D ऑब्जेक्ट्स से जुड़े कंपोनेंट्स में ``awake``, ``start``, ``onEnable``, ``onDisable``, ``update`` और ``lateUpdate`` जैसे लाइफसाइकिल तरीके होते हैं जिन्हें आप लागू कर सकते हैं। आप [Coroutines](#coroutines) का भी उपयोग कर सकते हैं।

----

## जब आपको कोड लिखने की आवश्यकता नहीं होती है

अक्सर, इंटरैक्टिव दृश्यों को Unity में इवेंट्स का उपयोग करके और बिल्ट-इन कंपोनेंट पर तरीकों को कॉल करके महसूस किया जा सकता है। एक विशिष्ट उदाहरण बटन क्लिक पर एनीमेशन चलाना है - आप एक बटन बनाते हैं, इंस्पेक्टर में एक क्लिक इवेंट जोड़ते हैं, और Animator.SetTrigger या इसी तरह के कॉल से एक विशिष्ट एनीमेशन चलाते हैं।

Needle Engine, Unity इवेंट्स को JavaScript मेथड कॉल्स में अनुवाद करता है, जो इसे एक बहुत तेज़ और लचीला वर्कफ़्लो बनाता है - अपने इवेंट्स को सामान्य रूप से सेट करें और जब उन्हें कॉल किया जाता है तो वे Unity की तरह ही काम करेंगे।

![image](https://user-images.githubusercontent.com/2693840/187314594-7e34905d-e704-4fa3-835c-6b40f0f11e1c62.png)
_एक बटन क्लिक इवेंट का एक उदाहरण जो Needle Engine में आउट-ऑफ-द-बॉक्स काम कर रहा है - कोड की आवश्यकता नहीं है।_

## एक नया कंपोनेंट बनाना
स्क्रिप्ट TypeScript (अनुशंसित) या JavaScript में लिखी जाती हैं।
आपकी प्रोजेक्ट में कस्टम स्क्रिप्ट जोड़ने के दो तरीके हैं:

- बस अपने जेनरेट किए गए प्रोजेक्ट निर्देशिका में `src/scripts/` के अंदर `.ts` या `.js` एक्सटेंशन वाली एक फ़ाइल जोड़ें, उदाहरण के लिए `src/scripts/MyFirstScript.ts`

- Unity विशिष्ट:
  अपने कोड को NPM डेफिनिशन फ़ाइलों (एनपीएम पैकेज) में व्यवस्थित करें। ये आपको प्रोजेक्ट के बीच कोड को मॉड्यूलर बनाने और फिर से उपयोग करने में मदद करते हैं और यदि आप वेब डेवलपमेंट से परिचित हैं तो वे वास्तव में नियमित एनपीएम पैकेज हैं जो स्थानीय रूप से स्थापित होते हैं।
  Unity में आप `Create > NPM Definition` के माध्यम से NpmDef फ़ाइलें बना सकते हैं और फिर NpmDef फ़ाइल पर राइट-क्लिक करके और `Create > TypeScript` का चयन करके TypeScript फ़ाइलें जोड़ सकते हैं। कृपया अधिक जानकारी के लिए [यह अध्याय](./project-structure.md#npm-definition-files) देखें।

दोनों ही दृष्टिकोणों में, स्रोत निर्देशिकाओं को परिवर्तनों के लिए देखा जाता है और जब भी कोई परिवर्तन पाया जाता है तो C# स्टब कंपोनेंट या Blender पैनल फिर से उत्पन्न होते हैं।
स्रोत फ़ाइलों में परिवर्तन के परिणामस्वरूप चल रही वेबसाइट का हॉट रीलोड भी होता है - आपको C# कंपोनेंट के पुनर्संकलन के लिए Unity का इंतजार नहीं करना पड़ता है। यह कोड पर पुनरावृति को लगभग त्वरित बना देता है।

आप एक फ़ाइल के अंदर कई कंपोनेंट प्रकार भी रख सकते हैं (उदाहरण के लिए, आप एक ही Typescript फ़ाइल में `export class MyComponent1` और `export class MyOtherComponent` घोषित कर सकते हैं)।

यदि आप Javascript या Typescript लिखने के लिए नए हैं, तो हम इस गाइड को जारी रखने से पहले [Typescript Essentials Guide](./getting-started/typescript-essentials.md) गाइड को पहले पढ़ने की सलाह देते हैं।

:::details उदाहरण: एक कंपोनेंट बनाना जो एक ऑब्जेक्ट को घुमाता है

- **एक कंपोनेंट बनाएं जो एक ऑब्जेक्ट को घुमाता है**
  ``src/scripts/Rotate.ts`` बनाएं और निम्नलिखित कोड जोड़ें:
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class Rotate extends Behaviour
{
    @serializable()
    speed : number = 1;

    start(){
        // logging this is useful for debugging in the browser.
        // You can open the developer console (F12) to see what data your component contains
        console.log(this);
    }

    // update will be called every frame
    update(){
        this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
    }
}
```

अब Unity के अंदर ``Rotate.cs`` नाम की एक नई स्क्रिप्ट स्वचालित रूप से जेनरेट हो जाएगी। नए Unity कंपोनेंट को एक क्यूब में जोड़ें और दृश्य सहेजें।
क्यूब अब ब्राउज़र के अंदर घूम रहा है।
``Rotate.start`` मेथड से लॉग की जांच करने के लिए `F12` दबाकर क्रोम डेवलपर कंसोल खोलें। यह यह सीखने और डिबग करने के लिए एक सहायक अभ्यास है कि कौन से फ़ील्ड निर्यात किए जाते हैं और वर्तमान में असाइन किए जाते हैं। सामान्य तौर पर सभी सार्वजनिक और सीरियलाइज़ेबल फ़ील्ड और सभी सार्वजनिक प्रॉपर्टीज़ निर्यात की जाती हैं।

अब अपने Unity कंपोनेंट में एक नया फ़ील्ड ``public float speed = 5`` जोड़ें और उसे सहेजें। रोटेट कंपोनेंट इंस्पेक्टर अब एक ``speed`` फ़ील्ड दिखाता है जिसे आप संपादित कर सकते हैं। दृश्य सहेजें (या ``Build`` बटन पर क्लिक करें) और ध्यान दें कि जावास्क्रिप्ट कंपोनेंट को अब निर्यातित ``speed`` मान असाइन किया गया है।
:::

:::details कस्टम फ़ंक्शन के साथ कंपोनेंट बनाएं
सिंटैक्स और भाषा के बारे में अधिक जानने के लिए [Typescript Essentials Guide](./getting-started/typescript-essentials.md) देखें।
```ts twoslash
import { Behaviour } from "@needle-tools/engine";

export class PrintNumberComponent extends Behaviour
{
    start(){
      this.printNumber(42);
    }

    private printNumber(myNumber : number){
        console.log("My Number is: " + myNumber);
    }
}
```
:::

:::details वर्शन कंट्रोल और Unity
जबकि जेनरेट किए गए C# कंपोनेंट स्थिर GUID उत्पन्न करने के लिए टाइप नाम का उपयोग करते हैं, हम एक अच्छे अभ्यास के रूप में वर्शन कंट्रोल में जेनरेट किए गए कंपोनेंट को चेक करने की सलाह देते हैं।
:::

## कंपोनेंट आर्किटेक्चर
कंपोनेंट्स three.js `Object3Ds` में जोड़े जाते हैं। यह Unity में `GameObjects` में कंपोनेंट्स जोड़ने के समान है। इसलिए जब हम किसी three.js Object3D तक पहुंचना चाहते हैं, तो हम इसे ``this.gameObject`` के रूप में एक्सेस कर सकते हैं जो उस `Object3D` को लौटाता है जिससे कंपोनेंट जुड़ा हुआ है।

***नोट**: Object3D पर ``visible`` को false सेट करने से Unity में ``SetActive(false)`` की तरह काम होगा - जिसका अर्थ है कि यह इस ऑब्जेक्ट और इसके बच्चों पर सभी वर्तमान कंपोनेंट को भी अक्षम कर देगा। निष्क्रिय कंपोनेंट के लिए अपडेट इवेंट तब तक कॉल नहीं किए जाएंगे जब तक ``visible`` को फिर से true सेट नहीं किया जाता है।* यदि आप कंपोनेंट्स को प्रभावित किए बिना किसी ऑब्जेक्ट को छिपाना चाहते हैं तो आप केवल Needle Engine `Renderer` कंपोनेंट को अक्षम कर सकते हैं।

### लाइफसाइकिल मेथड

ध्यान दें कि लाइफसाइकिल मेथड तभी कॉल किए जाते हैं जब उन्हें घोषित किया जाता है। इसलिए केवल तभी `update` लाइफसाइकिल मेथड घोषित करें जब वे वास्तव में आवश्यक हों, अन्यथा यदि आपके पास कई कंपोनेंट हैं जिनमें अपडेट लूप कुछ भी नहीं करते हैं तो यह प्रदर्शन को नुकसान पहुंचा सकता है।

| मेथड का नाम | विवरण |
| -- | --
| `awake()` | जब कोई नया कंपोनेंट बनाया जाता है तो पहली मेथड कॉल की जाती है
| `onEnable()` | जब कोई कंपोनेंट सक्षम होता है तो कॉल किया जाता है (उदा. जब ``enabled`` false से true में बदलता है)
| `onDisable()` | जब कोई कंपोनेंट अक्षम होता है तो कॉल किया जाता है (उदा. जब ``enabled`` true से false में बदलता है)
| `onDestroy()` | जब Object3D या कंपोनेंट नष्ट हो रहा हो तो कॉल किया जाता है
| `start()` | कंपोनेंट बनाए जाने के बाद पहले फ्रेम की शुरुआत में कॉल किया जाता है
| `earlyUpdate()` | पहला अपडेट इवेंट
| `update()` | डिफ़ॉल्ट अपडेट इवेंट
| `lateUpdate()` | अपडेट के बाद कॉल किया जाता है
| `onBeforeRender()` | रेंडर कॉल से पहले अंतिम अपडेट इवेंट
| `onAfterRender()` | रेंडर इवेंट के बाद कॉल किया जाता है

### भौतिकी घटना मेथड
| मेथड का नाम | विवरण |
| -- | --
| `onCollisionEnter(col : Collision)` |
| `onCollisionStay(col : Collision)` |
| `onCollisionExit(col : Collision)` |
| `onTriggerEnter(col : Collision)` |
| `onTriggerStay(col : Collision)` |
| `onTriggerExit(col : Collision)` |

### इनपुट घटना मेथड
| मेथड का नाम | विवरण |
| -- | --
| `onPointerEnter(args : PointerEventData)` | जब एक कर्सर किसी ऑब्जेक्ट (या इसके किसी भी बच्चे) पर होवर करना शुरू करता है तो कॉल किया जाता है
| `onPointerMove(args : PointerEventData)` | जब एक कर्सर किसी ऑब्जेक्ट (या इसके किसी भी बच्चे) पर घूमता है तो कॉल किया जाता है
| `onPointerExit(args : PointerEventData)` | जब एक कर्सर किसी ऑब्जेक्ट से बाहर निकलता है (होवर करना बंद कर देता है) तो कॉल किया जाता है
| `onPointerDown(args : PointerEventData)` | जब एक कर्सर किसी ऑब्जेक्ट पर दबाया जाता है तो कॉल किया जाता है
| `onPointerUp(args : PointerEventData)` | जब एक कर्सर किसी ऑब्जेक्ट पर जारी किया जाता है तो कॉल किया जाता है
| `onPointerClick(args : PointerEventData)` | जब एक कर्सर किसी ऑब्जेक्ट पर क्लिक किया जाता है तो कॉल किया जाता है

### XR घटना मेथड
*Needle Engine >= 3.32.0 आवश्यक है*
| मेथड का नाम | विवरण |
| -- | --
| `supportsXR(mode: XRSessionMode)` | यदि आप केवल विशिष्ट XR मोड जैसे `immersive-vr` या `immersive-ar` के लिए XR कॉलबैक प्राप्त करना चाहते हैं तो वैकल्पिक रूप से लागू करें। सिस्टम को यह सूचित करने के लिए `true` लौटाएं कि आप पास किए गए मोड के लिए कॉलबैक चाहते हैं
| `onBeforeXR(mode: XRSessionMode, init: XRSessionInit)` | XRSession अनुरोधित होने से ठीक पहले कॉल किया जाता है और XRSessionInit ऑब्जेक्ट को संशोधित करने के लिए उपयोग किया जा सकता है
| `onEnterXR(args: NeedleXREventArgs)` | जब यह कंपोनेंट एक xr सत्र में शामिल होता है (या एक चल रहे XR सत्र में सक्रिय हो जाता है) तो कॉलबैक
| `onUpdateXR(args: NeedleXREventArgs)` | जब एक xr सत्र अपडेट होता है (जबकि यह XR सत्र में अभी भी सक्रिय है) तो कॉलबैक
| `onLeaveXR(args: NeedleXREventArgs)` | जब यह कंपोनेंट एक xr सत्र से बाहर निकलता है (या जब यह एक चल रहे XR सत्र में निष्क्रिय हो जाता है) तो कॉलबैक
| `onControllerAdded(args: NeedleXRControllerEventArgs)` | जब एक नियंत्रक कनेक्ट/जोड़ा जाता है जबकि XR सत्र में हो OR जब कंपोनेंट एक चल रहे XR सत्र में शामिल होता है जिसमें पहले से ही नियंत्रक जुड़े हुए हैं OR जब कंपोनेंट एक चल रहे XR सत्र के दौरान सक्रिय हो जाता है जिसमें पहले से ही नियंत्रक जुड़े हुए हैं
| `onControllerRemoved(args: NeedleXRControllerEventArgs)` | जब एक नियंत्रक XR सत्र में होने पर हटा दिया जाता है तो कॉलबैक OR जब कंपोनेंट एक चल रहे XR सत्र के दौरान निष्क्रिय हो जाता है

#### अतिरिक्त XR इवेंट

| मेथड का नाम | विवरण |
| -- | --
| `window.addEventListener("needle-xrsession-start")` | CustomEvent जो तब शुरू होता है जब एक XRSession शुरू होता है। `details` में `NeedleXRSession` होता है
| `window.addEventListener("needle-xrsession-end")` | CustomEvent जो तब शुरू होता है जब एक XRSession शुरू होता है। `details` में `NeedleXRSession` होता है
| `onXRSessionStart(args: { session:NeedleXRSession } )` | ग्लोबल इवेंट हुक। सदस्यता समाप्त करने के लिए `offXRSessionStart` का उपयोग करें


### कोरोटिन

Coroutines को [JavaScript Generator Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) का उपयोग करके घोषित किया जा सकता है।
कोरोटिन शुरू करने के लिए, ``this.startCoroutine(this.myRoutineName());`` कॉल करें

**उदाहरण**
```ts twoslash
import { Behaviour, FrameEvent } from "@needle-tools/engine";

export class Rotate extends Behaviour {

    start() {
        // the second argument is optional and allows you to specifiy
        // when it should be called in the current frame loop
        // coroutine events are called after regular component events of the same name
        // for example: Update coroutine events are called after component.update() functions
        this.startCoroutine(this.rotate(), FrameEvent.Update);
    }

    // this method is called every frame until the component is disabled
    *rotate() {
        // keep looping forever
        while (true) {
            yield;
        }
    }
}
```

कोरोटिन रोकने के लिए, या तो उससे रिटर्न करके दिनचर्या से बाहर निकलें, या ``startCoroutine`` के रिटर्न वैल्यू को कैश करें और ``this.stopCoroutine(<...>)`` को कॉल करें। सभी कोरोटिन ``onDisable`` / कंपोनेंट को अक्षम करने पर बंद हो जाते हैं।

## विशेष लाइफसाइकिल हुक

Needle Engine कुछ लाइफसाइकिल हुक भी एक्सपोज करता है जिनका उपयोग आप पूर्ण कंपोनेंट लिखने के बजाय अपडेट लूप में हुक करने के लिए कर सकते हैं।
ये हुक आपके वेब एप्लिकेशन में किसी भी बिंदु पर डाले जा सकते हैं (उदाहरण के लिए टॉपलेवल स्कोप में या एक svelte कंपोनेंट में)
| मेथड का नाम | विवरण |
| -- | --
| `onInitialized(cb, options)` | जब एक नया संदर्भ आरंभ होता है तो कॉल किया जाता है (पहले फ्रेम से पहले)
| `onClear(cb, options)` | इंजन संदर्भ साफ़ होने से पहले एक कॉलबैक पंजीकृत करें
| `onDestroy(cb, options)` | संदर्भ नष्ट होने से पहले इंजन में एक कॉलबैक पंजीकृत करें
| `onStart(cb, options)` | कंपोनेंट `start` के तुरंत बाद एक फ्रेम की शुरुआत में कॉल किया जाता है
| `onUpdate(cb, options)` | कंपोनेंट `update` के तुरंत बाद कॉल किया जाता है
| `onBeforeRender(cb, options)` | रेंडर कॉल करने से पहले कॉल किया जाता है
| `onAfterRender(cb, options)` | रेंडर कॉल करने से पहले कॉल किया जाता है

उदाहरण के लिए ([stackblitz पर उदाहरण देखें](https://stackblitz.com/edit/needle-engine-lifecycle-hooks?file=src%2Fmain.ts))
```ts twoslash
// this can be put into e.g. main.ts or a svelte component (similar to onMount)
import { onStart, onUpdate, onBeforeRender, onAfterRender } from "@needle-tools/engine"

onStart(ctx => console.log("Hello Scene", ctx.scene));

onUpdate(ctx => {
    // do something... e.g. access the frame # or deltatime via ctx.time
    console.log("UPDATE", ctx.time.frame);
});

onBeforeRender(ctx => {
    // this event is only called once because of the { once: true } argument
    console.log("ON BEFORE RENDER", ctx.time.frame);
}, { once: true } );

// Every event hook returns a method to unsubscribe from the event
const unsubscribe = onAfterRender(ctx => {
    console.log("ON AFTER RENDER", ctx.time.frame);
});
// Unsubscribe from the event at any time
setTimeout(()=> unsubscribe(), 1000);
```

## कंपोनेंट खोजना, जोड़ना और हटाना

अन्य कंपोनेंट्स तक पहुँचने के लिए, ``GameObject`` या ``this.gameObject`` मेथड पर स्टैटिक मेथड का उपयोग करें। उदाहरण के लिए, पैरेंट में एक `Renderer` कंपोनेंट तक पहुँचने के लिए ``GameObject.getComponentInParent(this.gameObject, Renderer)`` या ``this.gameObject.getComponentInParent(Renderer)`` का उपयोग करें।

**उदाहरण:**
```ts twoslash
import { Behaviour, GameObject, Renderer } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    start() {
        const renderer = GameObject.getComponentInParent(this.gameObject, Renderer);
        console.log(renderer);
    }
}
```

### उपलब्ध मेथड में से कुछ:

| मेथड |  |
| -- | --
| `GameObject.instantiate(Object3D, InstantiateOptions)` | इस ऑब्जेक्ट का एक नया इंस्टेंस बनाता है जिसमें इसके सभी कंपोनेंट्स के नए इंस्टेंस शामिल हैं
| `GameObject.destroy(Object3D \| Component)` | एक कंपोनेंट या Object3D (और उसके कंपोनेंट) को नष्ट करें
| `GameObject.addNewComponent(Object3D, Type)` | प्रदान किए गए ऑब्जेक्ट में एक प्रकार के लिए एक नया कंपोनेंट जोड़ता है (और बनाता है)। ध्यान दें कि जब कंपोनेंट लौटाया जाता है तो ``awake`` और ``onEnable`` पहले ही कॉल किया जा चुका होता है
| `GameObject.addComponent(Object3D, Component)` | प्रदान किए गए ऑब्जेक्ट में एक कंपोनेंट इंस्टेंस ले जाता है। यह तब उपयोगी होता है जब आपके पास पहले से ही एक इंस्टेंस होता है उदा. जब आप ``new MyComponent()`` से एक कंपोनेंट बनाते हैं और फिर इसे एक ऑब्जेक्ट से अटैच करते हैं
| `GameObject.removeComponent(Component)` | एक कंपोनेंट को एक gameObject से हटाता है
| `GameObject.getComponent(Object3D, Type)` | प्रदान किए गए ऑब्जेक्ट पर एक प्रकार से मेल खाने वाला पहला कंपोनेंट लौटाता है।
| `GameObject.getComponents(Object3D, Type)` | प्रदान किए गए ऑब्जेक्ट पर एक प्रकार से मेल खाने वाले सभी कंपोनेंट लौटाता है।
| `GameObject.getComponentInChildren` | ``getComponent`` के समान है, लेकिन बाल ऑब्जेक्ट में भी खोज करता है।
| `GameObject.getComponentsInChildren` | ``getComponents`` के समान है, लेकिन बाल ऑब्जेक्ट में भी खोज करता है।
| `GameObject.getComponentInParent` | ``getComponent`` के समान है, लेकिन पैरेंट ऑब्जेक्ट में भी खोज करता है।
| `GameObject.getComponentsInParent` | ``getComponents`` के समान है, लेकिन पैरेंट ऑब्जेक्ट में भी खोज करता है।
| `GameObject.findObjectOfType` | एक प्रकार के लिए पूरे दृश्य की खोज करता है।
| `GameObject.findObjectsOfType` | सभी मेल खाने वाले प्रकारों के लिए पूरे दृश्य की खोज करता है।

## Three.js और HTML DOM

संदर्भ [वेब कंपोनेंट](https://developer.mozilla.org/en-US/docs/Web/Web_Components) के अंदर रनटाइम को संदर्भित करता है।
three.js दृश्य एक कस्टम HTML कंपोनेंट के अंदर रहता है जिसे ``<needle-engine>`` कहा जाता है (अपने प्रोजेक्ट में *index.html* देखें)। आप ``this.context.domElement`` का उपयोग करके ``<needle-engine>`` वेब कंपोनेंट तक पहुँच सकते हैं।

यह आर्किटेक्चर संभावित रूप से एक ही वेबपेज पर कई Needle WebGL दृश्यों के लिए अनुमति देता है, जो या तो अपने आप चल सकते हैं या आपके वेबपेज के हिस्सों के रूप में एक-दूसरे के बीच संवाद कर सकते हैं।

### दृश्य तक पहुंचें
किसी कंपोनेंट से वर्तमान दृश्य तक पहुँचने के लिए आप `this.scene` का उपयोग करते हैं जो `this.context.scene` के समतुल्य है, यह आपको रूट three.js दृश्य ऑब्जेक्ट देता है।

किसी कंपोनेंट से पदानुक्रम को पार करने के लिए आप या तो किसी ऑब्जेक्ट के बच्चों पर पुनरावृति कर सकते हैं
एक for लूप के साथ:
```ts twoslash
for(let i = 0; i < this.gameObject.children; i++)
    console.log(this.gameObject.children[i]);
```
या आप `foreach` समकक्ष का उपयोग करके पुनरावृति कर सकते हैं:
```ts twoslash
for(const child of this.gameObject.children) {
    console.log(child);
}
```
आप [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse) मेथड का उपयोग करके सभी ऑब्जेक्ट को पुनरावर्ती रूप से जल्दी से दोहराने के लिए three.js विशिष्ट मेथड का भी उपयोग कर सकते हैं:
```ts twoslash
import { Object3D } from "three";
this.gameObject.traverse((obj: Object3D) => console.log(obj));
```
या केवल दृश्यमान ऑब्जेक्ट को पार करने के लिए इसके बजाय [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) का उपयोग करें।

एक और विकल्प जो बहुत उपयोगी है जब आप केवल रेंडर करने योग्य ऑब्जेक्ट को दोहराना चाहते हैं तो आप सभी रेंडरर कंपोनेंट को क्वेरी कर सकते हैं और उन पर इस प्रकार पुनरावृति कर सकते हैं:
```ts twoslash
import { Renderer } from "@needle-tools/engine";
for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
कंपोनेंट्स प्राप्त करने के बारे में अधिक जानकारी के लिए अगला अनुभाग देखें।

### समय
समय डेटा तक पहुँचने के लिए `this.context.time` का उपयोग करें:
- `this.context.time.time` एप्लिकेशन चलना शुरू होने के बाद का समय है
- `this.context.time.deltaTime` पिछले फ्रेम के बाद बीता हुआ समय है
- `this.context.time.frameCount` एप्लिकेशन शुरू होने के बाद बीते हुए फ्रेम की संख्या है
- `this.context.time.realtimeSinceStartup` एप्लिकेशन चलना शुरू होने के बाद का अनस्केल्ड समय है

धीमी गति के प्रभावों के लिए समय को जानबूझकर धीमा करने के लिए `this.context.time.timeScale` का उपयोग करना भी संभव है।

### इनपुट
जिस ऑब्जेक्ट पर कंपोनेंट है, उसके लिए इनपुट डेटा प्राप्त करें:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onPointerDown() {
        console.log("POINTER DOWN on " + this.gameObject.name);
    }
}
```

आप ``InputEvents`` enum में ग्लोबल इवेंट की सदस्यता भी ले सकते हैं:
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable() {
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    onDisable() {
        // it is recommended to also unsubscribe from events when your component becomes inactive
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    // @nonSerialized
    inputPointerDown = (evt: NEPointerEvent) => { console.log("POINTER DOWN anywhere on the <needle-engine> element"); }
}
```

या यदि आप हर फ्रेम में इनपुट स्थिति को पोल ​​करना चाहते हैं तो ``this.context.input`` का उपयोग करें:

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update() {
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN anywhere")
        }
    }
}
```

यदि आप इनपुट को स्वयं संभालना चाहते हैं तो आप [ब्राउज़र द्वारा प्रदान किए जाने वाले सभी इवेंट](https://developer.mozilla.org/en-US/docs/Web/Events) (बहुत सारे हैं) की सदस्यता भी ले सकते हैं। उदाहरण के लिए ब्राउज़र के क्लिक इवेंट की सदस्यता लेने के लिए आप लिख सकते हैं:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onEnable() {
        window.addEventListener("click", this.windowClick);
    }

    onDisable() {
        // unsubscribe again when the component is disabled
        window.removeEventListener("click", this.windowClick);
    }

    windowClick = () => { console.log("CLICK anywhere on the page, not just on <needle-engine>"); }
}
```
ध्यान दें कि इस मामले में आपको सभी मामलों को स्वयं संभालना होगा। उदाहरण के लिए यदि कोई उपयोगकर्ता आपके वेबसाइट को डेस्कटॉप बनाम मोबाइल बनाम VR डिवाइस पर देख रहा है तो आपको विभिन्न इवेंट का उपयोग करने की आवश्यकता हो सकती है। Needle Engine इनपुट इवेंट (जैसे `PointerDown` माउस डाउन, टच डाउन और VR के मामले में कंट्रोलर बटन डाउन दोनों के लिए उठाया जाता है) द्वारा इन मामलों को स्वचालित रूप से संभाला जाता है।

### Raycasting

रेकास्ट करने और इंटरसेक्शन की सूची प्राप्त करने के लिए ``this.context.physics.raycast()`` का उपयोग करें। यदि आप कोई विकल्प पास नहीं करते हैं तो रेकास्ट माउस की स्थिति (या पहले टच की स्थिति) से स्क्रीनस्पेस में वर्तमान में सक्रिय `mainCamera` का उपयोग करके किया जाता है। आप एक `RaycastOptions` ऑब्जेक्ट भी पास कर सकते हैं जिसमें `maxDistance`, उपयोग किए जाने वाले कैमरे या जिन लेयर्स के विरुद्ध परीक्षण किया जाना है, जैसी विभिन्न सेटिंग्स होती हैं।

[three.js ray](https://threejs.org/docs/#api/en/math/Ray) का उपयोग करके रेकास्ट करने के लिए ``this.context.physics.raycastFromRay(your_ray)`` का उपयोग करें।

> **नोट**: इस प्रकार का रेकास्ट दृश्य में सभी दृश्यमान वस्तुओं के विरुद्ध एक रेकास्ट करता है। किसी भौतिकी इंजन की आवश्यकता नहीं होती है, जो Unity के व्यवहार से अलग है, जहाँ आपको वस्तुओं को हिट करने के लिए हमेशा कोलाइडर की आवश्यकता होती है। यदि आप केवल भौतिकी कोलाइडर के विरुद्ध कास्ट करना चाहते हैं, तो नीचे वर्णित `physics.engine.raycast` मेथड का उपयोग करें।

#### प्रदर्शन संबंधी बातें

डिफ़ॉल्ट Needle कम्प्रेशन सेटिंग्स का उपयोग करते समय, मेष के सरलीकृत संस्करण स्वचालित रूप से बनाए जाते हैं और रेकास्टिंग के लिए भी उपयोग किए जाते हैं। फिर भी, कुछ प्रकार के मेष धीमे होते हैं - उदाहरण के लिए, स्किन्ड मेष या ब्लेंडशेप वाले मेष के लिए सटीक हिट निर्धारित करने के लिए महंगे गणनाओं की आवश्यकता होती है। Unity में उन वस्तुओं को `Ignore Raycast` लेयर पर सेट करने पर विचार करें ताकि उनके विरुद्ध रेकास्टिंग से बचा जा सके।

#### भौतिकी-आधारित Raycasting

एक अन्य विकल्प भौतिकी रेकास्ट मेथड का उपयोग करना है जो दृश्य में केवल कोलाइडर के साथ हिट लौटाएगा।

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

यहां भौतिकी रेकास्ट के लिए एक संपादन योग्य [उदाहरण](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore) दिया गया है

### नेटवर्किंग
नेटवर्किंग मेथड को ``this.context.connection`` के माध्यम से एक्सेस किया जा सकता है। अधिक जानकारी के लिए कृपया [नेटवर्किंग दस्तावेज़](./networking.md) देखें।

## कहीं से भी Needle Engine और कंपोनेंट्स तक पहुँचना
नियमित JavaScript कोड का उपयोग करके ऊपर वर्णित सभी कार्यक्षमता तक पहुँचना संभव है जो कंपोनेंट्स के अंदर नहीं है और कहीं और रहता है। Needle रनटाइम के सभी कंपोनेंट और कार्यक्षमता ग्लोबल ``Needle`` नेमस्पेस के माध्यम से सुलभ हैं (आप ``console.log(Needle)`` लिखकर एक सिंहावलोकन प्राप्त कर सकते हैं)

आप उदाहरण के लिए ``Needle.findObjectOfType(Needle.AudioSource)`` का उपयोग करके कंपोनेंट ढूंढ सकते हैं। उन संदर्भों को कैश करने की सलाह दी जाती है, क्योंकि पूरे दृश्य को बार-बार खोजना महंगा होता है। ऊपर [कंपोनेंट खोजना, जोड़ना और हटाना](#finding-adding-and-removing-components) की सूची देखें।

प्रारंभिक दृश्य लोड के लिए कॉलबैक प्राप्त करने के लिए निम्नलिखित उदाहरण देखें:
```js
<needle-engine loadstart="loadingStarted" progress="loadingProgress" loadfinished="loadingFinished"></needle-engine>

<script type="text/javascript">
function loadingStarted() { console.log("START") }
function loadingProgress() { console.log("LOADING...") }
function loadingFinished() { console.log("FINISHED!") }
</script>
```

आप globale `NeedleEngine` (कभी-कभी *ContextRegistry* के रूप में भी संदर्भित) की सदस्यता भी ले सकते हैं ताकि Needle Engine संदर्भ बनने पर एक कॉलबैक प्राप्त हो सके या सभी उपलब्ध संदर्भों तक पहुँचने के लिए:
```ts twoslash
class YourComponentType extends Behaviour {}
//---cut---
import { NeedleEngine, GameObject, Behaviour } from "@needle-tools/engine";

NeedleEngine.addContextCreatedCallback((args) => {
  const context = args.context;
  const scene = context.scene;
  const myInstance = GameObject.getComponentInChildren(scene, YourComponentType);
});
```

एक और विकल्प `onInitialized(ctx => {})` [लाइफसाइकिल हुक](#special-lifecycle-hooks) का उपयोग करना है

आप `NeedleEngine.Registered` के माध्यम से सभी उपलब्ध संदर्भों तक भी पहुँच सकते हैं जो आंतरिक सरणी लौटाता है। (ध्यान दें कि इस सरणी को संशोधित नहीं किया जाना चाहिए, लेकिन सेटिंग को संशोधित करने के लिए सभी सक्रिय संदर्भों को दोहराने के लिए इसका उपयोग किया जा सकता है, उदा। सभी संदर्भों को `context.isPaused = true` पर सेट करें)

नीचे आपको स्टैटिक `NeedleEngine` टाइप पर उपलब्ध इवेंट की सूची मिलेगी।
आप `NeedleEngine.registerCallback(ContextEvent.ContextCreated, (args) => {})` के माध्यम से उन इवेंट की सदस्यता ले सकते हैं।

| ContextEvent विकल्प | |
|---|---|
| `ContextEvent.ContextRegistered` | जब संदर्भ रजिस्ट्री में पंजीकृत होता है तो कॉल किया जाता है। |
| `ContextEvent.ContextCreationStart` | पहले glb लोड होने से पहले कॉल किया जाता है और इसका उपयोग भौतिकी इंजन को इनिशियलाइज़ करने के लिए किया जा सकता है। एक प्रॉमिस लौटा सकता है |
| `ContextEvent.ContextCreated` | पहले फ्रेम से पहले संदर्भ बनने पर कॉल किया जाता है |
| `ContextEvent.ContextDestroyed` | संदर्भ नष्ट होने पर कॉल किया जाता है |
| `ContextEvent.MissingCamera` | जब संदर्भ कोई कैमरा नहीं खोज पाता है, तो वर्तमान में केवल निर्माण के दौरान कॉल किया जाता है |
| `ContextEvent.ContextClearing` | जब संदर्भ साफ़ हो रहा होता है तो कॉल किया जाता है: दृश्य में सभी ऑब्जेक्ट नष्ट हो रहे हैं और आंतरिक स्थिति रीसेट हो जाती है |
| `ContextEvent.ContextCleared` | संदर्भ साफ़ होने के बाद कॉल किया जाता है |

## Gizmos

स्टैटिक `Gizmos` क्लास का उपयोग रेखाओं, आकृतियों और टेक्स्ट को खींचने के लिए किया जा सकता है जो ज्यादातर डिबगिंग के लिए उपयोगी है।
सभी गिज़्मो फ़ंक्शन में कई विकल्प होते हैं, जैसे कि रंग या दृश्य में कितने समय तक प्रदर्शित होने चाहिए। आंतरिक रूप से उन्हें कैश और पुन: उपयोग किया जाता है।

| Gizmos | |
| -- | -- |
| `Gizmos.DrawLabel` | वैकल्पिक रूप से बैकग्राउंड के साथ एक लेबल बनाता है। इसे किसी ऑब्जेक्ट से जोड़ा जा सकता है। एक लेबल हैंडल लौटाता है जिसका उपयोग टेक्स्ट अपडेट करने के लिए किया जा सकता है। |
| `Gizmos.DrawRay` | विश्व स्थान में एक अनंत रे लाइन खींचने के लिए एक मूल और दिशा लेता है |
| `Gizmos.DrawDirection` | विश्व स्थान में एक दिशा खींचने के लिए एक मूल और दिशा लेता है |
| `Gizmos.DrawLine` | एक रेखा खींचने के लिए विश्व स्थान के दो vec3 बिंदु लेता है |
| `Gizmos.DrawWireSphere` | विश्व स्थान में एक वायरफ़्रेम गोला बनाता है |
| `Gizmos.DrawSphere` | विश्व स्थान में एक ठोस गोला बनाता है |
| `Gizmos.DrawWireBox` | विश्व स्थान में एक वायरफ़्रेम बॉक्स बनाता है |
| `Gizmos.DrawWireBox3` | एक वायरफ़्रेम बॉक्स3 बनाता है |
| `Gizmos.DrawArrow` | विश्व स्थान में दो बिंदु लेकर एक तीर बनाता है |

## Serialization / glTF फ़ाइलों में कंपोनेंट
glTF में कंपोनेंट को एम्बेड करने और उनके सही प्रकारों के साथ कंपोनेंट को फिर से बनाने के लिए, हमें गैर-प्राथमिक प्रकारों (सब कुछ जो ``Number``, ``Boolean`` या ``String`` नहीं है) को भी सहेजने की आवश्यकता है। आप अपने फ़ील्ड या प्रॉपर्टी के ऊपर ``@serializable(<type>)`` डेकोरेटर जोड़कर ऐसा कर सकते हैं।

**उदाहरण:**
@[code ts twoslash](@code/component-object-reference.ts)

कस्टम प्रारूपों से और उनमें सेरिअलाइज़ करने के लिए, ``TypeSerializer`` क्लास से एक्सटेंड करना और एक इंस्टेंस बनाना संभव है। समर्थित प्रकारों को पंजीकृत करने के लिए कंस्ट्रक्टर में ``super()`` का उपयोग करें।

> **नोट**: मैचिंग फ़ील्ड के अतिरिक्त, मैचिंग प्रॉपर्टीज़ भी निर्यात की जाएंगी जब वे टाइपस्क्रिप्ट फ़ाइल में फ़ील्ड से मेल खाती हों।

## दृश्य लोड करना
Unity में संदर्भित Prefabs, SceneAssets और AssetReferences (Unity का Addressable System) स्वचालित रूप से glTF फ़ाइलों के रूप में निर्यात किए जाएंगे (कृपया [Export Prefabs](export.md) दस्तावेज़ीकरण देखें)।

ये निर्यातित gltf फ़ाइलें सादे स्ट्रिंग URI के रूप में सेरिअलाइज़ की जाएंगी। टाइपस्क्रिप्ट कंपोनेंट्स से इन्हें लोड करना आसान बनाने के लिए, हमने ``AssetReference`` प्रकारों की अवधारणा जोड़ी। इन्हें रनटाइम पर लोड किया जा सकता है और इस प्रकार आपके ऐप के हिस्सों को लोड करने या बाहरी सामग्री को लोड करने में देरी करने की अनुमति मिलती है।

**उदाहरण:**
@[code ts twoslash](@code/component-prefab.ts)

AssetReferences URI द्वारा कैश किए जाते हैं, इसलिए यदि आप एक ही निर्यातित glTF/Prefab को कई कंपोनेंट्स/स्क्रिप्ट में संदर्भित करते हैं तो इसे केवल एक बार लोड किया जाएगा और फिर से उपयोग किया जाएगा।

# अगले कदम

---
यह पृष्ठ AI का उपयोग करके स्वचालित रूप से अनुवादित किया गया था।