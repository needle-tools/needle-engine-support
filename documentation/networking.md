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

## Auto networking (experimental)

To automatically network fields in a component you can just decorate a field with a ``@syncField()`` decorator (note: you need to have ``experimentalDecorators: true`` in your ``tsconfig.json`` file for it to work)

Example:
```ts
import { Behaviour } from "needle.tiny.engine/engine-components/Component"
import { syncField } from "needle.tiny.engine/engine/engine_networking_auto";

export class AutoFieldSync extends Behaviour implements IPointerClickHandler {

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
