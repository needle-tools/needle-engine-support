# Networking Events

**Complete reference for networking lifecycle events.**

The following events are available to listen to in your components. They describe common network events that you might want to react to, such as users joining or leaving rooms, room state changes, and connection events.

## Room Events

Events related to room lifecycle - joining, leaving, and state updates.

### JoinedRoom

Fired when *you* (the local user) have joined a networked room.

```ts
this.context.beginListen(RoomEvents.JoinedRoom, ({room, viewId, allowEditing, inRoom}) => {
    console.log("Joined room:", room);
    console.log("View ID:", viewId);
    console.log("Can edit:", allowEditing);
    console.log("Users in room:", inRoom);
});
```

**Event Data:**
- `room` (string) - Room ID
- `viewId` (string) - Your unique view identifier
- `allowEditing` (boolean) - Whether you can modify room state
- `inRoom` (string[]) - Array of connection IDs currently in the room

**Use Cases:**
- Initialize networking-dependent components
- Show "Connected" UI state
- Load user-specific data
- Set up presence indicators

---

### LeftRoom

Fired when *you* (the local user) have left a networked room.

```ts
this.context.beginListen(RoomEvents.LeftRoom, ({room}) => {
    console.log("Left room:", room);
});
```

**Event Data:**
- `room` (string) - Room ID you just left

**Use Cases:**
- Clean up networking resources
- Show "Disconnected" UI state
- Reset scene state if needed
- Remove presence indicators

---

### UserJoinedRoom

Fired when *another user* has joined your networked room.

```ts
this.context.beginListen(RoomEvents.UserJoinedRoom, ({userId}) => {
    console.log("User joined:", userId);
});
```

**Event Data:**
- `userId` (string) - Connection ID of the user who joined

**Use Cases:**
- Spawn player avatars
- Show join notifications
- Update player count UI
- Initialize player-specific objects

---

### UserLeftRoom

Fired when *another user* has left your networked room.

```ts
this.context.beginListen(RoomEvents.UserLeftRoom, ({userId}) => {
    console.log("User left:", userId);
});
```

**Event Data:**
- `userId` (string) - Connection ID of the user who left

**Use Cases:**
- Remove player avatars
- Show leave notifications
- Update player count UI
- Clean up player-specific objects

---

### RoomStateSent

Fired after all current room state has been sent to the client. This happens after you join a room.

```ts
this.context.beginListen(RoomEvents.RoomStateSent, () => {
    console.log("All room state received and applied");
});
```

**Event Data:** None

**Use Cases:**
- Know when initial synchronization is complete
- Start game logic after state is loaded
- Show "Ready" state to user
- Trigger animations or effects after sync

---

::: tip API Documentation
[See all Room Events in the API docs →](https://engine.needle.tools/docs/api/RoomEvents)
:::

## Ownership Events

Events related to object ownership - requesting, gaining, and losing ownership of objects.

### Request Ownership

Send a request to gain ownership of an object:

```ts
this.context.connection.send("request-ownership", {
    guid: this.guid
});
```

### Request Has Owner

Check if an object currently has an owner:

```ts
this.context.connection.send("request-has-owner", {
    guid: this.guid
});
```

### Remove Ownership

Release ownership of an object:

```ts
this.context.connection.send("remove-ownership", {
    guid: this.guid
});
```

### Gained Ownership

Fired when you gain ownership of an object:

```ts
// Listen for gained-ownership event
this.context.beginListen("gained-ownership", ({guid, owner}) => {
    if (guid === this.guid) {
        console.log("You now own this object");
    }
});
```

### Lost Ownership

Fired when you lose ownership of an object:

```ts
// Listen for lost-ownership event
this.context.beginListen("lost-ownership", ({guid, owner}) => {
    if (guid === this.guid) {
        console.log("You no longer own this object");
    }
});
```

::: tip API Documentation
[See all Ownership Events in the API docs →](https://engine.needle.tools/docs/api/OwnershipEvent)
:::

## Connection Events

Events related to the WebSocket connection itself.

### Connection Start Info

Fired when the WebSocket connection is established:

```ts
// This event uses the low-level connection API
this.context.connection.beginListen("connection-start-info", ({id}) => {
    console.log("Connected with ID:", id);
});
```

**Event Data:**
- `id` (string) - Your unique connection ID

**Use Cases:**
- Store your connection ID
- Initialize connection-dependent features
- Show "Connecting..." → "Connected" transition

---

::: tip API Documentation
[See all Connection Events in the API docs →](https://engine.needle.tools/docs/api/ConnectionEvents)
:::

## Utility Events

Built-in events for common networking operations.

### New Instance Created

Fired when `syncInstantiate()` creates a new instance:

```ts
this.context.beginListen("new-instance-created", (data) => {
    console.log("New instance created:", data.guid);
});
```

**Event Data:**
- `guid` (string) - GUID of the new instance
- `originalGuid` (string) - GUID of the original object
- `seed` (number) - Random seed for the instance
- `visible` (boolean) - Initial visibility
- `parent` (string) - Parent object GUID
- `position`, `rotation`, `scale` - Transform data
- `deleteStateOnDisconnect` (boolean) - Whether to delete on disconnect

---

### Instance Destroyed

Fired when `syncDestroy()` destroys an instance:

```ts
this.context.beginListen("instance-destroyed", (data) => {
    console.log("Instance destroyed:", data.guid);
});
```

**Event Data:**
- `guid` (string) - GUID of the destroyed instance
- `dontSave` (boolean) - Whether to persist the destruction

---

### Ping / Pong

Connection keepalive messages sent automatically:

```json
// Ping sent to server every few seconds
{
    "key": "ping",
    "data": {}
}

// Pong response from server
{
    "key": "pong",
    "data": {}
}
```

These are handled automatically - you typically don't need to listen for them.

---

### Delete State / Delete All State

Delete state from the room:

```ts
// Delete state for a specific object
this.context.connection.send("delete-state", {
    guid: "guid_to_delete"
});

// Delete ALL room state (use with caution!)
this.context.connection.send("delete-all-state", {});
```

## Usage Patterns

### Initialize After Joining

Wait for room join before setting up networking:

```ts
start() {
    this.context.beginListen(RoomEvents.JoinedRoom, this.onJoinedRoom);
}

private onJoinedRoom = () => {
    console.log("Room joined, initializing multiplayer features");
    this.initializeMultiplayer();
}

onDestroy() {
    this.context.stopListen(RoomEvents.JoinedRoom, this.onJoinedRoom);
}
```

### Track Connected Players

Maintain a list of connected users:

```ts
private connectedUsers: Set<string> = new Set();

start() {
    this.context.beginListen(RoomEvents.JoinedRoom, ({inRoom}) => {
        // Add all existing users
        inRoom.forEach(id => this.connectedUsers.add(id));
    });

    this.context.beginListen(RoomEvents.UserJoinedRoom, ({userId}) => {
        this.connectedUsers.add(userId);
        console.log("Player count:", this.connectedUsers.size);
    });

    this.context.beginListen(RoomEvents.UserLeftRoom, ({userId}) => {
        this.connectedUsers.delete(userId);
        console.log("Player count:", this.connectedUsers.size);
    });
}
```

### Request Ownership Before Modifying

Always check ownership before modifying networked objects:

```ts
private async tryModifyObject() {
    // Request ownership
    this.context.connection.send("request-ownership", {
        guid: this.guid
    });

    // Wait for ownership confirmation
    await new Promise(resolve => {
        const listener = ({guid, owner}) => {
            if (guid === this.guid) {
                this.context.stopListen("gained-ownership", listener);
                resolve(true);
            }
        };
        this.context.beginListen("gained-ownership", listener);
    });

    // Now we can safely modify the object
    this.modifyObject();
}
```

## Next Steps

**Learn more:**
- [Enable Networking](/docs/how-to-guides/networking/setup) - Set up multiplayer
- [Manual Networking](/docs/how-to-guides/networking/manual-networking) - Send custom messages
- [Understanding Networking](/docs/explanation/networking/architecture) - How it works

**API Reference:**
- [RoomEvents API](https://engine.needle.tools/docs/api/RoomEvents)
- [OwnershipEvent API](https://engine.needle.tools/docs/api/OwnershipEvent)
- [ConnectionEvents API](https://engine.needle.tools/docs/api/ConnectionEvents)
