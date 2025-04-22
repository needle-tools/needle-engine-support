---
title: VR & AR (WebXR)
---

## Dispositivos compatibles

Needle Engine es compatible con la [especificación completa de WebXR](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API), incluyendo AR y VR. WebXR es un estándar web oficial que trae experiencias inmersivas a la web, con todas las ventajas de la web: sin instalación, sin tienda de apps, sin SDKs necesarios.

Todos los dispositivos con un navegador pueden ejecutar apps hechas con Needle. Si el navegador es compatible con WebXR, tus apps funcionarán automáticamente también en XR, usando nuestros componentes integrados. Esto incluye navegadores de escritorio, navegadores móviles, muchos navegadores en visores de AR/VR, pero también otras tecnologías emergentes como pantallas Looking Glass, gafas inteligentes, y más.

:::tip Soporte AR sin app para iOS vía USDZ/QuickLook
Aunque los dispositivos iOS aún no tienen soporte oficial para WebXR, Needle soporta la creación de experiencias AR en iOS usando [Everywhere Actions](everywhere-actions.md). Consulta la [sección de iOS](#augmented-reality-and-webxr-on-ios) para más detalles. Puedes crear experiencias ricas e interactivas que funcionen sin problemas en AR en dispositivos iOS, incluso con las limitaciones que Apple ha impuesto.

Cuando entras en modo AR en iOS, Needle convertirá automáticamente tu escena a un archivo USDZ, que luego se muestra en AR usando QuickLook de Apple. Se conservarán los objetos, materiales, audio, animación y Everywhere Actions.
:::

La siguiente tabla lista algunos de los dispositivos que hemos verificado que funcionan con Needle Engine.
Cuando salga un nuevo dispositivo compatible con WebXR, funcionará con tus apps de fábrica. Esta es una de las grandes ventajas de construir con el navegador como plataforma: la compatibilidad no se limita a un conjunto específico de dispositivos o SDKs.

| Dispositivo Visor | Navegador | Notas |
| -- | -- | -- |
| Apple Vision Pro | ✔️ Safari | hand tracking, soporte para transient pointer |
| Meta Quest 3 | ✔️ Meta Browser | hand tracking, soporte para sessiongranted<sup>1</sup>, passthrough, depth sensing, mesh tracking |
| Meta Quest 3S | ✔️ Meta Browser | hand tracking, soporte para sessiongranted<sup>1</sup>, passthrough, depth sensing, mesh tracking |
| Meta Quest 2 | ✔️ Meta Browser | hand tracking, soporte para sessiongranted<sup>1</sup>, passthrough (blanco y negro) |
| Meta Quest 1 | ✔️ Meta Browser | hand tracking, soporte para sessiongranted<sup>1</sup> |
| Meta Quest Pro | ✔️ Meta Browser | hand tracking, soporte para sessiongranted<sup>1</sup>, passthrough |
| Pico Neo 4 | ✔️ Pico Browser | passthrough, hand tracking<sup>2</sup> |
| Pico Neo 3 | ✔️ Pico Browser | no hand tracking, thumbsticks de controlador invertidos |
| Oculus Rift 1/2 | ✔️ Chrome | |
| Valve Index | ✔️ Chrome | |
| HTC Vive | ✔️ Chrome | |
| Hololens 2 | ✔️ Edge | hand tracking, soporte para AR y VR (en modo VR, también se renderiza el fondo) |

| Dispositivo móvil | Navegador | Notas |
| -- | -- | -- |
| Android 10+ | ✔️ Chrome | |
| Android 10+ | ✔️ Firefox | |
| iOS 15+ | (✔️)<sup>3</sup> Safari<br/>(✔️)<sup>3</sup> Chrome | No hay soporte de código completo, pero [Everywhere Actions](everywhere-actions.md) de Needle son compatibles para crear archivos USDZ dinámicos e interactivos. |
| iOS 15+ | ✔️ WebXR Viewer | el navegador está algo desactualizado actualmente |
| Hololens 2 | ✔️ Edge | |
| Hololens 1 | ❌ | no tiene soporte WebXR |
| Magic Leap 2 | ✔️ | |
| Magic Leap 1 | ✔️ | dispositivo obsoleto |

| Otros Dispositivos | Navegador | Notas |
| -- | -- | -- |
| Looking Glass Holographic Display | ✔️ Chrome | requiere Looking Glass bridge y algo de código personalizado, [ver nuestra muestra](https://engine.needle.tools/samples/looking-glass/) |
| Logitech MX Ink | ✔️ Meta Browser | soporte oficial, ver [documentación](https://logitech.github.io/mxink/WebXR/WebXrIntegration.html#using-needle-tools) |

<sup>1</sup>: Requiere habilitar un flag del navegador: `chrome://flags/#webxr-navigation-permission`
<sup>2</sup>: Requiere habilitar una opción en los ajustes de Desarrollador
<sup>3</sup>: Usa [Everywhere Actions](everywhere-actions.md) u [otros enfoques](#augmented-reality-and-webxr-on-ios)

## Ejemplos de VR, AR y QuickLook

Visita nuestras [Needle Engine Samples](https://engine.needle.tools/samples/?overlay=samples&tag=xr) para probar muchos ejemplos interactivos ahora mismo. O, pruébalo en vivo en tu dispositivo haciendo clic en los botones <kbd>QR Code</kbd> (para teléfonos) o <kbd>Open on Quest</kbd> (para visores Meta Quest) a continuación.

<sample src="https://engine.needle.tools/samples/collaborative-sandbox/"/>

## Añadir capacidades VR y AR a una escena

Las capacidades de AR, VR y networking en Needle Engine están diseñadas para ser modulares. Puedes elegir no soportar ninguna de ellas, o añadir solo características específicas.

### Capacidades básicas

1. **Habilitar AR y VR**
   Añade un componente `WebXR`.
   *Opcional:* puedes establecer un avatar personalizado referenciando un [Prefab de Avatar](#avatars).
   Por defecto, se asigna un `DefaultAvatar` básico.

2. **Habilitar Teleportation**
   Añade un componente `TeleportTarget` a las jerarquías de objetos sobre las que se puede teletransportar.
   Para excluir objetos específicos, establece su layer a `IgnoreRaycasting`.

### Multijugador

1. **Habilitar Networking**
   Añade un componente `SyncedRoom`.

2. **Habilitar Desktop Viewer Sync**
   Añade un componente `SyncedCamera`.

3. **Habilitar Voice Chat**
   Añade un componente `VoIP`.

:::tip Estructura de escena
Estos componentes pueden estar en cualquier lugar dentro de tu jerarquía. También pueden estar todos en el mismo GameObject, lo cual es un patrón común.
:::

 > **[Castle Builder](https://castle.needle.tools/)** usa todo lo anterior para una experiencia sandbox multijugador multiplataforma.
 > — #madebyneedle 💚

### Componentes AR especiales

1. **Definir la raíz y escala de la sesión AR**
   Añade un componente `WebARSessionRoot` a tu objeto root. Para experiencias AR, a menudo quieres escalar la escena para que se ajuste al mundo real.
2. Define la **user scale** para encoger (< 1) o ampliar (> 1) al usuario en relación con la escena al entrar en AR.

### Controlar la visualización de objetos para XR

1. **Definir si un objeto es visible en Browser, AR, VR, First Person, Third Person**
   Añade un componente `XR Flag` al objeto que quieres controlar.

2. **Cambia las opciones en el desplegable** según sea necesario.
   Los casos de uso comunes son
   - ocultar suelos al entrar en AR
   - ocultar partes del Avatar en vistas en Primera o Tercera Persona. Por ejemplo, en vista en primera persona, una persona no debería poder ver su propio modelo de cabeza.

### Viajar entre mundos VR

Needle Engine es compatible con el estado [`sessiongranted`](https://github.com/immersive-web/navigation). Esto permite a los usuarios navegar sin problemas entre aplicaciones WebXR sin salir de una sesión inmersiva: permanecen en VR o AR.

Actualmente, esto solo es compatible con Oculus Quest 1, 2 y 3 en el Navegador de Oculus. En otras plataformas, los usuarios serán expulsados de su sesión inmersiva actual y tendrán que volver a entrar en VR en la nueva página.
Requiere habilitar un flag del navegador: `chrome://flags/#webxr-navigation-permission`

- **Haz clic en objetos para abrir enlaces**
  Añade el componente `OpenURL` que facilita mucho la construcción de mundos conectados.

## Scripting
Lee más sobre scripting para XR en la [documentación de scripting XR](./scripting.md#xr-event-methods)

## Avatares

Aunque actualmente no ofrecemos una integración lista para usar de sistemas de avatares externos, puedes crear avatares o sistemas personalizados específicos de la aplicación.

- **Crear un Avatar personalizado**
  - Crea un GameObject vacío como root del avatar
  - Añade un objeto llamado `Head` y añade un `XRFlag` configurado en Third Person
  - Añade objetos llamados `HandLeft` y `HandRight`
  - Añade tus gráficos debajo de estos objetos.

### Componentes de Avatar Experimentales

Hay una serie de componentes experimentales para construir Avatares más expresivos. En este punto, recomendamos duplicarlos para hacer tus propias variantes, ya que pueden ser cambiados o eliminados más adelante.

![20220817-230858-87dG-Unity_PLjQ](https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif)
*Ejemplo de Rig de Avatar con modelo de cuello básico y constraints de extremidades*

- **Random Player Colors**
  Como ejemplo de personalización de avatar, puedes añadir un componente `PlayerColor` a tus renderers.
  Este color aleatorio se sincroniza entre jugadores.

- **Eye Rotation**
  `AvatarEyeLook_Rotation` rota GameObjects (ojos) para seguir a otros avatares y a un target aleatorio. Este componente se sincroniza entre jugadores.

- **Eye Blinking**
  `AvatarBlink_Simple` oculta GameObjects (ojos) aleatoriamente cada pocos segundos, emulando un parpadeo.

  ![image](https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png)
  *Ejemplo de jerarquía de Prefab de Avatar*

- **Offset Constraint**
  `OffsetConstraint` permite desplazar un objeto en relación con otro en el espacio del Avatar. Esto permite, por ejemplo, que un Cuerpo siga a la Cabeza pero mantenga la rotación nivelada. También permite construir modelos de cuello simples.

- **Limb Constraint**
  `BasicIKConstraint` es un constraint muy minimalista que toma dos transforms y un hint. Esto es útil para construir cadenas de brazos o piernas simples. Como la rotación no está implementada correctamente actualmente, los brazos y las piernas pueden necesitar ser rotacionalmente simétricos para "verse bien". ¡Se llama "Basic" por una razón!

## Superposiciones de contenido HTML en AR

Si quieres mostrar contenido html diferente dependiendo de si el cliente está usando un navegador regular o usando AR o VR, puedes usar un conjunto de clases html.
Esto se controla a través de clases de elementos HTML. Por ejemplo, para que el contenido aparezca en escritorio y en AR, añade un ``<div class="desktop ar"> ... </div>`` dentro de la etiqueta `<needle-engine>`:

```html
<needle-engine>
    <div class="desktop ar" style="pointer-events:none;">
        <div class="positioning-container">
          <p>tu contenido para AR y escritorio va aquí</p>
          <p class="only-in-ar">Esto solo será visible en AR</p>
        <div>
    </div>
</needle-engine>
```

Las Superposiciones de Contenido se implementan usando la característica opcional `dom-overlay`, que generalmente es compatible con dispositivos AR basados en pantalla (teléfonos, tabletas).

Usa la clase `.ar-session-active` para mostrar/ocultar contenido específico mientras estás en AR. La [`:xr-overlay` pseudo class](https://www.w3.org/TR/webxr-dom-overlays-1/#css-pseudo-class) no debería usarse en este momento porque su uso rompe el WebXR Viewer de Mozilla.

```css
.only-in-ar {
  display: none;
}

.ar-session-active .only-in-ar {
  display:initial;
}
```

Vale la pena señalar que el elemento overlay [siempre se mostrará a pantalla completa mientras se esté en XR](https://www.w3.org/TR/webxr-dom-overlays-1/#ua-style-sheet-defaults), independientemente del estilo aplicado. Si quieres alinear elementos de forma diferente, debes crear un container _dentro_ del elemento `class="ar"`.

<sample src="https://engine.needle.tools/samples-uploads/ar-overlay/"/>

## Realidad Aumentada y WebXR en iOS

Las experiencias de Realidad Aumentada en iOS son algo limitadas, debido a que Apple actualmente no soporta WebXR en dispositivos iOS.

Las [Everywhere Actions](everywhere-actions.md) de Needle Engine están diseñadas para llenar esa brecha, trayendo capacidades interactivas automáticas a dispositivos iOS para escenas compuestas por componentes específicos. Soportan un subconjunto de la funcionalidad disponible en WebXR, por ejemplo spatial audio, image tracking, animaciones, y más. Consulta [la documentación](everywhere-actions.md) para más información.

:::tip Soporte limitado de código personalizado en QuickLook
Apple tiene fuertes limitaciones sobre qué tipo de contenido puede usarse en QuickLook. Por lo tanto, los componentes de script personalizados no pueden convertirse automáticamente para su uso en AR en iOS. Puedes añadir soporte para algunos tipos de código personalizado usando nuestra API de Everywhere Actions.
:::

### Instrumento Musical – Soporte WebXR y QuickLook

Aquí hay un ejemplo de un instrumento musical que usa Everywhere Actions y por lo tanto funciona en navegadores y en AR en dispositivos iOS.
Utiliza spatial audio, animación e interacciones de toque.
<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Everywhere Actions y otras opciones para AR en iOS

También hay otras opciones para guiar a los usuarios de iOS hacia experiencias AR interactivas aún más capaces:

3. **Exportar contenido sobre la marcha como archivos USDZ.**
   Estos archivos pueden mostrarse en dispositivos iOS en AR. Cuando se exportan desde escenas con Everywhere Actions, la interactividad es la misma, más que suficiente para configuradores de productos, experiencias narrativas y similares.
   Un ejemplo es [Castle Builder](https://castle.needle.tools) donde las creaciones (no la sesión en vivo) pueden verse en AR.

 > **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** utiliza este enfoque. Los jugadores pueden colocar texto colaborativamente en la escena en sus pantallas y luego ver los resultados en AR en iOS. En Android, también pueden interactuar directamente en WebXR.
 > — #madewithneedle por Katja Rempel 💚

1. **Guiar a los usuarios hacia navegadores compatibles con WebXR en iOS.**
   Dependiendo de tu audiencia objetivo, puedes guiar a los usuarios en iOS hacia, por ejemplo, el [WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056) de Mozilla para experimentar AR en iOS.

2. **Usar acceso a la cámara y algoritmos personalizados en dispositivos iOS.**
   Se puede solicitar acceso a la imagen de la cámara y ejecutar algoritmos personalizados para determinar la pose del dispositivo.
   Aunque actualmente no proporcionamos componentes integrados para esto, aquí hay algunas referencias a bibliotecas y frameworks que queremos probar en el futuro:
   - [AR.js](https://github.com/AR-js-org/AR.js) (código abierto)
     - [Integración experimental de AR.js](https://github.com/FireDragonGameStudio/NeedleAndARjs) por FireDragonGameStudio
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (código abierto)
   - [8th Wall](https://www.8thwall.com/) (comercial)

## Image Tracking

Needle Engine soporta **WebXR Image Tracking** ([Live Demo](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) en Android y **QuickLook Image Tracking** en iOS.

Puedes encontrar documentación adicional en la sección [Everywhere Actions](everywhere-actions.md#image-tracking).

:::warning WebXR Image Tracking todavía está en fase de "borrador" y no está generalmente disponible
Hasta ahora, los proveedores de navegadores no han podido ponerse de acuerdo sobre la API final de image tracking para WebXR. Mientras la especificación esté en fase de "borrador" ([Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
tú y los usuarios de tu app necesitaréis seguir estos pasos para habilitar WebXR ImageTracking en dispositivos Android:
1. Visita ``chrome://flags`` en tu navegador Chrome de Android
2. Encuentra y habilita la opción `WebXR Incubations`
:::

Sin esa especificación, aún se puede solicitar acceso a la imagen de la cámara y ejecutar algoritmos personalizados para determinar la pose del dispositivo. La desventaja es que los usuarios tendrán que aceptar permisos adicionales como el acceso a la cámara, y el tracking no será tan preciso como con las capacidades nativas del dispositivo.

Aquí tienes algunas bibliotecas para añadir image tracking basado en el acceso a la cámara y algoritmos de visión por computadora locales:
   - [Integración experimental de AR.js con Needle Engine](https://github.com/FireDragonGameStudio/NeedleAndARjs) por FireDragonGameStudio
   - [AR.js](https://github.com/AR-js-org/AR.js) (código abierto)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (código abierto)


## Referencias

[WebXR Device API](https://www.w3.org/TR/webxr/)
[caniuse: WebXR](https://caniuse.com/webxr)
[Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)


Página traducida automáticamente con IA