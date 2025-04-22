---
title: How To Debug
---

## Useful resources for working with glTF

glTF या glb फाइलों को ऑनलाइन जांचने के लिए:
- [gltf.report](https://gltf.report/) - three.js पर आधारित
- [modelviewer.dev/editor](https://modelviewer.dev/editor) - three.js पर आधारित
- [Khronos glTF Sample Viewer](https://github.khronos.org/glTF-Sample-Viewer-Release/)
- [Babylon Sandbox](https://sandbox.babylonjs.com/)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)

उन्हें स्थानीय रूप से जांचने के लिए:
- glTF और glb के बीच बदलने के लिए [glTF Shell Extension for Windows](https://apps.microsoft.com/store/detail/gltf-shell-extensions/9NPGVJ9N57MV?hl=en-us&gl=US) का उपयोग करें
- स्थानीय रूप से सत्यापन त्रुटियों और इन-इंजन पूर्वावलोकन देखने के लिए [glTF Tools VS Code Extension](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode) का उपयोग करें

## Built-in URL parameters

Debug Flags को URL query parameters के रूप में जोड़ा जा सकता है।
उपलब्ध सभी parameters की सूची प्राप्त करने के लिए ``?help`` का उपयोग करें।

यहां कुछ सबसे अधिक उपयोग किए जाने वाले parameters दिए गए हैं:

- ``help`` कंसोल में सभी उपलब्ध url parameter प्रिंट करें
- ``console`` ऑन-स्क्रीन dev कंसोल खोलता है, जो मोबाइल डिबगिंग के लिए उपयोगी है
- ``printGltf`` लोडेड gltf फाइलों को कंसोल में लॉग करता है
- ``stats`` FPS मॉड्यूल दिखाता है और हर कुछ सेकंड में threejs renderer stats लॉग करता है
- ``showcolliders`` physics colliders का विज़ुअलाइज़ेशन करता है
- ``gizmos`` gizmo रेंडरिंग सक्षम करता है (उदाहरण के लिए जब BoxCollider या AxesHelper कंपोनेंट का उपयोग किया जाता है)
- और भी बहुत कुछ: उन सभी को देखने के लिए कृपया ``help`` का उपयोग करें

## Debug Methods

Needle Engine में कुछ बहुत शक्तिशाली और उपयोगी डिबगिंग मेथड भी हैं जो स्टैटिक `Gizmos` क्लास का हिस्सा हैं। अधिक जानकारी के लिए [scripting documentation](./scripting.md#gizmos) देखें।

## Local Testing of release builds
- सबसे पहले, http-server इंस्टॉल करें: ``npm install -g http-server``
- एक बिल्ड बनाएं (development या production)
- कमांडलाइन टूल के साथ *dist* निर्देशिका खोलें
- ``http-server -g`` चलाएँ | *``-g`` gzip सपोर्ट सक्षम करता है*
- वैकल्पिक: यदि आप WebXR का परीक्षण करना चाहते हैं, तो एक [self-signed SSL certificate](https://stackoverflow.com/a/35231213) जेनरेट करें, फिर https (WebXR के लिए आवश्यक) सक्षम करने के लिए ``http-server -g -S`` चलाएँ।

## VSCode

आप ब्रेकप्वाइंट सेट करने और अपने कोड को डीबग करने के लिए VSCode को चल रहे स्थानीय सर्वर से अटैच कर सकते हैं। आप यहां [debugging with VSCode](https://code.visualstudio.com/docs/editor/debugging) के बारे में अधिक पढ़ सकते हैं।

अपनी वेब प्रोजेक्ट में `.vscode/launch.json` पर निम्नलिखित सामग्री के साथ एक launch.json फ़ाइल बनाएँ:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Attach Chrome",
            "url": "https://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

यदि आपने उस पोर्ट को बदल दिया है जिस पर आपका सर्वर शुरू होता है, तो ``url`` फ़ील्ड को तदनुसार अपडेट करना सुनिश्चित करें।
आप VSCode के भीतर से अपना स्थानीय सर्वर शुरू कर सकते हैं:

![](/debugging/vscode-start-debugging.webp)

## Mobile

### Android Debugging

**Android** डिबगिंग के लिए, आप Chrome Dev Tools को अपने डिवाइस से अटैच कर सकते हैं और अपने PC से सीधे लॉग देख सकते हैं। आपको अपने डिवाइस को डेवलपमेंट मोड में स्विच करना होगा और इसे USB के माध्यम से कनेक्ट करना होगा।

आधिकारिक Chrome डॉक्यूमेंटेशन [यहां](https://developer.chrome.com/docs/devtools/remote-debugging/) देखें
- सुनिश्चित करें कि आपके फोन पर [Developer Mode](https://developer.android.com/studio/debug/dev-options) सक्षम है
- अपने फोन को USB के माध्यम से अपने कंप्यूटर से कनेक्ट करें
- अपने ब्राउज़र में इस URL को खोलें ``chrome://inspect/#devices``
- अपने मोबाइल डिवाइस पर अपने कंप्यूटर से USB कनेक्शन की अनुमति दें
- कुछ देर बाद Chrome में आपके कंप्यूटर पर खुली हुई टैब की सूची दिखाई देनी चाहिए (``chrome://inspect/#devices`` पर)
- जिस टैब को आप डीबग करना चाहते हैं, उस पर ``Inspect`` क्लिक करें

### iOS Debugging

आसान iOS डिबगिंग के लिए उपयोगी ऑन-स्क्रीन JavaScript कंसोल प्राप्त करने के लिए ``?console`` URL parameter जोड़ें।

यदि आपके पास Mac है, तो आप Safari से भी अटैच कर सकते हैं (ऊपर Android वर्कफ़्लो के समान)।

iOS पर WebXR के उपयोग और डिबगिंग के लिए एक तृतीय-पक्ष ब्राउज़र का उपयोग करना आवश्यक है: [Mozilla WebXR Viewer](https://labs.mozilla.org/projects/webxr-viewer/)।

### Quest Debugging

Quest सिर्फ एक Android डिवाइस है - चरणों के लिए [Android Debugging](#android-debugging) अनुभाग देखें।


पेज स्वचालित रूप से AI का उपयोग करके अनुवादित।