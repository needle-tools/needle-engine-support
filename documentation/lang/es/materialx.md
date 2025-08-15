---
title: MaterialX
---

## MaterialX en Needle Engine

MaterialX es un estándar potente para describir materiales y sombreadores de forma basada en grafos, independiente del motor de renderizado. Permite definir materiales complejos, con múltiples capas de superficie e iluminación realista.

Es ampliamente utilizado en cine, VFX y comercio electrónico, y es compatible con muchas herramientas de autoría profesionales como Autodesk Maya y 3ds Max, Houdini, V-Ray y Omniverse.

::: tip Más información
Puedes aprender más sobre MaterialX en el [sitio web de MaterialX](https://www.materialx.org/).
:::

Los materiales creados con [**Shader Graph**](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.3/manual/index.html) de Unity pueden exportarse a archivos MaterialX automáticamente a través del **Needle MaterialX Exporter**, que forma parte de nuestro paquete de integración de Unity.

Esto te permite crear materiales complejos y con iluminación en Unity, y se exportan automáticamente junto con tu escena. La exportación de MaterialX extiende nuestra exportación existente de sombreadores Unlit, que es menos portable debido al uso de sombreadores WebGL2. Con MaterialX, estás listo para WebGPU y futuras tecnologías de renderizado, y puedes lograr materiales de alta fidelidad en tus proyectos web.

El soporte de MaterialX en Needle Engine utiliza la [librería oficial de JavaScript de MaterialX](https://github.com/materialx/MaterialX), lo que significa que los materiales se representan con la mayor fidelidad posible. Esto te permite usar cualquier archivo MaterialX.

::: info Shader Graph a MaterialX requiere un plan **Pro**, **Edu** o **Enterprise**.
El MaterialX Exporter está disponible para usuarios con planes Pro, Edu y Enterprise.
[Ver planes y precios.](https://needle.tools/pricing)
:::

## Casos de uso

MaterialX es una excelente elección si
- estás usando **materiales basados en grafos** para tus proyectos para control artístico y flexibilidad.
- necesitas **características de superficie ricas y complejas** como texturas procedurales, mapas de detalle o materiales en capas.
- tienes **materiales MaterialX existentes** que quieres mantener en toda tu pipeline de estudio.
- quieres asegurar **consistencia y compatibilidad** para tus renderizados a través de diferentes motores de renderizado.

## Habilitar el soporte de MaterialX en tu proyecto

Para habilitar el soporte de MaterialX en tu proyecto de Needle Engine, necesitas añadir el paquete `@needle-tools/materialx` a tu proyecto.

::: tabs

@tab Unity

1. Selecciona el componente Needle Engine en tu escena.

2. Encuentra la sección "NpmDef Dependencies" en el Inspector y añade una nueva dependencia aumentando el número "Size" (por ejemplo, de 0 a 1).

3. Haz clic en el símbolo del Selector de Objetos, habilita la Visibilidad del Paquete con el símbolo del ojo y selecciona el paquete `Needle MaterialX` de la lista.

   ![Encuentra y añade la dependencia del paquete MaterialX en Unity.](/materialx/add-materialx-package-dependency.jpeg)
   _Encuentra y añade la dependencia del paquete MaterialX en Unity._

Ya estás listo para usar MaterialX en tu proyecto web.

@tab Otras integraciones de Needle

1. Busca y abre tu proyecto web en un editor de código (por ejemplo, VS Code).
   [Aprende cómo abrir tu proyecto web.](./project-structure.html#opening-the-web-project-in-a-code-editor)
2. Instala el paquete Needle MaterialX desde el registro NPM en tu proyecto web.

   ```bash
   npm install @needle-tools/materialx
   ```

   Esto añadirá el paquete MaterialX a tu proyecto.

3. Si estás usando alguna de nuestras plantillas basadas en Vite, no necesitas hacer nada más. El paquete MaterialX se incluirá automáticamente en tu proyecto.

    ::: tip Si no estás seguro, ¡probablemente estés usando una de nuestras plantillas basadas en Vite!
    :::

4. Si no estás usando los plugins de Needle Vite, importa y registra MaterialX en tu archivo de entrada principal, por ejemplo en `main.ts`:

   ```ts
   import { useNeedleMaterialX } from "@needle-tools/materialx";
   useNeedleMaterialX();
   ```

Ya estás listo para usar MaterialX en tu proyecto web.

@tab three.js

Puedes usar nuestro paquete MaterialX en cualquier proyecto three.js, incluso si no estás usando Needle Engine.

1. Registra nuestro plugin `MaterialX` con tu `GLTFLoader`:

    ```ts
    import { useNeedleMaterialX } from "@needle-tools/materialx";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

    const gltfLoader = new GLTFLoader();
    
    // ... register other plugins such as DRACOLoader, KTX2Loader, etc. (registrar otros plugins como DRACOLoader, KTX2Loader, etc.)
    useNeedleMaterialX(gltfLoader);

    // ... load a file that contains MaterialX materials (cargar un archivo que contenga materiales MaterialX)
    gltfLoader.load("https://cloud.needle.tools/-/assets/Z23hmXB2qfHiF-2qfHiF/file", (gltf) => {
        scene.add(gltf.scene);
    });
    ```

2. Carga archivos GLB que contengan la extensión `NEEDLE_materials_mtlx`. El plugin cargará y aplicará automáticamente los materiales MaterialX a los objetos que los estén usando.

3. Puedes habilitar la precarga del módulo MaterialX WebAssembly llamando a `useNeedleMaterialX(gltfLoader, { preload: true })`. Esto cargará el módulo MaterialX WebAssembly por adelantado, para que esté listo cuando cargues un archivo GLB con materiales MaterialX.

Puedes encontrar un ejemplo completo de cómo usar MaterialX en un proyecto three.js en StackBlitz: [MaterialX in three.js](https://stackblitz.com/edit/needle-materialx-example?file=main.js).

:::
## Exportar materiales con soporte de MaterialX

1. Crea materiales con Shader Graph de Unity.

   ![Ejemplo de un Shader Graph complejo en Unity.](/materialx/shadergraph-example.webp)
   _Ejemplo de un Shader Graph complejo en Unity._

2. Selecciona un objeto que tenga un material basado en Shader Graph en tu escena, o selecciona el recurso de sombreador en la Vista de Proyecto.

3. En las propiedades del material, busca la sección "Needle Engine – Custom Shader Settings" y selecciona "MaterialX" como el tipo de exportación de sombreador.

    ![Habilitando el tipo de exportación MaterialX en las propiedades del material Shader Graph.](/materialx/enable-asset-label-from-material.jpeg)
    _Habilitando el tipo de exportación MaterialX en las propiedades del material Shader Graph._

3. Cuando exportes tu escena, todos los materiales que usen sombreadores con el tipo de exportación "MaterialX" se incrustarán junto con tu contenido 3D y se cargarán en tiempo de ejecución.

## Usar archivos MaterialX creados externamente

El paquete Needle MaterialX contiene soporte experimental para cargar archivos MaterialX directamente. Las texturas se pueden resolver a través de una función de callback, y los materiales se devuelven como `ShaderMaterial` de three.js.

Puedes encontrar ejemplos para trabajar con el paquete Needle MaterialX [en nuestra colección MaterialX en StackBlitz](
https://stackblitz.com/@marwie/collections/materialx).

:::: tabs
@tab Desde código

```ts
import { TextureLoader } from 'three';
import { Experimental_API } from '@needle-tools/materialx';

// Load a MaterialX file and its referenced textures from a URL (Cargar un archivo MaterialX y sus texturas referenciadas desde una URL)
function load(mtlx_url) {
    const parts = mtlx_url.split('/');
    parts.pop();
    const dir = parts.join('/');

    return fetch(mtlx_url)
    .then((res) => res.text())
    .then((mtlx) => {
        const loader = new TextureLoader();
        Experimental_API.createMaterialXMaterial(mtlx, '', {
            getTexture: async (url) => {
                return await loader.loadAsync(dir + url);
            },
        }).then((mat) => {
            console.log("MaterialX material has been loaded:", mat); // El material MaterialX ha sido cargado:
        });
    });
}
```

::: info
El método `Experimental_API.createMaterialXMaterial()` actualmente no soporta la carga de múltiples materiales, o archivos MaterialX con referencias .mtlx adicionales.
:::

::::

## Nodos y características compatibles

Needle Engine soporta la especificación completa de MaterialX, incluyendo los nodos OpenPBR, Standard Surface, UsdPreviewSurface y Unlit Surface, y también nodos NPR (renderizado no fotorrealista) como los efectos fresnel. Las definiciones anidadas de grafos de nodos y los nodos personalizados también son compatibles.

Los materiales MaterialX en Needle Engine soportan las siguientes características:
- **Iluminación basada en imágenes** (IBL) proveniente automáticamente del mapa de entorno de la escena.
- Las **Sondas de Reflexión** afectan a los objetos que usan materiales MaterialX.
- **Fuentes de luz**: Luces direccionales, puntuales y focales, con un límite actual de 8 luces por escena.
- **Compresión de texturas y texturas progresivas**. Los materiales MaterialX soportan completamente las potentes características de compresión de texturas y carga progresiva de Needle Engine, lo que te permite usar texturas grandes. Solo se cargarán cuando sea necesario y solo en la resolución requerida para la vista actual.
- **Propiedades de material animadas** para colores, flotantes, vectores. Al igual que otros materiales en Needle Engine, cualquier propiedad numérica del material puede ser animada.
- Todos los modelos de superficie MaterialX, incluyendo **OpenPBR**, **Standard Surface**, **UsdPreviewSurface** y **Unlit Surface**.

El Needle MaterialX Exporter aprovecha la estructura basada en grafos de Shader Graph de Unity para la exportación, y convierte los nodos de Shader Graph en nodedefs y nodegraphs de MaterialX. Soporta las siguientes características:
- **Propiedades del material** como colores, flotantes, vectores, texturas.
- **Operaciones** sobre números, vectores y matrices.
- **Nodos de mezcla** como Mix, Add, Multiply y Blend con varios modos de mezcla.
- **Texturas** y espacios de color.
- **Subgrafos** con uno o más niveles de anidación.
- Los **colores de vértice** son compatibles.
- Los **múltiples canales UV** son compatibles (hasta 4).
- Las **Shader Keywords** son compatibles y se exportarán como nodos switch en MaterialX.

## Versión de MaterialX compatible

Needle Engine actualmente soporta la versión 1.39.4 de MaterialX. Los documentos de MaterialX con versiones anteriores también son compatibles y se actualizarán automáticamente a la última versión.

## Limitaciones del MaterialX Exporter

No todas las características que soporta Shader Graph también son soportadas por MaterialX. Si intentas exportar un nodo no compatible, el exportador registrará un error y detendrá el proceso de exportación. Luego podrás solucionar el problema reemplazando el nodo no compatible por uno compatible, si es posible.

- **El desplazamiento de vértices aún no es compatible**: MaterialX soporta el mapeo de desplazamiento, pero Needle Engine actualmente no lo soporta. Esto significa que cualquier nodo de desplazamiento en tus archivos MaterialX será ignorado.
- **Sombras en tiempo real**: Las fuentes de luz en tu escena afectarán a los materiales MaterialX, pero las sombras en tiempo real no son compatibles actualmente.
- **Lightmaps horneados**: Los lightmaps horneados actualmente no son compatibles con los materiales MaterialX.
- **Espacio tangente** no es compatible en este momento, lo que significa que los nodos de Shader Graph que especifiquen "Tangent" como espacio se verán diferentes.
- Los **Nodos de Código** no son compatibles en este momento.

::: tip La palabra clave especial "MATERIALX"
Si tienes sombreadores complejos con nodos no compatibles, puedes usar la palabra clave "MATERIALX" para evitar exportarlos. La ruta "On" de los interruptores de palabras clave se exportará, y la ruta "Off" se ignorará para la exportación. Puedes usar esto para mantener los sombreadores con nodos personalizados o características no compatibles funcionales, pero aún así exportarlos a MaterialX.
:::

::: info Soporte MaterialX integrado en three.js
Aunque three.js tiene cierto soporte inicial para MaterialX, utiliza una implementación personalizada que no soporta muchas características del estándar, lo que lleva a una menor precisión en la representación de los materiales. Needle Engine utiliza la librería oficial de JavaScript de MaterialX, lo que significa que los materiales se representan con la mayor fidelidad posible.

Needle está contribuyendo al soporte integrado de MaterialX en three.js, para que en algún momento podamos ofrecer ambas opciones o cambiar a la implementación de three.js una vez que sea más completa.
:::

---
Página traducida automáticamente usando IA