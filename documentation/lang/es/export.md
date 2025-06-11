---
title: Exportación de Assets a glTF
---



# Exportación de Assets, Animaciones, Prefabs, Materiales, Lightmaps...
Añada un componente ``ExportInfo`` a su escena de Unity para generar un nuevo proyecto web a partir de una plantilla, enlazar a un proyecto web existente al que desee exportar, configurar dependencias a otras librerías y paquetes y desplegar su proyecto.

Por defecto, su escena se exporta al guardar. Esta configuración puede cambiarse desactivando ``Auto Export`` en el componente ``ExportInfo``.

## 📦 Exportar archivos glTF
Para exportar meshes, materiales, animaciones, texturas (...) cree un nuevo GameObject en su Hierarchy y añádale un componente ``GltfObject``. Esta es la raíz de un nuevo archivo glTF. Se exportará cada vez que realice un cambio en la escena y guarde.

Solo los scripts y datos que están en y dentro de esos objetos raíz se exportan. Los scripts y datos fuera de ellos no se exportan.

Añada un cubo como hijo de su objeto raíz y guarde su escena. Tenga en cuenta que la carpeta de salida ``assets/`` (vea [project structure](#vite-project-structure)) ahora contiene un nuevo archivo ``.glb`` con el mismo nombre que su GameObject raíz.

Puede activar la configuración ``Smart Export`` (a través de `Edit/Project Settings/Needle`) para exportar solo cuando se detecte un cambio en la jerarquía de este objeto.

:::details Cómo evitar que se exporten objetos específicos
Los objetos con la etiqueta `EditorOnly` se ignorarán al exportar, incluida su jerarquía hija. Tenga en cuenta que esto es preferible a desactivar objetos, ya que los desactivados seguirán exportándose en caso de que se activen más tarde.
:::

### Carga perezosa (Lazy loading) y múltiples niveles / escenas

Si desea dividir su aplicación en múltiples niveles o escenas, simplemente puede usar el componente `SceneSwitcher`. Puede estructurar su aplicación en múltiples escenas o prefabs y añadirlos al array de SceneSwitcher para que se carguen y descarguen en tiempo de ejecución. Esta es una excelente manera de evitar tener que cargar todo su contenido por adelantado y mantener los tiempos de carga pequeños (por ejemplo, es lo que hicimos en [needle.tools](https://needle.tools?utm_source=needle_docs&utm_content=export_scenes) separando cada sección de nuestro sitio web en su propia escena y cargándolas solo cuando es necesario)

### Complejidad Recomendada por glTF

- Tamaño máximo de exportación sin comprimir de 50 MB (generalmente termina ~10-20 MB comprimido)
- Máx. 500k vertices (menos si también se dirige a VR móvil)
- Máx. 4 lightmaps de 2k

Puede dividir escenas y prefabs en varios archivos glTF y luego cargarlos bajo demanda (solo cuando sea necesario). Esto mantiene la velocidad de carga rápida y el tamaño de los archivos pequeño. Vea la [sección AssetReference en la documentación de Scripting](scripting.md#assetreference-and-addressables).

La complejidad de escena aquí se recomienda para garantizar un buen rendimiento en una variedad de dispositivos web y anchos de banda. No hay limitación técnica para esto más allá de las capacidades de su dispositivo.

### Prefabs
Los prefabs pueden exportarse como archivos glTF individuales e instanciarse en tiempo de ejecución. Para exportar un prefab como glTF, simplemente referencie un asset de prefab (del project browser y no en la escena) [desde uno de sus scripts](https://fwd.needle.tools/needle-engine/docs/addressables).

La exportación de Prefabs también funciona con anidamiento: un componente en un Prefab puede referenciar otro Prefab que también se exportará. Este mecanismo permite componer escenas para que sean lo más ligeras posible y cargar el contenido más importante primero, aplazando la carga de contenido adicional.

### Assets de Escena
De forma similar a los assets de Prefab, puede referenciar otros assets de Scene. Para empezar, cree un componente en Unity con un campo ``UnityEditor.SceneAsset`` y añádalo a uno de sus GameObjects dentro de un GltfObject. La escena referenciada se exportará ahora como un archivo glTF separado y se podrá cargar/deserializar como un ``AssetReference`` desde TypeScript.

Puede seguir trabajando dentro de una escena referenciada y aún así actualizar su escena/sitio web principal de exportación. Al guardar la escena o cambiar el modo de reproducción, detectaremos si la escena actual está siendo utilizada por su servidor en ejecución y activaremos una re-exportación solo para ese glb. (Esta comprobación se realiza por nombre: si existe un glb dentro de su carpeta ``<web_project>/assets/``, se exporta de nuevo y la escena principal lo recarga).

Como ejemplo en [nuestro sitio web](https://needle.tools?utm_source=needle_docs&utm_content=export_sceneassets), cada sección está configurada como una escena separada y al exportar se empaqueta en varios archivos glb que cargamos bajo demanda:

![2022-08-22-172605_Needle_Website_-_Website_-_Windows,_Mac,_Linux_-_U](https://user-images.githubusercontent.com/5083203/185958983-71913c97-5eec-4cfd-99f5-76798582373e.png)

#### Cargar un Prefab o Scene desde un script personalizado
Si desea referenciar y cargar un prefab desde uno de sus scripts, puede declarar un tipo `AssetReference`. Aquí hay un ejemplo mínimo:

@[code ts twoslash](@code/component-prefab.ts)

## 🏇 Exportación de Animaciones
Needle Engine soporta un subconjunto considerable y potente de las características de animación de Unity:

- **Timeline** incl. pistas de activación, pistas de animación, desplazamientos de pistas
- **Animator** incl. transiciones de estado de nivel superior
  - Los Blend trees no son compatibles actualmente.
  - Las Sub state machines no son compatibles actualmente.
- **AnimationClips** incl. modos de bucle
- Las **Procedural Animations** pueden crearse mediante scripting

Needle Engine es uno de los primeros en soportar la nueva [extensión glTF KHR_ANIMATION_POINTER](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer). Esto significa que casi todas las propiedades, incluidas las variables de script, son animables.

Una limitación actual es que los materiales no se duplicarán al exportar: si desea animar el mismo material con diferentes colores, por ejemplo, actualmente necesita dividir el material en dos.

## 🌍 Exportar el Skybox
El skybox de Unity y la reflexión personalizada (si la hay) se hornean en una textura al exportar y se exportan automáticamente dentro de la extensión ``NEEDLE_lightmaps``.

Para cambiar la resolución del skybox, puede añadir un componente ``SkyboxExportSettings`` a su escena.

![image](https://user-images.githubusercontent.com/5083203/196030839-170a9496-9ed9-4ebc-bc1d-2df6c746f8c8.png)


Si no desea que el skybox se exporte en absoluto en un archivo glb, puede desmarcar la opción ``Embed Skybox`` en su componente ``GltfObject``.

![image](https://user-images.githubusercontent.com/5083203/196030825-8a05037f-5acc-4795-9128-2bdacedd0d49.png)


## ✨ Exportar Materiales

### Materiales Basados Físicamente (PBR)
Por defecto, los materiales se convierten en materiales glTF al exportar. glTF soporta un modelo de material basado físicamente y tiene una serie de extensiones que ayudan a representar materiales complejos.

Para tener control total sobre lo que se exporta, es muy recomendable usar los materiales glTF proporcionados por UnityGltf:
- PBRGraph
- UnlitGraph

::: tip En caso de duda, use el shader PBRGraph
El material PBRGraph tiene muchas características, muchas más que Standard o URP/Lit. Estas incluyen características avanzadas como refracción, iridiscencia, brillo (sheen) y más. Además, los materiales que usan PBRGraph y UnlitGraph se exportan tal cual, sin necesidad de conversión.
:::

Materiales que se pueden convertir de forma predeterminada (out-of-the-box):
- BiRP/Standard
- BiRP/Autodesk Interactive
- BiRP/Unlit
- URP/Lit
- URP/Unlit

Otros materiales se convierten utilizando una heurística basada en el nombre de la propiedad. Esto significa que, dependiendo de los nombres de propiedad que usen sus materiales y shaders, quizás quiera refactorizar las propiedades de su shader personalizado para usar los nombres de propiedad de URP/Lit o PBRGraph, o exportar el material como [Custom Shader](#custom-shaders).

### Shaders Personalizados
Para exportar shaders unlit personalizados (por ejemplo, hechos con ShaderGraph), añada una etiqueta de Asset ``ExportShader`` al shader que desea exportar. Las etiquetas de Asset se pueden ver en la parte inferior de la ventana Inspector.

![2022-08-22-172029_Needle_Website_-_CustomShaders_-_Windows,_Mac,_Lin](https://user-images.githubusercontent.com/5083203/185957781-9fae18c5-09ff-490f-8958-57e138aa0003.png)

#### Limitaciones
- Actualmente solo soportamos shaders **Unlit** personalizados — La conversión de shaders Lit no está soportada oficialmente.
- Los Custom Lit Shaders son actualmente experimentales. No todos los modos de renderizado son soportados.
- La recepción de sombras en shaders personalizados no es soportada
- Los skinned meshes con shaders personalizados no son soportados
- Dado que hay múltiples cambios de sistema de coordenadas al pasar de Unity a three.js y glTF, puede que sean necesarios algunos cambios para que los efectos avanzados funcionen. Intentamos convertir los datos al exportar, pero puede que no detectemos todos los casos en los que las conversiones son necesarias.
  - Las coordenadas UV en Unity comienzan en la parte inferior izquierda; en glTF comienzan en la parte superior izquierda.
  - Los valores del eje X están invertidos en glTF en comparación con Unity. Esta es una variante de un cambio de sistema de coordenadas de zurdo a diestro. Los datos utilizados en los shaders pueden necesitar ser invertidos en el eje X para mostrarse correctamente.

::: note No forma parte de la especificación glTF
Tenga en cuenta que los **Custom Shaders** no forman parte oficial de la especificación glTF. Nuestra implementación de shaders personalizados utiliza una extensión llamada KHR_techniques_webgl, que almacena el código del shader WebGL directamente en el archivo glTF. Los assets resultantes funcionarán en visores basados en Needle Engine, pero puede que no se muestren correctamente en otros visores.
:::

## 💡 Exportar Lightmaps
![2022-08-22-171650_Needle_-_Google_Chrome](https://user-images.githubusercontent.com/5083203/185957005-d04c9530-07eb-40f5-b305-9822d13b79ab.png)

Para exportar lightmaps, simplemente [genere lightmaps](https://docs.unity3d.com/Manual/Lightmapping.html) en Unity. Los Lightmaps se exportarán automáticamente.

Cuando trabaje en varias escenas, desactive "Auto Generate" y hornee (bake) los lightmaps explícitamente. De lo contrario, Unity descartará los lightmaps temporales al cambiar de escena.

### Configuración Recomendada de Lightmap
- Codificación de Lightmap: Calidad Normal (ajuste en Project Settings > Player)
- Progressive GPU (más rápido y generalmente lo suficientemente preciso para escenas pequeñas)
- Lightmaps No Direccionales
- Tamaño Máximo de Lightmap 2k (puede ir más alto, pero espere archivos grandes)
- Máx. 4 lightmaps de 2k por escena (puede ir más alto, pero espere archivos grandes)
- Comprimir Lightmaps DESACTIVADO (aumenta la calidad; de lo contrario, se comprimirán de nuevo al exportar)

![2022-08-22-171356_Needle_Website_-_Lightmaps_-_Windows,_Mac,_Linux_-](https://user-images.githubusercontent.com/5083203/185956392-f4031f45-ad1c-c8ec5c1fcfd4.png)

### Mezclando Objetos Horneados (Baked) y No Horneados

No hay una correspondencia del 100% entre cómo Unity gestiona las luces y el entorno y cómo lo hace three.js. Por ejemplo, Unity tiene rutas de código completamente separadas para objetos con lightmaps y objetos sin lightmaps (los objetos con lightmaps no reciben luz ambiente ya que eso ya está horneado en sus mapas), y three.js no distingue de esa manera.

Esto significa que para obtener los mejores resultados, actualmente recomendamos configuraciones específicas si está mezclando objetos horneados y no horneados en una escena:
```
Environment Lighting: Skybox
Ambient Intensity: 1
Ambient Color: black
```

**2021.3+**
![20220826-175324-SqBL-Unity_pMXa-needle](https://user-images.githubusercontent.com/2693840/186947184-2446672f-420c-47e8-8f7d-970a7d52bf35.png)

**2020.3+**
![20220826-175514-tnGc-Unity_mycs-needle](https://user-images.githubusercontent.com/2693840/186947203-2d7d96c3-f566-44b4-889c-4103fac505d4.png)

Si no tiene objetos horneados en su escena, las siguientes configuraciones también deberían producir resultados correctos:
```
Environment Lighting: Color
Ambient Color: any
```


Página traducida automáticamente usando IA