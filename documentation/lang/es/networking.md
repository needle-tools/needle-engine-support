# Redes

Needle Engine incluye una solución de red completa para experiencias multijugador.  
Se puede lograr un estado de mundo compartido, chat de voz, persistencia de sesión y más con nuestros componentes y API de red. Puedes poner tus propios componentes en red eligiendo entre redes automáticas o manuales.

Las redes en Needle Engine se basan en [Websockets](https://github.com/jjxxs/websocket-ts). Las redes automáticas utilizan datos JSON para facilitar su uso. Para casos de uso complejos y requisitos de alto rendimiento, utilizamos [Flatbuffers](https://google.github.io/flatbuffers/).

Se puede acceder a la funcionalidad principal de red utilizando ``this.context.connection`` desde un componente. El servidor backend predeterminado conecta a los usuarios a salas. Los usuarios en la misma sala compartirán estado y recibirán mensajes entre sí.

## Conceptos de Redes

### Salas y Estado

En el centro de las redes en Needle Engine se encuentra el concepto de salas sincronizadas. Cada sala tiene una ID, y los usuarios se conectan a una sala proporcionando esta ID. Las salas se almacenan en un servidor, y los usuarios pueden unirse y salir de las salas en cualquier momento.  
Cuando un usuario se une a una sala, recibe el estado actual de la sala, aplica ese estado actual a su escena y luego escucha los cambios en el estado de la sala.  
Cuando un usuario sale de una sala, deja de escuchar los cambios en el estado de la sala.

El estado de la sala se almacena como datos JSON en el servidor, por lo que todos los cambios son persistentes. Esto significa que el estado de la sala no solo es útil para las redes, sino también para persistir acciones de un solo usuario.

Needle puede proporcionar _IDs de solo visualización_ para las salas. Al acceder a una sala con una ID de solo visualización, el usuario no podrá interactuar con la sala, pero podrá ver el estado actual y recibir actualizaciones en vivo. Esto es útil para presentaciones o demostraciones.

### Propiedad

Los objetos en una sala pueden ser _propiedad_ de un usuario. Esto significa que solo el propietario de un objeto puede cambiar su estado.
Por defecto, los objetos no tienen propietario.
Componentes como `DragControls` solicitarán la propiedad de un objeto antes de moverlo realmente.
En componentes personalizados, puedes controlar cómo se maneja la propiedad.
Puede que no se requiera propiedad, puede que se permita la transferencia automática de propiedad a otro usuario, o que la propiedad solo se transfiera mediante una acción específica.

Cuando un usuario abandona una sala, los objetos propiedad de ese usuario serán eliminados o se les restablecerá la propiedad, dependiendo de cómo se creó el objeto.

## Habilitar Redes para tu proyecto

1.  Añade un componente `SyncedRoom` a tu escena. Por defecto, esto utilizará la infraestructura de red proporcionada por Needle.
2.  Añade un componente `SyncedTransform` a un objeto cuyo movimiento quieras sincronizar a través de la red.
3.  Añade un componente `DragControls` al mismo objeto.
4.  Ejecuta el proyecto. En el navegador, haz clic en "Join Room" y copia la URL.
5.  Abre una nueva ventana del navegador y pega la URL. Ahora deberías ver el mismo objeto en ambas ventanas. Intenta arrastrar el objeto en una ventana y mira cómo se mueve en la otra ventana.

El componente `DragControls`, como muchos otros componentes de Needle, tiene soporte de red incorporado.
La propiedad se transferirá a quien empiece a arrastrar el objeto.

## Componentes Incorporados con Soporte de Redes

| Componente | Descripción |
| --- | --- |
| `SyncedRoom` | Gestiona la conexión de red y la conexión a una sala. |
| `SyncedTransform` | Gestiona la sincronización de transforms. |
| `SyncedCamera` | Genera un prefab para cualquier usuario conectado a la sala que seguirá su posición. |
| `VoIP` | Gestiona conexiones de audio voz sobre IP, acceso al micrófono, etc., entre usuarios. |
| `ScreenCapture` | Gestiona el compartir pantalla a través de las API web. |
| `Networking` | Utilízalo para personalizar la URL del backend del servidor. También permite configurar un servidor local para desarrollo. |
| `DragControls` | Gestiona el arrastre de objetos. La propiedad se pasará automáticamente al último usuario que arrastre un objeto. |
| `Duplicatable` | Gestiona la duplicación de objetos. Los objetos duplicados se instancian para todos en la sala. |
| `Deletable` | Gestiona la eliminación de objetos. Las eliminaciones se sincronizan a través de la red. |
| `DeleteBox` | Gestiona la eliminación de objetos que tienen un componente "Deletable" cuando se arrastran a un volumen de caja. |
| `PlayerSync` | Potente componente que instancia un objeto específico para cada jugador conectado. |
| `PlayerState` | Añade este componente a los objetos asignados a `PlayerSync`. |
| `PlayerColor` | Componente simple para colores específicos del jugador. A cada usuario se le asigna un color aleatorio al unirse a una sala. Este componente asigna ese color al material principal del objeto. |
| `WebXR` | Gestiona la sincronización de avatares de usuario (manos y cabezas). |

## Redes Automáticas para Componentes Personalizados

Los campos de tus propios componentes pueden ser conectados en red muy fácilmente. Los cambios en el campo se detectarán automáticamente y se enviarán a todos los usuarios de la sala. Los cambios también se persisten como parte del estado de la sala, por lo que los usuarios que se unan a la sala más tarde también recibirán el estado actual del campo, asegurando que todos vean los mismos datos.

Para conectar automáticamente en red un campo en un componente, decóralo con el decorador ``@syncField()``:

::::code-group
:::code-group-item Sincronizar un número
```ts twoslash
import { Behaviour, syncField } from "@needle-tools/engine"

export class SyncedNumber extends Behaviour {

    // Use `@syncField` to automatically network a field. 
    // You can optionally assign a method or method name to be called when the value changes.
    @syncField("myValueChanged")
    mySyncedValue?: number = 1;
    
    private myValueChanged() {
       console.log("My value changed", this.mySyncedValue);
    }
    
    onPointerClick() {
       this.mySyncedValue = Math.random();
    }
}
```
:::
:::code-group-item Sincronizar el color de un objeto
<!-- SAMPLE network color change -->
:::
::::

Ten en cuenta que syncField tiene un parámetro opcional para especificar un método que debe llamarse cuando el valor cambia. Este método debe definirse en la misma clase.

::: tip Configuración de proyecto personalizado
Si estás utilizando una configuración de proyecto personalizado, necesitas tener ``experimentalDecorators: true`` en tu archivo ``tsconfig.json`` para que los decoradores syncField funcionen. Los proyectos creados con Needle Starters tienen esto habilitado por defecto.
:::

## Creación y destrucción de objetos

A menudo, querrás crear y destruir objetos en tiempo de ejecución, y por supuesto estos cambios deberían sincronizarse a través de la red.

El componente `PlayerSync` simplifica este proceso instanciando automáticamente un objeto específico para cada jugador conectado.
Cuando un jugador sale de la sala, el objeto se destruye para todos los usuarios.

Además, Needle Engine proporciona dos métodos de alto nivel:
- [`syncInstantiate()`](https://engine.needle.tools/docs/api/latest/syncInstantiate) para duplicar objetos a través de la red.
- [`syncDestroy()`](https://engine.needle.tools/docs/api/latest/syncDestroy) para destruir objetos a través de la red.

> 🏗️ Ejemplos de código en construcción

## Redes Manuales

Needle Engine también proporciona una API de bajo nivel para enviar y recibir mensajes. A esto lo llamamos "redes manuales". Los principios son los mismos, pero tienes control total sobre el envío y la recepción de mensajes y cómo manejarlos.

### Envío de Mensajes

Envía un mensaje a todos los usuarios en la misma sala:
```ts
this.context.connection.send(key: string, data: IModel | object | boolean | string | number | null);
```

### Recepción de Mensajes

Puedes suscribirte a eventos en la sala usando una clave específica.
Normalmente, querrás que esto coincida con la cancelación de la suscripción:

- Suscribirse en `onEnable` y cancelar la suscripción en `onDisable`.
Con este enfoque, no se recibirán mensajes mientras el objeto esté deshabilitado.

- O suscribirse en `start` y cancelar la suscripción en `onDestroy`.
Con este enfoque, se seguirán recibiendo mensajes mientras el objeto esté deshabilitado.

```ts
this.context.connection.beginListen(key:string, callback:(data) => void)
```

Cancelar suscripción a eventos:
```ts
this.context.connection.stopListen(key:string)
```

### Control de la persistencia de mensajes

Al enviar mensajes de red, la API de bajo nivel te permite decidir si ese mensaje debe ser persistido (guardado en el estado de la sala) o no (solo enviado a los usuarios actualmente en la sala). Para persistir un mensaje, asegúrate de que tenga un campo `guid`. Este campo se utiliza típicamente para aplicar los datos del mensaje a un objeto específico, proporcionando el guid de ese objeto. Si quieres apuntar a un objeto específico (y, por lo tanto, incluir un campo `guid`) pero quieres que los datos no se persistan, establece el campo `dontSave` en `true` en tu mensaje.

Todos los mensajes persistentes se guardan en el estado de la sala y se enviarán a los usuarios que se conecten más tarde. Los mensajes no persistentes solo se envían a los usuarios actualmente en la sala, lo cual es útil para efectos (como reproducir un efecto de sonido) que no tienen sentido para los usuarios que actualmente no están en la sala. Opcionalmente, puedes incluir un campo `deleteOnDisconnect` en tu mensaje para eliminar este mensaje en particular cuando el usuario se desconecte.

```ts
// Este mensaje se enviará a todos los usuarios actualmente en la sala,
// Y a los usuarios que se unan a la sala más tarde.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue" });

// Este mensaje se enviará a todos los usuarios actualmente en la sala,
// pero NO se enviará a los usuarios que se unan a la sala más tarde.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", dontSave: true });

// Este mensaje se enviará a todos los usuarios actualmente en la sala,
// pero NO se enviará a los usuarios que se unan a la sala más tarde.
this.context.connection.send("my-message", { myData: "myValue" });

// Este mensaje se enviará a todos los usuarios actualmente en la sala,
// Y a los usuarios que se unan a la sala más tarde,
// pero se eliminará del estado de la sala cuando el usuario se desconecte.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", deleteOnDisconnect: true });
```

Para eliminar el estado de un guid específico del almacenamiento del backend, establece la clave del mensaje en `delete-state` y apunta a un objeto específico con su guid: `{ guid: "guid_to_delete" } `.

```ts
this.context.connection.send("delete-state", { guid: "guid_to_delete" });
```

### Uso de flags de depuración para entender los mensajes de red

Existen varias flags de depuración que se pueden utilizar para profundizar en los mensajes de red.
Estas se pueden añadir a la URL de la página, como `https://localhost:3000/?debugnet`.

| Flag | Descripción |
|------|-------------|
| `?debugnet` | Registra todos los mensajes de red entrantes y salientes en la consola |
| `?debugowner` | Registra todas las solicitudes y cambios de propiedad en la consola |
| `?debugnetbin` | Registra información adicional para mensajes binarios entrantes y salientes |


## Eventos del Ciclo de Vida de Redes

Los siguientes eventos están disponibles para escuchar en tus componentes. Describen eventos de red comunes a los que podrías querer reaccionar en tus componentes, como tú mismo u otro usuario uniéndose o saliendo de una sala.

```ts
// Listen to the event when *you* have joined a networked room
this.context.beginListen(RoomEvents.JoinedRoom, ({room, viewId, allowEditing, inRoom}) => { ... });

// Listen to the event when *you* have left a networked room
this.context.beginListen(RoomEvents.LeftRoom, ({room}) => { ... });

// Listen to the event when *another user* has joined your networked room
this.context.beginListen(RoomEvents.UserJoinedRoom, ({userId}) => { ... });

// Listen to the event when *another user* has left your networked room
this.context.beginListen(RoomEvents.UserLeftRoom, ({userId}) => { ... });

// This event is received after all current room state has been sent to the client
this.context.beginListen(RoomEvents.RoomStateSent, () => { ... });
```

- [Ver todos los Eventos de Sala en la documentación de la API](https://engine.needle.tools/docs/api/latest/RoomEvents)
- [Ver todos los Eventos de Propiedad en la documentación de la API](https://engine.needle.tools/docs/api/latest/OwnershipEvent)
- [Ver todos los Eventos de Conexión en la documentación de la API](https://engine.needle.tools/docs/api/latest/ConnectionEvents)

## Uso de Servidores de Redes de Needle

Por defecto, las escenas de Needle en red se conectan a la infraestructura en la nube gestionada y proporcionada por Needle. No se necesita configuración adicional y actualmente no hay costos adicionales por usar este servicio.

Típicamente, esto funcionará bien para alrededor de 15-20 usuarios en la misma sala. Una vez que tu proyecto madure, puedes actualizar a una solución de red más grande/mejor/más fuerte, alojando tu propio servidor de red.

## Alojamiento de tu propio Servidor de Redes

Puede que quieras alojar tu propio servidor de red para despliegues más grandes o para tener más control sobre la infraestructura e implementación de red.

Nuestro servidor de red está disponible en NPM [own networking package](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking) como paquete node.js. El paquete contiene integraciones preconfiguradas para los populares frameworks web [Fastify](https://www.npmjs.com/package/fastify) y [Express](https://www.npmjs.com/package/express), y puede integrarse en otros frameworks de servidor Node.js también.

::: tip Para experimentos rápidos: Remix en Glitch
Puedes remezclar un servidor de red simple funcionando en Glitch desde esta página: [needle-networking.glitch.me](https://needle-networking.glitch.me/) haciendo clic en el botón en la esquina inferior derecha.

La instancia de servidor predeterminada de Glitch es pequeña y solo puede manejar una cantidad limitada de usuarios. Si esperas que más de 15-20 personas estén en tu escena al mismo tiempo, deberías considerar alojar tu servidor de red en otro lugar (como en Google Cloud o AWS).
:::

::::code-group
:::code-group-item Fastify
```js
import networking from "@needle-tools/needle-networking";
networking.startServerFastify(fastifyApp, { endpoint: "/socket" });
```
:::
:::code-group-item Express
```js
import networking from "@needle-tools/needle-networking";
networking.startServerExpress(expressApp, { endpoint: "/socket" });
```
:::
:::code-group-item Integración personalizada
```js
import { init, onConnection } from "@needle-tools/networking";

// Add your framework-specific websocket implementation here. 
// You can view the fastify and express implementations in server.js for reference.
class WebsocketConnector {
    constructor(frameworkWebsocket) {
        // Your implementation.
    }
    on(event, callback) {
        // Your implementation. When receiving a message in the websocket connection, call the callback.
        // 'event' can be 'message' or 'close'.
    }
    send(key, value) {
        // Your implementation. Pass the message along to the websocket connection.
    }
}
const options = { endpoint: "/socket" };
init(options);
yourFramework.createWebsocketRoute(options.endpoint, frameworkWebsocket => {
    onConnection(new WebsocketConnector(frameworkWebsocket));
});
```
:::
::::

::: tip Ejemplo en Glitch.com
Consulta el código en [glitch.com/edit/#!/needle-networking](https://glitch.com/edit/#!/needle-networking?path=server.js) para un ejemplo de cómo integrar Needle Networking con un servidor Express.
:::

### Configuración

Las siguientes opciones están disponibles:

| Opción | Descripción |
| -- | -- |
| `options.endpoint` *string* | Opcional. Endpoint relativo del servidor. Por ejemplo, `/socket` iniciará el endpoint websocket en `tuserver/socket`. Por defecto es `/`. |
| `options.maxUsers` *number* | Número máximo de usuarios concurrentes en un servidor. Por defecto es `50`. |
| `options.defaultUserTimeout` *number* | Tiempo en segundos después del cual un usuario se considera desconectado. Por defecto es `30`. |
| `process.env.VIEW_ONLY_SALT` *string* | Valor de "sal" utilizado para generar IDs de sala de solo visualización a partir de IDs de sala regulares. Por defecto utiliza un valor de sal predefinido. |
| `process.env.NEEDLE_NETWORKING_S3_*` *string* | Habilita el almacenamiento S3. Consulta a continuación la lista completa de variables de entorno que necesitas configurar para esto. Cuando no se configura, se utiliza el almacenamiento predeterminado (archivos JSON en disco). |

El servidor de red gestionará automáticamente la conexión y desconexión de usuarios, la recepción y envío de mensajes, y la persistencia del estado de la sala.

Los servidores de red personalizados pueden desplegarse en cualquier lugar, por ejemplo en Google Cloud. Para más instrucciones, por favor consulta este repositorio: [Local Needle Networking Server](https://fwd.needle.tools/needle-engine/local-networking-repository)

::: tip Diferentes ubicaciones de servidor para desarrollo local y alojado
Si estás trabajando en código de red personalizado, puede que quieras usar diferentes ubicaciones de servidor para el desarrollo local y la aplicación alojada. Puedes configurar URLs de servidor individuales en el componente `Networking`:

![Componente Networking de Needle Engine con servidor de red alojado en otro lugar](/imgs/networking_absolute.webp)
:::

#### Almacenamiento de Estado

El estado de red se almacena por defecto en disco en el servidor como archivos JSON en el directorio `/.data` directory.
Cada sala tiene su propio archivo, y el estado se envía a los clientes que se conectan cuando se unen a una sala.

Opcionalmente, el estado de red se puede almacenar con un proveedor de almacenamiento compatible con S3. Utiliza las siguientes variables de entorno para habilitar el almacenamiento S3:

```bash
NEEDLE_NETWORKING_S3_ENDPOINT=
NEEDLE_NETWORKING_S3_REGION=
NEEDLE_NETWORKING_S3_BUCKET=
NEEDLE_NETWORKING_S3_ACCESS_KEY_ID=
NEEDLE_NETWORKING_S3_ACCESS_KEY=
NEEDLE_NETWORKING_S3_PREFIX= # all state saved in the bucket will be prefixed with this string. This can be a path e.g. `my_state/` or a unique id `server_123_`
```

## Servidor de Redes Local

Para propósitos de prueba y desarrollo, puedes ejecutar el paquete de red de Needle Engine en un servidor local. Hemos preparado un repositorio configurado para alojar el paquete websocket y facilitarte esto.

1.  Descarga el ejemplo de servidor local desde [github.com/needle-tools/networking-local](https://fwd.needle.tools/needle-engine/local-networking-repository)
2.  Sigue las instrucciones en el README para configurar el servidor. El servidor se ejecutará en `wss://localhost:9001/socket` por defecto.
3.  Añade el componente `Networking` a tu escena.
4.  Pega la dirección del servidor local en el campo `Localhost` del componente `Networking`.

## Avanzado: Personalización de la configuración WebRTC para peer.js

Los componentes `Screencapture` (Compartir pantalla) y `VoIP` (Comunicación de voz) de Needle Engine utilizan [peer.js](https://peerjs.com/) para la red de audio y video. Peer.js utiliza WebRTC internamente.

Needle Engine utiliza valores predeterminados razonables para peerjs. Si quieres modificar esos valores predeterminados, puedes llamar a
```ts
setPeerOptions(opts: PeerjsOptions);
```
con tu configuración personalizada. Esto se puede utilizar para modificar el proveedor de alojamiento para los servidores ICE/STUN/TURN, por ejemplo cuando utilizas tus propios servidores WebRTC.

## Avanzado: Formatos de Mensajes de Servidor y Cliente

::: warning Con fines informativos. Utiliza las API proporcionadas por Needle Engine en su lugar.
Normalmente, no necesitas interactuar directamente con estos formatos de mensajes, ya que la API de red de bajo nivel ya maneja el análisis de mensajes y te proporciona los tipos correctos. La información aquí se proporciona para usuarios avanzados que deseen comprender los formatos de mensajes subyacentes o implementar sus propias soluciones de red.
:::

Los mensajes se envían en formato JSON. Siempre tienen un campo `key` que describe el tipo de mensaje y un campo `data` que contiene la carga útil del mensaje. El campo `data` puede ser cualquier objeto serializable en JSON.

### Eventos de Sala Incorporados

::::code-group
:::code-group-item Unirse
```json
// Sent to the server to attempt joining a room.
{
    "key": "join-room",
    "data": {
        "room": string,
        "viewOnly": boolean,
    }
}
```
:::
:::code-group-item Salir
```json
// Sent to the server to leave a room.
{
    "key": "leave-room",
    "data": {
        "room": string
    }
}
```
:::
:::code-group-item SalaUnida
```json
// Sent to the client when the local user has joined a room.
// Type: JoinedRoomResponse
{
    "key": "joined-room",
    "room": string,
    "viewId": string,
    "allowEditing": boolean,
    "inRoom": string[] // connection IDs
}
```
:::
:::code-group-item SalaAbandonada
```json
// Sent to the client when the local user has left a room.
// Type: LeftRoomResponse
{
    "key": "left-room",
    "room": string
}
```
:::
:::code-group-item UsuarioUnidoASala
```json
// Sent to the client when any user has joined a room.
// Type: UserJoinedOrLeftRoomModel
{
    "key": "user-joined-room",
    "data": {
        "userId": string // connection ID
    }
}
```
:::
:::code-group-item UsuarioAbandonóSala
```json
// Sent to the client when any user has left a room.
// Type: UserJoinedOrLeftRoomModel
{
    "key": "user-left-room",
    "data": {
        "userId": string // connection ID
    }
}
````
:::
:::code-group-item EstadoSalaEnviado
```json
// Sent to the client after the complete room state has been sent.
{
    "key": "room-state-sent",
    "room": string // room name 
}
```
:::
::::

### Eventos de Utilidad Incorporados

::::code-group
:::code-group-item InformaciónConexión
```json
// Sent to the client when the connection is established.
{
    "key": "connection-start-info",
    "data": {
        "id": string // connection ID
    }
}
```
:::
:::code-group-item syncInstantiate
```json
// Used by the syncInstantiate() API to create a new instance of an asset.
// Type: NewInstanceModel
{
    "key": "new-instance-created",
    "data": {
        "guid": string,
        "originalGuid": string,
        "seed": number | undefined,
        "visible": boolean | undefined,
        "dontSave": boolean | undefined,

        "parent": string | undefined,
        "position": { x: number, y: number, z: number } | undefined,
        "rotation": { x: number, y: number, z: number, w: number } | undefined,
        "scale": { x: number, y: number, z: number } | undefined,

        "deleteStateOnDisconnect": boolean | undefined
    }
```
:::
:::code-group-item syncDestroy
```json
// Used by the syncDestroy() API to destroy an instance of an asset.
// Type: DestroyInstanceModel
{
    "key": "instance-destroyed",
    "data": {
        "guid": string,
        "dontSave": boolean | undefined
    }
}
```
:::
:::code-group-item Ping
```json
// Sent to the server every few seconds to keep the connection alive.
{
    "key": "ping",
    "data": {}
}
```
:::
:::code-group-item Pong
```json
// Sent by the server in response to a ping.
{
    "key": "pong",
    "data": {}
}
```
:::
:::code-group-item EliminarEstado
```json
// Sent to the server to delete state for a specific guid.
{
    "key": "delete-state",
    "data": {
        "guid": <string>
    }
}
```
:::
:::code-group-item EliminarTodoEstado
```json
// Sent to the server to delete ALL current room state.
{
    "key": "delete-all-state",
    "data": {}
}
```
::::

### Eventos de Propiedad Incorporados

::::code-group
:::code-group-item SolicitudPropiedad
```json
{
    "key":
      "request-has-owner" |
      "request-ownership" |
      "remove-ownership",
    "data": {
        "guid": string
    }
}
```
:::
:::code-group-item RespuestaPropiedad
// Type: OwnershipResponse
```json
{
    "key":
      "response-has-owner",
    "data": {
        "guid": string,
        "value": boolean
    }
}
```
:::
::: code-group-item RespuestaTransmisiónPropiedad
```json
{
    "key":
      "gained-ownership" |
      "lost-ownership" |
      "gained-ownership-broadcast" |
      "lost-ownership-broadcast",
    "data": {
        "guid": string,
        "owner": string
    }
}
```
:::
::::

### Esquemas Flatbuffer Incorporados

Los mensajes Flatbuffer se envían directamente como mensajes binarios.

::::code-group
:::code-group-item SyncedTransform ('STRS')
```cs
<!-- SAMPLE node_modules/@needle-tools/engine/src/engine-schemes/transforms.fbs -->
```
:::
:::code-group-item SyncedCamera ('SCAM')
```cs
<!-- SAMPLE node_modules/@needle-tools/engine/src/engine-schemes/syncedCamera.fbs -->
```
:::
:::code-group-item Vec2|3|4
```cs
<!-- SAMPLE node_modules/@needle-tools/engine/src/engine-schemes/vec.fbs -->
```
:::
::::

## Avanzado: Mensajes Binarios en formato Flatbuffer

Los mensajes JSON son fáciles de usar y entender, pero suelen ser más grandes en memoria y ancho de banda. Para grandes cantidades de datos, o al enviar actualizaciones rápidas, los mensajes binarios son más rápidos y eficientes. Puedes usar mensajes Flatbuffers en Needle Engine para casos en los que eso sea necesario. Usar Flatbuffers requiere pasos de configuración adicionales, como definir y compilar un esquema de mensaje, y es más difícil de depurar ya que estás tratando con mensajes binarios.

Ten en cuenta que al enviar y recibir mensajes flatbuffer, no hay un campo `key`; el tipo de mensaje es parte del esquema Flatbuffer. Lo que envías y recibes a través de la conexión Websocket es un único buffer binario.

Envía un mensaje binario a todos los usuarios en la misma sala:
```ts
this.context.connection.sendBinary(byteArray: Uint8Array);
```

Suscríbete a mensajes binarios en formato Flatbuffer:
```ts
this.context.connection.beginListenBinary(identifier:string, callback:(data : ByteBuffer) => void);
```

Cancela la suscripción a mensajes binarios:
```ts
this.context.connection.stopListenBinary(identifier:string);
```

#### Código de Ejemplo de Flatbuffers

Antes de poder enviar y recibir mensajes Flatbuffer, necesitas definir un esquema y compilarlo a TypeScript. Luego, registra el esquema con el sistema de red y utiliza los métodos del esquema generados para crear y analizar mensajes.

- [Esquemas Flatbuffer incorporados en Needle Engine](#built-in-flatbuffer-schemas)
- [Generación de un esquema](https://google.github.io/flatbuffers/flatbuffers_guide_writing_schema.html)
- [Uso del compilador de esquemas](https://google.github.io/flatbuffers/flatbuffers_guide_using_schema_compiler.html)
- [Flatbuffers en Typescript](https://google.github.io/flatbuffers/flatbuffers_guide_use_typescript.html)


::::code-group
:::code-group-item Registrar un esquema
```ts
// Register a new Flatbuffer schema with the networking system
import { registerBinaryType } from '@needle-tools/engine';
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

registerBinaryType(MySchemaIdentifier, MyDataModel.getRootAsSyncedTransformModel);
```
:::
:::code-group-item Enviar Mensajes
```ts
// Prepare data for sending by creating a Flatbuffer message:
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";
const builder = new flatbuffers.Builder();

// Construct a Flatbuffer message
function createMyCustomModel(somePayload: string): Uint8Array {
    builder.clear();
    MyDataModel.startMyDataModel(builder);
    const guidObj = builder.createString(guid);
    MyDataModel.addSomePayload(builder, guidObj);
    const res = MyDataModel.endMyDataModel(builder);
    builder.finish(res, MySchemaIdentifier);
    return builder.asUint8Array();
}

// Send the data
function sendData() {
    const data = createMyCustomModel("your-payload", this, true);
    this.context.connection.sendBinary(data);
}
```
:::
:::code-group-item Recibir Mensajes
```ts
// Subscribe to receive this specific message type:
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

this.context.connection.beginListenBinary(MySchemaIdentifier, (data) => {
    const model = MyDataModel.getRootAsMyDataModel(data);
    console.log("Received binary message", model, model.somePayload());
});
```
:::
::::

::: tip Mensajes Flatbuffer personalizados y persistencia
Actualmente, los mensajes binarios personalizados no pueden persistirse en el servidor de red. Modifica el servidor de red y añade tus esquemas flatbuffer personalizados para asegurar que la propiedad guid pueda procesarse.
:::

## Resumen

Needle Engine hace que el complejo tema de las redes sea accesible y fácil de usar. Puedes empezar con las redes automáticas para tus componentes con solo unas pocas líneas de código, y puedes profundizar en las redes manuales cuando necesites más control.


Página traducida automáticamente mediante IA