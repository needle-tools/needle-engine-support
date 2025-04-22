---
title: Debugging
---

## Nützliche Ressourcen für die Arbeit mit glTF

glTF- oder glb-Dateien online inspizieren:
- [gltf.report](https://gltf.report/) - basiert auf three.js
- [modelviewer.dev/editor](https://modelviewer.dev/editor) - basiert auf three.js
- [Khronos glTF Sample Viewer](https://github.khronos.org/glTF-Sample-Viewer-Release/)
- [Babylon Sandbox](https://sandbox.babylonjs.com/)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)

Lokal inspizieren:
- verwenden Sie die [glTF Shell Extension for Windows](https://apps.microsoft.com/store/detail/gltf-shell-extensions/9NPGVJ9N57MV?hl=en-us&gl=US) um zwischen glTF und glb zu konvertieren
- verwenden Sie die [glTF Tools VS Code Extension](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode) um Validierungsfehler und In-Engine-Vorschauen lokal anzuzeigen

## Integrierte URL-Parameter

Debug-Flags können als URL-Abfrageparameter angehängt werden.
Verwenden Sie ``?help`` um eine Liste ALLER verfügbaren Parameter zu erhalten.

Hier sind einige der am häufigsten verwendeten:

- ``help`` druckt alle verfügbaren URL-Parameter in der Konsole
- ``console`` öffnet eine On-Screen-Entwicklerkonsole, nützlich für mobiles Debugging
- ``printGltf`` protokolliert geladene gltf-Dateien in der Konsole
- ``stats`` zeigt das FPS-Modul an und protokolliert die threejs-Renderer-Statistiken alle paar Sekunden
- ``showcolliders`` visualisiert Physik-Collider
- ``gizmos`` aktiviert das Rendern von Gizmos (z.B. bei Verwendung von BoxCollider oder AxesHelper Komponenten)
- und vieles mehr: bitte verwenden Sie ``help`` um alle anzuzeigen

## Debug-Methoden

Needle Engine verfügt auch über einige sehr leistungsstarke und nützliche Debugging-Methoden, die Teil der statischen Klasse `Gizmos` sind. Weitere Informationen finden Sie in der [Scripting-Dokumentation](./scripting.md#gizmos).

## Lokales Testen von Release-Builds
- Zuerst http-server installieren: `npm install -g http-server`
- einen Build erstellen (development oder production)
- den Ordner *dist* mit einem Kommandozeilen-Tool öffnen
- `http-server -g` ausführen | *`-g` aktiviert gzip-Unterstützung*
- optional: wenn Sie WebXR testen möchten, generieren Sie ein [selbstsigniertes SSL-Zertifikat](https://stackoverflow.com/a/35231213), und führen Sie dann `http-server -g -S` aus, um https zu aktivieren (für WebXR erforderlich).

## VSCode

Sie können VSCode an den laufenden lokalen Server anhängen, um Breakpoints zu setzen und Ihren Code zu debuggen. Mehr über [Debugging mit VSCode](https://code.visualstudio.com/docs/editor/debugging) erfahren Sie hier.

Erstellen Sie im Stammverzeichnis Ihres Webprojekts eine Datei launch.json unter `.vscode/launch.json` mit folgendem Inhalt:
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

Wenn Sie den Port geändert haben, auf dem Ihr Server startet, stellen Sie sicher, dass das Feld `url` entsprechend aktualisiert wird.
Sie können Ihren lokalen Server dann direkt aus VSCode starten:

![](/debugging/vscode-start-debugging.webp)

## Mobile

### Android Debugging

Für das **Android**-Debugging können Sie die Chrome Dev Tools an Ihr Gerät anhängen und Logs direkt von Ihrem PC aus einsehen. Sie müssen Ihr Gerät in den Entwicklermodus schalten und es über USB verbinden.

Siehe die offizielle Chrome-Dokumentation [hier](https://developer.chrome.com/docs/devtools/remote-debugging/)
- Stellen Sie sicher, dass der [Entwicklermodus](https://developer.android.com/studio/debug/dev-options) auf Ihrem Telefon aktiviert ist
- Verbinden Sie Ihr Telefon über USB mit Ihrem Computer
- Öffnen Sie diese URL in Ihrem Browser ``chrome://inspect/#devices``
- Erlauben Sie auf Ihrem Mobilgerät die USB-Verbindung zu Ihrem Computer
- Auf Ihrem Computer in Chrome sollten Sie nach einer Weile eine Liste offener Tabs sehen (unter ``chrome://inspect/#devices``)
- Klicken Sie auf ``Inspect`` bei dem Tab, den Sie debuggen möchten

### iOS Debugging

Für einfaches iOS-Debugging fügen Sie den URL-Parameter ``?console`` hinzu, um eine nützliche On-Screen-JavaScript-Konsole zu erhalten.

Wenn Sie einen Mac haben, können Sie sich auch mit Safari verbinden (ähnlich dem obigen Android-Workflow).

Die Verwendung und das Debugging von WebXR unter iOS erfordern die Verwendung eines Drittanbieter-Browsers: [Mozilla WebXR Viewer](https://labs.mozilla.org/projects/webxr-viewer/).

### Quest Debugging

Quest ist lediglich ein Android-Gerät – Schritte finden Sie im Abschnitt [Android Debugging](#android-debugging).

Seite automatisch mit KI übersetzt