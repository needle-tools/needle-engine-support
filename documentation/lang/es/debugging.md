---
title: Cómo Depurar
---

## Recursos útiles para trabajar con glTF

Para inspeccionar archivos glTF o glb en línea:
- [gltf.report](https://gltf.report/) - basado en three.js
- [modelviewer.dev/editor](https://modelviewer.dev/editor) - basado en three.js
- [Khronos glTF Sample Viewer](https://github.khronos.org/glTF-Sample-Viewer-Release/)
- [Babylon Sandbox](https://sandbox.babylonjs.com/)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)

Para inspeccionarlos localmente:
- usa la [Extensión de Shell glTF para Windows](https://apps.microsoft.com/store/detail/gltf-shell-extensions/9NPGVJ9N57MV?hl=en-us&gl=US) para convertir entre glTF y glb
- usa la [Extensión de VS Code glTF Tools](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode) para ver errores de validación y previsualizaciones en el motor localmente

## Parámetros de URL integrados

Las banderas de depuración se pueden añadir como parámetros de consulta de URL.
Usa ``?help`` para obtener una lista de TODOS los parámetros disponibles.

Aquí tienes algunos de los más utilizados:

- ``help`` imprime todos los parámetros url disponibles en la consola
- ``console`` abre una consola de desarrollador en pantalla, útil para depuración móvil
- ``printGltf`` registra los archivos gltf cargados en la consola
- ``stats`` muestra el módulo FPS y registra estadísticas del renderizador threejs cada pocos segundos
- ``showcolliders`` visualiza los colliders de física
- ``gizmos`` habilita el renderizado de gizmo (p. ej., al usar componentes BoxCollider o AxesHelper)
- y mucho más: por favor, usa ``help`` para verlos todos

## Métodos de Depuración

Needle Engine también tiene algunos métodos de depuración muy potentes y útiles que forman parte de la clase estática `Gizmos`. Consulta la [documentación de scripting](./scripting.md#gizmos) para más información.

## Pruebas locales de compilaciones de lanzamiento
- Primero, instala http-server: `npm install -g http-server`
- crea una build (de desarrollo o producción)
- abre el directorio *dist* con una herramienta de línea de comandos
- ejecuta `http-server -g` | *`-g` habilita el soporte gzip*
- opcional: si quieres probar WebXR, genera un [certificado SSL autofirmado](https://stackoverflow.com/a/35231213), luego ejecuta `http-server -g -S` para habilitar https (requerido para WebXR).

## VSCode

Puedes adjuntar VSCode al servidor local en ejecución para establecer puntos de interrupción y depurar tu código. Puedes leer más sobre [depuración con VSCode](https://code.visualstudio.com/docs/editor/debugging) aquí.

Crea un archivo launch.json en `.vscode/launch.json` en tu proyecto web con el siguiente contenido:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Attach Chrome",
            "url": "https://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

Si has cambiado el puerto en el que se inicia tu servidor, asegúrate de actualizar el campo `url` en consecuencia.
Luego puedes iniciar tu servidor local desde VSCode:

![](/debugging/vscode-start-debugging.webp)

## Móvil

### Depuración en Android

Para la depuración en **Android**, puedes adjuntar las Herramientas de Desarrollo de Chrome a tu dispositivo y ver los logs directamente desde tu PC. Tienes que poner tu dispositivo en modo desarrollador y conectarlo vía USB.

Consulta la documentación oficial de Chrome [aquí](https://developer.chrome.com/docs/devtools/remote-debugging/)
- Asegúrate de que el [Modo Desarrollador](https://developer.android.com/studio/debug/dev-options) está habilitado en tu teléfono
- Conecta tu teléfono a tu ordenador vía USB
- Abre esta url en tu navegador ``chrome://inspect/#devices``
- En tu dispositivo móvil, permite la conexión USB a tu ordenador
- En tu ordenador en Chrome, deberías ver una lista de pestañas abiertas después de un rato (en ``chrome://inspect/#devices``)
- Haz clic en ``Inspect`` en la pestaña que quieras depurar

### Depuración en iOS

Para una depuración fácil en iOS, añade el parámetro URL ``?console`` para obtener una útil consola JavaScript en pantalla.

Si tienes un Mac, también puedes adjuntar a Safari (similar al flujo de trabajo de Android anterior).

El uso y la depuración de WebXR en iOS requieren usar un navegador de terceros: [Mozilla WebXR Viewer](https://labs.mozilla.org/projects/webxr-viewer/).

### Depuración en Quest

Quest es simplemente un dispositivo Android; consulta la sección [Depuración en Android](#android-debugging) para los pasos.


Página traducida automáticamente usando IA