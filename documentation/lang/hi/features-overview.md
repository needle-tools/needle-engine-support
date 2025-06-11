# सुविधा अवलोकन

Needle Engine एक पूरी तरह से विकसित 3D engine है जो browser में चलता है। इसमें वे सभी features हैं जिनकी आप एक आधुनिक 3D engine से अपेक्षा करते हैं, और बहुत कुछ। यदि आपने अभी तक नहीं किया है, तो हमारे [Homepage](https://needle.tools) और हमारे [Samples and Showcase](https://engine.needle.tools/samples) पर एक नज़र डालें।

[[toc]]

## Shaders और Materials

PBR Materials और Custom shaders created with Shader Graph या अन्य systems से बनाए गए दोनों को export किया जा सकता है।

<img src="https://user-images.githubusercontent.com/5083203/186012027-9bbe3944-fa56-41fa-bfbb-c989fa87aebb.png" />

वेब के लिए shaders बनाने हेतु node based [ShaderGraph](https://unity.com/features/shader-graph) का उपयोग करें। ShaderGraph कलाकारों के लिए syntax की चिंता किए बिना रचना करना आसान बनाता है।

[PBR Materials](./export.md#physically-based-materials-pbr) • [Custom Shaders](./export.md#custom-shaders) के बारे में और पढ़ें

## Crossplatform: VR, AR, Mobile, Desktop
Needle Engine हर जगह चलता है जहाँ web technology चलती है: desktop, mobile, AR या VR पर एक ही application चलाएँ। हम XR को ध्यान में रखकर [Needle Engine बनाते हैं](./xr.md) और इसे responsive webdesign का एक अभिन्न अंग मानते हैं!

Android और iOS दोनों पर **Interactive AR** के लिए [Everywhere Actions](./everywhere-actions.md) का उपयोग करें।

## Lightmaps

![lightmaps](https://user-images.githubusercontent.com/5083203/186163693-093c7ae2-96eb-4d75-b98f-bf19f78032ff.gif)

Lightmaps को Unity या Blender में baked किया जा सकता है ताकि आपके 3d content में आसानी से सुंदर static light जोड़ी जा सके। वेब के लिए Lightbaking इतना आसान कभी नहीं रहा। बस उन objects को चिह्नित करें जिन्हें आप Unity में static के रूप में lightmap करना चाहते हैं, अपने scene में एक या कई lights जोड़ें (या emissive materials का उपयोग करें) और bake पर क्लिक करें। Needle Engine आपके lightmaps को प्रति scene export करेगा और उन्हें स्वचालित रूप से load और display करेगा जैसा कि आप उसे Editor में देखते हैं!

> **नोट**: इस पर कोई technical limitation नहीं है कि किस lightmapper का उपयोग करें, जब तक वे Unity के lightmapping data structures में समाप्त होते हैं। [Bakery](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218) जैसे third party lightmappers भी समर्थित हैं।

- [Exporting Lightmaps](https://fwd.needle.tools/needle-engine/docs/lightmaps) के बारे में और पढ़ें

## Multiplayer और Networking
Networking core runtime में निर्मित है। Glitch पर Needle Engine deployments एक छोटे server के साथ आते हैं जो आपको seconds में एक multiplayer 3D environment deploy करने की अनुमति देता है। built-in networked components शुरुआत करना आसान बनाते हैं, और आप अपने स्वयं के synchronized components बना सकते हैं। Variables और state को Synchronizing करना super easy है!

- [Networking](https://fwd.needle.tools/needle-engine/docs/networking) • [Scripting](https://fwd.needle.tools/needle-engine/docs/scripting) के बारे में और पढ़ें

## Animations और Sequencing
Needle Engine वेब पर शक्तिशाली animations, state control और sequencing लाता है — बस एक single animation चलाने से लेकर complex animations और character controllers को orchestrate और blending करने तक। Exporter Unity components जैसे Animator और Timeline को web-ready format में translate कर सकता है। हमने यह functionality अपने Blender addon में भी जोड़ी है ताकि आप compatible animation state machines बना सकें और Blender के भीतर से nla tracks को timelines के रूप में वेब पर export कर सकें।

- [Animation Components](./component-reference.md#animation) के बारे में और पढ़ें

### Animator

<img src="https://user-images.githubusercontent.com/5083203/186011302-176524b3-e8e5-4e6e-9b77-7faf3561bb15.png" />

Unity में [Animator और AnimatorController](https://docs.unity3d.com/Manual/class-AnimatorController.html) components आपको animations setup करने और उनके बीच कब और कैसे blend करना है, इसके लिए conditions परिभाषित करने देते हैं। हम state machines, StateMachineBehaviours, transitions और layers को exporting का समर्थन करते हैं। StateMachineBehaviours भी ``OnStateEnter``, ``OnStateUpdate`` और ``OnStateExit`` events के साथ समर्थित हैं।

> **नोट**: Sub-states और Blend Trees समर्थित नहीं हैं।

### Timeline

![2022-08-23-013517_Scene](https://user-images.githubusercontent.com/5083203/186037829-ee99340d-b19c-484d-b551-94797519c9d9.png)

हम [Unity के Timeline](https://unity.com/features/timeline) setup और tracks को भी web-ready format में translating कर रहे हैं।
Supported tracks में शामिल हैं: AnimationTrack, AudioTrack, ActivationTrack, ControlTrack, SignalTrack।

> **नोट**: Sub-Timelines वर्तमान में समर्थित नहीं हैं।

> **नोट**: [custom timeline tracks export करना](https://github.com/needle-tools/needle-engine-modules/tree/main/package/TimelineHtml) संभव है।

- [Animation Components](./component-reference.md#animation) के बारे में और पढ़ें

## Physics
अपनी दुनिया में कुछ शानदार physics जोड़ने के लिए Rigidbodies, Mesh Colliders, Box Colliders और SphereColliders का उपयोग करें।

- [Physics Components](./component-reference.md#physics) के बारे में और पढ़ें

<sample src="https://engine.needle.tools/samples-uploads/physics-animation/" />

## UI
Unity के UI canvas system का उपयोग करके UI बनाना विकास के अधीन है। वर्तमान में features में Text (fonts सहित), Images, Buttons exporting करना शामिल है।

supported component के लिए [ui component reference](component-reference.md#ui) देखें।

<sample src="https://engine.needle.tools/samples-uploads/screenspace-ui" />

## Particles
Unity ParticleSystem (Shuriken) का Export विकास के अधीन है। वर्तमान में Features में world/local space simulation, box और sphere emitter shapes, समय के साथ emission के साथ-साथ burst emission, समय के साथ velocity और color, velocity द्वारा emission, texturesheet animation, basic trails शामिल हैं।
नीचे supported features का [live sample](https://engine.needle.tools/samples/particles) देखें:

<sample src="https://engine.needle.tools/samples-uploads/particles/" />

## PostProcessing

Builtin effects में Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction शामिल हैं। आप अपने स्वयं के custom effects भी बना सकते हैं। पूरी list के लिए [the component reference](./component-reference.md#postprocessing) देखें।

<sample src="https://engine.needle.tools/samples-uploads/postprocessing/" />

## Editor Integrations
Needle Engine Unity Editor और Blender में powerful integrations के साथ आता है। यह आपको artists और developers के बीच easy और flexible collaboration प्रदान करने वाले visual तरीके से complex scenes setup और export करने की अनुमति देता है।

## Scripting
Needle Engine [component based workflow](scripting.md#component-architecture) का उपयोग करता है। typescript या javascript में custom scripts बनाएँ। Unity में integrated हमारे [modular npm-based package workflow](https://fwd.needle.tools/needle-engine/docs/npmdef) का उपयोग करें। एक [typescript to C# component compiler](https://fwd.needle.tools/needle-engine/docs/component-compiler) तुरंत जादुई रूप से Unity components बनाता है।

- [Scripting Reference](scripting) • [Npm Definition Files](https://fwd.needle.tools/needle-engine/docs/npmdef) के बारे में और पढ़ें

## और भी बहुत कुछ है

- PostProcessing → Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction...
- EditorSync → local development के लिए Unity में editing को चल रहे three.js application से Live synchronize करें
- iOS और Android पर Interactive AR → हमारे [Everywhere Actions](./everywhere-actions.md) feature set का उपयोग करें या अपना खुद का बनाएँ

---
# आगे कहाँ जाएँ

Needle Engine को download और setup करने के तरीके के बारे में जानने के लिए हमारी [Getting Started Guide](getting-started/) देखें।
[हमारे vision](vision) के बारे में जानें या इसे शक्ति प्रदान करने वाले कुछ [technical background और glTF](technical-overview) में गहराई से उतरें।


यह पेज AI द्वारा स्वचालित रूप से अनुवादित किया गया है