---
title: Configuración de <needle-engine>
---

El componente web `<needle-engine>` viene con una buena colección de atributos incorporados que se pueden usar para modificar la apariencia de la escena cargada sin necesidad de añadir o editar la escena three.js directamente.
La siguiente tabla muestra una lista de los más importantes:

| Atributo | Descripción |
| --- | --- |
| **Carga** | |
| `src` | Ruta a uno o varios archivos glTF o glb. Los tipos compatibles son `string`, `string[]` o un array convertido a cadena (separado por `,`) |
| `dracoDecoderPath` | URL al decodificador draco |
| `dracoDecoderType` | Tipo de decodificador draco. Las opciones son `wasm` o `js`. Consulte la [documentación de three.js](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) |
| `ktx2DecoderPath` | URL al decodificador KTX2 |
| **Renderizado** | |
| `background-color` | opcional, color hexadecimal que se usará como color de fondo. Ejemplos: `rgb(255, 200, 100)`, `#dddd00` |
| `background-image` | opcional, URL a una imagen de skybox (imagen de fondo) o una cadena predefinida: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `background-blurriness` | opcional, valor de desenfoque entre 0 (sin desenfoque) y 1 (desenfoque máximo) para la `background-image`. Ejemplo: `background-blurriness="0.5"` |
| `environment-image` | opcional, URL a una imagen de entorno (luz de entorno) o una cadena predefinida: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `contactshadows` | opcional, renderiza sombras de contacto |
| `tone-mapping` | opcional, los valores soportados son `none`, `linear`, `neutral`, `agx` |
| `tone-mapping-exposure` | número opcional, p. ej., aumenta la exposición con `tone-mapping-exposure="1.5"`, requiere que `tone-mapping` esté establecido |
| **Interacción** | |
| `autoplay` | añade o establece a `true` para reproducir animaciones automáticamente, p. ej. `<needle-engine autoplay` |
| `camera-controls` | añade o establece a `true` para añadir automáticamente OrbitControls si no se encuentran controles de cámara en la escena |
| `auto-rotate` | añade para habilitar el giro automático (solo se usa con `camera-controls`) |
| **Eventos** | |
| `loadstart` | Nombre de la función a llamar cuando comienza la carga. Ten en cuenta que los argumentos son `(ctx:Context, evt:Event)`. Puedes llamar a `evt.preventDefault()` para ocultar la superposición de carga predeterminada |
| `progress` | Nombre de la función a llamar cuando la carga se actualiza. `onProgress(ctx:Context, evt: {detail: {context:Context, name:string, index:number, count:number, totalProgress01:number}) { ... }` |
| `loadfinished` | Nombre de la función a llamar cuando finaliza la carga |
| **Visualización de Carga** | *Opciones disponibles para cambiar la apariencia de la visualización de carga de Needle Engine. Utiliza `?debugloadingrendering` para facilitar la edición* |
| `loading-style` | Las opciones son `light` o `dark` |
| `loading-background-color` | **PRO** — Cambia el color de fondo de la carga (p. ej. `=#dd5500`) |
| `loading-text-color` | **PRO** — Cambia el color del texto de la carga |
| `loading-logo-src` | **PRO** — Cambia la imagen del logo de la carga |
| `primary-color` | **PRO** — Cambia el color primario de la carga |
| `secondary-color` | **PRO** — Cambia el color secundario de la carga |
| `hide-loading-overlay` | **PRO** — No muestra la superposición de carga, añadido en Needle Engine > 3.17.1 |
| **Interno** | |
| `hash` | Se usa internamente, se añade a los archivos que se cargan para forzar una actualización (p. ej., cuando el navegador ha almacenado en caché un archivo glb). No debe editarse manualmente. |


# Ejemplos

```html
<!-- Configurando la ruta a un archivo glb personalizado para cargar -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- Sobrescribiendo la ubicación del decodificador draco -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="path/to/draco/folder"></needle-engine>
```

Configurando imágenes de entorno, reproduciendo animación y controles de cámara automáticos. [Ver en vivo en stackblitz](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)
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

Recibiendo un evento cuando el contexto de needle-engine ha terminado de cargar:
```html
<needle-engine loadfinished="onLoadFinished"> </needle-engine>
<script>
    function onLoadFinished() {
        console.log("Needle Engine ha terminado de cargar");
    }
</script>
```

### Estilo de Carga Personalizado (PRO)

Puedes modificar fácilmente la apariencia de Needle Engine configurando los atributos adecuados en el componente web `<needle-engine>`. Consulta la tabla anterior para obtener más detalles.

![custom loading](/imgs/custom-loading-style.webp)
[Ver código en github](https://github.com/needle-engine/vite-template/blob/loading-style/custom/index.html)

Página traducida automáticamente usando IA.