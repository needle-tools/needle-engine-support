# Networking

Access to core networking functionality can be obtained by using ``this.context.connection`` from a component. [The backend server ⇡](https://glitch.com/edit/#!/needle-tiny-server) requires users to be connected to a room.

Networking is currently based on [websockets ⇡](https://github.com/jjxxs/websocket-ts) and sending either json strings (for infrequent updates) or [flatbuffers ⇡](https://google.github.io/flatbuffers/) (for frequent updates).

Source at ``engine/engine_networking.ts``

## Core Components
- ``Connection`` - use to customize server backend url
- ``SyncedRoom`` - handles networking connection and connection to a room
- ``SyncedTransform`` - handles synchronizing transforms
- ``SyncedCamera`` - spawns a prefab for any user connected to the room which will follow their position
- ``WebXRSync`` - handles synchronization for AR and VR users
