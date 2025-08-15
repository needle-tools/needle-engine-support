---
title: Needle Cloud
description: 'Needle Cloud es un servicio online. Te ayuda a almacenar, gestionar y compartir assets y apps 3D en la web.
 Se soporta una variedad de formatos de archivo, incluyendo glTF, USD, FBX, VRM, y más. Las aplicaciones web espaciales hechas con Needle pueden ser desplegadas a la nube directamente desde la integración de Unity, y vía línea de comandos (CLI).'
---

<br/>
<discountbanner/>


# Needle Cloud

## Resumen

Needle Cloud es un servicio online. Te ayuda a almacenar, gestionar y compartir assets y apps 3D en la web.
Se soporta una variedad de formatos de archivo, incluyendo glTF, USD, FBX, VRM, y más. Las aplicaciones web espaciales hechas con Needle pueden ser desplegadas directamente desde la [integración de Unity](#deploy-from-unity) o nuestra [interfaz de línea de comandos](#deploy-from-the-cli) (CLI) de Needle Cloud.

Visita [Needle Cloud](https://cloud.needle.tools) para crear una cuenta gratis.

![Resumen de Needle Cloud](/cloud/cloud-overview-page.webp)

## Características

1. **Alojar aplicaciones web espaciales**  
   Las aplicaciones hechas con Needle se pueden desplegar a la nube directamente desde nuestras integraciones de motor. Esto te permite dar acceso público a las aplicaciones a tu equipo y clientes fácilmente, sin tener que configurar tu propio servidor. Si es necesario, puedes proteger las aplicaciones con una contraseña.

2. **Gestionar assets 3D de forma privada y segura**  
   Sube y organiza fácilmente tus archivos 3D. Gracias a nuestra rápida CDN (red de entrega de contenido), tus archivos se almacenan de forma segura y se puede acceder a ellos rápidamente desde cualquier parte del mundo.
   Needle Cloud no es un marketplace ni una red social. Está diseñado para agencias, estudios y creadores para gestionar sus assets de forma privada y segura.

3. **Optimizar assets 3D de una variedad de formatos**  
   Comprime automáticamente tus archivos para reducir su tamaño manteniendo la calidad visual. Esto hace que tus archivos se carguen más rápido y ahorra ancho de banda y memoria en los dispositivos de los usuarios.

4. **Compartir y control de versiones**  
   Se pueden compartir enlaces a tus archivos con otros y utilizarlos directamente en tus proyectos. Puedes subir nuevas versiones de assets y apps. Las versiones individuales pueden ser etiquetadas, lo que permite flujos de trabajo de revisión flexibles: por ejemplo, puedes etiquetar una versión como `main` o `experimental`. También puedes revertir las etiquetas a una versión anterior si es necesario.

5. **Automatización y herramientas de Pipeline vía CLI**  
   La interfaz de línea de comandos (CLI) de `needle-cloud` facilita la automatización de la carga y optimización de archivos. Esto es útil para integrar Needle Cloud en tu pipeline existente, o para automatizar la carga de un gran número de archivos.

6. **Gestión de licencias**  
   Las licencias de Needle Engine para creadores individuales y equipos se gestionan a través de Needle Cloud. Esto garantiza que solo los usuarios autorizados puedan acceder a tus archivos y proyectos. Contáctanos para licencias Enterprise y Edu.


## Desplegar desde Unity

Needle Cloud está integrado en el Editor de Unity. Esto te permite desplegar tus aplicaciones directamente desde Unity a Needle Cloud. También puedes subir y descargar assets desde Needle Cloud directamente en Unity.

1. **Instala la integración de Unity, si aún no lo has hecho.**   
   Consulta [esta página](./../unity/) para más información.

2. **Añade el componente `Needle Engine` (antes ExportInfo) a tu escena.**   
   Este componente se utiliza para configurar los ajustes de exportación de tu aplicación.  
   Puedes usar el elemento de menú `GameObject > Needle Engine > Add Export Info` o crear una nueva escena a partir de una plantilla de Needle a través del elemento de menú `File > New Scene`.

3. **Haz clic en `Upload to Needle Cloud`.**   
   Esto compilará tu aplicación y la subirá a Needle Cloud. También puedes elegir desplegar en un equipo y proyecto específicos. El _upload name_ del proyecto, visible junto al botón, se guarda en la escena. Las futuras cargas usarán el mismo upload name, y todas las versiones cargadas se agruparán en el sitio web de Needle Cloud.   
   
   ![Integración de Needle Cloud con Unity](/cloud/cloud-deploy-v1.webp)

## Desplegar desde la CLI

Needle Cloud proporciona una interfaz de línea de comandos (CLI) que te permite gestionar tus assets y desplegar tus aplicaciones de forma eficiente. Puedes usar la CLI para automatizar tareas e integrar Needle Cloud en tus flujos de trabajo existentes.

La CLI está disponible como un [paquete npm](https://www.npmjs.com/package/needle-cloud), lo que significa que necesitas tener Node.js instalado en tu máquina. Puedes comprobar si tienes Node.js instalado ejecutando el siguiente comando en tu terminal:

```bash
node -v
```
Si no tienes Node.js instalado, puedes descargarlo desde el [sitio web de Node.js](https://nodejs.org/).  

Puedes instalar el paquete `needle-cloud` de la CLI globalmente o usarlo vía `npx`. Esto te permite ejecutar los comandos de la CLI sin tener que instalarlo globalmente. 


1. **Usa el comando npx (recomendado)**
   ```bash
   npx needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```
2. **O instala needle-cloud globalmente**  
   Una instalación global permite usar la CLI desde cualquier lugar de tu sistema. Para instalar la CLI globalmente, ejecuta el siguiente comando en tu terminal: 
   ```bash
   npm install -g needle-cloud
   ```
   Ahora, puedes usar el comando `needle-cloud` en tu terminal:

   ```bash
   needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
   ```

### Despliegues automatizados
Para desplegar desde **Github Actions** o **Stackblitz** puedes proporcionar un token de acceso como `--token <access_token>`. Los tokens de acceso se pueden crear en [la página de tu equipo](https://cloud.needle.tools/team) en Needle Cloud. Asegúrate de crear tu token con permisos de `read/write`.      

Usa la [Needle Cloud Github Action](https://github.com/marketplace/actions/deploy-to-needle-cloud) para desplegar una actualización desde Github (por ejemplo, cada vez que haces push al repositorio)

#### Ejemplo: Needle Cloud Github Action
```yml
      - name: Deploy to Needle Cloud
        uses: needle-tools/deploy-to-needle-cloud-action@v1
        id: deploy
        with:
            token: ${{ secrets.NEEDLE_CLOUD_TOKEN }}
            dir: ./dist
            name: vite-template # optional
```

#### Ejemplo: Desplegar usando un comando CLI

```bash
# Deploy to Needle Cloud from e.g. a github action
npx needle-cloud deploy '/path/to/output' --team 'My team' --name 'some name or id' --token '<access_token>'
```

### Ayuda de la CLI
Usa `help` para ver todas las opciones de línea de comandos disponibles y ayuda para comandos individuales.
```bash
# ver todas las opciones disponibles
npx needle-cloud help
# obtener ayuda para un comando específico, por ejemplo, deploy
npx needle-cloud help deploy
```


## URLs de despliegue

Al desplegar en Needle Cloud, cada carga obtiene una URL única. Puedes compartir un enlace a una versión *específica*, o a una versión *etiquetada* con tu equipo o clientes.

-----

En el siguiente ejemplo, tenemos una aplicación que hasta ahora se ha desplegado dos veces. Cada despliegue obtiene una URL específica, también conocida como una *URL pinned* ya que está fijada a una versión específica.
1. [collaborativesandbox-zubcks1qdkhy<strong>-1qdkhy</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-1qdkhy.needle.run/)  
   Esta es la primera versión que se subió.
2. [collaborativesandbox-zubcks1qdkhy<strong>-2e2spt</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-2e2spt.needle.run/)  
   Esta es la segunda versión que se subió.

El despliegue *latest* siempre está disponible en la siguiente URL. Esta URL es útil para compartir con tu equipo, ya que siempre apunta a la versión más reciente de la aplicación. Otro nombre común para esta versión es "dev" o "canary".
- [collaborativesandbox-zubcks1qdkhy<strong>-latest</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-latest.needle.run/)  
  Esta URL muestra automáticamente la nueva versión cuando subes una nueva versión de la aplicación.

El despliegue *main* es útil para compartir con clientes, ya que siempre apunta a la versión más reciente de la aplicación que promoviste. Otros nombres comunes para esta versión son "production", "stable" o "live".
- [collaborativesandbox-zubcks1qdkhy.needle.run](https://collaborativesandbox-zubcks1qdkhy.needle.run/)  
  Esta URL no cambia cuando subes una nueva versión. Solo cambiará cuando promociones explícitamente una nueva versión a *main*.

Típicamente, subes una nueva versión, la revisas y luego decides si quieres promocionarla a *main*.

-----

El sitio web de Needle Cloud muestra todas las versiones desplegadas de la aplicación, incluyendo las versiones latest y main. Las etiquetas se pueden mover haciendo clic en <kbd>⋮</kbd> y seleccionando <kbd>Establecer etiqueta principal</kbd> o <kbd>Quitar etiqueta principal</kbd>.  

![Lista de versiones de Needle Cloud](/cloud/cloud-edit-page.webp)

## Formatos 3D soportados

1. **glTF y GLB** <a href="https://cloud.needle.tools/view?file=2oAMeWZ1hWL3C-latest-product" target="_blank">Ejemplo</a>   
   El formato glTF es el formato más ampliamente soportado para 3D en la web. Es un formato ligero que puede almacenar modelos 3D, animaciones y texturas. Los archivos GLB son versiones binarias de los archivos glTF, donde todos los datos se almacenan en un único archivo.
   glTF soporta técnicas avanzadas de compresión como Draco, KTX2 y Meshopt, que son totalmente soportadas por Needle Cloud y Needle Engine.

2. **OpenUSD**   
   USD es un formato potente para el intercambio de datos 3D. Es conocido por su uso en la industria del cine y VFX, y está ganando popularidad en la industria de los videojuegos. Needle Cloud soporta archivos USDZ y USD de forma nativa a través de nuestro trabajo en USD-WASM, y también convierte archivos USD a glTF para su posterior procesamiento y optimización.

3. **FBX**  
   FBX ha sido un formato popular para el intercambio de datos 3D durante muchos años, pero carece de una serie de características modernas como materiales PBR y extensiones. Needle Cloud convierte archivos FBX a glTF para su posterior procesamiento y optimización.  

4. **VRM**  
   VRM es un formato para avatares humanoides. Se basa en glTF con restricciones adicionales mediante el uso de extensiones de glTF. Needle Cloud soporta archivos VRM de forma nativa, y puede optimizarlos como otros archivos glTF, incluyendo extensiones complejas de VRM como fonemas, toon shading y dynamic bones.

5. **OBJ**  
   OBJ es un formato sencillo basado en texto para modelos 3D. Soporta materiales básicos a través de archivos MTL, animaciones y jerarquías de objetos. Needle Cloud convierte archivos OBJ a glTF para su posterior procesamiento y optimización. 

:::tip Usa glTF o USD cuando sea posible
Recomendamos glTF y USD como formatos principales para el intercambio de datos 3D. Son ampliamente soportados, tienen características modernas y un buen modelo de material.
:::

## Assets en la nube

### Subir Assets

Puedes subir tus archivos fácilmente arrastrándolos al sitio web o seleccionándolos desde tu ordenador.
Los archivos que no son glTF se convierten automáticamente a glTF para su posterior procesamiento, pero los archivos originales se conservan para descargar y ver en la web. 

### Versiones de Assets

Cuando visitas la Página de Edición de un asset, puedes ver todas las versiones que han sido subidas hasta ahora por ti o tu equipo. También puedes etiquetar versiones para marcarlas como "main" o "experimental". "Latest" es la etiqueta predeterminada para la versión más reciente.

### Compartir enlaces a Assets

Puedes crear enlaces para compartir archivos específicos o archivos etiquetados con tu equipo o clientes. Los enlaces etiquetados se actualizarán automáticamente cuando muevas la etiqueta, de modo que puedes compartir un enlace "main" una vez y seguir actualizando el archivo sin tener que enviar un nuevo enlace.

### Usar Assets en la Nube en Needle Engine

Los archivos almacenados en Needle Cloud se pueden importar directamente a proyectos de Needle Engine fácilmente. El componente `Needle Cloud Asset` toma un enlace a un asset y lo carga en *tiempo de ejecución*. Esto te permite mantener el tamaño de tu proyecto pequeño y cargar assets bajo demanda que aún pueden ser actualizados en la nube.

::: tip Usa Progressive Loading siempre que sea posible
Los assets almacenados en Needle Cloud se optimizan automáticamente para un uso ideal en *tiempo de ejecución* utilizando nuestra tecnología Progressive Loading. Para cada malla y textura, se generan múltiples versiones con diferentes niveles de detalle, y solo las partes del asset que se necesitan se cargan en *tiempo de ejecución*. 

Esto ahorra mucho ancho de banda y memoria (típicamente un 90% o más en comparación con la carga completa del asset).
:::

### Incrustar el Cloud Viewer en tu sitio web

Una forma rápida de llevar 3D a tu propio sitio web es **incrustar** el visor de Needle Cloud. 
Para hacerlo, ve a la Página de Edición de un asset y haz clic en <kbd>Embed</kbd>. Luego puedes copiar el fragmento de código `iframe` y pegarlo en tu sitio web.

::: tip Incrustar versiones específicas
También puedes incrustar el visor con un enlace directo al asset, o con una etiqueta específica. Esto te permite actualizar el asset en Needle Cloud sin tener que actualizar el código de incrustación en tu sitio web. 
:::

### Incrustar en otros frameworks

Las siguientes opciones de incrustación están disponibles:
1. **Needle Cloud Viewer**  
   Usa el fragmento de código `iframe` para incrustar el visor de Needle Cloud en tu sitio web.

1. **Needle Engine**  
  Usa el fragmento de código proporcionado para incrustar Needle Engine en tu sitio web como [web component](./../three/).

1. **model-viewer**  
  El proyecto [model-viewer](https://modelviewer.dev) proporciona un web component para renderizar modelos 3D simples y no interactivos en el navegador.

1. **three.js**  
  Si estás familiarizado con three.js, puedes usar el fragmento de código proporcionado como punto de partida para una aplicación three.js que soporte Needle Progressive Loading y cargue archivos de Needle Cloud de forma eficiente.

1. **React-Three-Fiber**  
  Si estás usando React-Three-Fiber, puedes usar el fragmento de código proporcionado como punto de partida para un proyecto que soporte Needle Progressive Loading y cargue archivos de Needle Cloud de forma eficiente.

1. **Unity**  
  Si estás usando Unity, puedes integrar assets de Needle Cloud directamente en tus proyectos usando el componente Needle Cloud Asset para una carga y optimización fluidas.

### Usar Assets en la Nube con otros motores como Unity o Unreal

Hay varias formas de usar assets almacenados en Needle Cloud en otros motores como Unity o Unreal.
1. **Descargar e importar**  
   Puedes descargar el asset e importarlo en tu proyecto.

2. **Enlace directo**   
   Puedes usar el enlace directo al asset en tu proyecto. De esta manera, puedes actualizar el asset en Needle Cloud y se actualizará automáticamente en tu proyecto. Qué enlace usar depende del motor y sus capacidades glTF:
    - Soporte para **glTF con Progressive Loading**:   
      Usa el enlace `Progressive-World` o `Progressive-Product`.
      Consulta [npm:@needle-tools/gltf-progressive](https://www.npmjs.com/package/@needle-tools/gltf-progressive) para más información sobre progressive loading y cómo habilitarlo para tu motor.

    - Soporte para **glTF con Draco y KTX2**:
      Usa el enlace `Optimized`.
    - Soporte para glTF, pero **sin extensiones de compresión**:  
      Usa el enlace `Upload` (para cargas gltf/glb) o `Converted` (para otras cargas).

3. **Componente Needle Cloud Asset**   
   Si estás usando Needle Engine, puedes usar el componente `Needle Cloud Asset` para cargar assets en *tiempo de ejecución*. Elegirá automáticamente el mejor enlace para tu plataforma y cargará el asset con Progressive Loading. Esto también es compatible en *tiempo de ejecución* en Unity Builds.

## CLI para Assets

La interfaz de línea de comandos (CLI) para Needle Cloud permite automatizar la carga y compresión de archivos. La CLI se puede usar como parte de un paso de compilación (reemplazando un asset por una versión optimizada), o como una herramienta independiente (para el procesamiento por lotes de archivos).

Consulta [npm:needle-cloud](https://www.npmjs.com/package/needle-cloud) para más información sobre la CLI y cómo usarla.

## RBAC (control de acceso basado en roles)

Los equipos constan de miembros, y a cada miembro de un equipo se le puede asignar un rol. Estos roles definen lo que puedes y no puedes hacer dentro de un equipo en Needle Cloud.

A medida que tu proyecto crece y añades más miembros al equipo, puedes asignarles roles para asegurarte de que tengan los permisos adecuados para trabajar en tus proyectos.

| | |
| -- | -- |
| **Owner** | Nivel más alto de autoridad. El rol de Owner puede gestionar todo el equipo (incluyendo la facturación y los roles de los miembros), ver todos los proyectos, cargas y despliegues. |
| **Manager** | El rol de Manager puede gestionar todo el equipo (incluyendo la facturación y los roles de los miembros), ver todos los proyectos, cargas y despliegues. |
| **Billing** | El rol de Billing está especializado en operaciones financieras, puede supervisar la información de facturación del equipo, revisar y gestionar los costos del proyecto y manejar las opciones de pago. <br/>El rol de Billing tiene acceso de solo lectura a los despliegues y assets y no puede realizar despliegues ni subir assets. <br/>El rol de Billing se puede asignar sin costo adicional. El rol está limitado a un miembro por equipo. |
| **Member** | El rol de Member (rol de desarrollador) puede crear despliegues, subir/descargar assets para optimización o usar funciones de IA. |

## FAQ

1. **¿Qué es Needle Cloud?**   
   Es un servicio online para subir, comprimir y compartir assets y escenas 3D.

2. **¿Cómo subo assets a Needle Cloud?**   
   Puedes subir archivos arrastrándolos al sitio web, o subiéndolos directamente desde las integraciones soportadas. Si tienes muchos archivos, puedes usar la CLI (interfaz de línea de comandos) o la API (interfaz de programación de aplicaciones).

3. **¿Cómo descargo archivos optimizados desde Needle Cloud?**   
   Puedes descargar archivos desde el sitio web. Haz clic en `Share` y luego en `Download`. También puedes usar la CLI para descargar archivos.

4. **¿Puedo compartir mis archivos con otros?**   
   Sí, puedes crear enlaces para compartir tus archivos. Los enlaces pueden ser enlaces de descarga directa o enlaces al visor de Needle Cloud.

5. **¿Hay un límite de tamaño de archivos?**   
   Los límites de subida dependen de tu plan. Revisa los detalles de tu cuenta para más información.

6. **¿Se pueden usar los archivos de Needle Cloud con otras herramientas?**   
   Sí, puedes usar tus archivos en otros programas exportándolos como glTF. La exportación a USD llegará más adelante.

7. **¿Qué pasa si me quedo sin espacio de almacenamiento?**   
   Es posible que necesites actualizar tu plan o eliminar archivos antiguos para liberar espacio.

8. **Más respuestas**   
   Visita las [FAQ de Needle Cloud](https://cloud.needle.tools/faq)


Página traducida automáticamente con IA