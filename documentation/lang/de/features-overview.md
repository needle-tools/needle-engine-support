# Funktionsübersicht

Needle Engine ist eine vollwertige 3D-Engine, die im Browser läuft. Sie kommt mit allen Funktionen, die Sie von einer modernen 3D-Engine erwarten würden, und mehr. Wenn Sie es noch nicht getan haben, werfen Sie einen Blick auf unsere [Homepage](https://needle.tools) und unsere [Samples und Showcase](https://engine.needle.tools/samples).

[[toc]]

## Shader und Materialien

Sowohl PBR Materials als auch Custom shaders, die mit Shader Graph oder anderen Systemen erstellt wurden, können exportiert werden.

<img src="https://user-images.githubusercontent.com/5083203/186012027-9bbe3944-fa56-41fa-bfbb-c989fa87aebb.png" />

Verwenden Sie den knotenbasierten [ShaderGraph](https://unity.com/features/shader-graph), um Shader für das Web zu erstellen. ShaderGraph macht es Künstlern leicht, weiter zu kreieren, ohne sich um die Syntax kümmern zu müssen.

Lesen Sie mehr über [PBR Materials](./export.md#physically-based-materials-pbr) • [Custom Shaders](./export.md#custom-shaders)

## Crossplatform: VR, AR, Mobile, Desktop
Needle Engine läuft überall dort, wo Webtechnologie verfügbar ist: Führen Sie die gleiche Anwendung auf Desktop, Mobile, AR oder VR aus. Wir bauen Needle Engine [mit XR im Blick](./xr.md) und betrachten dies als integralen Bestandteil des responsiven Webdesigns!

Verwenden Sie [Everywhere Actions](./everywhere-actions.md) für **Interactive AR auf Android und iOS**.


## Lightmaps

![lightmaps](https://user-images.githubusercontent.com/5083203/186163693-093c7ae2-96eb-4d75-b98f-bf19f78032ff.gif)

Lightmaps können in Unity oder Blender gebacken werden, um Ihren 3D-Inhalten auf einfache Weise schönes statisches Licht hinzuzufügen. Lightbaking für das Web war noch nie so einfach. Markieren Sie einfach Objekte, die Sie als static in Unity lightmappen möchten, fügen Sie ein oder viele Lights zu Ihrer Szene hinzu (oder verwenden Sie emissive materials) und klicken Sie auf bake. Needle Engine exportiert Ihre Lightmaps pro Szene und lädt und zeigt sie automatisch an, genau so, wie Sie es im Editor sehen!

> **Hinweis**: Es gibt keine technische Einschränkung, welchen Lightmapper Sie verwenden, solange sie in Unitys Lightmapping-Datenstrukturen landen. Lightmapper von Drittanbietern wie [Bakery](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218) werden daher ebenfalls unterstützt.

- Lesen Sie mehr über [Exporting Lightmaps](https://fwd.needle.tools/needle-engine/docs/lightmaps)

## Multiplayer und Networking
Networking ist in die Kernlaufzeit integriert. Needle Engine-Deployments auf Glitch enthalten einen winzigen Server, der es Ihnen ermöglicht, eine Multiplayer-3D-Umgebung in Sekundenschnelle zu deployen. Die integrierten networked components erleichtern den Einstieg, und Sie können Ihre eigenen synchronisierten Komponenten erstellen. Das Synchronisieren von Variablen und Zustand ist super einfach!

- Lesen Sie mehr über [Networking](https://fwd.needle.tools/needle-engine/docs/networking) • [Scripting](https://fwd.needle.tools/needle-engine/docs/scripting)

## Animationen und Sequencing
Needle Engine bringt leistungsstarke Animationen, Zustandskontrolle und Sequencing ins Web — vom einfachen Abspielen einer einzelnen Animation bis hin zur Orchestrierung und dem Blending komplexer Animationen und Character Controller. Der Exporter kann Unity-Komponenten wie Animator und Timeline in ein webfähiges Format übersetzen. Wir haben diese Funktionalität sogar zu unserem Blender-Addon hinzugefügt, so dass Sie kompatible Animation state machines erstellen und nla tracks als timelines ins Web von Blender aus exportieren können.

- Lesen Sie mehr über [Animation Components](./component-reference.md#animation)

### Animator

<img src="https://user-images.githubusercontent.com/5083203/186011302-176524b3-e8e5-4e6e-9b77-7faf3561bb15.png" />

Die Komponenten [Animator und AnimatorController](https://docs.unity3d.com/Manual/class-AnimatorController.html) in Unity ermöglichen es Ihnen, Animationen einzurichten und Bedingungen dafür zu definieren, wann und wie zwischen ihnen geblendet wird. Wir unterstützen den Export von state machines, StateMachineBehaviours, transitions und layers. StateMachineBehaviours werden auch mit ``OnStateEnter``, ``OnStateUpdate`` und ``OnStateExit`` events unterstützt.

> **Hinweis**: Sub-states und Blend Trees werden nicht unterstützt.

### Timeline

![2022-08-23-013517_Scene](https://user-images.githubusercontent.com/5083203/186037829-ee99340d-b19c-484d-b551-94797519c9d9.png)

Wir übersetzen auch [Unitys Timeline](https://unity.com/features/timeline) Setup und tracks in ein webfähiges Format.
Unterstützte tracks umfassen: AnimationTrack, AudioTrack, ActivationTrack, ControlTrack, SignalTrack.

> **Hinweis**: Sub-Timelines werden derzeit nicht unterstützt.

> **Hinweis**: Es ist möglich, [custom timeline tracks zu exportieren](https://github.com/needle-tools/needle-engine-modules/tree/main/package/TimelineHtml).

- Lesen Sie mehr über [Animation Components](./component-reference.md#animation)

## Physik
Verwenden Sie Rigidbodies, Mesh Colliders, Box Colliders oder SphereColliders, um Ihrer Welt Physik hinzuzufügen.

- Lesen Sie mehr über [Physics Components](./component-reference.md#physics)

<sample src="https://engine.needle.tools/samples-uploads/physics-animation/" />

## UI
Das Erstellen von UI mit Unitys UI canvas system ist in Entwicklung. Aktuelle Funktionen umfassen den Export von Text (einschließlich Fonts), Images, Buttons.

Siehe die [ui component reference](component-reference.md#ui) für unterstützte Komponenten.

<sample src="https://engine.needle.tools/samples-uploads/screenspace-ui" />

## Partikel
Der Export des Unity ParticleSystem (Shuriken) ist in Entwicklung. Aktuelle Funktionen umfassen world/local space Simulation, box und sphere emitter shapes, emission over time sowie burst emission, velocity- und color over time, emission by velocity, texturesheet animation, basic trails.
Siehe ein [live sample](https://engine.needle.tools/samples/particles) der unterstützten Funktionen unten:

<sample src="https://engine.needle.tools/samples-uploads/particles/" />

## PostProcessing

Builtin effects umfassen Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction. Sie können auch Ihre eigenen custom effects erstellen. Siehe [die component reference](./component-reference.md#postprocessing) für eine vollständige Liste.

<sample src="https://engine.needle.tools/samples-uploads/postprocessing/" />

## Editor-Integrationen
Needle Engine kommt mit leistungsstarken Integrationen in den Unity Editor und Blender geliefert. Sie ermöglicht es Ihnen, komplexe Szenen visuell einzurichten und zu exportieren, was eine einfache und flexible Zusammenarbeit zwischen Künstlern und Entwicklern ermöglicht.

## Scripting
Needle Engine verwendet einen [component based workflow](scripting.md#component-architecture). Erstellen Sie custom scripts in typescript oder javascript. Verwenden Sie unseren [modularen npm-basierten package workflow](https://fwd.needle.tools/needle-engine/docs/npmdef), der in Unity integriert ist. Ein [typescript zu C# component compiler](https://fwd.needle.tools/needle-engine/docs/component-compiler) erzeugt Unity-Komponenten magisch on the fly.

- Lesen Sie mehr über [Scripting Reference](scripting) • [Npm Definition Files](https://fwd.needle.tools/needle-engine/docs/npmdef)


## Und es gibt noch mehr

- PostProcessing → Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction...
- EditorSync → Live-Synchronisation der Bearbeitung in Unity mit der laufenden three.js-Anwendung für die lokale Entwicklung
- Interactive AR auf iOS und Android → Verwenden Sie unser [Everywhere Actions](./everywhere-actions.md) Feature-Set oder erstellen Sie Ihr eigenes

---
# Wohin als Nächstes

Siehe unseren [Getting Started Guide](getting-started/), um zu erfahren, wie Sie Needle Engine herunterladen und einrichten.
Erfahren Sie mehr über [unsere Vision](vision) oder tauchen Sie tiefer in einige der [technischen Hintergründe und glTF](technical-overview) ein, die all dies antreiben.


Seite automatisch mit KI übersetzt