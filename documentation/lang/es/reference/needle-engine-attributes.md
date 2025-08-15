---
title: Configuración de <needle-engine>
---

## Atributos del componente web de Needle Engine

Needle Engine está disponible como un componente web: `<needle-engine>`. Este componente se puede usar para cargar y mostrar escenas 3D, modelos y más en un navegador web. Viene con un conjunto de atributos que permiten configurar su comportamiento, aspecto y sensación. Todas estas configuraciones pueden ser sobrescritas por código, pero los atributos son una forma conveniente de configurarlas en HTML.

::: tip El componente web está en `index.html`
Ya sea creando un proyecto a través de Unity o Blender, o directamente en código, puedes usar y ajustar el componente web `<needle-engine>`. Normalmente, lo encontrarás en el archivo `index.html` de tu proyecto web.
:::

La tabla a continuación muestra una lista de los atributos disponibles y sus descripciones.

| Atributo | Descripción |
| --- | --- |
| **Carga** | |
| `src` | Ruta a uno o varios archivos glTF o glb.<br/>Los tipos compatibles son `string`, `string[]` o un array convertido a cadena (separado por `,`) |
| `dracoDecoderPath` | URL al decodificador draco, p. ej. `./include/draco/` para usar el decodificador Draco local |
| `dracoDecoderType` | Tipo de decodificador draco. Las opciones son `wasm` o `js`. Consulta la [documentación de three.js](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) |
| `ktx2DecoderPath` | URL al decodificador KTX2, p. ej. `./include/ktx2/` para usar el decodificador KTX2 local |
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
| `loading-background` | **PRO** — Predeterminado: `transparent`. Cambia el color de fondo de la carga (p. ej. `#dd5500`) |
| `loading-logo-src` | **PRO** — Cambia la imagen del logo de la carga (p. ej. `https://yourdomain.com/logo.png` o `/logo.png`) |
| `hide-loading-overlay` | **PRO** — No mostrar la superposición de carga |
| **Interno** | |
| `hash` | Se usa internamente, se añade a los archivos que se cargan para forzar una actualización (p. ej., cuando el navegador ha almacenado en caché un archivo glb). No debe editarse manualmente. |

**Aviso de actualización**:
- Atributos eliminados en Needle Engine 4.5.0: `loading-style`, `loading-background-color`, `loading-text-color`, `primary-color`, `secondary-color`

# Ejemplos

```html
<!-- Configurando la ruta a un archivo glb personalizado para cargar -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- Sobrescribiendo la ubicación del decodificador draco -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="./include/draco/"></needle-engine>
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