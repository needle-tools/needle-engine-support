---
title: Frameworks, Bundlers, HTML
---

## Bundling y frontends web

Needle Engine se construye como un web component.
Esto significa que basta con instalar `@needle-tools/engine` en tu proyecto e incluir `<needle-engine src="path/to/your.glb">` en cualquier parte de tu proyecto web.

- Instalar usando npm:
  `npm i @needle-tools/engine`

Con nuestra plantilla de proyecto por defecto basada en Vite, Needle Engine se empaqueta (bundled) en una aplicación web en el momento del despliegue. Esto asegura archivos más pequeños, tree-shaking (similar a code stripping en Unity) y optimiza los tiempos de carga. En lugar de descargar numerosos scripts y componentes pequeños, solo se descargan uno o unos pocos que contienen el código mínimo necesario.

Vite (nuestro bundler por defecto) tiene una buena explicación de por qué las aplicaciones web deberían ser empaquetadas (bundled): [Why Bundle for Production](https://vitejs.dev/guide/why.html)

### Vite, Vue, React, Svelte, React Three Fiber...

Needle Engine no tiene preferencia sobre la elección del framework. Nuestra plantilla por defecto usa el popular [vite](https://vitejs.dev) como bundler. Desde ahí, puedes añadir vue, svelte, nuxt, react, react-three-fiber u otros frameworks, y tenemos ejemplos para muchos de ellos. También puedes integrar otros bundlers, o no usar ninguno — solo HTML y Javascript planos.

Aquí tienes algunos ejemplos de stacks tecnológicos posibles y con los que usamos Needle Engine:

- **Vite + HTML** — ¡Esto es lo que usa nuestra plantilla por defecto!

- **Vite + Vue** — ¡Esto es lo que usa la web de [Needle Tools](https://needle.tools)! Encuentra un ejemplo para descargar [aquí](https://github.com/needle-tools/needle-engine-samples).
- **Vite + Svelte**
- **Vite + SvelteKit**
- **Vite + React** — ¡Hay una plantilla experimental incluida con la integración de Unity para esto que puedes elegir al generar un proyecto!
- **react-three-fiber** — ¡Hay una plantilla experimental incluida con la integración de Unity para esto que puedes elegir al generar un proyecto!
- **Vercel & Nextjs** — Encuentra un [proyecto de ejemplo con nextjs aquí](https://github.com/needle-engine/nextjs-sample)
- **CDN sin ningún bundler** — Encuentra un ejemplo de código [aquí](./vanilla-js.md)

En resumen: actualmente proporcionamos una plantilla minimalista con vite, pero puedes extenderla o cambiar a otros frameworks –
Cuéntanos qué y cómo construyes, y cómo podemos mejorar la experiencia para tu caso de uso o proporcionar un ejemplo.

:::tip
Algunos frameworks requieren ajustes personalizados en `needle.config.json`. Aprende más [aquí](./reference/needle-config-json.md). Típicamente, se necesita configurar el `baseUrl`.
:::

:::details ¿Cómo creo una plantilla de proyecto personalizada en Unity?

Puedes crear y compartir tus propias plantillas de proyecto web para usar otros bundlers, sistemas de compilación o ninguno en absoluto.

**Crear una nueva Plantilla**
1. Selecciona `Create/Needle Engine/Project Template` para añadir una ProjectTemplate a la carpeta que quieres usar como plantilla.
2. ¡Hecho! Es así de sencillo.

Las dependencias provienen de Unity cuando hay un NpmDef en el proyecto (es decir, cuando tu proyecto usa referencias locales).
También podrías publicar tus paquetes en npm y referenciarlos a través del número de versión.
:::

### Tree-shaking para reducir el tamaño del bundle

Tree shaking se refiere a una práctica común en el bundling de aplicaciones web ([ver docs de MSDN](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)). Significa que las rutas de código y características que no se usan en tu código serán eliminadas del archivo(s) javascript final empaquetado para reducir el tamaño del archivo. Consulta a continuación las características que Needle Engine incluye y cómo eliminarlas:

:::details ¿Cómo eliminar el motor de físicas Rapier? (Reduce el tamaño total del bundle eliminando ~2MB (~600KB al usar gzipping))

- **Opción 1**: vía config needlePlugins:
  Establece `useRapier` a `false` en tu vite.config: `needlePlugins(command, needleConfig, { useRapier: false }),`

- **Opción 2**: vía config vite.define:
  Declara la definición `NEEDLE_USE_RAPIER` con `false`
  ```js
  define: {
    NEEDLE_USE_RAPIER: false
  },
  ```

- **Opción 3**: vía .env
  Crea un archivo `.env` en tu proyecto web y añade `VITE_NEEDLE_USE_RAPIER=false`

- **Opción 4**: vía componente de Unity
  Añade el componente `Needle Engine Modules` a tu escena y establece `Physics Engine` a `None`
  ![](/imgs/unity-needle-engine-modules-physics.jpg)

:::

## Creando una PWA

Apoyamos la creación sencilla de una Progressive Web App (PWA) directamente desde nuestra plantilla de vite.
Las PWAs son aplicaciones web que se cargan como páginas web o sitios web normales, pero pueden ofrecer funcionalidades de usuario como trabajar sin conexión, notificaciones push y acceso al hardware del dispositivo, tradicionalmente solo disponibles para aplicaciones móviles nativas.

Por defecto, las PWAs creadas con Needle tienen soporte sin conexión y opcionalmente pueden actualizarse automáticamente cuando publicas una nueva versión de tu aplicación.

1) Instala el [plugin Vite PWA](https://vite-pwa-org.netlify.app/) en tu proyecto web: `npm install vite-plugin-pwa --save-dev`
2) Modifica `vite.config.js` como se muestra a continuación. Asegúrate de pasar el mismo objeto `pwaOptions` tanto a `needlePlugins` como a `VitePWA`.

```js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async ({ command }) => {

    // Create the pwaOptions object.
    // You can edit or enter PWA settings here (e.g. change the PWA name or add icons).
    /** @type {import("vite-plugin-pwa").VitePWAOptions} */
    const pwaOptions = {};

    const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");

    return {
        plugins: [
            // pass the pwaOptions object to the needlePlugins and the VitePWA function
            needlePlugins(command, needleConfig, { pwa: pwaOptions }),
            VitePWA(pwaOptions),
        ],
        // the rest of your vite config...
```

:::tip Todos los assets se cachean por defecto
Ten en cuenta que, por defecto, todos los assets en tu carpeta de compilación se añaden al precache de la PWA. Para aplicaciones grandes con muchos assets dinámicos, esto puede no ser lo que quieres (imagina la PWA de YouTube cacheando todos los vídeos una vez que un usuario abre la aplicación). Consulta [Más opciones de PWA](#more-pwa-options) para saber cómo personalizar este comportamiento.
:::

### Probando PWAs

Para probar tu PWA, despliega la página, por ejemplo usando el componente `DeployToFTP`.
Luego, abre la página desplegada en un navegador y comprueba si las funcionalidades de la PWA funcionan como se espera:
- la aplicación aparece como instalable
- la aplicación funciona sin conexión
- la aplicación es detectada como PWA capaz de funcionar sin conexión por [pwabuilder.com](https://pwabuilder.com/)

Las PWAs usan Service Workers para cachear recursos y proporcionar soporte sin conexión. Los Service Workers son algo más difíciles de usar durante el desarrollo, y típicamente solo se habilitan para builds (por ejemplo, cuando usas un componente `DeployTo...`).

Puedes habilitar el soporte para PWA en desarrollo añadiendo lo siguiente al objeto de opciones en tu `vite.config.js`.

```js
const pwaOptions = {
  // Note: PWAs behave different in dev mode.
  // Make sure to verify the behaviour in production builds!
  devOptions: {
    enabled: true,
  }
};
```

Ten en cuenta que las PWAs en modo de desarrollo no soportan el uso sin conexión; intentarlo puede resultar en un comportamiento inesperado.

### Actualizar automáticamente aplicaciones en ejecución

Las webs típicamente muestran contenido nuevo o actualizado al refrescar la página.

En algunas situaciones, puede que desees que la página se refresque y recargue automáticamente cuando se haya publicado una nueva versión –
como en un museo, feria comercial, pantalla pública u otros escenarios de larga duración.

Para habilitar las actualizaciones automáticas, establece la propiedad `updateInterval` en el objeto pwaOptions a una duración (en milisegundos) en la que la aplicación debe buscar actualizaciones. Si se detecta una actualización, la página se recargará automáticamente.

```js
const pwaOptions = {
  updateInterval: 15 * 60 * 1000, // 15 minutes, in milliseconds
};
```

:::tip Recargas periódicas y datos del usuario
No se recomienda usar recargas automáticas en aplicaciones donde los usuarios están interactuando con formularios u otros datos que podrían perderse en una recarga. Para estas aplicaciones, se recomienda mostrar un aviso de recarga.
Consulta la [documentación del plugin Vite PWA](https://vite-pwa-org.netlify.app/guide/prompt-for-update.html) para obtener más información sobre cómo implementar un aviso de recarga en lugar de la recarga automática.
:::

### Más opciones de PWA

Dado que Needle usa el [plugin Vite PWA](https://vite-pwa-org.netlify.app/) internamente, puedes usar todas las opciones y hooks proporcionados por este.
Por ejemplo, puedes proporcionar un manifiesto parcial con un título de aplicación o color de tema personalizado:

```js
const pwaOptions = {
  // manifest options provided here will override the defaults
  manifest: {
    name: "My App",
    short_name: "My App",
    theme_color: "#B2D464",
  }
};
```

Para requisitos complejos como cacheo parcial, Service Workers personalizados o diferentes estrategias de actualización, puedes eliminar la opción `{ pwa: pwaOptions }` de `needlePlugins` y añadir la funcionalidad PWA directamente a través del plugin Vite PWA.

## Acceso a Needle Engine y Componentes desde javascript externo

El código que expones puede ser accedido desde JavaScript después del bundling. Esto permite construir viewers y otras aplicaciones donde hay una división entre los datos conocidos en tiempo de edición y los datos conocidos solo en tiempo de ejecución (por ejemplo, archivos cargados dinámicamente, contenido generado por el usuario).
Para acceder a componentes desde javascript regular fuera del motor, consulta la sección de [interoperabilidad con javascript regular](./scripting.md#accessing-needle-engine-and-components-from-anywhere)

## Personalizando la apariencia de carga

Consulta la sección *Loading Display* en la [referencia de componentes de needle engine](./reference/needle-engine-attributes.md)

### Estilos integrados

La apariencia de carga de needle-engine puede usar un skin claro u oscuro.
Para cambiar la apariencia, usa el atributo `loading-style` en el web component `<needle-engine>`.
Las opciones son `light` y `dark` (por defecto):

``<needle-engine loading-style="light"></needle-engine>``

### Estilo de carga personalizado — *PRO feature* #

Consulta la sección *Loading Display* en la [referencia de componentes de needle engine](./reference/needle-engine-attributes.md)

![custom loading](/imgs/custom-loading-style.webp)

Página traducida automáticamente con IA