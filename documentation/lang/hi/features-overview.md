# सुविधा अवलोकन

नीडल इंजन एक पूरी तरह से विकसित 3D इंजन है जो ब्राउज़र में चलता है। इसमें वे सभी सुविधाएँ हैं जिनकी आप एक आधुनिक 3D इंजन से अपेक्षा करते हैं, और बहुत कुछ। यदि आपने अभी तक नहीं किया है, तो हमारे [होमपेज](https://needle.tools) और हमारे [नमूने और शोकेस](https://engine.needle.tools/samples) पर एक नज़र डालें।

[[toc]]

## शेडर्स और मटेरियल

PBR मटेरियल और Shader Graph या अन्य सिस्टम से बनाए गए कस्टम शेडर्स दोनों को एक्सपोर्ट किया जा सकता है।

<img src="https://user-images.githubusercontent.com/5083203/186012027-9bbe3944-fa56-41fa-bfbb-c989fa87aebb.png" />

वेब के लिए शेडर बनाने हेतु नोड आधारित [ShaderGraph](https://unity.com/features/shader-graph) का उपयोग करें। ShaderGraph कलाकारों के लिए सिंटैक्स की चिंता किए बिना रचना करना आसान बनाता है।

[PBR मटेरियल](./export.md#physically-based-materials-pbr) • [कस्टम शेडर्स](./export.md#custom-shaders) के बारे में और पढ़ें

## क्रॉसप्लेटफ़ॉर्म: VR, AR, मोबाइल, डेस्कटॉप
नीडल इंजन हर जगह चलता है जहाँ वेब तकनीक चलती है: डेस्कटॉप, मोबाइल, AR या VR पर एक ही एप्लिकेशन चलाएँ। हम XR को ध्यान में रखकर [नीडल इंजन बनाते हैं](./xr.md) और इसे रिस्पोंसिव वेब डिज़ाइन का एक अभिन्न अंग मानते हैं!

Android और iOS दोनों पर **इंटरैक्टिव AR** के लिए [एवरीवेयर एक्शन](./everywhere-actions.md) का उपयोग करें।

## लाइटमैप्स

![lightmaps](https://user-images.githubusercontent.com/5083203/186163693-093c7ae2-96eb-4d75-b98f-bf19f78032ff.gif)

अपने 3डी सामग्री में आसानी से सुंदर स्थिर प्रकाश जोड़ने के लिए Unity या Blender में लाइटमैप्स को बेक किया जा सकता है। वेब के लिए लाइटबेकिंग इतना आसान कभी नहीं रहा। बस उन वस्तुओं को चिह्नित करें जिन्हें आप Unity में स्टैटिक के रूप में लाइटमैप करना चाहते हैं, अपने दृश्य में एक या कई रोशनी जोड़ें (या एमिसिव मटेरियल का उपयोग करें) और बेक पर क्लिक करें। नीडल इंजन आपके लाइटमैप्स को प्रति दृश्य एक्सपोर्ट करेगा और उन्हें स्वचालित रूप से लोड और प्रदर्शित करेगा जैसा कि आप उसे एडिटर में देखते हैं!

> **नोट**: इस पर कोई तकनीकी सीमा नहीं है कि किस लाइटमैपर का उपयोग करें, जब तक वे Unity के लाइटमैपिंग डेटा स्ट्रक्चर में समाप्त होते हैं। [Bakery](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218) जैसे थर्ड पार्टी लाइटमैपर भी समर्थित हैं।

- [लाइटमैप्स एक्सपोर्ट करने](https://fwd.needle.tools/needle-engine/docs/lightmaps) के बारे में और पढ़ें

## मल्टीप्लेयर और नेटवर्किंग
नेटवर्किंग कोर रनटाइम में निर्मित है। Glitch पर Needle Engine के डिप्लॉयमेंट एक छोटे सर्वर के साथ आते हैं जो आपको सेकंडों में एक मल्टीप्लेयर 3D वातावरण डिप्लॉय करने की अनुमति देता है। अंतर्निहित नेटवर्क वाले कंपोनेंट्स शुरुआत करना आसान बनाते हैं, और आप अपने स्वयं के सिंक्रनाइज़ किए गए कंपोनेंट बना सकते हैं। वेरिएबल्स और स्टेट को सिंक्रनाइज़ करना बहुत आसान है!

- [नेटवर्किंग](https://fwd.needle.tools/needle-engine/docs/networking) • [स्क्रिप्टिंग](https://fwd.needle.tools/needle-engine/docs/scripting) के बारे में और पढ़ें

## एनिमेशन और सीक्वेंसिंग
नीडल इंजन वेब पर शक्तिशाली एनिमेशन, स्टेट कंट्रोल और सीक्वेंसिंग लाता है - बस एक सिंगल एनिमेशन चलाने से लेकर जटिल एनिमेशन और कैरेक्टर कंट्रोलर को ऑर्केस्ट्रेट और ब्लेंड करने तक। एक्सपोर्टर Unity कंपोनेंट्स जैसे Animator और Timeline को वेब-रेडी फॉर्मेट में ट्रांसलेट कर सकता है। हमने यह कार्यक्षमता अपने Blender ऐडऑन में भी जोड़ी है ताकि आप अनुकूल एनीमेशन स्टेट मशीन बना सकें और Blender के भीतर से nla ट्रैक को टाइमलाइन के रूप में वेब पर एक्सपोर्ट कर सकें।

- [एनीमेशन कंपोनेंट्स](./component-reference.md#animation) के बारे में और पढ़ें

### Animator

<img src="https://user-images.githubusercontent.com/5083203/186011302-176524b3-e8e5-4e6e-9b77-7faf3561bb15.png" />

Unity में [Animator और AnimatorController](https://docs.unity3d.com/Manual/class-AnimatorController.html) कंपोनेंट्स आपको एनिमेशन सेटअप करने और उनके बीच कब और कैसे ब्लेंड करना है, इसके लिए शर्तें परिभाषित करने देते हैं। हम स्टेट मशीन, StateMachineBehaviours, ट्रांज़िशन और लेयर्स को एक्सपोर्ट करने का समर्थन करते हैं। StateMachineBehaviours भी ``OnStateEnter``, ``OnStateUpdate`` और ``OnStateExit`` इवेंट के साथ समर्थित हैं।

> **नोट**: सब-स्टेट्स और ब्लेंड ट्री समर्थित नहीं हैं।

### Timeline

![2022-08-23-013517_Scene](https://user-images.githubusercontent.com/5083203/186037829-ee99340d-b19c-484d-b551-94797519c9d9.png)

हम [Unity के Timeline](https://unity.com/features/timeline) सेटअप और ट्रैक को भी वेब-रेडी फॉर्मेट में ट्रांसलेट कर रहे हैं।
समर्थित ट्रैक में शामिल हैं: AnimationTrack, AudioTrack, ActivationTrack, ControlTrack, SignalTrack।

> **नोट**: सब-टाइमलाइन वर्तमान में समर्थित नहीं हैं।

> **नोट**: [कस्टम टाइमलाइन ट्रैक एक्सपोर्ट करना](https://github.com/needle-tools/needle-engine-modules/tree/main/package/TimelineHtml) संभव है।

- [एनीमेशन कंपोनेंट्स](./component-reference.md#animation) के बारे में और पढ़ें

## फिजिक्स
अपनी दुनिया में कुछ शानदार फिजिक्स जोड़ने के लिए Rigidbodies, Mesh Colliders, Box Colliders और SphereColliders का उपयोग करें।

- [फिजिक्स कंपोनेंट्स](./component-reference.md#physics) के बारे में और पढ़ें

<sample src="https://engine.needle.tools/samples-uploads/physics-animation/" />

## UI
Unity के UI कैनवास सिस्टम का उपयोग करके UI बनाना विकास के अधीन है। वर्तमान में सुविधाओं में टेक्स्ट (फ़ॉन्ट सहित), चित्र, बटन एक्सपोर्ट करना शामिल है।

समर्थित कंपोनेंट के लिए [ui कंपोनेंट संदर्भ](component-reference.md#ui) देखें।

<sample src="https://engine.needle.tools/samples-uploads/screenspace-ui" />

## पार्टिकल्स
Unity ParticleSystem (Shuriken) का एक्सपोर्ट विकास के अधीन है। वर्तमान में सुविधाओं में वर्ल्ड/लोकल स्पेस सिमुलेशन, बॉक्स और स्फीयर एमिटर आकार, समय के साथ उत्सर्जन के साथ-साथ बर्स्ट उत्सर्जन, समय के साथ वेग और रंग, वेग द्वारा उत्सर्जन, टेक्स्चरशीट एनीमेशन, बेसिक ट्रेल्स शामिल हैं।
नीचे समर्थित सुविधाओं का [लाइव नमूना](https://engine.needle.tools/samples/particles) देखें:

<sample src="https://engine.needle.tools/samples-uploads/particles/" />

## पोस्टप्रोसेसिंग

अंतर्निहित प्रभावों में Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction शामिल हैं। आप अपने स्वयं के कस्टम प्रभाव भी बना सकते हैं। पूरी सूची के लिए [कंपोनेंट संदर्भ](./component-reference.md#postprocessing) देखें।

<sample src="https://engine.needle.tools/samples-uploads/postprocessing/" />

## एडिटर इंटीग्रेशन
नीडल इंजन Unity Editor और Blender में शक्तिशाली इंटीग्रेशन के साथ आता है। यह आपको कलाकारों और डेवलपर्स के बीच आसान और लचीले सहयोग प्रदान करने वाले दृश्य तरीके से जटिल दृश्यों को सेटअप और एक्सपोर्ट करने की अनुमति देता है।

## स्क्रिप्टिंग
नीडल इंजन [कंपोनेंट आधारित वर्कफ़्लो](scripting.md#component-architecture) का उपयोग करता है। टाइपस्क्रिप्ट या जावास्क्रिप्ट में कस्टम स्क्रिप्ट बनाएं। Unity में एकीकृत हमारे [मॉड्यूलर npm-आधारित पैकेज वर्कफ़्लो](https://fwd.needle.tools/needle-engine/docs/npmdef) का उपयोग करें। एक [टाइपस्क्रिप्ट से C# कंपोनेंट कंपाइलर](https://fwd.needle.tools/needle-engine/docs/component-compiler) तुरंत जादुई रूप से Unity कंपोनेंट बनाता है।

- [स्क्रिप्टिंग संदर्भ](scripting) • [Npm परिभाषा फाइलें](https://fwd.needle.tools/needle-engine/docs/npmdef) के बारे में और पढ़ें

## और भी बहुत कुछ है

- पोस्टप्रोसेसिंग → Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction...
- EditorSync → स्थानीय विकास के लिए Unity में संपादन को चल रहे three.js एप्लिकेशन से लाइव सिंक्रनाइज़ करें
- iOS और Android पर इंटरैक्टिव AR → हमारे [एवरीवेयर एक्शन](./everywhere-actions.md) फीचर सेट का उपयोग करें या अपना खुद का बनाएं

---
# आगे कहाँ जाएँ

नीडल इंजन को डाउनलोड और सेटअप करने के तरीके के बारे में जानने के लिए हमारी [आरंभ करने वाली गाइड](getting-started/) देखें।
[हमारे विज़न](vision) के बारे में जानें या इसे शक्ति प्रदान करने वाले कुछ [तकनीकी पृष्ठभूमि और glTF](technical-overview) में गहराई से उतरें।

यह पेज AI द्वारा स्वचालित रूप से अनुवादित किया गया है