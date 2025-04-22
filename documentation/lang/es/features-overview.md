# Resumen de Características

Needle Engine es un motor 3D completo que se ejecuta en el navegador. Viene con todas las características que esperarías de un motor 3D moderno, y más. Si aún no lo has hecho, echa un vistazo a nuestra [Página de Inicio](https://needle.tools) y a nuestros [Ejemplos y Demostración](https://engine.needle.tools/samples).

[[toc]]

## Shaders y Materiales

Tanto los Materiales PBR como los shaders personalizados creados con Shader Graph u otros sistemas pueden ser exportados.

<img src="https://user-images.githubusercontent.com/5083203/186012027-9bbe3944-fa56-41fa-bfbb-c989fa87aebb.png" />

Usa [ShaderGraph](https://unity.com/features/shader-graph), basado en nodos, para crear shaders para la web. ShaderGraph facilita a los artistas seguir creando sin tener que preocuparse por la sintaxis.

Lee más sobre [Materiales PBR](./export.md#physically-based-materials-pbr) • [Shaders Personalizados](./export.md#custom-shaders)

## Multiplataforma: VR, AR, Móvil, Escritorio
Needle Engine se ejecuta dondequiera que lo haga la tecnología web: ejecuta la misma aplicación en escritorio, móvil, AR o VR. Construimos Needle Engine [pensando en XR](./xr.md) y consideramos esto como una parte integral del diseño web responsive.

Usa [Everywhere Actions](./everywhere-actions.md) para **AR Interactiva tanto en Android como en iOS**.


## Lightmaps

![lightmaps](https://user-images.githubusercontent.com/5083203/186163693-093c7ae2-96eb-4d75-b98f-bf19f78032ff.gif)

Los Lightmaps se pueden hornear (bake) en Unity o Blender para añadir fácilmente una hermosa luz estática a tu contenido 3D. El horneado de luces para la web nunca fue tan fácil. Simplemente marca los objetos que quieres lightmap como estáticos en Unity, añade una o muchas luces a tu escena (o usa materiales emisivos) y haz clic en hornear. Needle Engine exportará tus lightmaps por escena y los cargará y mostrará automáticamente tal como los ves en el Editor.

> **Nota**: No hay limitación técnica sobre qué lightmapper usar, siempre que terminen en las estructuras de datos de lightmapping de Unity. Por lo tanto, también se admiten lightmappers de terceros como [Bakery](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218).

- Lee más sobre [Exportar Lightmaps](https://fwd.needle.tools/needle-engine/docs/lightmaps)

## Multijugador y Networking
El Networking está integrado en el runtime central. Las implementaciones de Needle Engine en Glitch vienen con un pequeño servidor que te permite desplegar un entorno 3D multijugador en segundos. Los componentes de red integrados facilitan el inicio, y puedes crear tus propios componentes sincronizados. ¡Sincronizar variables y estados es súper fácil!

- Lee más sobre [Networking](https://fwd.needle.tools/needle-engine/docs/networking) • [Scripting](https://fwd.needle.tools/needle-engine/docs/scripting)

## Animaciones y Secuenciación
Needle Engine trae potentes animaciones, control de estado y secuenciación a la web — desde simplemente reproducir una única animación hasta orquestar y mezclar animaciones complejas y character controllers. El Exporter puede traducir componentes de Unity como Animator y Timeline a un formato listo para la web.
Incluso hemos añadido esta funcionalidad a nuestro addon de Blender para que también puedas crear máquinas de estados de animación compatibles y exportar pistas nla como timelines a la web desde Blender.

- Lee más sobre [Componentes de Animación](./component-reference.md#animation)

### Animator

<img src="https://user-images.githubusercontent.com/5083203/186011302-176524b3-e8e5-4e6e-9b77-7faf3561bb15.png" />

Los componentes [Animator y AnimatorController](https://docs.unity3d.com/Manual/class-AnimatorController.html) en Unity te permiten configurar animaciones y definir condiciones para cuándo y cómo mezclar entre ellas. Soportamos la exportación de máquinas de estados, StateMachineBehaviours, transiciones y capas. StateMachineBehaviours también son compatibles con los eventos ``OnStateEnter``, ``OnStateUpdate`` y ``OnStateExit``.

> **Nota**: Los sub-estados y los Blend Trees no son compatibles.


### Timeline

![2022-08-23-013517_Scene](https://user-images.githubusercontent.com/5083203/186037829-ee99340d-b19c-484d-b551-94797519c9d9.png)

También estamos traduciendo la configuración y las pistas de [Timeline de Unity](https://unity.com/features/timeline) a un formato listo para la web.
Las pistas soportadas incluyen: AnimationTrack, AudioTrack, ActivationTrack, ControlTrack, SignalTrack.

> **Nota**: Los Sub-Timelines actualmente no son compatibles.

> **Nota**: Es posible [exportar pistas de timeline personalizadas](https://github.com/needle-tools/needle-engine-modules/tree/main/package/TimelineHtml).

- Lee más sobre [Componentes de Animación](./component-reference.md#animation)

## Física
Usa Rigidbodies, Mesh Colliders, Box Colliders y SphereColliders para añadir algo de física jugosa a tu mundo.

- Lee más sobre [Componentes de Física](./component-reference.md#physics)

<sample src="https://engine.needle.tools/samples-uploads/physics-animation/" />

## UI
La construcción de UI utilizando el sistema UI canvas de Unity está en desarrollo. Las características actuales incluyen la exportación de Texto (incluyendo fuentes), Imágenes, Botones.

Consulta la [referencia de componentes de ui](component-reference.md#ui) para ver los componentes compatibles.

<sample src="https://engine.needle.tools/samples-uploads/screenspace-ui" />

## Partículas
La exportación del ParticleSystem (Shuriken) de Unity está en desarrollo. Las características actuales incluyen simulación en espacio mundo/local, formas de emisor de caja y esfera, emisión a lo largo del tiempo así como emisión en ráfaga, velocidad y color a lo largo del tiempo, emisión por velocidad, animación de texturasheet, trails básicos.
Consulta un [ejemplo en vivo](https://engine.needle.tools/samples/particles) de las características compatibles a continuación:

<sample src="https://engine.needle.tools/samples-uploads/particles/" />

## Postprocesado

Los efectos incorporados incluyen Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction. También puedes crear tus propios efectos personalizados. Consulta [la referencia de componentes](./component-reference.md#postprocessing) para ver una lista completa.

<sample src="https://engine.needle.tools/samples-uploads/postprocessing/" />

## Integraciones del Editor
Needle Engine viene con potentes integraciones en el Editor de Unity y Blender.
Permite configurar y exportar escenas complejas de forma visual, proporcionando una colaboración fácil y flexible entre artistas y desarrolladores.

## Scripting
Needle Engine utiliza un [flujo de trabajo basado en componentes](scripting.md#component-architecture). Crea scripts personalizados en typescript o javascript. Utiliza nuestro [flujo de trabajo modular de paquetes basado en npm](https://fwd.needle.tools/needle-engine/docs/npmdef) integrado en Unity. Un [compilador de componentes de typescript a C#](https://fwd.needle.tools/needle-engine/docs/component-compiler) produce componentes de Unity mágicamente sobre la marcha.

- Lee más sobre [Referencia de Scripting](scripting) • [Archivos de Definición Npm](https://fwd.needle.tools/needle-engine/docs/npmdef)


## Y hay más

- Postprocesado → Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction...
- EditorSync → Sincroniza la edición en vivo en Unity con la aplicación three.js en ejecución para desarrollo local
- AR Interactiva en iOS y Android → Usa nuestro conjunto de características [Everywhere Actions](./everywhere-actions.md) o construye el tuyo propio

---
# Dónde ir a continuación

Consulta nuestra [Guía de Inicio Rápido](getting-started/) para aprender a descargar y configurar Needle Engine.
Aprende sobre [nuestra visión](vision) o profundiza en algunos de los [antecedentes técnicos y glTF](technical-overview) que lo impulsan todo.


Página traducida automáticamente por IA