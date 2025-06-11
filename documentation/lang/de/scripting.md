---
title: Erstellen und Verwenden von Komponenten
tags:
    - scripting
    - serialization
    - csharp
    - typescript
    - javascript
    - components
---

# Eigene Komponenten erstellen

Wenn Sie neu im Scripting sind, **empfehlen wir dringend**, zuerst die folgenden Anleitungen zu lesen:

- [Typescript Essentials](./getting-started/typescript-essentials.md)
- [Needle Engine für Unity-Entwickler](./getting-started/for-unity-developers.md)

Wenn Sie wissen, was Sie tun, können Sie direkt in die [Needle Engine API-Dokumentation](https://engine.needle.tools/docs/api/latest) springen.

---

Der Laufzeitcode für Needle Engine wird in [TypeScript](https://typescriptlang.org) (empfohlen) oder [JavaScript](https://javascript.info/) geschrieben. Daraus generieren wir automatisch C#-Stub-Komponenten, die Sie im Editor zu GameObjects hinzufügen können. Die C#-Komponenten und ihre Daten werden zur Laufzeit als JavaScript-Komponenten mit denselben Daten neu erstellt und an three.js-Objekte angehängt.

Sowohl benutzerdefinierte Komponenten als auch integrierte Unity-Komponenten können auf diese Weise JavaScript-Komponenten zugeordnet werden. Zum Beispiel sind Zuordnungen für viele integrierte Komponenten im Zusammenhang mit Animation, Rendering oder Physik bereits [in Needle Engine enthalten](./component-reference.md#unity-components).

Wenn Sie die folgenden Beispiele mitprogrammieren möchten, ohne etwas installieren zu müssen, klicken Sie einfach auf den folgenden Link:

- [Virtuellen Arbeitsbereich zum Mitprogrammieren erstellen](https://stackblitz.com/fork/github/needle-engine/vite-template?file=src%2Fmain.ts).

----

Unsere Web-Laufzeit-Engine übernimmt ein Komponentenmodell, das Unity ähnelt, und bietet daher viel Funktionalität, die sich vertraut anfühlen wird.
An three's Object3D-Objekten angehängte Komponenten haben Lebenszyklusmethoden wie ``awake``, ``start``, ``onEnable``, ``onDisable``, ``update`` und ``lateUpdate``, die Sie implementieren können. Sie können auch [Coroutines](#coroutines) verwenden.

----

## Wann Sie keinen Code schreiben müssen

Oft können interaktive Szenen durch die Verwendung von Events in Unity und das Aufrufen von Methoden auf integrierten Komponenten realisiert werden. Ein typisches Beispiel ist das Abspielen einer Animation beim Klicken auf eine Schaltfläche – Sie erstellen eine Schaltfläche, fügen im Inspector ein Click-Event hinzu und lassen dieses Animator.SetTrigger oder Ähnliches aufrufen, um eine bestimmte Animation abzuspielen.

Needle Engine übersetzt Unity Events in JavaScript-Methodenaufrufe, was dies zu einem sehr schnellen und flexiblen Workflow macht – richten Sie Ihre Events wie gewohnt ein und wenn sie aufgerufen werden, funktionieren sie genauso wie in Unity.

![image](https://user-images.githubusercontent.com/2693840/187314594-7e34905d-e704-4fa3-835c-6b40f11e1c62.png)
_Ein Beispiel für ein Button Click Event, das in Needle Engine sofort funktioniert – kein Code erforderlich._

## Eine neue Komponente erstellen
Skripte werden in TypeScript (empfohlen) oder JavaScript geschrieben.
Es gibt zwei Möglichkeiten, benutzerdefinierte Skripte zu Ihrem Projekt hinzuzufügen:

- Fügen Sie einfach eine Datei mit der Erweiterung `.ts` oder `.js` im Verzeichnis `src/scripts/` Ihres generierten Projekts hinzu, zum Beispiel `src/scripts/MyFirstScript.ts`

- Unity-spezifisch:
  Organisieren Sie Ihren Code in NPM Definition Files (npm-Pakete). Diese helfen Ihnen, Code zwischen Projekten zu modularisieren und wiederzuverwenden, und wenn Sie mit Webentwicklung vertraut sind, handelt es sich tatsächlich um reguläre npm-Pakete, die lokal installiert werden.
  In Unity können Sie NpmDef-Dateien über `Create > NPM Definition` erstellen und dann TypeScript-Dateien hinzufügen, indem Sie mit der rechten Maustaste auf eine NpmDef-Datei klicken und `Create > TypeScript` auswählen. Weitere Informationen finden Sie in [diesem Kapitel](./project-structure.md#npm-definition-files).

Bei beiden Ansätzen werden die Quellverzeichnisse auf Änderungen überwacht und C#-Stub-Komponenten oder Blender-Panels werden neu generiert, sobald eine Änderung erkannt wird.
Änderungen an den Quelldateien führen auch zu einem Hot Reload der laufenden Website – Sie müssen nicht warten, bis Unity die C#-Komponenten neu kompiliert hat. Dies macht die Iteration über Code nahezu sofort möglich.

Sie können sogar mehrere Komponententypen in einer Datei haben (z. B. können Sie `export class MyComponent1` und `export class MyOtherComponent` in derselben Typescript-Datei deklarieren).

Wenn Sie neu im Schreiben von Javascript oder Typescript sind, empfehlen wir Ihnen, zuerst die Anleitung [Typescript Essentials Guide](./getting-started/typescript-essentials.md) zu lesen, bevor Sie mit dieser Anleitung fortfahren.

:::details Beispiel: Eine Komponente erstellen, die ein Objekt dreht

- **Eine Komponente erstellen, die ein Objekt dreht**
  Erstellen Sie ``src/scripts/Rotate.ts`` und fügen Sie den folgenden Code hinzu:
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class Rotate extends Behaviour
{
    @serializable()
    speed : number = 1;

    start(){
        // logging this is useful for debugging in the browser.
        // You can open the developer console (F12) to see what data your component contains
        console.log(this);
    }

    // update will be called every frame
    update(){
        this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
    }
}
```

Nun wird in Unity automatisch ein neues Skript namens ``Rotate.cs`` generiert. Fügen Sie die neue Unity-Komponente einem Cube hinzu und speichern Sie die Szene.
Der Cube dreht sich nun im Browser.
Öffnen Sie die Chrome-Entwicklerkonsole mit `F12`, um das Log aus der ``Rotate.start``-Methode zu inspizieren. Dies ist eine hilfreiche Methode, um zu lernen und zu debuggen, welche Felder exportiert und derzeit zugewiesen sind. Im Allgemeinen werden alle öffentlichen und serialisierbaren Felder sowie alle öffentlichen Eigenschaften exportiert.

Fügen Sie nun ein neues Feld ``public float speed = 5`` zu Ihrer Unity-Komponente hinzu und speichern Sie es. Der Rotate-Komponenten-Inspector zeigt nun ein ``speed``-Feld an, das Sie bearbeiten können. Speichern Sie die Szene (oder klicken Sie auf den ``Build``-Button) und beachten Sie, dass der Javascript-Komponente nun der exportierte ``speed``-Wert zugewiesen ist.
:::

:::details Komponente mit einer benutzerdefinierten Funktion erstellen
Siehe die [Typescript Essentials Guide](./getting-started/typescript-essentials.md) für weitere Informationen zur Syntax und Sprache.
```ts twoslash
import { Behaviour } from "@needle-tools/engine";

export class PrintNumberComponent extends Behaviour
{
    start(){
      this.printNumber(42);
    }

    private printNumber(myNumber : number){
        console.log("My Number is: " + myNumber);
    }
}
```
:::

:::details Versionskontrolle & Unity
Obwohl generierte C#-Komponenten den Typnamen verwenden, um stabile GUIDs zu erzeugen, empfehlen wir, generierte Komponenten als bewährte Methode in die Versionskontrolle zu übernehmen (check in).
:::

## Komponentenarchitektur
Komponenten werden zu three.js `Object3Ds` hinzugefügt. Dies ähnelt der Art und Weise, wie Komponenten in Unity zu `GameObjects` hinzugefügt werden. Wenn wir also auf ein three.js Object3D zugreifen möchten, können wir es als ``this.gameObject`` aufrufen, was das `Object3D` zurückgibt, an das die Komponente angehängt ist.

***Hinweis**: Wenn Sie ``visible`` auf einem Object3D auf false setzen, verhält es sich wie ``SetActive(false)`` in Unity – das bedeutet, es deaktiviert auch alle aktuellen Komponenten auf diesem Objekt und seinen Kindern. Update-Events für inaktive Komponenten werden nicht aufgerufen, bis ``visible`` wieder auf true gesetzt wird.* Wenn Sie ein Objekt ausblenden möchten, ohne die Komponenten zu beeinflussen, können Sie einfach die Needle Engine `Renderer`-Komponente deaktivieren.

### Lebenszyklusmethoden

Beachten Sie, dass Lebenszyklusmethoden nur aufgerufen werden, wenn sie deklariert sind. Deklarieren Sie also ``update``-Lebenszyklusmethoden nur, wenn sie tatsächlich notwendig sind, da sonst die Performance leiden kann, wenn Sie viele Komponenten mit Update-Schleifen haben, die nichts tun.

| Methodenname | Beschreibung |
| -- | --
| `awake()` | Erste Methode, die beim Erstellen einer neuen Komponente aufgerufen wird
| `onEnable()` | Wird aufgerufen, wenn eine Komponente aktiviert wird (z. B. wenn ``enabled`` von false auf true wechselt)
| `onDisable()` | Wird aufgerufen, wenn eine Komponente deaktiviert wird (z. B. wenn ``enabled`` von true auf false wechselt)
| `onDestroy()` | Wird aufgerufen, wenn das Object3D oder die Komponente zerstört wird
| `start()` | Wird am Anfang des ersten Frames aufgerufen, nachdem die Komponente erstellt wurde
| `earlyUpdate()` | Erstes Update-Event
| `update()` | Standard-Update-Event
| `lateUpdate()` | Wird nach update aufgerufen
| `onBeforeRender()` | Letztes Update-Event vor dem Render-Aufruf
| `onAfterRender()` | Wird nach dem Render-Event aufgerufen

### Physik-Event-Methoden
| Methodenname | Beschreibung |
| -- | --
| `onCollisionEnter(col : Collision)` |
| `onCollisionStay(col : Collision)` |
| `onCollisionExit(col : Collision)` |
| `onTriggerEnter(col : Collision)` |
| `onTriggerStay(col : Collision)` |
| `onTriggerExit(col : Collision)` |

### Eingabe-Event-Methoden
| Methodenname | Beschreibung |
| -- | --
| `onPointerEnter(args : PointerEventData)` | Wird aufgerufen, wenn ein Cursor beginnt, über ein Objekt (oder eines seiner Kinder) zu schweben
| `onPointerMove(args : PointerEventData)` | Wird aufgerufen, wenn sich ein Cursor über ein Objekt (oder eines seiner Kinder) bewegt
| `onPointerExit(args : PointerEventData)` | Wird aufgerufen, wenn ein Cursor ein Objekt verlässt (aufhört zu schweben)
| `onPointerDown(args : PointerEventData)` | Wird aufgerufen, wenn ein Cursor über einem Objekt gedrückt wird
| `onPointerUp(args : PointerEventData)` | Wird aufgerufen, wenn ein Cursor über einem Objekt losgelassen wird
| `onPointerClick(args : PointerEventData)` | Wird aufgerufen, wenn ein Cursor über einem Objekt geklickt wird

### XR-Event-Methoden
*erfordert Needle Engine >= 3.32.0*
| Methodenname | Beschreibung |
| -- | --
| `supportsXR(mode: XRSessionMode)` | Optional implementieren, wenn Sie XR-Callbacks nur für bestimmte XR-Modi wie `immersive-vr` oder `immersive-ar` erhalten möchten. Geben Sie `true` zurück, um dem System mitzuteilen, dass Sie Callbacks für den übergebenen Modus wünschen
| `onBeforeXR(mode: XRSessionMode, init: XRSessionInit)` | Wird direkt vor der Anforderung einer XRSession aufgerufen und kann verwendet werden, um das XRSessionInit-Objekt zu modifizieren
| `onEnterXR(args: NeedleXREventArgs)` | Callback, wenn diese Komponente einer XR-Sitzung beitritt (oder in einer laufenden XR-Sitzung aktiv wird)
| `onUpdateXR(args: NeedleXREventArgs)` | Callback, wenn sich eine XR-Sitzung aktualisiert (während sie in der XR-Sitzung noch aktiv ist)
| `onLeaveXR(args: NeedleXREventArgs)` | Callback, wenn diese Komponente eine XR-Sitzung verlässt (oder wenn sie in einer laufenden XR-Sitzung inaktiv wird)
| `onControllerAdded(args: NeedleXRControllerEventArgs)` | Callback, wenn ein Controller in einer XR-Sitzung verbunden/hinzugefügt wird ODER wenn die Komponente einer laufenden XR-Sitzung beitritt, die bereits verbundene Controller hat ODER wenn die Komponente während einer laufenden XR-Sitzung aktiv wird, die bereits verbundene Controller hat
| `onControllerRemoved(args: NeedleXRControllerEventArgs)` | Callback, wenn ein Controller in einer XR-Sitzung entfernt wird ODER wenn die Komponente während einer laufenden XR-Sitzung inaktiv wird

#### Zusätzliche XR-Events

| Methodenname | Beschreibung |
| -- | --
| `window.addEventListener("needle-xrsession-start")` | CustomEvent, das aufgerufen wird, wenn eine XRSession beginnt. `details` enthält die `NeedleXRSession`
| `window.addEventListener("needle-xrsession-end")` | CustomEvent, das aufgerufen wird, wenn eine XRSession beginnt. `details` enthält die `NeedleXRSession`
| `onXRSessionStart(args: { session:NeedleXRSession } )` | Globaler Event-Hook. Zum Abmelden verwenden Sie `offXRSessionStart`

### Coroutines

Coroutines können mit der [JavaScript Generator-Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) deklariert werden.
Um eine Coroutine zu starten, rufen Sie ``this.startCoroutine(this.myRoutineName());`` auf.

**Beispiel**
```ts twoslash
import { Behaviour, FrameEvent } from "@needle-tools/engine";

export class Rotate extends Behaviour {

    start() {
        // the second argument is optional and allows you to specifiy
        // when it should be called in the current frame loop
        // coroutine events are called after regular component events of the same name
        // for example: Update coroutine events are called after component.update() functions
        this.startCoroutine(this.rotate(), FrameEvent.Update);
    }

    // this method is called every frame until the component is disabled
    *rotate() {
        // keep looping forever
        while (true) {
            yield;
        }
    }
}
```

Um eine Coroutine zu stoppen, verlassen Sie entweder die Routine, indem Sie daraus zurückkehren, oder speichern Sie den Rückgabewert von ``startCoroutine`` und rufen Sie ``this.stopCoroutine(<...>)`` auf. Alle Coroutines werden bei ``onDisable`` / beim Deaktivieren einer Komponente gestoppt.

## Spezielle Lebenszyklus-Hooks

Needle Engine bietet auch einige Lebenszyklus-Hooks, mit denen Sie sich in den Update-Loop einklinken können, ohne eine vollständige Komponente schreiben zu müssen.
Diese Hooks können an jeder beliebigen Stelle in Ihrer Webanwendung eingefügt werden (zum Beispiel im Top-Level-Scope oder in einer Svelte-Komponente).
| Methodenname | Beschreibung |
| -- | --
| `onInitialized(cb, options)` | Wird aufgerufen, wenn ein neuer Kontext initialisiert wird (vor dem ersten Frame)
| `onClear(cb, options)` | Registriert einen Callback, bevor der Engine-Kontext gelöscht wird
| `onDestroy(cb, options)` | Registriert einen Callback in der Engine, bevor der Kontext zerstört wird
| `onStart(cb, options)` | Wird direkt nach dem `start` der Komponenten am Anfang eines Frames aufgerufen
| `onUpdate(cb, options)` | Wird direkt nach dem `update` der Komponenten aufgerufen
| `onBeforeRender(cb, options)` | Wird vor dem Aufruf von render aufgerufen
| `onAfterRender(cb, options)` | Wird nach dem Aufruf von render aufgerufen

Zum Beispiel ([Siehe Beispiel auf stackblitz](https://stackblitz.com/edit/needle-engine-lifecycle-hooks?file=src%2Fmain.ts))
```ts twoslash
// this can be put into e.g. main.ts or a svelte component (similar to onMount)
import { onStart, onUpdate, onBeforeRender, onAfterRender } from "@needle-tools/engine"

onStart(ctx => console.log("Hello Scene", ctx.scene));

onUpdate(ctx => {
    // do something... e.g. access the frame # or deltatime via ctx.time
    console.log("UPDATE", ctx.time.frame);
});

onBeforeRender(ctx => {
    // this event is only called once because of the { once: true } argument
    console.log("ON BEFORE RENDER", ctx.time.frame);
}, { once: true } );

// Every event hook returns a method to unsubscribe from the event
const unsubscribe = onAfterRender(ctx => {
    console.log("ON AFTER RENDER", ctx.time.frame);
});
// Unsubscribe from the event at any time
setTimeout(()=> unsubscribe(), 1000);
```

## Komponenten finden, hinzufügen und entfernen

Um auf andere Komponenten zuzugreifen, verwenden Sie die statischen Methoden auf ``GameObject`` oder ``this.gameObject``-Methoden. Um zum Beispiel auf eine `Renderer`-Komponente im Elternobjekt zuzugreifen, verwenden Sie ``GameObject.getComponentInParent(this.gameObject, Renderer)`` oder ``this.gameObject.getComponentInParent(Renderer)``.

**Beispiel:**
```ts twoslash
import { Behaviour, GameObject, Renderer } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    start() {
        const renderer = GameObject.getComponentInParent(this.gameObject, Renderer);
        console.log(renderer);
    }
}
```

### Einige der verfügbaren Methoden:

| Methode | |
| -- | --
| `GameObject.instantiate(Object3D, InstantiateOptions)` | Erstellt eine neue Instanz dieses Objekts einschließlich neuer Instanzen all seiner Komponenten
| `GameObject.destroy(Object3D \| Component)` | Zerstört eine Komponente oder ein Object3D (und seine Komponenten)
| `GameObject.addNewComponent(Object3D, Type)` | Fügt eine neue Komponente für einen Typ zum bereitgestellten Objekt hinzu (und erstellt sie). Beachten Sie, dass ``awake`` und ``onEnable`` bereits aufgerufen werden, wenn die Komponente zurückgegeben wird
| `GameObject.addComponent(Object3D, Component)` | Verschiebt eine Komponenteninstanz zum bereitgestellten Objekt. Dies ist nützlich, wenn Sie bereits eine Instanz haben, z. B. wenn Sie eine Komponente mit z. B. `new MyComponent()` erstellen und sie dann an ein Objekt anhängen
| `GameObject.removeComponent(Component)` | Entfernt eine Komponente von einem GameObject
| `GameObject.getComponent(Object3D, Type)` | Gibt die erste Komponente zurück, die einem Typ auf dem bereitgestellten Objekt entspricht.
| `GameObject.getComponents(Object3D, Type)` | Gibt alle Komponenten zurück, die einem Typ auf dem bereitgestellten Objekt entsprechen.
| `GameObject.getComponentInChildren` | Wie ``getComponent``, sucht aber auch in Kindobjekten.
| `GameObject.getComponentsInChildren` | Wie ``getComponents``, sucht aber auch in Kindobjekten.
| `GameObject.getComponentInParent` | Wie ``getComponent``, sucht aber auch in Elternobjekten.
| `GameObject.getComponentsInParent` | Wie ``getComponents``, sucht aber auch in Elternobjekten.
| `GameObject.findObjectOfType` | Sucht in der gesamten Szene nach einem Typ.
| `GameObject.findObjectsOfType` | Sucht in der gesamten Szene nach allen passenden Typen.

## Three.js und das HTML DOM

Der Kontext bezieht sich auf die Laufzeit innerhalb einer [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
Die three.js-Szene lebt innerhalb einer benutzerdefinierten HTML-Komponente namens ``<needle-engine>`` (siehe *index.html* in Ihrem Projekt). Sie können auf die `<needle-engine>` Web Component über ``this.context.domElement`` zugreifen.

Diese Architektur ermöglicht potenziell mehrere Needle WebGL-Szenen auf derselben Webseite, die entweder eigenständig laufen oder als Teile Ihrer Webseite miteinander kommunizieren können.

### Auf die Szene zugreifen
Um von einer Komponente auf die aktuelle Szene zuzugreifen, verwenden Sie `this.scene`, was gleichbedeutend mit `this.context.scene` ist. Dies gibt Ihnen das Wurzelobjekt der three.js-Szene.

Um die Hierarchie von einer Komponente aus zu durchlaufen, können Sie entweder die Kinder eines Objekts mit einer for-Schleife durchlaufen:
```ts twoslash
for(let i = 0; i < this.gameObject.children; i++)
    console.log(this.gameObject.children[i]);
```
oder Sie können die `foreach`-Entsprechung verwenden:
```ts twoslash
for(const child of this.gameObject.children) {
    console.log(child);
}
```
Sie können auch three.js-spezifische Methoden verwenden, um schnell alle Objekte rekursiv zu durchlaufen, indem Sie die Methode [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse) verwenden:
```ts twoslash
import { Object3D } from "three";
this.gameObject.traverse((obj: Object3D) => console.log(obj));
```
oder um nur sichtbare Objekte zu durchlaufen, verwenden Sie stattdessen [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible).

Eine weitere Option, die sehr nützlich ist, wenn Sie nur renderbare Objekte durchlaufen möchten, besteht darin, alle Renderer-Komponenten abzufragen und diese wie folgt zu durchlaufen:
```ts twoslash
import { Renderer } from "@needle-tools/engine";
for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
Weitere Informationen zum Abrufen von Komponenten finden Sie im nächsten Abschnitt.

### Zeit
Verwenden Sie `this.context.time`, um auf Zeitdaten zuzugreifen:
- `this.context.time.time` ist die Zeit, seit die Anwendung läuft
- `this.context.time.deltaTime` ist die Zeit, die seit dem letzten Frame vergangen ist
- `this.context.time.frameCount` ist die Anzahl der Frames, die seit dem Start der Anwendung vergangen sind
- `this.context.time.realtimeSinceStartup` ist die nicht skalierte Zeit seit dem Start der Anwendung

Es ist auch möglich, `this.context.time.timeScale` zu verwenden, um die Zeit absichtlich zu verlangsamen, z. B. für Zeitlupeneffekte.

### Eingabe
Empfangen Sie Eingabedaten für das Objekt, auf dem sich die Komponente befindet:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onPointerDown() {
        console.log("POINTER DOWN on " + this.gameObject.name);
    }
}
```

Sie können sich auch für globale Ereignisse im ``InputEvents`` Enum anmelden, wie folgt:
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable() {
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    onDisable() {
        // it is recommended to also unsubscribe from events when your component becomes inactive
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    // @nonSerialized
    inputPointerDown = (evt: NEPointerEvent) => { console.log("POINTER DOWN anywhere on the <needle-engine> element"); }
}
```

Oder verwenden Sie ``this.context.input``, wenn Sie den Eingabezustand in jedem Frame abfragen möchten:

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update() {
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN anywhere")
        }
    }
}
```

Wenn Sie Eingaben selbst verarbeiten möchten, können Sie sich auch für [alle vom Browser bereitgestellten Ereignisse](https://developer.mozilla.org/en-US/docs/Web/Events) anmelden (es gibt eine Menge). Um sich zum Beispiel für das Klickereignis des Browsers anzumelden, können Sie schreiben:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onEnable() {
        window.addEventListener("click", this.windowClick);
    }

    onDisable() {
        // unsubscribe again when the component is disabled
        window.removeEventListener("click", this.windowClick);
    }

    windowClick = () => { console.log("CLICK anywhere on the page, not just on <needle-engine>"); }
}
```
Beachten Sie, dass Sie in diesem Fall alle Fälle selbst behandeln müssen. Sie müssen beispielsweise unterschiedliche Ereignisse verwenden, wenn Ihr Benutzer Ihre Website auf dem Desktop, auf dem Handy oder auf einem VR-Gerät besucht. Diese Fälle werden automatisch von den Needle Engine Eingabeereignissen behandelt (z. B. wird `PointerDown` sowohl für Maustaste gedrückt, Touch gedrückt als auch im Falle von VR für Controller-Taste gedrückt ausgelöst).

### Raycasting

Verwenden Sie ``this.context.physics.raycast()``, um einen Raycast durchzuführen und eine Liste von Schnittpunkten zu erhalten. Wenn Sie keine Optionen übergeben, wird der Raycast von der Mausposition (oder ersten Touchposition) im Bildschirmraum mit der aktuell aktiven `mainCamera` durchgeführt. Sie können auch ein `RaycastOptions`-Objekt übergeben, das verschiedene Einstellungen wie `maxDistance`, die zu verwendende Kamera oder die zu testenden Layer enthält.

Verwenden Sie ``this.context.physics.raycastFromRay(your_ray)``, um einen Raycast mit einem [three.js ray](https://threejs.org/docs/#api/en/math/Ray) durchzuführen.

> **Hinweis**: Diese Art von Raycast sendet einen Strahl gegen alle sichtbaren Objekte in der Szene. Es ist keine Physik-Engine erforderlich, was sich vom Verhalten in Unity unterscheidet, wo Sie immer Collider benötigen, um Objekte zu treffen. Wenn Sie nur gegen Physik-Collider casten möchten, verwenden Sie die unten beschriebenen `physics.engine.raycast`-Methoden.

#### Leistungsüberlegungen

Bei Verwendung der Standard-Needle-Komprimierungseinstellungen werden automatisch vereinfachte Versionen von Meshes erstellt und auch für Raycasting verwendet. Dennoch sind einige Mesh-Typen langsam – z. B. erfordern Skinning-Meshes oder Meshes mit Blendshapes aufwendige Berechnungen, um genaue Treffer zu bestimmen. Ziehen Sie in Erwägung, diese Objekte in Unity auf den Layer `Ignore Raycast` zu setzen, um ein Raycasting gegen sie zu vermeiden.

#### Physik-basiertes Raycasting

Eine weitere Option ist die Verwendung der physikbasierten Raycast-Methoden, die nur Treffer mit Collidern in der Szene zurückgeben.

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Hier ist ein bearbeitbares [Beispiel für physikbasiertes Raycasting](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)

### Netzwerk
Netzwerkmethoden können über ``this.context.connection`` aufgerufen werden. Weitere Informationen finden Sie in der [Netzwerk-Dokumentation](./networking.md).

## Needle Engine und Komponenten von überall zugreifen
Es ist möglich, auf alle oben beschriebenen Funktionen mit regulärem JavaScript-Code zuzugreifen, der sich nicht in Komponenten befindet und irgendwo anders lebt. Alle Komponenten und Funktionen der Needle Laufzeit sind über den globalen ``Needle``-Namespace zugänglich (Sie können ``console.log(Needle)`` schreiben, um einen Überblick zu erhalten).

Sie können Komponenten finden, indem Sie zum Beispiel ``Needle.findObjectOfType(Needle.AudioSource)`` verwenden. Es wird empfohlen, diese Referenzen zu cachen, da das wiederholte Suchen in der gesamten Szene teuer ist. Siehe die Liste unter [Komponenten finden, hinzufügen und entfernen](#finding-adding-and-removing-components) oben.

Für Callbacks für den anfänglichen Szenen-Ladevorgang siehe folgendes Beispiel:
```js
<needle-engine loadstart="loadingStarted" progress="loadingProgress" loadfinished="loadingFinished"></needle-engine>

<script type="text/javascript">
function loadingStarted() { console.log("START") }
function loadingProgress() { console.log("LOADING...") }
function loadingFinished() { console.log("FINISHED!") }
</script>
```

Sie können sich auch für das globale `NeedleEngine` (manchmal auch als *ContextRegistry* bezeichnet) anmelden, um einen Callback zu erhalten, wenn ein Needle Engine Kontext erstellt wurde, oder um auf alle verfügbaren Kontexte zuzugreifen:
```ts twoslash
class YourComponentType extends Behaviour {}
//---cut---
import { NeedleEngine, GameObject, Behaviour } from "@needle-tools/engine";

NeedleEngine.addContextCreatedCallback((args) => {
  const context = args.context;
  const scene = context.scene;
  const myInstance = GameObject.getComponentInChildren(scene, YourComponentType);
});
```

Eine weitere Option ist die Verwendung des [Lebenszyklus-Hooks](#special-lifecycle-hooks) `onInitialized(ctx => {})`.

Sie können auch auf alle verfügbaren Kontexte über `NeedleEngine.Registered` zugreifen, was das interne Array zurückgibt. (Beachten Sie, dass dieses Array nicht modifiziert werden sollte, aber verwendet werden kann, um alle aktiven Kontexte zu durchlaufen, um Einstellungen zu ändern, z. B. alle Kontexte auf `context.isPaused = true` zu setzen).

Unten finden Sie eine Liste der verfügbaren Ereignisse auf dem statischen `NeedleEngine`-Typ.
Sie können sich für diese Ereignisse über `NeedleEngine.registerCallback(ContextEvent.ContextCreated, (args) => {})` anmelden.

| ContextEvent Optionen | |
|---|---|
| `ContextEvent.ContextRegistered` | Wird aufgerufen, wenn der Kontext im Registry registriert ist. |
| `ContextEvent.ContextCreationStart` | Wird aufgerufen, bevor die erste glb geladen wird und kann verwendet werden, um die Physik-Engine zu initialisieren. Kann ein Promise zurückgeben |
| `ContextEvent.ContextCreated` | Wird aufgerufen, wenn der Kontext vor dem ersten Frame erstellt wurde |
| `ContextEvent.ContextDestroyed` | Wird aufgerufen, wenn der Kontext zerstört wurde |
| `ContextEvent.MissingCamera` | Wird aufgerufen, wenn der Kontext keine Kamera finden konnte, wird derzeit nur während der Erstellung aufgerufen |
| `ContextEvent.ContextClearing` | Wird aufgerufen, wenn der Kontext gelöscht wird: alle Objekte in der Szene werden zerstört und der interne Zustand wird zurückgesetzt |
| `ContextEvent.ContextCleared` | Wird aufgerufen, nachdem der Kontext gelöscht wurde |

## Gizmos

Die statische Klasse `Gizmos` kann verwendet werden, um Linien, Formen und Text zu zeichnen, was meist nützlich zum Debugging ist.
Alle Gizmos-Funktionen haben mehrere Optionen, z. B. für Farben oder dafür, wie lange sie in der Szene angezeigt werden sollen. Intern werden sie gecached und wiederverwendet.

| Gizmos | |
| -- | -- |
| `Gizmos.DrawLabel` | Zeichnet optional ein Label mit Hintergrund. Es kann an ein Objekt angehängt werden. Gibt ein Label-Handle zurück, das zum Aktualisieren des Textes verwendet werden kann. |
| `Gizmos.DrawRay` | Nimmt einen Ursprung und eine Richtung im Weltraum, um eine unendliche Strahl-Linie zu zeichnen |
| `Gizmos.DrawDirection` | Nimmt einen Ursprung und eine Richtung, um eine Richtung im Weltraum zu zeichnen |
| `Gizmos.DrawLine` | Nimmt zwei vec3-Weltraumpunkte, um eine Linie zu zeichnen |
| `Gizmos.DrawWireSphere` | Zeichnet eine Drahtgitterkugel im Weltraum |
| `Gizmos.DrawSphere` | Zeichnet eine gefüllte Kugel im Weltraum |
| `Gizmos.DrawWireBox` | Zeichnet eine Drahtgitterbox im Weltraum |
| `Gizmos.DrawWireBox3` | Zeichnet eine Drahtgitterbox3 |
| `Gizmos.DrawArrow` | Zeichnet einen Pfeil mit zwei Punkten im Weltraum |

## Serialisierung / Komponenten in glTF-Dateien
Um Komponenten einzubetten und Komponenten mit ihren korrekten Typen in glTF neu zu erstellen, müssen wir auch nicht-primitive Typen (alles, was keine ``Number``, ``Boolean`` oder ``String`` ist) speichern. Dazu fügen Sie einen ``@serializable(<type>)``-Decorator über Ihrem Feld oder Ihrer Eigenschaft hinzu.

**Beispiel:**
@[code ts twoslash](@code/component-object-reference.ts)

Um von und zu benutzerdefinierten Formaten zu serialisieren, ist es möglich, von der Klasse ``TypeSerializer`` zu erben und eine Instanz zu erstellen. Verwenden Sie ``super()`` im Konstruktor, um unterstützte Typen zu registrieren.

> **Hinweis**: Zusätzlich zu übereinstimmenden Feldern werden auch übereinstimmende Eigenschaften exportiert, wenn sie mit Feldern in der Typescript-Datei übereinstimmen.

## Szenen laden
In Unity referenzierte Prefabs, SceneAssets und AssetReferences (Unitys Addressable System) werden automatisch als glTF-Dateien exportiert (siehe Dokumentation [Export Prefabs](export.md)).

Diese exportierten glTF-Dateien werden als einfache String-URIs serialisiert. Um das Laden dieser Dateien aus TypeScript-Komponenten zu vereinfachen, haben wir das Konzept der ``AssetReference``-Typen hinzugefügt. Sie können zur Laufzeit geladen werden und ermöglichen so das verzögerte Laden von Teilen Ihrer App oder das Laden externer Inhalte.

**Beispiel:**
@[code ts twoslash](@code/component-prefab.ts)

AssetReferences werden nach URI gecacht. Wenn Sie also dasselbe exportierte glTF/Prefab in mehreren Komponenten/Skripten referenzieren, wird es nur einmal geladen und dann wiederverwendet.

# Nächste Schritte


Seite automatisch mit KI übersetzt