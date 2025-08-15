---
title: Acciones Everywhere — Experiencias interactivas en Escritorio, Android & iOS (incluso AR)
description: Las Acciones Everywhere de Needle son un conjunto de componentes cuidadosamente seleccionados que te permiten crear experiencias interactivas en Unity sin escribir una sola línea de código. Están diseñadas para servir como bloques de construcción para experiencias en la web, móvil y XR, **incluida la Realidad Aumentada en iOS**. A partir de disparadores y acciones de bajo nivel, se pueden construir comportamientos interactivos complejos de nivel superior.
---

## ¿Qué son las Acciones Everywhere?

Las Acciones Everywhere de Needle son un conjunto de componentes cuidadosamente seleccionados que te permiten crear experiencias interactivas en Unity sin escribir una sola línea de código. Están diseñadas para servir como bloques de construcción para experiencias en la web, móvil y XR, **incluida la Realidad Aumentada en iOS**.

A partir de disparadores y acciones de bajo nivel, se pueden construir comportamientos interactivos complejos de nivel superior.

### Plataformas Compatibles
- Escritorio
- Móvil (Android / iOS)
- Gafas VR
- Dispositivos AR
- iOS AR – QuickLook (¡sí, de verdad!)

## ¿Cómo uso las Acciones Everywhere?

Para el soporte de iOS, añade el componente `USDZExporter` a tu escena. Es una buena práctica añadirlo al mismo objeto que el componente `WebXR` (pero no es obligatorio).

Para añadir una acción a cualquier objeto en tu escena
selecciónalo y luego haz clic en `Add Component > Needle > Everywhere Actions > [Action]`.

![](/imgs/everywhere-actions-component-menu.gif)

## Lista de Acciones Everywhere

| Acción | Descripción | Casos de Uso de Ejemplo |
| --- | --- | --- |
| Play Animation on Click | Reproduce un estado de animación seleccionado de un Animator. Después de reproducir, opcionalmente puede hacer una transición a otra animación. | Presentaciones de productos, tutoriales interactivos, movimiento de personajes |
| Change Material on Click | Cambia un material por otros. Todos los objetos con ese material se cambiarán juntos. | Configuradores de productos, personajes |
| Look At | Hace que un objeto mire a la cámara. | Elementos de interfaz de usuario (UI), sprites, infografías, efectos de billboard, puntos interactivos |
| Play Audio on Click | Reproduce un clip de audio seleccionado. | Efectos de sonido, Narración, Exposiciones de museo |
| Hide on Start | Oculta un objeto al inicio de la escena para revelarlo más tarde. |
| Set Active on Click | Muestra u oculta objetos. |  |
| Change Transform on Click | Mueve, rota o escala un objeto. Permite movimiento absoluto o relativo. | Personajes, productos, animación de UI (usa animación para movimientos más complejos) |
| Audio Source | Reproduce audio al inicio y se mantiene en bucle. Espacial o no espacial | Música de fondo, sonidos ambientales |
| WebXR Image Tracking | Rastrea un objetivo de imagen y muestra u oculta objetos. | Experiencias AR, presentaciones de productos |

## Muestras

### Instrumento Musical

Demuestra audio espacial, animación e interacciones.

<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Controladores de Personajes Simples

Demuestra la combinación de animaciones, look at y movimiento.

<sample src="https://engine.needle.tools/samples-uploads/usdz-characters" />

### Seguimiento de Imagen

Demuestra cómo adjuntar contenido 3D a un marcador de imagen personalizado. Inicia la escena a continuación en AR y apunta la cámara de tu teléfono al marcador de imagen en una pantalla, o imprímelo.

:::info WebXR Image Tracking on Android
**En Android** por favor, activa "WebXR Incubations" en las Chrome Flags. Puedes encontrarlas pegando [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) en la barra de direcciones del navegador Chrome de tu teléfono Android.
:::

[Leer más sobre el Seguimiento de Imagen con Needle Engine](./webxr-image-tracking.md)

<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Marcador de Imagen" width=300 />

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />

### Visión General de Bloques de Construcción Interactivos

<sample src="https://engine.needle.tools/samples-uploads/usdz-interactivity" />

## Crea tus propias Acciones Everywhere

La creación de nuevas Acciones Everywhere implica escribir código para tu acción en TypeScript, que se utilizará en el navegador y para WebXR, y usar nuestra API TriggerBuilder y ActionBuilder para crear una configuración correspondiente para la Realidad Aumentada en iOS a través de QuickLook. Al crear acciones personalizadas, ten en cuenta que QuickLook tiene un conjunto limitado de características disponibles. Aún puedes usar cualquier código que desees para el navegador y WebXR, pero el comportamiento para QuickLook puede necesitar ser una aproximación construida a partir de los disparadores y acciones disponibles.

:::tip
A menudo, construir comportamientos específicos requiere pensar de manera innovadora y aplicar creativamente las acciones de bajo nivel disponibles. Un ejemplo sería una acción de "Tocar para Colocar" (Tap to Place): no hay raycasting o hit testing disponible en QuickLook, pero podrías cubrir el área de colocación esperada con una serie de objetos invisibles y usar un disparador "Tap" para mover el objeto a colocar a la posición del objeto invisible tocado.
:::

Los Triggers y Actions para QuickLook se basan en los [Esquemas USD Interactivos Preliminares de Apple](https://developer.apple.com/documentation/arkit/usdz_schemas_for_ar/actions_and_triggers)

### Ejemplo de Código

Aquí tienes la implementación de `HideOnStart` como ejemplo de cómo crear una Everywhere Action con implementaciones tanto para el navegador como para QuickLook:
@[code ts twoslash](@code/component-everywhere-action-hideonstart.ts)

:::tip
A menudo, para obtener el comportamiento correcto, será necesario componer *acciones de nivel superior* a partir de las *acciones de nivel inferior* disponibles. Por ejemplo, nuestra acción "Change Material on Click" (Cambiar Material al hacer Clic) se compone de varias `fadeActions` y duplica internamente objetos con diferentes conjuntos de materiales. Construyendo cuidadosamente estas acciones, se pueden lograr comportamientos complejos.
:::

### Métodos de bajo nivel para construir tus propias acciones

| Disparadores | |
| --- | --- |
| `TriggerBuilder.sceneStartTrigger` | |
| `TriggerBuilder.tapTrigger` | |

| Acciones | |
| --- | --- |
| `ActionBuilder.fadeAction` | |
| `ActionBuilder.startAnimationAction` | |
| `ActionBuilder.waitAction` | |
| `ActionBuilder.lookAtCameraAction` | |
| `ActionBuilder.emphasize` | |
| `ActionBuilder.transformAction` | |
| `ActionBuilder.playAudioAction` | |

|  Acciones de Grupo | |
| --- | --- |
| `ActionBuilder.sequence` | |
| `ActionBuilder.parallel` | |
| `GroupAction.addAction` | |
| `GroupAction.makeParallel` | |
| `GroupAction.makeSequence` | |
| `GroupAction.makeLooping` | |
| `GroupAction.makeRepeat` | |

Para ver la implementación de nuestras Acciones Everywhere integradas, por favor, echa un vistazo a `src/engine-components/export/usdz/extensions/behavior/BehaviourComponents.ts`.

## Referencias
- [Comportamientos USD Preliminares de Apple](https://developer.apple.com/augmented-reality/quick-look/)

## Lecturas adicionales

- [Visita nuestro Sitio Web de Exhibición AR](https://engine.needle.tools/projects/ar-showcase/) que tiene muchos ejemplos AR interactivos con un enfoque en iOS AR & QuickLook
- [Muestras de Acciones Everywhere de Needle Engine](https://engine.needle.tools/samples/?overlay=samples&tag=everywhere+actions)
- [Seguimiento de Imagen con Needle Engine](./webxr-image-tracking.md)


Página traducida automáticamente usando IA