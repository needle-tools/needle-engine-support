---
title: Unity के लिए Needle Engine
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
  <img src="/imgs/unity-logo.webp" style="max-height:70px;" />
</div>

# Unity के लिए Needle Engine

Unity के लिए Needle Engine आपको Unity के अंदर ही अत्यधिक इंटरैक्टिव, लचीले और हल्के वेब एप्लिकेशन बनाने की अनुमति देता है। अपने 3D दृश्यों को विज़ुअली सेट करने, एनिमेट करने और डिज़ाइन करने के लिए Unity editor के शक्तिशाली टूल का उपयोग करें। Unity के लिए Needle Engine आपके दृश्य को glTF में एक्सपोर्ट करने का ध्यान रखता है और किसी भी वेब frontend framework के साथ आसानी से एकीकृत हो जाता है।


## Unity Package स्थापित करें


<NoDownloadYet>
  <br/>
  <needle-button 
    event_goal="download_unity" 
    event_position="getting_started" 
    large 
    href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"
    same_tab
    next_url="/docs/unity/"
    >
    <strong>Unity के लिए Needle Engine डाउनलोड करें</strong>
  </needle-button> 
</NoDownloadYet>

<!-- [Mirror](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos)    -->

1. **डाउनलोड की गई .unitypackage फ़ाइल को** एक Unity project में डालें और पुष्टि करें कि आप इसे import करना चाहते हैं।

2. इंस्टॉलेशन और import पूरा होने के लिए **कुछ पल प्रतीक्षा करें**। एक window खुल सकती है जिसमें लिखा हो कि "A new scoped registry is now available in the Package Manager."। यह हमारी Needle Package registry है। आप उस window को सुरक्षित रूप से बंद कर सकते हैं।  
3. **Samples का अन्वेषण करें**।  
  उपलब्ध सभी [sample scenes](https://engine.needle.tools/samples) को देखने, खोलने और modify करने के लिए menu option `Needle Engine > Explore Samples` चुनें।  

## Quickstart Video Tutorial

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />

## एक Sample से प्रारंभ करें

100 से अधिक samples हैं जो विषयों, उपयोग के मामलों और उद्योगों की एक विस्तृत श्रृंखला को cover करते हैं।  
त्वरित अवलोकन के लिए, हमारे [Samples page](https://engine.needle.tools/samples/) पर एक नज़र डालें। 

ये सभी samples सीधे Unity में उपलब्ध हैं:
1. samples को browse करने के लिए `Needle Engine > Explore Samples` पर जाएँ
2. sample package को सीधे अपने editor के अंदर install करने के लिए "Install Samples" पर क्लिक करें (या package को manually install करने के लिए [samples unitypackage डाउनलोड करें](http://engine.needle.tools/downloads/unity/samples))
3. कोई भी sample चुनें और `Open Scene` पर क्लिक करें। 

:::tip Samples read-only होते हैं – इससे उन्हें update करना आसान हो जाता है।
हमारे sample scenes Unity में एक UPM package का हिस्सा हैं। इसका मतलब है कि आप उनमें सीधे assets और scripts को edit नहीं कर सकते हैं – वे read-only हैं। sample package से किसी asset को edit करने के लिए, उसे अपने project के `Assets` folder में copy करें। sample package से किसी script को edit करने के लिए, उसे अपने web project के `src` folder में copy करें।
::: 

## एक template से प्रारंभ करें

नए projects जल्दी शुरू करने के लिए हम कई Scene Templates प्रदान करते हैं।  
ये आपको कुछ ही क्लिक में idea से prototype तक जाने की अनुमति देते हैं।  

1. `File > New Scene` पर क्लिक करें

2. उन templates में से किसी एक का चयन करें जिसके नाम में (needle) हो और `Create` पर क्लिक करें।   
   हम [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox) template की सलाह देते हैं जो interactivity, multiplayer और assets जोड़ने के साथ शुरुआत करने का एक शानदार तरीका है।  
3. अपना नया web project install और startup करने के लिए Play पर क्लिक करें।

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)


## scratch से प्रारंभ करें

यदि आप किसी scene template से प्रारंभ नहीं करना चाहते हैं, तो आप इन चरणों का पालन कर सकते हैं।  
प्रभावी रूप से, हम "Minimal (Needle)" template को फिर से बनाने जा रहे हैं जो package के साथ ship हो रहा है।  

1. **एक नया खाली scene बनाएँ**  

2. **Exporting के लिए अपना scene set करें**   
  एक खाली GameObject जोड़ें, उसका नाम "Exporter" रखें और उसमें `Needle Engine` component जोड़ें (जिसे पहले `Export Info` नाम दिया गया था)।  
  इस component में आप अपने exported runtime project को बनाते और जल्दी से access करते हैं।  
  यह आपको यह भी चेतावनी देता है कि क्या हमारे कोई packages और modules outdated हैं या आपके web project में locally installed नहीं हैं।  

    ::: tip Project Name और Scene Name
    By default, project name आपके scene के नाम से match करता है। यदि आप उसे change करना चाहते हैं, तो आप एक ``Directory Name`` pick कर सकते हैं या enter कर सकते हैं जहाँ आप अपना नया web project बनाना चाहते हैं। path आपके Unity project के relative है।  
    :::
 
3. **एक web project template चुनें**
  अब, अपने project के लिए एक web project template चुनें। default template [Vite](https://vitejs.dev/) पर आधारित है, जो एक तेज़ web app bundler है।  
  <br/>
    ![Unity ExportInfo local templates](/imgs/unity-project-local-template.jpg)


4. अपना नया web project install और start करने के लिए Play पर क्लिक करें


:::tip अपने स्वयं के templates परिभाषित करें
यदि आप पाते हैं कि आप कई समान projects बना रहे हैं, तो आप `Create/Needle Engine/Project Template` के तहत Project View context menu का उपयोग करके अपने स्वयं के local या remote templates बना सकते हैं। Templates या तो disk पर local (एक folder copy किया जा रहा है) या remote repositories (एक git repository clone किया जा रहा है) हो सकते हैं।
:::

## Project Folders और Files

:::: file-tree name="Unity Project" showall="true"
::: file Assets/
यह वह जगह है जहाँ project specific/exclusive assets रहते हैं।
::: 
::: file Packages/
यह वह जगह है जहाँ इस project के लिए installed packages रहते हैं। एक package में किसी भी asset type का हो सकता है, और इसे कई Unity projects में जोड़ा जा सकता है। इसलिए यह code या assets share करने का एक बेहतरीन method है। packages के बारे में अधिक जानने के लिए [packages के बारे में Unity documentation](https://docs.unity3d.com/Manual/PackagesList.html) देखें।
::: 
::: file Packages/Needle Engine/
Unity के लिए Needle Engine एक package है जिसमें आपकी Unity scene को वेब project में एक्सपोर्ट करने के लिए सभी आवश्यक फ़ाइलें होती हैं। इसमें इंटरैक्टिव वेब project बनाने के लिए built-in components और tools भी शामिल हैं। आप Unity Package Manager के माध्यम से package को अपडेट कर सकते हैं।
:::
::: file Packages/Needle Engine/Core/
:::
::: file Packages/Needle Engine/Core/Runtime/
:::
::: file Packages/Needle Engine/Core/Runtime/Components/
इसमें सभी Needle Engine के built-in components शामिल हैं। आप [Components Reference](./../component-reference.md) में उनके बारे में अधिक जान सकते हैं। samples को देखना और इस folder से होकर जाना यह देखने के शानदार तरीके हैं कि कौन से components उपलब्ध हैं और उनका उपयोग आपके projects में कैसे किया जा सकता है।
:::
:::: 

Unity में एक नया web project बनाते समय, आप इसे किसी local template से बनाने का विकल्प चुन सकते हैं (by default हम एक Vite based web template ship करते हैं)। 

आप ExportInfo project path में एक repository URL दर्ज करके remote templates का भी संदर्भ दे सकते हैं (this can be saved with your scene for example)। एक नया web project बनाते समय repository को या तो cloned किया जाएगा या downloaded किया जाएगा (depending on if you have git installed) और एक `needle.config.json` file की search की जाएगी। यदि cloned repository में कोई file नहीं can be found तो root directory का उपयोग किया जाएगा। remote template projects के उदाहरण [github.com/needle-engine](https://github.com/needle-engine) पर पाए जा सकते हैं

![Unity ExportInfo local templates](/imgs/unity-project-remote-template.jpg)

### Temporary Projects

यदि आप NpmDefs के माध्यम से केवल custom files add करने की planning कर रहे हैं और project config change नहीं करना चाहते हैं (e.g. for a quick fullscreen test), तो आप project path को `Library` से prefix कर सकते हैं। project Unity Project Library में generate होगा और उसे source control में add करने की आवश्यकता नहीं है (the Library folder should be excluded from source control)। हम इन projects को _temporary projects_ कहते हैं। They're great for quickly testing out ideas!


## Unity में Typescript

**NPM Definitions** [npm packages](https://docs.npmjs.com/about-packages-and-modules) हैं जो Unity Editor में tightly integrated हैं जिससे कई web projects या यहाँ तक कि Unity projects के साथ scripts share करना आसानी से संभव हो जाता है।    

TypeScript files के लिए C# component stubs भी NpmDef packages के अंदर scripts के लिए automatically generated किए जाएंगे।

#### एक NpmDef बनाना और install करना
एक **NPM Definition** बनाने के लिए Unity Project browser में right click करें और ``Create/NPM Definition`` select करें।   
आप **एक *NPM Definition* package को** अपने runtime project में install कर सकते हैं by e.g. selecting your ``Needle Engine`` component (जिसे पहले ``Export Info`` नाम दिया गया था) और उसे ``dependencies`` list में add करके (this effectively adds the NpmDef package to your web project's package.json in the `dependencies` array just like you would do it manually or by running `npm i <path/to/package>`)।

![image](https://user-images.githubusercontent.com/5083203/170374130-d0e32516-a1d4-4903-97c2-7ec9fa0b17d4.png)

ExportInfo component पर Install पर क्लिक करके newly added package को install करना न भूलें और also restart the server if it is already running

एक *NPM Definition* package के अंदर code को edit करने के लिए just double click the asset *NPM Definition* asset in your project browser और it will open the vscode workspace that comes with each npmdef।


# अगले Steps

- [Concept: Web Projects](../project-structure.md)
- [Concept: Assets Export करना](../export.md)
- [Concept: Deployment (अपनी website Share करें)](../deployment.md)
- [Components: Everywhere Actions के बारे में जानें](../everywhere-actions.md)
- [Beginner Scripting: Typescript essentials](../getting-started/typescript-essentials.md)
- [Beginner Scripting: Custom components कैसे लिखें](../scripting.md)

---
यह पृष्ठ AI का उपयोग करके स्वचालित रूप से अनुवादित किया गया है।