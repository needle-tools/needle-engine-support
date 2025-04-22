<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <span style="font-size: 50px;">✨</span> 
</div>

# Integración con otras herramientas

Needle Engine está diseñado para ser flexible y extensible. Puede integrarse con otras herramientas y servicios para mejorar tu flujo de trabajo y llevar 3D rico e interactivo a la web desde cualquier software.

En el núcleo de una integración personalizada con Needle Engine se encuentra el formato 3D glTF. Este es el formato más ampliamente soportado para 3D en la web y el más versátil. Este formato ligero puede almacenar modelos 3D, animaciones, texturas y todo tipo de datos adicionales. glTF es extensible, que es exactamente por lo que lo elegimos como base para Needle Engine. Nos permite añadir características ricas y capacidades interactivas a los archivos 3D, incluyendo mejor renderizado, físicas, interacciones, XR, redes y más.

Como resultado de usar el formato glTF estandarizado para el intercambio, crear una integración básica en cualquier software es fácil: simplemente exporta tus assets 3D como archivos glTF e impórtalos en Needle Engine. A partir de ahí, puedes añadir más características a tu integración para soportar nuestras extensiones de scripting. Usualmente, esto se hace a través de un plugin, extensión o hook de exportación en tu software 3D.

## Estructura de una integración personalizada
La estructura de una integración personalizada se ve así:

1.  Exporta tus assets 3D como archivos glTF. En este punto, tu integración es probablemente tan simple como hacer clic en el botón de exportar en tu software 3D.
2.  Usa el archivo glTF en un proyecto web usando Needle Engine.
    -   Puede ser un proyecto web creado con otra integración, descargado de una muestra, o un nuevo proyecto web hecho con `npx needle-create`.
    -   Exporta el archivo glTF a la carpeta `assets`. Tu aplicación web debería actualizarse automáticamente cada vez que reexportes el archivo glTF.
3.  En este punto, tienes una integración básica funcional y ya podrías añadir funcionalidad personalizada a través de TypeScript en el proyecto web.
4.  El siguiente paso es añadir una forma de crear y ajustar componentes en tu software. Dependiendo del software, esto puede hacerse a través de una interfaz de usuario personalizada, un script o un plugin.
    -   Para empezar, prueba con un componente como `DragControls`. Tiene algunas opciones, pero los valores por defecto son suficientes para empezar.
    -   Luego, pasa a componentes que requieren configuración. Un buen punto de partida son nuestras `Everywhere Actions`, porque permiten a los creadores construir una amplia gama de experiencias interactivas sin necesidad de escribir código.
5.  Exporta esos componentes como parte de la extensión glTF `NEEDLE_components` para cada nodo. Usualmente, esto se hace añadiendo una extensión o hook de glTF personalizado al exportador de glTF existente en tu software.
6.  Integra con un proyecto web para que se pueda generar una interfaz de usuario para los componentes personalizados. Para Unity y Blender, llamamos a esto `Component Compiler`; crea automáticamente una interfaz de usuario para los componentes en tu proyecto y sirve como puente entre los componentes TypeScript y tu software 3D.

## Integrar el flujo de trabajo del proyecto web

Una integración completa también podría gestionar más del flujo de trabajo del proyecto web. Todas estas operaciones pueden hacerse desde la command line, pero para facilitar su uso, pueden envolverse perfectamente en una GUI o un menú personalizado en tu software 3D. Esto incluye:

1.  Crear un nuevo proyecto o cambiar la ubicación del proyecto web.
2.  Ejecutar el proyecto web desde tu software 3D.
    -   Nuestra [integración de Unity](./../unity/) sobrescribe el botón "Play" para ejecutar el proyecto web.
    -   La [integración de Blender](./../blender/) tiene un botón "Play" personalizado que ejecuta el proyecto web.
3.  Construir el proyecto web en una carpeta.
4.  Subir el proyecto construido a Needle Cloud u otra plataforma, y recordar el Project ID y el Team ID.
    -   Nuestra integración de Unity además muestra las últimas subidas para tu equipo y te permite saltar al último despliegue de un proyecto.
5.  Subir/descargar assets individuales a Needle Cloud u otra plataforma.

:::tip ¡Ponte en contacto si planeas construir una integración personalizada!
Por favor, ponte en contacto con nosotros si estás interesado en construir una integración personalizada. Estaremos encantados de ayudarte con el proceso y explicar más detalles. Para los clientes Enterprise, también ofrecemos integraciones personalizadas como servicio.
:::

Página traducida automáticamente usando IA