---
title: needle.config.json
---

`needle.config.json` का उपयोग Needle Editor इंटीग्रेशन और Needle Engine बिल्ड पाइपलाइन प्लगइन्स के लिए कॉन्फ़िगरेशन प्रदान करने के लिए किया जाता है।

| | |
| --- | --- |
| **पाथ्स** | |
| `buildDirectory` | यह वह जगह है जहाँ बिल्ट प्रोजेक्ट फ़ाइलों को कॉपी किया जाता है। |
| `assetsDirectory` | यह वह जगह है जहाँ Editor इंटीग्रेशन एसेट्स को कॉपी किया जाएगा या बनाया जाएगा (उदाहरण के लिए, Unity या Blender से एक्सपोर्ट की गई `.glb` फ़ाइलें)। |
| `scriptsDirectory` | यह वह निर्देशिका है जहाँ Editor इंटीग्रेशन कंपोनेंट्स को दोबारा जनरेट करने के लिए कोड परिवर्तनों को देख रहा है। |
| `codegenDirectory` | यह वह जगह है जहाँ Editor इंटीग्रेशन जेनरेटेड फ़ाइलों को आउटपुट कर रहा है। |
| `baseUrl` | उदाहरण के लिए, next.js या SvelteKit इंटीग्रेशन के लिए आवश्यक है। जब baseUrl सेट किया जाता है, तो codegen और फ़ाइलों के अंदर रिलेटिव पाथ्स baseUrl का उपयोग करते हैं, न कि assetsDirectory का। यह उन मामलों में उपयोगी है जहाँ assetDirectory सर्वर URL से मेल नहीं खाता है।<br/>उदाहरण के लिए, डिस्क पर पाथ `"assetsDirectory": "public/assets"` हो सकता है, लेकिन फ्रेमवर्क `"baseUrl": "assets"` से फ़ाइलें सर्व करता है। |
| **टूल्स** | |
| `build : { copy: ["myFileOrDirectory"] }` | अतिरिक्त फ़ाइलों या फ़ोल्डरों को `buildDirectory` में कॉपी करने के लिए स्ट्रिंग पाथ्स का ऐरे। ये एब्सोल्यूट या रिलेटिव हो सकते हैं। |


#### मूल उदाहरण
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### कॉपी उदाहरण
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated",
  "build": {
    "copy": [
      "cards"
    ]
  }
}
```

#### अलग baseUrl के साथ उदाहरण (जैसे SvelteKit, Next.js)
फ़ाइलें `static/assets` में एक्सपोर्ट की जाती हैं, लेकिन फ्रेमवर्क उन्हें `/assets` से सर्व करता है। इस मामले में, `baseUrl` को `assets` पर सेट करने की आवश्यकता है ताकि फ़ाइलों में रिलेटिव पाथ्स सही हों।

```json
{
  "baseUrl": "assets",
  "buildDirectory": "dist",
  "assetsDirectory": "static/assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### संबंधित लिंक
- [प्रोजेक्ट स्ट्रक्चर](../project-structure.md)


पेज का अनुवाद AI का उपयोग करके स्वचालित रूप से किया गया है।