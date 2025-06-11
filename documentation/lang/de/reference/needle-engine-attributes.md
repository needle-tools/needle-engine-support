---
title: <needle-engine> Konfiguration
---

Die `<needle-engine>` web-component verfügt über eine nützliche Sammlung integrierter attributes, die verwendet werden können, um das Aussehen und Verhalten der geladenen scene zu ändern, ohne die three.js scene direkt hinzufügen oder bearbeiten zu müssen.
Die folgende Tabelle zeigt eine Liste der wichtigsten attributes:

| Attribut | Beschreibung |
| --- | --- |
| **Laden** | |
| `src` | Pfad zu einer oder mehreren glTF- oder glb-Dateien.<br/>Unterstützte Typen sind `string`, `string[]` oder ein stringifiziertes array (`,` getrennt) |
| `dracoDecoderPath` | URL zum draco decoder, z.B. `./include/draco/` zur Verwendung des lokalen Draco decoders |
| `dracoDecoderType` | draco decoder type. Optionen sind `wasm` oder `js`. Siehe [three.js documentation](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) |
| `ktx2DecoderPath` | URL zum KTX2 decoder, z.B. `./include/ktx2/` zur Verwendung des lokalen KTX2 decoders |
| **Rendern** | |
| `background-color` | optional, hex color zur Verwendung als Hintergrundfarbe. Beispiele: `rgb(255, 200, 100)`, `#dddd00` |
| `background-image` | optional, URL zu einem skybox image (Hintergrundbild) oder ein preset string: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `background-blurriness` | optional, bluriness Wert zwischen 0 (keine Unschärfe) und 1 (maximale Unschärfe) für das `background-image`. Beispiel: `background-blurriness="0.5"` |
| `environment-image` | optional, URL zu einem environment image (environment light) oder ein preset string: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `contactshadows` | optional, rendert contact shadows |
| `tone-mapping` | optional, unterstützte Werte sind `none`, `linear`, `neutral`, `agx` |
| `tone-mapping-exposure` | optionale Zahl, z.B. Erhöhung der exposure mit `tone-mapping-exposure="1.5"`, erfordert die Einstellung von `tone-mapping` |
| **Interaktion** | |
| `autoplay` | hinzufügen oder auf `true` setzen, um animations automatisch abzuspielen, z.B. `<needle-engine autoplay` |
| `camera-controls` | hinzufügen oder auf `true` setzen, um automatisch OrbitControls hinzuzufügen, wenn keine camera controls in der scene gefunden werden |
| `auto-rotate` | hinzufügen, um auto-rotate zu aktivieren (wird nur mit `camera-controls` verwendet) |
| **Ereignisse** | |
| `loadstart` | Name der function, die beim Laden aufgerufen werden soll. Beachten Sie, dass die arguments `(ctx:Context, evt:Event)` sind. Sie können `evt.preventDefault()` aufrufen, um das Standard-loading overlay auszublenden |
| `progress` | Name der function, die bei Ladeupdates aufgerufen werden soll. `onProgress(ctx:Context, evt: {detail: {context:Context, name:string, index:number, count:number, totalProgress01:number}) { ... }` |
| `loadfinished` | Name der function, die aufgerufen werden soll, wenn das Laden abgeschlossen ist |
| **Ladeanzeige** | *Verfügbare Optionen zur Änderung des Aussehens der Needle Engine loading display. Verwenden Sie `?debugloadingrendering` für einfacheres Bearbeiten* |
| `loading-background` | **PRO** — Standard: `transparent`. Ändert die loading background color (z.B. `#dd5500`) |
| `loading-logo-src` | **PRO** — Ändert das loading logo image (z.B. `https://yourdomain.com/logo.png` oder `/logo.png`) |
| `hide-loading-overlay` | **PRO** — Zeigt das loading overlay nicht an |
| **Intern** | |
| `hash` | Wird intern verwendet, wird an die geladenen Dateien angehängt, um ein Update zu erzwingen (z.B. wenn der Browser eine glb-Datei zwischengespeichert hat). Sollte nicht manuell bearbeitet werden. |

**Hinweis zum Upgrade**:
- Entfernte attributes in Needle Engine 4.5.0 `loading-style`, `loading-background-color`, `loading-text-color`, `primary-color`, `secondary-color`

# Beispiele

```html
<!-- Setting the path to a custom glb to be loaded -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- Overriding where the draco decoder is located -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="./include/draco/"></needle-engine>
```

Setzen von environment images, Abspielen von animation und automatische camera controls. [See it live on stackblitz](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)
```html
<needle-engine
      camera-controls
      auto-rotate
      autoplay
      skybox-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      environment-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf"
      >
      </needle-engine>
```

Empfang eines events, wenn der needle-engine context das Laden abgeschlossen hat:
```html
<needle-engine loadfinished="onLoadFinished"> </needle-engine>
<script>
    function onLoadFinished() {
        console.log("Needle Engine has finished loading");
    }
</script>
```

### Benutzerdefinierte Ladeanzeige (PRO)

Sie können das Aussehen von Needle Engine einfach ändern, indem Sie die entsprechenden attributes für die `<needle-engine>` web component festlegen. Details finden Sie in der obigen Tabelle.

![custom loading](/imgs/custom-loading-style.webp)
[See code on github](https://github.com/needle-engine/vite-template/blob/loading-style/custom/index.html)


Seite automatisch mit AI übersetzt