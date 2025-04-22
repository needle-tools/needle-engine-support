# Needle Engine en tu sitio web

Needle Engine se puede utilizar para crear nuevas aplicaciones web, y también se puede integrar en sitios web existentes. En ambos casos, querrás _subir_ la carpeta de distribución de tu proyecto a un alojamiento web para que sea accesible para todo el mundo.

Hay varias formas de integrar Needle Engine con tu sitio web. Cuál es mejor depende de una serie de factores, como la complejidad de tu proyecto, si utilizas scripts personalizados o solo componentes principales, cuánto control tienes sobre el sitio web de destino, cuál es el "nivel de confianza" entre tú y el sitio web de destino, etc.

## Pruébalo

Si quieres probar rápidamente cómo se verán los proyectos hechos con Needle en tu sitio web, simplemente añade estas dos líneas en cualquier parte de tu página para probar:

:::: code-group
::: code-group-item Option 1: Embedding Needle
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb"></needle-engine>
```
:::
::: code-group-item Option 2: Using an iframe
```html
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px">
</iframe>
```
:::
::: code-group-item Resulting Website
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px" style="border:0; outline: 0;">
</iframe>
::::

# Formas de crear aplicaciones web con Needle

Los flujos de trabajo más comunes para llevar Needle Engine a tu sitio web son:
1. [Uso de los componentes "Deploy to ..."](#uso-de-los-componentes-deploy-to-...)
2. [Subir tu aplicación web a una carpeta](#subir-tu-aplicación-web-a-una-carpeta)
3. [Incrustar un proyecto Needle en un sitio web existente](#incrustar-un-proyecto-needle-en-un-sitio-web-existente)

## Uso de los componentes "Deploy to ..."

Nuestras integraciones de Needle Engine vienen con opciones de despliegue integradas. Puedes desplegar tu proyecto en Needle Cloud, servidores FTP, Glitch, Itch.io, GitHub Pages y más con solo unos pocos clics.

Consulta la sección [Despliegue](./deployment.md) para obtener más información sobre cada una de estas opciones.

1. Añade el componente "Deploy to ..." que quieras usar a tu escena en Unity o Blender.
2. Configura las opciones necesarias y haz clic en "Deploy".
3. ¡Eso es todo! Tu proyecto ya está activo.

:::tip Flujo de trabajo recomendado
Esta es la opción más sencilla, y recomendada para la mayoría de los flujos de trabajo – ¡es muy rápida! Puedes trabajar de forma iterativa en tu proyecto en tu ordenador, y luego subir una nueva versión a la web en segundos.
:::

## Subir tu aplicación web a una carpeta

Si no quieres usar nuestros componentes "Deploy to...", o no hay un componente para tu flujo de trabajo particular, puedes hacer el mismo proceso manualmente. La aplicación web resultante será idéntica a lo que ves en tu servidor local mientras trabajas en el proyecto.

1. Realiza una build de producción de tu proyecto web. Esto creará una carpeta `dist/` con todos los archivos necesarios, lista para la distribución. Contiene todos los archivos necesarios, incluyendo el bundle JavaScript, el archivo HTML y cualquier otro asset como texturas, audio o archivos de vídeo.
2. Sube el contenido de la carpeta `dist/` de tu Proyecto Web a tu alojamiento web. Puedes hacerlo a través de FTP, SFTP o cualquier otro método de transferencia de archivos que tu alojamiento proporcione. Consulta la documentación de tu alojamiento web para más detalles.
3. ¡Eso es todo! Tu aplicación web ya está activa.

::: tip La ubicación de la carpeta influye en la URL de tu aplicación web.
Dependiendo de la configuración de tu alojamiento, la ubicación y el nombre de la carpeta determinan cuál es la URL de tu aplicación web. Aquí tienes un ejemplo:
- Tu dominio `https://your-website.com/` apunta a la carpeta `/var/www/html` en tu espacio web.
- Subes tus archivos a `/var/www/html/my-app` para que el archivo `index.html` esté en `/var/www/html/my-app/index.html`.
- La URL de tu aplicación web es ahora `https://your-website.com/my-app/`.
:::

## Incrustar un proyecto Needle en un sitio web existente

En algunos casos, quieres que un proyecto de Needle Engine forme parte de un sitio web existente, por ejemplo, como parte de una publicación de blog, una página de producto o un portfolio. El proceso es muy similar, pero en lugar de subir los archivos a la raíz de tu espacio web, _incrustas_ el proyecto en un sitio web existente con unas pocas líneas de código.

1. Realiza una build de producción de tu proyecto web. Esto creará una carpeta `dist/` con todos los archivos necesarios, lista para la distribución. Contiene todos los archivos necesarios, incluyendo el bundle JavaScript, el archivo HTML y cualquier otro asset como texturas, audio o archivos de vídeo.
2. Sube la carpeta `dist/` de tu Proyecto Web a tu alojamiento web.
    ::: tip ¡La carpeta se puede alojar en cualquier lugar!
    Si no tienes acceso al sistema de archivos de tu alojamiento web, o no tienes forma de subir archivos allí, puedes subir la carpeta a cualquier otro espacio web y usar su URL pública en el siguiente paso.
    :::
3. Dentro de tu carpeta `dist`, encontrarás un archivo `index.html`. Queremos copiar algunas líneas de esta carpeta, así que abre el archivo en un editor de texto. Típicamente, tiene este aspecto:
    ```html
    <head>
        ...
        <script type="module" crossorigin src="./assets/index-732f0764.js"></script>
        ...
    </head>
    <body>
        <needle-engine src="assets/scene.glb"></needle-engine>
    </body>
    ```
    Hay dos líneas importantes aquí:
    - el bundle JavaScript dentro de `<script>`,
    - la etiqueta HTML `<needle-engine>`.
4. En el sitio web de destino, añade también las etiquetas `<script...>` y `<needle-engine...>`. Asegúrate de que las rutas apunten a la ubicación donde has subido los archivos.
    ```html
    <script type="module" src="/your-upload-folder/assets/index-732f0764.js"></script>
    <needle-engine src="/your-upload-folder/assets/scene.glb"></needle-engine>
    ```
5. ¡Eso es todo! La escena debería mostrarse ahora en tu sitio web.

## Incrustar un proyecto Needle como iframe

Cuando tienes acceso limitado a un sitio web, por ejemplo, cuando utilizas un CMS como WordPress, puedes usar un iframe para incrustar una escena de Needle Engine en tu sitio web. Puede que conozcas este flujo de trabajo por incrustar vídeos de YouTube o modelos de Sketchfab.

1. Realiza una build de producción de tu proyecto web. Esto creará una carpeta `dist/` con todos los archivos necesarios, lista para la distribución.
2. Sube la carpeta `dist/` de tu Proyecto Web a tu alojamiento web.
    ::: tip ¡La carpeta se puede alojar en cualquier lugar!
    Si no tienes acceso al sistema de archivos de tu alojamiento web, o no tienes forma de subir archivos allí, puedes subir la carpeta a cualquier otro espacio web y usar su URL pública en el siguiente paso.
    :::
3. Añade un iframe a tu sitio web, apuntando al archivo `index.html` en la carpeta `dist/`.
    ```html
    <iframe
        src="https://your-website.com/needle-files/dist/index.html"
        allow="xr; xr-spatial-tracking; fullscreen;">
    </iframe>
    ```
    ::: tip Permisos dentro de iframes
    La lista dentro de `allow=` depende de las características que utilice tu aplicación web. Por ejemplo, las aplicaciones XR requieren `xr` y `xr-spatial-tracking` para funcionar dentro de iframes.

    Puede que se necesiten características adicionales, por ejemplo `camera; microphone; display-capture; geolocation`. Consulta [la lista completa de directivas de iframe Permissions Policy en MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy#directives).
    :::
4. ¡Eso es todo! La escena debería mostrarse ahora en tu sitio web.

## Incrustar escenas que no utilizan scripts personalizados

Cuando tu proyecto utiliza solo componentes principales y no scripts personalizados, puedes usar Needle Engine directamente desde una CDN (red de entrega de contenido).

1. Añade el siguiente fragmento a tu sitio web, por ejemplo como "HTML Block" en tu CMS:
    ```html
    <script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
    <needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb" background-blurriness="0.8"></needle-engine>
    ```
2. Sube la carpeta `assets/` de tu Proyecto Web a tu alojamiento web. Dependiendo de la configuración de tu proyecto, esta carpeta contiene uno o más archivos `.glb` y cualquier número de otros archivos como audio, vídeo, skybox y más.
3. Cambia el atributo `src=` de la etiqueta `needle-engine` a la URL del archivo `.glb` que quieras mostrar. Típicamente, esto será una ruta como `https://your-website.com/assets/MyScene.glb`.
4. ¡Eso es todo! La escena debería mostrarse ahora en tu sitio web.

## Incrustar una aplicación web de Needle Cloud como iframe

Si has desplegado tu proyecto en Needle Cloud, puedes mostrarlo fácilmente en tu propio sitio web con un iframe.

::: warning <b>En construcción.</b> Esta sección aún no está completa.
:::

# Flujos de trabajo comunes

## Creación de una aplicación web para el sitio web de un cliente

1. **Comprende qué tipo de aplicación estás construyendo**, y si se conecta y cómo a un sitio web existente.
   A menudo, estás construyendo una aplicación independiente a la que se accede desde un enlace en el dominio del cliente.
   Pero también puede haber otros componentes del lado del servidor y del lado del cliente involucrados.

2. **Comprende desde qué URL debe ser accesible la aplicación web.**
  Esto podría ser

    - Una página en **[Needle Cloud](./cloud/)**
      `collaborativesandbox-zubcks1qdkhy.needle.run`

    - Una **Subpágina** en el sitio web del cliente
      `my-page.com/app`

    - Un nuevo **Subdominio**
      `app.my-page.com`
    - Un **Dominio** nuevo o existente
      `my-app.com`

    ::: tip Aquí no hay "bueno" ni "malo".
    Un enfoque típico es empezar en [Needle Cloud](./cloud/) para prototipos iniciales y durante el desarrollo, y pasar al espacio web y dominio del cliente para la versión final.

    La elección depende principalmente de los requisitos del cliente en cuanto a branding, SEO y configuración técnica. A menudo, tendrás que discutir esto con el departamento de TI o el webmaster del cliente.
    :::

1. **Comprende cómo se desplegará y mantendrá la aplicación web.**
    - ¿Tendrás acceso a una carpeta en el servidor web del cliente para poder subir la última versión, o ellos quieren gestionar el despliegue ellos mismos?
      ::: tip Un enfoque simple: acceso FTP
      A menudo, puedes solicitar acceso FTP o SFTP a una carpeta en el servidor web del cliente. Obtendrás una URL, nombre de usuario y contraseña, y entonces podrás subir tus archivos a esa carpeta. Proporcionamos un componente "Deploy to FTP" que hace esto particularmente fácil. El departamento de TI del cliente configurará desde qué URL se accede a la carpeta.
        :::

    - ¿Hay mucho contenido que necesita actualizarse regularmente, o la aplicación es principalmente estática?
        ::: tip Contenido estático vs. dinámico
        Para contenido principalmente estático, a menudo es suficiente con subir una nueva build de vez en cuando. Para contenido dinámico, puede que necesites un CMS (sistema de gestión de contenido) o una conexión a base de datos.
        :::
    - ¿Qué dispositivos y navegadores utiliza el público objetivo?
        ::: tip Compatibilidad con navegadores y pruebas
        Si bien Needle Engine funciona en todos los dispositivos y navegadores modernos, siempre es una buena idea probar tu aplicación en los dispositivos y navegadores que utiliza tu público objetivo para asegurarte de que todo funciona como se espera. Por ejemplo, al crear una aplicación de RA para teléfonos, querrás probarla en dispositivos Android e iOS.
        :::

2. **Configura el proyecto, un despliegue de prueba y el despliegue del cliente.**
   A menudo es una buena idea probar el proceso de despliegue pronto, para asegurarte de que comprendes cómo funciona y cuáles son los requisitos. Por ejemplo, si has decidido usar FTP, podrías configurar una carpeta de prueba en tu propio servidor web y probar el proceso de despliegue allí. Una vez que los cambios sean aprobados por el cliente, podrás desplegar en el servidor del cliente.

3. **¡Empieza a crear!**
   Con los requisitos y el despliegue definidos, ¡adelante y empieza a hacer tu proyecto! Normalmente iterarás localmente, luego desplegarás en tu servidor de prueba para su aprobación, y luego en el servidor del cliente.

## Wordpress

1. Decide el método que quieres usar para incrustar tu proyecto de Needle Engine. Puedes usar el método "Incrustar un proyecto Needle en un sitio web existente", o el método "Incrustar un proyecto Needle como iframe".
2. Sube el contenido de la carpeta `dist/` de tu Proyecto Web a tu alojamiento web. Normalmente, el directorio de subidas de Wordpress se encuentra en `wp-content/uploads/`.

    ::: tip Copias de seguridad de Wordpress
    Puedes decidir si tu nuevo proyecto debe estar en `wp-content/uploads/my-project/`, o en una ubicación diferente como `my-projects/my-project`. Esto afecta si y cómo tu proyecto se incluirá en las copias de seguridad de Wordpress.
    :::
3. En la página donde quieras añadir Needle Engine, añade un bloque `HTML` y pega el fragmento de código como se indica arriba – ya sea como script incrustado, o como iframe.

## Shopify

::: warning <b>En construcción.</b> Pendiente de documentar.
:::

## Wix

::: warning <b>En construcción.</b> Pendiente de documentar.
:::

## Webflow

::: warning <b>En construcción.</b> Pendiente de documentar.
:::


Página traducida automáticamente usando IA