<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="नीडल लोगो" alt="नीडल लोगो"/> +
    <img src="/imgs/logo-webcomponents.png" style="max-height:70px;" title="वेब कंपोनेंट लोगो" alt="वेब कंपोनेंट लोगो"/> +
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="three.js लोगो" alt="three.js लोगो"/>
</div>

# वेब कंपोनेंट के रूप में Needle Engine

Needle Engine एक उपयोग में आसान वेब कंपोनेंट प्रदान करता है जिसका उपयोग कुछ ही पंक्तियों के कोड के साथ HTML में सीधे रिच, इंटरैक्टिव 3D सीन प्रदर्शित करने के लिए किया जा सकता है। यह वही वेब कंपोनेंट है जो हमारे इंटीग्रेशन को शक्ति देता है।

एक बार जब आप वेब कंपोनेंट के कॉन्फ़िगरेशन विकल्पों से आगे बढ़ जाते हैं, तो आप इसे कस्टम स्क्रिप्ट और कंपोनेंट, और पूर्ण प्रोग्रामेटिक सीन ग्राफ़ एक्सेस के साथ विस्तारित कर सकते हैं।

:::tip इंटीग्रेशन का उपयोग करें!
जटिल 3D सीन और तेज़ पुनरावृति के लिए, हम Needle Engine का उपयोग हमारे इंटीग्रेशन में से किसी एक के साथ करने की सलाह देते हैं। वे एक शक्तिशाली क्रिएशन वर्कफ़्लो प्रदान करते हैं, जिसमें एक लाइव प्रीव्यू, हॉट रीलोडिंग, और 3D ऑप्टिमाइज़ेशन के साथ एक उन्नत बिल्ड पाइपलाइन शामिल है।
:::

### त्वरित शुरुआत
:::: code-group
::: code-group-item index.html
@[code html](@code/basic-webcomponent.html)
:::
::: code-group-item परिणाम
<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%; 
    aspect-ratio: 16/9; 
    outline: none; 
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>
:::
::::
[Stackblitz पर इस उदाहरण को खोलें](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)



## npm से स्थापित करें

आप किसी भी इंटीग्रेशन का उपयोग किए बिना सीधे Needle Engine के साथ काम कर सकते हैं। Needle Engine [three.js](https://threejs.org/) को सीन ग्राफ़ और रेंडरिंग लाइब्रेरी के रूप में उपयोग करता है, इसलिए three.js की सभी कार्यक्षमता Needle में भी उपलब्ध है।

आप [`npm`](https://www.npmjs.com/package/@needle-tools/engine) से Needle Engine को चलाकर स्थापित कर सकते हैं:
<br/>
`npm i @needle-tools/engine`

## CDN से needle-engine स्थापित करें

जबकि हमारा डिफ़ॉल्ट टेम्पलेट [vite](https://vitejs.dev) का उपयोग करता है, Needle Engine को सीधे वैनिला Javascript के साथ भी उपयोग किया जा सकता है – बिना किसी बंडलर का उपयोग किए।

आप अपनी वेबसाइट पर कोड की केवल एक पंक्ति के साथ Needle Engine का एक पूर्ण, प्रीबंडल किया हुआ संस्करण जोड़ सकते हैं।
इसमें हमारे मुख्य कंपोनेंट, फिजिक्स, पार्टिकल्स, नेटवर्किंग, XR, और बहुत कुछ शामिल है। यदि आप सुनिश्चित नहीं हैं तो इसका उपयोग करें!

```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js">
</script>
```

यदि आप जानते हैं कि आपके प्रोजेक्ट को फिजिक्स सुविधाओं की आवश्यकता नहीं है, तो आप Needle Engine का एक छोटा संस्करण भी उपयोग कर सकते हैं, बिना फिजिक्स इंजन के। इससे कुल डाउनलोड का आकार कम हो जाएगा।
```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.light.min.js">
</script>
```


कई उदाहरण [StackBlitz](https://stackblitz.com/@marwie/collections/needle-engine) पर पाए जा सकते हैं।

## StackBlitz पर रैपिड प्रोटोटाइपिंग

त्वरित प्रयोगों के लिए, हम एक नया प्रोजेक्ट बनाने के लिए एक सुविधाजनक लिंक प्रदान करते हैं जो शुरू करने के लिए तैयार है: [engine.needle.tools/new](https://engine.needle.tools/new)
उदाहरणों का एक बड़ा संग्रह हमारे [Needle Engine Stackblitz Collection](https://stackblitz.com/@marwie/collections/needle-engine) में भी उपलब्ध है।

## VS Code के साथ लोकल डेवलपमेंट

यदि आप बिना किसी इंटीग्रेशन के Needle Engine के साथ काम करना चाहते हैं, तो आप संभवतः अपनी वेबसाइट के लिए एक लोकल सर्वर चलाना चाहेंगे। Visual Studio Code के साथ आप ऐसा कैसे कर सकते हैं:

1. Visual Studio Code में अपनी HTML फ़ाइल वाले फ़ोल्डर को खोलें।
2. [LiveServer extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) स्थापित करें।
3. live-server को सक्रिय करें (VSCode के फुटर में "Go Live" बटन है)
4. यदि यह स्वचालित रूप से नहीं खुलता है, तो अपने वेब ब्राउज़र में ``http://localhost:5500/index.html`` खोलें।


## three.js और Needle Engine

चूंकि Needle Engine [three.js](https://threejs.org/) को सीन ग्राफ़ और रेंडरिंग लाइब्रेरी के रूप में उपयोग करता है, इसलिए three.js की सभी कार्यक्षमता Needle में भी उपलब्ध है और कंपोनेंट स्क्रिप्ट से उपयोग की जा सकती है। हम three.js के एक फोर्क का उपयोग कर रहे हैं जिसमें अतिरिक्त सुविधाएँ और सुधार शामिल हैं, विशेष रूप से WebXR, Animation, और USDZ एक्सपोर्ट के संबंध में।


::: tip
सुनिश्चित करें कि आप ``<needle-engine src="myScene.glb">`` पाथ को किसी मौजूदा glb फ़ाइल में अपडेट करें
या [इस सैंपल glb को डाउनलोड करें](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb) और इसे index.html के समान फ़ोल्डर में रखें, इसका नाम ``myScene.glb`` रखें या src पाथ को अपडेट करें।
:::

@[code](@code/basic-html.html)


[github पर देखें](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla)


---
पेज का अनुवाद AI का उपयोग करके स्वचालित रूप से किया गया है