# Networking

<a href="https://engine.needle.tools/samples/?tags=networking" target="_blank">![Image](/imgs/banner-networking.jpg)</a>

Needle Engine comes with a networking solution that allows complete beginners and advanced users alike to bring their projects to life. Our main focus is to be beginner-friendly and that's why many built-in components already have a solution for how to be synchronized.

## Quick overview of useful components

### Built-in components
- ``SyncedRoom`` — handles networking connection and connection to a room.   
  This can also be done by code using the networking api  accessible from `this.context.connection`
- ``SyncedTransform`` — handles synchronizing transforms
- ``SyncedCamera`` — spawns a prefab for any user connected to the room which will follow their position
- ``WebXRSync`` — handles synchronization for AR and VR users
- ``VoIP`` — handles voice-over-IP audio connections, microphone access etc. between users
- ``Networking`` — use to customize the server backend url
- ``PlayerSync`` and ``PlayerState`` — spawns a player for every user when they connect

### Found in samples
- ``SyncedAnimator`` — synchronizes animator component
- ``TriggerEventListOnClick`` — when the object is clicked an EventList is invoked for all users

# Samples

:::details Model Viewer - Visualize users 
Sample: Collaborative Sandbox

<sample src="https://engine.needle.tools/samples/collaborative-sandbox/" :split="true"/>

> Rotate around 180° to see the other user - small eye model

## Explenation

A great way how to make your experience more immersive is to show avatars of other users in the virtual world.

All you need to do is to place the ``SyncedCamera`` component on an object in the scene and select a prefab that is the representation of the remote user.

Mind that the component is for visualizing other users, so the prefab shouldn't have a camera component.

## Visualizing XR users

``WebXRSync`` handles synchronization for AR and VR users. Simply add it next to the WebXR component and it will synchronize the provided avatar from the WebXR component.

### DragControls, Duplicatable and Deletable

These are common components that can make your experience rich with interaction. Everything is synchronized out of the box. For correct configuration please refer to the Collaborative Sandbox sample which you can [download here](https://github.com/needle-tools/needle-engine-samples), refer to the readme.

:::

:::details Screen and voice sharing
Sample: Screensharing
<sample src="https://engine.needle.tools/samples/screensharing/" :split="true"/>

- ``ScreenCapture`` - shares windows, screens and web cameras
- ``VoIP`` - handles voice-over-IP audio connections

## peerjs

Needle Engine `Screencapture` / Screensharing and `Voip` components use [peerjs](https://peerjs.com/) for networking audio and video. 

### Customizing peerjs options

- If you want to modify the default peerjs options you can call `setPeerOptions(opts: PeerjsOptions)` with your custom options. This can be used to modify the hosting provider in case where you host your own peerjs server.

:::

:::details Spawn player and synchronize position
Sample: Networking Players

<sample src="https://engine.needle.tools/samples/networking-players/" :split="true"/>

> Click on the floor to move the player to a certain position

## Intro

This sample is about player-focused apps and games. 

Everything starts with the ``PlayerSync`` component. When a local user joins, it spawns a prefab. The prefab has to have the ``PlayerState`` component. Upon spawning, it sets the local user as the owner of the PlayerState, which is synchronized and thus every instance of the game has that prefab spawned with the originating user id. 

This way you can use the ``PlayerState`` to determine if the player is your local one or if it is a remotely controlled one. 

That is crucial when for example determining if the player should jump when a space is pressed. Since this only should be allowed on your local player:
```ts {6}
@serializable(PlayerState)
playerState?: PlayerState;

// ...

if(this.playerState?.isLocalPlayer) {
    if(this.context.input.isKeyDown("Space")) {
        // Jump
    }
}
```

This so far allows us to determine the ownership of spawned players, but it doesn't synchronize the position if it changes on the local player.
That's when ``SyncedTransform`` component comes in. It has to be manually activated via API and again it should only be activated on the local player.

```ts {2}
if(this.playerState?.isLocalPlayer) {
    this.syncedTransform?.requestOwnership();
}
```

## Component Overview

- ``PlayerSync`` 
    - Spawns our player prefab when we join a room.
    - Should be only once in a scene and it has to have the Prefab with PlayerState assigned.
- ``PlayerState`` 
    - Determines ownership passed by the PlayerSync.
    - Should be at the root of the player prefab
- ``SyncedTransform``
    - After manual activation, it synchronizes position, rotation and scale.
    - Should be at the root of the player prefab

## Relevant topics:
- [First Person Controller](https://engine.needle.tools/samples/first-person-controller/) sample

:::

:::details Synchronize animation
Sample: Synchronized Animator

<sample src="https://engine.needle.tools/samples/synchronized-animator/" :split="true"/>

Add `SyncedAnimator` to your animator component and all changes will be synchronized.

## Dynamic content
The id for synchronization is the guid of an object, if every object isn't deterministicly created via `syncedInstantiate`, the synchronization won't work. In that case, please set the `SyncedAnimGuid` property to a deterministic value.

:::

# Connecting
To connect and use networking, please use the built-in `SyncedRoom` component which automatically joins a room and sends a heartbeat.

Alternatively, if you want to have more control over the connection process, you can use the API directly.
:::details How to connect and disconnect from rooms

# Sample: Networking Rooms
<sample src="https://engine.needle.tools/samples-uploads/networking_rooms/" :split="true"/>

First, you need to connect to the server. Then, for receiving and sending messages you need to connect to a room. But API for joining a room will automatically join the server if it is not connected yet.

```ts {5,10}
const net = this.context.networking;

// join room
if (!net.isInRoom) { // user can't be in another room
    net.joinRoom("ROOM_ID"); 
}

// leave room
if (net.isInRoom) { // user has to be in a room
    net.leaveRoom(); 
}
```

SyncedRoom component also provides a heartbeat to the server which prevents the user from being kicked. So, instead of replacing the SyncedRoom component, it is recommended to disable auto-connect instead of rewriting it.

:::


# Communication

In terms of communication, you can synchronize variables or send messages.

:::warning Use SyncFields
We recommend using synchronized variables for most cases. If you end up being limited by them, then we suggest using messages communication instead.
:::

## Synchronized variables (fields)

To automatically network fields in a component you can just decorate a field with a ``@syncField()`` decorator (note: you need to have ``experimentalDecorators: true`` in your ``tsconfig.json`` file for it to work)

*Simple networking of a number*
```ts
import { Behaviour, syncField } from "@needle-tools/engine"

export class AutoFieldSync extends Behaviour implements IPointerClickHandler {

    // Use `@syncField` to automatically network a field. 
    // You can optionally assign a method or method name to be called when the value changes
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

:::details More advanced Sync Field example

<!-- SAMPLE network color change
*Automatically network a color field. The following script also changes the color randomly on click*
-->

:::

## Sending and receiving messages

You can send **text** and **binary** messages. 

:::warning Use text messages
We recommend using text messages until you get limited by bandwidth.
:::

Here is a brief overview of how to send and receive messages. 
For more info about [text and binary messages please visit this dedicated page](./networking/messages.md).

### Sending a text message

Send a JSON message to all users in the same room:   
``this.context.connection.send(key:string, data: IModel | object | boolean | string | number | null)``

### Persistence of text messages
When sending an object containing a `guid` field it will be saved in the persistent storage and automatically sent to users that connect later or come back later to the site (e.g. to restore state).   

### Receiving a text message
Subscribe to json events / listen to events in the room using a specific key  
``this.context.connection.beginListen(key:string, callback:(data) => void)``   
Unsubscribe with ``stopListening``

## Room API and Networking events

### Helpful API to determine the state the client is in:

```ts
const net = this.context.connection;

net.isInRoom // is connected to a room and that means to a backend as well
net.isConnected // is connected to a backend, not necessarily to a room
net.connectionId // local client's ID

net.usersInRoom // array of connected users
net.userIsInRoom // utility function to check if a given user is in the users array

net.currentLatency // ping to the server
net.currentRoomName // room name
```

### These are the events you are able to listen to:

#### ConnectionEvents
 - ``ConnectionInfo`` - on backend joined

#### RoomEvents
 - ``Join`` - try joining a room
 - ``Leave`` - try leaving a room
 - ``JoinedRoom`` - joined successfully
 - ``LeftRoom`` - left successfully
 - ``UserJoinedRoom`` - another user joined room
 - ``UserLeftRoom`` - another user left room
 - ``RoomStateSent`` - all state has been received (upon joining a room the server state is sent)

```ts
this.context.connection.beginListen(RoomEvents.UserJoinedRoom, (data) => { 
    console.log(RoomEvents.UserJoinedRoom, data);
 }));
```
> NOTE: We do recommend saving the arrow function into a variable otherwise you can not stop listening. Even if the object gets destroyed, the function is called.

# Server Hosting

[The built-in backend server](https://glitch.com/edit/#!/needle-tiny-server) is using websockets.

By default, Needle Engine will connect to a shared server running on Glitch for local development. You can choose your own server url through the `Networking` component and easily deploy your own networking backend (if required).

## Networking on Glitch

When [deploying your app to Glitch](../deployment.md#deploy-to-glitch) a Needle Engine networking server gets installed on the glitch deployment for you. The server supports between 15 and 20 concurrent users. Make sure that you are not overriding the server URL via the `Networking` component.

## Needle Engine Networking package

The [server package](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking) can be installed from npm and easily integrated into your existing node project. Currently, we provide one-line integrations for [Fastify](https://www.npmjs.com/package/fastify) and [Express](https://www.npmjs.com/package/express) servers.
```js
import networking from "@needle-tools/needle-tiny-networking-ws";
networking.startServerFastify(fastifyApp, { endpoint: "/socket" });
```

The following options are available:

|  |  | 
| -- | -- |
| `endpoint` *string* | relative path to the websocket endpoint (e.g. `/socket`) |
| `maxUsers` *number* | Amount of users allowed per room |
| `defaultUserTimeout` *number* | Timeout length in seconds until a user is kicked from a room (if no ping is received). Defaults to 30 seconds |


## Hosting your own Networking Server

You can also deploy your own networking server on e.g. **google cloud** or any hosting provider that can run nodejs apps.    For further instructions please refer to the description found here: 
- [Local Networking Repository](https://fwd.needle.tools/needle-engine/local-networking-repository)

### Using a different backend
Using a different server for your local development or your deployed project is possible using the `Networking` component. Use the `Url` field for a custom endpoint where your Needle Engine networking server is running:    

![Needle Engine Networking component with networking server hosted elsewhere](/imgs/networking_absolute.webp)

## Local testing

For testing and development purposes it can be desired to run the needle engine networking package locally. We have prepared a repository that is set up to start a small server and networking package. Please follow the instructions in the linked repository:
- [Local Networking Repository](https://fwd.needle.tools/needle-engine/local-networking-repository)

# Quick tips and takeaways
- Debugging - `?debugnet` - can be helpful with diagnosing certain problems (There are other flags as well, inspect the param list from `?help`)
- User limit - be aware that it is recommended to host your own instance, see the Server hosting section above.