---
title: Einführung in das Scripting für Unity-Entwickler
---

Needle Engine bietet eine enge Integration in den Unity Editor. Dies ermöglicht Entwicklern und Designern gleichermaßen, in einer vertrauten Umgebung zusammenzuarbeiten und schnelle, leistungsstarke und schlanke Web-Erlebnisse zu liefern.

Dieser Leitfaden richtet sich hauptsächlich an Entwickler mit Unity3D-Hintergrund, kann aber auch für Entwickler mit Web- oder three.js-Hintergrund nützlich sein. Er behandelt Themen darüber, wie Dinge in Unity im Vergleich zu three.js oder Needle Engine gemacht werden.

Wenn Sie neu in Typescript und Javascript sind und Skripte für Needle Engine schreiben möchten, empfehlen wir Ihnen auch, den [Typescript Essentials Guide](./typescript-essentials) zu lesen, um ein grundlegendes Verständnis der Unterschiede zwischen C# und Javascript/Typescript zu erhalten.

Wenn Sie mitprogrammieren möchten, können Sie [engine.needle.tools/new](https://engine.needle.tools/new) öffnen, um ein kleines Projekt zu erstellen, das Sie im Browser bearbeiten können ⚡

## Die Grundlagen
Needle Engine ist eine 3D-Web-Engine, die auf [three.js](https://threejs.org/) aufsetzt. Three.js ist eine der beliebtesten WebGL-basierten 3D-Rendering-Bibliotheken für das Web. Wann immer wir in Needle Engine von einem `gameObject` sprechen, meinen wir *tatsächlich* auch ein three.js `Object3D`, den Basistyp jedes Objekts in three.js. Beide Begriffe können synonym verwendet werden. Jedes `gameObject` *ist* ein `Object3D`.

Das bedeutet auch, dass Sie - wenn Sie bereits mit three.js vertraut sind - überhaupt keine Probleme mit Needle Engine haben werden. Alles, was Sie mit three.js tun können, kann auch in Needle Engine getan werden. Wenn Sie bereits bestimmte Bibliotheken verwenden, können Sie diese auch in einer auf Needle Engine basierenden Umgebung nutzen.

Hinweis: **Der Exporter von Needle Engine kompiliert Ihren bestehenden C#-Code _NICHT_ nach Web Assembly**.
Die Verwendung von Web Assembly *kann* zwar zu besserer Laufzeitleistung führen, bringt aber hohe Kosten für die Iterationsgeschwindigkeit und Flexibilität beim Erstellen von Web-Erlebnissen mit sich. Lesen Sie mehr über unsere [Vision](./../vision.md) und den [technischen Überblick](./../technical-overview.md).

:::details Wie erstelle ich ein neues Unity-Projekt mit Needle Engine? (Video)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />
:::

## Eine Komponente erstellen
In Unity erstellen Sie eine neue Komponente, indem Sie von `MonoBehaviour` ableiten:
```csharp
using UnityEngine;
public class MyComponent : MonoBehaviour {
}
```

Eine benutzerdefinierte Komponente in Needle Engine wird hingegen wie folgt geschrieben:
```ts twoslash
import { Behaviour } from "@needle-tools/engine"
export class MyComponent extends Behaviour {
}
```
## Skriptfelder

### serializable
Wenn Sie einige Needle Engine-Skripte gesehen haben, ist Ihnen vielleicht aufgefallen, dass einige Variablen über ihrer Deklaration mit `@serializable` annotiert sind. Dies ist ein Decorator in Typescript und kann verwendet werden, um Code zu modifizieren oder zu annotieren. In Needle Engine wird dies beispielsweise verwendet, um der Kern-Serialization mitzuteilen, welche Typen wir in unserem Skript erwarten, wenn es die im glTF gespeicherten rohen Komponenteninformationen in eine Component-Instanz umwandelt.
Betrachten Sie das folgende Beispiel:
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
Dies teilt Needle Engine mit, dass `myOtherComponent` vom Typ `Behaviour` sein soll. Es wird dann automatisch die korrekte Referenz dem Feld zuweisen, wenn Ihre Szene geladen wird. Das Gleiche gilt für `someOtherObject`, wo wir zu einer `Object3D`-Referenz deserialisieren möchten.

Beachten Sie, dass in einigen Fällen der Typ weggelassen werden kann. Dies kann für alle [primitiven Typen in Javascript](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) erfolgen. Dies sind `boolean`, `number`, `bigint`, `string`, `null` und `undefined`.
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    @serializable() // < kein Typ wird hier benötigt, da der Feldtyp ein primitiver ist
    myString?: string;
}
```

### public vs private
Felder ohne Accessor-Modifier wie `private`, `public` oder `protected` sind in Javascript standardmäßig `public`.
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    /// kein Accessor bedeutet, es ist public:
    myNumber?: number;
    // explizit private machen:
    private myPrivateNumber?: number;
    protected myProtectedNumber?: number;
}
```
Das Gleiche gilt auch für Methoden.

## GameObjects und die Szene
Um die aktuelle Szene von einer Komponente aus aufzurufen, verwenden Sie `this.scene`, was gleichbedeutend ist mit `this.context.scene`. Dies gibt Ihnen das root three.js scene object.

Um die Hierarchie von einer Komponente aus zu durchlaufen, können Sie entweder die children eines Objekts durchlaufen
mit einer for-Schleife:
```ts twoslash
for (let i = 0; i < this.gameObject.children; i++) {
    console.log(this.gameObject.children[i]);
}
```
oder Sie können mit dem `foreach`-Äquivalent iterieren:
```ts twoslash
for (const child of this.gameObject.children) {
    console.log(child);
}
```
Sie können auch spezifische three.js-Methoden verwenden, um alle Objekte rekursiv schnell zu durchlaufen, indem Sie die [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse)-Methode verwenden:
```ts twoslash
import { GameObject } from "@needle-tools/engine";
this.gameObject.traverse((obj: GameObject) => console.log(obj))
```
oder um nur sichtbare Objekte zu durchlaufen, verwenden Sie stattdessen [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible).

Eine weitere Option, die recht nützlich ist, wenn Sie nur Objekte durchlaufen möchten, die renderbar sind, ist, alle Renderer-Komponenten abzufragen und diese wie folgt zu durchlaufen:
```ts twoslash
import { Renderer } from "@needle-tools/engine";

for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
Weitere Informationen zum Abrufen von Komponenten finden Sie im nächsten Abschnitt.

## Komponenten
Needle Engine nutzt stark ein Komponentensystem, das dem von Unity ähnelt. Das bedeutet, dass Sie Komponenten zu jedem `Object3D` / `GameObject` in der Szene hinzufügen oder entfernen können. Eine Komponente wird bei der Engine registriert, wenn Sie `addNewComponent(<Object3D>, <ComponentType>)` verwenden.
Die Ereignismethoden, die der angehängten Komponente gehören, werden dann automatisch von der Engine aufgerufen (z. B. `update` oder `onBeforeRender`). Eine vollständige Liste der Ereignismethoden finden Sie in der [Skripting-Dokumentation](../scripting.md#lifecycle-methods).

#### Komponenten in der Szene finden
Zum Abrufen von Komponenten können Sie die bekannten Methoden ähnlich wie in Unity verwenden. Beachten Sie, dass im Folgenden der `Animator`-Typ als Beispiel verwendet wird, Sie können aber ebenso jeden beliebigen Komponententyp verwenden, der entweder eingebaut ist oder von Ihnen erstellt wurde.
| Method name | Beschreibung |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | Ruft die `Animator`-Komponente auf einem GameObject/Object3D ab. Es wird entweder die `Animator`-Instanz zurückgegeben, wenn es eine Animator-Komponente hat, oder `null`, wenn das Objekt keine solche Komponente hat. |
| `this.gameObject.getComponentInChildren(Animator)` | Ruft die erste `Animator`-Komponente auf einem GameObject/Object3D oder auf einem seiner Children ab. |
| `this.gameObject.getComponentsInParents(Animator)` | Ruft alle Animator-Komponenten in der Parent-Hierarchie ab (einschließlich des aktuellen GameObject/Object3D). |

Diese Methoden sind auch auf dem statischen GameObject-Typ verfügbar. Zum Beispiel ``GameObject.getComponent(this.gameObject, Animator)``, um die `Animator`-Komponente auf einem übergebenen GameObject/Object3D zu erhalten.

Um die gesamte Szene nach einer oder mehreren Komponenten zu durchsuchen, können Sie ``GameObject.findObjectOfType(Animator)`` oder `GameObject.findObjectsOfType(Animator)` verwenden.

## Umbenannte Unity-Typen
Einige Unity-spezifische Typen sind in unserer Engine anderen Typnamen zugeordnet. Siehe die folgende Liste:

| Typ in Unity | Typ in Needle Engine |  |
| -- | -- | -- |
| `UnityEvent` | `EventList` | Ein UnityEvent wird als `EventList`-Typ exportiert (verwenden Sie `serializable(EventList)`, um UnityEvents zu deserialisieren) |
| `GameObject` | `Object3D` | |
| `Transform` | `Object3D` | In three.js und Needle Engine sind ein GameObject und ein Transform dasselbe (es gibt keine `Transform`-Komponente). Die einzige Ausnahme ist die Referenzierung eines `RectTransform`, das auch in Needle Engine eine Komponente ist. |
| `Color` | `RGBAColor` | Der three.js color type hat keine Alpha-Eigenschaft. Aus diesem Grund werden alle aus Unity exportierten Color-Typen als `RGBAColor` exportiert, was ein benutzerdefinierter Needle Engine-Typ ist. |

## Transform
Transform-Daten können direkt auf dem `GameObject` / `Object3D` zugegriffen werden. Anders als in Unity gibt es keine zusätzliche Transform-Komponente, die diese Daten enthält.
- ``this.gameObject.position`` ist die Vector3 [position](https://threejs.org/docs/?q=obj#api/en/core/Object3D.position) im local space
- ``this.gameObject.worldPosition`` ist die Vector3 position im world space
- ``this.gameObject.rotation`` ist die [euler rotation](https://threejs.org/docs/?q=obj#api/en/core/Object3D.rotation) im local space
- ``this.gameObject.worldRotation`` ist die euler rotation in euler angles im world space
- ``this.gameObject.quaternion`` - ist die [quaternion rotation](https://threejs.org/docs/?q=obj#api/en/core/Object3D.quaternion) im local space
- ``this.gameObject.worldQuaternion`` ist die quaternion rotation im world space
- ``this.gameObject.scale`` - ist die Vector3 [scale](https://threejs.org/docs/?q=obj#api/en/core/Object3D.scale) im local space
- ``this.gameObject.worldScale`` ist die Vector3 scale im world space

Der Hauptunterschied, den man sich merken muss, ist, dass `position` in three.js standardmäßig eine Localspace-Position ist, während `position` in Unity Worldspace wäre und man `localPosition` verwenden würde, um bewusst die Localspace-Position zu verwenden. Der nächste Abschnitt erklärt, wie man die Worldspace-Position in three.js erhält.

### WORLD- Position, Rotation, Scale...

In three.js (und somit auch in Needle Engine) sind `object.position`, `object.rotation`, `object.scale` allesamt Localspace-Koordinaten. Das unterscheidet sich von Unity, wo wir es gewohnt sind, dass `position` Worldspace ist und wir `localPosition` verwenden, um bewusst die Localspace-Position zu verwenden.

Wenn Sie in Needle Engine auf die World-Koordinaten zugreifen möchten, haben wir Utility-Methoden, die Sie mit Ihren Objekten verwenden können. Rufen Sie `getWorldPosition(yourObject)` auf, um die World-Position zu berechnen. Ähnliche Methoden existieren für Rotation/Quaternion und Scale. Um Zugriff auf diese Methoden zu erhalten, importieren Sie sie einfach von Needle Engine wie folgt: `import { getWorldPosition } from "@needle.tools/engine"`.

Beachten Sie, dass diese Utility-Methoden wie `getWorldPosition`, `getWorldRotation`, `getWorldScale` intern einen Buffer von Vector3-Instanzen haben und nur lokal verwendet werden sollen. Das bedeutet, dass Sie sie nicht in Ihrer Komponente cachen sollten, da Ihr gecachter Wert ansonsten irgendwann überschrieben wird. Es ist aber sicher, `getWorldPosition` mehrmals in Ihrer Funktion aufzurufen, um Berechnungen durchzuführen, ohne sich Sorgen machen zu müssen, dieselbe Instanz wiederzuverwenden. Wenn Sie nicht sicher sind, was das bedeutet, sollten Sie einen Blick auf den Abschnitt **Primitive Types** im [Typescript Essentials Guide](./typescript-essentials.md#primitive-types) werfen.

## Time
Verwenden Sie `this.context.time`, um Zugriff auf Zeitdaten zu erhalten:
- `this.context.time.time` ist die Zeit, seit die Anwendung läuft
- `this.context.time.deltaTime` ist die Zeit, die seit dem letzten Frame vergangen ist
- `this.context.time.frameCount` ist die Anzahl der Frames, die seit dem Start der Anwendung vergangen sind
- `this.context.time.realtimeSinceStartup` ist die unskalierte Zeit seit dem Start der Anwendung

Es ist auch möglich, `this.context.time.timeScale` zu verwenden, um die Zeit absichtlich zu verlangsamen, z. B. für Zeitlupeneffekte.

## Raycasting
Verwenden Sie ``this.context.physics.raycast()``, um einen Raycast durchzuführen und eine Liste von Schnittpunkten zu erhalten. Wenn Sie keine Optionen übergeben, wird der Raycast von der Mausposition (oder der ersten Touch-Position) im Screenspace mit der aktuell aktiven `mainCamera` durchgeführt. Sie können auch ein `RaycastOptions`-Objekt übergeben, das verschiedene Einstellungen wie `maxDistance`, die zu verwendende Kamera oder die Schichten, gegen die getestet werden soll, enthält.

Verwenden Sie ``this.context.physics.raycastFromRay(your_ray)``, um einen Raycast unter Verwendung eines [three.js ray](https://threejs.org/docs/#api/en/math/Ray) durchzuführen.

Beachten Sie, dass die obigen Aufrufe standardmäßig Raycasting gegen sichtbare Szenenobjekte durchführen. Das unterscheidet sich von Unity, wo Sie immer Collider benötigen, um Objekte zu treffen. Die standardmäßige three.js-Lösung hat sowohl Vor- als auch Nachteile, wobei ein großer Nachteil darin besteht, dass sie je nach Szenegeometrie recht langsam sein kann. Sie kann besonders langsam sein, wenn sie gegen skinned meshes raycastet. Es wird daher empfohlen, Objekte mit SkinnedMeshRenderers in Unity normalerweise auf den `Ignore Raycast`-Layer zu setzen, der dann standardmäßig auch von Needle Engine ignoriert wird.

Eine weitere Option ist die Verwendung der Physics-Raycast-Methoden, die nur Treffer mit Collider in der Szene zurückgeben.

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Hier ist ein editierbares [Beispiel für Physics Raycast](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore).

## Input
Verwenden Sie ``this.context.input``, um den Eingabezustand abzufragen:

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

Sie können auch Ereignisse im `InputEvents`-Enum wie folgt abonnieren:
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable(){
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }
    onDisable() {
        // es wird empfohlen, sich auch von Events abzumelden, wenn Ihre Komponente inaktiv wird
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    inputPointerDown = (evt: NEPointerEvent) => { console.log(evt); }
}
```

Wenn Sie Eingaben selbst behandeln möchten, können Sie auch alle [Events abonnieren, die der Browser bereitstellt](https://developer.mozilla.org/en-US/docs/Web/Events) (es gibt eine Menge davon). Zum Beispiel, um das Klick-Event des Browsers zu abonnieren, können Sie schreiben:
```ts twoslash
window.addEventListener("click", () => { console.log("MOUSE CLICK"); });
```
Beachten Sie, dass Sie in diesem Fall alle Fälle selbst behandeln müssen. Zum Beispiel müssen Sie möglicherweise verschiedene Events verwenden, wenn Ihr Benutzer Ihre Website auf einem Desktop, Handy oder einem VR-Gerät besucht. Diese Fälle werden von den Needle Engine Input-Events automatisch behandelt (z. B. wird `PointerDown` sowohl bei Mausklick, Touch-Down als auch im Falle von VR bei Controller-Button-Down ausgelöst).

## InputSystem Callbacks
Ähnlich wie in Unity (siehe [IPointerClickHandler in Unity](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html)) können Sie sich auch registrieren, um Input-Events auf der Komponente selbst zu empfangen.

```ts twoslash
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class ReceiveClickEvent extends Behaviour {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```

Verfügbare Pointer-Events für alle Komponenten:
- `onPointerDown`
- `onPointerUp`
- `onPointerEnter`
- `onPointerMove`
- `onPointerExit`
- `onPointerClick`

Alle haben ein `PointerEventData`-Argument, das das Event beschreibt.

## Debug.Log
Das Äquivalent zu `Debug.Log()` in Javascript ist `console.log()`. Sie können auch `console.warn()` oder `console.error()` verwenden.
```ts twoslash
import { GameObject, Renderer } from "@needle-tools/engine";
const someVariable = 42;
console.log("Hello web");
// Sie können beliebig viele Argumente wie folgt übergeben:
console.log("Hello", someVariable, GameObject.findObjectOfType(Renderer), this.context);
```

## Gizmos
In Unity müssen Sie normalerweise spezielle Methoden verwenden, um Gizmos zu zeichnen, wie z. B. `OnDrawGizmos` oder `OnDrawGizmosSelected`. In Needle Engine hingegen existieren solche Methoden nicht, und Sie können Gizmos von überall in Ihrem Skript zeichnen. Beachten Sie, dass es dann auch Ihre Verantwortung ist, diese *nicht* in Ihrer bereitgestellten Webanwendung zu zeichnen (Sie können sie einfach nach `if(isDevEnvironment))` filtern).

Hier ist ein Beispiel, um eine rote Drahtkugel für eine Sekunde zu zeichnen, z. B. zur Visualisierung eines Punktes im Worldspace:
```ts twoslash
import { Vector3 } from "three";
const hit = { point: new Vector3(0, 0, 0) };
import { Gizmos } from "@needle-tools/engine";
Gizmos.DrawWireSphere(hit.point, 0.05, 0xff0000, 1);
```
Hier sind einige der verfügbaren Gizmo-Methoden:
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

## Nützliche Utility-Methoden

Importieren Sie von `@needle-tools/engine`, z. B. `import { getParam } from "@needle-tools/engine"`

| Method name | Beschreibung |
| --- | --- |
| `getParam()` | Prüft, ob ein URL-Parameter existiert. Gibt true zurück, wenn er existiert, aber keinen Wert hat (z. B. `?help`), false, wenn er in der URL nicht gefunden wird oder auf 0 gesetzt ist (z. B. `?help=0`), andernfalls gibt er den Wert zurück (z. B. `?message=test`). |
| `isMobileDevice()` | Gibt true zurück, wenn die App von einem mobilen Gerät aus aufgerufen wird. |
| `isDevEnvironment()` | Gibt true zurück, wenn die aktuelle App auf einem lokalen Server läuft. |
| `isMozillaXR()` | |
| `isiOS` | |
| `isSafari` | |

```ts twoslash
import { isMobileDevice } from "@needle-tools/engine"
if( isMobileDevice() )
```

```ts twoslash
import { getParam } from "@needle-tools/engine"
// gibt true zurück
const myFlag = getParam("some_flag")
console.log(myFlag)
```

## Das Webprojekt
In C# arbeiten Sie normalerweise mit einer Solution, die ein oder viele Projekte enthält. In Unity wird diese Solution von Unity für Sie verwaltet, und wenn Sie ein C#-Skript öffnen, öffnet es das Projekt und zeigt Ihnen die Datei.
Sie installieren Pakete normalerweise über den eingebauten Paketmanager von Unity, um Funktionen hinzuzufügen, die entweder von Unity oder anderen Entwicklern bereitgestellt werden (entweder in Ihrem Team oder z. B. über Unitys AssetStore). Unity leistet hervorragende Arbeit, das Hinzufügen und Verwalten von Paketen mit seinem PackageManager einfach zu gestalten, und Sie haben vielleicht nie manuell eine Datei wie die `manifest.json` bearbeiten (das ist, was Unity verwendet, um zu verfolgen, welche Pakete installiert sind) oder einen Befehl von der Kommandozeile ausführen müssen, um ein Paket zu installieren.

In einer Web-Umgebung verwenden Sie `npm` - den Node Package Manager -, um Abhängigkeiten / Pakete für Sie zu verwalten. Er macht im Grunde dasselbe wie der PackageManager von Unity - er installiert (lädt) Pakete von *einem* Server (man nennt ihn in diesem Kontext normalerweise ein *registry*) und legt sie in einem Ordner namens `node_modules` ab.

Bei der Arbeit mit einem Webprojekt werden die meisten Ihrer Abhängigkeiten von [npmjs.com](https://npmjs.com/) installiert. Es ist das beliebteste Paket-Registry für Webprojekte.

Hier ist ein Beispiel, wie eine package.json aussehen könnte:
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

Unsere Standardvorlage verwendet Vite als Bundler und hat kein Frontend-Framework vorinstalliert. Needle Engine hat keine Präferenz bezüglich des zu verwendenden Frameworks, sodass Sie frei wählen können, mit welchem Framework Sie arbeiten möchten. Wir haben Beispiele für beliebte Frameworks wie Vue.js, Svelte, Next.js, React oder React Three Fiber.

## Pakete & Abhängigkeiten installieren
Um eine Abhängigkeit von npm zu installieren, können Sie Ihr Webprojekt in einer Kommandozeile (oder einem Terminal) öffnen und `npm i <the/package_name>` ausführen (Kurzform für `npm install`).
Führen Sie zum Beispiel `npm i @needle-tools/engine` aus, um [Needle Engine](https://www.npmjs.com/package/@needle-tools/engine) zu installieren. Dies fügt dann das Paket zu Ihrer `package.json` im `dependencies`-Array hinzu.
Um ein Paket nur als devDependency zu installieren, können Sie `npm i --save-dev <package_name>` ausführen. Mehr über den Unterschied zwischen dependencies und devDependencies unten.

### Was ist der Unterschied zwischen 'dependencies' und 'devDependencies'?
Möglicherweise haben Sie bemerkt, dass es zwei Einträge gibt, die *dependency* enthalten - `dependencies` und `devDependencies`.

`dependencies` werden **immer installiert** (oder gebündelt), wenn entweder Ihr Webprojekt installiert wird oder in Fällen, in denen Sie eine Bibliothek entwickeln und Ihr Paket als Abhängigkeit eines anderen Projekts installiert wird.

`devDependencies` werden **nur** während der Entwicklung des Projekts installiert (was bedeutet, dass Sie `install` direkt in dem spezifischen Verzeichnis ausführen) und sind ansonsten **nicht** in Ihrem Projekt enthalten.

### Wie installiere ich ein anderes Paket oder eine Abhängigkeit und wie verwende ich es?
Der Abschnitt [Installing](#installing) hat uns gelehrt, dass Sie Abhängigkeiten installieren können, indem Sie `npm i <package_name>` im Verzeichnis Ihres Projekts ausführen, wobei `<package_name>` jedes Paket sein kann, das Sie auf [npm.js](https://npmjs.org) finden.

Nehmen wir an, Sie möchten eine Tweening-Bibliothek zu Ihrem Projekt hinzufügen. Wir werden [`@tweenjs/tween.js`](https://www.npmjs.com/package/@tweenjs/tween.js) für dieses Beispiel verwenden. [Hier](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts) ist das fertige Projekt, falls Sie voreilen und einfach das Ergebnis sehen möchten.

Führen Sie zuerst `npm install @tweenjs/tween.js` im Terminal aus und warten Sie, bis die Installation abgeschlossen ist. Dies wird einen neuen Eintrag zu unserer package.json hinzufügen:
```json
"dependencies": {
    "@needle-tools/engine": "^3.5.11-beta",
    "@tweenjs/tween.js": "^20.0.3",
    "three": "npm:@needle-tools/three@0.146.8"
}
```

Öffnen Sie dann eine Ihrer Skriptdateien, in der Sie Tweening verwenden möchten, und importieren Sie am Anfang der Datei:
```ts twoslash
import * as TWEEN from '@tweenjs/tween.js';
```
Beachten Sie, dass wir hier alle Typen in der Bibliothek importieren, indem wir `* as TWEEN` schreiben. Wir könnten auch nur spezifische Typen importieren, wie z. B. `import { Tween } from @tweenjs/tween.js`.

Jetzt können wir es in unserem Skript verwenden. Es wird immer empfohlen, sich an die Dokumentation der Bibliothek zu halten, die Sie verwenden möchten. Im Falle von tween.js stellen sie einen [user guide](https://github.com/tweenjs/tween.js/blob/HEAD/docs/user_guide.md) zur Verfügung, dem wir folgen können. Normalerweise enthält die Readme-Seite des Pakets auf npm Informationen darüber, wie man das Paket installiert und verwendet.

Um einen Würfel zu rotieren, erstellen wir einen neuen Komponententyp namens `TweenRotation`. Wir erstellen dann unsere Tween-Instanz für die Objektrotation, wie oft sie sich wiederholen soll, welche Easing-Funktion verwendet werden soll, das Tween, das wir durchführen möchten, und dann starten wir es. Wir müssen dann nur noch `update` in jedem Frame aufrufen, um die Tween-Animation zu aktualisieren. Das endgültige Skript sieht wie folgt aus:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
import * as TWEEN from '@tweenjs/tween.js';

export class TweenRotation extends Behaviour {

    // die Instanz unseres TWEENers speichern
    private _tween?: TWEEN.Tween<any>;

    start() {
        const rotation = this.gameObject.rotation;
        // die Tween-Instanz erstellen
        this._tween = new TWEEN.Tween(rotation);
        // auf unendliche Wiederholung setzen
        this._tween.repeat(Infinity);
        // die zu verwendende Easing-Funktion setzen
        this._tween.easing(TWEEN.Easing.Quintic.InOut);
        // die zu tweenenden Werte setzen
        this._tween.to({ y: Math.PI * 0.5 }, 1000);
        // starten
        this._tween.start();
    }

    update() {
        // das Tweening in jedem Frame aktualisieren
        // das '?' ist eine Kurzform zur Überprüfung, ob _tween erstellt wurde
        this._tween?.update();
    }
}
```
Jetzt müssen wir es nur noch zu einem der Objekte in unserer Szene hinzufügen, um sie unendlich zu rotieren.
Sie können das fertige Skript in Aktion [hier](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts) sehen.

# Mehr erfahren

- [Scripting in Needle Engine](../scripting)
- [Typescript Essentials](./typescript-essentials.md)
- [Component Reference](../component-reference.md)


Seite automatisch mit KI übersetzt