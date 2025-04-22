---
title: Testing on local devices
---

## Pruebas en dispositivos locales

Cuando se utilizan nuestras plantillas, Needle Engine ejecuta un servidor de desarrollo local. Simplemente pulse play y se abrirá un sitio web en su navegador predeterminado, listo para realizar pruebas en su dispositivo local. Para realizar pruebas en otros dispositivos de la misma red, es posible que deba instalar un certificado autofirmado (consulte a continuación).

Cuando utilice una configuración/framework personalizada, consulte la documentación de su framework sobre cómo ejecutar un servidor de desarrollo local seguro.

::: tip
Nuestro servidor local utiliza la dirección IP de su red local (por ejemplo, `https://192.168.0.123:3000`) en lugar de `localhost:3000`. Esto le permite ver y probar rápidamente su proyecto desde dispositivos móviles, gafas de RV y otras máquinas de la misma red.

Utilizamos HTTPS en lugar del antiguo HTTP, porque las potentes API web modernas como WebXR requieren una conexión segura; la S significa "secure" (seguro).
:::

## Configuración de un certificado autofirmado para desarrollo

Los diferentes sistemas operativos tienen diferentes requisitos de seguridad para el desarrollo local. Normalmente, la visualización de un sitio web funcionará incluso con un certificado no fiable autogenerado, pero los navegadores pueden advertir sobre la falta de confianza y algunas funciones no están disponibles. Aquí tiene un resumen:

::: tip
Se recomienda instalar certificados autofirmados de confianza en sus dispositivos de desarrollo para una experiencia de desarrollo fluida. Encuentre los pasos al final de esta página.
:::

**Predeterminado – con certificado no fiable autogenerado**
_Muestra una advertencia de certificado al abrir el proyecto en un navegador._
_Utiliza el paquete npm [vite-plugin-basic-ssl](https://github.com/vitejs/vite-plugin-basic-ssl)._

Utilizamos conexiones websocket para comunicarnos entre el navegador y el servidor de desarrollo local. Los websockets requieren una conexión segura (HTTPS) para funcionar. Dependiendo de la plataforma, es posible que necesite configurar un certificado personalizado para el desarrollo local. Android y Windows no necesitan un certificado personalizado, pero iOS y MacOS sí.

| OS | Visualización en el navegador<br/>(con una advertencia de seguridad) | Recargas automáticas |
| --- | --- | --- |
| Windows | (✓) | ✓ |
| Linux | (✓) | ✓ |
| Android | (✓) | ✓ |
| macOS | (✓) | ❌ |
| iOS | (✓ Safari y Chrome, después de recargar la página)<br/>❌ Mozilla XR Viewer | ❌ |
| Xcode Simulators | (✓ después de recargar la página) | ❌ |

**Con un certificado raíz de confianza autofirmado**
_No se muestra ninguna advertencia de seguridad. Es necesario instalar el certificado generado en sus dispositivos._
_Utiliza el paquete npm [vite-plugin-mkcert](https://github.com/liuweiGL/vite-plugin-mkcert)._


| OS | Visualización en el navegador | Recargas automáticas |
| --- | --- | --- |
| Windows | ✓ | ✓ |
| Linux | ✓ | ✓ |
| Android | ✓ | ✓ |
| macOS | ✓ | ✓ |
| iOS | ✓ | ✓ |

### Generación de un certificado de desarrollo autofirmado

- en Unity/Blender, haga clic en "Open Workspace" para abrir VS Code

- compruebe que está utilizando `vite-plugin-mkcert` en lugar de `vite-plugin-basic-ssl` (este último no genera un certificado raíz de confianza, que necesitamos) en su archivo `vite.config.ts`:
  - abra `package.json`
  - elimine la línea con `"@vitejs/plugin-basic-ssl"` de `devDependencies`
  - abra un Terminal en VS Code y ejecute `npm install vite-plugin-mkcert --save-dev`, que añadirá la última versión
  - abra `vite.config.ts` y reemplace `import basicSsl from '@vitejs/plugin-basic-ssl'` con `import mkcert from'vite-plugin-mkcert'`
  - en `plugins: [`, reemplace `basicSsl(),` con `mkcert(),`
  - package.json se ve así ahora:
  ![](/testing/switch-to-mkcert.webp)
- ejecute `npm run start` una vez desde el terminal de VS Code
  - en Windows, esto abrirá una nueva ventana y le guiará a través de la creación e instalación del certificado
  - en MacOS, el terminal le pedirá su contraseña y luego generará e instalará el certificado.
  - si recibe un error `Error: Port 3000 is already in use`, cierre el servidor que pueda estar aún ejecutándose desde Unity.
- el certificado generado se instalará automáticamente en la máquina en la que lo generó.
- puede detener el proceso del terminal de nuevo.
- a partir de ahora, al pulsar Play en Unity/Blender se utilizará el certificado generado para el servidor local, y no se mostrará ninguna "advertencia de seguridad", ya que su navegador ahora confía en la conexión local.

## Instalación del certificado en sus dispositivos de desarrollo

En sus dispositivos de desarrollo, necesita _instalar_ el certificado generado y permitir que el OS _confíe_ en él. Esto es diferente para cada OS. Para cada uno de ellos, necesitará el archivo rootCA.pem que se generó, y enviarlo al dispositivo que desea autenticar.

**En Windows:** encuentre el certificado en `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem`
**En MacOS:** encuentre el certificado en `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem`

Envíe el archivo a usted mismo (por ejemplo, por correo electrónico, AirDrop, iCloud, USB, Slack, ...) para que pueda acceder a él en sus dispositivos de desarrollo.

### Instalación del certificado en Android

1. Abra el archivo. Se le pedirá que instale el certificado.

### Instalación del certificado en iOS / iPadOS / VisionOS
1. Abra el archivo.
2. Se le pedirá que _añada_ el perfil a su dispositivo. Confirme.
3. Vaya a Ajustes (Settings).
4. Habrá una nueva entrada "Perfil" (Profile). Selecciónela y permita que el perfil esté _activo_ para este dispositivo.
5. En iOS / iPadOS, también necesita permitir la "Confianza del certificado raíz" (Root Certificate Trust). Para ello, busque `Confianza` (Trust) o vaya a `Ajustes > General > Información > Ajustes de confianza de certificados` (Settings > General > About > Info > Certificate Trust Settings) y habilite la confianza total para el certificado raíz.

::: tip
El certificado se instala automáticamente en la máquina en la que lo generó. Para otras máquinas de la red local, siga los pasos a continuación para establecer también una conexión de confianza.
:::

### Instalación del certificado en otra máquina MacOS
1. Abra el archivo. Se abrirá Acceso a Llaveros (Keychain Access) y le permitirá instalar el certificado.
2. Es posible que deba establecer "Confianza" (Trust) en "Permitir siempre" (Always allow).

### Instalación del certificado en otra máquina Windows
1. Abra `certmgr` ("Administrar certificados de usuario") escribiendo <kbd>tecla Windows</kbd> + `certmgr`.
2. En la barra lateral izquierda, seleccione "Entidades de certificación raíz de confianza" (Trusted Root Certification Authorities).
3. Haga clic derecho en "Certificados" (Certificates) y seleccione "Todas las tareas > Importar" (All Tasks > Import).
4. Seleccione el archivo `rootCA.pem` (es posible que deba cambiar el tipo de archivo a "todos") y siga las instrucciones.


---
Página traducida automáticamente con IA