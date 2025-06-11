---
title: Componentes principales de Needle
---

# Componentes principales de Needle

Aquí tienes una descripción general de algunos de los componentes que proporcionamos. Muchos de ellos se corresponden con componentes y funcionalidades de Unity, Blender u otras integraciones.

Para ver la lista completa, consulta nuestra [documentación API](https://engine.needle.tools/docs/api/latest).

Siempre puedes añadir tus propios componentes o añadir wrappers para componentes de Unity que aún no hemos proporcionado.

Obtén más información en la sección de [Scripting](./scripting.md) de nuestra documentación.

## Audio
| Nombre | Descripción |
| ------------- | ------------- |
| `AudioListener` | |
| `AudioSource` | Úsalo para reproducir audio |

## Animación
| Nombre | Descripción |
| ------------- | ------------- |
| `Animator` con `AnimatorController` | Exporta con máquina de estados de animación, condiciones, transiciones |
| `Animation` | El componente de animación más básico. Solo se exporta el primer clip |
| `PlayableDirector` con `TimelineAsset` | Exporta secuencias potentes para controlar la animación, el audio, el estado y más |

## Renderizado
| Nombre | Descripción |
| ------------- | ------------- |
| `Camera` | |
| `Light` | DirectionalLight, PointLight, Spotlight. Ten en cuenta que también puedes usarlo para hornear luz (por ejemplo, formas de luz rectangulares) |
| `XRFlag` | Controla cuándo serán visibles los objetos. Por ejemplo, solo habilita el objeto cuando está en AR |
| `DeviceFlag` | Controla en qué dispositivo serán visibles los objetos |
| `LODGroup` | |
| `ParticleSystem` | Experimental y actualmente no totalmente compatible |
| `VideoPlayer` | Reproducción de videos desde url o archivo de video referenciado (se copiará a la salida al exportar). El VideoPlayer también admite streaming desde objetos MediaStream o URLs de transmisión en vivo `M3U8` |
| `MeshRenderer` | Se usa para manejar el renderizado de objetos, incluyendo mapeado de luz e instanciación |
| `SkinnedMeshRenderer` | *Ver MeshRenderer* |
| `SpriteRenderer` | Se usa para renderizar Sprites y Spriteanimations |
| `Volume` con asset `PostProcessing` | Ver [tabla a continuación](#postprocessing) |

### Postprocesado

Los efectos de postprocesado utilizan la [librería pmndrs postprocessing](https://www.npmjs.com/package/postprocessing) internamente. Esto significa que también puedes añadir fácilmente tus propios efectos personalizados y obtener un pase de postprocesado automáticamente optimizado.

- **Solo Unity**: *Ten en cuenta que los efectos de postprocesado que usan un Volume en Unity solo son compatibles con URP*

| Nombre del Efecto | |
| --- | --- |
| Antialiasing | *Componente extra de Unity* |
| Bloom | *mediante asset Volume* |
| Aberración Cromática | *mediante asset Volume* |
| Ajustes de Color / Corrección de Color | *mediante asset Volume* |
| Profundidad de Campo | *mediante asset Volume* |
| Viñeta | *mediante asset Volume* |
| ToneMappingEffect | *mediante asset Volume o componente separado* |
| Pixelación | |
| Screenspace Ambient Occlusion N8 | |
| Screenspace Ambient Occlusion | |
| Efecto Tilt Shift | |
| Efecto de Enfoque | |
| *Tu efecto personalizado* | [Ver ejemplo en stackblitz](https://stackblitz.com/edit/needle-engine-custom-postprocessing-effect) |

## Redes
| Nombre | Descripción |
| ------------- | ------------- |
| `SyncedRoom` | Componente principal de red. Ponlo en tu escena para habilitar las redes |
| `Networking` | Se usa para configurar el servidor backend para redes. |
| `SyncedTransform` | Sincroniza automáticamente la transformación de objetos |
| `SyncedCamera` | Sincroniza automáticamente la posición y vista de la cámara a otros usuarios en la sala. Puedes definir cómo se renderiza la cámara referenciando un objeto |
| `WebXRSync` | Sincroniza avatares WebXR (AR y VR) |
| `Voip` | Habilita el chat de voz |
| `Screensharing` | Habilita las capacidades de compartir pantalla |

## Interacción
| Nombre | Descripción |
| ------------- | ------------- |
| `EventSystem` | Maneja la activación de eventos de puntero y eventos de UI en objetos de la escena |
| `ObjectRaycater` | Requerido para DragControls y Duplicatable |
| `GraphicsRaycaster` | Igual que ObjectRaycaster pero para elementos UI |
| `DragControls` | Permite que los objetos sean arrastrados en la escena. Requiere un raycaster en la jerarquía padre, por ejemplo, ObjectRaycater |
| `Duplicatable` | Puede duplicar objetos asignados arrastrando. Requiere DragControls |
| `Interactable` | Componente básico para marcar un objeto como interactuable. |
| `OrbitControls` | Añade a la cámara para añadir la funcionalidad de control de órbita de la cámara |
| `SmoothFollow` | Permite interpolar suavemente a la transformación de otro objeto |
| `DeleteBox` | Destruirá objetos con el componente `Deletable` al entrar en la caja |
| `Deletable` | El GameObject al que se adjunta este componente será eliminado cuando entre o interseccione con un `DeleteBox` |
| `DropListener` | Añade para recibir eventos de arrastrar y soltar archivos para subir |
| `SpatialTrigger` | Úsalo para activar un evento si un objeto entra en un espacio o área específica. También puedes usar eventos de Physics |
| `SpatialTriggerReceiver` | Úsalo para recibir eventos de SpatialTrigger |

## Física

La física se implementa usando [Rapier](https://rapier.rs/).

| Nombre | Descripción |
| ------------- | ------------- |
| `Rigidbody` | Añade para hacer que un objeto reaccione a la gravedad (o sea cinemático y estático) |
| `BoxCollider` | Una forma de colisionador de caja con la que los objetos pueden colisionar o activar eventos trigger cuando se establece a `trigger` |
| `SphereCollider` | *Ver BoxCollider* |
| `CapsuleCollider` | *Ver BoxCollider* |
| `MeshCollider` | *Ver BoxCollider* |
| Physics Materials | Los Physics Materials se pueden usar para definir, por ejemplo, la elasticidad de un colisionador |

## XR / WebXR

[Lee la documentación de XR](xr.md)

| Nombre | Descripción |
| ------------- | ------------- |
| `WebXR` | Añade a la escena para soporte de VR, AR y Passthrough, así como para renderizar modelos de Avatares |
| [`USDZExporter`](./everywhere-actions.md) | Añade para habilitar soporte USD y Quicklook |
| `XRFlag` | Controla cuándo son visibles los objetos, por ejemplo, solo en VR o AR o solo en ThirdPerson |
| `WebARSessionRoot` | Maneja la colocación y escala de tu escena en modo AR |
| `WebARCameraBackground` | Añade para acceder a la imagen de la cámara AR y aplicar efectos o usarla para renderizar |
| `WebXRImageTracking` | Asigna imágenes para ser rastreadas y opcionalmente instancia un objeto en la posición de la imagen |
| `WebXRPlaneTracking` | Crea mallas de plano o colliders para planos rastreados |
| `XRControllerModel` | Se puede añadir para renderizar controladores de dispositivo o modelos de mano (se crearán por defecto cuando estén habilitados en el componente WebXR) |
| `XRControllerMovement` | Se puede añadir para proporcionar movimiento predeterminado y controles de teletransporte |
| `XRControllerFollow` | Se puede añadir a cualquier objeto de la escena y configurar para seguir la mano o el controlador izquierdo o derecho |


## Depuración
| Nombre | Descripción |
| --- | --- |
| `GridHelper` | Dibuja una cuadrícula |
| `BoxGizmo` | Dibuja una caja |
| `AxesHelper` | Dibuja los ejes XYZ |
| | Nota: Cuando escribas código personalizado, puedes usar los métodos estáticos `Gizmos` para dibujar líneas y formas de depuración | |

## Entrada/Salida de Archivos en Tiempo de Ejecución
| Nombre | Descripción |
| ------------- | ------------- |
| `GltfExport` | ¡Experimental! Úsalo para exportar gltf desde el runtime web. |
| `DropListener` | Recibe eventos de arrastrar y soltar archivos para subir y sincronizar en red |

## UI

Los componentes Spatial UI se mapean desde Unity UI (Canvas, no UI Toolkit) a [three-mesh-ui](https://github.com/felixmariotto/three-mesh-ui).
La UI se puede animar.

| Nombre | Descripción |
| ------------- | ------------- |
| `Canvas` | Sistema UI de Unity. Necesita estar en modo World Space ahora mismo. |
| `Text (Legacy)` | Renderiza Text usando el componente UI Text de Unity. Se admiten fuentes personalizadas, se generará automáticamente un atlas de fuentes al exportar. Utiliza la configuración de fuente o el componente `FontAdditionalCharacters` para controlar qué caracteres se incluyen en el atlas.<br/>**Nota**: En Unity, asegúrate de usar el componente `Legacy/Text` (*TextMeshPro* no es compatible en este momento) |
| `Button` | Recibe eventos de clic - usa el evento onClick para reaccionar a él. También se puede añadir a objetos de la escena 3D.<br/>**Nota**: Asegúrate de usar el componente `Legacy/Text` en el Button (o crea el Button a través del menú contextual `UI/Legacy/Button` de Unity ya que *TextMeshPro* no es compatible en este momento) |
| `Image` | Renderiza una imagen sprite |
| `RawImage` | Renderiza una textura |
| `InputField` | Permite la entrada de texto |

**Nota**: Dependiendo de tu proyecto, a menudo tiene sentido una mezcla de UI espacial y 2D para proyectos multiplataforma donde se admiten VR, AR y pantallas. Típicamente, construirías las partes 2D con HTML para una mejor accesibilidad, y las partes 3D con UIs geométricas que también admitan desfases de profundidad (por ejemplo, estados hover de botones y similares).

## Otros

| Nombre | Descripción |
| ------------- | ------------- |
| `SceneSwitcher` | Maneja la carga y descarga de otras escenas o archivos prefabs / glTF. Tiene características para precargar, cambiar de escena mediante deslizamientos, eventos de teclado o navegación por URL |


## Solo Editor
| Nombre | Descripción |
| --- | --- |
| `ExportInfo` | Componente principal para gestionar el(los) proyecto(s) web, por ejemplo, para instalar o iniciar la aplicación web |
| `EditorSync` | Añade para habilitar la sincronización de cambios de valor de materiales o componentes en la aplicación three.js en ejecución directamente desde el Editor de Unity sin tener que recargar |

Página traducida automáticamente usando IA