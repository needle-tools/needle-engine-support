---
title: Crear y usar Componentes
tags:
    - scripting
    - serialization
    - csharp
    - typescript
    - javascript
    - components
---

# Crear componentes personalizados

Si eres nuevo en scripting, te **recomendamos encarecidamente** leer primero las siguientes guías:

- [Fundamentos de Typescript](./getting-started/typescript-essentials.md)
- [Needle Engine para Desarrolladores de Unity](./getting-started/for-unity-developers.md)

Si sabes lo que estás haciendo, siéntete libre de ir directamente a la [documentación de la API de Needle Engine](https://engine.needle.tools/docs/api/latest).

---

El código en tiempo de ejecución para Needle Engine está escrito en [TypeScript](https://typescriptlang.org) (recomendado) o [JavaScript](https://javascript.info/). Generamos automáticamente componentes stub C# a partir de eso, que puedes añadir a GameObjects en el editor. Los componentes C# y sus datos son recreados por el tiempo de ejecución como componentes JavaScript con los mismos datos y adjuntados a objetos three.js.

Tanto los componentes personalizados como los componentes integrados de Unity pueden mapearse a componentes JavaScript de esta manera. Por ejemplo, las asignaciones para muchos componentes integrados relacionados con animación, renderizado o física ya están [incluidas en Needle Engine](./component-reference.md#unity-components).

Si deseas seguir los siguientes ejemplos sin tener que instalar nada, simplemente haz clic en el siguiente enlace:

- [Crear espacio de trabajo virtual para seguir el código](https://stackblitz.com/fork/github/needle-engine/vite-template?file=src%2Fmain.ts).

----

Nuestro motor de tiempo de ejecución web adopta un modelo de componentes similar a Unity y, por lo tanto, proporciona mucha funcionalidad que resultará familiar.
Los componentes adjuntos a los objetos Object3D de three tienen métodos de ciclo de vida como ``awake``, ``start``, ``onEnable``, ``onDisable``, ``update`` y ``lateUpdate`` que puedes implementar. También puedes usar [Coroutines](#coroutines).

----

## Cuando no necesitas escribir código

A menudo, las escenas interactivas se pueden realizar utilizando Events en Unity y llamando a métodos en componentes integrados. Un ejemplo típico es reproducir una animación al hacer clic en un botón: creas un botón, añades un evento Click en el inspector y haces que llame a Animator.SetTrigger o similar para reproducir una animación específica.

Needle Engine traduce Unity Events en llamadas a métodos JavaScript, lo que hace que este flujo de trabajo sea muy rápido y flexible: configura tus eventos como de costumbre y, cuando se activen, funcionarán igual que en Unity.

![image](https://user-images.githubusercontent.com/2693840/187314594-7e34905d-e704-4fa3-835c-6b40f11e1c62.png)
_Un ejemplo de un Button Click Event que funciona de inmediato en Needle Engine — no se necesita código._

## Crear un nuevo componente
Los scripts se escriben en TypeScript (recomendado) o JavaScript.
Hay dos formas de añadir scripts personalizados a tu proyecto:

- Simplemente añade un archivo con extensión `.ts` o `.js` dentro de `src/scripts/` en la carpeta de tu proyecto web, por ejemplo `src/scripts/MyFirstScript.ts`.

- Específico de Unity:
  Organiza tu código en NPM Definition Files (paquetes npm). Estos te ayudan a modularizar y reutilizar código entre proyectos y, si estás familiarizado con el desarrollo web, de hecho son paquetes npm regulares que se instalan localmente.
  En Unity puedes crear archivos NpmDef a través de `Create > NPM Definition` y luego añadir archivos TypeScript haciendo clic derecho en un archivo NpmDef y seleccionando `Create > TypeScript`. Consulta [este capítulo](./project-structure.md#npm-definition-files) para más información.

En ambos enfoques, los directorios de origen son vigilados para detectar cambios y los componentes stub C# o paneles de Blender se regeneran cada vez que se detecta un cambio.
Los cambios en los archivos de origen también resultan en una recarga en caliente del sitio web en ejecución – no tienes que esperar a que Unity recompile los componentes C#. Esto hace que iterar sobre el código sea prácticamente instantáneo.

Incluso puedes tener múltiples tipos de componentes dentro de un mismo archivo (por ejemplo, puedes declarar `export class MyComponent1` y `export class MyOtherComponent` en el mismo archivo Typescript).

Si eres nuevo escribiendo Javascript o Typescript, te recomendamos leer primero la guía [Typescript Essentials Guide](./getting-started/typescript-essentials.md) antes de continuar con esta guía.

:::details Ejemplo: Crear un Componente que rota un objeto

- **Crear un componente que rota un objeto**
  Crea ``src/scripts/Rotate.ts`` y añade el siguiente código:
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class Rotate extends Behaviour
{
    @serializable()
    speed : number = 1;

    start(){
        // registrar esto es útil para depurar en el navegador. 
        // Puedes abrir la consola del desarrollador (F12) para ver qué datos contiene tu componente
        console.log(this);
    }

    // update se llamará en cada fotograma
    update(){
        this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
    }
}
```

Ahora, dentro de Unity, se generará automáticamente un nuevo script llamado ``Rotate.cs``. Añade el nuevo componente de Unity a un Cube y guarda la escena.
El cubo ahora está rotando dentro del navegador.
Abre la consola del desarrollador de chrome presionando `F12` para inspeccionar el registro del método ``Rotate.start``. Esta es una práctica útil para aprender y depurar qué campos se exportan y se asignan actualmente. En general, se exportan todos los campos públicos y serializables y todas las propiedades públicas.

Ahora añade un nuevo campo ``public float speed = 5`` a tu componente de Unity y guárdalo. El inspector del componente Rotate ahora muestra un campo ``speed`` que puedes editar. Guarda la escena (o haz clic en el botón ``Build``) y observa que el componente javascript ahora tiene el valor ``speed`` exportado asignado.
:::

:::details Crear componente con una función personalizada
Consulta la [Typescript Essentials Guide](./getting-started/typescript-essentials.md) para obtener más información sobre la sintaxis y el lenguaje.
```ts twoslash
import { Behaviour } from "@needle-tools/engine";

export class PrintNumberComponent extends Behaviour
{
    start(){
      this.printNumber(42);
    }
    
    private printNumber(myNumber : number){
        console.log("My Number is: " + myNumber);
    }
}
```
:::

:::details Control de Versiones y Unity
Aunque los componentes C# generados utilizan el nombre del tipo para producir GUIDs estables, recomendamos incluir los componentes generados en el control de versiones como una buena práctica.
:::

## Arquitectura de Componentes
Los componentes se añaden a los `Object3Ds` de three.js. Esto es similar a cómo se añaden los Componentes en Unity a los `GameObjects`. Por lo tanto, cuando queremos acceder a un Object3D de three.js, podemos acceder a él como ``this.gameObject``, que devuelve el `Object3D` al que está adjunto el componente.

***Nota**: Establecer ``visible`` en falso en un Object3D actuará como ``SetActive(false)`` en Unity, lo que significa que también deshabilitará todos los componentes actuales en este objeto y sus hijos. Los eventos de actualización para componentes inactivos no se llaman hasta que ``visible`` se establece nuevamente en verdadero.* Si quieres ocultar un objeto sin afectar a los componentes, simplemente puedes deshabilitar el componente `Renderer` de Needle Engine.

### Métodos del ciclo de vida

Ten en cuenta que los métodos del ciclo de vida solo se llaman cuando se declaran. Por lo tanto, solo declara los métodos del ciclo de vida `update` cuando sean realmente necesarios, de lo contrario, puede perjudicar el rendimiento si tienes muchos componentes con bucles de actualización que no hacen nada.

| Nombre del método | Descripción |
| -- | --
| `awake()` | Primer método llamado cuando se crea un nuevo componente
| `onEnable()` | Llamado cuando un componente está habilitado (por ejemplo, cuando ``enabled`` cambia de falso a verdadero)
| `onDisable()` | Llamado cuando un componente está deshabilitado (por ejemplo, cuando ``enabled`` cambia de verdadero a falso)
| `onDestroy()` | llamado cuando el Object3D o el componente está siendo destruido
| `start()` | Llamado al inicio del primer frame después de que se creó el componente
| `earlyUpdate()` | Primer evento de actualización
| `update()` | Evento de actualización por defecto
| `lateUpdate()` | Llamado después de update
| `onBeforeRender()` | Último evento de actualización antes de la llamada de renderizado
| `onAfterRender()` | Llamado después del evento de renderizado

### Métodos de eventos de física
| Nombre del método | Descripción |
| -- | --
| `onCollisionEnter(col : Collision)` | 
| `onCollisionStay(col : Collision)` | 
| `onCollisionExit(col : Collision)` | 
| `onTriggerEnter(col : Collision)` | 
| `onTriggerStay(col : Collision)` | 
| `onTriggerExit(col : Collision)` | 

### Métodos de eventos de entrada
| Nombre del método | Descripción |
| -- | --
| `onPointerEnter(args : PointerEventData)` | Llamado cuando un cursor comienza a pasar sobre un objeto (o cualquiera de sus hijos)
| `onPointerMove(args : PointerEventData)` | Llamado cuando un cursor se mueve sobre un objeto (o cualquiera de sus hijos)
| `onPointerExit(args : PointerEventData)` | Llamado cuando un cursor sale (deja de pasar sobre) un objeto
| `onPointerDown(args : PointerEventData)` | Llamado cuando se presiona un cursor sobre un objeto 
| `onPointerUp(args : PointerEventData)` | Llamado cuando se suelta un cursor sobre un objeto
| `onPointerClick(args : PointerEventData)` | Llamado cuando se hace clic con un cursor sobre un objeto

### Métodos de eventos XR
*requiere Needle Engine >= 3.32.0*
| Nombre del método | Descripción |
| -- | --
| `supportsXR(mode: XRSessionMode)` | Implementa opcionalmente si solo quieres recibir callbacks de XR para modos XR específicos como `immersive-vr` o `immersive-ar`. Retorna `true` para notificar al sistema que quieres callbacks para el modo pasado
| `onBeforeXR(mode: XRSessionMode, init: XRSessionInit)` | Llamado justo antes de que se solicite una XRSession y se puede usar para modificar el objeto XRSessionInit
| `onEnterXR(args: NeedleXREventArgs)` | Callback cuando este componente se une a una sesión xr (o se activa en una sesión XR en ejecución)
| `onUpdateXR(args: NeedleXREventArgs)` | Callback cuando una sesión xr se actualiza (mientras todavía está activa en la sesión XR)
| `onLeaveXR(args: NeedleXREventArgs)` | Callback cuando este componente sale de una sesión xr (o cuando se vuelve inactivo en una sesión XR en ejecución) 
| `onControllerAdded(args: NeedleXRControllerEventArgs)` | Callback cuando se conecta/añade un controlador mientras está en una sesión XR O cuando el componente se une a una sesión XR en ejecución que ya tiene controladores conectados O cuando el componente se activa durante una sesión XR en ejecución que ya tiene controladores conectados
| `onControllerRemoved(args: NeedleXRControllerEventArgs)` | Callback cuando se elimina un controlador mientras está en una sesión XR O cuando el componente se vuelve inactivo durante una sesión XR en ejecución

#### Eventos XR adicionales

| Nombre del método | Descripción |
| -- | --
| `window.addEventListener("needle-xrsession-start")` | CustomEvent que se invoca cuando comienza una XRSession. `details` contiene la `NeedleXRSession`
| `window.addEventListener("needle-xrsession-end")` | CustomEvent que se invoca cuando comienza una XRSession. `details` contiene la `NeedleXRSession`
| `onXRSessionStart(args: { session:NeedleXRSession } )` | Hook de evento global. Para desuscribirse, usa `offXRSessionStart`

### Coroutines

Las Coroutines se pueden declarar utilizando la [Sintaxis de Generadores de JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).
Para iniciar una coroutine, llama a ``this.startCoroutine(this.myRoutineName());``

**Ejemplo**
```ts twoslash
import { Behaviour, FrameEvent } from "@needle-tools/engine";

export class Rotate extends Behaviour {

    start() {
        // el segundo argumento es opcional y permite especificar 
        // cuándo debe llamarse en el bucle de frame actual
        // los eventos de coroutine se llaman después de los eventos de componente regulares del mismo nombre
        // por ejemplo: los eventos de coroutine Update se llaman después de las funciones component.update()
        this.startCoroutine(this.rotate(), FrameEvent.Update);
    }

    // este método se llama en cada frame hasta que el componente se deshabilita
    *rotate() {
        // seguir en bucle para siempre
        while (true) {
            yield;
        }
    }
}
```

Para detener una coroutine, sal de la rutina retornando de ella, o guarda en caché el valor de retorno de ``startCoroutine`` y llama a ``this.stopCoroutine(<...>)``. Todas las Coroutines se detienen en ``onDisable`` / al deshabilitar un componente.

## Hooks especiales del ciclo de vida

Needle Engine también expone algunos hooks del ciclo de vida que puedes usar para engancharte al bucle de actualización sin tener que escribir un componente completo.
Estos hooks pueden insertarse en cualquier punto de tu aplicación web (por ejemplo, en el ámbito de nivel superior o en un componente svelte)
| Nombre del método | Descripción |
| -- | --
| `onInitialized(cb, options)` | Llamado cuando se inicializa un nuevo contexto (antes del primer frame)
| `onClear(cb, options)` | Registra un callback antes de que se limpie el contexto del motor
| `onDestroy(cb, options)` | Registra un callback en el motor antes de que se destruya el contexto
| `onStart(cb, options)` | Llamado directamente después de que los componentes `start` al principio de un frame
| `onUpdate(cb, options)` | Llamado directamente después de que los componentes `update`
| `onBeforeRender(cb, options)` | llamado antes de llamar a render
| `onAfterRender(cb, options)` | llamado antes de llamar a render

Por ejemplo ([Ver ejemplo en stackblitz](https://stackblitz.com/edit/needle-engine-lifecycle-hooks?file=src%2Fmain.ts))
```ts twoslash
// esto puede ponerse, por ejemplo, en main.ts o en un componente svelte (similar a onMount)
import { onStart, onUpdate, onBeforeRender, onAfterRender } from "@needle-tools/engine"

onStart(ctx => console.log("Hello Scene", ctx.scene));

onUpdate(ctx => {
    // hacer algo... por ejemplo, acceder al frame # o deltatime a través de ctx.time
    console.log("UPDATE", ctx.time.frame);
});

onBeforeRender(ctx => {
    // este evento solo se llama una vez debido al argumento { once: true }
    console.log("ON BEFORE RENDER", ctx.time.frame);
}, { once: true } );

// Cada hook de evento devuelve un método para desuscribirse del evento
const unsubscribe = onAfterRender(ctx => {
    console.log("ON AFTER RENDER", ctx.time.frame);
});
// Desuscribirse del evento en cualquier momento
setTimeout(()=> unsubscribe(), 1000);
```

## Encontrar, añadir y eliminar componentes

Para acceder a otros componentes, utiliza los métodos estáticos en ``GameObject`` o los métodos ``this.gameObject``. Por ejemplo, para acceder a un componente `Renderer` en el padre, utiliza ``GameObject.getComponentInParent(this.gameObject, Renderer)`` o ``this.gameObject.getComponentInParent(Renderer)``.

**Ejemplo:**
```ts twoslash
import { Behaviour, GameObject, Renderer } from "@needle-tools/engine";

export class MyComponent extends Behaviour {

    start() {
        const renderer = GameObject.getComponentInParent(this.gameObject, Renderer);
        console.log(renderer);
    }
}
```

### Algunos de los métodos disponibles:

| Método |  |
| -- | -- 
| `GameObject.instantiate(Object3D, InstantiateOptions)` | crea una nueva instancia de este objeto incluyendo nuevas instancias de todos sus componentes 
| `GameObject.destroy(Object3D \| Component)` | destruye un componente o Object3D (y sus componentes) 
| `GameObject.addNewComponent(Object3D, Type)` | añade (y crea) un nuevo componente para un tipo al objeto proporcionado. Ten en cuenta que ``awake`` y ``onEnable`` ya se llaman cuando se devuelve el componente 
| `GameObject.addComponent(Object3D, Component)` | mueve una instancia de componente al objeto proporcionado. Es útil si ya tienes una instancia, por ejemplo, cuando creas un componente con ``new MyComponent()`` y luego lo adjuntas a un objeto.
| `GameObject.removeComponent(Component)` | elimina un componente de un gameObject
| `GameObject.getComponent(Object3D, Type)` | devuelve el primer componente que coincide con un tipo en el objeto proporcionado.
| `GameObject.getComponents(Object3D, Type)` | devuelve todos los componentes que coinciden con un tipo en el objeto proporcionado.
| `GameObject.getComponentInChildren` | igual que ``getComponent`` pero también busca en objetos hijos.
| `GameObject.getComponentsInChildren` | igual que ``getComponents`` pero también busca en objetos hijos.
| `GameObject.getComponentInParent` | igual que ``getComponent`` pero también busca en objetos padre.
| `GameObject.getComponentsInParent` | igual que ``getComponents`` pero también busca en objetos padre.
| `GameObject.findObjectOfType` | busca en toda la escena un tipo.
| `GameObject.findObjectsOfType` | busca en toda la escena todos los tipos que coinciden.

## Three.js y el HTML DOM

El contexto se refiere al tiempo de ejecución dentro de un [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
La escena de three.js vive dentro de un componente HTML personalizado llamado ``<needle-engine>`` (consulta el *index.html* en tu proyecto). Puedes acceder al web component ``<needle-engine>`` utilizando ``this.context.domElement``.

Esta arquitectura permite tener potencialmente múltiples escenas WebGL de Needle en la misma página web, que pueden ejecutarse por sí solas o comunicarse entre sí como partes de tu página web.

### Acceder a la escena
Para acceder a la escena actual desde un componente, utilizas `this.scene`, que es equivalente a `this.context.scene`; esto te da el objeto raíz de la escena de three.js.

Para recorrer la jerarquía desde un componente, puedes iterar sobre los hijos de un objeto
con un bucle for:
```ts twoslash
for(let i = 0; i < this.gameObject.children; i++) 
    console.log(this.gameObject.children[i]);
```
o puedes iterar usando el equivalente a `foreach`:
```ts twoslash
for(const child of this.gameObject.children) {
    console.log(child);
}
```
También puedes usar métodos específicos de three.js para iterar rápidamente todos los objetos recursivamente usando el método [`traverse`](https://threejs.org/docs/#api/en/core/Object3D.traverse):
```ts twoslash
import { Object3D } from "three";
this.gameObject.traverse((obj: Object3D) => console.log(obj));
```
o para recorrer solo objetos visibles, utiliza [`traverseVisible`](https://threejs.org/docs/#api/en/core/Object3D.traverseVisible) en su lugar.

Otra opción que es bastante útil cuando solo quieres iterar objetos que son renderizables es consultar todos los componentes renderer e iterar sobre ellos de la siguiente manera:
```ts twoslash
import { Renderer } from "@needle-tools/engine";
for(const renderer of this.gameObject.getComponentsInChildren(Renderer))
    console.log(renderer);
```
Para más información sobre cómo obtener componentes, consulta la siguiente sección.

### Tiempo
Usa `this.context.time` para acceder a los datos de tiempo:
- `this.context.time.time` es el tiempo transcurrido desde que la aplicación comenzó a ejecutarse
- `this.context.time.deltaTime` es el tiempo que ha pasado desde el último frame
- `this.context.time.frameCount` es el número de frames que han pasado desde que la aplicación comenzó
- `this.context.time.realtimeSinceStartup` es el tiempo sin escalar desde que la aplicación comenzó a ejecutarse

También es posible usar `this.context.time.timeScale` para ralentizar deliberadamente el tiempo para efectos de cámara lenta, por ejemplo.

### Entrada
Recibe datos de entrada para el objeto en el que se encuentra el componente:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onPointerDown() {
        console.log("POINTER DOWN on " + this.gameObject.name);
    }
}
```

También puedes suscribirte a eventos globales en la enumeración ``InputEvents`` de la siguiente manera:
```ts twoslash
import { Behaviour, InputEvents, NEPointerEvent } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    onEnable() {
        this.context.input.addEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    onDisable() {
        // se recomienda también desuscribirse de los eventos cuando el componente se vuelve inactivo
        this.context.input.removeEventListener(InputEvents.PointerDown, this.inputPointerDown);
    }

    // @nonSerialized
    inputPointerDown = (evt: NEPointerEvent) => { console.log("POINTER DOWN anywhere on the <needle-engine> element"); }
}
```

O usa ``this.context.input`` si quieres sondear el estado de entrada en cada frame:

```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    update() {
        if(this.context.input.getPointerDown(0)){
            console.log("POINTER DOWN anywhere")
        }
    }
}
```

Si quieres manejar las entradas tú mismo, también puedes suscribirte a [todos los eventos que proporciona el navegador](https://developer.mozilla.org/en-US/docs/Web/Events) (hay muchísimos). Por ejemplo, para suscribirte al evento click del navegador, puedes escribir:
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyScript extends Behaviour
{
    onEnable() {
        window.addEventListener("click", this.windowClick);
    }

    onDisable() {
        // desuscribirse de nuevo cuando el componente está deshabilitado
        window.removeEventListener("click", this.windowClick);
    }

    windowClick = () => { console.log("CLICK anywhere on the page, not just on <needle-engine>"); }
}
```
Ten en cuenta que en este caso tienes que manejar todos los casos tú mismo. Por ejemplo, es posible que necesites usar diferentes eventos si tu usuario está visitando tu sitio web en un escritorio, móvil o un dispositivo VR. Needle Engine maneja automáticamente estos casos con los eventos de entrada (por ejemplo, `PointerDown` se dispara tanto para el clic del ratón, el toque en pantalla y, en el caso de VR, al presionar un botón del controlador).

### Raycasting

Utiliza ``this.context.physics.raycast()`` para realizar un raycast y obtener una lista de intersecciones. Si no pasas ninguna opción, el raycast se realiza desde la posición del ratón (o la primera posición táctil) en espacio de pantalla utilizando la `mainCamera` actualmente activa. También puedes pasar un objeto `RaycastOptions` que tiene varias configuraciones como `maxDistance`, la cámara a usar o las capas contra las que se debe probar.

Utiliza ``this.context.physics.raycastFromRay(your_ray)`` para realizar un raycast utilizando un [three.js ray](https://threejs.org/docs/#api/en/math/Ray).

> **Nota**: Este tipo de raycast lanza un rayo contra todos los objetos visibles en la escena. No se necesita un motor de física, lo cual es diferente al comportamiento en Unity, donde siempre necesitas colliders para golpear objetos. Si quieres lanzar solo contra colliders de física, utiliza los métodos `physics.engine.raycast` descritos a continuación.

#### Consideraciones de rendimiento

Cuando se utilizan las configuraciones de compresión predeterminadas de Needle, se crean y utilizan automáticamente versiones simplificadas de las mallas para el raycasting también. Aun así, algunos tipos de mallas son lentas; por ejemplo, las mallas con skinning o las mallas con blendshapes requieren cálculos costosos para determinar los hits exactos. Considera establecer esos objetos en la capa `Ignore Raycast` en Unity para evitar el raycasting contra ellos.

#### Raycasting basado en física

Otra opción es utilizar los métodos de raycast de física que solo devolverán hits con colliders en la escena.

```ts twoslash
const hit = this.context.physics.engine?.raycast();
```

Aquí tienes un [ejemplo editable de raycast de física](https://stackblitz.com/edit/needle-engine-physics-raycast-example?file=src%2Fmain.ts,package.json,.gitignore)

### Networking
Se puede acceder a los métodos de Networking a través de ``this.context.connection``. Consulta la [documentación de networking](./networking.md) para más información.

## Acceder a Needle Engine y componentes desde cualquier lugar
Es posible acceder a toda la funcionalidad descrita anteriormente utilizando código JavaScript regular que no esté dentro de los componentes y que se encuentre en otro lugar. Todos los componentes y la funcionalidad del tiempo de ejecución de Needle son accesibles a través del namespace global ``Needle`` (puedes escribir ``console.log(Needle)`` para obtener una visión general)

Puedes encontrar componentes utilizando ``Needle.findObjectOfType(Needle.AudioSource)``, por ejemplo. Se recomienda guardar en caché estas referencias, ya que buscar en toda la escena repetidamente es costoso. Consulta la lista para [encontrar, añadir y eliminar componentes](#finding-adding-and-removing-components) arriba.

Para obtener callbacks para la carga inicial de la escena, consulta el siguiente ejemplo:
```js
<needle-engine loadstart="loadingStarted" progress="loadingProgress" loadfinished="loadingFinished"></needle-engine>

<script type="text/javascript">
function loadingStarted() { console.log("START") }
function loadingProgress() { console.log("LOADING...") }
function loadingFinished() { console.log("FINISHED!") }
</script>
```

También puedes suscribirte al `NeedleEngine` global (a veces también conocido como *ContextRegistry*) para recibir un callback cuando se haya creado un contexto de Needle Engine o para acceder a todos los contextos disponibles:
```ts twoslash
class YourComponentType extends Behaviour {}
//---cut---
import { NeedleEngine, GameObject, Behaviour } from "@needle-tools/engine";

NeedleEngine.addContextCreatedCallback((args) => {
  const context = args.context;
  const scene = context.scene;
  const myInstance = GameObject.getComponentInChildren(scene, YourComponentType);
});
```

Otra opción es usar el [hook del ciclo de vida](#special-lifecycle-hooks) `onInitialized(ctx => {})`

También puedes acceder a todos los contextos disponibles a través de `NeedleEngine.Registered`, que devuelve el array interno. (Ten en cuenta que este array no debe modificarse, pero se puede usar para iterar sobre todos los contextos activos para modificar configuraciones, por ejemplo, establecer todos los contextos en `context.isPaused = true`)

A continuación, encontrarás una lista de eventos disponibles en el tipo estático `NeedleEngine`.
Puedes suscribirte a estos eventos a través de ``NeedleEngine.registerCallback(ContextEvent.ContextCreated, (args) => {})``

| Opciones de ContextEvent | |
|---|---|
| `ContextEvent.ContextRegistered` | Llamado cuando el contexto se registra en el registro. |
| `ContextEvent.ContextCreationStart` | Llamado antes de que se cargue el primer glb y se puede usar para inicializar el motor de física. Puede devolver una promesa |
| `ContextEvent.ContextCreated` | Llamado cuando el contexto ha sido creado antes del primer frame |
| `ContextEvent.ContextDestroyed` | Llamado cuando el contexto ha sido destruido |
| `ContextEvent.MissingCamera` | Llamado cuando el contexto no pudo encontrar una cámara, actualmente solo se llama durante la creación |
| `ContextEvent.ContextClearing` | Llamado cuando el contexto se está limpiando: todos los objetos en la escena se están destruyendo y el estado interno se restablece |
| `ContextEvent.ContextCleared` | Llamado después de que el contexto ha sido limpiado |

## Gizmos

La clase estática `Gizmos` se puede usar para dibujar líneas, formas y texto, lo cual es principalmente útil para la depuración.
Todas las funciones de Gizmos tienen múltiples opciones para, por ejemplo, colores o por cuánto tiempo deben mostrarse en la escena. Internamente se almacenan en caché y se reutilizan.

| Gizmos | |
| -- | -- |
| `Gizmos.DrawLabel` | Dibuja una etiqueta con fondo opcionalmente. Puede adjuntarse a un objeto. Devuelve un identificador Label que se puede usar para actualizar el texto. |
| `Gizmos.DrawRay` | Toma un origen y una dirección en espacio de mundo para dibujar una línea de rayo infinita |
| `Gizmos.DrawDirection` | Toma un origen y una dirección para dibujar una dirección en espacio de mundo |
| `Gizmos.DrawLine` | Toma dos puntos vec3 en espacio de mundo para dibujar una línea |
| `Gizmos.DrawWireSphere` | Dibuja una esfera de estructura alámbrica en espacio de mundo |
| `Gizmos.DrawSphere` | Dibuja una esfera sólida en espacio de mundo |
| `Gizmos.DrawWireBox` | Dibuja una caja de estructura alámbrica en espacio de mundo |
| `Gizmos.DrawWireBox3` | Dibuja una box3 de estructura alámbrica |
| `Gizmos.DrawArrow` | Dibuja una flecha tomando dos puntos en espacio de mundo |

## Serialización / Components en archivos glTF
Para incrustar componentes y recrear componentes con sus tipos correctos en glTF, también necesitamos guardar tipos no primitivos (todo lo que no sea un ``Number``, ``Boolean`` o ``String``). Puedes hacerlo añadiendo un decorador ``@serializable(<type>)`` encima de tu campo o propiedad.

**Ejemplo:**
@[code ts twoslash](@code/component-object-reference.ts)

Para serializar desde y hacia formatos personalizados, es posible extender la clase ``TypeSerializer`` y crear una instancia. Usa ``super()`` en el constructor para registrar los tipos soportados.

> **Nota**: Además de los campos que coinciden, las propiedades que coinciden también se exportarán cuando coincidan con campos en el archivo typescript.

## Cargando Escenas
En Unity, los Prefabs, SceneAssets y AssetReferences (el sistema Addressable de Unity) referenciados se exportarán automáticamente como archivos glTF (consulta la documentación [Export Prefabs](export.md)).

Estos archivos glTF exportados se serializarán como URIs de cadena plana. Para simplificar la carga de estos desde componentes TypeScript, añadimos el concepto de tipos ``AssetReference``. Se pueden cargar en tiempo de ejecución y, por lo tanto, permiten diferir la carga de partes de tu aplicación o cargar contenido externo.

**Ejemplo:**
@[code ts twoslash](@code/component-prefab.ts)

Los AssetReferences se almacenan en caché por URI, por lo que si referencias el mismo glTF/Prefab exportado en múltiples componentes/scripts, solo se cargará una vez y luego se reutilizará.

# Próximos pasos

Página traducida automáticamente usando IA