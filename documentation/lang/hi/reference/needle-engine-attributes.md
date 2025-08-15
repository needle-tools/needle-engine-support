---
title: <needle-engine> कॉन्फ़िगरेशन
---

## Needle Engine वेब कंपोनेंट के एट्रीब्यूट्स

Needle Engine एक वेब कंपोनेंट के रूप में उपलब्ध है: `<needle-engine>`। इस कंपोनेंट का उपयोग वेब ब्राउज़र में 3D दृश्यों, मॉडलों और अधिक को लोड और प्रदर्शित करने के लिए किया जा सकता है। यह एट्रीब्यूट्स के एक सेट के साथ आता है जो आपको इसके व्यवहार, लुक और फील को कॉन्फ़िगर करने की अनुमति देता है। इन सभी सेटिंग्स को कोड द्वारा ओवरराइट किया जा सकता है, लेकिन एट्रीब्यूट्स HTML में उन्हें सेट करने का एक सुविधाजनक तरीका हैं।

::: tip वेब कंपोनेंट `index.html` में है
चाहे Unity या Blender के माध्यम से, या सीधे कोड में कोई प्रोजेक्ट बना रहे हों, आप `<needle-engine>` वेब कंपोनेंट का उपयोग और समायोजन कर सकते हैं। आमतौर पर, आपको यह आपके वेब प्रोजेक्ट की `index.html` फ़ाइल में मिलेगा।
:::

नीचे दी गई तालिका उपलब्ध एट्रीब्यूट्स और उनके विवरणों की सूची दर्शाती है।

| Attribute | Description |
| --- | --- |
| **लोडिंग** | |
| `src` | एक या एकाधिक glTF या glb फ़ाइलों का पाथ।<br/>समर्थित प्रकार `string`, `string[]` या एक स्ट्रिंगिफाइड एरे (`,` से अलग किया गया) हैं। |
| `dracoDecoderPath` | Draco डिकोडर का URL, उदा. `./include/draco/` लोकल Draco डिकोडर का उपयोग करने के लिए |
| `dracoDecoderType` | Draco डिकोडर प्रकार। विकल्प `wasm` या `js` हैं। [three.js documentation](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) देखें। |
| `ktx2DecoderPath` | KTX2 डिकोडर का URL, उदा. `./include/ktx2/` लोकल KTX2 डिकोडर का उपयोग करने के लिए |
| **रेंडरिंग** | |
| `background-color` | वैकल्पिक, बैकग्राउंड कलर के रूप में उपयोग करने के लिए हेक्स कलर। उदाहरण: `rgb(255, 200, 100)`, `#dddd00` |
| `background-image` | वैकल्पिक, स्काईबॉक्स इमेज (बैकग्राउंड इमेज) का URL या एक प्रीसेट स्ट्रिंग: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `background-blurriness` | वैकल्पिक, `background-image` के लिए 0 (कोई धुंधलापन नहीं) और 1 (अधिकतम धुंधलापन) के बीच धुंधलापन मान। उदाहरण: `background-blurriness="0.5"` |
| `environment-image` | वैकल्पिक, एनवायरनमेंट इमेज (एनवायरनमेंट लाइट) का URL या एक प्रीसेट स्ट्रिंग: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `contactshadows` | वैकल्पिक, कॉन्टैक्ट शैडो रेंडर करें |
| `tone-mapping` | वैकल्पिक, समर्थित मान `none`, `linear`, `neutral`, `agx` हैं। |
| `tone-mapping-exposure` | वैकल्पिक संख्या, उदा. `tone-mapping-exposure="1.5"` के साथ एक्सपोजर बढ़ाएं, इसके लिए `tone-mapping` सेट होना आवश्यक है। |
| **इंटरैक्शन** | |
| `autoplay` | एनिमेशन को ऑटो प्ले करने के लिए जोड़ें या `true` पर सेट करें, उदा. `<needle-engine autoplay` |
| `camera-controls` | यदि दृश्य में कोई कैमरा नियंत्रण नहीं मिलता है तो स्वचालित रूप से OrbitControls जोड़ने के लिए जोड़ें या `true` पर सेट करें। |
| `auto-rotate` | ऑटो-रोटेट सक्षम करने के लिए जोड़ें (केवल `camera-controls` के साथ उपयोग किया जाता है) |
| **इवेंट्स** | |
| `loadstart` | लोडिंग शुरू होने पर कॉल करने के लिए फ़ंक्शन का नाम। ध्यान दें कि आर्गुमेंट `(ctx:Context, evt:Event)` हैं। आप डिफ़ॉल्ट लोडिंग ओवरले छिपाने के लिए `evt.preventDefault()` को कॉल कर सकते हैं। |
| `progress` | लोडिंग अपडेट होने पर कॉल करने के लिए फ़ंक्शन का नाम। `onProgress(ctx:Context, evt: {detail: {context:Context, name:string, index:number, count:number, totalProgress01:number}) { ... }` |
| `loadfinished` | लोडिंग समाप्त होने पर कॉल करने के लिए फ़ंक्शन का नाम |
| **लोडिंग डिस्प्ले** | *Needle Engine लोडिंग डिस्प्ले कैसा दिखता है, इसे बदलने के लिए उपलब्ध विकल्प। आसान संपादन के लिए `?debugloadingrendering` का उपयोग करें।* |
| `loading-background` | **PRO** — डिफ़ॉल्ट: `transparent`। लोडिंग बैकग्राउंड कलर बदलें (उदा. `#dd5500`) |
| `loading-logo-src` | **PRO** — लोडिंग लोगो इमेज बदलें (उदा. `https://yourdomain.com/logo.png` या `/logo.png`) |
| `hide-loading-overlay` | **PRO** — लोडिंग ओवरले न दिखाएं |
| **आंतरिक** | |
| `hash` | आंतरिक रूप से उपयोग किया जाता है, अपडेट लागू करने के लिए लोड की जा रही फ़ाइलों में जोड़ा जाता है (उदा. जब ब्राउज़र ने `glb` फ़ाइल को कैश किया हो)। इसे मैन्युअल रूप से संपादित नहीं किया जाना चाहिए। |

**अपग्रेड सूचना**:
- Needle Engine 4.5.0 में हटाए गए एट्रीब्यूट्स `loading-style`, `loading-background-color`, `loading-text-color`, `primary-color`, `secondary-color`

# उदाहरण

```html
<!-- लोड किए जाने वाले कस्टम glb का पाथ सेट करना -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- draco डिकोडर कहाँ स्थित है, इसे ओवरराइड करना -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="./include/draco/"></needle-engine>
```

एनवायरनमेंट इमेज सेट करना, एनिमेशन चलाना और स्वचालित कैमरा नियंत्रण। इसे [stackblitz पर लाइव देखें](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)
```html
<needle-engine
      camera-controls
      auto-rotate
      autoplay
      skybox-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      environment-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf"
      >
      </needle-engine>
```

`needle-engine` कॉन्टेक्स्ट का लोडिंग समाप्त होने पर एक इवेंट प्राप्त करना:
```html
<needle-engine loadfinished="onLoadFinished"> </needle-engine>
<script>
    function onLoadFinished() {
        console.log("Needle Engine has finished loading");
    }
</script>
```

### कस्टम लोडिंग स्टाइल (PRO)

आप `<needle-engine>` वेब कंपोनेंट पर उपयुक्त एट्रीब्यूट्स सेट करके Needle Engine कैसा दिखता है, इसे आसानी से संशोधित कर सकते हैं। विवरण के लिए ऊपर दी गई तालिका देखें।

![custom loading](/imgs/custom-loading-style.webp)
[github पर कोड देखें](https://github.com/needle-engine/vite-template/blob/loading-style/custom/index.html)

---
यह पृष्ठ AI का उपयोग करके स्वचालित रूप से अनुवादित किया गया है।