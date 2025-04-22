---
title: Needle Engine para Unity
editLink: true
---
<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
  <img src="/imgs/unity-logo.webp" style="max-height:70px;" />
</div>

# Needle Engine para Unity

Needle Engine para Unity te permite crear aplicaciones web altamente interactivas, flexibles y ligeras directamente dentro de Unity. Utiliza las potentes herramientas del editor de Unity para configurar visualmente tus escenas 3D, animar y diseñar. Needle Engine para Unity se encarga de exportar tu escena a glTF y se integra fácilmente con cualquier framework de frontend web.


## Instala el paquete de Unity


<NoDownloadYet>
  <br/>
  <needle-button
    event_goal="download_unity"
    event_position="getting_started"
    large
    href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started"
    same_tab
    next_url="/docs/unity/"
    >
    <strong>Descargar Needle Engine para Unity</strong>
  </needle-button>
</NoDownloadYet>

<!-- [Mirror](https://package-installer.glitch.me/v1/installer/needle/com.needle.engine-exporter?registry=https://packages.needle.tools&scope=com.needle&scope=org.khronos) -->

1. **Arrastra el archivo .unitypackage descargado** a un proyecto de Unity y confirma que deseas importarlo.

2. **Espera un momento** a que finalice la instalación e importación. Puede abrirse una ventana indicando que "A new scoped registry is now available in the Package Manager.". Este es nuestro registro de paquetes de Needle. Puedes cerrar esa ventana sin problemas.
3. **Explora las muestras**.
  Selecciona la opción de menú `Needle Engine > Explore Samples` (Explorar muestras) para ver, abrir y modificar todas las [escenas de muestra](https://engine.needle.tools/samples) disponibles.

## Tutorial en video rápido

<video-embed src="https://www.youtube.com/watch?v=3dB-d1Jo_Mk" limit_height />

## Empieza desde una muestra

Hay más de 100 muestras que cubren una amplia gama de temas, casos de uso e industrias.
Para una descripción general rápida, echa un vistazo a nuestra [página de Muestras](https://engine.needle.tools/samples/).

Todas estas muestras están disponibles directamente en Unity:
1. Ve a `Needle Engine > Explore Samples` (Explorar muestras) para buscar muestras.
2. Haz clic en "Install Samples" (Instalar muestras) para instalar el paquete de muestras directamente en tu editor (o [descarga el unitypackage de muestras](http://engine.needle.tools/downloads/unity/samples) para instalar el paquete manualmente).
3. Elige cualquier muestra y haz clic en `Open Scene` (Abrir escena).

:::tip Las muestras son de solo lectura – eso facilita su actualización.
Nuestras escenas de muestra forman parte de un paquete UPM en Unity. Esto significa que no puedes editar directamente los assets y scripts en ellas – son de solo lectura. Para editar un asset del paquete de muestras, cópialo en la carpeta `Assets` de tu proyecto. Para editar un script del paquete de muestras, cópialo en la carpeta `src` de tu proyecto web.
:::

## Empieza desde una plantilla

Proporcionamos una serie de plantillas de escena para iniciar rápidamente nuevos proyectos.
Estas te permiten pasar de una idea a un prototipo en pocos clics.

1. Haz clic en `File > New Scene` (Archivo > Nueva escena).

2. Selecciona una de las plantillas con (needle) en su nombre y haz clic en `Create` (Crear).
   Recomendamos la plantilla [Collaborative Sandbox](https://engine.needle.tools/samples/collaborative-sandbox), que es una excelente manera de empezar con la interactividad, el multijugador y la adición de assets.
3. Haz clic en Play para instalar e iniciar tu nuevo proyecto web.

![20220822-140539-wqvW-Unity_oC0z-needle](https://user-images.githubusercontent.com/2693840/185917275-a147cd90-d515-4086-950d-78358185b1ef.png)


## Empieza desde cero

Si no quieres empezar desde una plantilla de escena, puedes seguir estos pasos.
En esencia, vamos a recrear la plantilla "Minimal (Needle)" que viene con el paquete.

1. **Crea una nueva escena vacía**

2. **Configura tu escena para exportar**
  Añade un GameObject vacío, nómbralo "Exporter" y añádele el componente `Needle Engine` (anteriormente llamado `Export Info`).
  En este componente, creas y accedes rápidamente a tu proyecto de runtime exportado.
  También te advierte si alguno de nuestros paquetes y módulos está desactualizado o no está instalado localmente en tu proyecto web.

    ::: tip Nombre del proyecto y nombre de la escena
    Por defecto, el nombre del proyecto coincide con el nombre de tu escena. Si quieres cambiarlo, puedes elegir o introducir un ``Directory Name`` (Nombre del directorio) donde quieras crear tu nuevo proyecto web. La ruta es relativa a tu proyecto de Unity.
    :::

3. **Elige una plantilla de proyecto web**
  Ahora, selecciona una plantilla de proyecto web para tu proyecto. La plantilla por defecto se basa en [Vite](https://vitejs.dev/), un rápido bundler de aplicaciones web.
  <br/>
    ![Unity ExportInfo local templates](/imgs/unity-project-local-template.jpg)


4. Haz clic en Play para instalar e iniciar tu nuevo proyecto web


:::tip Define tus propias plantillas
Si te encuentras creando muchos proyectos similares, puedes crear tus propias plantillas locales o remotas utilizando el menú contextual de la vista Proyecto en `Create/Needle Engine/Project Template` (Crear/Needle Engine/Plantilla de proyecto). Las plantillas pueden ser locales en disco (se copia una carpeta) o repositorios remotos (se clona un repositorio git).
:::

## Carpetas y archivos del proyecto


| Carpeta | |
| --- | --- |
| **Unity** | |
| `Assets` | Aquí es donde residen los assets específicos/exclusivos del proyecto. |
| `Packages` | Aquí es donde residen los paquetes instalados para este proyecto. Un paquete puede contener cualquier tipo de asset. La principal diferencia es que puede añadirse a múltiples proyectos de Unity. Por lo tanto, es un excelente método para compartir código o assets. Para saber más sobre los paquetes, consulta [la documentación de Unity sobre paquetes](https://docs.unity3d.com/Manual/PackagesList.html).
| **Paquete Unity de Needle Engine** | |
| ``Core/Runtime/Components`` | Contiene todos los componentes integrados de Needle Engine. Aprende más sobre ellos en la [Referencia de Componentes](./../component-reference.md). |

-----

Al crear un nuevo proyecto web en Unity, puedes elegir crearlo a partir de una plantilla local (por defecto, enviamos una plantilla web basada en vite).

También puedes hacer referencia a plantillas remotas introduciendo una URL de repositorio en la ruta del proyecto ExportInfo (esto se puede guardar con tu escena, por ejemplo). Al crear un nuevo proyecto web, el repositorio será clonado o descargado (dependiendo de si tienes git instalado) y se buscará un archivo `needle.config.json`. Si no se encuentra ninguno en el repositorio clonado, se usará el directorio raíz. Se pueden encontrar ejemplos de proyectos de plantilla remota en [github.com/needle-engine](https://github.com/needle-engine)

![Unity ExportInfo local templates](/imgs/unity-project-remote-template.jpg)

### Proyectos Temporales

Si solo planeas añadir archivos personalizados a través de NpmDefs y no cambiar la configuración del proyecto (por ejemplo, para una prueba rápida a pantalla completa), puedes prefijar la ruta del proyecto con `Library`. El proyecto se generará en la Unity Project Library y no necesita ser añadido al control de versiones (la carpeta Library debe ser excluida del control de versiones). Llamamos a estos proyectos _proyectos temporales_. ¡Son geniales para probar ideas rápidamente!


## Typescript en Unity

Las **NPM Definition** son [paquetes npm](https://docs.npmjs.com/about-packages-and-modules) fuertemente integrados en el Editor de Unity, lo que facilita compartir scripts con múltiples proyectos web o incluso de Unity.

Los stubs de componentes C# para archivos typescript también se generarán automáticamente para scripts dentro de paquetes npmdef.

#### Creación e instalación de un npmdef
Para crear una *NPM Definition*, haz clic derecho en el navegador del proyecto de Unity y selecciona ``Create/NPM Definition``.
Puedes **instalar un paquete *NPM Definition*** en tu proyecto de runtime, por ejemplo, seleccionando tu componente ``Export Info`` y añadiéndolo a la lista de ``dependencies`` (internamente, esto simplemente añadirá el paquete npm subyacente a tu package.json).

![image](https://user-images.githubusercontent.com/5083203/170374130-d0e32516-a1d4-4903-97c2-7ec9fa0b17d4.png)

No olvides instalar el paquete recién añadido, por ejemplo, haciendo clic en Install en el componente ExportInfo y también reinicia el servidor si ya está en funcionamiento.

Para editar el código dentro de un paquete *NPM Definition*, simplemente haz doble clic en el asset *NPM Definition* en tu navegador de proyecto y se abrirá el workspace de vscode que viene con cada npmdef.


# Próximos pasos

- [Concepto: Proyectos Web](../project-structure.md)
- [Concepto: Exportación de Assets](../export.md)
- [Concepto: Despliegue (Comparte tu sitio web)](../deployment.md)
- [Componentes: Aprende sobre las Everywhere Actions](../everywhere-actions.md)
- [Scripting para principiantes: Aspectos esenciales de Typescript](../getting-started/typescript-essentials.md)
- [Scripting para principiantes: Cómo escribir componentes personalizados](../scripting.md)


Página traducida automáticamente por IA