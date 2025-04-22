---
title: Estructura de Proyecto Web
---

# Estructura de Proyecto de Needle Engine

### Archivos del Proyecto Web

| | |
| --- | --- |
| **Needle Engine** | |
| [`needle.config.json`](./reference/needle-config-json.md) | Configuración para las compilaciones e integraciones de Needle Engine |
| **Ecosistema** | |
| `package.json` | Configuración del proyecto que contiene nombre, versión, dependencias y scripts |
| `tsconfig.json` | Configuración del compilador de Typescript |
| `.gitignore` | Archivos y carpetas a ignorar en git |
| `vite.config.js` | Contiene configuración específica de vite.<br/>También añade los plugins de Needle Engine para vite. |


### Estructura de proyecto Vite por defecto

Nuestra plantilla de proyecto principal utiliza el ultrarrápido bundler [vite](https://vitejs.dev/). Lo siguiente muestra la estructura de la plantilla Vite que hemos creado y distribuimos (aunque es posible adaptarla a tus propias necesidades).

| | |
| --- | |
| **Carpetas** | |
| `assets/` | La carpeta assets contiene activos exportados desde Unity. Por ejemplo, archivos ``gltf`` generados, archivos de audio o vídeo. No se recomienda añadir archivos manualmente a ``assets``, ya que se eliminarán al compilar la distribución para el proyecto.
| `include/` | (opcional) - Si tienes activos personalizados que necesitas referenciar/cargar, añádelos al directorio include. Al compilar, este directorio se copiará a la carpeta de salida.
| `src/generated/` | El código javascript generado. ¡No editar manualmente!
| `src/scripts/` | Scripts / componentes específicos de tu proyecto
| `src/styles/` | Hojas de estilo
| `*` | Puedes añadir cualquier carpeta nueva aquí según desees. Asegúrate de [copiarlas](./reference/needle-config-json.md) al directorio de salida al compilar |
| **Archivos** | |
| `index.html` | La página de aterrizaje o principal de tu sitio web
| `vite.config` | La [configuración de vite](https://vitejs.dev/config/). Aquí se realizan los ajustes para compilar la distribución y alojar el servidor de desarrollo. Normalmente no es necesario editar estos ajustes.
| `src/main.ts` | Incluido desde `index.html` e importando `needle-engine`
| `*` | Puedes añadir cualquier archivo nuevo aquí según desees. Asegúrate de [copiarlos](./reference/needle-config-json.md) al directorio de salida al compilar (a menos que solo se utilicen durante el desarrollo) |

Nuestro exportador se puede utilizar también con otras estructuras de proyecto; vite es simplemente nuestra herramienta de empaquetado frontend preferida debido a su velocidad. Siéntete libre de configurar tu proyecto JavaScript como desees.

[Aprende más en la documentación sobre empaquetado y uso con otros frameworks](html.md)



---

#### Continuar leyendo

- [Guía de Typescript para Desarrolladores de Unity](./getting-started/for-unity-developers.md)
- [Conceptos Esenciales de Typescript](./getting-started/typescript-essentials.md)
- [Escribir scripts personalizados](./scripting.md)
- [Everywhere Actions](./everywhere-actions.md)

---
Página traducida automáticamente con IA