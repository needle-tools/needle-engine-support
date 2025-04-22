---
title: Ejemplos de scripting
description: Una colección de fragmentos y ejemplos de scripts útiles.
---

# Ejemplos de scripting

Si eres nuevo en scripting, **recomendamos encarecidamente** leer primero las siguientes guías:

- [Guía para principiantes: Fundamentos de Typescript](./getting-started/typescript-essentials.md)
- [Guía para principiantes: Needle Engine para desarrolladores de Unity](./getting-started/for-unity-developers.md)
- [Tutorial en vídeo: Cómo escribir componentes personalizados](https://youtu.be/uf5UK0bLHlY?si=82U_2L4n2V7XL7RJ)

A continuación, encontrarás algunos scripts básicos como referencia rápida.

También ofrecemos muchas escenas de ejemplo y proyectos completos que puedes descargar y usar como punto de partida:
- [Visitar sitio web de ejemplos](https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=scripting_examples)
- [Descargar paquete de ejemplos](https://engine.needle.tools/downloads/unity/samples)
- [Colección Stackblitz de Needle Engine](https://stackblitz.com/@marwie/collections/needle-engine)
- [API de Needle Engine](https://engine.needle.tools/api)

## Componente básico
<stackblitz file="@code/basic-component.ts"></stackblitz>
@[code ts twoslash](@code/basic-component.ts)

consulta [scripting](scripting#lifecycle-methods) para todos los eventos de componente

## Referenciar un Objeto desde Unity
@[code ts twoslash](@code/component-object-reference.ts)

## Referenciar y cargar un asset desde Unity (Prefab o SceneAsset)
@[code ts twoslash](@code/component-prefab.ts)

## Referenciar y cargar escenas desde Unity
::: tip
Encuentra un [ejemplo funcional en nuestros ejemplos](https://engine.needle.tools/samples/multi-scenes-(dynamic-loading)) para descargar y probar
:::

@[code ts twoslash](@code/component-scene.ts)

## Recibir Clicks en Objetos
Añade este script a cualquier objeto en tu escena que quieras que sea clickeable. Asegúrate de tener también un componente `ObjectRaycaster` en la jerarquía padre de ese objeto.

<stackblitz file="@code/component-click.ts">
test
</stackblitz>

@[code ts twoslash](@code/component-click.ts)


## Networking de Clicks en Objetos

Añade este script a cualquier objeto en tu escena que quieras que sea clickeable. Asegúrate de tener también un componente `ObjectRaycaster` en la jerarquía padre de ese objeto.
El componente enviará el click recibido a todos los clientes conectados y generará un evento al que podrás reaccionar en tu aplicación. Si usas Unity o Blender, puedes simplemente asignar funciones para llamar al evento `onClick` para, por ejemplo, reproducir una animación u ocultar objetos.

@[code ts twoslash](@code/component-click-networking.ts)

### Reproducir Animación al hacer click
@[code ts twoslash](@code/component-animation-onclick.ts)

## Referenciar un Animation Clip
Esto puede ser útil si quieres ejecutar tu lógica de animación personalizada.
También puedes exportar un array de clips.
@[code ts twoslash](@code/component-animationclip.ts)


## Crear e invocar un UnityEvent

@[code ts twoslash](@code/component-unityevent.ts)
::: tip
Los eventos de EventList también se invocan a nivel de componente. Esto significa que también puedes suscribirte al evento declarado anteriormente usando ``myComponent.addEventListener("my-event", evt => {...})``.
Esta es una característica experimental. Por favor, proporciona feedback en nuestro [forum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)
:::


### Declarar un tipo de evento personalizado
Esto es útil cuando quieres exponer un evento a Unity o Blender con argumentos personalizados (como una cadena de texto).
@[code ts twoslash](@code/component-customevent.ts)

_Ejemplo de uso:_
![20221128-210735_Unity-needle](https://user-images.githubusercontent.com/2693840/204370950-4c89b877-90d7-4e6f-8266-3352e6da16f4.png)

## Usar objetos anidados y serialización

Puedes anidar objetos y sus datos. Con los decoradores `@serializable(SomeType)` correspondientes, los datos se serializarán y deserializarán en los tipos correctos automáticamente.

En tu componente Typescript:
@[code ts twoslash](@code/component-nested-serialization.ts)

En C# en cualquier script:
@[code](@code/component-nested-serialization-cs.cs)

::: tip
Sin los decoradores de tipo correctos, seguirás obteniendo los datos, pero solo como un objeto plano. Esto es útil al portar componentes, ya que tendrás acceso a todos los datos y podrás añadir tipos según sea necesario.
:::

## Usar Web APIs
::: tip
¡Ten en cuenta que sigues teniendo acceso a todas las web apis y paquetes [npm](https://npmjs.org)!
Esa es la belleza de Needle Engine, si se nos permite decirlo aquí 😊
:::

### Mostrar ubicación actual
@[code ts twoslash](@code/component-location.ts)

### Mostrar hora actual usando una Coroutine
@[code ts twoslash](@code/component-time.ts)

<video-embed src="./videos/component-time.mp4" limit_height />


## Cambiar propiedad de shader personalizado

Asumiendo que tienes un shader personalizado con un nombre de propiedad `_Speed` que es un valor float, así es como lo cambiarías desde un script. Puedes encontrar un [ejemplo funcional para descargar en nuestros ejemplos](https://engine.needle.tools/samples/shaders/)

<!-- SAMPLE modify custom shader material property -->


## Cambiar atributo src

Ver [ejemplo funcional](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html) en StackBlitz


## Añadir nuevos efectos de postprocesado

Asegúrate de instalar [`npm i postprocessing`](https://github.com/pmndrs/postprocessing) en tu proyecto web. Luego puedes añadir nuevos efectos derivando de `PostProcessingEffect`.

Para usar el efecto, añádelo al mismo objeto que tu componente `Volume`.

Aquí tienes un ejemplo que envuelve el [efecto de postprocesado Outline](https://pmndrs.github.io/postprocessing/public/demo/#outline). Puedes exponer variables y configuraciones como de costumbre, ya que cualquier efecto es también simplemente un componente en tu escena de three.js.

@[code](@code/custom-post-effect.ts)


## Comportamiento de ParticleSystem personalizado


@[code ts twoslash](@code/custom-particle-system-behaviour.ts)


## Componente de audio 2D personalizado

Este es un ejemplo de cómo podrías crear tu propio componente de audio.
Sin embargo, para la mayoría de los casos de uso, puedes usar el componente principal AudioSource y no tener que escribir código.

@[code ts twoslash](@code/component-2d-audio.ts)


## Archivos externos arbitrarios

Usa el tipo FileReference para cargar archivos externos (por ejemplo, un archivo json)
@[code ts twoslash](@code/component-filereference.ts)

<!-- SAMPLE receive click from HTML button
## Recibir click de elemento html en componente
-->



<!-- SAMPLE disable environment light
## Deshabilitar luz ambiental
-->


<!-- SAMPLE using mediapipe with hands
## Usar paquete mediapipe para controlar la escena 3D con las manos
Asegúrate de instalar el paquete mediapipe. Visita el enlace de github a continuación para ver la configuración completa del proyecto.
Probarlo [aquí en vivo](https://engine.needle.tools/samples/mediapipe-hands/) - requiere una webcam/cámara
-->


<!-- SAMPLE Change Color On Collision
## Cambiar color al colisionar
-->

<!-- SAMPLE Physics Trigger Relay
## Relé de Physics Trigger
Invocar eventos usando los métodos physics trigger de un objeto
-->

<!-- SAMPLE Auto Reset
## Auto Reset
Restablecer la posición de un objeto automáticamente cuando sale de un physics trigger
-->

<!-- SAMPLE Play Audio On Collision
## Reproducir Audio al Colisionar
-->

<!-- SAMPLE Set Random Color
## Establecer Color Aleatorio
Aleatorizar el color de un objeto al inicio. Ten en cuenta que los materiales se clonan en el método `start`
-->

<!-- SAMPLE Timed Spawn
## Generar objetos a lo largo del tiempo
-->

Página traducida automáticamente usando IA