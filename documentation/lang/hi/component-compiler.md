---
title: कंपोनेंट का स्वचालित जनरेशन
tags:
  - codegen
  - components
  - unity
  - blender
  - editor
  - typescript
  - csharp
---

### एडिटर कंपोनेंट का स्वचालित जनरेशन

जब आप Unity या Blender में काम करते हैं, तो आप देखेंगे कि जब आप Typescript या Javascript में एक नया Needle Engine कंपोनेंट बनाते हैं, तो यह स्वचालित रूप से आपके लिए एक Unity C# स्टब कंपोनेंट या एक Blender पैनल जनरेट करेगा।

यह [Needle component compiler](https://www.npmjs.com/package/@needle-tools/needle-component-compiler) के जादू के कारण होता है जो एक एडिटर वातावरण में पर्दे के पीछे चलता है और आपकी स्क्रिप्ट फ़ाइलों में बदलावों को देखता है। जब यह नोटिस करता है कि आपने एक नया Needle Engine कंपोनेंट बनाया है, तो यह सही Unity कंपोनेंट या Blender पैनल जनरेट करेगा, जिसमें पब्लिक वेरिएबल्स या प्रॉपर्टीज़ शामिल होंगी जिन्हें आप एडिटर के भीतर से सेट या लिंक कर सकते हैं।

**Note**: द कंपोनेंट कंपाइलर वर्तमान में **केवल कंपोनेंट जनरेट करता है**। इसलिए यदि आपको Unity में एक Typescript Enum को एक्सपोज़ करने की आवश्यकता है, तो आप इसे मैन्युअल रूप से अपने C# में एक नई C# फ़ाइल में या जनरेट किए गए कोड के बाहर जोड़ सकते हैं (नीचे उदाहरण देखें)।

### कंपोनेंट जनरेशन को नियंत्रित करना
C# कोड जनरेशन के व्यवहार को नियंत्रित करने के लिए आप अपने Typescript कोड में निम्नलिखित टिप्पणियों (comments) का उपयोग कर सकते हैं:
| Attribute | Result |
| -- | -- |
| `// @generate-component` | अगली क्लास का जनरेशन फोर्स करें|
| `// @dont-generate-component` | अगली क्लास का जनरेशन डिसेबल करें, यह उन मामलों में उपयोगी है जहाँ आपके प्रोजेक्ट में पहले से ही एक मौजूदा C# स्क्रिप्ट है |
| `// @serializeField` | जनरेट किए गए फ़ील्ड को `[SerializeField]` से डेकोरेट करें |
| `// @type UnityEngine.Camera` | जनरेट किए गए C# फ़ील्ड का टाइप स्पेसिफाई करें |
| `// @nonSerialized` | अगले फ़ील्ड या मेथड का जनरेशन स्किप करें |

#### उदाहरण

कंपोनेंट कंपाइलर को `myAudioClip` नाम का C# AudioClip फ़ील्ड जनरेट करने के लिए फोर्स करें
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
	//@type UnityEngine.AudioClip
	@serializable()
	myAudioClip?: string;
}

```

कंपोनेंट कंपाइलर को एक विशिष्ट सबक्लास से डिराइव करने के लिए फोर्स करें
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyCustomBaseClass extends Behaviour { /* ... */ }
// ---cut-before---
//@type MyNamespace.MyCustomBaseClass
export class MyComponent extends MyCustomBaseClass {
}
```

### Unity में कंपोनेंट कंपाइलर
यदि आप अपने प्रोजेक्ट में ``src/scripts`` फ़ोल्डर के अंदर स्क्रिप्ट जोड़ना चाहते हैं, तो आपको अपने ``ExportInfo`` कंपोनेंट वाले GameObject पर एक ``Component Generator`` रखना होगा।
अब जब आप ``your/threejs/project/src/scripts`` में नए कंपोनेंट जोड़ेंगे, तो यह `Assets/Needle/Components.codegen` में स्वचालित रूप से Unity स्क्रिप्ट जनरेट करेगा।
यदि आप किसी भी NpmDef फ़ाइल में स्क्रिप्ट जोड़ना चाहते हैं तो आप बस उन्हें बना सकते हैं - प्रत्येक NpmDef स्वचालित रूप से स्क्रिप्ट बदलावों को देखता है और कंपोनेंट जनरेशन को संभालता है, इसलिए आपको अपने सीन में किसी अतिरिक्त कंपोनेंट की आवश्यकता नहीं है।

C# फ़ील्ड को सही ढंग से जनरेट करने के लिए, वर्तमान में यह महत्वपूर्ण है कि आप स्पष्ट रूप से एक Typescript टाइप घोषित करें। उदाहरण के लिए ``myField : number = 5``

आप नीचे दिए गए टैब का उपयोग करके **Typescript** इनपुट और जनरेट किए गए **C#** स्टब कंपोनेंट के बीच स्विच कर सकते हैं
::: code-tabs
@tab Typescript
```ts twoslash
import { AssetReference, Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

export class MyCustomComponent extends Behaviour {
    @serializable()
    myFloatValue: number = 42;

    @serializable(Object3D)
    myOtherObject?: Object3D;

    @serializable(AssetReference)
    prefabs: AssetReference[] = [];

    start() {
        this.sayHello();
    }

    private sayHello() {
        console.log("Hello World", this);
    }
}
```
@tab जनरेटेड C#
```csharp
// NEEDLE_CODEGEN_START
// auto generated code - do not edit directly

#pragma warning disable

namespace Needle.Typescript.GeneratedComponents
{
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{
		public float @myFloatValue = 42f;
		public UnityEngine.Transform @myOtherObject;
		public UnityEngine.Transform[] @prefabs = new UnityEngine.Transform[]{ };
		public void start(){}
		public void update(){}
	}
}

// NEEDLE_CODEGEN_END
```
@tab जनरेटेड C# का विस्तार करना
```csharp
using UnityEditor;

// आप NEEDLE_CODEGEN_ ब्लॉक के ऊपर या नीचे कोड जोड़ सकते हैं

// NEEDLE_CODEGEN_START
// auto generated code - do not edit directly

#pragma warning disable

namespace Needle.Typescript.GeneratedComponents
{
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{
		public float @myFloatValue = 42f;
		public UnityEngine.Transform @myOtherObject;
		public UnityEngine.Transform[] @prefabs = new UnityEngine.Transform[]{ };
		public void start(){}
		public void update(){}
	}
}

// NEEDLE_CODEGEN_END

namespace Needle.Typescript.GeneratedComponents
{
    // जनरेट किए गए कंपोनेंट का विस्तार इस तरह करें (namespace और class का नाम मेल खाना चाहिए!)
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{

		public void MyAdditionalMethod()
		{
		}

		private void OnValidate()
		{
			myFloatValue = 42;
		}
	}

    // निश्चित रूप से आप कस्टम एडिटर भी जोड़ सकते हैं
	[CustomEditor(typeof(MyCustomComponent))]
	public class MyCustomComponentEditor : Editor
	{
		public override void OnInspectorGUI()
		{
			EditorGUILayout.HelpBox("This is my sample component", MessageType.None);
			base.OnInspectorGUI();
		}
	}
}

```
:::

### जनरेट किए गए कंपोनेंट का विस्तार करना
कंपोनेंट C# क्लास [`partial`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods) फ़्लैग के साथ जनरेट किए जाते हैं ताकि उन्हें फंक्शनैलिटी के साथ आसानी से बढ़ाया जा सके। यह गिज़्मो बनाने, संदर्भ मेनू जोड़ने या अतिरिक्त फ़ील्ड या मेथड जोड़ने में सहायक होता है जो बिल्ट-इन कंपोनेंट का हिस्सा नहीं हैं।

:::tip मेंबर केसिंग
एक्सपोर्ट किए गए सदस्य छोटे अक्षर से शुरू होंगे। उदाहरण के लिए, यदि आपके C# सदस्य का नाम ``MyString`` है, तो उसे ``myString`` असाइन किया जाएगा।
:::

यह पृष्ठ AI का उपयोग करके स्वचालित रूप से अनुवादित किया गया है।