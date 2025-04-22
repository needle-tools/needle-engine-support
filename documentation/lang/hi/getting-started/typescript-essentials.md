---
title: Needle Engine में स्क्रिप्टिंग
description: Typescript, Javascript और C# के बीच अंतर, समानताएं और मुख्य अवधारणाएं।
sidebarDepth: 2
---

यह गाइड C#, Javascript और Typescript के बीच कुछ मुख्य अंतरों को उजागर करने का प्रयास करती है। यह वेब इकोसिस्टम में नए डेवलपर्स के लिए सबसे उपयोगी है।

यहां Typescript लिखना सीखने के लिए कुछ उपयोगी संसाधन दिए गए हैं:  

- [Typescript ट्यूटोरियल](https://www.typescripttutorial.net/)
- [Typescript सीखें](https://www.tutorialsteacher.com/typescript)
- [Typescript दस्तावेज़](https://www.typescriptlang.org/docs/)

### C#, Javascript या Typescript के बीच मुख्य अंतर


**CSharp** या **C#** एक स्टैटिकली टाइप्ड और कम्पाइल की गई भाषा है। इसका मतलब है कि आपका कोड चलाने (या निष्पादित होने) से **पहले** उसे कम्पाइल - अनुवादित - करके IL या CIL में बदलना होगा, जो एक इंटरमीडिएट भाषा है और *मशीन कोड* के थोड़ी करीब है। यहां समझने वाली महत्वपूर्ण बात यह है कि आपके कोड का विश्लेषण किया जाता है और उसे कुछ जांचों और नियमों को पास करना होता है जो कम्पाइलर द्वारा **लागू** किए जाते हैं। यदि आप C# भाषा के किसी भी नियम का उल्लंघन करने वाला कोड लिखते हैं तो आपको **Unity में** कम्पाइलर त्रुटियां मिलेंगी और आपका एप्लिकेशन शुरू भी नहीं होगा। आप कम्पाइलर त्रुटियों के साथ Play-Mode में प्रवेश नहीं कर पाएंगे।

दूसरी ओर **Javascript** रनटाइम पर व्याख्यायित (interpreted) होती है। इसका मतलब है कि आप ऐसा कोड लिख सकते हैं जो मान्य नहीं है और त्रुटियां पैदा कर सकता है - लेकिन आप उन त्रुटियों को तब तक नहीं देखेंगे जब तक *आपका प्रोग्राम नहीं चलता* या ठीक उसी लाइन को **निष्पादित** करने की कोशिश नहीं करता जिसमें त्रुटि है। उदाहरण के लिए आप `var points = 100; points += "hello world";` लिख सकते हैं और *जब तक* आप कोड को ब्राउज़र में नहीं चलाते, कोई शिकायत नहीं करेगा।

**Typescript** Microsoft द्वारा डिज़ाइन की गई एक भाषा है जो **javascript में कम्पाइल होती है**  
यह **type-safety** जैसी बहुत सारी सुविधाएँ जोड़ती है। इसका मतलब है कि जब आप Typescript में कोड लिखते हैं तो आप प्रकार (types) घोषित *कर सकते हैं* और इस प्रकार *कम्पाइल-टाइम* पर त्रुटियाँ प्राप्त कर सकते हैं जब आप, उदाहरण के लिए, अमान्य असाइनमेंट करने या अप्रत्याशित प्रकारों के साथ तरीकों को कॉल करने का प्रयास करते हैं। नीचे Javascript और Typescript में प्रकारों (types) के बारे में और पढ़ें।

### प्रकार (Types) — या उनकी कमी

**Vanilla Javascript** में (आज तक) *प्रकारों (types)* की कोई अवधारणा **नहीं** है: इस बात की कोई गारंटी नहीं है कि एक वेरिएबल जिसे आपने `let points = 100` के रूप में घोषित किया था, आपके एप्लिकेशन में बाद में भी *संख्या* ही रहेगा। इसका मतलब है कि Javascript में यह पूरी तरह से मान्य कोड है कि आप बाद में अपने कोड में `points = new Vector3(100, 0, 0);` असाइन करें। या यहाँ तक कि `points = null` या `points = myRandomObject` - आपको बात समझ आ गई होगी। कोड लिखते समय यह सब ठीक है **लेकिन** जब आपका कोड निष्पादित होता है तो यह बुरी तरह से क्रैश हो सकता है क्योंकि बाद में आप `points -= 1` लिखते हैं और **अब** जब आपका एप्लिकेशन पहले से चल रहा होता है तो आपको ब्राउज़र में त्रुटियां मिलती हैं।

जैसा ऊपर बताया गया है, प्रकारों (types) को परिभाषित करने के लिए सिंटैक्स जोड़कर उस समस्या को ठीक करने में मदद करने के लिए **Typescript** बनाया गया था।

यह समझना महत्वपूर्ण है कि जब आप Typescript लिखते हैं तो आप *मूल रूप से* अभी भी Javascript ही लिख रहे होते हैं और जबकि सभी प्रकार की जांच और सुरक्षा जांचों से बचा जा सकता है, उदाहरण के लिए, एक त्रुटिपूर्ण लाइन के ऊपर ``//@ts-ignore`` जोड़कर या सभी प्रकारों को ``any`` के रूप में परिभाषित करके, यह **निश्चित रूप से अनुशंसित नहीं है**। प्रकार (Types) यहां त्रुटियों को होने से पहले ढूंढने में आपकी मदद करने के लिए हैं। आप वास्तव में अपनी वेबसाइट को अपने सर्वर पर तैनात नहीं करना चाहते हैं ताकि बाद में आपको उपयोगकर्ताओं या विज़िटर से रिपोर्ट मिलें कि आपका ऐप चलते समय क्रैश हो गया।

जबकि *vanilla Javascript* प्रकार (types) प्रदान नहीं करता है, आप **[JSDoc](https://jsdoc.app/)** का उपयोग करके अभी भी अपने javascript वेरिएबल्स, क्लास और तरीकों में प्रकार-एनोटेशन जोड़ सकते हैं।

### चर (Variables)

C# में आप वेरिएबल को टाइप का उपयोग करके या `var` कीवर्ड का उपयोग करके लिखते हैं।  
उदाहरण के लिए आप `int points = 100;` लिख सकते हैं  
या वैकल्पिक रूप से `var` का उपयोग करें और कम्पाइलर को आपके लिए सही प्रकार (type) का पता लगाने दें: `var points = 100`

Javascript या Typescript में आपके पास एक वेरिएबल घोषित करने के दो आधुनिक विकल्प हैं।  
एक वेरिएबल जिसे आप फिर से असाइन करने की योजना बनाते हैं, उसके लिए `let` का उपयोग करें, उदाहरण के लिए `let points = 100;`  
एक वेरिएबल जिसे आप फिर से असाइन करने में सक्षम नहीं होना चाहते हैं, उसके लिए `const` का उपयोग करें, उदाहरण के लिए `const points = 100;`  
> *var से सावधान रहें*   
  आपको Javascript में भी `var` कीवर्ड मिल सकता है लेकिन इसका उपयोग करने की अनुशंसा नहीं की जाती है और इसका आधुनिक प्रतिस्थापन `let` है। [var vs let](https://stackoverflow.com/a/11444416) के बारे में और जानें।

कृपया ध्यान दें कि आप `const` के साथ घोषित वेरिएबल्स को अभी भी मान असाइन *कर सकते हैं* यदि वे (उदाहरण के लिए) एक कस्टम प्रकार (type) हैं। निम्नलिखित उदाहरण पर विचार करें:

```ts twoslash
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition.x = 100; // Assigning x is perfectly fine
```
ऊपर दिया गया कोड पूरी तरह से मान्य Typescript कोड है क्योंकि आप `myPosition` को फिर से असाइन नहीं कर रहे हैं बल्कि केवल `myPosition` के `x` सदस्य को असाइन कर रहे हैं। दूसरी ओर निम्नलिखित उदाहरण की अनुमति **नहीं** होगी और यह रनटाइम या typescript त्रुटि का कारण बनेगा:
```ts twoslash
// @errors: 2588
import { Vector3 } from "three";
// ---cut-before---
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition = new Vector3(100, 0, 0); // ⚠ CONST को ASSIGN करने की अनुमति नहीं है
```

### प्रकारों (Types) का उपयोग करना या आयात करना

Unity में आप आमतौर पर अपनी परियोजना में संदर्भित Assembly से विशिष्ट नेमस्पेस आयात करने के लिए अपने कोड के शीर्ष पर `using` स्टेटमेंट जोड़ते हैं या - कुछ मामलों में - आप खुद को एक नेमस्पेस से नाम के साथ एक विशिष्ट प्रकार (type) आयात करते हुए पा सकते हैं।  
निम्नलिखित उदाहरण देखें:
```csharp
using UnityEngine;
// केवल एक विशिष्ट प्रकार (type) का आयात करना और उसे नाम देना
using MonoBehaviour = UnityEngine.MonoBehaviour;
```

Typescript में आप एक पैकेज से विशिष्ट प्रकारों (types) को आयात करने के लिए ऐसा करते हैं:
```ts twoslash
import { Vector3 } from 'three';
import { Behaviour } from '@needle-tools/engine';
```

आप किसी विशिष्ट पैकेज से सभी प्रकारों (types) को नाम देकर भी आयात *कर सकते हैं* जो आपको यहां-वहां दिख सकता है:
```ts twoslash
import * as THREE from 'three';
const myVector : THREE.Vector3 = new THREE.Vector3(1, 2, 3);
```

### आदिम प्रकार (Primitive Types)
*Vector2, Vector3, Vector4...*  
यदि आपकी पृष्ठभूमि C# की है तो आप क्लास और स्ट्रक्चर (struct) के बीच के अंतर से परिचित हो सकते हैं। जबकि एक क्लास एक संदर्भ प्रकार (reference type) है, एक स्ट्रक्चर (struct) एक कस्टम मान प्रकार (custom value type) है। इसका मतलब है कि, संदर्भ के आधार पर, इसे स्टैक पर आवंटित किया जाता है और जब किसी विधि को पास किया जाता है तो डिफ़ॉल्ट रूप से एक प्रतिलिपि बनाई जाती है।  
C# में निम्नलिखित उदाहरण पर विचार करें:

```csharp
void MyCallerMethod(){
    var position = new Vector3(0,0,0);
    MyExampleVectorMethod(position);
    UnityEngine.Debug.Log("Position.x is " + position.x); // यहाँ x 0 होगा
}
void MyExampleVectorMethod(Vector3 position){
    position.x = 42;
}
```

एक विधि को position नाम के Vector3 के साथ कॉल किया जाता है। विधि के अंदर पास किए गए वेक्टर `position` को संशोधित किया जाता है: x को 42 पर सेट किया जाता है। लेकिन C# में मूल वेक्टर जो इस विधि में पास किया जा रहा है (लाइन 2 देखें) बदला **नहीं** जाता है और x **अभी भी** 0 होगा (लाइन 4)।

Javascript/Typescript के लिए यह सच नहीं है। यहां हमारे पास कस्टम मान प्रकार (custom value types) नहीं हैं, इसका मतलब है कि यदि आपको Needle Engine या three.js में कोई Vector मिलता है तो आपके पास हमेशा एक संदर्भ प्रकार (reference type) होगा।  
typescript में निम्नलिखित उदाहरण पर विचार करें:  
```ts twoslash
import { Vector3 } from 'three'

function myCallerMethod() : void {
    const position = new Vector3(0,0,0);
    myExampleVectorMethod(position);
    console.log("Position.x is " + position.x); // यहाँ x 42 होगा
}
function myExampleVectorMethod(position: Vector3) : void {
    position.x = 42;
}
```
क्या आप अंतर देखते हैं? क्योंकि वेक्टर और सभी कस्टम ऑब्जेक्ट वास्तव में संदर्भ प्रकार (reference types) *हैं*, हमने मूल `position` वेरिएबल (लाइन 3) को संशोधित किया होगा और x अब 42 है।

यह न केवल विधियों के लिए बल्कि वेरिएबल्स के साथ काम करते समय भी समझना महत्वपूर्ण है।  
C# में निम्नलिखित कोड Vector3 के दो इंस्टेंस बनाएगा और एक को बदलने से दूसरे पर कोई प्रभाव नहीं पड़ेगा:  
```csharp
var myVector = new Vector3(1,1,1);
var myOtherVector = myVector;
myOtherVector.x = 42;
// लॉग करेगा: 1, 42
UnityEngine.Debug.Log(myVector.x + ", " + myOtherVector.x);
```
यदि आप Typescript में ऐसा करते हैं तो आप प्रतिलिपि **नहीं** बनाएँगे बल्कि उसी `myVector` इंस्टेंस का संदर्भ प्राप्त करेंगे:
```ts twoslash
import { Vector3 } from 'three'

const myVector = new Vector3(1,1,1);
const myOtherVector = myVector;
myOtherVector.x = 42;
// लॉग करेगा: 42, 42
console.log(myVector.x, myOtherVector.x);
```

### वेक्टर गणित (Vector Maths) और ऑपरेटर (Operators)

जबकि C# में आप ऑपरेटर ओवरलोडिंग (operator overloading) का उपयोग कर सकते हैं, दुर्भाग्य से Javascript में यह उपलब्ध नहीं है। इसका मतलब है कि जबकि आप C# में Vector3 को इस तरह गुणा कर सकते हैं:

```csharp
var myFirstVector = new Vector3(1,1,1);
var myFactor = 100f;
myFirstVector *= myFactor;
// → myFirstVector अब 100, 100, 100 है
```

आपको Vector3 प्रकार (type) पर एक विधि (method) का उपयोग करके वही परिणाम प्राप्त करना होगा (बस थोड़ा और बॉयलरप्लेट कोड के साथ)

```ts twoslash
import { Vector3 } from "three"

const myFirstVector : Vector3 = new Vector3(1, 1, 1)
const myFactor = 100;
myFirstVector.multiplyScalar(myFactor);
// → myFirstVector अब 100, 100, 100 है
```

### समानता जाँच (Equality Checks)

#### ढीली बनाम सख्त तुलना (loose vs strict comparison)
C# में जब आप जांचना चाहते हैं कि क्या दो वेरिएबल समान हैं, तो आप इसे इस प्रकार लिख सकते हैं:
```csharp
var playerIsNull = myPlayer == null;
```
Javascript/Typescript में `==` और `===` के बीच अंतर है जहाँ `===` प्रकार (type) की अधिक सख्ती से जाँच करता है:
```ts twoslash
const myPlayer: any = null;
// ---cut-before---
const playerIsNull = myPlayer === null;
const playerIsNullOrUndefined = myPlayer == null;
```
आप देखेंगे कि दूसरा वेरिएबल `playerIsNullOrUndefined` `==` का उपयोग कर रहा है जो एक ढीली समानता जाँच (loose equality check) करता है, इस स्थिति में `null` और `undefined` दोनों यहाँ `true` होंगे। आप इसके बारे में और [यहां](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) पढ़ सकते हैं।

### इवेंट (Events), बाइंडिंग (Binding) और `this`

जब आप C# में किसी इवेंट की सदस्यता लेते हैं, तो आप इसे इस प्रकार करते हैं:
```csharp
// एक इवेंट इस तरह घोषित किया जाता है
event Action MyEvent;
// आप जोड़कर (या हटाकर) सदस्यता लेते हैं
void OnEnable() {
    MyEvent += OnMyEvent;
}
void OnDisable() {
    MyEvent -= OnMyEvent;
}
void OnMyEvent() {}
```
Typescript और Javascript में जब आप किसी विधि (method) को सूची में जोड़ते हैं तो आपको "इस (this) को बाइंड (bind) करना होता है"। इसका मूल रूप से मतलब है कि आप एक विधि (method) बनाते हैं जहाँ आप स्पष्ट रूप से `this` को (आमतौर पर) अपने वर्तमान क्लास इंस्टेंस पर सेट करते हैं। इसे प्राप्त करने के दो तरीके हैं।

कृपया ध्यान दें कि हम यहां `EventList` प्रकार (type) का उपयोग कर रहे हैं जो इवेंट्स को घोषित करने के लिए एक Needle Engine प्रकार (type) है (जब आप हमारे Editor इंटीग्रेशन के साथ EventList का उपयोग करते हैं तो इसे Blender में स्वचालित रूप से UnityEvent और/या इवेंट सूची में भी परिवर्तित किया जाएगा)।

ऐसा करने के लिए छोटा और **अनुशंसित** सिंटैक्स [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) का उपयोग करना है।

```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent!: EventList;

    onEnable() {
        this.myEvent.addEventListener(this.onMyEvent);
    }

    onDisable() {
        this.myEvent.removeEventListener(this.onMyEvent);
    }

    // `this` को स्वचालित रूप से बाइंड करने के लिए फ़ंक्शन को एरो फ़ंक्शन के रूप में घोषित करना
    private onMyEvent = () => {
        console.log(this !== undefined, this)
    }
}
```
मैन्युअल रूप से इस (this) को बाइंड करके (और बाद में इसे इवेंट सूची से फिर से हटाने के लिए विधि (method) को एक वेरिएबल में सहेज कर) वही चीज़ प्राप्त करने का अधिक विस्तृत "शास्त्रीय" तरीका भी है:
```ts twoslash
import { EventList, Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    @serializable(EventList)
    myEvent?: EventList;

    private _onMyEventFn?: Function;

    onEnable() {
        // इस (this) को बाइंड करें
        this._onMyEventFn = this.onMyEvent.bind(this);
        // बाउंड विधि (method) को इवेंट में जोड़ें
        this.myEvent?.addEventListener(this._onMyEventFn);
    }

    onDisable() {
        this.myEvent?.removeEventListener(this._onMyEventFn);
    }

    // `this` को स्वचालित रूप से बाइंड करने के लिए फ़ंक्शन को एरो फ़ंक्शन के रूप में घोषित करना
    private onMyEvent = () => { }
}
```

## आगे क्या?

- [Needle Engine स्क्रिप्टिंग](/scripting.md)


पेज का अनुवाद AI का उपयोग करके स्वचालित रूप से किया गया है