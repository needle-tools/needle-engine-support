---
title: Introducción al Scripting para Desarrolladores de Unity
---

Needle Engine proporciona una estrecha integración con el Editor de Unity. Esto permite a desarrolladores y diseñadores trabajar juntos en un entorno familiar y ofrecer experiencias web rápidas, de alto rendimiento y ligeras.

La siguiente guía está dirigida principalmente a desarrolladores con experiencia en Unity3D, pero también puede ser útil para desarrolladores con experiencia en web o three.js. Cubre temas relacionados con cómo se hacen las cosas en Unity vs en three.js o Needle Engine.

Si eres completamente nuevo en Typescript y Javascript y quieres empezar a escribir scripts para Needle Engine, te recomendamos leer la [Guía de Fundamentos de Typescript](./typescript-essentials) para tener una comprensión básica de las diferencias entre C# y Javascript/Typescript.

Si quieres seguir el código a la vez, puedes [abrir engine.needle.tools/new](https://engine.needle.tools/new) para crear un pequeño proyecto que puedes editar en el navegador ⚡

## Los Fundamentos
Needle Engine es un motor web 3D que se ejecuta sobre [three.js](https://threejs.org/). Three.js es una de las librerías de renderizado 3D basadas en webgl más populares para la web. Cada vez que nos referimos a un `gameObject` en Needle Engine, en realidad también estamos hablando de un `Object3D` de three.js, el tipo base de cualquier objeto en three.js. Ambos términos pueden usarse indistintamente. Cualquier `gameObject` *es* un `Object3D`.

Esto también significa que, si ya estás familiarizado con three.js, no tendrás ningún problema en absoluto para usar Needle Engine. Todo lo que puedes hacer con three.js también se puede hacer en Needle Engine. Si ya estás utilizando ciertas librerías, también podrás usarlas en un entorno basado en Needle Engine.

Nota: **El Exportador de Needle Engine _NO_ compila tu código C# existente a Web Assembly**.
Si bien usar Web Assembly _puede_ resultar en un mejor rendimiento en tiempo de ejecución, conlleva un alto coste para la velocidad de iteración y la flexibilidad en la construcción de experiencias web. Lee más sobre nuestra [visión](./../vision.md) y [descripción técnica general](./../technical-overview.md).

:::details ¿Cómo crear un nuevo proyecto de Unity con Needle Engine? (Vídeo)
<video-embed src="https://www.youtube.com/watch?v=gZX_sqrne8U" limit_height />
:::

## Creación de un Componente
En Unity, creas un nuevo componente derivando de `MonoBehaviour`:
```csharp
using UnityEngine;
public class MyComponent : MonoBehaviour {
}
```

Un componente personalizado en Needle Engine, por otro lado, se escribe de la siguiente manera:
```ts twoslash
import { Behaviour } from "@needle-tools/engine"
export class MyComponent extends Behaviour {
}
```
## Campos de Script

### serializable
Si has visto algunos scripts de Needle Engine, puede que hayas notado que algunas variables están anotadas con `@serializable` encima de su declaración. Este es un Decorador en Typescript y se puede usar para modificar o anotar código. En Needle Engine, se usa, por ejemplo, para que la serialización central sepa qué tipos esperamos en nuestro script cuando convierte la información bruta del componente almacenada en el glTF a una instancia de Componente.
Considera el siguiente ejemplo:
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

class SomeClass extends Behaviour{
    @serializable(Behaviour)
    myOtherComponent?: Behaviour;
    @serializable(Object3D)
    someOtherObject?: Object3D;
}
```
Esto le dice a Needle Engine que `myOtherComponent` debe ser de tipo `Behaviour`. Entonces asignará automáticamente la referencia correcta al campo cuando se cargue tu escena. Lo mismo ocurre con `someOtherObject`, donde queremos deserializar a una referencia de `Object3D`.

Ten en cuenta que en algunos casos el tipo puede omitirse. Esto se puede hacer para todos los [tipos primitivos en Javascript](https://developer.mozilla.org/en-US/docs/Glossary/Primitive). Estos son `boolean`, `number`, `bigint`, `string`, `null` y `undefined`.
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    @serializable() // < no type is needed here because the field type is a primitive
    myString?: string;
}
```

### public vs private
Los campos sin ningún modificador de acceso como `private`, `public` o `protected` serán por defecto `public` en javascript
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";
class SomeClass {
    /// no accessor means it is public:
    myNumber?: number;
    // explicitly making it private:
    private myPrivateNumber?: number;
    protected myProtectedNumber?: number;
}
```
Lo mismo ocurre con los métodos.

## GameObjects y la Escena
Para acceder a la escena actual desde un componente, usas `this.scene`, que es equivalente a `this.context.scene`; esto te da el objeto de escena three.js raíz.

Para recorrer la jerarquía desde un componente, puedes iterar sobre los hijos de un objeto
con un bucle for:
```ts twoslash
for (let i = 0; i < this.gameObject.children; i++) {
    console.log(this.gameObject.children[i]);
}
```
o puedes iterar usando el equivalente a `foreach`:
```ts twoslash
for (const child of this.gameObject.children) {
    console.log(child);
}
```
También puedes usar métodos específicos de three.js para iterar rápidamente todos los objetos de forma recursiva usando el método [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse):
```ts twoslash
import { GameObject } from "@needle-tools/engine";
//---cut-before---
this.gameObject.traverse((obj: GameObject) => console.log(obj))
```
o para recorrer solo los objetos visibles usa [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) en su lugar.

Otra opción que es bastante útil cuando solo quieres iterar sobre objetos que son renderizables es consultar todos los componentes Renderer e iterar sobre ellos así:
```ts twoslash
import { Renderer } from "@needle-tools/engine";

for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
Para más información sobre cómo obtener componentes, consulta la siguiente sección.

## Componentes
Needle Engine hace un uso intensivo de un Sistema de Componentes que es similar al de Unity. Esto significa que puedes añadir o eliminar componentes a cualquier `Object3D` / `GameObject` en la escena. Un componente se registrará en el motor cuando uses `addNewComponent(<Object3D>, <ComponentType>)`.
Los métodos de evento que tendrá el componente adjunto serán llamados automáticamente por el motor (por ejemplo, `update` o `onBeforeRender`). Puedes encontrar una lista completa de métodos de evento en la [documentación de scripting](../scripting.md#lifecycle-methods).

#### Encontrar Componentes en la Escena
Para obtener componentes, puedes usar los métodos familiares similares a los de Unity. Ten en cuenta que lo siguiente utiliza el tipo `Animator` como ejemplo, pero también puedes usar cualquier tipo de componente, ya sea integrado o creado por ti.
| Nombre del método | Descripción |
| --- | --- |
| `this.gameObject.getComponent(Animator)` | Obtiene el componente `Animator` en un GameObject/Object3D. Devolverá la instancia de `Animator` si tiene un componente Animator o `null` si el objeto no tiene dicho componente. |
| `this.gameObject.getComponentInChildren(Animator)` | Obtiene el primer componente `Animator` en un GameObject/Object3D o en cualquiera de sus hijos. |
| `this.gameObject.getComponentsInParents(Animator)` | Obtiene todos los componentes animator en la jerarquía de padres (incluido el GameObject/Object3D actual). |

Estos métodos también están disponibles en el tipo estático GameObject. Por ejemplo, ``GameObject.getComponent(this.gameObject, Animator)`` para obtener el componente `Animator` en un GameObject/Object3D pasado.

Para buscar uno o varios componentes en toda la escena, puedes usar ``GameObject.findObjectOfType(Animator)`` o `GameObject.findObjectsOfType(Animator)`.

## Tipos de Unity Renombrados
Algunos tipos específicos de Unity se asignan a diferentes nombres de tipo en nuestro motor. Consulta la siguiente lista:

| Tipo en Unity | Tipo en Needle Engine |  |
| -- | -- | -- |
| `UnityEvent` | `EventList` | Un UnityEvent se exportará como un tipo `EventList` (usa `serializable(EventList)` para deserializar UnityEvents). |
| `GameObject` | `Object3D` | |
| `Transform` | `Object3D` | En three.js y Needle Engine, un GameObject y un Transform son lo mismo (no hay un componente `Transform`). La única excepción a esta regla es al referenciar un `RectTransform`, que también es un componente en Needle Engine. |
| `Color` | `RGBAColor` | El tipo de color de three.js no tiene una propiedad alpha. Debido a eso, todos los tipos Color exportados desde Unity se exportarán como `RGBAColor`, que es un tipo personalizado de Needle Engine. |

## Transform
Se puede acceder a los datos de Transform directamente en el `GameObject` / `Object3D`. A diferencia de Unity, no hay un componente Transform extra que contenga estos datos.
- ``this.gameObject.position`` es el vector3 [posición](https://threejs.org/docs/?q=obj#api/en/core/Object3D.position) en espacio local.
- ``this.gameObject.worldPosition`` es la posición vector3 en espacio de mundo.
- ``this.gameObject.rotation`` es la [rotación de Euler](https://threejs.org/docs/?q=obj#api/en/core/Object3D.rotation) en espacio local.
- ``this.gameObject.worldRotation`` es la rotación de Euler en ángulos de Euler en espacio de mundo.
- ``this.gameObject.quaternion`` - es la [rotación de cuaternión](https://threejs.org/docs/?q=obj#api/en/core/Object3D.quaternion) en espacio local.
- ``this.gameObject.worldQuaternion`` es la rotación de cuaternión en espacio de mundo.
- ``this.gameObject.scale`` - es el vector3 [escala](https://threejs.org/docs/?q=obj#api/en/core/Object3D.scale) en espacio local.
- ``this.gameObject.worldScale`` es la escala vector3 en espacio de mundo.

La principal diferencia a tener en cuenta aquí es que `position` en three.js es por defecto una posición en espacio local, mientras que en Unity `position` sería en espacio de mundo. La siguiente sección explicará cómo obtener la posición en espacio de mundo en three.js.

### Posición, Rotación, Escala... EN ESPACIO DE MUNDO

En three.js (y por lo tanto también en Needle Engine) `object.position`, `object.rotation`, `object.scale` son todas coordenadas en espacio local. Esto es diferente a Unity, donde estamos acostumbrados a que `position` sea en espacio de mundo y a usar `localPosition` para usar deliberadamente la posición en espacio local.

Si quieres acceder a las coordenadas de mundo en Needle Engine, tenemos métodos de utilidad que puedes usar con tus objetos. Llama a `getWorldPosition(yourObject)` para calcular la posición de mundo. Existen métodos similares para rotación/cuaternión y escala. Para acceder a esos métodos, simplemente impórtalos desde Needle Engine de esta manera: `import { getWorldPosition } from "@needle.tools/engine"`.

Ten en cuenta que estos métodos de utilidad como `getWorldPosition`, `getWorldRotation`, `getWorldScale` tienen internamente un buffer de instancias de Vector3 y están destinados a ser usados solo localmente. Esto significa que no debes almacenarlos en caché en tu componente, de lo contrario tu valor almacenado en caché será finalmente sobrescrito. Pero es seguro llamar a `getWorldPosition` varias veces en tu función para hacer cálculos sin tener que preocuparte por reutilizar la misma instancia. Si no estás seguro de lo que esto significa, deberías echar un vistazo a la sección **Tipos Primitivos** en la [Guía de Fundamentos de Typescript](./typescript-essentials.md#primitive-types).

## Tiempo
Usa `this.context.time` para acceder a los datos de tiempo:
- `this.context.time.time` es el tiempo transcurrido desde que la aplicación empezó a ejecutarse.
- `this.context.time.deltaTime` es el tiempo que ha pasado desde el último fotograma.
- `this.context.time.frameCount` es el número de fotogramas que han pasado desde que la aplicación empezó.
- `this.context.time.realtimeSinceStartup` es el tiempo sin escala desde que la aplicación empezó a ejecutarse.

También es posible usar `this.context.time.timeScale` para ralentizar deliberadamente el tiempo, por ejemplo, para efectos de cámara lenta.

## Raycasting
Usa ``this.context.physics.raycast()`` para realizar un raycast y obtener una lista de intersecciones. Si no pasas ninguna opción, el raycast se realiza desde la posición del ratón (o la primera posición táctil) en espacio de pantalla usando la `mainCamera` actualmente activa. También puedes pasar un objeto `RaycastOptions` que tiene varias configuraciones como `maxDistance`, la cámara a usar o las capas contra las que se probará.

Usa ``this.context.physics.raycastFromRay(your_ray)`` para realizar un raycast usando un [rayo de three.js](https://threejs.org/docs/#api/en/math/Ray).

Ten en cuenta que las llamadas anteriores realizan raycasting por defecto contra objetos visibles de la escena. Esto es diferente a Unity, donde siempre necesitas colliders para golpear objetos. La solución por defecto de three.js tiene pros y contras, siendo uno de los principales contras que puede funcionar bastante lento dependiendo de la geometría de tu escena. Puede ser especialmente lento al hacer raycasting contra mallas con skinning. Por lo tanto, se recomienda establecer generalmente los objetos con SkinnedMeshRenderers en Unity a la capa `Ignore Raycast`, que luego serán ignorados por defecto por Needle Engine también.

Otra opción es usar los métodos de raycast de física, que solo devolverán aciertos con colliders en la escena.

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Aquí tienes un [ejemplo editable para raycast de física](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore).

## Entrada
Usa ``this.context.input`` para consultar el estado de entrada:

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update(){
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN")
        }
    }
}
```

También puedes suscribirte a eventos en la enumeración ``InputEvents`` de esta manera:
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable(){
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }
    onDisable() {
        // it is recommended to also unsubscribe from events when your component becomes inactive
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    inputPointerDown = (evt: NEPointerEvent) => { console.log(evt); }
}
```

Si quieres manejar las entradas tú mismo, también puedes suscribirte a [todos los eventos que proporciona el navegador](https://developer.mozilla.org/en-US/docs/Web/Events) (hay muchísimos). Por ejemplo, para suscribirte al evento de clic del navegador, puedes escribir:
```ts twoslash
window.addEventListener("click", () => { console.log("MOUSE CLICK"); });
```
Ten en cuenta que en este caso tienes que manejar todos los casos tú mismo. Por ejemplo, es posible que necesites usar diferentes eventos si tu usuario está visitando tu sitio web en escritorio vs móvil vs un dispositivo VR. Estos casos son manejados automáticamente por los eventos de entrada de Needle Engine (por ejemplo, `PointerDown` se activa tanto para clic del ratón, toque en pantalla y, en caso de VR, para pulsación de botón del controlador).

## Callbacks del Sistema de Entrada
Similar a Unity (consulta [IPointerClickHandler en Unity](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.IPointerClickHandler.html)), también puedes registrarte para recibir eventos de entrada en el propio componente.

```ts twoslash
import { Behaviour, PointerEventData } from "@needle-tools/engine";

export class ReceiveClickEvent extends Behaviour {
    onPointerClick(args: PointerEventData) {
        console.log("Click", args);
    }
}
```

Eventos de puntero disponibles para todos los componentes:
- `onPointerDown`
- `onPointerUp`
- `onPointerEnter`
- `onPointerMove`
- `onPointerExit`
- `onPointerClick`

Todos tienen un argumento `PointerEventData` que describe el evento.

## Debug.Log
El equivalente a `Debug.Log()` en javascript es `console.log()`. También puedes usar `console.warn()` o `console.error()`.
```ts twoslash
import { GameObject, Renderer } from "@needle-tools/engine";
const someVariable = 42;
// ---cut-before---

console.log("Hello web");
// You can pass in as many arguments as you want like so:
console.log("Hello", someVariable, GameObject.findObjectOfType(Renderer), this.context);
```

## Gizmos
En Unity, normalmente tienes que usar métodos especiales para dibujar Gizmos como `OnDrawGizmos` o `OnDrawGizmosSelected`. En Needle Engine, en cambio, tales métodos no existen y eres libre de dibujar gizmos desde cualquier parte de tu script. Ten en cuenta que entonces también es tu responsabilidad *no* dibujarlos, por ejemplo, en tu aplicación web desplegada (puedes simplemente filtrarlos por `if(isDevEnvironment))`).

Aquí tienes un ejemplo para dibujar una esfera de alambre roja durante un segundo, por ejemplo, para visualizar un punto en espacio de mundo.
```ts twoslash
import { Vector3 } from "three";
const hit = { point: new Vector3(0, 0, 0) };
// ---cut-before---
import { Gizmos } from "@needle-tools/engine";
Gizmos.DrawWireSphere(hit.point, 0.05, 0xff0000, 1);
```
Aquí están algunos de los métodos de gizmo disponibles:
| Nombre del método |  |
| --- | --- |
| `Gizmos.DrawArrow` | |
| `Gizmos.DrawBox` | |
| `Gizmos.DrawBox3` | |
| `Gizmos.DrawDirection` | |
| `Gizmos.DrawLine` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawRay` | |
| `Gizmos.DrawSphere` | |
| `Gizmos.DrawWireSphere` | |


## Métodos de Utilidad Útiles

Importa desde `@needle-tools/engine`, por ejemplo `import { getParam } from "@needle-tools/engine"`

| Nombre del método | Descripción |
| --- | --- |
| `getParam()` | Comprueba si existe un parámetro de URL. Devuelve true si existe pero no tiene valor (por ejemplo, `?help`), false si no se encuentra en la URL o está establecido a 0 (por ejemplo, `?help=0`), de lo contrario devuelve el valor (por ejemplo, `?message=test`). |
| `isMobileDevice()` | Devuelve true si se accede a la aplicación desde un dispositivo móvil. |
| `isDevEnvironment()` | Devuelve true si la aplicación actual se está ejecutando en un servidor local. |
| `isMozillaXR()` | |
| `isiOS` | |
| `isSafari` | |

```ts twoslash
import { isMobileDevice } from "@needle-tools/engine"
if( isMobileDevice() )
```

```ts twoslash
import { getParam } from "@needle-tools/engine"
// returns true
const myFlag = getParam("some_flag")
console.log(myFlag)
```

## El proyecto Web
En C#, normalmente trabajas con una solución que contiene uno o muchos proyectos. En Unity, esta solución es gestionada por Unity para ti, y cuando abres un script C#, abre el proyecto y te muestra el archivo.
Normalmente instalas Paquetes usando el gestor de paquetes integrado de Unity para añadir características proporcionadas por Unity u otros desarrolladores (ya sea en tu equipo o, por ejemplo, a través del AssetStore de Unity). Unity hace un gran trabajo facilitando la adición y gestión de paquetes con su PackageManager, y puede que nunca hayas tenido que editar manualmente un archivo como el `manifest.json` (esto es lo que usa Unity para rastrear qué paquetes están instalados) o ejecutar un comando desde la línea de comandos para instalar un paquete.

En un entorno web, usas `npm` -el Node Package Manager- para gestionar dependencias / paquetes por ti. Básicamente hace lo mismo que el PackageManager de Unity: instala (descarga) paquetes desde *algún* servidor (normalmente se le llama *registro* en ese contexto) y los coloca dentro de una carpeta llamada `node_modules`.

Al trabajar con un proyecto web, la mayoría de tus dependencias se instalan desde [npmjs.com](https://npmjs.com/). Es el registro de paquetes más popular para proyectos web.

Aquí tienes un ejemplo de cómo podría verse un package.json:
```json
{
  "name": "@optional_org/package_name",
  "version": "1.0.0",
  "scripts": {
    "start": "vite --host"
  },
  "dependencies": {
	  "@needle-tools/engine": "^3.5.9-beta",
	  "three": "npm:@needle-tools/three@0.146.8"
	},
  "devDependencies": {
	  "@types/three": "0.146.0",
	  "@vitejs/plugin-basic-ssl": "^1.0.1",
	  "typescript": "^5.0.4",
	  "vite": "^4.3.4",
	  "vite-plugin-compression": "^0.5.1"
	}
}
```

Nuestra plantilla por defecto usa Vite como su bundler y no tiene ningún framework frontend preinstalado. Needle Engine no tiene opinión sobre qué framework usar, así que eres libre de trabajar con el framework que prefieras. Tenemos ejemplos para frameworks populares como Vue.js, Svelte, Next.js, React o React Three Fiber.

## Instalación de paquetes y dependencias
Para instalar una dependencia desde npm, puedes abrir tu proyecto web en una línea de comandos (o terminal) y ejecutar `npm i <el/nombre_del_paquete>` (abreviatura de `npm install`).
Por ejemplo, ejecuta `npm i @needle-tools/engine` para instalar [Needle Engine](https://www.npmjs.com/package/@needle-tools/engine). Esto añadirá el paquete a tu `package.json` en el array `dependencies`.
Para instalar un paquete solo como devDependency, puedes ejecutar `npm i --save-dev <nombre_del_paquete>`. Más información sobre la diferencia entre dependencies y devDependencies a continuación.

### ¿Cuál es la diferencia entre 'dependencies' y 'devDependencies'?
Puede que hayas notado que hay dos entradas que contienen *dependency*: `dependencies` y `devDependencies`.

`dependencies` **siempre se instalan** (o empaquetan) cuando se instala tu proyecto web o en casos en los que desarrollas una librería y tu paquete se instala como una dependencia de otro proyecto.

`devDependencies` **solo** se instalan al desarrollar el proyecto (lo que significa que cuando ejecutas `install` directamente en el directorio específico) y, de lo contrario, **no** se incluyen en tu proyecto.

### ¿Cómo instalo otro paquete o dependencia y cómo usarlo?
La sección [Instalación](#instalacin) nos enseñó que puedes instalar dependencias ejecutando `npm i <package_name>` en el directorio de tu proyecto, donde `package_name` puede ser cualquier paquete que encuentres en [npm.js](https://npmjs.org).

Supongamos que quieres añadir una librería de tweening a tu proyecto. Usaremos [`@tweenjs/tween.js`](https://www.npmjs.com/package/@tweenjs/tween.js) para este ejemplo. [Aquí](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts) está el proyecto final si quieres adelantarte y simplemente ver el resultado.

Primero, ejecuta `npm install @tweenjs/tween.js` en la terminal y espera a que termine la instalación. Esto añadirá una nueva entrada a nuestro package.json:
```json
"dependencies": {
    "@needle-tools/engine": "^3.5.11-beta",
    "@tweenjs/tween.js": "^20.0.3",
    "three": "npm:@needle-tools/three@0.146.8"
}
```

Luego abre uno de tus archivos de script en el que quieras usar tweening e importa al principio del archivo:
```ts twoslash
import * as TWEEN from '@tweenjs/tween.js';
```
Ten en cuenta que aquí importamos todos los tipos de la librería escribiendo `* as TWEEN`. También podríamos importar solo tipos específicos como `import { Tween } from @tweenjs/tween.js`.

Ahora podemos usarlo en nuestro script. Siempre se recomienda consultar la documentación de la librería que quieras usar. En el caso de tween.js, proporcionan una [guía de usuario](https://github.com/tweenjs/tween.js/blob/HEAD/docs/user_guide.md) que podemos seguir. Normalmente, la página Readme del paquete en npm contiene información sobre cómo instalar y usar el paquete.

Para rotar un cubo, creamos un nuevo tipo de componente llamado `TweenRotation`, luego procedemos a crear nuestra instancia de tween para la rotación del objeto, cuántas veces debe repetirse, qué easing usar, el tween que queremos realizar y luego lo iniciamos. Luego solo tenemos que llamar a `update` en cada fotograma para actualizar la animación de tween. El script final se ve así:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
import * as TWEEN from '@tweenjs/tween.js';

export class TweenRotation extends Behaviour {

    // save the instance of our tweener
    private _tween?: TWEEN.Tween<any>;

    start() {
        const rotation = this.gameObject.rotation;
        // create the tween instance
        this._tween = new TWEEN.Tween(rotation);
        // set it to repeat forever
        this._tween.repeat(Infinity);
        // set the easing to use
        this._tween.easing(TWEEN.Easing.Quintic.InOut);
        // set the values to tween
        this._tween.to({ y: Math.PI * 0.5 }, 1000);
        // start it
        this._tween.start();
    }

    update() {
        // update the tweening every frame
        // the '?' is a shorthand for checking if _tween has been created
        this._tween?.update();
    }
}
```
Ahora solo tenemos que añadirlo a cualquiera de los objetos de nuestra escena para rotarlos indefinidamente.
Puedes ver el script final en acción [aquí](https://stackblitz.com/edit/needle-engine-tweenjs-example?file=src%2Fmain.ts).


# Aprende más

- [Scripting en Needle Engine](../scripting)
- [Fundamentos de Typescript](./typescript-essentials.md)
- [Referencia de Componentes](../component-reference.md)


Página traducida automáticamente usando IA