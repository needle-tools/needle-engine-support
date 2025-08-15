---
title: Needle Engine के साथ WebXR इमेज ट्रैकिंग
---

## WebXR इमेज ट्रैकिंग क्या है
**WebXR इमेज ट्रैकिंग ब्राउज़र को वास्तविक दुनिया में विशिष्ट छवियों का पता लगाने और उन्हें ट्रैक करने में सक्षम बनाता है** किसी डिवाइस के कैमरे के माध्यम से, पोस्टर, पैकेजिंग या कलाकृति जैसे भौतिक मार्करों पर वर्चुअल सामग्री को सटीक रूप से एंकर करने के लिए वास्तविक समय स्थिति और अभिविन्यास डेटा प्रदान करता है।

किसी मान्यता प्राप्त इमेज पर कैमरे को इंगित करके, इमेज ट्रैकिंग एपीआई वर्चुअल और भौतिक तत्वों के बीच स्थानिक संबंध को लगातार अपडेट करता है, जिससे डिवाइस या इमेज के हिलने पर भी उचित संरेखण सुनिश्चित होता है।

इमेज ट्रैकिंग स्थिर छवियों को इंटरैक्टिव AR ट्रिगर में बदल देती है—जो संग्रहालय चित्रों को ओवरलेड जानकारी प्रदर्शित करने, उत्पाद पैकेजों को 3D एनिमेशन प्रकट करने, या व्यावसायिक कार्डों को तैरते हुए संपर्क विवरण दिखाने की अनुमति देती है—यह सब वेब मानकों के माध्यम से उपयोगकर्ताओं को समर्पित ऐप्स डाउनलोड करने की आवश्यकता के बिना होता है, जिससे AR अनुभव किसी भी संगत वेब ब्राउज़र के माध्यम से तुरंत सुलभ हो जाते हैं।

## डेमो

Needle Engine Android पर **WebXR इमेज ट्रैकिंग** ([लाइव डेमो](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) और iOS पर **QuickLook इमेज ट्रैकिंग** का समर्थन करता है।

नीचे दिए गए सीन को AR में शुरू करें और अपने फोन के कैमरे को स्क्रीन पर मौजूद इमेज मार्कर पर इंगित करें, या इसे प्रिंट कर लें।

:::info Android पर WebXR इमेज ट्रैकिंग
**Android पर** कृपया Chrome फ़्लैग्स में "WebXR Incubations" चालू करें। आप उन्हें अपने Android फ़ोन के Chrome ब्राउज़र एड्रेस बार में [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubation) पेस्ट करके पा सकते हैं।
:::

<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="इमेज मार्कर" width=300 />

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />

## एक्स्प्लेनर

:::warning WebXR इमेज ट्रैकिंग अभी भी "ड्राफ्ट" चरण में है और आम तौर पर उपलब्ध नहीं है
अभी तक, ब्राउज़र विक्रेता WebXR के लिए अंतिम इमेज ट्रैकिंग API पर सहमत नहीं हो पाए हैं। जब तक विनिर्देश "ड्राफ्ट" चरण में है ([मार्कर ट्रैकिंग एक्स्प्लेनर](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
आपको और आपके ऐप के उपयोगकर्ताओं को Android डिवाइस पर WebXR इमेज ट्रैकिंग सक्षम करने के लिए इन चरणों का पालन करना होगा:
1. अपने Android Chrome ब्राउज़र पर ``chrome://flags`` पर जाएँ
2. `WebXR Incubations` विकल्प खोजें और सक्षम करें
:::

उस विशिष्टता के बिना, कोई अभी भी कैमरा इमेज एक्सेस का अनुरोध कर सकता है और डिवाइस की स्थिति निर्धारित करने के लिए कस्टम एल्गोरिदम चला सकता है। इसका नकारात्मक पक्ष यह है कि उपयोगकर्ताओं को कैमरा एक्सेस जैसी अतिरिक्त अनुमतियों को स्वीकार करना होगा, और ट्रैकिंग डिवाइस की मूल क्षमताओं जितनी सटीक नहीं होगी।

कैमरा एक्सेस और स्थानीय कंप्यूटर विजन एल्गोरिदम के आधार पर इमेज ट्रैकिंग जोड़ने के लिए यहां कुछ लाइब्रेरीज़ दी गई हैं:
   - FireDragonGameStudio द्वारा [Needle Engine के साथ प्रायोगिक AR.js एकीकरण](https://github.com/FireDragonGameStudio/NeedleAndARjs)
   - [AR.js](https://github.com/AR-js-org/AR.js) (ओपन सोर्स)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (ओपन सोर्स)

### एकीकरण
इमेज ट्रैकिंग को Unity और Blender दोनों में एक ऑब्जेक्ट में WebXRImageTracking घटक जोड़कर सेट किया जा सकता है। फिर अपनी छवियों को `Tracked Images` ऐरे में जोड़ें।

![unity screenshot](/imgs/webxr-image-tracking-unity-component.jpg)
*Unity में इमेज ट्रैकिंग घटक*

![blender screenshot](/imgs/webxr-image-tracking-blender-component.jpg)
*Blender में इमेज ट्रैकिंग घटक*

## संदर्भ

- [WebXR मार्कर ट्रैकिंग एक्स्प्लेनर](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)
- [WebXR डिवाइस API](https://www.w3.org/TR/webxr/)
- [कैन्यूस: WebXR](https://caniuse.com/webxr)
- [Apple के प्रारंभिक USD व्यवहार](https://developer.apple.com/augmented-reality/quick-look/)

## आगे पढ़ें
- [Needle एवरीवेयर एक्शन](./everywhere-actions.md) *ऐसे अनुभव जो हर जगह चलते हैं*
- [XR डॉक्यूमेंटेशन](./xr.md)

यह पृष्ठ AI का उपयोग करके स्वचालित रूप से अनुवादित किया गया है