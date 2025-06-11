# Réseau

Needle Engine inclut une solution réseau complète pour les expériences multijoueur.
Un état de monde partagé, le chat vocal, la persistance de session, et bien plus encore peuvent être réalisés avec nos composants et APIs réseau. Vous pouvez mettre en réseau vos propres composants avec un choix de mise en réseau automatique ou manuelle.

La mise en réseau dans Needle Engine est basée sur [Websockets](https://github.com/jjxxs/websocket-ts). La mise en réseau automatique utilise des données JSON pour faciliter l'utilisation. Pour les cas d'utilisation complexes et les exigences de haute performance, nous utilisons [Flatbuffers](https://google.github.io/flatbuffers/).

L'accès à la fonctionnalité réseau de base peut être obtenu en utilisant ``this.context.connection`` depuis un composant. Le serveur backend par défaut connecte les utilisateurs à des salles. Les utilisateurs dans la même salle partageront leur état et recevront des messages les uns des autres.

## Concepts de Réseau

### Salles et État

Au cœur du réseau dans Needle Engine se trouve le concept de salles synchronisées. Chaque salle a un ID, et les utilisateurs se connectent à une salle en fournissant cet ID. Les salles sont stockées sur un serveur, et les utilisateurs peuvent rejoindre et quitter des salles à tout moment.
Lorsqu'un utilisateur rejoint une salle, il reçoit l'état actuel de la salle, applique cet état actuel à sa scène, puis écoute les changements d'état de la salle.
Lorsqu'un utilisateur quitte une salle, il arrête d'écouter les changements d'état de la salle.

L'état de la salle est stocké sous forme de données JSON sur le serveur, de sorte que tous les changements sont persistants. Cela signifie que l'état de la salle n'est pas seulement utile pour le réseau, mais aussi pour persister les actions d'un seul utilisateur.

Needle peut fournir des _IDs en lecture seule_ pour les salles. Lors de l'accès à une salle avec un ID en lecture seule, l'utilisateur ne pourra pas interagir avec la salle, mais pourra voir l'état actuel et obtenir des mises à jour en direct. Ceci est utile pour des présentations ou des démonstrations.

### Propriété

Les objets dans une salle peuvent être _possédés_ par un utilisateur. Cela signifie que seul le propriétaire d'un objet peut modifier son état.
Par défaut, les objets n'ont pas de propriétaire.
Les composants comme `DragControls` demanderont la propriété d'un objet avant de le déplacer réellement.
Dans les composants personnalisés, vous pouvez contrôler la manière dont la propriété est gérée.
Il se peut qu'aucune propriété ne soit requise, que la propriété puisse être transférée automatiquement à un autre utilisateur, ou que la propriété ne soit transférée que par une action spécifique.

Lorsqu'un utilisateur quitte une salle, les objets possédés par cet utilisateur seront soit supprimés, soit leur propriété sera réinitialisée, selon la manière dont l'objet a été créé.

## Activer le Réseau pour votre projet

1.  Ajoutez un composant `SyncedRoom` à votre scène. Par défaut, cela utilisera l'infrastructure réseau fournie par Needle.
2.  Ajoutez un composant `SyncedTransform` à un objet dont vous souhaitez synchroniser le mouvement sur le réseau.
3.  Ajoutez un composant `DragControls` au même objet.
4.  Exécutez le projet. Dans le navigateur, cliquez sur "Join Room" (Rejoindre la salle) et copiez l'URL.
5.  Ouvrez une nouvelle fenêtre de navigateur et collez l'URL. Vous devriez maintenant voir le même objet dans les deux fenêtres. Essayez de faire glisser l'objet dans une fenêtre et voyez-le bouger dans l'autre.

Le composant `DragControls`, comme de nombreux autres composants Needle, dispose d'un support réseau intégré.
La propriété sera transférée à celui qui commence à faire glisser l'objet.

## Composants Intégrés avec Support Réseau

| Composant          | Description                                                                                                            |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `SyncedRoom`       | Gère la connexion réseau et la connexion à une salle.                                                                  |
| `SyncedTransform`  | Gère la synchronisation des transforms.                                                                                |
| `SyncedCamera`     | Crée un prefab pour tout utilisateur connecté à la salle qui suivra sa position.                                     |
| `VoIP`             | Gère les connexions audio voix sur IP (VoIP), l'accès au microphone, etc. entre les utilisateurs.                       |
| `ScreenCapture`    | Gère le partage d'écran via les APIs web.                                                                              |
| `Networking`       | Permet de personnaliser l'URL du serveur backend. Permet également de définir un serveur local pour le développement. |
| `DragControls`     | Gère le glisser-déposer d'objets. La propriété sera automatiquement transférée au dernier utilisateur ayant fait glisser un objet. |
| `Duplicatable`     | Gère la duplication d'objets. Les objets dupliqués sont instanciés pour tous les utilisateurs dans la salle.            |
| `Deletable`        | Gère la suppression d'objets. Les suppressions sont synchronisées sur le réseau.                                         |
| `DeleteBox`        | Gère la suppression d'objets ayant un composant "Deletable" lorsqu'ils sont glissés dans un volume de boîte.              |
| `PlayerSync`       | Composant puissant qui instancie un objet spécifique pour chaque joueur connecté.                                        |
| `PlayerState`      | Ajoutez ce composant aux objets qui sont assignés à `PlayerSync`.                                                      |
| `PlayerColor`      | Composant simple pour les couleurs spécifiques au joueur. Chaque utilisateur se voit attribuer une couleur aléatoire lors de la connexion à une salle. Ce composant assigne cette couleur au matériau principal de l'objet. |
| `WebXR`            | Gère la synchronisation des avatars d'utilisateur (mains et têtes).                                                  |

## Mise en Réseau Automatique pour les Composants personnalisés

Les champs de vos propres composants peuvent être mis en réseau très facilement. Les changements apportés au champ seront automatiquement détectés et envoyés à tous les utilisateurs de la salle. Les changements sont également persistés dans le cadre de l'État de la Salle, de sorte que les utilisateurs qui rejoignent la salle plus tard recevront également l'état actuel du champ, garantissant que tout le monde voit les mêmes données.

Pour mettre automatiquement en réseau un champ dans un composant, décorez-le avec le décorateur ``@syncField()`` :

::::code-group
:::code-group-item Synchroniser un nombre
```ts twoslash
import { Behaviour, syncField, IPointerClickHandler } from "@needle-tools/engine"

export class SyncedNumber extends Behaviour implements IPointerClickHandler {

    // Use `@syncField` to automatically network a field.
    // You can optionally assign a method or method name to be called when the value changes.
    // Utilisez `@syncField` pour mettre automatiquement en réseau un champ.
    // Vous pouvez éventuellement assigner une méthode ou un nom de méthode à appeler lorsque la valeur change.
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
:::code-group-item Synchroniser la couleur d'un objet
<!-- SAMPLE network color change -->
:::
::::

Notez que syncField a un paramètre optionnel pour spécifier une méthode qui doit être appelée lorsque la valeur change. Cette méthode doit être définie dans la même classe.

::: tip Configuration de Projet Personnalisée
Si vous utilisez une configuration de projet personnalisée, vous devez avoir ``experimentalDecorators: true`` dans votre fichier ``tsconfig.json`` pour que les décorateurs syncField fonctionnent. Les projets créés avec Needle Starters ont ceci activé par défaut.
:::

## Création et destruction d'objets

Souvent, vous voudrez créer et détruire des objets au moment de l'exécution, et bien sûr, ces changements doivent être synchronisés sur le réseau.

Le composant `PlayerSync` simplifie ce processus en instanciant automatiquement un objet spécifique pour chaque joueur connecté.
Lorsqu'un joueur quitte la salle, l'objet est détruit pour tous les utilisateurs.

De plus, Needle Engine fournit deux méthodes de haut niveau :
- [`syncInstantiate()`](https://engine.needle.tools/docs/api/latest/syncInstantiate) pour dupliquer des objets sur le réseau.
- [`syncDestroy()`](https://engine.needle.tools/docs/api/latest/syncDestroy) pour détruire des objets sur le réseau.

> 🏗️ Exemples de code en construction

## Mise en Réseau Manuelle

Needle Engine fournit également une API de bas niveau pour envoyer et recevoir des messages. Nous appelons cela la "mise en réseau manuelle". Les principes sont les mêmes, mais vous avez un contrôle total sur l'envoi et la réception de messages et sur la manière de les gérer.

### Envoi de Messages

Envoyer un message à tous les utilisateurs dans la même salle :
```ts
this.context.connection.send(key: string, data: IModel | object | boolean | string | number | null);
```

### Réception de Messages

Vous pouvez vous abonner à des événements dans la salle en utilisant une clé spécifique.
Typiquement, vous voudrez faire correspondre ceci avec la désinscription :

- abonnez-vous dans `onEnable` et désabonnez-vous dans `onDisable`
  Avec cette approche, aucun message ne sera reçu tant que l'objet est désactivé.

- ou abonnez-vous dans `start` et désabonnez-vous dans `onDestroy`
  Avec cette approche, les messages seront toujours reçus même si l'objet est désactivé.

```ts
this.context.connection.beginListen(key:string, callback:(data) => void)
```

Se désabonner des événements :
```ts
this.context.connection.stopListen(key:string)
```

### Contrôle de la persistance des messages

Lors de l'envoi de messages réseau, l'API de bas niveau vous permet de décider si ce message doit être persisté (sauvegardé dans l'état de la salle) ou non (seulement envoyé aux utilisateurs actuellement dans la salle). Pour persister un message, assurez-vous qu'il a un champ `guid`. Ce champ est généralement utilisé pour appliquer les données du message à un objet spécifique, en fournissant le guid de cet objet. Si vous souhaitez cibler un objet spécifique (et donc inclure un champ `guid`) mais que vous ne voulez pas que les données soient persistées, définissez le champ `dontSave` sur `true` dans votre message.

Tous les messages persistants sont sauvegardés dans l'état de la salle et seront envoyés aux utilisateurs qui se connectent ultérieurement. Les messages non persistants ne sont envoyés qu'aux utilisateurs actuellement dans la salle, ce qui est utile pour les effets (comme la lecture d'un effet sonore) qui n'ont pas de sens à jouer pour les utilisateurs qui ne sont pas actuellement dans la salle. En option, vous pouvez inclure un champ `deleteOnDisconnect` dans votre message pour supprimer ce message particulier lorsque l'utilisateur se déconnecte.

```ts
// This message will be sent to all users currently in the room,
// AND to users that join the room later.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue" });

// This message will be sent to all users currently in the room,
// but NOT be sent to users that join the room later.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", dontSave: true });

// This message will be sent to all users currently in the room,
// but NOT be sent to users that join the room later.
this.context.connection.send("my-message", { myData: "myValue" });

// This message will be sent to all users currently in the room,
// AND to users that join the room later,
// but will be deleted from the room state when the user disconnects.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", deleteOnDisconnect: true });
```

Pour supprimer l'état d'un guid spécifique du stockage backend, définissez la clé du message sur `delete-state` et ciblez un objet spécifique avec son guid : `{ guid: "guid_to_delete" } `.

```ts
this.context.connection.send("delete-state", { guid: "guid_to_delete" });
```

### Utilisation des drapeaux de débogage pour comprendre les messages réseau

Il existe plusieurs drapeaux de débogage qui peuvent être utilisés pour approfondir les messages réseau.
Ceux-ci peuvent être ajoutés à l'URL de la page, comme `https://localhost:3000/?debugnet`.

| Drapeau         | Description                                                                 |
| :-------------- | :-------------------------------------------------------------------------- |
| `?debugnet`     | Journalise tous les messages réseau entrants et sortants dans la console   |
| `?debugowner`   | Journalise toutes les requêtes et modifications de propriété dans la console |
| `?debugnetbin`  | Journalise des informations supplémentaires pour les messages binaires entrants et sortants |

## Événements du Cycle de Vie Réseau

Les événements suivants sont disponibles pour l'écoute dans vos composants. Ils décrivent les événements réseau courants auxquels vous pourriez vouloir réagir dans vos composants, comme vous-même ou un autre utilisateur rejoignant ou quittant une salle.

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

- [Voir tous les Room Events dans la documentation API](https://engine.needle.tools/docs/api/latest/RoomEvents)
- [Voir tous les Ownership Events dans la documentation API](https://engine.needle.tools/docs/api/latest/OwnershipEvent)
- [Voir tous les Connection Events dans la documentation API](https://engine.needle.tools/docs/api/latest/ConnectionEvents)

## Utilisation des serveurs réseau Needle

Par défaut, les scènes Needle en réseau se connectent à l'infrastructure cloud gérée et fournie par Needle. Aucune configuration supplémentaire n'est nécessaire, et il n'y a actuellement aucun coût supplémentaire pour l'utilisation de ce service.

Typiquement, cela fonctionnera bien pour environ 15-20 utilisateurs dans la même salle. Une fois que votre projet mûrit, vous pouvez passer à une solution réseau plus grande/meilleure/plus forte, en hébergeant votre propre serveur réseau.

## Hébergement de votre propre serveur réseau

Vous pourriez vouloir héberger votre propre serveur réseau pour des déploiements plus importants ou pour avoir plus de contrôle sur l'infrastructure et l'implémentation du réseau.

Notre serveur réseau est disponible sur NPM [own networking package](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking) en tant que package node.js. Le package contient des intégrations pré-configurées pour les frameworks web populaires [Fastify](https://www.npmjs.com/package/fastify) et [Express](https://www.npmjs.com/package/express), et peut également être intégré à d'autres frameworks de serveur Node.js.

::: tip Pour des expériences rapides : Remix sur Glitch
Vous pouvez remixer un simple serveur réseau fonctionnant sur Glitch depuis cette page : [needle-networking.glitch.me](https://needle-networking.glitch.me/) en cliquant sur le bouton en bas à droite.

L'instance de serveur Glitch par défaut est petite et ne peut gérer qu'un nombre limité d'utilisateurs. Si vous vous attendez à ce que plus de 15-20 personnes soient dans votre scène en même temps, vous devriez envisager d'héberger votre serveur réseau ailleurs (comme sur Google Cloud ou AWS).
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
:::code-group-item Custom Integration
```js
import { init, onConnection } from "@needle-tools/networking";

// Add your framework-specific websocket implementation here.
// You can view the fastify and express implementations in server.js for reference.
// Ajoutez votre implémentation de websocket spécifique au framework ici.
// Vous pouvez voir les implémentations fastify et express dans server.js pour référence.
class WebsocketConnector {
    constructor(frameworkWebsocket) {
        // Your implementation.
        // Votre implémentation.
    }
    on(event, callback) {
        // Your implementation. When receiving a message in the websocket connection, call the callback.
        // 'event' can be 'message' or 'close'.
        // Votre implémentation. Lors de la réception d'un message dans la connexion websocket, appelez la fonction de rappel (callback).
        // 'event' peut être 'message' ou 'close'.
    }
    send(key, value) {
        // Your implementation. Pass the message along to the websocket connection.
        // Votre implémentation. Transmettez le message à la connexion websocket.
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

::: tip Exemple sur Glitch.com
Consultez le code sur [glitch.com/edit/#!/needle-networking](https://glitch.com/edit/#!/needle-networking?path=server.js) pour un exemple d'intégration de Needle Networking avec un serveur Express.
:::

### Configuration

Les options suivantes sont disponibles :

| Option                          | Description                                                                                                                                 |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `options.endpoint` *string*     | Optionnel. Point de terminaison (endpoint) relatif du serveur. Par exemple, `/socket` démarrera le point de terminaison websocket sur `votreserveur/socket`. Par défaut : `/`. |
| `options.maxUsers` *number*     | Nombre maximum d'utilisateurs concurrents sur un serveur. Par défaut : `50`.                                                                  |
| `options.defaultUserTimeout` *number* | Temps en secondes après lequel un utilisateur est considéré comme déconnecté. Par défaut : `30`.                                         |
| `process.env.VIEW_ONLY_SALT` *string* | Valeur de sel utilisée pour générer des IDs de salle en lecture seule à partir des IDs de salle réguliers. Utilise une valeur de sel prédéfinie par défaut. |
| `process.env.NEEDLE_NETWORKING_S3_*` *string* | Activer le stockage S3. Voir ci-dessous la liste complète des variables d'environnement que vous devez définir pour cela. Si non défini, le stockage par défaut est utilisé (fichiers JSON sur disque). |

Le serveur réseau gérera automatiquement la connexion et la déconnexion des utilisateurs, la réception et l'envoi de messages, et la persistance de l'état de la salle.

Les serveurs réseau personnalisés peuvent être déployés n'importe où, par exemple sur Google Cloud. Pour plus d'instructions, veuillez vous référer à ce dépôt : [Local Needle Networking Server](https://fwd.needle.tools/needle-engine/local-networking-repository)

::: tip Différents emplacements de serveur pour le développement local et hébergé
Si vous travaillez sur du code réseau personnalisé, vous pourriez vouloir utiliser différents emplacements de serveur pour le développement local et l'application hébergée. Vous pouvez définir des URL de serveur individuelles dans le composant `Networking` :

<img src="/imgs/networking_absolute.webp" alt="Composant Networking de Needle Engine avec serveur réseau hébergé ailleurs">
:::

#### Stockage d'état

L'état réseau est par défaut stocké sur disque sur le serveur sous forme de fichiers JSON dans le répertoire `/.data`.
Chaque salle a son propre fichier, et l'état est envoyé aux clients se connectant lorsqu'ils rejoignent une salle.

En option, l'état réseau peut être stocké avec un fournisseur de stockage compatible S3. Utilisez les variables d'environnement suivantes pour activer le stockage S3 :

```bash
NEEDLE_NETWORKING_S3_ENDPOINT=
NEEDLE_NETWORKING_S3_REGION=
NEEDLE_NETWORKING_S3_BUCKET=
NEEDLE_NETWORKING_S3_ACCESS_KEY_ID=
NEEDLE_NETWORKING_S3_ACCESS_KEY=
NEEDLE_NETWORKING_S3_PREFIX= # all state saved in the bucket will be prefixed with this string. This can be a path e.g. `my_state/` or a unique id `server_123_`
# tout état sauvegardé dans le bucket sera préfixé par cette chaîne. Cela peut être un chemin comme `mon_état/` ou un ID unique `serveur_123_`
```

## Serveur Réseau Local

À des fins de test et de développement, vous pouvez exécuter le package réseau Needle Engine sur un serveur local. Nous avons préparé un dépôt configuré pour héberger le package websocket et vous faciliter la tâche.

1.  Téléchargez l'échantillon de serveur local depuis [github.com/needle-tools/networking-local](https://fwd.needle.tools/needle-engine/local-networking-repository)
2.  Suivez les instructions du README pour configurer le serveur. Le serveur fonctionnera sur `wss://localhost:9001/socket` par défaut.
3.  Ajoutez le composant `Networking` à votre scène.
4.  Collez l'adresse du serveur local dans le champ `Localhost` du composant `Networking`.

## Avancé : Personnalisation des paramètres WebRTC pour peer.js

Les composants Needle Engine `Screencapture` (Partage d'écran) et `VoIP` (Communication vocale) utilisent [peer.js](https://peerjs.com/) pour le réseau audio et vidéo. Peer.js utilise WebRTC en arrière-plan.

Needle Engine utilise des valeurs par défaut raisonnables pour peerjs. Si vous souhaitez modifier ces valeurs par défaut, vous pouvez appeler
```ts
setPeerOptions(opts: PeerjsOptions);
```
avec vos paramètres personnalisés. Cela peut être utilisé pour modifier le fournisseur d'hébergement pour les serveurs ICE/STUN/TURN, par exemple lorsque vous utilisez vos propres serveurs WebRTC.

## Avancé : Formats de messages client et serveur

::: warning À titre informatif uniquement. Utilisez les APIs fournies par Needle Engine à la place.
Typiquement, vous n'avez pas besoin d'interagir directement avec ces formats de message, car l'API de mise en réseau de bas niveau gère déjà l'analyse des messages et vous donne les types corrects. Les informations ici sont fournies aux utilisateurs avancés qui souhaitent comprendre les formats de message sous-jacents ou implémenter leurs propres solutions de mise en réseau.
:::

Les messages sont envoyés au format JSON. Ils ont toujours un champ `key` qui décrit le type de message, et un champ `data` qui contient la charge utile du message. Le champ `data` peut être tout objet sérialisable en JSON.

### Événements de Salle intégrés

::::code-group
:::code-group-item Join
```json
// Sent to the server to attempt joining a room.
// Envoyé au serveur pour tenter de rejoindre une salle.
{
    "key": "join-room",
    "data": {
        "room": string,
        "viewOnly": boolean,
    }
}
```
:::
:::code-group-item Leave
```json
// Sent to the server to leave a room.
// Envoyé au serveur pour quitter une salle.
{
    "key": "leave-room",
    "data": {
        "room": string
    }
}
```
:::
:::code-group-item JoinedRoom
```json
// Sent to the client when the local user has joined a room.
// Type: JoinedRoomResponse
// Envoyé au client lorsque l'utilisateur local a rejoint une salle.
// Type : JoinedRoomResponse
{
    "key": "joined-room",
    "room": string,
    "viewId": string,
    "allowEditing": boolean,
    "inRoom": string[] // connection IDs
    // inRoom : string[] // IDs de connexion
}
```
:::
:::code-group-item LeftRoom
```json
// Sent to the client when the local user has left a room.
// Type: LeftRoomResponse
// Envoyé au client lorsque l'utilisateur local a quitté une salle.
// Type : LeftRoomResponse
{
    "key": "left-room",
    "room": string
}
```
:::
:::code-group-item UserJoinedRoom
```json
// Sent to the client when any user has joined a room.
// Type: UserJoinedOrLeftRoomModel
// Envoyé au client lorsqu'un utilisateur a rejoint une salle.
// Type : UserJoinedOrLeftRoomModel
{
    "key": "user-joined-room",
    "data": {
        "userId": string // connection ID
        // userId : string // ID de connexion
    }
}
```
:::
:::code-group-item UserLeftRoom
```json
// Sent to the client when any user has left a room.
// Type: UserJoinedOrLeftRoomModel
// Envoyé au client lorsqu'un utilisateur a quitté une salle.
// Type : UserJoinedOrLeftRoomModel
{
    "key": "user-left-room",
    "data": {
        "userId": string // connection ID
        // userId : string // ID de connexion
    }
}
````
:::
:::code-group-item RoomStateSent
```json
// Sent to the client after the complete room state has been sent.
// Envoyé au client après que l'état complet de la salle a été envoyé.
{
    "key": "room-state-sent",
    "room": string // room name
    // room : string // nom de la salle
}
```
:::
::::

### Événements Utilitaires Intégrés

::::code-group
:::code-group-item ConnectionInfo
```json
// Sent to the client when the connection is established.
// Envoyé au client lorsque la connexion est établie.
{
    "key": "connection-start-info",
    "data": {
        "id": string // connection ID
        // id : string // ID de connexion
    }
}
```
:::
:::code-group-item syncInstantiate
```json
// Used by the syncInstantiate() API to create a new instance of an asset.
// Type: NewInstanceModel
// Utilisé par l'API syncInstantiate() pour créer une nouvelle instance d'un asset.
// Type : NewInstanceModel
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
}
```
:::
:::code-group-item syncDestroy
```json
// Used by the syncDestroy() API to destroy an instance of an asset.
// Type: DestroyInstanceModel
// Utilisé par l'API syncDestroy() pour détruire une instance d'un asset.
// Type : DestroyInstanceModel
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
// Envoyé au serveur toutes les quelques secondes pour maintenir la connexion active.
{
    "key": "ping",
    "data": {}
}
```
:::
:::code-group-item Pong
```json
// Sent by the server in response to a ping.
// Envoyé par le serveur en réponse à un ping.
{
    "key": "pong",
    "data": {}
}
```
:::
:::code-group-item DeleteState
```json
// Sent to the server to delete state for a specific guid.
// Envoyé au serveur pour supprimer l'état d'un guid spécifique.
{
    "key": "delete-state",
    "data": {
        "guid": <string>
    }
}
```
:::
:::code-group-item DeleteAllState
```json
// Sent to the server to delete ALL current room state.
// Envoyé au serveur pour supprimer TOUT l'état actuel de la salle.
{
    "key": "delete-all-state",
    "data": {}
}
```
::::

### Événements de Propriété Intégrés

::::code-group
:::code-group-item OwnershipRequest
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
:::code-group-item OwnershipResponse
// Type: OwnershipResponse
// Type : OwnershipResponse
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
::: code-group-item OwnershipBroadcastResponse
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

### Schémas Flatbuffer intégrés

Les messages Flatbuffer sont envoyés directement sous forme de messages binaires.

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

## Avancé : Messages Binaires au format Flatbuffer

Les messages JSON sont faciles à utiliser et à comprendre, mais sont typiquement plus volumineux en mémoire et en bande passante. Pour de grandes quantités de données, ou lors de l'envoi de mises à jour rapides, les messages binaires sont plus rapides et plus efficaces. Vous pouvez utiliser les messages Flatbuffers dans Needle Engine pour les cas où cela est requis. L'utilisation de Flatbuffers nécessite des étapes de configuration supplémentaires comme la définition et la compilation d'un schéma de message, et est plus difficile à déboguer car vous traitez des messages binaires.

Notez que lors de l'envoi et de la réception de messages flatbuffer, il n'y a pas de champ `key` - le type de message fait partie du schéma Flatbuffer. Ce que vous envoyez et recevez sur la connexion Websocket est un seul tampon binaire.

Envoyer un message binaire à tous les utilisateurs dans la même salle :
```ts
this.context.connection.sendBinary(byteArray: Uint8Array);
```

S'abonner aux messages binaires au format Flatbuffer :
```ts
this.context.connection.beginListenBinary(identifier:string, callback:(data : ByteBuffer) => void);
```

Se désabonner des messages binaires :
```ts
this.context.connection.stopListenBinary(identifier:string);
```

#### Exemple de Code Flatbuffers

Avant de pouvoir envoyer et recevoir des messages Flatbuffer, vous devez définir un schéma et le compiler en TypeScript. Ensuite, enregistrez le schéma auprès du système réseau et utilisez les méthodes de schéma générées pour créer et analyser les messages.

- [Schémas Flatbuffer intégrés dans Needle Engine](#schémas-flatbuffer-intégrés)
- [Génération d'un schéma](https://google.github.io/flatbuffers/flatbuffers_guide_writing_schema.html)
- [Utilisation du compilateur de schéma](https://google.github.io/flatbuffers/flatbuffers_guide_using_schema_compiler.html)
- [Flatbuffers en Typescript](https://google.github.io/flatbuffers/flatbuffers_guide_use_typescript.html)

::::code-group
:::code-group-item Register a schema
```ts
// Register a new Flatbuffer schema with the networking system
// Enregistrer un nouveau schéma Flatbuffer auprès du système réseau
import { registerBinaryType } from '@needle-tools/engine';
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

registerBinaryType(MySchemaIdentifier, MyDataModel.getRootAsSyncedTransformModel);
```
:::
:::code-group-item Send Messages
```ts
// Prepare data for sending by creating a Flatbuffer message:
// Préparer les données à envoyer en créant un message Flatbuffer :
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";
const builder = new flatbuffers.Builder();

// Construct a Flatbuffer message
// Construire un message Flatbuffer
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
// Envoyer les données
function sendData() {
    const data = createMyCustomModel("your-payload", this, true);
    this.context.connection.sendBinary(data);
}
```
:::
:::code-group-item Receive Messages
```ts
// Subscribe to receive this specific message type:
// S'abonner pour recevoir ce type de message spécifique :
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

this.context.connection.beginListenBinary(MySchemaIdentifier, (data) => {
    const model = MyDataModel.getRootAsMyDataModel(data);
    console.log("Received binary message", model, model.somePayload());
    // console.log("Message binaire reçu", model, model.somePayload());
});
```
:::
::::

::: tip Messages Flatbuffer personnalisés et persistance
Actuellement, les messages binaires personnalisés ne peuvent pas être persistés sur le serveur réseau. Modifiez le serveur réseau et ajoutez vos schémas flatbuffer personnalisés pour vous assurer que la propriété guid peut être traitée.
:::

## Résumé

Needle Engine rend le sujet complexe de la mise en réseau accessible et facile à utiliser. Vous pouvez commencer avec la mise en réseau automatique pour vos composants avec seulement quelques lignes de code, et vous pouvez approfondir la mise en réseau manuelle lorsque vous avez besoin de plus de contrôle.


Page traduite automatiquement à l'aide de l'IA