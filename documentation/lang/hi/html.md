---
title: फ्रेमवर्क, बंडलर्स, HTML
---

## बंडलिंग और वेब फ्रंटएंड्स

Needle Engine को एक वेब कंपोनेंट के तौर पर बनाया गया है।
इसका मतलब है कि अपने प्रोजेक्ट में `@needle-tools/engine` इंस्टॉल करें और `<needle-engine src="path/to/your.glb">` को अपने वेब-प्रोजेक्ट में कहीं भी शामिल करें।

- npm का उपयोग करके इंस्टॉल करें:
  `npm i @needle-tools/engine`

हमारे डिफ़ॉल्ट Vite आधारित प्रोजेक्ट टेम्पलेट के साथ, Needle Engine डिप्लॉयमेंट पर एक वेब ऐप में बंडल हो जाता है। यह छोटी फ़ाइलों, ट्री-शेकिंग (Unity में कोड स्ट्रिपिंग के समान) और ऑप्टिमाइज़्ड लोड टाइम सुनिश्चित करता है। कई छोटी स्क्रिप्ट और कंपोनेंट डाउनलोड करने के बजाय, केवल एक या कुछ ही डाउनलोड होते हैं जिनमें न्यूनतम आवश्यक कोड होता है।

Vite (हमारा डिफ़ॉल्ट बंडलर) का एक अच्छा स्पष्टीकरण है कि वेब ऐप्स को बंडल क्यों किया जाना चाहिए: [Why Bundle for Production](https://vitejs.dev/guide/why.html)

### Vite, Vue, React, Svelte, React Three Fiber...

Needle Engine फ्रेमवर्क के चयन के बारे में तटस्थ है। हमारा डिफ़ॉल्ट टेम्पलेट लोकप्रिय [vite](https://vitejs.dev) को बंडलर के रूप में उपयोग करता है। वहाँ से, आप vue, svelte, nuxt, react, react-three-fiber या अन्य फ्रेमवर्क जोड़ सकते हैं, और हमारे पास उनमें से कई के लिए सैंपल हैं। आप अन्य बंडलर भी इंटीग्रेट कर सकते हैं, या किसी का भी उपयोग नहीं कर सकते हैं - बस सादा HTML और Javascript।

यहाँ कुछ उदाहरण तकनीकी स्टैक दिए गए हैं जो संभव हैं और जिनके साथ हम Needle Engine का उपयोग करते हैं:

- **Vite + HTML** — हमारे डिफ़ॉल्ट टेम्पलेट में यही उपयोग होता है!

- **Vite + Vue** — [Needle Tools](https://needle.tools) वेबसाइट में यही उपयोग होता है! डाउनलोड करने के लिए एक सैंपल [यहाँ](https://github.com/needle-tools/needle-engine-samples) पाएं।
- **Vite + Svelte**
- **Vite + SvelteKit**
- **Vite + React** — Unity इंटीग्रेशन के साथ एक प्रायोगिक टेम्पलेट आता है जिसे आप प्रोजेक्ट जेनरेट करते समय चुन सकते हैं!
- **react-three-fiber** — Unity इंटीग्रेशन के साथ एक प्रायोगिक टेम्पलेट आता है जिसे आप प्रोजेक्ट जेनरेट करते समय चुन सकते हैं!
- **Vercel & Nextjs** — एक [उदाहरण nextjs प्रोजेक्ट यहाँ](https://github.com/needle-engine/nextjs-sample) पाएं।
- **CDN without any bundler** — एक कोड उदाहरण [यहाँ](./vanilla-js.md) पाएं।

संक्षेप में: हम वर्तमान में एक न्यूनतम vite टेम्पलेट प्रदान कर रहे हैं, लेकिन आप इसे बढ़ा सकते हैं या अन्य फ्रेमवर्क पर स्विच कर सकते हैं -
हमें बताएं कि आप क्या और कैसे बनाते हैं, और हम आपके उपयोग के मामले के लिए अनुभव को कैसे बेहतर बना सकते हैं या एक उदाहरण प्रदान कर सकते हैं!

:::tip
कुछ फ्रेमवर्क को `needle.config.json` में कस्टम सेटिंग्स की आवश्यकता होती है। अधिक जानकारी [यहाँ](./reference/needle-config-json.md) पाएं। आमतौर पर, `baseUrl` सेट करने की आवश्यकता होती है।
:::

:::details मैं Unity में एक कस्टम प्रोजेक्ट टेम्पलेट कैसे बनाऊं?

आप अन्य बंडलर, बिल्ड सिस्टम, या किसी का भी उपयोग न करने के लिए अपने स्वयं के वेब प्रोजेक्ट टेम्पलेट बना और साझा कर सकते हैं।

**एक नया टेम्पलेट बनाएं**
1. उस फ़ोल्डर में एक ProjectTemplate जोड़ने के लिए `Create/Needle Engine/Project Template` चुनें जिसे आप टेम्पलेट के रूप में उपयोग करना चाहते हैं।
2. हो गया! यह इतना सरल है।

निर्भरताएँ Unity से आती हैं जब प्रोजेक्ट में NpmDef होता है (इसलिए जब आपका प्रोजेक्ट स्थानीय संदर्भों का उपयोग करता है)।
आप अपने पैकेजों को npm पर भी प्रकाशित कर सकते हैं और संस्करण संख्या के माध्यम से उनका संदर्भ दे सकते हैं।
:::

### Tree-shaking बंडल आकार को कम करने के लिए

Tree shaking वेब एप्लिकेशन के बंडलिंग के संबंध में एक सामान्य अभ्यास को संदर्भित करता है ([MSDN docs देखें](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking))। इसका मतलब है कि आपके कोड में उपयोग नहीं किए गए कोड पथ और सुविधाओं को फ़ाइल का आकार कम करने के लिए अंतिम बंडल किए गए javascript फ़ाइल(फ़ाइलों) से हटा दिया जाएगा। Needle Engine में शामिल सुविधाओं के बारे में नीचे देखें और उन्हें हटा दें:

:::details Rapier physics engine को कैसे हटाएं? (कुल बंडल आकार को ~2MB (~600KB gzipping करने पर) कम करना)

- **विकल्प 1**: needlePlugins कॉन्फ़िगरेशन के माध्यम से:
  अपने vite.config में `useRapier` को `false` पर सेट करें: `needlePlugins(command, needleConfig, { useRapier: false }),`

- **विकल्प 2**: vite.define कॉन्फ़िगरेशन के माध्यम से:
  `NEEDLE_USE_RAPIER` को `false` के साथ परिभाषित करें
  ```js
  define: {
    NEEDLE_USE_RAPIER: false
  },
  ```

- **विकल्प 3**: .env के माध्यम से
  अपने वेब प्रोजेक्ट में एक `.env` फ़ाइल बनाएं और `VITE_NEEDLE_USE_RAPIER=false` जोड़ें

- **विकल्प 4**: Unity कंपोनेंट के माध्यम से
  अपने सीन में `Needle Engine Modules` कंपोनेंट जोड़ें और `Physics Engine` को `None` पर सेट करें
  ![](/imgs/unity-needle-engine-modules-physics.jpg)

:::

## एक PWA बनाना

हम अपने vite टेम्पलेट से सीधे Progressive Web App (PWA) बनाना आसानी से सपोर्ट करते हैं।
PWA वेब एप्लिकेशन होते हैं जो नियमित वेब पेज या वेबसाइटों की तरह लोड होते हैं लेकिन उपयोगकर्ता को ऑफ़लाइन काम करने, पुश नोटिफिकेशन और डिवाइस हार्डवेयर एक्सेस जैसी कार्यक्षमता प्रदान कर सकते हैं जो पारंपरिक रूप से केवल मूल मोबाइल एप्लिकेशन के लिए उपलब्ध थी।

डिफ़ॉल्ट रूप से, Needle के साथ बनाए गए PWA में ऑफ़लाइन समर्थन होता है, और यदि आप अपने ऐप का नया संस्करण प्रकाशित करते हैं तो वे वैकल्पिक रूप से स्वचालित रूप से रीफ़्रेश हो सकते हैं।

1) अपने वेब प्रोजेक्ट में [Vite PWA plugin](https://vite-pwa-org.netlify.app/) इंस्टॉल करें: `npm install vite-plugin-pwa --save-dev`
2) नीचे दिखाए अनुसार `vite.config.js` को संशोधित करें। सुनिश्चित करें कि आप `needlePlugins` और `VitePWA` दोनों को समान `pwaOptions` ऑब्जेक्ट पास करें।

```js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async ({ command }) => {

    // Create the pwaOptions object.
    // You can edit or enter PWA settings here (e.g. change the PWA name or add icons).
    /** @type {import("vite-plugin-pwa").VitePWAOptions} */
    const pwaOptions = {};

    const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");

    return {
        plugins: [
            // pass the pwaOptions object to the needlePlugins and the VitePWA function
            needlePlugins(command, needleConfig, { pwa: pwaOptions }),
            VitePWA(pwaOptions),
        ],
        // the rest of your vite config...
```

:::tip डिफ़ॉल्ट रूप से सभी एसेट कैश किए जाते हैं
ध्यान दें कि डिफ़ॉल्ट रूप से, आपके बिल्ड फ़ोल्डर में सभी एसेट PWA precache में जोड़े जाते हैं - कई डायनामिक एसेट वाले बड़े एप्लिकेशन के लिए, यह वह नहीं हो सकता है जो आप चाहते हैं (कल्पना कीजिए कि YouTube PWA उपयोगकर्ता द्वारा ऐप खोलने के बाद सभी वीडियो कैश करता है!)। इस व्यवहार को कस्टमाइज़ करने के तरीके के लिए [More PWA Options](#more-pwa-options) देखें।
:::

### PWA का परीक्षण

अपने PWA का परीक्षण करने के लिए, पृष्ठ को डिप्लॉय करें, उदाहरण के लिए `DeployToFTP` कंपोनेंट का उपयोग करके।
फिर, डिप्लॉय किए गए पृष्ठ को ब्राउज़र में खोलें और जांचें कि PWA सुविधाएँ अपेक्षा के अनुसार काम करती हैं या नहीं:
- ऐप इंस्टाल करने योग्य के रूप में दिखाई देता है
- ऐप ऑफ़लाइन काम करता है
- ऐप को [pwabuilder.com](https://pwabuilder.com/) द्वारा ऑफ़लाइन-सक्षम PWA के रूप में पहचाना जाता है

PWA संसाधन कैश करने और ऑफ़लाइन समर्थन प्रदान करने के लिए Service Workers का उपयोग करते हैं। विकास के दौरान Service Workers का उपयोग करना कुछ हद तक कठिन होता है, और आमतौर पर वे केवल बिल्ड के लिए सक्षम होते हैं (उदाहरण के लिए जब आप `DeployTo...` कंपोनेंट का उपयोग करते हैं)।

आप अपनी `vite.config.js` में विकल्पों ऑब्जेक्ट में निम्नलिखित जोड़कर विकास के लिए PWA समर्थन सक्षम कर सकते हैं।

```js
const pwaOptions = {
  // Note: PWAs behave different in dev mode.
  // Make sure to verify the behaviour in production builds!
  devOptions: {
    enabled: true,
  }
};
```

कृपया ध्यान दें कि विकास मोड में PWA ऑफ़लाइन उपयोग का समर्थन नहीं करते हैं - इसे आज़माने से अप्रत्याशित व्यवहार हो सकता है।

### स्वचालित रूप से चल रहे ऐप्स को अपडेट करना

वेबसाइटें आमतौर पर पेज रीफ़्रेश पर नई या अपडेट की गई सामग्री दिखाती हैं।

कुछ स्थितियों में, आप चाहते हैं कि पृष्ठ स्वचालित रूप से रीफ़्रेश और रीलोड हो जाए जब कोई नया संस्करण प्रकाशित हो -
जैसे कि संग्रहालय, व्यापार शो, सार्वजनिक प्रदर्शन, या अन्य लंबे समय तक चलने वाले परिदृश्यों में।

स्वचालित अपडेट सक्षम करने के लिए, pwaOptions ऑब्जेक्ट में `updateInterval` प्रॉपर्टी को एक अवधि (मिलीसेकंड में) पर सेट करें जिसमें ऐप को अपडेट के लिए जांच करनी चाहिए। यदि कोई अपडेट पाया जाता है, तो पृष्ठ स्वचालित रूप से रीलोड हो जाएगा।

```js
const pwaOptions = {
  updateInterval: 15 * 60 * 1000, // 15 minutes, in milliseconds
};
```

:::tip आवधिक रीलोड और उपयोगकर्ता डेटा
ऐसे एप्लिकेशन में स्वचालित रीलोड का उपयोग करने की अनुशंसा नहीं की जाती है जहां उपयोगकर्ता फॉर्म या अन्य डेटा के साथ इंटरैक्ट कर रहे हों जो रीलोड पर खो सकता है। ऐसे एप्लिकेशन के लिए, रीलोड प्रॉम्प्ट दिखाने की अनुशंसा की जाती है।
रीलोड के बजाय रीलोड प्रॉम्प्ट को कैसे लागू करें, इस बारे में अधिक जानकारी के लिए [Vite PWA plugin documentation](https://vite-pwa-org.netlify.app/guide/prompt-for-update.html) देखें।
:::

### अधिक PWA विकल्प

चूंकि Needle पर्दे के पीछे [Vite PWA plugin](https://vite-pwa-org.netlify.app/) का उपयोग करता है, आप इसके द्वारा प्रदान किए गए सभी विकल्पों और हुक का उपयोग कर सकते हैं।
उदाहरण के लिए, आप एक कस्टम ऐप शीर्षक या थीम रंग के साथ आंशिक मैनिफ़ेस्ट प्रदान कर सकते हैं:

```js
const pwaOptions = {
  // manifest options provided here will override the defaults
  manifest: {
    name: "My App",
    short_name: "My App",
    theme_color: "#B2D464",
  }
};
```

आंशिक कैशिंग, कस्टम सर्विस वर्कर या विभिन्न अपडेट रणनीतियों जैसी जटिल आवश्यकताओं के लिए, आप `needlePlugins` से `{ pwa: pwaOptions }` विकल्प हटा सकते हैं और Vite PWA plugin के माध्यम से सीधे PWA कार्यक्षमता जोड़ सकते हैं।

## Needle Engine और कंपोनेंट को बाहरी javascript से एक्सेस करना

आपके द्वारा उजागर किया गया कोड बंडलिंग के बाद JavaScript से एक्सेस किया जा सकता है। यह दर्शक और अन्य एप्लिकेशन बनाने की अनुमति देता है जहां संपादन समय में ज्ञात डेटा और रनटाइम में ही ज्ञात डेटा (जैसे गतिशील रूप से लोड की गई फ़ाइलें, उपयोगकर्ता द्वारा जेनरेट की गई सामग्री) के बीच विभाजन होता है।
इंजन के बाहर नियमित javascript से कंपोनेंट एक्सेस करने के लिए कृपया [interop with regular javascript section](./scripting.md#accessing-needle-engine-and-components-from-anywhere) देखें।

## लोडिंग कैसे दिखती है इसे कस्टमाइज़ करना

[needle engine component reference](./reference/needle-engine-attributes.md) में *Loading Display* सेक्शन देखें।

### बिल्टिन स्टाइल

needle-engine की लोडिंग दिखावट लाइट या डार्क स्किन का उपयोग कर सकती है।
दिखावट बदलने के लिए `<needle-engine>` वेब कंपोनेंट पर `loading-style` विशेषता का उपयोग करें।
विकल्प `light` और `dark` (डिफ़ॉल्ट) हैं:

``<needle-engine loading-style="light"></needle-engine>``

### कस्टम लोडिंग स्टाइल — *PRO feature* #

कृपया [needle engine component reference](./reference/needle-engine-attributes.md) में *Loading Display* सेक्शन देखें।

![](/imgs/custom-loading-style.webp)

यह पृष्ठ AI का उपयोग करके स्वचालित रूप से अनुवादित किया गया है।