---
title: "@serializable and other decorators"
---

निम्न तालिका में उपलब्ध Typescript Decorators शामिल हैं जो Needle Engine प्रदान करता है।

आप उन्हें Attributes on steroids (यदि आप C# से परिचित हैं) के रूप में सोच सकते हैं - अतिरिक्त कार्यक्षमता प्रदान करने के लिए उन्हें Typescript में क्लासेस, फ़ील्ड्स या मेथड्स में जोड़ा जा सकता है।

|  |  |
| --- | --- |
| **Field & Property Decorators** | |
| `@serializable()` | एक्सपोज़्ड / सीरियलाइज़्ड फ़ील्ड्स में जोड़ें। इसका उपयोग तब किया जाता है जब Unity या Blender से कॉम्पोनेंट्स के साथ एक्सपोर्ट की गई glTF फ़ाइलें लोड की जाती हैं। |
| `@syncField()` | वैल्यू के बदलने पर उसे नेटवर्क करने के लिए किसी फ़ील्ड में जोड़ें। जब फ़ील्ड बदलता है तो कॉल करने के लिए आप एक मेथड पास कर सकते हैं। |
| `@validate()` | जब भी वैल्यू बदलती है तो कॉम्पोनेंट इवेंट मेथड `onValidate` में कॉलबैक प्राप्त करने के लिए जोड़ें। यह Unity के onValidate के समान व्यवहार करता है। |
| **Method Decorators** | |
| `@prefix(<type>)` (experimental) | अन्य कॉम्पोनेंट्स में आसानी से कस्टम कोड इंजेक्ट करने के लिए उपयोग किया जा सकता है। वैकल्पिक रूप से, मूल मेथड को एग्जीक्यूट होने से रोकने के लिए `false` वापस करें। नीचे [उदाहरण देखें](#prefix) |
| **Class Decorators** | |
| `@registerType` | कोई आर्गुमेंट नहीं। Needle Engine टाइप्स पर रजिस्टर होने और हॉट रीलोडिंग सपोर्ट सक्षम करने के लिए किसी कस्टम कॉम्पोनेंट क्लास में जोड़ा जा सकता है। |

## Examples

### Serializable

```ts twoslash
import { Behaviour, serializable, EventList } from "@needle-tools/engine";
import { Object3D } from "three";

export class SomeComponentType extends Behaviour {}

export class ButtonObject extends Behaviour {
    // आप प्रकार को छोड़ सकते हैं यदि यह एक प्रिमिटिव है
    // जैसे Number, String या Bool
    @serializable()
    myNumber: number = 42;

    // अन्यथा उस कंक्रीट प्रकार को जोड़ें जिसे आप सीरियलाइज़ करना चाहते हैं
    @serializable(EventList)
    onClick?: EventList;

    @serializable(SomeComponentType)
    myComponent?: SomeComponentType;

    // ध्यान दें कि एरे के लिए आप अभी भी कंक्रीट प्रकार जोड़ते हैं (एरे नहीं)
    @serializable(Object3D)
    myObjects?: Object3D[];
}
```

### SyncField

`@syncField` डेकोरेटर का उपयोग एक ही नेटवर्किंग रूम से कनेक्टेड सभी उपयोगकर्ताओं (आपकी वेबसाइट के विज़िटर) के लिए आपके कॉम्पोनेंट्स की प्रॉपर्टीज़ को स्वचालित रूप से नेटवर्क करने के लिए किया जा सकता है। यह वैकल्पिक रूप से एक कॉलबैक फ़ंक्शन ले सकता है जिसे वैल्यू बदलने पर इन्वोक किया जाएगा।

- यह सूचित करने के लिए कि एक रेफरेंस वैल्यू (जैसे कोई ऑब्जेक्ट या एरे) बदल गई है, आपको फ़ील्ड को फिर से असाइन करने की आवश्यकता है। जैसे: `myField = myField`
- कॉलबैक फ़ंक्शन एरो फ़ंक्शन नहीं हो सकता है (जैसे `MyScript.prototype.onNumberChanged` `onNumberChanged() { ... }` के लिए काम करता है लेकिन `myNumberChanged = () => { ... }` के लिए नहीं करता है)

```ts twoslash
import { Behaviour, serializable, syncField } from "@needle-tools/engine";

export class MyScript extends Behaviour {

    @syncField(MyScript.prototype.onNumberChanged)
    @serializable()
    myNumber: number = 42;

    private onNumberChanged(newValue: number, oldValue: number){
        console.log("नंबर बदल गया ", oldValue, "से", newValue)
    }
}
```

### Validate
```ts twoslash
import { Behaviour, serializable, validate } from "@needle-tools/engine";

export class MyScript extends Behaviour {

    @validate()
    @serializable()
    myNumber?: number;

    start() { setInterval(() => this.myNumber = Math.random(), 1000) }

    onValidate(fieldName: string) {
        console.log("वैलिडेट करें", fieldName, this.myNumber);
    }
}
```

### Prefix
[लाइव उदाहरण](https://stackblitz.com/edit/needle-engine-prefix-example?file=src%2Fmain.ts)
```ts twoslash
import { Camera, prefix } from "@needle-tools/engine";
class YourClass {
    @prefix(Camera) // < यह वह प्रकार है जिसमें वह मेथड है जिसे आप बदलना चाहते हैं
    awake() { // < यह वह मेथड नाम है जिसे आप बदलना चाहते हैं

        // यह अब Camera.awake मेथड के चलने से पहले कॉल किया जाता है
        // नोट: `this` अब Camera इंस्टेंस को संदर्भित करता है न कि `YourClass` को। यह आपको कॉम्पोनेंट की इंटरनल स्टेट तक भी पहुंचने की अनुमति देता है।
        console.log("नमस्ते कैमरा:", this)
        // यदि आप डिफ़ॉल्ट व्यवहार को रोकना चाहते हैं तो वैकल्पिक रूप से false वापस करें
    }
}
```


पेज का अनुवाद AI द्वारा स्वचालित रूप से किया गया है