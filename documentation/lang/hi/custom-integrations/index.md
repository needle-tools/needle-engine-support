<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <span style="font-size: 50px;">✨</span>
</div>

# अन्य टूल के साथ एकीकृत करें

Needle Engine लचीला और विस्तार योग्य होने के लिए डिज़ाइन किया गया है। किसी भी सॉफ़्टवेयर से वेब पर समृद्ध, इंटरैक्टिव 3D लाने के लिए अपने वर्कफ़्लो को बेहतर बनाने के लिए इसे अन्य टूल और सेवाओं के साथ एकीकृत किया जा सकता है।

Needle Engine के साथ एक custom integration के मूल में glTF 3D format है। यह वेब पर 3D के लिए सबसे व्यापक रूप से समर्थित format है, और सबसे बहुमुखी भी। यह हल्का format 3D models, animations, textures, और सभी प्रकार के अतिरिक्त data को संग्रहीत कर सकता है। glTF extensible है, यही वजह है कि हमने इसे Needle Engine के आधार के रूप में चुना। यह हमें बेहतर rendering, physics, interactions, XR, networking, और बहुत कुछ सहित 3D फ़ाइलों में समृद्ध सुविधाएँ और इंटरैक्टिव क्षमताएँ जोड़ने की अनुमति देता है।

interchange के लिए मानकीकृत glTF format का उपयोग करने के परिणामस्वरूप, किसी भी सॉफ़्टवेयर में एक बुनियादी integration बनाना आसान है - बस अपनी 3D assets को glTF फ़ाइलों के रूप में export करें और उन्हें Needle Engine में import करें। वहां से, आप हमारे scripting extensions का समर्थन करने के लिए अपने integration में और सुविधाएँ जोड़ सकते हैं। आमतौर पर, यह आपके 3D सॉफ़्टवेयर में एक plugin, extension या export hook के माध्यम से किया जाता है।

## एक custom integration की संरचना
एक custom integration की संरचना इस प्रकार दिखती है:

1. अपनी 3D assets को glTF फ़ाइलों के रूप में export करें। इस बिंदु पर, आपका integration शायद आपके 3D सॉफ़्टवेयर में export बटन पर क्लिक करने जितना ही सरल है।
2. Needle Engine का उपयोग करके एक web project में glTF फ़ाइल का उपयोग करें।
   - यह किसी अन्य integration के साथ बनाया गया web project हो सकता है, जिसे sample से download किया गया हो, या `npx needle-create` के साथ बनाया गया एक नया web project हो।
   - glTF फ़ाइल को `assets` फ़ोल्डर में export करें। जब भी आप glTF फ़ाइल को फिर से export करते हैं, तो आपका web app स्वचालित रूप से refresh होना चाहिए।
3. इस बिंदु पर, आपके पास एक बुनियादी functional integration है, और आप पहले से ही web project में TypeScript के माध्यम से custom functionality जोड़ सकते हैं।
4. अगला कदम आपके सॉफ़्टवेयर में components बनाने और adjust करने का तरीका जोड़ना है। सॉफ़्टवेयर के आधार पर, यह एक custom UI, एक script या एक plugin के माध्यम से किया जा सकता है।
   - शुरू करने के लिए, `DragControls` जैसे component के साथ प्रयास करें। इसमें कुछ options हैं, लेकिन defaults शुरू करने के लिए काफी अच्छे हैं।
   - फिर, configuration की आवश्यकता वाले components पर आगे बढ़ें। एक अच्छा शुरुआती बिंदु हमारे `Everywhere Actions` हैं, क्योंकि वे creators को कोई भी code लिखने की आवश्यकता के बिना इंटरैक्टिव अनुभवों की एक विस्तृत श्रृंखला बनाने की अनुमति देते हैं।
5. प्रत्येक node के लिए `NEEDLE_components` glTF extension के हिस्से के रूप में उन components को export करें। आमतौर पर, यह आपके सॉफ़्टवेयर में मौजूदा glTF exporter में एक custom glTF extension या hook जोड़कर किया जाता है।
6. एक web project के साथ integrate करें ताकि custom components के लिए UI उत्पन्न किया जा सके। Unity और Blender के लिए, हम इसे `Component Compiler` कहते हैं - यह स्वचालित रूप से आपके project में components के लिए एक UI बनाता है, और TypeScript components और आपके 3D सॉफ़्टवेयर के बीच एक bridge का काम करता है।

## web project workflow को एकीकृत करें

एक पूर्ण integration web project workflow का अधिक प्रबंधन भी कर सकता है। ये सभी operations command line से किए जा सकते हैं, लेकिन उपयोग में आसानी के लिए, उन्हें आपके 3D सॉफ़्टवेयर में एक GUI या custom menu में सफाई से लपेटा जा सकता है। इसमें शामिल हैं:

1. एक नया project बनाना या web project के स्थान को बदलना
2. आपके 3D सॉफ़्टवेयर के भीतर से web project चलाना
   - हमारा [Unity integration](./../unity/) web project चलाने के लिए "Play" बटन को overrides करता है।
   - [Blender integration](./../blender/) में एक custom "Play" बटन है जो web project चलाता है।
3. web project को एक फ़ोल्डर में build करना
4. बनाए गए project को Needle Cloud या किसी अन्य platform पर upload करना, और Project ID और Team ID को याद रखना
   - हमारा Unity integration आपकी team के लिए पिछले uploads भी दिखाता है, और आपको project की अंतिम deployment पर जाने की अनुमति देता है।
5. व्यक्तिगत assets को Needle Cloud या किसी अन्य platform पर upload/download करना

:::tip यदि आप एक custom integration बनाने की योजना बना रहे हैं तो संपर्क करें!
यदि आप एक custom integration बनाने में रुचि रखते हैं तो कृपया हमसे संपर्क करें। हम इस प्रक्रिया में आपकी मदद करने और अधिक विवरण समझाने में प्रसन्न हैं। Enterprise ग्राहकों के लिए, हम एक सेवा के रूप में custom integrations भी प्रदान करते हैं।
:::

---
पेज स्वचालित रूप से AI का उपयोग करके अनुवादित