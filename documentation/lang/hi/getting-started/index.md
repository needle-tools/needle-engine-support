---
lang: hi-IN
title: आरंभ करना और इंस्टॉलेशन
next: ../project-structure.md
---

<br/>

<discountbanner />


# डाउनलोड्स

**नीडल इंजन** के साथ, आप अपने पसंदीदा फ्रेमवर्क का उपयोग करके पूरी तरह से इंटरैक्टिव 3D वेबसाइट बना सकते हैं।

नीडल इंजन से बनाए गए प्रोजेक्ट को वेब पर कहीं भी डिप्लॉय किया जा सकता है और स्वचालित LOD सपोर्ट के साथ हमारी अत्याधुनिक ऑप्टिमाइज़ेशन पाइपलाइन द्वारा स्वचालित रूप से ऑप्टिमाइज़ किया जा सकता है – गुणवत्ता से समझौता किए बिना एसेट के आकार को 100 गुना तक कम किया जा सकता है।

नीडल इंजन **यूनिटी के लिए पैकेज, ब्लेंडर के लिए ऐड-ऑन, तैयार वेब कॉम्पोनेंट**, या एडिटर इंटीग्रेशन के बिना प्रोजेक्ट के लिए npm पैकेज के रूप में उपलब्ध है।
इनमें से प्रत्येक हमारे बिल्डिंग ब्लॉक्स और अधिक बनाने की शक्ति के समान कॉम्पोनेंट के साथ आता है – चुनाव आपका है।

## अपना वर्कफ़्लो चुनें

<tool-tiles></tool-tiles>

<!-- | Tool |  |  |
| -- | -- | -- |
| Node.js **(required)** | 16.x or 18.x <br>[Windows](https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi) <br/> [MacOS](https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg)   | For running a local development server
| VS Code *(recommended)* | any version<br/>[Windows](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user) <br/> [MacOS](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal) | For code editing (optional)  |
| **Supported Editors** | |
| Unity | 2020.3.16+ <br/>2021.3.9+ <br/>2022.3.0+<br/>[Get Unity Hub](https://unity.com/download) | For setting up your scenes, components, animations... |
| Blender | 3.3<br/>3.4<br/>3.5<br/>3.6<br/>[Get Blender](https://www.blender.org/download/) | For setting up your scenes, components, animations... |
   -->


<!-- ### For optimized builds

| Tool | | |
| -- | -- | |
| | | |
| **toktx** | 4.1<br/>[Windows](https://fwd.needle.tools/needle-engine/toktx/win) <br/> [MacOS](https://fwd.needle.tools/needle-engine/toktx/osx) <br/> [Mac OS Apple Silicon](https://fwd.needle.tools/needle-engine/toktx/osx-silicon) <br/> [Other Releases](https://github.com/KhronosGroup/KTX-Software/releases/tag/v4.1.0-rc3)  | For texture compression (recommended) <br/>You can read more about that [here](./deployment.md#production-builds) in our docs -->



<br/>
<br/>



<!--
<img src="/imgs/unity-logo.webp" style="max-height:70px;" />


## Needle Engine for Unity

*Supported Unity versions: 2021.3 LTS, 2022.3 LTS*

<needle-button event_goal="download_unity" event_position="getting_started" large href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"><strong>Download Needle Engine for Unity</strong></needle-button>

- Drop the downloaded .unitypackage file into a Unity project and confirm that you want to import it.
- Wait a moment for the installation and import to finish. A window may open stating that "A new scoped registry is now available in the Package Manager.". This is our Needle Package registry. You can safely close that window.
- **Explore Samples** – Select the menu option _Needle Engine > Explore Samples_ to view, open and modify all available [sample scenes](https://engine.needle.tools/samples).


**See [Needle Engine for Unity](../unity/index.md)** for a full list of features and instructions on getting started.


---


<img src="/blender/logo.png" style="max-height:70px;" />

## Needle Engine for Blender
*Supported Blender versions: 4.1+*

<needle-button event_goal="download_blender" event_position="getting_started" large href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"><strong>Download Needle Engine for Blender</strong></needle-button>

<br/>

- The Blender add-on is downloaded as a zip file.
- In Blender, go to `File > Settings > Add-ons` and click the `Install` button.
- Then select the downloaded zip to install it.

**See [Needle Engine for Blender](../blender/index.md)** for a full list of features and instructions on getting started.

<br/>
<br/>
<br/>



<br/>
<br/>
<br/>

-->

## कोड एडिटर और टूल्स

### एक कोड एडिटर इंस्टॉल करें

नीडल इंजन वेब ऐप बनाना आसान बनाता है। इसमें अक्सर, लेकिन हमेशा नहीं, JavaScript/TypeScript के साथ कोडिंग करना या यूजर इंटरफ़ेस का वर्णन करने के लिए HTML और CSS लिखना शामिल है। हम इन फ़ाइलों को बनाने और संपादित करने के लिए [Visual Studio Code](https://code.visualstudio.com) की सलाह देते हैं। यह एक मुफ्त, ओपन-सोर्स कोड एडिटर है जो Windows, macOS और Linux पर चलता है।

<ClientOnly>
<!-- <br/><os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Unity</os-link> — <os-link generic_url="https://engine.needle.tools/downloads/unity">Needle Engine for Blender</os-link> -->

<os-link windows_url="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" osx_url="https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal">विजुअल स्टूडियो कोड डाउनलोड करें</os-link>


<br/>
<br/>

### अन्य उपयोगी उपकरण

::: tip
नीडल इंजन आपके वेब ऐप को बनाने के लिए निम्नलिखित उपकरणों का उपयोग करता है, लेकिन Unity या Blender इंटीग्रेशन का उपयोग करते समय आपको उन्हें मैन्युअल रूप से इंस्टॉल करने की आवश्यकता नहीं है। नीडल इंटीग्रेशन इंस्टॉल करने के बाद हम आपको इंस्टॉलेशन प्रक्रिया में मार्गदर्शन करेंगे।
:::

<br/>
<os-link windows_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi" osx_url="https://nodejs.org/dist/v22.13.1/node-v22.13.1.pkg">Node.js 20 LTS या 22 LTS।</os-link>
नीडल इंजन Node.js का उपयोग आपके कंप्यूटर पर स्थानीय रूप से बनाए जा रहे वेब ऐप को प्रबंधित करने, पूर्वावलोकन करने और बनाने के लिए करता है।     
इसका उपयोग आपकी वेबसाइट को इंटरनेट पर अपलोड (डिप्लॉय) करने के लिए भी किया जाता है।

<br/><os-link windows_url="https://fwd.needle.tools/needle-engine/toktx/win" osx_url="https://fwd.needle.tools/needle-engine/toktx/osx" osx_silicon_url="https://fwd.needle.tools/needle-engine/toktx/osx-silicon">KTX Software – toktx texture tools।</os-link> हम आपके 3D फ़ाइलों को स्थानीय रूप से ऑप्टिमाइज़ और कंप्रेस करने के लिए Khronos Group द्वारा toktx का उपयोग करते हैं। प्रोडक्शन बिल्ड के बारे में अधिक जानकारी [यहां डॉक्स में](../deployment.md#production-builds) प्राप्त करें।

<br/>
</ClientOnly>

<!--
## Option 1: Quick Start — Starter Project ⚡
1. **Download or Clone this repository**
   It's set up with the right packages and settings to get you started right away.

   _Clone with HTTPS:_ ``https://github.com/needle-tools/needle-engine-support.git``
   _OR clone with SSH:_ ``git@github.com:needle-tools/needle-engine-support.git``
   _OR download directly:_ <a href="https://github.com/needle-tools/needle-engine-support/archive/refs/heads/main.zip" target="_blank">Download Repository</a>


2. **Open the starter project**
  Open `starter/Needle Engine Starter 2020_3` for a full sandbox project that's ready to run (including a couple of simple example scenes for lightmaps and custom shaders).
  This is a sandbox builder project! It already comes with multi-player capabilities, and works across mobile, desktop, VR and AR.

3. **Press Play**
  Make sure the scene CollaborativeSandbox is open, and press Play! This will automatically do some setup steps and start a local server.
  Once the setup is complete, a browser window will open, and your project is live.
  From now on, all changes you do in Unity will be immediately visible in your browser.

    > **Note**: Your browser might warn you about an trusted SSL connection. Don't worry, the connection is still encrypted – please click "Advance" if your browser asks you to verify that you're sure you want to visit your server.

4. **Make it your own**
  Add assets and components, play around with lighting, add scripts and logic – this is your world now!
  You can also [publish it on the web for free](#deploy-your-project-to-glitch-) so that others can join you.
-->



## अगले कदम

अब जब आपने Needle Engine इंस्टॉल कर लिया है, तो आप प्रोजेक्ट निर्माण, कॉम्पोनेंट वर्कफ़्लो, स्क्रिप्टिंग, डिप्लॉयमेंट और बहुत कुछ में गहराई से उतरने के लिए तैयार हैं।

- [आरंभ करना: Unity](../unity/index.md)
- [आरंभ करना: Blender](../blender/index.md)
- [अवधारणा: 3D ऑब्जेक्ट और कंटेंट एक्सपोर्ट करना](../export.md)
- [अवधारणा: प्रोजेक्ट संरचना](../project-structure.md)
- [अवधारणा: अपनी वेबसाइट को वेब पर डिप्लॉय करें](../deployment.md)
- [शुरुआती गाइड: Typescript Essentials](./typescript-essentials.md)
- [शुरुआती गाइड: Unity डेवलपर्स के लिए Needle Engine](./for-unity-developers.md)
- [शुरुआती गाइड: स्क्रिप्टिंग संदर्भ](../scripting.md)
- [लाइव उदाहरण: Needle Engine सैंपल्स](https://engine.needle.tools/samples)

यदि आपको समस्या निवारण में सहायता की आवश्यकता है, तो कृपया [प्रश्न और उत्तर – FAQ](../faq.md) अनुभाग देखें।  
हम आपका हमारे [फोरम](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) और [Discord समुदाय](https://discord.needle.tools) में शामिल होने के लिए स्वागत करते हैं।


यह पेज AI का उपयोग करके स्वतः अनुवादित किया गया है।