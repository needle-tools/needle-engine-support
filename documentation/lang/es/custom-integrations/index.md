<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Logo de Needle" alt="Logo de Needle"/> +
    <span style="font-size: 50px;">✨</span>
</div>

# Integrar con otras herramientas

Needle Engine está diseñado para ser flexible y extensible. Puede integrarse con otras herramientas y servicios para mejorar tu workflow y llevar 3D rico e interactivo a la web desde cualquier software.

En el núcleo de una integración personalizada con Needle Engine se encuentra el formato 3D glTF. Este es el formato más ampliamente soportado para 3D en la web, y el más versátil. Este formato lightweight puede almacenar modelos 3D, animaciones, texturas, y todo tipo de extra data. glTF es extensible, que es exactamente por lo que lo elegimos como base para Needle Engine. Nos permite añadir rich features y interactive capabilities a los archivos 3D, incluyendo mejor rendering, physics, interactions, XR, networking, y más.

Como resultado de usar el formato glTF estandarizado para el intercambio, crear una integración básica en cualquier software es fácil – simplemente exporta tus assets 3D como archivos glTF e impórtalos en Needle Engine. A partir de ahí, puedes añadir más features a tu integración, para soportar nuestras scripting extensions. Usualmente, esto se hace via un plugin, extension o export hook en tu software 3D.

## Estructura de una integración personalizada
La estructura de una integración personalizada se ve así:

1. Exporta tus assets 3D como archivos glTF. At this point, tu integración es likely as simple as clicking the export button en tu software 3D.
2. Usa el archivo glTF en un web project using Needle Engine.
   - This can be a web project created with another integration, downloaded from a sample, or a new web project made with `npx needle-create`.
   - Export the glTF file into the `assets` folder. Your web app should automatically refresh whenever you re-export the glTF file.
3. At this point, you have a basic functional integration, y you could already add custom functionality via TypeScript in the web project.
4. The next step is to add a way to create and adjust components in your software. Depending on the software, this can be done through a custom UI, a script, or a plugin.
   - To start, try with a component like `DragControls`. It has a few options, but the defaults are good enough to get started.
   - Then, move onto components that require configuration. A good starting point are our `Everywhere Actions`, because they allow creators to build a wide range of interactive experiences without needing to write any code.
5. Export those components as part of the `NEEDLE_components` glTF extension for each node. Usually, this is done by adding a custom glTF extension or hook to the existing glTF exporter in your software.
6. Integrate with a web project so that UI can be generated for custom components. For Unity y Blender, we call this `Component Compiler` – it automatically creates a UI for the components in your project, y serves as a bridge between TypeScript components y your 3D software.

## Integrar el workflow del proyecto web

Una fully-flegded integration might also manage more of the web project workflow. All of these operations can be done from the command line, but for ease of use, they can be neatly wrapped in a GUI or a custom menu in your 3D software. This includes:

1. Creating a new project or changing the location of the web project
2. Running the web project from within your 3D software
   - Our [Unity integration](./../unity/) overrides the "Play" button to run the web project.
   - The [Blender integration](./../blender/) has a custom "Play" button that runs the web project.
3. Building the web project to a folder
4. Uploading the built project to Needle Cloud or another platform, y remembering the Project ID y Team ID
   - Our Unity integration additionally shows the last uploads for your team, y allows you to jump to the last deployment of a project.
5. Uploading/downloading individual assets to Needle Cloud or another platform

:::tip ¡Ponte en contacto si planeas construir una integración personalizada!
Please reach out to us si estás interested in building a custom integration. We are happy to help you with the process, y explain more of the details. For Enterprise customers, we also provide custom integrations as a service.
:::

Página traducida automáticamente usando IA