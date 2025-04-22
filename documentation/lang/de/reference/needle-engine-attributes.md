---
title: <needle-engine> Konfiguration
---

Die `<needle-engine>` web-component verfügt über eine schöne Sammlung integrierter attribute, die verwendet werden können, um das Erscheinungsbild der geladenen scene zu ändern, ohne die three.js scene direkt hinzufügen oder bearbeiten zu müssen.
Die folgende Tabelle zeigt eine Liste der wichtigsten:

| Attribut | Beschreibung |
| --- | --- |
| **Laden** | |
| `src` | Pfad zu einer oder mehreren glTF- oder glb-Dateien.<br/>Unterstützte Typen sind `string`, `string[]` oder ein stringifiziertes array (durch `,` getrennt) |
| `dracoDecoderPath` | URL zum draco decoder |
| `dracoDecoderType` | draco decoder type. Optionen sind `wasm` oder `js`. Siehe [three.js documentation](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) |
| `ktx2DecoderPath` | URL zum KTX2 decoder |
| **Rendern** | |
| `background-color` | optional, hex color zur Verwendung als Hintergrundfarbe. Beispiele: `rgb(255, 200, 100)`, `#dddd00` |
| `background-image` | optional, URL zu einem skybox Bild (Hintergrundbild) oder ein preset string: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
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
| `loading-style` | Optionen sind `light` oder `dark` |
| `loading-background-color` | **PRO** – Ändert die loading background color (z.B. `=#dd5500`) |
| `loading-text-color` | **PRO** – Ändert die loading text color |
| `loading-logo-src` | **PRO** – Ändert das loading logo image |
| `primary-color` | **PRO** – Ändert die primary loading color |
| `secondary-color` | **PRO** – Ändert die secondary loading color |
| `hide-loading-overlay` | **PRO** – Zeigt das loading overlay nicht an, hinzugefügt in Needle Engine > 3.17.1
| **Intern** | |
| `hash` | Wird intern verwendet, wird an die geladenen Dateien angehängt, um ein Update zu erzwingen (z.B. wenn der Browser eine glb-Datei zwischengespeichert hat). Sollte nicht manuell bearbeitet werden. |

# Beispiele

```html
<!-- Setting the path to a custom glb to be loaded -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- Overriding where the draco decoder is located -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="path/to/draco/folder"></needle-engine>
```

Setting environment images, playing animation and automatic camera controls. [See it live on stackblitz](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)
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

Receiving an event when the needle-engine context has finished loading:
```html
<needle-engine loadfinished="onLoadFinished"> </needle-engine>
<script>
    function onLoadFinished() {
        console.log("Needle Engine has finished loading");
    }
</script>
```

### Benutzerdefinierte Ladeanzeige (PRO)

Sie können das Aussehen von Needle Engine einfach ändern, indem Sie die entsprechenden attribute für die `<needle-engine>` web component festlegen. Details finden Sie in der obigen Tabelle.

![custom loading](/imgs/custom-loading-style.webp)
[See code on github](https://github.com/needle-engine/vite-template/blob/loading-style/custom/index.html)
Page automatically translated using AI