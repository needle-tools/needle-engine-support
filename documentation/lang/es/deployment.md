---
title: Despliegue y optimización
---

## ¿Qué significa el despliegue?

El despliegue es el proceso de hacer que tu aplicación esté disponible al público en un sitio web. Needle Engine asegura que tu proyecto sea lo más pequeño y rápido posible utilizando las últimas técnicas de compresión como **KTX2**, **Draco** y **Meshopt**.

## Destinos de despliegue disponibles

- [Needle Cloud](./cloud/#deploy-from-unity)
  Ideal para aplicaciones web espaciales y compartir assets.
- [Glitch](#deploy-to-glitch)
  Ideal para experimentación y hackear código del lado del servidor.

- [Netlify](#deploy-to-netlify)
  Ideal para alojar tu propio sitio web y nombres de dominio personalizados.
- [itch.io](#deploy-to-itch.io)
  A menudo usado para juegos.
- [GitHub Pages](#deploy-to-github-pages)
  Alojamiento gratuito de páginas estáticas.
- [Vercel](#deploy-to-vercel)
  Plataforma para desarrolladores frontend
- [FTP Upload](#deploy-to-ftp)
  Despliega directamente a cualquier servidor con soporte FTP. Se soportan tanto FTP como SFTP.
- [Build to folder](#build-to-folder)
  Al construir a una carpeta, puedes subir los archivos a cualquier servidor web u otro servicio de alojamiento.
- [Facebook Instant Games](#deploy-to-facebook-instant-games)
  Plataforma de juegos en Facebook y Facebook Messenger.

::: tip ¿Sientes que falta algo?
¡Por favor, háznoslo saber en nuestro [foro](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)!
:::

## Builds de desarrollo

Consulta las guías anteriores sobre cómo acceder a las opciones desde tu Editor (por ejemplo, Unity o Blender).

La principal diferencia con un build de producción es que no realiza la compresión [ktx2](https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html) y [draco](https://google.github.io/draco/) (para reducir el tamaño del archivo y la velocidad de carga), así como la opción de cargar progresivamente texturas de alta calidad.

Generalmente recomendamos hacer builds de producción para un tamaño de archivo y velocidad de carga optimizados (ver más información abajo).

## Builds de producción

Para hacer un build de producción, necesitas tener [toktx](https://github.com/KhronosGroup/KTX-Software/releases) instalado, que proporciona compresión de texturas usando el formato de supercompresión KTX2. Por favor, ve a la [Página de lanzamientos de toktx](https://github.com/KhronosGroup/KTX-Software/releases) y descarga e instala la última versión (v4.1.0 en el momento de escribir). Puede que necesites reiniciar Unity después de instalarlo.
*Si estás seguro de haber instalado toktx y forma parte de tu PATH pero aún no se encuentra, por favor reinicia tu máquina e intenta hacer el build de nuevo.*

:::details Avanzado: Extensiones glTF personalizadas
Si planeas añadir tus propias extensiones glTF personalizadas, hacer un build para producción requiere manejarlas en ``gltf-transform``. Consulta [@needle-tools/gltf-build-pipeline](https://www.npmjs.com/package/@needle-tools/gltf-build-pipeline) como referencia.
:::

### Opciones de optimización y compresión

### Compresión de texturas
Los builds de producción por defecto comprimirán las texturas usando **KTX2** (ya sea ETC1S o UASTC dependiendo de su uso en el proyecto), pero también puedes seleccionar la compresión **WebP** y elegir un nivel de calidad.

#### ¿Cómo elijo entre la compresión ETC1S, UASTC y WebP?

| Formato | ETC1S | UASTC | WebP |
| --- | --- | --- | --- |
| **Uso de memoria de GPU** | Bajo | Bajo | Alto (sin comprimir) |
| **Tamaño de archivo** | Bajo | Alto | Muy bajo |
| **Calidad** | Medio | Muy alto | Depende de la configuración de calidad |
| **Uso típico** | Funciona para todo, pero mejor para texturas de color | Texturas de datos de alto detalle: normal maps, roughness, metallic, etc. | Archivos donde la calidad ETC1S no es suficiente pero UASTC es demasiado grande |

Tienes la opción de seleccionar las opciones de compresión de texturas y carga progresiva por Textura usando el Needle Texture Importer en Unity o en la pestaña Material en Blender.

:::details Unity: ¿Cómo puedo configurar los ajustes de compresión por textura?
![image](/imgs/unity-texture-compression.jpg)
![image](/imgs/unity-texture-compression-options.jpg)
:::

:::details Blender: ¿Cómo puedo configurar los ajustes de compresión por textura?
Selecciona la pestaña material. Verás las opciones de compresión para todas las texturas que esté utilizando ese material.
![Texture Compression options in Blender](/blender/texture-compression.webp)
:::

:::details No se encuentra Toktx
  Windows: Asegúrate de haber añadido toktx a las variables de entorno de tu sistema. Puede que necesites reiniciar tu ordenador después de añadirla para refrescar las variables de entorno. La ubicación de instalación por defecto es ``C:\Program Files\KTX-Software\bin``
  ![image](/imgs/ktx-env-variable.webp)
:::

### Compresión de mallas

Por defecto, un build de producción comprimirá las mallas usando la compresión Draco. Usa el componente `MeshCompression` para seleccionar entre draco y mesh-opt por cada glTF exportado.
Además, puedes configurar la simplificación de mallas para reducir el número de polígonos en los builds de producción en los ajustes de importación de mallas (Unity). Al ver tu aplicación en el navegador, puedes añadir `?wireframe` a tu URL para previsualizar las mallas.

#### ¿Cómo elijo entre Draco y Meshopt?
| Formato | Draco | Meshopt |
| --- | --- | --- |
| **Uso de memoria de GPU** | Medio | Bajo |
| **Tamaño de archivo** | El más bajo | Bajo |
| **Compresión de animación** | No | Sí |

:::details ¿Cómo puedo configurar los ajustes de compresión de draco y meshopt?
Añade el componente MeshCompression para seleccionar qué compresión se debe aplicar por cada glTF exportado.

![image](/imgs/unity-mesh-compression-component.jpg)
- Para cambiar la compresión para la **escena actual**, simplemente añádelo en cualquier lugar de tu escena raíz.
- Para cambiar la compresión para un **prefab o NestedGltf**, añádelo a un `GltfObject` o al prefab al que hacen referencia / que exportan cualquiera de tus componentes.
- Para cambiar la compresión para una **escena referenciada**, simplemente añádelo a la escena referenciada que se exporta.
:::

:::details ¿Dónde encontrar las opciones de simplificación de mallas para reducir el recuento de vértices al hacer un build para producción?
Selecciona una malla y abre las opciones del Needle importer para ver las opciones disponibles para la malla seleccionada:
![image](/imgs/unity-mesh-simplification.jpg)
:::

### Texturas progresivas

También puedes añadir el componente `Progressive Texture Settings` en cualquier parte de tu escena para que todas las texturas de tu proyecto se carguen progresivamente. La carga progresiva no se aplica a las lightmaps ni a las texturas de skybox en este momento.

Con la carga progresiva, las texturas se cargarán primero usando una versión de menor resolución. Una versión de calidad completa se cargará dinámicamente cuando la textura sea visible. Esto generalmente reduce significativamente la carga inicial de tu escena.

:::details ¿Cómo puedo habilitar la carga progresiva de texturas?
### Las texturas progresivas se pueden habilitar por textura<br/>o para todas las texturas en tu proyecto:
![image](/imgs/unity-texture-compression.jpg)
### Habilitar para todas las texturas en el proyecto que no tengan ninguna otra configuración específica:
![image](/imgs/unity-progressive-textures.jpg)
:::

### LODs automáticos de mallas (Nivel de detalle)

Desde Needle Engine 3.36 generamos automáticamente mallas LOD y cambiamos entre ellas en tiempo de ejecución. Los LODs se cargan bajo demanda y solo cuando son necesarios, por lo que esta característica reduce tanto tu tiempo de carga como el rendimiento.

**Beneficios clave**
- Tiempo de carga inicial más rápido
- Tiempo de renderizado más rápido debido a menos vértices en pantalla en promedio
- Raycasting más rápido debido al uso de mallas LOD

Puedes desactivar la generación de LOD para todo tu proyecto en el componente `Progressive Loading Settings` o en los ajustes de Mesh Importer.

![image](/imgs/unity-lods-settings-1.jpg)

![image](/imgs/unity-lods-settings-2.jpg)

## Opciones de despliegue

### Despliegue a Glitch 🎏

[Glitch](https://glitch.com/) proporciona una forma rápida y gratuita para que todos alojen sitios web pequeños y grandes. Proporcionamos una forma sencilla de remezclar y desplegar a una nueva página de Glitch (basada en nuestro starter), y también de ejecutar un servidor de red minimalista en la misma página de Glitch si es necesario.

Puedes desplegar a glitch añadiendo el componente `DeployToGlitch` a tu escena y siguiendo las instrucciones.

Ten en cuenta que los proyectos gratuitos alojados en glitch no pueden exceder ~100 MB. Si necesitas subir un proyecto más grande, considera usar un destino de despliegue diferente.

:::details ¿Cómo despliego a Glitch desde Unity?

1) Añade el componente ``DeployToGlitch`` al GameObject que también tiene el componente ``ExportInfo``.

2) Haz clic en el botón ``Create new Glitch Remix`` del componente
   ![image](/deployment/deploytoglitch-1.jpg)
3) Glitch creará ahora un remix de la plantilla. Copia la URL de tu navegador
   ![image](https://user-images.githubusercontent.com/5083203/179834901-f28852a9-6b06-4d87-8b5b-0384768c92c1.png)
4) Abre Unity de nuevo y pega la URL en el campo ``Project Name`` de tu componente ``Deploy To Glitch``.
  ![image](https://user-images.githubusercontent.com/5083203/179835274-033e5e1d-b70d-4b13-95ad-f1e2f159b14e.png)
5) Espera unos segundos hasta que Unity reciba tu deployment key de glitch (esta clave se guarda de forma segura en el archivo `.env` de glitch. No la compartas con otros, cualquiera con esta clave podrá subir a tu sitio web de glitch).
  ![waiting for the key](/deployment/deploytoglitch-2.jpg)
6) Una vez recibida la Deploy Key, puedes hacer clic en el botón `Build & Deploy` para subir a glitch.

:::

:::details ¿Cómo despliego a Glitch desde Blender?

![Deploy To Glitch from Blender component](/blender/deploy_to_glitch.webp)

1) Encuentra el panel Deploy To Glitch en la pestaña Scene
2) Haz clic en el botón ``Remix on glitch`` del componente
3) Tu navegador abrirá la plantilla del proyecto de glitch
4) Espera a que Glitch genere un nuevo proyecto
5) Copia y pega la URL del proyecto en el panel DeployToGlitch de Blender como el nombre del proyecto (puedes pegar la URL completa, el panel extraerá la información necesaria).
6) En Glitch, abre el archivo ``.env`` e introduce una contraseña en el campo ``Variable Value`` junto a **DEPLOY_KEY**.
7) Introduce la misma contraseña en Blender en el campo `Key`.
8) Haz clic en el botón `DeployToGlitch` para construir y subir tu proyecto a glitch. Se abrirá un navegador cuando la subida haya terminado. Intenta refrescar la página si se muestra en negro después de haberla abierto.
:::

#### Solución de problemas de Glitch

Si haces clic en `Create new Glitch Remix` y el navegador muestra un error como `there was an error starting the editor`, puedes hacer clic en **OK**. Luego ve a [glitch.com](https://glitch.com/) y asegúrate de haber iniciado sesión. Después de eso, intenta hacer clic de nuevo en el botón en Unity o Blender.

### Despliegue a Netlify
:::details ¿Cómo despliego a Netlify desde Unity?
Simplemente añade el componente `DeployToNetlify` a tu escena y sigue las instrucciones. Puedes crear nuevos proyectos con un clic o desplegar a proyectos existentes.

![Deploy to netlify component](/deployment/deploytonetlify-2.jpg)

![Deploy to netlify component](/deployment/deploytonetlify.jpg)
:::

### Despliegue a Vercel

1) Crea un nuevo proyecto en vercel
2) Añade tu proyecto web a un repositorio de github
3) Añade el repositorio a tu proyecto en vercel

Consulta nuestro [proyecto de ejemplo](https://github.com/needle-engine/nextjs-sample) para la configuración del proyecto.

### Despliegue a itch.io

:::details ¿Cómo despliego a itch.io desde Unity?
1) Crea un nuevo proyecto en [itch.io](https://itch.io/game/new)
2) Configura ``Kind of project`` a ``HTML``
  ![image](https://user-images.githubusercontent.com/5083203/191211856-8a114480-bae7-4bd1-868e-2e955587acd7.png)
3) Añade el componente ``DeployToItch`` a tu escena y haz clic en el botón ``Build``.
  ![image](https://user-images.githubusercontent.com/5083203/193812540-1881837e-ed9e-49fc-9658-52e5a914299a.png)

4) Espera a que el build termine, abrirá una carpeta con el zip final cuando haya terminado.
5) Sube el zip final a itch.io.
  ![20220920-104629_Create_a_new_project_-_itch io_-_Google_Chrome-needle](https://user-images.githubusercontent.com/5083203/191212661-f626f0cb-bc8e-4738-ad2c-3982aca65f39.png)
6) Selecciona ``This file will be played in the browser``.
  ![image](https://user-images.githubusercontent.com/5083203/191212967-00b687f3-bf56-449e-880c-d8daf8a52247.png)
7) Guarda tu página de itch y visualiza la página del proyecto de itch. Ahora debería cargar tu proyecto de Needle Engine 😊.

#### Ajustes opcionales
![image](https://user-images.githubusercontent.com/5083203/191217263-355d9b72-5431-4170-8eca-bfbbb39ae810.png)
:::

:::details Itch.io: no se encontró index.html

#### No se encontró index.html
![image](https://user-images.githubusercontent.com/5083203/191213162-2be63e46-2a65-4d41-a713-98c753ccb600.png)
Si ves este error después de subir tu proyecto, asegúrate de no subir un index.html gzipped.
Puedes deshabilitar la compresión gzip en ``vite.config.js`` en la carpeta de tu proyecto web de Needle. Simplemente elimina la línea con ``viteCompression({ deleteOriginFile: true })``. Haz el build de tu proyecto de nuevo y súbelo a itch.

:::

### Despliegue a FTP

:::details ¿Cómo despliego a mi servidor FTP desde Unity?
1) Añade el componente ``DeployToFTP``¹ a un GameObject en tu escena (es una buena práctica añadirlo al mismo GameObject que ExportInfo, pero no es obligatorio).
2) Asigna un asset de servidor FTP y rellena el servidor, nombre de usuario y contraseña si aún no lo has hecho ².
  *Este asset contiene la información de acceso a tu servidor FTP; la obtienes al crear una nueva cuenta FTP en tu proveedor de alojamiento.*
3) Haz clic en el botón <kbd>Build & Deploy</kbd> en el componente ``DeployToFTP`` para construir tu proyecto y subirlo a tu cuenta FTP.


![Deploy to FTP component in Unity](/deployment/deploytoftp.jpg)
*¹ Componente Deploy to FTP*

![Deploy to FTP server asset](/deployment/deploytoftp2.jpg)
*² Asset de servidor FTP que contiene la información de acceso de tu cuenta de usuario FTP*

![Deploy to FTP component in Unity with server asset assigned](/deployment/deploytoftp3.jpg)
*Componente Deploy To FTP después de asignar el asset de servidor. Puedes desplegar directamente a una subcarpeta en tu servidor usando el campo de ruta.*
:::

:::details ¿Cómo despliego a mi servidor FTP manualmente?

1) Abre `File > Build Settings`, selecciona `Needle Engine` y haz clic en <kbd>Build</kbd>.
2) Espera a que el build se complete; la carpeta `dist` resultante se abrirá automáticamente después de que se hayan ejecutado todos los pasos de build y compresión.
3) Copia los archivos de la carpeta `dist` a tu almacenamiento FTP.

**¡Eso es todo!** 😉

![20220830-003602_explorer-needle](https://user-images.githubusercontent.com/2693840/187311461-e6afb2d7-5761-48cf-bacb-1c1733bb768b.png)

> **Nota**: Si el resultado no funciona al subirlo, puede que tu servidor web no soporte servir archivos gzipped. Tienes dos opciones para solucionar el problema: Opción 1: ¡Puedes intentar habilitar la compresión gzip en tu servidor usando un archivo htaccess! Opción 2: Puedes desactivar la compresión gzip en los ajustes de build en File/Build Window y seleccionando la plataforma Needle Engine.

> **Nota**: Si estás teniendo errores durante la compresión, ¡por favor, háznoslo saber y reporta un bug! Si tu proyecto funciona localmente y solo falla al hacer builds de producción, puedes salir del apuro de inmediato haciendo un Development Build. Para ello, simplemente activa la casilla `Development Build` en Build Settings.

![Unity build window showing Needle Engine platform](/deployment/buildoptions_gzip.jpg)

:::

#### Habilitar gzip usando un archivo .htaccess
Para habilitar la compresión gzip en tu servidor FTP, puedes crear un archivo llamado `.htaccess` en el directorio al que quieres subir (o en un directorio padre).
Inserta el siguiente código en tu archivo `.htaccess` y guárdalo/súbelo a tu servidor:
```
<IfModule mod_mime.c>
RemoveType .gz
AddEncoding gzip .gz
AddType application/javascript .js.gz
```

### Despliegue a Github Pages
:::details ¿Cómo despliego a Github Pages desde Unity?

Añade el componente DeployToGithubPages a tu escena y copia y pega el repositorio de github (o la URL de github pages) al que quieres desplegar.
![Deploy To github pages component](/deployment/deploytogithubpages.jpg)

<video-embed src="https://www.youtube.com/watch?v=Vyk3cWB6u-c" />

:::

#### Solución de problemas de github pages
- **He desplegado a github pages pero no se ejecuta ninguna acción / el sitio web no está activo**
   - Si desplegaste por primera vez, puede tardar unos minutos hasta que tu sitio web esté disponible. Puedes consultar la pestaña **Actions** en github (`/actions`) para ver el proceso de despliegue.
   - Si tu sitio web no está activo después de unos minutos o no ves ninguna ejecución de workflow en la pestaña **Actions** de github, ve a la página de ajustes de **Github Pages** (`/settings/pages`) y asegúrate de que la **Branch** esté configurada a *gh-pages*.

### Despliegue a Facebook Instant Games

Con Needle Engine puedes hacer un build a Facebook Instant Games automáticamente
No se requieren ajustes manuales en tu aplicación web o juego.

:::details ¿Cómo despliego a Facebook Instant Games desde Unity?
- Añade el componente `Deploy To Facebook Instant Games` a tu escena:
  ![Deploy to facebook instant games component](/deployment/deploytofacebookinstantgames.jpg)
- Haz clic en el botón `Build For Instant Games`
- Después de que el build termine, obtendrás un archivo ZIP que puedes subir a tu aplicación de facebook.
- En Facebook, añade el módulo `Instant Games` y ve a `Instant Games/Web hosting`
  ![Hosting a facebook instant games](/deployment/deploytofacebookinstantgames-hosting.jpg)
- Puedes subir tu zip usando el botón `Upload version` (1). Después de que la subida haya terminado y el zip haya sido procesado, haz clic en el botón `Stage for testing` para probar tu aplicación (2, aquí el botón azul) o `Push to production` (el botón con el icono de estrella).
  ![Upload the zip to facebook instant games](/deployment/deploytofacebookinstantgames-upload.jpg)
- Eso es todo; luego puedes hacer clic en el botón `Play` junto a cada versión para probar tu juego en facebook.

:::

:::details ¿Cómo creo una aplicación en Facebook (con capacidades de Instant Games)?

1) [Crea una nueva aplicación](https://developers.facebook.com/apps/creation/) y selecciona `Other`. Luego haz clic en `Next`.
  ![Create facebook instant games app](/deployment/facebookinstantgames-1.jpg)

2) Selecciona el tipo `Instant Games`.
  ![Create facebook instant games app](/deployment/facebookinstantgames-2.jpg)

3) Después de crear la aplicación, añade el producto `Instant Games`.
  ![Add instant games product](/deployment/facebookinstantgames-3.jpg)

Aquí puedes encontrar [la documentación oficial de instant games](https://developers.facebook.com/docs/games/build/instant-games) en facebook.
**Nota**: todo lo que tienes que hacer es crear una aplicación con capacidades de instant games.
Nosotros nos encargaremos de todo lo demás y no se requieren ajustes manuales en tu sitio web de Needle Engine.
:::

## Build a carpeta

En Unity, abre ``File/Build Settings`` y selecciona ``Needle Engine`` para ver las opciones:

![image](/imgs/unity-build-window-menu.jpg)

![image](/imgs/unity-build-window.jpg)

Para hacer el build de tu proyecto web para subirlo a cualquier servidor web, puedes hacer clic en **Build** en la ventana Build Settings del Editor de Unity. Puedes activar la casilla ``Development Build`` para omitir la compresión (ver abajo), lo que requiere que toktx esté instalado en tu máquina.

Para previsualizar localmente tu build final, puedes usar el botón `Preview Build` en la parte inferior de la ventana. Este botón primero realizará un build regular y luego iniciará un servidor local en el directorio con los archivos finales para que puedas ver lo que obtienes una vez que subas estos archivos a tu servidor web.

Nodejs **solo** es necesario durante el desarrollo. El sitio web distribuido (usando nuestra plantilla vite por defecto) es una página estática que no depende de Nodejs y se puede colocar en cualquier servidor web regular. Nodejs es necesario si quieres ejecutar nuestro servidor de red minimalista en el mismo servidor web (contenido automáticamente en el proceso de despliegue de Glitch).

---

## Flujos de trabajo de despliegue multiplataforma

Es posible crear proyectos Unity regulares donde puedes hacer builds tanto para Needle Engine como para plataformas Unity regulares como Desktop o incluso WebGL. Nuestro enfoque de "component mapping" significa que no se modifica lógica de runtime dentro de Unity; si quieres, puedes usar regularmente Play Mode y hacer builds para otras plataformas de destino. En algunos casos, esto significará que tienes código duplicado (código C# y lógica TypeScript coincidente). La cantidad de trabajo adicional debido a esto depende de tu proyecto.

**Entrar en Play Mode en Unity**
En `Project Settings > Needle Engine`, puedes desactivar `Override Play Mode` y `Override Build settings` para alternar entre el proceso de build de Needle y el proceso de build de Unity:
![image](https://user-images.githubusercontent.com/2693840/187308490-5acb9016-ffff-4113-be62-4de450a42b08.png)

## Argumentos de línea de comandos de Needle Engine para Unity

Needle Engine para Unity soporta varios argumentos de línea de comandos para exportar assets individuales (Prefabs o Scenes) o para hacer un build de un proyecto web completo en batch mode (sin ventana).

La siguiente lista presenta una tabla con las opciones disponibles:

| | |
| -- | -- |
| `-scene` | ruta a una escena o un asset a exportar, ej. `Assets/path/to/myObject.prefab` o `Assets/path/to/myScene.unity` |
| `-outputPath <path/to/output.glb>` | establece la ruta de salida para el build (solo válido al construir una escena) |
| `-buildProduction` | ejecuta un build de producción |
| `-buildDevelopment` | ejecuta un build de desarrollo |
| `-debug` | abre una ventana de consola para debugging |

Página traducida automáticamente por IA