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
    <img src="/logo.png" style="max-height:70px;" title="Logotipo de Needle" alt="Logotipo de Needle"/> +
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

![Configuración](/blender/settings.webp)

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

![Panel de proyecto](/blender/project-panel.webp)

Por defecto, tu escena se re-exportará automáticamente cuando guardes el archivo .blend. Si el servidor local está en ejecución (por ejemplo, haciendo clic en `Run Project`), el sitio web se refrescará automáticamente con tu modelo modificado.

Cuando tu proyecto web ya existe y solo quieres seguir trabajando en el sitio web, haz clic en el botón azul `Run Project` para iniciar el servidor local:
![Panel de proyecto](/blender/project-panel-2.webp)

### Descripción general del panel Project
![Panel de proyecto](/blender/project-panel-3.webp)

1) La ruta a tu proyecto web. Puedes usar el pequeño botón de carpeta a la derecha para seleccionar una ruta diferente.
2) El botón `Run Project` aparece cuando la ruta del Project apunta a un proyecto web válido. Un proyecto web es válido cuando contiene un archivo `package.json`.
3) `Directory` abre el directorio de tu proyecto web (`Project Path`).
4) Este botón re-exporta la escena actual como un archivo glb a tu proyecto web local. Esto también ocurre por defecto al guardar tu archivo .blend.
5) `Code Editor` intenta abrir el espacio de trabajo de vscode en tu proyecto web.
6) Si trabajas con múltiples escenas en un archivo .blend, puedes configurar qué escena es tu Main scene y debe ser exportada a la web. Si alguno de tus components referencia otra escena, también se exportarán como archivos glb separados. Al hacer clic en el botón "Export", tu Main scene será la que se cargue en el navegador.
7) Utiliza los botones `Build: Development` o `Build: Production` cuando quieras subir tu proyecto web a un servidor. Esto agrupará tu proyecto web y producirá los archivos que puedes subir. Al hacer clic en `Build: Production`, también aplicará optimizaciones a tus texturas (se comprimirán para la web).
8) Abrir la documentación.

## Configuración de Blender

### Gestión de Color

Por defecto, el viewport de Blender está configurado en `Filmic` - con esta configuración, tus colores en Blender y en three.js no coincidirán.
Para solucionar esto, ve a la categoría Render de Blender y en el panel ColorManagement selecciona `View Transform`: `Standard`.

![Configuración correcta de gestión de color](/blender/settings-color-management.webp)

## Iluminación de Entorno

Puedes cambiar la iluminación de entorno y el skybox utilizando las opciones de Viewport shading. Asigna un cubemap para usarlo como iluminación o como skybox de fondo. Puedes ajustar la intensidad o el blur para modificar la apariencia a tu gusto.

Nota: Para ver también el skybox cubemap en el navegador, aumenta la `World Opacity` a 1.

Nota: Alternativamente, puedes habilitar la configuración `Scene World` en la pestaña Viewport Shading para usar la textura de entorno asignada en la configuración de mundo de Blender.

![Entorno](/blender/environment.webp)

<video-embed limit_height max_height="300px" src="/docs/blender/environment.mp4" />

Alternativamente, si no quieres ver el cubemap como fondo, añade un Camera component a tu Camera de Blender y cambia `clearFlags: SolidColor`. Ten en cuenta que la configuración de `backgroundBlurriness` y `backgroundIntensity` de la Camera anulan la configuración de Viewport shading.

![Cámara de entorno](/blender/environment-camera.webp)

### Añade tu propia iluminación de entorno HDRI / EXR y skybox

<video-embed limit_height src="/docs/blender/custom_hdri.mp4" />

## Exportar

Para excluir un objeto de ser exportado, puedes desactivar la visualización de Viewport y Render (ver imagen abajo).

![Excluir de la exportación](/blender/dont-export.webp)

## Animación 🏇

Para casos de uso sencillos, puedes usar el Animation component para la reproducción de uno o múltiples animationclips. Simplemente selecciona tu objeto, añade un Animation component y asigna el clip (puedes añadir clips adicionales para ser exportados al array de clips). Por defecto, solo reproducirá el primer clip asignado cuando `playAutomatically` esté activado. Puedes activar los otros clips usando un simple custom typescript component.
<video-embed limit_height src="/docs/blender/animation.mp4" />

### AnimatorController

El animator controller se puede crear para escenarios más complejos. Funciona como una statemachine que te permite crear múltiples animation states en un graph y configurar conditions y interpolation settings para las transiciones entre ellos.

<video-embed src="/docs/blender/animatorcontroller-web.mp4" />
*Crea y exporta [animator statemachines](#animatorcontroller) para controlar complex character animations.*

#### Crear un AnimatorController

El editor de AnimatorController se puede abrir usando el EditorType dropdown en la esquina superior izquierda de cada panel:

![Abrir ventana de AnimatorController](/blender/animatorcontroller-open.webp)

<video-embed limit_height max_height="188px" src="/docs/blender/animatorcontroller-create.mp4" />
*Creando un nuevo asset de animator-controller ☝ o seleccionando uno de tus assets creados previamente*

##### Descripción general del Graph
![Descripción general de AnimatorController](/blender/animatorcontroller-overview.webp)
1) Usa `Shift+A` para crear un nuevo AnimatorState.
2) El node `Parameters` se creará una vez que añadas el primer node. Selecciónalo para configurar parameters a usar en las transitions (a través del Node panel en el borde derecho).
3) Esto es un AnimatorState. el state naranja es el start state (se puede cambiar usando el botón `Set default state` en el Node/Properties panel)
4) Las Properties para un AnimatorState se pueden usar para configurar una o múltiples transitions a otros states. Usa el array `Conditions` para seleccionar parameters que deben coincidir con la condition para realizar la transition.

#### Usar un AnimatorController

Para usar un AnimatorController, añade un Animator component al root object de tus animations y selecciona el AnimatorController asset que quieres usar para este object.

![Asignar AnimatorController a animator](/blender/animatorcontroller-assigning.webp)

Puedes establecer los Animator parameters desde typescript o, por ejemplo, usando el event de un Button component.

### Timeline — Exportación de NLA Tracks 🎬

Puedes exportar Blender NLA tracks directamente a la web.
Añade un PlayableDirector component (a través de `Add Component`) a cualquier objeto de Blender. Asigna los objetos en la lista ``animation tracks`` del component para los cuales quieres que se exporten las NLA tracks.

![](/blender/timeline_setup.webp)
![](/blender/timeline.webp)

::: details Ejemplo de código para reproducción interactiva de timeline
Añade este script a `src/scripts` (ver sección de custom components) y añádelo a cualquier objeto en Blender para que el tiempo de un timeline sea controlado por el scrolling en los browsers.

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

Puedes añadir o quitar components a objetos en tu hierarchy usando el panel Needle Components:

![Panel de componentes](/blender/components-panel.webp)

![Selección del panel de componentes](/blender/components-panel-select.webp)
*Por ejemplo, añadiendo un component `OrbitControls` al objeto camera*
*obtienes controles de camera básicos para mobile y desktop devices*
*Ajusta settings para cada component en sus respectivos panels*

Los components se pueden eliminar usando el botón X en la parte inferior derecha:

![Eliminar componente](/blender/remove-component.webp)

### Custom Components
Los custom components también se pueden añadir fácilmente simplemente escribiendo Typescript classes. Se compilarán automáticamente y aparecerán en Blender cuando se guarden.

Para crear custom components, abre el workspace a través del panel Needle Project y añade un archivo de script `.ts` en `src/scripts` dentro de tu web project. Por favor, consulta la [documentación de scripting](http://docs.needle.tools/scripting) para aprender cómo escribir custom components para Needle Engine.

::: warning Nota
Asegúrate de que `@needle-tools/needle-component-compiler` 2.x esté instalado en tu web project (package.json devDependencies)
:::

## Lightmapping 💡

Needle incluye un lightmapping plugin que hace que sea muy fácil bake beautiful lights a textures y llevarlas a la web. El plugin generará automáticamente lightmap UVs para todos los models marcados para ser lightmapped, there is no need to make a manual texture atlas. It also supports lightmapping of multiple instances with their own lightmap data. Para que el lightmapping funcione, necesitas al menos una light y un object con `Lightmapped` activado en el panel `Needle Object`.

<video-embed limit_height max_height="800px" src="/docs/blender/lightmapping.mp4" />

::: tip
Puedes descargar el archivo .blend del video [aquí](https://engine.needle.tools/downloads/blender/lightmaps.blend).
:::
Utiliza el panel Needle Object para habilitar lightmapping para un mesh object o light:

![Objeto Lightmapping](/blender/lightmapping-object.webp)

Para un acceso rápido a lightmap settings y baking options puedes usar el scene view panel en la pestaña `Needle`:

![Panel de escena Lightmapping](/blender/lightmapping-scene-panel.webp)

Alternativamente, también puedes usar el Lightmapping panel en la pestaña `Render Properties`:

![Objeto Lightmapping](/blender/lightmapping-panel.webp)

::: warning Característica Experimental
El lightmapping plugin es experimental. Recomendamos crear una backup de tu archivo .blend cuando lo uses. Por favor, reporta problems o errors que encuentres en [nuestro foro](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) 🙏
:::

## Compresión de Texturas

El Needle Engine Build Pipeline comprime automáticamente las textures utilizando ECT1S y UASTC (depending on their usage in materials) al realizar un production build (**requiere tener [toktx](../getting-started/index.md#install-these-tools-for-production-builds) instalado**). Pero puedes override o change el compression type por texture en el Material panel.

Puedes modificar la compression que se está aplicando por texture. Para override the default compression settings go to the `Material` tab and open the `Needle Material Settings`. There you will find a toggle to override the texture settings per texture used in your material. See the [texture compression table](../deployment.md#how-do-i-choose-between-etc1s-uastc-and-webp-compression) for a brief overview over the differences between each compression algorithm.

![Opciones de compresión de texturas en Blender](/blender/texture-compression.webp)

## Actualización

La bombilla en el panel Needle Project te informa cuando hay una nueva version del addon disponible. Simplemente haz clic en el icon para descargar la nueva version.
![Notificación de actualización](/blender/updates.webp)

## Reportar un issue

Si encuentras algún problem estamos más que happy to help! Please join [our forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content) for fast support.

Please also check the logs in Blender. You can find logs specific to the Needle Engine Addon via `Help/Needle` in Blender.

### Integrated Bug Reporter
![Panel de Needle Blender Bug Reporter](/blender/bugreporter.webp)
También puedes automatically create and upload a bugreport directly from Blender. Uploaded bugreports will solely be used for debugging. They are encrypted on our backend and will be deleted after 30 days.

If needed, in certain cases we're also able to set up custom NDAs for your projects. Please contact us for more information.

:::tip Usar el Bug Reporter requiere un web project
Asegúrate de haber configurado un web project antes de sending un bug report – nos permitirá understand more about your system and setup and make it easier to reproduce the issue.
:::

# Próximos Pasos

- [Concepto: Proyectos Web](../project-structure.md)
- [Concepto: Exportar Assets](../export.md)
- [Concepto: Despliegue (Comparte tu sitio web)](../deployment.md)
- [Componentes: Aprende sobre Everywhere Actions](../everywhere-actions.md)
- [Scripting para Principiantes: Aspectos esenciales de Typescript](../getting-started/typescript-essentials.md)
- [Scripting para Principiantes: Cómo escribir componentes personalizados](../scripting.md)

Página traducida automáticamente usando IA