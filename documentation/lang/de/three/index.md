<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <img src="/imgs/logo-webcomponents.png" style="max-height:70px;" title="Web Components Logo" alt="Web Components Logo"/> +
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="three.js Logo" alt="three.js Logo"/>
</div>

# Needle Engine als Web Component

Needle Engine bietet eine einfach zu bedienende Web Component, die verwendet werden kann, um umfassende, interaktive 3D-Szenen direkt in HTML mit nur wenigen Codezeilen anzuzeigen. Es ist dieselbe Web Component, die unsere Integrationen antreibt.

Sobald Sie die Konfigurationsmöglichkeiten der Web Component ausschöpfen, können Sie diese mit benutzerdefinierten Skripten und Components sowie vollem programmatischem Zugriff auf den Scene Graph erweitern.

:::tip Nutzen Sie die Integrationen!
Für komplexe 3D-Szenen und schnelle Iteration empfehlen wir die Verwendung von Needle Engine mit einer unserer Integrationen. Diese bieten einen leistungsstarken Erstellungs-Workflow, einschließlich Live-Vorschau, Hot Reloading und einer fortschrittlichen Build Pipeline mit 3D-Optimierungen.
:::

### Schnellstart
:::: code-group
::: code-group-item index.html
@[code html](@code/basic-webcomponent.html)
:::
::: code-group-item Ergebnis
<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%;
    aspect-ratio: 16/9;
    outline: none;
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>
:::
::::
[Dieses Beispiel auf Stackblitz öffnen](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)



## Installation von npm

Sie können direkt mit Needle Engine arbeiten, ohne eine Integration zu verwenden. Needle Engine verwendet [three.js](https://threejs.org/) als Scene Graph und Rendering Library, sodass alle Funktionalitäten von three.js auch in Needle verfügbar sind.

Sie können Needle Engine von [`npm`](https://www.npmjs.com/package/@needle-tools/engine) installieren, indem Sie Folgendes ausführen:
<br/>
`npm i @needle-tools/engine`

## Installation von needle-engine über ein CDN

Während unsere Standardvorlage [vite](https://vitejs.dev) verwendet, kann Needle Engine auch direkt mit Vanilla Javascript verwendet werden – ohne einen Bundler zu benutzen.

Sie können eine vollständige, prebundled Version von Needle Engine mit nur einer Codezeile zu Ihrer Website hinzufügen. Dies umfasst unsere Core Components, Physics, Particles, Networking, XR und mehr. Verwenden Sie dies, wenn Sie sich nicht sicher sind!

```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js">
</script>
```

Wenn Sie wissen, dass Ihr Projekt keine Physics-Funktionen benötigt, können Sie auch eine kleinere Version von Needle Engine verwenden, ohne die Physics Engine. Dies reduziert die gesamte Downloadgröße.
```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.light.min.js">
</script>
```


Viele Beispiele finden Sie auf [StackBlitz](https://stackblitz.com/@marwie/collections/needle-engine).

## Rapid Prototyping auf StackBlitz

Für schnelle Experimente bieten wir einen praktischen Link zur Erstellung eines neuen, startbereiten Projekts: [engine.needle.tools/new](https://engine.needle.tools/new)
Eine große Sammlung von Beispielen ist auch in unserer [Needle Engine Stackblitz Collection](https://stackblitz.com/@marwie/collections/needle-engine) verfügbar.

## Lokale Entwicklung mit VS Code

Wenn Sie mit Needle Engine ohne Integration arbeiten möchten, sollten Sie wahrscheinlich einen lokalen Server für Ihre Website ausführen. So können Sie das mit Visual Studio Code tun:

1. Öffnen Sie den Ordner mit Ihrer HTML-Datei in Visual Studio Code.
2. Installieren Sie die [LiveServer-Erweiterung](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
3. Aktivieren Sie live-server (es gibt einen Knopf "Go Live" in der Fußzeile von VSCode)
4. Öffnen Sie ``http://localhost:5500/index.html`` in Ihrem Webbrowser, falls es nicht automatisch geöffnet wird.


## three.js und Needle Engine

Da Needle Engine [three.js](https://threejs.org/) als Scene Graph und Rendering Library verwendet, sind alle Funktionalitäten von three.js auch in Needle verfügbar und können von Component Scripts aus verwendet werden. Wir verwenden einen Fork von three.js, der zusätzliche Features und Verbesserungen enthält, insbesondere in Bezug auf WebXR, Animation und USDZ Export.


::: tip
Stellen Sie sicher, dass Sie den Pfad ``<needle-engine src="myScene.glb">`` zu einer bestehenden glb-Datei aktualisieren oder [diese Beispiel-glb herunterladen](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb) und sie in denselben Ordner wie die index.html legen, sie ``myScene.glb`` nennen oder den src-Pfad aktualisieren.
:::

@[code](@code/basic-html.html)


[Auf github ansehen](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla)
Seite automatisch mit KI übersetzt