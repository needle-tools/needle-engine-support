# Netzwerkfunktionen

Needle Engine enthält eine vollständige Netzwerklösung für Multiplayer-Erlebnisse.
Ein geteilter Weltzustand, Sprachchat, Sitzungspersistenz und mehr können mit unseren Netzwerkkomponenten und APIs erreicht werden. Sie können Ihre eigenen Komponenten vernetzen, wahlweise automatisch oder manuell.

Die Vernetzung in Needle Engine basiert auf [Websockets](https://github.com/jjxxs/websocket-ts). Die automatische Vernetzung verwendet JSON-Daten für einfache Handhabung. Für komplexe Anwendungsfälle und hohe Leistungsanforderungen nutzen wir [Flatbuffers](https://google.github.io/flatbuffers/).

Der Zugriff auf die Kernfunktionen des Netzwerks kann über ``this.context.connection`` aus einer Komponente erfolgen. Der standardmäßige Backend-Server verbindet Benutzer mit Räumen. Benutzer im selben Raum teilen den Zustand und empfangen Nachrichten voneinander.

## Netzwerkkonzepte

### Räume und Zustand

Im Mittelpunkt der Vernetzung in Needle Engine steht das Konzept der synchronisierten Räume. Jeder Raum hat eine ID, und Benutzer verbinden sich mit einem Raum, indem sie diese ID angeben. Räume werden auf einem Server gespeichert, und Benutzer können Räumen jederzeit beitreten und sie verlassen.
Wenn ein Benutzer einem Raum beitritt, erhält er den aktuellen Zustand des Raums, wendet diesen aktuellen Zustand auf seine Szene an und wartet dann auf Änderungen des Raumzustands.
Wenn ein Benutzer einen Raum verlässt, wartet er nicht mehr auf Änderungen des Raumzustands.

Der Raumzustand wird als JSON-Daten auf dem Server gespeichert, sodass alle Änderungen persistent sind. Das bedeutet, dass der Raumzustand nicht nur für die Vernetzung nützlich ist, sondern auch für die Persistenz der Aktionen eines einzelnen Benutzers.

Needle kann _Nur-Ansicht-IDs_ für Räume bereitstellen. Beim Zugriff auf einen Raum mit einer Nur-Ansicht-ID kann der Benutzer nicht mit dem Raum interagieren, aber den aktuellen Zustand sehen und Live-Updates erhalten. Dies ist nützlich für Präsentationen oder Demonstrationen.

### Besitzrechte

Objekte in einem Raum können von einem Benutzer _besessen_ werden. Das bedeutet, dass nur der Besitzer eines Objekts dessen Zustand ändern kann.
Standardmäßig haben Objekte keinen Besitzer.
Komponenten wie `DragControls` fordern den Besitz eines Objekts an, bevor sie es tatsächlich verschieben.
In benutzerdefinierten Komponenten können Sie steuern, wie der Besitz gehandhabt wird.
Es kann sein, dass keine Besitzrechte erforderlich sind, Besitzrechte automatisch an einen anderen Benutzer übertragen werden dürfen oder Besitzrechte nur durch eine bestimmte Aktion übertragen werden.

Wenn ein Benutzer einen Raum verlässt, werden Objekte, die diesem Benutzer gehören, entweder gelöscht oder die Besitzrechte werden zurückgesetzt, je nachdem, wie das Objekt erstellt wurde.

## Netzwerknutzung für Ihr Projekt aktivieren

1.  Fügen Sie Ihrer Szene eine `SyncedRoom`-Komponente hinzu. Standardmäßig wird dabei die von Needle bereitgestellte Netzwerkinfrastruktur verwendet.
2.  Fügen Sie einem Objekt, dessen Bewegung Sie über das Netzwerk synchronisieren möchten, eine `SyncedTransform`-Komponente hinzu.
3.  Fügen Sie dem gleichen Objekt eine `DragControls`-Komponente hinzu.
4.  Führen Sie das Projekt aus. Klicken Sie im Browser auf "Join Room" und kopieren Sie die URL.
5.  Öffnen Sie ein neues Browserfenster und fügen Sie die URL ein. Sie sollten nun dasselbe Objekt in beiden Fenstern sehen. Versuchen Sie, das Objekt in einem Fenster zu ziehen und beobachten Sie, wie es sich im anderen Fenster bewegt.

Die `DragControls`-Komponente, wie viele andere Needle-Komponenten auch, verfügt über integrierte Netzwerkunterstützung.
Die Besitzrechte werden an denjenigen übertragen, der mit dem Ziehen des Objekts beginnt.

## Integrierte Komponenten mit Netzwerkunterstützung

| Komponente        | Beschreibung                                                                                                                                     |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `SyncedRoom`      | Handhabt die Netzwerkverbindung und die Verbindung zu einem Raum.                                                                                |
| `SyncedTransform` | Handhabt die Synchronisierung von Transformationen.                                                                                              |
| `SyncedCamera`    | Erzeugt ein Prefab für jeden Benutzer, der mit dem Raum verbunden ist und dessen Position verfolgt.                                                |
| `VoIP`            | Handhabt Voice-over-IP-Audioverbindungen, Mikrofonzugriff usw. zwischen Benutzern.                                                              |
| `ScreenCapture`   | Handhabt die Bildschirmfreigabe über Web-APIs.                                                                                                   |
| `Networking`      | Wird verwendet, um die URL des Server-Backends anzupassen. Ermöglicht auch die Einstellung eines lokalen Servers für die Entwicklung.             |
| `DragControls`    | Handhabt das Ziehen von Objekten. Die Besitzrechte werden automatisch an den letzten Benutzer übergeben, der ein Objekt zieht.                  |
| `Duplicatable`    | Handhabt das Duplizieren von Objekten. Duplizierte Objekte werden für jeden im Raum instanziiert.                                                |
| `Deletable`       | Handhabt das Löschen von Objekten. Löschungen werden über das Netzwerk synchronisiert.                                                           |
| `DeleteBox`       | Handhabt das Löschen von Objekten mit einer "Deletable"-Komponente, wenn sie in ein Quader-Volumen gezogen werden.                               |
| `PlayerSync`      | Leistungsstarke Komponente, die für jeden verbundenen Spieler ein bestimmtes Objekt instanziiert.                                                |
| `PlayerState`     | Fügen Sie diese Komponente Objekten hinzu, die `PlayerSync` zugewiesen sind.                                                                     |
| `PlayerColor`     | Einfache Komponente für spielerspezifische Farben. Jedem Benutzer wird beim Betreten eines Raumes eine zufällige Farbe zugewiesen. Diese Komponente weist diese Farbe dem Hauptmaterial des Objekts zu. |
| `WebXR`           | Handhabt die Synchronisierung von Benutzeravataren (Hände und Köpfe).                                                                            |

## Automatische Vernetzung für benutzerdefinierte Komponenten

Felder in Ihren eigenen Komponenten können sehr einfach vernetzt werden. Änderungen am Feld werden automatisch erkannt und an alle Benutzer im Raum gesendet. Die Änderungen werden auch als Teil des Raumzustands persistent gespeichert, sodass Benutzer, die später dem Raum beitreten, ebenfalls den aktuellen Zustand des Feldes erhalten und alle dieselben Daten sehen.

Um ein Feld in einer Komponente automatisch zu vernetzen, versehen Sie es mit dem ``@syncField()``-Decorator:

::::code-group
:::code-group-item Synchronisieren einer Zahl
```ts twoslash
import { Behaviour, syncField, IPointerClickHandler } from "@needle-tools/engine"

export class SyncedNumber extends Behaviour implements IPointerClickHandler {

    // Verwenden Sie `@syncField`, um ein Feld automatisch zu vernetzen.
    // Optional können Sie eine Methode oder einen Methodennamen zuweisen, die/der aufgerufen wird, wenn sich der Wert ändert.
    @syncField("myValueChanged")
    mySyncedValue?: number = 1;
    
    private myValueChanged() {
       console.log("Mein Wert hat sich geändert", this.mySyncedValue);
    }
    
    onPointerClick() {
       this.mySyncedValue = Math.random();
    }
}
```
:::
:::code-group-item Synchronisieren der Farbe eines Objekts
<!-- BEISPIEL Netzwerk-Farbänderung -->
:::
::::

Beachten Sie, dass `syncField` einen optionalen Parameter hat, um eine Methode anzugeben, die aufgerufen werden soll, wenn sich der Wert ändert. Diese Methode sollte in derselben Klasse definiert sein.

::: tip Benutzerdefiniertes Projekt-Setup
Wenn Sie ein benutzerdefiniertes Projekt-Setup verwenden, müssen Sie ``experimentalDecorators: true`` in Ihrer ``tsconfig.json``-Datei aktivieren, damit ``syncField``-Decoratoren funktionieren. Projekte, die mit Needle Starters erstellt wurden, haben dies standardmäßig aktiviert.
:::

## Erstellen und Zerstören von Objekten

Oft möchten Sie Objekte zur Laufzeit erstellen und zerstören, und natürlich sollten diese Änderungen über das Netzwerk synchronisiert werden.

Die `PlayerSync`-Komponente vereinfacht diesen Prozess, indem sie automatisch für jeden verbundenen Spieler ein bestimmtes Objekt instanziiert.
Wenn ein Spieler den Raum verlässt, wird das Objekt für alle Benutzer zerstört.

Zusätzlich stellt Needle Engine zwei High-Level-Methoden bereit:
- [`syncInstantiate()`](https://engine.needle.tools/docs/api/latest/syncInstantiate) zum Duplizieren von Objekten über das Netzwerk.
- [`syncDestroy()`](https://engine.needle.tools/docs/api/latest/syncDestroy) zum Zerstören von Objekten über das Netzwerk.

> 🏗️ Codebeispiele im Aufbau

## Manuelle Vernetzung

Needle Engine bietet auch eine Low-Level-API zum Senden und Empfangen von Nachrichten. Wir nennen dies "manuelle Vernetzung". Die Prinzipien sind dieselben, aber Sie haben die volle Kontrolle über das Senden und Empfangen von Nachrichten und deren Verarbeitung.

### Senden von Nachrichten

Senden einer Nachricht an alle Benutzer im selben Raum:
```ts
this.context.connection.send(key: string, data: IModel | object | boolean | string | number | null);
```

### Empfangen von Nachrichten

Sie können Ereignisse im Raum über einen bestimmten Schlüssel abonnieren.
Typischerweise möchten Sie dies mit dem Abbestellen abgleichen:

- abonnieren in `onEnable` und abbestellen in `onDisable`
Mit diesem Ansatz werden keine Nachrichten empfangen, solange das Objekt deaktiviert ist.

- oder abonnieren in `start` und abbestellen in `onDestroy`
Mit diesem Ansatz werden Nachrichten weiterhin empfangen, auch wenn das Objekt deaktiviert ist.

```ts
this.context.connection.beginListen(key:string, callback:(data) => void)
```

Abbestellen von Ereignissen:
```ts
this.context.connection.stopListen(key:string)
```

### Steuerung der Nachrichtenpersistenz

Beim Senden von Netzwerknachrichten können Sie über die Low-Level-API entscheiden, ob diese Nachricht persistent gespeichert (im Raumzustand gespeichert) oder nicht (nur an aktuell im Raum befindliche Benutzer gesendet) werden soll. Um eine Nachricht persistent zu speichern, stellen Sie sicher, dass sie ein `guid`-Feld hat. Dieses Feld wird typischerweise verwendet, um die Nachrichtendaten auf ein bestimmtes Objekt anzuwenden, indem dessen `guid` bereitgestellt wird. Wenn Sie ein bestimmtes Objekt ansprechen möchten (und somit ein `guid`-Feld einschließen), aber die Daten nicht persistent speichern möchten, setzen Sie das `dontSave`-Feld in Ihrer Nachricht auf `true`.

Alle persistenten Nachrichten werden im Raumzustand gespeichert und an Benutzer gesendet, die sich später verbinden. Nicht-persistente Nachrichten werden nur an aktuell im Raum befindliche Benutzer gesendet, was nützlich für Effekte (wie das Abspielen eines Soundeffekts) ist, die für Benutzer, die aktuell nicht im Raum sind, keinen Sinn machen. Optional können Sie ein `deleteOnDisconnect`-Feld in Ihre Nachricht aufnehmen, um diese spezielle Nachricht zu löschen, wenn sich der Benutzer trennt.

```ts
// Diese Nachricht wird an alle aktuell im Raum befindlichen Benutzer gesendet,
// UND an Benutzer, die später dem Raum beitreten.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue" });

// Diese Nachricht wird an alle aktuell im Raum befindlichen Benutzer gesendet,
// aber NICHT an Benutzer gesendet, die später dem Raum beitreten.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", dontSave: true });

// Diese Nachricht wird an alle aktuell im Raum befindlichen Benutzer gesendet,
// aber NICHT an Benutzer gesendet, die später dem Raum beitreten.
this.context.connection.send("my-message", { myData: "myValue" });

// Diese Nachricht wird an alle aktuell im Raum befindlichen Benutzer gesendet,
// UND an Benutzer, die später dem Raum beitreten,
// aber wird aus dem Raumzustand gelöscht, wenn sich der Benutzer trennt.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", deleteOnDisconnect: true });
```

Um den Zustand für eine bestimmte `guid` aus dem Backend-Speicher zu löschen, setzen Sie den Nachrichtenschlüssel auf `delete-state` und zielen Sie mit dessen `guid` auf ein bestimmtes Objekt: `{ guid: "guid_to_delete" } `.

```ts
this.context.connection.send("delete-state", { guid: "guid_to_delete" });
```

### Verwendung von Debug-Flags zum Verständnis von Netzwerknachrichten

Es gibt mehrere Debug-Flags, die verwendet werden können, um tiefer in die Netzwerknachrichten einzutauchen.
Diese können an die Seiten-URL angehängt werden, z.B. `https://localhost:3000/?debugnet`.

| Flag          | Beschreibung                                                                       |
| :------------ | :--------------------------------------------------------------------------------- |
| `?debugnet`   | Protokolliert alle eingehenden und ausgehenden Netzwerknachrichten in der Konsole  |
| `?debugowner` | Protokolliert alle Besitzanfragen und -änderungen in der Konsole                 |
| `?debugnetbin`| Protokolliert zusätzliche Informationen für eingehende und ausgehende Binärnachrichten |

## Netzwerk-Lebenszyklusereignisse

Die folgenden Ereignisse stehen Ihnen zum Abhören in Ihren Komponenten zur Verfügung. Sie beschreiben allgemeine Netzwerkereignisse, auf die Sie in Ihren Komponenten reagieren möchten, z.B. wenn Sie selbst oder ein anderer Benutzer einem Raum beitritt oder ihn verlässt.

```ts
// Abhören des Ereignisses, wenn *Sie* einem vernetzten Raum beigetreten sind
this.context.beginListen(RoomEvents.JoinedRoom, ({room, viewId, allowEditing, inRoom}) => { ... });

// Abhören des Ereignisses, wenn *Sie* einen vernetzten Raum verlassen haben
this.context.beginListen(RoomEvents.LeftRoom, ({room}) => { ... });

// Abhören des Ereignisses, wenn *ein anderer Benutzer* Ihrem vernetzten Raum beigetreten ist
this.context.beginListen(RoomEvents.UserJoinedRoom, ({userId}) => { ... });

// Abhören des Ereignisses, wenn *ein anderer Benutzer* Ihren vernetzten Raum verlassen hat
this.context.beginListen(RoomEvents.UserLeftRoom, ({userId}) => { ... });

// Dieses Ereignis wird empfangen, nachdem der gesamte aktuelle Raumzustand an den Client gesendet wurde
this.context.beginListen(RoomEvents.RoomStateSent, () => { ... });
```

- [Alle Raumereignisse in der API-Dokumentation ansehen](https://engine.needle.tools/docs/api/latest/RoomEvents)
- [Alle Besitzereignisse in der API-Dokumentation ansehen](https://engine.needle.tools/docs/api/latest/OwnershipEvent)
- [Alle Verbindungsereignisse in der API-Dokumentation ansehen](https://engine.needle.tools/docs/api/latest/ConnectionEvents)

## Verwendung der Needle Networking Server

Standardmäßig verbinden sich vernetzte Needle-Szenen mit der von Needle verwalteten und bereitgestellten Cloud-Infrastruktur. Es ist keine zusätzliche Einrichtung erforderlich, und derzeit fallen keine zusätzlichen Kosten für die Nutzung dieses Dienstes an.

Typischerweise funktioniert dies gut für etwa 15-20 Benutzer im selben Raum. Sobald Ihr Projekt reifer wird, können Sie auf eine größere/bessere/stärkere Netzwerklösung umsteigen, indem Sie Ihren eigenen Netzwerkserver hosten.

## Hosten Ihres eigenen Netzwerkservers

Möglicherweise möchten Sie Ihren eigenen Netzwerkserver für größere Bereitstellungen hosten oder mehr Kontrolle über die Netzwerkinfrastruktur und -implementierung haben.

Unser Netzwerkserver ist auf NPM als node.js-Paket verfügbar: [eigenes Netzwerkpaket](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking). Das Paket enthält vorkonfigurierte Integrationen für die beliebten Web-Frameworks [Fastify](https://www.npmjs.com/package/fastify) und [Express](https://www.npmjs.com/package/express) und kann auch in andere Node.js-Server-Frameworks integriert werden.

::: tip Für schnelle Experimente: Remix auf Glitch
Sie können einen einfachen Netzwerkserver, der auf Glitch läuft, von dieser Seite remixen: [needle-networking.glitch.me](https://needle-networking.glitch.me/), indem Sie auf die Schaltfläche unten rechts klicken.

Die Standard-Glitch-Serverinstanz ist klein und kann nur eine begrenzte Anzahl von Benutzern verarbeiten. Wenn Sie erwarten, dass mehr als 15-20 Personen gleichzeitig in Ihrer Szene sind, sollten Sie erwägen, Ihren Netzwerkserver an anderer Stelle zu hosten (z.B. auf Google Cloud oder AWS).
:::

::::code-group
:::code-group-item Fastify
```js
import networking from "@needle-tools/needle-networking";
networking.startServerFastify(fastifyApp, { endpoint: "/socket" });
```
:::
:::code-group-item Express
```js
import networking from "@needle-tools/needle-networking";
networking.startServerExpress(expressApp, { endpoint: "/socket" });
```
:::
:::code-group-item Benutzerdefinierte Integration
```js
import { init, onConnection } from "@needle-tools/networking";

// Fügen Sie hier Ihre frameworkspezifische Websocket-Implementierung hinzu.
// Die Implementierungen für fastify und express finden Sie in server.js als Referenz.
class WebsocketConnector {
    constructor(frameworkWebsocket) {
        // Ihre Implementierung.
    }
    on(event, callback) {
        // Ihre Implementierung. Wenn eine Nachricht in der Websocket-Verbindung empfangen wird, rufen Sie die Callback-Funktion auf.
        // 'event' kann 'message' oder 'close' sein.
    }
    send(key, value) {
        // Ihre Implementierung. Leiten Sie die Nachricht an die Websocket-Verbindung weiter.
    }
}
const options = { endpoint: "/socket" };
init(options);
yourFramework.createWebsocketRoute(options.endpoint, frameworkWebsocket => {
    onConnection(new WebsocketConnector(frameworkWebsocket));
});
```
:::
::::

::: tip Beispiel auf Glitch.com
Den Code finden Sie auf [glitch.com/edit/#!/needle-networking?path=server.js] für ein Beispiel, wie man Needle Networking in einen Express-Server integriert.
:::

### Konfiguration

Die folgenden Optionen sind verfügbar:

| Option                            | Beschreibung                                                                                                                                                                                                                            |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options.endpoint` *string*       | Optional. Relativer Server-Endpunkt. Zum Beispiel startet `/socket` den Websocket-Endpunkt auf `ihrserver/socket`. Standard ist `/`.                                                                                                   |
| `options.maxUsers` *number*       | Maximale Anzahl gleichzeitiger Benutzer auf einem Server. Standard ist `50`.                                                                                                                                                            |
| `options.defaultUserTimeout` *number* | Zeit in Sekunden, nach der ein Benutzer als getrennt betrachtet wird. Standard ist `30`.                                                                                                                                             |
| `process.env.VIEW_ONLY_SALT` *string* | Salt-Wert, der zur Generierung von Nur-Ansicht-Raum-IDs aus regulären Raum-IDs verwendet wird. Standard ist ein vordefinierter Salt-Wert.                                                                                             |
| `process.env.NEEDLE_NETWORKING_S3_*` *string* | Aktiviert die S3-Speicherung. Siehe unten für die vollständige Liste der Umgebungsvariablen, die Sie dafür setzen müssen. Wenn nicht gesetzt, wird der Standardspeicher verwendet (JSON-Dateien auf der Festplatte).               |

Der Netzwerkserver verwaltet automatisch das Verbinden und Trennen von Benutzern, das Empfangen und Senden von Nachrichten und das Speichern des Raumzustands.

Benutzerdefinierte Netzwerkserver können überall bereitgestellt werden, z.B. auf Google Cloud. Weitere Anweisungen finden Sie in diesem Repository: [Lokaler Needle Networking Server](https://fwd.needle.tools/needle-engine/local-networking-repository)

::: tip Unterschiedliche Serverstandorte für lokale und gehostete Entwicklung
Wenn Sie an benutzerdefiniertem Netzwerkcode arbeiten, möchten Sie möglicherweise unterschiedliche Serverstandorte für die lokale Entwicklung und die gehostete App verwenden. Sie können individuelle Server-URLs in der `Networking`-Komponente festlegen:

![Needle Engine Networking component with networking server hosted elswhere](/imgs/networking_absolute.webp)
:::

#### Zustandspeicherung

Der Netzwerkzustand wird standardmäßig als JSON-Dateien auf der Festplatte des Servers im Verzeichnis `/.data` gespeichert.
Jeder Raum hat seine eigene Datei, und der Zustand wird beim Beitritt zu einem Raum an verbindende Clients gesendet.

Optional kann der Netzwerkzustand bei einem S3-kompatiblen Speicheranbieter gespeichert werden. Verwenden Sie die folgenden Umgebungsvariablen, um die S3-Speicherung zu aktivieren:

```bash
NEEDLE_NETWORKING_S3_ENDPOINT=
NEEDLE_NETWORKING_S3_REGION=
NEEDLE_NETWORKING_S3_BUCKET=
NEEDLE_NETWORKING_S3_ACCESS_KEY_ID=
NEEDLE_NETWORKING_S3_ACCESS_KEY=
NEEDLE_NETWORKING_S3_PREFIX= # all state saved in the bucket will be prefixed with this string. This can be a path e.g. `my_state/` or a unique id `server_123_`
```

## Lokaler Netzwerkserver

Für Test- und Entwicklungszwecke können Sie das Needle Engine Netzwerkpaket auf einem lokalen Server ausführen. Wir haben ein Repository vorbereitet, das für das Hosting des Websocket-Pakets eingerichtet ist, um Ihnen dies zu erleichtern.

1.  Laden Sie das Beispiel für den lokalen Server von [github.com/needle-tools/networking-local](https://fwd.needle.tools/needle-engine/local-networking-repository) herunter.
2.  Befolgen Sie die Anweisungen in der README, um den Server einzurichten. Der Server läuft standardmäßig auf `wss://localhost:9001/socket`.
3.  Fügen Sie die `Networking`-Komponente zu Ihrer Szene hinzu.
4.  Fügen Sie die lokale Serveradresse in das Feld `Localhost` der `Networking`-Komponente ein.

## Erweitert: Anpassen der WebRTC-Einstellungen für peer.js

Die Needle Engine-Komponenten `Screencapture` (Bildschirmfreigabe) und `VoIP` (Sprachkommunikation) verwenden [peer.js](https://peerjs.com/) für die Vernetzung von Audio und Video. Peer.js verwendet unter der Haube WebRTC.

Needle Engine verwendet vernünftige Standardeinstellungen für peerjs. Wenn Sie diese Standardeinstellungen ändern möchten, können Sie
```ts
setPeerOptions(opts: PeerjsOptions);
```
mit Ihren benutzerdefinierten Einstellungen aufrufen. Dies kann verwendet werden, um den Hosting-Anbieter für ICE/STUN/TURN-Server zu ändern, z.B. wenn Sie Ihre eigenen WebRTC-Server verwenden.

## Erweitert: Server- und Client-Nachrichtenformate

::: warning Nur zu Informationszwecken. Verwenden Sie stattdessen die von Needle Engine bereitgestellten APIs.
Typischerweise müssen Sie nicht direkt mit diesen Nachrichtenformaten interagieren, da die Low-Level-Networking-API das Parsen von Nachrichten und die Bereitstellung der korrekten Typen bereits handhabt. Die Informationen hier sind für fortgeschrittene Benutzer gedacht, die die zugrunde liegenden Nachrichtenformate verstehen oder eigene Netzwerklösungen implementieren möchten.
:::

Nachrichten werden im JSON-Format gesendet. Sie haben immer ein Feld `key`, das den Nachrichtentyp beschreibt, und ein Feld `data`, das die Nutzlast der Nachricht enthält. Das `data`-Feld kann jedes JSON-serialisierbare Objekt sein.

### Integrierte Raumereignisse

::::code-group
:::code-group-item Beitritt
```json
// An den Server gesendet, um einem Raum beizutreten.
{
    "key": "join-room",
    "data": {
        "room": string,
        "viewOnly": boolean,
    }
}
```
:::
:::code-group-item Verlassen
```json
// An den Server gesendet, um einen Raum zu verlassen.
{
    "key": "leave-room",
    "data": {
        "room": string
    }
}
```
:::
:::code-group-item Raum beigetreten
```json
// An den Client gesendet, wenn der lokale Benutzer einem Raum beigetreten ist.
// Type: JoinedRoomResponse
{
    "key": "joined-room",
    "room": string,
    "viewId": string,
    "allowEditing": boolean,
    "inRoom": string[] // connection IDs
}
```
:::
:::code-group-item Raum verlassen
```json
// An den Client gesendet, wenn der lokale Benutzer einen Raum verlassen hat.
// Type: LeftRoomResponse
{
    "key": "left-room",
    "room": string
}
```
:::
:::code-group-item Benutzer Raum beigetreten
```json
// An den Client gesendet, wenn ein beliebiger Benutzer einem Raum beigetreten ist.
// Type: UserJoinedOrLeftRoomModel
{
    "key": "user-joined-room",
    "data": {
        "userId": string // connection ID
    }
}
```
:::
:::code-group-item Benutzer Raum verlassen
```json
// An den Client gesendet, wenn ein beliebiger Benutzer einen Raum verlassen hat.
// Type: UserJoinedOrLeftRoomModel
{
    "key": "user-left-room",
    "data": {
        "userId": string // connection ID
    }
}
````
:::
:::code-group-item Raumzustand gesendet
```json
// An den Client gesendet, nachdem der vollständige Raumzustand gesendet wurde.
{
    "key": "room-state-sent",
    "room": string // room name
}
```
:::
::::

### Integrierte Utility-Ereignisse

::::code-group
:::code-group-item Verbindungsinformationen
```json
// An den Client gesendet, wenn die Verbindung hergestellt ist.
{
    "key": "connection-start-info",
    "data": {
        "id": string // connection ID
    }
}
```
:::
:::code-group-item syncInstantiate
```json
// Wird von der syncInstantiate()-API verwendet, um eine neue Instanz eines Assets zu erstellen.
// Type: NewInstanceModel
{
    "key": "new-instance-created",
    "data": {
        "guid": string,
        "originalGuid": string,
        "seed": number | undefined,
        "visible": boolean | undefined,
        "dontSave": boolean | undefined,

        "parent": string | undefined,
        "position": { x: number, y: number, z: number } | undefined,
        "rotation": { x: number, y: number, z: number, w: number } | undefined,
        "scale": { x: number, y: number, z: number } | undefined,

        "deleteStateOnDisconnect": boolean | undefined
    }
```
:::
:::code-group-item syncDestroy
```json
// Wird von der syncDestroy()-API verwendet, um eine Instanz eines Assets zu zerstören.
// Type: DestroyInstanceModel
{
    "key": "instance-destroyed",
    "data": {
        "guid": string,
        "dontSave": boolean | undefined
    }
}
```
:::
:::code-group-item Ping
```json
// Alle paar Sekunden an den Server gesendet, um die Verbindung aufrechtzuerhalten.
{
    "key": "ping",
    "data": {}
}
```
:::
:::code-group-item Pong
```json
// Vom Server als Antwort auf einen Ping gesendet.
{
    "key": "pong",
    "data": {}
}
```
:::
:::code-group-item Zustand löschen
```json
// An den Server gesendet, um den Zustand für eine bestimmte guid zu löschen.
{
    "key": "delete-state",
    "data": {
        "guid": <string>
    }
}
```
:::
:::code-group-item Gesamten Zustand löschen
```json
// An den Server gesendet, um den GESAMTEN aktuellen Raumzustand zu löschen.
{
    "key": "delete-all-state",
    "data": {}
}
```
::::

### Integrierte Besitzereignisse

::::code-group
:::code-group-item Besitzanfrage
```json
{
    "key":
      "request-has-owner" |
      "request-ownership" |
      "remove-ownership",
    "data": {
        "guid": string
    }
}
```
:::
:::code-group-item Besitzantwort
// Typ: OwnershipResponse
```json
{
    "key":
      "response-has-owner",
    "data": {
        "guid": string,
        "value": boolean
    }
}
```
:::
::: code-group-item Besitz-Broadcast-Antwort
```json
{
    "key":
      "gained-ownership" |
      "lost-ownership" |
      "gained-ownership-broadcast" |
      "lost-ownership-broadcast",
    "data": {
        "guid": string,
        "owner": string
    }
}
```
:::
::::

### Integrierte Flatbuffer-Schemata

Flatbuffer-Nachrichten werden direkt als Binärnachrichten gesendet.

::::code-group
:::code-group-item SyncedTransform ('STRS')
```cs
<!-- SAMPLE node_modules/@needle-tools/engine/src/engine-schemes/transforms.fbs -->
```
:::
:::code-group-item SyncedCamera ('SCAM')
```cs
<!-- SAMPLE node_modules/@needle-tools/engine/src/engine-schemes/syncedCamera.fbs -->
```
:::
:::code-group-item Vec2|3|4
```cs
<!-- SAMPLE node_modules/@needle-tools/engine/src/engine-schemes/vec.fbs -->
```
:::
::::

## Erweitert: Binärnachrichten im Flatbuffer-Format

JSON-Nachrichten sind einfach zu verwenden und zu verstehen, benötigen aber typischerweise mehr Speicher und Bandbreite. Für große Datenmengen oder beim Senden schneller Updates sind Binärnachrichten schneller und effizienter. Sie können Flatbuffers-Nachrichten in Needle Engine für Fälle verwenden, in denen dies erforderlich ist. Die Verwendung von Flatbuffers erfordert zusätzliche Einrichtungsschritte wie das Definieren und Kompilieren eines Nachrichtenschemas und ist schwieriger zu debuggen, da Sie mit Binärnachrichten arbeiten.

Beachten Sie, dass beim Senden und Empfangen von Flatbuffer-Nachrichten kein `key`-Feld vorhanden ist – der Nachrichtentyp ist Teil des Flatbuffer-Schemas. Was Sie über die Websocket-Verbindung senden und empfangen, ist ein einziger Binärpuffer.

Senden einer Binärnachricht an alle Benutzer im selben Raum:
```ts
this.context.connection.sendBinary(byteArray: Uint8Array);
```

Abonnieren von Binärnachrichten im Flatbuffer-Format:
```ts
this.context.connection.beginListenBinary(identifier:string, callback:(data : ByteBuffer) => void);
```

Abbestellen von Binärnachrichten:
```ts
this.context.connection.stopListenBinary(identifier:string);
```

#### Flatbuffers Beispielcode

Bevor Sie Flatbuffer-Nachrichten senden und empfangen können, müssen Sie ein Schema definieren und in TypeScript kompilieren. Anschließend registrieren Sie das Schema beim Netzwerksystem und verwenden die generierten Schema-Methoden zum Erstellen und Parsen von Nachrichten.

- [Integrierte Flatbuffer-Schemata in Needle Engine](#built-in-flatbuffer-schemas)
- [Generieren eines Schemas](https://google.github.io/flatbuffers/flatbuffers_guide_writing_schema.html)
- [Verwenden des Schema-Compilers](https://google.github.io/flatbuffers/flatbuffers_guide_using_schema_compiler.html)
- [Flatbuffers in Typescript](https://google.github.io/flatbuffers/flatbuffers_guide_use_typescript.html)

::::code-group
:::code-group-item Ein Schema registrieren
```ts
// Registrieren eines neuen Flatbuffer-Schemas beim Netzwerksystem
import { registerBinaryType } from '@needle-tools/engine';
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

registerBinaryType(MySchemaIdentifier, MyDataModel.getRootAsSyncedTransformModel);
```
:::
:::code-group-item Nachrichten senden
```ts
// Vorbereiten der Daten zum Senden durch Erstellen einer Flatbuffer-Nachricht:
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";
const builder = new flatbuffers.Builder();

// Erstellen einer Flatbuffer-Nachricht
function createMyCustomModel(somePayload: string): Uint8Array {
    builder.clear();
    MyDataModel.startMyDataModel(builder);    
    const guidObj = builder.createString(guid);
    MyDataModel.addSomePayload(builder, guidObj);
    const res = MyDataModel.endMyDataModel(builder);
    builder.finish(res, MySchemaIdentifier);
    return builder.asUint8Array();
}

// Daten senden
function sendData() {
    const data = createMyCustomModel("your-payload", this, true);
    this.context.connection.sendBinary(data);
}
```
:::
:::code-group-item Nachrichten empfangen
```ts
// Abonnieren des Empfangs dieses spezifischen Nachrichtentyps:
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

this.context.connection.beginListenBinary(MySchemaIdentifier, (data) => {
    const model = MyDataModel.getRootAsMyDataModel(data);
    console.log("Binäre Nachricht empfangen", model, model.somePayload());
});
```
:::
::::

::: tip Benutzerdefinierte Flatbuffer-Nachrichten und Persistenz
Derzeit können benutzerdefinierte Binärnachrichten nicht auf dem Netzwerkserver gespeichert werden. Ändern Sie den Netzwerkserver und fügen Sie Ihre benutzerdefinierten Flatbuffer-Schemata hinzu, um sicherzustellen, dass die guid-Eigenschaft verarbeitet werden kann.
:::

## Zusammenfassung

Needle Engine macht das komplexe Thema der Vernetzung zugänglich und einfach zu bedienen. Sie können mit der automatischen Vernetzung Ihrer Komponenten mit nur wenigen Codezeilen beginnen und tiefer in die manuelle Vernetzung eintauchen, wenn Sie mehr Kontrolle benötigen.

Seite automatisch mit KI übersetzt