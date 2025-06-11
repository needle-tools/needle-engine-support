---
title: Unity डेवलपर्स के लिए स्क्रिप्टिंग परिचय
---

Needle Engine यूनिटी एडिटर के साथ गहरा एकीकरण प्रदान करता है। यह डेवलपर्स और डिजाइनरों दोनों को परिचित वातावरण में एक साथ काम करने और तेज़, प्रदर्शनकारी और हल्के वेब अनुभव प्रदान करने की अनुमति देता है।

निम्नलिखित गाइड मुख्य रूप से Unity3D पृष्ठभूमि वाले डेवलपर्स के लिए है, लेकिन यह वेब या three.js पृष्ठभूमि वाले डेवलपर्स के लिए भी उपयोगी हो सकती है। यह इस बात पर ध्यान केंद्रित करता है कि Unity में चीजें कैसे की जाती हैं बनाम three.js या Needle Engine में।

यदि आप Typescript और Javascript के लिए बिल्कुल नए हैं और आप Needle Engine के लिए स्क्रिप्ट लिखने में गहराई से उतरना चाहते हैं तो हम C# और Javascript/Typescript के बीच के अंतर की मूल समझ के लिए [Typescript Essentials Guide](./typescript-essentials) को पढ़ने की भी सलाह देते हैं।

यदि आप कोड-साथ करना चाहते हैं तो आप एक छोटा प्रोजेक्ट बनाने के लिए [engine.needle.tools/new](https://engine.needle.tools/new) खोल सकते हैं जिसे आप ब्राउज़र में संपादित कर सकते हैं ⚡

## मूल बातें
Needle Engine [three.js](https://threejs.org/) के ऊपर चलने वाला एक 3d वेब इंजन है। Three.js वेब के लिए सबसे लोकप्रिय 3D webgl-आधारित रेंडरिंग लाइब्रेरी में से एक है। जब भी हम Needle Engine में किसी `gameObject` का उल्लेख करते हैं तो हम *वास्तव में* एक three.js `Object3D` के बारे में भी बात कर रहे होते हैं, जो three.js में किसी भी ऑब्जेक्ट का मूल प्रकार है। दोनों शब्दों का परस्पर उपयोग किया जा सकता है। कोई भी `gameObject` एक `Object3D` *है*।

इसका मतलब यह भी है कि - यदि आप पहले से ही three.js से परिचित हैं - तो आपको Needle Engine का उपयोग करने में बिल्कुल भी समस्या नहीं होगी। three.js के साथ आप जो कुछ भी कर सकते हैं वह Needle Engine में भी किया जा सकता है। यदि आप पहले से ही कुछ लाइब्रेरी का उपयोग कर रहे हैं तो आप उन्हें Needle Engine-आधारित वातावरण में भी उपयोग कर पाएंगे।

ध्यान दें: **Needle Engine का Exporter आपके मौजूदा C# कोड को Web Assembly में संकलित *नहीं* करता है**।
जबकि Web Assembly का उपयोग रनटाइम पर बेहतर प्रदर्शन दे सकता है, यह वेब अनुभव बनाने में पुनरावृति गति और लचीलेपन के लिए उच्च लागत पर आता है। हमारे [विजन](./../vision.md) और [तकनीकी अवलोकन](./../technical-overview.md) के बारे में और पढ़ें।

:::details Needle Engine के साथ नया Unity प्रोजेक्ट कैसे बनाएं? (वीडियो)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />
:::

## एक कॉम्पोनेन्ट बनाना
Unity में आप `MonoBehaviour` से व्युत्पन्न करके एक नया कॉम्पोनेन्ट बनाते हैं:
```csharp
using UnityEngine;
public class MyComponent : MonoBehaviour {
}
```

दूसरी ओर Needle Engine में एक कस्टम कॉम्पोनेन्ट इस प्रकार लिखा जाता है:
```ts twoslash
import { Behaviour } from "@needle-tools/engine"
export class MyComponent extends Behaviour {
}
```
## स्क्रिप्ट फ़ील्ड्स

### serializable
यदि आपने कुछ Needle Engine स्क्रिप्ट देखी हैं, तो आपने देखा होगा कि कुछ वेरिएबल्स को उनकी घोषणा के ऊपर `@serializable` के साथ एनोटेट किया गया है। यह Typescript में एक Decorator है और इसका उपयोग कोड को संशोधित या एनोटेट करने के लिए किया जा सकता है। Needle Engine में इसका उपयोग उदाहरण के लिए कोर क्रमबद्धता को यह बताने के लिए किया जाता है कि जब वह glTF में संग्रहीत कच्चे कॉम्पोनेन्ट जानकारी से एक कॉम्पोनेन्ट इंस्टेंस में परिवर्तित होता है तो हम अपनी स्क्रिप्ट में किन प्रकारों की उम्मीद करते हैं।
निम्नलिखित उदाहरण पर विचार करें:
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

class SomeClass extends Behaviour{
    @serializable(Behaviour)
    myOtherComponent?: Behaviour;
    @serializable(Object3D)
    someOtherObject?: Object3D;
}
```
यह Needle Engine को बताता है कि `myOtherComponent` को `Behaviour` प्रकार का होना चाहिए। जब आपका दृश्य लोड होता है तो यह स्वचालित रूप से फ़ील्ड को सही संदर्भ असाइन करेगा। `someOtherObject` के लिए भी यही सच है जहां हम `Object3D` संदर्भ में डीसेरियलाइज़ करना चाहते हैं।

ध्यान दें कि कुछ मामलों में प्रकार को छोड़ा जा सकता है। यह [Javascript में सभी प्रिमिटिव प्रकारों](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) के लिए किया जा सकता है। ये `boolean`, `number`, `bigint`, `string`, `null` और `undefined` हैं।
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    @serializable() // < no type is needed here because the field type is a primitive
    myString?: string;
}
```

### public vs private
`private`, `public` या `protected` जैसे किसी भी एक्सेस संशोधक के बिना फ़ील्ड्स जावास्क्रिप्ट में डिफ़ॉल्ट रूप से `public` होंगे
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    /// no accessor means it is public:
    myNumber?: number;
    // explicitly making it private:
    private myPrivateNumber?: number;
    protected myProtectedNumber?: number;
}
```
यही विधियों के लिए भी सच है।

## GameObjects और सीन
एक कॉम्पोनेन्ट से वर्तमान सीन तक पहुंचने के लिए आप `this.scene` का उपयोग करते हैं जो `this.context.scene` के बराबर है, यह आपको रूट three.js सीन ऑब्जेक्ट देता है।

एक कॉम्पोनेन्ट से पदानुक्रम को ट्रैवर्स करने के लिए आप किसी ऑब्जेक्ट के बच्चों पर पुनरावृति कर सकते हैं
for लूप के साथ:
```ts twoslash
for (let i = 0; i < this.gameObject.children; i++) {
    console.log(this.gameObject.children[i]);
}
```
या आप `foreach` समकक्ष का उपयोग करके पुनरावृति कर सकते हैं:
```ts twoslash
for (const child of this.gameObject.children) {
    console.log(child);
}
```
आप `traverse` विधि का उपयोग करके सभी वस्तुओं को पुनरावृति करने के लिए three.js विशिष्ट विधियों का भी उपयोग कर सकते हैं:
```ts twoslash
import { GameObject } from "@needle-tools/engine";
//---cut-before---
this.gameObject.traverse((obj: GameObject) => console.log(obj))
```
या केवल दृश्यमान वस्तुओं को ट्रैवर्स करने के लिए इसके बजाय [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) का उपयोग करें।

एक और विकल्प जो बहुत उपयोगी है जब आप केवल रेंडर करने योग्य वस्तुओं को पुनरावृति करना चाहते हैं तो आप सभी रेंडरर कॉम्पोनेन्ट को क्वेरी कर सकते हैं और उन पर इस तरह से पुनरावृति कर सकते हैं:
```ts twoslash
import { Renderer } from "@needle-tools/engine";

for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
कॉम्पोनेन्ट प्राप्त करने के बारे में अधिक जानकारी के लिए अगला अनुभाग देखें।

## कॉम्पोनेन्ट
Needle Engine एक कॉम्पोनेन्ट सिस्टम का भारी उपयोग कर रहा है जो Unity के समान है। इसका मतलब है कि आप सीन में किसी भी `Object3D` / `GameObject` में कॉम्पोनेन्ट जोड़ या हटा सकते हैं। `addNewComponent(<Object3D>, <ComponentType>)` का उपयोग करते समय एक कॉम्पोनेन्ट इंजन के साथ पंजीकृत किया जाएगा।
संलग्न कॉम्पोनेन्ट के इवेंट मेथड को तब इंजन द्वारा स्वचालित रूप से बुलाया जाएगा (जैसे `update` या `onBeforeRender`)। इवेंट मेथड की पूरी सूची [स्क्रिप्टिंग डॉक्यूमेंटेशन](../scripting.md#lifecycle-methods) में पाई जा सकती है

#### सीन में कॉम्पोनेन्ट ढूँढना
कॉम्पोनेन्ट प्राप्त करने के लिए आप Unity के समान परिचित विधियों का उपयोग कर सकते हैं। ध्यान दें कि निम्नलिखित एक उदाहरण के रूप में `Animator` प्रकार का उपयोग करता है, लेकिन आप किसी भी कॉम्पोनेन्ट प्रकार का उपयोग कर सकते हैं जो या तो बिल्ट-इन है या आपके द्वारा बनाया गया है।
| विधि का नाम | विवरण |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | GameObject/Object3D पर `Animator` कॉम्पोनेन्ट प्राप्त करें। यदि इसमें Animator कॉम्पोनेन्ट है तो यह `Animator` इंस्टेंस लौटाएगा या यदि ऑब्जेक्ट में ऐसा कोई कॉम्पोनेन्ट नहीं है तो `null` लौटाएगा। |
| `this.gameObject.getComponentInChildren(Animator)` | GameObject/Object3D पर या उसके किसी बच्चे पर पहला `Animator` कॉम्पोनेन्ट प्राप्त करें
| `this.gameObject.getComponentsInParents(Animator)` | पैरेंट पदानुक्रम में सभी animator कॉम्पोनेन्ट प्राप्त करें (वर्तमान GameObject/Object3D सहित)

ये विधियां स्टैटिक GameObject प्रकार पर भी उपलब्ध हैं। उदाहरण के लिए ``GameObject.getComponent(this.gameObject, Animator)`` पास किए गए GameObject/Object3D पर `Animator` कॉम्पोनेन्ट प्राप्त करने के लिए।

एक या अधिक कॉम्पोनेन्ट के लिए पूरे सीन को खोजने के लिए आप ``GameObject.findObjectOfType(Animator)`` या `GameObject.findObjectsOfType(Animator)` का उपयोग कर सकते हैं।

## नाम बदले गए Unity प्रकार
हमारे इंजन में कुछ Unity-विशिष्ट प्रकारों को अलग-अलग प्रकार के नामों पर मैप किया गया है। निम्नलिखित सूची देखें:

| Unity में प्रकार | Needle Engine में प्रकार |  |
| -- | -- | -- |
| `UnityEvent` | `EventList` | एक UnityEvent को `EventList` प्रकार के रूप में निर्यात किया जाएगा (`UnityEvents` को डीसेरियलाइज़ करने के लिए `serializable(EventList)` का उपयोग करें) |
| `GameObject` | `Object3D` | |
| `Transform` | `Object3D` | three.js और Needle Engine में एक GameObject और एक Transform समान हैं (कोई `Transform` कॉम्पोनेन्ट नहीं है)। इस नियम का एकमात्र अपवाद `RectTransform` को संदर्भित करना है जो Needle Engine में भी एक कॉम्पोनेन्ट है। |
| `Color` | `RGBAColor` | three.js रंग प्रकार में अल्फा प्रॉपर्टी नहीं होती है। इस कारण से Unity से निर्यात किए गए सभी Color प्रकारों को `RGBAColor` के रूप में निर्यात किया जाएगा जो एक कस्टम Needle Engine प्रकार है |

## Transform
Transform डेटा को सीधे `GameObject` / `Object3D` पर एक्सेस किया जा सकता है। Unity के विपरीत, ऐसा कोई अतिरिक्त transform कॉम्पोनेन्ट नहीं है जो इस डेटा को धारण करता हो।
- ``this.gameObject.position`` स्थानीय स्पेस में Vector3 [position](https://threejs.org/docs/?q=obj#api/en/core/Object3D.position) है
- ``this.gameObject.worldPosition`` वर्ल्ड स्पेस में Vector3 position है
- ``this.gameObject.rotation`` स्थानीय स्पेस में [euler rotation](https://threejs.org/docs/?q=obj#api/en/core/Object3D.rotation) है
- ``this.gameObject.worldRotation`` वर्ल्ड स्पेस में euler कोणों में euler rotation है
- ``this.gameObject.quaternion`` - स्थानीय स्पेस में [quaternion rotation](https://threejs.org/docs/?q=obj#api/en/core/Object3D.quaternion) है
- ``this.gameObject.worldQuaternion`` वर्ल्ड स्पेस में quaternion rotation है
- ``this.gameObject.scale`` - स्थानीय स्पेस में Vector3 [scale](https://threejs.org/docs/?q=obj#api/en/core/Object3D.scale) है
- ``this.gameObject.worldScale`` वर्ल्ड स्पेस में Vector3 scale है

यहां ध्यान रखने योग्य मुख्य अंतर यह है कि three.js में `position` डिफ़ॉल्ट रूप से एक स्थानीय स्पेस स्थिति है, जबकि Unity में `position` वर्ल्ड स्पेस होगी और स्थानीय स्पेस स्थिति का जानबूझकर उपयोग करने के लिए `localPosition` का उपयोग किया जाएगा।

### WORLD- Position, Rotation, Scale...

in three.js (and thus also in Needle Engine) the `object.position`, `object.rotation`, `object.scale` are all local space coordinates. This is different to Unity where we are used to `position` being worldspace and using `localPosition` to deliberately use the local space position.

If you want to access the world coordinates in Needle Engine we have utility methods that you can use with your objects. Call `getWorldPosition(yourObject)` to calculate the world position. Similar methods exist for rotation/quaternion and scale. To get access to those methods just import them from Needle Engine like so `import { getWorldPosition } from "@needle.tools/engine"`

Note that these utility methods like `getWorldPosition`, `getWorldRotation`, `getWorldScale` internally have a buffer of Vector3 instances and are meant to be used locally only. This means that you should not cache them in your component, otherwise your cached value will eventually be overriden. But it is safe to call `getWorldPosition` multiple times in your function to make calculations without having to worry to re-use the same instance. If you are not sure what this means you should take a look at the **Primitive Types** section in the [Typescript Essentials Guide](./typescript-essentials.md#primitive-types)

## Time
Use `this.context.time` to get access to time data:
- `this.context.time.time` is the time since the application started running
- `this.context.time.deltaTime` is the time that has passed since the last frame
- `this.context.time.frameCount` is the number of frames that have passed since the application started
- `this.context.time.realtimeSinceStartup` is the unscaled time since the application has started running

It is also possible to use `this.context.time.timeScale` to deliberately slow down time for e.g. slow motion effects.


## Raycasting
Use ``this.context.physics.raycast()`` to perform a raycast and get a list of intersections. If you dont pass in any options the raycast is performed from the mouse position (or first touch position) in screenspace using the currently active `mainCamera`. You can also pass in a `RaycastOptions` object that has various settings like `maxDistance`, the camera to be used or the layers to be tested against.

Use ``this.context.physics.raycastFromRay(your_ray)`` to perform a raycast using a [three.js ray](https://threejs.org/docs/#api/en/math/Ray)

Note that the calls above are by default raycasting against visible scene objects. That is different to Unity where you always need colliders to hit objects. The default three.js solution has both pros and cons where one major con is that it can perform quite slow depending on your scene geometry. It may be especially slow when raycasting against skinned meshes. It is therefor recommended to usually set objects with SkinnedMeshRenderers in Unity to the `Ignore Raycast` layer which will then be ignored by default by Needle Engine as well.

Another option is to use the physics raycast methods which will only return hits with colliders in the scene.

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Here is a editable [example for physics raycast](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)

## Input
Use ``this.context.input`` to poll input state:

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update(){
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN")
        }
    }
}
```

You can also subscribe to events in the ``InputEvents`` enum like so:
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable(){
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }
    onDisable() {
        // it is recommended to also unsubscribe from events when your component becomes inactive
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    inputPointerDown = (evt: NEPointerEvent) => { console.log(evt); }
}
```

If you want to handle inputs yourself you can also subscribe to [all events the browser provides](https://developer.mozilla.org/en-US/docs/Web/Events) (there are a ton). For example to subscribe to the browsers click event you can write:
```ts twoslash
window.addEventListener("click", () => { console.log("MOUSE CLICK"); });
```
Note that in this case you have to handle all cases yourself. For example you may need to use different events if your user is visiting your website on desktop vs mobile vs a VR device. These cases are automatically handled by the Needle Engine input events (e.g. `PointerDown` is raised both for mouse down, touch down and in case of VR on controller button down).


## InputSystem Callbacks
Similar to Unity (see [IPointerClickHandler in Unity](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html)) you can also register to receive input events on the component itself.

```ts twoslash
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class ReceiveClickEvent extends Behaviour {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```

Available pointer events for all components:
- `onPointerDown`
- `onPointerUp`
- `onPointerEnter`
- `onPointerMove`
- `onPointerExit`
- `onPointerClick`

All have a `PointerEventData` argument describing the event.

## Debug.Log
The `Debug.Log()` equivalent in javascript is `console.log()`. You can also use `console.warn()` or `console.error()`.
```ts twoslash
import { GameObject, Renderer } from "@needle-tools/engine";
const someVariable = 42;
// ---cut-before---

console.log("Hello web");
// You can pass in as many arguments as you want like so:
console.log("Hello", someVariable, GameObject.findObjectOfType(Renderer), this.context);
```

## Gizmos
In Unity you normally have to use special methods to draw Gizmos like `OnDrawGizmos` or `OnDrawGizmosSelected`. In Needle Engine on the other hand such methods dont exist and you are free to draw gizmos from anywhere in your script. Note that it is also your responsibility then to *not* draw them in e.g. your deployed web application (you can just filter them by `if(isDevEnvironment))`).

Here is an example to draw a red wire sphere for one second for e.g. visualizing a point in worldspace
```ts twoslash
import { Vector3 } from "three";
const hit = { point: new Vector3(0, 0, 0) };
// ---cut-before---
import { Gizmos } from "@needle-tools/engine";
Gizmos.DrawWireSphere(hit.point, 0.05, 0xff0000, 1);
```
Here are some of the available gizmo methods:
| Method name |  |
| --- | --- |
| `Gizmos.DrawArrow` | |
| `Gizmos.DrawBox` | |
| `Gizmos.DrawBox3` | |
| `Gizmos.DrawDirection` | |
| `Gizmos.DrawLine` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawSphere` | |
| `Gizmos.DrawWireSphere` | |


## Useful Utility Methods

Import from `@needle-tools/engine` e.g. `import { getParam } from "@needle-tools/engine"`

| Method name | Description |
| --- | --- |
| `getParam()` | Checks if a url parameter exists. Returns true if it exists but has no value (e.g. `?help`), false if it is not found in the url or is set to 0 (e.g. `?help=0`), otherwise it returns the value (e.g. `?message=test`) |
| `isMobileDevice()` | Returns true if the app is accessed from a mobile device |
| `isDevEnvironment()` | Returns true if the current app is running on a local server |
| `isMozillaXR()` | |
| `isiOS` | |
| `isSafari` | |

```ts twoslash
import { isMobileDevice } from "@needle-tools/engine"
if( isMobileDevice() )
```

```ts twoslash
import { getParam } from "@needle-tools/engine"
// returns true
const myFlag = getParam("some_flag")
console.log(myFlag)
```

## The Web project
In C# you usually work with a solution containing one or many projects. In Unity this solution is managed by Unity for you and when you open a C# script it opens the project and shows you the file.
You usually install Packages using Unity's built-in package manager to add features provided by either Unity or other developers (either on your team or e.g. via Unity's AssetStore). Unity does a great job of making adding and managing packages easy with their PackageManager and you might never have had to manually edit a file like the `manifest.json` (this is what Unity uses to track which packages are installed) or run a command from the command line to install a package.

In a web environment you use `npm` - the Node Package Manager - to manage dependencies / packages for you. It does basically the same to what Unity's PackageManager does - it installs (downloads) packages from *some* server (you hear it usually called a *registry* in that context) and puts them inside a folder named `node_modules`.

When working with a web project most of you dependencies are installed from [npmjs.com](https://npmjs.com/). It is the most popular package registry out there for web projects.

Here is an example of how a package.json might look like:
```json
{
  "name": "@optional_org/package_name",
  "version": "1.0.0",
  "scripts": {
    "start": "vite --host"
  },
  "dependencies": {
	  "@needle-tools/engine": "^3.5.9-beta",
	  "three": "npm:@needle-tools/three@0.146.8"
	},
  "devDependencies": {
	  "@types/three": "0.146.0",
	  "@vitejs/plugin-basic-ssl": "^1.0.1",
	  "typescript": "^5.0.4",
	  "vite": "^4.3.4",
	  "vite-plugin-compression": "^0.5.1"
	}
}
```

Our default template uses Vite as its bundler and has no frontend framework pre-installed. Needle Engine is unoppionated about which framework to use so you are free to work with whatever framework you like. We have samples for popular frameworks like Vue.js, Svelte, Next.js, React or React Three Fiber.

## Installing packages & dependencies
To install a dependency from npm you can open your web project in a commandline (or terminal) and run `npm i <the/package_name>` (shorthand for `npm install`)
For example run `npm i @needle-tools/engine` to install [Needle Engine](https://www.npmjs.com/package/@needle-tools/engine). This will then add the package to your `package.json` to the `dependencies` array.
To install a package as a devDependency only you can run `npm i --save-dev <package_name>`. More about the difference between dependencies and devDependencies below.

### What's the difference between 'dependencies' and 'devDependencies'
You may have noticed that there are two entries containing *dependency* - `dependencies` and `devDependencies`.

`dependencies` are **always installed** (or bundled) when either your web project is installed or in cases where you develop a library and your package is installed as a dependency of another project.

`devDependencies` are **only** installed when developing the project (meaning that when you directly run `install` in the specific directory) and they are otherwise **not** included in your project.


### How do I install another package or dependency and how to use it?
The [Installing](#installing) section taught us that you can install dependencies by running `npm i <package_name>` in your project directory where the `package_name` can be any package that you find on [npm.js](https://npmjs.org).

Let's assume you want to add a tweening library to your project. We will use [`@tweenjs/tween.js`](https://www.npmjs.com/package/@tweenjs/tween.js) for this example. [Here](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts) is the final project if you want to jump ahead and just see the result.

First run `npm install @tweenjs/tween.js` in the terminal and wait for the installation to finish. This will add a new entry to our package.json:
```json
"dependencies": {
    "@needle-tools/engine": "^3.5.11-beta",
    "@tweenjs/tween.js": "^20.0.3",
    "three": "npm:@needle-tools/three@0.146.8"
}
```

Then open one of your script files in which you want to use tweening and import at the top of the file:
```ts twoslash
import * as TWEEN from '@tweenjs/tween.js';
```
Note that we do here import all types in the library by writing `* as TWEEN`. We could also just import specific types like `import { Tween } from @tweenjs/tween.js`.

Now we can use it in our script. It is always recommended to refer to the documentation of the library that you want to use. In the case of tween.js they provide a [user guide](https://github.com/tweenjs/tween.js/blob/HEAD/docs/user_guide.md) that we can follow. Usually the Readme page of the package on npm contains information on how to install and use the package.

To rotate a cube we create a new component type called `TweenRotation`, we then go ahead and create our tween instance for the object rotation, how often it should repeat, which easing to use, the tween we want to perform and then we start it. We then only have to call `update` every frame to update the tween animation. The final script looks like this:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
import * as TWEEN from '@tweenjs/tween.js';

export class TweenRotation extends Behaviour {

    // save the instance of our tweener
    private _tween?: TWEEN.Tween<any>;

    start() {
        const rotation = this.gameObject.rotation;
        // create the tween instance
        this._tween = new TWEEN.Tween(rotation);
        // set it to repeat forever
        this._tween.repeat(Infinity);
        // set the easing to use
        this._tween.easing(TWEEN.Easing.Quintic.InOut);
        // set the values to tween
        this._tween.to({ y: Math.PI * 0.5 }, 1000);
        // start it
        this._tween.start();
    }

    update() {
        // update the tweening every frame
        // the '?' is a shorthand for checking if _tween has been created
        this._tween?.update();
    }
}
```
Now we only have to add it to any of the objects in our scene to rotate them forever.
You can see the final script in action [here](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts).


# Learning more

- [Needle Engine में स्क्रिप्टिंग](../scripting)
- [Typescript Essentials](./typescript-essentials.md)
- [कॉम्पोनेन्ट संदर्भ](../component-reference.md)

---
यह पेज AI का उपयोग करके स्वचालित रूप से अनुवादित किया गया है