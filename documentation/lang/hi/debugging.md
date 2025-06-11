---
title: डीबग कैसे करें
---

## glTF के साथ काम करने के लिए उपयोगी संसाधन

glTF या glb फ़ाइलों को ऑनलाइन जांचने के लिए:
- [gltf.report](https://gltf.report/) - three.js पर आधारित
- [modelviewer.dev/editor](https://modelviewer.dev/editor) - three.js पर आधारित
- [Khronos glTF Sample Viewer](https://github.khronos.org/glTF-Sample-Viewer-Release/)
- [Babylon Sandbox](https://sandbox.babylonjs.com/)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)

उन्हें स्थानीय रूप से जांचने के लिए:
- glTF और glb के बीच कनवर्ट करने के लिए [glTF Shell Extension for Windows](https://apps.microsoft.com/store/detail/gltf-shell-extensions/9NPGVJ9N57MV?hl=en-us&gl=US) का उपयोग करें
- स्थानीय रूप से validation errors और in-engine previews देखने के लिए [glTF Tools VS Code Extension](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode) का उपयोग करें

## बिल्ट-इन URL पैरामीटर

Debug Flags को URL query parameters के रूप में जोड़ा जा सकता है।
उपलब्ध सभी parameters की सूची प्राप्त करने के लिए ``?help`` का उपयोग करें।

यहां कुछ सबसे अधिक उपयोग किए जाने वाले parameters दिए गए हैं:

- ``help`` कंसोल में सभी उपलब्ध url parameter प्रिंट करें
- ``console`` ऑन-स्क्रीन dev console खोलता है, जो mobile debugging के लिए उपयोगी है
- ``printGltf`` लोडेड gltf files को console में लॉग करता है
- ``stats`` FPS module दिखाता है और हर कुछ सेकंड में threejs renderer stats लॉग करता है
- ``showcolliders`` physics colliders का विज़ुअलाइज़ेशन करता है
- ``gizmos`` gizmo rendering सक्षम करता है (उदाहरण के लिए जब BoxCollider या AxesHelper components का उपयोग किया जाता है)
- और भी बहुत कुछ: उन सभी को देखने के लिए कृपया ``help`` का उपयोग करें

## डीबग तरीके

Needle Engine में कुछ बहुत शक्तिशाली और उपयोगी debugging methods भी हैं जो static `Gizmos` क्लास का हिस्सा हैं। अधिक जानकारी के लिए [scripting documentation](./scripting.md#gizmos) देखें।

## रिलीज़ बिल्ड का स्थानीय परीक्षण
- सबसे पहले, http-server इंस्टॉल करें: ``npm install -g http-server``
- एक build बनाएँ (development या production)
- एक commandline tool के साथ *dist* directory खोलें
- ``http-server -g`` चलाएँ | *``-g`` gzip support सक्षम करता है*
- वैकल्पिक: यदि आप WebXR का परीक्षण करना चाहते हैं, तो एक [self-signed SSL certificate](https://stackoverflow.com/a/35231213) जेनरेट करें, फिर https (WebXR के लिए आवश्यक) सक्षम करने के लिए ``http-server -g -S`` चलाएँ।

## VSCode

आप breakpoints सेट करने और अपने code को debug करने के लिए VSCode को चल रहे local server से अटैच कर सकते हैं। आप यहां [debugging with VSCode](https://code.visualstudio.com/docs/editor/debugging) के बारे में अधिक पढ़ सकते हैं।

अपनी web project में ``.vscode/launch.json`` पर निम्नलिखित content के साथ एक launch.json फ़ाइल बनाएँ:
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

यदि आपने उस port को बदल दिया है जिस पर आपका server शुरू होता है, तो ``url`` field को तदनुसार update करना सुनिश्चित करें।
आप VSCode के भीतर से अपना local server शुरू कर सकते हैं:

![](/debugging/vscode-start-debugging.webp)

## Mobile

### Android Debugging

**Android** debugging के लिए, आप Chrome Dev Tools को अपने device से अटैच कर सकते हैं और अपने PC से सीधे logs देख सकते हैं। आपको अपने device को development mode में स्विच करना होगा और इसे USB के माध्यम से connect करना होगा।

आधिकारिक chrome documentation [यहां](https://developer.chrome.com/docs/devtools/remote-debugging/) देखें
- सुनिश्चित करें कि आपके phone पर [Developer Mode](https://developer.android.com/studio/debug/dev-options) सक्षम है
- अपने phone को USB के माध्यम से अपने computer से connect करें
- अपने browser में इस url को खोलें ``chrome://inspect/#devices``
- अपने mobile device पर अपने computer से USB connection की अनुमति दें
- कुछ देर बाद chrome में आपके computer पर खुली हुई tabs की सूची दिखाई देनी चाहिए (``chrome://inspect/#devices`` पर)
- जिस tab को आप debug करना चाहते हैं, उस पर ``Inspect`` क्लिक करें

### iOS Debugging

आसान iOS debugging के लिए उपयोगी on-screen JavaScript console प्राप्त करने के लिए ``?console`` URL parameter जोड़ें।

यदि आपके पास Mac है, तो आप Safari से भी अटैच कर सकते हैं (ऊपर Android workflow के समान)।

iOS पर WebXR के उपयोग और debugging के लिए एक third-party browser का उपयोग करना आवश्यक है: [Mozilla WebXR Viewer](https://labs.mozilla.org/projects/webxr-viewer/)।

### Quest Debugging

Quest सिर्फ एक Android device है - चरणों के लिए [Android Debugging](#android-debugging) section देखें।


पेज स्वचालित रूप से AI का उपयोग करके अनुवादित।