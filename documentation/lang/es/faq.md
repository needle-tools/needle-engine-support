---
title: Preguntas Frecuentes (FAQ) 💡
---


## ¿Cómo puedo activar mi Licencia de Needle Engine?

### Activando la licencia en Unity

#### Needle Engine 4.x

Ve a Project Settings/Needle y haz clic en el botón de inicio de sesión. Sigue los pasos e inicia sesión en tu cuenta de Needle.
Después verás la información de tu cuenta en la ventana de configuración del proyecto de Unity. Selecciona el equipo con licencia del desplegable.

#### Needle Engine 3.x

Abre `Edit/Project Settings/Needle` para acceder a la configuración del plugin Needle Engine. En la parte superior de la ventana encontrarás campos para introducir la información de tu licencia.
- `Email` - Introduce el email con el que compraste la licencia
- `Invoice ID` - Introduce uno de los invoice ids que recibiste por email

Nota: Es posible que necesites reiniciar el servidor web local para aplicar la licencia.

![ventana de licencia de Unity](/imgs/unity-needle-engine-license.jpg)

### Activating the license in Blender
Abre `Addon Preferences/Needle Engine` para acceder a la configuración del addon Needle Engine
- `Email` - Introduce el email con el que compraste la licencia
- `Invoice ID` - Introduce uno de los invoice ids que recibiste por email

Nota: Es posible que necesites reiniciar el servidor web local para aplicar la licencia.



## Mi sitio web local muestra un error SSL, por ejemplo, 'Tu conexión no es privada'

Es posible que veas una advertencia en tu navegador sobre la seguridad SSL dependiendo de tu configuración local.

Esto se debe a que, si bien la conexión está encriptada, por defecto no hay un certificado SSL que el navegador pueda validar.
Si eso ocurre: haz clic en `Advanced` y luego en `Proceed to Site`. En Safari, es posible que necesites actualizar la página después, ya que no procede automáticamente. ¡Ahora deberías ver tu escena en el navegador!

El diálogo solo debería aparecer una vez para el mismo servidor local.

::: tip
Las conexiones están seguras porque forzamos HTTPS para asegurar que WebXR y otras APIs web modernas funcionen de inmediato. Algunos navegadores seguirán quejándose de que la conexión SSL (entre tu servidor de desarrollo local y el sitio web local) no se puede confiar automáticamente, y que necesitas verificar manualmente que confías en esa página. La recarga automática de página y las conexiones Websocket también pueden verse afectadas dependiendo del navegador y la configuración del sistema.

Consulta la [documentación de Testing](./testing.md) para obtener información sobre cómo configurar un certificado autofirmado para una experiencia de desarrollo más fluida.
:::

![Advertencia SSL en Chrome](/videos/ssl-warning.gif)



## Mi sitio web local se queda en negro

Si eso ocurre, suele haber una excepción en el código del motor o en tu código. Abre las herramientas de desarrollo (<kbd>Ctrl + Shift + I</kbd> o <kbd>F12</kbd> en Chrome) y revisa la Consola en busca de errores.
En algunos casos, especialmente cuando acabas de actualizar la versión del paquete Needle Engine, esto se puede solucionar deteniendo y reiniciando el servidor de desarrollo local.
Para ello, haz clic en la barra de progreso en ejecución en la esquina inferior derecha del Editor, y haz clic en la pequeña <kbd>X</kbd> para cancelar la tarea en ejecución. Luego, simplemente vuelve a pulsar Play.


## Mis objetos están blancos después de la exportación
Esto suele ocurrir cuando estás usando shaders o materiales personalizados y sus propiedades no se traducen limpiamente a nombres de propiedad conocidos para la exportación glTF.
Puedes asegurarte de estar usando materiales y shaders compatibles con glTF, o marcar los shaders como "personalizados" para exportarlos directamente.
- Lee más sobre flujos de trabajo glTF recomendados: <link>
- Lee más sobre shaders personalizados: <link>


## Uncaught ReferenceError: NEEDLE_ENGINE_META is not defined / NEEDLE_USE_RAPIER is not defined

Si estás utilizando Vite o next.js, asegúrate de añadir los plugins de Needle Engine a tu configuración.
Ejemplo para Vite:
```js
const { needlePlugins } = await import('@needle-tools/engine/plugins/vite/index.js');
plugins: [needlePlugins(command, needleConfig)]
```
Ejemplo para next.js
```js
const { needleNext } = await import("@needle-tools/engine/plugins/next/index.js");
return needleNext({}, { modules: { webpack } });
```
También puedes declarar las variables faltantes, por ejemplo, en tu `index.html` raíz en una etiqueta script como esta:
```html
<script>
  var NEEDLE_ENGINE_META = {}
  var NEEDLE_USE_RAPIER = true;
</script>
```

## THREE.EXRLoader: provided file doesnt appear to be in OpenEXR format

Por favor, asegúrate de que la codificación de Lightmap esté configurada en **Normal Quality**.
Ve a *Edit/Project Settings/Player* para cambiar la configuración.

![](/faq/lightmap_encoding.jpg)

## Mi sitio web se vuelve demasiado grande / carga lento (demasiados MB)

Esto puede tener muchas razones, pero algunas comunes son:
- demasiadas texturas o texturas demasiado grandes
- los meshes tienen demasiados vértices
- los meshes tienen atributos de vértice que realmente no necesitas (por ejemplo, tienen normales y tangentes pero no las estás usando)
- los objetos están deshabilitados y no ignorados – los objetos deshabilitados también se exportan por si quieres activarlos en tiempo de ejecución. Establece su Etiqueta a `EditorOnly` para ignorarlos completamente para la exportación.
- tienes múltiples componentes ``GltfObject`` en tu escena y todos tienen ``EmbedSkybox`` habilitado (solo necesitas tener el skybox una vez por escena que exportas)

Si el tiempo de carga en sí es un problema, puedes **intentar dividir tu contenido en múltiples archivos glb** y cargarlos bajo demanda (esto es lo que hacemos en nuestro sitio web). Para que funcione, puedes poner tu contenido en Prefabs o Scenes y referenciarlos desde cualquiera de tus scripts. Por favor, consulta [Scripting/Addressables en la documentación](./scripting.md#assetreference-and-addressables).

## Mi UI no renderiza Texto

- Para Unity: Asegúrate de usar el componente `UI/Legacy/Text` y **no** el componente `TextMeshPro - Text`

## Mis scripts no funcionan después de la exportación

- Tu código C# existente *no* se exportará tal cual, tienes que escribir el typescript / javascript correspondiente para él.
- Needle usa typescript / javascript para los componentes y genera stubs C# para ellos.
- Los componentes que ya tienen JS correspondiente lo mostrarán en el Inspector.

## Mis lightmaps se ven diferentes / demasiado brillantes

Asegúrate de seguir las [mejores prácticas para lightmaps](https://docs.needle.tools/lightmaps?utm_source=needle_docs) y lee sobre [mezclar objetos baked y non-baked](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects)

## Mi escena es demasiado brillante / la iluminación se ve diferente que en Unity
Asegúrate de que tus luces estén configuradas en "Baked" o "Realtime". "Mixed" no es compatible actualmente.

- Las luces configuradas en mixed (con lightmapping) afectan a los objetos dos veces en three.js, ya que actualmente no hay forma de excluir objetos con lightmap de la iluminación.
- El factor ``Intensity Multiplier`` para Skybox en ``Lighting/Environment`` no es compatible actualmente y no tiene efecto en Needle Engine.
  ![image](https://user-images.githubusercontent.com/5083203/185429006-2a5cd6a1-8ea2-4a8e-87f8-33e3afd080ec.png)
- La intensidad de la sombra de la luz no se puede cambiar actualmente debido a una limitación de three.js.

Consulta también la documentación sobre [mezclar objetos baked y non-baked](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects).


## ¿La resolución de mi skybox es baja? Cómo cambiar la resolución de mi skybox

- **Si usas un custom cubemap**: Puedes anular la configuración de importación de textura de la textura del skybox (asignada a tu cubemap).

  ![image](https://user-images.githubusercontent.com/5083203/188179104-1e078cda-3397-4ebe-aaf9-7faa23ee4904.png)


- **Si usas el default skybox**: Añade un componente ``SkyboxExportSettings`` en cualquier parte de tu escena para anular la resolución por defecto.

  ![image](https://user-images.githubusercontent.com/5083203/188171443-578380ab-2036-4d70-a8a7-f8cd9da9f603.png)



## Mis Sombras no son visibles o están cortadas

Por favor, comprueba los siguientes puntos:

- Tu luz tiene sombras habilitadas (either Soft Shadow or Hard Shadow).
- Tus objetos están configurados en "Cast Shadows: On" (see MeshRenderer component).
- Para las luces direccionales, la posición de la luz es actualmente importante, ya que la cámara de sombra se colocará donde se encuentre la luz en la escena.



## Mis colores se ven mal

Asegúrate de que tu proyecto esté configurado en espacio de color Linear colorspace.

![image](https://user-images.githubusercontent.com/5083203/191774978-66e9feb1-0551-4549-85d3-3e5b8021f162.png)



## Estoy usando networking y Glitch y no funciona si más de 30 personas visitan la página de Glitch al mismo tiempo

- Desplegar en Glitch es una forma rápida de prototipar e incluso puede funcionar para algunas producciones pequeñas. El pequeño servidor allí no tiene la potencia ni el ancho de banda para albergar a mucha gente en una sesión persistente.
- Estamos trabajando en otras ideas de networking, pero mientras tanto puedes alojar el sitio web en otro lugar (con soporte node.js) o simplemente remezclarlo para distribuir la carga entre varios servidores. También puedes alojar el [paquete de backend de networking](https://www.npmjs.com/package/@needle-tools/needle-tiny-networking-ws) en otro lugar donde pueda escalar, por ejemplo, en Google Cloud.



## Mi sitio web no tiene botones AR/VR

- Asegúrate de añadir el componente `WebXR` en algún lugar dentro de tu `GltfObject` raíz.
- Opcionalmente añade un componente `AR Session Root` en tu `GltfObject` raíz o dentro de la jerarquía de hijos para especificar la ubicación, escala y orientación para WebXR.
- Opcionalmente añade un componente `XR Rig` para controlar dónde empiezan los usuarios en VR.


## Creé un nuevo script en una sub-escena pero no funciona
Al crear nuevos scripts en npmdefs en sub-scenes (es decir, una escena que se exporta como referencia desde un script en tu escena de exportación raíz) actualmente tienes que re-exportar la escena raíz de nuevo. Esto se debe a que la generación de código responsable de registrar nuevos scripts actualmente solo se ejecuta para escenas con un componente ``ExportInfo``. Esto se solucionará en el futuro.


## Mi servidor local no se inicia / no veo un sitio web

La razón más probable es una instalación incorrecta.
Comprueba la consola y el componente `ExportInfo` en busca de errores o advertencias.

Si estas advertencias/errores no ayudaron, prueba los siguientes pasos en orden. Dales algo de tiempo para completarse. Detente una vez que tu problema se haya resuelto. Comprueba la consola en busca de advertencias y errores.

- Asegúrate de seguir los [requisitos previos](./getting-started/#prerequisites).
- Instala tu proyecto seleccionando tu componente `ExportInfo` y haciendo clic en `Install`.
- Ejecuta una instalación limpia seleccionando tu componente `ExportInfo`, manteniendo Alt y haciendo clic en `Clean Install`.
- Intenta abrir el directorio de tu proyecto web en una herramienta de línea de comandos y sigue estos pasos:
  - ejecuta ``npm install`` y luego ``npm run dev-host``
  - Asegúrate de que tanto el paquete de tiempo de ejecución local (``node_modules/@needle-tools/engine``) como three.js (``node_modules/three``) se hayan instalado.
  - Puedes ejecutar ``npm install`` también en ambos directorios.


## ¿La generación de componentes C# también funciona solo con javascript?
Aunque la generación de componentes C# técnicamente funciona también con javascript puro (vanilla), no lo recomendamos ni lo apoyamos completamente, ya que el generador tendría que adivinar o simplemente le sería imposible saber qué tipo de C# crear para tu clase de javascript. A continuación, encontrarás un ejemplo mínimo de cómo generar un componente de Unity a partir de javascript si realmente lo deseas.

```js
import { Behaviour } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    //@type float
    myField = 5;
}
```


## No tengo ningún botón como "Generate Project" en mis componentes/inspector

Por favor, comprueba que no estás accidentalmente en el modo `Debug` del Inspector; vuelve a `Normal`.
![20220824-025011-S2GQ-Unity_lKlT-needle](https://user-images.githubusercontent.com/2693840/186291615-56e7ebdb-1221-4326-813d-f88526fa126c.png)


## No se encuentra Toktx / Toktx no está instalado

- Asegúrate de [descargar e instalar toktx](http://localhost:8080/docs/getting-started/.html#instalar-estas-herramientas-para-compilaciones-de-producción).

- En Windows: Asegúrate de haber añadido toktx a tus variables de entorno del sistema. Es posible que necesites reiniciar tu equipo después de añadirlo para actualizar las variables de entorno. La ubicación de instalación por defecto es ``C:\Program Files\KTX-Software\bin``.

![image](/imgs/ktx-env-variable.webp)


## La instalación del proyecto web tarda una eternidad / nunca termina / EONET: no such file or directory
- **Asegúrate de no crear un proyecto en una unidad formateada como exFAT** porque exFAT no admite symlinks, lo cual es un requisito para Needle Engine para Unity anterior a la versión 3.x. Puedes comprobar el formato de tus unidades siguiendo estos pasos:
  1. Abre "Información del Sistema" (ya sea con la tecla de Windows y escribiendo eso o introduciendo "msinfo32" en cmd)
  2. Selecciona Componentes > Almacenamiento > Unidades
  3. Selecciona todo (<kbd>Ctrl + A</kbd>) en el lado derecho de la pantalla y cópialo (<kbd>Ctrl + C</kbd>) y pégalo aquí (<kbd>Ctrl + V</kbd>)

## NPM install fails and there are errors about hard drive / IO
Asegúrate de que tu proyecto esté en un disco que se sepa que funciona con node.js. La razón principal de los fallos es que el disco no admite symlinks (enlaces simbólicos / softlinks), lo cual es un requisito para el correcto funcionamiento de node.js.
El formato <kbd>NTFS</kbd> siempre debería funcionar. Los formatos de sistema de archivos problemáticos conocidos son <kbd>exFAT</kbd> y <kbd>FAT32</kbd>.

Para comprobar el formato de tus unidades, puedes:
1. Abre "Información del Sistema" (ya sea con la <kbd>tecla de Windows</kbd> y escribiendo "Información del Sistema" o introduciendo `msinfo32` en cmd <kbd>Windows + R</kbd>)
2. Selecciona "Componentes > Almacenamiento > Unidades"
3. Ahí, podrás ver todas las unidades y su formato listados. Pon tus proyectos en una unidad que tenga formato NTFS.


## Estoy recibiendo errores con "Unexpected token `@`. Expected identifier, string literal, numeric literal or ..."

Needle Engine utiliza decorators de typescript para la serialización.
Para solucionar este error, asegúrate de habilitar `experimentalDecorators` en tu tsconfig.json.

## Estoy recibiendo un error 'failed to load config ... vite.config.js' al ejecutar comandos npm en Mac OS

Es probable que estés usando una versión x86_64 de Unity en un procesador Apple Silicon (ARM). Unity 2020.3 solo está disponible para x86_64; las versiones posteriores también tienen versiones para Apple Silicon.
Nuestra integración de Unity que llama a npm lo hará desde un proceso x86_64, lo que resultará en el uso de la versión x86_64 de node y vite/esbuild. Si luego intentas ejecutar comandos npm en el mismo proyecto desde una aplicación de Apple Silicon (por ejemplo, VS Code), npm se quejará de arquitecturas no coincidentes con un largo mensaje de error.

Para solucionar esto, usa una versión de Unity para Apple Silicon (2021.1 o posterior).

También puedes solucionarlo temporalmente en 2020.3 eliminando la carpeta `node_modules` y ejecutando `npm install` de nuevo desde VS Code. Tendrás que eliminar `node_modules` de nuevo cuando vuelvas a Unity.

## Error de referencia circular

Esto puede ocurrir, por ejemplo, cuando tienes un `SceneSwitcher` (o cualquier otro componente que carga una escena o un asset) y el Asset referenciado en Unity contiene un `GltfObject` que tiene el mismo nombre que tu escena original con el `SceneSwitcher`. Puedes verificarlo en Unity si recibes un error que dice algo como:

```
Failed to export ↑ YourSceneName.glb
you seem to have objects with the same name referencing each other.
```

Para solucionar esto, puedes:
- Eliminar el `GltfObject` en el Prefab o Scene referenciado.
- Renombrar el GameObject con el componente que carga las escenas referenciadas.

Si esto no soluciona el problema, por favor, pregunta [en nuestro foro](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content).

## Mi escena no carga y la consola contiene una advertencia con 'circular references' o 'failed to update active state'
Por favor, consulta la sección [error de referencia circular](#circular-reference-error).

## ¿Mi máquina soporta WebGL 2?

Usa un detector [como este](https://get.webgl.org/webgl2/) para determinar si tu dispositivo soporta WebGL 2; también insinúa cuál podría ser la causa de tu problema, pero generalmente asegúrate de haber actualizado tu navegador y tus controladores. WebGL 1 no es compatible.

#### Dispositivos conocidos que causan problemas:
- Lenovo Thinkpad - T495

## Quiero usar Needle AI con mi modelo de IA local

Si quieres (o tienes que) ejecutar tu IA localmente, puedes usar los archivos llms.txt de Needle como contexto para tu IA local (por ejemplo, Ollama):

- [llms.txt](https://cloud.needle.tools/llms.txt)
- [llms-full.txt](https://cloud.needle.tools/llms-full.txt)


## ¿Aún tienes preguntas?
[Pregunta en nuestro foro](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)

<a href="https://discord.needle.tools" target="_blank"><img height=20 src="https://img.shields.io/discord/717429793926283276?color=5562ea&label=Discord" /></a>

---
Página traducida automáticamente usando IA