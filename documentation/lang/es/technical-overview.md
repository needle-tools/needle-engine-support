# Resumen técnico

## Cómo funciona

Needle Engine se compone a grandes rasgos de tres partes:
- una serie de **componentes y herramientas** que permiten configurar escenas para Needle Engine, por ejemplo, desde el Unity Editor.
- un **exportador** que convierte los datos de la escena y los componentes a glTF.
- un **runtime web** que carga y ejecuta los archivos glTF producidos y sus extensiones.

El runtime web utiliza three.js para el renderizado, añade un sistema de componentes sobre el grafo de escena de three y conecta cargadores de extensiones para nuestras extensiones glTF personalizadas.

Efectivamente, esto convierte herramientas como Unity o Blender en potentes centros de desarrollo web espacial, añadiendo assets glTF al flujo de trabajo típico de HTML, CSS, JavaScript y bundling.

## Assets glTF

Modelos, texturas, animaciones, luces, cámaras y más se almacenan como [archivos glTF 2.0](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) en Needle Engine.
Los datos personalizados se almacenan en [extensiones de proveedor](#extensiones-gltf-específicas-del-proveedor-needle_). Estas cubren todo, desde componentes interactivos hasta física, secuenciación y lightmaps.

### Extensiones glTF compatibles

Un glTF de producción típico creado por Needle Engine utiliza las siguientes extensiones:
```
KHR_lights_punctual
KHR_materials_unlit
KHR_texture_transform
KHR_animation_pointer
NEEDLE_techniques_webgl
NEEDLE_gameobject_data
NEEDLE_components
NEEDLE_persistent_assets
NEEDLE_lightmaps
NEEDLE_lighting_settings
KHR_texture_basisu
KHR_draco_mesh_compression
```

Otras extensiones compatibles:
```
EXT_meshopt_compression
EXT_mesh_gpu_instancing (import and export)
```

Extensiones de materiales compatibles:

```
KHR_materials_clearcoat
KHR_materials_ior
KHR_materials_specular
KHR_materials_transmission
KHR_materials_iridescence
KHR_materials_unlit
KHR_materials_volume
```

Se pueden añadir más extensiones y extensiones personalizadas utilizando los callbacks de exportación de UnityGLTF (aún no documentado) y las [extensiones de importación glTF](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) de three.js.

> **Nota**: Los materiales que utilizan estas extensiones pueden exportarse desde Unity a través del material `PBRGraph` de UnityGLTF.

> **Nota**: El audio y las variantes ya son compatibles en Needle Engine a través de `NEEDLE_components` y `NEEDLE_persistent_assets`, pero existen algunas opciones para una mayor alineación con las propuestas existentes, como `KHR_audio` y `KHR_materials_variants`.

[Más información sobre la carga de GLTF en three.js](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)

### Compresión

Para la producción, comprimimos los assets glTF con [`glTF-transform`](https://gltf-transform.donmccurdy.com/). Las texturas utilizan `etc1s`, `uastc`, `webp` o ninguna compresión, dependiendo del tipo de textura. Las mallas utilizan `draco` por defecto, pero se pueden configurar para usar `meshtopt` (por archivo glTF). Las extensiones personalizadas se pasan de forma opaca.

Consulte la página de [implementación y compresión](./deployment.md#optimization-and-compression-options) para obtener más información.

## Extensiones glTF específicas del proveedor (NEEDLE_*)

Needle Engine almacena datos personalizados en archivos glTF a través de nuestras extensiones de proveedor. Estas extensiones están diseñadas para ser flexibles y permitir introducir datos relativamente arbitrarios en ellas. Es importante destacar que no se almacena código en estos archivos. Los componentes interactivos se restauran a partir de los datos en tiempo de ejecución. Esto tiene algunas similitudes con la forma en que funcionan los AssetBundles en Unity: el lado receptor de un asset necesita tener el código coincidente para los componentes almacenados en el archivo.

> Actualmente no proporcionamos esquemas para estas extensiones, ya que todavía están en desarrollo. Los fragmentos JSON que se muestran a continuación demuestran el uso de extensiones mediante ejemplos e incluyen notas sobre las elecciones arquitectónicas y lo que podemos cambiar en futuras versiones.

> Las referencias entre datos se construyen actualmente a través de una mezcla de índices a otras partes del archivo glTF y punteros JSON. Podríamos consolidar estos enfoques en una versión futura. También almacenamos GUIDs basados en cadenas para casos en los que el orden es difícil de resolver de otra manera (por ejemplo, dos componentes que se referencian mutuamente) que podríamos eliminar en el futuro.

### NEEDLE_components

Esta extensión contiene datos de componentes por nodo. Los nombres de los componentes se corresponden con nombres de tipo tanto en el lado JavaScript como en el C#.
Se pueden añadir varios componentes con el mismo nombre al mismo nodo.

Los datos en `NEEDLE_components` pueden ser animados a través de la extensión [`KHR_animation_pointer`](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer), que actualmente no está ratificada.

```json
"NEEDLE_components": {
  "builtin_components": [
    {
      "name": "WebARSessionRoot",
      "guid": "1516450550",
      "arScale": 50,
      "invertForward": true,
      "enabled": true,
      "gameObject": {
        "node": 0
      }
    },
    {
      "name": "SyncedRoom",
      "guid": "1516450552",
      "roomName": "network-room",
      "urlParameterName": "room",
      "joinRandomRoom": true,
      "requireRoomParameter": false,
      "autoRejoin": true,
      "enabled": true,
      "gameObject": {
        "node": 0
      }
    },
    {
      "name": "PlayableDirector",
      "guid": "2243275882009986562_1668529989451832962",
      "state": 0,
      "extrapolationMode": 1,
      "playableAsset": "extensions/NEEDLE_persistent_assets/4",
      "playableGraph": {},
      "playOnAwake": true,
      "timeUpdateMode": 0,
      "time": 0,
      "initialTime": 0,
      "duration": 135.383333333332,
      "enabled": true,
      "gameObject": {
        "node": 0
      }
    }
  ]
}
```

> **Nota**: Almacenar solo el nombre del tipo de componente significa que actualmente los nombres de tipo deben ser únicos por proyecto. Estamos planeando incluir nombres de paquete en una versión futura para flexibilizar esta restricción a nombres de tipo de componente únicos por paquete en lugar de globalmente.

> **Nota**: Actualmente no hay información de versionado en la extensión (a qué paquete npm pertenece un componente, contra qué versión de ese paquete se exportó). Estamos planeando incluir información de versionado en una versión futura.

> **Nota**: Actualmente, todos los componentes están en el array `builtin_components`. Podríamos renombrar esto a simplemente `components` en una versión futura.

### NEEDLE_gameobject_data

Esta extensión contiene datos adicionales por nodo relacionados con el estado, las capas y las etiquetas. Las capas se utilizan tanto para el renderizado como para la física, de forma similar a como las manejan [three.js](https://threejs.org/docs/#api/en/core/Layers) y [Unity](https://docs.unity3d.com/Manual/Layers.html).

```json
"NEEDLE_gameobject_data": {
  "layers": 0,
  "tag": "Untagged",
  "hideFlags": 0,
  "static": false,
  "activeSelf": true,
  "guid": "1516450549"
}
```

> **Nota**: Es posible que necesitemos explicar mejor por qué esto no es otra entrada en [`NEEDLE_components`](#needle_components).

### NEEDLE_lighting_settings

Esta es una extensión raíz que define propiedades de iluminación ambiental por archivo glTF.

```json
"NEEDLE_lighting_settings": {
  "ambientMode": 0,
  "ambientLight": [
    0.212,
    0.227,
    0.259,
    1
  ],
  "ambientIntensity": 1,
  "defaultReflectionMode": 0
}
```

> **Nota**: Esta extensión podría tener que definirse por escena en lugar de por archivo.

### NEEDLE_lightmaps

Esta es una extensión raíz que define un conjunto de lightmaps para el archivo glTF.

```json
"NEEDLE_lightmaps": {
  "textures": [
    {
      "pointer": "textures/20",
      "type": 1,
      "index": 0
    }
  ]
}
```

> **Nota**: En este momento, esta extensión también contiene referencias a texturas de entorno. Estamos planeando cambiar eso en una versión futura.

| Tipo de Textura | Valor |
| -- | -- |
| Lightmap | 0 |
| Environment Map  | 1 |
| Reflection Map | 2 |

La forma en que se aplican los lightmaps se define en el componente `MeshRenderer` dentro de la extensión [`NEEDLE_components`](#needle_components) por nodo:

```json
"NEEDLE_components": {
  "builtin_components": [
    {
      "name": "MeshRenderer",
      ...
      "lightmapIndex": 0,
      "lightmapScaleOffset": {
        "x": 1.00579774,
        "y": 1.00579774,
        "z": -0.00392889744,
        "w": -0.00392889744
      },
      ...
    }
  ]
}
```

> **Nota**: Podríamos cambiar eso en una versión futura y mover los datos relacionados con lightmaps a una entrada de extensión `NEEDLE_lightmap` por nodo.

### NEEDLE_persistent_assets

Los componentes en `NEEDLE_components` pueden referenciar datos a través de Punteros JSON. Los datos en `NEEDLE_persistent_assets` son a menudo referenciados varias veces por diferentes componentes y, por lo tanto, se almacenan por separado en una extensión raíz. Por diseño, siempre son referenciados por algo más (o tienen referencias entre sí), y por lo tanto no almacenan información de tipo en absoluto: son simplemente fragmentos de datos JSON y los componentes que los referencian actualmente necesitan saber qué esperan.

Ejemplos de assets/datos almacenados aquí son:
- AnimatorControllers, sus capas y estados
- PlayableAssets (timelines), sus pistas y clips incrustados
- SignalAssets
- ...

Los datos en `persistent_assets` pueden referenciar otros `persistent_assets` a través de Punteros JSON, pero por diseño no pueden referenciar `NEEDLE_components`. Esto es similar a la separación entre "Datos de escena" y "Contenido de AssetDatabase" en Unity.

```json
{
  "name": "LampionController",
  "guid": "9100000_ecab75bc7ab51a747a4c5c14236a43cd",
  "parameters": [],
  "layers": [
    {
      "name": "Base Layer",
      "stateMachine": {
        "name": "Base Layer",
        "defaultState": 0,
        "states": [
          {
            "name": "LampionFlying",
            "hash": 677739540,
            "motion": {
              "name": "LampionFlying",
              "isLooping": false,
              "guid": "7400000_c296c4d76e956b34f8b5833ba90653c1",
              "clips": [
                {
                  "node": "nodes/4",
                  "clip": "animations/0"
                },
                {
                  "node": "nodes/9",
                  "clip": "animations/6"
                },
                {
                  "node": "nodes/14",
                  "clip": "animations/12"
                }
              ]
            },
            "transitions": [
              {
                "isExit": false,
                "exitTime": 1,
                "hasFixedDuration": true,
                "offset": 0,
                "duration": 0,
                "hasExitTime": true,
                "destinationState": 0,
                "conditions": []
              }
            ]
          }
        ],
        "entryTransitions": []
      }
    }
  ]
},
{
  "name": "TrongCom Website",
  "guid": "11400000_93a8f856fe26af8498d94efe4835af36",
  "tracks": [
    {
      "name": "Markers",
      "type": "MarkerTrack",
      "muted": false,
      "outputs": [
        null
      ],
      "clips": [],
      "markers": [],
      "trackOffset": null
    },
    {
      "name": "Animation Track",
      "type": "AnimationTrack",
      "muted": false,
      "outputs": [
        "5017454109690854928_1668529989451832962"
      ],
      "clips": [
        {
          "start": 0,
          "end": 0.9833333333333333,
          "duration": 0.9833333333333333,
          "timeScale": 1,
          "asset": {
            "clip": "animations/78",
            "loop": false,
            "duration": 8,
            "position": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "rotation": {
              "x": 0,
              "y": 0,
              "z": 0,
              "w": 1
            },
            "removeStartOffset": true
          },
          "clipIn": 0,
          "easeInDuration": 0,
          "easeOutDuration": 0.41666666666666663,
          "preExtrapolationMode": 1,
          "postExtrapolationMode": 1
        },
        ...
      ]
    }
  ]
}
```

> **Nota**: Podríamos incluir más información de tipo y versionado en el futuro.

### NEEDLE_techniques_webgl

Esta extensión se basa en la extensión [`KHR_techniques_webgl`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Archived/KHR_techniques_webgl), que ya no se mantiene, y la extiende en algunos puntos cruciales. Aunque la extensión original se especificó para WebGL 1.0, la estamos utilizando con WebGL 2.0 y hemos añadido una serie de tipos de uniformes.

```json
"KHR_techniques_webgl": {
  "programs": [
    {
      "vertexShader": 1,
      "fragmentShader": 0,
      "id": 0
    }
  ],
  "shaders": [
    {
      "name": "Pass-FRAGMENT",
      "type": 35632,
      "uri": "<embedded WebGL fragment shader code ...>",
      "id": 1
    },
    {
      "name": "Pass-VERTEX",
      "type": 35633,
      "uri": "<embedded WebGL vertex shader code ...>",
      "id": 0
    }
  ],
  "techniques": [
    {
      "program": 0,
      "attributes": {},
      "uniforms": {
        "_TimeParameters": {
          "name": "_TimeParameters",
          "type": 35666,
          "semantic": null,
          "count": 1,
          "node": 0
        },
        "hlslcc_mtx4x4unity_MatrixVP": {
          "name": "hlslcc_mtx4x4unity_MatrixVP",
          "type": 35666,
          "semantic": "_VIEWPROJECTION",
          "count": 4,
          "node": 0
        }
      },
      "defines": []
    }
  ]
}
```

> **Nota**: Actualmente, los shaders de vértices y fragmentos siempre están incrustados como URI; planeamos mover esos datos a bufferViews más razonables en el futuro.

> **Nota**: Aquí hay algunas propiedades redundantes que planeamos limpiar.

## TypeScript y Mapeo de Datos

> 🏗️ En Construcción

## Renderizado con three.js

> 🏗️ En Construcción

## ¿Por qué no compilan a WebAssembly?

Aunque el proceso de compilación de Unity de C# a IL a C++ (a través de IL2CPP) a WASM (a través de emscripten) es ingenioso, también es relativamente lento. Construir incluso un proyecto simple a WASM lleva muchos minutos, y ese proceso se repite prácticamente con cada cambio de código. Algo de eso se puede evitar a través de un almacenamiento en caché inteligente y asegurándose de que las builds de desarrollo no intenten eliminar tanto código, pero aún así sigue siendo lento.
> Tenemos un prototipo para alguna traducción a WASM, pero está lejos de estar completo y la velocidad de iteración sigue siendo lenta, por lo que no estamos investigando activamente este camino en este momento.

Al examinar los flujos de trabajo web modernos, descubrimos que los tiempos de recarga de código durante el desarrollo son despreciables, generalmente en rangos inferiores al segundo. Esto, por supuesto, cambia algo de rendimiento (interpretación de JavaScript sobre la marcha en lugar de optimización del compilador en tiempo de construcción) por flexibilidad, pero los navegadores se han vuelto muy buenos en sacar el máximo provecho de JavaScript.

Creemos que para la iteración y los flujos de trabajo de prueba estrictos, es beneficioso poder probar en el dispositivo y en la plataforma de destino (el navegador, en este caso) tan rápido y tan a menudo como sea posible, por lo que estamos omitiendo todo el modo Play de Unity, ejecutándonos efectivamente siempre en el navegador.

> **Nota**: Un efecto secundario realmente agradable es evitar el paso lento de "recarga de dominio" que generalmente cuesta entre 15 y 60 segundos cada vez que se entra en el modo Play. Simplemente estás "en vivo" en el navegador en el momento en que presionas Play.

Página traducida automáticamente usando IA