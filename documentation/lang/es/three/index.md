<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Logo de Needle" alt="Logo de Needle"/> +
    <img src="/imgs/logo-webcomponents.png" style="max-height:70px;" title="Logo de Web Components" alt="Logo de Web Components"/> +
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="Logo de three.js" alt="Logo de three.js"/>
</div>

# Needle Engine como Web Component

Needle Engine proporciona un web component fácil de usar que se puede utilizar para mostrar escenas 3D ricas e interactivas directamente en HTML con solo unas pocas líneas de código. Es el mismo web component que impulsa nuestras integraciones.

Una vez que superes las opciones de configuración del web component, puedes extenderlo con scripts y componentes personalizados, y acceso programático completo al grafo de escena.

:::tip ¡Usa las integraciones!
Para escenas 3D complejas e iteración rápida, recomendamos usar Needle Engine con una de nuestras integraciones. Proporcionan un potente flujo de trabajo de creación, incluyendo una vista previa en vivo, hot reloading y un pipeline de construcción avanzado con optimizaciones 3D.
:::

### Inicio Rápido
::: code-tabs
@tab index.html
@[code html](@code/basic-webcomponent.html)

@tab Resultado
```html
<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%;
    aspect-ratio: 16/9;
    outline: none;
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>
```
:::
[Abrir este ejemplo en Stackblitz](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)



## Instalar desde npm

Puedes trabajar directamente con Needle Engine sin usar ninguna Integración. Needle Engine usa [three.js](https://threejs.org/) como grafo de escena y librería de renderizado, por lo que toda la funcionalidad de three.js también está disponible en Needle.

Puedes instalar Needle Engine desde [`npm`](https://www.npmjs.com/package/@needle-tools/engine) ejecutando:
<br/>
`npm i @needle-tools/engine`

## Instalar needle-engine desde un CDN

Aunque nuestra plantilla predeterminada usa [vite](https://vitejs.dev), Needle Engine también se puede usar directamente con Javascript puro – sin usar ningún bundler.

Puedes añadir una versión completa y preempaquetada de Needle Engine a tu sitio web con solo una línea de código.
Esto incluye nuestros componentes principales, física, partículas, redes, XR, y más. ¡Usa esto si no estás seguro!

```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine@4/dist/needle-engine.min.js">
</script>
```


Muchos ejemplos se pueden encontrar en [StackBlitz](https://stackblitz.com/@marwie/collections/needle-engine).

## Prototipado Rápido en StackBlitz

Para experimentos rápidos, proporcionamos un enlace conveniente para crear un nuevo proyecto listo para empezar: [engine.needle.tools/new](https://engine.needle.tools/new)
También hay disponible una gran colección de ejemplos en nuestra [Needle Engine Stackblitz Collection](https://stackblitz.com/@marwie/collections/needle-engine)

## Desarrollo Local con VS Code

Si quieres trabajar con Needle Engine sin ninguna integración, entonces probablemente querrás ejecutar un servidor local para tu sitio web. Aquí te mostramos cómo puedes hacerlo con Visual Studio Code:

1. Abre la carpeta con tu archivo HTML en Visual Studio Code.
2. Instala la extensión [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
3. Activa live-server (hay un botón "Go Live" en el pie de página de VSCode)
4. Abre ``http://localhost:5500/index.html`` en tu navegador web, si no se abre automáticamente.


## three.js y Needle Engine

Como Needle Engine usa [three.js](https://threejs.org/) como grafo de escena y librería de renderizado, toda la funcionalidad de three.js también está disponible en Needle y se puede usar desde scripts de componentes. Estamos usando un fork de three.js que incluye características y mejoras adicionales, especialmente en relación con WebXR, Animación y exportación USDZ.


::: tip
Asegúrate de actualizar la ruta ``<needle-engine src="myScene.glb">`` a un archivo glb existente
o [descarga este archivo glb de ejemplo](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb) y ponlo en la misma carpeta que el index.html, nómbralo ``myScene.glb`` o actualiza la ruta src.
:::

@[code](@code/basic-html.html)


[Ver en github](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla)

---
Página traducida automáticamente usando IA