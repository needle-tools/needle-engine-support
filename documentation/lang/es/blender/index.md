---
title: Needle Engine para Blender
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <img src="/blender/logo.png" style="max-height:70px;" />
</div>

# Needle Engine para Blender

Needle Engine para Blender te permite crear aplicaciones web altamente interactivas, flexibles y ligeras directamente dentro de Blender. Utiliza las potentes herramientas de Blender para configurar visualmente tus escenas 3D, animar y diseñar.

## Instalar el Add-on de Blender

<ClientOnly>

Asegúrate de tener instalado <a target="_blank" href="https://www.blender.org/download/"><strong>Blender</strong> 4.1 o 4.2</a> y <os-link windows_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi" osx_url="https://nodejs.org/dist/v20.9.0/node-v20.9.0.pkg"><strong>node.js</strong></os-link>.
</ClientOnly>

<NoDownloadYet>
    <needle-button
        event_goal="download_blender"
        event_position="getting_started"
        large
        href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"
        same_tab
        next_url="/docs/blender/"
        >
        <strong>Descargar Needle Engine para Blender</strong>
    </needle-button>
</NoDownloadYet>

1.  En Blender, ve a `Edit > Preferences > Add-ons` y haz clic en la flecha desplegable para encontrar el botón `Install from Disk`.

2.  Selecciona el archivo zip descargado (llamado `needle-blender-plugin-*.zip`) para instalarlo.

3.  Busca "Needle" en la barra de búsqueda de Add-ons y asegúrate de que `Needle Engine Exporter for Blender` esté activado.

![Settings](/blender/settings.webp)

## Empezando

Gracias por usar Needle Engine para Blender.

Con este add-on puedes crear experiencias WebGL y WebXR altamente interactivas y optimizadas dentro de Blender, que se ejecutan utilizando Needle Engine y three.js.

Podrás secuenciar animaciones, mapear luces fácilmente en tus escenas, añadir interactividad o crear tus propios scripts escritos en Typescript o Javascript que se ejecutan en la web.

<video-embed src="/docs/blender/environment-light.mp4" />
*Coincidencia de la configuración de iluminación y entorno entre Blender y Needle Engine. Las luces de entorno HDRI se exportan automáticamente, directamente desde Blender. Una vez que guardas, la página se recarga automáticamente.*

:::tip Proporcionar Feedback

**Tu feedback es invaluable** a la hora de decidir qué características y flujos de trabajo debemos priorizar. Si tienes comentarios para nosotros (buenos o malos), ¡por favor [cuéntanos en el foro](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)!
:::

## Ejemplos para Blender

- [Descargar Ejemplos de Blender](https://engine.needle.tools/downloads/blender/download-samples?utm_source=needle_docs&utm_content=blender)

Primero crea o abre un nuevo archivo .blend que quieras exportar a la web. Abre la ventana Properties, abre la categoría scene. Selecciona un `Project Path` en el panel Needle Engine. Luego haz clic en `Generate Project`. Automáticamente instalará e iniciará el servidor - una vez que haya terminado, tu navegador debería abrirse y la escena three.js se cargará.

![Project panel](/blender/project-panel.webp)

Por defecto, tu escena se re-exportará automáticamente cuando guardes el archivo .blend. Si el servidor local está en ejecución (por ejemplo, haciendo clic en `Run Project`), el sitio web se refrescará automáticamente con tu modelo modificado.

Cuando tu proyecto web ya existe y solo quieres seguir trabajando en el sitio web, haz clic en el botón azul `Run Project` para iniciar el servidor local:
![Project panel](/blender/project-panel-2.webp)

### Descripción general del panel Project
![Project panel](/blender/project-panel-3.webp)

1) La ruta a tu proyecto web. Puedes usar el pequeño botón de carpeta a la derecha para seleccionar una ruta diferente.
2) El botón `Run Project` aparece cuando la ruta del proyecto apunta a un proyecto web válido. Un proyecto web es válido cuando contiene un archivo `package.json`.
3) `Directory` abre el directorio de tu proyecto web (`Project Path`).
4) Este botón re-exporta la escena actual como un archivo glb a tu proyecto web local. Esto también ocurre por defecto al guardar tu archivo .blend.
5) `Code Editor` intenta abrir el espacio de trabajo de vscode en tu proyecto web.
6) Si trabajas con múltiples escenas en un archivo .blend, puedes configurar qué escena es tu escena principal (`Main scene`) y debe ser exportada a la web. Si alguno de tus componentes referencia otra escena, también se exportarán como archivos glb separados. Al hacer clic en el botón "Export", tu escena principal será la que se cargue en el navegador.
7) Utiliza los botones `Build: Development` o `Build: Production` cuando quieras subir tu proyecto web a un servidor. Esto agrupará tu proyecto web y producirá los archivos que puedes subir. Al hacer clic en `Build: Production`, también aplicará optimizaciones a tus texturas (se comprimirán para la web).
8) Abrir la documentación.

## Configuración de Blender

### Gestión de color

Por defecto, el viewport de Blender está configurado en `Filmic` - con esta configuración, tus colores en Blender y en three.js no coincidirán.
Para solucionar esto, ve a la categoría Render de Blender y en el panel ColorManagement selecciona `View Transform`: `Standard`.

![Correct color management settings](/blender/settings-color-management.webp)

## Iluminación de Entorno

Puedes cambiar la iluminación de entorno y el skybox utilizando las opciones de Viewport shading. Asigna un cubemap para usarlo como iluminación o como skybox de fondo. Puedes ajustar la intensidad o el desenfoque para modificar la apariencia a tu gusto.

Nota: Para ver también el cubemap del skybox en el navegador, aumenta la `World Opacity` a 1.

Nota: Alternativamente, puedes habilitar la configuración `Scene World` en la pestaña Viewport Shading para usar la textura de entorno asignada en la configuración de mundo de Blender.

![Environment](/blender/environment.webp)

<video-embed limit_height max_height="300px" src="/docs/blender/environment.mp4" />

Alternativamente, si no quieres ver el cubemap como fondo, añade un componente Camera a tu Camera de Blender y cambia `clearFlags: SolidColor`. Ten en cuenta que la configuración de `backgroundBlurriness` y `backgroundIntensity` de la Camera anulan la configuración de Viewport shading.

![Environment Camera](/blender/environment-camera.webp)

### Añade tu propia iluminación de entorno HDRI / EXR y skybox

<video-embed limit_height src="/docs/blender/custom_hdri.mp4" />

## Exportar

Para excluir un objeto de ser exportado, puedes desactivar la visualización de Viewport y Render (ver imagen abajo).

![Exclude from export](/blender/dont-export.webp)

## Animación 🏇

Para casos de uso sencillos, puedes usar el componente Animation para la reproducción de uno o múltiples animationclips. Simplemente selecciona tu objeto, añade un componente Animation y asigna el clip (puedes añadir clips adicionales para ser exportados al array de clips). Por defecto, solo reproducirá el primer clip asignado cuando `playAutomatically` esté activado. Puedes activar los otros clips usando un simple componente Typescript personalizado.
<video-embed limit_height src="/docs/blender/animation.mp4" />

### AnimatorController

El animator controller se puede crear para escenarios más complejos. Funciona como una statemachine que te permite crear múltiples estados de animación en un gráfico y configurar condiciones y ajustes de interpolación para las transiciones entre ellos.

<video-embed src="/docs/blender/animatorcontroller-web.mp4" />
*Crea y exporta [máquinas de estados de animador](#animatorcontroller) para controlar animaciones de personajes complejas.*

#### Crear un AnimatorController

El editor de AnimatorController se puede abrir usando el desplegable EditorType en la esquina superior izquierda de cada panel:

![AnimatorController open window](/blender/animatorcontroller-open.webp)

<video-embed limit_height max_height="188px" src="/docs/blender/animatorcontroller-create.mp4" />
*Creando un nuevo asset de animator-controller ☝ o seleccionando uno de tus assets creados previamente*

##### Descripción general del gráfico
![AnimatorController overview](/blender/animatorcontroller-overview.webp)
1) Usa `Shift+A` para crear un nuevo AnimatorState.
2) El nodo `Parameters` se creará una vez que añadas el primer nodo. Selecciónalo para configurar los parámetros a usar en las transiciones (a través del panel Node en el borde derecho).
3) Esto es un AnimatorState. El estado naranja es el estado inicial (se puede cambiar usando el botón `Set default state` en el panel Node/Properties).
4) Las Propiedades de un AnimatorState se pueden usar para configurar una o múltiples transiciones a otros estados. Usa el array `Conditions` para seleccionar parámetros que deben coincidir con la condición para realizar la transición.

#### Usar un AnimatorController

Para usar un AnimatorController, añade un componente Animator al objeto raíz de tus animaciones y selecciona el asset de AnimatorController que quieres usar para este objeto.

![AnimatorController assign to animator](/blender/animatorcontroller-assigning.webp)

Puedes establecer los parámetros del Animator desde Typescript o, por ejemplo, usando el evento de un componente Button.

### Timeline — Exportación de NLA Tracks 🎬

Puedes exportar NLA tracks de Blender directamente a la web.
Añade un componente PlayableDirector (a través de `Add Component`) a cualquier objeto de Blender. Asigna los objetos en la lista `animation tracks` del componente para los cuales quieres que se exporten las NLA tracks.

![](/blender/timeline_setup.webp)
![](/blender/timeline.webp)

::: details Ejemplo de código para reproducción interactiva de timeline
Añade este script a `src/scripts` (ver sección de componentes personalizados) y añádelo a cualquier objeto en Blender para que el tiempo de un timeline sea controlado por el desplazamiento en el navegador.

```ts twoslash
import { Behaviour, PlayableDirector, serializable, Mathf } from "@needle-tools/engine";

export class ScrollTimeline extends Behaviour {

    @serializable(PlayableDirector)
    timeline?: PlayableDirector;

    @serializable()
    sensitivity: number = .5;

    @serializable()
    clamp: boolean = false;

    private _targetTime: number = 0;

    awake() {
        this.context.domElement.addEventListener("wheel", this.onWheel);
        if (this.timeline) this.timeline.pause();
    }

    private onWheel = (e: WheelEvent) => {
        if (this.timeline) {
            this._targetTime = this.timeline.time + e.deltaY * 0.01 * this.sensitivity;
            if (this.clamp) this._targetTime = Mathf.clamp(this._targetTime, 0, this.timeline.duration);
        }
    }

    update(): void {
        if (!this.timeline) return;
        const time = Mathf.lerp(this.timeline.time, this._targetTime, this.context.time.deltaTime / .3);
        this.timeline.time = time;
        this.timeline.pause();
        this.timeline.evaluate();
    }
}
```
:::

## Interactividad 😎

Puedes añadir o quitar componentes a objetos en tu jerarquía usando el panel Needle Components:

![Component panel](/blender/components-panel.webp)

![Component panel](/blender/components-panel-select.webp)
*Por ejemplo, añadiendo un componente `OrbitControls` al objeto cámara*
*obtienes controles de cámara básicos para dispositivos móviles y de escritorio*
*Ajusta la configuración de cada componente en sus respectivos paneles*

Los componentes se pueden eliminar usando el botón X en la parte inferior derecha:

![Remove component](/blender/remove-component.webp)

### Componentes Personalizados
Los componentes personalizados también se pueden añadir fácilmente simplemente escribiendo clases de Typescript. Se compilarán automáticamente y aparecerán en Blender cuando se guarden.

Para crear componentes personalizados, abre el espacio de trabajo a través del panel Needle Project y añade un archivo de script `.ts` en `src/scripts` dentro de tu proyecto web. Por favor, consulta la [documentación de scripting](http://docs.needle.tools/scripting) para aprender cómo escribir componentes personalizados para Needle Engine.

::: warning Nota
Asegúrate de que `@needle-tools/needle-component-compiler` 2.x esté instalado en tu proyecto web (package.json devDependencies).
:::

## Lightmapping 💡

Needle incluye un plugin de lightmapping que hace que sea muy fácil hornear luces hermosas en texturas y llevarlas a la web. El plugin generará automáticamente UVs de lightmap para todos los modelos marcados para lightmapping, no es necesario crear un atlas de texturas manual. También soporta lightmapping de múltiples instancias con sus propios datos de lightmap. Para que el lightmapping funcione, necesitas al menos una luz y un objeto con `Lightmapped` activado en el panel `Needle Object`.

<video-embed limit_height max_height="800px" src="/docs/blender/lightmapping.mp4" />

::: tip
Puedes descargar el archivo .blend del video [aquí](https://engine.needle.tools/downloads/blender/lightmaps.blend).
:::
Utiliza el panel Needle Object para habilitar lightmapping para un objeto mesh o luz:

![Lightmapping object](/blender/lightmapping-object.webp)

Para un acceso rápido a la configuración de lightmap y opciones de horneado, puedes usar el panel de vista de escena en la pestaña `Needle`:

![Lightmapping scene panel](/blender/lightmapping-scene-panel.webp)

Alternativamente, también puedes usar el panel Lightmapping en la pestaña `Render Properties`:

![Lightmapping object](/blender/lightmapping-panel.webp)

::: warning Característica Experimental
El plugin de lightmapping es experimental. Recomendamos crear una copia de seguridad de tu archivo .blend al usarlo. Por favor, informa de los problemas o errores que encuentres en [nuestro foro](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) 🙏
:::

## Compresión de Texturas

El Build Pipeline de Needle Engine comprime automáticamente las texturas utilizando ECT1S y UASTC (dependiendo de su uso en los materiales) al realizar un build de producción (**requiere tener [toktx](../getting-started/index.md#install-these-tools-for-production-builds) instalado**). Pero puedes anular o cambiar el tipo de compresión por textura en el panel Material.

Puedes modificar la compresión que se aplica por textura. Para anular la configuración de compresión predeterminada, ve a la pestaña `Material` y abre `Needle Material Settings`. Allí encontrarás un interruptor para anular la configuración de textura por cada textura utilizada en tu material. Consulta la [tabla de compresión de texturas](../deployment.md#how-do-i-choose-between-etc1s-uastc-and-webp-compression) para una breve descripción de las diferencias entre cada algoritmo de compresión.

![Texture Compression options in Blender](/blender/texture-compression.webp)

## Actualización

La bombilla en el panel Needle Project te informa cuando hay una nueva versión del add-on disponible. Simplemente haz clic en el icono para descargar la nueva versión.
![Update notification](/blender/updates.webp)

## Reportar un problema

Si encuentras algún problema, estaremos encantados de ayudarte. Por favor, únete a [nuestro foro](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) para obtener soporte rápido.

Por favor, revisa también los logs en Blender. Puedes encontrar logs específicos del Addon de Needle Engine a través de `Help/Needle` en Blender.

### Bug Reporter Integrado
![Needle Blender Bug Reporter panel](/blender/bugreporter.webp)
También puedes crear y subir automáticamente un reporte de bug directamente desde Blender. Los reportes de bug subidos se usarán únicamente para depuración. Están encriptados en nuestro backend y se eliminarán después de 30 días.

Si es necesario, en ciertos casos también podemos establecer NDAs personalizadas para tus proyectos. Por favor, contáctanos para más información.

:::tip Usar el Bug Reporter requiere un proyecto web
Asegúrate de haber configurado un proyecto web antes de enviar un reporte de bug – nos permitirá entender más sobre tu sistema y configuración y hará más fácil reproducir el problema.
:::

# Próximos Pasos

- [Concepto: Proyectos Web](../project-structure.md)
- [Concepto: Exportar Assets](../export.md)
- [Concepto: Despliegue (Comparte tu sitio web)](../deployment.md)
- [Componentes: Aprende sobre Everywhere Actions](../everywhere-actions.md)
- [Scripting para Principiantes: Aspectos esenciales de Typescript](../getting-started/typescript-essentials.md)
- [Scripting para Principiantes: Cómo escribir componentes personalizados](../scripting.md)

Página traducida automáticamente usando IA