---
title: Seguimiento de imágenes WebXR con Needle Engine
---

## Qué es el seguimiento de imágenes WebXR
**El seguimiento de imágenes WebXR permite a los navegadores detectar y rastrear imágenes específicas en el mundo real** a través de la cámara de un dispositivo, proporcionando datos de posición y orientación en tiempo real para anclar contenido virtual con precisión a marcadores físicos como pósteres, envases u obras de arte.

Al apuntar la cámara a una imagen reconocida, la API de seguimiento de imágenes actualiza continuamente la relación espacial entre los elementos virtuales y físicos, asegurando una alineación adecuada incluso cuando el dispositivo o la imagen se mueven.

El seguimiento de imágenes transforma las imágenes estáticas en disparadores de AR interactivos, permitiendo que las pinturas de museos muestren información superpuesta, que los envases de productos revelen animaciones 3D o que las tarjetas de visita muestren detalles de contacto flotantes, todo a través de estándares web sin requerir que los usuarios descarguen aplicaciones dedicadas, haciendo que las experiencias de AR sean instantáneamente accesibles a través de cualquier navegador web compatible.

## Demo

Needle Engine es compatible con el **seguimiento de imágenes WebXR** ([Demo en vivo](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) en Android y el **seguimiento de imágenes QuickLook** en iOS.

Inicie la escena a continuación en AR y apunte la cámara de su teléfono al marcador de imagen en una pantalla, o imprímalo.

:::info Seguimiento de imágenes WebXR en Android
**En Android**, active "WebXR Incubations" en las Chrome Flags. Puede encontrarlas pegando [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) en la barra de direcciones del navegador Chrome de su teléfono Android.
:::


<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Marcador de imagen" width=300 />

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />


## Explicación


:::warning El seguimiento de imágenes WebXR todavía está en fase de "borrador" y no está disponible de forma general
Hasta ahora, los proveedores de navegadores no han logrado ponerse de acuerdo sobre la API final de seguimiento de imágenes para WebXR. Mientras la especificación esté en fase de "borrador" ([Explicación del seguimiento de marcadores](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
usted y los usuarios de su aplicación deben seguir estos pasos para habilitar el seguimiento de imágenes WebXR en dispositivos Android:
1. Visite ``chrome://flags`` en su navegador Chrome de Android
2. Busque y habilite la opción `WebXR Incubations`
:::

Sin esa especificación, aún se puede solicitar acceso a la imagen de la cámara y ejecutar algoritmos personalizados para determinar la pose del dispositivo. La desventaja es que los usuarios tendrán que aceptar permisos adicionales como el acceso a la cámara, y el seguimiento no será tan preciso como con las capacidades nativas del dispositivo.

Aquí hay algunas bibliotecas para agregar seguimiento de imágenes basado en el acceso a la cámara y algoritmos locales de visión por computadora:
   - [Integración experimental de AR.js con Needle Engine](https://github.com/FireDragonGameStudio/NeedleAndARjs) por FireDragonGameStudio
   - [AR.js](https://github.com/AR-js-org/AR.js) (código abierto)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (código abierto)


### Integraciones
El seguimiento de imágenes se puede configurar tanto en Unity como en Blender añadiendo un componente WebXRImageTracking a un objeto. Luego, añada sus imágenes al array `Tracked Images`.

![captura de pantalla de Unity](/imgs/webxr-image-tracking-unity-component.jpg)
*Componente de seguimiento de imágenes en Unity*

![captura de pantalla de Blender](/imgs/webxr-image-tracking-blender-component.jpg)
*Componente de seguimiento de imágenes en Blender*

## Referencias

- [Explicación del seguimiento de marcadores WebXR](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)
- [API de dispositivos WebXR](https://www.w3.org/TR/webxr/)
- [caniuse: WebXR](https://caniuse.com/webxr)
- [Comportamientos preliminares de USD de Apple](https://developer.apple.com/augmented-reality/quick-look/)


## Lectura adicional
- [Acciones de Needle Everywhere](./everywhere-actions.md) *experiencias que se ejecutan en todas partes*
- [Documentación de XR](./xr.md)


Página traducida automáticamente usando IA