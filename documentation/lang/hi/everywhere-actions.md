---
title: Everywhere Actions
---

## Everywhere Actions क्या हैं?

Needle के Everywhere Actions ध्यान से चुने गए कंपोनेंट्स का एक सेट हैं जो आपको कोड की एक भी लाइन लिखे बिना Unity में इंटरैक्टिव अनुभव बनाने की अनुमति देते हैं।  
इन्हें वेब, मोबाइल और XR, **जिसमें iOS पर ऑगमेंटेड रियलिटी शामिल है**, में अनुभवों के लिए बिल्डिंग ब्लॉक के रूप में सेवा देने के लिए डिज़ाइन किया गया है।  

कम-स्तरीय ट्रिगर्स और एक्शन्स से, उच्च-स्तरीय जटिल इंटरैक्टिव व्यवहार बनाए जा सकते हैं।  

### समर्थित प्लेटफ़ॉर्म
- डेस्कटॉप
- मोबाइल (Android / iOS)
- VR चश्मे
- AR डिवाइस
- iOS AR – QuickLook (हां, सचमुच!)

## मैं Everywhere Actions का उपयोग कैसे करूँ?

iOS सपोर्ट के लिए, अपने सीन में `USDZExporter` कंपोनेंट जोड़ें। इसे `WebXR` कंपोनेंट (लेकिन अनिवार्य नहीं) के समान ऑब्जेक्ट में जोड़ना एक अच्छा अभ्यास है।

अपने सीन में किसी भी ऑब्जेक्ट में एक्शन जोड़ने के लिए  
उसे चुनें और फिर `Add Component > Needle > Everywhere Actions > [Action]` पर क्लिक करें।

![](/imgs/everywhere-actions-component-menu.gif)

## Everywhere Actions की सूची

| Action | Description | Example Use Cases |
| --- | --- | --- |
| Play Animation on Click | किसी Animator से चयनित एनिमेशन स्टेट चलाता है। चलाने के बाद, यह वैकल्पिक रूप से दूसरे एनिमेशन में ट्रांज़िशन कर सकता है। | उत्पाद प्रस्तुतियाँ, इंटरैक्टिव ट्यूटोरियल, कैरेक्टर मूवमेंट |
| Change Material on Click | एक मटेरियल को दूसरों के लिए बदलें। उस मटेरियल वाली सभी वस्तुएँ एक साथ स्विच हो जाएंगी। | उत्पाद कॉन्फ़िगरेटर, कैरेक्टर |
| Look At | किसी वस्तु को कैमरे की ओर देखने के लिए बनाएँ। | UI तत्व, स्प्राइट्स, इन्फो ग्राफिक्स, बिलबोर्ड इफ़ेक्ट, क्लिक करने योग्य हॉटस्पॉट |
| Play Audio on Click | चयनित ऑडियो क्लिप चलाता है। | ध्वनि प्रभाव, कथन, संग्रहालय प्रदर्शन |
| Hide on Start | बाद में प्रकट करने के लिए दृश्य शुरू होने पर किसी वस्तु को छुपाता है। |
| Set Active on Click | वस्तुओं को दिखाएँ या छुपाएँ। |  |
| Change Transform on Click | किसी वस्तु को ले जाएँ, घुमाएँ या स्केल करें। निरपेक्ष या सापेक्ष मूवमेंट की अनुमति देता है। | कैरेक्टर, उत्पाद, UI एनिमेशन (अधिक जटिल मूवमेंट के लिए एनिमेशन का उपयोग करें) |
| Audio Source | शुरू होने पर ऑडियो चलाता है और लूप करता रहता है। स्थानिक या गैर-स्थानिक | बैकग्राउंड संगीत, परिवेशी ध्वनियाँ |
| WebXR Image Tracking | एक इमेज टारगेट को ट्रैक करता है और वस्तुओं को दिखाता या छुपाता है। | AR अनुभव, उत्पाद प्रस्तुतियाँ |

## सैंपल

### Musical Instrument

स्थानिक ऑडियो, एनिमेशन और इंटरैक्शन प्रदर्शित करता है।

<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Simple Character Controllers

एनिमेशन, look at और मूवमेंट के संयोजन को प्रदर्शित करता है।  

<sample src="https://engine.needle.tools/samples-uploads/usdz-characters" />

### Image Tracking

दिखाता है कि कस्टम इमेज मार्कर पर 3D कंटेंट कैसे अटैच करें। AR में नीचे दिए गए सीन को शुरू करें और अपने फ़ोन के कैमरे को स्क्रीन पर इमेज मार्कर की ओर इंगित करें, या इसे प्रिंट करें।     

<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Image Marker" width=300 />    

<a href="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" target="_blank">सैंपल इमेज मार्कर डाउनलोड करें</a>  

**Android पर:** कृपया Chrome Flags में "WebXR Incubations" चालू करें। आप अपने Android फ़ोन के Chrome ब्राउज़र एड्रेस बार में [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) पेस्ट करके उन्हें ढूंढ सकते हैं।  

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />

### Interactive Building Blocks Overview

<sample src="https://engine.needle.tools/samples-uploads/usdz-interactivity" />

## अपने स्वयं के Everywhere Actions बनाएँ

नए Everywhere Actions बनाने में TypeScript में अपने एक्शन के लिए कोड लिखना शामिल है, जिसका उपयोग ब्राउज़र और WebXR में किया जाएगा, और QuickLook के माध्यम से iOS पर ऑगमेंटेड रियलिटी के लिए एक मैचिंग सेटअप बनाने के लिए हमारे TriggerBuilder और ActionBuilder API का उपयोग करना शामिल है। कस्टम एक्शन बनाते समय, ध्यान रखें कि QuickLook में उपलब्ध सुविधाओं का एक सीमित सेट है। आप ब्राउज़र और WebXR के लिए किसी भी कोड का उपयोग कर सकते हैं, लेकिन QuickLook के लिए व्यवहार उपलब्ध ट्रिगर्स और एक्शन्स से बनाए गए एक अनुमान की आवश्यकता हो सकती है।

:::tip
अक्सर विशिष्ट व्यवहारों के निर्माण के लिए लीक से हटकर सोचना और उपलब्ध निम्न-स्तरीय एक्शन्स को रचनात्मक रूप से लागू करना आवश्यक होता है। एक उदाहरण "Tap to Place" एक्शन होगा - QuickLook में कोई रेकास्टिंग या हिट टेस्टिंग उपलब्ध नहीं है, लेकिन आप अपेक्षित प्लेसमेंट क्षेत्र को कई अदृश्य वस्तुओं से ढक सकते हैं और रखी जाने वाली वस्तु को टैप की गई अदृश्य वस्तु की स्थिति में ले जाने के लिए "Tap" ट्रिगर का उपयोग कर सकते हैं।
:::

QuickLook के लिए ट्रिगर्स और एक्शन्स [Apple के Preliminary Interactive USD Schemas](https://developer.apple.com/documentation/arkit/usdz_schemas_for_ar/actions_and_triggers) पर आधारित हैं।

### Code Example

यहां `HideOnStart` का कार्यान्वयन एक उदाहरण के रूप में दिया गया है कि ब्राउज़र और QuickLook दोनों के लिए कार्यान्वयन के साथ एक Everywhere Action कैसे बनाया जाए:
@[code ts twoslash](@code/component-everywhere-action-hideonstart.ts)

::: tip
अक्सर, सही व्यवहार प्राप्त करने में उपलब्ध _निम्न-स्तरीय एक्शन्स_ से _उच्च-स्तरीय एक्शन्स_ को संयोजित करना शामिल होगा। उदाहरण के लिए, हमारा "Change Material on Click" एक्शन कई `fadeActions` से बना है और आंतरिक रूप से विभिन्न मटेरियल सेट वाली वस्तुओं की डुप्लीकेट बनाता है। इन एक्शन्स को सावधानीपूर्वक बनाकर, जटिल व्यवहार प्राप्त किए जा सकते हैं।
:::

### अपने स्वयं के एक्शन्स बनाने के लिए निम्न-स्तरीय मेथड

| Triggers | |
| --- | --- |
| `TriggerBuilder.sceneStartTrigger` | |
| `TriggerBuilder.tapTrigger` | |

| Actions | |
| --- | --- |
| `ActionBuilder.fadeAction` | |
| `ActionBuilder.startAnimationAction` | |
| `ActionBuilder.waitAction` | |
| `ActionBuilder.lookAtCameraAction` | |
| `ActionBuilder.emphasize` | |
| `ActionBuilder.transformAction` | |
| `ActionBuilder.playAudioAction` | |

| Group Actions | |
| --- | --- |
| `ActionBuilder.sequence` | |
| `ActionBuilder.parallel` | |
| `GroupAction.addAction` | |
| `GroupAction.makeParallel` | |
| `GroupAction.makeSequence` | |
| `GroupAction.makeLooping` | |
| `GroupAction.makeRepeat` | |

हमारे अंतर्निहित Everywhere Actions के कार्यान्वयन को देखने के लिए, कृपया `src/engine-components/export/usdz/extensions/behavior/BehaviourComponents.ts` देखें।

## आगे पढ़ें

निम्नलिखित पृष्ठ अधिक उदाहरण और नमूने प्रदान करते हैं जिनका आप अभी परीक्षण और अन्वेषण कर सकते हैं:

- हमारी [AR Showcase Website](https://engine.needle.tools/projects/ar-showcase/) पर जाएँ, जिसमें iOS AR और Quicklook पर ध्यान केंद्रित करते हुए कई इंटरैक्टिव AR उदाहरण हैं।
- [Needle Engine Everywhere Action Samples](https://engine.needle.tools/samples/?overlay=samples&tag=everywhere+actions)

Page automatically translated using AI
पेज का अनुवाद स्वचालित रूप से AI का उपयोग करके किया गया है